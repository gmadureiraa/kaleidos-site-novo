"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { dictionaries, Locale } from "./dictionaries";

export function detectLocaleFromPath(pathname: string): Locale {
  // Expecting paths like / (pt), /en, /en/... or /pt
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "en") return "en";
  if (first === "pt") return "pt";
  return "pt";
}

export function useI18n() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const search = useSearchParams();
  const qLang = (search?.get("lang") || "") as Locale;
  const locale: Locale = (qLang === "en" || qLang === "pt") ? qLang : detectLocaleFromPath(pathname);

  function t(namespace: string, key: string): string {
    const dict = (dictionaries as any)[locale]?.[namespace] ?? {};
    return dict[key] ?? key;
  }

  function switchLocale(nextLocale: Locale) {
    const url = new URL(window.location.href);
    if (nextLocale === "pt") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", nextLocale);
    }
    router.push(url.pathname + (url.search ? url.search : ""));
  }

  return { locale, t, switchLocale };
}

