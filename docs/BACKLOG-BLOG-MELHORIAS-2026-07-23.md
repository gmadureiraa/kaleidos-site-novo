# Backlog de Melhorias — Blog Kaleidos

> Gerado por frota de 10 agentes (perf · UX · IA-linking · CRO · content-gap · GEO · voz · distribuição · tech-SEO · analytics) + consolidação. 2026-07-23. Fonte: auditoria dos 257 posts.

## TL;DR — as 10 melhorias de maior ROI

| # | Item | Dimensão | Impacto | Esforço |
|---|------|----------|---------|---------|
| 1 | Cortar o markdown cru (`post.content` + 4 related inteiros) que vaza no payload da `/blog/[slug]` | Performance | Alto | S |
| 2 | Definir UMA hierarquia de CTA no fim do post (hoje 6 botões / 5 destinos) | CRO | Alto | S |
| 3 | Adicionar CTA de consultoria no índice `/blog` e nos hubs de categoria (hoje zero) | CRO | Alto | S |
| 4 | Linkar cada post de volta ao hub da categoria (spoke→pillar) + breadcrumb + JSON-LD | IA/SEO | Alto | S |
| 5 | Instrumentar o blog no PostHog (probe scroll/tempo + form da sidebar + `data-post` nos CTAs) | Analytics | Alto | S |
| 6 | Barra de progresso de leitura no topo | UX | Alto | S |
| 7 | Repadronizar o lote 8 (Title Case inglês → sentence-case PT-BR) | Editorial | Alto | S |
| 8 | RSS com `content:encoded` + `enclosure` (destrava Beehiiv RSS-to-send) | Distribuição | Alto | S |
| 9 | Definir Gabriel Madureira como entidade canônica (`@id` ProfilePage em `/sobre`) | GEO | Alto | M |
| 10 | Fechar o 404 de posts KAI publicados pós-build (`dynamicParams=false`) | SEO+Distrib. | Alto | M |

> Nota de dedupe: o "404 dos posts KAI" aparecia igual em SEO técnico e em Distribuição → mesclado no item 10. "Relacionados duplicados (sidebar==grade)" aparecia em UX e em IA → mesclado. "Links crawláveis na /blog" aparecia em IA e SEO técnico → mesclado. "Órfãos de citação / 3 links quebrados" ficam juntos no bloco de IA.

---

## Quick wins — atacar PRIMEIRO na próxima sessão (impacto alto + esforço S)

Todos mexem em poucos arquivos, sem gerar conteúdo novo, e a maioria é reversível. Ordem sugerida dentro da sessão:

1. **Payload da `/blog/[slug]`** — remover `content` do post e trocar `relatedPosts: BlogPost[]` por `BlogCardMeta[]`. Dezenas a centenas de KB por página de case. `src/app/blog/[slug]/page.tsx`, `src/components/blog/article-content.tsx`, `src/lib/blog-data.ts`. Medir com `curl -s /blog/<slug-case> | wc -c` antes/depois.
2. **Instrumentação do blog no PostHog** (bundle de 4 fixes S que se reforçam):
   - Montar `<TrackingProbe/>` (ou `BlogReadProbe`) dentro de `ArticleContent` — hoje scroll/tempo NÃO é instrumentado em post nenhum.
   - Fazer `trackScroll`/`trackTimeOnPage` chamarem `phCapture` (hoje só vão pro GA). `src/components/analytics.tsx`.
   - Instrumentar o form de newsletter da sidebar (`handleSubscribe` não chama `track`/`identifyLead` — conversões invisíveis). `src/components/blog/article-content.tsx`.
   - Ler `data-post`/`data-cta` no `ConversionTracking` (atributos já existem, são ignorados). `src/components/conversion-tracking.tsx`.
   - Anexar `{post_slug, category, content_pillar}` a todo evento — é o que encerra o debate "cripto 80 / IA 7" com número.
