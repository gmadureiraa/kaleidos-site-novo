"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { papers } from "@/lib/papers-data";

/**
 * Carrossel horizontal de papers/playbooks no /blog.
 * Capa + título passando em loop suave (auto-scroll) com scroll-snap manual.
 * Distinto do grid <PapersBand /> — esse é a "esteira" que passa.
 */
export function PapersCarousel() {
  const visiblePapers = papers.filter((p) => !p.hidden);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll sutil em loop. Pausa no hover/touch e respeita prefers-reduced-motion.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let paused = false;
    let rafId = 0;
    const SPEED = 0.4; // px por frame — bem sutil

    const tick = () => {
      if (!paused && el) {
        // metade do scroll = fim da 1ª cópia da lista (loop infinito)
        const half = el.scrollWidth / 2;
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  if (visiblePapers.length === 0) return null;

  // Duplica a lista pra dar a ilusão de loop infinito no auto-scroll.
  const loopPapers = [...visiblePapers, ...visiblePapers];

  return (
    <section className="mb-16 pb-16 border-b border-gray-200">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#d262b2]" />
          <h2 className="font-mono uppercase tracking-[0.18em] text-[12px] text-gray-500">
            Estudos &amp; Playbooks Kaleidos
          </h2>
        </div>
        <span className="hidden sm:block text-[12px] text-gray-400 font-mono">
          arraste para o lado
        </span>
      </div>

      {/* Esteira com máscara de fade nas bordas */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopPapers.map((paper, i) => (
            <Link
              key={`${paper.slug}-${i}`}
              href={`/papers/${paper.slug}`}
              className="group snap-start shrink-0 w-[160px] sm:w-[180px]"
              aria-label={`${paper.volume} — ${paper.title}`}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-[#0A0A0A] transition-all duration-300 group-hover:border-gray-400 group-hover:shadow-xl">
                <Image
                  src={paper.cover}
                  alt={`${paper.volume} — ${paper.title}`}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-2 left-2 font-mono uppercase tracking-[0.12em] text-[9px] px-2 py-0.5 rounded-full text-black"
                  style={{ background: paper.accent }}
                >
                  {paper.volume}
                </span>
              </div>

              <p className="mt-3 text-[14px] font-semibold text-gray-900 leading-snug tracking-[-0.01em] line-clamp-2 group-hover:text-[#d262b2] transition-colors">
                {paper.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
