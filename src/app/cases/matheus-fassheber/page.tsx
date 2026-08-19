"use client";

import { getCaseData } from "@/lib/case-data";
import { CaseLayout } from "@/components/ui/case-layout";

export default function MatheusFassheberCase() {
  const caseData = getCaseData("matheus-fassheber");

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Case não encontrado</p>
      </div>
    );
  }

  return <CaseLayout caseData={caseData} />;
}
