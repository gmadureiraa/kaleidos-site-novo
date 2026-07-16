import type { Metadata } from "next";
import Image from "next/image";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import { getServerLocale, type Locale } from "@/i18n/server";
import { PacotesCtaTracking } from "./cta-tracking";

/**
 * PÁGINA DE PACOTE / OFERTA — rota NOVA `/pacotes` (2026-07).
 *
 * Régua de neuromarketing (reel Camila Farani) + achados da auditoria
 * revenue-centric (`vault/99 - SISTEMA/AUDIT-REVENUE-CENTRIC-4SITES-2026-07.md`):
 *
 *  - Valor + resultado na dobra, instantâneo (imagem processada em 13ms).
 *  - Processing fluency: hierarquia limpa, 1 ação primária, sem CTA concorrente.
 *  - Prova (número + depoimento) ACIMA da dobra — o buraco #1 do site hoje.
 *  - 1 único destino de CTA (Calendly) repetido em toda a página. Sem WhatsApp
 *    concorrente aqui (a home decide isso; esta página é foco total em 1 ação).
 *  - Urgência com parcimônia (sinal discreto, sem escassez falsa).
 *
 * i18n (2026-07): copy bilíngue PT/EN via `?lang=en` (mesmo mecanismo de
 * `src/i18n/server.ts` usado no resto do site). PT é o default.
 *
 * NÃO toca a home (`/`), o hero de produção, nem qualquer componente existente.
 * Reaproveita os tokens de marca (Atelier/Gridlite/Inter · #7CF067 verde ·
 * #D262B2 rosa · #14110D ink · #FAFAFA cru) e a estética brutalista-colagem
 * (sombras duras `Xpx Xpx 0`, cards levemente rotacionados) da web3v2.
 *
 * ⚠️ PLACEHOLDERS PRA GABRIEL: os blocos marcados `{{PROVA_REAL}}` (o
 * depoimento above-the-fold) precisam de um número/quote REAL. Não inventei.
 * As métricas numéricas vêm de `KALEIDOS_METRICS` (fonte única já usada no site).
 */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = getServerLocale(lang);
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Kaleidos Packages: crypto marketing by objective"
      : "Pacotes Kaleidos — marketing cripto por objetivo",
    description: isEn
      ? "Choose by objective: Authority, Growth or Launch. A crypto-native team that has edited 500+ videos, generated 125M+ views and executed 50+ launches. Book a call."
      : "Escolha por objetivo: Autoridade, Growth ou Lançamento. Um time cripto-nativo que já editou 500+ vídeos, gerou 125M+ de views e executou 50+ lançamentos. Marque uma call.",
    alternates: { canonical: "/pacotes" },
    // Fundo de funil: acessível por link direto (proposta / CTA de blog), fora do
    // índice de busca — decisão D3/A4 do Ultraplan (preço não público no topo).
    robots: { index: false, follow: true },
  };
}

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";
const CRU = "#FAFAFA";

// Único destino de CTA da página inteira (consolidação — auditoria RCD).
const CALENDLY = "https://calendly.com/madureira-kaleidosdigital/30min";

