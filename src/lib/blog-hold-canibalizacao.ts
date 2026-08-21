import type { BlogPost } from "./blog-data";

/**
 * POSTS EM HOLD POR CANIBALIZAÇÃO — 21/08/2026.
 *
 * Este arquivo NÃO é importado por `blog-data.ts`. Nada aqui vira URL, entra em
 * sitemap, RSS ou listagem. É um armário, não uma lixeira: o texto está inteiro
 * e as capas seguem em `public/blog/<slug>/cover.png`.
 *
 * Motivo, post a post:
 *
 * 1. `web3-marketing-arte-perdida-onde-projetos-erram`
 *    Título IDÊNTICO ao de `web3-marketing-arte-perdida` (blog-new-32.ts, no ar
 *    desde 12/07). Mesma tese, mesma estrutura de "quatro erros", e 3 dos 4 erros
 *    se repetem — inclusive a mesma pergunta-teste ("se o incentivo acabasse
 *    amanhã, quem continuaria usando?"). O post no ar é mais longo (11,6k vs 7k),
 *    está indexado há mais de um mês e recebe link interno de outros posts.
 *    O que este tem de próprio são as fontes linkadas que faltam no publicado:
 *    a queda de 98,6% do TVL da Blast (DefiLlama), os números do State of Crypto
 *    2025 da a16z e o crédito ao ensaio de Alexandra Thompson que originou a
 *    expressão "arte perdida". → PENDENTE: fundir esse material no post publicado.
 *
 * 2. `sell-pressure-unlock-vesting-marketing-invisivel-do-token`
 *    Sobrepõe `tokenomics-e-marketing-sell-buy-pressure` (blog-new-20.ts, no ar
 *    desde 12/07). O publicado já tem a seção "Unlocks mal comunicados" com o
 *    mesmo playbook de 4 movimentos (antecipação, enquadramento, absorção,
 *    follow-up) e já fecha com "trate o calendário de unlocks como calendário
 *    editorial", que é a conclusão deste. Precedente que pesa: o slug
 *    `tokenomics-e-marketing-sell-buy-pressure-growth` JÁ foi removido do ar por
 *    canibalizar esse mesmo post (ver CANNIBALIZED_SLUGS em blog-data.ts).
 *    Material próprio a aproveitar: as alavancas de desenho (modelo ve da Curve,
 *    esGMX + Multiplier Points da GMX), o desempenho da safra de lançamentos de
 *    2025 e a citação da Gate. → PENDENTE: fundir no post publicado.
 *
 * Os dois merges caem em arquivos `blog-new-*.ts`, que estavam sob edição de
 * outra sessão em 21/08 e por isso não foram tocados aqui.
 */
