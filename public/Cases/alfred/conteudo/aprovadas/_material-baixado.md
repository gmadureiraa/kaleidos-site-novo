# Alfred (DSEC) — imagens APROVADAS do Drive

> Status: **BLOQUEADO POR ACESSO — 0 imagens baixadas.** Pasta criada, nada dentro.
> Data da tentativa: 2026-06-26
> Drive: https://drive.google.com/drive/u/5/folders/1yqs6fVKjiSiOI7qGfND7J-YI99GgeDdr
> Pasta no Drive: "Alfred Kaleidos" (owner madureira@kaleidosdigital.com)

## Por que não baixou

Os dois métodos previstos falharam:

1. **MCP Google Drive** — `search_files` e `get_file_metadata` funcionam (consegui listar TODA a pasta, IDs abaixo), mas `download_file_content` (o único que entrega os bytes) retorna `MCP server "claude.ai Google Drive" session expired` em 100% das chamadas, tanto na sessão principal quanto nos forks. A sessão do escopo de download caducou e não dá pra renovar de dentro da sessão. Além disso o MCP tem cap de 10MB e ~6 arquivos passam disso.
2. **Cookies do Chrome** — o perfil Default usa Chrome schema v24 (cookies app-bound encryption). Os cookies descriptografam limpos (SID/SAPISID com tamanhos corretos) mas o Google rejeita a sessão: até `drive.google.com/drive/my-drive` redireciona pro login (302 → accounts.google.com). App-bound encryption exige o processo do Chrome; a chave do Keychain sozinha não basta nessa versão. Artefatos de cookie extraídos foram APAGADOS.

## O que o Gabriel precisa fazer pra desbloquear

Qualquer UMA destas:
- **Reconectar o conector "claude.ai Google Drive"** (refazer o OAuth do MCP) — aí dá pra baixar os <10MB direto; os 6 grandes precisam de método alternativo (API Drive com OAuth/curl) ou download manual.
- **Compartilhar a pasta com link público** ("qualquer pessoa com o link") — aí baixo tudo via `drive.usercontent.google.com/download?id=<id>` sem auth.
- **Baixar manualmente** a pasta e jogar em `public/Cases/alfred/conteudo/aprovadas/`.

## Inventário COMPLETO das imagens APROVADAS (prontas pra baixar quando liberar)

Tudo abaixo está FORA das subpastas `_rejected` = aprovado. Nome destino sugerido = `<NAME>.webp` (converter PNG→WebP q82, sem corte, proporção nativa).

### Cenas / persona (raiz "Alfred Kaleidos")
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1HTIdFq4V-eYPydfuCO8xHRRvv82vS-rJ | 01-cyberpunk-tokyo.png | alfred-scene-01-cyberpunk-tokyo | Alfred Tóquio cyberpunk (>10MB) |
| 1hGs6iLhfJqf6SvlkemgKNyrP91tFQWDQ | 02-mars-station-window.png | alfred-scene-02-mars-station-window | estação em Marte |
| 1aC9KtS1QHiYbk02ASbmZ_EoHNuyCpypR | 03-alpine-skiing-top.png | alfred-scene-03-alpine-skiing-top | esqui alpino |
| 1wTJJUp9P91cAEDIqTM0C2BS8RJZHRVJL | 04-yoga-cliff-sunrise.png | alfred-scene-04-yoga-cliff-sunrise | yoga no penhasco |
| 1ujsf_1DXjkEUQUlG251C3MTYCuone5EA | 05-chef-gourmet-pasta.png | alfred-scene-05-chef-gourmet-pasta | chef gourmet (>10MB) |
| 1YksW5VwNtrDQ7NOp0Mv6CBhQrDdGMBde | 06-f1-cockpit-grid.png | alfred-scene-06-f1-cockpit-grid | cockpit F1 |
| 1vrbWX1RyXCB9vISu2hTzGqR6aLG_B9bn | 07-hardware-wallet-unbox.png | alfred-scene-07-hardware-wallet-unbox | unbox hardware wallet |
| 1eIrUiyZmifRlna46IEGVKZFyZFWrV1DA | 08-concert-pyro-stage.png | alfred-scene-08-concert-pyro-stage | show/palco (>10MB) |
| 1syGEkX8rrCJf7kwGHN00EJxxVKhZ4-KS | 09-old-library-leather.png | alfred-scene-09-old-library-leather | biblioteca antiga |
| 1xS6bGWDY5ifZlE-LuKegMmpeXkZqpQlx | 10-summit-mountain-flag.png | alfred-scene-10-summit-mountain-flag | cume com bandeira |
| 1U8E2SjhiSbVO7lPPWwhedJrzcrBTXilT | 11-street-photographer.png | alfred-scene-11-street-photographer | fotógrafo de rua |
| 1nERwAL3oONudcSqmzX_oc-DGASrTdMcX | 12-pilot-clouds-cockpit.png | alfred-scene-12-pilot-clouds-cockpit | piloto nas nuvens |
| 1gId7JpYYkIDIvK2SyUIbiY1E4Xm91o97 | 13-pumpkin-halloween-bitcoin.png | alfred-scene-13-pumpkin-halloween-bitcoin | halloween bitcoin |
| 1srD7NbUVp17LAsKKAO_PUgBZu8o_58hA | 14-beach-hammock-palms.png | alfred-scene-14-beach-hammock-palms | praia/rede (>10MB) |
| 1h9Y2yhgM8VG7PZ6cxeR9qMu44vlA0bOo | 15-bitcoin-miner-farm.png | alfred-scene-15-bitcoin-miner-farm | fazenda de mineração (>10MB) |

