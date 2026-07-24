"use client";

import { useEffect, useRef } from "react";

/**
 * AsciiTorus — torus (donut) renderizado em ASCII reagindo ao mouse
 * (teardown/compute: ascii-scene). Rampa de luminância " .:-=+*#%@", verde da
 * marca sobre fundo escuro, fonte mono. Rotação por tempo + offset do ponteiro.
 *
 * Barato (sem three.js): projeção 2D do donut clássico num buffer de chars.
 * Respeita prefers-reduced-motion (frame único) e limpa o rAF no unmount.
 */

const RAMP = " .:-=+*#%@";

export function AsciiTorus({
  width = 60,
  height = 30,
  className,
  color = "#7CF067",
}: {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cols = width;
    const rows = height;
    const R1 = 1;
    const R2 = 2;
    const K2 = 5;
    const K1 = (cols * K2 * 3) / (8 * (R1 + R2));

    let mouseA = 0;
    let mouseB = 0;
    const target = { a: 0, b: 0 };

    const render = (A: number, B: number) => {
      const output: string[] = new Array(cols * rows).fill(" ");
      const zbuffer: number[] = new Array(cols * rows).fill(0);
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      for (let theta = 0; theta < 6.28; theta += 0.07) {
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        for (let phi = 0; phi < 6.28; phi += 0.02) {
          const cosP = Math.cos(phi);
          const sinP = Math.sin(phi);
          const circleX = R2 + R1 * cosT;
          const circleY = R1 * sinT;

          const x =
            circleX * (cosB * cosP + sinA * sinB * sinP) - circleY * cosA * sinB;
          const y =
            circleX * (sinB * cosP - sinA * cosB * sinP) + circleY * cosA * cosB;
          const z = K2 + cosA * circleX * sinP + circleY * sinA;
          const ooz = 1 / z;

          const xp = Math.floor(cols / 2 + K1 * ooz * x);
          const yp = Math.floor(rows / 2 - (K1 / 2) * ooz * y);

          if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue;
          const idx = xp + yp * cols;
          const lum =
            cosP * cosT * sinB -
            cosA * cosT * sinP -
            sinA * sinT +
            cosB * (cosA * sinT - cosT * sinA * sinP);
          if (ooz > zbuffer[idx]) {
            zbuffer[idx] = ooz;
            const l = Math.max(0, Math.floor(lum * 8));
            output[idx] = RAMP[Math.min(l, RAMP.length - 1)];
          }
        }
      }

      let s = "";
      for (let r = 0; r < rows; r++) {
        s += output.slice(r * cols, (r + 1) * cols).join("") + "\n";
      }
      el.textContent = s;
    };

    if (reduced) {
      render(0.6, 0.9);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.a = ny * 2.4;
      target.b = nx * 2.4;
    };
    el.addEventListener("mousemove", onMove);

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      mouseA += (target.a - mouseA) * 0.05;
      mouseB += (target.b - mouseB) * 0.05;
      render(t * 0.7 + mouseA, t * 0.35 + mouseB);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, [width, height]);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        fontSize: 11,
        lineHeight: 1.02,
        letterSpacing: 1,
        color,
        margin: 0,
        userSelect: "none",
        whiteSpace: "pre",
      }}
    />
  );
}
