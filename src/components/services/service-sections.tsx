"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, type LucideIcon } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { CALENDLY_URL } from "@/lib/constants";
import type { ServiceContent } from "@/lib/service-pages-data";

/* ------------------------------------------------------------------ */
/* Kaleidos brand tokens                                               */
/* Cru #FAFAFA · ink #14110D · verde #7CF067 · rosa #D262B2            */
/* Atelier (font-display) + Gridlite (font-accent) · brutalismo edit.  */
/* ------------------------------------------------------------------ */

const INK = "#14110D";

export type Accent = {
  hex: string;
  /** tom escuro do accent, legível como texto sobre fundo claro */
  deep: string;
  /**
   * cor de texto sobre fundo do accent.
   * REGRA: fundo rosa (#D262B2) sempre com texto BRANCO (nunca preto);
   * o verde (#7CF067) é claro o bastante pra segurar texto ink.
   */
  fg: string;
  text: string;
  bg: string;
  soft: string;
  ring: string;
};

export function getAccent(kind: "green" | "pink"): Accent {
  return kind === "pink"
    ? {
        hex: "#D262B2",
        deep: "#A8458C",
        fg: "#FFFFFF",
        text: "text-[#A8458C]",
        bg: "bg-[#D262B2]",
        soft: "bg-[#D262B2]/12",
        ring: "border-[#D262B2]/40",
      }
    : {
        hex: "#7CF067",
        deep: "#2F7D27",
        fg: "#14110D",
        text: "text-[#2F7D27]",
        bg: "bg-[#7CF067]",
        soft: "bg-[#7CF067]/15",
        ring: "border-[#3d9e32]/40",
      };
}

export type LightTone = "paper" | "mist" | "white";

type ToneTokens = {
  section: string;
  bgHex: string;
  heading: string;
  body: string;
  muted: string;
  eyebrow: string;
  chip: string;
};

/** Três tons de fundo cru pra alternar o ritmo sem sair da paleta Kaleidos. */
export function lightTone(t: LightTone): ToneTokens {
  switch (t) {
    case "paper":
      return {
        section: "bg-white",
        bgHex: "#FFFFFF",
        heading: "text-[#14110D]",
        body: "text-[#5c544a]",
        muted: "text-[#9a9081]",
        eyebrow: "text-[#A8458C]",
        chip: "bg-[#F0F0F0]",
      };
    case "mist":
      return {
        section: "bg-[#EEF1EA]",
        bgHex: "#EEF1EA",
        heading: "text-[#14110D]",
        body: "text-[#55594f]",
        muted: "text-[#9a9d92]",
        eyebrow: "text-[#A8458C]",
        chip: "bg-[#e3e7dd]",
      };
    default:
      return {
        section: "bg-[#FAFAFA]",
        bgHex: "#FAFAFA",
        heading: "text-[#14110D]",
        body: "text-[#5c544a]",
        muted: "text-[#9a9081]",
        eyebrow: "text-[#A8458C]",
        chip: "bg-[#F0F0F0]",
      };
  }
}

/** Cartão brutalista padrão: borda ink 1.5px + sombra sólida. */
const BRUT = "border-[1.5px] border-[#14110D] bg-white";
const SHADOW_INK = "shadow-[5px_5px_0_#14110D]";

export const pad = (n: number) => String(n).padStart(2, "0");

