import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Reveal } from "@/components/ui/reveal";
import { TrackingProbe } from "@/components/tracking-probe";
import { Web3V2CtaTracking } from "@/components/web3v2/cta-tracking";
import { Web3V2Clarity } from "@/components/web3v2/clarity-v2";
import {
  Web3V2Defs,
  Web3V2Hero,
  Web3V2Manifesto,
  Web3V2Problema,
  Web3V2Diferenciais,
} from "@/components/web3v2/sections";
import { Web3V2ClientsMarquee } from "@/components/web3v2/clients-marquee";
import { Web3V2Processo } from "@/components/web3v2/processo-kaleidos";
// desativado até termos mais depoimentos reais — reativar quando tiver
// import { Web3V2Testimonials } from "@/components/web3v2/testimonials";
import { Web3V2Resources } from "@/components/web3v2/resources";
import { Web3V2FontPreview } from "@/components/web3v2/font-preview";
import { Web3V2PlaybookPopup } from "@/components/web3v2/playbook-popup";
import { Web3V2PlaybookSticky } from "@/components/web3v2/playbook-sticky";

// ── HOME PRINCIPAL `/` (estética web3v2 promovida 2026-06-29) ────────────────
// A home antiga (HeroKaleidos + Bento) foi movida para `/2`.
export const metadata: Metadata = {
  title: "Kaleidos — Agência nativa do mercado cripto",
  description:
    "Conteúdo, estratégia e lançamentos para marcas web3 que querem ser referência, não só mais ruído no feed.",
};

// Componentes da home real reaproveitados (sem editar destrutivamente).
const ServicesList = dynamic(() =>
  import("@/components/services-list").then((m) => m.ServicesList)
);
const CasesCarousel = dynamic(() => import("@/components/cases-carousel"));
const CtaStrategy = dynamic(() =>
  import("@/components/cta-strategy").then((m) => m.CtaStrategy)
);
const FAQSection = dynamic(() => import("@/components/faq-section"));
const FooterDemo = dynamic(() =>
  import("@/components/ui/footer-demo").then((m) => m.FooterDemo)
);

export default function HomeV2() {
  return (
    <main id="main-content" className="kv2 min-h-screen bg-white" role="main">
      <TrackingProbe />
      {/* Previsualizador de tipografia: /2?font=a|b|c|d (avaliação, escopado em .kv2) */}
      <Suspense fallback={null}>
        <Web3V2FontPreview />
      </Suspense>
      {/* Microsoft Clarity (session replay + heatmap) — só carrega se
          NEXT_PUBLIC_CLARITY_ID estiver setado na Vercel */}
      <Web3V2Clarity />
      {/* Eventos NOMEADOS nos CTAs (wa.me / calendly) injetados via HTML */}
      <Web3V2CtaTracking />
      {/* defs (SVG symbols) + CSS escopado das seções novas */}
      <Web3V2Defs />

      {/* Popup de captura do Playbook Cripto 2026 (entrega o PDF). Abre pelo
          card fixo (sticky) e pelos CTAs da página — sem auto-trigger. */}
      <Web3V2PlaybookPopup />

      {/* Card FIXO do Playbook (padrão Lunar Strategy): canto inferior esquerdo,
          fica até a pessoa fechar. Substitui a antiga banda de isca. */}
      <Web3V2PlaybookSticky />

      {/* 1 · HERO (sem banda de texto) — os números 30M+/50+ já vivem no
          subtexto do hero, então a proof-strip foi removida pra não duplicar
          a prova e deixar o hero respirar direto pros logos. */}
      <Web3V2Hero />

      {/* 1b · Marquee de LOGOS de clientes (substitui a banda de texto) */}
      <Web3V2ClientsMarquee />

      {/* 2 · Manifesto — mãos full-bleed, sem contatos */}
      <Web3V2Manifesto />

      {/* 3 · Nossos Serviços — design original (estilo Lunar), Bento removido (fundo escuro) */}
      <Reveal>
        <ServicesList ctaVariant="whatsapp" />
      </Reveal>

      {/* 4 · Como funciona — processo unificado (vem logo APÓS os serviços, fundo claro) */}
      <Reveal>
        <Web3V2Processo />
      </Reveal>

      {/* 4b · Depoimentos — desativado até termos mais depoimentos reais —
          reativar quando tiver. O componente e os dados continuam no código.
      <Reveal>
        <Web3V2Testimonials />
      </Reveal>
      */}

      {/* 5 · Cases (fundo claro) */}
      <Reveal>
        <div id="cases-section">
          <CasesCarousel variant="light" />
        </div>
      </Reveal>

      {/* 6 · Diferenciais — "Por que a Kaleidos" / olho (escuro, quebra o ritmo) */}
      <Web3V2Diferenciais />

      {/* 7 · Recursos (Playbooks + Blog) — fundo claro */}
      <Reveal>
        <Web3V2Resources />
      </Reveal>

      {/* 8 · CTA */}
      <Reveal>
        <CtaStrategy />
      </Reveal>

      {/* 9 · FAQ (re-skin Kaleidos) */}
      <Reveal>
        <FAQSection variant="kaleidos" />
      </Reveal>

      {/* 10 · "Post genérico não constrói reputação" — fechamento c/ botões (após o FAQ) */}
      <Web3V2Problema />

      {/* 12 · Footer / Contato */}
      <Reveal>
        <div id="contact-section">
          <FooterDemo />
        </div>
      </Reveal>
    </main>
  );
}
