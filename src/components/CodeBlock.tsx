'use client';

import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';
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

type CodeBlockProps = {
  children: string;
  /** No se ve; sirve para el futuro resaltado y para el atributo de la etiqueta code. */
  language?: string;
  filename?: string;
  /** AnnotatedCode (§3.10): números de línea (desde 1) marcados, en orden; la marca n es la n.ª línea. */
  marks?: number[];
  /** AnnotatedCode: la leyenda, una lista ordenada con una explicación por marca. */
  legend?: ReactNode;
};

const COPIED_MS = 2000;

export function CodeBlock({ children, language, filename, marks, legend }: CodeBlockProps) {
  const t = useTranslations('CodeBlock');
  const [copied, setCopied] = useState(false);
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

  return (
    <div
      data-component={marks ? 'AnnotatedCode' : 'CodeBlock'}
      className="overflow-hidden rounded-container border-(length:--t101-border-width-100) border-neutral-default bg-neutral-subtle"
    >
      <div className="flex items-center justify-between gap-200 border-b-(length:--t101-border-width-100) border-neutral-default py-100 ps-400 pe-100">
        <p className="min-w-0 type-caption-default text-neutral-subtle wrap-break-word">{filename}</p>
        <div className="flex shrink-0 items-center gap-200">
          <p aria-live="polite" className="type-caption-default text-success-default">
            {copied ? t('copied') : ''}
          </p>
          <IconButton icon={Copy} label={t('copy')} onClick={copy} />
        </div>
      </div>
      {/* Región con nombre para que el scroll se pueda enfocar (pre no admite aria-label). */}
      <div
        role="region"
        aria-label={filename ?? t('label')}
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
      {legend && (
        <div className="border-t-(length:--t101-border-width-100) border-neutral-default p-400">{legend}</div>
      )}
    </div>
  );
}
