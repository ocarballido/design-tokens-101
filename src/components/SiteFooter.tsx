import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';
import { TextLink } from '@/components/TextLink';

// Anatomía: docs/componentes-v1.md §4.8. Región footer: logotipo, autor (P8), aviso de P7 y
// enlace para avisar de un error (P25).

const AUTHOR_URL = 'https://www.oscarballido.com';
const ISSUES_URL = 'https://github.com/ocarballido/design-tokens-101/issues';

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
        {/* P25, D41: el aviso de P7 y el enlace a los issues de GitHub, en el mismo bloque.
            TextLink hereda caption/default del pie; la pregunta le da contexto (2.4.4). */}
        <div className="flex flex-col gap-200">
          <p>{t('notice')}</p>
          <p>
            {t('reportError')} <TextLink href={ISSUES_URL}>{t('reportLink')}</TextLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
