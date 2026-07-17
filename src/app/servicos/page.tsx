"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  PenTool,
  Brain,
  Rocket,
  Search,
  Compass,
  AtSign,
  Megaphone,
  Users,
  Star,
  type LucideIcon,
} from "lucide-react";
import { FooterDemo } from "@/components/ui/footer-demo";
import { CtaAjuda } from "@/components/ui/cta-ajuda";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import { CALENDLY_URL } from "@/lib/constants";
import { useAnalytics } from "@/components/analytics";
import { useI18n } from "@/i18n/useI18n";

/* ------------------------------------------------------------------ */
/* Kaleidos brand tokens — cru #FAFAFA · ink #14110D · verde #7CF067   */
/* rosa #D262B2 · Atelier (font-display) + Gridlite (font-accent)      */
/* ------------------------------------------------------------------ */

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DotGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        backgroundImage: dark
          ? "radial-gradient(#ffffff22 1.3px,transparent 1.5px)"
          : `linear-gradient(${INK}0d 1px,transparent 1px),linear-gradient(90deg,${INK}0d 1px,transparent 1px)`,
        backgroundSize: dark ? "18px 18px" : "34px 34px",
        opacity: dark ? 0.5 : 1,
      }}
      aria-hidden
    />
  );
}

type Accent = "green" | "pink";
const accentHex = (a: Accent) => (a === "pink" ? PINK : GREEN);
const accentDeep = (a: Accent) => (a === "pink" ? "#A8458C" : "#2F7D27");

