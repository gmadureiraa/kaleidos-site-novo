import { Resend } from "resend";
import { unsubUrl } from "../unsubscribe";
import { buildWelcomeEmail } from "./1-welcome";
import { buildLucasEmail } from "./2-lucas";
import { buildDsecEmail } from "./3-dsec";
import { buildEmail4 } from "./4-conteudo";
import { buildEmail5 } from "./5-tese";
import { buildEmail6 } from "./6-breakup";

const FROM = process.env.LEAD_SEQUENCE_FROM || "Kaleidos <onboarding@resend.dev>";
const REPLY_TO = process.env.LEAD_SEQUENCE_REPLY_TO || "madureira@kaleidosdigital.com";

export type EmailNumber = 1 | 2 | 3 | 4 | 5 | 6;

export function buildEmail(n: EmailNumber, opts: { name?: string | null; email: string }) {
  const u = unsubUrl(opts.email);
  switch (n) {
    case 1: return buildWelcomeEmail({ name: opts.name, unsubUrl: u });
    case 2: return buildLucasEmail({ name: opts.name, unsubUrl: u });
    case 3: return buildDsecEmail({ name: opts.name, unsubUrl: u });
    case 4: return buildEmail4({ name: opts.name, unsubUrl: u });
    case 5: return buildEmail5({ name: opts.name, unsubUrl: u });
    case 6: return buildEmail6({ name: opts.name, unsubUrl: u });
  }
}

export async function sendSequenceEmail(opts: {
  to: string;
  name?: string | null;
  emailNumber: EmailNumber;
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
    await resend.emails.send({
      from: FROM,
      to: opts.to,
      replyTo: REPLY_TO,
      subject: built.subject,
      html: built.html,
      text: built.text,
    });
    return { ok: true };
  } catch (err) {
    console.error("[lead-sequence] erro Resend:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
