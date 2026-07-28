import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Web3V2Defs } from "@/components/web3v2/sections";
import { Web3V2ClientsMarquee } from "@/components/web3v2/clients-marquee";
import { FooterDemo } from "@/components/ui/footer-demo";
import { Marquee } from "@/components/magicui/marquee";
import { RotatingWord } from "./rotating-word";
import { MetodoStepper } from "./metodo-stepper";
import { HeroCanvas } from "@/components/marca-pessoal/hero-canvas";
import { AsciiTorus } from "@/components/marca-pessoal/ascii-torus";
import { AsciiField } from "@/components/marca-pessoal/ascii-field";
import { AnimatedNumber } from "@/components/marca-pessoal/animated-number";
import { DotGraph } from "@/components/marca-pessoal/dot-graph";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";

/**
 * /marca-pessoal — Founder-Led Growth (marca pessoal para founders e C-levels).
 *
 * Página standalone no estilo web3v2 (.kv2): fundo #FAFAFA alternando com dark
 * #14110D, rosa #D262B2, verde #7CF067 no highlight de headline, Atelier
 * (display) / Inter (corpo) / Gridlite (eyebrows), botões .cta-btn neo-brutal.
 *
 * REGRAS DE DADO (paper 2026-07-24, vault/015 - BRANDING E GROWTH):
 * - Todo stat de terceiro tem fonte visível (Weber Shandwick 2015, Edelman-
 *   LinkedIn 2024, Refine Labs, LinkedIn, Digital Applied).
 * - Métricas de case vêm SÓ de src/lib/case-data.ts (Investidor 4.20, Layla
 *   Foz, Defiverso, NeoBankless, DSEC). Nunca inventar número.
 * - Sem preço literal na página (tiers por nome + call de qualificação).
 * - Voz institucional "a Kaleidos", PT-BR, sem travessão no corpo.
 */

const CANONICAL = "/marca-pessoal";
const TITLE = "Marca Pessoal para Founders | Founder-Led Growth — Kaleidos";
const DESC =
  "Founder-Led Growth para founders de cripto, web3 e fintech. A Kaleidos transforma a expertise do founder em autoridade, e autoridade em pipeline. Instagram como palco principal, LinkedIn e X reforçando a autoridade B2B: você grava, a gente faz o resto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: CANONICAL,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

// Highlight verde de headline: bloco sólido de altura total com tinta escura por
// cima. A faixa de 40% deixava topo/base das letras invisíveis em fundo escuro
// (dark on dark) — palavra virava borrão. Bloco sólido dá contraste máximo e
// legível em qualquer fundo, mantendo a cara sticker neo-brutal.
const HL =
  "background:#7CF067;color:#14110D;padding:.06em .22em;border-radius:6px;box-decoration-break:clone;-webkit-box-decoration-break:clone;";

const WA_AUDIT =
  "https://wa.me/5512997796835?text=" +
  encodeURIComponent(
    "Oi! Quero a auditoria gratuita do meu perfil (marca pessoal de founder)."
  );

const WA_DIAG =
  "https://wa.me/5512997796835?text=" +
  encodeURIComponent(
    "Oi! Quero saber mais sobre o Diagnóstico de Posicionamento (marca pessoal de founder)."
  );

// CSS escopado da página (grids responsivos + tabela com scroll próprio).
const MP_STYLE = `
.kv2 .mp-pad{padding-left:28px;padding-right:28px;}
.kv2 .mp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
.kv2 .mp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.kv2 .mp-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.kv2 .mp-grid6{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.kv2 .mp-stats{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;}
.kv2 .mp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
.kv2 .mp-table{width:100%;min-width:560px;border-collapse:separate;border-spacing:0;}
.kv2 details.mp-faq summary::-webkit-details-marker{display:none;}
.kv2 details.mp-faq summary{cursor:pointer;list-style:none;}
.kv2 details.mp-faq[open] .mp-faq-plus{transform:rotate(45deg);}
.kv2 .mp-faq-plus{transition:transform .2s ease;display:inline-block;}
@media(max-width:980px){
  .kv2 .mp-grid4{grid-template-columns:repeat(2,1fr);}
  .kv2 .mp-grid3{grid-template-columns:1fr;}
  .kv2 .mp-grid6{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:760px){
  .kv2 .mp-grid2{grid-template-columns:1fr;gap:20px;}
  .kv2 .mp-hero-deco{display:none;}
}
@media(max-width:560px){
  .kv2 .mp-grid4{grid-template-columns:1fr;}
  .kv2 .mp-grid6{grid-template-columns:1fr;}
  .kv2 .mp-pad{padding-left:20px;padding-right:20px;}
}
/* ── Hero "parede de prova" (só conteúdo real rolando; sem card de print) ── */
.kv2 .mp-hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:48px;align-items:center;}
.kv2 .mp-wall{position:relative;height:600px;display:flex;gap:16px;justify-content:center;}
.kv2 .mp-wall-mobile{display:none;}
.kv2 .mp-wall-col{width:162px;height:100%;overflow:hidden;}
.kv2 .mp-wall-col--mid{margin-top:-38px;}
.kv2 .mp-wall-card{width:162px;border-radius:14px;border:1.5px solid #3a332a;overflow:hidden;background:#1d1812;}
.kv2 .mp-wall-card img{display:block;width:100%;height:auto;}
.kv2 .mp-wall-fade-top,.kv2 .mp-wall-fade-bottom{position:absolute;left:-24px;right:-24px;height:130px;z-index:20;pointer-events:none;}
.kv2 .mp-wall-fade-top{top:0;background:linear-gradient(#14110D,transparent);}
.kv2 .mp-wall-fade-bottom{bottom:0;background:linear-gradient(transparent,#14110D);}
@media(max-width:1160px){.kv2 .mp-wall-col:nth-child(5){display:none;}}
@media(max-width:1060px){
  .kv2 .mp-hero-grid{grid-template-columns:1fr;gap:36px;}
  .kv2 .mp-wall{display:none;}
  .kv2 .mp-wall-mobile{display:block;}
}
/* ── Timeline de dores (pains relieved) ── */
.kv2 .mp-dores{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;position:relative;}
.kv2 .mp-dores:before{content:"";position:absolute;top:11px;left:4%;right:4%;border-top:1.5px dashed #3a332a;}
@media(max-width:980px){.kv2 .mp-dores{grid-template-columns:repeat(2,1fr);} .kv2 .mp-dores:before{display:none;}}
@media(max-width:560px){.kv2 .mp-dores{grid-template-columns:1fr;}}
/* ── Header de seção: editorial, comedido + assimétrico (12-col) ──
   Tipografia LIMPA: headline em Inter (legível em texto longo), Atelier fica
   reservado a números e palavras-âncora curtas. Nada de type gigante gritando. */
.kv2 .mp-head{display:grid;grid-template-columns:repeat(12,1fr);gap:14px 34px;align-items:end;margin-bottom:46px;}
.kv2 .mp-head-l{grid-column:1 / span 7;min-width:0;}
.kv2 .mp-head-r{grid-column:8 / span 5;align-self:end;padding-bottom:8px;min-width:0;}
.kv2 .mp-h2{font-family:'Inter',sans-serif;font-weight:800;font-size:clamp(30px,3.5vw,50px);line-height:1.05;letter-spacing:-1.6px;margin:0;text-wrap:balance;}
.kv2 .mp-h2 .hl{font-family:'Inter',sans-serif;background:#7CF067;color:#14110D;padding:.06em .2em;border-radius:7px;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
.kv2 .mp-h2 .acc{font-family:Atelier,sans-serif;font-weight:400;letter-spacing:-1px;}
.kv2 .mp-h2 .out{-webkit-text-stroke:1.5px currentColor;color:transparent;}
/* variante stack (containers estreitos ≤1000: título largura total, lead abaixo) */
.kv2 .mp-head--stack{grid-template-columns:1fr;gap:16px;align-items:start;}
.kv2 .mp-head--stack .mp-head-l{grid-column:1 / -1;}
.kv2 .mp-head--stack .mp-head-r{grid-column:1 / -1;align-self:start;padding-bottom:0;max-width:640px;}
@media(max-width:900px){
  .kv2 .mp-head{grid-template-columns:1fr;gap:14px;margin-bottom:34px;}
  .kv2 .mp-head-l,.kv2 .mp-head-r{grid-column:1 / -1;padding-bottom:0;}
  .kv2 .mp-h2{font-size:clamp(27px,6.4vw,40px);letter-spacing:-1.2px;line-height:1.08;}
}
/* ── ASCII torus wrap ── */
.kv2 .mp-torus-wrap{overflow:hidden;}
@media(max-width:760px){.kv2 .mp-torus-wrap{display:none;}}
`;

/* Eyebrow-assinatura (teardown): traço + label mono. Coesão entre seções. */
const eyebrow = (label: string, color = "#D262B2", justify = "center") =>
  `<div style="display:flex;align-items:center;justify-content:${justify};gap:12px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${color};margin-bottom:18px;"><span style="width:36px;height:1.5px;background:currentColor;display:inline-block;"></span><span>${label}</span><span style="width:36px;height:1.5px;background:currentColor;display:inline-block;"></span></div>`;

