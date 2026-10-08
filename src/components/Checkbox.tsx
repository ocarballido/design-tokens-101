import { Check } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §5.4 (en Figma, entrega-diseno.md §3.11).
// - input type="checkbox" con appearance: none: sigue siendo la casilla del navegador para el
//   teclado y el lector de pantalla. La etiqueta envuelve la caja: pulsar el texto también marca, y
//   la fila mide al menos 24 px de alto (2.5.8).
// - Marcada lleva li:check, no solo otro color (1.4.1). El borde de la marcada es border/accent/strong
//   (3,33 / 10,92), no el relleno: emerald/500 sobre blanco da 2,05:1 (1.4.11).
// - hideLabel: la etiqueta es solo accesible (columna Exportar de las escalas, D46; showLabel en Figma).

type CheckboxProps = {
  label: string;
  hideLabel?: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export function Checkbox({ label, hideLabel = false, className, ...props }: CheckboxProps) {
  return (
    <label data-component="Checkbox" className={cx('group inline-flex min-h-600 cursor-pointer items-center gap-200', className)}>
      <span className="grid shrink-0">
        <input
          type="checkbox"
          className={cx(
            'peer col-start-1 row-start-1 size-400 cursor-pointer appearance-none rounded-100 border-(length:--t101-border-width-100) focus-ring',
            'border-neutral-strong bg-neutral-default group-hover:bg-neutral-hover',
            'checked:border-accent-strong checked:bg-accent-strong-default group-hover:checked:bg-accent-strong-hover',
          )}
          {...props}
        />
        <Check
          aria-hidden
          className="pointer-events-none invisible col-start-1 row-start-1 size-300 place-self-center text-on-accent peer-checked:visible"
        />
      </span>
      <span className={hideLabel ? 'sr-only' : 'type-body-default text-neutral-default'}>{label}</span>
    </label>
  );
}
