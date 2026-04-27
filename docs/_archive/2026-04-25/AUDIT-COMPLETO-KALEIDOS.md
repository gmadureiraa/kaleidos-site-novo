# Auditoria Completa — Site Kaleidos Digital

**Data:** 2026-04-11  
**URL:** https://kaleidos.com.br  
**Stack:** Next.js 15.3.6, React 19, Tailwind CSS 4, Framer Motion, Embla Carousel  
**Deploy:** Vercel

---

## 1. Auditoria de SEO

### 1.1 Meta Tags (Nota: 7/10)

**Pontos positivos:**
- Title e description definidos no `layout.tsx` (linha 56-57)
- Open Graph completo com imagem, locale `pt_BR`, type `website`
- Twitter Cards configurados com `summary_large_image`
- `lang="pt-BR"` no HTML root
- `robots` com index/follow e googleBot configurado
- Canonical URL definida via `alternates`
- Cada página de serviço, case e blog tem metadata via `generateMetadata()` em layouts dedicados

**Problemas encontrados:**

| Problema | Arquivo | Linha | Severidade |
|----------|---------|-------|------------|
| Verification codes placeholder (`your-google-verification-code`) | `src/app/layout.tsx` | 119-121 | ALTA |
| Title generico demais ("Marketing e Conteudo") - nao menciona cripto/web3 | `src/app/layout.tsx` | 56 | MEDIA |
| Description nao menciona IA como diferencial | `src/app/layout.tsx` | 57 | MEDIA |
| OG title diferente do page title (inconsistencia) | `src/app/layout.tsx` | 85 vs 56 | BAIXA |
| `manifest.json` referenciado mas nao confirmado se existe | `src/app/layout.tsx` | 123 | BAIXA |

**Antes/Depois — Title:**
- **Antes:** `Kaleidos Digital - Marketing e Conteudo | Crescimento de Marcas`
- **Depois:** `Kaleidos Digital | Marketing Cripto & Web3 com IA | Agencia de Conteudo e Growth`

**Antes/Depois — Description:**
- **Antes:** `Especialistas em crescimento de marcas atraves de conteudo criativo, automacoes inteligentes e lancamentos estrategicos.`
- **Depois:** `Agencia de marketing digital especializada em cripto, DeFi e Web3. Conteudo criativo com IA, automacoes inteligentes e lancamentos que viralizam. Cases: Crypto.com, Mercado Bitcoin, Ledger.`

### 1.2 Sitemap (Nota: 8/10)

O sitemap (`src/app/sitemap.ts`) esta bem implementado:
- Paginas principais com prioridades corretas (home=1, cases=0.9, blog=0.9)
- Servicos incluidos (priority 0.8)
- Cases dinamicos via `getAllCases()`
- Blog posts dinamicos via `blogPosts`

**Problemas:**
- Falta a pagina `/portfolio` no sitemap
- Falta a pagina `/manifesto` no sitemap
- Falta a pagina `/contato` referenciada como pagina separada (ja esta — OK)
- `lastModified: now` em todas as paginas e impreciso — deveria usar datas reais

### 1.3 Hierarquia de Headings (Nota: 6/10)

| Pagina | H1 | Problemas |
|--------|-----|-----------|
| Home (`page.tsx`) | Dentro de `HeroKaleidos` como "Kaleidos Digital" | OK, mas e split entre logo+texto |
| Blog | "Blog" | Muito generico, sem keywords |
| Cases | Via i18n `t('casesList','title')` | OK |
| Sobre | Via i18n `t('about','heroTitle')` | OK |
| Servicos/Marketing | "Kaleidos Content" | Falta keywords de SEO |
| Servicos/IA | "Kaleidos AI" | Falta keywords de SEO |
| Servicos/Growth | "Kaleidos Growth" | Falta keywords de SEO |
| Manifesto | "Gire o angulo. Mude o padrao." | Sem keywords |

**Problemas criticos:**
- H1 das paginas de servicos sao apenas nomes internos ("Kaleidos Content") sem keywords relevantes
- Nao ha H1 visivel e semantico claro na homepage — o componente `HeroKaleidos` usa H1 mas combina logo + texto
- Blog H1 e apenas "Blog" — deveria ser "Blog | Marketing Digital, IA e Cripto"

