import { ClockAlert, Info, ThumbsUp, TriangleAlert, type LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

// Anatomía: docs/componentes-v1.md §3.2. No es interactivo.
// Etiqueta fija por variante (D18): con el icono, dice qué tipo de aviso es sin depender del color (1.4.1).
// Icono y etiqueta en text/{rol}/default, como la anatomía (V18). El borde es decorativo.
// La etiqueta lleva el idioma de la interfaz, que puede no ser el de una lección sin traducir.

export type CalloutVariant = 'note' | 'warning' | 'recommendation' | 'pending';

type CalloutProps = {
  variant: CalloutVariant;
  children: ReactNode;
};

const VARIANTS: Record<CalloutVariant, { icon: LucideIcon; box: string; role: string }> = {
  note: { icon: Info, box: 'bg-info-subtle border-info-default', role: 'text-info-default' },
  warning: { icon: TriangleAlert, box: 'bg-warning-subtle border-warning-default', role: 'text-warning-default' },
  recommendation: { icon: ThumbsUp, box: 'bg-accent-subtle border-accent-default', role: 'text-accent-default' },
  pending: { icon: ClockAlert, box: 'bg-neutral-subtle border-neutral-default', role: 'text-neutral-subtle' },
};

export function Callout({ variant, children }: CalloutProps) {
  const t = useTranslations('Callout');
  const locale = useLocale();
  const { icon: Icon, box, role } = VARIANTS[variant];

  return (
    <div
      data-component="Callout"
      data-variant={variant}
      className={`flex gap-400 rounded-container border-(length:--t101-border-width-100) p-400 ${box}`}
    >
      <Icon aria-hidden className={`size-600 shrink-0 ${role}`} />
      <div className="flex min-w-0 flex-1 flex-col gap-200 text-neutral-default">
        <p lang={locale} className={`type-label-default ${role}`}>
          {t(variant)}
        </p>
        <div className="flow">{children}</div>
      </div>
    </div>
  );
}
