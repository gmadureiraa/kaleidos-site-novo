"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, CalendarCheck, MessageCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import {
  BlogCategory,
  BlogPost,
  categoryLabels,
  formatDate,
  getModifiedAt,
} from "@/lib/blog-shared";
import { BlogCover } from "@/components/blog/blog-cover";
import { BlogCard } from "@/components/blog/blog-card";
import { toBlogCard } from "@/lib/blog-shared";
import { ShareButtons } from "@/components/blog/share-buttons";
import { LeadGate } from "@/components/blog/lead-gate";
import { getLeadMetadata } from "@/lib/lead-meta";
import { FooterDemo } from "@/components/ui/footer-demo";

// Trilhas com página de serviço casada. Só entra aqui categoria que tem oferta
// real no site — o resto do blog segue sem faixa (nada muda).
const TRACK_CTA: Partial<
  Record<BlogCategory, { text: string; href: string; cta: string }>
> = {
  "marca-pessoal": {
    text: "Este artigo faz parte da trilha de marca pessoal para founder da Kaleidos. A gente também faz isso como serviço: posicionamento, extração da sua voz e cadência sustentada, pra quem não tem agenda pra virar produtor de conteúdo.",
    href: "/marca-pessoal",
    cta: "Conhecer o serviço",
  },
};

// Consultoria grátis 30min — caminho primário de conversão de lead (estratégia §4.2).
const CALENDLY_URL = "https://calendly.com/madureira-kaleidosdigital/30min";

// Quebra o HTML no 2o </h2> pra encaixar a caixa de captura no meio da leitura.
function splitForGate(html: string): [string, string] {
  // Ponto de corte natural: logo após o 2º <h2> (meio do artigo).
  const marker = "</h2>";
  let idx = -1;
  let count = 0;
  let from = 0;
  while (count < 2) {
    const next = html.indexOf(marker, from);
    if (next === -1) break;
    idx = next;
    from = next + marker.length;
    count++;
  }
  if (count >= 2 && idx !== -1) {
    const cut = idx + marker.length;
    return [html.slice(0, cut), html.slice(cut)];
  }
  // Fallback (posts curtos / sem 2 h2): corta no </p> mais perto do meio,
  // pra a caixa de inscrição (LeadGate) SEMPRE aparecer no meio do artigo.
  const pEnds: number[] = [];
  let p = html.indexOf("</p>");
  while (p !== -1) {
    pEnds.push(p + 4);
    p = html.indexOf("</p>", p + 1);
  }
  if (pEnds.length >= 2) {
    const target = html.length / 2;
    const mid = pEnds.reduce(
      (best, pos) => (Math.abs(pos - target) < Math.abs(best - target) ? pos : best),
      pEnds[0],
    );
    return [html.slice(0, mid), html.slice(mid)];
  }
  return [html, ""];
}

interface ArticleContentProps {
  post: BlogPost;
  contentHtml: string;
  relatedPosts: BlogPost[];
  tldr?: string;
}

