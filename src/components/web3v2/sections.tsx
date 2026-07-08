/**
 * Web3 V2 — blocos portados do design estático `public/web3/index.html`.
 *
 * São usados APENAS na rota de teste `/2`. Nada aqui toca a home real (`/`),
 * o layout raiz, o next.config nem qualquer componente existente.
 *
 * Estética trazida verbatim do /web3: fontes Atelier/Gridlite (já registradas
 * globalmente no layout), verde #7CF067 / rosa #D262B2, colagens, mãos de Adão,
 * keyframes. Tudo escopado sob o wrapper `.kv2` + keyframes com nomes únicos
 * (floaty/floaty2/starspin/starspin2/pop/mq) que não colidem com os globais
 * (o `spin` global é idêntico e é reaproveitado). Assets em `/public/v2/collage`.
 */

const STYLE = `
.kv2 .cta-btn{transition:transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s cubic-bezier(.22,1,.36,1);}
.kv2 .cta-btn:hover{transform:translate(-2px,-2px);}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
@keyframes floaty2{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes starspin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes starspin2{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-360deg)}}

/* Hero + faixa de logos preenchem a 1ª dobra juntos. A faixa ficou mais baixa
   (título embaixo + pb-6 em vez de pb-12, -24px): logos h-16 (64px) + mt-2 (8px)
   + título (~17px) + pb-6 (24px) = ~125px no desktop. O hero ocupa o resto da
   viewport pra que a 2ª dobra (Manifesto) não espie por baixo. Recalc -24px após
   reduzir a margem inferior da faixa de logos. */
.kv2 .w3-hero{min-height:calc(100svh - 189px);}
@media (max-width:900px){
  .kv2 .w3-hero{min-height:calc(100svh - 197px);}
}
@media (max-width:600px){
  /* No mobile a faixa de logos ocupa mais altura proporcional; folga maior. */
  .kv2 .w3-hero{min-height:calc(100svh - 209px);}
  .kv2 .w3-hero .w3-heropad{padding-top:32px!important;padding-bottom:32px!important;}
}

@media (max-width:900px){
  .kv2 .w3-pgrid{grid-template-columns:1fr!important;gap:36px!important;}
  .kv2 .w3-dgrid{grid-template-columns:1fr!important;gap:36px!important;}
  .kv2 .w3-dimg{min-height:auto!important;order:2;}
  .kv2 .w3-proc-deco{display:none!important;}
  .kv2 .w3-pad{padding-left:24px!important;padding-right:24px!important;}
  /* Diferenciais: olho vira faixa de topo full-width no mobile */
  .kv2 .w3-eye{position:relative!important;width:100%!important;height:200px!important;top:auto!important;right:auto!important;bottom:auto!important;}
  .kv2 .w3-eye>img{object-position:center 30%!important;}
  .kv2 .w3-eye>span:nth-of-type(1){background:linear-gradient(0deg,#14110D 0%,transparent 60%)!important;}
  .kv2 #diferenciais .w3-dgrid{padding-top:0!important;}
}
@media (max-width:768px){
  .kv2 .w3-herodeco{display:none!important;}
}
@media (max-width:600px){
  .kv2 .w3-procgrid{grid-template-columns:1fr!important;gap:18px!important;}
  .kv2 .w3-procgrid>div{transform:none!important;}
  .kv2 .w3-pimg{height:auto!important;padding:14px 0!important;}
  .kv2 .w3-dimg img{width:240px!important;}
  .kv2 .w3-pad{padding-top:56px!important;padding-bottom:56px!important;padding-left:20px!important;padding-right:20px!important;}
  .kv2 .w3-h1{font-size:clamp(25px,7vw,36px)!important;letter-spacing:-1px!important;}
  .kv2 .w3-h1 span{white-space:normal!important;}
}
`;

