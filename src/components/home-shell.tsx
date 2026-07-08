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
  heroHtml,
} from "@/components/web3v2/sections";
import { Web3V2ClientsMarquee } from "@/components/web3v2/clients-marquee";
import { Web3V2Processo } from "@/components/web3v2/processo-kaleidos";
import { Web3V2Resources } from "@/components/web3v2/resources";
import { Web3V2FontPreview } from "@/components/web3v2/font-preview";
import { Web3V2PlaybookPopup } from "@/components/web3v2/playbook-popup";
import { Web3V2PlaybookSticky } from "@/components/web3v2/playbook-sticky";

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

export type HeroOpts = { badge?: string; headlineHtml?: string; subHtml?: string };

// Corpo da home, compartilhado entre `/` e as variantes por público (/founders etc).
// heroOpts: quando presente, troca só o texto do hero (badge/headline/sub); resto igual.
export function HomeShell({ heroOpts }: { heroOpts?: HeroOpts }) {
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

      {/* Popup de captura do Playbook Cripto 2026 (entrega o PDF). */}
      <Web3V2PlaybookPopup />
      {/* Card FIXO do Playbook (padrão Lunar Strategy). */}
      <Web3V2PlaybookSticky />

      {/* 1 · HERO — genérico (`/`) ou variante textual por público */}
      {heroOpts ? (
        <div dangerouslySetInnerHTML={{ __html: heroHtml(heroOpts) }} />
      ) : (
        <Web3V2Hero />
      )}

      {/* 1b · Marquee de LOGOS de clientes */}
      <Web3V2ClientsMarquee />

      {/* 2 · Manifesto — mãos full-bleed */}
      <Web3V2Manifesto />

      {/* 3 · Nossos Serviços */}
      <Reveal>
        <ServicesList ctaVariant="whatsapp" />
      </Reveal>

      {/* 4 · Como funciona — processo unificado */}
      <Reveal>
        <Web3V2Processo />
      </Reveal>

      {/* 5 · Cases (fundo claro) */}
      <Reveal>
        <div id="cases-section">
          <CasesCarousel variant="light" />
        </div>
      </Reveal>

      {/* 6 · Diferenciais — "Por que a Kaleidos" / olho */}
      <Web3V2Diferenciais />

      {/* 7 · Recursos (Playbooks + Blog) */}
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

      {/* 10 · "Post genérico não constrói reputação" */}
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
