// Conversor markdown -> HTML usado nos estudos (papers em versão web) e reaproveitável.
// Suporta: headings, tabelas, listas, blockquotes (citações/tweets), imagens com
// legenda, hr, bold/italic/code, links. O HTML resultante deve passar por DOMPurify
// no server antes de ir pro client.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escapa um valor que vai DENTRO de um atributo HTML entre aspas duplas.
 *
 * `escapeHtml` (acima) roda no markdown inteiro e não escapa `"` — o que é
 * correto pro corpo do texto e ERRADO pra atributo. Sem isto, um alt como
 * `![Capa do whitepaper "Bitcoin: ..."](x.png)` fecha o atributo no meio: o alt
 * sai truncado em `alt="Capa do whitepaper "` e o resto da frase vira lixo de
 * atributo. Havia 11 imagens assim no acervo em 26/08/2026 — o `<figcaption>`
 * (text node) saía íntegro, então ninguém via; quem perdia era leitor de tela e
 * SEO de imagem.
 *
 * É também a única barreira que impede breakout de atributo aqui. Hoje o
 * DOMPurify em `/blog/[slug]` limparia um `onerror=` injetado assim, mas depender
 * disso é depender de defesa que vive em OUTRO arquivo — e este markdown também
 * é usado nos papers.
 */
function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

/**
 * `true` quando o href aponta pro próprio site (path relativo, âncora ou
 * kaleidos.com.br). Link interno NÃO deve abrir em aba nova: o corpo dos posts
 * linka `/contato` (126x), `/pacotes` (52x), `/marca-pessoal` (39x) e dezenas de
 * outros posts, e todos abriam `target="_blank"` porque a regra de link era uma
 * só pra tudo.
 */
function isInternalHref(href: string): boolean {
  const h = href.trim();
  if (h.startsWith("#")) return true;
  if (h.startsWith("//")) return false;
  if (h.startsWith("/")) return true;
  return /^https?:\/\/(www\.)?kaleidos\.com\.br(\/|$)/i.test(h);
}

export function markdownToHtml(markdown: string): string {
  let html = escapeHtml(markdown.trim());

  // Tabelas
  html = html.replace(
    /^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm,
    (_, headerRow: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .map((h) => h.trim())
        .filter(Boolean);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row) =>
          row
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean)
        );
      let table = '<div class="study-table-wrap"><table>\n<thead><tr>';
      headers.forEach((h) => (table += `<th>${h}</th>`));
      table += "</tr></thead><tbody>";
      rows.forEach((row) => {
        table += "<tr>";
        row.forEach((c) => (table += `<td>${c}</td>`));
        table += "</tr>";
      });
      table += "</tbody></table></div>";
      return table;
    }
  );

  // Headings (h1 vira h2 — o título principal mora no hero)
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^(?:---|\*\*\*)$/gm, "<hr />");

  // Imagens (ANTES dos links) -> figure com legenda = alt
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt: string, src: string, title?: string) => {
      const caption = (title || alt || "").trim();
      const cap = caption
        ? `<figcaption>${caption}</figcaption>`
        : "";
      return `<figure class="study-fig"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" />${cap}</figure>`;
    }
  );

  // Inline
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/`([^`]+?)`/g, "<code>$1</code>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, (_m, text: string, href: string) => {
    const safeHref = escapeAttr(href);
    // Interno abre na mesma aba; externo mantém _blank + rel de segurança.
    return isInternalHref(href)
      ? `<a href="${safeHref}">${text}</a>`
      : `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Listas (-)
  html = html.replace(/(?:^- .+$\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // Listas (1.)
  html = html.replace(/(?:^\d+\. .+$\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  });

  // Blockquotes (citações + tweets). Aceita linhas `>` vazias e atribuição `— @handle`.
  html = html.replace(/(?:^&gt;.*(?:\n|$))+/gm, (match) => {
    const lines = match
      .replace(/\n+$/, "")
      .split("\n")
      .map((line) => line.replace(/^&gt;\s?/, "").trimEnd());
    // agrupa em parágrafos (linha vazia separa); destaca a atribuição (— @handle)
    const paras: string[] = [];
    let buf: string[] = [];
    const flush = () => {
      if (!buf.length) return;
      const text = buf.join("<br />");
      if (/^—\s/.test(buf[0]) && buf.length === 1) {
        paras.push(`<cite class="study-cite">${text}</cite>`);
      } else {
        paras.push(`<p>${text}</p>`);
      }
      buf = [];
    };
    for (const l of lines) {
      if (l === "") flush();
      else buf.push(l);
    }
    flush();
    return `<blockquote>${paras.join("")}</blockquote>`;
  });

  // Parágrafos
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<figure") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith('<div class="study-table-wrap"')
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}
