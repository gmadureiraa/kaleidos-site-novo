import type { SVGProps } from "react";

/**
 * Ícone simplificado do Calendly (símbolo "C" recortado).
 * SVG próprio (não usa o asset oficial). Herda currentColor.
 */
export function CalendlyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M12 2.75c-5.108 0-9.25 4.142-9.25 9.25S6.892 21.25 12 21.25c2.71 0 5.149-1.166 6.842-3.022a1.25 1.25 0 0 0-1.85-1.682A6.74 6.74 0 0 1 12 18.75 6.75 6.75 0 1 1 16.99 7.452a1.25 1.25 0 0 0 1.85-1.68A9.23 9.23 0 0 0 12 2.75Z"
        fill="currentColor"
      />
      <circle cx="18.6" cy="6.1" r="1.6" fill="currentColor" />
      <circle cx="18.6" cy="17.9" r="1.6" fill="currentColor" />
    </svg>
  );
}
