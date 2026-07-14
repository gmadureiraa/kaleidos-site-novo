"use client";

import { useMemo, useState } from "react";

type Option = { value: string; label: string };

const SITES: Option[] = [
  { value: "https://kaleidos.com.br", label: "Kaleidos" },
  { value: "https://viral.kaleidos.com.br", label: "Sequência Viral" },
  { value: "https://biblioteca.kaleidos.com.br", label: "Biblioteca Viral" },
  { value: "https://radar.kaleidos.com.br", label: "Radar Viral" },
  { value: "https://reels.kaleidos.com.br", label: "Reels Viral" },
  { value: "https://madureira.com.br", label: "Madureira Site" },
  { value: "https://jornalcripto.kaleidos.com.br", label: "Jornal Cripto" },
  { value: "https://kai.kaleidos.com.br", label: "KAI" },
];

// Convenção v2 (2026-07): utm_source = nome completo da rede.
// Canônico: vault/99 - SISTEMA/comunicacao-strategy/utm-convention.md
const SOURCES: Option[] = [
  { value: "instagram", label: "instagram — Instagram" },
  { value: "twitter", label: "twitter — X (Twitter)" },
  { value: "linkedin", label: "linkedin — LinkedIn" },
  { value: "youtube", label: "youtube — YouTube" },
  { value: "tiktok", label: "tiktok — TikTok" },
  { value: "threads", label: "threads — Threads" },
  { value: "newsletter", label: "newsletter — Newsletter" },
  { value: "email", label: "email — Email" },
  { value: "whatsapp", label: "whatsapp — WhatsApp" },
];

const MEDIUMS: Option[] = [
  { value: "bio", label: "bio — Link na bio" },
  { value: "story", label: "story — Story" },
  { value: "reel", label: "reel — Reels / Shorts" },
  { value: "post", label: "post — Post estático" },
  { value: "carrossel", label: "carrossel — Carrossel" },
  { value: "thread", label: "thread — Fio (X/Threads)" },
  { value: "dm", label: "dm — DM / ManyChat" },
  { value: "desc", label: "desc — Descrição" },
  { value: "pin", label: "pin — Tweet/post fixado" },
  { value: "swipe", label: "swipe — Story swipe-up" },
];

const CAMPAIGN_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CAMPAIGN_MAX = 24;

