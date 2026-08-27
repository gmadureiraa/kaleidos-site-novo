import type { Metadata } from "next";
import Link from "next/link";
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
import { getPublishedPostCardsByCategoryAsync } from "@/lib/blog-data";
import { KALEIDOS_PROOF } from "@/lib/metrics";

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
 * cansativa"). Primeira rodada: ~16 → 12 seções. O que SAIU lá (não recriar
 * sem pedido novo): grade de 4 stats de mercado, "O que é Founder-Led
 * Growth", "O que você recebe", timeline de dores, tabelas comparativas,
 * prints Lucas→Defiverso, galeria "Na prática, no feed", "Como começa".
 *
 * ⚠️ RECONSTRUÇÃO 08/08/2026 (4 decisões do Gabriel + benchmark em
 * docs/BENCHMARK-LP-MARCA-PESSOAL-2026-08-08.md): 12 → 9 seções.
 * O que SAIU e por quê (não recriar sem decisão nova):
 * · Bifurcação "Dois caminhos" (S2): nenhuma LP boa do benchmark faz o
 *   visitante escolher antes de entender a oferta.
 * · "Um número só" (S4): o 2,75× da Refine Labs foi FUNDIDO na seção de
 *   problema como remate factual (fonte visível mantida).
 * · Grades "Oferta 1 · planos" (S9) e "Oferta 2 · escopos LinkedIn" (S10):
 *   decisão 08/08 — nem o ESCOPO CONTÁVEL (6+6, 12+8, 20+20, 12/20/40) fica
 *   na página. Viraram UMA seção "Duas formas de trabalhar": 2 cards com
 *   4 bullets qualitativos, sem volume, sem preço. Escopo e valores só na
 *   proposta privada (plano.kaleidos.com.br/marca-pessoal), depois da call.
 * · Qualificador "não é pra todo mundo" (S8): MANTIDO comprimido como strip
 *   dentro de "Duas formas de trabalhar" (melhor ponte pro CTA, benchmark
 *   §6.2), sem seção própria.
 * · FAQ "Quanto custa?" reescrita: NÃO relistar escopo (a tabela tinha
 *   voltado pela FAQ). Sem faixa de preço em real (decisão pendente).
 * · "Faturamento 10x maior" REMOVIDO da página: case-data.ts marca NÃO
 *   RASTREADO (e audiences.ts diz "5x" pro mesmo case). Só volta como
 *   citação atribuída ao Lucas COM autorização por escrito registrada.
 * O que a seção de prova GANHOU: janela/data de apuração em cada card, link
 * de verificação pro perfil público, screenshot REAL de painel nativo no
 * card Defiverso (public/Cases/defiverso/estudo/metricas-instagram.png) e
 * linha "o que a Kaleidos fez". Micro-rodapé com a apuração Apify 08/08.
 *
 * ⚠️ MUDANÇA DE POLÍTICA (decisão Gabriel 08/08/2026): NENHUM preço nesta
 * página. NÃO reintroduzir valor em real aqui sem decisão nova. A calculadora
 * /orcamento (src/lib/pricing.ts) segue mostrando preço e NÃO muda.
 *
 * ⚠️ HIERARQUIA DE CTA: uma ação primária (/agendar, rótulo CTA_PRIMARY) e uma
 * secundária (auditoria no WhatsApp). Não introduzir um terceiro rótulo.
 */

const CANONICAL = "/marca-pessoal";
const TITLE = "Marca Pessoal para Founders | Founder-Led Growth — Kaleidos";
const DESC =
  "Founder-Led Growth para founders de cripto, web3 e fintech. A Kaleidos transforma a expertise do founder em autoridade, e autoridade em pipeline. Marca pessoal em Instagram e TikTok (você grava, a gente faz o resto) e LinkedIn B2B para empresas. Proposta por escrito, com escopo e valores, depois de uma call de 30 minutos.";

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
                  Sem preço na página, o CTA é quem qualifica: o rótulo promete
                  a PROPOSTA (que traz os valores por escrito), não uma call
                  genérica de vendas.
   · SECUNDÁRIA → auditoria gratuita no WhatsApp, sempre visualmente mais
                  discreta (outline no hero/CTA final, link de texto no resto).
   Nenhum outro rótulo de CTA deve ser introduzido nesta página. */
