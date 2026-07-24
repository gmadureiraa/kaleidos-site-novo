import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Web3V2Defs } from "@/components/web3v2/sections";
import { Web3V2ClientsMarquee } from "@/components/web3v2/clients-marquee";
import { FooterDemo } from "@/components/ui/footer-demo";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-helpers";

/**
 * /marca-pessoal — Founder-Led Growth (marca pessoal para founders e C-levels).
 *
 * Página standalone no estilo web3v2 (.kv2): fundo #FAFAFA alternando com dark
 * #14110D, rosa #D262B2, verde #7CF067 no highlight de headline, Atelier
 * (display) / Inter (corpo) / Gridlite (eyebrows), botões .cta-btn neo-brutal.
 *
 * REGRAS DE DADO (paper 2026-07-24, vault/015 - BRANDING E GROWTH):
 * - Todo stat de terceiro tem fonte visível (Weber Shandwick 2015, Edelman-
 *   LinkedIn 2024, Refine Labs, LinkedIn, Digital Applied).
 * - Métricas de case vêm SÓ de src/lib/case-data.ts (Investidor 4.20, Layla
 *   Foz, Defiverso, NeoBankless, DSEC). Nunca inventar número.
 * - Sem preço literal na página (tiers por nome + call de qualificação).
 * - Voz institucional "a Kaleidos", PT-BR, sem travessão no corpo.
 */

const CANONICAL = "/marca-pessoal";
const TITLE = "Marca Pessoal para Founders | Founder-Led Growth — Kaleidos";
const DESC =
  "A Kaleidos transforma a expertise do founder em autoridade, e autoridade em pipeline. Founder-led growth com método, cadência e medição: você grava, a gente faz o resto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: CANONICAL,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

// Highlight verde de headline (padrão web3v2): faixa de 40% atrás da palavra.
const HL =
  "background:linear-gradient(#7CF067,#7CF067) center/100% 40% no-repeat;box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px;";

const WA_AUDIT =
  "https://wa.me/5512997796835?text=" +
  encodeURIComponent(
    "Oi! Quero a auditoria gratuita do meu perfil (marca pessoal de founder)."
  );

// CSS escopado da página (grids responsivos + tabela com scroll próprio).
const MP_STYLE = `
.kv2 .mp-pad{padding-left:28px;padding-right:28px;}
.kv2 .mp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
.kv2 .mp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.kv2 .mp-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.kv2 .mp-grid6{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.kv2 .mp-stats{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;}
.kv2 .mp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
.kv2 .mp-table{width:100%;min-width:560px;border-collapse:separate;border-spacing:0;}
.kv2 details.mp-faq summary::-webkit-details-marker{display:none;}
.kv2 details.mp-faq summary{cursor:pointer;list-style:none;}
.kv2 details.mp-faq[open] .mp-faq-plus{transform:rotate(45deg);}
.kv2 .mp-faq-plus{transition:transform .2s ease;display:inline-block;}
@media(max-width:980px){
  .kv2 .mp-grid4{grid-template-columns:repeat(2,1fr);}
  .kv2 .mp-grid3{grid-template-columns:1fr;}
  .kv2 .mp-grid6{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:760px){
  .kv2 .mp-grid2{grid-template-columns:1fr;gap:20px;}
  .kv2 .mp-hero-deco{display:none;}
}
@media(max-width:560px){
  .kv2 .mp-grid4{grid-template-columns:1fr;}
  .kv2 .mp-grid6{grid-template-columns:1fr;}
  .kv2 .mp-pad{padding-left:20px;padding-right:20px;}
}
`;

