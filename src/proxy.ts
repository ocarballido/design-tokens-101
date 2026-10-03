import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Todas las rutas salvo /api, /trpc, /_next, /_vercel y los archivos con punto.
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
