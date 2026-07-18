import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-helpers";
import { AgendarClient } from "./agendar-client";

// Página de funil da sequência de email (CTA de call) — noindex de propósito.
// Existe pra embutir o Calendly e capturar o evento `meeting_booked` no
// momento do agendamento, coisa que o link cru do Calendly não permite.
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Agendar consultoria gratuita de 30 minutos | Kaleidos",
    description:
      "Escolhe um horário e agenda uma consultoria gratuita de 30 minutos com o time da Kaleidos. A gente mapeia seus canais e mostra onde está a oportunidade.",
    url: "/agendar",
    type: "website",
  }),
  robots: { index: false, follow: false },
};

export default function AgendarPage() {
  return <AgendarClient />;
}
