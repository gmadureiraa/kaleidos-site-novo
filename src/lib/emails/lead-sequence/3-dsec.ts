// TODO CONFIRMAR nomes de marca com Gabriel antes de ativar
import { ctaButton, escapeHtml, marcasInline, shell, whatsappUrl } from "./shared";

export function buildDsecEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const heading = name
    ? `${escapeHtml(name)}, quanto tempo o teu time gasta pra publicar 1 peça?`
    : "Quanto tempo o teu time gasta pra publicar 1 peça?";
  const headingText = name
    ? `${name}, quanto tempo o teu time gasta pra publicar 1 peça?`
    : "Quanto tempo o teu time gasta pra publicar 1 peça?";

  const subject = `Quantas horas custa cada conteúdo que tu publica?`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Queria conversar sobre conteúdo e IA na operação. Hoje meu processo funciona assim:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${heading}
    </h1>
    <p style="margin:0 0 14px 0;">
      Da ideia até o post no ar: <strong>quantas horas? Quantas pessoas? Quantas idas e
      voltas de aprovação?</strong> Na maioria das operações que a gente conhece, a resposta
      honesta assusta. E é por isso que o calendário vive atrasado, não por falta de ideia.
    </p>
    <p style="margin:0 0 14px 0;">
      A segunda frente da Kaleidos é essa: conteúdo com IA dentro da operação. E o nosso
      jeito é diferente do que costuma aparecer por aí. A gente não terceiriza tua marca pra
      um chatbot. A gente desenha o fluxo: a IA faz a parte mecânica (research, primeira
      versão, adaptação de formato, volume), e a curadoria, a voz e a decisão final
      continuam humanas. Sempre.
    </p>
    <p style="margin:0 0 14px 0;">
      O resultado desse desenho é publicar com consistência real, em várias frentes ao mesmo
      tempo, sem contratar um exército e sem soar IA genérica. É a operação que a gente roda
      todo dia pra marcas como ${escapeHtml(marcasInline())}, e cada uma com a própria voz.
    </p>
    <p style="margin:0 0 6px 0;">
      Fica a pergunta: se o teu time recuperasse as horas que hoje somem em produção
      mecânica, <strong>o que vocês fariam com elas?</strong> Me conta como funciona teu
      processo hoje. Em uma conversa curta eu já consigo apontar onde a IA entra e onde ela
      não deve entrar.
    </p>

    ${ctaButton("Descrever meu processo no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Ou responde este email com um resumo do teu fluxo atual. Leio e te devolvo uma opinião.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Nos próximos emails eu volto com uma frente de cada vez, até a de lançamentos e
      comunidade, onde tudo isso se conecta.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Da ideia ao post no ar: quantas horas, quantas pessoas? A conta importa.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${headingText}

Da ideia até o post no ar: quantas horas? Quantas pessoas? Quantas idas e voltas de aprovação? Na maioria das operações que a gente conhece, a resposta honesta assusta. E é por isso que o calendário vive atrasado, não por falta de ideia.

A segunda frente da Kaleidos é essa: conteúdo com IA dentro da operação. E o nosso jeito é diferente do que costuma aparecer por aí. A gente não terceiriza tua marca pra um chatbot. A gente desenha o fluxo: a IA faz a parte mecânica (research, primeira versão, adaptação de formato, volume), e a curadoria, a voz e a decisão final continuam humanas. Sempre.

O resultado desse desenho é publicar com consistência real, em várias frentes ao mesmo tempo, sem contratar um exército e sem soar IA genérica. É a operação que a gente roda todo dia pra marcas como ${marcasInline()}, e cada uma com a própria voz.

Fica a pergunta: se o teu time recuperasse as horas que hoje somem em produção mecânica, o que vocês fariam com elas? Me conta como funciona teu processo hoje. Em uma conversa curta eu já consigo apontar onde a IA entra e onde ela não deve entrar.

Descrever meu processo no WhatsApp: ${wa}

Ou responde este email com um resumo do teu fluxo atual. Leio e te devolvo uma opinião.

Nos próximos emails eu volto com uma frente de cada vez, até a de lançamentos e comunidade, onde tudo isso se conecta.

Descadastrar: ${opts.unsubUrl}`,
  };
}
