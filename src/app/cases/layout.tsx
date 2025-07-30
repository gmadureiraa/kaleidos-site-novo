import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases de Sucesso | Kaleidos Digital",
  description: "Conheça nossos cases de sucesso com Crypto.com, Mercado Bitcoin, Jornal Cripto, Investidor 4.20 e outros clientes. Resultados reais em marketing digital e crescimento de marcas.",
  keywords: "cases de sucesso, marketing digital, crypto.com, mercado bitcoin, jornal cripto, investidor 4.20, growth hacking",
  openGraph: {
    title: "Cases de Sucesso | Kaleidos Digital",
    description: "Conheça nossos cases de sucesso com Crypto.com, Mercado Bitcoin, Jornal Cripto, Investidor 4.20 e outros clientes.",
    url: 'https://kaleidos.com.br/cases',
    images: [
      {
        url: '/Imagens/Capa.png',
        width: 1200,
        height: 630,
        alt: 'Cases de Sucesso - Kaleidos Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cases de Sucesso | Kaleidos Digital",
    description: "Conheça nossos cases de sucesso com Crypto.com, Mercado Bitcoin, Jornal Cripto, Investidor 4.20 e outros clientes.",
    images: ['/Imagens/Capa.png'],
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 