# Security Audit — site-kaleidos

**Data:** 2026-05-08
**Auditor:** Claude (agente Projetos Pessoais)
**Stack:** Next.js 15.3.6 (App Router) · React 19 · Tailwind 4 · Resend · Neon Postgres (`pg`) · Vercel

---

## Resumo Executivo

`site-kaleidos` é o site institucional da agência (kaleidos.com.br). É majoritariamente conteúdo estático (cases, blog, serviços) com 6 API routes mínimas: forms de captura de lead (`/api/lead-ia`, `/api/contact`), newsletter Resend (`/api/newsletter*`), unsubscribe HMAC e cron diário de sequência de emails. Não tem auth, não tem admin, não tem dados sensíveis de usuário em produção (só leads opt-in que ficam em Neon).

A higiene de secrets é **boa** (`.env.local` nunca foi commitado, só contém `RESEND_API_KEY`, `.gitignore` correto). Headers de segurança básicos estão presentes (X-Frame-Options DENY, nosniff, referrer-policy). O cron de email tem auth via `x-vercel-cron` + `CRON_SECRET`. O unsubscribe usa HMAC sha256 com `timingSafeEqual`.

Os pontos fracos são: ausência total de **rate limiting** nos endpoints de captura de lead (spam-prone, custo Resend), ausência de **CSP / HSTS** nos headers, dependência de uma key fraca por padrão no HMAC do unsubscribe (cai no `RESEND_API_KEY` se `LEAD_UNSUB_SECRET` não setado, o que ainda é seguro mas conceitualmente errado), `Access-Control-Allow-Origin: *` nas pastas estáticas (irrelevante mas vale notar) e 14 vulnerabilidades npm — todas via `puppeteer` (devDep, não vai a produção). XSS por `dangerouslySetInnerHTML` aparece em vários lugares mas todos com input controlado (JSON-LD literal + markdown estático do blog hardcoded em `blog-data.ts`, sem user-generated content).

**Score geral: 7.5/10** — site institucional sólido pra contexto, mas precisa fechar o gap de rate limiting antes de virar alvo de spam.

**Findings:** 0 P0 · 1 P1 · 4 P2 · 5 P3

---

## Findings P0 (Críticos)

Nenhum. Não há secret commitado, RCE, auth bypass nem leak de PII relevante.

---

## Findings P1 (Altos)

### P1-1 — Endpoints de captura de lead sem rate limiting nem captcha

**Arquivos:**
- `src/app/api/contact/route.ts`
- `src/app/api/lead-ia/route.ts:1-177`
- `src/app/api/newsletter/subscribe/route.ts:24-79`

**Descrição:**
Os 3 endpoints aceitam POSTs anônimos sem qualquer throttling, captcha ou honeypot. Especialmente `/api/lead-ia` faz 4 operações por requisição: (1) email Resend interno pro time, (2) UPSERT em Postgres, (3) email welcome via Resend, (4) `resend.contacts.create`. Um atacante pode:
- Encher a Resend audience com emails fake (custo + reputação de domínio)
- Spam a inbox do Gabriel/Nathalia (Resend tem cota — pode ficar bloqueado)
- Encher tabela `lead_email_sequence` no Neon e rodar cron desnecessário
- Usar `replyTo: email` (não validado além de regex simples) pra reply chain attack

**Impacto:** custo financeiro + degradação da entregabilidade do domínio Resend + caixa de entrada do time inutilizável.

**Fix sugerido:**
1. Adicionar rate limiting com Upstash Redis (free tier suficiente). Padrão sugerido: 5 reqs / 15 min por IP em `/api/lead-ia` e `/api/contact`, 10 reqs / 1h em `/api/newsletter/subscribe`.
2. Honeypot field (`<input name="website" hidden>`) — bots preenchem, descartar silenciosamente se vier preenchido.
3. Validar email com lib (zod + email regex robusta) antes de qualquer side-effect.
4. (Opcional) Cloudflare Turnstile no form da `/lp` — invisível pro user.

---

## Findings P2 (Médios)

### P2-1 — Sem CSP nem HSTS nos headers globais

**Arquivo:** `next.config.ts:33-105`

