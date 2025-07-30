"use client";

/**
 * @author: @dorian_baffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
    text: string;
    category: string;
}

// Default services for content marketing
const defaultServices: Service[] = [
    { text: "Automações com IA", category: "Tecnologia" },
    { text: "Copy que Viraliza", category: "Marketing" },
    { text: "Roteiros Inteligentes", category: "Conteúdo" },
    { text: "Edição Criativa", category: "Produção" },
    { text: "Newsletters que Convertem", category: "Email" },
    { text: "Growth Hacking", category: "Crescimento" },
    { text: "Social Media", category: "Redes" },
    { text: "Estratégia Digital", category: "Planejamento" },
];

// AI automation services
const aiServices: Service[] = [
    { text: "Processos Repetitivos", category: "Automação" },
    { text: "Análise de Dados", category: "IA" },
    { text: "Email Marketing", category: "Automação" },
    { text: "Social Media", category: "Redes" },
    { text: "Atendimento ao Cliente", category: "Chatbot" },
    { text: "Relatórios Automáticos", category: "Análise" },
    { text: "Gestão de Leads", category: "CRM" },
    { text: "Conteúdo Inteligente", category: "IA" },
];

interface DynamicTextProps {
    variant?: "default" | "ai";
    className?: string;
}

const DynamicText = ({ variant = "default", className = "" }: DynamicTextProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    const services = variant === "ai" ? aiServices : defaultServices;

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= services.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prevIndex;
                }

                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [isAnimating, services.length]);

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    return (
        <section
            className={`flex min-h-[120px] items-center justify-center gap-1 p-4 ${className}`}
            aria-label="Serviços da Kaleidos"
        >
            <div className="relative h-16 w-80 flex items-center justify-center overflow-visible">
                {isAnimating ? (
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            className="absolute flex items-center gap-3 text-2xl font-bold text-current"
                            aria-live="off"
                            initial={textVariants.hidden}
                            animate={textVariants.visible}
                            exit={textVariants.exit}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div
                                className={`h-3 w-3 rounded-full ${
                                    variant === "ai" ? "bg-blue-500" : "bg-pink-500"
                                }`}
                                aria-hidden="true"
                            />
                            {services[currentIndex].text}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="flex items-center gap-3 text-2xl font-bold text-current">
                        <div
                            className={`h-3 w-3 rounded-full ${
                                variant === "ai" ? "bg-blue-500" : "bg-pink-500"
                            }`}
                            aria-hidden="true"
                        />
                        {services[currentIndex].text}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DynamicText;
