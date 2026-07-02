# SPEC — Página /portfolio do site Kaleidos

> Pesquisa + especificação. **IMPLEMENTADO em 2026-06-26** (v1). Ver §7 (status).
> Autor: agente de pesquisa · Base: estudo de `biblioteca.kaleidos.com.br` + inventário do `site-kaleidos`.

---

## 7. STATUS DE IMPLEMENTAÇÃO (2026-06-26)

**Decisão do Gabriel aplicada:** `/cases` e `/portfolio` COEXISTEM (não fundidos).
`/cases` = storytelling por cliente · `/portfolio` = galeria de peças por formato.

Build: ✅ `bun run build` passa, `/portfolio` prerender estático (13 kB, 261 kB first load), 0 erros, 0 warnings nos arquivos novos. 178 assets locais checados, 0 quebrados.

### ✅ Feito (v1)
- **`src/lib/portfolio-data.ts`** — agregador `getPortfolioItems()` que DERIVA peças de cases + papers (não duplica). Helpers: `getPortfolioClients()`, `getFormatCounts()`, `FORMAT_GROUPS`, `NICHES`. **124 itens gerados.**
  - Por formato: **reel 32 · vídeo 8 · post 28 · landing 27 · design 11 · newsletter 7 · carrossel 4 · paper 5 · playbook 2**.
  - Por grupo de aba: Tudo 124 · Reels & Vídeo 40 · Carrossel 4 · Paper & Playbook 7 · Newsletter 7 · Landing & Site 18 · Design & Posts 39 · Blog 0.
  - 22 clientes (Investidor 4.20 lidera com 16; Kaleidos Papers com 7).
  - Inferência de formato: vídeo→reel (ou `video` 16:9 se manifesto/podcast/youtube/landscape); imagens com alt "slide/carrossel" → agrupadas em 1 carrossel navegável; imagem de captura→landing; alt/src com news/email→newsletter; senão post/design; pdf→paper; papers-data não-hidden→paper/playbook.
- **`src/components/portfolio/portfolio-gallery.tsx`** (client) — abas de FORMATO + chips de nicho + chips de cliente (com contagem) + busca textual + grade masonry (CSS columns, aspect nativo por card) + modal de preview (vídeo toca, carrossel navega slides com ←/→ e contador, imagem/paper amplia). Badge de formato/duração/nº slides. Hover overlay com cliente/título/métrica. CTA final → WhatsApp + link pros cases.
- **`src/app/portfolio/page.tsx`** + **`layout.tsx`** (metadata SEO/OG PT-BR).
- **Navegação:** link `/portfolio` adicionado no navbar (desktop após Cases, e no menu mobile), bilíngue (Portfólio/Portfolio).
- **Visual:** dark `#0A0A0B` + verde `#7CFF6B` + rosa `#D262B2` (paleta Kaleidos), tipografia do site (font-display/font-accent). Mobile-first, lazy-load de imagens (`loading="lazy"`), posters nos vídeos.
- **i18n:** segue padrão do site (`useI18n`, PT default + `?lang=en`); labels de formato/nicho/UI em PT/EN.

### 🔜 Pendente (v2)
- **Blog na grade** (`includeBlog`): `blog-cases.generated.ts` não tem `coverImage` hoje → ficou fora (aba Blog mostra 0 e é auto-ocultada). Gerar capas e ligar `getPortfolioItems({ includeBlog: true })`.
- **Screenshots de landings ausentes:** cases tech-portfolio sem rota usam `externalLink` (DePay/DeFi Radar) — screenshots já existem; outros produtos sem case publicado não entram (sem media).
- **JSON-LD `ItemList`/`CreativeWork`** no layout (SEO/GEO) — não adicionado ainda.
- **Sort explícito** (destaque/recente): hoje só "destaque primeiro quando sem filtro". Falta data por peça pra ordenar por recência.

---

## 0. TL;DR

O site da Kaleidos já tem `/cases` (storytelling por cliente, 22 cases, filtros por bucket de tag).
O que falta é um **acervo de PEÇAS** — um "portfólio vivo" no modelo da `biblioteca.kaleidos.com.br`:
grade densa, navegável por **formato** e por **cliente**, onde cada card é uma peça individual
(um reel, um carrossel, um paper, uma newsletter, uma landing) com thumb + cliente + tipo + link.

`/cases` = "por que deu certo" (narrativa, 1 página por cliente).
`/portfolio` = "o que a gente faz" (vitrine de peças, grade filtrável). São complementares.

---

