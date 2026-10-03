import { Inter, JetBrains_Mono } from 'next/font/google';

// Familias de S12 (licencia OFL-1.1), servidas desde la propia web por next/font
// (https://nextjs.org/docs/app/getting-started/fonts). next/font les da un nombre propio y lo
// publica en una variable CSS; la capa de Tailwind la pone por delante del token (V13).
// Son fuentes variables: incluyen los pesos 400–700 de font-weight/* (D04).

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains-mono',
});
