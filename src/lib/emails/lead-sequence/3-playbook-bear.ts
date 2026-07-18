import { PLAYBOOKS, resourceBlock, shell } from "./shared";

/**
 * Email 3 (dia 3): recomendação de leitura, playbook prioritário.
 * "Como fazer marketing e vender no bear market". CTA único: ler o playbook.
 * Sem WhatsApp aqui de propósito: variar o caminho de conversão.
 */
export function buildPlaybookBearEmail(opts: { name?: string | null; unsubUrl: string }) {
  const pb = PLAYBOOKS.bearMarket;
  const subject = `Como vender quando o mercado está vermelho`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      O material que a gente mais indica pra quem chega aqui
    </h1>
    <p style="margin:0 0 14px 0;">
      Prometido é devido. Hoje não tem pitch nenhum: só o material que a gente mais
      recomenda pra qualquer projeto desse mercado, em qualquer fase.
    </p>
    <p style="margin:0 0 14px 0;">
      <strong>Vender no bull é fácil. O jogo de verdade se decide no bear.</strong> É quando
      a atenção some, o orçamento aperta e a maioria dos projetos desaparece do mapa. E é
      exatamente aí que quem continua construindo audiência e narrativa compra o mercado
      barato: menos barulho, menos concorrência, mais espaço pra tua marca.
    </p>
    <p style="margin:0 0 14px 0;">
      A gente condensou nesse playbook o que aprendemos atravessando ciclos com clientes
      reais: como ajustar a mensagem, onde cortar sem matar o marketing, o que continuar
      publicando e como transformar mercado frio em vantagem competitiva.
    </p>

    ${resourceBlock({
      title: pb.title,
      coverUrl: pb.coverUrl,
      url: pb.url,
      label: "Ler o playbook",
      kicker: "Playbook gratuito",
    })}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Leu e discordou de alguma parte? Responde este email contando qual. Debate bom é
      exatamente o que a gente gosta.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Guarda esse link. E se quiser o caminho inverso, temos também o de bull market no
      mesmo lugar, em kaleidos.com.br/papers.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Nosso playbook mais pedido: como fazer marketing e vender no bear market. De graça.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `O material que a gente mais indica pra quem chega aqui

Prometido é devido. Hoje não tem pitch nenhum: só o material que a gente mais recomenda pra qualquer projeto desse mercado, em qualquer fase.

Vender no bull é fácil. O jogo de verdade se decide no bear. É quando a atenção some, o orçamento aperta e a maioria dos projetos desaparece do mapa. E é exatamente aí que quem continua construindo audiência e narrativa compra o mercado barato: menos barulho, menos concorrência, mais espaço pra tua marca.

A gente condensou nesse playbook o que aprendemos atravessando ciclos com clientes reais: como ajustar a mensagem, onde cortar sem matar o marketing, o que continuar publicando e como transformar mercado frio em vantagem competitiva.

Ler o playbook "${pb.title}": ${pb.url}

Leu e discordou de alguma parte? Responde este email contando qual. Debate bom é exatamente o que a gente gosta.

Guarda esse link. E se quiser o caminho inverso, temos também o de bull market no mesmo lugar, em kaleidos.com.br/papers.

Descadastrar: ${opts.unsubUrl}`,
  };
}
