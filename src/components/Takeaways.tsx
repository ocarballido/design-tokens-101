import { Check, GraduationCap } from 'lucide-react';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Heading2, UnorderedList } from '@/components/Prose';

// Anatomía: docs/componentes-v1.md §3.9 (C18). "Lo que te llevas" (T10), al final de cada lección.
// No es un Callout: el título es el ## del MDX, con el id de rehype-slug, para que llegue el
// enlace de "En esta página". El componente le añade el icono y le da nombre a la región.
// Icono y marcas decorativos (aria-hidden): la lista sigue siendo una ul con sus elementos.

type ElementWithChildren = ReactElement<{ id?: string; children?: ReactNode }>;

export function Takeaways({ children }: { children: ReactNode }) {
  let titleId: string | undefined;

  const content = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const element = child as ElementWithChildren;

    if (element.type === Heading2) {
      titleId = element.props.id;
      // §3.9: el título en text/neutral/default (los demás h2 van en text/neutral/subtle, §4.10).
      return cloneElement(element, {
        className: 'type-heading-2 flex items-center gap-200 text-neutral-default',
        children: (
          <>
            <GraduationCap aria-hidden className="size-600 shrink-0 text-accent-default" />
            <span>{element.props.children}</span>
          </>
        ),
      } as object);
    }

    if (element.type === UnorderedList) {
      // La marca de verificación sustituye a la viñeta (list-none). role="list": Safari quita la
      // semántica de lista a una ul sin viñetas, y el lector tiene que anunciar sus elementos.
      return cloneElement(element, {
        role: 'list',
        className: 'flex list-none flex-col gap-200',
        children: Children.map(element.props.children, (item) =>
          isValidElement(item) && item.type === 'li' ? (
            cloneElement(item as ElementWithChildren, {
              className: 'flex gap-200',
              children: (
                <>
                  {/* Alto de una línea de body/default, para alinear la marca con la primera línea. */}
                  <span className="flex h-[1lh] shrink-0 items-center">
                    <Check aria-hidden className="size-400 text-accent-default" />
                  </span>
                  <span className="min-w-0">{(item as ElementWithChildren).props.children}</span>
                </>
              ),
            } as object)
          ) : (
            item
          ),
        ),
      } as object);
    }

    return child;
  });

  if (!titleId) throw new Error('Takeaways: falta el título ## con id (rehype-slug) dentro del componente');

  return (
    <section
      data-component="Takeaways"
      aria-labelledby={titleId}
      className="flow rounded-container border-(length:--t101-border-width-100) border-s-(length:--t101-border-width-200) border-neutral-default border-s-accent-strong bg-neutral-subtle p-400 type-body-default text-neutral-default desktop:p-600"
    >
      {content}
    </section>
  );
}
