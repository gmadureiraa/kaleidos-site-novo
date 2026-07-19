import { Metadata } from "next";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import {
  getPostBySlugAsync,
  getRelatedPostsAsync,
  getAllPostsAsync,
  getSeoTitle,
  getSeoDescription,
  getModifiedAt,
  getOgImage,
  getPostTags,
  getTldr,
} from "@/lib/blog-data";
import { markdownToHtml } from "@/lib/markdown";
import { ArticleContent } from "@/components/blog/article-content";
import { BlogJsonLd } from "@/components/blog/blog-jsonld";

type Props = {
  params: Promise<{ slug: string }>;
};

// Slugs desconhecidos caem direto no 404 estático (sem render dinâmico que
// crashava o boundary not-found → HTTP 500). generateStaticParams cobre todos
// os posts; qualquer outro slug = 404 real.
export const dynamicParams = false;

// ISR: revalida de hora em hora pra que posts AGENDADOS (publishedAt no futuro)
// virem live sozinhos na data, sem depender de redeploy manual. O gate de data
// vive em getPostBySlugAsync; sem revalidate o 404 do agendado ficaria congelado
// no build. 3600s = post no ar em até 1h após a data programada.
export const revalidate = 3600;

export async function generateStaticParams() {
  const all = await getAllPostsAsync();
  return all.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);
  if (!post) return {};

  const title = getSeoTitle(post);
  const description = getSeoDescription(post);
  const tags = getPostTags(post);
  // og:image por post. Quando o post tem coverImage/ogImage próprio, ele vence.
  // Quando NÃO tem, deixamos SEM override aqui pra que o `opengraph-image.tsx`
  // (file-based, gerado por post) injete a capa de marca automaticamente — em vez
  // da Capa.png fixa que TODOS os posts compartilhavam antes.
  const ogImage = getOgImage(post);
  const canonical = `/blog/${post.slug}`;

  return {
    title: `${title} | Kaleidos`,
    description,
    keywords: tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Kaleidos Digital",
      locale: "pt_BR",
      publishedTime: post.publishedAt,
      modifiedTime: getModifiedAt(post),
      authors: [post.author.name],
      section: post.category,
      tags,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPostsAsync(slug, 4);
  const rawHtml = markdownToHtml(post.content);
  // Defense in depth: hoje o conteúdo é trusted (hardcoded em blog-data.ts).
  // Se um dia migrar pra CMS, DOMPurify bloqueia <script>, on*=, javascript:.
  const contentHtml = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ["target", "rel", "loading"],
  });
  const tldr = getTldr(post);

  return (
    <>
      <BlogJsonLd post={post} />
      <ArticleContent
        post={post}
        contentHtml={contentHtml}
        relatedPosts={relatedPosts}
        tldr={tldr}
      />
    </>
  );
}
