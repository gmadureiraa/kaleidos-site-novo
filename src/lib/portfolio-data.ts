// portfolio-data.ts — Agregador do /portfolio (vitrine de PEÇAS individuais).
//
// NÃO duplica conteúdo: DERIVA itens das fontes existentes (cases + papers + blog).
// Cada peça (um reel, um carrossel, um paper, uma landing) vira um PortfolioItem,
// herdando cliente, nicho e métrica do case de origem.
//
// Organização no modelo da biblioteca.kaleidos.com.br: primário por FORMATO,
// secundário por cliente/nicho, aspect-ratio nativo por formato.
//
// IMPORTANTE: NUNCA cortar a peça. O aspect declarado aqui é só uma DICA inicial
// (placeholder antes da imagem carregar). O card descobre o aspect NATIVO da mídia
// em runtime (onLoad) e o respeita — nada de object-cover que corta.

import { getAllCases, ROUTED_CASE_IDS, type CaseData } from "./case-data";

export type PortfolioFormat =
  | "reel"
  | "video" // vídeo longo (16:9, YouTube/manifesto/podcast)
  | "youtube" // vídeo longo embed YouTube
  | "carousel"
  | "paper"
  | "playbook"
  | "newsletter"
  | "landing"
  | "static" // imagem única de post (estático)
  | "creative" // peça de anúncio / criativo de tráfego
  | "blog";

export type PortfolioAspect = "9/16" | "4/5" | "16/9" | "3/4" | "1/1";

// Shape de mídia estendido — o case-data.ts ganha `type: "youtube"` + videoId via
// OUTRO agente. Aqui lemos defensivamente sem depender da atualização do tipo.
type MediaLike = Omit<CaseData["media"][number], "type"> & {
  type: "image" | "video" | "pdf" | "youtube";
  videoId?: string;
};

export interface PortfolioItem {
  id: string; // estável: `${source}:${clientId}:${idx}`
  client: string; // nome do cliente
  clientId: string; // id do case (ou "kaleidos" pros papers)
  format: PortfolioFormat;
  niche: string[]; // derivado das tags do case
  title: string; // título/legenda da peça
  thumb: string; // poster | imagem | capa do paper
  aspect: PortfolioAspect; // dica de aspect inicial (o card mede o nativo em runtime)
  metric?: string; // "20M+ views" etc
  href: string; // /cases/<id> | /papers/<slug> | externalLink
  mediaType: "image" | "video" | "pdf" | "youtube";
  src?: string; // mídia pra preview no modal (vídeo) / fallback = thumb
  slides?: string[]; // pra carrossel: lista de imagens navegáveis
  videoId?: string; // pra youtube: id do vídeo (embed no modal)
  /**
   * Link externo da PUBLICAÇÃO real (news/LinkedIn/landing/Instagram). Quando
   * presente, o card abre direto essa URL em nova aba — em vez (ou além) do modal.
   * Vem do `media[].link` do case.
   */
  externalUrl?: string;
  featured?: boolean;
}

// ── Grupos de formato (opções dos dropdowns). Cada um agrega formatos relacionados. ──
export interface FormatGroup {
  id: string;
  labelPt: string;
  labelEn: string;
  icon: string;
  formats: PortfolioFormat[];
}

export const FORMAT_GROUPS: FormatGroup[] = [
  { id: "all", labelPt: "Tudo", labelEn: "All", icon: "✦", formats: [] },
  { id: "static", labelPt: "Estáticos", labelEn: "Statics", icon: "▢", formats: ["static"] },
  { id: "creative", labelPt: "Criativos", labelEn: "Creatives", icon: "◈", formats: ["creative"] },
  { id: "carousel", labelPt: "Carrossel", labelEn: "Carousel", icon: "🎠", formats: ["carousel"] },
  { id: "reel", labelPt: "Reels", labelEn: "Reels", icon: "▶", formats: ["reel"] },
  { id: "video", labelPt: "Vídeos longos", labelEn: "Long videos", icon: "🎬", formats: ["video", "youtube"] },
  { id: "newsletter", labelPt: "Newsletter", labelEn: "Newsletter", icon: "✉", formats: ["newsletter"] },
  { id: "landing", labelPt: "Landing pages & Sites", labelEn: "Landing pages & Sites", icon: "🖥", formats: ["landing"] },
  { id: "paper", labelPt: "Papers & Playbooks", labelEn: "Papers & Playbooks", icon: "📄", formats: ["paper", "playbook"] },
  { id: "blog", labelPt: "Blog", labelEn: "Blog", icon: "✍", formats: ["blog"] },
];

