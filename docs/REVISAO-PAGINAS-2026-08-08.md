# Revisão crítica — Home + /marca-pessoal (2026-08-08)

> Revisão de diretor de arte + redator sênior. Páginas abertas no navegador (dev server porta 3001),
> desktop 1440px e mobile 390px, rolagem completa, screenshots full-page via Playwright.
> **Nenhum arquivo do site foi editado.** Achados priorizados por gravidade.
>
> Regras invioláveis: ✅ "Chattie"/trychattie **não aparece** em lugar nenhum de `src/` nem `public/`.
> ✅ "Lista de quem interagiu" **não é prometida** — a seção Sinais de Intenção mantém a negativa
> explícita ("Uma coisa que a gente não promete: lista nominal de quem curtiu ou comentou").

---

## 🔴 P0 — Contradições de fato e costura quebrada

### 1. "Desde 2019" vs "desde 2020" — o hero novo contradiz o resto do site (inclusive o FAQ da MESMA página)
- **Hero da home** (`src/components/web3v2/sections.tsx:134`): badge *"Agência de marketing para cripto desde 2019"*.
- **FAQ da home** (`src/i18n/dictionaries.ts:56` e `:58`): *"Somos cripto-nativos desde 2020"* e *"mais de R$46 milhões... desde 2020"*.
- Também dizem **2020**: metadata global (`src/app/layout.tsx:73,107,124`), `/sobre` (`page.tsx:190,560`), `/pacotes` (`page.tsx:289,316`), hub de categoria do blog. Dizem **2019**: `/contato` (`layout.tsx:7`, `page.tsx:181`) e o hero novo.
- Um visitante que rola a home inteira lê "desde 2019" na primeira dobra e "desde 2020" no FAQ. Pra LLM/GEO isso dilui a entidade (o próprio GEO-STRATEGY da casa lista consistência de entidade como fator nº3).
- **Fazer:** decidir a data canônica e padronizar TODAS as ocorrências numa passada só (grep `desde 20(19|20)` + `since 20(19|20)`).

### 2. Hero novo fala "marcas e founders"; o manifesto logo abaixo ainda vende só o projeto
- Hero: *"Marketing nativo pra marcas e founders..."* + sub que nomeia "marca pessoal... pra pessoa que está na frente dele". ✅ conforme a decisão.
- **Manifesto** (`sections.tsx:203`, segunda dobra): *"transformamos **projetos complexos** em marcas que o mercado não ignora"* — só a unidade projeto. A versão mobile curta idem.
- É exatamente a Fase 2 item 11 do doc de decisão (`DECISAO-POSICIONAMENTO-HOME-E-BLOG-2026-08-08.md`), que ainda não foi executada — mas como o hero JÁ mudou, a home ficou com a primeira dobra falando uma língua e a segunda outra. A costura mais visível da página.
- **Fazer:** reescrever o manifesto nomeando as duas unidades (ex.: *"...pro projeto e pra pessoa que está na frente dele"*), mantendo cripto/web3/fintech e as métricas. Uma frase resolve.

### 3. `/marca-pessoal` promete "você não sai da conversa sem número na mão" — mas o número só chega DEPOIS, por escrito
- `src/app/marca-pessoal/page.tsx:1174` (lead da seção Oferta 1): *"Os valores vão por escrito na proposta, logo depois de uma call de 30 minutos: **você não sai da conversa sem número na mão**."*
- Todo o resto da página (hero, Como começa, FAQ "Quanto custa?", CTA final) diz que o valor vem **na proposta por escrito, depois da call**. As duas promessas não podem ser verdade ao mesmo tempo — e é justamente o ponto mais sensível de uma página sem preço: se o cliente sentir ambiguidade aqui, vira "estão escondendo o preço".
- **Fazer:** alinhar com o resto: *"...logo depois de uma call de 30 minutos — cada plano com o número aberto, sem pegadinha"* ou prometer o número NA call em todo lugar. Escolher um.

---

## 🟠 P1 — Copy e consistência comercial

### 4. Plano Entrada não lista "Estratégia" — mas a seção "O que fazemos" diz que estratégia está inclusa pra todo mundo
- `page.tsx` S5 (FAZEMOS_HTML:832): coluna Kaleidos entrega *"Tese, estratégia e calendário aprovado por você"* — sem ressalva de plano.
- S9: só **Completo** e **Escala** listam "Estratégia"; a Entrada tem postagem + relatório. Se estratégia é diferencial do Completo (intenção comercial documentada no comentário do código), a S5 está sobre-prometendo pra Entrada. Cliente que fecha Entrada esperando "tese e estratégia" vai cobrar.
- **Fazer:** ou qualificar a S5 ("no plano Completo em diante") ou dar à Entrada um item de estratégia mais raso ("calendário editorial mensal") que não canibalize o upsell.

