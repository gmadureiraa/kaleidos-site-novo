/**
 * Prova institucional da Kaleidos — ponto único de importação.
 *
 * 🔴 LEIA ANTES DE ADICIONAR QUALQUER NÚMERO AQUI.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 19/08/2026 — AS 8 MÉTRICAS INSTITUCIONAIS SAÍRAM DO AR. Decisão do Gabriel:
 * **número sem fonte documentada sai do ar.**
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * O que havia aqui, e por que não está mais:
 *
 *   · `125M+` views em Reels          — sem fonte
 *   · `500+` vídeos editados          — sem fonte
 *   · `600+` designs criados          — sem fonte
 *   · `R$46mi+` faturados por clientes — sem fonte E sem definição do que conta
 *   · `50+` lançamentos               — sem fonte (cadeia circular vault↔site)
 *   · `30+` projetos atendidos        — sem fonte (o vault registra 19 clientes)
 *   · `98%` de satisfação             — sem fonte, com indício de fabricação
 *   · `200%` crescimento médio        — média de n=1, autorrelatada
 *
 * Três rastreamentos independentes (17/06, 16/07 e 08/08/2026) varreram `vault/`,
 * `code/` (36 projetos) e o histórico do git desde o primeiro commit (`810f095`,
 * 24/10/2025). **Nenhum dos oito tinha fonte primária.** Não existe planilha,
 * export de plataforma, pesquisa de satisfação ou relatório de apuração para
 * nenhum deles. O que existia era replicação circular: as páginas citavam este
 * arquivo, os decks citavam as páginas, o vault copiava dos decks, e a
 * "coincidência" virava aparência de consenso.
 *
 * Os dois casos mais graves, registrados para não voltarem por engano:
 *
 *   · `98% de satisfação` — não existe pesquisa NPS/CSAT/formulário em lugar
 *     nenhum do GOS. `vault/00 - DASHBOARD/💼 Visão Clientes.md:189` tem o campo
 *     `NPS: --` VAZIO, e `vault/00 - DASHBOARD/diario/2026-07-19.md:62` mostra o
 *     survey de NPS como plano futuro, nunca executado. Era afirmação sobre uma
 *     pesquisa que nunca foi feita. Em `810f095` o MESMO 98% era rotulado "Taxa
 *     de sucesso" numa página e "Satisfação" em outra — um número que serve a
 *     dois conceitos diferentes não veio de apuração.
 *
 *   · `R$46mi+ faturados pelos clientes` — afirmação sobre a receita de
 *     TERCEIROS, entrada por decisão verbal em 16/07/2026 (`154f140`),
 *     substituindo um "+R$30mi" que a auditoria do dia ANTERIOR já classificara
 *     como sem fonte. Nunca houve definição do que conta como "faturado".
 *
 * ⛔ NÃO reponha nenhum deles sem `source` + `data` + método, no padrão de
 *    `KALEIDOS_PROOF` abaixo (e de `src/lib/pricing.ts`, que já carrega fonte
 *    por item). "Não rastreado" é resposta correta. Prova qualitativa honesta
 *    vende mais que número grande que não sobrevive a uma pergunta.
 *
 * ═════════════════════════════════════════════════════════════════════════════
 * O QUE SOBROU: prova com fonte primária, atribuída a cliente, com janela.
 * ═════════════════════════════════════════════════════════════════════════════
 *
 * Regra deste bloco: todo item carrega `source` (caminho verificável) e `apurado`
 * (data). Nada entra aqui sem os dois. E nada aqui é apresentado como média da
 * agência — é resultado de UM cliente, num período, e a copy tem que dizer isso.
 */

export interface ProofPoint {
  /** Número como deve ser renderizado (PT) */
  value: string;
  /** Número como deve ser renderizado (EN) */
  value_en: string;
  /** O que o número mede (PT) — sempre com cliente e janela */
  label: string;
  /** O que o número mede (EN) */
  label_en: string;
  /** Cliente a quem o resultado pertence */
  client: string;
  /** Caminho verificável da fonte primária */
  source: string;
  /** Data da apuração */
  apurado: string;
}