## 1. Como a biblioteca.kaleidos.com.br é organizada (o modelo a seguir)

A `biblioteca.kaleidos.com.br` é o **Biblioteca Viral** — um acervo curado de 3.100+ posts virais
raspados/analisados por IA (projeto em `code/biblioteca-viral`, Next.js App Router + Neon + Tailwind).
O CONTEÚDO dela é swipe-file de terceiros, não portfólio. Mas o **modelo de organização** é exatamente
o que queremos copiar pro portfólio. Pontos-chave:

### 1.1. Navegação em duas camadas
- **Landing pública** (`/`): hero + stats ("3.100+ posts", "84 creators", "303 análises") + top performers + showcase de formatos + CTA. Nav minimal: logo · "Como funciona" · "Entrar na biblioteca".
- **App / acervo** (`/app`): sidebar fixa + grade de cards + toolbar de filtros. "Sem cadastro pra explorar".

### 1.2. Organização PRIMÁRIA = por FORMATO (não por creator)
Princípio editorial explícito no código (`lib/format-groups.ts`):
> "o usuário pensa em 'quero ver carrossel' ou 'quero ver thread', não em 'instagram_carousel + linkedin_carousel + tiktok_carousel'".

Grupos top-level de formato (abas/chips no topo), cada um agrega formatos cross-plataforma:
- **Tudo** (✦) · **Carrossel** (🎠) · **Vídeo Curto** (⚡ reel/tiktok/short) · **Vídeo Longo** (▶️ youtube/linkedin video) · **Thread** (🧵) · **Post** · **Newsletter** · **Blog** · **Outro**.

### 1.3. Camadas secundárias de filtro
- **Categorias** editoriais/temáticas (`lib/categories.ts`): hooks, storytelling, branding-pessoal, marketing, copywriting, IA & automação, cripto, finanças etc. (chips abaixo das abas de formato).
- **Plataforma** (instagram, youtube, tiktok, linkedin, twitter, threads…).
- **Source** (`lib/sources.ts`): de onde veio a peça (IG raspado, Sequência Viral, Reels Viral…).
- **Creator** (multi-select), **padrão viral**, **busca semântica** (embeddings), filtros avançados (data, min likes/views).
- **Sort**: top · recente · outlier · views · longest.

### 1.4. Layout dos cards
- **Grade masonry** com aspect-ratio NATIVO por formato (`content-card.tsx` → `ASPECT_BY_FORMAT`):
  - vídeo longo → `aspect-video` (16:9)
  - reel/short/tiktok → `aspect-[9/16]`
  - carrossel IG/LI → `aspect-[4/5]`
  - post → `aspect-square`
  - textual (tweet/thread/linkedin post) → card de texto, sem thumb.
- **Card mostra**: thumbnail · badge de formato/duração · avatar+handle do creator · título/hook/caption truncado · métricas (likes/views/comments) · badge de outlier ("13×") · quick actions (salvar/board).
- Clique → modal de detalhe (`@modal/(.)content/[id]`) com a peça inteira + análise.

### 1.5. Sidebar (workspace)
Logo + busca global (⌘K) → nav principal (Feed, Top performers, Creators, Templates) → "Minhas Listas" (Salvos + boards) → footer admin.

### 1.6. Stack/data
Next.js App Router · Neon (Postgres) · Tailwind v4 com tokens `--color-bv-*` (paper cream + leaf green + coral) · cards server-rendered, filtros via querystring no SQL (`c.format = ANY(...)`, `c.categories && ...`).

**O que copiar pro /portfolio:** abas de formato no topo + chips de categoria/cliente + grade masonry com aspect nativo + card com thumb/cliente/tipo/métrica/link + modal de detalhe. **O que NÃO precisa:** busca semântica, scraping, boards de usuário, auth (portfólio é estático/curado e público).

---

## 2. Estrutura proposta para /portfolio (site Kaleidos)

### 2.1. Conceito
Vitrine de PEÇAS individuais que a Kaleidos produziu, agregando o que hoje está espalhado:
mídia dos 22 cases, papers/playbooks, posts do blog. Uma única grade densa, filtrável por
**formato** e por **cliente**, no estilo Biblioteca Viral mas com conteúdo PRÓPRIO da agência.

### 2.2. Navegação
Header padrão do site (reusar `Navigation`/`FooterDemo` existentes). Dentro da página:

