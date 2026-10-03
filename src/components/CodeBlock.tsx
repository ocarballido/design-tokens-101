'use client';

import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { IconButton } from '@/components/IconButton';

// Anatomía: docs/componentes-v1.md §3.4. Sin resaltado de colores en v1 (D08).
// - El área de código tiene scroll horizontal propio y se enfoca con el teclado (1.4.10).
// - Tras copiar aparece el texto "Copiado", no solo un cambio de icono (1.4.1); se anuncia con aria-live.

type CodeBlockProps = {
  children: string;
  /** No se ve; sirve para el futuro resaltado y para el atributo de la etiqueta code. */
  language?: string;
  filename?: string;
};

const COPIED_MS = 2000;

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
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
      data-component="CodeBlock"
      className="overflow-hidden rounded-container border-(length:--t101-border-width-100) border-neutral-default bg-neutral-subtle"
    >
      <div className="flex items-center justify-between gap-200 border-b-(length:--t101-border-width-100) border-neutral-default py-100 ps-400 pe-100">
        <p className="min-w-0 truncate type-caption-default text-neutral-subtle">{filename}</p>
        <div className="flex items-center gap-200">
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
        <pre className="p-400 type-code-default text-neutral-default">
          <code data-language={language}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
