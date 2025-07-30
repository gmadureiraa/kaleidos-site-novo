"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Brain, Workflow, Clock, Mail, MessageSquare, BarChart3, Target, TrendingUp } from "lucide-react";
import CardFlip from "@/components/kokonutui/card-flip";
import AIStateLoading from "@/components/kokonutui/ai-state-loading";
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

export default function KaleidosIAPage() {
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
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Quero saber mais sobre automações com IA da Kaleidos`, "_blank");
  };

  const handleWhatsAppSpecific = (service: string) => {
    const message = `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToAutomation = () => {
    const element = document.getElementById('automation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-display">
              Kaleidos{" "}
              <span className="text-white">
                AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automações inteligentes que{" "}
              <span className="text-white font-semibold">transformam</span> seu negócio
            </p>



            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={scrollToAutomation}
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Ver Automações
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                className="border-white bg-transparent text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Falar Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* AI State Loading Animation */}
          <div className="mt-20">
            <AIStateLoading />
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
                  IA que{" "}
                  <span className="text-white">Transforma</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nossa <strong>tecnologia de IA avançada</strong> automatiza processos complexos e otimiza resultados. Combinamos <strong>machine learning</strong> com <strong>criatividade humana</strong> para criar soluções que realmente funcionam no mundo real.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">Automação Inteligente</h4>
                  <p className="text-gray-400 text-sm">
                    Processos que se adaptam e melhoram automaticamente.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">Otimização Contínua</h4>
                  <p className="text-gray-400 text-sm">
                    Resultados que melhoram com o tempo e uso.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src="/Elementos/KaleidosAI.png" 
                  alt="Kaleidos AI - Inteligência Artificial" 
                  className="w-full h-auto object-contain"
                />
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
              Problemas que{" "}
              <span className="text-white">Resolvemos</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Identificamos e automatizamos os processos que mais consomem seu tempo
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
                    title: "Tempo Perdido",
                    description: "Horas gastas em tarefas repetitivas que poderiam ser automatizadas",
                    icon: Clock,
                    color: "text-white",
                    bgGradient: "from-red-500 to-pink-600",
                    borderColor: "border-red-400"
                  },
                  back: {
                    title: "Solução IA",
                    description: "Automação completa que libera 80% do seu tempo para atividades estratégicas",
                    features: ["Processos 24/7", "Zero intervenção manual", "Resultados imediatos"],
                    bgGradient: "from-green-500 to-emerald-600",
                    borderColor: "border-green-400"
                  }
                },
                {
                  front: {
                    title: "Conteúdo Manual",
                    description: "Criação manual de posts, newsletters e copy de vendas",
                    icon: MessageSquare,
                    color: "text-white",
                    bgGradient: "from-blue-500 to-indigo-600",
                    borderColor: "border-blue-400"
                  },
                  back: {
                    title: "Geração Automática",
                    description: "IA que cria conteúdo otimizado e personalizado automaticamente",
                    features: ["Posts automáticos", "Newsletters inteligentes", "Copy otimizado"],
                    bgGradient: "from-purple-500 to-violet-600",
                    borderColor: "border-purple-400"
                  }
                },
                {
                  front: {
                    title: "Gestão de Redes",
                    description: "Publicação manual em múltiplas plataformas e horários",
                    icon: BarChart3,
                    color: "text-white",
                    bgGradient: "from-yellow-500 to-orange-600",
                    borderColor: "border-yellow-400"
                  },
                  back: {
                    title: "Multi-Plataforma",
                    description: "Sistema que publica automaticamente em todas as redes simultaneamente",
                    features: ["Agendamento inteligente", "Multi-plataforma", "Otimização de horários"],
                    bgGradient: "from-teal-500 to-cyan-600",
                    borderColor: "border-teal-400"
                  }
                },
                {
                  front: {
                    title: "Análise Manual",
                    description: "Coleta e análise manual de dados e métricas de performance",
                    icon: TrendingUp,
                    color: "text-white",
                    bgGradient: "from-pink-500 to-rose-600",
                    borderColor: "border-pink-400"
                  },
                  back: {
                    title: "Insights Automáticos",
                    description: "Relatórios automáticos com insights acionáveis em tempo real",
                    features: ["Dados em tempo real", "Insights automáticos", "Relatórios consolidados"],
                    bgGradient: "from-indigo-500 to-blue-600",
                    borderColor: "border-indigo-400"
                  }
                },
                {
                  front: {
                    title: "Email Overload",
                    description: "Centenas de emails diários sem priorização ou organização",
                    icon: Mail,
                    color: "text-white",
                    bgGradient: "from-emerald-500 to-green-600",
                    borderColor: "border-emerald-400"
                  },
                  back: {
                    title: "Email Intelligence",
                    description: "IA que organiza, prioriza e responde emails automaticamente",
                    features: ["Resumo diário", "Priorização inteligente", "Respostas automáticas"],
                    bgGradient: "from-violet-500 to-purple-600",
                    borderColor: "border-violet-400"
                  }
                },
                {
                  front: {
                    title: "Falta de Escalabilidade",
                    description: "Processos que não crescem junto com seu negócio",
                    icon: Target,
                    color: "text-white",
                    bgGradient: "from-cyan-500 to-blue-600",
                    borderColor: "border-cyan-400"
                  },
                  back: {
                    title: "Escalabilidade Total",
                    description: "Sistemas que crescem automaticamente com sua demanda",
                    features: ["Crescimento automático", "Adaptação inteligente", "Performance otimizada"],
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
                        onStartNow={() => handleWhatsAppSpecific(card.front.title)}
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

      {/* Automation Features Section */}
      <section id="automation" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-white">
              O que Podemos{" "}
              <span className="text-white">Automatizar</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Soluções específicas e testadas que transformam seu workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Geração de Conteúdo",
                subtitle: "Content AI",
                description: "Criação automática de conteúdo otimizado para SEO e engajamento.",
                features: [
                  "Posts para redes sociais",
                  "Artigos de blog completos",
                  "Newsletters personalizadas",
                  "Copy de vendas otimizado"
                ],
                color: "text-white",
                example: "Jornal Cripto - 6 posts diários automáticos"
              },
              {
                icon: Zap,
                title: "Publicação Automática",
                subtitle: "Multi-plataforma",
                description: "Agendamento e publicação automática em todas as suas redes sociais simultaneamente.",
                features: [
                  "Agendamento inteligente",
                  "Multi-plataforma (IG, LinkedIn, Twitter)",
                  "Otimização de horários",
                  "Relatórios de performance"
                ],
                color: "text-white",
                example: "Mercado Bitcoin - 600+ posts automatizados"
              },
              {
                icon: Brain,
                title: "Revisor de Conteúdo",
                subtitle: "Quality Control",
                description: "Análise automática de qualidade, SEO, tom de voz e otimização de conteúdo.",
                features: [
                  "Verificação de SEO",
                  "Análise de tom de voz",
                  "Sugestões de melhoria",
                  "Detecção de erros"
                ],
                color: "text-white",
                example: "Crypto.com - 100% de conteúdo revisado"
              },
              {
                icon: Workflow,
                title: "Pesquisas Profundas",
                subtitle: "Data Mining",
                description: "Coleta e análise automática de dados, tendências e insights do mercado.",
                features: [
                  "Monitoramento de concorrência",
                  "Análise de tendências",
                  "Coleta de dados em tempo real",
                  "Relatórios automáticos"
                ],
                color: "text-white",
                example: "Investidor 4.20 - Insights diários automáticos"
              },
              {
                icon: Clock,
                title: "Atualizações Diárias",
                subtitle: "Daily Digest",
                description: "Resumos automáticos de notícias, métricas e atualizações importantes do seu negócio.",
                features: [
                  "Resumo de notícias",
                  "Métricas de performance",
                  "Alertas importantes",
                  "Relatórios consolidados"
                ],
                color: "text-white",
                example: "Orlando - Newsletter diária às 7h"
              },
              {
                icon: Mail,
                title: "Gestão Inteligente de Emails",
                subtitle: "Email AI",
                description: "Resumo automático de emails, criação de respostas e organização da caixa de entrada.",
                features: [
                  "Resumo diário de emails",
                  "Respostas automáticas",
                  "Priorização inteligente",
                  "Organização automática"
                ],
                color: "text-white",
                example: "Resumo e respostas para 500+ emails/dia"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-white hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <card.icon className={`h-8 w-8 text-white group-hover:text-green-400 transition-colors`} />
                    <div className="text-xs font-medium text-white bg-green-600 px-3 py-1 rounded-full">
                      {card.subtitle}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-display text-white group-hover:text-green-100 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    {card.description}
                  </p>
                </div>

                {/* Card Features */}
                <div className="p-6">
                  <div className="space-y-3">
                    {card.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 group-hover:bg-green-300 transition-colors"></div>
                        <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                      <p className="text-xs text-gray-300 italic">&ldquo;{card.example}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Final Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Pronto para{" "}
              <span className="text-white">
                Liberar sua Criatividade?
              </span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                "80% menos tempo em tarefas repetitivas",
                "Automações que funcionam 24/7",
                "Foco total na sua criatividade",
                "Resultados mensuráveis em 30 dias"
              ].map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-400 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-200 font-medium group-hover:text-white transition-colors">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button 
                onClick={handleWhatsApp}
                className="relative bg-white text-black px-12 py-6 text-xl font-bold rounded-2xl hover:scale-105 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Quero Começar Agora
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 