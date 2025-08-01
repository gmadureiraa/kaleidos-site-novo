"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
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

export default function KaleidosContentPage() {
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
    const message = "Olá! Preciso da ajuda da Kaleidos Content para criar conteúdo que viraliza. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // const handleWhatsAppSpecific = (service: string) => {
  //   const message = `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
  //   const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  //   window.open(whatsappUrl, '_blank');
  // };



  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-display text-black">
              Kaleidos{" "}
              <span className="text-black">
                Content
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conteúdo que faz sua audiência parar e pensar:{" "}
              <span className="text-black font-semibold">&ldquo;Que genial!&rdquo;</span>
            </p>

            {/* Word Rotate Section */}
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-4">Nós fazemos:</p>
              <div className="text-black">
                <WordRotate
                  className="text-2xl md:text-3xl font-bold text-black"
                  words={["Conteúdo Único!", "Copy Persuasiva", "Roteiros Virais", "Edição de vídeos", "Email Marketing", "Design", "Branding"]}
                  duration={3000}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={handleWhatsApp}
                className="bg-black text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
          </motion.div>
        </div>
      </section>



      {/* What We Can Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-black">
              O que podemos{" "}
              <span className="text-black">fazer</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conteúdo fundamento em dados que transformam seu marketing em resultados reais
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* First Row - Content Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black font-display">
                    Criamos conteúdo que viraliza
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Desenvolvemos <strong>conteúdo personalizado</strong> que transformam sua marca em uma máquina de engajamento. Nossa abordagem combina <strong>copywriting avançado</strong>, <strong>roteiros inteligentes</strong> e <strong>edição criativa</strong> para criar conteúdo que as pessoas querem consumir e compartilhar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-bold text-black mb-3">Copywriting</h4>
                    <p className="text-gray-600 text-sm">
                      Textos persuasivos que converte visitantes em clientes, usando técnicas avançadas de psicologia de vendas.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-bold text-black mb-3">Roteiros</h4>
                    <p className="text-gray-600 text-sm">
                      Scripts inteligentes que capturam atenção desde os primeiros segundos e mantêm o engajamento.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">500+</div>
                    <div className="text-sm text-gray-600">Vídeos editados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">30M+</div>
                    <div className="text-sm text-gray-600">Views nos reels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">600+</div>
                    <div className="text-sm text-gray-600">Peças de Design</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="rounded-2xl h-auto overflow-hidden">
                  <img 
                    src="/Elementos/KaleidosContent.png" 
                    alt="Kaleidos Content - Conteúdo em Ação" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Second Row - Design & Video Editing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="rounded-2xl h-auto overflow-hidden">
                  <img 
                    src="/Elementos/KaleidosDesign.png" 
                    alt="Kaleidos Content - Design & Edição" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black font-display">
                    Design e edição que impressiona
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Criamos <strong>designs únicos</strong> e <strong>edições cinematográficas</strong> que fazem sua marca se destacar. Nossa equipe especializada em <strong>After Effects</strong>, <strong>motion graphics</strong> e <strong>correção de cor</strong> transforma vídeos simples em experiências visuais memoráveis que viralizam naturalmente.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-bold text-black mb-3">Motion Graphics</h4>
                    <p className="text-gray-600 text-sm">
                      Animações e efeitos visuais que capturam atenção e transmitem sua mensagem de forma impactante.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-bold text-black mb-3">Edição Criativa</h4>
                    <p className="text-gray-600 text-sm">
                      Cortes dinâmicos, transições suaves e ritmo cinematográfico que mantêm o espectador engajado.
                    </p>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="problems-section" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-white">
              Nossos{" "}
              <span className="text-white">Trabalhos</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Vídeos editados, designs criados e conteúdo que viraliza
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
                "/Conteudo_clientes/Bit das minas/Reels-1-Gi-2.mp4",
                "/Conteudo_clientes/Bit das minas/Reels-3-Gi.mp4",
                
                // Layla Foz - Vídeos
                "/Conteudo_clientes/Layla Foz/Reels-1-Layla-1.mp4",
                "/Conteudo_clientes/Layla Foz/Reels-2-Layla-1.mp4",
                
                // Investidor 4.20 - Vídeos
                "/Conteudo_clientes/Investidor 4.20/Reels-1-Lucas-1.mp4",
                "/Conteudo_clientes/Investidor 4.20/Reels-3-Lucas.mp4",
                
                // Yasmin - Vídeos
                "/Conteudo_clientes/Yasmin/Reels-1-Yasmin-1.mp4",
                "/Conteudo_clientes/Yasmin/Reels-3-Yasmin.mp4",
                
                // Paradigma Education - Vídeos
                "/Conteudo_clientes/Paradigma/PARADIGMAv2.mp4",
                "/Conteudo_clientes/Paradigma/20250620_PARADIGMA_01M06S_V3.mp4",
                
                // Defifest - Imagens
                "/Conteudo_clientes/Defifest/1.png",
                "/Conteudo_clientes/Defifest/10.png",
                
                // Jornal Cripto - Imagens
                "/Conteudo_clientes/Jornal cripto/1-2.png",
                "/Conteudo_clientes/Jornal cripto/2-1.png",
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
                          // Abrir em modal ou expandir
                          const media = isImage ? 
                            `<img src="${src}" alt="Trabalho expandido" class="max-w-full max-h-[80vh] object-contain" />` :
                            `<video src="${src}" controls autoplay loop muted class="max-w-full max-h-[80vh] object-contain" />`;
                          
                          const modal = document.createElement('div');
                          modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
                          modal.innerHTML = `
                            <div class="relative">
                              <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">×</button>
                              ${media}
                            </div>
                          `;
                          modal.onclick = (e) => {
                            if (e.target === modal) modal.remove();
                          };
                          document.body.appendChild(modal);
                        }}
                      >
                        <div className="w-full max-w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-lg bg-black group-hover:scale-105 transition-transform duration-300">
                          {isImage ? (
                            <img
                              src={src}
                              alt="Trabalho de edição e design"
                              className="w-full h-full object-cover"
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
            <CarouselPrevious className="bg-white text-black hover:bg-gray-200" />
            <CarouselNext className="bg-white text-black hover:bg-gray-200" />
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
              className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Quero Conteúdo Assim
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-black">
              Pronto para Criar{" "}
              <span className="text-black">Conteúdo que Viraliza?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                "Conteúdo que engaja de verdade",
                "Copy que converte",
                "Vídeos que viralizam",
                "Audiência que cresce organicamente"
              ].map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-600 transition-all duration-300"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <Button 
              onClick={handleWhatsApp}
              className="bg-black text-white px-12 py-6 text-xl font-bold rounded-2xl hover:scale-105 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Quero Conteúdo que Funciona
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 