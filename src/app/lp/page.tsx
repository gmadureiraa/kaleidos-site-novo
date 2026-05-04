import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Film,
  Radar,
  Rocket,
  Compass,
  Cpu,
  CheckCircle2,
  Workflow,
  Brain,
  Bitcoin,
  AlertTriangle,
  ShieldAlert,
  GitBranch,
  Quote,
  Plus,
  Minus,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing IA pra cripto, web3 e fintech — Kaleidos",
  description:
    "Agência com tooling próprio (Sequência Viral, Radar Viral, Reels Viral). 8 clientes ativos. Solicite proposta.",
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title: "Marketing IA pra cripto, web3 e fintech — Kaleidos",
    description:
      "Agência com tooling próprio (Sequência Viral, Radar Viral, Reels Viral). 8 clientes ativos. Solicite proposta.",
    url: "https://kaleidos.com.br/lp",
    siteName: "Kaleidos Digital",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: "Kaleidos — Marketing IA pra cripto, web3 e fintech",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing IA pra cripto, web3 e fintech — Kaleidos",
    description:
      "Agência com tooling próprio (Sequência Viral, Radar Viral, Reels Viral). 8 clientes ativos. Solicite proposta.",
    images: ["/Kaleidos/imagens/Capa.png"],
    creator: "@digitalkaleidos",
    site: "@digitalkaleidos",
  },
};

