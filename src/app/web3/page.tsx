import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";

// Página de TESTE isolada — renderiza o bundle estático compilado a partir do
// design KaleidosAprovados.dc.html, dentro de um iframe full-bleed que cobre a
// navbar/popup globais do layout raiz.
//
// Usa `srcDoc` (não `src`) de propósito: o site aplica X-Frame-Options: DENY +
// CSP frame-ancestors 'none' em /(.*), o que bloquearia um iframe apontando pra
// /web3/index.html. Conteúdo via srcdoc não passa por esses headers HTTP e
// herda a CSP permissiva do pai (img/font/style/script self+inline), então
// renderiza sem precisar mexer no next.config nem em nenhuma rota existente.
//
// NÃO altera nenhuma rota/componente/layout/config existente do site.
export const metadata: Metadata = {
  title: "Kaleidos — Web3 (teste de design)",
  robots: { index: false, follow: false },
};

function getDesignHtml(): string {
  const raw = readFileSync(
    join(process.cwd(), "public", "web3", "index.html"),
    "utf8",
  );
  // srcdoc não tem base URL (about:srcdoc) → tornar os caminhos absolutos.
  return raw
    .split("assets/collage/")
    .join("/web3/assets/collage/")
    .split("assets/fonts/")
    .join("/web3/assets/fonts/");
}

export default function Web3TestPage() {
  const html = getDesignHtml();
  return (
    <iframe
      srcDoc={html}
      title="Kaleidos Web3 — teste de design"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        zIndex: 2147483647,
        background: "#FAFAFA",
      }}
    />
  );
}
