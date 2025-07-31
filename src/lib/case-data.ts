export interface CaseData {
  id: string;
  nome: string;
  tags: string[];
  descricao: string;
  fraseImpactante: string;
  detalhes: string;
  depoimentos?: string;
  links: string[];
  metricas: string;
  servicos: string[];
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
    fraseImpactante: "O evento que revolucionou o DeFi brasileiro.",
    detalhes: "Defifest 2025 foi um evento organizado para a comunidade do investidor 4.20 (Lucas Amendola), com palestras de especialistas como Victor Castaneda, Mychel Mendes e Coruja Cripto, cobrindo temas como o futuro do Bitcoin, tributação cripto, DeFi em mercados de baixa e IA no setor. Destaques incluem networking com lunch, coffee breaks e happy hour all-inclusive, além de um show de encerramento com DJ renomado. O evento ocorreu em 7 de junho de 2025 no Clube Pinheiros, São Paulo, posicionando-se como uma revolução educacional e conectiva no DeFi brasileiro.",
    depoimentos: "Evento revolucionário que conectou a comunidade DeFi brasileira.",
    links: ["https://defiverso.com/defifest-2025/"],
    metricas: "Tivemos mais de 600 participantes em um evento de DeFi, com palestras e networking.",
    servicos: ["Design", "Motion", "Edição de vídeo", "Copywrite"],
    media: [
      { src: "/Conteudo_clientes/Defifest/1.png", type: "image", alt: "Design Defifest 1" },
      { src: "/Conteudo_clientes/Defifest/4.png", type: "image", alt: "Design Defifest 4" },
      { src: "/Conteudo_clientes/Defifest/6.png", type: "image", alt: "Design Defifest 6" },
      { src: "/Conteudo_clientes/Defifest/7.png", type: "image", alt: "Design Defifest 7" },
      { src: "/Conteudo_clientes/Defifest/8.png", type: "image", alt: "Design Defifest 8" },
      { src: "/Conteudo_clientes/Defifest/9.png", type: "image", alt: "Design Defifest 9" },
      { src: "/Conteudo_clientes/Defifest/10.png", type: "image", alt: "Design Defifest 10" },
      { src: "/Conteudo_clientes/Defifest/13.png", type: "image", alt: "Design Defifest 13" },
      { src: "/Conteudo_clientes/Defifest/16.png", type: "image", alt: "Design Defifest 16" },
      { src: "/Conteudo_clientes/Defifest/17.png", type: "image", alt: "Design Defifest 17" },
      { src: "/Conteudo_clientes/Defifest/22.png", type: "image", alt: "Design Defifest 22" },
      { src: "/Conteudo_clientes/Defifest/23.png", type: "image", alt: "Design Defifest 23" },
      { src: "/Conteudo_clientes/Defifest/24.png", type: "image", alt: "Design Defifest 24" },
      { src: "/Conteudo_clientes/Defifest/30.png", type: "image", alt: "Design Defifest 30" },
      { src: "/Conteudo_clientes/Defifest/31.png", type: "image", alt: "Design Defifest 31" },
      { src: "/Conteudo_clientes/Defifest/68.png", type: "image", alt: "Design Defifest 68" },
      { src: "/Conteudo_clientes/Defifest/71.png", type: "image", alt: "Design Defifest 71" },
      { src: "/Conteudo_clientes/Defifest/76.png", type: "image", alt: "Design Defifest 76" },
      { src: "/Conteudo_clientes/Defifest/77.png", type: "image", alt: "Design Defifest 77" },
      { src: "/Conteudo_clientes/Defifest/78.png", type: "image", alt: "Design Defifest 78" },
      { src: "/Conteudo_clientes/Defifest/Palestra%201.png", type: "image", alt: "Palestra 1" },
      { src: "/Conteudo_clientes/Defifest/Palestra%202.png", type: "image", alt: "Palestra 2" },
      { src: "/Conteudo_clientes/Defifest/Palestra%203.png", type: "image", alt: "Palestra 3" },
      { src: "/Conteudo_clientes/Defifest/Palestra%204.png", type: "image", alt: "Palestra 4" },
      { src: "/Conteudo_clientes/Defifest/Palestra%205.png", type: "image", alt: "Palestra 5" },
      { src: "/Conteudo_clientes/Defifest/Palestra%206.png", type: "image", alt: "Palestra 6" },
      { src: "/Conteudo_clientes/Defifest/Palestra%207.png", type: "image", alt: "Palestra 7" },
    ]
  },
  "bit-das-minas": {
    id: "bit-das-minas",
    nome: "Bit das Minas",
    tags: ["Reels", "Roteiros"],
    descricao: "Trabalhamos com edição de vídeo, copywrite e roteiro para vídeos e para anuncios, fizemos mais de 4 lançamentos e trabalhamos para construção de reels para crescimento orgânico do perfil",
    fraseImpactante: "200% de aumento no faturamento dos lançamentos e diminuição de 50% de custo por lead.",
    detalhes: "Mais de 4 lançamentos bem-sucedidos, incluindo cursos como 'Revolução Cripto' para iniciantes; crescimento orgânico via reels educativos e dicas práticas; newsletter 'Bit News' com análises semanais. O projeto reforça a missão de empoderamento feminino em cripto.",
    depoimentos: "Crescimento exponencial no faturamento e engajamento da comunidade.",
    links: ["https://www.instagram.com/bitdasminas/?hl=en", "https://bitdasminas.com/", "https://news.bitdasminas.com/", "https://apps.apple.com/us/app/bit-das-minas/id6476791912"],
    metricas: "Editamos mais de 150 vídeos para anúncios; observamos um aumento de mais de 200% no faturamento dos lançamentos.",
    servicos: ["Edição de vídeo", "Copywrite", "Roteiro", "Lançamentos"],
    media: [
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-1-Gi-2.mp4", 
        type: "video", 
        alt: "Reels Gi 1",
        poster: "/Imagens/Elementos/1.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-3-Gi.mp4", 
        type: "video", 
        alt: "Reels Gi 3",
        poster: "/Imagens/Elementos/2.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-4-Gi.mp4", 
        type: "video", 
        alt: "Reels Gi 4",
        poster: "/Imagens/Elementos/3.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-5-Gi.mp4", 
        type: "video", 
        alt: "Reels Gi 5",
        poster: "/Imagens/Elementos/4.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-6-Gi.mp4", 
        type: "video", 
        alt: "Reels Gi 6",
        poster: "/Imagens/Elementos/5.png"
      },
      { 
        src: "/Conteudo_clientes/Bit%20das%20minas/Reels-7-Gi-1.mp4", 
        type: "video", 
        alt: "Reels Gi 7",
        poster: "/Imagens/Elementos/6.png"
      },
    ]
  },
  "layla-foz": {
    id: "layla-foz",
    nome: "Layla Foz",
    tags: ["Influencer", "Vídeo", "Reels", "Copywrite", "Newsletter"],
    descricao: "Edição de vídeo e criação de newsletters",
    fraseImpactante: "Mais de 20 milhões de views nos reels.",
    detalhes: "Conteúdos editados que mantiveram a profundidade e criatividade de Layla, incluindo reels para engajamento e newsletters para nutrição de audiência; destaque para a qualidade excepcional que permitiu foco na inovação, elevando seu impacto em plataformas exigentes.",
    depoimentos: "Crescimento impressionante no Instagram e engajamento massivo nos reels.",
    links: ["https://www.instagram.com/laylafoz/"],
    metricas: "Crescimento no Instagram de 100 mil para 172 mil seguidores; mais de 20 milhões de views nos reels.",
    servicos: ["Edição de vídeos", "Roteiros de Reels", "Newsletter"],
    media: [
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels1.png", type: "image", alt: "Capa Reels Layla 1" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels2.png", type: "image", alt: "Capa Reels Layla 2" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels3.png", type: "image", alt: "Capa Reels Layla 3" },
      { src: "/Conteudo_clientes/Layla%20Foz/Capa_Reels4.png", type: "image", alt: "Capa Reels Layla 4" },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-1-Layla-1.mp4", 
        type: "video", 
        alt: "Reels Layla 1",
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels1.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-2-Layla-1.mp4", 
        type: "video", 
        alt: "Reels Layla 2",
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels2.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-3-Layla-1.mp4", 
        type: "video", 
        alt: "Reels Layla 3",
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels3.png"
      },
      { 
        src: "/Conteudo_clientes/Layla%20Foz/Reels-4-Layla.mp4", 
        type: "video", 
        alt: "Reels Layla 4",
        poster: "/Conteudo_clientes/Layla%20Foz/Capa_Reels4.png"
      },
    ]
  },
  "crypto-com": {
    id: "crypto-com",
    nome: "Crypto.com",
    tags: ["Cripto", "Copywrite", "Criação de conteúdo"],
    descricao: "Criação de conteúdo para instagram e twitter para o perfil da crypto.com",
    fraseImpactante: "210% de aumento nas curtidas em social media.",
    detalhes: "Conteúdos personalizados que impulsionaram engajamento em Instagram e Twitter, alinhados à visão de simplicidade e segurança; posts sobre BTC, CRO e mais, contribuindo para o crescimento da plataforma.",
    depoimentos: "Nenhum depoimento específico sobre Kaleidos encontrado, mas a plataforma é elogiada por agências crypto em geral.",
    links: ["https://www.instagram.com/cryptocomofficial/?hl=en", "https://twitter.com/cryptocom"],
    metricas: "Conseguimos um aumento médio de mais de 100% nas curtidas em social media.",
    servicos: ["Copywrite", "Criação de conteúdo"],
    media: [
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.37.16.png", type: "image", alt: "Crypto.com Tweet 1" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.37.28.png", type: "image", alt: "Crypto.com Tweet 2" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.45.29.png", type: "image", alt: "Crypto.com Tweet 3" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.20.png", type: "image", alt: "Crypto.com Tweet 4" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.26.png", type: "image", alt: "Crypto.com Tweet 5" },
      { src: "/Conteudo_clientes/Crypto.com/Captura%20de%20Tela%202025-07-26%20às%2022.46.31.png", type: "image", alt: "Crypto.com Tweet 6" },
    ]
  },
  "jornal-cripto": {
    id: "jornal-cripto",
    nome: "Jornal Cripto",
    tags: ["Cripto", "Educação", "Design", "Desenvolvimento Web", "Marketing Digital"],
    descricao: "Participamos desde a criação da marca, construção de toda identidade visual, desenvolvimento de estratégia, captação, tráfego pago, criação de conteúdo orgânico e para anúncios pagos e desenvolvimento web.",
    fraseImpactante: "6 posts automáticos por dia via n8n e crescimento exponencial da audiência.",
    detalhes: "Participamos desde o zero na criação completa do Jornal Cripto. Desenvolvemos toda a identidade visual da marca, incluindo logo, paleta de cores e personagem principal. Criamos e implementamos a estratégia de marketing digital completa, desde captação de leads até retenção de audiência. Desenvolvemos três plataformas web: jornalcripto.com (site principal), news.jornalcripto.com (newsletter) e radar.jornalcripto.com (webapp para insights em tempo real). Implementamos automações via n8n para 6 blog posts diários e newsletters manuais 2x/semana. Gerenciamos campanhas de tráfego pago que impulsionaram significativamente a audiência. Criamos conteúdo orgânico e para anúncios pagos, estabelecendo o Jornal Cripto como referência no setor cripto brasileiro.",
    depoimentos: "Projeto completo que transformou uma ideia em uma das principais referências do setor cripto no Brasil.",
    links: ["https://news.jornalcripto.com", "https://jornalcripto.com", "https://radar.jornalcripto.com"],
    metricas: "Automatização de 6 posts diários, newsletters semanais, crescimento exponencial da audiência e posicionamento como referência no setor.",
    servicos: ["Criação de marca", "Identidade visual", "Desenvolvimento web", "Estratégia de marketing", "Tráfego pago", "Criação de conteúdo", "Automações", "Newsletter", "Webapp"],
    media: [
      { src: "/Conteudo_clientes/Jornal%20cripto/1-2.png", type: "image", alt: "Jornal Cripto - Newsletter" },
      { src: "/Conteudo_clientes/Jornal%20cripto/2-1.png", type: "image", alt: "Jornal Cripto - Site Principal" },
      { src: "/Conteudo_clientes/Jornal%20cripto/8.png", type: "image", alt: "Jornal Cripto - Radar App" },
      { src: "/Conteudo_clientes/Jornal%20cripto/11-1.png", type: "image", alt: "Jornal Cripto - Conteúdo 1" },
      { src: "/Conteudo_clientes/Jornal%20cripto/12.png", type: "image", alt: "Jornal Cripto - Conteúdo 2" },
      { src: "/Conteudo_clientes/Jornal%20cripto/13-1.png", type: "image", alt: "Jornal Cripto - Conteúdo 3" },
      { src: "/Conteudo_clientes/Jornal%20cripto/21-1.png", type: "image", alt: "Jornal Cripto - Conteúdo 4" },
      { src: "/Conteudo_clientes/Jornal%20cripto/22.png", type: "image", alt: "Jornal Cripto - Conteúdo 5" },
    ]
  },
  "mercado-bitcoin": {
    id: "mercado-bitcoin",
    nome: "Mercado Bitcoin",
    tags: ["Cripto", "Social Media", "Design"],
    descricao: "Criação de conteúdo para rede social, criamos conteúdo para instagram, twitter e linkedin por 18 meses para os perfis do mercado bitcoin",
    fraseImpactante: "180 posts criados em 18 meses.",
    detalhes: "Desenvolvemos e executamos uma estratégia completa de conteúdo para o Mercado Bitcoin durante 18 meses consecutivos. Criamos mais de 180 posts originais para Instagram, Twitter e LinkedIn, cobrindo temas como economia digital, legislação pró-cripto, análises de mercado e educação financeira. Nossos conteúdos foram alinhados à visão da plataforma de tornar o mercado cripto acessível ao público brasileiro, resultando em engajamento significativo e fortalecimento da presença digital da marca. O trabalho incluiu criação de copywriting, design de posts, estratégia de calendário editorial e análise de performance para otimização contínua.",
    depoimentos: "Nenhum específico sobre Kaleidos, mas elogios gerais à plataforma em buscas.",
    links: ["https://www.mercadobitcoin.com.br/", "https://twitter.com/mercadobitcoin"],
    metricas: "Trouxemos mais de 180 posts para Instagram; ganhamos mais de 80 mil inscritos no período.",
    servicos: ["Criação de conteúdo", "Instagram", "Twitter", "LinkedIn"],
    media: [
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram.png", type: "image", alt: "Mercado Bitcoin Post 1" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram2.png", type: "image", alt: "Mercado Bitcoin Post 2" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram3.png", type: "image", alt: "Mercado Bitcoin Post 3" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram4.png", type: "image", alt: "Mercado Bitcoin Post 4" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram5.png", type: "image", alt: "Mercado Bitcoin Post 5" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram6.png", type: "image", alt: "Mercado Bitcoin Post 6" },
      { src: "/Conteudo_clientes/Mercado%20Bitcoin/Instagram8.png", type: "image", alt: "Mercado Bitcoin Post 8" },
    ]
  },
  "orlando": {
    id: "orlando",
    nome: "Orlando",
    tags: ["Cripto", "Educação", "PDF"],
    descricao: "Revisão e publicação de newsletter diária (crypto today), todos dias 7 da manhã, também escrevemos 3 ebooks, além da revisão e design do ebook",
    fraseImpactante: "3 ebooks educativos sobre crypto.",
    detalhes: "Newsletter publicada diariamente às 7h; 3 ebooks educativos sobre crypto; design que elevou a qualidade visual e legibilidade.",
    depoimentos: "Nenhum encontrado, mas buscas destacam newsletters como fontes confiáveis.",
    links: [],
    metricas: "Não especificadas para este projeto.",
    servicos: ["Newsletter diária", "Ebooks", "Design"],
    media: [
      { src: "/Conteudo_clientes/Orlando/Ebook%20custódia.pdf", type: "pdf", alt: "Ebook Custódia" },
      { src: "/Conteudo_clientes/Orlando/Ebook%20de%20Opções%20e%20Realização%20de%20lucros.pdf", type: "pdf", alt: "Ebook Opções" },
      { src: "/Conteudo_clientes/Orlando/Ebook%20DeFi%20e%20Airdrop.pdf", type: "pdf", alt: "Ebook DeFi" },
    ]
  },
  "yasmin": {
    id: "yasmin",
    nome: "Yasmin",
    tags: ["Influencer", "Reels", "Design"],
    descricao: "Fizemos edição de reels ara ela",
    fraseImpactante: "Reels virais com edição e animação.",
    detalhes: "Reels editados para viralidade, usando técnicas como After Effects para conteúdos crypto impactantes.",
    depoimentos: "Nenhum específico.",
    links: [],
    metricas: "Não especificadas para este projeto.",
    servicos: ["Edição de reels"],
    media: [
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-1-Yasmin-1.mp4", 
        type: "video", 
        alt: "Reels Yasmin 1",
        poster: "/Imagens/Elementos/7.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-2-Yasmin-1.mp4", 
        type: "video", 
        alt: "Reels Yasmin 2",
        poster: "/Imagens/Elementos/8.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-3-Yasmin.mp4", 
        type: "video", 
        alt: "Reels Yasmin 3",
        poster: "/Imagens/Elementos/9.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-4-Yasmin.mp4", 
        type: "video", 
        alt: "Reels Yasmin 4",
        poster: "/Imagens/Elementos/10.png"
      },
      { 
        src: "/Conteudo_clientes/Yasmin/Reels-5-Yasmin.mp4", 
        type: "video", 
        alt: "Reels Yasmin 5",
        poster: "/Imagens/Elementos/11.png"
      },
    ]
  },
  "investidor-4-20": {
    id: "investidor-4-20",
    nome: "Investidor 4.20",
    tags: ["Cripto", "Educação", "Influencer", "Lançamentos"],
    descricao: "Edição de vídeo (Reels e YouTube), desenvolvimento de toda parte comercial do zero, criação de newsletter do zero com 30 mil inscritos, copywriter, automações com IA(n8n), desenvolvimento de nova estratégia de lançamento, desenvolvimento de criativos para anúncios, em vídeos, estáticos e carrosséis, participação continua em lançamentos...",
    fraseImpactante: "Faturamento aumentou mais de 5 vezes desde nossa entrada.",
    detalhes: "Iniciamos nossa parceria com o Investidor 4.20 em fevereiro de 2024, começando com a criação de uma newsletter do zero que hoje conta com mais de 30 mil inscritos orgânicos e taxa de abertura superior a 35%. Simultaneamente, assumimos a edição dos 3 vídeos semanais do YouTube e dos 7 reels semanais, elevando significativamente a qualidade e engajamento do conteúdo.\n\nLogo após o estabelecimento da base de conteúdo, expandimos nossa participação para os lançamentos, onde além de copywriting, design e edição de vídeo, colaboramos ativamente na estratégia de lançamento. Desenvolvemos uma estrutura comercial completa do zero para otimizar as vendas, incluindo o desenvolvimento de automações no WhatsApp e sistemas de follow-up.\n\nCom essa abordagem integrada, testemunhamos um crescimento extraordinário: o faturamento aumentou mais de 5 vezes desde nossa entrada. Desenvolvemos uma nova página de captura para lançamentos que revolucionou a conversão, além de criar mais de 200 criativos estáticos e mais de 100 vídeos para anúncios, todos otimizados para máxima performance.\n\nNossa parceria se estendeu para toda a construção e gestão do crescimento orgânico, estabelecendo o Investidor 4.20 como uma das principais referências no setor cripto brasileiro, com uma comunidade engajada e resultados consistentes em todos os canais.",
    depoimentos: "Nenhum específico, mas posts destacam crescimento.",
    links: ["https://twitter.com/investidor420", "https://www.instagram.com/lucas.amendolaa/", "https://news.defiverso.com", "https://defiverso.com/pagina-de-captura/"],
    metricas: "Crescimento no Instagram de 50 mil para 180 mil seguidores; no YouTube de 200 mil para 382 mil inscritos; newsletter com 30 mil inscritos e 35% de abertura; faturamento aumentou mais de 5 vezes.",
    servicos: ["Edição de vídeos", "Desenvolvimento comercial", "Newsletter", "Copywriter", "Automações IA", "Estratégias de lançamento", "Criativos para anúncios", "Páginas de captura", "Design"],
    media: [
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-1-Lucas-1.mp4", 
        type: "video", 
        alt: "Reels Lucas 1",
        poster: "/Imagens/Elementos/12.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-2-Lucas-1.mp4", 
        type: "video", 
        alt: "Reels Lucas 2",
        poster: "/Imagens/Elementos/13.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-3-Lucas.mp4", 
        type: "video", 
        alt: "Reels Lucas 3",
        poster: "/Imagens/Elementos/14.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-4-Lucas.mp4", 
        type: "video", 
        alt: "Reels Lucas 4",
        poster: "/Imagens/Elementos/15.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Palestrantes-Defifest-2025-Video-1.mp4", 
        type: "video", 
        alt: "Palestrantes Defifest 2025",
        poster: "/Imagens/Elementos/16.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-6-Lucas.mp4", 
        type: "video", 
        alt: "Reels Lucas 6",
        poster: "/Imagens/Elementos/17.png"
      },
      { 
        src: "/Conteudo_clientes/Investidor%204.20/Reels-7-Lucas.mp4", 
        type: "video", 
        alt: "Reels Lucas 7",
        poster: "/Imagens/Elementos/18.png"
      },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio1.png", type: "image", alt: "Criativo Anúncio 1" },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio2.png", type: "image", alt: "Criativo Anúncio 2" },
      { src: "/Conteudo_clientes/Investidor%204.20/Criativoanuncio3.png", type: "image", alt: "Criativo Anúncio 3" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura1.png", type: "image", alt: "Página Captura 1" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura2.png", type: "image", alt: "Página Captura 2" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura4.png", type: "image", alt: "Página Captura 4" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura5.png", type: "image", alt: "Página Captura 5" },
      { src: "/Conteudo_clientes/Investidor%204.20/pagina%20de%20captura/páginacaptura13.png", type: "image", alt: "Página Captura 13" },
    ]
  },
  "paradigma-education": {
    id: "paradigma-education",
    nome: "Paradigma Education",
    tags: ["Educação", "Vídeo", "Motion", "Animação", "Podcast"],
    descricao: "Edição de vídeo com motion, animação e cortes de podcast para conteúdo educativo",
    fraseImpactante: "Vídeos educativos com motion e animação.",
    detalhes: "Desenvolvimento de vídeos educativos com edição avançada, motion graphics e animações personalizadas. Trabalho focado em transformar cortes de podcast em conteúdo visualmente atrativo e educativo, utilizando técnicas de motion design para engajar a audiência.",
    depoimentos: "Nenhum depoimento específico encontrado, mas o conteúdo demonstra alta qualidade técnica e educacional.",
    links: [],
    metricas: "Vídeos educativos com motion e animação para engajamento da audiência.",
    servicos: ["Edição de vídeo", "Motion Graphics", "Animação", "Cortes de Podcast"],
    media: [
      { 
        src: "/Conteudo_clientes/Paradigma/PARADIGMA_2.mp4", 
        type: "video", 
        alt: "Paradigma Education - Vídeo Principal",
        poster: "/Imagens/Elementos/19.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/PARADIGMA_3.mp4", 
        type: "video", 
        alt: "Paradigma Education - Motion 1",
        poster: "/Imagens/Elementos/20.png"
      },
      { 
        src: "/Conteudo_clientes/Paradigma/PARADIGMA_1.mp4", 
        type: "video", 
        alt: "Paradigma Education - Motion 2",
        poster: "/Imagens/Elementos/21.png"
      },
    ]
  },
  "defiverso": {
    id: "defiverso",
    nome: "Defiverso",
    tags: ["Cripto", "Educação", "Social Media", "Desenvolvimento Web"],
    descricao: "Criação de conteúdo do zero para Instagram, Twitter e grupo de WhatsApp. Desenvolvimento de toda estratégia de social media e alcance de 8 mil seguidores em 2 meses.",
    fraseImpactante: "8 mil seguidores em apenas 2 meses de trabalho.",
    detalhes: "Desenvolvemos toda a estratégia de social media do Defiverso do zero, criando conteúdo exclusivo para Instagram, Twitter e grupo de WhatsApp. Nossa abordagem focada em educação cripto e insights de mercado resultou em um crescimento impressionante: alcançamos 8 mil seguidores em apenas 2 meses de trabalho.\n\nCriamos posts educativos, carrosséis informativos e conteúdo que posiciona o Defiverso como referência no setor cripto brasileiro. O trabalho incluiu desenvolvimento de identidade visual para redes sociais, calendário editorial estratégico e gestão completa das plataformas.\n\nAlém do social media, participamos do desenvolvimento da plataforma web principal e da comunidade Discord, estabelecendo o Defiverso como a maior plataforma educacional cripto do Brasil.",
    depoimentos: "Crescimento exponencial em social media e posicionamento como referência no setor cripto.",
    links: ["https://defiverso.com", "https://news.defiverso.com", "https://www.instagram.com/defiverso/"],
    metricas: "8 mil seguidores em 2 meses, crescimento exponencial em engajamento, posicionamento como referência no setor cripto.",
    servicos: ["Social Media", "Criação de conteúdo", "Desenvolvimento web", "Estratégia de marketing", "Gestão de comunidade"],
    media: [
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.02.27.png", 
        type: "image", 
        alt: "Você conhece o defiverso?",
        link: "https://www.instagram.com/p/DLpl-wfx2FQ/?img_index=1"
      },
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.09.png", 
        type: "image", 
        alt: "4 coisas que você deveria fazer toda manhã",
        link: "https://www.instagram.com/p/DMdHCjWxjxg/?img_index=1"
      },
      { 
        src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.13.png", 
        type: "image", 
        alt: "Altcoin season é só um blefe",
        link: "https://www.instagram.com/p/DMXysRxxHEH/?img_index=1"
      },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.19.png", type: "image", alt: "Post Defiverso 4" },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.03.48.png", type: "image", alt: "Post Defiverso 5" },
      { src: "/Conteudo_clientes/Defiverso/Captura%20de%20Tela%202025-07-27%20às%2000.04.56.png", type: "image", alt: "Post Defiverso 6" },
    ]
  }
};

export function getCaseData(id: string): CaseData | null {
  return casesData[id] || null;
}

export function getAllCases(): CaseData[] {
  return Object.values(casesData);
} 