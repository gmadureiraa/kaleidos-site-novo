"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";
import { FooterDemo } from "@/components/ui/footer-demo";
import { KALEIDOS_PROOF, PROOF_NOTE, PROOF_NOTE_EN } from "@/lib/metrics";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

/* ────────────────────────────────────────────────────────────
   Re-skin estética Kaleidos — branco-cru + grid de pontos, ink
   #14110D, verde #7CF067, rosa #D262B2, Atelier/Gridlite, cards
   brutalistas. SVG kal-eye/kal-word inline LOCAL (ids únicos
   `sb-*` pra não conflitar com outras rotas).
   ──────────────────────────────────────────────────────────── */

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";
const PAPER = "#FAFAFA";

const SOBRE_STYLE = `
.sb-scope{background:${PAPER};background-image:linear-gradient(${INK}0d 1px,transparent 1px),linear-gradient(90deg,${INK}0d 1px,transparent 1px);background-size:34px 34px;}
.sb-font-display{font-family:var(--font-atelier),Atelier,sans-serif;}
.sb-font-accent{font-family:var(--font-gridlite),Gridlite,monospace;}
.sb-card{background:#fff;border:1.5px solid ${INK};border-radius:16px;}
.sb-btn{transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s cubic-bezier(.22,1,.36,1);}
.sb-btn:hover{transform:translate(-2px,-2px);}
.sb-eyebrow{font-family:var(--font-gridlite),Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;}
@keyframes sbFloat{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-14px) rotate(var(--r,0deg))}}
@keyframes sbFloat2{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-20px) rotate(var(--r,0deg))}}
@keyframes sbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes sbSpinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@media (max-width:768px){.sb-deco{display:none!important;}}
`;

