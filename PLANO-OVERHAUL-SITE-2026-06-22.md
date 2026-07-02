# PLANO DE OVERHAUL — Site Kaleidos (/2 + Sobre + Serviços + Menu)
Data: 2026-06-22 · Escopo: rota `/2`, página Sobre, todas as páginas de Serviços, dropdown do header.
**Tudo LOCAL (sem deploy).** Estética alvo: branco-cru `#FAFAFA`, ink `#14110D`, verde `#7CF067`, rosa `#D262B2`, fontes Atelier/Gridlite, brutalista editorial.

## 0. Inventário de arquivos reais

### Rota /2
- `src/app/2/page.tsx` — orquestrador da ordem das seções.
- `src/components/web3v2/sections.tsx` — `Web3V2Defs` (SVG kal-eye/kal-word + `<style>` `.kv2`), `Web3V2Hero` (banda marquee de TEXTO no fim do HERO_HTML ~l.104-109), `Web3V2Manifesto` (mãos `hands-reach-hd.png` + textos de contato ~l.112-134, contatos ~l.123-131), `Web3V2Problema` ("Post genérico não constrói reputação" + `creation-adam.png` ~l.136-159), `Web3V2Diferenciais` ("Por que a Kaleidos"), `Web3V2Processo` ("Do briefing ao on-chain", cards brutalistas SEM animação). Tudo HTML em template strings via `dangerouslySetInnerHTML`.
- `src/components/web3v2/resources.tsx` — `Web3V2Resources` (Playbooks ~l.299-366 + Blog; título proibido "Teardowns…" ~l.404; `BlogCover` inline com colagens).

### Compartilhados com a home real `/` (NÃO quebrar)
- `src/components/bento-grid.tsx` (o bento que o Gabriel ama — estética não-Kaleidos), `src/components/services-list.tsx` ("Nossos Serviços", 6 itens), `src/components/process-section.tsx` ("Como fazemos", 3 cards COM animação: `OrbitingCirclesDemo`/`AnimatedBeamDemo`/`IconCloudDemo`), `src/components/cases-carousel.tsx`, `src/components/cta-strategy.tsx`, `src/components/faq-section.tsx`, `src/components/ui/footer-demo.tsx`, `src/components/ui/trusted-by.tsx` (marquee logos `public/Clientes-logo/`), `src/components/video-carousel.tsx` (existe, NÃO usado).

### Menu / Sobre / Serviços
- `src/components/navbar.tsx` — dropdown `servicesBase` só 3 serviços (~l.19-30; mobile ~l.200-214).
- `src/app/sobre/page.tsx` (551l, client) — estética genérica branca.
- `src/app/servicos/page.tsx` (índice: 3 pilares + grid 8 capacidades, NÃO linka as páginas template).
- `src/components/ui/service-page-template.tsx` + `src/lib/service-pages-data.ts` + `src/components/services/service-sections.tsx` — motor de 6 páginas template: `seo-cripto`, `consultoria-gtm`, `social-media-cripto`, `pr-assessoria`, `comunidade-cripto`, `influencer-kol`.
- CUSTOM (3): `marketing-conteudo`, `growth-lancamentos`, `ia-automacoes-completa`. `eventos-cripto` → `notFound()` (ignorar). Total vivas = 9.

### Dados/capas/assets
- `src/lib/blog-shared.ts` (tipos, `BlogCategory`=marketing|ia|cases|growth|cripto), `src/lib/blog-data.ts`, `src/lib/papers-data.ts`, `src/components/blog/blog-cover.tsx` (capa real — 1 estilo só).
- `public/Clientes-logo/` (14 logos reais), `public/v2/collage/` (10), `public/v2/elements/` (20), `~/Downloads/Elementos Kaleidos/` (superset + `_MANIFESTO.md`), `code/kaleidos-papers/_brand-assets-gerados/` (8 masters: caleidoscópio/mãos/olho/megafone…).
- `src/app/layout.tsx` (Atelier/Gridlite globais), `src/app/globals.css` (`.marquee-*`, scope `.kv2`), `src/i18n/dictionaries.ts`.

