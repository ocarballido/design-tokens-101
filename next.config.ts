import path from 'node:path';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

// Con Turbopack, los plugins se indican por nombre y con opciones serializables
// (https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack).
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
      'remark-gfm',
    ],
    // Los plugins propios se indican por ruta absoluta (texto serializable, como pide Turbopack).
    rehypePlugins: ['rehype-slug', path.resolve('tools/rehype-code-meta.mjs')],
  },
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
