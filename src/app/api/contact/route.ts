import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      nome = "",
      email = "",
      empresa = "",
      mensagem = "",
      servicos = [],
      locale = "pt",
    } = data || {};

    if (!nome || !email || !mensagem) {
      return new Response(
        JSON.stringify({ ok: false, error: "missing_fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
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
      console.warn("RESEND_API_KEY não definido. Email não enviado. Conteúdo:", {
        to,
        subject,
        text,
      });
      // Retorna 200 para não bloquear o fluxo; logs servem de fallback em dev
      return new Response(JSON.stringify({ ok: true, simulated: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "Kaleidos <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/contact error", error);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


