"use client";

import Link from "next/link";
import Image from "next/image";
import { OPEN_PLAYBOOK_EVENT } from "@/components/web3v2/playbook-popup";

// Banda de ISCA do Playbook "Marketing Cripto em 2026" EXCLUSIVA da rota `/2`.
//
// Equivalente ao `PlaybookFeature` da home, porém na estética /2 (escuro +
// verde/rosa, brutalista editorial). A capa-medalhão real + CTA "Baixar o
// playbook grátis" que abre o popup de captura (Web3V2PlaybookPopup) via custom
// event. CTA secundário leva direto pra leitura do paper.
//
// Tracking `lead_captured` (source=playbook-popup-v2) sai do EbookPopup quando
// o usuário envia o email. O botão só dispara a abertura do popup.

const GREEN = "#7CF067";
const PINK = "#D262B2";
const INK = "#14110D";

export function Web3V2PlaybookFeature() {
  function openPopup() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(OPEN_PLAYBOOK_EVENT));
  }

  return (
    <section style={{ background: "#F4F1EC", padding: "0 0 84px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            border: `2px solid ${INK}`,
            background: INK,
            boxShadow: `10px 10px 0 ${GREEN}`,
          }}
        >
          {/* textura de pontos rosa */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.6,
              backgroundImage:
                "radial-gradient(rgba(210,98,178,0.18) 1.5px, transparent 1.6px)",
              backgroundSize: "13px 13px",
            }}
          />
          {/* glow verde */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -80,
              top: -96,
              width: 420,
              height: 420,
              borderRadius: "50%",
              pointerEvents: "none",
              filter: "blur(80px)",
              opacity: 0.35,
              background: `radial-gradient(circle, ${GREEN} 0%, transparent 70%)`,
            }}
          />

          <div
            className="w3-pbfeat-grid"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              gap: 40,
              alignItems: "center",
              padding: "44px 44px",
            }}
          >
            {/* texto */}
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "Gridlite, monospace",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: 11,
                  padding: "6px 12px",
                  borderRadius: 999,
                  color: "#06250a",
                  background: GREEN,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Playbook grátis
              </span>
              <h2
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "clamp(28px,3.4vw,46px)",
                  lineHeight: 1.04,
                  letterSpacing: "-1.2px",
                  margin: 0,
                  maxWidth: 560,
                }}
              >
                Marketing cripto em 2026<span style={{ color: PINK }}>.</span>
              </h2>
              <p
                style={{
                  marginTop: 16,
                  maxWidth: 520,
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "#b9b2a8",
                }}
              >
                O guia completo da Kaleidos: 10 capítulos sobre pra onde a atenção,
                os canais e as métricas do mercado cripto estão indo, e como
                estruturar seu marketing pro que vem. Da especulação à utilidade.
              </p>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  onClick={openPopup}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: GREEN,
                    color: "#06250a",
                    border: `1.5px solid ${INK}`,
                    borderRadius: 12,
                    boxShadow: `4px 4px 0 ${PINK}`,
                    padding: "13px 22px",
                    fontWeight: 800,
                    fontSize: 14.5,
                    fontFamily: "Atelier, sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Baixar o playbook grátis →
                </button>
                <Link
                  href="/papers/playbook-cripto-2026"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "13px 22px",
                    fontWeight: 700,
                    fontSize: 14.5,
                    fontFamily: "Atelier, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  Ler online
                </Link>
              </div>
            </div>

            {/* capa-medalhão */}
            <button
              type="button"
              onClick={openPopup}
              aria-label="Baixar o playbook Marketing Cripto em 2026"
              className="w3-pbfeat-cover"
              style={{
                position: "relative",
                margin: "0 auto",
                width: "100%",
                maxWidth: 280,
                borderRadius: 16,
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.12)",
                boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
                transform: "rotate(2deg)",
                cursor: "pointer",
                padding: 0,
                background: INK,
              }}
            >
              <Image
                src="/papers/cover-playbook.webp"
                alt="Playbook: Marketing Cripto em 2026"
                width={600}
                height={800}
                sizes="(max-width: 880px) 60vw, 280px"
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </button>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.kv2 .w3-pbfeat-cover{transition:transform .4s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-pbfeat-cover:hover{transform:rotate(0deg);}
@media (max-width:880px){
  .kv2 .w3-pbfeat-grid{grid-template-columns:1fr!important;gap:28px!important;padding:32px 24px!important;}
  .kv2 .w3-pbfeat-cover{order:-1;max-width:220px!important;}
}
`,
        }}
      />
    </section>
  );
}
