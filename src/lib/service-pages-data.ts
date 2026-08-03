// service-pages-data.ts — Fonte única dos dados das páginas de serviço (estilo Lunar Strategy).
// Estrutura por idioma. Cada página é renderizada por <ServicePageTemplate data={...} />.
// Ref de estrutura: _refs-lunar/services/TEMPLATE-ESTRUTURA.md

export type ServiceFor = { title: string; desc: string };
export type ServiceStep = { title: string; desc: string };
export type ServiceWhy = { title: string; desc: string };
export type ServiceCase = { name: string; metric: string; desc: string; href?: string };
export type ServiceFAQ = { question: string; answer: string };
export type ServiceStat = { value: string; label: string };

/** Banda de alto contraste (2ª seção, fundo escuro + número gigante) */
export type ServiceStatement = {
  kicker: string;
  bigValue: string;
  bigLabel: string;
  headline: string;
  body: string;
};
/** Fase de processo enriquecida (timeline + entregáveis + duração) */
export type ServicePhase = {
  tag: string;
  duration: string;
  title: string;
  desc: string;
  deliverables: string[];
};
/** Metodologia / framework nomeado (estilo Lunar "GTM Stack") */
export type ServiceApproach = {
  name: string;
  intro: string;
  pillars: { title: string; desc: string }[];
};