/* ────────────────────────── S1 · HERO (dark) ────────────────────────── */
const HERO_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-hero-deco" style="position:absolute;inset:0;pointer-events:none;">
    <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:5%;top:14%;width:clamp(56px,7vw,92px);animation:starspin 26s linear infinite;opacity:.9;">
    <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:6%;top:18%;width:clamp(44px,6vw,72px);animation:starspin2 20s linear infinite;opacity:.85;">
    <img src="/v2/collage/sticker-tothemoon.png" alt="" loading="lazy" decoding="async" style="position:absolute;right:3%;bottom:10%;width:clamp(96px,11vw,160px);filter:drop-shadow(3px 5px 7px rgba(0,0,0,.4));transform:rotate(6deg);animation:floaty 8s ease-in-out infinite;">
    <img src="/v2/collage/brain-glasses.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:3%;bottom:8%;width:clamp(88px,9vw,132px);transform:rotate(-8deg);animation:floaty2 9s ease-in-out infinite;opacity:.85;filter:invert(1) contrast(1.05);">
  </div>
  <div class="mp-pad" style="position:relative;max-width:1000px;margin:0 auto;padding-top:92px;padding-bottom:84px;text-align:center;">
    <div style="display:inline-flex;align-items:center;gap:9px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#7CF067;border:1.5px solid #3a332a;border-radius:999px;padding:8px 18px;background:#1d1812;box-shadow:3px 3px 0 #D262B2;margin-bottom:28px;">&#9679; FOUNDER-LED GROWTH</div>
    <h1 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(32px,4.6vw,58px);line-height:1.05;letter-spacing:-1.5px;margin:0 auto;max-width:860px;">Transformamos sua expertise em autoridade. E autoridade em <span style="${HL}color:#14110D;">pipeline</span>.</h1>
    <p style="font-size:clamp(17px,2vw,20px);line-height:1.6;color:#b8b1a6;max-width:640px;margin:26px auto 0;">A marca pessoal do fundador virou o maior ativo de crescimento da empresa. A Kaleidos constrói a sua com método, cadência e medição. Você dá a cara. A gente faz o resto.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;align-items:center;margin-top:38px;">
      <a href="/agendar" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:17px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">Ver se faz sentido &rarr;</a>
      <a href="${WA_AUDIT}" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:transparent;color:#FAFAFA;font-weight:700;font-size:16px;padding:15px 26px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Auditar meu perfil de graça</a>
    </div>
    <div style="max-width:560px;margin:44px auto 0;background:#1d1812;border:1.5px solid #3a332a;border-radius:14px;padding:18px 22px;box-shadow:4px 4px 0 #7CF067;">
      <p style="font-size:16px;line-height:1.5;color:#FAFAFA;margin:0;font-weight:600;">Perfis pessoais recebem ~65% do feed do LinkedIn. Páginas de empresa, ~5%.</p>
      <p style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:1.5px;color:#9a9186;margin:8px 0 0;text-transform:uppercase;">Fonte: Digital Applied (compilação de agência, 2026)</p>
    </div>
  </div>
</section>
`;

/* ─────────────── S2 · PROVA AGREGADA + CONGRUÊNCIA (claro) ─────────────── */
// Números: agregados canônicos do site (+125M views / 30+ projetos) e métricas
// reais de case-data.ts (Investidor 4.20: 5x faturamento; Layla Foz: 20M+ views).
const PROVA_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:72px;padding-bottom:72px;">
    <div class="mp-stats">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 28px;box-shadow:5px 5px 0 #7CF067;text-align:center;min-width:200px;transform:rotate(-1deg);">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(30px,3.4vw,42px);line-height:1;color:#14110D;">+125M</div>
        <div style="font-size:13.5px;color:#6b6258;margin-top:8px;">de views gerados para clientes</div>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 28px;box-shadow:5px 5px 0 #D262B2;text-align:center;min-width:200px;transform:rotate(1deg);">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(30px,3.4vw,42px);line-height:1;color:#14110D;">5x</div>
        <div style="font-size:13.5px;color:#6b6258;margin-top:8px;">faturamento no nosso maior case founder-led</div>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 28px;box-shadow:5px 5px 0 #7CF067;text-align:center;min-width:200px;transform:rotate(-1deg);">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(30px,3.4vw,42px);line-height:1;color:#14110D;">20M+</div>
        <div style="font-size:13.5px;color:#6b6258;margin-top:8px;">views nos reels de uma única criadora</div>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:22px 28px;box-shadow:5px 5px 0 #D262B2;text-align:center;min-width:200px;transform:rotate(1deg);">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(30px,3.4vw,42px);line-height:1;color:#14110D;">30+</div>
        <div style="font-size:13.5px;color:#6b6258;margin-top:8px;">projetos entregues desde 2019</div>
      </div>
    </div>
    <div style="max-width:820px;margin:56px auto 0;text-align:center;">
      <p style="font-family:'Inter',sans-serif;font-weight:500;font-size:clamp(22px,2.8vw,34px);line-height:1.3;letter-spacing:-.5px;color:#14110D;margin:0;">A gente não só vende founder-led. A gente <span style="${HL}font-weight:800;">É</span> founder-led.</p>
      <p style="font-size:16px;line-height:1.6;color:#6b6258;max-width:600px;margin:18px auto 0;">O fundador da Kaleidos, Gabriel Madureira (@ogmadureira), aplica em si mesmo o método que entrega para os clientes: tese, cadência nas três redes e medição. Quem vende marca pessoal de founder precisa ser a própria prova.</p>
    </div>
  </div>
</section>
`;

