import type { Metadata } from "next";
import { generateServiceMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    "marketing-conteudo",
    "Marketing de Conteúdo para Cripto e Web3",
    "Conteúdo criativo para projetos cripto, DeFi e Web3. Copy persuasiva, roteiros virais, edição de vídeos e estratégias que convertem. 500+ vídeos, 125M+ views."
  );
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

