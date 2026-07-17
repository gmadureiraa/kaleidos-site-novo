/**
 * IDs de tracking do client pra dedupe e match de conversão server-side.
 *
 * - event_id: id único por submit — o MESMO id vai no fbq("track", ...,
 *   { eventID }) do pixel e no body do POST pra rota usar como event_id na
 *   Meta CAPI. Assim pixel + CAPI deduplicam e o Lead conta 1x.
 * - ga_client_id / ga_session_id: lidos dos cookies do GA4 (_ga e
 *   _ga_<container>) pro server mandar o evento Measurement Protocol na MESMA
 *   sessão/usuário do gtag do client (em vez de um client_id fantasma).
 *
 * Tudo best-effort: se cookie não existe (adblock, consent), retorna undefined
 * e o server cai no fallback atual.
 */

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/** Gera um event_id único por submit (com fallback se randomUUID faltar). */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // segue pro fallback
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** client_id do GA4: cookie `_ga` formato GA1.1.XXXX.YYYY → "XXXX.YYYY". */
export function getGaClientId(): string | undefined {
  const raw = readCookie("_ga");
  if (!raw) return undefined;
  const parts = raw.split(".");
  if (parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  return undefined;
}

/**
 * session_id do GA4: cookie `_ga_<container>` (ex: _ga_H6N0QD787X).
 * Formatos conhecidos:
 *   GS1.1.1699999999.5.1.1699999999.60.0.0  → session_id = 1699999999 (3º campo)
 *   GS2.1.s1699999999$o5$g1$t1699999999...  → session_id = 1699999999 (s<id>)
 */
export function getGaSessionId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookie = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => /^_ga_[A-Z0-9]+=/.test(c));
  if (!cookie) return undefined;
  const value = decodeURIComponent(cookie.slice(cookie.indexOf("=") + 1));
  const parts = value.split(".");
  if (parts.length < 3) return undefined;
  const third = parts[2];
  // GS2: "s1699999999$o5..." — GS1: "1699999999"
  const m = third.match(/^s?(\d{9,13})/);
  return m ? m[1] : undefined;
}

export type TrackingIds = {
  event_id: string;
  ga_client_id?: string;
  ga_session_id?: string;
};

/** Pacote pronto pro body do POST das rotas de lead. */
export function getTrackingIds(): TrackingIds {
  return {
    event_id: newEventId(),
    ga_client_id: getGaClientId(),
    ga_session_id: getGaSessionId(),
  };
}