const CTA_PRIMARY = "Receber a proposta &rarr;";
const CTA_PRIMARY_JSX = "Receber a proposta →";
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
  .kv2 .mp-wall-caption{display:none;}
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
  { src: "/Cases/layla-foz/conteudo/Capa_Reels1.webp", alt: "Capa de reel publicado no perfil da LaylÃ¤ FÃ¶z" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DO9ZQ2_kirU-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/neobankless/conteudo/instagram/post-dolarizar.jpg", alt: "Post publicado no Instagram da NBS Finance" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels3.webp", alt: "Capa de reel publicado no perfil da LaylÃ¤ FÃ¶z" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DWFG0_kCUuF-capa.jpg", alt: "Capa de reel publicado no Instagram do Defiverso" },
];
const WALL_COL_B: { src: string; alt: string }[] = [
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU8ZciOkcLo-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTQy_Bbkkzo-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels2.webp", alt: "Capa de reel publicado no perfil da LaylÃ¤ FÃ¶z" },
  { src: "/Cases/neobankless/conteudo/instagram/post-global.jpg", alt: "Post publicado no Instagram da NBS Finance" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DXeZ4I2EYiE-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DTi3Re1Eox--capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
];
const WALL_COL_C: { src: string; alt: string }[] = [
  { src: "/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DOO62uUEvMu-capa.jpg", alt: "Capa de reel publicado no perfil do Lucas Amendola" },
  { src: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DYFTrH5jGL9-slide-01.jpg", alt: "Slide de carrossel publicado no Instagram do Defiverso" },
  { src: "/Cases/neobankless/conteudo/instagram/post-cartao.jpg", alt: "Post publicado no Instagram da NBS Finance" },
  { src: "/Cases/layla-foz/conteudo/Capa_Reels4.webp", alt: "Capa de reel publicado no perfil da LaylÃ¤ FÃ¶z" },
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
            {/* Transparência de processo: escopo e valores vivem na proposta. */}
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "#d8d1c6",
                margin: "22px 0 0",
              }}
            >
              A proposta chega{" "}
              <strong style={{ color: "#FAFAFA" }}>por escrito</strong>, com
              escopo fechado e valores abertos, depois de uma call de 30
              minutos.
            </p>
            {/* Legenda da parede desktop: some junto com a .mp-wall (≤1060px),
                onde a faixa mobile tem a própria legenda. */}
            <p
              className="mp-wall-caption"
              style={{
                fontFamily: "Gridlite, monospace",
                fontSize: 11.5,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#9a9186",
                margin: "20px 0 0",
              }}
            >
              conteúdo real publicado em perfis de clientes. nada de mockup.
              &rarr;
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

/* ────────────────────── S2 · PROBLEMA (claro) ──────────────────────
   Reescrita 08/08/2026 (benchmark §3): sintomas que o FOUNDER se reconhece
   tendo, no idioma cripto/web3/fintech — não descrições de terceiros.
   A seção ABSORVE o único stat de mercado da página (2,75× Refine Labs,
   fonte visível obrigatória) como remate factual. Se surgir stat novo, ele
   SUBSTITUI este, nunca vira grade. O remate "Ainda bem que não precisa."
   é a melhor linha da seção: MANTER. */
const SINTOMAS = [
  {
    t: "Sua tese está na sua cabeça, não no feed.",
    d: "Quem pesquisa seu nome não encontra o que você pensa sobre o mercado. Encontra silêncio.",
  },
  {
    t: "O último post do seu perfil é de um ciclo atrás.",
    d: "Em cripto, perfil parado desde a última alta passa a mensagem errada sobre a empresa inteira.",
  },
  {
    t: "Você já tentou sozinho: foram 3 posts, e parou.",
    d: "Ninguém viu, você desanimou, e o algoritmo enterrou o alcance de quem some.",
  },
  {
    t: "Seu concorrente tem metade do seu track record e o dobro do palco.",
    d: "E é ele que o podcast chama, que o painel convida, que o mercado cita.",
  },
  {
    t: "O investidor te pesquisou antes da call.",
    d: "A due diligence de confiança começou sem você na sala. O que ele achou responde por você.",
  },
  {
    t: "Você só aparece quando o mercado cai.",
    d: "Aí todo mundo aparece ao mesmo tempo, e ninguém constrói autoridade no meio do pânico.",
  },
];

function ProblemaSection() {
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
          maxWidth: 1100,
          margin: "0 auto",
          paddingTop: 96,
          paddingBottom: 96,
        }}
      >
        <SectionHead
          eyebrow="O problema"
          title={
            <>
              Seu perfil deveria abrir portas.{" "}
              <span className="hl">Hoje ele abre dúvida.</span>
            </>
          }
          lead="O mercado te pesquisa antes de responder seu e-mail. Se você se reconhecer em três frases abaixo, esta página é pra você."
        />
        <div className="mp-grid2" style={{ maxWidth: 980, margin: "0 auto" }}>
          {SINTOMAS.map((s) => (
            <div
              key={s.t}
              style={{
                background: "#fff",
                border: "1.5px solid #14110D",
                borderRadius: 14,
                padding: "18px 20px",
                boxShadow: "4px 4px 0 #e8e2d8",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1.35,
                  margin: 0,
                  color: "#14110D",
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "#6b6258",
                  margin: "6px 0 0",
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>

        {/* Remate factual: o ÚNICO stat de mercado da página, com fonte. */}
        <div
          style={{
            maxWidth: 760,
            margin: "56px auto 0",
            textAlign: "center",
            borderTop: "1.5px solid #14110D",
            paddingTop: 40,
          }}
        >
          <div
            style={{
              fontFamily: "Atelier, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(64px,10vw,120px)",
              lineHeight: 1,
              letterSpacing: "-3px",
              color: "#14110D",
            }}
          >
            <AnimatedNumber value={2.75} suffix="×" decimals={2} />
          </div>
          <p
            style={{
              fontSize: "clamp(16px,2vw,19px)",
              lineHeight: 1.55,
              color: "#4a443c",
              maxWidth: 520,
              margin: "18px auto 0",
            }}
          >
            mais impressões publicando{" "}
            <strong style={{ color: "#14110D" }}>o mesmo conteúdo</strong> no
            perfil pessoal do que na página da empresa. É por isso que a aposta
            é no seu rosto, não na logo.
          </p>
          <p
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#8a8175",
              margin: "14px 0 0",
            }}
          >
            Fonte: Refine Labs (experimento de agência)
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(19px,2.4vw,26px)",
              lineHeight: 1.35,
              color: "#14110D",
              margin: 0,
            }}
          >
            Você não tem tempo pra virar creator.{" "}
            <span
              style={{
                background: "#7CF067",
                color: "#14110D",
                padding: ".04em .18em",
                borderRadius: 6,
              }}
            >
              Ainda bem que não precisa.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── S3 · O QUE FAZEMOS (dark) ─────────────────────── */
// ⚠️ 19/08/2026 — o bullet "Tese inicial e calendário aprovado por você" dizia
// antes "(estratégia contínua a partir do Completo)". "o Completo" é nome de
// degrau interno (founder-completo-autoridade, em src/lib/pricing.ts) que esta
// página NUNCA define — por decisão do Gabriel de 08/08 a /marca-pessoal não
// traz escopo contável nem preço. Era referência órfã: o lead lia uma condição
// atrelada a um plano que não existe na página. Removida.
// ⛔ Não citar nome de degrau aqui. Nota em JS de propósito: comentário HTML
// dentro deste template literal vai parar no view-source do site.
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
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Tese inicial e calendário aprovado por você</li>
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

/* ─────────────────────── S4 · O MÉTODO (claro) ─────────────────────── */
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

/* ─────────────────────── S5 · PROVA / CASES (dark) ───────────────────────
   Reescrita 08/08/2026 (benchmark §4). Cada card tem 5 elementos: métrica +
   janela/data de apuração, caminho de verificação (link pro perfil público),
   prova visual, linha "o que a Kaleidos fez" e link pro case.
   Métricas 100% de src/lib/case-data.ts:
   · investidor-4-20: IG 173 mil (173.050 lido via Apify em 08/08/2026).
     ⚠️ "10x faturamento" NÃO entra: sem fonte primária no vault (e audiences.ts
     chegou a publicar "5x" pro mesmo case). Sem autorização por escrito do
     Lucas, nem como citação. YouTube 200k→382k: fora — o print do canal mostra
     386 mil, e a baseline de 200k não tem fonte.
     ⚠️ 19/08/2026: a BASELINE "50k" também saiu. Só existe em
     `docs/cases-estudo.txt:9`, questionário sem data e sem autor, e não há
     snapshot histórico do perfil. Sem baseline confiável, o "50k → 173k" afirma
     um crescimento que a gente não consegue provar — que é exatamente o que
     esta página promete não fazer. Ficou só a ponta com print.
   · layla-foz: 177 mil (176.960 via Apify em 08/08/2026).
     ⚠️ 19/08/2026: baseline "100k" e "20M+ views" SAÍRAM, mesma razão —
     origem única em `docs/cases-estudo.txt:33`, sem print e sem janela.
   · defiverso: 12M views orgânicos em 90 dias — prova visual é o SCREENSHOT
     REAL do Instagram Insights (estudo/metricas-instagram.png, período
     02/08–30/10 visível, orgânico 12.000.732). Não trocar por capa.
   ⚠️ GRAFIA: "Laylä Föz" com trema é estilização dela (fullName do perfil),
   NÃO typo. Já foi "corrigido" por engano e revertido. Não normalizar. */
const VERIFY_LINK = (href: string, label: string, color: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer" style="font-size:13px;font-weight:700;color:${color};text-decoration:underline;text-underline-offset:3px;">${label} &nearr;</a>`;
const CASES_HTML = `
<section id="cases-kaleidos" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "Nossos cases",
      'O número que dá<br><span class="hl">pra conferir</span>.',
      "Todo número aqui tem origem, data e um caminho pra você checar agora. O que a gente não consegue provar, não publica.",
      true
    )}
    <!-- ⚠️ Os três números destes cards vêm de KALEIDOS_PROOF (src/lib/metrics.ts),
         a fonte única de número em copy da Kaleidos. Estavam hardcoded como texto
         dentro desta string HTML ("173 mil", "177 mil", "12M views") — batiam com o
         canônico por coincidência, e atualizar metrics.ts não atualizava aqui.
         Ligados ao import em 26/08/2026. Se precisar de um número que não está em
         KALEIDOS_PROOF, PARE e peça apuração; não escreva o número aqui. -->
    <div class="mp-grid3">

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Lucas Amendola &middot; Investidor 4.20</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 2px;color:#FAFAFA;">${KALEIDOS_PROOF.lucasInstagram.value} <span style="font-size:16px;color:#9a9186;font-weight:400;">seguidores no Instagram</span></div>
        <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin:6px 0 14px;">lido direto no perfil em 08/2026</div>
        <div style="border:1.5px solid #3a332a;border-radius:12px;overflow:hidden;background:#000;margin-bottom:14px;">
          <img src="/Cases/investidor-4-20/conteudo/portfolio-novos/dfv-DZlGIGoRnew-capa.jpg" alt="Capa de reel publicado no perfil do Lucas Amendola" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <p style="font-size:13.5px;line-height:1.55;color:#b8b1a6;margin:0;flex:1;"><strong style="color:#d8d1c6;">O que fizemos:</strong> roteiro e edi&ccedil;&atilde;o de reels e YouTube, newsletter do zero e estrutura comercial.</p>
        <div style="margin-top:16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;">
          ${VERIFY_LINK("https://www.instagram.com/lucas.amendolaa/", "Confira ao vivo: @lucas.amendolaa", "#7CF067")}
          <a href="/cases/investidor-4-20" style="font-size:13px;color:#9a9186;text-decoration:underline;text-underline-offset:3px;">Ver o case &rarr;</a>
        </div>
      </div>

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 24px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Layl&auml; F&ouml;z &middot; criadora</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 2px;color:#FAFAFA;">${KALEIDOS_PROOF.laylaInstagram.value} <span style="font-size:16px;color:#9a9186;font-weight:400;">seguidores</span></div>
        <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin:6px 0 14px;">lido direto no perfil em 08/2026</div>
        <div style="border:1.5px solid #3a332a;border-radius:12px;overflow:hidden;background:#000;margin-bottom:14px;">
          <img src="/Cases/layla-foz/conteudo/Capa_Reels4.webp" alt="Capa de reel publicado no perfil da Laylä Föz" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <p style="font-size:13.5px;line-height:1.55;color:#b8b1a6;margin:0;flex:1;"><strong style="color:#d8d1c6;">O que fizemos:</strong> roteiro e edi&ccedil;&atilde;o dos reels e da newsletter, sem descaracterizar a voz dela.</p>
        <div style="margin-top:16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;">
          ${VERIFY_LINK("https://www.instagram.com/laylafoz/", "Confira ao vivo: @laylafoz", "#D262B2")}
          <a href="/cases/layla-foz" style="font-size:13px;color:#9a9186;text-decoration:underline;text-underline-offset:3px;">Ver o case &rarr;</a>
        </div>
      </div>

      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:26px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Defiverso &middot; audi&ecirc;ncia pr&oacute;pria</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 2px;color:#FAFAFA;">${KALEIDOS_PROOF.defiversoViews.value} views <span style="font-size:16px;color:#9a9186;font-weight:400;">org&acirc;nicos</span></div>
        <div style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;margin:6px 0 14px;">em 90 dias &middot; per&iacute;odo vis&iacute;vel no painel abaixo</div>
        <div style="border:1.5px solid #3a332a;border-radius:12px;overflow:hidden;background:#fff;margin-bottom:14px;">
          <img src="/Cases/defiverso/estudo/metricas-instagram.png" alt="Painel nativo do Instagram Insights do Defiverso: 12.000.732 visualizações orgânicas no período de 90 dias exibido no gráfico" loading="lazy" decoding="async" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;">
        </div>
        <p style="font-size:13.5px;line-height:1.55;color:#b8b1a6;margin:0;flex:1;"><strong style="color:#d8d1c6;">O que fizemos:</strong> conte&uacute;do org&acirc;nico di&aacute;rio (reels, carross&eacute;is, memes) e funil de e-mail.</p>
        <div style="margin-top:16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;">
          <span style="font-size:13px;color:#9a9186;">O print acima &eacute; o painel nativo, sem retoque.</span>
          <a href="/cases/defiverso" style="font-size:13px;color:#9a9186;text-decoration:underline;text-underline-offset:3px;">Ver o case &rarr;</a>
        </div>
      </div>
    </div>

    <p style="max-width:720px;margin:28px auto 0;text-align:center;font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#8a8175;line-height:1.8;">seguidores lidos direto dos perfis p&uacute;blicos em 08/08/2026: lucas 173.050 &middot; layl&auml; f&ouml;z 176.960. nenhum n&uacute;mero desta se&ccedil;&atilde;o &eacute; estimado.</p>

    <!-- ⚠️ Operações de founder brand em andamento — cases QUALITATIVOS (roteados 19/08/2026).
         Entram SEM número de resultado de propósito: começaram em jul-ago/2026 e nenhum
         ciclo mensal fechou com apuração. NÃO adicionar métrica aqui sem fonte e data —
         a seção acima promete que todo número tem origem verificável, e essa promessa é
         o ativo mais caro da página. Se um dia houver apuração, ela vira card lá em cima. -->
    <div style="max-width:900px;margin:40px auto 0;padding-top:28px;border-top:1px solid #3a332a;text-align:center;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;">Em opera&ccedil;&atilde;o agora &middot; ciclo ainda aberto</div>
      <p style="font-size:14px;line-height:1.7;color:#b8b1a6;margin:12px 0 0;">Tr&ecirc;s marcas pessoais de founder que come&ccedil;aram em 2026 e ainda n&atilde;o fecharam janela de apura&ccedil;&atilde;o. Publicamos o que <strong style="color:#d8d1c6;">foi feito</strong>, n&atilde;o quanto rendeu &mdash; o n&uacute;mero entra quando houver de onde conferir.</p>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
        <a href="/cases/matheus-fassheber" style="font-size:13px;color:#FAFAFA;text-decoration:underline;text-underline-offset:3px;">Matheus Fassheber &middot; NBS Finance &rarr;</a>
        <span style="color:#4a443c;">/</span>
        <a href="/cases/gui-campos" style="font-size:13px;color:#FAFAFA;text-decoration:underline;text-underline-offset:3px;">Gui Campos &middot; DSEC &rarr;</a>
        <span style="color:#4a443c;">/</span>
        <a href="/cases/leo-maximiliano" style="font-size:13px;color:#FAFAFA;text-decoration:underline;text-underline-offset:3px;">L&eacute;o Maximiliano &middot; DSEC &rarr;</a>
      </div>
    </div>
  </div>
</section>
`;

/* ────────── S6 · DUAS FORMAS DE TRABALHAR (claro) ──────────
   Substitui 3 seções antigas (bifurcação + grade de planos Marca Pessoal +
   grade de escopos LinkedIn B2B). Decisão Gabriel 08/08/2026: NEM ESCOPO
   CONTÁVEL nem preço na página. Formato ContentLead: 2 cards, 4 bullets
   qualitativos, CTA igual. Escopo contável e valores vivem SÓ na proposta
   privada (plano.kaleidos.com.br/marca-pessoal) e em src/lib/pricing.ts
   (/orcamento). NÃO reintroduzir volume (reels/mês) nem real aqui.

   O qualificador "não é pra todo mundo" vive COMPRIMIDO aqui embaixo como
   strip (decisão 08/08: manter, sem seção própria — é a ponte pro CTA).

   🔴 "SINAIS DE INTENÇÃO" — LER ANTES DE EDITAR:
   · ⚠️⚠️ NUNCA prometer "lista de quem interagiu" / "nome, cargo e empresa
     de quem engajou". Auditoria técnica (code/sequencia-viral/docs/
     SPEC-LINKEDIN-2026-08.md §5): r_member_social é permissão fechada e
     lista nominal só sai por scraping que viola o User Agreement e arrisca
     a conta DO CLIENTE. A negativa explícita abaixo é argumento de venda:
     MANTER SEMPRE.
   · O que a oferta entrega (verificável): métricas oficiais por post,
     capturas reais de lead magnet em landing própria, fila de follow-up
     assistida (a gente redige, o cliente envia).
   · 🔴 NUNCA citar nome de ferramenta de terceiro.
   ⚠️ Sem número de resultado/logo/depoimento de LinkedIn B2B: não há case
   publicado ainda — e a nota dizendo isso FICA (melhor frase de
   credibilidade da página). */
const DUAS_FORMAS_HTML = `
<section id="duas-formas" style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1080px;margin:0 auto;padding-top:96px;padding-bottom:96px;">
    ${headHTML(
      "Como a gente trabalha",
      'Duas formas<br>de <span class="hl">trabalhar</span>.',
      "Sem tabela de pacotes: o escopo fechado e os valores vão por escrito na proposta, depois de uma call de 30 minutos. Aqui fica o que cada frente entrega.",
      false
    )}
    <div class="mp-grid2">

      <div style="display:flex;flex-direction:column;background:#fff;border:1.5px solid #14110D;border-radius:20px;padding:30px 28px;box-shadow:7px 7px 0 #7CF067;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6258;">Pessoa f&iacute;sica &middot; Instagram + TikTok</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:28px;color:#14110D;margin:14px 0 8px;">Marca Pessoal</h3>
        <p style="font-size:14.5px;line-height:1.6;color:#4a443c;margin:0 0 18px;">Voc&ecirc; &eacute; founder ou criador e quer virar autoridade onde seu p&uacute;blico realmente est&aacute;. Voc&ecirc; grava, a gente faz o resto.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:14px;line-height:1.6;color:#4a443c;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Tese e posicionamento</strong>, extra&iacute;dos da sua hist&oacute;ria</li>
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Roteiro, design e edi&ccedil;&atilde;o</strong> de reels e carross&eacute;is</li>
          <li style="padding:7px 0;border-bottom:1px solid #efe9df;"><strong style="color:#14110D;">Publica&ccedil;&atilde;o e agendamento</strong> por nossa conta</li>
          <li style="padding:7px 0;"><strong style="color:#14110D;">Relat&oacute;rio mensal</strong> e leitura dos n&uacute;meros junto</li>
        </ul>
        <a href="${AGENDAR}?oferta=marca-pessoal" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:#7CF067;color:#06250a;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 #14110D;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>

      <div style="display:flex;flex-direction:column;background:#14110D;border:1.5px solid #14110D;border-radius:20px;padding:30px 28px;box-shadow:7px 7px 0 #D262B2;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Empresa &middot; LinkedIn</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:28px;color:#FAFAFA;margin:14px 0 8px;">LinkedIn B2B</h3>
        <p style="font-size:14.5px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">Sua empresa vende pra outras empresas. O perfil de quem decide vira canal de demanda.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:14px;line-height:1.6;color:#b8b1a6;flex:1;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">Setup dos perfis</strong> dos executivos e da Company Page</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">Conte&uacute;do de tese</strong> amarrado nas obje&ccedil;&otilde;es da sua venda</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;"><strong style="color:#FAFAFA;">Material de captura</strong> em landing pr&oacute;pria, com contato real</li>
          <li style="padding:7px 0;"><strong style="color:#FAFAFA;">Sinais de Inten&ccedil;&atilde;o</strong>: m&eacute;tricas oficiais por post e fila de follow-up assistida</li>
        </ul>
        <a href="${AGENDAR}?oferta=linkedin-b2b" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">${CTA_PRIMARY}</a>
      </div>
    </div>

    <p style="text-align:center;font-size:13.5px;color:#6b6258;max-width:640px;margin:26px auto 0;">Contrato m&iacute;nimo de 6 meses nas duas frentes. Nada &eacute; publicado sem a sua aprova&ccedil;&atilde;o. D&aacute; pra rodar as duas juntas, e a gente diz na call se s&oacute; uma j&aacute; resolve.</p>

    <div style="max-width:900px;margin:20px auto 0;background:#fff;border:1.5px dashed #14110D;border-radius:14px;padding:16px 22px;">
      <p style="font-size:12.5px;line-height:1.6;color:#6b6258;margin:0;"><strong style="color:#14110D;">Uma coisa que a gente n&atilde;o promete no LinkedIn:</strong> lista nominal de quem curtiu ou comentou. A API oficial n&atilde;o libera isso pra perfil pessoal, e o &uacute;nico jeito de conseguir &eacute; por automa&ccedil;&atilde;o que p&otilde;e a conta do seu executivo em risco. Preferimos um e-mail dado de livre vontade a um nome raspado. E como esta oferta acabou de entrar no cat&aacute;logo, ela ainda n&atilde;o tem case publicado: preferimos dizer isso a mostrar n&uacute;mero de terceiro como se fosse nosso.</p>
    </div>

    <!-- Qualificador comprimido: ponte pro CTA (ex-seção "Não é pra todo mundo") -->
    <div style="max-width:900px;margin:40px auto 0;text-align:center;">
      <div style="font-family:Gridlite,monospace;font-size:11.5px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:14px;">N&atilde;o &eacute; pra todo mundo. &Eacute; pra voc&ecirc; se</div>
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #7CF067;">tem expertise real e hist&oacute;rias pra contar</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #D262B2;">vende por confian&ccedil;a: B2B, cripto, fintech, educa&ccedil;&atilde;o</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #7CF067;">topa dar a cara e gravar ~2h por m&ecirc;s</span>
        <span style="background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;color:#14110D;box-shadow:3px 3px 0 #D262B2;">pensa em 6 meses, n&atilde;o em viral de 2 semanas</span>
      </div>
      <p style="font-size:13px;line-height:1.6;color:#8a8175;max-width:560px;margin:16px auto 0;">N&atilde;o &eacute; pra quem quer viral da noite pro dia, n&atilde;o quer aparecer, quer uma persona inventada ou quer terceirizar at&eacute; a pr&oacute;pria opini&atilde;o.</p>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S7 · FAQ (claro) ─────────────────────── */
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
    a: "Os valores vão por escrito na proposta, que você recebe logo depois de uma call de 30 minutos: escopo fechado e cada número aberto, sem pegadinha de rodapé. O que dá pra adiantar é condição, não preço: contrato mínimo de 6 meses, com setup, edição, design e publicação inclusos. A call é de qualificação, não de pressão: se não fizer sentido, a gente diz.",
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

/* ─────────────────────── S8 · CTA FINAL (dark) ─────────────────────── */
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
    <p style="margin-top:16px;font-size:14px;color:#9a9186;">Call de 30 minutos e a proposta chega por escrito, com escopo fechado e valores abertos. Prefere WhatsApp? <a href="https://wa.me/5512997796835" target="_blank" rel="noopener noreferrer" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Fala com a gente por aqui &rarr;</a></p>
  </div>
</section>
`;

/* ───────────── S7b · Trilha editorial (prova de que a gente escreve) ─────────────
 *
 * Por que existe: a trilha de marca pessoal do blog linka PRA cá (CTA no hub
 * /blog/categoria/marca-pessoal e nos posts), mas a LP não linkava de volta.
 * Resultado: quem chega direto na oferta não vê nenhuma prova de método antes
 * de decidir, e o cluster de SEO fica com link só numa direção. Faixa leve de
 * propósito: a LP acabou de ser cortada de 12 pra 9 seções por peso mobile.
 */
async function TrilhaSection() {
  const posts = (await getPublishedPostCardsByCategoryAsync("marca-pessoal")).slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section style={{ position: "relative", background: "#FAFAFA", overflow: "hidden" }}>
      <div
        className="mp-pad"
        style={{ position: "relative", maxWidth: 900, margin: "0 auto", paddingTop: 84, paddingBottom: 84 }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono',monospace",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: 10,
            color: "#D262B2",
            margin: 0,
          }}
        >
          Antes de contratar
        </p>
        <h2
          style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(24px,3vw,36px)",
            lineHeight: 1.12,
            letterSpacing: "-1px",
            color: "#14110D",
            margin: "10px 0 12px",
          }}
        >
          Leia o que a gente pensa sobre isso.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#4a443c", maxWidth: 560, margin: 0 }}>
          O método não é segredo. Está escrito e público, artigo por artigo.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 10 }}>
          {posts.map((p) => (
            <li key={p.slug}>
              <a
                href={`/blog/${p.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  background: "#fff",
                  border: "1.5px solid #14110D",
                  borderRadius: 14,
                  boxShadow: "4px 4px 0 #7CF067",
                  padding: "16px 20px",
                  textDecoration: "none",
                  color: "#14110D",
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: 1.35,
                }}
              >
                <span>{p.title}</span>
                <span style={{ color: "#D262B2", flexShrink: 0 }}>&rarr;</span>
              </a>
            </li>
          ))}
        </ul>

        {/* ⚠️ 19/08/2026 — era <a href>, o que quebrava o lint
            (@next/next/no-html-link-for-pages) e forçava reload cheio numa rota
            interna. Virou <Link>: navegação client-side e lint verde. */}
        <Link
          href="/blog/categoria/marca-pessoal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 22,
            fontSize: 15,
            fontWeight: 700,
            color: "#14110D",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Ver a trilha completa &rarr;
        </Link>
      </div>
    </section>
  );
}

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

        {/* S2 · Problema (sintomas + 2,75× Refine Labs absorvido) */}
        <Reveal>
          <ProblemaSection />
        </Reveal>

        {/* S3 · O que fazemos (você grava, a gente faz o resto) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAZEMOS_HTML }} />
        </Reveal>

        {/* S4 · O método (stepper auto-rotativo) */}
        <Reveal>
          <MetodoSection />
        </Reveal>

        {/* S5 · Prova / cases (métricas de case-data.ts, verificáveis) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: CASES_HTML }} />
        </Reveal>

        {/* S6 · Duas formas de trabalhar + qualificador comprimido */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: DUAS_FORMAS_HTML }} />
        </Reveal>

        {/* S7 · FAQ */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAQ_HTML }} />
        </Reveal>

        {/* S7b · Trilha editorial do blog (fecha o loop LP <-> conteúdo) */}
        <Reveal>
          <TrilhaSection />
        </Reveal>

        {/* S8 · CTA final */}
        <div dangerouslySetInnerHTML={{ __html: CTA_FINAL_HTML }} />

        {/* Footer (WhatsApp flutuante já vem do layout raiz) */}
        <Reveal>
          <FooterDemo />
        </Reveal>
      </main>
    </>
  );
}
