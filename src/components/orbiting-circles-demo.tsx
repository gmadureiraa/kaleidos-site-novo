"use client";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative overflow-hidden h-[160px] w-full">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* AI State Loading Container */}
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          {/* Header with Loading Spinner */}
          <div className="flex items-center gap-3 mb-4">
            {/* Animated Loading Spinner */}
            <div className="relative w-6 h-6">
              <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {/* Colored dots around the spinner */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
            <span className="text-gray-700 font-mono text-sm">Analisando dados...</span>
          </div>
          
          {/* Task List */}
          <div className="space-y-2">
            <div className="text-gray-600 font-mono text-xs animate-pulse" style={{ animationDelay: '0.2s' }}>3 Buscando concorrentes...</div>
            <div className="text-gray-600 font-mono text-xs animate-pulse" style={{ animationDelay: '0.4s' }}>4 Criando estratégia...</div>
            <div className="text-gray-600 font-mono text-xs animate-pulse" style={{ animationDelay: '0.6s' }}>5 Desenvolvendo conteúdo...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
