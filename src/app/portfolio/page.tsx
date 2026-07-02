"use client";

import PortfolioGallery from "@/components/portfolio/portfolio-gallery";
import { FooterDemo } from "@/components/ui/footer-demo";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioGallery />
      <div className="bg-[#0A0A0B]">
        <FooterDemo />
      </div>
    </>
  );
}
