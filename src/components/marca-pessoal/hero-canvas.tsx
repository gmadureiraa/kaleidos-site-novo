"use client";

import { useEffect, useRef } from "react";

/**
 * HeroCanvas — "assinatura viva" do hero (teardown/iphone: absorption-animation).
 * Campo de pontos numa grade; ondas concêntricas nascem no centro em cadência e
 * a cada movimento do mouse. Cada ponto "sobe" (brilho/tamanho) quando a crista
 * da onda passa por ele, depois cai. Barato: 2D canvas + rAF, DPR-aware.
 *
 * Respeita prefers-reduced-motion (desenha o campo estático uma vez) e limpa o
 * rAF + listeners no unmount.
 */

type Wave = { x: number; y: number; born: number; strength: number };

const SPACING = 26; // px entre pontos
const WAVE_SPEED = 0.09; // px/ms de expansão da crista
const WAVE_WIDTH = 46; // largura da crista (gaussiana)
const AUTO_EVERY = 1400; // ms entre ondas automáticas
const MAX_WAVES = 14;

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const waves: Wave[] = [];

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

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * SPACING;
          const py = j * SPACING;
          let lift = 0;
          for (const wave of waves) {
            const age = elapsed - wave.born;
            const radius = age * WAVE_SPEED;
            const dx = px - wave.x;
            const dy = py - wave.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const d = Math.abs(dist - radius);
            if (d < WAVE_WIDTH) {
              const g = Math.exp(-(d * d) / (2 * (WAVE_WIDTH / 2.4) ** 2));
              const fade = Math.max(0, 1 - age / 3400);
              lift += g * fade * wave.strength;
            }
          }
          lift = Math.min(lift, 1);
          const base = 0.16;
          const alpha = base + lift * 0.75;
          const size = 0.9 + lift * 2.1;
          // verde da marca só nas cristas mais fortes; branco no repouso
          if (lift > 0.55) {
            ctx.fillStyle = `rgba(124,240,103,${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          }
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (reduced) {
      // campo estático, sem ondas
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.fillStyle = "rgba(255,255,255,0.16)";
          ctx.beginPath();
          ctx.arc(i * SPACING, j * SPACING, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const onResize = () => resize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let lastAuto = 0;
    const start = performance.now();

    const pushWave = (x: number, y: number, strength: number) => {
      waves.push({ x, y, born: performance.now() - start, strength });
      if (waves.length > MAX_WAVES) waves.shift();
    };

    const loop = (now: number) => {
      const elapsed = now - start;
      if (elapsed - lastAuto > AUTO_EVERY) {
        lastAuto = elapsed;
        pushWave(w * 0.5, h * 0.42, 1);
      }
      // remove ondas mortas
      for (let k = waves.length - 1; k >= 0; k--) {
        if (elapsed - waves[k].born > 3600) waves.splice(k, 1);
      }
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let lastMove = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 90) return;
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      pushWave(x, y, 1.25);
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
