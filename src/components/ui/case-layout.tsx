"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CaseCarousel } from "@/components/ui/case-carousel";
import { CryptoTweetsCarousel } from "@/components/ui/crypto-tweets-carousel";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FooterDemo } from "@/components/ui/footer-demo";
import { useI18n } from "@/i18n/useI18n";
import { generateCaseStudySchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";

interface CaseLayoutProps {
  caseData: {
    id: string;
    nome: string;
    status?: "em-andamento";
    tags?: string[];
    descricao: string;
    descricao_en?: string;
    fraseImpactante?: string;
    fraseImpactante_en?: string;
    detalhes: string;
    detalhes_en?: string;
    links: string[];
    externalLink?: string;
    externalLabel?: string;
    externalLabel_en?: string;
    metricas: string;
    metricas_en?: string;
    servicos: string[];
    servicos_en?: string[];
    media: {
      src: string;
      type: 'image' | 'video' | 'pdf';
      alt?: string;
      poster?: string;
      link?: string; // URL externa (publicação real) — torna a peça clicável no carrossel
    }[];
    youtubeVideos?: {
      videoId: string;
      poster: string;
      src?: string;
      title?: string;
      alt?: string;
    }[];
  };
  clientType?: 'reels' | 'feed';
  visualSection?: React.ReactNode;
}

// Função auxiliar para processar itálico
function parseItalic(text: string, startKey: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = startKey;

  // Não processar se já não houver asteriscos simples
  if (!text.includes('*')) {
    return [<span key={key}>{text}</span>];
  }

  const italicRegex = /\*([^*]+)\*/g;
  let match;

  while ((match = italicRegex.exec(text)) !== null) {
    // Texto antes do match
    if (match.index! > currentIndex) {
      parts.push(<span key={key++}>{text.slice(currentIndex, match.index!)}</span>);
    }

    // Adicionar texto em itálico
    parts.push(<em key={key++}>{match[1]}</em>);
    currentIndex = match.index! + match[0].length;
  }

  // Texto restante
  if (currentIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(currentIndex)}</span>);
  }

  return parts.length > 0 ? parts : [<span key={key}>{text}</span>];
}

// Função helper para converter markdown simples para JSX
function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Se não há markdown, retornar texto simples
  if (!text.includes('**') && !text.includes('*')) {
    return [<span key={0}>{text}</span>];
  }

  const parts: React.ReactNode[] = [];
  let key = 0;

  // Processar primeiro negrito (**texto**), depois itálico (*texto*)
  // Regex para encontrar **texto** (negrito) - deve vir antes de * para evitar conflitos
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  // Primeiro, processar negrito
  while ((match = boldRegex.exec(text)) !== null) {
    // Texto antes do match
    if (match.index! > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index!);
      // Processar itálico no texto antes
      const italicParts = parseItalic(beforeText, key);
      parts.push(...italicParts);
      key += italicParts.length;
    }

    // Adicionar texto em negrito
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index! + match[0].length;
  }

  // Texto restante
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    const italicParts = parseItalic(remainingText, key);
    parts.push(...italicParts);
  }

  return parts.length > 0 ? parts : [<span key={key}>{text}</span>];
}

// Função para mapear serviços para IDs de seções
function getServiceSectionId(servico: string, caseId: string): string | null {
  const servicoLower = servico.toLowerCase();
  
  // Mapeamento genérico
  const serviceMap: Record<string, string> = {
    'social media': 'visual-work',
    'instagram': 'visual-work',
    'twitter': 'visual-work',
    'edição de vídeo': 'visual-work',
    'edição de vídeos': 'visual-work',
    'video editing': 'visual-work',
    'criação de conteúdo': 'visual-work',
    'content creation': 'visual-work',
    'design': 'visual-work',
    'motion graphics': 'visual-work',
    'motion': 'visual-work',
    'newsletter': 'newsletter',
    'email marketing': 'newsletter',
    'estratégia de marketing': 'results',
    'marketing strategy': 'results',
    'estratégias de lançamento': 'results',
    'launch strategies': 'results',
    'criativos para anúncios': 'results',
    'ad creatives': 'results',
    'páginas de captura': 'results',
    'capture pages': 'results',
    'automações ia': 'optimization',
    'ai automations': 'optimization',
    'automação de marketing': 'optimization',
    'marketing automation': 'optimization',
    'desenvolvimento comercial': 'results',
    'commercial development': 'results',
    'copywriter': 'results',
    'copywriting': 'results',
  };

  // Casos específicos por case
  const caseSpecificMap: Record<string, Record<string, string>> = {
    'defiverso': {
      'design posts': 'visual-work',
      'instagram defiverso': 'instagram-defiverso',
      'newsletter defiverso': 'newsletter-defiverso',
      'curso 7 dias defi': 'minicurso-defiverso',
      'twitter': 'optimization-defiverso',
      'resultados gerais': 'results',
    },
    'layla-foz': {
      'edição de vídeos': 'video-editing',
      'roteiros de reels': 'visual-work',
      'newsletter': 'newsletter-layla',
    },
  };

  // Verificar primeiro caso específico
  if (caseSpecificMap[caseId] && caseSpecificMap[caseId][servicoLower]) {
    return caseSpecificMap[caseId][servicoLower];
  }

  // Verificar mapeamento genérico
  for (const [key, sectionId] of Object.entries(serviceMap)) {
    if (servicoLower.includes(key)) {
      return sectionId;
    }
  }

  // Se não encontrar, retornar null (sem link)
  return null;
}

