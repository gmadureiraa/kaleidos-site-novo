/**
 * Web3 V2 — seção de recursos (Playbooks + Blog) EXCLUSIVA da rota `/2`.
 *
 * Substitui o `HomeResources` (compartilhado com a home) APENAS no `/2`, pra
 * reestilizar as capas no padrão /web3 (creme + Atelier/Gridlite + cards
 * brutalistas) SEM tocar a home, o /blog ou o /papers.
 *
 * - Playbooks: as capas-medalhão reais de `/public/papers/*.png` em 6 FRAMINGS
 *   de card distintos (scrapbook · sticker-bomb · polaroid · dark-tech ·
 *   pop-cor · editorial-emblema), determinísticos por slug.
 * - Blog: 8 estilos de capa via `BlogCoverVariant` (seletor determinístico por
 *   hash do slug, sem 2 adjacentes iguais).
 *
 * Dados vêm dos MESMOS módulos da home (`papers-data`, `blog-data`), só LIDOS.
 */
import Link from "next/link";
import { papers, type Paper } from "@/lib/papers-data";
import { getPublishedPostCards } from "@/lib/blog-data";
import { coverStylesForList } from "@/lib/cover-style";
import { BlogCoverVariant } from "@/components/blog/blog-cover-variants";
import { Web3V2PlaybookCta } from "@/components/web3v2/playbook-cta";

// Apenas 3 posts em destaque: Comunidade, Narrativas e Airdrop.
const FEATURED_SLUGS = [
  "comunidade-cripto-que-nao-morre",
  "narrativas-cripto-2026",
  "airdrop-quanto-alocar-supply-roi",
];
const GUIA_SLUG = "playbook-cripto-2026";

const GREEN = "#7CF067";
const PINK = "#D262B2";
const INK = "#14110D";

// ── Playbook: 6 framings de card sobre a capa-medalhão ───────────────────────
type PlaybookFraming =
  | "scrapbook"
  | "sticker-bomb"
  | "polaroid"
  | "dark-tech"
  | "pop-cor"
  | "editorial-emblema";

const PLAYBOOK_OVERRIDE: Record<string, PlaybookFraming> = {
  "playbook-cripto-2026": "editorial-emblema",
  "playbook-tge-2026": "editorial-emblema",
  hyperliquid: "dark-tech",
  "pudgy-penguins": "pop-cor",
  "bull-market-2026": "polaroid",
  solana: "scrapbook",
  base: "sticker-bomb",
  "pump-fun": "pop-cor",
};
const FRAMINGS: PlaybookFraming[] = [
  "scrapbook",
  "sticker-bomb",
  "polaroid",
  "dark-tech",
  "pop-cor",
  "editorial-emblema",
];
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function framingFor(p: Paper): PlaybookFraming {
  if (p.coverStyle && (FRAMINGS as string[]).includes(p.coverStyle)) {
    return p.coverStyle as PlaybookFraming;
  }
  return PLAYBOOK_OVERRIDE[p.slug] ?? FRAMINGS[hashStr(p.slug) % FRAMINGS.length];
}

const STYLE = `
.kv2 .w3-rescard{transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-rescard:hover{transform:translateY(-8px) rotate(0deg)!important;}
.kv2 .w3-rescard:hover .w3-resimg{transform:translate(-50%,-50%) scale(1.05);}
.kv2 .w3-resimg{transition:transform .6s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-pcard{transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-pcard:hover{transform:translateY(-8px) rotate(0deg)!important;}

/* ── Carrossel único (papers + blogs alternados) ── */
.kv2 .w3-carousel{
  display:flex;gap:24px;overflow-x:auto;overflow-y:hidden;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding:8px 4px 28px;margin:0 -4px;
  scrollbar-width:none;cursor:grab;user-select:none;
}
.kv2 .w3-carousel::-webkit-scrollbar{display:none;}
.kv2 .w3-carousel.is-dragging{cursor:grabbing;scroll-snap-type:none;}
.kv2 .w3-carousel.is-dragging a{pointer-events:none;}
.kv2 .w3-cslide{flex:0 0 auto;width:300px;scroll-snap-align:start;}
@media (max-width:600px){
  .kv2 .w3-cslide{width:78vw;max-width:300px;}
}
`;