/** SVG symbols inline (local). Renderizar uma vez. */
function SobreDefs() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SOBRE_STYLE }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="sb-kal-eye" viewBox="0 0 1000 693.63">
          <path d="M1000,347.24c0-.14-.02-.28-.02-.43s.02-.28.02-.42c0-7.97-.37-15.85-.9-23.69-.02-.27-.04-.54-.06-.81C986.64,144.67,840.99,4.27,661.58.2v-.2h-323.17v.2C159.21,4.26,13.68,144.36,1,321.3c-.03.41-.06.82-.09,1.24-.54,7.89-.91,15.83-.91,23.85,0,.14.02.28.02.43s-.02.28-.02.42c0,7.97.37,15.85.9,23.69.02.27.04.54.06.81,12.4,177.22,158.05,317.62,337.46,321.69v.2h323.17v-.2c179.21-4.06,324.73-144.16,337.42-321.1.03-.41.06-.82.09-1.24.54-7.89.91-15.83.91-23.85ZM653.05,592.15h-305.9c-156.47,0-288.71-103.45-332.23-245.66C58.65,204.62,190.73,101.48,346.95,101.48h305.9c156.47,0,288.71,103.45,332.23,245.66-43.73,141.87-175.81,245-332.03,245Z" />
          <path d="M906.28,342.64c-63.42-80.67-161.9-132.49-272.48-132.49v.17c73.08,0,132.32,59.24,132.32,132.32s-59.24,132.32-132.32,132.32v.17c110.58,0,209.06-51.82,272.48-132.49Z" />
          <path d="M93.44,342.64c63.42-80.67,161.9-132.49,272.48-132.49v.17c-73.08,0-132.32,59.24-132.32,132.32,0,73.08,59.24,132.32,132.32,132.32v.17c-110.58,0-209.06-51.82-272.48-132.49Z" />
          <path d="M500.02,475.51c.12-73.38,59.62-132.82,133.03-132.83-73.14-.01-132.44-59.04-132.99-132.05-.03,0-.05,0-.08,0-.55,72.69-59.35,131.48-132.05,132,0,.03,0,.06,0,.09,72.97.52,131.98,59.72,132.1,132.79Z" />
        </symbol>
        <symbol id="sb-kal-word" viewBox="0 0 2000 262.38">
          <path d="M1747.06,131.62c0-.05,0-.11,0-.16s0-.11,0-.16c0-3.01-.14-5.98-.34-8.94,0-.1-.02-.2-.02-.31-4.68-66.9-59.66-119.89-127.38-121.43v-.08h-121.98v.08c-67.65,1.53-122.58,54.41-127.36,121.21-.01.16-.02.31-.04.47-.2,2.98-.34,5.97-.34,9,0,.05,0,.11,0,.16s0,.11,0,.16c0,3.01.14,5.98.34,8.94,0,.1.02.2.02.31,4.68,66.9,59.66,119.89,127.38,121.43v.08h121.98v-.08c67.65-1.53,122.58-54.41,127.36-121.21.01-.16.02-.31.04-.47.2-2.98.34-5.97.34-9ZM1616.09,224.07h-115.47c-59.06,0-108.98-39.05-125.41-92.73,16.51-53.55,66.36-92.48,125.33-92.48h115.47c59.06,0,108.98,39.05,125.41,92.73-16.51,53.55-66.36,92.48-125.33,92.48Z" />
          <path d="M1719.38,131.13c-23.94-30.45-61.11-50.01-102.85-50.01v.07c27.58,0,49.94,22.36,49.94,49.94s-22.36,49.94-49.94,49.94v.07c41.74,0,78.91-19.56,102.85-50.01Z" />
          <path d="M1397.36,131.13c23.94-30.45,61.11-50.01,102.85-50.01v.07c-27.58,0-49.94,22.36-49.94,49.94,0,27.58,22.36,49.94,49.94,49.94v.07c-41.74,0-78.91-19.56-102.85-50.01Z" />
          <path d="M1558.33,181.28c.05-27.7,22.51-50.14,50.21-50.14-27.61,0-49.99-22.28-50.2-49.84-.01,0-.02,0-.03,0-.21,27.44-22.4,49.63-49.85,49.82,0,.01,0,.02,0,.04,27.54.19,49.82,22.54,49.86,50.12Z" />
          <path d="M392.32,0l95.44,260.96h-38.95l-28.93-79.78h-90.92l-28.74,79.78h-56.67l94.65-131.23L338.99,0h53.33ZM411.3,157.21l-36.46-99.91-36.56,99.91h73.02Z" />
          <path d="M571.27,223.89h143.12v37.08h-201.34l46.66-130.97L513.05,0h58.23v223.89Z" />
          <path d="M992.69,260.96l46.66-130.97L992.69,0h59.26v260.96h-59.26Z" />
          <path d="M206.2,63.61c8.88-16.11,14.46-34.29,15.85-53.61V1.7h-38.42c0,.36-.03.75-.1,1.1-6.63,62.73-57.52,112.27-120.88,116.83h-1.95V0H0l46.66,129.88L0,260.96h60.71v-117.67h1.68c63.48,4.44,114.51,54.03,121.14,116.85.06.36.1.75.1,1.1h38.42v-8.3c-1.39-19.32-6.97-37.5-15.85-53.61-22.33-40.48-54.86-67.93-104.38-67.94l-1.2-.82c44-5.04,85.61-30.76,105.59-66.97Z" />
          <path d="M961.43,39.04V0h-216.99l46.66,129.99-46.66,129.7,216.99,1.28v-37.08h-128.83c-16.56,0-29.98-13.42-29.98-29.98v-59.32l-.03-28.04h110.49v-25.34h-84.29c-15.54-1.29-27.99-13.48-29.62-28.91-.02-5.4-.04-12.43-.04-13.26h162.3Z" />
          <path d="M1941.78,116.65l-25.4-.14h-44.54v.06h-25.13l-31.57.09c-1.08,0-1.98-.08-2.81-.19-13.28,0-25.4-9.25-32.53-18.96-7.13-9.71-9.28-19.88-9.28-19.88,0,0,2.64-11.61,11.27-21.74,8.05-9.45,21.68-17.46,33.01-17.46.13-.02.23-.07.37-.09h1.17c.59-.03,1.17-.09,1.77-.09s1.18.06,1.77.09h49.97l19.94-.02c11.09,0,21.33,3.6,29.63,9.72,10.31,7.55,16.54,18.54,18.71,31.7v1.13h61.88c-.13-24.89-11.44-47.13-29.2-61.91-14.03-11.73-32.09-18.77-51.83-18.77-1.56,0-3.08.03-4.6.13h-65.1c-1.52-.1-3.05-.13-4.6-.13-.15,0-.3.02-.46.02v-.02c-40.62,0-74.26,29.86-80.15,68.83-.63,4.09-.97,8.27-.97,12.54,0,38.3,24.51,61.3,51.34,61.3l32.28.14h34.81v-.06h34.86l31.34-.07c.86-.07,1.72-.13,2.6-.13,14.42,0,27.65,9.81,35.31,20.46,6.82,9.49,8.85,19.96,8.85,19.96,0,0-2.9,23.5-27.75,36.54-6.16,2.72-12.96,4.24-20.13,4.24l-55.13.19-17.42-.19c-11.09,0-21.33-3.6-29.63-9.72-8.88-6.51-15.51-15.92-18.56-26.81-.34-1.4-.65-2.82-.89-4.28-.06-.36-.23-1.82-.2-2.2h-61.99c.04,8.02,1.26,15.76,3.47,23.07,4.54,15.81,13.74,29.65,26.06,39.9,14.03,11.73,32.09,17.77,51.83,17.77,1.56,0,3.08-.03,4.6-.13h65.1c1.52.1,3.05.13,4.6.13.15,0,.3-.02.46-.02v.02c40.62,0,74.26-28.87,80.15-67.83.63-4.09.97-8.27.97-12.54,0-20.29-8.93-64.65-58.22-64.65Z" />
          <path d="M1235.44.42c-3.71-.25-7.48-.41-11.37-.41h-126.55l46.66,129.99-46.66,130.97h126.55c5.28,0,10.39-.23,15.34-.69,63.1-9.49,111.48-63.93,111.48-129.68S1300.46,8.18,1235.44.42ZM1219.22,224.07h-29.15c-4.14,0-7.64-.21-10.68-.59h-22.42V38.4h22.37c4,0,7.9.2,11.73.51.7-.01,1.33-.05,2.07-.05h26.01c59.06,0,108.98,39.05,125.41,92.73-16.51,53.55-66.36,92.48-125.33,92.48Z" />
        </symbol>
      </svg>
    </>
  );
}

