"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

interface FAQItem {
  question: string;
  answer: string | string[];
}

function useFaqData(t: ReturnType<typeof useI18n>["t"]) {
  return useMemo<FAQItem[]>(() => ([
    {
      question: t('faq','q1'),
      answer: [t('faq','a1_1'), t('faq','a1_2')]
    },
    {
      question: t('faq','q2'),
      answer: [t('faq','a2_1'), t('faq','a2_2')]
    },
    {
      question: t('faq','q3'),
      answer: [t('faq','a3_1'), t('faq','a3_2'), t('faq','a3_3')]
    },
    {
      question: t('faq','q4'),
      answer: [t('faq','a4_1')]
    },
    {
      question: t('faq','q5'),
      answer: [t('faq','a5_1')]
    },
    {
      question: t('faq','q6'),
      answer: [t('faq','a6_1')]
    }
  ]), [t]);
}

export default function FAQSection() {
  const { t } = useI18n();
  const faqData = useFaqData(t);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Helper para estilizar última palavra em itálico (visual do layout de referência)
  const renderStyledHeading = (text: string) => {
    const parts = text.split(" ");
    const last = parts.pop();
    return (
      <div className="text-3xl sm:text-4xl font-bold text-black font-display tracking-tight leading-tight">
        <div>{parts.join(" ")}</div>
        {last && (
          <div className="italic font-serif">{last}</div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="w-full bg-neutral-100 py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-4 sm:p-6 md:p-6">
          <div className="mb-4">
            <span className="inline-block text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">FAQs</span>
          </div>

          {/* Heading estilizado */}
          <div className="mb-6 sm:mb-8">
            {renderStyledHeading(t('faq','heading'))}
          </div>

          {/* Lista */}
          <div className="space-y-3.5">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              const answerArray = Array.isArray(item.answer) ? item.answer : [item.answer];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center justify-between bg-neutral-100 hover:bg-neutral-200/60 transition-colors px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-neutral-200"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 ml-4 w-7 h-7 rounded-full bg-white border border-neutral-200 inline-flex items-center justify-center text-neutral-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pt-3 pb-5 bg-white border-x border-b border-neutral-200 rounded-b-2xl">
                          <div className="space-y-3">
                            {answerArray.map((paragraph, pIndex) => (
                              <motion.p
                                key={pIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + pIndex * 0.04 }}
                                className="text-neutral-700 leading-relaxed text-[13px] sm:text-sm"
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
      </div>
    </section>
  );
}