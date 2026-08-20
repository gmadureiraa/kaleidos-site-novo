import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPublishedPostCardsAsync } from "@/lib/blog-data";
import { categoryLabels, BlogCategory } from "@/lib/blog-shared";
import { BlogCard } from "@/components/blog/blog-card";
import { FooterDemo } from "@/components/ui/footer-demo";

/**
 * /gabriel-madureira — hub de autor do fundador.
 *
 * Por que existe: 100% dos artigos do blog são assinados por ele, e o
 * `author.url` do JSON-LD apontava pra /sobre, que é página institucional da
 * agência (carrossel de time). Pro Google e pros LLMs isso significa que a
 * entidade "Gabriel Madureira" não tem página canônica no site: nenhuma
 * superfície reúne autoria + credenciais + sameAs num só lugar. Essa página é
 * o alvo desse `author.url` e o destino natural de quem busca o nome dele.
 *
 * Regra de conteúdo: nada aqui é métrica inventada. Contagem de artigos é
 * calculada do corpus real no build. Bio e cargo vêm do que já está publicado
 * em /sobre e no JSON-LD da Organization.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaleidos.com.br";
const CANONICAL = "/gabriel-madureira";

// Handles canônicos. ⚠️ O handle social do Gabriel é @ogmadureira (desde
// 2026-04-29); o LinkedIn segue /in/gabrielmadureira.
const SOCIAL = {
  twitter: "https://twitter.com/ogmadureira",
  instagram: "https://www.instagram.com/ogmadureira",
  linkedin: "https://www.linkedin.com/in/gabrielmadureira",
};

const TITLE = "Gabriel Madureira — Fundador da Kaleidos";
const DESCRIPTION =
  "Gabriel Madureira é fundador da Kaleidos, agência de marketing para cripto, web3 e fintech. Escreve sobre marketing cripto, growth, IA e marca pessoal de founder.";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  // ⚠️ 19/08/2026 — og:image estava FALTANDO aqui. Em Next App Router um objeto
  // `openGraph` parcial SUBSTITUI o do root layout inteiro, então declarar
  // openGraph sem `images` apaga a capa herdada e o link vai pro LinkedIn/X/
  // WhatsApp sem imagem nenhuma. Mesma armadilha já documentada em
  // src/app/[audience]/page.tsx. ⛔ Ao declarar openGraph numa rota, sempre incluir
  // `images` e `twitter.images`.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "profile",
    siteName: "Kaleidos Digital",
    locale: "pt_BR",
    images: [
      {
        url: "/Kaleidos/imagens/Capa.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/Kaleidos/imagens/Capa.png"],
  },
};

/** Trilhas em que ele escreve, na ordem em que fazem sentido pro leitor. */
const TRILHAS: BlogCategory[] = [
  "marca-pessoal",
  "cripto",
  "growth",
  "marketing",
  "ia",
  "cases",
];

export default async function GabrielMadureiraPage() {
  // Todo o corpus do blog é assinado por ele (author único em blog-data), então
  // "artigos dele" == posts publicados. Se um dia entrar um segundo autor, este
  // é o ponto a filtrar (o card leve não carrega `author`, seria preciso ler o
  // post inteiro ou estender BlogCardMeta).
  const dele = await getPublishedPostCardsAsync();
  const recentes = dele.slice(0, 6);

  // Contagem por trilha, calculada do corpus real (nada hardcoded).
  const porTrilha = TRILHAS.map((cat) => ({
    cat,
    total: dele.filter((p) => p.category === cat).length,
  })).filter((t) => t.total > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}${CANONICAL}#gabriel-madureira`,
      name: "Gabriel Madureira",
      url: `${SITE_URL}${CANONICAL}`,
      image: `${SITE_URL}/Kaleidos/imagens/Equipe/Madureira.png`,
      jobTitle: "Fundador da Kaleidos",
      description: DESCRIPTION,
      worksFor: {
        "@type": "Organization",
        name: "Kaleidos Digital",
        url: SITE_URL,
      },
      knowsAbout: [
        "Marketing Cripto",
        "Web3",
        "Growth",
        "Marca Pessoal de Founder",
        "IA aplicada a Marketing",
        "Criação de Conteúdo",
      ],
      sameAs: [SOCIAL.twitter, SOCIAL.linkedin, SOCIAL.instagram],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gabriel Madureira",
          item: `${SITE_URL}${CANONICAL}`,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <header className="grid gap-10 md:grid-cols-[180px_1fr] md:items-start">
          <div className="relative h-[180px] w-[180px] overflow-hidden rounded-2xl bg-[#F0F0EF]">
            <Image
              src="/Kaleidos/imagens/Equipe/Madureira.png"
              alt="Gabriel Madureira, fundador da Kaleidos"
              fill
              sizes="180px"
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-2xl">
            <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#b8479a]">
              Fundador da Kaleidos
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mt-2 mb-5 text-balance">
              Gabriel Madureira
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Fundador da Kaleidos, agência de marketing para cripto, web3 e fintech,
              em operação desde 2020. Especialista no mercado cripto e copywriter:
              trabalha na fronteira entre estratégia de marca e produção de conteúdo,
              que é onde a maior parte dos projetos técnicos trava.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Escreve todos os artigos deste blog. O foco: por que projetos de cripto
              e web3 crescem, como transformar autoridade de fundador em canal de
              aquisição, e o que a IA de fato muda na operação de marketing.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="me noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                X / Twitter
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="me noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                Instagram
              </a>
            </div>
          </div>
        </header>

        {/* Trilhas: dá ao crawler e ao leitor o mapa do que ele cobre. */}
        <section className="mt-16 border-t border-black/10 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
            Sobre o que ele escreve
          </h2>
          <p className="text-gray-600 mb-6">
            {dele.length} artigos publicados, organizados em {porTrilha.length} trilhas.
          </p>
          <div className="flex flex-wrap gap-2">
            {porTrilha.map(({ cat, total }) => (
              <Link
                key={cat}
                href={`/blog/categoria/${cat}`}
                className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                {categoryLabels[cat]}
                <span className="ml-2 text-gray-400">{total}</span>
              </Link>
            ))}
          </div>
        </section>

        {recentes.length > 0 && (
          <section className="mt-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                Artigos recentes
              </h2>
              <Link
                href="/blog"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {recentes.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Fecho: quem chega pelo nome dele precisa de um próximo passo. */}
        <div className="mt-16 rounded-2xl border border-black/10 bg-[#F0F0EF] px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#b8479a] mb-2">
            Trabalhar junto
          </p>
          <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
            A Kaleidos constrói marca pessoal de fundador como serviço: posicionamento,
            extração da sua voz e cadência sustentada. Se você toca uma empresa e quer
            que a sua autoridade vire canal, comece por aqui.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/marca-pessoal"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Marca pessoal para founder
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-900"
            >
              Agendar um diagnóstico
            </Link>
          </div>
        </div>
      </div>

      <FooterDemo />
    </div>
  );
}
