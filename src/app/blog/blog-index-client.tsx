"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlogCardMeta, BlogCategory, categoryLabels, formatDate } from "@/lib/blog-shared";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCover } from "@/components/blog/blog-cover";
import { getLeadMetadata } from "@/lib/lead-meta";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogControls, BlogSortOption } from "@/components/blog/blog-controls";
import { PapersBand } from "@/components/papers/papers-band";
import { FooterDemo } from "@/components/ui/footer-demo";

/**
 * UI do índice do blog. Recebe os posts JÁ publicados (estáticos + KAI) do
 * server component pai (page.tsx). Mantém o filtro/highlight/grid client-side.
 */
// Quantos cards da grade principal aparecem por lote. Evita renderizar ~190
// cards animados (framer-motion) de uma vez; "Carregar mais" revela o próximo lote.
const PAGE_SIZE = 24;

/** Normaliza texto pra busca: minúsculas e sem acentos ("estrategia" acha "Estratégia"). */
function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Timestamp de publicação (posts sem data válida caem pro fim da lista). */
function postTime(post: BlogCardMeta) {
  const t = new Date(post.publishedAt).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Ordena uma CÓPIA da lista conforme a opção escolhida, sempre com desempate
 * por slug (determinístico). "recentes" devolve a lista original intacta: os
 * posts já chegam do server em data desc, então o primeiro render é idêntico
 * ao HTML do servidor (sem mismatch de hidratação).
 */
function sortPosts(posts: BlogCardMeta[], sort: BlogSortOption): BlogCardMeta[] {
  if (sort === "recentes") return posts;
  const sorted = [...posts];
  switch (sort) {
    case "antigos":
      sorted.sort(
        (a, b) => postTime(a) - postTime(b) || a.slug.localeCompare(b.slug)
      );
      break;
    case "leitura-curta":
      sorted.sort(
        (a, b) => a.readTime - b.readTime || a.slug.localeCompare(b.slug)
      );
      break;
    case "leitura-longa":
      sorted.sort(
        (a, b) => b.readTime - a.readTime || a.slug.localeCompare(b.slug)
      );
      break;
  }
  return sorted;
}

export function BlogIndexClient({ posts }: { posts: BlogCardMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "all"
  >("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sort, setSort] = useState<BlogSortOption>("recentes");
  const [query, setQuery] = useState("");

  function handleSelectCategory(cat: BlogCategory | "all") {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE); // troca de filtro reinicia a paginação
  }

  function handleSortChange(next: BlogSortOption) {
    setSort(next);
    setVisibleCount(PAGE_SIZE); // trocar ordenação reinicia a paginação
  }

  function handleQueryChange(next: string) {
    setQuery(next);
    setVisibleCount(PAGE_SIZE); // digitar na busca reinicia a paginação
  }
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot — humanos não preenchem
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscribeMsg, setSubscribeMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _hp: hp,
          metadata: getLeadMetadata("blog-index"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao assinar");
      setSubscribeStatus("success");
      setSubscribeMsg("Inscrição realizada! Fique de olho no seu email.");
      setEmail("");
    } catch (err) {
      setSubscribeStatus("error");
      setSubscribeMsg(
        err instanceof Error ? err.message : "Erro ao assinar. Tente novamente."
      );
    }
  }

  // Os posts já chegam ordenados por data desc do server
  // (getPublishedPostCardsAsync, com desempate por slug). O /blog antes
  // re-embaralhava por hash do slug AQUI, o que fazia post novo nascer no meio
  // do acervo e anulava o sort por data (P0-2 do audit). Mantida a ordem do
  // server: mais recente primeiro; empate de data cai no slug (estável), então
  // não agrupa por categoria nem causa mismatch de hidratação.
  const publishedPosts = posts;
  const allFiltered = useMemo(() => {
    let list =
      selectedCategory === "all"
        ? publishedPosts
        : publishedPosts.filter((p) => p.category === selectedCategory);

    const q = normalizeText(query.trim());
    if (q) {
      list = list.filter(
        (p) =>
          normalizeText(p.title).includes(q) ||
          normalizeText(p.excerpt).includes(q)
      );
    }

    return sortPosts(list, sort);
  }, [publishedPosts, selectedCategory, query, sort]);

  // First 2 posts go into the highlight row, rest into the grid
  const highlights = allFiltered.slice(0, 2);
  const rest = allFiltered.slice(2);
  // Paginação client-side da grade: só o lote visível vai pro DOM/animação.
  const visibleRest = rest.slice(0, visibleCount);
  const remaining = rest.length - visibleRest.length;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <h1 className="text-[2.75rem] md:text-[3.5rem] font-bold text-gray-900 font-display leading-[1.08] tracking-[-0.03em] mb-4">
              Blog da Kaleidos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Estudos e análises densas sobre marketing cripto e web3,
              lançamento de token, IA, growth e marca pessoal de founder.
              Dissecamos por que projetos e pessoas crescem, e como aplicar no
              seu caso.
            </p>
          </motion.div>

          {/* Destaque de trilha: com ~90% do acervo em cripto, a trilha nova
              some na grade se não tiver porta de entrada própria. */}
          <Link
            href="/blog/categoria/marca-pessoal"
            className="group mb-12 flex flex-col gap-3 rounded-2xl border border-black/10 bg-[#F0F0EF] px-6 py-6 transition-colors hover:border-black/30 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#b8479a] mb-1.5">
                Trilha
              </p>
              <p className="text-[17px] font-semibold text-gray-900">
                Marca pessoal para founder
              </p>
              <p className="text-[14px] text-gray-600 mt-1 max-w-xl leading-relaxed">
                Posicionamento, LinkedIn, ROI e riscos da exposição — a trilha
                completa pra quem toca uma empresa e quer virar referência no
                próprio mercado.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 whitespace-nowrap">
              Ver a trilha
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Estudos Kaleidos (papers em PDF, gated por email) */}
          <PapersBand />

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mb-12 pb-8 border-b border-gray-200"
          >
            <CategoryFilter
              selected={selectedCategory}
              onSelect={handleSelectCategory}
            />
            {/* Busca + ordenação + contador (client-side) */}
            <BlogControls
              query={query}
              onQueryChange={handleQueryChange}
              sort={sort}
              onSortChange={handleSortChange}
              resultCount={allFiltered.length}
            />
            {/* Links crawláveis pros hubs de categoria (SSG). O filtro acima é
                client-only e invisível pro Google/IA; estes <Link> dão a
                linkagem interna real pros clusters /blog/categoria/[cat]. */}
            <nav aria-label="Categorias" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="text-gray-400">Explore por tema:</span>
              {(
                ["cripto", "growth", "marketing", "ia", "cases", "marca-pessoal"] as const
              ).map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/blog/categoria/${cat}`}
                    className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
                  >
                    {categoryLabels[cat]}
                  </Link>
                )
              )}
            </nav>
          </motion.div>

          {/* Highlights — 2 posts side by side */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 pb-16 border-b border-gray-200">
              {highlights.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-gray-200 transition-all duration-500 ease-out group-hover:shadow-xl">
                      <BlogCover post={post} variant="feature" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[13px] text-gray-500">
                        <span className="text-[#7CF067] font-medium">
                          {categoryLabels[post.category]}
                        </span>
                        <span className="text-gray-300">/</span>
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span className="text-gray-300">/</span>
                        <span>{post.readTime} min</span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug tracking-[-0.015em] group-hover:text-[#5ae04a] transition-colors duration-200 font-display">
                        {post.title}
                      </h2>

                      <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-[#7CF067] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-1">
                        Ler artigo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Rest — grid of 3, paginada em lotes de PAGE_SIZE */}
          {visibleRest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pb-24">
              {visibleRest.map((post, i) => (
                // index relativo ao lote: o stagger da animação recomeça a cada
                // "Carregar mais" (cards já montados não re-animam) e o delay
                // nunca cresce com o total da lista.
                <BlogCard key={post.slug} post={post} index={i % PAGE_SIZE} />
              ))}
            </div>
          )}

          {/* Carregar mais — pagina a grade filtrada sem recarregar a página */}
          {remaining > 0 && (
            <div className="flex justify-center pb-24 -mt-8">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) => count + PAGE_SIZE)
                }
                aria-label={`Carregar mais artigos (${remaining} restantes)`}
                className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold text-sm hover:border-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF067] focus-visible:ring-offset-2"
              >
                Carregar mais artigos ({remaining} restantes)
              </button>
            </div>
          )}

          {allFiltered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-gray-600 text-base">
                {query.trim()
                  ? "Nenhum artigo encontrado para essa busca."
                  : "Nenhum artigo nesta categoria ainda."}
              </p>
              {(query.trim() || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("all");
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="mt-4 min-h-[44px] px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:border-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF067] focus-visible:ring-offset-2"
                >
                  Limpar filtros
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 font-display tracking-[-0.02em]">
              Newsletter da Kaleidos
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Estrategias, cases e insights sobre marketing, IA e crescimento.
              Uma vez por semana, direto no seu email.
            </p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubscribe}
          >
            {/* Honeypot anti-bot — invisível pra humanos */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="_hp_news">Não preencha</label>
              <input
                id="_hp_news"
                name="_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={subscribeStatus === "loading"}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7CF067]/50 focus:ring-1 focus:ring-[#7CF067]/15 transition-all text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscribeStatus === "loading"}
              className="px-6 py-3 rounded-xl bg-[#7CF067] text-black font-semibold text-sm hover:bg-[#6ae85a] transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {subscribeStatus === "loading" ? "Enviando..." : "Assinar"}
            </button>
          </motion.form>
          {subscribeMsg && (
            <p
              className={`mt-3 text-sm ${
                subscribeStatus === "success"
                  ? "text-[#3d9e32]"
                  : "text-red-600"
              }`}
            >
              {subscribeMsg}
            </p>
          )}
        </div>
      </section>

      <FooterDemo />
    </main>
  );
}
