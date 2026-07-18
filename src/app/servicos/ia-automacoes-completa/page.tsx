"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Mail,
  FileText,
  Cpu,
  Compass,
  CheckCircle2,
  Sparkles,
  Radar,
  Film,
  Plus,
  Minus,
  Calendar,
  Repeat,
  Wrench,
} from "lucide-react";

import { WHATSAPP_NUMBER, CALENDLY_URL } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import { FooterDemo } from "@/components/ui/footer-demo";
import { generateServiceSchema } from "@/lib/seo-helpers";
import { useAnalytics } from "@/components/analytics";
import { getLeadMetadata } from "@/lib/lead-meta";
import { getTrackingIds } from "@/lib/tracking-ids";
import CardFlip from "@/components/kokonutui/card-flip";
import AIStateLoading from "@/components/kokonutui/ai-state-loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * Kaleidos AI — landing de serviço institucional.
 * Promessa: até 70% do dia da operação, recuperado.
 * Tom: 3ª pessoa Kaleidos. Dark + lime #7CF067. Padrão visual /lp.
 */
export default function KaleidosIAPage() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const { trackWhatsApp, trackClick } = useAnalytics();

  const serviceSchema = generateServiceSchema(
    "Kaleidos AI — IA e Automações",
    "Auditoria + implementação de IA na operação. Até 70% do tempo recuperado em conteúdo, atendimento, pesquisa e cobrança."
  );

  const handleWhatsApp = (origem: string) => {
    const text = locale === "en"
      ? "Hi! I want to know more about Kaleidos AI. I have a bottleneck in:"
      : "Oi! Quero saber mais sobre o Kaleidos AI. Meu gargalo principal é:";
    trackWhatsApp("servico_ia_automacoes", origem);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleWhatsAppSpecific = (service: string) => {
    const message = isEn
      ? `Hello! I need help with ${service}. Can you help me?`
      : `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
    trackWhatsApp("servico_ia_automacoes", `service_${service}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCalendly = (where: string) => {
    trackClick(`calendly_${where}`, "service-ia-automacoes-completa");
  };

  const openCalendly = (where: string) => {
    handleCalendly(where);
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <main
      id="main-content"
      role="main"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Background gradient + grid (mesmo do /lp) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7CF067]/15 via-black to-black" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ================================================================ */}
      {/* 1. HERO                                                           */}
      {/* ================================================================ */}
      <HeroSection
        isEn={isEn}
        onCta={() => handleWhatsApp("hero_cta")}
        onCalendly={() => handleCalendly("hero")}
      />

      {/* ================================================================ */}
      {/* 2. CARROSSEL FLIP — problema → solução IA (cards interativos)    */}
      {/* ================================================================ */}
      <FlipCarouselSection
        locale={locale}
        onCard={(t) => handleWhatsAppSpecific(t)}
      />

      {/* ================================================================ */}
      {/* 3. PROCESSO                                                       */}
      {/* ================================================================ */}
      <ProcessSection isEn={isEn} />

      {/* ================================================================ */}
      {/* 3.5 O QUE ENTREGAMOS                                              */}
      {/* ================================================================ */}
      <DeliverablesSection isEn={isEn} />

      {/* ================================================================ */}
      {/* 4. CASES (2 destaques antes/depois)                               */}
      {/* ================================================================ */}
      <CasesSection isEn={isEn} />

      {/* ================================================================ */}
      {/* 5. OPERAÇÃO RODANDO — carrossel de 10+ projetos (clientes + tools) */}
      {/* ================================================================ */}
      <OperationsCarouselSection isEn={isEn} />

      {/* ================================================================ */}
      {/* 6. COMO TRABALHAMOS (modalidades sem preço)                       */}
      {/* ================================================================ */}
      <ModalitiesSection
        isEn={isEn}
        onCta={(t) =>
          t === "diagnostico"
            ? openCalendly("modalidade_diagnostico")
            : handleWhatsApp(`modalidade_${t}`)
        }
      />

      {/* ================================================================ */}
      {/* 7. CTA + FORM (movido pra cima — antes do FAQ — pra capturar leads */}
      {/*    quentes que chegam até modalidades. FAQ vira objection killer  */}
      {/*    pós-form pra quem ainda hesita.)                                */}
      {/* ================================================================ */}
      <FinalCtaSection isEn={isEn} />

      {/* ================================================================ */}
      {/* 7.5 PROVA — case real de IA na operação                           */}
      {/* ================================================================ */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
          <p className="font-accent text-xs uppercase tracking-[0.22em] text-[#7CF067]">
            {isEn ? "Real case" : "Case real"}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300 sm:text-xl">
            {isEn ? (
              <>
                At <strong className="text-white">Defiverso</strong>, Kaleidos runs
                AI-powered Twitter automation inside a content operation that generated{" "}
                <strong className="text-[#7CF067]">12M organic views in 90 days</strong>{" "}
                and <strong className="text-[#7CF067]">29K+ enrollments</strong> in the
                lead-magnet mini course.
              </>
            ) : (
              <>
                No <strong className="text-white">Defiverso</strong>, a Kaleidos roda
                automação de Twitter com IA dentro de uma operação de conteúdo que gerou{" "}
                <strong className="text-[#7CF067]">12M de views orgânicas em 90 dias</strong>{" "}
                e <strong className="text-[#7CF067]">29 mil+ inscrições</strong> no
                minicurso de captação.
              </>
            )}
          </p>
          <Link
            href="/cases/defiverso"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7CF067] hover:underline"
          >
            {isEn ? "See the full case" : "Ver o case completo"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FAQ (objection handling final)                                 */}
      {/* ================================================================ */}
      <FAQSection isEn={isEn} />

      <FooterDemo />

      {/* Sticky bottom CTA mobile — aparece após scroll do hero (P0 audit) */}
      <StickyMobileCTA isEn={isEn} onCta={() => handleWhatsApp("sticky_mobile")} />
    </main>
  );
}

