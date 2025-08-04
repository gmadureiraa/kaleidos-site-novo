"use client";

import { useState, useEffect } from 'react';

interface AnimationPreferences {
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLowEndDevice: boolean;
}

export function useAnimationOptimization() {
  const [preferences, setPreferences] = useState<AnimationPreferences>({
    prefersReducedMotion: false,
    isMobile: false,
    isLowEndDevice: false,
  });

  useEffect(() => {
    // Detectar preferência de movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Detectar se é mobile
    const isMobile = window.innerWidth < 768;

    // Detectar dispositivo de baixo desempenho (heurística simples)
          const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 4 || // 4 cores ou menos
        (deviceMemory ? deviceMemory <= 4 : false); // 4GB RAM ou menos

    setPreferences({
      prefersReducedMotion,
      isMobile,
      isLowEndDevice,
    });

    // Listener para mudanças na preferência de movimento
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Função para obter configurações de animação otimizadas
  const getOptimizedAnimation = (defaultConfig: Record<string, unknown>, reducedConfig?: Record<string, unknown>) => {
    if (preferences.prefersReducedMotion) {
      return reducedConfig || { duration: 0 };
    }

    if (preferences.isLowEndDevice || preferences.isMobile) {
      return {
        ...defaultConfig,
        duration: (defaultConfig.duration as number) * 0.7, // Reduzir duração
        ease: "easeOut", // Easing mais simples
      };
    }

    return defaultConfig;
  };

  // Função para verificar se deve animar
  const shouldAnimate = () => {
    return !preferences.prefersReducedMotion;
  };

  // Função para obter configurações de spring otimizadas
  const getOptimizedSpring = (defaultStiffness = 100, defaultDamping = 10) => {
    if (preferences.prefersReducedMotion) {
      return { stiffness: 0, damping: 0 };
    }

    if (preferences.isLowEndDevice || preferences.isMobile) {
      return {
        stiffness: defaultStiffness * 0.8,
        damping: defaultDamping * 1.2,
      };
    }

    return { stiffness: defaultStiffness, damping: defaultDamping };
  };

  return {
    preferences,
    getOptimizedAnimation,
    shouldAnimate,
    getOptimizedSpring,
  };
} 