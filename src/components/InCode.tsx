'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useId, useState, type ReactNode } from 'react';

// Provisional, sin estilo (paso 4). Anatomía: docs/componentes-v1.md §3.3.
// Patrón Disclosure: la cabecera es un button con aria-expanded
// (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

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

  return (
    <div data-component="InCode">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span lang={locale}>{t('label')}</span>
        {title ? `: ${title}` : null}
      </button>
      <div id={contentId} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
