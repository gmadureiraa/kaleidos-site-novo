"use client";

import { useEffect, useRef } from "react";

/**
 * DotGraph — sparkline "viva" por card (teardown/compute: metrics DotGraph).
 * Curva ascendente determinística (seed) desenhada progressivamente ao entrar
 * na viewport, com pontos e um glow no ponto final. Canvas 2D + rAF, cleanup no
 * unmount, prefers-reduced-motion desenha estático.
 */

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function DotGraph({
  seed = 7,
  points = 12,
  color = "#7CF067",
  height = 46,
  className,
}: {
  seed?: number;
  points?: number;
  color?: string;
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rnd = seeded(seed);
    // série ascendente com ruído
    const ys: number[] = [];
    let base = 0.15 + rnd() * 0.1;
    for (let i = 0; i < points; i++) {
      base += (rnd() - 0.35) * 0.14;
      base = Math.max(0.08, Math.min(0.95, base + i * (0.6 / points)));
      ys.push(base);
    }

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const px = (i: number) => (i / (points - 1)) * (w - 8) + 4;
    const py = (v: number) => h - 6 - v * (h - 14);

    const paint = (progress: number) => {
      ctx.clearRect(0, 0, w, h);
      const shown = Math.max(2, Math.floor(progress * points));
      // baseline
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(4, h - 6);
      ctx.lineTo(w - 4, h - 6);
      ctx.stroke();
      // linha
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < shown; i++) {
        const x = px(i);
        const y = py(ys[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // pontos
      for (let i = 0; i < shown; i++) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(px(i), py(ys[i]), 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // glow no último ponto visível
      const li = shown - 1;
      const lx = px(li);
      const ly = py(ys[li]);
      const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 9);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(lx, ly, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(lx, ly, 2.6, 0, Math.PI * 2);
      ctx.fill();
    };

    if (reduced) {
      paint(1);
      const onResize = () => {
        resize();
        paint(1);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let animStart = 0;
    const DUR = 1100;
    const animate = () => {
      const step = (now: number) => {
        if (!animStart) animStart = now;
        const t = Math.min(1, (now - animStart) / DUR);
        paint(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animate();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [seed, points, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height }}
    />
  );
}
