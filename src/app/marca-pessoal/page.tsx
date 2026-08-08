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
import { AnimatedNumber } from "@/components/marca-pessoal/animated-number";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";

/**
 * /marca-pessoal — Founder-Led Growth (marca pessoal para founders e C-levels).
 *
 * Página standalone no estilo web3v2 (.kv2): fundo #FAFAFA alternando com dark
 * #14110D, rosa #D262B2, verde #7CF067 no highlight de headline, Atelier
 * (display) / Inter (corpo) / Gridlite (eyebrows), botões .cta-btn neo-brutal.
 *
 * REGRAS DE DADO (paper 2026-07-24, vault/015 - BRANDING E GROWTH):
 * - Todo stat de terceiro tem fonte visível. Após a enxugada de 08/2026 sobrou
 *   UM stat de mercado na página (Refine Labs); se voltar stat, com fonte.
 * - Métricas de case vêm SÓ de src/lib/case-data.ts (Investidor 4.20, Layla
 *   Foz, Defiverso). Nunca inventar número.
 * - Voz institucional "a Kaleidos", PT-BR, sem travessão no corpo.
 *
 * ⚠️ ENXUGADA GERAL (08/2026, feedback do Gabriel: "muito número e dado, lp
 * cansativa"). A página caiu de ~16 pra 12 seções. O que SAIU (não recriar
 * sem pedido novo): grade de 4 stats de mercado (virou 1 número), seção
 * "O que é Founder-Led Growth", "O que você recebe" (entregas), timeline de
 * dores, tabela comparativa Genérica vs Kaleidos, tabela comparativa das duas
 * ofertas, seção de prints Lucas→Defiverso (a história vive nos cases), a
 * galeria "Na prática, no feed" (o hero já tem a parede de conteúdo real) e
 * a seção "Como começa" (virou strip de 3 passos dentro da oferta).
 * O que ENTROU: bifurcação explícita das duas ofertas logo após o hero.
 *
 * ⚠️ MUDANÇA DE POLÍTICA (08/2026): preço público na página (qualifica o lead
 * antes da call). Valores da decisão registrada de 2026-07-24 + decisão
 * Gabriel 08/08/2026. Ver o bloco de comentário sobre OFERTA_HTML antes de
 * alterar qualquer número.
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
// cima (a faixa de 40% deixava topo/base das letras invisíveis em fundo escuro).
const HL =
  "background:#7CF067;color:#14110D;padding:.06em .22em;border-radius:6px;box-decoration-break:clone;-webkit-box-decoration-break:clone;";

const WA_AUDIT =
  "https://wa.me/5512997796835?text=" +
  encodeURIComponent(
    "Oi! Quero a auditoria gratuita do meu perfil (marca pessoal de founder)."
  );

/* ── HIERARQUIA DE CTA (revisão 2026-08) ─────────────────────────────────────
   UMA ação primária e UMA secundária, repetidas:
   · PRIMÁRIA   → /agendar, sempre com o rótulo CTA_PRIMARY. Todo card de
                  plano aponta pra cá (com ?plano= só pra contexto interno).
   · SECUNDÁRIA → auditoria gratuita no WhatsApp, sempre visualmente mais
                  discreta (outline no hero/CTA final, link de texto no resto).
   Nenhum outro rótulo de CTA deve ser introduzido nesta página. */
const CTA_PRIMARY = "Ver se faz sentido &rarr;";
const CTA_PRIMARY_JSX = "Ver se faz sentido →";
const AGENDAR = "/agendar";

