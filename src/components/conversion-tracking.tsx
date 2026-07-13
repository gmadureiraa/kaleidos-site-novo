"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Tracking GLOBAL de conversão (montado no layout, vale pro site inteiro).
 *
 * Listener delegado em fase de captura que detecta clique em QUALQUER link de:
 *  - WhatsApp (wa.me / api.whatsapp.com)  → `whatsapp_click`
 *  - Calendly                              → `call_click`
 *  - PDF de paper (/papers/*.pdf)          → `playbook_download` (method: pdf_click)
 *
 * Cobre navbar, footer, cta-strategy, services-list, pacotes, cases, papers —
 * sem precisar instrumentar componente por componente. Handlers locais que já
 * emitem `cta_clicked` continuam valendo (nomes de evento diferentes, sem
 * dupla contagem). O único emissor duplicado de `whatsapp_click` era o
 * cta-tracking da home v2, que foi ajustado pra emitir só `cta_clicked`.
 *
 * Exceção: botões que usam window.open (form do /contato) não passam por
 * âncora — esses têm tracking próprio no componente.
 */
export function ConversionTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const link = target.closest("a");
      if (!link) return;

      const href = (link.getAttribute("href") || "").toLowerCase();
      if (!href) return;

      const label =
        (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) ||
        link.getAttribute("aria-label") ||
        "(sem texto)";
      const section =
        link.closest<HTMLElement>("[data-section]")?.dataset.section ||
        link.closest("section")?.id ||
        "";
      const path = window.location.pathname;
      const location = section ? `${path}#${section}` : path;

      if (
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com") ||
        href.startsWith("whatsapp:")
      ) {
        track("whatsapp_click", { path, location, label });
      } else if (href.includes("calendly.com")) {
        track("call_click", { path, location, label, provider: "calendly" });
      } else if (href.includes(".pdf") && href.includes("/papers/")) {
        const file = href.split("/").pop() || "";
        const paper_slug = file.replace(/\.pdf.*$/, "");
        track("playbook_download", { paper_slug, method: "pdf_click", path, location });
      }
    }

    // capture=true: garante o evento antes da navegação/target=_blank
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
