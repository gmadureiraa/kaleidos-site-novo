/**
 * Perf image optimization — converte os PNGs pesados que estavam sendo servidos
 * em resolução gigante (2160x2880 / 1080x1080) pra WebP redimensionado a uma
 * resolução sensata (retina ~2x o tamanho de exibição real).
 *
 * NÃO deleta os PNGs originais — gera .webp irmão. As referências no código
 * apontam pro .webp. Rodar: `node scripts/optimize-images-perf.mjs`
 */
import sharp from "sharp";
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");

// [arquivo relativo a public, largura alvo, quality]
const JOBS = [
  // Capas de papers — exibidas ~300-400px, retina 800px de largura.
  ["papers/cover-playbook.png", 800, 82],
  ["papers/cover-vol-01.png", 800, 82],
  ["papers/cover-vol-02.png", 800, 82],
  ["papers/cover-vol-04.png", 800, 82],
  ["papers/cover-vol-05.png", 800, 82],
  ["papers/cover-solana.png", 800, 82],
  ["papers/cover-tge.png", 800, 82],
  ["papers/cover-bull-market.png", 800, 82],
  // Olho do hero-diferenciais (hero visual grande).
  ["v2/collage/eye-halftone.png", 800, 80],
  // Pool de capas de blog (blog-cover-variants) — exibidas em card ~300-400px,
  // aparecem na seção de recursos da home. Todas a 700px webp.
  ["v2/elements/colagem-cerebro-oculos.png", 700, 82],
  ["v2/elements/colagem-megafone-mao-pb.png", 700, 82],
  ["v2/elements/colagem-mao-smartphone-neon.png", 700, 82],
  ["v2/elements/colagem-maos-dinheiro-bitcoin.png", 700, 82],
  ["v2/elements/colagem-homem-relogio-correndo.png", 700, 82],
  ["v2/elements/colagem-computador-retro-amarelo.png", 700, 82],
  ["v2/elements/colagem-tvs-retro-empilhadas.png", 700, 82],
  ["v2/elements/colagem-mao-cursor-criacao.png", 700, 82],
  ["v2/elements/colagem-washington-dolar-verde.png", 700, 82],
  ["v2/elements/colagem-estatua-pensador-cabeca.png", 700, 82],
  ["v2/elements/elemento-olho-halftone-pb.png", 700, 82],
  ["v2/elements/colagem-mao-robo-humana.png", 700, 82],
  ["v2/elements/colagem-dali-boca-pb.png", 700, 82],
  ["v2/elements/colagem-maos-laptop-setas-rosa.png", 700, 82],
  // Estrelas exibidas 34-156px, retina 220px cobre o maior clamp.
  ["v2/collage/star-pink.png", 220, 88],
  ["v2/collage/star-green.png", 220, 88],
  ["v2/elements/grafismo-estrela-rosa-01.png", 220, 88],
  ["v2/elements/grafismo-estrela-verde-01.png", 220, 88],
  // Colagens decorativas do hero/problema/processo (exibidas 150-300px).
  ["v2/collage/brain-glasses.png", 600, 82],
  ["v2/collage/david.png", 600, 82],
  ["v2/elements/colagem-einstein-kaleidos.png", 600, 82],
  ["v2/collage/scared-boy.png", 700, 82],
  ["v2/collage/david-bubble.png", 480, 82],
  ["v2/collage/hand-cursor.png", 600, 82],
];

const kb = (n) => (n / 1024).toFixed(0);

async function run() {
  let before = 0;
  let after = 0;
  const rows = [];
  for (const [rel, width, quality] of JOBS) {
    const src = join(PUB, rel);
    if (!existsSync(src)) {
      console.warn("SKIP (missing):", rel);
      continue;
    }
    const out = src.replace(/\.png$/, ".webp");
    const srcKB = statSync(src).size;
    const meta = await sharp(src).metadata();
    // Só reduz se a origem for maior que o alvo (evita upscale).
    const targetW = Math.min(width, meta.width);
    await sharp(src)
      .resize({ width: targetW, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    const outKB = statSync(out).size;
    before += srcKB;
    after += outKB;
    rows.push(
      `${rel.padEnd(46)} ${(meta.width + "x" + meta.height).padEnd(11)} -> ${targetW}px webp  ${kb(
        srcKB
      ).padStart(5)}KB -> ${kb(outKB).padStart(4)}KB`
    );
  }
  console.log(rows.join("\n"));
  console.log("\nTOTAL", kb(before) + "KB ->", kb(after) + "KB  (saved " + kb(before - after) + "KB)");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
