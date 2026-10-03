'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §4.2. Recibe las secciones ya leídas de content/
// (src/lib/content.ts) desde el layout. Se usa en el escritorio y en el panel móvil (D21).
// Anillo de foco por dentro (focus-ring-inset): el sidebar tiene scroll propio y lo recortaría.

export type SidebarData = {
  label: string;
  sections: {
    slug: string;
    title: string;
    lessons: { title: string; href: string }[];
  }[];
};

export function Sidebar({ label, sections }: SidebarData) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} data-component="Sidebar" className="flex flex-col">
      {sections.map((section) => (
        // C11: al cargar cada página, solo está abierta la sección de la lección actual.
        // La key con la ruta vuelve a aplicar defaultOpen al navegar a otra lección.
        <SidebarSection
          key={`${section.slug}:${pathname}`}
          title={section.title}
          defaultOpen={section.lessons.some((lesson) => lesson.href === pathname)}
        >
          {section.lessons.map((lesson) => (
            <SidebarItem
              key={lesson.href}
              title={lesson.title}
              href={lesson.href}
              current={pathname === lesson.href}
            />
          ))}
        </SidebarSection>
      ))}
    </nav>
  );
}

function SidebarSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
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
        className="group flex w-full cursor-pointer items-center gap-200 rounded-control px-300 py-200 text-start type-label-default text-neutral-default hover:bg-neutral-hover focus-ring-inset"
      >
        <span className="flex-1">{title}</span>
        <Chevron aria-hidden className="size-600 shrink-0 text-neutral-subtle group-hover:text-neutral-default" />
      </button>
      <ul id={listId} hidden={!open}>
        {children}
      </ul>
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
          'block rounded-control px-300 py-200 type-label-default focus-ring-inset',
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
