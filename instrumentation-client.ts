import posthog from "posthog-js";
import { initAttribution } from "@/lib/attribution";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    // Pageviews de SPA: o defaults já liga capture_pageview por history API,
    // deixamos explícito pra garantir $pageview em cada route change + $pageleave.
    capture_pageview: "history_change",
    capture_pageleave: true,
    autocapture: true,
    // DADOS DE ACESSO + CLIQUE + REPLAY:
    // - autocapture = todo clique/submit automático (aba Activity / Web Analytics)
    // - heatmaps = mapa de clique/scroll (aba Heatmaps)
    // - dead clicks = cliques mortos / rage clicks
    // - exceptions = erros de JS (aba Error tracking)
    // - web_vitals = performance real
    capture_exceptions: true,
    capture_dead_clicks: true,
    capture_heatmaps: true,
    capture_performance: { web_vitals: true, network_timing: false },
    // perfil rico até pra visitante anônimo (origem/UTM/device em todo evento)
    person_profiles: "always",
    // Session replay consolidado no PostHog (17/07): removemos o Clarity e passamos
    // a gravar sessão aqui, amarrada aos eventos de lead/funil. Máscara de inputs
    // ligada por LGPD (os forms coletam email/nome) — grava a interação e o
    // drop-off do form sem capturar o conteúdo digitado.
    disable_session_recording: false,
    session_recording: { maskAllInputs: true },
    disable_surveys: true,
    persistence: "localStorage+cookie",
    debug: process.env.NODE_ENV === "development",
    loaded: (ph) => {
      ph.register({ site: "kaleidos" });
      // Captura origem de tráfego (UTM/referrer/canal) e registra como
      // super-property + person property — todo evento carrega a origem.
      initAttribution();
    },
  });
} else if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.warn(
    "[analytics] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ausente — PostHog desabilitado."
  );
}
