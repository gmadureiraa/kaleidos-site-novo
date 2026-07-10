import type { Metadata } from "next";
import { getAllPostsAsync } from "@/lib/blog-data";
import { categoryLabels } from "@/lib/blog-shared";
import { AppDashboard, type DashPost } from "./app-client";

export const metadata: Metadata = {
  title: "Painel · Kaleidos",
  robots: { index: false, follow: false },
};

// Revalida junto do blog pra refletir agendados que viram live.
export const revalidate = 3600;

export default async function AppPage() {
  const posts = await getAllPostsAsync();
  const now = Date.now();

  const dash: DashPost[] = posts
    .map((p) => {
      const t = new Date(p.publishedAt).getTime();
      const status: DashPost["status"] = t <= now ? "publicado" : "agendado";
      return {
        slug: p.slug,
        title: p.title,
        publishedAt: p.publishedAt,
        coverImage: p.coverImage || "",
        category: categoryLabels[p.category] ?? p.category,
        readTime: p.readTime,
        featured: !!p.featured,
        status,
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return <AppDashboard posts={dash} generatedAt={new Date(now).toISOString()} />;
}
