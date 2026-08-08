/**
 * Métricas institucionais da Kaleidos — ponto único de importação.
 *
 * 🔴 LEIA ANTES DE USAR OU DE ADICIONAR NÚMERO AQUI.
 *
 * Este arquivo se declarava "fonte única de verdade" sem carregar UMA fonte.
 * Em 08/08/2026 foi feito um rastreamento completo da origem dos 8 números,
 * varrendo `vault/` inteiro, `code/` (36 projetos) e o histórico do git deste
 * repositório desde o primeiro commit (`810f095`, 24/10/2025).
 *
 * RESULTADO: **nenhum dos 8 números tem fonte primária.** Não existe planilha,
 * export de plataforma, pesquisa de satisfação, relatório ou registro de
 * apuração para nenhum deles — nem no vault, nem no código. O que existe é
 * replicação circular: as páginas citam este arquivo, os decks citam as
 * páginas, a skill `copywriting-kaleidos` (SKILL.md:43) injeta os números em
 * copy nova, e a copy nova vira "mais uma ocorrência" que reforça a aparência
 * de consenso. Todos os caminhos terminam aqui, e aqui não termina em lugar
 * nenhum.
 *
 * Isso já tinha sido apontado internamente 3× sem ser resolvido:
 *   · `code/kaleidos-papers/_SITE-REVISAO-COMPLETA-2026-06-17.md:21` — chamou de
 *     "métricas fabricadas" em 17/06/2026
 *   · `vault/00 - DASHBOARD/diario/2026-06-08.md:29` — "⚠️ Números a CONFIRMAR
 *     (não inventei)". A confirmação nunca aconteceu; foram publicados assim.
 *   · `vault/00 - DASHBOARD/_auditorias/CONSISTENCIA-MATERIAL-COMERCIAL-2026-08-08.md:116-123`
 *
 * ⚠️ NENHUM VALOR FOI ALTERADO nesta passagem. Manter, corrigir ou tirar do ar
 * cada número é decisão do Gabriel, não de quem audita. O que mudou foi só a
 * honestidade do arquivo: cada linha agora diz o que se sabe da sua origem.
 *
 * O modelo a copiar quando houver apuração de verdade existe dentro de casa:
 * o slide 07 do deck de marca pessoal declara a janela e a metodologia
 * ("contagens apuradas nos registros internos entre maio e julho de 2026") e
 * 4 dos 6 números são rastreáveis até arquivo + linha + data no vault.
 * `src/lib/pricing.ts` também já carrega `source` por item. Dá pra fazer.
 *
 * ⛔ NÃO adicione número aqui sem preencher fonte + data + metodologia.
 * ⛔ NÃO invente fonte para fechar a conta. "Não rastreado" é resposta correta.
 *
 * Ressalva do rastreamento: só foi possível afirmar que a fonte não está no
 * disco (vault + code). Pode existir apuração em Drive, Notion, Metricool ou
 * print de Insights que ninguém registrou.
 */
