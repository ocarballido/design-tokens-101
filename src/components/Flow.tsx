import { ArrowDown, ArrowRight } from 'lucide-react';
import { Children, isValidElement, useId, type ReactNode } from 'react';
import Link from 'next/link';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.7 (C13). Diseño y medidas: docs/entrega-diseno.md §3.3 (D24).
// figure + figcaption; los elementos de primer nivel y los pasos de un grupo son listas <ol>.
// El orden lo da el HTML: al bajar de línea, el orden visual sigue siendo el del código.
// Flow y FlowGroup ponen los <li>; FlowStep solo dibuja la caja.

// Solo los elementos: se descarta el texto en blanco que pueda quedar entre las etiquetas del MDX.
function items(children: ReactNode) {
  return Children.toArray(children).filter(isValidElement);
}

export function Flow({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure data-component="Flow" className="flex flex-col gap-300">
      <ol className="flex flex-col gap-200">
        {items(children).map((child, index) => (
          <li key={child.key ?? index} className="flex flex-col items-center gap-200">
            {/* FlowConnector: decorativo y dentro del <li>, para no contar un elemento de más. */}
            {index > 0 ? <FlowConnector /> : null}
            {child}
          </li>
        ))}
      </ol>
      <figcaption className="type-caption-default text-neutral-subtle">{caption}</figcaption>
    </figure>
  );
}

function FlowConnector() {
  return <ArrowDown aria-hidden className="size-600 shrink-0 text-neutral-subtle" />;
}

// El size de Figma (D24) no es un prop: los pasos se apilan a todo el ancho y, desde
// breakpoint/desktop (D11), van en fila y bajan de línea si no caben.
export function FlowGroup({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  const titleId = useId();

  return (
    <div
      data-component="FlowGroup"
      className="flex w-full flex-col gap-300 rounded-container border-(length:--t101-border-width-100) border-neutral-default p-400"
    >
      <div className="flex flex-col gap-050">
        <p id={titleId} className="type-body-strong text-neutral-default">
          {title}
        </p>
        {meta ? <p className="type-caption-default text-neutral-subtle">{meta}</p> : null}
      </div>
      <ol aria-labelledby={titleId} className="flex flex-col gap-200 desktop:flex-row desktop:flex-wrap">
        {items(children).map((child, index) => (
          <li key={child.key ?? index} className="grid">
            {child}
          </li>
        ))}
      </ol>
    </div>
  );
}

type FlowStepProps = {
  title: string;
  meta?: string;
  // Ruta interna sin idioma (/fundamentals/what-is-a-token); el Link de next-intl añade el idioma.
  href?: string;
  status?: 'default' | 'pending';
};

// Un paso pending no tiene enlace (§3.7): lo pendiente no tiene página todavía.
// La meta del MDX dice que está pendiente ("En estudio"), no solo el color (1.4.1).
export function FlowStep({ title, meta, href, status = 'default' }: FlowStepProps) {
  const pending = status === 'pending';
  const box = cx(
    'flex min-w-0 max-w-full items-center gap-300 rounded-control border-(length:--t101-border-width-100) px-400 py-300',
    pending ? 'bg-neutral-subtle border-neutral-default' : 'bg-accent-subtle border-accent-default',
  );
  const text = (
    <span className="flex min-w-0 flex-col gap-050 break-words">
      <span className={cx('type-label-default', pending ? 'text-neutral-subtle' : 'text-neutral-default', href && !pending && 'group-hover:text-accent-hover')}>
        {title}
      </span>
      {/* La coma oculta separa título y meta en el nombre accesible del enlace. */}
      {meta ? (
        <span className="type-caption-default text-neutral-subtle">
          <span className="sr-only">, </span>
          {meta}
        </span>
      ) : null}
    </span>
  );

  if (!href || pending) {
    return (
      <div data-component="FlowStep" data-status={status} className={box}>
        {text}
      </div>
    );
  }

  // Un único enlace que ocupa toda la caja. En focus el borde se queda y el anillo va por fuera
  // (focus-ring), sin cambiar el tamaño (entrega-diseno.md §3.3).
  return (
    <Link href={href} data-component="FlowStep" className={cx(box, 'group hover:border-accent-strong focus-ring')}>
      {text}
      <ArrowRight aria-hidden className="size-400 shrink-0 text-accent-default group-hover:text-accent-hover" />
    </Link>
  );
}
