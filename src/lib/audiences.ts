// Variantes de home por público. Além do hero (badge/headline/sub), cada público
// ganha BLOCOS personalizados (dores, ênfase de serviços, prova, CTA, FAQ) que
// renderizam SÓ nas rotas de público (/founders /creators /fintech /saas /empresas)
// via <AudienceSections>. A home `/` não usa nada disso e continua igual.
//
// Voz: institucional "a Kaleidos", PT-BR, sem travessão, sem hype vazio.
// Toda prova puxa métrica REAL de um case existente (src/lib/case-data.ts).

const HL =
  'style="background:linear-gradient(#7CF067,#7CF067) center/100% 40% no-repeat;box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px;"';

/** Uma dor/objeção real do segmento. */
export type AudiencePain = { title: string; body: string };

/** Recorte de um serviço REAL do site, com o porquê pra este público. */
export type AudienceService = { title: string; why: string };

/** Prova = 1 case real (rota /cases/<caseId>) com métrica verdadeira. */
export type AudienceProof = {
  caseId: string; // id do case (rota /cases/<caseId>)
  client: string;
  metric: string; // headline numérico REAL do case
  blurb: string; // 1-2 frases verdadeiras, derivadas do case
};

export type AudienceFaq = { q: string; a: string };

export type Audience = {
  slug: string;
  /** rótulo no footer: "Kaleidos para <label>" */
  label: string;
  /**
   * Aparece na coluna "Para quem" do rodapé? (2026-07-28)
   *
   * A página CONTINUA existindo e indexável em qualquer caso — quem cai nela
   * pelo Google segue caindo. Este flag controla só a vitrine do rodapé, que
   * estava com nove links e virou parede de texto.
   *
   * Regra: no máximo 5 marcados. Pra trocar o conjunto, mexe só aqui.
   */
  inFooter?: boolean;
  badge: string;
  headlineHtml: string;
  subHtml: string;
  metaTitle: string;
  metaDesc: string;
  // ── Blocos personalizados (opcionais). Renderizam só nas rotas de público. ──
  pains?: AudiencePain[];
  servicesEmphasis?: AudienceService[];
  proof?: AudienceProof;
  ctaLine?: string;
  faq?: AudienceFaq[];
};

