import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildLucasEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `De 6 horas pra 12 segundos: o pipeline de reels do Lucas Amendola`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, segundo case.` : "Segundo case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      O gargalo mais comum que a Kaleidos encontra em creator economy não é falta de ideia.
      É o tempo que cada peça consome até virar publicação. Uma ideia boa que custa 6 horas
      de produção vira uma ideia que não sai.
    </p>
    <p style="margin:0 0 6px 0;">
      O Lucas Amendola (Investidor 4.20) é a prova de como sair desse loop sem perder a voz:
    </p>

    ${caseBlock({
      cliente: "Lucas Amendola · Investidor 4.20",
      vertical: "Reels Viral + repurpose pipeline",
      antes:
        "Produzir 1 reels exigia roteiro, gravação, edição e publicação: 4 a 6 horas por peça. O ritmo ideal era 3 reels por semana. Quase nunca acontecia. A fila travava, o time esgotava.",
      depois:
        "Ele cola o link de um reels referência no Reels Viral (produto Kaleidos) e a ferramenta devolve análise cena por cena, roteiro adaptado e storyboard pronto em cerca de 12 segundos. O Lucas grava em 30 min e edita em 1h.",
      numero: "174k IG · 380k YouTube · 1 pessoa entregando o que antes precisava de 3",
    })}

    <p style="margin:0 0 14px 0;">
      A peça continua sendo dele: a voz, o take, o jeito de explicar. O que mudou foi a etapa
      que tirava o ar, a montagem do roteiro a partir de um formato que já provou que funciona.
    </p>

    <p style="margin:0 0 14px 0;">
      No diagnóstico que a Kaleidos entrega, esse tipo de gargalo aparece com nome e número:
      <em>quantas horas por semana ele consome hoje, quantas viram livres e quanto custa cada uma.</em>
    </p>

    ${ctaButton("Quero esse cálculo pro meu time", ctaUrl("lucas"))}

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> o Reels Viral é um dos 4 produtos próprios da Kaleidos. Quando o cliente
      contrata, ele entra no fluxo dele: não como SaaS de aluguel, como ferramenta dentro da operação.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Roteiro, análise e storyboard em 12 segundos. Lucas grava em 30 min.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, segundo case.` : "Segundo case."}

O gargalo mais comum em creator economy não é falta de ideia. É o tempo que cada peça consome até virar publicação.

Lucas Amendola (Investidor 4.20). Antes: produzir 1 reels custava de 4 a 6 horas, e o ritmo de 3 por semana quase nunca acontecia. Depois: ele cola o link de um reels referência no Reels Viral (produto Kaleidos) e recebe análise cena por cena, roteiro adaptado e storyboard em cerca de 12 segundos. Grava em 30 min, edita em 1h.

Resultado: 174k IG, 380k YouTube. 1 pessoa entregando o que antes precisava de 3.

A voz continua sendo dele. O que mudou foi a etapa mecânica.

Quero esse cálculo pro meu time: ${ctaUrl("lucas")}

PS: o Reels Viral é um dos 4 produtos próprios da Kaleidos. Quando o cliente contrata, ele entra na operação dele.

Descadastrar: ${opts.unsubUrl}`,
  };
}