/* Mesma assinatura em JSX (pras seções novas). */
function Eyebrow({
  label,
  color = "#D262B2",
  justify = "center",
}: {
  label: string;
  color?: string;
  justify?: "center" | "flex-start";
}) {
  const dash = {
    width: 36,
    height: 1.5,
    background: "currentColor",
    display: "inline-block",
  } as const;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: justify,
        gap: 12,
        fontFamily: "Gridlite, monospace",
        fontSize: 12,
        letterSpacing: 3,
        textTransform: "uppercase",
        color,
        marginBottom: 18,
      }}
    >
      <span style={dash} />
      <span>{label}</span>
      {justify === "center" && <span style={dash} />}
    </div>
  );
}

/* Header de seção GIGANTE + assimétrico (teardown/compute: H2 128-140px,
   leading .85, grid 12-col). Substitui o header centralizado genérico. */
function SectionHead({
  eyebrow: eyebrowLabel,
  title,
  lead,
  dark = false,
  eyebrowColor = "#D262B2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  eyebrowColor?: string;
}) {
  return (
    <div className="mp-head">
      <div className="mp-head-l">
        <Eyebrow label={eyebrowLabel} color={eyebrowColor} justify="flex-start" />
        <h2 className="mp-h2" style={{ color: dark ? "#FAFAFA" : "#14110D" }}>
          {title}
        </h2>
      </div>
      {lead && (
        <div className="mp-head-r">
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: dark ? "#b8b1a6" : "#6b6258",
              margin: 0,
            }}
          >
            {lead}
          </p>
        </div>
      )}
    </div>
  );
}

/* Mesma coisa em string, pras seções que vivem em dangerouslySetInnerHTML. */
const headHTML = (
  eyebrowLabel: string,
  title: string,
  lead: string,
  dark = true,
  narrow = false
) => `
<div class="mp-head${narrow ? " mp-head--stack" : ""}">
  <div class="mp-head-l">
    ${eyebrow(eyebrowLabel, "#D262B2", "flex-start")}
    <h2 class="mp-h2" style="color:${dark ? "#FAFAFA" : "#14110D"};">${title}</h2>
  </div>
  <div class="mp-head-r"><p style="font-size:16px;line-height:1.6;color:${
    dark ? "#b8b1a6" : "#6b6258"
  };margin:0;">${lead}</p></div>
</div>`;

/* ── Conteúdo REAL publicado nos perfis de clientes (public/Cases/…).
   Nada aqui é mockup: são capas de reels e slides de carrossel entregues. ── */
const WALL_COL_A: { src: string; alt: string }[] = [
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DaBYpV9xK7S-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola (Investidor 4.20)" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels1.webp", alt: "Capa de reel publicado no perfil da Layla Foz" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DO9ZQ2_kirU-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/neobankless/conteudo/instagram/post-dolarizar.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels3.webp", alt: "Capa de reel publicado no perfil da Layla Foz" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWFG0_kCUuF-capa.jpg", alt: "Capa de reel publicado no Instagram do Defiverso" },
];
const WALL_COL_B: { src: string; alt: string }[] = [
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTQy_Bbkkzo-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels2.webp", alt: "Capa de reel publicado no perfil da Layla Foz" },
  { src: "/Cases/neobankless/conteudo/instagram/post-global.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTi3Re1Eox--capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
];
const WALL_COL_C: { src: string; alt: string }[] = [
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DOO62uUEvMu-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/neobankless/conteudo/instagram/post-cartao.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels4.webp", alt: "Capa de reel publicado no perfil da Layla Foz" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTWArqxkhuK-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
];

function WallCard({ item }: { item: { src: string; alt: string } }) {
  return (
    <div className="mp-wall-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
    </div>
  );
}

/* ────────────────────────── S1 · HERO (dark) ──────────────────────────
   "Parede de prova": headline oversized esquerda-alinhada com BlurWord
   (teardown/compute) + parede de conteúdo REAL de Instagram em marquees
   verticais (magicui/Marquee) e o print real do perfil do Lucas dentro de
   uma moldura de iPhone (teardown/iphone: moldura + screen-slot). */
function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#14110D",
        color: "#FAFAFA",
        overflow: "hidden",
      }}
    >
      {/* Assinatura viva: canvas de ondas de absorção reagindo ao mouse
          (teardown/iphone: absorption-animation). Camada de fundo do hero. */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
        <HeroCanvas />
      </div>
      {/* vinheta pra dar profundidade e legibilidade ao texto */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 78% 40%, transparent 30%, #14110D 78%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          paddingTop: 72,
          paddingBottom: 64,
        }}
      >
        <div className="mp-hero-grid">
          {/* Coluna copy */}
          <div>
            <Eyebrow
              label="Founder-led growth · cripto · web3 · fintech"
              color="#7CF067"
              justify="flex-start"
            />
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(38px,4.8vw,68px)",
                lineHeight: 1.02,
                letterSpacing: "-2px",
                margin: 0,
              }}
            >
              Sua expertise
              <br />
              vira{" "}
              <span
                style={{
                  background: "#7CF067",
                  color: "#14110D",
                  padding: ".04em .2em",
                  borderRadius: 8,
                  display: "inline-block",
                }}
              >
                <RotatingWord
                  words={["autoridade", "audiência", "pipeline", "capital"]}
                />
              </span>
              <span style={{ color: "#7CF067" }}>.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px,1.8vw,19px)",
                lineHeight: 1.6,
                color: "#b8b1a6",
                maxWidth: 520,
                margin: "26px 0 0",
              }}
            >
              Founder-Led Growth para founders de cripto, web3 e fintech: a
              Kaleidos constrói a sua marca pessoal no Instagram, o palco onde
              a audiência acontece no Brasil, com LinkedIn e X reforçando a
              autoridade B2B. A gente fala DeFi, stablecoin e fintech
              nativamente. Você dá a cara. A gente faz o resto.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: 36,
              }}
            >
              <a
                href="/agendar"
                className="cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "#7CF067",
                  color: "#06250a",
                  fontWeight: 700,
                  fontSize: 17,
                  padding: "16px 30px",
                  borderRadius: 999,
                  boxShadow: "5px 5px 0 #D262B2",
                  textDecoration: "none",
                }}
              >
                Ver se faz sentido &rarr;
              </a>
              <a
                href={WA_AUDIT}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "transparent",
                  color: "#FAFAFA",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "15px 26px",
                  borderRadius: 999,
                  border: "1.5px solid #FAFAFA",
                  textDecoration: "none",
                }}
              >
                Auditar meu perfil de graça
              </a>
            </div>
            <p
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#9a9186",
                margin: "26px 0 0",
              }}
            >
              &larr; conteúdo real publicado em perfis de clientes. nada de
              mockup.
            </p>
          </div>

          {/* Parede de prova (desktop): só conteúdo real publicado rolando.
              Três colunas em marquee vertical, sem card de print (o print do
              Lucas vive na seção "Nossos cases no Instagram", não aqui). */}
          <div className="mp-wall" aria-hidden="true">
            <div className="mp-wall-fade-top" />
            <div className="mp-wall-fade-bottom" />
            <div className="mp-wall-col">
              <Marquee vertical repeat={3} className="[--duration:46s] [--gap:1rem] h-full p-0">
                {WALL_COL_A.map((item) => (
                  <WallCard key={item.src} item={item} />
                ))}
              </Marquee>
            </div>
            <div className="mp-wall-col mp-wall-col--mid">
              <Marquee vertical reverse repeat={3} className="[--duration:54s] [--gap:1rem] h-full p-0">
                {WALL_COL_B.map((item) => (
                  <WallCard key={item.src} item={item} />
                ))}
              </Marquee>
            </div>
            <div className="mp-wall-col">
              <Marquee vertical repeat={3} className="[--duration:50s] [--gap:1rem] h-full p-0">
                {WALL_COL_C.map((item) => (
                  <WallCard key={item.src} item={item} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        {/* Parede de prova (mobile): faixa horizontal */}
        <div className="mp-wall-mobile" style={{ marginTop: 40 }}>
          <Marquee repeat={3} className="[--duration:40s] [--gap:.9rem] p-0">
            {[...WALL_COL_A, ...WALL_COL_B, ...WALL_COL_C].map((item) => (
              <div
                key={item.src}
                style={{
                  width: 128,
                  borderRadius: 12,
                  border: "1.5px solid #3a332a",
                  overflow: "hidden",
                  background: "#1d1812",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </Marquee>
          <p
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#9a9186",
              margin: "14px 0 0",
              textAlign: "center",
            }}
          >
            conteúdo real publicado em perfis de clientes
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── S2 · PROVA AGREGADA + CONGRUÊNCIA (claro) ───────────────
   Números: agregados canônicos do site (+125M views / 30+ projetos) e métricas
   reais de case-data.ts. Count-up com magicui/NumberTicker. */
const STATS: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  shadow: string;
  rotate: number;
}[] = [
  { value: 125, prefix: "+", suffix: "M", label: "de views gerados para clientes", shadow: "#7CF067", rotate: -1 },
  { value: 5, suffix: "x", label: "faturamento no nosso maior case founder-led", shadow: "#D262B2", rotate: 1 },
  { value: 20, suffix: "M+", label: "views nos reels de uma única criadora", shadow: "#7CF067", rotate: -1 },
  { value: 30, suffix: "+", label: "projetos entregues desde 2019", shadow: "#D262B2", rotate: 1 },
];

function StatsSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#FAFAFA",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow label="A prova, em números" color="#D262B2" />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px,2vw,22px)",
              lineHeight: 1.4,
              letterSpacing: "-.4px",
              color: "#14110D",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Quatro anos operando founder-led growth para founders e criadores
            de cripto, web3 e fintech.
          </p>
        </div>
        <div className="mp-stats">
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1.5px solid #14110D",
                borderRadius: 16,
                padding: "22px 28px",
                boxShadow: `5px 5px 0 ${s.shadow}`,
                textAlign: "center",
                minWidth: 200,
                transform: `rotate(${s.rotate}deg)`,
              }}
            >
              <div
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(30px,3.4vw,42px)",
                  lineHeight: 1,
                  color: "#14110D",
                }}
              >
                <AnimatedNumber
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </div>
              <div style={{ fontSize: 13.5, color: "#6b6258", marginTop: 8 }}>
                {s.label}
              </div>
              <DotGraph
                seed={s.value * 7 + 3}
                color={s.shadow}
                height={36}
                className=""
              />
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 820, margin: "56px auto 0", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 500,
              fontSize: "clamp(22px,2.8vw,34px)",
              lineHeight: 1.3,
              letterSpacing: "-.5px",
              color: "#14110D",
              margin: 0,
            }}
          >
            A gente não só vende founder-led. A gente{" "}
            <span
              style={{
                background: "#7CF067",
                color: "#14110D",
                padding: ".06em .22em",
                borderRadius: 6,
                fontWeight: 800,
              }}
            >
              É
            </span>{" "}
            founder-led.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "#6b6258",
              maxWidth: 600,
              margin: "18px auto 0",
            }}
          >
            O fundador da Kaleidos, Gabriel Madureira (@ogmadureira), aplica em
            si mesmo o método que entrega para os clientes: tese, cadência com
            o Instagram na frente (e X + LinkedIn de apoio) e medição. Quem
            vende marca pessoal de founder precisa ser a própria prova.
          </p>
        </div>
        {/* Stat do feed (estava no hero antigo; aqui vira nota de rodapé da prova) */}
        <div
          style={{
            maxWidth: 560,
            margin: "40px auto 0",
            background: "#fff",
            border: "1.5px solid #14110D",
            borderRadius: 14,
            padding: "18px 22px",
            boxShadow: "4px 4px 0 #7CF067",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "#14110D", margin: 0, fontWeight: 600 }}>
            Perfis pessoais recebem ~65% do feed do LinkedIn. Páginas de
            empresa, ~5%.
          </p>
          <p
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 11,
              letterSpacing: 1.5,
              color: "#8a8175",
              margin: "8px 0 0",
              textTransform: "uppercase",
            }}
          >
            Fonte: Digital Applied (compilação de agência, 2026)
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── S3 · PROBLEMA (dark) ──────────────────────────
   Trio de personas (ícones line-art, sem emoji) + timeline "pains relieved"
   (padrão que o Gabriel amou no estudo): a dor riscada → o alívio no método. */
