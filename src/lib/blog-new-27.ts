import type { BlogPost } from "./blog-data";

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const blogNew27: BlogPost[] = [
  {
    slug: "livro-web3-marketing-amanda-cassatt-aprendizados",
    title:
      "O livro 'Web3 Marketing' da Amanda Cassatt: os aprendizados centrais (e o que aplica no Brasil)",
    seoTitle:
      "Web3 Marketing de Amanda Cassatt: resumo e aprendizados para o Brasil",
    excerpt:
      "A Kaleidos destrincha 'Web3 Marketing: A Handbook for the Next Internet Revolution' (Wiley, 2023), de Amanda Cassatt: o funil web3, o conceito de Web2.5, comunidade como modelo de negócio e uma leitura crítica do que funciona (ou não) no mercado brasileiro.",
    seoDescription:
      "Resumo crítico do livro Web3 Marketing de Amanda Cassatt (Wiley, 2023): funil web3, Web2.5, comunidade e tokens. O que vale aplicar em projetos cripto no Brasil.",
    category: "cripto",
    author: AUTHOR,
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "",
    tags: [
      "web3 marketing",
      "amanda cassatt",
      "marketing cripto",
      "web2.5",
      "funil de marketing web3",
      "comunidade cripto",
      "livros de marketing",
      "kaleidos",
    ],
    tldr: "Em 'Web3 Marketing' (Wiley, 2023), Amanda Cassatt, ex-CMO da ConsenSys e fundadora da Serotonin, sistematiza o marketing de projetos cripto: o funil web3 termina em comunidade e propriedade, não em compra, e a transição de marcas tradicionais passa pelo estágio intermediário que ela chama de Web2.5. Boa parte aplica ao Brasil, com adaptações de canal e de confiança.",
    faq: [
      {
        question: "Sobre o que é o livro Web3 Marketing de Amanda Cassatt?",
        answer:
          "É um manual de marketing para projetos de cripto e web3, publicado pela Wiley em 2023. A primeira parte explica a história e os conceitos do setor em linguagem não técnica; a segunda apresenta práticas de marketing: posicionamento, funil adaptado ao web3, construção de comunidade, conteúdo, PR e o caminho de entrada de marcas tradicionais.",
      },
      {
        question: "Quem é Amanda Cassatt?",
        answer:
          "Amanda Cassatt foi Chief Marketing Officer da ConsenSys entre 2016 e 2019, período em que ajudou a levar o Ethereum ao mercado, e depois fundou a Serotonin, uma das principais consultorias de marketing web3 do mundo, que já atendeu projetos como Polygon, Chainlink e Arbitrum, além de marcas tradicionais como Sotheby's.",
      },
      {
        question: "O que é Web2.5 segundo Amanda Cassatt?",
        answer:
          "Web2.5 é o termo que Cassatt usa para a zona intermediária entre o Web2 e o Web3: a empresa adota elementos de cripto (colecionáveis digitais, pagamentos, comunidade token-gated) sem abandonar sua operação tradicional. A tese é que a transição não precisa ser tudo ou nada; pode ser gradual e estratégica.",
      },
      {
        question: "Como o funil de marketing muda no web3?",
        answer:
          "No funil tradicional, o objetivo final é a compra. No funil web3 descrito no livro, o destino é a comunidade: o usuário descobre o projeto, engaja, adquire o token ou NFT e vira membro com incentivo econômico alinhado. Membros satisfeitos se tornam divulgadores, o que transforma o funil em um ciclo que se retroalimenta.",
      },
      {
        question: "O livro Web3 Marketing vale para o mercado brasileiro?",
        answer:
          "Vale como base conceitual, mas exige adaptação. O Brasil tem canais próprios (WhatsApp e Instagram pesam mais que Discord para o público geral), um histórico de pirâmides financeiras que aumenta a desconfiança e um marco regulatório específico, a Lei 14.478/2022, com supervisão do Banco Central. A camada de educação e prova de legitimidade precisa ser maior aqui.",
      },
    ],
    content: `# O livro 'Web3 Marketing' da Amanda Cassatt: os aprendizados centrais (e o que aplica no Brasil)

Poucos livros tentam sistematizar o marketing de projetos cripto. A maioria do conhecimento do setor vive em threads, newsletters e conversas de bastidor. Por isso, quando a Wiley publicou "Web3 Marketing: A Handbook for the Next Internet Revolution" em abril de 2023, o livro virou referência quase imediata: é o registro mais organizado de como se constrói marca, comunidade e demanda em cripto.

A autora tem lastro. Amanda Cassatt foi CMO da ConsenSys entre 2016 e 2019, na fase em que o Ethereum precisava ser explicado e vendido para o mundo, e depois fundou a Serotonin, consultoria de marketing web3 que já trabalhou com projetos como Polygon, Chainlink, Arbitrum e Decentraland, além de marcas tradicionais como a Sotheby's. O livro recebeu endossos de nomes como Joseph Lubin, cofundador do Ethereum, e Kim Milosevich, CMO da a16z crypto, que o chamou de o livro definitivo sobre marketing em web3 (fonte: [site oficial do livro](https://amandacassatt.com/), 2023).

A Kaleidos trabalha com marketing cripto no Brasil e usa vários dos frameworks do livro no dia a dia, com adaptações. Neste post, a gente resume as ideias centrais e faz a leitura crítica: o que atravessa bem para o contexto brasileiro e o que precisa de tradução.

## Principais takeaways

1. **O funil web3 não termina na compra, termina na comunidade.** O usuário que adquire o token ou NFT vira membro com interesse econômico no sucesso do projeto, e membros engajados viram divulgadores.
2. **Comunidade é modelo de negócio, não canal de marketing.** No web3, empresa, investidor e usuário se fundem em uma categoria só, economicamente alinhada.
3. **Web2.5 é a porta de entrada para marcas tradicionais.** A transição pode ser gradual: adotar elementos de cripto sem abandonar a operação Web2.
4. **Educação vem antes da conversão.** Em um setor com conceitos novos e desconfiança alta, conteúdo educativo é a base do funil, não um acessório.
5. **No Brasil, os frameworks valem, mas os canais e a camada de confiança mudam.** WhatsApp e Instagram pesam mais que Discord para o público geral, e o histórico local de golpes exige mais prova de legitimidade.

## O contexto: por que esse livro existe

A primeira metade do livro é uma introdução não técnica ao web3: a história do Bitcoin e do Ethereum, o que são tokens, NFTs, DAOs e DeFi, e por que essas tecnologias mudam a relação entre empresas e usuários. Para quem já vive o setor, essa parte é revisão. O valor real está na segunda metade, em que Cassatt destila a prática de marketing que desenvolveu na ConsenSys e na Serotonin.

A tese de fundo é que o web3 não muda apenas as ferramentas do marketing; muda a estrutura econômica sobre a qual o marketing opera. No Web2, empresa, investidor e usuário são três grupos separados, muitas vezes com interesses conflitantes: a empresa quer extrair valor do usuário para remunerar o investidor. No web3, segundo o livro, esses três papéis colapsam em uma única categoria com alinhamento econômico: a comunidade. Quem usa o protocolo pode ser dono de uma fração dele, e quem é dono tem incentivo para que ele cresça.

Isso parece abstrato até você ver as consequências práticas. Se o usuário é sócio, o marketing deixa de ser convencimento e vira coordenação: dar às pessoas motivos, ferramentas e narrativas para que elas mesmas espalhem o projeto.

## Aprendizado 1: o funil web3 termina em comunidade, não em conversão

O framework mais citado do livro é a adaptação do funil de marketing para o web3. O funil clássico segue etapas conhecidas: descoberta, consideração, conversão, retenção. O objetivo final é a compra, e o pós-venda é um departamento separado.

No funil que Cassatt descreve, a jornada muda de destino. O usuário descobre o projeto (conteúdo, PR, influenciadores), aprende sobre ele (educação, documentação, comunidade aberta), realiza a primeira ação on-chain (compra o token, minta o NFT, usa o protocolo) e então entra na fase que não existe no funil tradicional: vira membro. Com um ativo do projeto na carteira, ele tem interesse direto no sucesso da rede.

O efeito é um ciclo, não um funil linear. Membros satisfeitos produzem conteúdo, defendem o projeto em discussões públicas, trazem amigos e participam de decisões. O marketing mais eficiente do projeto passa a ser feito por quem não está na folha de pagamento. O trabalho do time de marketing vira alimentar esse ciclo: dar pauta, reconhecer contribuidores, manter a narrativa coerente.

**Leitura crítica pro Brasil:** o mecanismo funciona, mas com uma ressalva importante. O ciclo só gira se o ativo tiver utilidade ou narrativa sustentável. Nos ciclos de alta, muita gente confundiu "comunidade economicamente alinhada" com "gente esperando o token valorizar". Quando o preço cai, essa segunda versão de comunidade evapora. Projetos brasileiros que construíram comunidade em torno de educação e utilidade real atravessaram o inverno cripto de 2022 e 2023; os que construíram em torno de promessa de valorização, em geral, não.

## Aprendizado 2: comunidade é o modelo de negócio, e isso muda o papel do marketing

No Web2, comunidade é um canal: um grupo de Facebook, um servidor de Discord, um programa de embaixadores. Algo que o marketing gerencia para apoiar o produto.

No web3, pelo argumento do livro, a comunidade é o produto em um grau muito maior. Um protocolo sem comunidade é código parado; o valor de rede vem das pessoas que usam, integram, desenvolvem e defendem. Por isso, funções que no Web2 seriam periféricas (community manager, DevRel, governança) viram centrais.

Na prática, isso se traduz em algumas disciplinas que o livro trata com detalhe:

- **Presença fundadora ativa:** no web3, o público espera acesso direto aos construtores. Fundadores que aparecem, respondem e explicam constroem confiança que nenhuma campanha compra.
- **Transparência como padrão:** roadmap público, decisões documentadas, erros assumidos. O setor pune opacidade com velocidade.
- **Incentivos desenhados com cuidado:** airdrops e recompensas atraem tanto usuários genuínos quanto caçadores de recompensa. O desenho do incentivo define qual dos dois você recebe em maior volume.

**Leitura crítica pro Brasil:** aqui a adaptação é de canal e de tom. O playbook do livro assume Discord, Telegram e Twitter como praças centrais, o que vale para o público cripto-nativo brasileiro. Mas o público que os projetos querem alcançar em seguida, o investidor comum, vive no WhatsApp, no Instagram e no YouTube. Comunidade no Brasil frequentemente significa grupo de WhatsApp com regras claras e curadoria forte, não servidor de Discord com 40 canais. E o tom precisa ser mais didático: o vocabulário do setor é uma barreira real para a maioria.

## Aprendizado 3: Web2.5 é a ponte para marcas tradicionais

Um dos conceitos mais úteis do livro para quem trabalha com marcas fora do setor é o de Web2.5: a zona intermediária entre o Web2 e o Web3. Em entrevista ao Digiday, Cassatt defendeu que marcas deveriam adotar exatamente essa abordagem, porque a migração não precisa ser tudo ou nada (fonte: [Digiday](https://digiday.com/marketing/why-serotonins-ceo-believes-brands-should-be-taking-a-web2-5-approach/), 2022).

Na prática, Web2.5 significa que uma empresa tradicional pode começar com passos reversíveis: um colecionável digital ligado a um produto físico, um programa de fidelidade com resgate on-chain, uma experiência token-gated para clientes de alto valor, aceitar pagamento em stablecoin. O cliente talvez nem perceba que há blockchain envolvida, e é esse o ponto: a tecnologia como infraestrutura, não como manchete.

O caso que o livro e a trajetória da Serotonin ilustram bem é o da Sotheby's, casa de leilões fundada em 1744 que entrou no mercado de NFTs traduzindo sua competência central, curadoria de arte, para o novo meio, em vez de fingir ser uma empresa cripto.

**Leitura crítica pro Brasil:** o conceito aplica direto, e talvez até melhor que nos Estados Unidos. O Brasil tem um dos maiores mercados de adoção de cripto do mundo em volume de usuários, e o Banco Central regulamentou o setor a partir da Lei 14.478/2022, o marco legal dos ativos virtuais. Para uma marca brasileira, o caminho Web2.5 mais óbvio hoje passa por pagamentos e fidelidade: stablecoins para remessas e recebíveis, benefícios tokenizados, colecionáveis ligados a experiências. O erro comum é começar pelo mais barulhento (lançar NFT de marketing sem utilidade) em vez do mais útil.

## Aprendizado 4: educação é a base do funil, não um extra

Um fio que atravessa o livro inteiro: no web3, o maior gargalo de conversão é entendimento. A pessoa não compra o que não entende, e quase tudo no setor exige explicação: carteira, seed phrase, gas, custódia.

A resposta de Cassatt, testada desde a época de levar o Ethereum ao mercado, é tratar educação como a fundação da estratégia de conteúdo. Documentação clara, artigos que explicam conceitos sem jargão, conteúdo que responde às perguntas reais do público em cada etapa. Isso serve ao funil duas vezes: atrai tráfego qualificado no topo e remove objeções no meio.

**Leitura crítica pro Brasil:** esse aprendizado vale em dobro aqui. O brasileiro médio já foi exposto a pirâmides financeiras vestidas de cripto, e a desconfiança é racional. Conteúdo educativo honesto, que explica riscos junto com oportunidades, é o ativo de marketing mais barato e mais durável que um projeto pode construir no país. É também o que separa projetos sérios de oportunistas aos olhos do público, da imprensa e do regulador.

## O que o livro não resolve

Nenhum livro de 2023 sobreviveria intacto ao ritmo do setor, e vale registrar as lacunas:

- **O cenário de canais mudou.** O livro foi escrito antes da consolidação de tendências como o crescimento do marketing de KOLs asiático, a ascensão de plataformas de vídeo curto como canal cripto dominante e a integração de IA na produção de conteúdo.
- **Regulação é tratada em nível global e genérico.** Para operar no Brasil, você precisa conhecer o marco local: a Lei 14.478/2022, a supervisão do Banco Central e as regras da CVM para ofertas que caracterizam valores mobiliários. Nada disso está (nem poderia estar) no livro.
- **O viés de sobrevivência existe.** Os casos citados são, em maioria, projetos que deram certo com orçamento relevante. O founder brasileiro com orçamento apertado precisa filtrar o que é replicável e o que era privilégio de quem tinha a Serotonin no discado.

Nada disso invalida o livro. Ele continua sendo o melhor ponto de partida estruturado para quem quer entender marketing cripto, justamente porque os fundamentos (comunidade como modelo, funil que termina em pertencimento, educação como base) envelhecem bem. As táticas datam; a estrutura, não.

## Como a Kaleidos usa esses frameworks

Na prática da Kaleidos com clientes de cripto, web3 e fintech no Brasil, os frameworks do livro aparecem adaptados assim:

- **Funil web3 com camada extra de confiança:** antes da descoberta vem a prova de legitimidade. Time com rosto, conteúdo educativo consistente e presença em veículos respeitados vêm antes de qualquer campanha de aquisição.
- **Comunidade nos canais onde o brasileiro está:** grupos de WhatsApp e Telegram curados, Instagram e YouTube como motores de topo de funil, Discord reservado ao público cripto-nativo.
- **Web2.5 como recomendação padrão para marcas tradicionais:** começar por utilidade invisível (pagamentos, fidelidade, acesso) e não por barulho.
- **Educação como produto de marketing:** newsletters, artigos e vídeos que explicam o setor sem prometer retorno, construindo autoridade que sobrevive a qualquer ciclo de mercado.

Se o seu projeto está construindo em cripto ou a sua marca quer entrar no setor pelo caminho certo, a Kaleidos pode ajudar a montar essa estratégia: posicionamento, conteúdo, comunidade e growth com quem conhece as regras do jogo no Brasil. Fale com a gente e vamos desenhar o seu funil web3.

---

**Fontes:** [Web3 Marketing: A Handbook for the Next Internet Revolution, Amanda Cassatt, Wiley (2023)](https://www.wiley.com/en-us/Web3+Marketing:+A+Handbook+for+the+Next+Internet+Revolution-p-9781394171965) · [Site oficial do livro (2023)](https://amandacassatt.com/) · [Digiday: Why Serotonin's CEO believes brands should be taking a 'Web2.5 approach' (2022)](https://digiday.com/marketing/why-serotonins-ceo-believes-brands-should-be-taking-a-web2-5-approach/) · [CoinDesk: Wondering What Web3 Means? Listen to Ethereum's First Marketer (2023)](https://www.coindesk.com/opinion/2023/04/03/wondering-what-web3-means-listen-to-ethereums-first-marketer)
`,
  },
];
