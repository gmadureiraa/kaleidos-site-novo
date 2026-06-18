"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, type LucideIcon } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import type { ServiceContent, ServiceData } from "@/lib/service-pages-data";

/* ------------------------------------------------------------------ */
/* tokens & helpers                                                    */
/* ------------------------------------------------------------------ */

export type Accent = {
  hex: string;
  text: string;
  bg: string;
  soft: string;
  ring: string;
};

export function getAccent(kind: "green" | "pink"): Accent {
  return kind === "pink"
    ? {
        hex: "#D262B2",
        text: "text-[#D262B2]",
        bg: "bg-[#D262B2]",
        soft: "bg-[#D262B2]/10",
        ring: "border-[#D262B2]/25",
      }
    : {
        hex: "#7CFF6B",
        text: "text-[#7CFF6B]",
        bg: "bg-[#7CFF6B]",
        soft: "bg-[#7CFF6B]/10",
        ring: "border-[#7CFF6B]/25",
      };
}

export type LightTone = "paper" | "mist" | "white";

type ToneTokens = {
  section: string;
  bgHex: string;
  card: string;
  open: string;
  heading: string;
  body: string;
  muted: string;
  border: string;
  divider: string;
  grid: string;
  chip: string;
  eyebrow: string;
};

export function lightTone(t: LightTone): ToneTokens {
  switch (t) {
    case "paper":
      return {
        section: "bg-[#F4F1EC]",
        bgHex: "#F4F1EC",
        card: "bg-white",
        open: "open:bg-[#FBFAF6]",
        heading: "text-[#1b1a17]",
        body: "text-[#6b655a]",
        muted: "text-[#a39c8d]",
        border: "border-[#e6dfd1]",
        divider: "divide-[#ece6da]",
        grid: "bg-[#ded6c5]/60",
        chip: "bg-[#efe9dd]",
        eyebrow: "text-[#a39c8d]",
      };
    case "mist":
      return {
        section: "bg-[#ECECEF]",
        bgHex: "#ECECEF",
        card: "bg-white",
        open: "open:bg-white",
        heading: "text-gray-900",
        body: "text-gray-600",
        muted: "text-gray-400",
        border: "border-gray-200",
        divider: "divide-gray-100",
        grid: "bg-gray-300/40",
        chip: "bg-gray-100",
        eyebrow: "text-gray-400",
      };
    default:
      return {
        section: "bg-white",
        bgHex: "#FFFFFF",
        card: "bg-[#FAFAFB]",
        open: "open:bg-[#F6F6F8]",
        heading: "text-gray-900",
        body: "text-gray-600",
        muted: "text-gray-400",
        border: "border-gray-200",
        divider: "divide-gray-100",
        grid: "bg-gray-200/70",
        chip: "bg-gray-100",
        eyebrow: "text-gray-400",
      };
  }
}

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

/**
 * Stat que anima o número ao entrar na viewport, preservando prefixo/sufixo.
 * Texto não-numérico (ex: "Desde 2021", "Composto") renderiza sem animação.
 */
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

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

