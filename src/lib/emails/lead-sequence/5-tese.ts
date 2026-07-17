import { ctaButton, escapeHtml, marcasInline, shell, whatsappUrl } from "./shared";

/**
 * Email 5 (dia ~17): conteúdo/valor, não pitch.
 * Tese: marketing em cripto/web3 não segue as regras do marketing
 * tradicional porque a demanda anda em ciclos, não em linha reta.
 */
export function buildEmail5(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const heading = name
    ? `${escapeHtml(name)}, teu marketing foi desenhado pra qual fase do ciclo?`
    : "Teu marketing foi desenhado pra qual fase do ciclo?";
  const headingText = name
    ? `${name}, teu marketing foi desenhado pra qual fase do ciclo?`
    : "Teu marketing foi desenhado pra qual fase do ciclo?";

  const subject = `Por que marketing em cripto não é marketing tradicional acelerado`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Li a tese sobre ciclos e queria trocar uma ideia. Meu marketing hoje tá desenhado assim:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${heading}
    </h1>
    <p style="margin:0 0 14px 0;">
      Uma tese que guia quase tudo que a gente faz, de graça, pra tu usar como quiser:
      <strong>marketing em cripto não é marketing tradicional acelerado. É outro esporte,
      porque a demanda não anda em linha reta, anda em ciclos.</strong>
    </p>
    <p style="margin:0 0 14px 0;">
      No mercado tradicional, a atenção do público é razoavelmente estável: tu investe,
      mede, otimiza, escala. Em cripto, a atenção chega em ondas. Quando o mercado esquenta,
      todo mundo aparece ao mesmo tempo, o custo de atenção explode e a diferença entre as
      marcas some no barulho. Quando esfria, a maioria corta conteúdo e desaparece.
    </p>
    <p style="margin:0 0 14px 0;">
      E é exatamente aí que mora a assimetria. Três consequências práticas:
    </p>
    <p style="margin:0 0 10px 0;">
      <strong>1. Quem constrói no silêncio colhe no barulho.</strong> Audiência, comunidade e
      autoridade construídas no mercado frio são o único ativo que já está pronto quando a
      onda chega. Não dá pra começar a construir confiança no meio da euforia.
    </p>
    <p style="margin:0 0 10px 0;">
      <strong>2. Narrativa vence feature.</strong> A cada ciclo o mercado troca de história, e
      o público compra a história antes de comparar produto. Marca sem tese própria vira
      commodity na primeira virada de narrativa.
    </p>
    <p style="margin:0 0 14px 0;">
      <strong>3. Comunidade é o único canal que não depende do ciclo.</strong> Alcance pago e
      algoritmo oscilam com o mercado. Uma comunidade que confia em ti continua lendo,
      testando e comprando quando o gráfico tá vermelho.
    </p>
    <p style="margin:0 0 14px 0;">
      Foi o padrão que a gente viu se repetir operando pra marcas como
      ${escapeHtml(marcasInline())}: quem trata o ciclo como parte da estratégia joga um jogo
      diferente de quem só reage a ele.
    </p>
    <p style="margin:0 0 6px 0;">
      Fica a pergunta: <strong>o teu marketing de hoje foi desenhado pra fase do ciclo em que
      tu tá, ou pra fase que já passou?</strong> Se quiser, me conta no WhatsApp como tu tá
      pensando os próximos meses. Troco a minha leitura do momento sem compromisso nenhum.
    </p>

    ${ctaButton("Trocar ideia no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Ou responde este email. Leio tudo que chega aqui.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Semana que vem mando o último email desta sequência. Depois disso, só falo contigo se
      tu quiser.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "A demanda em cripto anda em ciclos, não em linha reta. Isso muda tudo.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${headingText}

Uma tese que guia quase tudo que a gente faz, de graça, pra tu usar como quiser: marketing em cripto não é marketing tradicional acelerado. É outro esporte, porque a demanda não anda em linha reta, anda em ciclos.

No mercado tradicional, a atenção do público é razoavelmente estável: tu investe, mede, otimiza, escala. Em cripto, a atenção chega em ondas. Quando o mercado esquenta, todo mundo aparece ao mesmo tempo, o custo de atenção explode e a diferença entre as marcas some no barulho. Quando esfria, a maioria corta conteúdo e desaparece.

E é exatamente aí que mora a assimetria. Três consequências práticas:

1. Quem constrói no silêncio colhe no barulho. Audiência, comunidade e autoridade construídas no mercado frio são o único ativo que já está pronto quando a onda chega. Não dá pra começar a construir confiança no meio da euforia.

2. Narrativa vence feature. A cada ciclo o mercado troca de história, e o público compra a história antes de comparar produto. Marca sem tese própria vira commodity na primeira virada de narrativa.

3. Comunidade é o único canal que não depende do ciclo. Alcance pago e algoritmo oscilam com o mercado. Uma comunidade que confia em ti continua lendo, testando e comprando quando o gráfico tá vermelho.

Foi o padrão que a gente viu se repetir operando pra marcas como ${marcasInline()}: quem trata o ciclo como parte da estratégia joga um jogo diferente de quem só reage a ele.

Fica a pergunta: o teu marketing de hoje foi desenhado pra fase do ciclo em que tu tá, ou pra fase que já passou? Se quiser, me conta no WhatsApp como tu tá pensando os próximos meses. Troco a minha leitura do momento sem compromisso nenhum.

Trocar ideia no WhatsApp: ${wa}

Ou responde este email. Leio tudo que chega aqui.

Semana que vem mando o último email desta sequência. Depois disso, só falo contigo se tu quiser.

Descadastrar: ${opts.unsubUrl}`,
  };
}
