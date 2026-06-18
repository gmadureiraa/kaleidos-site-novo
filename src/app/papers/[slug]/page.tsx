import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { papers, getPaperBySlug } from "@/lib/papers-data";
import { PaperGate } from "@/components/papers/paper-gate";
import { FooterDemo } from "@/components/ui/footer-demo";

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
  // O conteúdo do estudo é lido no read.html estático (linkado pelo gate quando
  // desbloqueado). Não embarcamos o HTML do artigo aqui: antes ~80-100KB de HTML
  // sanitizado iam serializados em toda página de paper sem nunca serem renderizados,
  // deixando a navegação lenta.
  return (
    <>
      <PaperGate paper={paper} />
      <FooterDemo />
    </>
  );
}
