import { blogPosts } from "../src/lib/blog-data";
const out = blogPosts.map(p => ({
  slug: p.slug, title: p.title, seoTitle: p.seoTitle ?? null,
  seoDescription: ((p.seoDescription ?? p.excerpt) ?? "").slice(0,180),
  category: p.category, publishedAt: p.publishedAt,
  tags: p.tags ?? [], featured: !!p.featured, contentLen: p.content.length,
  h1s: (p.content.match(/^# /gm) || []).length,
}));
console.log(JSON.stringify(out, null, 1));
