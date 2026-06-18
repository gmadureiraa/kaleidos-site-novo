import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Termos de Uso | Kaleidos Digital",
    description:
      "Termos e condições de uso do site da Kaleidos. Uso do conteúdo, propriedade intelectual, isenção de responsabilidade, disclaimer cripto, links de terceiros, lei aplicável e foro.",
    keywords:
      "termos de uso kaleidos, termos e condições, disclaimer cripto, propriedade intelectual, isenção de responsabilidade, lei aplicável brasil",
    url: "/termos",
    type: "website",
  });
}

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
