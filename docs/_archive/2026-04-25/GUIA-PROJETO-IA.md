# 📚 Guia Completo do Projeto - Kaleidos Site

> **Documento de referência para IAs** - Contém todas as informações importantes sobre o projeto, estilo, regras, deploy e estrutura. Use este documento para entender rapidamente o projeto e facilitar o desenvolvimento.

---

## 🚀 Informações Básicas do Projeto

### Repositório GitHub
- **URL**: `https://github.com/gmadureiraa/kaleidos-site-novo.git`
- **Branch principal**: `main`
- **Comandos Git**:
  ```bash
  git add -A
  git commit -m "Descrição das mudanças"
  git push origin main
  ```

### Deploy no Vercel
- **Plataforma**: Vercel (deploy automático via GitHub)
- **Configuração**: Cada push para `main` faz deploy automático
- **Arquivo de configuração**: `vercel.json`

### Comandos Locais
```bash
# Desenvolvimento
npm run dev          # Inicia servidor local (porta 3000 ou 3001)

# Build e verificação
npm run build        # Build de produção
npm run build:check  # Verifica build sem gerar arquivos
npm run deploy:check # Verifica se está pronto para deploy

# Linting
npm run lint         # Verifica código com ESLint
```

---

## 🎨 Paleta de Cores Kaleidos

### Cores Principais
- **Rosa (Pink)**: `#EC4899` / `pink-500` / `rgba(236, 72, 153, ...)`
- **Verde (Green)**: `#22C55E` / `green-500` / `rgba(34, 197, 94, ...)` / **#7CFF6B** (verde Kaleidos específico)
- **Preto (Black)**: `#000000` / `black` / `rgba(0, 0, 0, ...)`
- **Branco (White)**: `#FFFFFF` / `white` / `rgba(255, 255, 255, ...)`

### Verde Kaleidos (Cor Especial)
- **Verde Kaleidos**: `#7CFF6B` - Usado para destaques, bordas, textos em fundo preto
- **Aplicação**: Textos, bordas, destaques em cards pretos
- **Classes Tailwind**: Criar classes customizadas ou usar `text-[#7CFF6B]`, `border-[#7CFF6B]`, etc.

### Uso de Cores nas Seções
- **Backgrounds principais**: Preto (`bg-black`)
- **Textos em fundo preto**: Branco ou Verde Kaleidos (`#7CFF6B`)
- **Cards e seções**: Usar combinações de rosa, verde, preto e branco
- **CTAs**: Geralmente branco em fundo preto, ou verde Kaleidos
- **Métricas/Resultados**: Fundo preto com texto verde (`#7CFF6B`)

### Regras Importantes de Cores
- ❌ **NÃO usar cores fora da paleta** (rosa, verde, preto, branco)
- ✅ **SEMPRE seguir a paleta Kaleidos** em novos componentes
- ✅ **Textos em fundo preto**: Usar branco ou verde `#7CFF6B`
- ✅ **Destaques**: Verde `#7CFF6B` é a cor principal de destaque

---

## ✍️ Tipografia

### Fontes do Projeto

1. **Atelier** - Fonte Display (Títulos)
   - Localização: `public/Kaleidos/fonts/Atelier/OpenType-TT/Atelier.ttf`
   - Classe Tailwind: `font-display`
   - Uso: Títulos principais, headlines, logotipo
   - Características: Serif, tracking-tight

2. **Inter Variable** - Fonte Sans (Textos)
   - Localização: `public/Kaleidos/fonts/Inter/Inter-VariableFont_opsz,wght.ttf`
   - Classe Tailwind: `font-sans`
   - Uso: Textos corporais, parágrafos, navegação
   - Características: Sans-serif, pesos 100-900 (variable font)

3. **Gridlite** - Fonte Accent (Destaques)
   - Localização: `public/Kaleidos/fonts/Gridlite/Gridlite.otf`
   - Classe Tailwind: `font-accent`
   - Uso: Call-to-actions, elementos de destaque
   - Características: Personalidade única para destaques

4. **Inter Mono** - Fonte Monospace (Código)
   - Usa Inter como monospace
   - Classe Tailwind: `font-mono`
   - Uso: Código, elementos técnicos

### Tamanhos Recomendados
- **Títulos principais**: `text-4xl` até `text-7xl` com `font-display`
- **Subtítulos**: `text-2xl` até `text-3xl` com `font-display`
- **Textos corporais**: `text-base` até `text-lg` com `font-sans`
- **CTAs**: `text-lg` até `text-xl` com `font-accent` ou `font-sans`

