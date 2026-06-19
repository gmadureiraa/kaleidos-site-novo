"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { BlogCardMeta } from "@/lib/blog-shared";
import { categoryLabels, formatDate } from "@/lib/blog-shared";
import type { Paper } from "@/lib/papers-data";
import { BlogCover } from "@/components/blog/blog-cover";
import { useI18n } from "@/i18n/useI18n";
import { useAnalytics } from "@/components/analytics";

type PaperCard = Pick<Paper, "slug" | "title" | "volume" | "accent" | "cover">;

/**
 * UI (client) da seção de recursos da home — Swiper + motion.
 * Recebe SÓ cards leves por props (sem markdown/content), montados no
 * Server Component pai (`home-resources.tsx`). Isso mantém o conteúdo completo
 * dos posts/papers FORA do bundle client da home.
 */
export function HomeResourcesClient({
  posts,
  papers,
}: {
  posts: BlogCardMeta[];
  papers: PaperCard[];
}) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const { trackClick } = useAnalytics();

  return (
    <section className="overflow-x-clip bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* ---------- Playbooks / Papers (primeiro) ---------- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-emerald-600">
              {isEn ? "Free guides" : "Guias grátis"}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              {isEn ? "Kaleidos Papers" : "Kaleidos Papers"}
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-gray-600">
              {isEn
                ? "Deep crypto-marketing studies and playbooks. Free, gated by email."
                : "Estudos e playbooks de marketing cripto. Grátis, liberados por email."}
            </p>
          </div>
          <Link
            href="/papers"
            onClick={() => trackClick("home_papers_all", "home_resources")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
          >
            {isEn ? "All papers" : "Todos os papers"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
          {papers.map((paper, i) => (
            <motion.div
              key={paper.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/papers/${paper.slug}`}
                onClick={() => trackClick(`home_paper_${paper.slug}`, "home_resources")}
                className="group block"
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-xl"
                  style={{ boxShadow: `0 14px 40px -22px ${paper.accent}88` }}
                >
                  <Image
                    src={paper.cover}
                    alt={paper.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                  {/* overlay download on hover */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="m-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-black">
                      <Download className="h-3.5 w-3.5" />
                      {isEn ? "Download for free" : "Baixar grátis"}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wide"
                    style={{ color: paper.accent }}
                  >
                    {paper.volume}
                  </span>
                  <h3 className="mt-0.5 font-display text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-600">
                    {paper.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ---------- Blog recente (depois) ---------- */}
        <div className="mt-24 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-pink-500">
              {isEn ? "From the blog" : "Do blog"}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              {isEn ? "Our blog" : "Nosso blog"}
            </h2>
          </div>
          <Link
            href="/blog"
            onClick={() => trackClick("home_blog_all", "home_resources")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 transition-colors hover:text-pink-700"
          >
            {isEn ? "All posts" : "Todos os posts"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          grabCursor
          loop
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={900}
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 1.6, spaceBetween: 20 },
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="mt-10 w-full !overflow-hidden !py-2"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.slug} className="h-auto">
              <Link
                href={`/blog/${post.slug}`}
                onClick={() => trackClick(`home_blog_${post.slug}`, "home_resources")}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lg">
                  {/* Título tratado vive NA capa; embaixo fica categoria + data + excerpt */}
                  <BlogCover post={post} variant="card" showTitle />
                </div>
                <div className="mt-4 flex items-center gap-3 text-[13px] text-gray-500">
                  <span className="font-medium text-pink-600">
                    {categoryLabels[post.category]}
                  </span>
                  <span className="text-gray-300">/</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
