import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.5. Código en línea; dentro de <pre> lo sustituye CodeBlock.
// wrap-break-word: un nombre largo se parte si no cabe en la línea (1.4.10), sin cambiar
// el ancho mínimo de las celdas de tabla.
export function Code({ className, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className={cx('rounded-100 bg-neutral-strong px-050 type-code-default text-neutral-default wrap-break-word', className)}
      {...props}
    />
  );
}
