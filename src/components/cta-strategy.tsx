"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CalendlyIcon } from "@/components/ui/calendly-icon";
import { useI18n } from "@/i18n/useI18n";
import { useAnalytics } from "@/components/analytics";

const CALENDLY = "https://calendly.com/madureira-kaleidosdigital/30min";
// Número já usado no /links e no rodapé do site (não inventar).
const WHATSAPP = "5512997796835";

// Ícone WhatsApp (inline, marca) — lucide não tem brand oficial.
function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

/**
 * CTA final estilo "Let's Talk Strategy" do Lunar:
 * título grande + chips coloridos tipo sticker espalhados + botão
 * "Agendar reunião" → Calendly. Seção escura, on-brand Kaleidos.
 */
export function CtaStrategy() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const { trackClick } = useAnalytics();

  const waMessage = isEn
    ? "Hi! I came from the Kaleidos site and I'd like to talk."
    : "Oi! Vim do site da Kaleidos e quero falar com vocês.";
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

  // chips "sticker" — paleta da marca (verde / rosa / contorno), sem arco-íris
  const GREEN = { bg: "#7CF067", fg: "#0A1A0E", border: "transparent" };
  const PINK = { bg: "#D262B2", fg: "#1A0E1A", border: "transparent" };
  const GHOST = { bg: "transparent", fg: "#E8E8E8", border: "rgba(255,255,255,0.22)" };
  const chips: { label: string; label_en: string; tone: typeof GREEN; rot: string }[] = [
    { label: "Conteúdo", label_en: "Content", tone: GREEN, rot: "-6deg" },
    { label: "Growth", label_en: "Growth", tone: PINK, rot: "5deg" },
    { label: "IA & Automação", label_en: "AI & Automation", tone: GHOST, rot: "-3deg" },
    { label: "Lançamentos", label_en: "Launches", tone: PINK, rot: "7deg" },
    { label: "Vídeo & Motion", label_en: "Video & Motion", tone: GHOST, rot: "-5deg" },
    { label: "Design", label_en: "Design", tone: GREEN, rot: "4deg" },
    { label: "Newsletter", label_en: "Newsletter", tone: GHOST, rot: "-4deg" },
    { label: "Sites & Web Apps", label_en: "Sites & Web Apps", tone: PINK, rot: "6deg" },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:py-32">
      {/* glow de fundo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #D262B2 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-[#7CF067]"
        >
          {isEn ? "Let's build" : "Bora construir"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {isEn ? "Let's talk" : "Vamos falar de"}
          <br />
          <span className="text-[#D262B2]">{isEn ? "strategy" : "estratégia"}</span>
        </motion.h2>

        {/* chips sticker */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: c.rot }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + i * 0.05,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              className="inline-flex select-none items-center rounded-full px-4 py-2 text-sm font-bold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]"
              style={{ background: c.tone.bg, color: c.tone.fg, border: `1px solid ${c.tone.border}` }}
            >
              {isEn ? c.label_en : c.label}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
        >
          {isEn
            ? "30 minutes, no commitment. Bring your project — we'll bring the plan."
            : "30 minutos, sem compromisso. Traz o seu projeto, que a gente traz o plano."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primário: agendar reunião (Calendly) */}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("cta_strategy_calendly", "cta_strategy")}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#7CF067] px-8 py-4 text-lg font-bold text-black shadow-lg shadow-[#7CF067]/25 transition-colors hover:bg-[#6ae85a] sm:w-auto"
          >
            <CalendlyIcon className="h-5 w-5" />
            {isEn ? "Book a meeting" : "Agendar reunião"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Secundário: WhatsApp (mensagem pré-preenchida pela intenção) */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("cta_strategy_whatsapp", "cta_strategy")}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/25 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10 sm:w-auto"
          >
            <WhatsappIcon className="h-5 w-5" />
            {isEn ? "Prefer WhatsApp?" : "Prefere WhatsApp?"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
