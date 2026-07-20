import { caseStudies } from "./blog-cases.generated";
import { seoPosts } from "./blog-seo-posts";
import { seoPosts2 } from "./blog-seo-posts-2";
import { seoPosts3 } from "./blog-seo-posts-3";
import { seoPosts4 } from "./blog-seo-posts-4";
import { seoPosts5 } from "./blog-seo-posts-5";
import { seoPosts6 } from "./blog-seo-posts-6";
import { seoPosts7 } from "./blog-seo-posts-7";
import { seoPosts8 } from "./blog-seo-posts-8";
import { blogNew1 } from "./blog-new-1";
import { blogNew2 } from "./blog-new-2";
import { blogNew3 } from "./blog-new-3";
import { blogNew4 } from "./blog-new-4";
import { blogNew5 } from "./blog-new-5";
import { blogNew6 } from "./blog-new-6";
import { blogNew7 } from "./blog-new-7";
import { blogNew8 } from "./blog-new-8";
import { blogNew9 } from "./blog-new-9";
import { blogNew10 } from "./blog-new-10";
import { blogNew11 } from "./blog-new-11";
import { blogNew12 } from "./blog-new-12";
import { blogNew13 } from "./blog-new-13";
import { blogNew14 } from "./blog-new-14";
import { blogNew15 } from "./blog-new-15";
import { blogNew16 } from "./blog-new-16";
import { blogNew17 } from "./blog-new-17";
import { blogNew18 } from "./blog-new-18";
import { blogNew19 } from "./blog-new-19";
import { blogNew20 } from "./blog-new-20";
import { blogNew21 } from "./blog-new-21";
import { blogNew22 } from "./blog-new-22";
import { blogNew23 } from "./blog-new-23";
import { blogNew24 } from "./blog-new-24";
import { blogNew25 } from "./blog-new-25";
import { blogNew26 } from "./blog-new-26";
import { blogNew27 } from "./blog-new-27";
import { blogNew28 } from "./blog-new-28";
import { blogNew29 } from "./blog-new-29";
import { blogNew30 } from "./blog-new-30";
import { blogNew31 } from "./blog-new-31";
import { blogNew32 } from "./blog-new-32";
import { blogNew33 } from "./blog-new-33";
import { blogNew34 } from "./blog-new-34";
import { blogNew35 } from "./blog-new-35";
import { blogNew36 } from "./blog-new-36";
import { blogNew37 } from "./blog-new-37";
import { blogNew38 } from "./blog-new-38";
import { blogNew39 } from "./blog-new-39";
import { blogNew40 } from "./blog-new-40";
import { blogNew41 } from "./blog-new-41";
import { blogNew42 } from "./blog-new-42";
import { blogNew43 } from "./blog-new-43";
import { blogNew44 } from "./blog-new-44";
import { blogNew45 } from "./blog-new-45";
import { blogNew46 } from "./blog-new-46";
import { blogNew47 } from "./blog-new-47";
import { blogNew48 } from "./blog-new-48";
import { blogNew49 } from "./blog-new-49";
import { blogNew50 } from "./blog-new-50";
import { blogNew51 } from "./blog-new-51";
import { blogNew52 } from "./blog-new-52";
import { blogNew53 } from "./blog-new-53";
import { blogNew54 } from "./blog-new-54";
import { blogNew55 } from "./blog-new-55";
import { blogNew56 } from "./blog-new-56";
import { blogNew57 } from "./blog-new-57";
import { blogNew58 } from "./blog-new-58";
import { blogNew59 } from "./blog-new-59";
import { blogNew60 } from "./blog-new-60";
import { blogNew61 } from "./blog-new-61";
import { blogNew62 } from "./blog-new-62";
import { blogNew63 } from "./blog-new-63";
import { blogNew64 } from "./blog-new-64";
import { blogNew65 } from "./blog-new-65";
import { blogNew66 } from "./blog-new-66";
import { blogNew67 } from "./blog-new-67";
import { blogNew68 } from "./blog-new-68";
import { fetchExternalPosts } from "./blog-external";

