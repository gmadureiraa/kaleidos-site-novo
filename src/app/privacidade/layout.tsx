import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Política de Privacidade | Kaleidos Digital",
    description:
      "Como a Kaleidos coleta, usa e protege seus dados pessoais conforme a LGPD (Lei 13.709/2018). Direitos do titular, cookies e contato do encarregado.",
    keywords:
      "política de privacidade kaleidos, lgpd, lei 13709, proteção de dados, dados pessoais, cookies, titular de dados, encarregado dpo",
    url: "/privacidade",
    type: "website",
  });
}

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
