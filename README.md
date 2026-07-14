# Kaleidos Digital — Site

Site institucional da [Kaleidos](https://kaleidos.com.br): marketing cripto/Web3/fintech.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 4 · Bun · Vercel

## Início rápido

```bash
bun install
cp .env.example .env.local   # preencha secrets
bun run dev
```

Build completo: `bun run build:check`

## Rotas principais

| Rota | Função |
|------|--------|
| `/` | Home web3v2 (`HomeShell`) |
| `/founders` `/creators` `/fintech` `/saas` `/empresas` | Variantes por público |
| `/blog` `/papers` | Conteúdo + captura de leads |
| `/cases` `/portfolio` `/pacotes` `/servicos` | Comercial |
| `/app` | Painel editorial (Basic Auth) |
| `/2` `/3` `/web3` | Labs / legado (`noindex`) |

## Variáveis críticas

Ver tabela completa em [`docs/DEPLOY.md`](docs/DEPLOY.md) e `.env.example`.

Obrigatórias em produção: `APP_DASHBOARD_PASSWORD`, `RESEND_API_KEY`, `CRON_SECRET`, `LEAD_UNSUB_SECRET`, Upstash + `DATABASE_URL` se leads/rate-limit forem usados a sério.

## Docs

- [`docs/AUDITORIA-SITE-2026-07-14.md`](docs/AUDITORIA-SITE-2026-07-14.md) — auditoria + policy GEO papers
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — deploy Vercel + alias trap

## Deploy

Push em `main` dispara Vercel. Se o domínio não atualizar:

```bash
vercel alias set <deployment-url> kaleidos.com.br
vercel alias set <deployment-url> www.kaleidos.com.br
```
