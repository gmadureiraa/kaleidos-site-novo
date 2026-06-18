import type { Metadata } from "next";
import { generateServiceMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    "ia-automacoes-completa",
    "Aumente em 3x a produtividade da sua empresa · Kaleidos AI",
    "Implementamos soluções com IA que tornam você e seu time mais produtivos, economizam tempo e dinheiro. Código entregue no seu repositório, sem lock-in."
  );
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