```
[ Hero curto: "Portfólio" + 1 linha + stats (N peças · N clientes · N formatos) ]
[ Abas de FORMATO ]  Tudo · Reels/Vídeo · Carrossel · Paper · Newsletter · Landing/Site · Design · Thread/Post
[ Chips secundários ] por CLIENTE (multiselect)  +  por NICHO (Cripto/Web3 · Fintech · Educação · Influencer · SaaS/Produto)
[ Busca textual ]  (filtra nome do cliente, tag, título da peça)
[ Sort ]  Destaque · Mais recente
[ GRADE MASONRY de cards de peça ]
[ CTA final: "Quer um resultado desses? Fale com a gente" → /contato ]
```

### 2.3. Taxonomia de FORMATO (abas top-level)
Mapeada do material real disponível. Cada aba agrega tipos de mídia:

| Aba (formato)        | Agrega                                                        | Aspect card |
|----------------------|--------------------------------------------------------------|-------------|
| **Tudo**             | tudo                                                         | nativo      |
| **Reels & Vídeo**    | media.type=video (reels, ads, motion, edição)               | 9:16 / 16:9 |
| **Carrossel**        | sequências de media.type=image marcadas como carrossel      | 4:5         |
| **Paper & Playbook** | papers-data.ts (PDFs gated) + playbooks                     | 3:4 (capa)  |
| **Newsletter**       | peças tagueadas Newsletter (Layla, Defiverso, NBS, DSEC)    | 4:5         |
| **Landing & Site**   | cases de Desenvolvimento Web / dashboards / SaaS            | 16:10 (screenshot) |
| **Design & Branding**| banners, identidade, design (Defifest, Ledger, Paradigma)   | nativo      |
| **Blog & Conteúdo**  | blog-cases.generated.ts (21 estudos)                        | 16:9 (capa) |

> Recomendação: começar com 5 abas fortes (Tudo · Reels & Vídeo · Carrossel · Paper · Landing & Site) e adicionar Newsletter/Design/Blog conforme o material for taggeado. Reusar/estender os 8 `CATEGORY_FILTERS` que JÁ existem em `src/app/cases/page.tsx` (cripto, video, design, conteudo, web, lancamentos, ia, evento) em vez de inventar do zero — eles já cobrem boa parte.

### 2.4. Chips secundários
- **Cliente** (multiselect): derivado de `casesData` (22) — Investidor 4.20, Neobankless, DSEC/Alfred, Hugo Doria, Paradigma, Bit das Minas, Buenas Ideias, Layla Foz, Defiverso, Crypto.com, Mercado Bitcoin, Ledger etc.
- **Nicho**: Cripto & Web3 · Fintech · Educação · Influencer/KOL · SaaS/Produto · Evento.

### 2.5. Card de peça (o que mostra)
- **Thumb** (poster do vídeo / imagem / capa do paper / screenshot da landing) com aspect nativo do formato.
- **Badge de formato** (canto: ▶ vídeo + duração, 🎠 carrossel + nº slides, 📄 paper + páginas, ✉ newsletter).
- **Cliente** (nome + tag de nicho). Opcional: logo do cliente.
- **Título/legenda** curta (frase impactante do case ou título da peça).
- **Métrica de destaque** quando houver (ex: "20M+ views", "200% faturamento", "600+ participantes") — reusar `fraseImpactante`/`metricas` do case.
- **Link**: clique → modal de preview (vídeo inline, galeria de imagens, capa do paper) OU deep-link pra `/cases/<id>` (case completo) / `/papers/<slug>` (gate) / link externo (`externalLink`).

### 2.6. Modal de detalhe
Reusar o modal que JÁ existe em `/cases/page.tsx` (`modalCase` + carrossel de imagens + vídeo). Estender pra:
- tocar vídeo inline (já tem poster),
- galeria de imagens (carrossel),
- card de paper (capa + CTA "ler"),
- botão "ver case completo" → `/cases/<id>` quando o cliente tem página roteada (`ROUTED_CASE_IDS`).

---

## 3. Fonte de dados sugerida

### 3.1. Recomendação: NOVO arquivo agregador `src/lib/portfolio-data.ts`
NÃO reescrever `case-data.ts`. Criar um agregador que **deriva** itens de peça das fontes existentes,
para que o portfólio fique sempre em sincronia com cases/papers/blog sem duplicar conteúdo.

