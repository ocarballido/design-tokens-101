import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

// Provisional, sin estilo (paso 4). Anatomía: docs/componentes-v1.md §3.2.
// Etiqueta fija por variante (D18): dice qué tipo de aviso es sin depender del color.
// La etiqueta lleva el idioma de la interfaz, que puede no ser el de una lección sin traducir.

export type CalloutVariant = 'note' | 'warning' | 'recommendation' | 'pending';

type CalloutProps = {
  variant: CalloutVariant;
  children: ReactNode;
};

export function Callout({ variant, children }: CalloutProps) {
  const t = useTranslations('Callout');
  const locale = useLocale();

  return (
    <div data-component="Callout" data-variant={variant}>
      <p>
        <strong lang={locale}>{t(variant)}</strong>
      </p>
      {children}
    </div>
  );
}
