"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";

const videos = [
  // Bit das Minas
  "/Conteudo_clientes/Bit das minas/Reels-1-Gi-2.mp4",
  "/Conteudo_clientes/Bit das minas/Reels-3-Gi.mp4",
  
  // Layla Foz
  "/Conteudo_clientes/Layla Foz/Reels-1-Layla-1.mp4",
  "/Conteudo_clientes/Layla Foz/Reels-2-Layla-1.mp4",
  
  // Investidor 4.20
  "/Conteudo_clientes/Investidor 4.20/Reels-1-Lucas-1.mp4",
  "/Conteudo_clientes/Investidor 4.20/Reels-3-Lucas.mp4",
  
  // Yasmin
  "/Conteudo_clientes/Yasmin/Reels-1-Yasmin-1.mp4",
  "/Conteudo_clientes/Yasmin/Reels-3-Yasmin.mp4",
  
  // Paradigma Education
  "/Conteudo_clientes/Paradigma/PARADIGMAv2.mp4",
  "/Conteudo_clientes/Paradigma/20250620_PARADIGMA_01M06S_V3.mp4",
  
  // Defifest (imagens)
  "/Conteudo_clientes/Defifest/1.png",
  "/Conteudo_clientes/Defifest/10.png",
  
  // Jornal Cripto (imagens)
  "/Conteudo_clientes/Jornal cripto/1-2.png",
  "/Conteudo_clientes/Jornal cripto/2-1.png",
  
  // Mercado Bitcoin (imagens)
  "/Conteudo_clientes/Mercado Bitcoin/Instagram.png",
  "/Conteudo_clientes/Mercado Bitcoin/Instagram2.png",
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

  if (!isVisible) {
    return (
      <div id="video-carousel" className="w-full flex justify-center py-6 sm:py-8 lg:py-12 bg-white">
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] sm:h-[400px] md:h-[500px] lg:h-[570px] bg-gray-200 rounded-[16px] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="video-carousel" className="w-full flex justify-center py-6 sm:py-8 lg:py-12 bg-white">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ 
          delay: isMobile ? 3000 : 2000, // Delay maior em mobile
          disableOnInteraction: false 
        }}
        speed={isMobile ? 1500 : 2000} // Velocidade menor em mobile
        slidesPerView={1.1}
        spaceBetween={12}
        centeredSlides
        allowTouchMove={true} // Permitir touch em mobile
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
        {videos.map((src, idx) => {
          const isImage = src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg');
          
          return (
            <SwiperSlide key={idx}>
              <div className="flex justify-center items-center h-[350px] sm:h-[400px] md:h-[500px] lg:h-[570px]">
                {isImage ? (
                  <img
                    src={src}
                    alt="Resultado do cliente"
                    className="rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] shadow-lg bg-black w-full"
                    style={{
                      aspectRatio: "9/16",
                      width: "100%",
                      maxWidth: "312px",
                      height: "auto",
                      maxHeight: "741px",
                      objectFit: "cover",
                      background: "#000"
                    }}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      // Esconder loading state
                      const img = e.target as HTMLImageElement;
                      img.style.opacity = '1';
                    }}
                    onError={(e) => {
                      // Mostrar fallback em caso de erro
                      const img = e.target as HTMLImageElement;
                      img.src = '/Imagens/placeholder.png';
                    }}
                  />
                ) : (
                  <video
                    src={src}
                    autoPlay={!isMobile} // Desabilitar autoplay em mobile
                    loop
                    muted
                    playsInline
                    className="rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] shadow-lg bg-black w-full"
                    style={{
                      aspectRatio: "9/16",
                      width: "100%",
                      maxWidth: "312px",
                      height: "auto",
                      maxHeight: "741px",
                      objectFit: "cover",
                      background: "#000"
                    }}
                    preload="none" // Não carregar até ser visível
                    onLoadStart={(e) => {
                      // Mostrar loading state
                      const video = e.target as HTMLVideoElement;
                      video.style.opacity = '0.5';
                    }}
                    onCanPlay={(e) => {
                      // Esconder loading state
                      const video = e.target as HTMLVideoElement;
                      video.style.opacity = '1';
                    }}
                  />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
} 