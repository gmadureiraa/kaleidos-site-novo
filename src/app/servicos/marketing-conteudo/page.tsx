"use client";
import Image from "next/image";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { WordRotate } from "@/components/magicui/word-rotate";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import { FooterDemo } from "@/components/ui/footer-demo";
import { generateServiceSchema } from "@/lib/seo-helpers";
import { useAnalytics } from "@/components/analytics";

/* Kaleidos tokens — cru #FAFAFA · ink #14110D · verde #7CF067 · rosa #D262B2 */
const INK = "#14110D";
const GREEN = "#7CF067";
const GREEN_DEEP = "#2F7D27";
const PINK = "#D262B2";

function DotGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        backgroundImage: dark
          ? "radial-gradient(#ffffff22 1.3px,transparent 1.5px)"
          : `linear-gradient(${INK}0d 1px,transparent 1px),linear-gradient(90deg,${INK}0d 1px,transparent 1px)`,
        backgroundSize: dark ? "18px 18px" : "34px 34px",
        opacity: dark ? 0.5 : 1,
      }}
      aria-hidden
    />
  );
}

export default function KaleidosContentPage() {
  const { locale } = useI18n();
  const { trackWhatsApp } = useAnalytics();
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api, isPaused]);

  const handleWhatsApp = () => {
    const message = locale==='en' ? "Hello! I need Kaleidos Content to create content that goes viral. Can you help me?" : "Olá! Preciso da ajuda da Kaleidos Content para criar conteúdo que viraliza. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Track WhatsApp click (Google Analytics)
    trackWhatsApp("servico_marketing_conteudo", "service_page");

    window.open(whatsappUrl, '_blank');
  };

  const serviceSchema = generateServiceSchema(
    "Marketing de Conteúdo",
    "Criação de conteúdo criativo que faz sua audiência parar e pensar. Copy persuasiva, roteiros virais, edição de vídeos e estratégias que convertem."
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FAFAFA] px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <DotGrid />
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute right-[8%] top-[18%] hidden w-16 [animation:spin_14s_linear_infinite] md:block"
          aria-hidden
        >
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={GREEN} />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-[6%] bottom-[14%] hidden w-10 [animation:spin_9s_linear_infinite_reverse] md:block"
          aria-hidden
        >
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={PINK} />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="mb-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-[#14110D] sm:text-sm"
              style={{ boxShadow: `3px 3px 0 ${GREEN}` }}
            >
              <span className="font-accent uppercase tracking-[0.22em]">Kaleidos Content</span>
            </span>

            <h1 className="font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-[#14110D] sm:text-5xl md:text-6xl">
              {locale==='en' ? 'Content that makes people' : 'Conteúdo que faz parar'}{" "}
              <span style={{ color: GREEN_DEEP }}>{locale==='en' ? 'stop and think.' : 'e pensar.'}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5c544a] sm:text-lg">
              {locale==='en' ? 'Content that makes your audience stop and think: ' : 'Conteúdo que faz sua audiência parar e pensar: '}
              <span className="font-semibold text-[#14110D]">{locale==='en' ? '“That\'s brilliant!”' : '“Que genial!”'}</span>
            </p>

            {/* Word Rotate Section */}
            <div className="mt-8 mb-8">
              <p className="font-accent text-xs uppercase tracking-[0.22em] text-[#A8458C] mb-3">{locale==='en' ? 'We do:' : 'Nós fazemos:'}</p>
              <div>
                <WordRotate
                  className="font-display text-2xl md:text-3xl font-bold text-[#14110D]"
                  words={locale==='en' ? ["Unique Content!", "Persuasive Copy", "Viral Scripts", "Video Editing", "Email Marketing", "Design", "Branding"] : ["Conteúdo Único!", "Copy Persuasiva", "Roteiros Virais", "Edição de vídeos", "Email Marketing", "Design", "Branding"]}
                  duration={3000}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
              <Button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 rounded-full bg-[#14110D] px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: `5px 5px 0 ${GREEN}` }}
              >
                {locale==='en' ? 'Start now' : 'Começar agora'}
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="bg-white px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-[#14110D]">
              {locale==='en' ? 'What we can do' : 'O que podemos fazer'}
            </h2>
            <p className="text-[#5c544a] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale==='en' ? 'Data‑driven content that turns your marketing into real results' : 'Conteúdo fundamentado em dados que transforma seu marketing em resultados reais'}
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* First Row - Content Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-[#14110D]">
                    {locale==='en' ? 'We create content that goes viral' : 'Criamos conteúdo que viraliza'}
                  </h3>
                  <p className="text-[#5c544a] text-lg leading-relaxed">
                    {locale==='en' ? (
                      <>
                        We develop <strong className="text-[#14110D]">custom content</strong> that turns your brand into an engagement machine. Our approach combines <strong className="text-[#14110D]">advanced copywriting</strong>, <strong className="text-[#14110D]">smart scripts</strong> and <strong className="text-[#14110D]">creative editing</strong> to create content people want to consume and share.
                      </>
                    ) : (
                      <>
                        Desenvolvemos <strong className="text-[#14110D]">conteúdo personalizado</strong> que transforma sua marca em uma máquina de engajamento. Nossa abordagem combina <strong className="text-[#14110D]">copywriting avançado</strong>, <strong className="text-[#14110D]">roteiros inteligentes</strong> e <strong className="text-[#14110D]">edição criativa</strong> para criar conteúdo que as pessoas querem consumir e compartilhar.
                      </>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#14110D]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">Copywriting</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Persuasive texts that turn visitors into customers, using advanced sales psychology techniques.' : 'Textos persuasivos que convertem visitantes em clientes, usando técnicas avançadas de psicologia de vendas.'}</p>
                  </div>
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#14110D]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Scripts' : 'Roteiros'}</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Smart scripts that capture attention from the first seconds and keep engagement high.' : 'Scripts inteligentes que capturam atenção desde os primeiros segundos e mantêm o engajamento.'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-2">
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>{locale==='en' ? KALEIDOS_METRICS.videosEditados_en : KALEIDOS_METRICS.videosEditados}</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Edited videos' : 'Vídeos editados'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>{locale==='en' ? KALEIDOS_METRICS.viewsReels_en : KALEIDOS_METRICS.viewsReels}</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Reels views' : 'Views nos reels'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>{locale==='en' ? KALEIDOS_METRICS.designsCriados_en : KALEIDOS_METRICS.designsCriados}</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Design assets' : 'Peças de Design'}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-white shadow-[8px_8px_0_#14110D]">
                  <Image
                    src="/Kaleidos/elementos/KaleidosContent.png"
                    alt="Kaleidos Content - Conteúdo em Ação"
                    width={1600}
                    height={900}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Second Row - Design & Video Editing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-white shadow-[8px_8px_0_#D262B2]">
                  <Image
                    src="/Kaleidos/elementos/KaleidosDesign.png"
                    alt="Kaleidos Content - Design & Edição"
                    width={1600}
                    height={900}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-[#14110D]">
                    {locale==='en' ? 'Design and editing that impress' : 'Design e edição que impressionam'}
                  </h3>
                  <p className="text-[#5c544a] text-lg leading-relaxed">
                    {locale==='en' ? (
                      <>
                        We create <strong className="text-[#14110D]">unique designs</strong> and <strong className="text-[#14110D]">cinematic edits</strong> that make your brand stand out. Our team specialized in <strong className="text-[#14110D]">After Effects</strong>, <strong className="text-[#14110D]">motion graphics</strong> and <strong className="text-[#14110D]">color grading</strong> transforms simple videos into memorable visual experiences that go viral naturally.
                      </>
                    ) : (
                      <>
                        Criamos <strong className="text-[#14110D]">designs únicos</strong> e <strong className="text-[#14110D]">edições cinematográficas</strong> que fazem sua marca se destacar. Nossa equipe especializada em <strong className="text-[#14110D]">After Effects</strong>, <strong className="text-[#14110D]">motion graphics</strong> e <strong className="text-[#14110D]">correção de cor</strong> transforma vídeos simples em experiências visuais memoráveis que viralizam naturalmente.
                      </>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#D262B2]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">Motion Graphics</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Animations and visual effects that capture attention and deliver your message with impact.' : 'Animações e efeitos visuais que capturam atenção e transmitem sua mensagem de forma impactante.'}</p>
                  </div>
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#D262B2]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Creative Editing' : 'Edição Criativa'}</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Dynamic cuts, smooth transitions and cinematic rhythm that keep viewers engaged.' : 'Cortes dinâmicos, transições suaves e ritmo cinematográfico que mantêm o espectador engajado.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que entregamos */}
      <section className="bg-[#FAFAFA] px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="mb-4 inline-block font-accent text-xs uppercase tracking-[0.22em]" style={{ color: GREEN_DEEP }}>
              {locale === 'en' ? 'Deliverables' : 'Entregáveis'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-[#14110D]">
              {locale === 'en' ? 'What we deliver in Content' : 'O que entregamos no Conteúdo'}
            </h2>
            <p className="text-[#5c544a] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale === 'en' ? 'The concrete things we hand over, month after month.' : 'As coisas concretas que entregamos, mês após mês.'}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(locale === 'en' ? [
              'Persuasive copywriting (posts, ads, pages)',
              'Scripts for Reels, YouTube and videos',
              'Video editing and motion graphics',
              'Post and carousel design',
              'Visual identity and branding',
              'Email marketing and newsletters',
              'Editorial calendar and content line',
              'SEO content and blog',
              'Landing pages and conversion assets',
              'Creative direction and campaign concept',
              'Color grading and cinematic finishing',
              'Creative bank for performance',
            ] : [
              'Copywriting persuasivo (posts, anúncios, páginas)',
              'Roteiros pra Reels, YouTube e vídeos',
              'Edição de vídeos e motion graphics',
              'Design de posts e carrosséis',
              'Identidade visual e branding',
              'Email marketing e newsletters',
              'Calendário e linha editorial',
              'Conteúdo SEO e blog',
              'Landing pages e materiais de conversão',
              'Direção criativa e conceito de campanha',
              'Correção de cor e finalização cinematográfica',
              'Banco de criativos pra performance',
            ]).map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border-[1.5px] border-[#14110D] bg-white p-5 shadow-[5px_5px_0_#14110D]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#14110D]" style={{ background: GREEN }}>
                  <Check className="h-4 w-4 text-[#14110D]" />
                </span>
                <span className="text-sm font-medium leading-snug text-[#14110D]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="problems-section" className="relative overflow-hidden bg-[#14110D] px-6 py-20 sm:py-28">
        <DotGrid dark />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="mb-4 inline-block font-accent text-xs uppercase tracking-[0.22em]" style={{ color: GREEN }}>
              {locale==='en' ? 'Portfolio' : 'Portfólio'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-white">
              {locale==='en' ? 'Our Work' : 'Nossos Trabalhos'}
            </h2>
            <p className="text-[#b8b1a6] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale==='en' ? 'Edited videos, created designs and content that goes viral' : 'Vídeos editados, designs criados e conteúdo que viraliza'}
            </p>
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
              containScroll: "trimSnaps",
            }}
            setApi={setApi}
            className="w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent className="-ml-1 md:-ml-2">
              {[
                // Bit das Minas - Vídeos
                "/Cases/bit-das-minas/conteudo/Reels-1-Gi-2.mp4",
                "/Cases/bit-das-minas/conteudo/Reels-3-Gi.mp4",

                // Layla Foz - Vídeos
                "/Cases/layla-foz/conteudo/Reels-1-Layla-1.mp4",
                "/Cases/layla-foz/conteudo/Reels-2-Layla-1.mp4",

                // Investidor 4.20 - Vídeos
                "/Cases/investidor-4-20/conteudo/Reels-1-Lucas-1.mp4",
                "/Cases/investidor-4-20/conteudo/Reels-3-Lucas.mp4",

                // Yasmin - Vídeos
                "/Cases/yasmin/conteudo/Reels-1-Yasmin-1.mp4",
                "/Cases/yasmin/conteudo/Reels-3-Yasmin.mp4",

                // Paradigma Education - Vídeos
                "/Cases/paradigma/conteudo/PARADIGMAv2.mp4",
                "/Cases/paradigma/conteudo/20250620_PARADIGMA_01M06S_V3.mp4",

                // Defifest - Imagens
                "/Cases/defifest/conteudo/1.png",
                "/Cases/defifest/conteudo/10.png",

                // Jornal Cripto - Imagens
                "/Cases/jornal-cripto/conteudo/1-2.png",
                "/Cases/jornal-cripto/conteudo/2-1.png",
              ].map((src, idx) => {
                const isImage = src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg');

                return (
                  <CarouselItem key={idx} className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-center items-center cursor-pointer group"
                        onClick={() => {
                          const modal = document.createElement('div');
                          modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';

                          const wrapper = document.createElement('div');
                          wrapper.className = 'relative';

                          const closeBtn = document.createElement('button');
                          closeBtn.className = 'absolute -top-10 right-0 text-white text-2xl hover:text-gray-300';
                          closeBtn.textContent = '×';
                          closeBtn.onclick = () => modal.remove();

                          let mediaEl: HTMLElement;
                          if (isImage) {
                            const img = document.createElement('img');
                            img.src = src;
                            img.alt = 'Trabalho expandido';
                            img.className = 'max-w-full max-h-[80vh] object-contain';
                            mediaEl = img;
                          } else {
                            const video = document.createElement('video');
                            video.src = src;
                            video.controls = true;
                            video.autoplay = true;
                            video.loop = true;
                            video.muted = true;
                            video.className = 'max-w-full max-h-[80vh] object-contain';
                            mediaEl = video;
                          }

                          wrapper.appendChild(closeBtn);
                          wrapper.appendChild(mediaEl);
                          modal.appendChild(wrapper);
                          modal.onclick = (e) => {
                            if (e.target === modal) modal.remove();
                          };
                          document.body.appendChild(modal);
                        }}
                      >
                        <div className="relative w-full max-w-[280px] h-[400px] rounded-2xl overflow-hidden border-[1.5px] border-white/15 bg-black group-hover:scale-[1.03] transition-transform duration-300">
                          {isImage ? (
                            <Image
                              src={src}
                              alt="Trabalho de edição e design"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 280px"
                              className="object-cover"
                            />
                          ) : (
                            <video
                              src={src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-11 w-11 border-[1.5px] border-[#14110D] bg-white text-[#14110D] hover:bg-[#7CF067] sm:-left-12 sm:h-10 sm:w-10" />
            <CarouselNext className="right-1 h-11 w-11 border-[1.5px] border-[#14110D] bg-white text-[#14110D] hover:bg-[#7CF067] sm:-right-12 sm:h-10 sm:w-10" />
          </Carousel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
              style={{ background: GREEN, boxShadow: `5px 5px 0 #FFFFFF` }}
            >
              {locale==='en' ? 'I want content like this' : 'Quero Conteúdo Assim'}
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterDemo />
    </main>
  );
}
