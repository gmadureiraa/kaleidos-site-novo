import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew37: BlogPost[] = [
  {
    slug: "problemas-criticos-seo-tecnico",
    title: "Problemas críticos de SEO técnico que derrubam o seu ranking (e como achar)",
    seoTitle: "Problemas críticos de SEO técnico que derrubam seu ranking | Kaleidos",
    excerpt:
      "Conteúdo bom não rankeia se o Google não consegue rastrear, renderizar e indexar o site. A Kaleidos lista os 7 problemas de SEO técnico que mais derrubam rankings, como diagnosticar cada um e como corrigir antes que o tráfego evapore.",
    seoDescription:
      "Guia da Kaleidos sobre os 7 problemas de SEO técnico que mais derrubam rankings: crawl, indexação, Core Web Vitals, canonical, schema, JavaScript e sitemap.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-16",
    readTime: 11,
    featured: false,
    coverImage: "",
    tags: [
      "SEO técnico",
      "crawl budget",
      "indexação Google",
      "Core Web Vitals",
      "canonical",
      "dados estruturados",
      "JavaScript SEO",
      "sitemap XML",
    ],
    tldr:
      "A maior parte das quedas de ranking que parecem misteriosas tem causa técnica: crawl bloqueado por robots.txt ou desperdiçado em URLs parametrizadas, páginas descobertas mas nunca indexadas, Core Web Vitals reprovados no CrUX, canonicals conflitantes, schema quebrado, conteúdo que só existe depois da renderização de JavaScript e sitemaps desatualizados apontando para redirects e 404. O diagnóstico começa no Search Console e nos relatórios de cobertura; a correção segue uma ordem de prioridade: primeiro garantir que o Google acessa, depois que indexa, depois que entende e só então otimizar velocidade e rich results.",
    faq: [
      {
        question: "Como saber se meu site tem problema de SEO técnico ou de conteúdo?",
        answer:
          "Comece pelo relatório de indexação do Google Search Console. Se páginas importantes aparecem como 'Rastreada, mas não indexada', 'Descoberta, mas não rastreada' ou 'Página alternativa com tag canônica adequada', o problema é técnico. Se as páginas estão indexadas mas não rankeiam, a questão tende a ser conteúdo, autoridade ou concorrência. Uma queda brusca de impressões em todo o site quase sempre indica causa técnica; queda gradual em páginas específicas costuma ser conteúdo perdendo relevância.",
      },
      {
        question: "O que significa 'Rastreada, mas não indexada' no Search Console?",
        answer:
          "Significa que o Googlebot visitou a página, mas decidiu não colocá-la no índice. As causas mais comuns são conteúdo raso ou duplicado, sinais de qualidade fracos no domínio, canonical apontando para outra URL e excesso de páginas parecidas competindo entre si. A correção passa por consolidar páginas similares, enriquecer o conteúdo das que importam e remover ou marcar com noindex as que não deveriam existir.",
      },
      {
        question: "Core Web Vitals ruins realmente derrubam ranking?",
        answer:
          "São um fator de desempate, não o fator principal. A documentação do Google (2023) confirma que os Core Web Vitals fazem parte dos sistemas de experiência de página, com peso menor que relevância e qualidade de conteúdo. Na prática, em disputas acirradas de primeira página, um site reprovado no CrUX perde posições para concorrentes equivalentes que passam nas métricas. E o efeito indireto é grande: página lenta aumenta rejeição e reduz conversão independentemente de ranking.",
      },
      {
        question: "Meu site em React ou Next.js pode ter problema de indexação?",
        answer:
          "Pode, se o conteúdo crítico só existir após a execução de JavaScript no navegador. O Google renderiza JavaScript, mas em uma segunda etapa que pode demorar, e nem todo conteúdo renderizado no cliente é processado de forma confiável. A recomendação é servir o conteúdo principal no HTML inicial via renderização no servidor (SSR) ou geração estática (SSG), reservando o client-side rendering para elementos interativos que não precisam rankear.",
      },
      {
        question: "Com que frequência devo fazer auditoria de SEO técnico?",
        answer:
          "Uma auditoria completa a cada trimestre e monitoramento contínuo dos sinais críticos: relatório de indexação do Search Console semanalmente, Core Web Vitals mensalmente e um crawl automatizado (Screaming Frog ou similar) após qualquer deploy que mexa em rotas, templates ou infraestrutura. A maioria dos desastres técnicos de SEO nasce em um deploy de sexta-feira que ninguém auditou.",
      },
    ],
    content: `# Problemas críticos de SEO técnico que derrubam o seu ranking (e como achar)

Existe um padrão que a Kaleidos vê se repetir: o time investe meses em conteúdo, constrói backlinks, faz tudo "certo" e o tráfego orgânico despenca mesmo assim. Quando a queda é brusca e generalizada, a causa quase nunca é o conteúdo. É técnica.

SEO técnico é a fundação invisível do ranking. O Google precisa conseguir rastrear o site, renderizar as páginas, indexá-las e entender o que cada uma significa. Qualquer falha nessa cadeia anula o trabalho de conteúdo por completo: a melhor página do mundo não rankeia se o Googlebot não consegue chegar nela.

Neste guia, a Kaleidos destrincha os 7 problemas de SEO técnico que mais derrubam rankings na prática, com o diagnóstico e a correção de cada um.

## Principais takeaways

- **Queda brusca e generalizada de tráfego orgânico quase sempre tem causa técnica**, não de conteúdo. O primeiro lugar para olhar é o relatório de indexação do Google Search Console.
- **Crawl vem antes de tudo**: robots.txt mal configurado, cadeias de redirect e URLs parametrizadas infinitas desperdiçam o orçamento de rastreamento nas páginas erradas.
- **Indexada é diferente de rastreada**: páginas podem ser visitadas pelo Googlebot e nunca entrar no índice. Os status do Search Console dizem exatamente onde a cadeia quebrou.
- **Core Web Vitals são desempate**, mas em nichos competitivos o desempate decide a primeira página. O que vale é o dado de campo do CrUX, não o teste de laboratório.
- **Canonical, schema e sitemap são declarações que precisam ser consistentes entre si.** Sinais conflitantes fazem o Google ignorar suas instruções e decidir sozinho.
- **JavaScript renderizado no cliente é o risco silencioso de sites modernos**: o conteúdo que só existe depois da hidratação pode nunca ser indexado de forma confiável.

## 1. Problemas de crawl: o Google nem chega na página

Antes de indexar, o Google precisa rastrear. E o rastreamento tem um orçamento: o Googlebot não visita infinitas URLs do seu site, ele prioriza conforme a autoridade e a saúde técnica do domínio. A documentação do Google sobre crawl budget (Google Search Central, 2024) é explícita: sites que desperdiçam rastreamento em URLs inúteis atrasam a descoberta das páginas que importam.

Os vilões clássicos:

- **robots.txt bloqueando o que não devia.** Um \`Disallow: /\` esquecido de um ambiente de staging que foi para produção. Bloqueio de diretórios de CSS e JS que impede a renderização correta. Regras genéricas demais que pegam páginas importantes de tabela.
- **Cadeias e loops de redirect.** Cada salto de redirect consome uma requisição do orçamento. Cadeias com 3 ou mais saltos fazem o Googlebot desistir no meio do caminho.
- **URLs parametrizadas infinitas.** Filtros de e-commerce, ordenações e parâmetros de sessão criam milhões de combinações de URL com o mesmo conteúdo. O Googlebot se perde nelas e deixa de rastrear o catálogo real.
- **Erros 5xx recorrentes.** Quando o servidor responde com erro com frequência, o Google reduz automaticamente a taxa de rastreamento para não derrubar o site.

**Como achar:** no Search Console, abra Configurações > Estatísticas de rastreamento. Veja quantas requisições vão para páginas reais versus parâmetros, redirects e erros. Complemente com um crawl no Screaming Frog simulando o Googlebot e analise os logs do servidor se tiver acesso: o log não mente sobre onde o bot gasta tempo.

**Como corrigir:** revise o robots.txt linha por linha, achate redirects para um único salto, use \`Disallow\` de parâmetros de filtro que não geram páginas únicas e monitore a taxa de erro 5xx no relatório de estatísticas de rastreamento.

## 2. Problemas de indexação: rastreada não significa indexada

Este é o problema mais mal compreendido de SEO técnico. O site pode estar perfeitamente rastreável e ainda assim ter metade das páginas fora do índice. O Google rastreia, avalia e decide se vale a pena indexar. Cada vez mais, a resposta é não.

Os status do relatório de indexação do Search Console contam a história:

- **"Descoberta, mas não rastreada ainda":** o Google sabe que a URL existe mas não priorizou a visita. Sintoma de crawl budget apertado ou de site com sinais fracos.
- **"Rastreada, mas não indexada":** o Googlebot visitou e decidiu não indexar. Sintoma de conteúdo raso, duplicado ou de baixa qualidade percebida.
- **"Página alternativa com tag canônica adequada":** o Google consolidou aquela URL em outra. Correto quando intencional, desastroso quando a canonical está errada.
- **"Excluída pela tag noindex":** alguém deixou um \`noindex\` esquecido, geralmente herdado de staging ou aplicado por plugin.

**Como achar:** Search Console > Indexação > Páginas. Exporte a lista de páginas não indexadas e classifique por padrão de URL. Se as suas páginas de dinheiro (produto, serviço, artigos-chave) aparecem em qualquer status de exclusão, você achou o incêndio. Use a Inspeção de URL para ver a página exatamente como o Google a vê.

**Como corrigir:** remova noindex indevidos, consolide conteúdos duplicados ou rasos em páginas mais fortes, corrija canonicals erradas e reduza a quantidade de URLs de baixo valor competindo pelo orçamento. Menos páginas melhores indexam mais do que muitas páginas medianas.

## 3. Core Web Vitals reprovados: a experiência que vira ranking

Os Core Web Vitals medem a experiência real de carregamento: **LCP** (Largest Contentful Paint, ideal abaixo de 2,5 s), **INP** (Interaction to Next Paint, que substituiu o FID em março de 2024, ideal abaixo de 200 ms) e **CLS** (Cumulative Layout Shift, ideal abaixo de 0,1). A documentação do Google (2023) posiciona as métricas como parte dos sistemas de experiência de página: não é o fator dominante, mas desempata disputas entre resultados de qualidade equivalente.

O detalhe que quase todo mundo erra: **o que conta é o dado de campo do CrUX** (Chrome User Experience Report), coletado de usuários reais do Chrome ao longo de 28 dias. Passar no teste de laboratório do Lighthouse não garante nada se os usuários reais, em rede móvel, têm experiência ruim.

**Como achar:** Search Console > Experiência > Core Web Vitals mostra o dado de campo agrupado por padrão de URL. O PageSpeed Insights mostra campo e laboratório lado a lado. Se o campo reprova e o laboratório aprova, o problema está em condições reais: dispositivos modestos, redes lentas, third-party scripts.

**Como corrigir:** para LCP, otimize a imagem ou o texto principal acima da dobra (formato moderno, preload, servidor rápido). Para INP, corte JavaScript de terceiros e quebre tarefas longas na thread principal. Para CLS, reserve espaço fixo para imagens, embeds e anúncios com dimensões explícitas no HTML.

## 4. Canonicals conflitantes: quando você confunde o Google

A tag canonical diz ao Google qual versão de uma página é a oficial. O problema é que ela é uma sugestão, não uma ordem: quando os sinais se contradizem, o Google escolhe sozinho, e escolhe errado com frequência.

Os conflitos clássicos:

- Canonical apontando para uma URL que redireciona ou retorna 404.
- Páginas paginadas (página 2, 3, 4) todas com canonical para a página 1, escondendo o conteúdo profundo.
- Versões http/https ou com/sem www misturadas, cada uma com sua canonical.
- Canonical dizendo uma coisa e o sitemap listando outra URL.
- Parâmetros de tracking (utm) gerando variações indexáveis sem canonical consistente.

**Como achar:** na Inspeção de URL do Search Console, compare "Canonical declarada pelo usuário" com "Canonical escolhida pelo Google". Quando divergem, o Google está ignorando a sua instrução. Um crawl do site inteiro revela canonicals quebradas, em cadeia ou apontando para redirects.

**Como corrigir:** toda página indexável deve ter canonical autorreferente apontando para a versão final da URL (https, com ou sem www, sem parâmetros). Sitemap, links internos e canonical precisam contar a mesma história, sempre.

## 5. Schema markup quebrado ou ausente: invisível para rich results

Dados estruturados (schema.org) não são fator direto de ranking, mas controlam algo tão valioso quanto posição: **a aparência do resultado**. Avaliações com estrelas, FAQ, breadcrumbs, dados de produto com preço e disponibilidade. Um resultado enriquecido em terceiro lugar pode capturar mais cliques que um resultado seco em primeiro.

Os problemas comuns:

- JSON-LD com erro de sintaxe (vírgula sobrando, aspas erradas) que invalida o bloco inteiro.
- Schema que descreve conteúdo que não existe visível na página, o que viola as diretrizes do Google e pode gerar ação manual.
- Campos obrigatórios ausentes: um Product sem \`offers\`, um Article sem \`datePublished\`.
- Tipos genéricos demais quando existe tipo específico (usar WebPage onde caberia FAQPage ou HowTo).

**Como achar:** o Teste de Pesquisa Aprimorada do Google (Rich Results Test) valida página por página. O Search Console agrega erros de dados estruturados por tipo no menu de melhorias. O validador do schema.org pega problemas de sintaxe que o teste do Google às vezes releva.

**Como corrigir:** padronize JSON-LD (formato recomendado pelo Google), gere o markup dinamicamente a partir dos mesmos dados que renderizam a página (nunca à mão, em paralelo) e priorize os tipos com rich result real: Article, Product, FAQ, Organization, BreadcrumbList.

## 6. JavaScript rendering: o conteúdo que o Google talvez nunca veja

Sites modernos em React, Vue ou Angular carregam um HTML quase vazio e constroem o conteúdo no navegador. O Google processa JavaScript, mas a documentação do Google Search Central (2024) descreve o processo em duas ondas: primeiro o HTML bruto, depois a renderização, que entra numa fila e pode levar tempo. Tudo que depende dessa segunda onda rankeia mais devagar e com menos confiabilidade, e alguns bots de outras plataformas simplesmente não renderizam nada.

Sinais de problema:

- O conteúdo principal, títulos e links internos só aparecem depois da hidratação.
- Links implementados com \`onclick\` em vez de tags \`<a href>\` reais, invisíveis para o crawler.
- Metadados (title, canonical, meta description) alterados via JavaScript depois do carregamento.
- Conteúdo carregado sob demanda por scroll infinito sem paginação alternativa.

**Como achar:** desative o JavaScript no navegador e recarregue a página: o que sumiu é o que está em risco. Compare o HTML de "Exibir código-fonte" com o DOM renderizado. Na Inspeção de URL do Search Console, o screenshot e o HTML renderizado mostram o que o Google efetivamente processou.

**Como corrigir:** sirva o conteúdo crítico no HTML inicial com SSR ou SSG (Next.js, Nuxt e afins resolvem isso nativamente). Use tags \`<a>\` reais para toda navegação. Deixe o client-side rendering apenas para interatividade que não precisa rankear.

## 7. Sitemap desatualizado: o mapa que mente

O sitemap XML é a lista oficial de URLs que você quer no índice. Quando ele mente, o Google perde a confiança no arquivo e passa a ignorá-lo, e você perde o canal mais direto de comunicação de URLs novas.

Como os sitemaps apodrecem:

- URLs que retornam 404 ou 301 continuam listadas meses depois da mudança.
- Páginas com noindex ou bloqueadas no robots.txt aparecem no sitemap (sinal contraditório).
- O sitemap é estático e ninguém regenera desde o último redesign.
- \`lastmod\` igual para todas as URLs ou sempre igual à data de hoje, o que faz o Google ignorar o campo.
- Páginas novas demoram semanas para entrar no arquivo.

**Como achar:** no Search Console, o relatório de Sitemaps mostra quantas URLs enviadas foram indexadas; discrepância grande entre enviadas e indexadas indica problema no arquivo ou nas páginas. Rode um crawl usando o sitemap como fonte e verifique o status code de cada URL: qualquer coisa diferente de 200 com canonical autorreferente é lixo no mapa.

**Como corrigir:** gere o sitemap dinamicamente a partir do banco de dados ou CMS, inclua apenas URLs indexáveis com status 200, use \`lastmod\` verdadeiro e divida sites grandes em sitemaps por seção para isolar problemas por área.

## Por onde começar: a ordem do diagnóstico

Auditar tudo ao mesmo tempo paralisa. A sequência que a Kaleidos usa segue a cadeia lógica do Google:

1. **Acesso:** robots.txt, status codes, redirects, erros 5xx. Se o Google não chega, nada mais importa.
2. **Indexação:** relatório de páginas do Search Console, noindex, canonicals. Página fora do índice não rankeia.
3. **Compreensão:** renderização de JavaScript, dados estruturados, consistência de sinais.
4. **Experiência:** Core Web Vitals de campo, mobile, estabilidade visual.

Ferramentas mínimas do kit: Google Search Console (obrigatório e gratuito), um crawler como Screaming Frog, PageSpeed Insights para as métricas de campo e, quando possível, análise de logs do servidor. Com isso, 90% dos problemas desta lista aparecem em uma tarde de auditoria.

## O ranking se perde no invisível

Nenhum desses 7 problemas aparece olhando para o site no navegador. O layout carrega, o texto está lá, tudo parece normal, e o tráfego cai mês após mês. SEO técnico é exatamente isso: a diferença entre o que o usuário vê e o que o Google consegue processar.

A boa notícia é que problema técnico, ao contrário de autoridade de domínio, se corrige rápido. Um noindex removido, um canonical consertado ou um sitemap regenerado pode devolver páginas ao índice em dias.

Se o seu tráfego orgânico caiu e você não sabe por quê, ou se quer garantir que a fundação técnica não está sabotando o investimento em conteúdo, a Kaleidos audita, diagnostica e corrige. [Fale com a gente](/contato) e descubra o que o Google está vendo (ou deixando de ver) no seu site.
`,
  },
];
