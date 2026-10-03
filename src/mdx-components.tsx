import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import { Callout } from '@/components/Callout';
import { InCode } from '@/components/InCode';
import { Link } from '@/i18n/navigation';

// Los enlaces internos se escriben sin idioma (/start-here/what-is-dtcg):
// el Link de next-intl añade el idioma de la página (content/README.md).
function Anchor({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/')) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} {...props} />;
}

const components: MDXComponents = {
  a: Anchor,
  Callout,
  InCode,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
