import { Pool } from "pg";

declare global {
  var __pgPool: Pool | undefined;
}

/**
 * Pool singleton — Neon Postgres.
 * Retorna `null` quando `DATABASE_URL` não está setado (modo dev/fallback).
 * Quem chama precisa lidar com null pra não quebrar build/runtime sem DB.
 */
export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString: url,
      ssl: url.includes("sslmode=require") ? { rejectUnauthorized: false } : undefined,
      max: 5,
    });
  }
  return global.__pgPool;
}

export type LeadRow = {
  id: string;
  email: string;
  name: string | null;
  empresa: string | null;
  tamanho: string | null;
  whatsapp: string | null;
  gargalo: string | null;
  signed_up_at: Date;
  emails_sent: number[];
  unsubscribed: boolean;
  metadata: Record<string, unknown>;
};
