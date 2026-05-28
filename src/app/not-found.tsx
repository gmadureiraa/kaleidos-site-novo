import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada · Kaleidos",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center bg-black px-6 py-24"
    >
      <div className="text-center max-w-lg">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#7CFF6B] mb-4">
          Erro 404
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-display tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          O link que você seguiu pode estar quebrado ou a página foi movida.
          Vamos te levar de volta pro caminho certo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-pink-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-pink-600 transition-colors text-base"
          >
            Voltar para a Home
          </Link>
          <Link
            href="/cases"
            className="inline-block border border-gray-700 text-white py-3 px-8 rounded-lg font-semibold hover:border-[#7CFF6B]/40 hover:text-[#7CFF6B] transition-colors text-base"
          >
            Ver nossos cases
          </Link>
        </div>
      </div>
    </main>
  );
}
