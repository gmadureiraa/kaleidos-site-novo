"use client";

import { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: () => void;
}

export function OptimizedVideo({
  src,
  className = "",
  style = {},
  autoPlay = false,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "none",
  poster,
  onLoadStart,
  onCanPlay,
  onError,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoadStart = () => {
    setIsLoaded(false);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    onCanPlay?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={style}
      >
        <span className="text-gray-500 text-sm">Erro ao carregar vídeo</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && isVisible && (
        <div 
          className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
          style={style}
        >
          <span className="text-gray-500 text-sm">Carregando...</span>
        </div>
      )}
      
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          style={style}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
        />
      )}
    </div>
  );
} 