/**
 * Web3 V2 — "Nossos Serviços" na estética Kaleidos (rota `/2`).
 *
 * Substitui o BentoGrid + ServicesList (compartilhados com a home) APENAS no
 * `/2`. 9 serviços em cards brutalistas creme/ink com shadow sólido verde/rosa,
 * rotações leves e selo olho-caleidoscópio. Server component (sem hooks) — os
 * estilos de hover vêm de `<style>` escopado em `.kv2`. NÃO toca a home real.
 */
import Link from "next/link";

const INK = "#14110D";
const GREEN = "#7CF067";
const PINK = "#D262B2";

type Service = {
  n: string;
  emoji: string;
  title: string;
  desc: string;
  href: string;
  accent: string;
  rot: number;
};

const SERVICES: Service[] = [
  {
    n: "01",
    emoji: "✍️",
    title: "Marketing de Conteúdo",
    desc: "Estratégia, copy, roteiros e design no IG, X, YouTube e LinkedIn. O motor editorial por trás da marca.",
    href: "/servicos/marketing-conteudo",
    accent: GREEN,
    rot: -1.5,
  },
  {
    n: "02",
    emoji: "🎬",
    title: "Vídeo & Motion",
    desc: "Reels, anúncios e institucionais com motion graphics e tipografia cinética, desenhados pra retenção.",
    href: "/servicos/marketing-conteudo",
    accent: PINK,
    rot: 1.2,
  },
  {
    n: "03",
    emoji: "🤖",
    title: "Kaleidos AI",
    desc: "Agentes de IA sob medida, automações e engines de conteúdo que multiplicam a produção sem perder a voz.",
    href: "/servicos/ia-automacoes-completa",
    accent: GREEN,
    rot: -1,
  },
  {
    n: "04",
    emoji: "🚀",
    title: "Growth & Lançamentos",
    desc: "Operação completa de TGE e lançamento: funis, captura, criativos de tráfego e geração de leads.",
    href: "/servicos/growth-lancamentos",
    accent: PINK,
    rot: 1.5,
  },
  {
    n: "05",
    emoji: "📱",
    title: "Social Media Cripto",
    desc: "Gestão de redes nativa do mercado: calendário, comunidade e conteúdo no ritmo da narrativa do projeto.",
    href: "/servicos/social-media-cripto",
    accent: GREEN,
    rot: 1,
  },
  {
    n: "06",
    emoji: "🔎",
    title: "SEO & GEO Cripto",
    desc: "Conteúdo que rankeia no Google e é citado pela IA. Autoridade que traz tráfego qualificado de graça.",
    href: "/servicos/seo-cripto",
    accent: PINK,
    rot: -1.4,
  },
  {
    n: "07",
    emoji: "📣",
    title: "PR & Assessoria",
    desc: "Posicionamento, mídia e relações com veículos e research. A marca na conversa certa, na hora certa.",
    href: "/servicos/pr-assessoria",
    accent: GREEN,
    rot: -1,
  },
  {
    n: "08",
    emoji: "🤝",
    title: "Influencer & KOL",
    desc: "Curadoria, gestão e campanhas com KOLs cripto reais. Alcance com disclosure, sem ruído pago.",
    href: "/servicos/influencer-kol",
    accent: PINK,
    rot: 1.3,
  },
  {
    n: "09",
    emoji: "🌐",
    title: "Comunidade Cripto",
    desc: "Discord, Telegram e programas que constroem comunidade que não morre depois do airdrop.",
    href: "/servicos/comunidade-cripto",
    accent: GREEN,
    rot: -1.2,
  },
];

const STYLE = `
.kv2 .w3-svc{transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);}
.kv2 .w3-svc:hover{transform:translateY(-8px) rotate(0deg)!important;}
.kv2 .w3-svcgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
@media (max-width:900px){.kv2 .w3-svcgrid{grid-template-columns:repeat(2,1fr)!important;gap:18px!important;}}
@media (max-width:560px){.kv2 .w3-svcgrid{grid-template-columns:1fr!important;}.kv2 .w3-svc{transform:none!important;}}
`;

export function Web3V2Services() {
  return (
    <section style={{ background: "#FAFAFA", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="w3-pad" style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "Gridlite, monospace",
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#3d9e32",
              marginBottom: 16,
            }}
          >
            O que fazemos
          </div>
          <h2
            style={{
              fontFamily: "Atelier, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px,4.6vw,60px)",
              lineHeight: 0.98,
              letterSpacing: "-1.5px",
              margin: 0,
              color: INK,
            }}
          >
            Nossos Serviços<span style={{ color: PINK }}>.</span>
          </h2>
          <p
            style={{
              marginTop: 16,
              maxWidth: 560,
              marginInline: "auto",
              fontSize: 16,
              lineHeight: 1.55,
              color: "#6b6258",
            }}
          >
            Conteúdo, growth e produto no mesmo lugar. Escolha uma frente, ou deixe a gente rodar o motor inteiro.
          </p>
        </div>

        <div className="w3-svcgrid">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="w3-svc"
              style={{
                display: "block",
                textDecoration: "none",
                background: "#fff",
                border: `1.5px solid ${INK}`,
                borderRadius: 18,
                padding: "26px 24px 24px",
                boxShadow: `6px 6px 0 ${s.accent}`,
                transform: `rotate(${s.rot}deg)`,
                position: "relative",
              }}
            >
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  width: 30,
                  height: 21,
                  fill: INK,
                  opacity: 0.3,
                  transform: "rotate(-8deg)",
                }}
              >
                <use href="#kal-eye" />
              </svg>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "Atelier, sans-serif",
                    fontWeight: 800,
                    fontSize: 30,
                    lineHeight: 1,
                    color: s.accent,
                    WebkitTextStroke: `1.5px ${INK}`,
                  }}
                >
                  {s.n}
                </span>
                <span style={{ fontSize: 26 }} aria-hidden="true">
                  {s.emoji}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Atelier, sans-serif",
                  fontWeight: 700,
                  fontSize: 21,
                  lineHeight: 1.12,
                  letterSpacing: "-0.4px",
                  margin: "0 0 8px",
                  color: INK,
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#6b6258", margin: 0 }}>
                {s.desc}
              </p>
              <span
                style={{
                  marginTop: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: "#3d9e32",
                }}
              >
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/servicos"
            className="cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: INK,
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "15px 30px",
              borderRadius: 999,
              boxShadow: `5px 5px 0 ${GREEN}`,
              textDecoration: "none",
            }}
          >
            Ver todos os serviços →
          </Link>
        </div>
      </div>
    </section>
  );
}
