# 🚀 Guia de Otimização - Kaleidos Site

## 📊 Problemas Identificados e Soluções

### 🔥 **URGENTE - Vídeos Pesados**

#### Problema:
- Vídeos de até 194MB (Paradigma)
- Total de 1.2GB de conteúdo
- Carregamento simultâneo de 18 vídeos

#### Solução Manual (VOCÊ PRECISA FAZER):
```bash
# 1. Instalar FFmpeg
brew install ffmpeg  # macOS
# ou
sudo apt install ffmpeg  # Ubuntu

# 2. Comprimir vídeos (exemplo)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4

# 3. Script para comprimir todos os vídeos
find public/Conteudo_clientes -name "*.mp4" -exec sh -c '
  ffmpeg -i "$1" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k "${1%.mp4}_compressed.mp4"
' _ {} \;
```

#### Meta de Compressão:
- **Antes**: 194MB → **Depois**: <10MB
- **Qualidade**: CRF 28 (boa qualidade, tamanho reduzido)
- **Formato**: H.264 para compatibilidade

### 🖼️ **IMPORTANTE - Otimização de Imagens**

#### Solução Automática (JÁ IMPLEMENTADA):
```bash
# 1. Instalar Sharp
npm install sharp

# 2. Executar script de otimização
node optimize-images.js
```

#### O que o script faz:
- Converte PNG/JPG para WebP
- Redimensiona imagens grandes
- Qualidade 80% (boa qualidade, tamanho reduzido)
- Salva em `/public/optimized/`

### ⚡ **OTIMIZAÇÕES JÁ IMPLEMENTADAS**

#### 1. **VideoCarousel Otimizado**
- ✅ Lazy loading com Intersection Observer
- ✅ Autoplay desabilitado em mobile
- ✅ Loading states com skeleton
- ✅ Preload apenas metadados
- ✅ Detecção de dispositivo

#### 2. **Next.js Config Otimizado**
- ✅ Otimização de imagens habilitada
- ✅ Formatos modernos (WebP, AVIF)
- ✅ Cache otimizado
- ✅ Dependências desnecessárias removidas

#### 3. **CaseCarousel Otimizado**
- ✅ Lazy loading implementado
- ✅ Loading states
- ✅ Performance melhorada

### 📦 **Dependências Removidas**
```json
// Removidas (não utilizadas):
"axios", "cheerio", "motion", "next-intl", 
"next-themes", "react-icon-cloud", "react-tweet", 
"react-typed", "simplex-noise", "twitter-api-v2"
```

### 🎯 **PRÓXIMOS PASSOS**

#### 1. **Comprimir Vídeos (VOCÊ FAZ)**
```bash
# Script completo para comprimir todos os vídeos
for file in public/Conteudo_clientes/**/*.mp4; do
  ffmpeg -i "$file" \
    -c:v libx264 \
    -crf 28 \
    -preset fast \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    "${file%.mp4}_compressed.mp4"
done
```

#### 2. **Otimizar Imagens (AUTOMÁTICO)**
```bash
npm install sharp
node optimize-images.js
```

#### 3. **Atualizar Caminhos**
- Substituir caminhos de vídeos pelos comprimidos
- Atualizar caminhos de imagens para versões WebP

#### 4. **Testar Performance**
```bash
# Build de produção
npm run build

# Testar localmente
npm start

# Verificar métricas
# - Lighthouse Score
# - PageSpeed Insights
# - WebPageTest
```

### 📈 **RESULTADOS ESPERADOS**

#### Antes da Otimização:
- ⏱️ Tempo de carregamento: 15-30s
- 📱 Bundle size: ~50MB
- 🎥 Vídeos: 1.2GB
- 🖼️ Imagens: Não otimizadas

#### Depois da Otimização:
- ⏱️ Tempo de carregamento: 3-8s
- 📱 Bundle size: ~15MB
- 🎥 Vídeos: ~100MB
- 🖼️ Imagens: WebP otimizadas

### 🔧 **Configurações Recomendadas**

#### FFmpeg para Vídeos:
```bash
# Qualidade alta, tamanho médio
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# Qualidade média, tamanho pequeno
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4

# Qualidade baixa, tamanho muito pequeno
ffmpeg -i input.mp4 -c:v libx264 -crf 35 -preset veryfast -c:a aac -b:a 96k output.mp4
```

#### Sharp para Imagens:
```javascript
// Configuração atual (boa qualidade)
quality: 80,
format: 'webp',
maxWidth: 1920,
maxHeight: 1080
```

### 🚨 **IMPORTANTE**
- **Vídeos**: Você precisa comprimir manualmente
- **Imagens**: Script automático já criado
- **Código**: Otimizações já implementadas
- **Teste**: Sempre teste em produção

### 📞 **Suporte**
Se precisar de ajuda com a compressão de vídeos ou tiver dúvidas sobre as otimizações, me avise! 