```ts
// src/lib/portfolio-data.ts
export type PortfolioFormat =
  | "reel" | "video" | "carousel" | "paper" | "playbook"
  | "newsletter" | "landing" | "design" | "blog" | "post";

export interface PortfolioItem {
  id: string;                 // estável: `${source}:${clientId}:${idx}`
  client: string;             // nome do cliente (de casesData.nome)
  clientId: string;           // casesData.id
  format: PortfolioFormat;
  niche: string[];            // derivado das tags do case
  title: string;              // fraseImpactante | título da peça
  thumb: string;              // poster | src de imagem | cover do paper
  aspect: "9/16" | "4/5" | "16/9" | "3/4" | "1/1";
  metric?: string;            // "20M+ views" etc
  href: string;               // /cases/<id> | /papers/<slug> | externalLink | modal
  mediaType: "image" | "video" | "pdf";
  src?: string;               // pra preview no modal
  featured?: boolean;
}

export function getPortfolioItems(): PortfolioItem[] { /* agrega das 3 fontes */ }
```

### 3.2. Como popular (3 fontes, todas já existem)
1. **Cases** → `src/lib/case-data.ts` (`getAllCases()`): explodir o array `media[]` de cada case em
   itens de peça. `type=video` → format `reel`/`video`; sequência de `type=image` → `carousel`/`design`;
   `type=pdf` → `paper`. Herdar `client`, `niche` (das `tags`), `metric` (`fraseImpactante`), `href` (`/cases/<id>` se roteado, senão `externalLink`).
2. **Papers** → `src/lib/papers-data.ts` (`papers[]`): cada paper/playbook vira 1 item format `paper`/`playbook`,
   thumb = `cover`, href = `/papers/<slug>`. Pular `hidden:true`.
3. **Blog** → `src/lib/blog-cases.generated.ts` (21 estudos): cada um vira item format `blog`, href = `/blog/<slug>`.
   (Opcional na v1 — pode ficar para v2.)

### 3.3. Pré-requisito de mídia: thumbnails
Reels/vídeos JÁ têm posters em `public/Cases/<cliente>/conteudo/posters/`. Para landings/sites
(cases de Desenvolvimento Web hoje sem screenshot) será preciso gerar screenshots — material a produzir.

---

## 4. Inventário disponível hoje (mapeado nas categorias)

### 4.1. Cases (22 em `case-data.ts`) → mídia: 78 imagens + 36 vídeos + 3 PDFs
Por nicho/formato dominante:

**Reels & Vídeo** (peças de vídeo com poster):
- Bit das Minas — 6 reels (148M de mídia, o maior acervo)
- Investidor 4.20 — vídeos Defifest (121M)
- Layla Foz — reels + capas (97M, "20M+ views")
- Paradigma — vídeo/motion/podcast (51M)
- Neobankless — vídeo + site + social (31M)
- Buenas Ideias (26M), Alfred (21M), Yasmin (17M), Ledger (12M)

**Carrossel & Design**:
- Defifest — design de evento (banners, motions, transições)
- Ledger — design hardware cripto
- Paradigma — design/animação
- Crypto.com, Mercado Bitcoin — social media/design

**Paper & Educação** (cases com PDF):
- Yasmin — material educacional PDF
- (+ os papers reais, ver 4.2)

**Newsletter**:
- Layla Foz, Defiverso, Neobankless, DSEC/Alfred (tags Newsletter/E-mail Marketing)

**Landing & Site / SaaS** (cases "Desenvolvimento Web", hoje sem case publicado → "Em breve"):
- Kaleidos Pay, KAI Platform, DeFi Radar, DePay, NBS, Jornal Cripto, Defiverso (site)

**Cripto & Conteúdo / Social**:
- DSEC (segurança Bitcoin), Alfred (Twitter+IA), Crypto.com, Mercado Bitcoin, Hugo Doria (IA/dev)

> Pastas de mídia em `public/Cases/`: alfred, bit-das-minas, buenas-ideias, castacrypto, crypto-com, defiverso, dsec, hugo-doria (vazia — 0B), investidor-4-20, jornal-cripto, kast, layla-foz, ledger, lucas-amendola, mercado-bitcoin, neobankless, paradigma, parfin, tech-portfolio, vault, yasmin.
> ⚠️ `hugo-doria/` está vazia (0B) e `kast`/`parfin`/`vault` são pequenas (20-28K) — verificar se têm peça real antes de incluir.

### 4.2. Papers & Playbooks (`papers-data.ts` + `public/papers/`)
PDFs reais publicados:
- **Vol. 01 — Hyperliquid** · **Vol. 02 — Pudgy Penguins** · **Vol. 03 — Solana** · **Vol. 04 — Base** · **Vol. 05 — Pump.fun**
- **Playbook Cripto 2026** · **Playbook TGE 2026**
- **Especial — Bull Market 2026** (`hidden:true` → não listar no portfólio público)
- (`lead-ib-tokenizacao.pdf` é comercial/prospect → não listar)

