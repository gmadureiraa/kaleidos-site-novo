"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const tweetPrints = [
  {
    id: 1,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.46.31.png",
    alt: "Print do Tweet Crypto.com 1"
  },
  {
    id: 2,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.46.26.png",
    alt: "Print do Tweet Crypto.com 2"
  },
  {
    id: 3,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.46.20.png",
    alt: "Print do Tweet Crypto.com 3"
  },
  {
    id: 4,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.45.29.png",
    alt: "Print do Tweet Crypto.com 4"
  },
  {
    id: 5,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.37.28.png",
    alt: "Print do Tweet Crypto.com 5"
  },
  {
    id: 6,
    src: "/Conteudo_clientes/Crypto.com/Captura de Tela 2025-07-26 às 22.37.16.png",
    alt: "Print do Tweet Crypto.com 6"
  }
];

export function CryptoTweetsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTweet = () => {
    setCurrentIndex((prev) => (prev + 1) % tweetPrints.length);
  };

  const prevTweet = () => {
    setCurrentIndex((prev) => (prev - 1 + tweetPrints.length) % tweetPrints.length);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Conteúdo criado para o Twitter/X
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevTweet}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} de {tweetPrints.length}
          </span>
          <button
            onClick={nextTweet}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm overflow-hidden">
            <div className="relative w-full h-auto">
              <Image
                src={tweetPrints[currentIndex].src}
                alt={tweetPrints[currentIndex].alt}
                width={400}
                height={600}
                className="w-full h-auto rounded-lg"
                priority={currentIndex === 0}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-6">
        {tweetPrints.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 