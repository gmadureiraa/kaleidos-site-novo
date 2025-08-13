"use client";
import React, { useState, useEffect } from "react";
import { OrbitingCirclesDemo } from "@/components/orbiting-circles-demo";
import { AnimatedBeamDemo } from "@/components/animated-beam-demo";
import { IconCloudDemo } from "@/components/icon-cloud-demo";
import { useI18n } from "@/i18n/useI18n";

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

export default function ProcessSection({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { t } = useI18n();
  return (
    <section id="processo" className={`w-full ${variant === 'dark' ? 'bg-black' : 'bg-white'} py-12 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl sm:text-5xl font-bold ${variant === 'dark' ? 'text-white' : 'text-black'} mb-12 text-left sm:text-center font-display tracking-tight`}
        >
          {t('process','heading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col items-start shadow-[0_6px_24px_rgba(0,0,0,0.06)] min-h-[360px]">
            {/* Animação integrada */}
            <div className="w-full h-[180px] flex items-center justify-center mb-4 overflow-hidden">
              <ClientOnly>
                <OrbitingCirclesDemo />
              </ClientOnly>
            </div>
            <h3 className="text-black text-xl md:text-2xl font-bold mb-2 tracking-tight">{t('process','step1Title')}</h3>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{t('process','step1Text')}</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col items-start shadow-[0_6px_24px_rgba(0,0,0,0.06)] min-h-[360px]">
            {/* Animação integrada */}
            <div className="w-full h-[180px] flex items-center justify-center mb-4 overflow-hidden">
              <ClientOnly>
                <AnimatedBeamDemo />
              </ClientOnly>
            </div>
            <h3 className="text-black text-xl md:text-2xl font-bold mb-2 tracking-tight">{t('process','step2Title')}</h3>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{t('process','step2Text')}</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col items-start shadow-[0_6px_24px_rgba(0,0,0,0.06)] min-h-[360px]">
            {/* Animação integrada */}
            <div className="w-full h-[180px] flex items-center justify-center mb-4 overflow-hidden">
              <ClientOnly>
                <IconCloudDemo />
              </ClientOnly>
            </div>
            <h3 className="text-black text-xl md:text-2xl font-bold mb-2 tracking-tight">{t('process','step3Title')}</h3>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{t('process','step3Text')}</p>
          </div>
        </div>
      </div>
    </section>
  );
} 