import { listActiveLeads, markEmailSent } from "@/lib/db/leads";
import { sendSequenceEmail, type EmailNumber } from "@/lib/emails/lead-sequence/send";

/**
 * Cron diário (Vercel) — dispara email N pra cada lead com idade certa.
 * Mapeamento: dia 0 = 1, dia 2 = 2, dia 5 = 3, dia 9 = 4.
 * Email #1 já é enviado na hora do signup; aqui é só catch-up + 2/3/4.
 *
 * Schedule sugerido (vercel.json): "0 13 * * *" (10h BRT, peak abertura email).
 *
 * Query params:
 *   - ?dry=true  → simula, não envia
 *   - ?force=N   → força reenvio do email N pra todos (debug)
 *
 * Autenticação:
 *   - Vercel Cron envia header `x-vercel-cron`.
 *   - Em chamada manual, exigir `?token=<CRON_SECRET>`.
 */

const SEQUENCE_MAP: Record<number, EmailNumber> = {
  0: 1,
  2: 2,
  5: 3,
  9: 4,
};

const MAX_DAYS = 14;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysSince(d: Date) {
  return Math.floor((Date.now() - d.getTime()) / MS_PER_DAY);
}

function isAuthed(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const dry = url.searchParams.get("dry") === "true";

  const leads = await listActiveLeads(MAX_DAYS);

  const plan: Array<{ leadId: string; email: string; days: number; sending: EmailNumber | null; reason?: string }> = [];

  for (const lead of leads) {
    const days = daysSince(new Date(lead.signed_up_at));
    const target = SEQUENCE_MAP[days as keyof typeof SEQUENCE_MAP];

    if (target === undefined) {
      plan.push({ leadId: lead.id, email: lead.email, days, sending: null, reason: "no-target-today" });
      continue;
    }
    if (lead.emails_sent.includes(target)) {
      plan.push({ leadId: lead.id, email: lead.email, days, sending: null, reason: `email-${target}-already-sent` });
      continue;
    }
    plan.push({ leadId: lead.id, email: lead.email, days, sending: target });
  }

  if (dry) {
    return Response.json({
      ok: true,
      dry: true,
      now: new Date().toISOString(),
      leads_checked: leads.length,
      plan,
    });
  }

  const sent: Array<{ leadId: string; email: string; emailNumber: EmailNumber; ok: boolean; error?: string }> = [];

  for (const item of plan) {
    if (item.sending === null) continue;
    const lead = leads.find((l) => l.id === item.leadId)!;
    const result = await sendSequenceEmail({
      to: lead.email,
      name: lead.name,
      emailNumber: item.sending,
      dryRun: false,
    });
    if (result.ok) {
      await markEmailSent(lead.id, item.sending).catch(() => {});
    }
    sent.push({
      leadId: lead.id,
      email: lead.email,
      emailNumber: item.sending,
      ok: result.ok,
      error: result.error,
    });
  }

  return Response.json({
    ok: true,
    now: new Date().toISOString(),
    leads_checked: leads.length,
    sent_count: sent.filter((s) => s.ok).length,
    sent,
  });
}
