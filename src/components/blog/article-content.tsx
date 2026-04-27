"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  BlogPost,
  categoryLabels,
  formatDate,
} from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { FooterDemo } from "@/components/ui/footer-demo";

interface ArticleContentProps {
  post: BlogPost;
  contentHtml: string;
  relatedPosts: BlogPost[];
}

export function ArticleContent({
  post,
  contentHtml,
  relatedPosts,
}: ArticleContentProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky nav */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Blog
          </Link>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </div>

      {/* Article header */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Meta line */}
            <div className="flex items-center gap-3 text-[13px] text-gray-500">
              <span className="text-[#7CFF6B] font-medium">
                {categoryLabels[post.category]}
              </span>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime} min</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold text-gray-900 leading-[1.12] tracking-[-0.025em] font-display">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-700 font-medium">
                {post.author.name}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover image - wider */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="max-w-[960px] mx-auto">
          <div className="relative aspect-[2.2/1] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 960px"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Article body */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="px-4 sm:px-6 lg:px-8 pb-24"
      >
        <article className="max-w-[680px] mx-auto">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-[-0.02em]
              prose-h2:text-[1.5rem] prose-h2:mt-14 prose-h2:mb-5
              prose-h3:text-[1.2rem] prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[16px]
              prose-a:text-[#3d9e32] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-li:text-gray-700 prose-li:leading-[1.8] prose-li:text-[16px]
              prose-ul:my-5 prose-ol:my-5
              prose-li:marker:text-[#7CFF6B]
              prose-blockquote:border-l-[#7CFF6B] prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:pl-6
              prose-hr:border-gray-200 prose-hr:my-12
              prose-table:text-sm
              prose-th:text-left prose-th:text-gray-800 prose-th:font-medium prose-th:border-b prose-th:border-gray-200 prose-th:pb-3 prose-th:pr-8
              prose-td:text-gray-600 prose-td:py-3 prose-td:pr-8 prose-td:border-b prose-td:border-gray-100
              prose-code:text-[#2d7a26] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[14px] prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']"
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />
        </article>
      </motion.section>

      {/* Share footer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-[680px] mx-auto flex items-center justify-between py-8 border-t border-gray-200">
          <p className="text-[13px] text-gray-500">
            Gostou? Compartilhe com quem precisa ler.
          </p>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </section>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="max-w-[1120px] mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-bold text-gray-900 font-display tracking-[-0.02em]">
                Continue lendo
              </h2>
              <Link
                href="/blog"
                className="text-[13px] text-gray-600 hover:text-[#5ae04a] transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {relatedPosts.map((relatedPost, i) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterDemo />
    </main>
  );
}
