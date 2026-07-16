import type { Metadata } from "next";
import { HomeShell } from "@/components/home-shell";

// ── HOME PRINCIPAL `/` (estética web3v2 promovida 2026-06-29) ────────────────
// A home antiga (HeroKaleidos + Bento) foi movida para `/2`.
// O corpo vive em <HomeShell/>, compartilhado com as variantes por público
// (/founders /creators /fintech /saas /empresas) — ver src/app/[audience].
export const metadata: Metadata = {
  title: "Kaleidos — Agência de Marketing Cripto e Web3",
  description:
    "Agência de marketing cripto: conteúdo, estratégia e lançamentos para marcas web3 que querem ser referência, não só mais ruído no feed.",
  openGraph: {
    title: "Kaleidos — Agência de Marketing Cripto e Web3",
    description:
      "Agência de marketing cripto: conteúdo, estratégia e lançamentos para marcas web3 que querem ser referência, não só mais ruído no feed.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Kaleidos Digital",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: "Kaleidos — Agência de Marketing Cripto e Web3",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaleidos — Agência de Marketing Cripto e Web3",
    description:
      "Agência de marketing cripto: conteúdo, estratégia e lançamentos para marcas web3 que querem ser referência, não só mais ruído no feed.",
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

export default function HomeV2() {
  return <HomeShell />;
}
