import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Contato — Agência de Marketing Cripto | Kaleidos",
    description: "Agende um diagnóstico com a Kaleidos, agência cripto-nativa desde 2020. Marketing de conteúdo, growth e IA para projetos de cripto, web3 e fintech.",
    keywords: "contato kaleidos, agendar diagnóstico, agência cripto, marketing web3, marketing cripto, agência web3 brasil",
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

