import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew38: BlogPost[] = [
  {
    slug: "auditoria-google-ads-guia",
    title: "Como fazer uma auditoria de Google Ads (checklist passo a passo)",
    seoTitle: "Auditoria de Google Ads: checklist passo a passo | Kaleidos",
    excerpt:
      "A maioria das contas de Google Ads queima orçamento em silêncio: keywords irrelevantes, tracking quebrado e estrutura confusa. A Kaleidos mostra o checklist completo de auditoria, da estrutura da conta ao corte de desperdício.",
    seoDescription:
      "Checklist completo da Kaleidos para auditar Google Ads: estrutura de conta, keywords e negativas, match types, quality score, tracking de conversão e orçamento.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "",
    tags: [
      "auditoria google ads",
      "google ads",
      "tráfego pago",
      "palavras-chave negativas",
      "quality score",
      "tracking de conversão",
      "otimização de campanhas",
      "mídia paga",
    ],
    tldr:
      "Auditoria de Google Ads é um processo, não um olhar rápido no painel. Comece pelo tracking de conversão (se ele mente, tudo mente), depois revise estrutura de conta, termos de pesquisa, negativas, match types, quality score e alocação de orçamento. O objetivo final é um mapa claro de onde o dinheiro vaza e um plano de correção priorizado.",
    faq: [
      {
        question: "Com que frequência devo auditar minha conta de Google Ads?",
        answer:
          "Uma auditoria completa a cada trimestre é um bom ritmo para a maioria das contas. Contas com investimento alto ou mudanças frequentes (novos produtos, novas campanhas, troca de agência) pedem revisões mensais mais leves, focadas em termos de pesquisa, tracking e alocação de orçamento.",
      },
      {
        question: "Por onde começar uma auditoria de Google Ads?",
        answer:
          "Pelo tracking de conversão. Antes de julgar qualquer campanha, confirme que as conversões registradas correspondem a eventos reais de negócio (leads válidos, compras confirmadas) e que não há contagem duplicada. Se o dado de conversão está errado, toda análise em cima dele leva a decisões erradas.",
      },
      {
        question: "O que são palavras-chave negativas e por que importam tanto?",
        answer:
          "Negativas são termos para os quais você NÃO quer aparecer. Elas impedem que anúncios sejam exibidos em pesquisas irrelevantes, como 'grátis', 'vaga de emprego' ou nomes de concorrentes que você não quer disputar. Sem listas de negativas bem mantidas, uma parte relevante do orçamento vai para cliques que nunca converteriam.",
      },
      {
        question: "Quality Score baixo significa que devo pausar a keyword?",
        answer:
          "Não necessariamente. Quality Score baixo indica desalinhamento entre keyword, anúncio e landing page. Antes de pausar, verifique se o anúncio responde à intenção da pesquisa e se a página entrega o que o anúncio promete. Se a keyword é estratégica, vale corrigir relevância e experiência. Pausar é a última opção, para termos que não têm fit com a oferta.",
      },
      {
        question: "Quanto tempo leva uma auditoria completa de Google Ads?",
        answer:
          "Depende do tamanho da conta. Uma conta pequena, com poucas campanhas, pode ser auditada em algumas horas. Contas maiores, com dezenas de campanhas, histórico longo e múltiplos tipos de campanha (Search, Performance Max, Display, YouTube), costumam exigir alguns dias entre levantamento, análise e plano de correção priorizado.",
      },
    ],
    content: `# Como fazer uma auditoria de Google Ads (checklist passo a passo)

Toda conta de Google Ads acumula gordura com o tempo. Keywords que faziam sentido em 2023 e hoje só queimam verba. Campanhas duplicadas disputando o mesmo leilão. Conversões contadas duas vezes inflando o ROAS no relatório. Orçamento concentrado no que é confortável, não no que performa.

O problema é que nada disso aparece de forma óbvia no painel. O Google Ads foi desenhado para mostrar atividade, não para apontar desperdício. Impressões sobem, cliques acontecem, o gráfico se mexe. E enquanto isso, uma fatia do investimento escorre por termos de pesquisa irrelevantes e tracking mal configurado.

Uma auditoria séria resolve isso. Não é "dar uma olhada na conta". É um processo estruturado, com ordem definida, que termina em duas coisas: um diagnóstico honesto de onde o dinheiro vaza e um plano de correção priorizado por impacto.

Neste guia, a Kaleidos compartilha o checklist que usa para auditar contas de Google Ads, na ordem em que ele deve ser executado.

## Principais takeaways

- **Comece sempre pelo tracking.** Se as conversões estão erradas, toda a análise que vem depois está contaminada. Auditar campanhas antes de auditar medição é perder tempo.
- **O relatório de termos de pesquisa é onde o desperdício aparece.** É lá que você vê o que as pessoas realmente digitaram, não o que você imaginou que digitariam.
- **Menos estrutura, mais dados por campanha.** Contas fragmentadas em dezenas de campanhas pequenas espalham dados e atrapalham o aprendizado dos lances automáticos.
- **Quality Score é sintoma, não doença.** Nota baixa indica desalinhamento entre keyword, anúncio e landing page. Trate a causa, não o número.
- **Auditoria termina em plano, não em relatório.** Uma lista de 40 problemas sem priorização não muda nada. Priorize por impacto financeiro e esforço de correção.

## Antes de começar: defina o contexto

Auditoria sem contexto vira checklist burocrático. Antes de abrir a conta, responda três perguntas:

- **Qual é o objetivo de negócio?** Leads qualificados, vendas de e-commerce, agendamentos, downloads. Cada objetivo muda o que é "bom".
- **Qual é a economia da conta?** Quanto vale uma conversão, qual CPA é aceitável, qual margem sustenta o CAC atual.
- **Qual é o período de análise?** Use no mínimo 90 dias para ter volume estatístico. Períodos curtos demais escondem padrões e amplificam ruído.

Com isso definido, siga o checklist na ordem abaixo. A ordem importa.

## Passo 1: tracking e conversões (a fundação)

Nada na conta pode ser julgado antes de validar a medição. Verifique:

- **Quais ações contam como conversão.** Abra Metas > Conversões e liste tudo que está marcado como conversão principal. É comum encontrar pageviews, cliques em botão e microconversões inflando o número que alimenta o Smart Bidding.
- **Contagem duplicada.** Conversões importadas do GA4 somadas às da tag do Google Ads medindo o mesmo evento é um erro clássico. Escolha uma fonte por evento.
- **Configuração de contagem.** Leads devem contar "uma por clique"; compras, "todas". Formulário contado como "todas" gera conversões fantasma quando o usuário reenvia a página.
- **Janela de conversão coerente com o ciclo de venda.** Ciclo de decisão de 60 dias com janela de 7 dias subestima resultado real.
- **Conversões avançadas (enhanced conversions) ativas.** Com a perda progressiva de cookies de terceiros, o envio de dados first-party via hash melhora a atribuição. O próprio Google recomenda a configuração como padrão na documentação oficial de conversões (Google, 2025).
- **Teste real de ponta a ponta.** Preencha o formulário, faça uma compra de teste. Confirme que o evento chega com o valor certo.

Se encontrar problemas aqui, pare e corrija antes de seguir. Auditar performance com dados quebrados é analisar ficção.

## Passo 2: estrutura da conta

Estrutura ruim não aparece em nenhuma métrica isolada, mas degrada tudo. Avalie:

- **Quantidade de campanhas versus volume de dados.** Lances automáticos aprendem por campanha. Dez campanhas com 5 conversões mensais cada aprendem menos do que duas campanhas com 25. Consolidar costuma ser a recomendação, e é o que a análise da Optmyzr sobre mais de 12 mil contas apontou: contas mais enxutas tendem a performar melhor (Optmyzr, 2023).
- **Sobreposição entre campanhas.** Duas campanhas Search com keywords parecidas disputam o mesmo leilão. Verifique no relatório de termos de pesquisa se o mesmo termo aciona campanhas diferentes.
- **Separação por intenção, não por vaidade organizacional.** Marca separada de genérico. Fundo de funil separado de topo. Essa separação permite orçamentos e metas de CPA distintos onde realmente importa.
- **Performance Max canibalizando Search.** PMax pode cobrir termos que suas campanhas de Search já cobrem. Analise para onde os termos de marca estão indo e use exclusões de marca na PMax se necessário.
- **Nomenclatura e organização.** Parece detalhe, mas conta sem padrão de nomes é conta onde ninguém sabe o que cada campanha faz. Isso custa tempo de gestão todo mês.

## Passo 3: termos de pesquisa e palavras-chave negativas

Aqui mora o desperdício mais visível de qualquer conta. O relatório de termos de pesquisa mostra o que as pessoas digitaram de verdade antes de clicar no seu anúncio.

O processo:

1. Exporte os termos de pesquisa dos últimos 90 dias, ordenados por custo.
2. Classifique cada termo relevante em três grupos: converte, é relevante mas não converteu ainda, é irrelevante.
3. Some o custo do grupo irrelevante. Esse número é o seu desperdício mensurável, e costuma ser o argumento mais forte de toda a auditoria.
4. Transforme os irrelevantes em negativas, no nível certo (campanha ou lista compartilhada).

Sinais de alerta específicos:

- Termos com "grátis", "curso", "vaga", "o que é" em campanhas de fundo de funil.
- Pesquisas de concorrentes que você não decidiu conscientemente disputar.
- Termos genéricos demais acionados por broad match sem lance inteligente maduro.
- Listas de negativas que não recebem manutenção há meses. Negativas não são configuração única, são rotina.

Verifique também o inverso: negativas conflitantes que bloqueiam termos que convertem. Acontece mais do que parece, principalmente em contas que passaram por várias mãos.

## Passo 4: tipos de correspondência (match types)

O broad match de hoje não é o de 2019, mas ainda exige supervisão. Audite:

- **Distribuição de match types na conta.** Broad match funciona bem quando acoplado a Smart Bidding com dados de conversão confiáveis. Broad match com lance manual ou com tracking frágil é receita para desperdício.
- **Frase e exata como âncoras de controle.** Em campanhas de fundo de funil e alto CPC, correspondência de frase e exata dão previsibilidade que o broad não dá.
- **Broad match sem volume de conversão de suporte.** Se a campanha tem poucas conversões mensais, o algoritmo não tem sinal suficiente para expandir o broad com qualidade. Nesses casos, restringir costuma ser mais eficiente.
- **Duplicidade entre match types.** A mesma keyword em exata e em broad dentro da mesma campanha raramente se justifica hoje, dado que o Google prioriza a exata idêntica ao termo pesquisado.

A pergunta guia deste passo: cada match type usado nessa conta foi uma decisão ou um padrão aceito sem pensar?

## Passo 5: Quality Score e relevância

O Quality Score tem três componentes visíveis na interface: CTR esperado, relevância do anúncio e experiência na página de destino. Adicione as colunas e analise keyword a keyword nas campanhas de maior investimento.

Como interpretar:

- **CTR esperado abaixo da média:** o anúncio não chama atenção para aquela intenção. Reescreva títulos trazendo o termo da pesquisa e a proposta de valor.
- **Relevância do anúncio abaixo da média:** a keyword está num grupo de anúncios genérico demais. Reagrupe por tema de intenção.
- **Experiência da página abaixo da média:** a landing page não entrega o que o anúncio promete, carrega devagar ou não funciona bem no mobile. Esse componente costuma ser o mais negligenciado, porque a correção sai do Google Ads e entra no site.

Nota baixa em keyword estratégica não é motivo para pausa imediata. É um mapa do que corrigir. Quality Score alto reduz CPC efetivo para a mesma posição, então melhorar relevância é literalmente pagar mais barato pelo mesmo clique.

Aproveite este passo para auditar os anúncios em si: responsivos de pesquisa com o máximo de títulos e descrições preenchidos, extensões (sitelinks, frases de destaque, snippets estruturados) completas e força do anúncio pelo menos "Boa".

## Passo 6: orçamento e alocação

A pergunta central: o dinheiro está onde o resultado está?

- **Campanhas limitadas por orçamento que batem a meta de CPA.** Se uma campanha converte dentro da meta e aparece como "limitada pelo orçamento", há resultado sendo deixado na mesa. Realoque de campanhas piores.
- **Campanhas que gastam sem converter há 90 dias.** Precisam de justificativa explícita (branding consciente, novo lançamento em aprendizado) ou de corte.
- **Distribuição entre marca e não-marca.** Campanhas de marca costumam ter CPA excelente, mas parte dessas conversões viria organicamente. Se a maior parte do orçamento está em marca, o número consolidado da conta parece ótimo e esconde a performance real da aquisição.
- **Estratégias de lance coerentes com o volume.** Metas de CPA agressivas demais em campanhas com pouco dado estrangulam a entrega. Metas frouxas demais deixam o algoritmo gastar sem disciplina.
- **Sazonalidade e ritmo de gasto.** Verifique se o orçamento mensal está sendo consumido de forma consistente ou se acaba no dia 20.

## Passo 7: consolidar o diagnóstico em plano

Auditoria que termina em PDF de 40 páginas sem priorização é teatro. Feche o processo com uma tabela simples de três colunas: problema encontrado, impacto estimado (em reais ou em conversões), esforço de correção.

Priorize assim:

1. **Imediato:** correções de tracking e negativas para termos irrelevantes de alto custo. Alto impacto, baixo esforço.
2. **Primeiras semanas:** consolidação de estrutura, realocação de orçamento, ajustes de match type.
3. **Primeiro trimestre:** reescrita de anúncios com Quality Score baixo, melhorias de landing page, testes de novas campanhas.

E defina a cadência de manutenção: revisão de termos de pesquisa a cada duas semanas, checagem de tracking mensal, auditoria completa por trimestre. Conta de Google Ads não fica saudável, ela é mantida saudável.

## O checklist resumido

Para consultar antes de qualquer auditoria:

- [ ] Conversões principais corretas, sem duplicidade, com contagem e janela adequadas
- [ ] Enhanced conversions ativas e teste de ponta a ponta feito
- [ ] Estrutura consolidada, sem campanhas disputando o mesmo leilão
- [ ] PMax sem canibalizar Search de marca
- [ ] Termos de pesquisa dos últimos 90 dias classificados e desperdício somado
- [ ] Listas de negativas atualizadas e sem conflitos
- [ ] Match types como decisão consciente, broad apenas com Smart Bidding maduro
- [ ] Quality Score analisado por componente nas keywords de maior gasto
- [ ] Anúncios responsivos completos e extensões preenchidas
- [ ] Orçamento realocado do que não converte para o que é limitado e converte
- [ ] Peso de marca versus não-marca conhecido e reportado separado
- [ ] Plano de correção priorizado por impacto e esforço, com cadência de manutenção

## Auditoria é onde a Kaleidos começa qualquer conta

Na Kaleidos, nenhuma conta de mídia paga entra em gestão sem passar por esse processo primeiro. Não por burocracia, mas porque otimizar em cima de tracking quebrado e estrutura confusa é acelerar na direção errada.

Se a sua conta de Google Ads gasta todo mês e você não sabe dizer com segurança quanto desse investimento vira resultado real, esse é exatamente o sinal de que uma auditoria está atrasada.

[Fale com a Kaleidos](/contato). A gente audita a conta, mostra em números onde o dinheiro está vazando e entrega o plano de correção priorizado, do tracking ao orçamento.`,
  },
];
