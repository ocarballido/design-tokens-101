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
  searchFromState,
  stateFromSearch,
  suggest,
  toFigmaTokens,
  DEFAULTS,
  type ScaleState,
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
import { TextField, fieldHint, fieldLabel } from '@/components/TextField';
import { TextLink } from '@/components/TextLink';
import { download } from '@/lib/download';

// Herramienta "Generar escalas" (/tools/color-scales; T8, T22, T23, T24). Estructura de
// componentes-v1.md §5.10 y plantillas de entrega-diseno.md §3.12.
// El cálculo es tools/scales.mjs, la traducción de tools/scales.py que comprueba `npm test`: aquí
// no se calcula nada. Todo pasa en el navegador.
// - El resultado se genera al montar (con los valores por defecto o los de la URL) y al pulsar
//   "Generar escalas" (C24). Con un campo no válido, el botón muestra el ErrorSummary encima (D52) y
//   no hay resultado hasta que se corrija y se pulse otra vez; si todo es válido, el foco pasa al
//   título "Resultado". La gráfica de la curva sigue al selector al momento, con el color del campo
//   si es válido.
// - El error del color y del nombre se ve desde que se sale del campo (blur) y mientras siga sin ser
//   válido, y en los dos al pulsar el botón (C22). Si el campo pierde el foco por un clic, el error
//   aparece al soltar: si apareciera antes, el contenido bajaría entre el mousedown y el mouseup y el
//   clic se perdería (pasó en la prueba de la primera versión).
// - El tinte es un deslizador nativo de 0 a 1 (C23): no tiene valor no válido.
// - La curva y el nombre los propone suggest() a partir del color hasta que el usuario los cambia
//   (C25, C26); null significa "el propuesto".
// - La descarga está siempre activa (D14) y solo comprueba que haya pasos marcados: si no, aparece
//   su ErrorSummary encima (D52) y recibe el foco.
// - Los ajustes se leen de la URL al cargar (?color=33CC99&tint=0.5, más name y curve si el usuario
//   los eligió) y el botón secundario copia el enlace del resultado.

const LESSON = '/primitives/color-scales';
const CURVES = Object.keys(TW_CURVES);
// Escala fija del eje de ChromaChart: el mayor C de las 17 curvas (§5.8).
const MAX_CHROMA = Math.max(...Object.values(TW_CURVES).flatMap((curve) => curve.map(([, c]) => c)));
const COPIED_MS = 2000;
const WHITE = [1, 1, 1];

const decimal = (value: number) => String(value).replace('.', ',');
const exportId = (scale: string, step: number) => `export-${scale}-${step}`;

type Field = 'color' | 'name';