/* ── CSS escopado sob `.kpac` — nomes de keyframe únicos, sem colisão global ── */
const STYLE = `
.kpac{font-family:'Inter',system-ui,sans-serif;color:${INK};background:${CRU};overflow-x:clip;}
.kpac *{box-sizing:border-box;}
.kpac .wrap{max-width:1180px;margin:0 auto;padding-left:28px;padding-right:28px;}
.kpac .cta-btn{transition:transform .18s cubic-bezier(.22,1,.36,1),box-shadow .18s cubic-bezier(.22,1,.36,1);}
.kpac .cta-btn:hover{transform:translate(-2px,-2px);}
.kpac a{text-decoration:none;}
@keyframes kpac-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes kpac-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

/* HERO */
.kpac .hero{position:relative;overflow:hidden;background:${CRU};
  background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;
  padding:72px 0 56px;text-align:center;border-bottom:2px solid ${INK};}
.kpac .hero .eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:'Gridlite',monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:${INK};background:#fff;border:1.5px solid ${INK};border-radius:999px;padding:8px 16px;box-shadow:3px 3px 0 ${GREEN};margin-bottom:26px;}
.kpac .hero .dot{width:8px;height:8px;border-radius:999px;background:${GREEN};flex:none;}
.kpac .hero h1{font-family:'Atelier',sans-serif;font-weight:700;font-size:clamp(38px,5.2vw,68px);line-height:1.02;letter-spacing:-1.5px;margin:0 auto;max-width:16ch;}
.kpac .hero h1 .hl{background:linear-gradient(${GREEN},${GREEN}) center/100% 38% no-repeat;box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px;}
.kpac .hero p.sub{font-size:clamp(17px,2vw,21px);line-height:1.55;color:#4a443c;max-width:600px;margin:26px auto 0;}
.kpac .hero .cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:36px;}
.kpac .cta-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:${INK};color:#fff;font-weight:700;font-size:17px;min-height:52px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 ${GREEN};}
.kpac .cta-primary img{width:22px;height:22px;object-fit:contain;background:#fff;border-radius:6px;padding:2px;}
.kpac .hero .microcopy{font-family:'Gridlite',monospace;font-size:12px;letter-spacing:1px;color:#6b6258;margin-top:16px;}

/* PROVA above-the-fold */
.kpac .proof{background:#fff;border-bottom:2px solid ${INK};padding:44px 0;}
.kpac .proof .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:34px;}
.kpac .proof .stat{text-align:center;}
.kpac .proof .stat .n{font-family:'Atelier',sans-serif;font-weight:800;font-size:clamp(30px,4vw,46px);line-height:1;color:${INK};}
.kpac .proof .stat .l{font-family:'Gridlite',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8175;margin-top:8px;}
.kpac .proof .quote{max-width:760px;margin:0 auto;background:${CRU};border:1.5px solid ${INK};border-left:4px solid ${PINK};border-radius:0 14px 14px 0;padding:24px 28px;}
.kpac .proof .quote p{font-size:clamp(18px,2.2vw,22px);line-height:1.4;font-weight:500;color:${INK};margin:0;}
.kpac .proof .quote .cite{display:block;margin-top:14px;font-family:'Gridlite',monospace;font-size:12px;letter-spacing:1px;color:${PINK};font-weight:600;}
.kpac .ph{background:#fff3bf;color:#5c4700;border:1.5px dashed #d4a900;border-radius:6px;padding:1px 7px;font-family:'Gridlite',monospace;font-size:.82em;font-weight:600;letter-spacing:.5px;}

/* PACOTES */
.kpac .tiers{padding:76px 0 20px;text-align:center;}
.kpac .tiers .kicker{font-family:'Gridlite',monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${PINK};margin-bottom:16px;}
.kpac .tiers h2{font-family:'Atelier',sans-serif;font-weight:700;font-size:clamp(30px,4vw,52px);line-height:1;letter-spacing:-1px;margin:0 auto;max-width:16ch;}
.kpac .tiers .lead{font-size:17px;line-height:1.55;color:#6b6258;max-width:560px;margin:20px auto 0;}
.kpac .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px;text-align:left;}
.kpac .card{position:relative;background:#fff;border:1.5px solid ${INK};border-radius:18px;padding:30px 28px;display:flex;flex-direction:column;box-shadow:6px 6px 0 ${GREEN};}
.kpac .card.feat{box-shadow:6px 6px 0 ${PINK};}
.kpac .card .badge{position:absolute;top:-13px;left:24px;font-family:'Gridlite',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;background:${PINK};color:#fff;border:1.5px solid ${INK};border-radius:999px;padding:4px 12px;}
.kpac .card .pnum{font-family:'Atelier',sans-serif;font-weight:800;font-size:26px;line-height:1;color:${INK};margin-bottom:14px;-webkit-text-stroke:0;}
.kpac .card h3{font-family:'Atelier',sans-serif;font-weight:700;font-size:27px;line-height:1.04;margin:0 0 6px;}
.kpac .card .who{font-family:'Gridlite',monospace;font-size:11.5px;letter-spacing:.6px;text-transform:uppercase;color:${PINK};margin:0 0 18px;}
.kpac .card ul{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-direction:column;gap:11px;}
.kpac .card li{position:relative;padding-left:24px;font-size:14.5px;line-height:1.45;color:#3a332a;}
.kpac .card li::before{content:"";position:absolute;left:0;top:6px;width:9px;height:9px;background:${GREEN};transform:rotate(45deg);border:1px solid ${INK};}
.kpac .card .price{font-family:'Atelier',sans-serif;font-weight:800;font-size:24px;color:${INK};margin:auto 0 4px;}
.kpac .card .price .u{font-family:'Gridlite',monospace;font-size:12px;font-weight:400;color:#8a8175;display:block;margin-top:4px;}
.kpac .card .tier-cta{margin-top:18px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${INK};color:#fff;font-weight:700;font-size:15px;min-height:48px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 ${GREEN};width:100%;}
.kpac .card.feat .tier-cta{box-shadow:4px 4px 0 ${PINK};}
.kpac .tiers .undernote{font-family:'Gridlite',monospace;font-size:12px;letter-spacing:.5px;color:#8a8175;margin:36px auto 0;max-width:640px;}

/* FAQ */
.kpac .faq{padding:72px 0;}
.kpac .faq h2{font-family:'Atelier',sans-serif;font-weight:700;font-size:clamp(28px,3.6vw,44px);line-height:1;letter-spacing:-1px;margin:0 0 40px;text-align:center;}
.kpac .faq .qgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:960px;margin:0 auto;}
.kpac .faq .q{background:#fff;border:1.5px solid ${INK};border-radius:14px;padding:22px 24px;}
.kpac .faq .q h3{font-family:'Atelier',sans-serif;font-weight:700;font-size:18px;margin:0 0 8px;line-height:1.15;}
.kpac .faq .q p{font-size:14.5px;line-height:1.55;color:#544c42;margin:0;}

/* CTA FINAL */
.kpac .final{position:relative;overflow:hidden;background:${INK};color:${CRU};text-align:center;padding:88px 0;border-top:2px solid ${INK};}
.kpac .final .dots{position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff1f 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;}
.kpac .final h2{position:relative;font-family:'Atelier',sans-serif;font-weight:700;font-size:clamp(32px,4.6vw,60px);line-height:1;letter-spacing:-1px;margin:0 auto;max-width:16ch;}
.kpac .final h2 .hl{color:${GREEN};}
.kpac .final p{position:relative;font-size:18px;line-height:1.55;color:#c9c2b6;max-width:520px;margin:22px auto 0;}
.kpac .final .cta-primary{position:relative;margin-top:36px;box-shadow:5px 5px 0 ${GREEN};}
.kpac .final .microcopy{position:relative;font-family:'Gridlite',monospace;font-size:12px;letter-spacing:1px;color:#8a8175;margin-top:16px;}
.kpac .final .star{position:absolute;pointer-events:none;}

/* RESPONSIVO */
@media(max-width:900px){
  .kpac .proof .stats{grid-template-columns:repeat(2,1fr);gap:24px;}
  .kpac .grid3{grid-template-columns:1fr;gap:26px;}
  .kpac .faq .qgrid{grid-template-columns:1fr;}
}
@media(max-width:600px){
  .kpac .wrap{padding-left:20px;padding-right:20px;}
  .kpac .hero{padding:52px 0 44px;}
  .kpac .hero h1{letter-spacing:-.8px;overflow-wrap:break-word;}
  .kpac .hero .eyebrow{white-space:normal;line-height:1.5;letter-spacing:1.5px;}
  .kpac .cta-primary,.kpac .card .tier-cta{width:100%;justify-content:center;}
  .kpac .hero .cta-row{flex-direction:column;}
  .kpac .proof{padding:36px 0;}
  .kpac .proof .stats{gap:18px 12px;}
  .kpac .tiers{padding:56px 0 14px;}
  .kpac .card{padding:26px 20px;}
  .kpac .faq{padding:56px 0;}
  .kpac .faq .q{padding:18px 18px;}
  .kpac .final{padding:64px 0;}
}
`;