const Star = ({ color, size, reverse, dur }: { color: string; size: number; reverse?: boolean; dur: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ animation: `${reverse ? "sbSpinR" : "sbSpin"} ${dur}s linear infinite` }}>
    <polygon points="50,0 61,39 100,50 61,61 50,100 39,61 0,50 39,39" fill={color} />
  </svg>
);

export default function SobrePage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?'}lang=en` : path;
  const isEn = locale === 'en';

  const historyParagraphs = isEn
    ? [
        "Kaleidos was born inside the crypto market, not next to it. Since 2020 we have lived through cycles, narratives and launches from the front row, building marketing for projects that move on-chain.",
        "That is what sets us apart: the whole team actually understands crypto. We read on-chain narrative, we follow what the market is talking about, and we translate all of it into brand, content and authority.",
        "We are a boutique agency that speaks the language of this market fluently. We turn complex projects into clear stories, and stories into reputation that compounds.",
      ]
    : [
        "A Kaleidos nasceu dentro do mercado cripto, não ao lado dele. Desde 2020 acompanhamos ciclos, narrativas e lançamentos na linha de frente, construindo marketing pra projetos que se movem on-chain.",
        "É isso que muda o jogo: o time inteiro entende de cripto de verdade. A gente lê a narrativa on-chain, acompanha o que o mercado está discutindo e traduz tudo isso em marca, conteúdo e autoridade.",
        "Somos uma agência boutique que fala a língua desse mercado com fluência. Transformamos projetos complexos em histórias claras, e histórias em reputação que se acumula.",
      ];

  const valuesItems = (isEn
    ? [
        { title: "Boundless Creativity", description: "We believe there are no limits to creativity. Every project is an opportunity to innovate and surprise." },
        { title: "Measurable Results", description: "We don’t just create pretty content. We build strategies that generate real, measurable results." },
        { title: "Customer Focus", description: "Our client's success is our success. We work side by side to achieve the goals." },
        { title: "Excellence in Everything", description: "From the first contact to the final delivery, we strive for excellence in every detail." },
        { title: "Constant Innovation", description: "Always seeking the best practices and technologies to deliver cutting-edge solutions." },
        { title: "Agility and Efficiency", description: "We know time is money. We work fast without compromising quality." },
      ]
    : [
        { title: "Criatividade Sem Limites", description: "Acreditamos que não há limites para a criatividade. Cada projeto é uma oportunidade de inovar e surpreender." },
        { title: "Resultados Mensuráveis", description: "Não criamos apenas conteúdo bonito. Criamos estratégias que geram resultados reais e mensuráveis." },
        { title: "Foco no Cliente", description: "O sucesso do nosso cliente é o nosso sucesso. Trabalhamos lado a lado para alcançar os objetivos." },
        { title: "Excelência em Tudo", description: "Do primeiro contato à entrega final, buscamos a excelência em cada detalhe do processo." },
        { title: "Inovação Constante", description: "Sempre em busca das melhores práticas e tecnologias para entregar soluções de ponta." },
        { title: "Agilidade e Eficiência", description: "Entendemos que tempo é dinheiro. Trabalhamos com agilidade sem comprometer a qualidade." },
      ]);

  const accents = [GREEN, PINK, GREEN, PINK, GREEN, PINK];

  const marqueeText = isEn
    ? "CONTENT ✺ STRATEGY ✺ LAUNCHES ✺ SOCIAL ✺ WEB3 ✺ DEFI ✺ KOLs ✺ BRANDING ✺ "
    : "CONTEÚDO ✺ ESTRATÉGIA ✺ LANÇAMENTOS ✺ SOCIAL ✺ WEB3 ✺ DEFI ✺ KOLs ✺ BRANDING ✺ ";

  /**
   * ⚠️ 19/08/2026 — as 4 métricas institucionais que ficavam aqui SAÍRAM:
   * "500+ Vídeos Editados", "125M+ Views nos Reels", "50+ Lançamentos" e
   * "98% Satisfação". Nenhuma tinha fonte primária (ver `src/lib/metrics.ts`);
   * a de satisfação afirmava uma pesquisa de NPS que nunca foi feita.
   * No lugar entrou resultado de cliente nomeado, com print e janela.
   * ⛔ Não repor número de agência aqui sem `source` + `apurado` em metrics.ts.
   */
  const P = KALEIDOS_PROOF;
  const metrics = [
    { value: isEn ? P.defiversoViews.value_en : P.defiversoViews.value, label: isEn ? 'Organic views · Defiverso' : 'Views orgânicos · Defiverso', accent: GREEN },
    { value: isEn ? P.defiversoNewsletter.value_en : P.defiversoNewsletter.value, label: isEn ? 'Newsletter open rate · Defiverso' : 'Abertura da newsletter · Defiverso', accent: PINK },
    { value: isEn ? P.lucasInstagram.value_en : P.lucasInstagram.value, label: isEn ? 'Followers · Investidor 4.20' : 'Seguidores · Investidor 4.20', accent: GREEN },
    { value: isEn ? P.laylaInstagram.value_en : P.laylaInstagram.value, label: isEn ? 'Followers · Laylä Föz' : 'Seguidores · Laylä Föz', accent: PINK },
  ];

  return (
    <main className="sb-scope min-h-screen" style={{ color: INK }}>
      <SobreDefs />

      {/* Header */}
      <header style={{ borderBottom: `1.5px solid ${INK}`, background: "rgba(250,250,250,.85)", backdropFilter: "blur(6px)" }} className="sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href={withLang('/')}
            className="sb-font-accent inline-flex items-center gap-2 text-xs py-3 -my-3"
            style={{ letterSpacing: "1.5px", textTransform: "uppercase", color: INK, minHeight: 44 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('about','backHome')}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* deco */}
        <div className="sb-deco pointer-events-none absolute inset-0">
          <Image src="/v2/collage/brain-glasses.webp" alt="" width={170} height={170} style={{ position: "absolute", right: "5%", top: "14%", width: 150, height: "auto", mixBlendMode: "multiply", ['--r' as string]: "8deg", animation: "sbFloat 7s ease-in-out infinite" } as React.CSSProperties} />
          <Image src="/v2/collage/einstein.webp" alt="" width={120} height={120} style={{ position: "absolute", left: "3%", bottom: "12%", width: 120, height: "auto", mixBlendMode: "multiply", ['--r' as string]: "-6deg", animation: "sbFloat2 9s ease-in-out infinite" } as React.CSSProperties} />
          <div style={{ position: "absolute", left: "4%", top: "16%", ['--r' as string]: "-12deg", animation: "sbFloat 10s ease-in-out infinite" } as React.CSSProperties}>
            <svg width={92} height={64} style={{ fill: PINK }}><use href="#sb-kal-eye" /></svg>
          </div>
          <div style={{ position: "absolute", right: "26%", top: "10%" }}><Star color={GREEN} size={56} dur={14} /></div>
          <div style={{ position: "absolute", left: "28%", bottom: "16%" }}><Star color={PINK} size={40} reverse dur={9} /></div>
          {/* caleidoscópio cyberpunk — medalhão (dark bg enquadrado em círculo brutalista) */}
          <div style={{ position: "absolute", right: "7%", bottom: "22%" }}>
            <div style={{ width: 116, height: 116, borderRadius: "50%", overflow: "hidden", border: `2px solid ${INK}`, boxShadow: `5px 5px 0 ${PINK}`, animation: "sbSpin 60s linear infinite" }}>
              <Image src="/v2/cyberpunk/caleidoscopio.jpg" alt="" width={116} height={116} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-5 pt-20 pb-24 text-center">
          {/* logo card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block mb-9"
            style={{ transform: "rotate(-2deg)" }}
          >
            <span style={{ position: "absolute", top: -13, left: "18%", transform: "translateX(-50%) rotate(-8deg)", width: 78, height: 24, background: "rgba(124,240,103,.6)", border: "1px solid rgba(0,0,0,.16)", boxShadow: "0 1px 2px rgba(0,0,0,.12)" }} />
            <span style={{ position: "absolute", top: -11, right: "14%", transform: "translateX(50%) rotate(7deg)", width: 78, height: 24, background: "rgba(210,98,178,.5)", border: "1px solid rgba(0,0,0,.16)", boxShadow: "0 1px 2px rgba(0,0,0,.12)" }} />
            <div style={{ background: "#fff", border: `1.5px solid ${INK}`, padding: "15px 28px", boxShadow: "6px 6px 0 rgba(0,0,0,.14)" }}>
              <svg viewBox="0 0 2000 262.38" style={{ width: 200, maxWidth: "60vw", height: "auto", fill: INK, display: "block" }}><use href="#sb-kal-word" /></svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="sb-font-accent inline-flex items-center gap-2" style={{ fontSize: 11.5, letterSpacing: "2.5px", textTransform: "uppercase", background: "#fff", border: `1.5px solid ${INK}`, borderRadius: 999, padding: "8px 16px", boxShadow: `3px 3px 0 ${GREEN}`, marginBottom: 28 }}>
              ● {isEn ? "Crypto-native agency · since 2020" : "Agência nativa do mercado cripto · desde 2020"}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="sb-font-display"
            style={{ fontWeight: 700, fontSize: "clamp(44px,7vw,86px)", lineHeight: 0.98, letterSpacing: "-2px", margin: 0 }}
          >
            {isEn ? "We are " : "Somos a "}
            <span style={{ background: `linear-gradient(${GREEN},${GREEN}) center/100% 40% no-repeat`, padding: "0 8px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{t('about','heroTitle')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto"
            style={{ fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.55, color: "#4a443c", maxWidth: 620, marginTop: 26, fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            {t('about','heroTagline')}
          </motion.p>
        </div>

        {/* marquee */}
        <div style={{ background: GREEN, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, overflow: "hidden", padding: "14px 0" }}>
          <div className="sb-font-display" style={{ display: "flex", width: "max-content", animation: "sbMq 26s linear infinite", fontWeight: 800, fontSize: 26, color: "#06250a", whiteSpace: "nowrap" }}>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: "@keyframes sbMq{from{transform:translateX(0)}to{transform:translateX(-50%)}}" }} />
      </section>

      {/* Nossa História */}
      <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="sb-eyebrow mb-4" style={{ color: PINK }}>{isEn ? "Where it started" : "Onde tudo começou"}</div>
            <h2 className="sb-font-display" style={{ fontWeight: 700, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 24px" }}>
              {t('about','ourHistory')}
            </h2>
            <div className="space-y-5" style={{ fontSize: 17, lineHeight: 1.6, color: "#4a443c", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {historyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="sb-deco" style={{ position: "absolute", right: -18, top: -18, zIndex: 2 }}><Star color={PINK} size={64} dur={22} /></div>
            <div className="relative aspect-square overflow-hidden" style={{ border: `1.5px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${GREEN}` }}>
              <Image
                src="/Kaleidos/imagens/nos.jpg"
                alt={isEn ? "Kaleidos team" : "Equipe Kaleidos"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="sb-font-accent" style={{ position: "absolute", bottom: 16, left: 16, background: INK, color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {t('about','since')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="sb-eyebrow mb-3" style={{ color: PINK }}>{isEn ? "Behind the work" : "Por trás do trabalho"}</div>
          <h2 className="sb-font-display" style={{ fontWeight: 700, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 12px" }}>
            {t('about','ourTeam')}
          </h2>
          <p style={{ fontSize: 18, color: "#6b6258", maxWidth: 560, margin: "0 auto", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {t('about','teamSubtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <Carousel opts={{ align: "start", loop: true, skipSnaps: false, dragFree: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {[
                {
                  name: "Gabriel Madureira",
                  role: "Co-Founder",
                  image: "/Kaleidos/imagens/Equipe/Madureira.png",
                  description: isEn
                    ? "The creative side of the Kaleidos brain. A crypto market specialist and copywriter, he brought a new paradigm to marketing strategies for the crypto world, and knows how to work with people better than anyone."
                    : "Pode ser considerado o lado criativo do cérebro da Kaleidos. Especialista no mercado cripto e copywriter, trouxe um novo paradigma nas estratégias de marketing para o mundo cripto, sabendo lidar com as pessoas da melhor forma.",
                  // Handle social canônico = @ogmadureira (desde 2026-04-29).
                  // Os links antigos (@gabrielmadureira) mandavam o visitante
                  // pro lugar errado. O LinkedIn segue /in/gabrielmadureira.
                  social: { instagram: "https://www.instagram.com/ogmadureira", twitter: "https://twitter.com/ogmadureira", linkedin: "https://www.linkedin.com/in/gabrielmadureira", email: "madureira@kaleidosdigital.com" }
                },
                {
                  name: "Nathalia Maciente",
                  role: "Co-founder",
                  image: "/Kaleidos/imagens/Equipe/Nathalia.png",
                  description: isEn
                    ? "The attentive, organized side of the Kaleidos brain. Nothing gets past her careful eye, which makes every piece of content and strategy come out with extreme precision. Video editor and the team's chief organizer."
                    : "É o lado atento e organizado do cérebro da Kaleidos. Não deixa nada passar pelo seu olhar atento, tornando cada conteúdo e estratégia feitos com extrema perfeição. Editora de vídeo e organizadora maior do time Kaleidos.",
                  social: { instagram: "https://www.instagram.com/nathaliamaciente", linkedin: "https://www.linkedin.com/in/nathaliamaciente", email: "nathalia@kaleidosdigital.com" }
                },
                {
                  name: "Caio Crispim",
                  role: "Copywriter",
                  image: "/Kaleidos/imagens/Equipe/Caio.png",
                  description: isEn
                    ? "Our senior writer and creator. He has worked at several big techs in the crypto market and, with thousands of pieces of content behind him, delivers every text in the best possible shape."
                    : "É o nosso escritor e criador sênior. Já passou por várias big techs do mercado cripto e, com milhares de conteúdos em seu histórico, consegue entregar cada texto da melhor forma possível.",
                  social: { instagram: "https://www.instagram.com/caiocrispim", linkedin: "https://www.linkedin.com/in/caiocrispim", email: "caio@kaleidosdigital.com" }
                },
                {
                  name: "Gabriel Rebelo",
                  role: "Social Media",
                  image: "/Kaleidos/imagens/Equipe/Rebelo.png",
                  description: isEn
                    ? "The team's creative social media manager. Every post goes through him, and he creates the best stories you could find. Understands the crypto market like few do."
                    : "O social media criativo do time. Todos os posts passam por ele, e cria os melhores stories que você poderia encontrar. Entende o mercado cripto como poucos.",
                  social: { instagram: "https://www.instagram.com/gabrielrebelo", twitter: "https://twitter.com/gabrielrebelo", linkedin: "https://www.linkedin.com/in/gabrielrebelo", email: "gabriel.rebelo@kaleidosdigital.com" }
                },
              ].map((member, index) => {
                const accent = index % 2 === 0 ? GREEN : PINK;
                const TeamCard = () => {
                  const [isFlipped, setIsFlipped] = useState(false);
                  return (
                    <div
                      className="relative w-full h-[400px] group [perspective:2000px] cursor-pointer"
                      onMouseEnter={() => setIsFlipped(true)}
                      onMouseLeave={() => setIsFlipped(false)}
                      onClick={() => setIsFlipped((v) => !v)}
                    >
                      <div className={`relative w-full h-full [transform-style:preserve-3d] transition-all duration-700 ${isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"}`}>
                        {/* Front */}
                        <div
                          className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden ${isFlipped ? "opacity-0" : "opacity-100"}`}
                          style={{ background: "#fff", border: `1.5px solid ${INK}`, borderRadius: 16, boxShadow: `6px 6px 0 ${accent}`, transition: "opacity .7s" }}
                        >
                          <div className="flex flex-col items-center justify-center h-full p-8">
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300" style={{ border: `2px solid ${INK}` }}>
                              <Image src={member.image} alt={member.name} fill className="object-cover" sizes="128px" />
                            </div>
                            <h3 className="sb-font-display text-xl font-bold mb-1 text-center" style={{ color: INK }}>{member.name}</h3>
                            <p className="sb-font-accent text-center mb-4" style={{ color: "#6b6258", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}>{member.role}</p>
                            <div className="flex items-center gap-2 text-sm" style={{ color: "#a39a8c" }}>
                              <span className="hidden sm:inline">{isEn ? "Hover" : "Passe o mouse"}</span>
                              <span className="sm:hidden">{isEn ? "Tap to flip" : "Toque para virar"}</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                        {/* Back */}
                        <div
                          className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 flex flex-col ${!isFlipped ? "opacity-0" : "opacity-100"}`}
                          style={{ background: INK, color: "#FAFAFA", border: `1.5px solid ${INK}`, borderRadius: 16, boxShadow: `6px 6px 0 ${accent}`, transition: "opacity .7s" }}
                        >
                          <div className="flex-1 space-y-3">
                            <div className="text-center">
                              <h3 className="sb-font-display text-lg font-bold mb-1">{member.name}</h3>
                              <p className="sb-font-accent mb-3" style={{ color: accent, fontSize: 10.5, letterSpacing: "1.5px", textTransform: "uppercase" }}>{member.role}</p>
                            </div>
                            <p className="text-sm leading-relaxed text-center" style={{ color: "#cfc6b6", fontFamily: "var(--font-inter), Inter, sans-serif" }}>{member.description}</p>
                          </div>
                          <div className="pt-4 mt-2" style={{ borderTop: "1px solid #3a332a" }}>
                            <div className="flex items-center justify-center gap-1">
                              {member.social.instagram && (
                                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors inline-flex items-center justify-center" style={{ color: "#8a8074", minWidth: 44, minHeight: 44 }} aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                              )}
                              {member.social.twitter && (
                                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="transition-colors inline-flex items-center justify-center" style={{ color: "#8a8074", minWidth: 44, minHeight: 44 }} aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                              )}
                              {member.social.linkedin && (
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors inline-flex items-center justify-center" style={{ color: "#8a8074", minWidth: 44, minHeight: 44 }} aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                              )}
                              {member.social.email && (
                                <a href={`mailto:${member.social.email}`} className="transition-colors inline-flex items-center justify-center" style={{ color: "#8a8074", minWidth: 44, minHeight: 44 }} aria-label="Email"><Mail className="h-5 w-5" /></a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                };
                return (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="py-4">
                      <TeamCard />
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="sb-eyebrow mb-3" style={{ color: PINK }}>{isEn ? "What guides us" : "O que nos guia"}</div>
          <h2 className="sb-font-display" style={{ fontWeight: 700, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 12px" }}>
            {t('about','ourValues')}
          </h2>
          <p style={{ fontSize: 18, color: "#6b6258", maxWidth: 560, margin: "0 auto", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {t('about','valuesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuesItems.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="sb-btn p-7"
              style={{ background: "#fff", border: `1.5px solid ${INK}`, borderRadius: 16, boxShadow: `5px 5px 0 ${accents[index % accents.length]}` }}
            >
              <div className="sb-font-display flex items-center justify-center mb-5" style={{ width: 52, height: 52, borderRadius: 12, border: `1.5px solid ${INK}`, background: accents[index % accents.length], fontWeight: 800, fontSize: 24, color: INK }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="sb-font-display mb-2" style={{ fontWeight: 700, fontSize: 20, color: INK }}>{value.title}</h3>
              <p style={{ color: "#6b6258", lineHeight: 1.55, fontSize: 14.5, fontFamily: "var(--font-inter), Inter, sans-serif" }}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nossos Números */}
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="sb-eyebrow mb-3" style={{ color: PINK }}>{isEn ? "On-chain track record" : "Histórico on-chain"}</div>
          <h2 className="sb-font-display" style={{ fontWeight: 700, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 12px" }}>
            {t('about','ourNumbers')}
          </h2>
          <p style={{ fontSize: 18, color: "#6b6258", maxWidth: 560, margin: "0 auto", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {t('about','numbersSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-7"
              style={{ background: "#fff", border: `1.5px solid ${INK}`, borderRadius: 16, boxShadow: `5px 5px 0 ${m.accent}` }}
            >
              <div className="sb-font-display" style={{ fontWeight: 800, fontSize: "clamp(38px,5vw,52px)", lineHeight: 1, color: INK, WebkitTextStroke: `0px ${INK}`, marginBottom: 10 }}>
                <span style={{ background: `linear-gradient(${m.accent},${m.accent}) center/100% 32% no-repeat`, padding: "0 4px" }}>{m.value}</span>
              </div>
              <div className="sb-font-accent" style={{ color: "#6b6258", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Procedência — obrigatória sempre que este bloco mostrar número. */}
        <p style={{ marginTop: 18, fontSize: 12.5, lineHeight: 1.5, color: "#8a8078", maxWidth: 760, fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          {isEn ? PROOF_NOTE_EN : PROOF_NOTE}
        </p>
      </section>

      {/* CTA Final */}
      <section className="max-w-6xl mx-auto px-5 pb-24 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden text-center px-6 py-14 md:py-20"
          style={{ background: INK, color: "#FAFAFA", border: `1.5px solid ${INK}`, borderRadius: 24 }}
        >
          <div className="relative">
            <h2 className="sb-font-display mx-auto" style={{ fontWeight: 700, fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.02, letterSpacing: "-1px", maxWidth: 760, margin: 0 }}>
              {t('about','ctaTitle')}
            </h2>
            <p className="mx-auto" style={{ fontSize: 18, marginTop: 18, marginBottom: 32, color: "#b8b1a6", maxWidth: 560, fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {t('about','ctaText')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={withLang('/contato')}
                className="sb-btn inline-flex items-center gap-2"
                style={{ background: "#fff", color: INK, fontWeight: 700, fontSize: 16, padding: "15px 28px", borderRadius: 999, boxShadow: `5px 5px 0 ${GREEN}`, textDecoration: "none" }}
              >
                {t('about','ctaButton')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={withLang('/cases')}
                className="sb-btn inline-flex items-center gap-2"
                style={{ background: "transparent", color: "#FAFAFA", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 999, border: "1.5px solid #FAFAFA", textDecoration: "none" }}
              >
                {isEn ? "View cases" : "Ver cases"}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Manifesto — banda PRETA, título verde gigante + 4 colunas */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0a0a0a", color: "#FAFAFA", borderTop: `1.5px solid ${INK}` }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            backgroundImage: "radial-gradient(#ffffff14 1.2px,transparent 1.4px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 py-20 md:py-28">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sb-font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(64px,13vw,180px)",
              lineHeight: 0.9,
              letterSpacing: "-3px",
              color: GREEN,
              margin: "0 0 48px",
            }}
          >
            MANIFESTO
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 14,
              lineHeight: 1.7,
              color: "#cfc6b6",
            }}
          >
            {isEn ? (
              <>
                <div className="space-y-4">
                  <p>The crypto market does not forgive who fakes it. Communities smell a script from miles away, and a generic agency that just landed its first crypto client never lasts here.</p>
                  <p>We were built different. Kaleidos is crypto-native: the whole team understands this market because we have lived inside it since 2020.</p>
                </div>
                <div className="space-y-4">
                  <p>We read on-chain narrative the way others read a brief. We know the difference between hype and a thesis, between a launch that moves and noise that disappears in a week.</p>
                  <p>That is the edge we bring to every project: marketing made by people who actually get it, not by outsiders translating from the side.</p>
                </div>
                <div className="space-y-4">
                  <p>We turn complex protocols into clear stories. We build authority assets, content and launches that make serious projects look as serious as they are.</p>
                  <p style={{ color: "#FAFAFA", fontWeight: 600 }}>Reputation in crypto is the only moat that compounds. We help you build it.</p>
                </div>
                <div className="space-y-4">
                  <p>In this market since 2020, a boutique team and a track record across the names that shaped this space.</p>
                  <p style={{ color: GREEN, fontWeight: 600 }}>If you speak this market, you already know who speaks it back.</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <p>O mercado cripto não perdoa quem finge. As comunidades sentem o roteiro de longe, e uma agência genérica que acabou de pegar o primeiro cliente cripto nunca dura por aqui.</p>
                  <p>A gente foi construído diferente. A Kaleidos é cripto-nativa: o time inteiro entende desse mercado porque vive dentro dele desde 2020.</p>
                </div>
                <div className="space-y-4">
                  <p>Lemos a narrativa on-chain do jeito que os outros leem um briefing. Sabemos a diferença entre hype e tese, entre um lançamento que move o mercado e barulho que some em uma semana.</p>
                  <p>É essa vantagem que entra em cada projeto: marketing feito por quem realmente entende, não por gente de fora traduzindo de longe.</p>
                </div>
                <div className="space-y-4">
                  <p>Transformamos protocolos complexos em histórias claras. Construímos ativos de autoridade, conteúdo e lançamentos que fazem projetos sérios parecerem tão sérios quanto são.</p>
                  <p style={{ color: "#FAFAFA", fontWeight: 600 }}>Reputação em cripto é o único moat que se acumula. A gente ajuda você a construir o seu.</p>
                </div>
                <div className="space-y-4">
                  <p>Nesse mercado desde 2020, um time boutique e um histórico ao lado dos nomes que moldaram esse espaço.</p>
                  <p style={{ color: GREEN, fontWeight: 600 }}>Se você fala a língua desse mercado, já sabe quem fala de volta.</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterDemo />
    </main>
  );
}
