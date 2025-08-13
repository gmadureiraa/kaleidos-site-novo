"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const [queryLocale, setQueryLocale] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get("lang");
      if (lang === "en" || lang === "pt") {
        setQueryLocale(lang);
      } else {
        setQueryLocale(null);
      }
    } catch (_) {
      setQueryLocale(null);
    }
  }, [pathname]);

  const locale: Locale = useMemo(
    () => queryLocale ?? detectLocaleFromPath(pathname),
    [queryLocale, pathname]
  );

  function t(namespace: string, key: string): string {
    const ns = dictionaries[locale]?.[namespace] || {};
    return (ns as Record<string, string>)[key] ?? key;
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

