import type { BlogPost } from "./blog-data";

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const blogNew58: BlogPost[] = [
  {
    slug: "midia-e-imprensa-projetos-cripto-o-que-funciona",
    title:
      "Como virar pauta na imprensa cripto: os 4 formatos que jornalista aceita",
    seoTitle: "Como virar pauta na imprensa cripto brasileira",
    excerpt:
      "Press release institucional tem aproveitamento perto de zero. Este guia mostra os quatro formatos de pauta que um jornalista de cripto no Brasil de fato aceita, como escolher o grupo de veículo certo para cada ângulo, o que queima o remetente e como medir earned media sem contar recorte.",
    seoDescription:
      "Os 4 formatos de pauta que jornalista de cripto aceita no Brasil: dado inédito, newsjacking, porta-voz com tese e fato concreto. E o que queima o remetente.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-07-09",
    updatedAt: "2026-08-21",
    readTime: 8,
    featured: false,
    coverImage: "/blog/midia-e-imprensa-projetos-cripto-o-que-funciona/cover.png",
    tags: [
      "pauta de imprensa",
      "newsjacking",
      "earned media",
      "pitch para jornalista",
      "porta-voz",
      "dado inédito",
      "mídia cripto brasil",
    ],
    tldr: "Jornalista de cripto aceita quatro formatos de pauta: dado inédito que só você tem, gancho com o noticiário do dia (newsjacking), porta-voz com tese própria e disponibilidade real, e fato concreto com data. Press release institucional exaltando o próprio produto tem aproveitamento perto de zero e ainda queima o remetente para os envios seguintes.",
    faq: [
      {
        question: "Qual formato de pauta tem mais chance de virar matéria em cripto?",
        answer:
          "Dado inédito. Levantamento exclusivo, número de uso que só o seu projeto tem, pesquisa própria com metodologia aberta. É o formato com melhor taxa de aproveitamento porque resolve o problema do jornalista em vez de criar mais um: entrega a ele algo que o concorrente não tem. Depois dele vêm, nessa ordem, o gancho com o noticiário do dia, o porta-voz com tese própria e o fato concreto com data marcada.",
      },
      {
        question: "Para qual grupo de veículo eu mando cada ângulo?",
        answer:
          "A cobertura se divide em três grupos com réguas diferentes. A imprensa nativa cripto aceita profundidade técnica e é a porta de entrada. A imprensa de negócios e finanças quer impacto econômico, número de mercado e movimento de empresa. A imprensa de tecnologia e startups quer produto, captação e história de founder. Mandar o mesmo texto para os três é o erro que mais queima remetente. O mapa veículo a veículo está no nosso guia de PR e assessoria de imprensa cripto.",
      },
      {
        question: "Como conseguir que um jornalista escreva sobre o meu projeto?",
        answer:
          "Oferecendo pauta, não propaganda. Jornalista aceita história quando ela tem pelo menos um destes elementos: dado inédito ou levantamento exclusivo, gancho com algo que já está no noticiário (regulação, movimento de mercado, caso relevante), porta-voz com opinião própria e disponibilidade real, ou anúncio de fato concreto (captação, lançamento, parceria com nome conhecido). Press release genérico exaltando o próprio produto vai para a lixeira.",
      },
      {
        question: "Como saber se a operação de pauta está funcionando?",
        answer:
          "Combine quatro camadas: volume e qualidade das menções (veículo, destaque, se o porta-voz foi citado), tráfego de referência e busca direta pela marca depois de cada matéria, uso das matérias como prova social em vendas e captação, e evolução de share of voice contra concorrentes diretos. Contar recortes sem olhar o que eles geraram é medir esforço, não resultado.",
      },
    ],
    content: `# Como virar pauta na imprensa cripto: os 4 formatos que jornalista aceita

Existe um padrão curioso no mercado cripto brasileiro: projetos que investem pesado em conteúdo próprio, comunidade e mídia paga, mas que nunca apareceram em um único veículo de imprensa que não fosse deles mesmos. O founder posta todo dia, o blog publica toda semana, e ainda assim, quando um investidor ou parceiro pesquisa o nome do projeto no Google, só encontra o que o próprio projeto disse sobre si.

Isso é um problema de credibilidade. Em qualquer setor, validação de terceiro vale mais do que autopromoção. Em cripto, onde o público já viu esquema demais e a desconfiança é o estado padrão, vale o dobro. O Edelman Trust Barometer registra, ano após ano, um ambiente global de desconfiança nas instituições, e é exatamente nesse ambiente que a chancela de um veículo independente se torna um ativo que nenhum canal próprio substitui.

A boa notícia: o Brasil aparece de forma consistente entre os primeiros países do Índice Global de Adoção de Cripto da Chainalysis, e esse interesse do público sustenta um ecossistema de mídia que cobre o setor com frequência. Espaço existe. O que falta, na maioria dos projetos, é saber ocupá-lo.

**Este artigo é sobre uma coisa só: o que faz um jornalista dizer sim.** A estratégia de assessoria como um todo (como escolher e trabalhar cada veículo brasileiro um a um, PR de TGE e listagem, wire versus relacionamento, gestão de FUD e o painel de medição) está no nosso [guia de PR e assessoria de imprensa cripto no Brasil](/blog/pr-assessoria-imprensa-cripto-brasil), e não vou repetir aqui. Aqui a pergunta é mais estreita e mais imediata: você tem uma novidade na mão, e ela precisa virar matéria.

## Principais takeaways

- Jornalista aceita pauta, não propaganda. Os quatro formatos que funcionam: dado inédito, gancho de noticiário, porta-voz com tese própria e fato concreto com data.
- Dado inédito é o de maior aproveitamento, porque resolve o problema do jornalista em vez de criar mais um.
- Os três grupos de veículo (nativa cripto, negócios, tech) pedem ângulos diferentes. O mesmo texto para os três queima o remetente.
- Relacionamento se constrói antes da necessidade. Quem só aparece quando quer matéria não tem relacionamento, tem demanda.
- Earned media resolve o que canal próprio não resolve: prova social independente para investidor, parceiro e usuário desconfiado.

## Por que earned media pesa mais em cripto do que em outros setores

Todo canal de marketing carrega um nível implícito de ceticismo do público. Anúncio é a marca pagando para falar bem de si. Conteúdo próprio é a marca falando bem de si de graça. Influenciador é alguém sendo pago para falar bem da marca. Earned media é diferente: é um jornalista, que não deve nada ao projeto, decidindo que aquela história merece ser contada.

Em cripto, essa diferença é amplificada por dois fatores. Primeiro, o histórico do setor: o público brasileiro acompanhou casos rumorosos de pirâmides e promessas de rentabilidade que acabaram mal, e aprendeu a desconfiar de projeto que só existe na própria bolha. Segundo, o perfil das decisões: quem avalia colocar dinheiro, fechar parceria ou integrar um protocolo pesquisa antes. E o que essa pesquisa encontra (ou não encontra) na imprensa define a primeira impressão.

Há ainda um efeito de segunda ordem: matéria em veículo relevante vira insumo para todo o resto do marketing. Vira prova social no pitch de vendas, argumento no deck de captação, conteúdo para redes sociais e backlink de autoridade para o SEO da marca.

## Antes do formato: para quem essa pauta é

Uma pauta boa mandada para o veículo errado é uma pauta ruim. A cobertura de cripto no Brasil opera com três réguas distintas, e o ângulo tem que ser cortado para a régua de quem vai ler.

**Régua da imprensa nativa cripto.** Aceita profundidade técnica, entende o vocabulário e cobre o setor todos os dias. É a porta de entrada, e o público já está dentro do mercado. Ângulo que funciona: mecanismo, produto, número on-chain, opinião de quem constrói.

**Régua da imprensa de negócios e finanças.** Quer impacto econômico, tamanho de mercado, movimento de empresa e regulação. Alcança investidor institucional e o público que ainda não está em cripto, exatamente quem os canais próprios do projeto nunca alcançam. Ângulo que funciona: dinheiro, escala, consequência.

**Régua da imprensa de tecnologia e startups.** Quer produto, inovação e história de empresa. Ângulo que funciona: captação, lançamento, trajetória de founder.

A ordem madura escalona os três: presença na nativa primeiro, essa tração como credencial para os veículos de negócios, e a imprensa de tech reservada para marco de empresa. Querer estrear no veículo de maior porte sem nunca ter aparecido em lugar nenhum é receita de frustração. Quem cobre o quê, veículo a veículo, está mapeado no [guia de PR cripto](/blog/pr-assessoria-imprensa-cripto-brasil).

## O que funciona: os quatro formatos de pauta que jornalista aceita

Jornalista não é canal de distribuição do seu release. É um profissional com pauta cheia, prazo apertado e ceticismo treinado, ainda mais em cripto. O que faz ele abrir espaço:

**1. Dado inédito.** Levantamento exclusivo, pesquisa própria, número que ninguém tem. Se o seu projeto tem dados de uso, comportamento ou mercado que contam uma história, isso é matéria-prima de pauta. Dado exclusivo é o formato com melhor taxa de aproveitamento porque resolve o problema do jornalista: dá a ele algo que o concorrente não tem.

**2. Gancho de noticiário (newsjacking).** Regulação nova, movimento forte de mercado, caso de repercussão. Quando o assunto está quente, o jornalista precisa de fontes rápidas e qualificadas. O projeto que responde em uma hora com um porta-voz preparado e uma opinião clara entra na matéria. O que respondeu no dia seguinte, não. Vale acompanhar de perto a agenda regulatória, que no Brasil anda movimentada, como mostramos no artigo sobre [regulação e marketing cripto no Brasil](/blog/regulacao-marketing-cripto-brasil-2026).

**3. Porta-voz com opinião própria.** Founder ou executivo que tem tese, fala em português claro e aceita discordar do consenso vira fonte recorrente. E fonte recorrente é o ativo mais valioso de uma operação de PR: gera menções contínuas sem depender de anúncio da empresa. O requisito é treinamento de mídia e disponibilidade real, incluindo para perguntas desconfortáveis.

**4. Fato concreto.** Captação, lançamento com data, parceria com nome conhecido, marco de produto verificável. Anúncio funciona quando é fato, não quando é intenção. "Pretendemos revolucionar o mercado" não é pauta. "Fechamos integração com a empresa X e o produto entra no ar dia Y" é.

Repare no que não está na lista: o press release institucional exaltando o próprio produto. Esse formato tem aproveitamento próximo de zero e ainda queima o remetente para os envios futuros.

## O que não funciona (e o que queima a marca)

- **Release genérico disparado em massa.** Jornalista percebe o e-mail copiado e cola o remetente na pasta de spam mental.
- **Prometer preço ou rentabilidade.** Além de não virar pauta séria, cria passivo regulatório e associa o projeto ao exato estereótipo do qual ele deveria fugir.
- **Confundir mídia paga com earned media.** Publieditorial tem seu lugar, mas precisa estar identificado como conteúdo pago. Tentar disfarçar matéria comprada de cobertura espontânea é o tipo de atalho que, quando exposto, destrói a credibilidade que o PR existia para construir.
- **Aparecer só quando precisa.** Relacionamento com jornalista se constrói fora da necessidade: respondendo rápido quando ele procura, indicando fontes mesmo quando a pauta não beneficia o projeto, sendo útil de forma consistente.
- **Sumir na crise.** Em cripto, crise é questão de tempo: exploit, queda brusca, polêmica de comunidade. O projeto que tem canal aberto com a imprensa dá a própria versão. O que nunca construiu relacionamento vira nota de rodapé escrita só com a versão dos outros.

## Como montar a operação: o mínimo viável de PR

Não precisa começar com estrutura grande. Precisa começar com consistência:

- **Press kit permanente:** descrição do projeto em uma frase e em um parágrafo, fotos de porta-vozes, logos, números públicos verificáveis e histórico de marcos. Hospedado em página própria, sempre atualizado.
- **Lista viva de jornalistas:** quem cobre cripto em cada veículo, o que cada um escreveu recentemente, qual ângulo interessa a cada um. Vinte contatos bem mapeados valem mais que quinhentos e-mails comprados.
- **Calendário de pautas próprias:** marcos de produto e dados que o projeto pode transformar em levantamento exclusivo, planejados com antecedência.
- **Rotina de newsjacking:** monitoramento diário do noticiário do setor e um processo rápido de aprovação interna para posicionamento de porta-voz.
- **Protocolo de crise:** quem fala, o que se sabe, o que não se comenta. Definido antes da crise, não durante.

## Como medir sem se enganar

Métricas de vaidade como "equivalência publicitária" dizem pouco. O que vale acompanhar:

- **Menções qualificadas:** em que veículo, com que destaque, com qual sentimento, e se o porta-voz foi citado como fonte.
- **Efeito rastreável:** tráfego de referência das matérias e, principalmente, evolução da busca direta pelo nome do projeto nas semanas seguintes a cada aparição relevante.
- **Uso comercial:** quantas vezes as matérias entraram em pitch, deck de captação e conversa de parceria. É medição qualitativa, mas é onde o valor aparece primeiro.
- **Share of voice:** presença do projeto na cobertura do setor comparada aos concorrentes diretos, medida trimestre a trimestre.

O horizonte honesto: earned media é construção de médio prazo. Os primeiros meses constroem relacionamento e as primeiras menções; o efeito composto, quando o projeto vira referência procurada pela imprensa em vez de demandante, vem depois, e é ele que justifica o investimento.

## Conclusão

Virar pauta não é sorte nem contato mágico. É oferecer ao jornalista uma das quatro coisas que ele precisa (dado que ninguém tem, gancho com o que já está no ar, fonte com tese, fato com data), cortada na régua do veículo certo, por alguém com quem ele já falou antes de precisar.

O resto da operação de imprensa (relacionamento veículo a veículo, PR de lançamento de token, crise e o painel de medição completo) está no [guia de PR e assessoria de imprensa cripto](/blog/pr-assessoria-imprensa-cripto-brasil).

Num setor em que a desconfiança é o ponto de partida de qualquer conversa, a validação de terceiros independentes deixa de ser vaidade e vira infraestrutura de credibilidade. Há mais estratégias de construção de autoridade e aquisição na nossa [seção de marketing](/blog/categoria/marketing).

A Kaleidos é uma agência especializada em marketing para cripto, web3 e fintech, e trata PR como parte da estratégia de crescimento, não como acessório: narrativa, relacionamento com a mídia certa e medição de verdade. Se o seu projeto precisa existir fora da própria bolha, [fale com a Kaleidos](/contato).
`,
  },
];