/** SVG symbols (kal-eye, kal-word) + estilos escopados. Renderizar UMA vez. */
export function Web3V2Defs() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="kal-eye" viewBox="0 0 1000 693.63">
          <path d="M1000,347.24c0-.14-.02-.28-.02-.43s.02-.28.02-.42c0-7.97-.37-15.85-.9-23.69-.02-.27-.04-.54-.06-.81C986.64,144.67,840.99,4.27,661.58.2v-.2h-323.17v.2C159.21,4.26,13.68,144.36,1,321.3c-.03.41-.06.82-.09,1.24-.54,7.89-.91,15.83-.91,23.85,0,.14.02.28.02.43s-.02.28-.02.42c0,7.97.37,15.85.9,23.69.02.27.04.54.06.81,12.4,177.22,158.05,317.62,337.46,321.69v.2h323.17v-.2c179.21-4.06,324.73-144.16,337.42-321.1.03-.41.06-.82.09-1.24.54-7.89.91-15.83.91-23.85ZM653.05,592.15h-305.9c-156.47,0-288.71-103.45-332.23-245.66C58.65,204.62,190.73,101.48,346.95,101.48h305.9c156.47,0,288.71,103.45,332.23,245.66-43.73,141.87-175.81,245-332.03,245Z" />
          <path d="M906.28,342.64c-63.42-80.67-161.9-132.49-272.48-132.49v.17c73.08,0,132.32,59.24,132.32,132.32s-59.24,132.32-132.32,132.32v.17c110.58,0,209.06-51.82,272.48-132.49Z" />
          <path d="M93.44,342.64c63.42-80.67,161.9-132.49,272.48-132.49v.17c-73.08,0-132.32,59.24-132.32,132.32,0,73.08,59.24,132.32,132.32,132.32v.17c-110.58,0-209.06-51.82-272.48-132.49Z" />
          <path d="M500.02,475.51c.12-73.38,59.62-132.82,133.03-132.83-73.14-.01-132.44-59.04-132.99-132.05-.03,0-.05,0-.08,0-.55,72.69-59.35,131.48-132.05,132,0,.03,0,.06,0,.09,72.97.52,131.98,59.72,132.1,132.79Z" />
        </symbol>
        <symbol id="kal-word" viewBox="0 0 2000 262.38">
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

const HERO_DEFAULTS = {
  badge: "Criatividade que move o mercado cripto",
  headlineHtml:
    'Conteúdo, estratégia e lançamentos web3 que viram <span style="background:linear-gradient(#7CF067,#7CF067) center/100% 40% no-repeat;box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px;white-space:nowrap;">autoridade</span>.',
  subHtml:
    '<strong style="color:#14110D;">30M+ de views</strong> e <strong style="color:#14110D;">50+ lançamentos</strong> depois: a Kaleidos faz marcas web3 virarem referência, não só mais ruído no feed.',
};