// Tipos + helpers de card/labels/data vivem em `blog-shared.ts` (client-safe,
// SEM imports de conteúdo). Re-exportados aqui pra não quebrar os imports
// existentes de quem puxava de `blog-data`. Componentes client devem importar
// DIRETO de `blog-shared` pra não arrastar o markdown completo pro bundle.
import type { BlogPost, BlogCardMeta, BlogCategory } from "./blog-shared";
import { toBlogCard, categoryLabels } from "./blog-shared";

// Re-exporta os tipos/helpers client-safe pra manter compatibilidade dos imports
// existentes (`from "@/lib/blog-data"`). Server code segue funcionando.
export type { BlogCategory, BlogFaqItem, BlogPost, BlogCardMeta } from "./blog-shared";
export { toBlogCard, categoryLabels, categoryColors, formatDate, getModifiedAt } from "./blog-shared";


/**
 * Slugs REMOVIDOS do blog por canibalização de keyword (audit SEO 2026-07-20).
 * Cada um tem um 301 no `next.config.ts` apontando pro post canônico que ficou.
 * O conteúdo NÃO foi deletado dos arquivos-fonte — só sai da agregação (assim o
 * regenerar de `blog-cases.generated.ts` pelo swipe-collector não ressuscita dup).
 *
 * Pares (removido → canônico):
 * - pumpfun-lancamento-como-entretenimento → pumpfun-o-lancamento-que-virou-entretenimento
 * - kaito-mindshare-tokenizado → kaito-o-mindshare-virou-token
 * - arbitrum-airdrop-padrao-e-drama → arbitrum-o-airdrop-que-virou-padrao-de-mercado
 * - base-distribuicao-desleal → base-distribuicao-como-vantagem-desleal
 * - solana-ressurreicao → solana-a-ressurreicao
 * - berachain-comunidade-antes-do-produto → berachain-comunidade-e-memes-antes-do-produto
 * - uniswap-airdrop-fundador → uniswap-o-airdrop-que-escreveu-o-manual
 * - optimism-retropgf-marca → optimism-financiamento-de-bem-publico-posicionamento-de-marca
 * - tron-justin-sun-atencao-a-qualquer-custo → tron-justin-sun-marketing-de-atencao-a-qualquer-custo
 * - story-protocol-ip-onchain → story-protocol-marketar-conceito-abstrato-narrativa-do-ano
 * - incentivos-token-que-duram → incentivos-de-token-que-duram
 * - rebrand-projeto-cripto-quando-como → rebranding-projeto-cripto-quando-como
 * - fintech-content-marketing-tudo-que-precisa-saber → content-marketing-para-fintech
 * - tokenomics-e-marketing-sell-buy-pressure-growth → tokenomics-e-marketing-sell-buy-pressure
 */
const CANNIBALIZED_SLUGS = new Set([
  "pumpfun-lancamento-como-entretenimento",
  "kaito-mindshare-tokenizado",
  "arbitrum-airdrop-padrao-e-drama",
  "base-distribuicao-desleal",
  "solana-ressurreicao",
  "berachain-comunidade-antes-do-produto",
  "uniswap-airdrop-fundador",
  "optimism-retropgf-marca",
  "tron-justin-sun-atencao-a-qualquer-custo",
  "story-protocol-ip-onchain",
  "incentivos-token-que-duram",
  "rebrand-projeto-cripto-quando-como",
  "fintech-content-marketing-tudo-que-precisa-saber",
  "tokenomics-e-marketing-sell-buy-pressure-growth",
]);

