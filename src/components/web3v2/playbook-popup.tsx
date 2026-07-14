"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const EbookPopup = dynamic(
  () => import("@/components/papers/ebook-popup").then((m) => m.EbookPopup),
  { ssr: false },
);

// Popup do Playbook bear market — na home web3v2 (sticky + CTAs).
// Reaproveita `EbookPopup` (capa + PDF via /api/newsletter/subscribe).
// Gatilho automático DESATIVADO: só abre por CTA (`OPEN_PLAYBOOK_EVENT`).

const DISMISS_KEY = "kld_playbook_v2_dismissed_at";
const UNLOCKED_KEY = "kld_papers_unlocked";
const SESSION_KEY = "kld_playbook_v2_seen_session";
const DISMISS_DAYS = 14;
const SCROLL_TRIGGER = 0.5;
/** Auto scroll/exit-intent — mantido off; sticky card é o prompt persistente. */
const AUTO_TRIGGER = false;

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
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    const t = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseout", onMouseOut);
    }, 4000);

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, []);

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