3. **Hierarquia de CTA no fim do post** — 1 primário (Agendar Calendly) + 1 secundário (WhatsApp em texto); tirar `/servicos` e `/contato` como botões; escolher UM destino no banner final. `src/components/blog/article-content.tsx`.
4. **CTA de consultoria no `/blog` e hubs** — faixa escura antes/depois do bloco de newsletter, copy contextual por categoria. `src/app/blog/blog-index-client.tsx`, `src/app/blog/categoria/[cat]/page.tsx`.
5. **Spoke→pillar** — trocar o `<span>` de categoria por `<Link href="/blog/categoria/${post.category}">`, inserir categoria no breadcrumb e o 4º ListItem no `BreadcrumbList`. `src/components/blog/article-content.tsx`, `src/components/blog/blog-jsonld.tsx`.
6. **Barra de progresso** — `useScroll`/`scrollYProgress` (framer já é dep) numa `motion.div` fixa sob o sticky nav. `src/components/blog/article-content.tsx`.
7. **Lote 8 Title Case → sentence-case** — reescrever `title`+`seoTitle` dos 10 posts, siglas na allowlist. `src/lib/blog-seo-posts-8.ts`.
8. **RSS `content:encoded` + `enclosure`** — adicionar corpo HTML e og:image no feed; destrava Beehiiv/Zapier sem tocar em post. `src/app/blog/rss.xml/route.ts`.
9. **Label `IA & Automacao` → `IA & Automação`** — typo de acento exposto em toda a navegação. `src/lib/blog-shared.ts` (checar antes se filtros/JSON-LD dependem da string).
10. **3 links internos quebrados** (404 de crawl) — `axie-infinity-play-to-earn-custo-do-incentivo`, `coinbase-conformidade-como-marca-varejo-americano`, `incentivos-de-token-que-duram`. `src/lib/blog-new-68.ts`.
11. **Relacionados duplicados** — buscar `getRelatedPostsAsync(slug, 7)`; sidebar = `slice(0,3)`, rodapé = `slice(3,6)`. `src/app/blog/[slug]/page.tsx`, `article-content.tsx`.

---

## Backlog completo por tema

### 1. Performance & Core Web Vitals

- **Cortar markdown cru no payload da `/blog/[slug]`** — Alto/S — remover `content` do post e passar related como `BlogCardMeta[]` via `toBlogCard`. `blog/[slug]/page.tsx`, `article-content.tsx`, `blog-data.ts`.
- **Otimizar `Madureira.png` (146KB p/ avatar de 32-44px)** — Médio/S — gerar `.webp` ~64px (cai p/ ~3-6KB), trocar a referência num só lugar (constante). `article-content.tsx`, `public/Kaleidos/imagens/Equipe/Madureira.png`, `blog-seo-posts.ts`.
- **Reduzir INP/TBT das animações framer na grade** — Médio/M — trocar entrada dos cards por CSS puro (`tw-animate-css`) ou `whileInView + once:true`; respeitar `prefers-reduced-motion`. `blog-card.tsx`, `blog-index-client.tsx`, `featured-post.tsx`.
- **`priority`/`fetchpriority` no cover LCP + lazy no resto** — Médio/S — propagar prop de prioridade no branch `CoverArt` (o realmente usado); `aspect-ratio` explícito p/ blindar CLS. `blog-cover-variants.tsx`, `blog-cover.tsx`.
- **Subsetar Inter Italic (384KB)** — Médio/M — subset latino (glyphhanger) ou `font-synthesis: oblique`. `layout.tsx`, `globals.css`, fonte Inter-Italic.
- **Afrouxar `revalidate=3600` → 86400 no `[slug]`** — Baixo/S — conteúdo estático; auto-publish de agendados tolera 24h. `blog/[slug]/page.tsx`, `blog/page.tsx`.
- **Cachear OG image edge por slug** — Baixo/S — exportar `revalidate` na rota `opengraph-image` ou pré-render em build. `opengraph-image.tsx`, `og-meta.generated.ts`.

### 2. UX & design de leitura

