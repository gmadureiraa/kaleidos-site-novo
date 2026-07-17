import { Resend } from "resend";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent } from "@/lib/posthog-server";
import {
  ga4Event,
  metaCapiEvent,
  readTrackingCookies,
} from "@/lib/analytics-server";
import { randomUUID } from "crypto";

/** Escapa input do usuário antes de interpolar no HTML do email (anti-injeção/phishing). */
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    // Rate limit: 5 reqs / 10min por IP.
    const ip = getClientIp(request);
    const rl = await rateLimit("contact", ip, { max: 5, window: "10 m" });
    if (!rl.success) {
      return tooManyRequestsResponse(rl);
    }

    const data = await request.json();
    const {
      nome = "",
      email = "",
      empresa = "",
      mensagem = "",
      servicos = [],
      locale = "pt",
      _hp,
      metadata = {},
      // Tracking ids vindos do client (opcionais — fallback server-to-server):
      // event_id deduplica pixel×CAPI; ga_client_id/ga_session_id fazem o
      // evento GA4 cair no usuário/sessão real em vez de um id fantasma.
      event_id,
      ga_client_id,
      ga_session_id,
    } = data || {};

    // Atribuição (origem do lead): UTMs, referrer, canal, first/last touch.
    const ATTR_KEYS = [
      "channel",
      "source",
      "referrer",
      "path",
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
    const attr: Record<string, string> = {};
    for (const k of ATTR_KEYS) {
      const v = (metadata || {})[k];
      if (typeof v === "string" && v) attr[k] = v.slice(0, 300);
    }

    // Honeypot: 200 silencioso pra não dar feedback pro bot.
    if (isHoneypotTriggered(_hp)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!nome || !email || !mensagem) {
      return new Response(
        JSON.stringify({ ok: false, error: "missing_fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "invalid_email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress =
      process.env.RESEND_FROM ?? "Kaleidos <noreply@kaleidos.com.br>";
    const subject = locale === "en" ? `New contact: ${nome}` : `Novo contato: ${nome}`;
    // Destinatários via env (mesmo padrão do lead-ia) com fallback hardcoded.
    const parseList = (raw?: string) =>
      (raw || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const to = parseList(process.env.LEAD_NOTIFICATION_TO).length
      ? parseList(process.env.LEAD_NOTIFICATION_TO)
      : ["madureira@kaleidosdigital.com", "nathalia@kaleidosdigital.com"];
    const cc = parseList(process.env.LEAD_NOTIFICATION_CC);
    const text = `
Nome: ${nome}
Email: ${email}
Empresa: ${empresa}
Serviços: ${(servicos || []).join(", ")}

Mensagem:
${mensagem}
`;
    // Limita tamanho da mensagem livre pra evitar payloads abusivos.
    const mensagemSafe = String(mensagem).slice(0, 5000);
    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
        <h2 style="margin:0 0 12px 0;">${esc(subject)}</h2>
        <p><strong>Nome:</strong> ${esc(nome)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${empresa ? `<p><strong>Empresa:</strong> ${esc(empresa)}</p>` : ""}
        ${(servicos || []).length ? `<p><strong>Serviços:</strong> ${esc((servicos || []).join(", "))}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0;"/>
        <p style="white-space:pre-wrap">${esc(mensagemSafe)}</p>
      </div>
    `;

    // Payload completo do lead pra logs de recuperação: se a notificação por
    // email falhar por qualquer motivo, essa linha nos logs da Vercel + o
    // evento no PostHog garantem que o contato NÃO se perde.
    const leadLogPayload = JSON.stringify({
      nome: String(nome).slice(0, 200),
      email: String(email).trim().toLowerCase(),
      empresa: String(empresa || "").slice(0, 200),
      servicos: servicos || [],
      mensagem: String(mensagem).slice(0, 2000),
      ...attr,
      at: new Date().toISOString(),
    });

    // Notificação interna é BEST-EFFORT: env ausente ou erro do Resend nunca
    // derruba o lead — logamos recuperável e seguimos pro PostHog.
    let notified = false;
    if (!resendApiKey) {
      console.error(
        `[LEAD-FALLBACK] contact sem RESEND_API_KEY — lead preservado: ${leadLogPayload}`
      );
    } else {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromAddress,
          to,
          ...(cc.length ? { cc } : {}),
          replyTo: email,
          subject,
          text,
          html,
        });
        notified = true;
      } catch (err) {
        console.error(
          `[LEAD-FALLBACK] contact erro Resend — lead preservado: ${leadLogPayload}`,
          err
        );
      }
    }

    await captureServerEvent(String(email).trim().toLowerCase(), "contact_submitted", {
      notified,
      empresa: empresa || null,
      servicos_count: (servicos || []).length,
      locale,
      ...attr,
      // last-touch sempre atualiza; first-touch fixa na primeira conversão
      $set: {
        last_channel: attr.channel ?? null,
        last_source: attr.source ?? null,
        last_path: attr.path ?? null,
      },
      $set_once: {
        first_channel: attr.first_channel ?? attr.channel ?? null,
        first_source: attr.first_source ?? attr.source ?? null,
        first_referrer: attr.first_referrer ?? attr.referrer ?? null,
      },
    });

    // INTEGRAÇÃO CRM (KAI): lead de contato = alta intenção (prospect de vendas),
    // então espelhamos no CRM do KAI além do Resend/PostHog. BEST-EFFORT e
    // env-gated: só roda se KAI_CRM_INGEST_URL estiver setada; timeout curto;
    // nunca lança nem derruba a resposta (o lead já está seguro acima).
    let crmSynced = false;
    const kaiIngestUrl = process.env.KAI_CRM_INGEST_URL;
    if (kaiIngestUrl) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 4000);
        const resp = await fetch(kaiIngestUrl, {
          method: "POST",
          signal: ctrl.signal,
          headers: {
            "Content-Type": "application/json",
            ...(process.env.KAI_CRM_INGEST_TOKEN
              ? { Authorization: `Bearer ${process.env.KAI_CRM_INGEST_TOKEN}` }
              : {}),
          },
          body: JSON.stringify({
            source: "site-contato",
            name: String(nome).slice(0, 200),
            email: String(email).trim().toLowerCase(),
            company: String(empresa || "").slice(0, 200),
            services: servicos || [],
            message: String(mensagem).slice(0, 2000),
            channel: attr.channel ?? null,
            utm_source: attr.utm_source ?? null,
            utm_campaign: attr.utm_campaign ?? null,
          }),
        });
        clearTimeout(t);
        crmSynced = resp.ok;
        if (!resp.ok) {
          console.error(
            `[LEAD-FALLBACK] contact->KAI CRM respondeu ${resp.status} — lead preservado: ${leadLogPayload}`
          );
        }
      } catch (err) {
        console.error(
          `[LEAD-FALLBACK] contact->KAI CRM falhou — lead preservado: ${leadLogPayload}`,
          err
        );
      }
    }

    // Conversões server-side (GA4 MP + Meta CAPI). BEST-EFFORT e env-gated:
    // helpers nunca lançam e viram no-op sem GA4_API_SECRET / META_CAPI_TOKEN.
    // Contato = lead de alta intenção, marcamos isso nos params.
    const emailNorm = String(email).trim().toLowerCase();
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const { fbp, fbc } = readTrackingCookies(request.headers.get("cookie"));
    const eventSourceUrl = request.headers.get("referer") ?? undefined;
    const eventId =
      typeof event_id === "string" && event_id
        ? event_id.slice(0, 100)
        : randomUUID();
    await Promise.all([
      ga4Event(
        emailNorm,
        "generate_lead",
        {
          lead_type: "contact",
          intent: "high",
          servicos_count: (servicos || []).length,
          ...attr,
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
          content_name: "contact_form",
          content_category: "contact",
          intent: "high",
          ...attr,
        },
        { eventId, eventSourceUrl }
      ),
    ]);

    return new Response(JSON.stringify({ ok: true, notified, crmSynced }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Erro inesperado (ex: JSON inválido). Logar SEMPRE — antes esse catch
    // engolia o erro sem rastro nenhum.
    console.error("[contact] erro inesperado:", err);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


