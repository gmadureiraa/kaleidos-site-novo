import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent, captureServerException } from "@/lib/posthog-server";
import {
  ga4Event,
  metaCapiEvent,
  readTrackingCookies,
} from "@/lib/analytics-server";
import { randomUUID } from "crypto";
import { getPaperBySlug } from "@/lib/papers-data";
import { sendPaperDelivery } from "@/lib/emails/paper-delivery";
import { buildContactProperties } from "@/lib/resend-contact-props";

// Lazy Resend client — avoids build-time failures when env vars are missing
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// Lida por request (não no load do módulo): evita capturar um snapshot de env
// vazio se o binding da Vercel só existir no runtime do deploy novo.
function getAudienceId(): string {
  return process.env.RESEND_AUDIENCE_ID ?? "";
}

/**
 * POST /api/newsletter/subscribe
 * Body: { email: string, _hp?: string }
 *
 * Adds an email to the Kaleidos Resend audience.
 */
export async function POST(req: NextRequest) {
  try {
    const AUDIENCE_ID = getAudienceId();
    // Rate limit: 5 reqs / 10min por IP.
    const ip = getClientIp(req);
    const rl = await rateLimit("newsletter", ip, { max: 5, window: "10 m" });
    if (!rl.success) {
      return tooManyRequestsResponse(
        rl,
        "Muitas tentativas. Aguarda um minuto e tenta de novo."
      );
    }

    const body = await req.json().catch(() => null);
    // event_id/ga_* são tracking ids opcionais vindos do client (dedupe
    // pixel×CAPI + client_id real do GA4). Fallback server-to-server abaixo.
    const {
      email,
      _hp,
      name,
      event_id,
      ga_client_id,
      ga_session_id,
    } = body || {};

    // Entrega de lead magnet: se o gate/popup pediu um paper específico,
    // mandamos o material por email na hora (honra a promessa do gate).
    const deliverSlug =
      typeof body?.deliver?.paperSlug === "string"
        ? body.deliver.paperSlug.slice(0, 80)
        : "";

    // Metadata de jornada do lead (origem, artigo, UTMs) — alimenta o perfil
    // da pessoa no PostHog (estilo "vida do lead" do RD Station). Resend guarda
    // a lista; PostHog guarda a jornada, ambos com o email como chave.
    const rawMeta = (body && body.metadata) || {};
    const META_KEYS = [
      "source",
      "source_detail",
      "article_slug",
      "path",
      "landing",
      "referrer",
      "channel",
      "traffic_source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "first_channel",
      "first_source",
      "first_referrer",
      "first_utm_source",
      "first_utm_campaign",
    ] as const;
    const meta: Record<string, string> = {};
    for (const k of META_KEYS) {
      const v = rawMeta[k];
      if (typeof v === "string" && v) meta[k] = v.slice(0, 300);
    }

    // Honeypot: 200 silencioso "success" sem efeito real
    if (isHoneypotTriggered(_hp)) {
      return NextResponse.json({ success: true });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Deixa teu email pra gente enviar." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email inválido. Confere o endereço e tenta de novo." },
        { status: 400 }
      );
    }

    // Payload do lead pra logs de recuperação — se QUALQUER integração falhar,
    // essa linha nos logs da Vercel é a fonte de verdade pra recadastrar na mão.
    const leadLogPayload = JSON.stringify({
      email: email.trim().toLowerCase(),
      deliver: deliverSlug || null,
      ...meta,
      at: new Date().toISOString(),
    });

    // Cadastro na audience Resend é BEST-EFFORT: env ausente ou erro de API
    // NUNCA derruba a captura. O lead sempre fica recuperável em
    // [LEAD-FALLBACK] (logs) + PostHog (captureServerEvent abaixo), e a entrega
    // do material segue normalmente. (Já perdemos lead com 503 aqui — nunca mais.)
    let subscribed = false;
    let contactId: string | null = null;

    if (!AUDIENCE_ID || !process.env.RESEND_API_KEY) {
      console.error(
        `[LEAD-FALLBACK] newsletter/subscribe sem config Resend (audience=${Boolean(
          AUDIENCE_ID
        )}, apiKey=${Boolean(process.env.RESEND_API_KEY)}) — lead preservado: ${leadLogPayload}`
      );
    } else {
      try {
        const resend = getResend();
        // Nome (quando o form manda) vai junto pro contato da audience —
        // antes só o email era gravado e o firstName se perdia.
        const nameParts =
          typeof name === "string"
            ? name.trim().split(/\s+/).filter(Boolean)
            : [];
        const firstName = nameParts[0]?.slice(0, 100);
        const lastName = nameParts.length > 1
          ? nameParts.slice(1).join(" ").slice(0, 100)
          : undefined;
        // Propriedades custom do contato (aba "Properties" da Audience no
        // dashboard Resend) — deixam a origem do lead VISÍVEL amarrada ao
        // contato. Requer resend >= 6.17 e as properties criadas na conta
        // (source, source_detail, channel, traffic_source, utm_source,
        // utm_campaign, path, landing, first_channel, first_source).
        const contactProperties = buildContactProperties(meta);
        const { data, error } = await resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email,
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(Object.keys(contactProperties).length
            ? { properties: contactProperties }
            : {}),
        });
        if (error) {
          // Contato duplicado (já inscrito) NÃO é falha.
          const errMsg = (error as { message?: string })?.message ?? "";
          const isDuplicate = /exist|already|duplicat/i.test(errMsg);
          if (isDuplicate) {
            subscribed = true;
            // Contato já existe: atualiza last-touch nas properties (best-effort,
            // erro aqui nunca derruba a inscrição).
            if (Object.keys(contactProperties).length) {
              try {
                await resend.contacts.update({
                  audienceId: AUDIENCE_ID,
                  email,
                  properties: contactProperties,
                });
              } catch {
                // properties são nice-to-have; Neon/PostHog seguem como fonte
              }
            }
          } else {
            console.error(
              `[LEAD-FALLBACK] Resend subscribe error — lead preservado: ${leadLogPayload}`,
              error
            );
          }
        } else {
          subscribed = true;
          contactId = data?.id ?? null;
        }
      } catch (err) {
        console.error(
          `[LEAD-FALLBACK] Resend subscribe exception — lead preservado: ${leadLogPayload}`,
          err
        );
      }
    }

    // Entrega do material (best-effort: nunca derruba a inscrição).
    let delivered = false;
    if (deliverSlug) {
      const paper = getPaperBySlug(deliverSlug);
      if (!paper) {
        // Slug desconhecido = gate prometeu material que não vai chegar.
        // Log explícito pra detectar typo/paper removido (antes falhava mudo).
        console.error(`[subscribe] paper slug desconhecido: ${deliverSlug}`);
      }
      if (paper) {
        try {
          const r = await sendPaperDelivery({
            to: email,
            paper,
            name: typeof name === "string" ? name : null,
            source: meta.source || null,
          });
          delivered = r.ok;
        } catch (err) {
          console.error("[subscribe] erro entregando paper:", err);
        }
      }
    }

    // distinct_id = email lowercase — MESMO id do identifyLead() no client,
    // garante que o evento server cai na mesma pessoa do PostHog.
    await captureServerEvent(email.trim().toLowerCase(), "newsletter_signup", {
      audience_id: AUDIENCE_ID || null,
      resend_contact_id: contactId,
      audience_subscribed: subscribed,
      delivered_paper: deliverSlug || null,
      ...meta,
      // first-touch persiste no perfil da pessoa; last-touch sempre atualiza
      $set: {
        last_channel: meta.channel ?? null,
        last_source: meta.traffic_source ?? meta.source ?? null,
        last_path: meta.path ?? null,
      },
      $set_once: {
        first_channel: meta.first_channel ?? meta.channel ?? null,
        first_source: meta.first_source ?? meta.traffic_source ?? null,
        first_referrer: meta.first_referrer ?? meta.referrer ?? null,
        first_article: meta.article_slug ?? null,
      },
    });

    // Conversões server-side (GA4 MP + Meta CAPI). BEST-EFFORT e env-gated:
    // helpers nunca lançam e viram no-op se GA4_API_SECRET / META_CAPI_TOKEN
    // não estiverem setadas. Reaproveitam os UTMs já capturados em `meta`.
    const emailNorm = email.trim().toLowerCase();
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const { fbp, fbc } = readTrackingCookies(req.headers.get("cookie"));
    const eventSourceUrl = req.headers.get("referer") ?? undefined;
    const eventId =
      typeof event_id === "string" && event_id
        ? event_id.slice(0, 100)
        : randomUUID();
    await Promise.all([
      ga4Event(
        emailNorm,
        "generate_lead",
        {
          lead_type: "newsletter",
          delivered_paper: deliverSlug || undefined,
          ...meta,
        },
        {
          clientId: typeof ga_client_id === "string" ? ga_client_id : undefined,
          sessionId:
            typeof ga_session_id === "string" ? ga_session_id : undefined,
        }
      ),
      metaCapiEvent(
        "Lead",
        { email: emailNorm, clientIp: ip, userAgent, fbp, fbc },
        {
          content_name: "newsletter_signup",
          content_category: "newsletter",
          ...meta,
        },
        { eventId, eventSourceUrl }
      ),
    ]);

    return NextResponse.json({
      success: true,
      id: contactId ?? undefined,
      subscribed,
      delivered,
      message: "Inscricao realizada com sucesso!",
    });
  } catch (error) {
    // Erro realmente inesperado (antes de termos o email em mãos não há lead
    // pra salvar). Mensagem amigável — os forms exibem `error` direto pro usuário.
    console.error("[newsletter/subscribe] erro inesperado:", error);
    await captureServerException(error);
    return NextResponse.json(
      { error: "Não conseguimos concluir agora. Tenta de novo em instantes." },
      { status: 500 }
    );
  }
}
