export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  const twitterHandle = (process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@digitalkaleidos").replace(/^@/, "");
  // TODO Gabriel: preencher dados reais quando disponiveis
  // - NEXT_PUBLIC_KALEIDOS_PHONE: telefone/WhatsApp em formato E.164 (ex: +5512999999999)
  // - NEXT_PUBLIC_KALEIDOS_TAX_ID: CNPJ formatado (ex: 00.000.000/0000-00)
  // - NEXT_PUBLIC_KALEIDOS_STREET / POSTAL_CODE: endereco fiscal completo
  const phone = process.env.NEXT_PUBLIC_KALEIDOS_PHONE;
  const taxId = process.env.NEXT_PUBLIC_KALEIDOS_TAX_ID;
  const streetAddress = process.env.NEXT_PUBLIC_KALEIDOS_STREET;
  const postalCode = process.env.NEXT_PUBLIC_KALEIDOS_POSTAL_CODE;

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kaleidos Digital",
    "alternateName": ["Kaleidos", "Kaleidos Agência"],
    "url": baseUrl,
    "logo": `${baseUrl}/Kaleidos/logo/Logos-10.svg`,
    "image": `${baseUrl}/Kaleidos/imagens/Capa.png`,
    "description":
      "Agência de marketing digital especializada em cripto, Web3 e fintech. Estratégia, conteúdo, IA e growth para projetos que levam o próprio trabalho a sério.",
    "slogan": "Criamos conteúdo que realmente constrói atenção.",
    "foundingDate": "2020",
    "knowsAbout": [
      "Marketing Digital",
      "Marketing Cripto",
      "Web3",
      "DeFi",
      "Fintech",
      "Criação de Conteúdo",
      "IA e Automações",
      "Growth Hacking",
      "Lançamentos Digitais",
      "Branding",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      ...(streetAddress ? { "streetAddress": streetAddress } : {}),
      ...(postalCode ? { "postalCode": postalCode } : {}),
    },
    ...(phone ? { "telephone": phone } : {}),
    ...(taxId ? { "taxID": taxId } : {}),
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "madureira@kaleidosdigital.com",
        ...(phone ? { "telephone": phone } : {}),
        "availableLanguage": ["Portuguese", "English"],
        "areaServed": "BR",
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": `${baseUrl}/contato`,
        "availableLanguage": ["Portuguese", "English"],
      },
    ],
    "sameAs": [
      "https://www.instagram.com/digitalkaleidos",
      `https://twitter.com/${twitterHandle}`,
      "https://www.linkedin.com/company/kaleidos-digital",
    ],
    "serviceType": [
      "Marketing Digital",
      "Marketing Cripto",
      "Marketing Web3",
      "Criação de Conteúdo",
      "IA e Automações",
      "Lançamentos",
      "Growth Hacking",
      "Branding",
    ],
    "areaServed": [
      { "@type": "Country", "name": "Brasil" },
      { "@type": "Place", "name": "Global" },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Marketing Digital para Cripto e Web3",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing de Conteúdo",
            "description":
              "Criação de conteúdo estratégico para redes sociais, blog e newsletter de projetos cripto, Web3 e fintech.",
            "url": `${baseUrl}/servicos/marketing-conteudo`,
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IA e Automações",
            "description":
              "Sistemas de IA e automações para escalar produção de conteúdo e operação de marketing.",
            "url": `${baseUrl}/servicos/ia-automacoes-completa`,
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth e Lançamentos",
            "description":
              "Estratégias completas de lançamento e crescimento para produtos digitais e projetos cripto.",
            "url": `${baseUrl}/servicos/growth-lancamentos`,
          },
        },
      ],
    },
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kaleidos Digital",
    "url": baseUrl,
    "inLanguage": "pt-BR",
    "publisher": {
      "@type": "Organization",
      "name": "Kaleidos Digital",
      "url": baseUrl,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
