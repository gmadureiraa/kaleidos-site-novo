/**
 * Converte os drafts de marca pessoal (vault) em `src/lib/blog-marca-pessoal.ts`.
 *
 * Fonte: vault/01 - KALEIDOS/015 - BRANDING E GROWTH/marca-pessoal-founders/blog-drafts/
 * Uso:   bun run scripts/build-marca-pessoal-posts.ts
 *
 * O que decide o que entra: a lista SCHEDULE abaixo. Draft que não está na lista
 * NÃO é publicado (segurado por revisão — ver relatório da sessão 08/08/2026).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DRAFTS =
  "/Users/gabrielmadureira/GOS/vault/01 - KALEIDOS/015 - BRANDING E GROWTH/marca-pessoal-founders/blog-drafts";

/**
 * Fila de publicação. `null` = ao vivo hoje; string = data agendada (ISO).
 * Intercalada com a fila de cripto já existente (Fase 1, item 7 da decisão).
 * Drafts AUSENTES desta lista ficam segurados de propósito.
 */
const SCHEDULE: Record<string, string> = {
  // --- Lote 1: ao vivo (fundo/meio de funil, sustenta a oferta) ---
  "framework-posicionamento-founder-3-passos": "2026-08-08",
  "7-erros-linkedin-founder": "2026-08-08",
  "contratar-agencia-linkedin-founder": "2026-08-08",
  "ghostwriter-linkedin-preco": "2026-08-08",
  "roi-marca-pessoal-founder": "2026-08-08",
  "autoridade-linkedin-sem-parecer-coach": "2026-08-08",
  "otimizar-perfil-linkedin-ceo": "2026-08-08",
  "4-territorios-de-conteudo-founder": "2026-08-08",
  "frequencia-postar-linkedin-ceo": "2026-08-08",
  "marca-pessoal-founder-90-minutos-semana": "2026-08-08",
  "linkedin-vale-a-pena-2026": "2026-08-08",
  "de-zero-a-pipeline-founder-linkedin-organico": "2026-08-08",

  // --- Lote 2: agendados, 2 por semana, intercalando a fila de cripto ---
  "storytelling-historia-fundacao-que-vende": "2026-08-12",
  "founder-introvertido-autoridade-sem-camera": "2026-08-15",
  "marca-pessoal-founder-early-stage": "2026-08-19",
  "repurpose-conteudo-founder": "2026-08-22",
  "riscos-reais-exposicao-founder-mitigacao": "2026-08-26",
  "marca-pessoal-setor-tradicional": "2026-08-29",
  "sindrome-do-impostor-founder-exposicao": "2026-09-02",
  "podcast-convidado-atalho-autoridade": "2026-09-05",
  "marca-pessoal-aumentar-precos": "2026-09-09",
  "construir-em-publico-processo-vs-certeza": "2026-09-12",
  "marca-pessoal-fundraising-investidor": "2026-09-16",
  "do-founder-ao-time-employee-advocacy": "2026-09-19",
  "marca-pessoal-pos-exit-founder": "2026-09-23",
  "ia-escalar-conteudo-sem-parecer-robo": "2026-09-26",
  "vender-sem-parecer-que-esta-vendendo-linkedin": "2026-09-30",

  // --- Lote 3: liberados APÓS fact-check + correção de fonte (08/08/2026) ---
  "marca-pessoal-vs-marca-empresa": "2026-10-03",
  "marca-pessoal-canal-aquisicao": "2026-10-07",
  "conteudo-fundo-de-funil-linkedin": "2026-10-10",
  "aparecer-no-chatgpt-busca-ia": "2026-10-14",
};

/**
 * SEGURADOS de propósito — não publicar sem reescrita.
 *
 * - `dados-thought-leadership-b2b`: o "61% dos decisores B2B pagam mais por
 *   thought leadership" que dá TÍTULO ao post não existe em nenhuma edição do
 *   relatório Edelman-LinkedIn. As primárias trazem 41% (2020) e 49%/47% (2017).
 *   O texto ainda mistura três edições diferentes (2016, 2022, 2024) chamando
 *   todas de "o mesmo estudo". Ver `hold_motivo` no frontmatter do draft.
 */
const HELD = ["dados-thought-leadership-b2b"];

