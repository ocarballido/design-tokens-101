import { redirect } from 'next/navigation';
import { LOCALE } from '@/i18n/request';
import { getLessons, lessonHref } from '@/lib/content';

// Sin portada todavía: la raíz lleva a la primera lección (V04).
export default function Home() {
  const [first] = getLessons(LOCALE);
  redirect(lessonHref(first));
}
