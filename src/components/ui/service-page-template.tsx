"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";
import { FooterDemo } from "@/components/ui/footer-demo";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useI18n } from "@/i18n/useI18n";
import { useAnalytics } from "@/components/analytics";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";
import type { ServiceData, ServiceVariant } from "@/lib/service-pages-data";
import {
  getAccent,
  type LightTone,
  HeroSection,
  StatementBand,
  WhoSection,
  WhyMattersSection,
  ApproachSection,
  ProcessTimeline,
  DeliverablesSection,
  IncludedComparison,
  SignatureBand,
  CasesSection,
  WhyUsSection,
  ProofSection,
  FaqSection,
  FinalCta,
} from "@/components/services/service-sections";

type SectionKey =
  | "statement"
  | "who"
  | "whyMatters"
  | "approach"
  | "process"
  | "deliverables"
  | "included"
  | "signature"
  | "cases"
  | "whyUs"
  | "faq"
  | "proof";

type SectionSpec = { key: SectionKey; tone?: LightTone };

/**
 * Cada arquétipo define uma ORDEM e um RITMO de fundos distintos.
 * Cruzado com o accent (green/pink), garante que nenhuma das 6 páginas
 * pareça a outra. As bandas escuras (statement, signature, cases, whyUs)
 * cuidam do próprio fundo; o `tone` só guia as seções claras.
 *
 *  1 — AUTORIDADE  · approach no miolo, prova social fecha
 *  2 — SISTEMA     · abre pela metodologia (framework) logo após o statement
 *  3 — MOMENTUM    · processo e números cedo, metodologia perto do fim
 */
const LAYOUTS: Record<ServiceVariant, SectionSpec[]> = {
  1: [
    { key: "statement" },
    { key: "who", tone: "paper" },
    { key: "whyMatters", tone: "white" },
    { key: "approach", tone: "paper" },
    { key: "deliverables", tone: "mist" },
    { key: "signature" },
    { key: "included", tone: "white" },
    { key: "cases" },
    { key: "whyUs" },
    { key: "faq", tone: "paper" },
    { key: "proof", tone: "mist" },
  ],
  2: [
    { key: "statement" },
    { key: "approach", tone: "paper" },
    { key: "who", tone: "mist" },
    { key: "deliverables", tone: "paper" },
    { key: "whyMatters", tone: "white" },
    { key: "signature" },
    { key: "included", tone: "paper" },
    { key: "cases" },
    { key: "whyUs" },
    { key: "faq", tone: "mist" },
    { key: "proof", tone: "paper" },
  ],
  3: [
    { key: "statement" },
    { key: "who", tone: "paper" },
    { key: "deliverables", tone: "mist" },
    { key: "whyMatters", tone: "paper" },
    { key: "signature" },
    { key: "included", tone: "white" },
    { key: "approach", tone: "paper" },
    { key: "cases" },
    { key: "whyUs" },
    { key: "faq", tone: "mist" },
    { key: "proof", tone: "paper" },
  ],
};

export function ServicePageTemplate({
  data,
  Icon,
}: {
  data: ServiceData;
  Icon: LucideIcon;
}) {
  const { locale } = useI18n();
  const { trackWhatsApp } = useAnalytics();
  const c = locale === "en" ? data.en : data.pt;
  const isEn = locale === "en";
  const accent = getAccent(c.accent);

  const withLang = (path: string) =>
    isEn ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  const openWhatsApp = (where: string) => {
    trackWhatsApp(`servico_${data.id}`, where);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      c.whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  const serviceSchema = generateServiceSchema(c.h1, c.metaDescription);
  const faqSchema = generateFAQSchema(c.faq);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Kaleidos", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: c.h1, href: `/servicos/${data.id}` },
  ]);

  const layout = LAYOUTS[data.variant] ?? LAYOUTS[1];

  const renderSection = ({ key, tone = "white" }: SectionSpec) => {
    switch (key) {
      case "statement":
        return <StatementBand key={key} c={c} accent={accent} />;
      case "who":
        return <WhoSection key={key} c={c} accent={accent} Icon={Icon} tone={tone} />;
      case "whyMatters":
        return (
          <WhyMattersSection key={key} c={c} accent={accent} isEn={isEn} tone={tone} />
        );
      case "approach":
        return (
          <ApproachSection key={key} c={c} accent={accent} isEn={isEn} tone={tone} />
        );
      case "process":
        return (
          <ProcessTimeline key={key} c={c} accent={accent} isEn={isEn} tone={tone} />
        );
      case "deliverables":
        return (
          <DeliverablesSection key={key} c={c} accent={accent} isEn={isEn} tone={tone} />
        );
      case "included":
        return (
          <IncludedComparison
            key={key}
            c={c}
            accent={accent}
            isEn={isEn}
            tone={tone}
            openWhatsApp={openWhatsApp}
          />
        );
      case "signature":
        return <SignatureBand key={key} c={c} accent={accent} />;
      case "cases":
        return (
          <CasesSection
            key={key}
            c={c}
            accent={accent}
            isEn={isEn}
            withLang={withLang}
          />
        );
      case "whyUs":
        return <WhyUsSection key={key} c={c} accent={accent} />;
      case "faq":
        return <FaqSection key={key} c={c} tone={tone} />;
      case "proof":
        return (
          <ProofSection
            key={key}
            accent={accent}
            isEn={isEn}
            withLang={withLang}
            tone={tone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        c={c}
        accent={accent}
        Icon={Icon}
        isEn={isEn}
        withLang={withLang}
        openWhatsApp={openWhatsApp}
      />

      {layout.map(renderSection)}

      <FinalCta
        c={c}
        accent={accent}
        isEn={isEn}
        withLang={withLang}
        openWhatsApp={openWhatsApp}
      />

      <FooterDemo />
    </main>
  );
}
