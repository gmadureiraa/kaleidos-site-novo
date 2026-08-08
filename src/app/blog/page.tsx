import { getPublishedPostCardsAsync, getPublishedPostsAsync } from "@/lib/blog-data";
import { BlogIndexJsonLd } from "@/components/blog/blog-jsonld";
import { BlogIndexClient } from "./blog-index-client";

// ISR: revalida a listagem de hora em hora pra que posts agendados apareçam na
// grade assim que a data chegar, sem redeploy. Casa com o revalidate do [slug].
export const revalidate = 3600;

// Server component: busca os posts publicados (estáticos em código + publicados
// pelo KAI via feed). Build-safe — sem o feed, vem só os estáticos. Passa só os
// CARDS LEVES (sem o markdown `content`) pra UI client — a listagem só renderiza
// capa/título/excerpt, então o conteúdo completo dos posts não precisa ir pro
// bundle/payload do client (economiza ~1MB de JS).
export default async function BlogPage() {
  const posts = await getPublishedPostCardsAsync();
  // JSON-LD de índice: só AQUI (antes vivia no layout e vazava pra todo post).
  const full = await getPublishedPostsAsync();
  return (
    <>
      <BlogIndexJsonLd posts={full} />
      <BlogIndexClient posts={posts} />
    </>
  );
}
