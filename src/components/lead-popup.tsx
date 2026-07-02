"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, X, Check } from "lucide-react";
import { motion } from "framer-motion";
import { getLeadMetadata } from "@/lib/lead-meta";
import { track } from "@/lib/analytics";

// Popup de captura de email — NÃO intrusivo:
// - aparece SÓ em páginas de post do blog (/blog/<slug>), nunca na home/resto do site
// - 1x por sessão, por scroll (~45%) OU exit-intent (desktop)
// - fechável (X / ESC / clique no backdrop), nunca obrigatório
// - respeita "não mostrar de novo" via localStorage por DISMISS_DAYS
// - some pra sempre depois que a pessoa assina
// - inscrição GENÉRICA nos papers/newsletter (o guia específico fica só no gate, pra quem clica nele)

const DISMISS_KEY = "kld_popup_dismissed_at";
const SUBSCRIBED_KEY = "kld_popup_subscribed";
const SESSION_KEY = "kld_popup_seen_session";
const DISMISS_DAYS = 14;
const SCROLL_TRIGGER = 0.45;

const PINK = "#D262B2";

function recentlyDismissed(): boolean {
  try {
    if (localStorage.getItem(SUBSCRIBED_KEY) === "1") return true;
    const at = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (!at) return false;
    const ageDays = (Date.now() - at) / (1000 * 60 * 60 * 24);
    return ageDays < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const armed = useRef(false);

  // Só em páginas de POST do blog (/blog/<slug>). /blog (índice) e home ficam de fora.
  const onBlogPost = pathname?.startsWith("/blog/") ?? false;

  useEffect(() => {
    if (!onBlogPost) return;
    if (typeof window === "undefined") return;
    if (recentlyDismissed()) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {}

    armed.current = true;

    const trigger = () => {
      if (!armed.current) return;
      armed.current = false;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) trigger();
    };

    const onMouseOut = (e: MouseEvent) => {
      // exit-intent: mouse sai pela borda de cima (desktop)
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    // delay pequeno pra não disparar em rage-scroll inicial
    const t = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseout", onMouseOut);
    }, 4000);

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [onBlogPost, pathname]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _hp: hp,
          metadata: getLeadMetadata("popup"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro");
      track("lead_captured", { source: "popup", path: pathname });
      setStatus("success");
      setMsg("Pronto. Você vai receber os próximos estudos no seu email.");
      try {
        localStorage.setItem(SUBSCRIBED_KEY, "1");
      } catch {}
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erro. Tente de novo.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Receba os estudos da Kaleidos"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* backdrop */}
      <motion.button
        aria-label="Fechar"
        onClick={dismiss}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[440px] rounded-3xl bg-[#F5F1E8] border border-black/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden"
      >
        {/* halftone rosa no topo */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-60"
          style={{
            backgroundImage: `radial-gradient(${PINK}55 1.5px, transparent 1.6px)`,
            backgroundSize: "12px 12px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />

        <button
          onClick={dismiss}
          aria-label="Fechar"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 inline-flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-7 sm:p-8">
          {status === "success" ? (
            <div className="py-4">
              <p className="inline-flex items-center gap-2 font-semibold text-[#3d9e32] text-sm mb-2">
                <Check className="w-4 h-4" /> Inscrição feita
              </p>
              <h2 className="font-display font-bold text-[1.55rem] leading-tight text-gray-900 mb-2">
                {msg}
              </h2>
              <p className="text-[13.5px] text-gray-600 leading-relaxed mb-5">
                Dá uma olhada na caixa de entrada (e no spam, só por garantia).
              </p>
              <button
                onClick={dismiss}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-black transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <p
                className="font-mono uppercase tracking-[0.16em] text-[11px] mb-3"
                style={{ color: PINK }}
              >
                Kaleidos Papers · grátis
              </p>
              <h2 className="font-display font-bold text-[1.6rem] sm:text-[1.75rem] leading-[1.08] tracking-[-0.02em] text-gray-900 mb-2.5">
                Os estudos de marketing cripto que a Kaleidos não vende.
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                Deixe seu email e receba os próximos papers e análises de marketing cripto da
                Kaleidos em primeira mão. Sem spam, cancela quando quiser.
              </p>

              <form onSubmit={submit} className="flex flex-col gap-2.5">
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <input
                    name="_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 transition-all text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: "#0A0A0A" }}
                >
                  {status === "loading" ? "Enviando..." : "Quero receber"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2.5 text-[12px] text-red-500">{msg}</p>
              )}

              <button
                onClick={dismiss}
                className="mt-3.5 w-full text-center text-[12.5px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                Agora não, obrigado
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
