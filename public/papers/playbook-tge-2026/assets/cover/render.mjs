// Renderiza capa.html -> capa.png (A4 retrato) via Playwright (chromium de kai-app).
import fs from "node:fs";
import path from "node:path";
import pw from "/Users/gabrielmadureira/GOS/code/kai-app/node_modules/playwright/index.js";
const { chromium } = pw;

const DIR = path.dirname(new URL(import.meta.url).pathname);
const HTML = path.join(DIR, "capa.html");
const OUT = path.join(DIR, "capa.png");

let html = fs.readFileSync(HTML, "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
const el = await page.$(".page");
await el.screenshot({ path: OUT });
await browser.close();
console.log("OK:", OUT, fs.statSync(OUT).size, "bytes");