// Blog: cases reais (teardowns web3) + posts SEO/GEO project-led (motor de conteúdo
// _SEO-GEO-CONTENT-ENGINE.md). Cases vêm do gerado; SEO posts são escritos à mão aqui.
const allPostsRaw: BlogPost[] = [...seoPosts, ...seoPosts2, ...seoPosts3, ...seoPosts4, ...seoPosts5, ...seoPosts6, ...seoPosts7, ...seoPosts8, ...blogNew1, ...blogNew2, ...blogNew3, ...blogNew4, ...blogNew5, ...blogNew6, ...blogNew7, ...blogNew8, ...blogNew9, ...blogNew10, ...blogNew11, ...blogNew12, ...blogNew13, ...blogNew14, ...blogNew15, ...blogNew16, ...blogNew17, ...blogNew18, ...blogNew19, ...blogNew20, ...blogNew21, ...blogNew22, ...blogNew23, ...blogNew24, ...blogNew25, ...blogNew26, ...blogNew27, ...blogNew28, ...blogNew29, ...blogNew30, ...blogNew31, ...blogNew32, ...blogNew33, ...blogNew34, ...blogNew35, ...blogNew36, ...blogNew37, ...blogNew38, ...blogNew39, ...blogNew40, ...blogNew41, ...blogNew42, ...blogNew43, ...blogNew44, ...blogNew45, ...blogNew46, ...blogNew47, ...blogNew48, ...blogNew49, ...blogNew50, ...blogNew51, ...blogNew52, ...blogNew53, ...blogNew54, ...blogNew55, ...blogNew56, ...blogNew57, ...blogNew58, ...blogNew59, ...blogNew60, ...blogNew61, ...blogNew62, ...blogNew63, ...blogNew64, ...blogNew65, ...blogNew66, ...blogNew67, ...blogNew68, ...caseStudies];

export const blogPosts: BlogPost[] = allPostsRaw.filter(
  (p) => !CANNIBALIZED_SLUGS.has(p.slug)
);

/**
 * Gate de agendamento (publishedAt <= agora).
 *
 * `blogPosts` mantém TODOS os posts (inclusive os com data futura) para que a
 * rota `/blog/[slug]` continue resolvendo cada slug e o build gere as páginas.
 * As LISTAGENS públicas (index do /blog, carrossel da home, sitemap, RSS, JSON-LD
 * de índice) devem usar `getPublishedPosts()` para esconder o que ainda não saiu.
 *
 * Como o site é estático, o "auto-publish" depende de um rebuild: um post agendado
 * só aparece nas listagens depois que a data chega E o site é reconstruído
 * (rebuild semanal — não há cron neste repo). Em componentes client, o filtro roda
 * a cada render com o horário do navegador, então também aparece após a data.
 */
export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  return new Date(post.publishedAt).getTime() <= now.getTime();
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return blogPosts.filter((post) => isPublished(post, now));
}

/**
 * Cards leves dos posts publicados (estáticos em código). Use em Server
 * Components que só renderizam cards (home/listagem) e passam pra UI client —
 * evita serializar `content` (markdown completo) no payload.
 */
export function getPublishedPostCards(now: Date = new Date()): BlogCardMeta[] {
  return getPublishedPosts(now).map(toBlogCard);
}

/** Igual ao getPublishedPostsAsync(), mas devolve cards leves (sem content). */
export async function getPublishedPostCardsAsync(
  now: Date = new Date()
): Promise<BlogCardMeta[]> {
  const all = await getPublishedPostsAsync(now);
  // Listagem do /blog ordenada por data desc (mais recente primeiro) — antes vinha
  // na ordem do array, então post novo nascia no meio do acervo. Datas ISO (YYYY-MM-DD)
  // comparam lexicograficamente; empate cai no updatedAt e depois no slug (estável).
  return all
    .map(toBlogCard)
    .sort(
      (a, b) =>
        (b.publishedAt < a.publishedAt ? -1 : b.publishedAt > a.publishedAt ? 1 : 0) ||
        a.slug.localeCompare(b.slug)
    );
}

/** Cards leves de UMA categoria, já publicados e ordenados por data desc.
 *  Alimenta os hubs SSG /blog/categoria/[cat] (clusters de SEO + linkagem). */
