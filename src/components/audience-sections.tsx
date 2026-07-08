import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Audience } from "@/lib/audiences";

/**
 * AudienceSections — bloco PERSONALIZADO por público, renderizado só nas rotas
 * /founders /creators /fintech /saas /empresas (nunca na home `/`).
 *
 * Segue a estética web3v2 (seções escuras #14110D, verde #7CF067 / rosa #D262B2,
 * fontes Atelier/Gridlite/Inter, cards neobrutalistas com box-shadow deslocado).
 * Puxa dores, ênfase de serviços, prova (case real) e FAQ do objeto Audience.
 *
 * Server component (sem hooks): os CTAs de calendly/wa.me são captados pelo
 * Web3V2CtaTracking global via href, igual ao resto do site.
 */

const KICKER: React.CSSProperties = {
  fontFamily: "Gridlite, monospace",
  fontSize: 12,
  letterSpacing: "3px",
  textTransform: "uppercase",
  color: "#D262B2",
  marginBottom: 14,
};

const H2: React.CSSProperties = {
  fontFamily: "Atelier, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(30px,4vw,50px)",
  lineHeight: 1.0,
  letterSpacing: "-1.2px",
  margin: 0,
  color: "#FAFAFA",
};

const CARD: React.CSSProperties = {
  background: "#1d1812",
  border: "1.5px solid #3a332a",
  borderRadius: 14,
  padding: "22px 22px",
};

export function AudienceSections({ audience }: { audience: Audience }) {
  const { pains, servicesEmphasis, proof, ctaLine, faq } = audience;
  if (!pains && !servicesEmphasis && !proof) return null;

  return (
    <section
      aria-label="Por que a Kaleidos pra você"
      style={{
        position: "relative",
        background: "#14110D",
        color: "#FAFAFA",
        overflow: "hidden",
        borderTop: "2px solid #14110D",
        backgroundImage:
          "linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      <div
        className="w3-pad"
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "78px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        {/* 1 · DORES */}
        {pains && pains.length > 0 && (
          <div>
            <div style={KICKER}>onde você trava</div>
            <h2 style={H2}>
              Você provavelmente reconhece{" "}
              <span style={{ color: "#7CF067" }}>isso</span>.
            </h2>
            <div
              className="aud-grid-3"
              style={{
                marginTop: 34,
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: 18,
              }}
            >
              {pains.map((p, i) => (
                <div
                  key={p.title}
                  style={{
                    ...CARD,
                    boxShadow: `4px 4px 0 ${i === 1 ? "#D262B2" : "#7CF067"}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Atelier, sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      lineHeight: 1,
                      color: i === 1 ? "#D262B2" : "#7CF067",
                      WebkitTextStroke: "1px #14110D",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Atelier, sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      margin: "12px 0 8px",
                      color: "#FAFAFA",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "#9a9186",
                      margin: 0,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2 · ÊNFASE DE SERVIÇOS */}
        {servicesEmphasis && servicesEmphasis.length > 0 && (
          <div>
            <div style={KICKER}>a resposta da kaleidos</div>
            <h2 style={H2}>
              O que a Kaleidos prioriza{" "}
              <span style={{ color: "#7CF067" }}>pra você</span>.
            </h2>
            <div
              className="aud-grid-2"
              style={{
                marginTop: 34,
                display: "grid",
                gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                gap: 16,
              }}
            >
              {servicesEmphasis.map((s) => (
                <Link
                  key={s.title}
                  href="/servicos"
                  style={{
                    ...CARD,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      flexShrink: 0,
                      height: 38,
                      width: 38,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 11,
                      background: "#14110D",
                      border: "1.5px solid #7CF067",
                      color: "#7CF067",
                    }}
                  >
                    <ArrowUpRight size={19} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: "Atelier, sans-serif",
                        fontWeight: 700,
                        fontSize: 17.5,
                        margin: "3px 0 5px",
                        color: "#FAFAFA",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: "#9a9186",
                        margin: 0,
                      }}
                    >
                      {s.why}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 3 · PROVA (case real) */}
        {proof && (
          <div>
            <div style={KICKER}>prova real</div>
            <div
              className="aud-proof"
              style={{
                marginTop: 18,
                background: "#FAFAFA",
                color: "#14110D",
                border: "1.5px solid #14110D",
                borderRadius: 18,
                boxShadow: "7px 7px 0 #7CF067",
                padding: "30px 30px",
                display: "grid",
                gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.4fr)",
                gap: 30,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Gridlite, monospace",
                    fontSize: 12,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#6b6258",
                    marginBottom: 10,
                  }}
                >
                  {proof.client}
                </div>
                <div
                  style={{
                    fontFamily: "Atelier, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(30px,4vw,46px)",
                    lineHeight: 1.02,
                    letterSpacing: "-1px",
                    color: "#14110D",
                  }}
                >
                  {proof.metric}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(14.5px,1.6vw,16.5px)",
                    lineHeight: 1.55,
                    color: "#14110D",
                    fontWeight: 500,
                    margin: "0 0 14px",
                  }}
                >
                  {proof.blurb}
                </p>
                <Link
                  href={`/cases/${proof.caseId}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 14.5,
                    color: "#D262B2",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  ver o case completo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4 · FAQ do segmento */}
        {faq && faq.length > 0 && (
          <div>
            <div style={KICKER}>perguntas frequentes</div>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {faq.map((f) => (
                <div key={f.q} style={CARD}>
                  <h3
                    style={{
                      fontFamily: "Atelier, sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      margin: "0 0 7px",
                      color: "#7CF067",
                    }}
                  >
                    {f.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "#c9c1b6",
                      margin: 0,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5 · CTA sob medida */}
        {ctaLine && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 22,
              paddingTop: 6,
            }}
          >
            <p
              style={{
                fontFamily: "Atelier, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(22px,2.8vw,34px)",
                lineHeight: 1.15,
                letterSpacing: "-0.8px",
                color: "#FAFAFA",
                margin: 0,
                maxWidth: 760,
              }}
            >
              {ctaLine}
            </p>
            <a
              href="https://calendly.com/madureira-kaleidosdigital/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#7CF067",
                color: "#06250a",
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 28px",
                borderRadius: 999,
                boxShadow: "5px 5px 0 #D262B2",
                textDecoration: "none",
              }}
            >
              Agendar reunião <ArrowRight size={17} />
            </a>
          </div>
        )}
      </div>

      {/* Responsivo: grids colapsam no mobile */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '@media (max-width:820px){.kv2 [aria-label="Por que a Kaleidos pra você"] .aud-grid-3,.kv2 [aria-label="Por que a Kaleidos pra você"] .aud-grid-2,.kv2 [aria-label="Por que a Kaleidos pra você"] .aud-proof{grid-template-columns:1fr!important;}}',
        }}
      />
    </section>
  );
}
