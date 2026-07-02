import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { AnalyticsRouter } from "@/components/analytics-router";
import { MetaPixel } from "@/components/meta-pixel";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { LeadPopup } from "@/components/lead-popup";
import "./globals.css";

// Fontes locais otimizadas
//
// Perf mobile (2026-07): a Atelier é a fonte do <h1> do hero = elemento LCP.
// É a ÚNICA que precisa de preload no caminho crítico. next/font já injeta o
// <link rel="preload" fetchpriority> com o arquivo hasheado quando preload:true.
const atelier = localFont({
  src: [
    {
      path: '../../public/Kaleidos/fonts/Atelier/OpenType-TT/Atelier.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-atelier',
  display: 'swap',
  preload: true, // LCP font — prioridade máxima no head
});

// Inter (corpo) e Gridlite (labels): NÃO precisam pintar antes do LCP.
// preload:false tira ~730KB (Inter normal+italic) + 49KB da fila do caminho
// crítico no Moto G/4G, liberando banda pra Atelier trocar o h1 mais cedo.
// display:swap já mostra o fallback imediatamente; as fontes trocam ao chegar.
const inter = localFont({
  src: [
    {
      path: '../../public/Kaleidos/fonts/Inter/Inter-VariableFont_opsz,wght.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../public/Kaleidos/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

const gridlite = localFont({
  src: [
    {
      path: '../../public/Kaleidos/fonts/Gridlite/Gridlite.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gridlite',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Kaleidos — Agência de Marketing Digital para Cripto, Web3 e Fintech",
  description: "Agência de marketing digital especializada em cripto, web3 e fintech. IA integrada, 8 clientes ativos, 120+ peças de conteúdo por mês.",
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS || "agência marketing cripto, marketing digital web3, agência conteúdo cripto, automação marketing ia, lançamento digital cripto, conteúdo fintech, growth hacking cripto, marketing defi, social media cripto",
  authors: [{ name: "Kaleidos Digital" }],
  creator: "Kaleidos Digital",
  publisher: "Kaleidos Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleidos.com.br'),
  alternates: {
    canonical: '/',
  },
  // Facebook domain verification — atribui kaleidos.com.br ao Madureira
  // Cripto BM (704738313932684). Necessário pra Aggregated Event Measurement
  // e pra atribuir Pixels ao domínio.
  other: {
    "facebook-domain-verification": "6bs4tp7zf4ndtyhcik02uoh4tnbc9q",
  },
  icons: {
    icon: [
      { url: '/Kaleidos/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/Kaleidos/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Kaleidos/assets/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/Kaleidos/assets/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/Kaleidos/assets/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/Kaleidos/assets/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/Kaleidos/assets/favicon-128x128.png',
  },
  openGraph: {
    title: "Kaleidos — Agência de Marketing Digital para Cripto, Web3 e Fintech",
    description: "Agência de marketing digital especializada em cripto, web3 e fintech. IA integrada, 8 clientes ativos, 120+ peças de conteúdo por mês.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleidos.com.br',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Kaleidos Digital',
    images: [
      {
        url: '/Kaleidos/imagens/Capa.png',
        width: 1200,
        height: 630,
        alt: 'Kaleidos — Agência de Marketing Digital para Cripto, Web3 e Fintech',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaleidos — Agência de Marketing Digital para Cripto, Web3 e Fintech",
    description: "Agência de marketing digital especializada em cripto, web3 e fintech. IA integrada, 8 clientes ativos, 120+ peças de conteúdo por mês.",
    images: ['/Kaleidos/imagens/Capa.png'],
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@digitalkaleidos',
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@digitalkaleidos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/*
        Sem preload manual de fonte: next/font/local já injeta o <link rel="preload">
        com o arquivo hasheado (/_next/static/media/...). Apontar pro arquivo cru do
        public/ causava download duplicado e desperdiçado.
      */}
      <body className={`${atelier.variable} ${inter.variable} ${gridlite.variable} font-sans`}>
        <SkipToContent />
        <SmoothScrollProvider>
          <ErrorBoundary>
            <StructuredData />
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <Suspense fallback={null}>
              {children}
            </Suspense>
            <Suspense fallback={null}>
              <AnalyticsRouter />
            </Suspense>
            <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID || ''} />
            <Suspense fallback={null}>
              <LeadPopup />
            </Suspense>
          </ErrorBoundary>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
