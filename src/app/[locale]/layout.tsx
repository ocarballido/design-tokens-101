import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { routing } from '@/i18n/routing';
import { getSections, lessonHref } from '@/lib/content';
import '../globals.css';

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
  const sections = getSections(locale).map((section) => ({
    slug: section.slug,
    title: section.title,
    lessons: section.lessons.map((lesson) => ({
      title: lesson.frontmatter.nav_title ?? lesson.frontmatter.title,
      href: lessonHref(lesson),
    })),
  }));

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Sidebar label={t('label')} sections={sections} />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
