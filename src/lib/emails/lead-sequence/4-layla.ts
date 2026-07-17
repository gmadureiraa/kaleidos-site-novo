import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildLaylaEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `4x mais conteúdo sem perder a voz (último case, última pergunta)`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, quarto e último case.` : "Quarto e último case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      A objeção mais comum contra IA na operação é a perda de voz. A Layla Foz é o case
      que prova o contrário: quando o pipeline é desenhado certo, a voz fica
      <strong>mais</strong> consistente, não menos.
    </p>

    ${caseBlock({
      cliente: "Layla Foz · espiritualidade e feminino",
      vertical: "Voice profile + biblioteca de prompts",
      antes:
        "Voz muito específica e poética. Criar conteúdo cross-format (carrossel, reels, newsletter, curso) sem perder a essência exigia que ela escrevesse tudo. O time tentava ajudar, soava genérico. O volume nunca crescia.",
      depois:
        "Voice profile treinado na obra dela + biblioteca de prompts + revisão humana sempre obrigatória. O time produz 4x mais peças com a voz preservada em todos os formatos.",
      numero: "184k IG · 4x mais conteúdo com o mesmo time · voz consistente em 4 formatos",
    })}

    <p style="margin:0 0 14px 0;">
      Os 4 cases dessa sequência (Defiverso, Lucas, DSEC e Layla) são frentes muito diferentes:
      educação cripto, creator economy, B2B técnico e marca pessoal autoral.
      O método é o mesmo: <em>identificar o gargalo, implementar IA dentro do fluxo e medir em horas liberadas.</em>
    </p>

    <p style="margin:0 0 14px 0;font-weight:600;color:#0a0a0a;">
      Esse é o último email da sequência. A pergunta é simples: faz sentido marcar o diagnóstico ou não?
    </p>

    ${ctaButton("Marcar diagnóstico (resposta em 48h)", ctaUrl("layla"))}

    <p style="margin:0 0 14px 0;font-size:14px;color:#6b7280;">
      Se agora não é o momento, sem rancor:
      <a href="${escapeHtml(opts.unsubUrl)}" style="color:#6b7280;text-decoration:underline;">descadastra aqui</a>
      e a sequência para por aí. A caixa de entrada de todo mundo agradece.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> esse é o último email automático. Daqui pra frente, contato só por iniciativa tua:
      respondendo esse email ou pelo formulário do site.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Voz autoral em escala, 184k IG. E a última pergunta da sequência.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, quarto e último case.` : "Quarto e último case."}

A objeção mais comum contra IA na operação é a perda de voz. A Layla Foz prova o contrário: com o pipeline certo, a voz fica mais consistente, não menos.

Antes: voz muito específica e poética, criar conteúdo cross-format sem perder a essência exigia que ela escrevesse tudo. O time tentava ajudar, soava genérico. Depois: voice profile treinado na obra dela + biblioteca de prompts + revisão humana sempre obrigatória.

Resultado: 184k IG, 4x mais conteúdo com o mesmo time, voz consistente em carrossel, reels, newsletter e curso.

Os 4 cases (Defiverso, Lucas, DSEC e Layla) são frentes diferentes. O método é o mesmo: identificar o gargalo, implementar IA dentro do fluxo e medir em horas liberadas.

Esse é o último email da sequência. Faz sentido marcar o diagnóstico?

Marcar diagnóstico (resposta em 48h): ${ctaUrl("layla")}

Se agora não é o momento, sem rancor. Descadastra aqui e a sequência para: ${opts.unsubUrl}

PS: esse é o último email automático. Daqui pra frente, contato só por iniciativa tua.`,
  };
}
