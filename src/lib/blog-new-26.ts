import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew26: BlogPost[] = [
  {
    slug: "teardown-lombard-points-system",
    title: "Teardown Lombard: o points system que pune capital mercenário",
    seoTitle: "Teardown Lombard: points contra capital mercenário",
    excerpt:
      "O Lombard cruzou US$ 1 bilhão de TVL em cerca de três meses e desenhou o Lux, um sistema de pontos que multiplica recompensa por permanência e zera o multiplicador de quem saca. Teardown completo do desenho de incentivos e das lições pra retenção on-chain.",
    seoDescription:
      "Teardown do points system do Lombard (LBTC): multiplicadores por tempo, reset ao sacar e airdrop com vesting. Lições reais de retenção de capital on-chain.",
    category: "cases",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 11,
    featured: false,
    coverImage: "",
    tags: [
      "lombard finance",
      "points system",
      "capital mercenário",
      "retenção on-chain",
      "btcfi",
      "airdrop design",
      "incentivos web3",
      "marketing cripto",
    ],
    tldr:
      "O Lombard transformou pontos em filtro de comportamento: o Lux multiplica recompensa por permanência (1x até 30 dias, 1,5x até 60, 2x depois de 61) e zera o multiplicador de quem saca. Com airdrop em vesting de 12 meses, farmar vira matematicamente ruim. O preço do BARD sofreu, mas o protocolo atravessou o unlock de março de 2026 com TVL na casa de US$ 1 bilhão.",
    faq: [
      {
        question: "O que é o Lombard e o que é o LBTC?",
        answer:
          "O Lombard é um protocolo de BTC-fi lançado em agosto de 2024 que emite o LBTC, um token líquido de Bitcoin em staking via Babylon. O usuário deposita BTC, recebe LBTC 1:1 e pode usar esse token em DeFi enquanto o Bitcoin original gera yield de staking. O protocolo levantou US$ 16 milhões em seed liderado pela Polychain Capital em julho de 2024 e cruzou US$ 1 bilhão de TVL em novembro de 2024, cerca de três meses após o lançamento.",
      },
      {
        question: "Como funciona o sistema de pontos Lux do Lombard?",
        answer:
          "O Lux é acumulado por hora com a fórmula: dias em staking x quantidade de LBTC x 1.000. Sobre essa base entra um multiplicador por permanência: 1x de 0 a 30 dias, 1,5x de 31 a 60 dias e 2x a partir de 61 dias. O detalhe punitivo é que sacar e redepositar reseta o multiplicador pra 1x, apagando todo o crédito de duração acumulado. Vaults de DeFi parceiros ofereciam Lux extra (o vault LBTC-TAC pagava 4x, por exemplo).",
      },
      {
        question: "Por que o Lombard quis punir capital mercenário?",
        answer:
          "Porque capital mercenário infla o TVL antes do snapshot e evapora depois, deixando o protocolo com métricas de pico que não sustentam produto nem liquidez. O desenho do Lux torna essa rotação matematicamente ruim: um farmer que gira capital a cada quinzena nunca sai do tier 1x, enquanto quem fica três meses acumula na faixa de 3x o total de pontos do farmer com o mesmo capital. O incentivo seleciona o holder paciente.",
      },
      {
        question: "Como foi o airdrop do BARD e o que aconteceu com o preço?",
        answer:
          "O BARD teve TGE em 18 de setembro de 2025, com supply de 1 bilhão e 22,5% desbloqueado no início. A Season 1 do airdrop alocou 4% do supply (40 milhões de BARD) com vesting: 1,5% no TGE, 1,5% seis meses depois e 1% após 12 meses. As Seasons 1 e 2 somadas distribuíram 30 milhões de BARD em 18 de março de 2026. O preço caiu cerca de 19% nas 24 horas após o unlock e depois recuou mais de 86% do topo de US$ 1,70, mostrando que points system bem desenhado retém TVL, mas não blinda o token de pressão vendedora de unlocks.",
      },
      {
        question: "Como a Kaleidos aplica essas lições em projetos cripto?",
        answer:
          "A Kaleidos parte do comportamento que o protocolo precisa reter, não da métrica de vaidade. Na prática: desenhar pontos que multiplicam permanência e profundidade de uso, criar custo real de saída pro farmer (reset de multiplicador, vesting de recompensa), alinhar o calendário de unlocks com a narrativa de comunicação e medir retenção por cohort depois do snapshot, que é onde a maioria dos programas de pontos quebra.",
      },
    ],
    content: `# Teardown Lombard: o points system que pune capital mercenário

Todo protocolo cripto que lança programa de pontos enfrenta o mesmo dilema: os pontos atraem capital, mas o capital que chega por pontos costuma ir embora no dia seguinte ao snapshot. A indústria chama isso de capital mercenário, e ele já destruiu a curva de TVL de dezenas de protocolos que confundiram pico de depósito com tração real.

O Lombard, protocolo de BTC-fi que emite o LBTC (Bitcoin líquido em staking via Babylon), atacou esse problema pelo desenho. Em vez de pagar pontos por volume bruto, o sistema Lux multiplica recompensa por permanência e, mais importante, zera o multiplicador de quem saca. O resultado: um dos points systems mais estudados do ciclo, um TVL que cruzou US$ 1 bilhão em novembro de 2024, cerca de três meses após o lançamento (DefiLlama, 2026), e um airdrop que pagou o holder paciente até 2x mais que o farmer de rotação.

A Kaleidos destrinchou o desenho completo, no mesmo formato dos nossos outros [teardowns e estudos de caso](/blog/categoria/cases): o que o Lombard fez, quais números sustentam a tese, onde o sistema funcionou, onde ele não protegeu (spoiler: o preço do token) e o que qualquer projeto pode copiar pra reter capital de verdade.

## Principais takeaways

- O Lux acumula por hora com fórmula simples (dias x LBTC x 1.000), mas o multiplicador por permanência é o coração do sistema: 1x até 30 dias, 1,5x de 31 a 60, 2x a partir de 61 dias (Lombard Docs, 2025).
- Sacar reseta o multiplicador pra 1x e apaga o crédito de duração. Um farmer girando capital a cada 15 dias nunca sai do tier mais baixo (Crypto News Navigator, 2026).
- Ficar três meses em vez de um rende na faixa de 3x o total de pontos com o mesmo capital. O custo de oportunidade de farmar virou argumento matemático, não apelo moral.
- O airdrop do BARD estendeu a lógica: Season 1 alocou 4% do supply com vesting em três parcelas ao longo de 12 meses (Lombard, 2025). Receber o airdrop inteiro exige continuar por perto.
- O sistema protegeu o TVL, não o preço: o BARD caiu cerca de 19% nas 24 horas após o unlock de março de 2026 e mais de 86% do topo (Crypto News Navigator, 2026). Points system resolve retenção de capital, não tokenomics de unlock.

## O contexto: BTC-fi e a corrida pelo Bitcoin ocioso

O Lombard nasceu com uma tese direta: existe mais de US$ 1 trilhão em Bitcoin parado, e quem construir o trilho pra esse capital render em DeFi captura um dos maiores mercados endereçáveis de cripto. Em julho de 2024, a Polychain Capital liderou o seed de US$ 16 milhões do protocolo, com participação de Babylon, Franklin Templeton, OKX Ventures e outros fundos, segundo o The Block (2024).

O produto lançou em agosto de 2024: o usuário deposita BTC, o protocolo faz staking via Babylon (que permite usar o peso econômico do Bitcoin pra segurar outras redes, sem bridge nem custodiante centralizado) e devolve LBTC, um token líquido que representa esse Bitcoin em staking e circula em DeFi.

A tração veio rápido. O protocolo cruzou US$ 1 bilhão de TVL em novembro de 2024, cerca de três meses após o lançamento, fez pico acima de US$ 2 bilhões em maio de 2025 e se consolidou entre os maiores protocolos de Bitcoin liquid staking (DefiLlama, 2026).

Só que TVL rápido em cripto quase sempre significa uma coisa: gente farmando o airdrop. E é aí que o desenho do Lux entra.

## O teardown: como o Lux funciona por dentro

### A fórmula base

O Lux é distribuído por hora seguindo a fórmula documentada pelo próprio protocolo (Lombard Docs, 2025):

**Lux = dias em staking x quantidade de LBTC x 1.000**

Exemplo dos docs: 0,01 BTC em staking por um dia rende 10 Lux. Simples, linear, transparente. Até aqui, nada diferente de qualquer programa de pontos do ciclo.

### O multiplicador por permanência

A camada que muda o jogo é o multiplicador por tempo de posição, em três tiers (Crypto News Navigator, 2026):

- **0 a 30 dias:** 1x
- **31 a 60 dias:** 1,5x
- **61 dias ou mais:** 2x

Na prática, quem fica 90 dias acumula na faixa de 3x o total de pontos de quem fica 30 dias com o mesmo capital, porque além do multiplicador maior, o tempo extra também soma na base linear. O sistema não pede lealdade: ele paga por ela, em curva crescente.

### O reset: a punição que sustenta tudo

Multiplicador crescente sozinho não segura farmer sofisticado. Ele saca, gira o capital em outro protocolo e volta pro snapshot. O Lombard fechou essa porta com a regra mais importante do sistema: **sacar e redepositar reseta o multiplicador pra 1x** e apaga todo o crédito de duração acumulado (Crypto News Navigator, 2026).

Isso muda a matemática do mercenário. Um farmer que roda capital pelo Lombard a cada quinzena nunca alcança tier acima de 1x. O custo de sair não é uma taxa: é a perda do progresso. É o mesmo princípio de streak do Duolingo aplicado a capital, e funciona pelo mesmo motivo, aversão à perda pesa mais que promessa de ganho.

### A camada DeFi: pontos como moeda de integração

O Lombard ainda usou o Lux como ferramenta de BD. Integrações com protocolos parceiros pagavam múltiplos do ponto base: o vault LBTC-TAC, por exemplo, oferecia 4x Lux além de recompensas dos parceiros, segundo publicação oficial do Lombard no X (2025). O ecossistema listava mais de 70 protocolos, pools e estratégias pra deploy de LBTC (Lombard Docs, 2025), a mesma lógica de incentivos empilhados que analisamos no guia de [plataformas de yield farming](/blog/melhores-plataformas-yield-farming-2026).

O efeito composto é inteligente: o ponto que retém capital no protocolo também empurra esse capital pra dentro das integrações, o que aumenta a utilidade do LBTC, o que justifica segurar LBTC. Retenção alimentando distribuição.

### O airdrop: vesting como segunda linha de defesa

Quando o BARD chegou (TGE em 18 de setembro de 2025, supply de 1 bilhão, 22,5% desbloqueado no início, segundo a Bitget, 2025), o desenho anti-mercenário continuou. A Season 1 do airdrop alocou 4% do supply (40 milhões de BARD) pra usuários do programa Lux e provedores de liquidez iniciais, mas com entrega parcelada: 1,5% no TGE, 1,5% seis meses depois e 1% após 12 meses (Lombard, 2025).

A Season 2 do programa Luminary rodou de 16 de setembro de 2025 a 16 de março de 2026, com 1,5% do supply (15 milhões de BARD) alocado (Lombard Docs, 2025). Somadas, as Seasons 1 e 2 distribuíram 30 milhões de BARD em 18 de março de 2026 (Crypto News Navigator, 2026).

Ou seja: mesmo o usuário que ganhou o airdrop precisa continuar por perto um ano pra receber tudo. O filtro de paciência não termina no snapshot, ele se estende pro pós-TGE, exatamente a janela em que a maioria dos protocolos vê a comunidade evaporar.

## Onde o desenho não protegeu: o preço

Honestidade de teardown: o points system do Lombard resolveu retenção de capital, não a pressão vendedora do token. O BARD fez topo em US$ 1,70 no início de março de 2026, caiu cerca de 19% nas 24 horas seguintes ao unlock de 18 de março e recuou mais de 86% do topo nos meses seguintes, com os desbloqueios de investidores e equipe (45% do supply) começando em março de 2026 (Crypto News Navigator, 2026).

A lição aqui é separar problemas. Pontos com multiplicador e reset seguram TVL: o protocolo atravessou a janela do unlock de março de 2026 com cerca de US$ 1 bilhão depositado (DefiLlama, 2026). Mas token com unlock pesado contra market cap baixo sofre, independente de quão elegante seja o programa de pontos. São dois desenhos diferentes, e o segundo (tokenomics de emissão e unlock) não se conserta com gamificação.

## Lições

**1. Pague permanência, não volume.** A métrica que o points system recompensa é a métrica que o público vai otimizar. Se o ponto paga depósito, você compra depósito de um dia. Se o ponto multiplica por tempo, você compra permanência. O Lombard escolheu a segunda e o multiplicador de 2x aos 61 dias fez o trabalho de retenção que campanha nenhuma faria.

**2. A punição importa mais que o prêmio.** O reset de multiplicador ao sacar é a peça mais copiável do desenho. Sem custo de saída, todo multiplicador vira brinde pra quem já ia ficar. Com reset, sair tem preço, e aversão à perda é o motor comportamental mais barato que existe.

**3. Torne o farming matematicamente ruim, não proibido.** O Lombard não baniu mercenário nem criou regra arbitrária de elegibilidade. Só fez a conta não fechar: girar capital rende sistematicamente menos que ficar. Incentivo bem desenhado dispensa policiamento.

**4. Estenda o filtro pro pós-snapshot.** Airdrop com vesting em 12 meses mantém o beneficiário com skin in the game durante a fase mais frágil do protocolo, o primeiro ano de token líquido. A maioria dos programas termina no snapshot; os melhores começam a segunda fase ali.

**5. Points system não substitui tokenomics.** O caso do BARD mostra o limite: retenção de TVL e sustentação de preço são problemas distintos. Se o cronograma de unlock despeja oferta contra demanda fraca, nenhum sistema de pontos segura o gráfico. Desenhe os dois com o mesmo rigor.

**6. Use pontos como moeda de ecossistema.** Os multiplicadores em vaults parceiros transformaram o Lux em ferramenta de BD e distribuição. O mesmo ativo que retém o usuário empurra ele pras integrações que dão utilidade ao token. Um incentivo, dois trabalhos.

## O incentivo é o produto de marketing

O caso Lombard confirma uma tese que a Kaleidos repete pra todo cliente de web3 (e que aprofundamos em [onde os projetos de web3 marketing erram](/blog/web3-marketing-arte-perdida)): em cripto, o desenho de incentivo é uma peça de marketing tão importante quanto narrativa e canal. Quem desenha o incentivo desenha o público que vai atrair. Pontos genéricos atraem farmers genéricos. Pontos com custo de saída e curva de permanência atraem exatamente o capital que fica.

Se o seu protocolo está desenhando programa de pontos, campanha de airdrop ou estratégia de retenção on-chain, a Kaleidos ajuda a estruturar o desenho completo: mecânica de incentivo, narrativa, calendário de comunicação e medição de retenção por cohort depois do snapshot. [Fale com a Kaleidos](/contato) e transforme incentivo em capital que permanece.

**Fontes:** [The Block (2024)](https://www.theblock.co/post/303000/polychain-capital-leads-16-million-seed-round-for-bitcoin-restaking-protocol-lombard), [Lombard Docs (2025)](https://docs.lombard.finance/), [Lombard, tokenomics do BARD (2025)](https://www.lombard.finance/blog/bard-tokenomics/), [DefiLlama (2026)](https://defillama.com/protocol/lombard), [Crypto News Navigator (2026)](https://www.cryptonewsnavigator.com/academy/article/lombard-airdrop-strategy-actually-rewards-long-term-stakers).`,
  },
];
