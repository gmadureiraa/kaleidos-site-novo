// Modelo de preços Kaleidos 2026 — fonte de verdade estruturada.
// Derivado da "TABELA DE PREÇOS KALEIDOS 2026" (planilha interna) + proposta
// Matheus Fassheber (06/08/2026) + decisão Gabriel 08/08/2026. NÃO contém dados
// sensíveis (fluxo de caixa e âncoras de cliente ficam fora). Usado pelo
// calculador de orçamento.
//
// Fórmula canônica (aba "Como Montar Orçamento"):
//   Mensal = Σ(nº de peças × preço EM VOLUME) + camada(s) de gestão + adicionais
//   → aplicar desconto de bundle (~10–15%) SE respeitar os pisos mínimos.
//
// ⚠️ ARMADILHA HISTÓRICA (a razão deste arquivo existir com `status` e `source`):
// circularam TRÊS réguas de preço de marca pessoal ao mesmo tempo, e material
// público saiu conflitante —
//   (a) planilha/pricing.ts antigo ...... 3.000 / 4.900 / Duo 5.400
//   (b) decisão 24/07 (PLANO-EXECUCAO) .. 4.900 / 7.000 / 12.900 + setup à parte
//   (c) proposta Matheus 06/08 .......... 3.600 / 7.000 + adicionais de 1.000
//   (d) decisão Gabriel 08/08 ........... 5.000 / 7.000 / 12.900, SEM adicionais
// A régua PADRÃO hoje é (d). Ela não inventa número novo no topo: o 12.900 do
// Escala é o MESMO 12.900 do "Founder OS" da decisão de 24/07 (b) — em vez de
// criar uma quarta régua, a de 08/08 fecha a divergência reaproveitando o valor
// que já tinha fonte. O 7.000 do Completo também vem intacto de (b)+(c). O que
// mudou de fato: o piso subiu de 3.600 → 5.000 (o Essencial Presença saiu de
// linha) e os adicionais de R$1.000 saíram da oferta (no Escala o engajamento
// virou ESCOPO INCLUSO, não add-on).
// Nada aqui é apagado: o que saiu de linha vira status "legado" (não vender
// mais) ou "grandfathered" (cliente ativo no preço antigo, ex. DSEC). Todo preço
// carrega `source` — se não tem fonte, NÃO entra no arquivo.

export type Unit = {
  id: string;
  label: string;
  avulso: number; // peça solta/spot
  volume: number; // dentro de pacote recorrente (desconto ~20–50%)
  unidade: string;
  oneOff?: boolean; // projeto pontual (não entra em mensalidade)
  note?: string;
};

