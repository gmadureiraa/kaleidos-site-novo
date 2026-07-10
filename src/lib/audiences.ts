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
      '<strong style="color:#14110D;">30M+ de views</strong> e <strong style="color:#14110D;">50+ lançamentos</strong>: a Kaleidos vira o braço de marca, conteúdo e go-to-market do seu projeto, pra ele virar referência de mercado, não um ticker que aparece e some.',
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
    label: "creators",
    badge: "Pro creator que vive de audiência",
    headlineHtml: `Sua audiência já existe. Falta a máquina de conteúdo que vira <span ${HL}>autoridade</span> (e receita).`,
    subHtml:
      'A Kaleidos estrutura conteúdo, narrativa e distribuição pro creator cripto escalar sem virar refém do feed. <strong style="color:#14110D;">30M+ de views</strong> construídas com quem vive de atenção.',
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
    label: "fintechs",
    badge: "Pra fintech que precisa de confiança",
    headlineHtml: `Marketing que constrói <span ${HL}>confiança</span>, o ativo mais caro de uma fintech.`,
    subHtml:
      'Conteúdo educativo e estratégia que fazem sua fintech ganhar autoridade num mercado regulado e cético. A mesma máquina que gerou <strong style="color:#14110D;">30M+ de views</strong> e fez clientes faturarem <strong style="color:#14110D;">+R$30mi</strong>.',
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
      'SEO, conteúdo de autoridade e distribuição que trazem usuário qualificado sem depender só de paid. A Kaleidos aplica no seu SaaS o que fez marcas virarem referência, com <strong style="color:#14110D;">30M+ de views</strong>.',
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
      'A Kaleidos leva a criatividade e o rigor do mercado cripto pra qualquer empresa: conteúdo que conecta, estratégia que sustenta, resultado que aparece. <strong style="color:#14110D;">+R$30mi faturados</strong> pelos nossos clientes.',
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
];

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}