const ASPECT_BY_FORMAT: Record<PortfolioFormat, PortfolioAspect> = {
  reel: "9/16",
  video: "16/9",
  youtube: "16/9",
  carousel: "4/5",
  paper: "3/4",
  playbook: "3/4",
  newsletter: "4/5",
  landing: "16/9",
  static: "1/1",
  creative: "1/1",
  blog: "16/9",
};

// ── Nicho derivado das tags do case ──
function nicheFromTags(tags: string[]): string[] {
  const t = tags.map((x) => x.toLowerCase());
  const out = new Set<string>();
  if (t.some((x) => x.includes("cripto") || x.includes("web3") || x.includes("bitcoin"))) out.add("Cripto & Web3");
  if (t.some((x) => x.includes("fintech"))) out.add("Fintech");
  if (t.some((x) => x.includes("educa"))) out.add("Educação");
  if (t.some((x) => x.includes("influencer"))) out.add("Influencer");
  if (t.some((x) => x.includes("saas") || x.includes("edtech") || x.includes("dashboard"))) out.add("SaaS & Produto");
  if (t.some((x) => x.includes("evento"))) out.add("Evento");
  if (out.size === 0) out.add("Conteúdo");
  return Array.from(out);
}

export const NICHES = [
  "Cripto & Web3",
  "Fintech",
  "Educação",
  "Influencer",
  "SaaS & Produto",
  "Evento",
  "Conteúdo",
] as const;

