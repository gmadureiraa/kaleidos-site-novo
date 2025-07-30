"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Card {
  id: number;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

interface StackCardsProps {
  cards: Card[];
}

export default function StackCards({ cards }: StackCardsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`relative cursor-pointer transition-all duration-300 ${
            expandedCard === card.id ? "z-50" : "z-10"
          }`}
          style={{ zIndex: expandedCard === card.id ? 50 : 10 - index }}
          onClick={() => handleCardClick(card.id)}
          layout
        >
          <motion.div
            className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
              expandedCard === card.id
                ? "shadow-xl scale-105"
                : "hover:scale-102"
            }`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {expandedCard === card.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </motion.div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedCard === card.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{card.content}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
} 