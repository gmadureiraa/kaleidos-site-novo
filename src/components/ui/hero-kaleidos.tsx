"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useI18n } from "@/i18n/useI18n"

export default function HeroKaleidos() {
  const { t, locale } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-black to-black"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        {/* Logo - Mobile: acima, Desktop: ao lado */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Logo no mobile (acima) */}
          <div className="sm:hidden">
            <Image
              src="/logo/Logos-10.svg"
              alt="Kaleidos Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
            />
          </div>
          
          {/* Logo no desktop (ao lado) */}
          <div className="hidden sm:block">
            <Image
              src="/logo/Logos-10.svg"
              alt="Kaleidos Logo"
              width={120}
              height={40}
              className="h-16 w-auto"
            />
          </div>
          
          <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            <span className="text-green-400 font-display">Kaleidos</span> Digital
          </h1>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-8 font-sans">
          {t('home','heroTagline1')}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
          {t('home','heroTagline2')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => document.getElementById("cases-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto shadow-lg"
          >
            {t('home','heroSeeCases')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("ajuda-section")?.scrollIntoView({ behavior: "smooth" })}
            className="border-white text-white hover:bg-white hover:text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto bg-transparent"
          >
            {t('home','heroContact')}
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8"
      >
        <div className="text-white animate-bounce">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </motion.div>
    </section>
  )
} 