"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  Brain,
  Rocket,
  Video,
  FileText,
  Mail,
  BarChart3,
  Workflow,
  Brush,
  Sparkles,
} from "lucide-react";
import { FooterDemo } from "@/components/ui/footer-demo";
import { CtaAjuda } from "@/components/ui/cta-ajuda";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import { useI18n } from "@/i18n/useI18n";

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicosPage() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    locale === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  /* Os 3 pilares = páginas de serviço que já existem */
  const pillars = isEn
    ? [
        {
          icon: PenTool,
          title: "Content Marketing",
          tagline: "Content that builds attention.",
          desc: "Strategy, copy, scripts, design and video editing across IG, X, YouTube and LinkedIn — the editorial engine behind the brand.",
          href: "/servicos/marketing-conteudo",
          items: ["Copywriting & scripts", "Reels & video editing", "Design & social media", "Editorial calendar"],
          accent: "green" as const,
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          tagline: "Automation that scales the team.",
          desc: "Custom AI agents, automations and content engines that multiply output without losing brand voice or editorial quality.",
          href: "/servicos/ia-automacoes-completa",
          items: ["AI content engines", "n8n & workflow automation", "Custom AI agents", "Chatbots & ops"],
          accent: "pink" as const,
        },
        {
          icon: Rocket,
          title: "Growth & Launches",
          tagline: "Funnels that convert.",
          desc: "Full launch operations: funnels, capture pages, paid traffic creatives, newsletters and lead generation built to perform.",
          href: "/servicos/growth-lancamentos",
          items: ["Launch strategy", "Paid traffic creatives", "Capture pages & funnels", "Lead generation"],
          accent: "green" as const,
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
          accent: "green" as const,
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          tagline: "Automação que escala o time.",
          desc: "Agentes de IA sob medida, automações e engines de conteúdo que multiplicam a produção sem perder voz de marca nem qualidade editorial.",
          href: "/servicos/ia-automacoes-completa",
          items: ["Engines de conteúdo com IA", "Automação n8n & workflows", "Agentes de IA sob medida", "Chatbots & operação"],
          accent: "pink" as const,
        },
        {
          icon: Rocket,
          title: "Growth & Lançamentos",
          tagline: "Funis que convertem.",
          desc: "Operação completa de lançamento: funis, páginas de captura, criativos para tráfego pago, newsletters e geração de leads feitos pra performar.",
          href: "/servicos/growth-lancamentos",
          items: ["Estratégia de lançamento", "Criativos para tráfego pago", "Páginas de captura & funis", "Geração de leads"],
          accent: "green" as const,
        },
      ];

  /* Capacidades detalhadas (grid completo) */
  const capabilities = isEn
    ? [
        { icon: Video, title: "Video Editing", desc: "Reels, ads and institutional videos with motion graphics." },
        { icon: PenTool, title: "Scripts", desc: "Hooks and scripts engineered for retention." },
        { icon: FileText, title: "Content Creation", desc: "Multi-platform posts, carousels and copy." },
        { icon: Brush, title: "Design & Identity", desc: "Visual identity, banners and brand systems." },
        { icon: BarChart3, title: "Social Media", desc: "Calendar, publishing and performance analysis." },
        { icon: Mail, title: "Newsletter & Reports", desc: "From-scratch newsletters and editorial reports." },
        { icon: Workflow, title: "Sites & Web Apps", desc: "Next.js landing pages, dashboards and platforms." },
        { icon: Brain, title: "AI & Automation", desc: "Agents and workflows that scale operations." },
      ]
    : [
        { icon: Video, title: "Edição de Vídeo", desc: "Reels, anúncios e institucionais com motion graphics." },
        { icon: PenTool, title: "Roteiros", desc: "Ganchos e roteiros desenhados para retenção." },
        { icon: FileText, title: "Criação de Conteúdo", desc: "Posts, carrosséis e copy multiplataforma." },
        { icon: Brush, title: "Design & Identidade", desc: "Identidade visual, banners e sistemas de marca." },
        { icon: BarChart3, title: "Social Media", desc: "Calendário, publicação e análise de performance." },
        { icon: Mail, title: "Newsletter & Relatórios", desc: "Newsletters do zero e relatórios editoriais." },
        { icon: Workflow, title: "Sites & Web Apps", desc: "Landing pages em Next.js, dashboards e plataformas." },
        { icon: Brain, title: "IA & Automação", desc: "Agentes e workflows que escalam a operação." },
      ];

  return (
    <main className="min-h-screen bg-white">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-black px-6 py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7CFF6B]/15 via-black to-black" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/10 px-4 py-2 text-sm font-medium text-[#7CFF6B]"
          >
            <Sparkles className="h-4 w-4" />
            {isEn ? "Services" : "Serviços"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {isEn ? "Everything to grow," : "Tudo pra crescer,"}{" "}
            <span className="text-[#7CFF6B]">{isEn ? "in one team." : "em um time só."}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {isEn
              ? "Content, growth and product under one roof. Kaleidos covers the full stack so crypto, web3 and fintech projects can ship without juggling vendors."
              : "Conteúdo, growth e produto no mesmo lugar. A Kaleidos cobre a stack completa pra projetos cripto, web3 e fintech entregarem sem orquestrar vários fornecedores."}
          </motion.p>
        </div>
      </section>

      {/* ---------------- 3 Pilares ---------------- */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <p className="mb-4 font-accent text-sm uppercase tracking-widest text-pink-500">
              {isEn ? "Three fronts" : "Três frentes"}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-black sm:text-4xl">
              {isEn ? "How Kaleidos organizes the work" : "Como a Kaleidos organiza o trabalho"}
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => {
              const ring = p.accent === "pink" ? "hover:border-pink-300" : "hover:border-[#7CFF6B]/50";
              const iconBg =
                p.accent === "pink"
                  ? "bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white"
                  : "bg-black text-[#7CFF6B] group-hover:bg-[#7CFF6B] group-hover:text-black";
              const dot = p.accent === "pink" ? "bg-pink-500" : "bg-[#7CFF6B]";
              const linkColor = p.accent === "pink" ? "text-pink-600" : "text-emerald-600";
              return (
                <Reveal key={p.title} delay={i * 0.12}>
                  <Link href={withLang(p.href)} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className={`flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_6px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] ${ring}`}
                    >
                      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${iconBg}`}>
                        <p.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-black">{p.title}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-500">{p.tagline}</p>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                      <ul className="mt-6 space-y-2.5">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-center gap-2.5 text-sm text-gray-700">
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                            {it}
                          </li>
                        ))}
                      </ul>
                      <span className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${linkColor}`}>
                        {isEn ? "Explore" : "Explorar"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Capacidades (grid completo) ---------------- */}
      <section className="bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <p className="mb-4 font-accent text-sm uppercase tracking-widest text-[#7CFF6B]">
              {isEn ? "Capabilities" : "Capacidades"}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isEn ? "The full toolbox" : "A caixa de ferramentas completa"}
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#7CFF6B]/40">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#7CFF6B]/10 text-[#7CFF6B] transition-colors group-hover:bg-[#7CFF6B] group-hover:text-black">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-bold text-white">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* faixa de prova social */}
          <Reveal delay={0.2} className="mt-16">
            <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center md:grid-cols-4">
              <div>
                <div className="font-display text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.videosEditados}</div>
                <div className="mt-1 text-xs text-gray-400">{isEn ? "Videos edited" : "Vídeos editados"}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.designsCriados}</div>
                <div className="mt-1 text-xs text-gray-400">{isEn ? "Design assets" : "Peças de design"}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.lancamentos}</div>
                <div className="mt-1 text-xs text-gray-400">{isEn ? "Launches" : "Lançamentos"}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.satisfacaoCliente}</div>
                <div className="mt-1 text-xs text-gray-400">{isEn ? "Satisfaction" : "Satisfação"}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA seletor de serviços (reuso) ---------------- */}
      <CtaAjuda variant="light" />

      <FooterDemo />
    </main>
  );
}
