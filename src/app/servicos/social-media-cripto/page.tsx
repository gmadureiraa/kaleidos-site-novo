"use client";

import { AtSign } from "lucide-react";
import { ServicePageTemplate } from "@/components/ui/service-page-template";
import { getServiceData } from "@/lib/service-pages-data";

export default function ServicePage() {
  const data = getServiceData("social-media-cripto");
  if (!data) return null;
  return <ServicePageTemplate data={data} Icon={AtSign} />;
}
