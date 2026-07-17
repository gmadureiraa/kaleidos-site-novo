import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Reveal } from "@/components/ui/reveal";
import { TrackingProbe } from "@/components/tracking-probe";
import { Web3V2CtaTracking } from "@/components/web3v2/cta-tracking";
import {
  Web3V2Defs,
  Web3V2Hero,
  Web3V2Manifesto,
  Web3V2Problema,
  Web3V2Diferenciais,
  AudienceSectionsLang,
} from "@/components/web3v2/sections";
import { Web3V2ClientsMarquee } from "@/components/web3v2/clients-marquee";
import { Web3V2ProofStrip } from "@/components/web3v2/proof-strip";
import { Web3V2Testimonials } from "@/components/web3v2/testimonials";
import { Web3V2Processo } from "@/components/web3v2/processo-kaleidos";
import { Web3V2Resources } from "@/components/web3v2/resources";
import { Web3V2FontPreview } from "@/components/web3v2/font-preview";
import { Web3V2PlaybookPopup } from "@/components/web3v2/playbook-popup";
import { Web3V2PlaybookSticky } from "@/components/web3v2/playbook-sticky";
import { localizeAudience, type Audience } from "@/lib/audiences";

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
// audience: quando presente (rotas de público), injeta <AudienceSections> logo após
//   o hero. A home `/` não passa audience, então nada muda nela.
export function HomeShell({
  heroOpts,
  audience,
}: {
  heroOpts?: HeroOpts;
  audience?: Audience;
}) {
  // Variante EN do público (?lang=en): resolvida aqui no server (rota continua
  // estática) e trocada no client pelo AudienceSectionsLang / Web3V2Hero.
  const audienceEn = audience ? localizeAudience(audience, "en") : undefined;
  const heroOptsEn = audienceEn
    ? {
        badge: audienceEn.badge,
        headlineHtml: audienceEn.headlineHtml,
        subHtml: audienceEn.subHtml,
      }
    : undefined;

  return (
    <main id="main-content" className="kv2 min-h-screen bg-white" role="main">
      <TrackingProbe />
      {/* Previsualizador de tipografia: /2?font=a|b|c|d (avaliação, escopado em .kv2) */}
      <Suspense fallback={null}>
        <Web3V2FontPreview />
      </Suspense>
      {/* Clarity agora é montado no layout raiz (site-wide), não mais aqui,
          pra não carregar 2x na home. Ver src/app/layout.tsx. */}
      {/* Eventos NOMEADOS nos CTAs (wa.me / calendly) injetados via HTML */}
      <Web3V2CtaTracking />
      {/* defs (SVG symbols) + CSS escopado das seções novas */}
      <Web3V2Defs />

      {/* Popup de captura do Playbook Cripto 2026 (entrega o PDF). */}
      <Web3V2PlaybookPopup />
      {/* Card FIXO do Playbook (padrão Lunar Strategy). */}
      <Web3V2PlaybookSticky />

      {/* 1 · HERO: genérico (`/`) ou variante textual por público.
          Language-aware: PT default, EN quando ?lang=en (useI18n no client). */}
      <Web3V2Hero heroOpts={heroOpts} heroOptsEn={heroOptsEn} />

      {/* 1b · Marquee de LOGOS de clientes */}
      <Web3V2ClientsMarquee />

      {/* 1b2 · PROVA acima da dobra: números (125M+ views, +R$46mi, 30+ projetos)
          + quote de cliente. CRO 2026-07: prova social o mais cedo possível. */}
      <Web3V2ProofStrip />

      {/* 1c · Bloco PERSONALIZADO por público (só nas rotas /founders etc). */}
      {audience && audienceEn && (
        <Reveal>
          <AudienceSectionsLang pt={audience} en={audienceEn} />
        </Reveal>
      )}

      {/* 2 · Manifesto — mãos full-bleed */}
      <Web3V2Manifesto />

      {/* 2b · Problema — "Post genérico não constrói reputação". Subida do fim
          da página pra cá (CRO 2026-07): hero → prova → problema → serviços.
          Visível também no MOBILE nesta posição (antes era hidden md:block no
          rodapé, onde já repetia CTAs; aqui vem antes dos serviços e agita a
          dor na hora certa). */}
      <Web3V2Problema />

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

      {/* 5b · Depoimentos — REATIVADO (CRO 2026-07, aprovado pelo Gabriel):
          prova social logo depois dos cases, antes dos diferenciais/CTA. */}
      <Reveal>
        <Web3V2Testimonials />
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

      {/* (Problema foi movido pra posição 2b, logo após o Manifesto.) */}

      {/* 12 · Footer / Contato */}
      <Reveal>
        <div id="contact-section">
          <FooterDemo />
        </div>
      </Reveal>
    </main>
  );
}
