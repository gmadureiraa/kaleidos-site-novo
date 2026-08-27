import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Sparkles,
  Newspaper,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Links — Kaleidos",
  description:
    "Os produtos de IA da Kaleidos: Viral OS, Jornal Cripto e o que vem depois.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Links — Kaleidos",
    description:
      "Os produtos de IA da Kaleidos: Viral OS, Jornal Cripto e o que vem depois.",
    url: "https://kaleidos.com.br/links",
    siteName: "Kaleidos Digital",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: "Links Kaleidos — Produtos de IA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Links — Kaleidos",
    description:
      "Os produtos de IA da Kaleidos: Viral OS, Jornal Cripto e o que vem depois.",
    images: ["/Kaleidos/imagens/Capa.png"],
    creator: "@digitalkaleidos",
    site: "@digitalkaleidos",
  },
};

type Hero = {
  name: string;
  href: string;
  domain: string;
  tagline: string;
  shortTagline: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string; // text/border color
  accentBg: string; // soft bg
  accentRing: string; // glow ring
  badge: string;
};

type Secondary = {
  name: string;
  href: string;
  domain: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string }>;
  status?: "live" | "soon";
};

const heroProducts: Hero[] = [
  {
    name: "Viral OS",
    href: "https://viral.kaleidos.com.br",
    domain: "viral.kaleidos.com.br",
    tagline:
      "Carrosséis, roteiros e threads na sua voz, com radar do nicho e planejamento no mesmo sistema.",
    shortTagline: "Do sinal ao próximo post",
    Icon: Sparkles,
    accent: "text-[#C5F23E]",
    accentBg: "bg-[#C5F23E]/10",
    accentRing: "shadow-[0_0_60px_-12px_rgba(197,242,62,0.45)]",
    badge: "Conteúdo com IA",
  },
];

const secondaryProducts: Secondary[] = [
  {
    name: "Jornal Cripto",
    href: "https://jornalcripto.com.br",
    domain: "jornalcripto.com.br",
    tagline: "Newsletter cripto diária.",
    Icon: Newspaper,
    status: "live",
  },
];

export default function LinksPage() {
  return (
    <main
      id="main-content"
      role="main"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background gradient — same vibe as hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7CF067]/15 via-black to-black" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
        {/* Hero */}
        <header className="flex w-full flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7CF067]/20 bg-[#7CF067]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#7CF067] sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#7CF067]" />
            Produtos de IA da Kaleidos
          </span>

          <div className="mb-5 flex items-center justify-center gap-3">
            <Image
              src="/Kaleidos/logo/Logos-10.svg"
              alt="Kaleidos Digital"
              width={56}
              height={56}
              className="h-14 w-14 sm:h-16 sm:w-16"
              priority
            />
            <span className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kaleidos
            </span>
          </div>

          <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
            Produtos de IA pra criadores e marketeiros.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
            Tudo que a Kaleidos tá construindo num só lugar. Carrosséis,
            roteiros, radar de tendências e publicação.
          </p>
        </header>

        {/* Trio viral — em destaque */}
        <section
          aria-label="Produtos em destaque"
          className="mt-12 grid w-full grid-cols-1 gap-4 sm:mt-16"
        >
          {heroProducts.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] sm:gap-5 sm:p-6 ${p.accentRing}`}
            >
              {/* accent gradient strip */}
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 w-1 ${p.accentBg.replace("/10", "/60")}`}
                aria-hidden="true"
              />

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 ${p.accentBg} sm:h-16 sm:w-16`}
              >
                <p.Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${p.accent}`} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                    {p.name}
                  </h2>
                  <span
                    className={`hidden rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider sm:inline-block ${p.accentBg} ${p.accent}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-400 sm:text-[15px]">
                  {p.tagline}
                </p>
                <p className="mt-1 truncate font-mono text-[11px] text-gray-500 sm:text-xs">
                  {p.domain}
                </p>
              </div>

              <ArrowUpRight
                className={`h-5 w-5 shrink-0 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:${p.accent.replace("text-", "text-")}`}
                aria-hidden="true"
              />
            </a>
          ))}
        </section>

        {/* Secundários */}
        <section aria-label="Outros produtos" className="mt-10 w-full">
          <h3 className="mb-4 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Mais produtos
          </h3>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            {secondaryProducts.map((p) => {
              const isSoon = p.status === "soon";
              const Comp: "a" | "div" = isSoon ? "div" : "a";
              const props = isSoon
                ? { "aria-disabled": true as const }
                : {
                    href: p.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  };
              return (
                <Comp
                  key={p.name}
                  {...props}
                  className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-all ${
                    isSoon
                      ? "cursor-not-allowed opacity-70"
                      : "hover:-translate-y-0.5 hover:border-[#7CF067]/30 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <p.Icon className="h-4 w-4 text-gray-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-white">
                        {p.name}
                      </span>
                      {isSoon && (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-gray-400">
                          em breve
                        </span>
                      )}
                    </div>
                    <span className="truncate text-xs text-gray-500">
                      {p.tagline}
                    </span>
                  </div>
                  {!isSoon && (
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CF067]"
                      aria-hidden="true"
                    />
                  )}
                </Comp>
              );
            })}
          </div>
        </section>

        {/* Footer / nav */}
        <footer className="mt-16 flex w-full flex-col items-center gap-6">
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/digitalkaleidos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#7CF067]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/digitalkaleidos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#7CF067]"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/kaleidos-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#7CF067]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/5512997796835?text=Oi%2C%20vim%20pelo%20%2Flinks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#7CF067]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
            <Link
              href="/"
              className="transition-colors hover:text-[#7CF067]"
            >
              kaleidos.com.br
            </Link>
            <span className="text-gray-700" aria-hidden="true">
              •
            </span>
            <Link
              href="/contato"
              className="transition-colors hover:text-[#7CF067]"
            >
              Contato
            </Link>
            <span className="text-gray-700" aria-hidden="true">
              •
            </span>
            <Link
              href="/cases"
              className="transition-colors hover:text-[#7CF067]"
            >
              Cases
            </Link>
          </div>

          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} Kaleidos Digital
          </p>
        </footer>
      </div>
    </main>
  );
}
