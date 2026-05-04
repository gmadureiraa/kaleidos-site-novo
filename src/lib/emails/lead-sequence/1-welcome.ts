import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildWelcomeEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const greeting = name ? `Oi, ${escapeHtml(name)}.` : "Oi.";

  const subject = `[Kaleidos] Recebido. + 1 case real pra começar`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${greeting} A Kaleidos recebeu o teu pedido.
    </h1>
    <p style="margin:0 0 14px 0;">
      Promessa primeiro: o time volta com diagnóstico em <strong>até 48h</strong> direto pro teu email,
      com 3 alvos prioritários e estimativa de hora liberada por mês.
    </p>
    <p style="margin:0 0 6px 0;">
      Enquanto isso, um case que provavelmente parece com o teu cenário —
      a operação editorial do Defiverso, que a Kaleidos toca há 2+ anos:
    </p>

    ${caseBlock({
      cliente: "Defiverso · educação cripto",
      vertical: "Pipeline editorial + agentes de research",
      antes:
        "1 newsletter por semana custava 3 dias de pesquisa manual cruzando newsletter gringa, X e veículo cripto. O time saía toda quinta exausto pra fechar a sexta.",
      depois:
        "Agentes varrem fonte, cruzam dado e devolvem briefing acionável. Editor humano refina e publica. Tempo de pesquisa caiu pra ~30 min por edição.",
      numero: "+14k alunos · 3 newsletters/semana sem aumentar o time",
    })}

    <p style="margin:0 0 14px 0;">
      O detalhe que faz diferença: a IA <strong>não substituiu</strong> o editor.
      Tirou dele a parte mecânica e devolveu o tempo pra curadoria, ângulo e voz.
      É esse o tipo de troca que a Kaleidos vai te ajudar a mapear no diagnóstico.
    </p>

    ${ctaButton("Adiantar e agendar diagnóstico", ctaUrl("welcome"))}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Nos próximos 10 dias chegam mais 3 emails — cada um com um case diferente
      (Lucas Amendola, DSEC Labs e Layla Foz) e o jeito que a IA entrou na operação deles.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> se o teu gargalo é urgente, responde esse email com 1 frase
      descrevendo o problema. O time pula a fila.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Recebido. Em 48h o time volta. Por enquanto, 1 case real.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${greeting} A Kaleidos recebeu o teu pedido. O time volta com diagnóstico em até 48h.

Enquanto isso, um case: a operação editorial do Defiverso roda há 2+ anos. Antes: 1 newsletter custava 3 dias de pesquisa manual. Depois: agentes cruzam fonte e devolvem briefing em ~30 min. Resultado: 14k+ alunos, 3 newsletters/semana, sem aumentar o time.

Adiantar e agendar diagnóstico: ${ctaUrl("welcome")}

PS: se for urgente, responde esse email com 1 frase do problema. O time pula a fila.

Descadastrar: ${opts.unsubUrl}`,
  };
}
