// TypeScript 7 no incluye los paquetes @types por defecto: los tipos de `import … from './privacy.mdx'`
// (declare module '*.mdx') llegan con esta referencia a @types/mdx.
/// <reference types="mdx" />
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LessonHeader } from '@/components/LessonHeader';
import { pageMetadata, SITE_NAME } from '@/lib/metadata';
import Content from './privacy.mdx';

// Página de privacidad (V69, que lleva aquí G42 de ds4agents). Informa de la medición de visitas con
// Vercel Web Analytics, como pide la primera garantía mínima de la AEPD para la medición de audiencia sin
// consentimiento (https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf, §III.A). No es una
// lección: vive fuera de content/, no sale en el sidebar ni en el sitemap (V51) y se enlaza desde el pie.
// Va dentro del layout raíz, con el sidebar sin ninguna sección abierta, como la portada (C11).

const PATH = '/privacy';
// Fecha de la última revisión del texto y de sus fuentes: se cambia al editar privacy.mdx.
const LAST_REVIEWED = '2026-11-19';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Privacy');
  return pageMetadata({ title: `${t('title')} · ${SITE_NAME}`, description: t('description'), path: PATH });
}

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy');

  return (
    <article className="flex flex-col gap-600">
      <LessonHeader title={t('title')} description={t('description')} lastReviewed={LAST_REVIEWED} />
      <div className="flow">
        <Content />
      </div>
    </article>
  );
}