---

## 📁 Estrutura de Arquivos

### Organização Geral
```
kaleidos-site-novo-main/
├── docs/                    # Documentação (novo)
│   ├── GUIA-PROJETO-IA.md   # Este arquivo
│   ├── cases-estudo.txt
│   ├── kaleidos-estudo.txt
│   └── ... (outros docs)
├── scripts/                 # Scripts utilitários
│   ├── build-check.js
│   ├── compress-videos.js
│   ├── optimize-images.js
│   └── test-responsive.js
├── public/
│   ├── Kaleidos/            # Assets gerais da Kaleidos
│   │   ├── fonts/
│   │   ├── imagens/
│   │   ├── logo/
│   │   └── elementos/
│   ├── Cases/               # Conteúdo específico de cada case
│   │   ├── [case-name]/
│   │   │   ├── conteudo/    # Imagens e vídeos
│   │   │   ├── estudo/      # Documentação do case
│   │   │   └── logo/        # Logo do cliente
│   └── Clientes-logo/       # Logos centralizados para "Parceiros que confiam"
├── src/
│   ├── app/                 # Rotas Next.js (App Router)
│   │   ├── page.tsx         # Homepage
│   │   ├── cases/           # Páginas de cases
│   │   ├── servicos/        # Páginas de serviços
│   │   └── ...
│   ├── components/          # Componentes React
│   │   ├── ui/              # Componentes UI base
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internacionalização
│   └── lib/                 # Utilitários e dados
│       ├── case-data.ts     # DADOS DE TODOS OS CASES
│       ├── constants.ts     # Constantes globais
│       └── utils.ts
└── [arquivos de config na raiz]
```

### Arquivos Importantes

#### Dados dos Cases
- **Arquivo**: `src/lib/case-data.ts`
- **Conteúdo**: Todos os dados dos cases (Defiverso, Layla Foz, Mercado Bitcoin, etc.)
- **Estrutura**: Interface `CaseData` com todos os campos
- **⚠️ IMPORTANTE**: Sempre atualizar este arquivo ao adicionar/modificar cases

#### Layout dos Cases
- **Arquivo**: `src/components/ui/case-layout.tsx`
- **Função**: Layout padrão para páginas de cases individuais
- **Funcionalidades**: 
  - Sidebar com navegação por serviços
  - Seções organizadas
  - Scroll suave para seções
  - Formatação markdown (negrito `**text**` e itálico `*text*`)

#### Carousel de Cases
- **Arquivo**: `src/components/ui/case-carousel.tsx`
- **Função**: Carrossel de imagens/vídeos nas páginas de cases
- **⚠️ IMPORTANTE**: Usa `encodeURI()` para vídeos com caracteres especiais

#### Constants
- **Arquivo**: `src/lib/constants.ts`
- **Conteúdo**: 
  - `WHATSAPP_NUMBER`: "12936180547"
  - `SERVICOS`: Array com serviços da Kaleidos

---

## 🎯 Regras e Padrões Importantes

### 1. Estrutura de Pastas `public/`
- ✅ **`public/Kaleidos/`**: Assets gerais (fontes, imagens, logos, elementos)
- ✅ **`public/Cases/[case-name]/`**: Conteúdo específico de cada case
  - `conteudo/`: Imagens e vídeos do case
  - `estudo/`: Documentação markdown e métricas
  - `logo/`: Logo do cliente
- ✅ **`public/Clientes-logo/`**: Logos centralizados para seção "Parceiros que confiam"

### 2. Nomes de Cases
- **Formato**: kebab-case (ex: `defiverso`, `layla-foz`, `mercado-bitcoin`)
- **Rotas**: `/cases/[case-id]` (ex: `/cases/defiverso`)
- **IDs no código**: Mesmo formato kebab-case

### 3. Sistema de Serviços nos Cases
- Cada case tem array `servicos` que define a sidebar de navegação
- Ordem dos serviços deve corresponder à ordem das seções na página
- Função `getServiceSectionId()` mapeia serviços para IDs de seções
- Serviços são clicáveis e fazem scroll suave até a seção correspondente

### 4. Carrosséis e Mídia
- **Vídeos**: Devem usar `encodeURI()` para lidar com caracteres especiais
- **Imagens de métricas**: NUNCA devem aparecer no carrossel "Visual do nosso trabalho"
- **Apenas uma imagem ou um vídeo** por case no carrossel principal (homepage)
- **Formato**: Videos autoplay, loop, muted. Imagens estáticas.

