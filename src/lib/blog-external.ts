/**
 * blog-external.ts — carrega posts publicados no KAI (tabela external_blog_posts)
 * via o endpoint público /api/public-blog-feed, pra merjar com os posts em código.
 *
 * STATUS: scaffolding inerte. Nada importa este módulo ainda — ele só passa a
 * valer quando `blog-data.ts` chamar `fetchExternalPosts()` e a página de blog
 * virar async (ver _INTEGRACAO-BLOG-NEWSLETTER doc no kai-app). Mantido build-safe:
 * sem env `KAI_BLOG_FEED_URL`, devolve [] e nunca lança.
 *
 * Como ligar (quando decidir):
 *   1. Setar no Vercel do site-kaleidos:
 *        KAI_BLOG_FEED_URL = https://kai.kaleidos.com.br/api/public-blog-feed
 *        KAI_BLOG_FEED_TOKEN = <BLOG_FEED_TOKEN do kai-app>   (opcional)
 *   2. Em blog-data.ts, transformar `blogPosts` numa função async OU buscar
 *      em generateStaticParams + na page e concatenar com os arrays estáticos.
 *   3. No kai-app, setar SITE_KALEIDOS_DEPLOY_HOOK = <Deploy Hook deste projeto>
 *      pra cada publicação no KAI rebuildar o site automaticamente.
 */
import type { BlogPost } from "./blog-data";

interface FeedPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: { name: string; avatar: string };
  publishedAt: string | null;
  updatedAt: string | null;
  tags: string[];
}

const VALID_CATS = ["marketing", "ia", "cases", "growth", "cripto"] as const;

/**
 * Busca posts publicados no KAI. Build-safe: sem env ou em qualquer erro,
 * devolve [] (o build segue só com os posts em código).
 */
export async function fetchExternalPosts(target = "kaleidos"): Promise<BlogPost[]> {
  const base = process.env.KAI_BLOG_FEED_URL;
  if (!base) return [];

  try {
    const url = new URL(base);
    url.searchParams.set("target", target);
    const token = process.env.KAI_BLOG_FEED_TOKEN;
    if (token) url.searchParams.set("token", token);

    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = (await res.json()) as { ok?: boolean; posts?: FeedPost[] };
    if (!json.ok || !Array.isArray(json.posts)) return [];

    return json.posts.map((p): BlogPost => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage || "",
      category: (VALID_CATS as readonly string[]).includes(p.category)
        ? (p.category as BlogPost["category"])
        : "marketing",
      author: p.author,
      publishedAt: (p.publishedAt ?? "").slice(0, 10),
      updatedAt: p.updatedAt ? p.updatedAt.slice(0, 10) : undefined,
      readTime: Math.max(3, Math.round(p.content.trim().split(/\s+/).length / 200)),
      tags: p.tags,
    }));
  } catch {
    return [];
  }
}