// CSS escopado da página (grids responsivos).
const MP_STYLE = `
.kv2 .mp-pad{padding-left:28px;padding-right:28px;}
.kv2 .mp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
.kv2 .mp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.kv2 .mp-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.kv2 details.mp-faq summary::-webkit-details-marker{display:none;}
.kv2 details.mp-faq summary{cursor:pointer;list-style:none;}
.kv2 details.mp-faq[open] .mp-faq-plus{transform:rotate(45deg);}
.kv2 .mp-faq-plus{transition:transform .2s ease;display:inline-block;}
@media(max-width:980px){
  .kv2 .mp-grid4{grid-template-columns:repeat(2,1fr);}
  .kv2 .mp-grid3{grid-template-columns:1fr;}
}
@media(max-width:760px){
  .kv2 .mp-grid2{grid-template-columns:1fr;gap:20px;}
}
@media(max-width:560px){
  .kv2 .mp-grid4{grid-template-columns:1fr;}
  .kv2 .mp-pad{padding-left:20px;padding-right:20px;}
}
/* ── Hero "parede de prova" (só conteúdo real rolando) ── */
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
/* ── Header de seção: editorial, comedido + assimétrico (12-col) ── */
.kv2 .mp-head{display:grid;grid-template-columns:repeat(12,1fr);gap:14px 34px;align-items:end;margin-bottom:52px;}
.kv2 .mp-head-l{grid-column:1 / span 7;min-width:0;}
.kv2 .mp-head-r{grid-column:8 / span 5;align-self:end;padding-bottom:8px;min-width:0;}
.kv2 .mp-h2{font-family:'Inter',sans-serif;font-weight:800;font-size:clamp(30px,3.5vw,50px);line-height:1.05;letter-spacing:-1.6px;margin:0;text-wrap:balance;}
.kv2 .mp-h2 .hl{font-family:'Inter',sans-serif;background:#7CF067;color:#14110D;padding:.06em .2em;border-radius:7px;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
/* variante stack (containers estreitos ≤1000: título largura total, lead abaixo) */
.kv2 .mp-head--stack{grid-template-columns:1fr;gap:16px;align-items:start;}
.kv2 .mp-head--stack .mp-head-l{grid-column:1 / -1;}
.kv2 .mp-head--stack .mp-head-r{grid-column:1 / -1;align-self:start;padding-bottom:0;max-width:640px;}
@media(max-width:900px){
  .kv2 .mp-head{grid-template-columns:1fr;gap:14px;margin-bottom:36px;}
  .kv2 .mp-head-l,.kv2 .mp-head-r{grid-column:1 / -1;padding-bottom:0;}
  .kv2 .mp-h2{font-size:clamp(27px,6.4vw,40px);letter-spacing:-1.2px;line-height:1.08;}
}
/* ── ASCII torus wrap ── */
.kv2 .mp-torus-wrap{overflow:hidden;}
@media(max-width:760px){.kv2 .mp-torus-wrap{display:none;}}
`;

/* Eyebrow-assinatura: traço + label mono. Coesão entre seções. */
const eyebrow = (label: string, color = "#D262B2", justify = "center") =>
  `<div style="display:flex;align-items:center;justify-content:${justify};gap:12px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${color};margin-bottom:18px;"><span style="width:36px;height:1.5px;background:currentColor;display:inline-block;"></span><span>${label}</span><span style="width:36px;height:1.5px;background:currentColor;display:inline-block;"></span></div>`;

/* Mesma assinatura em JSX. */
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
   altura no meio de cards de ~288px e destoa. ── */
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

/* ────────────────────────── S1 · HERO (dark) ────────────────────────── */
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
      <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
        <HeroCanvas />
      </div>
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
                maxWidth: 480,
                margin: "26px 0 0",
              }}
            >
              Marca pessoal pra founder de cripto, web3 e fintech, no Instagram
              e no TikTok. A gente fala DeFi e stablecoin nativamente. Você dá
              a cara. A gente faz o resto.
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
            {/* Preço-âncora: qualifica o lead antes do clique. */}
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
              preço aberto{" "}
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
            {/* Ponte pra segunda oferta, logo no hero. */}
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "#b8b1a6",
                margin: "10px 0 0",
              }}
            >
              Empresa B2B, canal LinkedIn?{" "}
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

          {/* Parede de prova (desktop): só conteúdo real publicado rolando. */}
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

/* ────────────── S2 · DUAS OFERTAS (claro) — bifurcação explícita ──────────────
   Decisão do Gabriel (08/2026): são DOIS clientes diferentes, então a página
   bifurca cedo. Pessoa física (Instagram) vs empresa (LinkedIn B2B). Cada
   caminho tem sua própria seção de planos e seu próprio CTA; nada de misturar
   entrega das duas ofertas na mesma grade. */
const BIFURCACAO_HTML = `
<section id="duas-ofertas" style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1080px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    <div style="text-align:center;max-width:640px;margin:0 auto 48px;">
      ${eyebrow("Dois caminhos")}
      <h2 class="mp-h2" style="color:#14110D;">São duas ofertas.<br><span class="hl">Qual é a sua?</span></h2>
    </div>
    <div class="mp-grid2">
      <a href="#oferta" style="display:flex;flex-direction:column;background:#fff;border:1.5px solid #14110D;border-radius:20px;padding:32px 30px;box-shadow:7px 7px 0 #7CF067;text-decoration:none;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6258;">Pessoa física &middot; Instagram + TikTok</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:30px;color:#14110D;margin:14px 0 10px;">Marca Pessoal</h3>
        <p style="font-size:15px;line-height:1.6;color:#4a443c;margin:0;flex:1;">Você é founder ou criador e quer virar autoridade. Reels e carrosséis: você grava, a gente faz o resto.</p>
        <div style="margin-top:22px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <span style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#14110D;">a partir de R$ 5.000/mês</span>
          <span style="font-size:15px;font-weight:800;color:#14110D;">Ver os planos &darr;</span>
        </div>
      </a>
      <a href="#linkedin-b2b" style="display:flex;flex-direction:column;background:#14110D;border:1.5px solid #14110D;border-radius:20px;padding:32px 30px;box-shadow:7px 7px 0 #D262B2;text-decoration:none;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Empresa &middot; LinkedIn</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:30px;color:#FAFAFA;margin:14px 0 10px;">LinkedIn B2B</h3>
        <p style="font-size:15px;line-height:1.6;color:#b8b1a6;margin:0;flex:1;">Sua empresa vende pra outras empresas. O perfil de quem decide vira canal de geração de demanda.</p>
        <div style="margin-top:22px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <span style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#FAFAFA;">a partir de R$ 4.250/mês</span>
          <span style="font-size:15px;font-weight:800;color:#D262B2;">Ver os planos &darr;</span>
        </div>
      </a>
    </div>
  </div>
</section>`;

