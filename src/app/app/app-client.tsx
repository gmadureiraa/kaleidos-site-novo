"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type DashPost = {
  slug: string;
  title: string;
  publishedAt: string;
  coverImage: string;
  category: string;
  readTime: number;
  featured: boolean;
  status: "publicado" | "agendado";
};

const INK = "#14110D";
const CREAM = "#F5F1E8";
const MAGENTA = "#D262B2";
const GREEN = "#7CF067";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

type Filter = "todos" | "publicado" | "agendado";

export function AppDashboard({
  posts,
  generatedAt,
}: {
  posts: DashPost[];
  generatedAt: string;
}) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const pub = posts.filter((p) => p.status === "publicado").length;
    const sched = posts.filter((p) => p.status === "agendado").length;
    const noCover = posts.filter((p) => !p.coverImage).length;
    return { total: posts.length, pub, sched, noCover };
  }, [posts]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter !== "todos" && p.status !== filter) return false;
      if (term && !p.title.toLowerCase().includes(term) && !p.slug.includes(term)) return false;
      return true;
    });
  }, [posts, filter, q]);

  return (
    <div style={{ minHeight: "100vh", background: CREAM, color: INK }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 80px" }}>
        {/* Header */}
        <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>
              Painel de Conteúdo{" "}
              <span style={{ background: GREEN, padding: "0 8px", borderRadius: 4 }}>Kaleidos</span>
            </h1>
            <p style={{ opacity: 0.6, fontSize: 13, marginTop: 6 }}>
              Calendário editorial do blog · atualizado {fmtDate(generatedAt)}
            </p>
          </div>
          <Link
            href="/blog"
            style={{ fontSize: 13, fontWeight: 600, textDecoration: "none", color: INK, borderBottom: `2px solid ${MAGENTA}` }}
          >
            ver blog público ↗
          </Link>
        </header>

        {/* Stats */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 24 }}>
          <Stat label="Total de posts" value={counts.total} />
          <Stat label="Publicados" value={counts.pub} accent={GREEN} />
          <Stat label="Agendados" value={counts.sched} accent={MAGENTA} />
          <Stat label="Sem capa" value={counts.noCover} accent={counts.noCover ? "#E4572E" : undefined} />
        </section>

        {/* Views panel (PostHog) */}
        <section
          style={{
            marginTop: 16,
            border: `1px dashed ${INK}33`,
            borderRadius: 10,
            padding: "14px 16px",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontWeight: 600 }}>📊 Views (Google / IA / direto)</span>
          <span style={{ opacity: 0.6 }}>
            Aguardando conexão do PostHog — quando conectar, entra aqui por post.
          </span>
        </section>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
          {(["todos", "publicado", "agendado"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textTransform: "capitalize",
                background: filter === f ? INK : "transparent",
                color: filter === f ? CREAM : INK,
                outline: filter === f ? "none" : `1px solid ${INK}22`,
              }}
            >
              {f}
            </button>
          ))}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="buscar título ou slug…"
            style={{
              marginLeft: "auto",
              padding: "8px 12px",
              borderRadius: 8,
              border: `1px solid ${INK}22`,
              fontSize: 13,
              background: "#fff",
              minWidth: 200,
            }}
          />
        </div>

        {/* List */}
        <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {visible.map((p) => (
            <li
              key={p.slug}
              style={{
                display: "grid",
                gridTemplateColumns: "84px 1fr auto",
                gap: 14,
                alignItems: "center",
                background: "#fff",
                border: `1px solid ${INK}12`,
                borderRadius: 10,
                padding: 8,
              }}
            >
              <div style={{ width: 84, height: 48, borderRadius: 6, overflow: "hidden", background: INK + "0a", flexShrink: 0 }}>
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 10, opacity: 0.4 }}>
                    sem capa
                  </div>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <a
                  href={`/blog/${p.slug}`}
                  style={{ fontWeight: 600, fontSize: 14, color: INK, textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {p.title}
                </a>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                  {p.category} · {p.readTime} min · {fmtDate(p.publishedAt)}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {p.featured && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: MAGENTA }}>★ destaque</span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 999,
                    background: p.status === "publicado" ? GREEN : MAGENTA,
                    color: INK,
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {visible.length === 0 && (
          <p style={{ opacity: 0.5, fontSize: 13, marginTop: 24, textAlign: "center" }}>Nenhum post pra esse filtro.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${INK}12`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: accent || INK, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{label}</div>
    </div>
  );
}
