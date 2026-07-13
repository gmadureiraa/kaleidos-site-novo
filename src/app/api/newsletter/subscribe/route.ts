import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent } from "@/lib/posthog-server";
import { getPaperBySlug } from "@/lib/papers-data";
import { sendPaperDelivery } from "@/lib/emails/paper-delivery";

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

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

/**
 * POST /api/newsletter/subscribe
 * Body: { email: string, _hp?: string }
 *
 * Adds an email to the Kaleidos Resend audience.
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 reqs / 10min por IP.
    const ip = getClientIp(req);
    const rl = await rateLimit("newsletter", ip, { max: 5, window: "10 m" });
    if (!rl.success) {
      return tooManyRequestsResponse(rl);
    }

    const body = await req.json();
    const { email, _hp, name } = body || {};

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
      "article_slug",
      "path",
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
        { error: "email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!AUDIENCE_ID) {
      console.error("RESEND_AUDIENCE_ID is not set");
      return NextResponse.json(
        { error: "Newsletter service is not configured" },
        { status: 503 }
      );
    }

    const resend = getResend();

    const { data, error } = await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
    });

    // Contato duplicado (já inscrito) NÃO é falha: seguimos pra entregar o
    // material de novo. Só falhamos de verdade quando o erro não é duplicidade
    // e também não há material pra entregar.
    if (error) {
      const errMsg = (error as { message?: string })?.message ?? "";
      const isDuplicate = /exist|already|duplicat/i.test(errMsg);
      if (!isDuplicate && !deliverSlug) {
        console.error("Resend subscribe error:", error);
        return NextResponse.json(
          { error: "Failed to subscribe" },
          { status: 500 }
        );
      }
      if (!isDuplicate) {
        console.error("Resend subscribe error (entrega segue):", error);
      }
    }

    // Entrega do material (best-effort: nunca derruba a inscrição).
    let delivered = false;
    if (deliverSlug) {
      const paper = getPaperBySlug(deliverSlug);
      if (paper) {
        try {
          const r = await sendPaperDelivery({
            to: email,
            paper,
            name: typeof name === "string" ? name : null,
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
      audience_id: AUDIENCE_ID,
      resend_contact_id: data?.id ?? null,
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

    return NextResponse.json({
      success: true,
      id: data?.id,
      delivered,
      message: "Inscricao realizada com sucesso!",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to subscribe";
    const status = message.includes("RESEND_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
