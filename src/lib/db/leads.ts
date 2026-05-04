import { getPool, type LeadRow } from "./client";

export type LeadInput = {
  email: string;
  name?: string;
  empresa?: string;
  tamanho?: string;
  whatsapp?: string;
  gargalo?: string;
};

export async function upsertLead(input: LeadInput): Promise<LeadRow | null> {
  const pool = getPool();
  if (!pool) {
    console.warn("[leads] DATABASE_URL ausente — pulando persistência");
    return null;
  }
  const { email, name, empresa, tamanho, whatsapp, gargalo } = input;

  const result = await pool.query<LeadRow>(
    `
    INSERT INTO lead_email_sequence (email, name, empresa, tamanho, whatsapp, gargalo)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ((lower(email))) DO UPDATE SET
      name     = COALESCE(EXCLUDED.name, lead_email_sequence.name),
      empresa  = COALESCE(EXCLUDED.empresa, lead_email_sequence.empresa),
      tamanho  = COALESCE(EXCLUDED.tamanho, lead_email_sequence.tamanho),
      whatsapp = COALESCE(EXCLUDED.whatsapp, lead_email_sequence.whatsapp),
      gargalo  = COALESCE(EXCLUDED.gargalo, lead_email_sequence.gargalo)
    RETURNING *
    `,
    [email, name ?? null, empresa ?? null, tamanho ?? null, whatsapp ?? null, gargalo ?? null]
  );
  return result.rows[0] ?? null;
}

export async function listActiveLeads(maxAgeDays = 14): Promise<LeadRow[]> {
  const pool = getPool();
  if (!pool) return [];

  const result = await pool.query<LeadRow>(
    `
    SELECT * FROM lead_email_sequence
    WHERE unsubscribed = false
      AND signed_up_at >= now() - ($1 || ' days')::interval
    ORDER BY signed_up_at DESC
    `,
    [String(maxAgeDays)]
  );
  return result.rows;
}

export async function markEmailSent(id: string, emailNumber: number): Promise<void> {
  const pool = getPool();
  if (!pool) return;
  await pool.query(
    `
    UPDATE lead_email_sequence
       SET emails_sent = (
         SELECT array_agg(DISTINCT v ORDER BY v)
         FROM unnest(emails_sent || ARRAY[$2::int]) v
       )
     WHERE id = $1
    `,
    [id, emailNumber]
  );
}

export async function unsubscribeByEmail(email: string): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;
  const r = await pool.query(
    `UPDATE lead_email_sequence SET unsubscribed = true WHERE lower(email) = lower($1)`,
    [email]
  );
  return (r.rowCount ?? 0) > 0;
}
