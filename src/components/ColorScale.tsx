import primitives from '../../tokens/dtcg/primitives/Value.tokens.json';
import { Fragment } from 'react';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.8 (C14).
// Nada se escribe a mano: el color de la muestra es la variable del primitivo (su code syntax Web)
// y el hex sale de tokens/dtcg/primitives al compilar. Si la escala cambia en Figma y se
// regenera con `npm run tokens`, el gráfico cambia solo.
// D54: con `colors` (11 hex) y `name`, en lugar de `palette`, muestra los hex que calcula la
// herramienta de escalas (§5.10); la muestra es entonces el hex, que es un dato, no un token.

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

type Palette = 'emerald' | 'neutral' | 'red' | 'amber' | 'blue';

type PrimitiveColor = {
  $value: { hex: string };
  $extensions: { 'com.figma.codeSyntax': { WEB: string } };
};

function step(palette: Palette, name: string) {
  const token = (primitives.color[palette] as Record<string, PrimitiveColor | undefined>)[name];
  if (!token) throw new Error(`ColorScale: no existe color/${palette}/${name} en tokens/dtcg/primitives`);
  const hex = token.$value.hex.toUpperCase();
  // §3.8: 6 cifras en mayúsculas (#33CC99, no #3c9).
  if (!/^#[0-9A-F]{6}$/.test(hex)) throw new Error(`ColorScale: hex inesperado en color/${palette}/${name}: ${hex}`);
  return { name, hex, color: token.$extensions['com.figma.codeSyntax'].WEB };
}

// D63: la etiqueta puede partirse después de cada "/", para que un nombre de token
// (text/accent/default) no se corte por la mitad de una palabra.
function withBreaks(label: string) {
  return label.split('/').map((part, i, parts) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

type ColorScaleProps = (
  | { palette: Palette; colors?: never; name?: never }
  | { palette?: never; colors: readonly string[]; name: string }
) & {
  caption: string;
  highlight?: string;
  // Obligatorio si hay highlight: el paso destacado se distingue también por texto (1.4.1).
  highlightLabel?: string;
};

export function ColorScale({ palette, colors, name: scaleName, caption, highlight, highlightLabel }: ColorScaleProps) {
  if (colors && (colors.length !== STEPS.length || colors.some((hex) => !/^#[0-9A-F]{6}$/.test(hex)))) {
    throw new Error('ColorScale: colors son 11 hex en mayúsculas y con 6 cifras');
  }
  if (highlight && !STEPS.includes(highlight as (typeof STEPS)[number])) {
    throw new Error(`ColorScale: highlight="${highlight}" no es un paso de la escala`);
  }
  if (highlight && !highlightLabel) throw new Error('ColorScale: highlight necesita highlightLabel (1.4.1)');

  return (
    <figure data-component="ColorScale" data-palette={palette ?? scaleName} className="flex flex-col gap-300">
      {/* Por debajo de breakpoint/desktop, 4 por fila; desde 64rem (D11), los 11 en una fila. */}
      <ol className="grid grid-cols-4 gap-x-200 gap-y-400 desktop:grid-cols-11">
        {STEPS.map((name, i) => {
          const { hex, color } = colors ? { hex: colors[i], color: colors[i] } : step(palette!, name);
          const highlighted = name === highlight;
          return (
            <li
              key={name}
              className={cx(
                // D63: todos los pasos llevan el relleno y el borde (transparente) de la caja,
                // para que el destacado no se desplace. D62: el destacado va en una caja; la
                // etiqueta sigue siendo la marca (1.4.1).
                'flex min-w-0 flex-col gap-100 rounded-control border-(length:--t101-border-width-100) p-200',
                highlighted ? 'border-neutral-default bg-neutral-strong' : 'border-transparent',
              )}
            >
              {/* La muestra es decorativa: la información está en el texto (número y hex). */}
              <span
                aria-hidden
                className={cx(
                  'block h-1200 rounded-control',
                  !highlighted && 'border-(length:--t101-border-width-100) border-neutral-default',
                )}
                style={{ backgroundColor: color }}
              />
              {/* Texto sobre el fondo de la página, no sobre la muestra. Las comas ocultas separan
                  las partes al leerlas: "500, #33CC99, Color de marca". */}
              <span className="flex min-w-0 flex-col break-words">
                <span className="type-label-default text-neutral-default">{name}</span>
                <span className="type-caption-default text-neutral-subtle">
                  <span className="sr-only">, </span>
                  {hex}
                </span>
                {highlighted ? (
                  <span className="type-caption-default text-neutral-default">
                    <span className="sr-only">, </span>
                    {withBreaks(highlightLabel!)}
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="type-caption-default text-neutral-subtle">{caption}</figcaption>
    </figure>
  );
}