### 5. Formatação Markdown
- **Negrito**: `**texto**` → `<strong>texto</strong>`
- **Itálico**: `*texto*` → `<em>texto</em>`
- Função `parseMarkdown()` processa esses formatos em `case-layout.tsx`

### 6. Cores em Resultados/Métricas
- Fundo: Preto (`bg-black`)
- Texto: Verde Kaleidos (`text-[#7CFF6B]`)
- Bordas: Verde com opacidade (`border-green-400/30`)

### 7. CTAs (Call-to-Actions)
- Botões principais: Fundo branco, texto preto
- Botões secundários: Fundo preto, texto verde `#7CFF6B`
- Sempre incluir tracking de eventos (use hooks `useAnalytics`, `useUmami`)

### 8. Cases "Em Breve"
- Cases sem página completa aparecem com "Em breve" no `/cases`
- Opacidade reduzida (`opacity-50`)
- Não são clicáveis
- Usam texto como capa (não imagens de logo)

---

## 🔧 Convenções de Código

### Componentes
- Usar TypeScript
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Usar `"use client"` quando necessário (animações, interatividade)

### Animações
- **Framer Motion** para animações
- Padrão: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`
- Delays progressivos para elementos sequenciais

### Hooks Customizados
- `useI18n()`: Internacionalização (pt/en)
- `useSmoothScroll()`: Scroll suave para seções
- `useAnalytics()`: Tracking de eventos
- `useUmami()`: Analytics Umami

### Imports
- Usar paths absolutos: `@/components/...`, `@/lib/...`
- Configurado em `tsconfig.json`

---

## 📄 Páginas Principais

### Homepage (`/`)
- Componente: `src/app/page.tsx`
- Usa `v2/page.tsx` que renderiza:
  - `HeroKaleidos`
  - `TrustedBy` (Parceiros que confiam)
  - `BentoGrid`
  - `ProcessSection`
  - `CasesCarousel`
  - `CtaAjuda`

### Cases (`/cases`)
- Lista todos os cases
- Cards com capa de texto (não logos)
- Cases prontos: clicáveis com "Ver case"
- Cases "em breve": não clicáveis com "Em breve"
- Cores diferentes por case (paleta Kaleidos)

### Página Individual de Case (`/cases/[case-id]`)
- Layout: `CaseLayout` component
- Sidebar com navegação por serviços
- Seções organizadas conforme `servicos` array
- Carrossel de mídia (imagens/vídeos)
- Formatação markdown nos textos

### Serviços
- `/servicos/marketing-conteudo`: Kaleidos Content
- `/servicos/ia-automacoes`: Kaleidos AI
- `/servicos/growth-lancamentos`: Growth e Lançamentos

---

## 🎨 Decisões de Design Importantes

### 1. Seção "Um resultado vale mais que mil palavras"
- Background: Preto com texto verde `#7CFF6B`
- Cards de cases: Fundo com gradiente escuro, borda que muda no hover
- Métricas: Badge verde com fundo translúcido e borda verde

### 2. Páginas de Cases
- Layout: Sidebar fixa com serviços à esquerda, conteúdo à direita
- Navegação: Clique em serviço → scroll suave até seção
- Seções: Bem separadas, com espaçamento adequado
- Cores: Fundo branco para conteúdo, preto para métricas/resultados

### 3. CTAs
- Primeira seção hero: Geralmente não tem CTAs (removidos propositalmente)
- CTAs finais: Fundo branco, texto preto, hover com escala
- Botões secundários: Fundo preto, texto verde `#7CFF6B`

### 4. Carrosséis
- Autoplay com pausa no hover
- Navegação: Botões prev/next brancos com fundo preto
- Indicadores: Bolinhas coloridas (mesmas cores dos cards do case)

---

## 🚨 Regras Críticas

### ❌ NUNCA FAZER
1. ❌ Usar cores fora da paleta (rosa, verde `#7CFF6B`, preto, branco)
2. ❌ Colocar imagens de métricas no carrossel "Visual do nosso trabalho"
3. ❌ Usar logos como capa dos cards de cases (usar texto)
4. ❌ Criar seções de cases sem atualizar `case-data.ts` primeiro
5. ❌ Mudar estrutura de pastas `public/` sem atualizar todas as referências
6. ❌ Remover cases sem verificar todas as referências no código

