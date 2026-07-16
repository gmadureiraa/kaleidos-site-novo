import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPublishedPostCardsByCategoryAsync } from "@/lib/blog-data";
import { BlogCategory, categoryLabels } from "@/lib/blog-shared";
import { BlogCard } from "@/components/blog/blog-card";
import { PapersBand } from "@/components/papers/papers-band";
import { FooterDemo } from "@/components/ui/footer-demo";

// Hubs de categoria: URLs crawláveis (o filtro do /blog é client-only, invisível
// pro Google/IA). Cada uma vira um cluster de SEO + ponto de linkagem interna.
export const dynamicParams = false;
export const revalidate = 3600;

// Metadados editoriais por hub. Slug da URL = valor da categoria (lowercase).
const HUBS: Record<
  BlogCategory,
  { h1: string; intro: string; title: string; description: string }
> = {
  cripto: {
    h1: "Marketing cripto e web3",
    intro:
      "Análises sobre como projetos de cripto e web3 crescem: narrativa, comunidade, lançamento de token e distribuição. O que a Kaleidos aprendeu atendendo o mercado desde 2020.",
    title: "Marketing Cripto e Web3 — Artigos | Kaleidos",
    description:
      "Estudos densos sobre marketing cripto e web3: narrativa, comunidade, lançamento de token e growth on-chain. Por que projetos crescem e como aplicar.",
  },
  growth: {
    h1: "Growth para projetos cripto",
    intro:
      "Aquisição, retenção e canais que escalam sem queimar caixa. Frameworks de growth aplicados ao contexto de web3, exchanges e fintechs.",
    title: "Growth para Cripto e Web3 — Artigos | Kaleidos",
    description:
      "Growth aplicado a cripto e web3: aquisição, retenção, funil e canais que escalam. Frameworks reais que a Kaleidos usa com clientes.",
  },
  marketing: {
    h1: "Marketing e posicionamento",
    intro:
      "Posicionamento, marca e conteúdo para quem vende em mercados técnicos e regulados. Estratégia antes de tática.",
    title: "Marketing e Posicionamento — Artigos | Kaleidos",
    description:
      "Posicionamento, marca e conteúdo para mercados técnicos: cripto, fintech e web3. Estratégia acionável pela Kaleidos.",
  },
  ia: {
    h1: "IA e automação de marketing",
    intro:
      "Como usar IA e automação para produzir mais conteúdo, qualificar leads e operar marketing com um time enxuto, sem perder a voz da marca.",
    title: "IA e Automação de Marketing — Artigos | Kaleidos",
    description:
      "IA e automação aplicadas a marketing: produção de conteúdo, qualificação de leads e operação enxuta. Prática, não hype.",
  },
  cases: {
    h1: "Cases e estudos de caso",
    intro:
      "O que funcionou (e o que não) em projetos reais de cripto e web3. Números, decisões e aprendizados por trás das campanhas.",
    title: "Cases de Marketing Cripto e Web3 | Kaleidos",
    description:
      "Estudos de caso de marketing cripto e web3: decisões, números e aprendizados de projetos reais atendidos pela Kaleidos.",
  },
};

const CATEGORIES = Object.keys(HUBS) as BlogCategory[];

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ cat }));
}

function isCategory(v: string): v is BlogCategory {
  return (CATEGORIES as string[]).includes(v);
}

type Props = { params: Promise<{ cat: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  if (!isCategory(cat)) return {};
  const hub = HUBS[cat];
  const canonical = `/blog/categoria/${cat}`;
  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: canonical,
      type: "website",
      siteName: "Kaleidos Digital",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: hub.title,
      description: hub.description,
    },
  };
}

export default async function CategoryHubPage({ params }: Props) {
  const { cat } = await params;
  if (!isCategory(cat)) notFound();
  const hub = HUBS[cat];
  const posts = await getPublishedPostCardsByCategoryAsync(cat);

  // JSON-LD: CollectionPage + Breadcrumb (Blog > Categoria) pra IA entender o hub.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url: `https://kaleidos.com.br/blog/categoria/${cat}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: "https://kaleidos.com.br/blog" },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryLabels[cat],
          item: `https://kaleidos.com.br/blog/categoria/${cat}`,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Todos os artigos
        </Link>

        <header className="max-w-2xl mb-12">
          <span className="text-[#7CFF6B] font-medium text-sm">
            {categoryLabels[cat]}
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mt-2 mb-4 text-balance">
            {hub.h1}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{hub.intro}</p>
          <p className="text-sm text-gray-400 mt-4">
            {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-500">Ainda não há artigos nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>

      <PapersBand />
      <FooterDemo />
    </div>
  );
}
