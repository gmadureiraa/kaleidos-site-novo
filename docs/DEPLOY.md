# Guia de Deploy — Kaleidos Site

> Atualizado 2026-07-14. Stack: **Bun** + Next.js 15. Ver também [`AUDITORIA-SITE-2026-07-14.md`](./AUDITORIA-SITE-2026-07-14.md).

## Variáveis críticas (Vercel Production)

| Var | Uso |
|-----|-----|
| `APP_DASHBOARD_PASSWORD` | Basic Auth `/app` (fail-closed sem ela) |
| `CRON_SECRET` | `Authorization: Bearer …` no cron de lead sequence |
| `LEAD_UNSUB_SECRET` | HMAC unsubscribe (gerar `openssl rand -hex 32`) |
| `UPSTASH_REDIS_REST_URL` / `TOKEN` | Rate limit distribuído |
| `DATABASE_URL` | Postgres leads |
| `RESEND_API_KEY` / `RESEND_FROM` | Emails (SPF/DKIM no domínio) |
| `NEXT_PUBLIC_POSTHOG_*` / `GA_ID` / `CLARITY_ID` / `META_PIXEL_ID` | Analytics |

Policy papers: PDFs/`read.html` públicos de propósito (GEO). Gateway de email = captura, não DRM.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ ou **Bun** 1.3+
- Conta no [Vercel](https://vercel.com/)

## Configuração Local

### 1. Instalar dependências
```bash
bun install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Configurações do Site
NEXT_PUBLIC_SITE_URL=https://kaleidos.com.br
NEXT_PUBLIC_SITE_NAME=Kaleidos Digital
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Redes Sociais
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/kaleidosdigital
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/kaleidos-digital/?viewAsMember=true

# Contato
NEXT_PUBLIC_CONTACT_EMAIL=contato@kaleidos.com.br
NEXT_PUBLIC_CONTACT_PHONE=+55 11 99999-9999

# SEO
NEXT_PUBLIC_SITE_DESCRIPTION=Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos
NEXT_PUBLIC_SITE_KEYWORDS=marketing digital, conteúdo criativo, automações, lançamentos, growth hacking, redes sociais
```

### 3. Verificar build local
```bash
bun run build:check
```

## Deploy no Vercel

### Opção 1: Deploy via CLI

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Fazer login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Opção 2: Deploy via GitHub

1. **Conectar repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu repositório GitHub

2. **Configurar variáveis de ambiente**
   - Vá em Settings > Environment Variables
   - Adicione todas as variáveis do `.env.local`

3. **Deploy automático**
   - Cada push para `main` faz deploy automático
   - **Atenção alias:** se `kaleidos.com.br` continuar no build antigo, rode `vercel alias set <deployment> kaleidos.com.br` (e `www`)

## Configurações do Vercel

### Variáveis de Ambiente
Configure no painel do Vercel:

| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://kaleidos.com.br` |
| `NEXT_PUBLIC_SITE_NAME` | `Kaleidos Digital` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | `G-XXXXXXXXXX` |

### Domínio Customizado
1. Vá em Settings > Domains
2. Adicione `kaleidos.com.br`
3. Configure DNS conforme instruções do Vercel

## 🔍 Verificações Pós-Deploy

### 1. Testar URLs importantes
- ✅ Home: `https://kaleidos.com.br`
- ✅ Sitemap: `https://kaleidos.com.br/sitemap.xml`
- ✅ Robots: `https://kaleidos.com.br/robots.txt`
- ✅ Cases: `https://kaleidos.com.br/cases`

### 2. Verificar SEO
- ✅ Meta tags
- ✅ Open Graph
- ✅ Structured Data
- ✅ Sitemap válido

### 3. Testar Performance
- ✅ Lighthouse Score
- ✅ Core Web Vitals
- ✅ Mobile responsiveness

### 4. Verificar Analytics
- ✅ Google Analytics funcionando
- ✅ Eventos sendo registrados
- ✅ Conversões sendo trackeadas

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Verificação completa
npm run deploy:check

# Lint
npm run lint

# Start produção local
npm run start
```

## 📊 Monitoramento

### Vercel Analytics
- Acesse o dashboard do Vercel
- Monitore performance e erros
- Configure alertas

### Google Analytics
- Verifique eventos customizados
- Monitore conversões
- Analise comportamento dos usuários

## 🔧 Troubleshooting

### Erro de Build
```bash
# Limpar cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Erro de Variáveis de Ambiente
- Verifique se todas as variáveis estão configuradas no Vercel
- Confirme se os nomes estão corretos (NEXT_PUBLIC_*)

### Erro de Domínio
- Verifique configurações DNS
- Aguarde propagação (pode levar até 24h)

## 📞 Suporte

Para problemas técnicos:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/vercel/next.js/issues) 