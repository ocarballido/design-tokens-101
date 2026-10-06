'use client';

// Script en línea que se ejecuta solo al cargar el documento (P17), como el `InlineScript` de
// Next.js: Preventing flash before hydration, "Extracting a reusable component"
// (https://nextjs.org/docs/app/guides/preventing-flash-before-hydration).
// - En el servidor sale como `text/javascript`: el navegador lo ejecuta al leer el HTML.
// - En el cliente se pinta como `text/plain`: React no avisa de un <script> que no se ejecutaría
//   (pasa al volver a montar el layout raíz, por ejemplo al cambiar de idioma).
// - `suppressHydrationWarning` acepta la diferencia de `type` al hidratar.
// Es Client Component porque lo usa el layout (Server Component): así `typeof window` se evalúa
// también en el navegador.

export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
