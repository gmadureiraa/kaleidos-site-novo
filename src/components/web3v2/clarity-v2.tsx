"use client";

import Script from "next/script";

// Microsoft Clarity — session replay + heatmaps para a rota /2 (web3v2).
// Carrega SOMENTE quando NEXT_PUBLIC_CLARITY_ID estiver setado. Sem ID,
// retorna null (nada injetado). NÃO usa ID hardcoded — o Gabriel cria o
// projeto no Clarity (clarity.microsoft.com) e seta o ID na Vercel.
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Web3V2Clarity() {
  if (!CLARITY_PROJECT_ID) return null;

  return (
    <Script
      id="microsoft-clarity-v2"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `,
      }}
    />
  );
}
