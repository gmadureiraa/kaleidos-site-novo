import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0,
      }
    );
  }
  return posthogClient;
}

type Props = Record<string, unknown>;

/** Resumo do payload pros logs [LEAD-FALLBACK] (sem despejar props gigantes). */
function summarizePayload(
  distinctId: string,
  event: string,
  properties: Props
): string {
  try {
    return JSON.stringify({
      distinct_id: distinctId,
      event,
      props: properties,
    }).slice(0, 1500);
  } catch {
    return `distinct_id=${distinctId} event=${event}`;
  }
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties: Props = {}
): Promise<void> {
  // NUNCA falhar 100% mudo: se o token está ausente ou o capture lançar, o
  // evento (que pode ser a única cópia do lead) vai pros logs da Vercel de
  // forma recuperável via [LEAD-FALLBACK].
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    console.error(
      `[LEAD-FALLBACK] posthog off (NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ausente) — ${summarizePayload(
        distinctId,
        event,
        properties
      )}`
    );
    return;
  }
  try {
    const ph = getPostHogClient();
    ph.capture({
      distinctId,
      event,
      properties: { site: "kaleidos", ...properties },
    });
    await ph.flush();
  } catch (err) {
    // never throw from analytics — mas sempre deixar rastro recuperável
    console.error(
      `[LEAD-FALLBACK] posthog off (capture/flush falhou) — ${summarizePayload(
        distinctId,
        event,
        properties
      )}`,
      err
    );
  }
}