/* ── Dados dos 3 pacotes por objetivo (GTM cripto: Autoridade · Growth · Lançamento) ── */
type Tier = {
  id: string;
  n: string;
  nome: string;
  who: string;
  inclui: string[];
  price: string;
  priceUnit: string;
  featured?: boolean;
  cta: string;
};

const TIERS_PT: Tier[] = [
  {
    id: "autoridade",
    n: "Pacote 01",
    nome: "Autoridade",
    who: "Pra quem quer virar referência, não só mais ruído no feed",
    inclui: [
      "Social media gerido (X · LinkedIn · Instagram)",
      "Copywriting e design cripto-nativos",
      "Editorial com tese, não post genérico",
      "Vídeo e motion sob demanda",
      "Relatório mensal com métrica de verdade",
    ],
    price: "Sob diagnóstico",
    priceUnit: "escopo e investimento fechados na call",
    cta: "Quero construir autoridade",
  },
  {
    id: "growth",
    n: "Pacote 02",
    nome: "Growth",
    who: "Pra quem já tem base e quer aquisição e conversão",
    inclui: [
      "Tudo do Autoridade, em volume maior",
      "Funil de aquisição + e-mail e automação",
      "Ativação de influencers (efeito enxame)",
      "Gestão de comunidade (Telegram · Discord)",
      "Otimização contínua guiada por dado",
    ],
    price: "Sob diagnóstico",
    priceUnit: "um time de marketing inteiro",
    featured: true,
    cta: "Quero crescer com dado",
  },
  {
    id: "lancamento",
    n: "Pacote 03",
    nome: "Lançamento / GTM",
    who: "Pra TGE, airdrop ou go-to-market de token",
    inclui: [
      "Estratégia de go-to-market cripto ponta a ponta",
      "Narrativa de lançamento + posicionamento",
      "Campanha completa: funil, sequência e página",
      "KOLs e comunidade orquestrados por objetivo",
      "Sala de guerra na semana do evento",
    ],
    price: "sob projeto",
    priceUnit: "escopo e janela definidos por lançamento",
    cta: "Quero orquestrar meu lançamento",
  },
];

