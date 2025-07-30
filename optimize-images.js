#!/usr/bin/env node

/**
 * Script para otimizar imagens do projeto
 * Instalar: npm install -g sharp
 * Executar: node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const OPTIMIZED_DIR = path.join(__dirname, 'public', 'optimized');

// Criar diretório otimizado se não existir
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Configurações de otimização
const OPTIMIZATION_CONFIG = {
  quality: 80,
  format: 'webp',
  maxWidth: 1920,
  maxHeight: 1080
};

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Redimensionar se necessário
    if (metadata.width > OPTIMIZATION_CONFIG.maxWidth || metadata.height > OPTIMIZATION_CONFIG.maxHeight) {
      image.resize(OPTIMIZATION_CONFIG.maxWidth, OPTIMIZATION_CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Converter para WebP
    await image
      .webp({ quality: OPTIMIZATION_CONFIG.quality })
      .toFile(outputPath);
    
    console.log(`✅ Otimizado: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${inputPath}:`, error.message);
  }
}

async function processDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativeItemPath = path.join(relativePath, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Criar diretório correspondente em optimized
      const optimizedDir = path.join(OPTIMIZED_DIR, relativeItemPath);
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }
      await processDirectory(fullPath, relativeItemPath);
    } else if (stats.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
      // Otimizar imagem
      const outputPath = path.join(OPTIMIZED_DIR, relativeItemPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      await optimizeImage(fullPath, outputPath);
    }
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...');
  
  try {
    await processDirectory(PUBLIC_DIR);
    console.log('✅ Otimização concluída!');
    console.log('📁 Imagens otimizadas salvas em:', OPTIMIZED_DIR);
  } catch (error) {
    console.error('❌ Erro durante otimização:', error);
  }
}

main(); 