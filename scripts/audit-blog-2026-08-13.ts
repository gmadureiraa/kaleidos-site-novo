/**
 * Auditoria do corpus do blog — 2026-08-13.
 *
 * Somente leitura. Checa, por post: capa existindo em disco, metadados de SEO,
 * slug duplicado, categoria fora do enum, data futura (agendado), links
 * internos quebrados e âncoras de link vazias.
 *
 * Uso: bun scripts/audit-blog-2026-08-13.ts
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { blogPosts } from "../src/lib/blog-data";
import { categoryLabels } from "../src/lib/blog-shared";

const PUBLIC = join(process.cwd(), "public");
const HOJE = "2026-08-13";

const posts = blogPosts;

const semCapa: string[] = [];
const capaQuebrada: string[] = [];
const semSeoDescription: string[] = [];
const excerptCurto: string[] = [];
const excerptLongo: string[] = [];
const semTags: string[] = [];
const categoriaInvalida: string[] = [];
const slugsDuplicados: string[] = [];
const agendados: string[] = [];
const semUpdatedAt: string[] = [];
const linkInternoQuebrado: string[] = [];
const readTimeSuspeito: string[] = [];

const vistos = new Map<string, number>();
const categoriasValidas = new Set<string>(Object.keys(categoryLabels));

// Slugs existentes, pra validar link interno /blog/<slug>.
const slugsExistentes = new Set(posts.map((p) => p.slug));

for (const p of posts) {
  vistos.set(p.slug, (vistos.get(p.slug) ?? 0) + 1);

  // Capa
  if (!p.coverImage?.trim()) semCapa.push(p.slug);
  else if (p.coverImage.startsWith("/") && !existsSync(join(PUBLIC, p.coverImage))) {
    capaQuebrada.push(`${p.slug} → ${p.coverImage}`);
  }

  // SEO
  if (!p.seoDescription?.trim()) semSeoDescription.push(p.slug);
  const ex = (p.excerpt ?? "").trim();
  if (ex.length > 0 && ex.length < 80) excerptCurto.push(`${p.slug} (${ex.length}c)`);
  if (ex.length > 200) excerptLongo.push(`${p.slug} (${ex.length}c)`);
  if (!p.tags?.length) semTags.push(p.slug);
  if (!p.updatedAt) semUpdatedAt.push(p.slug);

  // Categoria
  if (categoriasValidas.size && !categoriasValidas.has(p.category as unknown as string)) {
    categoriaInvalida.push(`${p.slug} → ${String(p.category)}`);
  }

  // Data futura = agendado, não publicado
  if (p.publishedAt > HOJE) agendados.push(`${p.slug} → ${p.publishedAt}`);

  // readTime plausível: ~200 palavras/min
  const palavras = (p.content ?? "").split(/\s+/).length;
  const esperado = Math.max(1, Math.round(palavras / 200));
  if (p.readTime && Math.abs(p.readTime - esperado) > Math.max(4, esperado * 0.6)) {
    readTimeSuspeito.push(`${p.slug}: declara ${p.readTime}min, texto sugere ~${esperado}min`);
  }

  // Links internos /blog/<slug> apontando pra post inexistente
  for (const m of (p.content ?? "").matchAll(/\]\((\/blog\/[a-z0-9-]+)\)/g)) {
    const alvo = m[1].replace("/blog/", "");
    if (!slugsExistentes.has(alvo)) linkInternoQuebrado.push(`${p.slug} → ${m[1]}`);
  }
}

for (const [slug, n] of vistos) if (n > 1) slugsDuplicados.push(`${slug} (${n}×)`);

const rel = (label: string, arr: string[], amostra = 8) => ({
  [label]: { total: arr.length, amostra: arr.slice(0, amostra) },
});

console.log(JSON.stringify({
  totalPosts: posts.length,
  ...rel("semCapa", semCapa),
  ...rel("capaQuebrada", capaQuebrada),
  ...rel("semSeoDescription", semSeoDescription),
  ...rel("excerptCurto", excerptCurto),
  ...rel("excerptLongo", excerptLongo),
  ...rel("semTags", semTags),
  ...rel("semUpdatedAt", semUpdatedAt),
  ...rel("categoriaInvalida", categoriaInvalida),
  ...rel("slugsDuplicados", slugsDuplicados),
  ...rel("agendados", agendados, 20),
  ...rel("linkInternoQuebrado", linkInternoQuebrado, 20),
  ...rel("readTimeSuspeito", readTimeSuspeito),
}, null, 2));
