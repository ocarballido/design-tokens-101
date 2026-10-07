import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { InlineScript } from '@/components/InlineScript';
import { Sidebar, type SidebarData } from '@/components/Sidebar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SkipLink } from '@/components/SkipLink';
import { LOCALE } from '@/i18n/request';
import { getSections, lessonHref } from '@/lib/content';
import { SITE_URL } from '@/lib/metadata';
import { THEME_SCRIPT } from '@/lib/theme';
import { inter, jetbrainsMono } from './fonts';
import './globals.css';

// Plantilla de lección (componentes-v1.md §4.9, entrega-diseno.md §3.2):
// regiones header, nav (sidebar), main y footer.

const MAIN_ID = 'main';

// V50: base de las URL de los metadatos (canonical, og:url, og:image), P26.
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

// V45: layout raíz sin segmento [locale]; el idioma es fijo (src/i18n/request.ts).
export default async function RootLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('Sidebar');
  const sidebar: SidebarData = {
    label: t('label'),
    sections: getSections(LOCALE).map((section) => ({
      slug: section.slug,
      title: section.title,
      number: section.number,
      group: section.group,
      lessons: section.lessons.map((lesson) => ({
        title: lesson.frontmatter.nav_title ?? lesson.frontmatter.title,
        href: lessonHref(lesson),
      })),
    })),
  };

  return (
    // data-theme lo pone THEME_SCRIPT antes de hidratar: por eso se avisa a React (V10, V21).
    // El script solo se ejecuta al cargar el documento; si React vuelve a montar el layout,
    // ThemeToggle vuelve a aplicar el tema guardado (V41).
    <html lang={LOCALE} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={THEME_SCRIPT} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <SkipLink target={MAIN_ID} />
          <SiteHeader sidebar={sidebar} />
          <div className="flex flex-1">
            {/* Escritorio (D11): sidebar fijo al hacer scroll (V17), debajo de la cabecera sticky (V28),
                con scroll propio si no cabe. */}
            <div className="hidden w-sidebar shrink-0 border-e-(length:--t101-border-width-100) border-neutral-default bg-neutral-default desktop:block">
              <div className="sticky top-(--site-header-height) max-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto">
                <Sidebar {...sidebar} />
              </div>
            </div>
            <main id={MAIN_ID} tabIndex={-1} className="flex min-w-0 flex-1 flex-col outline-hidden">
              {/* Columna de la lección: ancho máximo size/content/max-width, centrada (D20). Ocupa todo
                  el alto de main para que la portada pueda centrarse en vertical (V48). */}
              <div className="mx-auto flex w-full max-w-content flex-1 flex-col gap-600 px-400 py-600">{children}</div>
            </main>
          </div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
