"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlogCardMeta, BlogCategory, categoryLabels, formatDate } from "@/lib/blog-shared";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCover } from "@/components/blog/blog-cover";
import { getLeadMetadata } from "@/lib/lead-meta";
import { CategoryFilter } from "@/components/blog/category-filter";
import { PapersBand } from "@/components/papers/papers-band";
import { FooterDemo } from "@/components/ui/footer-demo";

/**
 * UI do índice do blog. Recebe os posts JÁ publicados (estáticos + KAI) do
 * server component pai (page.tsx). Mantém o filtro/highlight/grid client-side.
 */
export function BlogIndexClient({ posts }: { posts: BlogCardMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "all"
  >("all");
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
      setSubscribeMsg("Inscricao realizada! Fique de olho no seu email.");
      setEmail("");
    } catch (err) {
      setSubscribeStatus("error");
      setSubscribeMsg(
        err instanceof Error ? err.message : "Erro ao assinar. Tente novamente."
      );
    }
  }

  // Posts já publicados (estáticos + KAI). Ordem EMBARALHADA (não por data nem
  // por categoria) pra a página não ficar agrupada por tema — muitos posts
  // compartilham a mesma data, então sort por data caía na ordem do array-fonte
  // (agrupada por categoria). Hash do slug = embaralho determinístico: mistura
  // as categorias, estável entre server/client (sem mismatch de hidratação).
  const shuffleKey = (slug: string) => {
    let h = 0;
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
    return h;
  };
  const publishedPosts = [...posts].sort(
    (a, b) => shuffleKey(a.slug) - shuffleKey(b.slug)
  );
  const allFiltered =
    selectedCategory === "all"
      ? publishedPosts
      : publishedPosts.filter((p) => p.category === selectedCategory);

  // First 2 posts go into the highlight row, rest into the grid
  const highlights = allFiltered.slice(0, 2);
  const rest = allFiltered.slice(2);

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
              lançamento de token, IA e growth. Dissecamos por que projetos
              crescem, e como aplicar no seu.
            </p>
          </motion.div>

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
              onSelect={setSelectedCategory}
            />
            {/* Links crawláveis pros hubs de categoria (SSG). O filtro acima é
                client-only e invisível pro Google/IA; estes <Link> dão a
                linkagem interna real pros clusters /blog/categoria/[cat]. */}
            <nav aria-label="Categorias" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="text-gray-400">Explore por tema:</span>
              {(["cripto", "growth", "marketing", "ia", "cases"] as const).map(
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
                        <span className="text-[#7CFF6B] font-medium">
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

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-[#7CFF6B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-1">
                        Ler artigo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Rest — grid of 3 */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pb-24">
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}

          {allFiltered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-gray-600 text-base">
                Nenhum artigo nesta categoria ainda.
              </p>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={subscribeStatus === "loading"}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7CFF6B]/50 focus:ring-1 focus:ring-[#7CFF6B]/15 transition-all text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscribeStatus === "loading"}
              className="px-6 py-3 rounded-xl bg-[#7CFF6B] text-black font-semibold text-sm hover:bg-[#6ae85a] transition-colors whitespace-nowrap disabled:opacity-50"
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
