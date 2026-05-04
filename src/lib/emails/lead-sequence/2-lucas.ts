import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildLucasEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `Como o Lucas Amendola roda 3 reels/sem com 1 pessoa`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, segundo case.` : "Segundo case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      O gargalo mais comum que a Kaleidos vê hoje em creator econômico não é falta de ideia.
      É o tempo que cada peça consome até virar publicação.
    </p>
    <p style="margin:0 0 6px 0;">
      O Lucas Amendola — Investidor 4.20 — é referência de como sair desse loop sem perder voz:
    </p>

    ${caseBlock({
      cliente: "Lucas Amendola · Investidor 4.20",
      vertical: "Reels Viral + repurpose pipeline",
      antes:
        "Produzir 1 reels viral exigia roteiro, gravação, edição e publicação — 4 a 6 horas por peça. O ritmo ideal era 3 reels/semana. Quase nunca acontecia: a fila travava, o time esgotava.",
      depois:
        "Cole o link de um reels referência no Reels Viral (produto Kaleidos): a ferramenta entrega análise cena por cena, roteiro adaptado e storyboard pronto em ~12 segundos. Lucas grava em 30 min, edita em 1h.",
      numero: "174k IG · 380k YouTube · 1 pessoa entregando o que antes precisava de 3",
    })}

    <p style="margin:0 0 14px 0;">
      A peça nova continua sendo dele. O que mudou foi a etapa que tirava o ar:
      a montagem do roteiro a partir de um reels que já viralizou.
    </p>

    <p style="margin:0 0 14px 0;">
      No diagnóstico que a Kaleidos vai entregar pra ti, esse tipo de gargalo aparece com nome e número:
      <em>quantas horas/semana hoje, quantas viram livres, quanto custa a hora.</em>
    </p>

    ${ctaButton("Quero esse cálculo pro meu time", ctaUrl("lucas"))}

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> Reels Viral é um dos 4 produtos próprios da Kaleidos. Quando o cliente contrata,
      eles entram no fluxo — não como SaaS de aluguel, como ferramenta dentro da operação dele.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "1 reels viral em 12s. Lucas Amendola gravando em 30 min.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, segundo case.` : "Segundo case."}

Lucas Amendola (Investidor 4.20) — antes: produzir 1 reels viral custava 4-6h. Depois: cole link no Reels Viral, ferramenta entrega análise + roteiro + storyboard em ~12s. Grava em 30 min, edita em 1h.

Resultado: 174k IG, 380k YouTube. 1 pessoa entregando o que precisava de 3.

Quero esse cálculo pro meu time: ${ctaUrl("lucas")}

Descadastrar: ${opts.unsubUrl}`,
  };
}