/* ────────────────────────── S3 · PROBLEMA (dark) ────────────────────────── */
const PROBLEMA_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;border-top:2px solid #14110D;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1100px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    <div style="text-align:center;max-width:780px;margin:0 auto;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:18px;">O problema</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1.02;letter-spacing:-1px;margin:0;">O mercado já pesquisou seu nome. <span style="color:#7CF067;">O que encontrou?</span></h2>
      <p style="font-size:18px;line-height:1.6;color:#b8b1a6;max-width:600px;margin:22px auto 0;">O comprador te pesquisa antes de falar com você. Se ele não te acha, acha seu concorrente. E não é só o comprador olhando.</p>
    </div>
    <div class="mp-grid3" style="margin-top:44px;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:14px;padding:24px 22px;box-shadow:4px 4px 0 #7CF067;">
        <div style="font-size:26px;line-height:1;">🤝</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;margin:12px 0 6px;color:#FAFAFA;">O cliente</h3>
        <p style="font-size:14px;line-height:1.55;color:#9a9186;margin:0;">Antes de assinar contrato, ele abre seu LinkedIn e seu Instagram. Perfil parado passa a mensagem errada sobre a empresa inteira.</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:14px;padding:24px 22px;box-shadow:4px 4px 0 #D262B2;">
        <div style="font-size:26px;line-height:1;">💼</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;margin:12px 0 6px;color:#FAFAFA;">O investidor</h3>
        <p style="font-size:14px;line-height:1.55;color:#9a9186;margin:0;">Ele avalia o founder tanto quanto o negócio. Uma tese pública bem construída encurta qualquer due diligence de confiança.</p>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:14px;padding:24px 22px;box-shadow:4px 4px 0 #7CF067;">
        <div style="font-size:26px;line-height:1;">🚀</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:19px;margin:12px 0 6px;color:#FAFAFA;">O talento</h3>
        <p style="font-size:14px;line-height:1.55;color:#9a9186;margin:0;">Os melhores profissionais escolhem trabalhar com líderes que admiram. Sua presença pública é o primeiro pitch de recrutamento.</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:44px;">
      <p style="font-family:'Inter',sans-serif;font-weight:600;font-size:clamp(19px,2.4vw,26px);line-height:1.35;color:#FAFAFA;margin:0;">Você não tem tempo pra virar creator. <span style="color:#7CF067;">Ainda bem que não precisa.</span></p>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S4 · OS DADOS (claro) ─────────────────────── */
// Stats de terceiros com fonte visível. Números e fontes conferidos no paper
// PAPER-marca-pessoal-founders-2026-07-24 (todos com URL primária lá).
const DADOS_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    <div style="text-align:center;margin-bottom:48px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Os dados</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1;letter-spacing:-1px;margin:0;color:#14110D;">Não é tendência.<br>É <span style="${HL}">matemática de distribuição</span>.</h2>
    </div>
    <div class="mp-grid4">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#14110D;">45%</div>
        <p style="font-size:14px;line-height:1.5;color:#4a443c;margin:12px 0 0;flex:1;">da reputação da empresa (e 44% do valor de mercado percebido) são atribuídos pela liderança à reputação do CEO.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Weber Shandwick (estudo de 2015)</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#14110D;">73%</div>
        <p style="font-size:14px;line-height:1.5;color:#4a443c;margin:12px 0 0;flex:1;">dos decisores B2B dizem que thought leadership é base mais confiável pra avaliar um fornecedor do que material de marketing.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Edelman-LinkedIn (2024)</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#14110D;">2,75x</div>
        <p style="font-size:14px;line-height:1.5;color:#4a443c;margin:12px 0 0;flex:1;">mais impressões no perfil pessoal do que na página da empresa, publicando o mesmo conteúdo.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">Refine Labs (experimento de agência)</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:26px 22px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:40px;line-height:1;color:#14110D;">78%</div>
        <p style="font-size:14px;line-height:1.5;color:#4a443c;margin:12px 0 0;flex:1;">dos social sellers vendem mais que os pares que não usam redes sociais no processo comercial.</p>
        <p style="font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1px;color:#8a8175;margin:14px 0 0;text-transform:uppercase;">LinkedIn Sales Solutions</p>
      </div>
    </div>
    <p style="text-align:center;font-size:14px;color:#6b6258;margin:32px auto 0;max-width:520px;">Todo dado aqui tem fonte. É assim que a gente trabalha: número com origem, não frase de vendedor.</p>
  </div>
