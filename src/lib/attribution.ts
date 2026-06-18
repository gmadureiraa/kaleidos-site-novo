/**
 * Atribuição de tráfego — de ONDE vem cada visita/lead.
 *
 * Captura, no primeiro acesso da sessão/pessoa:
 *   - UTMs (utm_source/medium/campaign/content/term)
 *   - referrer + initial-referrer
 *   - canal classificado (organic / social / ai-llm / paid / referral / direct)
 *   - landing path
 *
 * Persiste first-touch (localStorage, nunca sobrescrito) + last-touch (sempre
 * atualizado) e registra TUDO como super-property no PostHog, pra que CADA
 * evento (incluindo autocapture e $pageview de SPA) carregue a origem.
 *
 * Forms (contato, lead-ia, newsletter) chamam getAttribution() e mandam no
 * body pro server gravar first/last touch no perfil da pessoa (PostHog) e na
 * audience (Resend), espelhando a "vida do lead" do RD Station.
 */

import posthog from "posthog-js";

const FIRST_TOUCH_KEY = "kal_attr_first";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Attribution = {
  // last-touch (acesso atual)
  channel: string;
  source: string;
  referrer: string;
  landing_path: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  // first-touch (primeiro acesso de sempre desta pessoa neste device)
  first_channel?: string;
  first_source?: string;
  first_referrer?: string;
  first_landing_path?: string;
  first_utm_source?: string;
  first_utm_campaign?: string;
};

/**
 * Hosts de assistentes/buscadores de IA (LLM). Tráfego vindo daqui é um canal
 * próprio ("ai-llm") — cada vez mais relevante e invisível no GA4 padrão.
 */
const AI_LLM_HOSTS = [
  "chat.openai.com",
  "chatgpt.com",
  "openai.com",
  "perplexity.ai",
  "claude.ai",
  "anthropic.com",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "bing.com/chat",
  "you.com",
  "poe.com",
  "phind.com",
  "deepseek.com",
  "grok.com",
  "x.ai",
  "mistral.ai",
  "duckduckgo.com/aichat",
];

const SEARCH_HOSTS = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.",
  "yandex.",
  "ecosia.org",
  "baidu.com",
  "brave.com",
];

const SOCIAL_HOSTS = [
  "instagram.com",
  "l.instagram.com",
  "facebook.com",
  "l.facebook.com",
  "lm.facebook.com",
  "t.co",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "lnkd.in",
  "youtube.com",
  "youtu.be",
  "tiktok.com",
  "threads.net",
  "threads.com",
  "reddit.com",
  "t.me",
  "whatsapp.com",
  "wa.me",
];

function hostMatches(host: string, needles: string[]): boolean {
  return needles.some((n) => host.includes(n));
}

/**
 * Classifica o canal a partir de utm_medium, referrer e host. Ordem de
 * prioridade: UTM explícito > AI/LLM > paid > social > search orgânico >
 * referral > direto.
 */
function classifyChannel(params: {
  utmMedium?: string;
  utmSource?: string;
  referrerHost: string;
  hasReferrer: boolean;
}): string {
  const { utmMedium, utmSource, referrerHost, hasReferrer } = params;
  const medium = (utmMedium || "").toLowerCase();
  const src = (utmSource || "").toLowerCase();

  if (medium) {
    if (/(cpc|ppc|paid|paidsocial|paid-social|display|ads?)/.test(medium))
      return "paid";
    if (/(social|social-organic)/.test(medium)) return "social";
    if (/(email|newsletter|nl)/.test(medium)) return "email";
    if (/(organic)/.test(medium)) return "organic";
    if (/(referral)/.test(medium)) return "referral";
    if (/(affiliate)/.test(medium)) return "affiliate";
  }
  // fonte de IA marcada manualmente também conta como ai-llm
  if (/(chatgpt|openai|perplexity|claude|gemini|copilot|llm|ai)/.test(src))
    return "ai-llm";

  if (!hasReferrer) return medium || src ? "campaign" : "direct";

  if (hostMatches(referrerHost, AI_LLM_HOSTS)) return "ai-llm";
  if (hostMatches(referrerHost, SOCIAL_HOSTS)) return "social";
  if (hostMatches(referrerHost, SEARCH_HOSTS)) return "organic";
  return "referral";
}

