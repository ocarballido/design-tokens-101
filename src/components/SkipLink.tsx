import { useTranslations } from 'next-intl';

// Anatomía: docs/componentes-v1.md §4.6. Primer elemento enfocable; oculto hasta que recibe el
// foco y lleva al <main> (2.4.1 Bypass Blocks).

export function SkipLink({ target }: { target: string }) {
  const t = useTranslations('SkipLink');
  return (
    <a
      href={`#${target}`}
      className="fixed start-400 top-400 z-20 rounded-control bg-accent-strong-default px-400 py-200 type-label-default text-on-accent not-focus:sr-only focus-ring"
    >
      {t('label')}
    </a>
  );
}
