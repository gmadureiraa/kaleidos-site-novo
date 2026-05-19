"use client";

import Script from "next/script";
import posthog from "posthog-js";

function phCapture(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, props);
  } catch {
    // no-op
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
            });
          `,
        }}
      />
    </>
  );
}

// Hook para tracking de eventos
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    eventCategory: string,
    eventLabel?: string,
    value?: number
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: value,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: url,
      });
    }
  };

  const trackClick = (elementName: string, location: string) => {
    trackEvent("click", "user_interaction", elementName);
    trackEvent("element_click", location, elementName);
    phCapture("cta_clicked", { element: elementName, location });
  };

  const trackConversion = (conversionType: string, value?: number) => {
    trackEvent("conversion", conversionType, undefined, value);
    phCapture("conversion", { conversion_type: conversionType, value });
  };

  const trackScroll = (percentage: number) => {
    trackEvent("scroll", "engagement", undefined, percentage);
  };

  const trackTimeOnPage = (seconds: number) => {
    trackEvent("time_on_page", "engagement", undefined, seconds);
  };

  const trackWhatsApp = (location: string, context?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      // Evento principal para WhatsApp
      window.gtag("event", "whatsapp_click", {
        event_category: "contact",
        event_label: location,
        value: 1,
        // Parâmetros customizados para GA4
        location: location,
        context: context || "general",
      });

      // Também registrar como conversão
      trackConversion("whatsapp_click", 1);
    }
    phCapture("whatsapp_click", {
      location,
      context: context || "general",
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackConversion,
    trackScroll,
    trackTimeOnPage,
    trackWhatsApp,
  };
}

// Extend Window interface
declare global {
  interface Window {
    gtag: (...args: Array<unknown>) => void;
    dataLayer: Array<unknown>;
  }
}