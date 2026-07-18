import { ctaButton, DIAGNOSTICO_URL, shell } from "./shared";

/**
 * Email 4 (dia 7): pede pro lead preencher o form de diagnóstico do site.
 * Explica que é rápido e ajuda o time a entender o cenário. CTA único: form.
 */
export function buildDiagnosticoEmail(opts: { name?: string | null; unsubUrl: string }) {
  const subject = `3 minutos pra gente entender o teu cenário`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      Me deixa entender o teu projeto de verdade
    </h1>
    <p style="margin:0 0 14px 0;">
      Uma semana atrás tu entrou aqui na lista. Talvez baixando um material, talvez
      curioso. De qualquer forma, chegou a hora de inverter o jogo: em vez de eu ficar
      falando da Kaleidos, quero ouvir sobre <strong>ti</strong>.
    </p>
    <p style="margin:0 0 14px 0;">
      A gente montou um <strong>form de diagnóstico</strong> no site exatamente pra isso.
      São poucas perguntas, leva uns 3 minutos, e cobre o essencial: em que fase o teu
      projeto está, o que tu já tentou de marketing e onde a coisa trava hoje.
    </p>
    <p style="margin:0 0 14px 0;">
      Com essas respostas, o time consegue olhar o teu cenário com contexto real antes de
      qualquer conversa. Se fizer sentido, a gente volta pra ti com uma leitura honesta do
      que atacar primeiro. Se não fizer, a gente fala isso também. Diagnóstico não é
      proposta disfarçada.
    </p>
    <p style="margin:0 0 6px 0;font-weight:600;color:#0a0a0a;">
      3 minutos teus, uma leitura de quem vive esse mercado todo dia. Troca justa?
    </p>

    ${ctaButton("Preencher o diagnóstico", DIAGNOSTICO_URL)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Form não é tua praia? Responde este email com o teu cenário em texto corrido mesmo.
      Quem lê é gente do time, e vale igual.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Nos próximos emails: um teste de posicionamento pra fazer em 1 minuto e mais um
      material do nosso acervo.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Poucas perguntas, 3 minutos, e o time olha o teu cenário com contexto real.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `Me deixa entender o teu projeto de verdade

Uma semana atrás tu entrou aqui na lista. Talvez baixando um material, talvez curioso. De qualquer forma, chegou a hora de inverter o jogo: em vez de eu ficar falando da Kaleidos, quero ouvir sobre ti.

A gente montou um form de diagnóstico no site exatamente pra isso. São poucas perguntas, leva uns 3 minutos, e cobre o essencial: em que fase o teu projeto está, o que tu já tentou de marketing e onde a coisa trava hoje.

Com essas respostas, o time consegue olhar o teu cenário com contexto real antes de qualquer conversa. Se fizer sentido, a gente volta pra ti com uma leitura honesta do que atacar primeiro. Se não fizer, a gente fala isso também. Diagnóstico não é proposta disfarçada.

3 minutos teus, uma leitura de quem vive esse mercado todo dia. Troca justa?

Preencher o diagnóstico: ${DIAGNOSTICO_URL}

Form não é tua praia? Responde este email com o teu cenário em texto corrido mesmo. Quem lê é gente do time, e vale igual.

Nos próximos emails: um teste de posicionamento pra fazer em 1 minuto e mais um material do nosso acervo.

Descadastrar: ${opts.unsubUrl}`,
  };
}
