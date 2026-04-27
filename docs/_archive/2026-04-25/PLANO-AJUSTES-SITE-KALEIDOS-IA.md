# Plano de Ajustes do Site Kaleidos (Copy + Design)

## Objetivo
Atualizar o site da Kaleidos para aumentar clareza de posicionamento, confiança, conversão e consistência visual, mantendo o estilo premium atual e sem quebrar estrutura técnica (Next.js + i18n).

## Resultado Esperado
- Mensagem mais clara já na primeira dobra.
- Copy sem erros e sem claims arriscadas.
- Páginas de serviço mais orientadas a conversão.
- Cases mais comparáveis e com leitura rápida.
- Design mais consistente entre páginas.
- Melhor base para SEO e tracking.

---

## Regras de Implementação
1. Não remover páginas existentes.
2. Não quebrar rotas atuais.
3. Preservar PT e EN.
4. Padronizar tom: premium, direto, confiante, sem exagero.
5. Evitar promessas absolutas (ex.: “garantido”, “como loucos”).
6. Toda seção principal deve terminar com CTA claro.

---

## Prioridades (execução)

## P0 (crítico)
1. Corrigir copy com erro gramatical/ortográfico.
2. Remover claims de garantia de resultado.
3. Unificar proposta de valor da home.
4. Padronizar headlines e subheadlines dos serviços.

## P1 (alta)
1. Estruturar melhor provas e métricas nos cases.
2. Melhorar fluxo de conversão (WhatsApp + formulário curto).
3. Harmonizar design entre páginas de serviço.
4. Revisar SEO técnico essencial (canonical, metadata, placeholders).

## P2 (média)
1. Melhorias avançadas de UX mobile.
2. Filtros em cases por objetivo.
3. Blocos comparativos “antes/depois”.

---

## Ajustes de Copy (substituições diretas)

## 1) Home
### Hero
- Atual: “O futuro do seu conteúdo começa aqui!”
- Novo: **“Crescimento previsível para marcas e creators no mercado cripto.”**

- Atual: “Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos”
- Novo: **“Combinamos conteúdo, automação e estratégia comercial para transformar audiência em receita.”**

### Apoio de posicionamento (nova linha curta abaixo do subtítulo)
- Novo: **“De estratégia à execução: copy, criativos, distribuição, análise e otimização contínua.”**

### CTA Hero
- Primário: **“Ver Cases”**
- Secundário: **“Agendar Diagnóstico”** (substituir “Fale Conosco” quando possível)

## 2) Serviços - correções obrigatórias
### /servicos/marketing-conteudo
- “Conteúdo fundamento em dados...” -> **“Conteúdo fundamentado em dados...”**
- Revisar concordância:
  - “conteúdo personalizado que transformam” -> **“conteúdo personalizado que transforma”**
  - “Textos persuasivos que converte” -> **“Textos persuasivos que convertem”**

### /servicos/growth-lancamentos
Substituir termos agressivos/arriscados:
- “vendem como loucos” -> **“geram vendas com consistência”**
- “ROI Positivo Garantido” -> **“Foco em ROI Positivo”**
- “Resultados garantidos” -> **“Resultados orientados por método, teste e otimização”**
- “Garanted Positive ROI” -> **“ROI-Driven Growth”**

### /servicos/ia-automacoes
- “Resume seus emails” -> **“Resume seus e-mails”**

## 3) Cases e dados estruturados de case
No arquivo de dados, corrigir:
- `Copywrite` -> **`Copywriting`**
- “anuncios” -> **“anúncios”**
- “Fizemos edição de reels ara ela” -> **“Fizemos edição de reels para ela”**

## 4) Tom institucional
Evitar texto com promessa absoluta ou hipérbole agressiva em toda a base.
Substituir por:
- “com método”, “com previsibilidade”, “com dados”, “com otimização contínua”.

---

## Ajustes de Design (sistema visual)

## 1) Consistência de linguagem visual
Problema atual: cada página de serviço parece “produto diferente”.

Implementar:
1. Grid base e espaçamento consistentes (`section` com padrão fixo).
2. Mesmo padrão de título/subtítulo/CTA em todas as páginas de serviço.
3. Mesmo tipo de card para blocos de benefício e problema/solução.
4. Reduzir variação extrema de fundos (preto total vs branco total) no mesmo fluxo.

