import sitemap from "@/app/sitemap";

/**
 * IndexNow — submete todas as URLs do sitemap pro endpoint compartilhado
 * https://api.indexnow.org/indexnow (propaga pra Bing, Yandex, Seznam, Naver etc.).
 *
 * Chave IndexNow: fb1b9ffce6bb3dc47a440a736043147c
 * (derivada de md5("kaleidos.com.br-indexnow"); arquivo de verificação em
 * public/fb1b9ffce6bb3dc47a440a736043147c.txt, servido na raiz do domínio).
 *
 * IMPORTANTE: só chamar DEPOIS do deploy, quando
 * https://kaleidos.com.br/fb1b9ffce6bb3dc47a440a736043147c.txt estiver no ar,
 * senão os buscadores rejeitam a chave.
 *
 * Autenticação: mesmo CRON_SECRET das outras rotas internas (Bearer).
 *
 * Como chamar (manual, após deploy):
 *   curl -X POST https://kaleidos.com.br/api/indexnow \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * Query params:
 *   - ?dry=true → monta o payload e retorna, sem enviar nada pro IndexNow.
 */

const INDEXNOW_KEY = "fb1b9ffce6bb3dc47a440a736043147c";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function isAuthed(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error(
      "[api/indexnow] CRON_SECRET ausente — rota bloqueada. Setar CRON_SECRET na Vercel."
    );
    return false;
  }
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const dry = new URL(req.url).searchParams.get("dry") === "true";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
  const host = new URL(siteUrl).host;

  // Reusa o próprio sitemap do app como fonte única de URLs indexáveis.
  const entries = await sitemap();
  const urlList = entries.map((e) => e.url);

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  if (dry) {
    return Response.json({ ok: true, dry: true, count: urlList.length, payload });
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // IndexNow responde 200 (ok) ou 202 (aceito, chave será validada depois).
  const ok = res.status === 200 || res.status === 202;
  const body = await res.text().catch(() => "");

  return Response.json(
    {
      ok,
      indexnowStatus: res.status,
      submitted: urlList.length,
      keyLocation: payload.keyLocation,
      response: body || undefined,
    },
    { status: ok ? 200 : 502 }
  );
}
