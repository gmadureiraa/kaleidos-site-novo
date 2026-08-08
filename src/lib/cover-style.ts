// Seletor DETERMINÍSTICO de estilo de capa de blog (rota /2 + /blog).
// NUNCA usar Math.random — site estático, precisa casar SSR/CSR.
// Reduzido pra 2 LOOKS (escolha do Gabriel), atribuídos por CATEGORIA:
//  - "light"  → fundo gradiente suave rosa→verde + colagem P&B + badge (marketing/ia/growth)
//  - "dark"   → fundo verde-escuro + textura de pontos + colagem halftone + badge verde (cripto/cases)

import type { BlogCategory } from "@/lib/blog-shared";

export type CoverStyle = "light" | "dark";

export const COVER_STYLES: CoverStyle[] = ["light", "dark"];

// Atribuição por categoria. Cripto e cases = escuro; o resto = claro.
const BY_CATEGORY: Record<BlogCategory, CoverStyle> = {
  cripto: "dark",
  cases: "dark",
  marketing: "light",
  ia: "light",
  growth: "light",
  "marca-pessoal": "light",
};

/** Sanitiza overrides legados (ex: "dark-glow") pros 2 looks válidos. */
function normalize(value?: string): CoverStyle | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}

export function coverStyleFor(
  _slug: string,
  category: BlogCategory,
  override?: string
): CoverStyle {
  return normalize(override) ?? BY_CATEGORY[category] ?? "light";
}

/** Lista de estilos por item (mantida pra compatibilidade com resources.tsx). */
export function coverStylesForList(
  items: { slug: string; category: BlogCategory; coverStyle?: string }[]
): CoverStyle[] {
  return items.map((it) => coverStyleFor(it.slug, it.category, it.coverStyle));
}
