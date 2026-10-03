import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import { Callout } from '@/components/Callout';
import { InCode } from '@/components/InCode';
import { Link } from '@/i18n/navigation';

// Prose (componentes-v1.md §3.1): cómo se ve cada elemento Markdown del MDX.
// La separación vertical entre bloques la pone la utilidad `flow` del contenedor.

// Los enlaces internos se escriben sin idioma (/start-here/what-is-dtcg):
// el Link de next-intl añade el idioma de la página (content/README.md).
function Anchor({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/')) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} {...props} />;
}

const components: MDXComponents = {
  // §4.10: los títulos heading/2 usan text/neutral/subtle.
  h2: (props) => <h2 className="type-heading-2 text-neutral-subtle" {...props} />,
  h3: (props) => <h3 className="type-heading-3 text-neutral-default" {...props} />,
  h4: (props) => <h4 className="type-heading-4 text-neutral-default" {...props} />,
  p: (props) => <p className="type-body-default text-neutral-default" {...props} />,
  ul: (props) => <ul className="list-disc ps-400 marker:text-neutral-subtle" {...props} />,
  ol: (props) => <ol className="list-decimal ps-400 marker:text-neutral-subtle" {...props} />,
  // La negrita (body/strong, D17) solo cambia el peso: está en los estilos base (base.css),
  // para que herede el tamaño también dentro de tablas y Callouts.
  a: Anchor,
  Callout,
  InCode,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