/* ────────────────────────── S3 · PROBLEMA (dark) ────────────────────────── */
const OBSERVADORES = [
  {
    nome: "O cliente",
    texto:
      "Antes de assinar, ele abre seu perfil. Perfil parado passa a mensagem errada sobre a empresa inteira.",
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
      "Ele avalia o founder tanto quanto o negócio. Tese pública bem construída encurta a due diligence de confiança.",
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
      "Os melhores escolhem trabalhar com líderes que admiram. Sua presença pública é o primeiro pitch de recrutamento.",
    shadow: "#7CF067",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7CF067" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 2.5 5.3 5.5.8-4 4 1 5.9-5-2.8-5 2.8 1-5.9-4-4 5.5-.8Z" />
      </svg>
    ),
  },
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
          paddingTop: 96,
          paddingBottom: 96,
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
          lead="O comprador te pesquisa antes de falar com você. Se não te acha, acha seu concorrente. E não é só ele olhando."
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

        <div style={{ textAlign: "center", marginTop: 60 }}>
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

/* ─────────────────── S4 · UM NÚMERO SÓ (claro) ───────────────────
   ⚠️ A ÚNICA estatística de mercado da página (feedback Gabriel 08/2026:
   "muito número e dado, lp cansativa" — a grade de 4 cards virou UM número
   grande). Fonte obrigatória visível. Se surgir stat novo, ele SUBSTITUI
   este, nunca vira grade de novo.
   Número do paper 2026-07-24: Refine Labs, experimento de agência — mesmo
   conteúdo publicado no perfil pessoal vs página da empresa. */
function NumeroSection() {
  return (
    <section style={{ position: "relative", background: "#FAFAFA", overflow: "hidden" }}>
      <div
        className="mp-pad"
        style={{
          position: "relative",
          maxWidth: 760,
          margin: "0 auto",
          paddingTop: 100,
          paddingBottom: 100,
          textAlign: "center",
        }}
      >
        <Eyebrow label="O mercado, em um número" />
        <div
          style={{
            fontFamily: "Atelier, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(88px,14vw,170px)",
            lineHeight: 1,
            letterSpacing: "-4px",
            color: "#14110D",
          }}
        >
          <AnimatedNumber value={2.75} suffix="×" decimals={2} />
        </div>
        <p
          style={{
            fontSize: "clamp(17px,2.2vw,21px)",
            lineHeight: 1.55,
            color: "#4a443c",
            maxWidth: 520,
            margin: "26px auto 0",
          }}
        >
          mais impressões publicando <strong style={{ color: "#14110D" }}>o mesmo conteúdo</strong>{" "}
          no perfil pessoal do que na página da empresa.
        </p>
        <p
          style={{
            fontFamily: "Gridlite, monospace",
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#8a8175",
            margin: "18px 0 0",
          }}
        >
          Fonte: Refine Labs (experimento de agência)
        </p>
        <p style={{ fontSize: 15, color: "#6b6258", margin: "26px auto 0", maxWidth: 460 }}>
          É por isso que a aposta é no rosto do founder, não na logo. E é o
          único número de mercado que você vai ver nesta página.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── S5 · O QUE FAZEMOS (dark) ─────────────────────── */
const FAZEMOS_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "O que fazemos",
      'Você grava.<br>A gente faz <span class="hl">o resto</span>.',
      'O palco é o <strong style="color:#7CF067;">Instagram</strong>, com a mesma peça saindo no TikTok. A Kaleidos dirige, escreve, desenha, edita, publica e mede.',
      true
    )}
    <div class="mp-grid2" style="max-width:900px;margin:0 auto;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #7CF067;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#7CF067;margin-bottom:16px;">Você</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Grava os reels (a gente dirige e roteiriza)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Responde as DMs que viram negócio</li>
          <li style="padding:7px 0;">Dá a cara. É o que não dá pra terceirizar</li>
        </ul>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #D262B2;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Kaleidos</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Tese, estratégia e calendário aprovado por você</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Roteiro, copy, design e edição de tudo</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publicação em Instagram e TikTok</li>
          <li style="padding:7px 0;">Relatório mensal e leitura dos números junto</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin-top:48px;">
      <span style="display:inline-block;background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:12px;padding:14px 26px;font-weight:800;font-size:clamp(17px,2.2vw,22px);box-shadow:5px 5px 0 #D262B2;transform:rotate(-1deg);">~2 horas do seu tempo por mês. O resto é com a gente.</span>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S6 · O MÉTODO (claro) ─────────────────────── */
