// Renderiza os 4 gráficos do batch 4 de blog em PNG.
// Rodar com: NODE_PATH=/Users/gabrielmadureira/GOS/code/kai-app/node_modules node render.cjs
const { chromium } = require("playwright-core");

const BASE = "/Users/gabrielmadureira/GOS/code/site-kaleidos";
const HTML = `${BASE}/scripts/_charts-blog4/charts.html`;

const MAP = [
  { card: "#c1", out: `${BASE}/public/blog/orcamento-lancamento-token-tge-custo/grafico-1.png` },
  { card: "#c2", out: `${BASE}/public/blog/airdrop-quanto-alocar-supply-roi/grafico-1.png` },
  { card: "#c3", out: `${BASE}/public/blog/mercado-marketing-cripto-brasil-2026/grafico-1.png` },
  { card: "#c4", out: `${BASE}/public/blog/funil-growth-cripto-awareness-conversao/grafico-1.png` },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1100, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${HTML}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  for (const { card, out } of MAP) {
    const el = await page.$(card);
    await el.screenshot({ path: out });
    console.log("OK", out);
  }
  await browser.close();
  console.log("DONE");
})();