- **Barra de progresso** — Alto/S (ver quick wins).
- **TOC sticky com âncoras nos headings** — Alto/M — gerar `id` nos `##/###` em `markdown.ts`, TOC na `<aside>` com scroll-spy, `scroll-margin-top`. Bônus GEO (IA cita seção). `markdown.ts`, `article-content.tsx`, `globals.css`.
- **Corrigir relacionados duplicados (sidebar==grade)** — Médio/S (mesclado com IA-8; ver quick wins).
- **Dark mode no blog** — Médio/M — o site já tem `.dark` global mas o blog é hex claro hardcoded; migrar cores-chave do `study-prose` p/ tokens. Começar pelo `[slug]`. `globals.css`, `article-content.tsx`, `blog-index-client.tsx`.
- **Busca da index além de título+excerpt (tags+categoria) + atalho `/`** — Médio/M — montar campo `searchable` no server. `blog-index-client.tsx`, `blog-shared.ts`.
- **Contadores por categoria no filtro** — Baixo/S — `useMemo` sobre `publishedPosts`. `category-filter.tsx`, `blog-index-client.tsx`.
- **`readTime` automático + "X min restantes"** — Baixo/S — calcular de `content` (palavras/200), estático como fallback. `blog-data.ts`, `blog-shared.ts`, `article-content.tsx`.
- **Suavizar o LeadGate mid-article** — Baixo/M — estilizar como faixa colapsável, testar corte após 3º `h2`. `article-content.tsx`, `lead-gate.tsx`.

### 3. Arquitetura de informação & internal linking

- **Spoke→pillar (post→hub) + breadcrumb + JSON-LD** — Alto/S (ver quick wins).
- **3 links internos quebrados** — Médio/S (ver quick wins). `blog-new-68.ts`.
- **Link contextual inbound aos 98 posts nunca citados** — Alto/L — gerar lista `comm -13` entre slugs linkados e reais; 2-3 "pais" temáticos por órfão; meta 0 posts com <2 inbound. `blog-new-1.ts`, `blog-seo-posts.ts`, `blog-data.ts`.
- **Backfill de tags nos 183 sem tags** — Médio/L — taxonomia de ~20-30 tags; habilita `rankRelated` e futuros tag-hubs `/blog/tag/[tag]`. `blog-data.ts`, `blog-new-1.ts`, `categoria/[cat]/page.tsx`.
- **Sub-clusterizar o hub `growth` (104 posts = 40%)** — Médio/M — reclassificar em subtemas + módulo "Comece por aqui" com 3-5 cornerstone. `categoria/[cat]/page.tsx`, `blog-data.ts`.
- **Descoberta crawlável no `/blog` sem depender só dos hubs** — Médio/M (mesclado com SEO-3) — `<nav>` SSR "índice do acervo" (link-dump por categoria) ou `/blog/pagina/[n]` SSG. Preferir a versão leve. `blog/page.tsx`, `blog-index-client.tsx`, `sitemap.ts`.
- **Âncoras genéricas + diversificar o "Related"** — Baixo/M — âncora rica no nav ("Marketing cripto e web3"); sidebar=mesma categoria, rodapé=cross-cluster. `blog-index-client.tsx`, `article-content.tsx`, `blog-data.ts`.
- **Desambiguar `blog/cases` vs `/cases`** — Baixo/S — cruzar os dois silos com âncora que explicite a diferença. `categoria/[cat]/page.tsx`, `src/app/cases`.

### 4. Conversão (CRO)

- **Hierarquia única de CTA no fim** — Alto/S (ver quick wins).
- **CTA de consultoria no `/blog` + hubs** — Alto/S (ver quick wins).
- **Prova social perto dos CTAs** — Alto/M — proof-strip (logos/nº real verificado) acima do Agendar; usar só métricas confirmadas (cuidado com os 5 números suspeitos). `article-content.tsx`, `src/app/cases`.
- **Contextualizar CTA por categoria (parar de vender cripto em post de IA)** — Médio/M — mapa `category→{eyebrow,headline,href}`. `article-content.tsx`, `blog-shared.ts`.
- **Lead magnet tangível no LeadGate** — Médio/M — entregar playbook/paper por categoria via email de boas-vindas. `lead-gate.tsx`, `emails/lead-sequence/1-welcome.ts`.
- **Unificar promessa da newsletter (quinzena vs semana vs "Papers")** — Médio/S — fonte única em `constants.ts` referenciada nos 4 pontos. `lead-gate.tsx`, `article-content.tsx`, `blog-index-client.tsx`, `lead-popup.tsx`.
- **CTA de consultoria inline mid-article (não só newsletter)** — Médio/M — 2º bloco via `splitForGate` a ~70%, visível no mobile. `article-content.tsx`.
- **Popup segmentado (consultoria em posts de alta intenção)** — Médio/M — passar `category`/flag ao `LeadPopup`. `lead-popup.tsx`, `layout.tsx`.

### 5. Estratégia de conteúdo & keyword (marketing/IA) — todos os arquivos em `code/site-kaleidos/`

