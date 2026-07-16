/**
 * Métricas oficiais da Kaleidos — fonte única de verdade.
 * Importar este arquivo em vez de hardcodar números nas páginas.
 */
export const KALEIDOS_METRICS = {
  // Produção de conteúdo
  videosEditados: "500+",
  videosEditados_en: "500+",

  designsCriados: "600+",
  designsCriados_en: "600+",

  viewsReels: "125M+",
  viewsReels_en: "125M+",

  faturamentoClientes: "R$46mi+",
  faturamentoClientes_en: "$46M+",

  // Operacional
  lancamentos: "50+",
  lancamentos_en: "50+",

  satisfacaoCliente: "98%",
  satisfacaoCliente_en: "98%",

  // Contagem de projetos/clientes
  projetosAtendidos: "30+",
  projetosAtendidos_en: "30+",

  // Crescimento médio
  crescimentoMedio: "200%",
  crescimentoMedio_en: "200%",
} as const;

export type MetricKey = keyof typeof KALEIDOS_METRICS;
