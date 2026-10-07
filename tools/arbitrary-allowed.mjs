// Excepciones de valores arbitrarios (T17, V43): clases entre corchetes permitidas, cada una con su
// motivo (tabla "Los corchetes" de content/es/09-components/05-variants-to-classes.mdx).
// La usan check-tokens.mjs (en src/) y check-content.mjs (en el CSS generado, V46).
export const ARBITRARY_ALLOWED = {
  'h-[1lh]': 'alto de una línea de texto: marca de Takeaways alineada con la primera línea',
  'grid-rows-[0fr]': 'plegado animado (InCode, Sidebar): cerrado',
  'grid-rows-[1fr]': 'plegado animado (InCode, Sidebar): abierto',
  'transition-[grid-template-rows,visibility]': 'propiedades que se animan; duración y curva son tokens (V24)',
  'max-h-[calc(100dvh-var(--site-header-height))]': 'sidebar sticky: alto de la pantalla menos la cabecera medida (V28)',
};
