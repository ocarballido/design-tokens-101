import { CircleAlert } from 'lucide-react';
import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §5.2 (en Figma, entrega-diseno.md §3.11).
// - Etiqueta siempre visible (3.3.2); aria-describedby a la ayuda y al error; con error,
//   aria-invalid (3.3.1).
// - Con error el borde no cambia (D47): lo dicen el texto y el icono en text/danger/default.
// - Borde border/neutral/strong: 4,70 / 4,20 frente a la página (1.4.11). Sin hover.
// - Con `subgrid`, las partes ocupan las filas de la rejilla del padre (etiqueta, ayuda, campo y lo
//   de debajo): dos campos en una fila quedan alineados aunque sus ayudas tengan largos distintos
//   (V55). Si el padre no es una rejilla, se ve como sin `subgrid`.
// - `children` va debajo del campo, después del error, en la misma fila (el hex resultante de
//   Escalas): así no baja cuando el campo de al lado muestra su error.

// Error de un campo: icono decorativo y texto (lo comparten TextField, Select y FileItem).
export function FieldError({ id, children }: { id?: string; children: string }) {
  return (
    <p id={id} className="flex items-start gap-100 type-body-small text-danger-default">
      {/* El icono mide una línea de texto de alto para quedar alineado con la primera. */}
      <CircleAlert aria-hidden className="my-050 size-400 shrink-0" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}

export const fieldLabel = 'type-label-default text-neutral-default';
export const fieldHint = 'type-caption-default text-neutral-subtle';
export const fieldControl =
  'w-full rounded-control border-(length:--t101-border-width-100) border-neutral-strong bg-neutral-default py-200 text-neutral-default focus-ring';

type TextFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  /** El valor se escribe en code/default (el hex del color). */
  code?: boolean;
  inputMode?: 'text' | 'decimal';
  /** Toma las filas de la rejilla del padre (V55). */
  subgrid?: boolean;
  /** Contenido debajo del campo, después del error (V55). */
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'inputMode' | 'children'>;

export function TextField({ label, hint, error, code = false, inputMode = 'text', subgrid = false, children, id, className, ...props }: TextFieldProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div
      data-component="TextField"
      className={cx(subgrid ? 'row-span-4 grid grid-rows-subgrid gap-100' : 'flex flex-col gap-100', className)}
    >
      <label htmlFor={inputId} className={cx(fieldLabel, subgrid && 'row-start-1')}>
        {label}
      </label>
      {hint ? (
        <p id={hintId} className={cx(fieldHint, subgrid && 'row-start-2')}>
          {hint}
        </p>
      ) : null}
      <input
        id={inputId}
        type="text"
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(fieldControl, 'px-300', code ? 'type-code-default' : 'type-body-default', subgrid && 'row-start-3')}
        {...props}
      />
      {error || children ? (
        <div className={cx('flex flex-col gap-200', subgrid && 'row-start-4')}>
          {error ? <FieldError id={errorId}>{error}</FieldError> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}