function safeHost(url: string): string {
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Lê o acesso atual (last-touch) da URL + document.referrer.
 */
function readCurrent(): Attribution {
  const url = new URL(window.location.href);
  const referrer = document.referrer || "";
  const referrerHost = safeHost(referrer);
  const sameOriginRef = referrerHost && referrerHost === window.location.host;
  // referrer interno (navegação dentro do site) não conta como origem externa
  const externalReferrer = sameOriginRef ? "" : referrer;
  const hasReferrer = Boolean(externalReferrer);

  const utm: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }

  const channel = classifyChannel({
    utmMedium: utm.utm_medium,
    utmSource: utm.utm_source,
    referrerHost: safeHost(externalReferrer),
    hasReferrer,
  });

  // source legível: utm_source > host do referrer > canal
  const source =
    utm.utm_source ||
    safeHost(externalReferrer) ||
    (hasReferrer ? "referral" : channel);

  return {
    channel,
    source,
    referrer: externalReferrer,
    landing_path: url.pathname + url.search,
    ...utm,
  };
}

function loadFirstTouch(): Partial<Attribution> | null {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as Partial<Attribution>) : null;
  } catch {
    return null;
  }
}

function saveFirstTouch(current: Attribution): Partial<Attribution> {
  const firstTouch = {
    first_channel: current.channel,
    first_source: current.source,
    first_referrer: current.referrer,
    first_landing_path: current.landing_path,
    first_utm_source: current.utm_source,
    first_utm_campaign: current.utm_campaign,
  };
  try {
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
  } catch {
    // localStorage indisponível (modo privado) — segue sem persistir
  }
  return firstTouch;
}

let cached: Attribution | null = null;

/**
 * Bootstrap da atribuição. Roda uma vez no client load:
 *   1. lê last-touch (URL + referrer)
 *   2. carrega/grava first-touch no localStorage
 *   3. registra como super-property no PostHog (every event carries it)
 *   4. seta no perfil da pessoa ($set last-touch, $set_once first-touch)
 */
export function initAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  if (cached) return cached;

  const current = readCurrent();

  let first = loadFirstTouch();
  if (!first) {
    first = saveFirstTouch(current);
  }

  const attribution: Attribution = { ...current, ...first };
  cached = attribution;

  try {
    // super-properties: anexadas a TODO evento daqui pra frente
    posthog.register({
      channel: current.channel,
      traffic_source: current.source,
      ...(current.utm_source ? { utm_source: current.utm_source } : {}),
      ...(current.utm_medium ? { utm_medium: current.utm_medium } : {}),
      ...(current.utm_campaign ? { utm_campaign: current.utm_campaign } : {}),
      ...(current.utm_content ? { utm_content: current.utm_content } : {}),
      ...(current.utm_term ? { utm_term: current.utm_term } : {}),
    });
    // first-touch fixo na pessoa (super-property persistente, nunca sobrescreve)
    posthog.register_once({
      first_channel: attribution.first_channel,
      first_traffic_source: attribution.first_source,
      first_utm_source: attribution.first_utm_source,
      first_utm_campaign: attribution.first_utm_campaign,
    });
    // perfil da pessoa: last-touch sempre, first-touch só uma vez
    posthog.setPersonProperties(
      {
        last_channel: current.channel,
        last_traffic_source: current.source,
        last_referrer: current.referrer || null,
        last_landing_path: current.landing_path,
      },
      {
        first_channel: attribution.first_channel,
        first_traffic_source: attribution.first_source,
        first_referrer: attribution.first_referrer || null,
        first_landing_path: attribution.first_landing_path,
      }
    );
  } catch {
    // PostHog ainda não pronto — super-properties ficam pro próximo load
  }

  return attribution;
}

/**
 * Retorna a atribuição completa (first + last touch) pra anexar no body de
 * forms. Faz lazy-init se ainda não rodou.
 */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  if (!cached) return initAttribution();
  return cached;
}

/**
 * Achata a atribuição num objeto de metadados pronto pro POST das rotas de
 * lead (source, referrer, utm_*, e variantes first_*).
 */
export function getAttributionMeta(): Record<string, string> {
  const a = getAttribution();
  if (!a) return {};
  const meta: Record<string, string> = {};
  const put = (k: string, v?: string) => {
    if (typeof v === "string" && v) meta[k] = v;
  };
  put("channel", a.channel);
  put("source", a.source);
  put("referrer", a.referrer);
  put("path", a.landing_path);
  put("utm_source", a.utm_source);
  put("utm_medium", a.utm_medium);
  put("utm_campaign", a.utm_campaign);
  put("utm_content", a.utm_content);
  put("utm_term", a.utm_term);
  put("first_channel", a.first_channel);
  put("first_source", a.first_source);
  put("first_referrer", a.first_referrer);
  put("first_utm_source", a.first_utm_source);
  put("first_utm_campaign", a.first_utm_campaign);
  return meta;
}