export type ServiceContent = {
  slug: string;
  // hero
  badge: string;
  h1: string;
  subhead: string;
  ctaPrimary: string;
  // accent: 'green' | 'pink'
  accent: "green" | "pink";
  // who is for
  whoTitle: string;
  who: ServiceFor[];
  // why it matters
  whyMattersTitle: string;
  whyMattersBody: string;
  whyMattersBullets: string[];
  // deliverables — "O que entregamos com X" (entregáveis concretos)
  deliverablesTitle?: string;
  deliverables?: string[];
  // process
  processTitle: string;
  process: ServiceStep[];
  // included
  includedTitle: string;
  included: string[];
  // cases
  casesTitle: string;
  cases: ServiceCase[];
  // prova social (ProofSection): ids de TESTIMONIALS a exibir.
  // undefined = padrão (3 primeiros depoimentos) · [] = página sem ProofSection
  proof?: string[];
  // stats bar
  stats: ServiceStat[];
  // why us
  whyUsTitle: string;
  whyUs: ServiceWhy[];
  // faq
  faqTitle: string;
  faq: ServiceFAQ[];
  // banda de alto contraste (2ª seção)
  statement?: ServiceStatement;
  // metodologia / framework nomeado
  approach?: ServiceApproach;
  // processo enriquecido em fases (substitui process quando presente)
  processPhases?: ServicePhase[];
  processNote?: string;
  // o que NÃO está incluso
  notIncluded?: string[];
  includedNote?: string;
  // métricas-assinatura (banda de números grandes)
  signature?: ServiceStat[];
  signatureTitle?: string;
  signatureSubtitle?: string;
  // final cta
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  // whatsapp message seed
  whatsappMessage: string;
  // seo
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

/** Arquétipo de layout — controla a ORDEM das seções e o ritmo de fundos.
 *  1 = AUTORIDADE · 2 = SISTEMA · 3 = MOMENTUM. Cruzado com o accent (green/pink)
 *  garante que as 6 páginas fiquem visivelmente diferentes entre si. */
export type ServiceVariant = 1 | 2 | 3;

export type ServiceData = {
  id: string;
  /** arquétipo de layout (1|2|3) */
  variant: ServiceVariant;
  /** ícone lucide pelo nome — resolvido no índice */
  icon: string;
  /** imagem de hero (render 3D) exibida à direita no hero */
  heroImage?: string;
  pt: ServiceContent;
  en: ServiceContent;
};

/** mapa slug → imagem de hero (render 3D em /public/Kaleidos/servicos) */
const HERO_IMAGES: Record<string, string> = {
  "seo-cripto": "/Kaleidos/servicos/v2/seo.png",
  "consultoria-gtm": "/Kaleidos/servicos/v2/gtm.png",
  "eventos-cripto": "/Kaleidos/servicos/v2/eventos.png",
  "social-media-cripto": "/Kaleidos/servicos/v2/social.png",
  "pr-assessoria": "/Kaleidos/servicos/v2/pr.png",
  "comunidade-cripto": "/Kaleidos/servicos/v2/comunidade.png",
  "influencer-kol": "/Kaleidos/servicos/v2/influencer.png",
};

const STATS_BASE_PT: ServiceStat[] = [
  { value: "30+", label: "Projetos cripto atendidos" },
  { value: "Desde 2020", label: "Nativos de cripto e web3" },
  { value: "125M+", label: "Views gerados" },
];
const STATS_BASE_EN: ServiceStat[] = [
  { value: "30+", label: "Crypto projects served" },
  { value: "Since 2020", label: "Crypto & web3 native" },
  { value: "125M+", label: "Views generated" },
];

export const SERVICE_PAGES: ServiceData[] = [
  // 1 — SEO / GEO
  {
    id: "seo-cripto",
    variant: 1,
    icon: "Search",
    pt: {
      slug: "seo-cripto",
      badge: "SEO & GEO para Web3",
      h1: "SEO e GEO para Cripto e Web3",
      subhead:
        "Ranqueie no Google e seja a resposta que as IAs citam. SEO e GEO (Generative Engine Optimization) feitos pra projetos de blockchain, DeFi e web3 capturarem demanda orgânica de alta intenção, todo dia, sem pagar por clique.",
      ctaPrimary: "Quero ranquear",
      accent: "green",
      whoTitle: "Para quem é o SEO Cripto",
      who: [
        { title: "Protocolos DeFi & Infraestrutura", desc: "Projetos técnicos que precisam educar o mercado e aparecer quando alguém pesquisa pela categoria." },
        { title: "Empresas de Segurança & Auditoria", desc: "Autoridade técnica que se traduz em ranking e em confiança no momento da decisão." },
        { title: "SaaS & Tooling Web3", desc: "Produtos que vendem por busca: documentação, comparativos e páginas de caso de uso que capturam quem já está decidindo." },
        { title: "Projetos rumo ao mainnet", desc: "Quem constrói presença orgânica antes do TGE chega ao lançamento com tração, não dependendo só de paid." },
        { title: "Marcas que querem ser citadas pela IA", desc: "ChatGPT, Perplexity e Google AI Overviews já são canal de descoberta. GEO coloca seu projeto dentro das respostas." },
        { title: "Times queimando budget em paid", desc: "Você paga por cada clique e o tráfego some quando o budget acaba. Orgânico é ativo, não despesa recorrente: SEO derruba o CAC com o tempo." },
      ],
      whyMattersTitle: "Por que SEO e GEO importam agora",
      whyMattersBody:
        "O comportamento de busca mudou de vez. Parte da audiência cripto começa a jornada no Google, parte já pergunta direto pra uma IA. Quem não aparece nos dois entrega demanda qualificada de graça, todo dia, pro concorrente que estruturou o conteúdo primeiro.",
      whyMattersBullets: [
        "Demanda orgânica é o tráfego mais barato e de maior intenção que existe.",
        "GEO (ser citado por LLMs) é a nova fronteira: quase nenhum projeto cripto otimiza pra isso ainda.",
        "Conteúdo técnico bem estruturado vira autoridade e backlink natural.",
        "Resultado composto: cresce sozinho com o tempo, em vez de zerar quando o budget acaba.",
      ],
      deliverablesTitle: "O que entregamos no SEO & GEO",
      deliverables: [
        "Auditoria técnica de SEO (crawl, indexação, Core Web Vitals)",
        "Keyword research cripto-nativo por intenção de busca",
        "Arquitetura de topic clusters e silos de conteúdo",
        "Produção de conteúdo técnico (blog, guias, glossário)",
        "Otimização on-page (títulos, headings, links internos)",
        "Schema markup (Article, FAQ, Organization)",
        "Otimização para GEO (citação por ChatGPT, Perplexity, AI Overviews)",
        "Link building e digital PR cripto",
        "Otimização de landing pages e páginas de produto pra busca",
        "Monitoramento de ranking e de citações em IA",
        "Relatórios mensais com próximos passos",
        "Acompanhamento de updates do algoritmo (Google + LLMs)",
      ],
      processTitle: "Nosso processo de SEO & GEO",
      process: [
        { title: "Auditoria & Pesquisa", desc: "Análise técnica do site, keyword research cripto-nativo, mapeamento de intenção e estudo de como as IAs respondem sobre sua categoria hoje." },
        { title: "Estratégia de Conteúdo", desc: "Arquitetura de tópicos (topic clusters), priorização por intenção e oportunidade, e plano de pautas pra busca tradicional e generativa." },
        { title: "Produção & Otimização", desc: "Conteúdo técnico de alta qualidade, on-page SEO, schema markup, estrutura pensada pra ser citada por LLMs e dados concretos." },
        { title: "Distribuição & Mensuração", desc: "Indexação, backlinks, monitoramento de ranking e de citações em IA, e relatórios com o que ajustar no próximo ciclo." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Auditoria técnica de SEO completa",
        "Keyword research cripto-nativo",
        "Estratégia de topic clusters",
        "Produção de conteúdo técnico (blog/guias)",
        "On-page SEO + schema markup (incl. FAQ schema)",
        "Otimização para GEO (citação por IA)",
        "Link building e digital PR",
        "Relatórios mensais de ranking e citações",
      ],
      casesTitle: "Resultados em conteúdo & autoridade",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Conteúdo e estratégia editorial do zero pra um dos maiores portais de educação cripto do Brasil.", href: "/cases/defiverso" },
        { name: "Jornal Cripto", metric: "Newsletter diária", desc: "Produto editorial cripto com presença orgânica e distribuição recorrente.", href: "/cases/jornal-cripto" },
        { name: "Mercado Bitcoin", metric: "1.000+ Posts", desc: "18 meses de conteúdo educativo pra a maior exchange do Brasil.", href: "/cases/mercado-bitcoin" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para SEO Cripto",
      whyUs: [
        { title: "Nativos de cripto desde 2020", desc: "Entendemos DeFi, L1/L2, tokenomics e a linguagem do seu público. Não é SEO genérico." },
        { title: "GEO antes da concorrência", desc: "Otimizamos pra ser citado por ChatGPT, Perplexity e AI Overviews enquanto o resto ainda nem olha pra isso." },
        { title: "Conteúdo que vira autoridade", desc: "Papers, guias e blog técnico que rankeiam e ainda servem de prova de autoridade comercial." },
        { title: "Foco em entregável, não em vaidade", desc: "Ranking que gera demanda qualificada, não tráfego que não converte." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "Quanto tempo leva pra ver resultado de SEO?", answer: "SEO é composto: os primeiros ganhos aparecem entre 2 e 4 meses, e o resultado cresce de forma acelerada a partir do 6º mês. GEO (citação por IA) pode aparecer mais rápido quando o conteúdo é bem estruturado." },
        { question: "O que é GEO e por que importa pra cripto?", answer: "GEO (Generative Engine Optimization) é otimizar pra ser citado por modelos de IA como ChatGPT e Perplexity. Como parte da audiência cripto já pesquisa direto na IA, estar nas respostas vira um canal de descoberta novo e ainda pouco disputado." },
        { question: "Vocês produzem o conteúdo ou só a estratégia?", answer: "Os dois. Entregamos a estratégia e produzimos o conteúdo técnico cripto-nativo (blog, guias, papers), já otimizado pra busca tradicional e generativa." },
        { question: "SEO funciona pra projeto pré-lançamento?", answer: "Sim, e é o melhor momento pra começar. Construir presença orgânica antes do TGE reduz a dependência de paid no lançamento e cria um ativo que cresce sozinho." },
      ],
      finalCtaTitle: "Pronto pra capturar demanda orgânica?",
      finalCtaSubtitle: "Vamos mapear onde seu projeto pode ranquear e ser citado pelas IAs.",
      statement: {
        kicker: "A busca mudou de lugar",
        bigValue: "~60%",
        bigLabel: "dos cliques ficam no top 3 do Google",
        headline: "Quem não está na primeira resposta, não existe.",
        body: "Parte da sua audiência ainda abre o Google. A outra parte já pergunta direto pra uma IA. Em ambos os casos, a decisão acontece nos três primeiros resultados, ou dentro de uma única resposta gerada. Fora disso, você entrega demanda qualificada de graça pro concorrente que estruturou o conteúdo primeiro.",
      },
      approach: {
        name: "Motor de Conteúdo GEO-First",
        intro: "Não fazemos SEO de checklist. Operamos um sistema de conteúdo que rankeia no Google e, ao mesmo tempo, vira material que as IAs citam, em vez de tratar busca tradicional e generativa como dois projetos separados.",
        pillars: [
          { title: "Intenção cripto-nativa", desc: "Keyword research feito por quem entende DeFi, L1/L2 e tokenomics. Mapeamos a busca de quem já está decidindo, não termos genéricos de volume vazio." },
          { title: "Arquitetura de topic clusters", desc: "Pilar + satélites interligados que constroem autoridade temática, o sinal que o Google e os LLMs usam pra eleger quem é referência da categoria." },
          { title: "Estrutura citável por IA", desc: "Respostas diretas, dados concretos, schema e FAQ pensados pra ChatGPT, Perplexity e AI Overviews extraírem e atribuírem ao seu projeto." },
          { title: "Autoridade e backlinks", desc: "Digital PR e conteúdo de referência que geram links naturais, o que transforma ranking temporário em posição difícil de tomar." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semanas 1–2", title: "Auditoria & Pesquisa", desc: "Diagnóstico técnico do site, keyword research cripto-nativo e um estudo de como as IAs respondem sobre a sua categoria hoje.", deliverables: ["Auditoria técnica completa", "Mapa de keywords por intenção", "Baseline de citação em IA"] },
        { tag: "Fase 02", duration: "Semanas 3–4", title: "Estratégia de Conteúdo", desc: "Arquitetura de topic clusters, priorização por oportunidade e plano editorial pra busca tradicional e generativa.", deliverables: ["Mapa de topic clusters", "Calendário editorial", "Briefings otimizados"] },
        { tag: "Fase 03", duration: "Mês 2 em diante", title: "Produção & Otimização", desc: "Conteúdo técnico de alta qualidade, on-page SEO, schema markup e estrutura desenhada pra ser citada por LLMs.", deliverables: ["Artigos e guias técnicos", "On-page + schema/FAQ", "Otimização GEO"] },
        { tag: "Fase 04", duration: "Contínuo", title: "Distribuição & Mensuração", desc: "Indexação, link building, monitoramento de ranking e de citações em IA, com ajuste de rota a cada ciclo.", deliverables: ["Link building & digital PR", "Relatório mensal de ranking", "Tracking de citações em IA"] },
      ],
      processNote: "Ciclo inicial de 90 dias pra estruturar as fundações; depois, operação contínua de produção e ganho composto.",
      notIncluded: [
        "Gestão de tráfego pago (Google/Meta Ads)",
        "Desenvolvimento do site do zero",
        "Garantia de posição #1 com prazo fixo (ninguém sério promete isso)",
      ],
      includedNote: "Escopo modular: dá pra começar só por estratégia + GEO e escalar a produção conforme o resultado aparece.",
      signatureTitle: "O que o orgânico entrega",
      signatureSubtitle: "Tráfego que não some quando o budget acaba.",
      signature: [
        { value: "2–4 meses", label: "pros primeiros ganhos de ranking" },
        { value: "Composto", label: "cresce sozinho, sem novo budget" },
        { value: "GEO", label: "citação por ChatGPT, Perplexity e AI Overviews" },
      ],
      whatsappMessage: "Olá! Quero falar sobre SEO e GEO para o meu projeto cripto. Podem me ajudar?",
      metaTitle: "SEO e GEO para Cripto e Web3 - Kaleidos Digital",
      metaDescription: "Estratégias de SEO e GEO (otimização para IA) para projetos de blockchain, DeFi e web3. Ranqueie no Google e seja citado por ChatGPT, Perplexity e AI Overviews.",
      keywords: "seo cripto, seo web3, geo, generative engine optimization, seo defi, marketing de conteúdo cripto, kaleidos",
    },
    en: {
      slug: "seo-cripto",
      badge: "SEO & GEO for Web3",
      h1: "Crypto SEO & Web3 Search Strategy",
      subhead:
        "Rank on Google and be the answer AI cites. SEO and GEO (Generative Engine Optimization) built for blockchain, DeFi and web3 brands to capture high-intent organic demand, every day, with no cost per click.",
      ctaPrimary: "I want to rank",
      accent: "green",
      whoTitle: "Who Crypto SEO is for",
      who: [
        { title: "DeFi Protocols & Infrastructure", desc: "Technical projects that need to educate the market and show up for category searches." },
        { title: "Security & Audit Firms", desc: "Technical authority that translates into rankings and trust at decision time." },
        { title: "Web3 SaaS & Tooling", desc: "Products that sell through search: docs, comparisons and use-case pages that capture buyers already deciding." },
        { title: "Projects heading to mainnet", desc: "Build organic presence before the TGE and reach launch with traction, not leaning only on paid." },
        { title: "Brands that want to be cited by AI", desc: "ChatGPT, Perplexity and Google AI Overviews are discovery channels now. GEO puts your project inside the answers." },
        { title: "Teams burning paid budget", desc: "You pay per click and the traffic vanishes when budget runs out. Organic is an asset, not a recurring cost: SEO lowers CAC over time." },
      ],
      whyMattersTitle: "Why SEO and GEO matter now",
      whyMattersBody:
        "Search behavior changed for good. Part of the crypto audience starts on Google, part asks an AI directly. If you don't show up in both, you hand qualified demand away for free, every day, to the competitor who structured their content first.",
      whyMattersBullets: [
        "Organic demand is the cheapest, highest-intent traffic there is.",
        "GEO (being cited by LLMs) is the new frontier: almost no crypto project optimizes for it yet.",
        "Well-structured technical content becomes authority and natural backlinks.",
        "Compounding result: it grows on its own over time instead of resetting when budget runs out.",
      ],
      deliverablesTitle: "What we deliver in SEO & GEO",
      deliverables: [
        "Technical SEO audit (crawl, indexing, Core Web Vitals)",
        "Crypto-native keyword research by search intent",
        "Topic cluster architecture and content silos",
        "Technical content production (blog, guides, glossary)",
        "On-page optimization (titles, headings, internal links)",
        "Schema markup (Article, FAQ, Organization)",
        "GEO optimization (citation by ChatGPT, Perplexity, AI Overviews)",
        "Link building and crypto digital PR",
        "Landing and product page optimization for search",
        "Ranking and AI-citation monitoring",
        "Monthly reports with next steps",
        "Algorithm update tracking (Google + LLMs)",
      ],
      processTitle: "Our SEO & GEO process",
      process: [
        { title: "Audit & Research", desc: "Technical site analysis, crypto-native keyword research, intent mapping and a study of how AIs currently answer about your category." },
        { title: "Content Strategy", desc: "Topic cluster architecture, prioritization by intent and opportunity, and a content plan for both traditional and generative search." },
        { title: "Production & Optimization", desc: "High-quality technical content, on-page SEO, schema markup, structure designed to be cited by LLMs and concrete data." },
        { title: "Distribution & Measurement", desc: "Indexing, backlinks, ranking and AI-citation monitoring, and reports on what to adjust next cycle." },
      ],
      includedTitle: "What's included",
      included: [
        "Full technical SEO audit",
        "Crypto-native keyword research",
        "Topic cluster strategy",
        "Technical content production (blog/guides)",
        "On-page SEO + schema markup (incl. FAQ schema)",
        "GEO optimization (AI citation)",
        "Link building and digital PR",
        "Monthly ranking and citation reports",
      ],
      casesTitle: "Content & authority results",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Content and editorial strategy from scratch for one of Brazil's largest crypto education portals.", href: "/cases/defiverso" },
        { name: "Jornal Cripto", metric: "Daily newsletter", desc: "Crypto editorial product with organic presence and recurring distribution.", href: "/cases/jornal-cripto" },
        { name: "Mercado Bitcoin", metric: "1,000+ Posts", desc: "18 months of educational content for Brazil's largest exchange.", href: "/cases/mercado-bitcoin" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Crypto SEO",
      whyUs: [
        { title: "Crypto-native since 2020", desc: "We get DeFi, L1/L2, tokenomics and your audience's language. This isn't generic SEO." },
        { title: "GEO ahead of the curve", desc: "We optimize to be cited by ChatGPT, Perplexity and AI Overviews while everyone else ignores it." },
        { title: "Content that becomes authority", desc: "Papers, guides and technical blog that rank and double as commercial proof." },
        { title: "Deliverable-focused, not vanity", desc: "Rankings that drive qualified demand, not traffic that never converts." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "How long until SEO shows results?", answer: "SEO compounds: first gains appear between 2 and 4 months, accelerating from month 6. GEO (AI citation) can show up faster when content is well structured." },
        { question: "What is GEO and why does it matter for crypto?", answer: "GEO (Generative Engine Optimization) means optimizing to be cited by AI models like ChatGPT and Perplexity. Since part of the crypto audience already searches directly in AI, being in those answers is a new, low-competition discovery channel." },
        { question: "Do you produce content or just strategy?", answer: "Both. We deliver strategy and produce crypto-native technical content (blog, guides, papers), already optimized for traditional and generative search." },
        { question: "Does SEO work for pre-launch projects?", answer: "Yes, and it's the best time to start. Building organic presence before the TGE reduces paid dependency at launch and creates an asset that grows on its own." },
      ],
      finalCtaTitle: "Ready to capture organic demand?",
      finalCtaSubtitle: "Let's map where your project can rank and get cited by AI.",
      statement: {
        kicker: "Search moved",
        bigValue: "~60%",
        bigLabel: "of clicks stay in Google's top 3",
        headline: "If you're not the first answer, you don't exist.",
        body: "Part of your audience still opens Google. The other part asks an AI directly. Either way, the decision happens in the first three results, or inside a single generated answer. Outside of that, you hand qualified demand away for free to the competitor who structured their content first.",
      },
      approach: {
        name: "GEO-First Content Engine",
        intro: "We don't do checklist SEO. We run a content system that ranks on Google and, at the same time, becomes material AIs cite, instead of treating traditional and generative search as two separate projects.",
        pillars: [
          { title: "Crypto-native intent", desc: "Keyword research by people who get DeFi, L1/L2 and tokenomics. We map searches from buyers already deciding, not generic high-volume noise." },
          { title: "Topic cluster architecture", desc: "Pillar + interlinked satellites that build topical authority, the signal Google and LLMs use to crown the category reference." },
          { title: "AI-citable structure", desc: "Direct answers, concrete data, schema and FAQ built so ChatGPT, Perplexity and AI Overviews extract and attribute it to your project." },
          { title: "Authority & backlinks", desc: "Digital PR and reference content that earn natural links, turning temporary rankings into hard-to-take positions." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Weeks 1–2", title: "Audit & Research", desc: "Technical site diagnosis, crypto-native keyword research and a study of how AIs answer about your category today.", deliverables: ["Full technical audit", "Keyword map by intent", "AI-citation baseline"] },
        { tag: "Phase 02", duration: "Weeks 3–4", title: "Content Strategy", desc: "Topic cluster architecture, prioritization by opportunity and an editorial plan for traditional and generative search.", deliverables: ["Topic cluster map", "Editorial calendar", "Optimized briefs"] },
        { tag: "Phase 03", duration: "Month 2 on", title: "Production & Optimization", desc: "High-quality technical content, on-page SEO, schema markup and structure designed to be cited by LLMs.", deliverables: ["Technical articles & guides", "On-page + schema/FAQ", "GEO optimization"] },
        { tag: "Phase 04", duration: "Ongoing", title: "Distribution & Measurement", desc: "Indexing, link building, ranking and AI-citation monitoring, with course correction each cycle.", deliverables: ["Link building & digital PR", "Monthly ranking report", "AI-citation tracking"] },
      ],
      processNote: "Initial 90-day cycle to build the foundations; then continuous production and compounding gains.",
      notIncluded: [
        "Paid traffic management (Google/Meta Ads)",
        "Building the website from scratch",
        "Guaranteed #1 ranking on a fixed deadline (no serious agency promises that)",
      ],
      includedNote: "Modular scope: start with strategy + GEO and scale production as results show up.",
      signatureTitle: "What organic delivers",
      signatureSubtitle: "Traffic that doesn't vanish when budget runs out.",
      signature: [
        { value: "2–4 months", label: "to first ranking gains" },
        { value: "Compounding", label: "grows on its own, no new budget" },
        { value: "GEO", label: "cited by ChatGPT, Perplexity and AI Overviews" },
      ],
      whatsappMessage: "Hello! I'd like to talk about SEO and GEO for my crypto project. Can you help?",
      metaTitle: "Crypto SEO & GEO (AI Search) - Kaleidos Digital",
      metaDescription: "SEO and GEO (AI optimization) strategies for blockchain, DeFi and web3 projects. Rank on Google and get cited by ChatGPT, Perplexity and AI Overviews.",
      keywords: "crypto seo, web3 seo, geo, generative engine optimization, defi seo, crypto content marketing, kaleidos",
    },
  },

  // 2 — Consultoria & GTM
  {
    id: "consultoria-gtm",
    variant: 2,
    icon: "Compass",
    pt: {
      slug: "consultoria-gtm",
      badge: "Consultoria Web3 & GTM",
      h1: "Consultoria Web3 & Estratégia de Go-to-Market",
      subhead:
        "Posicionamento, narrativa e frameworks de execução que alinham produto, marca e token num único sistema de crescimento. Pra projetos cripto cansados de queimar budget e prontos pra lançar com clareza.",
      ctaPrimary: "Quero uma estratégia",
      accent: "pink",
      whoTitle: "Para quem é a Consultoria & GTM",
      who: [
        { title: "Projetos pré-lançamento", desc: "Definir posicionamento, narrativa e plano de go-to-market antes de gastar o primeiro real." },
        { title: "Projetos preparando grandes lançamentos", desc: "Coordenar produto, marca e comunidade num plano de lançamento que performa." },
        { title: "Projetos pós-lançamento sem direção", desc: "Crescimento travou e ninguém sabe o próximo passo. A gente recoloca nos trilhos com prioridades claras." },
        { title: "Projetos em rebranding ou reposicionamento", desc: "Reconstruir narrativa e percepção de mercado sem perder a comunidade que você já tem." },
        { title: "Times queimando budget sem ROI", desc: "Esforço espalhado em mil frentes, zero resultado. Trocamos isso por um sistema de crescimento com métricas." },
        { title: "Projetos em estágio inicial", desc: "Estruturar as fundações de marca e distribuição desde o começo." },
      ],
      whyMattersTitle: "Por que estratégia importa",
      whyMattersBody:
        "A maioria dos projetos cripto não morre por falta de produto, morre por falta de distribuição e posicionamento. Sem uma estratégia que conecte produto, marca e token na mesma história, o budget vira esforço disperso e o lançamento vira aposta no escuro.",
      whyMattersBullets: [
        "Posicionamento errado custa caro e é difícil de consertar depois do lançamento.",
        "Produto, marca e token precisam contar exatamente a mesma história.",
        "Um GTM claro transforma budget em resultado que dá pra medir.",
        "Estratégia tira o risco do momento mais caro do projeto: o lançamento.",
      ],
      deliverablesTitle: "O que entregamos na Consultoria & GTM",
      deliverables: [
        "Diagnóstico de posicionamento e de mercado",
        "Definição de ICP e personas (investidor, dev, KOL, instituição)",
        "Messaging e narrativa do projeto",
        "Estratégia de go-to-market pré e pós-TGE",
        "Roadmap de canais e priorização de esforço",
        "Estrutura de funil (descoberta → comunidade → conversão)",
        "Plano de conteúdo e calendário editorial",
        "Estratégia de comunidade e de parcerias",
        "Plano de lançamento (TGE, listagem, airdrop)",
        "KPIs, dashboards e modelo de mensuração",
        "Playbook operacional pro time interno",
        "Acompanhamento e revisão estratégica recorrente",
      ],
      processTitle: "Nosso processo de Consultoria & GTM",
      process: [
        { title: "Descoberta & Pesquisa", desc: "Imersão no produto, mercado, concorrentes e comunidade. Entendemos onde você está e onde dá pra chegar." },
        { title: "Desenvolvimento da Estratégia", desc: "Posicionamento, narrativa, ICP, mensagem central e plano de canais alinhados a produto e token." },
        { title: "Planejamento de Execução", desc: "Roadmap acionável: o que fazer, em que ordem, com que recurso e quais métricas acompanhar." },
        { title: "Entrega & Handoff", desc: "Frameworks documentados, prontos pro seu time executar, ou pra Kaleidos executar com vocês." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Auditoria de produto, marca e mercado",
        "Definição de posicionamento e narrativa",
        "ICP e mensagem central (messaging)",
        "Estratégia de canais e distribuição",
        "Plano de go-to-market e roadmap de lançamento",
        "Frameworks de execução documentados",
        "Alinhamento produto + marca + token",
        "Sessões de estratégia com o time",
      ],
      casesTitle: "Projetos guiados por estratégia",
      cases: [
        { name: "Investidor 4.20", metric: "10x Faturamento", desc: "Desenvolvimento comercial completo e estratégia de lançamento.", href: "/cases/investidor-4-20" },
        { name: "Bit das Minas", metric: "+200% Faturamento", desc: "Estratégia de conteúdo e lançamento pra educação cripto feminina.", href: "/cases/bit-das-minas" },
        { name: "Neobankless", metric: "Fintech", desc: "Posicionamento e estratégia de conteúdo pra fintech de dólar digital.", href: "/cases/neobankless" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para Consultoria & GTM",
      whyUs: [
        { title: "Consultoria cripto-nativa desde 2020", desc: "Já vimos dezenas de lançamentos. Sabemos o que funciona e o que só queima budget." },
        { title: "Produto + marca + token alinhados", desc: "Não tratamos marketing isolado: conectamos tudo num sistema de crescimento." },
        { title: "Frameworks acionáveis", desc: "Entregamos plano que o time consegue executar, não slide bonito que vira gaveta." },
        { title: "Visão de quem também executa", desc: "Estratégia desenhada por quem produz conteúdo e roda lançamento de verdade." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "O que diferencia GTM cripto de GTM tradicional?", answer: "Em cripto, comunidade, token e narrativa ficam no centro de tudo. O GTM precisa coordenar incentivos on-chain, timing de TGE e percepção de mercado, variáveis que o GTM tradicional simplesmente ignora." },
        { question: "Quando devo contratar consultoria web3?", answer: "O ideal é antes do lançamento, quando posicionamento e narrativa ainda podem ser moldados. Mas também ajudamos projetos pós-lançamento que perderam direção ou precisam reposicionar." },
        { question: "Vocês só fazem a estratégia ou também executam?", answer: "Os dois. Podemos entregar o framework pro seu time executar, ou assumir a execução de conteúdo, comunidade e lançamento junto com vocês." },
        { question: "Quanto tempo dura um projeto de consultoria?", answer: "Um ciclo de estratégia e GTM costuma levar de 3 a 6 semanas até a entrega dos frameworks. Depois disso, a execução pode ser contínua." },
      ],
      finalCtaTitle: "Pronto pra lançar com clareza?",
      finalCtaSubtitle: "Vamos desenhar o sistema de crescimento do seu projeto.",
      statement: {
        kicker: "O verdadeiro motivo do fracasso",
        bigValue: "90%",
        bigLabel: "dos projetos cripto morrem por distribuição, não por produto",
        headline: "Marketing é a camada de distribuição. GTM é o sistema operacional embaixo dela.",
        body: "Quando o time pula o sistema e vai direto pra execução, não está escalando, está chutando. Sem posicionamento, narrativa e sequenciamento de canais alinhados a produto e token, o budget vira esforço disperso e o lançamento vira aposta no escuro.",
      },
      approach: {
        name: "Web3 GTM Stack",
        intro: "Nossa consultoria não entrega slide bonito que vira gaveta. Entrega um sistema de crescimento em quatro camadas interdependentes, na ordem certa: estratégia antes de tática, sempre.",
        pillars: [
          { title: "1. Posicionamento & Narrativa", desc: "Por que o projeto existe, quem ganha e por que agora. A história que produto, marca e token contam, idêntica em todos os pontos de contato." },
          { title: "2. Priorização de Audiência", desc: "Users, devs e investidores não são o mesmo público. Cada um com mensagem, canal e jornada próprios, priorizados por impacto." },
          { title: "3. Sequenciamento de Canais", desc: "Timing e ordem batem volume. Definimos o que ativar primeiro, quando e com qual sinal antes de gastar o próximo real." },
          { title: "4. Design de Incentivos", desc: "Token, recompensas e quests alinhados à jornada real do usuário, e não a vanity metrics que inflam o gráfico e não convertem." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semana 1", title: "Descoberta & Pesquisa", desc: "Imersão em produto, mercado, concorrentes e comunidade. Entendemos onde você está e onde dá pra chegar.", deliverables: ["Auditoria de produto e mercado", "Análise competitiva", "Mapa de oportunidades"] },
        { tag: "Fase 02", duration: "Semanas 2–3", title: "Desenvolvimento da Estratégia", desc: "Posicionamento, narrativa, ICP, mensagem central e plano de canais, alinhados a produto e token.", deliverables: ["Messaging & narrativa", "Definição de ICP", "Plano de canais"] },
        { tag: "Fase 03", duration: "Semanas 4–5", title: "Planejamento de Execução", desc: "Roadmap acionável: o que fazer, em que ordem, com qual recurso e quais métricas acompanhar.", deliverables: ["Roadmap de GTM", "Plano de lançamento", "Dashboard de métricas"] },
        { tag: "Fase 04", duration: "Semana 6", title: "Entrega & Handoff", desc: "Frameworks documentados, prontos pro seu time executar, ou pra Kaleidos executar com vocês.", deliverables: ["Frameworks documentados", "Sessão de handoff", "Plano de execução contínua"] },
      ],
      processNote: "Ciclo de estratégia de 3 a 6 semanas até a entrega dos frameworks. Depois, a execução pode ser contínua com a Kaleidos.",
      notIncluded: [
        "Desenvolvimento de smart contract ou produto",
        "Auditoria técnica / de segurança on-chain",
        "Tokenomics quantitativa (modelagem econômica formal)",
      ],
      includedNote: "Pode parar no handoff dos frameworks ou seguir pra execução de conteúdo, comunidade e lançamento com o nosso time.",
      signatureTitle: "Por que estratégia primeiro",
      signatureSubtitle: "O lançamento é o momento mais caro do projeto. Não dá pra chutar.",
      signature: [
        { value: "3–6 semanas", label: "até os frameworks na mão" },
        { value: "1 narrativa", label: "produto + marca + token na mesma história" },
        { value: "Desde 2020", label: "dezenas de lançamentos cripto acompanhados" },
      ],
      whatsappMessage: "Olá! Preciso de consultoria de estratégia e go-to-market pro meu projeto cripto. Podem me ajudar?",
      metaTitle: "Consultoria Web3 & Go-to-Market - Kaleidos Digital",
      metaDescription: "Consultoria de estratégia e go-to-market para projetos cripto e web3. Posicionamento, narrativa e frameworks de execução que alinham produto, marca e token.",
      keywords: "consultoria web3, go-to-market cripto, gtm cripto, estratégia de lançamento, posicionamento cripto, kaleidos",
    },
    en: {
      slug: "consultoria-gtm",
      badge: "Web3 Consulting & GTM",
      h1: "Web3 Consulting & GTM Strategy",
      subhead:
        "Positioning, narrative and execution frameworks that align product, brand and token into one growth system. For crypto projects tired of burning budget and ready to launch with clarity.",
      ctaPrimary: "I want a strategy",
      accent: "pink",
      whoTitle: "Who Consulting & GTM is for",
      who: [
        { title: "Pre-launch projects", desc: "Define positioning, narrative and go-to-market plan before spending a dollar." },
        { title: "Projects preparing major launches", desc: "Coordinate product, brand and community into a launch plan that performs." },
        { title: "Post-launch projects needing direction", desc: "Growth stalled and no one knows the next move. We get it back on track with clear priorities." },
        { title: "Projects rebranding or repositioning", desc: "Rebuild narrative and market perception without losing the community you already have." },
        { title: "Teams burning budget without ROI", desc: "Effort spread across ten fronts, zero results. We swap that for a growth system with real metrics." },
        { title: "Early-stage projects", desc: "Build brand and distribution foundations from the start." },
      ],
      whyMattersTitle: "Why strategy matters",
      whyMattersBody:
        "Most crypto projects don't die for lack of product, they die for lack of distribution and positioning. Without a strategy tying product, brand and token into one story, budget turns into scattered effort and the launch turns into a shot in the dark.",
      whyMattersBullets: [
        "Wrong positioning is expensive and hard to fix after launch.",
        "Product, brand and token have to tell the exact same story.",
        "A clear GTM turns budget into results you can actually measure.",
        "Strategy de-risks the most expensive moment of the project: the launch.",
      ],
      deliverablesTitle: "What we deliver in Consulting & GTM",
      deliverables: [
        "Positioning and market diagnosis",
        "ICP and persona definition (investor, dev, KOL, institution)",
        "Project messaging and narrative",
        "Go-to-market strategy pre and post-TGE",
        "Channel roadmap and effort prioritization",
        "Funnel structure (discovery → community → conversion)",
        "Content plan and editorial calendar",
        "Community and partnership strategy",
        "Launch plan (TGE, listing, airdrop)",
        "KPIs, dashboards and measurement model",
        "Operational playbook for the internal team",
        "Recurring strategic review and follow-up",
      ],
      processTitle: "Our Consulting & GTM process",
      process: [
        { title: "Discovery & Research", desc: "Deep dive into product, market, competitors and community. We learn where you are and where you can go." },
        { title: "Strategy Development", desc: "Positioning, narrative, ICP, core messaging and channel plan aligned to product and token." },
        { title: "Execution Planning", desc: "Actionable roadmap: what to do, in what order, with what resources and which metrics to track." },
        { title: "Delivery & Handoff", desc: "Documented frameworks, ready for your team to execute, or for Kaleidos to execute with you." },
      ],
      includedTitle: "What's included",
      included: [
        "Product, brand and market audit",
        "Positioning and narrative definition",
        "ICP and core messaging",
        "Channel and distribution strategy",
        "Go-to-market plan and launch roadmap",
        "Documented execution frameworks",
        "Product + brand + token alignment",
        "Strategy sessions with the team",
      ],
      casesTitle: "Strategy-guided projects",
      cases: [
        { name: "Investidor 4.20", metric: "10x Revenue", desc: "Full commercial development and launch strategy.", href: "/cases/investidor-4-20" },
        { name: "Bit das Minas", metric: "+200% Revenue", desc: "Content and launch strategy for female crypto education.", href: "/cases/bit-das-minas" },
        { name: "Neobankless", metric: "Fintech", desc: "Positioning and content strategy for a digital-dollar fintech.", href: "/cases/neobankless" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Consulting & GTM",
      whyUs: [
        { title: "Crypto-native consulting since 2020", desc: "We've seen dozens of launches. We know what works and what just burns budget." },
        { title: "Product + brand + token aligned", desc: "We don't treat marketing in isolation: we connect it all into one growth system." },
        { title: "Actionable frameworks", desc: "We deliver a plan your team can execute, not a pretty deck that gets shelved." },
        { title: "Built by people who execute", desc: "Strategy designed by those who actually produce content and run launches." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "What makes crypto GTM different from traditional GTM?", answer: "In crypto, community, token and narrative sit at the center of everything. GTM has to coordinate on-chain incentives, TGE timing and market perception, variables traditional GTM simply ignores." },
        { question: "When should I engage web3 consulting?", answer: "Ideally before launch, while positioning and narrative can still be shaped. But we also help post-launch projects that lost direction or need to reposition." },
        { question: "Do you only do strategy or also execute?", answer: "Both. We can deliver the framework for your team, or take over content, community and launch execution alongside you." },
        { question: "How long does a consulting project take?", answer: "A strategy and GTM cycle usually takes 3 to 6 weeks to framework delivery. After that, execution can be ongoing." },
      ],
      finalCtaTitle: "Ready to launch with clarity?",
      finalCtaSubtitle: "Let's design your project's growth system.",
      statement: {
        kicker: "The real reason projects fail",
        bigValue: "90%",
        bigLabel: "of crypto projects die from distribution, not product",
        headline: "Marketing is the distribution layer. GTM is the operating system underneath it.",
        body: "When teams skip the system and jump straight to execution, they're not scaling, they're guessing. Without positioning, narrative and channel sequencing aligned to product and token, budget turns into scattered effort and the launch becomes a shot in the dark.",
      },
      approach: {
        name: "Web3 GTM Stack",
        intro: "Our consulting doesn't deliver a pretty deck that gets shelved. It delivers a four-layer, interdependent growth system, in the right order: strategy before tactics, always.",
        pillars: [
          { title: "1. Positioning & Narrative", desc: "Why the project exists, who wins and why now. The story product, brand and token tell, identical across every touchpoint." },
          { title: "2. Audience Prioritization", desc: "Users, devs and investors aren't the same audience. Each gets its own message, channel and journey, prioritized by impact." },
          { title: "3. Channel Sequencing", desc: "Timing and order beat volume. We define what to activate first, when and with what signal before spending another dollar." },
          { title: "4. Incentive Design", desc: "Token, rewards and quests aligned to the real user journey, not vanity metrics that inflate the chart and never convert." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Week 1", title: "Discovery & Research", desc: "Deep dive into product, market, competitors and community. We learn where you are and where you can go.", deliverables: ["Product & market audit", "Competitive analysis", "Opportunity map"] },
        { tag: "Phase 02", duration: "Weeks 2–3", title: "Strategy Development", desc: "Positioning, narrative, ICP, core messaging and channel plan, aligned to product and token.", deliverables: ["Messaging & narrative", "ICP definition", "Channel plan"] },
        { tag: "Phase 03", duration: "Weeks 4–5", title: "Execution Planning", desc: "Actionable roadmap: what to do, in what order, with what resources and which metrics to track.", deliverables: ["GTM roadmap", "Launch plan", "Metrics dashboard"] },
        { tag: "Phase 04", duration: "Week 6", title: "Delivery & Handoff", desc: "Documented frameworks, ready for your team to execute, or for Kaleidos to execute with you.", deliverables: ["Documented frameworks", "Handoff session", "Ongoing execution plan"] },
      ],
      processNote: "A 3 to 6-week strategy cycle to framework delivery. After that, execution can be ongoing with Kaleidos.",
      notIncluded: [
        "Smart contract or product development",
        "Technical / on-chain security audit",
        "Quantitative tokenomics (formal economic modeling)",
      ],
      includedNote: "Stop at framework handoff or continue into content, community and launch execution with our team.",
      signatureTitle: "Why strategy first",
      signatureSubtitle: "The launch is the most expensive moment of the project. You can't guess it.",
      signature: [
        { value: "3–6 weeks", label: "to frameworks in hand" },
        { value: "1 narrative", label: "product + brand + token, one story" },
        { value: "Since 2020", label: "dozens of crypto launches navigated" },
      ],
      whatsappMessage: "Hello! I need strategy and go-to-market consulting for my crypto project. Can you help?",
      metaTitle: "Web3 Consulting & Go-to-Market - Kaleidos Digital",
      metaDescription: "Strategy and go-to-market consulting for crypto and web3 projects. Positioning, narrative and execution frameworks that align product, brand and token.",
      keywords: "web3 consulting, crypto go-to-market, crypto gtm, launch strategy, crypto positioning, kaleidos",
    },
  },

  // 3 — Eventos
  {
    id: "eventos-cripto",
    variant: 1,
    icon: "CalendarDays",
    pt: {
      slug: "eventos-cripto",
      badge: "Eventos Cripto",
      h1: "Estratégia e Conteúdo de Eventos Cripto",
      subhead:
        "Conceito, identidade visual, conteúdo e amplificação pra conferências, hackathons, encontros de founders e ativações de ecossistema. Cuidamos da marca e da narrativa do evento pra ele render muito além do dia.",
      ctaPrimary: "Quero ativar meu evento",
      accent: "green",
      whoTitle: "Para quem é a estratégia de eventos",
      who: [
        { title: "Protocolos com conferências flagship", desc: "Eventos âncora que posicionam o projeto como referência da categoria." },
        { title: "Projetos rodando hackathons", desc: "Identidade, comunicação e ativação de desenvolvedores antes, durante e depois." },
        { title: "Ecossistemas com encontros de founders", desc: "Narrativa, conteúdo e cobertura que fortalecem a percepção da comunidade." },
        { title: "Comunidades com meetups regionais", desc: "Encontros locais que aproximam a base e viram conteúdo distribuível." },
        { title: "Projetos com side events em grandes conferências", desc: "Ativações paralelas que capturam atenção onde o mercado já está reunido." },
        { title: "Marcas que querem amplificar o evento", desc: "Cobertura de conteúdo e distribuição que fazem o evento render muito além do dia." },
      ],
      whyMattersTitle: "Por que eventos importam",
      whyMattersBody:
        "Em cripto, confiança se constrói olho no olho. Um evento bem comunicado gera relacionamento, prova social e meses de conteúdo, mas um evento sem marca e sem amplificação some no dia seguinte. A diferença está na estratégia e na distribuição.",
      whyMattersBullets: [
        "Evento presencial acelera relacionamento que online levaria meses.",
        "Bem amplificado, vira meses de conteúdo e prova social.",
        "Marca e narrativa são o que separam evento memorável de evento esquecível.",
        "Amplificação pós-evento multiplica o ROI do dia.",
      ],
      deliverablesTitle: "O que entregamos em eventos",
      deliverables: [
        "Estratégia e conceito do evento (side event, painel, meetup)",
        "Posicionamento e narrativa da marca no evento",
        "Roteiro e curadoria de painéis e palestras",
        "Conteúdo pré-evento (teaser, anúncio, agenda)",
        "Cobertura ao vivo (stories, posts em tempo real, X)",
        "Captação e edição de vídeo no local (reels, aftermovie)",
        "Fotografia e banco de imagens do evento",
        "Gestão de presença em conferências (NFT NYC, Devcon, etc.)",
        "Networking estruturado e agendamento de reuniões",
        "Material de apoio (deck, one-pager, kit de imprensa)",
        "Repurpose pós-evento (cortes, carrosséis, artigo)",
        "Relatório de resultados e leads gerados",
      ],
      processTitle: "Nosso processo de estratégia e conteúdo de eventos",
      process: [
        { title: "Estratégia & Conceito do Evento", desc: "Objetivo, posicionamento, formato e narrativa do evento, alinhados à marca e à comunidade." },
        { title: "Identidade & Materiais", desc: "Identidade visual, key visuals, materiais de divulgação e peças de palco que dão cara ao evento." },
        { title: "Conteúdo Pré & Durante", desc: "Comunicação de divulgação, gestão de pauta com speakers e cobertura ao vivo (foto, vídeo, social)." },
        { title: "Amplificação & Relatório Pós-Evento", desc: "Repurpose do material em meses de conteúdo, distribuição nas redes e relatório com aprendizados e resultados." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Estratégia e conceito do evento",
        "Identidade visual e key visuals",
        "Materiais de divulgação e peças de palco",
        "Comunicação e conteúdo de pré-evento",
        "Cobertura ao vivo (foto/vídeo/social)",
        "Repurpose e amplificação pós-evento",
        "Coordenação com o time e parceiros do evento",
        "Relatório pós-evento",
      ],
      casesTitle: "Eventos que produzimos",
      cases: [
        { name: "Defifest", metric: "600+ participantes", desc: "Maior evento DeFi do Brasil: identidade, materiais e produção visual completa.", href: "/cases/defifest" },
        { name: "Paradigma Education", metric: "Motion & Educação", desc: "Conteúdo e motion graphics pra ativações educativas do ecossistema.", href: "/cases/paradigma-education" },
        { name: "Defiverso", metric: "12M Views", desc: "Estratégia e conteúdo de comunidade que sustentam ativações presenciais.", href: "/cases/defiverso" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para Eventos Cripto",
      whyUs: [
        { title: "Marca do maior evento DeFi do Brasil", desc: "Cuidamos da identidade, dos materiais e da produção visual do Defifest, 600+ participantes." },
        { title: "Amplificação além do dia", desc: "Cada evento vira conteúdo: a Kaleidos é máquina de conteúdo, não só uma produtora visual." },
        { title: "Rede e parcerias no ecossistema", desc: "Conexões com projetos, speakers e comunidades pra fortalecer a narrativa do seu evento." },
        { title: "Da estratégia à cobertura", desc: "Conceito, identidade, conteúdo e amplificação num time só, integrados à sua marca." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "Que tipos de evento cripto vocês atendem?", answer: "Conferências, hackathons, encontros de founders, meetups regionais e side events em grandes conferências. Do íntimo ao flagship." },
        { question: "Vocês fazem logística e operação física do evento?", answer: "Não somos uma produtora de logística (venue, fornecedores, staff). Cuidamos de estratégia, identidade visual, materiais, conteúdo e amplificação, e nos integramos com quem opera a parte física." },
        { question: "Com quanta antecedência devo contratar?", answer: "O ideal é de 6 a 10 semanas pra eventos maiores, pra desenhar identidade, conteúdo de divulgação e plano de amplificação com calma. Ativações menores podem ser montadas mais rápido." },
        { question: "Vocês cobrem o evento e transformam em conteúdo?", answer: "Sim. Fazemos a cobertura (foto, vídeo, social) e o repurpose do material, transformando um dia de evento em meses de conteúdo distribuível." },
        { question: "Atendem eventos fora do Brasil?", answer: "Sim. Já trabalhamos com projetos internacionais e temos rede no ecossistema global pra dar suporte." },
      ],
      finalCtaTitle: "Pronto pra fazer seu evento render muito além do dia?",
      finalCtaSubtitle: "Vamos desenhar a marca, o conteúdo e a amplificação do seu evento.",
      whatsappMessage: "Olá! Quero estratégia, identidade e amplificação pra um evento cripto com a Kaleidos. Podem me ajudar?",
      metaTitle: "Estratégia e Conteúdo de Eventos Cripto - Kaleidos Digital",
      metaDescription: "Estratégia, identidade visual, conteúdo e amplificação de eventos cripto: conferências, hackathons e ativações que rendem muito além do dia do evento.",
      keywords: "eventos cripto, conteúdo de eventos web3, identidade de evento cripto, conferência cripto, hackathon, defifest, kaleidos",
    },
    en: {
      slug: "eventos-cripto",
      badge: "Crypto Events",
      h1: "Crypto Event Strategy & Content",
      subhead:
        "Concept, visual identity, content and amplification for conferences, hackathons, founder gatherings and ecosystem activations. We own the brand and narrative of your event so it pays off far beyond the day.",
      ctaPrimary: "Activate my event",
      accent: "green",
      whoTitle: "Who event strategy is for",
      who: [
        { title: "Protocols hosting flagship conferences", desc: "Anchor events that position the project as a category reference." },
        { title: "Projects running hackathons", desc: "Identity, communications and developer activation before, during and after." },
        { title: "Ecosystems with founder gatherings", desc: "Narrative, content and coverage that strengthen community perception." },
        { title: "Communities with regional meetups", desc: "Local gatherings that bring the base closer and turn into shareable content." },
        { title: "Projects with side events at major conferences", desc: "Parallel activations that capture attention where the market is already gathered." },
        { title: "Brands wanting to amplify the event", desc: "Content coverage and distribution that make the event pay off far beyond the day." },
      ],
      whyMattersTitle: "Why events matter",
      whyMattersBody:
        "In crypto, trust is built face to face. A well-communicated event creates relationships, social proof and months of content, but an event with no brand and no amplification disappears the next day. The difference is in the strategy and the distribution.",
      whyMattersBullets: [
        "In-person events accelerate relationships that would take months online.",
        "Well amplified, they become months of content and social proof.",
        "Brand and narrative separate a memorable event from a forgettable one.",
        "Post-event amplification multiplies the day's ROI.",
      ],
      deliverablesTitle: "What we deliver at events",
      deliverables: [
        "Event strategy and concept (side event, panel, meetup)",
        "Brand positioning and narrative at the event",
        "Script and curation of panels and talks",
        "Pre-event content (teaser, announcement, agenda)",
        "Live coverage (stories, real-time posts, X)",
        "On-site video capture and editing (reels, aftermovie)",
        "Event photography and image bank",
        "Conference presence management (NFT NYC, Devcon, etc.)",
        "Structured networking and meeting scheduling",
        "Support material (deck, one-pager, press kit)",
        "Post-event repurpose (clips, carousels, article)",
        "Results and lead generation report",
      ],
      processTitle: "Our event strategy & content process",
      process: [
        { title: "Strategy & Event Concept", desc: "Goal, positioning, format and narrative of the event, aligned to the brand and the community." },
        { title: "Identity & Materials", desc: "Visual identity, key visuals, promotional materials and stage pieces that give the event a face." },
        { title: "Content Before & During", desc: "Promotional communications, speaker agenda management and live coverage (photo, video, social)." },
        { title: "Amplification & Post-Event Reporting", desc: "Repurposing the material into months of content, social distribution and a report with learnings and results." },
      ],
      includedTitle: "What's included",
      included: [
        "Event strategy and concept",
        "Visual identity and key visuals",
        "Promotional materials and stage pieces",
        "Pre-event communications and content",
        "Live coverage (photo/video/social)",
        "Post-event repurposing and amplification",
        "Coordination with the event team and partners",
        "Post-event report",
      ],
      casesTitle: "Events we produced",
      cases: [
        { name: "Defifest", metric: "600+ attendees", desc: "Brazil's largest DeFi event: identity, materials and full visual production.", href: "/cases/defifest" },
        { name: "Paradigma Education", metric: "Motion & Education", desc: "Content and motion graphics for ecosystem educational activations.", href: "/cases/paradigma-education" },
        { name: "Defiverso", metric: "12M Views", desc: "Community strategy and content that sustain in-person activations.", href: "/cases/defiverso" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Crypto Events",
      whyUs: [
        { title: "The brand behind Brazil's largest DeFi event", desc: "We handled identity, materials and visual production for Defifest, 600+ attendees." },
        { title: "Amplification beyond the day", desc: "Every event becomes content: Kaleidos is a content machine, not just a visual producer." },
        { title: "Ecosystem network & partnerships", desc: "Connections with projects, speakers and communities to strengthen your event's narrative." },
        { title: "From strategy to coverage", desc: "Concept, identity, content and amplification in one team, integrated with your brand." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "What types of crypto events do you work on?", answer: "Conferences, hackathons, founder gatherings, regional meetups and side events at major conferences. From intimate to flagship." },
        { question: "Do you handle physical logistics and operations?", answer: "We're not a logistics producer (venue, vendors, staffing). We handle strategy, visual identity, materials, content and amplification, and integrate with whoever runs the physical side." },
        { question: "How far in advance should I book?", answer: "Ideally 6 to 10 weeks for larger events, to design identity, promotional content and an amplification plan properly. Smaller activations can be assembled faster." },
        { question: "Do you cover the event and turn it into content?", answer: "Yes. We cover it (photo, video, social) and repurpose the material, turning one day of event into months of distributable content." },
        { question: "Do you handle events outside Brazil?", answer: "Yes. We've worked with international projects and have a global ecosystem network to support you." },
      ],
      finalCtaTitle: "Ready to make your event pay off far beyond the day?",
      finalCtaSubtitle: "Let's design the brand, content and amplification of your event.",
      whatsappMessage: "Hello! I'd like strategy, identity and amplification for a crypto event with Kaleidos. Can you help?",
      metaTitle: "Crypto Event Strategy & Content - Kaleidos Digital",
      metaDescription: "Strategy, visual identity, content and amplification for crypto events: conferences, hackathons and activations that pay off far beyond the event day.",
      keywords: "crypto events, web3 event content, crypto event identity, crypto conference, hackathon, defifest, kaleidos",
    },
  },

  // 4 — Social Media
  {
    id: "social-media-cripto",
    variant: 3,
    icon: "AtSign",
    pt: {
      slug: "social-media-cripto",
      badge: "Social Media Cripto",
      h1: "Social Media Marketing para Cripto",
      subhead:
        "Gestão de X (Twitter), conteúdo que para o scroll e engajamento em tempo real pra projetos web3 construírem a presença confiável que separa projeto sério de projeto fantasma.",
      ctaPrimary: "Quero crescer no social",
      accent: "green",
      // Prova social do serviço: cases reais de social media (Defiverso 12M+ views
      // orgânicas · Mercado Bitcoin +80K seguidores · Investidor 4.20 10x faturamento)
      proof: ["defiverso", "mercado-bitcoin", "investidor-420"],
      whoTitle: "Para quem é o Social Media Cripto",
      who: [
        { title: "Projetos pré-lançamento", desc: "Construir audiência e narrativa antes do TGE, pra não lançar token pra um feed vazio." },
        { title: "Protocolos pós-TGE", desc: "Sustentar relevância e engajamento depois que o hype do lançamento esfria." },
        { title: "Ecossistemas cripto", desc: "Coordenar a voz de múltiplos produtos e comunidades num posicionamento coeso." },
        { title: "L1s / L2s", desc: "Comunicar evolução técnica de um jeito que o mercado entende e compartilha." },
        { title: "Protocolos DeFi", desc: "Transformar mecânicas complexas em conteúdo claro, confiável e engajante." },
        { title: "Projetos de IA x Cripto", desc: "Surfar a narrativa mais quente do momento com conteúdo que constrói autoridade." },
      ],
      whyMattersTitle: "Por que social media importa em cripto",
      whyMattersBody:
        "Em cripto, o X (Twitter) é a praça pública. É onde a narrativa se forma, onde o projeto ganha (ou queima) credibilidade e onde a comunidade decide em quem confiar. Perfil parado e sem voz própria grita uma coisa só: projeto parado.",
      whyMattersBullets: [
        "X é o canal nº 1 de descoberta e credibilidade em cripto.",
        "Consistência e voz constroem confiança, o ativo mais raro do espaço.",
        "Engajamento em tempo real captura janelas de narrativa que abrem e fecham em horas.",
        "Conteúdo bom vira distribuição orgânica e prova social de graça.",
      ],
      deliverablesTitle: "O que entregamos no Social Media",
      deliverables: [
        "Calendário editorial mensal",
        "Posts de feed (estáticos e carrosséis)",
        "Roteiro e edição de Reels e vídeos curtos",
        "Stories diários e enquetes",
        "Copywriting nativo por plataforma",
        "Design e identidade visual dos posts",
        "Gestão e publicação nas redes (IG, X, LinkedIn, TikTok)",
        "Reply guy e engajamento ativo na comunidade",
        "Monitoramento de tendências e oportunidades de trend",
        "Atendimento e moderação de comentários e DMs",
        "Cobertura de lançamentos e novidades do projeto",
        "Relatórios mensais de performance",
      ],
      processTitle: "Nosso processo de Social Media",
      process: [
        { title: "Estratégia & Voz de Marca", desc: "Definição de posicionamento, voz, pilares de conteúdo e tom pra cada plataforma." },
        { title: "Produção de Conteúdo", desc: "Threads, posts, carrosséis e visuais pensados pra retenção e compartilhamento." },
        { title: "Engajamento em Tempo Real", desc: "Reply guy estratégico, participação nas conversas certas e aproveitamento de narrativa." },
        { title: "Análise & Otimização", desc: "Métricas de crescimento e engajamento, com ajuste contínuo do que funciona." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Estratégia e voz de marca",
        "Gestão de X (Twitter)",
        "Produção de threads e posts",
        "Design de carrosséis e visuais",
        "Engajamento e community replies",
        "Calendário editorial",
        "Aproveitamento de narrativas (real-time)",
        "Relatórios de crescimento e engajamento",
      ],
      casesTitle: "Resultados em social",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Estratégia de social media completa: IG, X e grupo de WhatsApp.", href: "/cases/defiverso" },
        { name: "Crypto.com", metric: "+210% Curtidas", desc: "Conteúdo pra Instagram e Twitter com estratégia focada.", href: "/cases/crypto-com" },
        { name: "Layla Foz", metric: "+20M Views", desc: "Crescimento orgânico via vídeo e conteúdo recorrente.", href: "/cases/layla-foz" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para Social Media",
      whyUs: [
        { title: "Voz cripto-nativa", desc: "Falamos a língua do X cripto: narrativa, reply, timing. Não é social genérico." },
        { title: "Conteúdo que retém", desc: "Threads e carrosséis desenhados pra parar o scroll e gerar compartilhamento." },
        { title: "125M+ views gerados", desc: "Track record real de conteúdo que viraliza, não promessa." },
        { title: "Consistência que constrói confiança", desc: "Presença constante e coerente, o que separa projeto sério de projeto fantasma." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "Por que focar tanto no X (Twitter)?", answer: "Em cripto, é no X que a narrativa se forma e a credibilidade se constrói ou se destrói. É o canal de maior impacto pra descoberta e confiança, por isso ele é o centro da estratégia, não um detalhe." },
        { question: "Vocês também cuidam de Instagram e outras redes?", answer: "Sim. O X costuma ser o eixo, mas adaptamos e distribuímos o conteúdo pra Instagram, LinkedIn e outras redes conforme o público do projeto." },
        { question: "Como medem o resultado?", answer: "Crescimento de seguidores qualificados, engajamento, alcance e, principalmente, como isso se converte em comunidade e percepção de autoridade. Relatórios mensais claros." },
        { question: "Funciona pra projeto pré-lançamento?", answer: "É justamente o melhor momento. Construir audiência e narrativa antes do TGE evita lançar pra um vazio e dá tração desde o primeiro dia." },
      ],
      finalCtaTitle: "Pronto pra construir presença de verdade?",
      finalCtaSubtitle: "Vamos transformar seu social em ativo de confiança e distribuição.",
      statement: {
        kicker: "O X é a praça pública da cripto",
        bigValue: "Nº 1",
        bigLabel: "canal de descoberta e credibilidade do mercado",
        headline: "Perfil parado e sem voz própria grita uma coisa só: projeto parado.",
        body: "É no X (Twitter) que a narrativa se forma, que o projeto ganha ou queima credibilidade e que a comunidade decide em quem confiar. Janelas de narrativa abrem e fecham em horas. Quem não está presente, com voz e timing, fica de fora da conversa que move o mercado.",
      },
      approach: {
        name: "Sistema de Presença Cripto",
        intro: "Social media não é postar bonito e torcer. É um sistema que combina voz consistente, conteúdo que retém e engajamento em tempo real pra transformar atenção em confiança, o ativo mais raro do espaço.",
        pillars: [
          { title: "Voz & Pilares", desc: "Posicionamento, tom e pilares de conteúdo definidos pra cada plataforma, pra cada post soar inconfundivelmente seu." },
          { title: "Conteúdo que retém", desc: "Threads, posts e carrosséis desenhados pra parar o scroll e gerar compartilhamento, não pra preencher calendário." },
          { title: "Real-time & narrativa", desc: "Reply guy estratégico e participação nas conversas certas pra surfar janelas de narrativa enquanto elas estão abertas." },
          { title: "Loop de otimização", desc: "Métricas de crescimento e engajamento alimentam o próximo ciclo, dobrando no que funciona e cortando o que não." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semanas 1–2", title: "Estratégia & Voz de Marca", desc: "Definição de posicionamento, voz, pilares e tom pra cada plataforma, com base na narrativa do projeto.", deliverables: ["Guia de voz e tom", "Pilares de conteúdo", "Calendário editorial"] },
        { tag: "Fase 02", duration: "Contínuo", title: "Produção de Conteúdo", desc: "Threads, posts, carrosséis e visuais pensados pra retenção e compartilhamento, na cadência do mercado.", deliverables: ["Threads & posts semanais", "Design de carrosséis", "Visuais e templates"] },
        { tag: "Fase 03", duration: "Diário", title: "Engajamento em Tempo Real", desc: "Reply guy estratégico, participação nas conversas certas e aproveitamento de narrativa enquanto ela está quente.", deliverables: ["Community replies", "Real-time narrative riding", "Monitoramento de menções"] },
        { tag: "Fase 04", duration: "Mensal", title: "Análise & Otimização", desc: "Leitura de métricas de crescimento e engajamento, com ajuste contínuo do que funciona.", deliverables: ["Relatório mensal", "Insights de conteúdo", "Plano do próximo ciclo"] },
      ],
      processNote: "O X costuma ser o eixo, mas distribuímos e adaptamos o conteúdo pra Instagram, LinkedIn e outras redes conforme o público.",
      notIncluded: [
        "Tráfego pago / gestão de ads (escopo separado)",
        "Compra de seguidores ou engajamento artificial",
        "Moderação de comunidade 24/7 (ver Gestão de Comunidade)",
      ],
      includedNote: "Conteúdo e engajamento integrados: a mesma máquina alimenta o feed e as conversas que constroem autoridade.",
      signatureTitle: "Presença que vira ativo",
      signatureSubtitle: "Consistência e voz constroem a confiança que paid nenhum compra.",
      signature: [
        { value: "125M+", label: "views gerados em conteúdo cripto" },
        { value: "Real-time", label: "engajamento nas janelas de narrativa" },
        { value: "Voz própria", label: "inconfundível, não social genérico" },
      ],
      whatsappMessage: "Olá! Quero gestão de social media cripto pro meu projeto. Podem me ajudar?",
      metaTitle: "Social Media Marketing para Cripto - Kaleidos Digital",
      metaDescription: "Gestão estratégica de X (Twitter) e social media para projetos cripto e web3. Conteúdo de alto impacto e engajamento que constrói presença e confiança.",
      keywords: "social media cripto, gestão de twitter cripto, marketing web3, conteúdo cripto, community, kaleidos",
    },
    en: {
      slug: "social-media-cripto",
      badge: "Crypto Social Media",
      h1: "Crypto Social Media Marketing",
      subhead:
        "X (Twitter) management, scroll-stopping content and real-time engagement for web3 projects to build the credible presence that separates a serious project from a ghost.",
      ctaPrimary: "Grow my social",
      accent: "green",
      // Service social proof: real social media cases (Defiverso 12M+ organic views
      // · Mercado Bitcoin +80K followers · Investidor 4.20 10x revenue)
      proof: ["defiverso", "mercado-bitcoin", "investidor-420"],
      whoTitle: "Who Crypto Social Media is for",
      who: [
        { title: "Pre-launch projects", desc: "Build audience and narrative before the TGE, so you don't launch a token into an empty feed." },
        { title: "Post-TGE protocols", desc: "Sustain relevance and engagement after the launch hype cools off." },
        { title: "Crypto ecosystems", desc: "Coordinate the voice of multiple products and communities into a cohesive position." },
        { title: "L1s / L2s", desc: "Communicate technical progress in a way the market understands and shares." },
        { title: "DeFi protocols", desc: "Turn complex mechanics into clear, credible, engaging content." },
        { title: "AI x Crypto projects", desc: "Ride the hottest narrative with content that builds authority." },
      ],
      whyMattersTitle: "Why social media matters in crypto",
      whyMattersBody:
        "In crypto, X (Twitter) is the public square. It's where narrative forms, where a project earns (or burns) credibility and where the community decides who to trust. A quiet account with no voice of its own screams one thing: a quiet project.",
      whyMattersBullets: [
        "X is the #1 discovery and credibility channel in crypto.",
        "Consistency and voice build trust, the rarest asset in the space.",
        "Real-time engagement captures narrative windows that open and close in hours.",
        "Great content turns into organic distribution and free social proof.",
      ],
      deliverablesTitle: "What we deliver in Social Media",
      deliverables: [
        "Monthly editorial calendar",
        "Feed posts (statics and carousels)",
        "Reels and short-form video scripting and editing",
        "Daily stories and polls",
        "Platform-native copywriting",
        "Post design and visual identity",
        "Channel management and publishing (IG, X, LinkedIn, TikTok)",
        "Reply guy and active community engagement",
        "Trend monitoring and trend-jacking opportunities",
        "Community support and comment/DM moderation",
        "Coverage of launches and project news",
        "Monthly performance reports",
      ],
      processTitle: "Our Social Media process",
      process: [
        { title: "Strategy & Brand Voice", desc: "Positioning, voice, content pillars and tone defined for each platform." },
        { title: "Content Production", desc: "Threads, posts, carousels and visuals designed for retention and sharing." },
        { title: "Real-Time Engagement", desc: "Strategic reply guy, joining the right conversations and riding narrative." },
        { title: "Analysis & Optimization", desc: "Growth and engagement metrics, with continuous tuning of what works." },
      ],
      includedTitle: "What's included",
      included: [
        "Strategy and brand voice",
        "X (Twitter) management",
        "Thread and post production",
        "Carousel and visual design",
        "Engagement and community replies",
        "Editorial calendar",
        "Real-time narrative riding",
        "Growth and engagement reports",
      ],
      casesTitle: "Social results",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Full social media strategy: IG, X and WhatsApp group.", href: "/cases/defiverso" },
        { name: "Crypto.com", metric: "+210% Likes", desc: "Instagram and Twitter content with a focused strategy.", href: "/cases/crypto-com" },
        { name: "Layla Foz", metric: "+20M Views", desc: "Organic growth via video and recurring content.", href: "/cases/layla-foz" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Social Media",
      whyUs: [
        { title: "Crypto-native voice", desc: "We speak crypto X: narrative, replies, timing. This isn't generic social." },
        { title: "Content that retains", desc: "Threads and carousels designed to stop the scroll and drive shares." },
        { title: "125M+ views generated", desc: "A real track record of content that goes viral, not a promise." },
        { title: "Consistency that builds trust", desc: "Constant, coherent presence, what separates a serious project from a ghost." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "Why focus so much on X (Twitter)?", answer: "In crypto, X is where narrative forms and credibility gets built or destroyed. It's the highest-impact discovery and trust channel, which is why it's the center of the strategy, not an afterthought." },
        { question: "Do you also handle Instagram and other networks?", answer: "Yes. X is usually the axis, but we adapt and distribute content to Instagram, LinkedIn and others based on the project's audience." },
        { question: "How do you measure results?", answer: "Qualified follower growth, engagement, reach and, above all, how it converts into community and perceived authority. Clear monthly reports." },
        { question: "Does it work for pre-launch projects?", answer: "It's the best time. Building audience and narrative before the TGE avoids launching into a void and gives traction from day one." },
      ],
      finalCtaTitle: "Ready to build real presence?",
      finalCtaSubtitle: "Let's turn your social into a trust and distribution asset.",
      statement: {
        kicker: "X is crypto's public square",
        bigValue: "#1",
        bigLabel: "discovery and credibility channel in the market",
        headline: "A quiet account with no voice of its own screams one thing: a quiet project.",
        body: "On X (Twitter) is where narrative forms, where a project earns or burns credibility and where the community decides who to trust. Narrative windows open and close in hours. If you're not present, with voice and timing, you're left out of the conversation that moves the market.",
      },
      approach: {
        name: "Crypto Presence System",
        intro: "Social media isn't posting nice things and hoping. It's a system combining consistent voice, content that retains and real-time engagement to turn attention into trust, the rarest asset in the space.",
        pillars: [
          { title: "Voice & Pillars", desc: "Positioning, tone and content pillars defined per platform, so every post sounds unmistakably yours." },
          { title: "Content that retains", desc: "Threads, posts and carousels designed to stop the scroll and drive shares, not to fill a calendar." },
          { title: "Real-time & narrative", desc: "Strategic reply guy and joining the right conversations to ride narrative windows while they're open." },
          { title: "Optimization loop", desc: "Growth and engagement metrics feed the next cycle, doubling down on what works and cutting what doesn't." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Weeks 1–2", title: "Strategy & Brand Voice", desc: "Positioning, voice, pillars and tone defined per platform, grounded in the project's narrative.", deliverables: ["Voice & tone guide", "Content pillars", "Editorial calendar"] },
        { tag: "Phase 02", duration: "Ongoing", title: "Content Production", desc: "Threads, posts, carousels and visuals built for retention and sharing, at market cadence.", deliverables: ["Weekly threads & posts", "Carousel design", "Visuals & templates"] },
        { tag: "Phase 03", duration: "Daily", title: "Real-Time Engagement", desc: "Strategic reply guy, joining the right conversations and riding narrative while it's hot.", deliverables: ["Community replies", "Real-time narrative riding", "Mention monitoring"] },
        { tag: "Phase 04", duration: "Monthly", title: "Analysis & Optimization", desc: "Reading growth and engagement metrics, with continuous tuning of what works.", deliverables: ["Monthly report", "Content insights", "Next-cycle plan"] },
      ],
      processNote: "X is usually the axis, but we distribute and adapt content to Instagram, LinkedIn and others based on the audience.",
      notIncluded: [
        "Paid traffic / ads management (separate scope)",
        "Buying followers or artificial engagement",
        "24/7 community moderation (see Community Management)",
      ],
      includedNote: "Content and engagement integrated: the same machine feeds the feed and the conversations that build authority.",
      signatureTitle: "Presence that becomes an asset",
      signatureSubtitle: "Consistency and voice build the trust no paid budget can buy.",
      signature: [
        { value: "125M+", label: "views generated in crypto content" },
        { value: "Real-time", label: "engagement in narrative windows" },
        { value: "Own voice", label: "unmistakable, not generic social" },
      ],
      whatsappMessage: "Hello! I want crypto social media management for my project. Can you help?",
      metaTitle: "Crypto Social Media Marketing - Kaleidos Digital",
      metaDescription: "Strategic X (Twitter) and social media management for crypto and web3 projects. High-impact content and real-time engagement that builds presence and trust.",
      keywords: "crypto social media, crypto twitter management, web3 marketing, crypto content, community, kaleidos",
    },
  },

  // 5 — PR / Assessoria
  {
    id: "pr-assessoria",
    variant: 3,
    icon: "Megaphone",
    pt: {
      slug: "pr-assessoria",
      badge: "PR & Assessoria",
      h1: "PR & Assessoria de Imprensa Cripto",
      subhead:
        "Campanhas de PR feitas pra conquistar credibilidade, moldar percepção e colocar a sua história na frente do público certo. Nos veículos certos, na hora certa e pelos motivos certos.",
      ctaPrimary: "Quero ser publicado",
      accent: "green",
      whoTitle: "Para quem é o PR Cripto",
      who: [
        { title: "Projetos preparando o TGE", desc: "Anúncio de lançamento com cobertura que dá credibilidade ao momento mais importante." },
        { title: "Founders construindo marca pessoal", desc: "Features e entrevistas que posicionam o fundador como voz de autoridade." },
        { title: "Projetos com novidades de produto", desc: "Releases e cobertura pra cada marco virar percepção de progresso." },
        { title: "Marcas reposicionando narrativa", desc: "PR estratégico pra mudar como o mercado enxerga o projeto." },
        { title: "Projetos que querem confiança institucional", desc: "Placement em veículo top-tier que abre porta com parceiro, exchange e investidor." },
        { title: "Times sem rede com a imprensa cripto", desc: "Você não conhece os editores certos. A gente já conhece, e te coloca na frente deles." },
      ],
      whyMattersTitle: "Por que PR importa",
      whyMattersBody:
        "Em cripto, percepção é tudo. Ser citado pelos veículos certos, na hora certa, transforma um projeto que ninguém conhece em opção confiável. PR não é aparecer em qualquer lugar, é aparecer onde a menção vira credibilidade real.",
      whyMattersBullets: [
        "Um placement em veículo top-tier vale mais que dezenas de posts pagos.",
        "Timing é tudo: a história certa no momento certo molda a narrativa do mercado.",
        "Cobertura de imprensa é prova social que abre portas com parceiros e investidores.",
        "Credibilidade construída por PR é cara de comprar e fácil de perder.",
      ],
      deliverablesTitle: "O que entregamos em PR & Assessoria",
      deliverables: [
        "Estratégia de assessoria de imprensa",
        "Redação de releases e comunicados",
        "Media list de veículos cripto (BR e global)",
        "Pitch e relacionamento com jornalistas",
        "Agendamento de entrevistas e participações",
        "Artigos assinados e thought leadership (op-eds)",
        "Gestão de crise e resposta rápida",
        "Networking com editores e creators",
        "Acompanhamento de menções e clipping",
        "Preparação de porta-vozes (media training)",
        "Distribuição em wires e portais cripto",
        "Relatório de cobertura e share of voice",
      ],
      processTitle: "Nosso processo de PR",
      process: [
        { title: "Definição de Ângulos", desc: "Encontramos as histórias que importam: o que faz o seu projeto ser pauta, não anúncio." },
        { title: "Produção de Conteúdo", desc: "Releases, pitches e materiais que editores realmente querem publicar." },
        { title: "Outreach Coordenado", desc: "Abordagem aos veículos e editores certos, com timing pensado pra maximizar placement." },
        { title: "Acompanhamento & Relatório", desc: "Gestão das publicações, follow-up e relatório com alcance e resultados." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Definição de ângulos e narrativa",
        "Produção de releases e pitches",
        "Lista e relacionamento com veículos cripto/tech",
        "Outreach e coordenação de outreach",
        "Cobertura de TGE e marcos de produto",
        "Features e entrevistas de founder",
        "Gestão de timing e embargo",
        "Relatório de placements e alcance",
      ],
      casesTitle: "Autoridade & percepção",
      cases: [
        { name: "Defifest", metric: "600+ participantes", desc: "Evento que virou referência e gerou cobertura no ecossistema DeFi BR.", href: "/cases/defifest" },
        { name: "Investidor 4.20", metric: "10x Faturamento", desc: "Construção de autoridade e percepção de marca pra creator cripto.", href: "/cases/investidor-4-20" },
        { name: "Neobankless", metric: "Fintech", desc: "Posicionamento e narrativa pra fintech de dólar digital.", href: "/cases/neobankless" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para PR Cripto",
      whyUs: [
        { title: "Foco em credibilidade, não em volume", desc: "Buscamos placement que constrói autoridade, não menção que ninguém lê." },
        { title: "Histórias que viram pauta", desc: "Sabemos definir o ângulo que faz editor querer publicar o seu projeto." },
        { title: "Timing e narrativa de longo prazo", desc: "Cada placement compõe a narrativa, em vez de ser barulho isolado." },
        { title: "Nativos do ecossistema cripto", desc: "Entendemos o mercado e a linguagem dos veículos que importam." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "Vocês garantem publicação em veículo específico?", answer: "Ninguém sério garante placement, porque a palavra final é do editor. O que garantimos é o que está na nossa mão: ângulo forte, material de qualidade e outreach bem coordenado, que é exatamente o que maximiza a chance de publicação." },
        { question: "Que tipo de história funciona pra PR cripto?", answer: "Lançamentos (TGE), marcos de produto, dados e pesquisas próprias, features de founder e ângulos de narrativa de mercado. A chave é ter um ângulo que seja pauta, não anúncio." },
        { question: "PR funciona pra projeto pequeno ou pré-lançamento?", answer: "Sim. Com o ângulo certo, até projeto pequeno vira pauta. Pré-lançamento é ótimo momento pra começar a construir percepção antes do TGE." },
        { question: "Vocês cuidam de PR internacional?", answer: "Sim. Trabalhamos com veículos cripto e de tech tanto no Brasil quanto no mercado internacional." },
      ],
      finalCtaTitle: "Pronto pra contar sua história nos lugares certos?",
      finalCtaSubtitle: "Vamos definir o ângulo que coloca seu projeto na pauta.",
      statement: {
        kicker: "Percepção é tudo",
        bigValue: "1",
        bigLabel: "placement top-tier vale mais que dezenas de posts pagos",
        headline: "PR não é aparecer em qualquer lugar. É aparecer onde a menção vira credibilidade.",
        body: "Ser citado pelos veículos certos, na hora certa, transforma um projeto que ninguém conhece em opção confiável. Credibilidade construída por imprensa é cara de comprar e fácil de perder, e é exatamente o que abre porta com parceiro, exchange e investidor.",
      },
      approach: {
        name: "Da história ao placement",
        intro: "PR sério não é spray de release pra mil contatos. É achar o ângulo que faz o seu projeto ser pauta, e levá-lo ao editor certo, no momento certo, pelos motivos certos.",
        pillars: [
          { title: "Ângulo que é pauta", desc: "Encontramos a história que importa: o que faz editor querer publicar, em vez de mais um anúncio que ninguém lê." },
          { title: "Material que editor quer", desc: "Releases, pitches e dados próprios produzidos no padrão e na linguagem dos veículos que importam." },
          { title: "Outreach coordenado", desc: "Rede real com a imprensa cripto e tech, com timing e embargo pensados pra maximizar o placement." },
          { title: "Narrativa de longo prazo", desc: "Cada placement compõe a percepção do projeto, em vez de ser barulho isolado que some no dia seguinte." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semana 1", title: "Definição de Ângulos", desc: "Encontramos as histórias que importam: o que faz o seu projeto ser pauta, não anúncio.", deliverables: ["Mapa de ângulos", "Calendário de marcos", "Lista de veículos-alvo"] },
        { tag: "Fase 02", duration: "Semanas 1–2", title: "Produção de Conteúdo", desc: "Releases, pitches e materiais que editores realmente querem publicar.", deliverables: ["Press release", "Pitches personalizados", "Media kit do founder"] },
        { tag: "Fase 03", duration: "Semanas 2–3", title: "Outreach Coordenado", desc: "Abordagem aos veículos e editores certos, com timing e embargo pensados pra maximizar placement.", deliverables: ["Outreach a editores", "Gestão de embargo", "Coordenação de entrevistas"] },
        { tag: "Fase 04", duration: "Pós-publicação", title: "Acompanhamento & Relatório", desc: "Gestão das publicações, follow-up e relatório com alcance e resultados.", deliverables: ["Clipping de placements", "Relatório de alcance", "Repurpose das menções"] },
      ],
      processNote: "Funciona por campanha (TGE, marco de produto) ou em retainer contínuo de construção de percepção.",
      notIncluded: [
        "Garantia de publicação em veículo específico (a palavra final é do editor)",
        "Compra de matéria paga disfarçada de editorial",
        "Gestão de crise jurídica / compliance regulatório",
      ],
      includedNote: "O que garantimos é o que está na nossa mão: ângulo forte, material de qualidade e outreach bem coordenado.",
      signatureTitle: "O que credibilidade abre",
      signatureSubtitle: "A história certa, no veículo certo, na hora certa.",
      signature: [
        { value: "Top-tier", label: "placement que constrói autoridade real" },
        { value: "Timing", label: "ângulo certo no momento que molda a narrativa" },
        { value: "BR + global", label: "veículos cripto e tech dentro e fora do país" },
      ],
      whatsappMessage: "Olá! Quero assessoria de imprensa e PR pro meu projeto cripto. Podem me ajudar?",
      metaTitle: "PR & Assessoria de Imprensa Cripto - Kaleidos Digital",
      metaDescription: "Campanhas de PR e assessoria de imprensa para projetos cripto e web3. Ângulos de história, releases e outreach pra veículos que constroem credibilidade.",
      keywords: "pr cripto, assessoria de imprensa web3, relações públicas cripto, comunicação cripto, kaleidos",
    },
    en: {
      slug: "pr-assessoria",
      badge: "PR & Communications",
      h1: "Crypto PR & Communications",
      subhead:
        "PR campaigns designed to earn credibility, shape perception and get your story in front of the right audience. In the right outlets, at the right time and for the right reasons.",
      ctaPrimary: "Get published",
      accent: "green",
      whoTitle: "Who Crypto PR is for",
      who: [
        { title: "Projects preparing a TGE", desc: "Launch announcements with coverage that adds credibility to the biggest moment." },
        { title: "Founders building a personal brand", desc: "Features and interviews that position the founder as an authority voice." },
        { title: "Projects with product news", desc: "Releases and coverage so every milestone becomes perceived progress." },
        { title: "Brands repositioning narrative", desc: "Strategic PR to change how the market sees the project." },
        { title: "Projects seeking institutional trust", desc: "Top-tier placements that open doors with partners, exchanges and investors." },
        { title: "Teams without crypto press relationships", desc: "You don't know the right editors. We already do, and we put you in front of them." },
      ],
      whyMattersTitle: "Why PR matters",
      whyMattersBody:
        "In crypto, perception is everything. Being cited by the right outlets at the right time turns a project nobody knows into a trusted option. PR isn't about showing up anywhere, it's about showing up where the mention becomes real credibility.",
      whyMattersBullets: [
        "One top-tier placement is worth more than dozens of paid posts.",
        "Timing is everything: the right story at the right moment shapes the market narrative.",
        "Press coverage is social proof that opens doors with partners and investors.",
        "Credibility built through PR is expensive to buy and easy to lose.",
      ],
      deliverablesTitle: "What we deliver in PR & Media Relations",
      deliverables: [
        "Press relations strategy",
        "Writing of releases and statements",
        "Media list of crypto outlets (BR and global)",
        "Pitching and journalist relationships",
        "Interview and appearance scheduling",
        "Bylined articles and thought leadership (op-eds)",
        "Crisis management and rapid response",
        "Networking with editors and creators",
        "Mention tracking and clipping",
        "Spokesperson prep (media training)",
        "Distribution via wires and crypto portals",
        "Coverage and share-of-voice report",
      ],
      processTitle: "Our PR process",
      process: [
        { title: "Story Angle Definition", desc: "We find the stories that matter: what makes your project news, not an ad." },
        { title: "Content Production", desc: "Releases, pitches and materials that editors actually want to publish." },
        { title: "Coordinated Outreach", desc: "Reaching the right outlets and editors, with timing planned to maximize placement." },
        { title: "Tracking & Reporting", desc: "Managing publications, follow-up and a report with reach and results." },
      ],
      includedTitle: "What's included",
      included: [
        "Story angle and narrative definition",
        "Release and pitch production",
        "Crypto/tech media list and relationships",
        "Outreach and coordination",
        "TGE and product milestone coverage",
        "Founder features and interviews",
        "Timing and embargo management",
        "Placement and reach reporting",
      ],
      casesTitle: "Authority & perception",
      cases: [
        { name: "Defifest", metric: "600+ attendees", desc: "Event that became a reference and drove coverage in the BR DeFi ecosystem.", href: "/cases/defifest" },
        { name: "Investidor 4.20", metric: "10x Revenue", desc: "Authority and brand perception building for a crypto creator.", href: "/cases/investidor-4-20" },
        { name: "Neobankless", metric: "Fintech", desc: "Positioning and narrative for a digital-dollar fintech.", href: "/cases/neobankless" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Crypto PR",
      whyUs: [
        { title: "Credibility over volume", desc: "We pursue placements that build authority, not mentions nobody reads." },
        { title: "Stories that become news", desc: "We know how to define the angle that makes editors want to publish you." },
        { title: "Timing and long-term narrative", desc: "Every placement builds the narrative instead of being isolated noise." },
        { title: "Native to the crypto ecosystem", desc: "We understand the market and the language of outlets that matter." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "Do you guarantee placement in a specific outlet?", answer: "No serious agency guarantees placement, because the editor has the final say. What we guarantee is what's in our hands: a strong angle, quality materials and well-coordinated outreach, which is exactly what maximizes the chance of being published." },
        { question: "What kind of story works for crypto PR?", answer: "Launches (TGE), product milestones, proprietary data and research, founder features and market narrative angles. The key is an angle that's news, not an ad." },
        { question: "Does PR work for small or pre-launch projects?", answer: "Yes. With the right angle, even a small project becomes news. Pre-launch is a great time to start building perception before the TGE." },
        { question: "Do you handle international PR?", answer: "Yes. We work with crypto and tech outlets both in Brazil and internationally." },
      ],
      finalCtaTitle: "Ready to tell your story in the right places?",
      finalCtaSubtitle: "Let's define the angle that puts your project in the news.",
      statement: {
        kicker: "Perception is everything",
        bigValue: "1",
        bigLabel: "top-tier placement beats dozens of paid posts",
        headline: "PR isn't showing up anywhere. It's showing up where the mention becomes credibility.",
        body: "Being cited by the right outlets at the right time turns a project nobody knows into a trusted option. Credibility built through press is expensive to buy and easy to lose, and it's exactly what opens doors with partners, exchanges and investors.",
      },
      approach: {
        name: "From story to placement",
        intro: "Serious PR isn't spraying a release to a thousand contacts. It's finding the angle that makes your project news, and getting it to the right editor, at the right time, for the right reasons.",
        pillars: [
          { title: "An angle that's news", desc: "We find the story that matters: what makes editors want to publish, instead of another ad nobody reads." },
          { title: "Material editors want", desc: "Releases, pitches and proprietary data produced to the standard and language of the outlets that matter." },
          { title: "Coordinated outreach", desc: "A real network with crypto and tech press, with timing and embargo planned to maximize placement." },
          { title: "Long-term narrative", desc: "Every placement builds the project's perception, instead of being isolated noise that fades the next day." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Week 1", title: "Story Angle Definition", desc: "We find the stories that matter: what makes your project news, not an ad.", deliverables: ["Angle map", "Milestone calendar", "Target outlet list"] },
        { tag: "Phase 02", duration: "Weeks 1–2", title: "Content Production", desc: "Releases, pitches and materials editors actually want to publish.", deliverables: ["Press release", "Tailored pitches", "Founder media kit"] },
        { tag: "Phase 03", duration: "Weeks 2–3", title: "Coordinated Outreach", desc: "Reaching the right outlets and editors, with timing and embargo planned to maximize placement.", deliverables: ["Editor outreach", "Embargo management", "Interview coordination"] },
        { tag: "Phase 04", duration: "Post-publication", title: "Tracking & Reporting", desc: "Managing publications, follow-up and a report with reach and results.", deliverables: ["Placement clipping", "Reach report", "Mention repurposing"] },
      ],
      processNote: "Works per campaign (TGE, product milestone) or as an ongoing perception-building retainer.",
      notIncluded: [
        "Guaranteed placement in a specific outlet (the editor has the final say)",
        "Paid placement disguised as editorial",
        "Legal crisis / regulatory compliance management",
      ],
      includedNote: "What we guarantee is what's in our hands: a strong angle, quality materials and well-coordinated outreach.",
      signatureTitle: "What credibility opens",
      signatureSubtitle: "The right story, in the right outlet, at the right time.",
      signature: [
        { value: "Top-tier", label: "placements that build real authority" },
        { value: "Timing", label: "the right angle at the moment that shapes narrative" },
        { value: "BR + global", label: "crypto and tech outlets at home and abroad" },
      ],
      whatsappMessage: "Hello! I want PR and communications for my crypto project. Can you help?",
      metaTitle: "Crypto PR & Communications - Kaleidos Digital",
      metaDescription: "PR and communications for crypto and web3 projects. Story angles, releases and coordinated outreach to top-tier outlets that build credibility and perception.",
      keywords: "crypto pr, web3 communications, crypto public relations, crypto media, kaleidos",
    },
  },

  // 6 — Comunidade
  {
    id: "comunidade-cripto",
    variant: 1,
    icon: "Users",
    pt: {
      slug: "comunidade-cripto",
      badge: "Gestão de Comunidade",
      h1: "Gestão de Comunidade Cripto",
      subhead:
        "Discord e Telegram são a fundação do seu projeto. A gente constrói comunidade engajada e leal com moderação 24/7, plano de crescimento e gestão especialista pra cripto e blockchain.",
      ctaPrimary: "Quero uma comunidade ativa",
      accent: "pink",
      whoTitle: "Para quem é a Gestão de Comunidade",
      who: [
        { title: "Projetos pré-lançamento", desc: "Construir uma base engajada antes do TGE, pra lançar com comunidade de verdade e não correr atrás depois." },
        { title: "Protocolos pós-TGE", desc: "O hype passou e o Discord esfriou. A gente mantém a base ativa e saudável quando a maioria some." },
        { title: "Protocolos DeFi", desc: "Suporte, educação e moderação pra uma base técnica e exigente." },
        { title: "Projetos de Gaming & NFT", desc: "Comunidades grandes e barulhentas que precisam de moderação e energia constantes." },
        { title: "L1s / L2s e ecossistemas", desc: "Coordenar comunidades de múltiplos produtos sob uma cultura comum." },
        { title: "Projetos preparando lançamentos", desc: "Aquecer e organizar a comunidade pro momento crítico do lançamento." },
      ],
      whyMattersTitle: "Por que comunidade importa",
      whyMattersBody:
        "Em cripto, a comunidade é o produto antes do produto. É onde early adopter vira advogado da marca e onde o momentum se constrói ou morre. Discord e Telegram parados afastam membro novo e gritam projeto morto. Comunidade ativa e bem moderada vira tração, suporte e a melhor distribuição que existe.",
      whyMattersBullets: [
        "Comunidade ativa é prova social: ninguém entra em servidor vazio.",
        "Moderação 24/7 protege a marca de FUD, golpe e ruído de madrugada.",
        "Base engajada vira distribuição orgânica e defesa espontânea do projeto.",
        "Comunidade é o canal mais barato de retenção e suporte que você tem.",
      ],
      deliverablesTitle: "O que entregamos na Gestão de Comunidade",
      deliverables: [
        "Estratégia e estrutura da comunidade",
        "Setup e organização de Telegram e Discord",
        "Moderação 24/7 e gestão de regras",
        "Combate a scam, spam e fake admins",
        "Onboarding de novos membros",
        "Calendário de engajamento (AMAs, quizzes, eventos)",
        "Produção de conteúdo nativo da comunidade",
        "Programa de embaixadores e cargos",
        "Gamificação e sistema de recompensas",
        "Coleta de feedback e leitura de sentimento",
        "Relatórios de crescimento e engajamento",
        "Suporte em momentos de pico (TGE, listagem, drops)",
      ],
      processTitle: "Nosso processo de Gestão de Comunidade",
      process: [
        { title: "Estratégia & Estrutura", desc: "Definição de cultura, regras, canais, cargos e plano de crescimento da comunidade." },
        { title: "Moderação & Operação", desc: "Cobertura 24/7, moderação ativa, combate a golpe/FUD e onboarding de novos membros." },
        { title: "Engajamento & Programas", desc: "Eventos, AMAs, quests, recompensas e programas que mantêm a base viva e crescendo." },
        { title: "Análise & Relatório", desc: "Métricas de saúde da comunidade, sentimento e crescimento, com ajustes contínuos." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Estratégia e estrutura de comunidade",
        "Moderação 24/7 (Discord/Telegram)",
        "Onboarding de novos membros",
        "Combate a golpe, FUD e spam",
        "Eventos, AMAs e quests",
        "Programas de engajamento e recompensa",
        "Coordenação com o time do projeto",
        "Relatórios de saúde e sentimento",
      ],
      casesTitle: "Comunidades que construímos",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Comunidade do zero: Instagram, Twitter e grupo de WhatsApp ativos.", href: "/cases/defiverso" },
        { name: "Investidor 4.20", metric: "10x Faturamento", desc: "Comunidade engajada como base do funil orgânico.", href: "/cases/investidor-4-20" },
        { name: "Bit das Minas", metric: "+200% Faturamento", desc: "Comunidade leal e engajada de educação cripto feminina.", href: "/cases/bit-das-minas" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para Comunidade",
      whyUs: [
        { title: "Comunidade que vira tração", desc: "Não é só moderar: estruturamos comunidade que cresce e sustenta o projeto." },
        { title: "Cripto-nativos", desc: "Entendemos a cultura, a gíria e os riscos (golpe, FUD) das comunidades web3." },
        { title: "Moderação de verdade, 24/7", desc: "Cobertura constante que protege a marca enquanto você dorme." },
        { title: "Conteúdo + comunidade integrados", desc: "A mesma máquina de conteúdo da Kaleidos alimenta e amplia a comunidade." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "O que diferencia gestão de comunidade cripto da tradicional?", answer: "Cripto exige moderação contra golpe e FUD, entendimento de incentivos on-chain, cultura de Discord/Telegram e velocidade. É mais técnico e mais arriscado que comunidade comum." },
        { question: "Quando devo investir em gestão de comunidade?", answer: "Idealmente antes do lançamento, pra chegar ao TGE com base engajada. Mas também ajudamos projetos pós-TGE que precisam reativar ou organizar a comunidade." },
        { question: "Vocês cobrem moderação 24/7 mesmo?", answer: "Sim, com uma estrutura combinada: moderadores dedicados em horários estendidos, automações e alertas anti-golpe, e protocolo claro com o seu time. Comunidade cripto não dorme, e golpe acontece de madrugada, por isso a cobertura é contínua pra proteger a marca e os membros." },
        { question: "Qual a diferença entre comunidade e social media?", answer: "Social media é alcance e descoberta (1 pra muitos). Comunidade é relacionamento e retenção (muitos pra muitos), dentro de Discord/Telegram. Os dois se complementam." },
      ],
      finalCtaTitle: "Pronto pra ter uma comunidade viva?",
      finalCtaSubtitle: "Vamos transformar seu Discord/Telegram em ativo de tração.",
      statement: {
        kicker: "A comunidade é o produto antes do produto",
        bigValue: "24/7",
        bigLabel: "comunidade cripto não dorme, e golpe acontece de madrugada",
        headline: "Discord parado afasta membro novo e grita projeto morto.",
        body: "É na comunidade que early adopter vira advogado da marca e que o momentum se constrói ou morre. Ninguém entra em servidor vazio. Comunidade ativa e bem moderada vira tração, suporte e a melhor distribuição que existe, mas só com cobertura constante e estratégia.",
      },
      approach: {
        name: "Framework de Crescimento de Comunidade",
        intro: "Comunidade não é lista de broadcast, é grupo de stakeholders. Crescimento aleatório é insustentável. A gente estrutura cultura, moderação e métricas em quatro frentes que se sustentam.",
        pillars: [
          { title: "Fundação", desc: "Cultura, regras, canais, cargos e narrativa que dão identidade à comunidade desde o primeiro membro." },
          { title: "Ativação", desc: "Onboarding, eventos e content bursts que transformam entrada em participação, e participação em pertencimento." },
          { title: "Expansão", desc: "Quests, programas de embaixadores e UGC que fazem a base crescer por dentro, com defesa espontânea do projeto." },
          { title: "Otimização", desc: "Métricas de saúde, sentimento e retenção que orientam moderação e programas, ciclo após ciclo." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semanas 1–2", title: "Estratégia & Estrutura", desc: "Definição de cultura, regras, canais, cargos e plano de crescimento da comunidade.", deliverables: ["Estrutura de servidor", "Regras e cargos", "Plano de crescimento"] },
        { tag: "Fase 02", duration: "Contínuo", title: "Moderação & Operação", desc: "Cobertura estendida, moderação ativa, combate a golpe/FUD e onboarding de novos membros.", deliverables: ["Moderação Discord/Telegram", "Automações anti-golpe", "Onboarding de membros"] },
        { tag: "Fase 03", duration: "Semanal", title: "Engajamento & Programas", desc: "Eventos, AMAs, quests, recompensas e programas que mantêm a base viva e crescendo.", deliverables: ["AMAs & eventos", "Quests e recompensas", "Programa de embaixadores"] },
        { tag: "Fase 04", duration: "Mensal", title: "Análise & Relatório", desc: "Métricas de saúde da comunidade, sentimento e crescimento, com ajustes contínuos.", deliverables: ["Relatório de saúde", "Análise de sentimento", "Plano do próximo ciclo"] },
      ],
      processNote: "Cobertura combinada: moderadores dedicados em horários estendidos, automações e protocolo claro com o seu time.",
      notIncluded: [
        "Desenvolvimento de bots customizados sob demanda",
        "Suporte técnico de produto (tickets de bug on-chain)",
        "Distribuição de airdrop / gestão de tesouraria de tokens",
      ],
      includedNote: "Conteúdo e comunidade integrados: a mesma máquina de conteúdo da Kaleidos alimenta e amplia a base.",
      signatureTitle: "Comunidade que vira tração",
      signatureSubtitle: "O canal mais barato de retenção e suporte que você tem.",
      signature: [
        { value: "24/7", label: "moderação que protege a marca enquanto você dorme" },
        { value: "Discord + Telegram", label: "os hubs onde a base realmente vive" },
        { value: "Cripto-nativo", label: "entendemos golpe, FUD e cultura web3" },
      ],
      whatsappMessage: "Olá! Quero gestão de comunidade pro meu projeto cripto. Podem me ajudar?",
      metaTitle: "Gestão de Comunidade Cripto - Kaleidos Digital",
      metaDescription: "Gestão de comunidade para projetos cripto e blockchain. Moderação contínua, crescimento estratégico e engajamento em Discord e Telegram que vira tração.",
      keywords: "gestão de comunidade cripto, community management web3, discord cripto, telegram cripto, kaleidos",
    },
    en: {
      slug: "comunidade-cripto",
      badge: "Community Management",
      h1: "Crypto Community Management",
      subhead:
        "Your Discord and Telegram are your project's foundation. We build engaged, loyal communities with 24/7 moderation, a real growth plan and expert management for crypto and blockchain projects.",
      ctaPrimary: "I want an active community",
      accent: "pink",
      whoTitle: "Who Community Management is for",
      who: [
        { title: "Pre-launch projects", desc: "Build an engaged base before the TGE, so you launch with a real community instead of scrambling later." },
        { title: "Post-TGE protocols", desc: "The hype faded and the Discord went quiet. We keep the base active and healthy when most fade away." },
        { title: "DeFi protocols", desc: "Support, education and moderation for a technical, demanding base." },
        { title: "Gaming & NFT projects", desc: "Large, loud communities that need constant moderation and energy." },
        { title: "L1s / L2s and ecosystems", desc: "Coordinate multi-product communities under one shared culture." },
        { title: "Projects preparing launches", desc: "Warm up and organize the community for the critical launch moment." },
      ],
      whyMattersTitle: "Why community matters",
      whyMattersBody:
        "In crypto, the community is the product before the product. It's where early adopters become advocates and where momentum builds or dies. A dead Discord or Telegram pushes new members away and screams dead project. An active, well-moderated community becomes traction, support and the best distribution there is.",
      whyMattersBullets: [
        "An active community is social proof: nobody joins an empty server.",
        "24/7 moderation protects the brand from FUD, scams and 3am noise.",
        "An engaged base becomes organic distribution and spontaneous defense.",
        "Community is the cheapest retention and support channel you have.",
      ],
      deliverablesTitle: "What we deliver in Community Management",
      deliverables: [
        "Community strategy and structure",
        "Telegram and Discord setup and organization",
        "24/7 moderation and rule management",
        "Scam, spam and fake-admin defense",
        "New member onboarding",
        "Engagement calendar (AMAs, quizzes, events)",
        "Native community content production",
        "Ambassador program and roles",
        "Gamification and rewards system",
        "Feedback collection and sentiment reading",
        "Growth and engagement reports",
        "Support during peaks (TGE, listing, drops)",
      ],
      processTitle: "Our Community Management process",
      process: [
        { title: "Strategy & Structure", desc: "Define culture, rules, channels, roles and a community growth plan." },
        { title: "Moderation & Operations", desc: "24/7 coverage, active moderation, scam/FUD defense and new-member onboarding." },
        { title: "Engagement & Programs", desc: "Events, AMAs, quests, rewards and programs that keep the base alive and growing." },
        { title: "Analysis & Reporting", desc: "Community health, sentiment and growth metrics, with continuous tuning." },
      ],
      includedTitle: "What's included",
      included: [
        "Community strategy and structure",
        "24/7 moderation (Discord/Telegram)",
        "New-member onboarding",
        "Scam, FUD and spam defense",
        "Events, AMAs and quests",
        "Engagement and reward programs",
        "Coordination with the project team",
        "Health and sentiment reports",
      ],
      casesTitle: "Communities we built",
      cases: [
        { name: "Defiverso", metric: "12M Views", desc: "Community from scratch: active Instagram, Twitter and WhatsApp group.", href: "/cases/defiverso" },
        { name: "Investidor 4.20", metric: "10x Revenue", desc: "Engaged community as the base of the organic funnel.", href: "/cases/investidor-4-20" },
        { name: "Bit das Minas", metric: "+200% Revenue", desc: "Loyal, engaged female crypto education community.", href: "/cases/bit-das-minas" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Community",
      whyUs: [
        { title: "Community that becomes traction", desc: "Not just moderation: we structure communities that grow and sustain the project." },
        { title: "Crypto-native", desc: "We understand the culture, slang and risks (scams, FUD) of web3 communities." },
        { title: "Real 24/7 moderation", desc: "Constant coverage that protects the brand while you sleep." },
        { title: "Content + community integrated", desc: "The same Kaleidos content machine feeds and amplifies the community." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "What makes crypto community management different?", answer: "Crypto requires moderation against scams and FUD, understanding of on-chain incentives, Discord/Telegram culture and speed. It's more technical and riskier than regular community work." },
        { question: "When should I invest in community management?", answer: "Ideally before launch, to reach the TGE with an engaged base. But we also help post-TGE projects that need to reactivate or organize their community." },
        { question: "Do you really cover 24/7 moderation?", answer: "Yes, with a combined setup: dedicated moderators on extended hours, anti-scam automations and alerts, and a clear protocol with your team. Crypto communities don't sleep and scams happen at 3am, so coverage stays continuous to protect the brand and members." },
        { question: "What's the difference between community and social media?", answer: "Social media is reach and discovery (one-to-many). Community is relationship and retention (many-to-many) inside Discord/Telegram. The two complement each other." },
      ],
      finalCtaTitle: "Ready for a living community?",
      finalCtaSubtitle: "Let's turn your Discord/Telegram into a traction asset.",
      statement: {
        kicker: "The community is the product before the product",
        bigValue: "24/7",
        bigLabel: "crypto communities don't sleep, and scams happen at 3am",
        headline: "A dead Discord pushes new members away and screams dead project.",
        body: "The community is where early adopters become advocates and where momentum builds or dies. Nobody joins an empty server. An active, well-moderated community becomes traction, support and the best distribution there is, but only with constant coverage and strategy.",
      },
      approach: {
        name: "Community Growth Framework",
        intro: "A community isn't a broadcast list, it's a group of stakeholders. Random growth is unsustainable. We structure culture, moderation and metrics across four self-reinforcing fronts.",
        pillars: [
          { title: "Foundation", desc: "Culture, rules, channels, roles and narrative that give the community identity from the first member." },
          { title: "Activation", desc: "Onboarding, events and content bursts that turn joins into participation, and participation into belonging." },
          { title: "Expansion", desc: "Quests, ambassador programs and UGC that grow the base from within, with spontaneous defense of the project." },
          { title: "Optimization", desc: "Health, sentiment and retention metrics that steer moderation and programs, cycle after cycle." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Weeks 1–2", title: "Strategy & Structure", desc: "Define culture, rules, channels, roles and a community growth plan.", deliverables: ["Server structure", "Rules and roles", "Growth plan"] },
        { tag: "Phase 02", duration: "Ongoing", title: "Moderation & Operations", desc: "Extended coverage, active moderation, scam/FUD defense and new-member onboarding.", deliverables: ["Discord/Telegram moderation", "Anti-scam automations", "Member onboarding"] },
        { tag: "Phase 03", duration: "Weekly", title: "Engagement & Programs", desc: "Events, AMAs, quests, rewards and programs that keep the base alive and growing.", deliverables: ["AMAs & events", "Quests and rewards", "Ambassador program"] },
        { tag: "Phase 04", duration: "Monthly", title: "Analysis & Reporting", desc: "Community health, sentiment and growth metrics, with continuous tuning.", deliverables: ["Health report", "Sentiment analysis", "Next-cycle plan"] },
      ],
      processNote: "Combined coverage: dedicated moderators on extended hours, automations and a clear protocol with your team.",
      notIncluded: [
        "Custom bot development on demand",
        "Product technical support (on-chain bug tickets)",
        "Airdrop distribution / token treasury management",
      ],
      includedNote: "Content and community integrated: the same Kaleidos content machine feeds and amplifies the base.",
      signatureTitle: "Community that becomes traction",
      signatureSubtitle: "The cheapest retention and support channel you have.",
      signature: [
        { value: "24/7", label: "moderation that protects the brand while you sleep" },
        { value: "Discord + Telegram", label: "the hubs where the base actually lives" },
        { value: "Crypto-native", label: "we understand scams, FUD and web3 culture" },
      ],
      whatsappMessage: "Hello! I want community management for my crypto project. Can you help?",
      metaTitle: "Crypto Community Management - Kaleidos Digital",
      metaDescription: "Community management for crypto and blockchain projects. Continuous moderation, strategic growth and engagement on Discord and Telegram that becomes traction.",
      keywords: "crypto community management, web3 community, crypto discord, crypto telegram, kaleidos",
    },
  },

  // 7 — Influencer / KOL
  {
    id: "influencer-kol",
    variant: 2,
    icon: "Star",
    pt: {
      slug: "influencer-kol",
      badge: "Influencer & KOL",
      h1: "Marketing de Influência Cripto (KOLs)",
      subhead:
        "A maioria das campanhas de KOL é post solto que some em horas e queima budget com seguidor fantasma. As nossas amplificam a sua narrativa por vozes confiáveis e geram awareness, credibilidade e momentum em qualquer estágio.",
      ctaPrimary: "Quero uma campanha",
      accent: "green",
      whoTitle: "Para quem é o Marketing de Influência",
      who: [
        { title: "Projetos pré-lançamento construindo awareness", desc: "Colocar o projeto no radar das vozes certas antes do TGE." },
        { title: "Projetos preparando o TGE", desc: "Amplificar o lançamento com KOLs alinhados à narrativa." },
        { title: "Projetos pós-lançamento", desc: "Sustentar momentum com presença contínua de criadores confiáveis." },
        { title: "Projetos entrando em novos mercados", desc: "Usar KOLs locais pra abrir mercados e regiões novas com credibilidade." },
        { title: "Projetos com produto forte e distribuição fraca", desc: "Seu produto funciona, sua tech é sólida, mas ninguém sabe que você existe. A gente resolve esse gargalo." },
        { title: "Projetos em categorias disputadas", desc: "Cortar o ruído de uma categoria lotada com vozes que dão diferenciação e prova social." },
      ],
      whyMattersTitle: "Por que influência importa em cripto",
      whyMattersBody:
        "Em cripto, a confiança é emprestada. A audiência confia primeiro na voz que já segue, e só depois no seu projeto. Campanha de KOL bem feita transfere essa confiança pra você. Mal feita, queima budget com bot, audiência errada e shoutout genérico que ninguém lê.",
      whyMattersBullets: [
        "O KOL certo entrega confiança e audiência qualificada que paid nenhum compra.",
        "A diferença entre campanha boa e cara é curadoria: voz alinhada vs. número inflado.",
        "Influência amplifica narrativa, não substitui produto nem estratégia.",
        "Prova social de voz confiável acelera adoção e gera FOMO saudável.",
      ],
      deliverablesTitle: "O que entregamos em Influencer & KOL",
      deliverables: [
        "Estratégia de influência e KOL marketing",
        "Curadoria e seleção de creators cripto",
        "Análise de autenticidade e audiência (anti-fake)",
        "Negociação e fechamento de parcerias",
        "Briefing e direcionamento de conteúdo",
        "Gestão e acompanhamento da campanha",
        "Aprovação e controle de qualidade das peças",
        "Coordenação de cronograma e publicações",
        "Tracking de links, cupons e conversões",
        "Gestão de KOL rounds e parcerias de longo prazo",
        "Relacionamento contínuo com a rede de creators",
        "Relatório de performance e ROI por creator",
      ],
      processTitle: "Nosso processo de Influência",
      process: [
        { title: "Estratégia & Onboarding", desc: "Definição de objetivo, narrativa, perfil de KOL ideal e métricas da campanha." },
        { title: "Curadoria & Coordenação de Criadores", desc: "Seleção de vozes alinhadas (não só grandes), negociação e briefing." },
        { title: "Execução & Monitoramento ao Vivo", desc: "Acompanhamento das publicações, qualidade do conteúdo e timing da campanha." },
        { title: "Relatório & Otimização", desc: "Métricas reais de alcance e engajamento, com aprendizado pro próximo ciclo." },
      ],
      includedTitle: "O que está incluso",
      included: [
        "Estratégia de campanha de influência",
        "Curadoria de KOLs alinhados à narrativa",
        "Negociação e coordenação de criadores",
        "Briefing e direção de conteúdo",
        "Gestão de timing e campanha",
        "Monitoramento ao vivo das publicações",
        "Verificação de audiência (anti-bot)",
        "Relatório de alcance e engajamento",
      ],
      casesTitle: "Amplificação por vozes",
      cases: [
        { name: "Investidor 4.20", metric: "10x Faturamento", desc: "Creator cripto com audiência engajada e estratégia de amplificação.", href: "/cases/investidor-4-20" },
        { name: "Layla Foz", metric: "+20M Views", desc: "Crescimento e distribuição via conteúdo de creator.", href: "/cases/layla-foz" },
        { name: "Defiverso", metric: "12M Views", desc: "Ecossistema de conteúdo e creators conectado à comunidade.", href: "/cases/defiverso" },
      ],
      stats: STATS_BASE_PT,
      whyUsTitle: "Por que a Kaleidos para Influência",
      whyUs: [
        { title: "Curadoria sobre vaidade", desc: "Escolhemos voz alinhada à narrativa, não só seguidor. Audiência certa vale mais que número grande." },
        { title: "Verificação anti-bot", desc: "Checamos audiência real antes de gastar seu budget com seguidor fantasma." },
        { title: "Somos creators também", desc: "Operamos creators cripto reais, sabemos o que faz uma campanha funcionar de dentro." },
        { title: "Influência integrada à estratégia", desc: "KOL não vira ação solta: entra no sistema de conteúdo e narrativa do projeto." },
      ],
      faqTitle: "Perguntas frequentes",
      faq: [
        { question: "Como escolhem os influenciadores (KOLs)?", answer: "Priorizamos alinhamento de narrativa e audiência qualificada sobre tamanho. Verificamos audiência real (anti-bot) e histórico antes de recomendar qualquer voz." },
        { question: "Campanha de influência funciona pra projeto pequeno?", answer: "Sim. Com a curadoria certa, micro e mid-KOLs entregam audiência mais engajada e custo melhor que os nomes grandes. Um creator médio com a audiência certa rende mais que um mega-influencer cujos seguidores não ligam pra sua categoria. O segredo é o fit, não o tamanho." },
        { question: "Vocês garantem retorno da campanha?", answer: "Garantimos curadoria séria, briefing de qualidade e métricas transparentes. Resultado depende de produto, narrativa e timing, por isso integramos influência à estratégia, não vendemos como bala de prata." },
        { question: "Trabalham com KOLs internacionais?", answer: "Sim. Temos rede de criadores no Brasil e no mercado internacional, útil pra projetos entrando em novos mercados." },
      ],
      finalCtaTitle: "Pronto pra amplificar sua narrativa?",
      finalCtaSubtitle: "Vamos montar a campanha de KOL certa pro seu estágio.",
      statement: {
        kicker: "Em cripto, a confiança é emprestada",
        bigValue: "Fit > Tamanho",
        bigLabel: "audiência alinhada rende mais que número inflado",
        headline: "A maioria das campanhas de KOL é post solto que some em horas e queima budget com seguidor fantasma.",
        body: "A audiência confia primeiro na voz que já segue, e só depois no seu projeto. Campanha bem feita transfere essa confiança pra você. Mal feita, paga caro por bot, audiência errada e shoutout genérico que ninguém lê. A diferença entre as duas é curadoria.",
      },
      approach: {
        name: "KOL como Sistema de Distribuição",
        intro: "Os melhores KOL campaigns não são pay-to-shill. São estruturados como sistemas de distribuição: casa-se a voz certa com a narrativa certa, valida-se a audiência e mede-se o impacto real.",
        pillars: [
          { title: "Credibilidade & fit", desc: "Voz alinhada à narrativa e à categoria, não só seguidor. O creator precisa ter credibilidade no assunto que vai falar." },
          { title: "Verificação anti-bot", desc: "Checamos comentários, seguidores reais e engagement rate saudável antes de gastar seu budget com audiência fantasma." },
          { title: "Briefing & clareza", desc: "Direção de conteúdo pra o KOL explicar tokenomics, utilidade e risco com clareza, em vez de hype vazio." },
          { title: "Impacto mensurável", desc: "Medimos do alcance ao comportamento (engajamento, tráfego, ação), não vanity metrics que enganam." },
        ],
      },
      processPhases: [
        { tag: "Fase 01", duration: "Semana 1", title: "Estratégia & Onboarding", desc: "Definição de objetivo, narrativa, perfil de KOL ideal e métricas da campanha.", deliverables: ["Objetivo e KPIs", "Perfil de KOL ideal", "Mensagens-chave"] },
        { tag: "Fase 02", duration: "Semanas 1–2", title: "Curadoria & Coordenação", desc: "Seleção de vozes alinhadas (não só grandes), verificação anti-bot, negociação e briefing.", deliverables: ["Shortlist de KOLs verificados", "Negociação e contratos", "Briefing de conteúdo"] },
        { tag: "Fase 03", duration: "Janela da campanha", title: "Execução & Monitoramento", desc: "Acompanhamento das publicações, qualidade do conteúdo e timing da campanha ao vivo.", deliverables: ["Calendário de publicações", "Aprovação de conteúdo", "Monitoramento ao vivo"] },
        { tag: "Fase 04", duration: "Pós-campanha", title: "Relatório & Otimização", desc: "Métricas reais de alcance e engajamento, com aprendizado pro próximo ciclo.", deliverables: ["Relatório de performance", "Análise por KOL", "Plano do próximo round"] },
      ],
      processNote: "Funciona pra qualquer estágio: awareness pré-TGE, amplificação de lançamento ou momentum pós-launch.",
      notIncluded: [
        "Pagamento garantido em token sem vesting (evitamos dump)",
        "Compra de menção sem disclosure (fora das boas práticas)",
        "KOL fora do fit de narrativa só por ter número grande",
      ],
      includedNote: "Curadoria sobre vaidade: um creator médio com a audiência certa rende mais que um mega-influencer desalinhado.",
      signatureTitle: "Amplificação que transfere confiança",
      signatureSubtitle: "Voz certa, audiência certa, impacto medido.",
      signature: [
        { value: "Anti-bot", label: "audiência verificada antes do budget" },
        { value: "Curadoria", label: "fit de narrativa acima de seguidor" },
        { value: "Somos creators", label: "sabemos por dentro o que faz funcionar" },
      ],
      whatsappMessage: "Olá! Quero uma campanha de marketing de influência (KOL) pro meu projeto cripto. Podem me ajudar?",
      metaTitle: "Marketing de Influência Cripto (KOLs) - Kaleidos Digital",
      metaDescription: "Campanhas de influência e KOL para projetos cripto e web3. Curadoria de vozes confiáveis, verificação anti-bot e amplificação de narrativa em qualquer estágio.",
      keywords: "marketing de influência cripto, kol cripto, influencer marketing web3, campanha kol, kaleidos",
    },
    en: {
      slug: "influencer-kol",
      badge: "Influencer & KOL",
      h1: "Crypto Influencer Marketing (KOLs)",
      subhead:
        "Most KOL campaigns are throwaway posts that vanish in hours and burn budget on ghost followers. Ours amplify your narrative through trusted voices, driving awareness, credibility and momentum at any stage.",
      ctaPrimary: "I want a campaign",
      accent: "green",
      whoTitle: "Who Influencer Marketing is for",
      who: [
        { title: "Pre-launch projects building awareness", desc: "Put the project on the radar of the right voices before the TGE." },
        { title: "Projects preparing a TGE", desc: "Amplify the launch with KOLs aligned to the narrative." },
        { title: "Post-launch projects", desc: "Sustain momentum with ongoing presence from trusted creators." },
        { title: "Projects entering new markets", desc: "Use local KOLs to open new markets and regions with credibility." },
        { title: "Strong product, weak distribution", desc: "Your product works, your tech is solid, but nobody knows you exist. We fix that bottleneck." },
        { title: "Projects in crowded categories", desc: "Cut through the noise of a saturated category with voices that give differentiation and social proof." },
      ],
      whyMattersTitle: "Why influence matters in crypto",
      whyMattersBody:
        "In crypto, trust is borrowed. The audience trusts the voice they already follow first, and your project second. A well-run KOL campaign transfers that trust to you. A bad one burns budget on bots, the wrong audience and generic shoutouts nobody reads.",
      whyMattersBullets: [
        "The right KOL delivers trust and qualified audience no paid budget can buy.",
        "The difference between a good and an expensive campaign is curation: aligned voice vs. inflated number.",
        "Influence amplifies narrative, it doesn't replace product or strategy.",
        "Social proof from a trusted voice accelerates adoption and drives healthy FOMO.",
      ],
      deliverablesTitle: "What we deliver in Influencer & KOL",
      deliverables: [
        "Influence and KOL marketing strategy",
        "Curation and selection of crypto creators",
        "Authenticity and audience analysis (anti-fake)",
        "Negotiation and partnership closing",
        "Briefing and content direction",
        "Campaign management and follow-up",
        "Approval and quality control of deliverables",
        "Schedule and posting coordination",
        "Link, coupon and conversion tracking",
        "KOL rounds and long-term partnership management",
        "Ongoing relationship with the creator network",
        "Per-creator performance and ROI report",
      ],
      processTitle: "Our Influence process",
      process: [
        { title: "Strategy & Onboarding", desc: "Define goal, narrative, ideal KOL profile and campaign metrics." },
        { title: "Creator Sourcing & Coordination", desc: "Select aligned voices (not just big ones), negotiate and brief." },
        { title: "Execution & Live Monitoring", desc: "Track publications, content quality and campaign timing." },
        { title: "Reporting & Optimization", desc: "Real reach and engagement metrics, with learnings for the next cycle." },
      ],
      includedTitle: "What's included",
      included: [
        "Influence campaign strategy",
        "Curation of narrative-aligned KOLs",
        "Creator negotiation and coordination",
        "Briefing and content direction",
        "Timing and campaign management",
        "Live monitoring of publications",
        "Audience verification (anti-bot)",
        "Reach and engagement reporting",
      ],
      casesTitle: "Amplification through voices",
      cases: [
        { name: "Investidor 4.20", metric: "10x Revenue", desc: "Crypto creator with engaged audience and amplification strategy.", href: "/cases/investidor-4-20" },
        { name: "Layla Foz", metric: "+20M Views", desc: "Growth and distribution via creator content.", href: "/cases/layla-foz" },
        { name: "Defiverso", metric: "12M Views", desc: "Content and creator ecosystem connected to the community.", href: "/cases/defiverso" },
      ],
      stats: STATS_BASE_EN,
      whyUsTitle: "Why Kaleidos for Influence",
      whyUs: [
        { title: "Curation over vanity", desc: "We pick voices aligned to the narrative, not just follower counts. The right audience beats a big number." },
        { title: "Anti-bot verification", desc: "We check real audiences before spending your budget on ghost followers." },
        { title: "We're creators too", desc: "We run real crypto creators, we know what makes a campaign work from the inside." },
        { title: "Influence integrated into strategy", desc: "KOLs aren't a one-off: they plug into the project's content and narrative system." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { question: "How do you choose influencers (KOLs)?", answer: "We prioritize narrative alignment and qualified audience over size. We verify real audiences (anti-bot) and track record before recommending any voice." },
        { question: "Does influencer marketing work for small projects?", answer: "Yes. With the right curation, micro and mid-KOLs deliver more engaged audiences at better cost than big names. A mid-tier creator with the right audience beats a mega-influencer whose followers don't care about your category. The secret is fit, not size." },
        { question: "Do you guarantee campaign returns?", answer: "We guarantee serious curation, quality briefing and transparent metrics. Results depend on product, narrative and timing, which is why we integrate influence into strategy rather than selling it as a silver bullet." },
        { question: "Do you work with international KOLs?", answer: "Yes. We have a creator network in Brazil and internationally, useful for projects entering new markets." },
      ],
      finalCtaTitle: "Ready to amplify your narrative?",
      finalCtaSubtitle: "Let's build the right KOL campaign for your stage.",
      statement: {
        kicker: "In crypto, trust is borrowed",
        bigValue: "Fit > Size",
        bigLabel: "an aligned audience beats an inflated number",
        headline: "Most KOL campaigns are throwaway posts that vanish in hours and burn budget on ghost followers.",
        body: "The audience trusts the voice they already follow first, and your project second. A well-run campaign transfers that trust to you. A bad one pays dearly for bots, the wrong audience and generic shoutouts nobody reads. The difference between the two is curation.",
      },
      approach: {
        name: "KOL as a Distribution System",
        intro: "The best KOL campaigns aren't pay-to-shill. They're structured as distribution systems: match the right voice with the right narrative, validate the audience and measure real impact.",
        pillars: [
          { title: "Credibility & fit", desc: "Voice aligned to the narrative and category, not just follower count. The creator must be credible on the topic they'll cover." },
          { title: "Anti-bot verification", desc: "We check comments, real followers and a healthy engagement rate before spending your budget on ghost audiences." },
          { title: "Briefing & clarity", desc: "Content direction so the KOL explains tokenomics, utility and risk clearly, instead of empty hype." },
          { title: "Measurable impact", desc: "We measure from reach to behavior (engagement, traffic, action), not vanity metrics that deceive." },
        ],
      },
      processPhases: [
        { tag: "Phase 01", duration: "Week 1", title: "Strategy & Onboarding", desc: "Define goal, narrative, ideal KOL profile and campaign metrics.", deliverables: ["Goal and KPIs", "Ideal KOL profile", "Key messages"] },
        { tag: "Phase 02", duration: "Weeks 1–2", title: "Sourcing & Coordination", desc: "Select aligned voices (not just big ones), anti-bot verification, negotiation and briefing.", deliverables: ["Verified KOL shortlist", "Negotiation and contracts", "Content briefing"] },
        { tag: "Phase 03", duration: "Campaign window", title: "Execution & Monitoring", desc: "Track publications, content quality and campaign timing live.", deliverables: ["Publication calendar", "Content approval", "Live monitoring"] },
        { tag: "Phase 04", duration: "Post-campaign", title: "Reporting & Optimization", desc: "Real reach and engagement metrics, with learnings for the next cycle.", deliverables: ["Performance report", "Per-KOL analysis", "Next-round plan"] },
      ],
      processNote: "Works at any stage: pre-TGE awareness, launch amplification or post-launch momentum.",
      notIncluded: [
        "Guaranteed token payment without vesting (we avoid dumps)",
        "Buying mentions without disclosure (outside best practice)",
        "KOLs off the narrative fit just because the number is big",
      ],
      includedNote: "Curation over vanity: a mid-tier creator with the right audience beats a misaligned mega-influencer.",
      signatureTitle: "Amplification that transfers trust",
      signatureSubtitle: "Right voice, right audience, measured impact.",
      signature: [
        { value: "Anti-bot", label: "audience verified before the budget" },
        { value: "Curation", label: "narrative fit over follower count" },
        { value: "We're creators", label: "we know from the inside what makes it work" },
      ],
      whatsappMessage: "Hello! I want an influencer (KOL) marketing campaign for my crypto project. Can you help?",
      metaTitle: "Crypto Influencer Marketing (KOLs) - Kaleidos Digital",
      metaDescription: "Influencer and KOL campaigns for crypto and web3 projects. Curation of trusted voices, anti-bot verification and narrative amplification at any stage.",
      keywords: "crypto influencer marketing, crypto kol, web3 influencer, kol campaign, kaleidos",
    },
  },
];

export function getServiceData(id: string): ServiceData | undefined {
  const s = SERVICE_PAGES.find((sp) => sp.id === id);
  if (!s) return undefined;
  return { ...s, heroImage: s.heroImage ?? HERO_IMAGES[s.id] };
}
export function getAllServicePages(): ServiceData[] {
  return SERVICE_PAGES.map((s) => ({
    ...s,
    heroImage: s.heroImage ?? HERO_IMAGES[s.id],
  }));
}