- **Pillar "Marketing com IA (2026)" + cluster IA não-cripto (6-8 satélites)** — Alto/L — usar KAI como prova E-E-A-T. `blog-seo-posts-8.ts`, `blog-new-55.ts`.
- **Cluster comparativo de ferramentas de IA (commercial intent)** — Alto/M — "melhores ferramentas", "ChatGPT vs Gemini vs Claude", stack no-code; tabela p/ featured snippet. `blog-seo-posts-8.ts`, `blog-shared.ts`.
- **Cluster "Agentes de IA no marketing" (first-mover PT-BR)** — Alto/M — ancorar no KAI. `blog-new-55.ts`, `blog-seo-posts-7.ts`.
- **Cluster tráfego pago geral (Meta/Instagram — só existe Google Ads)** — Alto/M — espelhar profundidade dos posts de Google Ads. `blog-seo-posts-8.ts`, `blog-data.ts`.
- **Cluster "Prompts para marketing" (lead magnet + volume)** — Alto/M — "50 prompts", frameworks, prompts na voz da marca. `blog-seo-posts-8.ts`, `blog-shared.ts`.
- **Consolidar canibalização com canonical/merge + 301** — Médio/S — começar pelo trio `tokenomics-e-marketing` (3 slugs); depois email-fintech x2, content-fintech x2, growth-loops x2. `blog-cases.generated.ts`, `next.config.js`.
- **Cluster WhatsApp / marketing conversacional (zero coverage)** — Médio/S — 2 posts. `blog-seo-posts-8.ts`, `blog-data.ts`.
- **Cluster CRO / landing page / A/B** — Médio/M — 3 posts. `blog-seo-posts-8.ts`, `blog-data.ts`.
- **Hub/pillar de SEO geral (posts órfãos sem pai)** — Médio/S — 1 pillar + interlinking dos 6 satélites existentes. `blog-seo-posts.ts`, `blog-seo-posts-8.ts`.
- **Cluster vídeo curto / social orgânico não-cripto** — Médio/M — 3 posts (Reels/TikTok/Shorts + roteiro com IA). `blog-seo-posts-8.ts`, `blog-data.ts`.

### 6. GEO / answer-engine

- **Gabriel como entidade canônica `@id` (ProfilePage em `/sobre`)** — Alto/M — `Person` com `@id` fixo, `knowsAbout`, `sameAs`; referenciar `author` por `@id` nos posts; unificar com `founder` da Org. `sobre/page.tsx`, `blog-jsonld.tsx`, `structured-data.tsx`.
- **`about`/`mentions` com `sameAs` (Wikidata/CoinGecko) nas entidades** — Alto/M — campo `entities?[]` em `BlogPost`; mapa estático ~40 projetos; começar pelos 104 cases (1 entidade óbvia/post). `blog-shared.ts`, `blog-jsonld.tsx`, `blog-data.ts`.
- **Nos 104 cases, marcar a org analisada como `about:` + `citation[]`** — Alto/M — `BlogPosting` com `about:{Organization,sameAs}` quando `category==='cases'`. `blog-cases.generated.ts`, `blog-jsonld.tsx`.
- **`tldr` answer-first real (40-60 palavras) em TODOS, priorizando cases** — Alto/L — auditar quem cai no fallback de excerpt truncado; escrever "X fez Y e conseguiu Z". Endurecer `getTldr` p/ avisar no build. `blog-cases.generated.ts`, `blog-data.ts`.
- **`HowTo` + `ItemList` de passo-a-passo/listicle** — Médio/L — heurística no render + flags `howto?`/`list?`; começar manual nos ~10 playbooks. `blog-jsonld.tsx`, `blog-shared.ts`, `blog/[slug]/page.tsx`.
- **`speakable` + `wordCount` + `abstract` + `isPartOf`** — Médio/S — campos baratos que aumentam citabilidade. `blog-jsonld.tsx`.
- **Freshness automatizado (não só backfill)** — Médio/M — backfill dos 59 sem `updatedAt`; revisão trimestral dos ~30 evergreens; revalidação agendada. `blog-data.ts`, `blog/[slug]/page.tsx`.
- **Enriquecer `Answer` do FAQPage (author `@id` + answer-first)** — Médio/S — 1ª frase responde direto; validar comprimento. `blog-jsonld.tsx`, `blog-cases.generated.ts`.

