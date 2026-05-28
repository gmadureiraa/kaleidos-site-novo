"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";
import Image from "next/image";
import { CasesCarouselSkeleton } from "@/components/ui/skeletons";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useAnalytics } from "@/components/analytics";

const casesCarouselData = [
  {
    id: "bit-das-minas",
    title: "Bit das Minas",
    description: "Edição de vídeo, copywrite e roteiro para lançamentos virais.",
    metric: "+200% Faturamento",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/bit-das-minas/conteudo/Reels-1-Gi-2.mp4",
    href: "/cases/bit-das-minas"
  },
  {
    id: "layla-foz",
    title: "Layla Foz",
    description: "Edição de vídeo e criação de newsletters para crescimento orgânico.",
    metric: "+20M Views",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/layla-foz/conteudo/Reels-1-Layla-1.mp4",
    href: "/cases/layla-foz"
  },
  {
    id: "investidor-4-20",
    title: "Investidor 4.20",
    description: "Desenvolvimento comercial completo e estratégias de lançamento.",
    metric: "5x Faturamento",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/investidor-4-20/conteudo/Reels-1-Lucas-1.mp4",
    href: "/cases/investidor-4-20"
  },
  {
    id: "yasmin",
    title: "Yasmin",
    description: "Edição de reels virais com técnicas de After Effects para conteúdo crypto.",
    metric: "Reels Virais",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/yasmin/conteudo/Reels-1-Yasmin-1.mp4",
    href: "/cases/yasmin"
  },
  {
    id: "paradigma-education",
    title: "Paradigma Education",
    description: "Edição de vídeo com motion graphics e animações para conteúdo educativo.",
    metric: "Motion Design",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/paradigma/conteudo/PARADIGMAv2.mp4",
    href: "/cases/paradigma-education"
  },
  {
    id: "defiverso",
    title: "Defiverso",
    description: "Criação de conteúdo do zero para Instagram, Twitter e grupo de WhatsApp. Desenvolvimento de toda estratégia de social media.",
    metric: "8K Seguidores",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/defiverso/conteudo/Breaking news defiverso.png",
    href: "/cases/defiverso"
  },
  {
    id: "mercado-bitcoin",
    title: "Mercado Bitcoin",
    description: "Criação de conteúdo para redes sociais durante 18 meses.",
    metric: "+80K Seguidores",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/mercado-bitcoin/conteudo/Instagram.png",
    href: "/cases/mercado-bitcoin"
  },
  {
    id: "crypto-com",
    title: "Crypto.com",
    description: "Criação de conteúdo para Instagram e Twitter com estratégia focada.",
    metric: "+100% Curtidas",
    metricColor: "bg-pink-500",
    coverImage: "/Cases/crypto-com/conteudo/Captura de Tela 2025-07-26 às 22.37.16.png",
    href: "/cases/crypto-com"
  }
];

function CasesCarouselContent() {
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
    <div className="w-full flex justify-center py-12 sm:py-16 lg:py-20 bg-black">
      <div className="w-full max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 font-display tracking-tight">
          Um resultado vale mais que mil palavras{" "}  
          </h2>
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
            <SwiperSlide key={idx}>
              <Link 
                href={withLang(caseItem.href)} 
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden bg-black border border-gray-800/50 group-hover:border-green-400/30 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-400/10 group-hover:scale-[1.02]"
                >
                  {/* Cover Image/Video */}
                  <div className="absolute inset-0">
                    {isVideo(caseItem.coverImage) ? (
                      <video
                        src={caseItem.coverImage}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={caseItem.coverImage}
                        alt={caseItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
                      />
                    )}
                  </div>
                  
                  {/* Content - Bottom Section with Rectangle Shadow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] p-0">
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent rounded-t-2xl"></div>
                    
                    {/* Rectangle with shadow for title, description and metric */}
                    <div className="relative bg-black/70 backdrop-blur-md rounded-t-2xl p-5 sm:p-6 shadow-2xl h-full flex flex-col justify-end w-full">
                      <div className="space-y-2 sm:space-y-2.5">
                        <h3 className="text-white font-bold text-xl sm:text-2xl font-display text-left leading-tight">
                          {caseItem.title}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-left line-clamp-2">
                          {caseItem.description}
                        </p>
                        
                        {/* Metric badge - mais elegante e sutil */}
                        <div className="pt-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-md bg-green-400/10 text-green-400/90 font-medium text-xs sm:text-sm border border-green-400/30 backdrop-blur-sm transition-all group-hover:bg-green-400/15 group-hover:border-green-400/40">
                            {caseItem.metric}
                          </span>
                        </div>
                      </div>
                    </div>
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

export default function CasesCarousel() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CasesCarouselSkeleton />}>
        <CasesCarouselContent />
      </Suspense>
    </ErrorBoundary>
  );
}
