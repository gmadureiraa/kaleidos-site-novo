import type { BlogPost } from "./blog-shared";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogSetGtmFintech: BlogPost[] = [
  {
    slug: "alchemy-gtm-infra-cripto-sem-token",
    title: "Estudo Alchemy: como uma infra cripto vende sem token",
    seoTitle: "Estudo Alchemy: GTM de infra cripto sem token",
    excerpt:
      "A Alchemy vende infraestrutura de blockchain como SaaS: plano gratuito medido em compute units, cobrança por consumo e dois CTAs no topo da home. A Kaleidos desmonta o go-to-market de uma infra que cresce sem token, e marca onde a análise é leitura e onde é fato público.",
    seoDescription:
      "Como a Alchemy vende infra web3 sem token: plano gratuito de 30M CU, cobrança por consumo e product-led somado a sales-led. O que dá pra copiar desse GTM.",
    category: "cases",
    author: AUTHOR,
    publishedAt: "2026-08-21",
    readTime: 9,
    featured: false,
    coverImage: "/blog/alchemy-gtm-infra-cripto-sem-token/cover.png",
    tags: [
      "Alchemy",
      "go-to-market",
      "infraestrutura web3",
      "product-led growth",
      "a16z crypto",
      "SaaS cripto",
      "marketing B2B",
    ],
    tldr:
      "A Alchemy ocupa o quadrante centralizado e sem token da matriz de go-to-market da a16z: vende nodes-as-a-service por assinatura, com plano gratuito de 30 milhões de compute units por mês e cobrança por consumo a partir de US$ 0,45 por 1 milhão de CU. Product-led e sales-led convivem no mesmo cabeçalho, e a prova social é logo de cliente, não preço de token.",
    faq: [
      {
        question: "Por que a Alchemy não tem token?",
        answer:
          "Porque o cliente dela é um time de engenharia comprando infraestrutura de produção, não um usuário buscando incentivo. A a16z classifica a Alchemy no quadrante centralizado e sem token da matriz de go-to-market em web3, com modelo de nodes-as-a-service por assinatura ([a16z crypto](https://a16zcrypto.com/posts/article/go-to-market-in-web3/)).",
      },
      {
        question: "Como funciona o plano gratuito da Alchemy?",
        answer:
          "O plano Free entrega 30 milhões de compute units por mês, 25 requisições por segundo, 5 apps e 5 webhooks, com acesso a todas as mainnets e testnets, sem cartão de crédito na entrada ([Alchemy Pricing](https://www.alchemy.com/pricing)).",
      },
      {
        question: "Quanto custa a Alchemy depois do plano gratuito?",
        answer:
          "No plano de uso, US$ 0,45 por 1 milhão de compute units nos primeiros 300 milhões de CU do mês e US$ 0,40 por 1 milhão de CU acima disso, com mínimo de 300 requisições por segundo. O plano enterprise parte de 1.000 requisições por segundo e tem preço sob consulta, com SLA assinado ([Alchemy Pricing](https://www.alchemy.com/pricing)).",
      },
      {
        question: "Dá pra usar esse modelo num projeto cripto pequeno?",
        answer:
          "Os quatro movimentos replicáveis não dependem de escala: cobrar por consumo real em vez de assento, tratar a documentação como página de vendas, deixar visíveis as duas portas (autoatendimento e comercial) e escolher prova que envelhece bem. O que não se copia é a lista de logos, que é resultado de anos de operação sem falha grave, não de campanha.",
      },
    ],
    content: `# Estudo Alchemy: como uma infra cripto vende sem token

Hoje, na home da Alchemy, existem dois botões lado a lado: "Get your API key" e "Talk to sales" ([Alchemy](https://www.alchemy.com/)). Não há preço de token, não há painel de APY, não há contagem regressiva de airdrop. Uma das maiores empresas de infraestrutura de blockchain do mundo vende do jeito que a Datadog e a Twilio vendem: cadastro gratuito de um lado, time comercial do outro.

## Principais takeaways

- A Alchemy é o exemplo que a a16z usa para o quadrante "centralizado e sem token" da matriz de go-to-market em web3, operando como SaaS de nodes-as-a-service com assinatura por volume ([a16z crypto](https://a16zcrypto.com/posts/article/go-to-market-in-web3/)).
- A porta de entrada é gratuita e medida: 30 milhões de compute units por mês, 25 requisições por segundo, 5 apps ([Alchemy Pricing](https://www.alchemy.com/pricing)).
- O plano de uso paga US$ 0,45 por 1 milhão de CU até 300 milhões de CU mensais, e US$ 0,40 acima disso ([Alchemy Pricing](https://www.alchemy.com/pricing)).
- Prova social ali é logo de cliente e uptime contratado, não gráfico de preço.
- A leitura da Kaleidos: infra web3 que vende para engenheiro compra confiança técnica antes de comprar narrativa, e token nesse contexto costuma atrapalhar mais do que ajudar.

## O quadrante em que a Alchemy joga

A matriz de go-to-market da a16z crypto separa projetos por dois eixos: quão centralizada é a organização e se existe ou não um token no meio da relação com o usuário. No cruzamento "centralizado, sem token" ficam SaaS e marketplaces, e o exemplo citado é a Alchemy, descrita como uma plataforma que "fornece nodes-as-a-service" com tiers de assinatura baseados em armazenamento, dedicação e volume de requisições. A estratégia é apontada como uma combinação de product-led (freemium) e channel-led ([a16z crypto](https://a16zcrypto.com/posts/article/go-to-market-in-web3/)).

Isso importa porque a discussão de marketing cripto quase sempre começa no lugar errado. A pergunta padrão é "qual a mecânica do incentivo", e o pressuposto escondido é que todo projeto de web3 precisa de um ativo para distribuir. A matriz da a16z desmonta esse pressuposto: quando o cliente é uma empresa que vai colocar sua aplicação em produção, o incentivo relevante não é token, é previsibilidade.

Quem vende infraestrutura não está disputando atenção de trader. Está disputando a decisão de um time de engenharia que precisa justificar internamente por que essa dependência não vai derrubar o produto às três da manhã.

## A porta de entrada é gratuita, e é medida

O plano gratuito da Alchemy entrega 30 milhões de compute units por mês, 25 requisições por segundo, 5 apps e 5 webhooks, com acesso a todas as mainnets e testnets ([Alchemy Pricing](https://www.alchemy.com/pricing)). Não há trial de 14 dias, não há cartão de crédito na frente, não há reunião obrigatória.

Repare no que a unidade de cobrança faz com a conversa comercial. A Alchemy não cobra por usuário nem por assento: cobra por compute unit, onde uma chamada JSON-RPC simples pode consumir 10 CU e operações mais complexas passam de 100 CU, com média observada de 27 CU por requisição ([Alchemy Pricing](https://www.alchemy.com/pricing)). O preço acompanha o uso real da aplicação do cliente.

O efeito prático é que o custo do cliente cresce junto com o sucesso dele. Um desenvolvedor que está testando uma ideia num fim de semana nunca vê uma fatura. Quando o produto dele pega, a conta sobe, e ela sobe porque tem gente usando. Poucas conversas de renovação são mais fáceis do que essa.

Acima do gratuito, o plano de uso cobra US$ 0,45 por 1 milhão de CU nos primeiros 300 milhões de CU do mês e US$ 0,40 por 1 milhão de CU depois disso, com mínimo de 300 requisições por segundo, 30 apps e 100 webhooks, sem compromisso antecipado ([Alchemy Pricing](https://www.alchemy.com/pricing)). No topo, o plano enterprise parte de 1.000 requisições por segundo, 200 apps, preço sob consulta, SLA assinado e suporte dedicado ([Alchemy Pricing](https://www.alchemy.com/pricing)).

Três degraus, e cada um resolve um problema diferente: o primeiro remove o atrito de experimentar, o segundo remove o atrito de crescer, o terceiro remove o medo de depender.

## Os dois botões dizem tudo sobre a operação

Voltando ao topo da página. "Get your API key" e "Talk to sales" convivendo no mesmo cabeçalho, com o gratuito reforçado no rodapé como "Get started for free" ([Alchemy](https://www.alchemy.com/)), não é indecisão de design. É a admissão de que existem dois compradores.

O primeiro é o desenvolvedor individual, que decide sozinho, testa em minutos e não fala com ninguém. O segundo é a empresa que precisa de contrato, de SLA e de alguém do outro lado do telefone. Um funil não atende os dois. Product-led sozinho trava quando o negócio precisa de garantia jurídica; sales-led sozinho é caro demais para atender quem ainda está brincando com uma ideia.

O ponto que quase todo projeto de infra erra é achar que precisa escolher. Não precisa. Precisa é deixar claro qual porta serve para quem, e não obrigar o desenvolvedor a passar pelo time comercial para ver o produto funcionar.

Vale uma pergunta honesta para quem está montando um GTM de infraestrutura agora: quanto tempo leva, no seu produto, entre alguém decidir testar e ver a primeira resposta da sua API? Se a resposta envolve preencher formulário e esperar retorno, o modelo é sales-led, e o custo de aquisição vai refletir isso.

## A prova social é logo de cliente, não preço de token

A home lista nomes como Visa, Circle, Stripe, Robinhood, Polymarket, Uniswap, OpenSea e Chainlink ([Alchemy](https://www.alchemy.com/)). É o formato clássico de prova em B2B: se essas empresas confiaram a operação delas a essa camada, o risco percebido de você confiar cai.

Repare no que substitui o quê. Num projeto com token, a prova social costuma ser preço, TVL e número de holders, e todas essas métricas são voláteis, o que significa que a prova de hoje pode virar o constrangimento do trimestre que vem. Logo de cliente e uptime contratado envelhecem melhor.

## Onde a leitura precisa de asterisco

A própria Alchemy destaca na home números como suporte a mais de 100 blockchains, 99,99% de uptime e mais de US$ 1 trilhão em transações por ano ([Alchemy](https://www.alchemy.com/)). São afirmações da empresa sobre a própria operação, publicadas em material de marketing, não auditoria independente. Elas contam como posicionamento, e o posicionamento é justamente o objeto deste estudo, mas não devem ser lidas como fato verificado por terceiro.

O mesmo asterisco vale para o resto da análise. O que está documentado publicamente é a estrutura de preço, a arquitetura de planos, os dois CTAs e o enquadramento que a a16z faz do modelo. A interpretação de por que isso funciona é leitura da Kaleidos a partir dessas peças públicas, não relato de dentro da empresa.

## O que dá pra copiar de um projeto de infraestrutura

Quatro movimentos são replicáveis por qualquer projeto que venda ferramenta para quem constrói, com ou sem token no roadmap.

**Primeiro: fazer a unidade de cobrança acompanhar o valor entregue.** Cobrar por consumo real, e não por assento, alinha a fatura ao sucesso do cliente e remove a negociação anual sobre quantas licenças ficam paradas.

**Segundo: tratar documentação como página de vendas.** Em produto técnico, quem decide lê a doc antes de ler a landing. Doc confusa é objeção comercial disfarçada de problema de conteúdo.

**Terceiro: separar as duas portas sem escondê-las.** O gratuito não pode ser um labirinto até o formulário, e o enterprise não pode ser um segredo que só aparece depois do limite estourar.

**Quarto: escolher a prova que envelhece bem.** Estudo de caso com número de cliente real, status page pública e histórico de incidentes sustentam mais confiança do que qualquer campanha de lançamento.

E um movimento que não se copia: a lista de logos. Ela é resultado de anos de operação sem falha grave, não de campanha. Projeto novo que tenta simular esse tipo de prova antes de tê-la acaba com uma página de clientes cheia de parceria vaga, o que produz o efeito contrário.

## Uma observação de método

Uma última observação de método. Este estudo olha estrutura de oferta e mensagem pública, que é o que qualquer concorrente também consegue observar. Números internos de receita, retenção e custo de aquisição da Alchemy não são públicos, e por isso não aparecem aqui.

A Kaleidos trabalha go-to-market de projetos cripto e fintech com esse mesmo critério: o que dá pra provar entra, o resto vira hipótese declarada. Se você está desenhando o GTM de uma infra e não sabe se o caminho é product-led, sales-led ou os dois, [fale com a Kaleidos](/contato). Há mais análises de estratégia na [seção de growth](/blog/categoria/growth) do blog.
`,
  },
  {
    slug: "fintech-inbound-marketing-crescimento-organico",
    title: "Inbound marketing para fintech: como montar crescimento orgânico consistente",
    seoTitle: "Inbound marketing para fintech: o guia da máquina",
    excerpt:
      "Inbound em fintech não é publicar no blog. É uma máquina de quatro estágios: capturar a busca que antecede a decisão, converter sem prometer rendimento, nutrir um ciclo longo por papel de decisor e ativar quem abriu conta. A Kaleidos detalha o desenho e as três métricas que sustentam o investimento.",
    seoDescription:
      "Como montar inbound em fintech: mapa de conteúdo em três camadas, lead magnet sem promessa de rendimento, nutrição por papel de decisor e métricas de pipeline.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-08-21",
    readTime: 8,
    featured: false,
    coverImage: "/blog/fintech-inbound-marketing-crescimento-organico/cover.png",
    tags: [
      "inbound marketing",
      "fintech",
      "SEO",
      "lead magnet",
      "nutrição de leads",
      "pipeline",
      "marketing B2B",
    ],
    tldr:
      "Inbound em fintech é a máquina inteira, não o blog: mapa de conteúdo em três camadas (regra, operação, escolha), lead magnet que resolve tarefa em vez de prometer rendimento, nutrição segmentada por papel de decisor e ativação de quem já abriu conta. A métrica que sustenta o investimento é contribuição para pipeline, não sessão orgânica no agregado.",
    faq: [
      {
        question: "Qual a diferença entre inbound e content marketing em fintech?",
        answer:
          "Content marketing é a produção e a distribuição das peças. Inbound é o sistema que transforma quem consumiu essas peças em conversa comercial e depois em cliente ativo. Um é insumo, o outro é a linha de montagem. A Kaleidos trata o lado do insumo em [content marketing para fintech](/blog/content-marketing-para-fintech).",
      },
      {
        question: "O que pode ser oferecido como lead magnet numa fintech?",
        answer:
          "Ferramenta e referência: calculadora de custo efetivo, modelo de política interna, checklist de adequação regulatória, planilha de conciliação, comparativo de tarifas com metodologia aberta. O que não pode é simular consultoria de investimento, projetar retorno ou dar garantia de resultado financeiro.",
      },
      {
        question: "Como nutrir leads num ciclo de decisão longo?",
        answer:
          "Segmentando por papel, não por estágio genérico do funil. Quem vai usar recebe conteúdo de implementação, quem aprova recebe conteúdo de custo e risco, e quem carrega o risco recebe conteúdo de conformidade. Sequência única para os três atende mal os três.",
      },
      {
        question: "Quais métricas provam que inbound funciona em fintech?",
        answer:
          "Três recortes: contribuição para pipeline por peça, custo por lead qualificado comparado ao pago, e velocidade do ciclo em contas que consumiram conteúdo antes do contato. Número de posts, palavras escritas e seguidores não resistem a uma pergunta sobre receita.",
      },
    ],
    content: `# Inbound marketing para fintech: como montar crescimento orgânico consistente

Em 2026, a decisão de contratar uma fintech quase nunca começa no site da fintech. Começa numa busca sobre a regra, sobre a taxa ou sobre o problema operacional que fez alguém abrir o navegador às onze da noite. Quem responde essa busca primeiro entra na disputa. Quem só aparece no anúncio de retargeting entra depois, mais caro e com menos crédito.

## Principais takeaways

- Inbound em fintech não é "fazer conteúdo": é uma máquina de captura, nutrição e ativação em que conteúdo é só o primeiro estágio.
- O produto vendido antes do produto é confiança, e confiança segue sendo fator central de decisão empresarial segundo o [Edelman Trust Barometer](https://www.edelman.com/trust/trust-barometer).
- Regulação não é muro, é trilho: ela define o que pode ser prometido, e isso torna o conteúdo educativo mais defensável que a promessa de rendimento.
- O gargalo raramente é tráfego. É o intervalo entre o visitante anônimo e o primeiro contato identificado.
- A métrica que interessa é contribuição para pipeline por conteúdo, não sessão orgânica no agregado.

## Inbound é a máquina inteira, não o blog

Vale separar duas coisas que o mercado trata como sinônimo. Content marketing é a produção e a distribuição das peças. Inbound é o sistema que transforma quem consumiu essas peças em conversa comercial e depois em cliente ativo. Um é insumo, o outro é a linha de montagem.

A Kaleidos já detalhou o lado do insumo em [content marketing para fintech](/blog/content-marketing-para-fintech) e a arquitetura genérica de máquina em [inbound marketing para SaaS](/blog/inbound-marketing-para-saas). Este artigo trata do que é específico de fintech quando os dois se juntam: um setor regulado, com ciclo de decisão longo, produto difícil de explicar e um custo de erro alto para quem contrata.

A máquina tem quatro estágios, e a maior parte das operações brasileiras investe pesado no primeiro e abandona os três seguintes.

## Estágio 1: capturar a busca que antecede a decisão

O comportamento de busca em serviços financeiros tem uma característica útil: a pergunta operacional vem antes da pergunta de compra. Alguém pesquisa como funciona a conciliação de um recebimento antes de pesquisar qual fornecedor de conciliação contratar. Pesquisa o que muda numa resolução do Banco Central antes de pesquisar quem resolve isso.

Isso desenha o mapa de conteúdo com bastante objetividade. Três camadas:

**Camada de regra.** O que a norma exige, o que mudou, quais os prazos. É o conteúdo mais difícil de produzir, o mais caro de terceirizar mal e o que gera mais backlink natural, porque vira referência interna nos times que precisam se adaptar.

**Camada de operação.** Como se resolve o problema no dia a dia, incluindo o caminho manual. Sim, incluindo o caminho manual: mostrar a planilha que funciona é o que credencia a ferramenta que substitui a planilha.

**Camada de escolha.** Comparativos, critérios de seleção, o que perguntar num fornecedor. É a camada de fundo, com menos volume e a maior taxa de conversão.

Quem só produz a camada de escolha compete por poucas buscas caríssimas. Quem só produz a camada de regra vira biblioteca pública sem receita. As três juntas formam autoridade tópica, que é o que faz um domínio ranquear consistentemente em vez de por sorte.

## Estágio 2: converter anônimo em contato, sem prometer rendimento

Aqui aparece a restrição que separa fintech de qualquer outro B2B: o que pode ser oferecido em troca do e-mail.

Um lead magnet de fintech não pode simular consultoria de investimento, não pode projetar retorno e não pode dar garantia de resultado financeiro. O que sobra é, felizmente, o que funciona melhor mesmo: ferramenta e referência. Calculadora de custo efetivo, modelo de política interna, checklist de adequação regulatória, planilha de conciliação, comparativo de tarifas com metodologia aberta.

A diferença entre um material que converte e um que não converte costuma ser banal: o que converte resolve uma tarefa que a pessoa já ia fazer hoje. O que não converte é um relatório de tendências que ela guarda para ler depois e nunca lê.

Um teste prático antes de produzir qualquer material: alguém abriria isso numa terça-feira de manhã, com o problema aberto na frente? Se a resposta é "abriria em algum momento", o material é conteúdo de marca, e conteúdo de marca não deve ficar atrás de formulário.

## Estágio 3: nutrir um ciclo longo sem virar spam

Em fintech, principalmente no B2B, entre o primeiro contato e a assinatura passam semanas ou meses, com mais de uma pessoa envolvida na decisão. Quem compra tecnicamente não é quem aprova o orçamento, e quem aprova o orçamento não é quem carrega o risco de compliance.

A nutrição precisa refletir isso. Uma sequência única, igual para todo mundo, atende mal os três. O desenho que funciona segmenta por papel, não por estágio genérico do funil:

- Para quem vai usar, conteúdo de implementação: integração, suporte, o que muda na rotina.
- Para quem aprova, conteúdo de custo e risco: comparação com o custo atual, custo de não fazer nada, prazo de adequação.
- Para quem carrega o risco, conteúdo de conformidade: certificações, tratamento de dados, histórico de auditoria, o que acontece se der errado.

Três observações que aparecem com frequência nas operações que a Kaleidos acompanha. Primeira: a maior parte dos leads de fintech não está pronta para comprar quando entra, e tratá-los como se estivessem queima a lista. Segunda: e-mail em serviço financeiro carrega expectativa de sobriedade, o que na prática significa menos urgência artificial e mais informação útil. Terceira: a régua de frequência deve ser definida pelo ritmo do problema do cliente, não pelo calendário da equipe de marketing.

## Estágio 4: ativação, o estágio que fica sem dono

Em fintech com autoatendimento, a conta aberta não é o fim. É o começo do único número que importa de verdade: quantos abriram e efetivamente usaram.

Esse estágio pertence ao inbound tanto quanto os anteriores, e é onde conteúdo tem retorno mais rápido. Onboarding documentado, respostas de suporte que viram artigo público, tutorial do primeiro caso de uso real. Cada peça reduz atrito de ativação e, de quebra, ranqueia, porque quem ainda não é cliente pesquisa exatamente as mesmas dúvidas antes de decidir.

Operações que separam "marketing" de "sucesso do cliente" em dois mundos costumam produzir conteúdo duplicado e desalinhado, com o time de suporte reescrevendo em ticket o que o time de conteúdo já publicou pior.

## O que medir, e o que ignorar

Sessão orgânica no agregado diz pouco. Três recortes dizem quase tudo:

**Contribuição para pipeline por peça.** Qual conteúdo aparece no caminho de contas que viraram oportunidade. Exige atribuição decente, que exige, por sua vez, um CRM que não seja abandonado.

**Custo por lead qualificado, comparado ao pago.** Inbound é ativo e mídia é aluguel, mas essa frase só vale se o número sustentar. Medir isso separadamente evita tanto o otimismo quanto o corte precipitado do orçamento de conteúdo.

**Velocidade do ciclo.** Contas que consumiram conteúdo antes do contato fecham mais rápido? Essa é a evidência mais convincente para justificar o investimento internamente, e a menos usada.

O que ignorar: número de posts publicados, palavras escritas, seguidores. Nenhum deles resiste a uma pergunta sobre receita.

## Consistência é o diferencial, não a criatividade

Inbound em fintech tem uma vantagem estranha: o padrão do setor é ruim. Muita fintech publica release, prêmio e post institucional sobre a própria cultura. O espaço de conteúdo genuinamente útil sobre regra, operação e escolha segue mal atendido em português.

Ocupar esse espaço não depende de ideia brilhante. Depende de publicar com regularidade por tempo suficiente para o acervo compor, e de não desmontar a operação no primeiro trimestre em que a meta comercial aperta.

A Kaleidos monta esse tipo de operação para fintechs e projetos cripto, do mapa de conteúdo à mensuração no CRM. Se você quer parar de depender de mídia paga para gerar pipeline, [fale com a Kaleidos](/contato). Há mais material sobre aquisição na [seção de marketing](/blog/categoria/marketing) do blog.
`,
  },
];
