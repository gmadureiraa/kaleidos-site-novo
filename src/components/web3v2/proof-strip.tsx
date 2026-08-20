import { KALEIDOS_PROOF, PROOF_NOTE } from "@/lib/metrics";

/**
 * Web3V2ProofStrip — prova na 1ª dobra (logo abaixo do hero, antes do marquee
 * de logos). Fecha o buraco #2 do audit RCD: "zero prova quantificada
 * above-the-fold" num negócio B2B de ticket alto.
 *
 * ⚠️ NÚMEROS (revisado 19/08/2026): as 3 métricas institucionais que ficavam
 * aqui — "125M+ views geradas", "50+ lançamentos no mercado" e "200% de
 * crescimento médio de cliente" — SAÍRAM. Nenhuma tinha fonte primária, e a
 * terceira era literalmente uma média de n=1 autorrelatada por um cliente.
 * Ver o cabeçalho de `src/lib/metrics.ts` para o rastreamento completo.
 *
 * No lugar entrou o que TEM fonte: resultado de cliente nomeado, com janela e
 * origem verificável (`KALEIDOS_PROOF`), mais a nota de procedência. Um número
 * menor que sobrevive a uma pergunta vende mais que um grande que não sobrevive.
 *
 * ⛔ Não troque estes por número de agência sem `source` + `data` em metrics.ts.
 */

const METRICS: { value: string; label: string }[] = [
  { value: KALEIDOS_PROOF.defiversoViews.value, label: KALEIDOS_PROOF.defiversoViews.label },
  { value: KALEIDOS_PROOF.lucasInstagram.value, label: KALEIDOS_PROOF.lucasInstagram.label },
  { value: KALEIDOS_PROOF.laylaInstagram.value, label: KALEIDOS_PROOF.laylaInstagram.label },
];

// Depoimento real (Defiverso). ✅ 19/08/2026 — autenticidade CONFIRMADA pelo
// Gabriel: o depoimento foi de fato coletado e o texto original volta como está,
// números inclusive. Uma varredura anterior (`75f7b69`) tinha tirado o "29 mil
// inscrições no minicurso" por não achar print; o print não é a fonte da coleta.
// ⛔ Não reescreva a fala do cliente. Métrica INSTITUCIONAL da agência (sem fonte)
// continua fora — ver `src/lib/metrics.ts`.
const PROOF = {
  quote:
    "A parceria com a Kaleidos resultou num ecossistema de marketing completo e de alta performance: 29 mil inscrições no minicurso, 26 mil assinantes de newsletter e 12 milhões de views orgânicas em 90 dias.",
  author: "Equipe Defiverso",
  role: "Marketing & Conteúdo",
  href: "/cases/defiverso",
};

export function Web3V2ProofStrip() {
  return (
    <section
      aria-label="Resultados de clientes"
      style={{
        background: "#FAFAFA",
        borderTop: "2px solid #14110D",
        borderBottom: "2px solid #14110D",
      }}
    >
      <div
        className="w3-pad"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "28px 28px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* 3 métricas */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{ minWidth: 110 }}>
              <div
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(30px,4vw,46px)",
                  lineHeight: 1,
                  color: "#14110D",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.35,
                  color: "#6b6258",
                  marginTop: 6,
                  maxWidth: 140,
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* 1 depoimento */}
        <figure
          style={{
            margin: 0,
            borderLeft: "3px solid #7CF067",
            paddingLeft: 18,
          }}
        >
          <blockquote
            style={{
              margin: 0,
              fontSize: "clamp(14.5px,1.6vw,16.5px)",
              lineHeight: 1.5,
              color: "#14110D",
              fontWeight: 500,
            }}
          >
            &ldquo;{PROOF.quote}&rdquo;
          </blockquote>
          <figcaption
            style={{
              marginTop: 12,
              fontSize: 12.5,
              color: "#6b6258",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <strong style={{ color: "#14110D" }}>{PROOF.author}</strong>
            <span>· {PROOF.role}</span>
            <a
              href={PROOF.href}
              style={{
                color: "#D262B2",
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              ver case &rarr;
            </a>
          </figcaption>
        </figure>
      </div>
      {/* Procedência — sem isto o bloco vira "mais números de agência". */}
      <div
        className="w3-pad"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px 22px" }}
      >
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.45, color: "#8a8078" }}>
          {PROOF_NOTE}
        </p>
      </div>
      {/* Responsivo: empilha no mobile (o grid de 2 col fica apertado) */}
      <style dangerouslySetInnerHTML={{ __html: `@media (max-width:760px){.kv2 [aria-label="Resultados de clientes"] > div{grid-template-columns:1fr!important;gap:20px!important;}}` }} />
    </section>
  );
}
