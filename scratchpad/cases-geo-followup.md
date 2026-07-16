# Cases GEO — follow-up (faq + tldr densos)

Contexto: batch de SEO/GEO do blog (branch `feat/blog-geo-batch`, 2026-07-15).

## O que já foi feito (determinístico, sem inventar)

O gerador `swipe-collector/build-cases-data.ts` agora popula, para os 104 cases
auto-gerados em `src/lib/blog-cases.generated.ts`:

- `seoTitle` = `<título> | Kaleidos` (o título dos cases já lidera com a keyword).
- `seoDescription` = `resumo` do frontmatter quando existe, senão o `excerpt`;
  limpo (sem markdown), cortado na fronteira de palavra (~150c).
- `tags` = `categoria` + tags-entidade do frontmatter (menos as tags de workflow
  `blog-kaleidos` / `case-study` / `web3-marketing`), deduplicadas.
- `updatedAt` = data de publicação (sinal `dateModified` / freshness).

Regenerar: `cd code/swipe-collector && bun run build-cases-data.ts`.

Nota de parity: o post `ser-citado-chatgpt-perplexity-gemini` estava com o arquivo
do vault prefixado `_51-...` (prefixo `_` = o gerador ignora como utilitário),
mas já estava publicado no arquivo gerado. Renomeei o md do vault de
`_51-...` para `51-...` pra o gerador manter os 104 posts (sem regressão).

## Pendente — NÃO gerar automaticamente (exige conteúdo real)

`faq` (vira FAQPage JSON-LD, alto impacto GEO) e `tldr` (resumo answer-first,
citação extraível por LLM) precisam de **geração de conteúdo real por post** —
perguntas/respostas e um resumo fiel ao artigo. Não dá pra derivar
deterministicamente sem inventar, então ficam de fora deste batch.

### Como completar (proposta)

1. Para cada case em `blog/cases/*.md`, gerar via LLM:
   - `tldr`: 1-2 frases (40-60 palavras) answer-first, sem inventar métrica —
     só reformular o que o artigo já afirma.
   - `faq`: 3-4 pares Q&A extraídos do corpo do post (dúvidas reais que o
     artigo responde), respostas de 2-4 frases.
2. Gravar como frontmatter no `.md` do vault (ex.: bloco `tldr:` e `faq:`),
   e estender o gerador pra lê-los (mesma lógica de `tagsOf` / `fmField`).
3. Revisão humana obrigatória antes de publicar (regra: não inventar dados).
4. Referência de qualidade: os 10 posts de `src/lib/blog-seo-posts-8.ts` já têm
   `faq` + `tldr` densos e servem de molde de tom/estrutura.

Estimativa: ~104 posts × (1 tldr + ~3 FAQ) — lote de LLM com revisão.