export default function UtmBuilderPage() {
  const [destination, setDestination] = useState<string>(SITES[0].value);
  const [isCustom, setIsCustom] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [source, setSource] = useState<string>(SOURCES[0].value);
  const [medium, setMedium] = useState<string>(MEDIUMS[0].value);
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const baseUrl = isCustom ? customUrl.trim() : destination;

  const campaignError = useMemo(() => {
    if (!campaign) return "obrigatório";
    if (campaign.length > CAMPAIGN_MAX)
      return `máx ${CAMPAIGN_MAX} chars (atual: ${campaign.length})`;
    if (!CAMPAIGN_REGEX.test(campaign))
      return "use kebab-case (a-z, 0-9, hífen)";
    return null;
  }, [campaign]);

  const contentError = useMemo(() => {
    if (!content) return null;
    if (!CAMPAIGN_REGEX.test(content))
      return "use kebab-case (a-z, 0-9, hífen)";
    return null;
  }, [content]);

  const baseUrlError = useMemo(() => {
    if (!baseUrl) return "URL obrigatória";
    try {
      const u = new URL(baseUrl);
      if (!u.protocol.startsWith("http")) return "URL inválida (http/https)";
      return null;
    } catch {
      return "URL inválida";
    }
  }, [baseUrl]);

  const finalUrl = useMemo(() => {
    if (baseUrlError || campaignError || contentError) return null;
    try {
      const u = new URL(baseUrl);
      u.searchParams.set("utm_source", source);
      u.searchParams.set("utm_medium", medium);
      u.searchParams.set("utm_campaign", campaign);
      if (content) u.searchParams.set("utm_content", content);
      return u.toString();
    } catch {
      return null;
    }
  }, [baseUrl, baseUrlError, source, medium, campaign, content, campaignError, contentError]);

  const handleCopy = async () => {
    if (!finalUrl) return;
    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = finalUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const inputBase =
    "w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40 transition";
  const labelBase = "block text-sm font-medium text-foreground mb-1.5";
  const helperBase = "mt-1 text-xs text-foreground/60";
  const errorBase = "mt-1 text-xs text-red-600 dark:text-red-400";

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-2">
            UTM Builder
          </h1>
          <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
            Gere links com UTM padronizados pros sites Kaleidos. PostHog
            consome automático. Convenção canônica está documentada no vault.
          </p>
        </header>

        <section className="space-y-5">
          {/* Destino */}
          <div>
            <label className={labelBase} htmlFor="destination">
              Destino
            </label>
            {!isCustom ? (
              <select
                id="destination"
                className={inputBase}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {SITES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} — {s.value}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="destination"
                type="url"
                className={inputBase}
                placeholder="https://example.com/path"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
            )}
            <div className="mt-2 flex items-center gap-2">
              <input
                id="custom-toggle"
                type="checkbox"
                className="h-4 w-4 rounded border-foreground/30 accent-foreground"
                checked={isCustom}
                onChange={(e) => setIsCustom(e.target.checked)}
              />
              <label htmlFor="custom-toggle" className="text-xs text-foreground/70">
                Usar URL custom (rota específica, ex: /lp/xyz)
              </label>
            </div>
            {isCustom && baseUrlError && (
              <p className={errorBase}>{baseUrlError}</p>
            )}
          </div>

          {/* Source + Medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase} htmlFor="source">
                Source (utm_source)
              </label>
              <select
                id="source"
                className={inputBase}
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelBase} htmlFor="medium">
                Medium (utm_medium)
              </label>
              <select
                id="medium"
                className={inputBase}
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              >
                {MEDIUMS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campaign */}
          <div>
            <label className={labelBase} htmlFor="campaign">
              Campaign (utm_campaign)
            </label>
            <input
              id="campaign"
              type="text"
              className={inputBase}
              placeholder="ex: bv-launch, meme-r02, defiverso-nl-21"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value.toLowerCase())}
              maxLength={CAMPAIGN_MAX + 5}
            />
            {campaign && campaignError ? (
              <p className={errorBase}>{campaignError}</p>
            ) : (
              <p className={helperBase}>
                kebab-case, máx {CAMPAIGN_MAX} chars, sem acentos/espaços
              </p>
            )}
          </div>

          {/* Content (opcional) */}
          <div>
            <label className={labelBase} htmlFor="content">
              Content (opcional)
            </label>
            <input
              id="content"
              type="text"
              className={inputBase}
              placeholder="ex: v1, v2, hook-a, 0519"
              value={content}
              onChange={(e) => setContent(e.target.value.toLowerCase())}
            />
            {content && contentError ? (
              <p className={errorBase}>{contentError}</p>
            ) : (
              <p className={helperBase}>
                pra A/B test ou versionar criativo (kebab-case)
              </p>
            )}
          </div>
        </section>

        {/* Output */}
        <section className="mt-10">
          <label className={labelBase}>URL final</label>
          <pre className="bg-foreground/5 border border-foreground/15 rounded-md p-4 overflow-x-auto">
            <code className="font-mono text-xs sm:text-sm text-foreground whitespace-pre-wrap break-all">
              {finalUrl ?? "—  preencha os campos obrigatórios"}
            </code>
          </pre>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!finalUrl}
              className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {copied ? "Copiado ✓" : "Copiar URL"}
            </button>
            {finalUrl && (
              <a
                href={finalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-foreground/70 hover:text-foreground underline underline-offset-4"
              >
                Abrir em nova aba
              </a>
            )}
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-foreground/10">
          <p className="text-xs text-foreground/60 leading-relaxed">
            Convenção canônica:{" "}
            <code className="font-mono bg-foreground/5 px-1.5 py-0.5 rounded">
              vault/99 - SISTEMA/comunicacao-strategy/utm-convention.md
            </code>
            . PostHog project: Kaleidos Group (id 387434).
          </p>
        </footer>
      </div>
    </main>
  );
}
