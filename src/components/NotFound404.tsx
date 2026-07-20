"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/cases", label: "Cases" },
  { href: "/servicos", label: "Serviços" },
  { href: "/papers", label: "Papers" },
  { href: "/contato", label: "Contato" },
];

export default function NotFound404() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [glitch, setGlitch] = useState(false);

  // parallax: cursor move -> CSS vars (throttled via rAF)
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", px.toFixed(3));
      el.style.setProperty("--my", py.toFixed(3));
    });
  }, []);

  // glitch burst helper
  const burst = useCallback(() => {
    setGlitch(true);
    window.setTimeout(() => setGlitch(false), 420);
  }, []);

  // periodic subtle glitch (respeita reduced-motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(burst, 5200);
    return () => window.clearInterval(id);
  }, [burst]);

  return (
    <main
      id="main-content"
      className="nf-root"
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        const el = wrapRef.current;
        if (el) {
          el.style.setProperty("--mx", "0");
          el.style.setProperty("--my", "0");
        }
      }}
    >
      <style>{nfCss}</style>

      {/* acentos de marca reativos ao cursor */}
      <span aria-hidden className="nf-blob nf-blob--green" />
      <span aria-hidden className="nf-blob nf-blob--pink" />

      <div className="nf-inner">
        {/* arte glitch — herói interativo */}
        <button
          type="button"
          className={`nf-art ${glitch ? "is-glitch" : ""}`}
          onMouseEnter={burst}
          onFocus={burst}
          onClick={burst}
          aria-label="Reativar o glitch"
        >
          <Image
            src="/Kaleidos/imagens/404-glitch.webp"
            alt="404 — página não encontrada"
            width={1600}
            height={1200}
            priority
            className="nf-img nf-img--base"
          />
          <Image
            src="/Kaleidos/imagens/404-glitch.webp"
            alt=""
            aria-hidden
            width={1600}
            height={1200}
            className="nf-img nf-img--r"
          />
          <Image
            src="/Kaleidos/imagens/404-glitch.webp"
            alt=""
            aria-hidden
            width={1600}
            height={1200}
            className="nf-img nf-img--g"
          />
          <span aria-hidden className="nf-scan" />
        </button>

        <p className="nf-eyebrow">Erro 404</p>
        <h1 className="nf-title">Essa página deu glitch.</h1>
        <p className="nf-sub">
          O link que você seguiu pode estar quebrado ou a página foi movida.
          Bora te levar de volta pro caminho certo.
        </p>

        <div className="nf-cta">
          <Link href="/" className="nf-btn nf-btn--primary">
            Voltar pra Home
          </Link>
          <Link href="/blog" className="nf-btn nf-btn--ghost">
            Ler o blog
          </Link>
        </div>

        <nav aria-label="Páginas populares" className="nf-nav">
          <p className="nf-nav__label">Ou vá direto pra</p>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}

const nfCss = `
.nf-root{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#fefefe;padding:56px 24px;--mx:0;--my:0}
.nf-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:640px;width:100%}
.nf-blob{position:absolute;z-index:1;border-radius:9999px;filter:blur(70px);pointer-events:none;opacity:.5;transition:transform .3s ease-out}
.nf-blob--green{width:340px;height:340px;top:-90px;right:-70px;background:rgba(124,240,103,.42);transform:translate(calc(var(--mx)*-28px),calc(var(--my)*-28px))}
.nf-blob--pink{width:360px;height:360px;bottom:-120px;left:-80px;background:rgba(210,98,178,.34);transform:translate(calc(var(--mx)*26px),calc(var(--my)*26px))}

.nf-art{position:relative;width:100%;max-width:560px;border:0;background:transparent;padding:0;cursor:pointer;display:block;transform:translate(calc(var(--mx)*14px),calc(var(--my)*10px));transition:transform .25s ease-out}
.nf-img{width:100%;height:auto;display:block;user-select:none}
.nf-img--base{position:relative}
.nf-img--r,.nf-img--g{position:absolute;inset:0;opacity:0;mix-blend-mode:multiply;pointer-events:none}
.nf-art.is-glitch .nf-img--r{opacity:.6;transform:translate3d(-6px,2px,0);filter:sepia(1) saturate(6) hue-rotate(280deg)}
.nf-art.is-glitch .nf-img--g{opacity:.55;transform:translate3d(6px,-2px,0);filter:sepia(1) saturate(6) hue-rotate(70deg)}
.nf-art.is-glitch .nf-img--base{animation:nf-slice .42s steps(2) both}
@keyframes nf-slice{
  0%{clip-path:inset(0 0 0 0)}
  20%{clip-path:inset(18% 0 62% 0);transform:translateX(-4px)}
  40%{clip-path:inset(54% 0 22% 0);transform:translateX(5px)}
  60%{clip-path:inset(32% 0 40% 0);transform:translateX(-3px)}
  80%{clip-path:inset(70% 0 8% 0);transform:translateX(2px)}
  100%{clip-path:inset(0 0 0 0);transform:none}
}
.nf-scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(180deg,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 1px,transparent 2px,transparent 4px);opacity:0;transition:opacity .2s}
.nf-art:hover .nf-scan,.nf-art.is-glitch .nf-scan{opacity:.5}

.nf-eyebrow{margin-top:22px;font-family:var(--font-mono,monospace);font-size:12px;letter-spacing:.35em;text-transform:uppercase;color:rgba(22,18,13,.5)}
.nf-title{margin-top:10px;font-family:var(--font-atelier,var(--font-display,inherit));font-weight:700;letter-spacing:-.02em;color:#16120d;font-size:clamp(28px,5vw,40px)}
.nf-sub{margin-top:14px;max-width:440px;font-size:16px;line-height:1.6;color:rgba(22,18,13,.65)}
.nf-cta{margin-top:30px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.nf-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;padding:12px 30px;font-size:16px;font-weight:600;text-decoration:none;transition:transform .18s ease,background .18s ease,border-color .18s ease}
.nf-btn--primary{background:#16120d;color:#fefefe}
.nf-btn--primary:hover{background:#d262b2;transform:translateY(-2px)}
.nf-btn--ghost{background:rgba(255,255,255,.7);color:#16120d;border:1px solid rgba(22,18,13,.15)}
.nf-btn--ghost:hover{background:#fff;border-color:rgba(22,18,13,.3)}

.nf-nav{margin-top:46px;width:100%;border-top:1px solid rgba(22,18,13,.1);padding-top:24px}
.nf-nav__label{margin-bottom:14px;font-family:var(--font-mono,monospace);font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(22,18,13,.4)}
.nf-nav ul{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:center;list-style:none;padding:0;margin:0}
.nf-nav a{font-size:14px;font-weight:500;color:rgba(22,18,13,.7);text-decoration:none;text-underline-offset:4px;transition:color .18s}
.nf-nav a:hover{color:#d262b2;text-decoration:underline}

@media (prefers-reduced-motion:reduce){
  .nf-art,.nf-blob{transition:none;transform:none}
  .nf-art.is-glitch .nf-img--base{animation:none}
  .nf-art.is-glitch .nf-img--r,.nf-art.is-glitch .nf-img--g{opacity:0}
}
`;
