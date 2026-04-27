"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { PortfolioCard } from "./portfolio-card";
import type { PortfolioItem, PortfolioCategory } from "@/lib/portfolio-data";

interface PortfolioGridProps {
  items: PortfolioItem[];
  onItemClick: (item: PortfolioItem, index: number) => void;
  categoryLabels: Record<PortfolioCategory, string>;
}

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 12;

export function PortfolioGrid({
  items,
  onItemClick,
  categoryLabels,
}: PortfolioGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset visible count when items change (filter applied)
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [items]);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && visibleCount < items.length) {
        setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, items.length));
      }
    },
    [visibleCount, items.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, idx) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item, idx)}
              categoryLabel={categoryLabels[item.category]}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Infinite scroll trigger */}
      {visibleCount < items.length && (
        <div ref={loaderRef} className="flex justify-center py-12">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#7CFF6B]/40 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[#7CFF6B]/40 animate-pulse [animation-delay:150ms]" />
            <div className="w-2 h-2 rounded-full bg-[#7CFF6B]/40 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <p className="text-lg font-display">Nenhum item encontrado</p>
          <p className="text-sm mt-1">Tente outro filtro</p>
        </div>
      )}
    </div>
  );
}
