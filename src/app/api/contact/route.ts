import { Resend } from "resend";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent } from "@/lib/posthog-server";

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
    const to = [
      "madureira@kaleidosdigital.com",
      "nathalia@kaleidosdigital.com",
    ];
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

    if (!resendApiKey) {
      // Retorna 200 para não bloquear o fluxo em desenvolvimento
      return new Response(JSON.stringify({ ok: true, simulated: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: fromAddress,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    await captureServerEvent(String(email).trim().toLowerCase(), "contact_submitted", {
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

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


