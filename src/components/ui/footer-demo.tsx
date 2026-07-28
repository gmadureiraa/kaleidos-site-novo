"use client"
import { Mail, Phone, Instagram, Linkedin, ArrowRight, MessageCircle, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnalytics } from "@/components/analytics";
import { AUDIENCES } from "@/lib/audiences";

const linkClass =
  "text-gray-400 hover:text-[#7CF067] transition-colors text-sm flex items-center group min-h-11 lg:min-h-0"

function FooterLink({ href, children, external, onClick }: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  const arrow = (
    <ArrowRight className="ml-1 h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} onClick={onClick}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass} onClick={onClick}>
      {children}
      {arrow}
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-white font-semibold mb-2 lg:mb-3 text-sm uppercase tracking-wide">{children}</h4>;
}

export function FooterDemo() {
  const { t, locale } = useI18n();
  const { trackWhatsApp } = useAnalytics();
  const twitterHandle = (process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@digitalkaleidos").replace(/^@/, "");
  const instagramHandle = "digitalkaleidos";

  const services = locale === 'en'
    ? [
        { title: "Founder-Led Growth", href: "/marca-pessoal" },
        { title: "Content Marketing", href: "/servicos/marketing-conteudo" },
        { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa" },
        { title: "Growth & Launches", href: "/servicos/growth-lancamentos" },
        { title: "Crypto SEO & GEO", href: "/servicos/seo-cripto" },
        { title: "Web3 Consulting & GTM", href: "/servicos/consultoria-gtm" },
        { title: "PR & Communications", href: "/servicos/pr-assessoria" },
      ]
    : [
        { title: "Marca Pessoal para Founders", href: "/marca-pessoal" },
        { title: "Marketing de Conteúdo", href: "/servicos/marketing-conteudo" },
        { title: "Kaleidos AI", href: "/servicos/ia-automacoes-completa" },
        { title: "Growth e Lançamentos", href: "/servicos/growth-lancamentos" },
        { title: "SEO & GEO Cripto", href: "/servicos/seo-cripto" },
        { title: "Consultoria Web3 & GTM", href: "/servicos/consultoria-gtm" },
        { title: "PR & Assessoria", href: "/servicos/pr-assessoria" },
      ];

  const pages = locale === 'en'
    ? [
        { title: "Home", href: "/" },
        { title: "Cases", href: "/cases" },
        { title: "Blog", href: "/blog" },
        { title: "About", href: "/sobre" },
        { title: "Contact", href: "/contato" },
      ]
    : [
        { title: "Início", href: "/" },
        { title: "Cases", href: "/cases" },
        { title: "Blog", href: "/blog" },
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
      {/* ── Faixa de destaque: Founder-Led Growth ────────────────────────────
          Marca Pessoal é o produto que a Kaleidos quer vender, e como link de
          lista no meio de outros sete ele desaparecia. Aqui ele ganha a
          largura inteira, antes das colunas, com CTA próprio. */}
      <div className="border-b border-gray-800">
        <Link
          href="/marca-pessoal"
          className="group block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-9"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7CF067] mb-2">
                {locale === 'en' ? 'Founder-Led Growth' : 'Founder-Led Growth'}
              </span>
              <h3 className="text-white font-display text-2xl lg:text-3xl leading-tight max-w-2xl">
                {locale === 'en'
                  ? <>The company sells. <span className="text-gray-500">The founder convinces.</span></>
                  : <>Quem vende é a empresa. <span className="text-gray-500">Quem convence é o founder.</span></>}
              </h3>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                {locale === 'en'
                  ? 'Personal brand for CEOs and founders: content, cadence and authority that turn a profile into pipeline.'
                  : 'Marca pessoal para CEOs e founders: conteúdo, cadência e autoridade que transformam um perfil em pipeline.'}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 bg-[#7CF067] text-black px-5 py-3 rounded-lg font-semibold text-sm group-hover:bg-[#6BE85A] transition-colors">
              {locale === 'en' ? 'See how it works' : 'Ver como funciona'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </div>

      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-8">

          {/* Logo, Descrição e Social */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3">
              <Image
                src="/Kaleidos/logo/Logos-10.svg"
                alt="Kaleidos Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h3 className="ml-3 text-xl font-bold text-white font-display">Kaleidos</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              {t('footer','tagline')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 mb-5">
              <a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/${twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/kaleidos-digital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-gray-400 hover:text-[#7CF067] transition-colors"
                aria-label="WhatsApp"
                onClick={() => trackWhatsApp("footer_social", "social_links")}
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            {/* CTA Button */}
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-[#7CF067] text-black px-5 py-2.5 rounded-lg hover:bg-[#6BE85A] transition-all font-semibold text-sm group"
            >
              {locale === 'en' ? 'Get in Touch' : 'Falar Conosco'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Serviços */}
          <div>
            <ColumnTitle>{locale === 'en' ? 'Services' : 'Serviços'}</ColumnTitle>
            <ul className="lg:space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <FooterLink href={service.href}>
                    <span>{service.title}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Para quem — variantes de home por público */}
          <div>
            <ColumnTitle>{locale === 'en' ? 'For whom' : 'Para quem'}</ColumnTitle>
            <ul className="lg:space-y-2">
              {/* Só as marcadas com `inFooter` (ver src/lib/audiences.ts). As
                  outras páginas continuam no ar e indexáveis — quem chega nelas
                  pelo Google segue chegando. O que mudou é a vitrine: nove links
                  aqui viravam parede de texto e nenhum ganhava destaque. */}
              {AUDIENCES.filter((a) => a.inFooter).map((a) => (
                <li key={a.slug}>
                  <FooterLink href={`/${a.slug}`}>
                    <span>{locale === 'en' ? `Kaleidos for ${a.label}` : `Kaleidos para ${a.label}`}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegação */}
          <div>
            <ColumnTitle>{locale === 'en' ? 'Navigation' : 'Navegação'}</ColumnTitle>
            <ul className="lg:space-y-2">
              {pages.map((page, index) => (
                <li key={index}>
                  <FooterLink href={page.href}>
                    <span>{page.title}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <ColumnTitle>{locale === 'en' ? 'Contact' : 'Contato'}</ColumnTitle>
            <ul className="lg:space-y-2">
              <li>
                <FooterLink
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  external
                  onClick={() => trackWhatsApp("footer_contact", "contact_section")}
                >
                  <Phone className="h-4 w-4 mr-2 shrink-0" />
                  <span>WhatsApp</span>
                </FooterLink>
              </li>
              <li>
                <a
                  href="mailto:madureira@kaleidosdigital.com"
                  className={linkClass}
                >
                  <Mail className="h-4 w-4 mr-2 shrink-0" />
                  <span>Email</span>
                  <ArrowRight className="ml-1 h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400 text-center md:text-left">
              {t('footer','rights')}
            </p>
            <div className="flex items-center gap-x-6 text-xs text-gray-500">
              <Link href="/sobre" className="flex items-center min-h-11 md:min-h-0 hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'About' : 'Sobre'}
              </Link>
              <Link href="/contato" className="flex items-center min-h-11 md:min-h-0 hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Contact' : 'Contato'}
              </Link>
              <Link href="/privacidade" className="flex items-center min-h-11 md:min-h-0 hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Privacy' : 'Privacidade'}
              </Link>
              <Link href="/termos" className="flex items-center min-h-11 md:min-h-0 hover:text-[#7CF067] transition-colors">
                {locale === 'en' ? 'Terms' : 'Termos'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
