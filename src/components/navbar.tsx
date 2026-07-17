"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";

// CTA canônico: Calendly primário, WhatsApp secundário (mesmos links do resto do site).
const CALENDLY = "https://calendly.com/madureira-kaleidosdigital/30min";
const WHATSAPP_URL = "https://wa.me/5512997796835";

const servicesBase = {
  pt: [
    { title: "Marketing de Conteúdo", href: "/servicos/marketing-conteudo", description: "Estratégia, copy, roteiros e design que engajam e convertem." },
    { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa", description: "Agentes de IA e automações que multiplicam a produção." },
    { title: "Growth e Lançamentos", href: "/servicos/growth-lancamentos", description: "Funis, tráfego e operação completa de lançamento." },
    { title: "Social Media Cripto", href: "/servicos/social-media-cripto", description: "Gestão de redes nativa do mercado, no ritmo da narrativa." },
    { title: "SEO & GEO Cripto", href: "/servicos/seo-cripto", description: "Conteúdo que rankeia no Google e é citado pela IA." },
    { title: "PR & Assessoria", href: "/servicos/pr-assessoria", description: "Posicionamento, mídia e relações com veículos e research." },
    { title: "Influencer & KOL", href: "/servicos/influencer-kol", description: "Curadoria e campanhas com KOLs cripto reais." },
    { title: "Comunidade Cripto", href: "/servicos/comunidade-cripto", description: "Discord, Telegram e programas que retêm a comunidade." },
    { title: "Consultoria & GTM", href: "/servicos/consultoria-gtm", description: "Go-to-market e estratégia pra entrar no mercado certo." },
  ],
  en: [
    { title: "Content Marketing", href: "/servicos/marketing-conteudo", description: "Strategy, copy, scripts and design that engage and convert." },
    { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa", description: "AI agents and automations that multiply output." },
    { title: "Growth & Launches", href: "/servicos/growth-lancamentos", description: "Funnels, paid traffic and full launch operations." },
    { title: "Crypto Social Media", href: "/servicos/social-media-cripto", description: "Native social management, at the pace of the narrative." },
    { title: "Crypto SEO & GEO", href: "/servicos/seo-cripto", description: "Content that ranks on Google and gets cited by AI." },
    { title: "PR & Press", href: "/servicos/pr-assessoria", description: "Positioning, media and relations with outlets and research." },
    { title: "Influencer & KOL", href: "/servicos/influencer-kol", description: "Curation and campaigns with real crypto KOLs." },
    { title: "Crypto Community", href: "/servicos/comunidade-cripto", description: "Discord, Telegram and programs that retain community." },
    { title: "Consulting & GTM", href: "/servicos/consultoria-gtm", description: "Go-to-market and strategy to enter the right market." },
  ]
} as const;

// Removido dropdown de cases; menu aponta direto para /cases

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block rounded-md p-2.5 hover:bg-gray-100 transition-colors">
          <div className="text-sm leading-none font-medium text-gray-900">
            {title}
          </div>
          <p className="text-gray-600 line-clamp-2 text-xs leading-snug mt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function Navbar() {
  const { t, locale, switchLocale } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu mobile ao navegar — senão ele fica aberto cobrindo a nova página.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const services = servicesBase[locale];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50" role="navigation" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 flex-nowrap gap-4">
          {/* Logo */}
          <Link href={withLang('/')} className="flex items-center space-x-2">
            <Image
              src="/Kaleidos/logo/Logos-11.svg"
              alt="Kaleidos Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="text-xl font-bold text-white font-display">{t('nav','brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-200 bg-transparent border-none">
                    {t('nav','services')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[92vw] max-w-[760px] p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          className="mb-3 flex flex-col rounded-lg bg-gradient-to-r from-[#7CF067]/15 to-[#D262B2]/10 p-4 no-underline outline-hidden select-none focus:shadow-md"
                          href={withLang('/servicos')}
                        >
                          <div className="text-base font-semibold text-gray-900">
                            {t('nav','ourServices')}
                          </div>
                          <p className="text-gray-600 text-sm leading-tight">
                            {t('nav','servicesDesc')}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                          <ListItem key={service.title} title={service.title} href={withLang(service.href)}>
                            {service.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={withLang('/cases')} className="text-white hover:text-gray-200 bg-transparent border-none px-4 py-2 rounded-md">
                      {t('nav','cases')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={withLang('/portfolio')} className="text-white hover:text-gray-200 bg-transparent border-none px-4 py-2 rounded-md">
                      {locale === 'en' ? 'Portfolio' : 'Portfólio'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                     <Link href={withLang('/sobre')} className="text-white hover:text-gray-200 bg-transparent border-none px-4 py-2 rounded-md">
                      {t('nav','about')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className="text-white hover:text-gray-200 bg-transparent border-none px-4 py-2 rounded-md">
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/* CTA primário → Calendly (agendar reunião) + WhatsApp secundário */}
            <div className="flex items-center gap-3">
              <Button asChild className="bg-[#7CF067] text-black hover:bg-[#64e04d] font-semibold touch-target">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  {t('nav','cta')}
                </a>
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-300 hover:text-white underline underline-offset-4 whitespace-nowrap"
              >
                {locale === 'en' ? 'WhatsApp' : 'WhatsApp'}
              </a>
            </div>
            {/* Language switcher - desktop */}
            <div className="flex items-center gap-1 ml-2" role="group" aria-label="Seletor de idioma">
              <button 
                onClick={() => switchLocale('pt')} 
                className={`text-xs px-3 py-2 rounded touch-target ${locale==='pt'?'bg-white text-black':'text-white border border-white/30'}`}
                aria-label="Alterar idioma para Português"
                aria-pressed={locale === 'pt'}
              >
                PT
              </button>
              <button 
                onClick={() => switchLocale('en')} 
                className={`text-xs px-3 py-2 rounded touch-target ${locale==='en'?'bg-white text-black':'text-white border border-white/30'}`}
                aria-label="Alterar idioma para Inglês"
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile: language switch + menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center gap-1" role="group" aria-label="Seletor de idioma">
              <button 
                onClick={() => switchLocale('pt')} 
                className={`text-xs px-3 py-2 rounded touch-target ${locale==='pt'?'bg-white text-black':'text-white border border-white/30'}`}
                aria-label="Alterar idioma para Português"
                aria-pressed={locale === 'pt'}
              >
                PT
              </button>
              <button 
                onClick={() => switchLocale('en')} 
                className={`text-xs px-3 py-2 rounded touch-target ${locale==='en'?'bg-white text-black':'text-white border border-white/30'}`}
                aria-label="Alterar idioma para Inglês"
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200"
              aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-gray-800 py-4" role="navigation" aria-label="Navegação mobile">
            <div className="space-y-4">
              {/* Serviços */}
              <div>
                <div className="text-sm font-medium text-white mb-2">{t('nav','services')}</div>
                <div className="space-y-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={withLang(service.href)}
                      className="block text-sm text-gray-300 hover:text-white py-1"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Cases (apenas link para página) */}
              <div>
                <Link href={withLang('/cases')} className="block text-sm font-medium text-white py-1">
                  {t('nav','cases')}
                </Link>
              </div>
              {/* Portfólio */}
              <div>
                <Link href={withLang('/portfolio')} className="block text-sm font-medium text-white py-1">
                  {locale === 'en' ? 'Portfolio' : 'Portfólio'}
                </Link>
              </div>
              {/* Blog */}
              <div>
                <Link href="/blog" className="block text-sm font-medium text-white py-1">
                  Blog
                </Link>
              </div>
              {/* Outros Links */}
              <div className="space-y-2">
                <Link href={withLang('/sobre')} className="block text-sm text-gray-300 hover:text-white py-1">
                  {t('nav','about')}
                </Link>
              </div>
              {/* Mobile CTA → Calendly primário + WhatsApp secundário */}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <Button asChild className="w-full bg-[#7CF067] text-black hover:bg-[#64e04d] font-semibold touch-target">
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                    {t('nav','cta')}
                  </a>
                </Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-gray-300 hover:text-white underline underline-offset-4 py-1"
                >
                  {locale === 'en' ? 'Prefer WhatsApp?' : 'Prefere WhatsApp?'}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 