const OBSERVADORES = [
  {
    nome: "O cliente",
    texto:
      "Antes de assinar contrato, ele abre seu LinkedIn e seu Instagram. Perfil parado passa a mensagem errada sobre a empresa inteira.",
    shadow: "#7CF067",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7CF067" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.8-3 3-4.5 5.5-4.5S13.7 16 14.5 19" />
        <circle cx="17.5" cy="13.5" r="3" />
        <path d="m19.8 15.8 2.2 2.2" />
      </svg>
    ),
  },
  {
    nome: "O investidor",
    texto:
      "Ele avalia o founder tanto quanto o negócio. Uma tese pública bem construída encurta qualquer due diligence de confiança.",
    shadow: "#D262B2",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D262B2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 20h18" />
        <path d="m4 15 5-5 4 3 7-8" />
        <path d="M16 5h4v4" />
      </svg>
    ),
  },
  {
    nome: "O talento",
    texto:
      "Os melhores profissionais escolhem trabalhar com líderes que admiram. Sua presença pública é o primeiro pitch de recrutamento.",
    shadow: "#7CF067",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7CF067" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 2.5 5.3 5.5.8-4 4 1 5.9-5-2.8-5 2.8 1-5.9-4-4 5.5-.8Z" />
      </svg>
    ),
  },
];

const DORES = [
  { dor: "“Não tenho tempo.”", alivio: "~2h/mês: gravação em bloco, dirigida pela gente" },
  { dor: "“Não sei o que postar.”", alivio: "Calendário editorial chega pronto pra aprovar" },
  { dor: "“Vai soar robô.”", alivio: "Imersão de voz real; IA só na velocidade" },
  { dor: "“Posto e rezo.”", alivio: "Relatório mensal + horizontes M1/M3/M6" },
];

function ProblemaSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#14110D",
        color: "#FAFAFA",
        overflow: "hidden",
        borderTop: "2px solid #14110D",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage: "radial-gradient(#ffffff14 1.2px,transparent 1.4px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          paddingTop: 88,
          paddingBottom: 88,
        }}
      >
        <SectionHead
          dark
          eyebrow="O problema"
          title={
            <>
              O mercado já<br />pesquisou seu nome.{" "}
              <span className="hl">O que achou?</span>
            </>
          }
          lead="O comprador te pesquisa antes de falar com você. Se ele não te acha, acha seu concorrente. E não é só o comprador olhando."
        />
        <div className="mp-grid3" style={{ marginTop: 44 }}>
          {OBSERVADORES.map((o) => (
            <div
              key={o.nome}
              style={{
                background: "#1d1812",
                border: "1.5px solid #3a332a",
                borderRadius: 14,
                padding: "24px 22px",
                boxShadow: `4px 4px 0 ${o.shadow}`,
              }}
            >
              {o.icon}
              <h3
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  margin: "12px 0 6px",
                  color: "#FAFAFA",
                }}
              >
                {o.nome}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "#9a9186", margin: 0 }}>
                {o.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline "as dores que saem da sua mesa" */}
        <div style={{ marginTop: 64 }}>
          <Eyebrow label="As dores que saem da sua mesa" color="#7CF067" />
          <div className="mp-dores" style={{ marginTop: 28 }}>
            {DORES.map((d) => (
              <div key={d.dor} style={{ position: "relative", textAlign: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 22,
                    height: 22,
                    borderRadius: 99,
                    background: "#14110D",
                    border: "1.5px solid #7CF067",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 5,
                      borderRadius: 99,
                      background: "#7CF067",
                    }}
                  />
                </span>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontWeight: 600,
                    fontSize: 15.5,
                    color: "#9a9186",
                    textDecoration: "line-through",
                    textDecorationColor: "#D262B2",
                    textDecorationThickness: "2px",
                    margin: "14px 0 10px",
                  }}
                >
                  {d.dor}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    background: "#1d1812",
                    border: "1.5px solid #3a332a",
                    borderRadius: 10,
                    padding: "9px 13px",
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: "#d8d1c6",
                  }}
                >
                  {d.alivio}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 52 }}>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(19px,2.4vw,26px)",
              lineHeight: 1.35,
              color: "#FAFAFA",
              margin: 0,
            }}
          >
            Você não tem tempo pra virar creator.{" "}
            <span style={{ color: "#7CF067" }}>Ainda bem que não precisa.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── S4 · OS DADOS (claro) ───────────────────────
   Stats de terceiros com fonte visível (paper 2026-07-24). Count-up com
   magicui/NumberTicker (padrão AnimatedNumber do teardown). */
const DADOS_CARDS: {
  value: number;
  suffix: string;
  decimals?: number;
  texto: string;
  fonte: string;
  shadow: string;
}[] = [
  {
    value: 45,
    suffix: "%",
    texto:
      "da reputação da empresa (e 44% do valor de mercado percebido) são atribuídos pela liderança à reputação do CEO.",
    fonte: "Weber Shandwick (estudo de 2015)",
    shadow: "#7CF067",
  },
  {
    value: 73,
    suffix: "%",
    texto:
      "dos decisores B2B dizem que thought leadership é base mais confiável pra avaliar um fornecedor do que material de marketing.",
    fonte: "Edelman-LinkedIn (2024)",
    shadow: "#D262B2",
  },
  {
    value: 2.75,
    suffix: "x",
    decimals: 2,
    texto:
      "mais impressões no perfil pessoal do que na página da empresa, publicando o mesmo conteúdo.",
    fonte: "Refine Labs (experimento de agência)",
    shadow: "#7CF067",
  },
  {
    value: 78,
    suffix: "%",
    texto:
      "dos social sellers vendem mais que os pares que não usam redes sociais no processo comercial.",
    fonte: "LinkedIn Sales Solutions",
    shadow: "#D262B2",
  },
];

