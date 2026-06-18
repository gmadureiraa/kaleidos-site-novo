import { getPublishedPostsAsync } from "@/lib/blog-data";
import { BlogIndexClient } from "./blog-index-client";

// Server component: busca os posts publicados (estáticos em código + publicados
// pelo KAI via feed). Build-safe — sem o feed, vem só os estáticos. Passa pra UI
// client (filtro/highlight/grid).
export default async function BlogPage() {
  const posts = await getPublishedPostsAsync();
  return <BlogIndexClient posts={posts} />;
}