</section>
`;

/* ─────────────────────── S5 · O QUE FAZEMOS (dark) ─────────────────────── */
const FAZEMOS_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    <div style="text-align:center;margin-bottom:48px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">O que fazemos</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1.02;letter-spacing:-1px;margin:0;">Você grava. A Kaleidos dirige, escreve,<br>desenha, edita, publica e <span style="color:#7CF067;">mede</span>.</h2>
    </div>
    <div class="mp-grid2" style="max-width:900px;margin:0 auto;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #7CF067;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#7CF067;margin-bottom:16px;">Você</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Grava os reels (a gente dirige e roteiriza)</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publica stories do dia a dia com direção nossa</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Responde as DMs que viram conversa de negócio</li>
          <li style="padding:7px 0;">Dá a cara. É a única coisa que não dá pra terceirizar</li>
        </ul>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 26px;box-shadow:5px 5px 0 #D262B2;">
        <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Kaleidos</div>
        <ul style="list-style:none;margin:0;padding:0;font-size:15px;line-height:1.6;color:#d8d1c6;">
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Estratégia, tese e calendário editorial aprovado</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Roteiro, copy, design e edição de tudo</li>
          <li style="padding:7px 0;border-bottom:1px solid #2a241d;">Publicação nas três redes + prospecção de podcast</li>
          <li style="padding:7px 0;">Relatório mensal e reunião de leitura dos números</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin:44px 0;">
      <span style="display:inline-block;background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:12px;padding:14px 26px;font-weight:800;font-size:clamp(17px,2.2vw,22px);box-shadow:5px 5px 0 #D262B2;transform:rotate(-1deg);">~2 horas do seu tempo por mês. O resto é com a gente.</span>
    </div>
    <div class="mp-grid6" style="max-width:1000px;margin:0 auto;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">🎠</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Carrossel Instagram</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">A peça-mãe: autoridade e salvamento</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">🎬</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Reels</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Aquisição e alcance de topo de funil</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">🧵</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Thread no X</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Repurpose sem produção dobrada</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">💼</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Post LinkedIn</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Thought leadership pro decisor B2B</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">🎙️</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Podcast como convidado</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Prospecção, agendamento e cortes</div></div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:12px;padding:18px;"><div style="font-size:22px;">📊</div><div style="font-weight:700;font-size:15px;margin-top:8px;">Relatório mensal</div><div style="font-size:13px;color:#9a9186;margin-top:4px;">Leitura junto: dobrar no que cresce</div></div>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S6 · O MÉTODO (claro) ─────────────────────── */
const METODO_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    <div style="text-align:center;margin-bottom:48px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">O método</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1;letter-spacing:-1px;margin:0;color:#14110D;">Tese &rarr; Cadência &rarr; <span style="${HL}">Pipeline</span></h2>
      <p style="font-size:16px;line-height:1.6;color:#6b6258;max-width:560px;margin:18px auto 0;">Quatro fases com horizonte definido. Marca pessoal sem método é sorte. Com método, é sistema.</p>
    </div>
    <div class="mp-grid4">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #7CF067;transform:rotate(-1deg);">
        <div style="font-family:Atelier;font-weight:800;font-size:44px;line-height:1;color:#7CF067;-webkit-text-stroke:1.5px #14110D;">1</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:21px;margin:12px 0 6px;color:#14110D;">Fundação</h3>
        <p style="font-size:13.5px;line-height:1.55;color:#6b6258;margin:0;">Imersão na sua história, tese e bandeira pessoal. Auditoria dos 3 perfis (Instagram, X, LinkedIn), pilares de conteúdo ponderados e bio-manifesto.</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #D262B2;transform:rotate(1deg);">
        <div style="font-family:Atelier;font-weight:800;font-size:44px;line-height:1;color:#D262B2;-webkit-text-stroke:1.5px #14110D;">2</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:21px;margin:12px 0 6px;color:#14110D;">Cadência</h3>
        <p style="font-size:13.5px;line-height:1.55;color:#6b6258;margin:0;">Um conteúdo vira três redes: carrossel, reel, thread no X e post no LinkedIn, num calendário aprovado antes de produzir. Ritmo previsível, sem produção dobrada.</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #7CF067;transform:rotate(-1deg);">
        <div style="font-family:Atelier;font-weight:800;font-size:44px;line-height:1;color:#7CF067;-webkit-text-stroke:1.5px #14110D;">3</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:21px;margin:12px 0 6px;color:#14110D;">Tração</h3>
        <p style="font-size:13.5px;line-height:1.55;color:#6b6258;margin:0;">Horizonte de mês 3: engajamento acima de 3%, formatos calibrados pelos números e os primeiros leads chegando pelo perfil.</p>
      </div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:18px;padding:28px 24px;box-shadow:6px 6px 0 #D262B2;transform:rotate(1deg);">
        <div style="font-family:Atelier;font-weight:800;font-size:44px;line-height:1;color:#D262B2;-webkit-text-stroke:1.5px #14110D;">4</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:21px;margin:12px 0 6px;color:#14110D;">Autoridade</h3>
        <p style="font-size:13.5px;line-height:1.55;color:#6b6258;margin:0;">Horizonte de mês 6: convites orgânicos, presença em podcasts e pipeline atribuível ao perfil. Relatório trimestral e roadmap de escala.</p>
      </div>
    </div>
    <div style="max-width:900px;margin:48px auto 0;background:#fff;border:1.5px solid #14110D;border-radius:16px;padding:24px 26px;box-shadow:5px 5px 0 #7CF067;">
      <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D262B2;margin-bottom:14px;">Semana-tipo de um founder Kaleidos</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">seg · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">ter · stories</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qua · carrossel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">qui · stories + thread</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sex · reel</span>
        <span style="background:#FAFAFA;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;color:#14110D;">sáb · carrossel</span>
        <span style="background:#7CF067;border:1.5px solid #14110D;border-radius:10px;padding:9px 14px;font-size:13px;font-weight:700;color:#06250a;">1x/mês · podcast</span>
      </div>
    </div>
    <div class="mp-grid4" style="margin-top:32px;">
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;"><div style="font-weight:800;font-size:15px;color:#14110D;">Bio com resultado</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Uma tese, não um cargo. Bandeira pessoal, não currículo.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;"><div style="font-weight:800;font-size:15px;color:#14110D;">Volume é rei</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Cadência alta e previsível vence perfeição esporádica.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;"><div style="font-weight:800;font-size:15px;color:#14110D;">Reels + carrosséis</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Reel adquire, carrossel constrói autoridade e salvamento.</div></div>
      <div style="background:#fff;border:1.5px solid #14110D;border-radius:12px;padding:18px;"><div style="font-weight:800;font-size:15px;color:#14110D;">Autenticidade real</div><div style="font-size:13px;color:#6b6258;margin-top:5px;">Bastidor, opinião e história. Nada de roteiro de robô.</div></div>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S7 · PROVA / CASES (dark) ─────────────────────── */
// Métricas 100% de src/lib/case-data.ts:
// investidor-4-20: 5x faturamento, IG 50k→180k (+260%), YT 200k→382k (+91%), news 30k/35%.
// layla-foz: 100k→172k (+72%), 20M+ views nos reels.
// defiverso: 12M views orgânicos em 90 dias, +8,6k seguidores em 3 meses.
// neobankless: reel manifesto 112 curtidas + 20 comentários (maior engajamento do perfil).
// dsec: 2 artigos/semana no LinkedIn + newsletter semanal + mini-curso de 5 dias.
const CASES_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.4;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.4px);background-size:20px 20px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    <div style="text-align:center;margin-bottom:48px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Prova</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1.02;letter-spacing:-1px;margin:0;">Antes e depois, <span style="color:#7CF067;">com número</span>.</h2>
      <p style="font-size:16px;line-height:1.6;color:#b8b1a6;max-width:560px;margin:18px auto 0;">Página de marca pessoal sem métrica é ironia. As nossas vêm dos cases publicados, com fonte interna auditável.</p>
    </div>
    <div class="mp-grid3">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Lucas Amendola · Investidor 4.20</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">50k &rarr; 180k <span style="font-size:16px;color:#9a9186;font-weight:400;">no Instagram</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">YouTube de 200k pra 382k inscritos. Newsletter construída do zero até 30 mil inscritos com 35% de abertura. E o número que importa: faturamento 5x maior desde a nossa entrada.</p>
        <a href="/cases/investidor-4-20" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #D262B2;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Layla Foz · criadora</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">100k &rarr; 172k <span style="font-size:16px;color:#9a9186;font-weight:400;">seguidores</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">Mais de 20 milhões de views nos reels mantendo a profundidade intelectual do conteúdo. Crescimento de 72% na base sem descaracterizar a voz da criadora.</p>
        <a href="/cases/layla-foz" style="margin-top:16px;font-size:14px;font-weight:700;color:#D262B2;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:16px;padding:28px 24px;box-shadow:5px 5px 0 #7CF067;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">Defiverso · audiência própria</div>
        <div style="font-family:Atelier,sans-serif;font-weight:800;font-size:clamp(26px,2.8vw,34px);line-height:1.1;margin:14px 0 4px;color:#FAFAFA;">12M views <span style="font-size:16px;color:#9a9186;font-weight:400;">orgânicos em 90 dias</span></div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;flex:1;">8,6 mil novos seguidores em 3 meses no Instagram e newsletter com 26.554 assinantes ativos e 33% de taxa de abertura, muito acima da média de mercado.</p>
        <a href="/cases/defiverso" style="margin-top:16px;font-size:14px;font-weight:700;color:#7CF067;text-decoration:underline;text-underline-offset:3px;">Ver o case completo &rarr;</a>
      </div>
    </div>
    <div class="mp-grid2" style="margin-top:28px;max-width:1000px;margin-left:auto;margin-right:auto;">
      <div style="background:#1d1812;border:1.5px dashed #3a332a;border-radius:14px;padding:22px 24px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Em construção · Matheus Fassheber (NeoBankless)</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Operação founder-brand em curso: carrosséis educativos puxando o engajamento mais qualificado do perfil e o reel de manifesto como peça de maior engajamento (112 curtidas e 20 comentários numa base recém-criada). <a href="/cases/neobankless" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Ver case</a></p>
      </div>
      <div style="background:#1d1812;border:1.5px dashed #3a332a;border-radius:14px;padding:22px 24px;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Em construção · sócios da DSEC Labs</div>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:10px 0 0;">Autoridade em segurança Bitcoin em três frentes simultâneas: 2 artigos de thought leadership por semana no LinkedIn, newsletter semanal e mini-curso de 5 dias, com pauta integrada. <a href="/cases/dsec" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Ver case</a></p>
      </div>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S8 · COMPARATIVO (claro) ─────────────────────── */
const COMPARATIVO_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;">
  <div class="mp-pad" style="position:relative;max-width:1000px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    <div style="text-align:center;margin-bottom:40px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">Comparativo</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1;letter-spacing:-1px;margin:0;color:#14110D;">Marca pessoal genérica<br>vs <span style="${HL}">método Kaleidos</span></h2>
    </div>
    <div class="mp-table-wrap" style="background:#fff;border:1.5px solid #14110D;border-radius:16px;box-shadow:6px 6px 0 #7CF067;">
      <table class="mp-table">
        <thead>
          <tr>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;border-bottom:1.5px solid #14110D;width:26%;"> </th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;border-bottom:1.5px solid #14110D;">Agência genérica</th>
            <th style="text-align:left;padding:16px 20px;font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#14110D;border-bottom:1.5px solid #14110D;background:#7CF06722;">Kaleidos</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;line-height:1.5;color:#4a443c;">
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Ponto de partida</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Posta o que está na moda</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Tese única do founder, definida antes do primeiro post</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Voz</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Genérica, de qualquer nicho</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Imersão na sua história: bastidor, opinião, bordão</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Cadência</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Quando dá, onde dá</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Um conteúdo vira três redes, em calendário aprovado</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Medição</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Posta e reza</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">Relatório mensal, horizontes M1/M3/M6 e roadmap</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;border-bottom:1px solid #e8e2d8;">Produção</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;">Ou lenta, ou robótica</td>
            <td style="padding:14px 20px;border-bottom:1px solid #e8e2d8;background:#7CF06711;font-weight:600;">IA pra velocidade, humano pra substância</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;color:#14110D;">Prova</td>
            <td style="padding:14px 20px;">Depoimento sem número</td>
            <td style="padding:14px 20px;background:#7CF06711;font-weight:600;">Cases com métrica e fonte, e o próprio founder como case</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S9 · OFERTA (dark) ─────────────────────── */
// Sem preço literal (decisão do paper): tiers por nome + call de qualificação.
const OFERTA_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <div class="mp-pad" style="position:relative;max-width:1240px;margin:0 auto;padding-top:88px;padding-bottom:88px;">
    <div style="text-align:center;margin-bottom:48px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">A oferta</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,52px);line-height:1.02;letter-spacing:-1px;margin:0;">Três formas de começar.<br>Uma <span style="color:#7CF067;">conversa honesta</span> primeiro.</h2>
    </div>
    <div class="mp-grid3" style="max-width:1080px;margin:0 auto;align-items:stretch;">
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9186;">Porta de entrada</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Fundação</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">Tese, auditoria dos perfis e produção das peças-mãe. Você publica, a gente produz e orienta.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Tese e bio-manifesto</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Carrosséis mensais + repurpose X e LinkedIn</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Calendário editorial aprovado</li>
          <li style="padding:6px 0;">Publicação por sua conta</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Conversar sobre o Fundação</a>
      </div>
      <div style="background:#1d1812;border:2px solid #7CF067;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;box-shadow:6px 6px 0 #7CF067;position:relative;">
        <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#7CF067;color:#06250a;border:1.5px solid #14110D;border-radius:999px;padding:5px 14px;font-family:Gridlite,monospace;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;">done-for-you</span>
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7CF067;">O carro-chefe</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Founder Brand</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">Cadência cheia nas três redes com a Kaleidos operando tudo. Você entra com ~2 horas por mês.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Reels + carrosséis + threads + LinkedIn</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Publicação e direção de stories pela Kaleidos</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">1 podcast como convidado por mês, com cortes</li>
          <li style="padding:6px 0;">Relatório mensal + reunião de leitura</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:#7CF067;color:#06250a;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:4px 4px 0 #D262B2;text-decoration:none;">Ver se faz sentido &rarr;</a>
      </div>
      <div style="background:#1d1812;border:1.5px solid #3a332a;border-radius:18px;padding:30px 26px;display:flex;flex-direction:column;">
        <div style="font-family:Gridlite,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D262B2;">Por aplicação</div>
        <h3 style="font-family:Atelier,sans-serif;font-weight:700;font-size:26px;margin:12px 0 8px;color:#FAFAFA;">Founder OS</h3>
        <p style="font-size:14px;line-height:1.6;color:#b8b1a6;margin:0 0 18px;">O sistema completo de autoridade pra quem já validou o jogo e quer escalar o ativo.</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:13.5px;line-height:1.6;color:#d8d1c6;flex:1;">
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Tudo do Founder Brand</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Podcast recorrente + newsletter própria</li>
          <li style="padding:6px 0;border-bottom:1px solid #2a241d;">Ghostwriting de artigos longos e livro</li>
          <li style="padding:6px 0;">Gestão de crescimento com roadmap dedicado</li>
        </ul>
        <a href="/agendar" class="cta-btn" style="margin-top:22px;display:inline-flex;justify-content:center;background:transparent;color:#FAFAFA;font-weight:700;font-size:15px;padding:13px 22px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Aplicar para o Founder OS</a>
      </div>
    </div>
    <div style="text-align:center;margin-top:36px;">
      <p style="font-size:14.5px;color:#9a9186;margin:0;">Contrato mínimo 3 meses. Conversa honesta primeiro: se não fizer sentido, a gente fala.</p>
      <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:22px;font-family:Gridlite,monospace;font-size:12px;letter-spacing:1.5px;text-transform:lowercase;color:#b8b1a6;">
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">post</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">carrossel</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">podcast</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #3a332a;border-radius:999px;padding:7px 14px;background:#1d1812;">newsletter</span><span style="color:#7CF067;">&rarr;</span>
        <span style="border:1.5px solid #7CF067;border-radius:999px;padding:7px 14px;background:#1d1812;color:#7CF067;">livro</span>
      </div>
      <p style="font-size:12.5px;color:#6b6258;margin:10px 0 0;">A escada do ativo de autoridade: cada degrau vira insumo do próximo.</p>
    </div>
  </div>
</section>
`;

