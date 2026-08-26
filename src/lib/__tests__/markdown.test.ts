import { describe, expect, test } from "bun:test";
import { markdownToHtml } from "@/lib/markdown";

describe("links", () => {
  test("link INTERNO abre na mesma aba", () => {
    const html = markdownToHtml("Fala com a [gente](/contato).");
    expect(html).toContain('<a href="/contato">gente</a>');
    expect(html).not.toContain("_blank");
  });

  test("link pro proprio dominio tambem conta como interno", () => {
    const html = markdownToHtml("[post](https://kaleidos.com.br/blog/x)");
    expect(html).not.toContain("_blank");
  });

  test("ancora nao abre em aba nova", () => {
    expect(markdownToHtml("[topo](#topo)")).not.toContain("_blank");
  });

  test("link EXTERNO mantem _blank + rel de seguranca", () => {
    const html = markdownToHtml("[fonte](https://exemplo.com/a)");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test("protocol-relative nao e tratado como interno", () => {
    expect(markdownToHtml("[x](//evil.com)")).toContain('target="_blank"');
  });
});

describe("escape de atributo", () => {
  test("aspas no alt nao truncam o atributo", () => {
    const html = markdownToHtml('![Capa do whitepaper "Bitcoin"](/blog/x/cover.png)');
    expect(html).toContain('alt="Capa do whitepaper &quot;Bitcoin&quot;"');
    // a legenda (text node) segue inteira
    expect(html).toContain("<figcaption>");
  });

  test("aspas no href nao escapam do atributo", () => {
    const html = markdownToHtml('[x](/a" onmouseover="alert(1))');
    expect(html).not.toContain('onmouseover="alert(1)"');
    expect(html).toContain("&quot;");
  });

  test("aspas no src da imagem nao escapam do atributo", () => {
    const html = markdownToHtml('![a](/x.png" onerror="alert(1))');
    expect(html).not.toContain('onerror="alert(1)"');
  });
});
