import { getPublishedPostCardsAsync } from "@/lib/blog-data";
import { BlogIndexClient } from "./blog-index-client";

// Server component: busca os posts publicados (estáticos em código + publicados
// pelo KAI via feed). Build-safe — sem o feed, vem só os estáticos. Passa só os
// CARDS LEVES (sem o markdown `content`) pra UI client — a listagem só renderiza
// capa/título/excerpt, então o conteúdo completo dos posts não precisa ir pro
// bundle/payload do client (economiza ~1MB de JS).
export default async function BlogPage() {
  const posts = await getPublishedPostCardsAsync();
  return <BlogIndexClient posts={posts} />;
}
