"use client";
import React, { useState, useEffect } from "react";
import { OrbitingCirclesDemo } from "@/components/orbiting-circles-demo";
import { AnimatedBeamDemo } from "@/components/animated-beam-demo";
import { IconCloudDemo } from "@/components/icon-cloud-demo";

// Componente wrapper para evitar problemas de hidratação
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-neutral-100 rounded-xl border border-neutral-200">
        <div className="text-neutral-500">Carregando...</div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ProcessSection() {
  return (
    <section id="processo" className="w-full bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-12 text-left sm:text-center font-display tracking-tight"
        >
          Como fazemos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col items-center shadow-lg min-h-[380px]">
            {/* Animação 1 */}
            <div className="w-full h-40 flex items-center justify-center mb-6 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
              <ClientOnly>
                <OrbitingCirclesDemo />
              </ClientOnly>
            </div>
            <div className="w-full">
              <h3 className="text-black text-2xl font-bold mb-2">01 Analisar</h3>
              <p className="text-neutral-700 text-base">
                Começamos com uma análise detalhada dos seus fluxos de trabalho atuais para identificar como a IA pode melhorar seus processos.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col items-center shadow-lg min-h-[380px]">
            {/* Animação 2 */}
            <div className="w-full h-40 flex items-center justify-center mb-6 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
              <ClientOnly>
                <AnimatedBeamDemo />
              </ClientOnly>
            </div>
            <div className="w-full">
              <h3 className="text-black text-2xl font-bold mb-2">02 Criar & Implementar</h3>
              <p className="text-neutral-700 text-base">
                Em seguida, nossos desenvolvedores criam soluções de IA personalizadas para sua empresa, priorizando qualidade e segurança continuamente.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col items-center shadow-lg min-h-[380px]">
            {/* Animação 3 */}
            <div className="w-full h-40 flex items-center justify-center mb-6 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
              <ClientOnly>
                <IconCloudDemo />
              </ClientOnly>
            </div>
            <div className="w-full">
              <h3 className="text-black text-2xl font-bold mb-2">03 Manter & Melhorar</h3>
              <p className="text-neutral-700 text-base">
                Após a implantação, seguimos dando suporte e melhorando continuamente as soluções implementadas para garantir os melhores resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 