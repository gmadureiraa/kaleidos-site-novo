"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, ExternalLink, Heart, MessageCircle, Repeat2, BadgeCheck, FileText, Mail, CornerDownRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Seção de vídeos em destaque (manifesto / cinematográficos)          */
/* ------------------------------------------------------------------ */
export interface ShowcaseVideo {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

export function ManifestoVideos({ videos, heading }: { videos: ShowcaseVideo[]; heading: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      <p className="text-gray-600 mb-6">Filmes de manifesto produzidos do roteiro à finalização.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videos.map((v, i) => (
          <motion.button
            key={v.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black text-left shadow-sm"
          >
            {v.poster ? (
              <Image
                src={v.poster}
                alt={v.title || "Vídeo manifesto"}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#7CF067] text-black shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-black" />
            </span>
            {(v.title || v.subtitle) && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {v.title && <p className="font-display text-lg font-bold text-white">{v.title}</p>}
                {v.subtitle && <p className="text-xs text-gray-300">{v.subtitle}</p>}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <video
              src={encodeURI(videos[active].src)}
              poster={videos[active].poster}
              controls
              autoPlay
              className="max-h-[85vh] max-w-4xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase de site (screenshot dentro de moldura de navegador)        */
/* ------------------------------------------------------------------ */
export function SiteShowcase({
  heading,
  url,
  image,
  blurb,
  ctaLabel = "Visitar site",
}: {
  heading: string;
  url: string;
  image: string;
  blurb?: string;
  ctaLabel?: string;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      >
        {/* barra do navegador */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-gray-500">
            {host}
          </span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="group block relative">
          <Image
            src={image}
            alt={`${host} — site`}
            width={1440}
            height={900}
            sizes="(max-width:1024px) 100vw, 896px"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <span className="flex translate-y-2 items-center gap-2 rounded-full bg-[#7CF067] px-5 py-2.5 text-sm font-semibold text-black opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </a>
      </motion.div>
      <div className="mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-[#7CF067] border border-[#7CF067] hover:bg-gray-900 transition-colors"
        >
          {ctaLabel}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Galeria de imagens (Alfred — identidade gerada por IA)              */
/* ------------------------------------------------------------------ */
export function ImageGallery({
  heading,
  blurb,
  images,
}: {
  heading: string;
  blurb?: string;
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="visual-work" className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}
      <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={500}
              height={500}
              sizes="(max-width:640px) 50vw, 300px"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActive(null)}
          >
            <button onClick={() => setActive(null)} aria-label="Fechar" className="absolute right-4 top-4 text-white hover:text-gray-300">
              <X className="h-8 w-8" />
            </button>
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={1000}
              height={1000}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cards de tweets reais (Alfred @alfredp2p)                           */
/* ------------------------------------------------------------------ */
export interface AlfredTweet {
  text: string;
  tag?: string;
}

export function TweetCards({
  heading,
  handle,
  displayName,
  avatar,
  tweets,
}: {
  heading: string;
  handle: string;
  displayName: string;
  avatar?: string;
  tweets: AlfredTweet[];
}) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      <p className="text-gray-600 mb-6">
        Voz, roteiro e publicação do perfil{" "}
        <a href={`https://x.com/${handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 underline decoration-[#7CF067] decoration-2 underline-offset-2">
          {handle}
        </a>
        .
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tweets.map((tw, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-sm font-bold text-[#7CF067]">
                {avatar ? (
                  <Image src={avatar} alt={displayName} width={40} height={40} className="h-full w-full object-cover" />
                ) : (
                  displayName.slice(0, 1)
                )}
              </div>
              <div className="leading-tight">
                <p className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  {displayName}
                  <BadgeCheck className="h-4 w-4 text-[#1d9bf0]" />
                </p>
                <p className="text-xs text-gray-500">{handle}</p>
              </div>
            </div>
            <p className="flex-1 whitespace-pre-line text-[15px] leading-relaxed text-gray-800">{tw.text}</p>
            <div className="mt-4 flex items-center gap-6 border-t border-gray-100 pt-3 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <Repeat2 className="h-4 w-4" />
              <Heart className="h-4 w-4" />
              {tw.tag && <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-gray-400">{tw.tag}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cards de artigos de LinkedIn (DSEC)                                 */
/* ------------------------------------------------------------------ */
export interface LinkedinArticle {
  title: string;
  pillar?: string;
  excerpt: string;
}

export function LinkedinArticles({
  heading,
  blurb,
  profileUrl,
  articles,
}: {
  heading: string;
  blurb?: string;
  profileUrl?: string;
  articles: LinkedinArticle[];
}) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {articles.map((a, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-[#0A66C2] text-xs font-bold text-white">in</span>
              {a.pillar && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                  {a.pillar}
                </span>
              )}
            </div>
            <h3 className="mb-2 font-display text-lg font-bold leading-snug text-gray-900">{a.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-gray-600">{a.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2]">
              <FileText className="h-4 w-4" />
              Artigo LinkedIn
            </span>
          </motion.article>
        ))}
      </div>
      {profileUrl && (
        <div className="mt-6">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Ver perfil no LinkedIn
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Banda de "frentes" — destaca as N frentes de trabalho do case       */
/* ------------------------------------------------------------------ */
export interface ServiceFront {
  label: string;
  blurb: string;
}

export function ServiceFronts({
  heading,
  blurb,
  fronts,
}: {
  heading: string;
  blurb?: string;
  fronts: ServiceFront[];
}) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {fronts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7CF067]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-1.5 font-display text-lg font-bold text-gray-900">{f.label}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{f.blurb}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* E-mail marketing — newsletter semanal + sequência (mini-curso) DSEC */
/* ------------------------------------------------------------------ */
export interface EmailItem {
  /** rótulo de etapa, ex: "Dia 1" ou "Newsletter" */
  step: string;
  title: string;
  subject: string;
  image?: string;
}

export function EmailMarketing({
  heading,
  blurb,
  newsletterName,
  cadence,
  pillars,
  sequenceHeading,
  emails,
}: {
  heading: string;
  blurb?: string;
  newsletterName: string;
  cadence: string;
  pillars?: { label: string; pct: string }[];
  sequenceHeading: string;
  emails: EmailItem[];
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}

      {/* Newsletter recorrente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-[#7CF067]">
            <Mail className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-gray-900">{newsletterName}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{cadence}</p>
          </div>
        </div>
        {pillars && pillars.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <span
                key={p.label}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                {p.label} <span className="text-gray-400">{p.pct}</span>
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Sequência / mini-curso */}
      <h3 className="mb-4 font-display text-lg font-bold text-gray-900">{sequenceHeading}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {emails.map((e, i) => (
          <motion.button
            type="button"
            onClick={() => (e.image ? setActive(i) : undefined)}
            key={e.step + e.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {e.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded bg-[#7CF067] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">
                <Mail className="h-3 w-3" />
                {e.step}
              </span>
              <h4 className="mb-2 font-display text-base font-bold leading-snug text-gray-900">{e.title}</h4>
              <p className="flex-1 text-sm italic leading-relaxed text-gray-600">&ldquo;{e.subject}&rdquo;</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && emails[active].image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActive(null)}
          >
            <button onClick={() => setActive(null)} aria-label="Fechar" className="absolute right-4 top-4 text-white hover:text-gray-300">
              <X className="h-8 w-8" />
            </button>
            <Image
              src={emails[active].image as string}
              alt={emails[active].title}
              width={1000}
              height={1000}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
              onClick={(ev) => ev.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reply Guy — cards de respostas do Alfred no X (operação de replies) */
/* ------------------------------------------------------------------ */
export interface ReplyItem {
  /** contexto: a quem/sobre o que o Alfred está respondendo */
  context: string;
  reply: string;
  tag?: string;
}

export function ReplyGuy({
  heading,
  blurb,
  handle,
  displayName,
  avatar,
  replies,
}: {
  heading: string;
  blurb?: string;
  handle: string;
  displayName: string;
  avatar?: string;
  replies: ReplyItem[];
}) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{heading}</h2>
      {blurb && <p className="text-gray-600 mb-6">{blurb}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {replies.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* tweet original (contexto) */}
            <div className="mb-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-500">
              <span className="font-semibold text-gray-600">Respondendo a:</span> {r.context}
            </div>
            {/* resposta do Alfred */}
            <div className="flex items-start gap-3">
              <CornerDownRight className="mt-1 h-4 w-4 shrink-0 text-[#7CF067]" />
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-xs font-bold text-[#7CF067]">
                    {avatar ? (
                      <Image src={avatar} alt={displayName} width={28} height={28} className="h-full w-full object-cover" />
                    ) : (
                      displayName.slice(0, 1)
                    )}
                  </div>
                  <p className="flex items-center gap-1 text-sm font-bold text-gray-900">
                    {displayName}
                    <BadgeCheck className="h-3.5 w-3.5 text-[#1d9bf0]" />
                    <span className="ml-1 text-xs font-normal text-gray-500">{handle}</span>
                  </p>
                </div>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-800">{r.reply}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-6 border-t border-gray-100 pt-3 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <Repeat2 className="h-4 w-4" />
              <Heart className="h-4 w-4" />
              {r.tag && <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-gray-400">{r.tag}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
