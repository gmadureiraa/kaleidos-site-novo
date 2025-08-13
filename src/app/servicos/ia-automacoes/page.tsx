"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Mail, MessageSquare, BarChart3, Target, TrendingUp } from "lucide-react";
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
import { useI18n } from "@/i18n/useI18n";

export default function KaleidosIAPage() {
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
    const text = locale==='en' ? 'Hello! I want to know more about AI automations from Kaleidos' : 'Olá! Quero saber mais sobre automações com IA da Kaleidos';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-display">Kaleidos <span className="text-white">AI</span></h1>
            
            <div className="mt-6">
              <AIStateLoading />
            </div>



            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={scrollToAutomation}
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                {locale==='en' ? 'See Automations' : 'Ver Automações'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                className="border-white bg-transparent text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                {locale==='en' ? 'Contact Us' : 'Falar Conosco'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          
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
                  {locale==='en' ? 'AI that ' : 'IA que '}<span className="text-white">{locale==='en' ? 'Transforms' : 'Transforma'}</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {locale==='en' ? (
                    <>Our <strong>advanced AI technology</strong> automates complex processes and optimizes results. We combine <strong>machine learning</strong> with <strong>human creativity</strong> to build solutions that truly work in the real world.</>
                  ) : (
                    <>Nossa <strong>tecnologia de IA avançada</strong> automatiza processos complexos e otimiza resultados. Combinamos <strong>machine learning</strong> com <strong>criatividade humana</strong> para criar soluções que realmente funcionam no mundo real.</>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">{locale==='en' ? 'Smart Automation' : 'Automação Inteligente'}</h4>
                  <p className="text-gray-400 text-sm">{locale==='en' ? 'Processes that adapt and improve automatically.' : 'Processos que se adaptam e melhoram automaticamente.'}</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">{locale==='en' ? 'Continuous Optimization' : 'Otimização Contínua'}</h4>
                  <p className="text-gray-400 text-sm">{locale==='en' ? 'Results that improve with time and usage.' : 'Resultados que melhoram com o tempo e uso.'}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src="/Elementos/KaleidosAI.png" 
                  alt="Kaleidos AI"
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
              {locale==='en' ? 'Problems we ' : 'Problemas que '}<span className="text-white">{locale==='en' ? 'Solve' : 'Resolvemos'}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {locale==='en' ? 'We identify and automate the processes that consume your time the most' : 'Identificamos e automatizamos os processos que mais consomem seu tempo'}
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
                    title: locale==='en' ? 'Time Wasted' : 'Tempo Perdido',
                    description: locale==='en' ? 'Hours spent on repetitive tasks that could be automated' : 'Horas gastas em tarefas repetitivas que poderiam ser automatizadas',
                    icon: Clock,
                    color: "text-white",
                    bgGradient: "from-red-500 to-pink-600",
                    borderColor: "border-red-400"
                  },
                  back: {
                    title: locale==='en' ? 'AI Solution' : 'Solução IA',
                    description: locale==='en' ? 'Full automation that frees 80% of your time for strategic activities' : 'Automação completa que libera 80% do seu tempo para atividades estratégicas',
                    features: locale==='en' ? ["24/7 processes", "Zero manual intervention", "Immediate results"] : ["Processos 24/7", "Zero intervenção manual", "Resultados imediatos"],
                    bgGradient: "from-green-500 to-emerald-600",
                    borderColor: "border-green-400"
                  }
                },
                {
                  front: {
                    title: locale==='en' ? 'Manual Content' : 'Conteúdo Manual',
                    description: locale==='en' ? 'Manual creation of posts, newsletters and sales copy' : 'Criação manual de posts, newsletters e copy de vendas',
                    icon: MessageSquare,
                    color: "text-white",
                    bgGradient: "from-blue-500 to-indigo-600",
                    borderColor: "border-blue-400"
                  },
                  back: {
                    title: locale==='en' ? 'Automatic Generation' : 'Geração Automática',
                    description: locale==='en' ? 'AI that automatically creates optimized, personalized content' : 'IA que cria conteúdo otimizado e personalizado automaticamente',
                    features: locale==='en' ? ["Automatic posts", "Smart newsletters", "Optimized copy"] : ["Posts automáticos", "Newsletters inteligentes", "Copy otimizado"],
                    bgGradient: "from-purple-500 to-violet-600",
                    borderColor: "border-purple-400"
                  }
                },
                {
                  front: {
                    title: locale==='en' ? 'Social Management' : 'Gestão de Redes',
                    description: locale==='en' ? 'Manual posting on multiple platforms and schedules' : 'Publicação manual em múltiplas plataformas e horários',
                    icon: BarChart3,
                    color: "text-white",
                    bgGradient: "from-yellow-500 to-orange-600",
                    borderColor: "border-yellow-400"
                  },
                  back: {
                    title: locale==='en' ? 'Multi‑platform' : 'Multi-Plataforma',
                    description: locale==='en' ? 'System that automatically publishes to all networks simultaneously' : 'Sistema que publica automaticamente em todas as redes simultaneamente',
                    features: locale==='en' ? ["Smart scheduling", "Multi‑platform", "Timing optimization"] : ["Agendamento inteligente", "Multi-plataforma", "Otimização de horários"],
                    bgGradient: "from-teal-500 to-cyan-600",
                    borderColor: "border-teal-400"
                  }
                },
                {
                  front: {
                    title: locale==='en' ? 'Manual Analysis' : 'Análise Manual',
                    description: locale==='en' ? 'Manual collection and analysis of data and performance metrics' : 'Coleta e análise manual de dados e métricas de performance',
                    icon: TrendingUp,
                    color: "text-white",
                    bgGradient: "from-pink-500 to-rose-600",
                    borderColor: "border-pink-400"
                  },
                  back: {
                    title: locale==='en' ? 'Automatic Insights' : 'Insights Automáticos',
                    description: locale==='en' ? 'Automatic reports with real‑time actionable insights' : 'Relatórios automáticos com insights acionáveis em tempo real',
                    features: locale==='en' ? ["Real‑time data", "Automatic insights", "Consolidated reports"] : ["Dados em tempo real", "Insights automáticos", "Relatórios consolidados"],
                    bgGradient: "from-indigo-500 to-blue-600",
                    borderColor: "border-indigo-400"
                  }
                },
                {
                  front: {
                    title: locale==='en' ? 'Email Overload' : 'Excesso de Emails',
                    description: locale==='en' ? 'Hundreds of daily emails without prioritization or organization' : 'Centenas de emails diários sem priorização ou organização',
                    icon: Mail,
                    color: "text-white",
                    bgGradient: "from-emerald-500 to-green-600",
                    borderColor: "border-emerald-400"
                  },
                  back: {
                    title: locale==='en' ? 'Summarize your inbox' : 'Resume seus emails',
                    description: locale==='en' ? 'AI that organizes, prioritizes and replies to emails automatically' : 'IA que organiza, prioriza e responde emails automaticamente',
                    features: locale==='en' ? ["Daily summary", "Smart prioritization", "Automatic replies"] : ["Resumo diário", "Priorização inteligente", "Respostas automáticas"],
                    bgGradient: "from-violet-500 to-purple-600",
                    borderColor: "border-violet-400"
                  }
                },
                {
                  front: {
                    title: locale==='en' ? 'Lack of Scalability' : 'Falta de Escalabilidade',
                    description: locale==='en' ? 'Processes that don\'t grow with your business' : 'Processos que não crescem junto com seu negócio',
                    icon: Target,
                    color: "text-white",
                    bgGradient: "from-cyan-500 to-blue-600",
                    borderColor: "border-cyan-400"
                  },
                  back: {
                    title: locale==='en' ? 'Total Scalability' : 'Escalabilidade Total',
                    description: locale==='en' ? 'Systems that automatically grow with your demand' : 'Sistemas que crescem automaticamente com sua demanda',
                    features: locale==='en' ? ["Automatic growth", "Smart adaptation", "Optimized performance"] : ["Crescimento automático", "Adaptação inteligente", "Performance otimizada"],
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
                        onDark
                        title={card.front.title}
                        backTitle={card.back.title}
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
              {locale==='en' ? 'Ready to ' : 'Pronto para '}
              <span className="text-white">{locale==='en' ? 'Unleash your Creativity?' : 'Liberar sua Criatividade?'}</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {(locale==='en' ? [
                '80% less time on repetitive tasks',
                'Automations that run 24/7',
                'Full focus on your creativity',
                'Measurable results in 30 days'
              ] : [
                "80% menos tempo em tarefas repetitivas",
                "Automações que funcionam 24/7",
                "Foco total na sua criatividade",
                "Resultados mensuráveis em 30 dias"
              ]).map((benefit, index) => (
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
                  {locale==='en' ? 'Start Now' : 'Quero Começar Agora'}
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