const TIERS_EN: Tier[] = [
  {
    id: "autoridade",
    n: "Package 01",
    nome: "Authority",
    who: "For brands that want to become the reference, not more noise in the feed",
    inclui: [
      "Managed social media (X · LinkedIn · Instagram)",
      "Crypto-native copywriting and design",
      "Editorial with a thesis, not generic posts",
      "Video and motion on demand",
      "Monthly report with metrics that matter",
    ],
    price: "Scoped after diagnosis",
    priceUnit: "scope and investment defined on the call",
    cta: "I want to build authority",
  },
  {
    id: "growth",
    n: "Package 02",
    nome: "Growth",
    who: "For projects with an audience that want acquisition and conversion",
    inclui: [
      "Everything in Authority, at higher volume",
      "Acquisition funnel + email and automation",
      "Influencer activation (swarm effect)",
      "Community management (Telegram · Discord)",
      "Continuous data-driven optimization",
    ],
    price: "Scoped after diagnosis",
    priceUnit: "a full marketing team",
    featured: true,
    cta: "I want data-driven growth",
  },
  {
    id: "lancamento",
    n: "Package 03",
    nome: "Launch / GTM",
    who: "For a TGE, airdrop or token go-to-market",
    inclui: [
      "End-to-end crypto go-to-market strategy",
      "Launch narrative + positioning",
      "Full campaign: funnel, sequence and page",
      "KOLs and community orchestrated by objective",
      "War room during launch week",
    ],
    price: "Per project",
    priceUnit: "scope and window defined per launch",
    cta: "I want to orchestrate my launch",
  },
];

