'use client';

import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { CodeMarker } from '@/components/CodeMarker';
import { IconButton } from '@/components/IconButton';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §3.4. Sin resaltado de colores en v1 (D08).
// - El área de código tiene scroll horizontal propio y se enfoca con el teclado (1.4.10).
// - V39: el nombre de archivo baja de línea si no cabe (y parte una ruta larga), sin puntos
//   suspensivos: con el espaciado de 1.4.12, o a 320 px, no se pierde texto.
// - Tras copiar aparece el texto "Copiado", no solo un cambio de icono (1.4.1); se anuncia con aria-live.
// - Con `marks` y `legend` es AnnotatedCode (§3.10): cada línea lleva su relleno lateral, las
//   marcadas tienen fondo y marca, y la leyenda va debajo. Copiar copia solo el código.
// - Con `preview` es CodePreview (§3.11): pestañas Markdown / Vista previa con el patrón Tabs de las
//   WAI-ARIA APG, con activación automática (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
//   La vista previa llega renderizada desde el servidor (src/lib/render-markdown-preview.tsx).
//   La pestaña inicial es Markdown, y es la que se ve sin JavaScript. Copiar copia siempre el markdown.

type CodeBlockProps = {
  children: string;
  /** No se ve; sirve para el futuro resaltado y para el atributo de la etiqueta code. */
  language?: string;
  filename?: string;
  /** AnnotatedCode (§3.10): números de línea (desde 1) marcados, en orden; la marca n es la n.ª línea. */
  marks?: number[];
  /** AnnotatedCode: la leyenda, una lista ordenada con una explicación por marca. */
  legend?: ReactNode;
  /** CodePreview (§3.11): el markdown ya renderizado, para la pestaña Vista previa. */
  preview?: ReactNode;
};

type Tab = 'markdown' | 'preview';
const TABS: Tab[] = ['markdown', 'preview'];

const COPIED_MS = 2000;

export function CodeBlock({ children, language, filename, marks, legend, preview }: CodeBlockProps) {
  const t = useTranslations('CodeBlock');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<Tab>('markdown');
  const id = useId();
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const tabId = (value: Tab) => `${id}-tab-${value}`;
  const panelId = (value: Tab) => `${id}-panel-${value}`;
  const code = children.replace(/\n$/, '');

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  }

  // Flechas izquierda/derecha (circulares), Inicio y Fin: mueven el foco y activan la pestaña.
  function onTabKeyDown(event: KeyboardEvent) {
    const index = TABS.indexOf(tab);
    const next = {
      ArrowRight: TABS[(index + 1) % TABS.length],
      ArrowLeft: TABS[(index - 1 + TABS.length) % TABS.length],
      Home: TABS[0],
      End: TABS[TABS.length - 1],
    }[event.key];
    if (!next) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  }

  const copyButton = (
    <div className="flex shrink-0 items-center gap-200">
      <p aria-live="polite" className="type-caption-default text-success-default">
        {copied ? t('copied') : ''}
      </p>
      <IconButton icon={Copy} label={t('copy')} onClick={copy} />
    </div>
  );

  return (
    <div
      data-component={preview ? 'CodePreview' : marks ? 'AnnotatedCode' : 'CodeBlock'}
      className="overflow-hidden rounded-container border-(length:--t101-border-width-100) border-neutral-default bg-neutral-subtle"
    >
      {/* Con preview, la cabecera baja de línea si no cabe (V39): primero las acciones y, a 320 px,
          también "Copiado" y copiar, que van juntos. Sin preview, como siempre. */}
      <div
        className={cx(
          'flex items-center justify-between border-b-(length:--t101-border-width-100) border-neutral-default py-100 ps-400 pe-100',
          preview ? 'flex-wrap gap-y-100' : 'gap-200',
        )}
      >
        <p className="min-w-0 type-caption-default text-neutral-subtle wrap-break-word">{filename}</p>
        {preview ? (
          <div className="flex min-w-0 flex-wrap items-center gap-x-200 gap-y-100">
            {/* Carril de CodeTabs: el mismo lenguaje que ThemeToggle. */}
            <div
              role="tablist"
              aria-label={t('tabs')}
              onKeyDown={onTabKeyDown}
              className="flex gap-050 rounded-300 bg-neutral-strong p-050"
            >
              {TABS.map((value) => {
                const selected = value === tab;
                return (
                  <button
                    key={value}
                    ref={(element) => {
                      tabRefs.current[value] = element;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(value)}
                    aria-selected={selected}
                    aria-controls={panelId(value)}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(value)}
                    // CodeTab, como en Figma: la actual lleva fondo y borde, no solo otro color (1.4.1).
                    // En Figma el borde va por dentro y no cambia el tamaño; en CSS sí, así que la no
                    // actual lleva el mismo borde, transparente. Foco: borde border/focus de
                    // border-width/200 por dentro (focus-ring-inset, que lo pinta sobre el borde).
                    className={cx(
                      'cursor-pointer rounded-control border-(length:--t101-border-width-100) px-300 py-150 type-label-default whitespace-nowrap focus-ring-inset',
                      selected
                        ? 'border-neutral-default bg-neutral-default text-neutral-default'
                        : 'border-transparent text-neutral-subtle hover:bg-neutral-hover active:bg-neutral-active',
                    )}
                  >
                    {t(value)}
                  </button>
                );
              })}
            </div>
            {copyButton}
          </div>
        ) : (
          copyButton
        )}
      </div>
      {/* Región con nombre para que el scroll se pueda enfocar (pre no admite aria-label). Con preview,
          es el panel de la pestaña Markdown, con el nombre de su pestaña. */}
      <div
        {...(preview
          ? { role: 'tabpanel', id: panelId('markdown'), 'aria-labelledby': tabId('markdown'), hidden: tab !== 'markdown' }
          : { role: 'region', 'aria-label': filename ?? t('label') })}
        tabIndex={0}
        className="overflow-x-auto focus-ring-inset"
      >
        {marks ? (
          // w-max min-w-full: el fondo de la línea marcada llega al final de la línea más larga.
          <pre className="w-max min-w-full py-400 type-code-default text-neutral-default">
            <code data-language={language} className="block">
              {code.split('\n').map((line, index) => {
                const mark = marks.indexOf(index + 1) + 1;
                return (
                  <span key={index} className={cx('flex items-center gap-200 px-400', mark > 0 && 'bg-accent-subtle')}>
                    {/* Una línea vacía conserva su alto. */}
                    <span>{line || ' '}</span>
                    {mark > 0 && <CodeMarker number={mark} label={t('mark')} />}
                  </span>
                );
              })}
            </code>
          </pre>
        ) : (
          <pre className="p-400 type-code-default text-neutral-default">
            <code data-language={language}>{code}</code>
          </pre>
        )}
      </div>
      {preview && (
        // Panel Vista previa: fondo background/neutral/default para distinguirlo del código.
        // min-w-0: una tabla ancha tiene su propio scroll (Table), no ensancha el bloque.
        <div
          role="tabpanel"
          id={panelId('preview')}
          aria-labelledby={tabId('preview')}
          hidden={tab !== 'preview'}
          tabIndex={0}
          className="flex min-w-0 flex-col gap-400 bg-neutral-default p-400 type-body-default text-neutral-default focus-ring-inset"
        >
          {preview}
        </div>
      )}
      {legend && (
        <div className="border-t-(length:--t101-border-width-100) border-neutral-default p-400">{legend}</div>
      )}
    </div>
  );
}
