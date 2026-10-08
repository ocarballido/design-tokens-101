import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.6. La usan el MDX (remark-gfm) y las herramientas.
// Contenedor con scroll horizontal propio, que se puede enfocar (1.4.10).
export function Table({ label, ...props }: ComponentPropsWithoutRef<'table'> & { label?: string }) {
  const t = useTranslations('Table');
  return (
    <div role="region" aria-label={label ?? t('label')} tabIndex={0} className="overflow-x-auto focus-ring">
      <table className="w-full border-collapse" {...props} />
    </div>
  );
}

const cell = 'border-b-(length:--t101-border-width-100) border-neutral-default px-300 py-200 text-start align-top text-neutral-default';

// Cabecera de columna; con scope="row", cabecera de fila (resumen de la normalización).
export function Th({ scope = 'col', className, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      scope={scope}
      className={cx(cell, scope === 'col' ? 'bg-neutral-subtle type-label-default' : 'type-body-small', className)}
      {...props}
    />
  );
}

export function Td({ className, ...props }: ComponentPropsWithoutRef<'td'>) {
  return <td className={cx(cell, 'type-body-small', className)} {...props} />;
}
