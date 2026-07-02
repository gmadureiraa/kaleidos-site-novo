import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Sobre — Agência de Marketing Cripto e Web3 | Kaleidos Digital",
    description: "Agência nativa do mercado cripto. Equipe especializada em marketing digital para projetos Web3, DeFi e fintech. Conheça quem faz a Kaleidos.",
    keywords: "agência marketing cripto, equipe kaleidos, agência web3 brasil, marketing digital cripto equipe, agência fintech",
    ogImage: "/Kaleidos/imagens/nos.jpg",
    url: "/sobre",
    type: "website",
  });
}

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

