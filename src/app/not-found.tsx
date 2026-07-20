import type { Metadata } from "next";
import NotFound404 from "@/components/NotFound404";

export const metadata: Metadata = {
  title: "Página não encontrada · Kaleidos",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFound404 />;
}
