import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §4.3. Si no hay lección anterior o siguiente, no se muestra.

type Target = { title: string; href: string };

export function PageNav({ previous, next }: { previous?: Target; next?: Target }) {
  const t = useTranslations('PageNav');
  if (!previous && !next) return null;

  return (
    <nav aria-label={t('label')} className="grid gap-400 desktop:grid-cols-2">
      {previous ? <PageNavLink direction="previous" {...previous} /> : null}
      {next ? <PageNavLink direction="next" {...next} /> : null}
    </nav>
  );
}

function PageNavLink({ direction, title, href }: Target & { direction: 'previous' | 'next' }) {
  const t = useTranslations('PageNav');
  const isNext = direction === 'next';
  const Chevron = isNext ? ChevronRight : ChevronLeft;

  return (
    <Link
      href={href}
      rel={isNext ? 'next' : 'prev'}
      className={cx(
        'group flex flex-col gap-200 rounded-container border-(length:--t101-border-width-100) border-neutral-default p-400 focus-ring',
        'hover:border-neutral-strong hover:bg-neutral-hover',
        isNext && 'text-end desktop:col-start-2',
      )}
    >
      <span className={cx('flex items-center gap-100 text-neutral-subtle', isNext && 'flex-row-reverse')}>
        <Chevron aria-hidden className="size-600 shrink-0" />
        <span className="type-caption-default">{t(direction)}</span>
      </span>
      <span className="type-label-default text-accent-default group-hover:text-accent-hover">{title}</span>
    </Link>
  );
}
