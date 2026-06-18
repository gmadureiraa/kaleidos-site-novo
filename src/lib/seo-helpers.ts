import { Metadata } from "next";
import { getCaseData } from "./case-data";
import { getServiceData } from "./service-pages-data";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: "website" | "article" | "profile";
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  ogImage = "/Kaleidos/imagens/Capa.png",
  url,
  type = "website",
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@digitalkaleidos";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  const baseTitle = "Kaleidos — Agência de Marketing Digital para Cripto e Web3";
  const fullTitle = title.includes("Kaleidos") ? title : `${title} | ${baseTitle}`;
  
  const fullDescription = description || "Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos.";

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords || "marketing digital, conteúdo criativo, automações, lançamentos, cripto, social media, growth hacking, agência digital",
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: "Kaleidos Digital",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'pt-BR': fullUrl,
        'en': `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}lang=en`,
      },
    },
  };
}

// Schema markup helpers
export const generateArticleSchema = (
  title: string,
  description: string,
  author: string,
  datePublished: string,
  imageUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  author: {
    "@type": "Person",
    name: author,
  },
  publisher: {
    "@type": "Organization",
    name: "Kaleidos Digital",
    logo: {
      "@type": "ImageObject",
      url: "https://kaleidos.com.br/logo.png",
    },
  },
  datePublished,
  image: imageUrl,
});

export const generateServiceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: {
    "@type": "Organization",
    name: "Kaleidos Digital",
    url: "https://kaleidos.com.br",
  },
  areaServed: "BR",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceType: "Online",
  },
});

export const generateCaseStudySchema = (
  title: string,
  description: string,
  client: string,
  results: string,
  datePublished: string,
  url?: string,
  imageUrl?: string
) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: url ? `${siteUrl}${url}` : siteUrl,
    image: imageUrl || `${siteUrl}/Kaleidos/imagens/Capa.png`,
    author: {
      "@type": "Organization",
      name: "Kaleidos Digital",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Kaleidos/imagens/Capa.png`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Kaleidos Digital",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Kaleidos/imagens/Capa.png`,
      },
    },
    datePublished,
    mainEntity: {
      "@type": "Organization",
      name: client,
    },
    result: results,
  };
};

// Helper para gerar FAQPage schema
export const generateFAQSchema = (faqs: { question: string; answer: string | string[] }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer,
      },
    })),
  };
};

// Helper para gerar BreadcrumbList schema
export const generateBreadcrumbSchema = (items: { label: string; href?: string }[]) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };
};

// Helper para gerar metadata de serviços
export function generateServiceMetadata(serviceId: string, serviceName: string, description: string) {
  const keywords = [
    serviceName.toLowerCase(),
    "kaleidos digital",
    "marketing digital",
    "serviços",
    ...description.toLowerCase().split(" ").slice(0, 5),
  ].join(", ");

  return generateSEOMetadata({
    title: `${serviceName} - Kaleidos Digital`,
    description: description,
    keywords: keywords,
    ogImage: "/Kaleidos/imagens/Capa.png",
    url: `/servicos/${serviceId}`,
    type: "website",
  });
}

// Helper para gerar metadata das páginas de serviço estilo Lunar (lê service-pages-data)
export function generateServicePageMetadata(serviceId: string): Metadata {
  const data = getServiceData(serviceId);
  if (!data) {
    return generateSEOMetadata({
      title: "Serviço",
      description: "Serviço da Kaleidos Digital para cripto e web3.",
      url: `/servicos/${serviceId}`,
    });
  }
  return generateSEOMetadata({
    title: data.pt.metaTitle,
    description: data.pt.metaDescription,
    keywords: data.pt.keywords,
    url: `/servicos/${serviceId}`,
    type: "website",
  });
}

// Helper para gerar metadata de cases
export function generateCaseMetadata(caseId: string) {
  const caseData = getCaseData(caseId);
  
  if (!caseData) {
    return generateSEOMetadata({
      title: "Case não encontrado",
      description: "Case de sucesso da Kaleidos Digital",
    });
  }

  const description = caseData.descricao || caseData.fraseImpactante || "Case de sucesso da Kaleidos Digital";
  const keywords = [
    ...caseData.tags,
    ...caseData.servicos,
    "kaleidos digital",
    "marketing digital",
    "case de sucesso",
    caseData.nome.toLowerCase(),
  ].join(", ");

  // Pegar primeira imagem do case para OG image
  const firstImage = caseData.media.find((m: { type: string }) => m.type === "image");
  const ogImage = firstImage?.src || "/Kaleidos/imagens/Capa.png";

  return generateSEOMetadata({
    title: `${caseData.nome} - Case de Sucesso`,
    description: description,
    keywords: keywords,
    ogImage: ogImage,
    url: `/cases/${caseData.id}`,
    type: "article",
  });
}
