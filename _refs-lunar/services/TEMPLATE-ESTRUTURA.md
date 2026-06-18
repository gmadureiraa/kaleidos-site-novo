# Lunar Strategy — Anatomia das páginas de serviço (referência p/ Kaleidos)

Fonte: scrape Firecrawl de 7 páginas de serviço (markdown + screenshot full-page).
Markdown em `markdown/`, screenshots em `screenshots/` (1920px largura, full-page).

## Template canônico (idêntico nas 7 páginas)

Ordem das seções, de cima pra baixo:

1. **HERO** (fundo escuro, globe/visual 3D à direita)
   - H1 = nome do serviço ("Crypto SEO & Web3 Search Strategy")
   - H2 = subhead de 1 frase com a proposta de valor / promessa
   - CTA primário ("Contact us" / "Book a call")
   - Barra de logos de clientes logo abaixo (prova social)

2. **"Who [serviço] is for"** (fundo claro)
   - 6 cards H3, cada um = um segmento de público framed pelo PROBLEMA dele
   - Ex.: "Pre-Launch Projects", "Post-TGE Protocols", "DeFi Protocols", "L1s/L2s", "AI x Crypto Projects"
   - (a lista aparece 2x no markdown = versão mobile/desktop duplicada)

3. **"Why [serviço] matters"** / bloco de contexto
   - parágrafo + bullets do porquê o serviço importa agora

4. **"Our [serviço] Process"** (numerado)
   - 4–5 passos: Discovery & Research → Strategy → Execution Planning → Delivery & Handoff
   - cada passo com H3 + 1 parágrafo

5. **"What's Included"** / deliverables
   - lista de entregáveis concretos

6. **Case Studies** (fundo escuro, callouts de métrica grandes)
   - 3 cases com nome + número de impacto ("+200%", "3.2B volume" etc.)

7. **Barra de prova/stats**
   - "250+ Crypto Projects", "Crypto-Native Since 2019", "Complete Frameworks"

8. **"Why Lunar for [serviço]"** (diferenciais)
   - 5–6 cards de diferencial

9. **FAQ**
   - 4–6 perguntas H3 + resposta (forte p/ SEO — schema FAQ)

10. **CTA band** (faixa azul/destaque, alto contraste) + **Footer**

## Os 7 serviços scrapeados → mapeamento p/ Kaleidos

| # | Lunar (slug)                     | H1                                  | Equivalente Kaleidos sugerido        |
|---|----------------------------------|-------------------------------------|--------------------------------------|
| 1 | crypto-seo                       | Crypto SEO & Web3 Search Strategy   | SEO / GEO cripto (já temos blog GEO) |
| 2 | go-to-market-strategy            | Web3 Consulting & GTM Strategy      | Growth e Lançamentos (já existe)     |
| 3 | crypto-event-management          | Crypto Event Management             | Eventos (Defifest no portfólio)      |
| 4 | crypto-social-media-marketing    | Crypto Social Media Marketing       | Marketing de Conteúdo (já existe)    |
| 5 | pr                               | PR                                  | PR / Assessoria (novo)               |
| 6 | community-management             | Crypto Community Management         | Comunidade (novo)                    |
| 7 | influencer-strategy              | Crypto Influencer Marketing         | Influencer / KOLs (novo)             |

Obs.: site Kaleidos já tem 3 páginas em `/servicos/*` (ia-automacoes-completa,
marketing-conteudo, growth-lancamentos). O padrão Lunar é mais robusto (who-for /
process / cases / FAQ) — vale evoluir essas 3 e criar as novas seguindo este template.

## Notas de implementação
- FAQ com JSON-LD (FAQPage schema) é o maior ganho de SEO dessas páginas.
- Process e "Who is for" são blocos reutilizáveis → componentizar (1 componente, dados por serviço).
- Cases já existem em `src/lib/case-data.ts` → reaproveitar por serviço (tag/servico match).
- Visual: hero escuro + seções alternando claro/escuro, métricas grandes nos cases.
