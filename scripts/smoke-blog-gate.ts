/**
 * Smoke E2E do gate de agendamento, contra um servidor de verdade.
 *
 * Prova as duas metades da correção:
 *  1. TODO post agendado responde 404 (não soft-404: status 404 mesmo).
 *  2. TODO post publicado responde 200 e nenhum link interno da página servida
 *     leva a 404.
 *
 * Uso:
 *   bun run build && bun run start &          # ou PORT=3000
 *   SMOKE_BASE_URL=http://localhost:3000 bun scripts/smoke-blog-gate.ts
 */
import { blogPosts, isPublished } from "../src/lib/blog-data";

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const now = new Date();
const agendados = blogPosts.filter((p) => !isPublished(p, now));
const publicados = blogPosts.filter((p) => isPublished(p, now));

async function status(path: string): Promise<number> {
  const res = await fetch(BASE + path, { redirect: "manual" });
  await res.arrayBuffer();
  return res.status;
}

async function html(path: string): Promise<string> {
  const res = await fetch(BASE + path);
  return res.text();
}

const falhas: string[] = [];

console.log(`[smoke] ${BASE} · ${agendados.length} agendados · ${publicados.length} publicados`);

for (const post of agendados) {
  const s = await status(`/blog/${post.slug}`);
  if (s !== 404) falhas.push(`AGENDADO deveria ser 404: /blog/${post.slug} -> ${s}`);
}
console.log(`[smoke] agendados verificados`);

const linksInternos = new Set<string>();
for (const post of publicados) {
  const s = await status(`/blog/${post.slug}`);
  if (s !== 200) {
    falhas.push(`PUBLICADO deveria ser 200: /blog/${post.slug} -> ${s}`);
    continue;
  }
  const body = await html(`/blog/${post.slug}`);
  for (const m of body.matchAll(/href="(\/blog\/[^"#?]*)"/g)) linksInternos.add(m[1]);
}
console.log(`[smoke] publicados verificados · ${linksInternos.size} links internos únicos no HTML servido`);

for (const link of linksInternos) {
  const s = await status(link);
  if (s !== 200) falhas.push(`LINK INTERNO em página pública leva a ${s}: ${link}`);
}

if (falhas.length) {
  console.error(`\n❌ ${falhas.length} falha(s):`);
  falhas.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log("\n✅ gate de agendamento OK: nenhum agendado acessível, nenhum link interno quebrado.");
