import { redirect } from '@/i18n/navigation';
import { getLessons, lessonHref } from '@/lib/content';

// Sin portada todavía: la raíz de cada idioma lleva a la primera lección (V04).
export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [first] = getLessons(locale);
  redirect({ href: lessonHref(first), locale });
}
