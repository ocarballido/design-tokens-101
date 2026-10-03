import { useTranslations } from 'next-intl';
import { HeaderHeight } from '@/components/HeaderHeight';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { MobileNav } from '@/components/MobileNav';
import { Sidebar, type SidebarData } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from '@/i18n/navigation';

// Anatomía: docs/componentes-v1.md §4.7. Región header.
// Escritorio (size=large): logotipo, selector de idioma y de tema.
// Móvil (size=small, por debajo de 64rem): logotipo y botón de menú; los selectores pasan al panel (D19, D21).
// V28: sticky arriba, con el contenido pasando por debajo difuminado (background/neutral/translucent y
// blur/300). Con prefers-reduced-transparency, fondo opaco.

const HEADER_ID = 'site-header';

export function SiteHeader({ sidebar }: { sidebar: SidebarData }) {
  const t = useTranslations('SiteHeader');
  // D22: el enlace del logotipo tiene nombre accesible propio; la imagen es decorativa.
  const logo = (
    <Link href="/" aria-label={t('home')} className="shrink-0 focus-ring">
      <Logo variant="colored" />
    </Link>
  );
  const selectors = (
    <>
      <LanguageSwitcher />
      <ThemeToggle />
    </>
  );

  return (
    <header
      id={HEADER_ID}
      className="sticky top-0 z-10 flex items-center justify-between gap-400 border-b-(length:--t101-border-width-100) border-neutral-default bg-neutral-translucent p-400 backdrop-blur-300 [@media(prefers-reduced-transparency:reduce)]:bg-neutral-default"
    >
      <HeaderHeight target={HEADER_ID} />
      {logo}
      <div className="hidden items-center gap-200 desktop:flex">{selectors}</div>
      <div className="desktop:hidden">
        <MobileNav logo={logo} selectors={selectors}>
          <Sidebar {...sidebar} />
        </MobileNav>
      </div>
    </header>
  );
}
