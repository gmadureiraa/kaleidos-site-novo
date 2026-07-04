import type { Metadata } from "next";

// Ferramenta interna de geração de UTM. Não pode indexar nem competir com a home
// nos resultados de busca.
export const metadata: Metadata = {
  title: "Gerador de UTM · Kaleidos (interno)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UtmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
