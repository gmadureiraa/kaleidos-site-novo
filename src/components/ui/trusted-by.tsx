"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";

const clients = [
  { name: "Crypto.com", logo: "/Clientes-logo/Crypto.com.png", url: "https://crypto.com" },
  { name: "Mercado Bitcoin", logo: "/Clientes-logo/MercadoBitcoin.png", url: "https://www.mercadobitcoin.com.br" },
  { name: "Ledger", logo: "/Clientes-logo/Ledger.png", url: "https://www.ledger.com" },
  { name: "Neobankless", logo: "/Clientes-logo/Neobankless.png", url: "https://neobankless.com" },
  { name: "Defiverso", logo: "/Clientes-logo/Defiverso.png", url: "https://defiverso.com" },
  { name: "Jornal Cripto", logo: "/Clientes-logo/JornalCripto.png", url: "https://jornalcripto.com" },
  { name: "Orlando On Crypto", logo: "/Clientes-logo/OrlandoOnCrypto.png", url: "https://orlandooncrypto.com" },
  { name: "Bit das Minas", logo: "/Clientes-logo/BitdasMinas.png", url: "https://instagram.com/bitdasminas" },
  { name: "Layla Foz", logo: "/Clientes-logo/LaylaFoz.png", url: "https://instagram.com/laylafoz" },
  { name: "Paradigma Education", logo: "/Clientes-logo/Paradigma.png", url: "https://paradigma.education" },
  { name: "Hugo Dória", logo: "/Clientes-logo/HugoDoria.png", url: "https://instagram.com/hugodoria" },
  { name: "Buenas Ideias", logo: "/Clientes-logo/BuenasIdeias.png", url: "https://instagram.com/buenasideias" },
];

function ClientLogo({ client, index }: { client: typeof clients[0]; index: number }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="marquee-item flex items-center justify-center h-16 px-4 min-w-[120px]">
        <span className="text-gray-400 text-xs whitespace-nowrap">{client.name}</span>
      </div>
    );
  }

  return (
    <Link 
      key={`${client.name}-${index}`} 
      href={client.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="marquee-item block min-w-[120px]"
    >
      <div className="relative h-16 w-[150px] flex items-center justify-center">
        <Image
          src={client.logo}
          alt={`Logo de ${client.name}, parceiro da Kaleidos Digital`}
          width={150}
          height={64}
          sizes="150px"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer max-h-16 w-auto h-auto"
          loading={index < 6 ? "eager" : "lazy"}
          onError={() => {
            setHasError(true);
          }}
        />
      </div>
    </Link>
  );
}

export function TrustedBy() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  return (
    <section className="w-full pt-0 sm:pt-2 pb-16 bg-black" aria-labelledby="trusted-by-heading">
      <div className="text-center mb-6 sm:mb-8">
        <h2 id="trusted-by-heading" className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          {isEn ? "Trusted by projects that move the market" : "Confiança de projetos que movem o mercado"}
        </h2>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {clients.map((client, idx) => (
                <ClientLogo key={`${client.name}-${idx}`} client={client} index={idx} />
              ))}
              {/* Duplicar para loop infinito */}
              {clients.map((client, idx) => (
                <ClientLogo key={`${client.name}-${idx}-2`} client={client} index={idx + clients.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}