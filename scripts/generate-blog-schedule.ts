/**
 * Gera `src/lib/blog-schedule.generated.ts`: mapa slug -> publishedAt de TODO o
 * acervo estático do blog.
 *
 * Quem consome é o `src/middleware.ts`, que precisa decidir 404 vs. 200 pra post
 * agendado ANTES do render — e roda no edge, onde não dá pra importar
 * `blog-data.ts` (arrasta ~1MB de markdown).
 *
 * Roda sozinho no `prebuild` (package.json). Não edite o arquivo gerado à mão;
 * `blog-schedule.test.ts` falha se ele estiver dessincronizado do acervo.
 */
import { writeFileSync } from "fs";
import { blogPosts } from "../src/lib/blog-data";

const map: Record<string, string> = {};
for (const post of [...blogPosts].sort((a, b) => a.slug.localeCompare(b.slug))) {
  map[post.slug] = post.publishedAt;
}

const out = `// ⚠️ ARQUIVO GERADO — não edite à mão.
// Fonte: scripts/generate-blog-schedule.ts (roda no prebuild).
// Mapa slug -> publishedAt, consumido pelo middleware pra gatear post agendado.

export const BLOG_PUBLISHED_AT: Record<string, string> = ${JSON.stringify(map, null, 2)};
`;

writeFileSync("src/lib/blog-schedule.generated.ts", out);
console.log(`[blog-schedule] ${Object.keys(map).length} slugs gravados em src/lib/blog-schedule.generated.ts`);
