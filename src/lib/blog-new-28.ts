import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew28: BlogPost[] = [
  {
    slug: "estruturar-time-bd-growth-cripto",
    title: "Como estruturar o time de BD e growth de um projeto cripto",
    seoTitle: "Time de BD e growth em cripto: papéis e métricas",
    excerpt:
      "Quem contratar primeiro, o que cada papel faz, quais métricas cobrar e quando faz mais sentido terceirizar com uma agência. Um guia prático para founders cripto montarem BD e growth sem queimar runway.",
    seoDescription:
      "Guia para estruturar o time de BD e growth de um projeto cripto: papéis, métricas por função, erros comuns, pré-TGE vs pós-TGE e quando terceirizar com agência.",
    category: "growth",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "/blog/estruturar-time-bd-growth-cripto/cover.png",
    tags: [
      "BD cripto",
      "growth web3",
      "time de marketing cripto",
      "contratação web3",
      "KOL marketing",
      "gestão de comunidade",
      "agência cripto",
      "pré-TGE",
    ],
    tldr:
      "Um time de BD e growth cripto tem cinco funções centrais: BD, growth, comunidade, KOL e conteúdo. Poucos projetos precisam das cinco em tempo integral desde o início. O caminho racional é contratar o que é core, terceirizar o que é execução especializada e cobrar métricas claras por função, ajustando a estrutura conforme o estágio, pré-TGE ou pós-TGE.",
    faq: [
      {
        question: "Qual é a primeira contratação de growth em um projeto cripto?",
        answer:
          "Na maioria dos casos, a primeira função interna deve ser comunidade ou BD, dependendo do modelo de negócio. Protocolos B2B (infra, RWA, soluções para exchanges) precisam de BD antes de audiência. Produtos B2C (wallets, DeFi de varejo, jogos) precisam de comunidade e conteúdo antes de parcerias. Growth como função analítica dedicada costuma vir depois, quando já existe funil para otimizar.",
      },
      {
        question: "Qual a diferença entre BD e growth em cripto?",
        answer:
          "BD (business development) trabalha relações um a um: integrações com outros protocolos, listagens, parcerias com exchanges, market makers e ecossistemas. Growth trabalha escala um para muitos: aquisição de usuários, funil, retenção, campanhas e experimentos. BD fecha contratos, growth move métricas de usuário. São perfis, rotinas e métricas diferentes, e tratá-los como uma coisa só é um erro comum.",
      },
      {
        question: "Vale a pena contratar um gestor de KOLs interno?",
        answer:
          "Quase nunca no início. Gestão de KOLs exige rede de relacionamento já construída, conhecimento de preços praticados e capacidade de filtrar engajamento falso. Uma agência ou um parceiro especializado que já mantém essas relações tende a entregar mais rápido e com menos desperdício. Internalizar faz sentido quando o volume de campanhas é constante e o projeto já sabe o que funciona para o próprio público.",
      },
      {
        question: "O que muda no time entre pré-TGE e pós-TGE?",
        answer:
          "No pré-TGE o foco é narrativa, comunidade e parcerias que deem credibilidade ao lançamento, então comunidade, conteúdo e BD dominam. No pós-TGE o token vira um produto que precisa de liquidez, holders ativos e utilidade demonstrada, então growth orientado a dados, retenção e BD de integrações ganham peso. A composição do time deve mudar junto, e times montados para o hype do lançamento raramente são os mesmos que sustentam o projeto depois.",
      },
      {
        question: "Quando terceirizar o marketing de um projeto cripto para uma agência?",
        answer:
          "Quando a função exige especialização que o time não tem, quando o volume não justifica um contratado em tempo integral, ou quando a velocidade importa mais do que a construção de capacidade interna. Conteúdo, KOLs, mídia paga e operação de social são as áreas mais terceirizáveis. Visão de produto, relação direta com a comunidade e decisões de posicionamento devem ficar dentro de casa.",
      },
    ],
    content: `# Como estruturar o time de BD e growth de um projeto cripto

Todo founder cripto passa pelo mesmo dilema: o produto avança, o roadmap técnico está de pé, mas ninguém está cuidando de distribuição. Contrato um head de growth? Um BD? Alguém de comunidade? Ou fecho com uma agência e resolvo depois?

A resposta errada custa caro nos dois sentidos. Contratar demais queima runway. Contratar de menos deixa o protocolo invisível em um mercado onde atenção é o recurso mais disputado. E contratar o perfil errado, o cenário mais comum, gera seis meses de atividade sem resultado.

A Kaleidos trabalha com projetos cripto, web3 e fintech em diferentes estágios, e esse é um dos temas que mais aparece nas conversas com founders. Este guia organiza o que observamos funcionar: papéis, métricas por função, o que internalizar, o que terceirizar e como tudo muda entre pré-TGE e pós-TGE.

## Principais takeaways

- BD e growth são funções diferentes: BD fecha parcerias um a um, growth escala aquisição e retenção um para muitos. Misturar as duas em uma vaga só costuma frustrar as duas.
- As cinco funções centrais são BD, growth, comunidade, gestão de KOLs e conteúdo. Quase nenhum projeto early-stage precisa das cinco em tempo integral.
- A primeira contratação depende do modelo: projetos B2B começam por BD, projetos B2C começam por comunidade e conteúdo.
- Cada função precisa de métricas próprias. Cobrar "crescimento" de todo mundo é o mesmo que não cobrar nada.
- Pré-TGE pede narrativa, comunidade e credibilidade. Pós-TGE pede dados, retenção e utilidade do token. O time deve mudar de forma junto com o estágio.
- Terceirizar execução especializada (conteúdo, KOLs, mídia paga) e manter dentro de casa o que é core (posicionamento, relação com a comunidade, decisões de produto) é a divisão que mais preserva caixa sem perder tração.

## Os cinco papéis de um time de BD e growth cripto

Antes de decidir quem contratar, vale separar o que cada função realmente faz. Em cripto esses papéis costumam ser confundidos, e a confusão gera vagas impossíveis.

### 1. Business Development (BD)

O BD é a função de relacionamento institucional do projeto. Ele negocia integrações com outros protocolos, conversa com exchanges sobre listagem e articula parcerias com [market makers](/blog/melhores-market-makers-cripto-2026), fundos e ecossistemas que possam gerar distribuição ou liquidez.

O bom BD cripto vive de rede: conhece as pessoas certas nas foundations, sabe quem decide o quê dentro de uma exchange e entende o produto o suficiente para defender uma integração tecnicamente. É função de ciclo longo, uma parceria relevante pode levar meses entre o primeiro contato e o anúncio. Boa parte desses contatos nasce em eventos, e por isso vale ler como transformar uma [conferência web3 em motor de crescimento](/blog/conferencia-web3-motor-de-crescimento).

### 2. Growth

Growth é a função de escala. Enquanto o BD fecha acordos um a um, o growth constrói máquinas que trazem usuários de forma repetível: funis de aquisição, campanhas de incentivo, programas de referral, experimentos de conversão, análise de retenção on-chain e off-chain.

O perfil é analítico. Um bom growth em cripto sabe ler dados de carteira com as [ferramentas de analytics do setor](/blog/melhores-ferramentas-analytics-cripto-2026), distingue usuários reais de farmers de airdrop e trata cada campanha como experimento com hipótese e critério de sucesso. Se a pessoa não fala em coorte, retenção e custo por usuário ativado, não é growth, é marketing genérico com outro nome.

### 3. Comunidade

Comunidade é a função mais subestimada e uma das mais decisivas. Em cripto, a comunidade não é audiência passiva: é quem defende o projeto em ciclos de baixa, testa o produto antes de todo mundo e amplifica cada anúncio.

O gestor de comunidade opera Discord, Telegram e os espaços onde os holders vivem. Modera, organiza eventos, coleta feedback, identifica membros que podem virar embaixadores e serve de radar: é a primeira pessoa a perceber quando o sentimento muda. A função exige presença constante, não um founder respondendo Discord às duas da manhã.

### 4. Gestão de KOLs

KOLs (key opinion leaders) são o canal de influência do setor. A função envolve mapear os influenciadores certos para cada narrativa, negociar formatos e valores, coordenar campanhas e, principalmente, filtrar: o mercado de KOLs cripto tem engajamento inflado, audiência comprada e preços sem padrão.

Quem já rodou dezenas de campanhas sabe quem entrega e quem só posta. Quem está começando do zero paga o preço da descoberta com o orçamento do projeto. Por isso essa é, na prática, a função mais terceirizável do time.

### 5. Conteúdo

Conteúdo é o que transforma um protocolo tecnicamente sólido em uma narrativa que pessoas entendem e compartilham: blog, threads, newsletter, documentação voltada a usuário, roteiros de vídeo e o material que sustenta todos os outros canais.

Em cripto, conteúdo tem um papel extra: educar. Grande parte do funil de um produto web3 é explicar o problema antes de vender a solução. Projetos que tratam conteúdo como decoração ficam reféns de mídia paga e de hype de terceiros. Quem trata conteúdo como produto constrói um ativo que se acumula.

## Quem contratar primeiro: a ordem depende do modelo

Não existe ordem universal, mas existe uma lógica simples: contrate primeiro a função que destrava o seu modelo de receita.

**Projetos B2B** (infraestrutura, RWA, soluções para instituições e outros protocolos) vivem de parcerias e integrações. Nesses casos, BD vem primeiro: uma integração com um protocolo grande vale mais do que dez mil seguidores. Comunidade e conteúdo entram como suporte à credibilidade.

**Projetos B2C** (wallets, DeFi de varejo, jogos, consumer apps) vivem de usuários. Aqui, comunidade e conteúdo vêm primeiro, porque constroem a audiência da qual todo o resto depende. BD entra depois, quando já existe tração para negociar de igual para igual.

**Growth como função dedicada** costuma ser a terceira ou quarta contratação em ambos os casos, porque growth otimiza funis que já existem. Contratar um growth antes de ter produto utilizável, comunidade mínima e canais ativos é pagar alguém para olhar dashboards vazios.

Um padrão frequente nos primeiros meses: o founder acumula BD e narrativa, um contratado cuida de comunidade e uma agência cobre conteúdo, social e KOLs. Essa configuração cobre as cinco funções com um ou dois salários em vez de cinco.

## Contratar versus terceirizar: o critério honesto

A decisão entre contratar e terceirizar costuma ser tratada como questão de custo, mas o critério mais útil é outro: **o que é core e o que é execução especializada**.

**Deve ficar dentro de casa:**

- Posicionamento e narrativa central do projeto. Ninguém de fora decide o que o protocolo é.
- Relação direta com a comunidade. A comunidade percebe quando quem responde não vive o projeto.
- BD estratégico. As parcerias que definem o rumo do protocolo passam pelo founder ou por alguém muito próximo.

**Pode e muitas vezes deve ser terceirizado:**

- Produção de conteúdo em volume: blog, threads, newsletter, roteiros. Exige método e consistência, não presença no dia a dia do produto.
- Gestão de KOLs: a rede de contatos e o conhecimento de preços de uma agência que roda campanhas continuamente são caros de replicar internamente.
- Mídia paga: plataformas restringem anúncios cripto e as regras mudam com frequência. Quem opera isso todo dia erra menos.
- Design e produção audiovisual: demanda variável não justifica time fixo no early-stage.

A conta financeira reforça a lógica. Um time interno com as cinco funções em nível pleno custa caro, e em cripto os salários disputam com o exterior porque o trabalho é remoto e global. Uma estrutura híbrida, com uma ou duas contratações core e uma agência cobrindo a execução, entrega cobertura completa por uma fração disso e escala para cima ou para baixo conforme o ciclo. É esse papel de braço terceirizado de growth e conteúdo que a Kaleidos cumpre para projetos cripto e web3: o founder mantém a estratégia, a agência garante a execução contínua.

O sinal para internalizar é claro: quando uma função terceirizada vira gargalo de contexto, ou seja, quando o parceiro externo precisa de tanto briefing que seria mais barato ter alguém dentro, é hora de contratar.

## Métricas por função: o que cobrar de cada papel

Time sem métrica clara é time avaliado por sensação. Cada função precisa de indicadores próprios.

**BD:**

- Número de parcerias assinadas e, mais importante, ativadas (integração no ar, não só anúncio)
- Pipeline: conversas ativas por estágio
- Impacto por parceria: usuários, TVL ou volume atribuível a cada acordo
- Tempo de ciclo entre primeiro contato e ativação

**Growth:**

- Custo de aquisição por usuário ativado (não por clique, não por cadastro)
- Retenção por coorte: quantos usuários da campanha X seguem ativos em 30 e 90 dias
- Taxa de conversão por etapa do funil
- Proporção de usuários reais versus farmers em campanhas de incentivo

**Comunidade:**

- Membros ativos (participação real), não total de membros
- Tempo de resposta a dúvidas e sentimento geral nos canais
- Número de membros que evoluem para embaixadores, moderadores ou colaboradores
- Retenção da comunidade em períodos de baixa do mercado, que é quando o número importa

**KOLs:**

- Custo por mil visualizações reais e por conversão atribuível, campanha a campanha
- Qualidade da audiência ativada: quantos usuários trazidos por KOL seguem ativos depois
- Taxa de reaproveitamento: quais influenciadores valem segunda campanha

**Conteúdo:**

- Tráfego orgânico e crescimento de audiência própria (newsletter, seguidores que engajam)
- Conteúdos que geram conversa e citação, não só impressão
- Contribuição para o funil: quantos usuários chegam por conteúdo
- Consistência de publicação, porque conteúdo composto exige cadência

Uma regra transversal: em cripto, vaidade métrica é epidemia. Seguidores comprados, membros de Discord inflados por airdrop e visualizações de KOL sem conversão são fáceis de exibir e inúteis para o negócio. Se a métrica não conecta com usuário ativo, receita ou liquidez, ela é decoração.

## Pré-TGE versus pós-TGE: o mesmo time não serve para os dois momentos

O estágio do projeto muda o que o time precisa entregar.

**Pré-TGE**, o jogo é credibilidade e antecipação:

- Comunidade e conteúdo dominam: é o momento de construir a audiência que vai sustentar o lançamento
- BD foca parcerias de credibilidade: backers, ecossistemas, integrações que validem a tese
- KOLs entram para construir narrativa, não para converter, porque ainda não há o que converter
- Growth formal é secundário: sem token e muitas vezes sem produto completo, não há funil maduro para otimizar

**Pós-TGE**, o jogo vira sustentação e utilidade:

- Growth assume protagonismo: agora existem métricas reais de usuários, holders e liquidez para trabalhar
- BD muda de credibilidade para distribuição: listagens adicionais, integrações que gerem uso real do token
- Comunidade muda de hype para retenção: o desafio é manter holders engajados quando o preço não coopera
- Conteúdo muda de promessa para prova: cases, dados de uso, transparência sobre o roadmap

O erro clássico é montar o time inteiro para o lançamento e descobrir, três meses depois do TGE, que ninguém sabe operar a fase seguinte. A estrutura híbrida com agência ajuda aqui: a parte terceirizada se reconfigura para a nova fase sem demissões nem recontratações.

## Erros comuns ao montar o time

Padrões que se repetem:

1. **Contratar um "head de marketing" genérico como primeira pessoa.** Sem repertório cripto, essa pessoa passa os primeiros meses aprendendo o básico do setor com o salário de quem deveria estar entregando.
2. **Tratar BD e growth como a mesma vaga.** São perfis opostos: um vive de relacionamento e ciclo longo, o outro de dados e iteração rápida. A vaga híbrida atrai quem não é bom em nenhum dos dois.
3. **Medir comunidade por tamanho.** Cem mil membros de Discord conquistados por promessa de airdrop valem menos que mil membros que usam o produto e respondem dúvidas de novatos.
4. **Comprar KOLs por número de seguidores.** Sem auditoria de audiência e sem métrica de conversão, campanha de KOL é doação.
5. **Deixar conteúdo para depois.** Conteúdo é o único canal que se acumula com o tempo. Cada mês sem publicar é um mês de juro composto perdido.
6. **Montar o time no topo do ciclo.** Contratar cinco no bull e demitir quatro no bear destrói reputação e continuidade. Estruturas flexíveis existem para isso.
7. **Isolar distribuição do produto.** BD, growth e conteúdo só funcionam quando entendem profundamente o que o protocolo faz. Time de distribuição sem contexto de produto produz barulho, não tração.

## Como a Kaleidos entra nessa estrutura

A Kaleidos atua como braço terceirizado de growth e conteúdo para projetos cripto, web3 e fintech. Na prática, isso significa cobrir as funções de execução especializada discutidas neste guia: estratégia e produção de conteúdo, operação de social, campanhas com KOLs e estruturação de funis, enquanto o founder e o time interno mantêm o que é core, como posicionamento, produto e as relações estratégicas.

Para projetos em estágio inicial, essa configuração substitui três ou quatro contratações que o runway não comporta. Para projetos pós-TGE, funciona como camada de execução contínua que se adapta à fase do protocolo sem o custo fixo de um time completo.

Se você está montando ou reestruturando o time de BD e growth do seu projeto, [fale com a Kaleidos](/contato). A primeira conversa serve para mapear o que já existe, identificar o que falta e desenhar a estrutura mais enxuta que cobre as cinco funções no seu estágio atual.
`,
  },
];
