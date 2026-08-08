# Benchmark — LP /marca-pessoal (reconstrução)

> **Data:** 2026-08-08 · **Escopo:** pesquisa de conversão pra reconstruir `kaleidos.com.br/marca-pessoal`
> **Gatilho:** 4 decisões do Gabriel — (1) sai a bifurcação "Dois caminhos", (2) a seção de problema está ruim, (3) a seção de prova precisa melhorar muito, (4) **os pacotes saem da LP** (já não havia preço; agora nem o escopo dos planos fica).
> **Parte de:** `vault/01 - KALEIDOS/015 - BRANDING E GROWTH/marca-pessoal-founders/ANALISE-COMPETITIVA-referencias-2026-07-24.md` e `TEARDOWN-REFERENCIAS-design-2026-07-24.md`. Este doc **não repete** aquele levantamento: atualiza e vai fundo só nos 4 pontos acima.
> **Regra aplicada aqui:** nenhum número, citação ou benchmark sem link. Onde eu não achei fonte, está escrito que não achei.

---

## 0. Resumo executivo

Cinco conclusões, na ordem de impacto:

1. **A referência do Gabriel (ContentLead) tem 8 seções e nenhuma seção de resultado.** A clareza dela vem de corte, não de copy melhor. Mas ela pode se dar a esse luxo porque a prova dela é o rosto do sócio (Jonas Castro, criador com 43 mil seguidores). **A nossa prova são os cases** — então o corte tem que ser em outro lugar.
2. **Nossa seção de problema falha porque descreve terceiros, não o leitor.** "O cliente / O investidor / O talento" faz o founder assistir outras pessoas olhando pra ele. As melhores do mercado listam **sintomas que o leitor reconhece como o estado dele hoje** (Ponti Digital e storyarb são os dois melhores exemplos, copy literal na §3).
3. **Prova crível não é número grande: é número que o leitor consegue conferir em 5 segundos.** Existe uma escada de credibilidade (§4). Dado o incidente de métrica fabricada, a Kaleidos deveria subir a escada inteira: métrica + janela de tempo + **link pro artefato vivo** + screenshot do painel nativo + a frase mais forte **na boca do cliente, atribuída**, não na nossa.
4. **LP sem pacote funciona, e é maioria no BR.** O que ocupa o lugar da tabela não é vazio: é um bloco de **2 soluções nomeadas com 4 bullets cada, sem volume e sem preço** (modelo ContentLead), mais a faixa de entrada escondida na FAQ. O CTA para de vender a compra e passa a vender a **próxima etapa** ("agendar uma reunião", "ver se você tem fit").
5. **A ordem que mais se repete nas boas** é: hero → prova social passiva → **problema** → como funciona → método → **prova ativa (cases)** → qualificador → soluções (sem preço) → FAQ → CTA. Nossa LP já é quase isso. Dá pra ir de 12 pra **9 seções** cortando a bifurcação, fundindo o número de mercado dentro do problema e trocando as duas grades de planos por um bloco único de soluções.

---

## 1. Fontes lidas (tudo com link)

| # | Página | O que fui buscar | Link |
|---|---|---|---|
| 1 | **Content Lead** (BR) — site | estrutura, hierarquia, conversão sem tabela | https://contentlead.com.br |
| 2 | **Content Lead** — proposta PDF (8 pág.) | como nomeia entrega e escopo | extraída em `scratchpad/contentlead.txt` |
| 3 | **Ponti Digital** (BR) — Founder-Led Growth | seção de problema | https://pontidigital.com.br/solucoes/founder-led-growth/ |
| 4 | **storyarb** (US) | seção de problema + seção de prova | https://www.storyarb.com |
| 5 | **Klowt** (UK) | LP sem preço, prova atribuída | https://klowt.com |
| 6 | **Kurogo** (UK) | grade de cases com número | https://www.kurogo.co.uk |
| 7 | **Foundera** (IL) | prova = post real com impressões | https://www.foundera.co |
| 8 | **Windmill Growth** (US) | barra de stats agregados | https://windmillgrowth.com |

