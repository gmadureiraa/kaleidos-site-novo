import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPostBySlug } from "@/lib/blog-data";

// Lazy Resend client — only created when an API call actually happens,
// so the build never fails due to a missing RESEND_API_KEY env var.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

/**
 * POST /api/newsletter
 * Sends a blog post as a newsletter broadcast to the Kaleidos audience.
 *
 * Body: { slug: string, audienceId?: string }
 *
 * Flow (Beehiiv-style):
 * 1. Fetch blog post by slug
 * 2. Convert content to email HTML template
 * 3. Send as broadcast via Resend
 */
/**
 * Auth: this route can create/send a Resend broadcast to the whole audience,
 * so it must never be callable anonymously. We require the same CRON_SECRET
 * used by the cron routes, via Authorization: Bearer <secret>, ?token=<secret>,
 * or the x-vercel-cron header (set automatically by Vercel Cron).
 */
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // If no secret is configured, fail closed (deny) rather than open.
  if (!secret) return false;
  // NÃO confiar no header `x-vercel-cron` sozinho: ele é spoofável por qualquer
  // caller externo (não é stripado na entrada), o que dava bypass total desta
  // rota de broadcast. O Vercel Cron injeta `Authorization: Bearer <CRON_SECRET>`
  // automaticamente quando CRON_SECRET está setada, então a checagem abaixo já
  // cobre o cron legítimo. (Achado da auditoria 2026-07-16.)
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  const token = new URL(req.url).searchParams.get("token");
  if (token && token === secret) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug, audienceId } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const post = getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const emailHtml = buildNewsletterHtml(post.title, post.excerpt, post.content, post.slug, post.coverImage);

    // If audienceId is provided, create a broadcast
    // Otherwise, just return the preview HTML
    if (audienceId && process.env.RESEND_API_KEY) {
      const resend = getResend();
      const broadcast = await resend.broadcasts.create({
        audienceId,
        from: process.env.SENDER_EMAIL || "Kaleidos <blog@kaleidos.com.br>",
        subject: post.title,
        html: emailHtml,
        name: `Blog: ${post.title}`,
      });

      // Auto-send the broadcast
      if (broadcast.data?.id) {
        await resend.broadcasts.send(broadcast.data.id);
      }

      return NextResponse.json({
        success: true,
        broadcastId: broadcast.data?.id,
        message: `Newsletter "${post.title}" enviada para a audiencia.`,
      });
    }

    // Preview mode — return the HTML
    return NextResponse.json({
      success: true,
      preview: true,
      title: post.title,
      html: emailHtml,
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send newsletter";
    const status = message.includes("RESEND_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

function buildNewsletterHtml(
  title: string,
  excerpt: string,
  markdownContent: string,
  slug: string,
  coverImage: string
): string {
  const postUrl = `https://kaleidos.com.br/blog/${slug}`;
  const coverUrl = coverImage.startsWith("http")
    ? coverImage
    : `https://kaleidos.com.br${coverImage}`;
  const contentHtml = simpleMarkdownToHtml(markdownContent);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#050507;color:#e0e0e0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <a href="https://kaleidos.com.br" style="color:#7CF067;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.05em;">KALEIDOS</a>
    </div>

    <!-- Cover Image -->
    <div style="margin-bottom:32px;border-radius:12px;overflow:hidden;">
      <img src="${coverUrl}" alt="${title}" style="width:100%;height:auto;display:block;" />
    </div>

    <!-- Title -->
    <h1 style="color:#ffffff;font-size:28px;line-height:1.2;margin:0 0 16px 0;font-weight:700;">
      ${title}
    </h1>

    <!-- Excerpt -->
    <p style="color:#888;font-size:16px;line-height:1.6;margin:0 0 32px 0;">
      ${excerpt}
    </p>

    <hr style="border:none;border-top:1px solid #1a1a24;margin:0 0 32px 0;" />

    <!-- Content -->
    <div style="color:#ccc;font-size:16px;line-height:1.8;">
      ${contentHtml}
    </div>

    <hr style="border:none;border-top:1px solid #1a1a24;margin:32px 0;" />

    <!-- CTA -->
    <div style="text-align:center;margin:32px 0;">
      <a href="${postUrl}" style="display:inline-block;padding:12px 28px;background-color:#7CF067;color:#000;text-decoration:none;font-weight:600;font-size:14px;border-radius:8px;">
        Ler no blog
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:48px;padding-top:24px;border-top:1px solid #1a1a24;">
      <p style="color:#555;font-size:12px;margin:0 0 8px 0;">
        Kaleidos — Marketing digital, IA e crescimento de marcas.
      </p>
      <p style="color:#555;font-size:12px;margin:0;">
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#555;text-decoration:underline;">Cancelar inscricao</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

function simpleMarkdownToHtml(md: string): string {
  let html = md.trim();
  html = html.replace(/^### (.+)$/gm, '<h3 style="color:#fff;font-size:18px;margin:28px 0 12px 0;font-weight:600;">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="color:#fff;font-size:22px;margin:32px 0 16px 0;font-weight:700;">$1</h2>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`(.+?)`/g, '<code style="background:#1a1a24;padding:2px 6px;border-radius:4px;color:#7CF067;font-size:14px;">$1</code>');
  html = html.replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:8px;">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul style="margin:16px 0;padding-left:20px;">${match}</ul>`);
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;">$1</li>');
  html = html.split("\n\n").map((block) => {
    const t = block.trim();
    if (!t || t.startsWith("<h") || t.startsWith("<ul") || t.startsWith("<ol") || t.startsWith("<li")) return t;
    return `<p style="margin:0 0 16px 0;">${t}</p>`;
  }).join("\n");
  return html;
}
