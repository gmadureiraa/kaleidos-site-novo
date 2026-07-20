// Gera src/lib/og-meta.generated.ts — mapa SLIM (slug → título/look/label) usado
// pela rota edge `opengraph-image.tsx`. A rota edge NÃO pode importar blog-data
// (megabytes de markdown estourariam o limite de bundle da Edge Function), então
// esse script destila só o necessário e o arquivo gerado é commitado.
//
// RODAR SEMPRE que adicionar/remover posts: `bun scripts/generate-og-meta.ts`
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/lib/blog-data";
import { categoryLabels } from "../src/lib/blog-shared";
import { coverStyleFor } from "../src/lib/cover-style";

const entries = blogPosts.map((p) => {
  const look = coverStyleFor(p.slug, p.category, p.coverStyle);
  return `  "${p.slug}": { t: ${JSON.stringify(p.title)}, look: "${look}", label: ${JSON.stringify(
    categoryLabels[p.category]
  )} },`;
});

const out = `// AUTO-GERADO por scripts/generate-og-meta.ts — NÃO editar à mão.
// Mapa slim pra rota edge opengraph-image.tsx (sem importar blog-data inteiro).
// Regenerar após adicionar/remover posts: \`bun scripts/generate-og-meta.ts\`
export type OgLook = "light" | "dark";
export const OG_META: Record<string, { t: string; look: OgLook; label: string }> = {
${entries.join("\n")}
};
`;

const dest = fileURLToPath(new URL("../src/lib/og-meta.generated.ts", import.meta.url));
writeFileSync(dest, out);
console.log(`og-meta: ${blogPosts.length} posts → ${dest}`);
