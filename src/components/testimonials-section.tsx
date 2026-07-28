"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { getTestimonials } from "@/lib/testimonials-data";

export default function TestimonialsSection() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const testimonials = getTestimonials();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-neutral-950 py-20 sm:py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display tracking-tight mb-4">
            {isEn ? "What our clients say" : "O que nossos clientes dizem"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isEn
              ? "Real results, real stories from brands that trusted Kaleidos"
              : "Resultados reais, histórias reais de marcas que confiaram na Kaleidos"}
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 relative"
            >
              {/* Decorative quote */}
              <Quote className="absolute top-6 right-8 w-12 h-12 text-[#7CF067]/15" />

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left — avatar + info */}
                <div className="flex flex-col items-center md:items-start shrink-0 md:w-48">
                  <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-[#7CF067]/30 overflow-hidden flex items-center justify-center mb-4">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={64}
                        height={64}
                        className={
                          t.avatarIsPhoto
                            ? "w-full h-full object-cover"
                            : "object-contain p-1"
                        }
                      />
                    ) : (
                      <span className="text-[#7CF067] font-bold text-xl">
                        {t.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg text-center md:text-left">
                    {t.name}
                  </h3>
                  <p className="text-gray-400 text-sm text-center md:text-left">
                    {t.role}
                  </p>
                  <p className="text-[#7CF067] text-sm font-medium mt-1">
                    {t.company}
                  </p>

                  {/* Highlight badge */}
                  {t.highlight && (
                    <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-[#7CF067]/10 text-[#7CF067] text-xs font-semibold border border-[#7CF067]/20">
                      {isEn ? t.highlight_en || t.highlight : t.highlight}
                    </span>
                  )}
                </div>

                {/* Right — quote */}
                <div className="flex-1">
                  <blockquote className="text-white text-lg sm:text-xl leading-relaxed mb-6">
                    &ldquo;{isEn ? t.quote_en : t.quote}&rdquo;
                  </blockquote>

                  {t.caseLink && (
                    <Link
                      href={
                        isEn
                          ? `${t.caseLink}?lang=en`
                          : t.caseLink
                      }
                      className="inline-flex items-center text-[#7CF067] hover:text-[#5be04d] text-sm font-medium transition-colors"
                    >
                      {isEn ? "See full case →" : "Ver case completo →"}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 hover:border-[#7CF067]/50 flex items-center justify-center text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === current
                      ? "bg-[#7CF067] w-6"
                      : "bg-neutral-700 hover:bg-neutral-600"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 hover:border-[#7CF067]/50 flex items-center justify-center text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
