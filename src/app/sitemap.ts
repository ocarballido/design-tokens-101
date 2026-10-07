import type { MetadataRoute } from 'next';
import { LOCALE } from '@/i18n/request';
import { getLessons, lessonHref } from '@/lib/content';
import { SITE_URL } from '@/lib/metadata';

// V51: /sitemap.xml con la portada y todas las lecciones
// (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
// Sin priority ni changefreq: Google los ignora. Sin lastmod: Google solo lo usa si es exacto, y
// lastReviewed es la fecha de revisión de las fuentes, no la del último cambio de la página
// (https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }, ...getLessons(LOCALE).map((lesson) => ({ url: `${SITE_URL}${lessonHref(lesson)}` }))];
}
