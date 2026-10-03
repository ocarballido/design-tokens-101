import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';

// Anatomía: docs/componentes-v1.md §4.8. Región footer: logotipo, autor (P8) y aviso de P7.

export function SiteFooter() {
  const t = useTranslations('SiteFooter');

  return (
    <footer className="border-t-(length:--t101-border-width-100) border-neutral-default bg-neutral-default px-400 py-600">
      <div className="flex flex-col items-start gap-600 type-caption-default text-neutral-subtle">
        <Logo variant="gray" />
        <div className="flex flex-col gap-200">
          <p>
            {t('createdBy')}
            <br />
            Oscar Carballido
          </p>
          {/* D22: logotipo del autor, decorativo (el nombre ya está escrito). */}
          <img src="/brand/logo-oc.svg" alt="" width={39} height={24} />
        </div>
        <p>{t('notice')}</p>
      </div>
    </footer>
  );
}