/* ─────────────────────── S10 · FAQ (claro) ─────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Não tenho tempo pra isso.",
    a: "Por isso o modelo existe. Você entra com cerca de 2 horas por mês: gravação dirigida em bloco e uma reunião de leitura. Estratégia, roteiro, design, edição, publicação e relatório são da Kaleidos.",
  },
  {
    q: "Não quero parecer autopromocional.",
    a: "Autoridade não é falar de si, é falar do que você sabe. A tese define pilares de conteúdo úteis pro seu mercado: educação, bastidor e opinião. Quem vende o tempo todo afasta; quem ensina, atrai.",
  },
  {
    q: "Não sei o que postar.",
    a: "Você não precisa saber. A fase de Fundação extrai da sua história a tese e os pilares ponderados, e o calendário editorial chega pronto pra sua aprovação todo mês. Sua parte é aprovar e gravar.",
  },
  {
    q: "Vai soar como robô escrevendo por mim?",
    a: "Não. Usamos IA pra velocidade de produção, mas a voz vem de imersão real: entrevistas com você, seu vocabulário, suas histórias. Se não parecer você lendo em voz alta, a peça volta pra mesa.",
  },
  {
    q: "Quanto tempo até dar resultado?",
    a: "Trabalhamos com horizontes claros: mês 1 é fundação (tese, perfis, primeiras publicações), mês 3 é tração (engajamento acima de 3% e primeiros leads via perfil) e mês 6 é autoridade (convites orgânicos, podcasts e pipeline atribuível). Quem promete viral em 2 semanas está vendendo loteria.",
  },
];

const FAQ_HTML = `
<section style="position:relative;background:#FAFAFA;overflow:hidden;background-image:linear-gradient(#14110D0d 1px,transparent 1px),linear-gradient(90deg,#14110D0d 1px,transparent 1px);background-size:34px 34px;">
  <div class="mp-pad" style="position:relative;max-width:820px;margin:0 auto;padding-top:84px;padding-bottom:84px;">
    <div style="text-align:center;margin-bottom:40px;">
      <div style="font-family:Gridlite,monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#D262B2;margin-bottom:16px;">FAQ</div>
      <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.2vw,48px);line-height:1;letter-spacing:-1px;margin:0;color:#14110D;">As objeções que todo founder tem.<br><span style="${HL}">Respondidas.</span></h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${FAQ_ITEMS.map(
        (f) => `
      <details class="mp-faq" style="background:#fff;border:1.5px solid #14110D;border-radius:14px;box-shadow:4px 4px 0 #7CF067;">
        <summary style="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 22px;font-weight:700;font-size:16px;color:#14110D;">
          <span>${f.q}</span>
          <span class="mp-faq-plus" style="font-family:Atelier,sans-serif;font-size:22px;line-height:1;color:#D262B2;flex-shrink:0;">+</span>
        </summary>
        <p style="padding:0 22px 20px;font-size:15px;line-height:1.65;color:#4a443c;margin:0;">${f.a}</p>
      </details>`
      ).join("")}
    </div>
  </div>
</section>
`;

/* ─────────────────────── S11 · CTA FINAL (dark) ─────────────────────── */
const CTA_FINAL_HTML = `
<section style="position:relative;background:#14110D;color:#FAFAFA;overflow:hidden;">
  <div style="position:absolute;inset:0;opacity:.5;background-image:radial-gradient(#ffffff22 1.3px,transparent 1.5px);background-size:18px 18px;pointer-events:none;"></div>
  <img src="/v2/collage/star-green.webp" alt="" loading="lazy" decoding="async" style="position:absolute;left:6%;top:20%;width:clamp(48px,6vw,80px);animation:starspin 26s linear infinite;opacity:.85;pointer-events:none;">
  <img src="/v2/collage/star-pink.webp" alt="" loading="lazy" decoding="async" style="position:absolute;right:7%;bottom:18%;width:clamp(40px,5vw,64px);animation:starspin2 20s linear infinite;opacity:.8;pointer-events:none;">
  <div class="mp-pad" style="position:relative;max-width:840px;margin:0 auto;padding-top:96px;padding-bottom:96px;text-align:center;">
    <h2 style="font-family:Atelier,sans-serif;font-weight:700;font-size:clamp(30px,4.4vw,54px);line-height:1.05;letter-spacing:-1.2px;margin:0;">Sua expertise vira autoridade.<br>Sua autoridade vira <span style="${HL}color:#14110D;">pipeline</span>.</h2>
    <p style="font-size:17px;line-height:1.6;color:#b8b1a6;max-width:540px;margin:22px auto 0;">O mercado vai pesquisar seu nome de novo amanhã. A pergunta é o que ele vai encontrar daqui a 6 meses.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;align-items:center;margin-top:36px;">
      <a href="/agendar" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7CF067;color:#06250a;font-weight:700;font-size:17px;padding:16px 30px;border-radius:999px;box-shadow:5px 5px 0 #D262B2;text-decoration:none;">Ver se faz sentido &rarr;</a>
      <a href="${WA_AUDIT}" target="_blank" rel="noopener noreferrer" class="cta-btn" style="display:inline-flex;align-items:center;gap:9px;background:transparent;color:#FAFAFA;font-weight:700;font-size:16px;padding:15px 26px;border-radius:999px;border:1.5px solid #FAFAFA;text-decoration:none;">Auditar meu perfil de graça</a>
    </div>
    <p style="margin-top:16px;font-size:14px;color:#9a9186;">Prefere WhatsApp? <a href="https://wa.me/5512997796835" target="_blank" rel="noopener noreferrer" style="color:#FAFAFA;font-weight:700;text-decoration:underline;text-underline-offset:3px;">Fala com a gente por aqui &rarr;</a></p>
  </div>
</section>
`;