/* =================================================================== */
/* STICKY MOBILE CTA — aparece após scroll > 1 viewport (mobile only) */
/* =================================================================== */

function StickyMobileCTA({ isEn, onCta }: { isEn: boolean; onCta: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // Mostra a partir de 60% do viewport scrollado (pós-hero).
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#7CF067] px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_32px_rgba(124,240,103,0.4)] transition-all duration-300 sm:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <button
        onClick={onCta}
        className="inline-flex items-center gap-2 whitespace-nowrap"
      >
        💬 {isEn ? "Talk now" : "Falar agora"} <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* =================================================================== */
/* HERO                                                                */
/* =================================================================== */

function HeroSection({
  isEn,
  onCta,
  onCalendly,
}: {
  isEn: boolean;
  onCta: () => void;
  onCalendly: () => void;
}) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7CF067]/20 bg-[#7CF067]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#7CF067] sm:text-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#7CF067]" />
        {isEn
          ? "Kaleidos AI · AI inside the operation, not around it"
          : "Kaleidos AI · IA dentro da operação, não em volta dela"}
      </span>

      <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
        {isEn ? (
          <>
            Increase your company&apos;s productivity{" "}
            <span className="text-[#7CF067]">3x</span>
            <br className="hidden sm:block" /> with Kaleidos.
          </>
        ) : (
          <>
            Aumente em <span className="text-[#7CF067]">3x</span> a produtividade
            <br className="hidden sm:block" /> da sua empresa com a Kaleidos.
          </>
        )}
      </h1>

      <p className="mt-6 max-w-2xl text-base text-gray-400 sm:text-lg">
        {isEn
          ? "AI inside the workflow you already have. Code in the client's repository, no lock-in."
          : "IA dentro do fluxo que já existe. Código no repositório do cliente, sem lock-in."}
      </p>

      {/* Trust signals — micro badges acima dos CTAs (P0 do audit) */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CF067]" />
          <strong className="text-white">{isEn ? "8 brands" : "8 marcas"}</strong>{" "}
          {isEn ? "operating" : "operando"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CF067]" />
          <strong className="text-white">{isEn ? "5+ years" : "5+ anos"}</strong>{" "}
          {isEn ? "of operation" : "de operação"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CF067]" />
          <strong className="text-white">{isEn ? "10+ fronts" : "10+ frentes"}</strong>{" "}
          {isEn ? "automated" : "automatizadas"}
        </span>
      </div>

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCalendly}
          className="group inline-flex items-center gap-2 rounded-full bg-[#7CF067] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,240,103,0.7)] sm:text-base"
        >
          {isEn ? "Book a free diagnosis (30min)" : "Agendar diagnóstico gratuito (30min)"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <button
          type="button"
          onClick={onCta}
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#25D366]/40 hover:bg-white/[0.06] sm:text-base"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          {isEn ? "Talk on WhatsApp" : "Falar no WhatsApp"}
        </button>
        <button
          onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#7CF067]/30 hover:bg-white/[0.06] sm:text-base"
        >
          {isEn ? "Get it by email" : "Receber por email"}
          <ArrowUpRight className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CF067]" />
        </button>
      </div>

      {/* AI state pulse — substitui stat bar visual, mostra IA "respirando" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
      >
        <AIStateLoading />
      </motion.div>
    </section>
  );
}



/* =================================================================== */
/* PROCESSO                                                            */
/* =================================================================== */

function ProcessSection({ isEn }: { isEn: boolean }) {
  const steps = isEn
    ? [
        {
          number: "01",
          title: "Free diagnosis",
          body: "A 30-45 min call. We map your 3 biggest bottlenecks and return a plan.",
          duration: "30-45 min · free",
        },
        {
          number: "02",
          title: "Bottleneck map",
          body: "A prioritized plan: what gets automated first, what needs process, what AI won't solve.",
          duration: "Delivered in 48h",
        },
        {
          number: "03",
          title: "Build",
          body: "The Kaleidos team implements on the client's stack. Biweekly sprints, code in their repository from day 1.",
          duration: "4-8 weeks",
        },
        {
          number: "04",
          title: "Continuous iteration",
          body: "Hours-recovered metric reviewed every month. Next bottlenecks tackled.",
          duration: "Recurring",
        },
      ]
    : [
        {
          number: "01",
          title: "Diagnóstico gratuito",
          body: "Call de 30-45 min. Mapeio os 3 maiores gargalos e devolvo um plano.",
          duration: "30-45 min · gratuito",
        },
        {
          number: "02",
          title: "Mapa de gargalos",
          body: "Plano com prioridade: o que automatiza primeiro, o que precisa de processo, o que IA não resolve.",
          duration: "Entregue em 48h",
        },
        {
          number: "03",
          title: "Build",
          body: "Time Kaleidos implementa na stack do cliente. Sprints quinzenais, código no repositório dele desde o dia 1.",
          duration: "4-8 semanas",
        },
        {
          number: "04",
          title: "Iteração contínua",
          body: "Métrica de hora liberada revisada todo mês. Próximos gargalos atacados.",
          duration: "Recorrente",
        },
      ];

  return (
    <section
      aria-label={isEn ? "Process" : "Processo"}
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {isEn ? "Process" : "Processo"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn ? "How it works." : "Como funciona."}
        </h2>
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.number}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
              {isEn ? "Step" : "Passo"} {s.number}
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-gray-400 sm:text-[15px]">{s.body}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#7CF067]/20 bg-[#7CF067]/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#7CF067]">
              <Clock className="h-3 w-3" /> {s.duration}
            </div>
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-[#7CF067]/40 to-transparent md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =================================================================== */
/* O QUE ENTREGAMOS                                                    */
/* =================================================================== */

function DeliverablesSection({ isEn }: { isEn: boolean }) {
  const items = isEn
    ? [
        "Diagnosis and bottleneck map of the operation",
        "N1 support agent (chat, WhatsApp, FAQ)",
        "Automated content generation (carousels, posts, scripts)",
        "Automated research and briefing pipeline",
        "Automated billing follow-up (Stripe + WhatsApp + email)",
        "Automatic lead qualification and reply",
        "Automated cross-posting (1 video → multiple networks)",
        "Automatic dashboards and reports",
        "Tool integrations (n8n, APIs, webhooks)",
        "Custom system under scope (TS + Python + Supabase)",
        "Code in the client's repository, no lock-in",
        "Documentation, technical handoff and monthly iteration",
      ]
    : [
        "Diagnóstico e mapa de gargalos da operação",
        "Agente de atendimento N1 (chat, WhatsApp, FAQ)",
        "Automação de geração de conteúdo (carrossel, posts, roteiros)",
        "Pipeline de pesquisa e briefing automatizado",
        "Régua de cobrança automática (Stripe + WhatsApp + email)",
        "Qualificação e resposta automática de leads",
        "Cross-post automatizado (1 vídeo → várias redes)",
        "Dashboards e relatórios automáticos",
        "Integrações entre ferramentas (n8n, APIs, webhooks)",
        "Sistema customizado sob escopo (TS + Python + Supabase)",
        "Código no repositório do cliente, sem lock-in",
        "Documentação, handoff técnico e iteração mensal",
      ];

  return (
    <section
      aria-label={isEn ? "What we deliver" : "O que entregamos"}
      className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {isEn ? "Deliverables" : "Entregáveis"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn ? "What we deliver." : "O que entregamos."}
        </h2>
        <p className="mt-4 text-base text-gray-400 sm:text-lg">
          {isEn
            ? "The concrete things that come out of the operation, no black box."
            : "As coisas concretas que saem da operação, sem caixa-preta."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7CF067]" />
            <span className="text-sm text-gray-200 sm:text-[15px]">{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =================================================================== */
/* CASES                                                               */
/* =================================================================== */

function CasesSection({ isEn }: { isEn: boolean }) {
  // Cases destaque (2 protagonistas — narrativa concreta)
  const featured = isEn
    ? [
        {
          slug: "renan-consultoria",
          cliente: "Renan · Financial consulting",
          vertical: "Financial consultant",
          stack: "Meeting → actionable plan (AI + shared platform)",
          headline: "1-on-1 meetings that automatically become an actionable plan.",
          antes:
            "Plan defined on the call. By Friday the details were gone. Client forgot tasks, consultant forgot follow-ups.",
          depois:
            "Call recorded and summarized by AI. The plan lands on a shared platform: tasks, deadlines and next steps for each side.",
          destaque: "Zero details lost. The consultant scales without losing quality.",
        },
        {
          slug: "radar-viral",
          cliente: "Radar Viral · Kaleidos platform",
          vertical: "Automated cross-posting",
          stack: "Post monitor + cross-network generation",
          headline: "1 video → 5 cross-network assets in minutes.",
          antes:
            "Post on YouTube or IG and lose reach. Cross-posting is manual, or doesn't happen. Inconsistent voice.",
          depois:
            "Radar monitors the posts and generates derivatives: X thread, LinkedIn post, IG carousel, email. Format adapted per channel.",
          destaque: "5 networks covered in 1 click. Minutes instead of hours.",
        },
      ]
    : [
        {
          slug: "renan-consultoria",
          cliente: "Renan · Consultoria financeira",
          vertical: "Consultor financeiro",
          stack: "Reunião → plano executável (IA + plataforma compartilhada)",
          headline: "Reuniões 1-1 que viram plano executável automaticamente.",
          antes:
            "Plano definido na call. Até sexta os detalhes sumiam. Cliente esquecia tarefa, consultor esquecia follow-up.",
          depois:
            "Call gravada e resumida por IA. Plano cai numa plataforma compartilhada: tarefas, prazos e próximos passos pra cada lado.",
          destaque:
            "Zero detalhe perdido. Consultor escala sem perder qualidade.",
        },
        {
          slug: "radar-viral",
          cliente: "Radar Viral · Plataforma própria Kaleidos",
          vertical: "Cross-post automatizado",
          stack: "Monitor de postagens + geração cross-rede",
          headline: "1 vídeo → 5 conteúdos cross-rede em minutos.",
          antes:
            "Posta no YouTube ou IG e perde reach. Cross-post é manual, ou não acontece. Voz inconsistente.",
          depois:
            "Radar monitora as postagens e gera derivados: thread no X, post LinkedIn, carrossel IG, e-mail. Formato adaptado por canal.",
          destaque: "5 redes cobertas em 1 click. Minutos no lugar de horas.",
        },
      ];

  return (
    <section
      aria-label="Cases"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          Cases
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn ? "What is already running." : "O que já roda."}
        </h2>
      </div>

      {/* Cases destaque — 2 protagonistas com antes/depois */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="group flex flex-col rounded-2xl border border-[#7CF067]/15 bg-gradient-to-br from-[#7CF067]/[0.04] via-white/[0.02] to-white/[0.02] p-6 transition-all hover:-translate-y-0.5 hover:border-[#7CF067]/30 hover:bg-white/[0.05] sm:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-[#7CF067]/20 bg-[#7CF067]/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#7CF067]">
                {c.vertical}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">
              {c.cliente}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#7CF067]">
              {c.stack}
            </p>
            <p className="mt-4 font-display text-lg leading-snug text-white sm:text-xl">
              {c.headline}
            </p>

            <div className="mt-5 space-y-3 border-t border-white/5 pt-5 text-sm">
              <div className="flex gap-3 text-gray-500">
                <span className="font-mono text-[10px] shrink-0 uppercase tracking-wider text-gray-600 pt-0.5">
                  {isEn ? "before" : "antes"}
                </span>
                <span className="flex-1">{c.antes}</span>
              </div>
              <div className="flex gap-3 text-gray-300">
                <span className="font-mono text-[10px] shrink-0 uppercase tracking-wider text-[#7CF067] pt-0.5">
                  {isEn ? "after" : "depois"}
                </span>
                <span className="flex-1">{c.depois}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-white/5 pt-4 text-sm text-gray-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                {isEn ? "Result" : "Resultado"} ·{" "}
              </span>
              {c.destaque}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

/* =================================================================== */
/* OPERAÇÃO RODANDO — 10 cases reais (clientes + produtos próprios)   */
/* =================================================================== */

function OperationsCarouselSection({ isEn }: { isEn: boolean }) {
  const cases = [
    {
      kind: "produto" as const,
      Icon: Sparkles,
      cliente: "Sequência Viral",
      vertical: isEn ? "Own product" : "Produto próprio",
      solucao: isEn
        ? "Viral carousel in 30s from a 3-line brief"
        : "Carrossel viral em 30s a partir de brief de 3 linhas",
      stack: "Next + Gemini + Imagen + Stripe",
      url: "https://viral.kaleidos.com.br",
    },
    {
      kind: "produto" as const,
      Icon: Radar,
      cliente: "Radar Viral",
      vertical: isEn ? "Own product" : "Produto próprio",
      solucao: isEn
        ? "Daily brief crossing IG, YouTube, news and newsletters"
        : "Brief diário cruzando IG, YouTube, news e newsletters",
      stack: "Next + Neon + Apify + Gemini cron",
      url: "https://radar.kaleidos.com.br",
    },
    {
      kind: "produto" as const,
      Icon: Film,
      cliente: "Reels Viral",
      vertical: isEn ? "Own product" : "Produto próprio",
      solucao: isEn
        ? "Paste an IG link → script adapted scene by scene"
        : "Cole link IG → roteiro adaptado cena por cena",
      stack: "Next + Apify + Gemini Flash",
      url: "https://reels.kaleidos.com.br",
    },
    {
      kind: "produto" as const,
      Icon: Cpu,
      cliente: "Kaleidos Pay",
      vertical: isEn ? "Own product" : "Produto próprio",
      solucao: isEn
        ? "Billing + proposals with automatic WhatsApp + email follow-up"
        : "Cobrança + proposta com régua automática WhatsApp + email",
      stack: "Next + Stripe + WhatsApp Web",
      url: "https://pay.kaleidos.com.br",
    },
    {
      kind: "cliente" as const,
      Icon: Compass,
      cliente: "Defiverso",
      vertical: isEn ? "Crypto education" : "Educação cripto",
      solucao: isEn
        ? "Resumo Criptoverso newsletter + IG/Twitter automation + community"
        : "Newsletter Resumo Criptoverso + automação IG/Twitter + comunidade",
      stack: "Resend + KAI + Stripe",
    },
    {
      kind: "cliente" as const,
      Icon: ArrowUpRight,
      cliente: "Investidor 4.20",
      vertical: "Bitcoin BR · 300k+",
      solucao: isEn
        ? "Organic funnel YouTube → IG → newsletter, repurposed with AI"
        : "Funil orgânico YouTube → IG → newsletter, repurpose com IA",
      stack: "Sequência Viral + Radar + Newsletter pipeline",
    },
    {
      kind: "cliente" as const,
      Icon: FileText,
      cliente: "DSEC Labs",
      vertical: "Bitcoin security",
      solucao: isEn
        ? "Alfred Reply Guy bot + 3-level technical content (Twitter/LinkedIn/blog)"
        : "Alfred Reply Guy bot + conteúdo técnico em 3 níveis (Twitter/LinkedIn/blog)",
      stack: isEn ? "Autonomous bot + KAI + Webflow" : "Bot autônomo + KAI + Webflow",
    },
    {
      kind: "cliente" as const,
      Icon: Sparkles,
      cliente: "Layla Foz",
      vertical: isEn ? "Wellness · 184k IG" : "Bem-estar · 184k IG",
      solucao: isEn
        ? "Brisa da Semana newsletter + YouTube → IG/TikTok repurposing"
        : "Newsletter Brisa da Semana + repurpose YouTube → IG/TikTok",
      stack: "Resend + Apify + Sequência Viral",
    },
    {
      kind: "cliente" as const,
      Icon: Cpu,
      cliente: "Renan",
      vertical: isEn ? "Financial consultant" : "Consultor financeiro",
      solucao: isEn
        ? "Funnel diagnosis + AI in lead capture + client dashboard"
        : "Diagnóstico do funil + IA na captação + dashboard cliente",
      stack: "Custom (TS + Supabase + Stripe)",
    },
    {
      kind: "cliente" as const,
      Icon: Mail,
      cliente: "Hugo Doria",
      vertical: isEn ? "Practical AI · vibe coding" : "IA prática · vibe coding",
      solucao: isEn
        ? "YouTube + IG reels content pipeline with a consistent voice"
        : "Pipeline conteúdo YouTube + IG reels com voz consistente",
      stack: "Reels Viral + n8n",
    },
  ];

  return (
    <section
      aria-label={isEn ? "Operation running" : "Operação rodando"}
      className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {isEn ? "Operation running today" : "Operação rodando hoje"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn
            ? "10 projects with AI inside the workflow."
            : "10 projetos com IA dentro do fluxo."}
        </h2>
        <p className="mt-4 text-base text-gray-400 sm:text-lg">
          {isEn
            ? "Active clients and our own products. Visible stack, no black box."
            : "Clientes ativos e produtos próprios. Stack visível, sem caixa-preta."}
        </p>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={
          isEn
            ? "Case carousel, swipe sideways to see all 10"
            : "Carrossel de cases — arraste pro lado pra ver os 10"
        }
      >
        {cases.map((c, i) => {
          const isProduct = c.kind === "produto";
          const accent = isProduct ? "#7CF067" : "#FFB347";
          const cardClass =
            "group relative flex shrink-0 snap-start basis-[280px] flex-col rounded-2xl border bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.06] sm:basis-[320px]";
          const inner = (
            <>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${accent}33`,
                    background: `${accent}1A`,
                  }}
                >
                  <c.Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <span
                  className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  {isProduct
                    ? isEn
                      ? "Own product"
                      : "Produto próprio"
                    : isEn
                      ? "Client"
                      : "Cliente"}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {c.cliente}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                {c.vertical}
              </p>
              <p className="mt-4 flex-1 text-sm text-gray-300">{c.solucao}</p>
              <div className="mt-5 border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Stack ·{" "}
                </span>
                <span className="font-mono text-[10px] text-gray-400">
                  {c.stack}
                </span>
              </div>
              {c.url && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#7CF067] opacity-0 transition-opacity group-hover:opacity-100">
                  {isEn ? "Open" : "Abrir"} <ArrowUpRight className="h-3 w-3" />
                </span>
              )}
            </>
          );
          return c.url ? (
            <motion.a
              key={c.cliente}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              viewport={{ once: true }}
              className={cardClass}
              style={{ borderColor: `${accent}26` }}
            >
              {inner}
            </motion.a>
          ) : (
            <motion.div
              key={c.cliente}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              viewport={{ once: true }}
              className={cardClass}
              style={{ borderColor: `${accent}26` }}
            >
              {inner}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
        {isEn ? "← swipe sideways to see them all →" : "← arrasta pro lado pra ver todos →"}
      </p>
    </section>
  );
}

/* =================================================================== */
/* MODALIDADES — Como trabalhamos (sem preço, com 3 modos)             */
/* =================================================================== */

function ModalitiesSection({ isEn, onCta }: { isEn: boolean; onCta: (tier: string) => void }) {
  const tiers = isEn
    ? [
        {
          Icon: Calendar,
          name: "Free diagnosis",
          duration: "30-45 min · no cost",
          description: "Map of the 3 biggest bottlenecks + action plan. No commitment.",
          bullets: [
            "Live 30-45 min call",
            "Map of the 3 biggest bottlenecks",
            "Actionable plan",
            "No cost, no commitment",
          ],
          ctaLabel: "Book my free call",
          tier: "diagnostico",
          highlight: false,
        },
        {
          Icon: Repeat,
          name: "Continuous implementation",
          duration: "Month to month · min. 3 months",
          description: "The Kaleidos team runs alongside yours in biweekly sprints.",
          bullets: [
            "2-3 AI implementations per sprint",
            "Dedicated multidisciplinary team (strategy + dev + copy)",
            "Code in the client's repository, no lock-in",
            "Monthly meeting with the hours-recovered metric",
          ],
          ctaLabel: "I want continuous implementation",
          tier: "mensal",
          highlight: true,
        },
        {
          Icon: Wrench,
          name: "Custom system",
          duration: "Fixed scope",
          description:
            "A tailored AI pipeline for a specific problem. Your own product inside the operation.",
          bullets: [
            "Discovery + architecture + build under scope",
            "TS + Python + Supabase + Gemini/Claude stack",
            "Delivered as a system, not a report",
            "Documentation + technical handoff to the internal team",
          ],
          ctaLabel: "I want my own system",
          tier: "custom",
          highlight: false,
        },
      ]
    : [
        {
          Icon: Calendar,
          name: "Diagnóstico gratuito",
          duration: "30-45 min · sem custo",
          description:
            "Mapa dos 3 maiores gargalos + plano de ação. Sem compromisso.",
          bullets: [
            "Call de 30-45 min ao vivo",
            "Mapa dos 3 maiores gargalos",
            "Plano de ação executável",
            "Sem custo, sem compromisso",
          ],
          ctaLabel: "Agendar minha call gratuita",
          tier: "diagnostico",
          highlight: false,
        },
        {
          Icon: Repeat,
          name: "Implementação contínua",
          duration: "Mês a mês · mín. 3 meses",
          description:
            "Equipe Kaleidos roda junto com o time em sprints quinzenais.",
          bullets: [
            "2-3 implementações de IA por sprint",
            "Equipe multidisciplinar dedicada (estratégia + dev + copy)",
            "Código no repositório do cliente, sem lock-in",
            "Reunião mensal com métrica de hora liberada",
          ],
          ctaLabel: "Quero implementação contínua",
          tier: "mensal",
          highlight: true,
        },
        {
          Icon: Wrench,
          name: "Sistema customizado",
          duration: "Escopo fechado",
          description:
            "Pipeline de IA sob medida pra um problema específico. Produto próprio dentro da operação.",
          bullets: [
            "Discovery + arquitetura + build sob escopo",
            "Stack TS + Python + Supabase + Gemini/Claude",
            "Entrega como sistema, não como relatório",
            "Documentação + handoff técnico pro time interno",
          ],
          ctaLabel: "Quero um sistema próprio",
          tier: "custom",
          highlight: false,
        },
      ];

  return (
    <section
      aria-label={isEn ? "How we work" : "Como trabalhamos"}
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {isEn ? "Ways of working" : "Modalidades"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn ? "How we work." : "Como trabalhamos."}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
              t.highlight
                ? "border-[#7CF067]/30 bg-[#7CF067]/[0.04] shadow-[0_0_60px_-30px_rgba(124,240,103,0.4)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            {t.highlight && (
              <span className="absolute right-5 top-5 rounded-full border border-[#7CF067]/30 bg-[#7CF067]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7CF067]">
                {isEn ? "Most requested" : "Mais buscado"}
              </span>
            )}

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#7CF067]/20 bg-[#7CF067]/10">
              <t.Icon className="h-5 w-5 text-[#7CF067]" />
            </div>

            <h3 className="font-display text-2xl font-semibold text-white">
              {t.name}
            </h3>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 self-start">
              <Clock className="h-3 w-3" /> {t.duration}
            </div>
            <p className="mt-3 text-sm text-gray-400 sm:text-[15px]">
              {t.description}
            </p>

            <ul className="mt-5 flex-1 space-y-2 border-t border-white/5 pt-5">
              {t.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7CF067]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onCta(t.tier)}
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                t.highlight
                  ? "bg-[#7CF067] text-black hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,240,103,0.7)]"
                  : "border border-white/15 bg-white/[0.03] text-white hover:border-[#7CF067]/30 hover:bg-white/[0.06]"
              }`}
            >
              {t.ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* CTA único */}
      <div className="mt-10 text-center">
        <p className="text-base text-gray-400">
          {isEn ? "Tell us the bottleneck." : "Conta o gargalo."}{" "}
          <span className="text-white">
            {isEn
              ? "Book a free 30 min call with me."
              : "Agenda uma call gratuita de 30 min comigo."}
          </span>
        </p>
      </div>
    </section>
  );
}

/* =================================================================== */
/* FLIP CAROUSEL — antes (problema) ↔ depois (IA aplicada)             */
/* Reaproveita CardFlip + Carousel do desenho original.                */
/* =================================================================== */

function FlipCarouselSection({
  locale,
  onCard,
}: {
  locale: string;
  onCard: (title: string) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const autoplay = setInterval(() => {
      if (!isPaused) api.scrollNext();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [api, isPaused]);

  // 6 cards selecionados — dor universal + número concreto + alto contraste antes/depois.
  const cards = [
    {
      front: {
        title: locale === "en" ? "Manual N1 support" : "Atendimento N1",
        description: locale === "en"
          ? "Team answering the same 30 questions. Avg reply: 4h."
          : "Time respondendo as mesmas 30 perguntas. Resposta: 4h.",
        bgGradient: "from-red-500 to-pink-600",
        borderColor: "border-red-400",
      },
      back: {
        title: "4h → 8s",
        description: locale === "en"
          ? "Trained agent on the product knowledge base solves N1 in seconds."
          : "Agente treinado na base do produto resolve N1 em segundos.",
        features: locale === "en"
          ? ["Inside the existing chat", "Logged tickets", "Human only on edge cases"]
          : ["Dentro do chat existente", "Tickets logados", "Humano só em exceção"],
        bgGradient: "from-green-500 to-emerald-600",
        borderColor: "border-green-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual content" : "Conteúdo Manual",
        description: locale === "en"
          ? "Carousel from scratch, reels edited frame by frame."
          : "Carrossel do zero, reels editado frame a frame.",
        bgGradient: "from-blue-500 to-indigo-600",
        borderColor: "border-blue-400",
      },
      back: {
        title: "1h → 30s",
        description: locale === "en"
          ? "Brief in 3 lines becomes a carousel ready to post."
          : "Brief de 3 linhas vira carrossel pronto pra postar.",
        features: locale === "en"
          ? ["Brand voice", "Design system", "Cover ready"]
          : ["Voz da marca", "Design system", "Capa pronta"],
        bgGradient: "from-purple-500 to-violet-600",
        borderColor: "border-purple-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual research" : "Pesquisa Manual",
        description: locale === "en"
          ? "3 days reading newsletter and X to brief one client."
          : "3 dias lendo newsletter e X pra um briefing.",
        bgGradient: "from-yellow-500 to-orange-600",
        borderColor: "border-yellow-400",
      },
      back: {
        title: locale === "en" ? "3 days → 30 min" : "3 dias → 30 min",
        description: locale === "en"
          ? "Agents scan source, cross data and deliver an actionable brief."
          : "Agentes varrem fonte, cruzam dado e devolvem briefing acionável.",
        features: locale === "en"
          ? ["Newsletter, X, Gmail", "Cross-source", "Editable output"]
          : ["Newsletter, X, Gmail", "Cruzamento de fonte", "Output editável"],
        bgGradient: "from-teal-500 to-cyan-600",
        borderColor: "border-teal-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual collection" : "Cobrança Manual",
        description: locale === "en"
          ? "Spreadsheet, missed follow-up, late invoice."
          : "Planilha aberta, follow-up esquecido, fatura atrasada.",
        bgGradient: "from-amber-500 to-yellow-600",
        borderColor: "border-amber-400",
      },
      back: {
        title: locale === "en" ? "Auto invoice" : "Régua Automática",
        description: locale === "en"
          ? "Stripe + WhatsApp on the brand voice. Escalates only edge cases."
          : "Stripe + WhatsApp na voz da marca. Escala só exceção.",
        features: locale === "en"
          ? ["WhatsApp + email", "On-brand voice", "Smart retry"]
          : ["WhatsApp + email", "Voz da marca", "Retry inteligente"],
        bgGradient: "from-lime-500 to-green-600",
        borderColor: "border-lime-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Lost lead" : "Lead Perdido",
        description: locale === "en"
          ? "Filled the form, nobody answered in 2 days. Lead cold."
          : "Preencheu form, ninguém respondeu em 2 dias. Esfriou.",
        bgGradient: "from-red-600 to-orange-700",
        borderColor: "border-red-400",
      },
      back: {
        title: locale === "en" ? "Reply in 60s" : "Resposta em 60s",
        description: locale === "en"
          ? "Smart auto-reply qualifies, schedules, hands warm to seller."
          : "Auto-reply qualifica, agenda e entrega quente pro vendedor.",
        features: locale === "en"
          ? ["Lead scoring", "Auto-schedule", "Slack/email handoff"]
          : ["Lead scoring", "Agendamento auto", "Handoff Slack/email"],
        bgGradient: "from-green-500 to-lime-600",
        borderColor: "border-green-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Brief → delivery: 5 days" : "Brief → entrega: 5 dias",
        description: locale === "en"
          ? "Brief, 3 reviewers, context lost, back to edit."
          : "Brief passa por 3 pessoas, perde contexto, volta pra ajuste.",
        bgGradient: "from-blue-600 to-sky-700",
        borderColor: "border-blue-400",
      },
      back: {
        title: locale === "en" ? "5 days → 24h" : "5 dias → 24h",
        description: locale === "en"
          ? "Structured brief triggers AI flow + human review. v1 in 24h."
          : "Brief estruturado dispara fluxo IA + revisão humana. v1 em 24h.",
        features: locale === "en"
          ? ["Editorial pipeline", "Human review on top", "v1 fixed time"]
          : ["Pipeline editorial", "Revisão humana no topo", "v1 em prazo fixo"],
        bgGradient: "from-emerald-500 to-teal-600",
        borderColor: "border-emerald-400",
      },
    },
  ];

  return (
    <section
      id="carrossel-gargalos"
      aria-label="Carrossel problema-solução"
      className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {locale === "en" ? "Before and after" : "O antes e depois"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {locale === "en"
            ? "Where AI enters the operation."
            : "Onde a IA entra na operação."}
        </h2>
        <p className="mt-4 text-base text-gray-400 sm:text-lg">
          {locale === "en"
            ? "6 recurring fronts. Hover to flip each card."
            : "6 frentes recorrentes. Hover pra virar cada card."}
        </p>
        <p className="mt-3 text-sm font-medium text-[#7CF067]">
          {locale === "en"
            ? "Any repetitive task fits the flow. We audit, map and implement."
            : "Qualquer tarefa repetitiva entra no fluxo. A gente audita, mapeia e implementa."}
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        setApi={setApi}
        className="w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <CardFlip
                    onDark
                    title={card.front.title}
                    backTitle={card.back.title}
                    subtitle={card.front.description}
                    description={card.back.description}
                    features={card.back.features}
                    onStartNow={() => onCard(card.front.title)}
                    frontBgGradient={card.front.bgGradient}
                    frontBorderColor={card.front.borderColor}
                    backBgGradient={card.back.bgGradient}
                    backBorderColor={card.back.borderColor}
                  />
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 h-11 w-11 bg-white text-black hover:bg-gray-200 sm:-left-12 sm:h-10 sm:w-10" />
        <CarouselNext className="right-1 h-11 w-11 bg-white text-black hover:bg-gray-200 sm:-right-12 sm:h-10 sm:w-10" />
      </Carousel>
    </section>
  );
}

/* =================================================================== */
/* FAQ                                                                 */
/* =================================================================== */

function FAQSection({ isEn }: { isEn: boolean }) {
  // Top 4 — perguntas que de fato bloqueiam fechamento. Outras (nicho,
  // fidelidade, stack técnico, porte da empresa) ficam pra call de 30min
  // gratuita ou DM, evitando bloated FAQ que ninguém lê.
  const items = isEn
    ? [
        {
          q: "How soon do I see results?",
          a: "30 days: first bottleneck running in production. Month 2: recovered hours start climbing. Month 3: a real 70% in most cases.",
        },
        {
          q: "What is the investment?",
          a: "Free diagnosis (48h). Custom projects start at R$ 8.000. Monthly plan from R$ 4.500/month, minimum 3 months. Typical ROI pays for itself in 30-60 days.",
        },
        {
          q: "Who keeps the code?",
          a: "Always the client. No lock-in. Delivered in the repository, with documentation.",
        },
        {
          q: "What support comes after delivery?",
          a: "Monthly plan: support until the end of the contract. Custom: optional maintenance SLA or technical handoff to the internal team.",
        },
        {
          q: "How do you measure ROI?",
          a: "Hours recovered/month × hourly cost × months. 80h recovered from a R$ 200/h team = R$ 16k/month back. It shows up in the monthly meeting.",
        },
      ]
    : [
        {
          q: "Em quanto tempo eu vejo resultado?",
          a: "30 dias: primeiro gargalo rodando em produção. Mês 2: hora liberada começa a subir. Mês 3: 70% reais na maioria dos casos.",
        },
        {
          q: "Qual é o investimento?",
          a: "Diagnóstico grátis (48h). Projeto custom começa em R$ 8.000. Plano mensal a partir de R$ 4.500/mês, mínimo 3 meses. ROI típico paga sozinho em 30-60 dias.",
        },
        {
          q: "O código fica com quem?",
          a: "Sempre com o cliente. Sem lock-in. Entregue no repositório, com documentação.",
        },
        {
          q: "Que suporte tem depois da entrega?",
          a: "Mensal: suporte até o fim do contrato. Custom: SLA de manutenção opcional ou handoff técnico pro time interno.",
        },
        {
          q: "Como mede ROI?",
          a: "Hora liberada/mês × custo da hora × meses. 80h liberadas de um time de R$ 200/h = R$ 16k/mês recuperados. Aparece na reunião mensal.",
        },
      ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="FAQ" className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CF067]">
          {isEn ? "Frequently asked questions" : "Perguntas frequentes"}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {isEn
            ? "What decision makers ask before closing."
            : "O que decisor pergunta antes de fechar."}
        </h2>
      </div>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {items.map((it, i) => {
          const open = openIndex === i;
          return (
            <button
              key={it.q}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full flex-col px-5 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-6 sm:py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-base font-medium text-white sm:text-lg">
                  {it.q}
                </span>
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  {open ? (
                    <Minus className="h-3 w-3 text-[#7CF067]" />
                  ) : (
                    <Plus className="h-3 w-3 text-gray-400" />
                  )}
                </span>
              </div>
              {open && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 text-sm text-gray-400 sm:text-[15px]"
                >
                  {it.a}
                </motion.p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* =================================================================== */
/* CTA FINAL + FORM                                                    */
/* =================================================================== */

// Type pra fbq global do Meta Pixel (sem dependência de @types/facebook-pixel)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function FinalCtaSection({ isEn }: { isEn: boolean }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    gargalo: "",
  });
  const [hp, setHp] = useState(""); // honeypot — humanos não preenchem
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone) return;
    setStatus("sending");
    try {
      // Ids de tracking: o MESMO event_id vai no body (server usa na Meta CAPI)
      // e no fbq eventID abaixo — pixel + CAPI deduplicam e o Lead conta 1x.
      const tracking = getTrackingIds();
      const r = await fetch("/api/lead-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.telefone,
          gargalo: form.gargalo,
          _hp: hp,
          // source lógico do form + atribuição completa (canal/UTM/first-last)
          metadata: getLeadMetadata("lead-ia", "servicos-ia-automacoes-completa"),
          ...tracking,
        }),
      });
      const data = await r.json();
      if (data.ok) {
        setStatus("ok");
        // Meta Pixel — dispara Lead event quando form converte (P0 audit)
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq(
            "track",
            "Lead",
            {
              content_name: "Kaleidos AI · Diagnóstico gratuito",
              content_category: "ia-automacoes-completa",
            },
            { eventID: tracking.event_id }
          );
        }
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  return (
    <section
      id="agendar"
      aria-label="CTA final"
      className="mx-auto mt-24 max-w-3xl px-4 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#7CF067]/20 bg-gradient-to-br from-[#7CF067]/[0.08] via-white/[0.02] to-white/[0.02] p-8 sm:p-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#7CF067]/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            {isEn ? "Free diagnosis in 48h." : "Diagnóstico gratuito em 48h."}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#7CF067]">
            {isEn ? "No lock-in · No contract · LGPD" : "Sem fidelidade · Sem contrato · LGPD"}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-gray-400 sm:text-lg">
            {isEn
              ? "Describe the bottleneck. We come back in 48h: what to automate first, what ROI, how long."
              : "Descreve o gargalo. Volta em 48h: o que automatizar primeiro, qual ROI, quanto tempo."}
          </p>

          {status === "ok" ? (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#7CF067]/30 bg-[#7CF067]/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7CF067]/20">
                <CheckCircle2 className="h-6 w-6 text-[#7CF067]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {isEn ? "Received." : "Recebido."}
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                {isEn ? "Diagnosis in 48h at" : "Diagnóstico em 48h em"}{" "}
                <span className="text-[#7CF067]">{form.email}</span>.{" "}
                {isEn
                  ? "A specialist (not a bot) prepares your plan."
                  : "Especialista (não bot) prepara teu plano."}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  isEn
                    ? "Hi! I just sent the Kaleidos AI form."
                    : "Oi! Acabei de mandar o form do Kaleidos AI."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7CF067] px-5 py-2.5 text-sm font-semibold text-black hover:-translate-y-0.5 transition-transform"
              >
                {isEn ? "Talk on WhatsApp now" : "Falar no WhatsApp agora"}{" "}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {/* Honeypot anti-bot — invisível pra humanos */}
              <div
                aria-hidden="true"
                className="sm:col-span-2"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="_hp_ia">Não preencha</label>
                <input
                  id="_hp_ia"
                  name="_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>
              <Field
                label={isEn ? "Name" : "Nome"}
                value={form.nome}
                onChange={(v) => setForm((f) => ({ ...f, nome: v }))}
                required
                placeholder={isEn ? "Your name" : "Seu nome"}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
                placeholder={isEn ? "you@company.com" : "voce@empresa.com"}
              />
              <Field
                label={isEn ? "Phone / WhatsApp" : "Telefone / WhatsApp"}
                type="tel"
                value={form.telefone}
                onChange={(v) => setForm((f) => ({ ...f, telefone: v }))}
                required
                placeholder={isEn ? "+55 (11) 99999-9999" : "(11) 99999-9999"}
                className="sm:col-span-2"
              />
              <TextareaField
                label={isEn ? "What is your main bottleneck?" : "Qual o teu gargalo principal?"}
                value={form.gargalo}
                onChange={(v) => setForm((f) => ({ ...f, gargalo: v }))}
                placeholder={
                  isEn
                    ? "E.g.: I spend 3 days a week making carousels by hand. Or: my team answers the same 30 questions on WhatsApp every day. Or: billing becomes a monthly spreadsheet."
                    : "Ex: gasto 3 dias por semana fazendo carrossel manual. Ou: meu time atende as mesmas 30 perguntas no WhatsApp todo dia. Ou: cobrança vira planilha do mês."
                }
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2 flex flex-col items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#7CF067] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,240,103,0.7)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                  {status === "sending"
                    ? isEn
                      ? "Sending…"
                      : "Enviando…"
                    : isEn
                      ? "Get my diagnosis in 48h"
                      : "Receber diagnóstico em 48h"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <p className="text-[11px] text-gray-500 text-center">
                  {isEn
                    ? "No lock-in · No contract · Reply in 48h · Data protected under LGPD"
                    : "Sem fidelidade · Sem contrato · Resposta em 48h · Dados protegidos pela LGPD"}
                </p>
                {status === "err" && (
                  <p className="text-xs text-red-400">
                    {isEn
                      ? "Something went wrong. Try again or send a WhatsApp message."
                      : "Algo deu errado. Tenta de novo ou manda WhatsApp."}
                  </p>
                )}
                <p className="text-[11px] text-gray-500">
                  {isEn ? "or" : "ou"}{" "}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      isEn
                        ? "Hi! I want to know more about Kaleidos AI."
                        : "Oi! Quero saber mais sobre o Kaleidos AI."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7CF067] hover:underline"
                  >
                    {isEn ? "talk directly on WhatsApp" : "fala direto no WhatsApp"}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
        <Link href="/" className="transition-colors hover:text-[#7CF067]">
          kaleidos.com.br
        </Link>
        <span className="text-gray-700" aria-hidden="true">
          •
        </span>
        <Link
          href="/cases"
          className="transition-colors hover:text-[#7CF067]"
        >
          Cases
        </Link>
        <span className="text-gray-700" aria-hidden="true">
          •
        </span>
        <Link
          href="/sobre"
          className="transition-colors hover:text-[#7CF067]"
        >
          {isEn ? "About Kaleidos" : "Sobre a Kaleidos"}
        </Link>
      </div>
    </section>
  );
}

/* ----------------- form fields ----------------- */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {label} {required && <span className="text-[#7CF067]">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#7CF067]/40 focus:outline-none focus:ring-2 focus:ring-[#7CF067]/20"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <textarea
        value={value}
        rows={4}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#7CF067]/40 focus:outline-none focus:ring-2 focus:ring-[#7CF067]/20"
      />
    </label>
  );
}
