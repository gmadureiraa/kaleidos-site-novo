import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { papers, getPaperBySlug } from "@/lib/papers-data";
import { PaperGate } from "@/components/papers/paper-gate";
import { FooterDemo } from "@/components/ui/footer-demo";
import { generateArticleSchema } from "@/lib/seo-helpers";

// Slugs desconhecidos viram 404 real (antes era soft-404 / HTTP 200).
export const dynamicParams = false;

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return { title: "Estudo não encontrado · Kaleidos" };
  const title = `${paper.title}: ${paper.subtitle} · Kaleidos Papers ${paper.volume}`;
  return {
    title,
    description: paper.description,
    alternates: { canonical: `/papers/${slug}` },
    openGraph: {
      title,
      description: paper.description,
      images: [{ url: paper.cover }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: paper.description,
      images: [paper.cover],
    },
  };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";

  // Article/Report JSON-LD pro paper — wire do helper generateArticleSchema
  // (antes órfão), enriquecido com url, isPartOf (série Kaleidos Papers) e
  // datePublished real. Dá rich-results e sinal de entidade pra GEO.
  const articleSchema = {
    ...generateArticleSchema(
      `${paper.title}: ${paper.subtitle}`,
      paper.tldr || paper.description,
      "Kaleidos Digital",
      paper.publishedAt,
      `${siteUrl}${paper.cover}`
    ),
    "@type": "Report",
    url: `${siteUrl}/papers/${paper.slug}`,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: "Kaleidos Papers",
      url: `${siteUrl}/papers`,
    },
  };

  // O conteúdo do estudo é lido no read.html estático (linkado pelo gate quando
  // desbloqueado). Não embarcamos o HTML do artigo aqui: antes ~80-100KB de HTML
  // sanitizado iam serializados em toda página de paper sem nunca serem renderizados,
  // deixando a navegação lenta.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PaperGate paper={paper} />
      <FooterDemo />
    </>
  );
}
