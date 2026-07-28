/**
 * Depoimentos de clientes — dados centralizados.
 * Importar este arquivo nos componentes de testimonials.
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
    name: "Layla Foz",
    role: "Travel Creator",
    company: "Layla Foz",
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
