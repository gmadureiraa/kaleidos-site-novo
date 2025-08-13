"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Brain, PenTool, Video, Mail, Rocket, FileText, Workflow, Brush } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";

export function CtaAjuda({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { locale } = useI18n();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleWhatsApp = () => {
    const selected = selectedServices.join(', ');
    const message = selectedServices.length > 0
      ? (locale==='pt' ? `Olá! Preciso de ajuda com: ${selected}. Podem me ajudar?` : `Hello! I need help with: ${selected}. Can you help me?`)
      : (locale==='pt' ? "Olá! Preciso da ajuda da Kaleidos. Podem me ajudar?" : "Hello! I need Kaleidos' help. Can you help me?");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      title: locale==='en' ? 'Video Editing' : 'Edição de Vídeo',
      description: locale==='en' ? 'Professional editing for reels, ads and institutional videos' : 'Edição profissional para reels, anúncios e institucionais',
      icon: Video,
      value: locale==='en' ? 'video editing' : 'edição de vídeo'
    },
    {
      title: locale==='en' ? 'Video Scripts' : 'Roteiros de Vídeos',
      description: locale==='en' ? 'Creative, strategic scripts for videos that engage' : 'Roteiros criativos e estratégicos para vídeos que engajam',
      icon: PenTool,
      value: locale==='en' ? 'video scripts' : 'roteiros de vídeos'
    },
    {
      title: 'Newsletter',
      description: locale==='en' ? 'Creation, copy and newsletter automations for your audience' : 'Criação, copy e automação de newsletters para sua audiência',
      icon: Mail,
      value: 'newsletter'
    },
    {
      title: locale==='en' ? 'Launch' : 'Lançamento',
      description: locale==='en' ? 'Complete strategies for successful digital launches' : 'Estratégias completas para lançamentos digitais de sucesso',
      icon: Rocket,
      value: locale==='en' ? 'launch' : 'lançamento'
    },
    {
      title: locale==='en' ? 'Content Creation' : 'Criação de Conteúdo',
      description: locale==='en' ? 'Posts, copywriting and multi‑platform content' : 'Posts, textos, copywriting e conteúdo multiplataforma',
      icon: FileText,
      value: locale==='en' ? 'content creation' : 'criação de conteúdo'
    },
    {
      title: 'Design',
      description: locale==='en' ? 'Visual identity, social media, banners and more' : 'Identidade visual, social media, banners e mais',
      icon: Brush,
      value: 'design'
    },
    {
      title: locale==='en' ? 'Automations' : 'Automações',
      description: locale==='en' ? 'Automate processes, integrations and workflows' : 'Automatize processos, integrações e fluxos de trabalho',
      icon: Workflow,
      value: locale==='en' ? 'automations' : 'automações'
    },
    {
      title: 'IA',
      description: locale==='en' ? 'AI solutions for marketing and content' : 'Soluções de inteligência artificial para marketing e conteúdo',
      icon: Brain,
      value: locale==='en' ? 'artificial intelligence' : 'inteligência artificial'
    },
    // Novos serviços
    {
      title: locale==='en' ? 'Social Media Management' : 'Gestão de Social Media',
      description: locale==='en' ? 'Planning, calendar and publishing across platforms' : 'Planejamento, calendário e publicação multi-plataforma',
      icon: FileText,
      value: locale==='en' ? 'social media management' : 'gestão de social media'
    },
    {
      title: locale==='en' ? 'Landing Pages' : 'Landing Pages',
      description: locale==='en' ? 'High-converting capture pages' : 'Páginas de captura que convertem',
      icon: Brush,
      value: locale==='en' ? 'landing pages' : 'landing pages'
    },
    {
      title: locale==='en' ? 'Branding' : 'Branding',
      description: locale==='en' ? 'Brand voice and identity system' : 'Voz da marca e identidade visual',
      icon: Brush,
      value: 'branding'
    },
    {
      title: locale==='en' ? 'Community Management' : 'Gestão de Comunidade',
      description: locale==='en' ? 'Discord/Telegram structure and moderation' : 'Estrutura e moderação em Discord/Telegram',
      icon: Workflow,
      value: locale==='en' ? 'community management' : 'gestão de comunidade'
    },
    {
      title: locale==='en' ? 'Web Development' : 'Desenvolvimento Web',
      description: locale==='en' ? 'Next.js websites and integrations' : 'Sites em Next.js e integrações',
      icon: Workflow,
      value: locale==='en' ? 'web development' : 'desenvolvimento web'
    },
    {
      title: locale==='en' ? 'Motion Graphics' : 'Motion Graphics',
      description: locale==='en' ? '2D animation and kinetic typography' : 'Animação 2D e tipografia cinética',
      icon: Video,
      value: 'motion graphics'
    }
  ];

  return (
    <section id="ajuda-section" className={`w-full ${variant==='dark' ? 'bg-black' : 'bg-white'} py-16 px-4`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className={`text-5xl sm:text-6xl font-bold ${variant==='dark' ? 'text-[#7CFF6B]' : 'text-black'} mb-4 text-center font-display tracking-tight`}>
          {locale==='pt' ? 'Nós podemos te ajudar!' : 'We can help you!'}
        </h2>
        <p className={`mb-10 ${variant==='dark' ? 'text-white' : 'text-neutral-700'} text-lg text-center`}>{locale==='pt' ? 'Nos diga o que você precisa' : 'Tell us what you need'}</p>
        
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
              const isSelected = selectedServices.includes(service.value);
              return (
                <motion.button
                  key={service.value}
                  onClick={() => {
                    setSelectedServices((prev) =>
                      prev.includes(service.value)
                        ? prev.filter(v => v !== service.value)
                        : [...prev, service.value]
                    );
                  }}
                  layout
                  initial={false}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                    scale: { duration: 0.1 },
                  }}
                   className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm sm:text-base font-medium
                    whitespace-nowrap overflow-hidden border
                    ${variant==='dark'
                      ? `${isSelected ? 'bg-[#2a1711] text-[#ff9066] border-transparent' : 'bg-zinc-700/60 text-zinc-300 border-zinc-600'}`
                      : `${isSelected ? 'bg-pink-50 text-pink-700 border-pink-300' : 'bg-white text-neutral-800 border-neutral-200'}`}
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
                          <div className={`w-4 h-4 rounded-full ${variant==='dark' ? 'bg-[#ff9066]' : 'bg-pink-500'} flex items-center justify-center`}>
                          <CheckCircle className={`w-3 h-3 ${variant==='dark' ? 'text-[#2a1711]' : 'text-white'}`} strokeWidth={1.5} />
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
          className={`${variant==='dark' ? 'bg-[#7CFF6B] text-black hover:bg-[#5be04d]' : 'bg-black text-white hover:bg-neutral-800'} px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-colors`}
        >
          {locale==='pt' ? 'Enviar Mensagem' : 'Send Message'}
        </Button>
      </div>
    </section>
  );
} 