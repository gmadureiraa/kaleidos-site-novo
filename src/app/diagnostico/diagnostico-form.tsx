"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { track, identifyLead } from "@/lib/analytics";
import { getLeadMetadata } from "@/lib/lead-meta";
import { getTrackingIds } from "@/lib/tracking-ids";

/**
 * Form de qualificação de lead em WIZARD (3 passos) — destino do link
 * "diagnóstico" da sequência de email. POSTa pro /api/lead-ia (rota blindada:
 * rate-limit, honeypot, Resend + Neon + CRM KAI + GA4/CAPI server-side), com
 * source "email-diagnostico" e source_detail "/diagnostico".
 *
 * Passo 1 (email) dispara um POST PARCIAL (`partial: true`) que só persiste o
 * lead via upsert — captura mesmo se a pessoa abandonar. Só o submit final do
 * passo 3 enriquece o lead e dispara o Meta Pixel "Lead" (dedupe com CAPI).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DiagnosticoForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    desafio: "",
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  // Honeypot — campo invisível; bots preenchem, humanos não.
  const [hp, setHp] = useState("");
  // Guard: só manda o POST parcial uma vez por email (evita reenvio ao
  // voltar/avançar entre passos).
  const partialSentEmail = useRef<string | null>(null);

  const setField = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const totalSteps = 3;

  /**
   * POST parcial: captura o lead logo no passo 1 (só email + nome derivado).
   * Best-effort e fire-and-forget — não bloqueia o avanço do wizard nem quebra
   * o fluxo se falhar. NÃO dispara Meta Pixel "Lead" (só persistência/PostHog).
   */
  function sendPartialLead() {
    const email = form.email.trim();
    if (!EMAIL_RE.test(email)) return;
    if (partialSentEmail.current === email.toLowerCase()) return;
    partialSentEmail.current = email.toLowerCase();

    const nome =
      form.nome.trim() || email.split("@")[0] || "Lead diagnóstico";
    const tracking = getTrackingIds();

    // Persistência parcial (server-side upsert). Fire-and-forget.
    void fetch("/api/lead-ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        partial: true,
        _hp: hp,
        metadata: getLeadMetadata("email-diagnostico", "/diagnostico"),
        ...tracking,
      }),
    }).catch(() => {
      // Se falhar, tenta de novo no próximo avanço.
      partialSentEmail.current = null;
    });

    // PostHog: lead_submit parcial (distinguível por partial:true) — sem Pixel.
    track("lead_submit", {
      source: "email-diagnostico",
      path: "/diagnostico",
      partial: true,
      step: "partial",
    });
  }

  function goNext() {
    setErrorMsg("");
    if (step === 1) {
      if (!EMAIL_RE.test(form.email.trim())) {
        setErrorMsg("Preencha um email válido pra gente conseguir responder.");
        setState("error");
        return;
      }
      setState("idle");
      sendPartialLead();
      setStep(2);
      return;
    }
    if (step === 2) {
      setState("idle");
      setStep(3);
    }
  }

  function goBack() {
    setErrorMsg("");
    setState("idle");
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No passo final o botão submeter; nos demais, "Continuar" só avança.
    if (step !== totalSteps) {
      goNext();
      return;
    }
    if (state === "sending") return;
    if (!EMAIL_RE.test(form.email.trim())) {
      setErrorMsg("Preencha um email válido pra gente conseguir responder.");
      setState("error");
      setStep(1);
      return;
    }
    setErrorMsg("");
    setState("sending");

    // Rota exige `nome` — se a pessoa pulou o campo (é opcional aqui),
    // derivamos do email pra não perder o lead.
    const nome =
      form.nome.trim() || form.email.trim().split("@")[0] || "Lead diagnóstico";

    try {
      // Mesmo event_id no body (Meta CAPI server-side) e no fbq abaixo —
      // pixel + CAPI deduplicam e o Lead conta 1x.
      const tracking = getTrackingIds();
      const res = await fetch("/api/lead-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email: form.email.trim(),
          empresa: form.empresa.trim(),
          whatsapp: form.whatsapp.trim(),
          gargalo: form.desafio.trim(),
          _hp: hp,
          // source lógico do funil de email + atribuição completa
          // (canal/UTM/first-last touch)
          metadata: getLeadMetadata("email-diagnostico", "/diagnostico"),
          ...tracking,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "send_failed");
      }

      // Funil: lead_submit nomeado + identify (merge da jornada anônima)
      track("lead_submit", {
        source: "email-diagnostico",
        path: "/diagnostico",
        has_whatsapp: Boolean(form.whatsapp.trim()),
        has_empresa: Boolean(form.empresa.trim()),
      });
      identifyLead(form.email, {
        name: form.nome.trim() || null,
        company: form.empresa.trim() || null,
      });
      // Meta Pixel client-side com o MESMO eventID do CAPI (dedupe)
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq(
          "track",
          "Lead",
          {
            content_name: "Diagnóstico gratuito — funil de email",
            content_category: "email-diagnostico",
          },
          { eventID: tracking.event_id }
        );
      }

      setState("ok");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      setErrorMsg(
        msg === "rate_limited"
          ? "Muitas tentativas. Aguarde alguns minutos e tente de novo."
          : "Não conseguimos enviar agora. Tenta de novo em instantes."
      );
      setState("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CF067] focus:ring-2 focus:ring-[#7CF067]/30 outline-none transition text-sm";

  const stepLabel =
    step === 1
      ? "Seu contato"
      : step === 2
        ? "Seu projeto"
        : "Últimos detalhes";

  return (
    <div className="min-h-screen bg-white">
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

      {/* Hero + form */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-[#7CF067]/15 text-gray-900 text-xs font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Diagnóstico gratuito
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Onde o seu marketing está travando?
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Responde as perguntas abaixo em 2 minutos. O time da Kaleidos
              analisa e volta por email com um diagnóstico direto: o que
              destravar primeiro e por quê. Sem compromisso.
            </p>
          </motion.div>

          {state === "ok" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#7CF067]/40 rounded-2xl p-8 text-center shadow-sm"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-12 h-12 text-[#7CF067] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Recebido! Diagnóstico a caminho.
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Uma pessoa do time (não um bot) vai analisar suas respostas e
                responder por email em até 24h úteis.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-5"
              aria-label="Formulário de diagnóstico"
            >
              {/* Indicador de progresso */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-gray-500">
                    {stepLabel}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    Passo {step} de {totalSteps}
                  </span>
                </div>
                <div
                  className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={step}
                  aria-valuemin={1}
                  aria-valuemax={totalSteps}
                >
                  <motion.div
                    className="h-full rounded-full bg-[#7CF067]"
                    initial={false}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Honeypot — escondido, bots tendem a preencher (fica no passo 1) */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Não preencha:
                  <input
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </label>
              </div>

              {/* Passo 1 — contato */}
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email <span className="text-pink-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoFocus
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="voce@empresa.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome{" "}
                      <span className="text-gray-400 text-xs font-normal">
                        (opcional)
                      </span>
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      value={form.nome}
                      onChange={(e) => setField("nome", e.target.value)}
                      placeholder="Como podemos te chamar?"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Passo 2 — projeto + desafio */}
              {step === 2 && (
                <>
                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Qual seu projeto/empresa?
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      autoComplete="organization"
                      autoFocus
                      value={form.empresa}
                      onChange={(e) => setField("empresa", e.target.value)}
                      placeholder="Nome do projeto, protocolo, fintech…"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="desafio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Qual seu maior desafio de marketing hoje?
                    </label>
                    <textarea
                      id="desafio"
                      name="desafio"
                      rows={5}
                      value={form.desafio}
                      onChange={(e) => setField("desafio", e.target.value)}
                      placeholder="Ex: conteúdo não converte, comunidade parada, CAC alto, lançamento chegando e nada pronto…"
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </>
              )}

              {/* Passo 3 — whatsapp + envio final */}
              {step === 3 && (
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    WhatsApp{" "}
                    <span className="text-gray-400 text-xs font-normal">
                      (opcional)
                    </span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    autoFocus
                    value={form.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value)}
                    placeholder="+55 11 90000-0000"
                    className={inputClass}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Se preferir retorno mais rápido, deixa o WhatsApp. Sem
                    spam — é só pra alinhar o diagnóstico.
                  </p>
                </div>
              )}

              {state === "error" && errorMsg && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}

              {/* Navegação */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={state === "sending"}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-gray-300 text-gray-700 px-5 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-60"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors flex-1 sm:flex-none"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex-1 sm:flex-none"
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Quero meu diagnóstico
                      </>
                    )}
                  </button>
                )}

                {step === totalSteps && (
                  <p className="text-xs text-gray-500 sm:ml-2">
                    Ao enviar você concorda em receber nosso retorno por email.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
