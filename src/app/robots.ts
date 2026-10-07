import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

// V51: /robots.txt; todo se puede rastrear y apunta al sitemap
// (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