## ORDEM PROPOSTA das seções do /2
1. **Hero** — banda de texto trocada por **marquee de logos de clientes**.
2. **Manifesto / mãos full-bleed** — imagem ponta-a-ponta, SEM textos de contato.
3. **Nossos Serviços** (redesenhado Kaleidos, 9 serviços) — Bento REMOVIDO.
4. **Processo unificado** (cards "Como funciona" + animações do "Como fazemos" dentro).
5. **Cases** (`CasesCarousel`).
6. **Recursos** (Playbooks + Blog) — título corrigido + capas variadas.
7. **Diferenciais "Por que a Kaleidos"** — movido pra baixo, perto da decisão.
8. **CTA** (`CtaStrategy`).
9. **Vídeo & Motion** (`video-carousel` reaproveitado, skin Kaleidos) — após a CTA.
10. **"Post genérico não constrói reputação"** (fechamento, 1-2 botões) — abaixo da CTA.
11. **FAQ** (re-skin Kaleidos).
12. **Footer/Contato**.

## Pontos do Gabriel → arquivo + abordagem
1. **Marquee de clientes** na 1ª seção: criar `web3v2/clients-marquee.tsx` (logos `public/Clientes-logo/`, fundo cru/verde, `mix-blend`) e usar no lugar da banda de texto do hero.
2. **Mãos full-bleed + remover contatos**: `Web3V2Manifesto` → 100vw sem max-width; remover bloco `gabriel@kaleidos.digital · kaleidos.com.br · Blog · Papers`. Se `hands-reach-hd.png` pixelar, gerar versão mais larga.
3. **Mover "Post genérico"** pra depois da CTA + 1-2 botões (`.cta-btn` shadow 5px verde) → "Falar com a gente" + "Ver cases".
4. **Só "Nossos Serviços"**: remover `BentoGrid` da /2; redesenhar serviços na estética Kaleidos com os **9** (marketing-conteudo, vídeo&motion, ia-automacoes-completa, growth-lancamentos, social-media-cripto, seo-cripto, pr-assessoria, influencer-kol, comunidade-cripto, +consultoria-gtm). Componente novo `web3v2/services-kaleidos.tsx` (não tocar `services-list` real).
5. **Vídeo & Motion**: reaproveitar `video-carousel.tsx` num `web3v2/video-motion.tsx`, skin Kaleidos, após a CTA.
6. **"Por que a Kaleidos"** → posição 7 (entre Recursos e CTA).
7. **Mesclar como-funciona+como-fazemos**: `web3v2/processo-kaleidos.tsx` (JSX, não string) — 3 cards brutalistas com animação embutida (Diagnóstico→Orbiting, Criação→Beam, Distribuição→IconCloud), `ClientOnly`. Remover `ProcessSection` e `Web3V2Processo` antigo da /2.
8. **Blog**: renomear "Teardowns…" → ("Quem deu certo, por dentro." / "Estudos que viram aula."); cases usam **logo do projeto** tratada Kaleidos; **variar capas** por 8 estilos (seletor determinístico por hash do slug + peso por categoria — NUNCA Math.random, é estático).
9. **FAQ** re-skin Kaleidos (cru/ink, card borda ink + shadow sólido, eyebrow Gridlite, manter JSON-LD).
10. **Playbooks** (6 estilos): framings de card sobre as capas-medalhão de `public/papers/`.
11. **Dropdown menu**: `navbar.tsx` `servicesBase` de 3 → 9 (mega-menu 2-3 colunas, desktop+mobile).
12. **Sobre** re-skin Kaleidos (cru + grid de pontos, Atelier/Gridlite, cards brutalistas, colagens, kal-eye/kal-word; manter i18n).
13. **Serviços (todas)**: re-skin `service-page-template` (cobre 6), depois 3 custom, depois índice `/servicos` linkando as 9. Elementos novos de `~/Downloads/Elementos Kaleidos/` + `_brand-assets-gerados/`.

