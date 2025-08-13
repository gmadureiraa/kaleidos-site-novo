"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Workflow, CheckCircle } from "lucide-react";

const states = [
  {
    icon: Brain,
    title: "Analisando",
    subtitle: "Processando dados"
  },
  {
    icon: Zap,
    title: "Otimizando",
    subtitle: "Aplicando IA"
  },
  {
    icon: Workflow,
    title: "Automatizando",
    subtitle: "Criando workflows"
  },
  {
    icon: CheckCircle,
    title: "Pronto",
    subtitle: "Sistema ativo"
  }
];

export default function AIStateLoading() {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % states.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = states[currentState].icon;

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <CurrentIcon className="h-5 w-5 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold text-white mb-2">
            {states[currentState].title}
          </h3>
          <p className="text-gray-400 text-lg">
            {states[currentState].subtitle}
          </p>
        </motion.div>

        {/* Dots removidos a pedido */}
      </div>
    </div>
  );
} 