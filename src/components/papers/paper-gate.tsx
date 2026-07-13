"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Check, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { Paper } from "@/lib/papers-data";
import { getLeadMetadata } from "@/lib/lead-meta";
import { track, identifyLead } from "@/lib/analytics";
import { CALENDLY_URL, WHATSAPP_NUMBER } from "@/lib/constants";

const STORAGE_KEY = "kld_papers_unlocked";

export function PaperGate({ paper, articleHtml }: { paper: Paper; articleHtml?: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
    setHydrated(true);
  }, []);

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
          deliver: { paperSlug: paper.slug },
          metadata: getLeadMetadata("paper-gate", paper.slug),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro");
      track("lead_captured", { source: "paper-gate", paper_slug: paper.slug });
      track("lead_submit", { source: "paper-gate", paper_slug: paper.slug });
      track("playbook_download", {
        source: "paper-gate",
        paper_slug: paper.slug,
        method: "email_delivery",
      });
      identifyLead(email);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setUnlocked(true);
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erro ao liberar. Tente novamente.");
    }
  }

  // Leitura online = o HTML desenhado completo (read.html), documento autônomo Kaleidos.
  const readUrl = `/papers/${paper.slug}/read.html`;

  return (
    <main className="min-h-screen bg-[#F5F1E8]">
      {/* Hero do volume */}
      <section className="pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1120px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.14em] text-gray-500 hover:text-gray-900 transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Estudos Kaleidos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-black/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] bg-white lg:sticky lg:top-28"
            >
              <Image
                src={paper.cover}
                alt={`Capa do ${paper.volume} — ${paper.title}`}
                width={840}
                height={1188}
                className="w-full h-auto"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span
                  className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.16em] text-[11px] px-3 py-1.5 rounded-full text-black"
                  style={{ background: paper.accent }}
                >
                  Kaleidos Papers · {paper.volume}
                </span>
                <span className="font-mono uppercase tracking-[0.14em] text-[11px] text-gray-500">
                  {paper.tag}
                </span>
              </div>

              <h1 className="font-display font-bold text-[2.5rem] md:text-[3.5rem] leading-[1.02] tracking-[-0.03em] text-gray-900">
                {paper.title}
                <span style={{ color: paper.accent }}>.</span>
              </h1>
              <p className="mt-3 text-lg md:text-xl text-gray-700 leading-snug max-w-xl">
                {paper.subtitle}
              </p>

              <p className="mt-6 text-[15px] text-gray-600 leading-relaxed max-w-xl">
                {paper.description}
              </p>

              {/* Resumo answer-first — bloco denso, escaneável, extraível por IA (GEO) */}
              {paper.tldr && (
                <div className="mt-6 rounded-xl border border-black/10 bg-[#EFE9DA] px-5 py-4 max-w-xl">
                  <p
                    className="font-mono uppercase tracking-[0.18em] text-[10px] mb-1.5"
                    style={{ color: paper.accent }}
                  >
                    Resumo
                  </p>
                  <p className="text-[14.5px] text-gray-800 leading-relaxed">{paper.tldr}</p>
                </div>
              )}

              <ul className="mt-7 space-y-2.5 max-w-xl">
                {paper.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[14px] text-gray-700 leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: paper.accent }} />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-4 text-[13px] text-gray-500 font-mono flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> {paper.pages} páginas
                </span>
                <span className="text-gray-300">/</span>
                <span>{paper.readTime} de leitura</span>
                <span className="text-gray-300">/</span>
                <span>{paper.pdf ? "leia na web ou baixe o PDF" : "leitura na web"}</span>
              </div>

              <div className="mt-9">
                {!hydrated ? (
                  <div className="h-[120px]" />
                ) : unlocked ? (
                  <div className="rounded-2xl border border-black/10 bg-white p-6">
                    <p className="inline-flex items-center gap-2 text-[#3d9e32] font-semibold text-sm mb-1.5">
                      <Check className="w-4 h-4" /> Acesso liberado
                    </p>
                    <p className="text-[12.5px] text-gray-500 mb-4">
                      Também enviamos o link e o PDF pro seu email.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {paper.readHtml !== false && (
                        <a
                          href={readUrl}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7CF067] text-black font-semibold text-sm hover:brightness-95 transition-all"
                        >
                          Ler o estudo completo <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {paper.pdf && (
                        <a
                          href={paper.pdf}
                          download
                          className={
                            paper.readHtml !== false
                              ? "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-900 font-semibold text-sm hover:bg-gray-50 transition-colors"
                              : "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7CF067] text-black font-semibold text-sm hover:brightness-95 transition-all"
                          }
                        >
                          <Download className="w-4 h-4" /> Baixar PDF
                        </a>
                      )}
                    </div>
                    {/* Próximo passo do funil: quem desbloqueou é lead quente —
                        oferece a call/WhatsApp sem fricção. */}
                    <div
                      data-section="paper-unlocked"
                      className="mt-5 pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <p className="text-[13px] text-gray-600">
                        Quer aplicar isso no seu projeto?
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
                        >
                          Agendar 30min grátis
                        </a>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Oi Kaleidos! Li o estudo "${paper.title}" e quero conversar.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
                        >
                          Chamar no WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-black/10 bg-[#0A0A0A] text-white p-6 md:p-7 relative overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(${hexToRgba(paper.accent, 0.18)} 1.5px, transparent 1.6px)`,
                        backgroundSize: "11px 11px",
                      }}
                    />
                    <div className="relative">
                      <p
                        className="font-mono uppercase tracking-[0.16em] text-[11px] mb-2.5"
                        style={{ color: paper.accent }}
                      >
                        Acesso gratuito
                      </p>
                      <h2 className="font-display font-bold text-[1.4rem] md:text-[1.6rem] leading-tight mb-2 max-w-md">
                        Deixe seu email pra ler o estudo completo.
                      </h2>
                      <p className="text-[13px] text-gray-400 mb-5 max-w-md leading-relaxed">
                        Liberamos a leitura na hora (e o PDF) e você passa a receber os
                        próximos volumes. Sem spam.
                      </p>
                      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                        <div
                          aria-hidden="true"
                          style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                        >
                          <input name="_hp" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                        </div>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={status === "loading"}
                          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-black transition-opacity hover:opacity-90 whitespace-nowrap disabled:opacity-50"
                          style={{ background: paper.accent }}
                        >
                          {status === "loading" ? "Liberando..." : "Liberar acesso"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                      {status === "error" && <p className="mt-2.5 text-[12px] text-red-400">{msg}</p>}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}

/** Bloco "feito pela Kaleidos" + CTA site/WhatsApp, no começo e no fim do estudo. */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
