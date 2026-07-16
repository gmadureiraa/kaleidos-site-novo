/**
 * Building blocks compartilhados pros 4 templates da sequence Kaleidos AI.
 * HTML inline-safe (Outlook + Gmail + Apple Mail).
 */

export const KALEIDOS_LIME = "#7CF067";
export const KALEIDOS_DARK = "#0A0A0A";

export function shell(opts: {
  preheader: string;
  bodyHtml: string;
  unsubUrl: string;
  ctaUrl?: string;
  ctaLabel?: string;
}): string {
  const { preheader, bodyHtml, unsubUrl } = opts;
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Kaleidos</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f5f4;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e5e4;">
          <tr>
            <td style="padding:32px 36px 8px 36px;">
              <div style="font-family:Inter,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#6b7280;font-weight:600;">
                Kaleidos · IA na operação
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 24px 36px;font-size:15px;line-height:1.65;color:#1f2937;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px 36px;border-top:1px solid #f1f1ef;">
              <p style="margin:24px 0 8px 0;font-size:12px;color:#9ca3af;line-height:1.5;">
                Recebeu por ter pedido um diagnóstico em
                <a href="https://kaleidos.com.br/servicos/ia-automacoes-completa" style="color:#6b7280;">kaleidos.com.br/servicos/ia-automacoes-completa</a>.
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Não quer mais receber?
                <a href="${unsubUrl}" style="color:#6b7280;text-decoration:underline;">descadastrar</a>.
              </p>
            </td>
          </tr>
        </table>
        <div style="font-size:11px;color:#9ca3af;padding:16px 0 0 0;font-family:Inter,sans-serif;">
          Kaleidos · São Paulo, BR
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function ctaButton(label: string, url: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
      <tr>
        <td bgcolor="${KALEIDOS_DARK}" style="border-radius:999px;">
          <a href="${url}" style="display:inline-block;padding:14px 28px;font-family:Inter,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;background:${KALEIDOS_DARK};">
            ${escapeHtml(label)} →
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function caseBlock(opts: {
  cliente: string;
  vertical: string;
  antes: string;
  depois: string;
  numero: string;
}): string {
  const { cliente, vertical, antes, depois, numero } = opts;
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0 24px 0;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;">
      <tr>
        <td style="padding:20px 22px;">
          <div style="font-family:Inter,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;font-weight:600;margin-bottom:6px;">
            Case · ${escapeHtml(vertical)}
          </div>
          <div style="font-size:18px;font-weight:600;color:#0a0a0a;margin-bottom:14px;">
            ${escapeHtml(cliente)}
          </div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="60" valign="top" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9ca3af;font-family:Inter,sans-serif;font-weight:600;padding-top:2px;">
                Antes
              </td>
              <td style="font-size:14px;color:#4b5563;line-height:1.55;padding-bottom:8px;">
                ${escapeHtml(antes)}
              </td>
            </tr>
            <tr>
              <td width="60" valign="top" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#16a34a;font-family:Inter,sans-serif;font-weight:600;padding-top:2px;">
                Depois
              </td>
              <td style="font-size:14px;color:#1f2937;line-height:1.55;">
                ${escapeHtml(depois)}
              </td>
            </tr>
          </table>
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed #e7e5e4;font-size:13px;color:#0a0a0a;font-weight:600;">
            ${escapeHtml(numero)}
          </div>
        </td>
      </tr>
    </table>
  `;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ctaUrl(origem: string): string {
  return `https://kaleidos.com.br/servicos/ia-automacoes-completa?utm_source=email&utm_medium=lead-sequence&utm_campaign=${encodeURIComponent(origem)}#diagnostico`;
}