export const AUDIENCES: Audience[] = [
  {
    slug: "founders",
    label: "founders",
    badge: "Pro founder que está construindo em cripto",
    headlineHtml: `O time de marketing que seu projeto cripto ainda não tem, do conteúdo ao <span ${HL}>lançamento</span>.`,
    subHtml:
      '<strong style="color:#14110D;">125M+ de views</strong> e <strong style="color:#14110D;">50+ lançamentos</strong>: a Kaleidos vira o braço de marca, conteúdo e go-to-market do seu projeto, pra ele virar referência de mercado, não um ticker que aparece e some.',
    metaTitle: "Kaleidos para founders — marketing e lançamento de projeto cripto",
    metaDesc:
      "A Kaleidos é o time de marketing, conteúdo e go-to-market do seu projeto cripto. Do posicionamento ao lançamento, com autoridade de verdade.",
    pains: [
      {
        title: "Lançar sem virar exit liquidity",
        body: "Você quer um TGE que constrói base de longo prazo, não um pico de preço que despeja o token na mão da comunidade e some. Sem narrativa e distribuição, o lançamento vira evento de um dia só.",
      },
      {
        title: "Comunidade que some depois do airdrop",
        body: "Farmer entra pela recompensa e sai no primeiro claim. Sem conteúdo e programa de comunidade, o Discord esvazia e o engajamento morre junto com o incentivo.",
      },
      {
        title: "Ninguém entende o que o projeto faz",
        body: "Tecnologia boa explicada errado não converte. Se o mercado não sabe traduzir seu diferencial numa frase, você acaba competindo só por preço e por hype.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Growth & Lançamentos",
        why: "Operação completa de TGE e listagem: funil, páginas de captura e criativos que viram receita, não só barulho.",
      },
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que alinham produto, marca e token num só sistema, antes de gastar o primeiro real em mídia.",
      },
      {
        title: "Marketing de Conteúdo",
        why: "O motor editorial que faz seu projeto virar referência no feed, com autoridade de verdade e não buzzword vazia.",
      },
      {
        title: "Comunidade Cripto",
        why: "Discord e Telegram que transformam farmer em membro ativo, e atenção de curto prazo em retenção.",
      },
    ],
    proof: {
      caseId: "defiverso",
      client: "Defiverso",
      metric: "12M de views orgânicas em 90 dias",
      blurb:
        "A Kaleidos assumiu o marketing do Defiverso do zero e construiu um ecossistema completo: 29 mil inscrições no minicurso, 26 mil assinantes de newsletter e 12 milhões de views orgânicas em 90 dias.",
    },
    ctaLine:
      "Se você está construindo em cripto, a Kaleidos vira o braço de marca, conteúdo e go-to-market do seu projeto. Vamos desenhar o seu lançamento.",
    faq: [
      {
        q: "Vocês trabalham com projeto pré-lançamento?",
        a: "Sim. O melhor momento pra entrar é antes do TGE, quando dá pra construir narrativa e comunidade com antecedência, não correndo atrás depois que o token já listou.",
      },
      {
        q: "Cuidam do lançamento inteiro ou só do conteúdo?",
        a: "Dos dois jeitos. Dá pra pegar uma frente (conteúdo, comunidade, criativos) ou a operação completa de go-to-market, do posicionamento à distribuição.",
      },
      {
        q: "Vocês ativam KOLs e influencers do mercado?",
        a: "Sim, faz parte do go-to-market. A gente ativa as vozes certas do ecossistema com briefing e narrativa alinhados ao projeto, pra não virar aquele post pago genérico que a comunidade fareja de longe.",
      },
    ],
  },
  {
    slug: "creators",
    inFooter: true,
    label: "creators",
    badge: "Pro creator que vive de audiência",
    headlineHtml: `Sua audiência já existe. Falta a máquina de conteúdo que vira <span ${HL}>autoridade</span> (e receita).`,
    subHtml:
      'A Kaleidos estrutura conteúdo, narrativa e distribuição pro creator cripto escalar sem virar refém do feed. <strong style="color:#14110D;">125M+ de views</strong> construídas com quem vive de atenção.',
    metaTitle: "Kaleidos para creators — conteúdo e monetização de audiência cripto",
    metaDesc:
      "Transforme sua audiência em autoridade e receita. A Kaleidos estrutura a máquina de conteúdo, narrativa e distribuição do creator cripto.",
    pains: [
      {
        title: "Refém do feed",
        body: "Seu alcance oscila com o humor do algoritmo. Sem uma máquina de conteúdo e canais próprios (newsletter, comunidade), sua receita depende de um post viralizar.",
      },
      {
        title: "Audiência grande, monetização pequena",
        body: "View não paga boleto. Sem funil e produto, atenção não vira receita, e você troca tempo por engajamento que não capitaliza.",
      },
      {
        title: "Sem tempo pra produzir no ritmo do jogo",
        body: "Roteiro, edição, design, distribuição: sozinho não escala. A constância cai, e junto com ela a relevância.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Marketing de Conteúdo",
        why: "Estratégia, roteiro, design e edição no ritmo que sua audiência exige, sem você virar o gargalo da produção.",
      },
      {
        title: "Growth & Lançamentos",
        why: "Funil, página de captura e lançamento que transformam audiência em receita recorrente.",
      },
      {
        title: "Kaleidos AI",
        why: "Automações e engines de conteúdo que multiplicam sua produção sem perder a sua voz.",
      },
      {
        title: "Social Media Cripto",
        why: "Presença diária que acompanha cada movimento do ciclo e mantém você relevante entre os picos.",
      },
    ],
    proof: {
      caseId: "investidor-4-20",
      client: "Investidor 4.20",
      metric: "5x de faturamento",
      blurb:
        "A Kaleidos estruturou conteúdo, newsletter e operação comercial do Investidor 4.20 do zero: faturamento multiplicado por 5, Instagram de 50 mil para 180 mil e newsletter de 0 a 30 mil inscritos.",
    },
    ctaLine:
      "Sua audiência já existe. A Kaleidos constrói a máquina que transforma ela em autoridade e receita. Vamos conversar.",
    faq: [
      {
        q: "Vocês assumem a produção ou só a estratégia?",
        a: "Os dois. Dá pra terceirizar a produção inteira (roteiro, edição, design) ou só a camada de estratégia e distribuição, conforme o que você já tem rodando.",
      },
      {
        q: "Ajudam a criar produto e funil, não só conteúdo?",
        a: "Sim. A gente construiu operação comercial e lançamentos do zero pra creator, do funil ao follow-up, não só a parte de conteúdo.",
      },
      {
        q: "Meu conteúdo é de cripto, vocês pegam meu nicho?",
        a: "Cripto e web3 são a nossa casa. A gente acompanha ciclo, narrativa e vocabulário do mercado no dia a dia, então você não perde tempo explicando o básico do seu nicho pra gente entender.",
      },
    ],
  },
  {
    slug: "fintech",
    inFooter: true,
    label: "fintechs",
    badge: "Pra fintech que precisa de confiança",
    headlineHtml: `Marketing que constrói <span ${HL}>confiança</span>, o ativo mais caro de uma fintech.`,
    subHtml:
      'Conteúdo educativo e estratégia que fazem sua fintech ganhar autoridade num mercado regulado e cético. A mesma máquina que gerou <strong style="color:#14110D;">125M+ de views</strong> e fez clientes faturarem <strong style="color:#14110D;">+R$46mi</strong>.',
    metaTitle: "Kaleidos para fintechs — marketing estratégico e conteúdo de confiança",
    metaDesc:
      "Marketing que constrói confiança pra fintech: conteúdo educativo, estratégia e autoridade num mercado regulado e cético.",
    pains: [
      {
        title: "Confiança é o ativo mais caro, e o mais difícil",
        body: "Num mercado regulado e cético, um passo em falso na comunicação custa reputação. Você precisa de conteúdo que eduque e credibilize, não que prometa demais.",
      },
      {
        title: "Compliance travando a criatividade",
        body: "Entre o jurídico e o marketing, a mensagem chega diluída. O desafio é ser claro e atraente sem prometer o que não pode.",
      },
      {
        title: "Explicar produto complexo pra público leigo",
        body: "Se o usuário não entende como funciona, não confia. E sem confiar, não converte.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Marketing de Conteúdo",
        why: "Conteúdo educativo que transforma produto complexo em confiança, na linguagem do seu público.",
      },
      {
        title: "SEO & GEO Cripto",
        why: "Conteúdo que rankeia no Google e vira a resposta que o ChatGPT cita quando alguém pesquisa se dá pra confiar em você.",
      },
      {
        title: "PR & Assessoria",
        why: "Autoridade construída com prova e presença em veículos, não com press release vazio.",
      },
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que alinham marca, produto e mensagem num mercado que não perdoa ruído.",
      },
    ],
    proof: {
      caseId: "mercado-bitcoin",
      client: "Mercado Bitcoin",
      metric: "1.000+ posts em 18 meses",
      blurb:
        "A Kaleidos produziu mais de 1.000 posts em 18 meses para a maior exchange do Brasil, mais de 3 por dia útil, construindo autoridade com educação consistente.",
    },
    ctaLine:
      "Confiança se constrói com consistência e clareza. A Kaleidos é o time de conteúdo e autoridade da sua fintech. Vamos conversar.",
    faq: [
      {
        q: "Vocês têm experiência com marca regulada?",
        a: "Sim. A gente já cuidou do conteúdo de exchanges e plataformas financeiras, respeitando o tom e os limites do mercado.",
      },
      {
        q: "Como equilibram compliance e criatividade?",
        a: "Trabalhando junto do seu jurídico desde a pauta, pra mensagem sair clara e atraente sem prometer o que não pode.",
      },
      {
        q: "Dá pra construir autoridade sem prometer retorno?",
        a: "É justamente aí que a gente joga. Autoridade de fintech se constrói com educação, dado e clareza sobre risco, que é o que o público cético procura antes de confiar o dinheiro. Promessa de retorno afasta quem entende, prova consistente aproxima.",
      },
    ],
  },
  {
    slug: "saas",
    label: "SaaS",
    badge: "Pra SaaS que quer crescer orgânico",
    headlineHtml: `Conteúdo que vira <span ${HL}>aquisição</span>: o motor de crescimento orgânico do seu SaaS.`,
    subHtml:
      'SEO, conteúdo de autoridade e distribuição que trazem usuário qualificado sem depender só de paid. A Kaleidos aplica no seu SaaS o que fez marcas virarem referência, com <strong style="color:#14110D;">125M+ de views</strong>.',
    metaTitle: "Kaleidos para SaaS — content-led growth e aquisição orgânica",
    metaDesc:
      "Content-led growth pro seu SaaS: SEO, conteúdo de autoridade e distribuição que trazem usuário qualificado sem depender só de paid.",
    pains: [
      {
        title: "Refém de paid caro",
        body: "CAC sobe, e verba de mídia perto do zero não sustenta crescimento. Sem canal orgânico, cada usuário novo custa mais que o anterior.",
      },
      {
        title: "Conteúdo que não rankeia nem converte",
        body: "Blog abandonado, SEO improvisado. Produzir por produzir não traz usuário qualificado, só enche o site.",
      },
      {
        title: "Invisível pra quem ainda não procura vocês",
        body: "Você só aparece pra quem já busca a solução. Sem autoridade e distribuição, o topo do funil seca.",
      },
    ],
    servicesEmphasis: [
      {
        title: "SEO & GEO Cripto",
        why: "Conteúdo que rankeia no Google e vira a resposta que ChatGPT e Perplexity citam. Demanda orgânica que não some quando o budget acaba.",
      },
      {
        title: "Marketing de Conteúdo",
        why: "Motor editorial que traz usuário qualificado e constrói autoridade, mês após mês.",
      },
      {
        title: "Kaleidos AI",
        why: "Automações e engines de conteúdo que escalam a produção sem inflar o time.",
      },
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que alinham produto e mensagem num só sistema de aquisição.",
      },
    ],
    proof: {
      caseId: "jornal-cripto",
      client: "Jornal Cripto",
      metric: "6 posts automáticos por dia",
      blurb:
        "A Kaleidos construiu o Jornal Cripto do zero: marca, três plataformas web e um motor de conteúdo com 6 posts automáticos por dia via n8n, gerando crescimento orgânico e presença de referência.",
    },
    ctaLine:
      "Conteúdo é o canal de aquisição que compõe juros. A Kaleidos constrói o motor orgânico do seu SaaS. Vamos conversar.",
    faq: [
      {
        q: "Em quanto tempo o orgânico traz resultado?",
        a: "SEO é jogo de composição: os primeiros ganhos aparecem em semanas, mas a curva forte vem no médio prazo. A gente estrutura pra durar, não pra pico.",
      },
      {
        q: "Vocês só fazem cripto?",
        a: "A base é cripto e web3, mas o método de content-led growth (SEO, autoridade, distribuição) vale pra qualquer SaaS.",
      },
      {
        q: "Como isso conversa com meu time de produto e vendas?",
        a: "A pauta sai das dores que o seu time de vendas mais escuta e das features que o produto quer destacar. Assim o orgânico não traz visita solta, traz lead que já chega meio educado e mais perto de virar cliente.",
      },
    ],
  },
  {
    slug: "empresas",
    label: "empresas",
    badge: "Pra empresa que quer sair do ruído",
    headlineHtml: `Marketing estratégico que faz sua empresa virar <span ${HL}>referência</span>, não só mais uma no feed.`,
    subHtml:
      'A Kaleidos leva a criatividade e o rigor do mercado cripto pra qualquer empresa: conteúdo que conecta, estratégia que sustenta, resultado que aparece. <strong style="color:#14110D;">+R$46mi faturados</strong> pelos nossos clientes.',
    metaTitle: "Kaleidos para empresas — agência de marketing estratégico",
    metaDesc:
      "Marketing estratégico que faz sua empresa virar referência. A criatividade e o rigor do mercado cripto aplicados em qualquer empresa.",
    pains: [
      {
        title: "Mais uma no feed",
        body: "Conteúdo genérico não constrói reputação. Se a sua comunicação parece a de todo mundo, você compete só por preço.",
      },
      {
        title: "Marketing sem tese",
        body: "Post bonito que não diz nada não gera negócio. Falta uma linha editorial com ponto de vista, não só volume de posts.",
      },
      {
        title: "Time interno sobrecarregado",
        body: "No dia a dia, a operação engole o planejamento. A marca fica no piloto automático e vai perdendo relevância.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que fazem sua empresa ter um ponto de vista, não só presença.",
      },
      {
        title: "Marketing de Conteúdo",
        why: "Linha editorial com tese: conteúdo que conecta e constrói reputação, não que enche o feed.",
      },
      {
        title: "Growth & Lançamentos",
        why: "Campanhas, funil e criativos que transformam atenção em resultado que aparece no caixa.",
      },
      {
        title: "PR & Assessoria",
        why: "Autoridade construída com prova e presença, pra sua marca virar referência no setor.",
      },
    ],
    proof: {
      caseId: "bit-das-minas",
      client: "Bit das Minas",
      metric: "200% de faturamento nos lançamentos",
      blurb:
        "A Kaleidos assumiu conteúdo, roteiro e lançamentos da Bit das Minas: 200% de aumento no faturamento dos lançamentos e 50% de redução no custo por lead.",
    },
    ctaLine:
      "A Kaleidos leva a criatividade e o rigor do mercado cripto pra qualquer empresa. Vamos fazer a sua sair do ruído.",
    faq: [
      {
        q: "Vocês atendem empresas fora de cripto?",
        a: "Sim. O método nasceu no mercado cripto, que é o mais rápido e exigente que existe, e se aplica a qualquer empresa que quer virar referência.",
      },
      {
        q: "Trabalham com o time interno ou substituem ele?",
        a: "Dos dois jeitos: a gente vira o braço de marketing completo ou reforça o time que você já tem numa frente específica.",
      },
      {
        q: "Não somos de tecnologia, isso funciona pra gente?",
        a: "Funciona. O método não depende do setor ser cripto ou tech: depende de ter um ponto de vista e sustentar ele com constância. A gente traduz o que a sua empresa faz numa linha editorial que o seu mercado entende e respeita.",
      },
    ],
  },
  {
    slug: "cripto",
    inFooter: true,
    label: "cripto",
    badge: "Pra marca que é nativa de cripto",
    headlineHtml: `Marketing cripto de verdade, do conteúdo ao lançamento, feito por quem é <span ${HL}>nativo</span> do mercado.`,
    subHtml:
      'A Kaleidos é o time de marca, conteúdo e go-to-market de projetos cripto desde 2020. <strong style="color:#14110D;">125M+ de views</strong> e <strong style="color:#14110D;">+R$46mi</strong> gerados pra clientes como Crypto.com, Mercado Bitcoin e Ledger.',
    metaTitle: "Kaleidos para cripto — agência de marketing cripto e web3 no Brasil",
    metaDesc:
      "Agência de marketing nativa de cripto: conteúdo, growth e lançamento pra projetos web3. Cripto-nativa desde 2020, com resultado de verdade.",
    pains: [
      {
        title: "Agência generalista não entende o mercado",
        body: "Quem não vive cripto perde a piada, erra o timing do ciclo e trata o seu projeto como se fosse um e-commerce qualquer. Você acaba explicando o básico antes de qualquer entrega sair.",
      },
      {
        title: "Hype não constrói reputação",
        body: "Barulho de curto prazo enche o feed e some no dia seguinte. Sem tese e consistência, o projeto vira mais um ticker que aparece e desaparece do timeline.",
      },
      {
        title: "Ciclo rápido, time interno não acompanha",
        body: "O mercado se move mais rápido que qualquer time enxuto consegue produzir. A constância cai justamente na hora em que a atenção está no pico.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Marketing de Conteúdo",
        why: "O motor editorial que faz seu projeto virar referência no feed, com autoridade de verdade e vocabulário do mercado, não buzzword vazia.",
      },
      {
        title: "Growth & Lançamentos",
        why: "Funil, páginas de captura e criativos que transformam atenção em receita, do TGE à listagem.",
      },
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que alinham produto, marca e token num só sistema antes de gastar o primeiro real em mídia.",
      },
      {
        title: "Comunidade Cripto",
        why: "Discord e Telegram que transformam farmer em membro ativo, e atenção de curto prazo em retenção.",
      },
    ],
    proof: {
      caseId: "crypto-com",
      client: "Crypto.com",
      metric: "210% de aumento nas curtidas",
      blurb:
        "A Kaleidos assumiu a presença digital da Crypto.com no Brasil e transformou a marca em referência educativa do mercado, com 210% de aumento nas curtidas e crescimento consistente de engajamento.",
    },
    ctaLine:
      "Se a sua marca é cripto, a Kaleidos é o time nativo que fala a língua do mercado. Vamos construir a sua autoridade.",
    faq: [
      {
        q: "O que faz vocês serem cripto-nativos de verdade?",
        a: "A Kaleidos trabalha só com cripto e web3 desde 2020. A gente acompanha ciclo, narrativa e vocabulário do mercado no dia a dia, então você não perde tempo explicando o básico pra alguém entender o seu projeto.",
      },
      {
        q: "Vocês pegam a operação inteira ou uma frente só?",
        a: "Dos dois jeitos. Dá pra terceirizar o marketing completo (marca, conteúdo, comunidade, lançamento) ou reforçar o seu time numa frente específica.",
      },
      {
        q: "Trabalham com projeto global entrando no Brasil?",
        a: "Sim. A gente já foi o braço brasileiro de marcas globais como a Crypto.com, adaptando narrativa e conteúdo pro público e pra linguagem do mercado local.",
      },
    ],
  },
  {
    slug: "exchanges",
    inFooter: true,
    label: "exchanges",
    badge: "Pra exchange e corretora cripto",
    headlineHtml: `O time de conteúdo e autoridade que faz sua <span ${HL}>exchange</span> virar referência, não só mais uma corretora.`,
    subHtml:
      'A Kaleidos já produziu <strong style="color:#14110D;">1.000+ posts</strong> pra maior exchange do Brasil. Conteúdo educativo, presença multicanal e autoridade num mercado regulado e disputado.',
    metaTitle: "Kaleidos para exchanges — marketing e conteúdo para corretora cripto",
    metaDesc:
      "Marketing para exchange cripto: conteúdo educativo, presença multicanal e autoridade num mercado regulado. A agência por trás da maior exchange do Brasil.",
    pains: [
      {
        title: "Educar o usuário sem prometer retorno",
        body: "Num mercado regulado, a comunicação precisa educar e credibilizar sem prometer lucro. O desafio é ser claro e atraente dentro dos limites, e ainda assim converter.",
      },
      {
        title: "Volume alto, consistência difícil",
        body: "Uma exchange precisa de presença diária em vários canais. Sem uma máquina de conteúdo, a cadência cai e a marca some entre um pico de mercado e outro.",
      },
      {
        title: "Competir com exchange gringa por atenção",
        body: "As grandes têm budget global. Você ganha no que elas não têm: proximidade, linguagem local e conteúdo que o brasileiro entende e confia.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Marketing de Conteúdo",
        why: "Conteúdo educativo consistente que transforma produto financeiro complexo em confiança, na linguagem do seu público.",
      },
      {
        title: "Social Media Cripto",
        why: "Presença diária e multicanal que acompanha cada movimento do ciclo e mantém a exchange relevante entre os picos.",
      },
      {
        title: "SEO & GEO Cripto",
        why: "Conteúdo que rankeia no Google e vira a resposta que o ChatGPT cita quando alguém pesquisa se dá pra confiar em você.",
      },
      {
        title: "PR & Assessoria",
        why: "Autoridade construída com prova e presença em veículos, o que pesa muito num mercado onde confiança é tudo.",
      },
    ],
    proof: {
      caseId: "mercado-bitcoin",
      client: "Mercado Bitcoin",
      metric: "1.000+ posts em 18 meses",
      blurb:
        "A Kaleidos produziu mais de 1.000 posts em 18 meses para a maior exchange do Brasil, mais de 3 por dia útil, construindo autoridade com educação consistente e multicanal.",
    },
    ctaLine:
      "Autoridade de exchange se constrói com educação consistente. A Kaleidos é o time de conteúdo da sua corretora. Vamos conversar.",
    faq: [
      {
        q: "Vocês têm experiência com marca regulada?",
        a: "Sim. A gente já cuidou do conteúdo da maior exchange do Brasil por 18 meses, respeitando o tom e os limites de um mercado regulado.",
      },
      {
        q: "Dá conta do volume que uma exchange exige?",
        a: "Foi exatamente o que a gente entregou no Mercado Bitcoin: mais de 3 publicações por dia útil, de forma consistente, por um ano e meio. Volume com padrão, não improviso.",
      },
      {
        q: "Como equilibram compliance e conteúdo atraente?",
        a: "Trabalhando junto do seu jurídico desde a pauta, pra mensagem sair clara e envolvente sem prometer retorno nem cruzar o que a regulação não deixa.",
      },
    ],
  },
  {
    slug: "tokenizacao",
    label: "tokenização e RWA",
    badge: "Pra quem está tokenizando o mundo real",
    headlineHtml: `Comunicar <span ${HL}>tokenização</span> e RWA pro institucional e pro varejo, sem perder ninguém no jargão.`,
    subHtml:
      'A Kaleidos traduz produto financeiro complexo em narrativa clara e confiável. O mesmo rigor que a gente aplicou em marcas institucionais como a Ledger, agora pra tokenização e ativos do mundo real.',
    metaTitle: "Kaleidos para tokenização e RWA — marketing para ativos tokenizados",
    metaDesc:
      "Marketing para tokenização e RWA: narrativa clara pro institucional e pro varejo, com rigor de marca e autoridade num mercado técnico e regulado.",
    pains: [
      {
        title: "Explicar RWA pra quem nunca ouviu falar",
        body: "Tokenizar ativo do mundo real é poderoso e confuso na mesma medida. Se o mercado não traduz o benefício numa frase, a inovação vira jargão que ninguém compra.",
      },
      {
        title: "Confiança institucional é inegociável",
        body: "Quem move capital institucional não perdoa amadorismo na comunicação. Um passo em falso na marca custa a credibilidade que abre a porta do investidor.",
      },
      {
        title: "Regulação limita o que dá pra dizer",
        body: "Entre o jurídico e o marketing, a mensagem chega diluída. O desafio é ser claro e atraente sem prometer o que a regulação não deixa.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Consultoria & GTM",
        why: "Posicionamento e narrativa que traduzem tokenização e RWA numa história que institucional e varejo entendem, cada um na sua linguagem.",
      },
      {
        title: "Marketing de Conteúdo",
        why: "Conteúdo educativo que transforma produto financeiro complexo em confiança, com profundidade técnica e clareza.",
      },
      {
        title: "SEO & GEO Cripto",
        why: "Rankear e ser citado pela IA quando alguém pesquisa a categoria que você está criando, antes da concorrência.",
      },
      {
        title: "PR & Assessoria",
        why: "Ponte com veículos e credibilidade construída com prova, o que pesa quando o interlocutor é banco, fundo ou regulador.",
      },
    ],
    proof: {
      caseId: "ledger",
      client: "Ledger",
      metric: "Marca institucional tier-1",
      blurb:
        "A Kaleidos executou a campanha da Ledger no Brasil com alinhamento total às brand guidelines e cobertura nos principais portais do ecossistema, o rigor de marca que uma operação institucional exige.",
    },
    ctaLine:
      "Tokenização vende confiança antes de vender produto. A Kaleidos constrói essa narrativa com você. Vamos conversar.",
    faq: [
      {
        q: "Vocês entendem o lado técnico de RWA e tokenização?",
        a: "A base da Kaleidos é cripto e web3 desde 2020, então DeFi, tokenização e infraestrutura on-chain são território conhecido. A gente traduz o técnico sem achatar o que ele tem de diferente.",
      },
      {
        q: "Conseguem falar com institucional e varejo ao mesmo tempo?",
        a: "Sim, com camadas de mensagem diferentes. O institucional recebe rigor, dado e prova; o varejo recebe a versão clara e acessível. Mesma narrativa, dois níveis de profundidade.",
      },
      {
        q: "Como lidam com marca institucional exigente?",
        a: "Foi o que a gente entregou pra Ledger: alinhamento total a brand guidelines rígidas, sem ruído. Marca séria pede execução séria, e é aí que a gente joga.",
      },
    ],
  },
  {
    slug: "lancamento-de-token",
    inFooter: true,
    label: "lançamento de token",
    badge: "Pra quem vai lançar um token",
    headlineHtml: `Um <span ${HL}>lançamento</span> de token que constrói base de longo prazo, não um pico de preço que some.`,
    subHtml:
      'Go-to-market completo de TGE: narrativa, comunidade, criativos e funil. A Kaleidos já executou <strong style="color:#14110D;">50+ lançamentos</strong>, com casos de <strong style="color:#14110D;">200% de aumento no faturamento</strong> de lançamento.',
    metaTitle: "Kaleidos para lançamento de token — go-to-market e marketing de TGE",
    metaDesc:
      "Marketing de lançamento de token (TGE): narrativa, comunidade, criativos e funil. Um go-to-market que constrói base de longo prazo, não só pico de preço.",
    pains: [
      {
        title: "Lançar sem virar exit liquidity",
        body: "Você quer um TGE que constrói base de longo prazo, não um pico que despeja o token na mão da comunidade e some. Sem narrativa e distribuição, o lançamento vira evento de um dia só.",
      },
      {
        title: "Comunidade que some depois do airdrop",
        body: "Farmer entra pela recompensa e sai no primeiro claim. Sem conteúdo e programa de comunidade, o Discord esvazia e o engajamento morre junto com o incentivo.",
      },
      {
        title: "Sem funil, o TGE vira barulho sem conversão",
        body: "Muita atenção no dia do lançamento e nenhuma estrutura pra capturar e nutrir quem chegou. A demanda quente escorre por falta de página, funil e follow-up.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Growth & Lançamentos",
        why: "Operação completa de TGE e listagem: funil, páginas de captura e criativos que viram receita, não só barulho.",
      },
      {
        title: "Consultoria & GTM",
        why: "Posicionamento, narrativa e roadmap de lançamento que alinham produto, marca e token antes do primeiro real em mídia.",
      },
      {
        title: "Comunidade Cripto",
        why: "Programa de comunidade que segura o farmer depois do claim e transforma incentivo de curto prazo em base fiel.",
      },
      {
        title: "Influencer & KOL",
        why: "Ativação das vozes certas do ecossistema com briefing e narrativa alinhados, pra não virar post pago genérico que a comunidade fareja.",
      },
    ],
    proof: {
      caseId: "bit-das-minas",
      client: "Bit das Minas",
      metric: "200% de faturamento nos lançamentos",
      blurb:
        "A Kaleidos assumiu conteúdo, roteiro e lançamentos da Bit das Minas: 200% de aumento no faturamento dos lançamentos e 50% de redução no custo por lead.",
    },
    ctaLine:
      "O melhor momento pra estruturar um lançamento é antes do TGE. A Kaleidos desenha o seu go-to-market. Vamos conversar.",
    faq: [
      {
        q: "Qual o melhor momento pra chamar vocês?",
        a: "Antes do TGE. Dá pra construir narrativa e comunidade com antecedência, chegando ao lançamento com tração, em vez de correr atrás depois que o token já listou.",
      },
      {
        q: "Cuidam do lançamento inteiro ou só de uma parte?",
        a: "Dos dois jeitos. Dá pra pegar a operação completa de go-to-market (posicionamento, comunidade, criativos, funil) ou uma frente específica do lançamento.",
      },
      {
        q: "Vocês ativam KOLs no lançamento?",
        a: "Sim, faz parte do go-to-market. A gente ativa as vozes certas do ecossistema com briefing e narrativa alinhados ao projeto, pra não virar aquele post pago genérico que a comunidade identifica de longe.",
      },
    ],
  },
];

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// EN: variantes em inglês por slug (?lang=en). Mesma estrutura, mesmas
// métricas canônicas (125M+ / 30+ / R$46mi e métricas reais dos cases).
// Voz institucional, sem hype vazio, sem travessão. Nenhum número novo.
// ─────────────────────────────────────────────────────────────────────────────