export async function getPublishedPostCardsByCategoryAsync(
  category: BlogCategory,
  now: Date = new Date()
): Promise<BlogCardMeta[]> {
  const all = await getPublishedPostCardsAsync(now);
  return all.filter((c) => c.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const published = getPublishedPosts();
  return published.find((post) => post.featured) || published[0];
}

// Hash estável de string (djb2-ish) pra desempate determinístico e rotativo.
function hashSlug(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Rankeia relacionados por relevância REAL (mesma categoria + tags em comum) e
 * desempata com um hash que combina o slug atual + o candidato. Isso espalha os
 * links pelo acervo (cada post atual gera um conjunto diferente), em vez de todo
 * mundo linkar sempre nos mesmos 3 primeiros da categoria (que deixava ~74/196
 * posts órfãos de link interno).
 */
function rankRelated(current: BlogPost, others: BlogPost[], limit: number): BlogPost[] {
  const curTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));
  return others
    .map((p) => {
      const shared = (p.tags ?? []).reduce((n, t) => n + (curTags.has(t.toLowerCase()) ? 1 : 0), 0);
      const score = (p.category === current.category ? 2 : 0) + shared;
      const tie = hashSlug(current.slug + "|" + p.slug);
      return { p, score, tie };
    })
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .slice(0, limit)
    .map((x) => x.p);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  // Relacionados nunca expõem posts agendados (publishedAt no futuro).
  const others = getPublishedPosts().filter((post) => post.slug !== currentSlug);
  if (!current) return others.slice(0, limit);
  return rankRelated(current, others, limit);
}

// --- Resolvers de SEO/GEO com fallback (campos opcionais) ---

// O template do <title> em `blog/[slug]/page.tsx` monta `${getSeoTitle()} | Kaleidos`.
// O Google corta o <title> por ~600px (na prática ~60 chars). Reservamos o sufixo
// e damos ao seoTitle um orçamento de (60 - 11) = 49 chars, garantindo que o
// <title> FINAL caiba em ~60 sem que o sufixo de marca seja cortado no SERP.
const TITLE_SUFFIX = " | Kaleidos"; // 11 chars
const TITLE_MAX = 60; // alvo do <title> completo no SERP
const SEO_TITLE_BUDGET = TITLE_MAX - TITLE_SUFFIX.length; // 49 chars pro seoTitle

// Conectivos que ficam feios pendurados no fim de um título truncado.
const DANGLING_WORD = /\s+(e|ou|de|da|do|das|dos|que|com|para|pra|a|o|as|os|no|na|em|à|ao|sem|por)$/i;

/**
 * Clamp inteligente de título: se o seoTitle (já sem sufixo) estoura o orçamento,
 * trunca em fronteira de palavra, preservando a keyword-cabeça (início) e SEM
 * reticências (título limpo lê melhor no SERP). Remove pontuação/conectivo solto
 * no fim pra não cortar "Binance: a máquina de" no meio de uma preposição.
 */
function clampSeoTitle(raw: string): string {
  if (raw.length <= SEO_TITLE_BUDGET) return raw;
  const clipped = raw.slice(0, SEO_TITLE_BUDGET).replace(/\s+$/, "");
  const lastSpace = clipped.lastIndexOf(" ");
  // Recua até o último espaço (não corta palavra no meio), desde que não jogue o
  // título curto demais.
  let cut = lastSpace > SEO_TITLE_BUDGET * 0.55 ? clipped.slice(0, lastSpace) : clipped;
  cut = cut.trim();
  // Se sobrou um "(" sem fechar, joga fora o fragmento aberto no fim.
  if ((cut.match(/\(/g)?.length ?? 0) > (cut.match(/\)/g)?.length ?? 0)) {
    cut = cut.slice(0, cut.lastIndexOf("(")).trim();
  }
  // Limpa o fim repetidamente: tirar um conectivo pendurado ("... em cripto: o")
  // pode reexpor uma pontuação solta (o ":"), então rodamos até estabilizar.
  let prev: string;
  do {
    prev = cut;
    cut = cut.replace(/[\s:;,.\-–—(]+$/g, ""); // pontuação/abertura solta no fim
    cut = cut.replace(DANGLING_WORD, ""); // conectivo pendurado ("... marketing e")
    cut = cut.trim();
  } while (cut !== prev);
  return cut;
}

export function getSeoTitle(post: BlogPost): string {
  const raw = post.seoTitle?.trim() || post.title;
  // 104 posts (gerador antigo) vinham com "| Kaleidos" JÁ embutido no seoTitle —
  // o template do <title> anexa o sufixo de novo e virava "… | Kaleidos | Kaleidos".
  // Strip aqui resolve pra todos sem tocar nos arquivos gerados.
  const stripped = raw.replace(/\s*\|\s*Kaleidos\s*$/i, "").trim();
  return clampSeoTitle(stripped);
}

export function getSeoDescription(post: BlogPost): string {
  const raw = (post.seoDescription?.trim() || post.excerpt || "").trim();
  if (raw.length <= 160) return raw;
  // Corta na fronteira de palavra (não no meio de "maiore"), com reticências.
  const clipped = raw.slice(0, 157);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 100 ? clipped.slice(0, lastSpace) : clipped).replace(/[.,;:\s]+$/, "") + "…";
}