function DadosSection() {
  return (
    <section style={{ position: "relative", background: "#FAFAFA", overflow: "hidden" }}>
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          paddingTop: 84,
          paddingBottom: 84,
        }}
      >
        <SectionHead
          eyebrow="Os dados"
          title={
            <>
              Não é tendência.<br />É{" "}
              <span className="hl">matemática</span>.
            </>
          }
          lead="A pesquisa mede sobretudo LinkedIn e B2B, e confirma a lógica: pessoa > página. No Brasil, o Instagram é o palco principal de alcance; LinkedIn e X reforçam a autoridade junto ao decisor."
        />
        <div className="mp-grid4">
          {DADOS_CARDS.map((c) => (
            <div
              key={c.fonte}
              style={{
                background: "#fff",
                border: "1.5px solid #14110D",
                borderRadius: 16,
                padding: "26px 22px",
                boxShadow: `5px 5px 0 ${c.shadow}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "Atelier, sans-serif",
                    fontWeight: 800,
                    fontSize: 40,
                    lineHeight: 1,
                    color: "#14110D",
                  }}
                >
                  <AnimatedNumber
                    value={c.value}
                    suffix={c.suffix}
                    decimals={c.decimals ?? 0}
                  />
                </div>
                <div style={{ width: 84, flexShrink: 0 }}>
                  <DotGraph
                    seed={Math.round(c.value * 13) + 5}
                    color={c.shadow}
                    height={40}
                  />
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#4a443c", margin: "12px 0 0", flex: 1 }}>
                {c.texto}
              </p>
              <p
                style={{
                  fontFamily: "Gridlite, monospace",
                  fontSize: 10.5,
                  letterSpacing: 1,
                  color: "#8a8175",
                  margin: "14px 0 0",
                  textTransform: "uppercase",
                }}
              >
                {c.fonte}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#6b6258",
            margin: "32px auto 0",
            maxWidth: 520,
          }}
        >
          Todo dado aqui tem fonte. É assim que a gente trabalha: número com
          origem, não frase de vendedor.
        </p>
      </div>
    </section>
  );
}

/* ────────────── S4b · MAIS DADOS DE MERCADO (dark) ────────────── */
// Stats novas do doc ENRIQUECIMENTO-pagina-2026-07-24 (vault/015 - BRANDING E
// GROWTH/marca-pessoal-founders). Todas com fonte e ano visíveis. O card do
// Nubank leva rótulo de atribuição narrativa (é boca a boca de produto/CX,
// não estudo controlado de marca pessoal).
const MERCADO_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "Mais dados de mercado",
      'Os números não<br>deixam <span class="hl">dúvida</span>.',
      "Da pesquisa acadêmica revisada por pares ao comitê de compra B2B: a autoridade pública do founder mexe em capital, pipeline e custo de aquisição. No Brasil, esse alcance se constrói primeiro no Instagram; LinkedIn e X consolidam a camada B2B.",
      true
    )}
    <div class="mp-grid3">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#7CF067;">95%</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">dos "hidden buyers" (os decisores invisíveis do comitê de compra) dizem que thought leadership forte os deixa mais receptivos a uma abordagem de vendas.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">Edelman-LinkedIn B2B Thought Leadership Report (2025)</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#D262B2;">79%</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">desses decisores invisíveis têm mais chance de defender a sua proposta no RFP quando o fornecedor produz thought leadership de qualidade consistente.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">Edelman-LinkedIn B2B Thought Leadership Report (2025)</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:'Inter',sans-serif;font-weight:800;font-size:23px;line-height:1.2;letter-spacing:-.6px;color:#FAFAFA;">Variável mais crítica pra atrair capital</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">Estudo acadêmico revisado por pares conclui que a marca pessoal do founder e do time fundador é a variável mais crítica pra atrair investimento em ventures.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">Heliyon / ScienceDirect, estudo peer-reviewed (2019)</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#D262B2;">89%</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">das pessoas confiam mais em recomendações de gente que conhecem do que em qualquer outro canal. Anúncio pago fica muito abaixo. Pessoas &gt; marcas &gt; anúncios.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">Nielsen, Trust in Advertising (2021)</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#7CF067;">32% &rarr; 39%</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">foi o salto do LinkedIn no share de budget de marketing B2B de 2024 pra 2025. O dinheiro está migrando pro canal onde perfil pessoal domina o feed.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">The Digital Bloom, B2B GTM Benchmarks (2025, benchmark de agência)</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#D262B2;">US$7</div>
        <p style="font-size:14px;line-height:1.55;color:#d8d1c6;margin:12px 0 0;flex:1;">é o CAC histórico do Nubank, contra US$300 a US$600 de bancos tradicionais: ~80-90% dos clientes chegam por indicação, não por anúncio.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#9a9186;margin:14px 0 0;text-transform:uppercase;">Aakash Gupta / WhiteSight (2024) · atribuição narrativa: boca a boca de produto, não estudo controlado</p>
      </div>
    </div>
    <p style="text-align:center;font-size:14px;color:#9a9186;margin:32px auto 0;max-width:640px;">Mesmo padrão de rigor da seção anterior: fonte e ano em todo número. Onde a fonte é benchmark de agência ou a ligação causa-efeito é leitura narrativa, está rotulado no próprio card.</p>
  </div>
</section>
`;

/* ────────────── S4c · CASES FAMOSOS / REFERÊNCIAS DE MERCADO (claro) ────────────── */
// ⚠️ Referências PÚBLICAS de mercado, NÃO clientes da Kaleidos. Disclaimer
// visível no topo e em cada contexto. Números do doc de enriquecimento e do
// paper 2026-07-24 (todos com fonte pública). A ligação marca pessoal →
// resultado é atribuição narrativa (imprensa/founder), sinalizada no rodapé.
const FAMOSOS_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    ${headHTML(
      "Referências de mercado",
      'O mercado<br><span class="hl">já provou</span>.',
      'Exemplos públicos e famosos de founder como mídia. <strong style="color:#14110D;">Não são clientes da Kaleidos</strong>: os nossos, com métrica auditável, estão logo abaixo.',
      false
    )}
    <div class="mp-grid3">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Luiza Trajano · Magalu</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1.1;margin:12px 0 0;color:#14110D;">4M+ seguidores da "Lu"</div>
        <p style="font-size:14px;line-height:1.55;color:#4a443c;margin:12px 0 0;flex:1;">A avatar "Lu do Magalu", inspirada na fundadora, passou de 4 milhões de seguidores no Instagram e é tida como a primeira influenciadora virtual do Brasil, com collab Adidas&times;Farm. <strong>Lição:</strong> a persona do founder pode ser sistematizada em ativo de mídia perene da empresa.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Fonte: InfoMoney · registro público</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">David Vélez · Nubank</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1.1;margin:12px 0 0;color:#14110D;">CAC de US$7, NPS 90</div>
        <p style="font-size:14px;line-height:1.55;color:#4a443c;margin:12px 0 0;flex:1;">Banco construído sem budget de marketing tradicional: ~80-90% dos clientes por indicação e Vélez como voz pública da tese "velvet rope" (entrada por convite). <strong>Lição:</strong> confiança em pessoas e comunidade escala mais barato que anúncio pago.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Fonte: Aakash Gupta · WhiteSight · Forbes (2024)</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Sara Blakely · Spanx</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1.1;margin:12px 0 0;color:#14110D;">Zero anúncio até 2016</div>
        <p style="font-size:14px;line-height:1.55;color:#4a443c;margin:12px 0 0;flex:1;">Nunca captou investimento externo, deteve 100% da empresa por 21 anos e cresceu na base de mídia espontânea da própria Blakely: 8.000 pares vendidos em 5 minutos na estreia da QVC. <strong>Lição:</strong> a história e o rosto da founder podem substituir a verba de mídia por anos.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Fonte: Britannica · SUCCESS</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Whitney Wolfe Herd · Bumble</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1.1;margin:12px 0 0;color:#14110D;">IPO de US$2,2 bilhões</div>
        <p style="font-size:14px;line-height:1.55;color:#4a443c;margin:12px 0 0;flex:1;">A founder virou o próprio símbolo do produto ("a mulher dá o primeiro passo") e, no IPO de 2021, tornou-se a mulher self-made mais jovem a abrir capital nos EUA, bilionária aos 31. <strong>Lição:</strong> founder-símbolo alinha narrativa pessoal e produto, e vira capa de mídia global.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Fonte: Forbes (2021)</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">João Adibe · Cimed</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1.1;margin:12px 0 0;color:#14110D;">10x o alcance da empresa</div>
        <p style="font-size:14px;line-height:1.55;color:#4a443c;margin:12px 0 0;flex:1;">O perfil pessoal do CEO (~5,2M seguidores) tem cerca de 10x o da própria Cimed, que faturou R$3,6 bilhões em 2024; a collab Carmed&times;Fini fez 1,2 bilhão de views no TikTok e esgotou estoque em 15 dias. <strong>Lição:</strong> quando o founder tem mais alcance que a página, ele vira o canal de lançamento mais barato da companhia.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Fonte: Origyn · Revista Encontro (2025) · InvestNews</p>
      </div>
      <div style="background:#14110D;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;justify-content:center;text-align:center;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">E os cases da Kaleidos?</div>
        <p style="font-size:15px;line-height:1.6;color:#d8d1c6;margin:14px 0 0;">Esses aí de cima são referências públicas do mercado. Os founders e criadores que a gente atende de verdade, com antes e depois auditável, estão na próxima seção.</p>
        <a href="#cases-kaleidos" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver os nossos cases &darr;</a>
      </div>
    </div>
    <p style="text-align:center;font-size:13px;color:#8a8175;margin:32px auto 0;max-width:680px;"><strong>Nota de rigor:</strong> os números acima são fatos públicos (seguidores, faturamento, IPO, views). A ligação "marca pessoal causou o resultado" é atribuição narrativa da imprensa e dos próprios founders, não estudo de atribuição controlado. Citamos assim de propósito.</p>
  </div>
</section>
`;

/* ─────────────────────── S5 · O QUE FAZEMOS (dark) ─────────────────────── */
const FAZEMOS_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "O que fazemos",
      'Você grava.<br>A gente faz <span class="hl">o resto</span>.',
      'O palco principal é o <strong style="color:#7CF067;">Instagram</strong>: carrossel, reels e stories, onde o alcance acontece. A Kaleidos dirige, escreve, desenha, edita, publica e mede. LinkedIn e X entram como camada de autoridade B2B, sem produção dobrada.',
      true
    )}
    <div class="mp-grid2" style="max-width:900px;margin:0 auto;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #7CF067;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#7CF067;margin-bottom:16px;">Você</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Grava os reels (a gente dirige e roteiriza)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publica stories do dia a dia com direção nossa</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Responde as DMs que viram conversa de negócio</li>
          <li style="padding:7px 0;">Dá a cara. É a única coisa que não dá pra terceirizar</li>
        </ul>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #D262B2;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Kaleidos</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Estratégia, tese e calendário editorial aprovado</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Roteiro, copy, design e edição de tudo</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publicação nas três redes + prospecção de podcast</li>
          <li style="padding:7px 0;">Relatório mensal e reunião de leitura dos números</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin:44px 0;">
      <span style="display:inline-block;background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:12px;padding:14px 26px;font-weight:800;font-size:clamp(17px,2.2vw,22px);box-shadow:5px 5px 0 #D262B2;transform:rotate(-1deg);">~2 horas do seu tempo por mês. O resto é com a gente.</span>
    </div>
    <div class="mp-grid6" style="max-width:1000px;margin:0 auto;">
      <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#7CF067;">01</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#06250a;background:#7CF067;border-radius:999px;padding:3px 9px;">Instagram · principal</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Carrossel Instagram</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">A peça-mãe: autoridade e salvamento</div></div>
      <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#7CF067;">02</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#06250a;background:#7CF067;border-radius:999px;padding:3px 9px;">Instagram · principal</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Reels</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Aquisição e alcance de topo de funil</div></div>
      <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#7CF067;">03</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#06250a;background:#7CF067;border-radius:999px;padding:3px 9px;">Instagram · principal</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Stories com direção</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Bastidor diário que aquece a audiência</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">04</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">e ainda</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Post LinkedIn + thread no X</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Repurpose que reforça a autoridade B2B</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">05</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">e ainda</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Podcast como convidado</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Prospecção, agendamento e cortes</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">06</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">sempre</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Relatório mensal</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Leitura junto: dobrar no que cresce</div></div>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S6 · O MÉTODO (claro) ───────────────────────
   Header + stepper auto-rotativo (MetodoStepper, padrão how-it-works do
   teardown) + semana-tipo e princípios preservados do layout anterior. */
const METODO_TOP_HTML = `
    ${headHTML(
      "O método",
      'Motor de<br>Autoridade <span class="hl">Kaleidos</span>',
      "O guarda-chuva do sistema: Posicionar, Produzir, Converter. Três movimentos executados em quatro fases com horizonte definido. Marca pessoal sem método é sorte; com método, é sistema.",
      false
    )}
    <div style="text-align:center;margin-bottom:44px;">
      <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px;font-family:Gridlite,monospace;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#14110D;">
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #7CF067;">Posicionar</span><span style="color:#D262B2;font-weight:800;">&middot;</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #D262B2;">Produzir</span><span style="color:#D262B2;font-weight:800;">&middot;</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #7CF067;">Converter</span>
      </div>
      <div style="max-width:760px;margin:28px auto 0;background:#fff;border:1.5px solid #14110D;border-radius:14px;padding:18px 22px;box-shadow:4px 4px 0 #D262B2;">
        <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;margin-bottom:12px;">A escada de maturidade do founder: onde você está hoje?</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;font-size:13.5px;font-weight:700;color:#14110D;">
          <span style="border:1.5px solid #14110D;border-radius:999px;padding:7px 14px;background:#FAFAFA;color:#8a8175;text-decoration:line-through;text-decoration-color:#D262B2;text-decoration-thickness:2px;">Invisível</span><span style="color:#7CF067;">&rarr;</span>
          <span style="border:1.5px solid #14110D;border-radius:999px;padding:7px 14px;background:#FAFAFA;">Presente</span><span style="color:#7CF067;">&rarr;</span>
          <span style="border:1.5px solid #14110D;border-radius:999px;padding:7px 14px;background:#FAFAFA;">Referência</span><span style="color:#7CF067;">&rarr;</span>
          <span style="border:1.5px solid #14110D;border-radius:999px;padding:7px 14px;background:#7CF067;color:#06250a;">Autoridade</span>
        </div>
        <p style="font-size:13px;line-height:1.55;color:#6b6258;margin:12px 0 0;text-align:center;">O método existe pra te mover de degrau, com horizonte definido em cada fase (mês 1, mês 3, mês 6).</p>
      </div>
    </div>
`;

const METODO_EXTRA_HTML = `
    <div style="max-width:900px;margin:48px auto 0;background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:24px 26px;box-shadow:5px 5px 0 #7CF067;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:14px;">Semana-tipo de um founder Kaleidos</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">seg · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">ter · stories</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qua · carrossel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qui · stories + thread</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sex · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sáb · carrossel</span>
        <span style="background:#7CF067;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:700;color:#06250a;">1x/mês · podcast</span>
      </div>
    </div>
    <div class="mp-grid4" style="margin-top:32px;">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;box-shadow:4px 4px 0 #7CF067;"><div style="font-weight:800;font-size:15px;color:#14110D;">Bio com resultado</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Uma tese, não um cargo. Bandeira pessoal, não currículo.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;box-shadow:4px 4px 0 #D262B2;"><div style="font-weight:800;font-size:15px;color:#14110D;">Volume é rei</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Cadência alta e previsível vence perfeição esporádica.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;box-shadow:4px 4px 0 #7CF067;"><div style="font-weight:800;font-size:15px;color:#14110D;">Reels + carrosséis</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Reel adquire, carrossel constrói autoridade e salvamento.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;box-shadow:4px 4px 0 #D262B2;"><div style="font-weight:800;font-size:15px;color:#14110D;">Autenticidade real</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Bastidor, opinião e história. Nada de roteiro de robô.</div></div>
    </div>
`;

function MetodoSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#FAFAFA",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          paddingTop: 84,
          paddingBottom: 84,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: METODO_TOP_HTML }} />
        {/* ascii-scene (teardown/compute): torus em ASCII reagindo ao mouse.
            Assinatura "techy" barata que quebra o ritmo de cards. */}
        <div
          className="mp-torus-wrap"
          style={{
            maxWidth: 1000,
            margin: "0 auto 40px",
            background: "#14110D",
            border: "1.5px solid #14110D",
            borderRadius: 18,
            boxShadow: "6px 6px 0 #D262B2",
            padding: "28px 26px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#7CF067",
                marginBottom: 12,
              }}
            >
              O sistema, rodando
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(19px,2.2vw,26px)",
                lineHeight: 1.25,
                color: "#FAFAFA",
                margin: 0,
                letterSpacing: "-0.4px",
              }}
            >
              Uma engrenagem só: cada peça de conteúdo alimenta a próxima, mês
              após mês.
            </p>
            <p
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 1.5,
                color: "#9a9186",
                margin: "14px 0 0",
                textTransform: "lowercase",
              }}
            >
              mexe o mouse na engrenagem &rarr;
            </p>
          </div>
          <AsciiTorus width={54} height={26} />
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <MetodoStepper />
        </div>
        <div dangerouslySetInnerHTML={{ __html: METODO_EXTRA_HTML }} />
      </div>
    </section>
  );
}

/* ─────────────────────── S7 · PROVA / CASES (dark) ─────────────────────── */
// Métricas 100% de src/lib/case-data.ts:
// investidor-4-20: 5x faturamento, IG 50k→180k (+260%), YT 200k→382k (+91%), news 30k/35%.
// layla-foz: 100k→172k (+72%), 20M+ views nos reels.
// defiverso: 12M views orgânicos em 90 dias, +8,6k seguidores em 3 meses.
// neobankless: reel manifesto 112 curtidas + 20 comentários (maior engajamento do perfil).
// dsec: 2 artigos/semana no LinkedIn + newsletter semanal + mini-curso de 5 dias.
const CASES_HTML = `
<section id="cases-kaleidos" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "Nossos cases",
      'Antes e depois,<br><span class="hl">com número</span>.',
      "Agora sim, clientes da Kaleidos. Página de marca pessoal sem métrica é ironia: as nossas vêm dos cases publicados, com fonte interna auditável.",
      true
    )}
    <div class="mp-grid3">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="border:1.5px solid #3a332a;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px;">
          <div style="display:flex;justify-content:center;padding:5px 0;"><span style="width:44px;height:5px;border-radius:99px;background:#2a241d;display:inline-block;"></span></div>
          <img src="/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DZlGIGoRnew-capa.jpg" alt="Capa de reel publicado no perfil do Lucas Amendola" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Lucas Amendola · Investidor 4.20</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">50k &rarr; 180k <span style="font-size:16px;color:#9a9186;font-weight:400;">no Instagram</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">YouTube de 200k pra 382k inscritos. Newsletter construída do zero até 30 mil inscritos com 35% de abertura. E o número que importa: faturamento 5x maior desde a nossa entrada.</p>
        <a href="/cases/investidor-4-20" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="border:1.5px solid #3a332a;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px;">
          <div style="display:flex;justify-content:center;padding:5px 0;"><span style="width:44px;height:5px;border-radius:99px;background:#2a241d;display:inline-block;"></span></div>
          <img src="/Cases/layla-foz/conteudo/Capa_Reels4.webp" alt="Capa de reel publicado no perfil da Layla Foz" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Layla Foz · criadora</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">100k &rarr; 172k <span style="font-size:16px;color:#9a9186;font-weight:400;">seguidores</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">Mais de 20 milhões de views nos reels mantendo a profundidade intelectual do conteúdo. Crescimento de 72% na base sem descaracterizar a voz da criadora.</p>
        <a href="/cases/layla-foz" style="margin-top:16px;font-size:14px;font-weight:700;color:#D262B2;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="border:1.5px solid #3a332a;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px;">
          <div style="display:flex;justify-content:center;padding:5px 0;"><span style="width:44px;height:5px;border-radius:99px;background:#2a241d;display:inline-block;"></span></div>
          <img src="/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg" alt="Slide de carrossel publicado no Instagram do Defiverso" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Defiverso · audiência própria</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">12M views <span style="font-size:16px;color:#9a9186;font-weight:400;">orgânicos em 90 dias</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">8,6 mil novos seguidores em 3 meses no Instagram e newsletter com 26.554 assinantes ativos e 33% de taxa de abertura, muito acima da média de mercado.</p>
        <a href="/cases/defiverso" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
    </div>
    <div class="mp-grid2" style="margin-top:28px;max-width:1000px;margin-left:auto;margin-right:auto;">
      <div style="background:#1d1812;border:1.5px dashed #3a332a;border-radius:14px;padding:22px 24px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Em construção · Matheus Fassheber (NeoBankless)</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Operação founder-brand em curso: carrosséis educativos puxando o engajamento mais qualificado do perfil e o reel de manifesto como peça de maior engajamento (112 curtidas e 20 comentários numa base recém-criada). <a href="/cases/neobankless" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Ver case</a></p>
      </div>
      <div style="background:#1d1812;border:1.5px dashed #3a332a;border-radius:14px;padding:22px 24px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Em construção · Gui Campos + Léo Maximiliano (DSEC)</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Dois founders, dois pipelines: Gui (alcance, 17,8k na largada) no modo roteiro-completo e Léo (autoridade técnica) no modo yapping — tema + hook, ele grava, a gente repurposa. Por trás, a base institucional: 2 artigos/semana no LinkedIn, newsletter semanal e mini-curso de 5 dias. <a href="/cases/dsec" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Ver case</a></p>
      </div>
    </div>
  </div>
</section>
`;

/* ─────────── S7b · PROVA REAL NO INSTAGRAM — prints (claro) ─────────── */
// Screenshots reais de perfis PÚBLICOS de clientes da Kaleidos (dado público,
// capturado 2026-07). Números usados: SÓ o que os prints mostram (173 mil
// seguidores do Lucas, 17,3 mil do Defiverso, "+15 mil investidores formados").
// Narrativa: a marca pessoal do founder puxa a empresa. Coerente com "Nossos
// cases" (S7); NÃO confundir com "Referências de mercado" (S4c).
/* Seção INVERTIDA (teardown/compute: testimonials — clara no meio do dark +
   fundo ASCII sutil). Painel claro flutuando sobre campo ASCII escuro; quebra
   de ritmo forte. Conteúdo: founder (173k) puxa a empresa (17,3k). */
function PrintsInvertedSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#14110D",
        overflow: "hidden",
      }}
    >
      <AsciiField color="rgba(124,240,103,0.12)" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(90% 70% at 50% 50%, transparent 40%, #14110D 92%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
          paddingTop: 96,
          paddingBottom: 96,
        }}
      >
        <div
          style={{
            background: "#FAFAFA",
            border: "1.5px solid #14110D",
            borderRadius: 26,
            boxShadow: "10px 10px 0 #7CF067",
            padding: "clamp(24px,4vw,52px)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Eyebrow label="Prova · founder-led" color="#D262B2" />
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px,3.6vw,46px)",
                lineHeight: 1.06,
                letterSpacing: "-1.6px",
                margin: 0,
                color: "#14110D",
              }}
            >
              O founder puxa a empresa.{" "}
              <span
                style={{
                  background: "#7CF067",
                  color: "#14110D",
                  padding: ".06em .2em",
                  borderRadius: 7,
                }}
              >
                De verdade.
              </span>
            </h2>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "#6b6258",
                maxWidth: 560,
                margin: "18px auto 0",
              }}
            >
              A marca pessoal do Lucas Amendola, construída com a Kaleidos, é o
              motor de audiência que alimenta a empresa dele, o Defiverso. Print
              real, perfil público.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            <PrintCard
              step="1 · O founder"
              badge="173 mil seguidores"
              badgeFill
              shadow="#7CF067"
              rotate={-0.6}
              src="/marca-pessoal/prints/ig-lucas-amendola.png"
              alt="Print do perfil público @lucas.amendolaa no Instagram: 173 mil seguidores, verificado, bio Fundador do @defiverso"
              caption={
                <>
                  Perfil real, dado público.{" "}
                  <strong style={{ color: "#14110D" }}>
                    Lucas Amendola (@lucas.amendolaa)
                  </strong>
                  , fundador do Defiverso: 173 mil seguidores, verificado, e a
                  empresa na bio.
                </>
              }
            />
            <div style={{ textAlign: "center", padding: "18px 0" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#14110D",
                  color: "#FAFAFA",
                  border: "1.5px solid #14110D",
                  borderRadius: 999,
                  padding: "10px 20px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  boxShadow: "4px 4px 0 #D262B2",
                }}
              >
                a marca pessoal do founder{" "}
                <span style={{ color: "#7CF067", fontSize: 18, lineHeight: 1 }}>
                  &darr;
                </span>{" "}
                alimenta a empresa
              </span>
            </div>
            <PrintCard
              step="2 · A empresa dele"
              badge="+15 mil investidores formados"
              shadow="#D262B2"
              rotate={0.6}
              src="/marca-pessoal/prints/ig-defiverso.png"
              alt="Print do perfil público @defiverso no Instagram: 17,3 mil seguidores, bio +15 mil investidores formados"
              caption={
                <>
                  Perfil real, dado público.{" "}
                  <strong style={{ color: "#14110D" }}>
                    Defiverso (@defiverso)
                  </strong>
                  : 17,3 mil seguidores e mais de 15 mil investidores formados,
                  com o founder como principal canal de aquisição.
                </>
              }
            />
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#8a8175",
              margin: "32px auto 0",
              maxWidth: 600,
            }}
          >
            É isso que founder-led growth quer dizer: o rosto do founder
            concentra a audiência (173 mil) e distribui atenção pra marca (17,3
            mil e crescendo). Clientes da Kaleidos, prints de perfis públicos.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrintCard({
  step,
  badge,
  badgeFill,
  shadow,
  rotate,
  src,
  alt,
  caption,
}: {
  step: string;
  badge: string;
  badgeFill?: boolean;
  shadow: string;
  rotate: number;
  src: string;
  alt: string;
  caption: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #14110D",
        borderRadius: 18,
        padding: 20,
        boxShadow: `6px 6px 0 ${shadow}`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: "Gridlite, monospace",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8a8175",
          }}
        >
          {step}
        </div>
        <span
          style={{
            fontFamily: "Gridlite, monospace",
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: badgeFill ? "#06250a" : "#14110D",
            background: badgeFill ? "#7CF067" : "#fff",
            border: `1px solid ${badgeFill ? "#14110D" : "#D262B2"}`,
            borderRadius: 999,
            padding: "4px 11px",
          }}
        >
          {badge}
        </span>
      </div>
      <div
        style={{
          background: "#14110D",
          border: "1.5px solid #14110D",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "#6b6258",
          margin: "12px 0 0",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

/* ─────────────────────── S8 · COMPARATIVO (claro) ─────────────────────── */
const COMPARATIVO_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1000px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    ${headHTML(
      "Comparativo",
      'Genérica<br>vs <span class="hl">Kaleidos</span>.',
      "A diferença entre postar o que está na moda e operar um sistema de autoridade com tese, cadência e medição. Linha a linha.",
      false,
      true
    )}
    <div class="mp-table-wrap" style="background:#fff;border:1.5px solid #14110D;border-radius:16px;box-shadow:6px 6px 0 #7CF067;">
      <table class="mp-table">
        <thead>
          <tr>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;border-bottom:1.5px solid #14110D;width:26%;"> </th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;border-bottom:1.5px solid #14110D;">Agência genérica</th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#14110D;border-bottom:1.5px solid #14110D;background:#7CF06722;">Kaleidos</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;line-height:1.5;color:#4a443c;">
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Ponto de partida</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Posta o que está na moda</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Tese única do founder, definida antes do primeiro post</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Voz</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Genérica, de qualquer nicho</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Imersão na sua história: bastidor, opinião, bordão</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Cadência</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Quando dá, onde dá</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Um conteúdo vira três redes, em calendário aprovado</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Medição</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Posta e reza</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Relatório mensal, horizontes M1/M3/M6 e roadmap</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Produção</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Ou lenta, ou robótica</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">IA pra velocidade, humano pra substância</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;">Prova</td>
            <td style="padding:14px 20px;">Depoimento sem número</td>
            <td style="padding:14px 20px;background:#7CF06711;font-weight:600;">Cases com métrica e fonte, e o próprio founder como case</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S9 · OFERTA (dark) ─────────────────────── */
// Sem preço literal (decisão do paper): tiers por nome + call de qualificação.
const OFERTA_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "A oferta",
      'Um degrau pra<br>cada <span class="hl">estágio</span>.',
      "Sem tabela de preço na página, de propósito. Uma conversa de qualificação honesta primeiro, e o escopo certo pro seu momento depois.",
      true
    )}
    <div style="max-width:1080px;margin:0 auto 28px;background:#1d1812;border:1.5px dashed #7CF067;border-radius:18px;padding:26px 28px;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Comece por aqui · projeto pontual</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:24px;margin:10px 0 6px;color:#FAFAFA;">Diagnóstico de Posicionamento</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0;">Leitura completa dos seus perfis, tese preliminar e roadmap de marca pessoal. Projeto pontual, sem retainer: se você seguir pra operação, ele vira a Fundação do método. Se não seguir, o roadmap fica com você.</p>
      </div>
      <a href="${WA_DIAG}" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:transparent;color:#7CF067;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px;border:1.5px solid #7CF067;text-decoration:none;white-space:nowrap;">Pedir o diagnóstico &rarr;</a>
    </div>
    <div class="mp-grid3" style="max-width:1080px;margin:0 auto;align-items:stretch;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Porta de entrada</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Founder Start</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">Tese, auditoria dos perfis e produção das peças-mãe. Você publica, a gente produz e orienta.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Tese e bio-manifesto</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Carrosséis mensais no Instagram + repurpose X e LinkedIn</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Calendário editorial aprovado</li>
          <li style="padding:6px 0;">Publicação por sua conta</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Conversar sobre o Founder Start</a>
      </div>
      <div style="background:#1d1812;border:2px solid #7CF067;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;box-shadow:6px 6px 0 #7CF067;position:relative;">
        <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:999px;padding:5px 14px;font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">done-for-you</span>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">O carro-chefe</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Founder Growth</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">Instagram completo como palco principal, X e LinkedIn de apoio, com a Kaleidos operando tudo. Você entra com ~2 horas por mês.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Instagram completo (reels, carrosséis e stories) publicado e dirigido pela Kaleidos</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Repurpose em X e LinkedIn (autoridade B2B)</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">1 podcast como convidado por mês, com cortes</li>
          <li style="padding:6px 0;">Relatório mensal + reunião de leitura</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:#7CF067;color:#06250a;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 #D262B2;text-decoration:none;">Ver se faz sentido &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Por aplicação · multicanal</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Founder Authority</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">O sistema completo de autoridade multicanal pra quem já validou o jogo e quer escalar o ativo.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Tudo do Founder Growth</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Podcast recorrente + newsletter própria</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Ghostwriting de artigos longos e livro</li>
          <li style="padding:6px 0;">Gestão de crescimento com roadmap dedicado</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Aplicar para o Founder Authority</a>
      </div>
    </div>
    <div style="max-width:1080px;margin:28px auto 0;background:#1d1812;border:2px solid #D262B2;border-radius:18px;padding:28px 30px;box-shadow:6px 6px 0 #D262B2;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">O topo da escada · sob aplicação</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:10px 0 6px;color:#FAFAFA;">Enterprise · Multi-founder</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0;">Pra times de sócios que querem duas ou mais marcas pessoais rodando em coordenação, cada founder com a sua tese e o seu pipeline, sem canibalizar a narrativa da empresa. É o modelo que a gente opera com os dois founders da DSEC: dois perfis, dois modos de produção, uma base institucional por trás. Escopo desenhado por aplicação.</p>
      </div>
      <a href="/agendar" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#D262B2;color:#FAFAFA;font-weight:700;font-size:15px;padding:14px 26px;border-radius:999px;box-shadow:4px 4px 0 #7CF067;text-decoration:none;white-space:nowrap;">Aplicar como time &rarr;</a>
    </div>
    <div style="text-align:center;margin-top:36px;">
      <p style="font-size:14.5px;color:#9a9186;margin:0;">Retainers com contrato mínimo de 3 meses. Sem tabela na página de propósito: a conversa de qualificação define o escopo certo pro seu estágio. Se não fizer sentido, a gente fala.</p>
      <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:22px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:1.5px;text-transform:lowercase;color:#b8b1a6;">
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">post</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">carrossel</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">podcast</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">newsletter</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #7CF067;border-radius:999px;padding:7px 14px;background:#1d1812;color:#7CF067;">livro</span>
      </div>
      <p style="font-size:12.5px;color:#6b6258;margin:10px 0 0;">A escada do ativo de autoridade: cada degrau vira insumo do próximo.</p>
    </div>
  </div>
</section>
`;

/* ─────────── S8b · NA PRÁTICA, NO FEED (dark) — "see it in the wild" ───────────
   Galeria em marquee duplo (magicui/Marquee) com entregáveis REAIS publicados:
   slides de carrossel, posts e capas que a Kaleidos produziu pra clientes. */
const WILD_ROW_A: { src: string; alt: string }[] = [
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/neobankless/conteudo/instagram/post-cartao.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYM_0kqkXgl-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DOO62uUEvMu-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/neobankless/conteudo/instagram-novos/nbs-carrossel-anuncios-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram da NeoBankless" },
  { src: "/Cases/defiverso/conteudo/breaking-news-defiverso-1.png", alt: "Breaking news publicada no Instagram do Defiverso" },
];
const WILD_ROW_B: { src: string; alt: string }[] = [
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DZ7VRWKESte-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/neobankless/conteudo/instagram/post-iof.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/layla-foz/conteudo/Reels-3-Layla-1.webp", alt: "Capa de reel publicado no perfil da Layla Foz" },
  { src: "/Cases/defiverso/conteudo/posts-defiverso-1.png", alt: "Post publicado no Instagram do Defiverso" },
  { src: "/Cases/neobankless/conteudo/instagram/post-cashback.jpg", alt: "Post publicado no Instagram da NeoBankless" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTWArqxkhuK-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
];

function WildCard({ item }: { item: { src: string; alt: string } }) {
  return (
    <div
      style={{
        width: 210,
        borderRadius: 14,
        border: "1.5px solid #3a332a",
        overflow: "hidden",
        background: "#1d1812",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "4/5",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </div>
  );
}

function WildSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#14110D",
        color: "#FAFAFA",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage: "radial-gradient(#ffffff14 1.2px,transparent 1.4px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          paddingTop: 84,
          paddingBottom: 84,
        }}
      >
        <div className="mp-pad">
          <SectionHead
            dark
            eyebrowColor="#7CF067"
            eyebrow="Entregáveis reais"
            title={
              <>
                Na prática,<br /><span className="hl">no feed</span>.
              </>
            }
            lead="Carrosséis, posts e capas de reels que a Kaleidos produziu e que estão publicados nos perfis dos clientes agora. Passa o mouse pra pausar e olhar de perto."
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Marquee pauseOnHover repeat={3} className="[--duration:48s] [--gap:1.1rem] p-0">
            {WILD_ROW_A.map((item) => (
              <WildCard key={item.src} item={item} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse repeat={3} className="[--duration:56s] [--gap:1.1rem] p-0">
            {WILD_ROW_B.map((item) => (
              <WildCard key={item.src} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ─────────── S8c · QUALIFICADOR (claro) — "not for everyone" ───────────
   Padrão do estudo: "Não é pra todo mundo. Mas provavelmente é pra você."
   Split ✓/✗ sem número inventado; ICP founder/C-level. */
const QUALI_SIM = [
  "Você é founder ou C-level com expertise real e histórias pra contar",
  "Sua empresa vende por confiança: B2B, serviços, educação, cripto/fintech",
  "Você topa dar a cara e gravar (~2 horas por mês, dirigidas pela gente)",
  "Você pensa em horizonte de 6 meses, não em viral de 2 semanas",
];
const QUALI_NAO = [
  "Você quer viral da noite pro dia (isso é loteria, não método)",
  "Você não quer aparecer de jeito nenhum",
  "Você quer uma persona inventada que não é você",
  "Você quer terceirizar até a própria opinião",
];

function QualificadorSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#FAFAFA",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 1000,
          margin: "0 auto",
          paddingTop: 84,
          paddingBottom: 84,
        }}
      >
        <SectionHead
          eyebrow="Pra quem é"
          title={
            <>
              Não é pra<br />todo mundo. Mas{" "}
              <span className="hl">é pra você</span>.
            </>
          }
          lead="Marca pessoal de founder é alavanca, não vaidade. Só funciona pra quem tem tese real e topa aparecer. Veja de que lado da linha você está."
        />
        <div className="mp-grid2">
          <div
            style={{
              background: "#14110D",
              border: "1.5px solid #14110D",
              borderRadius: 18,
              padding: "28px 26px",
              boxShadow: "6px 6px 0 #7CF067",
            }}
          >
            <div
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#7CF067",
                marginBottom: 16,
              }}
            >
              É pra você se
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {QUALI_SIM.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "9px 0",
                    borderBottom: "1px solid #2a241d",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "#d8d1c6",
                  }}
                >
                  <span style={{ color: "#7CF067", fontWeight: 800, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #14110D",
              borderRadius: 18,
              padding: "28px 26px",
              boxShadow: "6px 6px 0 #D262B2",
            }}
          >
            <div
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#D262B2",
                marginBottom: 16,
              }}
            >
              Não é pra você se
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {QUALI_NAO.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "9px 0",
                    borderBottom: "1px solid #e8e2d8",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "#4a443c",
                  }}
                >
                  <span style={{ color: "#D262B2", fontWeight: 800, flexShrink: 0 }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#6b6258",
            margin: "32px auto 0",
            maxWidth: 520,
          }}
        >
          Se você se viu na coluna da esquerda, a conversa de qualificação é o
          próximo passo. Sem pitch ensaiado: a gente olha seu perfil junto e
          fala se faz sentido.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── S10 · FAQ (claro) ─────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Não tenho tempo pra isso.",
    a: "Por isso o modelo existe. Você entra com cerca de 2 horas por mês: gravação dirigida em bloco e uma reunião de leitura. Estratégia, roteiro, design, edição, publicação e relatório são da Kaleidos.",
  },
  {
    q: "Não quero parecer autopromocional.",
    a: "Autoridade não é falar de si, é falar do que você sabe. A tese define pilares de conteúdo úteis pro seu mercado: educação, bastidor e opinião. Quem vende o tempo todo afasta; quem ensina, atrai.",
  },
  {
    q: "Não sei o que postar.",
    a: "Você não precisa saber. A fase de Fundação extrai da sua história a tese e os pilares ponderados, e o calendário editorial chega pronto pra sua aprovação todo mês. Sua parte é aprovar e gravar.",
  },
  {
    q: "Vai soar como robô escrevendo por mim?",
    a: "Não. Usamos IA pra velocidade de produção, mas a voz vem de imersão real: entrevistas com você, seu vocabulário, suas histórias. Se não parecer você lendo em voz alta, a peça volta pra mesa.",
  },
  {
    q: "Quanto tempo até dar resultado?",
    a: "Trabalhamos com horizontes claros: mês 1 é fundação (tese, perfis, primeiras publicações), mês 3 é tração (engajamento acima de 3% e primeiros leads via perfil) e mês 6 é autoridade (convites orgânicos, podcasts e pipeline atribuível). Quem promete viral em 2 semanas está vendendo loteria.",
  },
];

