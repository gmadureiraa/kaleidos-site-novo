"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getLeadMetadata } from "@/lib/lead-meta";
import { track, identifyLead } from "@/lib/analytics";

/**
 * Caixa de captura de lead inserida no meio do artigo.
 * Nao bloqueia a leitura (o conteudo segue abaixo), so converte quem ta engajado.
 */
export function LeadGate({ articleSlug }: { articleSlug?: string }) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

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
          metadata: getLeadMetadata("article-gate", articleSlug),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro");
      track("lead_captured", { source: "blog-article-gate", article_slug: articleSlug });
      track("lead_submit", { source: "blog-article-gate", article_slug: articleSlug });
      identifyLead(email);
      setStatus("success");
      setMsg("Fechou. Os proximos estudos chegam no seu email.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erro ao assinar.");
    }
  }

  return (
    <div className="my-12 rounded-2xl border border-gray-200 bg-[#0A0A0A] text-white p-7 md:p-9 relative overflow-hidden">
      {/* textura halftone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(198,240,50,0.16) 1.5px, transparent 1.6px)",
          backgroundSize: "11px 11px",
        }}
      />
      <div className="relative">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-[#C6F032] mb-3">
          Continue por dentro
        </p>
        <h3 className="font-display font-bold text-[1.5rem] md:text-[1.75rem] leading-tight mb-2 max-w-lg">
          Um estudo denso por quinzena, direto no seu email.
        </h3>
        <p className="text-[14px] text-gray-300 mb-5 max-w-md leading-relaxed">
          Os bastidores de por que tokens e projetos crescem. Sem ruido, sem
          spam.
        </p>
        {status === "success" ? (
          <p className="text-[#C6F032] text-sm font-medium">{msg}</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md">
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
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C6F032]/60 focus:ring-1 focus:ring-[#C6F032]/25 transition-all text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C6F032] text-black font-semibold text-sm hover:bg-[#b5e025] transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Quero receber"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
        {msg && status === "error" && (
          <p className="mt-2.5 text-[12px] text-red-400">{msg}</p>
        )}
      </div>
    </div>
  );
}
