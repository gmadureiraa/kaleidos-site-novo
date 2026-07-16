"use client";

import { ChevronDown, Search, X } from "lucide-react";

/**
 * Controles do índice do blog: busca por texto + ordenação + contador.
 * Client-only (o server manda os posts já ordenados por data desc; qualquer
 * re-ordenação só acontece após interação do usuário, então não há mismatch
 * de hidratação).
 */

export type BlogSortOption =
  | "recentes"
  | "antigos"
  | "leitura-curta"
  | "leitura-longa";

export const sortLabels: Record<BlogSortOption, string> = {
  recentes: "Mais recentes",
  antigos: "Mais antigos",
  "leitura-curta": "Menor tempo de leitura",
  "leitura-longa": "Maior tempo de leitura",
};

interface BlogControlsProps {
  query: string;
  onQueryChange: (query: string) => void;
  sort: BlogSortOption;
  onSortChange: (sort: BlogSortOption) => void;
  /** Total de artigos após filtro/busca — vira o contador "N artigos". */
  resultCount: number;
}

export function BlogControls({
  query,
  onQueryChange,
  sort,
  onSortChange,
  resultCount,
}: BlogControlsProps) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Busca */}
      <div className="relative flex-1 sm:max-w-xs">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <input
          type="search"
          inputMode="search"
          placeholder="Buscar artigo..."
          aria-label="Buscar artigo por título"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7CF067]/60 focus:ring-2 focus:ring-[#7CF067]/20 focus:bg-white transition-colors motion-reduce:transition-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Limpar busca"
            className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-gray-900 transition-colors motion-reduce:transition-none"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ordenação */}
      <div className="relative sm:ml-auto">
        <label htmlFor="blog-sort" className="sr-only">
          Ordenar artigos
        </label>
        <select
          id="blog-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as BlogSortOption)}
          className="w-full sm:w-auto min-h-[44px] appearance-none pl-4 pr-10 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 cursor-pointer focus:outline-none focus:border-[#7CF067]/60 focus:ring-2 focus:ring-[#7CF067]/20 focus:bg-white transition-colors motion-reduce:transition-none"
        >
          {(Object.keys(sortLabels) as BlogSortOption[]).map((option) => (
            <option key={option} value={option}>
              {sortLabels[option]}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
      </div>

      {/* Contador de resultados */}
      <p
        aria-live="polite"
        className="text-[13px] text-gray-500 whitespace-nowrap tabular-nums sm:pl-1"
      >
        {resultCount === 1 ? "1 artigo" : `${resultCount} artigos`}
      </p>
    </div>
  );
}