### 7. Voz editorial & consistência — todos em `code/site-kaleidos/src/lib/`

- **Lote 8 Title Case → sentence-case** — Alto/S (ver quick wins). `blog-seo-posts-8.ts`.
- **Política de voz por tipo (1ª pessoa Gabriel vs 3ª institucional)** — Alto/L — regra: cases/opinião = "a gente"; how-to = "aqui na Kaleidos, a gente"; find-replace assistido nos ~75 arquivos. `blog-new-8.ts`, `blog-seo-posts-7.ts`, `blog-seo-posts-8.ts`.
- **Style-guide enforçável (lint editorial)** — Alto/M — `scripts/validate-blog-voice.ts` reprovando Title Case, `seoDescription===excerpt`, tamanho fora de 120-160, voz mista, título >60. `STYLEGUIDE.md`. `blog-shared.ts`.
- **Substituir "a Kaleidos faz X" por bastidor real com prova** — Alto/L — passe nos ~30 guias, ancorar com dado real dos 104 cases (link interno + número). `blog-new-8.ts`, `blog-cases.generated.ts`.
- **Deduplicar `seoDescription===excerpt` (14 posts)** — Médio/M — reescrever com keyword+benefício, 150-160 chars. `blog-seo-posts-7.ts`, `blog-cases.generated.ts`.
- **Quebrar templatização estrutural** — Médio/M — variantes de "## Principais takeaways" (121 posts), aberturas "Na prática" (59), FAQ "O que é" (98). `blog-new-59.ts`, `blog-seo-posts-7.ts`.
- **Padronizar siglas/nomes de projeto** — Médio/M — tabela canônica no STYLEGUIDE + check no validador. `blog-shared.ts`, `blog-seo-posts-7.ts`.
- **Label `IA & Automacao` → `IA & Automação`** — Baixo/S (ver quick wins). `blog-shared.ts`.

### 8. Distribuição & repurpose

- **RSS `content:encoded` + `enclosure`** — Alto/S (ver quick wins). `rss.xml/route.ts`, `markdown.ts`, `blog-data.ts`.
- **`dynamicParams=false` mata post KAI até rebuild** — Alto/M (mesclado com SEO-1; ver item 10 do TL;DR) — (1) Deploy Hook `SITE_KALEIDOS_DEPLOY_HOOK` no publish do KAI; (2) rede de segurança `dynamicParams=true` com gate `getPostBySlugAsync→notFound()`. Documentar `KAI_BLOG_FEED_URL/TOKEN` no `.env.example`. `blog/[slug]/page.tsx`, `blog-external.ts`, `blog-data.ts`, `.env.example`, `sitemap.ts`.
- **Endpoint `/blog/repurpose.json` (tldr+faq+takeaways pro KAI)** — Alto/M — matéria-prima do motor "post→N ativos"; começar por cripto (80 posts). `src/app/blog`, `blog-data.ts`, `blog-shared.ts`.
- **Feeds RSS por categoria** — Médio/S — `/blog/categoria/[cat]/rss.xml` via `getPublishedPostCardsByCategoryAsync`. `categoria/[cat]/page.tsx`, `rss.xml/route.ts`.
- **IndexNow + deploy-hook automáticos** — Médio/S — Vercel Cron 1x/dia batendo em `/api/indexnow` com `CRON_SECRET`. `api/indexnow/route.ts`, `vercel.json`, `blog-external.ts`.
- **Click-to-tweet inline + pull-quotes** — Médio/M — componente `ClickToTweet` do `tldr`/blockquotes marcados. `share-buttons.tsx`, `article-content.tsx`, `markdown.ts`.
- **Share buttons Telegram/WhatsApp/Threads (ICP cripto BR)** — Médio/S — ~15 linhas, ícones lucide. `share-buttons.tsx`.
- **Convenção de canonical p/ republicação (LinkedIn/Medium/Mirror/Beehiiv)** — Médio/S — expor `canonicalUrl` no `repurpose.json`. `blog/[slug]/page.tsx`, `blog-external.ts`.

### 9. SEO técnico & crawlability

