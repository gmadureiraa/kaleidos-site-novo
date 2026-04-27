"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BlogPost,
  categoryLabels,
  formatDate,
} from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        {/* Cover */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Meta */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[13px] text-gray-500">
            <span className="text-[#7CFF6B] font-medium">
              {categoryLabels[post.category]}
            </span>
            <span className="text-gray-300">/</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h3 className="text-[17px] font-semibold text-gray-900 leading-snug tracking-[-0.01em] group-hover:text-[#5ae04a] transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
