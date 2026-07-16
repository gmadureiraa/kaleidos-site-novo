import { caseStudies } from "./blog-cases.generated";
import { seoPosts } from "./blog-seo-posts";
import { seoPosts2 } from "./blog-seo-posts-2";
import { seoPosts3 } from "./blog-seo-posts-3";
import { seoPosts4 } from "./blog-seo-posts-4";
import { seoPosts5 } from "./blog-seo-posts-5";
import { seoPosts6 } from "./blog-seo-posts-6";
import { seoPosts7 } from "./blog-seo-posts-7";
import { seoPosts8 } from "./blog-seo-posts-8";
import { blogNew1 } from "./blog-new-1";
import { blogNew2 } from "./blog-new-2";
import { blogNew3 } from "./blog-new-3";
import { blogNew4 } from "./blog-new-4";
import { blogNew5 } from "./blog-new-5";
import { blogNew6 } from "./blog-new-6";
import { blogNew7 } from "./blog-new-7";
import { blogNew8 } from "./blog-new-8";
import { blogNew9 } from "./blog-new-9";
import { blogNew10 } from "./blog-new-10";
import { blogNew11 } from "./blog-new-11";
import { blogNew12 } from "./blog-new-12";
import { blogNew13 } from "./blog-new-13";
import { blogNew14 } from "./blog-new-14";
import { blogNew15 } from "./blog-new-15";
import { blogNew16 } from "./blog-new-16";
import { fetchExternalPosts } from "./blog-external";

// Tipos + helpers de card/labels/data vivem em `blog-shared.ts` (client-safe,
// SEM imports de conteúdo). Re-exportados aqui pra não quebrar os imports
// existentes de quem puxava de `blog-data`. Componentes client devem importar
// DIRETO de `blog-shared` pra não arrastar o markdown completo pro bundle.
import type { BlogPost, BlogCardMeta, BlogCategory } from "./blog-shared";
import { toBlogCard, categoryLabels } from "./blog-shared";

// Re-exporta os tipos/helpers client-safe pra manter compatibilidade dos imports
// existentes (`from "@/lib/blog-data"`). Server code segue funcionando.
export type { BlogCategory, BlogFaqItem, BlogPost, BlogCardMeta } from "./blog-shared";
export { toBlogCard, categoryLabels, categoryColors, formatDate, getModifiedAt } from "./blog-shared";


// Blog: cases reais (teardowns web3) + posts SEO/GEO project-led (motor de conteúdo
// _SEO-GEO-CONTENT-ENGINE.md). Cases vêm do gerado; SEO posts são escritos à mão aqui.
export const blogPosts: BlogPost[] = [...seoPosts, ...seoPosts2, ...seoPosts3, ...seoPosts4, ...seoPosts5, ...seoPosts6, ...seoPosts7, ...seoPosts8, ...blogNew1, ...blogNew2, ...blogNew3, ...blogNew4, ...blogNew5, ...blogNew6, ...blogNew7, ...blogNew8, ...blogNew9, ...blogNew10, ...blogNew11, ...blogNew12, ...blogNew13, ...blogNew14, ...blogNew15, ...blogNew16, ...caseStudies];

/**
 * Gate de agendamento (publishedAt <= agora).
 *
 * `blogPosts` mantém TODOS os posts (inclusive os com data futura) para que a
 * rota `/blog/[slug]` continue resolvendo cada slug e o build gere as páginas.
 * As LISTAGENS públicas (index do /blog, carrossel da home, sitemap, RSS, JSON-LD
 * de índice) devem usar `getPublishedPosts()` para esconder o que ainda não saiu.
 *
 * Como o site é estático, o "auto-publish" depende de um rebuild: um post agendado
 * só aparece nas listagens depois que a data chega E o site é reconstruído
 * (rebuild semanal — não há cron neste repo). Em componentes client, o filtro roda
 * a cada render com o horário do navegador, então também aparece após a data.
 */
export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  return new Date(post.publishedAt).getTime() <= now.getTime();
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return blogPosts.filter((post) => isPublished(post, now));
}

/**
 * Cards leves dos posts publicados (estáticos em código). Use em Server
 * Components que só renderizam cards (home/listagem) e passam pra UI client —
 * evita serializar `content` (markdown completo) no payload.
 */
