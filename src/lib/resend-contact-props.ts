// Propriedades custom de contato no Resend (aba "Properties" da Audience).
//
// Objetivo: rastreabilidade máxima do lead DENTRO do Resend — abrir o contato
// na Audience e ver de onde ele veio (form/popup, paper/post, canal, UTM,
// first touch) sem precisar cruzar com PostHog/Neon.
//
// Requisitos:
//   - resend >= 6.17 (o SDK 6.0.x descartava `properties` no create/update);
//   - as properties precisam EXISTIR na conta Resend (criadas uma vez via
//     dashboard → Audience → Properties, ou via API create-contact-property).
//     Chaves usadas aqui: source, source_detail, channel, traffic_source,
//     utm_source, utm_medium, utm_campaign, path, landing, first_channel,
//     first_source.
//
// Sempre best-effort: quem chama envolve em try/catch — atribuição no Resend
// nunca pode derrubar a captura do lead (Neon + PostHog + [LEAD-FALLBACK]
// continuam sendo as fontes de verdade).

const PROPERTY_KEYS = [
  "source",
  "source_detail",
  "channel",
  "traffic_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "path",
  "landing",
  "first_channel",
  "first_source",
] as const;

export function buildContactProperties(
  meta: Record<string, string | undefined>
): Record<string, string> {
  const props: Record<string, string> = {};
  for (const k of PROPERTY_KEYS) {
    const v = meta[k];
    if (typeof v === "string" && v) props[k] = v.slice(0, 300);
  }
  // source_detail: fallback pro article_slug legado (mesma informação)
  if (!props.source_detail && meta.article_slug) {
    props.source_detail = meta.article_slug.slice(0, 300);
  }
  return props;
}

/**
 * Sanitiza um valor pra usar como tag de email no Resend
 * (só ASCII a-z A-Z 0-9 _ e -, máx 256 chars).
 */
export function tagValue(v: string): string {
  return (
    v
      .normalize("NFKD")
      // remove diacriticos soltos pos-NFKD (ex.: "e" + U+0301)
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 256) || "unknown"
  );
}
