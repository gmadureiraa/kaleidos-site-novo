// Modelo de preços Kaleidos 2026 — fonte de verdade estruturada.
// Derivado da "TABELA DE PREÇOS KALEIDOS 2026" (planilha interna). NÃO contém
// dados sensíveis (fluxo de caixa, âncoras de cliente ficam fora). Usado pelo
// calculador de orçamento e pela página de Pacotes.
//
// Fórmula canônica (aba "Como Montar Orçamento"):
//   Mensal = Σ(nº de peças × preço EM VOLUME) + camada(s) de gestão + add-ons
//   → aplicar desconto de bundle (~10–15%) SE respeitar os pisos mínimos.

export type Unit = {
  id: string;
  label: string;
  avulso: number; // peça solta/spot
  volume: number; // dentro de pacote recorrente (desconto ~20–50%)
  unidade: string;
  oneOff?: boolean; // projeto pontual (não entra em mensalidade)
  note?: string;
};

// Aba 1 — Preço por unidade
export const UNITS: Unit[] = [
  { id: "post-estatico", label: "Post estático (feed)", avulso: 150, volume: 90, unidade: "post" },
  { id: "carrossel-tweet", label: "Carrossel template Twitter (sem design)", avulso: 150, volume: 120, unidade: "carrossel" },
  { id: "carrossel-design", label: "Carrossel com design", avulso: 200, volume: 150, unidade: "carrossel" },
  { id: "reel-meme", label: "Reel meme (sem edição)", avulso: 100, volume: 60, unidade: "reel" },
  { id: "reel-edicao", label: "Reel — só edição", avulso: 200, volume: 120, unidade: "reel" },
  { id: "reel-roteiro-edicao", label: "Reel — roteiro + edição", avulso: 240, volume: 150, unidade: "reel" },
  { id: "stories", label: "Sequência de stories (3–5)", avulso: 200, volume: 120, unidade: "sequência" },
  { id: "newsletter-simples", label: "Newsletter simples", avulso: 350, volume: 275, unidade: "edição" },
  { id: "newsletter-densa", label: "Newsletter densa (deep dive)", avulso: 600, volume: 450, unidade: "edição" },
  { id: "thread-x", label: "Thread no X", avulso: 250, volume: 150, unidade: "thread" },
  { id: "tweet", label: "Post avulso no X (tweet)", avulso: 80, volume: 40, unidade: "tweet" },
  { id: "post-linkedin", label: "Post LinkedIn (texto)", avulso: 200, volume: 120, unidade: "post" },
  { id: "carrossel-linkedin", label: "Carrossel LinkedIn (PDF)", avulso: 350, volume: 220, unidade: "carrossel" },
  { id: "criativo-ads", label: "Design de criativo de ads", avulso: 200, volume: 120, unidade: "criativo" },
  { id: "video-institucional", label: "Vídeo institucional", avulso: 2500, volume: 1800, unidade: "vídeo", oneOff: true },
  { id: "landing-page", label: "Landing page", avulso: 4500, volume: 3500, unidade: "página", oneOff: true },
];

export type Layer = {
  id: string;
  label: string;
  price: number; // R$/mês
  includes: string;
  passthrough?: boolean; // repasse, não é receita
};

// Aba 2 — Camadas de serviço (mensais), somadas à produção
export const LAYERS: Layer[] = [
  { id: "gestao-leve", label: "Gestão & relatórios (conta leve)", price: 1500, includes: "Planejamento, calendário, aprovação, 1 relatório/mês" },
  { id: "gestao-completa", label: "Gestão & estratégia (conta completa)", price: 2500, includes: "Estratégia editorial, gestão, relatórios detalhados, reunião mensal" },
  { id: "community", label: "Community management", price: 1500, includes: "DMs/comentários, moderação, relacionamento" },
  { id: "reply-guy", label: "Reply guy (engajamento ativo)", price: 2500, includes: "Respostas proativas em timeline, comentários em contas-alvo" },
  { id: "viralizacao", label: "Caça à viralização", price: 2000, includes: "Monitor de tendências, surf de pauta, produção reativa" },
  { id: "estratega-senior", label: "Estratega sênior", price: 3000, includes: "Direção estratégica dedicada, narrativa, growth" },
  { id: "fee-trafego", label: "Fee de gestão de tráfego", price: 1500, includes: "Fee fixo OU 15–20% da verba de mídia (verba é pass-through)" },
];

export type Bundle = {
  id: string;
  label: string;
  price: number; // R$/mês (âncora)
  scope: string;
  layers: string;
  tier: "entrada" | "essencial" | "founder" | "empresa" | "completo" | "enterprise";
  /** Composição: peças mensais que compõem o pacote (unitId + qty). Usado pra prefixar a calculadora. */
  pieces?: { unitId: string; qty: number }[];
  /** Camadas de serviço inclusas no pacote (ids de LAYERS). */
  layerIds?: string[];
};

