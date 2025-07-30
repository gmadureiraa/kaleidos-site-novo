# Tipografia da Kaleidos Digital

## 📋 Visão Geral

Este documento define a tipografia oficial da Kaleidos Digital, seguindo rigorosamente o **Manual da Marca** e **Brandbook**. A tipografia é um elemento fundamental da identidade visual, refletindo os arquétipos do **Mago** e do **Criador**.

## 🎨 Hierarquia Tipográfica

### 1. **Atelier Regular** - Fonte Principal
- **Uso**: Títulos principais, headlines, logotipo
- **Características**: Tipografia exclusiva baseada em Atelier
- **Hierarquia**: Baseada na proporção áurea (1.618)
- **Aplicação**: 
  - Títulos de seções principais
  - Headlines de destaque
  - Logotipo "Kaleidos Digital"
  - Elementos que precisam de impacto visual

### 2. **Inter Variable** - Fonte Secundária
- **Uso**: Textos corporais, parágrafos, navegação
- **Características**: Fonte sans-serif moderna e legível
- **Pesos**: 100-900 (variable font)
- **Aplicação**:
  - Textos de corpo
  - Navegação
  - Botões e elementos interativos
  - Parágrafos e descrições

### 3. **Gridlite PE Variable** - Fonte de Destaque
- **Uso**: Elementos de destaque, acentos, call-to-actions
- **Características**: Fonte com personalidade única
- **Aplicação**:
  - Call-to-actions especiais
  - Elementos de destaque
  - Acentos visuais
  - Destaques em cards e componentes

## 🛠️ Implementação Técnica

### Classes CSS Disponíveis

```css
/* Fonte Principal - Títulos */
.font-display {
  font-family: 'Atelier', serif;
  font-weight: normal;
  letter-spacing: -0.04em;
}

/* Fonte Secundária - Textos */
.font-sans {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
}

/* Fonte de Destaque */
.font-accent {
  font-family: 'Gridlite', sans-serif;
  font-weight: normal;
}

/* Fonte Monospace */
.font-mono {
  font-family: 'Inter', monospace;
  font-weight: 400;
}
```

### Classes Tailwind CSS

```tsx
// Títulos principais
<h1 className="font-display text-6xl tracking-tight">Título Principal</h1>

// Textos corporais
<p className="font-sans text-base">Texto normal</p>

// Destaques especiais
<span className="font-accent text-lg">Destaque</span>

// Código e elementos técnicos
<code className="font-mono text-sm">código</code>
```

## 📐 Diretrizes de Uso

### Tamanhos Recomendados

#### Atelier (Display)
- **Títulos principais**: 4xl-7xl (2rem-4.5rem)
- **Subtítulos**: 2xl-3xl (1.5rem-1.875rem)
- **Destaques**: xl-2xl (1.25rem-1.5rem)

#### Inter (Sans)
- **Textos corporais**: base-lg (1rem-1.125rem)
- **Navegação**: sm-base (0.875rem-1rem)
- **Legendas**: xs-sm (0.75rem-0.875rem)

#### Gridlite (Accent)
- **Call-to-actions**: lg-xl (1.125rem-1.25rem)
- **Destaques**: base-lg (1rem-1.125rem)

### Espaçamento e Tracking

```css
/* Atelier - Ajuste fino para títulos */
.font-display {
  letter-spacing: -0.04em;
}

/* Inter - Espaçamento normal */
.font-sans {
  letter-spacing: normal;
}

/* Gridlite - Espaçamento ligeiramente aumentado */
.font-accent {
  letter-spacing: 0.02em;
}
```

## 🎯 Aplicação por Contexto

### 1. **Sites e Landing Pages**
- **Hero Sections**: Atelier para títulos principais
- **Seções de conteúdo**: Inter para textos
- **Call-to-actions**: Gridlite para destaque
- **Navegação**: Inter para legibilidade

### 2. **Posts e Redes Sociais**
- **Títulos**: Atelier para impacto
- **Corpo do texto**: Inter para leitura
- **Hashtags e tags**: Gridlite para destaque

### 3. **Materiais Impressos**
- **Cartões de visita**: Atelier para logo, Inter para contatos
- **Apresentações**: Hierarquia clara com as três fontes
- **Relatórios**: Inter para legibilidade

## 🔧 Configuração Técnica

### Arquivos de Fonte
```
public/fonts/
├── Atelier/
│   └── OpenType-TT/
│       └── Atelier.ttf
├── Inter/
│   ├── Inter-VariableFont_opsz,wght.ttf
│   └── Inter-Italic-VariableFont_opsz,wght.ttf
└── Gridlite/
    └── Gridlite.otf
```

### Variáveis CSS
```css
:root {
  --font-display: 'Atelier', serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-accent: 'Gridlite', sans-serif;
  --font-mono: 'Inter', monospace;
}
```

## ⚠️ Regras Importantes

1. **Nunca misture fontes fora da hierarquia definida**
2. **Sempre use as classes CSS oficiais**
3. **Respeite a proporção áurea nos tamanhos**
4. **Mantenha consistência em todos os canais**
5. **Teste a legibilidade em diferentes dispositivos**

## 🎨 Alinhamento com a Marca

A tipografia reflete os **arquétipos da Kaleidos**:

- **Atelier (Mago)**: Mistério, sofisticação, impacto
- **Inter (Criador)**: Clareza, modernidade, funcionalidade  
- **Gridlite (Complementação)**: Destaque, personalidade, inovação

---

*Este documento deve ser seguido rigorosamente para manter a consistência da marca Kaleidos Digital em todos os materiais e canais.* 