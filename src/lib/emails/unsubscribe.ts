import { createHmac, randomBytes, timingSafeEqual } from "crypto";

// Dev-only fallback: random per process boot. Tokens NÃO persistem entre restarts
// em dev sem LEAD_UNSUB_SECRET — comportamento desejado pra forçar setup explícito.
const DEV_FALLBACK_SECRET = randomBytes(32).toString("hex");

function SECRET(): string {
  const explicit = process.env.LEAD_UNSUB_SECRET;
  if (explicit && explicit.length >= 16) return explicit;

  if (process.env.NODE_ENV === "production") {
    // Fail loud: nunca cair no RESEND_API_KEY (rotação invalida tokens) nem em
    // string hardcoded. Operador precisa setar 32 bytes random no Vercel.
    throw new Error(
      "LEAD_UNSUB_SECRET é obrigatório em produção. Gerar com `openssl rand -base64 32` e setar no Vercel env vars."
    );
  }

  console.warn(
    "[unsubscribe] LEAD_UNSUB_SECRET ausente — usando random per-process (tokens não persistem entre restarts)."
  );
  return DEV_FALLBACK_SECRET;
}

function b64url(buf: Buffer | string) {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string) {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function makeUnsubToken(email: string): string {
  const payload = b64url(email.toLowerCase());
  const sig = b64url(createHmac("sha256", SECRET()).update(payload).digest());
  return `${payload}.${sig}`;
}

export function verifyUnsubToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  let expected: string;
  try {
    expected = b64url(createHmac("sha256", SECRET()).update(payload).digest());
  } catch (err) {
    // SECRET() pode lançar em prod sem env var setada — retorna null em vez
    // de 500 pra rota de unsub, ainda registra o problema pra ops.
    console.error("[unsubscribe] SECRET indisponível:", err);
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  try {
    return fromB64url(payload).toString("utf-8");
  } catch {
    return null;
  }
}

export function unsubUrl(email: string, baseUrl?: string): string {
  const base = baseUrl
    || process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kaleidos.com.br");
  return `${base}/api/lead-emails/unsubscribe?token=${makeUnsubToken(email)}`;
}
