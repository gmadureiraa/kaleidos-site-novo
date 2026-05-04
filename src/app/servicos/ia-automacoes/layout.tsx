import type { Metadata } from "next";
import { generateServiceMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    "ia-automacoes",
    "Kaleidos AI · IA na operação, até 70% do tempo recuperado",
    "A Kaleidos audita gargalos, implementa IA dentro do fluxo do cliente e entrega o código no repositório dele. Sem lock-in. Sem SaaS de aluguel."
  );
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
