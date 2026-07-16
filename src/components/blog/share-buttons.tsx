"use client";

import { Twitter, Linkedin, Link2, Check, Sparkles, Search, Bot } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://kaleidos.com.br/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // "Resumir com IA" — abre o assistente com um prompt pré-preenchido apontando
  // pra URL do post (sinal GEO: facilita a citação do artigo por LLMs).
  const aiPrompt = encodeURIComponent(`Resuma este artigo: ${url}`);
  const aiLinks = [
    {
      name: "ChatGPT",
      href: `https://chatgpt.com/?q=${aiPrompt}`,
      Icon: Sparkles,
      label: "Resumir com ChatGPT",
    },
    {
      name: "Perplexity",
      href: `https://www.perplexity.ai/search?q=${aiPrompt}`,
      Icon: Search,
      label: "Resumir com Perplexity",
    },
    {
      name: "Claude",
      href: `https://claude.ai/new?q=${aiPrompt}`,
      Icon: Bot,
      label: "Resumir com Claude",
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
        aria-label="Compartilhar no Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
        aria-label="Compartilhar no LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
        aria-label="Copiar link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-[#7CF067]" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>

      <span className="mx-1 h-4 w-px bg-gray-200" aria-hidden="true" />

      {aiLinks.map(({ name, href, Icon, label }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener"
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
          aria-label={label}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