const METODO_TOP_HTML = `
    ${headHTML(
      "O método",
      'Motor de<br>Autoridade <span class="hl">Kaleidos</span>',
      "Posicionar, Produzir, Converter: três movimentos, quatro fases, horizonte definido. Marca pessoal sem método é sorte.",
      false
    )}
    <div style="text-align:center;margin-bottom:44px;">
      <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px;font-family:Gridlite,monospace;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#14110D;">
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #7CF067;">Posicionar</span><span style="color:#D262B2;font-weight:800;">&middot;</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #D262B2;">Produzir</span><span style="color:#D262B2;font-weight:800;">&middot;</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 18px;box-shadow:3px 3px 0 #7CF067;">Converter</span>
      </div>
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
          paddingTop: 96,
          paddingBottom: 96,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: METODO_TOP_HTML }} />
        {/* ascii-scene: torus em ASCII reagindo ao mouse. Respiro visual. */}
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
      </div>
    </section>
  );
}

/* ─────────────────────── S7 · PROVA / CASES (dark) ─────────────────────── */
// Métricas 100% de src/lib/case-data.ts:
// investidor-4-20: 10x faturamento em 12 meses, IG 50k→180k, YT 200k→382k.
// layla-foz: 100k→172k, 20M+ views nos reels.
// defiverso: 12M views orgânicos em 90 dias, +8,6k seguidores em 3 meses.
const CASES_HTML = `
<section id="cases-kaleidos" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "Nossos cases",
      'Antes e depois,<br><span class="hl">com número</span>.',
      "Clientes da Kaleidos, com métrica publicada nos cases e fonte interna auditável.",
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
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">E o número que importa: faturamento 10x maior em 12 meses.</p>
        <a href="/cases/investidor-4-20" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="border:1.5px solid #3a332a;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px;">
          <div style="display:flex;justify-content:center;padding:5px 0;"><span style="width:44px;height:5px;border-radius:99px;background:#2a241d;display:inline-block;"></span></div>
          <img src="/Cases/layla-foz/conteudo/Capa_Reels4.webp" alt="Capa de reel publicado no perfil da Layla Foz" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Layla Foz · criadora</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">100k &rarr; 172k <span style="font-size:16px;color:#9a9186;font-weight:400;">seguidores</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">Mais de 20 milhões de views nos reels, sem descaracterizar a voz da criadora.</p>
        <a href="/cases/layla-foz" style="margin-top:16px;font-size:14px;font-weight:700;color:#D262B2;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="border:1.5px solid #3a332a;border-radius:14px;overflow:hidden;background:#000;margin-bottom:16px;">
          <div style="display:flex;justify-content:center;padding:5px 0;"><span style="width:44px;height:5px;border-radius:99px;background:#2a241d;display:inline-block;"></span></div>
          <img src="/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg" alt="Slide de carrossel publicado no Instagram do Defiverso" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Defiverso · audiência própria</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">12M views <span style="font-size:16px;color:#9a9186;font-weight:400;">orgânicos em 90 dias</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">8,6 mil seguidores novos em 3 meses, com o founder como principal canal de aquisição.</p>
        <a href="/cases/defiverso" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
    </div>
  </div>
