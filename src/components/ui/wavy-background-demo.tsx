"use client";
import React from "react";
// import { WavyBackground } from "@/components/ui/wavy-background";
import Image from "next/image";

export function WavyBackgroundDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 min-h-[69vh] h-[69vh] bg-gradient-to-br from-green-400 to-pink-500">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        {/* Logo do Kaleidos */}
        <div className="mb-8">
          <Image
            src="/logo/Logos-06.svg"
            alt="Kaleidos Logo"
            width={200}
            height={50}
            className="w-auto h-12 md:h-14 lg:h-16"
            priority
          />
        </div>
        
        <h1
          className="text-[1.5rem] leading-tight sm:text-2xl md:text-3xl lg:text-4xl text-white font-extrabold text-center font-display tracking-tight mb-8 max-w-3xl"
        >
          O futuro do seu conteúdo começa aqui!
        </h1>
        
        <div className="mt-6">
          <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-base">
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
} 