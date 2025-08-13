"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Send, Check } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { useState } from "react";
import { WHATSAPP_NUMBER, SERVICOS } from "@/lib/constants";

export default function ContatoPage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleServico = (servico: string) => {
    setSelectedServices((prev) =>
      prev.includes(servico) ? prev.filter((s) => s !== servico) : [...prev, servico]
    );
  };

  const handleWhatsApp = () => {
    let texto = "Olá! Preciso de ajuda com: %0A";
    texto += selectedServices.map((s) => `- ${s}`).join("%0A");
    if (selectedServices.length === 0) texto = "Olá! Preciso de ajuda com marketing e conteúdo.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href={withLang('/cases')} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('contact','backToCases')}
          </Link>
        </div>
      </div>

      {/* Seção 1: Introdução */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">{t('contact','heroTitle')}</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{t('contact','heroText')}</p>
          </motion.div>
        </div>
      </section>

      {/* Seção 2: Nós podemos te ajudar */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">{t('contact','helpTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{t('contact','helpSubtitle')}</p>
            
            {/* Seleção de Serviços */}
            <div className="max-w-[800px] mx-auto mb-8">
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
                {SERVICOS.map((servico) => {
                  const isSelected = selectedServices.includes(servico);
                  return (
                    <motion.button
                      key={servico}
                      onClick={() => toggleServico(servico)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isSelected
                          ? "bg-[#7CFF6B] text-black shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      layout
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
                        <span>{servico}</span>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30, 
                            mass: 0.5 
                          }}
                          className="absolute right-0"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#2a1711]" strokeWidth={1.5} />
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Botão WhatsApp */}
            <motion.button
              onClick={handleWhatsApp}
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#128C7E] transition-colors flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t('contact','whatsappButton')}
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Digital Marketing' : 'Marketing Digital'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Full digital marketing strategies, from ad campaigns to process automation.' : 'Estratégias completas de marketing digital, desde campanhas de anúncios até automação de processos.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Content Creation' : 'Criação de Conteúdo'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Creative, engaging content for your social channels, including videos, reels and optimized posts.' : 'Conteúdo criativo e envolvente para suas redes sociais, incluindo vídeos, reels e posts otimizados.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Growth & Launches' : 'Growth & Lançamentos'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Growth strategies and launches that maximize your results and ROI.' : 'Estratégias de crescimento e lançamentos que maximizam seus resultados e ROI.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção de formulário e email removida: manter apenas WhatsApp acima */}
    </div>
  );
} 