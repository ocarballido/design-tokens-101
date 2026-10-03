import { ExternalLink } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// `Link` de la anatomía (docs/componentes-v1.md §2.3). Se llama TextLink para no confundirlo con
// el Link de next-intl, que usa por dentro para los enlaces internos (añade el idioma).
// - El subrayado es obligatorio (1.4.1): en Dark el color del enlace solo da 1,73:1 frente al texto.
// - Hereda el estilo de texto del bloque en el que está.
// - `external` no es un prop: se deduce de href. Icono li:external-link, decorativo.

const CLASSES =
  'text-accent-default underline hover:text-accent-hover focus-ring';

export function TextLink({ href = '', className, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cx(CLASSES, className)} {...props}>
        {children}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={cx(CLASSES, className)} {...props}>
      {children}
      {external ? <ExternalLink aria-hidden className="ms-100 inline size-400 align-middle" /> : null}
    </a>
  );
}