- **Fechar 404 de posts KAI pós-build** — Alto/M — **mesmo item da Distribuição-2**, resolver junto.
- **Parar `lastModified=now()` no sitemap** — Médio/S — `BUILD_DATE`/`updatedAt` real por grupo; manter `getModifiedAt(post)` só nos artigos. Evita "crying wolf" no crawl budget. `sitemap.ts`, `audiences.ts`, `service-pages-data.ts`.
- **Aumentar links crawláveis na `/blog`** — Médio/M — **mesclado com IA-6**; bloco SSR com todos os 257 `<a>`.
- **Corrigir JSON-LD dos hubs (breadcrumb sem raiz, domínio hardcoded, sem ItemList)** — Médio/S — adicionar "Início", trocar hardcode por `NEXT_PUBLIC_SITE_URL`, `mainEntity ItemList`. `categoria/[cat]/page.tsx`.
- **`image` do BlogPosting → `ImageObject` com dimensões** — Baixo/S — `{url,width:1200,height:630}`. `blog-jsonld.tsx`.
- **Endurecer `robots.ts` (`/app$` wildcard + bots IA sem `/_next/`)** — Baixo/S — noindex na `/app/page.tsx`; `/_next/` no grupo de bots IA. `robots.ts`, `app/page.tsx`.
- **Auditar `dateModified/updatedAt` sitemap↔JSON-LD** — Baixo/S — validar os 59 via git log; preencher só os editados de fato. `blog-data.ts`, `sitemap.ts`, `blog-jsonld.tsx`.

### 10. Analytics & instrumentação

- **Bundle de quick wins** (probe scroll/tempo + PostHog + form sidebar + `data-post`) — Alto/S — ver quick wins. `article-content.tsx`, `analytics.tsx`, `conversion-tracking.tsx`, `tracking-probe.tsx`, `use-tracking.ts`.
- **Metadados do post nos eventos (slug/categoria/pilar)** — Alto/M — `posthog.register` p/ a rota; insight read-through e lead-rate por pilar. `article-content.tsx`, `blog-shared.ts`.
- **`article_completed` via IntersectionObserver** — Médio/M — no bloco FAQ/CTA, filtrar scroll-rápido com tempo. `article-content.tsx`.
- **`lead_gate_viewed` (impressão do gate)** — Médio/S — funil `viewed→captured` = CVR do gate. `lead-gate.tsx`.
- **Ligar A/B (PostHog pronto, zero flags)** — Médio/M — 3 experimentos: copy do gate, posição do gate, CTA de fechamento. `lead-gate.tsx`, `article-content.tsx`, `instrumentation-client.ts`.
- **Funil nomeado blog→/contato→booking** — Médio/M — depende dos itens de `post_slug`/CTA; breakdown por `content_pillar`. `api/calendly/webhook/route.ts`, `posthog-server.ts`.

---

## Apostas grandes (impacto alto + esforço L) — planejar com calma

Não cabem numa sessão; cada uma é um mini-projeto com escopo próprio:

1. **Pillar "Marketing com IA" + cluster IA não-cripto (6-8 posts)** — o cluster de maior crescimento de 2026 onde a Kaleidos está ausente. Ancora o reposicionamento 70% marketing / 25% IA. `blog-seo-posts-8.ts`, `blog-new-55.ts`.
2. **Link contextual inbound aos 98 posts órfãos de citação** — trabalho editorial de malha, semi-automatizável por tags/keyword, é o que sustenta autoridade de cluster. `blog-new-1.ts`, `blog-seo-posts.ts`.
3. **Backfill de tags nos 183 posts + tag-hubs** — desbloqueia "related" decente e eixos temáticos transversais; pré-requisito de vários outros itens. `blog-data.ts`, `categoria/[cat]/page.tsx`.
4. **`tldr` answer-first real em todos (foco 104 cases)** — a isca de citação nº1 hoje serve resumo truncado à IA na maioria dos cases. Casa com o item GEO de entidades. `blog-cases.generated.ts`, `blog-data.ts`.
5. **Política de voz por tipo + reescrita "a Kaleidos faz X" → bastidor com prova** — dois L de editorial que devem andar juntos (mesmos ~75 arquivos), guardados pelo lint do item de style-guide. `blog-new-8.ts`, `blog-seo-posts-7.ts`, `blog-cases.generated.ts`.
6. **`HowTo`/`ItemList` a partir de playbooks/listicles** — sinal GEO de alto rendimento sobre conteúdo que já existe; começar manual nos ~10 playbooks antes de generalizar a heurística. `blog-jsonld.tsx`, `blog/[slug]/page.tsx`.

