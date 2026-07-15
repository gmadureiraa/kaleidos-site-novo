"use client";

import { useMemo, useState } from "react";
import {
  UNITS,
  LAYERS,
  ADDONS,
  BUNDLES,
  buildQuote,
  PRICING_RULES,
} from "@/lib/pricing";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";
const CRU = "#FAFAFA";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const card: React.CSSProperties = {
  background: "#fff",
  border: `1.5px solid ${INK}`,
  boxShadow: `4px 4px 0 rgba(0,0,0,.12)`,
  borderRadius: 4,
  padding: 18,
};

export function OrcamentoCalculator() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [layers, setLayers] = useState<Set<string>>(new Set());
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [discount, setDiscount] = useState(0);
  const [costPct, setCostPct] = useState(45); // custo estimado como % do preço
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const setPiece = (id: string, v: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, v) }));
  const toggle = (set: Set<string>, id: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    fn(next);
  };

  const quote = useMemo(
    () =>
      buildQuote({
        pieces: Object.entries(qty).map(([unitId, q]) => ({ unitId, qty: q })),
        layerIds: [...layers],
        addonIds: [...addons],
        bundleDiscount: discount / 100,
      }),
    [qty, layers, addons, discount]
  );

  const cost = Math.round((quote.totalMonthly * costPct) / 100);
  const margin = quote.totalMonthly > 0 ? 1 - cost / quote.totalMonthly : 0;
  const marginColor =
    margin >= 0.5 ? GREEN : margin >= PRICING_RULES.margem.redFlagBelow ? "#f2b544" : "#ff5a5a";

  const applyBundle = (b: (typeof BUNDLES)[number]) =>
    setSelectedBundle(b.id === selectedBundle ? null : b.id);
  const bundle = BUNDLES.find((b) => b.id === selectedBundle);

  return (
    <main style={{ background: CRU, minHeight: "100vh", color: INK, fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 90px" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Gridlite, monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", background: GREEN, border: `1.5px solid ${INK}`, padding: "3px 10px" }}>
            interno · não publicar
          </span>
          <h1 style={{ fontFamily: "Atelier, sans-serif", fontSize: 34, fontWeight: 800, margin: 0, letterSpacing: -1 }}>
            Calculadora de orçamento Kaleidos
          </h1>
        </div>
        <p style={{ color: "#5a534a", marginTop: 8, maxWidth: 720 }}>
          Monte o orçamento pela fórmula da tabela 2026: Σ(peças × preço em volume) + camadas de gestão + add-ons,
          com desconto de bundle e piso mínimo. Preços em volume (dentro de pacote recorrente).
        </p>

        {/* bundles de referência */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 22 }}>
          {BUNDLES.map((b) => (
            <button
              key={b.id}
              onClick={() => applyBundle(b)}
              style={{
                border: `1.5px solid ${INK}`,
                background: selectedBundle === b.id ? PINK : "#fff",
                color: INK,
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {b.label} · {brl(b.price)}
            </button>
          ))}
        </div>
        {bundle && (
          <div style={{ ...card, marginTop: 12, background: "#fff8fd" }}>
            <b>{bundle.label}</b> — {brl(bundle.price)}/mês de referência. <span style={{ color: "#5a534a" }}>{bundle.scope} · Camadas: {bundle.layers}</span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 22, marginTop: 26, alignItems: "start" }} className="orc-grid">
          {/* builder */}
          <div style={{ display: "grid", gap: 18 }}>
            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Peças (mensal)</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {UNITS.filter((u) => !u.oneOff).map((u) => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1, fontSize: 14 }}>{u.label} <span style={{ color: "#8a8078" }}>· {brl(u.volume)}/{u.unidade}</span></span>
                    <QtyInput value={qty[u.id] ?? 0} onChange={(v) => setPiece(u.id, v)} />
                  </div>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>One-off (projeto pontual)</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {UNITS.filter((u) => u.oneOff).map((u) => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1, fontSize: 14 }}>{u.label} <span style={{ color: "#8a8078" }}>· {brl(u.volume)}</span></span>
                    <QtyInput value={qty[u.id] ?? 0} onChange={(v) => setPiece(u.id, v)} />
                  </div>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Camadas de serviço (mensal)</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {LAYERS.map((l) => (
                  <label key={l.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, cursor: "pointer" }}>
                    <input type="checkbox" checked={layers.has(l.id)} onChange={() => toggle(layers, l.id, setLayers)} style={{ marginTop: 3 }} />
                    <span style={{ flex: 1 }}>{l.label} <span style={{ color: "#8a8078" }}>· {brl(l.price)}</span><br /><span style={{ color: "#8a8078", fontSize: 12.5 }}>{l.includes}</span></span>
                  </label>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Add-ons</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {ADDONS.map((a) => (
                  <label key={a.id} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, cursor: "pointer" }}>
                    <input type="checkbox" checked={addons.has(a.id)} onChange={() => toggle(addons, a.id, setAddons)} />
                    <span style={{ flex: 1 }}>{a.label} <span style={{ color: "#8a8078" }}>· {brl(a.priceMin)}{a.priceMax ? `–${brl(a.priceMax)}` : "+"} · {a.type}</span></span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* resumo (sticky) */}
          <aside style={{ position: "sticky", top: 20, display: "grid", gap: 16 }}>
            <div style={{ ...card, background: INK, color: CRU, boxShadow: `6px 6px 0 ${GREEN}` }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: GREEN }}>Total mensal</div>
              <div style={{ fontFamily: "Atelier, sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>{brl(quote.totalMonthly)}<span style={{ fontSize: 16, fontWeight: 500, color: "#b8b2a8" }}>/mês</span></div>
              {quote.oneOff > 0 && <div style={{ fontSize: 13, color: "#b8b2a8", marginTop: 6 }}>+ {brl(quote.oneOff)} one-off (projeto)</div>}
              {quote.belowPiso && (
                <div style={{ marginTop: 10, background: "#4a1f1f", border: "1px solid #ff5a5a", padding: "6px 10px", borderRadius: 4, fontSize: 12.5, color: "#ffb3b3" }}>
                  ⚠ Abaixo do piso de {brl(quote.pisoFloor)} — ajustado pro piso.
                </div>
              )}
            </div>

            <div style={card}>
              <Row label="Conteúdo (mensal)" value={brl(quote.contentMonthly)} />
              <Row label="Camadas" value={brl(quote.layersMonthly)} />
              <Row label="Add-ons recorrentes" value={brl(quote.addonsRecurring)} />
              <hr style={{ border: 0, borderTop: `1px solid #eee`, margin: "8px 0" }} />
              <Row label="Subtotal/mês" value={brl(quote.subtotalMonthly)} bold />
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 13, color: "#5a534a" }}>Desconto de bundle: <b>{discount}%</b> <span style={{ color: "#8a8078" }}>(sugerido 10–15%)</span></label>
                <input type="range" min={0} max={15} value={discount} onChange={(e) => setDiscount(+e.target.value)} style={{ width: "100%", accentColor: PINK }} />
              </div>
              <Row label="Desconto aplicado" value={`− ${brl(quote.discountApplied)}`} />
            </div>

            <div style={card}>
              <div style={{ fontSize: 13, color: "#5a534a", marginBottom: 6 }}>Custo estimado: <b>{costPct}%</b> do preço → {brl(cost)}</div>
              <input type="range" min={20} max={70} value={costPct} onChange={(e) => setCostPct(+e.target.value)} style={{ width: "100%", accentColor: INK }} />
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13 }}>Margem estimada</span>
                <span style={{ fontFamily: "Atelier, sans-serif", fontSize: 22, fontWeight: 800, color: marginColor }}>{Math.round(margin * 100)}%</span>
              </div>
              <div style={{ fontSize: 11.5, color: "#8a8078", marginTop: 4 }}>Meta 2026 ≥ 50%. Vermelho abaixo de 40% = revisar.</div>
            </div>

            {quote.breakdown.length > 0 && (
              <div style={card}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 8 }}>Detalhe</div>
                {quote.breakdown.map((b, i) => (
                  <Row key={i} label={`${b.qty}× ${b.label}`} value={brl(b.total)} small />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
      <style>{`@media(max-width:820px){.orc-grid{grid-template-columns:1fr !important}}`}</style>
    </main>
  );
}

function QtyInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${INK}`, borderRadius: 4, overflow: "hidden" }}>
      <button onClick={() => onChange(value - 1)} style={qBtn}>−</button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value || 0)}
        style={{ width: 42, textAlign: "center", border: 0, outline: 0, fontSize: 14, fontWeight: 700, MozAppearance: "textfield" as const }}
      />
      <button onClick={() => onChange(value + 1)} style={qBtn}>+</button>
    </div>
  );
}
const qBtn: React.CSSProperties = { width: 30, height: 30, border: 0, background: "#f0efe9", cursor: "pointer", fontSize: 18, fontWeight: 700, lineHeight: 1 };

function Row({ label, value, bold, small }: { label: string; value: string; bold?: boolean; small?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: small ? "2px 0" : "3px 0", fontSize: small ? 13 : 14, fontWeight: bold ? 700 : 400 }}>
      <span style={{ color: bold ? INK : "#5a534a" }}>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}
