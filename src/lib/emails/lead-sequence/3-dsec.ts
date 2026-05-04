import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildDsecEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `Como a DSEC Labs cresceu @alfredp2p sem time de social`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, terceiro case.` : "Terceiro case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      Esse é o gargalo de B2B técnico: o produto exige presença diária na comunidade
      (no caso da DSEC, X em inglês), mas o time não tem bandwidth pra responder
      30+ menções por dia mantendo voz consistente.
    </p>

    ${caseBlock({
      cliente: "DSEC Labs · Bitcoin security B2B",
      vertical: "Persona Alfred + reply-guy framework",
      antes:
        "Comunidade no X exigia engajamento técnico em inglês, com nuance e tom da marca. Time não tinha como sustentar. A presença caía, o produto sumia da conversa.",
      depois:
        "Persona Alfred (mascote DSEC) + framework de reply guy + agentes que sugerem replies a partir de tema viral de cibersegurança. Decisão final é humana, mas o template já vem pronto na voz do Alfred.",
      numero: "30+ replies/dia mantidos por 1 pessoa em 1 hora · operação 40/25/20/10/5 nos pilares",
    })}

    <p style="margin:0 0 14px 0;">
      O ponto importante: <strong>nada vai pro ar sem revisão humana.</strong> A IA gera o esqueleto,
      o operador aprova ou descarta. Resultado é volume sem soar IA-genérica.
    </p>
    <p style="margin:0 0 14px 0;">
      Esse é o padrão Kaleidos: IA entra como camada de produtividade,
      decisão de marca continua sendo do time.
    </p>

    ${ctaButton("Discutir esse padrão pro meu produto", ctaUrl("dsec"))}

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> a Kaleidos atende fora do nicho cripto também. O método de IA na operação
      vale pra qualquer empresa B2B/B2C com volume de conteúdo, atendimento ou comunidade ativa.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "30+ replies/dia em 1h. Reply-guy framework com persona.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, terceiro case.` : "Terceiro case."}

DSEC Labs — produto Bitcoin security B2B. Antes: comunidade X exigia replies diários em inglês com voz técnica. Time não escalava.

Depois: persona Alfred + framework de reply guy + agentes sugerem replies. Decisão final é humana. 30+ replies/dia em 1h, operação editorial 40/25/20/10/5.

Discutir esse padrão pro meu produto: ${ctaUrl("dsec")}

Descadastrar: ${opts.unsubUrl}`,
  };
}
