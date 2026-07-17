/**
 * Conversões server-side (GA4 Measurement Protocol + Meta Conversions API).
 *
 * Complementa os pixels do client: eventos server-side passam por adblock e
 * dão match de conversão mais confiável no GA4 e no Meta Ads.
 *
 * ENVS NECESSÁRIAS (sem elas os helpers viram no-op silencioso, zero efeito):
 *
 * 1. GA4_API_SECRET
 *    Onde pegar: GA4 Admin > Data Streams > (stream do site) >
 *    Measurement Protocol API secrets > Create. O measurement id reusa
 *    NEXT_PUBLIC_GA_ID (fallback: G-H6N0QD787X).
 *
 * 2. META_CAPI_TOKEN
 *    Onde pegar: Meta Events Manager > (pixel do site) > Settings >
 *    Conversions API > Generate access token. O pixel id reusa
 *    NEXT_PUBLIC_META_PIXEL_ID.
 *
 * Regras de projeto: ambos os helpers são BEST-EFFORT. Timeout curto,
 * try/catch total, NUNCA lançam. Falha de analytics jamais derruba a
 * captura de lead.
 */

import { createHash } from "crypto";

const TIMEOUT_MS = 3000;

/** fetch com timeout curto que nunca lança (retorna null em qualquer falha). */
async function safeFetch(
  url: string,
  init: RequestInit
): Promise<Response | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const resp = await fetch(url, { ...init, signal: ctrl.signal });
    clearTimeout(t);
    return resp;
  } catch {
    return null;
  }
}

/** SHA-256 em hex lowercase (formato exigido pela Meta pra dados de usuário). */
function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type Params = Record<string, unknown>;

/**
 * Cookies de tracking lidos do header `Cookie` da request (server-side).
 * `_fbp`/`_fbc` melhoram MUITO o match quality da Meta CAPI.
 */
export function readTrackingCookies(cookieHeader: string | null | undefined): {
  fbp?: string;
  fbc?: string;
} {
  const out: { fbp?: string; fbc?: string } = {};
  if (!cookieHeader) return out;
  try {
    for (const part of cookieHeader.split(";")) {
      const idx = part.indexOf("=");
      if (idx === -1) continue;
      const name = part.slice(0, idx).trim();
      const value = part.slice(idx + 1).trim();
      if (!value) continue;
      if (name === "_fbp") out.fbp = value.slice(0, 200);
      if (name === "_fbc") out.fbc = value.slice(0, 500);
    }
  } catch {
    // cookie malformado — segue sem
  }
  return out;
}

type Ga4Ids = {
  /** client_id REAL do GA4 (cookie _ga do client). */
  clientId?: string;
  /** session_id do GA4 (cookie _ga_<container>). */
  sessionId?: string;
};

/**
 * Envia evento pro GA4 via Measurement Protocol.
 *
 * `clientIdOrEmail` é o FALLBACK de client_id (email é hasheado antes, nunca
 * mandamos PII crua pro GA). Se `ids.clientId` vier do client (cookie _ga),
 * ele tem prioridade — é o que faz o evento cair no usuário/sessão real do
 * GA4 em vez de um id fantasma. Env-gated em GA4_API_SECRET.
 */
