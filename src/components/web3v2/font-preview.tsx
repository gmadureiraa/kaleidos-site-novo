"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Previsualizador de tipografia da rota `/2`.
 *
 * Lê o query param `?font=` e troca a stack tipográfica DENTRO do escopo `.kv2`
 * sem tocar o resto do site. Serve só pra Gabriel avaliar alternativas visuais.
 *
 *   /2            → A · padrão (Atelier display + Inter corpo) — baseline
 *   /2?font=a     → idem ao padrão (explícito)
 *   /2?font=b     → B · Serif editorial (Instrument Serif display + Inter corpo)
 *   /2?font=c     → C · Grotesk (Space Grotesk display + corpo)
 *   /2?font=d     → D · Bricolage Grotesque display + Inter corpo
 *
 * Como funciona: os títulos do /2 usam `font-family:Atelier` (inline) ou a
 * classe `.font-display`; o corpo usa Inter. Aqui sobrescrevemos via CSS com
 * `!important` escopado em `.kv2[data-kv2-font="x"]`, e carregamos as webfonts
 * do Google só quando a opção é selecionada.
 */

type FontKey = "a" | "b" | "c" | "d";

const GOOGLE_FONTS: Record<FontKey, string | null> = {
  a: null, // baseline — fontes locais já carregadas
  b: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap",
  c: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  d: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700;800&display=swap",
};

// Seletores de TÍTULO no escopo /2 (inline Atelier + classe .font-display).
const DISPLAY_SEL = (k: FontKey) =>
  `.kv2[data-kv2-font="${k}"] h1,` +
  `.kv2[data-kv2-font="${k}"] h2,` +
  `.kv2[data-kv2-font="${k}"] h3,` +
  `.kv2[data-kv2-font="${k}"] .font-display,` +
  `.kv2[data-kv2-font="${k}"] [style*="Atelier"]`;

// Seletores de CORPO (parágrafos, botões, links).
const BODY_SEL = (k: FontKey) =>
  `.kv2[data-kv2-font="${k}"] p,` +
  `.kv2[data-kv2-font="${k}"] a,` +
  `.kv2[data-kv2-font="${k}"] li,` +
  `.kv2[data-kv2-font="${k}"] .cta-btn`;

const CSS: Record<FontKey, string> = {
  a: "", // baseline, sem override
  b: `
    ${DISPLAY_SEL("b")} { font-family: "Instrument Serif", Georgia, serif !important; letter-spacing: -0.5px !important; font-weight: 400 !important; }
    ${DISPLAY_SEL("b")} { text-transform: none !important; }
  `,
  c: `
    ${DISPLAY_SEL("c")} { font-family: "Space Grotesk", system-ui, sans-serif !important; letter-spacing: -1.5px !important; }
    ${BODY_SEL("c")} { font-family: "Space Grotesk", system-ui, sans-serif !important; }
  `,
  d: `
    ${DISPLAY_SEL("d")} { font-family: "Bricolage Grotesque", system-ui, sans-serif !important; letter-spacing: -1.5px !important; }
  `,
};

function normalize(v: string | null): FontKey {
  const k = (v || "a").toLowerCase();
  return (["a", "b", "c", "d"] as const).includes(k as FontKey) ? (k as FontKey) : "a";
}

export function Web3V2FontPreview() {
  const params = useSearchParams();
  const key = normalize(params.get("font"));

  useEffect(() => {
    // marca o escopo .kv2 com a opção escolhida
    const main = document.querySelector("main.kv2");
    if (main) main.setAttribute("data-kv2-font", key);

    // carrega a webfont do Google (se houver) sem duplicar
    const href = GOOGLE_FONTS[key];
    let link: HTMLLinkElement | null = null;
    if (href && !document.querySelector(`link[data-kv2-font="${key}"]`)) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-kv2-font", key);
      document.head.appendChild(link);
    }
    return () => {
      // não removemos a fonte (cache) nem o atributo entre navegações suaves
    };
  }, [key]);

  return (
    <>
      {/* CSS de override escopado — só age quando data-kv2-font casa */}
      <style dangerouslySetInnerHTML={{ __html: Object.values(CSS).join("\n") }} />
      {/* fallback SSR: aplica o atributo já no markup inicial via script inline */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var u=new URL(location.href);var f=(u.searchParams.get('font')||'a').toLowerCase();if(['a','b','c','d'].indexOf(f)<0)f='a';var m=document.querySelector('main.kv2');if(m)m.setAttribute('data-kv2-font',f);}catch(e){}})();`,
        }}
      />
    </>
  );
}
