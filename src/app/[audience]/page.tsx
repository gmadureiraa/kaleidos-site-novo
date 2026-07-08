import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeShell } from "@/components/home-shell";
import { AUDIENCES, getAudience } from "@/lib/audiences";

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
    openGraph: { title: a.metaTitle, description: a.metaDesc },
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
  return (
    <HomeShell
      heroOpts={{ badge: a.badge, headlineHtml: a.headlineHtml, subHtml: a.subHtml }}
    />
  );
}
