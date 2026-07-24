// Gerador de capas de blog HTML→PNG (puppeteer). Fonte real (Atelier) = acento
// perfeito, ao contrário do gerador de imagem por IA que dropa diacrítico.
// Estética: fundo preto + headline branca (Atelier uppercase) + acentos verdes
// desenhados + colagem P&B num burst rosa. Casa o look das capas boas.
//
// Uso: node scripts/gen-covers.mjs <input.json> <outDir>
//   input.json = [{slug, category, phrase}]
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import sharp from "sharp";

const [, , INPUT, OUT] = process.argv;
const items = JSON.parse(fs.readFileSync(INPUT, "utf-8"));
fs.mkdirSync(OUT, { recursive: true });

const GREEN = "#7CF067";
const PINK = "#D262B2";

// fontes → base64
const b64 = (p) => fs.readFileSync(p).toString("base64");
const ATELIER = b64("public/papers/base/fonts/Atelier.ttf");
const GRIDLITE = b64("public/papers/base/fonts/Gridlite.otf");

// pool de colagens (mesmo do CoverArt) → PNG base64 (webp não decodifica bem em
// data URI no headless; sharp converte pra PNG que renderiza garantido)
// só colagens-FOTO (colagem-*); grafismo-*/elemento-* são gráficos, não viram sticker
const POOL = fs.readdirSync("public/v2/elements").filter((f) => f.startsWith("colagem-") && f.endsWith(".webp"));
const collageB64 = {};
for (const f of POOL) {
  const png = await sharp(path.join("public/v2/elements", f)).png().toBuffer();
  collageB64[f] = png.toString("base64");
}

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const collageFor = (slug) => POOL[hashStr(slug) % POOL.length];

// tamanho da headline por comprimento
function headlineSize(phrase) {
  const n = phrase.length;
  if (n <= 14) return 124;
  if (n <= 20) return 108;
  if (n <= 28) return 90;
  if (n <= 38) return 74;
  if (n <= 48) return 60;
  if (n <= 58) return 52;
  return 46;
}

// burst star (spiky) SVG path
const BURST = `<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%">
  <path fill="${PINK}" d="M50 2 L58 24 L80 12 L72 36 L98 40 L76 52 L94 70 L68 66 L70 92 L52 74 L38 96 L36 68 L10 76 L26 54 L2 46 L28 38 L14 16 L40 26 Z"/>
</svg>`;

function html(item) {
  const phrase = item.phrase.replace(/\.$/, "").toUpperCase();
  const size = headlineSize(item.phrase);
  const collage = collageB64[collageFor(item.slug)];
  const label = { cripto: "CRIPTO", cases: "CASE", growth: "GROWTH", marketing: "MARKETING", ia: "IA" }[item.category] || "KALEIDOS";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Atelier;src:url(data:font/ttf;base64,${ATELIER});}
  @font-face{font-family:Gridlite;src:url(data:font/otf;base64,${GRIDLITE});}
  *{margin:0;padding:0;box-sizing:border-box}
  .card{width:1312px;height:736px;background:#0a0a0a;position:relative;overflow:hidden;
    background-image:radial-gradient(circle at 30% 40%, #17140f 0%, #0a0a0a 60%);}
  .frame{position:absolute;inset:22px;border-radius:26px;
    box-shadow:inset 0 0 0 2px #1c1c1c;
    background-image:radial-gradient(#ffffff10 1.1px, transparent 1.2px);background-size:9px 9px;
    -webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);
    -webkit-mask-composite:xor;mask-composite:exclude;padding:14px;}
  .head{position:absolute;left:74px;top:50%;transform:translateY(-52%);width:640px;z-index:3;
    font-family:Atelier;font-weight:900;color:#fff;text-transform:uppercase;
    font-size:${size}px;line-height:0.9;letter-spacing:-2px;}
  .head .dot{color:${GREEN}}
  .swoosh{position:absolute;left:60px;bottom:150px;width:520px;height:120px;z-index:2}
  .tick{position:absolute;stroke:${GREEN};stroke-width:7;stroke-linecap:round}
  .burst{position:absolute;right:64px;top:50%;transform:translateY(-50%);width:490px;height:490px;z-index:2}
  .sticker{position:absolute;inset:21%;background:#fff;border-radius:24px;z-index:3;
    display:flex;align-items:center;justify-content:center;overflow:hidden;
    box-shadow:0 12px 30px rgba(0,0,0,.45);}
  .sticker img{width:82%;height:82%;object-fit:contain;filter:grayscale(1) contrast(1.2)}
  .chip{position:absolute;left:76px;bottom:52px;z-index:4;font-family:Gridlite,monospace;
    font-size:15px;letter-spacing:2px;color:#06250a;background:${GREEN};padding:6px 13px;border-radius:4px;font-weight:700}
  </style></head><body>
  <div class="card">
    <div class="frame"></div>
    <div class="burst">${BURST}<div class="sticker"><img src="data:image/png;base64,${collage}"/></div></div>
    <div class="head">${phrase}<span class="dot">.</span></div>
    <svg class="swoosh" viewBox="0 0 520 120" fill="none">
      <path d="M20 70 C120 118, 360 118, 470 58" stroke="${GREEN}" stroke-width="9" stroke-linecap="round"/>
      <path d="M448 44 L476 56 L452 74" stroke="${GREEN}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
    <svg style="position:absolute;left:610px;top:150px;width:70px;height:70px;z-index:2" viewBox="0 0 70 70"><g class="tick">
      <line x1="8" y1="30" x2="24" y2="14"/><line x1="12" y1="52" x2="30" y2="40"/><line x1="40" y1="8" x2="52" y2="24"/>
    </g></svg>
    <div class="chip">${label} · KALEIDOS</div>
  </div>
  </body></html>`;
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1312, height: 736, deviceScaleFactor: 1 });
let done = 0;
for (const item of items) {
  await page.setContent(html(item), { waitUntil: "load", timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 120));
  const el = await page.$(".card");
  const outPath = path.join(OUT, `${item.slug}.png`);
  await el.screenshot({ path: outPath });
  done++;
  if (done % 20 === 0) console.log(`  ${done}/${items.length}`);
}
await browser.close();
console.log(`✓ ${done} capas geradas em ${OUT}`);