### 1.4 Image Alt Tags (Nota: 8/10)

- 38 ocorrencias de `alt=` encontradas, nenhuma vazia (`alt=""`)
- Boas praticas: `alt="Kaleidos Logo"`, `alt="Equipe Kaleidos"`, `alt="Kaleidos Content - Conteudo em Acao"`
- Na pagina de marketing-conteudo, imagens no carousel usam `alt="Trabalho de edicao e design"` — generico demais, deveria descrever o cliente/tipo

### 1.5 Estrutura de URLs (Nota: 9/10)

Excelente estrutura:
- `/servicos/marketing-conteudo` — descritivo e hierarquico
- `/servicos/ia-automacoes` — bom
- `/servicos/growth-lancamentos` — bom
- `/cases/mercado-bitcoin` — slugs claros
- `/blog/[slug]` — URLs amigaveis

**Unico problema:** Sem pagina indice `/servicos` — o usuario nao consegue acessar uma lista de todos os servicos.

### 1.6 Internal Linking (Nota: 7/10)

**Positivo:**
- Navbar com links para todas as paginas principais
- Footer com links completos (servicos, navegacao, contato)
- CTAs linkando para `/contato` e WhatsApp
- Bento Grid na home linka para paginas de servicos

**Problemas:**
- Nao ha breadcrumbs nas paginas internas (helpers existem em `seo-helpers.ts` mas nao sao usados)
- Blog posts nao linkam para servicos relacionados
- Cases nao linkam para servicos prestados no case
- Nao ha links internos entre posts do blog (related posts)
- Pagina Manifesto e quase orfaa — so acessivel via navbar (link menos visivel, `text-white/60`)

### 1.7 Schema.org / JSON-LD (Nota: 8/10)

**Implementado:**
- `Organization` schema no `structured-data.tsx` — com serviceType, sameAs, offerCatalog
- `Service` schema em cada pagina de servico via `generateServiceSchema()`
- `FAQPage` schema no FAQ da home via `generateFAQSchema()`
- `Article` schema helper existe em `seo-helpers.ts`
- `CaseStudy` schema helper existe
- `BreadcrumbList` schema helper existe

**Problemas:**
- `CaseStudy` usa `@type: "CaseStudy"` que NAO e um tipo valido do Schema.org — deveria ser `Article` ou `CreativeWork`
- Breadcrumb schema nao e utilizado em nenhuma pagina
- Falta `LocalBusiness` ou `ProfessionalService` schema (mais relevante que `Organization` para agencia)
- Falta `WebSite` schema com `potentialAction` para search
- Blog posts usam o helper mas precisa confirmar implementacao

### 1.8 Performance (Nota: 6/10)

**Preocupacoes identificadas:**

| Problema | Impacto | Local |
|----------|---------|-------|
| **TODAS as pages sao "use client"** — 23 arquivos page.tsx | ALTO | Todo o `src/app/` |
| Framer Motion carregada em todas as paginas | ALTO | Todo o site |
| Videos `.mp4` servidos da pasta `/public` sem CDN/streaming | ALTO | `servicos/marketing-conteudo` |
| 3 fontes customizadas carregadas (Atelier, Inter Variable, Gridlite) | MEDIO | `layout.tsx` |
| Preload de 2 fontes TTF no head | MEDIO | `layout.tsx` L135-148 |
| OrbitingCircles, AnimatedBeam, IconCloud — 3 componentes animados pesados na home | MEDIO | `process-section.tsx` |
| `useEffect` com `setInterval` para autoplay em carousels | BAIXO | Paginas de servicos |
| Sharp instalado para otimizacao de imagens (bom) | POSITIVO | `package.json` |
| Image optimization com WebP/AVIF habilitado | POSITIVO | `next.config.ts` |

**Problema critico:** Todas as paginas sao Client Components (`"use client"`). Isso significa que o React bundle inteiro e enviado ao cliente antes de qualquer render. A homepage, por exemplo, poderia ser um Server Component com sub-componentes client isolados.

### 1.9 Mobile-Friendliness (Nota: 8/10)

**Positivo:**
- Touch targets minimos de 44px definidos no CSS global
- Safe area insets configurados
- Menu mobile implementado com toggle
- `font-size: 16px` no mobile (previne zoom no iOS)
- `font-display: swap` em todas as fontes
- Responsive breakpoints consistentes (sm, md, lg)

