import { useFormatter, useTranslations } from 'next-intl';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §5.8 (en Figma, entrega-diseno.md §3.11; barras de D56).
// El croma de cada paso de la curva de referencia, en barras horizontales: cabe igual a 320 px.
// - El largo de cada barra es un dato (C ÷ max), no un estilo, como el relleno de las muestras de
//   ColorScale: no sale de un token. `max` es fijo (el mayor C de las 17 curvas), para que al
//   cambiar de curva las barras se puedan comparar.
// - La barra destacada se rellena con el hex del usuario (C21), también un dato; su borde inferior
//   border/neutral/strong (4,70 / 4,20) la separa de la página aunque ese color no contraste.
// - La barra es decorativa (aria-hidden): cada li se lee "500, croma 0,137" (y "Tu color"). El paso
//   destacado se distingue también por el texto (1.4.1).

type ChromaChartProps = {
  curve: string;
  steps: readonly number[];
  /** Valores de C de la curva, de 50 a 950. */
  chroma: readonly number[];
  max: number;
  highlight?: number;
  highlightLabel?: string;
  /** Hex del usuario para el relleno de la barra destacada (C21). */
  highlightColor?: string;
};

export function ChromaChart({ curve, steps, chroma, max, highlight, highlightLabel, highlightColor }: ChromaChartProps) {
  const t = useTranslations('ToolScales');
  const format = useFormatter();
  const value = (c: number) => format.number(c, { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  return (
    <figure data-component="ChromaChart" className="flex flex-col gap-300">
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const highlighted = step === highlight;
          return (
            <li key={step} className="flex min-h-600 items-center gap-200">
              <span className="sr-only">
                {t('chartStep', { step, chroma: value(chroma[i]) })}
                {highlighted ? `, ${highlightLabel}` : null}
              </span>
              <span aria-hidden className="min-w-800 type-label-default text-neutral-default">
                {step}
              </span>
              <span aria-hidden className="flex h-600 flex-1 self-stretch">
                <span
                  className={cx(
                    'h-full border-b-(length:--t101-border-width-100)',
                    highlighted ? 'border-neutral-strong' : 'border-neutral-default bg-neutral-strong',
                  )}
                  style={{ width: `${(chroma[i] / max) * 100}%`, backgroundColor: highlighted ? highlightColor : undefined }}
                />
              </span>
              <span aria-hidden className="flex w-2400 shrink-0 flex-wrap gap-x-200 type-caption-default">
                <span className="text-neutral-subtle">{value(chroma[i])}</span>
                {highlighted ? <span className="text-neutral-default">{highlightLabel}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="type-caption-default text-neutral-subtle">{t('chartCaption', { curve })}</figcaption>
    </figure>
  );
}
