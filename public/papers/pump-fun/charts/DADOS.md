# DADOS DOS GRÁFICOS — Kaleidos Paper · Pump.fun
> Pareia com `charts.js`. Cada gráfico: tabela de dados + fonte + confiança.
> **Real** = marco com data/valor confirmado. **Acum.** = soma cumulativa da série trimestral Real. **Estimado** = relato 2ª mão / arredondado.

---

## 1. chartReceitaTri — Receita trimestral (US$ M)
Fonte: DefiLlama (fees=revenue), leitura 16/06/2026.

| Trimestre | US$ M | Confiança |
|---|---|---|
| Q1 24 | 2,44 | Real |
| Q2 24 | 47,89 | Real |
| Q3 24 | 63,53 | Real |
| Q4 24 | 207,31 | Real |
| Q1 25 | 263,81 | Real (PICO) |
| Q2 25 | 144,19 | Real |
| Q3 25 | 110,49 | Real |
| Q4 25 | 100,97 | Real |
| Q1 26 | 108,29 | Real |
| Q2 26* | 66,55 | Real (parcial) |

URL: https://defillama.com/protocol/pump.fun?fees=true&revenue=false&groupBy=monthly

## 2. chartRevAcum — Receita acumulada (US$ M)
Soma cumulativa da série acima (Acum.). Marcos de checagem: cruzou US$ 50M fim/24 (The Block); lifetime US$ 1,04B jun/26 (DefiLlama). A série bate (~US$ 1,05B no Q1/26, ~US$ 1,12B com Q2 parcial = fees lifetime).
URLs: https://www.theblock.co/post/302734/pump-funs-cumulative-revenue-crosses-50-million · https://defillama.com/protocol/pump.fun

## 3. chartReceita2025 — Ranking receita 2025 (US$ bi)
Fonte ÚNICA e consistente: CoinGecko Top Revenue-Generating Protocols 2025.

| Protocolo | US$ bi | Confiança |
|---|---|---|
| Tether | 5,2 | Real |
| TRON | 3,45 | Real |
| Circle | 2,38 | Real |
| Hyperliquid | 0,742 | Real |
| **Pump.fun** | **0,536** | Real |

URL: https://www.coingecko.com/learn/top-revenue-generating-protocols
Nota: DefiLlama dá receita 2025 Pump.fun = $664M (net, metodologia diferente). Pra o gráfico, tudo CoinGecko ($536M) por consistência. Pump.fun = #5, único launchpad no top-10.

## 4. chartFunil — O funil de extinção (tokens, log)
Fonte: Solidus Labs (via CoinDesk, 7 mai 2025) + taxa de graduação Cryptopolitan/LaikaLabs.

| Etapa | Tokens | Confiança |
|---|---|---|
| Lançados (até mai/25) | ~7.000.000 | Real (Solidus) |
| Mantêm >US$ 1k liquidez | ~97.000 | Real (Solidus) |
| Graduam (curva cheia) | ~70.000 (≈1% dos 7M) | Estimado (taxa 0,8–1,4%) |

URLs: https://www.coindesk.com/business/2025/05/07/98-of-tokens-on-pump-fun-have-been-rug-pulls-or-an-act-of-fraud-new-report-says · https://www.cryptopolitan.com/pump-fun-token-graduations-six-month-high/
Nota: graduados é derivado da taxa ~1% sobre 7M (escala ilustrativa em log). 98,6% = rug/fraude por Solidus.

## 5. chartShareFlip — Share Solana launchpad (Pump.fun vs LetsBonk)
Fonte: DL News / Coinpaper / Cointelegraph. Série de marcos (alguns pontos = ponte visual entre marcos reais).

| Data | Pump.fun % | LetsBonk % | Confiança |
|---|---|---|---|
| Jan/25 | 90 | 2 | Real (DL News ~90%) |
| Mai/25 | 80 | 5 | Real (~80% pico) |
| Jun/25 | 75 | 12 | Estimado (ponte) |
| 7 Jul | 40 | 58 | Real (flip, DL News/CoinDesk 55–58%) |
| 25 Jul | 24 | 84 | Real (Coinpaper/BlockchainReporter; PF fundo ~12–24%) |
| Ago/25 | 73,6 | 15,3 | Real (Cointelegraph/CoinGape) |
| Out/25 | 50 | 30 | Estimado (Padre/recuperação, PF ~44–50%) |
| Q1/26 | 81 | 12 | Estimado (AInvest ~81,2% restaurado) |

URLs: https://www.dlnews.com/articles/defi/pumpfun-revenue-falls-to-10-month-low/ · https://coinpaper.com/10122/lets-bonk-overtakes-pump-fun-as-leading-solana-meme-coin-platform · https://cointelegraph.com/news/pumpfun-solana-memecoin-revenue-lawsuit-august-2025
Nota: % varia por métrica (launches/receita/graduações). Tendência (queda jul → recuperação ago) é Real; pontos-ponte marcados Estimado.

## 6. chartPump — Preço do token PUMP (marcos)
| Marco | US$ | Confiança |
|---|---|---|
| ICO | 0,004 | Real (CoinDesk) |
| Abertura (perp mark) | 0,00529 | Real (Blockworks) |
| ATH | 0,00893 | Real (CoinGecko) |
| Atual (15 jun/26) | 0,00161 | Real (CoinMarketCap) |

URLs: https://www.coindesk.com/markets/2025/07/12/pumpfun-swiftly-raises-500m-in-public-sale-at-4b-fully-diluted-valuation · https://www.coingecko.com/en/coins/pump-fun · https://coinmarketcap.com/currencies/pump-fun/
Drawdown: −55,8% vs ICO; −82% vs ATH.

## 7. chartSupplyPump — Distribuição do supply PUMP (%)
Fonte: Blockworks / CoinDCX / Mitrade. Público 12,5–15%, private 18%, time ~20%, resto ecossistema/tesouro.

| Fatia | % | Confiança |
|---|---|---|
| Ecossistema/tesouro | 49 | Estimado (resto) |
| Time | 20 | Estimado |
| Private sale | 18 | Real |
| Venda pública | 13 | Real (12,5%) |

URLs: https://blockworks.co/news/pump-ico-dex-blockworks-research · https://www.mitrade.com/insights/news/live-news/article-3-970533-20250718
Nota: a crítica do "fair launch" é que ~38% (time+private) ficou com insiders.

## 8. chartLancamentos — Lançamentos/dia
| Período | Tokens/dia | Confiança |
|---|---|---|
| Pico (jan/25) | ~70.000 | Estimado (STORM) |
| Pós-frenesi | ~30.000 | Estimado (STORM) |

URL: https://storm.partners/blog-post/meme-coin-mania-on-pump-fun-an-economic-and-legal-analysis

## 9. chartBuyback — Buyback/burn de PUMP (US$ M)
| Item | US$ M | Confiança |
|---|---|---|
| Buyback acumulado (abr/26) | ~350 | Estimado (KuCoin/BeInCrypto) |
| Burn único (28 abr/26) | 370 | Real (The Block/CoinDesk) |

URLs: https://www.kucoin.com/news/articles/pump-fun-surpasses-300-million-in-pump-token-buybacks-a-deep-dive-into-the-platform-s-deflationary-strategy · https://www.coindesk.com/markets/2026/04/29/pump-fun-burns-36-of-pump-supply-in-usd370-million-wipe-locks-50-revenue-into-ongoing-buybacks
Nota: política mudou de 100% → 50% da receita líquida pra buyback (irreversível 12m).