</section>
`;

/* ─────────── S8 · QUALIFICADOR (claro) — "not for everyone" ─────────── */
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
          paddingTop: 96,
          paddingBottom: 96,
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
          lead="Marca pessoal é alavanca, não vaidade. Só funciona pra quem tem tese real e topa aparecer."
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
      </div>
    </section>
  );
}

/* ─────────────────────── S9 · OFERTA MARCA PESSOAL (dark) ───────────────────────
   ⚠️⚠️ PREÇO PÚBLICO — LER ANTES DE MEXER ⚠️⚠️

   RÉGUA VIGENTE (decisão Gabriel 08/08/2026; não alterar sem decisão nova):
   · Entrada ................... R$ 5.000/mês — 6 reels + 6 carrosséis ·
     postagem e agendamento · relatório mensal.
   · Completo Autoridade ....... R$ 7.000/mês  (mais escolhido · destacado)
     12 reels + 8 carrosséis · estratégia + relatório mensal.
   · Escala .................... R$ 12.900/mês — 20 reels + 20 carrosséis
     (~1 de cada por dia útil) · engajamento incluído (DM e comentários).
   · Contrato mínimo 6 meses. Setup, edição de vídeo, design e publicação
     INCLUSOS nos três planos. Podcast = projeto à parte, sem preço público.

   🎯 INTENÇÃO COMERCIAL (Gabriel, 08/08/2026) — NÃO DILUIR:
   a Entrada de R$5.000 existe pra fazer o Completo de R$7.000 parecer
   compensar. O salto fica explícito no badge do card ("+40% no preço ·
   2× os reels") e na nota abaixo da grade. O Completo é o destacado.

   ⚠️ DIVERGÊNCIAS ABERTAS:
   1. Founder Duo sem preço literal (valor antigo da planilha ficou abaixo da
      Entrada nova). NÃO inventar valor pro Duo.
   2. Diagnóstico de Posicionamento continua SEM PREÇO DEFINIDO no vault.
      NÃO inventar valor.
   3. Redes: os planos publicam em Instagram + TikTok. LinkedIn é a outra
      oferta (#linkedin-b2b), não um add-on daqui. */
const OFERTA_HTML = `
<section id="oferta" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "Oferta 1 · Marca Pessoal",
      'Preço na mesa,<br>antes da <span class="hl">call</span>.',
      "Pra você chegar na conversa já sabendo a ordem de grandeza, e decidir se faz sentido antes de gastar o seu tempo.",
      true
    )}

    <div class="mp-grid3" style="max-width:1120px;margin:0 auto;align-items:stretch;">

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Porta de entrada</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Entrada</h3>
        <div style="border-top:1px solid #2a241d;border-bottom:1px solid #2a241d;padding:16px 0;margin-bottom:18px;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:34px;line-height:1;color:#FAFAFA;">R$ 5.000<span style="font-size:15px;font-weight:400;color:#9a9186;">/mês</span></div>
          <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:8px;">setup, edição e design inclusos</div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">6 reels por mês</strong> (roteiro + edição)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">6 carrosséis por mês</strong> (design completo)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Postagem e agendamento por nossa conta</li>
          <li style="padding:7px 0;">Relatório mensal</li>
        </ul>
        <a href="${AGENDAR}?plano=entrada" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>

      <div style="background:#1d1812;border:2px solid #7CF067;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;box-shadow:6px 6px 0 #7CF067;position:relative;">
        <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:999px;padding:5px 14px;font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">o mais escolhido</span>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">O carro-chefe · done-for-you</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Completo Autoridade</h3>
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
        <a href="${AGENDAR}?plano=completo-autoridade" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:#7CF067;color:#06250a;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Volume máximo · operação inteira</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Escala</h3>
        <div style="border-top:1px solid #2a241d;border-bottom:1px solid #2a241d;padding:16px 0;margin-bottom:18px;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:34px;line-height:1;color:#FAFAFA;">R$ 12.900<span style="font-size:15px;font-weight:400;color:#9a9186;">/mês</span></div>
          <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:8px;">engajamento incluído</div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">20 reels por mês</strong> (roteiro + edição)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">20 carrosséis por mês</strong> (~1 de cada por dia útil)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#D262B2;">Engajamento incluído</strong>: DM e comentários</li>
          <li style="padding:7px 0;"><strong style="color:#FAFAFA;">Estratégia</strong> e relatório</li>
        </ul>
        <a href="${AGENDAR}?plano=escala" class="cta-btn" style="margin-top:20px;display:inline-flex;justify-content:center;background:transparent;color:#D262B2;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #D262B2;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>
    </div>

    <p style="max-width:720px;margin:28px auto 0;text-align:center;font-size:14.5px;line-height:1.6;color:#d8d1c6;">Da Entrada pro Completo, o preço sobe <strong style="color:#FAFAFA;">40%</strong> e a produção de reels <strong style="color:#7CF067;">dobra</strong>: de 6 pra 12 por mês, com a estratégia junto. É por isso que a maioria não fica na Entrada.</p>

    <div class="mp-grid2" style="max-width:1120px;margin:40px auto 0;">
      <div style="background:#1d1812;border:1.5px dashed #D262B2;border-radius:16px;padding:24px 26px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Dois sócios · Founder Duo</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Duas marcas pessoais em coordenação, sem canibalizar a narrativa da empresa. Não é um quarto plano: é a mesma régua aplicada a dois perfis, orçada por escopo. <a href="${AGENDAR}?plano=founder-duo" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">${CTA_PRIMARY}</a></p>
      </div>
      <div style="background:#1d1812;border:1.5px dashed #7CF067;border-radius:16px;padding:24px 26px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Sem retainer · Diagnóstico de Posicionamento</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Leitura dos perfis, tese preliminar e roadmap, sem recorrência. Valor definido na conversa. <a href="${AGENDAR}?plano=diagnostico" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">${CTA_PRIMARY}</a></p>
      </div>
    </div>

    <div style="max-width:1120px;margin:40px auto 0;background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:22px 26px;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;margin-bottom:12px;">Como começa</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:13.5px;color:#d8d1c6;">
        <span style="background:#14110D;border:1.5px solid #3a332a;border-radius:10px;padding:10px 14px;"><strong style="color:#FAFAFA;">01</strong> · Call de 30 min (qualificação, não venda)</span>
        <span style="color:#7CF067;">&rarr;</span>
        <span style="background:#14110D;border:1.5px solid #3a332a;border-radius:10px;padding:10px 14px;"><strong style="color:#FAFAFA;">02</strong> · Proposta com escopo fechado, por escrito</span>
        <span style="color:#7CF067;">&rarr;</span>
        <span style="background:#14110D;border:1.5px solid #3a332a;border-radius:10px;padding:10px 14px;"><strong style="color:#FAFAFA;">03</strong> · Setup e imersão de voz, inclusos no plano</span>
      </div>
    </div>

    <p style="text-align:center;font-size:13.5px;color:#9a9186;max-width:640px;margin:32px auto 0;">Contrato mínimo de 6 meses. Sem adicional pra escolher: o que está no card é o que está no contrato. Nada é publicado sem a sua aprovação.</p>
  </div>
