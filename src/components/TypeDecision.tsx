import { ChevronDown, ChevronUp } from 'lucide-react';
import { Code } from '@/components/Code';
import { Select } from '@/components/Select';

// Anatomía: docs/componentes-v1.md §5.6 (en Figma, entrega-diseno.md §3.11).
// Una combinación de $type y scopes sin tipo DTCG claro (investigacion-herramientas.md §6.3 y §6.4).
// - fieldset con legend: el lector anuncia la combinación al llegar al select.
// - details y summary nativos (patrón Disclosure sin ARIA propio); el summary mide 28 px de alto.
// - Sin opción elegida por defecto: la primera es el placeholder, con valor vacío.

type TypeDecisionProps = {
  id: string;
  legend: string;
  examplesLabel: string;
  /** Todos los nombres; los tres primeros son los ejemplos. */
  tokens: string[];
  summary: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function TypeDecision({
  id,
  legend,
  examplesLabel,
  tokens,
  summary,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}: TypeDecisionProps) {
  return (
    <fieldset
      data-component="TypeDecision"
      className="flex min-w-0 flex-col gap-300 rounded-container border-(length:--t101-border-width-100) border-neutral-default p-400"
    >
      <legend className="float-left type-label-default text-neutral-default">{legend}</legend>
      <p className="type-body-small text-neutral-subtle">
        {examplesLabel}{' '}
        {tokens.slice(0, 3).map((name, i) => (
          <span key={name}>
            {i ? ' ' : null}
            <Code>{name}</Code>
          </span>
        ))}
      </p>
      <details className="group">
        <summary className="group/summary inline-flex cursor-pointer list-none items-center gap-100 rounded-control px-200 py-100 type-label-default text-neutral-default hover:bg-neutral-hover focus-ring [&::-webkit-details-marker]:hidden">
          <ChevronDown aria-hidden className="size-400 shrink-0 text-neutral-subtle group-open:hidden group-hover/summary:text-neutral-default" />
          <ChevronUp aria-hidden className="hidden size-400 shrink-0 text-neutral-subtle group-open:block group-hover/summary:text-neutral-default" />
          {summary}
        </summary>
        <ul className="flex flex-col gap-100 ps-600 pt-200">
          {tokens.map((name) => (
            <li key={name}>
              <Code>{name}</Code>
            </li>
          ))}
        </ul>
      </details>
      <Select
        id={id}
        label={label}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
      />
    </fieldset>
  );
}
