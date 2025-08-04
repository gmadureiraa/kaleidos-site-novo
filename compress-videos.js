#!/usr/bin/env node

/**
 * Script para comprimir vídeos do projeto
 * Requer: ffmpeg instalado
 * Executar: node compress-videos.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const COMPRESSED_DIR = path.join(__dirname, 'public', 'compressed');

// Criar diretório comprimido se não existir
if (!fs.existsSync(COMPRESSED_DIR)) {
  fs.mkdirSync(COMPRESSED_DIR, { recursive: true });
}

// Configurações de compressão
const COMPRESSION_CONFIG = {
  crf: 28, // Qualidade (23-28 é bom, 28-35 é médio)
  preset: 'fast', // Velocidade de compressão
  audioBitrate: '128k',
  videoCodec: 'libx264',
  audioCodec: 'aac'
};

function findVideos(dir) {
  const videos = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.match(/\.(mp4|mov|avi)$/i)) {
        videos.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return videos;
}

function compressVideo(inputPath) {
  return new Promise((resolve, reject) => {
    const relativePath = path.relative(PUBLIC_DIR, inputPath);
    const outputPath = path.join(COMPRESSED_DIR, relativePath);
    const outputDir = path.dirname(outputPath);
    
    // Criar diretório de saída se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const command = `ffmpeg -i "${inputPath}" \
      -c:v ${COMPRESSION_CONFIG.videoCodec} \
      -crf ${COMPRESSION_CONFIG.crf} \
      -preset ${COMPRESSION_CONFIG.preset} \
      -c:a ${COMPRESSION_CONFIG.audioCodec} \
      -b:a ${COMPRESSION_CONFIG.audioBitrate} \
      -movflags +faststart \
      -y \
      "${outputPath}"`;
    
    console.log(`🔄 Comprimindo: ${path.basename(inputPath)}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Erro ao comprimir ${inputPath}:`, error.message);
        reject(error);
      } else {
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const compressionRatio = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
        
        console.log(`✅ Comprimido: ${path.basename(inputPath)}`);
        console.log(`   📊 ${(inputSize / 1024 / 1024).toFixed(1)}MB → ${(outputSize / 1024 / 1024).toFixed(1)}MB (${compressionRatio}% menor)`);
        resolve(outputPath);
      }
    });
  });
}

async function main() {
  console.log('🚀 Iniciando compressão de vídeos...');
  console.log(`📁 Procurando vídeos em: ${PUBLIC_DIR}`);
  
  try {
    const videos = findVideos(PUBLIC_DIR);
    console.log(`📹 Encontrados ${videos.length} vídeos para comprimir`);
    
    if (videos.length === 0) {
      console.log('❌ Nenhum vídeo encontrado');
      return;
    }
    
    // Comprimir vídeos em paralelo (máximo 3 por vez)
    const batchSize = 3;
    for (let i = 0; i < videos.length; i += batchSize) {
      const batch = videos.slice(i, i + batchSize);
      await Promise.all(batch.map(compressVideo));
    }
    
    console.log('✅ Compressão concluída!');
    console.log('📁 Vídeos comprimidos salvos em:', COMPRESSED_DIR);
    console.log('\n📋 Próximos passos:');
    console.log('1. Verificar qualidade dos vídeos comprimidos');
    console.log('2. Atualizar caminhos no case-data.ts');
    console.log('3. Remover vídeos originais (opcional)');
    
  } catch (error) {
    console.error('❌ Erro durante compressão:', error);
  }
}

// Verificar se ffmpeg está instalado
exec('ffmpeg -version', (error) => {
  if (error) {
    console.error('❌ FFmpeg não encontrado!');
    console.log('📥 Instale o FFmpeg:');
    console.log('   macOS: brew install ffmpeg');
    console.log('   Ubuntu: sudo apt install ffmpeg');
    console.log('   Windows: https://ffmpeg.org/download.html');
    process.exit(1);
  } else {
    main();
  }
}); 