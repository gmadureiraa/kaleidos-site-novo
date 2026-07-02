# Alfred (DSEC) — imagens APROVADAS selecionadas para o case

> Status: **CONCLUÍDO.** 10 imagens selecionadas, copiadas e otimizadas.
> Origem: `~/Downloads/Alfred Kaleidos` (baixado manualmente pelo Gabriel).
> Data: 2026-06-26
> Formato: cada imagem entregue em `.jpg` (q82, longest side 2000px) **e** `.webp` (q82).
>   Proporção NATIVA preservada (todas 1:1 / 2048x2048), sem corte.
>   Originais ~10MB PNG → ~0.5-0.8MB JPG / ~0.15-0.35MB WebP.

## As 10 selecionadas (mix variado: persona + Brasil + cenas + memes + batalhas)

| Novo nome           | Veio de (subpasta)        | Original                       | Tema |
|---------------------|---------------------------|--------------------------------|------|
| alfred-aprovada-01  | gm/                       | 01-gm-coffee.png               | Persona assinatura — Alfred com café/croissant, cubo "GM". Rosto do personagem. |
| alfred-aprovada-02  | (raiz) Brasil             | 02-maracana-bandeirao.png      | Patriota — Alfred com bandeira do Brasil, fogos no Maracanã. "Patriota soberano." |
| alfred-aprovada-03  | (raiz) Brasil             | 08-samba-carnaval.png          | Carnaval/Sapucaí — Alfred dançando com passista. "Sapucaí soberana." |
| alfred-aprovada-04  | (raiz) cenas              | 01-cyberpunk-tokyo.png         | Atmosférica — Alfred com guarda-chuva em Tóquio cyberpunk na chuva neon. Mostra range. |
| alfred-aprovada-05  | (raiz) cenas              | 07-hardware-wallet-unbox.png   | On-topic — Alfred manuseando hardware wallet na mesa. Self-custody/produto. |
| alfred-aprovada-06  | Memes/                    | 05-self-custody-sage.png       | Meme icônico — Alfred meditando. "Not your keys, not your coins." |
| alfred-aprovada-07  | Memes/                    | 15-cafe-com-bitcoin.png        | Meme charmoso — Alfred num café em Havana. "Stack sats. Toma um café." |
| alfred-aprovada-08  | Batalhas/                 | 02-vs-mario.png                | Batalha pop — Alfred vs Mario, bloco "?" vira Bitcoin. Block 894,213. |
| alfred-aprovada-09  | Batalhas/                 | 04-vs-drex-mascot.png          | Batalha on-brand DSEC — Alfred vs fiscal do DREX/CBDC. "Soberania > Vigilância." |
| alfred-aprovada-10  | (raiz) cenas              | 15-bitcoin-miner-farm.png      | Cenário diferente — Alfred operário numa fazenda de mineração de Bitcoin. |

## Tweets (@AlfredSpaceBR) — NÃO ENCONTRADOS

Os 2 prints de tweet pedidos NÃO existem na pasta `Alfred Kaleidos`, nem em `~/Downloads`, nem em `~/Desktop`:
- "Por que você compra Bitcoin? ps: Só valem respostas erradas" — **ausente**
- "O Brasil acabou de tornar obrigatório o reporte de self-custody" (imagem do Banco Central) — **ausente**

Destinos reservados (preencher quando os prints aparecerem):
`alfred-tweet-bitcoin.jpg` e `alfred-tweet-selfcustody.jpg`.
Próximo agente: Gabriel precisa baixar/screenshotar esses 2 tweets e jogar nesta pasta.

## ⚠️ Imagens ERRADAS que o case Alfred referencia hoje (substituir)

Em `src/lib/case-data.ts`, entrada `"alfred"` → `media[]` (linhas ~1054-1057),
estão referenciadas 4 imagens que devem ser TROCADAS pelas novas aprovadas acima:

- `/Cases/alfred/conteudo/alfred-gm-coffee.jpg`     → substituir por aprovada (ex: 01)
- `/Cases/alfred/conteudo/alfred-self-custody.jpg`  → substituir (ex: 06)
- `/Cases/alfred/conteudo/alfred-vs-hacker.jpg`     → substituir (ex: 08 ou 09)
- `/Cases/alfred/conteudo/alfred-wrench-attack.jpg` → substituir (ex: 04 ou 10)

Novos caminhos a usar: `/Cases/alfred/conteudo/aprovadas/alfred-aprovada-01.jpg` … `-10.jpg`
(ou `.webp` equivalente). Outro agente fará a edição do `case-data.ts` — este passo SÓ
organizou/copiou o material.

## Inventário disponível (não selecionado, caso queira trocar)

- **Brasil/futebol (raiz):** camisa-cbf-arquibancada, abre-a-corrida-dance, bandeira-capa-heroi,
  ola-mexicana-estadio, pose-pele-taca, churrasco-chinelo, cachecol-ole-ole, gm-bora-brasil.
- **Cenas (raiz):** mars-station, alpine-skiing, yoga-cliff, chef-gourmet, f1-cockpit,
  concert-pyro, old-library, summit-mountain-flag, street-photographer, pilot-clouds,
  pumpkin-halloween, beach-hammock.
- **Memes (15):** bitcoin-pizza-day, cypherpunk, satoshi-ghost, 21-million-cap, orange-pilled-matrix,
  chad, jedi-master, lotr-one-coin, mad-max, mr-worldwide, surfer, wolf-of-wall-street, dj,
  mengao-maximalista, astronaut, capoeira, hodler, selva-brasileira, anti-drex-cbdc,
  soberano-individual, this-is-fine, drake, galaxy-brain, detective, pirate, wizard, ignoring-altcoins.
- **Batalhas (14):** vs-pikachu, vs-ronald-mcdonald, vs-duo-duolingo, vs-mario, vs-michelin-bibendum,
  vs-sonic, vs-tony-tiger, vs-mr-monopoly, vs-pillsbury, vs-polar-bear, vs-cheetah, vs-capitao-caverna, vs-mms.
- **hero-landscape (16:9, 5):** gm-coffee, self-custody-sage, tick-tock-next-block, hodler, chad.
  (Não selecionados acima porque o case usa formato quadrado/livre; úteis se quiser banner widescreen.)
- **Vídeos (3 mp4):** v1-abre-a-corrida, v2-ola-estadio, v3-samba-carnaval (não copiados — só imagens pedidas).
- `_rejected/` em Batalhas e Memes = ignorados (já reprovados na origem).
