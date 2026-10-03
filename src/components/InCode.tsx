'use client';

import { ChevronDown, ChevronUp, Code } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useId, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.3. Cerrado por defecto.
// Patrón Disclosure: la cabecera entera es un button con aria-expanded
// (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). `open` solo cambia el chevron.
// El anillo de foco va por dentro de la cabecera, como en Figma: por fuera lo recortaría el bloque.

type InCodeProps = {
  title?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function InCode({ title, defaultOpen = false, children }: InCodeProps) {
  const t = useTranslations('InCode');
  const locale = useLocale();
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div
      data-component="InCode"
      className="overflow-hidden rounded-container border-(length:--t101-border-width-100) border-neutral-default bg-neutral-subtle"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        className={cx(
          'group flex w-full cursor-pointer flex-col gap-100 p-400 text-start hover:bg-neutral-hover focus-ring-inset',
          open ? 'rounded-t-container' : 'rounded-container',
        )}
      >
        <span className="flex w-full items-center gap-200">
          <Code aria-hidden className="size-400 shrink-0 text-accent-default" />
          <span lang={locale} className="flex-1 type-caption-default text-accent-default uppercase">
            {t('label')}
          </span>
          <Chevron aria-hidden className="size-600 shrink-0 text-neutral-subtle group-hover:text-neutral-default" />
        </span>
        {title ? <span className="type-label-default text-neutral-default">{title}</span> : null}
      </button>
      <div
        id={contentId}
        hidden={!open}
        className="flow border-t-(length:--t101-border-width-100) border-neutral-default p-400 text-neutral-default"
      >
        {children}
      </div>
    </div>
  );
}
