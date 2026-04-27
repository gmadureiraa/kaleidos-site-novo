"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { PortfolioItem, PortfolioCategory } from "@/lib/portfolio-data";
import { MacBookMockup, IPhoneMockup } from "./device-mockup";
import { getAllCases, type CaseData } from "@/lib/case-data";

interface PortfolioListProps {
  items: PortfolioItem[];
  categoryLabels: Record<PortfolioCategory, string>;
}

export function PortfolioList({ items, categoryLabels }: PortfolioListProps) {
  // Group items by clientId (project)
  const projects = new Map<
    string,
    {
      name: string;
      category: PortfolioCategory;
      items: PortfolioItem[];
      caseData: CaseData | null;
    }
  >();
  const allCases = getAllCases();

  for (const item of items) {
    if (!projects.has(item.clientId)) {
      const caseData = allCases.find((c) => c.id === item.clientId) || null;
      projects.set(item.clientId, {
        name: item.clientName,
        category: item.category,
        items: [],
        caseData,
      });
    }
    projects.get(item.clientId)!.items.push(item);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {Array.from(projects.entries()).map(([projectId, project], idx) => {
        // Find desktop and mobile screenshots
        const desktopShot = project.items.find(
          (i) => i.type === "image" && !i.src.includes("mobile")
        );
        const mobileShot = project.items.find(
          (i) => i.type === "image" && i.src.includes("mobile")
        );
        const link = project.caseData?.links?.[0];

        return (
          <motion.div
            key={projectId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
          >
            <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 sm:p-12 overflow-hidden shadow-sm">
              {/* Project header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 block">
                    {categoryLabels[project.category] || project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-gray-900 font-bold tracking-tight">
                    {project.name}
                  </h3>
                  {project.caseData?.descricao && (
                    <p className="text-sm text-gray-600 mt-2 max-w-lg line-clamp-2">
                      {project.caseData.descricao}
                    </p>
                  )}
                  {/* Tags */}
                  {project.caseData?.servicos && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.caseData.servicos.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#2d7a26] transition-colors border border-gray-200 rounded-full px-3 py-1.5 bg-white"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Visitar
                  </a>
                )}
              </div>

              {/* Device mockups */}
              <div className="flex items-end justify-center gap-8">
                {desktopShot && (
                  <div className="flex-1 max-w-[680px]">
                    <MacBookMockup
                      src={desktopShot.src}
                      alt={desktopShot.alt}
                    />
                  </div>
                )}
                {mobileShot && (
                  <div className="hidden sm:block shrink-0">
                    <IPhoneMockup
                      src={mobileShot.src}
                      alt={mobileShot.alt}
                    />
                  </div>
                )}
                {!desktopShot && !mobileShot && project.items[0] && (
                  <div className="flex-1 max-w-[680px]">
                    <MacBookMockup
                      src={project.items[0].src}
                      alt={project.items[0].alt}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {items.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">Nenhum projeto encontrado</p>
        </div>
      )}
    </div>
  );
}