// Aba 3 — Pacotes padrão (bundles nomeados). `pieces`/`layerIds` = composição real
// (soma ~= price), pra clicar no pacote preencher a calculadora com peças + camadas.
export const BUNDLES: Bundle[] = [
  { id: "newsletter", label: "Newsletter", price: 1100, scope: "4 newsletters simples/mês (semanal). +R$700/mês p/ versão densa.", layers: "Edição + envio (gestão leve embutida)", tier: "entrada",
    pieces: [{ unitId: "newsletter-simples", qty: 4 }], layerIds: [] },
  { id: "social-essencial", label: "Social Essencial — só conteúdo", price: 1500, scope: "16 posts/mês (1–2 perfis), mix estático/carrossel. Sem gestão.", layers: "Nenhuma (cliente aprova/publica)", tier: "essencial",
    pieces: [{ unitId: "post-estatico", qty: 10 }, { unitId: "carrossel-design", qty: 4 }], layerIds: [] },
  { id: "social-essencial-gerenciado", label: "Social Essencial — gerenciado", price: 3500, scope: "16 posts/mês (até 2 perfis) + stories + relatórios", layers: "Gestão & relatórios (leve)", tier: "essencial",
    pieces: [{ unitId: "post-estatico", qty: 10 }, { unitId: "carrossel-design", qty: 4 }, { unitId: "stories", qty: 4 }], layerIds: ["gestao-leve"] },
  { id: "personal-founder-essencial", label: "Personal Founder — Essencial", price: 3000, scope: "1 perfil: 4 reels + 4 carrosséis/mês (roteiro + edição + design + postagem). Sem stories/DM/comentários.", layers: "Gestão leve + relatório", tier: "founder",
    pieces: [{ unitId: "reel-edicao", qty: 4 }, { unitId: "carrossel-design", qty: 4 }], layerIds: ["gestao-leve"] },
  { id: "personal-founder-completo", label: "Personal Founder — Completo", price: 4900, scope: "1 perfil: 8 reels + 8 carrosséis + 1 podcast/mês. Engajamento e multicanal via adicional.", layers: "Gestão & estratégia", tier: "founder",
    pieces: [{ unitId: "reel-edicao", qty: 8 }, { unitId: "carrossel-design", qty: 8 }], layerIds: ["gestao-completa"] },
  { id: "personal-founder-duo", label: "Personal Founder Duo", price: 5400, scope: "2 perfis, 16 posts/mês + stories + relatórios. Piso reajustado (2×R$3.000 − bundle); DSEC hoje R$3.500 grandfathered até renovação.", layers: "Gestão & estratégia completa", tier: "founder",
    pieces: [{ unitId: "post-estatico", qty: 6 }, { unitId: "carrossel-design", qty: 3 }], layerIds: ["gestao-completa"] },
  { id: "conta-empresa", label: "Conta Empresa Multicanal", price: 4500, scope: "LinkedIn + Twitter + e-mail (multicanal, ~30 peças/mês)", layers: "Gestão & estratégia completa", tier: "empresa",
    pieces: [{ unitId: "post-linkedin", qty: 8 }, { unitId: "tweet", qty: 15 }, { unitId: "thread-x", qty: 2 }], layerIds: ["gestao-completa"] },
  { id: "social-completo", label: "Social Completo", price: 6000, scope: "Instagram completo: ~24–26 posts/mês + stories diários", layers: "Gestão & estratégia completa + community", tier: "completo",
    pieces: [{ unitId: "carrossel-design", qty: 9 }, { unitId: "reel-meme", qty: 9 }, { unitId: "post-estatico", qty: 8 }, { unitId: "stories", qty: 8 }], layerIds: ["gestao-completa"] },
  { id: "social-pitch", label: "Social (time dedicado)", price: 12000, scope: "Conteúdo diário multi-perfil. Time completo. Sem reply guy.", layers: "Gestão completa + community + design dedicado", tier: "enterprise",
    pieces: [{ unitId: "carrossel-design", qty: 20 }, { unitId: "reel-edicao", qty: 15 }, { unitId: "post-estatico", qty: 15 }, { unitId: "stories", qty: 20 }], layerIds: ["gestao-completa", "community"] },
  { id: "full-social", label: "Full Social", price: 18000, scope: "Tudo do Social + engajamento ativo + produção reativa", layers: "Tudo incluso", tier: "enterprise",
    pieces: [{ unitId: "carrossel-design", qty: 26 }, { unitId: "reel-edicao", qty: 20 }, { unitId: "post-estatico", qty: 20 }, { unitId: "stories", qty: 26 }, { unitId: "tweet", qty: 30 }], layerIds: ["gestao-completa", "community", "reply-guy"] },
];

export type AddOn = {
  id: string;
  label: string;
  priceMin: number;
  priceMax?: number;
  type: "projeto" | "recorrente";
  note?: string;
};

