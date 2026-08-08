"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { OPEN_PLAYBOOK_EVENT } from "@/components/web3v2/playbook-popup";
import { track } from "@/lib/analytics";

// Card FIXO (sticky) do Playbook "Marketing Cripto em 2026" — padrão Lunar
// Strategy: aparece no canto inferior DIREITO e FICA fixado na página até a
// pessoa fechar. É o ÚNICO prompt de captura da home (/): não há mais popup
// central — ver lead-popup.tsx (desativado na home).
//
// - aparece só depois de ~50% de scroll OU exit-intent (CRO 2026-07: o timer
//   de 1,5s disputava atenção com o CTA principal acima da dobra)
// - quem já desbloqueou (localStorage) ou já fechou nunca mais vê (por N dias)
// - "Baixar grátis" abre o popup de captura (Web3V2PlaybookPopup) via custom event
// - X fecha e marca dispensado

const GREEN = "#7CF067";
const PINK = "#D262B2";
const INK = "#14110D";

const DISMISS_KEY = "kld_playbook_sticky_dismissed_at";
const UNLOCKED_KEY = "kld_papers_unlocked";
const DISMISS_DAYS = 30;
/** Fração da página rolada que libera o sticky (~50%). */
const SCROLL_TRIGGER = 0.5;

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

    // Gatilho: ~50% de scroll OU exit-intent (mouse saindo pelo topo).
    // Antes era um timer de 1,5s que competia com o CTA do hero.
    let done = false;

    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    const pastHalf = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Página curta demais pra rolar: não segura o sticky pra sempre.
      if (scrollable <= 0) return true;
      return window.scrollY / scrollable >= SCROLL_TRIGGER;
    };

    const onScroll = () => {
      if (pastHalf()) show();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    // Reload no meio da página (scroll restoration) já conta como 50%.
    if (pastHalf()) {
      show();
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
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
.kld-sticky{position:fixed;right:24px;bottom:24px;z-index:200;width:230px;background:#fff;border:1.5px solid ${INK};border-radius:18px;box-shadow:-8px 8px 0 ${GREEN}, 0 18px 40px -18px rgba(0,0,0,.5);overflow:hidden;animation:kldStickyIn .42s cubic-bezier(.22,1,.36,1) both;font-family:'Plus Jakarta Sans',Inter,sans-serif;}
.kld-sticky.is-closing{animation:kldStickyOut .26s ease-in both;}
.kld-sticky-x{position:absolute;top:8px;right:8px;z-index:2;width:26px;height:26px;border-radius:999px;border:1.5px solid ${INK};background:#fff;color:${INK};font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;}
.kld-sticky-x:hover{background:${INK};color:#fff;}
/* A capa é 2:3 — mostra ela INTEIRA (o título do playbook já está na arte).
   Recortar em altura fixa comia justamente o letreiro e os ícones do topo. */
.kld-sticky-cover{display:block;width:100%;height:auto;aspect-ratio:840/1260;object-fit:contain;border-bottom:1.5px solid ${INK};cursor:pointer;}
.kld-sticky-body{padding:12px 14px 14px;}
.kld-sticky-badge{display:inline-block;font-family:Gridlite,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#3a0a2c;background:${PINK};border:1.5px solid ${INK};border-radius:6px;padding:3px 8px;font-weight:700;white-space:nowrap;}
.kld-sticky-btn{width:100%;margin-top:10px;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${INK};color:#fff;border:1.5px solid ${INK};border-radius:11px;box-shadow:3px 3px 0 ${GREEN};padding:11px 16px;font-weight:800;font-size:14px;font-family:Atelier,sans-serif;cursor:pointer;transition:transform .18s cubic-bezier(.22,1,.36,1),box-shadow .18s;}
.kld-sticky-btn:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 ${GREEN};}
/* MOBILE: o card com a capa 2:3 cobria o CTA ("Agendar reunião"/"Prefere
   WhatsApp") e metade do FAQ (~55%×60% do viewport). Vira uma pílula
   compacta só com "Playbook grátis →" + X, ancorada no canto. */
@media (max-width:600px){
  .kld-sticky{right:12px;left:auto;bottom:12px;width:auto;border-radius:999px;box-shadow:-4px 4px 0 ${GREEN}, 0 12px 28px -14px rgba(0,0,0,.5);}
  .kld-sticky-cover{display:none;}
  .kld-sticky-body{padding:5px 42px 5px 6px;display:flex;align-items:center;}
  .kld-sticky-badge{display:none;}
  .kld-sticky-btn{width:auto;margin-top:0;font-size:13px;padding:9px 14px;border-radius:999px;gap:5px;white-space:nowrap;box-shadow:none;}
  .kld-sticky-btn:hover{transform:none;box-shadow:none;}
  .kld-sticky-x{width:24px;height:24px;font-size:12px;top:50%;right:8px;transform:translateY(-50%);}
  .kld-sticky .kld-sticky-btn-long{display:none;}
  .kld-sticky .kld-sticky-btn-short{display:inline;}
}
@media (min-width:601px){
  .kld-sticky .kld-sticky-btn-short{display:none;}
}
/* telas baixas: o card inteiro (capa 2:3 + corpo) não pode passar da viewport */
@media (max-height:720px){ .kld-sticky{width:170px;} }
@media (prefers-reduced-motion:reduce){.kld-sticky{animation:none;}.kld-sticky.is-closing{animation:none;}}
`,
        }}
      />
      <aside
        className={`kld-sticky${closing ? " is-closing" : ""}`}
        aria-label="Playbook grátis: Marketing e vendas no bear market"
      >
        <button type="button" className="kld-sticky-x" onClick={dismiss} aria-label="Fechar">
          ✕
        </button>
        <Image
          src="/papers/cover-bear-market-v4.webp"
          alt="Capa do playbook Como fazer marketing e vender no bear market"
          width={840}
          height={1260}
          sizes="(max-width: 600px) 180px, 230px"
          className="kld-sticky-cover"
          onClick={() => openPopup("cover")}
        />
        <div className="kld-sticky-body">
          {/* Sem <h3>: o título do playbook já está escrito na capa. */}
          <span className="kld-sticky-badge">Playbook grátis</span>
          <button type="button" className="kld-sticky-btn" onClick={() => openPopup("button")}>
            {/* Mobile mostra "Playbook grátis" porque a capa e o badge somem
                na pílula compacta — sem eles, "Baixar grátis" perde o contexto. */}
            <span className="kld-sticky-btn-long">Baixar grátis →</span>
            <span className="kld-sticky-btn-short">Playbook grátis →</span>
          </button>
        </div>
      </aside>
    </>
  );
}
