# Material baixado — Instagram Neobankless

**Handle:** [@neobankless](https://www.instagram.com/neobankless/)
**Baixado em:** 2026-06-26
**Fonte:** scrape Apify (`apify~instagram-scraper`) por URL direta de cada post
**Pasta:** `public/Cases/neobankless/conteudo/instagram-novos/`

> ⚠️ Importante pro próximo agente: vários posts que o `case-data.ts` referencia hoje
> como **imagem estática** (`post-iof.jpg`, `post-cartao.jpg`, `post-anuncios.jpg`,
> `post-dolarizar.jpg`) são na verdade **carrosséis de 6 slides** no Instagram. Aqui
> baixamos os carrosséis COMPLETOS (slide 1 = capa). Recomendado trocar a entrada de
> `post` única por galeria de carrossel no case.

---

## Carrosséis completos (6 slides cada)

### 1. nbs-carrossel-cartao — "4 motivos para usar o cartão" ⭐ DESTAQUE
- **Tipo:** carrossel · 6 slides · 1080x1350
- **Métricas:** 105 likes · 14 comentários · 26/01/2026
- **Tema:** Por que o cartão NBS não é "só mais um cartão" — IOF zero, autocustódia, saldo em dólar, cashback.
- **Arquivos:** `nbs-carrossel-cartao-slide-01.jpg` … `-slide-06.jpg`
- **URL:** https://www.instagram.com/p/DT-pchnDWHz/

### 2. nbs-carrossel-anuncios — "Anúncios sem IOF" ⭐ DESTAQUE
- **Tipo:** carrossel · 6 slides · 1080x1350
- **Métricas:** 74 likes · 13 comentários · 09/03/2026
- **Tema:** Custo invisível de anunciar no Brasil (>12% em impostos/taxas) e como pagar mídia em dólar via NBS.
- **Arquivos:** `nbs-carrossel-anuncios-slide-01.jpg` … `-slide-06.jpg`
- **URL:** https://www.instagram.com/p/DVrTgn7FLQo/

### 3. nbs-carrossel-iof — "IOF zero vs banco tradicional"
- **Tipo:** carrossel · 6 slides · 1080x1350
- **Métricas:** 29 likes · 4 comentários · 04/03/2026
- **Tema:** Custo real de compra internacional via banco (8–15%) vs NBS. Comparativo objetivo.
- **Arquivos:** `nbs-carrossel-iof-slide-01.jpg` … `-slide-06.jpg`
- **URL:** https://www.instagram.com/p/DVebsRFEZBD/

### 4. nbs-carrossel-dolarizar — "Como dolarizar patrimônio"
- **Tipo:** carrossel · 6 slides · 1080x1350
- **Métricas:** 26 likes · 2 comentários · 13/03/2026
- **Tema:** Dolarizar sem burocracia — do depósito em reais ao saldo em dólar, sem intermediários.
- **Arquivos:** `nbs-carrossel-dolarizar-slide-01.jpg` … `-slide-06.jpg`
- **URL:** https://www.instagram.com/p/DV1mkzJFOYo/

---

## Posts estáticos (imagem única)

### 5. nbs-post-cashback — "Cashback em viagens"
- **Tipo:** imagem · 1080x1350
- **Métricas:** 14 likes · 2 comentários · 06/03/2026
- **Tema:** Cartão Visa Infinite com até 5% de cashback em pagamentos internacionais, spread de 0,5%.
- **Arquivo:** `nbs-post-cashback.jpg`
- **URL:** https://www.instagram.com/p/DVjmFzjk-z1/

### 6. nbs-post-global — "App disponível globalmente"
- **Tipo:** imagem · 1080x1350
- **Métricas:** 39 likes · 0 comentários · 29/01/2026
- **Tema:** App NBS disponível em 80+ países; acesso exclusivo para portadores de CPF.
- **Arquivo:** `nbs-post-global.jpg`
- **URL:** https://www.instagram.com/p/DUGpxyKETYN/

---

## Reel (só capa baixada)

### 7. nbs-reel-liberdade — "Liberdade financeira" ⭐ TOP ENGAJAMENTO
- **Tipo:** reel/vídeo · capa 640x1136
- **Métricas:** 112 likes · 20 comentários · 23/01/2026 (maior engajamento do perfil)
- **Tema:** Manifesto — "liberdade financeira não é ganhar mais, é depender menos".
- **Arquivo:** `nbs-reel-liberdade-capa.jpg` (só thumbnail; o vídeo já existe no case como `instagram/reel-liberdade.mp4`)
- **URL:** https://www.instagram.com/reel/DT21DSFjTtQ/

---

## Resumo
- **27 arquivos** de imagem (4 carrosséis × 6 + 2 posts + 1 capa de reel), 3,3 MB total.
- Todos JPG nativos do IG (1080x1350 carrosséis/posts, 4:5), sem necessidade de otimização extra.
- Nomes ASCII limpos, sem espaço/acento.

### Top 3–4 para destacar no case
1. **nbs-carrossel-cartao** (105 likes) — carrossel educativo mais forte, mostra a profundidade do conteúdo.
2. **nbs-reel-liberdade** (112 likes / 20 com) — maior engajamento; manifesto da marca.
3. **nbs-carrossel-anuncios** (74 likes / 13 com) — ângulo B2B/criativo, diferencia do resto.
4. **nbs-carrossel-iof** — comparativo visual didático (bom pra galeria de carrossel).
