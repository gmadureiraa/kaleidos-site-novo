/**
 * Decisão de gate de agendamento usada pelo MIDDLEWARE (edge).
 *
 * Precisa ser leve: nada de importar `blog-data.ts` aqui (arrasta o markdown de
 * ~300 posts). O mapa vem de `blog-schedule.generated.ts`, regerado no prebuild.
 *
 * Por que o gate de data precisa passar pelo middleware, e não só pela rota:
 * medido em 26/08/2026, `notFound()` em `/blog/[slug]` devolve HTTP 200 com o
 * corpo da página de não-encontrado (soft-404) sempre que a rota é renderizada
 * sob demanda. O único jeito de o agendado responder 404 DE VERDADE, sem tirar
 * o slug do build (o que o impediria de entrar no ar sozinho na data), é barrar
 * antes do render.
 */
import { BLOG_PUBLISHED_AT } from "./blog-schedule.generated";

/** Extrai o slug de `/blog/<slug>` e `/blog/<slug>/<qualquer coisa>`. */
export function blogSlugFromPathname(pathname: string): string | null {
  const m = pathname.match(/^\/blog\/([^/]+)(?:\/.*)?$/);
  if (!m) return null;
  const slug = decodeURIComponent(m[1]);
  // `/blog/categoria/<cat>` é hub de listagem, não post.
  if (slug === "categoria") return null;
  return slug;
}

/**
 * true = o path é de um post com `publishedAt` no futuro; deve responder 404.
 *
 * Slug fora do mapa devolve false de propósito: são os posts que vêm do feed do
 * KAI (o KAI só manda o que já publicou) e as rotas de asset. Bloquear o que não
 * conhecemos derrubaria o blog inteiro se o mapa saísse dessincronizado — e o
 * gate de `getPostBySlugAsync` continua sendo a segunda camada.
 */
export function isScheduledBlogPath(pathname: string, now: Date = new Date()): boolean {
  const slug = blogSlugFromPathname(pathname);
  if (!slug) return false;
  const publishedAt = BLOG_PUBLISHED_AT[slug];
  if (!publishedAt) return false;
  return new Date(publishedAt).getTime() > now.getTime();
}
