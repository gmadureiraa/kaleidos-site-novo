-- Migration: lead_email_sequence
-- Aplicar manualmente no Neon SQL editor (ou via psql) ANTES de deploy em prod.
-- Idempotente: pode rodar várias vezes sem quebrar.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS lead_email_sequence (
  id            uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text          NOT NULL,
  name          text,
  empresa       text,
  tamanho       text,
  whatsapp      text,
  gargalo       text,
  signed_up_at  timestamptz   NOT NULL DEFAULT now(),
  emails_sent   integer[]     NOT NULL DEFAULT '{}',
  unsubscribed  boolean       NOT NULL DEFAULT false,
  metadata      jsonb         NOT NULL DEFAULT '{}'::jsonb
);

CREATE UNIQUE INDEX IF NOT EXISTS lead_email_sequence_email_idx
  ON lead_email_sequence (lower(email));

CREATE INDEX IF NOT EXISTS lead_email_sequence_signed_up_idx
  ON lead_email_sequence (signed_up_at DESC);

CREATE INDEX IF NOT EXISTS lead_email_sequence_active_idx
  ON lead_email_sequence (unsubscribed)
  WHERE unsubscribed = false;
