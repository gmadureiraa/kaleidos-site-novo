/**
 * Depoimentos de clientes — dados centralizados.
 * Importar este arquivo nos componentes de testimonials.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ 19/08/2026 — OS NÚMEROS SEM FONTE SAÍRAM DOS QUOTES.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Regra aplicada: número dentro de aspas é afirmação atribuída a um terceiro.
 * Se não há fonte primária, ele sai — e a frase é reescrita pra funcionar sem ele.
 *
 * O que saiu, e por quê:
 *   · Bit das Minas · "+200% de faturamento" — a única origem é
 *     `docs/cases-estudo.txt:21`, questionário de case em prosa, sem data e sem
 *     autor, cuja redação é "**observamos** um aumento de mais de 200%".
 *     Ou seja: NÃO é fala da cliente. Estava entre aspas na boca dela.
 *   · Laylä Föz · "20 milhões de views" — mesma origem (`cases-estudo.txt:33`),
 *     sem print, sem janela, sem export.
 *   · Mercado Bitcoin · "+80 mil seguidores" — o próprio questionário
 *     (`cases-estudo.txt:69`) diz "mais de **100 mil** inscritos". Dois números
 *     diferentes, nenhum com apuração.
 *
 * O que FICOU, e por quê: os três números do quote do Defiverso têm print
 * primário em `public/Cases/defiverso/estudo/` (Instagram Insights + Beehiiv) —
 * corrigido o 26.554 para 26.556, que é o que o print diz, e removido o
 * "29 mil" do minicurso, que não aparece em print nenhum.
 *
 * 🔴 PENDÊNCIA ABERTA PRO GABRIEL — não é sobre número, é sobre atribuição:
 * `docs/cases-estudo.txt` registra literalmente "Depoimentos: **Nenhum
 * depoimento específico**" para Laylä Föz (:31), Defiverso (:115), Mercado
 * Bitcoin (:66) e Paradigma (:127). Os quatro têm hoje citação entre aspas no
 * site, com avatar de logo e nome genérico ("Equipe Defiverso", "Equipe MB").
 * Os de Lucas Amendola, Henrique/Paradigma e Matheus Fassheber trazem texto
 * longo e específico (e os dois últimos têm foto de rosto), o que sugere coleta
 * real. Os de logo, não. **Confirmar quais foram de fato coletados; os que não
 * forem, saem.** Depoimento inventado é mais grave que número inventado.
 *
 * ⛔ Não adicione número a um quote sem fonte primária citável.
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
      "A parceria com a Kaleidos resultou na criação de um ecossistema de marketing digital completo e de alta performance. 26.556 assinantes de newsletter a 33% de abertura e 12 milhões de views orgânicas em 90 dias.",
    quote_en:
      "The partnership with Kaleidos resulted in a complete, high-performance digital marketing ecosystem. 26,556 newsletter subscribers at a 33% open rate and 12M organic views in 90 days.",
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
      "A Kaleidos transformou completamente minha presença digital. Assumiram roteiro, edição e criativo dos nossos lançamentos, e a operação passou a rodar com uma consistência que a gente não tinha.",
    quote_en:
      "Kaleidos completely transformed my digital presence. They took over scripting, editing and creative for our launches, and the operation started running with a consistency we did not have before.",
    caseLink: "/cases/bit-das-minas",
    highlight: "4+ lançamentos seguidos",
    highlight_en: "4+ consecutive launches",
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
      "A edição de vídeo da Kaleidos é outro nível. Eles entendem o ritmo, a narrativa e o que faz o algoritmo trabalhar a favor, sem tirar a profundidade do que eu quero dizer.",
    quote_en:
      "Kaleidos' video editing is next level. They understand the rhythm, the narrative and what makes the algorithm work in your favor, without stripping the depth out of what I want to say.",
    caseLink: "/cases/layla-foz",
    highlight: "Edição que preserva a profundidade",
    highlight_en: "Editing that keeps the depth",
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
      "18 meses de parceria com resultados consistentes. A Kaleidos cuidou do nosso conteúdo de Instagram, Twitter e LinkedIn e ajudou a construir uma comunidade engajada.",
    quote_en:
      "18 months of partnership with consistent results. Kaleidos handled our Instagram, Twitter and LinkedIn content and helped build an engaged community.",
    caseLink: "/cases/mercado-bitcoin",
    highlight: "18 meses de parceria",
    highlight_en: "18-month partnership",
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
