'use client';

import { Download, Link as LinkIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  STEPS,
  TW_CURVES,
  build,
  contrast,
  hexToRgb,
  isPaletteName,
  oklchText,
  parseColor,
  parseTint,
  searchFromState,
  stateFromSearch,
  toFigmaTokens,
  DEFAULTS,
} from '../../tools/scales.mjs';
import { Button } from '@/components/Button';
import { Callout } from '@/components/Callout';
import { Checkbox } from '@/components/Checkbox';
import { ChromaChart } from '@/components/ChromaChart';
import { Code } from '@/components/Code';
import { ColorScale } from '@/components/ColorScale';
import { ErrorSummary } from '@/components/ErrorSummary';
import { Heading2 } from '@/components/Prose';
import { ScalePreview } from '@/components/ScalePreview';
import { Select } from '@/components/Select';
import { Table, Td, Th } from '@/components/Table';
import { TextField } from '@/components/TextField';
import { TextLink } from '@/components/TextLink';
import { download } from '@/lib/download';

// Herramienta "Generar escalas" (/tools/color-scales; T8, T22, T23, T24). Estructura de
// componentes-v1.md §5.10 y plantillas de entrega-diseno.md §3.12.
// El cálculo es tools/scales.mjs, la traducción de tools/scales.py que comprueba `npm test`: aquí
// no se calcula nada. Todo pasa en el navegador.
// - Con un campo no válido, el resultado es el de la última entrada válida (D59). El error del campo
//   se ve al pulsar la descarga, no al salir del campo: si apareciera al perder el foco, el contenido
//   bajaría entre que se pulsa y se suelta el botón, y el clic se perdería.
// - La descarga está siempre activa (D14): si falta algo, aparece el ErrorSummary encima (D52) y
//   recibe el foco.
// - Los ajustes se leen de la URL al cargar (?color=33CC99&name=emerald&tint=0.5&curve=green) y el
//   botón secundario copia ese enlace.

const LESSON = '/primitives/color-scales';
const CURVES = Object.keys(TW_CURVES);
// Escala fija del eje de ChromaChart: el mayor C de las 17 curvas (§5.8).
const MAX_CHROMA = Math.max(...Object.values(TW_CURVES).flatMap((curve) => curve.map(([, c]) => c)));
const COPIED_MS = 2000;
const WHITE = [1, 1, 1];

const decimal = (value: number) => String(value).replace('.', ',');
const exportId = (scale: string, step: number) => `export-${scale}-${step}`;

type Field = 'color' | 'name' | 'tint';

