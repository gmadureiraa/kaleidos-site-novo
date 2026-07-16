"use client";

import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Play, ChevronLeft, ChevronRight, ExternalLink, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import {
  getPortfolioItems,
  getPortfolioClients,
  getFormatCounts,
  FORMAT_GROUPS,
  type PortfolioItem,
  type PortfolioFormat,
} from "@/lib/portfolio-data";

const FORMAT_LABEL: Record<PortfolioFormat, { pt: string; en: string }> = {
  reel: { pt: "Reel", en: "Reel" },
  video: { pt: "Vídeo longo", en: "Long video" },
  youtube: { pt: "Vídeo longo", en: "Long video" },
  carousel: { pt: "Carrossel", en: "Carousel" },
  paper: { pt: "Paper", en: "Paper" },
  playbook: { pt: "Playbook", en: "Playbook" },
  newsletter: { pt: "Newsletter", en: "Newsletter" },
  landing: { pt: "Landing", en: "Landing" },
  static: { pt: "Estático", en: "Static" },
  creative: { pt: "Criativo", en: "Creative" },
  blog: { pt: "Blog", en: "Blog" },
};

export default function PortfolioGallery() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    isEn && path.startsWith("/") ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  const items = useMemo(() => getPortfolioItems(), []);
  const clients = useMemo(() => getPortfolioClients(items), [items]);
  const formatCounts = useMemo(() => getFormatCounts(items), [items]);

  const [group, setGroup] = useState("all");
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [modal, setModal] = useState<PortfolioItem | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const activeFormats = useMemo(() => {
    const g = FORMAT_GROUPS.find((x) => x.id === group);
    return g && g.formats.length ? g.formats : null;
  }, [group]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (activeFormats && !activeFormats.includes(it.format)) return false;
      if (activeClient && it.clientId !== activeClient) return false;
      return true;
    });
  }, [items, activeFormats, activeClient]);

  // Destaque primeiro quando nenhum filtro ativo
  const ordered = useMemo(() => {
    if (activeClient || group !== "all") return filtered;
    return [...filtered].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filtered, activeClient, group]);

  const clearAll = () => {
    setActiveClient(null);
    setGroup("all");
  };
  const hasFilters = !!(activeClient || group !== "all");

  const openModal = useCallback((it: PortfolioItem) => {
    setSlideIdx(0);
    setModal(it);
  }, []);
  const closeModal = useCallback(() => setModal(null), []);

  // ESC fecha modal
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModal]);

  // Opções dos dropdowns (esconde grupos vazios automaticamente — ex.: blog)
  const formatOptions = useMemo(
    () =>
      FORMAT_GROUPS.filter((g) => g.id === "all" || (formatCounts[g.id] ?? 0) > 0).map((g) => ({
        id: g.id,
        label: `${g.icon}  ${isEn ? g.labelEn : g.labelPt}`,
        count: formatCounts[g.id] ?? 0,
      })),
    [formatCounts, isEn]
  );
  const clientOptions = useMemo(
    () => [
      { id: "all", label: isEn ? "All clients" : "Todos os clientes", count: items.length },
      ...clients.map((c) => ({ id: c.id, label: c.name, count: c.count })),
    ],
    [clients, items.length, isEn]
  );

  const stats = {
    pieces: items.length,
    clients: clients.length,
    formats: FORMAT_GROUPS.filter((g) => g.id !== "all" && formatCounts[g.id] > 0).length,
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6">
        <span className="font-accent text-xs uppercase tracking-[0.25em] text-[#7CF067]">
          {isEn ? "Living portfolio" : "Portfólio vivo"}
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {isEn ? "Portfolio" : "Portfólio"}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
          {isEn
            ? "Every piece we ship, in one place: reels, carousels, papers, newsletters and landings — filterable by format and client."
            : "Cada peça que a gente entrega, em um só lugar: reels, carrosséis, papers, newsletters e landings — filtrável por formato e cliente."}
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <Stat n={`+${stats.pieces}`} label={isEn ? "pieces" : "peças"} />
          <Stat n={String(stats.clients)} label={isEn ? "clients" : "clientes"} />
          <Stat n={String(stats.formats)} label={isEn ? "formats" : "formatos"} />
        </div>
      </section>

      {/* Toolbar (NÃO fixa — rola junto com a página) */}
      <section className="border-y border-white/10 bg-[#0A0A0B]/90">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Dropdown FORMATO */}
            <Dropdown
              label={isEn ? "Format" : "Formato"}
              value={group}
              options={formatOptions}
              onChange={setGroup}
            />
            {/* Dropdown CLIENTE */}
            <Dropdown
              label={isEn ? "Client" : "Cliente"}
              value={activeClient ?? "all"}
              options={clientOptions}
              onChange={(v) => setActiveClient(v === "all" ? null : v)}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-white/40" aria-live="polite">
            <span>
              {ordered.length === items.length
                ? `${items.length} ${isEn ? "pieces" : "peças"}`
                : `${ordered.length} ${isEn ? "of" : "de"} ${items.length} ${isEn ? "pieces" : "peças"}`}
            </span>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="text-[#D262B2] hover:underline">
                {isEn ? "Clear filters" : "Limpar filtros"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grade masonry (CSS columns, aspect NATIVO por card — nada é cortado) */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {ordered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
            <p className="font-medium text-white/80">
              {isEn ? "No pieces match your filters." : "Nenhuma peça bate com esses filtros."}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 inline-flex rounded-full bg-[#7CF067] px-4 py-2 text-xs font-semibold text-black"
            >
              {isEn ? "Clear filters" : "Limpar filtros"}
            </button>
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:mb-3">
            {ordered.map((it) => (
              <PortfolioCard key={it.id} item={it} isEn={isEn} onOpen={() => openModal(it)} />
            ))}
          </div>
        )}
      </section>

      {/* CTA final */}
      <section className="border-t border-white/10 bg-gradient-to-b from-transparent to-[#7CF067]/5">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {isEn ? "Want a result like these?" : "Quer um resultado desses?"}
          </h2>
          <p className="mt-3 text-white/60">
            {isEn
              ? "Tell us what you're building. We turn it into pieces that grow."
              : "Conta o que você está construindo. A gente transforma em peças que crescem."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/5512997796835"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7CF067] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#64e04d]"
            >
              {isEn ? "Talk to us" : "Fale com a gente"}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={withLang("/cases")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              {isEn ? "See full cases" : "Ver os cases completos"}
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de preview */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111113]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label={isEn ? "Close" : "Fechar"}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white/80 hover:bg-black/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Mídia */}
              <div className="flex max-h-[68vh] items-center justify-center overflow-hidden bg-black">
                <ModalMedia
                  item={modal}
                  slideIdx={slideIdx}
                  setSlideIdx={setSlideIdx}
                  isEn={isEn}
                />
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-4 border-t border-white/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#7CF067]">
                    {modal.client} · {isEn ? FORMAT_LABEL[modal.format].en : FORMAT_LABEL[modal.format].pt}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/90">{modal.title}</p>
                  {modal.metric && <p className="mt-1 text-xs text-white/50">{modal.metric}</p>}
                </div>
                <a
                  href={withLang(modal.href)}
                  target={modal.href.startsWith("http") ? "_blank" : undefined}
                  rel={modal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#7CF067] px-4 py-2 text-xs font-semibold text-black"
                >
                  {modal.format === "paper" || modal.format === "playbook"
                    ? isEn ? "Read" : "Ler"
                    : modal.href.startsWith("/cases")
                    ? isEn ? "Full case" : "Ver case"
                    : isEn ? "Open" : "Abrir"}
                  {modal.href.startsWith("http") ? (
                    <ExternalLink className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-2xl font-bold text-white">{n}</span>
      <span className="text-white/40">{label}</span>
    </div>
  );
}

// ── Dropdown compacto (substitui as listas gigantes de chips) ──
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string; count: number }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isDefault = value === "all";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex w-full items-center justify-between gap-2 rounded-full border px-4 py-2 text-sm transition-colors sm:w-auto ${
          isDefault
            ? "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
            : "border-[#7CF067]/60 bg-[#7CF067]/10 text-white"
        }`}
      >
        <span className="text-white/40">{label}:</span>
        <span className="font-medium">{current?.label ?? "—"}</span>
        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-40 mt-2 max-h-80 w-60 overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#111113] p-1.5 shadow-2xl shadow-black/50"
        >
          {options.map((o) => {
            const active = o.id === value;
            return (
              <button
                key={o.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  active ? "bg-[#7CF067] text-black" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{o.label}</span>
                <span className={`text-[11px] ${active ? "text-black/60" : "text-white/40"}`}>{o.count}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// aspect-ratio numérico inicial (dica) por aspect declarado
const ASPECT_RATIO: Record<string, number> = {
  "9/16": 9 / 16,
  "4/5": 4 / 5,
  "16/9": 16 / 9,
  "3/4": 3 / 4,
  "1/1": 1,
};

function PortfolioCard({
  item,
  isEn,
  onOpen,
}: {
  item: PortfolioItem;
  isEn: boolean;
  onOpen: () => void;
}) {
  const isPaper = item.format === "paper" || item.format === "playbook";
  const isLongVideo = item.format === "video" || item.format === "youtube";
  const isReel = item.format === "reel";
  // Aspect inicial vem da DICA do formato; ao carregar, adotamos o aspect REAL da
  // mídia pra NÃO cortar nada (object-contain + container no ratio nativo).
  const initialRatio = ASPECT_RATIO[item.aspect] ?? 1;
  const [ratio, setRatio] = useState(initialRatio);

  // Vídeo longo / YouTube sempre 16:9 fixo; Reel sempre 9:16 fixo. O poster pode ter
  // aspect diferente, mas o frame do formato é fixo — object-contain não corta a thumb.
  const lockedRatio = isLongVideo ? 16 / 9 : isReel ? 9 / 16 : null;
  const effectiveRatio = lockedRatio ?? ratio;
  // Thumbs remotos (ex.: i.ytimg.com) não estão no whitelist do next/image → usa <img>.
  const isRemote = /^https?:\/\//.test(item.thumb);
  const imgClass = `object-contain ${isPaper ? "p-2" : ""} transition-transform duration-500 group-hover:scale-[1.03]`;
  const onImgLoad = (img: HTMLImageElement) => {
    if (lockedRatio) return; // vídeo longo trava em 16:9
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      setRatio(img.naturalWidth / img.naturalHeight);
    }
  };

  // Item com publicação real (news / LinkedIn / landing) → o card é um link direto
  // pra URL externa (nova aba). Senão, abre o modal de preview.
  const cardClass =
    "group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-colors hover:border-[#7CF067]/40 break-inside-avoid";
  const Inner = (
      <div
        className={`relative w-full overflow-hidden ${isPaper ? "bg-[#15151a]" : "bg-black"}`}
        style={{ aspectRatio: effectiveRatio }}
      >
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumb}
            alt={item.title}
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${imgClass}`}
            onLoad={(e) => onImgLoad(e.currentTarget)}
          />
        ) : (
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            // object-contain + container no aspect nativo = peça INTEIRA, sem corte.
            className={imgClass}
            loading="lazy"
            onLoad={(e) => onImgLoad(e.currentTarget)}
          />
        )}
        {/* Play overlay pra vídeo / youtube */}
        {(item.mediaType === "video" || item.mediaType === "youtube") && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5 fill-white text-white" />
            </span>
          </span>
        )}
        {/* badge de formato */}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
          {item.format === "carousel" && item.slides
            ? `🎠 ${item.slides.length}`
            : isEn
            ? FORMAT_LABEL[item.format].en
            : FORMAT_LABEL[item.format].pt}
        </span>
        {/* selo de link externo (publicação real) */}
        {item.externalUrl && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            <ExternalLink className="h-3 w-3" />
          </span>
        )}
        {/* overlay info no hover */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-[11px] font-semibold text-[#7CF067]">{item.client}</p>
          <p className="line-clamp-2 text-[11px] text-white/85">{item.title}</p>
          {item.metric && <p className="mt-0.5 text-[10px] text-white/50">{item.metric}</p>}
        </div>
      </div>
  );

  if (item.externalUrl) {
    return (
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={item.title}
      >
        {Inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onOpen} className={cardClass}>
      {Inner}
    </button>
  );
}

function ModalMedia({
  item,
  slideIdx,
  setSlideIdx,
  isEn,
}: {
  item: PortfolioItem;
  slideIdx: number;
  setSlideIdx: (n: number) => void;
  isEn: boolean;
}) {
  // YouTube / vídeo longo via embed
  if (item.mediaType === "youtube" && item.videoId) {
    return (
      <div className="aspect-video w-full max-w-full">
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }
  if (item.mediaType === "video" && item.src) {
    return (
      <video
        src={item.src}
        poster={item.thumb}
        controls
        autoPlay
        className="max-h-[68vh] w-auto max-w-full object-contain"
      />
    );
  }
  if (item.format === "carousel" && item.slides && item.slides.length > 0) {
    const total = item.slides.length;
    const cur = item.slides[slideIdx] ?? item.slides[0];
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src={cur}
          alt={`${item.title} (${slideIdx + 1}/${total})`}
          width={900}
          height={1125}
          className="max-h-[68vh] w-auto max-w-full object-contain"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label={isEn ? "Previous" : "Anterior"}
              onClick={() => setSlideIdx((slideIdx - 1 + total) % total)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={isEn ? "Next" : "Próximo"}
              onClick={() => setSlideIdx((slideIdx + 1) % total)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
              {slideIdx + 1} / {total}
            </span>
          </>
        )}
      </div>
    );
  }
  // imagem / paper cover
  if (/^https?:\/\//.test(item.thumb)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.thumb}
        alt={item.title}
        className="max-h-[68vh] w-auto max-w-full object-contain"
      />
    );
  }
  return (
    <Image
      src={item.thumb}
      alt={item.title}
      width={900}
      height={1200}
      className="max-h-[68vh] w-auto max-w-full object-contain"
    />
  );
}
