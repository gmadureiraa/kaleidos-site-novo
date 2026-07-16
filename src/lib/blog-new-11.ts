import type { BlogPost } from "./blog-data";

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const blogNew11: BlogPost[] = [
  {
    slug: "roi-marketing-cripto-como-medir",
    title:
      "Como medir o ROI do marketing cripto: as métricas que importam (e as de vaidade)",
    seoTitle:
      "ROI do marketing cripto: como medir de verdade",
    excerpt:
      "CAC, LTV, custo por wallet ativa, mindshare e atribuição on-chain: o guia da Kaleidos para medir o retorno real do marketing em cripto e web3, separando métricas de negócio das métricas de vaidade que inflam relatório e não movem TVL, volume ou receita.",
    seoDescription:
      "Guia prático de ROI em marketing cripto: CAC, LTV, custo por wallet ativa, mindshare, atribuição on-chain e métricas por objetivo. Sem métrica de vaidade.",
    category: "cripto",
    author: AUTHOR,
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-16",
    readTime: 11,
    featured: false,
    coverImage: "",
    tags: [
      "roi marketing cripto",
      "métricas web3",
      "cac cripto",
      "ltv",
      "atribuição on-chain",
      "mindshare",
      "growth cripto",
      "marketing web3",
    ],
    tldr: "Medir ROI em marketing cripto exige trocar métricas de vaidade (impressões, seguidores, membros no Discord) por métricas de negócio: CAC por wallet ativa, LTV baseado em receita de protocolo, retenção on-chain e mindshare qualificado. A atribuição combina dados off-chain (UTM, analytics) com dados on-chain (primeira transação, origem do funding). Cada objetivo pede um painel diferente.",
    faq: [
      {
        question: "Como calcular o CAC em marketing cripto?",
        answer:
          "Divida o investimento total de marketing do período pelo número de wallets que executaram a ação-alvo (primeiro swap, primeiro depósito, primeiro mint), não pelo número de cliques ou cadastros. Em cripto, o cadastro é a wallet conectada com transação confirmada. Se a campanha custou 50 mil dólares e gerou 2.000 wallets com primeira transação, o CAC é 25 dólares por wallet ativa.",
      },
      {
        question: "O que são métricas de vaidade em cripto?",
        answer:
          "São números que crescem sem gerar valor de negócio: impressões, seguidores no X, membros no Discord e Telegram, holders totais sem filtro de saldo mínimo e endereços únicos infláveis por bots e farmers de airdrop. Elas servem como sinal fraco de awareness, mas não sustentam decisão de investimento em canal. A a16z estimou no relatório State of Crypto de 2024 que só 5% a 10% dos endereços ativos correspondem a usuários reais.",
      },
      {
        question: "Como funciona a atribuição de marketing on-chain?",
        answer:
          "Combinando duas camadas. A off-chain rastreia a jornada até a conexão da wallet: UTM, referrer, landing page e analytics de produto. A on-chain analisa o que a wallet faz depois: primeira transação, origem do funding, retenção e volume. Ferramentas como Dune, Flipside e plataformas de attribution web3 como Spindl (adquirida pela Coinbase em 2025) cruzam as duas camadas para ligar campanha a comportamento econômico.",
      },
      {
        question: "Qual métrica usar antes do TGE, quando não existe receita?",
        answer:
          "Antes do TGE o ROI é medido em ativos de lançamento: tamanho e qualidade da waitlist ou allowlist, wallets qualificadas (com histórico on-chain real, não recém-criadas), mindshare entre KOLs e comunidades-alvo, e custo por wallet qualificada. O objetivo é chegar ao TGE com demanda comprovável, não com seguidores.",
      },
      {
        question: "O que é mindshare e como medir sem cair em vaidade?",
        answer:
          "Mindshare é a fatia de atenção que o projeto ocupa na conversa do setor. Plataformas como Kaito popularizaram o índice a partir de 2024, medindo share of voice ponderado por relevância dos autores. Para não virar vaidade, cruze mindshare com métricas de fundo de funil: se a atenção cresce e as wallets ativas não acompanham em 30 a 60 dias, a narrativa está descolada do produto.",
      },
    ],
    content: `# Como medir o ROI do marketing cripto: as métricas que importam (e as de vaidade)

Marketing cripto tem um problema de medição que o marketing tradicional não tem: os números mais fáceis de mostrar são os mais fáceis de falsificar. Endereços únicos, seguidores, membros no Discord. Tudo isso infla com bot, farmer de airdrop e engajamento comprado. O relatório State of Crypto 2024 da a16z registrou 220 milhões de endereços ativos mensais em setembro de 2024, mas estimou que apenas 5% a 10% desses endereços correspondem a usuários humanos reais. Ou seja: a métrica mais citada do setor carrega até 95% de ruído.

A tese da Kaleidos é direta. ROI em cripto se mede em comportamento econômico on-chain, não em audiência. Quem trata wallet ativa como conversão e receita de protocolo como norte consegue comparar canais, cortar o que não funciona e defender orçamento. Quem mede impressão e holder total está gerenciando um relatório, não um negócio.

## Principais takeaways

- **CAC em cripto é custo por wallet ativa**, não por clique ou cadastro. A conversão é a primeira transação confirmada, e o denominador precisa excluir bots e farmers.
- **LTV vem da receita do protocolo**, não do preço do token. Fees, spread, take rate: é isso que a wallet gera ao longo do tempo.
- **Métricas de vaidade têm uso restrito**: servem de sinal de awareness no topo, nunca de critério para alocar orçamento.
- **Atribuição funciona em duas camadas**: off-chain (UTM, referrer, analytics) até a conexão da wallet e on-chain (transações, funding, retenção) depois dela.
- **Cada objetivo pede um painel**: awareness, comunidade, conversão e TGE têm métricas-norte diferentes. Misturar tudo num dashboard só é a receita da confusão.

## O que é ROI em marketing cripto, na prática

A fórmula não muda: retorno gerado dividido pelo investimento. O que muda em cripto é o que conta como retorno. Um protocolo DeFi mede retorno em TVL retido e fees gerados. Uma exchange mede em volume negociado e receita de trading. Um projeto de NFT ou gaming mede em mints, itens vendidos e retenção de jogadores. Uma infra (L2, oráculo, RPC) mede em desenvolvedores integrando e transações processadas.

O erro clássico é usar o preço do token como proxy de retorno de marketing. Preço reflete macro, liquidez, unlock schedule e sentimento de mercado. Campanha nenhuma controla isso. Marketing responde por aquisição, ativação e retenção de usuários. É nesse recorte que o ROI deve ser calculado.

## CAC: custo de aquisição por wallet ativa

CAC em cripto tem uma pegadinha no denominador. Se você divide o investimento por "wallets conectadas", está contando gente que abriu o site, plugou a wallet e foi embora. Se divide por "endereços que interagiram com o contrato", está contando farmers que fazem uma transação mínima atrás de airdrop.

A definição que a Kaleidos recomenda: **CAC = investimento total do período dividido pelo número de wallets que executaram a ação de ativação com valor mínimo**. A ação de ativação depende do produto: primeiro swap acima de X, primeiro depósito, primeiro mint pago, primeira ponte. O valor mínimo filtra o ruído de sybil.

Três refinamentos que separam medição séria de planilha decorativa:

- **CAC por canal.** KOL, ads pagos, conteúdo orgânico, quest platform, referral. Cada canal com seu custo e suas wallets atribuídas. Sem isso, não existe decisão de realocação.
- **CAC blended vs. pago.** O blended (tudo dividido por tudo) esconde canais ruins. Calcule o CAC pago isolado para saber quanto custa crescer quando o orgânico satura.
- **Janela de maturação.** Em cripto, parte da conversão acontece semanas depois do primeiro toque, principalmente em produtos que exigem ponte de fundos. Feche o CAC com janela de 30 dias, não no dia da campanha.

## LTV: o valor vem da receita do protocolo

LTV é a métrica mais negligenciada do marketing cripto, porque exige olhar para dentro do produto. A conta base: **receita média que uma wallet gera por período, multiplicada pelo tempo médio de retenção**. A receita vem de fees de transação, spread, take rate de marketplace, assinatura ou qualquer mecanismo de captura de valor do protocolo.

Se o protocolo cobra 0,3% por swap e a wallet média movimenta 5.000 dólares por mês durante 6 meses, o LTV bruto dessa wallet é 90 dólares. Com esse número, o CAC de 25 dólares do exemplo anterior vira uma decisão óbvia: a relação LTV/CAC de 3,6 sustenta escala. Sem LTV, o CAC é um número solto que ninguém sabe se é bom ou ruim.

Dois cuidados:

- **Segmente por coorte de origem.** Wallets vindas de campanha de airdrop têm retenção historicamente pior do que wallets vindas de conteúdo ou referral. A análise da CoinGecko sobre grandes airdrops de 2024 mostrou que a maioria dos tokens distribuídos perdeu valor expressivo nos meses seguintes, refletindo o ciclo de farmar e despejar (destrinchamos esse padrão no [pós-mortem de airdrops](/blog/airdrop-pos-mortem-evitar-dump)). Coorte de airdrop precisa de LTV próprio.
- **Não conte token appreciation como LTV.** Valorização de tesouraria não é receita recorrente de usuário.

## As métricas de vaidade (e o uso restrito que elas têm)

Vaidade não significa inútil. Significa insuficiente para decisão. A lista dos suspeitos de sempre:

- **Impressões e alcance.** Compráveis, infláveis, sem ligação com comportamento.
- **Seguidores no X.** Mercado paralelo inteiro de venda de seguidor. Um projeto com 300 mil seguidores e 40 likes por post está anunciando a própria fraude.
- **Membros de Discord e Telegram.** Crescem com raid e giveaway, esvaziam em silêncio. O número que importa é membro ativo semanal e taxa de mensagens por membro.
- **Holders totais.** Sem filtro de saldo mínimo, holders incluem dust e sybil.
- **Endereços únicos.** Como o dado da a16z de 2024 mostra, endereço não é pessoa.

O uso legítimo dessas métricas: sinal de tendência no topo do funil e matéria-prima de narrativa (exchange e parceiro olham para isso em due diligence social). O uso ilegítimo: justificar renovação de contrato de KOL ou alocação de mídia. Para isso, só métrica de fundo de funil.

## Mindshare: atenção qualificada, não volume de menção

Mindshare virou a métrica de moda do setor desde que a Kaito popularizou seu índice de atenção em 2024, ponderando menções pela relevância de quem fala. A ideia é boa: em um mercado guiado por narrativa, a fatia de atenção antecipa fluxo.

O risco é tratar mindshare como fim. Projetos aprenderam a farmar o índice com campanhas de yap (engajamento incentivado), e atenção comprada se dissipa rápido. A regra da Kaleidos: **mindshare só entra no painel acompanhado de uma métrica de fundo de funil com defasagem de 30 a 60 dias**. Se a atenção subiu e as wallets ativas não acompanharam, a narrativa descolou do produto. Isso é diagnóstico útil. Mindshare sozinho é vaidade sofisticada. Como construir essa atenção do jeito orgânico é assunto do nosso [guia de Twitter (X) pra projetos cripto](/blog/twitter-x-crescimento-projeto-cripto).

## Atribuição em cripto: as duas camadas

Atribuição é onde o marketing cripto mais apanha, porque a jornada quebra no meio: metade acontece na web aberta, metade acontece on-chain, e a wallet não carrega cookie.

### Camada off-chain

Tudo até a conexão da wallet funciona como marketing digital normal: UTM em cada link, referrer tracking, analytics de produto (PostHog, GA4, Mixpanel) e eventos de funil (visitou, conectou wallet, iniciou transação). O momento da conexão é a costura: registre o endereço da wallet junto com os parâmetros de origem da sessão.

### Camada on-chain

Depois da costura, a blockchain vira o CRM mais honesto que existe. Com Dune ou Flipside, dá para responder perguntas que nenhum analytics web responde:

- A wallet fez a primeira transação quando? Com que volume?
- De onde veio o funding dela? CEX, bridge, wallet antiga? (Funding de CEX recente sugere usuário novo; funding de wallet farmer sugere sybil.)
- Ela voltou? Retenção D7, D30, D90 medida em transações, não em visitas.
- Ela concentra volume ou pulverizou em 50 protocolos?

Plataformas dedicadas de atribuição web3 nasceram para automatizar essa costura. A Spindl, fundada pelo ex-Facebook Antonio García Martínez, foi adquirida pela Coinbase em janeiro de 2025 justamente para levar attribution on-chain para dentro do ecossistema Base, sinal de que o problema é reconhecido pela própria indústria.

A honestidade metodológica importa: atribuição em cripto nunca será perfeita. Multi-touch com KOL em áudio do X não deixa UTM. A solução pragmática é triangular: atribuição direta onde existe link, incrementalidade por janela temporal onde não existe (o que mudou nas 72h após a ação?) e pesquisa de origem no onboarding ("como conheceu o projeto?").

## Métricas por objetivo: um painel para cada fase

### Awareness

- Norte: share of voice qualificado e tráfego direto + branded search.
- Suporte: crescimento de menções por autores relevantes, mindshare.
- Armadilha: comprar impressão e chamar de awareness.

### Comunidade

- Norte: membros ativos semanais e taxa de retenção de membros em 30 dias.
- Suporte: mensagens por membro ativo, conversão de membro em wallet ativa, número de contribuidores orgânicos (quem cria conteúdo sem incentivo).
- Armadilha: contar total de membros. Comunidade é fluxo, não estoque.

### Conversão

- Norte: CAC por wallet ativa e relação LTV/CAC por canal.
- Suporte: taxa de ativação (conectou vs. transacionou), retenção D30 on-chain, receita por coorte.
- Armadilha: otimizar para conexão de wallet, que é meio, não fim.

### TGE e lançamento

- Norte: custo por wallet qualificada na allowlist (com histórico on-chain real, idade mínima de wallet, atividade prévia).
- Suporte: mindshare pré-lançamento, profundidade de waitlist, engajamento de KOLs tier 1 vs. tier 3, retenção pós-claim (quantos % venderam tudo na primeira semana?).
- Armadilha: celebrar número bruto de inscritos na allowlist. Farmers formam fila em qualquer lançamento; a qualidade do filtro define a qualidade do float inicial.

## Ferramentas do stack de medição

- **Dune Analytics**: dashboards SQL sobre dados on-chain. Padrão da indústria para retenção, volume e coortes por contrato.
- **Flipside**: alternativa ao Dune com queries e scores de comportamento de wallet.
- **Nansen**: labels de wallets (smart money, exchanges, funds) para qualificar quem está chegando.
- **PostHog / GA4 / Mixpanel**: camada off-chain, funil até a conexão de wallet.
- **Kaito**: mindshare e share of voice ponderado por relevância.
- **Plataformas de quests (Galxe, Layer3)**: aquisição mensurável por tarefa, com o alerta permanente de qualidade de wallet ([como desenhar growth loops de quests que retêm](/blog/growth-loops-cripto-referral-quests)).
- **Ferramentas de attribution web3 (Spindl/Coinbase, Cookie3, Addressable)**: costura automatizada entre campanha e comportamento on-chain.

Nenhuma ferramenta resolve sozinha. O stack mínimo viável é um analytics web com UTM disciplinado, um dashboard Dune com as 5 métricas-norte do projeto e uma rotina semanal de leitura cruzada.

## Como montar o relatório de ROI que sobrevive a uma diligência

1. **Defina a ação de ativação e o valor mínimo** antes de qualquer campanha. Sem isso, o CAC nasce contaminado.
2. **Feche o funil em cinco linhas**: alcance qualificado, visitas, wallets conectadas, wallets ativadas, wallets retidas em D30. Cada linha com custo atribuído.
3. **Reporte LTV/CAC por canal e por coorte**, com janela de maturação explícita.
4. **Separe o relatório de narrativa do relatório de performance.** Impressão e mindshare vivem no primeiro; decisão de orçamento vive no segundo.
5. **Documente as premissas de atribuição.** Quem lê precisa saber o que é medido e o que é estimado. Isso é o que diferencia relatório sério de teatro de dashboard.

## Conclusão

O marketing cripto amadureceu mais rápido na criação do que na medição. A boa notícia é que a blockchain, paradoxalmente, é o ambiente mais mensurável que o marketing já teve: cada conversão é uma transação pública, imutável e auditável. O que falta na maioria dos projetos não é dado, é método.

A Kaleidos estrutura medição de ROI para projetos cripto e web3 desde a definição das métricas-norte até os dashboards on-chain e a rotina de leitura. Se o seu projeto está gastando em marketing sem saber o que volta, essa conversa costuma se pagar rápido. [Fale com a gente](/contato).
`,
  },
];