type Tool = {
  name: string;
  href: string;
  domain: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const tools: Tool[] = [
  {
    name: "Sequência Viral",
    href: "https://viral.kaleidos.com.br",
    domain: "viral.kaleidos.com.br",
    description: "Carrosséis prontos pra postar com IA na voz da marca.",
    Icon: Sparkles,
  },
  {
    name: "Radar Viral",
    href: "https://radar.kaleidos.com.br",
    domain: "radar.kaleidos.com.br",
    description: "Inteligência diária cross-platform: temas em alta com brief IA.",
    Icon: Radar,
  },
  {
    name: "Reels Viral",
    href: "https://reels.kaleidos.com.br",
    domain: "reels.kaleidos.com.br",
    description: "Reels analisados cena por cena, com roteiro adaptado.",
    Icon: Film,
  },
];

type Problem = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const problems: Problem[] = [
  {
    title: "Jargão que afasta o público errado",
    body: "Agência tradicional escreve sobre cripto como turista. O leitor sente em duas linhas e o post morre no scroll.",
    Icon: AlertTriangle,
  },
  {
    title: "Compliance que muda toda semana",
    body: "Regra de ad da Meta, Google, X e LinkedIn pra cripto e fintech muda sem aviso. Quem não opera no nicho perde campanha por palavra errada na headline.",
    Icon: ShieldAlert,
  },
  {
    title: "Audiência conhece o produto melhor que o time",
    body: "Comunidade web3 e fintech corrige a marca em público. Sem time que vive o setor, cada post vira risco reputacional.",
    Icon: Users,
  },
];

type Pillar = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const pillars: Pillar[] = [
  {
    title: "IA dentro da operação, não em volta",
    body: "Sequência Viral, Radar Viral e Reels Viral rodam todo dia no fluxo editorial. Pauta, copy, imagem e distribuição passam por modelos próprios.",
    Icon: GitBranch,
  },
  {
    title: "Time que vive o setor",
    body: "Operação cripto desde 2022, com clientes em DeFi, Bitcoin self-custody, fintech e dolarização. Time entende stablecoin, KYC e compliance sem precisar de glossário.",
    Icon: Bitcoin,
  },
  {
    title: "Métrica de negócio, não de vaidade",
    body: "Review mensal mede o que importa: pipeline, retenção, leads qualificados, conversão de waitlist. Engajamento bruto entra como sinal, não como entrega.",
    Icon: TrendingUp,
  },
];

type Differentiator = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const differentiators: Differentiator[] = [
  {
    title: "Tooling proprietário",
    body: "Sequência Viral pra carrosséis, Radar Viral pra inteligência de tendências e Reels Viral pra repurpose. Construído pelo time, usado todo dia.",
    Icon: Cpu,
  },
  {
    title: "IA na operação",
    body: "Não é IA pra ads terceirizada. É IA integrada no fluxo editorial: pauta, roteiro, copy, imagem e distribuição passam por modelos.",
    Icon: Brain,
  },
  {
    title: "Especialização cripto",
    body: "Time entende o nicho, fala a língua. De DeFi a Bitcoin maxi, de fintech a web3 — sem precisar explicar o que é uma stablecoin.",
    Icon: Bitcoin,
  },
];

type Service = {
  title: string;
  price: string;
  description: string;
  bullets: string[];
  Icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
};

const services: Service[] = [
  {
    title: "Marketing recorrente",
    price: "A partir de R$ 10k/mês",
    description:
      "Gestão completa dos canais com IA embarcada no fluxo editorial.",
    bullets: [
      "Instagram, Twitter, LinkedIn e newsletter",
      "Pauta semanal + execução + métricas",
      "Tooling próprio integrado ao processo",
    ],
    Icon: Workflow,
    highlight: true,
  },
  {
    title: "Lançamentos",
    price: "Sob orçamento",
    description: "Sprint full-funnel de 30 a 90 dias pra produto, evento ou rodada.",
    bullets: [
      "Estratégia, criativo e mídia",
      "Tracking de funil ponta a ponta",
      "Time dedicado por janela",
    ],
    Icon: Rocket,
  },
  {
    title: "Consultoria estratégica",
    price: "A partir de R$ 5k/mês",
    description: "1-on-1 com founder pra destravar marca, posicionamento e canais.",
    bullets: [
      "Sessões quinzenais",
      "Diagnóstico + roadmap trimestral",
      "Acompanhamento por Slack/WhatsApp",
    ],
    Icon: Compass,
  },
  {
    title: "Sistemas IA customizados",
    price: "Sob orçamento",
    description: "Pipeline de IA construído sob medida pro teu negócio.",
    bullets: [
      "Geração de conteúdo, automação, dashboards",
      "Stack TS + Python + Supabase",
      "Entrega como produto, não relatório",
    ],
    Icon: Cpu,
  },
];

type Case = {
  client: string;
  vertical: string;
  scope: string;
  result: string;
  quote?: string;
  author?: string;
};

const cases: Case[] = [
  {
    client: "Defiverso",
    vertical: "Educação cripto · Comunidade",
    scope: "Newsletter semanal, carrosséis, roteiros, automações de lançamento.",
    result:
      "Comunidade com 14k+ alunos. Mais de 19 roteiros e campanhas completas de lançamento entregues, com depoimentos públicos de alunos que transformaram patrimônio.",
    quote:
      "Entrei no Defiverso sem saber por onde começar. Em três meses consegui participar de três airdrops relevantes e estruturar minha renda passiva em DeFi.",
    author: "Marina Castro · Aluna Defiverso",
  },
  {
    client: "DSEC Labs",
    vertical: "Bitcoin self-custody · Hardware",
    scope: "Posicionamento, conteúdo institucional, lançamento ColdKit.",
    result:
      "Narrativa No Trust. Do It Yourself estabelecida nos canais. Funil ativo da landing à compra do kit, com produção contínua para Alfred P2P e ecossistema.",
  },
  {
    client: "Lucas Amendola",
    vertical: "Marca pessoal · Educador cripto",
    scope: "Operação multiplataforma (IG, X, LinkedIn) e gestão editorial.",
    result:
      "174k no Instagram, 380k no YouTube, presença consolidada em LinkedIn e X. Pauta semanal alimenta funil orgânico do Defiverso.",
  },
  {
    client: "NeoBankless",
    vertical: "Fintech · Dolarização",
    scope: "Conteúdo recorrente Instagram + LinkedIn, narrativa Founders Club.",
    result:
      "Linguagem de private bank traduzida pra audiência cripto-friendly. Diferenciação clara vs neobanks tradicionais e narrativa de USDc consolidada.",
  },
];

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "Trabalham com clientes fora do nicho cripto, web3 e fintech?",
    answer:
      "Sim, mas é minoria. Cripto, web3 e fintech é onde o time tem mais profundidade e onde a operação fica mais eficiente. Fora disso, atendemos quando o desafio é alto (lançamento, marca pessoal de fundador, IA na operação) e o tom permite usar nosso método.",
  },
  {
    question: "Quanto custa um projeto?",
    answer:
      "Marketing recorrente parte de R$ 10k/mês com engajamento mínimo de 3 meses. Consultoria estratégica parte de R$ 5k/mês. Lançamentos e sistemas IA custom são sob orçamento, definido depois do diagnóstico. Não trabalhamos com projeto avulso de design.",
  },
  {
    question: "Quanto tempo até ver resultado?",
    answer:
      "Resultado de processo (operação rodando, tooling integrado, pauta editorial saudável) em 30 dias. Resultado de número (alcance, leads, conversão de waitlist) começa entre 60 e 90 dias, dependendo de canal e maturidade da marca. Marketing orgânico não dá resultado em 7 dias e a Kaleidos não vende essa promessa.",
  },
  {
    question: "Vocês fazem tráfego pago também?",
    answer:
      "Sim, dentro de lançamentos e sprints full-funnel. Não oferecemos gestão de mídia recorrente isolada como produto. Quando o cliente já tem gestor de tráfego, o time da Kaleidos integra criativo e mensagem para essa frente.",
  },
  {
    question: "Como medem o resultado?",
    answer:
      "Review mensal com painel de métricas conectadas a negócio: pipeline gerado, leads qualificados, retenção, conversão de waitlist, custo por lead. Engajamento bruto e crescimento de seguidor entram como sinal de tração, não como entrega final.",
  },
  {
    question: "Posso começar com um teste antes de assinar contrato?",
    answer:
      "Sim. A primeira etapa é um diagnóstico pago de baixo escopo: auditoria de canais, posicionamento e oportunidades imediatas. Se a Kaleidos não for o ajuste certo, você sai com o documento e zero pendência.",
  },
  {
    question: "Trabalham com clientes internacionais?",
    answer:
      "Sim. Operamos em PT-BR e inglês, com clientes de Bitcoin self-custody e fintech atendendo mercado global. Toda comunicação institucional pode rodar nas duas línguas.",
  },
  {
    question: "O que acontece se eu não gostar da entrega?",
    answer:
      "Contrato tem janela de saída clara após o terceiro mês. Se a entrega não bate o combinado em review, ajustamos escopo ou encerramos sem multa. A Kaleidos não trabalha amarrando cliente em contrato anual sem revisão.",
  },
];

