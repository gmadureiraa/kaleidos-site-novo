"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Contador animado — mesmo padrão do HeroKaleidos                    */
/* ------------------------------------------------------------------ */
export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: string;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let raf = 0;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(numericTarget * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
            else setCount(numericTarget);
          };
          raf = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [numericTarget]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — fade/slide on view (stagger-friendly)                      */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* variants pra stagger de listas/cards */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* eyebrow padronizado do deck */
export function Eyebrow({
  children,
  tone = "green",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "green" | "pink" | "black";
  className?: string;
}) {
  const color =
    tone === "green" ? "text-[#7CF067]" : tone === "pink" ? "text-pink-500" : "text-black/60";
  return (
    <p
      className={`mb-4 font-accent text-xs uppercase tracking-[0.25em] ${color} ${className}`}
    >
      {children}
    </p>
  );
}

/* grade de fundo sutil estilo blueprint */
export function GridBackdrop({ tone = "dark" }: { tone?: "dark" | "light" | "accent" }) {
  const line =
    tone === "light" || tone === "accent" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.1)";
  const opacity = tone === "accent" ? "opacity-[0.06]" : "opacity-[0.04]";
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 ${opacity}`}
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}
      aria-hidden="true"
    />
  );
}
