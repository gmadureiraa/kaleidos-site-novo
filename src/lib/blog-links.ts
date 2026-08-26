/**
 * Tratamento de links internos que apontam pra posts AINDA NÃO PUBLICADOS.
 *
 * Contexto (26/08/2026): a rota `/blog/[slug]` passou a ter gate de data — post
 * com `publishedAt` no futuro responde 404 até a data (ver `getPostBySlugAsync`).
 * Ligar o gate sozinho trocaria 83 posts vazados por links internos quebrados em
 * páginas que JÁ estão no ar. Medição do dia: 12 pares publicado→futuro, mais 4
 * links pra slugs que nem existem (canibalizados e removidos do acervo).
 *
 * A regra é aplicada em RENDER, não por edição manual do markdown, por dois
 * motivos:
 *  1. Ela se desfaz sozinha. Na data do destino o slug volta a ser resolvível e
 *     o link reaparece — o `revalidate = 3600` da rota republica em até 1h. Uma
 *     edição manual do texto não volta atrás sozinha.
 *  2. Ela é permanente. Qualquer post agendado daqui pra frente já nasce coberto;
 *     ninguém precisa lembrar de reauditar links antes de agendar.
 *
 * Critério POR LINK (decidido pela forma do link, não caso a caso):
 *  - Item de lista que é SÓ o link (bloco "Posts relacionados"): a linha inteira
 *    sai. Um item de lista sem link é lixo visual — não há frase pra preservar.
 *  - Link inline no meio do texto: vira texto puro. A frase continua íntegra e
 *    lendo igual; só perde o <a>. Nunca reescrevemos a frase do post.
 *  - `/blog/categoria/<cat>`: NUNCA tocado. Hub sempre existe.
 *
 * O que NÃO fizemos, e por quê:
 *  - Redirecionar o link pro hub da categoria: o texto âncora é o título de um
 *    post específico ("teardown da Chainlink"). Levar isso pra uma listagem é
 *    prometer uma coisa e entregar outra — pior que não linkar.
 *  - Antecipar a data dos 10 destinos: publicaria 10 posts fora da fila editorial
 *    só pra salvar um link. A cauda causal é o link, não o calendário.
 *  - Adiar o post de ORIGEM: as 10 origens estão no ar há semanas. Despublicar
 *    conteúdo vivo pra proteger link é trocar o problema por um maior.
 */

/** `[texto](/blog/slug)`, tolerando #ancora e ?query depois do slug. */
const INTERNAL_BLOG_LINK = /\[([^\]\n]+)\]\(\/blog\/([a-z0-9-]+)((?:[#?][^)\s]*)?)\)/gi;

/** Linha de lista markdown cujo conteúdo é EXATAMENTE um link interno. */
const LIST_ITEM_ONLY_LINK = /^\s*[-*]\s+\[([^\]\n]+)\]\(\/blog\/([a-z0-9-]+)(?:[#?][^)\s]*)?\)\s*$/i;

/**
 * Neutraliza links internos cujo destino não está publicado.
 * `isResolvable(slug)` decide: true = link fica intacto.
 */
export function defuseUnresolvedInternalLinks(
  content: string,
  isResolvable: (slug: string) => boolean
): string {
  const out: string[] = [];

  for (const line of content.split("\n")) {
    const listOnly = line.match(LIST_ITEM_ONLY_LINK);
    if (listOnly && !isResolvable(listOnly[2])) {
      // linha inteira sai (item de "Posts relacionados")
      continue;
    }

    INTERNAL_BLOG_LINK.lastIndex = 0;
    out.push(
      line.replace(INTERNAL_BLOG_LINK, (whole, text: string, slug: string) =>
        isResolvable(slug) ? whole : text
      )
    );
  }

  return out.join("\n");
}

/** Slugs de destino em links internos `/blog/<slug>` de um markdown. */
export function extractInternalBlogLinkSlugs(content: string): string[] {
  const slugs: string[] = [];
  INTERNAL_BLOG_LINK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = INTERNAL_BLOG_LINK.exec(content))) slugs.push(m[2]);
  return slugs;
}
