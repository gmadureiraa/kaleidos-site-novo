/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Atelier', 'serif'], // Fonte Principal para Títulos
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Fonte Secundária para Textos
        'accent': ['Gridlite', 'sans-serif'], // Fonte de Destaque/Acent
        'mono': ['Inter', 'monospace'], // Fonte Monospace
      },
    },
  },
  plugins: [],
} 