export function ScaleGenerator() {
  const t = useTranslations('ToolScales');
  const format = useFormatter();

  const [text, setText] = useState({ color: DEFAULTS.color, name: '' });
  // Último color válido del campo: de él salen las propuestas mientras el campo no es válido.
  const [lastColor, setLastColor] = useState(DEFAULTS.color);
  const [nameEdited, setNameEdited] = useState(false);
  const [curveChoice, setCurveChoice] = useState<string | null>(DEFAULTS.curve);
  const [tint, setTint] = useState(DEFAULTS.tint);
  const [generated, setGenerated] = useState<ScaleState | null>(DEFAULTS);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ color: false, name: false });
  const [generateSummary, setGenerateSummary] = useState(0);
  const [resultFocus, setResultFocus] = useState(0);
  const [downloadSummary, setDownloadSummary] = useState(0);
  const [accentSteps, setAccentSteps] = useState<number[]>(STEPS);
  const [neutralSteps, setNeutralSteps] = useState<number[]>(STEPS);
  const [copied, setCopied] = useState(false);
  const generateSummaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const downloadSummaryRef = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);

  // Ajustes de la URL: la página se genera estática, así que se leen al montar y se genera con ellos.
  useEffect(() => {
    if (!window.location.search) return;
    const state = stateFromSearch(window.location.search);
    setText({ color: state.color, name: state.name ?? '' });
    setLastColor(state.color);
    setNameEdited(state.name !== null);
    setCurveChoice(state.curve);
    setTint(state.tint);
    setGenerated(state);
  }, []);

  // Si hay un botón del puntero pulsado (C22, arriba).
  useEffect(() => {
    const down = () => (pointerDown.current = true);
    const up = () => (pointerDown.current = false);
    document.addEventListener('pointerdown', down, true);
    document.addEventListener('pointerup', up, true);
    document.addEventListener('pointercancel', up, true);
    return () => {
      document.removeEventListener('pointerdown', down, true);
      document.removeEventListener('pointerup', up, true);
      document.removeEventListener('pointercancel', up, true);
    };
  }, []);

  useEffect(() => {
    if (generateSummary) generateSummaryRef.current?.focus();
  }, [generateSummary]);

  useEffect(() => {
    if (resultFocus) resultRef.current?.focus();
  }, [resultFocus]);

  useEffect(() => {
    if (downloadSummary) downloadSummaryRef.current?.focus();
  }, [downloadSummary]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  // Entrada: lo que hay en los campos, con la curva y el nombre propuestos si el usuario no los eligió.
  const proposal = useMemo(() => suggest(lastColor), [lastColor]);
  const name = nameEdited ? text.name : proposal.name;
  const curve = curveChoice ?? proposal.curve;
  const parsed = { color: parseColor(text.color), name: isPaletteName(name) ? name : null };
  // La gráfica sigue al selector y al campo de color al momento (C24).
  const chartInput = useMemo(() => build(parsed.color ?? lastColor, tint, curve).input, [parsed.color, lastColor, tint, curve]);

  // Resultado: lo generado al montar o con el botón.
  const result = useMemo(() => {
    if (!generated) return null;
    const own = suggest(generated.color);
    const resolved = { ...generated, name: generated.name ?? own.name, curve: generated.curve ?? own.curve };
    return { ...resolved, scales: build(resolved.color, resolved.tint, resolved.curve) };
  }, [generated]);

  const inputErrors = [
    parsed.color === null ? { message: t('errorColor'), href: '#scale-color' } : null,
    parsed.name === null ? { message: t('errorName'), href: '#scale-name' } : null,
  ].filter((error) => error !== null);
  const showError = (field: Field) => (submitted || touched[field]) && parsed[field] === null;
  function touch(field: Field) {
    const show = () => setTouched((current) => (current[field] ? current : { ...current, [field]: true }));
    if (!pointerDown.current) return show();
    // Después del click, que el navegador lanza justo tras el pointerup.
    document.addEventListener('pointerup', () => setTimeout(show), { once: true });
    document.addEventListener('pointercancel', () => setTimeout(show), { once: true });
  }

  function changeColor(value: string) {
    setText((current) => ({ ...current, color: value }));
    const next = parseColor(value);
    if (next !== null) setLastColor(next);
  }

  function changeName(value: string) {
    setText((current) => ({ ...current, name: value }));
    setNameEdited(true);
  }

  function onGenerate() {
    setSubmitted(true);
    if (inputErrors.length || parsed.color === null) {
      setGenerated(null);
      setGenerateSummary((count) => count + 1);
      return;
    }
    setGenerateSummary(0);
    setGenerated({ color: parsed.color, name: nameEdited ? name : null, tint, curve: curveChoice });
    setResultFocus((count) => count + 1);
  }

  function onDownload() {
    if (!result) return;
    if (accentSteps.length + neutralSteps.length === 0) {
      setDownloadSummary((count) => count + 1);
      return;
    }
    setDownloadSummary(0);
    const json = toFigmaTokens(result.scales, { name: result.name, accentSteps, neutralSteps });
    download(new Blob([json], { type: 'application/json' }), 'Value.tokens.json');
  }

  async function copyLink() {
    if (!generated) return;
    const { origin, pathname } = window.location;
    await navigator.clipboard.writeText(`${origin}${pathname}${searchFromState(generated)}`);
    setCopied(true);
  }

  const lessonLink = (chunks: ReactNode) => <TextLink href={LESSON}>{chunks}</TextLink>;
  // El recorte es habitual y va como nota; la marca sin croma y el paso extremo, como aviso (C25).
  const warnings = (result?.scales.warnings ?? []).map((warning) => {
    if (warning.code === 'achromatic') return { variant: 'warning' as const, text: t.rich('warningAchromatic', { link: lessonLink }) };
    if (warning.code === 'extreme') return { variant: 'warning' as const, text: t.rich('warningExtreme', { step: warning.step, link: lessonLink }) };
    const steps = warning.steps.map((item) => item.step).join(', ');
    return { variant: 'note' as const, text: t.rich('warningClipped', { count: warning.steps.length, steps, link: lessonLink }) };
  });

  type Rows = ReturnType<typeof build>['accent'];
  function scaleTable(name: string, rows: Rows, dark: string, selected: number[], setSelected: (steps: number[]) => void) {
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

  const scales = result?.scales;
  const dark = scales ? scales.neutral[STEPS.length - 1].hex : '';
  const accent = scales ? scales.accent.map((row) => row.hex) : [];
  const neutral = scales ? scales.neutral.map((row) => row.hex) : [];

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
              onChange={(event) => changeColor(event.target.value)}
              onBlur={() => touch('color')}
              error={showError('color') ? t('colorError') : undefined}
            />
            {/* Hex resultante (§5.10): el color del campo, o el último válido. */}
            <output htmlFor="scale-color" className="flex items-center gap-200 type-body-small text-neutral-subtle">
              <span
                aria-hidden
                className="size-600 shrink-0 rounded-100 border-(length:--t101-border-width-100) border-neutral-default"
                style={{ backgroundColor: lastColor }}
              />
              <span>{t.rich('colorUsed', { code: () => <Code>{lastColor}</Code> })}</span>
            </output>
          </div>
          <TextField
            id="scale-name"
            label={t('nameLabel')}
            hint={t('nameHint')}
            autoComplete="off"
            spellCheck={false}
            value={name}
            onChange={(event) => changeName(event.target.value)}
            onBlur={() => touch('name')}
            error={showError('name') ? t('nameError') : undefined}
          />
          {/* Deslizador nativo (C23, §5.10b): flechas del teclado y clic en la pista (2.5.7); color
              border/accent/strong, como el borde de la casilla marcada. */}
          <div className="flex flex-col gap-100">
            <label htmlFor="scale-tint" className={fieldLabel}>
              {t('tintLabel')}
            </label>
            <p id="scale-tint-hint" className={fieldHint}>
              {t('tintHint')}
            </p>
            <div className="flex items-center gap-300">
              <input
                id="scale-tint"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={tint}
                aria-describedby="scale-tint-hint"
                onChange={(event) => setTint(Number(event.target.value))}
                className="h-600 min-w-0 flex-1 cursor-pointer accent-(--t101-color-border-accent-strong) focus-ring"
              />
              <output htmlFor="scale-tint" className="min-w-1200 type-body-default text-neutral-default tabular-nums">
                {decimal(tint)}
              </output>
            </div>
          </div>
          <div className="flex flex-col gap-400">
            <Select
              id="scale-curve"
              label={t('curveLabel')}
              options={CURVES.map((option) => ({ value: option, label: option }))}
              value={curve}
              onChange={(event) => setCurveChoice(event.target.value)}
            />
            <p className="type-body-default text-neutral-default">{t('curveIntro')}</p>
            <p className="type-body-default text-neutral-default">{t('curveAdvice')}</p>
            <ChromaChart
              curve={curve}
              steps={STEPS}
              chroma={TW_CURVES[curve].map(([, c]) => c)}
              max={MAX_CHROMA}
              highlight={chartInput.anchorStep}
              highlightLabel={t('yourColor')}
              highlightColor={chartInput.hex}
            />
          </div>
          <div className="flex flex-col gap-400">
            {generateSummary && inputErrors.length ? (
              <ErrorSummary ref={generateSummaryRef} title={t('generateErrorTitle')} errors={inputErrors} />
            ) : null}
            <div>
              <Button onClick={onGenerate}>{t('generate')}</Button>
            </div>
          </div>
        </div>
      </section>

      {result && scales ? (
        <>
          <section className="flex flex-col gap-400">
            <div className="flex flex-col gap-200">
              <Heading2 ref={resultRef} tabIndex={-1} className="type-heading-2 text-neutral-subtle focus-ring">
                {t('result')}
              </Heading2>
              <p className="type-body-small text-neutral-subtle">
                {t.rich('resultSummary', { code: () => <Code>{result.color}</Code>, tint: decimal(result.tint), curve: result.curve })}
              </p>
            </div>
            {warnings.map((warning, i) => (
              <Callout key={i} variant={warning.variant}>
                <p className="type-body-default">{warning.text}</p>
              </Callout>
            ))}
            <div className="flex flex-col gap-600">
              {[
                { name: result.name, colors: accent, rows: scales.accent, selected: accentSteps, setSelected: setAccentSteps, highlight: true },
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
                  {scaleTable(scale.name, scale.rows, dark, scale.selected, scale.setSelected)}
                </div>
              ))}
              <ScalePreview
                scales={[
                  { name: result.name, colors: accent },
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
            {downloadSummary && accentSteps.length + neutralSteps.length === 0 ? (
              <ErrorSummary
                ref={downloadSummaryRef}
                title={t('errorTitle')}
                errors={[{ message: t('errorSteps'), href: `#${exportId(result.name, STEPS[0])}` }]}
              />
            ) : null}
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
        </>
      ) : null}
    </div>
  );
}