**Correção ao doc de 24/07:** o `storyd.ai` listado lá como "estúdio de ghostwriting LinkedIn, US$3.850–6.850/mês" hoje serve **outro produto** — um SaaS de geração de apresentações por IA, com plano free / $18 / $100 (verificado em https://www.storyd.ai em 08/08/2026). A entrada do doc antigo não descreve mais o que está no ar. Não usar aquele preço como referência.

---

## 2. Dissecação da ContentLead (a referência declarada)

### 2.1 A página inteira, seção por seção

| # | Seção | Copy literal (o que importa) |
|---|---|---|
| 1 | **Hero** | Badge: "Agência TOP 1 em linkedin". H1: **"O seu cliente ideal está no LinkedIn. Nós fazemos ele vir até você."** Sub: "Estratégia, produção de conteúdo e inteligência comercial integradas. Você ganha autoridade. Seu time ganha demanda qualificada." CTA: "Agendar uma reunião" |
| 2 | **Logos** | "Empresas que confiam na Content Lead" |
| 3 | **Como trabalhamos** | "O modelo de trabalho da Content Lead" — 4 passos: **Imersão · Estratégia · Produção Completa · Inteligência Comercial**, uma frase cada |
| 4 | **Formatos** | "Lidere a sua indústria com conteúdo em múltiplos formatos" — marquee: Carrosséis · Infográficos · Thought Leadership · Vídeos · Newsletter |
| 5 | **Soluções** | "Conheça as nossas soluções personalizadas" — **2 cards, 4 bullets cada, zero preço, zero volume** |
| 6 | **Fundadores** | "O time de fundadores" — Jonas Castro: "+40.000 seguidores, 2 milhões de impressões geradas e 1.200 alunos treinados" |
| 7 | **FAQ** | 6 perguntas. Preço é a última |
| 8 | **CTA final** | "Vamos fazer o seu LinkedIn ser um ativo do seu negócio" |

**Oito seções. Um único CTA, repetido 6 vezes, sempre com o mesmo rótulo ("Agendar uma reunião") e sempre pro mesmo destino (Calendly).**

### 2.2 O que ela faz de certo (e a gente não faz)

**a) Um CTA, um rótulo, um destino.** Nós temos `/agendar` + WhatsApp de auditoria + âncoras internas (`#oferta`, `#linkedin-b2b`) + "Ver os planos ↓" + "Ver o case completo →". São **cinco** destinos competindo. A ContentLead tem um.

**b) Entrega nomeada por benefício, não por quantidade.** Os dois cards de solução:

> **LinkedIn Strategy** — "Nós desenhamos a sua estratégia de LinkedIn completa e acompanhamos a execução com o seu time."
> ✓ Diagnóstico profundo ✓ Estratégia de Conteúdo ✓ Setup dos perfis ✓ Acompanhamento
>
> **LinkedIn Full Stack** — "Nós cuidamos de 100% do processo: Estratégia, redação, design, publicação e inteligência comercial."
> ✓ Estratégia de Conteúdo ✓ Redação & Design ✓ Publicação & Otimização ✓ Inteligência Comercial

Quatro bullets. Nenhum número de peça por mês. **Isto é exatamente o formato que o Gabriel pediu** quando disse que os pacotes saem: a solução continua clara, o escopo contável some.

**c) O preço vive na FAQ, com faixa de entrada:**

> "Trabalhamos com pacotes de conteúdo de acordo com volume. **Nossos pacotes custam a partir de R$5.000/mês**, mas é ideal realizarmos uma reunião para formatarmos uma proposta personalizada."

Uma linha resolve a objeção de preço, qualifica quem não tem budget e não constrói tabela nenhuma. Nossa FAQ atual gasta um parágrafo de 6 linhas listando "6+6, 12+8 e 20+20" — ou seja, **a tabela que saiu da página voltou pela FAQ**. Isso precisa cair junto.

**d) A FAQ responde objeção, não pergunta operacional.** Duas que valem roubar o ângulo:

> "**Como eu sei que o serviço da agência é para mim?** Se você atua no mercado B2B, possui um ticket médio alto e um ciclo de vendas longo, provavelmente a Content Lead pode te ajudar."
>
> "**O conteúdo de vocês é produzido por I.A?** [...] Utilizamos agentes de I.A em processos da empresa para acelerar a entrega do time, mas boa parte do processo é feito por HUMANOS."

### 2.3 O PDF: onde a dor mora

O PDF de proposta (8 páginas) tem o que **não está na LP**: a seção de problema. Página 2, dividida em dois blocos, cada item uma frase seca:

