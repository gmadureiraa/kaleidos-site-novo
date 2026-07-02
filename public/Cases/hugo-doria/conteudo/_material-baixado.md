# Hugo Dória — Reels baixados (case site Kaleidos)

Reels editados pela Kaleidos, baixados do Google Drive (pasta "Vídeos > Vídeos curtos > FINALIZADOS"
do drive de `madureira@kaleidosdigital.com`) e comprimidos para web com ffmpeg.

- **Origem (Drive):** https://drive.google.com/drive/folders/1vObYY1pxmQ6NlVepfHCszta0Rd_WEKq7
- **Subpasta:** Vídeos curtos / FINALIZADOS (id `1zsPhuWynfhd_M2enNIFAPNrR6qzjMCNE`)
- **Tema do canal:** IA prática, vibe coding, ferramentas (Cursor, Claude Code, Lovable). Reels verticais.
- **Compressão:** `ffmpeg -vf scale='min(1080,iw)':-2 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart`
- **Posters:** frame em 00:00:01, `-q:v 3`.
- **Resultado:** todos normalizados para **1080x1920** (verticais). Total da pasta caiu de ~1,1 GB (raw) para **~111 MB**.

> Próximo agente: ligar estes arquivos no `media: []` do case `hugo-doria` em `src/lib/case-data.ts`.
> Padrão usado pelos outros cases: `{ src: "/Cases/hugo-doria/conteudo/hugo-reel-XX.mp4", type: "video", poster: "/Cases/hugo-doria/conteudo/posters/hugo-reel-XX.jpg" }`

## Arquivos

| Arquivo | Poster | Duração | Resolução | Tamanho ANTES (raw 4K) | Tamanho DEPOIS | Redução | Data origem (nome Drive) |
|---|---|---|---|---|---|---|---|
| `hugo-reel-01.mp4` | `posters/hugo-reel-01.jpg` | 0:54 | 1080x1920 | 136 MB (2160x3840) | 14 MB | ~90% | 20260331_REELS_00M53S |
| `hugo-reel-02.mp4` | `posters/hugo-reel-02.jpg` | 1:21 | 1080x1920 | 206 MB (2160x3840) | 18 MB | ~92% | 20260402_REELS_01M21S |
| `hugo-reel-03.mp4` | `posters/hugo-reel-03.jpg` | 1:20 | 1080x1920 | 203 MB (1080x1920) | 16 MB | ~92% | 20260505_REELS_01M19S |
| `hugo-reel-04.mp4` | `posters/hugo-reel-04.jpg` | 1:21 | 1080x1920 | 204 MB (2160x3840) | 17 MB | ~92% | 20260519_REELS_01M20S |
| `hugo-reel-05.mp4` | `posters/hugo-reel-05.jpg` | 1:12 | 1080x1920 | 183 MB (2160x3840) | 26 MB | ~86% | 20260317_REELS_01M12S |
| `hugo-reel-06.mp4` | `posters/hugo-reel-06.jpg` | 1:18 | 1080x1920 | 149 MB (1728x3072) | 13 MB | ~91% | 20260206_REELS_01M18S |

**Total raw selecionado:** ~1,08 GB → **Total comprimido:** ~104 MB de vídeo (+ ~0,6 MB de posters). Economia ~90%.

## Notas
- A pasta FINALIZADOS tinha 16 reels; foram escolhidos 6 (variedade de datas fev–mai/2026), conforme pedido.
- Os nomes do Drive são só datados (sem título do tema); os temas específicos de cada reel não estão
  no nome do arquivo. Se precisar de título por reel, conferir na conta @hugodoria_dev / Drive.
- Originais (raw 4K) ficaram em `/tmp/hugo-reels/raw/` (temporário, não versionado).
