import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew21: BlogPost[] = [
  {
    slug: "developer-grants-como-gtm",
    title: "Developer grants como GTM: fazer terceiros construírem por você",
    seoTitle: "Developer grants como go-to-market em web3",
    excerpt:
      "Programas de grants deixaram de ser filantropia de protocolo e viraram máquina de go-to-market. A Kaleidos explica como chains e protocolos usam grants para multiplicar apps, usuários e narrativa, e como estruturar, comunicar e medir um programa que gera tração de verdade.",
    seoDescription:
      "Como transformar developer grants em estratégia de go-to-market web3: estrutura, comunicação, métricas e casos reais de Uniswap, Optimism e Arbitrum com fontes.",
    category: "cripto",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "",
    tags: [
      "developer grants",
      "go-to-market web3",
      "ecossistema cripto",
      "marketing cripto",
      "growth web3",
      "developer relations",
      "retroactive funding",
      "incentivos de protocolo",
    ],
    tldr:
      "Grants bem desenhados são go-to-market disfarçado: cada time financiado vira um canal de distribuição que traz apps, usuários e narrativa para o ecossistema. O segredo está em tratar o programa como funil (atrair, selecionar, ativar, reter builders), comunicar cada aprovação como conteúdo e medir retenção de desenvolvedores e uso real, não volume de capital distribuído.",
    faq: [
      {
        question: "O que é um programa de developer grants em cripto?",
        answer:
          "É um mecanismo pelo qual uma chain, protocolo ou fundação financia times externos para construírem aplicações, ferramentas e integrações sobre a sua tecnologia. O pagamento costuma ser em token nativo ou stablecoin, condicionado a marcos de entrega, e o objetivo estratégico é expandir o ecossistema sem contratar todos os desenvolvedores internamente.",
      },
      {
        question: "Por que grants funcionam como estratégia de go-to-market?",
        answer:
          "Porque cada projeto financiado traz consigo distribuição própria: usuários, comunidade, conteúdo e integrações. Em vez de o protocolo gastar em mídia para alcançar usuários um a um, ele financia builders que trazem audiências inteiras. Mais apps geram mais casos de uso, mais casos de uso geram mais usuários e mais usuários alimentam a narrativa de ecossistema vivo.",
      },
      {
        question: "Quanto um protocolo deve alocar em um programa de grants?",
        answer:
          "Não existe número mágico, mas o mercado oferece referências públicas: o Uniswap Grants Program começou em 2020 com orçamento aprovado de US$ 750 mil por trimestre, enquanto programas de chains maiores, como o STIP da Arbitrum em 2023, distribuíram dezenas de milhões em token. O ponto de partida certo é o tamanho do gap do ecossistema, não o tamanho do tesouro.",
      },
      {
        question: "Qual a diferença entre grants proativos e retroativos?",
        answer:
          "Grants proativos financiam uma promessa: o time apresenta proposta, recebe capital e entrega marcos. Grants retroativos, popularizados pelo modelo RetroPGF da Optimism a partir de 2021, recompensam impacto já comprovado. O retroativo reduz risco de execução e atrai builders que já entregaram, mas o proativo é melhor para atrair times novos para um ecossistema jovem.",
      },
      {
        question: "Como medir se um programa de grants está dando resultado?",
        answer:
          "Olhando para o que acontece depois do cheque: quantos projetos financiados chegam a mainnet, quantos continuam ativos 6 e 12 meses depois, quanto de usuários, transações e TVL eles trazem para o ecossistema e quantos desenvolvedores permanecem construindo após o fim do grant. Capital distribuído é métrica de esforço, não de resultado.",
      },
    ],
    content: `# Developer grants como GTM: fazer terceiros construírem por você

Existe um jeito caro de crescer um ecossistema cripto: contratar dezenas de desenvolvedores, construir todos os apps internamente e torcer para o mercado aparecer. E existe um jeito inteligente: financiar terceiros para construírem por você, cada um trazendo sua própria audiência, sua própria comunidade e sua própria narrativa.

Essa é a tese que a Kaleidos defende neste artigo: programas de developer grants, quando bem desenhados, não são caridade de protocolo nem linha de despesa de fundação. São estratégia de go-to-market. O grant é o custo de aquisição de um canal de distribuição inteiro, e os melhores ecossistemas do mercado já operam assim há anos.

A lógica é simples de enunciar e difícil de executar: mais apps geram mais casos de uso, mais casos de uso geram mais usuários e mais usuários alimentam a narrativa de que o ecossistema está vivo. Essa narrativa, por sua vez, atrai a próxima leva de builders. Grants são o combustível desse ciclo. O resto deste texto é sobre como estruturar, comunicar e medir esse motor.

## Principais takeaways

- Grants são GTM, não filantropia: cada time financiado é um canal de distribuição que traz usuários, integrações e conteúdo para o ecossistema.
- O programa precisa ser tratado como funil: atrair propostas qualificadas, selecionar com critério público, ativar com suporte real e reter builders depois do cheque.
- Existem dois modelos complementares: grants proativos (financiam promessas) e retroativos (recompensam impacto provado), popularizados pelo RetroPGF da Optimism desde 2021.
- Comunicação é metade do programa: cada aprovação, cada demo e cada milestone é matéria-prima de narrativa, e programas silenciosos desperdiçam o principal retorno.
- A métrica que importa não é capital distribuído, e sim retenção: quantos projetos continuam ativos e quantos desenvolvedores permanecem no ecossistema 6 e 12 meses depois.
- Casos como Uniswap Grants (2020), RetroPGF da Optimism (2021 em diante) e STIP da Arbitrum (2023) mostram acertos e erros documentados publicamente, e dá para aprender com os dois.

## Por que grants são go-to-market, não caridade

Pense no problema central de qualquer chain ou protocolo novo: distribuição. Tecnologia sem aplicação não gera transação, e ecossistema sem aplicação não tem história para contar. O caminho tradicional de marketing (mídia paga, KOLs, eventos) compra atenção alugada: quando a campanha para, a atenção vai embora. Os [growth loops](/blog/growth-loops-cripto-referral-quests) atacam o mesmo problema do lado do usuário; grants atacam do lado do builder.

Um grant compra algo diferente. Quando um protocolo financia um time para construir um app sobre sua infraestrutura, ele adquire de uma vez só:

- **Um caso de uso novo**, que expande o que é possível fazer no ecossistema;
- **A audiência do builder**, que passa a interagir com a chain para usar o app;
- **Conteúdo orgânico**, porque o time financiado anuncia, documenta e promove o próprio produto;
- **Prova social para o próximo builder**, que vê capital fluindo e decide construir ali também.

É por isso que os relatórios anuais da Electric Capital (Developer Report, 2024) são acompanhados como indicador de saúde de ecossistema: número de desenvolvedores ativos é leading indicator de tudo o mais. Onde os devs constroem hoje, os usuários transacionam amanhã e a liquidez chega depois. Grants são a ferramenta mais direta que um protocolo tem para mover esse indicador.

A Ethereum Foundation entendeu isso cedo: seu Ecosystem Support Program formalizou em 2018 o financiamento de times externos, de infraestrutura a ferramentas de desenvolvedor, e boa parte do stack que sustenta o Ethereum hoje passou por algum grant da fundação (Ethereum Foundation, 2018). Não foi caridade. Foi construção de fosso competitivo com capital.

## Os dois modelos: proativo e retroativo

Antes de estruturar um programa, vale entender os dois desenhos dominantes do mercado.

**Grants proativos** financiam uma promessa. O time apresenta proposta, um comitê avalia, o capital é liberado em tranches atreladas a marcos de entrega. É o modelo clássico do Uniswap Grants Program, aprovado pela governança em dezembro de 2020 com orçamento inicial de US$ 750 mil por trimestre (Uniswap Governance, 2020), e de programas como o Aave Grants DAO, criado em 2021 pela comunidade Aave para financiar builders do ecossistema (Aave Governance, 2021).

**Grants retroativos** invertem a lógica: recompensam impacto já comprovado. O modelo foi articulado pela Optimism com o conceito de Retroactive Public Goods Funding, apresentado em 2021 em conjunto com Vitalik Buterin sob a tese de que é mais fácil julgar o que foi útil do que prever o que será útil (Optimism, 2021). As rodadas cresceram de forma agressiva: a terceira rodada do RetroPGF, concluída no início de 2024, distribuiu 30 milhões de tokens OP entre centenas de projetos e contribuidores (Optimism Collective, 2024).

Do ponto de vista de GTM, os dois modelos cumprem papéis diferentes. O proativo é ferramenta de atração: traz times novos para um ecossistema que ainda precisa provar valor. O retroativo é ferramenta de retenção e sinalização: comunica ao mercado que quem gera impacto ali é recompensado, mesmo sem pedir. Ecossistemas maduros tendem a combinar os dois.

## Como estruturar um programa que gera tração

A Kaleidos enxerga um programa de grants como um funil de quatro etapas. Se qualquer uma delas falha, o dinheiro vira despesa em vez de investimento.

### 1. Atrair as propostas certas

Programa de grants sem tese é caixa de sugestões cara. Antes de abrir inscrições, o protocolo precisa responder: quais lacunas do ecossistema queremos preencher? Faltam wallets? Ferramentas de dados? Apps de consumo? Integrações com stablecoins?

A prática recomendada é publicar RFPs (requests for proposals) explícitas, como a Ethereum Foundation faz em seu programa de suporte, listando áreas prioritárias e o tipo de projeto que quer financiar (Ethereum Foundation, 2018). Isso filtra propostas genéricas e atrai times que resolvem problemas reais do ecossistema.

### 2. Selecionar com critério público

Transparência no processo de seleção não é virtude moral, é marketing. Critérios públicos, comitês identificados e justificativas de aprovação e rejeição fazem o programa parecer sério, e programa sério atrai builder sério. O contraexemplo mais citado do mercado foi o STIP da Arbitrum em 2023: a DAO aprovou cerca de 50 milhões de ARB em incentivos de curto prazo, e análises posteriores da própria comunidade e de pesquisadores como a Blockworks Research apontaram que boa parte do volume incentivado não se sustentou após o fim do programa (Blockworks Research, 2024). A lição não é que incentivo não funciona, e sim que incentivo sem critério de permanência compra métrica temporária, o mesmo padrão dos airdrops que dumpam no claim, como mostra o nosso [pós-mortem de airdrops](/blog/airdrop-pos-mortem-evitar-dump).

### 3. Ativar com suporte além do cheque

O grant é o começo da relação, não o fim. Times financiados precisam de acesso técnico (documentação, suporte de engenharia, auditoria), acesso a distribuição (co-marketing, destaque nos canais oficiais, apresentação a parceiros) e acesso a capital seguinte (introdução a fundos e programas de aceleração). Programas como o Base Builder Grants, lançado pela Coinbase em 2023 com grants pequenos e rápidos em ETH, entenderam que velocidade e proximidade valem mais que valores altos: o builder pequeno quer destravar o projeto, não preencher formulário por seis meses (Base, 2023).

### 4. Reter depois do marco final

A pergunta que separa programas bons de ruins: o que acontece com o time depois da última tranche? Se a resposta é "nada", o programa está vazando valor. Mecanismos de retenção incluem grants de continuidade, elegibilidade automática para rodadas retroativas, participação em receita do protocolo e caminho claro para investimento de fundos do ecossistema.

## Comunicação: o grant é o conteúdo

Aqui entra o ângulo que quase todo protocolo negligencia e que a Kaleidos considera metade do valor do programa: um grant que ninguém vê não gera narrativa, e narrativa é justamente o retorno mais escalável do investimento.

Cada etapa do funil produz matéria-prima de comunicação:

- **Abertura de rodada** é campanha: tese, valores, prazos e RFPs viram thread, post e conversa com KOLs de nicho dev.
- **Cada aprovação** é anúncio duplo: o protocolo apresenta o time ao seu público e o time apresenta o protocolo ao dele. Esse cruzamento de audiências é o mecanismo de distribuição do GTM.
- **Cada milestone entregue** é prova de progresso: demo, vídeo curto, artigo técnico.
- **Cada rodada encerrada** é relatório: quanto foi distribuído, para quem, com que resultado. A Optimism transformou seus relatórios de RetroPGF em evento recorrente da comunidade, com dashboards públicos e debate aberto sobre o que melhorar entre rodadas (Optimism Collective, 2024). Governança como conteúdo é tema do nosso guia de [DAO marketing](/blog/dao-marketing-crescer-reter).

O padrão a copiar é esse: o programa de grants como pauta permanente, não como comunicado trimestral. Ecossistema que comunica builders financiados constantemente parece vivo, e parecer vivo atrai o próximo builder antes mesmo do capital.

## Como medir: retenção, não distribuição

"Distribuímos US$ 10 milhões em grants" é métrica de esforço. As métricas de resultado que um programa sério acompanha são outras:

- **Taxa de entrega**: percentual de projetos financiados que chegam a mainnet ou lançamento público;
- **Retenção de projeto**: quantos continuam ativos 6 e 12 meses após a última tranche;
- **Retenção de desenvolvedor**: quantos devs dos times financiados seguem commitando no ecossistema, na linha do que a Electric Capital mede em seu Developer Report anual (Electric Capital, 2024);
- **Tração trazida**: usuários ativos, transações e TVL originados pelos projetos financiados, comparados com o custo do grant;
- **Custo por builder retido**: o CAC do programa, que permite comparar grants com qualquer outro canal de aquisição.

Esse último ponto é a virada de chave mental: quando o programa é medido como canal de GTM, ele passa a competir por orçamento com mídia, eventos e parcerias, e frequentemente vence, porque o ativo que ele compra (builder retido construindo em cima do protocolo) continua gerando valor muito depois do fim da campanha.

## Erros que transformam grants em despesa

Para fechar o diagnóstico, os padrões de falha que aparecem repetidamente no mercado:

1. **Financiar mercenários de incentivo**: times que migram de chain em chain atrás do próximo grant e desaparecem com ele, padrão amplamente discutido nas análises pós-STIP da Arbitrum (Blockworks Research, 2024);
2. **Processo lento e opaco**: builder bom tem alternativas, e seis meses de comitê significam perder o time para o ecossistema vizinho;
3. **Grant sem suporte**: cheque sem documentação, sem acesso técnico e sem co-marketing produz projetos órfãos;
4. **Zero comunicação**: programa que não conta suas histórias desperdiça o retorno de narrativa, que é o mais barato de capturar;
5. **Medir volume, não permanência**: celebrar capital distribuído em vez de builders retidos incentiva o programa a gastar mais, não a gastar melhor.

## Conclusão: o ecossistema é o produto, grants são a distribuição

A tese final é direta: em web3, o ecossistema é o produto, e developer grants são um dos poucos canais de distribuição em que o capital investido vira ativo permanente em vez de atenção alugada. Uniswap provou o modelo proativo em 2020, a Optimism institucionalizou o retroativo a partir de 2021 e a Arbitrum deixou documentado, em 2023, o que acontece quando incentivo vem sem critério de permanência. O playbook está público. O diferencial está na execução: tese clara, seleção transparente, suporte real, comunicação constante e métrica de retenção.

Se o seu protocolo, chain ou fundação está desenhando um programa de grants ou quer transformar um programa existente em motor de go-to-market de verdade, a Kaleidos pode ajudar: somos uma agência especializada em marketing para cripto e web3, e trabalhamos exatamente nessa interseção entre ecossistema, narrativa e crescimento. [Fale com a Kaleidos](/contato) e vamos estruturar a distribuição do seu ecossistema juntos.`,
  },
];
