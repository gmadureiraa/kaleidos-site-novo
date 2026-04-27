"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import {
  getPortfolioItems,
  getPortfolioClients,
  type PortfolioItem,
  type PortfolioCategory,
} from "@/lib/portfolio-data";
import { PortfolioFilters } from "@/components/portfolio/portfolio-filters";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { PortfolioList } from "@/components/portfolio/portfolio-list";
import { PortfolioLightbox } from "@/components/portfolio/portfolio-lightbox";
import { FooterDemo } from "@/components/ui/footer-demo";

export default function PortfolioPage() {
  const { t } = useI18n();
  const allItems = useMemo(() => getPortfolioItems(), []);
  const clients = useMemo(() => getPortfolioClients(), []);

  const [viewMode, setViewMode] = useState<"gallery" | "list">("list");
  const [activeCategory, setActiveCategory] = useState<
    PortfolioCategory | "all"
  >("all");
  const [activeClient, setActiveClient] = useState<string | "all">("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory)
        return false;
      if (activeClient !== "all" && item.clientId !== activeClient) return false;
      return true;
    });
  }, [allItems, activeCategory, activeClient]);

  const handleItemClick = useCallback(
    (item: PortfolioItem, index: number) => {
      setSelectedItem(item);
      setSelectedIndex(index);
    },
    []
  );

  const handleNavigate = useCallback(
    (index: number) => {
      const item = filteredItems[index];
      if (item) {
        setSelectedItem(item);
        setSelectedIndex(index);
      }
    },
    [filteredItems]
  );

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const categoryLabels: Record<PortfolioCategory, string> = {
    site: t("portfolio", "filterSites"),
    post: t("portfolio", "filterPosts"),
    design: t("portfolio", "filterDesigns"),
    video: t("portfolio", "filterVideos"),
    reel: t("portfolio", "filterReels"),
    criativo: t("portfolio", "filterCreatives"),
  };

  const filterLabels = {
    all: t("portfolio", "filterAll"),
    ...categoryLabels,
    filterByClient: t("portfolio", "filterByClient"),
    items: t("portfolio", "items"),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display text-gray-900 tracking-tight">
            {t("portfolio", "title")}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl font-sans">
            {t("portfolio", "subtitle")}
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 h-px bg-gradient-to-r from-[#7CFF6B]/60 via-[#7CFF6B]/20 to-transparent origin-left"
        />
      </section>

      {/* Filters */}
      <PortfolioFilters
        activeCategory={activeCategory}
        activeClient={activeClient}
        clients={clients}
        onCategoryChange={setActiveCategory}
        onClientChange={setActiveClient}
        totalItems={allItems.length}
        filteredCount={filteredItems.length}
        labels={filterLabels}
      />

      {/* View toggle — only show for site category */}
      {(activeCategory === "all" || activeCategory === "site") && (
        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setViewMode("gallery")}
              className={`p-2 rounded-md transition-colors cursor-pointer ${viewMode === "gallery" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors cursor-pointer ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {(() => {
        // List view only for site category
        const canShowList = activeCategory === "all" || activeCategory === "site";
        const showList = canShowList && viewMode === "list";

        if (showList) {
          const listItems = activeCategory === "all"
            ? filteredItems.filter(i => i.category === "site")
            : filteredItems;
          const galleryItems = activeCategory === "all"
            ? filteredItems.filter(i => i.category !== "site")
            : [];

          return (
            <>
              {listItems.length > 0 && (
                <>
                  {activeCategory === "all" && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                      <h2 className="text-xl font-display text-gray-700 tracking-tight">Sites</h2>
                    </div>
                  )}
                  <PortfolioList items={listItems} categoryLabels={categoryLabels} />
                </>
              )}
              {galleryItems.length > 0 && (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                    <h2 className="text-xl font-display text-gray-700 tracking-tight">Criativos & Conteudo</h2>
                  </div>
                  <PortfolioGrid
                    items={galleryItems}
                    onItemClick={handleItemClick}
                    categoryLabels={categoryLabels}
                  />
                </>
              )}
            </>
          );
        }

        return (
          <PortfolioGrid
            items={filteredItems}
            onItemClick={handleItemClick}
            categoryLabels={categoryLabels}
          />
        );
      })()}

      {/* Lightbox */}
      <PortfolioLightbox
        item={selectedItem}
        items={filteredItems}
        currentIndex={selectedIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
        viewCaseLabel={t("portfolio", "viewCase")}
      />

      <FooterDemo />
    </main>
  );
}
