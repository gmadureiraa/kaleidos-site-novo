"use client"
import { Instagram, Linkedin, Mail, Twitter, Phone } from "lucide-react"
// import { Footer } from "@/components/ui/footer"
import Image from "next/image"
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";

export function FooterDemo() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full bg-black border-t border-black"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Image 
              src="/logo/Logos-01.svg" 
              alt="Kaleidos Logo" 
              width={64} 
              height={64}
              className="h-16 w-16"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-white">Kaleidos</h3>
              <p className="text-sm text-gray-300">{t('footer','tagline')}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://wa.me/12936180547" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Phone className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/kaleidosdigital" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/kaleidosdigital" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/kaleidosdigital" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="mailto:madureira@kaleidosdigital.com" className="text-gray-300 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">{t('footer','rights')}</p>
        </div>
      </div>
    </motion.div>
  )
} 