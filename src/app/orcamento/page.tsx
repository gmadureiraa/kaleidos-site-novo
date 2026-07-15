import type { Metadata } from "next";
import { OrcamentoCalculator } from "@/components/orcamento-calculator";

// Ferramenta INTERNA de orçamento (substitui a fórmula manual da planilha).
// Rota não linkada no menu + noindex — não expõe preço público (decisão D3).
export const metadata: Metadata = {
  title: "Orçamento Kaleidos (interno)",
  robots: { index: false, follow: false },
};

export default function OrcamentoPage() {
  return <OrcamentoCalculator />;
}