type AudienceEnOverride = Omit<Audience, "slug" | "label" | "metaTitle" | "metaDesc">;

const AUDIENCES_EN: Record<string, AudienceEnOverride> = {
  founders: {
    badge: "For founders building in crypto",
    headlineHtml: `The marketing team your crypto project still does not have, from content to <span ${HL}>launch</span>.`,
    subHtml:
      '<strong style="color:#14110D;">125M+ views</strong> and <strong style="color:#14110D;">50+ launches</strong>: Kaleidos becomes the brand, content and go-to-market arm of your project, so it becomes a market reference, not a ticker that shows up and disappears.',
    pains: [
      {
        title: "Launching without becoming exit liquidity",
        body: "You want a TGE that builds a long-term base, not a price spike that dumps the token on the community and fades. Without narrative and distribution, the launch becomes a one-day event.",
      },
      {
        title: "A community that vanishes after the airdrop",
        body: "Farmers join for the reward and leave at the first claim. Without content and a community program, the Discord empties out and engagement dies together with the incentive.",
      },
      {
        title: "Nobody understands what the project does",
        body: "Good technology explained badly does not convert. If the market cannot translate your edge into one sentence, you end up competing only on price and hype.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Growth & Launches",
        why: "Full TGE and listing operation: funnel, capture pages and creatives that turn into revenue, not just noise.",
      },
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that align product, brand and token into one system, before you spend the first dollar on media.",
      },
      {
        title: "Content Marketing",
        why: "The editorial engine that makes your project a reference in the feed, with real authority instead of empty buzzwords.",
      },
      {
        title: "Crypto Community",
        why: "Discord and Telegram that turn farmers into active members, and short-term attention into retention.",
      },
    ],
    proof: {
      caseId: "defiverso",
      client: "Defiverso",
      metric: "12M organic views in 90 days",
      blurb:
        "Kaleidos took over Defiverso's marketing from scratch and built a complete ecosystem: 29,000 mini-course sign-ups, 26,000 newsletter subscribers and 12 million organic views in 90 days.",
    },
    ctaLine:
      "If you are building in crypto, Kaleidos becomes the brand, content and go-to-market arm of your project. Let's design your launch.",
    faq: [
      {
        q: "Do you work with pre-launch projects?",
        a: "Yes. The best time to bring us in is before the TGE, when narrative and community can be built in advance instead of chasing them after the token has already listed.",
      },
      {
        q: "Do you handle the whole launch or only content?",
        a: "Both. We can take one front (content, community, creatives) or the full go-to-market operation, from positioning to distribution.",
      },
      {
        q: "Do you activate KOLs and market influencers?",
        a: "Yes, it is part of the go-to-market. We activate the right voices in the ecosystem with a brief and narrative aligned to the project, so it does not become that generic paid post the community smells from far away.",
      },
    ],
  },
  creators: {
    badge: "For creators who live off their audience",
    headlineHtml: `Your audience already exists. What is missing is the content machine that turns it into <span ${HL}>authority</span> (and revenue).`,
    subHtml:
      'Kaleidos structures content, narrative and distribution so the crypto creator can scale without being hostage to the feed. <strong style="color:#14110D;">125M+ views</strong> built with people who live off attention.',
    pains: [
      {
        title: "Hostage to the feed",
        body: "Your reach swings with the algorithm's mood. Without a content machine and owned channels (newsletter, community), your revenue depends on one post going viral.",
      },
      {
        title: "Big audience, small monetization",
        body: "Views do not pay the bills. Without a funnel and a product, attention does not become revenue, and you trade time for engagement that never compounds.",
      },
      {
        title: "No time to produce at the pace of the game",
        body: "Scripts, editing, design, distribution: alone it does not scale. Consistency drops, and relevance drops with it.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Content Marketing",
        why: "Strategy, scripts, design and editing at the pace your audience demands, without you becoming the production bottleneck.",
      },
      {
        title: "Growth & Launches",
        why: "Funnel, capture page and launches that turn an audience into recurring revenue.",
      },
      {
        title: "Kaleidos AI",
        why: "Automations and content engines that multiply your production without losing your voice.",
      },
      {
        title: "Crypto Social Media",
        why: "Daily presence that follows every move of the cycle and keeps you relevant between the peaks.",
      },
    ],
    proof: {
      caseId: "investidor-4-20",
      client: "Investidor 4.20",
      metric: "5x revenue growth",
      blurb:
        "Kaleidos structured Investidor 4.20's content, newsletter and sales operation from scratch: revenue multiplied by 5, Instagram from 50,000 to 180,000 followers and a newsletter from 0 to 30,000 subscribers.",
    },
    ctaLine:
      "Your audience already exists. Kaleidos builds the machine that turns it into authority and revenue. Let's talk.",
    faq: [
      {
        q: "Do you take over production or only strategy?",
        a: "Both. You can outsource the entire production (scripts, editing, design) or only the strategy and distribution layer, depending on what you already have running.",
      },
      {
        q: "Do you help build the product and funnel, not just content?",
        a: "Yes. We have built sales operations and launches from scratch for creators, from funnel to follow-up, not only the content side.",
      },
      {
        q: "My content is crypto, do you get my niche?",
        a: "Crypto and web3 are our home turf. We follow the market's cycle, narrative and vocabulary every day, so you do not waste time explaining the basics of your niche to us.",
      },
    ],
  },
  fintech: {
    badge: "For fintechs that need trust",
    headlineHtml: `Marketing that builds <span ${HL}>trust</span>, the most expensive asset of a fintech.`,
    subHtml:
      'Educational content and strategy that make your fintech earn authority in a regulated, skeptical market. The same machine that generated <strong style="color:#14110D;">125M+ views</strong> and helped clients earn <strong style="color:#14110D;">+R$46mi</strong> in revenue.',
    pains: [
      {
        title: "Trust is the most expensive asset, and the hardest",
        body: "In a regulated, skeptical market, one wrong move in communication costs reputation. You need content that educates and builds credibility, not content that overpromises.",
      },
      {
        title: "Compliance choking creativity",
        body: "Between legal and marketing, the message arrives diluted. The challenge is being clear and attractive without promising what you cannot.",
      },
      {
        title: "Explaining a complex product to a lay audience",
        body: "If users do not understand how it works, they do not trust it. And without trust, they do not convert.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Content Marketing",
        why: "Educational content that turns a complex product into trust, in your audience's language.",
      },
      {
        title: "Crypto SEO & GEO",
        why: "Content that ranks on Google and becomes the answer ChatGPT cites when someone searches whether you can be trusted.",
      },
      {
        title: "PR & Media Relations",
        why: "Authority built with proof and presence in the press, not with empty press releases.",
      },
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that align brand, product and message in a market that does not forgive noise.",
      },
    ],
    proof: {
      caseId: "mercado-bitcoin",
      client: "Mercado Bitcoin",
      metric: "1,000+ posts in 18 months",
      blurb:
        "Kaleidos produced more than 1,000 posts in 18 months for Brazil's largest exchange, more than 3 per business day, building authority through consistent education.",
    },
    ctaLine:
      "Trust is built with consistency and clarity. Kaleidos is your fintech's content and authority team. Let's talk.",
    faq: [
      {
        q: "Do you have experience with regulated brands?",
        a: "Yes. We have handled content for exchanges and financial platforms, respecting the tone and the limits of the market.",
      },
      {
        q: "How do you balance compliance and creativity?",
        a: "By working with your legal team from the editorial planning stage, so the message comes out clear and attractive without promising what it cannot.",
      },
      {
        q: "Can you build authority without promising returns?",
        a: "That is exactly where we play. Fintech authority is built with education, data and clarity about risk, which is what a skeptical audience looks for before trusting you with money. Promising returns pushes away those who understand, consistent proof brings them closer.",
      },
    ],
  },
  saas: {
    badge: "For SaaS that wants organic growth",
    headlineHtml: `Content that becomes <span ${HL}>acquisition</span>: the organic growth engine of your SaaS.`,
    subHtml:
      'SEO, authority content and distribution that bring qualified users without depending only on paid. Kaleidos applies to your SaaS what made brands become references, with <strong style="color:#14110D;">125M+ views</strong>.',
    pains: [
      {
        title: "Hostage to expensive paid",
        body: "CAC keeps rising, and a near-zero media budget cannot sustain growth. Without an organic channel, every new user costs more than the last.",
      },
      {
        title: "Content that neither ranks nor converts",
        body: "An abandoned blog, improvised SEO. Producing for the sake of producing does not bring qualified users, it just fills the site.",
      },
      {
        title: "Invisible to those not searching for you yet",
        body: "You only show up for people already looking for the solution. Without authority and distribution, the top of the funnel dries up.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Crypto SEO & GEO",
        why: "Content that ranks on Google and becomes the answer ChatGPT and Perplexity cite. Organic demand that does not disappear when the budget runs out.",
      },
      {
        title: "Content Marketing",
        why: "An editorial engine that brings qualified users and builds authority, month after month.",
      },
      {
        title: "Kaleidos AI",
        why: "Automations and content engines that scale production without inflating the team.",
      },
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that align product and message into one acquisition system.",
      },
    ],
    proof: {
      caseId: "jornal-cripto",
      client: "Jornal Cripto",
      metric: "6 automated posts per day",
      blurb:
        "Kaleidos built Jornal Cripto from scratch: brand, three web platforms and a content engine with 6 automated posts per day via n8n, driving organic growth and a reference-level presence.",
    },
    ctaLine:
      "Content is the acquisition channel that compounds. Kaleidos builds your SaaS's organic engine. Let's talk.",
    faq: [
      {
        q: "How long until organic brings results?",
        a: "SEO is a compounding game: the first gains show up in weeks, but the strong curve comes in the mid term. We structure it to last, not to spike.",
      },
      {
        q: "Do you only do crypto?",
        a: "Our base is crypto and web3, but the content-led growth method (SEO, authority, distribution) works for any SaaS.",
      },
      {
        q: "How does this connect with my product and sales teams?",
        a: "The editorial calendar comes from the pains your sales team hears most and the features the product wants to highlight. That way organic does not bring loose visits, it brings leads that arrive half educated and closer to becoming customers.",
      },
    ],
  },
  empresas: {
    badge: "For companies that want out of the noise",
    headlineHtml: `Strategic marketing that makes your company a <span ${HL}>reference</span>, not just another one in the feed.`,
    subHtml:
      'Kaleidos brings the creativity and rigor of the crypto market to any company: content that connects, strategy that lasts, results that show. <strong style="color:#14110D;">+R$46mi in revenue</strong> generated by our clients.',
    pains: [
      {
        title: "Just another one in the feed",
        body: "Generic content does not build reputation. If your communication looks like everyone else's, you compete only on price.",
      },
      {
        title: "Marketing without a thesis",
        body: "A pretty post that says nothing generates no business. What is missing is an editorial line with a point of view, not just post volume.",
      },
      {
        title: "An overloaded internal team",
        body: "Day to day, operations swallow planning. The brand runs on autopilot and slowly loses relevance.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that give your company a point of view, not just a presence.",
      },
      {
        title: "Content Marketing",
        why: "An editorial line with a thesis: content that connects and builds reputation, not content that fills the feed.",
      },
      {
        title: "Growth & Launches",
        why: "Campaigns, funnel and creatives that turn attention into results that show up in the cash flow.",
      },
      {
        title: "PR & Media Relations",
        why: "Authority built with proof and presence, so your brand becomes a reference in its sector.",
      },
    ],
    proof: {
      caseId: "bit-das-minas",
      client: "Bit das Minas",
      metric: "200% launch revenue growth",
      blurb:
        "Kaleidos took over Bit das Minas' content, scripts and launches: a 200% increase in launch revenue and a 50% reduction in cost per lead.",
    },
    ctaLine:
      "Kaleidos brings the creativity and rigor of the crypto market to any company. Let's get yours out of the noise.",
    faq: [
      {
        q: "Do you serve companies outside crypto?",
        a: "Yes. The method was born in the crypto market, the fastest and most demanding one there is, and it applies to any company that wants to become a reference.",
      },
      {
        q: "Do you work with the internal team or replace it?",
        a: "Both ways: we become the full marketing arm or reinforce the team you already have on a specific front.",
      },
      {
        q: "We are not a tech company, does this work for us?",
        a: "It works. The method does not depend on the sector being crypto or tech: it depends on having a point of view and sustaining it with consistency. We translate what your company does into an editorial line your market understands and respects.",
      },
    ],
  },
  cripto: {
    badge: "For brands native to crypto",
    headlineHtml: `Real crypto marketing, from content to launch, made by people who are <span ${HL}>native</span> to the market.`,
    subHtml:
      'Kaleidos has been the brand, content and go-to-market team of crypto projects since 2020. <strong style="color:#14110D;">125M+ views</strong> and <strong style="color:#14110D;">+R$46mi</strong> generated for clients like Crypto.com, Mercado Bitcoin and Ledger.',
    pains: [
      {
        title: "Generalist agencies do not get the market",
        body: "Whoever does not live crypto misses the joke, gets the cycle's timing wrong and treats your project like any e-commerce. You end up explaining the basics before any deliverable ships.",
      },
      {
        title: "Hype does not build reputation",
        body: "Short-term noise fills the feed and is gone the next day. Without a thesis and consistency, the project becomes another ticker that appears and disappears from the timeline.",
      },
      {
        title: "Fast cycle, internal team cannot keep up",
        body: "The market moves faster than any lean team can produce. Consistency drops exactly when attention is at its peak.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Content Marketing",
        why: "The editorial engine that makes your project a reference in the feed, with real authority and the market's vocabulary, not empty buzzwords.",
      },
      {
        title: "Growth & Launches",
        why: "Funnel, capture pages and creatives that turn attention into revenue, from TGE to listing.",
      },
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that align product, brand and token into one system before spending the first dollar on media.",
      },
      {
        title: "Crypto Community",
        why: "Discord and Telegram that turn farmers into active members, and short-term attention into retention.",
      },
    ],
    proof: {
      caseId: "crypto-com",
      client: "Crypto.com",
      metric: "210% increase in likes",
      blurb:
        "Kaleidos took over Crypto.com's digital presence in Brazil and turned the brand into the market's educational reference, with a 210% increase in likes and consistent engagement growth.",
    },
    ctaLine:
      "If your brand is crypto, Kaleidos is the native team that speaks the market's language. Let's build your authority.",
    faq: [
      {
        q: "What makes you truly crypto-native?",
        a: "Kaleidos has worked only with crypto and web3 since 2020. We follow the market's cycle, narrative and vocabulary every day, so you do not waste time explaining the basics for someone to understand your project.",
      },
      {
        q: "Do you take the whole operation or a single front?",
        a: "Both ways. You can outsource the full marketing (brand, content, community, launch) or reinforce your team on a specific front.",
      },
      {
        q: "Do you work with global projects entering Brazil?",
        a: "Yes. We have been the Brazilian arm of global brands like Crypto.com, adapting narrative and content to the local audience and the local market's language.",
      },
    ],
  },
  exchanges: {
    badge: "For crypto exchanges and brokers",
    headlineHtml: `The content and authority team that makes your <span ${HL}>exchange</span> a reference, not just another broker.`,
    subHtml:
      'Kaleidos has produced <strong style="color:#14110D;">1,000+ posts</strong> for Brazil\'s largest exchange. Educational content, multichannel presence and authority in a regulated, competitive market.',
    pains: [
      {
        title: "Educating users without promising returns",
        body: "In a regulated market, communication has to educate and build credibility without promising profit. The challenge is being clear and attractive within the limits, and still converting.",
      },
      {
        title: "High volume, hard consistency",
        body: "An exchange needs daily presence across several channels. Without a content machine, cadence drops and the brand disappears between one market peak and the next.",
      },
      {
        title: "Competing with global exchanges for attention",
        body: "The big ones have global budgets. You win with what they do not have: proximity, local language and content Brazilians understand and trust.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Content Marketing",
        why: "Consistent educational content that turns a complex financial product into trust, in your audience's language.",
      },
      {
        title: "Crypto Social Media",
        why: "Daily, multichannel presence that follows every move of the cycle and keeps the exchange relevant between the peaks.",
      },
      {
        title: "Crypto SEO & GEO",
        why: "Content that ranks on Google and becomes the answer ChatGPT cites when someone searches whether you can be trusted.",
      },
      {
        title: "PR & Media Relations",
        why: "Authority built with proof and presence in the press, which weighs a lot in a market where trust is everything.",
      },
    ],
    proof: {
      caseId: "mercado-bitcoin",
      client: "Mercado Bitcoin",
      metric: "1,000+ posts in 18 months",
      blurb:
        "Kaleidos produced more than 1,000 posts in 18 months for Brazil's largest exchange, more than 3 per business day, building authority through consistent, multichannel education.",
    },
    ctaLine:
      "Exchange authority is built with consistent education. Kaleidos is your broker's content team. Let's talk.",
    faq: [
      {
        q: "Do you have experience with regulated brands?",
        a: "Yes. We handled the content of Brazil's largest exchange for 18 months, respecting the tone and the limits of a regulated market.",
      },
      {
        q: "Can you handle the volume an exchange demands?",
        a: "That is exactly what we delivered at Mercado Bitcoin: more than 3 publications per business day, consistently, for a year and a half. Volume with standards, not improvisation.",
      },
      {
        q: "How do you balance compliance and engaging content?",
        a: "By working with your legal team from the editorial planning stage, so the message comes out clear and engaging without promising returns or crossing what regulation does not allow.",
      },
    ],
  },
  tokenizacao: {
    badge: "For those tokenizing the real world",
    headlineHtml: `Communicating <span ${HL}>tokenization</span> and RWA to institutions and retail, without losing anyone in the jargon.`,
    subHtml:
      "Kaleidos translates complex financial products into a clear, trustworthy narrative. The same rigor we applied to institutional brands like Ledger, now for tokenization and real-world assets.",
    pains: [
      {
        title: "Explaining RWA to people who never heard of it",
        body: "Tokenizing real-world assets is powerful and confusing in equal measure. If the market cannot translate the benefit into one sentence, the innovation becomes jargon nobody buys.",
      },
      {
        title: "Institutional trust is non-negotiable",
        body: "Whoever moves institutional capital does not forgive amateurism in communication. One wrong move in the brand costs the credibility that opens the investor's door.",
      },
      {
        title: "Regulation limits what can be said",
        body: "Between legal and marketing, the message arrives diluted. The challenge is being clear and attractive without promising what regulation does not allow.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Consulting & GTM",
        why: "Positioning and narrative that translate tokenization and RWA into a story institutions and retail both understand, each in its own language.",
      },
      {
        title: "Content Marketing",
        why: "Educational content that turns a complex financial product into trust, with technical depth and clarity.",
      },
      {
        title: "Crypto SEO & GEO",
        why: "Ranking and being cited by AI when someone searches the category you are creating, before the competition.",
      },
      {
        title: "PR & Media Relations",
        why: "A bridge to the press and credibility built with proof, which matters when the counterpart is a bank, a fund or a regulator.",
      },
    ],
    proof: {
      caseId: "ledger",
      client: "Ledger",
      metric: "Tier-1 institutional brand",
      blurb:
        "Kaleidos executed Ledger's campaign in Brazil in full alignment with the brand guidelines and with coverage in the ecosystem's main outlets, the brand rigor an institutional operation demands.",
    },
    ctaLine:
      "Tokenization sells trust before it sells product. Kaleidos builds that narrative with you. Let's talk.",
    faq: [
      {
        q: "Do you understand the technical side of RWA and tokenization?",
        a: "Kaleidos' base has been crypto and web3 since 2020, so DeFi, tokenization and on-chain infrastructure are familiar territory. We translate the technical side without flattening what makes it different.",
      },
      {
        q: "Can you speak to institutions and retail at the same time?",
        a: "Yes, with different layers of messaging. Institutions get rigor, data and proof; retail gets the clear, accessible version. Same narrative, two levels of depth.",
      },
      {
        q: "How do you handle a demanding institutional brand?",
        a: "That is what we delivered for Ledger: full alignment with strict brand guidelines, without noise. A serious brand demands serious execution, and that is where we play.",
      },
    ],
  },
  "lancamento-de-token": {
    badge: "For those about to launch a token",
    headlineHtml: `A token <span ${HL}>launch</span> that builds a long-term base, not a price spike that fades.`,
    subHtml:
      'A complete TGE go-to-market: narrative, community, creatives and funnel. Kaleidos has executed <strong style="color:#14110D;">50+ launches</strong>, with cases of <strong style="color:#14110D;">200% launch revenue growth</strong>.',
    pains: [
      {
        title: "Launching without becoming exit liquidity",
        body: "You want a TGE that builds a long-term base, not a spike that dumps the token on the community and fades. Without narrative and distribution, the launch becomes a one-day event.",
      },
      {
        title: "A community that vanishes after the airdrop",
        body: "Farmers join for the reward and leave at the first claim. Without content and a community program, the Discord empties out and engagement dies together with the incentive.",
      },
      {
        title: "Without a funnel, the TGE becomes noise with no conversion",
        body: "Lots of attention on launch day and no structure to capture and nurture whoever arrived. Hot demand leaks away for lack of a page, a funnel and follow-up.",
      },
    ],
    servicesEmphasis: [
      {
        title: "Growth & Launches",
        why: "Full TGE and listing operation: funnel, capture pages and creatives that turn into revenue, not just noise.",
      },
      {
        title: "Consulting & GTM",
        why: "Positioning, narrative and launch roadmap that align product, brand and token before the first dollar goes to media.",
      },
      {
        title: "Crypto Community",
        why: "A community program that holds the farmer after the claim and turns short-term incentives into a loyal base.",
      },
      {
        title: "Influencer & KOL",
        why: "Activating the right voices in the ecosystem with an aligned brief and narrative, so it does not become the generic paid post the community smells.",
      },
    ],
    proof: {
      caseId: "bit-das-minas",
      client: "Bit das Minas",
      metric: "200% launch revenue growth",
      blurb:
        "Kaleidos took over Bit das Minas' content, scripts and launches: a 200% increase in launch revenue and a 50% reduction in cost per lead.",
    },
    ctaLine:
      "The best time to structure a launch is before the TGE. Kaleidos designs your go-to-market. Let's talk.",
    faq: [
      {
        q: "When is the best time to bring you in?",
        a: "Before the TGE. Narrative and community can be built in advance, arriving at the launch with traction, instead of chasing it after the token has already listed.",
      },
      {
        q: "Do you handle the whole launch or only one part?",
        a: "Both ways. We can take the complete go-to-market operation (positioning, community, creatives, funnel) or a specific front of the launch.",
      },
      {
        q: "Do you activate KOLs for the launch?",
        a: "Yes, it is part of the go-to-market. We activate the right voices in the ecosystem with a brief and narrative aligned to the project, so it does not become that generic paid post the community spots from far away.",
      },
    ],
  },
};

/**
 * Retorna a variante do público no idioma pedido. PT devolve o objeto original;
 * EN mescla as traduções por slug (fallback: PT, se o slug não tiver tradução).
 * slug/label/meta ficam os originais (URLs e SEO continuam canônicos PT).
 */
export function localizeAudience(a: Audience, locale: "pt" | "en"): Audience {
  if (locale !== "en") return a;
  const en = AUDIENCES_EN[a.slug];
  return en ? { ...a, ...en } : a;
}
