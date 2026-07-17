import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildDsecEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `30 replies técnicos por dia, 1 pessoa, 1 hora`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, terceiro case.` : "Terceiro case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      Esse é o gargalo clássico de B2B técnico: o produto exige presença diária na comunidade
      (no caso da DSEC Labs, o X em inglês), mas ninguém no time tem bandwidth pra responder
      30+ menções por dia mantendo voz consistente. Então a presença cai, e o produto some da conversa.
    </p>

    ${caseBlock({
      cliente: "DSEC Labs · Bitcoin security B2B",
      vertical: "Persona Alfred + reply-guy framework",
      antes:
        "A comunidade no X exigia engajamento técnico em inglês, com nuance e tom de marca. O time não tinha como sustentar. A presença caía e o produto sumia da conversa.",
      depois:
        "Persona Alfred (mascote da DSEC) + framework de reply guy + agentes que sugerem replies a partir dos temas virais de cibersegurança do dia. A decisão final é sempre humana, mas o template já chega pronto na voz do Alfred.",
      numero: "30+ replies/dia mantidos por 1 pessoa em 1 hora · operação 40/25/20/10/5 nos pilares",
    })}

    <p style="margin:0 0 14px 0;">
      O detalhe que segura a qualidade: <strong>nada vai pro ar sem revisão humana.</strong>
      A IA gera o esqueleto, o operador aprova, edita ou descarta. O resultado é volume
      sem soar IA genérica.
    </p>
    <p style="margin:0 0 14px 0;">
      Esse é o padrão Kaleidos em qualquer frente: a IA entra como camada de produtividade,
      a decisão de marca continua sendo do time.
    </p>

    ${ctaButton("Discutir esse padrão pro meu produto", ctaUrl("dsec"))}

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> a Kaleidos atende fora do nicho cripto também. O método vale pra qualquer
      empresa B2B ou B2C com volume de conteúdo, atendimento ou comunidade ativa.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Como a DSEC Labs mantém presença técnica diária no X sem time de social.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, terceiro case.` : "Terceiro case."}

O gargalo clássico de B2B técnico: o produto exige presença diária na comunidade, mas ninguém tem bandwidth pra responder 30+ menções por dia mantendo voz consistente.

DSEC Labs, Bitcoin security B2B. Antes: a comunidade no X exigia replies técnicos diários em inglês, com nuance e tom de marca. O time não escalava, a presença caía.

Depois: persona Alfred (mascote da DSEC) + framework de reply guy + agentes que sugerem replies a partir dos temas virais do dia. A decisão final é sempre humana. Resultado: 30+ replies/dia mantidos por 1 pessoa em 1 hora, operação 40/25/20/10/5 nos pilares.

Nada vai pro ar sem revisão humana. A IA gera o esqueleto, o operador aprova ou descarta.

Discutir esse padrão pro meu produto: ${ctaUrl("dsec")}

PS: a Kaleidos atende fora do nicho cripto também. O método vale pra qualquer empresa com volume de conteúdo, atendimento ou comunidade ativa.

Descadastrar: ${opts.unsubUrl}`,
  };
}