const FAQ_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:820px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    ${headHTML(
      "FAQ",
      'As objeções.<br><span class="hl">Respondidas</span>.',
      "Tudo que todo founder pensa antes de dar a cara: tempo, autopromoção, o que postar, soar robô e prazo de resultado.",
      false,
      true
    )}
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${FAQ_ITEMS.map(
        (f) => `
      <details class="mp-faq" style="background:#fff;border:1.5px solid #14110D;border-radius:14px;box-shadow:4px 4px 0 #7CF067;">
        <summary style="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 22px;font-weight:700;font-size:16px;color:#14110D;">
          <span>${f.q}</span>
          <span class="mp-faq-plus" style="font-family:Atelier,sans-serif;font-size:22px;line-height:1;color:#D262B2;flex-shrink:0;">+</span>
        </summary>
        <p style="padding:0 22px 20px;font-size:15px;line-height:1.65;color:#4a443c;margin:0;">${f.a}</p>
      </details>`
      ).join("")}
    </div>
  </div>
</section>
`;

/* ─────────────────────── S11 · CTA FINAL (dark) ─────────────────────── */
const CTA_FINAL_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:6%;top:20%;width:clamp(48px,6vw,80px);animation:starspin 26s linear infinite;opacity:.85;pointer-events:none;">
  <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:7%;bottom:18%;width:clamp(40px,5vw,64px);animation:starspin2 20s linear infinite;opacity:.8;pointer-events:none;">
  <div class="mp-pad" style="position:relative;max-width:840px;margin:0 auto;padding-top:96px;padding-bottom:96px;text-align:center;">
    <h2 style="font-family:'Inter',sans-serif;font-weight:800;font-size:clamp(28px,3.6vw,48px);line-height:1.08;letter-spacing:-1.4px;margin:0;">Sua expertise vira autoridade.<br>Sua autoridade vira <span style="${HL}color:#14110D;">pipeline</span>.</h2>
    <p style="font-size:17px;line-height:1.6;color:#b8b1a6;max-width:540px;margin:22px auto 0;">O mercado vai pesquisar seu nome de novo amanhã. A pergunta é o que ele vai encontrar daqui a 6 meses.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;align-items:center;margin-top:36px;">
      <a href="/agendar" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:17px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">Ver se faz sentido &rarr;</a>
      <a href="${WA_AUDIT}" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:transparent;color:#FAFAFA;font-weight:700;font-size:16px;padding:15px 26px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Auditar meu perfil de graça</a>
    </div>
    <p style="margin-top:16px;font-size:14px;color:#9a9186;">Prefere WhatsApp? <a href="https://wa.me/5512997796835" target="_blank" rel="noopener noreferrer" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Fala com a gente por aqui &rarr;</a></p>
  </div>
</section>
`;

