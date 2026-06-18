"use client";

import { Users } from "lucide-react";
import { ServicePageTemplate } from "@/components/ui/service-page-template";
import { getServiceData } from "@/lib/service-pages-data";

export default function ServicePage() {
  const data = getServiceData("comunidade-cripto");
  if (!data) return null;
  return <ServicePageTemplate data={data} Icon={Users} />;
}
