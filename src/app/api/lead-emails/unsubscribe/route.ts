import { unsubscribeByEmail } from "@/lib/db/leads";
import { verifyUnsubToken } from "@/lib/emails/unsubscribe";

function htmlPage(title: string, body: string, ok = true) {
  const accent = ok ? "#16a34a" : "#dc2626";
  return new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/><title>${title} · Kaleidos</title><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body style="margin:0;padding:0;background:#0a0a0a;color:#fff;font-family:Inter,system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;"><div style="max-width:480px;margin:0 auto;padding:48px 24px;text-align:center;"><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#7CFF6B;font-weight:600;margin-bottom:16px;">Kaleidos</div><h1 style="font-size:28px;font-weight:600;margin:0 0 16px 0;color:${accent};">${title}</h1><p style="font-size:15px;color:#a3a3a3;line-height:1.6;margin:0 0 24px 0;">${body}</p><a href="https://kaleidos.com.br" style="display:inline-block;padding:12px 24px;background:#fff;color:#000;text-decoration:none;border-radius:999px;font-size:14px;font-weight:600;">Voltar ao site</a></div></body></html>`,
    { status: ok ? 200 : 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return htmlPage("Link inválido", "Falta o token de descadastro nessa URL.", false);
  }
  const email = verifyUnsubToken(token);
  if (!email) {
    return htmlPage("Link inválido", "Esse link de descadastro expirou ou foi adulterado. Manda um email pra madureira@kaleidosdigital.com pedindo descadastro.", false);
  }

  let removed = false;
  try {
    removed = await unsubscribeByEmail(email);
  } catch (err) {
    console.error("[unsubscribe] erro:", err);
  }

  if (removed) {
    return htmlPage(
      "Descadastrado",
      `O email <strong style="color:#fff">${email}</strong> não vai mais receber a sequência Kaleidos AI. Sem rancor — boa sorte com a operação.`
    );
  }
  // Fallback gracioso: se DB ausente ou já não tava na base, ainda confirma
  return htmlPage(
    "Pedido recebido",
    `Marcamos o pedido pra <strong style="color:#fff">${email}</strong>. Se ainda chegar algum email automático nas próximas 24h, é resíduo da fila — depois disso, silêncio.`
  );
}