function PlaybookCard({ paper, framing }: { paper: Paper; framing: PlaybookFraming }) {
  // `editorial-emblema` é o framing do playbook "Marketing Cripto 2026", cuja capa
  // tem a logo Kaleidos no topo. Com object-fit:cover o topo era CORTADO; usamos
  // `contain` (com leve padding) pra capa inteira aparecer sem colar/cortar a logo.
  const containCover = framing === "editorial-emblema";
  const cover = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={paper.cover}
      alt={paper.title}
      loading="lazy"
      decoding="async"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: containCover ? "contain" : "cover",
        objectPosition: "center",
        padding: containCover ? 6 : 0,
      }}
    />
  );

  // bloco da capa (varia o framing)
  let imageBlock: React.ReactNode;
  let rot = 0;

  if (framing === "polaroid") {
    rot = -1.5;
    imageBlock = (
      <div style={{ background: "#fff", border: `1.5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, padding: "10px 10px 0", borderRadius: 6 }}>
        <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: INK }}>{cover}</div>
        <div style={{ fontFamily: "Gridlite, monospace", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b6258", padding: "8px 2px 10px" }}>
          {paper.volume} · Kaleidos
        </div>
      </div>
    );
  } else if (framing === "dark-tech") {
    rot = 0;
    imageBlock = (
      <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 12, border: `2px solid ${INK}`, boxShadow: `0 0 0 2px ${GREEN}, 8px 8px 0 ${INK}`, background: INK }}>
        {cover}
        <span style={{ position: "absolute", top: 10, left: 10, fontFamily: "Gridlite, monospace", fontSize: 9.5, letterSpacing: "1.5px", color: "#06250a", background: GREEN, padding: "3px 7px", borderRadius: 5, fontWeight: 700 }}>{paper.volume}</span>
      </div>
    );
  } else if (framing === "pop-cor") {
    rot = 1.5;
    imageBlock = (
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", inset: 0, transform: "translate(8px,8px)", background: paper.accent, borderRadius: 14, border: `1.5px solid ${INK}` }} />
        <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 14, border: `1.5px solid ${INK}`, background: INK }}>{cover}</div>
      </div>
    );
  } else if (framing === "editorial-emblema") {
    rot = -1;
    imageBlock = (
      <div style={{ position: "relative" }}>
        <svg aria-hidden="true" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(-6deg)", width: 38, height: 27, fill: INK, zIndex: 2 }}>
          <use href="#kal-eye" />
        </svg>
        <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 10, border: `1.5px solid ${INK}`, boxShadow: `0 8px 22px rgba(20,17,13,.14)`, background: INK }}>{cover}</div>
      </div>
    );
  } else if (framing === "sticker-bomb") {
    rot = 1.2;
    imageBlock = (
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/elements/grafismo-estrela-rosa-01.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: "absolute", top: -14, right: -10, width: 40, transform: "rotate(12deg)", zIndex: 2 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/elements/grafismo-estrela-verde-01.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: "absolute", bottom: -12, left: -10, width: 34, transform: "rotate(-10deg)", zIndex: 2 }} />
        <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 14, border: `1.5px solid ${INK}`, boxShadow: `6px 6px 0 ${PINK}`, background: INK }}>{cover}</div>
      </div>
    );
  } else {
    // scrapbook
    rot = -1.5;
    imageBlock = (
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: -8, left: "18%", width: 56, height: 18, background: "rgba(124,240,103,.6)", border: `1px solid ${INK}33`, transform: "rotate(-6deg)", zIndex: 2 }} />
        <span style={{ position: "absolute", top: -8, right: "16%", width: 56, height: 18, background: "rgba(210,98,178,.5)", border: `1px solid ${INK}33`, transform: "rotate(7deg)", zIndex: 2 }} />
        <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 14, border: `1.5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, background: INK }}>{cover}</div>
      </div>
    );
  }

  return (
    <Link key={paper.slug} href={`/papers/${paper.slug}`} className="w3-pcard" style={{ display: "block", textDecoration: "none", transform: `rotate(${rot}deg)` }}>
      {imageBlock}
      <div style={{ marginTop: 16 }}>
        <span style={{ fontFamily: "Gridlite, monospace", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: paper.accent }}>
          {paper.volume}
        </span>
        <h3 style={{ marginTop: 3, fontFamily: "Atelier, sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.15, color: INK }}>
          {paper.title}
        </h3>
      </div>
    </Link>
  );
}

// ── Card de Blog no carrossel (capa-variant + tag + título chamativo) ────────
function BlogCard({
  post,
  index,
  coverStyle,
  rot,
}: {
  post: ReturnType<typeof getPublishedPostCards>[number];
  index: number;
  coverStyle: ReturnType<typeof coverStylesForList>[number];
  rot: number;
}) {
  const accent = post.category === "cripto" || post.category === "cases" ? GREEN : PINK;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="w3-rescard"
      style={{
        display: "block",
        textDecoration: "none",
        background: "#fff",
        border: `1.5px solid ${INK}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: `6px 6px 0 ${accent}`,
        transform: `rotate(${rot}deg)`,
      }}
    >
      <BlogCoverVariant
        slug={post.slug}
        category={post.category}
        title={post.title}
        index={index}
        override={coverStyle}
      />
      <div style={{ padding: "16px 18px 20px" }}>
        <span style={{ fontFamily: "Gridlite, monospace", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: accent === GREEN ? "#3d9e32" : "#b14e96" }}>
          Blog
        </span>
        <h3 style={{ marginTop: 4, fontFamily: "Atelier, sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.18, letterSpacing: "-0.4px", color: INK }}>
          {post.title}
        </h3>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            lineHeight: 1.5,
            color: "#6b6258",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

// Wiring do arraste (mouse), touch nativo, wheel horizontal e snap. Vanilla JS
// escopado ao container `.w3-carousel` — roda no client sem virar Client Component
// (evita arrastar o markdown do blog pro bundle). Não há autoplay (o /blog travava
// o arraste por causa disso).
const CAROUSEL_SCRIPT = `
(function(){
  var el = document.currentScript.previousElementSibling;
  if(!el || !el.classList || !el.classList.contains('w3-carousel')) return;
  // wheel vertical vira scroll horizontal
  el.addEventListener('wheel', function(e){
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive:false });
  // arraste com o mouse
  var down=false, startX=0, startScroll=0, moved=0;
  el.addEventListener('mousedown', function(e){
    down=true; moved=0; startX=e.pageX; startScroll=el.scrollLeft;
  });
  window.addEventListener('mouseup', function(){
    if(down){ down=false; el.classList.remove('is-dragging'); }
  });
  el.addEventListener('mousemove', function(e){
    if(!down) return;
    var dx = e.pageX - startX;
    if(Math.abs(dx) > 4){ moved=1; el.classList.add('is-dragging'); }
    el.scrollLeft = startScroll - dx;
  });
  // não navegar se foi arraste
  el.addEventListener('click', function(e){
    if(moved){ e.preventDefault(); e.stopPropagation(); moved=0; }
  }, true);
})();
`;

export function Web3V2Resources() {
  // Papers/playbooks visíveis (guia primeiro), capas-medalhão reais.
  const shownPapers = papers.filter((p) => !p.hidden);
  const guia = shownPapers.find((p) => p.slug === GUIA_SLUG);
  const orderedPapers = guia
    ? [guia, ...shownPapers.filter((p) => p.slug !== GUIA_SLUG)]
    : shownPapers;

  // Posts do blog em destaque (depois completa com os mais recentes publicados).
  const published = getPublishedPostCards();
  const featured = FEATURED_SLUGS.map((s) => published.find((p) => p.slug === s)).filter(
    Boolean
  ) as typeof published;
  const rest = published.filter((p) => !FEATURED_SLUGS.includes(p.slug));
  const orderedPosts = [...featured, ...rest];

  // estilos de capa do blog (determinístico, sem 2 adjacentes iguais, respeita override)
  const coverStyles = coverStylesForList(
    orderedPosts.map((p) => ({ slug: p.slug, category: p.category, coverStyle: p.coverStyle }))
  );

  // Intercala: paper, blog, paper, blog… até esgotar a menor lista, depois o resto.
  type Slide =
    | { kind: "paper"; paper: Paper }
    | { kind: "blog"; post: (typeof orderedPosts)[number]; coverStyle: (typeof coverStyles)[number]; blogIndex: number };
  const slides: Slide[] = [];
  const maxLen = Math.max(orderedPapers.length, orderedPosts.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < orderedPapers.length) slides.push({ kind: "paper", paper: orderedPapers[i] });
    if (i < orderedPosts.length)
      slides.push({ kind: "blog", post: orderedPosts[i], coverStyle: coverStyles[i], blogIndex: i });
  }

  const rots = [-1.2, 1.2, -0.8, 1, -1, 0.8, -1.4, 0.6];

  return (
    <section style={{ background: "#F4F1EC", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="w3-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 28px 90px" }}>
        <div style={{ borderTop: `2px solid ${INK}1f`, paddingTop: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "Gridlite, monospace", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: "#3d9e32", marginBottom: 14 }}>
                Biblioteca aberta
              </div>
              <h2 style={{ fontFamily: "Atelier, sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.2vw,54px)", lineHeight: 1, letterSpacing: "-1.5px", margin: 0, color: INK }}>
                O que a gente sabe, no aberto.
              </h2>
              <p style={{ marginTop: 14, maxWidth: 480, fontSize: 16, lineHeight: 1.55, color: "#6b6258" }}>
                Papers de mercado, teardowns de cases e guias de marketing cripto. Sem paywall, prontos pra aplicar.
              </p>
              <div style={{ marginTop: 18 }}>
                <Web3V2PlaybookCta />
              </div>
            </div>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <Link href="/papers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: "#3d9e32", textDecoration: "none" }}>
                Papers →
              </Link>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: "#b14e96", textDecoration: "none" }}>
                Blog →
              </Link>
            </div>
          </div>

          {/* Carrossel único, papers + blogs alternados (drag mouse + touch + wheel + snap) */}
          <div className="w3-carousel" style={{ marginTop: 44 }} aria-label="Papers e posts do blog">
            {slides.map((slide, i) =>
              slide.kind === "paper" ? (
                <div className="w3-cslide" key={`paper-${slide.paper.slug}`}>
                  <PlaybookCard paper={slide.paper} framing={framingFor(slide.paper)} />
                </div>
              ) : (
                <div className="w3-cslide" key={`blog-${slide.post.slug}`}>
                  <BlogCard
                    post={slide.post}
                    index={slide.blogIndex}
                    coverStyle={slide.coverStyle}
                    rot={rots[i % rots.length]}
                  />
                </div>
              )
            )}
          </div>
          <script dangerouslySetInnerHTML={{ __html: CAROUSEL_SCRIPT }} />
        </div>
      </div>
    </section>
  );
}
