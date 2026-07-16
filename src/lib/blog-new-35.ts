import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew35: BlogPost[] = [
  {
    slug: "melhores-market-makers-cripto-2026",
    title: "Market makers de cripto em 2026: o que são, como escolher e a ligação com marketing",
    seoTitle: "Market makers de cripto: como escolher em 2026",
    excerpt:
      "Todo TGE depende de dois motores: liquidez e atenção. A Kaleidos explica o que faz um market maker de cripto, a diferença entre loan e retainer, as red flags que destroem projetos e por que MM e marketing precisam trabalhar juntos no lançamento.",
    seoDescription:
      "Guia da Kaleidos: o que fazem os market makers de cripto em 2026, loan vs retainer, red flags de contrato e como liquidez e marketing se conectam no TGE.",
    category: "cripto",
    author: AUTHOR,
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "",
    tags: [
      "market maker cripto",
      "liquidez",
      "TGE",
      "lançamento de token",
      "tokenomics",
      "loan vs retainer",
      "marketing cripto",
      "exchanges",
    ],
    tldr:
      "Market maker garante ordens de compra e venda com spread saudável no seu token. Os modelos dominantes são loan (empréstimo com call option) e retainer (taxa mensal). Red flags: promessa de preço, contratos opacos, strike baixo demais. Liquidez e marketing precisam do mesmo calendário no TGE.",
    faq: [
      {
        question: "O que faz um market maker de criptomoedas?",
        answer:
          "Um market maker coloca ordens de compra e venda simultâneas no livro de ofertas do seu token, garantindo que sempre exista contraparte para quem quer negociar. Isso reduz o spread, diminui a volatilidade artificial de livros vazios e é exigência prática de muitas exchanges para listagem. Ele não existe para subir o preço do token, e sim para tornar o mercado funcional.",
      },
      {
        question: "Qual a diferença entre o modelo loan e o modelo retainer?",
        answer:
          "No modelo loan, o projeto empresta tokens ao market maker, que opera com eles e devolve no fim do contrato, geralmente com uma call option que permite comprar os tokens a um preço pré-definido. No modelo retainer, o projeto paga uma taxa mensal fixa e fornece o capital, mantendo a propriedade dos tokens e maior transparência. Loan custa menos caixa no curto prazo; retainer alinha melhor os incentivos.",
      },
      {
        question: "Market maker consegue garantir que o preço do token vai subir?",
        answer:
          "Não, e qualquer um que prometa isso deve ser descartado na hora. Sustentar ou inflar preço artificialmente é manipulação de mercado, prática que reguladores como a SEC já processaram em casos envolvendo empresas contratadas para simular volume. O papel legítimo do MM é prover liquidez e spread saudável, nunca performance de preço.",
      },
      {
        question: "Quanto custa contratar um market maker em 2026?",
        answer:
          "Depende do modelo e do porte. Retainers de mercado costumam partir de alguns milhares de dólares mensais para tokens menores e crescem com o número de exchanges e pares cobertos. No modelo loan, o custo aparente é zero, mas o custo real está na call option: se o strike for baixo demais, o projeto entrega upside enorme ao MM. Sempre modele o custo da opção antes de assinar.",
      },
      {
        question: "Por que marketing e market making precisam ser planejados juntos no TGE?",
        answer:
          "Porque liquidez e atenção são os dois lados do mesmo lançamento. Se o marketing gera demanda e o livro está raso, o preço dispara e desaba, queimando a comunidade. Se a liquidez está pronta mas ninguém conhece o projeto, o MM fica operando um livro morto. O calendário de campanha, os unlocks e a profundidade do livro precisam estar sincronizados desde o planejamento do TGE.",
      },
    ],
    content: `# Market makers de cripto em 2026: o que são, como escolher e a ligação com marketing

Todo fundador que se aproxima de um TGE descobre, geralmente tarde demais, que lançar um token exige dois motores rodando ao mesmo tempo: atenção e liquidez. O marketing traz gente para comprar. O market maker garante que exista um mercado funcional quando essa gente chegar.

A Kaleidos trabalha no lado da atenção, mas passamos anos vendo lançamentos serem definidos (ou destruídos) pelo lado da liquidez. Este guia explica o que um market maker realmente faz, como os contratos funcionam em 2026, quais red flags eliminam um candidato na hora e por que tratar MM e marketing como assuntos separados é um dos erros mais caros de um lançamento.

## Principais takeaways

- Market maker existe para prover liquidez e spread saudável, não para subir preço. Quem promete preço está oferecendo manipulação.
- Os dois modelos dominantes seguem sendo **loan + call option** (barato no caixa, caro no upside) e **retainer** (custo mensal fixo, incentivos mais alinhados).
- As red flags mais graves: promessa de performance de preço, ausência de relatórios de KPIs, call options com strike muito abaixo do preço de lançamento e recusa em detalhar em quais exchanges e pares vão operar.
- Liquidez sem demanda é livro vazio. Demanda sem liquidez é pump and dump involuntário. Os dois planos precisam do mesmo calendário.
- Nomes públicos e estabelecidos do setor incluem Wintermute, GSR, Flowdesk, Keyrock e Cumberland, todos com presença institucional documentada. Isso não substitui due diligence: verifique referências diretamente com outros projetos atendidos.

## O que um market maker faz, na prática

Um market maker (MM) é uma empresa de trading que coloca ordens de compra e venda simultâneas no livro de ofertas de um token, em uma ou várias exchanges. O objetivo é que sempre exista contraparte disponível: quem quer comprar encontra vendedor, quem quer vender encontra comprador, e a diferença entre o melhor preço de compra e o melhor de venda (o spread) permanece estreita.

Para um projeto em lançamento, isso resolve três problemas concretos:

1. **Listagem**: muitas exchanges centralizadas exigem, formal ou informalmente, que o token chegue com um MM contratado. Livro vazio é risco reputacional para a exchange.
2. **Experiência de trade**: sem MM, uma ordem de mercado de tamanho médio pode mover o preço em dois dígitos percentuais. Isso espanta traders e mata volume orgânico.
3. **Estabilidade percebida**: spread largo e candles erráticos sinalizam projeto amador. Liquidez consistente é parte da credibilidade.

O que o MM **não** faz: garantir que o preço suba, defender um piso de preço para sempre, ou criar demanda real. Volume de MM é infraestrutura, não tração. Confundir os dois é a origem de metade das frustrações pós-TGE.

## Os dois modelos de contrato: loan vs retainer

Em 2026, praticamente todo contrato de market making para tokens novos cai em uma de duas estruturas, ou em híbridos delas.

### Modelo loan (empréstimo de tokens + call option)

O projeto empresta uma quantidade de tokens ao MM (algo entre 0,5% e 2% do supply é faixa comum em contratos do setor, variando por projeto). O MM usa esses tokens para operar os dois lados do livro. No fim do contrato, geralmente de 12 a 24 meses, o MM devolve os tokens **ou** exerce uma call option: o direito de comprar aqueles tokens a um preço de exercício (strike) definido no contrato.

**Vantagens**: não consome caixa do projeto no curto prazo, o que é atraente para times que gastaram o funding em produto. O MM assume o trabalho com capital próprio em stablecoin do outro lado.

**Riscos**: o custo real está escondido na opção. Se o strike é muito baixo em relação ao preço de lançamento, o MM tem incentivo econômico em cenários que não são os do projeto, e o projeto entrega uma fatia relevante do upside. Um contrato loan mal negociado pode custar muito mais do que dois anos de retainer.

### Modelo retainer (taxa mensal fixa)

O projeto paga uma mensalidade e fornece o capital de trabalho (tokens e stablecoins), que permanece de sua propriedade, muitas vezes em contas segregadas com acesso via API apenas para operar. O MM cobra pelo serviço, com KPIs contratuais: spread máximo, profundidade mínima de livro a X% do mid price, uptime de cotação.

**Vantagens**: transparência e alinhamento. O MM não tem posição direcional no seu token, então não lucra com movimentos de preço, e sim com a prestação do serviço. Relatórios de KPIs são o padrão nesse modelo.

**Riscos**: consome caixa mensal e exige que o projeto tenha tesouraria para o capital de trabalho. Para tokens muito pequenos, o custo fixo pode pesar.

**Regra prática da Kaleidos ao avaliar com clientes**: se o projeto tem caixa, retainer com KPIs claros costuma ser a estrutura com menos surpresas. Se optar por loan, o strike da call e o tamanho do empréstimo merecem tanto cuidado quanto o valuation da rodada de investimento.

## Red flags que eliminam um market maker na hora

O setor tem players sérios e tem oportunistas. A diferença aparece nos detalhes do contrato e na conversa comercial.

- **Promessa de preço ou de "suporte" a um nível de preço**. Isso é manipulação de mercado. A SEC americana já processou empresas contratadas para simular volume e atividade de mercado em tokens, e projetos que participaram desses esquemas responderam junto. Se a proposta comercial fala em "defender o preço" ou "garantir X% de valorização", encerre a conversa.
- **Volume garantido como métrica principal**. Volume fabricado por wash trading infla dashboards e destrói credibilidade quando descoberto. As métricas legítimas são spread, profundidade e uptime, não volume.
- **Opacidade operacional**. MM sério informa em quais exchanges vai operar, quais pares, com que profundidade alvo e entrega relatório periódico. Quem não aceita cláusula de reporting não deve tocar no seu supply.
- **Call option com strike descolado da realidade**. No modelo loan, peça para modelar o payoff da opção em três cenários de preço. Se o MM resiste a essa conversa, o desalinhamento é a resposta.
- **Ausência de referências verificáveis**. Peça contatos de outros projetos atendidos e fale com eles. Nomes estabelecidos e públicos no setor, como Wintermute, GSR, Flowdesk, Keyrock e Cumberland, têm histórico institucional que pode ser pesquisado. Isso não é endosso automático de nenhum deles: é o lembrete de que reputação verificável é o ponto de partida, não o de chegada.
- **Custódia sem segregação**. Depois dos colapsos de 2022, entregar tokens para conta onipotente de terceiro sem segregação nem trilha de auditoria é risco que nenhum projeto deveria aceitar.

## Como escolher: um processo em cinco passos

1. **Defina o objetivo de liquidez antes de pedir proposta.** Quantas exchanges no dia um? Que profundidade de livro o seu tipo de comprador exige? Um token de DeFi com traders ativos precisa de mais profundidade que um token de governança de nicho.
2. **Peça propostas nos dois modelos.** Comparar loan e retainer lado a lado revela o custo implícito da opção e força clareza.
3. **Negocie KPIs contratuais.** Spread máximo por par, profundidade mínima a 1% e 2% do mid price, uptime de cotação, frequência de relatório. Sem KPI escrito, não há serviço, há esperança.
4. **Cheque referências e histórico regulatório.** Converse com pelo menos dois projetos atendidos. Pesquise se a empresa ou seus executivos aparecem em ações de enforcement.
5. **Sincronize com o plano de marketing.** O MM precisa saber quando as campanhas, listagens e unlocks acontecem. É aqui que a maioria dos projetos falha, e é o assunto da próxima seção.

## A ligação com marketing: liquidez e atenção são o mesmo lançamento

Aqui está a parte que quase nenhum guia de market making menciona, e que a Kaleidos vê de perto em todo TGE que acompanha.

Um lançamento de token é um encontro marcado entre oferta e demanda. O market maker organiza a oferta: livro com profundidade, spread civilizado, ordens dos dois lados. O marketing constrói a demanda: narrativa, comunidade, KOLs, conteúdo e [mídia paga que converte](/blog/advertising-cripto-que-converte), presença nas conversas certas nas semanas que antecedem o TGE.

Quando os dois planos não conversam, os modos de falha são previsíveis:

- **Atenção sem liquidez**: a campanha funciona, milhares de pessoas chegam no dia da listagem, o livro é raso, o preço dispara 300% em horas e desaba em seguida. O gráfico fica feio para sempre, a comunidade se sente traída e nenhum influenciador quer associar o nome ao projeto depois. O marketing pagou para criar o próprio desastre.
- **Liquidez sem atenção**: o MM cota o dia inteiro em um livro onde ninguém aparece. O projeto paga por infraestrutura de mercado para um mercado que não existe. Volume mínimo, ranking irrelevante nas exchanges, e a listagem que custou caro não gera nada.
- **Calendários dessincronizados**: a campanha de pico acontece duas semanas antes de um unlock relevante, ou o esforço de mídia termina exatamente quando a liquidez está no ponto ideal para receber demanda. Timing errado desperdiça os dois orçamentos.

O cenário saudável é o inverso: o time de marketing sabe qual profundidade de livro existe e calibra a agressividade da campanha para a demanda que o mercado consegue absorver sem distorção. O MM sabe quando vêm as ondas de atenção e ajusta profundidade e presença nas exchanges para esses momentos. Unlocks, listagens adicionais e campanhas entram no mesmo calendário, revisado pelas duas pontas. O [teardown do points system do Lombard](/blog/teardown-lombard-points-system) mostra na prática o que um unlock pesado faz com o preço mesmo quando a retenção de capital funciona.

Na prática, isso significa colocar o market maker e a agência de marketing na mesma reunião de planejamento do TGE, pelo menos oito semanas antes da listagem. Parece óbvio. Quase ninguém faz.

## O que muda em 2026

Três movimentos definem o cenário atual:

- **Mais escrutínio, menos promessa**. Depois dos casos de wash trading processados por reguladores e do colapso de players que misturavam market making com trading proprietário direcional, os projetos aprenderam a perguntar sobre segregação de funções e custódia. Os MMs sérios responderam com mais transparência contratual, e isso virou critério de seleção.
- **Liquidez multi-venue como padrão**. Com a fragmentação entre exchanges centralizadas, DEXs e agregadores, o trabalho do MM deixou de ser "cotar em uma exchange" e passou a ser orquestrar profundidade em vários lugares ao mesmo tempo, incluindo pools on-chain.
- **Dados de liquidez como insumo de marketing**. Times maduros usam os relatórios do MM (profundidade, origem do fluxo, comportamento pós-campanha) para medir se a demanda gerada pelo marketing é orgânica e recorrente ou puramente especulativa. O relatório do MM virou ferramenta de atribuição.

## Conclusão: dois motores, um lançamento

Market maker não é acessório de listagem nem botão de subir preço. É a infraestrutura que permite que a atenção conquistada pelo marketing se converta em um mercado funcional, em vez de um gráfico de pump and dump.

Se o seu projeto está a caminho de um TGE, trate as duas contratações como um sistema único: escolha o MM com KPIs contratuais e incentivos alinhados, escolha o parceiro de marketing que entende como liquidez e narrativa se retroalimentam, e coloque os dois no mesmo calendário desde o início (e, antes disso, veja como [estruturar o time de BD e growth](/blog/estruturar-time-bd-growth-cripto) que vai operar tudo).

A Kaleidos é uma agência de marketing especializada em cripto e web3. Ajudamos projetos a construir narrativa, comunidade e demanda real antes, durante e depois do TGE, em sincronia com a estratégia de liquidez. Se você está planejando um lançamento de token, [fale com a gente](/contato) e vamos desenhar juntos o lado da atenção do seu lançamento.`,
  },
];
