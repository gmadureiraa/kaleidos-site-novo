"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Instrumentação dos CTAs da página `/pacotes`.
 *
 * Todos os CTAs da página levam ao MESMO destino (Calendly) — 1 ação primária
 * (achado da auditoria revenue-centric: consolidar CTA). Cada botão carrega um
 * `data-cta` (pacotes-hero / pacotes-tier-<nome> / pacotes-final) pra distinguir
 * QUAL bloco converteu no funil do PostHog. Listener delegado no `.kpac`.
 *
 * Renderiza `null`.
 */
export function PacotesCtaTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector<HTMLElement>(".kpac");
    if (!root) return;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a");
      if (!link) return;

      const href = (link.getAttribute("href") || "").toLowerCase();
      if (!href.includes("calendly")) return;

      const ctaId = link.getAttribute("data-cta") || "pacotes";
      const label = (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);

      track("cta_clicked", {
        location: `pacotes:${ctaId}`,
        cta_type: "calendly",
        context: "pacotes",
        label,
      });
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}
