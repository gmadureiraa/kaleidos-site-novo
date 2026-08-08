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
 * - Voz institucional "a Kaleidos", PT-BR, sem travessão no corpo.
 *
 * ⚠️ MUDANÇA DE POLÍTICA (08/2026): a regra antiga era "sem preço literal na
 * página (tiers por nome + call de qualificação)". Ela foi REVERTIDA: preço
 * público qualifica o lead antes da call. Os valores vêm da decisão registrada
 * de 2026-07-24 (vault/015 - BRANDING E GROWTH/marca-pessoal-founders/
 * PLANO-EXECUCAO-marca-pessoal-founders-2026-07-24.md §2.1-2.4). Ver o bloco
 * de comentário sobre OFERTA_HTML antes de alterar qualquer número.
 *
 * ⚠️ HIERARQUIA DE CTA: uma ação primária (/agendar, rótulo CTA_PRIMARY) e uma
 * secundária (auditoria no WhatsApp). Não introduzir um terceiro rótulo.
 */

const CANONICAL = "/marca-pessoal";
const TITLE = "Marca Pessoal para Founders | Founder-Led Growth — Kaleidos";
const DESC =
  "Founder-Led Growth para founders de cripto, web3 e fintech. A Kaleidos transforma a expertise do founder em autoridade, e autoridade em pipeline. Planos a partir de R$ 5.000/mês em Instagram e TikTok, mais uma oferta separada de LinkedIn B2B para empresas: você grava, a gente faz o resto.";

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

/* ── HIERARQUIA DE CTA (revisão 2026-08) ─────────────────────────────────────
   A página tinha 5 rótulos de CTA competindo ("Conversar sobre o Founder
   Start", "Quero a auditoria gratuita", "Pedir o diagnóstico", "Aplicar
   para o Founder Authority", "Aplicar como time"), cada um com destino
   diferente. Atenção dividida = ninguém clica.

   Agora existe UMA ação primária e UMA secundária, repetidas:
   · PRIMÁRIA   → /agendar, sempre com o rótulo CTA_PRIMARY. Todo card de
                  plano aponta pra cá (com ?plano= só pra contexto interno).
   · SECUNDÁRIA → auditoria gratuita no WhatsApp, sempre visualmente mais
                  discreta (outline no hero/CTA final, link de texto no resto).
   Nenhum outro rótulo de CTA deve ser introduzido nesta página. */
const CTA_PRIMARY = "Ver se faz sentido &rarr;";
const CTA_PRIMARY_JSX = "Ver se faz sentido →";
const AGENDAR = "/agendar";

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
   Nada aqui é mockup: são capas de reels e slides de carrossel entregues.

   ⚠️ Só entra peça de proporção vertical (4:5 a 9:16). O .mp-wall-card usa
   width:162px + height:auto, sem crop: uma peça 16:9 vira um card de ~91px de
   altura no meio de cards de ~288px e destoa. Por isso ficaram DE FORA as 3
   thumbs de YouTube da DSEC e as 2 peças de LinkedIn 16:9 (dsec-li-drex,
   dsec-li-stablecoins), todas publicadas de verdade mas na proporção errada. ── */
