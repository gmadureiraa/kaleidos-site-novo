# Kaleidos Technology - Site

Um site moderno e elegante para a Kaleidos Technology, construído com Next.js 15, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **shadcn/ui** - Componentes UI de alta qualidade

## ✨ Funcionalidades

### 🎨 Hero Section
- Design moderno com gradientes e animações
- Elementos flutuantes animados
- Indicador de scroll
- Estatísticas da empresa
- Botões de call-to-action

### 🧩 Bento Grid Section
- Layout em grid responsivo estilo "bento box"
- Cards interativos com efeitos 3D
- Animações de digitação de código
- Timeline de inovação
- Ícones de parceiros de IA
- Assistente de voz interativo
- Métricas animadas

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Passos para instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd kaleidos-site
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse o site**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
kaleidos-site/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── icons/
│   │   │   ├── anthropic.tsx
│   │   │   ├── anthropic-dark.tsx
│   │   │   ├── deepseek.tsx
│   │   │   ├── gemini.tsx
│   │   │   ├── mistral.tsx
│   │   │   ├── open-ai.tsx
│   │   │   └── open-ai-dark.tsx
│   │   ├── bento-grid.tsx
│   │   └── hero.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
└── README.md
```

## 🎯 Componentes Principais

### Hero Component
- Seção principal com título e descrição da empresa
- Animações de entrada com Framer Motion
- Elementos decorativos flutuantes
- Estatísticas da empresa
- Botões de ação

### Bento Grid Component
- Grid responsivo com cards interativos
- Efeitos 3D no hover
- Animações de digitação de código
- Timeline de inovação
- Assistente de voz simulado
- Ícones de parceiros de IA

## 🎨 Personalização

### Cores
As cores podem ser personalizadas editando as variáveis CSS no arquivo `src/app/globals.css`.

### Conteúdo
O conteúdo pode ser facilmente modificado editando os arrays de dados nos componentes:
- `bentoItems` no `bento-grid.tsx`
- Textos e estatísticas no `hero.tsx`

### Animações
As animações são controladas pelo Framer Motion e podem ser ajustadas nos componentes.

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Modo Escuro

O site suporta modo escuro automático baseado nas preferências do sistema do usuário.

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Contato

Para dúvidas ou suporte, entre em contato através dos canais oficiais da Kaleidos Technology.
