import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@/components/analytics";
import "./globals.css";

// Fontes locais otimizadas
const atelier = localFont({
  src: [
    {
      path: '../../public/fonts/Atelier/OpenType-TT/Atelier.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-atelier',
  display: 'swap',
});

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const gridlite = localFont({
  src: [
    {
      path: '../../public/fonts/Gridlite/Gridlite.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gridlite',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kaleidos Digital - Marketing e Conteúdo | Crescimento de Marcas",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos. Cases de sucesso com Crypto.com, Mercado Bitcoin, Jornal Cripto e mais.",
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS || "marketing digital, conteúdo criativo, automações, lançamentos, cripto, social media, growth hacking, agência digital",
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-128x128.png',
  },
  openGraph: {
    title: "Kaleidos Digital - Marketing e Conteúdo",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleidos.com.br',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Kaleidos Digital',
    images: [
      {
        url: '/Imagens/Capa.png',
        width: 1200,
        height: 630,
        alt: 'Kaleidos Digital - Marketing e Conteúdo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaleidos Digital - Marketing e Conteúdo",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos.",
    images: ['/Imagens/Capa.png'],
    creator: '@kaleidosdigital',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${atelier.variable} ${inter.variable} ${gridlite.variable} font-sans`}>
        <StructuredData />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
