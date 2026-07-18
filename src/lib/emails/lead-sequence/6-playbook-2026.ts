import { PLAYBOOKS, resourceBlock, shell } from "./shared";

/**
 * Email 6 (dia 17): tese dos ciclos condensada + segunda recomendação de
 * leitura, "Para onde vai o marketing cripto em 2026". CTA: ler o playbook.
 */
export function buildPlaybook2026Email(opts: { name?: string | null; unsubUrl: string }) {
  const pb = PLAYBOOKS.cripto2026;
  const subject = `Teu marketing foi desenhado pra qual fase do ciclo?`;

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      Marketing cripto não é marketing tradicional acelerado
    </h1>
    <p style="margin:0 0 14px 0;">
      Uma tese que guia quase tudo que a gente faz: <strong>nesse mercado, a demanda não
      anda em linha reta, anda em ciclos.</strong> Quando o mercado esquenta, todo mundo
      aparece ao mesmo tempo, o custo de atenção explode e as marcas somem no barulho.
      Quando esfria, a maioria corta conteúdo e desaparece.
    </p>
    <p style="margin:0 0 14px 0;">
      Três consequências práticas disso: quem constrói no silêncio colhe no barulho,
      narrativa vence feature, e comunidade é o único canal que não depende do ciclo.
      Quem trata o ciclo como parte da estratégia joga um jogo diferente de quem só reage
      a ele.
    </p>
    <p style="margin:0 0 14px 0;">
      Foi pensando nisso que a gente escreveu o playbook sobre <strong>pra onde esse
      mercado está indo em 2026</strong>: as narrativas que estão ganhando força, os canais
      que estão mudando de peso e como planejar os próximos meses sem apostar tudo numa
      fase que já passou.
    </p>

    ${resourceBlock({
      title: pb.title,
      coverUrl: pb.coverUrl,
      url: pb.url,
      label: "Ler o playbook",
      kicker: "Playbook gratuito",
    })}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Depois de ler, me responde uma coisa: o teu marketing de hoje foi desenhado pra fase
      do ciclo em que tu está, ou pra fase que já passou? Responde este email que eu troco
      a minha leitura contigo.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      Se o teu plano envolve token, temos também o playbook de TGE: como levar um token do
      zero ao mercado. Tudo em kaleidos.com.br/papers.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "A demanda em cripto anda em ciclos, não em linha reta. E 2026 tem playbook.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `Marketing cripto não é marketing tradicional acelerado

Uma tese que guia quase tudo que a gente faz: nesse mercado, a demanda não anda em linha reta, anda em ciclos. Quando o mercado esquenta, todo mundo aparece ao mesmo tempo, o custo de atenção explode e as marcas somem no barulho. Quando esfria, a maioria corta conteúdo e desaparece.

Três consequências práticas disso: quem constrói no silêncio colhe no barulho, narrativa vence feature, e comunidade é o único canal que não depende do ciclo. Quem trata o ciclo como parte da estratégia joga um jogo diferente de quem só reage a ele.

Foi pensando nisso que a gente escreveu o playbook sobre pra onde esse mercado está indo em 2026: as narrativas que estão ganhando força, os canais que estão mudando de peso e como planejar os próximos meses sem apostar tudo numa fase que já passou.

Ler o playbook "${pb.title}": ${pb.url}

Depois de ler, me responde uma coisa: o teu marketing de hoje foi desenhado pra fase do ciclo em que tu está, ou pra fase que já passou? Responde este email que eu troco a minha leitura contigo.

Se o teu plano envolve token, temos também o playbook de TGE: como levar um token do zero ao mercado. Tudo em kaleidos.com.br/papers.

Descadastrar: ${opts.unsubUrl}`,
  };
}
