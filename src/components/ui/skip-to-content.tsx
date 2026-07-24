"use client";

import Link from "next/link";

export function SkipToContent() {
  return (
    <Link
      suppressHydrationWarning
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </Link>
  );
}