export function ScaleGenerator() {
  const t = useTranslations('ToolScales');
  const format = useFormatter();

  const [text, setText] = useState({ color: DEFAULTS.color, name: DEFAULTS.name, tint: decimal(DEFAULTS.tint) });
  const [valid, setValid] = useState({ color: DEFAULTS.color, name: DEFAULTS.name, tint: DEFAULTS.tint });
  const [curve, setCurve] = useState(DEFAULTS.curve);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState(0);
  const [accentSteps, setAccentSteps] = useState<number[]>(STEPS);
  const [neutralSteps, setNeutralSteps] = useState<number[]>(STEPS);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Ajustes de la URL: la página se genera estática, así que se leen al montar.
  useEffect(() => {
    if (!window.location.search) return;
    const state = stateFromSearch(window.location.search);
    setText({ color: state.color, name: state.name, tint: decimal(state.tint) });
    setValid({ color: state.color, name: state.name, tint: state.tint });
    setCurve(state.curve);
  }, []);

  useEffect(() => {
    if (summary) summaryRef.current?.focus();
  }, [summary]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const parsed = { color: parseColor(text.color), name: isPaletteName(text.name) ? text.name : null, tint: parseTint(text.tint) };
  const scales = useMemo(() => build(valid.color, valid.tint, curve), [valid.color, valid.tint, curve]);
  const dark = scales.neutral[STEPS.length - 1].hex;
  const accent = scales.accent.map((row) => row.hex);
  const neutral = scales.neutral.map((row) => row.hex);

  const errors = [
    parsed.color === null ? { field: 'color', message: t('errorColor'), href: '#scale-color' } : null,
    parsed.name === null ? { field: 'name', message: t('errorName'), href: '#scale-name' } : null,
    parsed.tint === null ? { field: 'tint', message: t('errorTint'), href: '#scale-tint' } : null,
    accentSteps.length + neutralSteps.length === 0
      ? { field: 'steps', message: t('errorSteps'), href: `#${exportId(valid.name, STEPS[0])}` }
      : null,
  ].filter((error) => error !== null);
  const showError = (field: Field) => submitted && parsed[field] === null;

  function change(field: Field, value: string) {
    setText((current) => ({ ...current, [field]: value }));
    const next = field === 'color' ? parseColor(value) : field === 'name' ? (isPaletteName(value) ? value : null) : parseTint(value);
    if (next !== null) setValid((current) => ({ ...current, [field]: next }));
  }

  function onDownload() {
    setSubmitted(true);
    if (errors.length) {
      setSummary((count) => count + 1);
      return;
    }
    setSummary(0);
    const json = toFigmaTokens(scales, { name: valid.name, accentSteps, neutralSteps });
    download(new Blob([json], { type: 'application/json' }), 'Value.tokens.json');
  }

  async function copyLink() {
    const { origin, pathname } = window.location;
    await navigator.clipboard.writeText(`${origin}${pathname}${searchFromState({ ...valid, curve })}`);
    setCopied(true);
  }

  const lessonLink = (chunks: ReactNode) => <TextLink href={LESSON}>{chunks}</TextLink>;
  const warnings = scales.warnings.map((warning) => {
    if (warning.code === 'achromatic') return t.rich('warningAchromatic', { link: lessonLink });
    if (warning.code === 'extreme') return t.rich('warningExtreme', { step: warning.step, link: lessonLink });
    const steps = warning.steps.map((item) => item.step).join(', ');
    return t.rich('warningClipped', { count: warning.steps.length, steps, link: lessonLink });
  });

  function scaleTable(name: string, rows: typeof scales.accent, selected: number[], setSelected: (steps: number[]) => void) {
    const ratio = (a: number[], b: number[]) => format.number(contrast(a, b), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (
      <Table label={t('tableCaption', { name })}>
        <caption className="sr-only">{t('tableCaption', { name })}</caption>
        <thead>
          <tr>
            <Th>{t('colExport')}</Th>
            <Th>{t('colStep')}</Th>
            <Th>{t('colOklch')}</Th>
            <Th>{t('colHex')}</Th>
            <Th>{t('colContrastWhite')}</Th>
            <Th>{t('colContrastDark')}</Th>
            <Th>{t('colClip')}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.step}>
              <Td className="py-0">
                <Checkbox
                  id={exportId(name, row.step)}
                  label={t('exportStep', { step: row.step, name })}
                  hideLabel
                  checked={selected.includes(row.step)}
                  onChange={(event) =>
                    setSelected(event.target.checked ? STEPS.filter((s) => s === row.step || selected.includes(s)) : selected.filter((s) => s !== row.step))
                  }
                />
              </Td>
              <Td>{row.step}</Td>
              <Td>
                {/* Sin partir: en móvil, la tabla tiene su propio scroll horizontal (§3.6, entrega §3.12). */}
                <Code className="whitespace-nowrap">{`oklch(${oklchText(row.oklch)})`}</Code>
              </Td>
              <Td>
                <Code className="whitespace-nowrap">{row.hex}</Code>
              </Td>
              <Td>{ratio(hexToRgb(row.hex), WHITE)}</Td>
              <Td>{ratio(hexToRgb(row.hex), hexToRgb(dark))}</Td>
              <Td>{row.clip ? t('clip', { percent: row.clip }) : null}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <div data-component="ScaleGenerator" className="flex flex-col gap-600">
      <section className="flex flex-col gap-400">
        <Heading2>{t('input')}</Heading2>
        <div className="flex flex-col gap-600">
          <div className="flex flex-col gap-200">
            <TextField
              id="scale-color"
              label={t('colorLabel')}
              hint={t('colorHint')}
              code
              autoComplete="off"
              spellCheck={false}
              value={text.color}
              onChange={(event) => change('color', event.target.value)}
              error={showError('color') ? t('colorError') : undefined}
            />
            {/* Hex resultante (§5.10): el color con el que se calcula, el último válido. */}
            <output htmlFor="scale-color" className="flex items-center gap-200 type-body-small text-neutral-subtle">
              <span
                aria-hidden
                className="size-600 shrink-0 rounded-100 border-(length:--t101-border-width-100) border-neutral-default"
                style={{ backgroundColor: valid.color }}
              />
              <span>{t.rich('colorUsed', { code: () => <Code>{valid.color}</Code> })}</span>
            </output>
          </div>
          <TextField
            id="scale-name"
            label={t('nameLabel')}
            hint={t('nameHint')}
            autoComplete="off"
            spellCheck={false}
            value={text.name}
            onChange={(event) => change('name', event.target.value)}
            error={showError('name') ? t('nameError') : undefined}
          />
          <TextField
            id="scale-tint"
            label={t('tintLabel')}
            hint={t('tintHint')}
            inputMode="decimal"
            autoComplete="off"
            value={text.tint}
            onChange={(event) => change('tint', event.target.value)}
            error={showError('tint') ? t('tintError') : undefined}
          />
          <div className="flex flex-col gap-400">
            <Select
              id="scale-curve"
              label={t('curveLabel')}
              options={CURVES.map((name) => ({ value: name, label: name }))}
              value={curve}
              onChange={(event) => setCurve(event.target.value)}
            />
            <p className="type-body-default text-neutral-default">{t('curveIntro')}</p>
            <p className="type-body-default text-neutral-default">{t('curveAdvice')}</p>
            <ChromaChart
              curve={curve}
              steps={STEPS}
              chroma={TW_CURVES[curve].map(([, c]) => c)}
              max={MAX_CHROMA}
              highlight={scales.input.anchorStep}
              highlightLabel={t('yourColor')}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-400">
        <Heading2>{t('result')}</Heading2>
        {warnings.map((warning, i) => (
          <Callout key={i} variant="warning">
            <p className="type-body-default">{warning}</p>
          </Callout>
        ))}
        <div className="flex flex-col gap-600">
          {[
            { name: valid.name, colors: accent, rows: scales.accent, selected: accentSteps, setSelected: setAccentSteps, highlight: true },
            { name: t('scaleNeutral'), colors: neutral, rows: scales.neutral, selected: neutralSteps, setSelected: setNeutralSteps, highlight: false },
          ].map((scale) => (
            <div key={scale.highlight ? 'accent' : 'neutral'} className="flex flex-col gap-400">
              <h3 className="type-heading-3 text-neutral-default">{scale.name}</h3>
              <ColorScale
                name={scale.name}
                colors={scale.colors}
                caption={
                  scale.highlight
                    ? t('captionAccent', { name: scale.name, step: scales.input.anchorStep })
                    : t('captionNeutral')
                }
                highlight={scale.highlight ? String(scales.input.anchorStep) : undefined}
                highlightLabel={scale.highlight ? t('yourColor') : undefined}
              />
              {scaleTable(scale.name, scale.rows, scale.selected, scale.setSelected)}
            </div>
          ))}
          <ScalePreview
            scales={[
              { name: valid.name, colors: accent },
              { name: 'neutral', colors: neutral },
            ]}
            light="#FFFFFF"
            dark={dark}
            lightLabel={t('previewLight')}
            darkLabel={t('previewDark')}
            caption={t('previewCaption')}
          />
        </div>
      </section>

      <section className="flex flex-col gap-400">
        <Heading2>{t('export')}</Heading2>
        {summary && errors.length ? <ErrorSummary ref={summaryRef} title={t('errorTitle')} errors={errors} /> : null}
        <div className="flex flex-wrap items-center gap-200">
          <Button icon={Download} onClick={onDownload}>
            {t('download')}
          </Button>
          <Button variant="secondary" icon={LinkIcon} onClick={copyLink}>
            {t('copyLink')}
          </Button>
          {/* Tras copiar, el texto "Enlace copiado", como el "Copiado" de CodeBlock (1.4.1). */}
          <p aria-live="polite" className="type-caption-default text-success-default">
            {copied ? t('linkCopied') : ''}
          </p>
        </div>
      </section>
    </div>
  );
}
