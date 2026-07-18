import { AGENDAR_URL, ctaButton, escapeHtml, shell, whatsappUrl } from "./shared";

/**
 * Email 8 (dia 30): breakup, último da sequência.
 * Última pergunta, recap dos caminhos, oferta de descadastro explícita
 * e PS de "último email automático".
 */
export function buildBreakupEmail(opts: { name?: string | null; unsubUrl: string }) {
  const subject = `Último email: o que tu vai lançar nos próximos 6 meses?`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Antes de a sequência acabar, queria conversar. Meu contexto é o seguinte:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      Último email. Uma pergunta antes de eu sair.
    </h1>
    <p style="margin:0 0 14px 0;">
      <strong>O que tu vai lançar nos próximos 6 meses?</strong> Produto, token, feature,
      comunidade, curso, listagem, tanto faz o formato. A pergunta importa porque é nos
      próximos passos que estratégia, conteúdo e distribuição se encontram, e é isso que
      separa projeto que cresce de projeto que só posta.
    </p>
    <p style="margin:0 0 14px 0;">
      Esse foi o resumo de tudo que passou por aqui: um time especializado no mercado
      cripto e financeiro, há mais de 7 anos vivendo esse mercado todo dia, unindo
      estratégia, conteúdo, conhecimento técnico e distribuição pra empresas, founders e
      creators. Se algum desses emails fez tu pensar "isso é exatamente o meu problema",
      então a gente devia conversar agora, enquanto o pensamento está fresco.
    </p>
    <p style="margin:0 0 6px 0;font-weight:600;color:#0a0a0a;">
      Me conta o que tu tem pela frente. Uma conversa curta já diz se faz sentido
      trabalharmos juntos ou não. Dos dois lados.
    </p>

    ${ctaButton("Conversar agora no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Prefere call? A consultoria gratuita de 30 minutos continua de pé:
      <a href="${AGENDAR_URL}" style="color:#374151;text-decoration:underline;">agenda aqui</a>.
      Ou responde este email, que cai direto na caixa do time.
    </p>

    <p style="margin:14px 0 0 0;font-size:14px;color:#6b7280;">
      Se agora não é o momento, sem rancor:
      <a href="${escapeHtml(opts.unsubUrl)}" style="color:#6b7280;text-decoration:underline;">descadastra aqui</a>
      e a sequência para por aí. A caixa de entrada de todo mundo agradece.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      <strong>PS:</strong> este é o último email automático. Daqui pra frente, contato só por
      iniciativa tua: no WhatsApp, respondendo este email ou pelo site.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "A última pergunta da sequência. Depois deste, só falo contigo se tu quiser.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `Último email. Uma pergunta antes de eu sair.

O que tu vai lançar nos próximos 6 meses? Produto, token, feature, comunidade, curso, listagem, tanto faz o formato. A pergunta importa porque é nos próximos passos que estratégia, conteúdo e distribuição se encontram, e é isso que separa projeto que cresce de projeto que só posta.

Esse foi o resumo de tudo que passou por aqui: um time especializado no mercado cripto e financeiro, há mais de 7 anos vivendo esse mercado todo dia, unindo estratégia, conteúdo, conhecimento técnico e distribuição pra empresas, founders e creators. Se algum desses emails fez tu pensar "isso é exatamente o meu problema", então a gente devia conversar agora, enquanto o pensamento está fresco.

Me conta o que tu tem pela frente. Uma conversa curta já diz se faz sentido trabalharmos juntos ou não. Dos dois lados.

Conversar agora no WhatsApp: ${wa}

Prefere call? A consultoria gratuita de 30 minutos continua de pé: ${AGENDAR_URL}
Ou responde este email, que cai direto na caixa do time.

Se agora não é o momento, sem rancor. Descadastra aqui e a sequência para: ${opts.unsubUrl}

PS: este é o último email automático. Daqui pra frente, contato só por iniciativa tua: no WhatsApp, respondendo este email ou pelo site.`,
  };
}
