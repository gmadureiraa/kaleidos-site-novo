import type { Metadata } from "next";
import { generateServicePageMetadata } from "@/lib/seo-helpers";

export function generateMetadata(): Metadata {
  return generateServicePageMetadata("consultoria-gtm");
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
