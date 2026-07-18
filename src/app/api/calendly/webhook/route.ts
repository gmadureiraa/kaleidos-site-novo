import { createHmac, timingSafeEqual } from "crypto";
import { captureServerEvent } from "@/lib/posthog-server";

/**
 * Receptor do webhook do Calendly — fecha o funil "reunião marcada".
 *
 * Registrar no Calendly apontando pra:
 *   https://kaleidos.com.br/api/calendly/webhook
 * Eventos: invitee.created (+ invitee.canceled opcional).
 *
 * Assinatura: header `Calendly-Webhook-Signature` no formato `t=...,v1=...`,
 * onde v1 = HMAC-SHA256(`${t}.${rawBody}`) com a signing key do webhook.
 * Env: CALENDLY_WEBHOOK_SIGNING_KEY — se ausente, aceitamos best-effort com
 * aviso nos logs (pra funcionar em teste antes de setar a env). Se presente,
 * assinatura inválida = 401.
 */

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Verifica a assinatura do Calendly. Retorna true se válida. */
function verifySignature(
  rawBody: string,
  header: string | null,
  signingKey: string
): boolean {
  if (!header) return false;
  try {
    // Formato: "t=1234567890,v1=abcdef..."
    const parts = new Map<string, string>();
    for (const kv of header.split(",")) {
      const idx = kv.indexOf("=");
      if (idx > 0) parts.set(kv.slice(0, idx).trim(), kv.slice(idx + 1).trim());
    }
    const t = parts.get("t");
    const v1 = parts.get("v1");
    if (!t || !v1) return false;

    const expected = createHmac("sha256", signingKey)
      .update(`${t}.${rawBody}`, "utf8")
      .digest("hex");

    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(v1, "hex");
    if (a.length === 0 || a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

type CalendlyTracking = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  salesforce_uuid?: string | null;
};

export async function POST(request: Request) {
  let rawBody = "";
  try {
    rawBody = await request.text();

    // --- Verificação de assinatura -------------------------------------
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
    const sigHeader = request.headers.get("Calendly-Webhook-Signature");
    if (signingKey) {
      if (!verifySignature(rawBody, sigHeader, signingKey)) {
        console.error("[calendly-webhook] assinatura inválida — rejeitado 401");
        return json(401, { ok: false, error: "invalid_signature" });
      }
    } else {
      // Best-effort pra fase de teste — setar a env em produção!
      console.warn(
        "[calendly-webhook] CALENDLY_WEBHOOK_SIGNING_KEY ausente — aceitando SEM verificar assinatura (setar a env em produção)"
      );
    }

    // --- Parse do evento -------------------------------------------------
    let body: {
      event?: string;
      payload?: {
        email?: string;
        name?: string;
        tracking?: CalendlyTracking | null;
        scheduled_event?: { name?: string; start_time?: string } | null;
        cancel_url?: string;
      };
    };
    try {
      body = JSON.parse(rawBody);
    } catch {
      return json(400, { ok: false, error: "invalid_json" });
    }

    const event = body?.event ?? "";
    const payload = body?.payload ?? {};

    if (event !== "invitee.created" && event !== "invitee.canceled") {
      // Evento não tratado — 200 pra Calendly não ficar reenviando.
      return json(200, { ok: true, ignored: event || "unknown_event" });
    }

    const email = String(payload.email ?? "").trim().toLowerCase();
    const name = String(payload.name ?? "").slice(0, 200);
    if (!email) {
      console.warn(
        `[calendly-webhook] ${event} sem email no payload — ignorando`
      );
      return json(200, { ok: true, ignored: "missing_email" });
    }

    // UTMs vindas do embed/link do Calendly (payload.tracking).
    const tracking = payload.tracking ?? {};
    const utm: Record<string, string> = {};
    for (const k of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ] as const) {
      const v = tracking?.[k];
      if (typeof v === "string" && v) utm[k] = v.slice(0, 300);
    }

    const meetingName = payload.scheduled_event?.name ?? null;
    const meetingStart = payload.scheduled_event?.start_time ?? null;

    // --- Evento PostHog (best-effort, nunca lança) ----------------------
    const phEvent =
      event === "invitee.created" ? "meeting_booked" : "meeting_canceled";
    await captureServerEvent(email, phEvent, {
      source: "calendly",
      name: name || null,
      meeting_name: meetingName,
      meeting_start: meetingStart,
      ...utm,
    });

    // --- Espelho no CRM do KAI (opcional, mesmo padrão best-effort do
    //     /api/contact: env-gated, timeout curto, nunca derruba a resposta).
    let crmSynced = false;
    const kaiIngestUrl = process.env.KAI_CRM_INGEST_URL;
    if (kaiIngestUrl && event === "invitee.created") {
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
            source: "calendly-meeting",
            name,
            email,
            message: `Reunião marcada via Calendly${meetingName ? `: ${meetingName}` : ""}${meetingStart ? ` (${meetingStart})` : ""}`,
            channel: "calendly",
            utm_source: utm.utm_source ?? null,
            utm_campaign: utm.utm_campaign ?? null,
          }),
        });
        clearTimeout(t);
        crmSynced = resp.ok;
        if (!resp.ok) {
          console.error(
            `[calendly-webhook] KAI CRM respondeu ${resp.status} — evento PostHog já registrado (${email})`
          );
        }
      } catch (err) {
        console.error(
          `[calendly-webhook] KAI CRM falhou — evento PostHog já registrado (${email})`,
          err
        );
      }
    }

    return json(200, { ok: true, event, crmSynced });
  } catch (err) {
    // Nunca perder o rastro: loga o corpo cru (limitado) pra recuperação manual.
    console.error(
      `[calendly-webhook] erro inesperado — body: ${rawBody.slice(0, 1500)}`,
      err
    );
    return json(500, { ok: false, error: "server_error" });
  }
}
