import { Metadata } from "next";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import {
  getPostBySlugAsync,
  getRenderableContentAsync,
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
// os posts (inclusive os agendados), qualquer outro slug = 404 real.
//
// ⚠️ Medido em 26/08/2026, e é a razão de o middleware existir: com
// `dynamicParams = true`, `notFound()` nesta rota devolve SOFT-404 — HTTP 200
// com o corpo da página de não-encontrado. Testado com e sem `revalidate`, e com
// o slug fora de generateStaticParams: 200 nos três casos. O 404 de verdade
// nesta rota só sai de `dynamicParams = false` (roteador) ou do middleware.
// Por isso o gate de data do post é 404 pelo middleware (`src/middleware.ts`) e
// o gate em `getPostBySlugAsync` é a segunda camada, que garante que o conteúdo
// do agendado não é renderizado nem que alguém contorne o middleware.
export const dynamicParams = false;

// ISR: revalida de hora em hora pra que posts AGENDADOS (publishedAt no futuro)
// virem live sozinhos na data, sem depender de redeploy manual.
//
// O gate de data vive em `getPostBySlugAsync` (blog-data.ts) — e desde 26/08/2026
// ele EXISTE de verdade. Este comentário afirmava isso desde antes de o gate ser
// escrito, e a divergência deixou 83 posts agendados respondendo 200 fora do
// sitemap. Se você tirar o gate de lá, apague esta linha aqui também.
//
// Sem revalidate o 404 do agendado ficaria congelado no build.
// 3600s = post no ar em até 1h após a data programada.
export const revalidate = 3600;

export async function generateStaticParams() {
  // TODOS os slugs, inclusive os agendados. O agendado é prerenderizado como
  // página de não-encontrado (o gate corta o conteúdo) e o middleware devolve 404
  // nele; na data, o `revalidate` acima rerenderiza a MESMA página já com o post
  // e o middleware para de bloquear. É isso que faz o agendado entrar no ar
  // sozinho, sem redeploy. Tirar o agendado daqui quebraria esse retorno, porque
  // generateStaticParams só roda no build.
  const all = await getAllPostsAsync();
  return all.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);
  // Agendado (ou inexistente): nada de metadata do post. Marca noindex explícito
  // — o middleware já devolve 404 aqui, mas se um dia ele deixar passar, a página
  // ainda não pede indexação.
  if (!post) {
    return {
      title: "Página não encontrada · Kaleidos",
      robots: { index: false, follow: false },
    };
  }

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
  // Links internos pra post ainda não publicado (ou removido do acervo) são
  // neutralizados ANTES do markdown virar HTML — senão o gate de data acima
  // trocaria posts vazados por 404 dentro de páginas que estão no ar. Volta a
  // linkar sozinho na data do destino, junto com a revalidação. Ver blog-links.ts.
  const renderableContent = await getRenderableContentAsync(post);
  const rawHtml = markdownToHtml(renderableContent);
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
