'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §4.2. Recibe las secciones ya leídas de content/
// (src/lib/content.ts) desde el layout. Se usa en el escritorio y en el panel móvil (D21).
// Anillo de foco por dentro (focus-ring-inset): el sidebar tiene scroll propio y lo recortaría.

type SectionData = {
  slug: string;
  title: string;
  /** C19: número del módulo (prefijo de la carpeta); null en las secciones de referencia. */
  number: number | null;
  /** C17: grupo del sidebar (separador de content/{locale}/meta.json); null, sin grupo. */
  group: string | null;
  lessons: { title: string; href: string }[];
};

export type SidebarData = {
  label: string;
  sections: SectionData[];
};

export function Sidebar({ label, sections }: SidebarData) {
  const pathname = usePathname();

  // Secciones seguidas con el mismo grupo van juntas, en el orden de meta.json.
  const blocks: { group: string | null; sections: SectionData[] }[] = [];
  for (const section of sections) {
    const last = blocks.at(-1);
    if (last && last.group === section.group) last.sections.push(section);
    else blocks.push({ group: section.group, sections: [section] });
  }

  const renderSection = (section: SectionData) => {
    // V30: la sección que contiene la lección actual. C11: al cargar cada página, solo
    // está abierta esa sección. La key con la ruta vuelve a aplicar defaultOpen al navegar.
    const current = section.lessons.some((lesson) => lesson.href === pathname);
    return (
      <SidebarSection key={`${section.slug}:${pathname}`} title={section.title} number={section.number} current={current} defaultOpen={current}>
        {section.lessons.map((lesson) => (
          <SidebarItem key={lesson.href} title={lesson.title} href={lesson.href} current={pathname === lesson.href} />
        ))}
      </SidebarSection>
    );
  };

  return (
    <nav aria-label={label} data-component="Sidebar" className="flex flex-col">
      {blocks.map((block, index) =>
        block.group === null ? (
          block.sections.map(renderSection)
        ) : (
          <SidebarGroup key={`${block.group}:${index}`} label={block.group}>
            {block.sections.map(renderSection)}
          </SidebarGroup>
        ),
      )}
    </nav>
  );
}

// Grupos del Sidebar (§4.2, C17): texto entre secciones, no un control ni un encabezado (no entra
// en el índice de títulos). role="group" con aria-labelledby: el lector anuncia el grupo al entrar.
// Separador superior decorativo.
function SidebarGroup({ label, children }: { label: string; children: ReactNode }) {
  const labelId = useId();
  return (
    <div
      role="group"
      aria-labelledby={labelId}
      data-component="SidebarGroup"
      className="mt-600 flex flex-col gap-200 border-t-(length:--t101-border-width-100) border-neutral-default pt-200"
    >
      <p id={labelId} className="px-300 type-caption-default text-neutral-subtle">
        {label}
      </p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function SidebarSection({
  title,
  number,
  current = false,
  defaultOpen = false,
  children,
}: {
  title: string;
  /** C19: número del módulo; null en las secciones de referencia. */
  number: number | null;
  /** V30: contiene la lección actual. Título y chevron en el acento; sin ARIA propio (lo anuncia el SidebarItem). */
  current?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const listId = useId();
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div data-component="SidebarSection">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cx(
          'group flex w-full cursor-pointer items-center gap-200 px-300 py-200 text-start type-label-default hover:bg-neutral-hover focus-ring-inset',
          current ? 'text-accent-default hover:text-accent-hover' : 'text-neutral-default',
        )}
      >
        {/* C19, V40: el número del módulo forma parte del nombre accesible ("1 Fundamentos", 2.5.3);
            el espacio oculto lo separa del título también en el árbol de accesibilidad. Mismo
            estilo y color que el título (los hereda). Cifras tabulares: con números de una cifra
            los títulos quedan alineados sin ancho fijo (V40). */}
        <span className="flex flex-1 gap-200">
          {number !== null && (
            <>
              <span data-section-number className="shrink-0 tabular-nums">
                {number}
              </span>
              <span className="sr-only"> </span>
            </>
          )}
          <span className="flex-1">{title}</span>
        </span>
        <Chevron
          aria-hidden
          className={cx(
            'size-600 shrink-0',
            current ? 'text-accent-default group-hover:text-accent-hover' : 'text-neutral-subtle group-hover:text-neutral-default',
          )}
        />
      </button>
      {/* V24: se despliega animando la altura (filas de rejilla de 0fr a 1fr). Cerrada, la lista
          queda invisible: visibility la saca del orden de tabulación y del árbol de accesibilidad
          al terminar la animación. Sin animación con prefers-reduced-motion. */}
      <div
        className={cx(
          'grid motion-safe:transition-[grid-template-rows,visibility] motion-safe:duration-(--t101-duration-200) motion-safe:ease-standard',
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
        )}
      >
        <ul id={listId} className="min-h-0 overflow-hidden">
          {children}
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ title, href, current }: { title: string; href: string; current: boolean }) {
  return (
    <li data-component="SidebarItem">
      <Link
        href={href}
        aria-current={current ? 'page' : undefined}
        className={cx(
          'block px-300 py-200 type-label-default focus-ring-inset', // Sin radio (V23).
          // Actual: fondo y texto de acento y marca lateral, no solo color (1.4.1).
          current
            ? 'border-s-(length:--t101-border-width-200) border-accent-strong bg-accent-subtle text-accent-default'
            : 'text-neutral-subtle hover:bg-neutral-hover hover:text-neutral-default',
        )}
      >
        {title}
      </Link>
    </li>
  );
}
