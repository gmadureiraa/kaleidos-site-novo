import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Padrão: tudo liberado, exceto rotas internas/API.
      {
        userAgent: "*",
        allow: "/",
        // "/app$" (Google suporta $): bloqueia só a rota /app exata sem pegar
        // /apresentacao por prefixo. /app não tem sub-rotas (só page.tsx).
        disallow: ["/api/", "/admin/", "/_next/", "/app$"],
      },
      // Bots de IA explicitamente liberados — queremos ser crawleados e citados (GEO).
      // GPTBot ignora llms.txt e crawleia HTML direto; o que vale é permitir o acesso.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Bytespider",
          "Amazonbot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/", "/app$"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
