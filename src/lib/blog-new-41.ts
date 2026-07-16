import type { BlogPost } from "./blog-data";

const AUTHOR = { name: "Gabriel Madureira", avatar: "/Kaleidos/imagens/Equipe/Madureira.png" };

export const blogNew41: BlogPost[] = [
  {
    slug: "redesenhar-site-sem-perder-seo",
    title: "Como redesenhar seu site sem perder o SEO (checklist de migração)",
    seoTitle: "Como redesenhar site sem perder SEO: checklist de migração completo",
    excerpt:
      "Redesign de site é uma das formas mais comuns de destruir anos de trabalho de SEO. Este checklist de migração cobre mapeamento de URLs, redirects 301, preservação de conteúdo, staging e monitoramento pós-lançamento para trocar de site sem perder ranking.",
    seoDescription:
      "Checklist de migração para redesenhar seu site sem perder SEO: mapeamento de URLs, redirects 301, preservação de conteúdo, staging e monitoramento diário.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-16",
    readTime: 10,
    featured: false,
    coverImage: "",
    tags: [
      "redesign de site",
      "migração de site",
      "redirects 301",
      "SEO técnico",
      "mapeamento de URLs",
      "Google Search Console",
      "perda de tráfego orgânico",
      "checklist de migração",
    ],
    tldr:
      "Redesign sem plano de migração é a forma mais rápida de perder tráfego orgânico conquistado em anos. A regra da Kaleidos: inventariar todas as URLs antes de escrever uma linha do site novo, mapear redirects 301 um a um, preservar conteúdo e keywords das páginas que rankeiam, testar tudo em staging bloqueado e monitorar Search Console diariamente após o lançamento.",
    faq: [
      {
        question: "Redesenhar o site sempre derruba o SEO?",
        answer:
          "Não. O que derruba o SEO não é o visual novo, é a migração mal feita: URLs que mudam sem redirect 301, conteúdo que rankeava e foi apagado, títulos e headings reescritos sem critério, páginas que viraram JavaScript pesado sem renderização adequada. Um redesign que preserva URLs, conteúdo e estrutura de links internos tende a manter o ranking. O próprio Google documenta que mudanças apenas de design, sem mudança de URL, não exigem processo de migração.",
      },
      {
        question: "Preciso de redirect 301 mesmo se só mudarem algumas URLs?",
        answer:
          "Sim, para cada URL que mudar. O redirect 301 é o sinal que transfere a autoridade acumulada da URL antiga para a nova. Sem ele, o Google encontra um erro 404, a página perde as posições e os backlinks que apontavam para ela deixam de contar. A regra é redirecionar cada URL antiga para a página nova mais equivalente em conteúdo, nunca despejar tudo na home.",
      },
      {
        question: "Quanto tempo o Google demora para processar uma migração de site?",
        answer:
          "Depende do tamanho do site. A documentação do Google Search Central afirma que migrações de sites de porte médio levam algumas semanas para serem processadas, e sites maiores podem levar mais tempo. Durante esse período é normal ver flutuação de posições e de tráfego. O que não é normal é queda contínua depois de várias semanas, o que costuma indicar redirect quebrado, conteúdo removido ou problema de indexação.",
      },
      {
        question: "Posso lançar o site novo em staging aberto para o Google?",
        answer:
          "Não. Staging acessível e indexável cria conteúdo duplicado que compete com o site em produção e pode vazar para os resultados de busca antes do lançamento. O ambiente de testes precisa estar bloqueado: autenticação HTTP, noindex ou restrição por IP. E o passo mais esquecido é o inverso: remover esses bloqueios no dia do lançamento, porque um site novo publicado com noindex herdado do staging some do Google.",
      },
      {
        question: "O que monitorar no Search Console depois do lançamento?",
        answer:
          "Quatro frentes: cobertura de indexação (páginas novas sendo indexadas, erros 404 subindo), desempenho de busca (cliques e impressões das páginas que mais traziam tráfego antes), relatório de Core Web Vitals (o site novo pode ser mais pesado que o antigo) e inspeção de URL nas páginas mais importantes. Compare sempre contra o histórico pré-migração, semana contra semana, durante pelo menos dois meses.",
      },
    ],
    content: `# Como redesenhar seu site sem perder o SEO (checklist de migração)

Existe um padrão que a Kaleidos vê se repetir no mercado: a empresa investe meses em um site novo, lança com festa, e três semanas depois o tráfego orgânico despencou. O culpado quase nunca é o design. É a migração.

Redesign de site é uma operação de risco para SEO porque mexe simultaneamente em tudo que o Google usa para entender e rankear suas páginas: URLs, conteúdo, estrutura de headings, links internos, performance de carregamento. Quando essas mudanças acontecem sem plano, a autoridade construída ao longo de anos evapora, e recuperar posição perdida é muito mais caro do que preservá-la.

A boa notícia: perda de SEO em redesign é quase sempre evitável. O que separa uma migração limpa de um desastre é um checklist executado com disciplina, antes, durante e depois do lançamento. Este artigo é esse checklist.

## Principais takeaways

- O maior risco de um redesign não é o visual novo, é mudar URLs e conteúdo sem plano de migração.
- Inventarie todas as URLs do site atual antes de qualquer decisão sobre o site novo. O que você não mapeou, você vai quebrar.
- Cada URL que mudar precisa de um redirect 301 para a página equivalente mais próxima. Redirecionar tudo para a home destrói autoridade.
- Páginas que rankeiam e trazem tráfego devem ter conteúdo, título e headings preservados, ou alterados com critério de keyword, nunca reescritos por estética.
- Staging precisa estar bloqueado para indexação, e o bloqueio precisa ser removido no lançamento. Os dois erros acontecem com frequência.
- Depois do lançamento, monitore Search Console diariamente nas primeiras semanas. A documentação do Google Search Central indica que migrações de porte médio levam algumas semanas para serem processadas.

## Fase 1: inventário completo antes de tocar em qualquer coisa

A migração começa antes do primeiro wireframe. Se o time de design já está trabalhando e ninguém fez o inventário do site atual, pare e faça agora.

**1. Rastreie todas as URLs do site atual.** Use um crawler (Screaming Frog é o padrão do mercado) para extrair a lista completa de URLs, incluindo páginas, imagens, PDFs e arquivos que recebem links. Cruze com três fontes adicionais: o sitemap XML, o relatório de desempenho do Google Search Console e o analytics. O crawler mostra o que existe; Search Console e analytics mostram o que importa.

**2. Identifique as páginas que geram valor.** Nem toda URL merece o mesmo cuidado. Classifique por: tráfego orgânico dos últimos 12 meses, posições conquistadas (keywords em que a página rankeia), backlinks recebidos e conversões geradas. Essas são as páginas intocáveis da migração: o conteúdo delas se preserva, e qualquer mudança de URL exige redirect perfeito.

**3. Documente os elementos on-page das páginas importantes.** Para cada página do grupo de valor, registre: title tag, meta description, H1, estrutura de headings, keywords que trazem tráfego e links internos que apontam para ela. Esse documento vira o gabarito de conferência do site novo.

**4. Exporte a lista de backlinks.** Ferramentas como Ahrefs ou Semrush mostram quais URLs recebem links externos. Uma página com backlinks fortes que muda de URL sem redirect perde essa autoridade, e você não controla os sites que apontam para você.

## Fase 2: mapeamento de URLs e plano de redirects

Aqui mora a decisão mais importante da migração: quais URLs mudam e quais ficam.

**5. Mantenha as URLs sempre que possível.** A migração mais segura é a que não muda URL nenhuma. Se o site novo pode viver nas mesmas URLs do antigo, faça isso. O Google documenta que mudanças de design sem mudança de URL não exigem processo de migração de site. Cada URL preservada é um risco eliminado.

**6. Para as URLs que mudarem, crie o mapa um a um.** Monte uma planilha com duas colunas: URL antiga e URL nova. Cada URL antiga aponta para a página nova mais equivalente em conteúdo e intenção. Página de serviço antiga aponta para a página de serviço nova correspondente, post de blog aponta para o post migrado, categoria aponta para categoria.

**7. Nunca redirecione tudo para a home.** É o erro mais comum e um dos mais destrutivos. O Google trata redirect em massa para uma página irrelevante como soft 404: a autoridade não transfere e a página antiga sai do índice. Se uma página antiga não tem equivalente no site novo, avalie se ela deveria mesmo morrer (veja o item 9) ou aceite o 404 com página de erro útil.

**8. Use 301, não 302.** O redirect 301 sinaliza mudança permanente e transfere os sinais de ranking. O 302 sinaliza mudança temporária. Frameworks e CDNs às vezes aplicam 302 por padrão, então confira o código de status real de cada redirect, não só se "está redirecionando".

**9. Decida conscientemente o que morre.** Todo redesign é uma tentação para apagar conteúdo antigo. Antes de matar uma página, olhe os dados do inventário: se ela tem tráfego, posições ou backlinks, apagar é queimar patrimônio. Conteúdo datado pode ser atualizado ou consolidado em uma página mais forte (com redirect 301 para a página consolidada), o que costuma ser melhor do que deletar.

## Fase 3: preservar conteúdo, keywords e estrutura

O site novo não precisa ser uma cópia do antigo, mas as páginas que rankeiam rankeiam por um motivo.

**10. Preserve o conteúdo das páginas de valor.** Reescrever por completo uma página que está na primeira página do Google é apostar o ranking dela. Se o texto precisa mudar por marca ou tom, mantenha a cobertura do tema, as keywords principais e a profundidade. Corte de conteúdo relevante é lido pelo Google como perda de relevância.

**11. Confira title tags e headings contra o gabarito.** No redesign, é comum o time de design trocar H1 por frase de efeito e o desenvolvedor gerar titles genéricos. Use o documento da fase 1 para conferir que cada página importante mantém title e H1 alinhados com as keywords que trazem tráfego.

**12. Reconstrua os links internos.** Menus, footers e links contextuais dentro do texto distribuem autoridade pelo site. Se o site novo mudou a navegação, garanta que as páginas de valor continuam recebendo links internos de páginas fortes, e que nenhum link interno aponta para URL antiga (link interno que passa por redirect funciona, mas link direto é melhor).

**13. Cuidado com JavaScript pesado.** Muitos redesigns migram para frameworks modernos. Se o conteúdo só aparece depois de o JavaScript executar no navegador, a indexação pode ficar mais lenta ou incompleta. Prefira renderização no servidor (SSR) ou geração estática para conteúdo que precisa rankear, e valide com a ferramenta de inspeção de URL do Search Console como o Google enxerga a página.

**14. Não regrida em performance.** Core Web Vitals são fator de experiência de página. Sites redesenhados costumam nascer mais pesados: imagens maiores, mais fontes, mais scripts. Rode o Lighthouse e o PageSpeed Insights no staging e compare com o site atual antes de aprovar o lançamento.

## Fase 4: staging e testes pré-lançamento

**15. Bloqueie o staging para indexação.** O ambiente de testes não pode ser rastreável: use autenticação HTTP (a opção mais segura), noindex ou bloqueio por IP. Staging indexado cria duplicidade com o site em produção e pode aparecer no Google antes da hora.

**16. Teste o mapa de redirects no staging.** Rode o crawler sobre a lista de URLs antigas apontando para o ambiente de teste e confirme que cada uma responde 301 para o destino certo, em um único salto. Cadeias de redirect (A para B para C) desperdiçam rastreamento e diluem sinal; corrija para A direto para C.

**17. Valide os elementos técnicos de SEO.** Checklist do staging: sitemap XML novo gerado com as URLs finais, robots.txt correto (sem bloqueio herdado), canonical tags apontando para as próprias URLs de produção (não para o domínio de staging), dados estruturados válidos, meta robots sem noindex nas páginas públicas e hreflang correto se o site for multilíngue.

**18. Prepare o plano de rollback.** Se algo der muito errado no lançamento, você precisa conseguir voltar. Mantenha backup completo do site antigo e do banco, e defina antes quais métricas disparam a decisão de reverter.

## Fase 5: lançamento

**19. Escolha um momento de baixo tráfego e com o time disponível.** Lançar na sexta à noite sem ninguém de plantão na segunda é pedir para descobrir problemas com dias de atraso.

**20. Remova os bloqueios de staging.** O erro espelho do item 15: publicar o site novo com noindex ou robots.txt de bloqueio herdados do ambiente de teste. É um clássico que derruba sites inteiros do índice. Primeira conferência pós-deploy: robots.txt e meta robots em produção.

**21. Ative os redirects e teste na hora.** Rode o crawler sobre a lista completa de URLs antigas em produção. Toda URL antiga deve responder 301 para o destino certo. Erros 404 encontrados aqui se corrigem no mesmo dia.

**22. Envie o sitemap novo no Search Console.** Submeta o sitemap atualizado e use a inspeção de URL para pedir indexação das páginas mais importantes. Se a migração envolveu troca de domínio, use também a ferramenta de mudança de endereço do Search Console.

## Fase 6: monitoramento pós-lançamento

A migração não termina no deploy. As semanas seguintes decidem se o trabalho preservou o ranking.

**23. Monitore o Search Console diariamente nas duas primeiras semanas.** Olhe cobertura de indexação (404 subindo é redirect quebrado), desempenho de busca das páginas de valor (compare com o período pré-migração) e Core Web Vitals. Depois, acompanhe semanalmente por pelo menos dois meses.

**24. Acompanhe posições das keywords principais.** Flutuação nas primeiras semanas é esperada: a documentação do Google Search Central indica que migrações de porte médio levam algumas semanas para serem processadas. Queda que persiste e se aprofunda depois desse período é sintoma de problema real: vá atrás de redirects quebrados, conteúdo removido ou páginas fora do índice.

**25. Cace 404 e corrija em ciclo.** O relatório de páginas não encontradas do Search Console e os logs do servidor revelam URLs antigas que escaparam do mapa de redirects, inclusive URLs que só existiam em links externos. Adicione os redirects que faltam conforme aparecem.

**26. Documente tudo.** Registre a data da migração, o mapa de redirects e as mudanças feitas. Quando alguém perguntar em três meses por que uma métrica mudou, a resposta estará escrita.

## Erros que mais derrubam ranking em redesign

Recapitulando os padrões que a Kaleidos mais vê causar estrago:

1. **Mudar URLs sem redirect 301**, ou redirecionar tudo para a home.
2. **Apagar conteúdo que rankeava** porque "ficou velho" no layout novo.
3. **Reescrever titles e H1 por estética**, ignorando as keywords que sustentavam o tráfego.
4. **Lançar com noindex ou robots.txt de staging** herdados por acidente.
5. **Migrar para JavaScript pesado** sem SSR, escondendo o conteúdo do rastreador.
6. **Não monitorar depois do lançamento** e só perceber a queda quando o comercial sente falta de leads.

Nenhum desses erros é sofisticado. Todos são evitáveis com o checklist acima executado na ordem certa.

## Redesign é projeto de SEO, não só de design

Um site novo deveria ser um upgrade de tudo: marca, experiência e performance orgânica. Quando o SEO entra no projeto desde o inventário, e não como conferência de última hora, o redesign vira oportunidade de consolidar conteúdo, melhorar arquitetura e ganhar posições em vez de perdê-las.

A Kaleidos conduz redesigns e migrações de sites com SEO tratado como requisito de engenharia: inventário, mapa de redirects, preservação de conteúdo, staging auditado e monitoramento pós-lançamento. Se a sua empresa está planejando um site novo e não quer descobrir o custo de uma migração mal feita, [fale com a gente](/contato) antes do primeiro wireframe.
`,
  },
];
