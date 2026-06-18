import type { Metadata } from "next";
import { getPublishedPostsAsync } from "@/lib/blog-data";
import { BlogIndexJsonLd } from "@/components/blog/blog-jsonld";

const TITLE = "Blog — Marketing Cripto, Web3, IA e Growth | Kaleidos";
const DESCRIPTION =
  "Estudos e análises densas sobre marketing cripto e web3, lançamento de token, IA e growth. Por que projetos crescem — e como aplicar no seu.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
    siteName: "Kaleidos Digital",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Posts publicados (estáticos + KAI). Agendados ficam fora.
  const posts = await getPublishedPostsAsync();
  return (
    <>
      {/* JSON-LD de índice só com posts já publicados (agendados ficam fora). */}
      <BlogIndexJsonLd posts={posts} />
      {children}
    </>
  );
}
