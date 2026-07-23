import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew25: BlogPost[] = [
  {
    slug: "teardown-blast-l2-dump-tvl",
    title: "Teardown Blast: o L2 que despejou o token e perdeu TVL",
    seoTitle: "Teardown Blast: o L2 que perdeu 97% do TVL",
    excerpt:
      "O Blast atraiu US$ 2,2 bilhões de TVL antes de ter mainnet e perdeu 97% do TVL depois do airdrop. A Kaleidos disseca o hype, o programa de pontos, o TGE frustrado e o que todo projeto web3 deveria aprender com o colapso.",
    seoDescription:
      "Teardown do Blast: como o L2 de Pacman atraiu US$ 2,2 bi de TVL antes do mainnet, despejou o token no TGE de 2024 e viu o TVL cair 97%. Análise e lições da Kaleidos.",
    category: "cases",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 11,
    featured: false,
    coverImage: "",
    tags: [
      "Blast L2",
      "airdrop",
      "programa de pontos",
      "TGE",
      "TVL",
      "capital mercenário",
      "marketing cripto",
      "teardown",
    ],
    tldr:
      "O Blast usou bridge sem saque, convites e pontos para levar o TVL a US$ 2,2 bilhões em junho de 2024 (DefiLlama). Após o airdrop, o TVL caiu 97%, para cerca de US$ 65 milhões, e os usuários diários despencaram de 77 mil para 3,5 mil. Hype compra depósito, não retenção.",
    faq: [
      {
        question: "O que foi o Blast e quem criou o projeto?",
        answer:
          "O Blast é um layer 2 de Ethereum criado por Tieshun Roquerre, o Pacman, fundador do marketplace de NFTs Blur. Foi anunciado em novembro de 2023 com rodada de US$ 20 milhões liderada pela Paradigm e Standard Crypto (The Block, 2023). O diferencial de produto era o yield nativo: ETH e stablecoins depositados na rede rendiam automaticamente, sem o usuário precisar fazer staking manual.",
      },
      {
        question: "Quanto o Blast tinha de TVL antes e depois do airdrop?",
        answer:
          "O TVL do Blast atingiu o pico de US$ 2,2 bilhões em junho de 2024, um mês antes do TGE, segundo a DefiLlama. Após o airdrop de 26 de junho de 2024 e os meses seguintes de fuga de capital, o TVL desabou cerca de 97%, chegando a aproximadamente US$ 65 milhões em 2025 (DefiLlama via The Defiant, 2025). Os usuários ativos diários caíram de 77 mil no pico para cerca de 3,5 mil (Token Terminal, 2025).",
      },
      {
        question: "Por que o airdrop do Blast frustrou a comunidade?",
        answer:
          "Porque a expectativa criada foi muito maior que a entrega. Farmers travaram capital por meses esperando avaliação de US$ 5 a 10 bilhões, mas o token BLAST abriu a cerca de US$ 2,9 bilhões de valuation totalmente diluído (Brave New Coin, 2025). Alocações menores que o esperado para quem tinha depositado grandes valores, somadas à distribuição de 17 bilhões de tokens na Fase 1, geraram pressão vendedora imediata e sensação generalizada de esforço mal recompensado.",
      },
      {
        question: "O modelo de bridge sem saque do Blast era sustentável?",
        answer:
          "Não, e a crítica veio até da própria investidora. A Paradigm declarou publicamente que o lançamento do Blast cruzou linhas, por abrir a bridge antes de existir o L2 e por travar saques por três meses (Decrypt, 2023). O modelo funcionou como máquina de captação de curto prazo: US$ 603 milhões na primeira semana (CoinDesk, 2023). Mas capital que entra por FOMO e trava por obrigação sai na primeira janela aberta, como o pós-airdrop provou.",
      },
      {
        question: "Que lições o caso Blast deixa para projetos web3?",
        answer:
          "Três principais. Primeira: pontos e airdrops compram depósito, não lealdade; sem produto com uso recorrente, o capital é mercenário e vai embora no TGE. Segunda: expectativa é passivo de marketing; prometer implícita ou explicitamente um valuation que o mercado não paga transforma o lançamento em decepção coletiva. Terceira: a curva de TVL pré-token é métrica de campanha, não de tração; quem confunde as duas planeja o pós-TGE errado.",
      },
    ],
    content: `# Teardown Blast: o L2 que despejou o token e perdeu TVL

Poucos lançamentos em cripto foram tão bem executados no marketing e tão mal resolvidos no dia seguinte quanto o Blast. Em novembro de 2023, o layer 2 criado por Pacman, o mesmo fundador do Blur, captou US$ 603 milhões em uma semana com um site, uma bridge sem função de saque e um sistema de convites (CoinDesk, 2023). Em junho de 2024, chegou ao pico de US$ 2,2 bilhões em TVL (DefiLlama, 2024). Um ano depois do airdrop, restavam cerca de US$ 65 milhões: queda de 97% (DefiLlama via The Defiant, 2025).

A Kaleidos disseca esse case porque ele condensa, em um único projeto, quase tudo que o marketing cripto fez de mais eficiente e de mais frágil no ciclo 2023-2024. O Blast não fracassou por falta de atenção. Fracassou porque toda a atenção foi desenhada para terminar num único evento: o snapshot do airdrop.

## Principais takeaways

- O Blast levantou US$ 20 milhões com Paradigm e Standard Crypto e abriu depósitos em novembro de 2023, três meses antes de existir uma rede funcional (The Block, 2023).
- A mecânica de lançamento combinou três alavancas: yield nativo como promessa de produto, bridge sem saque como escassez forçada e convites com pontos como loop viral.
- O TVL saiu de zero para US$ 603 milhões em uma semana (CoinDesk, 2023) e atingiu US$ 2,2 bilhões em junho de 2024, um mês antes do TGE (DefiLlama, 2024).
- O airdrop de 26 de junho de 2024 distribuiu 17 bilhões de tokens BLAST e abriu a um valuation de US$ 2,9 bilhões, bem abaixo dos US$ 5 a 10 bilhões que farmers projetavam (Brave New Coin, 2025).
- O pós-TGE foi êxodo: TVL caiu 97% e os usuários ativos diários despencaram de 77 mil para cerca de 3,5 mil (Token Terminal, 2025).
- A lição central: incentivo desenha comportamento. Se o incentivo termina no snapshot, o público também termina.

## O setup: pedigree, escassez e uma promessa de yield

Todo lançamento forte em cripto começa com uma resposta convincente para a pergunta "por que confiar". O Blast tinha três respostas prontas.

A primeira era o fundador. Pacman vinha de entregar o Blur, o marketplace que tomou volume do OpenSea usando um sistema de pontos agressivo em 2023. O histórico funcionava como prova social: quem farmou Blur e recebeu airdrop generoso acreditava que a história ia se repetir.

A segunda era o capital. A rodada de US$ 20 milhões liderada pela Paradigm, um dos fundos mais respeitados do setor, com participação da Standard Crypto, dava selo institucional ao projeto (The Block, 2023).

A terceira era a promessa de produto: yield nativo. Diferente de outros L2s, onde o ETH depositado fica parado, o Blast prometia repassar automaticamente o rendimento de staking e de T-bills tokenizados para o saldo do usuário. Era um pitch simples de entender: seu dinheiro rende só por estar aqui.

Com essas três peças, o Blast fez algo que hoje parece óbvio e na época era ousado: abriu depósitos antes de ter rede. A bridge aceitava ETH, mas não devolvia. O saque só seria liberado no mainnet, previsto para fevereiro de 2024. Quem entrava, entrava trancado por três meses.

## A mecânica de hype: pontos, convites e trava de capital

O desenho da campanha pré-mainnet merece análise fria, porque foi tecnicamente impecável como máquina de aquisição.

O acesso era por convite. Cada usuário que entrava ganhava códigos para chamar outros, e ganhava pontos sobre a atividade dos convidados. Isso transformou cada depositante em canal de distribuição: o Twitter cripto virou um mural de códigos de convite do Blast em questão de dias.

Os pontos eram a moeda da expectativa. Sem utilidade definida, sem taxa de conversão anunciada, mas com um entendimento implícito herdado do Blur: pontos viram token, e token vira dinheiro. O usuário não estava depositando ETH numa bridge; estava comprando um bilhete de loteria cujo prêmio ele mesmo estimava.

E a trava de saque completava o sistema. Capital que não pode sair não gera pressão vendedora de narrativa. O TVL só podia subir, e cada milestone de TVL virava manchete, e cada manchete trazia mais depósito. Em uma semana, US$ 603 milhões (CoinDesk, 2023). Antes do mainnet, mais de US$ 2 bilhões acumulados.

O detalhe revelador: a crítica mais dura veio de dentro. A própria Paradigm afirmou publicamente que o lançamento cruzou linhas, por abrir a bridge antes do L2 existir e por travar saques por três meses, dizendo que isso criava um precedente ruim para o setor (Decrypt, 2023). Pacman rebateu as comparações com esquema Ponzi e seguiu com o plano (The Block, 2023). Quando a sua investidora líder critica a mecânica em público e o TVL continua subindo, o mercado está dizendo algo sobre si mesmo: no ciclo de 2023, o FOMO batia a diligência.

## O mainnet e a corrida ao snapshot

O mainnet chegou no fim de fevereiro de 2024 e liberou os saques. Aqui está o primeiro dado que qualquer estrategista deveria estudar: o capital não saiu. Ao contrário, o TVL continuou crescendo até o pico de US$ 2,2 bilhões em junho de 2024 (DefiLlama, 2024).

Por quê? Porque o airdrop ainda não tinha acontecido. Sacar antes do snapshot significava abandonar meses de pontos acumulados. A trava contratual da bridge foi substituída por uma trava psicológica igualmente eficaz: custo irrecuperável.

Nesse período o Blast também rodou o Big Bang, competição de dapps para povoar o ecossistema, e distribuiu Gold, uma segunda camada de pontos destinada a desenvolvedores. No papel, era construção de ecossistema. Na prática, boa parte dos apps nasceu com o mesmo desenho de incentivo da rede: atrair volume para maximizar alocação de airdrop. O ecossistema inteiro estava apontado para a mesma data.

Os sinais de fragilidade já apareciam antes do TGE. Em fevereiro de 2024, o RiskOnBlast, um projeto de gambling do ecossistema, deu rug pull e sumiu com cerca de 500 ETH, na época US$ 1,3 milhão (Brave New Coin, 2025). Em março, o jogo Super Sushi Samurai sofreu exploit de US$ 4,6 milhões (Brave New Coin, 2025). Ecossistemas montados às pressas para capturar um snapshot atraem builders com o mesmo horizonte de tempo dos farmers.

## O TGE: quando a expectativa cobra a conta

Em 26 de junho de 2024, o Blast distribuiu 17 bilhões de tokens BLAST na Fase 1 do airdrop (CoinDCX, 2024). E o evento que deveria coroar a campanha virou o começo do fim.

O problema não foi operacional. Foi aritmético. Durante meses, farmers fizeram contas com valuations de US$ 5 a 10 bilhões, extrapolando o histórico do Blur e o tamanho do TVL. O token abriu a cerca de US$ 2,9 bilhões de valuation totalmente diluído (Brave New Coin, 2025). Para quem travou seis dígitos por seis meses, a alocação recebida representava um retorno percentual pequeno sobre o capital imobilizado, às vezes menor que o rendimento que esse capital teria em DeFi comum.

A reação foi a que qualquer modelo de incentivos previa: venda e saque. Quem recebeu o token vendeu, porque o token era o pagamento pelo trabalho de farmar. Quem tinha capital na rede sacou, porque o motivo de estar lá tinha deixado de existir. Não houve um segundo ato planejado: nenhum motivo novo para ficar que não fosse a Fase 2 de pontos, uma repetição enfraquecida do mesmo truque.

## O colapso em números

A curva pós-TGE é um dos gráficos mais didáticos da história recente dos L2s:

- TVL: do pico de US$ 2,2 bilhões em junho de 2024 para cerca de US$ 65 milhões, queda de 97% (DefiLlama via The Defiant, 2025).
- Usuários ativos diários: de 77 mil no pico pós-airdrop para cerca de 3,5 mil (Token Terminal, 2025).
- Token BLAST: queda de aproximadamente 91% desde a máxima histórica, negociado a cerca de US$ 250 milhões de FDV (Brave New Coin, 2025).

Repare no contraste: o marketing de aquisição do Blast foi possivelmente o mais eficiente do ciclo, levando um produto sem rede a US$ 2 bilhões de captação. E a retenção foi de aproximadamente 3% do capital. O mesmo desenho que maximizou a entrada garantiu a saída.

## Lições

A Kaleidos extrai cinco lições deste teardown, aplicáveis a qualquer projeto que esteja planejando pontos, airdrop ou TGE (elas complementam o nosso [pós-mortem de airdrops](/blog/airdrop-pos-mortem-evitar-dump)).

**1. Incentivo desenha o público, e o público do Blast era o snapshot.** Quando a recompensa dominante é um evento único de distribuição, você recruta pessoas otimizando para esse evento (é o princípio central dos [growth loops em cripto](/blog/growth-loops-cripto-referral-quests)). O comportamento pós-evento já está escrito antes da campanha começar. Se o plano de retenção é "vamos lançar a Fase 2 de pontos", não existe plano de retenção.

**2. TVL pré-token é métrica de campanha, não de tração.** Os US$ 2,2 bilhões do Blast mediam a eficiência do funil de farming, não a demanda pelo produto. Projetos que leem TVL inflado por incentivo como product-market fit dimensionam equipe, tesouraria e roadmap sobre uma base que vai evaporar. O dado honesto é o que sobra 90 dias depois do TGE.

**3. Expectativa é um passivo no balanço do marketing.** O Blast nunca prometeu formalmente um valuation, mas toda a comunicação alimentou a extrapolação do caso Blur. Quando o mercado precificou o token abaixo da fantasia coletiva, a diferença virou frustração pública. Gerenciar expectativa para baixo antes do TGE é desconfortável e necessário; a alternativa é transformar o dia mais importante do projeto em decepção coletiva.

**4. Produto precisa de um motivo de permanência que sobreviva ao incentivo.** O yield nativo era um diferencial real, mas rendimento de staking está disponível em qualquer lugar do DeFi sem trava e sem risco de execução de um L2 novo. A pergunta de sobrevivência é: o que este produto oferece que o usuário não consegue igual ou melhor em outro lugar, depois que os pontos acabam? Se a resposta demora, o TGE deveria esperar.

**5. Crítica de insider é sinal antecipado, não ruído.** Quando a Paradigm, investidora líder, disse em público que o lançamento cruzou linhas (Decrypt, 2023), o mercado tratou como drama de bastidor. Era diagnóstico. Times de marketing tendem a filtrar críticas durante a euforia porque os números sobem apesar delas. Os números do Blast subiram por sete meses depois do alerta, e o desfecho confirmou o alerta, não a euforia.

## O que a Kaleidos faria diferente

Um lançamento com o pedigree e o capital do Blast tinha condições de construir algo duradouro. O redesenho passa por três frentes: recompensar comportamento recorrente em vez de depósito parado, com pontos que decaem sem uso real; escalonar a distribuição do token em função de retenção pós-TGE, não de volume pré-snapshot; e comunicar faixas realistas de alocação antes do evento, trocando o pico de FOMO por confiança que sobrevive à listagem. É a direção que o mercado inteiro está tomando, como mostramos em [como os airdrops vão mudar em 2026](/blog/jogo-dos-incentivos-airdrops-2026).

Se o seu projeto está desenhando programa de pontos, planejando TGE ou tentando entender por que o TVL não fica depois do incentivo, esse é exatamente o tipo de problema que a Kaleidos resolve. Somos uma agência especializada em marketing para cripto e web3, e trabalhamos lançamento como sistema completo: aquisição, expectativa, distribuição e o dia seguinte. [Fale com a Kaleidos](/contato) e vamos desenhar um lançamento que não termina no snapshot.`,
  },
];
