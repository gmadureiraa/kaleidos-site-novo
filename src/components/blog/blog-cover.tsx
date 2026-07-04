"use client";

import { BlogCategory } from "@/lib/blog-shared";
import { coverStyleFor } from "@/lib/cover-style";
import { CoverArt } from "@/components/blog/blog-cover-variants";

/**
 * Capa de blog — 2 looks-padrão (escolha do Gabriel), atribuídos por categoria
 * (ver `@/lib/cover-style`): claro (rosa→verde + colagem P&B) pra marketing/ia/
 * growth, escuro (verde-escuro + halftone) pra cripto/cases. Renderizada via
 * `CoverArt` (mesma arte usada na seção de recursos do `/2`), preenchendo o
 * container — quem controla aspect-ratio/borda é o pai (card/feature/article).
 */

type Variant = "card" | "feature" | "article" | "thumb";

export function BlogCover({
  post,
  variant = "card",
}: {
  post: { title: string; category: BlogCategory; slug: string; coverPhrase?: string; coverImage?: string };
  variant?: Variant;
  /** Mantido por compatibilidade — a capa-padrão não imprime o título. */
  showTitle?: boolean;
}) {
  const look = coverStyleFor(post.slug, post.category);
  // O índice de fallback de colagem deriva do slug (determinístico, sem random).
  let h = 0;
  for (let i = 0; i < post.slug.length; i++) h = (h * 31 + post.slug.charCodeAt(i)) >>> 0;

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      <CoverArt
        slug={post.slug}
        category={post.category}
        index={h}
        look={look}
        title={post.title}
        phrase={post.coverPhrase}
        fill
        compact={variant === "thumb"}
      />
    </div>
  );
}
