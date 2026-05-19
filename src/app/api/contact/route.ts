import { Resend } from "resend";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent } from "@/lib/posthog-server";

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
    } = data || {};

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
    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
        <h2 style="margin:0 0 12px 0;">${subject}</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
        ${(servicos || []).length ? `<p><strong>Serviços:</strong> ${(servicos || []).join(", ")}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0;"/>
        <p style="white-space:pre-wrap">${mensagem}</p>
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

    await captureServerEvent(email, "contact_submitted", {
      empresa: empresa || null,
      servicos_count: (servicos || []).length,
      locale,
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


