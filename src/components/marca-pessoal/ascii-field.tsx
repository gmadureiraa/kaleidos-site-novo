"use client";

import { useEffect, useRef } from "react";

/**
 * AsciiField — textura ASCII sutil de fundo (teardown/compute: testimonials com
 * fundo ascii). Grade de caracteres esparsos que "respira" muito devagar. Serve
 * de fundo pra seção invertida (light no meio do dark). Estático se
 * prefers-reduced-motion. rAF + cleanup.
 */

const CHARS = "·:+*=×°.";

export function AsciiField({
  color = "rgba(124,240,103,0.14)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cols = 0;
    let rows = 0;
    const CELL = 14;

    const build = (t: number) => {
      let s = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n =
            Math.sin(x * 0.35 + t) * Math.cos(y * 0.4 - t * 0.7) +
            Math.sin((x + y) * 0.2 + t * 0.5);
          if (n > 0.75) {
            const idx = Math.floor(((n - 0.75) / 0.25) * (CHARS.length - 1));
            s += CHARS[Math.min(idx, CHARS.length - 1)];
          } else {
            s += " ";
          }
        }
        s += "\n";
      }
      el.textContent = s;
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      cols = Math.ceil(rect.width / CELL) + 2;
      rows = Math.ceil(rect.height / (CELL * 1.1)) + 2;
    };
    measure();

    if (reduced) {
      build(0.4);
      const onResize = () => {
        measure();
        build(0.4);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      build((now - start) / 3200);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        margin: 0,
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 12,
        lineHeight: 1.1,
        letterSpacing: 2,
        color,
        userSelect: "none",
        overflow: "hidden",
        pointerEvents: "none",
        whiteSpace: "pre",
      }}
    />
  );
}
