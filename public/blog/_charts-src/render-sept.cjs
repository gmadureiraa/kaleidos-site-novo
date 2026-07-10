// Render dos 4 charts dos blogs de setembro -> PNG. Roda de DENTRO de code/kai-app:
//   NODE_PATH=/Users/gabrielmadureira/GOS/code/kai-app/node_modules node <path>/render-sept.cjs
const { chromium } = require("playwright-core");
const BASE = "/Users/gabrielmadureira/GOS/code/site-kaleidos/public/blog";
const SRC = `${BASE}/_charts-src`;

const slugs = [
  "ethereum-crise-de-narrativa",
  "chainlink-integracao-como-marketing",
  "depin-marketing-dois-lados",
  "eigenlayer-restaking-categoria",
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 920, height: 760 }, deviceScaleFactor: 2 });
  for (const s of slugs) {
    await page.goto(`file://${SRC}/${s}.html`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    const card = await page.$("#card");
    await card.screenshot({ path: `${BASE}/${s}/grafico-1.png` });
    console.log("OK", `${s}/grafico-1.png`);
  }
  await browser.close();
})();
