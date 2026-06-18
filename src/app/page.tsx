import HeroKaleidos from "@/components/ui/hero-kaleidos";
import { TrustedBy } from "@/components/ui/trusted-by";
import { ServicesList } from "@/components/services-list";
import BentoGrid from "@/components/bento-grid";
import FAQSection from "@/components/faq-section";
import ProcessSection from "@/components/process-section";
import CasesCarousel from "@/components/cases-carousel";
import { HomeResources } from "@/components/home-resources";
import { CtaStrategy } from "@/components/cta-strategy";
import { FooterDemo } from "@/components/ui/footer-demo";
import { Reveal } from "@/components/ui/reveal";
import { TrackingProbe } from "@/components/tracking-probe";

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
