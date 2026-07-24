import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew20: BlogPost[] = [
  {
    slug: "tokenomics-e-marketing-sell-buy-pressure",
    title: "Tokenomics é marketing: sell/buy pressure como decisão de growth",
    seoTitle: "Tokenomics é marketing: sell e buy pressure",
    excerpt:
      "Emissão, unlocks, incentivos e utilidade não são só engenharia financeira: são a mensagem mais alta que um projeto cripto emite. A Kaleidos explica por que sell e buy pressure são decisões de growth, os erros de low-float/high-FDV e unlocks mal comunicados, e como alinhar tokenomics e narrativa.",
    seoDescription:
      "Tokenomics molda sell e buy pressure e, com isso, a percepção do projeto. Por que desenho de token é decisão de marketing, erros de unlock e low-float/high-FDV.",
    category: "cripto",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 11,
    featured: false,
    coverImage: "/blog/tokenomics-e-marketing-sell-buy-pressure/cover.png",
    tags: [
      "tokenomics",
      "marketing cripto",
      "web3",
      "sell pressure",
      "token unlocks",
      "growth",
      "narrativa cripto",
      "low float high FDV",
    ],
    tldr:
      "Tokenomics é o canal de marketing mais barulhento de um projeto cripto: emissão, unlocks e incentivos definem sell e buy pressure, e o gráfico de preço vira a mensagem que todo mundo lê. Desenho de token e narrativa precisam ser planejados juntos, como decisão de growth.",
    faq: [
      {
        question: "Por que tokenomics é considerado marketing?",
        answer:
          "Porque o desenho do token (emissão, unlocks, incentivos, utilidade) determina quem compra, quem vende e quando. Isso molda o gráfico de preço, e o gráfico é a peça de comunicação mais vista do projeto: comunica saúde, confiança e alinhamento antes de qualquer post ou campanha.",
      },
      {
        question: "O que é sell pressure e buy pressure em um token?",
        answer:
          "Sell pressure é toda força estrutural que empurra holders a vender: unlocks de investidores, emissões de recompensas, farming mercenário. Buy pressure é o que cria demanda recorrente: utilidade real, staking com propósito, buybacks financiados por receita, acesso a produto. O saldo entre as duas define a percepção pública do token.",
      },
      {
        question: "O que é o problema de low-float/high-FDV?",
        answer:
          "É lançar o token com pouquíssimo supply em circulação (low float) e avaliação totalmente diluída altíssima (high FDV). Segundo a Binance Research (2024), tokens lançados em 2024 estrearam com cerca de 13% do supply circulante em média. O resultado típico: anos de unlocks pela frente, sell pressure contínua e uma narrativa de 'exit liquidity' que nenhuma campanha reverte.",
      },
      {
        question: "Unlocks de token sempre derrubam o preço?",
        answer:
          "Não sempre, mas a tendência é negativa: a Keyrock (2024) analisou mais de 16.000 eventos de unlock e encontrou pressão de queda na maioria dos casos relevantes, com o mercado antecipando o movimento semanas antes da data. Comunicação antecipada, absorção via utilidade e escalonamento reduzem o impacto, mas ignorar o unlock no plano de marketing é o pior cenário.",
      },
      {
        question: "Como alinhar tokenomics e narrativa de marketing?",
        answer:
          "Tratando os dois como um único plano: mapear o calendário de unlocks antes de planejar campanhas, casar lançamentos de produto e utilidade com janelas de emissão, comunicar datas sensíveis com antecedência e nunca prometer 'valorização' que o desenho do token não sustenta. Growth em cripto começa na planilha de supply, não no calendário de posts.",
      },
    ],
    content: `# Tokenomics é marketing: sell/buy pressure como decisão de growth

Todo projeto cripto tem dois departamentos de marketing. Um publica threads, organiza AMAs e faz campanhas de comunidade. O outro decide quando os investidores da seed podem vender, quanto token é emitido por mês para recompensas e o que, na prática, alguém ganha por segurar o ativo. O segundo departamento raramente se enxerga como marketing. E é exatamente ele que escreve a mensagem mais alta do projeto: o gráfico de preço.

A tese da Kaleidos é direta: tokenomics é marketing. Emissão, cronograma de unlocks, incentivos e utilidade determinam a pressão de compra e de venda sobre o token. Essa pressão desenha o gráfico. E o gráfico é a peça de comunicação mais consumida do projeto, vista todos os dias por holders, imprensa, exchanges e concorrentes. Nenhuma campanha compete com ele. Quem trata desenho de token como assunto exclusivo de finanças e narrativa como assunto exclusivo de comunicação acaba com os dois quebrados.

## Principais takeaways

- O gráfico de preço é o canal de marketing involuntário de todo projeto com token: comunica saúde e alinhamento antes de qualquer post.
- Sell pressure estrutural (unlocks, emissões, farming mercenário) é uma decisão de produto que vira mensagem pública, queira o time ou não.
- Low-float/high-FDV virou sinônimo de desconfiança: a Binance Research (2024) mostrou que lançamentos de 2024 estrearam com cerca de 13% do supply em circulação, deixando anos de venda programada pela frente.
- A Keyrock (2024) analisou mais de 16.000 unlocks e encontrou pressão negativa na maioria dos eventos relevantes, com o mercado antecipando semanas antes.
- Buy pressure sustentável nasce de utilidade e receita real, não de promessa: o caso Hyperliquid (2024) mostrou o efeito narrativo de devolver valor ao usuário.
- O trabalho certo é um só: calendário de unlocks, lançamentos de produto e plano de comunicação desenhados juntos, como decisão de growth.

## O gráfico é a mensagem

Em qualquer outro mercado, o preço do produto é uma variável interna. Em cripto, o preço do token é público, em tempo real, e carrega julgamento moral: token subindo é "time executando", token caindo é "founders despejando no varejo". Justo ou não, é assim que o mercado lê.

Isso muda o papel do marketing. Em web2, comunicação constrói percepção e o produto entrega. Em web3, existe um terceiro ator: o desenho econômico do token, que produz sinais diários e verificáveis on-chain. Qualquer pessoa consegue auditar quanto supply destrava no próximo trimestre, quanto os fundos pagaram por token e qual a distância entre float e FDV. Plataformas de rastreamento de unlocks transformaram esse calendário em conteúdo: cada destrave relevante vira notícia, thread e pauta antes mesmo de acontecer.

A consequência prática: a narrativa que o time conta precisa bater com a matemática que o token mostra. Quando o discurso diz "longo prazo" e o cronograma diz "cliff de 12 meses e destrave agressivo", o mercado acredita no cronograma.

## Sell pressure: as decisões que viram mensagem negativa

Sell pressure estrutural vem de três fontes principais, e todas são decisões tomadas meses ou anos antes de qualquer campanha.

**1. Unlocks de investidores e time.** É a fonte mais visível e mais monitorada. A Keyrock, market maker europeia, publicou em 2024 uma análise de mais de 16.000 eventos de unlock e encontrou um padrão consistente: destraves relevantes tendem a gerar pressão de queda, e o mercado começa a precificar o evento semanas antes da data, com traders vendendo na antecipação. Ou seja: o unlock não é só um evento financeiro, é um evento de comunicação com janela própria, e o silêncio do projeto durante essa janela também comunica.

**2. Emissões de incentivo.** Recompensas de liquidity mining e farming emitem token novo continuamente. Quando o incentivo atrai capital mercenário, que farma e vende no mesmo dia, o projeto está literalmente pagando para criar sell pressure. O ciclo de DeFi de 2020 e 2021 deixou essa lição documentada: programas de emissão alta compraram TVL temporário e venderam a percepção de token inflacionário. TVL alugado não é comunidade, é custo de aquisição disfarçado. O antídoto está nos [growth loops que recompensam permanência, não volume](/blog/growth-loops-cripto-referral-quests).

**3. Low-float/high-FDV.** O padrão dominante dos lançamentos recentes: pouco supply em circulação no dia da listagem e avaliação totalmente diluída nas alturas. A Binance Research documentou o fenômeno no relatório "Low Float & High FDV: How Did We Get Here?" (2024): tokens lançados em 2024 estrearam, em média, com cerca de 13% do supply em circulação, contra proporções bem maiores em ciclos anteriores. A matemática que sobra é cruel: se 87% do supply ainda vai destravar, todo comprador do dia 1 sabe que existe uma fila de vendedores programados pela frente. O apelido que o mercado deu para quem compra nesse cenário ("exit liquidity") virou meme, e meme negativo é o tipo de narrativa que nenhum orçamento de mídia reverte.

O caso Starknet ilustra o custo narrativo. O STRK estreou em fevereiro de 2024 com FDV na casa das dezenas de bilhões de dólares e float baixo, dentro do padrão da safra. Nos meses seguintes, o token acumulou queda expressiva enquanto os destraves avançavam, e a conversa pública sobre o projeto passou a orbitar o preço e o cronograma, não a tecnologia. O produto continuou evoluindo; a narrativa, não. Quando o desenho do token domina a pauta, o marketing perde o controle da história.

## Buy pressure: o que cria demanda de verdade

Do outro lado da balança, buy pressure sustentável vem de mecanismos que dão motivo recorrente para comprar ou segurar o token. Três se destacam.

**Utilidade real.** Token que dá acesso a produto, desconto em taxa, prioridade em feature ou poder de decisão relevante cria demanda ligada ao uso, não à especulação. O teste é simples: se o produto crescer 10x, a demanda pelo token cresce junto? Se a resposta é não, a "utilidade" é decorativa, e o mercado percebe rápido.

**Receita devolvida ao token.** Buybacks e queimas financiados por receita real conectam o desempenho do negócio ao ativo. A MakerDAO ativou em 2023 o Smart Burn Engine, usando excedente de receita do protocolo para recomprar MKR, e transformou a mecânica em argumento central da tese do token. O detalhe importante: buyback só comunica força quando existe receita de verdade por trás. Queima financiada por tesouraria em queda comunica desespero.

**Alinhamento na distribuição.** O contraexemplo mais citado da era low-float/high-FDV foi a Hyperliquid. No lançamento do HYPE, em novembro de 2024, o projeto distribuiu 31% do supply via airdrop direto para usuários, sem alocação para fundos de venture capital, e direcionou a maior parte das taxas do protocolo para recompra de token via Assistance Fund, conforme a documentação do próprio projeto (2024). O desenho virou a narrativa: "protocolo do usuário, não do fundo". A comunidade fez o marketing que o time não precisou pagar, e o lançamento foi lido pelo mercado como resposta direta ao modelo criticado pela Binance Research meses antes. O ponto aqui não é prever preço, e sim notar que a decisão de tokenomics foi a campanha. É exatamente o caminho que apontamos em [como os airdrops vão mudar em 2026](/blog/jogo-dos-incentivos-airdrops-2026).

## Unlocks mal comunicados: o erro mais barato de evitar

Entre todos os erros, o mais frustrante é o unlock mal comunicado, porque é o mais evitável. O evento é público, a data é conhecida com meses de antecedência e o mercado vai olhar de qualquer jeito. O que diferencia projetos maduros é o que acontece ao redor da data.

O padrão ruim: o time ignora o destrave, a comunidade descobre por agregadores de terceiros, influenciadores enquadram o evento como "dump chegando" e o projeto passa a semana respondendo FUD em posição defensiva. A Celestia viveu uma versão dura disso em outubro de 2024, quando um unlock de 175 milhões de TIA, volume próximo do supply que já circulava, dominou a conversa pública sobre o projeto por semanas, com o preço em queda acentuada no período segundo dados públicos de mercado da época. O destrave estava no cronograma desde o TGE de 2023; a pauta, ninguém disputou.

O padrão bom tem quatro movimentos:

- **Antecipação:** o próprio projeto comunica a data, o volume e o contexto semanas antes, ocupando a pauta antes dos agregadores.
- **Enquadramento:** explicar quem recebe, qual o racional da alocação e o que os recebedores sinalizaram (lockups voluntários, staking, OTC estruturado).
- **Absorção:** casar a janela do unlock com lançamentos que criam demanda real: feature nova, expansão de utilidade, programa de staking, integração relevante.
- **Follow-up:** depois do evento, mostrar o que aconteceu de fato com dados on-chain, fechando o ciclo com transparência.

Nenhum desses movimentos elimina a sell pressure matemática. Todos eles reduzem a sell pressure narrativa, que costuma ser maior: a Keyrock (2024) mostrou que boa parte da queda acontece antes do destrave, na antecipação. Antecipação é percepção, e percepção é trabalho de marketing. No [pós-mortem de airdrops](/blog/airdrop-pos-mortem-evitar-dump), o mesmo padrão se repete no dia do claim.

## Como alinhar tokenomics e narrativa na prática

Para founders e times de growth, o checklist da Kaleidos é este:

1. **Coloque marketing na mesa do desenho do token.** As perguntas "como isso será lido pelo mercado?" e "que história esse cronograma conta?" precisam ser feitas antes do TGE, não depois do primeiro dump.
2. **Trate o calendário de unlocks como calendário editorial.** Cada destrave relevante dos próximos 24 meses é uma pauta com data marcada. Planeje comunicação e lançamentos ao redor delas.
3. **Feche a distância entre float e FDV, ou explique-a.** Se o lançamento for low-float, o mercado vai cobrar. Tenha resposta melhor que silêncio: racional de alocação, lockups longos, metas de circulação.
4. **Só prometa o que o desenho sustenta.** Narrativa de "token de comunidade" com 40% alocado a insiders é contradição auditável on-chain. Em cripto, incoerência entre discurso e supply é detectada em minutos.
5. **Construa buy pressure antes de precisar dela.** Utilidade, receita devolvida ao token e staking com propósito levam meses para amadurecer. O pior momento para começar é durante a crise de preço.
6. **Meça percepção, não só preço.** Sentimento em canais próprios, enquadramento na imprensa e teor das conversas em comunidades antecipam o que o gráfico vai mostrar.

## Tokenomics e narrativa são o mesmo projeto

A separação entre "time de token" e "time de marketing" é um resquício de como as empresas web2 se organizavam. Em web3, o desenho econômico é a mensagem, o cronograma de vesting é o calendário editorial e o gráfico é o outdoor. Projetos que entendem isso desenham sell e buy pressure como desenham funil de aquisição: com intenção, com métricas e com a percepção do usuário no centro.

A Kaleidos trabalha exatamente nessa interseção: estratégia de marketing para projetos cripto e web3 que trata tokenomics, narrativa e comunidade como um sistema único. Se o seu projeto tem um TGE no horizonte, um calendário de unlocks pela frente ou uma narrativa que não está batendo com o que o token mostra on-chain, [fale com a gente](/contato). O melhor momento para alinhar desenho de token e marketing é antes do mercado fazer essa leitura por você.`,
  },
];