### ✅ SEMPRE FAZER
1. ✅ Seguir paleta de cores Kaleidos
2. ✅ Atualizar `case-data.ts` ao adicionar/modificar cases
3. ✅ Organizar `servicos` array na ordem das seções
4. ✅ Usar `encodeURI()` para vídeos com caracteres especiais
5. ✅ Adicionar tracking de eventos em botões/interações
6. ✅ Testar localmente antes de fazer commit
7. ✅ Usar markdown format (`**negrito**`, `*itálico*`) nos textos
8. ✅ Manter consistência visual entre cases

---

## 📝 Workflow de Desenvolvimento

### 1. Trabalhar Localmente
```bash
npm run dev
# Site roda em http://localhost:3000 ou 3001
```

### 2. Fazer Mudanças
- Editar arquivos conforme necessário
- Seguir regras de estilo e padrões
- Testar no navegador

### 3. Commit e Push
```bash
git add -A
git commit -m "Descrição clara das mudanças"
git push origin main
```

### 4. Deploy Automático
- Vercel detecta push para `main`
- Deploy automático em alguns minutos
- Site atualizado online

---

## 🔍 Estrutura de Cases

### Interface CaseData
```typescript
interface CaseData {
  id: string;                    // kebab-case (ex: "defiverso")
  nome: string;                  // Nome exibido (ex: "Defiverso")
  tags: string[];                // Tags do case
  descricao: string;             // Descrição curta
  descricao_en?: string;         // Descrição em inglês
  fraseImpactante: string;       // Frase de destaque
  fraseImpactante_en?: string;  // Frase em inglês
  detalhes: string;             // Detalhes completos (aceita markdown)
  detalhes_en?: string;          // Detalhes em inglês
  depoimentos?: string;          // Depoimentos (opcional)
  links: string[];              // Links do projeto
  metricas: string;             // Métricas (aceita markdown)
  metricas_en?: string;         // Métricas em inglês
  servicos: string[];           // ⚠️ ORDEM IMPORTANTE - deve corresponder às seções
  servicos_en?: string[];       // Serviços em inglês
  media: Array<{                // Array de mídia (imagens/vídeos)
    src: string;                // Caminho da mídia
    type: "image" | "video";    // Tipo
    alt?: string;               // Texto alternativo
    poster?: string;            // Thumbnail para vídeos
  }>;
}
```

### Exemplo de Case Completo
Veja `src/lib/case-data.ts` para exemplos completos de cases como:
- Defiverso (completo com Instagram, Newsletter, Minicurso, Twitter)
- Layla Foz (com edição de vídeos)
- Paradigma Education
- Mercado Bitcoin
- Crypto.com
- Etc.

---

## 🎯 Casos Especiais por Case

### Defiverso
- **Seções especiais**: Instagram, Newsletter, Minicurso 7 Dias DeFi, Twitter
- **Ordem**: O que fizemos → Design posts → Instagram → Newsletter → Minicurso → Twitter → Resultados
- **Funcionalidades**: Iframes para newsletter e minicurso

### Layla Foz
- **Seções especiais**: Edição de Vídeos (destaque na edição criativa)
- **Ordem**: Intro → Edição de Vídeos → Visual do Trabalho → Instagram → Newsletter → Resultados

### Outros Cases
- Seguir estrutura padrão: O que fizemos → Visual do Trabalho → Resultados Gerais
- Adicionar seções específicas conforme necessário

---

## 🌐 Internacionalização (i18n)

### Sistema
- Hook: `useI18n()` retorna `{ locale: 'pt' | 'en' }`
- Arquivo de traduções: `src/i18n/dictionaries.ts`
- Componentes usam condicional: `locale === 'en' ? 'English' : 'Português'`

### Adicionar Nova Tradução
1. Adicionar chave em `dictionaries.ts`
2. Usar `t('categoria', 'chave')` nos componentes

---

## 📊 Analytics e Tracking

### Hooks Disponíveis
- `useAnalytics()`: Google Analytics
- `useUmami()`: Umami Analytics
- `useTracking()`: Tracking geral

### Uso em Botões
```typescript
const { trackClick, trackButtonClick } = useTracking();

onClick={() => {
  trackClick("evento_id", "categoria");
  trackButtonClick("evento_id", "categoria", "tipo");
  // ação...
}}
```

---

## 🔗 Links e Referências Importantes

