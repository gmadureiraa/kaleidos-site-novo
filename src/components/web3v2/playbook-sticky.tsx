"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { OPEN_PLAYBOOK_EVENT } from "@/components/web3v2/playbook-popup";
import { track } from "@/lib/analytics";

// Card FIXO (sticky) do Playbook "Marketing Cripto em 2026" — padrão Lunar
// Strategy: aparece no canto inferior esquerdo e FICA fixado na página até a
// pessoa fechar. EXCLUSIVO da rota `/2`.
//
// - aparece depois de um pequeno delay (não dispara na hora pra não atrapalhar)
// - quem já desbloqueou (localStorage) ou já fechou nunca mais vê (por N dias)
// - "Baixar grátis" abre o popup de captura (Web3V2PlaybookPopup) via custom event
// - X fecha e marca dispensado

const GREEN = "#7CF067";
const PINK = "#D262B2";
const INK = "#14110D";

const DISMISS_KEY = "kld_playbook_sticky_dismissed_at";
const UNLOCKED_KEY = "kld_papers_unlocked";
const DISMISS_DAYS = 30;

function shouldHide(): boolean {
  try {
    if (localStorage.getItem(UNLOCKED_KEY) === "1") return true;
    const at = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (!at) return false;
    return (Date.now() - at) / (1000 * 60 * 60 * 24) < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function Web3V2PlaybookSticky() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldHide()) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  function openPopup(trigger: "cover" | "button" = "button") {
    if (typeof window === "undefined") return;
    // Topo do funil do lead magnet: mede open → lead_captured (conversão).
    track("playbook_popup_opened", { location: "home:sticky", trigger });
    window.dispatchEvent(new CustomEvent(OPEN_PLAYBOOK_EVENT));
  }

  function dismiss() {
    setClosing(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setTimeout(() => setVisible(false), 260);
  }

  if (!visible) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes kldStickyIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes kldStickyOut{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(24px) scale(.96)}}
.kld-sticky{position:fixed;right:24px;bottom:24px;z-index:200;width:230px;background:#fff;border:1.5px solid ${INK};border-radius:18px;box-shadow:8px 8px 0 ${GREEN}, 0 18px 40px -18px rgba(0,0,0,.5);overflow:hidden;animation:kldStickyIn .42s cubic-bezier(.22,1,.36,1) both;font-family:'Plus Jakarta Sans',Inter,sans-serif;}
.kld-sticky.is-closing{animation:kldStickyOut .26s ease-in both;}
.kld-sticky-x{position:absolute;top:8px;right:8px;z-index:2;width:26px;height:26px;border-radius:999px;border:1.5px solid ${INK};background:#fff;color:${INK};font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;}
.kld-sticky-x:hover{background:${INK};color:#fff;}
.kld-sticky-cover{display:block;width:100%;height:150px;object-fit:cover;object-position:center 52%;border-bottom:1.5px solid ${INK};cursor:pointer;}
.kld-sticky-body{padding:14px 16px 16px;}
.kld-sticky-badge{display:inline-block;font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#3a0a2c;background:${PINK};border:1.5px solid ${INK};border-radius:6px;padding:3px 8px;font-weight:700;}
.kld-sticky-title{margin:9px 0 12px;font-family:Atelier,sans-serif;font-weight:700;font-size:18px;line-height:1.12;letter-spacing:-.4px;color:${INK};}
.kld-sticky-btn{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${INK};color:#fff;border:1.5px solid ${INK};border-radius:11px;box-shadow:3px 3px 0 ${GREEN};padding:11px 16px;font-weight:800;font-size:14px;font-family:Atelier,sans-serif;cursor:pointer;transition:transform .18s cubic-bezier(.22,1,.36,1),box-shadow .18s;}
.kld-sticky-btn:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 ${GREEN};}
@media (max-width:600px){
  .kld-sticky{right:12px;left:auto;bottom:12px;width:180px;}
  .kld-sticky-cover{height:120px;}
  .kld-sticky-body{padding:9px 11px 11px;}
  .kld-sticky-badge{font-size:8px;letter-spacing:.5px;padding:2px 6px;}
  .kld-sticky-title{font-size:12.5px;margin:6px 0 9px;}
  .kld-sticky-btn{font-size:12px;padding:8px 10px;border-radius:9px;gap:5px;}
  .kld-sticky-x{width:22px;height:22px;font-size:12px;top:6px;right:6px;}
}
@media (prefers-reduced-motion:reduce){.kld-sticky{animation:none;}.kld-sticky.is-closing{animation:none;}}
`,
        }}
      />
      <aside
        className={`kld-sticky${closing ? " is-closing" : ""}`}
        aria-label="Playbook grátis: Marketing Cripto em 2026"
      >
        <button type="button" className="kld-sticky-x" onClick={dismiss} aria-label="Fechar">
          ✕
        </button>
        <Image
          src="/papers/cover-playbook.webp"
          alt="Capa do playbook Marketing Cripto em 2026"
          width={842}
          height={1123}
          sizes="(max-width: 600px) 180px, 230px"
          className="kld-sticky-cover"
          onClick={() => openPopup("cover")}
        />
        <div className="kld-sticky-body">
          <span className="kld-sticky-badge">Estratégias para marketing cripto</span>
          <h3 className="kld-sticky-title">Marketing Cripto em 2026</h3>
          <button type="button" className="kld-sticky-btn" onClick={() => openPopup("button")}>
            Baixar grátis →
          </button>
        </div>
      </aside>
    </>
  );
}
