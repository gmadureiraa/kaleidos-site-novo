import type { Metadata } from "next";
import { generateServiceMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata(
    "ia-automacoes-completa",
    // ⚠️ 27/08/2026: o título prometia "Aumente em 3x a produtividade". O 3x não
    // existia em `KALEIDOS_PROOF` nem em apuração nenhuma. Número sobre a casa
    // que não está no PROOF sai — não é trocado por outro número.
    "IA dentro da operação que já existe · Kaleidos AI",
    "Auditamos a operação e implementamos IA no fluxo que já roda: atendimento, conteúdo, pesquisa e cobrança. Código entregue no seu repositório, sem lock-in."
  );
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
