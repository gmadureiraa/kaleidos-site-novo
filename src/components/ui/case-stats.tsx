"use client";

interface CaseStatsProps {
  metricas: {
    label: string;
    valor: string;
    descricao?: string;
  }[];
}

export function CaseStats({ metricas }: CaseStatsProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">
        Métricas de Sucesso
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metricas.map((metrica, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-[#7CFF6B] mb-1">
              {metrica.valor}
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {metrica.label}
            </div>
            {metrica.descricao && (
              <div className="text-xs text-gray-600">
                {metrica.descricao}
          </div>
            )}
          </div>
      ))}
      </div>
    </div>
  );
} 