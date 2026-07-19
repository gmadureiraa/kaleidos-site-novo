import { AGENDAR_URL, ctaButton, escapeHtml, clientesInline, shell } from "./shared";

/**
 * Email 7 (dia 23): CTA forte de call. Consultoria gratuita de 30 minutos,
 * apontando pra kaleidos.com.br/agendar (página com rastreio).
 */
export function buildConsultoriaEmail(opts: { name?: string | null; unsubUrl: string }) {
  const subject = `30 minutos com quem vive esse mercado, de graça`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      Bora colocar o teu cenário na mesa?
    </h1>
    <p style="margin:0 0 14px 0;">
      Ao longo das últimas semanas eu te mandei perguntas, teses e playbooks. Hoje o convite
      é mais direto: <strong>um diagnóstico gratuito de 30 minutos</strong> com o nosso
      time, focada 100% no teu projeto.
    </p>
    <p style="margin:0 0 14px 0;">
      Como funciona: tu escolhe um horário, aparece com o teu contexto e a gente passa a
      call inteira no teu cenário. Posicionamento, conteúdo, distribuição, comunidade,
      token: o que estiver travando. Tu sai com uma leitura honesta do que atacar primeiro,
      independente de fechar qualquer coisa com a gente.
    </p>
    <p style="margin:0 0 14px 0;">
      É o mesmo tipo de conversa que já abriu caminho com nomes como
      ${escapeHtml(clientesInline())}. Sem slide de vendas, sem enrolação: 30 minutos de
      trabalho de verdade em cima do teu projeto.
    </p>
    <p style="margin:0 0 6px 0;font-weight:600;color:#0a0a0a;">
      Uma call agora pode economizar meses de tentativa e erro. O custo é zero.
    </p>

    ${ctaButton("Agendar meu diagnóstico gratuito", AGENDAR_URL)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Nenhum horário serve, ou prefere começar por escrito? Responde este email com a tua
      disponibilidade ou o teu contexto. Quem lê é gente do time.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      As vagas de diagnóstico são limitadas pela agenda do time, então se o assunto é
      urgente, garante o teu horário logo.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Diagnóstico gratuito de 30 minutos, focado 100% no teu projeto. Escolhe teu horário.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `Bora colocar o teu cenário na mesa?

Ao longo das últimas semanas eu te mandei perguntas, teses e playbooks. Hoje o convite é mais direto: um diagnóstico gratuito de 30 minutos com o nosso time, focada 100% no teu projeto.

Como funciona: tu escolhe um horário, aparece com o teu contexto e a gente passa a call inteira no teu cenário. Posicionamento, conteúdo, distribuição, comunidade, token: o que estiver travando. Tu sai com uma leitura honesta do que atacar primeiro, independente de fechar qualquer coisa com a gente.

É o mesmo tipo de conversa que já abriu caminho com nomes como ${clientesInline()}. Sem slide de vendas, sem enrolação: 30 minutos de trabalho de verdade em cima do teu projeto.

Uma call agora pode economizar meses de tentativa e erro. O custo é zero.

Agendar meu diagnóstico gratuito: ${AGENDAR_URL}

Nenhum horário serve, ou prefere começar por escrito? Responde este email com a tua disponibilidade ou o teu contexto. Quem lê é gente do time.

As vagas de diagnóstico são limitadas pela agenda do time, então se o assunto é urgente, garante o teu horário logo.

Descadastrar: ${opts.unsubUrl}`,
  };
}
