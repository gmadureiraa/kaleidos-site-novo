import { ImageResponse } from "next/og";
import { OG_META } from "@/lib/og-meta.generated";

// Capa de Open Graph GERADA POR POST (1200x630). Espelha os 2 looks de capa do
// blog (`@/lib/cover-style`): dark (verde-escuro) pra cripto/cases, light
// (rosa→verde) pras demais. Substitui a Capa.png fixa que TODOS os posts
// compartilhavam — cada post tem preview único.
//
// LIÇÕES DA TENTATIVA ANTERIOR (revertida em ab991e9, 500 em prod):
// - runtime "nodejs" quebrava (assets não traçados na function). O caminho certo
//   é runtime "edge" + fetch(new URL('./font.ttf', import.meta.url)) — padrão
//   oficial do next/og, que embute o asset no bundle edge.
// - NÃO importar blog-data aqui: o markdown completo (vários MB) estoura o limite
//   da Edge Function. Usamos o mapa slim `og-meta.generated.ts` (só título+look).

export const runtime = "edge";

export const alt = "Blog da Kaleidos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paleta do design system (igual a blog-cover-variants.tsx).
const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

// Fontes co-localizadas na pasta da rota, embutidas no bundle edge via
// fetch(new URL(..., import.meta.url)). Inter cobre PT-BR com acentos.
async function loadFonts() {
  try {
    const [extraBold, semiBold] = await Promise.all([
      fetch(new URL("./Inter_28pt-ExtraBold.ttf", import.meta.url)).then((r) =>
        r.arrayBuffer()
      ),
      fetch(new URL("./Inter_24pt-SemiBold.ttf", import.meta.url)).then((r) =>
        r.arrayBuffer()
      ),
    ]);
    return [
      { name: "InterExtraBold", data: extraBold, style: "normal" as const, weight: 800 as const },
      { name: "InterSemiBold", data: semiBold, style: "normal" as const, weight: 600 as const },
    ];
  } catch {
    // fallback: sem fonte custom → ImageResponse usa a default, nunca 500.
    return [];
  }
}

function titleFontSize(len: number): number {
  if (len <= 38) return 78;
  if (len <= 68) return 62;
  if (len <= 100) return 50;
  return 42;
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const meta = OG_META[slug];

  const fonts = await loadFonts();

  const title = meta?.t ?? "Blog da Kaleidos";
  const look = meta?.look ?? "light";
  const label = meta?.label ?? "Blog";
  const dark = look === "dark";
  const accent = dark ? GREEN : PINK;
  const titleColor = dark ? "#FAFAFA" : INK;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          position: "relative",
          background: dark
            ? "linear-gradient(135deg, #06250a 0%, #0d3a10 100%)"
            : "linear-gradient(135deg, rgba(210,98,178,0.16) 0%, #FAFAF7 52%, rgba(124,240,103,0.20) 100%)",
        }}
      >
        {/* barra de acento da categoria (topo) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: accent,
          }}
        />

        {/* topo: chip da categoria + nome da marca */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "InterSemiBold",
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: dark ? "#06250a" : "#3a0a2c",
              background: accent,
              border: `2px solid ${INK}`,
              borderRadius: 12,
              padding: "10px 22px",
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "InterExtraBold",
              fontSize: 30,
              letterSpacing: 4,
              color: titleColor,
            }}
          >
            KALEIDOS
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                marginLeft: 8,
                background: accent,
              }}
            />
          </div>
        </div>

        {/* título grande */}
        <div
          style={{
            display: "flex",
            fontFamily: "InterExtraBold",
            fontSize: titleFontSize(title.length),
            lineHeight: 1.06,
            letterSpacing: -1.5,
            color: titleColor,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* rodapé */}
        <div
          style={{
            display: "flex",
            fontFamily: "InterSemiBold",
            fontSize: 26,
            color: dark ? "rgba(250,250,250,0.72)" : "rgba(20,17,13,0.6)",
          }}
        >
          kaleidos.com.br/blog
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