> **Problemas em Geração de Demanda:** Inflação no CAC (Mídia Paga); Taxa de resposta de Outbound em queda; SEO em queda por conta de buscas geradas por I.A.; Agências de RP não conseguem operar com LinkedIn.
> **Problemas em Captura de Demanda:** O ciclo de vendas B2B é longo e envolve múltiplos buyers; O trabalho de educar o mercado fica com o time comercial.

E as tabelas de preço só existem **no PDF**, não no site: Starter R$5.500 / Full Service R$7.500 / LinkedIn 360° R$13.000, com contrato de 3 meses.

**A lição estrutural, e é a mais importante deste doc:** eles têm uma **divisão de trabalho** entre página e proposta. A página vende *categoria + confiança + próxima etapa*. O PDF vende *dor detalhada + escopo + preço*. A LP de marca pessoal da Kaleidos hoje tenta fazer as duas coisas — e é por isso que ela ficou cansativa. A decisão do Gabriel de tirar os pacotes **é justamente essa divisão**. Ela precisa ser aplicada inteira, não só na grade de planos.

### 2.4 O que a ContentLead deixa na mesa

- **Nenhum case, nenhum resultado de cliente, nenhum depoimento.** A prova é o currículo do sócio. Se a Kaleidos copiar isso, joga fora o único ativo que a diferencia.
- **Nenhuma seção de problema no site.** O visitante frio não é qualificado pela página; só na reunião.
- Marquee de formatos com a mesma sequência de 5 itens repetida 3x — enche espaço.

---

## 3. (a) A seção de problema

### 3.1 Diagnóstico da nossa

Hoje: eyebrow "O problema" → H2 "O mercado já pesquisou seu nome. **O que achou?**" → lead → 3 cards (O cliente / O investidor / O talento) → remate "Você não tem tempo pra virar creator. Ainda bem que não precisa."

O que quebra:

1. **Os cards falam de terceiros, não do leitor.** O founder lê sobre um cliente hipotético, um investidor hipotético e um talento hipotético. Em nenhum momento ele lê uma frase que descreve **a situação dele hoje**. Sem reconhecimento não há dor, e sem dor a seção vira contexto.
2. **A dor não tem consequência com preço.** "Perfil parado passa a mensagem errada" é vago. Comparar com o item da Ponti: *"postou 3 vezes, não viu resultado e parou — o perfil ficou abandonado e o algoritmo enterrou o alcance"*. Um é adjetivo, o outro é história.
3. **Não é do nosso nicho.** Os três cards funcionariam pra dentista, advogado ou SaaS. A página inteira se vende como "nativa de cripto, web3 e fintech" e a seção de problema não tem **uma palavra** desse mundo.
4. **A pergunta retórica não cobra resposta.** "O que achou?" não obriga o leitor a nada. Ponti abre com uma **acusação**: *"Seu LinkedIn deveria gerar pipeline. Hoje gera curtidas."* — sujeito, verbo, veredito.
5. **O remate é a melhor linha da seção e está no lugar certo.** "Você não tem tempo pra virar creator. Ainda bem que não precisa." **Manter.** É a ponte pro "você grava, a gente faz o resto".

### 3.2 Os dois modelos que funcionam

**Modelo A — Lista de sintomas auto-diagnosticáveis (Ponti Digital, BR).**
Headline acusatória + "Que problemas essa solução resolve?" + 6 bullets, cada um um estado observável. Copy literal:

> - "Perfil sem posicionamento claro: headline genérica, resumo que não diferencia e zero motivo para alguém aceitar sua conexão (SSI abaixo de 50)"
> - "Founder que tentou sozinho, postou 3 vezes, não viu resultado e parou — o perfil ficou abandonado e o algoritmo enterrou o alcance"
> - "Autoridade do founder invisível para marketing e vendas. O maior ativo da empresa está parado enquanto concorrentes dominam o feed"
> - "LinkedIn desconectado do pipeline. Conexões viram métricas de vaidade sem caminho até o CRM e a venda"
>
> — https://pontidigital.com.br/solucoes/founder-led-growth/

Por que converte: **o leitor se autodiagnostica**. Ele lê 6 e reconhece 3. Reconhecer 3 é entrar no funil sozinho.

**Modelo B — Dor com nome próprio (storyarb, US).**
Seção "**Consider these pains relieved** — What we fix (because we've been there)", 6 cards. O título de cada card é um **apelido pra dor**, e é isso que faz a coisa grudar:

