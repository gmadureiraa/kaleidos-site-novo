"use client";

import Script from "next/script";

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'client_type',
              'custom_parameter_2': 'service_type'
            }
          });
        `}
      </Script>
    </>
  );
}

// Hook para tracking de eventos customizados
export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
        page_path: url,
      });
    }
  };

  const trackConversion = (conversionId: string, conversionLabel: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}/${conversionId}/${conversionLabel}`,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  };
}

// Declaração global para TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
} 