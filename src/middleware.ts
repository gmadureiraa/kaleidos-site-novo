import { NextRequest, NextResponse } from "next/server";

import { isScheduledBlogPath } from "@/lib/blog-schedule";

// HTTP Basic Auth nas superfícies internas (/app e /orcamento).
// Senha SÓ via env (APP_DASHBOARD_PASSWORD).
// Sem fallback: se a env não estiver setada, nega tudo (fail-closed) em vez de
// cair numa senha commitada no repo. Usuário: kaleidos.
const USER = "kaleidos";

// Compare em tempo constante (edge runtime não tem crypto.timingSafeEqual).
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function unauthorized() {
  return new NextResponse("Auth necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Kaleidos App", charset="UTF-8"' },
  });
}


/**
 * 404 real pra post agendado. HTML próprio (e mínimo) de propósito: é a única
 * resposta em que o status não depende do cache do roteador.
 */
function scheduledNotFound() {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Página não encontrada · Kaleidos</title>
<style>
  :root{color-scheme:light dark}
  body{margin:0;min-height:100vh;display:grid;place-items:center;
    font:16px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
    background:#0b0b0f;color:#f4f4f5;text-align:center;padding:24px}
  main{max-width:34rem}
  h1{font-size:clamp(1.6rem,4vw,2.2rem);margin:0 0 .75rem}
  p{margin:0 0 1.5rem;color:#a1a1aa}
  a{display:inline-block;padding:.7rem 1.4rem;border-radius:999px;
    background:#f4f4f5;color:#0b0b0f;text-decoration:none;font-weight:600}
</style></head><body><main>
<h1>Página não encontrada</h1>
<p>Esse conteúdo não está publicado. Se ele foi anunciado pra uma data, volte nela.</p>
<a href="/blog">Ir para o blog</a>
</main></body></html>`;

  return new NextResponse(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "no-store",
    },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Gate de agendamento do blog ────────────────────────────────────────────
  // Post com publishedAt no futuro responde 404 REAL aqui, antes do render.
  // A rota sozinha não consegue: `notFound()` em /blog/[slug] devolve 200 com o
  // corpo de não-encontrado (soft-404, medido em 26/08/2026). Tentamos também
  // `NextResponse.rewrite` pra um slug inexistente: a página certa aparece, mas o
  // status oscila entre 404 (primeiro acesso) e 200 (cacheado) — inaceitável num
  // gate. Por isso a resposta 404 é montada aqui, determinística.
  //
  // Na data do post o bloqueio some sozinho: a comparação é com `new Date()` a
  // cada request. Sem redeploy, sem cron.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    // try/catch fail-OPEN de propósito: um erro aqui derrubaria o blog público
    // inteiro. O gate de `getPostBySlugAsync` continua atrás, então o pior caso
    // de um erro é o agendado voltar a responder soft-404 — nunca vazar conteúdo,
    // nunca tirar o blog do ar.
    try {
      if (isScheduledBlogPath(pathname)) return scheduledNotFound();
    } catch {
      // segue o baile
    }
    return NextResponse.next();
  }

  const expected = process.env.APP_DASHBOARD_PASSWORD;
  if (!expected) return unauthorized(); // fail-closed sem senha configurada

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (safeEqual(user, USER) && safeEqual(pass, expected)) {
        return NextResponse.next();
      }
    }
  }
  return unauthorized();
}

export const config = {
  // /orcamento entrou aqui em 08/08/2026: a calculadora é interna (ela mesma se
  // rotula "interno · não publicar") e expõe a régua inteira, os pisos por
  // família, a margem-alvo e os pacotes aposentados. Estava protegida só por
  // `robots: { index: false }`, o que não impede ninguém com o link de abrir.
  // Contradizia a decisão do mesmo dia de tirar preço da /marca-pessoal.
  // Verificado antes de trancar: nenhum CTA, campanha ou material comercial
  // linka /orcamento (grep em code/ e no vault) — não é ferramenta pública de
  // qualificação de lead.
  // `/blog/:path*` entrou em 26/08/2026 pelo gate de agendamento (ver acima).
  // ⚠️ O handler PRECISA tratar /blog antes do Basic Auth: sem o early return, o
  // fail-closed de senha ausente trancaria o blog público inteiro atrás de 401.
  matcher: [
    "/app",
    "/app/:path*",
    "/orcamento",
    "/orcamento/:path*",
    "/blog/:path*",
  ],
};