### 5. "Valor definido na conversa" (Diagnóstico) quebra a régua "valores por escrito na proposta"
- `page.tsx:1239`: card Diagnóstico de Posicionamento — *"Valor definido na conversa."*
- A página inteira vende o ritual "call → proposta por escrito com valores abertos". Um card dizendo "definido na conversa" reabre a sensação de preço-de-feirinha. (Sei que no vault o Diagnóstico está sem preço definido — mas a copy pode prometer o mesmo ritual: *"valor por escrito, junto com a proposta"*.)

### 6. Micro-inconsistências da grade de planos
- **Escala** diz *"Estratégia e relatório"*; Completo diz *"Estratégia e relatório **mensal**"* (`page.tsx:1224` vs `1208`). O plano mais caro parece ter entrega mais vaga. Adicionar "mensal".
- FAQ home q7 (`dictionaries.ts:60`): a resposta termina com *"Os detalhes estão em kaleidos.com.br/marca-pessoal."* renderizado como **texto puro, não link** (verificado no navegador). No mínimo frustrante; o FAQSection não renderiza HTML das respostas. Vale transformar em link ou mover o link pra fora do dicionário.
- `services-list.tsx:40-42`: comentário desatualizado — fala em *"lista de 9 serviços"* e *"Desktop (sm+) sempre mostra os 9"*, mas agora são **10** (Marca Pessoal entrou). Só comentário, mas é o tipo de coisa que confunde o próximo agente.

### 7. Hero da `/marca-pessoal`: seta apontando pro lado errado + legenda duplicada no mobile
- `page.tsx:495`: *"← conteúdo real publicado em perfis de clientes. nada de mockup."* — a seta aponta pra **esquerda**, mas a parede de conteúdo está à **direita** da copy no desktop (grid `1.02fr .98fr`, copy primeiro). Verificado no screenshot: a seta aponta pro vazio.
- No mobile a parede desktop some (`mp-wall{display:none}`), mas essa legenda com "←" **continua visível** apontando pra nada, e logo abaixo a faixa mobile tem a própria legenda *"conteúdo real publicado em perfis de clientes"* — **duas legendas quase idênticas em sequência** (verificado no screenshot mobile).
- **Fazer:** trocar "←" por "→" no desktop e esconder essa linha no breakpoint ≤1060px (mesma media query que esconde `.mp-wall`).

---

## 🟡 P2 — Design, ritmo e mobile

### 8. Card fixo do Playbook (home) cobre conteúdo no mobile — inclusive o CTA principal
- `Web3V2PlaybookSticky` ocupa ~55% da largura e ~60% da altura do viewport mobile. Verificado cobrindo: o texto do manifesto (desktop), descrições dos serviços 03/04 (desktop), **os botões "Agendar reunião" e "Prefere WhatsApp" da seção CTA** e metade do FAQ (mobile). Só na home (a `/marca-pessoal` não tem — correto).
- É dispensável via ×, mas o primeiro-visitante mobile navega a página inteira com um card de bear market tapando a conversão. Num site que vende "medição constante", o próprio CTA está atrás de um banner.
- **Fazer:** no mobile, reduzir pra uma barra compacta (só "Playbook grátis →") ou só exibir após X% de scroll e esconder nas seções de CTA/FAQ.

### 9. `/marca-pessoal` no mobile: 19.400px de altura (~23 telas)
- Desktop: 11.841px (razoável, 12 seções com respiro). Mobile: os grids viram coluna única e a página fica com ~23 telas de rolagem. As duas grades de planos (3 + 3 cards) + 2 cards tracejados + strip "Como começa" somam ~8 telas só de oferta.
- Não há gordura óbvia pra cortar sem nova decisão (a enxugada já tirou o que devia), mas o **Método** (banner do torus ASCII + stepper de 4 fases) é a seção que menos trabalha pela venda e custa ~2,5 telas no mobile. Se o Gabriel ainda achar cansativa, é o próximo candidato — ou colapsar as fases do stepper em accordion.

### 10. Repetição de peças entre a parede do hero e os cards de case
- `Capa_Reels4.webp` (Layla) e `dfv-DYFTrH5jGL9-slide-01.jpg` (Defiverso) aparecem **no wall do hero E nos cards de case** (`page.tsx:291,982` e `:289,992`). Com 700+ criativos produzidos, repetir peça na mesma página passa sensação de acervo raso. Trocar as do wall ou as dos cases.
- Proporções do wall: verificadas — todas as imagens são 4:5 ou 9:16, regra respeitada. ✅

### 11. Home desktop: seção "Post genérico não constrói reputação" depois do FAQ
- Pré-existente (não é de hoje), mas com o hero novo ficou mais estranha: é a 10ª seção, repete o trio de CTAs pela 4ª vez e fala só de "marcas cripto" (unidade projeto). No mobile já foi escondida por esses motivos (`home-shell.tsx:137-141`). Vale a mesma decisão no desktop, ou movê-la pra antes dos cases.

