'use client';

import { useId, useState, type ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

// Provisional, sin estilo (paso 4). Anatomía: docs/componentes-v1.md §4.2.
// Recibe las secciones ya leídas de content/ (src/lib/content.ts) desde el layout.

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
    <nav aria-label={label} data-component="Sidebar">
      {sections.map((section) => (
        <SidebarSection key={section.slug} title={section.title} defaultOpen>
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

  return (
    <div data-component="SidebarSection">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
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
      <Link href={href} aria-current={current ? 'page' : undefined}>
        {title}
      </Link>
    </li>
  );
}
