"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Download, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MediaItem {
  src: string;
  type: "image" | "video" | "pdf";
  alt?: string;
  poster?: string;
  link?: string; // URL para link externo (ex: Instagram)
}

interface CaseCarouselProps {
  media: MediaItem[];
  title: string;
  clientType?: "reels" | "feed";
  format?: 'default' | 'instagram' | 'reels';
}

export function CaseCarousel({ media, title, clientType = "reels", format = 'default' }: CaseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isVideo = (src: string) => src.includes('.mp4') || src.includes('.mov') || src.includes('.avi');
  const isPdf = (src: string) => src.includes('.pdf');

  // Determinar formato baseado no tipo de cliente e formato especificado
  const isReelsFormat = clientType === "reels" || format === 'instagram';
  const isReelsVertical = format === 'reels';
  const aspectRatio = isReelsVertical ? "9/16" : isReelsFormat ? "4/5" : "1/1"; // 9:16 para reels, 4:5 para Instagram, 1:1 para feed

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.case-carousel-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Função para obter estilo do card baseado no nome do cliente
  const getCardStyle = (clientName: string) => {
    const name = clientName.toLowerCase();
    
    if (name.includes('layla')) {
      return { bg: 'bg-black', text: 'text-pink-400' };
    } else if (name.includes('yasmin')) {
      return { bg: 'bg-green-500', text: 'text-white' };
    } else if (name.includes('bit das minas') || name.includes('bitdasminas')) {
      return { bg: 'bg-white', text: 'text-pink-500' };
    } else if (name.includes('investidor') || name.includes('4.20')) {
      return { bg: 'bg-pink-500', text: 'text-black' };
    } else if (name.includes('mercado bitcoin')) {
      return { bg: 'bg-black', text: 'text-pink-400' };
    } else if (name.includes('defifest')) {
      return { bg: 'bg-green-500', text: 'text-white' };
    } else if (name.includes('jornal cripto')) {
      return { bg: 'bg-white', text: 'text-pink-500' };
    } else if (name.includes('crypto.com')) {
      return { bg: 'bg-pink-500', text: 'text-black' };
    } else if (name.includes('orlando')) {
      return { bg: 'bg-black', text: 'text-pink-400' };
    } else if (name.includes('paradigma')) {
      return { bg: 'bg-green-500', text: 'text-white' };
    } else {
      return { bg: 'bg-black', text: 'text-pink-400' }; // Padrão
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true); // Abre já reproduzindo
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsPlaying(false);
  };

  const nextModal = () => {
    setSelectedIndex((prev) => (prev! + 1) % media.length);
  };

  const prevModal = () => {
    setSelectedIndex((prev) => (prev! - 1 + media.length) % media.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextModal();
    } else if (e.key === 'ArrowLeft') {
      prevModal();
    }
  };

  const getIndex = (index: number) => {
    return ((index % media.length) + media.length) % media.length;
  };

  const currentMedia = media[currentIndex];

  if (!currentMedia) return null;

  // Componente para renderizar um item de mídia
  const MediaItem = ({ item, index, isActive = false, onClick }: { 
    item: MediaItem; 
    index: number; 
    isActive?: boolean; 
    onClick?: () => void;
  }) => {
    const cardStyle = getCardStyle(title);
    
    return (
      <div 
        className={`cursor-pointer relative ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
        onClick={onClick}
      >
        {isVideo(item.src) ? (
          <div className="relative">
            <video
              src={item.src}
              autoPlay={isActive}
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg bg-black"
              style={{
                aspectRatio: aspectRatio,
                width: isReelsFormat ? "280px" : "320px",
                height: "auto",
                objectFit: "cover",
                background: "#000"
              }}
            />
            <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 ${cardStyle.bg} rounded-lg p-2 sm:p-3`}>
              <p className={`text-xs sm:text-sm font-display ${cardStyle.text} text-center`}>
                {title}
              </p>
            </div>
          </div>
        ) : isPdf(item.src) ? (
          <div className="bg-gray-50 rounded-xl p-4 sm:p-8 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
                {item.alt || "Documento PDF"}
              </p>
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-4 h-4" />
                Abrir PDF
              </a>
            </div>
          </div>
        ) : (
          <div className="relative">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={item.src}
                  alt={item.alt || `${title} - Imagem ${index + 1}`}
                  className="rounded-xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    aspectRatio: aspectRatio,
                    width: isReelsFormat ? "280px" : "320px",
                    height: "auto",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  ↗ Instagram
                </div>
              </a>
            ) : (
              <img
                src={item.src}
                alt={item.alt || `${title} - Imagem ${index + 1}`}
                className="rounded-xl shadow-lg"
                style={{
                  aspectRatio: aspectRatio,
                  width: isReelsFormat ? "280px" : "320px",
                  height: "auto",
                  objectFit: "cover"
                }}
              />
            )}
            <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 ${cardStyle.bg} rounded-lg p-2 sm:p-3`}>
              <p className={`text-xs sm:text-sm font-display ${cardStyle.text} text-center`}>
                {title}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Carrossel Principal - Responsivo */}
      <div className="relative group case-carousel-container">
        {/* Loading state */}
        {!isVisible && (
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 px-4 sm:px-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div 
                  className="bg-gray-200 animate-pulse rounded-xl"
                  style={{
                    aspectRatio: aspectRatio,
                    width: isReelsFormat ? (i === 1 ? "280px" : "180px") : "200px",
                    height: "auto",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Conteúdo real */}
        {isVisible && (
          <>
            {/* Mobile: Swiper com swipe */}
            {isMobile ? (
              <div className="px-4">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={true}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                  }}
                  onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                  className="case-swiper"
                  style={{
                    '--swiper-pagination-color': '#7CFF6B',
                    '--swiper-pagination-bullet-size': '8px',
                    '--swiper-pagination-bullet-horizontal-gap': '4px',
                  } as React.CSSProperties}
                >
                  {media.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center">
                        <MediaItem 
                          item={item} 
                          index={index} 
                          isActive={true}
                          onClick={() => openModal(index)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  
                  {/* Navegação customizada */}
                  <div className="swiper-button-prev !text-white !bg-black !bg-opacity-50 !w-8 !h-8 !rounded-full !left-2">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div className="swiper-button-next !text-white !bg-black !bg-opacity-50 !w-8 !h-8 !rounded-full !right-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  
                  {/* Paginação */}
                  <div className="swiper-pagination !bottom-2" />
                </Swiper>

                {/* Informações do slide */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">
                    {currentIndex + 1} de {media.length}
                  </p>
                </div>
              </div>
            ) : (
              /* Desktop: Layout original */
              <>
                {/* Botões de navegação - Responsivos */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1.5 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Slide anterior"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1.5 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Próximo slide"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                {/* Container do carrossel - Responsivo */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 px-4 sm:px-8">
                  {/* Vídeo anterior - Responsivo */}
                  {media.length > 1 && (
                    <div className="flex-shrink-0 opacity-60 scale-75 transform hidden sm:block">
                      <MediaItem 
                        item={media[getIndex(currentIndex - 1)]} 
                        index={getIndex(currentIndex - 1)}
                        onClick={() => setCurrentIndex(getIndex(currentIndex - 1))}
                      />
                    </div>
                  )}

                  {/* Vídeo central - Responsivo */}
                  <div className="flex-shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer relative"
                        onClick={() => openModal(currentIndex)}
                      >
                        <MediaItem 
                          item={currentMedia} 
                          index={currentIndex}
                          isActive={true}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Vídeo próximo - Responsivo */}
                  {media.length > 1 && (
                    <div className="flex-shrink-0 opacity-60 scale-75 transform hidden sm:block">
                      <MediaItem 
                        item={media[getIndex(currentIndex + 1)]} 
                        index={getIndex(currentIndex + 1)}
                        onClick={() => setCurrentIndex(getIndex(currentIndex + 1))}
                      />
                    </div>
                  )}
                </div>

                {/* Informações do slide - Responsivo */}
                <div className="mt-4 sm:mt-6 text-center px-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {currentIndex + 1} de {media.length}
                  </p>
                </div>
                
                {/* Indicadores - Responsivo */}
                {media.length > 1 && (
                  <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2 px-4">
                    {media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                          index === currentIndex 
                            ? 'bg-[#7CFF6B]' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Modal para vídeos - Responsivo */}
      <AnimatePresence>
        {selectedIndex !== null && isVideo(media[selectedIndex].src) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 z-10"
                aria-label="Fechar modal"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              
              {media.length > 1 && (
                <>
                  <button
                    onClick={prevModal}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 text-2xl sm:text-3xl"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  
                  <button
                    onClick={nextModal}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 text-2xl sm:text-3xl"
                    aria-label="Próximo"
                  >
                    →
                  </button>
                </>
              )}

              <video
                src={media[selectedIndex].src}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
                controls
                autoPlay={isPlaying}
                poster={media[selectedIndex].poster}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm">
                {selectedIndex + 1} de {media.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estilos customizados para o Swiper */}
      <style jsx global>{`
        .case-swiper .swiper-button-next,
        .case-swiper .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-top: -16px;
        }
        
        .case-swiper .swiper-button-next:after,
        .case-swiper .swiper-button-prev:after {
          font-size: 14px;
        }
        
        .case-swiper .swiper-pagination-bullet {
          background: #7CFF6B;
          opacity: 0.5;
        }
        
        .case-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </>
  );
}