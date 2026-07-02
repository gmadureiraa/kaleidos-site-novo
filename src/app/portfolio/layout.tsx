import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio — Reels, Carrosséis, Papers e Landings | Kaleidos Digital",
  description:
    "Acervo de peças produzidas pela Kaleidos: reels, carrosséis, papers, newsletters e landings de clientes cripto, web3, fintech e criadores. Filtre por formato e cliente.",
  keywords:
    "portfólio kaleidos, peças marketing cripto, reels cripto, carrossel cripto, papers cripto, landing page cripto, agência cripto portfólio",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfólio — Kaleidos Digital",
    description:
      "Acervo de peças: reels, carrosséis, papers, newsletters e landings de clientes cripto, web3 e fintech.",
    url: "https://kaleidos.com.br/portfolio",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: "Portfólio — Kaleidos Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio — Kaleidos Digital",
    description:
      "Acervo de peças: reels, carrosséis, papers, newsletters e landings de clientes cripto, web3 e fintech.",
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
