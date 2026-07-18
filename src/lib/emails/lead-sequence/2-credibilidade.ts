import { ctaButton, escapeHtml, marcasInline, shell, whatsappUrl } from "./shared";

/**
 * Email 2 (dia 1): credibilidade. 7+ anos vivendo o mercado cripto,
 * área por área. Autoridade real, sem inventar número de resultado.
 * CTA principal: responder o email (cai no madureira@).
 */
export function buildCredibilidadeEmail(opts: { name?: string | null; unsubUrl: string }) {
  const subject = `Há mais de 7 anos dentro do mercado cripto, todo dia`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Meu projeto atua nessa área do mercado:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      Por que dá pra confiar no que a gente fala sobre esse mercado
    </h1>
    <p style="margin:0 0 14px 0;">
      Ontem eu te fiz uma pergunta. Hoje quero responder a que provavelmente ficou na tua
      cabeça: <strong>"quem são vocês pra falar de marketing cripto?"</strong>
    </p>
    <p style="margin:0 0 14px 0;">
      Nosso time está há <strong>mais de 7 anos dentro do mercado cripto</strong>, estudando
      e vivendo cada área desse mercado todo dia. Não como observador de fora que aprendeu o
      vocabulário pra vender serviço: como quem usa, testa, erra e acompanha cada ciclo desde
      antes de virar manchete.
    </p>
    <p style="margin:0 0 14px 0;">
      Isso significa que a gente conversa de igual pra igual sobre
      <strong>stablecoins, DeFi, trading, NFTs, L2s, memecoins, TGEs, adoção
      institucional</strong> e o que mais o teu projeto tocar. Tokenomics, auto-custódia,
      narrativa de ciclo, regulação: nada disso precisa ser explicado pra gente em reunião.
      A conversa já começa no nível do teu negócio.
    </p>
    <p style="margin:0 0 14px 0;">
      É essa vivência que marcas como ${escapeHtml(marcasInline())} encontraram quando
      trabalharam com a gente: um time que entende o produto antes de propor o marketing.
    </p>
    <p style="margin:0 0 6px 0;">
      Me conta: <strong>em qual dessas áreas o teu projeto atua?</strong> Responde este email
      com uma linha que eu já te devolvo uma primeira leitura de como o marketing costuma
      funcionar (e falhar) nesse nicho específico.
    </p>

    ${ctaButton("Responder pelo WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Ou simplesmente responde este email. Cai direto na caixa de quem decide, não num CRM.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      No próximo email te mando um material completo, de graça, sobre como vender quando o
      mercado esfria. É o nosso mais pedido.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Stablecoins, DeFi, NFTs, L2s, TGEs: a gente vive isso todo dia desde antes da manchete.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `Por que dá pra confiar no que a gente fala sobre esse mercado

Ontem eu te fiz uma pergunta. Hoje quero responder a que provavelmente ficou na tua cabeça: "quem são vocês pra falar de marketing cripto?"

Nosso time está há mais de 7 anos dentro do mercado cripto, estudando e vivendo cada área desse mercado todo dia. Não como observador de fora que aprendeu o vocabulário pra vender serviço: como quem usa, testa, erra e acompanha cada ciclo desde antes de virar manchete.

Isso significa que a gente conversa de igual pra igual sobre stablecoins, DeFi, trading, NFTs, L2s, memecoins, TGEs, adoção institucional e o que mais o teu projeto tocar. Tokenomics, auto-custódia, narrativa de ciclo, regulação: nada disso precisa ser explicado pra gente em reunião. A conversa já começa no nível do teu negócio.

É essa vivência que marcas como ${marcasInline()} encontraram quando trabalharam com a gente: um time que entende o produto antes de propor o marketing.

Me conta: em qual dessas áreas o teu projeto atua? Responde este email com uma linha que eu já te devolvo uma primeira leitura de como o marketing costuma funcionar (e falhar) nesse nicho específico.

Responder pelo WhatsApp: ${wa}

Ou simplesmente responde este email. Cai direto na caixa de quem decide, não num CRM.

No próximo email te mando um material completo, de graça, sobre como vender quando o mercado esfria. É o nosso mais pedido.

Descadastrar: ${opts.unsubUrl}`,
  };
}
