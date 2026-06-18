#!/usr/bin/env node
// Gera src/lib/blog-seo-posts-7.ts a partir dos 10 drafts em kaleidos-blog-drafts/.
// Datas de publishedAt escalonadas (2 live + 8 futuras às terças). updatedAt = publishedAt.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const DRAFTS_DIR =
  "/Users/gabrielmadureira/GOS/code/kaleidos-papers/kaleidos-blog-drafts";
const OUT = path.join(__dirname, "..", "src", "lib", "blog-seo-posts-7.ts");

// Ordem do calendário (W1->W10) + data de publicação atribuída.
// Hoje = 2026-06-17 (qua). 2 live (terças passadas) + 8 futuras (terças a partir de 23/06).
const SCHEDULE = [
  { slug: "melhores-agencias-marketing-cripto-brasil-2026", date: "2026-06-09" }, // live
  { slug: "hyperliquid-estrategia-marketing-teardown", date: "2026-06-16" }, // live
  { slug: "agencia-boutique-vs-grande-marketing-cripto", date: "2026-06-23" },
  { slug: "gtm-web3-go-to-market-cripto", date: "2026-06-30" },
  { slug: "projetos-web3-brasileiros-2026", date: "2026-07-07" },
  { slug: "pudgy-penguins-marketing-marca-teardown", date: "2026-07-14" },
  { slug: "mindshare-vs-vanity-metrics-cripto", date: "2026-07-21" },
  { slug: "branding-web3-marca-cripto-memoravel", date: "2026-07-28" },
  { slug: "listing-exchange-marketing-cripto", date: "2026-08-04" },
  { slug: "ia-marketing-cripto-automacao-conteudo", date: "2026-08-11" },
];

const VALID_CATEGORIES = new Set(["marketing", "ia", "cases", "growth", "cripto"]);

function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("frontmatter não encontrado");
  return { fm: yaml.load(m[1]), body: m[2].replace(/^\s+/, "") };
}

function readTimeFromBody(body) {
  const words = body.replace(/[#>*_`\[\]()]/g, " ").split(/\s+/).filter(Boolean)
    .length;
  return Math.max(3, Math.round(words / 200));
}

// Serializa string como template literal TS (content tem markdown multilinha).
function tpl(s) {
  return "`" + String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
}
// Serializa string curta como literal entre aspas duplas.
function str(s) {
  return JSON.stringify(String(s));
}

const posts = SCHEDULE.map(({ slug, date }) => {
  const file = path.join(DRAFTS_DIR, slug + ".md");
  const raw = fs.readFileSync(file, "utf8");
  const { fm, body } = splitFrontmatter(raw);
  if (fm.slug !== slug) throw new Error(`slug mismatch ${fm.slug} != ${slug}`);
  if (!VALID_CATEGORIES.has(fm.category))
    throw new Error(`categoria inválida em ${slug}: ${fm.category}`);
  const faq = (fm.faq || []).map((x) => ({
    question: x.q ?? x.question,
    answer: x.a ?? x.answer,
  }));
  return {
    slug: fm.slug,
    title: fm.title,
    seoTitle: fm.title,
    excerpt: fm.metaDescription,
    seoDescription: fm.metaDescription,
    category: fm.category,
    publishedAt: date,
    updatedAt: date,
    readTime: readTimeFromBody(body),
    featured: false,
    tags: fm.tags || [],
    tldr: fm.tldr || "",
    faq,
    coverImage: "",
    content: body.trimEnd() + "\n",
  };
});

function renderFaq(faq) {
  if (!faq.length) return "[]";
  return (
    "[\n" +
    faq
      .map(
        (f) =>
          "      {\n" +
          `        question: ${str(f.question)},\n` +
          `        answer: ${str(f.answer)},\n` +
          "      },"
      )
      .join("\n") +
    "\n    ]"
  );
}

function renderTags(tags) {
  if (!tags.length) return "[]";
  return "[" + tags.map((t) => str(t)).join(", ") + "]";
}

function renderPost(p) {
  return (
    "  {\n" +
    `    slug: ${str(p.slug)},\n` +
    `    title: ${str(p.title)},\n` +
    `    seoTitle: ${str(p.seoTitle)},\n` +
    `    excerpt: ${str(p.excerpt)},\n` +
    `    seoDescription: ${str(p.seoDescription)},\n` +
    `    category: ${str(p.category)},\n` +
    `    author: AUTHOR,\n` +
    `    publishedAt: ${str(p.publishedAt)},\n` +
    `    updatedAt: ${str(p.updatedAt)},\n` +
    `    readTime: ${p.readTime},\n` +
    `    featured: ${p.featured},\n` +
    `    tags: ${renderTags(p.tags)},\n` +
    `    tldr: ${str(p.tldr)},\n` +
    `    faq: ${renderFaq(p.faq)},\n` +
    `    coverImage: "",\n` +
    `    content: ${tpl(p.content)},\n` +
    "  }"
  );
}

const header = `import type { BlogPost } from "./blog-data";

// Posts SEO/GEO project-led — lote 7 (motor de conteúdo 12 semanas, calendário
// hub-and-spoke da Lunar). Gerado por scripts/gen-blog-seo-7.cjs a partir dos
// drafts em kaleidos-papers/kaleidos-blog-drafts/*.md. NÃO editar à mão — re-rodar
// o gerador. publishedAt escalonado (2 live + 8 agendados às terças). O filtro
// de agendamento (publishedAt <= now) vive em blog-data.ts (getPublishedPosts).
// Conteúdo verbatim dos drafts; sem travessão decorativo no corpo.

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const seoPosts7: BlogPost[] = [
`;

const out = header + posts.map(renderPost).join(",\n") + ",\n];\n";
fs.writeFileSync(OUT, out, "utf8");
console.log("Wrote", OUT, "with", posts.length, "posts");
for (const p of posts) console.log(`  ${p.publishedAt}  ${p.category.padEnd(9)} ${p.slug} (${p.readTime}min, faq:${p.faq.length})`);
