import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeShell } from "@/components/home-shell";
import { AUDIENCES, getAudience } from "@/lib/audiences";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";

// Variantes de home por público — mesma estrutura, hero textual por público.
// Rotas estáticas (cases, sobre, blog…) têm prioridade sobre este [audience];
// dynamicParams=false garante que SÓ os slugs abaixo renderizam (resto = 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDesc,
    alternates: { canonical: `/${a.slug}` },
    // openGraph parcial substitui o objeto do root layout inteiro — sem `images`
    // aqui as audiências perderiam og:image. Fallback: capa institucional.
    openGraph: {
      title: a.metaTitle,
      description: a.metaDesc,
      url: `/${a.slug}`,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: "/Kaleidos/imagens/Capa.png",
          width: 1200,
          height: 630,
          alt: a.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle,
      description: a.metaDesc,
      images: ["/Kaleidos/imagens/Capa.png"],
    },
  };
}

export default async function AudienceHome({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();

  // JSON-LD pra GEO: FAQPage (ser citado por ChatGPT/Perplexity) + BreadcrumbList
  // (contexto de que /<slug> é uma oferta segmentada da Kaleidos).
  const faqSchema = a.faq?.length
    ? generateFAQSchema(a.faq.map((f) => ({ question: f.q, answer: f.a })))
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Kaleidos", href: "/" },
    { label: `Kaleidos para ${a.label}`, href: `/${a.slug}` },
  ]);

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeShell
        heroOpts={{ badge: a.badge, headlineHtml: a.headlineHtml, subHtml: a.subHtml }}
        audience={a}
      />
    </>
  );
}
