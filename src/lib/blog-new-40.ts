import type { BlogPost } from "./blog-data";

const AUTHOR = {
  name: "Gabriel Madureira",
  avatar: "/Kaleidos/imagens/Equipe/Madureira.png",
};

export const blogNew40: BlogPost[] = [
  {
    slug: "onde-desperdica-verba-google-ads",
    title: "Onde você está desperdiçando verba no Google Ads (e como parar o vazamento)",
    seoTitle: "Google Ads: 6 vazamentos de verba e como corrigir",
    excerpt:
      "Boa parte das contas de Google Ads queima orçamento em termos irrelevantes, redes ligadas por padrão e conversões mal medidas. Veja os seis vazamentos mais comuns e o passo a passo para fechar cada um deles.",
    seoDescription:
      "Descubra os 6 vazamentos de verba mais comuns no Google Ads: broad match sem controle, falta de negativas, display ligado sem querer e conversão mal medida.",
    category: "marketing",
    author: AUTHOR,
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-16",
    readTime: 9,
    featured: false,
    coverImage: "",
    tags: [
      "google ads",
      "desperdício de verba",
      "palavras-chave negativas",
      "broad match",
      "rede de display",
      "mensuração de conversão",
      "lances automáticos",
      "otimização de campanhas",
    ],
    tldr: "Os maiores vazamentos de verba no Google Ads são: broad match sem controle, ausência de palavras-chave negativas, parceiros de pesquisa e display ligados por padrão, conversões mal medidas, lances automáticos rodando sem dados suficientes e landing pages que não convertem. Auditar termos de pesquisa, revisar configurações de rede e corrigir a mensuração fecha a maior parte do problema.",
    faq: [
      {
        question: "Como saber se estou desperdiçando verba no Google Ads?",
        answer:
          "Abra o relatório de termos de pesquisa e verifique se as buscas que acionaram seus anúncios têm relação real com sua oferta. Depois, confira nas configurações de campanha se a Rede de Display e os parceiros de pesquisa do Google estão ativados sem intenção, e valide se as conversões registradas correspondem a ações de negócio de verdade, não a cliques em botão ou visitas a página.",
      },
      {
        question: "Broad match (correspondência ampla) é sempre ruim?",
        answer:
          "Não. Broad match pode funcionar quando combinado com lances inteligentes, mensuração de conversão confiável e listas de negativas bem construídas. O problema é usar correspondência ampla sem esses controles: o Google passa a interpretar a palavra-chave de forma muito elástica e seus anúncios aparecem para buscas que não têm relação com o que você vende.",
      },
      {
        question: "Com que frequência devo revisar palavras-chave negativas?",
        answer:
          "Em contas com volume relevante de tráfego, o ideal é revisar o relatório de termos de pesquisa toda semana nas primeiras semanas de uma campanha nova e depois pelo menos a cada quinze dias. Contas maduras podem espaçar mais, mas nunca abandonar a rotina, porque o comportamento de busca muda e novos termos irrelevantes surgem o tempo todo.",
      },
      {
        question: "Quantas conversões preciso para usar lances automáticos?",
        answer:
          "A documentação do Google recomenda dar ao sistema um período de aprendizado e volume mínimo de dados. Na prática, estratégias como CPA desejado e ROAS desejado funcionam melhor com pelo menos 30 a 50 conversões nos últimos 30 dias na campanha ou na conta. Com menos que isso, o algoritmo oscila demais e tende a gastar mal.",
      },
      {
        question: "A landing page influencia o custo do Google Ads?",
        answer:
          "Sim, em duas frentes. Primeiro, a experiência na página de destino é um dos componentes do Índice de Qualidade do Google, que afeta quanto você paga por clique. Segundo, uma página lenta ou confusa derruba a taxa de conversão: você paga pelo mesmo clique e converte menos, o que aumenta o custo por aquisição mesmo com a campanha bem configurada.",
      },
    ],
    content: `# Onde você está desperdiçando verba no Google Ads (e como parar o vazamento)

A maioria das contas de Google Ads que a Kaleidos audita tem o mesmo padrão: o problema quase nunca é falta de verba. É verba escorrendo por frestas que ninguém está olhando. Termos de pesquisa irrelevantes, redes ativadas por padrão, conversões que não são conversões. Cada vazamento parece pequeno isolado, mas somados eles podem consumir uma fatia relevante do orçamento sem gerar um único cliente.

A boa notícia: esses vazamentos são identificáveis e corrigíveis, e a maioria pode ser estancada em uma tarde, sem esperar uma revisão completa da conta. Este artigo não é uma auditoria de ponta a ponta (esse processo estruturado está no nosso [checklist de auditoria de Google Ads](/blog/auditoria-google-ads-guia)): é o mapa de triagem dos seis vazamentos mais comuns, um por um, com o passo a passo para fechar cada torneira hoje.

## Principais takeaways

- **Broad match sem controle** deixa o Google interpretar sua palavra-chave de forma elástica demais e exibir anúncios para buscas sem relação com sua oferta.
- **Palavras-chave negativas ausentes** significam pagar por cliques de quem procura "grátis", "vaga de emprego" ou "como fazer sozinho".
- **Rede de Display e parceiros de pesquisa** vêm ativados por padrão em campanhas de pesquisa e diluem a verba em posicionamentos de baixa intenção.
- **Conversão mal medida** faz o algoritmo otimizar para a ação errada: você "bate meta" no painel e não vê resultado no caixa.
- **Lances automáticos sem dados** suficientes oscilam, pagam caro demais por cliques e demoram a estabilizar.
- **Landing page ruim** transforma até a campanha mais bem configurada em prejuízo: o clique é pago, a conversão não acontece.

## Vazamento 1: broad match sem controle

A correspondência ampla é o tipo de correspondência padrão do Google Ads. Segundo a documentação oficial do Google (2025), no broad match os anúncios podem ser exibidos para pesquisas "relacionadas" à palavra-chave, o que inclui sinônimos, variações e interpretações do sistema sobre a intenção do usuário.

Na prática, isso significa que uma palavra-chave como "software de gestão financeira" pode acionar anúncios para buscas como "planilha de gastos grátis" ou "curso de finanças pessoais". Você paga pelo clique de alguém que nunca teve intenção de comprar seu produto.

Broad match não é vilão em si. Ele funciona quando três condições existem ao mesmo tempo: mensuração de conversão confiável, lances inteligentes com volume de dados e listas de negativas robustas. O vazamento acontece quando a conta usa correspondência ampla sem nenhuma dessas âncoras.

**Como fechar:**

1. Abra o relatório de termos de pesquisa e liste tudo que acionou anúncio nos últimos 30 dias.
2. Marque os termos sem relação com a oferta e adicione como negativas.
3. Para campanhas sem histórico de conversão, comece com correspondência de frase e exata. Só abra para broad match quando a mensuração estiver sólida.
4. Se mantiver broad match, revise os termos de pesquisa semanalmente. Não é tarefa de uma vez só.

## Vazamento 2: palavras-chave negativas ausentes

Este é o vazamento mais barato de consertar e um dos mais ignorados. Palavras-chave negativas impedem que seu anúncio apareça para buscas que contenham termos específicos. Sem elas, você paga por cliques de públicos que nunca vão comprar.

Os clássicos que quase toda conta deveria negativar desde o primeiro dia:

- **"grátis", "gratuito", "free"**: quem busca de graça raramente quer pagar.
- **"vaga", "emprego", "salário", "currículo"**: gente procurando trabalho, não fornecedor.
- **"curso", "como fazer", "tutorial", "passo a passo"**: intenção de aprender sozinho, não de contratar (a menos que você venda cursos).
- **Nomes de concorrentes** que você não quer disputar de propósito.
- **Termos de outra categoria** que compartilham palavras com a sua.

Além da lista inicial, o trabalho contínuo importa mais: o relatório de termos de pesquisa é a fonte de verdade. Cada revisão gera novas negativas, e o Google Ads permite criar listas compartilhadas de negativas aplicáveis a várias campanhas de uma vez, o que evita retrabalho.

**Como fechar:**

1. Crie uma lista de negativas universal (grátis, emprego, tutorial etc.) e aplique em todas as campanhas de pesquisa.
2. Estabeleça uma rotina fixa de revisão do relatório de termos: semanal em campanhas novas, quinzenal nas maduras.
3. Atenção ao tipo de correspondência das negativas: uma negativa exata bloqueia menos do que uma negativa ampla. Use com intenção.

## Vazamento 3: parceiros de pesquisa e Display ligados sem querer

Ao criar uma campanha de pesquisa, o Google Ads vem com duas caixas marcadas por padrão: "incluir parceiros de pesquisa do Google" e "incluir a Rede de Display do Google". Muita conta roda meses sem que ninguém tenha decidido conscientemente ativar essas redes.

O problema é de intenção. Quem pesquisa no Google está ativamente procurando algo. Quem vê um banner em um site de notícias ou em um aplicativo está fazendo outra coisa. São públicos com temperaturas completamente diferentes, e misturá-los na mesma campanha, com o mesmo lance e o mesmo criativo, quase sempre significa que a parte de Display consome verba com taxa de conversão muito inferior à da pesquisa.

Os parceiros de pesquisa (sites que exibem resultados do Google fora do google.com) podem performar bem em alguns nichos, mas historicamente têm menos transparência de posicionamento, e o desempenho varia muito de conta para conta.

**Como fechar:**

1. Abra as configurações de cada campanha de pesquisa e verifique as duas opções de rede.
2. Desative a Rede de Display em campanhas de pesquisa. Se Display fizer sentido para o negócio, crie uma campanha separada, com criativos, lances e metas próprios.
3. Para parceiros de pesquisa, segmente o desempenho no relatório. Se a taxa de conversão for consistentemente pior que a da pesquisa do Google, desative.

## Vazamento 4: conversão mal medida

Este é o vazamento mais perigoso, porque contamina todos os outros. O Google Ads otimiza para o que você diz que é uma conversão. Se a definição estiver errada, todo o sistema trabalha na direção errada e o painel ainda mostra números bonitos.

Os erros mais comuns de mensuração:

- **Contar clique em botão como conversão**: o usuário clicou em "enviar" mas o formulário deu erro. Conversão registrada, lead inexistente.
- **Contar visita à página de obrigado sem filtro**: qualquer pessoa que acessar a URL direto vira "conversão".
- **Conversões duplicadas**: a mesma ação registrada pela tag do Google Ads e pela importação do GA4 ao mesmo tempo, inflando o número e distorcendo o CPA real.
- **Otimizar para microconversões**: campanha inteira otimizando para "visualizou página de preço" enquanto a meta de negócio é venda.
- **Ignorar conversão offline**: para quem vende por telefone ou reunião, o lead que virou cliente nunca volta para o Google Ads, e o algoritmo aprende com um funil cego.

Com a depreciação progressiva dos cookies de terceiros e as mudanças de privacidade dos últimos anos, o próprio Google (2024) passou a recomendar a mensuração aprimorada de conversões (enhanced conversions) e a importação de conversões offline para dar ao sistema sinais de qualidade.

**Como fechar:**

1. Liste todas as ações de conversão ativas na conta e classifique: qual é meta primária de negócio e qual é secundária.
2. Deixe o lance otimizando apenas para conversões primárias. Microconversões ficam como observação.
3. Teste o disparo de cada tag: preencha o formulário, simule a compra, confira se registra uma vez só.
4. Se o ciclo de venda fecha fora do site, implemente importação de conversão offline. Sem isso, o algoritmo otimiza para lead barato, não para cliente.

## Vazamento 5: lances automáticos rodando sem dados

Estratégias de lances inteligentes como CPA desejado e ROAS desejado são poderosas, mas dependem de volume de dados para funcionar. A documentação do Google (2025) indica que campanhas passam por um período de aprendizado ao mudar de estratégia de lance, e a prática de mercado converge para um piso de 30 a 50 conversões mensais para que o algoritmo tenha sinal suficiente.

O vazamento acontece em dois cenários:

- **Campanha nova com CPA desejado agressivo e zero histórico**: o sistema não tem dados, oscila, entrega pouco ou paga caro demais tentando aprender.
- **Conta pequena com meia dúzia de conversões por mês usando ROAS desejado**: o algoritmo toma decisões estatisticamente frágeis, e cada conversão atípica bagunça o aprendizado.

Some a isso o erro de mensuração do vazamento anterior e o resultado é um algoritmo confiante otimizando para a coisa errada com dados insuficientes.

**Como fechar:**

1. Em campanhas novas, comece com "maximizar cliques" com CPC máximo definido, ou "maximizar conversões" sem meta de CPA, até acumular histórico.
2. Só ative CPA ou ROAS desejado quando a campanha (ou a conta) tiver volume consistente de conversões bem medidas.
3. Ao definir a meta, parta do CPA real do histórico, não do CPA que você gostaria de ter. Meta irreal faz o sistema limitar a entrega.
4. Evite mexer na campanha durante o período de aprendizado. Cada mudança estrutural reinicia parte do processo.

## Vazamento 6: landing page que não converte

O último vazamento acontece depois do clique, e por isso muita gente que só olha o painel do Google Ads nunca o enxerga. Você pode ter a campanha perfeita: palavra-chave certa, anúncio relevante, lance eficiente. Se a página de destino for lenta, confusa ou desalinhada com a promessa do anúncio, o dinheiro vaza do mesmo jeito.

Dois efeitos se somam:

- **Efeito direto**: taxa de conversão baixa. Você paga o mesmo por clique e gera menos resultado, então o custo por aquisição sobe.
- **Efeito indireto**: a experiência na página de destino é um dos três componentes do Índice de Qualidade do Google, junto com CTR esperado e relevância do anúncio. Qualidade baixa tende a significar CPC mais alto para a mesma posição.

Pesquisas do próprio Google (2018) sobre velocidade móvel já mostravam que a probabilidade de abandono cresce fortemente conforme o tempo de carregamento aumenta, e essa lógica só se intensificou com o tráfego majoritariamente mobile.

**Como fechar:**

1. Meça a velocidade da página no PageSpeed Insights, priorizando a experiência mobile.
2. Garanta correspondência de mensagem: a promessa do anúncio precisa aparecer no primeiro dobra da página, com o mesmo vocabulário.
3. Um objetivo por página. Landing page de campanha não é home institucional com dez caminhos possíveis.
4. Formulários curtos: cada campo a mais é atrito. Peça só o necessário para o próximo passo comercial.
5. Teste continuamente: título, CTA e prova social são os elementos de maior impacto para começar.

## Por onde começar: a auditoria de uma tarde

Se você leu até aqui e reconheceu a própria conta em mais de um vazamento, a ordem de ataque que a Kaleidos recomenda é esta:

1. **Mensuração primeiro.** Sem conversão confiável, qualquer outra otimização é chute. Valide tags, remova duplicidades, defina metas primárias.
2. **Configurações de rede.** Dois minutos por campanha para desligar Display e avaliar parceiros de pesquisa.
3. **Termos de pesquisa e negativas.** Uma hora no relatório de termos costuma revelar onde o dinheiro está indo.
4. **Tipos de correspondência.** Alinhe broad match ao nível de maturidade da conta.
5. **Estratégia de lance.** Ajuste à realidade de volume de dados.
6. **Landing page.** O trabalho mais longo, mas o que multiplica todos os outros.

Nenhum desses passos exige aumentar o orçamento. Todos eles fazem o orçamento atual trabalhar mais (e ajudam a responder com mais precisão [quanto do faturamento investir em marketing](/blog/quanto-do-faturamento-investir-em-marketing)).

## Pare o vazamento antes de escalar

Escalar uma conta com vazamentos é ampliar o desperdício junto com o investimento. O caminho certo é o inverso: fechar as frestas, estabilizar a mensuração e só então pisar no acelerador. E se, mesmo com tudo corrigido, o CPC do seu mercado não fechar a conta, vale conhecer as [alternativas ao Google Ads para aquisição](/blog/alternativas-ao-google-ads-para-aquisicao).

A Kaleidos audita e opera contas de Google Ads com esse método: diagnóstico dos vazamentos, correção estrutural e otimização contínua orientada a conversão de negócio, não a métrica de painel. Se você suspeita que sua verba está escorrendo por alguma dessas frestas, [fale com a Kaleidos](/contato) e receba um diagnóstico honesto de onde o seu orçamento está indo.`,
  },
];
