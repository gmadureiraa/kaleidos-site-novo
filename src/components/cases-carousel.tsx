"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { CasesCarouselSkeleton } from "@/components/ui/skeletons";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useAnalytics } from "@/components/analytics";
import { useRef } from "react";

/**
 * Vídeo que NÃO baixa nada até entrar na viewport (preload="none" + IntersectionObserver).
 * Evita que a home dispare ~21MB de download de 6 vídeos autoplay competindo com o LCP.
 * Só dá play quando o card está visível; pausa ao sair.
 */
function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src; // só define o src (dispara o download) quando visível
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}

const casesCarouselData = [
  {
    id: "investidor-4-20",
    title: "Investidor 4.20",
    tag: "Comercial · Lançamento",
    description: "Desenvolvimento comercial completo e estratégias de lançamento.",
    metric: "10x Faturamento",
    gradient: "linear-gradient(150deg, #7CF067 0%, #1E7A3A 55%, #0A1A0E 100%)",
    coverImage: "/Cases/investidor-4-20/conteudo/Reels-1-Lucas-1.mp4",
    href: "/cases/investidor-4-20"
  },
  {
    id: "bit-das-minas",
    title: "Bit das Minas",
    tag: "Conteúdo · Lançamento",
    description: "Edição de vídeo, copywriting e roteiro para lançamentos virais.",
    metric: "+200% Faturamento",
    gradient: "linear-gradient(150deg, #D262B2 0%, #7A2E78 55%, #1A0E1A 100%)",
    coverImage: "/Cases/bit-das-minas/conteudo/Reels-1-Gi-2.mp4",
    href: "/cases/bit-das-minas"
  },
  {
    id: "layla-foz",
    title: "Layla Foz",
    tag: "Vídeo · Newsletter",
    description: "Edição de vídeo e criação de newsletters para crescimento orgânico.",
    metric: "+20M Views",
    gradient: "linear-gradient(150deg, #FF8A5B 0%, #C13E7A 55%, #1A0E16 100%)",
    coverImage: "/Cases/layla-foz/conteudo/Reels-1-Layla-1.mp4",
    href: "/cases/layla-foz"
  },
  {
    id: "alfred-dsec",
    title: "Alfred · DSEC",
    tag: "Persona · Conteúdo",
    description: "Construção de uma persona-mascote (Alfred) e conteúdo educativo sobre segurança e autocustódia de Bitcoin.",
    metric: "Persona Própria",
    gradient: "linear-gradient(150deg, #F7931A 0%, #8A4E12 55%, #1A1208 100%)",
    coverImage: "/Cases/alfred/conteudo/alfred-vs-hacker.jpg",
    href: "/cases/alfred"
  },
  {
    id: "defiverso",
    title: "Defiverso",
    tag: "Social Media · Estratégia",
    description: "Conteúdo do zero para Instagram, Twitter e WhatsApp, com toda a estratégia de social media.",
    metric: "12M Views",
    gradient: "linear-gradient(150deg, #9945FF 0%, #5226A8 55%, #120A24 100%)",
    coverImage: "/Cases/defiverso/conteudo/portfolio-novos/dfv-DU3yifAEYzs-reel.mp4",
    href: "/cases/defiverso"
  },
  {
    id: "hugo-doria",
    title: "Hugo Doria",
    tag: "Reels · IA",
    description: "Edição de reels sobre IA prática e vibe coding para criar autoridade técnica.",
    metric: "Reels Virais",
    gradient: "linear-gradient(150deg, #34D399 0%, #1E6E5A 55%, #0A1A16 100%)",
    coverImage: "/Cases/hugo-doria/conteudo/hugo-reel-01.mp4",
    href: "/cases/hugo-doria"
  },
  {
    id: "yasmin",
    title: "Yasmin",
    tag: "Reels · Motion",
    description: "Edição de reels virais com técnicas de After Effects para conteúdo cripto.",
    metric: "Reels Virais",
    gradient: "linear-gradient(150deg, #5AC8E0 0%, #2D5BFF 55%, #0A1024 100%)",
    coverImage: "/Cases/yasmin/conteudo/Reels-1-Yasmin-1.mp4",
    href: "/cases/yasmin"
  },
  {
    id: "neobankless",
    title: "Neobankless",
    tag: "Manifesto · Vídeo",
    description: "Roteiro e produção de vídeos-manifesto para posicionar a marca de dólar digital.",
    metric: "Brand Film",
    gradient: "linear-gradient(150deg, #38BDF8 0%, #1E5A8A 55%, #0A141A 100%)",
    coverImage: "/Cases/neobankless/conteudo/manifesto-1-vertical.mp4",
    href: "/cases/neobankless"
  },
  {
    id: "defiverso-carrossel",
    title: "Defiverso · Carrosséis",
    tag: "Carrossel · Notícias",
    description: "Carrosséis de notícias e Breaking News que pautaram o mercado cripto e engajaram a comunidade.",
    metric: "Conteúdo Viral",
    gradient: "linear-gradient(150deg, #9945FF 0%, #5226A8 55%, #120A24 100%)",
    coverImage: "/Cases/defiverso/conteudo/breaking-news-defiverso.png",
    href: "/cases/defiverso"
  }
];

