"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/i18n/useI18n"
import { useAnalytics } from "@/components/analytics"
import { CalendlyIcon } from "@/components/ui/calendly-icon"
import { EbookPopup } from "@/components/papers/ebook-popup"

export default function HeroKaleidos() {
  const { locale } = useI18n()
  const isEn = locale === "en"
  const { trackClick } = useAnalytics()
  const [ebookOpen, setEbookOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  // Parallax sutil: fundo drifta mais devagar, grid um pouco mais rápido.
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-[88vh] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 lg:py-0 overflow-hidden bg-black hero-section">
      {/* Background gradient */}
      <motion.div
        style={{ y: gradientY, opacity: bgOpacity }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/15 via-black to-black"
      />

      {/* Subtle grid pattern */}
      <motion.div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
        y: gridY,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="text-center max-w-5xl mx-auto px-6">
        {/* Badge — crypto-native positioning */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7CF067]/10 border border-[#7CF067]/20 text-[#7CF067] text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#7CF067] animate-pulse" />
            {isEn ? "Crypto-native agency" : "Agência nativa do mercado cripto"}
          </span>
        </motion.div>

        {/* Logo + Brand */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6"
        >
          <Image
            src="/Kaleidos/logo/Logos-10.svg"
            alt="Kaleidos Digital"
            width={120}
            height={40}
            className="h-14 sm:h-20 w-auto"
            priority
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            <span className="text-[#7CF067] font-display">Kaleidos</span> Digital
          </h1>
        </motion.div>

        {/* Headline — positioning statement */}
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4 font-display font-semibold leading-tight max-w-4xl mx-auto"
        >
          {isEn ? (
            <>Your <span className="text-[#7CF067]">crypto-market</span> agency.</>
          ) : (
            <>Sua agência do mercado <span className="text-[#7CF067]">cripto</span>.</>
          )}
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-14 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          {isEn
            ? "Since 2020 creating content, strategy and bringing growth and results to projects, exchanges, creators and founders in the crypto market."
            : "Desde 2020 criando conteúdo, estratégia e trazendo crescimento e resultados para projetos, exchanges, creators e founders do mercado cripto."}
        </motion.p>

        {/* CTA único — diagnóstico gratuito (→ /agendar, embed com tracking) */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex justify-center items-center"
        >
          <Link
            href="/agendar"
            onClick={() => trackClick("hero_agendar", "hero")}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="group/cta bg-[#7CF067] hover:bg-[#6ae85a] text-black font-bold px-9 py-4 text-lg w-full sm:w-auto shadow-lg shadow-[#7CF067]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7CF067] focus:ring-offset-2 focus:ring-offset-black"
              aria-label={isEn ? "Book a diagnosis call" : "Agendar diagnóstico"}
            >
              <CalendlyIcon className="mr-2 h-5 w-5" />
              {isEn ? "Free diagnosis" : "Diagnóstico gratuito"}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating playbook card — vertical (capa em cima, texto embaixo), bottom-right no desktop */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12 w-full max-w-[240px] mx-auto lg:absolute lg:top-28 xl:top-32 lg:right-8 lg:bottom-auto lg:mt-0 lg:mx-0 lg:w-[244px] lg:max-w-none z-20"
      >
        <Link
          href="/papers/playbook-cripto-2026"
          onClick={(e) => {
            e.preventDefault()
            trackClick("hero_playbook_cover", "hero")
            setEbookOpen(true)
          }}
          aria-label={isEn ? "Crypto Marketing in 2026 playbook" : "Playbook Marketing Cripto em 2026"}
          className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] transition-colors hover:border-[#D262B2]/40"
        >
          {/* glow rosa */}
          <div
            className="absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(180px 180px at 50% 0%, rgba(210,98,178,0.20), transparent 70%)" }}
          />
          {/* capa em cima */}
          <Image
            src="/papers/cover-playbook.webp"
            alt={isEn ? "Crypto Marketing in 2026" : "Marketing Cripto em 2026"}
            width={400}
            height={533}
            sizes="244px"
            loading="lazy"
            className="w-full rounded-lg object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* texto embaixo */}
          <div className="mt-3 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D262B2]/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#E486C7]">
              {isEn ? "Free playbook" : "Playbook grátis"}
            </span>
            <p className="mt-2 font-display text-[16px] font-bold leading-snug text-white">
              {isEn ? "Crypto Marketing in 2026" : "Marketing Cripto em 2026"}
            </p>
            <span className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7CF067] px-3 py-2 text-[13px] font-bold text-black transition-colors group-hover:bg-[#9bff8e]">
              {isEn ? "Download for free" : "Baixar grátis"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Popup do ebook estilo Lunar (capa grande + Baixar grátis) */}
      <EbookPopup open={ebookOpen} onClose={() => setEbookOpen(false)} />

      {/* Scroll indicator (só desktop, pra não brigar com o card no mobile) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="text-white/40 animate-bounce" aria-hidden="true">
          <ArrowDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  )
}
