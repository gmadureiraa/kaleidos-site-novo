/**
 * Building blocks compartilhados pros 8 templates da sequence de leads Kaleidos.
 * HTML inline-safe (Outlook + Gmail + Apple Mail).
 *
 * Regras da sequência (feedback Gabriel 2026-07):
 * - Lead entra só com email: NUNCA personalizar subject/heading com nome.
 * - Reply-to é madureira@kaleidosdigital.com: todo email convida a responder.
 * - Zero travessão no corpo. Subjects sem colchete. Voz tu/teu informal-direta.
 * - Cada email fecha com UMA chamada clara e um caminho de conversão.
 */

export const KALEIDOS_LIME = "#7CF067";
export const KALEIDOS_DARK = "#0A0A0A";

/** Calendly direto (fallback; preferir AGENDAR_URL que rastreia). */
export const CALENDLY_URL = "https://calendly.com/madureira-kaleidosdigital/30min";
/** Página de agendamento com rastreio. */
export const AGENDAR_URL = "https://kaleidos.com.br/agendar";
/** Form de diagnóstico do site. */
export const DIAGNOSTICO_URL = "https://kaleidos.com.br/diagnostico";

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
                Kaleidos · Estratégia e marketing para o mercado cripto
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
                Você recebeu este email porque pediu um diagnóstico ou baixou um material em
                <a href="https://kaleidos.com.br" style="color:#6b7280;">kaleidos.com.br</a>.
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

/**
 * Bloco de recomendação de leitura: capa do playbook (imagem real hospedada
 * em kaleidos.com.br/papers/) + título + CTA. Usar em pelo menos 2 emails
 * da sequência, variando o CTA principal.
 */
export function resourceBlock(opts: {
  title: string;
  coverUrl: string;
  url: string;
  /** Label do botão. Default: "Ler o playbook". */
  label?: string;
  /** Linha pequena acima do título. Default: "Leitura recomendada". */
  kicker?: string;
}): string {
  const { title, coverUrl, url } = opts;
  const label = opts.label || "Ler o playbook";
  const kicker = opts.kicker || "Leitura recomendada";
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0 24px 0;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;">
      <tr>
        <td style="padding:22px 22px 16px 22px;" align="center">
          <a href="${url}" style="text-decoration:none;">
            <img src="${coverUrl}" width="240" alt="Capa: ${escapeHtml(title)}" style="display:block;width:240px;max-width:100%;height:auto;border-radius:10px;border:1px solid #e7e5e4;" />
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:0 22px 4px 22px;" align="center">
          <div style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#6b7280;font-weight:600;margin-bottom:6px;">
            ${escapeHtml(kicker)}
          </div>
          <div style="font-size:17px;font-weight:600;color:#0a0a0a;line-height:1.35;">
            ${escapeHtml(title)}
          </div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:4px 22px 22px 22px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:12px 0 0 0;">
            <tr>
              <td bgcolor="${KALEIDOS_DARK}" style="border-radius:999px;">
                <a href="${url}" style="display:inline-block;padding:12px 24px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;background:${KALEIDOS_DARK};">
                  ${escapeHtml(label)} →
                </a>
              </td>
            </tr>
          </table>
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

// Fonte: descrição oficial do cliente Kaleidos no CRM.
// Citar apenas como prova social leve. NUNCA atribuir número, resultado ou depoimento a nenhuma marca.
export const MARCAS = [
  "Mercado Bitcoin",
  "Crypto.com",
  "Ledger",
  "Parfin",
  "Paradigma Education",
] as const;

// Founders e creators que a Kaleidos atende. Mesma regra: prova social leve,
// nunca inventar resultado.
export const FOUNDERS_CREATORS = [
  "Lucas Amendola (Defiverso)",
  "DSEC",
] as const;

/** Lista de marcas em texto corrido: "A, B, C, D e E". */
export function marcasInline(): string {
  const m = [...MARCAS];
  return `${m.slice(0, -1).join(", ")} e ${m[m.length - 1]}`;
}

/** Marcas + founders/creators em texto corrido. */
export function clientesInline(): string {
  const todos = [...MARCAS, ...FOUNDERS_CREATORS];
  return `${todos.slice(0, -1).join(", ")} e ${todos[todos.length - 1]}`;
}

/** Link de WhatsApp da Kaleidos com mensagem pré-preenchida. */
export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/5512997796835?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Playbooks reais publicados em kaleidos.com.br/papers/<slug>.
 * Slugs e capas conferidos em src/lib/papers-data.ts. NÃO inventar títulos.
 */
export const PLAYBOOKS = {
  bearMarket: {
    title: "Como fazer marketing e vender no bear market",
    url: "https://kaleidos.com.br/papers/bear-market-2026",
    coverUrl: "https://kaleidos.com.br/papers/cover-bear-market-v4.webp",
  },
  bullMarket: {
    title: "Como se Preparar para o Próximo Bull Market",
    url: "https://kaleidos.com.br/papers/bull-market-2026",
    coverUrl: "https://kaleidos.com.br/papers/cover-bull-market.webp",
  },
  tge: {
    title: "Como levar um token do zero ao mercado",
    url: "https://kaleidos.com.br/papers/playbook-tge-2026",
    coverUrl: "https://kaleidos.com.br/papers/cover-tge.webp",
  },
  cripto2026: {
    title: "Para onde vai o marketing cripto em 2026",
    url: "https://kaleidos.com.br/papers/playbook-cripto-2026",
    coverUrl: "https://kaleidos.com.br/papers/cover-playbook.webp",
  },
} as const;

/** Linha padrão de "responde este email" (HTML). Reforça o reply-to humano. */
export function replyNoteHtml(texto?: string): string {
  const t =
    texto ||
    "Prefere email? Responde este aqui mesmo. Quem lê é gente do time, não robô.";
  return `<p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">${escapeHtml(t)}</p>`;
}
