import { CircleAlert } from 'lucide-react';
import { useId, type MouseEvent, type Ref } from 'react';
import { TextLink } from '@/components/TextLink';

// Anatomía: docs/componentes-v1.md §5.7 (en Figma, entrega-diseno.md §3.11).
// Sustituye al botón desactivado (D14): aparece al pulsar una descarga que no puede hacerse,
// encima del botón (D52), y recibe el foco (tabindex="-1"), así que el lector lee el título y la
// lista; sin role="alert". Cada enlace lleva al campo y le da el foco (3.3.1): saltar a un ancla
// solo desplaza la página, no mueve el foco.
// Relleno space/400 y space/600 desde 64rem (size de Figma, solo de Figma).

type ErrorSummaryProps = {
  title: string;
  errors: { message: string; href: string }[];
  ref?: Ref<HTMLDivElement>;
};

function focusTarget(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ block: 'center' });
  target.focus({ preventScroll: true });
}

export function ErrorSummary({ title, errors, ref }: ErrorSummaryProps) {
  const titleId = useId();
  return (
    <div
      ref={ref}
      data-component="ErrorSummary"
      tabIndex={-1}
      aria-labelledby={titleId}
      className="flex gap-300 rounded-container border-(length:--t101-border-width-100) border-danger-default bg-danger-subtle p-400 focus-ring desktop:p-600"
    >
      <CircleAlert aria-hidden className="size-600 shrink-0 text-danger-default" />
      <div className="flex min-w-0 flex-col gap-200">
        <h2 id={titleId} className="type-body-strong text-danger-default">
          {title}
        </h2>
        <ul className="flex flex-col gap-100 type-body-default">
          {errors.map((error) => (
            <li key={error.href + error.message}>
              <TextLink href={error.href} onClick={(event) => focusTarget(event, error.href)}>
                {error.message}
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
