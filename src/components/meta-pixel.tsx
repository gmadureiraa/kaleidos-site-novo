/**
 * Meta Pixel — base + helpers de event tracking.
 *
 * Loads via next/script (afterInteractive) só em prod, com NEXT_PUBLIC_META_PIXEL_ID
 * setado. Em dev fica silencioso pra evitar fbq calls aleatórios poluindo o Events
 * Manager da conta de anúncios.
 *
 * Eventos disparados via window.fbq("track", "<EventName>", { ...params }):
 *   - PageView:  automático no load (snippet base)
 *   - Lead:      form submit do diagnóstico (FinalCtaSection /servicos/ia-automacoes-completa)
 *   - InitiateCheckout: cliente clica "Falar no WhatsApp" (intenção forte)
 *
 * Pra adicionar eventos custom, basta chamar trackPixelEvent("CustomName", { ... })
 * de qualquer client component.
 */

"use client";

import Script from "next/script";

export function MetaPixel({ pixelId }: { pixelId: string }) {
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/** Helper pra disparar eventos do Pixel a partir de client components. */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;
  if (params) {
    fbq("track", eventName, params);
  } else {
    fbq("track", eventName);
  }
}
