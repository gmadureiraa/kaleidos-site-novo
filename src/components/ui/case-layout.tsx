"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight, TrendingUp, Lightbulb } from "lucide-react";
import Link from "next/link";
import { CaseCarousel } from "@/components/ui/case-carousel";
import { CryptoTweetsCarousel } from "@/components/ui/crypto-tweets-carousel";

interface CaseLayoutProps {
  caseData: {
    id: string;
    nome: string;
    descricao: string;
    fraseImpactante?: string;
    detalhes: string;
    links: string[];
    metricas: string;
    servicos: string[];
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
  const {
    nome,
    descricao,
    fraseImpactante,
    detalhes,
    links,
    metricas,
    servicos,
    media
  } = caseData;



  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href="/cases" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home / Cases
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-12">
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
                O que fizemos
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                  {detalhes}
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
                  Website desenvolvido para o evento
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
                        Visitar o site completo
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
                  Visual do nosso trabalho
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
                  Plataformas Desenvolvidas
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
                        Site Principal
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
                        Newsletter
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
                Resultados
              </h2>
              
              {/* Frase Impactante */}
              {fraseImpactante && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-[#7CFF6B] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Resultado Destacado
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {fraseImpactante}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Estatísticas */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  Métricas de Sucesso
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {metricas}
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
                  Links do projeto
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo e Nome */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KALEIDOS</span>
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Overview
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {descricao}
              </p>
            </motion.div>

            {/* Métricas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#7CFF6B] flex-shrink-0" />
                <h3 className="text-lg font-bold text-gray-900">
                  Métricas de Impacto
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                {metricas}
              </p>
            </motion.div>

            {/* Serviços */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-[#7CFF6B] flex-shrink-0" />
                <h3 className="text-lg font-bold text-gray-900">
                  Serviços Prestados
                </h3>
              </div>
              <div className="space-y-2">
                {servicos.map((servico: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#7CFF6B] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{servico}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#7CFF6B] p-5 rounded-xl text-center"
            >
              <div className="w-6 h-6 text-black mx-auto mb-3" />
              <h3 className="text-lg font-bold text-black mb-2">
                Quer resultados similares?
              </h3>
              <p className="text-black mb-4 opacity-90 text-sm">
                Vamos criar algo incrível juntos!
              </p>
              <Link
                href="/contato"
                className="inline-block bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm"
              >
                Falar Conosco
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 