type FAQItem = { q: string; a: string };

const FAQ_PT: FAQItem[] = [
  {
    q: "Qual pacote é o meu?",
    a: "A gente descobre junto na call: em 30 minutos entendemos o momento do seu projeto e apontamos o pacote (e o escopo) que move o ponteiro. Sem empurrar o mais caro.",
  },
  {
    q: "Como funciona o orçamento?",
    a: "O orçamento é a soma das peças + gestão, fechado no diagnóstico depois da call. Cada projeto cripto tem um escopo diferente, então o valor sai sob medida e transparente, sem surpresa depois.",
  },
  {
    q: "Vocês entendem de cripto de verdade?",
    a: "Somos cripto-nativos desde 2020. Já atendemos de exchanges globais a creators brasileiros: Crypto.com, Ledger, Mercado Bitcoin, Parfin, Paradigma. A gente vive o mercado, não fala de fora.",
  },
  {
    q: "Tem fidelidade ou multa?",
    a: "Trabalhamos por ciclo. O que traz resultado escala, o que não traz sai. Sem amarra que prende quem não quer ficar.",
  },
  {
    q: "Quanto tempo até o primeiro resultado?",
    a: "Onboarding e estratégia nas primeiras semanas; produção no ritmo da timeline logo em seguida. No Defiverso, saímos do zero a 29 mil na base em 90 dias.",
  },
  {
    q: "E se eu só precisar de uma frente (ex: vídeo)?",
    a: "Dá pra contratar frentes modulares à parte (vídeo & motion, newsletter, comunidade, lançamento). Traga o que precisa na call que a gente monta o escopo certo.",
  },
];

const FAQ_EN: FAQItem[] = [
  {
    q: "Which package is right for me?",
    a: "We figure it out together on the call: in 30 minutes we understand where your project is and point to the package (and scope) that moves the needle. No upselling to the most expensive one.",
  },
  {
    q: "How does pricing work?",
    a: "The budget is the sum of deliverables + management, closed in the diagnosis after the call. Every crypto project has a different scope, so the price is tailored and transparent, with no surprises later.",
  },
  {
    q: "Do you actually understand crypto?",
    a: "We have been crypto-native since 2020. We have worked with everyone from global exchanges to Brazilian creators: Crypto.com, Ledger, Mercado Bitcoin, Parfin, Paradigma. We live in this market, we don't talk about it from the outside.",
  },
  {
    q: "Is there a lock-in or cancellation fee?",
    a: "We work in cycles. What brings results scales, what doesn't gets cut. No contract traps holding anyone who doesn't want to stay.",
  },
  {
    q: "How long until the first results?",
    a: "Onboarding and strategy in the first weeks; production at full pace right after. At Defiverso, we went from zero to 29 thousand subscribers in 90 days.",
  },
  {
    q: "What if I only need one front (e.g. video)?",
    a: "You can hire modular fronts separately (video & motion, newsletter, community, launch). Bring what you need to the call and we build the right scope.",
  },
];