export function heroHtml(o: { badge?: string; headlineHtml?: string; subHtml?: string } = {}) {
  const badge = o.badge ?? HERO_DEFAULTS.badge;
  const headlineHtml = o.headlineHtml ?? HERO_DEFAULTS.headlineHtml;
  const subHtml = o.subHtml ?? HERO_DEFAULTS.subHtml;
  return `
<section id="topo" class="w3-hero" style="position:relative;display:flex;flex-direction:column;justify-content:center;background:#FAFAFA;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;overflow:hidden;">
    <div class="w3-herodeco" style="position:absolute;inset:0;pointer-events:none;">
      <img src="/v2/collage/brain-glasses.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:6%;top:14%;width:170px;mix-blend-mode:multiply;transform:rotate(8deg);animation:floaty 7s ease-in-out infinite;filter:contrast(1.1);">
      <img src="/v2/collage/david.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:3%;bottom:8%;width:150px;mix-blend-mode:multiply;transform:rotate(-6deg);animation:floaty2 9s ease-in-out infinite;">
      <img src="/v2/elements/colagem-einstein-kaleidos.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:9%;bottom:7%;width:180px;mix-blend-mode:multiply;transform:rotate(3deg);animation:floaty 8s ease-in-out infinite;">
    </div>
    <div class="w3-heropad w3-pad" style="position:relative;width:100%;max-width:1100px;margin:0 auto;padding:40px 28px;text-align:center;">
      <div style="position:relative;display:inline-block;margin-bottom:32px;transform:rotate(-2deg);">
        <span style="position:absolute;top:-15px;left:14%;transform:translateX(-50%) rotate(-8deg);display:inline-flex;align-items:center;justify-content:center;padding:5px 12px;background:#7CF067;border:1.5px solid #14110D;box-shadow:0 1px 2px rgba(0,0,0,.12);font-family:Gridlite,monospace;font-size:11px;letter-spacing:1px;text-transform:lowercase;color:#14110D;">studio</span>
        <span style="position:absolute;top:-13px;right:10%;transform:translateX(50%) rotate(7deg);display:inline-flex;align-items:center;justify-content:center;padding:5px 12px;background:#D262B2;border:1.5px solid #14110D;box-shadow:0 1px 2px rgba(0,0,0,.12);font-family:Gridlite,monospace;font-size:11px;letter-spacing:1px;text-transform:lowercase;color:#14110D;">web3</span>
        <div style="background:#fff;border:1.5px solid #14110D;padding:16px 30px;box-shadow:6px 6px 0 rgba(0,0,0,.14);">
          <svg style="width:220px;max-width:60vw;height:auto;fill:#14110D;display:block;" viewBox="0 0 2000 262.38"><use href="#kal-word"></use></svg>
        </div>
      </div>
      <div style="display:flex;justify-content:center;"><div style="display:inline-flex;align-items:center;gap:9px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#14110D;background:#fff;border:1.5px solid #14110D;border-radius:999px;padding:8px 16px;box-shadow:3px 3px 0 #7CF067;margin-bottom:22px;">&#9679; ${badge}</div></div>
      <h1 class="w3-h1" style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(31px,4vw,54px);line-height:1.04;letter-spacing:-1.6px;margin:0;max-width:920px;margin-inline:auto;">${headlineHtml}</h1>
      <p style="font-size:clamp(17px,2vw,21px);line-height:1.55;color:#4a443c;max-width:640px;margin:26px auto 0;">${subHtml}</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;align-items:center;margin-top:36px;">
        <a href="https://calendly.com/madureira-kaleidosdigital/30min" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#14110D;color:#fff;font-weight:700;font-size:17px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 #7CF067;text-decoration:none;"><img src="/v2/calendly-icon.webp" alt="" aria-hidden="true" style="width:22px;height:22px;object-fit:contain;background:#fff;border-radius:6px;padding:2px;">Agendar reunião &rarr;</a>
        <a href="/cases" class="cta-btn" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#14110D;font-weight:700;font-size:17px;padding:16px 28px;border-radius:999px;border:1.5px solid #14110D;text-decoration:none;">Ver cases</a>
      </div>
      <div style="margin-top:16px;font-size:14px;color:#6b6258;">Prefere WhatsApp? <a href="https://wa.me/5512997796835" target="_blank" rel="noopener noreferrer" style="color:#14110D;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Fala com a gente por aqui &rarr;</a></div>
    </div>
  </section>
`;
}
const HERO_HTML = heroHtml();

