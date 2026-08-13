import {
  BlogPost,
  categoryLabels,
  getSeoTitle,
  getSeoDescription,
  getModifiedAt,
  getOgImage,
  getPostTags,
} from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
const TWITTER = (process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@digitalkaleidos").replace(/^@/, "");

function abs(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * JSON-LD por post: BlogPosting + BreadcrumbList + (FAQPage se houver Q&A).
 * Server Component — renderiza no HTML inicial, é o que crawler/LLM lê.
 * Casa com a estratégia _SEO-GEO-CONTENT-ENGINE.md (§1.5 schema, §1.6 entidade).
 */
export function BlogJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  // Fallback = capa OG gerada por post (rota edge opengraph-image), não mais a
  // Capa.png única. Mantém o JSON-LD casado com o og:image real da página.
  const image = abs(getOgImage(post)) || `${url}/opengraph-image`;
  const isGabriel = post.author.name.toLowerCase().includes("madureira");

  const author = {
    "@type": "Person",
    name: post.author.name,
    // Hub de autor dedicado. Antes apontava pra /sobre (página institucional da
    // agência, com carrossel de time), o que não dá ao Google/LLM uma página
    // canônica da entidade "Gabriel Madureira".
    url: isGabriel ? `${SITE_URL}/gabriel-madureira` : `${SITE_URL}/sobre`,
    image: abs(post.author.avatar),
    ...(isGabriel
      ? {
          jobTitle: "Fundador da Kaleidos",
          worksFor: { "@type": "Organization", name: "Kaleidos Digital", url: SITE_URL },
          // `@id` casa esta menção com o Person do /gabriel-madureira, pra que
          // Google/LLM tratem as 300 assinaturas como UMA entidade, não 300.
          "@id": `${SITE_URL}/gabriel-madureira#gabriel-madureira`,
          sameAs: [
            "https://twitter.com/ogmadureira",
            "https://www.linkedin.com/in/gabrielmadureira",
            "https://www.instagram.com/ogmadureira",
          ],
        }
      : {}),
  };

  const publisher = {
    "@type": "Organization",
    name: "Kaleidos Digital",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/Kaleidos/logo/Logos-10.svg`,
    },
    sameAs: [
      "https://www.instagram.com/digitalkaleidos",
      `https://twitter.com/${TWITTER}`,
      "https://www.linkedin.com/company/kaleidos-digital",
    ],
  };

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: getSeoTitle(post).slice(0, 110),
    name: post.title,
    description: getSeoDescription(post),
    image: [image],
    datePublished: post.publishedAt,
    dateModified: getModifiedAt(post),
    author,
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "pt-BR",
    articleSection: categoryLabels[post.category],
    keywords: getPostTags(post).join(", "),
    isAccessibleForFree: true,
    timeRequired: `PT${post.readTime}M`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      // Nível de categoria: amarra o post ao hub da trilha (/blog/categoria/X),
      // que é a URL crawlável do cluster. Sem ele o crawler/LLM vê 265 posts
      // pendurados direto no /blog, sem estrutura tópica.
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabels[post.category],
        item: `${SITE_URL}/blog/categoria/${post.category}`,
      },
      { "@type": "ListItem", position: 4, name: post.title, item: url },
    ],
  };

  const faqPage =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}

/**
 * JSON-LD da index /blog: Blog + BreadcrumbList + ItemList dos posts.
 */
export function BlogIndexJsonLd({ posts }: { posts: BlogPost[] }) {
  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog da Kaleidos",
    description:
      "Estudos e análises sobre marketing cripto, web3, IA e growth. Por que tokens e projetos crescem — e como aplicar.",
    url: `${SITE_URL}/blog`,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: "Kaleidos Digital",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Kaleidos/logo/Logos-10.svg` },
    },
    blogPost: posts.slice(0, 25).map((p) => ({
      "@type": "BlogPosting",
      headline: getSeoTitle(p).slice(0, 110),
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: getModifiedAt(p),
      author: { "@type": "Person", name: p.author.name },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