export const blogHoldCanibalizacao: BlogPost[] = [
  {
    "slug": "sell-pressure-unlock-vesting-marketing-invisivel-do-token",
    "title": "Gestão de sell pressure: o marketing invisível do token",
    "seoTitle": "Sell pressure e unlocks: o marketing invisível do token",
    "excerpt": "O calendário de unlock do seu token é uma peça de comunicação, e quase nenhum projeto trata assim. Vesting, cliff e a conversa que o time não tem com a comunidade antes do supply cair no mercado.",
    "seoDescription": "Como gerir sell pressure em cripto: vesting, cliff, calendário de unlock e a comunicação que evita que o supply novo derrube o preço do token.",
    "content": "Semana passada eu abri o calendário de unlock de um token que a gente acompanha e ele mostrava um cliff grande caindo dali a cinco semanas. Perguntei ao time de marketing o que estava planejado para aquela data. A resposta foi que ninguém tinha pensado nisso, porque unlock era assunto do jurídico.\n\nEssa frase resume por que tantos projetos bons morrem de causa evitável. O unlock é o único evento de mercado que o projeto conhece com meses de antecedência, que está escrito em contrato, que qualquer pessoa pode consultar, e ainda assim ele costuma chegar como surpresa para a comunidade. Não é falha de tokenomics. É falha de comunicação.\n\nEste post é sobre tratar supply como pauta editorial. Essa decisão mexe no preço mais do que qualquer campanha que você vai rodar no ano.\n\n## O mecanismo do dano, em quatro passos\n\nAntes da comunicação, o desenho. O padrão que quebrou o ciclo de altcoins recente tem nome, e ele funciona sempre igual:\n\n1. O projeto lança com pouco supply circulante e um FDV altíssimo. A escassez artificial empurra o preço para cima no dia um.\n2. A maior parte do supply fica travada com seed, private, VCs e time.\n3. Quando o vesting começa, os unlocks periódicos injetam supply novo num mercado que nunca teve liquidez para absorver aquilo.\n4. O preço desaba, de forma previsível, conforme insiders vendem tokens comprados a frações de centavo.\n\nA Gate deu a esse desenho o nome mais honesto que já li: [\"um rug pull lento, legal, executado pelo próprio projeto\"](https://www.gate.com/learn/articles/time-scheduled-token-unlocks-an-elephant-in-the-room/4895). Não há trapaça no sentido técnico. Há um desalinhamento estrutural: o supply é rígido porque está programado em smart contract, a demanda é imprevisível, e o desenho coloca time e investidores em rota de colisão com a comunidade.\n\nOs números sustentam a tese. Segundo a CoinGecko, [um em cada cinco dos maiores criptoativos](https://www.coingecko.com/research/publications/low-vs-high-float-crypto) é low float com grandes unlocks pendurados no futuro. E a performance dos lançamentos recentes segue um padrão cruel: uma cesta equal-weighted dos lançamentos de 2025 fechou em torno de 33% negativos, enquanto a mesma cesta ponderada por FDV ficou perto de 61% negativos. Traduzindo: quanto maior o lançamento, pior o resultado.\n\nOs casos são conhecidos. A Berachain saiu de mais de US$ 4 bilhões de valuation para a casa dos US$ 300 milhões. O XPL da Plasma viu o FDV bater perto de US$ 17 bilhões depois do TGE e recuar para cerca de US$ 1,2 bilhão. SUI e STRK lançaram com FDV acima de US$ 20 bilhões e figuram entre os piores desempenhos do período. A lista dos que fecharam positivos trinta dias depois do TGE é curta a ponto de caber numa linha: HYPE, TIA, ONDO e ENA. A [Unchained resume a culpa como compartilhada](https://unchainedcrypto.com/whos-to-blame-for-the-underperformance-of-low-float-high-fdv-tokens/) entre VCs que pediram valuation alta, projetos que aceitaram e exchanges que listaram com float baixo.\n\n## Por que isso é problema de marketing\n\nO contra-argumento que eu ouço é que nada disso é marketing, é matemática. Discordo, e por um motivo específico.\n\nPreço de token é função de duas coisas: supply que chega ao mercado e demanda que espera por ele. O time de tokenomics controla o primeiro lado. O segundo lado é literalmente o trabalho de marketing. Quando o marketing não sabe quando o supply cai, ele não tem como construir demanda para aquele momento. O resultado é liquidez nova encontrando um mercado vazio, e um mercado vazio só serve para quem está vendendo.\n\nTem um segundo efeito, mais sutil e mais caro. Unlock não comunicado vira narrativa hostil por padrão. O detentor descobre o supply novo pelo gráfico, não pelo projeto, e a leitura dele é sempre a mesma: os insiders sabiam e eu não. Uma vez que essa leitura se instala, ela contamina tudo que vier depois, inclusive as boas notícias. Você passa a gastar comunicação defendendo a sua honestidade em vez de construir produto.\n\nVale a pergunta franca: se o seu calendário de unlock é público de qualquer forma, o que exatamente você ganha ficando calado?\n\n## O playbook de comunicação de unlock\n\nO que a gente aplica é simples de descrever e raro de ver executado.\n\n**Publique o calendário antes de alguém publicar por você.** Dashboards de terceiros já mostram o seu schedule. A escolha real não é entre divulgar ou esconder, é entre ser a fonte primária do seu próprio dado ou ceder essa posição para um agregador que não vai contextualizar nada. Fonte primária é uma vantagem de narrativa que custa uma página no site.\n\n**Avise com antecedência maior que o horizonte do trader.** Comunicar o unlock na véspera é confissão, não comunicação. Semanas antes, o mercado precifica com calma. Horas antes, o mercado entra em pânico. É o mesmo fato com dois resultados opostos, e a única variável é quando você falou.\n\n**Nomeie quem destrava e o que se espera do dinheiro.** \"Serão liberados X tokens\" é ruído. \"Serão liberados X tokens da alocação de time, com lockup voluntário adicional de Y meses para os fundadores\" é informação. A diferença entre as duas frases é a diferença entre um evento de medo e um evento de rotina.\n\n**Tenha o que dizer no dia.** Unlock é uma data com atenção garantida. É uma das poucas do calendário do projeto. Chegar nela sem entrega de produto, sem número de uso, sem nada além do próprio unlock é desperdiçar a atenção no pior momento possível, quando ela está apontada para o supply.\n\n## As alavancas de desenho que reduzem a pressão\n\nComunicação não conserta desenho ruim. Se o vesting joga supply gigante contra um mercado raso, nenhuma nota de blog vai segurar o preço. Quatro alavancas mudam o comportamento de quem recebe token:\n\n- **Vesting da recompensa.** O token ganho não fica líquido na hora, ele libera ao longo de meses. Quem sai cedo abre mão do que ainda não vestiu.\n- **Multiplicador de duração.** Quanto mais tempo o usuário trava, maior o peso dele. Premia permanência em vez de volume depositado.\n- **Cooldown de saque.** Uma janela de espera entre pedir e receber. Tira o gatilho impulsivo de fuga no primeiro dip.\n- **Penalidade de saída antecipada.** Sair antes do prazo custa uma fatia do acumulado. O churn passa a ter preço.\n\nDois desenhos mostram isso soldado na arquitetura, não colado por cima. A Curve criou o modelo vote-escrow: para ganhar boost máximo de recompensa e poder de voto, o usuário tranca CRV por até quatro anos, e quanto mais longo o lock, maior o peso. Virou padrão copiado por dezenas de protocolos. A GMX combina vesting com penalidade: as recompensas em esGMX vestem de forma linear ao longo de um ano antes de virarem token líquido, e o sistema de Multiplier Points queima parte do bônus acumulado de quem desfaz o stake. Sair cedo dói, e doer é o ponto.\n\nRepare que nenhuma dessas alavancas é campanha. Elas são decisões de produto que produzem efeito de marketing, o que é exatamente o motivo de tokenomics não poder ser decidida sem a mesa de marketing na sala.\n\n## O que fica\n\nSell pressure é o marketing invisível do token porque ele opera o tempo todo, em silêncio, contra ou a favor de tudo que você publica. O projeto que ignora isso gasta orçamento construindo demanda que evapora no dia em que o supply chega, e depois culpa o mercado.\n\nO ponto de partida não custa dinheiro nenhum: pegue o seu calendário de unlock, coloque as próximas três datas no mesmo calendário editorial onde estão os seus lançamentos de conteúdo, e responda o que o projeto vai ter para dizer em cada uma delas. Se a resposta for \"nada\", você acabou de descobrir o seu maior risco de comunicação dos próximos seis meses, e ainda dá tempo de resolver.\n\nSe você está desenhando um lançamento e quer o calendário de supply e o calendário editorial na mesma mesa, é esse tipo de operação que a gente monta na Kaleidos. Fala com a gente em [/contato](/contato).",
    "coverImage": "/blog/sell-pressure-unlock-vesting-marketing-invisivel-do-token/cover.png",
    "category": "growth",
    "author": {
      "name": "Gabriel Madureira",
      "avatar": "/Kaleidos/imagens/Equipe/Madureira.png"
    },
    "publishedAt": "2026-08-25",
    "updatedAt": "2026-08-25",
    "readTime": 7,
    "featured": false,
    "tldr": "Sell pressure não é assunto de tesouraria, é assunto de comunicação. O calendário de unlock é público, previsível e programado em contrato, e mesmo assim a maioria dos projetos deixa o mercado descobrir sozinho. Quem comunica unlock com antecedência, nomeia quem vende e por quê, e desenha vesting que não joga supply contra mercado raso, transforma um evento de pânico em um evento de rotina.",
    "tags": [
      "tokenomics",
      "unlock",
      "vesting",
      "sell pressure",
      "token launch",
      "marketing cripto",
      "growth"
    ],
    "faq": [
      {
        "question": "O que é sell pressure em cripto?",
        "answer": "É a pressão vendedora que surge quando entra supply novo no mercado, tipicamente em eventos de unlock, quando tokens de time, investidores ou recompensas deixam de estar travados e passam a poder ser vendidos. Ela é previsível porque o cronograma está programado em contrato, o que a torna, na prática, um evento de calendário e não um acidente de mercado."
      },
      {
        "question": "Vale a pena divulgar o calendário de unlock?",
        "answer": "Vale, e a alternativa é pior do que parece. Dashboards de terceiros já publicam o cronograma de qualquer token com vesting on-chain, então o dado é público de qualquer maneira. Ficar calado não esconde nada, só entrega a narrativa para quem não tem compromisso em contextualizar. Ser a fonte primária do próprio dado é a única posição defensável."
      },
      {
        "question": "Qual a diferença entre cliff e vesting linear?",
        "answer": "No cliff, um volume grande destrava de uma vez numa data específica. No vesting linear, o mesmo volume se distribui em liberações menores ao longo do tempo. O cliff concentra a pressão num único dia e costuma produzir movimento brusco de preço; o linear dilui, o que facilita a absorção pelo mercado, mas exige comunicação contínua em vez de pontual."
      },
      {
        "question": "Comunicar bem o unlock impede o preço de cair?",
        "answer": "Não. Comunicação não cria demanda onde não existe e não anula matemática de supply. O que ela muda é a natureza do evento: unlock avisado com semanas de antecedência é precificado com calma e não gera crise de confiança, enquanto unlock descoberto pelo gráfico vira acusação de má-fé que contamina toda a comunicação seguinte do projeto."
      },
      {
        "question": "Tokenomics é decisão de marketing ou de produto?",
        "answer": "Das duas, e é por isso que ela costuma dar errado quando fica só com uma. O desenho de supply determina quando a pressão vendedora chega, e o trabalho de marketing determina se existe demanda esperando naquele momento. Decidir vesting sem a mesa de marketing na sala é programar um evento de mercado sem ninguém responsável pelo outro lado do livro."
      }
    ],
    "coverPhrase": "O supply fala mais alto que o anúncio"
  },
  {
    "slug": "web3-marketing-arte-perdida-onde-projetos-erram",
    "title": "Web3 marketing é uma arte perdida: onde os projetos erram",
    "seoTitle": "Web3 marketing é uma arte perdida: onde os projetos erram",
    "excerpt": "Uma marketer que passou pela Immutable escreveu que a maior parte do marketing web3 é hype e vibe. Ela tinha razão e não trouxe um único dado. Este post traz os dados que faltavam na tese dela.",
    "seoDescription": "Os erros que confundem hype com adoção em web3: comunidade alugada, airdrop sem retenção, mensagem ilegível e a ausência do básico de growth.",
    "content": "Guardei desde o ano passado um texto de quatro minutos que descreve o meu trabalho melhor do que eu gostaria. É de Alexandra Thompson, marketer com dez anos de startup que passou pela Immutable, e o título já entrega a tese: [web3 marketing virou uma arte perdida](https://medium.com/@athompson105/web3-marketing-is-a-lost-art-heres-where-it-goes-wrong-2db5dfee7928). O fecho dela é a frase que ficou: \"most Web3 marketing is just hype and vibes\".\n\nO texto tem quatro minutos de leitura e nenhum dado. Nenhum mesmo. É argumento de praticante, e argumento de praticante envelhece mal justamente porque não deixa como verificar.\n\nEu concordo com a tese dela. Então resolvi fazer o trabalho que faltou: pegar os quatro erros que ela nomeia e checar cada um contra número público. Os dados existem, e eles são mais duros que o texto original.\n\n## O primeiro erro: chamar audiência alugada de comunidade\n\nThompson abre com a piada mais precisa do texto: \"If I had a dollar for every Web3 project that claimed 'community is our moat,' I'd have enough to fund my own L2.\" E completa: \"Retweets ≠ product-market fit.\"\n\nA frase-chave dela é o teste inteiro numa linha: se o seu projeto desaparece no momento em que os incentivos param, você nunca teve comunidade, você tinha um trem de hype.\n\nO dado que faltava para provar isso tem nome e sobrenome. A Blast, um L2 que fez do incentivo o produto, chegou a US$ 2,26 bilhões de TVL em junho de 2024. Consultando o histórico público da [DefiLlama](https://defillama.com/chain/Blast) agora, a rede tem cerca de US$ 31 milhões. É uma queda de 98,6% em relação ao pico.\n\nEsse número não descreve um projeto que fracassou em atrair capital. Descreve um projeto que atraiu capital que nunca foi dele. O dinheiro estava na rede da mesma forma que um hóspede está num hotel, e foi embora quando a diária acabou.\n\nO teste prático que eu aplico em diagnóstico: **se você cortasse todo incentivo amanhã, quantas pessoas continuariam usando o produto na semana seguinte?** Se ninguém no time sabe responder, a resposta provavelmente é ruim.\n\n## O segundo erro: airdrop sem medir o que aconteceu depois\n\nSobre airdrop, Thompson é blunt: \"Airdrops attract mercenaries, not real users.\" E descreve o ciclo: \"They dump the token. They leave. You're back at square one, except now you're poorer.\"\n\nMas a observação mais útil dela é sobre processo, não sobre resultado: \"Many Web3 teams don't even track retention after an airdrop.\"\n\nIsso é o problema real. Airdrop não é errado por natureza, é uma ferramenta de distribuição legítima e às vezes a melhor disponível. O que é indefensável é rodar a maior operação de distribuição da história do projeto e não instrumentar o depois. Sem retenção medida, o time fica com a única métrica que o airdrop garante, que é o número de carteiras alcançadas, e essa métrica sobe mesmo quando tudo deu errado.\n\nA Kaleidos já detalhou as alavancas de desenho que fazem incentivo reter em vez de farmar em [incentivos de token que duram](/blog/incentivos-token-que-duram): vesting da recompensa, multiplicador de duração, cooldown de saque, penalidade de saída antecipada. Todas atacam a mesma coisa, que é tornar a saída imediata economicamente ruim.\n\n## O terceiro erro: a mensagem que ninguém consegue ler\n\nO exemplo que ela dá de pitch ilegível é bom demais para parafrasear: \"Composable decentralized liquidity layers enabling trustless interoperability.\"\n\nVocê provavelmente já leu essa frase, com outras palavras, no site de algum projeto esta semana. A conclusão dela é a régua: \"If you can't explain your product in one clear sentence, you have a positioning problem.\"\n\nVale insistir num ponto que costuma ser mal compreendido. O problema dessa frase não é ser técnica. Público de cripto é técnico e aguenta vocabulário. O problema é que ela não diz o que a coisa faz nem para quem. Ela descreve uma categoria de arquitetura, não um produto, e o leitor termina a frase sem saber se aquilo serve para ele.\n\n## O quarto erro: pular o básico de growth\n\nO último erro que ela aponta é de sequência: \"They go straight from 'we have cool tech' to 'let's farm engagement on Twitter.'\"\n\nEntre as duas coisas falta o trabalho inteiro. Quem é o usuário, que problema ele tem hoje, por onde ele chega, o que ele faz na primeira sessão, o que faz ele voltar na segunda. Nada disso é específico de web3, e é exatamente por isso que é pulado: parece básico demais para um mercado que se acha novo.\n\n## Os números que colocam tudo em perspectiva\n\nSe restar dúvida sobre o tamanho do descolamento entre hype e adoção, o relatório [State of Crypto 2025](https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/) da a16z crypto, publicado em outubro de 2025, resolve com três linhas.\n\nO valor de mercado de cripto passou de US$ 4 trilhões pela primeira vez. No mesmo documento, a estimativa de usuários realmente ativos fica entre 40 e 70 milhões, contra cerca de 716 milhões de pessoas que possuem cripto. E o dado que dói: os endereços ativos mensais on-chain, cerca de 181 milhões, caíram 18% em relação ao ano anterior.\n\nLeia esses três de novo, juntos. O preço subiu ao recorde enquanto o uso caiu. É a definição operacional de hype descolado de adoção, medida por uma das gestoras mais otimistas do setor.\n\nO mesmo relatório registra mais de 13 milhões de memecoins lançadas no ano, e uma queda de 56% nos lançamentos de setembro contra janeiro. Ou seja, mesmo a máquina de especulação estava desacelerando enquanto o valor de mercado batia recorde.\n\n## Por que a arte se perdeu\n\nMinha leitura de por que isso aconteceu, e ela não é sobre incompetência.\n\nO marketing web3 se perdeu porque, por alguns anos, ele não precisou funcionar. Num mercado em que o token subia de qualquer jeito, qualquer coisa que gerasse atenção parecia estar funcionando, e o feedback que corrigiria o erro nunca chegava. Quando o dinheiro fácil parou, ficou visível que muita gente tinha aprendido a operar atenção e ninguém tinha aprendido a operar retenção.\n\nA tese de Thompson tem um fecho que eu subscrevo: os projetos que sobrevivem ao próximo ciclo não são os de comunidade mais barulhenta, são os que descobriram crescimento sustentável além do hype.\n\n## O que fica\n\nQuatro perguntas para rodar no seu projeto hoje. Elas levam vinte minutos e costumam ser desconfortáveis:\n\n1. Se o incentivo acabasse amanhã, quem continuaria usando?\n2. Você mede retenção depois do airdrop? Em qual painel, olhado por quem?\n3. Uma pessoa fora do mercado entende o que vocês fazem em uma frase?\n4. Você sabe o que o usuário faz na primeira sessão e o que faz ele voltar na segunda?\n\nSe três das quatro respostas forem ruins, o problema não é o seu conteúdo nem o seu alcance. É que o marketing está sendo usado para gerar atenção num produto que ainda não segura ninguém, e atenção sobre produto que não segura é a forma mais cara de descobrir isso.\n\nSe você quer sair de operação de hype para operação de retenção, é esse trabalho que a gente faz na Kaleidos. Fala com a gente em [/contato](/contato).",
    "coverImage": "/blog/web3-marketing-arte-perdida-onde-projetos-erram/cover.png",
    "category": "marketing",
    "author": {
      "name": "Gabriel Madureira",
      "avatar": "/Kaleidos/imagens/Equipe/Madureira.png"
    },
    "publishedAt": "2026-08-31",
    "updatedAt": "2026-08-31",
    "readTime": 6,
    "featured": false,
    "tldr": "A tese de que web3 marketing virou arte perdida se sustenta em quatro erros: tratar Discord cheio como comunidade, rodar airdrop sem medir retenção, escrever mensagem que ninguém entende e pular o básico de growth. Os números confirmam: o mercado passou de US$ 4 trilhões enquanto os endereços ativos mensais caíram 18%, e a Blast perdeu 98,6% do TVL depois que o incentivo acabou.",
    "tags": [
      "web3",
      "marketing cripto",
      "comunidade",
      "airdrop",
      "growth",
      "retenção",
      "posicionamento"
    ],
    "faq": [
      {
        "question": "Por que dizem que o web3 marketing é uma arte perdida?",
        "answer": "A expressão vem de um texto de Alexandra Thompson publicado em março de 2025, que argumenta que a maior parte do marketing em web3 virou hype e vibe. A tese é que o setor aprendeu a gerar atenção e não aprendeu a gerar retenção, porque num mercado em alta qualquer coisa que gerasse barulho parecia estar funcionando e o erro nunca voltava como feedback."
      },
      {
        "question": "Como saber se meu projeto tem comunidade de verdade ou só hype?",
        "answer": "O teste é o corte de incentivo: se o projeto desaparece no momento em que as recompensas param, não havia comunidade. Na prática, dá para medir sem esperar o corte, acompanhando quantos usuários seguem ativos depois do fim de uma campanha de incentivo e qual fração dos participantes de um airdrop continua usando o produto trinta e noventa dias depois."
      },
      {
        "question": "Airdrop é uma má ideia?",
        "answer": "Não por natureza. Airdrop é uma ferramenta de distribuição legítima e às vezes a melhor disponível. O erro é rodar a maior operação de distribuição da história do projeto sem instrumentar o depois: sem medir retenção, a única métrica que sobra é o número de carteiras alcançadas, que sobe igual quando dá certo e quando dá errado."
      },
      {
        "question": "Qual a diferença entre hype e adoção em números?",
        "answer": "O State of Crypto 2025 da a16z crypto ilustra bem: o valor de mercado de cripto passou de US$ 4 trilhões pela primeira vez, enquanto a estimativa de usuários realmente ativos ficou entre 40 e 70 milhões e os endereços ativos mensais on-chain, cerca de 181 milhões, caíram 18% no ano. Preço em recorde com uso em queda é a definição operacional do descolamento."
      },
      {
        "question": "O que aconteceu com o TVL da Blast?",
        "answer": "A Blast chegou a cerca de US$ 2,26 bilhões de TVL em junho de 2024 e hoje registra em torno de US$ 31 milhões, segundo o histórico público da DefiLlama, uma queda de 98,6% em relação ao pico. É o exemplo mais claro de capital atraído por incentivo: o dinheiro não era da rede, estava hospedado nela enquanto a recompensa durou."
      }
    ],
    "coverPhrase": "Hype não é adoção"
  }
];