export async function ga4Event(
  clientIdOrEmail: string,
  eventName: string,
  params: Params = {},
  ids: Ga4Ids = {}
): Promise<void> {
  try {
    const apiSecret = process.env.GA4_API_SECRET;
    const measurementId =
      process.env.GA4_MEASUREMENT_ID ||
      process.env.NEXT_PUBLIC_GA_ID ||
      "G-H6N0QD787X";
    if (!apiSecret || !measurementId) return;

    // Prioridade: client_id real vindo do cookie _ga do client. Fallback:
    // GA4 não aceita PII no client_id — se veio email, usamos o hash como
    // identificador estável (mesmo email = mesmo client_id entre eventos).
    const realClientId =
      typeof ids.clientId === "string" && /^[\d.]+$/.test(ids.clientId)
        ? ids.clientId
        : undefined;
    const clientId =
      realClientId ??
      (clientIdOrEmail
        ? clientIdOrEmail.includes("@")
          ? sha256(clientIdOrEmail)
          : clientIdOrEmail
        : undefined);
    if (!clientId) return;

    // Só valores primitivos nos params (GA4 rejeita objetos aninhados).
    const cleanParams: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined) continue;
      if (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean"
      ) {
        cleanParams[k] = typeof v === "string" ? v.slice(0, 100) : v;
      }
    }

    // session_id + engagement_time_msec: sem eles o GA4 não atribui o evento
    // a nenhuma sessão e ele some dos relatórios padrão (só aparece em
    // exploração). engagement_time_msec >= 1 marca o usuário como "engajado".
    if (ids.sessionId && /^\d+$/.test(ids.sessionId)) {
      cleanParams.session_id = ids.sessionId;
    }
    cleanParams.engagement_time_msec = 1;

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
      measurementId
    )}&api_secret=${encodeURIComponent(apiSecret)}`;

    await safeFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: eventName, params: cleanParams }],
      }),
    });
  } catch {
    // analytics nunca lança
  }
}

type MetaUserData = {
  email?: string;
  /** IP do cliente (melhora o match quality do evento). */
  clientIp?: string;
  /** User-Agent do cliente (idem). */
  userAgent?: string;
  /** Cookie _fbp do browser (browser id do pixel — match quality). */
  fbp?: string;
  /** Cookie _fbc do browser (click id de anúncio — atribuição paid). */
  fbc?: string;
};

type MetaEventOptions = {
  /**
   * Id único do evento pra DEDUPE com o pixel client: o fbq("track", ...,
   * { eventID }) do browser manda o MESMO id, e a Meta conta o Lead 1x.
   */
  eventId?: string;
  /**
   * URL da página onde a conversão aconteceu. action_source:"website" exige
   * esse campo — sem ele o evento pode ser rejeitado/penalizado.
   */
  eventSourceUrl?: string;
};

/**
 * Envia evento pro Meta via Conversions API.
 *
 * Email é hasheado em SHA-256 (campo `em`) como manda a Meta.
 * Env-gated em META_CAPI_TOKEN + NEXT_PUBLIC_META_PIXEL_ID.
 */
export async function metaCapiEvent(
  eventName: string,
  userData: MetaUserData,
  customData: Params = {},
  options: MetaEventOptions = {}
): Promise<void> {
  try {
    const token = process.env.META_CAPI_TOKEN;
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!token || !pixelId) return;

    const user_data: Record<string, unknown> = {};
    if (userData.email) user_data.em = [sha256(userData.email)];
    if (userData.clientIp) user_data.client_ip_address = userData.clientIp;
    if (userData.userAgent) user_data.client_user_agent = userData.userAgent;
    if (userData.fbp) user_data.fbp = userData.fbp;
    if (userData.fbc) user_data.fbc = userData.fbc;
    if (!user_data.em && !user_data.client_ip_address) return;

    // Só valores primitivos no custom_data.
    const custom_data: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(customData)) {
      if (v === null || v === undefined) continue;
      if (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean"
      ) {
        custom_data[k] = typeof v === "string" ? v.slice(0, 300) : v;
      }
    }

    const url = `https://graph.facebook.com/v21.0/${encodeURIComponent(
      pixelId
    )}/events?access_token=${encodeURIComponent(token)}`;

    await safeFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            ...(options.eventId
              ? { event_id: String(options.eventId).slice(0, 100) }
              : {}),
            ...(options.eventSourceUrl
              ? { event_source_url: String(options.eventSourceUrl).slice(0, 1000) }
              : {}),
            user_data,
            custom_data,
          },
        ],
      }),
    });
  } catch {
    // analytics nunca lança
  }
}
