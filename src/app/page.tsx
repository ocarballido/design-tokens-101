import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/Button';
import { LOCALE } from '@/i18n/request';
import { getLessons, lessonHref } from '@/lib/content';

// Portada (P27, D42; sustituye a la redirección de V04). Va dentro del layout raíz: con sidebar y
// ninguna sección abierta, porque ninguna lección es la actual (C11). Estructura y huecos:
// entrega-diseno.md §3.10.

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Home');
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function Home() {
  const t = await getTranslations('Home');
  const [first] = getLessons(LOCALE);

  return (
    <div className="grid items-center gap-1200 py-600 desktop:grid-cols-2 desktop:py-1600">
      <div className="flex flex-col items-start gap-600">
        {/* El subtítulo no es un encabezado: hgroup lo une al h1 sin crear otro nivel. */}
        <hgroup className="flex flex-col gap-200">
          <h1 className="type-heading-1 text-neutral-default wrap-break-word">{t('title')}</h1>
          <p className="type-heading-4 text-neutral-subtle">{t('subtitle')}</p>
        </hgroup>
        <p className="type-body-default text-neutral-default">{t('intro')}</p>
        {/* Sin este botón, en móvil no hay por dónde empezar: el sidebar está en el panel (P27). */}
        <Button href={lessonHref(first)} icon={ChevronRight}>
          {t('start')}
        </Button>
      </div>
      {/* D43: render de Oscar en mapa de bits (880 × 880, el 2× de la columna), una versión por tema
          como los logotipos (V20). Decorativa: el título ya dice qué es la página. Fuera de "solo
          tokens" como los logotipos (D22); el radio sí es un token. */}
      <div>
        <img src="/brand/home-light.png" alt="" width={880} height={880} className="block aspect-square w-full rounded-container dark:hidden" />
        <img src="/brand/home-dark.png" alt="" width={880} height={880} className="hidden aspect-square w-full rounded-container dark:block" />
      </div>
    </div>
  );
}
