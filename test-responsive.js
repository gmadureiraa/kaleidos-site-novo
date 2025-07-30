const puppeteer = require('puppeteer');

const devices = [
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

async function testResponsiveness() {
  console.log('🚀 Iniciando testes de responsividade...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const device of devices) {
      console.log(`📱 Testando ${device.name} (${device.width}x${device.height})...`);
      
      const page = await browser.newPage();
      await page.setViewport({ 
        width: device.width, 
        height: device.height,
        deviceScaleFactor: 1,
      });

      // Navegar para o site
      await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });

      // Aguardar carregamento completo
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verificar elementos críticos
      const checks = await page.evaluate(() => {
        const results = {};
        
        // Verificar se o header está visível
        const header = document.querySelector('nav');
        results.headerVisible = header && header.offsetHeight > 0;
        
        // Verificar se o hero está visível
        const hero = document.querySelector('#servicos');
        results.heroVisible = hero && hero.offsetHeight > 0;
        
        // Verificar se o carrossel está visível
        const carousel = document.querySelector('#video-carousel');
        results.carouselVisible = carousel && carousel.offsetHeight > 0;
        
        // Verificar se há erros de console
        results.consoleErrors = window.consoleErrors || [];
        
        // Verificar performance
        const perfEntries = performance.getEntriesByType('navigation');
        results.loadTime = perfEntries[0] ? perfEntries[0].loadEventEnd - perfEntries[0].loadEventStart : 0;
        
        // Verificar se há elementos quebrados
        const brokenImages = Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalHeight === 0);
        results.brokenImages = brokenImages.length;
        
        const brokenVideos = Array.from(document.querySelectorAll('video')).filter(video => !video.readyState);
        results.brokenVideos = brokenVideos.length;
        
        return results;
      });

      // Exibir resultados
      console.log(`  ✅ Header: ${checks.headerVisible ? 'OK' : '❌'}`);
      console.log(`  ✅ Hero: ${checks.heroVisible ? 'OK' : '❌'}`);
      console.log(`  ✅ Carrossel: ${checks.carouselVisible ? 'OK' : '❌'}`);
      console.log(`  ⏱️  Tempo de carregamento: ${checks.loadTime.toFixed(2)}ms`);
      console.log(`  🖼️  Imagens quebradas: ${checks.brokenImages}`);
      console.log(`  🎬 Vídeos quebrados: ${checks.brokenVideos}`);
      
      if (checks.consoleErrors.length > 0) {
        console.log(`  ⚠️  Erros no console: ${checks.consoleErrors.length}`);
      }

      // Capturar screenshot
      await page.screenshot({ 
        path: `screenshot-${device.name.replace(/\s+/g, '-').toLowerCase()}.png`,
        fullPage: true 
      });

      await page.close();
      console.log(`  📸 Screenshot salvo: screenshot-${device.name.replace(/\s+/g, '-').toLowerCase()}.png\n`);
    }

    console.log('🎉 Testes de responsividade concluídos!');
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
  } finally {
    await browser.close();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  testResponsiveness();
}

module.exports = { testResponsiveness }; 