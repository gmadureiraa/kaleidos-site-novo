import { caseBlock, ctaButton, ctaUrl, escapeHtml, shell } from "./shared";

export function buildLaylaEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const subject = `Última: como a Layla Foz mantém voz autoral em 184k IG`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${name ? `${escapeHtml(name)}, quarto e último case.` : "Quarto e último case."}
    </h1>

    <p style="margin:0 0 14px 0;">
      O argumento mais comum contra IA na operação é a perda de voz.
      A Layla é o caso que prova o contrário — quando o pipeline é desenhado certo,
      a voz fica <strong>mais</strong> consistente, não menos.
    </p>

    ${caseBlock({
      cliente: "Layla Foz · espiritualidade e feminino",
      vertical: "Voice profile + biblioteca de prompts",
      antes:
        "Voz muito específica e poética. Criar conteúdo cross-format (carrossel + reels + newsletter + curso) sem perder essência exigia ela escrever tudo. Time tentava ajudar, soava genérico. Volume nunca crescia.",
      depois:
        "Voice profile treinado na obra dela + biblioteca de prompts + revisão humana sempre obrigatória. O time produz 4x mais peças com a voz preservada em todos os formatos.",
      numero: "184k IG · 4x mais conteúdo com mesmo time · voz consistente em 4 formatos",
    })}

    <p style="margin:0 0 14px 0;">
      Os 4 cases dessa sequência (Defiverso, Lucas, DSEC e Layla) são frentes muito diferentes:
      educação cripto, creator econômico, B2B técnico e marca pessoal autoral.
      O método é o mesmo: <em>identificar o gargalo, implementar IA dentro do fluxo, métrica de hora liberada.</em>
    </p>

    <p style="margin:0 0 14px 0;font-weight:600;color:#0a0a0a;">
      Última pergunta dessa sequência: vai marcar diagnóstico ou prefere tirar do email?
    </p>

    ${ctaButton("Marcar diagnóstico (48h pra resposta)", ctaUrl("layla"))}

    <p style="margin:0 0 14px 0;font-size:14px;color:#6b7280;">
      Se preferir parar o contato, sem rancor —
      <a href="${escapeHtml(opts.unsubUrl)}" style="color:#6b7280;text-decoration:underline;">descadastra aqui</a>
      e a sequência para por aí.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> esse é o último email automático. A partir de agora, contato só por iniciativa tua —
      respondendo esse email ou pelo formulário.
    </p>
  `;

  return {
    subject,
    html: shell({ preheader: "Voz autoral em escala. + última chance da sequência.", bodyHtml: body, unsubUrl: opts.unsubUrl }),
    text: `${name ? `${name}, quarto e último case.` : "Quarto e último case."}

Layla Foz — antes: voz autoral muito específica, criar cross-format perdia essência. Depois: voice profile treinado + biblioteca de prompts + revisão humana sempre. 4x mais conteúdo com voz preservada.

184k IG, voz consistente em carrossel + reels + newsletter + curso.

Última pergunta: vai marcar diagnóstico? ${ctaUrl("layla")}

Ou descadastra: ${opts.unsubUrl}

PS: esse é o último email automático.`,
  };
}
