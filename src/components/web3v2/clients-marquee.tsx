"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Web3 V2 — banda de logos de clientes (rota `/2`).
 *
 * Replica EXATAMENTE o estilo da faixa da home (`components/ui/trusted-by.tsx`):
 * fundo preto, título centralizado, marquee horizontal infinito (classes
 * `.marquee-*` compartilhadas em globals.css), logos brancas com opacity-60 que
 * ganham 100% no hover. Usa o NOVO conjunto de logos em `public/v2/partners/`.
 */

// Logos novas (public/v2/partners/*.webp). `url` opcional — sem url o logo
// renderiza sem link (não inventar destino).
// Ordem: heavy-hitters primeiro (Crypto.com, Mercado Bitcoin, Ledger, Paradigma)
// e influencers INTERCALADOS com as marcas (sem agrupar todos no fim).
const clients: { name: string; logo: string; url?: string }[] = [
  { name: "Crypto.com", logo: "/v2/partners/crypto-com.webp", url: "https://crypto.com" },
  { name: "Mercado Bitcoin", logo: "/v2/partners/mercado-bitcoin.webp", url: "https://www.mercadobitcoin.com.br" },
  { name: "Ledger", logo: "/v2/partners/ledger.webp", url: "https://www.ledger.com" },
  { name: "Paradigma", logo: "/v2/partners/paradigma.webp" },
  { name: "Investidor 4.20", logo: "/v2/partners/investidor-420.webp", url: "https://www.youtube.com/@investidor4.20" },
  { name: "Parfin", logo: "/v2/partners/parfin.webp", url: "https://parfin.io" },
  { name: "Bit das Minas", logo: "/v2/partners/bit-das-minas.webp", url: "https://www.instagram.com/bitdasminas" },
  { name: "Defiverso", logo: "/v2/partners/defiverso.webp", url: "https://defiverso.com" },
  { name: "Layla Foz", logo: "/v2/partners/layla-foz.webp", url: "https://www.instagram.com/laylafoz" },
  { name: "Neobankless", logo: "/v2/partners/neobankless.webp", url: "https://neobankless.com" },
  { name: "Orlando On Crypto", logo: "/v2/partners/orlando-on-crypto.webp", url: "https://www.instagram.com/orlandooncrypto" },
  { name: "Jornal Cripto", logo: "/v2/partners/jornal-cripto.webp", url: "https://jornalcripto.com" },
  { name: "DSEC Labs", logo: "/v2/partners/dsec-labs.webp" },
  { name: "Casta Crypto", logo: "/v2/partners/casta-crypto.webp", url: "https://www.instagram.com/castacrypto" },
  { name: "Tokeniza", logo: "/v2/partners/tokeniza.webp" },
  { name: "Alfred Space", logo: "/v2/partners/alfred-space.webp" },
  { name: "DominiPay", logo: "/v2/partners/dominipay.webp" },
  { name: "Kast", logo: "/v2/partners/kast.webp", url: "https://www.kast.xyz" },
  { name: "Financial Move", logo: "/v2/partners/financial-move.webp" },
  { name: "Vault", logo: "/v2/partners/vault.webp" },
  { name: "Blue", logo: "/v2/partners/blue.webp" },
  // Marcas-âncora repetidas no FIM do ciclo (e início do próximo) pra reforçar
  // os heavy-hitters num desfile contínuo (looping infinito sem ponto morto).
  { name: "Ledger", logo: "/v2/partners/ledger.webp", url: "https://www.ledger.com" },
  { name: "Investidor 4.20", logo: "/v2/partners/investidor-420.webp", url: "https://www.youtube.com/@investidor4.20" },
  { name: "Mercado Bitcoin", logo: "/v2/partners/mercado-bitcoin.webp", url: "https://www.mercadobitcoin.com.br" },
  { name: "Crypto.com", logo: "/v2/partners/crypto-com.webp", url: "https://crypto.com" },
];

function ClientLogo({
  client,
  index,
  isClone = false,
}: {
  client: (typeof clients)[0];
  index: number;
  isClone?: boolean;
}) {
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
        onError={() => setHasError(true)}
      />
    </div>
  );

  if (!client.url) {
    return <div className="marquee-item block min-w-[120px]">{logoImg}</div>;
  }

  return (
    <Link
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="marquee-item block min-w-[120px] cursor-pointer"
      tabIndex={isClone ? -1 : undefined}
      onClick={() =>
        // posthog é módulo npm (não se pendura no window) — usar o helper
        // `track` de @/lib/analytics em vez de window.posthog (que era undefined
        // e fazia o evento nunca disparar).
        track("client_logo_click", { client: client.name, href: client.url })
      }
    >
      {logoImg}
    </Link>
  );
}

export function Web3V2ClientsMarquee() {
  return (
    <section className="w-full pt-0 pb-6 bg-black" aria-label="Empresas que confiam na Kaleidos">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {clients.map((client, idx) => (
                <ClientLogo key={`${client.name}-${idx}`} client={client} index={idx} />
              ))}
              {/* Cópia duplicada só pro loop seamless — escondida de leitores de tela */}
              <div className="flex shrink-0" aria-hidden="true">
                {clients.map((client, idx) => (
                  <ClientLogo
                    key={`${client.name}-${idx}-2`}
                    client={client}
                    index={idx + clients.length}
                    isClone
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
