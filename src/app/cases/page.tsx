"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { getAllCases, type CaseData } from "@/lib/case-data";
import { FooterDemo } from "@/components/ui/footer-demo";

// Categorias canônicas para filtro — agrupamos as tags reais em buckets que fazem sentido
// pro visitante (em vez de expor todas as ~20 tags soltas). Cada bucket lista as tags
// que o disparam.
type CategoryFilter = {
  id: string;
  labelPt: string;
  labelEn: string;
  match: string[]; // tags (case-insensitive, substring) que pertencem a esse bucket
};
const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: "cripto",   labelPt: "Cripto & Web3",         labelEn: "Crypto & Web3",        match: ["Cripto", "Web3", "Fintech"] },
  { id: "video",    labelPt: "Vídeo & Reels",         labelEn: "Video & Reels",        match: ["Vídeo", "Reels", "Roteiros", "Motion", "Animação", "Podcast"] },
  { id: "design",   labelPt: "Design & Identidade",   labelEn: "Design & Identity",    match: ["Design"] },
  { id: "conteudo", labelPt: "Conteúdo & Social",     labelEn: "Content & Social",     match: ["Copywriting", "Social Media", "Newsletter", "Conteúdo", "Criação de conteúdo", "Marketing de Conteúdo"] },
  { id: "web",      labelPt: "Sites & Plataformas",   labelEn: "Sites & Platforms",    match: ["Desenvolvimento Web", "Dashboard", "SaaS", "Analytics", "Gamification"] },
  { id: "lancamentos", labelPt: "Lançamentos & Leads", labelEn: "Launches & Leads",    match: ["Lançamentos", "Geração de Leads", "Automação", "Influencer"] },
  { id: "ia",       labelPt: "IA & Automação",        labelEn: "AI & Automation",      match: ["IA", "Automação"] },
  { id: "evento",   labelPt: "Eventos",               labelEn: "Events",               match: ["Evento"] },
];

export default function CasesPage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [modalCase, setModalCase] = useState<CaseData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
  const sortedCases = useMemo(
    () =>
      caseOrder
        .map((id) => allCases.find((caseData) => caseData.id === id))
        .filter(Boolean) as CaseData[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allCases.length]
  );

  // Aplicar filtros de busca + categoria sobre a lista ordenada
  const filteredCases = useMemo(() => {
    const q = search.trim().toLowerCase();
    const activeMatchList = activeCategory
      ? CATEGORY_FILTERS.find((c) => c.id === activeCategory)?.match.map((m) => m.toLowerCase()) ?? []
      : null;

    return sortedCases.filter((proj) => {
      // filtro categoria — bate se qualquer tag/serviço contém substring de algum match
      if (activeMatchList && activeMatchList.length) {
        const haystack = [...(proj.tags ?? []), ...(proj.servicos ?? [])]
          .join(" | ")
          .toLowerCase();
        const ok = activeMatchList.some((m) => haystack.includes(m));
        if (!ok) return false;
      }
      // busca textual — nome, frase, tags, serviços
      if (q) {
        const hay = [
          proj.nome,
          proj.fraseImpactante,
          proj.fraseImpactante_en,
          ...(proj.tags ?? []),
          ...(proj.servicos ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [sortedCases, search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory(null);
  };

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

        {/* Busca + filtros por categoria */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === 'en' ? 'Search cases (client, service, tag…)' : 'Buscar cases (cliente, serviço, tag…)'}
              aria-label={locale === 'en' ? 'Search cases' : 'Buscar cases'}
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-full border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition bg-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label={locale === 'en' ? 'Clear search' : 'Limpar busca'}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={locale === 'en' ? 'Filter by category' : 'Filtrar por categoria'}>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeCategory === null
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {locale === 'en' ? 'All' : 'Tudo'}
            </button>
            {CATEGORY_FILTERS.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(active ? null : cat.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    active
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {locale === 'en' ? cat.labelEn : cat.labelPt}
                </button>
              );
            })}
            {(search || activeCategory) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-pink-600 hover:bg-pink-50 transition-colors"
              >
                {locale === 'en' ? 'Clear filters' : 'Limpar filtros'}
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500" aria-live="polite">
            {filteredCases.length === sortedCases.length
              ? (locale === 'en'
                  ? `${sortedCases.length} cases`
                  : `${sortedCases.length} cases`)
              : (locale === 'en'
                  ? `${filteredCases.length} of ${sortedCases.length} cases`
                  : `${filteredCases.length} de ${sortedCases.length} cases`)}
          </div>
        </div>

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6"
      >
        {filteredCases.map(proj => (
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

      {filteredCases.length === 0 && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-4 text-center">
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8">
            <p className="text-gray-700 font-medium">
              {locale === 'en' ? 'No cases match your filters.' : 'Nenhum case bate com esses filtros.'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {locale === 'en' ? 'Try clearing the search or pick another category.' : 'Tente limpar a busca ou escolher outra categoria.'}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-black text-white hover:bg-gray-800 transition-colors"
            >
              {locale === 'en' ? 'Clear filters' : 'Limpar filtros'}
            </button>
          </div>
        </div>
      )}

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