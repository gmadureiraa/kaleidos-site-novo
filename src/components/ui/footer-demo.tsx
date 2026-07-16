"use client"
import { Mail, Phone, Instagram, Linkedin, ArrowRight, MessageCircle, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnalytics } from "@/components/analytics";
import { AUDIENCES } from "@/lib/audiences";

export function FooterDemo() {
  const { t, locale } = useI18n();
  const { trackWhatsApp } = useAnalytics();
  const twitterHandle = (process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@digitalkaleidos").replace(/^@/, "");
  const instagramHandle = "digitalkaleidos";
  
  const services = locale === 'en'
    ? [
        { title: "Content Marketing", href: "/servicos/marketing-conteudo" },
        { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa" },
        { title: "Growth & Launches", href: "/servicos/growth-lancamentos" },
        { title: "Crypto SEO & GEO", href: "/servicos/seo-cripto" },
        { title: "Web3 Consulting & GTM", href: "/servicos/consultoria-gtm" },
        { title: "Crypto Social Media", href: "/servicos/social-media-cripto" },
        { title: "PR & Communications", href: "/servicos/pr-assessoria" },
        { title: "Community Management", href: "/servicos/comunidade-cripto" },
        { title: "Influencer & KOL", href: "/servicos/influencer-kol" },
      ]
    : [
        { title: "Marketing de Conteúdo", href: "/servicos/marketing-conteudo" },
        { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa" },
        { title: "Growth e Lançamentos", href: "/servicos/growth-lancamentos" },
        { title: "SEO & GEO Cripto", href: "/servicos/seo-cripto" },
        { title: "Consultoria Web3 & GTM", href: "/servicos/consultoria-gtm" },
        { title: "Social Media Cripto", href: "/servicos/social-media-cripto" },
        { title: "PR & Assessoria", href: "/servicos/pr-assessoria" },
        { title: "Gestão de Comunidade", href: "/servicos/comunidade-cripto" },
        { title: "Influencer & KOL", href: "/servicos/influencer-kol" },
      ];

  const pages = locale === 'en'
    ? [
        { title: "Home", href: "/" },
        { title: "Cases", href: "/cases" },
        { title: "Blog", href: "/blog" },
        { title: "Papers", href: "/papers" },
        { title: "About", href: "/sobre" },
        { title: "Contact", href: "/contato" },
      ]
    : [
        { title: "Início", href: "/" },
        { title: "Cases", href: "/cases" },
        { title: "Blog", href: "/blog" },
        { title: "Papers", href: "/papers" },
        { title: "Sobre", href: "/sobre" },
        { title: "Contato", href: "/contato" },
      ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full bg-black border-t border-gray-800"
    >
      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image 
                src="/Kaleidos/logo/Logos-10.svg" 
                alt="Kaleidos Logo" 
                width={48} 
                height={48}
                className="h-12 w-12"
              />
              <h3 className="ml-3 text-xl font-bold text-white font-display">Kaleidos</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('footer','tagline')}
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/${twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/kaleidos-digital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="WhatsApp"
                onClick={() => trackWhatsApp("footer_social", "social_links")}
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              {locale === 'en' ? 'Services' : 'Serviços'}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group"
                  >
                    <span>{service.title}</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              {locale === 'en' ? 'Navigation' : 'Navegação'}
            </h4>
            <ul className="space-y-3">
              {pages.map((page, index) => (
                <li key={index}>
                  <Link 
                    href={page.href}
                    className="text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group"
                  >
                    <span>{page.title}</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Para quem — variantes de home por público */}
            <h4 className="text-white font-semibold mb-4 mt-8 text-base">
              {locale === 'en' ? 'For whom' : 'Para quem'}
            </h4>
            <ul className="space-y-3">
              {AUDIENCES.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group"
                  >
                    <span>Kaleidos para {a.label}</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              {locale === 'en' ? 'Contact' : 'Contato'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group"
                  onClick={() => trackWhatsApp("footer_contact", "contact_section")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>WhatsApp</span>
                  <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:madureira@kaleidosdigital.com"
                  className="text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email</span>
                  <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
            </ul>
            
            {/* CTA Button */}
            <Link 
              href="/contato"
              className="mt-6 inline-flex items-center gap-2 bg-[#7CF067] text-black px-6 py-3 rounded-lg hover:bg-[#6BE85A] transition-all font-semibold text-sm group"
            >
              {locale === 'en' ? 'Get in Touch' : 'Falar Conosco'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Rodapé Inferior */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              {t('footer','rights')}
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="/sobre" className="hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'About' : 'Sobre'}
              </Link>
              <Link href="/contato" className="hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Contact' : 'Contato'}
              </Link>
              <Link href="/privacidade" className="hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Privacy' : 'Privacidade'}
              </Link>
              <Link href="/termos" className="hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Terms' : 'Termos'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 