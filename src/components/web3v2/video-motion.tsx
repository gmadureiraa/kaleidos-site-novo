/**
 * Web3 V2 — "Vídeo & Motion" (rota `/2`).
 *
 * Reaproveita o `video-carousel` real (reels/vídeos dos cases) num invólucro
 * com cabeçalho na estética Kaleidos (creme + Atelier/Gridlite + eyebrow rosa).
 * Entra DEPOIS da CTA. Não duplica conteúdo — só re-skina o que já existe.
 */
import dynamic from "next/dynamic";
import Link from "next/link";

const VideoCarousel = dynamic(() => import("@/components/video-carousel"));

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

export function Web3V2VideoMotion() {
  return (
    <section style={{ background: "#FAFAFA", borderTop: `2px solid ${INK}`, overflow: "hidden" }}>
      <div className="w3-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 28px 12px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: PINK,
                marginBottom: 14,
              }}
            >
              Vídeo & Motion
            </div>
            <h2
              style={{
                fontFamily: "Atelier, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px,4.2vw,54px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                margin: 0,
                color: INK,
              }}
            >
              Conteúdo que prende o feed.
            </h2>
            <p style={{ marginTop: 14, maxWidth: 500, fontSize: 16, lineHeight: 1.55, color: "#6b6258" }}>
              Reels, anúncios e institucionais que a gente produziu pra marcas que movem o mercado.
            </p>
          </div>
          <Link
            href="/cases"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 700,
              fontSize: 14,
              color: "#3d9e32",
              textDecoration: "none",
            }}
          >
            Ver todos os cases →
          </Link>
        </div>
      </div>
      <VideoCarousel />
      <div style={{ height: 8, background: GREEN, borderTop: `2px solid ${INK}` }} />
    </section>
  );
}
