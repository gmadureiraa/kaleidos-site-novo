/**
 * Depoimentos de clientes — dados centralizados.
 * Importar este arquivo nos componentes de testimonials.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ✅ 19/08/2026 — AUTENTICIDADE CONFIRMADA PELO GABRIEL. DEPOIMENTOS RESTAURADOS.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Contexto: numa varredura de métricas sem fonte (commit `75f7b69`), os números
 * que estavam DENTRO das aspas dos depoimentos saíram junto — porque a única
 * origem rastreável era `docs/cases-estudo.txt`, que registra "Nenhum depoimento
 * específico" para Laylä Föz, Defiverso, Mercado Bitcoin e Paradigma.
 *
 * O Gabriel confirmou em 19/08/2026 que os depoimentos dos quatro clientes
 * (Laylä Föz, Defiverso, Mercado Bitcoin e Paradigma / Henrique) são REAIS,
 * coletados de fato, e mandou manter o texto original — números inclusive.
 * `cases-estudo.txt` está incompleto nesse ponto; ele NÃO é a fonte da coleta.
 *
 * Portanto foram restaurados ao texto original, aqui e no `proof-strip.tsx`:
 *   · Defiverso — "29 mil inscrições no Minicurso, 26 mil assinantes de
 *     newsletter e 12 milhões de views orgânicas em 90 dias".
 *   · Laylä Föz — "Meus reels ultrapassaram 20 milhões de views" (+20M views).
 *   · Mercado Bitcoin — "comunidade engajada com mais de 80 mil seguidores"
 *     (+80K seguidores).
 *   · Paradigma / Henrique — nunca foi alterado; permanece como está.
 *
 * ✅ 19/08/2026 (mesma régua, segunda rodada) — BIT DAS MINAS TAMBÉM CONFIRMADO.
 * O quote da Gi era o que faltava confirmar quando os outros quatro voltaram. O
 * Gabriel confirmou em 19/08/2026 que o depoimento é REAL e que o "+200% de
 * faturamento" é fala dela, não prosa da agência. Restaurados ao texto original:
 *   · Bit das Minas / Gi — "Faturamento cresceu mais de 200% com as estratégias
 *     de lançamento e conteúdo que criaram para mim" (PT e EN) + highlight
 *     "+200% faturamento". Também em `recent-works-section.tsx` e em `/contato`.
 *
 * ⚠️ O "+200%" volta APENAS dentro das aspas, como fala da cliente. Ele NÃO
 * volta como badge de card nem como métrica da agência solta na página: o
 * `resultBadge` da Bit das Minas em `recent-works-section.tsx` segue
 * "4+ lançamentos seguidos", e `metrics.ts` segue sem o "200% de crescimento
 * médio". Depoimento e métrica institucional são categorias diferentes.
 *
 * ⚠️ Distinção que continua valendo: depoimento é fala de cliente, e fala de
 * cliente não se edita. MÉTRICA INSTITUCIONAL da agência (as 8 de `metrics.ts`:
 * 125M+ views, R$46mi+, 98% de satisfação etc.) continua FORA do ar, por não ter
 * fonte primária. Não reponha número de agência aqui pra "combinar" com o quote.
 *
 * ⛔ Não reescreva nem "suavize" nenhum destes quotes de novo sem o Gabriel.
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string; // path to avatar image, fallback to initials
  avatarIsPhoto?: boolean; // true = foto de rosto (object-cover), false/undefined = logo (object-contain)
  quote: string;
  quote_en: string;
  caseLink?: string;
  highlight?: string; // metric or result badge
  highlight_en?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "defiverso",
    name: "Equipe Defiverso",
    role: "Marketing & Conteúdo",
    company: "Defiverso",
    avatar: "/Clientes-logo/Defiverso.png",
    quote:
      "A parceria com a Kaleidos resultou na criação de um ecossistema de marketing digital completo e de alta performance. 29 mil inscrições no Minicurso, 26 mil assinantes de newsletter e 12 milhões de views orgânicas em 90 dias.",
    quote_en:
      "The partnership with Kaleidos resulted in a complete, high-performance digital marketing ecosystem. 29K enrollments in the Mini-course, 26K newsletter subscribers and 12M organic views in 90 days.",
    caseLink: "/cases/defiverso",
    highlight: "12M+ views orgânicas",
    highlight_en: "12M+ organic views",
  },
  {
    id: "bit-das-minas",
    name: "Gi",
    role: "Criadora de Conteúdo",
    company: "Bit das Minas",
    avatar: "/Clientes-logo/BitdasMinas.png",
    quote:
      "A Kaleidos transformou completamente minha presença digital. Faturamento cresceu mais de 200% com as estratégias de lançamento e conteúdo que criaram para mim.",
    quote_en:
      "Kaleidos completely transformed my digital presence. Revenue grew over 200% with the launch and content strategies they created for me.",
    caseLink: "/cases/bit-das-minas",
    highlight: "+200% faturamento",
    highlight_en: "+200% revenue",
  },
  {
    id: "investidor-420",
    name: "Lucas Amendola",
    role: "Fundador",
    company: "Investidor 4.20",
    avatar: "/Clientes-logo/investidor420.png",
    quote:
      "Além de nos ajudar a produzir e implementar novos meios de comunicação para aquisição de clientes, aumentando consideravelmente nossa base de leads, a Kaleidos também nos ajudou a estruturar o comercial para recuperação de vendas e implementações via WhatsApp que fizeram toda a diferença. Sem eles, não teríamos tido o alcance que tivemos. Foram e continuam sendo um parceiro indispensável na nossa empresa.",
    quote_en:
      "Beyond helping us produce and implement new communication channels for customer acquisition, considerably growing our lead base, Kaleidos also helped us structure the sales side for revenue recovery and WhatsApp implementations that made all the difference. Without them, we wouldn't have had the reach we did. They were and continue to be an indispensable partner in our company.",
    caseLink: "/cases/investidor-4-20",
    highlight: "Parceiro indispensável",
    highlight_en: "Indispensable partner",
  },
  {
    id: "layla-foz",
    name: "Laylä Föz",
    role: "Travel Creator",
    company: "Laylä Föz",
    avatar: "/Clientes-logo/LaylaFoz.png",
    quote:
      "A edição de vídeo da Kaleidos é outro nível. Meus reels ultrapassaram 20 milhões de views. Eles entendem o ritmo, a narrativa e o que faz o algoritmo trabalhar a favor.",
    quote_en:
      "Kaleidos' video editing is next level. My reels surpassed 20 million views. They understand the rhythm, the narrative and what makes the algorithm work in your favor.",
    caseLink: "/cases/layla-foz",
    highlight: "+20M views",
    highlight_en: "+20M views",
  },
  {
    id: "paradigma",
    name: "Henrique",
    role: "Conteúdo",
    company: "Paradigma Education",
    avatar: "/depoimentos/henrique-paradigma.png",
    avatarIsPhoto: true,
    quote:
      "Trabalhamos com a Kaleidos há um tempo produzindo reels de cortes, e o padrão sempre foi alto: edição e animação de qualidade, pontualidade e um time profissional. Quando pedimos algum ajuste, a resposta é rápida, o que facilita muito o nosso fluxo de conteúdo.",
    quote_en:
      "We've been working with Kaleidos for a while producing clip reels, and the standard has always been high: quality editing and animation, punctuality and a professional team. When we ask for an adjustment, the response is fast, which makes our content flow much easier.",
    caseLink: "/cases/paradigma-education",
    highlight: "Padrão sempre alto",
    highlight_en: "Consistently high standard",
  },
  {
    id: "mercado-bitcoin",
    name: "Equipe MB",
    role: "Social Media",
    company: "Mercado Bitcoin",
    avatar: "/Clientes-logo/MercadoBitcoin.png",
    quote:
      "18 meses de parceria com resultados consistentes. A Kaleidos cuidou do nosso conteúdo para redes sociais e ajudou a construir uma comunidade engajada com mais de 80 mil seguidores.",
    quote_en:
      "18 months of partnership with consistent results. Kaleidos handled our social media content and helped build an engaged community with over 80K followers.",
    caseLink: "/cases/mercado-bitcoin",
    highlight: "+80K seguidores",
    highlight_en: "+80K followers",
  },
  {
    id: "neobankless",
    name: "Matheus Fassheber",
    role: "Fundador",
    company: "NeoBankless",
    avatar: "/depoimentos/matheus-fassheber.png",
    avatarIsPhoto: true,
    quote:
      "O que mais me tranquiliza na Kaleidos é a confiança. Quando eu passo alguma coisa pra eles, eu sei que vai ser resolvido, sem precisar ficar em cima. O time assume, cuida de cada detalhe e entrega. Isso me libera pra focar no que só eu posso fazer no negócio.",
    quote_en:
      "What reassures me most about Kaleidos is the trust. When I hand something over to them, I know it will get done without me having to micromanage. The team takes ownership, handles every detail and delivers. That frees me to focus on what only I can do in the business.",
    highlight: "Confio de olhos fechados",
    highlight_en: "Total peace of mind",
  },
];

export function getTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}
