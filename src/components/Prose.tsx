import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

// Elementos de Prose (componentes-v1.md §3.1) que otros componentes reconocen entre sus
// hijos del MDX: Takeaways (§3.9) busca su título y su lista por el tipo del elemento, y
// AnnotatedCode (§3.10), su leyenda.

// §4.10: los títulos heading/2 usan text/neutral/subtle.
// Con ref: ScaleGenerator lleva el foco a su título "Resultado" (C24).
export function Heading2(props: ComponentProps<'h2'>) {
  return <h2 className="type-heading-2 text-neutral-subtle" {...props} />;
}

export function UnorderedList(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul className="list-disc ps-400 marker:text-neutral-subtle" {...props} />;
}

export function OrderedList(props: ComponentPropsWithoutRef<'ol'>) {
  return <ol className="list-decimal ps-400 marker:text-neutral-subtle" {...props} />;
}