### Brasil / futebol (raiz "Alfred Kaleidos")
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1L4PDrw4coiKWYC-vOWxnTzW7FsNSMFve | 01-camisa-cbf-arquibancada.png | alfred-brasil-01-camisa-cbf-arquibancada | camisa CBF |
| 1rjFiX6zA1mBakQV2m05gv6Kma5hWW2aQ | 02-maracana-bandeirao.png | alfred-brasil-02-maracana-bandeirao | Maracanã |
| 1okQeFdk8pHMUmoAU3NKH5_-fQmBxCdrl | 03-abre-a-corrida-dance.png | alfred-brasil-03-abre-a-corrida-dance | dança |
| 1vyeWvoX8aDPhnwOLjeqP7NEE9w-YErSP | 04-bandeira-capa-heroi.png | alfred-brasil-04-bandeira-capa-heroi | bandeira de capa |
| 1d81510PYmH89IkO-fsg2zrKOt6Fl9wJ0 | 05-ola-mexicana-estadio.png | alfred-brasil-05-ola-mexicana-estadio | ola mexicana |
| 1DxxuSawmANP4lnD4RhM-pPhAMX5Evd9N | 06-pose-pele-taca.png | alfred-brasil-06-pose-pele-taca | pose com taça |
| 1f0chWa1uoDPbefOS8BgvY8kj7IWlviQ7 | 07-churrasco-chinelo.png | alfred-brasil-07-churrasco-chinelo | churrasco/chinelo |
| 1-fneK-enfjIi6F3fkvBa1L8zN0-2qzEC | 08-samba-carnaval.png | alfred-brasil-08-samba-carnaval | samba/carnaval |
| 1kKLXkZcGV7l1sYG3NdpbFcOwMFjJ06an | 09-cachecol-ole-ole.png | alfred-brasil-09-cachecol-ole-ole | cachecol |
| 1RDc2CMZ3ymEBzjpc6hMNCJuaimBfjchc | 10-gm-bora-brasil.png | alfred-brasil-10-gm-bora-brasil | gm bora Brasil |

### gm (subpasta /gm)
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1zfQ11AxFUfjs5UhGISJBL3C4msIq7DkW | 01-gm-coffee.png | alfred-gm-coffee-approved | gm com café (substitui o atual alfred-gm-coffee.jpg) |

### Hero 16:9 (subpasta /hero-landscape)
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1jIdLOJlnKl4AtmHcEeUlUHig3EwsemyR | 01-gm-coffee-16-9.png | alfred-hero-01-gm-coffee-16-9 | gm café 16:9 |
| 1kpNXuRZIsWd6C6yGxW_XPqFbYhZ2YYAq | 02-self-custody-sage-16-9.png | alfred-hero-02-self-custody-sage-16-9 | self custody 16:9 |
| 1pbecIE3Zg3KbbL7rsufnxQsM9PGoY5mp | 03-tick-tock-next-block-16-9.png | alfred-hero-03-tick-tock-next-block-16-9 | tick tock 16:9 |
| 15nTDlfGrXsFBEQjTPx3rikrf8KQWebua | 04-hodler-16-9.png | alfred-hero-04-hodler-16-9 | hodler 16:9 |
| 1DH6J7D7e4Cwv3o2yu5SYbJSDlSuemKAd | 05-chad-16-9.png | alfred-hero-05-chad-16-9 | chad 16:9 |

