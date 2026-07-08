import type { Metadata } from "next";
import { HomeShell } from "@/components/home-shell";

// ── HOME PRINCIPAL `/` (estética web3v2 promovida 2026-06-29) ────────────────
// A home antiga (HeroKaleidos + Bento) foi movida para `/2`.
// O corpo vive em <HomeShell/>, compartilhado com as variantes por público
// (/founders /creators /fintech /saas /empresas) — ver src/app/[audience].
export const metadata: Metadata = {
  title: "Kaleidos — Agência nativa do mercado cripto",
  description:
    "Conteúdo, estratégia e lançamentos para marcas web3 que querem ser referência, não só mais ruído no feed.",
};

export default function HomeV2() {
  return <HomeShell />;
}
