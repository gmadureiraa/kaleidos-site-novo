"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";

const CLIENTS = [
  {
    id: "defiverso",
    name: "Defiverso",
    logo: "/Clientes-logo/Defiverso.png",
    resultSummary: "29.000+ inscrições no Minicurso 7 Dias DeFi, 26.554 assinantes na Newsletter e 12 milhões de visualizações orgânicas em 90 dias.",
    resultBadge: "12M+ views orgânicas",
    testimonial: "A parceria Kaleidos e Defiverso resultou na criação de um ecossistema de marketing digital completo e de alta performance.",
    author: "Equipe Defiverso",
    role: "Marketing & Conteúdo",
  },
  {
    id: "bit-das-minas",
    name: "Bit das Minas",
    logo: "/Clientes-logo/BitdasMinas.png",
    resultSummary: "Estratégia completa de lançamento e conteúdo que resultou em crescimento explosivo de faturamento e audiência.",
    resultBadge: "+200% faturamento",
    testimonial: "A Kaleidos transformou completamente minha presença digital. Faturamento cresceu mais de 200% com as estratégias de conteúdo.",
    author: "Gi",
    role: "Criadora de Conteúdo",
  },
  {
    id: "neobankless",
    name: "Neobankless",
    logo: "/Clientes-logo/Neobankless.png",
    resultSummary: "Criação do site neobankless.com, vídeos de manifesto e estratégia completa de conteúdo para Instagram.",
    resultBadge: "Site + Manifesto",
    testimonial: "A Kaleidos entende o mercado cripto e entrega com agilidade. Comunicação clara e resultados orientados.",
    author: "Equipe Neobankless",
    role: "Parceiros",
  },
  {
    id: "paradigma",
    name: "Paradigma Education",
    logo: null,
    resultSummary: "Transformamos conteúdo de podcast em vídeos educativos com motion graphics e animações personalizadas.",
    resultBadge: "Motion Design premium",
    testimonial: "Vídeos educativos que se destacam pela qualidade técnica e visual. A Kaleidos elevou nosso padrão de motion graphics.",
    author: "Equipe Paradigma",
    role: "Educação",
  },
  {
    id: "investidor-4-20",
    name: "Investidor 4.20",
    logo: "/Clientes-logo/investidor420.png",
    resultSummary: "Desenvolvimento comercial completo, estratégias de lançamento e conteúdo que multiplicaram o faturamento em 10x em 12 meses.",
    resultBadge: "10x faturamento",
    testimonial: "Profissionalismo e expertise incomparáveis. A equipe entende o mercado cripto como ninguém e entrega resultados que fazem diferença.",
    author: "Lucas Amendola",
    role: "Fundador",
  },
];

export default function RecentWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CLIENTS[activeIndex];

  return (
    <section
      id="trabalhos-recentes"
      className="w-full bg-black py-16 sm:py-20 px-6"
      aria-labelledby="recent-works-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="recent-works-heading"
          className="text-center text-3xl sm:text-4xl font-bold text-white mb-12 sm:mb-16 font-display tracking-tight"
        >
          Trabalhos recentes,{" "}
          <span className="text-rose-400">impacto notável</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Coluna esquerda: logos dos clientes */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {CLIENTS.map((client, index) => (
              <button
                key={client.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`text-left w-full rounded-xl px-4 py-4 transition-all duration-200 border ${
                  activeIndex === index
                    ? "bg-neutral-800/80 border-rose-500/50"
                    : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {client.logo ? (
                    <div className="relative h-8 w-[140px] flex-shrink-0">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain object-left"
                        sizes="140px"
                      />
                    </div>
                  ) : (
                    <span className="text-white font-semibold text-lg">
                      {client.name}
                    </span>
                  )}
                  <ExternalLink
                    className={`w-4 h-4 flex-shrink-0 ${
                      activeIndex === index ? "text-rose-400" : "text-neutral-500"
                    }`}
                    aria-hidden
                  />
                </div>
                {activeIndex === index && (
                  <p className="text-neutral-300 text-sm mt-2 line-clamp-2">
                    {client.resultSummary}
                  </p>
                )}
                {activeIndex === index && client.resultBadge && (
                  <span className="inline-block mt-2 text-xs font-medium text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
                    {client.resultBadge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Coluna direita: depoimento e resultados */}
          <div className="md:col-span-7">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-8 min-h-[280px] flex flex-col">
              <div className="flex gap-1 mb-4" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-rose-400 text-rose-400"
                  />
                ))}
              </div>
              <blockquote className="text-white text-lg sm:text-xl leading-relaxed flex-1">
                &ldquo;{active.testimonial}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm">
                  {active.author.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic text-white font-semibold block">
                    {active.author}
                  </cite>
                  <span className="text-rose-400 text-sm">{active.role}</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