</section>
`;

/* ────────────── S10 · LINKEDIN B2B PARA EMPRESAS (claro) ──────────────
   SEGUNDA oferta (06/08/2026), deliberadamente separada do plano acima.
   A ESTRUTURA foi modelada em um player brasileiro de referência; a copy é
   nossa e o nome dele não aparece. Não introduzir menção a concorrente.

   ⚠️ PREÇO (decisão Gabriel 08/08/2026): Starter R$ 4.250 / Full Service
   R$ 5.900 / LinkedIn 360° R$ 9.900. Contrato mínimo de 6 MESES: a exceção
   de 3 meses existiu na régua de 08/08 e foi ELIMINADA (decisão Gabriel,
   2026-08: contrato de 6 meses em tudo). Mesma mudança aplicada em
   src/lib/pricing.ts (minMonths: 6 nos três pacotes).

   🔴 "SINAIS DE INTENÇÃO" — LER ANTES DE EDITAR:
   · ⚠️⚠️ NUNCA prometer "lista de quem interagiu" / "nome, cargo e empresa
     de quem engajou". Auditoria técnica (code/sequencia-viral/docs/
     SPEC-LINKEDIN-2026-08.md §5) confirmou na doc oficial do LinkedIn que
     isso NÃO é possível de forma legítima: r_member_social é permissão
     fechada e o autor em Company Page volta como URN opaco. Lista nominal
     só sai por scraping de sessão, que viola o User Agreement e arrisca a
     conta DO CLIENTE. A negativa explícita abaixo é argumento de venda:
     MANTER.
   · O que a oferta entrega (verificável): métricas oficiais por post
     (visitas ao perfil + seguidores ganhos), capturas reais de lead magnet
     em landing própria, fila de follow-up assistida (a gente redige, o
     cliente envia).
   · 🔴 NUNCA citar nome de ferramenta de terceiro (nem nome, nem link).
   · ⚠️ NÃO escrever integração com CRM, alerta em tempo real, score,
     enriquecimento de dados nem limite de leads. Nada disso confirmado.
   · ⚠️ Periodicidade do relatório: "periódico" de propósito.
   ⚠️ Nenhum número de resultado, logo ou depoimento nesta seção: não há
   case de LinkedIn B2B publicado ainda. */
const LINKEDIN_B2B_HTML = `
<section id="linkedin-b2b" style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:96px;padding-bottom:96px;">

    <div style="max-width:680px;margin:0 auto 44px;text-align:center;">
      <span style="display:inline-block;background:#D262B2;color:#FAFAFA;border:1.5px solid #14110D;border-radius:999px;padding:7px 18px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;box-shadow:3px 3px 0 #14110D;">Oferta 2 &middot; pra empresas</span>
      <p style="font-size:15px;line-height:1.6;color:#6b6258;margin:20px 0 0;">Tudo acima é marca pessoal de pessoa física, no Instagram. Isto aqui é outro produto, contratado pela empresa.</p>
    </div>

    ${headHTML(
      "LinkedIn B2B para empresas",
      'O perfil do seu executivo<br>vira canal de <span class="hl">demanda</span>.',
      "Pra empresa B2B de ticket alto e ciclo longo: a gente usa o LinkedIn de quem decide na sua empresa pra gerar conversa comercial com quem decide na empresa do cliente.",
      false
    )}

    <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:0 0 48px;">
      <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 18px;font-size:13.5px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #D262B2;">Venda B2B complexa</span>
      <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 18px;font-size:13.5px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #7CF067;">Ticket alto</span>
      <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 18px;font-size:13.5px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #D262B2;">Ciclo de meses, várias cabeças</span>
    </div>

    <div style="max-width:1000px;margin:0 auto;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:18px;">Como funciona &middot; quatro passos</div>
      <div class="mp-grid4">
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;-webkit-text-stroke:1.4px #14110D;">01</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Imersão</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">O que você vende, pra quem, contra quem, e quais objeções travam a venda hoje.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;-webkit-text-stroke:1.4px #14110D;">02</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Estratégia</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Tese pública do executivo, pilares amarrados nas objeções da venda e calendário. Você aprova antes.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#7CF067;-webkit-text-stroke:1.4px #14110D;">03</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Produção completa</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Redação, design, edição e publicação por nossa conta. O executivo dá ponto de vista e aprova.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 20px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
          <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;-webkit-text-stroke:1.4px #14110D;">04</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;color:#14110D;margin:12px 0 8px;">Sinais de Intenção</h3>
          <p style="font-size:13.5px;line-height:1.55;color:#4a443c;margin:0;">Cada post devolve visitas ao perfil e seguidores gerados; cada material de captura devolve contato real de quem baixou.</p>
        </div>
      </div>
      <div style="background:#fff;border:1.5px dashed #14110D;border-radius:14px;padding:18px 22px;margin-top:16px;">
        <p style="font-size:13.5px;line-height:1.6;color:#4a443c;margin:0 0 12px;"><strong style="color:#14110D;">O que "Sinais de Intenção" é, na prática.</strong> Três coisas, todas entregáveis de forma legítima:</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#4a443c;">
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Métricas oficiais por post</strong>, incluindo visitas ao perfil e seguidores que cada conteúdo gerou.</li>
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Contatos capturados de verdade</strong>: quem baixa o material deixa nome e e-mail por vontade própria, numa landing nossa.</li>
          <li style="padding:7px 0;"><strong style="color:#14110D;">Fila de follow-up assistida</strong>: a gente redige a mensagem com o gancho do post; quem envia é o seu time.</li>
        </ul>
        <p style="font-size:12.5px;line-height:1.6;color:#6b6258;margin:14px 0 0;">Uma coisa que a gente não promete: lista nominal de quem curtiu ou comentou. A API oficial do LinkedIn não libera isso pra perfil pessoal, e o único jeito de conseguir é por automação que põe a conta do seu executivo em risco. Preferimos um e-mail dado de livre vontade a um nome raspado.</p>
      </div>
    </div>

    <div style="max-width:1100px;margin:52px auto 0;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:18px;">Done for you &middot; três escopos</div>
      <div class="mp-grid3">

        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #7CF067;display:flex;flex-direction:column;">
          <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Escopo 1</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;color:#14110D;margin:10px 0 6px;">Starter</h3>
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Pra 1 perfil que já publica e falta cadência e conversão.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#14110D;">R$ 4.250<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 6 meses</div>
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
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Pra transformar 1 perfil em canal de geração de demanda.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#D262B2;">R$ 5.900<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 6 meses</div>
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
          <p style="font-size:13.5px;line-height:1.6;color:#6b6258;margin:0 0 18px;">Pra múltiplos perfis de executivos + Company Page.</p>
          <div style="border-top:1px solid #efe9df;border-bottom:1px solid #efe9df;padding:14px 0;margin-bottom:16px;">
            <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#14110D;">R$ 9.900<span style="font-size:14px;font-weight:400;color:#8a8175;">/mês</span></div>
            <div style="font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin-top:7px;">contrato de 6 meses</div>
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
      <p style="font-size:12.5px;line-height:1.55;color:#8a8175;margin:16px 0 0;text-align:center;">Contrato mínimo de 6 meses, como em toda oferta da casa. O escopo fechado (quantos executivos, quais formatos) sai por escrito na proposta.</p>
    </div>

    <p style="text-align:center;font-size:13px;color:#8a8175;margin:32px auto 0;max-width:640px;">Esta oferta acabou de entrar no catálogo, então não tem case publicado ainda. Preferimos dizer isso a mostrar número de terceiro como se fosse nosso.</p>
  </div>
