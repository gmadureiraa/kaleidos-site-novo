/**
 * Server-side i18n utilities for Server Components.
 *
 * Usage in a page.tsx (Server Component):
 *   import { getServerLocale, createT } from "@/i18n/server";
 *
 *   export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
 *     const params = await searchParams;
 *     const locale = getServerLocale(params.lang);
 *     const t = createT(locale);
 *     ...
 *   }
 */

import { dictionaries, type Locale } from "./dictionaries";

export type { Locale };

export function getServerLocale(langParam?: string): Locale {
  if (langParam === "en") return "en";
  if (langParam === "pt") return "pt";
  return "pt";
}

export function createT(locale: Locale) {
  return function t(namespace: string, key: string): string {
    const ns = dictionaries[locale]?.[namespace] || {};
    return (ns as Record<string, string>)[key] ?? key;
  };
}

export function withLang(path: string, locale: Locale): string {
  if (locale === "en") {
    return `${path}${path.includes("?") ? "&" : "?"}lang=en`;
  }
  return path;
}
