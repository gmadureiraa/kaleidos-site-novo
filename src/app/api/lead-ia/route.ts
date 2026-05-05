import { Resend } from "resend";
import { upsertLead } from "@/lib/db/leads";
import { sendSequenceEmail } from "@/lib/emails/lead-sequence/send";
import { markEmailSent } from "@/lib/db/leads";

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

    // 1. Notificação interna pro time (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const subject = locale === "en"
      ? `[Kaleidos AI] New lead: ${nome}${empresa ? ` (${empresa})` : ""}`
      : `[Kaleidos AI] Novo lead: ${nome}${empresa ? ` (${empresa})` : ""}`;
    const parseList = (raw?: string) =>
      (raw || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const to = parseList(process.env.LEAD_NOTIFICATION_TO).length
      ? parseList(process.env.LEAD_NOTIFICATION_TO)
      : ["madureira@kaleidosdigital.com", "nathalia@kaleidosdigital.com"];
    const cc = parseList(process.env.LEAD_NOTIFICATION_CC).length
      ? parseList(process.env.LEAD_NOTIFICATION_CC)
      : ["gf.madureiraa@gmail.com"];

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
        <p style="color:#666;font-size:14px;margin:0 0 16px 0">Lead capturado pela página /servicos/ia-automacoes-completa</p>
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

    let internalSimulated = false;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Kaleidos <onboarding@resend.dev>",
          to,
          cc,
          replyTo: email,
          subject,
          text,
          html,
        });
      } catch (err) {
        console.error("[lead-ia] erro resend interno:", err);
      }
    } else {
      internalSimulated = true;
      console.log("[lead-ia] RESEND_API_KEY ausente — notificação interna simulada");
    }

    // 2. Persiste lead pra sequence (Postgres). Falha silenciosa se DATABASE_URL ausente.
    let lead = null;
    try {
      lead = await upsertLead({
        email,
        name: nome,
        empresa,
        tamanho,
        whatsapp,
        gargalo,
      });
    } catch (err) {
      console.error("[lead-ia] erro persistindo lead:", err);
    }

    // 3. Dispara email #1 (welcome) imediatamente.
    let welcomeSent = false;
    try {
      const r = await sendSequenceEmail({
        to: email,
        name: nome,
        emailNumber: 1,
        dryRun: false,
      });
      welcomeSent = r.ok;
      if (r.ok && lead) {
        await markEmailSent(lead.id, 1).catch(() => {});
      }
    } catch (err) {
      console.error("[lead-ia] erro enviando welcome:", err);
    }

    // 4. Cadastra contato na Resend Audience (campanhas/broadcasts).
    //    Falha silenciosa: persistência local + welcome já rodaram.
    let audienceAdded = false;
    try {
      const audienceId = process.env.RESEND_AUDIENCE_ID_LEADS;
      if (audienceId && resendApiKey) {
        const resend = new Resend(resendApiKey);
        const parts = (nome || "").trim().split(/\s+/).filter(Boolean);
        const firstName = parts[0];
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
        await resend.contacts.create({
          email,
          audienceId,
          firstName,
          lastName,
          unsubscribed: false,
        });
        audienceAdded = true;
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[lead-ia] contact criado na audience ${audienceId} → ${email}`
          );
        }
      } else if (!audienceId) {
        if (process.env.NODE_ENV !== "production") {
          console.log("[lead-ia] RESEND_AUDIENCE_ID_LEADS ausente — audience skip");
        }
      }
    } catch (err) {
      console.warn("[lead-ia] resend audience create failed", err);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        triggerEmailSequence: true,
        leadId: lead?.id ?? null,
        persisted: lead !== null,
        welcomeSent,
        audienceAdded,
        internalSimulated,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[lead-ia] erro:", err);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
