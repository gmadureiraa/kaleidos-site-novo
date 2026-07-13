// Kaleidos Papers — estudos de marketing cripto em PDF, liberados por email.
// Os PDFs vivem em /public/papers/. Cada volume tem página gated em /papers/[slug].

export interface Paper {
  slug: string;
  volume: string; // ex: "Vol. 01"
  title: string; // ex: "Hyperliquid"
  subtitle: string;
  description: string;
  tldr?: string; // resumo answer-first denso, extraível por IA (GEO) — renderizado como bloco "Resumo" no gate
  highlights: string[]; // o que tem dentro
  pages: number;
  readTime: string; // ex: "25 min"
  tag: string; // ex: "DeFi · Perps"
  accent: string; // cor de destaque do projeto
  pdf: string;
  cover: string;
  publishedAt: string; // ISO
  hidden?: boolean; // não aparece em listagens públicas (home/banda); rota direta segue viva
  readHtml?: boolean; // tem /papers/<slug>/read.html (leitura web). false = só PDF (gate/email não oferecem "ler na web")
  /** Override do framing de card na seção de recursos do /2 (scrapbook | sticker-bomb | polaroid | dark-tech | pop-cor | editorial-emblema). Ausente = determinístico por slug. */
  coverStyle?: string;
}

export const papers: Paper[] = [
  {
    slug: "bear-market-2026",
    volume: "Flagship",
    title: "Como fazer marketing e vender no bear market",
    subtitle:
      "A jogada contra-cíclica: enquanto o mercado corta verba e some, você constrói a marca que domina o próximo ciclo",
    description:
      "O playbook da Kaleidos sobre a maior arbitragem de atenção do ciclo: no bear todo mundo corta marketing, a atenção fica barata, e quem investe em marca, conteúdo e vendas sai na frente quando o mercado vira. Nove capítulos de marketing e vendas cripto no frio, com dado histórico, casos on-chain e um checklist de ação de uma página. Educacional, aplicável a projeto, fintech e empresa.",
    tldr:
      "Playbook operacional de marketing e vendas para o mercado frio. A tese: no bear a maioria corta verba de marketing e some, então o share of voice fica barato, e quem mantém marca e conteúdo domina o próximo ciclo. Ancora em estudos clássicos de publicidade em recessão (ESOV de Les Binet e Peter Field, e o estudo McGraw-Hill que mostra empresas que anunciaram na recessão de 1981-82 crescendo até 275% enquanto as que cortaram ficaram para trás) e traz casos cripto que construíram no frio (Hyperliquid, Ondo, Berachain). Cobre o que muda no comportamento do comprador quando o preço cai, posicionamento que troca hype por fundamento, conteúdo como autoridade barata (SEO e AEO), aquisição de CAC baixo, comunidade e retenção, venda B2B com budget travado, e como lançar um token ou produto no frio. Fecha com um checklist de bear em uma página. Vale ler porque é o anti-instinto: prova, com fonte, que cortar marketing no bear é entregar o próximo ciclo para o concorrente.",
    highlights: [
      "A tese contra-cíclica com dado histórico: ESOV (Binet/Field) e o estudo McGraw-Hill (275% vs 132%) de quem anunciou na recessão",
      "O que morre no bear (hype, farming, mercenário) e o funil que sobra: confiança, utilidade, educação",
      "Aquisição de CAC baixo, conteúdo como autoridade barata (SEO+AEO) e retenção de comunidade no frio",
      "Vender e lançar com o mercado travado (B2B, TGE no frio) + o checklist de ação de bear em uma página",
    ],
    pages: 13,
    readTime: "25 min",
    tag: "Flagship · Marketing / Vendas",
    accent: "#D262B2",
    pdf: "/papers/bear-market-2026.pdf",
    cover: "/papers/cover-bear-market-v4.webp",
    publishedAt: "2026-07-07",
    readHtml: true,
  },
  {
    slug: "bull-market-2026",
    volume: "Especial",
    title: "Como se Preparar para o Próximo Bull Market",
    subtitle: "Atravesse o próximo ciclo com plano, não com sorte",
    description:
      "O playbook completo de quem quer chegar preparado no próximo ciclo cripto. Os padrões dos últimos bull markets, as narrativas que fizeram cada ciclo, como ler onde o mercado está, como se preparar antes, e a parte que ninguém ensina: quando sair. Mais a palavra dos maiores nomes do Brasil. Educacional, honesto, sem promessa de retorno.",
    tldr:
      "Estudo educacional de como atravessar um ciclo cripto com plano em vez de sorte. Decodifica os bull markets de 2013, 2017, 2021 e 2024-25 e o padrão de aproximadamente 4 anos que se repete, mostra qual narrativa puxou cada ciclo, e monta um painel simples de indicadores (MVRV, funding rate, Fear & Greed, fluxo de ETF) pra ler em que fase o mercado está. Fecha com a parte que quase ninguém ensina: como se posicionar antes, e quando e como sair com take-profit escalonado. Vale ler por ser honesto e sem promessa de retorno: é método pra não comprar no topo nem vender no fundo, não dica de moeda.",
    highlights: [
      "Os ciclos de 2013, 2017, 2021 e 2024-25 decodificados (e o padrão de 4 anos)",
      "Um painel simples de indicadores pra ler onde o mercado está (MVRV, funding, Fear & Greed, ETF)",
      "Como se preparar antes, como se posicionar, e quando SAIR (take-profit escalonado)",
      "A palavra dos maiores nomes e influencers cripto do Brasil (em breve)",
    ],
    pages: 19,
    readTime: "40 min",
    tag: "Investidor · Ciclos",
    accent: "#E0913A",
    pdf: "/papers/bull-market-2026.pdf",
    cover: "/papers/cover-bull-market.webp",
    publishedAt: "2026-06-08",
    hidden: true, // pré-lançamento: só via URL direta /papers/bull-market-2026
  },
  {
    slug: "hyperliquid",
    volume: "Vol. 01",
    title: "Como a Hyperliquid cresceu sem gastar com marketing",
    subtitle: "O marketing do projeto que cresceu sem marketing",
    description:
      "Como a Hyperliquid construiu uma das maiores exchanges descentralizadas do mundo sem VC, sem KOL pago e sem campanha. Um estudo das jogadas reais de marketing e produto que viraram o motor de crescimento, do airdrop bilionário ao buyback que recompra a própria narrativa.",
    tldr:
      "Como a Hyperliquid virou uma das maiores DEXs de perpétuos do mundo sem VC, sem KOL pago e sem campanha de marketing. O estudo destrincha 8 jogadas reais de growth: construir demanda antes do token, um airdrop de aproximadamente 31% do supply distribuído pra cerca de 94 mil usuários com zero alocação pra fundo, o produto funcionando como o próprio anúncio, e um flywheel de buyback que usa a receita pra recomprar token e narrativa ao mesmo tempo. Inclui o case JELLY, mostrando como uma crise foi gerida com honestidade em vez de PR. Vale ler porque é o anti-playbook: prova, com gráficos e fontes públicas (Grayscale, VanEck, Cantor), que produto e distribuição orgânica podem substituir o orçamento de mídia.",
    highlights: [
      "As 8 jogadas reais de growth (demanda pré-token, airdrop sem VC, produto-é-anúncio, flywheel de buyback e mais)",
      "O airdrop de ~31% do supply pra ~94 mil usuários, zero alocação pra fundo",
      "O caso JELLY: como a crise foi gerida com honestidade",
      "Os números que provam a tese, com gráficos e fontes (Grayscale, VanEck, Cantor)",
    ],
    pages: 22,
    readTime: "25 min",
    tag: "DeFi · Perps",
    accent: "#7CF067",
    pdf: "/papers/vol-01-hyperliquid.pdf",
    cover: "/papers/cover-vol-01.webp",
    publishedAt: "2026-06-07",
  },
  {
    slug: "pudgy-penguins",
    volume: "Vol. 02",
    title: "Como a Pudgy Penguins foi de NFT esquecido a marca global",
    subtitle: "Como um NFT falido virou marca global",
    description:
      "O Pudgy Penguins era um projeto NFT dado como morto até Luca Netz comprar a coleção por 750 ETH e transformá-la num case de marca e IP: brinquedos em 3.100 lojas do Walmart, 65 bilhões de views no GIPHY e, no fim, o token PENGU. Um estudo de como se constrói marca, distribuição e cultura em cima de um ativo digital.",
    tldr:
      "O Pudgy Penguins era um projeto NFT dado como morto até Luca Netz comprar a coleção por 750 ETH e transformá-lo num case de marca e propriedade intelectual. O estudo abre as 5 jogadas que reverteram o projeto: virar a coleção em IP licenciável, fechar distribuição física com 1,5 milhão de brinquedos em 3.100 lojas do Walmart, transformar os personagens em conteúdo viral com 65 bilhões de views no GIPHY, e só então lançar o token PENGU sobre uma marca já conhecida. Não esconde o outro lado: o PENGU caiu 90% e o paper extrai a lição disso. Vale ler porque é o playbook de transformar um ativo digital em marca, distribuição e cultura, aplicável a qualquer projeto cripto que dependa mais de percepção do que de tecnologia.",
    highlights: [
      "As 5 jogadas que reverteram um projeto dado como morto",
      "A virada de IP: Walmart, 1,5 milhão de brinquedos, 65 bi de views no GIPHY",
      "Teste de estresse honesto: o PENGU caiu 90% e o que isso ensina",
      "O playbook de marca aplicável a qualquer projeto cripto",
    ],
    pages: 17,
    readTime: "18 min",
    tag: "NFT · Marca / IP",
    accent: "#5AC8E0",
    pdf: "/papers/vol-02-pudgy-penguins.pdf",
    cover: "/papers/cover-vol-02.webp",
    publishedAt: "2026-06-07",
  },
  {
    slug: "solana",
    volume: "Vol. 03",
    title: "Como a Solana ressuscitou depois de virem o caixão",
    subtitle: "A marca que sobreviveu ao próprio atestado de óbito",
    description:
      "Em novembro de 2022 o mercado decretou a morte da Solana junto com a FTX: o SOL caiu de ~US$ 260 pra menos de US$ 9, uma perda na casa de 97%. Dois anos depois bateu topo histórico perto de US$ 295 e virou a rede que mais atraiu desenvolvedor novo no mundo. Um estudo de como a comunidade ressuscitou uma chain dada como morta, e de como o mesmo motor memecoin que a salvou também queimou bilhões de gente real.",
    tldr:
      "Em novembro de 2022 o mercado decretou a morte da Solana junto com a FTX: o SOL caiu de cerca de US$ 260 pra menos de US$ 9, uma perda na casa de 97%. Dois anos depois bateu topo histórico perto de US$ 295 e virou a rede que mais atraiu desenvolvedor novo no mundo, com 7.625 novos devs em 2024, superando o Ethereum. O estudo mostra como a comunidade ressuscitou a chain pela base (BONK, hacker houses e o Breakpoint como cola física do ecossistema) e não esconde o lado sombrio: o mesmo motor memecoin que a salvou, com a Pump.fun cruzando US$ 1 bi de receita, também queimou bilhões de gente real (aproximadamente US$ 3,94 bi de prejuízo só em TRUMP e LIBRA). Fecha com 7 lições transferíveis e onde a tese fica frágil, tudo com gráficos e fontes públicas. Vale ler como case de marca que sobreviveu ao próprio atestado de óbito.",
    highlights: [
      "A ressurreição pela comunidade: BONK, hacker houses e o Breakpoint como cola física do ecossistema",
      "Os números do arco: -97% pós-FTX, +2.600% até o topo, 7.625 novos devs em 2024 (superando o Ethereum)",
      "O motor memecoin: Pump.fun cruzando US$ 1 bi de receita, e o asterisco de US$ 3,94 bi de prejuízo em TRUMP e LIBRA",
      "7 lições transferíveis + onde a tese fica frágil, tudo com gráficos e fontes públicas (jun/2026)",
    ],
    pages: 19,
    readTime: "20 min",
    tag: "L1 · Comunidade / Marca",
    accent: "#9945FF",
    pdf: "/papers/solana/solana.pdf",
    cover: "/papers/cover-solana.webp",
    publishedAt: "2026-06-09",
  },
  {
    slug: "base",
    volume: "Vol. 04",
    title: "Como a Base virou uma das maiores L2 do mercado cripto",
    subtitle: "A L2 que cresceu com público já comprado",
    description:
      "Onde a maioria dos projetos cripto começa gritando pra um deserto, a Base começou com a plateia já sentada: cento e dez milhões de clientes verificados da Coinbase do outro lado da ponte. Um estudo de como uma empresa de capital aberto usou marca, campanha e narrativa pra converter clientes de uma corretora em cidadãos de uma rede, o que deu certo, o que colapsou no caminho, e o que sobrou de pé.",
    tldr:
      "Onde a maioria dos projetos cripto começa gritando pra um deserto, a Base começou com a plateia já sentada: aproximadamente 110 milhões de clientes verificados da Coinbase do outro lado da ponte, antes de gastar um dólar em mídia. O estudo mostra como uma empresa de capital aberto usou essa vantagem injusta de distribuição com marca, campanha e narrativa pra converter clientes de corretora em cidadãos de uma rede. Os marcos: a Onchain Summer fazendo 700 mil NFTs em 23 dias com Coca-Cola e Atari, o Buildathon com 7.500 builders e 1.250 projetos, e a TVL saindo de cerca de US$ 50 mi pra US$ 5,58 bi, virando a 2ª maior L2, com 87,2% da receita de sequencer da Superchain (Messari). Não maquia o que travou: dois anos sem token (TGE) viraram combustível e tensão ao mesmo tempo. Vale ler porque expõe acertos e rachaduras no mesmo nível.",
    highlights: [
      "A vantagem injusta da distribuição: ~110 milhões de usuários verificados da Coinbase antes de gastar um dólar em mídia",
      "Onchain Summer: 700 mil NFTs em 23 dias (Coca-Cola, Atari) e o Buildathon com 7.500 builders e 1.250 projetos",
      "Os números do arco: TVL de ~US$ 50 mi pra ~US$ 5,58 bi (#2 L2), 87,2% da receita de sequencer da Superchain (Messari)",
      "O vácuo do token: dois anos sem TGE como combustível e tensão, com as rachaduras expostas no mesmo nível dos acertos",
    ],
    pages: 19,
    readTime: "18 min",
    tag: "L2 · Marketing / Growth",
    accent: "#2D5BFF",
    pdf: "/papers/vol-04-base.pdf",
    cover: "/papers/cover-vol-04.webp",
    publishedAt: "2026-06-16",
  },
  {
    slug: "pump-fun",
    volume: "Vol. 05",
    title: "Como a Pump.fun virou uma máquina de marketing de memecoin",
    subtitle: "A máquina de marketing das memecoins",
    description:
      "A Pump.fun não fez campanha, não comprou tráfego, não montou time de growth. Ela transformou o próprio ato de lançar um token num produto de marketing: qualquer pessoa, em segundos, por centavos, criando uma memecoin num cassino global aberto 24 horas. Em pouco mais de um ano, isso virou mais de US$ 1 bilhão de receita. Um estudo dos dois lados, jogada por jogada: a distribuição genial e a externalidade brutal.",
    tldr:
      "A Pump.fun não fez campanha, não comprou tráfego e não montou time de growth: ela transformou o próprio ato de lançar um token num produto de marketing, deixando qualquer pessoa criar uma memecoin em segundos, por centavos, num cassino global aberto 24 horas. Em pouco mais de um ano isso virou aproximadamente US$ 1,04 bi de receita acumulada (o 1º app da Solana a passar de US$ 1 bi, DefiLlama), com cerca de 12 milhões de tokens criados, até 70 mil por dia no pico. O estudo destrincha a mecânica de distribuição genial e o outro lado, brutal: só aproximadamente 1% dos tokens sobrevive, 98,6% são rug pull ou fraude (Solidus Labs), o PUMP caiu 82% do topo, e há processo descrevendo um 'cassino não licenciado' com alegação (não julgada) de US$ 4 a 5,5 bi em perdas de varejo. Vale ler porque separa a engenharia de distribuição da ética da externalidade.",
    highlights: [
      "A mecânica de distribuição que fez explodir: ~US$ 1,04 bi de receita acumulada (1º app da Solana a passar de US$ 1 bi, DefiLlama)",
      "A escala do fenômeno: ~12 milhões de tokens criados (~70 mil/dia no pico), 5º maior protocolo cripto por receita em 2025",
      "O teste de estresse honesto: ~1% de sobrevivência, 98,6% rug pull ou fraude (Solidus Labs), PUMP −82% do topo",
      "Os limites éticos: processo descrevendo 'cassino não licenciado' e US$ 4 a 5,5 bi em perdas de varejo (alegação não julgada)",
    ],
    pages: 19,
    readTime: "20 min",
    tag: "Launchpad · Memecoin",
    accent: "#7CF067",
    pdf: "/papers/vol-05-pump-fun.pdf",
    cover: "/papers/cover-vol-05.webp",
    publishedAt: "2026-06-16",
  },
  {
    slug: "playbook-tge-2026",
    volume: "Playbook",
    title: "Como levar um token do zero ao mercado em 2026",
    subtitle: "O TGE moderno sem virar exit liquidity",
    description:
      "O guia completo de quem quer lançar um token em 2026 sem virar exit liquidity. Os 10 capítulos do TGE moderno, com exemplos reais de quem acertou e de quem queimou a própria comunidade: da narrativa e pré-lançamento aos pontos como motor, do airdrop honesto à tokenomics como marketing, da listagem e market maker ao pós-TGE onde retenção vale mais que recompensa.",
    tldr:
      "Guia operacional de quem quer levar um token do zero ao mercado em 2026 sem virar exit liquidity. São 10 capítulos cobrindo o TGE moderno na ordem em que ele acontece de verdade: narrativa e pré-lançamento, sistema de pontos como motor de campanha, airdrop que distribui sem despejar token na cabeça da comunidade, KOL e influência com disclosure, a comunidade como canal de distribuição, tokenomics tratada como marketing, listagem, liquidez e market maker, e o pós-TGE onde retenção vale mais que recompensa. Cada capítulo traz exemplos reais de quem acertou e de quem queimou a própria base. Vale ler como checklist sequencial e causal: serve tanto pra projeto que vai lançar quanto pra quem precisa avaliar se um lançamento foi bem estruturado.",
    highlights: [
      "A anatomia de um TGE em 2026: por que lançar hoje é outro jogo, com glossário e sequência causal",
      "Pontos como motor de lançamento e o airdrop que distribui sem virar exit liquidity",
      "KOL e influência com disclosure, a comunidade que distribui, e tokenomics como marketing",
      "Listagem, liquidez e market maker + o pós-TGE: retenção > recompensa",
    ],
    pages: 20,
    readTime: "25 min",
    tag: "Guia · Lançamento / TGE",
    accent: "#D262B2",
    pdf: "/papers/playbook-tge-2026.pdf",
    cover: "/papers/cover-tge.webp",
    publishedAt: "2026-06-16",
  },
  {
    slug: "playbook-cripto-2026",
    volume: "Playbook",
    title: "Para onde vai o marketing cripto em 2026",
    subtitle: "O guia completo da Kaleidos",
    description:
      "Para onde a atenção, os canais e as métricas do mercado cripto estão indo, e como estruturar seu marketing para o que vem. Um guia de 10 capítulos com tudo que a Kaleidos aprendeu lendo o mercado on-chain: da era da utilidade ao InfoFi, passando por métricas de valor, varejo web3, workflows AI-native e compliance como marca.",
    tldr:
      "O guia da Kaleidos sobre pra onde a atenção, os canais e as métricas do mercado cripto estão indo, e como estruturar seu marketing pro que vem. São 10 capítulos que mapeiam a virada da era da especulação pra era da utilidade: métricas de valor que substituem as de vaidade (CAC, LTV, retenção em vez de seguidores), a ascensão do varejo web3 com stablecoins e RWA puxados por a16z, Mastercard e Standard Chartered, workflows de conteúdo AI-native, GEO e AI-SEO pra ser citado por IA, InfoFi como nova camada de distribuição, e compliance virando ativo de marca. Vale ler como mapa estratégico do setor: não é lista de táticas soltas, é a leitura on-chain de onde o jogo está indo e o que priorizar agora.",
    highlights: [
      "Os 10 capítulos do marketing cripto em 2026 (especulação → utilidade)",
      "Métricas de valor que substituem as de vaidade (CAC, LTV, retenção)",
      "Varejo web3, stablecoins e RWA: a16z, Mastercard, Standard Chartered",
      "Workflows AI-native, GEO/AI-SEO, InfoFi e compliance como marca",
    ],
    pages: 21,
    readTime: "30 min",
    tag: "Guia · Setor",
    accent: "#D262B2",
    pdf: "/papers/playbook-cripto-2026.pdf",
    cover: "/papers/cover-playbook.webp",
    publishedAt: "2026-06-07",
  },
];

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}
