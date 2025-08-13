"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCases, type CaseData } from "@/lib/case-data";

// const allTags = Array.from(new Set(getAllCases().flatMap(p => p.tags)));

export default function CasesPage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [modalCase, setModalCase] = useState<CaseData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Definir ordem específica dos cases
  const caseOrder = [
    "investidor-4-20",
    "paradigma-education", 
    "bit-das-minas",
    "layla-foz",
    "defiverso",
    "crypto-com",
    "mercado-bitcoin",
    "jornal-cripto",
    "orlando",
    "yasmin",
    "defifest"
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

  // Função para obter a imagem de capa de um case
  const getCaseCover = (caseId: string): string | null => {
    const coverMap: Record<string, string> = {
      // Adicione cases conforme você criar as imagens
      // "defifest": "/Capas/Defifest.png",
      // "bit-das-minas": "/Capas/BitDasMinas.png",
      // "layla-foz": "/Capas/LaylaFoz.png",
      // etc...
    };
    
    return coverMap[caseId] || null;
  };

  // Função para obter estilo do card baseado no nome do cliente
  const getCardStyle = (clientName: string) => {
    const name = clientName.toLowerCase();
    
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
    
    // Mapeamento específico para cada case
    const caseStyles: Record<string, typeof styles[0]> = {
      'defifest': styles[1], // Verde
      'bit-das-minas': styles[0], // Rosa
      'investidor-4-20': styles[2], // Preto
      'jornal-cripto': styles[3], // Branco
      'mercado-bitcoin': styles[4], // Gradiente rosa
      'crypto.com': styles[5], // Gradiente verde
      'orlando': styles[6], // Gradiente preto
      'paradigma-education': styles[7], // Gradiente branco
      'layla-foz': styles[0], // Rosa
      'yasmin': styles[1], // Verde
      'defiverso': styles[2], // Preto
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

  return (
    <main className="min-h-screen bg-white py-12 px-2 sm:px-4">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-8"
      >
        {t('casesList','title')}
      </motion.h1>

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
            <Link
              href={withLang(`/cases/${proj.id}`)}
              className="group block"
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-32 overflow-hidden flex items-center justify-center">
                  {getCaseCover(proj.id) ? (
                    <>
                      <Image
                        src={getCaseCover(proj.id)!}
                        alt={`Capa ${proj.nome}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </>
                  ) : (
                    <div className={`w-full h-full ${getCardStyle(proj.nome).bg} ${getCardStyle(proj.nome).border} flex items-center justify-center`}>
                      <span className={`text-4xl font-display font-bold ${getCardStyle(proj.nome).text} text-center px-4`}>
                        {proj.nome}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#7CFF6B] transition-colors">
                    {locale==='en' && (proj as any).nome_en ? (proj as any).nome_en : proj.nome}
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
                    {locale==='en' && (proj as any).fraseImpactante_en ? (proj as any).fraseImpactante_en : proj.fraseImpactante}
                  </p>
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
    </main>
  );
} 