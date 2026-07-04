/**
 * Blog cover VARIANTS — 2 looks determinísticos por CATEGORIA.
 *
 * Escolha do Gabriel: só 2 estilos de capa-padrão, atribuídos por categoria via
 * `coverStyleFor(slug, category, override)` em `@/lib/cover-style`:
 *   A · "light" → gradiente suave rosa→verde + colagem P&B no centro + badge
 *                 (ex: cérebro-óculos / "MARKETING"). marketing/ia/growth.
 *   B · "dark"  → fundo verde-escuro + textura de pontos + colagem halftone +
 *                 badge verde (ex: homem-relógio / "CRIPTO"). cripto/cases.
 *
 * Usado tanto na seção de recursos do `/2` (`web3v2/resources.tsx`, via
 * `BlogCoverVariant`) quanto na `/blog` (via `CoverArt` em `blog-cover.tsx`).
 * Mantém as colagens P&B do design system (`/v2/elements/*.png`).
 *
 * 2026-07-03: revertidos os testes de capa "PHRASE" (elemento solto) e "IMAGE"
 * (imagem de fundo) — ficavam tortos atrás do texto. A capa voltou a ser a
 * ORIGINAL; `cover_phrase`, quando presente, entra só como uma LINHA DE TEXTO
 * COMPLEMENTAR menor (kicker) acima do título.
 */
import type { BlogCategory } from "@/lib/blog-shared";
import { categoryLabels } from "@/lib/blog-shared";
import { coverStyleFor, type CoverStyle } from "@/lib/cover-style";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

// Pool de colagens do design system (P&B + cor) pra capa VISUAL (sem repetir o
// título). Escolha determinística por hash do slug. Todas existem em
// /public/v2/elements.
const COVER_IMAGE_POOL = [
  "/v2/elements/colagem-cerebro-oculos.webp",
  "/v2/elements/colagem-megafone-mao-pb.webp",
  "/v2/elements/colagem-mao-smartphone-neon.webp",
  "/v2/elements/colagem-maos-dinheiro-bitcoin.webp",
  "/v2/elements/colagem-homem-relogio-correndo.webp",
  "/v2/elements/colagem-computador-retro-amarelo.webp",
  "/v2/elements/colagem-tvs-retro-empilhadas.webp",
  "/v2/elements/colagem-mao-cursor-criacao.webp",
  "/v2/elements/colagem-washington-dolar-verde.webp",
  "/v2/elements/colagem-estatua-pensador-cabeca.webp",
  "/v2/elements/elemento-olho-halftone-pb.webp",
  "/v2/elements/colagem-mao-robo-humana.webp",
  "/v2/elements/colagem-dali-boca-pb.webp",
  "/v2/elements/colagem-maos-laptop-setas-rosa.webp",
];
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function coverImageFor(slug: string): string {
  return COVER_IMAGE_POOL[hashStr(slug) % COVER_IMAGE_POOL.length];
}

function Chip({ look, category }: { look: CoverStyle; category: BlogCategory }) {
  const bg = look === "dark" ? GREEN : PINK;
  const ink = look === "dark" ? "#06250a" : "#3a0a2c";
  return (
    <span
      style={{
        position: "absolute",
        left: 12,
        bottom: 11,
        fontFamily: "Gridlite, monospace",
        fontSize: 11,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: ink,
        background: bg,
        border: `1.5px solid ${INK}`,
        borderRadius: 7,
        padding: "5px 10px",
        fontWeight: 700,
      }}
    >
      {categoryLabels[category]}
    </span>
  );
}

/**
 * Arte da capa — EDITORIAL / TIPOGRÁFICA (escolha do Gabriel: nada de "imagem
 * aleatória diferente por post"). Só 2 looks por categoria (claro/escuro): cor da
 * categoria + título grande + selo da marca (olho Kaleidos). Determinístico,
 * sem fetch e sem colagem por slug.
 *
 * Por padrão usa um FRAME 16/11 com borda inferior (uso no /2). Com `fill`,
 * ocupa 100% do container pai (uso no /blog). `compact` esconde o badge.
 *
 * `phrase` (do campo `cover_phrase`): quando presente, entra como uma LINHA DE
 * TEXTO COMPLEMENTAR menor (kicker) acima do título — não substitui a capa.
 */
