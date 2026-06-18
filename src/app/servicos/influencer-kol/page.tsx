"use client";

import { Star } from "lucide-react";
import { ServicePageTemplate } from "@/components/ui/service-page-template";
import { getServiceData } from "@/lib/service-pages-data";

export default function ServicePage() {
  const data = getServiceData("influencer-kol");
  if (!data) return null;
  return <ServicePageTemplate data={data} Icon={Star} />;
}