export const KALEIDOS_PROOF = {
  /**
   * ✅ FONTE PRIMÁRIA. Print do Instagram Insights do @defiverso, janela
   * 02/ago–30/out, campo "de orgânico: 12.000.732".
   */
  defiversoViews: {
    value: "12M",
    value_en: "12M",
    label: "views orgânicos em 90 dias no Defiverso",
    label_en: "organic views in 90 days at Defiverso",
    client: "Defiverso",
    source: "public/Cases/defiverso/estudo/metricas-instagram.png",
    apurado: "2025-10-30",
  },

  /**
   * ✅ FONTE PRIMÁRIA. Dashboard Beehiiv, filtro "All time" (nov/2025).
   * O print mostra 26.556 assinantes e 33,01% de abertura média.
   * ⚠️ Material antigo escrevia "26.554" — erro de transcrição, não invenção.
   *    Corrigido para 26.556 (o que o print diz) em 19/08/2026.
   */
  defiversoNewsletter: {
    value: "33,01%",
    value_en: "33.01%",
    label: "de abertura média na newsletter do Defiverso (26.556 assinantes)",
    label_en: "average open rate on Defiverso's newsletter (26,556 subscribers)",
    client: "Defiverso",
    source: "public/Cases/defiverso/estudo/metricas-newsletter.png",
    apurado: "2025-11",
  },

  /**
   * ✅ APURAÇÃO DIRETA + PRINT. Perfil @lucas.amendolaa: 173.050 seguidores,
   * print em `public/marca-pessoal/prints/ig-lucas-amendola.png`. Conferível em
   * 30 segundos por qualquer pessoa que abra o perfil.
   * ⚠️ Divergências mortas, NÃO repor: 180k (carimbo antigo) e 174k (vault, 05/2026).
   * ⚠️ A BASELINE "50 mil" e o "+246%" NÃO entram: a única origem do 50k é o
   *    questionário `docs/cases-estudo.txt:9`, sem data e sem autor, e não existe
   *    snapshot histórico do perfil em lugar nenhum. Ponta final tem print;
   *    o delta não tem. Por isso o label fala do estado atual, não do crescimento.
   */
  lucasInstagram: {
    value: "173 mil",
    value_en: "173k",
    label: "seguidores no Instagram do Investidor 4.20, cliente de conteúdo da casa",
    label_en: "Instagram followers at Investidor 4.20, a content client of ours",
    client: "Investidor 4.20 (Lucas Amendola)",
    source: "public/marca-pessoal/prints/ig-lucas-amendola.png",
    apurado: "2026-08-08",
  },

  /**
   * ✅ APURAÇÃO DIRETA. Perfil @laylafoz lido via Apify: 176.960 seguidores.
   * ⚠️ Divergências mortas: 172k (baixo) e 184k (alto, vault de 07/05/2026).
   * ⚠️ GRAFIA: "Laylä Föz" com trema é estilização dela. Não "corrigir".
   * ⚠️ Mesma regra do Lucas: a baseline "100 mil" não tem fonte primária, só o
   *    questionário de case. O número atual é conferível no perfil; o delta não.
   */
  laylaInstagram: {
    value: "177 mil",
    value_en: "177k",
    label: "seguidores no Instagram da Laylä Föz, cliente de conteúdo da casa",
    label_en: "Instagram followers at Laylä Föz, a content client of ours",
    client: "Laylä Föz",
    source: "@laylafoz · apuração direta no perfil",
    apurado: "2026-08-08",
  },
} as const satisfies Record<string, ProofPoint>;

export type ProofKey = keyof typeof KALEIDOS_PROOF;

/**
 * Nota de procedência para renderizar junto de qualquer bloco que use
 * `KALEIDOS_PROOF`. Sem ela o bloco vira "mais números de agência".
 */
export const PROOF_NOTE =
  "Resultados de clientes específicos, em seus próprios contextos e janelas. Defiverso apurado em prints do Instagram Insights e do painel Beehiiv; contagens de seguidores apuradas diretamente nos perfis em 08/2026.";

export const PROOF_NOTE_EN =
  "Results from specific clients, in their own contexts and time windows. Defiverso figures from Instagram Insights and Beehiiv dashboard screenshots; follower counts measured directly on the profiles in 08/2026.";
