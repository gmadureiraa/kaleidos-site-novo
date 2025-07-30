"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Brain, PenTool, Video, Mail, Rocket, FileText, Workflow, Brush } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function CtaAjuda() {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleWhatsApp = () => {
    const message = selectedService 
      ? `Olá! Preciso de ajuda com ${selectedService}. Podem me ajudar?`
      : "Olá! Preciso da ajuda da Kaleidos. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      title: "Edição de Vídeo",
      description: "Edição profissional para reels, anúncios e institucionais",
      icon: Video,
      value: "edição de vídeo"
    },
    {
      title: "Roteiros de Vídeos",
      description: "Roteiros criativos e estratégicos para vídeos que engajam",
      icon: PenTool,
      value: "roteiros de vídeos"
    },
    {
      title: "Newsletter",
      description: "Criação, copy e automação de newsletters para sua audiência",
      icon: Mail,
      value: "newsletter"
    },
    {
      title: "Lançamento",
      description: "Estratégias completas para lançamentos digitais de sucesso",
      icon: Rocket,
      value: "lançamento"
    },
    {
      title: "Criação de Conteúdo",
      description: "Posts, textos, copywriting e conteúdo multiplataforma",
      icon: FileText,
      value: "criação de conteúdo"
    },
    {
      title: "Design",
      description: "Identidade visual, social media, banners e mais",
      icon: Brush,
      value: "design"
    },
    {
      title: "Automações",
      description: "Automatize processos, integrações e fluxos de trabalho",
      icon: Workflow,
      value: "automações"
    },
    {
      title: "IA",
      description: "Soluções de inteligência artificial para marketing e conteúdo",
      icon: Brain,
      value: "inteligência artificial"
    }
  ];

  return (
    <section id="ajuda-section" className="w-full bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-[#7CFF6B] mb-4 text-center font-display tracking-tight">
          Nós podemos te ajudar!
        </h2>
        <p className="mb-10 text-white text-lg text-center">Nos diga o que você precisa</p>
        
        <div className="max-w-[800px] mx-auto mb-10">
          <motion.div 
            className="flex flex-wrap gap-3 overflow-visible justify-center"
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            {services.map((service) => {
              const isSelected = selectedService === service.value;
              return (
                <motion.button
                  key={service.value}
                  onClick={() => setSelectedService(service.value)}
                  layout
                  initial={false}
                  animate={{
                    backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.5)",
                  }}
                  whileHover={{
                    backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.8)",
                  }}
                  whileTap={{
                    backgroundColor: isSelected ? "#1f1209" : "rgba(39, 39, 42, 0.9)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                    backgroundColor: { duration: 0.1 },
                  }}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                    whitespace-nowrap overflow-hidden ring-1 ring-inset
                    ${isSelected 
                      ? "text-[#ff9066] ring-[hsla(0,0%,100%,0.12)]" 
                      : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"}
                  `}
                >
                  <motion.div 
                    className="relative flex items-center"
                    animate={{ 
                      width: isSelected ? "auto" : "100%",
                      paddingRight: isSelected ? "1.5rem" : "0",
                    }}
                    transition={{
                      ease: [0.175, 0.885, 0.32, 1.275],
                      duration: 0.3,
                    }}
                  >
                    <span>{service.title}</span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30, 
                            mass: 0.5 
                          }}
                          className="absolute right-0"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-[#2a1711]" strokeWidth={1.5} />
                          </div>
                        </motion.span>
                      )}
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <Button
          onClick={handleWhatsApp}
          className="bg-[#7CFF6B] text-black px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#5be04d] transition-colors"
        >
          Enviar Mensagem
        </Button>
      </div>
    </section>
  );
} 