"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAttribution } from "@/lib/attribution";

/**
 * Tracking de route change global (App Router faz navegação SPA, então o
 * pageview do load inicial não cobre as navegações seguintes).
 *
 * - GA4: dispara um `page_view` em cada mudança de rota (gtag só configura no
 *   primeiro load). Sem isso, o GA só veria a landing page de cada sessão.
 * - PostHog: o $pageview de history-change já é automático; aqui só garantimos
 *   que a atribuição (UTM/referrer/canal) esteja carregada antes do primeiro
 *   pageview, e ignoramos o duplo-disparo do load inicial pro GA.
 *
 * Montado uma vez no layout → cobre o site inteiro.
 */
export function AnalyticsRouter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    // Garante que a origem de tráfego está capturada antes de qualquer evento.
    getAttribution();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");

    // GA4: o snippet base já dispara o page_view do primeiro load via
    // gtag('config'). Só mandamos manualmente a partir da 2ª rota pra não
    // duplicar.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    // PostHog $pageview de SPA é automático (capture_pageview history_change),
    // não precisa disparo manual aqui.
  }, [pathname, searchParams]);

  return null;
}
