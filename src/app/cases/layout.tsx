import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases de Sucesso — Marketing Cripto e Web3 | Kaleidos Digital",
  description: "Cases reais de marketing cripto, DeFi e Web3: Crypto.com, Mercado Bitcoin, Jornal Cripto e mais. Resultados em conteúdo, growth e lançamentos.",
  keywords: "cases marketing cripto, cases web3, marketing digital cripto resultados, crypto.com case, mercado bitcoin marketing, agência cripto cases",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Cases de Sucesso — Marketing Cripto e Web3 | Kaleidos Digital",
    description: "Cases reais de marketing digital para cripto, DeFi e Web3. Crypto.com, Mercado Bitcoin, Jornal Cripto e mais.",
    url: 'https://kaleidos.com.br/cases',
    images: [
      {
        url: '/Kaleidos/imagens/Capa.png',
        width: 1200,
        height: 630,
        alt: 'Cases de Sucesso - Kaleidos Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cases de Sucesso — Marketing Cripto e Web3 | Kaleidos Digital",
    description: "Cases reais de marketing digital para cripto, DeFi e Web3. Crypto.com, Mercado Bitcoin, Jornal Cripto e mais.",
    images: ['/Kaleidos/imagens/Capa.png'],
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 