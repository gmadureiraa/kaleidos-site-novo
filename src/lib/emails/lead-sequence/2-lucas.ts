// TODO CONFIRMAR nomes de marca com Gabriel antes de ativar
import { ctaButton, escapeHtml, shell, whatsappUrl } from "./shared";

export function buildLucasEmail(opts: { name?: string | null; unsubUrl: string }) {
  const name = opts.name?.trim().split(" ")[0] || "";
  const heading = name ? `${escapeHtml(name)}, teu projeto cabe em uma frase?` : "Teu projeto cabe em uma frase?";
  const headingText = name ? `${name}, teu projeto cabe em uma frase?` : "Teu projeto cabe em uma frase?";

  const subject = `Se eu te pedir teu posicionamento em uma frase, tu trava?`;
  const wa = whatsappUrl(
    "Oi, vim do email da Kaleidos. Queria conversar sobre posicionamento. Hoje eu explicaria meu projeto assim:"
  );

  const body = `
    <h1 style="font-family:Inter,sans-serif;font-size:24px;font-weight:600;color:#0a0a0a;margin:8px 0 16px 0;line-height:1.25;">
      ${heading}
    </h1>
    <p style="margin:0 0 14px 0;">
      Faz o teste agora: <strong>pra quem é o teu produto, o que ele resolve e por que tu, e
      não o concorrente?</strong> Se a resposta demorou mais que uma respiração, o problema
      não é o teu tráfego nem o teu criativo. É posicionamento.
    </p>
    <p style="margin:0 0 14px 0;">
      É aqui que a Kaleidos costuma começar todo trabalho. Antes de post, antes de campanha,
      antes de qualquer lançamento: narrativa, ângulo e diferenciação. Em cripto e fintech
      isso pesa dobrado, porque todo mundo fala parecido ("seguro", "descentralizado",
      "o futuro do dinheiro") e o público já aprendeu a ignorar.
    </p>
    <p style="margin:0 0 14px 0;">
      O nosso jeito de fazer: a gente mergulha no teu mercado, mapeia o que os concorrentes
      estão dizendo, acha o espaço que ninguém ocupou e transforma isso numa tese que guia
      todo o resto. Como a gente é nativa desse mercado, tu não gasta reunião explicando o
      que é uma stablecoin ou por que auto-custódia importa. A conversa já começa no nível
      do teu negócio.
    </p>
    <p style="margin:0 0 6px 0;">
      E no teu caso? Como tu explicaria o teu projeto hoje, do teu jeito, sem ensaiar? Me
      manda essa frase crua no WhatsApp. Eu devolvo uma leitura honesta do que ela comunica
      e do que ela deixa na mesa.
    </p>

    ${ctaButton("Mandar minha frase no WhatsApp", wa)}

    <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">
      Se preferir, responde este email com a frase. Vale igual.
    </p>

    <p style="margin:24px 0 0 0;font-size:13px;color:#9ca3af;border-top:1px solid #f1f1ef;padding-top:14px;">
      No próximo email: como a gente usa IA pra tirar conteúdo do papel sem virar linha de
      produção genérica.
    </p>
  `;

  return {
    subject,
    html: shell({
      preheader: "Pra quem é, o que resolve, por que tu. Se demorou pra responder, lê isso.",
      bodyHtml: body,
      unsubUrl: opts.unsubUrl,
    }),
    text: `${headingText}

Faz o teste agora: pra quem é o teu produto, o que ele resolve e por que tu, e não o concorrente? Se a resposta demorou mais que uma respiração, o problema não é o teu tráfego nem o teu criativo. É posicionamento.

É aqui que a Kaleidos costuma começar todo trabalho. Antes de post, antes de campanha, antes de qualquer lançamento: narrativa, ângulo e diferenciação. Em cripto e fintech isso pesa dobrado, porque todo mundo fala parecido e o público já aprendeu a ignorar.

O nosso jeito de fazer: a gente mergulha no teu mercado, mapeia o que os concorrentes estão dizendo, acha o espaço que ninguém ocupou e transforma isso numa tese que guia todo o resto. Como a gente é nativa desse mercado, tu não gasta reunião explicando o que é uma stablecoin. A conversa já começa no nível do teu negócio.

E no teu caso? Como tu explicaria o teu projeto hoje, do teu jeito, sem ensaiar? Me manda essa frase crua no WhatsApp. Eu devolvo uma leitura honesta do que ela comunica e do que ela deixa na mesa.

Mandar minha frase no WhatsApp: ${wa}

Se preferir, responde este email com a frase. Vale igual.

No próximo email: como a gente usa IA pra tirar conteúdo do papel sem virar linha de produção genérica.

Descadastrar: ${opts.unsubUrl}`,
  };
}
