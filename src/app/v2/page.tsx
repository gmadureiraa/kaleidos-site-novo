"use client";

// Duplicado de src/app/page.tsx
import { useState, useEffect } from "react";
import HeroKaleidos from "@/components/ui/hero-kaleidos";
import BentoGrid from "@/components/bento-grid";
import FAQSection from "@/components/faq-section";
import ProcessSection from "@/components/process-section";
import { CtaAjuda } from "@/components/ui/cta-ajuda";
import VideoCarousel from "@/components/video-carousel";
import Link from "next/link";
import { FooterDemo } from "@/components/ui/footer-demo";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) {
    return (
      <div className="w-full flex justify-center py-6 sm:py-8 lg:py-12 bg-white">
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] sm:h-[400px] md:h-[500px] lg:h-[570px] bg-gray-200 rounded-[16px] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default function HomeV2() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-white">
      <HeroKaleidos />
      <BentoGrid />
      <ProcessSection variant="light" />
      <div id="cases-section" className="w-full flex flex-col items-center justify-center py-6 sm:py-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.7 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 text-center font-display tracking-tight px-4"
        >
          {t('home','resultsHeading')}
        </motion.h2>
        <ClientOnly>
          <VideoCarousel />
        </ClientOnly>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.7 }}
          className="mt-8 sm:mt-12"
        >
          <Link 
            href="/cases"
            className="inline-block bg-pink-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:bg-pink-600 transition-colors text-base sm:text-lg shadow-lg"
          >
            Ver Todos os Cases
          </Link>
        </motion.div>
      </div>
      <CtaAjuda variant="light" />
      <FAQSection />
      <div id="contact-section">
        <FooterDemo />
      </div>
    </main>
  );
}