</section>
`;

/* ─────────────────────── S11 · FAQ (claro) ─────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Não tenho tempo pra isso.",
    a: "Por isso o modelo existe. Você entra com cerca de 2 horas por mês: gravação dirigida em bloco e uma reunião de leitura. O resto é da Kaleidos.",
  },
  {
    q: "Não sei o que postar.",
    a: "Não precisa saber. A fase de fundação extrai da sua história a tese e os pilares, e o calendário editorial chega pronto pra você aprovar todo mês.",
  },
  {
    q: "Isso é escrito por IA? Vai soar como robô?",
    a: "IA entra na velocidade: pesquisa, variação de hook, primeira versão. A voz vem de imersão real com você. O critério é simples: se não parecer você lendo em voz alta, a peça volta pra mesa. E você aprova tudo antes de publicar.",
  },
  {
    q: "Quanto tempo até dar resultado?",
    a: "Horizontes claros: mês 1 é fundação, mês 3 é tração, mês 6 é autoridade com pipeline atribuível. Quem promete viral em 2 semanas está vendendo loteria.",
  },
  {
    q: "Quanto custa?",
    a: "Marca pessoal: Entrada R$ 5.000/mês (6 reels + 6 carrosséis), Completo Autoridade R$ 7.000/mês (12 reels + 8 carrosséis, com estratégia) e Escala R$ 12.900/mês (20 + 20, com engajamento incluso), sempre em Instagram e TikTok. LinkedIn B2B: R$ 4.250, R$ 5.900 ou R$ 9.900/mês. Contrato mínimo de 6 meses em tudo, com setup, edição, design e publicação inclusos. O valor fica aberto na página de propósito: se não couber no seu momento, você descobre aqui, não depois de uma reunião.",
  },
  {
    q: "Qual a diferença entre Marca Pessoal e LinkedIn B2B?",
    a: "São duas ofertas separadas. Marca Pessoal é da pessoa física: audiência própria em Instagram e TikTok, com reels e carrosséis. LinkedIn B2B é contratada pela empresa: o perfil do executivo vira canal de demanda, com conteúdo de tese e Sinais de Intenção. Dá pra rodar as duas juntas, e a gente diz na call se só uma já resolve.",
  },
  {
    q: "Já tenho agência (ou time interno). Conflita?",
    a: "Normalmente soma: sua agência cuida da marca da empresa, a gente cuida do perfil de quem assina. Onde há sobreposição, a gente se acerta com o seu time no kickoff.",
  },
  {
    q: "E se eu não gostar do que vocês produzirem?",
    a: "Você aprova antes. Calendário e cada peça passam pela sua mão antes de ir ao ar: nada é publicado sem o seu sim. Os primeiros dois meses são justamente de calibragem de voz.",
  },
];

const FAQ_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:820px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "FAQ",
      'As objeções.<br><span class="hl">Respondidas</span>.',
      "Tempo, IA, preço, contrato e aprovação: respondido antes de virar atrito.",
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

/* ─────────────────────── S12 · CTA FINAL (dark) ─────────────────────── */
const CTA_FINAL_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:6%;top:20%;width:clamp(48px,6vw,80px);animation:starspin 26s linear infinite;opacity:.85;pointer-events:none;">
  <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:7%;bottom:18%;width:clamp(40px,5vw,64px);animation:starspin2 20s linear infinite;opacity:.8;pointer-events:none;">
  <div class="mp-pad" style="position:relative;max-width:840px;margin:0 auto;padding-top:100px;padding-bottom:100px;text-align:center;">
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

        {/* S1 · Hero "parede de prova" (conteúdo real) */}
        <HeroSection />

        {/* Marquee de logos de clientes (prova social imediata) */}
        <Web3V2ClientsMarquee />

        {/* S2 · Bifurcação: duas ofertas, dois clientes, cedo na página */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: BIFURCACAO_HTML }} />
        </Reveal>

        {/* S3 · Problema */}
        <Reveal>
          <ProblemaSection />
        </Reveal>

        {/* S4 · Um número só — a única estatística de mercado da página */}
        <Reveal>
          <NumeroSection />
        </Reveal>

        {/* S5 · O que fazemos (você grava, a gente faz o resto) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAZEMOS_HTML }} />
        </Reveal>

        {/* S6 · O método (stepper auto-rotativo) */}
        <Reveal>
          <MetodoSection />
        </Reveal>

        {/* S7 · Prova / cases (métricas de case-data.ts) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: CASES_HTML }} />
        </Reveal>

        {/* S8 · Qualificador — não é pra todo mundo */}
        <Reveal>
          <QualificadorSection />
        </Reveal>

        {/* S9 · Oferta 1 — Marca Pessoal (preço público) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: OFERTA_HTML }} />
        </Reveal>

        {/* S10 · Oferta 2 — LinkedIn B2B para empresas, separada */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: LINKEDIN_B2B_HTML }} />
        </Reveal>

        {/* S11 · FAQ */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAQ_HTML }} />
        </Reveal>

        {/* S12 · CTA final */}
        <div dangerouslySetInnerHTML={{ __html: CTA_FINAL_HTML }} />

        {/* Footer (WhatsApp flutuante já vem do layout raiz) */}
        <Reveal>
          <FooterDemo />
        </Reveal>
      </main>
    </>
  );
}
