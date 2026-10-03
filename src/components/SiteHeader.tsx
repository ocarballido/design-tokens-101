import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { MobileNav } from '@/components/MobileNav';
import { Sidebar, type SidebarData } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from '@/i18n/navigation';

// Anatomía: docs/componentes-v1.md §4.7. Región header.
// Escritorio (size=large): logotipo, selector de idioma y de tema.
// Móvil (size=small, por debajo de 64rem): logotipo y botón de menú; los selectores pasan al panel (D19, D21).

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
    <header className="flex items-center justify-between gap-400 border-b-(length:--t101-border-width-100) border-neutral-default bg-neutral-default p-400">
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
