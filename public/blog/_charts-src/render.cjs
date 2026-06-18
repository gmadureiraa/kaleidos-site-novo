// Render Kaleidos blog charts -> PNG. Roda de DENTRO de code/kai-app:
//   NODE_PATH=/Users/gabrielmadureira/GOS/code/kai-app/node_modules node render.cjs
const { chromium } = require("playwright-core");
const BASE = "/Users/gabrielmadureira/GOS/code/site-kaleidos/public/blog";
const SRC = `${BASE}/_charts-src`;

const jobs = [
  { html: "stablecoins-rwa.html", out: "stablecoins-rwa-tamanho-mercado-oportunidade-marketing/grafico-1.png" },
  { html: "kol-tiers.html",       out: "kol-cripto-por-tier-quanto-custa-influencer/grafico-1.png" },
  { html: "retencao.html",        out: "retencao-comunidade-cripto-metricas-benchmarks/grafico-1.png" },
  { html: "seo-geo.html",         out: "seo-vs-geo-2026-onde-investir/grafico-1.png" },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 920, height: 700 }, deviceScaleFactor: 2 });
  for (const j of jobs) {
    await page.goto(`file://${SRC}/${j.html}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    const card = await page.$("#card");
    await card.screenshot({ path: `${BASE}/${j.out}` });
    console.log("OK", j.out);
  }
  await browser.close();
})();
