"use client";

/**
 * Botão flutuante de WhatsApp, site-wide (montado no layout raiz).
 *
 * Objetivo (pedido do Gabriel): uma chamada SEMPRE visível pra pessoa ir
 * conversar no nosso WhatsApp em qualquer página. Não é bot: é só o CTA
 * persistente que puxa o lead pra conversa real.
 *
 * Posição bottom-right (convencional). O card sticky do Playbook foi movido pra
 * bottom-left pra não colidir. z-index abaixo de popups/modais (200+).
 * Acessível (aria-label, alvo >=56px), respeita prefers-reduced-motion.
 */

import { useState } from "react";

const WHATSAPP_NUMBER = "5512997796835";
const PREFILL =
  "Oi! Vim do site da Kaleidos e quero conversar sobre marketing pro meu projeto.";
const HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

export function FloatingWhatsApp() {
  const [hover, setHover] = useState(false);

  function track() {
    try {
      // posthog global (carregado pelo attribution/instrumentation). Opcional.
      (window as unknown as { posthog?: { capture?: (e: string, p?: unknown) => void } })
        .posthog?.capture?.("whatsapp_float_click", { path: window.location.pathname });
    } catch {
      /* no-op */
    }
  }

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={track}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Falar com a Kaleidos no WhatsApp"
      data-cta="whatsapp-float"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: 190,
        display: "inline-flex",
        alignItems: "center",
        gap: hover ? "10px" : "0",
        height: "56px",
        padding: hover ? "0 22px 0 16px" : "0",
        width: hover ? "auto" : "56px",
        justifyContent: "center",
        background: "#25D366",
        color: "#0A0A0A",
        borderRadius: "999px",
        boxShadow: "0 10px 30px -8px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.2)",
        textDecoration: "none",
        fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
        fontWeight: 700,
        fontSize: "15px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        transition:
          "width .28s cubic-bezier(.22,1,.36,1), padding .28s cubic-bezier(.22,1,.36,1), gap .28s cubic-bezier(.22,1,.36,1), transform .18s ease",
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#0A0A0A"
        aria-hidden="true"
        style={{ flex: "none" }}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.005c6.585 0 11.946-5.357 11.949-11.945a11.9 11.9 0 00-3.479-8.408" />
      </svg>
      {hover && <span>Fala com a gente</span>}
    </a>
  );
}
