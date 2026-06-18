"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PenTool,
  Video,
  Brain,
  Rocket,
  Mail,
  Workflow,
} from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useAnalytics } from "@/components/analytics";

/**
 * "Nossos Serviços" — estilo "Our Services" do Lunar Strategy.
 * Título gigante à esquerda + lista numerada (01..06) com título, descrição,
 * ícone e "Saiba mais". Seção escura, on-brand Kaleidos.
 */
export function ServicesList() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    locale === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;
  const { trackClick } = useAnalytics();

  const services = isEn
    ? [
        {
          icon: PenTool,
          title: "Content Marketing",
          desc: "Strategy, copy, scripts, design and reels editing across IG, X, YouTube and LinkedIn — the editorial engine behind the brand.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Video,
          title: "Video & Motion",
          desc: "Reels, ads and institutional videos with motion graphics and kinetic typography, engineered for retention.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          desc: "Custom AI agents, automations and content engines that multiply output without losing brand voice.",
          href: "/servicos/ia-automacoes-completa",
        },
        {
          icon: Rocket,
          title: "Growth & Launches",
          desc: "Full launch operations: funnels, capture pages, paid-traffic creatives and lead generation built to perform.",
          href: "/servicos/growth-lancamentos",
        },
        {
          icon: Mail,
          title: "Newsletter & Authority",
          desc: "From-scratch newsletters, editorial reports and authority papers that turn attention into trust.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Workflow,
          title: "Sites & Web Apps",
          desc: "Next.js landing pages, dashboards and platforms — design and dev under one roof.",
          href: "/servicos/ia-automacoes-completa",
        },
      ]
    : [
        {
          icon: PenTool,
          title: "Marketing de Conteúdo",
          desc: "Estratégia, copy, roteiros, design e edição de reels no IG, X, YouTube e LinkedIn. O motor editorial por trás da marca.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Video,
          title: "Vídeo & Motion",
          desc: "Reels, anúncios e institucionais com motion graphics e tipografia cinética, desenhados pra retenção.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          desc: "Agentes de IA sob medida, automações e engines de conteúdo que multiplicam a produção sem perder voz de marca.",
          href: "/servicos/ia-automacoes-completa",
        },
        {
          icon: Rocket,
          title: "Growth & Lançamentos",
          desc: "Operação completa de lançamento: funis, páginas de captura, criativos pra tráfego pago e geração de leads.",
          href: "/servicos/growth-lancamentos",
        },
        {
          icon: Mail,
          title: "Newsletter & Autoridade",
          desc: "Newsletters do zero, relatórios editoriais e papers de autoridade que transformam atenção em confiança.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Workflow,
          title: "Sites & Web Apps",
          desc: "Landing pages em Next.js, dashboards e plataformas. Design e dev no mesmo time.",
          href: "/servicos/ia-automacoes-completa",
        },
      ];

  return (
    <section className="bg-[#0A0A0A] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Coluna título (sticky no desktop, igual Lunar) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#7CF067]">
              {isEn ? "What we do" : "O que fazemos"}
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {isEn ? "Our" : "Nossos"}
              <br />
              {isEn ? "Services" : "Serviços"}
              <span className="text-[#D262B2]">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-gray-400">
              {isEn
                ? "Content, growth and product under one roof. Pick a front — or let us run the whole engine."
                : "Conteúdo, growth e produto no mesmo lugar. Escolha uma frente, ou deixe a gente rodar o motor inteiro."}
            </p>
            <Link
              href={withLang("/servicos")}
              onClick={() => trackClick("services_see_all", "services_list")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7CF067] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#6ae05a]"
            >
              {isEn ? "See all services" : "Ver todos os serviços"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Lista numerada */}
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={withLang(s.href)}
                  onClick={() => trackClick(`service_${s.title}`, "services_list")}
                  className="group flex items-start gap-5 py-7 transition-colors sm:gap-7"
                >
                  <span className="mt-1 font-mono text-sm tabular-nums text-white/30 transition-colors group-hover:text-[#D262B2]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[#7CF067] ring-1 ring-white/10 transition-colors group-hover:bg-[#7CF067] group-hover:text-black">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#7CF067] sm:text-2xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
                      {s.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D262B2] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0">
                      {isEn ? "Learn more" : "Saiba mais"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <ArrowRight className="mt-2 hidden h-5 w-5 shrink-0 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-white sm:block" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
