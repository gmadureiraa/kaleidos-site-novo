import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaleidos · Agência boutique de marketing + IA",
  description:
    "Conteúdo, IA dentro da operação e sites/sistemas. 5+ anos no nicho cripto/web3/fintech, 8 marcas operando, 17 frentes automatizadas com IA.",
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title: "Kaleidos · Agência boutique de marketing + IA",
    description:
      "Três frentes, mesmo time: conteúdo, IA na operação, sites e sistemas.",
    url: "https://kaleidos.com.br/lp",
    siteName: "Kaleidos Digital",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaleidos · Agência boutique de marketing + IA",
    description:
      "Três frentes, mesmo time: conteúdo, IA na operação, sites e sistemas.",
    creator: "@digitalkaleidos",
    site: "@digitalkaleidos",
  },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