export default function MarcaPessoalPage() {
  const faqSchema = generateFAQSchema(
    FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Kaleidos", href: "/" },
    { label: "Marca Pessoal para Founders", href: CANONICAL },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main id="main-content" className="kv2 min-h-screen bg-white" role="main">
        {/* defs (SVG symbols) + keyframes/CSS escopado do estilo web3v2 */}
        <Web3V2Defs />
        <style dangerouslySetInnerHTML={{ __html: MP_STYLE }} />

        {/* S1 · Hero */}
        <div dangerouslySetInnerHTML={{ __html: HERO_HTML }} />

        {/* Marquee de logos de clientes (prova social imediata) */}
        <Web3V2ClientsMarquee />

        {/* S2 · Prova agregada + congruência */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: PROVA_HTML }} />
        </Reveal>

        {/* S3 · Problema */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: PROBLEMA_HTML }} />
        </Reveal>

        {/* S4 · Os dados (com fonte) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: DADOS_HTML }} />
        </Reveal>

        {/* S5 · O que fazemos */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAZEMOS_HTML }} />
        </Reveal>

        {/* S6 · O método */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: METODO_HTML }} />
        </Reveal>

        {/* S7 · Prova / cases (métricas de case-data.ts) */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: CASES_HTML }} />
        </Reveal>

        {/* S8 · Comparativo */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: COMPARATIVO_HTML }} />
        </Reveal>

        {/* S9 · Oferta */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: OFERTA_HTML }} />
        </Reveal>

        {/* S10 · FAQ */}
        <Reveal>
          <div dangerouslySetInnerHTML={{ __html: FAQ_HTML }} />
        </Reveal>

        {/* S11 · CTA final */}
        <div dangerouslySetInnerHTML={{ __html: CTA_FINAL_HTML }} />

        {/* Footer (WhatsApp flutuante já vem do layout raiz) */}
        <Reveal>
          <FooterDemo />
        </Reveal>
      </main>
    </>
  );
}
