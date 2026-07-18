import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";
import { DiagnosticoForm } from "./diagnostico-form";

// Página de funil da sequência de email — noindex de propósito (não é pra
// ranquear; o tráfego chega pelo link do email).
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Diagnóstico gratuito de marketing | Kaleidos",
    description:
      "Conta em 2 minutos qual o seu projeto e o seu maior desafio de marketing. O time da Kaleidos volta com um diagnóstico direto, sem compromisso.",
    url: "/diagnostico",
    type: "website",
  }),
  robots: { index: false, follow: false },
};

export default function DiagnosticoPage() {
  return <DiagnosticoForm />;
}
