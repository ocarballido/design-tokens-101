// Marca numerada de AnnotatedCode (docs/componentes-v1.md §3.10): al final de una línea de código y
// al principio de su explicación en la leyenda. No depende del color: lleva el número (1.4.1).
// El texto oculto ("nota 1") relaciona, con lector de pantalla, la línea con la leyenda.
// select-none: al seleccionar el código a mano, la marca no se copia con él.
// relative: el texto oculto (sr-only, en posición absoluta) se queda dentro de la marca; si no,
// escapa del scroll horizontal del bloque y da scroll a la página a 320 px (1.4.10).

type CodeMarkerProps = {
  number: number;
  /** Texto oculto delante del número ("nota"). */
  label: string;
};

export function CodeMarker({ number, label }: CodeMarkerProps) {
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-accent-strong-default px-150 py-050 type-caption-default text-on-accent select-none">
      <span className="sr-only">{`${label} `}</span>
      {number}
    </span>
  );
}