### 12. Testemunhos em fonte display (Atelier) — legibilidade
- Depoimentos longos (3-5 linhas) renderizados na fonte display estilizada. Em bloco curto funciona; em parágrafo de depoimento cansa e desacelera a leitura justamente na prova social. Pré-existente, registro como observação de DA.

---

## ✅ Números — auditoria de fonte (pós-incidente de métrica fabricada)

| Número na página | Fonte | Veredito |
|---|---|---|
| 2,75× impressões (perfil vs página) | Refine Labs, linkado no playbook do vault (`PLAYBOOK-marca-pessoal-founders-2026-07-24.html:505`), rotulado "experimento de agência" na própria página | ✅ rastreável, com a ressalva certa |
| 50k→180k IG, 10x faturamento (Lucas) | `src/lib/case-data.ts:404,413` | ✅ bate com a fonte interna — **mas ver alerta abaixo** |
| 100k→172k, 20M+ views (Layla) | `case-data.ts:208,217` | ✅ bate com a fonte interna — **mas ver alerta abaixo** |

> ⚠️ **Alerta cruzado com o diário de hoje (2026-08-08):** a validação feita no vault pelo agente dos decks
> registrou **Layla 184K ✅ · Lucas 173K ✅** como números atuais e apontou que *"os errados, 172k/180k,
> estão no deck cripto e no `case-data.ts` do site"*. Os cards da `/marca-pessoal` usam exatamente 172k/180k.
> Como "antes→depois" histórico do case eles podem se defender, mas se 184K > 172K, o card da Layla está
> **subvendendo** o resultado com número velho — e a régua da página diz "métrica publicada nos cases e fonte
> interna auditável". Decidir: atualizar `case-data.ts` pros números validados ou datar os cards ("na época do case").
| 12M views/90d, 8,6k seguidores (Defiverso) | `case-data.ts:605` | ✅ bate |
| +125M views, +R$46mi, 30+ projetos (home) | métricas canônicas da casa (`KALEIDOS_METRICS`) | ✅ consistentes entre hero/manifesto/FAQ |
| "desde 2019" (badge hero) | **conflita com "desde 2020" no restante do site** | 🔴 ver achado #1 |
| LinkedIn B2B | zero número de resultado + disclaimer "não tem case publicado ainda" | ✅ honesto, conforme regra |

---

## Perguntas do briefing

### A `/marca-pessoal` se sustenta sem preço?
**Sim, com folga — é possivelmente a versão mais forte da página.** O que sustenta: (a) a faixa virou escopo contável (12/20/40 peças) e a **diferença entre planos é legível sem preço** — Entrada vs Completo se distingue por "2× os reels + estratégia", Escala por "engajamento incluído / 1 por dia útil"; (b) o ritual do preço é explicado 4 vezes de formas diferentes (hero, lead da oferta, "Como começa", FAQ "Quanto custa?") sempre com o mesmo enquadre "call de 30 min → proposta por escrito com valores abertos, sem pegadinha" — isso neutraliza o "estão escondendo o preço"; (c) "Receber a proposta" é um CTA melhor que "Agendar call" porque promete o artefato que contém o preço. **As duas rachaduras** são o achado #3 ("não sai da conversa sem número na mão" contradiz o ritual) e o #5 ("valor definido na conversa" no Diagnóstico) — corrigidas essas duas frases, o argumento fecha 100%.

### Ainda está cansativa?
**No desktop, não.** 12 seções com alternância clara claro/escuro, um número só de mercado, headers editoriais — o ritmo aguenta. **No mobile, ainda pesa**: ~23 telas, das quais ~8 são oferta empilhada. Não recomendo cortar seção sem o Gabriel pedir (a enxugada já foi decidida); recomendo tratar o Método como candidato a compressão no mobile e resolver as duplicações pequenas (legenda dupla do hero, peças repetidas) que adicionam sensação de redundância sem adicionar venda.

---

## Notas técnicas (não bloqueantes)
- **Hydration mismatch** no console em `/` e `/marca-pessoal` (dev): "A tree hydrated but some attributes didn't match". Aparece como "3 Issues" no overlay do Next. Provável interação i18n/extensões; vale investigar antes que mascare erro real.
- Sem overflow horizontal em 390px nem 1440px nas duas páginas (verificação programática). ✅
- `.next` estava corrompido (ENOENT em `_buildManifest.js.tmp.*`, 500 em todas as rotas) — possivelmente por dois processos compartilhando o diretório (outro agente editando o repo em paralelo). Regenerei o `.next` pra conseguir revisar; se o dev server local der 500, `rm -rf .next` resolve.
- Dev server desta revisão: porta **3001** (3000 estava ocupada pelo sequencia-viral).
