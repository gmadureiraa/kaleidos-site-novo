import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada · Kaleidos",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: false },
};

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/cases", label: "Cases" },
  { href: "/servicos", label: "Serviços" },
  { href: "/papers", label: "Papers" },
  { href: "/contato", label: "Contato" },
];

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-6 py-16 sm:py-20"
    >
      {/* acentos de marca sutis */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#7CF067]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#d262b2]/15 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* arte glitch (herói) */}
        <div className="w-full max-w-xl">
          <Image
            src="/Kaleidos/imagens/404-glitch.webp"
            alt="404 — página não encontrada"
            width={1600}
            height={1200}
            priority
            className="h-auto w-full select-none"
          />
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-[#16120d]/50">
          Erro 404
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#16120d] sm:text-4xl">
          Essa página deu glitch.
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-[#16120d]/65">
          O link que você seguiu pode estar quebrado ou a página foi movida.
          Bora te levar de volta pro caminho certo.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#16120d] px-8 py-3 text-base font-semibold text-[#faf8f3] transition-transform hover:-translate-y-0.5 hover:bg-[#d262b2]"
          >
            Voltar pra Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-[#16120d]/15 bg-white/60 px-8 py-3 text-base font-semibold text-[#16120d] transition-colors hover:border-[#16120d]/30 hover:bg-white"
          >
            Ler o blog
          </Link>
        </div>

        {/* atalhos úteis */}
        <nav
          aria-label="Páginas populares"
          className="mt-12 w-full border-t border-[#16120d]/10 pt-6"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#16120d]/40">
            Ou vá direto pra
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-[#16120d]/70 underline-offset-4 transition-colors hover:text-[#d262b2] hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
