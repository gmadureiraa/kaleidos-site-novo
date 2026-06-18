import { caseStudies } from "./blog-cases.generated";
import { seoPosts } from "./blog-seo-posts";
import { seoPosts2 } from "./blog-seo-posts-2";
import { seoPosts3 } from "./blog-seo-posts-3";
import { seoPosts4 } from "./blog-seo-posts-4";
import { seoPosts5 } from "./blog-seo-posts-5";
import { seoPosts6 } from "./blog-seo-posts-6";
import { seoPosts7 } from "./blog-seo-posts-7";
import { fetchExternalPosts } from "./blog-external";

export type BlogCategory = "marketing" | "ia" | "cases" | "growth" | "cripto";

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  featured?: boolean;

  // --- Campos OPCIONAIS de SEO/GEO (não quebram posts existentes) ---
  /** Data da última revisão. Cai pra publishedAt quando ausente. Alimenta dateModified (freshness GEO). */
  updatedAt?: string;
  /** Título otimizado para <title>/SERP. Cai pra title quando ausente. */
  seoTitle?: string;
  /** Meta description dedicada (150-160 chars). Cai pra excerpt quando ausente. */
  seoDescription?: string;
  /** Imagem OG dedicada (1200x630). Cai pra coverImage quando ausente. */
  ogImage?: string;
  /** Tags/entidades nomeadas — alimenta keywords e article:tag (entity SEO). */
  tags?: string[];
  /** Resumo answer-first de 1-2 frases (40-60 palavras) — citação extraível por LLM. */
  tldr?: string;
  /** Q&A estruturado — vira FAQPage JSON-LD (sinal GEO de alto impacto). */
  faq?: BlogFaqItem[];
}

export const categoryLabels: Record<BlogCategory, string> = {
  marketing: "Marketing",
  ia: "IA & Automacao",
  cases: "Cases",
  growth: "Growth",
  cripto: "Cripto",
};

export const categoryColors: Record<BlogCategory, string> = {
  marketing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  ia: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  cases: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  growth: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  cripto: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};


// Blog: cases reais (teardowns web3) + posts SEO/GEO project-led (motor de conteúdo
// _SEO-GEO-CONTENT-ENGINE.md). Cases vêm do gerado; SEO posts são escritos à mão aqui.
export const blogPosts: BlogPost[] = [...seoPosts, ...seoPosts2, ...seoPosts3, ...seoPosts4, ...seoPosts5, ...seoPosts6, ...seoPosts7, ...caseStudies];

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
  return (post.seoDescription?.trim() || post.excerpt || "").slice(0, 160);
}

export function getModifiedAt(post: BlogPost): string {
  return post.updatedAt?.trim() || post.publishedAt;
}

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

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
