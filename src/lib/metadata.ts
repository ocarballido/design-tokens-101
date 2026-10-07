import type { Metadata } from 'next';

// Metadatos para buscadores y para compartir (V49 a V52). Next.js fusiona los metadatos de cada
// segmento de forma superficial: si una página define openGraph, sustituye entero al del layout
// (https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging). Por eso cada
// página construye los suyos con esta función, que comparte la imagen y los datos del sitio.

// P26. metadataBase (layout raíz) completa las URL relativas de canonical, og:url y og:image.
export const SITE_URL = 'https://designtokens101.com';
export const SITE_NAME = 'DesignToken101';

// V52 (cambiada el 2026-10-07): imagen para compartir de 1200 × 630 que entrega Oscar, con tarjeta
// grande en X (summary_large_image). Antes, home-light.png cuadrada con tarjeta summary.
const SHARE_IMAGE = {
  url: '/brand/share.png',
  width: 1200,
  height: 630,
  alt: 'Logotipo de DesignToken101 junto a su símbolo en 3D: una esfera verde y dos formas rojas sobre fondo negro',
};

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
    twitter: { card: 'summary_large_image', title, description, images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }] },
  };
}
