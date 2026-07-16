"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const analysisSteps = [
  "Analisando dados...",
  "Buscando concorrentes...",
  "Criando estratégia...",
  "Desenvolvendo conteúdo...",
];

export function OrbitingCirclesDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-[160px] w-full">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* AI State Loading Container */}
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 w-full max-w-xs">
          {/* Header with Loading Spinner */}
          <div className="flex items-center gap-3 mb-4">
            {/* Animated Loading Spinner */}
            <div className="relative w-6 h-6 flex-shrink-0">
              <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#EC4899"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="#7CF067"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 font-mono text-sm"
              >
                {analysisSteps[currentStep]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          {/* Task List - Animated */}
          <div className="space-y-2">
            {analysisSteps.slice(1).map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: currentStep === index + 1 ? 1 : 0.4,
                  x: 0 
                }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 font-mono text-xs"
              >
                {index + 1} {step}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
