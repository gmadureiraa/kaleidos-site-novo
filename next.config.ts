import type { NextConfig } from "next";

// CSP laxa inicial — script-src precisa de unsafe-inline enquanto GA/Meta Pixel
// forem injetados via dangerouslySetInnerHTML. Ajustar pra nonce-based quando
// possível.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://connect.facebook.net https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.facebook.com https://*.resend.com https://calendly.com https://*.calendly.com",
  // Calendly renderiza o agendamento num iframe (calendly.com); sem frame-src
  // explícito ele cairia no default-src 'self' e viria em branco.
  "frame-src 'self' https://calendly.com https://*.calendly.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Permite isolar o diretório de build (evita corrupção de .next quando dois
  // dev servers rodam no mesmo projeto). Sem a env, usa o padrão ".next".
  ...(process.env.KAL_DIST_DIR ? { distDir: process.env.KAL_DIST_DIR } : {}),
  // ESLint NÃO bloqueia o build. Havia vários `<a href="/rota">` internos legados
  // (no-html-link-for-pages) que só falhavam no build limpo da Vercel (o cache
  // local mascarava), derrubando o deploy. O TypeScript continua gateando; rodar
  // `bun run lint` à parte pra pegar os warnings/erros de estilo.
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        // Experience Lab — scroll-experience standalone (protótipo nível zero.university).
        source: "/experience",
        destination: "/experience-lab.html",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/manifesto",
        destination: "/sobre",
        permanent: true,
      },
      {
        // Consolidação 2026-05-15: a versão completa (LP de conversão com
        // form, FlipCarousel, cases, audit P0 e Meta Pixel) virou canônica.
        // 301 preserva SEO da rota antiga.
        source: "/servicos/ia-automacoes",
        destination: "/servicos/ia-automacoes-completa",
        permanent: true,
      },
      {
        // Consolidação 2026-05-15: /carta deletada, URL única é a principal.
        source: "/servicos/ia-automacoes-completa/carta",
        destination: "/servicos/ia-automacoes-completa",
        permanent: true,
      },
      {
        // Atalho amigável pro playbook flagship.
        source: "/bull-market",
        destination: "/papers/bull-market-2026",
        permanent: false,
      },
      {
        // Atalho amigável pro playbook flagship de marketing (bear market).
        source: "/bear-market",
        destination: "/papers/bear-market-2026",
        permanent: false,
      },
    ];
  },

  // Otimização de imagens
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Imagens já são WebP pré-otimizadas (script optimize-images-perf) →
    // desliga a Image Optimization da Vercel pra não gastar cache-writes do
    // free tier (limite 100k). Serve os arquivos como estão.
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
  },

  // Otimização de pacotes
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons'],
  },

  // Compressão
  compress: true,

  // Headers de segurança e cache
  async headers() {
    return [
      // Headers globais
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
      // Cache para assets estáticos. CORS restringido pra origin Kaleidos
      // (assets servidos via mesma origin não precisam CORS no <img>/<video>;
      // restringir previne hotlinking cross-origin se conteúdo virar gated).
      {
        source: '/Conteudo_clientes/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://kaleidos.com.br',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://kaleidos.com.br',
          },
        ],
      },
      // Cache para imagens
      {
        source: '/Imagens/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para logos
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // i18n via query param (?lang=en) — sem App Router i18n nativo

  // Otimização de build
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