**Descrição:**
Headers presentes: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block` (deprecated mas inofensivo), `Referrer-Policy: strict-origin-when-cross-origin`. Faltam:
- **`Content-Security-Policy`** — site carrega scripts externos (Google Analytics `googletagmanager.com`, Microsoft Clarity `clarity.ms`, Meta Pixel `connect.facebook.net`, Unsplash, embeds Swiper). Sem CSP, qualquer XSS escala fácil.
- **`Strict-Transport-Security` (HSTS)** — Vercel já força HTTPS, mas declarar `max-age=31536000; includeSubDomains` previne downgrade.
- **`Permissions-Policy`** — bloquear `geolocation`, `microphone`, `camera` (não usados) por defesa em profundidade.

**Impacto:** XSS amplifica facilmente; downgrade attack teórico em primeiros visitantes.

**Fix:** adicionar em `next.config.ts` headers globais:
```ts
{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
{ key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://connect.facebook.net; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.facebook.com; frame-ancestors 'none';" }
```
(`unsafe-inline` em script-src ainda necessário enquanto usar `dangerouslySetInnerHTML` pra GA — alternativa: nonce per-request via middleware.)

---

### P2-2 — 14 vulnerabilidades npm (todas em devDependencies via puppeteer)

**Arquivo:** `package.json` (devDeps `puppeteer ^24.15.0`), `scripts/test-responsive.js`

**Descrição:**
`npm audit` reporta 2 críticas + 6 high + 6 moderate. Quebradas:
- `basic-ftp` (crítica) → puppeteer
- `tar`, `tar-fs` (high) → puppeteer download
- `ws`, `ip-address`, `js-yaml`, `flatted`, `minimatch`, `brace-expansion`, `ajv` → puppeteer/eslint chains

Todas são **devDependencies** — não vão ao bundle Vercel de produção. Risco real é zero em runtime; risco teórico é se rodar `bun run scripts/test-responsive.js` apontando pra FTP/tar malicioso (impraticável).

**Impacto:** baixíssimo em prod. Score do `npm audit` cosmético + potencial de ruído em compliance review.

**Fix:**
- `npm audit fix` (não-breaking) deve resolver maioria.
- Considerar mover `puppeteer` pra script externo / CI separado, ou remover se não rodar mais teste responsive.

---

### P2-3 — `Access-Control-Allow-Origin: *` em assets estáticos

**Arquivo:** `next.config.ts:60-83`, `vercel.json:6-22`

**Descrição:**
`/Conteudo_clientes/*` e `/videos/*` retornam `ACAO: *`. Isso permite outros sites embedarem os assets — em geral inofensivo pra mídia pública, mas se algum dia colocar lá conteúdo restrito ou pago (cases premium, ebook), vaza. Hoje só serve mídia pública de cases.

**Impacto:** baixo agora; vira P1 se conteúdo gated for adicionado.

**Fix:** restringir pra `https://kaleidos.com.br` ou remover header (browsers mesmo assim conseguem renderizar `<img>`/`<video>` cross-origin sem CORS).

---

### P2-4 — Markdown→HTML caseiro no blog sem sanitização

**Arquivo:** `src/app/blog/[slug]/page.tsx:55-156`, `src/components/blog/article-content.tsx:144`

**Descrição:**
`markdownToHtml()` é regex-based caseiro e o resultado vai direto em `dangerouslySetInnerHTML`. Hoje o conteúdo vem 100% de `src/lib/blog-data.ts` (estático, hardcoded por Gabriel). Não há CMS nem user input. Cenário de risco só existe se um dia o blog for migrado pra Sanity/Contentful/MDX dinâmico — aí markdown pode injetar `<script>` ou `<img onerror=>`.

**Impacto:** zero hoje, alto se virar dinâmico.

**Fix:**
- Curto prazo: documentar a premissa "blog content é trusted source".
- Médio prazo: trocar por `react-markdown` + `rehype-sanitize` ou mover pra MDX (compilado, não renderizado).

---

## Findings P3 (Baixos / Hardening)

### P3-1 — `LEAD_UNSUB_SECRET` cai em `RESEND_API_KEY` por default

**Arquivo:** `src/lib/emails/unsubscribe.ts:3-4`

```ts
const SECRET = () =>
  process.env.LEAD_UNSUB_SECRET || process.env.RESEND_API_KEY || "kaleidos-dev-secret";
```

Se `LEAD_UNSUB_SECRET` não estiver setado em prod, o HMAC usa a Resend API key. Não é vulnerabilidade direta (key não vaza pelo HMAC), mas:
1. Rotacionar a Resend key invalida todos os tokens de unsubscribe em circulação.
2. `"kaleidos-dev-secret"` como fallback final é ruim em dev se algum link sair pra fora.

**Fix:** definir `LEAD_UNSUB_SECRET` (32 bytes random) em prod e remover fallback dev por uma random gerada no boot.

---

### P3-2 — `replyTo: email` direto sem validação anti-spoof

**Arquivos:** `src/app/api/contact/route.ts:61`, `src/app/api/lead-ia/route.ts:81`

Atacante pode setar `replyTo` como qualquer string (ex: vítima qualquer) e quando Gabriel responder o email, vai pra vítima. Email regex existe em `subscribe/route.ts` mas não em `contact` nem `lead-ia`.

**Fix:** adicionar regex check (ou zod schema) também em `/api/contact` e `/api/lead-ia` antes do `resend.emails.send`.

---

### P3-3 — `from: "Kaleidos <onboarding@resend.dev>"` em produção

**Arquivos:** `src/app/api/contact/route.ts:59`, `src/app/api/lead-ia/route.ts:78`

Resend recomenda fortemente um domínio verificado (`blog@kaleidos.com.br` é usado em `/api/newsletter`). Usar `onboarding@resend.dev` em produção:
- Marca de spam aumenta
- Taxa de inbox cai
- Emails de notificação interna podem virar lixo no spam

**Fix:** trocar por `noreply@kaleidos.com.br` ou `notificacoes@kaleidos.com.br` (verificar domínio em Resend).

---

### P3-4 — `next.config.ts` `images.domains` deprecated; usar `remotePatterns`

**Arquivo:** `next.config.ts:16`

```ts
images: { domains: ["images.unsplash.com"], ... }
```

Next 15 já avisa que `domains` está deprecated. Trocar por `remotePatterns` é hardening leve (mais granular).

**Fix:**
```ts
remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]
```

---

### P3-5 — `errorBoundary` reseta nada — só loga em dev

**Arquivo:** `src/components/ui/error-boundary.tsx:29`

Apenas observação: error boundary só faz console.log. Não envia pra Sentry / nada. Numa lógica server side, qualquer crash em API route já volta 500 (visto em todos os routes — bom). Cliente não captura erro globalmente.

**Fix (opcional):** integrar Sentry (já que Resend leva a sério SLO de email).

---

## Boas Práticas Já Presentes

Importante reconhecer o que **está certo**:

- `.env.local` nunca foi commitado (verificado via `git log --all --full-history`)
- `.gitignore` cobre `.env*`, `.vercel`, `.next/`, `node_modules`
- `.vercel/.env.production.local` contém apenas OIDC tokens efêmeros (24h), nada sensível persistente
- HMAC do unsubscribe usa `timingSafeEqual` (não vulnerável a timing attack)
- API routes catch errors e nunca vazam stacktrace pro cliente
- `getResend()` é lazy — build não falha sem env vars
- `getPool()` retorna null se `DATABASE_URL` ausente — graceful degradation
- Cron tem auth dupla (`x-vercel-cron` header OR `CRON_SECRET` token)
- Email regex em `/api/newsletter/subscribe` evita lixo
- SQL queries usam parametrized queries (`$1, $2, ...`) — sem injection
- `frame-ancestors` implícito via `X-Frame-Options: DENY`
- `poweredByHeader: false` (esconde stack)
- Resend audience adicionada com `unsubscribed: false` + token assinado pra unsub

---

## Próximos Passos Priorizados

| # | Item | Severidade | Esforço |
|---|------|-----------|---------|
| 1 | Adicionar rate limiting (Upstash) em `/api/lead-ia`, `/api/contact`, `/api/newsletter/subscribe` | P1 | 30min |
| 2 | Adicionar honeypot field nos forms da `/lp` e `/servicos/ia-automacoes-completa` | P1 | 15min |
| 3 | Validar email com regex em `/api/contact` e `/api/lead-ia` antes de side-effects | P3 → P1 quick win | 10min |
| 4 | Adicionar HSTS + Permissions-Policy + CSP em `next.config.ts` | P2 | 45min |
| 5 | Trocar `from: onboarding@resend.dev` por domínio verificado | P3 (mas afeta entregabilidade) | 20min (verificar domínio Resend) |
| 6 | Setar `LEAD_UNSUB_SECRET` no Vercel env vars (32 bytes random) | P3 | 5min |
| 7 | `npm audit fix` (não-breaking) | P2 | 5min + smoke test |
| 8 | Migrar `images.domains` → `remotePatterns` | P3 | 5min |
| 9 | (Opcional) Trocar markdown caseiro por `react-markdown + rehype-sanitize` | P2 | 1-2h |
| 10 | (Opcional) Integrar Sentry pra observabilidade de errors | P3 | 30min |

**Quick wins (1h total):** items 1, 2, 3, 6, 7, 8 fecham 80% do risco real.

---

## Notas finais

- Não há código de auth/admin/login nesse projeto — todo o "login Kaleidos" vive em `kaleidos-pay-app` e `kai-app` separadamente.
- Não há dados sensíveis (PII fora do nome+email opt-in dos leads, que é GDPR/LGPD-compliant via unsubscribe).
- O blog hoje é 100% estático em `blog-data.ts` — qualquer migração pra CMS deve revisitar P2-4.
- Os assets em `public/Conteudo_clientes/`, `public/videos/`, `public/Imagens/` são públicos por design (cases publicáveis) — `ACAO: *` é fine **enquanto for assim**.

---

## Fixes aplicados — 2026-05-08

**Branch:** `security/fixes-2026-05-08`

### 1. Rate limiting nos endpoints de captura (P1-1) ✅
- Novo módulo `src/lib/security/rate-limit.ts` — Upstash Redis quando `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` setados, fallback in-memory com `console.warn` caso contrário.
- Sliding window. IP via `x-forwarded-for` (primeiro item) → `x-real-ip` → `"unknown"`.
- Aplicado em:
  - `/api/lead-ia` — 5 reqs / 10min por IP
  - `/api/contact` — 5 reqs / 10min por IP
  - `/api/newsletter/subscribe` — 5 reqs / 10min por IP
- Response 429 inclui `Retry-After`, `X-RateLimit-Limit/Remaining/Reset`.
- Dependências adicionadas: `@upstash/ratelimit ^2.0.8` + `@upstash/redis ^1.38.0`.

### 2. Honeypot anti-bot (P1-2) ✅
- Novo helper `isHoneypotTriggered()` em `src/lib/security/validation.ts`.
- Server-side: se `_hp` preenchido, retorna 200 silencioso (não dá pista pro bot).
- Client-side: campo `_hp` com posição absoluta `-10000px`, `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`.
- Aplicado em 3 forms: `/lp` (CTAFinal), `/servicos/ia-automacoes-completa` (FinalCtaSection), `/blog` (newsletter).

### 3. Validação de email regex (P3-2 → P1 quick win) ✅
- Helper `isValidEmail()` em `src/lib/security/validation.ts` — regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` + cap 254 chars.
- Aplicado em `/api/lead-ia` e `/api/contact` (newsletter já tinha). Retorna 400 `invalid_email` antes de qualquer side-effect Resend/DB.

### 4. Headers de segurança globais (P2-1) ✅
- `next.config.ts` ganhou:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (2 anos)
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Content-Security-Policy` laxa: `default-src 'self'`; permite GA + Clarity + FB Pixel; `frame-ancestors 'none'`; `form-action 'self'`. Mantém `unsafe-inline` em `script-src` (necessário enquanto GA é injetado via `dangerouslySetInnerHTML`; migração futura → nonce).
- X-Frame-Options DENY mantido.

### 5. `from: onboarding@resend.dev` substituído (P3-3) ✅
- `/api/lead-ia` e `/api/contact` agora usam `process.env.RESEND_FROM ?? "Kaleidos <noreply@kaleidos.com.br>"`.
- ⚠️ **Manual op:** verificar `kaleidos.com.br` em https://resend.com/domains com SPF + DKIM + DMARC. Se ainda não verificado, setar `RESEND_FROM` no Vercel pra `Kaleidos <onboarding@resend.dev>` (mantém comportamento atual) até verificar o domínio.

### 6. `images.domains` → `remotePatterns` (P3-4) ✅
- `next.config.ts` migrado pra `remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]`.

### Build status
- `bun run build` passa ✅ (Next 15.3.6, todas as 32 rotas compilam).
- Sem erros de tipo, sem warning de eslint novo.

### Manual ops (Vercel) — ainda pendentes
- `LEAD_UNSUB_SECRET` — gerar 32 bytes random (`openssl rand -base64 32`) e setar em prod (P3-1, ainda em aberto).
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — provisionar Upstash Redis (free tier basta) e setar em prod. Sem isso, rate-limit cai em fallback in-memory que perde estado entre cold starts.
- `RESEND_FROM` — confirmar domínio verificado em Resend antes de deixar default `noreply@kaleidos.com.br`. Se ainda não estiver, setar pro endereço atual `onboarding@resend.dev`.
