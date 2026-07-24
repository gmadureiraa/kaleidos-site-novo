// Gerador de capas de blog HTML→PNG (puppeteer). Fonte real (Atelier) = acento
// perfeito. Elemento P&B recortado (fundo transparente) FLUTUANDO no burst, com
// contraste (branco no rosa / escuro no verde) e variedade (cor+rotação do burst
// e pool grande de colagens por hash do slug).
//
// Uso: node scripts/gen-covers.mjs <input.json> <outDir>   // [{slug,category,phrase}]
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

// POOL: colagens que JÁ vêm sem fundo (transparentes). Usadas COMO ESTÃO — sem
// remover fundo, sem recolorir, sem halo (o Gabriel já mandou sem fundo; forçar
// mastigava a imagem). Filtra por nome de subject + transparência real; trim só
// pra cortar borda vazia; dedupe png/webp.
const DIRS = ["public/v2/collage", "public/v2/elements", "public/v2/hands"];
const SUBJECT = /colagem|hands|david|eye|megafone|mao|mulher|maquina|boca|dali|einstein|olho|brain|estatua|cerebro|relogio|smartphone|dinheiro|cursor|robo|washington|tvs|computador/i;
const seen = new Set();
const candidates = [];
for (const d of DIRS) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!/\.(webp|png)$/i.test(f)) continue;
    if (!SUBJECT.test(f)) continue;
    const stem = f.replace(/\.(webp|png)$/i, "");
    if (seen.has(stem)) continue; seen.add(stem);
    candidates.push(path.join(d, f));
  }
}
// saturação média sobre pixels visíveis (pra descartar elemento colorido)
function meanSat(data, info) {
  const c = info.channels; let sat = 0, cnt = 0;
  for (let i = 0; i < info.width * info.height; i++) {
    if (c === 4 && data[i * c + 3] < 40) continue;
    const r = data[i * c], g = data[i * c + 1], b = data[i * c + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    sat += mx === 0 ? 0 : (mx - mn) / mx; cnt++;
  }
  return cnt ? sat / cnt : 0;
}
async function loadElement(fp) {
  const st = await sharp(fp).stats();
  if (st.isOpaque) return null; // opaco (foto/retângulo com fundo) → fora
  // é RECORTE DE VERDADE? precisa de bastante área transparente ao redor
  const { data, info } = await sharp(fp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const c = info.channels; let transp = 0;
  for (let i = 0; i < info.width * info.height; i++) if (data[i * c + 3] < 30) transp++;
  const transpFrac = transp / (info.width * info.height);
  if (transpFrac < 0.22) return null; // pouca transparência = retângulo (ex: eye-halftone) → fora
  if (meanSat(data, info) > 0.28) return null; // colorido → clasha com burst → fora
  // usa COMO ESTÁ, só trim da borda transparente
  let buf;
  try { buf = await sharp(fp).trim({ threshold: 8 }).png().toBuffer(); } catch { buf = await sharp(fp).png().toBuffer(); }
  return buf.toString("base64");
}
const POOL = [];
for (const fp of candidates) {
  const b = await loadElement(fp);
  if (b) POOL.push(b);
}
console.log(`pool de colagens transparentes (as-is): ${POOL.length}`);

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

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

// burst star spiky
function burst(color, rot) {
  return `<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%;transform:rotate(${rot}deg)">
    <path fill="${color}" d="M50 2 L58 24 L80 12 L72 36 L98 40 L76 52 L94 70 L68 66 L70 92 L52 74 L38 96 L36 68 L10 76 L26 54 L2 46 L28 38 L14 16 L40 26 Z"/>
  </svg>`;
}

function html(item) {
  const phrase = item.phrase.replace(/[.\s]+$/, "").toUpperCase();
  const size = headlineSize(item.phrase);
  const hs = hashStr(item.slug);
  const collage = POOL[hs % POOL.length];
  const rot = (hs % 8) * 15; // rotação do burst
  const pinkBurst = (hs >> 3) % 2 === 0; // varia cor do burst
  const burstColor = pinkBurst ? PINK : GREEN;
  const accent = pinkBurst ? GREEN : PINK; // acento complementa o burst
  // elemento usado COMO ESTÁ (cor+alpha originais). Só uma sombra sutil pra
  // separar do burst — sem remover fundo, sem recolorir, sem halo forçado.
  const collageFilter = "filter:drop-shadow(0 6px 14px rgba(0,0,0,.55));";
  const label = { cripto: "CRIPTO", cases: "CASE", growth: "GROWTH", marketing: "MARKETING", ia: "IA" }[item.category] || "KALEIDOS";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Atelier;src:url(data:font/ttf;base64,${ATELIER});}
  @font-face{font-family:Gridlite;src:url(data:font/otf;base64,${GRIDLITE});}
  *{margin:0;padding:0;box-sizing:border-box}
  .card{width:1312px;height:736px;background:#0a0a0a;position:relative;overflow:hidden;
    background-image:radial-gradient(circle at 28% 42%, #17140f 0%, #0a0a0a 62%);}
  .frame{position:absolute;inset:22px;border-radius:26px;box-shadow:inset 0 0 0 2px #1c1c1c;
    background-image:radial-gradient(#ffffff10 1.1px, transparent 1.2px);background-size:9px 9px;
    -webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);
    -webkit-mask-composite:xor;mask-composite:exclude;padding:14px;}
  .head{position:absolute;left:74px;top:50%;transform:translateY(-52%);width:640px;z-index:3;
    font-family:Atelier;font-weight:900;color:#fff;text-transform:uppercase;
    font-size:${size}px;line-height:0.9;letter-spacing:-2px;}
  .head .dot{color:${accent}}
  .burst{position:absolute;right:64px;top:50%;transform:translateY(-50%);width:490px;height:490px;z-index:2}
  .collage{position:absolute;inset:16%;width:68%;height:68%;object-fit:contain;z-index:3;${collageFilter}}
  .swoosh{position:absolute;left:60px;bottom:150px;width:520px;height:120px;z-index:2}
  .chip{position:absolute;left:76px;bottom:52px;z-index:4;font-family:Gridlite,monospace;
    font-size:15px;letter-spacing:2px;color:${pinkBurst ? "#06250a" : "#3a0a2c"};background:${accent};padding:6px 13px;border-radius:4px;font-weight:700}
  </style></head><body>
  <div class="card">
    <div class="frame"></div>
    <div class="burst">${burst(burstColor, rot)}<img class="collage" src="data:image/png;base64,${collage}"/></div>
    <div class="head">${phrase}<span class="dot">.</span></div>
    <svg class="swoosh" viewBox="0 0 520 120" fill="none">
      <path d="M20 70 C120 118, 360 118, 470 58" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <path d="M448 44 L476 56 L452 74" stroke="${accent}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
    <svg style="position:absolute;left:610px;top:150px;width:70px;height:70px;z-index:2" viewBox="0 0 70 70"><g style="stroke:${accent};stroke-width:7;stroke-linecap:round">
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
  await new Promise((r) => setTimeout(r, 100));
  const el = await page.$(".card");
  await el.screenshot({ path: path.join(OUT, `${item.slug}.png`) });
  if (++done % 40 === 0) console.log(`  ${done}/${items.length}`);
}
await browser.close();
console.log(`✓ ${done} capas geradas em ${OUT}`);
