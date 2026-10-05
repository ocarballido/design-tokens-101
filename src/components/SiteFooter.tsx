import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';

// Anatomía: docs/componentes-v1.md §4.8. Región footer: logotipo, autor (P8) y aviso de P7.

const AUTHOR_URL = 'https://www.oscarballido.com';

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
          {/* V36: el logotipo del autor enlaza a su web. D22: la imagen no lleva texto alternativo;
              el nombre accesible lo da aria-label. 39 × 24 px (≥ 24 × 24, 2.5.8). */}
          <a href={AUTHOR_URL} aria-label={t('authorSite')} className="self-start focus-ring">
            <img src="/brand/logo-oc.svg" alt="" width={39} height={24} className="block" />
          </a>
        </div>
        <p>{t('notice')}</p>
      </div>
    </footer>
  );
}
