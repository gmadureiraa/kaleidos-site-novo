"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { papers } from "@/lib/papers-data";

/**
 * Banda "Estudos Kaleidos · Papers" no topo do blog — carrossel arrastável.
 * Scroll horizontal NATIVO (overflow-x-auto): funciona com touch e trackpad/wheel
 * de fábrica. Em cima disso, um handler de pointer-drag dá o "arrastar com mouse"
 * que o scroll nativo não cobre. Sem dependência de lib (saiu do Swiper, que
 * brigava com autoplay/loop e parecia travado pro usuário).
 */
export function PapersBand() {
  const visiblePapers = papers.filter((p) => !p.hidden);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll com mouse/caneta (pointer events). Touch e wheel rolam nativo.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDown = false;
    let dragged = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // touch usa scroll nativo
      isDown = true;
      dragged = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) dragged = true;
      el.scrollLeft = startScroll - dx;
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    // Se foi arraste, cancela o clique no <Link> pra não navegar sem querer.
    const onClickCapture = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  if (visiblePapers.length === 0) return null;

  return (
    <section className="mb-16 border-b border-gray-200 pb-16">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#d262b2]" />
          <h2 className="font-mono uppercase tracking-[0.18em] text-[12px] text-gray-500">
            Estudos Kaleidos · Papers
          </h2>
        </div>
        <span className="hidden sm:block text-[12px] text-gray-400 font-mono">
          Arraste pro lado · PDF grátis
        </span>
      </div>

      {/* Esteira com máscara de fade nas bordas */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-14 bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-14 bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />

        <div
          ref={scrollerRef}
          className="flex gap-[18px] sm:gap-5 lg:gap-6 overflow-x-auto overscroll-x-contain cursor-grab select-none touch-pan-y px-4 sm:px-6 lg:px-8 py-1 snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {visiblePapers.map((paper) => (
            <Link
              key={paper.slug}
              href={`/papers/${paper.slug}`}
              className="group block shrink-0 snap-start w-[70vw] min-[480px]:w-[55vw] sm:w-[42vw] md:w-[32vw] lg:w-[30%] xl:w-[23%]"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              aria-label={`${paper.volume} — ${paper.title}`}
            >
              {/* Capa */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl"
                style={{ boxShadow: `0 14px 40px -22px ${paper.accent}66` }}
              >
                <Image
                  src={paper.cover}
                  alt={`${paper.volume} — ${paper.title}`}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 24vw"
                />
              </div>
              {/* Título abaixo */}
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono uppercase tracking-[0.14em] text-[10px] px-2 py-0.5 rounded-full text-black"
                    style={{ background: paper.accent }}
                  >
                    {paper.volume}
                  </span>
                  <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-gray-400">
                    {paper.tag}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display font-bold text-gray-900 text-[1.05rem] leading-snug tracking-[-0.015em] line-clamp-2 transition-colors group-hover:text-[#d262b2]">
                  {paper.title}
                </h3>
                <div className="mt-2 flex items-center gap-2.5 text-[11px] text-gray-500 font-mono">
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {paper.pages}p
                  </span>
                  <span className="text-gray-300">/</span>
                  <span>{paper.readTime}</span>
                  <span
                    className="inline-flex items-center gap-1 ml-auto font-semibold"
                    style={{ color: paper.accent }}
                  >
                    Ler <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
