"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AnimatedNumber — count-up com "decode" por scramble+blur (teardown/compute:
 * metrics AnimatedNumber). Ao entrar na viewport: os dígitos embaralham com
 * blur e vão "travando" no valor final (ease quart-out ~1.8s). Respeita
 * prefers-reduced-motion (mostra o valor final direto).
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  className,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState("0");
  const [blur, setBlur] = useState(6);
  const started = useRef(false);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setDisplay(fmt(value));
      setBlur(0);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // quart-out
        const current = value * eased;
        if (t < 1) {
          // fase de scramble: dígitos parcialmente aleatórios
          const scrambleAmt = 1 - t;
          const finalStr = fmt(value);
          const currentStr = fmt(current);
          let out = "";
          for (let i = 0; i < finalStr.length; i++) {
            const ch = finalStr[i];
            if (/\d/.test(ch) && Math.random() < scrambleAmt * 0.7) {
              out += String(Math.floor(Math.random() * 10));
            } else {
              out += currentStr[i] ?? ch;
            }
          }
          setDisplay(out);
          setBlur(6 * (1 - eased));
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(fmt(value));
          setBlur(0);
        }
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        filter: blur ? `blur(${blur.toFixed(2)}px)` : undefined,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
