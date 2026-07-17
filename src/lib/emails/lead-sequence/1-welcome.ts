import { ctaButton, escapeHtml, marcasInline, shell, whatsappUrl } from "./shared";

export function buildWelcomeEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const greeting = name ? `Oi, ${escapeHtml(name)}.` : "Oi.";
  const greetingText = name ? `Oi, ${name}.` : "Oi.";

  const subject = `Qual é o teu maior gargalo de marketing hoje?`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Meu maior gargalo de marketing hoje é..."
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${greeting} Bem-vindo. Antes de qualquer coisa, uma pergunta.
    </h1>
    <p style="margin:0 0 14px 0;">
      <strong>Qual é o teu maior gargalo de marketing hoje?</strong> Falta de clareza no
      posicionamento, conteúdo que não sai do papel, lançamento que não engrena? Pensa nisso
      enquanto lê, porque é exatamente o tipo de conversa que a gente gosta de ter.
    </p>
    <p style="margin:0 0 14px 0;">
      Rápido sobre quem te escreve: a Kaleidos é uma agência de marketing nativa de cripto,
      web3 e fintech. A gente opera nesse mercado desde 2020, como agência desde 2022, e une
      quatro coisas que normalmente vivem separadas: estratégia, conteúdo, lançamentos e IA
      dentro da operação. Time boutique, tocado pelos fundadores, sem camada de gerente de
      conta entre tu e quem pensa o teu projeto.
    </p>
    <p style="margin:0 0 14px 0;">
      Pelo caminho, já trabalhamos com marcas como ${escapeHtml(marcasInline())}. Cada uma
      com um desafio diferente, e é justamente por isso que a gente prefere começar ouvindo,
      não apresentando slide.
    </p>
    <p style="margin:0 0 6px 0;">
      Então a proposta é simples: me conta o teu cenário em uma ou duas frases. Sem
      compromisso, sem pitch. Só uma conversa de quem vive esse mercado todo dia.
    </p>

    ${ctaButton("Contar meu cenário no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Prefere email? Responde este aqui mesmo. Quem lê é gente do time, não robô.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Nos próximos dias mando mais alguns emails curtos, cada um sobre uma frente do que a
      gente faz: posicionamento, conteúdo com IA, lançamentos. Alguns só com conteúdo útil,
      sem pitch. Depois disso, silêncio. Só volto se tu quiser.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Uma pergunta antes de qualquer apresentação. E um convite pra conversar.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${greetingText} Bem-vindo. Antes de qualquer coisa, uma pergunta.

Qual é o teu maior gargalo de marketing hoje? Falta de clareza no posicionamento, conteúdo que não sai do papel, lançamento que não engrena? Pensa nisso enquanto lê, porque é exatamente o tipo de conversa que a gente gosta de ter.

Rápido sobre quem te escreve: a Kaleidos é uma agência de marketing nativa de cripto, web3 e fintech. A gente opera nesse mercado desde 2020, como agência desde 2022, e une quatro coisas que normalmente vivem separadas: estratégia, conteúdo, lançamentos e IA dentro da operação. Time boutique, tocado pelos fundadores.

Pelo caminho, já trabalhamos com marcas como ${marcasInline()}. Cada uma com um desafio diferente, e é justamente por isso que a gente prefere começar ouvindo, não apresentando slide.

A proposta é simples: me conta o teu cenário em uma ou duas frases. Sem compromisso, sem pitch.

Contar meu cenário no WhatsApp: ${wa}

Prefere email? Responde este aqui mesmo. Quem lê é gente do time, não robô.

Nos próximos dias mando mais alguns emails curtos, cada um sobre uma frente do que a gente faz: posicionamento, conteúdo com IA, lançamentos. Alguns só com conteúdo útil, sem pitch. Depois disso, silêncio. Só volto se tu quiser.

Descadastrar: ${opts.unsubUrl}`,
  };
}