export function CoverArt({
  slug,
  category,
  index = 0,
  look,
  title,
  fill = false,
  compact = false,
  visual = false,
  phrase,
}: {
  slug: string;
  category: BlogCategory;
  index?: number;
  look: CoverStyle;
  title?: string;
  fill?: boolean;
  compact?: boolean;
  /** Capa VISUAL: colagem do design system no lugar do título tipográfico. */
  visual?: boolean;
  /** Linha de texto complementar (kicker) acima do título. Vem de `cover_phrase`. */
  phrase?: string;
}) {
  void index;
  const dark = look === "dark";
  // Cor de acento da categoria: cripto/cases = verde · resto = rosa.
  const accent = category === "cripto" || category === "cases" ? GREEN : PINK;
  const titleColor = dark ? "#FAFAFA" : INK;

  const base: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, overflow: "hidden" }
    : {
        position: "relative",
        aspectRatio: "16 / 11",
        overflow: "hidden",
        borderBottom: `2px solid ${INK}`,
      };

  return (
    <div
      className="w3-resimg-wrap"
      style={{
        ...base,
        background: dark
          ? "linear-gradient(135deg, #06250a 0%, #0d3a10 100%)"
          : "linear-gradient(135deg, rgba(210,98,178,.14) 0%, #FAFAF7 52%, rgba(124,240,103,.16) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* textura de pontos */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 0.4 : 0.28,
          backgroundImage: `radial-gradient(${dark ? "rgba(124,240,103,.34)" : "rgba(20,17,13,.1)"} 1px, transparent 1.6px)`,
          backgroundSize: dark ? "10px 10px" : "16px 16px",
        }}
      />
      {/* capa VISUAL: colagem do design system preenchendo o frame (sem repetir
          o título, que aparece no corpo do card). */}
      {visual && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverImageFor(slug)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w3-resimg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      {/* barra de acento da categoria (topo) */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: accent,
        }}
      />
      {/* selo da marca (olho Kaleidos) no canto — paths inline pra funcionar
          em qualquer rota (o symbol #kal-eye só existe no /2). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 693.63"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 34,
          height: 24,
          fill: dark ? "#FAFAFA" : INK,
          opacity: 0.92,
        }}
      >
        <path d="M1000,347.24c0-.14-.02-.28-.02-.43s.02-.28.02-.42c0-7.97-.37-15.85-.9-23.69-.02-.27-.04-.54-.06-.81C986.64,144.67,840.99,4.27,661.58.2v-.2h-323.17v.2C159.21,4.26,13.68,144.36,1,321.3c-.03.41-.06.82-.09,1.24-.54,7.89-.91,15.83-.91,23.85,0,.14.02.28.02.43s-.02.28-.02.42c0,7.97.37,15.85.9,23.69.02.27.04.54.06.81,12.4,177.22,158.05,317.62,337.46,321.69v.2h323.17v-.2c179.21-4.06,324.73-144.16,337.42-321.1.03-.41.06-.82.09-1.24.54-7.89.91-15.83.91-23.85ZM653.05,592.15h-305.9c-156.47,0-288.71-103.45-332.23-245.66C58.65,204.62,190.73,101.48,346.95,101.48h305.9c156.47,0,288.71,103.45,332.23,245.66-43.73,141.87-175.81,245-332.03,245Z" />
        <path d="M906.28,342.64c-63.42-80.67-161.9-132.49-272.48-132.49v.17c73.08,0,132.32,59.24,132.32,132.32s-59.24,132.32-132.32,132.32v.17c110.58,0,209.06-51.82,272.48-132.49Z" />
        <path d="M93.44,342.64c63.42-80.67,161.9-132.49,272.48-132.49v.17c-73.08,0-132.32,59.24-132.32,132.32,0,73.08,59.24,132.32,132.32,132.32v.17c-110.58,0-209.06-51.82-272.48-132.49Z" />
        <path d="M500.02,475.51c.12-73.38,59.62-132.82,133.03-132.83-73.14-.01-132.44-59.04-132.99-132.05-.03,0-.05,0-.08,0-.55,72.69-59.35,131.48-132.05,132,0,.03,0,.06,0,.09,72.97.52,131.98,59.72,132.1,132.79Z" />
      </svg>
      {/* TEXTO DA CAPA — a FRASE de capa (`cover_phrase`), que NÃO repete o
          título do post (o título já aparece no corpo do card). Fallback pro
          título só se o post ainda não tiver frase. Escondido na capa VISUAL. */}
      {!visual && (phrase || title) && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: compact ? "0 18px" : "0 26px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "Atelier, sans-serif",
              fontWeight: 700,
              fontSize: compact ? "clamp(15px,4.8vw,20px)" : "clamp(18px,3.2vw,28px)",
              lineHeight: 1.08,
              letterSpacing: "-0.6px",
              color: titleColor,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {phrase || title}
            {phrase && <span style={{ color: accent }}>.</span>}
          </h3>
        </div>
      )}
      {!compact && <Chip look={look} category={category} />}
    </div>
  );
}

export function BlogCoverVariant({
  slug,
  category,
  title,
  index,
  override,
}: {
  slug: string;
  category: BlogCategory;
  title?: string;
  index: number;
  override?: CoverStyle;
}) {
  const look = coverStyleFor(slug, category, override);
  // No carrossel do /2 a capa é VISUAL (colagem do design system), pra não
  // repetir o título que já aparece logo abaixo no corpo do card.
  return (
    <CoverArt
      slug={slug}
      category={category}
      index={index}
      look={look}
      title={title}
      visual
    />
  );
}
