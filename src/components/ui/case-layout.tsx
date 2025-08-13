"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { CaseCarousel } from "@/components/ui/case-carousel";
import { CryptoTweetsCarousel } from "@/components/ui/crypto-tweets-carousel";
import { useI18n } from "@/i18n/useI18n";

interface CaseLayoutProps {
  caseData: {
    id: string;
    nome: string;
    descricao: string;
    descricao_en?: string;
    fraseImpactante?: string;
    fraseImpactante_en?: string;
    detalhes: string;
    detalhes_en?: string;
    links: string[];
    metricas: string;
    metricas_en?: string;
    servicos: string[];
    servicos_en?: string[];
    media: {
      src: string;
      type: 'image' | 'video' | 'pdf';
      alt?: string;
      poster?: string;
    }[];
  };
  clientType?: 'reels' | 'feed';
  visualSection?: React.ReactNode;
}

export function CaseLayout({ caseData, clientType, visualSection }: CaseLayoutProps) {
  const { t, locale } = useI18n();
  const {
    nome,
    fraseImpactante,
    fraseImpactante_en,
    detalhes,
    detalhes_en,
    links,
    metricas,
    metricas_en,
    media
  } = caseData;
  const isEn = locale === 'en';
  const detalhesText = isEn && detalhes_en ? detalhes_en : detalhes;
  const fraseText = isEn && fraseImpactante_en ? fraseImpactante_en : fraseImpactante;
  const metricasText = isEn && metricas_en ? metricas_en : metricas;
  // Sidebar removida; lista de serviços não é usada na UI atual



  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href={locale==='en'?'/cases?lang=en':'/cases'} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('case','breadcrumb')}
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {/* Coluna Principal */}
          <div className="space-y-12">
            {/* Título e Descrição */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                {nome}
              </h1>
            </motion.div>

            {/* O que fizemos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {t('case','whatWeDid')}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                  {detalhesText}
                </p>
              </div>
            </motion.section>

            {/* Website Desenvolvido - Específico para Defifest */}
            {caseData.id === "defifest" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                 <h2 className="text-2xl font-bold mb-6 text-gray-900">
                   {t('case','websiteDeveloped')}
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="relative w-full max-w-4xl mx-auto">
                    {/* Barra do navegador simulada */}
                    <div className="bg-gray-200 rounded-t-lg p-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 text-center">
                        defiverso.com/defifest-2025/
                      </div>
                    </div>
                    
                    {/* Preview do site */}
                    <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
                      <iframe
                        src="https://defiverso.com/defifest-2025/"
                        className="w-full h-96"
                        title="Defifest 2025 Website Preview"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                    
                    <div className="mt-4 text-center">
                      <a
                        href="https://defiverso.com/defifest-2025/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#7CFF6B] hover:text-[#6BE85A] font-medium transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                         {t('case','visitSite')}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Carrossel de Tweets - Específico para Crypto.com */}
            {caseData.id === "crypto-com" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Conteúdo criado para redes sociais
                </h2>
                <CryptoTweetsCarousel />
              </motion.section>
            )}

            {/* Carrossel com o visual do nosso trabalho */}
            {caseData.id !== "crypto-com" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                 <h2 className="text-2xl font-bold mb-6 text-gray-900">
                   {t('case','visualWork')}
                </h2>
                {visualSection ?? (
                  <CaseCarousel 
                    media={media} 
                    title={nome} 
                    clientType={clientType}
                    format={caseData.id === "jornal-cripto" || caseData.id === "mercado-bitcoin" ? "instagram" : caseData.id === "investidor-4-20" ? "reels" : "default"}
                  />
                )}
              </motion.section>
            )}

            {/* Seção específica para as plataformas web do Jornal Cripto */}
            {caseData.id === "jornal-cripto" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                 <h2 className="text-2xl font-bold mb-6 text-gray-900">
                   {t('case','platforms')}
                </h2>
                <div className="space-y-8">
                  {/* Site Principal */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
                         Site
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        jornalcripto.com
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://jornalcripto.com"
                          className="w-full h-full"
                          title="Site Principal - Jornal Cripto"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Plataforma principal com conteúdo educativo e análises do mercado cripto
                    </p>
                  </motion.div>

                  {/* Newsletter */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
                         {t('case','newsletter')}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        news.jornalcripto.com
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://news.jornalcripto.com"
                          className="w-full h-full"
                          title="Newsletter - Jornal Cripto"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Newsletter semanal com as principais análises e insights do mercado
                    </p>
                  </motion.div>

                  {/* Radar App */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
                         Radar App
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        radar.jornalcripto.com
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://radar.jornalcripto.com"
                          className="w-full h-full"
                          title="Radar App - Jornal Cripto"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Webapp para insights em tempo real do mercado cripto
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Seção específica para as plataformas do Investidor 4.20 */}
            {caseData.id === "investidor-4-20" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Plataformas Desenvolvidas
                </h2>
                <div className="space-y-8">
                  {/* Newsletter */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Newsletter Defiverso
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        news.defiverso.com
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Criamos uma newsletter do zero que hoje conta com mais de 30 mil inscritos orgânicos e taxa de abertura superior a 35%.
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://news.defiverso.com"
                          className="w-full h-full"
                          title="Newsletter Defiverso"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Newsletter semanal com análises exclusivas e insights do mercado cripto
                    </p>
                  </motion.div>

                  {/* Página de Captura */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Página de Captura
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        defiverso.com/pagina-de-captura/
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Desenvolvemos uma nova página de captura para lançamentos que revolucionou a conversão e impulsionou as vendas.
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://defiverso.com/pagina-de-captura/"
                          className="w-full h-full"
                          title="Página de Captura Defiverso"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <a 
                            href="https://defiverso.com/pagina-de-captura/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors"
                          >
                            Abrir
                          </a>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Página otimizada para conversão com design moderno e estratégia de vendas
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Resultados */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {t('case','results')}
              </h2>
              
              {/* Frase Impactante */}
              {fraseText && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-[#7CFF6B] flex-shrink-0 mt-1" />
                    <div>
                       <h3 className="text-lg font-bold text-gray-900 mb-2">
                         {t('case','highlightedResult')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {fraseText}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Estatísticas */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  {t('case','successMetrics')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {metricasText}
                </p>
              </div>
            </motion.section>

            {/* Links do projeto/case */}
            {links.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                 <h2 className="text-2xl font-bold mb-4 text-gray-900">
                   {t('case','links')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {links.map((link: string, index: number) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#7CFF6B] flex-shrink-0" />
                      <span className="text-gray-700 group-hover:text-gray-900 break-all text-sm">
                        {link.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar removida conforme solicitação */}
        </div>
      </div>
    </div>
  );
} 