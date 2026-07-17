import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildWelcomeEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const greeting = name ? `Oi, ${escapeHtml(name)}.` : "Oi.";

  const subject = `Recebido. Teu diagnóstico sai em 48h (e um case pra já)`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${greeting} A Kaleidos recebeu o teu pedido.
    </h1>
    <p style="margin:0 0 14px 0;">
      A promessa vem primeiro: em <strong>até 48h</strong> o time volta direto no teu email com um
      diagnóstico objetivo, 3 alvos prioritários e a estimativa de quantas horas por mês dá pra
      liberar na tua operação.
    </p>
    <p style="margin:0 0 6px 0;">
      Enquanto isso, um case que provavelmente parece com o teu cenário: a operação editorial do
      Defiverso, que a Kaleidos toca há mais de 2 anos.
    </p>

    ${caseBlock({
      cliente: "Defiverso · educação cripto",
      vertical: "Pipeline editorial + agentes de research",
      antes:
        "1 newsletter por semana custava 3 dias de pesquisa manual cruzando newsletter gringa, X e veículo cripto. Toda quinta o time fechava a sexta no limite.",
      depois:
        "Agentes varrem as fontes, cruzam os dados e devolvem um briefing acionável. O editor humano refina e publica. O tempo de pesquisa caiu para cerca de 30 min por edição.",
      numero: "+14 mil alunos · 3 newsletters por semana sem aumentar o time",
    })}

    <p style="margin:0 0 14px 0;">
      O detalhe que faz diferença: a IA <strong>não substituiu</strong> o editor. Tirou dele a parte
      mecânica e devolveu o tempo pra curadoria, ângulo e voz. É esse tipo de troca que a gente vai
      mapear no teu diagnóstico.
    </p>

    ${ctaButton("Adiantar e agendar meu diagnóstico", ctaUrl("welcome"))}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Nos próximos 10 dias chegam mais 3 emails, cada um com um case diferente (Lucas Amendola,
      DSEC Labs e Layla Foz) e o jeito exato que a IA entrou na operação de cada um. Depois disso o
      contato para. Só volta se tu quiser.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> se o teu gargalo é urgente, responde esse email com 1 frase descrevendo o
      problema. O time pula a fila e volta antes das 48h.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Em 48h o time volta com 3 alvos e um número. Por ora, 1 case real.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${greeting} A Kaleidos recebeu o teu pedido. Em até 48h o time volta com um diagnóstico, 3 alvos prioritários e a estimativa de horas que dá pra liberar por mês.

Enquanto isso, um case: a operação editorial do Defiverso roda há mais de 2 anos. Antes, 1 newsletter custava 3 dias de pesquisa manual. Depois, agentes cruzam as fontes e devolvem o briefing em cerca de 30 min. Resultado: +14 mil alunos, 3 newsletters por semana, sem aumentar o time.

A IA não substituiu o editor. Tirou a parte mecânica e devolveu o tempo pra curadoria e voz.

Adiantar e agendar meu diagnóstico: ${ctaUrl("welcome")}

PS: se for urgente, responde esse email com 1 frase do problema. O time pula a fila.

Descadastrar: ${opts.unsubUrl}`,
  };
}
