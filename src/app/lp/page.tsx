"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  Geist_Mono,
} from "next/font/google";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Cpu,
  Globe,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getLeadMetadata } from "@/lib/lead-meta";
import { getTrackingIds } from "@/lib/tracking-ids";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  variable: "--font-instrument-serif",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Pixel Meta type
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const WA_TEXT = "Oi! Vi a Kaleidos e quero conversar sobre:";

function waLink(extra?: string) {
  const text = extra ? `${WA_TEXT} ${extra}` : WA_TEXT;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function KaleidosLPPage() {
  return (
    <div
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${geistMono.variable} kal-lp`}
    >
      <style jsx global>{`
        .kal-lp {
          --paper: #f5f1e8;
          --cream: #fbf7ee;
          --ink: #0a0908;
          --coal: #1a1816;
          --rec: #ff3d2e;
          --rec-hot: #ff5947;
          --muted: #6b6660;
          --line: #ddd7ca;
          --soft: #eae3d2;
          --amber: #f0b33c;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-plus-jakarta), system-ui, sans-serif;
          min-height: 100vh;
        }
        .kal-lp * {
          box-sizing: border-box;
        }
        .kal-lp .serif {
          font-family: var(--font-instrument-serif), Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }
        .kal-lp .mono {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
        }
        .kal-lp .eyebrow {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--rec);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .kal-lp .rec-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--rec);
          display: inline-block;
          animation: kal-pulse 1.6s ease-in-out infinite;
        }
        @keyframes kal-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        .kal-lp .card {
          background: var(--cream);
          border: 1.5px solid var(--ink);
          box-shadow: 3px 3px 0 0 var(--ink);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .kal-lp .card:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0 0 var(--ink);
        }
        .kal-lp .card-hot {
          background: var(--cream);
          border: 1.5px solid var(--ink);
          box-shadow: 5px 5px 0 0 var(--rec);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .kal-lp .card-hot:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 var(--rec);
        }
        .kal-lp .rdv-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ink);
          color: var(--paper);
          font-weight: 700;
          font-size: 14px;
          padding: 14px 22px;
          border: 1.5px solid var(--ink);
          box-shadow: 3px 3px 0 0 var(--ink);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .kal-lp .rdv-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 0 var(--rec);
        }
        .kal-lp .rdv-btn-rec {
          background: var(--rec);
          color: var(--paper);
          border: 1.5px solid var(--ink);
          box-shadow: 3px 3px 0 0 var(--ink);
        }
        .kal-lp .rdv-btn-rec:hover {
          background: var(--rec-hot);
        }
        .kal-lp .rdv-btn-ghost {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--ink);
          box-shadow: 3px 3px 0 0 var(--ink);
        }
        .kal-lp .rdv-btn-ghost:hover {
          background: var(--soft);
          box-shadow: 5px 5px 0 0 var(--ink);
        }
        .kal-lp .num-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: var(--muted);
          border: 1px solid var(--line);
          padding: 4px 10px;
          background: var(--paper);
          display: inline-block;
        }
        .kal-lp .grain::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.04;
          background-image:
            radial-gradient(rgba(10,9,8,0.6) 1px, transparent 1px);
          background-size: 3px 3px;
        }
        .kal-lp .scroll-x {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .kal-lp .scroll-x::-webkit-scrollbar { display: none; }
        .kal-lp input,
        .kal-lp textarea {
          background: var(--paper);
          border: 1.5px solid var(--ink);
          color: var(--ink);
          padding: 12px 14px;
          font-family: var(--font-plus-jakarta), system-ui, sans-serif;
          font-size: 14px;
          width: 100%;
          outline: none;
          box-shadow: 3px 3px 0 0 var(--ink);
        }
        .kal-lp input:focus,
        .kal-lp textarea:focus {
          box-shadow: 5px 5px 0 0 var(--rec);
        }
        .kal-lp ::placeholder { color: var(--muted); opacity: 0.7; }
        .kal-lp .divider {
          height: 1.5px;
          background: var(--ink);
          width: 100%;
        }
        .kal-lp h1, .kal-lp h2, .kal-lp h3 { color: var(--ink); }
      `}</style>

      <Hero />
      <Frentes />
      <Cases />
      <Stack />
      <Processo />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  return (
    <section className="relative overflow-hidden grain px-5 sm:px-10 pt-16 sm:pt-24 pb-16">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">
          <span className="rec-dot" />
          KALEIDOS · AGÊNCIA DE MARKETING + IA NATIVA DA CRIPTO
        </span>

        <h1 className="serif mt-6 text-[44px] leading-[0.96] sm:text-[72px] md:text-[96px] tracking-tight">
          A agência que constrói o sistema,<br className="hidden sm:block" /> não só o conteúdo.
        </h1>

        <p className="mt-7 max-w-2xl text-[17px] sm:text-[19px] leading-relaxed text-[var(--coal)]">
          No nicho cripto/web3/fintech desde 2020. Conteúdo, sites e
          automações com IA no mesmo time, operando marcas de ponta a ponta.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rdv-btn rdv-btn-rec"
          >
            Falar comigo <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#cases" className="rdv-btn rdv-btn-ghost">
            Ver cases <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <span className="num-badge">desde 2020</span>
          <span className="num-badge">cripto, web3 e fintech</span>
          <span className="num-badge">conteúdo + IA + sistemas</span>
        </div>
      </div>
    </section>
  );
}

/* ============================ FRENTES ============================ */
function Frentes() {
  const cards = [
    {
      Icon: Sparkles,
      title: "Agência de Conteúdo",
      desc: "Estratégia editorial + produção em volume. Carrosséis, reels, newsletters, threads, blog SEO. Voz da marca consistente em todas as redes.",
      bullets: [
        "Time multidisciplinar (estrategista, copy, designer, social)",
        "Calendário editorial mensal",
        "Métrica de growth (alcance, engajamento, conversão)",
        "Especialização cripto/web3/fintech",
      ],
      link: null,
    },
    {
      Icon: Cpu,
      title: "IA dentro da Operação",
      desc: "Auditoria de gargalos do time + implementação de IA no fluxo do cliente. Cobrança, atendimento, pesquisa, conteúdo, relatório. O time para de gastar o dia em tarefa repetitiva.",
      bullets: [
        "Diagnóstico gratuito em 48h",
        "Código fica com o cliente (sem lock-in, sem SaaS de aluguel)",
        "Frentes já mapeadas em operações reais de clientes",
      ],
      link: { href: "/servicos/ia-automacoes-completa", label: "Página dedicada" },
      highlight: true,
    },
    {
      Icon: Globe,
      title: "Sites e Sistemas",
      desc: "Landing pages que convertem, sites institucionais com SEO de verdade, sistemas custom (SaaS, dashboards, automações). Stack moderna: Next.js, Tailwind, Vercel.",
      bullets: [
        "Design system próprio por cliente",
        "Performance Lighthouse 95+",
        "SEO técnico (schema, sitemap, OG)",
        "Possibilidade de manutenção mensal",
      ],
      link: null,
    },
  ];

  return (
    <section className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)]">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">
          <span className="rec-dot" /> O QUE A KALEIDOS FAZ
        </span>
        <h2 className="serif mt-5 text-[40px] sm:text-[60px] leading-[1] tracking-tight">
          Três frentes. Mesmo time.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${c.highlight ? "card-hot" : "card"} p-7 flex flex-col`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center border-[1.5px] border-[var(--ink)] bg-[var(--paper)]">
                  <c.Icon className="h-5 w-5" />
                </div>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="serif mt-6 text-3xl leading-tight">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--coal)]">
                {c.desc}
              </p>
              <ul className="mt-5 space-y-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-[var(--coal)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rec)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {c.link && (
                <Link
                  href={c.link.href}
                  className="mt-6 inline-flex items-center gap-1.5 mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] hover:text-[var(--rec)] underline underline-offset-4 decoration-[1.5px]"
                >
                  {c.link.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CASES ============================ */
function Cases() {
  const cases = [
    {
      type: "cliente",
      cliente: "Defiverso",
      vertical: "Educação cripto",
      desc: "Newsletter Resumo Criptoverso + automação IG/Twitter",
    },
    {
      type: "cliente",
      cliente: "Investidor 4.20",
      vertical: "Bitcoin BR",
      desc: "Funil orgânico YouTube → IG → newsletter",
    },
    {
      type: "cliente",
      cliente: "DSEC Labs",
      vertical: "Bitcoin security",
      desc: "Alfred Reply Guy bot + conteúdo técnico em 3 níveis",
    },
    {
      type: "cliente",
      cliente: "Laylä Föz",
      vertical: "Bem-estar · 177k IG",
      desc: "Newsletter Brisa da Semana + repurpose",
    },
    {
      type: "cliente",
      cliente: "Hugo Doria",
      vertical: "IA prática · vibe coding",
      desc: "Pipeline conteúdo YouTube + IG reels",
    },
  ];

  return (
    <section
      id="cases"
      className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)]"
    >
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">
          <span className="rec-dot" /> OPERAÇÃO RODANDO HOJE
        </span>
        <h2 className="serif mt-5 text-[40px] sm:text-[60px] leading-[1] tracking-tight">
          Projetos com IA dentro do fluxo.
        </h2>
      </div>

      <div className="mx-auto max-w-6xl mt-12">
        <div
          className="scroll-x flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
          aria-label="Carrossel de cases"
        >
          {cases.map((c, i) => (
            <motion.div
              key={c.cliente}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
              className="card snap-start shrink-0 basis-[280px] p-6"
            >
              <span
                className="mono text-[10px] uppercase tracking-[0.16em]"
                style={{
                  color: c.type === "produto" ? "var(--rec)" : "var(--muted)",
                }}
              >
                {c.type === "produto" ? "● Produto" : "● Cliente"}
              </span>
              <h3 className="serif mt-3 text-2xl leading-tight">{c.cliente}</h3>
              <p className="mono mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {c.vertical}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--coal)]">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mono mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          ← arrasta pro lado →
        </p>
      </div>
    </section>
  );
}

/* ============================ STACK ============================ */
function Stack() {
  const groups = [
    {
      label: "Frontend",
      items: [
        { n: "Next.js", d: "App Router + Server Components" },
        { n: "React 19", d: "UI declarativa, server-first" },
        { n: "TypeScript", d: "Tipo forte do front ao back" },
        { n: "Tailwind v4", d: "Tokens + utilitário, sem CSS solto" },
        { n: "Framer Motion", d: "Animação que entrega polimento" },
      ],
    },
    {
      label: "Backend",
      items: [
        { n: "Supabase", d: "Postgres + auth + storage" },
        { n: "Neon", d: "Postgres serverless pra produtos" },
        { n: "Stripe", d: "Cobrança recorrente e one-shot" },
        { n: "Resend", d: "Email transacional + audiences" },
        { n: "Vercel", d: "Edge runtime, deploy contínuo" },
      ],
    },
    {
      label: "IA",
      items: [
        { n: "Anthropic Claude", d: "Reasoning longo, conteúdo denso" },
        { n: "Google Gemini", d: "Multimodal + análise de vídeo" },
        { n: "OpenAI", d: "Tooling auxiliar e fine-tuning" },
        { n: "Apify", d: "Scrapers IG/YouTube/News" },
      ],
    },
    {
      label: "DevOps",
      items: [
        { n: "Vercel", d: "Hosting + edge functions" },
        { n: "GitHub Actions", d: "CI/CD e crons agendados" },
        { n: "Sentry", d: "Erro em produção, alerta no Slack" },
        { n: "PostHog", d: "Product analytics + feature flags" },
      ],
    },
  ];

  return (
    <section className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)] bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">
          <span className="rec-dot" /> COMO A GENTE TRABALHA
        </span>
        <h2 className="serif mt-5 text-[40px] sm:text-[60px] leading-[1] tracking-tight">
          Stack que entrega qualidade enterprise.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label} className="card p-6">
              <h3 className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--rec)]">
                {g.label}
              </h3>
              <div className="mt-5 space-y-4">
                {g.items.map((it) => (
                  <div key={it.n} className="border-b border-dashed border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                    <div className="mono text-[13px] font-semibold text-[var(--ink)]">
                      {it.n}
                    </div>
                    <div className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
                      {it.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PROCESSO ============================ */
function Processo() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      body: "Call de 30-45min ou form de gargalo. Saída: relatório executável em 48h.",
    },
    {
      n: "02",
      title: "Plano",
      body: "Documento de escopo, timeline, custo, métricas de sucesso. Aprovado pelo cliente antes de começar.",
    },
    {
      n: "03",
      title: "Construção",
      body: "Implementação no fluxo real. Time multidisciplinar (copy, design, dev). Reuniões semanais.",
    },
    {
      n: "04",
      title: "Métrica & Iteração",
      body: "Hora liberada, lead qualificado, peça publicada. Reunião mensal de delta.",
    },
  ];

  return (
    <section className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)]">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">
          <span className="rec-dot" /> COMO A GENTE TRABALHA
        </span>
        <h2 className="serif mt-5 text-[40px] sm:text-[60px] leading-[1] tracking-tight">
          Quatro passos do brief ao deploy.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="card p-6"
            >
              <div className="serif text-[64px] leading-none text-[var(--rec)]">
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-bold text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--coal)]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
function FAQ() {
  const items = [
    {
      q: "Em quanto tempo eu vejo resultado?",
      a: "Em 30 dias o primeiro gargalo já tá rodando em produção. A métrica começa a subir a partir do mês 2. Mês 3 é onde a maioria dos clientes vê o pico real — alcance, hora liberada, leads qualificados.",
    },
    {
      q: "Vocês atendem fora do nicho cripto?",
      a: "Sim. A Kaleidos nasceu em cripto/web3/fintech e ainda é onde temos mais profundidade, mas atendemos qualquer marca onde o problema é conteúdo + IA + sistema. Saúde, educação, B2B, SaaS — desde que a gente entenda a operação, dá pra entregar.",
    },
    {
      q: "O código fica com quem?",
      a: "Sempre com o cliente. Sem lock-in, sem dependência de SaaS terceiro pra rodar o que a Kaleidos construiu. O time entrega no repositório do cliente, com documentação. Acabou o contrato? O sistema continua rodando.",
    },
    {
      q: "Qual o investimento?",
      a: "Diagnóstico é grátis (48h). Implementação varia pelo escopo: projeto custom começa em R$ 8.000 (entrega única) ou plano mensal a partir de R$ 4.500/mês com mínimo de 3 meses. ROI típico: time libera 60-100h/mês, paga sozinho em 30-60 dias.",
    },
    {
      // ⚠️ 19/08/2026 — a resposta abria com "Não." e em seguida dizia que o plano
      // exige 3 meses. Contradizia a si mesma em duas frases. O conteúdo da
      // política não mudou; só a abertura, que agora bate com o resto.
      q: "Tem fidelidade?",
      a: "Ciclo mínimo de 3 meses no plano mensal (gargalo grande não se resolve em 30 dias). Depois disso é mês a mês, cancela quando quiser. Sem multa, sem letrinha pequena.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)] bg-[var(--soft)]/40">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">
          <span className="rec-dot" /> PERGUNTAS FREQUENTES
        </span>
        <h2 className="serif mt-5 text-[40px] sm:text-[56px] leading-[1] tracking-tight">
          O que decisor pergunta antes de fechar.
        </h2>

        <div className="mt-12 card divide-y divide-[var(--ink)] [&>*]:border-b-[1.5px] [&>*]:border-[var(--ink)] [&>*:last-child]:border-b-0">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={it.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full flex-col px-5 py-5 text-left hover:bg-[var(--paper)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="serif text-xl sm:text-2xl leading-tight">
                    {it.q}
                  </span>
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border-[1.5px] border-[var(--ink)] bg-[var(--paper)]">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5 text-[var(--rec)]" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 text-[15px] leading-relaxed text-[var(--coal)]"
                  >
                    {it.a}
                  </motion.p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ CTA FINAL ============================ */
function CTAFinal() {
  const [form, setForm] = useState({ nome: "", email: "", gargalo: "" });
  const [hp, setHp] = useState(""); // honeypot — humanos não preenchem
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email) return;
    setStatus("sending");
    try {
      // Ids de tracking: o MESMO event_id vai no body (server usa na Meta CAPI)
      // e no fbq eventID abaixo — pixel + CAPI deduplicam e o Lead conta 1x.
      const tracking = getTrackingIds();
      const r = await fetch("/api/lead-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: hp,
          // source lógico do form + atribuição completa (canal/UTM/first-last)
          metadata: getLeadMetadata("lp"),
          ...tracking,
        }),
      });
      const data = await r.json();
      if (data.ok) {
        setStatus("ok");
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq(
            "track",
            "Lead",
            {
              content_name: "Kaleidos LP",
              content_category: "lp",
            },
            { eventID: tracking.event_id }
          );
        }
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  return (
    <section
      id="contato"
      className="px-5 sm:px-10 py-20 border-t-[1.5px] border-[var(--ink)] bg-[var(--ink)]"
    >
      <div className="mx-auto max-w-3xl">
        <span
          className="eyebrow"
          style={{ color: "var(--rec)" }}
        >
          <span className="rec-dot" /> VAMOS CONVERSAR
        </span>
        <h2
          className="serif mt-5 text-[40px] sm:text-[60px] leading-[1] tracking-tight"
          style={{ color: "var(--paper)" }}
        >
          Conta o que a tua operação precisa.
        </h2>

        <div
          className="mt-12 p-7 sm:p-10"
          style={{
            background: "var(--cream)",
            border: "1.5px solid var(--paper)",
            boxShadow: "5px 5px 0 0 var(--rec)",
          }}
        >
          {status === "ok" ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[var(--rec)] border-[1.5px] border-[var(--ink)]">
                <CheckCircle2 className="h-6 w-6 text-[var(--paper)]" />
              </div>
              <h3 className="serif text-3xl">Recebido.</h3>
              <p className="mt-3 text-[15px] text-[var(--coal)]">
                Resposta em 48h pelo email{" "}
                <span className="mono text-[13px]">{form.email}</span>. Quer
                falar agora?
              </p>
              <a
                href={waLink("Acabei de mandar o form da LP.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rdv-btn rdv-btn-rec mt-6"
              >
                Falar no WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              {/* Honeypot anti-bot — invisível pra humanos */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="_hp_lp">Não preencha</label>
                <input
                  id="_hp_lp"
                  name="_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>
              <div>
                <label className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] block mb-2">
                  Nome <span className="text-[var(--rec)]">*</span>
                </label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nome: e.target.value }))
                  }
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] block mb-2">
                  Email <span className="text-[var(--rec)]">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="voce@empresa.com"
                />
              </div>
              <div>
                <label className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] block mb-2">
                  O que você precisa?
                </label>
                <textarea
                  rows={4}
                  value={form.gargalo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gargalo: e.target.value }))
                  }
                  placeholder="Ex: agência de conteúdo cripto · OU · IA pra cobrança · OU · landing page que converte"
                />
              </div>

              <div className="flex flex-col items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rdv-btn rdv-btn-rec disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando…" : "Enviar e receber resposta em 48h"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <p className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] text-center">
                  {/* ⚠️ 19/08/2026 — era "Sem fidelidade · Sem contrato", e a FAQ da
                      MESMA página diz que o mensal tem ciclo mínimo de 3 meses. O selo
                      cobre o formulário de diagnóstico (grátis, sem compromisso), não o
                      plano. ⛔ Não repor "sem contrato". */}
                  Diagnóstico grátis · Sem compromisso · Resposta em 48h · LGPD
                </p>
                {status === "err" && (
                  <p className="mono text-[11px] text-[var(--rec)]">
                    Algo deu errado. Tenta de novo ou manda WhatsApp.
                  </p>
                )}
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] underline underline-offset-4 decoration-[1.5px] text-[var(--ink)] hover:text-[var(--rec)]"
                >
                  ou fala direto no WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <footer
      className="px-5 sm:px-10 py-10"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rec-dot" />
          <span className="mono text-[11px] uppercase tracking-[0.18em]">
            Kaleidos · agência de marketing + IA nativa da cripto
          </span>
        </div>
        <div className="flex items-center gap-5 mono text-[11px] uppercase tracking-[0.18em]">
          <Link href="/" className="hover:text-[var(--rec)]">
            kaleidos.com.br
          </Link>
          <Link
            href="/servicos/ia-automacoes-completa"
            className="hover:text-[var(--rec)]"
          >
            Kaleidos AI
          </Link>
          <Link href="/cases" className="hover:text-[var(--rec)]">
            Cases
          </Link>
        </div>
      </div>
    </footer>
  );
}
