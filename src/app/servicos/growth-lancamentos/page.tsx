"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, BarChart3, DollarSign, Users, CheckCircle, Zap } from "lucide-react";
import CardFlip from "@/components/kokonutui/card-flip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER, CALENDLY_URL } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import Image from "next/image";
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

export default function KaleidosGrowthPage() {
  const { locale } = useI18n();
  const { trackWhatsApp, trackClick } = useAnalytics();
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

  const serviceSchema = generateServiceSchema(
    "Growth Strategy & Lançamentos",
    "Estratégias de lançamento e crescimento que viralizam e vendem. Desenvolvimento de funis, campanhas e estratégias de crescimento para sua marca."
  );

  const handleWhatsApp = () => {
    const message = locale==='en' ? 'Hello! I need Kaleidos Growth to create a viral launch. Can you help me?' : "Olá! Preciso da ajuda da Kaleidos Growth para criar um lançamento viral. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Track WhatsApp click (Google Analytics)
    trackWhatsApp("servico_growth_lancamentos", "service_page");

    window.open(whatsappUrl, '_blank');
  };

  const handleCalendly = (where: string) => {
    trackClick(`calendly_${where}`, "service-growth-lancamentos");
  };

  const handleWhatsAppSpecific = (service: string) => {
    const message = `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Track WhatsApp click (Google Analytics)
    trackWhatsApp("servico_growth_lancamentos", `service_${service}`);

    window.open(whatsappUrl, '_blank');
  };

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
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={PINK} />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-[6%] bottom-[14%] hidden w-10 [animation:spin_9s_linear_infinite_reverse] md:block"
          aria-hidden
        >
          <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={GREEN} />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="mb-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-[#14110D] sm:text-sm"
              style={{ boxShadow: `3px 3px 0 ${PINK}` }}
            >
              <span className="font-accent uppercase tracking-[0.22em]">Kaleidos Growth</span>
            </span>

            <h1 className="font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-[#14110D] sm:text-5xl md:text-6xl">
              {locale==='en' ? 'Launches that go viral' : 'Lançamentos que viralizam'}{" "}
              <span style={{ color: GREEN_DEEP }}>{locale==='en' ? 'and sell.' : 'e vendem.'}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5c544a] sm:text-lg">
              {locale==='en' ? 'Launches that go viral and actually sell. Organic growth strategies on social that turn products into phenomena.' : 'Lançamentos que viralizam e vendem de verdade. Estratégias de growth orgânico nas redes que transformam produtos em fenômenos.'}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCalendly("hero")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14110D] px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: `5px 5px 0 ${PINK}` }}
              >
                {locale==='en' ? 'Book a free diagnosis (30min)' : 'Agendar diagnóstico gratuito (30min)'}
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
              >
                {locale==='en' ? 'Prefer WhatsApp?' : 'Prefere WhatsApp?'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section id="what-we-can-do" className="bg-white px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-[#14110D]">
              {locale==='en' ? 'The Explosive Growth Formula' : 'A Fórmula do Crescimento Explosivo'}
            </h2>
            <p className="text-[#5c544a] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale==='en' ? 'Launches that sell and organic growth that builds loyal audiences' : 'Lançamentos que vendem e growth orgânico que constrói audiências fiéis'}
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* First Row - Strategy & Creatives */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-[#14110D]">
                    {locale==='en' ? 'Launches that go viral' : 'Lançamentos que viralizam'}
                  </h3>
                  <p className="text-[#5c544a] text-lg leading-relaxed">
                    {locale==='en' ? (
                      <>We develop <strong className="text-[#14110D]">tailored launch strategies</strong> that turn products into sales phenomena. Our approach combines <strong className="text-[#14110D]">strategic planning</strong>, <strong className="text-[#14110D]">creatives that convert</strong> and <strong className="text-[#14110D]">smart automations</strong> to create launches that actually sell.</>
                    ) : (
                      <>Desenvolvemos <strong className="text-[#14110D]">estratégias de lançamento personalizadas</strong> que transformam produtos em fenômenos de vendas. Nossa abordagem combina <strong className="text-[#14110D]">planejamento estratégico</strong>, <strong className="text-[#14110D]">criativos que convertem</strong> e <strong className="text-[#14110D]">automações inteligentes</strong> para criar lançamentos que vendem de verdade.</>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#D262B2]">
                     <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Launch Strategy' : 'Estratégia de Lançamento'}</h4>
                     <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Complete planning that sells, from concept to post‑sale.' : 'Planejamento completo que vende, desde a concepção até o pós-venda.'}</p>
                  </div>
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#7CF067]">
                     <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Creatives that Convert' : 'Criativos que Convertem'}</h4>
                     <p className="text-[#5c544a] text-sm leading-relaxed">{locale==='en' ? 'Ads that stop the scroll and generate real conversions.' : 'Anúncios que param o scroll e geram conversões reais.'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-2">
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>{locale==='en' ? KALEIDOS_METRICS.lancamentos_en : KALEIDOS_METRICS.lancamentos}</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Launches' : 'Lançamentos'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>125M+</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Views generated' : 'Views gerados'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>{locale==='en' ? 'Since 2020' : 'Desde 2020'}</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'In crypto' : 'No mercado cripto'}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-white shadow-[8px_8px_0_#D262B2]">
                  <Image
                    src="/Kaleidos/elementos/KaleidosLaunch.png"
                    alt="Kaleidos Launch - Lançamentos em Ação"
                    width={1600}
                    height={900}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
            </div>

            {/* Second Row - Automation & Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#14110D] bg-white shadow-[8px_8px_0_#7CF067]">
                  <Image
                    src="/Kaleidos/elementos/KaleidosGrowth.png"
                    alt="Kaleidos Growth - Growth Orgânico"
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
                    {locale==='en' ? 'Organic growth on social networks' : 'Growth orgânico nas redes sociais'}
                  </h3>
                  <p className="text-[#5c544a] text-lg leading-relaxed">
                    {locale==='en' ? (<>We build <strong className="text-[#14110D]">loyal organic audiences</strong> and <strong className="text-[#14110D]">sustainable growth</strong> on social. Our strategy of <strong className="text-[#14110D]">organic content</strong> and <strong className="text-[#14110D]">authentic engagement</strong> makes your brand grow naturally and durably.</>) : (<>Construímos <strong className="text-[#14110D]">audiências orgânicas fiéis</strong> e <strong className="text-[#14110D]">crescimento sustentável</strong> nas redes sociais. Nossa estratégia de <strong className="text-[#14110D]">conteúdo orgânico</strong> e <strong className="text-[#14110D]">engajamento autêntico</strong> garante que sua marca cresça de forma natural e duradoura.</>)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#D262B2]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Organic Content' : 'Conteúdo Orgânico'}</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">
                      {locale==='en' ? 'Content strategies that grow naturally on social.' : 'Estratégias de conteúdo que crescem naturalmente nas redes.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border-[1.5px] border-[#14110D] bg-white p-6 shadow-[5px_5px_0_#7CF067]">
                    <h4 className="font-display text-lg font-bold text-[#14110D] mb-3">{locale==='en' ? 'Real Engagement' : 'Engajamento Real'}</h4>
                    <p className="text-[#5c544a] text-sm leading-relaxed">
                      {locale==='en' ? 'Building authentic relationships with the audience.' : 'Construção de relacionamentos autênticos com a audiência.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-2">
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>24/7</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Presence' : 'Presença'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>120+</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Pieces / month' : 'Peças por mês'}</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: GREEN_DEEP }}>8</div>
                    <div className="text-sm text-[#5c544a]">{locale==='en' ? 'Active clients' : 'Clientes ativos'}</div>
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
              {locale === 'en' ? 'What we deliver in Growth & Launches' : 'O que entregamos em Growth & Lançamentos'}
            </h2>
            <p className="text-[#5c544a] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale === 'en' ? 'The concrete things we hand over, launch after launch.' : 'As coisas concretas que entregamos, lançamento após lançamento.'}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(locale === 'en' ? [
              'Full launch strategy (concept → post-sale)',
              'Funnel mapping and buyer journey',
              'Scroll-stopping ad creatives',
              'Sales copy and conversion pages',
              'Email sequences and automations',
              'Organic growth strategy on social',
              'Pre-launch content calendar',
              'Audience segmentation and qualification',
              'Campaign setup and tracking (pixel, UTMs)',
              'A/B testing and continuous optimization',
              'Dashboards and real-time metrics',
              'ROI report and next steps',
            ] : [
              'Estratégia completa de lançamento (concepção → pós-venda)',
              'Mapeamento de funil e jornada de compra',
              'Criativos de anúncio que param o scroll',
              'Copy de vendas e páginas de conversão',
              'Sequências de email e automações',
              'Estratégia de growth orgânico nas redes',
              'Calendário de conteúdo pré-lançamento',
              'Segmentação e qualificação de público',
              'Setup de campanhas e tracking (pixel, UTMs)',
              'Testes A/B e otimização contínua',
              'Dashboards e métricas em tempo real',
              'Relatório de ROI e próximos passos',
            ]).map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border-[1.5px] border-[#14110D] bg-white p-5 shadow-[5px_5px_0_#14110D]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#14110D]" style={{ background: GREEN }}>
                  <CheckCircle className="h-4 w-4 text-[#14110D]" />
                </span>
                <span className="text-sm font-medium leading-snug text-[#14110D]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative overflow-hidden bg-[#14110D] px-6 py-20 sm:py-28">
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
              {locale==='en' ? 'Problem → Solution' : 'Problema → Solução'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-white">
              {locale==='en' ? 'Problems we Solve' : 'Problemas que Resolvemos'}
            </h2>
            <p className="text-[#b8b1a6] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale==='en' ? 'We identify and solve the problems that prevent your launches from going viral' : 'Identificamos e resolvemos os problemas que impedem seus lançamentos de viralizar'}
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
                {
                  front: {
                     title: locale==='en' ? 'Low Sales' : 'Vendas Baixas',
                     description: locale==='en' ? 'Launches that do not reach sales potential' : 'Lançamentos que não atingem o potencial de vendas',
                    icon: BarChart3,
                  },
                  back: {
                     title: locale==='en' ? 'Sales Strategy' : 'Estratégia de Vendas',
                     description: locale==='en' ? 'Complete system that maximizes conversions' : 'Sistema completo que maximiza conversões',
                     features: locale==='en' ? ["Optimized funnel", "Persuasive copy", "Real urgency"] : ["Funil otimizado", "Copy persuasiva", "Urgência real"],
                     service: locale==='en' ? 'launches and sales' : "lançamentos e vendas",
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Unqualified Audience' : 'Público Não Qualificado',
                     description: locale==='en' ? 'Audience that is not ready to buy' : 'Audiência que não está pronta para comprar',
                    icon: Target,
                  },
                  back: {
                     title: locale==='en' ? 'Smart Segmentation' : 'Segmentação Inteligente',
                     description: locale==='en' ? 'Identification and attraction of the ideal audience' : 'Identificação e atração do público ideal',
                     features: locale==='en' ? ["Defined persona", "Automatic qualification", "Effective warming"] : ["Persona definida", "Qualificação automática", "Aquecimento eficaz"],
                     service: locale==='en' ? 'audience segmentation' : "segmentação de público",
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Campaigns that do not Convert' : 'Campanhas que não Convertem',
                     description: locale==='en' ? 'Ads that do not generate results' : 'Anúncios que não geram resultados',
                    icon: TrendingUp,
                  },
                  back: {
                     title: locale==='en' ? 'Creatives that Convert' : 'Criativos que Convertem',
                     description: locale==='en' ? 'Ads that stop the scroll and sell' : 'Anúncios que param o scroll e vendem',
                     features: locale==='en' ? ["Irresistible copy", "Impactful visuals", "Effective call‑to‑action"] : ["Copy irresistível", "Visual impactante", "Call-to-action eficaz"],
                     service: locale==='en' ? 'creatives that convert' : "criativos que convertem",
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Negative ROI' : 'ROI Negativo',
                     description: locale==='en' ? 'Marketing investment with no return' : 'Investimento em marketing sem retorno',
                    icon: DollarSign,
                  },
                  back: {
                     title: locale==='en' ? 'ROI-Focused' : 'Foco em ROI Positivo',
                     description: locale==='en' ? 'Systems that pay for themselves' : 'Sistemas que pagam por si mesmos',
                     features: locale==='en' ? ["Continuous optimization", "Real‑time metrics", "Measurable results"] : ["Otimização contínua", "Métricas em tempo real", "Resultados mensuráveis"],
                     service: locale==='en' ? 'positive ROI' : "ROI positivo",
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Unengaged Audience' : 'Audiência Não Engajada',
                     description: locale==='en' ? 'Followers who do not interact or buy' : 'Seguidores que não interagem ou compram',
                    icon: Users,
                  },
                  back: {
                     title: locale==='en' ? 'Active Community' : 'Comunidade Ativa',
                     description: locale==='en' ? 'Audience that loves and buys your products' : 'Audiência que ama e compra seus produtos',
                     features: locale==='en' ? ["Real engagement", "Authentic relationship", "Loyalty"] : ["Engajamento real", "Relacionamento autêntico", "Fidelização"],
                     service: locale==='en' ? 'audience engagement' : "engajamento de audiência",
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Ineffective Strategies' : 'Estratégias Ineficazes',
                     description: locale==='en' ? 'Methods that do not work for your niche' : 'Métodos que não funcionam para seu nicho',
                    icon: Zap,
                  },
                  back: {
                     title: locale==='en' ? 'Proven Formula' : 'Fórmula Comprovada',
                     description: locale==='en' ? 'Tested and validated strategies' : 'Estratégias testadas e validadas',
                     features: locale==='en' ? ["Proven methodology", "A/B testing", "Measurable results"] : ["Metodologia comprovada", "Testes A/B", "Resultados mensuráveis"],
                     service: locale==='en' ? 'effective strategies' : "estratégias eficazes",
                  }
                }
              ].map((card, index) => {
                // Alterna ecos da paleta de marca (rosa / verde) nos blobs do CardFlip.
                // Cartões claros (sem onDark) pra contrastar com a banda ink.
                const isPink = index % 2 === 0;
                const frontGrad = isPink ? "from-pink-500 to-pink-600" : "from-emerald-500 to-emerald-600";
                const borderC = isPink ? "border-[#D262B2]" : "border-[#7CF067]";
                return (
                <CarouselItem key={index} className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.12,
                      }}
                      viewport={{ once: true }}
                    >
                      <CardFlip
                        title={card.front.title}
                        backTitle={card.back.title}
                        subtitle={card.front.description}
                        description={card.back.description}
                        features={card.back.features}
                        onStartNow={() => handleWhatsAppSpecific(card.back.service)}
                        frontBgGradient={frontGrad}
                        frontBorderColor={borderC}
                        backBorderColor={borderC}
                      />
                    </motion.div>
                  </div>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-11 w-11 border-[1.5px] border-[#14110D] bg-white text-[#14110D] hover:bg-[#7CF067] sm:-left-12 sm:h-10 sm:w-10" />
            <CarouselNext className="right-1 h-11 w-11 border-[1.5px] border-[#14110D] bg-white text-[#14110D] hover:bg-[#7CF067] sm:-right-12 sm:h-10 sm:w-10" />
          </Carousel>
        </div>
      </section>

      {/* Prova — resultados reais de lançamento */}
      <section className="bg-[#FAFAFA] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="mb-4 inline-block font-accent text-xs uppercase tracking-[0.22em]" style={{ color: GREEN_DEEP }}>
              {locale === 'en' ? 'Proof' : 'Prova'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl md:text-[3rem] font-bold mb-5 text-[#14110D]">
              {locale === 'en' ? 'Launches that already happened' : 'Lançamentos que já aconteceram'}
            </h2>
            <p className="text-[#5c544a] text-lg max-w-2xl mx-auto leading-relaxed">
              {locale === 'en'
                ? `${KALEIDOS_METRICS.lancamentos_en} launches executed and ${KALEIDOS_METRICS.faturamentoClientes_en} in revenue generated for clients. Two of them:`
                : `${KALEIDOS_METRICS.lancamentos} lançamentos executados e ${KALEIDOS_METRICS.faturamentoClientes} de faturamento gerado pra clientes. Dois deles:`}
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.filter((t) => ["bit-das-minas", "investidor-420"].includes(t.id)).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex h-full flex-col rounded-2xl border-[1.5px] border-[#14110D] bg-white p-7 shadow-[5px_5px_0_#14110D]"
              >
                <span
                  className="mb-4 inline-flex w-fit rounded-md border-[1.5px] border-[#14110D] px-3 py-1 text-xs font-bold text-[#14110D]"
                  style={{ background: GREEN }}
                >
                  {locale === 'en' ? t.highlight_en : t.highlight}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-[#5c544a]">
                  “{locale === 'en' ? t.quote_en : t.quote}”
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-bold text-[#14110D]">{t.name}</p>
                    <p className="text-xs text-[#9a9081]">{t.role} · {t.company}</p>
                  </div>
                  {t.caseLink && (
                    <Link
                      href={t.caseLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: GREEN_DEEP }}
                    >
                      {locale === 'en' ? 'See case' : 'Ver case'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="bg-[#FAFAFA] px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border-[1.5px] border-[#14110D] px-8 py-16 text-center shadow-[8px_8px_0_#14110D] sm:py-20"
          style={{ background: GREEN }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#14110D] tracking-tight">{locale==='en' ? 'Ready for a Viral Launch?' : 'Pronto para um Lançamento Viral?'}</h2>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-left">
            {(locale==='en' ? [
              'Launches that sell',
              'Exponential growth',
              'ROI-focused',
              'Repeatable strategy'
            ] : [
              "Lançamentos que vendem",
              "Crescimento orgânico real",
              "Foco em ROI positivo",
              "Estratégia replicável"
            ]).map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#14110D] bg-white">
                  <CheckCircle className="h-3.5 w-3.5 text-[#14110D]" />
                </span>
                <span className="font-medium text-[#14110D]">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCalendly("final_cta")}
              className="inline-flex items-center gap-2 rounded-full bg-[#14110D] px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {locale==='en' ? 'Book a free diagnosis (30min)' : 'Agendar diagnóstico gratuito (30min)'}
              <ArrowRight className="ml-1 h-5 w-5" />
            </a>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14110D] bg-white px-8 py-4 text-base font-bold text-[#14110D] transition-transform hover:-translate-y-0.5"
            >
              {locale==='en' ? 'Prefer WhatsApp?' : 'Prefere WhatsApp?'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <FooterDemo />
    </main>
  );
}
