"use client";

import {
  Bot,
  Workflow,
  Zap,
  Sparkles,
  BarChart3,
  Mail,
  MessageCircle,
  Calendar,
  PenTool,
  Share2,
  Image as ImageIcon,
  Send,
} from "lucide-react";

// Antes: react-icon-cloud + fetchSimpleIcons (buscava ~40 SVGs do jsdelivr em
// runtime). Estava QUEBRADO em prod (bloqueado pela CSP) e pesava no main-thread.
// Trocado por um cluster de ícones LOCAIS (lucide, já no bundle) com float em CSS
// puro — zero fetch, zero CSP, zero JS extra. Tema: ferramentas / IA / automação.
const ICONS = [
  { Icon: Bot, tone: "green" },
  { Icon: Workflow, tone: "pink" },
  { Icon: Sparkles, tone: "green" },
  { Icon: BarChart3, tone: "ghost" },
  { Icon: Zap, tone: "pink" },
  { Icon: Mail, tone: "ghost" },
  { Icon: MessageCircle, tone: "green" },
  { Icon: PenTool, tone: "ghost" },
  { Icon: Calendar, tone: "pink" },
  { Icon: Share2, tone: "ghost" },
  { Icon: ImageIcon, tone: "green" },
  { Icon: Send, tone: "pink" },
] as const;

const TONES = {
  green: "bg-[#7CFF6B]/12 text-[#3d9e32] ring-[#7CFF6B]/30",
  pink: "bg-[#D262B2]/12 text-[#b14e96] ring-[#D262B2]/25",
  ghost: "bg-neutral-100 text-neutral-500 ring-neutral-200",
} as const;

export function IconCloudDemo() {
  return (
    <div className="grid w-full grid-cols-4 place-items-center gap-3 px-2">
      {ICONS.map(({ Icon, tone }, i) => (
        <span
          key={i}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${TONES[tone]}`}
          style={{
            animation: `kxFloat 3.2s ease-in-out ${(i % 4) * 0.25}s infinite`,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      ))}
      <style>{`
        @keyframes kxFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="kxFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
