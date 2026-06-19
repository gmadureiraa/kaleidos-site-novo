import { getPublishedPostCards } from "@/lib/blog-data";
import { papers } from "@/lib/papers-data";
import { HomeResourcesClient } from "@/components/home-resources-client";

/**
 * Seção dupla perto do fim da home (Server Component):
 * (a) grid de capas dos playbooks/papers (estilo Lunar guides) — VEM PRIMEIRO e
 *     com o Guia de Marketing (playbook-cripto-2026) na frente; e
 * (b) posts recentes do blog (carrossel) logo abaixo.
 *
 * A curadoria/ordenação roda NO SERVIDOR e só os CARDS LEVES (sem o markdown
 * completo dos posts) descem pro client. Isso tira ~1MB de conteúdo do bundle
 * client da home — antes `getPublishedPosts()` arrastava todo o `content` dos
 * posts pro JS da página.
 */

// Posts em destaque (curados) — os mais fortes de marketing cripto / cases /
// narrativas / lançamento. GEO/SEO-vs-GEO ficam só no /blog, fora da home.
const FEATURED_SLUGS = [
  "marketing-cripto-guia-completo-2026",
  "como-lancar-token-tge-guia-marketing",
  "narrativas-cripto-2026",
  "comunidade-cripto-que-nao-morre",
  "airdrop-quanto-alocar-supply-roi",
  "infofi-kaito-atencao-novo-jogo-cripto",
  "stablecoins-rwa-marketing-onda-institucional",
  "kol-marketing-fundraising-cripto-guia",
];

// Temas de GEO ficam fora da home (continuam normalmente no /blog).
const HOME_EXCLUDE = new Set([
  "geo-como-ser-citado-pela-ia-guia-cripto",
  "seo-vs-geo-2026-onde-investir",
]);

const GUIA_SLUG = "playbook-cripto-2026";

export function HomeResources() {
  // Só posts já publicados (publishedAt <= agora): agendados não entram no carrossel.
  const publishedPosts = getPublishedPostCards();
  const featured = FEATURED_SLUGS.map((s) =>
    publishedPosts.find((p) => p.slug === s)
  ).filter(Boolean) as typeof publishedPosts;
  const rest = [...publishedPosts]
    .filter((p) => !FEATURED_SLUGS.includes(p.slug) && !HOME_EXCLUDE.has(p.slug))
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const featuredPosts = [...featured, ...rest].slice(0, 8);

  // Papers visíveis com o Guia de Marketing (playbook completo) sempre em 1º.
  const shownPapers = papers.filter((p) => !p.hidden);
  const guia = shownPapers.find((p) => p.slug === GUIA_SLUG);
  const visiblePapers = (
    guia
      ? [guia, ...shownPapers.filter((p) => p.slug !== GUIA_SLUG)]
      : shownPapers
  )
    .slice(0, 4)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      volume: p.volume,
      accent: p.accent,
      cover: p.cover,
    }));

  return <HomeResourcesClient posts={featuredPosts} papers={visiblePapers} />;
}
