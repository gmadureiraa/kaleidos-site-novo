# Vídeos Longos (YouTube) — manifesto para portfólio/cases

> Levantado em 2026-06-26. Vídeos REAIS confirmados via `yt-dlp` direto nos canais.
> Objetivo: adicionar formato "vídeo longo" no /portfolio e nas páginas de case do site Kaleidos
> usando EMBED do YouTube (sem baixar GB de arquivo). Só as thumbnails (jpg) foram baixadas localmente.

## Tabela

| Cliente | Título | youtube_url | youtube_id | thumb_local | duração | data | views |
|---|---|---|---|---|---|---|---|
| Hugo Doria | Por que seu site feito com IA nunca parece profissional | https://www.youtube.com/watch?v=5CvJqBTRm5M | `5CvJqBTRm5M` | `/Cases/_youtube-thumbs/hugo-yt-01.jpg` | 8min (493s) | 2026-01-07 | 41 |
| Lucas Amendola | O FED ACABA DE DAR START NO PRÓXIMO CICLO DE ALTA | https://www.youtube.com/watch?v=zButbYGl0qo | `zButbYGl0qo` | `/Cases/_youtube-thumbs/lucas-yt-01.jpg` | 22min | 2026-06-17 | 23.783 |
| Lucas Amendola | COMPRAR BITCOIN AGORA VAI MUDAR SUA VIDA | https://www.youtube.com/watch?v=S8eL_NN3G9c | `S8eL_NN3G9c` | `/Cases/_youtube-thumbs/lucas-yt-02.jpg` | 12min | 2026-06-12 | 29.025 |

Todas as thumbs são `maxresdefault.jpg` (1280x720) — confirmado HTTP 200 e arquivo JPEG válido.

## Canais (confirmados)

- **Hugo Doria** → handle `@hdoriam` · channel_id `UCQ9zWNvgSzMEb-afcmrYsvg`
  https://www.youtube.com/@hdoriam
  ⚠️ Ele tem **apenas 1 vídeo longo** publicado no canal (aba "Vídeos"). O resto do canal é
  Shorts/reels. Por isso só 1 entrada de vídeo longo (a tarefa pedia 3-4, mas não existem mais
  ainda). Se ele publicar mais long-form, é só repetir o processo. IG dele já está no case:
  https://www.instagram.com/hugodoria_dev/

- **Lucas Amendola** → handle `@investidor4.20` · channel_id `UC8oofAsuieQv3imZGvaUDOQ`
  https://www.youtube.com/@investidor4.20
  Escolhi 2 vídeos PT-BR recentes: o mais novo (FED/ciclo de alta) e o de mais views
  (comprar bitcoin agora). O canal tem várias versões dubladas/EN dos mesmos vídeos — usei
  os IDs dos vídeos ORIGINAIS em português.

## ⚠️ Instruções para o próximo agente (case-data.ts / portfolio)

O modelo de mídia atual em `src/lib/case-data.ts` é:

```ts
{ src: string, type: "image" | "video", poster: string, alt?: string }
```

Para vídeo longo do YouTube, vai precisar suportar um novo `type: "youtube"`. Sugestão de shape:

```ts
{
  type: "youtube",
  videoId: "5CvJqBTRm5M",                          // <-- usar ESTE id no embed
  poster: "/Cases/_youtube-thumbs/hugo-yt-01.jpg", // thumb local (não puxar do i.ytimg em runtime)
  src: "https://www.youtube.com/watch?v=5CvJqBTRm5M", // url canônica (opcional, p/ link "abrir no YouTube")
  alt: "Hugo Dória — vídeo longo: site feito com IA"
}
```

Renderização (portfolio + página de case):
- Thumbnail (`poster`) como capa clicável; ao clicar, trocar por `<iframe>` lazy do embed:
  `https://www.youtube.com/embed/<videoId>` (use `videoId`, NÃO a url watch, no iframe).
- Prefira lazy/click-to-play (não carregar todos os iframes de cara) por performance.
- Aspect ratio 16:9 (as thumbs são 1280x720). É diferente dos reels verticais 1080x1920 já no case.
- O `videoId` é a chave canônica. URL watch = `https://www.youtube.com/watch?v=<videoId>`,
  thumb remota (fallback) = `https://i.ytimg.com/vi/<videoId>/maxresdefault.jpg`.

### IDs canônicos a usar
- Hugo Doria: `5CvJqBTRm5M`
- Lucas Amendola: `zButbYGl0qo` e `S8eL_NN3G9c`

### Cases-alvo
- Hugo → entrada `"hugo-doria"` em case-data.ts (já existe, com reels verticais). Adicionar o
  vídeo longo ao array `media[]`.
- Lucas → procurar/usar a entrada do Lucas Amendola / "investidor-4-20" (pasta de case
  `public/Cases/investidor-4-20` existe). Adicionar os 2 vídeos longos ao `media[]` dela.
