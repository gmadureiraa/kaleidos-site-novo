import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      nome = "",
      email = "",
      empresa = "",
      tamanho = "",
      gargalo = "",
      whatsapp = "",
      locale = "pt",
    } = data || {};

    if (!nome || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: "missing_fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const subject = locale === "en"
      ? `[Kaleidos AI] New lead: ${nome}${empresa ? ` (${empresa})` : ""}`
      : `[Kaleidos AI] Novo lead: ${nome}${empresa ? ` (${empresa})` : ""}`;
    const to = [
      "madureira@kaleidosdigital.com",
      "nathalia@kaleidosdigital.com",
    ];

    const text = `
Nome: ${nome}
Email: ${email}
WhatsApp: ${whatsapp}
Empresa: ${empresa}
Tamanho do time: ${tamanho}

Gargalo principal:
${gargalo}
`;

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
        <h2 style="margin:0 0 12px 0;">${subject}</h2>
        <p style="color:#666;font-size:14px;margin:0 0 16px 0">Lead capturado pela página /servicos/ia-automacoes</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:140px">Nome</td><td style="padding:6px 0"><strong>${nome}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${email}</td></tr>
          ${whatsapp ? `<tr><td style="padding:6px 0;color:#666">WhatsApp</td><td style="padding:6px 0">${whatsapp}</td></tr>` : ""}
          ${empresa ? `<tr><td style="padding:6px 0;color:#666">Empresa</td><td style="padding:6px 0">${empresa}</td></tr>` : ""}
          ${tamanho ? `<tr><td style="padding:6px 0;color:#666">Tamanho do time</td><td style="padding:6px 0">${tamanho}</td></tr>` : ""}
        </table>
        ${gargalo ? `
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;"/>
        <p style="color:#666;font-size:13px;margin:0 0 6px 0">Gargalo principal</p>
        <p style="white-space:pre-wrap;margin:0">${gargalo}</p>
        ` : ""}
      </div>
    `;

    if (!resendApiKey) {
      // Em dev sem key, retorna ok pra não bloquear o fluxo
      console.log("[lead-ia] RESEND_API_KEY ausente — simulando envio:", { nome, email, empresa, tamanho, gargalo });
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
  } catch (err) {
    console.error("[lead-ia] erro:", err);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
