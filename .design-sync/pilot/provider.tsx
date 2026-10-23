'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import messages from '../../messages/es.json';

// Callout y CodeBlock leen sus textos fijos con next-intl. En la web los da el layout raíz; en
// Claude Design los da este envoltorio, con el único idioma de la web (P24).
export function DesignToken101Provider({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="es" messages={messages} timeZone="Europe/Madrid">
      {children}
    </NextIntlClientProvider>
  );
}
