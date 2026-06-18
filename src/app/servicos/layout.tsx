import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Serviços — Conteúdo, Growth e IA para Cripto e Web3 | Kaleidos",
    description:
      "Marketing de conteúdo, Kaleidos AI e growth & lançamentos. A agência cripto-nativa que cobre a stack completa: conteúdo, design, vídeo, tráfego e dev.",
    keywords:
      "serviços agência cripto, marketing de conteúdo web3, automação ia marketing, growth lançamentos cripto, edição de vídeo, newsletter, design social media",
    ogImage: "/Kaleidos/imagens/Capa.png",
    url: "/servicos",
    type: "website",
  });
}

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
