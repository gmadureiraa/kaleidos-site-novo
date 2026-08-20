import type { Metadata } from "next";

const TITLE = "Blog — Marketing Cripto, Web3, IA e Marca Pessoal | Kaleidos";
const DESCRIPTION =
  "Estudos e análises densas sobre marketing cripto e web3, lançamento de token, IA, growth e marca pessoal de founder. Por que projetos e pessoas crescem — e como aplicar no seu caso.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  // ⚠️ 19/08/2026 — og:image estava FALTANDO. Em Next App Router um objeto
  // `openGraph` parcial SUBSTITUI o do root layout inteiro: declarar openGraph
  // sem `images` apaga a capa herdada, e o /blog compartilhado no LinkedIn, X ou
  // WhatsApp saía sem imagem. Mesma armadilha já documentada em
  // src/app/[audience]/page.tsx. ⛔ Ao declarar openGraph numa rota, sempre
  // incluir `images` e `twitter.images` junto.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
    siteName: "Kaleidos Digital",
    locale: "pt_BR",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

// O JSON-LD de índice (Blog + BreadcrumbList + ItemList) vive em `page.tsx`, NÃO
// aqui. No layout ele era injetado em TODA rota /blog/* — cada post e cada hub de
// categoria declarava um segundo BreadcrumbList apontando pro índice, além de se
// anunciar como a entidade `Blog`. Sinal conflitante pro crawler e pro LLM, e um
// fetch de todos os posts (com markdown) em toda página. Corrigido em 08/08/2026.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