> Dica de sequenciamento das apostas: **3 (tags) antes de 2 (inbound links) e antes do "related" da IA**; **item GEO de entidades antes/junto de 4 (tldr dos cases)**; **lint editorial antes de 5** pra não regredir.

---

## Sequência sugerida — 3 ondas

### Onda 1 — próxima sessão (1 dia, tudo S, alto ROI)
Payload da `/blog/[slug]` → bundle de analytics do blog → hierarquia de CTA → CTA no `/blog`+hubs → spoke→pillar → barra de progresso → lote 8 sentence-case → RSS `content:encoded` → label `IA & Automação` → 3 links quebrados → relacionados duplicados.
Fecha em um deploy. **Antes do push:** `bun run build` tem que passar; confirmar o alias da Vercel aponta pro deploy novo (`vercel alias set`), não só HTTP 200.

### Onda 2 — próximas ~4 semanas (M + entrada nos L)
`dynamicParams`/404 KAI + Deploy Hook + IndexNow automático (destrava distribuição inbound) → entidade canônica `@id` em `/sobre` → `about/mentions` nos cases → TOC com âncoras → dark mode do post → `lastModified` do sitemap + JSON-LD dos hubs → style-guide/lint editorial → dedupe `seoDescription` + canibalização (301) → share Telegram/WhatsApp/Threads → feeds RSS por categoria → prova social nos CTAs → metadados de post nos eventos + `article_completed`.
Começar em paralelo o **backfill de tags** (aposta 3) porque destrava várias coisas.

### Onda 3 — trimestre (as apostas L + clusters de conteúdo)
Pillar Marketing com IA + clusters (ferramentas, agentes, tráfego pago, prompts, WhatsApp, CRO, vídeo curto, SEO hub) → inbound links nos 98 órfãos → `tldr` real em todos os cases → reescrita de voz "a Kaleidos faz X" → `HowTo`/`ItemList` → `/blog/repurpose.json` + loop de repurpose no KAI → A/B experiments → funil nomeado blog→booking → sub-clusterizar `growth`.

---

## Métricas pra acompanhar

**Onda 1 (performance + captura do baseline):**
- Bytes servidos por página de case: `curl -s /blog/<slug-case> | wc -c` antes/depois (meta: queda de dezenas a centenas de KB).
- LCP/INP mobile no PSI numa URL de post (baseline antes do framer/cover).
- PostHog passa a registrar `scroll_depth`, `time_on_page`, `lead_captured` (source blog-sidebar) e `call_click` com `origin_post` — se esses eventos aparecem, a instrumentação funcionou. Antes disso, todo número de conversão do blog está subcontado.
- CVR dos CTAs de fim de post (agora com hierarquia única) e do CTA novo no `/blog`/hubs.

**Onda 2 (SEO/GEO/distribuição):**
- GSC: queda de "URL enviada, não encontrada (404)" (fix do 404 KAI); crawl budget/`lastmod` mais honesto → re-crawl mais rápido dos posts que mudam.
- Rich Results Test passando em 3 posts (cover próprio, fallback edge, case) — `Person`/`ProfilePage`, `about`, `ImageObject`, breadcrumb com raiz.
- Beehiiv RSS-to-send consegue montar email com corpo+capa (feed deixou de ser decorativo).
- PostHog: read-through médio e **lead-rate por `content_pillar`** — o número que encerra "cripto 80 / IA 7".
- PageRank interno: nº de posts com ≥2 inbound contextuais subindo (meta 0 órfãos de citação, no fim da onda 3).

**Onda 3 (conteúdo + autoridade):**
- Impressões/cliques GSC nos clusters novos (marketing com IA, ferramentas, agentes, tráfego pago) — sair de zero.
- Citações em answer engines (Perplexity/ChatGPT) para queries de entidade ("quem analisou o marketing da Pumpfun", "melhores ferramentas de IA para marketing") — teste manual mensal.
- Funil PostHog `blog $pageview → article_completed → call_click(origin_post) → invited_scheduled`, com breakdown por pilar → ROI cripto vs IA em número, não em contagem de posts.
- Resultado dos 3 A/B (copy/posição do gate, CTA de fechamento) medido por `lead_captured` e `call_click`.
