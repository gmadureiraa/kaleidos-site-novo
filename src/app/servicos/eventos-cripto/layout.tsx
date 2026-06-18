import type { Metadata } from "next";

// Página "Eventos Cripto" removida — noindex.
export const metadata: Metadata = {
  title: "Página não encontrada — Kaleidos",
  robots: { index: false, follow: false },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
