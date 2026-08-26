import { describe, expect, test } from "bun:test";
import { existsSync } from "fs";
import { join } from "path";
import { blogPosts } from "@/lib/blog-data";

/**
 * Guarda de mídia do acervo.
 *
 * Em 26/08/2026 havia 10 posts NO AR referenciando `/blog/<slug>/grafico-1.png`
 * sem o arquivo existir em `public/` — o gráfico nunca foi gerado (não há
 * HTML-fonte em `public/blog/_charts-src/` nem entrada no `scripts/_charts-blog4`).
 * O leitor via o ícone de imagem quebrada com a legenda embaixo.
 *
 * Nada denunciava: a auditoria de links internos só testa `<a>`, e a rota do post
 * responde 200 com a imagem quebrada dentro. Este teste é o que denuncia.
 *
 * Só checa imagem LOCAL (caminho começando com `/`). Imagem do KAI vem por URL
 * externa e não passa por aqui.
 */

const PUBLIC = join(import.meta.dir, "../../../public");
const MD_IMAGE = /!\[[^\]\n]*\]\((\/[^)\s]+)\)/g;

function localImagesOf(markdown: string): string[] {
  const out: string[] = [];
  MD_IMAGE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MD_IMAGE.exec(markdown))) out.push(m[1]);
  return out;
}

describe("imagens do acervo", () => {
  test("toda imagem local no corpo de um post existe em public/", () => {
    const quebradas: string[] = [];
    for (const post of blogPosts) {
      for (const src of localImagesOf(post.content)) {
        const path = join(PUBLIC, decodeURIComponent(src));
        if (!existsSync(path)) quebradas.push(`${post.slug} -> ${src}`);
      }
    }
    expect(quebradas).toEqual([]);
  });

  test("toda capa local existe em public/", () => {
    const quebradas: string[] = [];
    for (const post of blogPosts) {
      const cover = post.coverImage;
      if (!cover || !cover.startsWith("/")) continue;
      const path = join(PUBLIC, decodeURIComponent(cover));
      if (!existsSync(path)) quebradas.push(`${post.slug} -> ${cover}`);
    }
    expect(quebradas).toEqual([]);
  });
});