export function Reveal({
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStat({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return <>{value}</>;
  const [, prefix, numRaw, suffix] = m;
  const num = parseFloat(numRaw.replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(num)) return <>{value}</>;
  const decimals = numRaw.includes(",") ? 1 : 0;
  return (
    <NumberTicker value={num} prefix={prefix} suffix={suffix} decimals={decimals} />
  );
}

/** Eyebrow Gridlite (label de seção). */
function Eyebrow({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`font-accent text-[12px] uppercase tracking-[0.22em] ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

/** Grade pontilhada de fundo (sobre cru ou ink). */
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

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

export function HeroSection({
  c,
  accent,
  Icon,
  isEn,
  withLang,
  openWhatsApp,
  onCalendly,
}: {
  c: ServiceContent;
  accent: Accent;
  Icon: LucideIcon;
  isEn: boolean;
  withLang: (p: string) => string;
  openWhatsApp: (where: string) => void;
  onCalendly: (where: string) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
      <DotGrid />
      {/* deco brutalista — estrelas que giram */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute right-[8%] top-[16%] hidden w-16 [animation:spin_14s_linear_infinite] md:block"
        aria-hidden
      >
        <polygon
          points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39"
          fill={accent.hex}
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute left-[6%] bottom-[14%] hidden w-10 [animation:spin_9s_linear_infinite_reverse] md:block"
        aria-hidden
      >
        <polygon
          points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39"
          fill="#D262B2"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <span
            className={`mb-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-[#14110D] shadow-[3px_3px_0_${accent.hex}] sm:text-sm`}
            style={{ boxShadow: `3px 3px 0 ${accent.hex}` }}
          >
            <Icon className="h-4 w-4" style={{ color: accent.deep }} />
            {c.badge}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-[#14110D] sm:text-5xl md:text-6xl">
            {c.h1}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5c544a] sm:text-lg">
            {c.subhead}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCalendly("hero")}
              className="inline-flex items-center gap-2 rounded-full bg-[#14110D] px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: `5px 5px 0 ${accent.hex}` }}
            >
              {isEn
                ? "Book a free diagnosis (30min)"
                : "Agendar diagnóstico gratuito (30min)"}
              <ArrowRight className="h-5 w-5" />
            </a>
            <button
              onClick={() => openWhatsApp("hero")}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
            >
              {isEn ? "Prefer WhatsApp?" : "Prefere WhatsApp?"}
            </button>
          </div>
          <div className="mt-5">
            <Link
              href={withLang("/cases")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: accent.deep }}
            >
              {isEn ? "See cases" : "Ver cases"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* STATEMENT — banda ink, número gigante                               */
/* ------------------------------------------------------------------ */

export function StatementBand({
  c,
  accent,
}: {
  c: ServiceContent;
  accent: Accent;
}) {
  const s = c.statement;
  if (!s) return null;
  return (
    <section className="relative overflow-hidden bg-[#14110D] px-6 py-24 text-[#FAFAFA] sm:py-32">
      <DotGrid dark />
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 85% 20%, ${accent.hex}26, transparent 65%)`,
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="lg:border-r lg:border-white/15 lg:pr-12">
            <Eyebrow style={{ color: accent.hex }} className="mb-5 inline-block">
              {s.kicker}
            </Eyebrow>
            <div
              className="font-display text-[5.5rem] font-bold leading-[0.85] tracking-tight sm:text-[7rem] lg:text-[8.5rem]"
              style={{ color: accent.hex }}
            >
              {s.bigValue}
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#b8b1a6]">
              {s.bigLabel}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.85rem]">
              {s.headline}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8b1a6] sm:text-lg">
              {s.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHO — grade ruled brutalista                                        */
/* ------------------------------------------------------------------ */

export function WhoSection({
  c,
  accent,
  Icon,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  Icon: LucideIcon;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  return (
    <section className={`relative ${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl md:text-[3.25rem]`}
          >
            {c.whoTitle}
          </h2>
        </Reveal>
        <div
          className={`mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-[#14110D] sm:grid-cols-2 lg:grid-cols-3 ${SHADOW_INK}`}
        >
          {c.who.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <div className={`flex h-full flex-col ${t.section} p-7 transition-colors hover:bg-white`}>
                <span
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-[#14110D]"
                  style={{ background: `${accent.hex}` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent.fg }} />
                </span>
                <h3 className={`mb-2 font-display text-xl font-bold leading-snug ${t.heading}`}>
                  {item.title}
                </h3>
                <p className={`flex-1 text-sm leading-relaxed ${t.body}`}>{item.desc}</p>
                <span className={`mt-6 font-accent text-xs tracking-widest ${t.muted}`}>
                  [ {pad(i + 1)} / {pad(c.who.length)} ]
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY MATTERS — sem isso / com a Kaleidos                             */
/* ------------------------------------------------------------------ */

export function WhyMattersSection({
  c,
  accent,
  isEn,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}>
            {c.whyMattersTitle}
          </h2>
          <p className={`mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed ${t.body} sm:text-lg`}>
            {c.whyMattersBody}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className={`h-full rounded-2xl ${BRUT} ${SHADOW_INK} p-8`}>
              <h3 className={`mb-5 font-display text-lg font-bold ${t.muted}`}>
                {isEn ? "Without it" : "Sem isso"}
              </h3>
              <ul className="space-y-3">
                {c.whyMattersBullets.map((b) => (
                  <li key={b} className={`flex items-start gap-3 text-sm leading-relaxed ${t.muted}`}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
                    <span className="line-through decoration-current/40">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="h-full rounded-2xl border-[1.5px] border-[#14110D] p-8"
              style={{
                background: `linear-gradient(180deg, ${accent.hex}22, #fff 70%)`,
                boxShadow: `5px 5px 0 ${accent.hex}`,
              }}
            >
              <h3 className="mb-5 font-display text-lg font-bold" style={{ color: accent.deep }}>
                {isEn ? "With Kaleidos" : "Com a Kaleidos"}
              </h3>
              <ul className="space-y-3">
                {c.whyMattersBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#14110D]"
                      style={{ background: accent.hex }}
                    >
                      <Check className="h-3 w-3" style={{ color: accent.fg }} />
                    </span>
                    <span className={`text-sm leading-relaxed ${t.heading}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* APPROACH — framework nomeado                                        */
/* ------------------------------------------------------------------ */

export function ApproachSection({
  c,
  accent,
  isEn,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  tone: LightTone;
}) {
  const a = c.approach;
  if (!a) return null;
  const t = lightTone(tone);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow className={`mb-4 inline-block ${t.eyebrow}`}>
              {isEn ? "Our methodology" : "Nossa metodologia"}
            </Eyebrow>
            <h2 className={`font-display text-4xl font-bold leading-[1.02] tracking-tight ${t.heading} sm:text-5xl`}>
              {a.name}
            </h2>
            <p className={`mt-6 max-w-md text-base leading-relaxed ${t.body}`}>{a.intro}</p>
            <div className="mt-8 h-1.5 w-24" style={{ background: accent.hex }} aria-hidden />
          </Reveal>
        </div>
        <div className={`overflow-hidden rounded-2xl ${BRUT} ${SHADOW_INK}`}>
          {a.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className={`flex gap-5 p-7 ${i !== 0 ? "border-t-[1.5px] border-[#14110D]" : ""}`}>
                <span
                  className="font-display text-3xl font-bold leading-none"
                  style={{ color: accent.hex, WebkitTextStroke: `1px ${INK}` }}
                >
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className={`mb-1.5 font-display text-lg font-bold leading-snug ${t.heading}`}>
                    {p.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${t.body}`}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROCESS — timeline                                                  */
/* ------------------------------------------------------------------ */

export function ProcessTimeline({
  c,
  accent,
  isEn,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  const phases = c.processPhases;

  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2 className={`font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}>
              {c.processTitle}
            </h2>
            <p className={`mt-4 max-w-sm text-base leading-relaxed ${t.body}`}>
              {isEn
                ? "A structured, phase-by-phase approach designed to deliver real results."
                : "Uma abordagem estruturada, fase a fase, feita pra entregar resultado de verdade."}
            </p>
            {c.processNote && (
              <p className={`mt-6 max-w-sm rounded-2xl ${BRUT} p-4 text-sm leading-relaxed ${t.body}`}>
                {c.processNote}
              </p>
            )}
          </Reveal>
        </div>

        {phases ? (
          <div className="relative">
            <div
              className="absolute left-[15px] top-2 bottom-2 hidden w-0.5 sm:block"
              style={{ background: `${accent.hex}` }}
              aria-hidden
            />
            <div className="space-y-5">
              {phases.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="relative sm:pl-12">
                    <span
                      className="absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-[#14110D] font-accent text-[11px] font-bold sm:flex"
                      style={{ background: accent.hex, color: accent.fg }}
                    >
                      {pad(i + 1)}
                    </span>
                    <div className={`rounded-2xl ${BRUT} ${SHADOW_INK} p-7`}>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <Eyebrow style={{ color: accent.deep }}>{p.tag}</Eyebrow>
                        <span className={`rounded-full ${t.chip} px-2.5 py-0.5 font-accent text-[10px] uppercase tracking-wider ${t.muted}`}>
                          {p.duration}
                        </span>
                      </div>
                      <h3 className={`mb-2 font-display text-xl font-bold ${t.heading} sm:text-2xl`}>
                        {p.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${t.body}`}>{p.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.deliverables.map((d) => (
                          <span
                            key={d}
                            className={`inline-flex items-center gap-1.5 rounded-lg ${t.chip} px-3 py-1.5 text-xs font-medium ${t.heading}`}
                          >
                            <Check className="h-3 w-3 shrink-0" style={{ color: accent.deep }} />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {c.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className={`rounded-2xl ${BRUT} ${SHADOW_INK} p-7`}>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className={`font-display text-xl font-bold ${t.heading} sm:text-2xl`}>
                      {step.title}
                    </h3>
                    <span className={`font-accent text-xs tracking-widest ${t.muted}`}>
                      [ {pad(i + 1)} / {pad(c.process.length)} ]
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${t.body}`}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DELIVERABLES — "O que entregamos com X" (grid de entregáveis reais)  */
/* ------------------------------------------------------------------ */

export function DeliverablesSection({
  c,
  accent,
  isEn,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  tone: LightTone;
}) {
  const items = c.deliverables;
  if (!items || items.length === 0) return null;
  const t = lightTone(tone);
  const title =
    c.deliverablesTitle ?? (isEn ? "What we deliver" : "O que entregamos");
  return (
    <section className={`relative ${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className={`mb-4 inline-block ${t.eyebrow}`}>
              {isEn ? "Deliverables" : "Entregáveis"}
            </Eyebrow>
            <h2
              className={`font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
            >
              {title}
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${t.body}`}>
              {isEn
                ? "The concrete things we hand over, month after month."
                : "As coisas concretas que entregamos, mês após mês."}
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item} delay={(i % 3) * 0.05}>
              <div
                className={`flex h-full items-start gap-3 rounded-2xl ${BRUT} ${SHADOW_INK} p-5`}
              >
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#14110D]"
                  style={{ background: accent.hex }}
                >
                  <Check className="h-4 w-4" style={{ color: accent.fg }} />
                </span>
                <span className={`text-sm font-medium leading-snug ${t.heading}`}>
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* INCLUDED — incluso vs não incluso                                   */
/* ------------------------------------------------------------------ */

export function IncludedComparison({
  c,
  accent,
  isEn,
  tone,
  openWhatsApp,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  tone: LightTone;
  openWhatsApp: (where: string) => void;
}) {
  const t = lightTone(tone);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}>
              {c.includedTitle}
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${t.body}`}>
              {isEn
                ? "Everything you get, end to end. And, just as importantly, what's out of scope."
                : "Tudo que está incluso, ponta a ponta. E, tão importante quanto, o que fica de fora."}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div
              className="h-full rounded-2xl border-[1.5px] border-[#14110D] bg-white p-8"
              style={{ boxShadow: `5px 5px 0 ${accent.hex}` }}
            >
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-[#14110D]"
                  style={{ background: accent.hex }}
                >
                  <Check className="h-4 w-4" style={{ color: accent.fg }} />
                </span>
                <h3 className={`font-display text-lg font-bold ${t.heading}`}>
                  {isEn ? "Included" : "Está incluso"}
                </h3>
              </div>
              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {c.included.map((item, i) => (
                  <Reveal key={item} delay={(i % 4) * 0.04}>
                    <li className="flex items-center gap-3 border-b border-[#14110D]/15 py-3 last:border-0">
                      <Check className="h-4 w-4 shrink-0" style={{ color: accent.deep }} />
                      <span className={`text-sm font-medium ${t.heading}`}>{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {c.notIncluded && c.notIncluded.length > 0 && (
              <Reveal delay={0.08}>
                <div className={`rounded-2xl ${BRUT} p-8`}>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${t.chip}`}>
                      <Minus className={`h-4 w-4 ${t.muted}`} />
                    </span>
                    <h3 className={`font-display text-lg font-bold ${t.muted}`}>
                      {isEn ? "Not included" : "Não está incluso"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {c.notIncluded.map((item) => (
                      <li key={item} className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}>
                        <Minus className={`mt-0.5 h-4 w-4 shrink-0 ${t.muted}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <div
                className="flex flex-1 flex-col justify-between gap-5 rounded-2xl border-[1.5px] border-[#14110D] p-8 shadow-[5px_5px_0_#14110D]"
                style={{ background: accent.hex }}
              >
                <p className="text-sm font-semibold leading-relaxed" style={{ color: accent.fg }}>
                  {c.includedNote ??
                    (isEn
                      ? "Flexible scope, shaped around your stage."
                      : "Escopo flexível, desenhado pro seu estágio.")}
                </p>
                <button
                  onClick={() => openWhatsApp("included")}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#14110D] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SIGNATURE — banda ink, números grandes                              */
/* ------------------------------------------------------------------ */

export function SignatureBand({
  c,
  accent,
}: {
  c: ServiceContent;
  accent: Accent;
}) {
  const stats = c.signature;
  if (!stats || stats.length === 0) return null;
  return (
    <section className="relative overflow-hidden bg-[#14110D] px-6 py-20 sm:py-24">
      <DotGrid dark />
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 15% 50%, ${accent.hex}26, transparent 60%)`,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        {(c.signatureTitle || c.signatureSubtitle) && (
          <Reveal>
            <div className="mb-12 max-w-2xl">
              {c.signatureTitle && (
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {c.signatureTitle}
                </h2>
              )}
              {c.signatureSubtitle && (
                <p className="mt-3 text-base leading-relaxed text-[#b8b1a6] sm:text-lg">
                  {c.signatureSubtitle}
                </p>
              )}
            </div>
          </Reveal>
        )}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border-[1.5px] border-white/20 bg-white/15 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full bg-[#14110D] p-8">
                <div
                  className="font-display text-4xl font-bold leading-none sm:text-5xl"
                  style={{ color: accent.hex }}
                >
                  <AnimatedStat value={s.value} />
                </div>
                <div className="mt-3 text-sm leading-relaxed text-[#b8b1a6]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CASES                                                               */
/* ------------------------------------------------------------------ */

export function CasesSection({
  c,
  accent,
  isEn,
  withLang,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  withLang: (p: string) => string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#14110D] px-6 py-20 sm:py-28">
      <DotGrid dark />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {c.casesTitle}
          </h2>
        </Reveal>
        <div className="mt-16 space-y-6">
          {c.cases.map((cs, i) => {
            const flip = i % 2 === 1;
            const Visual = (
              <div
                className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border-[1.5px] border-white/15"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accent.hex}40, #0d0b08 70%)`,
                }}
              >
                <span className="px-6 text-center font-display text-4xl font-bold text-white/90 sm:text-5xl">
                  {cs.name}
                </span>
                <span
                  className="absolute bottom-5 left-5 inline-flex items-center rounded-md border-[1.5px] border-[#14110D] px-3 py-1 text-sm font-bold"
                  style={{ background: accent.hex, color: accent.fg }}
                >
                  {cs.metric}
                </span>
              </div>
            );
            const Body = (
              <div className="flex flex-col justify-center">
                <span className="mb-3 font-accent text-xs tracking-widest text-[#8a8074]">
                  [ {pad(i + 1)} / {pad(c.cases.length)} ]
                </span>
                <h3 className="mb-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  {cs.name}
                </h3>
                <p className="text-base leading-relaxed text-[#b8b1a6]">{cs.desc}</p>
                {cs.href && (
                  <Link
                    href={withLang(cs.href)}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
                    style={{ color: accent.hex }}
                  >
                    {isEn ? "See full case" : "Ver case completo"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            );
            return (
              <Reveal key={cs.name} delay={0.05}>
                <div className="grid items-stretch gap-6 rounded-2xl border-[1.5px] border-white/15 bg-white/[0.03] p-6 lg:grid-cols-2 lg:p-8">
                  {flip ? (
                    <>
                      <div className="lg:order-2">{Visual}</div>
                      <div className="lg:order-1">{Body}</div>
                    </>
                  ) : (
                    <>
                      {Visual}
                      {Body}
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl border-[1.5px] border-white/15 bg-white/[0.03] p-8 sm:grid-cols-3">
            {c.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-bold sm:text-5xl" style={{ color: accent.hex }}>
                  <AnimatedStat value={s.value} />
                </div>
                <div className="mt-1.5 text-sm text-[#b8b1a6]">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY US — bento brutalista (cru)                                     */
/* ------------------------------------------------------------------ */

function BentoCard({
  w,
  wide = false,
}: {
  w: { title: string; desc: string };
  wide?: boolean;
}) {
  return (
    <div className={`group flex h-full flex-col rounded-2xl ${BRUT} ${SHADOW_INK} p-8 transition-transform duration-300 hover:-translate-y-0.5`}>
      <h3 className={`mb-3 font-display text-xl font-bold leading-snug text-[#14110D] ${wide ? "sm:text-2xl" : ""}`}>
        {w.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#5c544a]">{w.desc}</p>
    </div>
  );
}

export function WhyUsSection({ c, accent }: { c: ServiceContent; accent: Accent }) {
  return (
    <section className="relative bg-[#FAFAFA] px-6 py-20 sm:py-28">
      <DotGrid />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal>
            <BentoCard w={c.whyUs[0]} />
          </Reveal>
          <Reveal delay={0.06}>
            <BentoCard w={c.whyUs[1]} />
          </Reveal>
          <Reveal delay={0.12}>
            <div
              className="flex h-full min-h-[160px] items-center justify-center rounded-2xl border-[1.5px] border-[#14110D] p-8 text-center"
              style={{ background: accent.hex, boxShadow: `5px 5px 0 ${INK}` }}
            >
              <h2
                className="font-display text-2xl font-bold leading-tight sm:text-3xl"
                style={{ color: accent.fg }}
              >
                {c.whyUsTitle}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <BentoCard w={c.whyUs[2]} />
          </Reveal>
          {c.whyUs[3] && (
            <Reveal delay={0.2} className="md:col-span-2">
              <BentoCard w={c.whyUs[3]} wide />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SOCIAL PROOF                                                        */
/* ------------------------------------------------------------------ */

export function ProofSection({
  c,
  accent,
  isEn,
  withLang,
  tone,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  withLang: (p: string) => string;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  // `proof` por página: undefined = padrão (3 primeiros) · [] = página sem prova social
  const proof = c.proof
    ? TESTIMONIALS.filter((td) => c.proof!.includes(td.id))
    : TESTIMONIALS.slice(0, 3);
  if (proof.length === 0) return null;
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}>
            {isEn ? "Social Proof" : "Prova Social"}
          </h2>
          <p className={`mt-4 text-center text-base ${t.body}`}>
            {isEn
              ? "What crypto founders say about working with Kaleidos:"
              : "O que founders cripto falam sobre trabalhar com a Kaleidos:"}
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {proof.map((tdata, i) => (
            <Reveal key={tdata.id} delay={i * 0.08}>
              <div className={`flex h-full flex-col rounded-2xl ${BRUT} ${SHADOW_INK} p-7`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className={`font-display text-base font-bold ${t.heading}`}>{tdata.name}</p>
                    <p className={`text-xs ${t.muted}`}>
                      {tdata.role} · {tdata.company}
                    </p>
                  </div>
                  <span className="text-sm" style={{ color: accent.deep }}>
                    ★★★★★
                  </span>
                </div>
                <p className={`flex-1 text-sm leading-relaxed ${t.body}`}>
                  “{isEn ? tdata.quote_en : tdata.quote}”
                </p>
                {tdata.caseLink && (
                  <Link
                    href={withLang(tdata.caseLink)}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: accent.deep }}
                  >
                    {isEn ? "See case" : "Ver case"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FaqSection({ c, tone }: { c: ServiceContent; tone: LightTone }) {
  const t = lightTone(tone);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}>
            {c.faqTitle}
          </h2>
        </Reveal>
        <div className={`mt-14 grid gap-px overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-[#14110D] sm:grid-cols-2 ${SHADOW_INK}`}>
          {c.faq.map((f, i) => (
            <Reveal key={f.question} delay={(i % 2) * 0.05}>
              <details
                className={`group h-full ${t.section} p-7 transition-colors open:bg-white [&_summary::-webkit-details-marker]:hidden`}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4">
                  <span className={`font-display text-base font-bold leading-snug ${t.heading}`}>
                    {f.question}
                  </span>
                  <span className={`mt-0.5 font-accent text-[10px] tracking-widest ${t.muted}`}>
                    [ {pad(i + 1)} ]
                  </span>
                </summary>
                <p className={`mt-4 text-sm leading-relaxed ${t.body}`}>{f.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FINAL CTA — banda accent brutalista                                 */
/* ------------------------------------------------------------------ */

export function FinalCta({
  c,
  accent,
  isEn,
  withLang,
  openWhatsApp,
  onCalendly,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  withLang: (p: string) => string;
  openWhatsApp: (where: string) => void;
  onCalendly: (where: string) => void;
}) {
  return (
    <section className="bg-[#FAFAFA] px-4 py-16 sm:px-6">
      <Reveal>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-[1.5px] border-[#14110D] bg-[#14110D] px-8 py-20 text-center sm:py-24"
          style={{ boxShadow: `8px 8px 0 ${accent.hex}` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse 60% 55% at 50% 0%, ${accent.hex}2e, transparent 70%)`,
            }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-[8%] top-[22%] hidden rotate-[-6deg] rounded-md border-[1.5px] border-[#14110D] px-3 py-1 text-xs font-semibold sm:block"
            style={{ background: accent.hex, color: accent.fg }}
          >
            {isEn ? "Flexible scope" : "Escopo flexível"}
          </span>
          <span className="pointer-events-none absolute right-[10%] top-[28%] hidden rotate-[5deg] rounded-md border-[1.5px] border-[#14110D] bg-white px-3 py-1 text-xs font-semibold text-[#14110D] sm:block">
            {isEn ? "Crypto-native" : "Cripto-nativo"}
          </span>
          <span className="pointer-events-none absolute bottom-[24%] left-[12%] hidden rotate-[4deg] rounded-md border-[1.5px] border-[#14110D] bg-white px-3 py-1 text-xs font-semibold text-[#14110D] sm:block">
            {isEn ? "Ask us anything" : "Pergunte o que quiser"}
          </span>
          <span
            className="pointer-events-none absolute bottom-[26%] right-[9%] hidden rotate-[-5deg] rounded-md border-[1.5px] border-[#14110D] px-3 py-1 text-xs font-semibold sm:block"
            style={{ background: accent.hex, color: accent.fg }}
          >
            {isEn ? "Start now" : "Comece agora"}
          </span>

          <h2 className="relative font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            {c.finalCtaTitle}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-[#b8b1a6] sm:text-lg">
            {c.finalCtaSubtitle}
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCalendly("final_cta")}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: accent.hex, color: accent.fg }}
            >
              {isEn
                ? "Book a free diagnosis (30min)"
                : "Agendar diagnóstico gratuito (30min)"}
              <ArrowRight className="h-5 w-5" />
            </a>
            <button
              onClick={() => openWhatsApp("final_cta")}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
            >
              {isEn ? "Prefer WhatsApp?" : "Prefere WhatsApp?"}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
