"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, BarChart3, DollarSign, Users, CheckCircle, Zap } from "lucide-react";
import ShapeHero from "@/components/kokonutui/shape-hero";
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
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";

export default function KaleidosGrowthPage() {
  const { locale } = useI18n();
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
    const message = locale==='en' ? 'Hello! I need Kaleidos Growth to create a viral launch. Can you help me?' : "Olá! Preciso da ajuda da Kaleidos Growth para criar um lançamento viral. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppSpecific = (service: string) => {
    const message = `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <ShapeHero>
            <div className="max-w-7xl mx-auto px-4 h-[90vh] flex items-center">
              <div className="w-full text-center">
                {/* Centered Content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 font-display tracking-tight leading-tight">Kaleidos Growth</h1>
                  
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                    {locale==='en' ? 'Launches that go viral and sell like crazy. Organic growth strategies on social networks that turn products into phenomena.' : 'Lançamentos que viralizam e vendem como loucos. Estratégias de growth orgânico nas redes sociais que transformam produtos em fenômenos.'}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleWhatsApp}
                      className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
                    >
                      {locale==='en' ? 'I want a Viral Launch' : 'Quero um Lançamento Viral'}
                    </Button>
                    
                    <button 
                      onClick={() => document.getElementById('what-we-can-do')?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-gray-600 hover:text-black transition-colors text-lg font-medium flex items-center justify-center group"
                    >
                      {locale==='en' ? 'Learn more' : 'Saiba Mais'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </ShapeHero>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section id="what-we-can-do" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-black">
              {locale==='en' ? 'The Explosive ' : 'A Fórmula do '}
              <span className="text-black">{locale==='en' ? 'Growth Formula' : 'Crescimento Explosivo'}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale==='en' ? 'Launches that sell and organic growth that builds loyal audiences' : 'Lançamentos que vendem e growth orgânico que constrói audiências fiéis'}
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* First Row - Strategy & Creatives */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black font-display">
                    {locale==='en' ? 'Launches that go viral' : 'Lançamentos que viralizam'}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {locale==='en' ? (
                      <>We develop <strong>tailored launch strategies</strong> that turn products into sales phenomena. Our approach combines <strong>strategic planning</strong>, <strong>creatives that convert</strong> and <strong>smart automations</strong> to create launches that sell like crazy.</>
                    ) : (
                      <>Desenvolvemos <strong>estratégias de lançamento personalizadas</strong> que transformam produtos em fenômenos de vendas. Nossa abordagem combina <strong>planejamento estratégico</strong>, <strong>criativos que convertem</strong> e <strong>automações inteligentes</strong> para criar lançamentos que vendem como loucos.</>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                     <h4 className="text-lg font-bold text-black mb-3">{locale==='en' ? 'Launch Strategy' : 'Estratégia de Lançamento'}</h4>
                     <p className="text-gray-600 text-sm">{locale==='en' ? 'Complete planning that sells, from concept to post‑sale.' : 'Planejamento completo que vende, desde a concepção até o pós-venda.'}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                     <h4 className="text-lg font-bold text-black mb-3">{locale==='en' ? 'Creatives that Convert' : 'Criativos que Convertem'}</h4>
                     <p className="text-gray-600 text-sm">{locale==='en' ? 'Ads that stop the scroll and generate real conversions.' : 'Anúncios que param o scroll e geram conversões reais.'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">20+</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Launches' : 'Lançamentos'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">200%</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Average increase' : 'Aumento médio'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">98%</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Success rate' : 'Taxa de sucesso'}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="rounded-2xl h-auto overflow-hidden">
                  <Image 
                    src="/Elementos/KaleidosLaunch.png" 
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
                <div className="rounded-2xl h-auto overflow-hidden">
                  <Image 
                    src="/Elementos/KaleidosGrowth.png" 
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
                  <h3 className="text-2xl font-bold text-black font-display">
                    {locale==='en' ? 'Organic growth on social networks' : 'Growth orgânico nas redes sociais'}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {locale==='en' ? 'We build loyal organic audiences and sustainable growth on social networks. Our strategy of organic content and authentic engagement ensures your brand grows naturally and durably.' : 'Construímos <strong>audiências orgânicas fiéis</strong> e <strong>crescimento sustentável</strong> nas redes sociais. Nossa estratégia de <strong>conteúdo orgânico</strong> e <strong>engajamento autêntico</strong> garante que sua marca cresça de forma natural e duradoura.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-lg font-bold text-black mb-3">Conteúdo Orgânico</h4>
                    <p className="text-gray-600 text-sm">
                      Estratégias de conteúdo que crescem naturalmente nas redes.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h4 className="text-lg font-bold text-black mb-3">Engajamento Real</h4>
                    <p className="text-gray-600 text-sm">
                      Construção de relacionamentos autênticos com a audiência.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">24/7</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Presence' : 'Presença'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">500%</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Organic growth' : 'Crescimento orgânico'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">100k+</div>
                    <div className="text-sm text-gray-600">{locale==='en' ? 'Organic followers' : 'Seguidores orgânicos'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-white">
              {locale==='en' ? 'Problems we ' : 'Problemas que '}<span className="text-white">{locale==='en' ? 'Solve' : 'Resolvemos'}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                    color: "text-white",
                    bgGradient: "from-red-500 to-pink-600",
                    borderColor: "border-red-400"
                  },
                  back: {
                     title: locale==='en' ? 'Sales Strategy' : 'Estratégia de Vendas',
                     description: locale==='en' ? 'Complete system that maximizes conversions' : 'Sistema completo que maximiza conversões',
                     features: locale==='en' ? ["Optimized funnel", "Persuasive copy", "Real urgency"] : ["Funil otimizado", "Copy persuasiva", "Urgência real"],
                     service: locale==='en' ? 'launches and sales' : "lançamentos e vendas",
                    bgGradient: "from-green-500 to-emerald-600",
                    borderColor: "border-green-400"
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Unqualified Audience' : 'Público Não Qualificado',
                     description: locale==='en' ? 'Audience that is not ready to buy' : 'Audiência que não está pronta para comprar',
                    icon: Target,
                    color: "text-white",
                    bgGradient: "from-blue-500 to-indigo-600",
                    borderColor: "border-blue-400"
                  },
                  back: {
                     title: locale==='en' ? 'Smart Segmentation' : 'Segmentação Inteligente',
                     description: locale==='en' ? 'Identification and attraction of the ideal audience' : 'Identificação e atração do público ideal',
                     features: locale==='en' ? ["Defined persona", "Automatic qualification", "Effective warming"] : ["Persona definido", "Qualificação automática", "Aquecimento eficaz"],
                     service: locale==='en' ? 'audience segmentation' : "segmentação de público",
                    bgGradient: "from-purple-500 to-violet-600",
                    borderColor: "border-purple-400"
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Campaigns that do not Convert' : 'Campanhas que não Convertem',
                     description: locale==='en' ? 'Ads that do not generate results' : 'Anúncios que não geram resultados',
                    icon: TrendingUp,
                    color: "text-white",
                    bgGradient: "from-yellow-500 to-orange-600",
                    borderColor: "border-yellow-400"
                  },
                  back: {
                     title: locale==='en' ? 'Creatives that Convert' : 'Criativos que Convertem',
                     description: locale==='en' ? 'Ads that stop the scroll and sell' : 'Anúncios que param o scroll e vendem',
                     features: locale==='en' ? ["Irresistible copy", "Impactful visuals", "Effective call‑to‑action"] : ["Copy irresistível", "Visual impactante", "Call-to-action eficaz"],
                     service: locale==='en' ? 'creatives that convert' : "criativos que convertem",
                    bgGradient: "from-teal-500 to-cyan-600",
                    borderColor: "border-teal-400"
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Negative ROI' : 'ROI Negativo',
                     description: locale==='en' ? 'Marketing investment with no return' : 'Investimento em marketing sem retorno',
                    icon: DollarSign,
                    color: "text-white",
                    bgGradient: "from-pink-500 to-rose-600",
                    borderColor: "border-pink-400"
                  },
                  back: {
                     title: locale==='en' ? 'Guaranteed Positive ROI' : 'ROI Positivo Garantido',
                     description: locale==='en' ? 'Systems that pay for themselves' : 'Sistemas que pagam por si mesmos',
                     features: locale==='en' ? ["Continuous optimization", "Real‑time metrics", "Automatic adjustments"] : ["Otimização contínua", "Métricas em tempo real", "Ajustes automáticos"],
                     service: locale==='en' ? 'positive ROI' : "ROI positivo",
                    bgGradient: "from-indigo-500 to-blue-600",
                    borderColor: "border-indigo-400"
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Unengaged Audience' : 'Audiência Não Engajada',
                     description: locale==='en' ? 'Followers who do not interact or buy' : 'Seguidores que não interagem ou compram',
                    icon: Users,
                    color: "text-white",
                    bgGradient: "from-emerald-500 to-green-600",
                    borderColor: "border-emerald-400"
                  },
                  back: {
                     title: locale==='en' ? 'Active Community' : 'Comunidade Ativa',
                     description: locale==='en' ? 'Audience that loves and buys your products' : 'Audiência que ama e compra seus produtos',
                     features: locale==='en' ? ["Real engagement", "Authentic relationship", "Loyalty"] : ["Engajamento real", "Relacionamento autêntico", "Fidelização"],
                     service: locale==='en' ? 'audience engagement' : "engajamento de audiência",
                    bgGradient: "from-violet-500 to-purple-600",
                    borderColor: "border-violet-400"
                  }
                },
                {
                  front: {
                     title: locale==='en' ? 'Ineffective Strategies' : 'Estratégias Ineficazes',
                     description: locale==='en' ? 'Methods that do not work for your niche' : 'Métodos que não funcionam para seu nicho',
                    icon: Zap,
                    color: "text-white",
                    bgGradient: "from-cyan-500 to-blue-600",
                    borderColor: "border-cyan-400"
                  },
                  back: {
                     title: locale==='en' ? 'Proven Formula' : 'Fórmula Comprovada',
                     description: locale==='en' ? 'Tested and validated strategies' : 'Estratégias testadas e validadas',
                     features: locale==='en' ? ["Proven methodology", "A/B testing", "Guaranteed results"] : ["Metodologia comprovada", "Testes A/B", "Resultados garantidos"],
                     service: locale==='en' ? 'effective strategies' : "estratégias eficazes",
                    bgGradient: "from-orange-500 to-red-600",
                    borderColor: "border-orange-400"
                  }
                }
              ].map((card, index) => (
                <CarouselItem key={index} className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <motion.div
                      initial={{ opacity: 0, y: 30, rotateY: -15 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <CardFlip
                        title={card.front.title}
                        subtitle={card.front.description}
                        description={card.back.description}
                        features={card.back.features}
                        onStartNow={() => handleWhatsAppSpecific(card.back.service)}
                        frontBgGradient={card.front.bgGradient}
                        frontBorderColor={card.front.borderColor}
                        backBgGradient={card.back.bgGradient}
                        backBorderColor={card.back.borderColor}
                      />
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white text-black hover:bg-gray-200" />
            <CarouselNext className="bg-white text-black hover:bg-gray-200" />
          </Carousel>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-black">{locale==='en' ? 'Ready for a Viral Launch?' : 'Pronto para um Lançamento Viral?'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {(locale==='en' ? [
                'Launches that sell',
                'Exponential growth',
                'Guaranteed positive ROI',
                'Repeatable strategy'
              ] : [
                "Lançamentos que vendem",
                "Crescimento exponencial",
                "ROI positivo garantido",
                "Estratégia replicável"
              ]).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleWhatsApp}
              className="bg-black text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              {locale==='en' ? 'I want to grow now' : 'Quero Crescer Agora'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 