'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §4.4 y §4.10. Dos enlaces a la misma lección en el otro idioma.
// - El idioma actual lleva aria-current="true". Sin marca inferior (V26): se distingue por el
//   recuadro y el color del texto; riesgo de 1.4.1 y 1.4.11 aceptado por Oscar.
// - Cada enlace lleva el atributo lang de su idioma (3.1.2) y su nombre completo, que contiene
//   el texto visible ("ES" → "Español"), como pide 2.5.3 Label in Name.

const NAMES: Record<string, string> = { es: 'Español', en: 'English' };
// Orden del diseño (Figma): ES, EN.
const ORDER = ['es', 'en'] as const;

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const current = useLocale();
  const pathname = usePathname();

  return (
    <ul aria-label={t('label')} className="flex gap-100 rounded-300 bg-neutral-strong p-100">
      {ORDER.map((locale) => {
        const isCurrent = locale === current;
        return (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              lang={locale}
              hrefLang={locale}
              aria-label={NAMES[locale]}
              aria-current={isCurrent ? 'true' : undefined}
              className={cx(
                'flex items-center justify-center rounded-control p-200 type-label-default uppercase focus-ring',
                isCurrent
                  ? 'bg-neutral-default text-accent-default'
                  : 'text-neutral-subtle hover:bg-neutral-hover hover:text-neutral-default',
              )}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