export default function MarcaPessoalPage() {
  const faqSchema = generateFAQSchema(
    FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Kaleidos", href: "/" },
    { label: "Marca Pessoal para Founders", href: CANONICAL },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main id="main-content" className="kv2 min-h-screen bg-white" role="main">
        {/* defs (SVG symbols) + keyframes/CSS escopado do estilo web3v2 */}
        <Web3V2Defs />
        <style dangerouslySetInnerHTML={{ __html: MP_STYLE }} />

        {/* S1 · Hero "parede de prova" (conteúdo real + print real) */}
        <HeroSection />

        {/* Marquee de logos de clientes (prova social imediata) */}
        <Web3V2ClientsMarquee />

        {/* S2 · Prova agregada + congruência (NumberTicker) */}
        <Reveal>
          <StatsSection />
        </Reveal>

        {/* S3 · Problema + timeline de dores */}
        <Reveal>
          <ProblemaSection />
        </Reveal>

        {/* S4 · Os dados (com fonte, count-up) */}
        <Reveal>
          <DadosSection />
        </Reveal>

        {/* S4b · Mais dados de mercado (Edelman 2025, acadêmico, Nielsen…) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: MERCADO_HTML }} />
        </Reveal>

        {/* S4c · Cases famosos — referências de mercado, NÃO clientes */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAMOSOS_HTML }} />
        </Reveal>

        {/* S5 · O que fazemos */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAZEMOS_HTML }} />
        </Reveal>

        {/* S6 · O método (stepper auto-rotativo) */}
        <Reveal>
          <MetodoSection />
        </Reveal>

        {/* S7 · Prova / cases (métricas de case-data.ts, device com conteúdo real) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: CASES_HTML }} />
        </Reveal>

        {/* S7b · Seção INVERTIDA (clara no dark + ASCII): founder puxa a empresa */}
        <Reveal>
          <PrintsInvertedSection />
        </Reveal>

        {/* S8b · Na prática, no feed — galeria marquee de entregáveis reais */}
        <Reveal>
          <WildSection />
        </Reveal>

        {/* S8 · Comparativo */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: COMPARATIVO_HTML }} />
        </Reveal>

        {/* S8c · Qualificador — não é pra todo mundo */}
        <Reveal>
          <QualificadorSection />
        </Reveal>

        {/* S9 · Oferta */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: OFERTA_HTML }} />
        </Reveal>

        {/* S10 · FAQ */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAQ_HTML }} />
        </Reveal>

        {/* S11 · CTA final */}
        <div dangerouslySetInnerHTML={{ __html: CTA_FINAL_HTML }} />

        {/* Footer (WhatsApp flutuante já vem do layout raiz) */}
        <Reveal>
          <FooterDemo />
        </Reveal>
      </main>
    </>
  );
}
