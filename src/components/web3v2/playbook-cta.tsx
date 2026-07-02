"use client";

import { ArrowRight } from "lucide-react";
import { OPEN_PLAYBOOK_EVENT } from "@/components/web3v2/playbook-popup";
import { track } from "@/lib/analytics";

// Botão da seção de recursos do `/2` que abre o popup do Playbook Cripto 2026.
// Dispara o custom event que o `Web3V2PlaybookPopup` escuta — não é intrusivo,
// é o usuário quem clica.
export function Web3V2PlaybookCta({
  label = "Baixar o playbook grátis",
}: {
  label?: string;
}) {
  function open() {
    if (typeof window === "undefined") return;
    track("playbook_popup_opened", { location: "home:resources", trigger: "button" });
    window.dispatchEvent(new CustomEvent(OPEN_PLAYBOOK_EVENT));
  }

  return (
    <button
      type="button"
      onClick={open}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#7CF067",
        color: "#06250a",
        border: "1.5px solid #14110D",
        borderRadius: 12,
        boxShadow: "4px 4px 0 #14110D",
        padding: "12px 18px",
        fontWeight: 800,
        fontSize: 14,
        fontFamily: "Atelier, sans-serif",
        cursor: "pointer",
      }}
    >
      {label}
      <ArrowRight style={{ width: 16, height: 16 }} />
    </button>
  );
}