// `getModifiedAt` vive em `blog-shared` (re-exportado abaixo).

export function getOgImage(post: BlogPost): string | undefined {
  return post.ogImage?.trim() || post.coverImage?.trim() || undefined;
}

export function getPostTags(post: BlogPost): string[] {
  if (post.tags?.length) return post.tags;
  return [categoryLabels[post.category]];
}

/**
 * TL;DR answer-first pra blocos de citação por IA. Usa o campo `tldr` se existir;
 * senão extrai a 1ª seção "## TL;DR" do markdown; senão cai no excerpt.
 */
export function getTldr(post: BlogPost): string | undefined {
  if (post.tldr?.trim()) return post.tldr.trim();
  const match = post.content.match(/##\s*TL;?DR\s*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i);
  if (match) {
    const block = match[1]
      .replace(/^[-*]\s+/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`#>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (block.length > 30) return block.slice(0, 320);
  }
  return post.excerpt || undefined;
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

// `formatDate` agora vive em `blog-shared` (re-exportado no topo deste arquivo).

// ── Posts publicados pelo KAI (tabela external_blog_posts via feed) ───────────
//
// Os helpers abaixo MERJAM os posts estáticos (em código, com imagens/tldr/etc —
// fonte de verdade) com os posts publicados pelo KAI. São BUILD-SAFE: se o feed
// estiver indisponível ou a env `KAI_BLOG_FEED_URL` não estiver setada,
// `fetchExternalPosts()` devolve [] e o site builda só com os estáticos.
//
// Conflito de slug: o estático SEMPRE vence (não sobrescreve post curado em código).

/** Static (em código) + externos (KAI), deduplicado por slug — estático vence. */
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  let external: BlogPost[] = [];
  try {
    external = await fetchExternalPosts("kaleidos");
  } catch {
    external = [];
  }
  if (external.length === 0) return blogPosts;
  const staticSlugs = new Set(blogPosts.map((p) => p.slug));
  const extraOnly = external.filter((p) => !staticSlugs.has(p.slug));
  return [...blogPosts, ...extraOnly];
}

/** Igual a getPublishedPosts(), mas incluindo posts publicados pelo KAI. */
export async function getPublishedPostsAsync(now: Date = new Date()): Promise<BlogPost[]> {
  const all = await getAllPostsAsync();
  return all.filter((post) => isPublished(post, now));
}

/** Igual a getPostBySlug(), mas resolve também slugs vindos do KAI. */
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  const local = getPostBySlug(slug);
  if (local) return local;
  const all = await getAllPostsAsync();
  return all.find((post) => post.slug === slug);
}

/** Igual a getRelatedPosts(), considerando também posts do KAI. */
export async function getRelatedPostsAsync(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const published = await getPublishedPostsAsync();
  const current = published.find((p) => p.slug === currentSlug)
    ?? (await getPostBySlugAsync(currentSlug));
  const others = published.filter((post) => post.slug !== currentSlug);
  if (!current) return others.slice(0, limit);
  return rankRelated(current, others, limit);
}