export const KALEIDOS_METRICS = {
  // Produção de conteúdo

  /**
   * ❌ NÃO RASTREADO. Primeira aparição: `servicos/marketing-conteudo/page.tsx`
   * no commit inicial `810f095` (24/10/2025), já contradizendo o "150+ vídeos"
   * que o `/sobre` publicava no MESMO commit. A divergência nunca foi
   * reconciliada — o 500+ apareceu ao lado do 150+, não derivado dele.
   * Não existe lista de vídeos em lugar nenhum.
   */
  videosEditados: "500+",
  videosEditados_en: "500+",

  /**
   * ❌ NÃO RASTREADO. `servicos/marketing-conteudo/page.tsx:163` em `810f095`
   * (24/10/2025), rótulo original "Peças de Design".
   * Observação (não é conclusão): o repo tem outros dois "600+" sem relação —
   * participantes do Defifest (`case-data.ts`) e "600+ posts automatizados" do
   * Mercado Bitcoin. Coincidência ou contaminação, não dá pra afirmar.
   */
  designsCriados: "600+",
  designsCriados_en: "600+",

  /**
   * ❌ NÃO RASTREADO. Entrou por decisão verbal em 16/07/2026, commit `154f140`,
   * cuja mensagem é a fonte inteira: "Métricas alinhadas aos números reais
   * (Gabriel): views 30M+ -> 125M+". Nenhum documento de apuração foi criado
   * nesse dia (diário `2026-07-16.md:141`).
   * Antecessores: "30M+" e "20M+", ambos sem fonte e ambos vivos ao mesmo tempo
   * em páginas diferentes do site em out/2025. Salto de 30M para 125M (4,2×)
   * sem nenhum registro do que foi contado, em que plataformas ou em que janela.
   */
  viewsReels: "125M+",
  viewsReels_en: "125M+",

  /**
   * 🔴 NÃO RASTREADO — o mais sensível dos 8, porque é afirmação sobre a receita
   * de terceiros. Entrou em 16/07/2026 (`154f140`), por decisão verbal,
   * substituindo um "+R$30mi" que a auditoria do dia ANTERIOR já classificara
   * como sem fonte (`vault/01 - KALEIDOS/012 - INTERNO/AUDIT-PAGINAS-INSTITUCIONAIS-2026-07-16.md:21`).
   * Não existe definição do que conta como "faturado pelos clientes": receita
   * bruta? só lançamentos? só o período de contrato? atribuída à Kaleidos ou
   * total do cliente? O único registro de faturamento de cliente no repo é o
   * Bit das Minas, e é percentual, não R$.
   */
  faturamentoClientes: "R$46mi+",
  faturamentoClientes_en: "$46M+",

  // Operacional

  /**
   * ❌ NÃO RASTREADO. O mais antigo e o único que nunca mudou de valor
   * (`/sobre` em `810f095`, 24/10/2025) — mas no mesmo commit a
   * `/servicos/growth-lancamentos` publicava "20+ lançamentos".
   * Não existe lista dos lançamentos em lugar nenhum do vault.
   */
  lancamentos: "50+",
  lancamentos_en: "50+",

  /**
   * 🔴 NÃO RASTREADO — e com indício ativo de fabricação. Três coisas:
   * (a) Não há registro de pesquisa de satisfação, NPS ou CSAT em lugar nenhum.
   *     `vault/00 - DASHBOARD/💼 Visão Clientes.md:189` tem literalmente
   *     "**NPS:** --" em branco.
   * (b) Em `810f095` (24/10/2025) o MESMO 98% era rotulado "Taxa de sucesso"
   *     em `growth-lancamentos/page.tsx:157` e "Satisfação" em `sobre/page.tsx:327`.
   *     Um número que serve a dois conceitos diferentes não veio de apuração.
   * (c) A revisão interna de 17/06/2026 o listou entre "métricas fabricadas"
   *     junto com "100% satisfação" e "ROI garantido". Os outros dois foram
   *     removidos por serem fabricados. Este ficou.
   */
  satisfacaoCliente: "98%",
  satisfacaoCliente_en: "98%",

  // Contagem de projetos/clientes

  /**
   * ❌ NÃO RASTREADO. Decisão verbal de 16/07/2026 (`154f140`), antecessor "20+",
   * enquanto a home rodava "50+ marcas" hardcoded — três valores vivos ao mesmo
   * tempo. E o vault conta menos: `016 - PROCESSOS/00-PLANO-DE-NEGOCIOS.md:883`
   * e `013 - COMERCIAL/PITCH-DECK-TEXTOS.md:89-93` registram **19 clientes**.
   * "Projetos atendidos" (histórico acumulado) e "clientes" (carteira) podem ser
   * recortes diferentes — mas nenhum documento define qual é qual.
   */
  projetosAtendidos: "30+",
  projetosAtendidos_en: "30+",

  // Crescimento médio

  /**
   * 🟠 SÓ CIRCULAR — é a única com raiz localizável, e a raiz não sustenta a
   * afirmação. Origem: `public/Cases/bit-das-minas/conteudo/case.txt:9` —
   * "observamos um aumento de mais de 200% no faturamento dos lançamentos".
   * Presente desde 24/10/2025.
   * Por que não vale como métrica institucional: é (i) de UM cliente,
   * (ii) autorrelatado ("observamos"), (iii) sem data e sem número absoluto,
   * e (iv) virou "crescimento médio" DA AGÊNCIA — média de n=1.
   * Além disso, o rótulo público não diz crescimento de quê (faturamento?
   * seguidores? alcance?) nem em que janela.
   */
  crescimentoMedio: "200%",
  crescimentoMedio_en: "200%",
} as const;

export type MetricKey = keyof typeof KALEIDOS_METRICS;