const MANIFESTO_HTML = `
<section style="position:relative;background:#FFFFFF;overflow:hidden;border-bottom:2px solid #14110D;padding:44px 0 56px;">
    <!-- mãos full-bleed (ponta a ponta, sempre 100vw) — duotone verde/rosa Kaleidos sobre branco.
         aspect-ratio 1400/505 (imagem é 1400x561) + object-fit:cover recorta ~10% da altura
         mantendo a largura ponta a ponta. -->
    <div style="position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;aspect-ratio:1400/505;overflow:hidden;display:flex;justify-content:center;align-items:center;">
      <img src="/v2/collage/hands-reach-duotone.webp" alt="Duas mãos quase se tocando, em duotone verde e rosa Kaleidos" loading="lazy" decoding="async" style="display:block;width:100vw;height:100%;max-width:none;object-fit:cover;object-position:center;">
      <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-12deg);width:clamp(96px,12vw,156px);animation:starspin 26s linear infinite;pointer-events:none;">
      <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(10deg);width:clamp(70px,9vw,112px);animation:starspin2 18s linear infinite;pointer-events:none;">
    </div>
    <div class="w3-pad" style="max-width:1080px;margin:0 auto;padding:0 28px;">
      <p style="font-family:'Inter',sans-serif;font-weight:500;font-size:clamp(22px,3vw,38px);line-height:1.28;letter-spacing:-.5px;color:#14110D;margin:36px 0 0;text-wrap:pretty;text-align:center;">
        Somos a <span style="display:inline-flex;align-items:center;gap:.28em;"><svg style="width:.92em;height:.64em;fill:#14110D;vertical-align:middle;"><use href="#kal-eye"></use></svg></span> <strong style="font-weight:800;">Kaleidos</strong>, uma agência cripto-nativa de <span style="color:#2E9E32;font-weight:800;">marketing estratégico</span> que resolve o problema mais difícil do mercado: <span style="color:#2E9E32;font-weight:800;">atenção</span>. A gente cria <span style="color:#D262B2;font-weight:700;">conteúdo</span> que conecta, desenha <span style="color:#D262B2;font-weight:700;">estratégia</span> que sustenta e orquestra <span style="color:#2E9E32;font-weight:800;">lançamentos</span> que o mercado não consegue ignorar. Dê uma olhada nos nossos <a href="/cases" style="color:#D262B2;font-weight:700;text-decoration:underline;text-underline-offset:3px;">cases</a>.
      </p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:clamp(24px,5vw,64px);margin:34px auto 0;max-width:880px;">
        <div style="text-align:center;min-width:150px;">
          <div style="font-family:'Atelier','Inter',sans-serif;font-weight:800;font-size:clamp(34px,4.6vw,54px);line-height:1;color:#2E9E32;letter-spacing:-1px;">+R$30mi</div>
          <div style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.35;color:#4a443b;margin-top:8px;">faturados pelos<br>nossos clientes</div>
        </div>
        <div style="text-align:center;min-width:150px;">
          <div style="font-family:'Atelier','Inter',sans-serif;font-weight:800;font-size:clamp(34px,4.6vw,54px);line-height:1;color:#D262B2;letter-spacing:-1px;">+100mi</div>
          <div style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.35;color:#4a443b;margin-top:8px;">de views geradas<br>em redes sociais</div>
        </div>
        <div style="text-align:center;min-width:150px;">
          <div style="font-family:'Atelier','Inter',sans-serif;font-weight:800;font-size:clamp(34px,4.6vw,54px);line-height:1;color:#14110D;letter-spacing:-1px;">50+</div>
          <div style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.35;color:#4a443b;margin-top:8px;">marcas cripto<br>atendidas</div>
        </div>
      </div>
    </div>
  </section>
`;

const PROBLEMA_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
    <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;"></div>
    <div class="w3-pgrid w3-pad" style="position:relative;max-width:1240px;margin:0 auto;padding:90px 28px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;">
      <div>
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:20px;">O jeito antigo é um caos</div>
        <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(36px,4.4vw,58px);line-height:1.0;letter-spacing:-1px;margin:0;">Post genérico não constrói <span style="color:#7CF067;">reputação</span>.</h2>
        <p style="font-size:18px;line-height:1.6;color:#b8b1a6;max-width:440px;margin:24px 0 0;">A maioria das marcas cripto posta no escuro: muita pressa, pouca tese, zero consistência. O resultado some no feed em 24h.</p>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:30px;">
          <span style="background:#221d17;border:1.5px solid #3a332a;border-radius:10px;padding:11px 16px;font-size:14px;font-weight:600;transform:rotate(-2deg);">😵‍💫 conteúdo sem narrativa</span>
          <span style="background:#221d17;border:1.5px solid #3a332a;border-radius:10px;padding:11px 16px;font-size:14px;font-weight:600;transform:rotate(2deg);">⏱️ tudo pra ontem</span>
          <span style="background:#221d17;border:1.5px solid #3a332a;border-radius:10px;padding:11px 16px;font-size:14px;font-weight:600;transform:rotate(-1deg);">📉 zero dado de verdade</span>
        </div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-top:34px;">
          <a href="https://calendly.com/madureira-kaleidosdigital/30min" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:8px;background:#7CF067;color:#06250a;font-weight:700;font-size:16px;padding:15px 28px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">Agendar reunião &rarr;</a>
          <a href="/cases" class="cta-btn" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:#FAFAFA;font-weight:700;font-size:16px;padding:15px 26px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Ver cases</a>
        </div>
        <div style="margin-top:14px;font-size:14px;color:#9a9186;">Prefere WhatsApp? <a href="https://wa.me/5512997796835" target="_blank" rel="noopener noreferrer" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Fala com a gente por aqui &rarr;</a></div>
      </div>
      <div class="w3-pimg" style="position:relative;height:380px;display:flex;align-items:center;justify-content:center;">
        <span style="position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,#7CF06733,transparent 66%);"></span>
        <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:6%;top:6%;width:clamp(56px,8vw,84px);animation:starspin2 22s linear infinite;opacity:.9;">
        <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:4%;top:14%;width:clamp(48px,7vw,72px);animation:starspin 28s linear infinite;opacity:.85;">
        <img src="/v2/collage/scared-boy.webp" loading="lazy" decoding="async" alt="Menino assustado em P&amp;B — o pânico de postar no escuro, sem narrativa" style="position:relative;width:min(92%,392px);filter:drop-shadow(0 14px 30px rgba(0,0,0,.6));animation:floaty 9s ease-in-out infinite;">
        <span style="position:absolute;left:10%;bottom:2%;font-family:Gridlite,monospace;font-size:12px;letter-spacing:2px;color:#7CF067;border:1px dashed #7CF067;padding:6px 10px;border-radius:6px;transform:rotate(-4deg);background:#14110D;">postar no escuro = p&acirc;nico</span>
      </div>
    </div>
  </section>