// Aba 1 — Preço por unidade. Números conferidos contra
// `vault/01 - KALEIDOS/013 - COMERCIAL/Tabela-Precos-Kaleidos-2026.xlsx`.
export const UNITS: Unit[] = [
  { id: "post-estatico", label: "Post estático (feed)", avulso: 150, volume: 90, unidade: "post" },
  { id: "carrossel-tweet", label: "Carrossel template Twitter (sem design)", avulso: 150, volume: 120, unidade: "carrossel" },
  { id: "carrossel-design", label: "Carrossel com design", avulso: 200, volume: 150, unidade: "carrossel" },
  { id: "reel-meme", label: "Reel meme (sem edição)", avulso: 100, volume: 60, unidade: "reel" },
  { id: "reel-edicao", label: "Reel — só edição", avulso: 200, volume: 120, unidade: "reel" },
  // ⚠️ Esta linha é a que NÃO fecha com os pacotes de founder brand. O reel que a
  // proposta Matheus vende (tela dividida, 2–3 ganchos escritos, editor monta as
  // 3 versões, teste de gancho em não-seguidores) custa MAIS que um reel genérico.
  // Preço implícito nos pacotes (preço do pacote − camadas − carrosséis em volume,
  // dividido pelo nº de reels), régua 08/08:
  //   Entrada  R$5.000  → (5.000 − 1.500 − 900)  / 6  = ~R$433/reel
  //   Completo R$7.000  → (7.000 − 2.500 − 1.200) / 12 = ~R$275/reel
  //   Escala   R$12.900 → (12.900 − 4.000 − 3.000)/ 20 = ~R$295/reel
  // Faixa implícita R$275–433 — acima até do avulso de R$240 aqui. O Entrada é o
  // mais distorcido porque carrega a gestão leve inteira em cima de só 12 peças.
  // Não alterei o número porque não há fonte que o reprecifique. Ver PACKAGES.
  { id: "reel-roteiro-edicao", label: "Reel — roteiro + edição", avulso: 240, volume: 150, unidade: "reel", note: "Subprecificado p/ founder brand: pacotes 08/08 implicam R$275–433/reel" },
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

// --- TAXONOMIA (o pedido central do Gabriel: separar bem pacote de pacote) ---
//
// FAMÍLIA = a QUEM o pacote atende. É o eixo que a calculadora agrupa.
//   founder-brand → perfil PESSOAL do fundador (pessoa física). Reels-first.
//   linkedin-b2b  → oferta SÓ de LinkedIn com geração de demanda (lead magnet,
//                   sinais de intenção, Company Page). Não é founder-brand (não é
//                   reels-first, não é IG/TikTok) nem conta-empresa (aquela é
//                   multicanal LinkedIn+X+e-mail e não tem automação de lead).
//   conta-empresa → perfil corporativo multicanal (LinkedIn/X/e-mail), B2B.
//   social-marca  → Instagram da MARCA, volume alto, time dedicado.
//   produto       → produto isolado que se vende sozinho (newsletter, só-conteúdo).
// (Adicional e projeto avulso NÃO são pacote — vivem em ADDONS, com `kind`.)
export type PackageFamily = "founder-brand" | "linkedin-b2b" | "conta-empresa" | "social-marca" | "produto";

export const FAMILIES: { id: PackageFamily; label: string; blurb: string }[] = [
  { id: "founder-brand", label: "Founder Brand (marca pessoal)", blurb: "Perfil pessoal do fundador. Reels-first, pessoa física, Instagram + TikTok. Padrão 2026 = decisão Gabriel 08/08. Mínimo 6 meses." },
  { id: "linkedin-b2b", label: "LinkedIn B2B", blurb: "Só LinkedIn, com geração de demanda: lead magnet automatizado, sinais de intenção, Company Page. Mínimo 6 meses (igual ao resto da casa, decisão Gabriel 2026-08)." },
  { id: "conta-empresa", label: "Conta de empresa", blurb: "Perfil corporativo multicanal (LinkedIn + X + e-mail). Ticket de LTV, entra por cross-sell." },
  { id: "social-marca", label: "Social de marca", blurb: "Instagram da marca em volume, com time dedicado. Nada a ver com founder brand." },
  { id: "produto", label: "Produto avulso", blurb: "Se vende sozinho, sem conta gerenciada (newsletter, só-conteúdo)." },
];

// STATUS = pode vender hoje?
//   padrao        → É a régua atual. Vender isso.
//   legado        → Saiu de linha. Fica no arquivo só pra não perder o histórico
//                   e pra explicar proposta antiga; NÃO oferecer a lead novo.
//   grandfathered → Preço travado de cliente ATIVO até a renovação. Nunca apagar.
export type PackageStatus = "padrao" | "legado" | "grandfathered";

export type Package = {
  id: string;
  label: string;
  family: PackageFamily;
  status: PackageStatus;
  price: number; // R$/mês (âncora)
  scope: string;
  layers: string; // descrição humana das camadas
  channels?: string;
  /** De onde saiu o número. Sem fonte, não entra. */
  source: string;
  /** Composição: peças mensais que compõem o pacote (unitId + qty). */
  pieces?: { unitId: string; qty: number }[];
  /** Camadas de serviço inclusas (ids de LAYERS). */
  layerIds?: string[];
  /** Adicionais que ENCAIXAM neste pacote (ids de ADDONS). */
  allowedAddons?: string[];
  /** Destaque comercial ("mais escolhido"). */
  highlight?: string;
  /** id do pacote que substituiu este (só em legado/grandfathered). */
  replacedBy?: string;
  minMonths?: number;
  /** Campo antigo. Mantido só pra não quebrar consumidor externo. @deprecated use `family`. */
  tier?: "entrada" | "essencial" | "founder" | "empresa" | "completo" | "enterprise";
};

// Aba 3 — Pacotes padrão. `pieces`/`layerIds` = composição real, usada pra
// prefixar a calculadora ao clicar no pacote. Ver verifyPackage(): a soma da
// composição NÃO fecha com o preço nos pacotes de founder brand (é a descoberta
// que precisa de decisão do Gabriel — está exposta na UI, não escondida).
export const PACKAGES: Package[] = [
  // ---------- FOUNDER BRAND — régua padrão (decisão Gabriel, 08/08/2026) ----------
  // Três degraus, todos mínimo 6 meses, todos Instagram + TikTok. Sem adicionais:
  // o que antes era add-on de R$1.000 (engajamento) virou ESCOPO do Escala.
  {
    id: "founder-entrada",
    label: "Entrada",
    family: "founder-brand",
    status: "padrao",
    price: 5000,
    scope: "6 reels/mês (roteiro + edição) · 6 carrosséis/mês (design completo) · postagem e agendamento · relatório mensal. SEM stories, DM ou comentários.",
    layers: "Gestão & relatórios (leve)",
    channels: "Instagram + TikTok",
    source: "Decisão Gabriel 08/08/2026 — novo piso de founder brand, substitui o Essencial Presença de R$3.600 (proposta Matheus 06/08)",
    pieces: [{ unitId: "reel-roteiro-edicao", qty: 6 }, { unitId: "carrossel-design", qty: 6 }],
    layerIds: ["gestao-leve"],
    allowedAddons: [],
    minMonths: 6,
    tier: "founder",
  },
  {
    id: "founder-completo-autoridade",
    label: "Completo Autoridade",
    family: "founder-brand",
    status: "padrao",
    price: 7000,
    scope: "12 reels/mês (~3/semana, roteiro + edição) · 8 carrosséis/mês (design completo) · postagem e agendamento · estratégia + relatório mensal. Engajamento só no Escala.",
    layers: "Gestão & estratégia (completa)",
    channels: "Instagram + TikTok",
    source: "Decisão Gabriel 08/08/2026 mantém o valor · já vinha da proposta Matheus 06/08 e da decisão 24/07 (Founder Brand Pro = R$7.000) — número estável nas três réguas",
    pieces: [{ unitId: "reel-roteiro-edicao", qty: 12 }, { unitId: "carrossel-design", qty: 8 }],
    layerIds: ["gestao-completa"],
    allowedAddons: [],
    highlight: "Mais escolhido",
    minMonths: 6,
    tier: "founder",
  },
  {
    id: "founder-escala",
    label: "Escala",
    family: "founder-brand",
    status: "padrao",
    price: 12900,
    scope: "20 reels/mês + 20 carrosséis/mês (~1 de cada por dia útil) · engajamento INCLUSO (DM e comentários) · postagem e agendamento · estratégia + relatório mensal.",
    layers: "Gestão & estratégia completa + community management",
    channels: "Instagram + TikTok",
    source: "Decisão Gabriel 08/08/2026. ⚠️ NÃO é número novo: é o mesmo R$12.900 do 'Founder OS' da decisão 24/07 (PLANO-EXECUCAO-marca-pessoal-founders-2026-07-24.md §2.1), reaproveitado pra RESOLVER a divergência de réguas em vez de criar outra. O escopo é que mudou: 08/08 é IG+TikTok com volume alto e engajamento incluso; o Founder OS era multicanal (IG+LI+X) com estratega sênior e setup de R$5.900",
    pieces: [{ unitId: "reel-roteiro-edicao", qty: 20 }, { unitId: "carrossel-design", qty: 20 }],
    layerIds: ["gestao-completa", "community"],
    allowedAddons: [],
    minMonths: 6,
    tier: "founder",
  },

  // ---------- FOUNDER BRAND — fora de linha ----------
  // ⚠️ Os abaixo são as réguas que conflitavam. Ficam pra explicar proposta já
  // enviada; NÃO oferecer a lead novo.
  {
    id: "founder-essencial-presenca",
    label: "Essencial Presença (proposta Matheus 06/08)",
    family: "founder-brand",
    status: "legado",
    price: 3600,
    scope: "4 reels/mês (roteiro + edição de vídeo) · 4 carrosséis/mês (design completo) · postagem e agendamento · relatório mensal. SEM stories, DM ou comentários.",
    layers: "Gestão & relatórios (leve)",
    channels: "Instagram + TikTok",
    source: "Proposta Matheus Fassheber 06/08/2026 (code/plano-kaleidos/matheus) — fechado em R$3.600. SAIU DE LINHA por decisão Gabriel 08/08/2026: o piso de founder brand subiu pra R$5.000",
    pieces: [{ unitId: "reel-roteiro-edicao", qty: 4 }, { unitId: "carrossel-design", qty: 4 }],
    layerIds: ["gestao-leve"],
    replacedBy: "founder-entrada",
    minMonths: 6,
    tier: "founder",
  },
  {
    id: "personal-founder-essencial",
    label: "Personal Founder — Essencial (2026 H1)",
    family: "founder-brand",
    status: "legado",
    price: 3000,
    scope: "1 perfil: 4 reels + 4 carrosséis/mês. Sem stories/DM/comentários.",
    layers: "Gestão leve + relatório",
    source: "Tabela-Precos-Kaleidos-2026.xlsx (planilha, pré-24/07)",
    pieces: [{ unitId: "reel-edicao", qty: 4 }, { unitId: "carrossel-design", qty: 4 }],
    layerIds: ["gestao-leve"],
    replacedBy: "founder-entrada",
    tier: "founder",
  },
  {
    id: "founder-start-4900",
    label: "Founder Start (decisão 24/07)",
    family: "founder-brand",
    status: "legado",
    price: 4900,
    scope: "1 perfil: 8 peças (4 carrossel + 4 reels em ROTEIRO — founder grava). Setup único de R$2.900 à parte. Piso da decisão de 24/07, superado pela proposta de 06/08.",
    layers: "Gestão & estratégia",
    source: "PLANO-EXECUCAO-marca-pessoal-founders-2026-07-24.md §2.1 (decisão Gabriel 24/07)",
    pieces: [{ unitId: "carrossel-design", qty: 4 }, { unitId: "reel-edicao", qty: 4 }],
    layerIds: ["gestao-completa"],
    replacedBy: "founder-entrada",
    tier: "founder",
  },
  {
    id: "founder-os-12900",
    label: "Founder OS — Executive",
    family: "founder-brand",
    status: "legado",
    price: 12900,
    scope: "IG + LI + X com variante por rede, 20+ peças, ghostwriting total, engajamento ativo, newsletter mensal, estratega sênior. Setup único de R$5.900 (inclui 1 Kaleidos Paper).",
    layers: "Gestão completa + engajamento + estratega sênior",
    source: "PLANO-EXECUCAO 24/07 §2.1 — composição declarada: 7.000 + 1.500 multicanal + 1.500 engajamento + 3.000 estratega ≈ 13.000. É a ORIGEM do R$12.900 que o Escala (08/08) herdou",
    pieces: [{ unitId: "carrossel-design", qty: 10 }, { unitId: "reel-edicao", qty: 8 }, { unitId: "post-linkedin", qty: 8 }, { unitId: "thread-x", qty: 4 }],
    layerIds: ["gestao-completa", "reply-guy", "estratega-senior"],
    replacedBy: "founder-escala",
    tier: "founder",
  },
  {
    id: "personal-founder-duo",
    label: "Founder Duo (2 sócios)",
    family: "founder-brand",
    status: "grandfathered",
    price: 5400,
    scope: "2 perfis da mesma empresa. Piso reajustado de R$3.500 → R$5.400. ⚠️ DSEC (Gui + Léo) segue em R$3.500 até renovar; aplicar o valor novo a cliente NOVO ainda depende de decisão.",
    layers: "Gestão & estratégia completa",
    source: "PLANO-EXECUCAO 24/07 §2.3 — pendência #6 do mesmo doc segue ABERTA",
    pieces: [{ unitId: "reel-edicao", qty: 8 }, { unitId: "carrossel-design", qty: 6 }],
    layerIds: ["gestao-completa"],
    tier: "founder",
  },

  // ---------- LINKEDIN B2B (decisão Gabriel, 08/08/2026) ----------
  // Contrato mínimo 6 meses, igual ao resto da casa (PRICING_RULES.minContractMonths).
  // A régua nasceu em 06-08/08 com 3 meses espelhando a referência de mercado, mas a
  // divergência DEIXOU DE EXISTIR: decisão Gabriel de 2026-08 unificou tudo em 6.
  // Composição em `pieces` usa post-linkedin + carrossel-linkedin, que já existiam
  // em UNITS. Setup, automação de lead magnet e sinais de intenção NÃO têm linha
  // própria na aba 1 (não há fonte de preço unitário), então entram como escopo e
  // aparecem no prêmio sobre a tabela. Ver verifyPackage().
  {
    id: "linkedin-starter",
    label: "LinkedIn Starter",
    family: "linkedin-b2b",
    status: "padrao",
    price: 4250,
    scope: "Setup do perfil · 12 conteúdos/mês (6 posts de texto + 6 carrosséis PDF) · automação de lead magnet · relatório de sinais de intenção.",
    layers: "Gestão & relatórios (leve)",
    channels: "LinkedIn",
    source: "Decisão Gabriel 08/08/2026",
    pieces: [{ unitId: "post-linkedin", qty: 6 }, { unitId: "carrossel-linkedin", qty: 6 }],
    layerIds: ["gestao-leve"],
    allowedAddons: [],
    minMonths: 6,
    tier: "entrada",
  },
  {
    id: "linkedin-full-service",
    label: "LinkedIn Full Service",
    family: "linkedin-b2b",
    status: "padrao",
    price: 5900,
    scope: "Setup · 20 conteúdos/mês (10 posts de texto + 10 carrosséis PDF) · sinais de intenção · conteúdo em vídeo/newsletter · conteúdo de Company Page.",
    layers: "Gestão & estratégia (completa)",
    channels: "LinkedIn (perfil + Company Page)",
    source: "Decisão Gabriel 08/08/2026",
    pieces: [{ unitId: "post-linkedin", qty: 10 }, { unitId: "carrossel-linkedin", qty: 10 }],
    layerIds: ["gestao-completa"],
    allowedAddons: [],
    highlight: "Fecha na tabela",
    minMonths: 6,
    tier: "completo",
  },
  {
    id: "linkedin-360",
    label: "LinkedIn 360°",
    family: "linkedin-b2b",
    status: "padrao",
    price: 9900,
    scope: "Setup de múltiplos perfis · 40 conteúdos/mês (20 posts de texto + 20 carrosséis PDF) · até 6 lead magnets/mês · automação · sinais de intenção · vídeo/newsletter · Company Page.",
    layers: "Gestão & estratégia (completa)",
    channels: "LinkedIn (múltiplos perfis + Company Page)",
    source: "Decisão Gabriel 08/08/2026",
    pieces: [{ unitId: "post-linkedin", qty: 20 }, { unitId: "carrossel-linkedin", qty: 20 }],
    layerIds: ["gestao-completa"],
    allowedAddons: [],
    minMonths: 6,
    tier: "enterprise",
  },

  // ---------- CONTA DE EMPRESA ----------
  {
    id: "conta-empresa",
    label: "Conta Empresa Multicanal",
    family: "conta-empresa",
    status: "padrao",
    price: 4500,
    scope: "LinkedIn + Twitter + e-mail (~30 peças/mês). Cross-sell natural depois do founder brand.",
    layers: "Gestão & estratégia completa",
    channels: "LinkedIn + X + e-mail",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3",
    pieces: [{ unitId: "post-linkedin", qty: 8 }, { unitId: "tweet", qty: 15 }, { unitId: "thread-x", qty: 2 }],
    layerIds: ["gestao-completa"],
    minMonths: 6,
    tier: "empresa",
  },

  // ---------- SOCIAL DE MARCA ----------
  {
    id: "social-essencial-gerenciado",
    label: "Social Essencial — gerenciado",
    family: "social-marca",
    status: "padrao",
    price: 3500,
    scope: "16 posts/mês (até 2 perfis) + stories + relatórios.",
    layers: "Gestão & relatórios (leve)",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3",
    pieces: [{ unitId: "post-estatico", qty: 10 }, { unitId: "carrossel-design", qty: 4 }, { unitId: "stories", qty: 4 }],
    layerIds: ["gestao-leve"],
    minMonths: 6,
    tier: "essencial",
  },
  {
    id: "social-completo",
    label: "Social Completo",
    family: "social-marca",
    status: "padrao",
    price: 6000,
    scope: "Instagram completo: ~24–26 posts/mês + stories diários.",
    layers: "Gestão & estratégia completa",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3",
    pieces: [{ unitId: "carrossel-design", qty: 9 }, { unitId: "reel-meme", qty: 9 }, { unitId: "post-estatico", qty: 8 }, { unitId: "stories", qty: 8 }],
    layerIds: ["gestao-completa"],
    minMonths: 6,
    tier: "completo",
  },
  {
    id: "social-pitch",
    label: "Social — time dedicado",
    family: "social-marca",
    status: "padrao",
    price: 12000,
    scope: "Conteúdo diário multi-perfil, time completo. Sem reply guy.",
    layers: "Gestão completa + community",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3 (faixa do deck institucional)",
    pieces: [{ unitId: "carrossel-design", qty: 20 }, { unitId: "reel-edicao", qty: 15 }, { unitId: "post-estatico", qty: 15 }, { unitId: "stories", qty: 20 }],
    layerIds: ["gestao-completa", "community"],
    minMonths: 6,
    tier: "enterprise",
  },
  {
    id: "full-social",
    label: "Full Social",
    family: "social-marca",
    status: "padrao",
    price: 18000,
    scope: "Tudo do Social + engajamento ativo + produção reativa.",
    layers: "Tudo incluso",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3 (faixa do deck institucional)",
    pieces: [{ unitId: "carrossel-design", qty: 26 }, { unitId: "reel-edicao", qty: 20 }, { unitId: "post-estatico", qty: 20 }, { unitId: "stories", qty: 26 }, { unitId: "tweet", qty: 30 }],
    layerIds: ["gestao-completa", "community", "reply-guy"],
    minMonths: 6,
    tier: "enterprise",
  },

  // ---------- PRODUTO AVULSO ----------
  {
    id: "newsletter",
    label: "Newsletter",
    family: "produto",
    status: "padrao",
    price: 1100,
    scope: "4 newsletters simples/mês (semanal). +R$700/mês para a versão densa.",
    layers: "Edição + envio (gestão embutida)",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3",
    pieces: [{ unitId: "newsletter-simples", qty: 4 }],
    layerIds: [],
    tier: "entrada",
  },
  {
    id: "social-essencial",
    label: "Social Essencial — só conteúdo",
    family: "produto",
    status: "padrao",
    price: 1500,
    scope: "16 posts/mês (1–2 perfis), mix estático/carrossel. Cliente aprova e publica.",
    layers: "Nenhuma",
    source: "Tabela-Precos-Kaleidos-2026.xlsx, aba 3",
    pieces: [{ unitId: "post-estatico", qty: 10 }, { unitId: "carrossel-design", qty: 4 }],
    layerIds: [],
    tier: "essencial",
  },
];

/** @deprecated Nome antigo de PACKAGES. Mantido pra não quebrar import externo. */
export const BUNDLES = PACKAGES;
export type Bundle = Package;

export type AddOnKind = "adicional" | "projeto";

export type AddOn = {
  id: string;
  label: string;
  priceMin: number;
  priceMax?: number;
  /** adicional = mensal, encaixa num pacote. projeto = one-off, vive sozinho. */
  kind: AddOnKind;
  status: PackageStatus;
  source: string;
  family?: PackageFamily; // quando o adicional só faz sentido numa família
  replacedBy?: string;
  note?: string;
  /** Campo antigo ("recorrente" | "projeto"). @deprecated use `kind`. */
  type: "projeto" | "recorrente";
};

// Aba 4 — Adicionais (mensais, encaixam num pacote) e projetos avulsos (one-off).
export const ADDONS: AddOn[] = [
  // --- Adicionais de founder brand — fora de linha ---
  // ⚠️ Os dois de R$1.000 abaixo eram a régua padrão até 08/08. Gabriel tirou os
  // extras da oferta de founder brand: a escada agora é só Entrada / Completo /
  // Escala, e quem quer engajamento sobe pro Escala (onde ele é ESCOPO INCLUSO,
  // não add-on de R$1.000). LinkedIn deixou de ser um puxadinho do founder brand
  // e virou família própria (linkedin-b2b), com oferta e preço próprios.
  // Ficam no arquivo pra explicar a proposta Matheus 06/08 já enviada.
  { id: "engajamento-1000", label: "+ Engajamento (régua 06/08)", priceMin: 1000, kind: "adicional", type: "recorrente", status: "legado", family: "founder-brand",
    source: "Proposta Matheus 06/08/2026 — saiu da oferta por decisão Gabriel 08/08/2026",
    note: "Stories geridos, responder comentários, triagem de DM. Não vender mais como adicional: no Escala (R$12.900) isso é escopo incluso." },
  { id: "linkedin-1000", label: "+ LinkedIn institucional (régua 06/08)", priceMin: 1000, kind: "adicional", type: "recorrente", status: "legado", family: "founder-brand",
    source: "Proposta Matheus 06/08/2026 — saiu da oferta por decisão Gabriel 08/08/2026",
    note: "Repurpose do conteúdo adaptado à rede. Não vender mais como adicional: LinkedIn agora é a família linkedin-b2b, a partir de R$4.250." },

  // --- Adicionais de founder brand — fora de linha (régua 24/07) ---
  { id: "engajamento-founder", label: "+ Engajamento (régua 24/07)", priceMin: 1500, kind: "adicional", type: "recorrente", status: "legado", family: "founder-brand",
    source: "PLANO-EXECUCAO 24/07 §2.4", replacedBy: "engajamento-1000", note: "Mesmo escopo, preço antigo" },
  { id: "multicanal-founder", label: "+ Multicanal X & LinkedIn (régua 24/07)", priceMin: 1500, kind: "adicional", type: "recorrente", status: "legado", family: "founder-brand",
    source: "PLANO-EXECUCAO 24/07 §2.4", replacedBy: "linkedin-1000", note: "Escopo MAIOR que o adicional novo: incluía X além do LinkedIn" },

  // --- Adicionais gerais ---
  { id: "perfil-extra", label: "Perfil/canal extra", priceMin: 1500, kind: "adicional", type: "recorrente", status: "padrao", source: "Planilha, aba 4" },
  { id: "newsletter-addon", label: "Newsletter add-on", priceMin: 900, kind: "adicional", type: "recorrente", status: "padrao", source: "Planilha, aba 4", note: "Acopla newsletter a um pacote social" },
  { id: "newsletter-founder", label: "Newsletter própria do founder", priceMin: 1100, kind: "adicional", type: "recorrente", status: "padrao", family: "founder-brand", source: "PLANO-EXECUCAO 24/07 §2.4" },
  { id: "stories-extra", label: "Pacote de stories extra", priceMin: 600, kind: "adicional", type: "recorrente", status: "padrao", source: "Planilha, aba 4" },
  { id: "dashboard-premium", label: "Relatório/dashboard premium", priceMin: 800, kind: "adicional", type: "recorrente", status: "padrao", source: "Planilha, aba 4", note: "BI detalhado + reunião de performance" },
  { id: "estratega-addon", label: "Estratega sênior dedicado", priceMin: 3000, kind: "adicional", type: "recorrente", status: "padrao", source: "PLANO-EXECUCAO 24/07 §2.4 (= camada `estratega-senior`)" },

  // --- Projetos avulsos (one-off, NÃO entram na mensalidade) ---
  // ⚠️ Podcast é projeto à parte por decisão explícita da proposta Matheus — nunca
  // embutir em plano mensal. Não há preço com fonte, por isso não está listado aqui.
  { id: "setup-founder", label: "Setup inicial de founder brand", priceMin: 2900, priceMax: 5900, kind: "projeto", type: "projeto", status: "padrao", family: "founder-brand",
    source: "PLANO-EXECUCAO 24/07 §2.2 (âncora Felipe Medeiros R$5.900, pago)",
    note: "⚠️ A proposta Matheus 06/08 diz 'setup incluso nos dois planos' — cobrar à parte só fora da régua nova" },
  { id: "campanha-lancamento", label: "Campanha de lançamento", priceMin: 3000, priceMax: 8000, kind: "projeto", type: "projeto", status: "padrao", source: "Planilha, aba 4", note: "Conceito + cronograma + peças extras + coordenação" },
  { id: "video-motion", label: "Vídeo / motion design", priceMin: 1800, priceMax: 2500, kind: "projeto", type: "projeto", status: "padrao", source: "Planilha, aba 4" },
  { id: "landing-funil", label: "Landing page + funil", priceMin: 4500, priceMax: 8000, kind: "projeto", type: "projeto", status: "padrao", source: "Planilha, aba 4" },
  { id: "influencers", label: "Ativação de influencers", priceMin: 2000, kind: "projeto", type: "projeto", status: "padrao", source: "Planilha, aba 4", note: "Curadoria + ponte + gestão (cachê à parte)" },
];

// Regras (aba "Como Montar Orçamento")
export const PRICING_RULES = {
  pisos: {
    newsletter: 1100,
    socialSoConteudo: 1500,
    contaGerenciada: 3000,
    /** Piso de founder brand = degrau Entrada (decisão Gabriel 08/08/2026). */
    founderBrand: 5000,
    /** Piso de LinkedIn B2B = degrau Starter (decisão Gabriel 08/08/2026). */
    linkedinB2b: 4250,
    /** @deprecated piso da proposta Matheus 06/08 (Essencial Presença). Ver founderBrand. */
    founderBrandMatheus: 3600,
    /** @deprecated régua antiga da planilha. Ver founderBrand. */
    personalFounder: 3000,
  },
  // Política padrão jul/2026: contrato mínimo 6 meses em TODAS as famílias
  // (a exceção de 3 meses do linkedin-b2b existiu em 08/08 e foi eliminada:
  // decisão Gabriel 2026-08 unificou em 6). Sempre preferir `package.minMonths`
  // quando houver pacote selecionado.
  minContractMonths: 6,
  bundleDiscountRange: [0.1, 0.15] as const, // 10–15% se virar pacote fechado
  /** Tolerância de conferência: composição pode divergir do preço até o teto do desconto. */
  compositionTolerance: 0.15,
  margem: {
    markupMin: 2, // preço = custo × 2
    custoAlvoMax: 0.5, // custo ≤ 50% do preço
    redFlagBelow: 0.4, // margem < 40% = revisar
  },
};

// --- Conferência de pacote ---
// O modelo PROMETE que Σ(peças em volume) + camadas ≈ preço do pacote. Isso deixou
// de valer nos pacotes de founder brand novos (o reel está subprecificado na aba 1),
// então a UI mostra o delta em vez de fingir que fecha.
export type PackageCheck = {
  composed: number; // soma peças + camadas
  price: number;
  delta: number; // price − composed (positivo = pacote cobra prêmio sobre a tabela)
  deltaPct: number; // delta / price
  ok: boolean; // dentro da tolerância de desconto de bundle
};

export function verifyPackage(p: Package): PackageCheck {
  const unitMap = new Map(UNITS.map((u) => [u.id, u]));
  const layerMap = new Map(LAYERS.map((l) => [l.id, l]));
  const pieces = (p.pieces ?? []).reduce((s, x) => s + (unitMap.get(x.unitId)?.volume ?? 0) * x.qty, 0);
  const layers = (p.layerIds ?? []).reduce((s, id) => s + (layerMap.get(id)?.price ?? 0), 0);
  const composed = pieces + layers;
  const delta = p.price - composed;
  const deltaPct = p.price > 0 ? delta / p.price : 0;
  return { composed, price: p.price, delta, deltaPct, ok: Math.abs(deltaPct) <= PRICING_RULES.compositionTolerance };
}

// --- Motor de cálculo do orçamento ---
export type QuoteInput = {
  pieces: { unitId: string; qty: number }[];
  layerIds: string[];
  addonIds: string[];
  bundleDiscount?: number; // 0–0.15
  /** Família do pacote selecionado — define qual piso vale. */
  family?: PackageFamily;
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
    if (a.kind === "adicional") addonsRecurring += a.priceMin;
    else addonsOneOff += a.priceMin;
  }

  const subtotalMonthly = contentMonthly + layersMonthly + addonsRecurring;
  const discount = Math.min(Math.max(input.bundleDiscount ?? 0, 0), 0.15);
  const discountApplied = Math.round(subtotalMonthly * discount);

  // Piso: founder brand tem piso próprio (R$5.000, degrau Entrada) e LinkedIn B2B
  // também (R$4.250, degrau Starter); qualquer outra conta gerenciada, R$3.000;
  // só-conteúdo, R$1.500.
  const managed = input.layerIds.length > 0;
  const pisoFloor =
    input.family === "founder-brand"
      ? PRICING_RULES.pisos.founderBrand
      : input.family === "linkedin-b2b"
        ? PRICING_RULES.pisos.linkedinB2b
        : managed
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