**Problemas:**
- Carousel de cards flip na pagina IA depende de `onMouseEnter/Leave` — nao funciona em touch
- Team cards na pagina Sobre usam hover para flip — inacessivel em mobile
- Landscape orientation tem estilos mas hero sections podem ficar apertadas

### 1.10 Keywords Alvo (10 termos recomendados)

| # | Keyword | Volume Est. | Dificuldade | Presente no Site? |
|---|---------|------------|-------------|-------------------|
| 1 | agencia marketing cripto brasil | Alto | Media | Parcial (falta no title) |
| 2 | marketing digital web3 | Alto | Media | Parcial |
| 3 | agencia conteudo cripto | Medio | Baixa | Nao |
| 4 | automacao marketing ia | Alto | Alta | Sim |
| 5 | lancamento digital cripto | Medio | Baixa | Parcial |
| 6 | conteudo para fintech | Medio | Baixa | Nao |
| 7 | growth hacking cripto | Medio | Media | Parcial |
| 8 | agencia marketing defi | Baixo | Baixa | Nao |
| 9 | marketing conteudo blockchain | Medio | Baixa | Nao |
| 10 | social media cripto agencia | Medio | Baixa | Nao |

**Acao:** Incorporar esses termos nos titles, descriptions, H1s e corpo de texto das paginas de servico.

---

## 2. Auditoria de Copy / Conteudo

### 2.1 Homepage Headline (Nota: 7/10)

**Headline atual:** "Criamos conteudo que realmente constroi atencao."  
**Subheadline:** "Estrategia, conteudo e growth para projetos cripto, DeFi e Web3 que levam o proprio trabalho a serio."

**Analise:**
- Headline e boa — comunica valor e posicionamento
- "Constroi atencao" e um angulo interessante e diferenciado
- Falta urgencia ou prova social na headline
- Subheadline e forte — segmenta claramente o publico
- Badge "Agencia nativa do mercado cripto" acima da headline e excelente

**10 alternativas para a headline da homepage:**

1. "Sua marca cripto merece conteudo que o mercado nao consegue ignorar."
2. "Marketing que faz projetos cripto serem levados a serio."
3. "A agencia que entende cripto de verdade — e transforma isso em crescimento."
4. "Conteudo, estrategia e growth para quem constroi o futuro da web3."
5. "De conteudo generico a marca referencia. Para projetos cripto que querem mais."
6. "Marketing digital para projetos cripto que querem ser lembrados."
7. "Cripto precisa de marketing de verdade. A Kaleidos entrega."
8. "Conteudo que viraliza. Lancamentos que vendem. Growth que escala."
9. "A unica agencia que nasceu dentro do mercado cripto."
10. "30M+ views. 20+ projetos. 500+ videos. Marketing cripto com resultados reais."

### 2.2 Value Proposition (Nota: 7/10)

A proposta de valor esta clara mas dispersa:
- **Hero:** Agencia nativa cripto + conteudo que constroi atencao
- **Bento Grid:** 4 servicos claros (Content, AI, Criacao, Sites/Growth)
- **Process Section:** 3 etapas do processo
- **CTA Ajuda:** 12 servicos selecionaveis

**Problema:** A transicao Hero (escuro) -> TrustedBy -> BentoGrid (claro) muda o tema visual abruptamente. O usuario passa de preto para branco sem transicao.

### 2.3 CTAs (Nota: 8/10)

| CTA | Texto | Localizacao | Analise |
|-----|-------|-------------|---------|
| Hero primario | "Ver Nosso Trabalho" | Topo da home | Bom, mas nao e conversao direta |
| Hero secundario | "Falar Conosco" | Topo da home | Bom, scroll para CTA section |
| Navbar | "Falar Conosco" | Todas as paginas | Verde #7CFF6B, visivel |
| CTA Ajuda | "Enviar Mensagem" (WhatsApp) | Mid-page home | Excelente — interativo com selecao de servicos |
| Footer | "Falar Conosco" | Todas as paginas | Bom, redundante mas necessario |
| Servicos | "Comecar agora" / "Quero Conteudo Assim" | Paginas de servico | Bons CTAs de acao direta |