## 2) Home por dobra (layout)
1. Hero: manter impacto, reduzir ruído visual.
2. Trusted by: agrupar logos por categoria ao passar mouse (Exchange, Educação, Creator, Infra).
3. Serviços: reduzir densidade textual e aumentar leitura em 2-3 bullets por card.
4. Processo: manter 3 passos, mas adicionar micro prova por passo (ex.: “+X projetos nessa etapa”).
5. Cases: inserir chips por objetivo (Aquisição, Conteúdo, Lançamento, Automação).
6. CTA Ajuda: limitar lista visível inicial a 8 serviços + botão “Ver mais”.

## 3) UX Mobile
1. Reduzir altura de cards no carousel.
2. Aumentar área de toque em botões secundários.
3. Evitar blocos muito longos sem respiro vertical.
4. Garantir contraste AA em botões coloridos.

---

## Estrutura sugerida por página de serviço
Aplicar o mesmo template nas 3 páginas:
1. Hero (dor principal + promessa + CTA)
2. O que fazemos (3-4 entregáveis objetivos)
3. Como fazemos (processo em 3 passos)
4. Provas (cases e métricas)
5. FAQ curta (3-5 perguntas)
6. CTA final (diagnóstico)

---

## Melhorias de Conversão

## 1) CTA
- Padrão principal: **“Agendar Diagnóstico”**
- Padrão secundário: **“Falar no WhatsApp”**

## 2) Formulário de qualificação (novo bloco)
Adicionar formulário curto (além de WhatsApp):
- Nome
- Empresa/projeto
- Canal principal
- Objetivo (leads, vendas, audiência, automação)
- Faixa de investimento mensal
- Prazo para começar

## 3) Tracking
Eventos mínimos:
- Click CTA hero
- Click CTA serviço
- Click WhatsApp
- Submit formulário
- Scroll 50%/75%
- Click “Ver case”

---

## SEO e Técnica

## 1) Correções imediatas
1. Canonical por página (não só `/`).
2. Remover códigos de verificação placeholder.
3. Revisar títulos e metas por rota.
4. Padronizar Open Graph por página de serviço/case.

## 2) i18n
- Manter PT/EN, mas padronizar consistência de tradução.
- Garantir que todos os textos críticos tenham versão EN equivalente.

---

## Arquivos-alvo principais
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/i18n/dictionaries.ts`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/lib/case-data.ts`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/app/page.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/components/ui/hero-kaleidos.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/components/bento-grid.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/components/cases-carousel.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/components/ui/cta-ajuda.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/app/servicos/marketing-conteudo/page.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/app/servicos/growth-lancamentos/page.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/app/servicos/ia-automacoes/page.tsx`
- `/Users/gabrielmadureira/GOS/01 - KALEIDOS/012 - INTERNO/02 - PROJETOS/SITE-KALEIDOS/src/app/layout.tsx`

---

## Checklist de Aceite
- [ ] Sem erros de ortografia/concordância nas páginas principais.
- [ ] Sem claims de resultado garantido.
- [ ] Headline + subheadline da home mais específicas.
- [ ] Páginas de serviço com mesma estrutura de seção.
- [ ] Cases com métricas comparáveis e leitura rápida.
- [ ] CTA principal consistente no site inteiro.
- [ ] Canonical e metadata ajustados por página.
- [ ] Tracking dos CTAs validado.
- [ ] QA mobile concluído.

---

## Prompt pronto para enviar a uma IA implementadora
"""
Você vai atualizar o site da Kaleidos (Next.js) com foco em copy e design de conversão.

Objetivo:
1) corrigir erros de linguagem,
2) remover claims arriscadas,
3) padronizar estrutura visual e narrativa,
4) melhorar conversão.

Siga este plano estritamente:
- Prioridade P0 > P1 > P2.
- Faça alterações nos arquivos-alvo indicados.
- Preserve rotas e estrutura técnica.
- Mantenha PT/EN consistentes.
- Não use linguagem de garantia de resultado.
- Unifique CTA principal para “Agendar Diagnóstico” (com WhatsApp como secundário).
- Entregue diff por arquivo e resumo final com o que foi alterado.

Ajustes obrigatórios de texto:
- “Conteúdo fundamento em dados” -> “Conteúdo fundamentado em dados”
- “Resume seus emails” -> “Resume seus e-mails”
- “Copywrite” -> “Copywriting”
- remover “ROI garantido” / “Resultados garantidos” / “vendem como loucos”.

Ajustes obrigatórios de design:
- Padronizar estrutura das 3 páginas de serviço.
- Melhorar legibilidade mobile e consistência de espaçamento.
- Manter identidade premium, com menos variação abrupta entre páginas.

No final, entregue:
1) lista de arquivos editados,
2) mudanças de copy,
3) mudanças de layout,
4) mudanças de SEO/tracking,
5) pendências se houver.
"""