`;

const DIFERENCIAIS_HTML = `
<section id="diferenciais" style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;border-top:2px solid #14110D;">
    <!-- textura de pontos sutil no fundo escuro -->
    <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
    <!-- IMAGEM DO OLHO — sangra até a borda direita -->
    <div class="w3-eye" style="position:absolute;top:0;right:0;bottom:0;width:46%;pointer-events:none;">
      <img src="/v2/collage/eye-halftone.webp" loading="lazy" decoding="async" alt="Close-up de um olho em meio-tono — o olhar nativo da Kaleidos" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:contrast(1.12) brightness(1.04);">
      <!-- vinheta pra fundir a imagem no preto à esquerda -->
      <span style="position:absolute;inset:0;background:linear-gradient(90deg,#14110D 0%,#14110D33 26%,transparent 55%);"></span>
      <span style="position:absolute;inset:0;background:linear-gradient(180deg,#14110D55 0%,transparent 18%,transparent 82%,#14110D55 100%);"></span>
      <!-- estrelas rosa sobre o olho -->
      <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:8%;top:12%;width:clamp(48px,6vw,78px);animation:starspin2 22s linear infinite;opacity:.95;">
      <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:10%;bottom:14%;width:clamp(36px,4.4vw,56px);animation:starspin 30s linear infinite;opacity:.9;">
    </div>
    <div class="w3-dgrid w3-pad" style="position:relative;max-width:1240px;margin:0 auto;padding:62px 28px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:40px;align-items:center;">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:14px;">
          <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="width:15px;height:15px;animation:starspin 24s linear infinite;"> Por que a Kaleidos
        </div>
        <h2 style="font-family:Atelier,sans-serif;font-style:italic;font-weight:700;font-size:clamp(36px,5vw,62px);line-height:.98;letter-spacing:-1.5px;margin:0 0 12px;color:#7CF067;text-shadow:0 1px 0 rgba(0,0,0,.4);">Valores &amp; visões</h2>
        <p style="font-size:16px;line-height:1.5;color:#b8b1a6;max-width:430px;margin:0 0 26px;">A gente vê o que o mercado não vê. É o olhar cripto-nativo aplicado em cada peça.</p>
        <div style="display:flex;flex-direction:column;gap:12px;max-width:480px;">
          <div style="display:flex;gap:15px;align-items:flex-start;background:#1d1812;border:1.5px solid #3a332a;border-radius:13px;padding:15px 18px;box-shadow:4px 4px 0 #7CF067;">
            <span style="font-family:Atelier;font-weight:800;font-size:24px;line-height:1;color:#7CF067;-webkit-text-stroke:1px #14110D;flex-shrink:0;">01</span>
            <div><h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:18px;margin:0 0 3px;color:#FAFAFA;">Cripto-nativos de verdade</h3><p style="font-size:13.5px;line-height:1.45;color:#9a9186;margin:0;">No mercado todo dia. Sem buzzword vazia, sem traduzir errado o que o seu projeto faz.</p></div>
          </div>
          <div style="display:flex;gap:15px;align-items:flex-start;background:#1d1812;border:1.5px solid #3a332a;border-radius:13px;padding:15px 18px;box-shadow:4px 4px 0 #D262B2;">
            <span style="font-family:Atelier;font-weight:800;font-size:24px;line-height:1;color:#D262B2;-webkit-text-stroke:1px #14110D;flex-shrink:0;">02</span>
            <div><h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:18px;margin:0 0 3px;color:#FAFAFA;">Criatividade com tese</h3><p style="font-size:13.5px;line-height:1.45;color:#9a9186;margin:0;">Bonito de ver, fácil de medir. Estética e estratégia na mesma peça.</p></div>
          </div>
          <div style="display:flex;gap:15px;align-items:flex-start;background:#1d1812;border:1.5px solid #3a332a;border-radius:13px;padding:15px 18px;box-shadow:4px 4px 0 #D262B2;">
            <span style="font-family:Atelier;font-weight:800;font-size:24px;line-height:1;color:#D262B2;-webkit-text-stroke:1px #14110D;flex-shrink:0;">03</span>
            <div><h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:18px;margin:0 0 3px;color:#FAFAFA;">Velocidade de timeline</h3><p style="font-size:13.5px;line-height:1.45;color:#9a9186;margin:0;">O mercado cripto não espera. Publicamos no ritmo da narrativa, não do calendário.</p></div>
          </div>
        </div>
      </div>
      <!-- coluna vazia: reservada pro olho que sangra atrás -->
      <div aria-hidden="true"></div>
    </div>
  </section>
