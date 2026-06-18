"use client";

import { useEffect } from "react";

export function useSmoothScroll() {
  // Âncoras internas agora são tratadas pelo SmoothScrollProvider (Lenis).
  // Mantido como no-op pra não duplicar handlers de clique.
  useEffect(() => {}, []);
}

// Hook para scroll suave programático
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Usa o Lenis (momentum) quando disponível; senão, fallback nativo.
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(element, { offset: -offset });
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Hook para scroll suave com offset para navbar fixa
export function scrollToSection(elementId: string) {
  const navbarHeight = 64; // Altura da navbar
  scrollToElement(elementId, navbarHeight);
}