// Aba 4 — Adicionais / add-ons
export const ADDONS: AddOn[] = [
  { id: "campanha-lancamento", label: "Campanha de lançamento", priceMin: 3000, priceMax: 8000, type: "projeto", note: "Conceito + cronograma + peças extras + coordenação" },
  { id: "video-motion", label: "Vídeo / motion design", priceMin: 1800, priceMax: 2500, type: "projeto", note: "Institucional ou motion para social/ads" },
  { id: "landing-funil", label: "Landing page + funil", priceMin: 4500, priceMax: 8000, type: "projeto", note: "LP + integração + automação de e-mail" },
  { id: "influencers", label: "Ativação de influencers", priceMin: 2000, type: "projeto", note: "Curadoria + ponte + gestão (cachê à parte)" },
  { id: "perfil-extra", label: "Perfil/canal extra", priceMin: 1500, type: "recorrente" },
  { id: "newsletter-addon", label: "Newsletter add-on", priceMin: 900, type: "recorrente", note: "Acopla newsletter a um pacote social" },
  { id: "stories-extra", label: "Pacote de stories extra", priceMin: 600, type: "recorrente" },
  { id: "dashboard-premium", label: "Relatório/dashboard premium", priceMin: 800, type: "recorrente", note: "BI detalhado + reunião de performance" },
  { id: "engajamento-founder", label: "+ Engajamento (Personal Founder)", priceMin: 1500, type: "recorrente", note: "Stories + comentários + triagem de DM. Encaixa em Essencial ou Completo (nenhum plano base inclui engajamento)" },
  { id: "multicanal-founder", label: "+ Multicanal X & LinkedIn", priceMin: 1500, type: "recorrente", note: "Repurpose do conteúdo do founder em X (thread) e LinkedIn (post/carrossel)" },
];

// Regras (aba "Como Montar Orçamento")
export const PRICING_RULES = {
  pisos: {
    newsletter: 1100,
    socialSoConteudo: 1500,
    contaGerenciada: 3000,
    personalFounder: 3000,
  },
  minContractMonths: 6, // política jul/2026: contrato mínimo SEMPRE 6 meses
  bundleDiscountRange: [0.1, 0.15] as const, // 10–15% se virar pacote fechado
  margem: {
    markupMin: 2, // preço = custo × 2
    custoAlvoMax: 0.5, // custo ≤ 50% do preço
    redFlagBelow: 0.4, // margem < 40% = revisar
  },
};

// --- Motor de cálculo do orçamento ---
export type QuoteInput = {
  pieces: { unitId: string; qty: number }[];
  layerIds: string[];
  addonIds: string[];
  bundleDiscount?: number; // 0–0.15
};

export type QuoteResult = {
  contentMonthly: number;
  layersMonthly: number;
  addonsRecurring: number;
  addonsOneOff: number;
  oneOff: number; // peças one-off (vídeo/LP)
  subtotalMonthly: number;
  discountApplied: number;
  totalMonthly: number;
  pisoFloor: number;
  belowPiso: boolean;
  breakdown: { label: string; qty: number; unit: number; total: number }[];
};

export function buildQuote(input: QuoteInput): QuoteResult {
  const unitMap = new Map(UNITS.map((u) => [u.id, u]));
  const layerMap = new Map(LAYERS.map((l) => [l.id, l]));
  const addonMap = new Map(ADDONS.map((a) => [a.id, a]));

  const breakdown: QuoteResult["breakdown"] = [];
  let contentMonthly = 0;
  let oneOff = 0;

  for (const p of input.pieces) {
    const u = unitMap.get(p.unitId);
    if (!u || p.qty <= 0) continue;
    const total = u.volume * p.qty;
    breakdown.push({ label: u.label, qty: p.qty, unit: u.volume, total });
    if (u.oneOff) oneOff += total;
    else contentMonthly += total;
  }

  const layersMonthly = input.layerIds.reduce((s, id) => s + (layerMap.get(id)?.price ?? 0), 0);

  let addonsRecurring = 0;
  let addonsOneOff = 0;
  for (const id of input.addonIds) {
    const a = addonMap.get(id);
    if (!a) continue;
    if (a.type === "recorrente") addonsRecurring += a.priceMin;
    else addonsOneOff += a.priceMin;
  }

  const subtotalMonthly = contentMonthly + layersMonthly + addonsRecurring;
  const discount = Math.min(Math.max(input.bundleDiscount ?? 0, 0), 0.15);
  const discountApplied = Math.round(subtotalMonthly * discount);

  // Piso: qualquer conta gerenciada tem piso R$3.000; só-conteúdo R$1.500.
  const managed = input.layerIds.length > 0;
  const pisoFloor = managed
    ? PRICING_RULES.pisos.contaGerenciada
    : PRICING_RULES.pisos.socialSoConteudo;

  const afterDiscount = subtotalMonthly - discountApplied;
  const totalMonthly = Math.max(afterDiscount, pisoFloor);

  return {
    contentMonthly,
    layersMonthly,
    addonsRecurring,
    addonsOneOff,
    oneOff,
    subtotalMonthly,
    discountApplied,
    totalMonthly,
    pisoFloor,
    belowPiso: afterDiscount < pisoFloor,
    breakdown,
  };
}
