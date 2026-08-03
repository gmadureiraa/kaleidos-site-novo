export interface CaseData {
  id: string;
  nome: string;
  /** Marca cases que ainda estão em execução (ex: Crypto.com). Renderiza badge "Em andamento". */
  status?: "em-andamento";
  tags: string[];
  descricao: string;
  descricao_en?: string;
  fraseImpactante: string;
  fraseImpactante_en?: string;
  detalhes: string;
  detalhes_en?: string;
  depoimentos?: string;
  links: string[];
  externalLink?: string; // URL oficial do cliente (site / rede social) para CTA externo
  externalLabel?: string; // rótulo do CTA (ex: "Ver no site", "Ver no Instagram")
  externalLabel_en?: string;
  metricas: string;
  metricas_en?: string;
  servicos: string[];
  servicos_en?: string[];
  media: {
    src: string;
    type: "image" | "video" | "pdf";
    alt?: string;
    poster?: string; // URL para thumbnail do vídeo
    link?: string; // URL para link externo (ex: Instagram)
  }[];
  /** Vídeos longos do YouTube (embed lazy 16:9). Renderizados em seção própria no case-layout. */
  youtubeVideos?: {
    videoId: string;
    poster: string; // thumbnail local (1280x720)
    src?: string; // URL canônica watch (link "abrir no YouTube")
    title?: string;
    alt?: string;
  }[];
}
// Dados dos cases com todo o conteúdo disponível
export const casesData: Record<string, CaseData> = {
  "kaleidos": {
    id: "kaleidos",
    nome: "Kaleidos",
    tags: ["Agência", "Social Media", "Conteúdo", "Marketing Digital"],
    descricao: "O conteúdo institucional da própria Kaleidos no Instagram @digitalkaleidos: a agência aplicando em casa o mesmo método que usa nos clientes — marketing, design e conteúdo com intenção.",
    descricao_en: "Kaleidos' own institutional content on Instagram @digitalkaleidos: the agency applying at home the same method it uses for clients — marketing, design and content with intent.",
    fraseImpactante: "A agência praticando em casa o que entrega para os clientes.",
    fraseImpactante_en: "The agency practicing at home what it delivers for clients.",
    detalhes: "O Desafio\n\nUma agência de conteúdo precisa ser a melhor prova viva do próprio trabalho. O desafio do perfil @digitalkaleidos não é volume nem viralização: é coerência. Mostrar, em cada post, a forma de pensar da Kaleidos sobre marketing, design e produção de conteúdo, sem cair no clichê de agência que fala bonito e entrega genérico.\n\nNossa Estratégia\n\nEstruturamos a linha editorial do perfil em torno de ideias fortes e opinativas sobre o ofício: qualidade acima de quantidade, constância acima de perfeição, e marketing como algo que se faz em ambientes que a gente nem sempre controla. Cada peça é um recorte da mentalidade da agência, em formato de carrossel, reel ou estático.\n\n• Carrosséis editoriais com tese clara (qualidade vs quantidade, método de produção)\n• Reels mostrando o processo: planejamento de perfil de ponta a ponta (SEO, copy, web design, growth)\n• Estáticos de posicionamento: constância, foco em demanda real, antídoto à paralisia por análise\n• Voz institucional da Kaleidos, alinhada à marca e ao tom dos founders\n\nO Resultado\n\nUm perfil ainda jovem, mas com identidade editorial definida: cada post é autossuficiente como manifesto do jeito Kaleidos de trabalhar. É o portfólio aplicado à própria casa, servindo de vitrine de pensamento para quem chega buscando a agência.",
    detalhes_en: "The Challenge\n\nA content agency needs to be the living proof of its own work. The challenge of the @digitalkaleidos profile is not volume or virality: it's coherence. Showing, in every post, how Kaleidos thinks about marketing, design and content production, without falling into the cliché of an agency that talks beautifully and delivers generic.\n\nOur Strategy\n\nWe structured the profile's editorial line around strong, opinionated ideas about the craft: quality over quantity, consistency over perfection, and marketing as something done in environments we don't always control. Each piece is a slice of the agency's mindset, in carousel, reel or static format.\n\n• Editorial carousels with a clear thesis (quality vs quantity, production method)\n• Reels showing the process: end-to-end profile planning (SEO, copy, web design, growth)\n• Positioning statics: consistency, focus on real demand, an antidote to analysis paralysis\n• Kaleidos' institutional voice, aligned with the brand and the founders' tone\n\nThe Result\n\nA young profile, but with a defined editorial identity: each post stands on its own as a manifesto of the Kaleidos way of working. It's the portfolio applied to its own home, serving as a thought showcase for those who arrive looking for the agency.",
    depoimentos: "",
    links: ["https://kaleidos.com.br", "https://www.instagram.com/digitalkaleidos/"],
    externalLink: "https://www.instagram.com/digitalkaleidos/",
    externalLabel: "Ver no Instagram",
    externalLabel_en: "See on Instagram",
    metricas: "Conteúdo institucional próprio no Instagram\n\nO perfil @digitalkaleidos é a vitrine de pensamento da agência: opinião sobre o ofício, processo de produção e posicionamento, em carrosséis, reels e estáticos.\n\n• Carrosséis editoriais com tese (qualidade > quantidade, método de produção)\n• Reel de processo: planejamento de perfil ponta a ponta (SEO, copy, web design, growth)\n• Estáticos de posicionamento: constância, demanda real, foco antes da perfeição\n• Voz institucional consistente, alinhada à marca Kaleidos\n• Perfil recente: o valor está na qualidade editorial, não nos números",
    metricas_en: "Own institutional content on Instagram\n\nThe @digitalkaleidos profile is the agency's thought showcase: opinion on the craft, the production process and positioning, in carousels, reels and statics.\n\n• Editorial carousels with a thesis (quality > quantity, production method)\n• Process reel: end-to-end profile planning (SEO, copy, web design, growth)\n• Positioning statics: consistency, real demand, focus before perfection\n• Consistent institutional voice, aligned with the Kaleidos brand\n• Recent profile: the value is in editorial quality, not numbers",
    servicos: ["Social Media", "Conteúdo", "Design", "Copywriting", "Estratégia de conteúdo"],
    servicos_en: ["Social Media", "Content", "Design", "Copywriting", "Content strategy"],
    media: [
      // Reel — planejamento de perfil ponta a ponta (273 views)
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DXcoNNsiVjM-reel.mp4",
        type: "video",
        alt: "Reel Kaleidos — planejamento de perfil ponta a ponta (SEO, copy, web design, growth)",
        poster: "/Cases/kaleidos/conteudo/instagram/kld-DXcoNNsiVjM-capa.jpg",
        link: "https://www.instagram.com/reel/DXcoNNsiVjM/"
      },
      // Carrossel — qualidade > quantidade (4 slides)
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DXW65NFDnQ1-slide-01.jpg",
        type: "image",
        alt: "Carrossel Kaleidos — qualidade acima de quantidade (capa)",
        link: "https://www.instagram.com/p/DXW65NFDnQ1/"
      },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DXW65NFDnQ1-slide-02.jpg", type: "image", alt: "Carrossel Kaleidos — qualidade > quantidade (2/4)" },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DXW65NFDnQ1-slide-03.jpg", type: "image", alt: "Carrossel Kaleidos — qualidade > quantidade (3/4)" },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DXW65NFDnQ1-slide-04.jpg", type: "image", alt: "Carrossel Kaleidos — qualidade > quantidade (4/4)" },
      // Carrossel — marketing em ambientes que voce nao controla (3 slides)
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DXpL_NqDu4H-slide-01.jpg",
        type: "image",
        alt: "Carrossel Kaleidos — marketing em ambientes que voce nao controla (capa)",
        link: "https://www.instagram.com/p/DXpL_NqDu4H/"
      },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DXpL_NqDu4H-slide-02.jpg", type: "image", alt: "Carrossel Kaleidos — ambientes que voce nao controla (2/3)" },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DXpL_NqDu4H-slide-03.jpg", type: "image", alt: "Carrossel Kaleidos — ambientes que voce nao controla (3/3)" },
      // Carrossel — produzir conteudo com metodo (3 slides)
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DYP8NI9lVkv-slide-01.jpg",
        type: "image",
        alt: "Carrossel Kaleidos — produzir conteudo com metodo (capa)",
        link: "https://www.instagram.com/p/DYP8NI9lVkv/"
      },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DYP8NI9lVkv-slide-02.jpg", type: "image", alt: "Carrossel Kaleidos — conteudo com metodo (2/3)" },
      { src: "/Cases/kaleidos/conteudo/instagram/kld-DYP8NI9lVkv-slide-03.jpg", type: "image", alt: "Carrossel Kaleidos — conteudo com metodo (3/3)" },
      // Estaticos de posicionamento
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DXhq6g-lQko-slide-01.jpg",
        type: "image",
        alt: "Post Kaleidos — coisas que passamos ao trabalhar com marketing e design",
        link: "https://www.instagram.com/p/DXhq6g-lQko/"
      },
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DXzOKF2kQc0-slide-01.jpg",
        type: "image",
        alt: "Post Kaleidos — constancia acima de conteudo perfeito: apenas comece",
        link: "https://www.instagram.com/p/DXzOKF2kQc0/"
      },
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DX6-5emEX7U-slide-01.jpg",
        type: "image",
        alt: "Post Kaleidos — quando planejamento vira adiamento (paralisia por analise)",
        link: "https://www.instagram.com/p/DX6-5emEX7U/"
      },
      {
        src: "/Cases/kaleidos/conteudo/instagram/kld-DYFWcuwCu8j-slide-01.jpg",
        type: "image",
        alt: "Post Kaleidos — crescimento como metrica estetica versus demanda real",
        link: "https://www.instagram.com/p/DYFWcuwCu8j/"
      }
    ]
  },
  "defifest": {
    id: "defifest",
    nome: "Defifest",
    tags: ["Evento", "Cripto", "Design"],
    descricao: "Fizemos toda parte de visual do evento com diversos banners, cenas para transições entre palestras, pequenos motions e mais...",
    descricao_en: "We produced the entire visual identity of the event with banners, intermission scenes between talks, small motion pieces and more.",
    fraseImpactante: "O evento que revolucionou o DeFi brasileiro.",
    fraseImpactante_en: "The event that revolutionized Brazilian DeFi.",
    detalhes: "O Desafio\n\nO mercado DeFi brasileiro estava fragmentado, com eventos pequenos e desconectados. A comunidade precisava de um espaço unificado para educação, networking e crescimento conjunto. O desafio era criar um evento que não apenas educasse, mas que estabelecesse conexões duradouras entre os principais players do ecossistema.\n\nNossa Estratégia\n\nDesenvolvemos uma identidade visual completa que comunicasse inovação e profissionalismo. Criamos materiais que funcionassem tanto para marketing digital quanto para o ambiente físico do evento, garantindo consistência visual em todos os touchpoints.\n\n• Design System completo com paleta de cores e tipografia\n• Banners e materiais promocionais para redes sociais\n• Cenas de transição animadas para as palestras\n• Identidade visual para coffee breaks e networking\n• Materiais impressos para o evento presencial\n\nO Resultado\n\nDefifest 2025 se tornou o maior evento DeFi do Brasil, reunindo 600+ participantes em um dia completo de educação e networking. O evento contou com palestras de especialistas como Victor Castaneda, Mychel Mendes e Coruja Cripto, cobrindo temas como o futuro do Bitcoin, tributação cripto, DeFi em mercados de baixa e IA no setor.\n\nDestaques incluem networking com lunch, coffee breaks e happy hour all-inclusive, além de um show de encerramento com DJ renomado. O evento ocorreu em 7 de junho de 2025 no Clube Pinheiros, São Paulo, estabelecendo um novo padrão para eventos DeFi no Brasil.",
    detalhes_en: "The Challenge\n\nThe Brazilian DeFi market was fragmented, with small and disconnected events. The community needed a unified space for education, networking and joint growth. The challenge was to create an event that not only educated, but established lasting connections between the main players in the ecosystem.\n\nOur Strategy\n\nWe developed a complete visual identity that communicated innovation and professionalism. We created materials that worked for both digital marketing and the physical event environment, ensuring visual consistency across all touchpoints.\n\n• Complete Design System with color palette and typography\n• Banners and promotional materials for social media\n• Animated transition scenes for talks\n• Visual identity for coffee breaks and networking\n• Print materials for the in-person event\n\nThe Result\n\nDefifest 2025 became the largest DeFi event in Brazil, bringing together 600+ participants for a complete day of education and networking. The event featured talks by experts such as Victor Castaneda, Mychel Mendes and Coruja Cripto, covering topics like Bitcoin's future, crypto taxation, DeFi in bear markets and AI in the industry.\n\nHighlights included networking with lunch, coffee breaks and an all-inclusive happy hour, plus a closing show with a renowned DJ. Held on June 7, 2025 at Clube Pinheiros (São Paulo), it established a new standard for DeFi events in Brazil.",
    depoimentos: "Evento revolucionário que conectou a comunidade DeFi brasileira.",
    links: ["https://defiverso.com"],
    externalLink: "https://defiverso.com",
    externalLabel: "Ver o evento",
    externalLabel_en: "See the event",
    metricas: "600+ participantes\n\nO maior evento DeFi do Brasil em 2025, reunindo a elite da comunidade cripto brasileira para um dia completo de educação, networking e conexões estratégicas.\n\n• 600+ participantes presenciais\n• 15+ palestrantes especialistas\n• 8 horas de conteúdo educacional\n• 100% de satisfação dos participantes\n• 3x mais networking que eventos similares\n\nO evento estabeleceu um novo padrão para eventos DeFi no Brasil, combinando educação de alta qualidade com experiências memoráveis de networking.",
    metricas_en: "600+ attendees\n\nThe largest DeFi event in Brazil in 2025, bringing together the elite of the Brazilian crypto community for a complete day of education, networking and strategic connections.\n\n• 600+ in-person attendees\n• 15+ expert speakers\n• 8 hours of educational content\n• 100% participant satisfaction\n• 3x more networking than similar events\n\nThe event established a new standard for DeFi events in Brazil, combining high-quality education with memorable networking experiences.",
    servicos: ["Design", "Motion", "Edição de vídeo", "Copywriting"],
    servicos_en: ["Design", "Motion", "Video editing", "Copywriting"],
    media: [
      {
        src: "/Cases/investidor-4-20/conteudo/Palestrantes-Defifest-2025-Video-1.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Palestrantes-Defifest-2025-Video-1.jpg",
      },
    ]
  },
  "bit-das-minas": {
    id: "bit-das-minas",
    nome: "Bit das Minas",
    tags: ["Reels", "Roteiros"],
    descricao: "Trabalhamos com edição de vídeo, copywrite e roteiro para vídeos e para anuncios, fizemos mais de 4 lançamentos e trabalhamos para construção de reels para crescimento orgânico do perfil",
    descricao_en: "We worked on video editing, copywriting and scripts for videos and ads, did over 4 launches and built reels for organic growth.",
    fraseImpactante: "200% de aumento no faturamento dos lançamentos e diminuição de 50% de custo por lead.",
    fraseImpactante_en: "200% revenue increase in launches and 50% lower cost per lead.",
    detalhes: "O Desafio\n\nO mercado de educação em cripto no Brasil era dominado por conteúdo masculino e técnico, deixando muitas mulheres de fora. A Bit das Minas precisava criar uma abordagem única que fosse educativa, acessível e empoderadora para o público feminino, diferenciando-se da concorrência.\n\nNossa Estratégia\n\nDesenvolvemos uma estratégia de conteúdo multicanal focada em educação prática e empoderamento feminino. Criamos roteiros que transformavam conceitos complexos em linguagem acessível, sempre conectando o aprendizado com a realidade das mulheres brasileiras.\n\n• Roteiros educativos com linguagem acessível\n• Reels com dicas práticas e cases reais\n• Copywriting focado em empoderamento feminino\n• Estratégia de lançamentos com storytelling envolvente\n• Newsletter semanal com análises contextualizadas\n\nO Resultado\n\nMais de 4 lançamentos bem-sucedidos, incluindo cursos como 'Revolução Cripto' para iniciantes. O crescimento orgânico via reels educativos e dicas práticas resultou em uma comunidade engajada e fiel. A newsletter 'Bit News' com análises semanais se tornou referência no mercado.\n\nO projeto reforçou a missão de empoderamento feminino em cripto, criando um espaço seguro e educativo para mulheres que queriam aprender sobre investimentos digitais.",
    detalhes_en: "The Challenge\n\nThe Brazilian crypto education market was dominated by male and technical content, leaving many women out. Bit das Minas needed to create a unique approach that was educational, accessible and empowering for the female audience, differentiating itself from the competition.\n\nOur Strategy\n\nWe developed a multi-channel content strategy focused on practical education and female empowerment. We created scripts that transformed complex concepts into accessible language, always connecting learning with the reality of Brazilian women.\n\n• Educational scripts with accessible language\n• Reels with practical tips and real cases\n• Copywriting focused on female empowerment\n• Launch strategy with engaging storytelling\n• Weekly newsletter with contextualized analyses\n\nThe Result\n\nOver 4 successful launches, including beginner courses like 'Crypto Revolution'. Organic growth through educational reels and practical tips resulted in an engaged and loyal community. The 'Bit News' newsletter with weekly analyses became a market reference.\n\nThe project reinforced the mission of empowering women in crypto, creating a safe and educational space for women who wanted to learn about digital investments.",
    depoimentos: "Crescimento exponencial no faturamento e engajamento da comunidade.",
    links: ["https://www.instagram.com/bitdasminas/?hl=en", "https://apps.apple.com/us/app/bit-das-minas/id6476791912"],
    externalLink: "https://www.instagram.com/bitdasminas/?hl=en",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "200% de aumento no faturamento\n\nTransformamos a Bit das Minas em uma das principais referências de educação cripto para mulheres no Brasil, com resultados impressionantes em engajamento e conversão.\n\n• 200% de aumento no faturamento dos lançamentos\n• 50% de redução no custo por lead\n• 150+ vídeos editados para anúncios\n• 4+ lançamentos bem-sucedidos\n• Comunidade engajada com alta retenção\n\nA estratégia de conteúdo empoderador e educativo resultou em uma comunidade fiel e um crescimento sustentável, estabelecendo a Bit das Minas como líder no segmento feminino de educação cripto.",
    metricas_en: "200% revenue increase\n\nWe transformed Bit das Minas into one of the main crypto education references for women in Brazil, with impressive results in engagement and conversion.\n\n• 200% increase in launch revenue\n• 50% reduction in cost per lead\n• 150+ videos edited for ads\n• 4+ successful launches\n• Engaged community with high retention\n\nThe empowering and educational content strategy resulted in a loyal community and sustainable growth, establishing Bit das Minas as a leader in the female crypto education segment.",
    servicos: ["Edição de vídeo", "Copywriting", "Roteiro", "Lançamentos"],
    servicos_en: ["Video editing", "Copywriting", "Scripting", "Launches"],
    media: [
      { 
        src: "/Cases/bit-das-minas/conteudo/Reels-1-Gi-2.mp4", 
        type: "video", 
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-1-Gi-2.jpg"
      },
      {
        src: "/Cases/bit-das-minas/conteudo/Reels-3-Gi.mp4",
        type: "video",
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-3-Gi.jpg"
      },
      {
        src: "/Cases/bit-das-minas/conteudo/Reels-4-Gi.mp4",
        type: "video",
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-4-Gi.jpg"
      },
      {
        src: "/Cases/bit-das-minas/conteudo/Reels-5-Gi.mp4",
        type: "video",
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-5-Gi.jpg"
      },
      {
        src: "/Cases/bit-das-minas/conteudo/Reels-6-Gi.mp4",
        type: "video",
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-6-Gi.jpg"
      },
      {
        src: "/Cases/bit-das-minas/conteudo/Reels-7-Gi-1.mp4",
        type: "video",
        poster: "/Cases/bit-das-minas/conteudo/posters/Reels-7-Gi-1.jpg"
      },
    ]
  },
  "layla-foz": {
    id: "layla-foz",
    nome: "Layla Foz",
    tags: ["Influencer", "Vídeo", "Reels", "Copywriting", "Newsletter"],
    descricao: "Edição de vídeo e criação de newsletters",
    descricao_en: "Video editing and newsletter creation",
    fraseImpactante: "Mais de 20 milhões de views nos reels.",
    fraseImpactante_en: "Over 20 million views on Reels.",
    detalhes: "O Desafio\n\nLayla Foz já tinha uma audiência engajada, mas precisava de conteúdo que mantivesse sua profundidade intelectual enquanto se adaptava às demandas do algoritmo do Instagram. O desafio era preservar sua autenticidade e criatividade enquanto maximizava o alcance e engajamento.\n\nNossa Estratégia\n\nDesenvolvemos uma abordagem que combinava a profundidade do conteúdo de Layla com formatos otimizados para redes sociais. Criamos reels que mantinham sua essência criativa e intelectual, além de newsletters que nutriam sua audiência com conteúdo de qualidade.\n\n• Edição de vídeos que preserva a profundidade do conteúdo\n• Reels otimizados para engajamento e alcance\n• Newsletters para nutrição de audiência\n• Manutenção da autenticidade e criatividade\n• Foco na inovação e qualidade excepcional\n\nO Resultado\n\nConteúdos editados que mantiveram a profundidade e criatividade de Layla, incluindo reels para engajamento e newsletters para nutrição de audiência. A qualidade excepcional permitiu que ela focasse na inovação, elevando seu impacto em plataformas exigentes.\n\nO resultado foi um crescimento impressionante no Instagram, de 100 mil para 172 mil seguidores, com mais de 20 milhões de views nos reels, estabelecendo Layla como uma das principais criadoras de conteúdo intelectual do Brasil.",
    detalhes_en: "The Challenge\n\nLayla Foz already had an engaged audience, but needed content that maintained her intellectual depth while adapting to Instagram's algorithm demands. The challenge was to preserve her authenticity and creativity while maximizing reach and engagement.\n\nOur Strategy\n\nWe developed an approach that combined Layla's content depth with social media optimized formats. We created reels that maintained her creative and intellectual essence, plus newsletters that nurtured her audience with quality content.\n\n• Video editing that preserves content depth\n• Reels optimized for engagement and reach\n• Newsletters for audience nurturing\n• Maintaining authenticity and creativity\n• Focus on innovation and exceptional quality\n\nThe Result\n\nEdited content that preserved Layla's depth and creativity, including engagement reels and newsletters to nurture her audience. The exceptional quality enabled her to focus on innovation, boosting her impact on demanding platforms.\n\nThe result was impressive Instagram growth from 100k to 172k followers, with over 20 million views on reels, establishing Layla as one of Brazil's leading intellectual content creators.",
    depoimentos: "Crescimento impressionante no Instagram e engajamento massivo nos reels.",
    links: ["https://www.instagram.com/laylafoz/"],
    externalLink: "https://www.instagram.com/laylafoz",
    externalLabel: "Ver no Instagram",
    externalLabel_en: "See on Instagram",
    metricas: "20M+ views nos reels\n\nTransformamos o perfil da Layla Foz em uma das principais referências de conteúdo intelectual no Instagram brasileiro, com crescimento exponencial e engajamento massivo.\n\n• 20M+ views nos reels\n• Crescimento de 100k para 172k seguidores (+72%)\n• Engajamento massivo e consistente\n• Estabelecimento como referência intelectual\n• Qualidade excepcional mantida em todos os formatos\n\nA estratégia de preservar a profundidade do conteúdo enquanto otimizava para redes sociais resultou em um crescimento sustentável e uma audiência altamente engajada, consolidando Layla como uma das principais criadoras de conteúdo intelectual do Brasil.",
    metricas_en: "20M+ views on reels\n\nWe transformed Layla Foz's profile into one of the main intellectual content references on Brazilian Instagram, with exponential growth and massive engagement.\n\n• 20M+ views on reels\n• Growth from 100k to 172k followers (+72%)\n• Massive and consistent engagement\n• Establishment as intellectual reference\n• Exceptional quality maintained across all formats\n\nThe strategy of preserving content depth while optimizing for social media resulted in sustainable growth and a highly engaged audience, consolidating Layla as one of Brazil's leading intellectual content creators.",
    servicos: ["Edição de vídeos", "Roteiros de Reels", "Newsletter"],
    servicos_en: ["Video editing", "Reels scripting", "Newsletter"],
    media: [
      { src: "/Cases/layla-foz/conteudo/Capa_Reels1.webp", type: "image" },
      { src: "/Cases/layla-foz/conteudo/Capa_Reels2.webp", type: "image" },
      { src: "/Cases/layla-foz/conteudo/Capa_Reels3.webp", type: "image" },
      { src: "/Cases/layla-foz/conteudo/Capa_Reels4.webp", type: "image" },
      { 
        src: "/Cases/layla-foz/conteudo/Reels-1-Layla-1.mp4", 
        type: "video", 
        poster: "/Cases/layla-foz/conteudo/Capa_Reels1.webp"
      },
      { 
        src: "/Cases/layla-foz/conteudo/Reels-2-Layla-1.mp4", 
        type: "video", 
        poster: "/Cases/layla-foz/conteudo/Capa_Reels2.webp"
      },
      { 
        src: "/Cases/layla-foz/conteudo/Reels-3-Layla-1.mp4", 
        type: "video", 
        poster: "/Cases/layla-foz/conteudo/Capa_Reels3.webp"
      },
      { 
        src: "/Cases/layla-foz/conteudo/Reels-4-Layla.mp4", 
        type: "video", 
        poster: "/Cases/layla-foz/conteudo/Capa_Reels4.webp"
      },
    ]
  },
  "crypto-com": {
    id: "crypto-com",
    nome: "Crypto.com",
    status: "em-andamento",
    tags: ["Cripto", "Copywriting", "Criação de conteúdo"],
    descricao: "Criação de conteúdo para instagram e twitter para o perfil da crypto.com",
    descricao_en: "Content creation for Instagram and Twitter for Crypto.com’s profile",
    fraseImpactante: "210% de aumento nas curtidas em social media.",
    fraseImpactante_en: "210% increase in social media likes.",
    detalhes: "O Desafio\n\nA Crypto.com, uma das maiores exchanges globais, precisava de conteúdo que comunicasse simplicidade e segurança para o mercado brasileiro. O desafio era criar posts que educassem sobre criptomoedas de forma acessível, mantendo a credibilidade da marca internacional.\n\nNossa Estratégia\n\nDesenvolvemos uma estratégia de conteúdo multicanal focada em educação e engajamento. Criamos posts personalizados para Instagram e Twitter que explicavam conceitos complexos de forma simples, sempre alinhados com a visão de simplicidade e segurança da Crypto.com.\n\n• Conteúdo educativo sobre BTC, CRO e outras criptomoedas\n• Posts alinhados com a visão de simplicidade e segurança\n• Estratégia multicanal (Instagram e Twitter)\n• Linguagem acessível para o público brasileiro\n• Foco em educação e engajamento\n\nO Resultado\n\nConteúdos personalizados que impulsionaram significativamente o engajamento em Instagram e Twitter. Os posts sobre BTC, CRO e outras criptomoedas contribuíram para o crescimento da plataforma no Brasil, estabelecendo a Crypto.com como uma referência educativa no mercado cripto brasileiro.\n\nO resultado foi um aumento médio de mais de 210% nas curtidas em redes sociais, consolidando a presença da marca no mercado brasileiro.",
    detalhes_en: "The Challenge\n\nCrypto.com, one of the largest global exchanges, needed content that communicated simplicity and security to the Brazilian market. The challenge was to create posts that educated about cryptocurrencies in an accessible way, maintaining the credibility of the international brand.\n\nOur Strategy\n\nWe developed a multi-channel content strategy focused on education and engagement. We created personalized posts for Instagram and Twitter that explained complex concepts in simple ways, always aligned with Crypto.com's vision of simplicity and security.\n\n• Educational content about BTC, CRO and other cryptocurrencies\n• Posts aligned with simplicity and security vision\n• Multi-channel strategy (Instagram and Twitter)\n• Accessible language for Brazilian audience\n• Focus on education and engagement\n\nThe Result\n\nTailored content that significantly boosted engagement on Instagram and Twitter. Posts about BTC, CRO and other cryptocurrencies contributed to platform growth in Brazil, establishing Crypto.com as an educational reference in the Brazilian crypto market.\n\nThe result was an average increase of over 210% in social media likes, consolidating the brand's presence in the Brazilian market.",
    depoimentos: "",
    links: ["https://www.instagram.com/cryptocomofficial/?hl=en", "https://twitter.com/cryptocom"],
    externalLink: "https://crypto.com",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "210% de aumento nas curtidas\n\nTransformamos a presença digital da Crypto.com no Brasil, estabelecendo a marca como referência educativa no mercado cripto brasileiro com engajamento excepcional.\n\n• 210% de aumento nas curtidas em redes sociais\n• Estabelecimento como referência educativa\n• Crescimento significativo no engajamento\n• Consolidação da presença no mercado brasileiro\n• Conteúdo educativo de alta qualidade\n\nA estratégia de conteúdo educativo e acessível resultou em um engajamento massivo, consolidando a Crypto.com como uma das principais referências educativas sobre criptomoedas no Brasil.",
    metricas_en: "210% increase in likes\n\nWe transformed Crypto.com's digital presence in Brazil, establishing the brand as an educational reference in the Brazilian crypto market with exceptional engagement.\n\n• 210% increase in social media likes\n• Establishment as educational reference\n• Significant growth in engagement\n• Consolidation of presence in Brazilian market\n• High-quality educational content\n\nThe strategy of educational and accessible content resulted in massive engagement, consolidating Crypto.com as one of the main educational references about cryptocurrencies in Brazil.",
    servicos: ["Copywriting", "Criação de conteúdo"],
    servicos_en: ["Copywriting", "Content creation"],
    media: [
      { src: "/Cases/crypto-com/conteudo/crypto-com-1.png", type: "image" },
      { src: "/Cases/crypto-com/conteudo/crypto-com-2.png", type: "image" },
      { src: "/Cases/crypto-com/conteudo/crypto-com-3.png", type: "image" },
      { src: "/Cases/crypto-com/conteudo/crypto-com-4.png", type: "image" },
      { src: "/Cases/crypto-com/conteudo/crypto-com-5.png", type: "image" },
      { src: "/Cases/crypto-com/conteudo/crypto-com-6.png", type: "image" },
    ]
  },
  "jornal-cripto": {
    id: "jornal-cripto",
    nome: "Jornal Cripto",
    tags: ["Cripto", "Educação", "Design", "Desenvolvimento Web", "Marketing Digital"],
    descricao: "Participamos desde a criação da marca, construção de toda identidade visual, desenvolvimento de estratégia, captação, tráfego pago, criação de conteúdo orgânico e para anúncios pagos e desenvolvimento web.",
    descricao_en: "We participated from brand creation, full visual identity, strategy, acquisition, paid traffic, organic and paid content creation, and web development.",
    fraseImpactante: "6 posts automáticos por dia via n8n e crescimento exponencial da audiência.",
    fraseImpactante_en: "6 automated posts per day via n8n and exponential audience growth.",
    detalhes: "Participamos desde o zero na criação completa do Jornal Cripto. Desenvolvemos toda a identidade visual da marca, incluindo logo, paleta de cores e personagem principal. Criamos e implementamos a estratégia de marketing digital completa, desde captação de leads até retenção de audiência. Desenvolvemos três plataformas web: jornalcripto.com (site principal), news.jornalcripto.com (newsletter) e radar.jornalcripto.com (webapp para insights em tempo real). Implementamos automações via n8n para 6 blog posts diários e newsletters manuais 2x/semana. Gerenciamos campanhas de tráfego pago que impulsionaram significativamente a audiência. Criamos conteúdo orgânico e para anúncios pagos, estabelecendo o Jornal Cripto como referência no setor cripto brasileiro.",
    detalhes_en: "We built Jornal Cripto from scratch. We developed the entire visual identity including logo, color palette and main character. We implemented a complete digital marketing strategy from lead acquisition to audience retention. We developed three web platforms: jornalcripto.com (main site), news.jornalcripto.com (newsletter) and radar.jornalcripto.com (real‑time insights webapp). We set up n8n automations for 6 daily blog posts and 2 weekly manual newsletters. We managed paid traffic campaigns that significantly boosted the audience. We created organic and paid content, establishing Jornal Cripto as a reference in the Brazilian crypto sector.",
    depoimentos: "Projeto completo que transformou uma ideia em uma das principais referências do setor cripto no Brasil.",
    links: ["https://news.jornalcripto.com", "https://jornalcripto.com", "https://radar.jornalcripto.com"],
    externalLink: "https://jornalcripto.com",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "6 posts automáticos por dia\n\nConstruímos o Jornal Cripto do zero, transformando uma ideia em uma das principais referências do setor cripto no Brasil com automação e crescimento exponencial.\n\n• 6 posts automáticos diários via n8n\n• 2 newsletters semanais manuais\n• 3 plataformas web desenvolvidas\n• Crescimento exponencial da audiência\n• Posicionamento como referência no setor\n• Estratégia completa de marketing digital\n\nO projeto completo incluiu criação de marca, identidade visual, desenvolvimento web, estratégia de marketing, tráfego pago e automações, estabelecendo o Jornal Cripto como uma das principais referências educativas sobre criptomoedas no Brasil.",
    metricas_en: "6 automated posts per day\n\nWe built Jornal Cripto from scratch, transforming an idea into one of the main references in the Brazilian crypto sector with automation and exponential growth.\n\n• 6 daily automated posts via n8n\n• 2 weekly manual newsletters\n• 3 web platforms developed\n• Exponential audience growth\n• Positioning as sector reference\n• Complete digital marketing strategy\n\nThe complete project included brand creation, visual identity, web development, marketing strategy, paid traffic and automations, establishing Jornal Cripto as one of the main educational references about cryptocurrencies in Brazil.",
    servicos: ["Criação de marca", "Identidade visual", "Desenvolvimento web", "Estratégia de marketing", "Tráfego pago", "Criação de conteúdo", "Automações", "Newsletter", "Webapp"],
    servicos_en: ["Brand creation", "Visual identity", "Web development", "Marketing strategy", "Paid traffic", "Content creation", "Automations", "Newsletter", "Webapp"],
    media: [
      { src: "/Cases/jornal-cripto/conteudo/1-2.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/2-1.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/8.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/11-1.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/12.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/13-1.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/21-1.png", type: "image" },
      { src: "/Cases/jornal-cripto/conteudo/22.png", type: "image" },
    ]
  },
  "mercado-bitcoin": {
    id: "mercado-bitcoin",
    nome: "Mercado Bitcoin",
    tags: ["Cripto", "Social Media", "Design"],
    descricao: "Criação de conteúdo para rede social, criamos conteúdo para instagram, twitter e linkedin por 18 meses para os perfis do mercado bitcoin",
    descricao_en: "Social content creation: Instagram, Twitter and LinkedIn for 18 months for Mercado Bitcoin’s profiles.",
    fraseImpactante: "1.000+ posts em 18 meses, mais de 3 por dia útil.",
    fraseImpactante_en: "1,000+ posts in 18 months, more than 3 per business day.",
    detalhes: "Desenvolvemos e executamos uma estratégia completa de conteúdo para o Mercado Bitcoin durante 18 meses consecutivos. Criamos mais de 1.000 posts originais para Instagram, Twitter e LinkedIn, em um ritmo de mais de 3 publicações por dia útil, cobrindo temas como economia digital, legislação pró-cripto, análises de mercado e educação financeira. Nossos conteúdos foram alinhados à visão da plataforma de tornar o mercado cripto acessível ao público brasileiro, resultando em engajamento significativo e fortalecimento da presença digital da marca. O trabalho incluiu criação de copywriting, design de posts, estratégia de calendário editorial e análise de performance para otimização contínua.",
    detalhes_en: "We developed and executed a complete content strategy for Mercado Bitcoin for 18 consecutive months. We created over 1,000 original posts for Instagram, Twitter and LinkedIn, at a pace of more than 3 publications per business day, covering topics like digital economy, pro‑crypto legislation, market analysis and financial education. Our content aligned with the platform’s mission to make crypto accessible to Brazilians, resulting in significant engagement and a stronger digital presence. Work included copywriting, post design, editorial calendar strategy and performance analysis for continuous optimization.",
    depoimentos: "",
    links: ["https://www.mercadobitcoin.com.br/", "https://twitter.com/mercadobitcoin"],
    externalLink: "https://www.mercadobitcoin.com.br",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "1.000+ posts em 18 meses\n\nDesenvolvemos uma estratégia completa de conteúdo para o Mercado Bitcoin durante 18 meses consecutivos, fortalecendo significativamente a presença digital da maior exchange brasileira.\n\n• 1.000+ posts originais criados\n• Mais de 3 publicações por dia útil, de forma consistente\n• Estratégia multicanal (Instagram, Twitter, LinkedIn)\n• 18 meses de execução contínua\n• Engajamento significativo e crescimento sustentável\n\nA estratégia de conteúdo educativa e acessível resultou em um fortalecimento da presença digital da marca, consolidando o Mercado Bitcoin como referência em educação cripto no Brasil.",
    metricas_en: "1,000+ posts in 18 months\n\nWe developed a complete content strategy for Mercado Bitcoin for 18 consecutive months, significantly strengthening the digital presence of Brazil's largest exchange.\n\n• 1,000+ original posts created\n• More than 3 publications per business day, consistently\n• Multi-channel strategy (Instagram, Twitter, LinkedIn)\n• 18 months of continuous execution\n• Significant engagement and sustainable growth\n\nThe educational and accessible content strategy resulted in a strengthening of the brand's digital presence, consolidating Mercado Bitcoin as a reference in crypto education in Brazil.",
    servicos: ["Criação de conteúdo", "Instagram", "Twitter", "LinkedIn"],
    servicos_en: ["Content creation", "Instagram", "Twitter", "LinkedIn"],
    media: [
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram2.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram3.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram4.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram5.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram6.png", type: "image" },
      { src: "/Cases/mercado-bitcoin/conteudo/Instagram8.png", type: "image" },
    ]
  },
  "orlando": {
    id: "orlando",
    nome: "Orlando",
    tags: ["Cripto", "Educação", "Newsletter"],
    descricao: "Gestão completa da newsletter do Orlando por mais de um ano: pauta, redação, revisão e publicação recorrente de conteúdo educativo sobre o mercado cripto.",
    descricao_en: "Full management of Orlando's newsletter for over a year: agenda, writing, editing and recurring publishing of educational crypto-market content.",
    fraseImpactante: "Mais de um ano cuidando da newsletter, com publicação recorrente.",
    fraseImpactante_en: "Over a year running the newsletter, with consistent recurring publishing.",
    detalhes: "O Desafio\n\nO Orlando precisava de uma newsletter consistente para se relacionar com a audiência e se firmar como referência em educação cripto. Manter uma cadência recorrente sem perder qualidade editorial é onde a maioria dos projetos de newsletter trava: a entrega emperra na rotina, o conteúdo perde profundidade e a base esfria.\n\nNossa Estratégia\n\nAssumimos a operação completa da newsletter e cuidamos dela por mais de um ano. Estruturamos um processo editorial que garantia consistência na entrega e densidade no conteúdo, edição após edição.\n\n• Pauta e curadoria das principais notícias e movimentos do mercado cripto\n• Redação e revisão editorial de cada edição\n• Publicação recorrente, mantendo a cadência viva por mais de 12 meses\n• Foco em nutrição de audiência: relacionamento de longo prazo, não só envio\n• Linguagem acessível, transformando análise de mercado em conteúdo claro\n\nO Resultado\n\nUma newsletter rodando de forma consistente por mais de um ano, com a Kaleidos responsável por todo o ciclo editorial. A operação sustentou o relacionamento com a base e manteve o Orlando presente, de forma recorrente, na caixa de entrada da audiência cripto.",
    detalhes_en: "The Challenge\n\nOrlando needed a consistent newsletter to nurture his audience and cement himself as a reference in crypto education. Keeping a recurring cadence without losing editorial quality is where most newsletter projects stall: delivery breaks under routine, content loses depth and the list goes cold.\n\nOur Strategy\n\nWe took over the full newsletter operation and ran it for over a year. We built an editorial process that ensured both consistency of delivery and density of content, issue after issue.\n\n• Agenda and curation of the main crypto-market news and movements\n• Writing and editorial review of every issue\n• Recurring publishing, keeping the cadence alive for over 12 months\n• Focus on audience nurturing: long-term relationship, not just sending\n• Accessible language, turning market analysis into clear content\n\nThe Result\n\nA newsletter running consistently for over a year, with Kaleidos responsible for the entire editorial cycle. The operation sustained the relationship with the list and kept Orlando present, recurrently, in the inbox of the crypto audience.",
    depoimentos: "",
    links: [],
    metricas: "Newsletter gerida por mais de um ano\n\nCuidamos de todo o ciclo editorial da newsletter do Orlando, do começo ao fim, por mais de doze meses consecutivos.\n\n• Mais de um ano de gestão contínua da newsletter\n• Pauta, redação, revisão e publicação a cargo da Kaleidos\n• Cadência recorrente mantida edição após edição\n• Foco em nutrição de audiência e relacionamento de longo prazo\n• Conteúdo educativo sobre o mercado cripto em linguagem acessível",
    metricas_en: "Newsletter managed for over a year\n\nWe handled the entire editorial cycle of Orlando's newsletter, end to end, for more than twelve consecutive months.\n\n• Over a year of continuous newsletter management\n• Agenda, writing, editing and publishing handled by Kaleidos\n• Recurring cadence maintained issue after issue\n• Focus on audience nurturing and long-term relationship\n• Educational crypto-market content in accessible language",
    servicos: ["Newsletter", "Copywriting", "Estratégia de conteúdo", "Revisão editorial"],
    servicos_en: ["Newsletter", "Copywriting", "Content strategy", "Editorial review"],
    media: []
  },
  "yasmin": {
    id: "yasmin",
    nome: "Yasmin",
    tags: ["Influencer", "Reels"],
    descricao: "Edição de reels para criadora de conteúdo cripto.",
    descricao_en: "Reels editing for crypto content creator.",
    fraseImpactante: "Reels animados de educação cripto, editados com After Effects.",
    fraseImpactante_en: "Animated crypto-education reels, edited with After Effects.",
    detalhes: "O Desafio\n\nA Yasmin produz conteúdo de educação cripto para o Instagram. O desafio é manter o conteúdo claro e dinâmico, traduzindo conceitos do mercado em reels que prendem a atenção logo nos primeiros segundos.\n\nNossa Estratégia\n\nAssumimos a edição dos reels com técnicas de motion e animação no After Effects: textos animados, destaques visuais e ritmo pensado para retenção em formato vertical.\n\n• Edição de reels com motion e animação (After Effects)\n• Textos e elementos animados para reforçar a mensagem\n• Ritmo e cortes otimizados para retenção\n• Linguagem visual acessível para o público de cripto\n\nO Resultado\n\nUma série de reels editados com identidade visual consistente e animação, que dão clareza e dinamismo ao conteúdo cripto da Yasmin.",
    detalhes_en: "The Challenge\n\nYasmin creates crypto-education content for Instagram. The challenge is to keep the content clear and dynamic, translating market concepts into reels that grab attention in the first seconds.\n\nOur Strategy\n\nWe took over reel editing with motion and animation techniques in After Effects: animated text, visual highlights and pacing built for retention in vertical format.\n\n• Reel editing with motion and animation (After Effects)\n• Animated text and elements to reinforce the message\n• Pacing and cuts optimized for retention\n• Accessible visual language for the crypto audience\n\nThe Result\n\nA series of reels edited with consistent visual identity and animation, bringing clarity and dynamism to Yasmin's crypto content.",
    depoimentos: "",
    links: [],
    metricas: "Reels animados de educação cripto\n\nEdição de uma série de reels de educação cripto para o Instagram da Yasmin, com motion e animação.\n\n• Reels editados com After Effects (motion e animação)\n• Textos e elementos animados\n• Cortes e ritmo otimizados para retenção\n• Linguagem visual consistente entre as peças",
    metricas_en: "Animated crypto-education reels\n\nEditing a series of crypto-education reels for Yasmin's Instagram, with motion and animation.\n\n• Reels edited with After Effects (motion and animation)\n• Animated text and elements\n• Cuts and pacing optimized for retention\n• Consistent visual language across the pieces",
    servicos: ["Edição de reels", "Motion graphics", "Animação"],
    servicos_en: ["Reels editing", "Motion graphics", "Animation"],
    media: [
      { 
        src: "/Cases/yasmin/conteudo/Reels-1-Yasmin-1.mp4",
        type: "video",
        poster: "/Cases/yasmin/conteudo/posters/Reels-1-Yasmin-1.jpg"
      },
      {
        src: "/Cases/yasmin/conteudo/Reels-2-Yasmin-1.mp4",
        type: "video",
        poster: "/Cases/yasmin/conteudo/posters/Reels-2-Yasmin-1.jpg"
      },
      {
        src: "/Cases/yasmin/conteudo/Reels-3-Yasmin.mp4",
        type: "video",
        poster: "/Cases/yasmin/conteudo/posters/Reels-3-Yasmin.jpg"
      },
      {
        src: "/Cases/yasmin/conteudo/Reels-4-Yasmin.mp4",
        type: "video",
        poster: "/Cases/yasmin/conteudo/posters/Reels-4-Yasmin.jpg"
      },
      {
        src: "/Cases/yasmin/conteudo/Reels-5-Yasmin.mp4",
        type: "video",
        poster: "/Cases/yasmin/conteudo/posters/Reels-5-Yasmin.jpg"
      },
    ]
  },
  "investidor-4-20": {
    id: "investidor-4-20",
    nome: "Investidor 4.20",
    tags: ["Cripto", "Educação", "Influencer", "Lançamentos"],
    descricao: "10x de faturamento em 12 meses, puxado por quatro frentes: estruturação comercial, criação da newsletter do zero (30 mil inscritos), fortalecimento do e-mail marketing e teste e desenvolvimento de novos formatos. Somado a isso: edição de vídeo (Reels e YouTube), copywriter, automações com IA (n8n), nova estratégia de lançamento, criativos para anúncios em vídeo, estáticos e carrosséis, e participação contínua em lançamentos.",
    descricao_en: "10x revenue in 12 months, driven by four fronts: commercial structuring, building the newsletter from scratch (30k subscribers), strengthening email marketing, and testing and developing new formats. On top of that: video editing (Reels and YouTube), copywriting, AI automations (n8n), a new launch strategy, ad creatives in video, static and carousel formats, and ongoing launch participation.",
    fraseImpactante: "Faturamento 10x maior em 12 meses.",
    fraseImpactante_en: "10x revenue in 12 months.",
    detalhes: "Contexto\n\nO Investidor 4.20, liderado por Lucas Amendola, já era uma das principais referências em educação cripto no Brasil. A comunidade buscava escalar a produção de vídeos longos e curtos sem perder a profundidade técnica que sempre fez parte da marca.\n\nO Desafio\n\nManter a qualidade analítica enquanto ampliávamos a frequência e a viralidade do conteúdo. Precisávamos transformar análises complexas em formatos envolventes tanto para YouTube quanto para Shorts/Reels, garantindo performance nos algoritmos e retenção da audiência.\n\nNossa Abordagem\n\n**Edição de Vídeos Longos (YouTube):** Refinamos a narrativa visual dos vídeos semanais, com ritmo dinâmico, gráficos e elementos que simplificam conceitos avançados de mercado e DeFi.\n**Pílulas Virais (Shorts/Reels):** Criamos um formato proprietário de cortes com legendas dinâmicas, ganchos fortes e otimização de retenção, garantindo publicação diária e alcance orgânico constante.\n\nLançamentos e Estrutura Comercial\n\n• Desenvolvimento completo de criativos, roteiros e vídeos para tráfego pago.\n• Construção da jornada comercial (funil, narrativa, páginas de captura e follow-up).\n• Implementação de automações oficiais via API do WhatsApp para nutrição e grupos de comunidade.\n\nResultados do Lançamento\n\nA operação integrada de conteúdo, criativos e tecnologia permitiu executar lançamentos em escala, mantendo consistência de mensagem e conversão elevada durante todo o funil.\n\nConclusão\n\nO case reforça a nossa capacidade de transformar conteúdos de nicho em máquinas de crescimento. A estratégia 360º garantiu performance, escalabilidade e fortalecimento da comunidade Investidor 4.20 em todos os canais digitais.",
    detalhes_en: "Context\n\nInvestidor 4.20, led by Lucas Amendola, was already a top crypto education reference in Brazil. The community wanted to scale long-form and short-form production without losing the deep analysis that defines the brand.\n\nThe Challenge\n\nKeep analytical quality while increasing content frequency and virality. We needed to turn complex market insights into engaging formats for both YouTube and Shorts/Reels, securing algorithm performance and audience retention.\n\nOur Approach\n\n**Long-form Editing (YouTube):** We refined weekly videos with dynamic pacing, graphics and elements that simplify advanced market and DeFi concepts.\n**Viral Capsules (Shorts/Reels):** We created a proprietary cut format with dynamic captions, strong hooks and retention optimization, ensuring daily publishing and steady organic reach.\n\nLaunches and Commercial Structure\n\n• Full development of ad creatives, scripts and videos for paid traffic.\n• Funnel architecture: storytelling, capture pages and follow-up flows.\n• Official WhatsApp API automations for nurturing groups and community management.\n\nLaunch Outcomes\n\nThe integrated operation across content, creatives and technology enabled scalable launches with consistent messaging and high conversion throughout the funnel.\n\nConclusion\n\nThis case highlights our ability to turn niche expertise into growth machines. The 360º strategy delivered performance, scalability and a stronger Investidor 4.20 community across every channel.",
    depoimentos: "Nenhum específico, mas posts destacam crescimento.",
    links: ["https://twitter.com/investidor420", "https://www.instagram.com/lucas.amendolaa/", "https://news.defiverso.com"],
    externalLink: "https://www.youtube.com/@investidor4.20",
    externalLabel: "Ver no YouTube",
    externalLabel_en: "See on YouTube",
    metricas: "10x de faturamento em 12 meses\n\nTransformamos o Investidor 4.20 em uma das principais referências do setor cripto brasileiro, com crescimento exponencial em todos os canais e resultados comerciais excepcionais.\n\n• 10x de faturamento em 12 meses, puxado por estruturação comercial, criação da newsletter, fortalecimento do e-mail marketing e teste de novos formatos\n• Instagram: 50k → 180k seguidores (+260%)\n• YouTube: 200k → 382k inscritos (+91%)\n• Newsletter: 30k inscritos com 35% de abertura\n• 700+ criativos estáticos testados e 250+ vídeos testados\n• Estrutura comercial completa desenvolvida do zero\n\nA estratégia integrada de conteúdo, automações e lançamentos resultou em um crescimento extraordinário, estabelecendo o Investidor 4.20 como uma das principais referências no setor cripto brasileiro.",
    metricas_en: "10x revenue in 12 months\n\nWe transformed Investidor 4.20 into one of the main references in the Brazilian crypto sector, with exponential growth across all channels and exceptional commercial results.\n\n• 10x revenue in 12 months, driven by commercial structuring, newsletter creation, stronger email marketing and new format testing\n• Instagram: 50k → 180k followers (+260%)\n• YouTube: 200k → 382k subscribers (+91%)\n• Newsletter: 30k subscribers with 35% open rate\n• 700+ static creatives tested and 250+ videos tested\n• Complete commercial structure built from scratch\n\nThe integrated strategy of content, automations and launches resulted in extraordinary growth, establishing Investidor 4.20 as one of the main references in the Brazilian crypto sector.",
    servicos: ["Edição de vídeos", "Desenvolvimento comercial", "Newsletter", "Copywriter", "Automações IA", "Estratégias de lançamento", "Criativos para anúncios", "Páginas de captura", "Design"],
    servicos_en: ["Video editing", "Commercial development", "Newsletter", "Copywriting", "AI automations", "Launch strategies", "Ad creatives", "Capture pages", "Design"],
    media: [
      { 
        src: "/Cases/investidor-4-20/conteudo/Reels-1-Lucas-1.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-1-Lucas-1.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Reels-2-Lucas-1.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-2-Lucas-1.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Reels-3-Lucas.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-3-Lucas.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Reels-4-Lucas.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-4-Lucas.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Palestrantes-Defifest-2025-Video-1.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Palestrantes-Defifest-2025-Video-1.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Reels-6-Lucas.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-6-Lucas.jpg"
      },
      {
        src: "/Cases/investidor-4-20/conteudo/Reels-7-Lucas.mp4",
        type: "video",
        poster: "/Cases/investidor-4-20/conteudo/posters/Reels-7-Lucas.jpg"
      },
      // Reels virais do @lucas.amendolaa
      // "Ganhar em dólar mudou minha vida" (208.247 views / 6.377 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DZlGIGoRnew-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — ganhar em dólar todos os dias",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DZlGIGoRnew-capa.jpg",
        link: "https://www.instagram.com/reel/DZlGIGoRnew/"
      },
      // "Liberdade pela descentralização" (150.101 views / 6.348 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTi3Re1Eox--reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — liberdade pela descentralização",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTi3Re1Eox--capa.jpg",
        link: "https://www.instagram.com/reel/DTi3Re1Eox-/"
      },
      // "Eai, o que você faria?" (57.778 views / 1.289 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DOO62uUEvMu-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — o que você faria",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DOO62uUEvMu-capa.jpg",
        link: "https://www.instagram.com/reel/DOO62uUEvMu/"
      },
      // "O mundo já usa blockchain" (52.747 views / 2.047 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DO9ZQ2_kirU-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — o mundo já usa blockchain",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DO9ZQ2_kirU-capa.jpg",
        link: "https://www.instagram.com/reel/DO9ZQ2_kirU/"
      },
      // "A inflação age no silêncio" (25.769 views / 220 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTWArqxkhuK-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — a inflação age no silêncio",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTWArqxkhuK-capa.jpg",
        link: "https://www.instagram.com/reel/DTWArqxkhuK/"
      },
      // "Renda em dólar > renda em real" (28.506 views / 731 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTQy_Bbkkzo-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — foco no fundamento",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTQy_Bbkkzo-capa.jpg",
        link: "https://www.instagram.com/reel/DTQy_Bbkkzo/"
      },
      // "O próximo passo no mercado cripto" (13.190 views / 343 curtidas)
      {
        src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DaBYpV9xK7S-reel.mp4",
        type: "video",
        alt: "Reel Lucas Amendola — o próximo passo no mercado cripto",
        poster: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DaBYpV9xK7S-capa.jpg",
        link: "https://www.instagram.com/reel/DaBYpV9xK7S/"
      },
      {
        src: "/Cases/lucas-amendola/estudo/pagina-captura.png",
        type: "image",
        alt: "Página de captura desenvolvida para o lançamento Investidor 4.20"
      },
      { src: "/Cases/investidor-4-20/conteudo/Criativoanuncio1.webp", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/Criativoanuncio2.webp", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/Criativoanuncio3.webp", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/pagina-de-captura/paginacaptura1.png", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/pagina-de-captura/paginacaptura2.png", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/pagina-de-captura/paginacaptura4.png", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/pagina-de-captura/paginacaptura5.png", type: "image" },
      { src: "/Cases/investidor-4-20/conteudo/pagina-de-captura/paginacaptura13.png", type: "image" },
    ],
    youtubeVideos: [
      {
        videoId: "zButbYGl0qo",
        poster: "/Cases/_youtube-thumbs/lucas-yt-01.jpg",
        src: "https://www.youtube.com/watch?v=zButbYGl0qo",
        title: "O FED acaba de dar start no próximo ciclo de alta",
        alt: "Investidor 4.20 — vídeo longo: o FED e o próximo ciclo de alta"
      },
      {
        videoId: "S8eL_NN3G9c",
        poster: "/Cases/_youtube-thumbs/lucas-yt-02.jpg",
        src: "https://www.youtube.com/watch?v=S8eL_NN3G9c",
        title: "Comprar Bitcoin agora vai mudar sua vida",
        alt: "Investidor 4.20 — vídeo longo: comprar Bitcoin agora"
      }
    ]
  },
  "paradigma-education": {
    id: "paradigma-education",
    nome: "Paradigma Education",
    tags: ["Educação", "Vídeo", "Motion", "Animação", "Podcast"],
    descricao: "Edição de vídeo com motion, animação e cortes de podcast para conteúdo educativo",
    descricao_en: "Video editing with motion, animation and podcast cuts for educational content",
    fraseImpactante: "Vídeos educativos com motion e animação.",
    fraseImpactante_en: "Educational videos with motion and animation.",
    detalhes: "O Desafio\n\nA Paradigma Education precisava transformar conteúdo de podcast em vídeos educativos visualmente atrativos que engajassem a audiência. O desafio era criar materiais que fossem tanto informativos quanto visualmente impactantes, mantendo a qualidade educativa enquanto aumentava o engajamento.\n\nNossa Estratégia\n\nDesenvolvemos uma abordagem focada em motion graphics e animações personalizadas para transformar cortes de podcast em conteúdo visualmente atrativo. Utilizamos técnicas avançadas de edição e motion design para criar vídeos educativos que se destacassem e engajassem a audiência.\n\n• Edição avançada com motion graphics\n• Animações personalizadas para conteúdo educativo\n• Transformação de cortes de podcast em vídeos\n• Técnicas de motion design para engajamento\n• Foco em qualidade educativa e visual\n\nO Resultado\n\nDesenvolvimento de vídeos educativos com edição avançada, motion graphics e animações personalizadas. O trabalho focado em transformar cortes de podcast em conteúdo visualmente atrativo e educativo resultou em materiais que combinavam profundidade educativa com apelo visual.\n\nA estratégia de motion design e animações personalizadas resultou em vídeos educativos que se destacaram pela qualidade técnica e educacional, estabelecendo a Paradigma Education como referência em conteúdo educativo visual.",
    detalhes_en: "The Challenge\n\nParadigma Education needed to transform podcast content into visually appealing educational videos that would engage the audience. The challenge was to create materials that were both informative and visually impactful, maintaining educational quality while increasing engagement.\n\nOur Strategy\n\nWe developed an approach focused on motion graphics and custom animations to transform podcast cuts into visually appealing content. We used advanced editing and motion design techniques to create educational videos that would stand out and engage the audience.\n\n• Advanced editing with motion graphics\n• Custom animations for educational content\n• Transformation of podcast cuts into videos\n• Motion design techniques for engagement\n• Focus on educational and visual quality\n\nThe Result\n\nDevelopment of educational videos with advanced editing, motion graphics and custom animations. The work focused on transforming podcast cuts into visually appealing educational content resulted in materials that combined educational depth with visual appeal.\n\nThe strategy of motion design and custom animations resulted in educational videos that stood out for their technical and educational quality, establishing Paradigma Education as a reference in visual educational content.",
    depoimentos: "Nenhum depoimento específico encontrado, mas o conteúdo demonstra alta qualidade técnica e educacional.",
    links: [],
    metricas: "Vídeos educativos com motion e animação\n\nTransformamos conteúdo de podcast em vídeos educativos visualmente atrativos através de motion graphics e animações personalizadas, estabelecendo a Paradigma Education como referência em conteúdo educativo visual.\n\n• Vídeos educativos com motion graphics avançados\n• Animações personalizadas para engajamento\n• Transformação de cortes de podcast em vídeos\n• Qualidade técnica e educacional excepcional\n• Estabelecimento como referência em conteúdo educativo visual\n\nA estratégia de motion design e animações personalizadas resultou em vídeos educativos que se destacaram pela qualidade técnica e educacional, estabelecendo a Paradigma Education como uma das principais referências em conteúdo educativo visual no Brasil.",
    metricas_en: "Educational videos with motion and animation\n\nWe transformed podcast content into visually appealing educational videos through motion graphics and custom animations, establishing Paradigma Education as a reference in visual educational content.\n\n• Educational videos with advanced motion graphics\n• Custom animations for engagement\n• Transformation of podcast cuts into videos\n• Exceptional technical and educational quality\n• Establishment as reference in visual educational content\n\nThe strategy of motion design and custom animations resulted in educational videos that stood out for their technical and educational quality, establishing Paradigma Education as one of the main references in visual educational content in Brazil.",
    servicos: ["Edição de vídeo", "Motion Graphics", "Animação", "Cortes de Podcast"],
    servicos_en: ["Video editing", "Motion graphics", "Animation", "Podcast cuts"],
    media: [
      { 
        src: "/Cases/paradigma/conteudo/20250620_PARADIGMA_01M06S_V3.mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/20250620_PARADIGMA_01M06S_V3.jpg"
      },
      {
        src: "/Cases/paradigma/conteudo/20250702_PARADIGMA_01M13S.mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/20250702_PARADIGMA_01M13S.jpg"
      },
      {
        src: "/Cases/paradigma/conteudo/PARADIGMAv2.mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/PARADIGMAv2.jpg"
      },
      {
        src: "/Cases/paradigma/conteudo/20250717_PARADIGMA_01M20S_V2(1).mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/20250717_PARADIGMA_01M20S_V2-1.jpg"
      },
      {
        src: "/Cases/paradigma/conteudo/20250722_PARADIGMA_01M55S_V2(1).mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/20250722_PARADIGMA_01M55S_V2-1.jpg"
      },
      {
        src: "/Cases/paradigma/conteudo/20250801_PARADIGMA_00M40S_V1(1).mp4",
        type: "video",
        poster: "/Cases/paradigma/conteudo/posters/20250801_PARADIGMA_00M40S_V1-1.jpg"
      },
    ]
  },
  "defiverso": {
    id: "defiverso",
    nome: "Defiverso",
    tags: ["Cripto", "Educação", "Social Media", "Marketing de Conteúdo", "Geração de Leads", "Automação"],
    descricao: "Acelerando o Universo Cripto com Conteúdo Estratégico e Máquina de Leads. Desde junho de 2025, gestão completa da estratégia de marketing de conteúdo e aquisição de leads do Defiverso.",
    descricao_en: "Accelerating the Crypto Universe with Strategic Content and Lead Generation Machine. Since June 2025, complete management of Defiverso's content marketing strategy and lead acquisition.",
    fraseImpactante: "29.000+ inscrições no Minicurso, 26.554 assinantes na Newsletter e 12 Milhões de visualizações orgânicas em 90 dias.",
    fraseImpactante_en: "29,000+ course enrollments, 26,554 newsletter subscribers and 12 Million organic views in 90 days.",
    detalhes: "Desde junho de 2025, a Kaleidos assumiu a gestão completa da estratégia de marketing de conteúdo e aquisição de leads do Defiverso. O objetivo central foi estabelecer a marca como a **maior plataforma educacional cripto do Brasil**, transformando informações complexas de mercado em conteúdo acessível, de alto valor e que gerasse resultados concretos.\n\nNossa atuação se concentrou em três frentes principais:\n\n**1. Social Media (Instagram & Twitter):** Criação de conteúdo educativo de ponta, desenvolvimento de identidade visual e gestão completa do Instagram, com foco em crescimento orgânico. Implementação de um fluxo de automação via IA para o Twitter, garantindo presença constante e direcionamento de tráfego.\n\n**2. Email Marketing & Geração de Leads:** Criação da newsletter do zero e desenvolvimento de um **Minicurso de 7 Dias** como *lead magnet* de alta conversão.\n\n**3. Suporte a Lançamentos:** Colaboração na criação de **criativos estáticos e carrosséis** para campanhas de tráfego pago, otimizando a performance das mídias.",
    detalhes_en: "Since June 2025, Kaleidos has taken complete management of Defiverso's content marketing strategy and lead acquisition. The central goal was to establish the brand as Brazil's largest crypto education platform, transforming complex market information into accessible, high-value content that generates concrete results.\n\nOur work focused on three main fronts:\n\n**1. Social Media (Instagram & Twitter):** Creation of cutting-edge educational content, visual identity development and complete Instagram management, focusing on organic growth. Implementation of an AI-powered automation flow for Twitter, ensuring constant presence and traffic direction.\n\n**2. Email Marketing & Lead Generation:** Newsletter creation from scratch and development of a **7-Day Mini Course** as a high-converting lead magnet.\n\n**3. Launch Support:** Collaboration in creating **static creatives and carousels** for paid traffic campaigns, optimizing media performance.",
    depoimentos: "A parceria Kaleidos e Defiverso resultou na criação de um ecossistema de marketing digital completo e de alta performance.",
    links: ["https://defiverso.com", "https://news.defiverso.com", "https://www.instagram.com/defiverso/"],
    externalLink: "https://defiverso.com",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "**Máquina de Aquisição de Leads - Email Marketing:**\n\n• **Mais de 29.000 inscrições** no Minicurso \"7 Dias DeFi\"\n• **26.554 assinantes ativos** da Newsletter\n• **Taxa de Abertura Média de 33.01%** (muito acima da média do mercado de 15-25%)\n• **Taxa de Abertura do Minicurso no pico: 54.76%**\n• **Taxa de Cliques (CTR) do Minicurso no pico: 24.55%**\n\n**Construção de Audiência - Instagram (90 dias):**\n\n• **12 Milhões de Visualizações** de Alcance Orgânico\n• **Crescimento de 28,4%** no Alcance Orgânico\n• **302.9 Mil contas** de Alcance Total\n• **136.9 Mil interações** com conteúdo (curtidas, comentários, salvos e compartilhamentos)\n• **14.4 Mil cliques no link** (tráfego qualificado)\n• **8.6 Mil novos seguidores** em apenas 3 meses\n\n**Otimização de Processos:**\n\n• Automação no Twitter via IA para presença constante\n• Criação de criativos estáticos e carrosséis para tráfego pago\n\nEstes resultados concretos demonstram a capacidade da Kaleidos de entregar não apenas conteúdo de qualidade, mas também **crescimento sustentável e conversão em escala** para o Defiverso.",
    metricas_en: "**Lead Generation Machine - Email Marketing:**\n\n• **Over 29,000 enrollments** in the \"7 Days DeFi\" Mini Course\n• **26,554 active subscribers** to the Newsletter\n• **Average Open Rate of 33.01%** (well above market average of 15-25%)\n• **Mini Course Peak Open Rate: 54.76%**\n• **Mini Course Peak Click-Through Rate (CTR): 24.55%**\n\n**Audience Building - Instagram (90 days):**\n\n• **12 Million Organic Reach** views\n• **28.4% growth** in Organic Reach\n• **302.9 Thousand accounts** of Total Reach\n• **136.9 Thousand interactions** with content (likes, comments, saves and shares)\n• **14.4 Thousand link clicks** (qualified traffic)\n• **8.6 Thousand new followers** in just 3 months\n\n**Process Optimization:**\n\n• Twitter automation via AI for constant presence\n• Creation of static creatives and carousels for paid traffic\n\nThese concrete results demonstrate Kaleidos' ability to deliver not only quality content, but also **sustainable growth and scale conversion** for Defiverso.",
    servicos: ["Design posts", "Instagram Defiverso", "Newsletter Defiverso", "Curso 7 dias DeFi", "Twitter", "Resultados gerais"],
    servicos_en: ["Design posts", "Instagram Defiverso", "Newsletter Defiverso", "7 Days DeFi Course", "Twitter", "General results"],
    media: [
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-1.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-2.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-3.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-4.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-5.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/posts-defiverso.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/posts-defiverso-1.png", type: "image" },
      { src: "/Cases/defiverso/conteudo/posts-defiverso-2.png", type: "image" },
      // Carrossel — "O próximo ciclo de alta" (350 curtidas / 2 comentários) — 7 slides
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-01.jpg",
        type: "image",
        alt: "Carrossel Defiverso — o próximo ciclo de alta (capa)",
        link: "https://www.instagram.com/p/DYM_0kqkXgl/"
      },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-02.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (2/7)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-03.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (3/7)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-04.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (4/7)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-05.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (5/7)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-06.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (6/7)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-07.jpg", type: "image", alt: "Carrossel Defiverso — próximo ciclo (7/7)" },
      // Carrossel — "8 motivos sobre o Bitcoin" (248 curtidas / 7 comentários) — 10 slides
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-01.jpg",
        type: "image",
        alt: "Carrossel Defiverso — 8 motivos sobre o Bitcoin (capa)",
        link: "https://www.instagram.com/p/DU8ZciOkcLo/"
      },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-02.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (2/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-03.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (3/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-04.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (4/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-05.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (5/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-06.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (6/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-07.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (7/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-08.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (8/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-09.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (9/10)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-10.jpg", type: "image", alt: "Carrossel Defiverso — 8 motivos (10/10)" },
      // Carrossel — "Resumo semanal: BTC nos $80k" (159 curtidas / 2 comentários) — 8 slides
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg",
        type: "image",
        alt: "Carrossel Defiverso — resumo semanal cripto (capa)",
        link: "https://www.instagram.com/p/DYFTrH5jGL9/"
      },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-02.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (2/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-03.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (3/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-04.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (4/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-05.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (5/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-06.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (6/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-07.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (7/8)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-08.jpg", type: "image", alt: "Carrossel Defiverso — resumo semanal (8/8)" },
      // Carrossel — "Quem é Satoshi Nakamoto" (64 curtidas / 4 comentários) — 9 slides
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-01.jpg",
        type: "image",
        alt: "Carrossel Defiverso — quem é Satoshi Nakamoto (capa)",
        link: "https://www.instagram.com/p/DXeZ4I2EYiE/"
      },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-02.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (2/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-03.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (3/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-04.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (4/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-05.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (5/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-06.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (6/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-07.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (7/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-08.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (8/9)" },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-09.jpg", type: "image", alt: "Carrossel Defiverso — Satoshi (9/9)" },
      // Carrossel — "SpaceX e o impacto no mercado" (116 curtidas / 11 comentários) — 2 slides
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DZ7VRWKESte-slide-01.jpg",
        type: "image",
        alt: "Carrossel Defiverso — SpaceX e o mercado (capa)",
        link: "https://www.instagram.com/p/DZ7VRWKESte/"
      },
      { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DZ7VRWKESte-slide-02.jpg", type: "image", alt: "Carrossel Defiverso — SpaceX (2/2)" },
      // Reel — origem da palavra "salário" (1.331 views / 46 curtidas)
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWR70VJEZ55-reel.mp4",
        type: "video",
        alt: "Reel Defiverso — a origem da palavra salário",
        poster: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWR70VJEZ55-capa.jpg",
        link: "https://www.instagram.com/reel/DWR70VJEZ55/"
      },
      // Reel — o surgimento do Bitcoin em 2008 (1.969 views / 35 curtidas)
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWFG0_kCUuF-reel.mp4",
        type: "video",
        alt: "Reel Defiverso — o nascimento do Bitcoin",
        poster: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWFG0_kCUuF-capa.jpg",
        link: "https://www.instagram.com/reel/DWFG0_kCUuF/"
      },
      // Reel — Nixon e o fim do padrão-ouro, 1971 (2.936 views / 88 curtidas)
      {
        src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU3yifAEYzs-reel.mp4",
        type: "video",
        alt: "Reel Defiverso — 1971, o fim do padrão-ouro",
        poster: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU3yifAEYzs-capa.jpg",
        link: "https://www.instagram.com/reel/DU3yifAEYzs/"
      },
      // Defifest 2025 — evento presencial do ecossistema Defiverso
      {
        src: "/Cases/investidor-4-20/conteudo/Palestrantes-Defifest-2025-Video-1.mp4",
        type: "video",
        alt: "Defifest 2025 — palestrantes do evento Defiverso",
        poster: "/Cases/investidor-4-20/conteudo/posters/Palestrantes-Defifest-2025-Video-1.jpg",
      },
      // Newsletter Defiverso (Beehiiv) — capa de cada edicao, clicavel: abre a publicacao real.
      {
        src: "/Cases/defiverso/conteudo/news/news-privacidade-cripto.webp",
        type: "image",
        alt: "Newsletter Defiverso — Como comprar, usar e movimentar cripto com mais privacidade",
        link: "https://news.defiverso.com/p/como-comprar-usar-e-movimentar-cripto-com-mais-privacidade"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-fundo-bitcoin.webp",
        type: "image",
        alt: "Newsletter Defiverso — Qual sera o preco do fundo do Bitcoin?",
        link: "https://news.defiverso.com/p/qual-sera-o-preco-do-fundo-do-bitcoin"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-4-meses-bitcoin-barato.webp",
        type: "image",
        alt: "Newsletter Defiverso — Voce tem 4 meses para comprar Bitcoin barato",
        link: "https://news.defiverso.com/p/voce-tem-4-meses-para-comprar-bitcoin-barato"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-claude-cripto.webp",
        type: "image",
        alt: "Newsletter Defiverso — Como usar o Claude para ganhar no mercado cripto do jeito certo",
        link: "https://news.defiverso.com/p/como-usar-o-claude-para-ganhar-no-mercado-cripto-do-jeito-certo"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-narrativa-subestimada.webp",
        type: "image",
        alt: "Newsletter Defiverso — A narrativa mais subestimada do mercado cripto e como se expor a ela",
        link: "https://news.defiverso.com/p/a-narrativa-mais-subestimada-do-mercado-cripto-e-como-se-expor-a-ela"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-mudanca-no-fed.webp",
        type: "image",
        alt: "Newsletter Defiverso — A mudanca no Fed que quase ninguem esta prestando atencao",
        link: "https://news.defiverso.com/p/a-mudanc-a-no-fed-que-quase-ningue-m-esta-prestando-atenc-a-o"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-bitcoin-ethereum-explicados.webp",
        type: "image",
        alt: "Newsletter Defiverso — Bitcoin e Ethereum explicados: as diferencas que todo investidor precisa entender",
        link: "https://news.defiverso.com/p/bitcoin-e-ethereum-explicados-as-diferen-as-que-todo-investidor-cripto-precisa-entender"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-maior-risco-vindo.webp",
        type: "image",
        alt: "Newsletter Defiverso — O mercado esta ignorando o maior risco que esta vindo",
        link: "https://news.defiverso.com/p/o-mercado-esta-ignorando-o-maior-risco-que-esta-vindo"
      },
      {
        src: "/Cases/defiverso/conteudo/news/news-computacao-quantica-bitcoin.webp",
        type: "image",
        alt: "Newsletter Defiverso — A computacao quantica vai destruir o Bitcoin?",
        link: "https://news.defiverso.com/p/a-computac-a-o-qua-ntica-vai-destruir-o-bitcoin"
      },
    ]
  },
  "ledger": {
    id: "ledger",
    nome: "Ledger",
    tags: ["Cripto", "Hardware", "Design"],
    descricao: "Criação de banners, criativos para display ads e materiais visuais para a campanha de Black Friday da Ledger em portais cripto brasileiros.",
    descricao_en: "Banner creation, display ad creatives and visual assets for Ledger's Black Friday campaign across Brazilian crypto portals.",
    fraseImpactante: "Campanha Black Friday para a maior marca de hardware wallets do mundo.",
    fraseImpactante_en: "Black Friday campaign for the world's leading hardware wallet brand.",
    detalhes: "O Desafio\n\nA Ledger precisava de uma campanha de Black Friday direcionada ao público cripto brasileiro. O objetivo era promover o Ledger Nano X com 50% de desconto e cashback em Bitcoin, veiculando em portais como Portal do Bitcoin e outros canais do ecossistema cripto nacional.\n\nNossa Abordagem\n\nDesenvolvemos um pacote completo de criativos para a campanha:\n\n• **Brainstorm e direção criativa:** Estudo da identidade visual Ledger (tipografia, paleta preta/laranja, fotografia de produto) e adaptação para o mercado brasileiro.\n• **Banners para portais:** Formatos leaderboard, rectangle e skyscraper otimizados para os principais portais cripto do Brasil.\n• **Criativos para display ads:** Peças com foco em conversão — destaque para o desconto de 50%, cashback em BTC e urgência da Black Friday.\n• **Adaptações por formato:** Banners horizontais para header de portais, verticais para sidebar, e peças quadradas para redes sociais.\n\nO Resultado\n\nEntregamos mais de 25 peças criativas em múltiplos formatos, todas alinhadas com o brand guideline da Ledger e otimizadas para conversão no mercado brasileiro. A campanha cobriu os principais portais do ecossistema cripto nacional durante o período de Black Friday.",
    detalhes_en: "The Challenge\n\nLedger needed a Black Friday campaign targeting the Brazilian crypto audience. The goal was to promote the Ledger Nano X at 50% off with Bitcoin cashback, running across portals like Portal do Bitcoin and other channels in the national crypto ecosystem.\n\nOur Approach\n\nWe developed a complete creative package for the campaign:\n\n• **Brainstorm and creative direction:** Study of Ledger's visual identity (typography, black/orange palette, product photography) and adaptation for the Brazilian market.\n• **Portal banners:** Leaderboard, rectangle and skyscraper formats optimized for Brazil's top crypto portals.\n• **Display ad creatives:** Conversion-focused pieces highlighting the 50% discount, BTC cashback and Black Friday urgency.\n• **Format adaptations:** Horizontal banners for portal headers, vertical for sidebars, and square pieces for social media.\n\nThe Result\n\nWe delivered 25+ creative pieces across multiple formats, all aligned with Ledger's brand guidelines and optimized for conversion in the Brazilian market. The campaign covered the main portals of the national crypto ecosystem during the Black Friday period.",
    depoimentos: "",
    links: ["https://www.ledger.com"],
    externalLink: "https://www.ledger.com",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "25+ criativos entregues\n\nCampanha completa de Black Friday para a Ledger no mercado brasileiro.\n\n• 25+ peças criativas em múltiplos formatos\n• Banners para portais cripto (Portal do Bitcoin e outros)\n• Display ads otimizados para conversão\n• Formatos: leaderboard, rectangle, skyscraper, social\n• Alinhamento total com brand guidelines Ledger\n• Cobertura nos principais portais do ecossistema cripto brasileiro",
    metricas_en: "25+ creatives delivered\n\nComplete Black Friday campaign for Ledger in the Brazilian market.\n\n• 25+ creative pieces across multiple formats\n• Banners for crypto portals (Portal do Bitcoin and others)\n• Display ads optimized for conversion\n• Formats: leaderboard, rectangle, skyscraper, social\n• Full alignment with Ledger brand guidelines\n• Coverage across Brazil's main crypto ecosystem portals",
    servicos: ["Design", "Banners", "Display Ads", "Direção Criativa"],
    servicos_en: ["Design", "Banners", "Display Ads", "Creative Direction"],
    media: [
      // Banners de Black Friday — 5 campanhas, formato largo (criativo), exibidos inteiros (sem corte).
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-ate-50-1600x360.webp", type: "image", alt: "Banner Ledger Black Friday: ate 50% de desconto e bonus em BTC" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-ganhe-90-btc-1600x360.webp", type: "image", alt: "Banner Ledger Black Friday: ganhe ate $90 em BTC" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-cashback-btc-1600x360.webp", type: "image", alt: "Banner Ledger Black Friday: cashback em BTC nas Stax e Flex" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-evolucao-metade-1600x360.webp", type: "image", alt: "Banner Ledger Black Friday: evolucao pela metade do preco" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-nano-x-50-1600x360.webp", type: "image", alt: "Banner Ledger Black Friday: Ledger Nano X com 50% de desconto" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-ate-50-860x360.webp", type: "image", alt: "Banner Ledger Black Friday (formato medio): ate 50% e bonus em BTC" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-cashback-btc-860x360.webp", type: "image", alt: "Banner Ledger Black Friday (formato medio): cashback em BTC" },
      { src: "/Cases/ledger/conteudo/black-friday/ledger-bf-evolucao-metade-860x360.webp", type: "image", alt: "Banner Ledger Black Friday (formato medio): evolucao pela metade do preco" },
      // Criativos originais da campanha.
      { src: "/Cases/ledger/conteudo/ledger-03.png", type: "image", alt: "Criativo Ledger Black Friday" },
      { src: "/Cases/ledger/conteudo/ledger-05.png", type: "image", alt: "Criativo Ledger Black Friday" },
      { src: "/Cases/ledger/conteudo/ledger-07.png", type: "image", alt: "Criativo Ledger Black Friday" },
      { src: "/Cases/ledger/conteudo/ledger-10.png", type: "image", alt: "Criativo Ledger Black Friday" },
      { src: "/Cases/ledger/conteudo/ledger-15.png", type: "image", alt: "Criativo Ledger Black Friday" },
      { src: "/Cases/ledger/conteudo/ledger-20.png", type: "image", alt: "Criativo Ledger Black Friday" },
    ]
  },
  "neobankless": {
    id: "neobankless",
    nome: "Neobankless",
    tags: ["Cripto", "Fintech", "Vídeo", "Site", "Social Media"],
    descricao: "Desenvolvimento do site neobankless.com, produção de vídeos de manifesto e estratégia de conteúdo para Instagram da fintech cripto-nativa.",
    descricao_en: "Built neobankless.com, produced manifesto videos and Instagram content strategy for the crypto-native fintech.",
    fraseImpactante: "Site, vídeos e conteúdo para a fintech cripto-nativa do Brasil.",
    fraseImpactante_en: "Website, videos and content for Brazil's crypto-native fintech.",
    detalhes: "O Desafio\n\nA Neobankless é uma fintech cripto-nativa de dólar digital num mercado onde a maioria das pessoas ainda associa cripto a especulação, não a uma ferramenta prática para dolarizar patrimônio e fugir de IOF e spread bancário. Era preciso explicar produto e benefício de forma clara, sem jargão, e construir presença consistente no Instagram.\n\nNossa Estratégia\n\nDesenvolvemos o site institucional neobankless.com, produzimos vídeos de manifesto cinematográficos (em versão horizontal e vertical) e estruturamos a operação de conteúdo do Instagram, com foco em carrosséis educativos e reels de manifesto.\n\n• Site institucional neobankless.com\n• Vídeos de manifesto em formato horizontal e vertical\n• Carrosséis educativos: cartão sem IOF, dolarização, cashback, custo invisível de anunciar\n• Reels de marca, ancorados na ideia de liberdade financeira\n• Linguagem direta, traduzindo um produto cripto em benefício concreto\n\nO Resultado\n\nUma base de conteúdo que explica o produto e diferencia a NBS: os carrosséis educativos puxam o engajamento mais qualificado (o de melhor desempenho, sobre o cartão, passou de 100 curtidas), enquanto o reel de manifesto sobre liberdade financeira é a peça de maior engajamento do perfil.",
    detalhes_en: "The Challenge\n\nNeobankless is a crypto-native digital-dollar fintech in a market where most people still associate crypto with speculation, not with a practical tool to dollarize savings and escape IOF tax and bank spreads. The product and its benefit had to be explained clearly, without jargon, while building a consistent Instagram presence.\n\nOur Strategy\n\nWe built the neobankless.com institutional website, produced cinematic manifesto videos (horizontal and vertical versions) and structured the Instagram content operation, focused on educational carousels and manifesto reels.\n\n• neobankless.com institutional website\n• Manifesto videos in horizontal and vertical formats\n• Educational carousels: card with no IOF, dollarization, cashback, the invisible cost of advertising\n• Brand reels anchored on the idea of financial freedom\n• Direct language, turning a crypto product into a concrete benefit\n\nThe Result\n\nA content base that explains the product and differentiates NBS: the educational carousels drive the most qualified engagement (the best one, about the card, passed 100 likes), while the manifesto reel about financial freedom is the profile's highest-engagement piece.",
    depoimentos: "",
    links: ["https://neobankless.com", "https://www.instagram.com/neobankless/"],
    externalLink: "https://neobankless.com",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "Site, vídeos e conteúdo educativo para Instagram\n\nSite institucional, vídeos de manifesto e uma operação de conteúdo no Instagram ancorada em carrosséis educativos e reels de marca.\n\n• Reel \"liberdade financeira\": 112 curtidas e 20 comentários (maior engajamento do perfil)\n• Carrossel \"4 motivos para usar o cartão\": 105 curtidas e 14 comentários\n• Carrossel \"anúncios sem IOF\" (ângulo B2B): 74 curtidas e 13 comentários\n• Carrossel \"IOF zero vs banco tradicional\": comparativo visual didático\n• Site institucional neobankless.com + vídeos de manifesto (horizontal e vertical)",
    metricas_en: "Website, videos and educational Instagram content\n\nInstitutional website, manifesto videos and an Instagram content operation anchored on educational carousels and brand reels.\n\n• \"Financial freedom\" reel: 112 likes and 20 comments (profile's highest engagement)\n• \"4 reasons to use the card\" carousel: 105 likes and 14 comments\n• \"Ads with no IOF\" carousel (B2B angle): 74 likes and 13 comments\n• \"Zero IOF vs traditional bank\" carousel: didactic visual comparison\n• neobankless.com institutional website + manifesto videos (horizontal and vertical)",
    servicos: ["Desenvolvimento web", "Edição de vídeo", "Roteiro", "Social Media", "Design"],
    servicos_en: ["Web development", "Video editing", "Scripting", "Social Media", "Design"],
    media: [
      // Reel de manifesto — maior engajamento do perfil (112 curtidas / 20 comentários)
      {
        src: "/Cases/neobankless/conteudo/instagram/reel-liberdade.mp4",
        type: "video",
        alt: "Reel NBS — Liberdade financeira",
        poster: "/Cases/neobankless/conteudo/instagram-novos/nbs-reel-liberdade-capa.jpg",
        link: "https://www.instagram.com/neobankless/reel/DT21DSFjTtQ/"
      },
      // Carrossel — 4 motivos para usar o cartão (105 curtidas / 14 comentários) — 6 slides
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — 4 motivos para usar o cartão (capa)",
        link: "https://www.instagram.com/p/DT-pchnDWHz/"
      },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-02.jpg", type: "image", alt: "Carrossel NBS — cartão (2/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-03.jpg", type: "image", alt: "Carrossel NBS — cartão (3/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-04.jpg", type: "image", alt: "Carrossel NBS — cartão (4/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-05.jpg", type: "image", alt: "Carrossel NBS — cartão (5/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-cartao-slide-06.jpg", type: "image", alt: "Carrossel NBS — cartão (6/6)" },
      // Carrossel — Anúncios sem IOF (74 curtidas / 13 comentários) — 6 slides
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — Anúncios sem IOF (capa)",
        link: "https://www.instagram.com/p/DVrTgn7FLQo/"
      },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-02.jpg", type: "image", alt: "Carrossel NBS — anúncios (2/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-03.jpg", type: "image", alt: "Carrossel NBS — anúncios (3/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-04.jpg", type: "image", alt: "Carrossel NBS — anúncios (4/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-05.jpg", type: "image", alt: "Carrossel NBS — anúncios (5/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-06.jpg", type: "image", alt: "Carrossel NBS — anúncios (6/6)" },
      // Carrossel — IOF zero vs banco tradicional — 6 slides
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — IOF zero vs banco tradicional (capa)",
        link: "https://www.instagram.com/p/DVebsRFEZBD/"
      },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-02.jpg", type: "image", alt: "Carrossel NBS — IOF (2/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-03.jpg", type: "image", alt: "Carrossel NBS — IOF (3/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-04.jpg", type: "image", alt: "Carrossel NBS — IOF (4/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-05.jpg", type: "image", alt: "Carrossel NBS — IOF (5/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-iof-slide-06.jpg", type: "image", alt: "Carrossel NBS — IOF (6/6)" },
      // Carrossel — Como dolarizar patrimônio — 6 slides
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — Como dolarizar patrimônio (capa)",
        link: "https://www.instagram.com/p/DV1mkzJFOYo/"
      },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-02.jpg", type: "image", alt: "Carrossel NBS — dolarizar (2/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-03.jpg", type: "image", alt: "Carrossel NBS — dolarizar (3/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-04.jpg", type: "image", alt: "Carrossel NBS — dolarizar (4/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-05.jpg", type: "image", alt: "Carrossel NBS — dolarizar (5/6)" },
      { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-dolarizar-slide-06.jpg", type: "image", alt: "Carrossel NBS — dolarizar (6/6)" },
      // Posts estáticos
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-post-cashback.jpg",
        type: "image",
        alt: "Post NBS — Cashback em viagens",
        link: "https://www.instagram.com/p/DVjmFzjk-z1/"
      },
      {
        src: "/Cases/neobankless/conteudo/instagram-novos/nbs-post-global.jpg",
        type: "image",
        alt: "Post NBS — App disponível globalmente",
        link: "https://www.instagram.com/p/DUGpxyKETYN/"
      },
      // Vídeos de manifesto (site/marca)
      {
        src: "/Cases/neobankless/conteudo/manifesto-1.mp4",
        type: "video",
        alt: "Manifesto NBS #1 (landscape)",
        poster: "/Cases/neobankless/conteudo/posters/manifesto-1.jpg"
      },
      {
        src: "/Cases/neobankless/conteudo/manifesto-2.mp4",
        type: "video",
        alt: "Manifesto NBS #2 (landscape)",
        poster: "/Cases/neobankless/conteudo/posters/manifesto-2.jpg"
      },
      // Carrossel — Founders Club, como usar a plataforma (77 curtidas / 20 comentários) — 7 slides
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — Founders Club (capa)",
        link: "https://www.instagram.com/p/DW4jBtalLbH/"
      },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-02.jpg", type: "image", alt: "Carrossel NBS — Founders Club (2/7)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-03.jpg", type: "image", alt: "Carrossel NBS — Founders Club (3/7)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-04.jpg", type: "image", alt: "Carrossel NBS — Founders Club (4/7)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-05.jpg", type: "image", alt: "Carrossel NBS — Founders Club (5/7)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-06.jpg", type: "image", alt: "Carrossel NBS — Founders Club (6/7)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DW4jBtalLbH-slide-07.jpg", type: "image", alt: "Carrossel NBS — Founders Club (7/7)" },
      // Carrossel — Dólar abaixo de R$5 e a tese de dolarizar (28 curtidas / 4 comentários) — 5 slides
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXXheV_FNb4-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — dólar abaixo de R$5 (capa)",
        link: "https://www.instagram.com/p/DXXheV_FNb4/"
      },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXXheV_FNb4-slide-02.jpg", type: "image", alt: "Carrossel NBS — dólar (2/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXXheV_FNb4-slide-03.jpg", type: "image", alt: "Carrossel NBS — dólar (3/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXXheV_FNb4-slide-04.jpg", type: "image", alt: "Carrossel NBS — dólar (4/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXXheV_FNb4-slide-05.jpg", type: "image", alt: "Carrossel NBS — dólar (5/5)" },
      // Carrossel — A evolução de como protegemos o dinheiro (37 curtidas / 9 comentários) — 5 slides
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXpdHTnkT2T-slide-01.jpg",
        type: "image",
        alt: "Carrossel NBS — a evolução do refúgio do dinheiro (capa)",
        link: "https://www.instagram.com/p/DXpdHTnkT2T/"
      },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXpdHTnkT2T-slide-02.jpg", type: "image", alt: "Carrossel NBS — refúgio (2/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXpdHTnkT2T-slide-03.jpg", type: "image", alt: "Carrossel NBS — refúgio (3/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXpdHTnkT2T-slide-04.jpg", type: "image", alt: "Carrossel NBS — refúgio (4/5)" },
      { src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXpdHTnkT2T-slide-05.jpg", type: "image", alt: "Carrossel NBS — refúgio (5/5)" },
      // Reel — quem controla seu dinheiro no sistema tradicional (4.388 views / 86 curtidas)
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXZ3k8nE_yA-reel.mp4",
        type: "video",
        alt: "Reel NBS — quem controla o seu dinheiro",
        poster: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXZ3k8nE_yA-capa.jpg",
        link: "https://www.instagram.com/reel/DXZ3k8nE_yA/"
      },
      // Reel — a centralização do sistema financeiro (3.971 views / 81 curtidas)
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXchr_Kk-HU-reel.mp4",
        type: "video",
        alt: "Reel NBS — a centralização do sistema financeiro",
        poster: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXchr_Kk-HU-capa.jpg",
        link: "https://www.instagram.com/reel/DXchr_Kk-HU/"
      },
      // Reel — desafio do cartão NBS (1.727 views / 26 curtidas)
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DWmjDO3k5lt-reel.mp4",
        type: "video",
        alt: "Reel NBS — desafio do cartão",
        poster: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DWmjDO3k5lt-capa.jpg",
        link: "https://www.instagram.com/reel/DWmjDO3k5lt/"
      },
      // Post estático — onde investir começa pelo entendimento (32 curtidas / 7 comentários)
      {
        src: "/Cases/neobankless/conteudo/portfolio-novos/dfv-DXzOESHFHVj-slide-01.jpg",
        type: "image",
        alt: "Post NBS — investir começa com entendimento",
        link: "https://www.instagram.com/p/DXzOESHFHVj/"
      }
    ]
  },
  "hugo-doria": {
    id: "hugo-doria",
    nome: "Hugo Dória",
    tags: ["IA", "Desenvolvimento", "Reels", "Vídeo"],
    descricao: "Edição de reels educativos sobre IA prática, vibe coding e ferramentas como Cursor, Claude Code e Lovable, para uma audiência de devs e empreendedores.",
    descricao_en: "Editing educational reels about practical AI, vibe coding and tools like Cursor, Claude Code and Lovable, for an audience of developers and entrepreneurs.",
    fraseImpactante: "Reels de IA prática e vibe coding para devs e empreendedores.",
    fraseImpactante_en: "Practical-AI and vibe-coding reels for devs and entrepreneurs.",
    detalhes: "O Desafio\n\nO Hugo Dória produz conteúdo sobre IA aplicada ao desenvolvimento: vibe coding, build-alongs e reviews de ferramentas como Cursor, Claude Code, Lovable e n8n. O desafio é transformar temas técnicos, que normalmente afastam quem não é dev, em reels verticais de ritmo rápido que prendem tanto o programador quanto o empreendedor que quer aplicar IA no negócio.\n\nNossa Estratégia\n\nAssumimos a edição dos reels com foco em retenção: cortes dinâmicos, destaque visual dos comandos e telas, e um ritmo que mantém o espectador até o fim mesmo em conteúdo denso. Cada vídeo é pensado para ser claro no celular, em formato vertical 1080x1920.\n\n• Edição de reels verticais sobre IA prática e vibe coding\n• Destaque de código, prompts e telas de ferramentas (Cursor, Claude Code, Lovable)\n• Cortes e ritmo otimizados para retenção em formato curto\n• Conteúdo técnico traduzido em linguagem acessível para dev e empreendedor\n\nO Resultado\n\nUma série de reels educativos que mantêm a profundidade técnica do Hugo enquanto ganham o ritmo e a clareza visual que o formato curto exige, reforçando seu posicionamento como referência em IA prática e vibe coding.",
    detalhes_en: "The Challenge\n\nHugo Dória creates content about AI applied to development: vibe coding, build-alongs and reviews of tools like Cursor, Claude Code, Lovable and n8n. The challenge is to turn technical topics, which usually push away non-devs, into fast-paced vertical reels that hold both the programmer and the entrepreneur who wants to apply AI to their business.\n\nOur Strategy\n\nWe took over reel editing with a focus on retention: dynamic cuts, visual emphasis on commands and screens, and a pace that keeps viewers to the end even with dense content. Every video is built to be clear on mobile, in vertical 1080x1920 format.\n\n• Editing of vertical reels about practical AI and vibe coding\n• Emphasis on code, prompts and tool screens (Cursor, Claude Code, Lovable)\n• Cuts and pacing optimized for short-form retention\n• Technical content translated into accessible language for devs and entrepreneurs\n\nThe Result\n\nA series of educational reels that keep Hugo's technical depth while gaining the pace and visual clarity that short-form demands, reinforcing his positioning as a reference in practical AI and vibe coding.",
    depoimentos: "",
    links: ["https://www.instagram.com/hugodoria_dev/"],
    externalLink: "https://www.instagram.com/hugodoria_dev/",
    externalLabel: "Ver no Instagram",
    externalLabel_en: "See on Instagram",
    metricas: "Reels educativos de IA prática e vibe coding\n\nEdição de uma série de reels verticais sobre IA aplicada ao desenvolvimento, para a audiência de devs e empreendedores do Hugo Dória.\n\n• Reels verticais 1080x1920 sobre IA prática e vibe coding\n• Ferramentas em destaque: Cursor, Claude Code, Lovable, n8n\n• Edição com cortes dinâmicos e foco em retenção\n• Conteúdo técnico em linguagem acessível\n• Formato curto pensado para consumo no celular",
    metricas_en: "Educational reels on practical AI and vibe coding\n\nEditing a series of vertical reels about AI applied to development, for Hugo Dória's audience of devs and entrepreneurs.\n\n• Vertical 1080x1920 reels on practical AI and vibe coding\n• Featured tools: Cursor, Claude Code, Lovable, n8n\n• Editing with dynamic cuts and a focus on retention\n• Technical content in accessible language\n• Short-form built for mobile consumption",
    servicos: ["Edição de vídeo", "Edição de reels", "Motion graphics"],
    servicos_en: ["Video editing", "Reels editing", "Motion graphics"],
    media: [
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-01.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-01.jpg", alt: "Hugo Dória — reel IA prática 01" },
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-02.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-02.jpg", alt: "Hugo Dória — reel IA prática 02" },
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-03.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-03.jpg", alt: "Hugo Dória — reel IA prática 03" },
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-04.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-04.jpg", alt: "Hugo Dória — reel IA prática 04" },
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-05.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-05.jpg", alt: "Hugo Dória — reel IA prática 05" },
      { src: "/Cases/hugo-doria/conteudo/hugo-reel-06.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-06.jpg", alt: "Hugo Dória — reel IA prática 06" }
    ],
    youtubeVideos: [
      {
        videoId: "5CvJqBTRm5M",
        poster: "/Cases/_youtube-thumbs/hugo-yt-01.jpg",
        src: "https://www.youtube.com/watch?v=5CvJqBTRm5M",
        title: "Por que seu site feito com IA nunca parece profissional",
        alt: "Hugo Dória — vídeo longo: site feito com IA"
      }
    ]
  },
  "buenas-ideias": {
    id: "buenas-ideias",
    nome: "Buenas Ideias",
    tags: ["Vídeo", "Newsletter", "Conteúdo"],
    descricao: "Edição de vídeo, transcrições e newsletters para Eduardo Bueno (Buenas Ideias).",
    descricao_en: "Video editing, transcriptions and newsletters for Eduardo Bueno (Buenas Ideias).",
    fraseImpactante: "Edição de vídeo, transcrições e newsletters.",
    fraseImpactante_en: "Video editing, transcriptions and newsletters.",
    detalhes: "Edição de vídeos para YouTube, transcrições e criação de newsletters no Beehiiv para Eduardo Bueno — criador de conteúdo sobre política e história.",
    detalhes_en: "YouTube video editing, transcriptions and newsletter creation on Beehiiv for Eduardo Bueno — content creator covering politics and history.",
    depoimentos: "",
    links: ["https://www.youtube.com/@buenasideias"],
    externalLink: "https://www.youtube.com/@buenasideias",
    externalLabel: "Ver no YouTube",
    externalLabel_en: "See on YouTube",
    metricas: "Edição de vídeo, transcrições e newsletters no Beehiiv.",
    metricas_en: "Video editing, transcriptions and newsletters on Beehiiv.",
    servicos: ["Edição de vídeo", "Transcrição", "Newsletter", "Copywriting"],
    servicos_en: ["Video editing", "Transcription", "Newsletter", "Copywriting"],
    media: [
      {
        src: "/Cases/buenas-ideias/conteudo/buenas-reel-1.mp4",
        type: "video",
        poster: "/Cases/buenas-ideias/conteudo/posters/buenas-reel-1.jpg",
        alt: "Buenas Ideias — Corte vertical: Quem inventou o 7 de setembro"
      },
      {
        src: "/Cases/buenas-ideias/conteudo/buenas-reel-2.mp4",
        type: "video",
        poster: "/Cases/buenas-ideias/conteudo/posters/buenas-reel-2.jpg",
        alt: "Buenas Ideias — Corte vertical documentário"
      },
      {
        src: "/Cases/buenas-ideias/conteudo/buenas-thumb-1.webp",
        type: "image",
        alt: "Buenas Ideias — Thumbnail: Quem inventou o 7 de setembro"
      },
    ]
  },
  "kaleidos-pay": {
    id: "kaleidos-pay",
    nome: "Kaleidos Pay",
    tags: ["Desenvolvimento Web", "Fintech", "Cripto"],
    descricao: "Gateway de pagamentos completo para agencias. PIX, cartao de credito e criptomoedas em um unico checkout. Dashboard com graficos, cobrancas automaticas e notificacoes via email e Telegram.",
    descricao_en: "Full payment gateway for agencies. PIX, credit card and crypto in a single checkout. Dashboard with charts, automatic billing and email/Telegram notifications.",
    fraseImpactante: "PIX, cripto e cartao em um unico checkout.",
    fraseImpactante_en: "PIX, crypto and card in a single checkout.",
    detalhes: "O Desafio\n\nA Kaleidos precisava de um sistema proprio para cobrar clientes de forma profissional, aceitando multiplos metodos de pagamento incluindo criptomoedas, com notificacoes automaticas e dashboard de gestao.\n\nNossa Solucao\n\nDesenvolvemos um gateway completo com:\n\n- Checkout responsivo com 4 fases (metodo > pagamento > verificacao > confirmado)\n- Integracao real com Asaas (PIX e cartao)\n- Pagamentos cripto via MetaMask com verificacao on-chain\n- Dashboard com graficos de receita, status e metodos\n- Cobrancas recorrentes com alertas de renovacao\n- Notificacoes automaticas por email (Resend) e Telegram\n- Login seguro com rate limiting\n- PWA instalavel com notificacoes push\n\nStack: Next.js 16, TypeScript, Tailwind, Supabase, Asaas API, Recharts",
    detalhes_en: "The Challenge\n\nKaleidos needed its own system to bill clients professionally, accepting multiple payment methods including crypto, with automatic notifications and management dashboard.\n\nOur Solution\n\nWe built a complete gateway with checkout, Asaas integration (PIX + card), MetaMask crypto payments with on-chain verification, revenue dashboard with charts, recurring billing, email and Telegram notifications, secure login, and installable PWA.",
    links: ["https://pay.kaleidos.com.br"],
    metricas: "Sistema completo de pagamentos\n\n- 3 metodos: PIX, Cartao, Cripto\n- Dashboard com graficos em tempo real\n- Cobrancas recorrentes automaticas\n- Notificacoes email + Telegram\n- Verificacao blockchain para cripto\n- Login seguro com rate limiting",
    metricas_en: "Complete payment system with 3 methods, real-time dashboard, automatic recurring billing, email + Telegram notifications, blockchain verification and secure login.",
    servicos: ["Desenvolvimento Web", "UI/UX", "Integracao API", "Fintech"],
    servicos_en: ["Web Development", "UI/UX", "API Integration", "Fintech"],
    media: [
      { src: "/Cases/tech-portfolio/kaleidos-pay.png", type: "image", alt: "Kaleidos Pay — Landing page" },
      { src: "/Cases/tech-portfolio/kaleidos-pay-login.png", type: "image", alt: "Kaleidos Pay — Login" },
      { src: "/Cases/tech-portfolio/kaleidos-pay-landing-mobile.png", type: "image", alt: "Kaleidos Pay — Mobile" }
    ]
  },
  "kai-platform": {
    id: "kai-platform",
    nome: "KAI — Kreator",
    tags: ["Desenvolvimento Web", "SaaS", "IA"],
    descricao: "Plataforma de gestao de conteudo para criadores que levam a serio o crescimento. Pipeline, analytics e automacoes com IA em um unico lugar.",
    descricao_en: "Content management platform for creators who take growth seriously. Pipeline, analytics and AI automations in one place.",
    fraseImpactante: "Crie Mais. Distribua Melhor. Cresca Mais Rapido.",
    fraseImpactante_en: "Create More. Distribute Better. Grow Faster.",
    detalhes: "O Desafio\n\nCriadores de conteudo precisavam de uma ferramenta completa para gerenciar todo o ciclo de producao — da ideia a distribuicao — com insights de IA.\n\nNossa Solucao\n\nDesenvolvemos o KAI (Kreator AI), uma plataforma SaaS com 20+ paginas incluindo dashboard, pipeline de conteudo, calendario editorial, analytics, automacoes e integracao com redes sociais.\n\nStack: Vite/React, TypeScript, Tailwind, 476 arquivos",
    detalhes_en: "Content creators needed a complete tool to manage the entire production cycle with AI insights. We built KAI with 20+ pages including dashboard, content pipeline, editorial calendar, analytics, and social media integration.",
    links: [],
    metricas: "476 arquivos | 20+ paginas | SaaS completo",
    metricas_en: "476 files | 20+ pages | Complete SaaS",
    servicos: ["Desenvolvimento Web", "UI/UX", "SaaS", "IA"],
    servicos_en: ["Web Development", "UI/UX", "SaaS", "AI"],
    media: [
      { src: "/Cases/tech-portfolio/kai-2.png", type: "image", alt: "KAI — Kreator Platform" }
    ]
  },
  "defi-radar": {
    id: "defi-radar",
    nome: "DeFi Radar",
    tags: ["Desenvolvimento Web", "Cripto", "Dashboard"],
    descricao: "Dashboard cripto com 16 paginas para monitorar oportunidades DeFi em tempo real. Precos, graficos, analises e alertas de mercado.",
    descricao_en: "Crypto dashboard with 16 pages to monitor DeFi opportunities in real-time. Prices, charts, analysis and market alerts.",
    fraseImpactante: "Seu Radar de Oportunidades Cripto.",
    fraseImpactante_en: "Your Crypto Opportunities Radar.",
    detalhes: "Dashboard completo com dados em tempo real de protocolos DeFi, precos de tokens, analise de mercado, alertas e mais.\n\nStack: Vite/React, Tailwind, CoinGecko API, Recharts",
    detalhes_en: "Complete dashboard with real-time DeFi protocol data, token prices, market analysis, alerts and more.",
    links: ["https://radar-blond-zeta.vercel.app"],
    metricas: "16 paginas | Dados em tempo real | 35 componentes",
    metricas_en: "16 pages | Real-time data | 35 components",
    servicos: ["Desenvolvimento Web", "UI/UX", "Dashboard", "Cripto"],
    servicos_en: ["Web Development", "UI/UX", "Dashboard", "Crypto"],
    media: [
      { src: "/Cases/tech-portfolio/defi-radar.png", type: "image", alt: "DeFi Radar — Dashboard" },
      { src: "/Cases/tech-portfolio/defi-radar-mobile.png", type: "image", alt: "DeFi Radar — Mobile" }
    ]
  },
  "depay": {
    id: "depay",
    nome: "DePay",
    tags: ["Desenvolvimento Web", "Fintech", "Cripto"],
    descricao: "Infraestrutura de pagamentos on-chain. Aceite pagamentos cripto como aceita PIX. Globe 3D interativo, pricing e documentacao.",
    descricao_en: "On-chain payment infrastructure. Accept crypto payments like PIX. Interactive 3D globe, pricing and documentation.",
    fraseImpactante: "Aceite pagamentos cripto como aceita PIX.",
    fraseImpactante_en: "Accept crypto payments like you accept PIX.",
    detalhes: "Landing page com globe 3D (COBE), pricing, documentacao e integracao cripto.\n\nStack: Vite/React, COBE Globe, Tailwind",
    detalhes_en: "Landing page with 3D globe (COBE), pricing, documentation and crypto integration.",
    links: ["https://depay-rho.vercel.app"],
    metricas: "Globe 3D interativo | Pagamentos on-chain",
    metricas_en: "Interactive 3D globe | On-chain payments",
    servicos: ["Desenvolvimento Web", "UI/UX", "3D", "Fintech"],
    servicos_en: ["Web Development", "UI/UX", "3D", "Fintech"],
    media: [
      { src: "/Cases/tech-portfolio/depay.png", type: "image", alt: "DePay — Landing" },
      { src: "/Cases/tech-portfolio/depay-mobile.png", type: "image", alt: "DePay — Mobile" }
    ]
  },
  "nbs": {
    id: "nbs",
    nome: "NBS — Vision Education Foundation",
    tags: ["Desenvolvimento Web", "SaaS", "EdTech"],
    descricao: "Plataforma completa de bolsas de estudo para a Vision Education Foundation. Sistema de cadastro, aplicacao e gestao de bolsas com painel administrativo.",
    descricao_en: "Complete scholarship platform for the Vision Education Foundation. Registration, application and scholarship management with admin panel.",
    fraseImpactante: "Plataforma de bolsas de estudo que conecta estudantes a oportunidades.",
    fraseImpactante_en: "Scholarship platform connecting students to opportunities.",
    detalhes: "Desenvolvemos a plataforma web completa da NBS (Vision Education Foundation) incluindo:\n\n- Sistema de cadastro e autenticacao\n- Formulario de aplicacao para bolsas\n- Painel administrativo para gestao\n- Calculadora de impostos Meta Ads (ferramenta de marketing)\n\nStack: React, Vite, Tailwind",
    detalhes_en: "We built the complete web platform for NBS including registration, application forms, admin panel, and a Meta Ads tax calculator marketing tool.",
    links: ["https://nbs-site.vercel.app"],
    metricas: "Plataforma SaaS | Sistema de bolsas | Painel admin",
    metricas_en: "SaaS Platform | Scholarship system | Admin panel",
    servicos: ["Desenvolvimento Web", "UI/UX", "SaaS", "EdTech"],
    servicos_en: ["Web Development", "UI/UX", "SaaS", "EdTech"],
    media: [
      { src: "/Cases/tech-portfolio/nbs-site.png", type: "image", alt: "NBS — Vision Education Foundation" },
      { src: "/Cases/tech-portfolio/nbs-calculadora.png", type: "image", alt: "NBS — Calculadora Meta Ads" }
    ]
  },
  "dsec": {
    id: "dsec",
    nome: "DSEC Labs",
    tags: ["Cripto", "Segurança", "E-mail Marketing", "LinkedIn", "Conteúdo", "Bitcoin"],
    descricao: "Construção de autoridade da DSEC Labs em três frentes — e-mail marketing (newsletter semanal + mini-curso), LinkedIn e artigos — com thought leadership sobre segurança Bitcoin, self-custody e privacidade financeira.",
    descricao_en: "Building DSEC Labs' authority across three fronts — e-mail marketing (weekly newsletter + mini-course), LinkedIn and articles — with thought leadership on Bitcoin security, self-custody and financial privacy.",
    fraseImpactante: "Autoridade em segurança Bitcoin em três frentes: e-mail marketing, LinkedIn e artigos.",
    fraseImpactante_en: "Authority in Bitcoin security across three fronts: e-mail marketing, LinkedIn and articles.",
    detalhes: "O Desafio\n\nA DSEC Labs constrói hardware wallets air-gapped e open-source (COLDKIT) num mercado dominado por jargão técnico e desconfiança. O desafio era estabelecer a marca como uma referência séria em segurança Bitcoin no Brasil, falando com founders, investidores e pessoas com patrimônio relevante em cripto, sem apelar para medo barato.\n\nNossa Estratégia\n\nDesenhamos uma linha editorial institucional para o LinkedIn, ancorada em quatro pilares: Segurança (40%), Privacidade (25%), Educação (20%) e Mercado/Comunidade (15%). Cada artigo parte de um problema real, traz dados concretos e termina conectando com a tese da DSEC Labs, sem hashtags e em texto nativo.\n\n• Calendário editorial mensal (2 posts por semana)\n• Artigos longos de thought leadership em PT-BR\n• Pauta derivada de blog e newsletter para consistência de mensagem\n• Voz institucional: dados reais, profundidade, zero enrolação\n\nO Resultado\n\nUma biblioteca crescente de artigos que posiciona a DSEC Labs como uma das vozes mais consistentes sobre segurança Bitcoin em português, cobrindo multisig, air-gap, open-source, wrench attacks, Drex e regulação cripto no Brasil.",
    detalhes_en: "The Challenge\n\nDSEC Labs builds air-gapped, open-source hardware wallets (COLDKIT) in a market dominated by technical jargon and distrust. The challenge was to establish the brand as a serious reference in Bitcoin security in Brazil, speaking to founders, investors and people with significant crypto holdings, without cheap fear-mongering.\n\nOur Strategy\n\nWe designed an institutional editorial line for LinkedIn, anchored in four pillars: Security (40%), Privacy (25%), Education (20%) and Market/Community (15%). Each article starts from a real problem, brings concrete data, and ends by connecting to DSEC Labs' thesis, with no hashtags and native text.\n\n• Monthly editorial calendar (2 posts per week)\n• Long-form thought leadership articles in PT-BR\n• Agenda derived from blog and newsletter for message consistency\n• Institutional voice: real data, depth, zero fluff\n\nThe Result\n\nA growing library of articles positioning DSEC Labs as one of the most consistent voices on Bitcoin security in Portuguese, covering multisig, air-gap, open-source, wrench attacks, Drex and crypto regulation in Brazil.",
    depoimentos: "",
    links: ["https://www.dseclab.io", "https://shop.dseclab.io/products/coldkit"],
    externalLink: "https://www.dseclab.io",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "Três frentes de conteúdo institucional\n\n• E-mail marketing: newsletter semanal (Resumo Semanal DSEC Labs) + mini-curso de 5 dias\n• LinkedIn: 2 artigos por semana de thought leadership\n• Artigos: multisig, air-gap, open-source, wrench attacks, Drex, regulação\n• 5 pilares editoriais (Bitcoin, Regulação, Segurança, Educação, Comunidade)\n• Pauta integrada entre e-mail, LinkedIn e blog\n• Voz institucional PT-BR, sem hashtags, texto nativo",
    metricas_en: "Three fronts of institutional content\n\n• E-mail marketing: weekly newsletter (Resumo Semanal DSEC Labs) + 5-day mini-course\n• LinkedIn: 2 thought-leadership articles per week\n• Articles: multisig, air-gap, open-source, wrench attacks, Drex, regulation\n• 5 editorial pillars (Bitcoin, Regulation, Security, Education, Community)\n• Agenda integrated across e-mail, LinkedIn and blog\n• Institutional PT-BR voice, no hashtags, native text",
    servicos: ["E-mail Marketing", "Newsletter", "Copywriting", "Estratégia de conteúdo", "LinkedIn", "Thought Leadership"],
    servicos_en: ["E-mail Marketing", "Newsletter", "Copywriting", "Content strategy", "LinkedIn", "Thought Leadership"],
    media: [
      { src: "/Cases/dsec/site/landing-1.png", type: "image", alt: "DSEC Labs — landing page" },
      { src: "/Cases/dsec/site/landing-2.png", type: "image", alt: "DSEC Labs — landing page" },
      { src: "/Cases/dsec/site/landing-3.png", type: "image", alt: "DSEC Labs — landing page" },
      // Posts de LinkedIn (criativos) — cada imagem abre a publicacao real ao clicar.
      {
        src: "/Cases/dsec/conteudo/linkedin/dsec-li-stablecoins.webp",
        type: "image",
        alt: "DSEC no LinkedIn — Stablecoins e liquidacao global: USDT e USDC criando um trilho paralelo ao SWIFT",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7475540793039052800/"
      },
      {
        src: "/Cases/dsec/conteudo/linkedin/dsec-li-etfs.jpg",
        type: "image",
        alt: "DSEC no LinkedIn — ETFs de Bitcoin nos EUA somam US$ 77 bilhoes",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7471204270093160448/"
      },
      {
        src: "/Cases/dsec/conteudo/linkedin/dsec-li-drex.webp",
        type: "image",
        alt: "DSEC no LinkedIn — Regulacao cripto no Brasil em 2026: Drex e as novas resolucoes do BCB",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7473005800735793152/"
      },
      {
        src: "/Cases/dsec/conteudo/linkedin/dsec-li-rastreio.jpg",
        type: "image",
        alt: "DSEC no LinkedIn — No Brasil, o caminho entre a corretora e a carteira agora e rastreado de ponta a ponta",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7473766107712061440/"
      }
    ]
  },
  "alfred": {
    id: "alfred",
    nome: "Alfred",
    tags: ["Cripto", "Bitcoin", "Twitter", "IA", "Social Media"],
    descricao: "Criação da persona Alfred para a Alfred P2P (DSEC Labs): identidade visual gerada por IA e operação completa no Twitter/X em duas frentes — posts originais e reply guy (respostas diárias) — com voz PT-BR.",
    descricao_en: "Creation of the Alfred persona for Alfred P2P (DSEC Labs): AI-generated visual identity and a full Twitter/X operation across two fronts — original posts and reply guy (daily replies) — with a PT-BR voice.",
    fraseImpactante: "Uma persona cripto do zero: posts originais + reply guy diário no Twitter.",
    fraseImpactante_en: "A crypto persona from scratch: original posts + a daily reply-guy operation on Twitter.",
    detalhes: "O Desafio\n\nA Alfred P2P precisava de um rosto e uma voz. Não um logo frio, mas um personagem com quem a comunidade cripto brasileira se identificasse, capaz de falar de segurança e self-custody sem soar corporativo nem vender medo.\n\nNossa Estratégia\n\nCriamos o Alfred: um personagem cripto-nativo com identidade visual consistente, gerada por IA (Gemini / nano banana), em dezenas de cenas, do gm matinal ao wrench attack. Em paralelo, estruturamos a operação de conteúdo no Twitter/X com uma voz reply-guy em PT-BR lowercase, direta e sem jargão.\n\n• Identidade visual da persona gerada por IA (20+ cenas)\n• Biblioteca de imagens temáticas reaproveitáveis\n• Voz e roteiro de tweets diários (segurança, privacidade, educação)\n• Regras de marca: zero altcoin, zero promessa financeira, KYC simplificado\n\nO Resultado\n\nUma persona pronta para escalar: rosto reconhecível, biblioteca visual coesa e um fluxo de tweets que transforma temas áridos de segurança Bitcoin em conteúdo leve, memável e fiel à marca.",
    detalhes_en: "The Challenge\n\nAlfred P2P needed a face and a voice. Not a cold logo, but a character the Brazilian crypto community could identify with, able to talk about security and self-custody without sounding corporate or selling fear.\n\nOur Strategy\n\nWe created Alfred: a crypto-native character with a consistent AI-generated visual identity (Gemini / nano banana), across dozens of scenes, from the morning gm to the wrench attack. In parallel, we structured the Twitter/X content operation with a PT-BR lowercase reply-guy voice, direct and jargon-free.\n\n• AI-generated persona visual identity (20+ scenes)\n• Reusable themed image library\n• Voice and daily tweet scripting (security, privacy, education)\n• Brand rules: zero altcoins, zero financial promises, simplified KYC\n\nThe Result\n\nA persona ready to scale: a recognizable face, a cohesive visual library, and a tweet flow that turns dry Bitcoin-security topics into light, meme-able, on-brand content.",
    depoimentos: "",
    links: ["https://www.alfredp2p.io", "https://x.com/alfredp2p", "http://curso.alfredp2p.io/"],
    externalLink: "https://www.alfredp2p.io",
    externalLabel: "Ver no site",
    externalLabel_en: "Visit website",
    metricas: "Persona cripto completa, do visual à voz\n\n• 20+ cenas de identidade visual geradas por IA\n• Posts: tweets e threads originais no Twitter/X\n• Reply Guy: 10 respostas/dia (seg-sex) em 25 perfis curados, em 5 formatos\n• Voz PT-BR lowercase, fiel às regras de marca\n• Temas: segurança, privacidade, educação Bitcoin",
    metricas_en: "A complete crypto persona, from visuals to voice\n\n• 20+ AI-generated visual identity scenes\n• Posts: original tweets and threads on Twitter/X\n• Reply Guy: 10 replies/day (Mon-Fri) across 25 curated accounts, in 5 formats\n• PT-BR lowercase voice, true to brand rules\n• Topics: Bitcoin security, privacy, education",
    servicos: ["Identidade visual", "Geração por IA", "Twitter", "Reply Guy", "Copywriting", "Social Media"],
    servicos_en: ["Visual identity", "AI generation", "Twitter", "Reply Guy", "Copywriting", "Social Media"],
    media: [
      // 10 imagens aprovadas da persona Alfred (geradas por IA, .webp sem corte).
      // Substituem as 4 antigas (gm-coffee / self-custody / vs-hacker / wrench-attack).
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-01.webp", type: "image", alt: "Alfred — gm com cafe (persona assinatura)" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-02.webp", type: "image", alt: "Alfred patriota com a bandeira do Brasil no Maracana" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-03.webp", type: "image", alt: "Alfred no carnaval da Sapucai" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-04.webp", type: "image", alt: "Alfred em Toquio cyberpunk na chuva neon" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-05.webp", type: "image", alt: "Alfred manuseando uma hardware wallet (self-custody)" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-06.webp", type: "image", alt: "Alfred meditando: not your keys, not your coins" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-07.webp", type: "image", alt: "Alfred num cafe em Havana: stack sats" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-08.webp", type: "image", alt: "Alfred vs Mario: bloco vira Bitcoin" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-09.webp", type: "image", alt: "Alfred vs fiscal do Drex: soberania acima de vigilancia" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-10.webp", type: "image", alt: "Alfred operario numa fazenda de mineracao de Bitcoin" },
      // Landing do curso Alfred P2P (item clicavel: abre a pagina real do curso).
      {
        src: "/Cases/alfred/conteudo/aprovadas/alfred-aprovada-05.webp",
        type: "image",
        alt: "Curso Alfred P2P (curso.alfredp2p.io) — clique para acessar a landing",
        link: "http://curso.alfredp2p.io/"
      },
      // Prints de tweets reais do Alfred (@AlfredSpaceBR), exibidos inteiros, sem corte.
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-tweet-bitcoin.jpg", type: "image", alt: "Tweet do Alfred: por que voce compra Bitcoin? (so valem respostas erradas)" },
      { src: "/Cases/alfred/conteudo/aprovadas/alfred-tweet-selfcustody.jpg", type: "image", alt: "Tweet do Alfred: Brasil torna obrigatorio o reporte de self-custody" }
    ]
  },
  "gui-campos": {
    id: "gui-campos",
    nome: "Gui Campos (DSEC)",
    status: "em-andamento",
    tags: ["Marca Pessoal", "Founder", "Instagram", "LinkedIn", "Bitcoin", "Empreendedorismo"],
    descricao: "Marca pessoal do Gui Campos (@guicampossc), sócio da DSEC: o perfil de maior alcance do ecossistema (17,8 mil seguidores na largada), operado no modo roteiro-completo — a Kaleidos escreve tudo, ele grava. A ponte editorial leva a audiência de empreendedorismo até soberania financeira e Bitcoin, sem queimar a base.",
    descricao_en: "Personal brand of Gui Campos (@guicampossc), DSEC partner: the highest-reach profile in the ecosystem (17.8k followers at the start), run in full-script mode — Kaleidos writes everything, he records. The editorial bridge takes his entrepreneurship audience toward financial sovereignty and Bitcoin without burning the base.",
    fraseImpactante: "O megafone do ecossistema DSEC: alcance de empreendedorismo virando topo de funil de soberania.",
    fraseImpactante_en: "The DSEC ecosystem's megaphone: entrepreneurship reach turned into a sovereignty top-of-funnel.",
    detalhes: "O Desafio\n\nO Gui chegou com a maior audiência dos dois sócios da DSEC (17,8 mil seguidores, perfil verificado), mas construída em empreendedorismo e gestão — não em Bitcoin e segurança, o nicho da holding. Migrar direto pra self-custody hardcore queimaria a base. E o alerta anti-vaidade já estava dado: um meme dele passou de 2 milhões de views e trouxe cerca de 80 seguidores. Alcance sem tese não vira autoridade.\n\nNossa Estratégia\n\nPosicionamos o Gui como \"o empreendedor que descobriu soberania financeira\": mantém o que já engaja (dor de empreendedor, gestão, jornada) e constrói a ponte pra patrimônio, Bitcoin e soberania por dentro desse discurso.\n\n• Modo roteiro-completo: a Kaleidos escreve cada peça, o founder só grava — o pipeline que melhor escala\n• Pilares ponderados: empreendedorismo e gestão (40%), patrimônio e soberania do empreendedor (25%), Bitcoin descomplicado pro empreendedor (20%), bastidor e jornada (10%), colabs (5%)\n• Sistema visual próprio: P&B tipográfico full-bleed, no lugar da estética stock genérica\n• Cadência: 2 carrosséis por semana, reels gravados em lote, stories diários, threads no X e posts no LinkedIn como repurpose\n• A/B de horário no primeiro mês pra calibrar o slot de publicação\n\nO Resultado\n\nOperação em andamento (início em jun-jul/2026): pipeline rodando na cadência-padrão, sistema visual implantado e relatório mensal medindo engajamento qualificado — saves, compartilhamentos e DMs — em vez de views de vaidade. Métricas consolidadas de antes e depois entram aqui conforme os ciclos mensais fecham.",
    detalhes_en: "The Challenge\n\nGui arrived with the larger audience of DSEC's two partners (17.8k followers, verified profile), but built on entrepreneurship and management — not Bitcoin and security, the holding's niche. Migrating straight to hardcore self-custody would burn the base. And the anti-vanity warning was already on the table: one of his memes passed 2 million views and brought in about 80 followers. Reach without a thesis doesn't become authority.\n\nOur Strategy\n\nWe positioned Gui as \"the entrepreneur who discovered financial sovereignty\": keep what already engages (entrepreneur pain, management, journey) and build the bridge to wealth protection, Bitcoin and sovereignty from inside that discourse.\n\n• Full-script mode: Kaleidos writes every piece, the founder only records — the pipeline that scales best\n• Weighted pillars: entrepreneurship and management (40%), the entrepreneur's wealth and sovereignty (25%), Bitcoin made simple for entrepreneurs (20%), behind-the-scenes and journey (10%), collabs (5%)\n• A visual system of his own: full-bleed typographic black & white, replacing generic stock aesthetics\n• Cadence: 2 carousels a week, reels shot in batches, daily stories, X threads and LinkedIn posts as repurpose\n• Posting-time A/B tests in the first month to calibrate the publishing slot\n\nThe Result\n\nOperation in progress (started Jun-Jul/2026): pipeline running at standard cadence, visual system deployed and a monthly report measuring qualified engagement — saves, shares and DMs — instead of vanity views. Consolidated before/after metrics land here as the monthly cycles close.",
    depoimentos: "",
    links: ["https://www.instagram.com/guicampossc/", "https://www.dseclab.io"],
    externalLink: "https://www.instagram.com/guicampossc/",
    externalLabel: "Ver no Instagram",
    externalLabel_en: "See on Instagram",
    metricas: "Operação de marca pessoal em andamento\n\nBase na largada (jun/2026): 17,8 mil seguidores no Instagram, perfil verificado — o maior alcance do ecossistema DSEC.\n\n• Modo roteiro-completo: Kaleidos escreve, founder grava\n• 2 carrosséis/semana + reels em lote + stories diários\n• Repurpose: threads no X e posts no LinkedIn\n• Sistema visual P&B tipográfico full-bleed\n• Lição anti-vaidade: meme de 2M views trouxe ~80 seguidores — medimos engajamento qualificado, não views\n• Relatório mensal por founder (top 3 / bottom 3 + leitura editorial)",
    metricas_en: "Personal branding operation in progress\n\nStarting base (Jun/2026): 17.8k Instagram followers, verified profile — the largest reach in the DSEC ecosystem.\n\n• Full-script mode: Kaleidos writes, founder records\n• 2 carousels/week + batch-shot reels + daily stories\n• Repurpose: X threads and LinkedIn posts\n• Full-bleed typographic B&W visual system\n• Anti-vanity lesson: a 2M-view meme brought ~80 followers — we measure qualified engagement, not views\n• Monthly report per founder (top 3 / bottom 3 + editorial read)",
    servicos: ["Marca Pessoal", "Estratégia de conteúdo", "Roteiro", "Copywriting", "Social Media", "Ghostwriting"],
    servicos_en: ["Personal Branding", "Content strategy", "Scriptwriting", "Copywriting", "Social Media", "Ghostwriting"],
    media: []
  },
  "leo-maximiliano": {
    id: "leo-maximiliano",
    nome: "Léo Maximiliano (DSEC)",
    status: "em-andamento",
    tags: ["Marca Pessoal", "Founder", "Bitcoin", "Instagram", "Twitter", "Segurança"],
    descricao: "Marca pessoal do Léo Maximiliano (@leommaximiliano), CEO e co-founder da DSEC: a autoridade técnica do ecossistema, operada no modo yapping — ele liga a câmera e fala, a Kaleidos entrega tema + hook e faz todo o repurpose no pós. Posicionamento: o builder que explica a infraestrutura do dinheiro.",
    descricao_en: "Personal brand of Léo Maximiliano (@leommaximiliano), DSEC CEO and co-founder: the ecosystem's technical authority, run in yapping mode — he turns on the camera and talks, Kaleidos delivers topic + hook and handles all post-production repurposing. Positioning: the builder who explains the infrastructure of money.",
    fraseImpactante: "O builder que explica a infraestrutura do dinheiro — autoridade técnica sem roteiro engessado.",
    fraseImpactante_en: "The builder who explains the infrastructure of money — technical authority without a stiff script.",
    detalhes: "O Desafio\n\nO Léo é a autoridade técnica real do assunto: CEO da DSEC, construindo os trilhos (COLDKIT, Alfred P2P) enquanto a maioria só comenta. Mas a base era enxuta (2,6 mil seguidores na largada, perfil verificado) e o risco editorial era claro: escorregar pra conteúdo macro-político genérico e perder o diferencial técnico-Bitcoin.\n\nNossa Estratégia\n\nPosicionamos o Léo como \"o builder que explica a infraestrutura do dinheiro\" e respeitamos o jeito dele de produzir: modo yapping, sem roteiro — a Kaleidos entrega card de tema + 2-3 hooks + bullets, ele grava falando, e o time captura o material e multiplica no pós.\n\n• Pilares ponderados: infraestrutura do dinheiro e como Bitcoin funciona por dentro (40%), macro e crítica monetária (25%), bastidor de builder (15%), história da tecnologia e da liberdade (15%), soberania na prática no Brasil (5%)\n• Direção validada em dados do próprio perfil: o post campeão (\"complexo de vira-lata\" Brasil × EUA) fez ~350 curtidas num feed que rodava em 100-200\n• Sistema visual próprio: feed P&B com gancho forte, laranja #ea4705 como cor exclusiva dele\n• Cadência: 2 carrosséis por semana, reels gravados pelo próprio founder, stories diários, ~4-5 threads/mês no X e ~2 posts/mês no LinkedIn\n\nO Resultado\n\nOperação em andamento (início em jun-jul/2026): pipeline tema+hook rodando, estética aprovada pelo founder e relatório mensal nas 3 redes. Métricas consolidadas de antes e depois entram aqui conforme os ciclos mensais fecham.",
    detalhes_en: "The Challenge\n\nLéo is the real technical authority on the subject: DSEC's CEO, building the rails (COLDKIT, Alfred P2P) while most people just comment. But the base was lean (2.6k followers at the start, verified profile) and the editorial risk was clear: sliding into generic macro-political content and losing the technical-Bitcoin edge.\n\nOur Strategy\n\nWe positioned Léo as \"the builder who explains the infrastructure of money\" and respected how he produces: yapping mode, no script — Kaleidos delivers a topic card + 2-3 hooks + bullets, he records talking, and the team captures the material and multiplies it in post.\n\n• Weighted pillars: the infrastructure of money and how Bitcoin works inside (40%), macro and monetary critique (25%), builder behind-the-scenes (15%), history of technology and freedom (15%), sovereignty in practice in Brazil (5%)\n• Direction validated by the profile's own data: the champion post (Brazil × US \"mongrel complex\") did ~350 likes on a feed running at 100-200\n• A visual system of his own: B&W feed with strong hooks, orange #ea4705 as his exclusive color\n• Cadence: 2 carousels a week, reels recorded by the founder himself, daily stories, ~4-5 X threads/month and ~2 LinkedIn posts/month\n\nThe Result\n\nOperation in progress (started Jun-Jul/2026): topic+hook pipeline running, aesthetics approved by the founder and monthly reporting across the 3 networks. Consolidated before/after metrics land here as the monthly cycles close.",
    depoimentos: "",
    links: ["https://www.instagram.com/leommaximiliano/", "https://www.dseclab.io"],
    externalLink: "https://www.instagram.com/leommaximiliano/",
    externalLabel: "Ver no Instagram",
    externalLabel_en: "See on Instagram",
    metricas: "Operação de marca pessoal em andamento\n\nBase na largada (jun/2026): 2,6 mil seguidores no Instagram, perfil verificado — a autoridade técnica do ecossistema DSEC.\n\n• Modo yapping: Kaleidos entrega tema + hook, founder grava sem roteiro, repurpose no pós\n• 2 carrosséis/semana + reels do founder + stories diários\n• ~4-5 threads/mês no X + ~2 posts/mês no LinkedIn\n• Post campeão validado: ~350 curtidas vs feed de 100-200\n• Sistema visual P&B + laranja #ea4705 exclusivo\n• Relatório mensal nas 3 redes (IG + X + LinkedIn)",
    metricas_en: "Personal branding operation in progress\n\nStarting base (Jun/2026): 2.6k Instagram followers, verified profile — the DSEC ecosystem's technical authority.\n\n• Yapping mode: Kaleidos delivers topic + hook, founder records unscripted, repurposing in post\n• 2 carousels/week + founder-shot reels + daily stories\n• ~4-5 X threads/month + ~2 LinkedIn posts/month\n• Validated champion post: ~350 likes vs a 100-200 feed\n• B&W visual system + exclusive #ea4705 orange\n• Monthly report across 3 networks (IG + X + LinkedIn)",
    servicos: ["Marca Pessoal", "Estratégia de conteúdo", "Direcional tema + hook", "Repurpose", "Social Media", "Copywriting"],
    servicos_en: ["Personal Branding", "Content strategy", "Topic + hook direction", "Repurposing", "Social Media", "Copywriting"],
    media: []
  }
};
// Cases que possuem rota/página completa em /cases/<id> (pasta estática dedicada).
// Fonte única de verdade para listagem (cards clicáveis) e sitemap (evita URLs 404).
// Os demais cases em casesData são tratados como "Em breve" (sem rota ainda).
export const ROUTED_CASE_IDS: string[] = [
  "kaleidos",
  "investidor-4-20",
  "neobankless",
  "dsec",
  "alfred",
  "hugo-doria",
  "paradigma-education",
  "bit-das-minas",
  "buenas-ideias",
  "layla-foz",
  "defiverso",
  "crypto-com",
  "mercado-bitcoin",
  "jornal-cripto",
  "orlando",
  "yasmin",
  "defifest",
  "ledger",
];

export function getCaseData(id: string): CaseData | null {
  return casesData[id] || null;
}
export function getAllCases(): CaseData[] {
  return Object.values(casesData);
}
// Apenas os cases com página dedicada — usado pelo sitemap para não gerar 404.
export function getRoutedCases(): CaseData[] {
  return ROUTED_CASE_IDS.map((id) => casesData[id]).filter(Boolean) as CaseData[];
}