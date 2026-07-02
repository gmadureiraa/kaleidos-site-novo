/**
 * Ícone oficial do Calendly (logo "C" azul). Asset em /public/v2/calendly-icon.webp.
 * Mantém a mesma assinatura (`className`) dos usos antigos do SVG simplificado,
 * então todos os botões de "agendar/consultoria" passam a usar o logo real.
 */
export function CalendlyIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/v2/calendly-icon.webp"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