> - **"Random Acts of Content"**
> - **"The Quarterly 'Start-Over'"** — "Content cannot start over every Q."
> - **"Invisible Leadership"** — "Your execs and SMEs have a POV worth sharing."
> - **"Dusty Newsletters"** — "That email list you have is a goldmine. We help you treat it like one."
> - **"ROI You Can't Prove"** — "Clicks don't always close deals."
>
> E a abertura da seção anterior: *"You've tried in-house. You've tried freelancers. You've tried 'let's just post more and hope it works.'"*
> — https://www.storyarb.com

Por que converte: batizar a dor entrega ao leitor **uma palavra que ele não tinha**. Quem te dá o nome do problema é dono da solução.

**Modelo C (complementar) — Consequência em 3 baldes de negócio (Klowt).**
Se quisermos manter a ideia de "quem está olhando", o jeito certo é virar de observador pra **resultado**: seção "**WHY BUSINESSES COME TO US / PEOPLE BUY FROM PEOPLE**" com três blocos — **PIPELINE · TALENT · EQUITY** — e o de cima carrega um número atribuído: *"We can attribute over £20 million to inbound business revenue from personal brands we helped build."* (https://klowt.com). Ou seja: o nosso trio existe, mas ele deveria falar de **pipeline / talento / capital** (que a headline do hero já promete), não de "o cliente / o investidor / o talento".

### 3.3 Recomendação

Substituir os 3 cards de persona por **uma lista de 5–6 sintomas em primeira pessoa, no idioma cripto/web3/fintech**, com headline acusatória e o remate atual preservado. Direção de copy (o Gabriel valida a linguagem, isto é esqueleto):

- Headline candidata: **"Seu perfil deveria abrir portas. Hoje ele abre dúvida."** (estrutura Ponti: promessa quebrada + veredito)
- Sintomas com cara de nicho: a tese está na sua cabeça e não no feed · você só aparece quando o mercado cai · o último post do perfil é de um ciclo atrás · investidor pesquisa seu nome e acha uma thread de 2021 · seu concorrente tem metade do seu track record e o dobro do palco · você já tentou postar sozinho, foram 3 posts e parou.
- Remate: manter **"Você não tem tempo pra virar creator. Ainda bem que não precisa."**
- **Fundir aqui o número de mercado** (2,75× da Refine Labs, hoje seção S4 sozinha): ele é o remate factual do problema, não uma seção. Isso já corta uma seção inteira.

---

## 4. (b) Prova: "antes e depois, com número"

### 4.1 Diagnóstico da nossa

Hoje S7 tem 3 cards: imagem + label + "50k → 173k no Instagram" + uma frase + "Ver o case completo". A estrutura está certa; o que falta é **credibilidade e verificabilidade**, que é justamente o ponto sensível da casa (a maioria dos números da home não tem fonte e já houve incidente de métrica fabricada).

Problemas concretos:

- **"Faturamento 10x maior em 12 meses" é a afirmação mais forte da página e a menos conferível** — e está escrita **na nossa voz**, como fato apurado pela Kaleidos.
- **Não há janela de tempo em 2 dos 3 cards.** "50k → 173k" sem prazo pode ser 12 meses ou 5 anos.
- **A imagem é decorativa, não probatória.** É uma capa de reel bonita, mas não mostra métrica nenhuma.
- **Nenhum rosto, nenhuma frase de cliente.** Nenhum dos três cases tem depoimento.
- Nada no card diz **o que a Kaleidos fez** para o número acontecer.

### 4.2 A escada de credibilidade (do mais fraco pro mais forte)

| Nível | Formato | Exemplo real no mercado | Vale pra gente? |
|---|---|---|---|
| 1 | Número grande sem fonte, ou percentual absurdo | Kurogo: **"397,000% increase in views"** e **"426% Increase in Views"** como depoimento (https://www.kurogo.co.uk) | ❌ Nunca |
| 2 | Barra de stats agregados da agência | Windmill: "Follower Growth / Views Generated" — e **os contadores estão renderizando "0 K+"** (https://windmillgrowth.com) | ❌ (já cortada na enxugada de 08/2026) |
| 3 | Stat de terceiro com fonte, pra vender o problema | Kurogo cita 86% / 13x / 45% de fontes externas | ✅ **1 só**, com fonte visível (é o que já fazemos com Refine Labs) |
| 4 | Case com o resultado no **título** + 2 números + janela | storyarb: *"How Fountain's content strategy accelerated their GTM + drove 3x leads"* → **+300% inbound leads in 100 days** · **+$1M average contract value growth**, sob o título de seção **"The proof is in the pipeline — We know your CFO doesn't care about impressions"** (https://www.storyarb.com) | ✅ Adotar a estrutura |
| 5 | **Post real, com métrica nativa, pessoa nomeada e empresa** | Foundera: três cards "Top posts" com título do post + nome + contagem exata — **Gal Nakash 201.100 impressions**, **Ofer Klein 124.301**, **Tal Shapira 89.307**, todos identificados como CPO/CEO/CTO da Reco (https://www.foundera.co) | ✅✅ **O melhor padrão pra nós** |
| 6 | Número **conferível ao vivo** pelo leitor | (ninguém no benchmark faz — é onde dá pra passar todo mundo) | ✅✅✅ Nosso diferencial |
| 7 | Frase forte **na boca do cliente, atribuída** | Windmill: *"I closed **$130k+ in inbound deals**. This works." — Justin Sherlock, CEO and Co-Founder of Caspian* (https://windmillgrowth.com) | ✅✅ Resolve o "10x faturamento" |

**A regra que sai daí:** número que a Kaleidos **não pode provar sozinha** só entra na página como **citação atribuída ao cliente**. Número que a Kaleidos **pode** provar entra com janela de tempo e um caminho pro leitor conferir.

### 4.3 Recomendação de reconstrução da seção de prova

**Título da seção:** trocar "Antes e depois, com número" (descreve o formato) por algo que declare o critério. O modelo storyarb — *"The proof is in the pipeline. We know your CFO doesn't care about impressions."* — é o certo: **a seção declara qual número ela recusa antes de mostrar o que aceita.** Candidata: **"O número que dá pra conferir."** com lead do tipo "Todo número aqui tem prazo, fonte e um jeito de você checar agora."

**Cada card passa a ter 5 elementos (hoje tem 3):**

1. **Métrica + janela de tempo.** "50k → 173k seguidores **em 12 meses**". Sem prazo, o número não diz nada.
2. **Um caminho de verificação.** Link discreto pro perfil público (`@lucas.amendolaa`, `@laylafoz`, `@defiverso`) com micro-rótulo tipo "confira no perfil". Nenhum concorrente faz isso, e pra nós é grátis — os perfis são públicos e o número está lá.
3. **Prova visual com métrica dentro** (padrão Foundera). Trocar a capa decorativa por **screenshot do painel nativo** (Instagram Insights / views do reel), com a data visível. Requer captura real; não montar mockup.
4. **O que a Kaleidos fez**, em uma linha. "12 reels/mês por 12 meses, roteiro e edição nossos." Sem isso o número é sorte, não método.
5. **Uma frase do cliente, com nome e rosto.** É aqui que o "10x faturamento" sobrevive: **"Faturamos 10x mais em 12 meses" — Lucas Amendola** (só se ele autorizar essa frase por escrito). Como afirmação nossa, sai.

**Sobre a fonte dos números:** os dois números de Instagram (Lucas 173.050 e Layla 176.960) vieram de leitura direta dos perfis via Apify em 08/08/2026, e isso está registrado em `src/lib/case-data.ts`. Essa apuração é o ativo — vale um micro-rodapé na seção ("números lidos direto dos perfis em 08/2026"), no mesmo espírito do "Fonte: Refine Labs" que já existe na página.

**Sobre o LinkedIn B2B:** a nota atual — *"Esta oferta acabou de entrar no catálogo, então não tem case publicado ainda. Preferimos dizer isso a mostrar número de terceiro como se fosse nosso"* — é a melhor frase de credibilidade da página inteira. **Manter, mesmo com o bloco de pacotes saindo.**

---

## 5. (c) Converter sem pacote nem preço na página

### 5.1 Quem faz isso, e o que ocupa o lugar da tabela

| Página | Preço na LP? | O que ocupa o lugar |
|---|---|---|
| **Content Lead** | Não. Só faixa na FAQ ("a partir de R$5.000/mês") | 2 cards de solução nomeada, 4 bullets, zero volume |
| **Klowt** | Não na home | "Three ways to work with us" (1:1 Strategy · Team Training · Founder Cohorts) — **modalidade**, não pacote — + form gratuito que devolve um roadmap |
| **Foundera** | Nenhum, em lugar nenhum | "You Don't Have To Lift A Finger" + "Our Approach" (3 blocos) |
| **Ponti Digital** | Não | "O que está incluso" (lista de entregáveis sem quantidade) + "Por que escolher a Ponti" |
| **Kurogo** | Não na home | "What's Your Goal?" — o visitante escolhe **objetivo** (Build Your Brand / Drive Pipeline / Build Authority), não plano |

**O padrão:** onde estava a tabela, entra ou **modalidade de trabalho** (Klowt), ou **objetivo do cliente** (Kurogo), ou **entrega qualitativa** (ContentLead, Ponti). Nunca fica um buraco, e nunca vira uma lista de features longa.

### 5.2 O CTA muda de promessa

Sem preço, o CTA não pode prometer a compra — tem que prometer a **próxima etapa**, e ser explícito sobre o que acontece nela:

- ContentLead: **"Agendar uma reunião"** → Calendly. Um rótulo, 6 aparições.
- Klowt: **"SEE IF YOU'RE A FIT"**, com a legenda embaixo: *"A 20-minute qualification call. We work with entrepreneurs and enterprises doing £250K+"*. O CTA **desqualifica** — e isso sobe o status da oferta.
- Ponti: **"Solicitar diagnóstico gratuito"** → WhatsApp direto (padrão BR).

**Pra nós:** `CTA_PRIMARY = "Receber a proposta →"` continua correto e fica **ainda mais** correto sem pacote na página: a proposta passa a ser o único lugar onde escopo e preço existem, e o CTA promete exatamente isso. Manter a hierarquia de dois rótulos (primário `/agendar` + secundário auditoria no WhatsApp) e **cortar os rótulos parasitas** ("Ver os planos ↓" morre junto com a bifurcação; "Ver o case completo →" pode virar link de texto discreto).

### 5.3 O que fazer com as duas ofertas, já que os pacotes saem

Com a bifurcação fora e as duas grades de planos fora, sobra o problema: **como a página ainda diz que existem dois produtos?**

Recomendação: **um bloco único "Duas formas de trabalhar"**, no formato exato dos 2 cards da ContentLead — nome da solução, uma frase de escopo, 4 bullets qualitativos, **sem número de peças, sem contrato, sem preço**, CTA igual nos dois. Isso substitui S2 (bifurcação) + S9 (planos marca pessoal) + S10 (escopos LinkedIn): **três seções viram uma.**

Rascunho de estrutura (copy é do Gabriel):

> **Marca Pessoal** — "Você é founder ou criador e quer virar autoridade onde seu público realmente está: Instagram e TikTok."
> ✓ Tese e posicionamento ✓ Roteiro, design e edição ✓ Publicação e agendamento ✓ Relatório e leitura dos números
>
> **LinkedIn B2B** — "Sua empresa vende pra outras empresas. O perfil de quem decide vira canal de demanda."
> ✓ Setup do perfil ✓ Conteúdo de tese e Company Page ✓ Material de captura ✓ Sinais de Intenção

O que **precisa sobreviver** do bloco antigo, porque é condição e não pacote:
- **Contrato mínimo de 6 meses** (uma linha, embaixo do bloco).
- **"Nada é publicado sem a sua aprovação."**
- **A negativa do LinkedIn** ("não prometemos lista nominal de quem curtiu ou comentou; a API oficial não libera e o único jeito arrisca a conta do seu executivo"). É argumento de venda e vale mais que qualquer bullet de escopo. Se o bloco encolher, ela pode virar item da FAQ — mas não pode sumir.

O que **precisa sair da FAQ** junto com os pacotes: a resposta de "Quanto custa?" hoje relista "6+6, 12+8 e 20+20" e "12, 20 e 40 conteúdos". Isso é a tabela voltando pela porta dos fundos. Substituir pelo modelo ContentLead: **uma faixa de entrada + "a proposta sai depois de uma call de 30 minutos"**. Decisão de negócio pro Gabriel: **publicar ou não o "a partir de R$X/mês"**. A ContentLead publica R$5.000; nenhum outro BR do estudo publica. Publicar qualifica e filtra; não publicar mantém a política de 08/08 intacta. Recomendo publicar só a faixa de entrada — é a única linha de preço que não vira tabela.

---

## 6. (d) Estrutura enxuta: a ordem recomendada

### 6.1 Ordem que mais se repete nas boas

Cruzando ContentLead, Klowt, Ponti, storyarb, Foundera e Kurogo:

**hero (promessa comercial) → prova social passiva (logos) → problema → como funciona (esforço do cliente quantificado) → método nomeado → prova ativa (cases com número) → qualificador ("não é pra todo mundo") → soluções sem preço → FAQ que vende → CTA final.**

**Onde elas cortam** (as três coisas que nenhuma das boas tem):
1. **Seção de escolha no topo.** Nenhuma das seis faz o visitante bifurcar antes de entender a oferta. Bifurcar cedo mata a leitura: quem escolhe errado sai, quem não sabe escolher trava. *(Isso confirma a decisão do Gabriel de tirar "Dois caminhos".)*
2. **Grade de estatísticas de mercado.** No máximo uma faixa de 3 números com fonte, dentro de outra seção. Nunca uma seção só pra isso.
3. **Repetição de escopo.** Cada entrega é nomeada **uma vez**. Nossa página nomeia entrega em S5 ("o que fazemos"), S9 (planos), S10 (escopos) e de novo na FAQ — quatro vezes.

### 6.2 A LP recomendada: 9 seções

| # | Seção | Status | O que muda |
|---|---|---|---|
| 1 | **Hero** — parede de prova + headline rotativa | **mantém** | Tirar a ponte "Empresa B2B, canal LinkedIn? →" (a bifurcação sai). Tirar "O escopo de cada plano está aberto aqui na página" — deixa de ser verdade. Sobra: 1 CTA primário + 1 secundário |
| 2 | **Marquee de logos de clientes** | mantém | — |
| 3 | **Problema** | **reescrever (§3)** | Headline acusatória + 5-6 sintomas em 1ª pessoa, no idioma cripto/web3/fintech. **Absorve o número de mercado** (Refine Labs, com fonte). Mantém o remate "Ainda bem que não precisa." |
| 4 | **Você grava, a gente faz o resto** | mantém | Já é o melhor bloco da página. "~2 horas do seu tempo por mês" é o ativo — Foundera vende a mesma coisa ("about 2 hours of your time per month") |
| 5 | **O método** — Motor de Autoridade | mantém, comprimir | Stepper fica. O torus ASCII é respiro; se a página precisar encurtar mais, é o primeiro candidato a sair |
| 6 | **Prova / cases** | **reescrever (§4)** | 3 cards com métrica + janela + link de verificação + screenshot de painel nativo + linha do que fizemos + citação atribuída |
| 7 | **Duas formas de trabalhar** | **nova, substitui 3 seções** | 2 cards, 4 bullets qualitativos cada, sem volume/preço/contrato nos bullets. Abaixo: contrato de 6 meses + "nada publicado sem sua aprovação" + a negativa do LinkedIn |
| 8 | **FAQ** | mantém, reescrever 1 resposta | "Quanto custa?" perde a lista de escopos. Ganha faixa de entrada + próxima etapa |
| 9 | **CTA final** | mantém | — |

**Seções eliminadas:** "Dois caminhos" (S2), "Um número só" (S4, funde no problema), "Oferta 1 · planos" (S9) e "Oferta 2 · escopos" (S10) → viram a S7 nova.
**Seção a decidir:** o **qualificador "Não é pra todo mundo"** (S8 atual). É um padrão forte do mercado (storyarb: *"Not for everyone. But probably for you."*; Klowt: floor de £250K+) e é a melhor ponte pro CTA. **Recomendo manter, mas comprimido** — as duas colunas de 4 itens podem virar uma faixa de 4 chips "é pra você se…". Se ele preferir 9 seções cravadas, este é o corte, e aí os critérios migram pra FAQ ("Como sei se é pra mim?", exatamente como a ContentLead faz).

**Resultado: 12 → 9 seções, com a prova ficando mais forte, não mais fraca.**

---

## 7. As 3 coisas que NÃO devemos copiar

### 1. Número grande sem fonte — e principalmente o percentual absurdo
Kurogo estampa **"397,000% increase in views"** e usa **"426% Increase in Views"** como se fosse depoimento (https://www.kurogo.co.uk). Windmill monta uma barra de stats agregados que, no ar hoje, renderiza literalmente **"0 K+ Follower Growth"** (https://windmillgrowth.com).

**Por que não:** um percentual de seis dígitos só existe quando a base era quase zero — o leitor sofisticado (founder de fintech, investidor) sabe disso e desconta a página inteira. E a Kaleidos, especificamente, **não tem crédito pra gastar aqui**: já houve incidente de métrica fabricada e a maioria dos números da home não tem fonte. Nosso caminho é o oposto — **número menor, conferível, com prazo e origem**. É mais difícil de produzir e por isso vale mais.

### 2. O "mecanismo secreto" de engajamento e a automação de rede
Foundera vende como diferencial central uma **"secret growth sauce"**: *"our carefully curated network of influencers, micro-influencers, and tech leaders who actively engage with your content"* (https://www.foundera.co) — um pod de engajamento. Ponti vende **expansão de rede automatizada via ferramenta de terceiro**, com meta de "taxa de conexão de 30-40%" (https://pontidigital.com.br/solucoes/founder-led-growth/).

**Por que não:** a LP da Kaleidos já tem, escrita, a promessa oposta — *"Preferimos um e-mail dado de livre vontade a um nome raspado"*, sustentada por auditoria técnica de que a API do LinkedIn não libera lista nominal e de que o atalho arrisca a conta do cliente. **Importar pod de engajamento ou automação de conexão destrói a única frase de integridade da página** e nos coloca no mesmo balaio de quem a gente está criticando. Diferencial é coerência: um pouco menos de alcance prometido, zero risco na conta de quem confiou.

### 3. A "clareza por corte" da ContentLead aplicada onde não deve
A ContentLead é limpa porque **removeu problema, cases, números de cliente e depoimento** da página. Ela consegue porque a prova dela é o sócio (Jonas Castro, criador com 43 mil seguidores e 1.200 alunos) e porque o produto é LinkedIn B2B genérico, onde o comprador já sabe o que está comprando.

**Por que não copiar inteiro:** copiar a estrutura dela nos deixaria com uma ContentLead pior — sem o Jonas, sem o nicho amplo, e sem os três cases reais que são o nosso ativo. **Copiar da ContentLead:** o CTA único, os 2 cards de solução sem volume, o preço na FAQ, a divisão página/proposta. **Não copiar:** a ausência de problema e a ausência de prova. Nosso diferencial (cripto/web3/fintech nativo, Instagram-first num mercado 100% LinkedIn, KAI, e cases com número apurado) **só aparece nas duas seções que ela não tem**.

**Menção honrosa (não copiar):** o piso de receita exposto da Klowt (*"We work with entrepreneurs and enterprises doing £250K+"*). O mecanismo de desqualificação é ótimo e a gente já usa a versão certa dele — o qualificador "não é pra todo mundo", por **comportamento** (topa gravar, pensa em 6 meses) e não por faturamento. Publicar um piso em reais no Brasil lê como arrogância, não como status.

---

## 8. Checklist de execução (pro dev que for reconstruir)

- [ ] Remover `BIFURCACAO_HTML` (S2) e a ponte "#linkedin-b2b" do hero
- [ ] Fundir `NumeroSection` (S4) dentro da seção de problema, **mantendo "Fonte: Refine Labs" visível**
- [ ] Reescrever `ProblemaSection`: sintomas em 1ª pessoa, preservar o remate "Ainda bem que não precisa."
- [ ] Reconstruir `CASES_HTML`: janela de tempo + link de verificação + screenshot de painel nativo + linha de "o que fizemos" + citação atribuída (⚠️ pedir autorização do Lucas pro "10x")
- [ ] Substituir `OFERTA_HTML` + `LINKEDIN_B2B_HTML` por um bloco "Duas formas de trabalhar" (2 cards × 4 bullets, sem volume)
- [ ] Preservar fora dos cards: contrato de 6 meses · "nada publicado sem sua aprovação" · a negativa de lista nominal do LinkedIn · a nota "sem case de LinkedIn B2B publicado ainda"
- [ ] Reescrever a resposta "Quanto custa?" na FAQ (tirar a lista de escopos) — **decisão pendente do Gabriel:** publicar ou não a faixa "a partir de R$X/mês"
- [ ] Reduzir a rótulos de CTA: só `CTA_PRIMARY` + auditoria no WhatsApp. Matar "Ver os planos ↓"
- [ ] Atualizar o comentário-cabeçalho do arquivo (o bloco "⚠️ ENXUGADA GERAL" e o "⚠️ MUDANÇA DE POLÍTICA") pra refletir que **escopo contável também saiu**, não só preço
- [ ] `generateFAQSchema` continua válido; conferir que nenhuma resposta da FAQ cita preço se a decisão for não publicar

---

*Pesquisa feita em 08/08/2026. Toda copy citada foi transcrita das páginas no ar naquela data. Nenhum número deste documento foi estimado.*
