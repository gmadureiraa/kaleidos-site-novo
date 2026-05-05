"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Mail,
  Search,
  FileText,
  PhoneCall,
  Workflow,
  Cpu,
  Compass,
  CheckCircle2,
  Sparkles,
  Radar,
  Film,
  Plus,
  Minus,
  ChevronRight,
  Calendar,
  Repeat,
  Wrench,
} from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import { FooterDemo } from "@/components/ui/footer-demo";
import { generateServiceSchema } from "@/lib/seo-helpers";
import { useAnalytics } from "@/components/analytics";
import CardFlip from "@/components/kokonutui/card-flip";
import AIStateLoading from "@/components/kokonutui/ai-state-loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * Kaleidos AI — landing de serviço institucional.
 * Promessa: até 70% do dia da operação, recuperado.
 * Tom: 3ª pessoa Kaleidos. Dark + lime #7CFF6B. Padrão visual /lp.
 */
export default function KaleidosIAPage() {
  const { locale } = useI18n();
  const { trackWhatsApp } = useAnalytics();

  const serviceSchema = generateServiceSchema(
    "Kaleidos AI — IA e Automações",
    "Auditoria + implementação de IA na operação. Até 70% do tempo recuperado em conteúdo, atendimento, pesquisa e cobrança."
  );

  const handleWhatsApp = (origem: string) => {
    const text = locale === "en"
      ? "Hi! I want to know more about Kaleidos AI. I have a bottleneck in:"
      : "Oi! Quero saber mais sobre o Kaleidos AI. Meu gargalo principal é:";
    trackWhatsApp("servico_ia_automacoes", origem);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleWhatsAppSpecific = (service: string) => {
    const message = `Olá! Preciso de ajuda com ${service}. Podem me ajudar?`;
    trackWhatsApp("servico_ia_automacoes", `service_${service}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main
      id="main-content"
      role="main"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Background gradient + grid (mesmo do /lp) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7CFF6B]/15 via-black to-black" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ================================================================ */}
      {/* 1. HERO                                                           */}
      {/* ================================================================ */}
      <HeroSection onCta={() => handleWhatsApp("hero_cta")} />

      {/* ================================================================ */}
      {/* 2. CARROSSEL FLIP — problema → solução IA (cards interativos)    */}
      {/* ================================================================ */}
      <FlipCarouselSection
        locale={locale}
        onCard={(t) => handleWhatsAppSpecific(t)}
      />

      {/* ================================================================ */}
      {/* 3. GARGALOS ATACADOS                                              */}
      {/* ================================================================ */}
      <BottlenecksSection onCta={(g) => handleWhatsApp(`gargalo_${g}`)} />

      {/* ================================================================ */}
      {/* 4. PROCESSO                                                       */}
      {/* ================================================================ */}
      <ProcessSection />

      {/* ================================================================ */}
      {/* 5. CASES                                                          */}
      {/* ================================================================ */}
      <CasesSection />

      {/* ================================================================ */}
      {/* 6. PRODUTOS PRÓPRIOS                                              */}
      {/* ================================================================ */}
      <ProductsSection />

      {/* ================================================================ */}
      {/* 7. COMO TRABALHAMOS (modalidades sem preço)                       */}
      {/* ================================================================ */}
      <ModalitiesSection onCta={(t) => handleWhatsApp(`modalidade_${t}`)} />

      {/* ================================================================ */}
      {/* 8. FAQ                                                            */}
      {/* ================================================================ */}
      <FAQSection />

      {/* ================================================================ */}
      {/* 9. CTA FINAL + FORM                                               */}
      {/* ================================================================ */}
      <FinalCtaSection />

      <FooterDemo />
    </main>
  );
}

/* =================================================================== */
/* HERO                                                                */
/* =================================================================== */

function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#7CFF6B] sm:text-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#7CFF6B]" />
        Kaleidos AI · IA dentro da operação, não em volta dela
      </span>

      <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
        Até <span className="text-[#7CFF6B]">70% do dia</span> da tua operação,
        <br className="hidden sm:block" /> recuperado.
      </h1>

      <p className="mt-6 max-w-2xl text-base text-gray-400 sm:text-lg">
        A Kaleidos audita os gargalos do teu time, implementa IA dentro do fluxo
        que já existe e entrega o código no teu repositório. Sem lock-in, sem
        SaaS de aluguel, sem dashboard que ninguém abre.
      </p>

      <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={onCta}
          className="group inline-flex items-center gap-2 rounded-full bg-[#7CFF6B] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,255,107,0.7)] sm:text-base"
        >
          Agendar diagnóstico gratuito (30min)
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
        <a
          href="#gargalos"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#7CFF6B]/30 hover:bg-white/[0.06] sm:text-base"
        >
          Ver gargalos atacados
          <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#7CFF6B]" />
        </a>
      </div>

      {/* AI state pulse — substitui stat bar visual, mostra IA "respirando" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
      >
        <AIStateLoading />
      </motion.div>
    </section>
  );
}


/* =================================================================== */
/* GARGALOS ATACADOS                                                   */
/* =================================================================== */

function BottlenecksSection({
  onCta,
}: {
  onCta: (gargalo: string) => void;
}) {
  const items = [
    {
      Icon: Sparkles,
      gargalo: "Carrossel: 1h → 30s",
      antes: "Briefing → copy → design → revisão. 1h por peça, no melhor dia.",
      depois:
        "Brief de 3 linhas vira carrossel pronto pra postar com a Sequência Viral. 30s.",
      stack: "Sequência Viral",
    },
    {
      Icon: Film,
      gargalo: "Reels: 2h → 12 min",
      antes: "Cole o link, abre no Premiere, transcreve, refaz roteiro, edita.",
      depois:
        "Cole o link no Reels Viral. Análise cena por cena, roteiro adaptado e storyboard.",
      stack: "Reels Viral",
    },
    {
      Icon: Search,
      gargalo: "Pesquisa: 3 dias → 30 min",
      antes:
        "Equipe de research lendo concorrente, newsletter e Twitter pra montar um relatório.",
      depois:
        "Agentes varrem fonte, cruzam dado e devolvem briefing acionável em 30 min.",
      stack: "Agentes customizados",
    },
    {
      Icon: FileText,
      gargalo: "Reunião → 5 conteúdos",
      antes: "Gravou call de 1h, ninguém escuta de novo, insight some.",
      depois:
        "Transcrição entra no pipeline e vira post, e-mail, FAQ, onboarding e roteiro.",
      stack: "Repurpose pipeline",
    },
    {
      Icon: Mail,
      gargalo: "Cobrança manual → automática",
      antes:
        "Gestor olhando planilha, mandando WhatsApp, esquecendo follow-up.",
      depois:
        "Régua automática puxa do Stripe/Asaas, dispara mensagem na voz da marca, escala só caso de exceção.",
      stack: "Kaleidos Pay",
    },
    {
      Icon: PhoneCall,
      gargalo: "Atendimento N1 → agente",
      antes:
        "Time respondendo as mesmas 30 perguntas. Tempo médio de resposta: 4h.",
      depois:
        "Agente treinado na base do produto resolve N1 em segundos. Time só pega o que merece humano.",
      stack: "Chatbot proprietário",
    },
    {
      Icon: Workflow,
      gargalo: "Brief → entrega: 5 dias → 1 dia",
      antes:
        "Brief escrito, passa por 3 pessoas, perde contexto, volta pra ajuste.",
      depois:
        "Brief estruturado dispara fluxo IA + revisão humana. Primeira versão em 24h.",
      stack: "Pipeline editorial",
    },
    {
      Icon: Compass,
      gargalo: "Pitch deck: 1 semana → 3h",
      antes:
        "Sócio fazendo deck no Keynote, copiando dado de outro deck, refazendo gráfico.",
      depois:
        "Bullets viram deck estruturado com IA + design system da marca já aplicado.",
      stack: "Deck generator",
    },
  ];

  return (
    <section
      id="gargalos"
      aria-label="Gargalos atacados"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          O que muda na prática
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Oito gargalos que a Kaleidos ataca primeiro.
        </h2>
        <p className="mt-4 text-base text-gray-400">
          Cada um vem com diagnóstico, implementação e métrica de antes/depois.
          O código fica no repositório do cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((it, i) => (
          <motion.button
            key={it.gargalo}
            onClick={() => onCta(it.gargalo)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/20 hover:bg-white/[0.05]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#7CFF6B]/20 bg-[#7CFF6B]/10">
                <it.Icon className="h-5 w-5 text-[#7CFF6B]" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                {it.stack}
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-white">
              {it.gargalo}
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2 text-gray-500">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-600">
                  antes
                </span>
                <span className="flex-1">{it.antes}</span>
              </div>
              <div className="flex gap-2 text-gray-300">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CFF6B]">
                  depois
                </span>
                <span className="flex-1">{it.depois}</span>
              </div>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#7CFF6B] opacity-0 transition-opacity group-hover:opacity-100">
              Esse é o meu gargalo <ArrowUpRight className="h-3 w-3" />
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* =================================================================== */
/* PROCESSO                                                            */
/* =================================================================== */

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Diagnóstico gratuito",
      body: "Call de 30-45 min comigo. Mapeio teus 3 maiores gargalos e te entrego um plano. Sem custo, sem compromisso. No fim, se fizer sentido, oferto a implementação completa.",
      duration: "30-45 min · gratuito",
    },
    {
      number: "02",
      title: "Mapa de gargalos",
      body: "Sai do diagnóstico um mapa: o que automatiza primeiro, o que precisa de processo antes, o que é IA-resolvível e o que não é.",
      duration: "Entregue em 48h",
    },
    {
      number: "03",
      title: "Build",
      body: "4 a 8 semanas. Time da Kaleidos implementa direto na stack do cliente. Sprints quinzenais, código no repositório dele desde o dia 1.",
      duration: "4-8 semanas",
    },
    {
      number: "04",
      title: "Iteração contínua",
      body: "Mensal. Métrica de hora liberada / lead / peça é revisada. Próximos gargalos atacados. O sistema vira ativo, não projeto fechado.",
      duration: "Recorrente",
    },
  ];

  return (
    <section
      aria-label="Processo"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Como funciona
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Quatro passos do diagnóstico ao sistema rodando.
        </h2>
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.number}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
              Passo {s.number}
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{s.body}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#7CFF6B]">
              <Clock className="h-3 w-3" /> {s.duration}
            </div>
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-[#7CFF6B]/40 to-transparent md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =================================================================== */
/* CASES                                                               */
/* =================================================================== */

function CasesSection() {
  // Cases destaque (2 protagonistas — narrativa concreta)
  const featured = [
    {
      slug: "renan-consultoria",
      cliente: "Renan · Consultoria financeira",
      vertical: "Consultor financeiro",
      stack: "Reunião → plano executável (IA + plataforma compartilhada)",
      headline: "Reuniões 1-1 que viram plano executável automaticamente.",
      antes:
        "Toda call era papel e áudio. Plano definido na hora, mas detalhes sumiam até sexta. Cliente esquecia tarefa, consultor esquecia follow-up. Tudo manual.",
      depois:
        "Encontro é gravado e resumido por IA. Durante a call, o plano já é montado e cai numa plataforma compartilhada (consultor + cliente): resumo da conversa, tarefas pra cada lado, prazos e próximos passos.",
      destaque:
        "Zero detalhe perdido. Cliente acompanha o plano sozinho. Consultor escala atendimento sem perder qualidade.",
    },
    {
      slug: "radar-viral",
      cliente: "Radar Viral · Plataforma própria Kaleidos",
      vertical: "Cross-post automatizado",
      stack: "Monitor de postagens + geração cross-rede",
      headline: "1 vídeo → 5 conteúdos cross-rede em minutos.",
      antes:
        "Criador posta vídeo no YouTube ou Instagram e perde reach: cross-post é manual, ou simplesmente não acontece. Voz inconsistente, esforço dobrado, métrica fragmentada.",
      depois:
        "O Radar monitora as postagens e gera automaticamente os derivados pra cada rede: thread no X, post LinkedIn, carrossel IG, e-mail de newsletter. Voz consistente, formato adaptado pra cada canal.",
      destaque: "+5 redes cobertas em 1 click. Minutos no lugar de horas.",
    },
  ];

  return (
    <section
      aria-label="Cases"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Quem já confia
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Cases reais, operação rodando hoje.
        </h2>
        <p className="mt-4 text-base text-gray-400">
          Dois exemplos do que a Kaleidos resolve quando IA entra dentro do
          fluxo, não em cima dele.
        </p>
      </div>

      {/* Cases destaque — 2 protagonistas com antes/depois */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="group flex flex-col rounded-2xl border border-[#7CFF6B]/15 bg-gradient-to-br from-[#7CFF6B]/[0.04] via-white/[0.02] to-white/[0.02] p-6 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/30 hover:bg-white/[0.05] sm:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#7CFF6B]">
                {c.vertical}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">
              {c.cliente}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#7CFF6B]">
              {c.stack}
            </p>
            <p className="mt-4 font-display text-lg leading-snug text-white sm:text-xl">
              {c.headline}
            </p>

            <div className="mt-5 space-y-3 border-t border-white/5 pt-5 text-sm">
              <div className="flex gap-3 text-gray-500">
                <span className="font-mono text-[10px] shrink-0 uppercase tracking-wider text-gray-600 pt-0.5">
                  antes
                </span>
                <span className="flex-1">{c.antes}</span>
              </div>
              <div className="flex gap-3 text-gray-300">
                <span className="font-mono text-[10px] shrink-0 uppercase tracking-wider text-[#7CFF6B] pt-0.5">
                  depois
                </span>
                <span className="flex-1">{c.depois}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-white/5 pt-4 text-sm text-gray-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                Resultado ·{" "}
              </span>
              {c.destaque}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

/* =================================================================== */
/* PRODUTOS PRÓPRIOS                                                   */
/* =================================================================== */

function ProductsSection() {
  const products = [
    {
      Icon: Sparkles,
      name: "Sequência Viral",
      url: "viral.kaleidos.com.br",
      body: "Carrossel pronto pra postar a partir de um brief de 3 linhas. Voz da marca, design system, capa.",
    },
    {
      Icon: Radar,
      name: "Radar Viral",
      url: "radar.kaleidos.com.br",
      body: "Inteligência cross-platform diária: tema em alta com brief IA pra time pular pra dentro.",
    },
    {
      Icon: Film,
      name: "Reels Viral",
      url: "reels.kaleidos.com.br",
      body: "Cole o link de um reels concorrente. Análise cena por cena, roteiro adaptado, storyboard.",
    },
    {
      Icon: Cpu,
      name: "Kaleidos Pay",
      url: "kaleidos.com.br/pay",
      body: "Cobrança e propostas com régua automática. WhatsApp + e-mail na voz da marca.",
    },
  ];

  return (
    <section
      aria-label="Produtos próprios"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Tooling proprietário
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          A Kaleidos não &quot;usa IA&quot;. A Kaleidos constrói IA.
        </h2>
        <p className="mt-4 text-base text-gray-400">
          Quatro produtos próprios que o time usa internamente todo dia. Quando
          o cliente contrata, esses produtos entram no fluxo dele também.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {products.map((p) => (
          <a
            key={p.name}
            href={`https://${p.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/30 hover:bg-white/[0.05]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#7CFF6B]/20 bg-[#7CFF6B]/10">
              <p.Icon className="h-5 w-5 text-[#7CFF6B]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-semibold text-white">
                  {p.name}
                </span>
                <span className="truncate font-mono text-[10px] text-gray-500">
                  {p.url}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{p.body}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CFF6B]" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* =================================================================== */
/* MODALIDADES — Como trabalhamos (sem preço, com 3 modos)             */
/* =================================================================== */

function ModalitiesSection({ onCta }: { onCta: (tier: string) => void }) {
  const tiers = [
    {
      Icon: Calendar,
      name: "Diagnóstico gratuito",
      duration: "30-45 min · sem custo",
      description:
        "Call comigo. Mapeio teus 3 maiores gargalos e te entrego um plano. Sem compromisso. No fim, se fizer sentido, oferto a implementação completa.",
      bullets: [
        "Call de 30-45 min ao vivo",
        "Mapa dos 3 maiores gargalos",
        "Plano de ação executável",
        "Sem custo, sem compromisso",
      ],
      ctaLabel: "Agendar minha call gratuita",
      tier: "diagnostico",
    },
    {
      Icon: Repeat,
      name: "Implementação contínua",
      duration: "Mês a mês · mín. 3 meses",
      description:
        "Implementação rodando junto com o time. A Kaleidos toca os gargalos prioritários em sprints quinzenais com equipe interna nossa.",
      bullets: [
        "2-3 implementações de IA por sprint",
        "Equipe multidisciplinar dedicada (estratégia + dev + copy)",
        "Código no repositório do cliente, sem lock-in",
        "Reunião mensal com métrica de hora liberada",
      ],
      ctaLabel: "Quero implementação contínua",
      tier: "mensal",
      highlight: true,
    },
    {
      Icon: Wrench,
      name: "Sistema customizado",
      duration: "Escopo fechado",
      description:
        "Pipeline de IA construído sob medida pra um problema específico. Pra quem quer um produto próprio dentro da operação.",
      bullets: [
        "Discovery + arquitetura + build sob escopo",
        "Stack TS + Python + Supabase + Gemini/Claude",
        "Entrega como sistema, não como relatório",
        "Documentação + handoff técnico pro time interno",
      ],
      ctaLabel: "Quero um sistema próprio",
      tier: "custom",
    },
  ];

  return (
    <section
      aria-label="Como trabalhamos"
      className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Como trabalhamos
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Três modalidades, mesma Kaleidos por trás.
        </h2>
        <p className="mt-4 text-base text-gray-400">
          A maioria começa pela call gratuita de 30 min. Quem já mapeou o
          gargalo entra direto na implementação contínua. Pra plataforma própria,
          sistema customizado.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
              t.highlight
                ? "border-[#7CFF6B]/30 bg-[#7CFF6B]/[0.04] shadow-[0_0_60px_-30px_rgba(124,255,107,0.4)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            {t.highlight && (
              <span className="absolute right-5 top-5 rounded-full border border-[#7CFF6B]/30 bg-[#7CFF6B]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7CFF6B]">
                Mais buscado
              </span>
            )}

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#7CFF6B]/20 bg-[#7CFF6B]/10">
              <t.Icon className="h-5 w-5 text-[#7CFF6B]" />
            </div>

            <h3 className="font-display text-2xl font-semibold text-white">
              {t.name}
            </h3>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 self-start">
              <Clock className="h-3 w-3" /> {t.duration}
            </div>
            <p className="mt-3 text-sm text-gray-400 sm:text-[15px]">
              {t.description}
            </p>

            <ul className="mt-5 flex-1 space-y-2 border-t border-white/5 pt-5">
              {t.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7CFF6B]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onCta(t.tier)}
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                t.highlight
                  ? "bg-[#7CFF6B] text-black hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,255,107,0.7)]"
                  : "border border-white/15 bg-white/[0.03] text-white hover:border-[#7CFF6B]/30 hover:bg-white/[0.06]"
              }`}
            >
              {t.ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* CTA único */}
      <div className="mt-10 text-center">
        <p className="text-base text-gray-400">
          Conta o gargalo.{" "}
          <span className="text-white">Agenda uma call gratuita de 30 min comigo.</span>
        </p>
      </div>
    </section>
  );
}

/* =================================================================== */
/* FLIP CAROUSEL — antes (problema) ↔ depois (IA aplicada)             */
/* Reaproveita CardFlip + Carousel do desenho original.                */
/* =================================================================== */

function FlipCarouselSection({
  locale,
  onCard,
}: {
  locale: string;
  onCard: (title: string) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const autoplay = setInterval(() => {
      if (!isPaused) api.scrollNext();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [api, isPaused]);

  const cards = [
    {
      front: {
        title: locale === "en" ? "Time wasted" : "Tempo Perdido",
        description: locale === "en"
          ? "Hours on repetitive tasks that AI already solves."
          : "Horas em tarefas repetitivas que a IA já resolve.",
        bgGradient: "from-red-500 to-pink-600",
        borderColor: "border-red-400",
      },
      back: {
        title: locale === "en" ? "AI on the flow" : "IA no fluxo",
        description: locale === "en"
          ? "Automation inside the existing tool — not a parallel SaaS."
          : "Automação dentro da ferramenta que o time já usa, não SaaS paralelo.",
        features: locale === "en"
          ? ["Inside Notion/ClickUp", "Zero new login", "Plug into the workflow"]
          : ["Dentro do Notion/ClickUp", "Zero login novo", "Encaixa no fluxo"],
        bgGradient: "from-green-500 to-emerald-600",
        borderColor: "border-green-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual content" : "Conteúdo Manual",
        description: locale === "en"
          ? "Carousel from scratch, reels edited frame by frame."
          : "Carrossel do zero, reels editado frame a frame.",
        bgGradient: "from-blue-500 to-indigo-600",
        borderColor: "border-blue-400",
      },
      back: {
        title: locale === "en" ? "1h → 30s" : "1h → 30s",
        description: locale === "en"
          ? "Brief in 3 lines becomes a carousel ready to post."
          : "Brief de 3 linhas vira carrossel pronto pra postar.",
        features: locale === "en"
          ? ["Brand voice", "Design system", "Cover ready"]
          : ["Voz da marca", "Design system", "Capa pronta"],
        bgGradient: "from-purple-500 to-violet-600",
        borderColor: "border-purple-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual research" : "Pesquisa Manual",
        description: locale === "en"
          ? "3 days reading newsletter and X to brief one client."
          : "3 dias lendo newsletter e X pra montar um briefing.",
        bgGradient: "from-yellow-500 to-orange-600",
        borderColor: "border-yellow-400",
      },
      back: {
        title: locale === "en" ? "3 days → 30 min" : "3 dias → 30 min",
        description: locale === "en"
          ? "Agents scan source, cross data and deliver an actionable brief."
          : "Agentes varrem fonte, cruzam dado e devolvem briefing acionável.",
        features: locale === "en"
          ? ["Newsletter, X, Gmail", "Cross-source", "Editable output"]
          : ["Newsletter, X, Gmail", "Cruzamento de fonte", "Output editável"],
        bgGradient: "from-teal-500 to-cyan-600",
        borderColor: "border-teal-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Manual analysis" : "Análise Manual",
        description: locale === "en"
          ? "Manual data collection, weekly report nobody reads."
          : "Coleta manual de dado, relatório semanal que ninguém lê.",
        bgGradient: "from-pink-500 to-rose-600",
        borderColor: "border-pink-400",
      },
      back: {
        title: locale === "en" ? "Live insight" : "Insight Ao Vivo",
        description: locale === "en"
          ? "Dashboard with insight ready, no one builds reports."
          : "Dashboard com insight pronto, ninguém monta relatório.",
        features: locale === "en"
          ? ["Real-time data", "Smart alert", "Decision over screen"]
          : ["Dado tempo real", "Alerta inteligente", "Decisão na tela"],
        bgGradient: "from-indigo-500 to-blue-600",
        borderColor: "border-indigo-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Inbox overload" : "Excesso de Email",
        description: locale === "en"
          ? "Hundreds of mails, no priority, no organization."
          : "Centenas de email, sem priorização, sem organização.",
        bgGradient: "from-emerald-500 to-green-600",
        borderColor: "border-emerald-400",
      },
      back: {
        title: locale === "en" ? "Triage agent" : "Agente Triagem",
        description: locale === "en"
          ? "AI organizes, prioritizes and drafts replies for review."
          : "IA organiza, prioriza e rascunha resposta pra revisão.",
        features: locale === "en"
          ? ["Daily summary", "Smart priority", "Auto draft"]
          : ["Resumo diário", "Prioridade inteligente", "Rascunho automático"],
        bgGradient: "from-violet-500 to-purple-600",
        borderColor: "border-violet-400",
      },
    },
    {
      front: {
        title: locale === "en" ? "Doesn't scale" : "Não Escala",
        description: locale === "en"
          ? "Process growing only with new hires."
          : "Processo só cresce com nova contratação.",
        bgGradient: "from-cyan-500 to-blue-600",
        borderColor: "border-cyan-400",
      },
      back: {
        title: locale === "en" ? "Total scale" : "Escala Total",
        description: locale === "en"
          ? "Systems that adapt to demand without a new hire."
          : "Sistemas que se adaptam à demanda sem contratar.",
        features: locale === "en"
          ? ["Auto growth", "Smart adaptation", "Cost flat"]
          : ["Crescimento auto", "Adaptação inteligente", "Custo flat"],
        bgGradient: "from-orange-500 to-red-600",
        borderColor: "border-orange-400",
      },
    },
  ];

  return (
    <section
      aria-label="Carrossel problema-solução"
      className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Problema ↔ Solução
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Passa o cursor. Cada card vira a virada.
        </h2>
        <p className="mt-4 text-base text-gray-400">
          Seis frentes onde a IA entra de fato — não &quot;ChatGPT aberto numa aba&quot;,
          mas dentro do fluxo. Hover pra ver a virada de cada uma.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        setApi={setApi}
        className="w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <CardFlip
                    onDark
                    title={card.front.title}
                    backTitle={card.back.title}
                    subtitle={card.front.description}
                    description={card.back.description}
                    features={card.back.features}
                    onStartNow={() => onCard(card.front.title)}
                    frontBgGradient={card.front.bgGradient}
                    frontBorderColor={card.front.borderColor}
                    backBgGradient={card.back.bgGradient}
                    backBorderColor={card.back.borderColor}
                  />
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white text-black hover:bg-gray-200" />
        <CarouselNext className="bg-white text-black hover:bg-gray-200" />
      </Carousel>
    </section>
  );
}

/* =================================================================== */
/* FAQ                                                                 */
/* =================================================================== */

function FAQSection() {
  // Top 4 — perguntas que de fato bloqueiam fechamento. Outras (nicho,
  // fidelidade, stack técnico, porte da empresa) ficam pra call de 30min
  // gratuita ou DM, evitando bloated FAQ que ninguém lê.
  const items = [
    {
      q: "Em quanto tempo eu vejo resultado?",
      a: "Em 30 dias o primeiro gargalo já tá rodando em produção. A métrica de hora liberada começa a subir a partir do mês 2. Mês 3 é onde a maioria dos clientes vê os 70% reais.",
    },
    {
      q: "O código fica com quem?",
      a: "Sempre com o cliente. Sem lock-in, sem dependência de SaaS terceiro pra rodar o que a Kaleidos construiu. O time entrega no repositório do cliente, com documentação.",
    },
    {
      q: "Que tipo de suporte tem depois da entrega?",
      a: "No mensal, suporte vai até o fim do contrato. Em sistema custom, a Kaleidos oferece SLA de manutenção opcional, ou faz handoff técnico pro time interno do cliente assumir.",
    },
    {
      q: "Como mede ROI?",
      a: "Hora liberada por mês x custo da hora do time x meses de operação. Se a Kaleidos libera 80h/mês de um time que custa R$ 200/h, o cálculo é simples. Aparece na reunião mensal.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="FAQ" className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7CFF6B]">
          Perguntas frequentes
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          O que decisor pergunta antes de fechar.
        </h2>
      </div>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {items.map((it, i) => {
          const open = openIndex === i;
          return (
            <button
              key={it.q}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full flex-col px-5 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-6 sm:py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-base font-medium text-white sm:text-lg">
                  {it.q}
                </span>
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  {open ? (
                    <Minus className="h-3 w-3 text-[#7CFF6B]" />
                  ) : (
                    <Plus className="h-3 w-3 text-gray-400" />
                  )}
                </span>
              </div>
              {open && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 text-sm text-gray-400 sm:text-[15px]"
                >
                  {it.a}
                </motion.p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* =================================================================== */
/* CTA FINAL + FORM                                                    */
/* =================================================================== */

function FinalCtaSection() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    tamanho: "",
    gargalo: "",
    whatsapp: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/lead-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (data.ok) {
        setStatus("ok");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  return (
    <section
      aria-label="CTA final"
      className="mx-auto mt-24 max-w-3xl px-4 pb-24 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#7CFF6B]/20 bg-gradient-to-br from-[#7CFF6B]/[0.08] via-white/[0.02] to-white/[0.02] p-8 sm:p-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#7CFF6B]/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            Agenda minha call gratuita.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#7CFF6B]">
            Diagnóstico gratuito · sem compromisso
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-gray-400">
            30-45 min comigo. Mapeio teus 3 maiores gargalos e te entrego um
            plano. Se fizer sentido, oferto a implementação no fim.
          </p>

          {status === "ok" ? (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#7CFF6B]/30 bg-[#7CFF6B]/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7CFF6B]/20">
                <CheckCircle2 className="h-6 w-6 text-[#7CFF6B]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Recebido.
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                A Kaleidos volta em até 48h pelo email{" "}
                <span className="text-[#7CFF6B]">{form.email}</span>. Se o
                gargalo é urgente, manda WhatsApp também.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Oi! Acabei de mandar o form do Kaleidos AI."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7CFF6B] px-5 py-2.5 text-sm font-semibold text-black hover:-translate-y-0.5 transition-transform"
              >
                Falar no WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field
                label="Nome"
                value={form.nome}
                onChange={(v) => setForm((f) => ({ ...f, nome: v }))}
                required
                placeholder="Seu nome"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
                placeholder="voce@empresa.com"
              />
              <Field
                label="Empresa"
                value={form.empresa}
                onChange={(v) => setForm((f) => ({ ...f, empresa: v }))}
                placeholder="Empresa (opcional)"
              />
              <Field
                label="WhatsApp"
                value={form.whatsapp}
                onChange={(v) => setForm((f) => ({ ...f, whatsapp: v }))}
                placeholder="DDD + número"
              />
              <SelectField
                label="Tamanho do time"
                value={form.tamanho}
                onChange={(v) => setForm((f) => ({ ...f, tamanho: v }))}
                options={[
                  { v: "", l: "Selecione" },
                  { v: "1-5", l: "1 a 5 pessoas" },
                  { v: "6-15", l: "6 a 15 pessoas" },
                  { v: "16-50", l: "16 a 50 pessoas" },
                  { v: "50+", l: "50+ pessoas" },
                ]}
                className="sm:col-span-2"
              />
              <TextareaField
                label="Qual o teu gargalo principal?"
                value={form.gargalo}
                onChange={(v) => setForm((f) => ({ ...f, gargalo: v }))}
                placeholder="Ex: gasto 3 dias por semana fazendo carrossel manual, ou: meu time atende as mesmas 30 perguntas no WhatsApp todo dia."
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2 flex flex-col items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#7CFF6B] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,255,107,0.7)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                  {status === "sending" ? "Enviando…" : "Agendar minha call gratuita"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                {status === "err" && (
                  <p className="text-xs text-red-400">
                    Algo deu errado. Tenta de novo ou manda WhatsApp.
                  </p>
                )}
                <p className="text-[11px] text-gray-500">
                  ou{" "}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Oi! Quero saber mais sobre o Kaleidos AI."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7CFF6B] hover:underline"
                  >
                    fala direto no WhatsApp
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
        <Link href="/" className="transition-colors hover:text-[#7CFF6B]">
          kaleidos.com.br
        </Link>
        <span className="text-gray-700" aria-hidden="true">
          •
        </span>
        <Link
          href="/cases"
          className="transition-colors hover:text-[#7CFF6B]"
        >
          Cases
        </Link>
        <span className="text-gray-700" aria-hidden="true">
          •
        </span>
        <Link
          href="/lp"
          className="transition-colors hover:text-[#7CFF6B]"
        >
          Sobre a Kaleidos
        </Link>
      </div>
    </section>
  );
}

/* ----------------- form fields ----------------- */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {label} {required && <span className="text-[#7CFF6B]">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#7CFF6B]/40 focus:outline-none focus:ring-2 focus:ring-[#7CFF6B]/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition-colors focus:border-[#7CFF6B]/40 focus:outline-none focus:ring-2 focus:ring-[#7CFF6B]/20"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v} className="bg-black">
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <textarea
        value={value}
        rows={4}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#7CFF6B]/40 focus:outline-none focus:ring-2 focus:ring-[#7CFF6B]/20"
      />
    </label>
  );
}
