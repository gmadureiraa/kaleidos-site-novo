import { ctaButton, escapeHtml, shell, whatsappUrl } from "./shared";

/**
 * Email 6 (dia ~24): breakup, último da sequência.
 * Mecânica herdada do antigo 4-layla: última pergunta, oferta de
 * descadastro explícita e PS de "último email automático".
 */
export function buildEmail6(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const heading = name
    ? `${escapeHtml(name)}, último email. Uma pergunta antes de eu sair.`
    : "Último email. Uma pergunta antes de eu sair.";
  const headingText = name
    ? `${name}, último email. Uma pergunta antes de eu sair.`
    : "Último email. Uma pergunta antes de eu sair.";

  const subject = `Último email: o que tu vai lançar nos próximos 6 meses?`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Antes de a sequência acabar, queria conversar. Meu contexto é o seguinte:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${heading}
    </h1>
    <p style="margin:0 0 14px 0;">
      <strong>O que tu vai lançar nos próximos 6 meses?</strong> Produto, token, feature,
      comunidade, curso, listagem, tanto faz o formato. A pergunta importa porque lançamento
      é onde estratégia, conteúdo e IA se encontram, e é a frente que mais separa projeto que
      cresce de projeto que só posta.
    </p>
    <p style="margin:0 0 14px 0;">
      Esse foi o resumo de tudo que passou por aqui: uma agência boutique, tocada pelos
      fundadores, nativa de cripto, web3 e fintech, unindo estratégia, conteúdo, lançamentos
      e IA na mesma operação. Se algum desses emails fez tu pensar "isso é exatamente o meu
      problema", então a gente devia conversar agora, enquanto o pensamento tá fresco.
    </p>
    <p style="margin:0 0 6px 0;font-weight:600;color:#0a0a0a;">
      Me conta o que tu tem pela frente. Uma conversa de 15 minutos no WhatsApp já diz se
      faz sentido trabalharmos juntos ou não. Dos dois lados.
    </p>

    ${ctaButton("Conversar agora no WhatsApp", wa)}

    <p style="margin:0 0 14px 0;font-size:14px;color:#6b7280;">
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
      preheader: "Lançamento é onde tudo se encontra. E esta é a última pergunta da sequência.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${headingText}

O que tu vai lançar nos próximos 6 meses? Produto, token, feature, comunidade, curso, listagem, tanto faz o formato. A pergunta importa porque lançamento é onde estratégia, conteúdo e IA se encontram, e é a frente que mais separa projeto que cresce de projeto que só posta.

Esse foi o resumo de tudo que passou por aqui: uma agência boutique, tocada pelos fundadores, nativa de cripto, web3 e fintech, unindo estratégia, conteúdo, lançamentos e IA na mesma operação. Se algum desses emails fez tu pensar "isso é exatamente o meu problema", então a gente devia conversar agora, enquanto o pensamento tá fresco.

Me conta o que tu tem pela frente. Uma conversa de 15 minutos no WhatsApp já diz se faz sentido trabalharmos juntos ou não. Dos dois lados.

Conversar agora no WhatsApp: ${wa}

Se agora não é o momento, sem rancor. Descadastra aqui e a sequência para: ${opts.unsubUrl}

PS: este é o último email automático. Daqui pra frente, contato só por iniciativa tua: no WhatsApp, respondendo este email ou pelo site.`,
  };
}
