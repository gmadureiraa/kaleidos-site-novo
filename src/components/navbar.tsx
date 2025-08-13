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
import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";

const servicesBase = {
  pt: [
    { title: "Marketing de Conteúdo", href: "/servicos/marketing-conteudo", description: "Estratégias de conteúdo que engajam e convertem." },
    { title: "IA e Automações", href: "/servicos/ia-automacoes", description: "Automatize processos com inteligência artificial." },
    { title: "Growth e Lançamentos", href: "/servicos/growth-lancamentos", description: "Estratégias de crescimento e lançamentos de produtos." },
  ],
  en: [
    { title: "Content Marketing", href: "/servicos/marketing-conteudo", description: "Content strategies that engage and convert." },
    { title: "AI & Automations", href: "/servicos/ia-automacoes", description: "Automate processes with artificial intelligence." },
    { title: "Growth & Launches", href: "/servicos/growth-lancamentos", description: "Growth strategies and product launches." },
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
        <Link href={href}>
          <div className="text-sm leading-none font-medium text-gray-900">
            {title}
          </div>
          <p className="text-gray-600 line-clamp-2 text-sm leading-snug mt-1">
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
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const services = servicesBase[locale];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 flex-nowrap gap-4">
          {/* Logo */}
          <Link href={withLang('/')} className="flex items-center space-x-2">
            <Image
              src="/logo/Logos-11.svg"
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
                    <ul className="grid gap-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                           <Link
                            className="from-[#7CFF6B]/10 to-[#7CFF6B]/5 flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                             href={withLang('/#servicos')}
                          >
                             <div className="mt-4 mb-2 text-lg font-medium text-gray-900">
                               {t('nav','ourServices')}
                            </div>
                             <p className="text-gray-600 text-sm leading-tight">
                               {t('nav','servicesDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {services.map((service) => (
                         <ListItem key={service.title} title={service.title} href={withLang(service.href)}>
                          {service.description}
                        </ListItem>
                      ))}
                    </ul>
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
                     <Link href={withLang('/sobre')} className="text-white hover:text-gray-200 bg-transparent border-none px-4 py-2 rounded-md">
                      {t('nav','about')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/* CTA Button */}
            <Button asChild className="bg-[#7CFF6B] text-black hover:bg-[#64e04d] font-semibold">
              <Link href={withLang('/contato')}>
                {t('nav','cta')}
              </Link>
            </Button>
            {/* Language switcher - desktop */}
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => switchLocale('pt')} className={`text-xs px-2 py-1 rounded ${locale==='pt'?'bg-white text-black':'text-white border border-white/30'}`}>PT</button>
              <button onClick={() => switchLocale('en')} className={`text-xs px-2 py-1 rounded ${locale==='en'?'bg-white text-black':'text-white border border-white/30'}`}>EN</button>
            </div>
          </div>

          {/* Mobile: language switch + menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button onClick={() => switchLocale('pt')} className={`text-xs px-2 py-1 rounded ${locale==='pt'?'bg-white text-black':'text-white border border-white/30'}`}>PT</button>
              <button onClick={() => switchLocale('en')} className={`text-xs px-2 py-1 rounded ${locale==='en'?'bg-white text-black':'text-white border border-white/30'}`}>EN</button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4">
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
              {/* Outros Links */}
              <div className="space-y-2">
                <Link href={withLang('/sobre')} className="block text-sm text-gray-300 hover:text-white py-1">
                  {t('nav','about')}
                </Link>
              </div>
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-800">
                <Button asChild className="w-full bg-[#7CFF6B] text-black hover:bg-[#64e04d] font-semibold">
                  <Link href={withLang('/contato')}>
                    {t('nav','cta')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 