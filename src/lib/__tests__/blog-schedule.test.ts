import { describe, expect, test } from "bun:test";
import { blogPosts, isPublished } from "@/lib/blog-data";
import { BLOG_PUBLISHED_AT } from "@/lib/blog-schedule.generated";
import { blogSlugFromPathname, isScheduledBlogPath } from "@/lib/blog-schedule";

const NOW = new Date();

describe("mapa gerado x acervo", () => {
  test("está sincronizado — se falhar, rode `bun scripts/generate-blog-schedule.ts`", () => {
    const doAcervo = Object.fromEntries(blogPosts.map((p) => [p.slug, p.publishedAt]));
    expect(BLOG_PUBLISHED_AT).toEqual(doAcervo);
  });
});

describe("extração de slug", () => {
  test("pega o post e ignora hub de categoria, listagem e rota fora do blog", () => {
    expect(blogSlugFromPathname("/blog/meu-post")).toBe("meu-post");
    expect(blogSlugFromPathname("/blog/meu-post/cover.png")).toBe("meu-post");
    expect(blogSlugFromPathname("/blog/categoria/cases")).toBeNull();
    expect(blogSlugFromPathname("/blog")).toBeNull();
    expect(blogSlugFromPathname("/sobre")).toBeNull();
  });
});

describe("gate de agendamento no middleware", () => {
  const agendados = blogPosts.filter((p) => !isPublished(p, NOW));
  const publicados = blogPosts.filter((p) => isPublished(p, NOW));

  test("todo post agendado é bloqueado", () => {
    const passou = agendados.filter((p) => !isScheduledBlogPath(`/blog/${p.slug}`, NOW));
    expect(passou.map((p) => p.slug)).toEqual([]);
  });

  test("nenhum post publicado é bloqueado", () => {
    const barrado = publicados.filter((p) => isScheduledBlogPath(`/blog/${p.slug}`, NOW));
    expect(barrado.map((p) => p.slug)).toEqual([]);
  });

  test("a capa e os assets do agendado também são bloqueados", () => {
    const alvo = agendados[0]!;
    expect(isScheduledBlogPath(`/blog/${alvo.slug}/cover.png`, NOW)).toBe(true);
    expect(isScheduledBlogPath(`/blog/${alvo.slug}/opengraph-image`, NOW)).toBe(true);
  });

  test("passada a data, o bloqueio some sozinho — sem redeploy", () => {
    const alvo = agendados[0]!;
    const depois = new Date(new Date(alvo.publishedAt).getTime() + 86_400_000);
    expect(isScheduledBlogPath(`/blog/${alvo.slug}`, NOW)).toBe(true);
    expect(isScheduledBlogPath(`/blog/${alvo.slug}`, depois)).toBe(false);
  });

  test("listagem, hub de categoria e slug desconhecido passam", () => {
    expect(isScheduledBlogPath("/blog", NOW)).toBe(false);
    expect(isScheduledBlogPath("/blog/categoria/cases", NOW)).toBe(false);
    expect(isScheduledBlogPath("/blog/post-do-kai-que-nao-esta-no-mapa", NOW)).toBe(false);
  });
});
