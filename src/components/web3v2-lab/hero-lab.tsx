"use client";

import { useMemo, useState } from "react";
import { HERO_VARIANTS, type HeroVariant } from "./variants.generated";

// Laboratório visual: renderiza todas as variações de hero em frames rotulados
// pra Gabriel comparar e escolher. Filtros por nível de cor e layout + modo
// "ver sozinho" (1 hero em tela cheia). Tudo client-side, escopado em .kv2.

const COR_ORDER = ["nenhuma", "baixa", "media", "alta"];

function uniq(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function HeroLab() {
  const [cor, setCor] = useState<string>("todas");
  const [layout, setLayout] = useState<string>("todos");
  const [concept, setConcept] = useState<string>("todos");
  const [solo, setSolo] = useState<string | null>(null);

  const cores = useMemo(
    () =>
      uniq(HERO_VARIANTS.map((v) => v.tags.cor)).sort(
        (a, b) => COR_ORDER.indexOf(a) - COR_ORDER.indexOf(b)
      ),
    []
  );
  const layouts = useMemo(
    () => uniq(HERO_VARIANTS.map((v) => v.tags.layout)).sort(),
    []
  );
  const concepts = useMemo(
    () => uniq(HERO_VARIANTS.map((v) => v.tags.concept).filter(Boolean) as string[]).sort(),
    []
  );

  const filtered = useMemo(
    () =>
      HERO_VARIANTS.filter(
        (v) =>
          (cor === "todas" || v.tags.cor === cor) &&
          (layout === "todos" || v.tags.layout === layout) &&
          (concept === "todos" || v.tags.concept === concept)
      ),
    [cor, layout, concept]
  );

  const soloVariant = solo
    ? HERO_VARIANTS.find((v) => v.id === solo) ?? null
    : null;

  if (soloVariant) {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setSolo(null)}
          style={pillBtn}
          aria-label="Voltar pra galeria"
        >
          ← voltar pra galeria
        </button>
        <div style={{ minHeight: "100vh", display: "flex" }}>
          <Frame variant={soloVariant} fullHeight />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar fixa */}
      <div style={toolbar}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={tbLabel}>Cor</span>
          <Chip active={cor === "todas"} onClick={() => setCor("todas")}>
            todas
          </Chip>
          {cores.map((c) => (
            <Chip key={c} active={cor === c} onClick={() => setCor(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={tbLabel}>Layout</span>
          <Chip active={layout === "todos"} onClick={() => setLayout("todos")}>
            todos
          </Chip>
          {layouts.map((l) => (
            <Chip key={l} active={layout === l} onClick={() => setLayout(l)}>
              {l}
            </Chip>
          ))}
        </div>
        <span style={{ ...tbLabel, marginLeft: "auto" }}>
          {filtered.length} de {HERO_VARIANTS.length}
        </span>
        {concepts.length > 0 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", flexBasis: "100%" }}>
            <span style={tbLabel}>Hero</span>
            <Chip active={concept === "todos"} onClick={() => setConcept("todos")}>
              todas
            </Chip>
            {concepts.map((c) => (
              <Chip key={c} active={concept === c} onClick={() => setConcept(c)}>
                {c}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {HERO_VARIANTS.length === 0 ? (
        <div style={{ padding: "80px 28px", textAlign: "center", fontFamily: "Inter,sans-serif", color: "#6b6258" }}>
          Nenhuma variação gerada ainda.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "8px 0 80px" }}>
          {filtered.map((v) => (
            <Frame key={v.id} variant={v} onSolo={() => setSolo(v.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function Frame({
  variant,
  onSolo,
  fullHeight,
}: {
  variant: HeroVariant;
  onSolo?: () => void;
  fullHeight?: boolean;
}) {
  return (
    <section
      id={variant.id}
      style={{
        scrollMarginTop: 80,
        margin: fullHeight ? 0 : "0 auto",
        maxWidth: fullHeight ? "none" : 1320,
        width: "100%",
        border: fullHeight ? "none" : "1.5px solid #14110D",
        borderRadius: fullHeight ? 0 : 16,
        overflow: "hidden",
        boxShadow: fullHeight ? "none" : "6px 6px 0 rgba(20,17,13,.1)",
        background: "#fff",
        display: fullHeight ? "flex" : "block",
        flexDirection: "column",
        flex: fullHeight ? 1 : undefined,
      }}
    >
      {/* Barra de rótulo */}
      <div style={labelBar}>
        <span style={labelId}>{variant.id}</span>
        <strong style={{ fontSize: 14 }}>{variant.name}</strong>
        <span style={tagPill}>cor: {variant.tags.cor}</span>
        <span style={tagPill}>{variant.tags.layout}</span>
        <span style={tagPill}>{variant.tags.fundo}</span>
        <span style={{ fontSize: 12, color: "#6b6258", fontFamily: "Inter,sans-serif" }}>
          {variant.note}
        </span>
        {onSolo && (
          <button onClick={onSolo} style={{ ...miniBtn, marginLeft: "auto" }}>
            ver sozinho ↗
          </button>
        )}
      </div>
      {/* Hero */}
      <div
        style={{
          height: fullHeight ? "auto" : "clamp(560px, 80vh, 840px)",
          flex: fullHeight ? 1 : undefined,
          display: "flex",
        }}
        dangerouslySetInnerHTML={{ __html: variant.html }}
      />
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "Gridlite, monospace",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1,
        padding: "6px 12px",
        borderRadius: 999,
        border: "1.5px solid #14110D",
        cursor: "pointer",
        background: active ? "#14110D" : "#fff",
        color: active ? "#fff" : "#14110D",
        transition: "all .15s",
      }}
    >
      {children}
    </button>
  );
}

const toolbar: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
  padding: "14px 24px",
  background: "rgba(250,250,250,.92)",
  backdropFilter: "blur(8px)",
  borderBottom: "1.5px solid #14110D",
  marginBottom: 16,
};
const tbLabel: React.CSSProperties = {
  fontFamily: "Gridlite, monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1.5,
  color: "#6b6258",
};
const labelBar: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
  padding: "10px 16px",
  background: "#FAFAFA",
  borderBottom: "1.5px solid #14110D",
  fontFamily: "Inter, sans-serif",
};
const labelId: React.CSSProperties = {
  fontFamily: "Gridlite, monospace",
  fontSize: 13,
  fontWeight: 700,
  background: "#14110D",
  color: "#fff",
  padding: "2px 8px",
  borderRadius: 6,
};
const tagPill: React.CSSProperties = {
  fontFamily: "Gridlite, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#14110D",
  border: "1px solid #14110D",
  borderRadius: 999,
  padding: "2px 8px",
};
const miniBtn: React.CSSProperties = {
  fontFamily: "Gridlite, monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1,
  padding: "6px 12px",
  borderRadius: 999,
  border: "1.5px solid #14110D",
  background: "#fff",
  cursor: "pointer",
};
const pillBtn: React.CSSProperties = {
  position: "fixed",
  top: 16,
  left: 16,
  zIndex: 100,
  ...miniBtn,
  background: "#14110D",
  color: "#fff",
};
