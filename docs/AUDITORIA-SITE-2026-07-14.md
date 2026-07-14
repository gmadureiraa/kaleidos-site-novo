# Auditoria site Kaleidos — 2026-07-14

**Prod:** https://kaleidos.com.br · **Repo:** `code/site-kaleidos` · **Stack:** Next 15.5 + React 19 + Bun

## Veredicto

Auth `/app` fail-closed. SEO base sólido. Popups e funil playbook ativos (capa bear v4). Débitos principais tratados nesta wave: lint bloqueante, props mortas, lazy do EbookPopup, sitemap comercial, robots `/app`, `.env.example` completo.

## Policy papers (GEO)

PDFs em `public/papers/*.pdf` e `*/read.html` são **públicos de propósito** para citação em LLMs/SEO. O popup/gate captura email (lista Resend + UX). Não é DRM. Gate real (URL assinada) fica no backlog.

## Manual na Vercel (Gabriel)

1. Rotacionar `APP_DASHBOARD_PASSWORD` se ainda for a senha antiga do histórico git.
2. Confirmar `LEAD_UNSUB_SECRET` (32 bytes random), `UPSTASH_REDIS_REST_URL/TOKEN`, `RESEND_FROM` + SPF/DKIM.
3. Cron usa só `Authorization: Bearer $CRON_SECRET`.

## Capas bear market

Canon: `/papers/cover-bear-market-v4.webp`. Versões v1/v2 órfãs removidas nesta wave.

## Checklist pós-deploy

- [ ] `bun run lint` / `tsc` / `build:check` verdes
- [ ] Alias `kaleidos.com.br` no deploy novo
- [ ] `/sitemap.xml` contém `/portfolio` e `/pacotes`
- [ ] `/app` → 401 · capa v4 → 200
