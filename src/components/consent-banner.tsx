"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";

/**
 * Banner de consentimento LGPD.
 *
 * O PostHog (replay + person profiles + autocapture) é inicializado no
 * instrumentation-client.ts; aqui a gente NÃO mexe na inicialização — o banner
 * atua em runtime sobre a instância já carregada:
 *   - Recusar → posthog.opt_out_capturing() + para o session recording.
 *   - Aceitar → posthog.opt_in_capturing() (comportamento padrão).
 * A escolha persiste em localStorage ("kal-consent") e é reaplicada em todo
 * page load (o opt-out do posthog-js também persiste sozinho, mas reaplicar é
 * barato e cobre limpeza parcial de storage).
 */

const STORAGE_KEY = "kal-consent";

type Consent = "accepted" | "declined";

function applyConsent(consent: Consent) {
  try {
    // posthog pode não ter inicializado (token ausente / bloqueador). Toda
    // chamada é defensiva pra nunca quebrar a página por causa de analytics.
    if (!posthog || typeof posthog.opt_in_capturing !== "function") return;
    if (consent === "declined") {
      posthog.opt_out_capturing();
      // Para a gravação de sessão se a API existir nesta versão do posthog-js.
      posthog.stopSessionRecording?.();
    } else {
      posthog.opt_in_capturing();
    }
  } catch {
    // analytics nunca derruba a UI
  }
}

export function ConsentBanner() {
  // null = ainda não hidratou / não leu o storage; evita flash no SSR.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage indisponível (modo privado etc.) → mostra o banner mesmo assim
    }
    if (stored === "accepted" || stored === "declined") {
      applyConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  const decide = (consent: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      // sem storage a escolha vale só pra esta sessão — ainda aplicamos
    }
    applyConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      className="fixed bottom-4 left-4 right-4 z-[210] mx-auto max-w-xl rounded-xl border border-white/10 bg-neutral-900/95 p-4 text-neutral-100 shadow-2xl backdrop-blur sm:left-auto sm:right-6 sm:bottom-6 sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-neutral-300">
        Usamos cookies e ferramentas de análise (incluindo gravação de sessão)
        para melhorar sua experiência e medir nosso marketing. Você pode
        recusar sem perder acesso ao site. Saiba mais na nossa{" "}
        {/* ⚠️ 19/08/2026 — <a href> numa rota interna: quebrava o lint
            (@next/next/no-html-link-for-pages) e recarregava o site inteiro
            no meio do consentimento. Virou <Link>. */}
        <Link
          href="/privacidade"
          className="underline underline-offset-2 hover:text-white"
        >
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => decide("declined")}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