## Mapa estilos de capa
### BLOG (8): Dark·glow · Pop·bloco de cor · Split·painel+título · Colagem·recorte+marca-texto · Editorial·limpo · Só tipo·sem imagem · Halftone duotone · Aurora glass.
Atribuição determinística por `hash(slug)` + peso por categoria; nunca 2 adjacentes iguais; campo opcional `coverStyle` p/ override. `cases`→Split/Dark com **logo do projeto**; `cripto`→Colagem/Halftone; `marketing`→Pop/Só-tipo; `ia`→Aurora/Halftone; `growth`→Split/Editorial.
### PLAYBOOK (6): Colagem·scrapbook · Sticker-bomb·scrapbook · Polaroid colado · Dark·tech · Pop·cor total · Editorial·emblema. (playbook-cripto-2026→Editorial·emblema; hyperliquid→Dark·tech; pudgy→Pop·cor total; bull-market→Polaroid; próximos→scrapbook/sticker.)

## Logos de projeto na estética Kaleidos
Preferir **tratamento em código (CSS)**: logo sobre fundo cru `#F4EFE3` + halo radial do accent + `mix-blend:multiply` p/ mono + borda ink 1.5px + textura de pontos (padrão do `BlogCover` inline). AI só p/ heróis: `code/swipe-collector/gen-image.ts` (Gemini, `GEMINI_API_KEY`), sempre abrir a logo real antes. Destino `public/v2/logos/`, mapa `LOGO_BY_SLUG` no `resources.tsx`.

## Novos vs Editar
CRIAR: `web3v2/clients-marquee.tsx`, `web3v2/services-kaleidos.tsx`, `web3v2/processo-kaleidos.tsx`, `web3v2/video-motion.tsx`, `components/brand/kaleidos-defs.tsx` (extrair SVG symbols p/ Sobre/Serviços), `blog/blog-cover-variants.tsx` (8 variantes + seletor), `lib/cover-style.ts`.
EDITAR: `app/2/page.tsx` (ordem), `web3v2/sections.tsx` (hero/manifesto/problema), `web3v2/resources.tsx` (título/capas/logos/playbook), `navbar.tsx` (9 serviços), `faq-section.tsx` (variant), `app/sobre/page.tsx`, `service-page-template.tsx`+`service-pages-data.ts`+`service-sections.tsx`, `app/servicos/page.tsx`, 3 custom, `blog-shared.ts`+`papers-data.ts` (campo `coverStyle`).
**Não-regressão:** componentes compartilhados (`services-list`, `process-section`, `faq-section`, `home-resources`) NÃO editar destrutivamente — usar componentes novos `web3v2/*` ou prop `variant`. Home real `/` intacta até o Gabriel promover a /2.

## Fases
0. Assets (copiar elementos p/ `public/v2/elements/`, tratar logos p/ `public/v2/logos/`, checar `hands-reach-hd.png`).
1. Reordenar/limpar `/2` (remover Bento+ProcessSection antigo; mover Problema/Diferenciais).
2. 1ª dobra (clients-marquee + mãos full-bleed + Problema fechamento c/ botões).
3. Serviços (9, Kaleidos) + Processo unificado (cards+animações).
4. Recursos: título + 8 estilos de capa + logos de case + 6 estilos playbook.
5. Vídeo&Motion + FAQ re-skin.
6. Menu mega-dropdown (9).
7. Sobre re-skin.
8. Serviços (template + 3 custom + índice).
9. QA: `bun run build` verde, PT/EN, responsivo (`.kv2` breakpoints), hidratação (ClientOnly), home `/` intacta. **LOCAL, sem deploy.**

## Riscos
- `sections.tsx` usa `dangerouslySetInnerHTML` → p/ animações (ponto 7) é obrigatório converter `Web3V2Processo` p/ JSX (recomendado Hero/Manifesto/Problema também).
- `coverStyle` determinístico (hash do slug), nunca `Math.random()` (mismatch SSR em site estático).
- Vídeos/animações pesados → `LazyVideo` + `ClientOnly` + `next/dynamic`.