/** Tags por slug — alimenta keywords, article:tag e o rank de relacionados. */
const BASE_TAGS = ["marca pessoal", "founder", "linkedin", "autoridade"];
const EXTRA_TAGS: Record<string, string[]> = {
  "ghostwriter-linkedin-preco": ["ghostwriting", "preço", "contratação"],
  "contratar-agencia-linkedin-founder": ["agência", "contratação", "terceirização"],
  "roi-marca-pessoal-founder": ["roi", "métricas", "pipeline"],
  "framework-posicionamento-founder-3-passos": ["posicionamento", "framework", "nicho"],
  "otimizar-perfil-linkedin-ceo": ["perfil", "conversão", "ceo"],
  "de-zero-a-pipeline-founder-linkedin-organico": ["pipeline", "orgânico", "b2b"],
  "marca-pessoal-fundraising-investidor": ["fundraising", "investidor", "captação"],
  "do-founder-ao-time-employee-advocacy": ["employee advocacy", "time", "b2b"],
  "ia-escalar-conteudo-sem-parecer-robo": ["ia", "automação", "escala"],
  "repurpose-conteudo-founder": ["repurpose", "produção", "distribuição"],
  "podcast-convidado-atalho-autoridade": ["podcast", "earned media", "distribuição"],
  "storytelling-historia-fundacao-que-vende": ["storytelling", "narrativa", "fundação"],
  "aparecer-no-chatgpt-busca-ia": ["geo", "aeo", "ia", "busca"],
  "marca-pessoal-canal-aquisicao": ["aquisição", "canal", "b2b"],
  "marca-pessoal-vs-marca-empresa": ["marca", "posicionamento", "b2b"],
  "conteudo-fundo-de-funil-linkedin": ["funil", "conversão", "b2b"],
};

type Front = Record<string, string>;

function parse(raw: string): { front: Front; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("sem frontmatter");
  const front: Front = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (kv) front[kv[1]] = kv[2];
  }
  return { front, body: m[2].trim() };
}

/** ~220 palavras/min, mínimo 3. */
function readTime(body: string): number {
  return Math.max(3, Math.round(body.split(/\s+/).length / 220));
}

const CTA_LINK =
  "\n\n---\n\nEste artigo faz parte da trilha de [marca pessoal para founder](/blog/categoria/marca-pessoal) da Kaleidos. Se quiser ver como a gente faz isso como serviço, o detalhe está em [marca pessoal para founders](/marca-pessoal).";

const posts = readdirSync(DRAFTS)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { front, body } = parse(readFileSync(join(DRAFTS, f), "utf8"));
    return { file: f, front, body };
  })
  .filter((d) => {
    if (HELD.includes(d.front.slug)) return false;
    return Boolean(SCHEDULE[d.front.slug]);
  })
  .map((d) => {
    const slug = d.front.slug;
    return {
      slug,
      title: d.front.title,
      excerpt: d.front.description,
      seoDescription: d.front.description,
      content: d.body + CTA_LINK,
      // Vazio de propósito: cai na capa gerada (CoverArt, look "light"). Trocar
      // por um caminho real só quando houver arte de campanha pra trilha.
      coverImage: "",
      category: "marca-pessoal",
      author: {
        name: "Gabriel Madureira",
        avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
      },
      publishedAt: SCHEDULE[slug],
      updatedAt: SCHEDULE[slug],
      readTime: readTime(d.body),
      featured: false,
      tags: [...BASE_TAGS, ...(EXTRA_TAGS[slug] ?? [])],
    };
  })
  .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt) || a.slug.localeCompare(b.slug));

const header = `import type { BlogPost } from "./blog-data";

// Trilha de MARCA PESSOAL PARA FOUNDER — sustenta a oferta /marca-pessoal.
// GERADO por \`scripts/build-marca-pessoal-posts.ts\` a partir dos drafts do vault
// (015 - BRANDING E GROWTH/marca-pessoal-founders/blog-drafts). Não editar à mão:
// edite o draft no vault e rode o script de novo.

export const blogMarcaPessoal: BlogPost[] = `;

writeFileSync(
  join(process.cwd(), "src", "lib", "blog-marca-pessoal.ts"),
  header + JSON.stringify(posts, null, 2) + ";\n"
);

console.log(`${posts.length} posts escritos em src/lib/blog-marca-pessoal.ts`);
console.log(
  "ao vivo:",
  posts.filter((p) => p.publishedAt <= "2026-08-08").length,
  "| agendados:",
  posts.filter((p) => p.publishedAt > "2026-08-08").length
);
