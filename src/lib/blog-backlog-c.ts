import type { BlogPost } from "./blog-data";

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const blogBacklogC: BlogPost[] = [
  {
    slug: "web3-marketing-primeiros-90-dias-depois-do-funding",
    title:
      "Marketing web3 nos primeiros 90 dias depois da rodada: o que priorizar",
    seoTitle: "Marketing web3 nos 90 dias depois da rodada",
    excerpt:
      "O anúncio da rodada abre a única janela em que um projeto web3 tem atenção de graça, e a maioria queima essa janela em post institucional. Este guia mostra o que fazer na semana do anúncio, o que construir do mês 1 ao mês 3, os erros que consomem caixa sem devolver nada e como medir o período com honestidade.",
    seoDescription:
      "O que priorizar em marketing web3 nos 90 dias depois de levantar uma rodada: posicionamento, prova de legitimidade, conteúdo, imprensa, time e medição.",
    category: "growth",
    author: AUTHOR,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    readTime: 8,
    featured: false,
    coverImage: "/blog/web3-marketing-primeiros-90-dias-depois-do-funding/cover.png",
    tags: [
      "marketing web3",
      "pos funding",
      "go to market",
      "posicionamento",
      "growth cripto",
      "captacao",
      "kaleidos",
    ],
    tldr: "Nos 90 dias depois da rodada, a prioridade não é campanha: é posicionamento escrito, prova de legitimidade pública e conteúdo de fundação que sustente a atenção que o anúncio comprou de graça. Campanha paga e KOL entram no mês 2, depois que existe mensagem para amplificar. Medir pipeline e retenção, não seguidores.",
    faq: [
      {
        question: "Qual a primeira coisa a fazer depois de anunciar uma rodada?",
        answer:
          "Aproveitar a semana do anúncio como pico de atenção, não como fim do assunto. Isso significa ter, no dia do anúncio, o site atualizado com a tese do projeto, um post do founder explicando o que muda para quem usa o produto, e uma página de vagas aberta. Quem anuncia e só publica o card institucional joga fora o único momento em que a imprensa, os desenvolvedores e os candidatos estão olhando sem precisar ser convencidos.",
      },
      {
        question: "Devo contratar KOLs logo depois da rodada?",
        answer:
          "Não no primeiro mês. KOL amplifica mensagem, não cria mensagem. Contratar influenciador antes de o projeto conseguir explicar em uma frase o que faz e para quem produz alcance sobre um vazio: a audiência clica, não entende e não volta. O momento certo costuma ser depois que o posicionamento está escrito e testado em conversas reais com usuários, o que na prática empurra a ativação de KOL para o segundo mês.",
      },
      {
        question: "Quanto do dinheiro da rodada deve ir para marketing nos primeiros 90 dias?",
        answer:
          "Menos do que a maioria gasta, e concentrado em ativos duráveis. Nos primeiros 90 dias o retorno vem de coisas que continuam trabalhando depois: posicionamento, documentação, conteúdo de fundação, contratação e relacionamento com imprensa. Brand awareness pago é o item mais fácil de queimar caixa e o mais difícil de justificar num projeto que ainda não provou retenção.",
      },
      {
        question: "Como medir marketing nos primeiros 90 dias depois da captação?",
        answer:
          "Por três camadas. Atenção qualificada: busca pelo nome do projeto, tráfego direto, candidaturas a vagas e conversas com parceiros. Ativação: usuários que passaram do primeiro uso, desenvolvedores que rodaram a integração, carteiras que voltaram na segunda semana. Retenção: quantos desses ainda estão ativos no dia 90. Seguidores e impressões descrevem o anúncio, não o negócio.",
      },
      {
        question: "Vale montar time interno ou contratar agência nesse período?",
        answer:
          "Os dois resolvem coisas diferentes. Contratação interna resolve o que é permanente e específico do produto: um responsável por marketing que entenda a tecnologia e possa decidir. Agência resolve o que é intenso e temporário: capacidade de produção, relacionamento de imprensa já existente e método pronto para os primeiros 90 dias. O erro comum é contratar cinco pessoas de execução antes de existir alguém que saiba dizer o que executar.",
      },
    ],
    content: `# Marketing web3 nos primeiros 90 dias depois da rodada: o que priorizar

Existe um padrão que se repete em quase todo projeto web3 que anuncia uma captação. O comunicado sai, o número aparece nos portais do setor, o Twitter do projeto ganha alguns milhares de seguidores em três dias, o founder recebe mensagens de dez agências e vinte fundos, e duas semanas depois o gráfico de atenção volta exatamente para onde estava antes.

O que aconteceu ali não foi falta de marketing. Foi desperdício de uma janela. O anúncio da rodada é o único momento previsível em que um projeto ganha atenção sem pagar por ela: jornalista abre o e-mail, desenvolvedor olha o repositório, candidato considera a vaga, parceiro atende a ligação. Essa atenção tem prazo curto e não volta por decreto. E a maioria dos projetos a gasta em anúncio institucional: card com logo dos investidores, texto sobre acelerar a visão, agradecimento. É educado e é inútil, porque não dá a quem estava olhando nenhum motivo para continuar olhando.

Este guia é sobre o que fazer com os 90 dias seguintes. Não é calendário de campanha: é a ordem em que as coisas precisam ser construídas para que a atenção comprada de graça vire pipeline, contratação e retenção.

## Principais takeaways

- O anúncio da rodada é começo de campanha, não peça de campanha. A semana do anúncio precisa entregar tese, produto e vagas, não só agradecimento.
- Posicionamento vem antes de qualquer verba de mídia. Amplificar uma mensagem que ainda não existe é pagar para confundir.
- Prova de legitimidade (auditoria, documentação, time com rosto, dado público) faz mais pelo funil web3 do que qualquer criativo.
- KOL e mídia paga entram no mês 2, depois que existe algo para amplificar e sinal orgânico para orientar o gasto.
- Roadmap com data é passivo. Promessa datada num setor que atrasa vira o argumento que a comunidade usa contra o projeto.
- Meça atenção qualificada, ativação e retenção no dia 90. Seguidor ganho na semana do anúncio não é resultado.

## A semana do anúncio: o que precisa estar pronto antes

A regra é simples: no dia em que a rodada é anunciada, tudo que uma pessoa interessada faria a seguir precisa já existir. Na prática, isso significa quatro coisas prontas antes do comunicado sair.

**O site conta a tese, não a rodada.** Quem chega pelo anúncio precisa entender em quinze segundos qual problema o projeto resolve e para quem. Se a home ainda estiver na versão de pré-seed, com jargão genérico e botão de whitelist morto, a visita se perde ali.

**O founder escreve, não só agradece.** O formato que funciona é o post que explica por que a rodada aconteceu: qual aposta os investidores compraram, o que muda no produto, o que vem a seguir sem prometer data. Isso dá ao leitor motivo para seguir o founder, e founder seguido é distribuição permanente.

**As vagas estão abertas.** Captação é o melhor momento de recrutamento do ano. Desenvolvedor bom lê anúncio de rodada como sinal de estabilidade, e página de vagas fechada nessa semana é dinheiro deixado na mesa.

**A imprensa foi trabalhada antes, não depois.** Jornalista não publica release recebido no dia. Pauta de captação se constrói com antecedência, com dado exclusivo e porta-voz disponível, como detalhamos no guia de [PR e assessoria de imprensa para cripto no Brasil](/blog/pr-assessoria-imprensa-cripto-brasil).

## Mês 1: posicionamento antes de campanha

O primeiro mês depois do anúncio não é mês de campanha. É mês de decidir o que o projeto vai dizer pelos próximos dois anos.

Posicionamento aqui não é slogan. É a resposta escrita para quatro perguntas que a equipe inteira precisa dar igual: qual é a alternativa que o usuário abandona ao adotar o produto, qual capacidade única o projeto tem, que valor essa capacidade entrega e para qual perfil ela é urgente. Esse é o método que April Dunford consolidou e que adaptamos para o contexto cripto no artigo sobre [posicionamento aplicado a projetos cripto](/blog/positioning-april-dunford-cripto).

O teste de que o posicionamento está pronto é chato e revelador: peça a cinco pessoas do time para explicar o produto em uma frase, separadamente. Se saírem cinco frases diferentes, não existe posicionamento, existe intuição compartilhada. Colocar mídia paga em cima disso é acelerar a confusão.

Ainda no mês 1 entram dois trabalhos de fundação que não aparecem em dashboard nenhum:

**Prova de legitimidade.** Em web3, a primeira objeção nunca é preço, é confiança. Auditoria publicada e legível, contratos verificados, documentação que um desenvolvedor segue sozinho, equipe com nome e histórico visível, endereços públicos de tesouraria quando fizer sentido. Cada item remove uma objeção que o marketing não consegue argumentar.

**Conteúdo de fundação.** Não é calendário de posts. São as poucas peças que respondem ao que todo avaliador do projeto pergunta: como funciona, por que essa arquitetura, como se compara às alternativas, como usar. Cinco peças bem feitas valem mais que cinquenta posts reativos, porque são elas que os motores de busca e os assistentes de IA citam quando alguém pesquisa a categoria.

## Mês 2: distribuição, imprensa e as primeiras ondas pagas

Com mensagem escrita e prova pública no lugar, o mês 2 é onde a distribuição entra de verdade.

**KOL e criadores, agora sim.** O critério de escolha não é tamanho de audiência, é sobreposição com o perfil de usuário e histórico limpo. Comece com poucos perfis, com link rastreado por criador, e trate a primeira onda como teste pago de mensagem: qual ângulo gerou conversa real, qual gerou like e silêncio.

**Imprensa depois do anúncio.** A cobertura da rodada já passou; a segunda onda precisa de outro gancho: dado próprio do produto, opinião do founder sobre tema quente do setor ou marco verificável. Projeto que só aparece na imprensa quando levanta dinheiro reforça a leitura de que a captação é o produto.

**Mídia paga com objetivo estreito.** Verba de anúncio nesse período deve perseguir uma ação concreta (primeira transação, cadastro em testnet, integração de desenvolvedor), nunca alcance. Awareness pago é o gasto mais fácil de justificar internamente e o mais difícil de defender no board do trimestre seguinte.

**Comunidade com propósito definido.** Abrir Discord porque todo projeto tem Discord produz canal morto com bot de boas-vindas. A pergunta é para que serve o espaço: suporte, feedback de produto, coordenação de builders ou governança. Sem função, ele só documenta o esvaziamento do hype.

## Mês 3: cortar, dobrar e institucionalizar

O terceiro mês é o de decisão. A pergunta não é "o que mais podemos fazer", é "o que já deu sinal e o que estamos mantendo por inércia".

Canal sem sinal aos 60 dias raramente vira sinal aos 120 por insistência, e cortar libera atenção da equipe, que nesse estágio é mais escassa que dinheiro. O que deu sinal precisa ser dobrado com processo, não com heroísmo: se o post técnico do founder puxou os melhores leads, o mês 3 é quando isso vira rotina com pauta e cadência, não algo que acontece quando ele tem tempo.

É também o momento de resolver a estrutura. Time interno resolve o que é permanente e depende de contexto de produto, principalmente uma pessoa sênior com autonomia para decidir. Agência resolve capacidade de produção, relacionamento de imprensa já existente e método pronto para uma fase que tem começo e fim. O erro caro é o inverso: contratar cinco executores antes de existir alguém capaz de dizer o que executar.

## Os erros clássicos desse período

- **Contratar KOL antes de ter mensagem.** Alcance sobre um posicionamento indefinido produz curiosos que não voltam.
- **Prometer roadmap com data.** Setor que atrasa por natureza transforma data pública em munição da própria comunidade. Prometa direção e critério de entrega, não calendário.
- **Gastar o caixa em brand awareness.** Marca em web3 se constrói por uso, integração e prova, não por frequência de banner.
- **Confundir seguidores novos com mercado.** Boa parte do que chega na semana do anúncio é gente que segue captação, não produto.
- **Reescrever a marca inteira no mês 1.** Rebrand consome trimestre e adia a única coisa que importa nesse momento, que é distribuição do produto que já existe.

## Como medir os 90 dias sem se enganar

A medição precisa separar três camadas, porque elas se movem em velocidades diferentes.

**Atenção qualificada.** Volume de busca pelo nome do projeto, tráfego direto, candidaturas espontâneas, conversas com parceiros iniciadas por eles. É o que o anúncio realmente comprou.

**Ativação.** Quantos passaram do primeiro uso: primeira transação, primeira integração rodando, primeiro deploy. É aqui que a maioria dos projetos descobre que o problema não era tráfego.

**Retenção no dia 90.** Dos que ativaram, quantos continuam ativos. É a única camada que responde se o marketing trouxe mercado ou plateia.

Para montar esse painel sem cair em métrica de vaidade, use a régua que descrevemos em [como medir ROI de marketing cripto](/blog/roi-marketing-cripto-como-medir). E registre a linha de base na semana do anúncio: sem baseline, o relatório do dia 90 vira narrativa.

## Conclusão

Os 90 dias depois da rodada não são o momento de gastar, são o momento de construir a base que faz o gasto valer depois. Posicionamento escrito, prova de legitimidade pública, conteúdo de fundação e relacionamento de imprensa continuam trabalhando no mês 12. Campanha institucional publicada na semana do anúncio não sobrevive ao fim de semana.

A ordem importa mais que a intensidade: mensagem antes de amplificação, prova antes de promessa, sinal antes de escala.

A Kaleidos é uma agência especializada em marketing para cripto, web3 e fintech, e trabalha exatamente esse recorte: transformar a janela de atenção de uma captação em posicionamento, distribuição e medição que sobrevivem ao ciclo. Se o seu projeto acabou de levantar uma rodada e não quer queimar a janela, [fale com a Kaleidos](/contato).
`,
  },
  {
    slug: "marketing-para-protocolos-layer-1-layer-2",
    title:
      "Marketing para protocolos Layer 1 e Layer 2: DevRel, grants e grassroots",
    seoTitle: "Marketing para protocolos Layer 1 e Layer 2",
    excerpt:
      "Marketing de L1 e L2 não é marketing de produto, é marketing de plataforma: o usuário final não é conquistado pela chain, ele chega através dos apps que outros constroem. Este guia cobre DevRel como canal de aquisição, programas de grants que geram app vivo, cofinanciamento de go-to-market, grassroots e a armadilha do TVL mercenário.",
    seoDescription:
      "Marketing de protocolos L1 e L2: DevRel como aquisição, grants que geram apps vivos, cofinanciamento de GTM, hackathons e métricas que não são vaidade.",
    category: "growth",
    author: AUTHOR,
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    readTime: 8,
    featured: false,
    coverImage: "/blog/marketing-para-protocolos-layer-1-layer-2/cover.png",
    tags: [
      "layer 1",
      "layer 2",
      "devrel",
      "grants",
      "ecossistema web3",
      "marketing de plataforma",
      "growth cripto",
      "kaleidos",
    ],
    tldr: "Protocolo L1 e L2 cresce quando outros constroem em cima dele. Por isso o público primário é o desenvolvedor, não o usuário final: docs funcionam como landing page, tempo até o primeiro deploy é a métrica de conversão, e grants só valem quando geram app vivo. TVL comprado por incentivo mede o incentivo, não o protocolo.",
    faq: [
      {
        question: "Por que marketing de L1 e L2 é diferente de marketing de produto?",
        answer:
          "Porque o protocolo não entrega valor sozinho ao usuário final. Ninguém acorda querendo usar uma blockchain: a pessoa quer trocar um ativo, tomar crédito, jogar ou receber um pagamento, e faz isso dentro de um aplicativo. O protocolo só chega ao usuário através de quem construiu esse aplicativo. Isso inverte a lógica do funil: o cliente a ser conquistado é o desenvolvedor e a equipe fundadora do app, e o usuário final é consequência do sucesso deles.",
      },
      {
        question: "DevRel é marketing ou engenharia?",
        answer:
          "É os dois, e tratar como só um dos lados quebra o canal. DevRel precisa de profundidade técnica real para ter credibilidade com quem escreve código, e precisa de disciplina de marketing para medir funil, reduzir atrito e priorizar o que trava adoção. Na prática funciona como aquisição: a documentação é a landing page, o quickstart é o formulário, e o primeiro deploy em testnet é a conversão.",
      },
      {
        question: "O que separa um grant que gera app vivo de um grant que vira só anúncio?",
        answer:
          "Três coisas. Primeiro, escolher time por evidência de execução anterior em vez de qualidade do documento enviado. Segundo, pagar por marco entregue e verificável, não como cheque único adiantado. Terceiro, tratar o grant como começo de relacionamento e não como fim de processo: acompanhamento técnico, apoio de go-to-market e conexão com outros times do ecossistema. Grant sem acompanhamento produz repositório parado com post de anúncio bonito.",
      },
      {
        question: "Por que TVL alto pode ser um sinal ruim para um L2?",
        answer:
          "Porque TVL puxado por programa de incentivo mede o incentivo, não a utilidade. Capital mercenário entra enquanto o rendimento extra existe e sai na semana em que ele acaba, muitas vezes migrando em bloco para o próximo protocolo que estiver pagando mais. O número sobe, o gráfico impressiona e nada disso indica que alguém voltaria sem subsídio. O teste honesto é olhar o que sobra depois do fim do programa.",
      },
      {
        question: "Quais métricas realmente indicam saúde de um ecossistema L1 ou L2?",
        answer:
          "Desenvolvedores ativos de forma recorrente, quantos apps continuam funcionando seis meses depois do lançamento, retenção de usuário dentro dos apps (não da chain), e concentração: qual fatia da atividade depende de um único aplicativo. Um ecossistema com muitos apps medianos e vivos é mais saudável que um com um app enorme carregando toda a métrica.",
      },
    ],
    content: `# Marketing para protocolos Layer 1 e Layer 2: DevRel, grants e grassroots

Toda equipe de marketing que chega de um produto de consumo e assume um protocolo L1 ou L2 comete o mesmo erro nos primeiros meses. Monta campanha para usuário final, contrata criadores para explicar a chain, compra mídia falando de taxa baixa e finalidade rápida, e depois estranha que o número de carteiras suba sem que nada aconteça em cima da rede.

O erro não é de execução, é de categoria. Ninguém acorda de manhã querendo usar uma blockchain. A pessoa quer trocar um ativo, tomar crédito, receber um pagamento, jogar ou colecionar. Tudo isso acontece dentro de um aplicativo, e o protocolo só encontra esse usuário se alguém decidiu construir o aplicativo ali.

Isso muda quem é o cliente. Marketing de L1 e L2 é marketing de plataforma: quem precisa ser conquistado é quem constrói, e o usuário final é consequência do sucesso de quem construiu. Campanha brilhante em cima de ecossistema vazio produz curiosos que abrem a carteira, não encontram nada para fazer e nunca voltam.

## Principais takeaways

- Protocolo não é produto de consumo: o cliente é quem constrói, e o usuário final chega através do que foi construído.
- Documentação é a landing page do protocolo, e o tempo até o primeiro deploy é a taxa de conversão que mais importa.
- Grant bom é escolhido por execução anterior, pago por marco verificável e acompanhado depois do desembolso.
- Ecossistema cresce mais quando o protocolo cofinancia o go-to-market dos apps do que quando faz campanha da própria marca.
- Hackathon e evento valem pelo follow-up. Sem processo depois do fim de semana, viram custo de patrocínio.
- TVL e carteiras compradas por incentivo medem o incentivo. Meça desenvolvedor ativo, app vivo aos seis meses e retenção dentro do app.

## O público primário é o desenvolvedor

A decisão de construir em uma chain é decisão de fornecedor, não compra por impulso: o time está apostando meses de trabalho e, muitas vezes, a viabilidade da empresa. As perguntas que ele faz são as de um comprador técnico: as ferramentas funcionam, a documentação está correta, existe alguém para responder quando quebrar, e o protocolo vai continuar existindo daqui a dois anos. Nenhuma delas é respondida por campanha. São respondidas por evidência.

Há uma segunda camada de público quase sempre esquecida: quem dá infraestrutura ao ecossistema. Provedores de nó, indexadores, oráculos, carteiras, bridges, exchanges. Desenvolvedor não constrói onde falta o básico. Conquistar esses fornecedores é pré-requisito de qualquer aquisição de builders, e costuma ser trabalho de parceria, não de comunicação.

## DevRel como canal de aquisição, não como suporte

O jeito mais útil de encarar Developer Relations é como funil, com as mesmas exigências de medição de qualquer canal.

**A documentação é a landing page.** É o ativo com maior tráfego qualificado e o que mais decide adoção. Documentação desatualizada é formulário quebrado: o interessado chega, tenta, falha e vai embora sem falar com ninguém. Trate como produto, com dono, ciclo de revisão e métrica de abandono por página.

**O quickstart é o formulário.** O caminho do zero ao primeiro contrato rodando precisa ser curto, copiável e funcionar sem intervenção humana. Cada dependência não óbvia e cada passo que exige pedir ajuda no Discord é uma etapa de funil onde alguém desiste.

**O primeiro deploy é a conversão.** A métrica que orienta o time inteiro é tempo até o primeiro deploy em testnet. Reduzir esse número é a alavanca mais barata que um protocolo tem, porque melhora todos os outros canais ao mesmo tempo: hackathon converte mais, grant executa mais rápido, evento gera mais gente que efetivamente tenta.

**Presença técnica é distribuição.** Engenheiro do protocolo respondendo dúvida pública, escrevendo sobre decisões de arquitetura e assumindo limitações reais constrói mais confiança que qualquer peça institucional. Quem só publica superlativo é lido como marketing e descontado como tal.

## Programas de grants: o que separa app vivo de post de anúncio

Grant é o instrumento mais usado e mais mal executado do marketing de ecossistema. O padrão de falha é conhecido: comitê avalia propostas escritas, escolhe as melhores no papel, transfere o valor, publica o anúncio e nunca mais fala com quase nenhum dos selecionados. Seis meses depois, boa parte dos repositórios está parada. O que muda o resultado:

**Selecionar por execução, não por documento.** Proposta bem escrita mede capacidade de escrever proposta. O sinal útil é o que o time já entregou: produto no ar, código público, usuários reais. Quem nunca lançou nada raramente lança por causa do grant.

**Pagar por marco verificável.** Desembolso fatiado, atrelado a entregas checáveis em código ou em uso, reduz o incentivo de captar por captar e dá cadência de entrega.

**Tratar o grant como início de relacionamento.** O valor real não é o dinheiro, é o que vem junto: revisão técnica, apresentação para outros times do ecossistema, ajuda para chegar em exchanges, carteiras e integrações. É essa parte que decide se o app sobrevive, e a lógica completa está no artigo sobre [developer grants como GTM](/blog/developer-grants-como-gtm).

**Alocar por tese, não por demanda.** Ecossistema que só financia o que aparece acaba com dezoito clones de DEX. Programa maduro define as lacunas e vai atrás de times para preenchê-las.

## Cofinanciar o go-to-market dos apps

Aqui está a inversão que separa protocolo maduro de protocolo que faz marketing de si mesmo: o melhor uso do orçamento de um L1 ou L2 costuma ser divulgar os apps do ecossistema, não a própria marca. A razão é aritmética. Cada app com tração traz usuários para a chain, gera transações, atrai integrações e vira estudo de caso para o próximo time que estiver decidindo onde construir. Campanha institucional da chain compete pela atenção de um público que ainda não tem motivo para vir.

Na prática, isso vira um conjunto de ativos oferecidos a quem constrói: verba de mídia compartilhada para lançamentos, produção de conteúdo, acesso aos canais do protocolo, apresentações para parceiros de distribuição e apoio de imprensa no dia do lançamento. Um time pequeno que lança com essa estrutura tem chance real; sozinho, lança para o vazio. O cuidado necessário é critério público de elegibilidade: sem ele, o programa vira favorecimento percebido, o que custa mais caro que o benefício.

## Grassroots, hackathons e eventos

**Hackathon vale pelo depois.** O fim de semana produz protótipos, e a maioria morre na segunda-feira. O que converte é o processo posterior: acompanhamento dos times promissores, caminho claro do protótipo até grant e mentoria técnica. Hackathon sem follow-up é linha de custo com foto bonita.

**Comunidades locais precisam de autonomia.** Grupos regionais funcionam quando têm liderança local real e orçamento pequeno com liberdade de uso. Quando viram braço de comunicação do protocolo, esvaziam rápido. O Brasil é caso claro: existe base técnica para sustentar presença própria, desde que ela não seja tratada como filial de um plano feito em outro fuso.

**Evento é relacionamento, não aquisição.** A métrica honesta de uma conferência não é visitante no estande, é quantas conversas viraram integração, grant ou parceria nos 90 dias seguintes.

## A armadilha do TVL mercenário

O jeito mais rápido de fazer um L2 parecer bem-sucedido é ligar um programa de incentivo. TVL sobe, número de carteiras sobe, o gráfico circula. E quase nada disso significa adoção.

Capital mercenário se move por rendimento e sai no dia em que ele acaba, frequentemente em bloco, para o próximo protocolo que estiver pagando mais. Carteira criada para farmar incentivo não é usuário, é endereço. Transação gerada por script para qualificar em airdrop futuro não é uso, é custo.

Isso não torna incentivo inútil: ele resolve partida a frio, dando liquidez inicial para que a experiência do usuário real funcione. O que separa uso competente de autoengano é uma pergunta feita antes de ligar o programa: o que esperamos que sobre quando ele acabar, e como vamos medir. Sem ela, o resultado é um pico e uma ressaca, padrão que já detalhamos no [teardown de L2 com dump de TVL](/blog/teardown-blast-l2-dump-tvl).

## Como medir de verdade

O painel de um protocolo precisa medir a saúde do ecossistema, não o tamanho do anúncio. Quatro camadas dão conta:

**Desenvolvedores ativos de forma recorrente.** Não cadastros no portal nem participantes de hackathon: quem contribui com código de forma consistente ao longo dos meses. Levantamentos públicos como o Electric Capital Developer Report ([developerreport.com](https://www.developerreport.com/)) servem de referência metodológica para acompanhar isso de forma comparável entre ecossistemas.

**Apps que sobrevivem seis meses.** Da safra de lançamentos de um trimestre, quantos continuam funcionando e recebendo atualização meio ano depois. É a métrica que expõe grant mal alocado com atraso suficiente para ainda dar tempo de corrigir o programa.

**Retenção dentro dos apps.** Usuário que volta ao aplicativo, medido pelo próprio app. Retenção da chain é agregação enganosa: se um único app carrega tudo, o ecossistema tem um cliente, não um mercado.

**Concentração.** Qual fatia da atividade depende de um único aplicativo ou programa de incentivo. Ecossistema com muitos apps medianos e vivos é mais resiliente que um com um vencedor sustentando o gráfico. A régua completa por categoria, com o recorte de L1 e L2, está no guia sobre [métricas reais por categoria](/blog/metricas-reais-por-categoria-defi-dao-l1-l2).

## Conclusão

Protocolo cresce quando outros constroem em cima dele. Isso reordena tudo: o desenvolvedor vira o cliente, a documentação vira o principal ativo de conversão, o grant vira instrumento de portfólio e não gesto de generosidade, e o orçamento rende mais divulgando os apps do ecossistema do que a própria chain.

A parte incômoda é que esse crescimento não produz gráfico bonito no primeiro trimestre. Produz base instalada no segundo ano. Protocolo que troca isso por um pico de TVL comprado está adiantando o número e adiando o negócio.

A Kaleidos trabalha ecossistemas com essa lógica: aquisição de builders, comunicação técnica com credibilidade e medição que separa adoção de subsídio. Se o seu protocolo precisa de gente construindo em vez de gente olhando, [fale com a Kaleidos](/contato).
`,
  },
];