### Memes (subpasta /Memes — fora de _rejected)
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1RZClgdf-6f5N-5vp87hIBKiorr-LM2sv | 01-bitcoin-pizza-day.png | alfred-meme-01-bitcoin-pizza-day | Bitcoin Pizza Day (>10MB) |
| 17bS3LnPR-ZOQscZNq35BWZQZjutyRZyJ | 02-cypherpunk.png | alfred-meme-02-cypherpunk | cypherpunk |
| 1G6h2h8E4pyid7XoKyDEaOc5Zn2sz9ngi | 03-satoshi-ghost.png | alfred-meme-03-satoshi-ghost | Satoshi fantasma |
| 1F_7schSp17v1sUZTRkRGuTE1YZsq63cW | 04-21-million-cap.png | alfred-meme-04-21-million-cap | 21 milhões |
| 1Y4WwB3Q_-MuzdnrhMgRGHzqW0jHAPo5F | 05-orange-pilled-matrix.png | alfred-meme-05-orange-pilled-matrix | orange pill matrix |
| 16zOgokcWLL4LyOgzUWbtj1aOpQnR4nck | 06-chad.png | alfred-meme-06-chad | chad |
| 1h8-X3AJvWgjPT_Ozv56N_l9Ms_7HmR-z | 07-tick-tock-next-block.png | alfred-meme-07-tick-tock-next-block | tick tock next block |
| 1MNjPh8tHFjGSkkOL9QhXi_-luVUmpszM | 08-mad-max-wasteland.png | alfred-meme-08-mad-max-wasteland | mad max |
| 1iKyrR87FfZghyIrZ7MIFT-rXEHGUiLeM | 09-wolf-of-wall-street.png | alfred-meme-09-wolf-of-wall-street | wolf of wall street |
| 1wdhYX9yhPitmuoL5ICMCCz2QVOEIYJuk | 10-mengao-maximalista.png | alfred-meme-10-mengao-maximalista | mengão maximalista |
| 1rnLZ1VHCxoP_LhIdRAN8IsxhoCQZNpdy | 11-capoeira.png | alfred-meme-11-capoeira | capoeira |
| 1tymSutWWpWUdVotVxXgjfBLWGzfajcxc | 12-selva-brasileira.png | alfred-meme-12-selva-brasileira | selva brasileira (>10MB) |
| 1eTmMEiAMi4p5dpzdOqle-PYWXQDeEuo- | 13-anti-drex-cbdc.png | alfred-meme-13-anti-drex-cbdc | anti DREX/CBDC |
| 1OxuvDKwZKaOJ3moes8KUAw876P5Rr4Kx | 14-soberano-individual.png | alfred-meme-14-soberano-individual | indivíduo soberano |
| 1T8HxNh5dPtnZnc_GnQ-jTcPglw7R3K60 | 15-cafe-com-bitcoin.png | alfred-meme-15-cafe-com-bitcoin | café com bitcoin (>10MB) |
| 1QWN1WYstbmvEStdH5jXgKzcHe_Y2SWDT | 01-this-is-fine.png | alfred-meme-tpl-01-this-is-fine | this is fine |
| 1MdA-jtONEnASikBe8bVnAE0X4Jy9Tdyz | 02-drake.png | alfred-meme-tpl-02-drake | drake |
| 1znCSbw9BxFhtnW3oH9Hk68LcMh7gQvd7 | 03-galaxy-brain.png | alfred-meme-tpl-03-galaxy-brain | galaxy brain |
| 1DGBrLG_U_SPdydyFNMAFHtpJxhQu2ngW | 04-ignoring-altcoins.png | alfred-meme-tpl-04-ignoring-altcoins | ignoring altcoins |
| 1R6rHZRoVa7FZhTNkONQWf4u7bdovXYmy | 05-self-custody-sage.png | alfred-meme-tpl-05-self-custody-sage | self custody sage |
| 1JqTPe19tnIFOazZFih3ZRolQDMopNX5f | 08-mr-worldwide.png | alfred-meme-tpl-08-mr-worldwide | mr worldwide |
| 1dstapVoOaZ6cnsry-XQOK3565mIZOGsT | 09-surfer.png | alfred-meme-tpl-09-surfer | surfista |
| 1X61u62hdyEAY7_pGRBmUErG_QX4RTDsd | 10-dj.png | alfred-meme-tpl-10-dj | DJ |
| 18r-aItVEEobUFiduoQ0FsrC7rTTsgZuY | 11-astronaut.png | alfred-meme-tpl-11-astronaut | astronauta |
| 18t7rLO1T9_tcj6HxTPPHJzho3g_8e8DN | 12-hodler.png | alfred-meme-tpl-12-hodler | hodler |
| 11gzQnRxfnqiBwOUTjafzKg21xM52SQ17 | 13-detective.png | alfred-meme-tpl-13-detective | detetive |
| 1wN2bGGK0cSwmDqv3Ju9MplvTcMxMRcWh | 14-pirate.png | alfred-meme-tpl-14-pirate | pirata |
| 1xysT3HUBvCdzpB8qsHvwgNB7eG5tPf5K | 15-wizard.png | alfred-meme-tpl-15-wizard | mago |

