import {
  getPublishedPostsAsync,
  getSeoDescription,
  getModifiedAt,
  categoryLabels,
} from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";

// Revalida o feed a cada hora (ISR no route handler).
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Só posts já publicados no feed (estáticos + KAI; agendados entram após a data + rebuild/revalidate).
  const sorted = (await getPublishedPostsAsync()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const lastBuild = sorted.length
    ? new Date(getModifiedAt(sorted[0])).toUTCString()
    : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(getSeoDescription(post))}</description>
      <category>${escapeXml(categoryLabels[post.category])}</category>
      <dc:creator>${escapeXml(post.author.name)}</dc:creator>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Blog da Kaleidos — Marketing Cripto, Web3, IA e Growth</title>
    <link>${SITE_URL}/blog</link>
    <description>Estudos e análises densas sobre marketing cripto, web3, IA e growth. Por que projetos crescem — e como aplicar.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
