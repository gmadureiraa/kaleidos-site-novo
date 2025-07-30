"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Download, X } from "lucide-react";
import { useState, useEffect } from "react";

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

  const isVideo = (src: string) => src.includes('.mp4') || src.includes('.mov') || src.includes('.avi');
  const isPdf = (src: string) => src.includes('.pdf');

  // Determinar formato baseado no tipo de cliente e formato especificado
  const isReelsFormat = clientType === "reels" || format === 'instagram';
  const isReelsVertical = format === 'reels';
  const aspectRatio = isReelsVertical ? "9/16" : isReelsFormat ? "4/5" : "1/1"; // 9:16 para reels, 4:5 para Instagram, 1:1 para feed

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
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % media.length);
      setIsPlaying(true);
    }
  };

  const prevModal = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? media.length - 1 : selectedIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextModal();
    if (e.key === "ArrowLeft") prevModal();
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum material disponível</p>
      </div>
    );
  }

  const currentMedia = media[currentIndex];

  // Função para obter índice com loop
  const getIndex = (index: number) => {
    return ((index % media.length) + media.length) % media.length;
  };

  return (
    <>
      {/* Carrossel Principal - Com vídeos ao lado */}
      <div className="relative group case-carousel-container">
        {/* Loading state */}
        {!isVisible && (
          <div className="flex justify-center items-center space-x-4 px-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div 
                  className="bg-gray-200 animate-pulse rounded-xl"
                  style={{
                    aspectRatio: aspectRatio,
                    width: isReelsFormat ? (i === 1 ? "312px" : "200px") : "250px",
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
        {/* Botões de navegação */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Slide anterior"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Próximo slide"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Container do carrossel - Com vídeos visíveis ao lado */}
        <div className="flex justify-center items-center space-x-4 px-8">
          {/* Vídeo anterior */}
          {media.length > 1 && (
            <div className="flex-shrink-0 opacity-60 scale-75 transform">
              {isVideo(media[getIndex(currentIndex - 1)].src) ? (
                <div className="relative">
                  <video
                    src={media[getIndex(currentIndex - 1)].src}
                    muted
                    playsInline
                    className="rounded-xl shadow-lg bg-black"
                    style={{
                      aspectRatio: aspectRatio,
                      width: isReelsFormat ? "200px" : "250px",
                      height: "auto",
                      objectFit: "cover",
                      background: "#000"
                    }}
                  />
                  <div className={`absolute bottom-2 left-2 right-2 ${getCardStyle(title).bg} rounded-lg p-2`}>
                    <p className={`text-xs font-display ${getCardStyle(title).text} text-center`}>
                      {title}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={media[getIndex(currentIndex - 1)].src}
                    alt={media[getIndex(currentIndex - 1)].alt || "Slide anterior"}
                    className="rounded-xl shadow-lg"
                    style={{
                      aspectRatio: aspectRatio,
                      width: isReelsFormat ? "200px" : "250px",
                      height: "auto",
                      objectFit: "cover"
                    }}
                  />
                  <div className={`absolute bottom-2 left-2 right-2 ${getCardStyle(title).bg} rounded-lg p-2`}>
                    <p className={`text-xs font-display ${getCardStyle(title).text} text-center`}>
                      {title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Vídeo central - Reproduzindo */}
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
                {isVideo(currentMedia.src) ? (
                  <div className="relative">
                    <video
                      src={currentMedia.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-xl shadow-lg bg-black"
                      style={{
                        aspectRatio: aspectRatio,
                        width: isReelsFormat ? "312px" : "400px",
                        height: "auto",
                        objectFit: "cover",
                        background: "#000"
                      }}
                    />
                    <div className={`absolute bottom-3 left-3 right-3 ${getCardStyle(title).bg} rounded-lg p-3`}>
                      <p className={`text-sm font-display ${getCardStyle(title).text} text-center`}>
                        {title}
                      </p>
                    </div>
                  </div>
                ) : isPdf(currentMedia.src) ? (
                  <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium mb-2">
                        {currentMedia.alt || "Documento PDF"}
                      </p>
                      <a
                        href={currentMedia.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Abrir PDF
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {currentMedia.link ? (
                      <a
                        href={currentMedia.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={currentMedia.src}
                          alt={currentMedia.alt || `${title} - Imagem ${currentIndex + 1}`}
                          className="rounded-xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                          style={{
                            aspectRatio: aspectRatio,
                            width: isReelsFormat ? "312px" : "400px",
                            height: "auto",
                            objectFit: "cover"
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          ↗ Instagram
                        </div>
                      </a>
                    ) : (
                    <img
                      src={currentMedia.src}
                      alt={currentMedia.alt || `${title} - Imagem ${currentIndex + 1}`}
                      className="rounded-xl shadow-lg"
                      style={{
                        aspectRatio: aspectRatio,
                        width: isReelsFormat ? "312px" : "400px",
                        height: "auto",
                        objectFit: "cover"
                      }}
                    />
                    )}
                    <div className={`absolute bottom-3 left-3 right-3 ${getCardStyle(title).bg} rounded-lg p-3`}>
                      <p className={`text-sm font-display ${getCardStyle(title).text} text-center`}>
                        {title}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vídeo próximo */}
          {media.length > 1 && (
            <div className="flex-shrink-0 opacity-60 scale-75 transform">
              {isVideo(media[getIndex(currentIndex + 1)].src) ? (
                <div className="relative">
                  <video
                    src={media[getIndex(currentIndex + 1)].src}
                    muted
                    playsInline
                    className="rounded-xl shadow-lg bg-black"
                    style={{
                      aspectRatio: aspectRatio,
                      width: isReelsFormat ? "200px" : "250px",
                      height: "auto",
                      objectFit: "cover",
                      background: "#000"
                    }}
                  />
                  <div className={`absolute bottom-2 left-2 right-2 ${getCardStyle(title).bg} rounded-lg p-2`}>
                    <p className={`text-xs font-display ${getCardStyle(title).text} text-center`}>
                      {title}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={media[getIndex(currentIndex + 1)].src}
                    alt={media[getIndex(currentIndex + 1)].alt || "Próximo slide"}
                    className="rounded-xl shadow-lg"
                    style={{
                      aspectRatio: aspectRatio,
                      width: isReelsFormat ? "200px" : "250px",
                      height: "auto",
                      objectFit: "cover"
                    }}
                  />
                  <div className={`absolute bottom-2 left-2 right-2 ${getCardStyle(title).bg} rounded-lg p-2`}>
                    <p className={`text-xs font-display ${getCardStyle(title).text} text-center`}>
                      {title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Informações do slide */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {currentIndex + 1} de {media.length}
          </p>
          <p className="text-base font-medium text-gray-900">
            {currentMedia.alt || `${title} - Material ${currentIndex + 1}`}
          </p>
        </div>
        
        {/* Indicadores */}
        {media.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
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
      </div>

      {/* Modal para vídeos */}
      <AnimatePresence>
        {selectedIndex !== null && isVideo(media[selectedIndex].src) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                aria-label="Fechar modal"
              >
                <X className="w-8 h-8" />
              </button>
              
              {media.length > 1 && (
                <>
                  <button
                    onClick={prevModal}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  
                  <button
                    onClick={nextModal}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    aria-label="Próximo"
                  >
                    →
                  </button>
                </>
              )}

              <video
                src={media[selectedIndex].src}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                controls
                autoPlay={isPlaying}
                poster={media[selectedIndex].poster}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedIndex + 1} de {media.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}