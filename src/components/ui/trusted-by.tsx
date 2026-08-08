"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";

// Apenas logos que existem em public/Clientes-logo/. url opcional —
// quando ausente, o logo renderiza sem link (não inventar redes sociais).
const clients: { name: string; logo: string; url?: string }[] = [
  { name: "Crypto.com", logo: "/Clientes-logo/Crypto.com.png", url: "https://crypto.com" },
  { name: "Mercado Bitcoin", logo: "/Clientes-logo/MercadoBitcoin.png", url: "https://www.mercadobitcoin.com.br" },
  { name: "Ledger", logo: "/Clientes-logo/Ledger.png", url: "https://www.ledger.com" },
  { name: "Neobankless", logo: "/Clientes-logo/Neobankless.png", url: "https://neobankless.com" },
  { name: "Defiverso", logo: "/Clientes-logo/Defiverso.png", url: "https://defiverso.com" },
  { name: "Jornal Cripto", logo: "/Clientes-logo/JornalCripto.png", url: "https://jornalcripto.com" },
  { name: "Orlando On Crypto", logo: "/Clientes-logo/OrlandoOnCrypto.png", url: "https://orlandooncrypto.com" },
  { name: "Bit das Minas", logo: "/Clientes-logo/BitdasMinas.png", url: "https://www.instagram.com/bitdasminas" },
  { name: "Laylä Föz", logo: "/Clientes-logo/LaylaFoz.png", url: "https://www.instagram.com/laylafoz" },
  { name: "Investidor 4.20", logo: "/Clientes-logo/investidor420.png", url: "https://www.youtube.com/@investidor4.20" },
  { name: "Parfin", logo: "/Clientes-logo/Parfin.png", url: "https://parfin.io" },
  { name: "Kast", logo: "/Clientes-logo/Kast.png" },
  { name: "CastaCrypto", logo: "/Clientes-logo/CastaCrypto.png" },
  { name: "Vault", logo: "/Clientes-logo/Vault.png" },
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

  const logoImg = (
    <div className="relative h-16 w-[150px] flex items-center justify-center">
      <Image
        src={client.logo}
        alt={`Logo de ${client.name}, parceiro da Kaleidos Digital`}
        width={150}
        height={64}
        sizes="150px"
        className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 max-h-16 w-auto h-auto"
        loading={index < 6 ? "eager" : "lazy"}
        onError={() => {
          setHasError(true);
        }}
      />
    </div>
  );

  // Sem url conhecida → renderiza o logo sem link (não inventar destino)
  if (!client.url) {
    return (
      <div className="marquee-item block min-w-[120px]">
        {logoImg}
      </div>
    );
  }

  return (
    <Link
      key={`${client.name}-${index}`}
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="marquee-item block min-w-[120px] cursor-pointer"
    >
      {logoImg}
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