export default function ServicosPage() {
  const { locale } = useI18n();
  const { trackClick } = useAnalytics();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    locale === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  /* Os 3 pilares = páginas custom de serviço */
  const pillars: {
    icon: LucideIcon;
    title: string;
    tagline: string;
    desc: string;
    href: string;
    items: string[];
    accent: Accent;
  }[] = isEn
    ? [
        {
          icon: PenTool,
          title: "Content Marketing",
          tagline: "Content that builds attention.",
          desc: "Strategy, copy, scripts, design and video editing across IG, X, YouTube and LinkedIn — the editorial engine behind the brand.",
          href: "/servicos/marketing-conteudo",
          items: ["Copywriting & scripts", "Reels & video editing", "Design & social media", "Editorial calendar"],
          accent: "green",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          tagline: "Automation that scales the team.",
          desc: "Custom AI agents, automations and content engines that multiply output without losing brand voice or editorial quality.",
          href: "/servicos/ia-automacoes-completa",
          items: ["AI content engines", "n8n & workflow automation", "Custom AI agents", "Chatbots & ops"],
          accent: "pink",
        },
        {
          icon: Rocket,
          title: "Growth & Launches",
          tagline: "Funnels that convert.",
          desc: "Full launch operations: funnels, capture pages, paid traffic creatives, newsletters and lead generation built to perform.",
          href: "/servicos/growth-lancamentos",
          items: ["Launch strategy", "Paid traffic creatives", "Capture pages & funnels", "Lead generation"],
          accent: "green",
        },
      ]
    : [
        {
          icon: PenTool,
          title: "Marketing de Conteúdo",
          tagline: "Conteúdo que constrói atenção.",
          desc: "Estratégia, copy, roteiros, design e edição de vídeo no IG, X, YouTube e LinkedIn. O motor editorial por trás da marca.",
          href: "/servicos/marketing-conteudo",
          items: ["Copywriting & roteiros", "Reels & edição de vídeo", "Design & social media", "Calendário editorial"],
          accent: "green",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          tagline: "Automação que escala o time.",
          desc: "Agentes de IA sob medida, automações e engines de conteúdo que multiplicam a produção sem perder voz de marca nem qualidade editorial.",
          href: "/servicos/ia-automacoes-completa",
          items: ["Engines de conteúdo com IA", "Automação n8n & workflows", "Agentes de IA sob medida", "Chatbots & operação"],
          accent: "pink",
        },
        {
          icon: Rocket,
          title: "Growth & Lançamentos",
          tagline: "Funis que convertem.",
          desc: "Operação completa de lançamento: funis, páginas de captura, criativos para tráfego pago, newsletters e geração de leads feitos pra performar.",
          href: "/servicos/growth-lancamentos",
          items: ["Estratégia de lançamento", "Criativos para tráfego pago", "Páginas de captura & funis", "Geração de leads"],
          accent: "green",
        },
      ];

  /* Serviços especializados = as 6 páginas template */
  const specialized: {
    icon: LucideIcon;
    title: string;
    desc: string;
    href: string;
    accent: Accent;
  }[] = isEn
    ? [
        { icon: Search, title: "Crypto SEO & GEO", desc: "Organic and AI-search strategy that compounds traffic over time.", href: "/servicos/seo-cripto", accent: "green" },
        { icon: Compass, title: "Web3 Consulting & GTM", desc: "Positioning, narrative and go-to-market frameworks before launch.", href: "/servicos/consultoria-gtm", accent: "pink" },
        { icon: AtSign, title: "Crypto Social Media", desc: "Voice, presence and engagement that turn feeds into authority.", href: "/servicos/social-media-cripto", accent: "pink" },
        { icon: Megaphone, title: "Crypto PR & Comms", desc: "Strong angles, press material and coordinated outreach.", href: "/servicos/pr-assessoria", accent: "green" },
        { icon: Users, title: "Community Management", desc: "Discord, Telegram and rituals that keep a community alive.", href: "/servicos/comunidade-cripto", accent: "pink" },
        { icon: Star, title: "Influencer & KOL", desc: "Curated KOLs and campaigns that actually move the needle.", href: "/servicos/influencer-kol", accent: "green" },
      ]
    : [
        { icon: Search, title: "SEO & GEO Cripto", desc: "Estratégia de busca orgânica e de IA que compõe tráfego no tempo.", href: "/servicos/seo-cripto", accent: "green" },
        { icon: Compass, title: "Consultoria Web3 & GTM", desc: "Posicionamento, narrativa e frameworks de go-to-market antes do lançamento.", href: "/servicos/consultoria-gtm", accent: "pink" },
        { icon: AtSign, title: "Social Media Cripto", desc: "Voz, presença e engajamento que transformam feed em autoridade.", href: "/servicos/social-media-cripto", accent: "pink" },
        { icon: Megaphone, title: "PR & Assessoria", desc: "Ângulos fortes, material de imprensa e outreach coordenado.", href: "/servicos/pr-assessoria", accent: "green" },
        { icon: Users, title: "Gestão de Comunidade", desc: "Discord, Telegram e rituais que mantêm a comunidade viva.", href: "/servicos/comunidade-cripto", accent: "pink" },
        { icon: Star, title: "Influencer & KOL", desc: "KOLs selecionados e campanhas que de fato movem o ponteiro.", href: "/servicos/influencer-kol", accent: "green" },
      ];

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-[#FAFAFA] px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <DotGrid />
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute right-[8%] top-[18%] hidden w-16 [animation:spin_14s_linear_infinite] md:block"
          aria-hidden
        >
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={GREEN} />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-[6%] bottom-[16%] hidden w-10 [animation:spin_9s_linear_infinite_reverse] md:block"
          aria-hidden
        >
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={PINK} />
        </svg>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <span
              className="mb-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-[#14110D] sm:text-sm"
              style={{ boxShadow: `3px 3px 0 ${GREEN}` }}
            >
              <span className="font-accent uppercase tracking-[0.22em]">
                {isEn ? "Services" : "Serviços"}
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-[#14110D] sm:text-5xl md:text-6xl">
              {isEn ? "Everything to grow," : "Tudo pra crescer,"}{" "}
              <span style={{ color: accentDeep("green") }}>
                {isEn ? "in one team." : "em um time só."}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5c544a] sm:text-lg">
              {isEn
                ? "Content, growth and product under one roof. Kaleidos covers the full stack so crypto, web3 and fintech projects can ship without juggling vendors."
                : "Conteúdo, growth e produto no mesmo lugar. A Kaleidos cobre a stack completa pra projetos cripto, web3 e fintech entregarem sem precisar orquestrar vários fornecedores."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 3 Pilares ---------------- */}
      <section className="bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <span className="mb-4 inline-block font-accent text-xs uppercase tracking-[0.22em] text-[#A8458C]">
              {isEn ? "Three fronts" : "Três frentes"}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#14110D] sm:text-4xl md:text-[3rem]">
              {isEn ? "How Kaleidos organizes the work" : "Como a Kaleidos organiza o trabalho"}
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => {
              const hex = accentHex(p.accent);
              const deep = accentDeep(p.accent);
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <Link href={withLang(p.href)} className="group block h-full">
                    <div
                      className="flex h-full flex-col rounded-2xl border-[1.5px] border-[#14110D] bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
                      style={{ boxShadow: `5px 5px 0 ${INK}` }}
                    >
                      <span
                        className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border-[1.5px] border-[#14110D]"
                        style={{ background: hex }}
                      >
                        <p.icon className="h-6 w-6 text-[#14110D]" />
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#14110D]">{p.title}</h3>
                      <p className="mt-1 text-sm font-semibold" style={{ color: deep }}>
                        {p.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-[#5c544a]">{p.desc}</p>
                      <ul className="mt-6 space-y-2.5">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-center gap-2.5 text-sm text-[#14110D]">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: hex }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                      <span
                        className="mt-7 inline-flex items-center gap-1.5 font-accent text-xs uppercase tracking-[0.18em]"
                        style={{ color: deep }}
                      >
                        {isEn ? "Explore" : "Explorar"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Serviços especializados (6 template) ---------------- */}
      <section className="relative bg-[#FAFAFA] px-6 py-20 sm:py-28">
        <DotGrid />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <span className="mb-4 inline-block font-accent text-xs uppercase tracking-[0.22em] text-[#A8458C]">
              {isEn ? "Specialized fronts" : "Frentes especializadas"}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#14110D] sm:text-4xl md:text-[3rem]">
              {isEn ? "Crypto marketing, deep and specialized" : "Marketing cripto, fundo e especializado"}
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialized.map((s, i) => {
              const hex = accentHex(s.accent);
              const deep = accentDeep(s.accent);
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.07}>
                  <Link href={withLang(s.href)} className="group block h-full">
                    <div className="flex h-full flex-col rounded-2xl border-[1.5px] border-[#14110D] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0_#14110D]">
                      <span
                        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border-[1.5px] border-[#14110D]"
                        style={{ background: `${hex}22` }}
                      >
                        <s.icon className="h-5 w-5" style={{ color: deep }} />
                      </span>
                      <h3 className="mb-2 font-display text-xl font-bold leading-snug text-[#14110D]">
                        {s.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-[#5c544a]">{s.desc}</p>
                      <span
                        className="mt-6 inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.18em]"
                        style={{ color: deep }}
                      >
                        {isEn ? "See service" : "Ver serviço"}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Faixa de prova social ---------------- */}
      <section className="bg-[#14110D] px-6 py-20 sm:py-24">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border-[1.5px] border-white/20 bg-white/15 md:grid-cols-4">
              {[
                { v: KALEIDOS_METRICS.videosEditados, l: isEn ? "Videos edited" : "Vídeos editados" },
                { v: KALEIDOS_METRICS.designsCriados, l: isEn ? "Design assets" : "Peças de design" },
                { v: KALEIDOS_METRICS.lancamentos, l: isEn ? "Launches" : "Lançamentos" },
                { v: KALEIDOS_METRICS.satisfacaoCliente, l: isEn ? "Satisfaction" : "Satisfação" },
              ].map((m) => (
                <div key={m.l} className="bg-[#14110D] p-8 text-center">
                  <div className="font-display text-4xl font-bold sm:text-5xl" style={{ color: GREEN }}>
                    {m.v}
                  </div>
                  <div className="mt-2 text-sm text-[#b8b1a6]">{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA de conversão — Calendly primário */}
          <Reveal delay={0.1} className="mt-12 text-center">
            <p className="mx-auto max-w-xl text-base text-[#b8b1a6] sm:text-lg">
              {isEn
                ? "30 minutes, no commitment. Bring your project — we'll bring the plan."
                : "30 minutos, sem compromisso. Traz o seu projeto, que a gente traz o plano."}
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("calendly_metrics_band", "service-index")}
              className="mt-7 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
              style={{ background: GREEN, boxShadow: "5px 5px 0 #ffffff33" }}
            >
              {isEn
                ? "Book a free diagnosis (30min)"
                : "Agendar diagnóstico gratuito (30min)"}
              <ArrowRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA seletor de serviços (reuso) ---------------- */}
      <CtaAjuda variant="light" />

      <FooterDemo />
    </main>
  );
}
