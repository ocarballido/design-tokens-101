import type { ComponentPropsWithoutRef } from 'react';

// Elementos de Prose (componentes-v1.md §3.1) que otros componentes reconocen entre sus
// hijos del MDX: Takeaways (§3.9) busca su título y su lista por el tipo del elemento.

// §4.10: los títulos heading/2 usan text/neutral/subtle.
export function Heading2(props: ComponentPropsWithoutRef<'h2'>) {
  return <h2 className="type-heading-2 text-neutral-subtle" {...props} />;
}

export function UnorderedList(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul className="list-disc ps-400 marker:text-neutral-subtle" {...props} />;
}
