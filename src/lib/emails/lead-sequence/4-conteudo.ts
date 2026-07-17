import { ctaButton, escapeHtml, shell, whatsappUrl } from "./shared";

/**
 * Email 4 (dia ~10): conteúdo/valor, não pitch.
 * Mini-framework: 3 perguntas pra saber se o conteúdo tá posicionando
 * ou só preenchendo feed. O lead consegue aplicar sozinho hoje.
 */
export function buildEmail4(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const heading = name
    ? `${escapeHtml(name)}, teu conteúdo posiciona ou só preenche feed?`
    : "Teu conteúdo posiciona ou só preenche feed?";
  const headingText = name
    ? `${name}, teu conteúdo posiciona ou só preenche feed?`
    : "Teu conteúdo posiciona ou só preenche feed?";

  const subject = `3 perguntas pra saber se teu conteúdo posiciona ou só preenche feed`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Fiz o teste das 3 perguntas no meu conteúdo e o resultado foi esse:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${heading}
    </h1>
    <p style="margin:0 0 14px 0;">
      Sem pitch hoje. Só um teste que a gente aplica internamente antes de aprovar qualquer
      calendário, e que tu consegue rodar sozinho em 5 minutos, olhando os teus últimos 10
      posts.
    </p>
    <p style="margin:0 0 10px 0;font-weight:600;color:#0a0a0a;">
      1. Se tu apagar o logo, o post podia ser de um concorrente?
    </p>
    <p style="margin:0 0 14px 0;">
      Se a resposta é sim, o post não tá construindo a tua marca. Tá construindo a categoria
      inteira, incluindo quem compete contigo. Conteúdo que posiciona carrega um ponto de
      vista que só tu sustentaria.
    </p>
    <p style="margin:0 0 10px 0;font-weight:600;color:#0a0a0a;">
      2. O post defende uma opinião ou só informa?
    </p>
    <p style="margin:0 0 14px 0;">
      Informação pura ("o que é staking", "5 dicas de segurança") educa o mercado, mas não
      diferencia ninguém: qualquer um publica igual amanhã. Opinião ("por que a maioria faz
      staking errado") obriga o leitor a concordar ou discordar. E é nesse atrito que nasce
      preferência de marca.
    </p>
    <p style="margin:0 0 10px 0;font-weight:600;color:#0a0a0a;">
      3. Quem leu 3 posts teus consegue dizer o que tu defende?
    </p>
    <p style="margin:0 0 14px 0;">
      Pega alguém de fora, mostra 3 posts e pergunta: "o que essa marca acredita?". Se a
      resposta for genérica ("acredita em cripto"), o feed tá cheio mas a posição tá vazia.
      Conteúdo bom repete a mesma tese por ângulos diferentes até o mercado associar a tese
      a ti.
    </p>
    <p style="margin:0 0 6px 0;">
      Faz o teste e me conta: <strong>das 3 perguntas, em qual o teu conteúdo tropeçou?</strong>
      Manda a resposta no WhatsApp que eu devolvo uma leitura do que ajustar primeiro. Sem
      call, sem proposta, só a troca.
    </p>

    ${ctaButton("Mandar meu resultado no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Ou responde este email com o teu resultado. Vale igual.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Daqui uma semana te mando uma tese sobre por que marketing nesse mercado não segue as
      regras do marketing tradicional. Também sem pitch.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Um teste de 5 minutos pra rodar nos teus últimos 10 posts. Sem pitch.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${headingText}

Sem pitch hoje. Só um teste que a gente aplica internamente antes de aprovar qualquer calendário, e que tu consegue rodar sozinho em 5 minutos, olhando os teus últimos 10 posts.

1. Se tu apagar o logo, o post podia ser de um concorrente?
Se a resposta é sim, o post não tá construindo a tua marca. Tá construindo a categoria inteira, incluindo quem compete contigo. Conteúdo que posiciona carrega um ponto de vista que só tu sustentaria.

2. O post defende uma opinião ou só informa?
Informação pura ("o que é staking", "5 dicas de segurança") educa o mercado, mas não diferencia ninguém: qualquer um publica igual amanhã. Opinião ("por que a maioria faz staking errado") obriga o leitor a concordar ou discordar. E é nesse atrito que nasce preferência de marca.

3. Quem leu 3 posts teus consegue dizer o que tu defende?
Pega alguém de fora, mostra 3 posts e pergunta: "o que essa marca acredita?". Se a resposta for genérica ("acredita em cripto"), o feed tá cheio mas a posição tá vazia. Conteúdo bom repete a mesma tese por ângulos diferentes até o mercado associar a tese a ti.

Faz o teste e me conta: das 3 perguntas, em qual o teu conteúdo tropeçou? Manda a resposta no WhatsApp que eu devolvo uma leitura do que ajustar primeiro. Sem call, sem proposta, só a troca.

Mandar meu resultado no WhatsApp: ${wa}

Ou responde este email com o teu resultado. Vale igual.

Daqui uma semana te mando uma tese sobre por que marketing nesse mercado não segue as regras do marketing tradicional. Também sem pitch.

Descadastrar: ${opts.unsubUrl}`,
  };
}
