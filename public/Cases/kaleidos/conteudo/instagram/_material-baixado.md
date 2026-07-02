---
fonte: https://www.instagram.com/digitalkaleidos/
perfil: "@digitalkaleidos"
data-baixado: 2026-06-26
scraper: apify~instagram-scraper (via swipe-collector/download-kaleidos-ig.ts)
total-posts: 8
total-midias: 16
---

# Material baixado — Instagram @digitalkaleidos (Kaleidos agência)

Baixado pra alimentar o case da própria Kaleidos no portfólio do site.
Mídia nativa, sem corte. Reels/imagens dentro dos limites (nenhuma compressão necessária).

**Observação importante:** o perfil @digitalkaleidos só tinha **8 posts públicos** no momento da
coleta (cap de 30 não foi atingido — Apify retornou tudo que existe). Não há mais conteúdo a baixar.
Métricas de engajamento são baixas (perfil institucional recente, pouca tração orgânica) — usar
o conteúdo mais pela QUALIDADE editorial/visual do que pelos números.

## Custo Apify

- 8 result items × ~US$ 0,0023/item = **~US$ 0,02 (≈ R$ 0,10)**.
- Run único `run-sync-get-dataset-items` do actor `apify~instagram-scraper`.

## Inventário por shortcode

| Shortcode | Tipo | Data | Likes | Coments | Views | Tema | Arquivos |
|-----------|------|------|-------|---------|-------|------|----------|
| `DXW65NFDnQ1` | carrossel 4 slides | 2026-04-20 | 8 | 0 | — | Qualidade > quantidade: conteúdo com tempo, intenção e contexto | `kld-DXW65NFDnQ1-slide-01..04.jpg` |
| `DXcoNNsiVjM` | reel | 2026-04-22 | 8 | 0 | 273 | Planejamento de perfil ponta a ponta (SEO, copy, webdesign, growth) | `kld-DXcoNNsiVjM-reel.mp4` + `-capa.jpg` |
| `DXhq6g-lQko` | estático | 2026-04-24 | 3 | 0 | — | Série: "coisas que passamos ao trabalhar com Marketing e Design" | `kld-DXhq6g-lQko-slide-01.jpg` |
| `DXpL_NqDu4H` | carrossel 3 slides | 2026-04-27 | 3 | 0 | — | Marketing em ambientes que você não controla (algoritmos, alcance) | `kld-DXpL_NqDu4H-slide-01..03.jpg` |
| `DXzOKF2kQc0` | estático | 2026-05-01 | 6 | 1 | — | Constância > conteúdo perfeito: apenas comece | `kld-DXzOKF2kQc0-slide-01.jpg` |
| `DX6-5emEX7U` | estático | 2026-05-04 | 4 | 1 | — | Quando planejamento vira adiamento (paralisia por análise) | `kld-DX6-5emEX7U-slide-01.jpg` |
| `DYFWcuwCu8j` | estático | 2026-05-08 | 4 | 0 | — | Crescimento como métrica estética × demanda real | `kld-DYFWcuwCu8j-slide-01.jpg` |
| `DYP8NI9lVkv` | carrossel 3 slides | 2026-05-12 | 5 | 0 | — | Produzir conteúdo com método; menção ao Sequência Viral | `kld-DYP8NI9lVkv-slide-01..03.jpg` |

## Arquivos brutos de apoio

- `_apify-raw.json` — payload completo do Apify (captions full, hashtags, comentários, dimensões)
- `_report.json` — relatório estruturado por post (métricas + nomes de arquivo)

## Status do case "kaleidos" em case-data.ts

⚠️ **NÃO existe um case da própria Kaleidos (agência)** em
`/Users/gabrielmadureira/GOS/code/site-kaleidos/src/lib/case-data.ts`.

O que existe e é parecido mas NÃO é o mesmo:
- `defiverso`, `orlando`, `yasmin` etc. → cases de CLIENTES geridos pela Kaleidos
- `kaleidos-pay`, `kai-platform`, `defi-radar` → PRODUTOS internos da Kaleidos (tech portfolio)

**Próximo agente precisa CRIAR** um case novo (sugestão de id: `kaleidos`) representando o
conteúdo institucional próprio da agência (@digitalkaleidos), usando esta mídia como galeria.
Caminho público das imagens no case: `/Cases/kaleidos/conteudo/instagram/<arquivo>`.