const WALL_COL_A: { src: string; alt: string }[] = [
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DaBYpV9xK7S-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola (Investidor 4.20)" },
  { src: "/Cases/dsec/conteudo/linkedin/dsec-li-etfs.jpg", alt: "Peça publicada no LinkedIn da DSEC sobre ETFs de Bitcoin" },
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
  { src: "/Cases/dsec/conteudo/linkedin/dsec-li-rastreio.jpg", alt: "Peça publicada no LinkedIn da DSEC sobre rastreio de transações entre corretora e carteira" },
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
                href={AGENDAR}
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
                {CTA_PRIMARY_JSX}
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
            {/* Preço-âncora no hero: qualifica o lead antes do clique, em vez
                de empurrar a descoberta do valor pra dentro da call. Valor da
                decisão registrada 2026-07-24 (ver comentário em OFERTA_HTML). */}
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "#d8d1c6",
                margin: "22px 0 0",
              }}
            >
              Planos a partir de{" "}
              <strong style={{ color: "#FAFAFA" }}>R$ 5.000/mês</strong>, com
              preço e escopo abertos{" "}
              <a
                href="#oferta"
                style={{
                  color: "#7CF067",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                aqui na página
              </a>
              .
            </p>
            {/* Ponte pra segunda oferta. A página inteira fala de pessoa
                física no Instagram; quem chega procurando canal de demanda
                B2B precisa ser desviado logo, não no rodapé. */}
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "#b8b1a6",
                margin: "10px 0 0",
              }}
            >
              É uma empresa B2B e o canal é o LinkedIn?{" "}
              <a
                href="#linkedin-b2b"
                style={{
                  color: "#D262B2",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Tem uma oferta separada pra isso →
              </a>
            </p>
            <p
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#9a9186",
                margin: "20px 0 0",
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

/* ─────────────────────── S4 · PROVA DE MERCADO (claro) ───────────────────────
   ⚠️ A ÚNICA seção de números de mercado da página (decisão do Gabriel,
   08/2026: "só uma seção com números para provar o mercado"). As seções
   "Mais dados de mercado" e "Referências de mercado" (Trajano, Nubank,
   Spanx, Bumble, Cimed…) foram REMOVIDAS junto com a de prova agregada.
   Se surgir stat novo, ele entra AQUI no lugar de um dos quatro, nunca
   como card a mais nem como seção nova.

   Todos os quatro números vêm do paper 2026-07-24 e do doc ENRIQUECIMENTO
   (vault/015 - BRANDING E GROWTH/marca-pessoal-founders), com fonte visível. */
const DADOS_CARDS: {
  value: number;
  suffix: string;
  decimals?: number;
  texto: string;
  fonte: string;
  shadow: string;
}[] = [
  {
    value: 65,
    suffix: "%",
    texto:
      "do feed do LinkedIn vai para perfis pessoais. Páginas de empresa ficam com cerca de 5%. Pessoa ganha de logo, por goleada.",
    fonte: "Digital Applied (compilação de agência, 2026)",
    shadow: "#7CF067",
  },
  {
    value: 2.75,
    suffix: "x",
    decimals: 2,
    texto:
      "mais impressões no perfil pessoal do que na página da empresa, publicando o mesmo conteúdo.",
    fonte: "Refine Labs (experimento de agência)",
    shadow: "#D262B2",
  },
  {
    value: 73,
    suffix: "%",
    texto:
      "dos decisores B2B dizem que thought leadership é base mais confiável pra avaliar um fornecedor do que material de marketing.",
    fonte: "Edelman-LinkedIn (2024)",
    shadow: "#7CF067",
  },
  {
    value: 95,
    suffix: "%",
    texto:
      "dos decisores invisíveis do comitê de compra B2B ficam mais receptivos a uma abordagem comercial quando o fornecedor publica thought leadership forte.",
    fonte: "Edelman-LinkedIn B2B Thought Leadership Report (2025)",
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
          eyebrow="O mercado, em números"
          title={
            <>
              Quatro números.<br />E{" "}
              <span className="hl">chega de número</span>.
            </>
          }
          lead="A prova de que o mercado existe cabe aqui: pessoa ganha de página, e quem decide a compra confia em quem publica. O resto desta página não é estatística, é o que a gente entrega."
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

/* ── S3b · O que é Founder-Led Growth ─────────────────────────────────────
   Pedido do Gabriel (28/07): a página vendia o serviço sem nunca nomear a
   categoria. Esta seção define o termo, separa do que ele NÃO é, e mostra os
   três mecanismos pelos quais o perfil do founder vira pipeline. Fundo escuro
   entre duas seções claras (Problema #14110D → esta → Dados #FAFAFA): ver a
   ordem de composição no <main>. */
const FOUNDER_LED_HTML = `
<section id="founder-led-growth" style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "Founder-Led Growth",
      'A empresa vende.<br>Quem convence é <span class="hl">o founder</span>.',
      "Founder-Led Growth é usar a voz de quem construiu a empresa como canal de aquisição. Não é o founder virar influenciador: é a companhia parar de terceirizar a explicação do próprio produto para um anúncio.",
      false
    )}

    <div class="mp-grid3" style="margin-top:44px;">
      <div style="background:#fff;border:1.5px solid #e6e0d6;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #14110D;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.4px;color:#6b6258;text-transform:uppercase;">01 · Distribuição</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:800;font-size:21px;line-height:1.2;color:#14110D;margin:10px 0 0;">Um rosto passa onde uma logo trava</h3>
        <p style="font-size:14.5px;line-height:1.6;color:#4a443c;margin:12px 0 0;flex:1;">Perfil de pessoa entrega organicamente para não seguidores. Perfil de marca precisa comprar quase toda a entrega. A mesma peça, publicada nos dois, não custa o mesmo.</p>
      </div>
      <div style="background:#fff;border:1.5px solid #e6e0d6;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.4px;color:#6b6258;text-transform:uppercase;">02 · Confiança</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:800;font-size:21px;line-height:1.2;color:#14110D;margin:10px 0 0;">Quem decide compra de gente</h3>
        <p style="font-size:14.5px;line-height:1.6;color:#4a443c;margin:12px 0 0;flex:1;">No B2B a decisão passa por um comitê que você não vê. Esse comitê pesquisa o fundador antes da reunião. O que ele encontra ali é parte da proposta, mesmo que ninguém diga isso em voz alta.</p>
      </div>
      <div style="background:#fff;border:1.5px solid #e6e0d6;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.4px;color:#6b6258;text-transform:uppercase;">03 · Custo</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:800;font-size:21px;line-height:1.2;color:#14110D;margin:10px 0 0;">Audiência é ativo, mídia é aluguel</h3>
        <p style="font-size:14.5px;line-height:1.6;color:#4a443c;margin:12px 0 0;flex:1;">Você para de pagar mídia e o pipeline para junto. Uma base construída no perfil do founder continua rendendo depois que a verba acaba, e não sobe de preço a cada leilão.</p>
      </div>
    </div>

    <div style="margin-top:40px;display:grid;gap:18px;grid-template-columns:1fr;">
      <div style="background:#14110D;border-radius:16px;padding:30px 26px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.4px;color:#7CF067;text-transform:uppercase;margin-bottom:14px;">O que Founder-Led Growth NÃO é</div>
        <div class="mp-grid3">
          <p style="font-size:14.5px;line-height:1.6;color:#d8d1c6;margin:0;"><strong style="color:#FAFAFA;">Não é virar influenciador.</strong> Ninguém precisa dançar, opinar sobre tudo, nem postar todo dia. Precisa aparecer com constância no assunto em que já é bom.</p>
          <p style="font-size:14.5px;line-height:1.6;color:#d8d1c6;margin:0;"><strong style="color:#FAFAFA;">Não é exposição pessoal.</strong> O que vai pro feed é o que você aprendeu construindo, não a sua vida. A linha entre bastidor e intimidade é definida por você, no começo.</p>
          <p style="font-size:14.5px;line-height:1.6;color:#d8d1c6;margin:0;"><strong style="color:#FAFAFA;">Não é substituir o marketing.</strong> É a camada que faz o resto funcionar melhor: o anúncio converte mais quando quem assina já é conhecido.</p>
        </div>
      </div>
    </div>

    <p style="font-size:15px;line-height:1.65;color:#4a443c;margin:32px 0 0;max-width:760px;">
      Na prática, o trabalho da Kaleidos é tirar isso do campo da intenção. O founder entra com o que só ele tem, que é o repertório de quem está construindo. A gente entra com o resto: pauta, roteiro, edição, design, cadência e distribuição. <strong style="color:#14110D;">A parte que só você faz cabe em dois blocos de 30 minutos por semana.</strong>
    </p>
  </div>
</section>`;

/* ─────────────────────── S5 · O QUE FAZEMOS (dark) ─────────────────────── */
const FAZEMOS_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "O que fazemos",
      'Você grava.<br>A gente faz <span class="hl">o resto</span>.',
      'O palco principal é o <strong style="color:#7CF067;">Instagram</strong>, com o mesmo conteúdo saindo também no TikTok: reels e carrosséis, onde o alcance acontece. A Kaleidos dirige, escreve, desenha, edita, publica e mede. Se o LinkedIn for o canal principal e quem contrata for a empresa, existe uma oferta separada pra isso nesta página.',
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
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publicação e agendamento em Instagram e TikTok</li>
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
      <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#7CF067;">03</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#06250a;background:#7CF067;border-radius:999px;padding:3px 9px;">Instagram + TikTok</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Postagem e agendamento</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">A mesma peça publicada nas duas redes</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">04</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">no Escala</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Engajamento: DM e comentários</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">O perfil que conversa, não só publica</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">05</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">Completo e Escala</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Estratégia</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Tese, pilares e calendário revisados todo mês</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Gridlite,monospace;font-size:13px;letter-spacing:1px;color:#D262B2;">06</div><span style="font-family:Gridlite,monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#D262B2;border:1px solid #D262B2;border-radius:999px;padding:3px 9px;">sempre</span></div><div style="font-weight:700;font-size:15px;margin-top:12px;">Relatório mensal</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Leitura junto: dobrar no que cresce</div></div>
    </div>
  </div>
</section>
`;

/* ────────────── S5b · O QUE VOCÊ RECEBE (claro) — entregas nomeadas ──────────────
   Lacuna apontada pelo Gabriel (08/2026): a página explicava muito bem POR QUE
   founder-led funciona e QUEM faz o quê, mas nunca dizia o que, concretamente,
   chega na mão do cliente. "Estratégia e produção" é abstração; "roteiro de
   reel com direção de gravação" é entrega.

   ⚠️ REGRA DE DADO: os artefatos abaixo são os que a página já descreve em
   outras seções (método, semana-tipo, o que fazemos). NENHUM volume mensal foi
   inventado. A faixa de cadência usa a semana-tipo que já estava publicada
   nesta mesma página e está rotulada como REFERÊNCIA, não contrato: o volume
   fechado sai na proposta. Não transformar isso em promessa numérica sem o
   Gabriel confirmar. */
const ENTREGAS = [
  {
    n: "01",
    grupo: "Estratégia",
    cor: "#7CF067",
    itens: [
      "Tese de posicionamento escrita (o que você defende, e contra o quê)",
      "Bio-manifesto dos 3 perfis, reescrita e implementada",
      "Pilares de conteúdo ponderados, com peso por objetivo",
      "Auditoria dos perfis: o que fica, o que sai, o que refaz",
    ],
  },
  {
    n: "02",
    grupo: "Planejamento",
    cor: "#D262B2",
    itens: [
      "Calendário editorial do mês, entregue pra sua aprovação antes de produzir",
      "Pauta e ângulo de cada peça, já amarrados na tese",
      "Roteiro de reel com direção de gravação (o que falar, como, em que ordem)",
      "Lista de stories dirigidos pra semana",
    ],
  },
  {
    n: "03",
    grupo: "Produção",
    cor: "#7CF067",
    itens: [
      "Carrossel de Instagram desenhado na sua identidade",
      "Edição dos reels: corte, legenda, capa e trilha",
      "Copy da legenda e do CTA de cada peça",
      "Corte vertical da mesma peça pro TikTok, sem produção dobrada",
    ],
  },
  {
    n: "04",
    grupo: "Distribuição e leitura",
    cor: "#D262B2",
    itens: [
      "Publicação e agendamento em Instagram e TikTok",
      "Prospecção, agendamento e cortes de podcast como convidado (projeto à parte)",
      "Relatório mensal com o que cresceu, o que travou e o que muda",
      "Reunião de leitura dos números com a gente",
    ],
  },
];

const ENTREGAS_HTML = `
<section id="entregas" style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "O que você recebe",
      'Entregas com nome,<br>não <span class="hl">promessa</span>.',
      "Toda agência diz que faz “estratégia e produção”. Isso não é entrega, é categoria. Abaixo está o que efetivamente chega na sua mão, item por item, do primeiro mês em diante.",
      false
    )}
    <div class="mp-grid4">
      ${ENTREGAS.map(
        (g) => `
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:24px 22px;box-shadow:5px 5px 0 ${g.cor};display:flex;flex-direction:column;">
        <div style="display:flex;align-items:baseline;gap:10px;">
          <span style="font-family:Atelier,sans-serif;font-weight:800;font-size:26px;line-height:1;color:${g.cor};-webkit-text-stroke:1.2px #14110D;">${g.n}</span>
          <span style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">${g.grupo}</span>
        </div>
        <ul style="list-style:none;margin:16px 0 0;padding:0;font-size:13.5px;line-height:1.55;color:#4a443c;flex:1;">
          ${g.itens
            .map(
              (i, idx) =>
                `<li style="display:flex;gap:9px;padding:8px 0;${
                  idx === g.itens.length - 1
                    ? ""
                    : "border-bottom:1px solid #efe9df;"
                }"><span style="color:${g.cor};font-weight:800;flex-shrink:0;-webkit-text-stroke:.6px #14110D;">&#10003;</span><span>${i}</span></li>`
            )
            .join("")}
        </ul>
      </div>`
      ).join("")}
    </div>

    <div style="max-width:1000px;margin:36px auto 0;background:#14110D;border-radius:18px;padding:28px 30px;box-shadow:6px 6px 0 #D262B2;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#7CF067;margin-bottom:6px;">E em volume</div>
      <p style="font-size:15px;line-height:1.6;color:#d8d1c6;margin:0 0 20px;max-width:660px;">Os artefatos acima são os mesmos nos três planos. O que muda é o volume mensal e o quanto da operação fica com a gente.</p>
      <div class="mp-grid3">
        <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px 20px;"><div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;">12</div><div style="font-size:13px;color:#b8b1a6;margin-top:6px;">peças por mês na <strong style="color:#FAFAFA;">Entrada</strong>: 6 reels + 6 carrosséis, publicados em Instagram e TikTok.</div></div>
        <div style="background:#1d1812;border:1.5px solid #7CF067;border-radius:12px;padding:18px 20px;"><div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;">20</div><div style="font-size:13px;color:#b8b1a6;margin-top:6px;">peças por mês no <strong style="color:#FAFAFA;">Completo Autoridade</strong>: 12 reels (o dobro da Entrada) + 8 carrosséis, com estratégia.</div></div>
        <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px 20px;"><div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;">40</div><div style="font-size:13px;color:#b8b1a6;margin-top:6px;">peças por mês no <strong style="color:#FAFAFA;">Escala</strong>: 20 reels + 20 carrosséis, cerca de um de cada por dia útil, com engajamento incluso.</div></div>
      </div>
      <p style="font-size:12.5px;line-height:1.55;color:#8a8175;margin:18px 0 0;">Volume e preço de cada plano estão abertos <a href="#oferta" style="color:#7CF067;font-weight:700;text-decoration:underline;text-underline-offset:3px;">na seção da oferta</a>.</p>
    </div>

    <div style="text-align:center;margin-top:36px;">
      <a href="${AGENDAR}" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:16px;padding:15px 28px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
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
        <span style="background:#FAFAFA;border:1.5px dashed #D262B2;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#6b6258;">ter · stories · no Escala</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qua · carrossel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qui · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sex · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sáb · carrossel</span>
      </div>
      <p style="font-size:12.5px;line-height:1.55;color:#8a8175;margin:16px 0 0;">Esse é o ritmo do <strong style="color:#14110D;">Completo Autoridade</strong>: cerca de 3 reels e 2 carrosséis por semana, publicados em Instagram e TikTok. Na Entrada a semana é mais enxuta; no Escala é praticamente um reel e um carrossel por dia útil. <a href="#oferta" style="color:#14110D;font-weight:700;text-decoration:underline;text-underline-offset:3px;">O volume de cada plano está aberto na oferta</a>.</p>
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
// investidor-4-20: 10x faturamento em 12 meses, IG 50k→180k (+260%), YT 200k→382k (+91%), news 30k/35%.
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
      "Clientes da Kaleidos, com métrica dos cases publicados e fonte interna auditável. E a congruência: o fundador da Kaleidos, Gabriel Madureira (@ogmadureira), aplica em si mesmo o método que vende aqui.",
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
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">YouTube de 200k pra 382k inscritos. Newsletter construída do zero até 30 mil inscritos com 35% de abertura. E o número que importa: faturamento 10x maior em 12 meses.</p>
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
// cases" (S7). São métricas NOSSAS (prints públicos), não stats de mercado.
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
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Um conteúdo rende em mais de uma rede, em calendário aprovado</td>
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

/* ────────── S8d · PROCESSO DE ENTRADA (claro) — do contato ao primeiro post ──────────
   Lacuna apontada pelo Gabriel (08/2026): a página tinha "O método" (o que
   acontece DEPOIS de fechar, em horizonte de meses), mas nada dizia como é
   entrar. Isso deixava a decisão de clicar no CTA sem forma. Esta seção é o
   caminho comercial, passo a passo, até a primeira publicação.

   ⚠️ De propósito NÃO existe promessa de prazo em dias aqui ("primeiros
   conteúdos em 7 dias" e afins). Não há prazo de onboarding registrado que
   sustente o número. Se o Gabriel confirmar um SLA real, o lugar dele é no
   passo 04. */
const PROCESSO = [
  {
    n: "01",
    titulo: "Conversa de qualificação",
    tempo: "30 minutos",
    cor: "#7CF067",
    texto:
      "A gente abre seus perfis junto com você e fala o que está travando. Se o seu momento não pedir marca pessoal agora, a gente diz isso na call, não depois do contrato.",
  },
  {
    n: "02",
    titulo: "Proposta com escopo fechado",
    tempo: "por escrito",
    cor: "#D262B2",
    texto:
      "Plano, volume mensal de peças, redes cobertas, investimento e o que fica com você. Sem escopo aberto e sem custo que aparece no meio do caminho.",
  },
  {
    n: "03",
    titulo: "Setup e imersão",
    tempo: "início do contrato",
    cor: "#7CF067",
    texto:
      "Entrevistas de voz com você, definição da tese, bio-manifesto e auditoria dos perfis. Vem incluso no plano, sem taxa de setup à parte, e é o que impede o conteúdo de sair genérico depois.",
  },
  {
    n: "04",
    titulo: "Calendário aprovado e primeira gravação",
    tempo: "mês 1",
    cor: "#D262B2",
    texto:
      "O calendário editorial chega pronto pra sua aprovação antes de qualquer produção. Aprovou, a gente dirige a gravação em bloco. Nada é publicado sem passar por você.",
  },
  {
    n: "05",
    titulo: "Ciclo rodando e leitura dos números",
    tempo: "toda semana · relatório mensal",
    cor: "#7CF067",
    texto:
      "Produção, publicação e distribuição entram em ritmo. Todo mês tem relatório e uma reunião de leitura pra decidir onde dobrar e o que cortar.",
  },
];

const PROCESSO_HTML = `
<section id="como-comeca" style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1100px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    ${headHTML(
      "Como começa",
      'Do primeiro contato<br>ao primeiro <span class="hl">post</span>.',
      "Cinco passos, sem etapa escondida. Você sabe exatamente o que acontece depois de clicar no botão, e onde é o seu ponto de aprovação.",
      false,
      true
    )}
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${PROCESSO.map(
        (p) => `
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 24px;box-shadow:5px 5px 0 ${p.cor};display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:start;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(30px,4vw,44px);line-height:1;color:${p.cor};-webkit-text-stroke:1.5px #14110D;">${p.n}</div>
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(18px,2.2vw,23px);color:#14110D;margin:0;">${p.titulo}</h3>
            <span style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#14110D;border:1.5px solid #14110D;border-radius:999px;padding:4px 11px;background:${p.cor};white-space:nowrap;">${p.tempo}</span>
          </div>
          <p style="font-size:14.5px;line-height:1.6;color:#4a443c;margin:9px 0 0;">${p.texto}</p>
        </div>
      </div>`
      ).join("")}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="${AGENDAR}" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:16px;padding:15px 28px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
      <p style="font-size:13.5px;color:#6b6258;margin:14px 0 0;">Começa no passo 01. A call é de qualificação, não de venda.</p>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S9 · OFERTA (dark) ───────────────────────
   ⚠️⚠️ PREÇO PÚBLICO — LER ANTES DE MEXER ⚠️⚠️

   HISTÓRICO
   · até 07/2026: sem preço nenhum na página ("sem tabela de propósito").
   · 07-08/2026: régua da decisão de 24/07 (R$4.900 / R$7.000 / R$12.900+,
     nomes Founder Start / Growth / Authority, setup one-time à parte).
   · 06/08/2026: pacotes da proposta do Matheus Fassheber (R$3.600 / R$7.000
     + adicionais de R$1.000).
   · 08/08/2026: RÉGUA ATUAL, decisão do Gabriel. O Essencial de R$3.600
     DEIXA DE EXISTIR e os adicionais de R$1.000 (Engajamento e LinkedIn)
     SAEM da oferta. Três degraus, nada de extra pra escolher.

   RÉGUA VIGENTE (não alterar sem decisão equivalente do Gabriel):
   · Entrada ................... R$ 5.000/mês
     6 reels + 6 carrosséis · postagem e agendamento · relatório mensal.
   · Completo Autoridade ....... R$ 7.000/mês  (mais escolhido · destacado)
     12 reels + 8 carrosséis · postagem e agendamento · estratégia +
     relatório mensal.
   · Escala .................... R$ 12.900/mês
     20 reels + 20 carrosséis (~1 de cada por dia útil) · engajamento
     incluído (DM e comentários) · estratégia + relatório.
   · Contrato mínimo 6 meses. Setup, edição de vídeo, design e publicação
     INCLUSOS nos três planos.
   · Podcast = projeto à parte, sem preço público.

   🎯 INTENÇÃO COMERCIAL (Gabriel, 08/08/2026) — NÃO DILUIR:
   a Entrada de R$5.000 existe pra fazer o Completo de R$7.000 parecer
   compensar. A apresentação PRECISA deixar o salto explícito: +40% no preço
   DOBRA a produção de reels (6 → 12). Isso é o argumento, não um detalhe a
   esconder. O card do Completo continua sendo o destacado.

   ⚠️ DIVERGÊNCIAS ABERTAS (pendentes de decisão do Gabriel):
   1. src/lib/pricing.ts é a planilha mestra e está sendo revisada à parte.
      Enquanto ela não bate com esta régua, ESTA seção manda pro que é
      público. O card do Founder Duo perdeu o "a partir de R$5.400" (valor
      antigo da planilha, abaixo da Entrada nova): ficou sem preço literal
      até haver decisão. NÃO inventar valor pro Duo.
   2. O setup deixou de ser cobrado à parte. Se isso não for o desejado, o
      lugar de reverter é aqui e no passo 03 do PROCESSO.
   3. Redes: os planos-padrão publicam em Instagram + TikTok. X/Twitter NÃO
      está no escopo-padrão. Quem quer LinkedIn como canal principal vai pra
      oferta de LinkedIn B2B (seção própria nesta página).
   4. Diagnóstico de Posicionamento continua SEM PREÇO DEFINIDO no vault.
      Placeholder visível abaixo. NÃO inventar valor. */
const OFERTA_HTML = `
<section id="oferta" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    ${headHTML(
      "A oferta",
      'Preço na mesa,<br>antes da <span class="hl">call</span>.',
      "A maioria das agências esconde o valor pra te obrigar a uma reunião. A gente prefere que você chegue na conversa já sabendo a ordem de grandeza, e decida se faz sentido antes de gastar o seu tempo.",
      true
    )}

    <div class="mp-grid3" style="max-width:1120px;margin:0 auto;align-items:stretch;">

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Porta de entrada</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Entrada</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 20px;">A cara nova no ar e a tese rodando com consistência. Você grava; a gente pensa, escreve, desenha, edita e publica.</p>
        <div style="border-top:1px solid #2a241d;border-bottom:1px solid #2a241d;padding:16px 0;margin-bottom:18px;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:34px;line-height:1;color:#FAFAFA;">R$ 5.000<span style="font-size:15px;font-weight:400;color:#9a9186;">/mês</span></div>
          <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:8px;">setup, edição e design inclusos</div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">6 reels por mês</strong> (roteiro + edição de vídeo)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">6 carrosséis por mês</strong> (design completo)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Postagem e agendamento por nossa conta</li>
          <li style="padding:7px 0;">Relatório mensal</li>
        </ul>
        <p style="font-size:12.5px;line-height:1.5;color:#8a8175;margin:16px 0 0;">O piso pra tirar o perfil da inércia. Se o objetivo já é virar canal de aquisição, o degrau de cima entrega o dobro de reels.</p>
        <a href="${AGENDAR}?plano=entrada" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>

      <div style="background:#1d1812;border:2px solid #7CF067;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;box-shadow:6px 6px 0 #7CF067;position:relative;">
        <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:999px;padding:5px 14px;font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">o mais escolhido</span>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">O carro-chefe · done-for-you</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Completo Autoridade</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 20px;">Modo alavancagem: cadência de quase todo dia e a máquina rodando forte. Você entra com cerca de 2 horas por mês.</p>
        <div style="border-top:1px solid #2a241d;border-bottom:1px solid #2a241d;padding:16px 0;margin-bottom:18px;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:34px;line-height:1;color:#7CF067;">R$ 7.000<span style="font-size:15px;font-weight:400;color:#9a9186;">/mês</span></div>
          <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:8px;">+40% no preço &middot; 2&times; os reels</div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#7CF067;">12 reels por mês</strong> (o dobro da Entrada)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">8 carrosséis por mês</strong> (design completo)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Postagem e agendamento por nossa conta</li>
          <li style="padding:7px 0;"><strong style="color:#FAFAFA;">Estratégia</strong> e relatório mensal</li>
        </ul>
        <p style="font-size:12.5px;line-height:1.5;color:#8a8175;margin:16px 0 0;">É o plano em que a maior parte dos founders entra: R$ 2.000 a mais que a Entrada compram 6 reels a mais por mês, mais a estratégia.</p>
        <a href="${AGENDAR}?plano=completo-autoridade" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:#7CF067;color:#06250a;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Volume máximo · operação inteira</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Escala</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 20px;">Presença diária e o perfil conversando: publicação e engajamento na mesma mão. Pra quem já decidiu que o perfil é canal de aquisição.</p>
        <div style="border-top:1px solid #2a241d;border-bottom:1px solid #2a241d;padding:16px 0;margin-bottom:18px;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:34px;line-height:1;color:#FAFAFA;">R$ 12.900<span style="font-size:15px;font-weight:400;color:#9a9186;">/mês</span></div>
          <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:8px;">engajamento incluído</div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">20 reels por mês</strong> (roteiro + edição)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">20 carrosséis por mês</strong> (cerca de um de cada por dia útil)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#D262B2;">Engajamento incluído</strong>: DM e comentários</li>
          <li style="padding:7px 0;"><strong style="color:#FAFAFA;">Estratégia</strong> e relatório</li>
        </ul>
        <p style="font-size:12.5px;line-height:1.5;color:#8a8175;margin:16px 0 0;">Aqui o perfil deixa de só publicar e passa a conversar: DM e comentários entram no escopo, sem custo separado.</p>
        <a href="${AGENDAR}?plano=escala" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:transparent;color:#D262B2;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>
    </div>

    <div style="max-width:1120px;margin:26px auto 0;background:#1d1812;border:1.5px dashed #7CF067;border-radius:18px;padding:26px 28px;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;margin-bottom:12px;">A conta do degrau do meio</div>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">
        <div style="flex:1;min-width:260px;">
          <p style="font-size:15px;line-height:1.6;color:#d8d1c6;margin:0;">Da Entrada pro Completo, o preço sobe <strong style="color:#FAFAFA;">40%</strong> e a produção de reels <strong style="color:#7CF067;">dobra</strong>: de 6 para 12 por mês. São 12 peças por mês contra 20, então o custo por peça cai de R$ 417 para R$ 350, e a estratégia mensal entra junto. É por isso que a maioria não fica na Entrada.</p>
        </div>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <div style="text-align:center;background:#14110D;border:1.5px solid #3a332a;border-radius:12px;padding:14px 18px;min-width:104px;"><div style="font-family:Atelier,sans-serif;font-weight:800;font-size:26px;color:#FAFAFA;line-height:1;">6</div><div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:6px;">reels · R$ 5.000</div></div>
          <span style="font-family:Atelier,sans-serif;font-size:24px;color:#7CF067;">&rarr;</span>
          <div style="text-align:center;background:#14110D;border:1.5px solid #7CF067;border-radius:12px;padding:14px 18px;min-width:104px;"><div style="font-family:Atelier,sans-serif;font-weight:800;font-size:26px;color:#7CF067;line-height:1;">12</div><div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:6px;">reels · R$ 7.000</div></div>
        </div>
      </div>
      <p style="font-size:12.5px;line-height:1.55;color:#8a8175;margin:16px 0 0;">Sem adicional pra escolher: o que está no card é o que está no contrato. Podcast entra como projeto à parte, quando fizer sentido (por exemplo, gravações presenciais em São Paulo), orçado por escopo.</p>
    </div>

    <div style="max-width:1120px;margin:26px auto 0;background:#1d1812;border:2px solid #D262B2;border-radius:18px;padding:28px 30px;box-shadow:6px 6px 0 #D262B2;display:flex;gap:26px;align-items:center;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Dois sócios · Founder Duo</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:10px 0 6px;color:#FAFAFA;">Duas marcas pessoais em coordenação</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0;">Dois founders, duas teses, dois pipelines, sem canibalizar a narrativa da empresa. É o modelo que a gente opera com os dois sócios da DSEC: dois perfis, dois modos de produção, uma base institucional por trás.</p>
        <p style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8175;margin:12px 0 0;">Não é um quarto plano: é a mesma régua aplicada a dois perfis</p>
      </div>
      <div style="text-align:right;min-width:220px;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#D262B2;margin-bottom:6px;">Orçado por escopo,<br>a partir do plano escolhido</div>
        <a href="${AGENDAR}?plano=founder-duo" class="cta-btn" style="margin-top:16px;display:inline-flex;align-items:center;gap:9px;background:#D262B2;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px;box-shadow:4px 4px 0 #7CF067;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>
    </div>

    <div style="max-width:1120px;margin:26px auto 0;background:#1d1812;border:1.5px dashed #7CF067;border-radius:18px;padding:26px 28px;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Não quer retainer ainda · projeto pontual</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:24px;margin:10px 0 6px;color:#FAFAFA;">Diagnóstico de Posicionamento</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0;">Leitura completa dos seus perfis, tese preliminar e roadmap de marca pessoal. Sem recorrência: se você seguir pra operação, ele vira a fase de fundação do plano. Se não seguir, o roadmap fica com você.</p>
        <p style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:1px;color:#D262B2;margin:14px 0 0;text-transform:uppercase;">Valor definido na conversa &middot; preço deste projeto ainda não é público</p>
      </div>
      <a href="${AGENDAR}?plano=diagnostico" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:transparent;color:#7CF067;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px;border:1.5px solid #7CF067;text-decoration:none;white-space:nowrap;">${CTA_PRIMARY}</a>
    </div>

    <div style="text-align:center;margin-top:36px;">
      <p style="font-size:14.5px;color:#b8b1a6;margin:0;max-width:720px;margin-left:auto;margin-right:auto;">Contrato mínimo de 6 meses nos três planos, porque marca pessoal abaixo disso não dá tempo de virar resultado. Setup, edição de vídeo, design e publicação em Instagram e TikTok estão inclusos: não existe adicional pra escolher nem custo que aparece no meio do caminho. Se o seu momento não pedir isso agora, a gente fala na call.</p>
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

/* ────────────── S9b · LINKEDIN B2B PARA EMPRESAS (claro) ──────────────
   NOVA OFERTA (06/08/2026), pedida pelo Gabriel e reafirmada por ele depois
   de eu levantar ressalvas. É uma SEGUNDA oferta, deliberadamente separada
   do plano de autoridade acima.

   ESTRUTURA modelada em um player brasileiro de LinkedIn B2B que o Gabriel
   quis usar de referência (processo em 4 passos, três escopos done-for-you,
   inteligência comercial no fim do funil). A ESTRUTURA é referência; a copy
   é nossa, o nome deles não aparece em lugar nenhum e nada foi copiado
   literalmente. Não introduzir menção a concorrente nesta seção.

   ⚠️ PREÇO (RÉGUA DE 08/08/2026, decisão do Gabriel): Starter R$ 4.250 /
   Full Service R$ 5.900 / LinkedIn 360° R$ 9.900, contrato mínimo de
   3 MESES. Substituem a régua anterior de R$ 5.500 / 7.500 / 13.000, que
   espelhava o player de referência. O contrato é de 3 meses (e não 6, como
   no founder brand) porque é o padrão do mercado nesse serviço e gera menos
   atrito. Se o Gabriel bater o martelo diferente, o lugar de trocar é SÓ
   aqui e no slide 12 do pitch deck (kaleidos-papers).

   🔴 "SINAIS DE INTENÇÃO" — LER ANTES DE EDITAR O PASSO 04:
   · ⚠️⚠️ A PROMESSA MUDOU EM 08/08/2026. O material antes dizia que a gente
     entrega "a lista de quem interagiu" com nome, cargo e empresa. Uma
     auditoria técnica (code/sequencia-viral/docs/SPEC-LINKEDIN-2026-08.md,
     §5) verificou na doc oficial do LinkedIn que ISSO NÃO É POSSÍVEL de
     forma legítima:
       – perfil pessoal: `r_member_social` / `r_member_social_feed` são
         permissões FECHADAS ("not accepting access requests");
       – Company Page: o autor volta como URN opaco (urn:li:person:…), que
         não é nome nem empresa, não pode ser resolvido e não pode ser
         armazenado além do próprio URN.
     Ou seja: lista nominal de quem curtiu/comentou só sai por scraping de
     sessão, que viola o User Agreement e põe em risco a conta DO CLIENTE.
     🔴 NÃO reintroduzir "lista de quem interagiu", "nome, cargo e empresa
     de quem engajou" ou equivalente. Não inventar capacidade técnica.
   · O que a oferta entrega, e que é verificável:
       1. métricas oficiais por post, incluindo VISITAS AO PERFIL vindas do
          conteúdo e SEGUIDORES GANHOS pelo conteúdo;
       2. capturas reais de lead magnet em landing própria (nome e e-mail
          dados voluntariamente pelo lead) — dado nosso, não do LinkedIn;
       3. fila de follow-up assistida: a Kaleidos redige a mensagem, o
          CLIENTE envia. Assistência, não automação.
   · 🔴 NUNCA citar o nome de nenhuma ferramenta de terceiro. Nem nome, nem
     logo, nem link, nem "usamos uma plataforma chamada X". A entrega é da
     Kaleidos; ferramenta é meio, não produto.
   · ⚠️ NÃO escrever integração com CRM, alerta em tempo real, score
     automático, enriquecimento de dados, número de leads por mês ou
     qualquer limite. Nada disso está confirmado.
   · ⚠️ A periodicidade está como "periódico" de propósito. Só trocar por
     "mensal"/"quinzenal" depois de o Gabriel confirmar.

   ⚠️ Nenhum número de resultado, logo ou depoimento nesta seção. Não temos
   case de LinkedIn B2B pra mostrar ainda. */
const LINKEDIN_B2B_HTML = `
<section id="linkedin-b2b" style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">

    <div style="max-width:760px;margin:0 auto 44px;text-align:center;">
      <span style="display:inline-block;background:#D262B2;color:#FAFAFA;border:1.5px solid #14110D;border-radius:999px;padding:7px 18px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;box-shadow:3px 3px 0 #14110D;">Segunda oferta &middot; outra coisa</span>
      <p style="font-size:15px;line-height:1.6;color:#6b6258;margin:20px 0 0;">Tudo acima é marca pessoal de pessoa física, com o Instagram na frente. O que vem agora é um produto diferente, contratado pela empresa, com outro objetivo. Se você caiu aqui procurando geração de demanda B2B, é esta parte que te interessa.</p>
    </div>

    ${headHTML(
      "LinkedIn B2B para empresas",
      'O perfil do seu executivo<br>vira canal de <span class="hl">demanda</span>.',
      "Para empresas B2B de ticket alto e ciclo de venda longo, onde a decisão passa por várias pessoas e leva meses. A gente usa o LinkedIn de quem decide dentro da sua empresa para produzir conversa comercial com quem decide dentro da empresa do cliente.",
      false
    )}

    <div style="max-width:1000px;margin:0 auto 48px;background:#fff;border:1.5px solid #14110D;border-radius:16px;box-shadow:6px 6px 0 #D262B2;" class="mp-table-wrap">
      <table class="mp-table">
        <thead>
          <tr>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;border-bottom:1.5px solid #14110D;width:22%;"> </th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#14110D;border-bottom:1.5px solid #14110D;background:#7CF06722;">Plano de autoridade</th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#14110D;border-bottom:1.5px solid #14110D;background:#D262B222;">LinkedIn B2B</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;line-height:1.5;color:#4a443c;">
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Quem contrata</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;">A pessoa física: founder, criador, executivo</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#D262B211;font-weight:600;">A empresa, com o perfil de um ou mais executivos</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Onde roda</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;">Instagram e TikTok</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#D262B211;font-weight:600;">LinkedIn como canal central, com reaproveitamento fora dele</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">O que persegue</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;">Audiência, alcance e reconhecimento</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#D262B211;font-weight:600;">Conversa comercial com quem decide a compra</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Peça típica</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;">Reel com gancho e carrossel de Instagram</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#D262B211;font-weight:600;">Tese escrita, infográfico, estudo e lead magnet</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;">Como se mede</td>
            <td style="padding:14px 20px;background:#7CF06711;">Views, engajamento e crescimento de base</td>
            <td style="padding:14px 20px;background:#D262B211;font-weight:600;">Sinais de intenção por post, contatos capturados e o que o comercial fez com eles</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="max-width:820px;margin:0 auto 40px;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Para quem é</div>
      <div class="mp-grid3">
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:14px;padding:18px 20px;box-shadow:4px 4px 0 #D262B2;"><div style="font-weight:700;font-size:15px;color:#14110D;">Venda B2B complexa</div><div style="font-size:13px;line-height:1.55;color:#6b6258;margin-top:6px;">Serviço, software ou consultoria vendidos para outra empresa, não para consumidor final.</div></div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:14px;padding:18px 20px;box-shadow:4px 4px 0 #7CF067;"><div style="font-weight:700;font-size:15px;color:#14110D;">Ticket alto</div><div style="font-size:13px;line-height:1.55;color:#6b6258;margin-top:6px;">Contratos em que uma única conversa nova já paga o investimento de meses de conteúdo.</div></div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:14px;padding:18px 20px;box-shadow:4px 4px 0 #D262B2;"><div style="font-weight:700;font-size:15px;color:#14110D;">Ciclo longo</div><div style="font-size:13px;line-height:1.55;color:#6b6258;margin-top:6px;">Decisão que leva meses e passa por mais de uma cabeça. É exatamente onde presença constante decide.</div></div>
      </div>
    </div>

    <div style="max-width:1000px;margin:0 auto;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:18px;">Como funciona &middot; quatro passos</div>
      <div class="mp-grid4">
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;-webkit-text-stroke:1.4px #14110D;">01</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Imersão</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">A gente entra no seu negócio antes de escrever qualquer linha: o que você vende, para quem, contra quem, e quais objeções travam a venda hoje. Sai daqui com a lista das empresas e dos cargos que o conteúdo precisa alcançar.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;-webkit-text-stroke:1.4px #14110D;">02</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Estratégia</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Tese pública do executivo, pilares de conteúdo amarrados nas objeções reais da venda, calendário editorial e o perfil arrumado para receber quem chega. Você aprova antes de qualquer produção começar.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;-webkit-text-stroke:1.4px #14110D;">03</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Produção completa</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Redação, design, edição e publicação, tudo por nossa conta. O executivo entra pra dar ponto de vista e aprovar; a operação é nossa, do rascunho ao post no ar.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;-webkit-text-stroke:1.4px #14110D;">04</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Sinais de Intenção</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Cada post devolve quantas visitas ao perfil e quantos seguidores ele gerou, e cada material de captura devolve contato real de quem baixou. O conteúdo deixa de ser só alcance e passa a apontar onde a atenção comercial está.</p>
        </div>
      </div>
      <div style="background:#fff;border:1.5px dashed #14110D;border-radius:14px;padding:18px 22px;margin-top:16px;">
        <p style="font-size:13.5px;line-height:1.6;color:#4a443c;margin:0 0 12px;"><strong style="color:#14110D;">O que "Sinais de Intenção" é, na prática.</strong> São três coisas, e todas são dado que a gente pode entregar de forma legítima:</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#4a443c;">
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Métricas oficiais por post</strong>, incluindo quantas visitas ao perfil e quantos seguidores aquele conteúdo gerou. É o indicador mais próximo de intenção que existe de forma oficial, e quase ninguém no mercado mostra isso direito.</li>
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Contatos capturados de verdade</strong>: os materiais de captura ficam numa landing nossa, então quem baixa deixa nome e e-mail por vontade própria. Vira contato do seu comercial, não um identificador anônimo.</li>
          <li style="padding:7px 0;"><strong style="color:#14110D;">Fila de follow-up assistida</strong>: a gente redige a mensagem de retorno, com o gancho do post que abriu a conversa. Quem envia é o seu time, do perfil dele.</li>
        </ul>
        <p style="font-size:12.5px;line-height:1.6;color:#6b6258;margin:14px 0 0;">Uma coisa que a gente não promete: lista nominal de quem curtiu ou comentou. A API oficial do LinkedIn não libera isso para perfil pessoal, e o único jeito de conseguir é por automação que coloca a conta do seu executivo em risco. Preferimos entregar um e-mail dado de livre vontade do que um nome raspado.</p>
      </div>
    </div>

    <div style="max-width:1100px;margin:44px auto 0;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:18px;">Done for you &middot; três escopos</div>
      <div class="mp-grid3">

        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Escopo 1</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;color:#14110D;margin:10px 0 6px;">Starter</h3>
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Ideal pra complementar 1 perfil que já publica e falta cadência e conversão.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#14110D;">R$ 4.250<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 3 meses</div>
          </div>
          <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.55;color:#4a443c;flex:1;">
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Setup do perfil</li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">12 conteúdos por mês</strong></li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Material de captura com automação</li>
            <li style="padding:6px 0;">Relatório de <strong style="color:#14110D;">Sinais de Intenção</strong></li>
          </ul>
          <a href="${AGENDAR}?plano=linkedin-starter" class="cta-btn" style="margin-top:18px;display:inline-flex;justify-content:center;background:transparent;color:#14110D;font-weight:700;font-size:14.5px;padding:12px 20px;border-radius:999px;border:1.5px solid #14110D;text-decoration:none;">${CTA_PRIMARY}</a>
        </div>

        <div style="background:#fff;border:2px solid #D262B2;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #D262B2;display:flex;flex-direction:column;position:relative;">
          <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#D262B2;color:#FAFAFA;border:1.5px solid #14110D;border-radius:999px;padding:5px 14px;font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">recomendado</span>
          <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Escopo 2</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;color:#14110D;margin:10px 0 6px;">Full Service</h3>
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Ideal pra transformar 1 perfil em canal de geração de demanda.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;">R$ 5.900<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 3 meses</div>
          </div>
          <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.55;color:#4a443c;flex:1;">
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Setup do perfil</li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">20 conteúdos por mês</strong></li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Relatório de <strong style="color:#14110D;">Sinais de Intenção</strong></li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Conteúdo em vídeo / newsletter</li>
            <li style="padding:6px 0;">Conteúdo de Company Page</li>
          </ul>
          <a href="${AGENDAR}?plano=linkedin-full-service" class="cta-btn" style="margin-top:18px;display:inline-flex;justify-content:center;background:#D262B2;color:#FAFAFA;font-weight:700;font-size:14.5px;padding:12px 20px;border-radius:999px;box-shadow:4px 4px 0 #14110D;text-decoration:none;">${CTA_PRIMARY}</a>
        </div>

        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Escopo 3</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;color:#14110D;margin:10px 0 6px;">LinkedIn 360&deg;</h3>
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Ideal pra atuar com múltiplos perfis de executivos + Company Page.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#14110D;">R$ 9.900<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 3 meses</div>
          </div>
          <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.55;color:#4a443c;flex:1;">
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Setup de múltiplos perfis</li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">40 conteúdos por mês</strong></li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Até 6 materiais de captura por mês</strong>, com automação</li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Relatório de <strong style="color:#14110D;">Sinais de Intenção</strong></li>
            <li style="padding:6px 0;border-bottom:1px solid #efe9df;">Conteúdo em vídeo / newsletter</li>
            <li style="padding:6px 0;">Conteúdo de Company Page</li>
          </ul>
          <a href="${AGENDAR}?plano=linkedin-360" class="cta-btn" style="margin-top:18px;display:inline-flex;justify-content:center;background:transparent;color:#14110D;font-weight:700;font-size:14.5px;padding:12px 20px;border-radius:999px;border:1.5px solid #14110D;text-decoration:none;">${CTA_PRIMARY}</a>
        </div>
      </div>
      <p style="font-size:12.5px;line-height:1.55;color:#8a8175;margin:16px 0 0;text-align:center;">Contrato de 3 meses porque LinkedIn B2B é ciclo curto de validação: em 90 dias dá pra saber se o canal responde. O escopo fechado (quantos executivos, quais formatos) sai por escrito na proposta.</p>
    </div>

    <div style="max-width:1000px;margin:36px auto 0;background:#14110D;border-radius:18px;padding:28px 30px;box-shadow:6px 6px 0 #7CF067;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#7CF067;margin-bottom:8px;">Formatos que a gente produz</div>
      <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;max-width:640px;">LinkedIn B2B não é feed de frase motivacional. O mix é escolhido pela etapa da venda que cada peça precisa destravar.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Carrosséis</strong> &middot; a tese destrinchada</span>
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Infográficos</strong> &middot; o dado que só você tem</span>
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Thought leadership</strong> &middot; a opinião que posiciona</span>
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Vídeos</strong> &middot; o rosto por trás da assinatura</span>
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Newsletters</strong> &middot; audiência que não depende de algoritmo</span>
        <span style="background:#1d1812;border:1.5px solid #3a332a;border-radius:10px;padding:10px 15px;font-size:13.5px;color:#d8d1c6;"><strong style="color:#FAFAFA;">Lead magnets</strong> &middot; o material que troca conteúdo por contato</span>
      </div>
      <p style="font-size:13.5px;line-height:1.6;color:#b8b1a6;margin:20px 0 0;max-width:720px;"><strong style="color:#FAFAFA;">E nada morre no LinkedIn.</strong> A mesma peça vira corte para o Instagram, material de apoio no site e argumento que o comercial manda direto na conversa com o lead. Você paga a produção uma vez e usa nos três lugares.</p>
    </div>

    <p style="text-align:center;font-size:13px;color:#8a8175;margin:26px auto 0;max-width:720px;">Esta oferta acabou de entrar no nosso catálogo, então não tem case publicado ainda. Preferimos dizer isso a mostrar número de terceiro como se fosse nosso.</p>
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
  {
    q: "Quanto custa?",
    a: "São três planos, e a diferença entre eles é volume. Entrada em R$ 5.000 por mês (6 reels + 6 carrosséis). Completo Autoridade em R$ 7.000 por mês (12 reels + 8 carrosséis, com estratégia): 40% a mais de investimento que a Entrada, com o dobro de reels, e é onde a maioria dos founders entra por isso. Escala em R$ 12.900 por mês (20 reels + 20 carrosséis, cerca de um de cada por dia útil, com engajamento de DM e comentários incluso). Os três já saem publicando em Instagram e TikTok, com setup, edição de vídeo, design e postagem inclusos, e não existe adicional pra escolher: o que está no card é o que está no contrato. Contrato mínimo de 6 meses. O valor está aberto na página de propósito: se a faixa não couber no seu momento agora, você descobre aqui e não depois de uma reunião.",
  },
  {
    q: "Qual a diferença entre o plano de autoridade e a oferta de LinkedIn B2B?",
    a: "São duas ofertas separadas, com público e objetivo diferentes. O plano de autoridade (Entrada, Completo e Escala) é para pessoa física: o founder ou executivo constrói audiência própria em Instagram e TikTok, com reels e carrosséis, e o objetivo é reconhecimento e alcance. A oferta de LinkedIn B2B é contratada pela empresa: o perfil do executivo vira canal de demanda dentro do LinkedIn, com conteúdo de tese, e o objetivo é conversa comercial com quem decide. Dá para rodar as duas juntas, mas elas não se substituem: quem precisa das duas coisas contrata as duas, e a gente diz na call se só uma já resolve.",
  },
  {
    q: "Isso é escrito por IA?",
    a: "IA entra na velocidade: pesquisa, variação de hook, primeira versão, corte. A substância não. A tese sai de entrevistas com você, a linha editorial é decidida por estrategista humano e toda peça passa por redator e designer antes de existir. O critério é simples e é aplicado peça a peça: se não parecer você lendo em voz alta, volta pra mesa. Você aprova tudo antes de publicar.",
  },
  {
    q: "Só funciona pro Instagram?",
    a: "O Instagram é o palco principal porque é onde o alcance orgânico acontece no Brasil, e a mesma peça já sai no TikTok nos três planos, sem produção dobrada. Se o LinkedIn for o canal principal e quem contrata for a empresa, o lugar certo não é este plano: é a oferta de LinkedIn B2B, que tem seção própria nesta página e é contratada à parte. Newsletter, podcast e artigos longos são degraus seguintes da mesma escada.",
  },
  {
    q: "Já tenho agência (ou time interno de marketing). Isso conflita?",
    a: "Não, e normalmente soma. Marca pessoal de founder é uma camada diferente da marca da empresa: sua agência atual cuida da página, da campanha e do funil; a gente cuida do perfil de quem assina. Onde há sobreposição, a gente se acerta com o seu time no kickoff, para não haver duas vozes dizendo coisas diferentes na mesma semana.",
  },
  {
    q: "E se eu não gostar do que vocês produzirem?",
    a: "Você aprova antes. O calendário editorial vai pra sua mão antes de qualquer produção, e cada peça passa por aprovação antes de ir ao ar. Nada é publicado no seu perfil sem o seu sim. Ajuste de rota faz parte: os primeiros dois meses são justamente de calibragem de voz.",
  },
  {
    q: "Preciso já ter audiência pra começar?",
    a: "Não. Vários dos nossos casos começaram de base pequena ou do zero. O que precisa existir é expertise real e disposição de aparecer: sem isso não há atalho, com isso a audiência é consequência de cadência e tempo.",
  },
];