### WhatsApp
- Número: `12936180547`
- Constante: `WHATSAPP_NUMBER` em `src/lib/constants.ts`

### Estrutura de URLs
- Home: `/`
- Cases: `/cases`
- Case individual: `/cases/[case-id]` (ex: `/cases/defiverso`)
- Serviços: `/servicos/[servico-id]` (ex: `/servicos/ia-automacoes`)
- Contato: `/contato`
- Sobre: `/sobre`

---

## 📋 Checklist para Adicionar Novo Case

1. ✅ Criar pasta em `public/Cases/[case-name]/`
   - Adicionar imagens/vídeos em `conteudo/`
   - Adicionar documentação em `estudo/` (se houver)
   - Adicionar logo em `logo/`
2. ✅ Adicionar entrada em `src/lib/case-data.ts`
   - Preencher todos os campos da interface `CaseData`
   - Definir `servicos` array na ordem das seções
   - Adicionar `media` array com todas as mídias
3. ✅ Criar página em `src/app/cases/[case-name]/page.tsx`
   - Usar `CaseLayout` component
   - Passar `caseData` correspondente
4. ✅ Adicionar à lista de cases em `/cases`
   - Atualizar `src/app/cases/page.tsx` se necessário
5. ✅ Adicionar logo em "Parceiros que confiam" se aplicável
   - Copiar logo para `public/Clientes-logo/`
   - Atualizar `src/components/ui/trusted-by.tsx`

---

## 🎨 Estilos e Classes Customizadas

### Classes Tailwind Customizadas
- `font-display`: Atelier para títulos
- `font-sans`: Inter para textos
- `font-accent`: Gridlite para destaques
- `font-mono`: Inter mono para código

### Cores Customizadas
- Verde Kaleidos: `text-[#7CFF6B]`, `bg-[#7CFF6B]`, `border-[#7CFF6B]`

### Padrões de Espaçamento
- Seções: `py-20` (padding vertical)
- Containers: `max-w-6xl mx-auto px-4`
- Gaps em grids: `gap-6` ou `gap-8`

---

## ⚙️ Configurações Técnicas

### Next.js
- Versão: 15.3.5
- App Router (não Pages Router)
- Turbopack habilitado (`npm run dev --turbopack`)

### TypeScript
- Strict mode habilitado
- Tipagem completa em todos os componentes

### Tailwind CSS
- Versão: 4.x
- Config: `tailwind.config.js`
- Customizações de fontes e cores

### Framer Motion
- Versão: 12.23.5
- Uso extensivo para animações

---

## 🚀 Deploy e Produção

### Vercel
- **Deploy**: Automático via GitHub
- **Branch**: `main`
- **Config**: `vercel.json`
- **Variáveis de ambiente**: Configuradas no painel Vercel

### Build
- Comando: `npm run build`
- Verificação: `npm run build:check`
- Sem erros TypeScript deve ser garantido antes do deploy

---

## 📌 Notas Importantes

1. **Sempre responder em Português brasileiro** quando o usuário pedir
2. **Nunca apagar arquivos sem avisar** o usuário primeiro
3. **Sempre avisar antes de fazer mudanças** que podem quebrar algo
4. **Manter consistência visual** entre todas as páginas
5. **Testar localmente** antes de commitar mudanças
6. **Seguir estrutura de pastas** estabelecida
7. **Atualizar `case-data.ts`** quando trabalhar com cases
8. **Usar paleta de cores Kaleidos** em tudo

---

## 🔄 Histórico de Decisões Importantes

### Reorganização do `public/`
- Movido tudo para `Kaleidos/` (geral) e `Cases/[case-name]/` (específico)
- Estrutura limpa e organizada
- Todas as referências atualizadas

### Sistema de Navegação em Cases
- Sidebar com serviços clicáveis
- Scroll suave até seções correspondentes
- Função `getServiceSectionId()` para mapeamento

### Remoções e Organizações
- Removidos: Screenshots, EXEMPLO-TIPOGRAFIA.tsx
- Movido para `docs/`: Toda documentação e estudos
- Movido para `scripts/`: Todos os scripts

---

## 🎯 Próximos Passos Sugeridos

1. Manter organização atual
2. Continuar seguindo padrões estabelecidos
3. Adicionar novos cases conforme solicitado
4. Manter consistência visual
5. Testar sempre antes de deployar

---

**Última atualização**: Novembro 2024  
**Versão do documento**: 1.0  
**Mantido por**: Sistema de IAs do Cursor

