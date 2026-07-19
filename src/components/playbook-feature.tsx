"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Destaque do playbook flagship na home (estilo Lunar Strategy).
 * Banda full-width escura, com a capa + CTA duplo: baixar o playbook grátis
 * ou agendar um diagnóstico gratuito (/agendar, embed com tracking). O ativo principal do site.
 */
export function PlaybookFeature() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 bg-white">
      <div className="max-w-[1120px] mx-auto">
        <div className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]">
          {/* textura */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(rgba(210,98,178,0.16) 1.5px, transparent 1.6px)",
              backgroundSize: "13px 13px",
            }}
          />
          {/* glow */}
          <div
            className="absolute -right-20 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #D262B2 0%, transparent 70%)" }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-10 items-center p-7 md:p-10">
            {/* texto */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] px-3 py-1.5 rounded-full text-black bg-[#D262B2] mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Playbook grátis
              </span>
              <h2 className="font-display font-bold text-white text-[1.9rem] md:text-[2.6rem] leading-[1.04] tracking-[-0.02em] max-w-2xl">
                Marketing cripto em 2026
                <span className="text-[#D262B2]">.</span>
              </h2>
              <p className="mt-4 text-[15px] md:text-base text-gray-400 leading-relaxed max-w-xl">
                O guia completo da Kaleidos: 10 capítulos sobre pra onde a atenção,
                os canais e as métricas do mercado cripto estão indo, e como estruturar
                seu marketing pro que vem. Da especulação à utilidade.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/papers/playbook-cripto-2026"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7CF067] text-black font-semibold text-sm transition-colors hover:bg-[#6ae85a]"
                >
                  Baixar o playbook grátis
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/agendar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm transition-colors hover:bg-white/10"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Agendar diagnóstico
                </Link>
              </div>
            </motion.div>

            {/* capa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mx-auto w-[220px] md:w-full max-w-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] rotate-[2deg] hover:rotate-0 transition-transform duration-500"
            >
              <Link href="/papers/playbook-cripto-2026" aria-label="Marketing Cripto em 2026">
                <Image
                  src="/papers/cover-playbook.webp"
                  alt="Playbook: Marketing Cripto em 2026"
                  width={600}
                  height={800}
                  sizes="(max-width: 768px) 60vw, 300px"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
