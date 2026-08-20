"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Download, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLeadMetadata } from "@/lib/lead-meta";
import { track, identifyLead } from "@/lib/analytics";

// Popup do ebook estilo Lunar Strategy: capa grande centralizada + CTA "Baixar
// grátis", fundo escurecido. Mobile-first (modal centralizado). Captura email e
// entrega o PDF via a mesma rota do gate (/api/newsletter/subscribe + deliver).

const PLAYBOOK = {
  slug: "bear-market-2026",
  cover: "/papers/cover-bear-market-v4.webp",
  pdf: "/papers/bear-market-2026.pdf",
  readUrl: "/papers/bear-market-2026/read.html",
  title: "Como fazer marketing e vender no bear market",
};

const GREEN = "#7CF067";
const STORAGE_KEY = "kld_papers_unlocked";

export function EbookPopup({
  open,
  onClose,
  source = "ebook-popup",
}: {
  open: boolean;
  onClose: () => void;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [msg, setMsg] = useState("");

  // Já desbloqueado antes? abre direto no estado "done".
  useEffect(() => {
    if (!open) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setStatus("done");
    } catch {}
  }, [open]);

  // ESC fecha + trava scroll do body enquanto aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

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
          deliver: { paperSlug: PLAYBOOK.slug },
          metadata: getLeadMetadata(source, PLAYBOOK.slug),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro");
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      track("lead_captured", { source, paper_slug: PLAYBOOK.slug });
      track("lead_submit", { source, paper_slug: PLAYBOOK.slug });
      track("playbook_download", {
        source,
        paper_slug: PLAYBOOK.slug,
        method: "email_delivery",
      });
      identifyLead(email);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erro. Tente de novo.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Baixar o playbook Bear Market 2026"
          className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-6"
        >
          {/* backdrop escuro */}
          <motion.button
            aria-label="Fechar"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] max-h-[92dvh] overflow-y-auto overscroll-contain rounded-3xl bg-white p-3 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]"
          >
            {/* Capa grande (estilo Lunar). A capa é 2:3 — a moldura abraça a
                imagem (w-fit) pra não sobrar borda branca dos lados quando a
                altura é o limite. max-h deixa o form/CTA sempre visível. */}
            <div className="mx-auto w-fit overflow-hidden rounded-2xl ring-1 ring-black/10">
              <Image
                src={PLAYBOOK.cover}
                alt={PLAYBOOK.title}
                width={840}
                height={1260}
                sizes="(max-width: 480px) 90vw, 400px"
                priority
                className="block h-auto max-h-[58dvh] w-auto max-w-full object-contain"
              />
            </div>

            {/* CTA / form */}
            <div className="px-1.5 pb-1.5 pt-3">
              {status === "done" ? (
                <div className="text-center">
                  <p className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3d9e32]">
                    <Check className="h-4 w-4" /> Acesso liberado (também foi pro seu email)
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={PLAYBOOK.readUrl}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-neutral-800"
                    >
                      Ler o playbook completo <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={PLAYBOOK.pdf}
                      download
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/15 px-5 py-3 text-[14px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4" /> Baixar o PDF
                    </a>
                    <p className="text-[12px] text-gray-500">
                      Quer aplicar no seu projeto?{" "}
                      <Link
                        href="/agendar"
                        className="font-semibold text-gray-900 underline underline-offset-2"
                      >
                        Agende 30min grátis
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-2.5">
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                  >
                    <input name="_hp" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                  </div>
                  <input
                    type="email"
                    placeholder="seu@email.com"
              aria-label="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-2xl border border-black/15 bg-gray-50 px-4 py-3.5 text-[16px] text-gray-900 placeholder:text-gray-400 transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-bold text-black transition-all hover:brightness-95 disabled:opacity-50"
                    style={{ background: GREEN }}
                  >
                    {status === "loading" ? "Liberando..." : "Baixar grátis"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {status === "error" && <p className="text-center text-[12px] text-red-500">{msg}</p>}
                  <p className="text-center text-[11.5px] text-gray-400">
                    Leitura na hora + PDF no seu email. Sem spam.
                  </p>
                </form>
              )}
            </div>

            {/* fechar (X) — dentro do modal (sticky) pra não ser cortado
                quando o conteúdo rola em telas baixas */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-colors hover:text-black"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
