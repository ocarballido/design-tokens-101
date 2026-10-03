import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Inglés por defecto (C5). El prefijo de idioma va siempre en la URL (V03).
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
