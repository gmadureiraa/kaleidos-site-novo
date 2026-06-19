"use client";

import { BlogCategory } from "@/lib/blog-shared";

/**
 * Capa de blog gerada em codigo, estetica premium Kaleidos:
 * gradiente escuro rico + glow neon suave por categoria + motivo geometrico
 * "caleidoscopio" (anel + losango) + grão sutil. Sem ruído de arcos.
 * No card (showTitle=false) a capa é só o visual de marca (o titulo vive abaixo).
 */

type Variant = "card" | "feature" | "article" | "thumb";

const INK = "#F4F1EC";

// Accent neon por categoria (marca Kaleidos: verde + rosa dominantes).
const ACCENT: Record<BlogCategory, string> = {
  cripto: "#D262B2", // rosa
  cases: "#7CF067", // verde
  ia: "#5AC8E0", // ciano
  marketing: "#D262B2", // rosa
  growth: "#7CF067", // verde
};

// Tom secundário (profundidade do gradiente) por categoria.
const ACCENT2: Record<BlogCategory, string> = {
  cripto: "#6C3BE0",
  cases: "#1E9E6A",
  ia: "#2D5BFF",
  marketing: "#B23C8C",
  growth: "#3BA0E0",
};

const EYEBROW: Record<BlogCategory, string> = {
  cripto: "Cripto",
  cases: "Estudo de caso",
  ia: "IA & Automação",
  marketing: "Marketing",
  growth: "Growth",
};

const TITLE_SIZES: Record<Variant, string> = {
  feature: "text-[1.7rem] md:text-[2.3rem] leading-[1.05]",
  article: "text-[2rem] md:text-[3rem] leading-[1.03]",
  card: "text-[1.35rem] sm:text-[1.5rem] leading-[1.1]",
  thumb: "text-[0.95rem] leading-[1.1]",
};

const TITLE_CLAMP: Record<Variant, string> = {
  feature: "line-clamp-4",
  article: "line-clamp-4",
  card: "line-clamp-3",
  thumb: "line-clamp-3",
};

const PAD: Record<Variant, string> = {
  feature: "p-7 md:p-9",
  article: "p-8 md:p-12",
  card: "p-6",
  thumb: "p-3",
};

export function BlogCover({
  post,
  variant = "card",
  showTitle = true,
}: {
  post: { title: string; category: BlogCategory };
  variant?: Variant;
  showTitle?: boolean;
}) {
  const accent = ACCENT[post.category];
  const accent2 = ACCENT2[post.category];
  const isThumb = variant === "thumb";

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        background: `radial-gradient(120% 120% at 82% 12%, ${hexToRgba(accent2, 0.42)} 0%, #0C0C10 52%, #08080B 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Glow neon da categoria (suave, canto superior direito) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: isThumb ? "-34%" : "-26%",
          right: isThumb ? "-30%" : "-14%",
          width: isThumb ? "82%" : "56%",
          height: isThumb ? "82%" : "56%",
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.55)} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Motivo "caleidoscopio": losango + anel concentricos, offset bottom-right */}
      {!isThumb && (
        <div
          className="absolute pointer-events-none"
          style={{ right: "-12%", bottom: "-18%", width: "62%", height: "62%", opacity: 0.5 }}
        >
          <div
            className="absolute inset-0 rounded-[28%] rotate-45"
            style={{ border: `1.25px solid ${hexToRgba(accent, 0.5)}` }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "16%",
              border: `1.25px solid ${hexToRgba(INK, 0.16)}`,
            }}
          />
          <div
            className="absolute rounded-[28%] rotate-45"
            style={{
              inset: "30%",
              background: hexToRgba(accent, 0.12),
              border: `1.25px solid ${hexToRgba(accent, 0.45)}`,
            }}
          />
        </div>
      )}

      {/* Sheen diagonal sutil (premium) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(115deg, ${hexToRgba(INK, 0.05)} 0%, transparent 32%)`,
        }}
      />

      {/* Régua de acento no topo */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: isThumb ? 3 : 4, background: `linear-gradient(90deg, ${accent}, ${hexToRgba(accent, 0)})` }}
      />

      {/* Scrim de legibilidade: escurece base e topo p/ o texto sentar com contraste */}
      {showTitle && !isThumb && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba("#08080B", 0.35)} 0%, transparent 30%, transparent 48%, ${hexToRgba("#08080B", 0.72)} 100%)`,
          }}
        />
      )}

      {/* Conteúdo */}
      <div className={`relative h-full flex flex-col justify-between ${PAD[variant]}`}>
        {/* Eyebrow: chip da categoria (sempre) */}
        <div className="flex items-center gap-2">
          <span
            style={{ background: accent, boxShadow: `0 0 10px ${hexToRgba(accent, 0.8)}` }}
            className={`inline-block ${isThumb ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full shrink-0`}
          />
          <span
            className="font-mono uppercase tracking-[0.22em]"
            style={{ color: accent, fontSize: isThumb ? 8 : 11 }}
          >
            {EYEBROW[post.category]}
          </span>
        </div>

        {/* Título tratado tipograficamente NA capa (eyebrow já vive acima). */}
        {showTitle ? (
          <h3
            className={`relative font-display font-bold ${TITLE_SIZES[variant]} ${TITLE_CLAMP[variant]} tracking-[-0.02em]`}
            style={{
              color: INK,
              maxWidth: isThumb ? "100%" : "94%",
              textShadow: isThumb ? "none" : "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            {post.title}
          </h3>
        ) : (
          <span aria-hidden />
        )}

        {/* Assinatura */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono lowercase tracking-tight"
            style={{ color: INK, fontSize: isThumb ? 9 : 13, opacity: 0.55 }}
          >
            kaleidos · blog
          </span>
          {!isThumb && (
            <span className="font-mono" style={{ color: accent, fontSize: 14, fontWeight: 700 }}>
              ↗
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