Fonte adicional rica: `code/kaleidos-papers/` (projeto-fábrica) tem drafts e papers extras (ethena, jupiter, momentum-diogo etc.) — mas o que está PUBLICADO e gated no site é o que está em `papers-data.ts`. Usar só esses no portfólio.

### 4.3. Blog (`blog-cases.generated.ts`) — 21 estudos de caso web3
19 categoria "cripto" + 2 "growth". Ex: Bitcoin, Hyperliquid, Notcoin/Hamster, Polymarket, Friend.tech,
Ethena, Celestia, Jupiter, Base, Solana, Pump.fun, Kaito, Arbitrum, Berachain, Uniswap, Optimism, TRON, Story Protocol.
→ Aba "Blog & Conteúdo" (opcional v1, recomendado v2). Já têm página `/blog/<slug>` e capas em código.

### 4.4. Resumo numérico (stats pro hero)
- **22** cases · **~117** peças de mídia (78 img + 36 vídeo + 3 pdf) · **7** papers/playbooks públicos · **21** posts de blog.
- → Hero: algo como "**+150 peças · 22 clientes · 8 formatos**".

---

## 5. Plano de implementação (passos para o próximo agente)

1. **Criar `src/lib/portfolio-data.ts`** com o tipo `PortfolioItem` e `getPortfolioItems()` que agrega:
   (a) `getAllCases()` explodindo `media[]`, (b) `papers` não-`hidden` e não-comerciais, (c) opcional `blog-cases.generated.ts`.
   Inferir `format` a partir de `media.type` + `tags` do case; inferir `aspect` a partir do formato (tabela §2.3); herdar `metric` de `fraseImpactante`.
2. **Definir taxonomia de filtro** reusando os `CATEGORY_FILTERS` de `src/app/cases/page.tsx` (não duplicar) + adicionar abas de FORMATO novas (Paper, Newsletter, Landing).
3. **Criar rota `src/app/portfolio/page.tsx`** (client component, espelhar a estrutura de `cases/page.tsx`):
   hero curto + abas de formato + chips de cliente/nicho + busca + grade masonry + modal.
4. **Componente `PortfolioCard`**: aplicar aspect nativo por formato (copiar `ASPECT_BY_FORMAT` de `biblioteca-viral/components/content-card.tsx`), badge de formato/duração/páginas, cliente, título, métrica.
5. **Modal de preview**: estender o modal já existente em `cases/page.tsx` para tocar vídeo inline, galeria de imagens, e card de paper (capa + CTA). Deep-link "ver case completo" → `/cases/<id>` para `ROUTED_CASE_IDS`.
6. **Grade masonry**: CSS columns ou grid com `grid-auto-rows`; respeitar aspect por card (efeito biblioteca).
7. **i18n**: usar `useI18n()` (PT/EN) como o resto do site; labels de formato/nicho em ambos idiomas.
8. **Thumbnails faltantes**: gerar screenshots das landings/sites (cases de Desenvolvimento Web) e posters de vídeos sem poster. Tarefa de mídia, paralela.
9. **Link na navegação**: adicionar `/portfolio` ao header. Decidir relação com `/cases`:
   recomendação → `/cases` vira "Cases" (storytelling) e `/portfolio` vira "Portfólio" (vitrine de peças); ou fundir `/cases` como uma aba dentro de `/portfolio`. **Decisão do Gabriel.**
10. **SEO/GEO**: metadata + JSON-LD `CreativeWork`/`ItemList`; reusar helpers de `src/lib/seo-helpers.ts`.
11. **Não fazer deploy** sem OK do Gabriel (guardrail). Build TEM que passar antes de qualquer push.

### Estimativa de esforço
- v1 (cases + papers, abas formato + cliente, modal reusado): ~1 sessão.
- v2 (blog, busca, screenshots de landings, nicho refinado): +1 sessão.

---

## 6. Decisões pendentes para o Gabriel
1. **`/cases` vs `/portfolio`**: coexistem (Cases=narrativa, Portfólio=peças) ou fundem?
2. **Blog na grade do portfólio?** (recomendo v2).
3. **Mostrar métricas nos cards** (20M views, 200% etc.) publicamente? (recomendo sim — é o diferencial).
4. **Screenshots de landings/sites**: gerar agora ou listar como "Em breve" igual hoje em `/cases`?
5. **Incluir pastas pequenas/vazias** (hugo-doria 0B, kast, parfin, vault)? Verificar material real antes.
