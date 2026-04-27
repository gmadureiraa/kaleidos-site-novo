"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PortfolioItem, PortfolioCategory } from "@/lib/portfolio-data";

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
  categoryLabel: string;
}

const CATEGORY_COLORS: Record<PortfolioCategory, string> = {
  site: "bg-[#7CFF6B]/80",
  design: "bg-pink-500/80",
  video: "bg-blue-500/80",
  reel: "bg-purple-500/80",
  post: "bg-amber-500/80",
  criativo: "bg-emerald-500/80",
};

export function PortfolioCard({
  item,
  onClick,
  categoryLabel,
}: PortfolioCardProps) {
  const isVideo = item.type === "video";
  const thumbnailSrc = isVideo ? (item.poster || item.src) : item.src;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="break-inside-avoid mb-4 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* Thumbnail */}
        {isVideo && !item.poster ? (
          <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
            <video
              src={item.src}
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onLoadedData={(e) => {
                const video = e.currentTarget;
                video.currentTime = 1;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={thumbnailSrc}
            alt={item.alt || `${item.clientName} — ${item.category}`}
            width={600}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Video play icon overlay */}
        {isVideo && item.poster && (
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white text-sm font-display truncate">
              {item.clientName}
            </span>
            <span
              className={`text-[10px] text-white px-2 py-0.5 rounded-full shrink-0 ${
                CATEGORY_COLORS[item.category]
              }`}
            >
              {categoryLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
