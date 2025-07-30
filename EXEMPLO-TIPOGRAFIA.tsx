/**
 * Exemplo de Uso da Tipografia da Kaleidos Digital
 * 
 * Este arquivo demonstra como aplicar corretamente as fontes
 * seguindo o Manual da Marca e Brandbook da Kaleidos.
 */

import React from 'react';

export function ExemploTipografia() {
  return (
    <div className="min-h-screen bg-white p-8">
      
      {/* ===== SEÇÃO 1: TÍTULOS PRINCIPAIS (Atelier) ===== */}
      <section className="mb-12">
        <h1 className="font-display text-6xl tracking-tight text-black mb-4">
          O futuro do seu conteúdo começa aqui!
        </h1>
        
        <h2 className="font-display text-4xl tracking-tight text-black mb-3">
          Transformamos ideias em experiências digitais extraordinárias
        </h2>
        
        <h3 className="font-display text-2xl tracking-tight text-black mb-2">
          Marketing de Conteúdo que Hipnotiza
        </h3>
      </section>

      {/* ===== SEÇÃO 2: TEXTOS CORPORAIS (Inter) ===== */}
      <section className="mb-12">
        <p className="font-sans text-lg text-gray-700 mb-4 leading-relaxed">
          A Kaleidos Digital representa a mistura de formas, cores, palavras, 
          fotografias, tipografias e grafismos que capturam o "existir da percepção" 
          e as possibilidades surgidas da união de personalidades e ideias.
        </p>
        
        <p className="font-sans text-base text-gray-600 mb-4 leading-relaxed">
          Fundada por sócios com visões opostas que se complementam, a agência 
          transforma visões abstratas em conteúdos concretos e memoráveis.
        </p>
        
        <div className="font-sans text-sm text-gray-500">
          <p>• Copywriting estratégico</p>
          <p>• Roteiros criativos</p>
          <p>• Edição de vídeo e áudio</p>
          <p>• Design visual</p>
        </div>
      </section>

      {/* ===== SEÇÃO 3: DESTAQUES E CALL-TO-ACTIONS (Gridlite) ===== */}
      <section className="mb-12">
        <div className="bg-black text-white p-8 rounded-2xl">
          <h2 className="font-accent text-3xl mb-4">
            Nós podemos te ajudar!
          </h2>
          
          <p className="font-accent text-xl mb-6">
            Nos diga o que você precisa
          </p>
          
          <button className="font-accent text-lg bg-[#7CFF6B] text-black px-8 py-4 rounded-full font-bold">
            Enviar Mensagem
          </button>
        </div>
      </section>

      {/* ===== SEÇÃO 4: NAVEGAÇÃO E ELEMENTOS INTERATIVOS (Inter) ===== */}
      <section className="mb-12">
        <nav className="flex gap-6 mb-6">
          <a href="#" className="font-sans text-base font-medium text-black hover:text-gray-600">
            Início
          </a>
          <a href="#" className="font-sans text-base font-medium text-black hover:text-gray-600">
            Serviços
          </a>
          <a href="#" className="font-sans text-base font-medium text-black hover:text-gray-600">
            Cases
          </a>
          <a href="#" className="font-sans text-base font-medium text-black hover:text-gray-600">
            Contato
          </a>
        </nav>
        
        <div className="space-y-4">
          <button className="font-sans text-base bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            Ver Todos os Cases
          </button>
          
          <button className="font-sans text-sm border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white">
            Saiba Mais
          </button>
        </div>
      </section>

      {/* ===== SEÇÃO 5: CÓDIGO E ELEMENTOS TÉCNICOS (Inter Mono) ===== */}
      <section className="mb-12">
        <h3 className="font-display text-xl mb-4">Exemplo de Código</h3>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="font-mono text-sm text-gray-800">
            {`const kaleidos = {
  brand: "Kaleidos Digital",
  archetype: "Mago & Criador",
  typography: {
    display: "Atelier",
    sans: "Inter", 
    accent: "Gridlite"
  }
};`}
          </code>
        </div>
      </section>

      {/* ===== SEÇÃO 6: HIERARQUIA COMPLETA ===== */}
      <section className="mb-12">
        <h1 className="font-display text-5xl tracking-tight text-black mb-6">
          Hierarquia Tipográfica Completa
        </h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-black mb-2">
              Título Secundário (Atelier)
            </h2>
            <p className="font-sans text-base text-gray-600">
              Texto de corpo usando Inter para máxima legibilidade.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-xl tracking-tight text-black mb-2">
              Subtítulo (Atelier)
            </h3>
            <p className="font-sans text-sm text-gray-500">
              Texto menor usando Inter para hierarquia clara.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#7CF067] to-[#D262B2] p-4 rounded-lg">
            <span className="font-accent text-lg text-white">
              Destaque especial usando Gridlite
            </span>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 7: MANIFESTO DA MARCA ===== */}
      <section className="bg-black text-white p-8 rounded-2xl">
        <h2 className="font-display text-3xl tracking-tight mb-6">
          Manifesto Kaleidos
        </h2>
        
        <div className="space-y-4">
          <p className="font-sans text-lg leading-relaxed">
            "Consumimos o mundo e devolvemos algo maior, conexões reais, 
            histórias magnéticas e experiências que mexem com todos os sentidos."
          </p>
          
          <p className="font-sans text-base leading-relaxed">
            Nosso compromisso não é apenas criar campanhas, mas despertar 
            emoções, provocar mudanças e expandir horizontes.
          </p>
          
          <p className="font-accent text-xl mt-6">
            "Porque enxergar o mundo de um único jeito é desperdício de imaginação."
          </p>
        </div>
      </section>

    </div>
  );
}

export default ExemploTipografia; 