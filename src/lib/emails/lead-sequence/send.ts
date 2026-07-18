import { Resend } from "resend";
import { tagValue } from "@/lib/resend-contact-props";
import { unsubUrl } from "../unsubscribe";
import { buildWelcomeEmail } from "./1-welcome";
import { buildCredibilidadeEmail } from "./2-credibilidade";
import { buildPlaybookBearEmail } from "./3-playbook-bear";
import { buildDiagnosticoEmail } from "./4-diagnostico";
import { buildPosicionamentoEmail } from "./5-posicionamento";
import { buildPlaybook2026Email } from "./6-playbook-2026";
import { buildConsultoriaEmail } from "./7-consultoria";
import { buildBreakupEmail } from "./8-breakup";

const FROM = process.env.LEAD_SEQUENCE_FROM || "Kaleidos <contato@news.kaleidos.com.br>";
const REPLY_TO = process.env.LEAD_SEQUENCE_REPLY_TO || "madureira@kaleidosdigital.com";

export type EmailNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// `name` é aceito por compat (signup pode mandar), mas os templates NÃO
// personalizam por nome: o lead entra só com email (regra Gabriel 2026-07).
export function buildEmail(n: EmailNumber, opts: { name?: string | null; email: string }) {
  const u = unsubUrl(opts.email);
  switch (n) {
    case 1: return buildWelcomeEmail({ name: opts.name, unsubUrl: u });
    case 2: return buildCredibilidadeEmail({ name: opts.name, unsubUrl: u });
    case 3: return buildPlaybookBearEmail({ name: opts.name, unsubUrl: u });
    case 4: return buildDiagnosticoEmail({ name: opts.name, unsubUrl: u });
    case 5: return buildPosicionamentoEmail({ name: opts.name, unsubUrl: u });
    case 6: return buildPlaybook2026Email({ name: opts.name, unsubUrl: u });
    case 7: return buildConsultoriaEmail({ name: opts.name, unsubUrl: u });
    case 8: return buildBreakupEmail({ name: opts.name, unsubUrl: u });
  }
}

export async function sendSequenceEmail(opts: {
  to: string;
  name?: string | null;
  emailNumber: EmailNumber;
  /** Origem do lead (form/popup) — vira tag `source` no Resend (Logs → filtro por tag). */
  source?: string | null;
  dryRun?: boolean;
}): Promise<{ ok: boolean; simulated?: boolean; error?: string }> {
  const built = buildEmail(opts.emailNumber, { name: opts.name, email: opts.to });

  if (opts.dryRun) {
    console.log(`[lead-sequence] DRY RUN email#${opts.emailNumber} → ${opts.to}: ${built.subject}`);
    return { ok: true, simulated: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[lead-sequence] RESEND_API_KEY ausente, simulando envio");
    console.log(`[lead-sequence] WOULD SEND email#${opts.emailNumber} → ${opts.to}: ${built.subject}`);
    return { ok: true, simulated: true };
  }

  try {
    const resend = new Resend(apiKey);
    // Tags: no dashboard do Resend (Emails/Logs, filtro por tag) dá pra ver
    // QUAL email da sequência cada lead recebeu e DE ONDE o lead veio.
    const tags = [
      { name: "product", value: "kaleidos" },
      { name: "category", value: "lead-sequence" },
      { name: "email", value: String(opts.emailNumber) },
      ...(opts.source ? [{ name: "source", value: tagValue(opts.source) }] : []),
    ];
    await resend.emails.send({
      from: FROM,
      to: opts.to,
      replyTo: REPLY_TO,
      subject: built.subject,
      html: built.html,
      text: built.text,
      tags,
    });
    return { ok: true };
  } catch (err) {
    console.error("[lead-sequence] erro Resend:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
