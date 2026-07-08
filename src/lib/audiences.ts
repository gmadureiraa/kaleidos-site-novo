// Variantes de home por público (alterações textuais sobre a mesma estrutura).
// Cada variante troca só badge + headline + subtexto do hero e o metadata.
// Rotas: /founders /creators /fintech /saas /empresas — linkadas no footer.

const HL =
  'style="background:linear-gradient(#7CF067,#7CF067) center/100% 40% no-repeat;box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px;"';

export type Audience = {
  slug: string;
  /** rótulo no footer: "Kaleidos para <label>" */
  label: string;
  badge: string;
  headlineHtml: string;
  subHtml: string;
  metaTitle: string;
  metaDesc: string;
};

export const AUDIENCES: Audience[] = [
  {
    slug: "founders",
    label: "founders",
    badge: "Pro founder que está construindo em cripto",
    headlineHtml: `O time de marketing que seu projeto cripto ainda não tem, do conteúdo ao <span ${HL}>lançamento</span>.`,
    subHtml:
      '<strong style="color:#14110D;">30M+ de views</strong> e <strong style="color:#14110D;">50+ lançamentos</strong>: a Kaleidos vira o braço de marca, conteúdo e go-to-market do seu projeto, pra ele virar referência e não só mais um token no feed.',
    metaTitle: "Kaleidos para founders — marketing e lançamento de projeto cripto",
    metaDesc:
      "A Kaleidos é o time de marketing, conteúdo e go-to-market do seu projeto cripto. Do posicionamento ao lançamento, com autoridade de verdade.",
  },
  {
    slug: "creators",
    label: "creators",
    badge: "Pro creator que vive de audiência",
    headlineHtml: `Sua audiência já existe. Falta a máquina de conteúdo que vira <span ${HL}>autoridade</span> (e receita).`,
    subHtml:
      'A Kaleidos estrutura conteúdo, narrativa e distribuição pro creator cripto escalar sem virar refém do feed. <strong style="color:#14110D;">30M+ de views</strong> construídas com quem vive de atenção.',
    metaTitle: "Kaleidos para creators — conteúdo e monetização de audiência cripto",
    metaDesc:
      "Transforme sua audiência em autoridade e receita. A Kaleidos estrutura a máquina de conteúdo, narrativa e distribuição do creator cripto.",
  },
  {
    slug: "fintech",
    label: "fintechs",
    badge: "Pra fintech que precisa de confiança",
    headlineHtml: `Marketing que constrói <span ${HL}>confiança</span>, o ativo mais caro de uma fintech.`,
    subHtml:
      'Conteúdo educativo e estratégia que fazem sua fintech ganhar autoridade num mercado regulado e cético. A mesma máquina que gerou <strong style="color:#14110D;">30M+ de views</strong> e fez clientes faturarem <strong style="color:#14110D;">+R$30mi</strong>.',
    metaTitle: "Kaleidos para fintechs — marketing estratégico e conteúdo de confiança",
    metaDesc:
      "Marketing que constrói confiança pra fintech: conteúdo educativo, estratégia e autoridade num mercado regulado e cético.",
  },
  {
    slug: "saas",
    label: "SaaS",
    badge: "Pra SaaS que quer crescer orgânico",
    headlineHtml: `Conteúdo que vira <span ${HL}>aquisição</span>: o motor de crescimento orgânico do seu SaaS.`,
    subHtml:
      'SEO, conteúdo de autoridade e distribuição que trazem usuário qualificado sem depender só de paid. A Kaleidos aplica no seu SaaS o que fez marcas virarem referência, com <strong style="color:#14110D;">30M+ de views</strong>.',
    metaTitle: "Kaleidos para SaaS — content-led growth e aquisição orgânica",
    metaDesc:
      "Content-led growth pro seu SaaS: SEO, conteúdo de autoridade e distribuição que trazem usuário qualificado sem depender só de paid.",
  },
  {
    slug: "empresas",
    label: "empresas",
    badge: "Pra empresa que quer sair do ruído",
    headlineHtml: `Marketing estratégico que faz sua empresa virar <span ${HL}>referência</span>, não só mais uma no feed.`,
    subHtml:
      'A Kaleidos leva a criatividade e o rigor do mercado cripto pra qualquer empresa: conteúdo que conecta, estratégia que sustenta, resultado que aparece. <strong style="color:#14110D;">+R$30mi faturados</strong> pelos nossos clientes.',
    metaTitle: "Kaleidos para empresas — agência de marketing estratégico",
    metaDesc:
      "Marketing estratégico que faz sua empresa virar referência. A criatividade e o rigor do mercado cripto aplicados em qualquer empresa.",
  },
];

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}