export function getPublishedPostCards(now: Date = new Date()): BlogCardMeta[] {
  return getPublishedPosts(now).map(toBlogCard);
}

/** Igual ao getPublishedPostsAsync(), mas devolve cards leves (sem content). */
export async function getPublishedPostCardsAsync(
  now: Date = new Date()
): Promise<BlogCardMeta[]> {
  const all = await getPublishedPostsAsync(now);
  return all.map(toBlogCard);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const published = getPublishedPosts();
  return published.find((post) => post.featured) || published[0];
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  // Relacionados nunca expõem posts agendados (publishedAt no futuro).
  const others = getPublishedPosts().filter((post) => post.slug !== currentSlug);
  if (!current) return others.slice(0, limit);

  // Internal linking por cluster: prioriza mesma categoria, completa com o resto.
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// --- Resolvers de SEO/GEO com fallback (campos opcionais) ---
export function getSeoTitle(post: BlogPost): string {
  return post.seoTitle?.trim() || post.title;
}

export function getSeoDescription(post: BlogPost): string {
  const raw = (post.seoDescription?.trim() || post.excerpt || "").trim();
  if (raw.length <= 160) return raw;
  // Corta na fronteira de palavra (não no meio de "maiore"), com reticências.
  const clipped = raw.slice(0, 157);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 100 ? clipped.slice(0, lastSpace) : clipped).replace(/[.,;:\s]+$/, "") + "…";
}

// `getModifiedAt` vive em `blog-shared` (re-exportado abaixo).

export function getOgImage(post: BlogPost): string | undefined {
  return post.ogImage?.trim() || post.coverImage?.trim() || undefined;
}

export function getPostTags(post: BlogPost): string[] {
  if (post.tags?.length) return post.tags;
  return [categoryLabels[post.category]];
}

/**
 * TL;DR answer-first pra blocos de citação por IA. Usa o campo `tldr` se existir;
 * senão extrai a 1ª seção "## TL;DR" do markdown; senão cai no excerpt.
 */
export function getTldr(post: BlogPost): string | undefined {
  if (post.tldr?.trim()) return post.tldr.trim();
  const match = post.content.match(/##\s*TL;?DR\s*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i);
  if (match) {
    const block = match[1]
      .replace(/^[-*]\s+/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`#>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (block.length > 30) return block.slice(0, 320);
  }
  return post.excerpt || undefined;
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

// `formatDate` agora vive em `blog-shared` (re-exportado no topo deste arquivo).

// ── Posts publicados pelo KAI (tabela external_blog_posts via feed) ───────────
//
// Os helpers abaixo MERJAM os posts estáticos (em código, com imagens/tldr/etc —
// fonte de verdade) com os posts publicados pelo KAI. São BUILD-SAFE: se o feed
// estiver indisponível ou a env `KAI_BLOG_FEED_URL` não estiver setada,
// `fetchExternalPosts()` devolve [] e o site builda só com os estáticos.
//
// Conflito de slug: o estático SEMPRE vence (não sobrescreve post curado em código).

/** Static (em código) + externos (KAI), deduplicado por slug — estático vence. */
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  let external: BlogPost[] = [];
  try {
    external = await fetchExternalPosts("kaleidos");
  } catch {
    external = [];
  }
  if (external.length === 0) return blogPosts;
  const staticSlugs = new Set(blogPosts.map((p) => p.slug));
  const extraOnly = external.filter((p) => !staticSlugs.has(p.slug));
  return [...blogPosts, ...extraOnly];
}

/** Igual a getPublishedPosts(), mas incluindo posts publicados pelo KAI. */
export async function getPublishedPostsAsync(now: Date = new Date()): Promise<BlogPost[]> {
  const all = await getAllPostsAsync();
  return all.filter((post) => isPublished(post, now));
}

/** Igual a getPostBySlug(), mas resolve também slugs vindos do KAI. */
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  const local = getPostBySlug(slug);
  if (local) return local;
  const all = await getAllPostsAsync();
  return all.find((post) => post.slug === slug);
}

/** Igual a getRelatedPosts(), considerando também posts do KAI. */
export async function getRelatedPostsAsync(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const published = await getPublishedPostsAsync();
  const current = published.find((p) => p.slug === currentSlug)
    ?? (await getPostBySlugAsync(currentSlug));
  const others = published.filter((post) => post.slug !== currentSlug);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
