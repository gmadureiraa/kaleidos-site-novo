"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PenTool,
  Share2,
  Rocket,
  Compass,
  Search,
  Megaphone,
  Users,
  MessagesSquare,
  Brain,
} from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useAnalytics } from "@/components/analytics";

/**
 * "Nossos Serviços" — estilo "Our Services" do Lunar Strategy.
 * Título gigante à esquerda + lista numerada (01..06) com título, descrição,
 * ícone e "Saiba mais". Seção escura, on-brand Kaleidos.
 */
export function ServicesList({
  ctaVariant = "services",
}: {
  /** "services" (default, home) → botão "Ver todos os serviços" pra /servicos.
   *  "whatsapp" (rota /2) → botão "Falar com a gente" direto pro WhatsApp. */
  ctaVariant?: "services" | "whatsapp";
} = {}) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    locale === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;
  const { trackClick } = useAnalytics();

  // MOBILE: a lista de 9 serviços ficava longa demais numa tela pequena.
  // Mostramos os 5 primeiros e um botão "Ver todos" expande o resto.
  // Desktop (sm+) sempre mostra os 9. Nenhum serviço foi removido.
  const MOBILE_VISIBLE = 5;
  const [showAllMobile, setShowAllMobile] = useState(false);

  const services = isEn
    ? [
        {
          icon: PenTool,
          title: "Content Marketing",
          desc: "Strategy, copy, scripts, design and editing across IG, X, YouTube and LinkedIn. The editorial engine behind the brand's authority.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Share2,
          title: "Crypto Social Media",
          desc: "Native social management at the pace of the narrative: daily presence that tracks every move of the cycle.",
          href: "/servicos/social-media-cripto",
        },
        {
          icon: Rocket,
          title: "Growth & Launches",
          desc: "Full launch and paid-traffic operations: funnels, capture pages and creatives that turn into TGE, listing and revenue.",
          href: "/servicos/growth-lancamentos",
        },
        {
          icon: Compass,
          title: "Consulting & GTM",
          desc: "Positioning, narrative and go-to-market that align product, brand and token into one growth system.",
          href: "/servicos/consultoria-gtm",
        },
        {
          icon: Search,
          title: "Crypto SEO & GEO",
          desc: "Content that ranks on Google and becomes the answer ChatGPT and Perplexity cite. Organic demand that doesn't vanish when budget runs out.",
          href: "/servicos/seo-cripto",
        },
        {
          icon: Megaphone,
          title: "PR & Press",
          desc: "Brand positioning across outlets, research and crypto media. Authority built on proof, not empty press releases.",
          href: "/servicos/pr-assessoria",
        },
        {
          icon: Users,
          title: "Influencer & KOL",
          desc: "Curation and campaigns with real crypto KOLs. Reach earned through voices the community actually trusts, no vanity metrics.",
          href: "/servicos/influencer-kol",
        },
        {
          icon: MessagesSquare,
          title: "Crypto Community",
          desc: "Discord, Telegram and programs that turn followers into active members, and short-term attention into retention.",
          href: "/servicos/comunidade-cripto",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          desc: "Custom AI agents, automations and content engines that multiply output without losing brand voice.",
          href: "/servicos/ia-automacoes-completa",
        },
      ]
    : [
        {
          icon: PenTool,
          title: "Marketing de Conteúdo",
          desc: "Estratégia, copy, roteiros, design e edição no IG, X, YouTube e LinkedIn. O motor editorial que sustenta a autoridade da marca.",
          href: "/servicos/marketing-conteudo",
        },
        {
          icon: Share2,
          title: "Social Media Cripto",
          desc: "Gestão de redes nativa do mercado, no ritmo da narrativa: presença diária que acompanha cada movimento do ciclo.",
          href: "/servicos/social-media-cripto",
        },
        {
          icon: Rocket,
          title: "Growth & Lançamentos",
          desc: "Operação completa de lançamento e tráfego pago: funis, páginas de captura e criativos que viram TGE, listagem e receita.",
          href: "/servicos/growth-lancamentos",
        },
        {
          icon: Compass,
          title: "Consultoria & GTM",
          desc: "Posicionamento, narrativa e go-to-market que alinham produto, marca e token num só sistema de crescimento.",
          href: "/servicos/consultoria-gtm",
        },
        {
          icon: Search,
          title: "SEO & GEO Cripto",
          desc: "Conteúdo que rankeia no Google e vira a resposta que ChatGPT e Perplexity citam. Demanda orgânica que não some quando o budget acaba.",
          href: "/servicos/seo-cripto",
        },
        {
          icon: Megaphone,
          title: "PR & Assessoria",
          desc: "Posicionamento de marca em veículos, research e mídia cripto. Autoridade construída com prova, não com press release vazio.",
          href: "/servicos/pr-assessoria",
        },
        {
          icon: Users,
          title: "Influencer & KOL",
          desc: "Curadoria e campanhas com KOLs cripto de verdade. Alcance com voz que a comunidade respeita, sem métrica de vaidade.",
          href: "/servicos/influencer-kol",
        },
        {
          icon: MessagesSquare,
          title: "Comunidade Cripto",
          desc: "Discord, Telegram e programas que transformam seguidor em membro ativo, e atenção de curto prazo em retenção.",
          href: "/servicos/comunidade-cripto",
        },
        {
          icon: Brain,
          title: "Kaleidos AI",
          desc: "Agentes de IA sob medida, automações e engines de conteúdo que multiplicam a produção sem perder a voz da marca.",
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
                ? "Content, growth and strategy under one roof. Pick a front, or let us run the whole engine."
                : "Conteúdo, growth e estratégia no mesmo time. Escolha uma frente, ou deixe a gente rodar o motor inteiro."}
            </p>
            {ctaVariant === "whatsapp" ? (
              <div className="mt-7 flex flex-col items-start gap-3">
                <a
                  href="https://calendly.com/madureira-kaleidosdigital/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("services_calendly", "services_list")}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#7CF067] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#6ae05a]"
                >
                  {isEn ? "Book a meeting" : "Agendar reunião"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/5512997796835"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("services_whatsapp", "services_list")}
                  className="text-sm font-medium text-gray-400 underline underline-offset-4 transition-colors hover:text-white"
                >
                  {isEn ? "Prefer WhatsApp?" : "Prefere WhatsApp?"}
                </a>
              </div>
            ) : (
              <Link
                href={withLang("/servicos")}
                onClick={() => trackClick("services_see_all", "services_list")}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7CF067] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#6ae05a]"
              >
                {isEn ? "See all services" : "Ver todos os serviços"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>

          {/* Lista numerada */}
          <div>
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                className={
                  i >= MOBILE_VISIBLE && !showAllMobile ? "hidden sm:block" : undefined
                }
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
          {/* Toggle só no mobile: expande os serviços restantes. */}
          {!showAllMobile && (
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="mt-6 w-full rounded-xl border border-white/15 bg-white/[0.03] py-3.5 text-sm font-semibold text-gray-300 transition-colors hover:text-white sm:hidden"
            >
              {isEn
                ? `See all ${services.length} services`
                : `Ver todos os ${services.length} serviços`}
            </button>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
