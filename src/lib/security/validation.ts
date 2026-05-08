/**
 * Validation helpers compartilhados pelos endpoints de captura.
 */

// Regex sane minimal — não tenta cobrir 100% do RFC, mas barra lixo óbvio
// (sem @, sem domínio, espaços no meio) antes de chamar Resend.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length > 254) return false;
  return EMAIL_REGEX.test(value);
}

/**
 * Honeypot anti-bot. Qualquer campo `_hp` preenchido vira sinal de bot.
 * Aceita string ou unknown (pra usar direto em payloads JSON).
 */
export function isHoneypotTriggered(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}
