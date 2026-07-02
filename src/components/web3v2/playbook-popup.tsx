"use client";

import { useEffect, useRef, useState } from "react";
import { EbookPopup } from "@/components/papers/ebook-popup";

// Popup do Playbook "Marketing Cripto em 2026" EXCLUSIVO da rota `/2`.
//
// Reaproveita o `EbookPopup` (capa grande estilo Lunar + entrega do PDF via
// /api/newsletter/subscribe) e só adiciona o GATILHO não-intrusivo:
//  - abre 1x por sessão, por scroll (~50%) OU exit-intent (desktop)
//  - quem já desbloqueou (localStorage) ou já dispensou nunca mais vê
//  - dá pra abrir também por clique num CTA da página, via custom event
//    `open-playbook-popup` (window.dispatchEvent(...))
//  - fecha por X / ESC / clique no backdrop (herdado do EbookPopup)
//
// Tracking `lead_captured` (source=playbook-popup-v2) sai do próprio EbookPopup.

const DISMISS_KEY = "kld_playbook_v2_dismissed_at";
const UNLOCKED_KEY = "kld_papers_unlocked";
const SESSION_KEY = "kld_playbook_v2_seen_session";
const DISMISS_DAYS = 14;
const SCROLL_TRIGGER = 0.5;

// evento público pra abrir o popup a partir de um botão/CTA da página
export const OPEN_PLAYBOOK_EVENT = "open-playbook-popup";

function recentlyDismissed(): boolean {
  try {
    if (localStorage.getItem(UNLOCKED_KEY) === "1") return true;
    const at = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (!at) return false;
    const ageDays = (Date.now() - at) / (1000 * 60 * 60 * 24);
    return ageDays < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function Web3V2PlaybookPopup() {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);

  // Gatilho automático DESATIVADO: o card fixo (Web3V2PlaybookSticky) virou o
  // prompt persistente (padrão Lunar). O popup agora só abre por CTA explícito
  // (card fixo / botões da página), sem surpresa por scroll/exit-intent.
  const AUTO_TRIGGER = false;

  // Gatilho automático: scroll ~50% OU exit-intent, 1x por sessão.
  useEffect(() => {
    if (!AUTO_TRIGGER) return;
    if (typeof window === "undefined") return;
    if (recentlyDismissed()) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {}

    armed.current = true;

    const trigger = () => {
      if (!armed.current) return;
      armed.current = false;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) trigger();
    };

    const onMouseOut = (e: MouseEvent) => {
      // exit-intent: ponteiro sai pela borda de cima (desktop)
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    // pequeno delay pra não disparar em rage-scroll inicial
    const t = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseout", onMouseOut);
    }, 4000);

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, []);

  // Abertura manual via CTA (custom event). Sempre abre, mesmo se já dispensou.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOpen = () => {
      armed.current = false;
      setOpen(true);
    };
    window.addEventListener(OPEN_PLAYBOOK_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PLAYBOOK_EVENT, onOpen);
  }, []);

  function handleClose() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  }

  return (
    <EbookPopup open={open} onClose={handleClose} source="playbook-popup-v2" />
  );
}
