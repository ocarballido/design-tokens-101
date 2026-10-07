import { getRequestConfig } from 'next-intl/server';

// P24, V45: la web es solo en español. Sin enrutado por idioma (sin [locale], proxy ni routing.ts):
// es la configuración básica de next-intl, con el idioma fijo
// (https://next-intl.dev/docs/getting-started/app-router). El enrutado por idioma sirve para dar
// "unique pathnames for every language" (https://next-intl.dev/docs/routing/setup); con uno solo,
// no hace falta. Si llega otro idioma, localePrefix 'as-needed' con 'es' por defecto mantiene
// estas URL sin prefijo (https://next-intl.dev/docs/routing/configuration).
export const LOCALE = 'es';

export default getRequestConfig(async () => ({
  locale: LOCALE,
  messages: (await import(`../../messages/${LOCALE}.json`)).default,
}));