**Problema:** O CTA principal da hero ("Ver Nosso Trabalho") leva para /cases, nao para conversao. Deveria ter um CTA de conversao direta (WhatsApp ou formulario) como primario.

**Sugestao de melhoria:**
- Primario: "Quero um Orcamento" (WhatsApp)
- Secundario: "Ver Nosso Trabalho" (cases)

### 2.4 Descricoes de Servicos (Nota: 7/10)

**Marketing de Conteudo (`/servicos/marketing-conteudo`):**
- Headline "Kaleidos Content" — sem SEO value
- Subheadline boa: "Conteudo que faz sua audiencia parar e pensar"
- WordRotate animacao e criativa mas pode confundir screen readers
- Metricas inline (500+ videos, 30M+ views, 600+ designs) — excelente social proof
- **Sugestao headline:** "Marketing de Conteudo para Cripto e Web3 | Kaleidos Content"

**IA e Automacoes (`/servicos/ia-automacoes`):**
- `AIStateLoading` animacao e cool mas nao comunica valor imediatamente
- Cards flip sao criativos para Problema->Solucao
- Falta demonstracao concreta de resultados (ROI, tempo economizado)
- **Sugestao headline:** "Automacoes com IA que Economizam 20h/Semana | Kaleidos AI"

**Growth e Lancamentos (`/servicos/growth-lancamentos`):**
- `ShapeHero` background animacao e visualmente impressionante
- Metricas fortes: 20+ lancamentos, 200% aumento medio, 98% taxa sucesso
- Segundo bloco nao traduz corretamente para ingles (HTML tags aparecem no texto EN na linha 224)
- **Sugestao headline:** "Lancamentos que Viralizam e Vendem | Kaleidos Growth"

### 2.5 Cases (Nota: 7/10)

- 15 cases listados com ordem customizada
- Cards com cores distintas por case (rosa, verde, preto, branco)
- Tags e frase de impacto em cada card
- Suporte bilingue (PT/EN)

**Problemas:**
- Pagina de cases nao tem descricao/intro — vai direto para o grid
- Falta filtro por tipo de servico (Content, Growth, IA)
- Nao ha numeros de resultado visivel nos cards (views, crescimento)
- Modal de galeria usa DOM manipulation direto (`document.createElement`) — anti-pattern React

### 2.6 Blog (Nota: 8/10)

- Design clean e funcional
- Filtro por categoria (Marketing, IA, Cases, Growth, Cripto)
- Newsletter integrada
- Posts com tempo de leitura, data, categoria
- 2 highlights + grid de 3

**Problemas:**
- Textos sem acentos ("automacoes" em vez de "automacoes") — intencional?
- Newsletter sem confirmar LGPD/opt-in compliance
- Falta pagination para quando houver mais posts
- Falta schema Article nos posts individuais (confirmar implementacao)

### 2.7 Pagina Sobre (Nota: 6/10)

**Pontos positivos:**
- Historia da empresa em 3 paragrafos concisos
- Equipe com cards flip e redes sociais
- Valores em grid de 6
- Metricas de resultado
- CTA final forte

**Problemas:**
- Historia muito generica: "nasceu da paixao por criar conteudo" — falta a narrativa real (quando, como, primeiro cliente cripto, momento de virada)
- Valores sao cliches ("Criatividade Sem Limites", "Excelencia em Tudo") — nao diferenciam
- Todos os 6 valores usam o mesmo icone (Sparkles) — visual repetitivo
- Cards da equipe mostram "Passe o mouse" — nao funciona em mobile
- Links de redes sociais da equipe parecem genericos (confirmar se sao URLs reais)
- Delays de animacao vao ate 4.7s — usuario espera muito para ver conteudo final

**Sugestoes de headline para Sobre:**
- **Antes:** (i18n, nao vi o texto exato — provavelmente algo como "Sobre a Kaleidos")
- **Depois:** "Nascemos dentro do cripto. Entendemos o mercado porque vivemos ele."

### 2.8 Manifesto (Nota: 9/10)

A pagina manifesto e a melhor pagina de copy do site:
- "Gire o angulo. Mude o padrao." — headline memoravel
- Storytelling fluido com blocos progressivos
- "Somos arquitetos de percepcao" — posicionamento forte
- Design minimalista que deixa o texto brilhar
- Gradient verde-rosa na headline — on-brand