const COPY = {
  pt: {
    eyebrow: "Pacotes Kaleidos · marketing cripto por objetivo",
    h1Pre: "Escolha pelo ",
    h1Hl: "resultado",
    h1Post: " que você quer no mercado cripto.",
    sub: "Autoridade, Growth ou Lançamento. Um time cripto-nativo cuida de conteúdo, estratégia e distribuição pra sua marca virar referência, não só mais ruído no feed.",
    ctaLabel: "Marcar uma call",
    heroMicro: "30 min · sem compromisso · sem enrolação",
    statViews: "views em Reels",
    statVideos: "vídeos editados",
    statLaunches: "lançamentos executados",
    statSatisfaction: "de satisfação",
    kicker: "Como a gente trabalha",
    tiersH2: "Três objetivos, um mesmo padrão de exigência.",
    tiersLead:
      "Todo pacote nasce de um diagnóstico. Você não compra peça solta: compra um time cripto-nativo focado no resultado que importa pro seu momento.",
    badge: "Mais escolhido",
    undernote:
      "Preços são ponto de partida (a soma das peças + gestão fecha no diagnóstico). Frentes modulares (vídeo, newsletter, comunidade, lançamento) podem rodar à parte ou combinadas.",
    faqH2: "Perguntas diretas, respostas diretas.",
    finalPre: "Vamos construir algo que ",
    finalHl: "funciona",
    finalPost: ".",
    finalSub:
      "Marque uma call. A gente entende o projeto e mostra exatamente onde a Kaleidos move o ponteiro, e qual pacote faz sentido pro seu momento.",
    finalMicroA: "projetos atendidos",
    finalMicroB: "de crescimento médio",
    finalMicroC: "desde 2020",
    tiers: TIERS_PT,
    faq: FAQ_PT,
  },
  en: {
    eyebrow: "Kaleidos Packages · crypto marketing by objective",
    h1Pre: "Choose by the ",
    h1Hl: "result",
    h1Post: " you want in the crypto market.",
    sub: "Authority, Growth or Launch. A crypto-native team handles content, strategy and distribution so your brand becomes the reference, not more noise in the feed.",
    ctaLabel: "Book a call",
    heroMicro: "30 min · no commitment · no fluff",
    statViews: "Reels views",
    statVideos: "videos edited",
    statLaunches: "launches executed",
    statSatisfaction: "satisfaction",
    kicker: "How we work",
    tiersH2: "Three objectives, one standard of excellence.",
    tiersLead:
      "Every package starts with a diagnosis. You don't buy loose deliverables: you get a crypto-native team focused on the result that matters for your stage.",
    badge: "Most chosen",
    undernote:
      "Prices are a starting point (deliverables + management are closed in the diagnosis). Modular fronts (video, newsletter, community, launch) can run separately or combined.",
    faqH2: "Direct questions, direct answers.",
    finalPre: "Let's build something that ",
    finalHl: "works",
    finalPost: ".",
    finalSub:
      "Book a call. We get to know your project and show exactly where Kaleidos moves the needle, and which package makes sense for your stage.",
    finalMicroA: "projects served",
    finalMicroB: "average growth",
    finalMicroC: "since 2020",
    tiers: TIERS_EN,
    faq: FAQ_EN,
  },
} satisfies Record<Locale, unknown>;