export function HeroSection({
  data,
  c,
  accent,
  Icon,
  isEn,
  withLang,
  openWhatsApp,
}: {
  data: ServiceData;
  c: ServiceContent;
  accent: Accent;
  Icon: LucideIcon;
  isEn: boolean;
  withLang: (p: string) => string;
  openWhatsApp: (where: string) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-28 pb-24 sm:pt-36 sm:pb-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${accent.hex}2e, transparent 70%), #000`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Reveal>
            <span
              className={`mb-7 inline-flex items-center gap-2 rounded-full border ${accent.ring} ${accent.soft} px-4 py-1.5 text-xs font-medium tracking-wide ${accent.text} sm:text-sm`}
            >
              <Icon className="h-4 w-4" />
              {c.badge}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {c.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-300/90 sm:text-lg lg:mx-0">
              {c.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={() => openWhatsApp("hero")}
                className={`inline-flex items-center gap-2 rounded-full ${accent.bg} px-8 py-4 text-base font-semibold text-black transition-transform hover:-translate-y-0.5`}
              >
                {c.ctaPrimary}
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href={withLang("/cases")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                {isEn ? "See cases" : "Ver cases"}
              </Link>
            </div>
          </Reveal>
        </div>

        {data.heroImage && (
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={data.heroImage}
                alt={c.h1}
                fill
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                className="object-contain [filter:url(#kld-crush)] [mix-blend-mode:screen]"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{ background: accent.hex, mixBlendMode: "color" }}
              />
            </div>
          </Reveal>
        )}
      </div>

      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="kld-crush">
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.6" intercept="-0.30" />
              <feFuncG type="linear" slope="1.6" intercept="-0.30" />
              <feFuncB type="linear" slope="1.6" intercept="-0.30" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* STATEMENT — 2ª seção, alto contraste, número gigante                */
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
    <section className="relative overflow-hidden bg-[#08080a] px-6 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 85% 20%, ${accent.hex}1f, transparent 65%)`,
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* número gigante */}
        <Reveal>
          <div className="lg:border-r lg:border-white/10 lg:pr-12">
            <span
              className={`mb-5 inline-block font-mono text-xs uppercase tracking-[0.22em] ${accent.text}`}
            >
              {s.kicker}
            </span>
            <div
              className="font-display text-[5.5rem] font-bold leading-[0.85] tracking-tight sm:text-[7rem] lg:text-[8.5rem]"
              style={{ color: accent.hex }}
            >
              {s.bigValue}
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              {s.bigLabel}
            </p>
          </div>
        </Reveal>
        {/* headline + corpo */}
        <Reveal delay={0.1}>
          <div>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.85rem]">
              {s.headline}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              {s.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHO IS FOR                                                          */
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
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl md:text-[3.25rem]`}
          >
            {c.whoTitle}
          </h2>
        </Reveal>
        <div
          className={`mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl ${t.grid} sm:grid-cols-2 lg:grid-cols-3`}
        >
          {c.who.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <div
                className={`flex h-full flex-col ${t.section} p-7 transition-colors hover:bg-white`}
              >
                <span
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${accent.soft}`}
                >
                  <Icon className={`h-5 w-5 ${accent.text}`} />
                </span>
                <h3
                  className={`mb-2 font-display text-xl font-bold leading-snug ${t.heading}`}
                >
                  {item.title}
                </h3>
                <p className={`flex-1 text-sm leading-relaxed ${t.body}`}>
                  {item.desc}
                </p>
                <span
                  className={`mt-6 font-mono text-xs tracking-widest ${t.muted}`}
                >
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
/* WHY IT MATTERS — sem isso / com a Kaleidos                          */
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
          <h2
            className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
          >
            {c.whyMattersTitle}
          </h2>
          <p
            className={`mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed ${t.body} sm:text-lg`}
          >
            {c.whyMattersBody}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className={`h-full rounded-3xl border ${t.border} ${t.card} p-8`}>
              <h3 className={`mb-5 font-display text-lg font-bold ${t.muted}`}>
                {isEn ? "Without it" : "Sem isso"}
              </h3>
              <ul className="space-y-3">
                {c.whyMattersBullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-3 text-sm leading-relaxed ${t.muted}`}
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
                    <span className="line-through decoration-current/40">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="h-full rounded-3xl border p-8"
              style={{
                borderColor: `${accent.hex}40`,
                background: `linear-gradient(180deg, ${accent.hex}10, transparent)`,
              }}
            >
              <h3 className={`mb-5 font-display text-lg font-bold ${accent.text}`}>
                {isEn ? "With Kaleidos" : "Com a Kaleidos"}
              </h3>
              <ul className="space-y-3">
                {c.whyMattersBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.soft}`}
                    >
                      <Check className={`h-3.5 w-3.5 ${accent.text}`} />
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
/* APPROACH — framework nomeado (metodologia)                          */
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
            <span
              className={`mb-4 inline-block font-mono text-xs uppercase tracking-[0.22em] ${accent.text}`}
            >
              {isEn ? "Our methodology" : "Nossa metodologia"}
            </span>
            <h2
              className={`font-display text-4xl font-bold leading-[1.05] tracking-tight ${t.heading} sm:text-5xl`}
            >
              {a.name}
            </h2>
            <p className={`mt-6 max-w-md text-base leading-relaxed ${t.body}`}>
              {a.intro}
            </p>
            <div
              className="mt-8 h-px w-24"
              style={{ background: accent.hex }}
              aria-hidden
            />
          </Reveal>
        </div>
        <div className={`overflow-hidden rounded-3xl border ${t.border} ${t.card}`}>
          {a.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div
                className={`flex gap-5 p-7 ${
                  i !== 0 ? `border-t ${t.border}` : ""
                }`}
              >
                <span
                  className="font-display text-3xl font-bold leading-none"
                  style={{ color: accent.hex }}
                >
                  {pad(i + 1)}
                </span>
                <div>
                  <h3
                    className={`mb-1.5 font-display text-lg font-bold leading-snug ${t.heading}`}
                  >
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
/* PROCESS — timeline com fases, duração e entregáveis                 */
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
            <h2
              className={`font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
            >
              {c.processTitle}
            </h2>
            <p className={`mt-4 max-w-sm text-base leading-relaxed ${t.body}`}>
              {isEn
                ? "A structured, phase-by-phase approach designed to deliver real results."
                : "Uma abordagem estruturada, fase a fase, feita pra entregar resultado de verdade."}
            </p>
            {c.processNote && (
              <p
                className={`mt-6 max-w-sm rounded-2xl border ${t.border} ${t.card} p-4 text-sm leading-relaxed ${t.body}`}
              >
                {c.processNote}
              </p>
            )}
          </Reveal>
        </div>

        {phases ? (
          <div className="relative">
            {/* trilho vertical */}
            <div
              className="absolute left-[15px] top-2 bottom-2 hidden w-px sm:block"
              style={{ background: `${accent.hex}33` }}
              aria-hidden
            />
            <div className="space-y-5">
              {phases.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="relative sm:pl-12">
                    <span
                      className="absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold sm:flex"
                      style={{
                        borderColor: accent.hex,
                        background: t.bgHex,
                        color: accent.hex,
                      }}
                    >
                      {pad(i + 1)}
                    </span>
                    <div
                      className={`rounded-2xl border ${t.border} ${t.card} p-7`}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accent.text}`}
                        >
                          {p.tag}
                        </span>
                        <span
                          className={`rounded-full ${t.chip} px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t.muted}`}
                        >
                          {p.duration}
                        </span>
                      </div>
                      <h3
                        className={`mb-2 font-display text-xl font-bold ${t.heading} sm:text-2xl`}
                      >
                        {p.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${t.body}`}>
                        {p.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.deliverables.map((d) => (
                          <span
                            key={d}
                            className={`inline-flex items-center gap-1.5 rounded-lg ${t.chip} px-3 py-1.5 text-xs font-medium ${t.heading}`}
                          >
                            <Check
                              className="h-3 w-3 shrink-0"
                              style={{ color: accent.hex }}
                            />
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
                <div className={`rounded-2xl border ${t.border} ${t.card} p-7`}>
                  <div className="mb-2 flex items-center justify-between">
                    <h3
                      className={`font-display text-xl font-bold ${t.heading} sm:text-2xl`}
                    >
                      {step.title}
                    </h3>
                    <span className={`font-mono text-xs tracking-widest ${t.muted}`}>
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
/* INCLUDED — incluso vs NÃO incluso (comparativo)                     */
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
            <h2
              className={`font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
            >
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
          {/* incluso */}
          <Reveal>
            <div
              className="h-full rounded-3xl border p-8"
              style={{
                borderColor: `${accent.hex}40`,
                background: `linear-gradient(180deg, ${accent.hex}0d, transparent 60%)`,
              }}
            >
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${accent.soft}`}
                >
                  <Check className={`h-4 w-4 ${accent.text}`} />
                </span>
                <h3 className={`font-display text-lg font-bold ${t.heading}`}>
                  {isEn ? "Included" : "Está incluso"}
                </h3>
              </div>
              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {c.included.map((item, i) => (
                  <Reveal key={item} delay={(i % 4) * 0.04}>
                    <li
                      className={`flex items-center gap-3 border-b ${t.border} py-3 last:border-0`}
                    >
                      <Check
                        className="h-4 w-4 shrink-0"
                        style={{ color: accent.hex }}
                      />
                      <span className={`text-sm font-medium ${t.heading}`}>
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* não incluso + cta */}
          <div className="flex flex-col gap-6">
            {c.notIncluded && c.notIncluded.length > 0 && (
              <Reveal delay={0.08}>
                <div className={`rounded-3xl border ${t.border} ${t.card} p-8`}>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${t.chip}`}
                    >
                      <Minus className={`h-4 w-4 ${t.muted}`} />
                    </span>
                    <h3 className={`font-display text-lg font-bold ${t.muted}`}>
                      {isEn ? "Not included" : "Não está incluso"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {c.notIncluded.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}
                      >
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
                className="flex flex-1 flex-col justify-between gap-5 rounded-3xl p-8"
                style={{
                  background: `linear-gradient(150deg, ${accent.hex}, ${accent.hex}cc)`,
                }}
              >
                <p className="text-sm font-semibold leading-relaxed text-black">
                  {c.includedNote ??
                    (isEn
                      ? "Flexible scope, shaped around your stage."
                      : "Escopo flexível, desenhado pro seu estágio.")}
                </p>
                <button
                  onClick={() => openWhatsApp("included")}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
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
/* SIGNATURE — banda escura com números grandes                        */
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
    <section className="relative overflow-hidden bg-[#0a0a0c] px-6 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 15% 50%, ${accent.hex}1a, transparent 60%)`,
        }}
      />
      <div className="mx-auto max-w-6xl">
        {(c.signatureTitle || c.signatureSubtitle) && (
          <Reveal>
            <div className="mb-12 max-w-2xl">
              {c.signatureTitle && (
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {c.signatureTitle}
                </h2>
              )}
              {c.signatureSubtitle && (
                <p className="mt-3 text-base leading-relaxed text-gray-400 sm:text-lg">
                  {c.signatureSubtitle}
                </p>
              )}
            </div>
          </Reveal>
        )}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full bg-[#0a0a0c] p-8">
                <div
                  className="font-display text-4xl font-bold leading-none sm:text-5xl"
                  style={{ color: accent.hex }}
                >
                  <AnimatedStat value={s.value} />
                </div>
                <div className="mt-3 text-sm leading-relaxed text-gray-400">
                  {s.label}
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
/* CASES — slides alternados grandes + barra de stats                  */
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
    <section className="bg-black px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
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
                className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accent.hex}33, #0a0a0a 70%)`,
                }}
              >
                <span className="px-6 text-center font-display text-4xl font-bold text-white/90 sm:text-5xl">
                  {cs.name}
                </span>
                <span
                  className={`absolute bottom-5 left-5 inline-flex items-center rounded-md ${accent.bg} px-3 py-1 text-sm font-bold text-black`}
                >
                  {cs.metric}
                </span>
              </div>
            );
            const Body = (
              <div className="flex flex-col justify-center">
                <span className="mb-3 font-mono text-xs tracking-widest text-gray-500">
                  [ {pad(i + 1)} / {pad(c.cases.length)} ]
                </span>
                <h3 className="mb-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  {cs.name}
                </h3>
                <p className="text-base leading-relaxed text-gray-400">{cs.desc}</p>
                {cs.href && (
                  <Link
                    href={withLang(cs.href)}
                    className={`mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold ${accent.text}`}
                  >
                    {isEn ? "See full case" : "Ver case completo"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            );
            return (
              <Reveal key={cs.name} delay={0.05}>
                <div className="grid items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:grid-cols-2 lg:p-8">
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
          <div className="mt-12 grid grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:grid-cols-3">
            {c.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-display text-4xl font-bold sm:text-5xl"
                  style={{ color: accent.hex }}
                >
                  <AnimatedStat value={s.value} />
                </div>
                <div className="mt-1.5 text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY US — bento                                                      */
/* ------------------------------------------------------------------ */

function BentoCard({
  w,
  wide = false,
}: {
  w: { title: string; desc: string };
  wide?: boolean;
}) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]">
      <h3
        className={`mb-3 font-display text-xl font-bold leading-snug text-white ${
          wide ? "sm:text-2xl" : ""
        }`}
      >
        {w.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">{w.desc}</p>
    </div>
  );
}

export function WhyUsSection({ c, accent }: { c: ServiceContent; accent: Accent }) {
  return (
    <section className="bg-black px-6 pb-24 pt-4 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal>
            <BentoCard w={c.whyUs[0]} />
          </Reveal>
          <Reveal delay={0.06}>
            <BentoCard w={c.whyUs[1]} />
          </Reveal>
          <Reveal delay={0.12}>
            <div
              className="flex h-full min-h-[160px] items-center justify-center rounded-3xl border p-8 text-center"
              style={{
                borderColor: `${accent.hex}40`,
                background: `linear-gradient(160deg, ${accent.hex}1a, transparent)`,
              }}
            >
              <h2
                className="font-display text-2xl font-bold leading-tight sm:text-3xl"
                style={{ color: accent.hex }}
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
  accent,
  isEn,
  withLang,
  tone,
}: {
  accent: Accent;
  isEn: boolean;
  withLang: (p: string) => string;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  const proof = TESTIMONIALS.slice(0, 3);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
          >
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
              <div
                className={`flex h-full flex-col rounded-3xl border ${t.border} ${t.card} p-7`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className={`font-display text-base font-bold ${t.heading}`}>
                      {tdata.name}
                    </p>
                    <p className={`text-xs ${t.muted}`}>
                      {tdata.role} · {tdata.company}
                    </p>
                  </div>
                  <span className={`text-sm ${accent.text}`}>★★★★★</span>
                </div>
                <p className={`flex-1 text-sm leading-relaxed ${t.body}`}>
                  “{isEn ? tdata.quote_en : tdata.quote}”
                </p>
                {tdata.caseLink && (
                  <Link
                    href={withLang(tdata.caseLink)}
                    className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text}`}
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

export function FaqSection({
  c,
  tone,
}: {
  c: ServiceContent;
  tone: LightTone;
}) {
  const t = lightTone(tone);
  return (
    <section className={`${t.section} px-6 py-20 sm:py-28`}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2
            className={`text-center font-display text-4xl font-bold tracking-tight ${t.heading} sm:text-5xl`}
          >
            {c.faqTitle}
          </h2>
        </Reveal>
        <div
          className={`mt-14 grid gap-px overflow-hidden rounded-3xl ${t.grid} sm:grid-cols-2`}
        >
          {c.faq.map((f, i) => (
            <Reveal key={f.question} delay={(i % 2) * 0.05}>
              <details
                className={`group h-full ${t.section} ${t.open} p-7 transition-colors [&_summary::-webkit-details-marker]:hidden`}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4">
                  <span
                    className={`font-display text-base font-bold leading-snug ${t.heading}`}
                  >
                    {f.question}
                  </span>
                  <span
                    className={`mt-0.5 font-mono text-[10px] tracking-widest ${t.muted}`}
                  >
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
/* FINAL CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCta({
  c,
  accent,
  isEn,
  withLang,
  openWhatsApp,
}: {
  c: ServiceContent;
  accent: Accent;
  isEn: boolean;
  withLang: (p: string) => string;
  openWhatsApp: (where: string) => void;
}) {
  return (
    <section className="px-4 py-16 sm:px-6">
      <Reveal>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-20 text-center sm:py-24"
          style={{
            background: `linear-gradient(135deg, ${accent.hex} 0%, ${accent.hex}d0 100%)`,
          }}
        >
          <span className="pointer-events-none absolute left-[8%] top-[22%] hidden rotate-[-6deg] rounded-md bg-black/80 px-3 py-1 text-xs font-semibold text-white sm:block">
            {isEn ? "Flexible scope" : "Escopo flexível"}
          </span>
          <span className="pointer-events-none absolute right-[10%] top-[28%] hidden rotate-[5deg] rounded-md bg-white px-3 py-1 text-xs font-semibold text-black sm:block">
            {isEn ? "Crypto-native" : "Cripto-nativo"}
          </span>
          <span className="pointer-events-none absolute bottom-[24%] left-[12%] hidden rotate-[4deg] rounded-md bg-white px-3 py-1 text-xs font-semibold text-black sm:block">
            {isEn ? "Ask us anything" : "Pergunte o que quiser"}
          </span>
          <span className="pointer-events-none absolute bottom-[26%] right-[9%] hidden rotate-[-5deg] rounded-md bg-black/80 px-3 py-1 text-xs font-semibold text-white sm:block">
            {isEn ? "Start now" : "Comece agora"}
          </span>

          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-black sm:text-6xl">
            {c.finalCtaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-black/70 sm:text-lg">
            {c.finalCtaSubtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => openWhatsApp("final_cta")}
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {c.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </button>
            <Link
              href={withLang("/contato")}
              className="inline-flex items-center gap-2 rounded-full border border-black/25 px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-black/5"
            >
              {isEn ? "Talk to us" : "Falar com a gente"}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