**Problema:** So em portugues (sem i18n). E a unica pagina assim.

---

## 3. Auditoria de Frontend / Design

### 3.1 Consistencia Visual (Nota: 7/10)

**Paleta de cores:**
- Verde principal: `#7CFF6B` — usado consistentemente em CTAs, badges, destaques
- Preto: backgrounds das secoes hero e footers
- Branco: backgrounds das secoes de conteudo
- Rosa: `#ec4899` (focus states), rosa da marca (cards de cases)

**Inconsistencias:**
- Homepage alterna entre preto (hero) e branco (bento grid, process) sem padrao claro
- Blog e 100% dark (bg-black)
- Sobre e 100% light (bg-white)
- Manifesto e 100% dark
- Servicos: Marketing=light, IA=dark, Growth=light — sem padrao
- **Sugestao:** Definir regra clara — hero sempre dark, conteudo sempre light, ou vice-versa

### 3.2 Tipografia (Nota: 8/10)

3 fontes bem definidas:
- **Atelier** (`font-display`): Titulos — serif, elegante
- **Inter Variable** (`font-sans`): Corpo — modern, legivel
- **Gridlite** (`font-accent`): Destaque — usada raramente

**Problemas:**
- `font-mono` aponta para Inter em vez de uma fonte mono real — confuso semanticamente
- `.atelier-font` definida no CSS separada de `.font-display` — redundancia
- Gridlite nao e usada de forma significativa — considerar remover para economizar bytes

### 3.3 Sistema de Cores (Nota: 7/10)

O CSS usa variaveis OKLCH para o sistema de cores (via Tailwind 4 + shadcn):
- `:root` (light) e `.dark` definidos
- Variaveis semanticas: `--primary`, `--secondary`, `--muted`, etc.
- **Problema:** O site nao tem dark mode toggle — as variaveis `.dark` existem mas nao sao usadas pelo usuario
- Cores hardcoded em muitos componentes (`bg-[#7CFF6B]`, `text-[#ff9066]`, `bg-pink-500`) em vez de usar design tokens

### 3.4 Espacamento e Ritmo (Nota: 7/10)

- Sections usam `py-16` a `py-24` — razoavelmente consistente
- Max-width varia: `max-w-5xl`, `max-w-6xl`, `max-w-7xl`, `max-w-4xl` — sem padrao unico
- Grid gaps sao `gap-6` a `gap-12` — variacao aceitavel

### 3.5 Animacoes (Nota: 6/10 — EXCESSO)

**Problemas graves:**
- Framer Motion em TODAS as paginas via `"use client"` — bundle size enorme
- Pagina Sobre tem delays ate **4.7 segundos** (linha 520-530) — conteudo demora a aparecer
- `motion.div` wrapper em praticamente todo componente — overhead desnecessario
- TypingCodeFeature no Bento Grid roda continuamente com `setTimeout` + reset a cada 7s
- OrbitingCircles, AnimatedBeam, IconCloud — 3 animacoes pesadas simultaneas na homepage
- Autoplay de carousel com `setInterval` em 3s — potential memory leak se componente nao cleanup

**Positivo:**
- `useAnimationOptimization` hook existe — respeita preferencias de reduced motion
- `viewport: { once: true }` usado em `whileInView` — nao re-anima ao scrollar

**Recomendacao:** Reduzir animacoes em 50%. Usar CSS transitions onde possivel em vez de Framer Motion.

### 3.6 Reusabilidade de Componentes (Nota: 8/10)

Boa estrutura:
- `FooterDemo` reutilizado em todas as paginas
- `CardFlip` reutilizado entre IA e Growth
- `Carousel` (shadcn/Embla) reutilizado
- `useI18n` hook para i18n consistente
- `useAnalytics` hook para tracking
- `KALEIDOS_METRICS` centralizado em `lib/metrics.ts`
- `WHATSAPP_NUMBER` centralizado em `lib/constants.ts`

### 3.7 Dark/Light Mode (Nota: 4/10)

- Variaveis CSS para dark mode definidas em `globals.css`
- Tailwind dark variants usadas em alguns componentes (`dark:bg-neutral-900`)
- **Nao ha toggle de tema** — o usuario nao pode escolher
- O site usa temas mistos por pagina (hero dark, conteudo light) manualmente — nao e dark mode real
- `suppressHydrationWarning` no `<html>` sugere que houve plano para theme switching

