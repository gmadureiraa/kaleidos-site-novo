import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroKaleidos from "@/components/ui/hero-kaleidos";
import { TrustedBy } from "@/components/ui/trusted-by";

// Home ANTIGA (HeroKaleidos + Bento), movida de `/` para `/2` em 2026-06-29.
export const metadata: Metadata = {
  title: "Kaleidos — Home clássica",
  robots: { index: false, follow: false },
};
import { Reveal } from "@/components/ui/reveal";
import { TrackingProbe } from "@/components/tracking-probe";

// Hero + TrustedBy ficam no bundle inicial (LCP + primeira dobra). Tudo abaixo
// da dobra é carregado via next/dynamic: mantém o HTML no SSR (ssr: true → bom
// pra SEO e pro conteúdo aparecer no crawl/no-JS), mas SPLITA o JS de hidratação
// de cada seção num chunk próprio. Assim a main-thread libera mais cedo pro hero
// pintar (LCP) e o framer-motion das seções pesadas só hidrata depois.
const BentoGrid = dynamic(() => import("@/components/bento-grid"));
const ServicesList = dynamic(() =>
  import("@/components/services-list").then((m) => m.ServicesList)
);
const ProcessSection = dynamic(() => import("@/components/process-section"));
const CasesCarousel = dynamic(() => import("@/components/cases-carousel"));
const HomeResources = dynamic(() =>
  import("@/components/home-resources").then((m) => m.HomeResources)
);
const CtaStrategy = dynamic(() =>
  import("@/components/cta-strategy").then((m) => m.CtaStrategy)
);
const FAQSection = dynamic(() => import("@/components/faq-section"));
const FooterDemo = dynamic(() =>
  import("@/components/ui/footer-demo").then((m) => m.FooterDemo)
);

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white" role="main">
      <TrackingProbe />
      <HeroKaleidos />
      <Reveal amount={0.3}>
        <TrustedBy />
      </Reveal>
      <Reveal>
        <BentoGrid />
      </Reveal>
      <Reveal>
        <ServicesList />
      </Reveal>
      <Reveal>
        <ProcessSection variant="light" />
      </Reveal>
      <Reveal>
        <div id="cases-section">
          <CasesCarousel />
        </div>
      </Reveal>
      <Reveal>
        <HomeResources />
      </Reveal>
      <Reveal>
        <CtaStrategy />
      </Reveal>
      <Reveal>
        <FAQSection />
      </Reveal>
      <Reveal>
        <div id="contact-section">
          <FooterDemo />
        </div>
      </Reveal>
    </main>
  );
}
