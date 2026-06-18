import { MetadataRoute } from 'next'
import { getRoutedCases } from '@/lib/case-data'
import { getPublishedPostsAsync, getModifiedAt } from '@/lib/blog-data'
import { papers } from '@/lib/papers-data'
import { getAllServicePages } from '@/lib/service-pages-data'

// Páginas de serviço descontinuadas (rota retorna notFound) — não entram no sitemap.
const RETIRED_SERVICE_SLUGS = new Set(['eventos-cripto'])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleidos.com.br'
  const now = new Date()

  // Só posts já publicados entram no sitemap (estáticos + KAI; agendados ficam fora).
  const blogPosts = await getPublishedPostsAsync(now)

  // Last modified inferida da revisão mais recente do blog (freshness real, não new Date() cego).
  const latestBlogDate = blogPosts.length
    ? new Date(
        blogPosts
          .map((p) => new Date(getModifiedAt(p)).getTime())
          .reduce((a, b) => Math.max(a, b), 0)
      )
    : now

  // Páginas principais
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestBlogDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apresentacao`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/papers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Páginas de serviços
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/servicos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicos/marketing-conteudo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicos/ia-automacoes-completa`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicos/growth-lancamentos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Páginas de serviço (estilo Lunar) vindas de service-pages-data — exceto as descontinuadas.
    ...getAllServicePages()
      .filter((s) => !RETIRED_SERVICE_SLUGS.has(s.id))
      .map((s) => ({
        url: `${baseUrl}/servicos/${s.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
  ]

  // Páginas legais (LGPD + termos)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Páginas de cases — apenas as que têm rota dedicada (evita URLs 404 no sitemap)
  const routedCases = getRoutedCases()
  const casePages: MetadataRoute.Sitemap = routedCases.map((caseData) => ({
    url: `${baseUrl}/cases/${caseData.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog pages — usa data real de publicação para cada artigo
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const blogArticles: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(getModifiedAt(post)),
    changeFrequency: 'monthly' as const,
    // Posts em destaque ganham prioridade levemente maior (sinal de relevância).
    priority: post.featured ? 0.8 : 0.7,
  }))

  // Papers — rotas individuais dos volumes públicos (omite os hidden pra não gerar URL pré-lançamento)
  const paperPages: MetadataRoute.Sitemap = papers
    .filter((p) => !p.hidden)
    .map((paper) => ({
      url: `${baseUrl}/papers/${paper.slug}`,
      lastModified: new Date(paper.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    ...mainPages,
    ...servicePages,
    ...legalPages,
    ...casePages,
    ...blogIndex,
    ...blogArticles,
    ...paperPages,
  ]
}
