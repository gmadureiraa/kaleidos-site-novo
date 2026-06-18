import { papers } from "@/lib/papers-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";

// Revalida a cada hora. Serve de gatilho RSS pras automações do KAI:
// paper novo publicado → feed atualiza → automação gera conteúdo repurposed.
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
  // Só papers visíveis (hidden = pré-lançamento fica fora do feed).
  const sorted = papers
    .filter((p) => !p.hidden)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const lastBuild = sorted.length
    ? new Date(sorted[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const items = sorted
    .map((paper) => {
      const url = `${SITE_URL}/papers/${paper.slug}`;
      const desc = paper.tldr?.trim() || paper.description;
      return `    <item>
      <title>${escapeXml(`${paper.volume} — ${paper.title}: ${paper.subtitle}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(desc)}</description>
      <category>${escapeXml(paper.tag)}</category>
      <dc:creator>Kaleidos</dc:creator>
      <pubDate>${new Date(paper.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Kaleidos Papers — Estudos de Marketing Cripto</title>
    <link>${SITE_URL}/papers</link>
    <description>Estudos e playbooks de marketing cripto e web3 da Kaleidos. Jogadas reais, com dado e fonte.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/papers/rss.xml" rel="self" type="application/rss+xml" />
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
