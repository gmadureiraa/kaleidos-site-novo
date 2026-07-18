// Coleta metadados de jornada do lead no client (origem, artigo, UTMs)
// pra mandar junto na inscricao. PostHog usa isso pra montar a "vida" do lead.
//
// Combina o "source" lógico do form (paper-gate, article-sidebar, etc.) com a
// atribuição de tráfego global (canal classificado + UTMs + first/last touch)
// de src/lib/attribution.ts.

import { getAttributionMeta } from "@/lib/attribution";

export interface LeadMetadata {
  source: string;
  /** Detalhe da origem: slug do paper/playbook, path do post do blog, etc. */
  source_detail?: string;
  article_slug?: string;
  path?: string;
  /** Primeira página que a pessoa acessou na vida (first-touch landing). */
  landing?: string;
  referrer?: string;
  channel?: string;
  traffic_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  first_channel?: string;
  first_source?: string;
  first_referrer?: string;
  first_utm_source?: string;
  first_utm_campaign?: string;
}

export function getLeadMetadata(
  source: string,
  sourceDetail?: string
): LeadMetadata {
  if (typeof window === "undefined") return { source };

  // Atribuição completa (canal + UTMs + first/last touch). `source` aqui é a
  // origem de tráfego classificada — preservamos como traffic_source pra não
  // colidir com o `source` lógico do form.
  const attr = getAttributionMeta();

  return {
    // form source (paper-gate, article-sidebar, blog-index…) — mantém semântica
    source,
    // detalhe da origem (slug do paper/playbook, path do artigo…) — dupla
    // gravação em source_detail (padrão novo) + article_slug (compat PostHog)
    source_detail: sourceDetail,
    article_slug: sourceDetail,
    path: attr.path || window.location.pathname,
    landing: attr.landing || undefined,
    referrer: attr.referrer || undefined,
    channel: attr.channel,
    traffic_source: attr.source,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_content: attr.utm_content,
    utm_term: attr.utm_term,
    first_channel: attr.first_channel,
    first_source: attr.first_source,
    first_referrer: attr.first_referrer,
    first_utm_source: attr.first_utm_source,
    first_utm_campaign: attr.first_utm_campaign,
  };
}
