"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqData: FAQItem[] = [
  {
    question: "Por que contratar a Kaleidos?",
    answer: [
      "Porque você não precisa de mais um post bonitinho.",
      "Precisa de estratégia, impacto e conteúdo que faça sua audiência parar de rolar o feed sem consciência e pensar: \"que genial!\"."
    ]
  },
  {
    question: "O que vocês fazem exatamente?",
    answer: [
      "A gente cria presença, conversa e movimento. Tudo isso através de: copy direcionada, roteiros inteligentes, vídeos criativos, newsletters e designs com personalidade.",
      "Além disso, planejamos lançamentos e damos consultoria pra você ter autonomia criativa sem dúvida na cabeça."
    ]
  },
  {
    question: "Vocês atendem qualquer tipo de criador?",
    answer: [
      "Não.",
      "Atendemos quem leva o próprio trabalho a sério, quer ter resultados e sair do óbvio.",
      "Se você quer o básico sem o esforço mínimo, tem gente que faz — e não é a gente."
    ]
  },
  {
    question: "Como sei que meu conteúdo vai manter a minha voz?",
    answer: [
      "A gente estuda você, entende a sua essência e criamos em conjunto. No final, o público vai ver o seu rosto e sentir que tudo foi feito por você."
    ]
  },
  {
    question: "Preciso investir muito?",
    answer: [
      "Você já está investindo tempo e energia tentando fazer tudo sozinho. A diferença é que aqui o investimento traz resultado, tempo livre e paz mental."
    ]
  },
  {
    question: "Como é o processo das atividades?",
    answer: [
      "Você chega com a ideia - ou te ajudamos com isso, estruturamos, criamos, executamos junto com você (dependendo do que precisamos), e te entregamos tudo prontinho pra compartilhar com sua audiência 🙂"
    ]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12 text-left sm:text-center font-display tracking-tight">
          Tudo o que você quer saber
        </h2>
        
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const answerArray = Array.isArray(item.answer) ? item.answer : [item.answer];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-emerald-100 shadow-lg overflow-hidden"
                style={{
                  background: isOpen 
                    ? "linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)" 
                    : "white"
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-emerald-50/50 transition-colors duration-200"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-black font-display">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    {isOpen ? (
                      <Minus className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-purple-600" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <div className="space-y-3">
                          {answerArray.map((paragraph, pIndex) => (
                            <motion.p
                              key={pIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + pIndex * 0.1 }}
                              className="text-neutral-700 leading-relaxed text-base sm:text-lg"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 