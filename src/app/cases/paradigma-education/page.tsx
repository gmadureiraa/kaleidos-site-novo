import { getCaseData } from "@/lib/case-data";
import { CaseLayout } from "@/components/ui/case-layout";
import { notFound } from "next/navigation";

export default function ParadigmaEducationPage() {
  const caseData = getCaseData("paradigma-education");

  if (!caseData) {
    notFound();
  }

  return <CaseLayout caseData={caseData} />;
} 