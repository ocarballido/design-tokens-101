import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Callout } from '@/components/Callout';
import { LessonHeader } from '@/components/LessonHeader';
import { PageNav } from '@/components/PageNav';
import { routing } from '@/i18n/routing';
import { getLesson, getLessons, getSections, lessonHref, type Lesson } from '@/lib/content';

type Params = { locale: string; section: string; lesson: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getLessons(locale).map((lesson) => ({ locale, section: lesson.section, lesson: lesson.slug })),
  );
}

export const dynamicParams = false;

const toTarget = (lesson?: Lesson) =>
  lesson ? { title: lesson.frontmatter.nav_title ?? lesson.frontmatter.title, href: lessonHref(lesson) } : undefined;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, section, lesson: slug } = await params;
  const lesson = getLesson(locale, section, slug);
  if (!lesson) return {};
  return {
    title: `${lesson.frontmatter.title} · Tokens101`,
    description: lesson.frontmatter.description,
  };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { locale, section, lesson: slug } = await params;
  const lesson = getLesson(locale, section, slug);
  if (!lesson) notFound();

  const { default: Content } = await import(`@content/${lesson.contentLocale}/${lesson.file}.mdx`);
  const sectionTitle = getSections(locale).find((item) => item.slug === section)?.title;
  const untranslated = lesson.contentLocale !== locale;
  const t = await getTranslations({ locale });
  const lessons = getLessons(locale);
  const index = lessons.findIndex((item) => item.file === lesson.file);

  return (
    <>
      {untranslated ? (
        <Callout variant="pending">
          <p>{t('Lesson.untranslated', { language: t(`Languages.${lesson.contentLocale}`) })}</p>
        </Callout>
      ) : null}
      {/* lang marca el idioma real del texto cuando se muestra sin traducir (WCAG 3.1.2). */}
      <article lang={untranslated ? lesson.contentLocale : undefined} className="flex flex-col gap-600">
        <LessonHeader
          section={sectionTitle}
          title={lesson.frontmatter.title}
          description={lesson.frontmatter.description}
          lastReviewed={lesson.frontmatter.lastReviewed}
        />
        <div className="flow">
          <Content />
        </div>
      </article>
      <PageNav previous={toTarget(lessons[index - 1])} next={toTarget(lessons[index + 1])} />
    </>
  );
}