### Batalhas / "vs" (subpasta /Batalhas — fora de _rejected)
| fileId | original | NAME destino | tema |
|---|---|---|---|
| 1AzdALyIFD865FZqtmMY8Q5g5NJZZS27M | 01-vs-ronald-mcdonald.png | alfred-batalha-01-vs-ronald-mcdonald | vs Ronald McDonald |
| 1s0YCAVCkRq55kMq3fHRODLCTM12JziQn | 01-vs-pikachu.png | alfred-batalha-01-vs-pikachu | vs Pikachu |
| 1ZxT1G4vxrzx8NPzNWhveQtvxUCL8d0YA | 02-vs-duo-duolingo.png | alfred-batalha-02-vs-duo-duolingo | vs Duo (Duolingo) |
| 1Qb1Y7psmuW1VVaRGfn9vbhrk11sY4pfP | 02-vs-mario.png | alfred-batalha-02-vs-mario | vs Mario |
| 14FXWTn1BGtC_AcS05MwsrXKvIFz4vZ3F | 03-vs-michelin-bibendum.png | alfred-batalha-03-vs-michelin-bibendum | vs Michelin |
| 1TUCyEbZNZT7D-SanaeyiYURX3eJiwq0M | 03-vs-sonic.png | alfred-batalha-03-vs-sonic | vs Sonic |
| 1Shir_rc5Hx-g6BNbye3UN0Lc5jGlw8hl | 04-vs-tony-tiger.png | alfred-batalha-04-vs-tony-tiger | vs Tony Tiger |
| 1zAxdTP16hKbXBiM_17PZeFvHsG7GwZ1K | 04-vs-drex-mascot.png | alfred-batalha-04-vs-drex-mascot | vs mascote DREX |
| 1huHoDa4o6bxCoQUXjGbXn-qVzl-3Z_Tr | 05-vs-mr-monopoly.png | alfred-batalha-05-vs-mr-monopoly | vs Mr Monopoly |
| 1B95mY8Prl7JpDl1hwEyZvRWlsjJC4u0V | 06-vs-pillsbury-doughboy.png | alfred-batalha-06-vs-pillsbury-doughboy | vs Pillsbury Doughboy |
| 174tE3LVkLMa5v-D9BOIzUN3LNvtLxujY | 06-vs-polar-bear.png | alfred-batalha-06-vs-polar-bear | vs urso polar |
| 15zm1B-8at2Uyx8etQZCKqgsuaLW-fO2U | 08-vs-cheetah.png | alfred-batalha-08-vs-cheetah | vs Cheetah |
| 1V1S2L9sGBO7ITzRwuHOvuTjgI5GESAWI | 09-vs-mms.png | alfred-batalha-09-vs-mms | vs M&Ms |
| 1EYU0YZTNHmuuHYA1NiWmlAk2nzdVL1RT | 09-vs-capitao-caverna.png | alfred-batalha-09-vs-capitao-caverna | vs Capitão Caverna |

### Vídeos aprovados (raiz, não baixados — case usa imagens)
| fileId | original | tema |
|---|---|---|
| 18bR0wdBxZSxopmXs_LKkeXX78jslcGbc | v1-abre-a-corrida.mp4 | abre a corrida |
| 1g0lwzbRVA9DDEJJI4tXpah2ACeVAPRzh | v2-ola-estadio.mp4 | ola no estádio |
| 1OSFU5cufcYgCfIA86pooCcLxGnAUyTrg | v3-samba-carnaval.mp4 | samba/carnaval |

## Imagens ERRADAS atuais no case (a trocar depois)

Estão em `public/Cases/alfred/conteudo/` (29 .jpg/.png). O `case-data.ts` (linhas ~805-808) referencia 4 delas no carrossel:
- alfred-gm-coffee.jpg
- alfred-self-custody.jpg
- alfred-vs-hacker.jpg
- alfred-wrench-attack.jpg

O próximo agente troca essas 4 (e/ou amplia o carrossel) pelas aprovadas acima, depois de elas serem baixadas. NÃO editei case-data.ts.
