"use client";

import { CaseLayout } from "@/components/ui/case-layout";
import { getCaseData } from "@/lib/case-data";

export default function JornalCriptoPage() {
  const caseData = getCaseData("jornal-cripto");
  
  if (!caseData) {
    return <div>Case não encontrado</div>;
  }

  return <CaseLayout caseData={caseData} />;
} 