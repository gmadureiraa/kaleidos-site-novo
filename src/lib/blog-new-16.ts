import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew16: BlogPost[] = [
  {
    slug: "growth-loops-cripto-referral-quests",
    title: "Growth loops em cripto: referral, quests e pontos que escalam de verdade",
    seoTitle: "Growth loops em cripto: referral, quests e pontos",
    excerpt:
      "Funil linear queima orçamento. Growth loop se alimenta do próprio output: referral on-chain, quests, sistemas de pontos e UGC. Veja como desenhar incentivo que retém em vez de atrair mercenário.",
    seoDescription:
      "Como desenhar growth loops em cripto: referral on-chain, quests estilo Galxe e Zealy, sistemas de pontos sem virar farm e incentivos que retêm usuário real.",
    category: "growth",
    author: AUTHOR,
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-16",
    readTime: 12,
    featured: false,
    coverImage: "",
    tags: [
      "growth loops",
      "referral cripto",
      "quests web3",
      "sistemas de pontos",
      "gamificação",
      "retenção web3",
      "airdrop farming",
      "marketing cripto",
    ],
    tldr:
      "Funil linear compra atenção e ela evapora. Growth loop transforma o output de cada usuário em aquisição do próximo: referral on-chain, quests, pontos e UGC. O risco é atrair mercenário de airdrop. A solução é recompensar retenção (recorrência, profundidade, permanência), não volume bruto. Quem desenha o incentivo desenha o público.",
    faq: [
      {
        question: "Qual a diferença entre growth loop e funil de marketing?",
        answer:
          "O funil é linear: você compra atenção no topo, converte uma fração e o processo termina no usuário adquirido. Cada novo usuário exige novo investimento. O growth loop é circular: o output de um usuário (convite, conteúdo, transação visível on-chain) vira input de aquisição do próximo. Quando o loop fecha, o crescimento se torna composto e o custo de aquisição cai com a escala, em vez de subir.",
      },
      {
        question: "Sistemas de pontos em cripto funcionam ou só atraem farmers?",
        answer:
          "Funcionam quando recompensam comportamento que o protocolo quer manter, e viram farm quando recompensam volume bruto. Blur usou pontos para tomar volume do OpenSea em 2023 e Blast acumulou bilhões em TVL antes do mainnet em 2024, mas boa parte desse capital era mercenário. O desenho correto pontua recorrência, permanência e profundidade de uso, com decaimento para atividade inativa e critérios anti-Sybil.",
      },
      {
        question: "O que são plataformas de quests como Galxe e Zealy?",
        answer:
          "São plataformas onde projetos publicam missões (seguir perfil, testar produto, executar transação on-chain) e recompensam a conclusão com credenciais, NFTs, pontos ou vaga em whitelist. Galxe opera desde 2021 (como Project Galaxy) com credenciais verificáveis on-chain, e Zealy (ex-Crew3, renomeada em 2023) foca em missões de comunidade. Funcionam bem para onboarding guiado e mal quando viram checklist de engajamento vazio.",
      },
      {
        question: "Como fazer referral on-chain sem inflar métrica com carteiras falsas?",
        answer:
          "Amarrando a recompensa ao comportamento do indicado, não ao cadastro. O modelo do GMX, no ar desde 2022, paga o indicador com percentual das taxas reais geradas pelo indicado: sem volume real, sem recompensa. Complementos úteis: exigir ação econômica mínima antes de liberar bônus, aplicar análise de grafo de carteiras para detectar clusters Sybil e liberar recompensas de forma escalonada no tempo.",
      },
      {
        question: "Como a Kaleidos desenha growth loops para projetos cripto?",
        answer:
          "A Kaleidos parte do comportamento que o protocolo precisa reter (não da métrica de vaidade), mapeia qual loop se aplica (referral, quests, pontos ou UGC), define recompensas atreladas a retenção e uso real, e instrumenta a medição: K-factor, retenção por cohort e custo por usuário retido. O objetivo é sempre usuário que fica depois do incentivo, não pico de atividade que evapora no snapshot.",
      },
    ],
    content: `# Growth loops em cripto: referral, quests e pontos que escalam de verdade

Todo projeto cripto conhece o ciclo: campanha, pico de usuários, snapshot, queda. O gráfico de atividade vira uma montanha russa que acompanha o calendário de incentivos, não o valor do produto. Isso acontece porque a maioria dos projetos ainda pensa em funil quando deveria pensar em loop.

A tese da Kaleidos é direta: em cripto, crescimento sustentável não vem de comprar atenção repetidamente, vem de desenhar sistemas onde o próprio uso do protocolo gera o próximo usuário. Referral on-chain, quests, pontos e conteúdo gerado pela comunidade são as quatro engrenagens desse sistema. Mas cada uma delas tem um modo de falha conhecido: atrair o mercenário de airdrop em vez do usuário real. Este artigo mostra como montar cada loop e como evitar que ele vire fazenda.

## Principais takeaways

- Funil linear exige investimento contínuo; growth loop transforma o output de cada usuário em aquisição do próximo, com custo marginal decrescente.
- Referral on-chain só funciona quando a recompensa está atrelada ao comportamento econômico do indicado, como no modelo do GMX (2022), e não ao cadastro.
- Quests (Galxe, Zealy, Layer3) são excelentes para onboarding guiado e péssimas quando viram checklist de engajamento vazio.
- Sistemas de pontos escalam rápido (Blur em 2023, Blast e EigenLayer em 2024), mas atraem capital mercenário se pontuarem volume bruto em vez de permanência.
- O incentivo define o público: recompense retenção, profundidade e recorrência, e meça K-factor e cohort, não pico de atividade.

## Funil linear vs growth loop: por que o funil quebra em cripto

O funil clássico funciona assim: você investe em mídia ou parcerias, atrai visitantes, converte uma fração em usuários e o processo termina ali. Cada novo usuário custa aproximadamente o mesmo que o anterior. Em mercados maduros isso é administrável. Em cripto, é fatal por dois motivos.

Primeiro, os canais pagos tradicionais são restritos ou caros para o setor: Google e Meta impõem políticas específicas para anúncios de cripto, e o CAC via mídia paga fica proibitivo para a maioria dos protocolos. Segundo, o público cripto é nativamente especulativo: se a única razão para entrar é um incentivo pontual, a saída acontece no momento em que o incentivo termina.

O growth loop inverte a lógica. Em vez de um processo com começo e fim, você desenha um circuito: o usuário entra, usa o produto, e esse uso produz um artefato (um convite, um post, uma transação visível, uma credencial) que traz o próximo usuário. O output de um ciclo é o input do seguinte. Quando o loop fecha com coeficiente viral positivo, o crescimento se torna composto: cada cohort de usuários gera parte da cohort seguinte, e o custo de aquisição cai com a escala em vez de subir.

Cripto tem uma vantagem estrutural aqui que quase nenhum outro mercado tem: o comportamento do usuário é público e verificável on-chain. Isso permite recompensar ações reais (depositar, negociar, manter posição) em vez de proxies fracos como clique ou cadastro. O problema é que a mesma transparência que permite recompensar comportamento real também permite simular comportamento real em escala industrial. Todo o desenho de incentivos em cripto é uma disputa entre essas duas forças.

## Referral on-chain: o loop mais antigo, agora verificável

Programa de indicação existe desde antes da internet. O que cripto adiciona é a verificabilidade: você não precisa confiar no autorreporte, o comportamento do indicado está na chain.

O caso de referência é o GMX, exchange descentralizada de perpétuos que opera seu programa de referral on-chain desde 2022: quem indica recebe um percentual das taxas de trading efetivamente geradas pelos indicados, e o indicado recebe desconto nas próprias taxas. O detalhe que importa é o gatilho da recompensa. O indicador não ganha nada quando alguém usa seu código; ganha quando alguém negocia de verdade. Sem volume real, sem recompensa. Isso alinha o incentivo do indicador com o interesse do protocolo: ele quer trazer traders ativos, não carteiras vazias.

Compare com o modelo ingênuo: bônus fixo por cadastro ou por primeira transação. Esse modelo é trivialmente explorável com carteiras Sybil, e o "crescimento" que ele gera é um número em dashboard que não corresponde a nenhum usuário.

Regras práticas para referral on-chain que a Kaleidos aplica:

- **Recompensa proporcional ao comportamento, nunca ao cadastro.** Percentual de taxas, share de yield, pontos por volume retido.
- **Ação econômica mínima antes de liberar qualquer bônus**: depósito com valor de piso, período mínimo de atividade.
- **Vesting da recompensa**: liberar o bônus ao longo de semanas ou meses filtra quem veio só pelo prêmio imediato.
- **Análise de grafo**: clusters de carteiras financiadas pela mesma origem e criadas em sequência são o padrão Sybil mais comum e são detectáveis.

## Quests: onboarding guiado, não checklist de vaidade

Plataformas de quests transformaram tarefas em produto. A Galxe, lançada em 2021 como Project Galaxy, construiu um sistema de credenciais verificáveis onde projetos publicam missões e usuários acumulam provas de participação on-chain. A Zealy, que operava como Crew3 até o rebrand em 2023, foca em missões de comunidade com leaderboards. A Layer3, no ar desde 2021, empacota quests como jornadas de descoberta de protocolos, com credenciais em formato de NFT.

O valor real das quests não é "engajamento", é **onboarding guiado**. Produto cripto tem fricção alta: bridge, aprovação de token, assinatura, rede certa. Uma quest bem desenhada pega o usuário pela mão através dessa fricção e o recompensa por completar o caminho. No fim, o usuário não só ganhou uma credencial: ele aprendeu a usar o produto, que é o pré-requisito de qualquer retenção.

O modo de falha é conhecido por qualquer um que já abriu uma campanha de quests genérica: "siga no X, entre no Discord, dê RT". Isso não é onboarding, é compra de métrica social com desconto. O usuário que completa essa quest nunca tocou no produto, e o "crescimento" some quando a campanha acaba.

O filtro da Kaleidos para desenhar quests: cada missão precisa responder sim a uma pergunta: **essa ação aproxima o usuário do momento em que o produto se torna útil para ele?** Executar uma primeira transação, prover liquidez de teste, configurar uma feature central: sim. Seguir um perfil: não, ou no máximo como passo acessório de uma jornada que termina dentro do produto.

## Pontos: a arma mais poderosa e a mais perigosa

Sistemas de pontos dominaram o meta de crescimento cripto entre 2023 e 2024, e os dois exemplos canônicos mostram o poder e o risco.

O **Blur** lançou seu sistema de pontos com airdrop em temporadas a partir de 2022 e, em fevereiro de 2023, ultrapassou o OpenSea em volume de negociação de NFTs, segundo dados da DappRadar (2023). Pontos recompensavam listagem e bids, exatamente os comportamentos que geram liquidez em um marketplace. Como loop de aquisição de liquidez, foi devastadoramente eficaz.

A **Blast**, L2 do mesmo fundador, levou o modelo ao extremo: pontos por depósito antes mesmo de a rede existir. O resultado foram mais de US$ 2 bilhões em TVL acumulados antes do lançamento da mainnet em fevereiro de 2024, segundo a DefiLlama (2024). O que veio depois virou lição de manual, que contamos no [teardown do Blast](/blog/teardown-blast-l2-dump-tvl). A **EigenLayer** fez o mesmo com restaking points e passou de US$ 15 bilhões em TVL em 2024 (DefiLlama, 2024), gerando um mercado secundário inteiro de pontos ainda não convertidos em token.

O problema apareceu no segundo ato. Capital que entra por pontos é capital mercenário: depois dos airdrops, tanto Blast quanto boa parte do ecossistema de restaking viram TVL e atividade caírem de forma acentuada ao longo de 2024, conforme registrado pela própria DefiLlama. O padrão não é novo: análises da Nansen (2023) sobre o airdrop do Arbitrum mostraram que a maioria das carteiras contempladas vendeu ou esvaziou a posição nas primeiras semanas após o claim (fizemos um [pós-mortem inteiro sobre como evitar o dump](/blog/airdrop-pos-mortem-evitar-dump)). E o caso friend.tech (2023) virou o exemplo de manual: sistema de pontos gerou frenesi, o airdrop veio em 2024, e a atividade da plataforma colapsou na sequência.

A lição não é "pontos não funcionam". É: **pontos amplificam o comportamento que você escolhe pontuar**. Se você pontua volume bruto, atrai volume bruto simulado. O desenho que retém pontua outra coisa:

- **Recorrência sobre intensidade**: 30 dias de uso moderado valem mais que um dia de volume gigante.
- **Decaimento**: pontos de quem parou de usar perdem peso com o tempo, o que pune o comportamento de "farmar e hibernar até o snapshot".
- **Profundidade**: usar duas ou três features do produto pontua mais que repetir a mesma ação mil vezes.
- **Multiplicador de permanência pós-recompensa**: parte da recompensa condicionada a continuar ativo depois da distribuição.

## Gamificação de comunidade e loops de conteúdo

Os dois loops restantes são menos mensuráveis on-chain e por isso mesmo mais negligenciados.

**Gamificação de comunidade** funciona quando o status é escasso e conquistado, não distribuído. Cargos no Discord que exigem contribuição real (suporte a novatos, conteúdo técnico, participação em governança), leaderboards com temporadas e credenciais on-chain que provam histórico criam uma hierarquia que os membros defendem. O erro comum é inflacionar o status: quando todo mundo tem cargo, ninguém tem.

**Loops de conteúdo (UGC)** são o mecanismo mais subestimado em cripto. O ciclo: usuário usa o produto, produz conteúdo sobre isso (thread, tutorial, análise de yield, screenshot de dashboard), o conteúdo alcança um público novo, parte desse público vira usuário e uma fração deles produz o próximo conteúdo. Projetos que estruturam isso (programas de creators com recompensa por conteúdo que performa, templates prontos, dados abertos que dão matéria-prima para análise) transformam a comunidade em canal de aquisição permanente. O ponto crítico: recompensar qualidade e alcance real, nunca quantidade, ou o loop degenera em spam de shill que queima a marca.

## Como desenhar incentivo que retém em vez de atrair mercenário

Juntando tudo, o framework que a Kaleidos usa para desenhar growth loops em cripto:

1. **Comece pelo comportamento de retenção, não pela métrica de aquisição.** Pergunte: o que um usuário retido de 6 meses faz no seu protocolo? A resposta define o que deve ser recompensado.
2. **Escolha o loop que combina com o produto.** Produto com efeito de rede de liquidez: pontos e referral. Produto com fricção de onboarding: quests. Produto com resultados visíveis e compartilháveis: UGC.
3. **Amarre toda recompensa a valor econômico real**: taxas geradas, tempo de permanência, profundidade de uso. Nunca a cadastro, clique ou follow.
4. **Construa o anti-Sybil desde o dia um**: ação econômica mínima, vesting, análise de grafo, decaimento de pontos.
5. **Meça o loop, não o pico.** As métricas que importam: K-factor (quantos usuários novos cada usuário gera), retenção por cohort em D30 e D90, e custo por usuário retido, não por usuário adquirido.
6. **Aceite perder o mercenário.** Um sistema bem desenhado é menos atrativo para o farmer profissional, e isso é feature. O gráfico sobe mais devagar e não desaba no snapshot.

A regra final é a que resume tudo: **quem desenha o incentivo desenha o público** (e é para onde [o jogo dos airdrops caminha em 2026](/blog/jogo-dos-incentivos-airdrops-2026)). Se o seu programa recompensa volume, você terá simuladores de volume. Se recompensa permanência e uso real, você terá usuários. Não existe mecânica esperta o suficiente para compensar um incentivo apontado para o comportamento errado.

## Construa loops, não campanhas

A diferença entre um protocolo que cresce e um que oscila ao ritmo dos incentivos não é o tamanho do orçamento de growth: é se o crescimento foi desenhado como circuito ou como evento.

A Kaleidos desenha e opera growth loops para projetos cripto e web3: da arquitetura de incentivos (referral, quests, pontos) à camada de conteúdo e comunidade que fecha o ciclo, com medição por cohort e foco em usuário retido, não em pico de vaidade. Se o seu protocolo vive o ciclo de campanha, pico e queda, [fale com a Kaleidos](/contato). O próximo incentivo pode ser o último que você precisa comprar.
`,
  },
];