const FAQ_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:820px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    ${headHTML(
      "FAQ",
      'As objeções.<br><span class="hl">Respondidas</span>.',
      "Tudo que todo founder pensa antes de dar a cara, respondido antes de virar atrito: tempo, autopromoção, o que postar, IA, preço, contrato e aprovação.",
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
      <a href="${AGENDAR}" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:17px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
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

        {/* S3 · Problema + timeline de dores */}
        <Reveal>
          <ProblemaSection />
        </Reveal>

        {/* S4 · Prova de mercado — a ÚNICA seção de números de mercado */}
        <Reveal>
          <DadosSection />
        </Reveal>

        {/* S3b · O que é Founder-Led Growth (nomeia a categoria depois da prova) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FOUNDER_LED_HTML }} />
        </Reveal>

        {/* S6 · O método (stepper auto-rotativo) */}
        <Reveal>
          <MetodoSection />
        </Reveal>

        {/* S5 · O que fazemos */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAZEMOS_HTML }} />
        </Reveal>

        {/* S5b · O que você recebe — entregas nomeadas (revisão 08/2026) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: ENTREGAS_HTML }} />
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

        {/* S8d · Como começa — processo de entrada (revisão 08/2026).
            Vem logo antes da oferta: tira o medo do "e depois do clique?"
            no exato momento em que o visitante vai ver o preço. */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: PROCESSO_HTML }} />
        </Reveal>

        {/* S9 · Oferta (agora COM preço público — ver bloco de fonte no const) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: OFERTA_HTML }} />
        </Reveal>

        {/* S9b · LinkedIn B2B para empresas — SEGUNDA oferta, separada.
            Vem logo depois da oferta principal: quem leu o preço do plano de
            autoridade e concluiu "não é isso que eu preciso" encontra aqui a
            outra porta, em vez de sair da página. */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: LINKEDIN_B2B_HTML }} />
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
