import type { Metadata } from "next";
import { generateServiceMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    "growth-lancamentos",
    "Growth e Lançamentos para Cripto e Web3",
    "Lançamentos que viralizam e vendem no mercado cripto. Funis, campanhas e growth hacking para projetos Web3 e DeFi, operados por um time cripto-nativo desde 2020."
  );
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