// Headline de métrica (primeira linha de metricas, sem markdown)
function headlineMetric(raw?: string): string | undefined {
  if (!raw) return undefined;
  const first = raw.split("\n").find((l) => l.trim().length > 0);
  if (!first) return undefined;
  const clean = first
    .replace(/\*\*/g, "")
    .replace(/[*_`]/g, "")
    .replace(/^[•\-–—\s]+/, "")
    .replace(/:\s*$/, "")
    .trim();
  if (!clean) return undefined;
  return clean.length > 60 ? clean.slice(0, 57) + "…" : clean;
}

// Cases que vivem em /Cases/tech-portfolio (screenshots de landings/sites/SaaS)
const isLandingCase = (c: CaseData) =>
  c.tags.some((t) => t.toLowerCase().includes("desenvolvimento web") || t.toLowerCase() === "saas");

// Newsletter/e-mail é classificado pela PEÇA (alt/src), não pela tag ampla do case —
// "Newsletter" costuma ser um serviço, não o formato da imagem.
const looksLikeNewsletter = (src: string, alt?: string) => {
  const hay = `${src} ${alt ?? ""}`.toLowerCase();
  return /newsletter|e-?mail|email|news|inbox|minicurso|mini-curso|dia\d|dia-\d/.test(hay);
};
// Página de captura / landing avulsa dentro de um case de conteúdo
const looksLikeCapturePage = (src: string, alt?: string) => {
  const hay = `${src} ${alt ?? ""}`.toLowerCase();
  return /captura|landing|pagina-de-captura|paginacaptura|capture/.test(hay);
};

// Peça de ANÚNCIO / criativo de tráfego pago (display ad, banner, performance).
// Distinguível por origem (case de ads/banner) ou pela própria peça.
const isAdCase = (c: CaseData) =>
  c.tags.some((t) => /\bads?\b|banner|display|tráfego|trafego|performance|black friday/i.test(t)) ||
  /banner|display ads|criativos? para display|tráfego pago|trafego pago/i.test(
    `${c.descricao ?? ""} ${c.servicos?.join(" ") ?? ""}`
  );
const looksLikeAdPiece = (src: string, alt?: string) => {
  const hay = `${src} ${alt ?? ""}`.toLowerCase();
  return /\bad\b|\bads\b|banner|display|leaderboard|skyscraper|criativo|creative|anuncio|anúncio|black-?friday/.test(hay);
};

// Detecta peças de carrossel: alt com "slide" / "carrossel", ou case tagueado carrossel.
function looksLikeCarouselSlide(alt?: string): boolean {
  if (!alt) return false;
  return /slide|carrossel|carousel/i.test(alt);
}

// Resolve href de um case: rota completa se publicado, senão link externo, senão /cases
function caseHref(c: CaseData): string {
  if (ROUTED_CASE_IDS.includes(c.id)) return `/cases/${c.id}`;
  if (c.externalLink) return c.externalLink;
  return "/cases";
}

const FEATURED_CLIENT_IDS = new Set(["investidor-4-20", "defiverso", "bit-das-minas", "neobankless", "layla-foz"]);

// ── Ordem de IMPORTÂNCIA dos clientes (mesma régua das logos do /2) ──────────
// Heavy-hitters primeiro, influencers INTERCALADOS (não agrupados no fim).
// Reusada no dropdown de Cliente (/portfolio) e na grade (/cases).
// Match robusto via normalização (case-insensitive, sem acento) por id OU nome —
// cobre variações como "Investidor 4.20"/"investidor-4-20", "DSEC"/"DSEC Labs".
export const CLIENT_PRIORITY: string[] = [
  "crypto-com", // Crypto.com
  "mercado-bitcoin", // Mercado Bitcoin
  "ledger", // Ledger
  "paradigma-education", // Paradigma
  "investidor-4-20", // Investidor 4.20
  "defiverso", // Defiverso
  "bit-das-minas", // Bit das Minas
  "neobankless", // Neobankless
  "layla-foz", // Layla Foz
  "dsec", // DSEC (institucional)
  "gui-campos", // Gui Campos (marca pessoal — sócio DSEC)
  "leo-maximiliano", // Léo Maximiliano (marca pessoal — CEO DSEC)
  "matheus-fassheber", // Matheus Fassheber (founder brand — Neobankless)
  "jornal-cripto", // Jornal Cripto
  "alfred", // Alfred (DSEC Labs)
  "orlando", // Orlando
  "hugo-doria", // Hugo Dória
  "kaleidos", // Kaleidos (a própria agência)
];

// Normaliza um id/nome de cliente: minúsculo, sem acento, alfanumérico → hífen.
function normalizeClientKey(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Aliases pra casar nomes "humanos" com a chave canônica de CLIENT_PRIORITY.
const CLIENT_ALIASES: Record<string, string> = {
  "crypto-com": "crypto-com",
  "crypto.com": "crypto-com",
  "mercado-bitcoin": "mercado-bitcoin",
  ledger: "ledger",
  paradigma: "paradigma-education",
  "paradigma-education": "paradigma-education",
  "investidor-4-20": "investidor-4-20",
  "investidor-4.20": "investidor-4-20",
  defiverso: "defiverso",
  "bit-das-minas": "bit-das-minas",
  neobankless: "neobankless",
  nbs: "neobankless",
  "layla-foz": "layla-foz",
  layla: "layla-foz",
  dsec: "dsec",
  "dsec-labs": "dsec",
  "jornal-cripto": "jornal-cripto",
  "gui-campos": "gui-campos",
  "gui-campos-dsec": "gui-campos",
  "leo-maximiliano": "leo-maximiliano",
  "leo-maximiliano-dsec": "leo-maximiliano",
  "matheus-fassheber": "matheus-fassheber",
  "matheus-fassheber-neobankless": "matheus-fassheber",
  alfred: "alfred",
  orlando: "orlando",
  "hugo-doria": "hugo-doria",
  hugo: "hugo-doria",
  kaleidos: "kaleidos",
};

const PRIORITY_INDEX = new Map<string, number>(CLIENT_PRIORITY.map((k, i) => [k, i]));

/**
 * Posição de prioridade de um cliente (id e/ou nome). Casa por chave normalizada
 * via aliases; não listados retornam Number.MAX_SAFE_INTEGER (vão pro fim).
 */
export function clientPriorityRank(id?: string, name?: string): number {
  for (const cand of [id, name]) {
    if (!cand) continue;
    const key = normalizeClientKey(cand);
    const canonical = CLIENT_ALIASES[key] ?? key;
    const rank = PRIORITY_INDEX.get(canonical);
    if (rank !== undefined) return rank;
  }
  return Number.MAX_SAFE_INTEGER;
}

// Cases EXCLUÍDOS do /portfolio: produtos internos da Kaleidos (não são trabalho de
// cliente) + Defifest (faz parte do Defiverso — sua mídia foi movida pra lá, então
// não aparece como cliente/aba próprio aqui). Todos continuam existindo em /cases e
// no resto do site — só não entram no agregador do portfólio.
// (nbs = Vision Education Foundation; neobankless, a fintech cripto, NÃO entra aqui.)
const EXCLUDED_CASE_IDS = new Set(["kaleidos-pay", "kai-platform", "depay", "nbs", "defifest"]);

function buildFromCases(): PortfolioItem[] {
  const items: PortfolioItem[] = [];

  for (const c of getAllCases()) {
    if (EXCLUDED_CASE_IDS.has(c.id)) continue;
    const niche = nicheFromTags(c.tags);
    const metric = headlineMetric(c.metricas);
    const href = caseHref(c);
    const landingCase = isLandingCase(c);
    const adCase = isAdCase(c);

    // Vídeos longos do YouTube vivem num campo separado (`youtubeVideos`), fora de
    // `media[]`. Iteramos aqui pra que a aba "Vídeos longos" não fique vazia.
    if (c.youtubeVideos && c.youtubeVideos.length) {
      c.youtubeVideos.forEach((v, yi) => {
        items.push({
          id: `case:${c.id}:yt:${yi}`,
          client: c.nome,
          clientId: c.id,
          format: "youtube",
          niche,
          title: v.title || v.alt || c.fraseImpactante,
          thumb: v.poster || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
          aspect: ASPECT_BY_FORMAT.youtube,
          metric,
          href,
          mediaType: "youtube",
          src: v.src,
          videoId: v.videoId,
          featured: FEATURED_CLIENT_IDS.has(c.id),
        });
      });
    }

    if (!c.media || c.media.length === 0) continue;

    let i = 0;
    const media = c.media as MediaLike[];
    while (i < media.length) {
      const m = media[i];

      // YOUTUBE / vídeo longo embed → "youtube" (16:9)
      if (m.type === "youtube") {
        items.push({
          id: `case:${c.id}:${i}`,
          client: c.nome,
          clientId: c.id,
          format: "youtube",
          niche,
          title: m.alt || c.fraseImpactante,
          thumb: m.poster || (m.videoId ? `https://i.ytimg.com/vi/${m.videoId}/hqdefault.jpg` : m.src),
          aspect: ASPECT_BY_FORMAT.youtube,
          metric,
          href,
          mediaType: "youtube",
          src: m.src,
          videoId: m.videoId,
          featured: FEATURED_CLIENT_IDS.has(c.id),
        });
        i++;
        continue;
      }

      // VÍDEO local (.mp4) → SEMPRE Reel (9:16). Vídeo longo (16:9) é só o embed
      // de YouTube, tratado no branch `m.type === "youtube"` acima.
      if (m.type === "video") {
        items.push({
          id: `case:${c.id}:${i}`,
          client: c.nome,
          clientId: c.id,
          format: "reel",
          niche,
          title: m.alt || c.fraseImpactante,
          thumb: m.poster || m.src,
          aspect: ASPECT_BY_FORMAT.reel,
          metric,
          href,
          mediaType: "video",
          src: m.src,
          featured: FEATURED_CLIENT_IDS.has(c.id),
        });
        i++;
        continue;
      }

      // PDF → paper
      if (m.type === "pdf") {
        items.push({
          id: `case:${c.id}:${i}`,
          client: c.nome,
          clientId: c.id,
          format: "paper",
          niche,
          title: m.alt || c.fraseImpactante,
          thumb: m.poster || m.src,
          aspect: ASPECT_BY_FORMAT.paper,
          metric,
          href,
          mediaType: "pdf",
          src: m.src,
        });
        i++;
        continue;
      }

      // IMAGEM — carrossel: sequência de slides do mesmo post.
      if (looksLikeCarouselSlide(m.alt)) {
        const slides: string[] = [m.src];
        const start = i;
        i++;
        while (
          i < media.length &&
          media[i].type === "image" &&
          looksLikeCarouselSlide(media[i].alt) &&
          !media[i].link // novo carrossel começa com um link (capa)
        ) {
          slides.push(media[i].src);
          i++;
        }
        const title =
          (m.alt || "")
            .replace(/\s*\(capa\)\s*$/i, "")
            .replace(/\s*\(\d+\/\d+\)\s*$/i, "")
            .trim() || c.fraseImpactante;
        items.push({
          id: `case:${c.id}:carousel:${start}`,
          client: c.nome,
          clientId: c.id,
          format: "carousel",
          niche,
          title,
          thumb: m.src,
          aspect: ASPECT_BY_FORMAT.carousel,
          metric,
          href: m.link || href,
          mediaType: "image",
          src: m.src,
          slides,
          featured: FEATURED_CLIENT_IDS.has(c.id),
        });
        continue;
      }

      // Imagem avulsa → classificada pela PEÇA: landing / newsletter / criativo / estático.
      let format: PortfolioFormat = "static";
      if (landingCase || looksLikeCapturePage(m.src, m.alt)) {
        format = "landing";
      } else if (looksLikeNewsletter(m.src, m.alt)) {
        format = "newsletter";
      } else if (adCase || looksLikeAdPiece(m.src, m.alt)) {
        // Peça claramente de anúncio/criativo de tráfego → "Criativos".
        format = "creative";
      } else {
        // Senão, imagem única de post = "Estáticos".
        format = "static";
      }
      const aspect: PortfolioAspect = ASPECT_BY_FORMAT[format];
      items.push({
        id: `case:${c.id}:${i}`,
        client: c.nome,
        clientId: c.id,
        format,
        niche,
        title: m.alt || c.fraseImpactante,
        thumb: m.src,
        aspect,
        metric,
        href: m.link || href,
        mediaType: "image",
        src: m.src,
        // Item com link de publicação real (news / LinkedIn / landing / post avulso):
        // o card abre direto a URL externa, em vez do modal de preview.
        externalUrl: m.link && /^https?:\/\//.test(m.link) ? m.link : undefined,
      });
      i++;
    }
  }

  return items;
}

