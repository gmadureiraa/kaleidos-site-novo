"use client";

/**
 * Web3 V2 — Processo unificado (rota `/2`).
 *
 * Funde o "Como funciona" (cards brutalistas do design /web3) com o "Como
 * fazemos" (animações Orbiting/Beam/IconCloud do `process-section`) num único
 * bloco. JSX (não template-string) pra poder embutir os componentes animados,
 * cada um sob `ClientOnly` (evita mismatch de hidratação). Substitui o
 * `Web3V2Processo` + `ProcessSection` no `/2`. NÃO toca os componentes
 * compartilhados com a home.
 */
import React, { useEffect, useState } from "react";
import { OrbitingCirclesDemo } from "@/components/orbiting-circles-demo";
import { AnimatedBeamDemo } from "@/components/animated-beam-demo";
import { IconCloudDemo } from "@/components/icon-cloud-demo";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#b8b1a6",
          fontFamily: "Gridlite, monospace",
          fontSize: 13,
        }}
      >
        Carregando…
      </div>
    );
  }
  return <>{children}</>;
}

const STEPS = [
  {
    n: "1",
    title: "Diagnóstico",
    text: "A gente mergulha no seu projeto, mercado e concorrência. Sai com tese e plano claro.",
    accent: GREEN,
    rot: -1.5,
    anim: <OrbitingCirclesDemo />,
  },
  {
    n: "2",
    title: "Criação",
    text: "Narrativa, conteúdo e identidade. Produção no ritmo da timeline, com curadoria fina.",
    accent: PINK,
    rot: 1.5,
    anim: <AnimatedBeamDemo />,
  },
  {
    n: "3",
    title: "Distribuição",
    text: "Publicação, comunidade e KOLs. Medição constante pra dobrar no que funciona.",
    accent: PINK,
    rot: -1,
    anim: <IconCloudDemo />,
  },
];

const STYLE = `
.kv2 .w3-procard{transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-procard:hover{transform:translateY(-8px) rotate(0deg)!important;}
.kv2 .w3-procgrid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
@media (max-width:820px){.kv2 .w3-procgrid2{grid-template-columns:1fr!important;gap:18px!important;}.kv2 .w3-procard{transform:none!important;}}
/* MOBILE: os 3 blocos animados (Orbiting/Beam/IconCloud) somavam ~600px de
   altura e custo de JS. Escondidos em telas pequenas; o card fica só com
   número + título + texto. Desktop intocado. */
@media (max-width:820px){.kv2 .w3-procanim{display:none!important;}}
`;

export function Web3V2Processo() {
  return (
    <section id="processo" style={{ background: "#FAFAFA", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="w3-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: PINK,
              marginBottom: 16,
            }}
          >
            Nosso processo
          </div>
          <h2
            style={{
              fontFamily: "Atelier, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px,4.6vw,60px)",
              lineHeight: 0.98,
              letterSpacing: "-1.5px",
              margin: 0,
              color: INK,
            }}
          >
            Três movimentos:
            <br />
            do briefing à distribuição.
          </h2>
        </div>

        <div className="w3-procgrid2">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="w3-procard"
              style={{
                background: "#fff",
                border: `1.5px solid ${INK}`,
                borderRadius: 18,
                padding: "28px 26px 30px",
                boxShadow: `6px 6px 0 ${s.accent}`,
                transform: `rotate(${s.rot}deg)`,
              }}
            >
              <div
                className="w3-procanim"
                style={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginBottom: 14,
                }}
              >
                <ClientOnly>{s.anim}</ClientOnly>
              </div>
              <div
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 800,
                  fontSize: 54,
                  lineHeight: 1,
                  color: s.accent,
                  WebkitTextStroke: `1.5px ${INK}`,
                }}
              >
                {s.n}
              </div>
              <h3
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  margin: "12px 0 8px",
                  color: INK,
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#6b6258", margin: 0 }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
