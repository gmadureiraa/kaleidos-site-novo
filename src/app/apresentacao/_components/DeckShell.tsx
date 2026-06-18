"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Contexto do deck — expõe slide ativo + navegação                   */
/* ------------------------------------------------------------------ */
type DeckContextValue = {
  active: number;
  total: number;
  goTo: (index: number) => void;
  registerSlide: (el: HTMLElement | null, index: number) => void;
};

const DeckContext = createContext<DeckContextValue | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck precisa estar dentro de <DeckShell>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* DeckShell — container scroll-snap + progress + dots + teclado       */
/* ------------------------------------------------------------------ */
export function DeckShell({
  children,
  slideLabels,
}: {
  children: React.ReactNode;
  /** rótulos curtos pra tooltip dos dots, na ordem dos slides */
  slideLabels: string[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const total = slideLabels.length;

  const registerSlide = useCallback((el: HTMLElement | null, index: number) => {
    slidesRef.current[index] = el;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      const el = slidesRef.current[clamped];
      const scroller = scrollerRef.current;
      if (el && scroller) {
        scroller.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }
    },
    [total]
  );

  /* observer pra saber qual slide está ativo */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slidesRef.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: scroller, threshold: 0.55 }
    );
    slidesRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [total]);

  /* navegação por teclado (setas / pgup-pgdown / home-end) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(active + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, goTo, total]);

  const ctx = useMemo<DeckContextValue>(
    () => ({ active, total, goTo, registerSlide }),
    [active, total, goTo, registerSlide]
  );

  const progress = total > 1 ? active / (total - 1) : 0;
  /* dots em fundo escuro ficam claros, em fundo claro ficam escuros */
  const darkSlide = active % 2 === 0; // slides pares (0-index) começam escuros no roteiro

  return (
    <DeckContext.Provider value={ctx}>
      {/* barra de progresso fixa estilo deck (logo abaixo do navbar sticky de 64px) */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-[70] h-1 origin-left bg-[#7CFF6B]"
        style={{ scaleX: progress }}
        animate={{ scaleX: progress }}
        transition={{ type: "spring", stiffness: 120, damping: 26 }}
        aria-hidden="true"
      />

      {/* contador de slides 01 / 12 */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-[70] hidden select-none font-accent text-xs tracking-[0.3em] sm:block">
        <span className={darkSlide ? "text-white" : "text-black"}>
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className={darkSlide ? "text-white/30" : "text-black/30"}>
          {" "}
          / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* navegação por dots */}
      <nav
        className="fixed right-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
        aria-label="Navegação do deck"
      >
        {slideLabels.map((label, i) => {
          const isActive = i === active;
          return (
            <button
              key={label + i}
              onClick={() => goTo(i)}
              className="group relative flex items-center"
              aria-label={`Ir para slide ${i + 1}: ${label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-black/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100`}
              >
                {label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-5 w-1.5 bg-[#7CFF6B]"
                    : darkSlide
                      ? "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
                      : "h-1.5 w-1.5 bg-black/25 group-hover:bg-black/50"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* container scroll-snap — ocupa a viewport menos o navbar sticky (h-16 = 64px) */}
      <div
        ref={scrollerRef}
        className="deck-scroller h-[calc(100dvh-4rem)] snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {children}
      </div>
    </DeckContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Slide — uma "página" full-screen com snap                          */
/* ------------------------------------------------------------------ */
export function Slide({
  index,
  children,
  className = "",
  tone = "dark",
  id,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "accent";
  id?: string;
}) {
  const { registerSlide } = useDeck();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerSlide(ref.current, index);
  }, [index, registerSlide]);

  const toneBg =
    tone === "dark"
      ? "bg-black text-white"
      : tone === "accent"
        ? "bg-[#7CFF6B] text-black"
        : "bg-white text-black";

  return (
    <section
      ref={ref}
      id={id}
      data-slide={index}
      className={`relative flex min-h-[calc(100dvh-4rem)] w-full snap-start snap-always flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 md:py-20 ${toneBg} ${className}`}
    >
      {children}
    </section>
  );
}

/* numerinho do slide no canto superior, estilo deck */
export function SlideNumber({
  n,
  tone = "dark",
}: {
  n: number;
  tone?: "dark" | "light" | "accent";
}) {
  const color =
    tone === "light" ? "text-black/40" : tone === "accent" ? "text-black/50" : "text-white/40";
  return (
    <span
      className={`pointer-events-none absolute left-6 top-8 font-accent text-xs tracking-[0.3em] sm:left-10 ${color}`}
      aria-hidden="true"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