type Step = {
  number: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Brief",
    body: "Conta o objetivo, contexto e budget. Em 48h tem retorno.",
  },
  {
    number: "02",
    title: "Diagnóstico",
    body: "Auditoria de canais, posicionamento e oportunidades imediatas.",
  },
  {
    number: "03",
    title: "Execução",
    body: "Time entra em campo. Tooling proprietário acelera output.",
  },
  {
    number: "04",
    title: "Review",
    body: "Reuniões mensais de número. Ajustes baseados em dado, não em achismo.",
  },
];

const clientBadges = [
  "Bitcoin Security B2B",
  "Fintech B2B",
  "Educação cripto B2C",
  "Asset management",
  "Influencer fintech",
  "Bem-estar digital",
  "Web3 protocol",
  "IA produtividade",
];

const proposalCta =
  "https://wa.me/5512997796835?text=Oi%2C%20quero%20uma%20proposta%20da%20Kaleidos%20%2F%2Flp";

export default function LpPage() {
  return (
    <main
      id="main-content"
      role="main"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7CFF6B]/15 via-black to-black" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* HERO */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/Kaleidos/logo/Logos-10.svg"
            alt="Kaleidos Digital"
            width={48}
            height={48}
            className="h-12 w-12"
            priority
          />
          <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Kaleidos
          </span>
        </div>

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#7CFF6B] sm:text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#7CFF6B]" />
          Agência IA-first · Cripto, web3, fintech
        </span>

        <h1 className="text-center font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          A Kaleidos integra IA no marketing de cripto, web3 e fintech.
        </h1>
        <p className="mt-5 max-w-2xl text-center text-base text-gray-400 sm:text-lg">
          8 clientes ativos, 120+ peças de conteúdo por mês, tooling proprietário
          (Sequência Viral, Radar Viral, Reels Viral) que potencializa cada execução.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={proposalCta}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#7CFF6B] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,255,107,0.7)] sm:text-base"
          >
            Solicitar proposta
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#7CFF6B]/30 hover:bg-white/[0.06] sm:text-base"
          >
            Ver cases
            <ArrowUpRight className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CFF6B]" />
          </Link>
        </div>
      </section>

      {/* PROBLEMA */}
      <section
        aria-label="Problema"
        className="mx-auto mb-16 max-w-5xl px-4 sm:px-6"
      >
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            <span className="h-1 w-1 rounded-full bg-[#7CFF6B]" />
            Problema
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Marketing pra cripto, web3 e fintech não funciona como pra produto comum.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-400">
            Três problemas que fazem agência tradicional perder dinheiro do cliente
            antes do primeiro resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                <p.Icon className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 sm:text-[15px]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIRADA */}
      <section
        aria-label="Virada"
        className="mx-auto mb-20 max-w-5xl px-4 sm:px-6"
      >
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7CFF6B]/20 bg-[#7CFF6B]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7CFF6B]">
            <span className="h-1 w-1 rounded-full bg-[#7CFF6B]" />
            Virada
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            A Kaleidos resolve juntando três coisas que outras agências separam.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-400">
            IA na operação, time que vive o setor e métrica de negócio. Sem essas três
            juntas, marketing pra esse mercado é caro e devagar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/20 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7CFF6B]">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#7CFF6B]/40 to-transparent" />
              </div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#7CFF6B]/20 bg-[#7CFF6B]/10">
                <p.Icon className="h-5 w-5 text-[#7CFF6B]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 sm:text-[15px]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROVA INSTITUCIONAL */}
      <section
        aria-label="Prova institucional"
        className="mx-auto max-w-5xl px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { number: "8", label: "clientes ativos" },
            { number: "120+", label: "peças de conteúdo por mês" },
            { number: "4", label: "produtos próprios shipados" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <div className="font-display text-4xl font-bold text-[#7CFF6B] sm:text-5xl">
                {stat.number}
              </div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Verticais que a Kaleidos atende
          </p>
          <div className="flex flex-wrap gap-2">
            {clientBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 sm:text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section
        aria-label="Diferencial"
        className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
      >
        <h2 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          O que torna a Kaleidos diferente.
        </h2>
        <p className="mb-10 max-w-2xl text-base text-gray-400">
          Três coisas que a maioria das agências não tem, e que a Kaleidos coloca
          como pilar da operação.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/20 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#7CFF6B]/20 bg-[#7CFF6B]/10">
                <d.Icon className="h-5 w-5 text-[#7CFF6B]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {d.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 sm:text-[15px]">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Tools strip */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <tool.Icon className="h-4 w-4 text-[#7CFF6B]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white">{tool.name}</div>
                <div className="truncate text-xs text-gray-500">{tool.domain}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CFF6B]" />
            </a>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section
        aria-label="Serviços"
        className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
      >
        <h2 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Como a Kaleidos pode trabalhar contigo.
        </h2>
        <p className="mb-10 max-w-2xl text-base text-gray-400">
          Quatro modos de engajamento. Todos com tooling próprio e time
          especializado.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
                s.highlight
                  ? "border-[#7CFF6B]/30 bg-[#7CFF6B]/[0.04] shadow-[0_0_60px_-30px_rgba(124,255,107,0.4)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {s.highlight && (
                <span className="absolute right-5 top-5 rounded-full border border-[#7CFF6B]/30 bg-[#7CFF6B]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7CFF6B]">
                  Mais buscado
                </span>
              )}

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <s.Icon className="h-5 w-5 text-[#7CFF6B]" />
              </div>

              <h3 className="font-display text-2xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-[#7CFF6B]">
                {s.price}
              </p>
              <p className="mt-3 text-sm text-gray-400 sm:text-[15px]">
                {s.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7CFF6B]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CASES / PROVA */}
      <section
        aria-label="Cases"
        className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
      >
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            <span className="h-1 w-1 rounded-full bg-[#7CFF6B]" />
            Cases
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            O que a Kaleidos já entregou.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-400">
            Quatro contas que mostram o jeito Kaleidos de operar, do nicho cripto
            ao fintech BR.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <article
              key={c.client}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-[#7CFF6B]/20 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {c.client}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#7CFF6B]">
                    {c.vertical}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Escopo
                </p>
                <p className="text-sm text-gray-300 sm:text-[15px]">{c.scope}</p>
              </div>

              <div className="mb-5 border-t border-white/5 pt-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Resultado
                </p>
                <p className="text-sm text-gray-300 sm:text-[15px]">{c.result}</p>
              </div>

              {c.quote && (
                <div className="mt-auto rounded-xl border border-white/5 bg-black/30 p-4">
                  <Quote className="mb-2 h-4 w-4 text-[#7CFF6B]" />
                  <p className="text-sm italic text-gray-300">&ldquo;{c.quote}&rdquo;</p>
                  {c.author && (
                    <p className="mt-2 text-xs text-gray-500">{c.author}</p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#7CFF6B]/30 hover:bg-white/[0.06]"
          >
            Ver todos os cases
            <ArrowUpRight className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7CFF6B]" />
          </Link>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        aria-label="Como funciona"
        className="mx-auto mt-24 max-w-5xl px-4 sm:px-6"
      >
        <h2 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Como funciona.
        </h2>
        <p className="mb-10 max-w-2xl text-base text-gray-400">
          Quatro passos do primeiro contato à operação rodando.
        </p>

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
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-[#7CFF6B]/40 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-label="Perguntas frequentes"
        className="mx-auto mt-24 max-w-3xl px-4 sm:px-6"
      >
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            <span className="h-1 w-1 rounded-full bg-[#7CFF6B]" />
            FAQ
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Perguntas frequentes.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-400">
            Oito respostas honestas pras perguntas que decisor sempre faz antes de
            fechar contrato com agência.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 open:border-[#7CFF6B]/20 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-display text-base font-semibold text-white sm:text-lg">
                  {f.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all group-open:border-[#7CFF6B]/30 group-open:bg-[#7CFF6B]/10">
                  <Plus className="h-4 w-4 text-gray-400 group-open:hidden" />
                  <Minus className="hidden h-4 w-4 text-[#7CFF6B] group-open:block" />
                </span>
              </summary>
              <div className="border-t border-white/5 px-5 pb-5 pt-4">
                <p className="text-sm text-gray-400 sm:text-[15px]">{f.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        aria-label="CTA final"
        className="mx-auto mt-24 max-w-3xl px-4 pb-24 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-3xl border border-[#7CFF6B]/20 bg-gradient-to-br from-[#7CFF6B]/[0.08] via-white/[0.02] to-white/[0.02] p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#7CFF6B]/20 blur-3xl" />

          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Pronto pra colocar IA na operação de marketing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-400">
            Manda um brief e em 48h a Kaleidos volta com diagnóstico e proposta.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={proposalCta}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#7CFF6B] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(124,255,107,0.7)] sm:text-base"
            >
              Solicitar proposta
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/contato"
              className="text-sm text-gray-400 underline-offset-4 transition-colors hover:text-[#7CFF6B] hover:underline sm:text-base"
            >
              ou contato@kaleidos.com.br
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <Link href="/" className="transition-colors hover:text-[#7CFF6B]">
            kaleidos.com.br
          </Link>
          <span className="text-gray-700" aria-hidden="true">•</span>
          <Link href="/cases" className="transition-colors hover:text-[#7CFF6B]">
            Cases
          </Link>
          <span className="text-gray-700" aria-hidden="true">•</span>
          <Link href="/portfolio" className="transition-colors hover:text-[#7CFF6B]">
            Portfolio
          </Link>
          <span className="text-gray-700" aria-hidden="true">•</span>
          <Link href="/links" className="transition-colors hover:text-[#7CFF6B]">
            Links
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-600">
          © {new Date().getFullYear()} Kaleidos Digital
        </p>
      </section>
    </main>
  );
}
