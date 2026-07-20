#!/usr/bin/env node
// schedule-post.mjs — esteira de cadência do blog Kaleidos.
//
// O blog publica por DATA: cada post tem `publishedAt` e o gate
// `isPublished` (blog-data.ts) libera quando publishedAt <= agora. Post com
// data futura entra sozinho no dia, via ISR (revalidate 3600). Não há cron.
//
// Este script NÃO edita posts. Ele audita a cadência e sugere datas livres,
// pra escrever 1 post por dia sem buraco e sem empilhar.
//
// Uso:
//   node scripts/schedule-post.mjs            # relatório: buracos + dias empilhados + máx
//   node scripts/schedule-post.mjs --next 10  # sugere as próximas 10 datas livres (após a máx)
//   node scripts/schedule-post.mjs --holes    # só os buracos (datas passadas/entre posts sem conteúdo)
//   node scripts/schedule-post.mjs --from 2026-07-15  # janela de análise a partir de
//
// Saída pensada pra colar direto no publishedAt dos posts novos.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const LIB = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "lib");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const val = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

const DATE_RE = /publishedAt"?:\s*"(\d{4}-\d{2}-\d{2})"/g;

function collectDates() {
  const dates = [];
  for (const f of readdirSync(LIB)) {
    if (!f.endsWith(".ts")) continue;
    const src = readFileSync(join(LIB, f), "utf8");
    let m;
    while ((m = DATE_RE.exec(src)) !== null) dates.push(m[1]);
  }
  return dates.sort();
}

function iso(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(isoStr, n) {
  const d = new Date(isoStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}

const dates = collectDates();
if (dates.length === 0) {
  console.error("Nenhuma data encontrada em src/lib. Confere o caminho.");
  process.exit(1);
}

const counts = new Map();
for (const d of dates) counts.set(d, (counts.get(d) || 0) + 1);
const min = dates[0];
const max = dates[dates.length - 1];
const from = val("--from", "2026-07-15");

// buracos: dias entre `from` e `max` sem nenhum post
const holes = [];
const stacked = [];
{
  const set = new Set(dates);
  let cur = from;
  while (cur <= max) {
    if (!set.has(cur)) holes.push(cur);
    cur = addDays(cur, 1);
  }
  for (const [d, c] of [...counts.entries()].sort()) {
    if (c > 1 && d >= from) stacked.push([d, c]);
  }
}

if (flag("--holes")) {
  console.log(holes.join("\n"));
  process.exit(0);
}

if (flag("--next")) {
  const n = parseInt(val("--next", "10"), 10);
  const out = [];
  // primeiro consome buracos, depois estende após a máx
  const pool = [...holes];
  let cur = max;
  while (out.length < n) {
    if (pool.length) out.push(pool.shift());
    else {
      cur = addDays(cur, 1);
      out.push(cur);
    }
  }
  console.log(out.slice(0, n).join("\n"));
  process.exit(0);
}

// relatório padrão
console.log(`Blog Kaleidos — cadência`);
console.log(`  posts com data : ${dates.length}`);
console.log(`  intervalo      : ${min} → ${max}`);
console.log(`  janela análise : a partir de ${from}`);
console.log(`  buracos (${holes.length}): ${holes.length ? holes.join(", ") : "nenhum"}`);
if (stacked.length) {
  console.log(`  dias empilhados (>1 post, a partir de ${from}):`);
  for (const [d, c] of stacked) console.log(`    ${d}: ${c}`);
} else {
  console.log(`  dias empilhados: nenhum (a partir de ${from})`);
}
console.log(`\n  → próximas 5 datas livres: ${(() => {
  const pool = [...holes];
  const out = [];
  let cur = max;
  while (out.length < 5) {
    if (pool.length) out.push(pool.shift());
    else { cur = addDays(cur, 1); out.push(cur); }
  }
  return out.join(", ");
})()}`);
