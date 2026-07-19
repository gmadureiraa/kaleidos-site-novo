"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Instrumentação dos CTAs da rota `/2`.
 *
 * Os CTAs do hero/problema/etc. são injetados via `dangerouslySetInnerHTML`
 * (strings de HTML em `sections.tsx`), então não dá pra passar `onClick` em
 * React. Usamos um listener delegado no wrapper `.kv2` que detecta clicks em
 * links de WhatsApp (`wa.me`) e Calendly e dispara eventos NOMEADOS no PostHog
 * (`whatsapp_click` / `cta_clicked`) — em vez de depender só do autocapture
 * genérico, que não distingue esses CTAs nos funis.
 *
 * Renderiza `null`. Montar uma vez dentro do `<main class="kv2">` do `/2`.
 */
export function Web3V2CtaTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector<HTMLElement>(".kv2");
    if (!root) return;

    function findCtaLabel(el: HTMLElement): string {
      const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
      return txt.slice(0, 80) || "(sem texto)";
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a");
      if (!link) return;

      const href = (link.getAttribute("href") || "").toLowerCase();
      const label = findCtaLabel(link);
      // Em qual seção o CTA está (data-section opcional; senão o id da <section>).
      const section =
        link.closest<HTMLElement>("[data-section]")?.dataset.section ||
        link.closest("section")?.id ||
        "home_v2";
      const location = `home_v2:${section}`;

      if (href.includes("wa.me") || href.includes("whatsapp")) {
        // `whatsapp_click` agora sai do ConversionTracking GLOBAL (layout) —
        // aqui fica só o cta_clicked com contexto de seção da home.
        track("cta_clicked", { location, cta_type: "whatsapp", label });
      } else if (href.includes("calendly") || href.includes("/agendar")) {
        // /agendar = rota interna que embeda o Calendly com tracking de conversão.
        track("cta_clicked", { location, cta_type: "calendly", label });
      }
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}