### 3.8 Responsividade (Nota: 8/10)

Boa implementacao geral:
- Breakpoints `sm`, `md`, `lg` usados consistentemente
- Grid layouts adaptam de 1 a 3 colunas
- Menu mobile com toggle
- Touch targets de 44px minimos
- Safe area insets configurados

**Problemas:**
- Cards flip da equipe dependem de hover — quebrado em mobile
- Carousel navigation arrows escondidos em mobile (`hidden md:flex`)
- Modal de galeria nos cases usa DOM manipulation nativa — pode ter problemas de Z-index em mobile

### 3.9 Performance de Carregamento (Nota: 5/10)

**Issues criticos:**

1. **Todas as paginas sao Client Components** — Zero SSR/SSG real
   - Home, Blog, Cases, Sobre, Servicos — tudo `"use client"`
   - Isso significa: bundle JS completo enviado, hydration obrigatoria, sem streaming
   
2. **Videos MP4 no public/** — sem CDN de video, sem lazy loading de video
   - 14 videos na pagina de marketing-conteudo
   - Carregam com `autoPlay loop muted playsInline` — todos de uma vez

3. **3 fontes customizadas** — 2 preloaded (Atelier TTF + Inter Variable TTF)
   - Fontes TTF nao sao ideais — WOFF2 seria mais leve

4. **Framer Motion full bundle** — `optimizePackageImports` habilitado (bom) mas ainda e pesado

**Positivo:**
- Sharp para otimizacao de imagens
- WebP/AVIF habilitados
- Cache headers para assets estaticos (1 ano)
- `compress: true` no next.config
- `poweredByHeader: false` (seguranca)

### 3.10 Acessibilidade (Nota: 7/10)

**Positivo:**
- `SkipToContent` implementado
- `role="main"` na homepage
- `role="navigation"` na navbar
- `aria-label` em 50 ocorrencias
- `aria-expanded` no menu mobile
- `aria-pressed` nos botoes de idioma
- Focus states visiveis (`outline: 2px solid #ec4899`)
- `:focus:not(:focus-visible)` remove outline para mouse users
- FAQ tem `aria-expanded`, `aria-controls`, `aria-labelledby`

**Problemas:**
- Focus color (`#ec4899` rosa) pode nao ter contraste suficiente em fundo preto
- WordRotate animacao pode confundir screen readers
- Cards flip nao tem alternativa para keyboard navigation
- Textos `text-gray-500` sobre `bg-black` podem ter contraste insuficiente (ratio < 4.5:1)
- Botoes de modal usam emoji "x" em vez de icone acessivel
- Videos autoplay sem controles de pausa acessiveis

---

## 4. Plano de Melhorias Priorizado

### Quick Wins (1-2 horas cada)

| # | Acao | Arquivo | Impacto |
|---|------|---------|---------|
| 1 | **Substituir verification codes placeholder** por codigos reais ou remover | `src/app/layout.tsx` L119-121 | **Alto** — Google ve como placeholder |
| 2 | **Atualizar title e description** do layout com keywords cripto/web3/IA | `src/app/layout.tsx` L56-57 | **Alto** — SEO imediato |
| 3 | **Adicionar /portfolio e /manifesto ao sitemap** | `src/app/sitemap.ts` | **Medio** — Indexacao |
| 4 | **Corrigir bug de traducao** na pagina Growth (HTML tags aparecem no texto EN) | `src/app/servicos/growth-lancamentos/page.tsx` L224 | **Medio** — UX para usuarios EN |
| 5 | **Trocar CTA hero primario** de "Ver Nosso Trabalho" para "Quero um Orcamento" | `src/components/ui/hero-kaleidos.tsx` L135-143 | **Alto** — Conversao |
| 6 | **Adicionar texto alternativo** para "Passe o mouse" nos cards de equipe (mobile fallback) | `src/app/sobre/page.tsx` L294 | **Medio** — UX mobile |
| 7 | **Reduzir delays de animacao** na pagina Sobre (max 1.5s em vez de 4.7s) | `src/app/sobre/page.tsx` | **Medio** — UX percebida |
| 8 | **Adicionar `<h1>` com keywords** nos servicos: "Marketing de Conteudo para Cripto" etc. | Paginas de servico | **Alto** — SEO |
| 9 | **Adicionar description/intro** na pagina de cases antes do grid | `src/app/cases/page.tsx` | **Medio** — SEO + UX |
| 10 | **Corrigir schema `CaseStudy`** para `Article` ou `CreativeWork` | `src/lib/seo-helpers.ts` L127 | **Medio** — SEO |

### Esforco Medio (1-2 dias cada)

| # | Acao | Impacto |
|---|------|---------|
| 1 | **Converter paginas para Server Components** — Home, Cases, Blog listagem podem ser SSR com sub-componentes client | **Alto** — Performance, SEO, Core Web Vitals |
| 2 | **Implementar breadcrumbs** usando o helper existente `generateBreadcrumbSchema()` | **Alto** — SEO + UX + Schema |
| 3 | **Adicionar related posts** no blog e links internos entre conteudos | **Alto** — SEO (internal linking) |
| 4 | **Converter fontes TTF para WOFF2** para reducao de tamanho (~40% menor) | **Medio** — Performance |
| 5 | **Criar pagina index `/servicos`** listando os 3 servicos | **Medio** — SEO + navegacao |
| 6 | **Implementar lazy loading para videos** — carregar apenas quando visivel | **Alto** — Performance |
| 7 | **Adicionar `WebSite` schema** com SearchAction | **Medio** — SEO |
| 8 | **Traduzir pagina Manifesto** para ingles via i18n | **Medio** — UX internacional |
| 9 | **Reescrever valores na pagina Sobre** — substituir cliches por diferenciais reais | **Medio** — Branding |
| 10 | **Adicionar filtro por servico** na pagina de Cases | **Medio** — UX |

### Alto Esforco (1 semana+)

| # | Acao | Impacto |
|---|------|---------|
| 1 | **Migrar paginas para Server Components + streaming** — refatorar toda a arquitetura para maximizar SSR | **Alto** — Performance dramatica, SEO |
| 2 | **Implementar blog com CMS** (MDX ou Sanity/Contentful) em vez de dados hardcoded | **Alto** — Escalabilidade, SEO |
| 3 | **Reduzir dependencia de Framer Motion** — substituir animacoes simples por CSS transitions, manter Framer apenas para animacoes complexas | **Alto** — Bundle size, performance |
| 4 | **Implementar sistema de A/B testing** para headlines e CTAs | **Alto** — Conversao |
| 5 | **Adicionar paginas de resultados** por vertical (cripto, fintech, DeFi) com keywords especificos | **Alto** — SEO long-tail |
| 6 | **Implementar formulario de contato** como alternativa ao WhatsApp (captura de leads via Supabase) | **Alto** — Lead generation |
| 7 | **Video hosting dedicado** (Bunny.net, Mux, ou Cloudflare Stream) em vez de MP4 no public | **Alto** — Performance, CDN |

---

## Resumo Executivo

### O que esta muito bom:
- Design visual distinto e profissional — nao parece template generico
- Structured data ja implementado (Organization, Service, FAQ schemas)
- i18n PT/EN funcionando
- Sitemap dinamico
- Analytics (GA + Clarity) integrados
- Metricas centralizadas (`lib/metrics.ts`)
- Boa acessibilidade basica (skip-to-content, ARIA labels, focus states)
- Pagina Manifesto tem copy excepcional

### O que precisa de atencao urgente:
1. **Performance:** Todas as paginas sao Client Components — isso mata Core Web Vitals
2. **SEO Titles:** Faltam keywords cripto/web3/IA nos titles e H1s
3. **Verification codes:** Placeholders expostos no codigo
4. **Videos:** 14 MP4s carregando simultaneamente na pagina de marketing
5. **Animacoes excessivas:** Delays de ate 4.7s escondem conteudo

### Score Geral

| Categoria | Nota | Peso |
|-----------|------|------|
| SEO | 7/10 | 30% |
| Copy/Conteudo | 7/10 | 25% |
| Frontend/Design | 7/10 | 25% |
| Performance | 5.5/10 | 20% |
| **Media Ponderada** | **6.8/10** | |

O site tem uma base solida e design profissional. Os quick wins de SEO e a migracao para Server Components sao as acoes de maior impacto para elevar o score para 8+/10.
