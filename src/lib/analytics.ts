import posthog from "posthog-js";

type Props = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, props);
  } catch {
    // analytics nunca quebra a UI
  }
}

/**
 * Liga o visitante anônimo ao email capturado (merge de jornada no PostHog).
 * Chamar SEMPRE que um form de lead converter — é isso que permite "mapear
 * quem baixou o playbook": todos os pageviews/cliques anônimos anteriores
 * passam a pertencer à pessoa identificada pelo email.
 *
 * O distinct_id vira o email normalizado (lowercase), o MESMO id usado pelo
 * captureServerEvent no backend — client e server convergem na mesma pessoa.
 */
export function identifyLead(email: string, props?: Props) {
  if (typeof window === "undefined") return;
  const id = email.trim().toLowerCase();
  if (!id) return;
  try {
    posthog.identify(id, { email: id, ...props });
  } catch {
    // no-op
  }
}
