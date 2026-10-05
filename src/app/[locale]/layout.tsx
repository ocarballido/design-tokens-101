import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Sidebar, type SidebarData } from '@/components/Sidebar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SkipLink } from '@/components/SkipLink';
import { routing } from '@/i18n/routing';
import { getSections, lessonHref } from '@/lib/content';
import { THEME_SCRIPT } from '@/lib/theme';
import { inter, jetbrainsMono } from '../fonts';
import '../globals.css';

// Plantilla de lección (componentes-v1.md §4.9, entrega-diseno.md §3.2):
// regiones header, nav (sidebar), main y footer.

const MAIN_ID = 'main';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Sidebar' });
  const sidebar: SidebarData = {
    label: t('label'),
    sections: getSections(locale).map((section) => ({
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
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
            <main id={MAIN_ID} tabIndex={-1} className="min-w-0 flex-1 outline-hidden">
              {/* Columna de la lección: ancho máximo size/content/max-width, centrada (D20). */}
              <div className="mx-auto flex max-w-content flex-col gap-600 px-400 py-600">{children}</div>
            </main>
          </div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
