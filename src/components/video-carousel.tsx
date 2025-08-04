"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";
import Link from "next/link";

const carouselItems = [
  // Distribuição equilibrada - 1-2 exemplos de cada cliente intercalados
  
  // Bit das Minas
  {
    src: "/Conteudo_clientes/Bit das minas/Reels-1-Gi-2.mp4",
    type: "video",
    href: "/cases/bit-das-minas",
    title: "Bit das Minas",
    description: "Reels virais"
  },
  
  // Layla Foz
  {
    src: "/Conteudo_clientes/Layla Foz/Reels-1-Layla-1.mp4",
    type: "video",
    href: "/cases/layla-foz",
    title: "Layla Foz",
    description: "Reels educativos"
  },
  
  // Investidor 4.20
  {
    src: "/Conteudo_clientes/Investidor 4.20/Reels-1-Lucas-1.mp4",
    type: "video",
    href: "/cases/investidor-4-20",
    title: "Investidor 4.20",
    description: "Growth explosivo"
  },
  
  // Yasmin
  {
    src: "/Conteudo_clientes/Yasmin/Reels-1-Yasmin-1.mp4",
    type: "video",
    href: "/cases/yasmin",
    title: "Yasmin",
    description: "Reels criativos"
  },
  
  // Paradigma Education
  {
    src: "/Conteudo_clientes/Paradigma/PARADIGMAv2.mp4",
    type: "video",
    href: "/cases/paradigma-education",
    title: "Paradigma Education",
    description: "Motion design"
  },
  
  // Defifest (imagem)
  {
    src: "/Conteudo_clientes/Defifest/1.png",
    type: "image",
    href: "/cases/defifest",
    title: "Defifest",
    description: "Design de evento"
  },
  
  // Bit das Minas (segundo exemplo)
  {
    src: "/Conteudo_clientes/Bit das minas/Reels-3-Gi.mp4",
    type: "video",
    href: "/cases/bit-das-minas",
    title: "Bit das Minas",
    description: "Conteúdo engajante"
  },
  
  // Jornal Cripto (imagem)
  {
    src: "/Conteudo_clientes/Jornal cripto/1-2.png",
    type: "image",
    href: "/cases/jornal-cripto",
    title: "Jornal Cripto",
    description: "Design editorial"
  },
  
  // Layla Foz (segundo exemplo)
  {
    src: "/Conteudo_clientes/Layla Foz/Reels-2-Layla-1.mp4",
    type: "video",
    href: "/cases/layla-foz",
    title: "Layla Foz",
    description: "Conteúdo autêntico"
  },
  
  // Mercado Bitcoin (imagem)
  {
    src: "/Conteudo_clientes/Mercado Bitcoin/Instagram.png",
    type: "image",
    href: "/cases/mercado-bitcoin",
    title: "Mercado Bitcoin",
    description: "Posts Instagram"
  },
  
  // Investidor 4.20 (segundo exemplo)
  {
    src: "/Conteudo_clientes/Investidor 4.20/Reels-3-Lucas.mp4",
    type: "video",
    href: "/cases/investidor-4-20",
    title: "Investidor 4.20",
    description: "Lançamentos virais"
  },
  
  // Defifest (segunda imagem)
  {
    src: "/Conteudo_clientes/Defifest/10.png",
    type: "image",
    href: "/cases/defifest",
    title: "Defifest",
    description: "Branding completo"
  },
  
  // Yasmin (segundo exemplo)
  {
    src: "/Conteudo_clientes/Yasmin/Reels-3-Yasmin.mp4",
    type: "video",
    href: "/cases/yasmin",
    title: "Yasmin",
    description: "Conteúdo viral"
  },
  
  // Jornal Cripto (segunda imagem)
  {
    src: "/Conteudo_clientes/Jornal cripto/2-1.png",
    type: "image",
    href: "/cases/jornal-cripto",
    title: "Jornal Cripto",
    description: "Layout profissional"
  },
  
  // Paradigma Education (segundo exemplo)
  {
    src: "/Conteudo_clientes/Paradigma/20250620_PARADIGMA_01M06S_V3.mp4",
    type: "video",
    href: "/cases/paradigma-education",
    title: "Paradigma Education",
    description: "Edição avançada"
  },
  
  // Mercado Bitcoin (segunda imagem)
  {
    src: "/Conteudo_clientes/Mercado Bitcoin/Instagram2.png",
    type: "image",
    href: "/cases/mercado-bitcoin",
    title: "Mercado Bitcoin",
    description: "Conteúdo financeiro"
  },
];

export default function VideoCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('video-carousel');
    if (element) {
      observer.observe(element);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  // Remover a condição de visibilidade para garantir que os vídeos carreguem sempre
  // if (!isVisible) {
  //   return (
  //     <div id="video-carousel" className="w-full flex justify-center py-6 sm:py-8 lg:py-12 bg-white">
  //       <div className="w-full max-w-6xl px-4">
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {[...Array(6)].map((_, i) => (
  //             <div key={i} className="h-[350px] sm:h-[400px] md:h-[500px] lg:h-[570px] bg-gray-200 rounded-[16px] animate-pulse" />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div id="video-carousel" className="w-full flex justify-center py-6 sm:py-8 lg:py-12 bg-white">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ 
          delay: isMobile ? 3000 : 2000,
          disableOnInteraction: false 
        }}
        speed={isMobile ? 1500 : 2000}
        slidesPerView={1.1}
        spaceBetween={12}
        centeredSlides
        allowTouchMove={true}
        className="w-full max-w-6xl"
        style={{ padding: "0 12px" }}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 8
          },
          480: {
            slidesPerView: 1.3,
            spaceBetween: 12
          },
          640: {
            slidesPerView: 1.8,
            spaceBetween: 16
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16
          }
        }}
      >
        {carouselItems.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Link href={item.href} className="block group">
              <div className="relative flex justify-center items-center h-[350px] sm:h-[400px] md:h-[500px] lg:h-[570px]">
                {/* Container com bordas de reels */}
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-full">
                  {/* Borda externa (fundo escuro) */}
                  <div className="absolute inset-0 bg-black rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] shadow-2xl transform group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Conteúdo interno */}
                  <div className="relative w-full h-full p-1 sm:p-1.5 md:p-2 lg:p-2.5">
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={`${item.title} - ${item.description}`}
                        className="w-full h-full rounded-[16px] sm:rounded-[18px] md:rounded-[20px] lg:rounded-[24px] object-cover bg-black"
                        loading="lazy"
                        decoding="async"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.opacity = '1';
                        }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/Imagens/placeholder.png';
                        }}
                      />
                    ) : (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full rounded-[16px] sm:rounded-[18px] md:rounded-[20px] lg:rounded-[24px] object-cover bg-black"
                        preload="none"
                        onLoadStart={(e) => {
                          const video = e.target as HTMLVideoElement;
                          video.style.opacity = '0.5';
                        }}
                        onCanPlay={(e) => {
                          const video = e.target as HTMLVideoElement;
                          video.style.opacity = '1';
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Overlay com informações */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 rounded-b-[16px] sm:rounded-b-[18px] md:rounded-b-[20px] lg:rounded-b-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 