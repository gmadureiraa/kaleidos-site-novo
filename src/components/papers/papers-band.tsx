"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { papers } from "@/lib/papers-data";

/**
 * Banda "Estudos Kaleidos · Papers" no topo do blog — agora em CARROSSEL
 * arrastável (drag/swipe pro lado). Cada slide é a capa do paper + título.
 */
export function PapersBand() {
  const visiblePapers = papers.filter((p) => !p.hidden);
  if (visiblePapers.length === 0) return null;

  return (
    <section className="mb-16 overflow-x-clip border-b border-gray-200 pb-16">
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

      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode
        grabCursor
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={900}
        slidesPerView={1.3}
        spaceBetween={18}
        breakpoints={{
          480: { slidesPerView: 1.8, spaceBetween: 18 },
          640: { slidesPerView: 2.4, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 22 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="w-full !overflow-hidden !py-1"
      >
        {visiblePapers.map((paper) => (
          <SwiperSlide key={paper.slug} className="h-auto">
            <Link
              href={`/papers/${paper.slug}`}
              className="group block select-none"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
