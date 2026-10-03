// Marca de la opción actual en los selectores (entrega-diseno.md §3.1, componentes-v1.md §4.10):
// borde inferior de border-width/200 con border/accent/strong. Distingue la opción sin depender
// solo del color (1.4.1).
export function Marker() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-200 bottom-050 border-b-(length:--t101-border-width-200) border-accent-strong"
    />
  );
}
