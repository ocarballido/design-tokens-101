import { Callout } from 'designtoken101';

// Una celda por variante (docs/components/callout.md): la variante la elige el sentido del texto,
// no el color. Necesita DesignToken101Provider (la etiqueta sale de next-intl).
export function Note() {
  return (
    <Callout variant="note">
      <p>Figma exporta cada colección en un archivo .json por modo.</p>
    </Callout>
  );
}

export function Warning() {
  return (
    <Callout variant="warning">
      <p>Si cambias el nombre de una variable en Figma, cambia también su code syntax.</p>
    </Callout>
  );
}

export function Recommendation() {
  return (
    <Callout variant="recommendation">
      <p>Empieza por las escalas de color antes de crear los alias.</p>
    </Callout>
  );
}

export function Pending() {
  return (
    <Callout variant="pending">
      <p>Esta sección está en preparación.</p>
    </Callout>
  );
}
