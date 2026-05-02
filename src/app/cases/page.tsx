"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCases, type CaseData } from "@/lib/case-data";
import { FooterDemo } from "@/components/ui/footer-demo";

// const allTags = Array.from(new Set(getAllCases().flatMap(p => p.tags)));

export default function CasesPage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [modalCase, setModalCase] = useState<CaseData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Definir ordem específica dos cases
  const caseOrder = [
    "investidor-4-20",
    "neobankless",
    "hugo-doria",
    "paradigma-education",
    "bit-das-minas",
    "buenas-ideias",
    "layla-foz",
    "defiverso",
    "crypto-com",
    "mercado-bitcoin",
    "jornal-cripto",
    "orlando",
    "yasmin",
    "defifest",
    "ledger",
  ];

  const allCases = getAllCases();
  
  // Ordenar os cases conforme a ordem definida
  const sortedCases = caseOrder
    .map(id => allCases.find(caseData => caseData.id === id))
    .filter(Boolean) as CaseData[];

  const nextImage = () => {
    if (modalCase && modalCase.media.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % modalCase.media.length);
    }
  };

  const prevImage = () => {
    if (modalCase && modalCase.media.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + modalCase.media.length) % modalCase.media.length);
    }
  };

  const isVideo = (url: string) => url.includes('.mp4') || url.includes('.mov') || url.includes('.avi');

  // Cases que estão prontos (têm página completa)
  const readyCases = [
    "bit-das-minas",
    "layla-foz",
    "defiverso",
    "crypto-com",
    "jornal-cripto",
    "mercado-bitcoin",
    "orlando",
    "investidor-4-20",
    "paradigma-education",
    "neobankless",
    "hugo-doria",
    "buenas-ideias",
    "yasmin",
    "defifest",
    "ledger",
  ];

  // Função para verificar se o case está pronto
  const isCaseReady = (caseId: string): boolean => {
    return readyCases.includes(caseId);
  };

  // Extrai a primeira linha de "metricas" (headline do resultado) pra mostrar no card
  const getHeadlineMetric = (proj: CaseData): string | null => {
    const raw = locale === "en" && proj.metricas_en ? proj.metricas_en : proj.metricas;
    if (!raw) return null;
    const firstLine = raw.split("\n").find((l) => l.trim().length > 0);
    if (!firstLine) return null;
    return firstLine.length > 80 ? firstLine.slice(0, 77) + "…" : firstLine;
  };

  // Função para obter estilo do card baseado no ID do case
  const getCardStyle = (caseId: string) => {
    const name = caseId.toLowerCase();
    
    // Paleta Kaleidos: Rosa, Verde, Preto, Branco
    const styles = [
      { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-600' },
      { bg: 'bg-green-500', text: 'text-white', border: 'border-green-600' },
      { bg: 'bg-black', text: 'text-pink-400', border: 'border-gray-800' },
      { bg: 'bg-white', text: 'text-pink-500', border: 'border-pink-200' },
      { bg: 'bg-gradient-to-br from-pink-500 to-pink-600', text: 'text-white', border: 'border-pink-600' },
      { bg: 'bg-gradient-to-br from-green-500 to-green-600', text: 'text-white', border: 'border-green-600' },
      { bg: 'bg-gradient-to-br from-black to-gray-900', text: 'text-pink-400', border: 'border-gray-800' },
      { bg: 'bg-gradient-to-br from-white to-gray-50', text: 'text-pink-500', border: 'border-pink-200' }
    ];
    
    // Mapeamento específico para cada case (usando IDs exatos do case-data.ts)
    const caseStyles: Record<string, typeof styles[0]> = {
      'defifest': styles[1], // Verde
      'bit-das-minas': styles[0], // Rosa
      'investidor-4-20': styles[2], // Preto
      'jornal-cripto': styles[3], // Branco
      'mercado-bitcoin': styles[4], // Gradiente rosa
      'crypto-com': styles[5], // Gradiente verde (corrigido: era crypto.com)
      'orlando': styles[6], // Gradiente preto
      'paradigma-education': styles[7], // Gradiente branco
      'layla-foz': styles[0], // Rosa
      'yasmin': styles[1], // Verde
      'defiverso': styles[2], // Preto
      'ledger': styles[2], // Preto
      'parfin': styles[5], // Gradiente verde
      'kast': styles[1], // Verde
      'neobankless': styles[4], // Gradiente rosa
      'hugo-doria': styles[6], // Gradiente preto
      'buenas-ideias': styles[3], // Branco
    };
    
    // Retorna o estilo específico do case ou um padrão baseado no nome
    if (caseStyles[name]) {
      return caseStyles[name];
    }
    
    // Fallback baseado em palavras-chave no nome
    if (name.includes('layla')) {
      return styles[0]; // Rosa
    } else if (name.includes('yasmin')) {
      return styles[1]; // Verde
    } else if (name.includes('bit das minas') || name.includes('bitdasminas')) {
      return styles[3]; // Branco
    } else if (name.includes('investidor') || name.includes('4.20')) {
      return styles[2]; // Preto
    } else if (name.includes('mercado bitcoin')) {
      return styles[4]; // Gradiente rosa
    } else if (name.includes('defifest')) {
      return styles[1]; // Verde
    } else if (name.includes('jornal cripto')) {
      return styles[3]; // Branco
    } else if (name.includes('crypto.com')) {
      return styles[5]; // Gradiente verde
    } else if (name.includes('orlando')) {
      return styles[6]; // Gradiente preto
    } else if (name.includes('paradigma')) {
      return styles[7]; // Gradiente branco
    } else if (name.includes('defiverso')) {
      return styles[2]; // Preto
    } else {
      return styles[2]; // Preto como padrão
    }
  };

  const heroIntro = locale === "en"
    ? "Stories from clients across crypto, web3, fintech, content and creators. Each card opens the full case: problem, solution and outcome."
    : "Histórias de clientes de cripto, web3, fintech, conteúdo e criadores. Cada card abre o case completo: problema, solução e resultado.";

  const stats = locale === "en"
    ? [
        { number: `${sortedCases.length}`, label: "delivered cases" },
        { number: "8", label: "active clients" },
        { number: "120+", label: "monthly content pieces" },
      ]
    : [
        { number: `${sortedCases.length}`, label: "cases entregues" },
        { number: "8", label: "clientes ativos" },
        { number: "120+", label: "peças de conteúdo por mês" },
      ];

  return (
    <main className="min-h-screen bg-white py-12 px-2 sm:px-4">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-gray-900"
        >
          {t('casesList','title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-3 max-w-2xl text-base sm:text-lg text-gray-600"
        >
          {heroIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-3 gap-3 sm:gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
                {s.number}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-gray-600">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18, delayChildren: 0.3 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {sortedCases.map(proj => (
          <motion.div
            key={proj.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
            }}
          >
            <div className="group block">
              {isCaseReady(proj.id) ? (
                <Link href={withLang(`/cases/${proj.id}`)}>
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`relative h-32 overflow-hidden flex items-center justify-center ${getCardStyle(proj.id).bg} ${getCardStyle(proj.id).border}`}>
                      <span className={`text-4xl font-display font-bold ${getCardStyle(proj.id).text} text-center px-4`}>
                        {proj.nome}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#7CFF6B] transition-colors">
                        {locale==='en' && (proj as unknown as { nome_en?: string }).nome_en ? (proj as unknown as { nome_en?: string }).nome_en : proj.nome}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {proj.tags.slice(0, 3).map(tagItem => (
                          <span key={tagItem} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {tagItem}
                          </span>
                        ))}
                        {proj.tags.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{proj.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3 font-medium">
                        {locale==='en' && (proj as unknown as { fraseImpactante_en?: string }).fraseImpactante_en ? (proj as unknown as { fraseImpactante_en?: string }).fraseImpactante_en : proj.fraseImpactante}
                      </p>
                      {getHeadlineMetric(proj) && (
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#7CFF6B]/30 bg-[#7CFF6B]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {getHeadlineMetric(proj)}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {proj.media.length} {proj.media.length === 1 ? t('casesList','item') : t('casesList','items')}
                        </span>
                        <span className="text-[#7CFF6B] text-sm font-medium">
                          {t('casesList','seeCase')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-lg opacity-75"
                >
                  <div className={`relative h-32 overflow-hidden flex items-center justify-center ${getCardStyle(proj.id).bg} ${getCardStyle(proj.id).border} opacity-50`}>
                    <span className={`text-4xl font-display font-bold ${getCardStyle(proj.id).text} text-center px-4`}>
                      {proj.nome}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-gray-400">
                      {locale==='en' && (proj as unknown as { nome_en?: string }).nome_en ? (proj as unknown as { nome_en?: string }).nome_en : proj.nome}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {proj.tags.slice(0, 3).map(tagItem => (
                        <span key={tagItem} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full opacity-50">
                          {tagItem}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full opacity-50">
                          +{proj.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      {locale==='en' && (proj as unknown as { fraseImpactante_en?: string }).fraseImpactante_en ? (proj as unknown as { fraseImpactante_en?: string }).fraseImpactante_en : proj.fraseImpactante}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {proj.media.length} {proj.media.length === 1 ? t('casesList','item') : t('casesList','items')}
                      </span>
                      <span className="text-gray-500 text-sm font-medium italic">
                        Em breve
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal para visualização rápida */}
      <AnimatePresence>
        {modalCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setModalCase(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setModalCase(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                ✕
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                ‹
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                ›
              </button>

              <div className="relative">
                {modalCase.media.length > 0 && (
                  isVideo(modalCase.media[currentImageIndex].src) ? (
                    <video
                      src={modalCase.media[currentImageIndex].src}
                      className="max-w-full max-h-[80vh] object-contain"
                      controls
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={modalCase.media[currentImageIndex].src}
                      alt={modalCase.nome}
                      width={800}
                      height={600}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  )
                )}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {currentImageIndex + 1} de {modalCase.media.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <FooterDemo />
    </main>
  );
} 