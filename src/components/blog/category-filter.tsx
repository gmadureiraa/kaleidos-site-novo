"use client";

import { motion } from "framer-motion";
import { BlogCategory, categoryLabels } from "@/lib/blog-data";

interface CategoryFilterProps {
  selected: BlogCategory | "all";
  onSelect: (category: BlogCategory | "all") => void;
}

const allCategories: (BlogCategory | "all")[] = [
  "all",
  "marketing",
  "ia",
  "cases",
  "growth",
  "cripto",
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {allCategories.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 ${
              isActive
                ? "text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="blog-filter"
                className="absolute inset-0 bg-[#7CFF6B] rounded-full"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">
              {cat === "all" ? "Todos" : categoryLabels[cat]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
