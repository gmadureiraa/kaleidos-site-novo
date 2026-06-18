"use client";

import { useTracking } from "@/hooks/use-tracking";

/**
 * Probe client mínimo que dispara o tracking (pageview/scroll/tempo) da home
 * sem forçar a página inteira a virar client component. Renderiza nada.
 */
export function TrackingProbe() {
  useTracking();
  return null;
}
