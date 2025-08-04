import { getCaseData } from "@/lib/case-data";
import { CaseLayout } from "@/components/ui/case-layout";

export default function DefiversoPage() {
  const caseData = getCaseData("defiverso");
  
  if (!caseData) {
    return <div>Case não encontrado</div>;
  }

  return <CaseLayout caseData={caseData} />;
} 