`;

const PROCESSO_HTML = `
<section id="processo" style="position:relative;background:#FAFAFA;overflow:hidden;">
    <div class="w3-proc-deco" style="position:absolute;inset:0;pointer-events:none;">
      <img src="/v2/collage/hand-cursor.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:1%;top:7%;width:300px;mix-blend-mode:multiply;opacity:.95;transform:rotate(-3deg);animation:floaty 9s ease-in-out infinite;">
    </div>
    <div class="w3-pad" style="position:relative;max-width:1240px;margin:0 auto;padding:80px 28px;">
      <div style="text-align:center;margin-bottom:54px;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Como funciona</div>
        <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(34px,4.6vw,60px);line-height:.98;letter-spacing:-1.5px;margin:0;">Do briefing à distribuição<br>em 3 movimentos.</h2>
      </div>
      <div class="w3-procgrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:32px 28px;box-shadow:6px 6px 0 #7CF067;transform:rotate(-1.5deg);">
          <div style="font-family:Atelier;font-weight:800;font-size:54px;line-height:1;color:#7CF067;-webkit-text-stroke:1.5px #14110D;">1</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:24px;margin:14px 0 8px;">Diagnóstico</h3>
          <p style="font-size:14.5px;line-height:1.55;color:#6b6258;margin:0;">A gente mergulha no seu projeto, mercado e concorrência. Sai com tese e plano claro.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:32px 28px;box-shadow:6px 6px 0 #D262B2;transform:rotate(1.5deg);">
          <div style="font-family:Atelier;font-weight:800;font-size:54px;line-height:1;color:#D262B2;-webkit-text-stroke:1.5px #14110D;">2</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:24px;margin:14px 0 8px;">Criação</h3>
          <p style="font-size:14.5px;line-height:1.55;color:#6b6258;margin:0;">Narrativa, conteúdo e identidade. Produção no ritmo da timeline, com curadoria fina.</p>
        </div>
        <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:32px 28px;box-shadow:6px 6px 0 #D262B2;transform:rotate(-1deg);">
          <div style="font-family:Atelier;font-weight:800;font-size:54px;line-height:1;color:#D262B2;-webkit-text-stroke:1.5px #14110D;">3</div>
          <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:24px;margin:14px 0 8px;">Distribuição</h3>
          <p style="font-size:14.5px;line-height:1.55;color:#6b6258;margin:0;">Publicação, comunidade e KOLs. Medição constante pra dobrar no que funciona.</p>
        </div>
      </div>
    </div>
  </section>
`;

export function Web3V2Hero() {
  return <div dangerouslySetInnerHTML={{ __html: HERO_HTML }} />;
}
export function Web3V2Manifesto() {
  return <div dangerouslySetInnerHTML={{ __html: MANIFESTO_HTML }} />;
}
export function Web3V2Problema() {
  return <div dangerouslySetInnerHTML={{ __html: PROBLEMA_HTML }} />;
}
export function Web3V2Diferenciais() {
  return <div dangerouslySetInnerHTML={{ __html: DIFERENCIAIS_HTML }} />;
}
export function Web3V2Processo() {
  return <div dangerouslySetInnerHTML={{ __html: PROCESSO_HTML }} />;
}
