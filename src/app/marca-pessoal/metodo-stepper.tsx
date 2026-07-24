"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Stepper horizontal auto-rotativo do método (Fundação → Cadência → Tração →
 * Autoridade). Padrão do teardown (how-it-works da landing "compute"):
 * auto-avança a cada 6s com barra de progresso; clique pausa o auto e fixa a
 * fase. Conteúdo idêntico ao METODO original (horizontes M1/M3/M6 do paper).
 */

const FASES = [
  {
    n: "01",
    nome: "Fundação",
    horizonte: "mês 1",
    cor: "#7CF067",
    texto:
      "Imersão na sua história, tese e bandeira pessoal. Auditoria dos 3 perfis (Instagram, X, LinkedIn), pilares de conteúdo ponderados e bio-manifesto.",
  },
  {
    n: "02",
    nome: "Cadência",
    horizonte: "toda semana",
    cor: "#D262B2",
    texto:
      "Instagram primeiro: carrossel, reel e stories num calendário aprovado antes de produzir. O mesmo conteúdo vira thread no X e post no LinkedIn, sem produção dobrada.",
  },
  {
    n: "03",
    nome: "Tração",
    horizonte: "mês 3",
    cor: "#7CF067",
    texto:
      "Engajamento acima de 3%, formatos calibrados pelos números e os primeiros leads chegando pelo perfil.",
  },
  {
    n: "04",
    nome: "Autoridade",
    horizonte: "mês 6",
    cor: "#D262B2",
    texto:
      "Convites orgânicos, presença em podcasts e pipeline atribuível ao perfil. Relatório trimestral e roadmap de escala.",
  },
];

const AUTO_MS = 6000;

export function MetodoStepper() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // reinicia a barra de progresso
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number, byUser = false) => {
    setActive(i);
    setTick((t) => t + 1);
    if (byUser) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % FASES.length);
      setTick((t) => t + 1);
    }, AUTO_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const fase = FASES[active];

  return (
    <div>
      <style>{`
        @keyframes mp-step-progress { from { width: 0% } to { width: 100% } }
        .mp-stepper-tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        @media (max-width: 760px) { .mp-stepper-tabs { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="mp-stepper-tabs" role="tablist" aria-label="Fases do método">
        {FASES.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.n}
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(i, true)}
              style={{
                textAlign: "left",
                cursor: "pointer",
                background: isActive ? "#fff" : "transparent",
                border: "1.5px solid #14110D",
                borderRadius: 14,
                padding: "16px 16px 14px",
                boxShadow: isActive ? `5px 5px 0 ${f.cor}` : "none",
                transition: "box-shadow .2s ease, background .2s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "Gridlite, monospace",
                  fontSize: 12,
                  letterSpacing: 2,
                  color: isActive ? "#14110D" : "#8a8175",
                }}
              >
                {f.n}
              </div>
              <div
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(16px,1.8vw,21px)",
                  color: "#14110D",
                  marginTop: 4,
                }}
              >
                {f.nome}
              </div>
              {/* trilho + barra de progresso */}
              <div
                style={{
                  marginTop: 12,
                  height: 3,
                  borderRadius: 99,
                  background: "#14110D1a",
                  overflow: "hidden",
                }}
              >
                {isActive && (
                  <div
                    key={tick}
                    style={{
                      height: "100%",
                      background: f.cor,
                      width: paused ? "100%" : undefined,
                      animation: paused
                        ? "none"
                        : `mp-step-progress ${AUTO_MS}ms linear forwards`,
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* painel da fase ativa */}
      <div
        role="tabpanel"
        style={{
          marginTop: 22,
          background: "#fff",
          border: "1.5px solid #14110D",
          borderRadius: 16,
          padding: "26px 28px",
          boxShadow: `6px 6px 0 ${fase.cor}`,
          display: "flex",
          gap: 22,
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "Atelier, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px,5vw,64px)",
            lineHeight: 1,
            color: fase.cor,
            WebkitTextStroke: "1.5px #14110D",
            flexShrink: 0,
          }}
        >
          {fase.n}
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                fontFamily: "Atelier, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(21px,2.4vw,28px)",
                color: "#14110D",
                margin: 0,
              }}
            >
              {fase.nome}
            </h3>
            <span
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 10.5,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#14110D",
                border: "1.5px solid #14110D",
                borderRadius: 999,
                padding: "4px 11px",
                background: fase.cor,
              }}
            >
              {fase.horizonte}
            </span>
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "#4a443c",
              margin: "10px 0 0",
            }}
          >
            {fase.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