function CasesCarouselContent({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  const { locale } = useI18n();
  const { trackClick } = useAnalytics();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const isVideo = (src: string) => src.includes('.mp4') || src.includes('.mov') || src.includes('.avi');

  return (
    <div className={`w-full flex justify-center py-12 sm:py-16 lg:py-20 ${light ? "bg-white" : "bg-black"}`}>
      <div className="w-full max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className={`mb-4 font-mono text-xs uppercase tracking-[0.22em] ${light ? "text-[#b14e96]" : "text-[#7CF067]"}`}>
            Cases em destaque
          </p>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display tracking-tight ${light ? "text-[#14110D]" : "text-white"}`}>
            Um resultado vale mais que mil palavras
          </h2>
          <p className={`mx-auto max-w-2xl text-base sm:text-lg leading-relaxed ${light ? "text-[#6b6258]" : "text-gray-400"}`}>
            Marcas cripto, web3 e creators que confiaram na Kaleidos pra crescer
            de verdade. Deslize e veja o trabalho.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ 
            delay: isMobile ? 4000 : 3000,
            disableOnInteraction: false 
          }}
          speed={isMobile ? 1500 : 2000}
          slidesPerView={1.2}
          spaceBetween={16}
          centeredSlides
          allowTouchMove={true}
          className="w-full"
          style={{ padding: "0 16px" }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 12
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 24
            }
          }}
        >
          {casesCarouselData.map((caseItem, idx) => (
            <SwiperSlide key={caseItem.id}>
              <Link 
                href={withLang(caseItem.href)} 
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:shadow-2xl group-hover:shadow-black/40 group-hover:-translate-y-1"
                >
                  {/* Media: o vídeo/imagem preenche o card inteiro */}
                  {isVideo(caseItem.coverImage) ? (
                    <LazyVideo
                      src={caseItem.coverImage}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Image
                      src={caseItem.coverImage}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
                    />
                  )}

                  {/* Scrims pretos sutis (topo + base) só pra legibilidade do texto */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />

                  {/* Header: tag + métrica */}
                  <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between p-4 sm:p-5">
                    <span className="inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm ring-1 ring-white/15">
                      {caseItem.tag}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-[#7CF067] px-2.5 py-1 text-xs font-bold text-black">
                      {caseItem.metric}
                    </span>
                  </div>

                  {/* Footer: título + descrição */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5">
                    <h3 className="text-white font-bold text-xl sm:text-2xl font-display leading-tight">
                      {caseItem.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/75 leading-relaxed line-clamp-2">
                      {caseItem.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7CF067]">
                      Ver case
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Botão Ver Todos os Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.7 }}
          className="flex justify-center mt-8 sm:mt-12"
        >
          <Link 
            href="/cases"
            className="inline-block bg-pink-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:bg-pink-600 transition-colors text-base sm:text-lg shadow-lg"
            onClick={() => trackClick("view_all_cases", "cases_carousel")}
          >
            Ver Todos os Cases
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function CasesCarousel({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CasesCarouselSkeleton />}>
        <CasesCarouselContent variant={variant} />
      </Suspense>
    </ErrorBoundary>
  );
}
