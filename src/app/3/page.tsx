import type { Metadata } from "next";
import { Web3V2Defs } from "@/components/web3v2/sections";
import { HeroLab } from "@/components/web3v2-lab/hero-lab";

// ── Rota de TESTE `/3` — LABORATÓRIO DE HEROS ───────────────────────────────
// Galeria de ~30 variações da hero da Kaleidos pra escolher direção visual.
// Reusa Web3V2Defs (símbolos SVG #kal-eye/#kal-word + keyframes globais).
// NÃO altera a home `/`, a `/2`, o layout nem qualquer rota existente.
export const metadata: Metadata = {
  title: "Kaleidos — Hero Lab (teste)",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return (
    <main id="main-content" className="kv2 min-h-screen bg-white" role="main">
      {/* defs: símbolos SVG + CSS escopado/keyframes usados pelas variações */}
      <Web3V2Defs />
      <header
        style={{
          padding: "28px 24px 8px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1
          style={{
            fontFamily: "Atelier, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 4vw, 38px)",
            letterSpacing: -1,
            margin: 0,
            color: "#14110D",
          }}
        >
          Laboratório de Heros
        </h1>
        <p style={{ color: "#6b6258", fontSize: 14, margin: "6px 0 0", maxWidth: 640 }}>
          Variações da hero pra escolher a direção. Filtre por cor/layout, abra uma
          em tela cheia e me diga o número (ex: <strong>v12</strong>) — ou peça um mix
          entre duas.
        </p>
      </header>
      <HeroLab />
    </main>
  );
}