/**
 * Agrega todas as peças do portfólio.
 * @param includeBlog inclui os estudos do blog como itens (default false — sem capas dedicadas).
 */
export function getPortfolioItems(opts: { includeBlog?: boolean } = {}): PortfolioItem[] {
  // Papers/Playbooks (fonte de autoridade própria da Kaleidos) NÃO entram no /portfolio.
  const items = [...buildFromCases()];
  // (blog opcional — sem coverImage hoje, fica fora da v1)
  void opts.includeBlog;
  return items;
}

/**
 * Lista de clientes (com contagem) presentes no portfólio, ordenada por
 * IMPORTÂNCIA (CLIENT_PRIORITY). Clientes não listados vão pro fim, ordenados
 * por nº de peças (desc) e depois alfabeticamente.
 */
export function getPortfolioClients(items: PortfolioItem[]): { id: string; name: string; count: number }[] {
  const map = new Map<string, { id: string; name: string; count: number }>();
  for (const it of items) {
    const cur = map.get(it.clientId);
    if (cur) cur.count++;
    else map.set(it.clientId, { id: it.clientId, name: it.client, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => {
    const ra = clientPriorityRank(a.id, a.name);
    const rb = clientPriorityRank(b.id, b.name);
    if (ra !== rb) return ra - rb; // prioridade primeiro
    if (b.count !== a.count) return b.count - a.count; // depois nº de peças
    return a.name.localeCompare(b.name, "pt-BR"); // empate → alfabético
  });
}

/** Contagem por grupo de formato (pra badges nas abas / opções do dropdown). */
export function getFormatCounts(items: PortfolioItem[]): Record<string, number> {
  const counts: Record<string, number> = { all: items.length };
  for (const g of FORMAT_GROUPS) {
    if (g.id === "all") continue;
    counts[g.id] = items.filter((it) => g.formats.includes(it.format)).length;
  }
  return counts;
}
