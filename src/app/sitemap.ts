import { MetadataRoute } from 'next'
import { getAllCases } from '@/lib/case-data'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleidos.com.br'
  const now = new Date()

  // Last modified inferida do post mais recente do blog (representa "atividade recente")
  const latestBlogDate = blogPosts.length
    ? new Date(
        blogPosts
          .map((p) => new Date(p.publishedAt).getTime())
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
      url: `${baseUrl}/links`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Páginas de serviços
  const servicePages: MetadataRoute.Sitemap = [
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
  ]

  // Páginas de cases (dinâmico)
  const allCases = getAllCases()
  const casePages: MetadataRoute.Sitemap = allCases.map((caseData) => ({
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
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...mainPages, ...servicePages, ...casePages, ...blogIndex, ...blogArticles]
}
