import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Apresentação — A agência de marketing nativa do cripto | Kaleidos",
    description:
      "Conheça a Kaleidos em uma apresentação: quem somos, o diferencial cripto-nativo, resultados reais, cases e o processo completo de conteúdo, growth e produto.",
    keywords:
      "apresentação kaleidos, pitch agência cripto, agência marketing web3, cases kaleidos, serviços kaleidos, agência fintech brasil",
    ogImage: "/Kaleidos/imagens/Capa.png",
    url: "/apresentacao",
    type: "website",
  });
}

export default function ApresentacaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
