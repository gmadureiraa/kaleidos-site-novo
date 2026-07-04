// Módulo LEVE e client-safe do blog: tipos + helpers de card + labels/cores +
// formatação de data. NÃO importa nenhum arquivo de conteúdo (blog-seo-posts*,
// blog-cases.generated). Componentes "use client" (cards, listagem, home) devem
// importar DAQUI — assim o markdown completo dos posts (~1MB) nunca entra no
// bundle client. `blog-data.ts` (server) re-exporta tudo isto pra manter
// compatibilidade dos imports existentes.

import type { CoverStyle } from "@/lib/cover-style";

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
  /** Override do estilo de capa (seção de recursos do /2). Ausente = determinístico por hash do slug. */
  coverStyle?: CoverStyle;
  /**
   * TESTE de novo estilo de capa: frase curta e afiada (3-6 palavras) que
   * DISPARA a variante "phrase" da capa (fundo sóbrio + tipografia forte +
   * elemento geométrico solto). Ausente = capa-padrão atual (inalterada).
   * Frontmatter: `cover_phrase:`.
   */
  coverPhrase?: string;
}

/**
 * Projeção LEVE de um post pra renderizar CARDS (home + listagem do blog).
 * Contém só os campos que a UI de card precisa — NÃO inclui `content`, `faq`,
 * `tldr` nem os SEO longos.
 */
export type BlogCardMeta = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "excerpt"
  | "coverImage"
  | "category"
  | "publishedAt"
  | "readTime"
  | "featured"
  | "coverStyle"
  | "coverPhrase"
>;

/** Reduz um BlogPost ao subset de card (descarta content/faq/tldr/seo longos). */
export function toBlogCard(post: BlogPost): BlogCardMeta {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    featured: post.featured,
    coverStyle: post.coverStyle,
    coverPhrase: post.coverPhrase,
  };
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

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Data de modificação com fallback pra data de publicação (freshness GEO). */
export function getModifiedAt(post: Pick<BlogPost, "updatedAt" | "publishedAt">): string {
  return post.updatedAt?.trim() || post.publishedAt;
}
