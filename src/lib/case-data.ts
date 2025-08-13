export interface CaseData {
  id: string;
  nome: string;
  tags: string[];
  descricao: string;
  descricao_en?: string;
  fraseImpactante: string;
  fraseImpactante_en?: string;
  detalhes: string;
  detalhes_en?: string;
  depoimentos?: string;
  links: string[];
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
}
// Dados dos cases com todo o conteúdo disponível
export const casesData: Record<string, CaseData> = {
  "defifest": {
    id: "defifest",
    nome: "Defifest",
    tags: ["Evento", "Cripto", "Design"],
    descricao: "Fizemos toda parte de visual do evento com diversos banners, cenas para transições entre palestras, pequenos motions e mais...",
    descricao_en: "We produced the entire visual identity of the event with banners, intermission scenes between talks, small motion pieces and more.",
    fraseImpactante: "O evento que revolucionou o DeFi brasileiro.",
    fraseImpactante_en: "The event that revolutionized Brazilian DeFi.",
    detalhes: "Defifest 2025 foi um evento organizado para a comunidade do investidor 4.20 (Lucas Amendola), com palestras de especialistas como Victor Castaneda, Mychel Mendes e Coruja Cripto, cobrindo temas como o futuro do Bitcoin, tributação cripto, DeFi em mercados de baixa e IA no setor. Destaques incluem networking com lunch, coffee breaks e happy hour all-inclusive, além de um show de encerramento com DJ renomado. O evento ocorreu em 7 de junho de 2025 no Clube Pinheiros, São Paulo, posicionando-se como uma revolução educacional e conectiva no DeFi brasileiro.",
    detalhes_en: "Defifest 2025 was an event organized for the Investidor 4.20 community (Lucas Amendola), with talks by experts such as Victor Castaneda, Mychel Mendes and Coruja Cripto, covering topics like Bitcoin’s future, crypto taxation, DeFi in bear markets and AI in the industry. Highlights included networking with lunch, coffee breaks and an all‑inclusive happy hour, plus a closing show with a renowned DJ. Held on June 7, 2025 at Clube Pinheiros (São Paulo), it positioned itself as an educational and connective revolution in Brazilian DeFi.",
    depoimentos: "Evento revolucionário que conectou a comunidade DeFi brasileira.",
    links: ["https://defiverso.com/defifest-2025/"],
    metricas: "Tivemos mais de 600 participantes em um evento de DeFi, com palestras e networking.",
    metricas_en: "Over 600 attendees in a DeFi event with talks and networking.",
    servicos: ["Design", "Motion", "Edição de vídeo", "Copywrite"],
    servicos_en: ["Design", "Motion", "Video editing", "Copywriting"],
    media: [
      { src: "/Conteudo_clientes/Defifest/1.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/4.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/6.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/7.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/8.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/9.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/10.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/13.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/16.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/17.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/22.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/23.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/24.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/30.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/31.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/68.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/71.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/76.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/77.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/78.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%201.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%202.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%203.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%204.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%205.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%206.png", type: "image" },
      { src: "/Conteudo_clientes/Defifest/Palestra%207.png", type: "image" },
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
    detalhes: "Mais de 4 lançamentos bem-sucedidos, incluindo cursos como 'Revolução Cripto' para iniciantes; crescimento orgânico via reels educativos e dicas práticas; newsletter 'Bit News' com análises semanais. O projeto reforça a missão de empoderamento feminino em cripto.",
    detalhes_en: "Over 4 successful launches, including beginner courses like 'Crypto Revolution'; organic growth through educational reels and practical tips; 'Bit News' newsletter with weekly analyses. The project reinforces the mission of empowering women in crypto.",
    depoimentos: "Crescimento exponencial no faturamento e engajamento da comunidade.",
    links: ["https://www.instagram.com/bitdasminas/?hl=en", "https://bitdasminas.com/", "https://news.bitdasminas.com/", "https://apps.apple.com/us/app/bit-das-minas/id6476791912"],
    metricas: "Editamos mais de 150 vídeos para anúncios; observamos um aumento de mais de 200% no faturamento dos lançamentos.",
    metricas_en: "Edited 150+ ad videos; observed 200%+ revenue growth in launches.",
    servicos: ["Edição de vídeo", "Copywrite", "Roteiro", "Lançamentos"],
    servicos_en: ["Video editing", "Copywriting", "Scripting", "Launches"],
    media: [
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-1-Gi-2.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/1.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-3-Gi.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/2.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-4-Gi.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/3.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-5-Gi.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/4.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-6-Gi.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/5.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-7-Gi-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/6.png"
      },
    ]
  },
  "layla-foz": {
    id: "layla-foz",
    nome: "Layla Foz",
    tags: ["Influencer", "Vídeo", "Reels", "Copywrite", "Newsletter"],
    descricao: "Edição de vídeo e criação de newsletters",
    descricao_en: "Video editing and newsletter creation",
    fraseImpactante: "Mais de 20 milhões de views nos reels.",
    fraseImpactante_en: "Over 20 million views on Reels.",
    detalhes: "Conteúdos editados que mantiveram a profundidade e criatividade de Layla, incluindo reels para engajamento e newsletters para nutrição de audiência; destaque para a qualidade excepcional que permitiu foco na inovação, elevando seu impacto em plataformas exigentes.",
    detalhes_en: "Edited content that preserved Layla's depth and creativity, including engagement reels and newsletters to nurture her audience; with exceptional quality enabling focus on innovation, boosting her impact on demanding platforms.",
    depoimentos: "Crescimento impressionante no Instagram e engajamento massivo nos reels.",
    links: ["https://www.instagram.com/laylafoz/"],
    metricas: "Crescimento no Instagram de 100 mil para 172 mil seguidores; mais de 20 milhões de views nos reels.",
    metricas_en: "Instagram growth from 100k to 172k followers; over 20M views on Reels.",
    servicos: ["Edição de vídeos", "Roteiros de Reels", "Newsletter"],
    servicos_en: ["Video editing", "Reels scripting", "Newsletter"],
    media: [
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels1.png", type: "image" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels2.png", type: "image" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels3.png", type: "image" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels4.png", type: "image" },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-1-Layla-1.mp4", 
        type: "video", 
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels1.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-2-Layla-1.mp4", 
        type: "video", 
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels2.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-3-Layla-1.mp4", 
        type: "video", 
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels3.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-4-Layla.mp4", 
        type: "video", 
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels4.png"
      },
    ]
  },
  "crypto-com": {
    id: "crypto-com",
    nome: "Crypto.com",
    tags: ["Cripto", "Copywrite", "Criação de conteúdo"],
    descricao: "Criação de conteúdo para instagram e twitter para o perfil da crypto.com",
    descricao_en: "Content creation for Instagram and Twitter for Crypto.com’s profile",
    fraseImpactante: "210% de aumento nas curtidas em social media.",
    fraseImpactante_en: "210% increase in social media likes.",
    detalhes: "Conteúdos personalizados que impulsionaram engajamento em Instagram e Twitter, alinhados à visão de simplicidade e segurança; posts sobre BTC, CRO e mais, contribuindo para o crescimento da plataforma.",
    detalhes_en: "Tailored content that boosted engagement on Instagram and Twitter, aligned with the vision of simplicity and security; posts about BTC, CRO and more, contributing to platform growth.",
    depoimentos: "Nenhum depoimento específico sobre Kaleidos encontrado, mas a plataforma é elogiada por agências crypto em geral.",
    links: ["https://www.instagram.com/cryptocomofficial/?hl=en", "https://twitter.com/cryptocom"],
    metricas: "Conseguimos um aumento médio de mais de 100% nas curtidas em social media.",
    metricas_en: "Achieved an average increase of over 100% in social media likes.",
    servicos: ["Copywrite", "Criação de conteúdo"],
    servicos_en: ["Copywriting", "Content creation"],
    media: [
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.37.16.png", type: "image" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.37.28.png", type: "image" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.45.29.png", type: "image" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.20.png", type: "image" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.26.png", type: "image" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.31.png", type: "image" },
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
    metricas: "Automatização de 6 posts diários, newsletters semanais, crescimento exponencial da audiência e posicionamento como referência no setor.",
    metricas_en: "Automation of 6 daily posts, weekly newsletters, exponential audience growth and positioning as a reference in the sector.",
    servicos: ["Criação de marca", "Identidade visual", "Desenvolvimento web", "Estratégia de marketing", "Tráfego pago", "Criação de conteúdo", "Automações", "Newsletter", "Webapp"],
    servicos_en: ["Brand creation", "Visual identity", "Web development", "Marketing strategy", "Paid traffic", "Content creation", "Automations", "Newsletter", "Webapp"],
    media: [
      { src: "/Conteudo_clientes/Jornal%20cripto/1-2.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/2-1.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/8.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/11-1.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/12.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/13-1.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/21-1.png", type: "image" },
      { src: "/Conteudo_clientes/Jornal%20cripto/22.png", type: "image" },
    ]
  },
  "mercado-bitcoin": {
    id: "mercado-bitcoin",
    nome: "Mercado Bitcoin",
    tags: ["Cripto", "Social Media", "Design"],
    descricao: "Criação de conteúdo para rede social, criamos conteúdo para instagram, twitter e linkedin por 18 meses para os perfis do mercado bitcoin",
    descricao_en: "Social content creation: Instagram, Twitter and LinkedIn for 18 months for Mercado Bitcoin’s profiles.",
    fraseImpactante: "180 posts criados em 18 meses.",
    fraseImpactante_en: "180 posts created in 18 months.",
    detalhes: "Desenvolvemos e executamos uma estratégia completa de conteúdo para o Mercado Bitcoin durante 18 meses consecutivos. Criamos mais de 180 posts originais para Instagram, Twitter e LinkedIn, cobrindo temas como economia digital, legislação pró-cripto, análises de mercado e educação financeira. Nossos conteúdos foram alinhados à visão da plataforma de tornar o mercado cripto acessível ao público brasileiro, resultando em engajamento significativo e fortalecimento da presença digital da marca. O trabalho incluiu criação de copywriting, design de posts, estratégia de calendário editorial e análise de performance para otimização contínua.",
    detalhes_en: "We developed and executed a complete content strategy for Mercado Bitcoin for 18 consecutive months. We created over 180 original posts for Instagram, Twitter and LinkedIn, covering topics like digital economy, pro‑crypto legislation, market analysis and financial education. Our content aligned with the platform’s mission to make crypto accessible to Brazilians, resulting in significant engagement and a stronger digital presence. Work included copywriting, post design, editorial calendar strategy and performance analysis for continuous optimization.",
    depoimentos: "Nenhum específico sobre Kaleidos, mas elogios gerais à plataforma em buscas.",
    links: ["https://www.mercadobitcoin.com.br/", "https://twitter.com/mercadobitcoin"],
    metricas: "Trouxemos mais de 180 posts para Instagram; ganhamos mais de 80 mil inscritos no período.",
    metricas_en: "Produced 180+ posts for Instagram; gained 80k+ followers in the period.",
    servicos: ["Criação de conteúdo", "Instagram", "Twitter", "LinkedIn"],
    servicos_en: ["Content creation", "Instagram", "Twitter", "LinkedIn"],
    media: [
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram2.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram3.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram4.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram5.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram6.png", type: "image" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram8.png", type: "image" },
    ]
  },
  "orlando": {
    id: "orlando",
    nome: "Orlando",
    tags: ["Cripto", "Educação", "PDF"],
    descricao: "Revisão e publicação de newsletter diária (crypto today), todos dias 7 da manhã, também escrevemos 3 ebooks, além da revisão e design do ebook",
    descricao_en: "Review and publication of a daily newsletter (crypto today) at 7am, plus we wrote 3 ebooks and handled review and design.",
    fraseImpactante: "3 ebooks educativos sobre crypto.",
    fraseImpactante_en: "3 educational crypto ebooks.",
    detalhes: "Newsletter publicada diariamente às 7h; 3 ebooks educativos sobre crypto; design que elevou a qualidade visual e legibilidade.",
    detalhes_en: "Daily newsletter at 7am; 3 educational crypto ebooks; design improvements that elevated visual quality and readability.",
    depoimentos: "Nenhum encontrado, mas buscas destacam newsletters como fontes confiáveis.",
    links: [],
    metricas: "Não especificadas para este projeto.",
    metricas_en: "Not specified for this project.",
    servicos: ["Newsletter diária", "Ebooks", "Design"],
    servicos_en: ["Daily newsletter", "Ebooks", "Design"],
    media: [
      { src: "/Conteudo_clientes/Orlando/Ebook%20custódia.pdf", type: "pdf" },
      { src: "/Conteudo_clientes/Orlando/Ebook%20de%20Opções%20e%20Realização%20de%20lucros.pdf", type: "pdf" },
      { src: "/Conteudo_clientes/Orlando/Ebook%20DeFi%20e%20Airdrop.pdf", type: "pdf" },
    ]
  },
  "yasmin": {
    id: "yasmin",
    nome: "Yasmin",
    tags: ["Influencer", "Reels", "Design"],
    descricao: "Fizemos edição de reels ara ela",
    descricao_en: "We edited Reels for her",
    fraseImpactante: "Reels virais com edição e animação.",
    fraseImpactante_en: "Viral Reels with editing and animation.",
    detalhes: "Reels editados para viralidade, usando técnicas como After Effects para conteúdos crypto impactantes.",
    detalhes_en: "Reels edited for virality, using techniques like After Effects for impactful crypto content.",
    depoimentos: "Nenhum específico.",
    links: [],
    metricas: "Não especificadas para este projeto.",
    metricas_en: "Not specified for this project.",
    servicos: ["Edição de reels"],
    servicos_en: ["Reels editing"],
    media: [
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-1-Yasmin-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/7.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-2-Yasmin-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/8.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-3-Yasmin.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/9.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-4-Yasmin.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/10.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-5-Yasmin.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/11.png"
      },
    ]
  },
  "investidor-4-20": {
    id: "investidor-4-20",
    nome: "Investidor 4.20",
    tags: ["Cripto", "Educação", "Influencer", "Lançamentos"],
    descricao: "Edição de vídeo (Reels e YouTube), desenvolvimento de toda parte comercial do zero, criação de newsletter do zero com 30 mil inscritos, copywriter, automações com IA(n8n), desenvolvimento de nova estratégia de lançamento, desenvolvimento de criativos para anúncios, em vídeos, estáticos e carrosséis, participação continua em lançamentos...",
    descricao_en: "Video editing (Reels and YouTube), built the entire commercial operation from scratch, created a newsletter from zero to 30k subscribers, copywriting, AI automations (n8n), new launch strategy, ad creatives (video, static and carousels), ongoing launch participation...",
    fraseImpactante: "Faturamento aumentou mais de 5 vezes desde nossa entrada.",
    fraseImpactante_en: "Revenue increased more than 5x since our arrival.",
    detalhes: "Iniciamos nossa parceria com o Investidor 4.20 em fevereiro de 2024, começando com a criação de uma newsletter do zero que hoje conta com mais de 30 mil inscritos orgânicos e taxa de abertura superior a 35%. Simultaneamente, assumimos a edição dos 3 vídeos semanais do YouTube e dos 7 reels semanais, elevando significativamente a qualidade e engajamento do conteúdo.\n\nLogo após o estabelecimento da base de conteúdo, expandimos nossa participação para os lançamentos, onde além de copywriting, design e edição de vídeo, colaboramos ativamente na estratégia de lançamento. Desenvolvemos uma estrutura comercial completa do zero para otimizar as vendas, incluindo o desenvolvimento de automações no WhatsApp e sistemas de follow-up.\n\nCom essa abordagem integrada, testemunhamos um crescimento extraordinário: o faturamento aumentou mais de 5 vezes desde nossa entrada. Desenvolvemos uma nova página de captura para lançamentos que revolucionou a conversão, além de criar mais de 200 criativos estáticos e mais de 100 vídeos para anúncios, todos otimizados para máxima performance.\n\nNossa parceria se estendeu para toda a construção e gestão do crescimento orgânico, estabelecendo o Investidor 4.20 como uma das principais referências no setor cripto brasileiro, com uma comunidade engajada e resultados consistentes em todos os canais.",
    detalhes_en: "We started our partnership with Investidor 4.20 in February 2024 by creating a newsletter from scratch, which today has over 30k organic subscribers and an open rate above 35%. At the same time, we took over editing 3 weekly YouTube videos and 7 weekly Reels, significantly raising content quality and engagement.\n\nAfter establishing the content base, we expanded to launches where, in addition to copywriting, design and video editing, we actively collaborated on the launch strategy. We built a complete commercial structure from scratch to optimize sales, including WhatsApp automations and follow-up systems.\n\nWith this integrated approach, we witnessed extraordinary growth: revenue increased more than 5x since our arrival. We developed a new capture page for launches that revolutionized conversion, and created over 200 static creatives and 100+ ad videos, all optimized for maximum performance.\n\nOur partnership extended to building and managing organic growth across channels, positioning Investidor 4.20 as a top reference in Brazil’s crypto sector with an engaged community and consistent results.",
    depoimentos: "Nenhum específico, mas posts destacam crescimento.",
    links: ["https://twitter.com/investidor420", "https://www.instagram.com/lucas.amendolaa/", "https://news.defiverso.com", "https://defiverso.com/pagina-de-captura/"],
    metricas: "Crescimento no Instagram de 50 mil para 180 mil seguidores; no YouTube de 200 mil para 382 mil inscritos; newsletter com 30 mil inscritos e 35% de abertura; faturamento aumentou mais de 5 vezes.",
    metricas_en: "Instagram growth from 50k to 180k followers; YouTube from 200k to 382k subscribers; newsletter with 30k subscribers and 35% open rate; revenue increased more than 5x.",
    servicos: ["Edição de vídeos", "Desenvolvimento comercial", "Newsletter", "Copywriter", "Automações IA", "Estratégias de lançamento", "Criativos para anúncios", "Páginas de captura", "Design"],
    servicos_en: ["Video editing", "Commercial development", "Newsletter", "Copywriting", "AI automations", "Launch strategies", "Ad creatives", "Capture pages", "Design"],
    media: [
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-1-Lucas-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/12.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-2-Lucas-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/13.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-3-Lucas.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/14.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-4-Lucas.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/15.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Palestrantes-Defifest-2025-Video-1.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/16.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-6-Lucas.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/17.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-7-Lucas.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/18.png"
      },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio1.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio2.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio3.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura1.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura2.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura4.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura5.png", type: "image" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura13.png", type: "image" },
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
    detalhes: "Desenvolvimento de vídeos educativos com edição avançada, motion graphics e animações personalizadas. Trabalho focado em transformar cortes de podcast em conteúdo visualmente atrativo e educativo, utilizando técnicas de motion design para engajar a audiência.",
    detalhes_en: "Development of educational videos with advanced editing, motion graphics and custom animations. Work focused on turning podcast cuts into visually appealing educational content, using motion design techniques to engage the audience.",
    depoimentos: "Nenhum depoimento específico encontrado, mas o conteúdo demonstra alta qualidade técnica e educacional.",
    links: [],
    metricas: "Vídeos educativos com motion e animação para engajamento da audiência.",
    metricas_en: "Educational videos with motion and animation to engage the audience.",
    servicos: ["Edição de vídeo", "Motion Graphics", "Animação", "Cortes de Podcast"],
    servicos_en: ["Video editing", "Motion graphics", "Animation", "Podcast cuts"],
    media: [
      { 
        src: "/Conteudo_clientes/Paradigma/20250620_PARADIGMA_01M06S_V3.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/19.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/20250702_PARADIGMA_01M13S.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/20.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/PARADIGMAv2.mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/21.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/20250717_PARADIGMA_01M20S_V2(1).mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/22.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/20250722_PARADIGMA_01M55S_V2(1).mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/23.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/PARADIGMA%20v2(1).mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/24.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/20250801_PARADIGMA_00M40S_V1(1).mp4", 
        type: "video", 
        poster: "/Imagens/Elementos/25.png"
      },
    ]
  },
  "defiverso": {
    id: "defiverso",
    nome: "Defiverso",
    tags: ["Cripto", "Educação", "Social Media", "Desenvolvimento Web"],
    descricao: "Criação de conteúdo do zero para Instagram, Twitter e grupo de WhatsApp. Desenvolvimento de toda estratégia de social media e alcance de 8 mil seguidores em 2 meses.",
    descricao_en: "Content creation from scratch for Instagram, Twitter and WhatsApp group. Full social media strategy reaching 8k followers in 2 months.",
    fraseImpactante: "8 mil seguidores em apenas 2 meses de trabalho.",
    fraseImpactante_en: "8k followers in just 2 months.",
    detalhes: "Desenvolvemos toda a estratégia de social media do Defiverso do zero, criando conteúdo exclusivo para Instagram, Twitter e grupo de WhatsApp. Nossa abordagem focada em educação cripto e insights de mercado resultou em um crescimento impressionante: alcançamos 8 mil seguidores em apenas 2 meses de trabalho.\n\nCriamos posts educativos, carrosséis informativos e conteúdo que posiciona o Defiverso como referência no setor cripto brasileiro. O trabalho incluiu desenvolvimento de identidade visual para redes sociais, calendário editorial estratégico e gestão completa das plataformas.\n\nAlém do social media, participamos do desenvolvimento da plataforma web principal e da comunidade Discord, estabelecendo o Defiverso como a maior plataforma educacional cripto do Brasil.",
    detalhes_en: "We developed Defiverso’s entire social media strategy from scratch, creating exclusive content for Instagram, Twitter and WhatsApp. Our crypto education focus and market insights delivered impressive growth: we reached 8k followers in just 2 months.\n\nWe created educational posts, informative carousels and content that positions Defiverso as a reference in Brazil’s crypto sector. The work included visual identity for social media, strategic editorial calendar and full platform management.\n\nBeyond social, we contributed to the main web platform and the Discord community, establishing Defiverso as the largest crypto education platform in Brazil.",
    depoimentos: "Crescimento exponencial em social media e posicionamento como referência no setor cripto.",
    links: ["https://defiverso.com", "https://news.defiverso.com", "https://www.instagram.com/defiverso/"],
    metricas: "8 mil seguidores em 2 meses, crescimento exponencial em engajamento, posicionamento como referência no setor cripto.",
    metricas_en: "8k followers in 2 months, exponential engagement growth, positioned as a reference in the crypto sector.",
    servicos: ["Social Media", "Criação de conteúdo", "Desenvolvimento web", "Estratégia de marketing", "Gestão de comunidade"],
    servicos_en: ["Social Media", "Content creation", "Web development", "Marketing strategy", "Community management"],
    media: [
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.02.27.png", 
        type: "image", 
        link: "https://www.instagram.com/p/DLpl-wfx2FQ/?img_index=1"
      },
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.09.png", 
        type: "image", 
        link: "https://www.instagram.com/p/DMdHCjWxjxg/?img_index=1"
      },
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.13.png", 
        type: "image", 
        link: "https://www.instagram.com/p/DMXysRxxHEH/?img_index=1"
      },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.19.png", type: "image" },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.48.png", type: "image" },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.04.56.png", type: "image" },
    ]
  }
};
export function getCaseData(id: string): CaseData | null {
  return casesData[id] || null;
}
export function getAllCases(): CaseData[] {
  return Object.values(casesData);
} 