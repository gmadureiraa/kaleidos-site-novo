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

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties: Props = {}
): Promise<void> {
  try {
    const ph = getPostHogClient();
    ph.capture({
      distinctId,
      event,
      properties: { site: "kaleidos", ...properties },
    });
    await ph.flush();
  } catch {
    // never throw from analytics
  }
}
