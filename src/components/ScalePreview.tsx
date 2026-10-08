import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §5.9 (en Figma, entrega-diseno.md §3.11; tiras de D56).
// Las escalas generadas sobre blanco y sobre el neutral/950 generado (D48). El fondo de cada panel y
// las muestras son los hex del usuario, no tokens de la web: no cambian con Light y Dark.
// Los paneles son decorativos (aria-hidden): los valores están en las tablas. Las etiquetas y el pie
// van sobre el fondo de la página. Dos columnas desde 64rem; apilados por debajo (size de Figma, D58).
// C27, C30: con `inactive` y prefers-reduced-motion, los paneles (sin texto) van a opacity/inactive;
// las etiquetas, no. Sin esa preferencia, el resultado entero pulsa (ScaleGenerator).

type ScalePreviewProps = {
  scales: { name: string; colors: readonly string[] }[];
  light: string;
  dark: string;
  lightLabel: string;
  darkLabel: string;
  caption: string;
  inactive?: boolean;
};

type PanelProps = { scales: ScalePreviewProps['scales']; background: string; label: string; inactive: boolean };

function Panel({ scales, background, label, inactive }: PanelProps) {
  return (
    <div className="flex flex-col gap-100">
      <div
        aria-hidden
        className={cx(
          'flex flex-col gap-100 rounded-container border-(length:--t101-border-width-100) border-neutral-default p-400',
          inactive && 'motion-reduce:opacity-(--t101-opacity-inactive)',
        )}
        style={{ backgroundColor: background }}
      >
        {scales.map((scale) => (
          // Una tira continua por escala: sin hueco entre muestras, radio en la fila y recorte.
          <div key={scale.name} className="flex overflow-hidden rounded-control">
            {scale.colors.map((color, i) => (
              <span key={i} className="h-800 flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        ))}
      </div>
      <p className="type-caption-default text-neutral-subtle">{label}</p>
    </div>
  );
}

export function ScalePreview({ scales, light, dark, lightLabel, darkLabel, caption, inactive = false }: ScalePreviewProps) {
  return (
    <figure data-component="ScalePreview" className="flex flex-col gap-300">
      <div className="grid gap-400 desktop:grid-cols-2">
        <Panel scales={scales} background={light} label={lightLabel} inactive={inactive} />
        <Panel scales={scales} background={dark} label={darkLabel} inactive={inactive} />
      </div>
      <figcaption className="type-caption-default text-neutral-subtle">{caption}</figcaption>
    </figure>
  );
}
