import { ChevronDown } from 'lucide-react';
import { useId, type ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/cx';
import { FieldError, fieldControl, fieldHint, fieldLabel } from '@/components/TextField';

// Anatomía: docs/componentes-v1.md §5.3 (en Figma, entrega-diseno.md §3.11).
// select nativo: el teclado y la lista abierta los da el navegador. El chevron es decorativo y no
// recibe el puntero: va encima del select, en la misma celda de una rejilla.
// Con `placeholder`, la primera opción tiene valor vacío y no hay opción elegida por defecto
// (decisiones de tipo, investigacion-herramientas.md §6.4).

type SelectProps = {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<'select'>, 'children'>;

export function Select({ label, hint, error, options, placeholder, id, className, ...props }: SelectProps) {
  const auto = useId();
  const selectId = id ?? auto;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;
  const describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div data-component="Select" className={cx('flex flex-col gap-100', className)}>
      <label htmlFor={selectId} className={fieldLabel}>
        {label}
      </label>
      {hint ? (
        <p id={hintId} className={fieldHint}>
          {hint}
        </p>
      ) : null}
      <div className="group grid">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(
            fieldControl,
            'col-start-1 row-start-1 cursor-pointer appearance-none ps-300 pe-800 type-body-default hover:bg-neutral-hover',
          )}
          {...props}
        >
          {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none col-start-1 row-start-1 me-300 size-400 self-center justify-self-end text-neutral-subtle group-hover:text-neutral-default"
        />
      </div>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}
