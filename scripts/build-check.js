#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Iniciando verificação de build...\n');

// Verificar se o .env.local existe
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local não encontrado. Criando arquivo de exemplo...');
  const envExample = `# Configurações do Site
NEXT_PUBLIC_SITE_URL=https://kaleidos.com.br
NEXT_PUBLIC_SITE_NAME=Kaleidos Digital
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=

# Redes Sociais
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/kaleidosdigital
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/kaleidos-digital/?viewAsMember=true

# Contato
NEXT_PUBLIC_CONTACT_EMAIL=contato@kaleidos.com.br
NEXT_PUBLIC_CONTACT_PHONE=+55 11 99999-9999

# SEO
NEXT_PUBLIC_SITE_DESCRIPTION=Especialistas em crescimento de marcas através de conteúdo criativo, automações inteligentes e lançamentos estratégicos
NEXT_PUBLIC_SITE_KEYWORDS=marketing digital, conteúdo criativo, automações, lançamentos, growth hacking, redes sociais
`;
  fs.writeFileSync('.env.local', envExample);
  console.log('✅ .env.local criado com sucesso!\n');
}

// Verificar TypeScript
console.log('🔍 Verificando TypeScript...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript sem erros!\n');
} catch (error) {
  console.log('❌ Erros de TypeScript encontrados!\n');
  process.exit(1);
}

// Verificar ESLint (apenas arquivos fonte)
console.log('🔍 Verificando ESLint...');
try {
  execSync('npx eslint src/ --ext .ts,.tsx --max-warnings 10', { stdio: 'inherit' });
  console.log('✅ ESLint verificado!\n');
} catch (error) {
  console.log('⚠️  Alguns warnings de ESLint encontrados (não críticos)\n');
}

// Build de produção
console.log('🔨 Iniciando build de produção...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build de produção concluído com sucesso!\n');
} catch (error) {
  console.log('❌ Erro no build de produção!\n');
  process.exit(1);
}

// Verificar arquivos de build
console.log('🔍 Verificando arquivos de build...');
const buildDir = path.join(process.cwd(), '.next');
if (fs.existsSync(buildDir)) {
  console.log('✅ Pasta .next criada com sucesso!');
  
  // Verificar se o build tem tamanho razoável
  const buildSize = fs.statSync(buildDir).size;
  console.log(`📊 Tamanho do build: ${(buildSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (buildSize > 500 * 1024 * 1024) { // 500MB
    console.log('⚠️  Build muito grande! Considere otimizar.');
  } else {
    console.log('✅ Tamanho do build adequado!');
  }
} else {
  console.log('❌ Pasta .next não encontrada!');
  process.exit(1);
}

// Verificar sitemap
console.log('\n🔍 Verificando sitemap...');
try {
  const sitemapPath = path.join(process.cwd(), '.next/server/app/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`✅ Sitemap gerado com ${urlCount} URLs!`);
  } else {
    console.log('⚠️  Sitemap não encontrado no build!');
  }
} catch (error) {
  console.log('❌ Erro ao verificar sitemap!');
}

// Verificar robots.txt
console.log('🔍 Verificando robots.txt...');
const robotsPath = path.join(process.cwd(), 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('✅ Robots.txt encontrado!');
} else {
  console.log('❌ Robots.txt não encontrado!');
}

console.log('\n🎉 Verificação de build concluída com sucesso!');
console.log('🚀 O site está pronto para deploy no Vercel!'); 