export function ArticleContent({
  post,
  contentHtml,
  relatedPosts,
  tldr,
}: ArticleContentProps) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _hp: hp,
          metadata: getLeadMetadata("article-sidebar", post.slug),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao assinar");
      setStatus("success");
      setMsg("Pronto! Os proximos estudos chegam no seu email.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Erro ao assinar.");
    }
  }

  const waMsg = "Oi! Acabei de ler um estudo no blog da Kaleidos e quero conhecer mais do trabalho de vocês.";
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Sticky nav + breadcrumbs visíveis (semânticos) */}
      <div className="sticky top-16 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-black/10">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <nav aria-label="Trilha de navegação" className="min-w-0">
            <ol className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li>
                {/* Nível de trilha: do post o leitor volta pro hub da categoria,
                    não pro /blog inteiro (~90% cripto). */}
                <Link
                  href={`/blog/categoria/${post.category}`}
                  className="hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  {categoryLabels[post.category]}
                </Link>
              </li>
              <li aria-hidden="true" className="hidden sm:block text-gray-300">/</li>
              <li className="hidden sm:block min-w-0">
                <span className="text-gray-700 truncate inline-block max-w-[280px] align-bottom">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </div>

      {/* Article header */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-[13px] text-gray-500">
              <Link
                href={`/blog/categoria/${post.category}`}
                className="text-[#b8479a] font-semibold hover:underline"
              >
                {categoryLabels[post.category]}
              </Link>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime} min</span>
              </div>
              {getModifiedAt(post) !== post.publishedAt && (
                <>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-400">
                    Atualizado em{" "}
                    <time dateTime={getModifiedAt(post)}>
                      {formatDate(getModifiedAt(post))}
                    </time>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold text-gray-900 leading-[1.12] tracking-[-0.025em] font-display">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* TL;DR answer-first — bloco de citação extraível por IA (GEO §1.4) */}
            {tldr && (
              <div className="rounded-xl border border-black/10 bg-[#F0F0EF] px-5 py-4">
                <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#b8479a] mb-1.5">
                  Resumo
                </p>
                <p className="text-[15px] text-gray-800 leading-relaxed">{tldr}</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-700 font-medium">
                {post.author.name}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="max-w-[960px] mx-auto">
          <div className="relative aspect-[2.2/1] rounded-2xl overflow-hidden border border-gray-200">
            <BlogCover post={post} variant="article" />
          </div>
        </div>
      </motion.section>

      {/* Body + sidebar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(280px,28vw,340px)] gap-12 lg:gap-16 items-start">
          {/* Article */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {(() => {
                const [a, b] = splitForGate(contentHtml);
                return (
                  <>
                    <article className="study-prose !max-w-none" dangerouslySetInnerHTML={{ __html: a }} />
                    {b && <LeadGate articleSlug={post.slug} />}
                    {b && (
                      <article className="study-prose !max-w-none" dangerouslySetInnerHTML={{ __html: b }} />
                    )}
                  </>
                );
              })()}
            </motion.div>

            {/* Faixa de trilha — só nas categorias que têm oferta casada. Fecha o
                post com o hub (continuar na trilha) + a página de serviço. Sem
                isso, o leitor que chega por um post de marca pessoal cai no
                "Relacionados" e some no acervo de cripto. */}
            {TRACK_CTA[post.category] && (
              <aside
                aria-label="Continue na trilha"
                className="mt-14 rounded-2xl border border-black/10 bg-[#F0F0EF] px-6 py-7 md:px-8"
              >
                <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#b8479a] mb-2">
                  Trilha: {categoryLabels[post.category]}
                </p>
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  {TRACK_CTA[post.category]!.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/blog/categoria/${post.category}`}
                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-[13px] font-semibold text-gray-800 transition-colors hover:border-gray-900"
                  >
                    Ver todos os artigos da trilha
                  </Link>
                  <Link
                    href={TRACK_CTA[post.category]!.href}
                    className="inline-flex items-center rounded-full bg-black px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    {TRACK_CTA[post.category]!.cta}
                  </Link>
                </div>
              </aside>
            )}

            {/* FAQ visível — casa com o FAQPage JSON-LD (sinal GEO de alto impacto) */}
            {post.faq && post.faq.length > 0 && (
              <section
                aria-labelledby="faq-heading"
                className="mt-14 pt-10 border-t border-gray-200"
              >
                <h2
                  id="faq-heading"
                  className="text-[1.5rem] md:text-[1.75rem] font-bold text-gray-900 font-display mb-6 tracking-[-0.02em]"
                >
                  Perguntas frequentes
                </h2>
                <div className="space-y-5">
                  {post.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-gray-200 bg-[#FFFFFF] px-5 py-4"
                    >
                      <summary className="cursor-pointer list-none font-semibold text-[15px] text-gray-900 leading-snug marker:hidden">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-[14px] text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Fechamento Kaleidos (igual outro dos papers) */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#0A0A0A] text-white p-6 md:p-8 mt-12">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(210,98,178,0.16) 1.5px, transparent 1.6px)",
                  backgroundSize: "11px 11px",
                }}
              />
              <div className="relative">
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-[#d262b2] mb-2.5">
                  Gostou deste estudo?
                </p>
                <h3 className="font-display font-bold text-[1.35rem] md:text-[1.6rem] leading-tight mb-2 max-w-lg">
                  A Kaleidos faz isso pelo seu projeto cripto.
                </h3>
                <p className="text-[14px] text-gray-400 mb-5 max-w-lg leading-relaxed">
                  Somos a agência cripto-nativa do Brasil. Estratégia, conteúdo e growth
                  do jeito de quem entende o mercado on-chain. Fale com a gente e vamos
                  construir atenção juntos.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="blog-article-calendly"
                    data-post={post.slug}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7CF067] text-black font-semibold text-sm hover:bg-[#6ae85a] transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" /> Agendar 30min grátis
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="blog-article-whatsapp"
                    data-post={post.slug}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
                  </a>
                  <Link
                    href="/servicos"
                    data-cta="blog-article-servicos"
                    data-post={post.slug}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Ver nossos serviços
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                  >
                    Conhecer a Kaleidos
                  </Link>
                </div>
              </div>
            </div>

            {/* Share footer */}
            <div className="flex items-center justify-between py-8 mt-12 border-t border-gray-200">
              <p className="text-[13px] text-gray-500">
                Gostou? Compartilhe com quem precisa ler.
              </p>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 self-start space-y-8">
            {/* Author / CTA card */}
            <div className="rounded-2xl border border-gray-200 bg-[#FFFFFF] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {post.author.name}
                  </p>
                  <p className="text-[12px] text-gray-500">Kaleidos</p>
                </div>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
                A Kaleidos disseca o que faz tokens e projetos crescerem, e aplica
                isso em quem constroi no cripto/web3.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="blog-sidebar-calendly"
                data-post={post.slug}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#0A0A0A] text-white font-semibold text-sm hover:bg-[#7CF067] hover:text-black transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                Agendar 30min grátis
              </a>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Receba os proximos estudos
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                Um estudo denso por quinzena, direto no seu email.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <input
                    name="_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7CF067]/60 focus:ring-1 focus:ring-[#7CF067]/20 transition-all text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#7CF067] text-black font-semibold text-sm hover:bg-[#6ae052] transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Enviando..." : "Assinar"}
                </button>
              </form>
              {msg && (
                <p
                  className={`mt-2.5 text-[12px] ${
                    status === "success" ? "text-[#3d9e32]" : "text-red-600"
                  }`}
                >
                  {msg}
                </p>
              )}
            </div>

            {/* Discover more */}
            {relatedPosts.length > 0 && (
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-gray-400 mb-4">
                  Descubra mais artigos
                </p>
                <div className="space-y-5">
                  {relatedPosts.slice(0, 3).map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group flex gap-3.5 items-start"
                    >
                      <div className="relative w-[88px] shrink-0 aspect-[16/10] rounded-lg overflow-hidden border border-gray-200">
                        <BlogCover post={rp} variant="thumb" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-[#3d9e32] transition-colors">
                          {rp.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {categoryLabels[rp.category]} · {rp.readTime} min
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Relacionados — grid full-width no fim do post (mesma categoria primeiro) */}
      {relatedPosts.length > 0 && (
        <section
          aria-labelledby="relacionados-heading"
          className="px-4 sm:px-6 lg:px-8 pb-20 border-t border-black/10 pt-16"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#b8479a] mb-2">
                  Continue lendo
                </p>
                <h2
                  id="relacionados-heading"
                  className="text-[1.6rem] md:text-[2rem] font-bold text-gray-900 font-display tracking-[-0.02em]"
                >
                  Relacionados
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#b8479a] transition-colors shrink-0"
              >
                Ver todos os estudos
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {relatedPosts.slice(0, 3).map((rp, i) => (
                <BlogCard key={rp.slug} post={toBlogCard(rp)} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner de CTA de venda — fim do post */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[1080px] mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(124,240,103,0.14) 1.5px, transparent 1.6px)",
                backgroundSize: "13px 13px",
              }}
            />
            <div className="relative max-w-xl">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-[#7CF067] mb-2.5">
                Trabalhe com a Kaleidos
              </p>
              <h3 className="font-display font-bold text-[1.5rem] md:text-[2rem] leading-tight mb-3">
                Quer esse nível de estratégia no seu projeto cripto?
              </h3>
              <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed">
                Somos a agência cripto-nativa do Brasil. Peça uma proposta grátis e
                veja como podemos construir atenção, autoridade e growth pro seu
                projeto.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/pacotes"
                data-cta="blog-related-pacotes"
                data-post={post.slug}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7CF067] text-black font-semibold text-sm hover:bg-[#6ae052] transition-colors whitespace-nowrap"
              >
                Proposta grátis
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="blog-related-calendly"
                data-post={post.slug}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4" /> Agendar 30min
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterDemo />
    </main>
  );
}
