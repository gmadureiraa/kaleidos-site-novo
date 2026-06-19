"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  BlogPost,
  categoryLabels,
  formatDate,
} from "@/lib/blog-shared";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        {/* Full-width cover */}
        <div className="relative aspect-[2.2/1] rounded-2xl overflow-hidden mb-8 bg-[#0a0a0a] border border-white/[0.06]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="100vw"
            priority
          />
        </div>

        {/* Content below */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[13px] text-gray-500 mb-4">
            <span className="text-[#7CFF6B] font-medium">
              {categoryLabels[post.category]}
            </span>
            <span className="text-gray-700">/</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-gray-700">/</span>
            <span>{post.readTime} min de leitura</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-white leading-[1.15] tracking-[-0.02em] group-hover:text-[#7CFF6B] transition-colors duration-300 font-display mb-4">
            {post.title}
          </h2>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#7CFF6B] group-hover:gap-3 transition-all duration-200">
            Ler artigo
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
