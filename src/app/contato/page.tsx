"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Send, Check, Clock, Star, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import { useState } from "react";
import { WHATSAPP_NUMBER, SERVICOS } from "@/lib/constants";
import { FooterDemo } from "@/components/ui/footer-demo";
import { useAnalytics } from "@/components/analytics";
import { track, identifyLead } from "@/lib/analytics";
import { getAttributionMeta } from "@/lib/attribution";
import { KALEIDOS_METRICS } from "@/lib/metrics";

export default function ContatoPage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { trackWhatsApp } = useAnalytics();

  // Form de captura — chama /api/contact (Resend + posthog + rate-limit prontos)
  const [form, setForm] = useState({ nome: "", email: "", empresa: "", whatsapp: "", budget: "", mensagem: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [formError, setFormError] = useState<string>("");
  // Honeypot — campo invisível, bots preenchem.
  const [hp, setHp] = useState("");

  const BUDGETS_PT = [
    "Até R$ 5k/mês",
    "R$ 5k–15k/mês",
    "R$ 15k–30k/mês",
    "Acima de R$ 30k/mês",
    "Pontual / projeto único",
  ];
  const BUDGETS_EN = [
    "Up to R$ 5k/mo",
    "R$ 5k–15k/mo",
    "R$ 15k–30k/mo",
    "Above R$ 30k/mo",
    "One-off / single project",
  ];
  const BUDGETS = locale === 'en' ? BUDGETS_EN : BUDGETS_PT;

  const handleFormChange = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "sending") return;
    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) {
      setFormError(locale === 'en' ? 'Please fill name, email and message.' : 'Preencha nome, email e mensagem.');
      setFormState("error");
      return;
    }
    setFormError("");
    setFormState("sending");
    try {
      const mensagemFinal = [
        form.mensagem.trim(),
        form.whatsapp ? `\n\nWhatsApp: ${form.whatsapp}` : "",
        form.budget ? `\nBudget: ${form.budget}` : "",
        selectedServices.length ? `\nServiços de interesse: ${selectedServices.join(", ")}` : "",
      ].join("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          empresa: form.empresa.trim(),
          mensagem: mensagemFinal,
          servicos: selectedServices,
          locale,
          _hp: hp,
          metadata: getAttributionMeta(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "send_failed");
      }
      // Funil: lead_submit nomeado + identify (merge da jornada anônima no PostHog)
      track("lead_submit", {
        source: "contact-form",
        path: "/contato",
        budget: form.budget || null,
        services: selectedServices.join(", ") || null,
      });
      identifyLead(form.email, { name: form.nome, company: form.empresa || null });
      setFormState("ok");
      setForm({ nome: "", email: "", empresa: "", whatsapp: "", budget: "", mensagem: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      setFormError(locale === 'en'
        ? (msg === 'rate_limited' ? 'Too many requests. Try again later.' : 'Could not send. Try again or use WhatsApp.')
        : (msg === 'rate_limited' ? 'Muitas tentativas. Aguarde um pouco.' : 'Não conseguimos enviar. Tente novamente ou use o WhatsApp.'));
      setFormState("error");
    }
  };
  
  // Lista de serviços traduzida quando EN
  const SERVICES_LOCALIZED: string[] = locale === 'en'
    ? [
        'Video Editing',
        'Scripts',
        'Text Content',
        'Launches',
        'Pages and Websites',
        'Growth',
        'Email Marketing',
        'Content Consulting',
        'Design',
        'Social Media',
        'Copywriting',
        'Automation',
        'AI & Chatbots',
        'Data Analysis',
        'SEO',
      ]
    : SERVICOS;

  const toggleServico = (servico: string) => {
    setSelectedServices((prev) =>
      prev.includes(servico) ? prev.filter((s) => s !== servico) : [...prev, servico]
    );
  };

  const handleWhatsApp = () => {
    const hasSelection = selectedServices.length > 0;
    const header = locale === 'en' ? 'Hello! I need help with:' : 'Olá! Preciso de ajuda com:';
    const fallback = locale === 'en' ? 'Hello! I need help with marketing and content.' : 'Olá! Preciso de ajuda com marketing e conteúdo.';
    let texto = `${header} %0A`;
    texto += selectedServices.map((s) => `- ${s}`).join("%0A");
    if (!hasSelection) texto = fallback;
    
    // Track WhatsApp click (Google Analytics)
    trackWhatsApp("contato_page", hasSelection ? `services_${selectedServices.length}` : "general");
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href={withLang('/cases')} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('contact','backToCases')}
          </Link>
        </div>
      </div>

      {/* Seção 1: Introdução */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">{t('contact','heroTitle')}</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{t('contact','heroText')}</p>
          </motion.div>
        </div>
      </section>

      {/* Seção 2: Nós podemos te ajudar */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">{t('contact','helpTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{t('contact','helpSubtitle')}</p>
            
            {/* Seleção de Serviços */}
            <div className="max-w-[800px] mx-auto mb-8">
              <motion.div 
                className="flex flex-wrap gap-3 overflow-visible justify-center"
                layout
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5,
                }}
              >
                {SERVICES_LOCALIZED.map((servico) => {
                  const isSelected = selectedServices.includes(servico);
                  return (
                    <motion.button
                      key={servico}
                      onClick={() => toggleServico(servico)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isSelected
                          ? "bg-[#7CFF6B] text-black shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      layout
                    >
                      <motion.div 
                        className="relative flex items-center"
                        animate={{ 
                          width: isSelected ? "auto" : "100%",
                          paddingRight: isSelected ? "1.5rem" : "0",
                        }}
                        transition={{
                          ease: [0.175, 0.885, 0.32, 1.275],
                          duration: 0.3,
                        }}
                      >
                        <span>{servico}</span>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30, 
                            mass: 0.5 
                          }}
                          className="absolute right-0"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#2a1711]" strokeWidth={1.5} />
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Botão WhatsApp */}
            <motion.button
              onClick={handleWhatsApp}
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#128C7E] transition-colors flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t('contact','whatsappButton')}
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Digital Marketing' : 'Marketing Digital'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Full digital marketing strategies, from ad campaigns to process automation.' : 'Estratégias completas de marketing digital, desde campanhas de anúncios até automação de processos.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Content Creation' : 'Criação de Conteúdo'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Creative, engaging content for your social channels, including videos, reels and optimized posts.' : 'Conteúdo criativo e envolvente para suas redes sociais, incluindo vídeos, reels e posts otimizados.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#7CFF6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locale==='en' ? 'Growth & Launches' : 'Growth & Lançamentos'}</h3>
              <p className="text-gray-600">
                {locale==='en' ? 'Growth strategies and launches that maximize your results and ROI.' : 'Estratégias de crescimento e lançamentos que maximizam seus resultados e ROI.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção 2.5: Form de captura — pra quem prefere email/agendar */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
              {locale === 'en' ? 'Prefer to write?' : 'Prefere escrever?'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'en'
                ? "Send a quick brief and the right person on our team will reply by email within 24h."
                : "Mande um briefing rápido e a pessoa certa do nosso time responde por email em até 24h."}
            </p>
          </motion.div>

          {formState === 'ok' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#7CFF6B]/40 rounded-2xl p-8 text-center shadow-sm"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-12 h-12 text-[#7CFF6B] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {locale === 'en' ? 'Got it! Talk to you soon.' : 'Recebido! Falamos em breve.'}
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                {locale === 'en'
                  ? "We'll reply by email within 24 business hours."
                  : 'Respondemos por email em até 24h úteis. Se for urgente, clique no WhatsApp acima.'}
              </p>
              <button
                type="button"
                onClick={() => setFormState('idle')}
                className="mt-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                {locale === 'en' ? 'Send another message' : 'Enviar outra mensagem'}
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-5"
              aria-label={locale === 'en' ? 'Contact form' : 'Formulário de contato'}
            >
              {/* Honeypot — escondido, bots tendem a preencher */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Não preencha:
                  <input
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact','name')} <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.nome}
                    onChange={(e) => handleFormChange('nome', e.target.value)}
                    placeholder={t('contact','placeholderName')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact','email')} <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="voce@empresa.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact','company')}
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    value={form.empresa}
                    onChange={(e) => handleFormChange('empresa', e.target.value)}
                    placeholder={t('contact','placeholderCompany')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp <span className="text-gray-400 text-xs font-normal">{locale === 'en' ? '(optional)' : '(opcional)'}</span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={(e) => handleFormChange('whatsapp', e.target.value)}
                    placeholder="+55 11 90000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === 'en' ? 'Budget range' : 'Faixa de investimento'} <span className="text-gray-400 text-xs font-normal">{locale === 'en' ? '(helps us route to the right person)' : '(ajuda a direcionar pra pessoa certa)'}</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={(e) => handleFormChange('budget', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm bg-white"
                >
                  <option value="">{locale === 'en' ? 'Select an option…' : 'Selecione…'}</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact','message')} <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) => handleFormChange('mensagem', e.target.value)}
                  placeholder={t('contact','placeholderMessage')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7CFF6B] focus:ring-2 focus:ring-[#7CFF6B]/30 outline-none transition text-sm resize-y"
                />
                {selectedServices.length > 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    {locale === 'en' ? 'Selected services: ' : 'Serviços selecionados: '}
                    <span className="text-gray-700 font-medium">{selectedServices.join(', ')}</span>
                  </p>
                )}
              </div>

              {formState === 'error' && formError && (
                <p className="text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex-1 sm:flex-none"
                >
                  {formState === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {locale === 'en' ? 'Sending…' : 'Enviando…'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contact','submit')}
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 sm:ml-2">
                  {locale === 'en'
                    ? 'By submitting you agree we may reply by email.'
                    : 'Ao enviar você concorda em receber nosso retorno por email.'}
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* Seção 3: Social proof + métricas */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — métricas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">
                {locale==='en' ? 'Numbers that speak for themselves' : 'Números que falam por si'}
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.projetosAtendidos}</div>
                  <div className="text-gray-400 text-sm mt-1">{locale==='en' ? 'Projects' : 'Projetos atendidos'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.videosEditados}</div>
                  <div className="text-gray-400 text-sm mt-1">{locale==='en' ? 'Edited videos' : 'Vídeos editados'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.viewsReels}</div>
                  <div className="text-gray-400 text-sm mt-1">{locale==='en' ? 'Reels views' : 'Views nos reels'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7CFF6B]">{KALEIDOS_METRICS.satisfacaoCliente}</div>
                  <div className="text-gray-400 text-sm mt-1">{locale==='en' ? 'Client satisfaction' : 'Satisfação dos clientes'}</div>
                </div>
              </div>

              {/* Mini depoimento */}
              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-[#7CFF6B] text-[#7CFF6B]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  {locale==='en'
                    ? '"Kaleidos understands the crypto market like no one else. Revenue grew 200% with their strategies."'
                    : '"A Kaleidos entende o mercado cripto como ninguém. Faturamento cresceu 200% com as estratégias deles."'}
                </p>
                <p className="text-[#7CFF6B] text-xs font-medium mt-3">— Gi, Bit das Minas</p>
              </div>
            </motion.div>

            {/* Right — response time + logos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-8"
            >
              <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 text-center">
                <Clock className="w-10 h-10 text-[#7CFF6B] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {locale==='en' ? 'We reply within 2h' : 'Respondemos em até 2h'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {locale==='en'
                    ? 'During business hours (Mon-Fri, 9am-6pm BRT)'
                    : 'Em horário comercial (Seg-Sex, 9h-18h)'}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-4 text-center">
                  {locale==='en' ? 'Trusted by' : 'Confiança de'}
                </p>
                <div className="flex flex-wrap justify-center gap-4 opacity-60">
                  {[
                    { name: "Crypto.com", logo: "/Clientes-logo/Crypto.com.png" },
                    { name: "Mercado Bitcoin", logo: "/Clientes-logo/MercadoBitcoin.png" },
                    { name: "Ledger", logo: "/Clientes-logo/Ledger.png" },
                    { name: "Neobankless", logo: "/Clientes-logo/Neobankless.png" },
                  ].map(client => (
                    <div key={client.name} className="h-8 w-24 relative">
                      <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="96px" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Link
                  href={withLang('/cases')}
                  className="inline-flex items-center text-[#7CFF6B] hover:text-[#5be04d] text-sm font-medium transition-colors"
                >
                  {locale==='en' ? 'See our cases' : 'Ver nossos cases'} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterDemo />
    </div>
  );
} 