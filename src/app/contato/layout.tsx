import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Contato - Kaleidos Digital",
    description: "Fale com a Kaleidos sobre seu projeto de marketing digital, conteúdo ou automações com IA para cripto e web3. Transformamos ideias em resultados.",
    keywords: "contato kaleidos, fale conosco, orçamento, marketing digital, agência digital",
    ogImage: "/Kaleidos/imagens/Capa.png",
    url: "/contato",
    type: "website",
  });
}

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

