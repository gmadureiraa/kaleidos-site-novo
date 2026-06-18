// Email transacional de ENTREGA do lead magnet (paper/guia da Kaleidos).
// Disparado no momento da captura do email no gate dos papers (ou no popup).
// O objetivo é honrar a promessa: deu o email, recebe o material na hora.
//
// from: RESEND_FROM (@news.kaleidos.com.br, domínio verificado). NUNCA usar
// @kaleidos.com.br apex (não verificado) — cai no catch e o lead não recebe nada.

import { Resend } from "resend";
import type { Paper } from "@/lib/papers-data";

const SITE = "https://kaleidos.com.br";
const LIME = "#7CFF6B";
const DARK = "#0A0A0A";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function abs(path: string): string {
  if (!path) return SITE;
  return path.startsWith("http") ? path : `${SITE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildPaperDeliveryEmail(opts: { paper: Paper; name?: string | null }) {
  const { paper } = opts;
  const name = opts.name?.trim().split(" ")[0] || "";
  const greeting = name ? `Oi, ${esc(name)}.` : "Oi.";

  const readUrl = `${SITE}/papers/${paper.slug}/read.html`;
  const pdfUrl = paper.pdf ? abs(paper.pdf) : "";
  const coverUrl = abs(paper.cover);
  const accent = paper.accent || LIME;
  const label = paper.volume?.toLowerCase().includes("playbook") ? "Guia" : "Estudo";
  // Alguns papers só têm PDF (sem read.html) — não oferecer "ler na web" pra não cair em 404.
  const hasRead = paper.readHtml !== false;

  const subject = `[Kaleidos] Seu acesso: ${paper.title}`;

  const highlights = (paper.highlights || [])
    .slice(0, 3)
    .map(
      (h) =>
        `<li style="margin:0 0 8px 0;padding-left:18px;position:relative;font-size:14px;color:#3f3f46;line-height:1.55;">
          <span style="position:absolute;left:0;top:8px;width:7px;height:7px;border-radius:999px;background:${accent};"></span>
          ${esc(h)}
        </li>`
    )
    .join("");

  // Quando não há leitura web, o PDF vira o CTA primário (fundo escuro).
  const pdfButton = pdfUrl
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-block;margin:0 8px 0 0;">
         <tr><td style="border-radius:999px;${hasRead ? "border:1px solid #d4d4d8;" : `background:${DARK};`}">
           <a href="${pdfUrl}" style="display:inline-block;padding:${hasRead ? "13px 24px" : "14px 26px"};font-family:Inter,sans-serif;font-size:14px;font-weight:600;color:${hasRead ? "#111" : "#ffffff"};text-decoration:none;">Baixar o PDF</a>
         </td></tr>
       </table>`
    : "";
  const readButton = hasRead
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-block;margin:0 8px 0 0;">
         <tr><td bgcolor="${DARK}" style="border-radius:999px;">
           <a href="${readUrl}" style="display:inline-block;padding:14px 26px;font-family:Inter,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;background:${DARK};">
             Ler o ${esc(label.toLowerCase())} completo →
           </a>
         </td></tr>
       </table>`
    : "";

  const html = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Kaleidos Papers</title></head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Seu acesso ao ${esc(paper.title)} está liberado. Leia na web ou baixe o PDF.</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F5F1E8;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e2d6;">
        <tr><td style="padding:30px 36px 6px 36px;">
          <div style="font-family:Inter,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8577;font-weight:600;">
            Kaleidos Papers · ${esc(paper.volume)}
          </div>
        </td></tr>
        <tr><td style="padding:6px 36px 8px 36px;">
          <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:700;color:#0a0a0a;margin:8px 0 6px 0;line-height:1.2;">
            ${greeting} Seu acesso ao <span style="color:#111;">${esc(paper.title)}</span> está liberado.
          </h1>
          <p style="margin:0 0 18px 0;font-size:15px;color:#3f3f46;line-height:1.6;">
            ${esc(paper.subtitle)}. Pode ler direto na web ou baixar o PDF pra ler com calma.
          </p>
        </td></tr>
        <tr><td style="padding:0 36px 8px 36px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fafaf9;border:1px solid #ececec;border-radius:12px;">
            <tr>
              <td width="120" valign="top" style="padding:16px 0 16px 16px;">
                <img src="${coverUrl}" alt="Capa ${esc(paper.title)}" width="104" style="display:block;width:104px;height:auto;border-radius:8px;border:1px solid #e5e5e5;" />
              </td>
              <td valign="top" style="padding:16px 16px 16px 14px;">
                <div style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8a8577;font-weight:600;margin-bottom:6px;">
                  ${esc(label)} · ${esc(String(paper.pages))} páginas · ${esc(paper.readTime)}
                </div>
                <ul style="margin:0;padding:0;list-style:none;">${highlights}</ul>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:18px 36px 4px 36px;">
          ${readButton}
          ${pdfButton}
        </td></tr>
        <tr><td style="padding:22px 36px 30px 36px;border-top:1px solid #f1efe9;">
          <p style="margin:18px 0 8px 0;font-size:13px;color:#71717a;line-height:1.6;">
            Esse é um dos estudos da Kaleidos sobre marketing cripto e web3. Você vai
            receber os próximos volumes em primeira mão. Sem spam.
          </p>
          <p style="margin:0;font-size:12px;color:#a1a1aa;">
            Tem um projeto cripto/web3 pra crescer?
            <a href="${SITE}/servicos/ia-automacoes-completa?utm_source=email&utm_medium=paper-delivery&utm_campaign=${encodeURIComponent(paper.slug)}" style="color:#71717a;text-decoration:underline;">fale com a Kaleidos</a>.
          </p>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#a8a399;padding:16px 0 0 0;font-family:Inter,sans-serif;">Kaleidos · São Paulo, BR</div>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `${greeting} Seu acesso ao ${paper.title} está liberado.

${paper.subtitle}.

${hasRead ? `Ler na web: ${readUrl}` : ""}
${pdfUrl ? `Baixar o PDF: ${pdfUrl}` : ""}

Você vai receber os próximos volumes da Kaleidos em primeira mão.
Tem um projeto cripto/web3 pra crescer? ${SITE}/servicos/ia-automacoes-completa`;

  return { subject, html, text };
}

export async function sendPaperDelivery(opts: {
  to: string;
  paper: Paper;
  name?: string | null;
}): Promise<{ ok: boolean; simulated?: boolean; error?: string }> {
  const built = buildPaperDeliveryEmail({ paper: opts.paper, name: opts.name });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[paper-delivery] RESEND_API_KEY ausente — simulando envio");
    return { ok: true, simulated: true };
  }

  const from = process.env.RESEND_FROM ?? "Kaleidos <contato@news.kaleidos.com.br>";
  const replyTo =
    process.env.LEAD_SEQUENCE_REPLY_TO ?? "madureira@kaleidosdigital.com";

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: opts.to,
      replyTo,
      subject: built.subject,
      html: built.html,
      text: built.text,
    });
    return { ok: true };
  } catch (err) {
    console.error("[paper-delivery] erro Resend:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
