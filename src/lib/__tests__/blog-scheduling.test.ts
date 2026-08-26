import { describe, expect, test } from "bun:test";
import {
  blogPosts,
  isPublished,
  getPostBySlugAsync,
  getRenderableContentAsync,
  getResolvableSlugsAsync,
} from "@/lib/blog-data";
import {
  defuseUnresolvedInternalLinks,
  extractInternalBlogLinkSlugs,
} from "@/lib/blog-links";

const NOW = new Date();
const published = blogPosts.filter((p) => isPublished(p, NOW));
const scheduled = blogPosts.filter((p) => !isPublished(p, NOW));

describe("gate de data na rota do post", () => {
  test("existe pelo menos um agendado e um publicado no acervo (o teste tem o que provar)", () => {
    expect(published.length).toBeGreaterThan(0);
    expect(scheduled.length).toBeGreaterThan(0);
  });

  test("post AGENDADO não resolve — a rota vai pro notFound()", async () => {
    for (const post of scheduled) {
      expect(await getPostBySlugAsync(post.slug, NOW)).toBeUndefined();
    }
  });

  test("post PUBLICADO continua resolvendo", async () => {
    for (const post of published) {
      const found = await getPostBySlugAsync(post.slug, NOW);
      expect(found?.slug).toBe(post.slug);
    }
  });

  test("o mesmo slug agendado resolve DEPOIS da data — sem redeploy, só revalidação", async () => {
    const target = scheduled[0]!;
    const depois = new Date(new Date(target.publishedAt).getTime() + 86_400_000);
    expect(await getPostBySlugAsync(target.slug, NOW)).toBeUndefined();
    expect((await getPostBySlugAsync(target.slug, depois))?.slug).toBe(target.slug);
  });

  test("slug inexistente segue undefined", async () => {
    expect(await getPostBySlugAsync("slug-que-nao-existe-em-lugar-nenhum", NOW)).toBeUndefined();
  });
});

describe("neutralização de link interno não resolvível", () => {
  const resolvable = (slug: string) => slug === "post-no-ar";

  test("link inline vira texto puro e a frase fica íntegra", () => {
    const md = "Ver o [teardown da Chainlink](/blog/chainlink-integracao) pra entender.";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(
      "Ver o teardown da Chainlink pra entender."
    );
  });

  test("link pra post publicado não é tocado", () => {
    const md = "Leia o [post no ar](/blog/post-no-ar).";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(md);
  });

  test("item de lista que é só o link sai inteiro", () => {
    const md = [
      "## Relacionados",
      "- [Post no ar](/blog/post-no-ar)",
      "- [Post agendado](/blog/post-agendado)",
      "- [Outro no ar](/blog/post-no-ar)",
    ].join("\n");
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(
      ["## Relacionados", "- [Post no ar](/blog/post-no-ar)", "- [Outro no ar](/blog/post-no-ar)"].join("\n")
    );
  });

  test("item de lista com texto além do link preserva a frase", () => {
    const md = "- [Post agendado](/blog/post-agendado) — resumo que vale ler";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(
      "- Post agendado — resumo que vale ler"
    );
  });

  test("hub de categoria nunca é tocado", () => {
    const md = "Acervo na [categoria de cripto](/blog/categoria/cripto).";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(md);
  });

  test("link externo com /blog/ na URL não é tocado", () => {
    const md = "Fonte: [Coinbound](https://coinbound.io/blog/post-agendado).";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe(md);
  });

  test("âncora e query no destino também são cobertas", () => {
    const md = "Ver [aqui](/blog/post-agendado#secao).";
    expect(defuseUnresolvedInternalLinks(md, resolvable)).toBe("Ver aqui.");
  });
});

describe("acervo real: nenhuma página pública leva a 404", () => {
  test("todo link interno do conteúdo RENDERIZADO aponta pra post que resolve hoje", async () => {
    const resolvable = await getResolvableSlugsAsync(NOW);
    const quebrados: string[] = [];

    for (const post of published) {
      const content = await getRenderableContentAsync(post, NOW);
      for (const slug of extractInternalBlogLinkSlugs(content)) {
        if (!resolvable.has(slug)) quebrados.push(`${post.slug} -> ${slug}`);
      }
    }

    expect(quebrados).toEqual([]);
  });

  test("o teste acima não é vazio: o conteúdo CRU tem links que precisariam ser tratados", () => {
    const resolvable = new Set(published.map((p) => p.slug));
    const crus = published.flatMap((post) =>
      extractInternalBlogLinkSlugs(post.content)
        .filter((slug) => !resolvable.has(slug))
        .map((slug) => `${post.slug} -> ${slug}`)
    );
    expect(crus.length).toBeGreaterThan(0);
  });
});
