"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

/**
 * Embed inline do Calendly + captura do agendamento SEM webhook/plano pago.
 *
 * O widget do Calendly roda num iframe e avisa a página-mãe via postMessage:
 * quando a pessoa confirma o horário, chega `{ event: "calendly.event_scheduled" }`.
 * A gente escuta `message` no window, filtra a origem (calendly.com) e dispara
 * a conversão `meeting_booked` (PostHog + GA4 + Meta Pixel "Schedule") UMA vez
 * por agendamento.
 */
export function AgendarClient() {
  // Guard: rastreia só uma vez por agendamento (o Calendly pode reemitir
  // mensagens em re-render/navegação interna do iframe).
  const bookedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);

  // Init explícito do widget (o auto-init por classe não funciona: a div só
  // monta depois que o widget.js já rodou, no client render do React).
  const initCalendly = () => {
    if (initedRef.current) return;
    const el = containerRef.current;
    if (!el || !window.Calendly?.initInlineWidget) return;
    initedRef.current = true;
    window.Calendly.initInlineWidget({
      url: `${CALENDLY_URL}?hide_gdpr_banner=1`,
      parentElement: el,
    });
  };

  // Fallback: se o script já estava carregado (cache/nav interna), inicializa.
  useEffect(() => {
    if (window.Calendly?.initInlineWidget) initCalendly();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onCalendlyMessage(e: MessageEvent) {
      // Só aceita mensagens vindas do próprio Calendly
      if (
        !/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)
      ) {
        return;
      }
      const data = e.data as
        | {
            event?: string;
            payload?: {
              event?: { uri?: string };
              invitee?: { uri?: string };
            };
          }
        | undefined;
      if (!data || typeof data !== "object") return;
      if (data.event !== "calendly.event_scheduled") return;
      if (bookedRef.current) return;
      bookedRef.current = true;

      // PostHog — evento canônico do funil
      track("meeting_booked", {
        source: "agendar",
        path: "/agendar",
        provider: "calendly",
        calendly_event_uri: data.payload?.event?.uri ?? null,
        calendly_invitee_uri: data.payload?.invitee?.uri ?? null,
      });

      // GA4 — conversão client-side
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "meeting_booked", {
          event_category: "conversion",
          event_label: "calendly_inline",
          provider: "calendly",
          value: 1,
        });
      }

      // Meta Pixel — "Schedule" é o evento padrão da Meta pra agendamento
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Schedule", {
          content_name: "Consultoria gratuita 30min — Kaleidos",
          content_category: "agendar",
        });
      }
    }

    window.addEventListener("message", onCalendlyMessage);
    return () => window.removeEventListener("message", onCalendlyMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Script oficial do embed — no onLoad chamamos initInlineWidget explícito */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initCalendly}
      />

      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a home
          </Link>
        </div>
      </div>

      {/* Copy curta + embed */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-[#7CF067]/15 text-gray-900 text-xs font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6">
              <CalendarDays className="w-3.5 h-3.5" />
              Consultoria gratuita
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Agenda 30 minutos com o time da Kaleidos
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Uma consultoria gratuita de 30 minutos, sem compromisso. A gente
              mapeia seus canais, aponta onde está a oportunidade e você sai com
              próximos passos claros — mesmo que não feche nada com a gente.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              {[
                "30 minutos, direto ao ponto",
                "Sem custo e sem compromisso",
                "Com quem faz, não com vendedor",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#7CF067] flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" strokeWidth={2.5} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Calendly inline — o widget.js encontra a div pela classe e monta
              o iframe usando o data-url. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div
              ref={containerRef}
              style={{ minWidth: "320px", height: "760px" }}
            />
          </motion.div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Não achou horário?{" "}
            <Link
              href="/contato"
              className="text-gray-700 underline hover:text-gray-900"
            >
              Fala com a gente por aqui
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
