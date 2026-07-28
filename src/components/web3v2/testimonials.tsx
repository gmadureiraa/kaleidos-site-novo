"use client";

/**
 * Web3 V2 — Depoimentos (home `/`).
 *
 * Seção PRETA (ink #14110D) que cria ritmo alternado preto/branco entre as
 * seções vizinhas claras ("Como funciona" acima, Cases abaixo). Estética
 * web3v2: fontes Atelier/Gridlite, cards brutalistas com hard-shadow verde/rosa,
 * acentos #7CF067 / #D262B2. Depoimentos REAIS de `@/lib/testimonials-data`.
 *
 * Layout: grid de 3 depoimentos em destaque (os 3 primeiros da base, os cases
 * de maior peso). Sem carrossel — leitura direta, tipografia forte.
 */
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { getTestimonials } from "@/lib/testimonials-data";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

const STYLE = `
.kv2 .w3-tcard{transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-tcard:hover{transform:translateY(-8px) rotate(0deg)!important;}
.kv2 .w3-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch;}
@media (max-width:960px){.kv2 .w3-tgrid{grid-template-columns:1fr!important;gap:18px!important;}.kv2 .w3-tcard{transform:none!important;}}
/* MOBILE: 2 depoimentos bastam como prova social; o 3º empilhado deixava a
   seção longa demais. Desktop segue com os 3. */
@media (max-width:600px){.kv2 .w3-tgrid .w3-tcard:nth-child(3){display:none!important;}}
`;

// Alterna acento verde/rosa por card (mesmo padrão dos cards de processo).
const ACCENTS = [GREEN, PINK, GREEN];
const ROTS = [-1.5, 1.5, -1];

export function Web3V2Testimonials() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const testimonials = getTestimonials().slice(0, 3);

  return (
    <section
      id="depoimentos"
      style={{ position: "relative", background: INK, overflow: "hidden" }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      {/* halos de cor difusos no fundo preto */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-8%",
          left: "-6%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle,${GREEN}1f,transparent 66%)`,
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-4%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: `radial-gradient(circle,${PINK}1f,transparent 66%)`,
          pointerEvents: "none",
        }}
      />

      <div
        className="w3-pad"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 28px", position: "relative" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: GREEN,
              marginBottom: 16,
            }}
          >
            {isEn ? "Testimonials" : "Depoimentos"}
          </div>
          <h2
            style={{
              fontFamily: "Atelier, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px,4.6vw,60px)",
              lineHeight: 0.98,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#FAFAFA",
            }}
          >
            {isEn ? (
              <>
                Real results,
                <br />
                real stories.
              </>
            ) : (
              <>
                Resultado real,
                <br />
                de quem confiou.
              </>
            )}
          </h2>
        </div>

        {/* Grid de 3 depoimentos */}
        <div className="w3-tgrid">
          {testimonials.map((t, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const rot = ROTS[i % ROTS.length];
            return (
              <figure
                key={t.id}
                className="w3-tcard"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#1d1812",
                  border: "1.5px solid #3a332a",
                  borderRadius: 18,
                  padding: "28px 26px 26px",
                  boxShadow: `6px 6px 0 ${accent}`,
                  transform: `rotate(${rot}deg)`,
                  margin: 0,
                }}
              >
                {/* aspa decorativa */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "Atelier, sans-serif",
                    fontWeight: 800,
                    fontSize: 56,
                    lineHeight: 0.6,
                    color: accent,
                    marginBottom: 10,
                  }}
                >
                  &ldquo;
                </div>

                {/* highlight badge */}
                {t.highlight && (
                  <span
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      fontFamily: "Gridlite, monospace",
                      fontSize: 11,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      color: accent,
                      background: `${accent}18`,
                      border: `1px solid ${accent}40`,
                      borderRadius: 999,
                      padding: "5px 11px",
                      marginBottom: 16,
                    }}
                  >
                    {isEn ? t.highlight_en || t.highlight : t.highlight}
                  </span>
                )}

                {/* quote */}
                <blockquote
                  style={{
                    flex: 1,
                    margin: "0 0 20px",
                    fontFamily: "Atelier, sans-serif",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "#EDE7DD",
                  }}
                >
                  {isEn ? t.quote_en : t.quote}
                </blockquote>

                {/* footer: avatar + nome + case link */}
                <figcaption
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderTop: "1px solid #3a332a",
                    paddingTop: 16,
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#2a241d",
                      border: `1.5px solid ${accent}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={42}
                        height={42}
                        style={
                          t.avatarIsPhoto
                            ? { width: "100%", height: "100%", objectFit: "cover" }
                            : { objectFit: "contain", padding: 3 }
                        }
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: "Atelier, sans-serif",
                          fontWeight: 700,
                          fontSize: 16,
                          color: accent,
                        }}
                      >
                        {t.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "Atelier, sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#FAFAFA",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 12.5,
                        color: "#a89f92",
                        lineHeight: 1.3,
                      }}
                    >
                      {t.role} · {t.company}
                    </span>
                    {t.caseLink && (
                      <Link
                        href={isEn ? `${t.caseLink}?lang=en` : t.caseLink}
                        style={{
                          display: "inline-block",
                          marginTop: 4,
                          fontFamily: "Gridlite, monospace",
                          fontSize: 11,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: accent,
                          textDecoration: "none",
                        }}
                      >
                        {isEn ? "See case →" : "Ver case →"}
                      </Link>
                    )}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
