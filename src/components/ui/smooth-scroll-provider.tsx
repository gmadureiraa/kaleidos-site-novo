"use client";

import { useEffect } from "react";
import type LenisType from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    __lenis?: LenisType;
  }
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Respeita usuários que pedem menos movimento — sem momentum scroll.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.documentElement.style.scrollBehavior = "smooth";
      return;
    }

    // MOBILE/TOUCH: pula o Lenis. Momentum scroll do Lenis é ganho de "feel" só
    // no desktop (wheel); no touch o scroll nativo do iOS/Android já é ótimo e
    // mais leve. Carregar Lenis no mobile só adicionava ~50KB de JS + um RAF
    // loop contínuo competindo pela main-thread — exatamente o que pesa no LCP
    // do Moto G. Detecta touch / largura de tela pequena.
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;
    if (isTouch) {
      document.documentElement.style.scrollBehavior = "smooth";
      return;
    }

    let rafId = 0;
    let lenis: LenisType | null = null;
    let cleanupAnchor: (() => void) | undefined;
    let cancelled = false;

    // Import dinâmico: o chunk do Lenis sai do bundle inicial e só baixa no
    // desktop, depois do paint.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      // Momentum scroll premium (Lenis). scroll-behavior precisa ficar 'auto'
      // pra não brigar com o RAF do Lenis.
      document.documentElement.style.scrollBehavior = "auto";

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      const activeLenis = lenis;
      window.__lenis = activeLenis;

      const raf = (time: number) => {
        activeLenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Âncoras internas (#secao) passam a usar o scroll do Lenis.
      const handleAnchor = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          activeLenis.scrollTo(el as HTMLElement, { offset: -64 });
        }
      };
      document.addEventListener("click", handleAnchor);
      cleanupAnchor = () =>
        document.removeEventListener("click", handleAnchor);
    });

    return () => {
      cancelled = true;
      cleanupAnchor?.();
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
