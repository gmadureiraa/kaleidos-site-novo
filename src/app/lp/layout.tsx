import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaleidos · Agência de marketing + IA nativa da cripto",
  description:
    "Conteúdo, IA dentro da operação e sites/sistemas. No nicho cripto/web3/fintech desde 2020, com o mesmo time cuidando das três frentes.",
  // Variante de LP dos serviços — não indexar pra não competir/duplicar com
  // /servicos/ia-automacoes-completa. Continua acessível via link direto de ads.
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title: "Kaleidos · Agência de marketing + IA nativa da cripto",
    description:
      "Três frentes, mesmo time: conteúdo, IA na operação, sites e sistemas.",
    url: "https://kaleidos.com.br/lp",
    siteName: "Kaleidos Digital",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaleidos · Agência de marketing + IA nativa da cripto",
    description:
      "Três frentes, mesmo time: conteúdo, IA na operação, sites e sistemas.",
    creator: "@digitalkaleidos",
    site: "@digitalkaleidos",
  },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
