"use client";

import { useMemo, useState } from "react";
import {
  UNITS,
  LAYERS,
  ADDONS,
  PACKAGES,
  FAMILIES,
  buildQuote,
  verifyPackage,
  PRICING_RULES,
  type Package,
  type PackageStatus,
} from "@/lib/pricing";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";
const CRU = "#FAFAFA";
const AMBER = "#f2b544";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const card: React.CSSProperties = {
  background: "#fff",
  border: `1.5px solid ${INK}`,
  boxShadow: `4px 4px 0 rgba(0,0,0,.12)`,
  borderRadius: 4,
  padding: 18,
};

// Selo de status: o Gabriel precisa ver de longe se pode vender aquilo.
const STATUS_BADGE: Record<PackageStatus, { text: string; bg: string; fg: string }> = {
  padrao: { text: "padrão 2026", bg: GREEN, fg: INK },
  legado: { text: "fora de linha", bg: "#e6e2da", fg: "#6b645a" },
  grandfathered: { text: "grandfathered", bg: AMBER, fg: INK },
};

export function OrcamentoCalculator() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [layers, setLayers] = useState<Set<string>>(new Set());
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [discount, setDiscount] = useState(0);
  const [costPct, setCostPct] = useState(45); // custo estimado como % do preço
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showLegacy, setShowLegacy] = useState(false);

  const setPiece = (id: string, v: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, v) }));
  const toggle = (set: Set<string>, id: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    fn(next);
  };

  const pkg = PACKAGES.find((p) => p.id === selectedPackage);

  const quote = useMemo(
    () =>
      buildQuote({
        pieces: Object.entries(qty).map(([unitId, q]) => ({ unitId, qty: q })),
        layerIds: [...layers],
        addonIds: [...addons],
        bundleDiscount: discount / 100,
        family: pkg?.family,
      }),
    [qty, layers, addons, discount, pkg?.family]
  );

  // ⚠️ Com pacote selecionado, o número que vai pra proposta é o PREÇO DE TABELA
  // do pacote + adicionais — NÃO a soma das peças. Desde a régua de 06/08 os dois
  // divergem (o reel está subprecificado na aba 1 da planilha), e mostrar só a
  // soma faria a gente cotar founder brand abaixo do que foi vendido ao Matheus.
  const check = pkg ? verifyPackage(pkg) : null;
  const quoteTotal = pkg ? pkg.price + quote.addonsRecurring : quote.totalMonthly;

  const cost = Math.round((quoteTotal * costPct) / 100);
  const margin = quoteTotal > 0 ? 1 - cost / quoteTotal : 0;
  const marginColor =
    margin >= 0.5 ? GREEN : margin >= PRICING_RULES.margem.redFlagBelow ? AMBER : "#ff5a5a";

  // Clicar num pacote PREENCHE a calculadora com as peças + camadas dele.
  // Clicar de novo no mesmo pacote limpa tudo (inclusive adicionais).
  const applyPackage = (p: Package) => {
    if (p.id === selectedPackage) {
      setSelectedPackage(null);
      setQty({});
      setLayers(new Set());
      setAddons(new Set());
      return;
    }
    setSelectedPackage(p.id);
    const q: Record<string, number> = {};
    (p.pieces ?? []).forEach((x) => { q[x.unitId] = x.qty; });
    setQty(q);
    setLayers(new Set(p.layerIds ?? []));
    // Adicional é escolha do cliente, nunca vem ligado por padrão.
    setAddons(new Set());
  };

  const visible = (p: Package) => showLegacy || p.status === "padrao";
  const allowedAddonIds = pkg?.allowedAddons;

  return (
    <main style={{ background: CRU, minHeight: "100vh", color: INK, fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="orc-wrap" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 90px", overflowX: "clip" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Gridlite, monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", background: GREEN, border: `1.5px solid ${INK}`, padding: "3px 10px" }}>
            interno · não publicar
          </span>
          <h1 style={{ fontFamily: "Atelier, sans-serif", fontSize: 34, fontWeight: 800, margin: 0, letterSpacing: -1 }}>
            Calculadora de orçamento Kaleidos
          </h1>
        </div>
        <p style={{ color: "#5a534a", marginTop: 8, maxWidth: 760 }}>
          Escolha um <b>pacote</b> (o preço de tabela é o que vai pra proposta) e some os <b>adicionais</b>.
          Sem pacote, monte pela fórmula: Σ(peças × preço em volume) + camadas de gestão + adicionais, com desconto de bundle e piso mínimo.
          {/* ⚠️ 19/08/2026 — este comentário dizia "LinkedIn B2B fecha em 3 meses" e
              hoje isso é FALSO: os três pacotes `linkedin-*` estão com minMonths 6
              (pricing.ts), porque a decisão de 08/08 unificou a régua. Ficou como
              comentário morto que ia reintroduzir o 3 no próximo edit. A lógica em si
              (preferir `pkg.minMonths` ao padrão da casa) continua certa e vale pra
              qualquer exceção futura — por isso o fallback não mudou. */}
          Contrato mínimo de <b>{pkg?.minMonths ?? PRICING_RULES.minContractMonths} meses</b>
          {pkg?.minMonths && pkg.minMonths !== PRICING_RULES.minContractMonths
            ? ` (exceção da família ${FAMILIES.find((f) => f.id === pkg.family)?.label} — o padrão da casa é ${PRICING_RULES.minContractMonths})`
            : ""}.
        </p>

        {/* pacotes, agrupados por família — a taxonomia é o ponto */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 15, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>Pacotes</h2>
          <label style={{ fontSize: 13, color: "#5a534a", display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            <input type="checkbox" checked={showLegacy} onChange={() => setShowLegacy((v) => !v)} style={{ width: 18, height: 18, accentColor: INK }} />
            mostrar fora de linha / grandfathered
          </label>
        </div>

        {FAMILIES.map((fam) => {
          const list = PACKAGES.filter((p) => p.family === fam.id && visible(p));
          if (!list.length) return null;
          return (
            <section key={fam.id} style={{ marginTop: 18 }}>
              <div style={{ fontFamily: "Gridlite, monospace", fontSize: 11.5, letterSpacing: 1.6, textTransform: "uppercase", color: INK }}>{fam.label}</div>
              <div style={{ fontSize: 12.5, color: "#8a8078", margin: "3px 0 10px", maxWidth: 720 }}>{fam.blurb}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {list.map((p) => {
                  const on = selectedPackage === p.id;
                  const badge = STATUS_BADGE[p.status];
                  return (
                    <button
                      key={p.id}
                      onClick={() => applyPackage(p)}
                      style={{
                        border: `1.5px solid ${INK}`,
                        background: on ? PINK : "#fff",
                        color: INK,
                        borderRadius: 4,
                        padding: "10px 14px",
                        minHeight: 44,
                        textAlign: "left",
                        cursor: "pointer",
                        opacity: p.status === "legado" && !on ? 0.62 : 1,
                      }}
                    >
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>
                        {p.label} · {brl(p.price)}<span style={{ fontWeight: 400, color: on ? INK : "#8a8078" }}>/mês</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "Gridlite, monospace", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", background: badge.bg, color: badge.fg, padding: "2px 6px", border: `1px solid ${INK}` }}>{badge.text}</span>
                        {p.highlight && <span style={{ fontFamily: "Gridlite, monospace", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", background: INK, color: GREEN, padding: "2px 6px" }}>{p.highlight}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        {pkg && (
          <div style={{ ...card, marginTop: 16, background: "#fff8fd" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{pkg.label} — {brl(pkg.price)}/mês</div>
            <div style={{ color: "#5a534a", fontSize: 13.5, marginTop: 6 }}>{pkg.scope}</div>
            <div style={{ color: "#5a534a", fontSize: 13.5, marginTop: 6 }}>
              Camadas: {pkg.layers}{pkg.channels ? ` · Canais: ${pkg.channels}` : ""}{pkg.minMonths ? ` · Mínimo ${pkg.minMonths} meses` : ""}
            </div>
            <div style={{ fontSize: 12, color: "#8a8078", marginTop: 8 }}>Fonte: {pkg.source}</div>
            {pkg.replacedBy && (
              <div style={{ fontSize: 12.5, marginTop: 8, color: "#8a4a00" }}>
                ↪ Substituído por <b>{PACKAGES.find((x) => x.id === pkg.replacedBy)?.label}</b> — não oferecer a lead novo.
              </div>
            )}
            {/* Conferência composição × preço: antes isso era uma promessa tácita
                do modelo. Agora é visível, porque parou de fechar. */}
            {check && (
              <div style={{ marginTop: 12, borderTop: "1px solid #eadfe6", paddingTop: 10, fontSize: 13 }}>
                <Row label="Σ peças + camadas (tabela de unidades)" value={brl(check.composed)} small />
                <Row label="Preço de tabela do pacote" value={brl(check.price)} small bold />
                <Row
                  label={check.delta >= 0 ? "Prêmio sobre a tabela de unidades" : "Desconto sobre a tabela de unidades"}
                  value={`${check.delta >= 0 ? "+" : "−"} ${brl(Math.abs(check.delta))} (${Math.abs(Math.round(check.deltaPct * 100))}%)`}
                  small
                />
                {!check.ok && (
                  <div style={{ marginTop: 8, background: "#fff3d6", border: `1px solid ${AMBER}`, padding: "7px 10px", borderRadius: 4, fontSize: 12.5 }}>
                    ⚠ Fora da tolerância de {Math.round(PRICING_RULES.compositionTolerance * 100)}% (faixa do desconto de bundle).{" "}
                    {pkg.family === "founder-brand"
                      ? "Causa conhecida: o reel de roteiro + edição está subprecificado na aba 1 (R$150 em volume; os pacotes de 08/08 implicam R$275–433). Ou o preço do reel sobe, ou o pacote assume um prêmio documentado."
                      : pkg.family === "linkedin-b2b"
                        ? "Causa conhecida: setup de perfil, automação de lead magnet e relatório de sinais de intenção não têm linha na aba 1 — são escopo real que a soma das peças não enxerga."
                        : "Ou o preço da unidade na aba 1 sobe, ou o pacote assume um prêmio documentado."}{" "}
                    <b>Decisão do Gabriel.</b>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 22, marginTop: 26, alignItems: "start" }} className="orc-grid">
          {/* builder */}
          <div style={{ display: "grid", gap: 18 }}>
            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>Adicionais (mensal)</h2>
              <p style={{ fontSize: 12.5, color: "#8a8078", margin: "0 0 12px" }}>
                Somam por cima do preço do pacote.{" "}
                {pkg && allowedAddonIds?.length
                  ? "Marcados com ✓ são os que a proposta do pacote prevê."
                  : pkg && allowedAddonIds?.length === 0
                    ? "⚠ Este pacote não prevê adicional nenhum — a escada de 08/08 tirou os extras (quem quer engajamento sobe de degrau; LinkedIn virou família própria). Marcar algo aqui é sair da régua."
                    : ""}
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {ADDONS.filter((a) => a.kind === "adicional" && (showLegacy || a.status === "padrao")).map((a) => {
                  const fits = allowedAddonIds?.includes(a.id);
                  return (
                    <label key={a.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, cursor: "pointer", padding: "6px 0", opacity: a.status === "legado" ? 0.62 : 1 }}>
                      <input type="checkbox" checked={addons.has(a.id)} onChange={() => toggle(addons, a.id, setAddons)} style={{ marginTop: 2, width: 22, height: 22, flex: "none", accentColor: INK }} />
                      <span style={{ flex: 1 }}>
                        {fits && <span style={{ color: "#2e8a1f", fontWeight: 700 }}>✓ </span>}
                        {a.label} <span style={{ color: "#8a8078" }}>· {brl(a.priceMin)}{a.priceMax ? `–${brl(a.priceMax)}` : ""}/mês</span>
                        {a.status !== "padrao" && <span style={{ fontFamily: "Gridlite, monospace", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", background: STATUS_BADGE[a.status].bg, color: STATUS_BADGE[a.status].fg, padding: "1px 5px", marginLeft: 6, border: `1px solid ${INK}` }}>{STATUS_BADGE[a.status].text}</span>}
                        {a.note && <><br /><span style={{ color: "#8a8078", fontSize: 12.5 }}>{a.note}</span></>}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>Projetos avulsos (one-off)</h2>
              <p style={{ fontSize: 12.5, color: "#8a8078", margin: "0 0 12px" }}>
                Nunca entram na mensalidade. Podcast é sempre projeto à parte (regra da proposta 06/08).
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {ADDONS.filter((a) => a.kind === "projeto").map((a) => (
                  <label key={a.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, cursor: "pointer", padding: "6px 0" }}>
                    <input type="checkbox" checked={addons.has(a.id)} onChange={() => toggle(addons, a.id, setAddons)} style={{ marginTop: 2, width: 22, height: 22, flex: "none", accentColor: INK }} />
                    <span style={{ flex: 1 }}>
                      {a.label} <span style={{ color: "#8a8078" }}>· {brl(a.priceMin)}{a.priceMax ? `–${brl(a.priceMax)}` : "+"}</span>
                      {a.note && <><br /><span style={{ color: "#8a8078", fontSize: 12.5 }}>{a.note}</span></>}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>Peças (mensal)</h2>
              <p style={{ fontSize: 12.5, color: "#8a8078", margin: "0 0 12px" }}>
                Composição do pacote. Mexer aqui muda a <i>soma da tabela</i>, não o preço do pacote — use pra montar orçamento sob medida (sem pacote selecionado).
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {UNITS.filter((u) => !u.oneOff).map((u) => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 14 }}>
                      {u.label} <span style={{ color: "#8a8078" }}>· {brl(u.volume)}/{u.unidade}</span>
                      {u.note && <><br /><span style={{ color: AMBER, fontSize: 12 }}>⚠ {u.note}</span></>}
                    </span>
                    <QtyInput value={qty[u.id] ?? 0} onChange={(v) => setPiece(u.id, v)} />
                  </div>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Peças one-off</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {UNITS.filter((u) => u.oneOff).map((u) => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 14 }}>{u.label} <span style={{ color: "#8a8078" }}>· {brl(u.volume)}</span></span>
                    <QtyInput value={qty[u.id] ?? 0} onChange={(v) => setPiece(u.id, v)} />
                  </div>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2 style={{ fontSize: 15, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Camadas de serviço (mensal)</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {LAYERS.map((l) => (
                  <label key={l.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, cursor: "pointer", padding: "6px 0" }}>
                    <input type="checkbox" checked={layers.has(l.id)} onChange={() => toggle(layers, l.id, setLayers)} style={{ marginTop: 2, width: 22, height: 22, flex: "none", accentColor: INK }} />
                    <span style={{ flex: 1 }}>{l.label} <span style={{ color: "#8a8078" }}>· {brl(l.price)}</span><br /><span style={{ color: "#8a8078", fontSize: 12.5 }}>{l.includes}</span></span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* resumo (sticky) */}
          <aside style={{ position: "sticky", top: 20, display: "grid", gap: 16 }}>
            <div style={{ ...card, background: INK, color: CRU, boxShadow: `6px 6px 0 ${GREEN}` }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: GREEN }}>
                {pkg ? "Total a cobrar" : "Total mensal (sob medida)"}
              </div>
              <div style={{ fontFamily: "Atelier, sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>
                {brl(quoteTotal)}<span style={{ fontSize: 16, fontWeight: 500, color: "#b8b2a8" }}>/mês</span>
              </div>
              {pkg && (
                <div style={{ fontSize: 12.5, color: "#b8b2a8", marginTop: 6 }}>
                  {brl(pkg.price)} do pacote{quote.addonsRecurring > 0 ? ` + ${brl(quote.addonsRecurring)} de adicionais` : ""}
                </div>
              )}
              {(quote.oneOff > 0 || quote.addonsOneOff > 0) && (
                <div style={{ fontSize: 13, color: "#b8b2a8", marginTop: 6 }}>+ {brl(quote.oneOff + quote.addonsOneOff)} one-off (projeto, à parte)</div>
              )}
              {!pkg && quote.belowPiso && (
                <div style={{ marginTop: 10, background: "#4a1f1f", border: "1px solid #ff5a5a", padding: "6px 10px", borderRadius: 4, fontSize: 12.5, color: "#ffb3b3" }}>
                  ⚠ Abaixo do piso de {brl(quote.pisoFloor)} — ajustado pro piso.
                </div>
              )}
            </div>

            <div style={card}>
              <div style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 6 }}>Soma pela tabela de unidades</div>
              <Row label="Conteúdo (mensal)" value={brl(quote.contentMonthly)} />
              <Row label="Camadas" value={brl(quote.layersMonthly)} />
              <Row label="Adicionais mensais" value={brl(quote.addonsRecurring)} />
              <hr style={{ border: 0, borderTop: `1px solid #eee`, margin: "8px 0" }} />
              <Row label="Subtotal/mês" value={brl(quote.subtotalMonthly)} bold />
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 13, color: "#5a534a" }}>Desconto de bundle: <b>{discount}%</b> <span style={{ color: "#8a8078" }}>(sugerido 10–15%)</span></label>
                <input type="range" min={0} max={15} value={discount} onChange={(e) => setDiscount(+e.target.value)} style={{ width: "100%", height: 32, accentColor: PINK, touchAction: "pan-y" }} />
              </div>
              <Row label="Desconto aplicado" value={`− ${brl(quote.discountApplied)}`} />
              {pkg && (
                <div style={{ fontSize: 11.5, color: "#8a8078", marginTop: 8 }}>
                  Com pacote selecionado esta soma é só conferência — o preço cobrado é o de tabela acima.
                </div>
              )}
            </div>

            <div style={card}>
              <div style={{ fontSize: 13, color: "#5a534a", marginBottom: 6 }}>Custo estimado: <b>{costPct}%</b> do preço → {brl(cost)}</div>
              <input type="range" min={20} max={70} value={costPct} onChange={(e) => setCostPct(+e.target.value)} style={{ width: "100%", height: 32, accentColor: INK, touchAction: "pan-y" }} />
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13 }}>Margem estimada</span>
                <span style={{ fontFamily: "Atelier, sans-serif", fontSize: 22, fontWeight: 800, color: marginColor }}>{Math.round(margin * 100)}%</span>
              </div>
              <div style={{ fontSize: 11.5, color: "#8a8078", marginTop: 4 }}>Meta 2026 ≥ 50%. Vermelho abaixo de 40% = revisar.</div>
            </div>

            {quote.breakdown.length > 0 && (
              <div style={card}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 8 }}>Detalhe das peças</div>
                {quote.breakdown.map((b, i) => (
                  <Row key={i} label={`${b.qty}× ${b.label}`} value={brl(b.total)} small />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
      <style>{`
        @media(max-width:820px){
          .orc-grid{grid-template-columns:1fr !important}
          .orc-grid aside{position:static !important}
        }
        @media(max-width:600px){
          .orc-wrap{padding-left:16px !important;padding-right:16px !important}
        }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
      `}</style>
    </main>
  );
}

function QtyInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flex: "none", border: `1.5px solid ${INK}`, borderRadius: 4, overflow: "hidden" }}>
      <button aria-label="Diminuir" onClick={() => onChange(value - 1)} style={qBtn}>−</button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(+e.target.value || 0)}
        style={{ width: 48, height: 44, textAlign: "center", border: 0, outline: 0, fontSize: 16, fontWeight: 700, MozAppearance: "textfield" as const }}
      />
      <button aria-label="Aumentar" onClick={() => onChange(value + 1)} style={qBtn}>+</button>
    </div>
  );
}
// 44×44 = alvo de toque mínimo (mobile)
const qBtn: React.CSSProperties = { width: 44, height: 44, border: 0, background: "#f0efe9", cursor: "pointer", fontSize: 20, fontWeight: 700, lineHeight: 1 };

function Row({ label, value, bold, small }: { label: string; value: string; bold?: boolean; small?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: small ? "2px 0" : "3px 0", fontSize: small ? 13 : 14, fontWeight: bold ? 700 : 400 }}>
      <span style={{ color: bold ? INK : "#5a534a" }}>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}
