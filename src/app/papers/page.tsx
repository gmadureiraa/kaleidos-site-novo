import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { papers } from "@/lib/papers-data";
import { FooterDemo } from "@/components/ui/footer-demo";

export const metadata: Metadata = {
  title: "Kaleidos Papers · Estudos de marketing cripto",
  description:
    "Estudos de caso e playbooks de marketing cripto da Kaleidos. Como projetos web3 reais construíram crescimento, marca e comunidade. PDFs liberados por email.",
  openGraph: {
    title: "Kaleidos Papers · Estudos de marketing cripto",
    description:
      "Estudos de caso e playbooks de marketing cripto da Kaleidos. PDFs liberados por email.",
    images: [{ url: "/papers/cover-vol-01.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaleidos Papers · Estudos de marketing cripto",
    description:
      "Estudos de caso e playbooks de marketing cripto da Kaleidos. PDFs liberados por email.",
    images: ["/papers/cover-vol-01.png"],
  },
};

export default function PapersHubPage() {
  const visiblePapers = papers.filter((p) => !p.hidden);

  return (
    <>
      <main className="min-h-screen bg-[#0A0A0A] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          {/* glow neon */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full blur-[140px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, #7CF067 0%, #d262b2 55%, transparent 75%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7CF067]" />
              <span className="font-mono uppercase tracking-[0.18em] text-[12px] text-gray-400">
                Kaleidos Papers
              </span>
            </div>

            <h1 className="font-display font-bold tracking-[-0.02em] leading-[0.95] text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] max-w-4xl">
              Estudos de marketing
              <br className="hidden sm:block" /> cripto que{" "}
              <span className="text-[#7CF067]">funcionam</span>
              <span className="text-[#d262b2]">.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] md:text-[17px] leading-relaxed text-gray-400">
              Como projetos web3 reais construíram crescimento, marca e
              comunidade. Estudos de caso e playbooks que a Kaleidos escreve
              lendo o mercado on-chain, sem promessa, com fontes públicas.
              Liberados em PDF por email.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {visiblePapers.map((paper) => (
              <Link
                key={paper.slug}
                href={`/papers/${paper.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
                {/* Capa */}
                <div className="relative aspect-[210/297] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                  <Image
                    src={paper.cover}
                    alt={`${paper.volume} — ${paper.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute left-3 top-3 font-mono uppercase tracking-[0.14em] text-[10px] px-2 py-0.5 rounded-full text-black"
                    style={{ background: paper.accent }}
                  >
                    {paper.volume}
                  </span>
                </div>

                {/* Texto */}
                <div className="flex flex-col flex-1 pt-5 px-1">
                  <span className="font-mono uppercase tracking-[0.12em] text-[10px] text-gray-500">
                    {paper.tag}
                  </span>

                  <h2 className="font-display font-bold text-white text-[1.35rem] leading-tight tracking-[-0.015em] mt-2">
                    {paper.title}
                    <span style={{ color: paper.accent }}>.</span>
                  </h2>
                  <p className="text-[13px] text-gray-400 leading-snug mt-2 line-clamp-2">
                    {paper.subtitle}
                  </p>

                  <div className="flex items-center gap-3 mt-auto pt-5 text-[11px] text-gray-500 font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="w-3 h-3" /> {paper.pages}p
                    </span>
                    <span className="text-gray-700">/</span>
                    <span>{paper.readTime}</span>
                    <span
                      className="inline-flex items-center gap-1 ml-auto font-semibold transition-colors"
                      style={{ color: paper.accent }}
                    >
                      Ler estudo
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FooterDemo />
    </>
  );
}