export default async function PacotesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = getServerLocale(lang);
  const t = COPY[locale];
  const isEn = locale === "en";
  const m = KALEIDOS_METRICS;
  return (
    <main id="main-content" className="kpac" role="main">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {/* Eventos nomeados nos CTAs (mesmo padrão da home web3v2) */}
      <PacotesCtaTracking />

      {/* 1 · HERO DA OFERTA — proposta + resultado + 1 CTA primário único */}
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot" />
            {t.eyebrow}
          </span>
          <h1>
            {t.h1Pre}
            <span className="hl">{t.h1Hl}</span>
            {t.h1Post}
          </h1>
          <p className="sub">{t.sub}</p>
          <div className="cta-row">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-primary"
              data-cta="pacotes-hero"
            >
              <Image src="/v2/calendly-icon.webp" alt="" aria-hidden width={18} height={18} />
              {t.ctaLabel} &rarr;
            </a>
          </div>
          <p className="microcopy">{t.heroMicro}</p>
        </div>
      </section>

      {/* 2 · PROVA ACIMA DA DOBRA — números reais (KALEIDOS_METRICS) + depoimento */}
      <section className="proof">
        <div className="wrap">
          <div className="stats">
            <div className="stat">
              <div className="n">{isEn ? m.viewsReels_en : m.viewsReels}</div>
              <div className="l">{t.statViews}</div>
            </div>
            <div className="stat">
              <div className="n">{isEn ? m.videosEditados_en : m.videosEditados}</div>
              <div className="l">{t.statVideos}</div>
            </div>
            <div className="stat">
              <div className="n">{isEn ? m.lancamentos_en : m.lancamentos}</div>
              <div className="l">{t.statLaunches}</div>
            </div>
            <div className="stat">
              <div className="n">{isEn ? m.satisfacaoCliente_en : m.satisfacaoCliente}</div>
              <div className="l">{t.statSatisfaction}</div>
            </div>
          </div>
          {/* ⚠️ GABRIEL: bloco de depoimento oculto até ter um quote REAL de cliente
              (Crypto.com / Ledger / Mercado Bitcoin / Defiverso / Parfin). O
              placeholder {{PROVA_REAL}} estava renderizando VISÍVEL em produção
              (página de fundo de funil, linkada em propostas). Ao ter o depoimento,
              trocar o texto abaixo e remover o `hidden`/comentário. */}
          {/*
          <blockquote className="quote">
            <p>&ldquo;<span className="ph">DEPOIMENTO REAL AQUI</span>&rdquo;</p>
            <span className="cite"><span className="ph">Nome · Cargo · Marca</span></span>
          </blockquote>
          */}
        </div>
      </section>

      {/* 3 · TIERS — 3 pacotes escaneáveis, 1 CTA por tier → mesmo destino */}
      <section className="tiers">
        <div className="wrap">
          <div className="kicker">{t.kicker}</div>
          <h2>{t.tiersH2}</h2>
          <p className="lead">{t.tiersLead}</p>

          <div className="grid3">
            {t.tiers.map((tier) => (
              <div key={tier.id} className={`card${tier.featured ? " feat" : ""}`}>
                {tier.featured && <span className="badge">{t.badge}</span>}
                <div className="pnum">{tier.n}</div>
                <h3>{tier.nome}</h3>
                <p className="who">{tier.who}</p>
                <ul>
                  {tier.inclui.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <div className="price">
                  {tier.price}
                  <span className="u">{tier.priceUnit}</span>
                </div>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn tier-cta"
                  data-cta={`pacotes-tier-${tier.id}`}
                >
                  {tier.cta} &rarr;
                </a>
              </div>
            ))}
          </div>

          <p className="undernote">{t.undernote}</p>
        </div>
      </section>

      {/* 4 · FAQ curto */}
      <section className="faq">
        <div className="wrap">
          <h2>{t.faqH2}</h2>
          <div className="qgrid">
            {t.faq.map((f) => (
              <div key={f.q} className="q">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · CTA FINAL — único, mesmo destino */}
      <section className="final">
        <div className="dots" />
        <svg
          className="star"
          style={{ left: "8%", top: "18%", width: 60 }}
          width="60"
          height="60"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path
            fill={PINK}
            d="M50 0 L58 34 L92 26 L66 50 L92 74 L58 66 L50 100 L42 66 L8 74 L34 50 L8 26 L42 34 Z"
          />
        </svg>
        <div className="wrap">
          <h2>
            {t.finalPre}
            <span className="hl">{t.finalHl}</span>
            {t.finalPost}
          </h2>
          <p>{t.finalSub}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-primary"
            data-cta="pacotes-final"
          >
            <Image src="/v2/calendly-icon.webp" alt="" aria-hidden width={18} height={18} />
            {t.ctaLabel} &rarr;
          </a>
          <p className="microcopy">
            {isEn ? m.projetosAtendidos_en : m.projetosAtendidos} {t.finalMicroA} ·{" "}
            {isEn ? m.crescimentoMedio_en : m.crescimentoMedio} {t.finalMicroB} · {t.finalMicroC}
          </p>
        </div>
      </section>
    </main>
  );
}
