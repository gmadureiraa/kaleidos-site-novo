import { createHmac, timingSafeEqual } from "crypto";

const SECRET = () =>
  process.env.LEAD_UNSUB_SECRET || process.env.RESEND_API_KEY || "kaleidos-dev-secret";

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

  const expected = b64url(createHmac("sha256", SECRET()).update(payload).digest());
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