// Embed lazy 16:9 de vídeo do YouTube: mostra a thumb local como capa clicável
// e só carrega o iframe ao clicar (click-to-load), por performance.
function YouTubeEmbed({
  videoId,
  poster,
  title,
}: {
  videoId: string;
  poster: string;
  title?: string;
}) {
  const [loaded, setLoaded] = React.useState(false);
  const label = title || "Assistir no YouTube";

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-black" style={{ aspectRatio: "16 / 9" }}>
      {loaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={label}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={label}
        >
          <Image
            src={poster}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 transition-transform group-hover:scale-110">
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-[#7CF067]" />
          </span>
        </button>
      )}
    </div>
  );
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
    externalLink,
    externalLabel,
    externalLabel_en,
    metricas,
    metricas_en,
    media
  } = caseData;
  const isEn = locale === 'en';
  const externalLabelText = (isEn && externalLabel_en ? externalLabel_en : externalLabel)
    || (isEn ? 'Visit website' : 'Ver no site');
  const detalhesText = isEn && detalhes_en ? detalhes_en : detalhes;
  const fraseText = isEn && fraseImpactante_en ? fraseImpactante_en : fraseImpactante;
  const metricasText = isEn && metricas_en ? metricas_en : metricas;
  // O que entregamos: lista de serviços (respeita i18n)
  const entregaveis = (isEn && caseData.servicos_en?.length ? caseData.servicos_en : caseData.servicos) || [];
  // Logo de marca: usamos a logo real só para o case da própria Kaleidos.
  // Para os demais, exibimos o nome do cliente em destaque (sem inventar logo / asset quebrado).
  const brandLogo = caseData.id === "kaleidos" ? "/Kaleidos/logo/Logos-10.svg" : null;



  // Gerar structured data para o case
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  const firstImage = caseData.media.find(m => m.type === "image");
  const imageUrl = firstImage ? `${siteUrl}${firstImage.src}` : undefined;
  
  const caseStudySchema = generateCaseStudySchema(
    caseData.nome,
    caseData.descricao || caseData.fraseImpactante || "",
    caseData.nome,
    caseData.metricas || "",
    new Date().toISOString(),
    `/cases/${caseData.id}`,
    imageUrl
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Cases", href: "/cases" },
    { label: caseData.nome },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Header com Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs 
            items={[
              { label: locale === 'en' ? 'Cases' : 'Cases', href: '/cases' },
              { label: nome }
            ]}
          />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna Principal - Conteúdo */}
          <div className="lg:col-span-2 space-y-12">
            {/* Topo do case: LOGO/marca do cliente em destaque + descrição curta + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {caseData.status === "em-andamento" && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  {isEn ? "In progress" : "Em andamento"}
                </span>
              )}

              {/* Bloco de marca em destaque */}
              <div className="mb-6 flex items-center gap-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
                {brandLogo ? (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-black p-3 sm:h-20 sm:w-20">
                    <Image
                      src={brandLogo}
                      alt={`${nome} logo`}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-black text-2xl font-bold text-[#7CF067] sm:h-20 sm:w-20 sm:text-3xl">
                    {nome.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {isEn ? "Case" : "Case"}
                  </span>
                  <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
                    {nome}
                  </h1>
                </div>
              </div>

              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-[#7CF067] border border-[#7CF067] hover:bg-gray-900 transition-colors"
                >
                  {externalLabelText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>

            {/* O QUE ENTREGAMOS — claro de cara, antes de desenvolver o case */}
            {entregaveis.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="max-w-4xl"
              >
                <h2 className="mb-5 text-2xl font-bold text-gray-900">
                  {t('case','whatWeDelivered')}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {entregaveis.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 rounded-full border border-[#7CF067]/40 bg-[#7CF067]/10 px-4 py-2 text-sm font-semibold text-gray-800"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* O que fizemos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl"
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900">
                {t('case','whatWeDid')}
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap space-y-6">
                  {detalhesText.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {parseMarkdown(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Website Desenvolvido - Específico para Defifest */}
            {caseData.id === "defifest" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-4xl"
              >
                 <h2 className="text-2xl font-bold mb-8 text-gray-900">
                   {t('case','websiteDeveloped')}
                </h2>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="relative w-full max-w-4xl mx-auto">
                    {/* Barra do navegador simulada */}
                    <div className="bg-gray-200 rounded-t-lg p-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 text-center">
                        defiverso.com
                      </div>
                    </div>

                    {/* Preview do site */}
                    <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
                      <iframe
                        src="https://defiverso.com"
                        className="w-full h-96"
                        title="Defifest 2025 Website Preview"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <a
                        href="https://defiverso.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#7CF067] hover:text-[#6BE85A] font-medium transition-colors"
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
                id="visual-work"
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

            {/* Vídeos longos do YouTube (embed lazy 16:9) */}
            {caseData.youtubeVideos && caseData.youtubeVideos.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {isEn ? "Long-form videos (YouTube)" : "Vídeos longos (YouTube)"}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {caseData.youtubeVideos.map((video) => (
                    <div key={video.videoId} className="space-y-3">
                      <YouTubeEmbed
                        videoId={video.videoId}
                        poster={video.poster}
                        title={video.title || video.alt}
                      />
                      {(video.title || video.src) && (
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          {video.title && (
                            <p className="text-sm font-medium text-gray-700">{video.title}</p>
                          )}
                          {video.src && (
                            <a
                              href={video.src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-[#3d9e32] hover:text-[#2f7a26] transition-colors"
                            >
                              {isEn ? "Open on YouTube" : "Abrir no YouTube"}
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                        news.defiverso.com
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Desenvolvemos uma nova página de captura para lançamentos que revolucionou a conversão e impulsionou as vendas.
                      </p>
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://news.defiverso.com"
                          className="w-full h-full"
                          title="Página de Captura Defiverso"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <a
                            href="https://news.defiverso.com"
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

            {/* Seção específica para o Defiverso - Instagram */}
            {caseData.id === "defiverso" && (
              <motion.section
                id="instagram-defiverso"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-4xl"
              >
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Instagram Defiverso
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Desenvolvemos toda a estratégia de social media do Defiverso no <strong>Instagram</strong>, criando conteúdo educativo de ponta que transforma informações complexas de mercado em conteúdo acessível e de alto valor. Nossa abordagem focada em crescimento orgânico e engajamento real resultou em números impressionantes.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      A estratégia incluiu desenvolvimento de identidade visual, calendário editorial estratégico e gestão completa das plataformas, sempre priorizando a entrega de valor real para a comunidade.
                    </p>
                    <div className="bg-black rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-bold text-[#7CF067] mb-3">
                        Resultados do Instagram (90 dias)
                      </h3>
                      <ul className="space-y-2 text-white">
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>12 Milhões de Visualizações</strong> de Alcance Orgânico (+28,4% de crescimento)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>302.9 Mil contas</strong> de Alcance Total</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>136.9 Mil interações</strong> com conteúdo (curtidas, comentários, salvos e compartilhamentos)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>14.4 Mil cliques no link</strong> (tráfego qualificado)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>8.6 Mil novos seguidores</strong> em apenas 3 meses</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        @defiverso
                      </h3>
                      <p className="text-sm text-gray-600">
                        Acompanhe o crescimento e engajamento no Instagram
                      </p>
                    </div>
                    <a
                      href="https://www.instagram.com/defiverso/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black text-[#7CF067] px-6 py-3 rounded-lg hover:bg-gray-900 transition-all font-medium border border-[#7CF067]"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Ver no Instagram
                    </a>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Seção específica para o Defiverso - Newsletter */}
            {caseData.id === "defiverso" && (
              <motion.section
                id="newsletter-defiverso"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="max-w-4xl"
              >
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Newsletter Defiverso
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Criamos a <strong>Newsletter Defiverso</strong> do zero, desenvolvendo toda a estratégia de conteúdo, design e automação. A newsletter semanal se tornou um canal essencial para nutrir leads e manter a comunidade engajada com análises exclusivas do mercado cripto.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Com uma abordagem focada em entregar valor real a cada edição, conseguimos estabelecer uma base de assinantes altamente engajada, com taxas de abertura que superam amplamente as médias do mercado.
                    </p>
                    <div className="bg-black rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-bold text-[#7CF067] mb-3">
                        Resultados da Newsletter
                      </h3>
                      <ul className="space-y-2 text-white">
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          {/* 26.556 e 33,01% são os valores de KALEIDOS_PROOF.defiversoNewsletter
                              (Beehiiv, 11/2025). Estavam aqui como 26.554 / "33.01%" — o 26.554 é o
                              erro de transcrição que metrics.ts registra ter sido corrigido em 19/08,
                              e a grafia com ponto é EN numa página PT. Corrigido em 26/08/2026. */}
                          <span><strong>26.556 assinantes ativos</strong> em crescimento constante</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>Taxa de Abertura Média de 33,01%</strong> - muito acima da média do mercado (15-25%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span>Engajamento consistente que transforma assinantes em clientes e comunidade</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span>Newsletter semanal com análises exclusivas e insights do mercado cripto</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Métricas Visuais da Newsletter */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Métricas da Newsletter
                  </h3>
                  <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="/Cases/defiverso/estudo/metricas-newsletter.png"
                      alt="Métricas da Newsletter Defiverso"
                      width={1600}
                      height={900}
                      sizes="(max-width: 1024px) 100vw, 896px"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-4 font-medium">
                      news.defiverso.com
                    </p>
                    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <iframe
                        src="https://news.defiverso.com"
                        className="w-full h-full"
                        title="Newsletter Defiverso"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      />
                      <div className="absolute top-4 right-4">
                        <a 
                          href="https://news.defiverso.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-black text-[#7CF067] px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors font-medium border border-[#7CF067]"
                        >
                          Abrir
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Seção específica para o Defiverso - Minicurso 7 Dias DeFi */}
            {caseData.id === "defiverso" && (
              <motion.section
                id="minicurso-defiverso"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="max-w-4xl"
              >
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Minicurso 7 Dias DeFi
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Desenvolvemos o <strong>Minicurso 7 Dias DeFi</strong>, um lead magnet gratuito enviado por email que se tornou nossa maior ferramenta de aquisição de leads. O curso foi estruturado em 7 lições diárias, cada uma focada em aspectos fundamentais das finanças descentralizadas.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      A estratégia foi simples: criar valor real para o público, estabelecendo o Defiverso como autoridade em educação cripto, enquanto transformávamos visitantes em leads qualificados através de uma página de captura otimizada.
                    </p>
                    <div className="bg-black rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-bold text-[#7CF067] mb-3">
                        Resultados do Minicurso
                      </h3>
                      <ul className="space-y-2 text-white">
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>Mais de 29.000 inscrições</strong> em pouco tempo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>Taxa de Abertura no pico: 54.76%</strong> - resultado excepcional que demonstra o engajamento com o conteúdo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span><strong>Taxa de Cliques (CTR) no pico: 24.55%</strong> - conversão impressionante que direciona tráfego qualificado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#7CF067] font-bold">•</span>
                          <span>Maior lead magnet do Defiverso, estabelecendo a marca como referência em educação cripto</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-4 font-medium">
                      defiverso.com/7-dias-defi/
                    </p>
                    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <iframe
                        src="https://defiverso.com/7-dias-defi/"
                        className="w-full h-full"
                        title="Minicurso 7 Dias DeFi - Defiverso"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      />
                      <div className="absolute top-4 right-4">
                        <a 
                          href="https://defiverso.com/7-dias-defi/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-black text-[#7CF067] px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors font-medium border border-[#7CF067]"
                        >
                          Abrir
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Seção específica para o Defiverso - Twitter */}
            {caseData.id === "defiverso" && (
              <motion.section
                id="optimization-defiverso"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="max-w-4xl"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Twitter
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#7CF067] rounded-full"></span>
                      Automação no Twitter
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Implementamos um fluxo de automação via Inteligência Artificial que garante a presença constante da marca no Twitter, replicando o conteúdo de valor do YouTube e da Newsletter com <em>Call to Action</em> (CTA) para a continuidade do consumo, otimizando o tempo da equipe.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src="/Cases/defiverso/estudo/tweet-automacao.png"
                          alt="Tweet de Automação do Twitter"
                          width={1200}
                          height={800}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src="/Cases/defiverso/estudo/tweet-resultado.png"
                          alt="Tweet de Resultado do Twitter"
                          width={1200}
                          height={800}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Seção específica para o Defiverso - Conclusão */}
            {caseData.id === "defiverso" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="max-w-4xl"
              >
                <div className="bg-black rounded-xl p-8 border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-[#7CF067]">
                    Conclusão do Case
                  </h2>
                  <div className="space-y-4 text-lg text-white">
                    <p>
                      A parceria Kaleidos e Defiverso resultou na criação de um ecossistema de marketing digital completo e de alta performance.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>No <strong>Instagram</strong>, transformamos a conta em um motor de <strong>crescimento orgânico</strong> e <strong>engajamento massivo</strong>.</li>
                      <li>No <strong>Email Marketing</strong>, construímos uma <strong>máquina de aquisição de leads</strong> com mais de <strong>29 mil inscrições</strong> e taxas de abertura que superam em muito a média do mercado.</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#7CF067]">
                      Estes resultados concretos e o volume de dados demonstram a capacidade da Kaleidos de entregar não apenas conteúdo de qualidade, mas também <strong>crescimento sustentável e conversão em escala</strong> para o Defiverso.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Resultados */}
            <motion.section
              id="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: caseData.id === "defiverso" ? 0.6 : 0.3 }}
              className="max-w-4xl"
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900">
                {t('case','results')}
              </h2>
              
              <div className="space-y-8">
                {/* Frase Impactante */}
                {fraseText && (
                  <div className="border-l-4 border-[#7CF067] pl-6 py-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {t('case','highlightedResult')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {parseMarkdown(fraseText)}
                    </p>
                  </div>
                )}

                {/* Estatísticas */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900">
                    {t('case','successMetrics')}
                  </h3>
                  <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                    {metricasText.split('\n\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <div key={index} className="mb-4 last:mb-0">
                          {paragraph.split('\n').map((line, lineIndex) => {
                            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                              return (
                                <div key={lineIndex} className="mb-2 ml-4">
                                  {parseMarkdown(line.trim())}
                                </div>
                              );
                            }
                            return (
                              <p key={lineIndex} className="mb-2">
                                {parseMarkdown(line.trim())}
                              </p>
                            );
                          })}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Links do projeto/case */}
            {links.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-4xl"
              >
                 <h2 className="text-2xl font-bold mb-8 text-gray-900">
                   {t('case','links')}
                </h2>
                <div className="space-y-3">
                  {links.map((link: string, index: number) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-lg text-[#7CF067] hover:text-[#6BE85A] transition-colors group py-2"
                    >
                      <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      <span className="break-all">
                        {link.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar com informações do projeto */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Informações do projeto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Categoria */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Categoria
                  </h3>
                  <p className="text-gray-900 text-lg">
                    {caseData.tags?.join(', ') || 'Marketing Digital'}
                  </p>
                </div>

                {/* Serviços */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Serviços
                  </h3>
                  <div className="space-y-2">
                    {(isEn && caseData.servicos_en ? caseData.servicos_en : caseData.servicos || []).map((servico, index) => {
                      // Tags de serviço como rótulos (sem link): a navegação por âncora
                      // dava "clique morto" quando a seção alvo não existia naquele case.
                      const sectionId = getServiceSectionId(servico, caseData.id);
                      if (sectionId) {
                        return (
                          <a
                            key={index}
                            href={`#${sectionId}`}
                            onClick={(e) => {
                              const element = document.getElementById(sectionId);
                              if (!element) return; // sem âncora → deixa o tag inerte (sem clique morto)
                              e.preventDefault();
                              const offset = 64 + 120 + 24;
                              const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
                            }}
                            className="text-gray-700 text-base hover:text-[#3d9e32] transition-colors block"
                          >
                            {servico}
                          </a>
                        );
                      }
                      return (
                        <p key={index} className="text-gray-700 text-base">
                          {servico}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA de conversão — fecha o case com um caminho pra falar com a Kaleidos */}
      <section className="bg-[#0A0A0A] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {isEn ? "Want results like these?" : "Quer um resultado desses?"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            {isEn
              ? "Let's build the marketing of your crypto/web3 project together."
              : "Vamos construir juntos o marketing do seu projeto cripto ou web3."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/5512997796835?text=${encodeURIComponent(isEn ? "Hi Kaleidos, I saw a case study and want to talk." : "Oi Kaleidos, vi um case e quero falar com vocês.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7CF067] px-8 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-95"
            >
              {isEn ? "Talk on WhatsApp" : "Falar no WhatsApp"}
            </a>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              {isEn ? "Book a meeting" : "Agendar reunião"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterDemo />
    </div>
  );
} 