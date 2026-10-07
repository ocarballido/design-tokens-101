import type { Metadata } from 'next';

// Metadatos para buscadores y para compartir (V49 a V52). Next.js fusiona los metadatos de cada
// segmento de forma superficial: si una página define openGraph, sustituye entero al del layout
// (https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging). Por eso cada
// página construye los suyos con esta función, que comparte la imagen y los datos del sitio.

// P26. metadataBase (layout raíz) completa las URL relativas de canonical, og:url y og:image.
export const SITE_URL = 'https://designtokens101.com';
export const SITE_NAME = 'DesignToken101';

// V51: la imagen de la portada (D43) tal cual, en Light. Es cuadrada, así que la tarjeta de X es
// "summary" y no "summary_large_image" (2:1). Si diseño entrega una de 1200 × 630, se cambia aquí.
const SHARE_IMAGE = { url: '/brand/home-light.png', width: 440, height: 441 };

/** C20, V49: el <title> de una lección es meta_title (o title) seguido de la marca. */
export const lessonTitle = (frontmatter: { title: string; meta_title?: string }) =>
  `${frontmatter.meta_title ?? frontmatter.title} · ${SITE_NAME}`;

export function pageMetadata({ title, description, path }: { title: string; description?: string; path: string }): Metadata {
  return {
    title,
    description,
    // V50: URL canónica de cada página, relativa a metadataBase.
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'es_ES',
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary', title, description, images: [SHARE_IMAGE.url] },
  };
}
