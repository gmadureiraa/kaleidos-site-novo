/**
 * Rate limiting helper.
 *
 * - Em produção, usa Upstash Redis quando `UPSTASH_REDIS_REST_URL` +
 *   `UPSTASH_REDIS_REST_TOKEN` estão setados.
 * - Caso contrário, faz fallback in-memory (apenas dev/preview ou
 *   serverless cold start — não persiste entre instâncias).
 *
 * IP é resolvido na chamada (`x-forwarded-for` → primeiro item, fallback
 * `x-real-ip`, fallback `unknown`).
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type WindowSpec = `${number} ${"s" | "m" | "h" | "d"}`;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let upstashRedis: Redis | null = null;
if (upstashUrl && upstashToken) {
  try {
    upstashRedis = new Redis({ url: upstashUrl, token: upstashToken });
  } catch (err) {
    console.warn("[rate-limit] failed to init Upstash Redis, fallback in-memory", err);
  }
} else {
  console.warn(
    "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN ausentes — usando fallback in-memory (não recomendado em prod)"
  );
}

const upstashRateLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(prefix: string, max: number, window: WindowSpec): Ratelimit | null {
  if (!upstashRedis) return null;
  const key = `${prefix}:${max}:${window}`;
  let limiter = upstashRateLimiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: upstashRedis,
      limiter: Ratelimit.slidingWindow(max, window),
      analytics: false,
      prefix: `rl:${prefix}`,
    });
    upstashRateLimiters.set(key, limiter);
  }
  return limiter;
}

/**
 * In-memory fallback. Por instância, perde estado em cold start.
 * Mantém map de buckets timestamp[] por chave.
 */
const memBuckets = new Map<string, number[]>();

function memoryRateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const bucket = (memBuckets.get(key) || []).filter((ts) => ts > windowStart);
  const success = bucket.length < max;
  if (success) bucket.push(now);
  memBuckets.set(key, bucket);
  // Pequena rotina de cleanup pra não vazar memória em produção
  if (memBuckets.size > 5000) {
    const cutoff = now - windowMs * 2;
    for (const [k, v] of memBuckets.entries()) {
      const fresh = v.filter((ts) => ts > cutoff);
      if (fresh.length === 0) memBuckets.delete(k);
      else memBuckets.set(k, fresh);
    }
  }
  const reset = bucket.length > 0 ? bucket[0] + windowMs : now + windowMs;
  return {
    success,
    limit: max,
    remaining: Math.max(0, max - bucket.length),
    reset,
  };
}

function windowSpecToMs(window: WindowSpec): number {
  const match = window.match(/^(\d+)\s+(s|m|h|d)$/);
  if (!match) return 60_000;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s": return n * 1000;
    case "m": return n * 60_000;
    case "h": return n * 3_600_000;
    case "d": return n * 86_400_000;
    default: return 60_000;
  }
}

/**
 * Resolve IP da request. Primeiro item de `x-forwarded-for`, depois `x-real-ip`,
 * depois `"unknown"` (todos os "unknown" caem na mesma cota — defensivo).
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

/**
 * Aplica rate limit em uma chave (prefixo + IP) com Upstash quando disponível,
 * cai em memória caso contrário.
 *
 * @example
 *   const ip = getClientIp(req);
 *   const rl = await rateLimit("lead-ia", ip, { max: 5, window: "10 m" });
 *   if (!rl.success) return new Response(null, { status: 429 });
 */
export async function rateLimit(
  prefix: string,
  identifier: string,
  opts: { max: number; window: WindowSpec }
): Promise<RateLimitResult> {
  const upstash = getUpstashLimiter(prefix, opts.max, opts.window);
  if (upstash) {
    try {
      const r = await upstash.limit(identifier);
      return {
        success: r.success,
        limit: r.limit,
        remaining: r.remaining,
        reset: r.reset,
      };
    } catch (err) {
      console.warn("[rate-limit] Upstash error, falling back to memory:", err);
    }
  }
  const windowMs = windowSpecToMs(opts.window);
  return memoryRateLimit(`${prefix}:${identifier}`, opts.max, windowMs);
}

/**
 * Helper pra montar Response 429 com headers padrão.
 */
export function tooManyRequestsResponse(result: RateLimitResult) {
  const retryAfterSec = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
  return new Response(
    JSON.stringify({ ok: false, error: "rate_limited" }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
      },
    }
  );
}
