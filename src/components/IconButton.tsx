import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §2.1. 40 × 40 px (padding space/200 + icono de 24 px), sin fondo
// en reposo. `label` es el nombre accesible: obligatorio, porque el botón solo tiene un icono.

type IconButtonProps = {
  icon: LucideIcon;
  label: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'aria-label'>;

export function IconButton({ icon: Icon, label, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-control p-200 text-neutral-subtle focus-ring',
        // D12: en hover y active, fondo de estado y texto principal.
        'hover:bg-neutral-hover hover:text-neutral-default active:bg-neutral-active active:text-neutral-default',
        className,
      )}
      {...props}
    >
      <Icon aria-hidden className="size-600" />
    </button>
  );
}
