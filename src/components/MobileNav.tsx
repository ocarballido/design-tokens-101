'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { IconButton } from '@/components/IconButton';
import { usePathname } from '@/i18n/navigation';

// Panel de navegación móvil a pantalla completa (D19, D21): selectores de idioma y tema arriba y
// sidebar debajo. El botón de menú pasa a cerrar (li:x).
// Es un <dialog> modal: el navegador deja inerte el resto de la página, lleva el foco dentro y lo
// cierra con Escape (https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).
// Se cierra al navegar y al pasar a escritorio, donde el sidebar ya se ve.

type MobileNavProps = {
  /** Logotipo enlazado, igual que en la cabecera. */
  logo: ReactNode;
  /** Selectores de idioma y tema. */
  selectors: ReactNode;
  /** El sidebar. */
  children: ReactNode;
};

export function MobileNav({ logo, selectors, children }: MobileNavProps) {
  const t = useTranslations('MobileNav');
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    // El foco empieza en el botón de cerrar, que ocupa el sitio del botón de menú.
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }, [open]);

  // Al navegar a otra lección, el panel se cierra.
  useEffect(() => setOpen(false), [pathname]);

  // D11: desde 64rem el sidebar es fijo y el panel no hace falta.
  useEffect(() => {
    const desktop = window.matchMedia(
      `(width >= ${getComputedStyle(document.documentElement).getPropertyValue('--t101-breakpoint-desktop').trim()})`,
    );
    const onChange = () => desktop.matches && setOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <IconButton
        icon={Menu}
        label={t('open')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      />
      <dialog
        ref={dialog}
        aria-label={t('label')}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-neutral-default text-neutral-default"
      >
        {open ? (
          <>
            <div className="flex items-center justify-between border-b-(length:--t101-border-width-100) border-neutral-default p-400">
              {logo}
              <IconButton icon={X} label={t('close')} data-autofocus onClick={() => setOpen(false)} />
            </div>
            <div className="flex flex-wrap gap-200 border-b-(length:--t101-border-width-100) border-neutral-default p-400">
              {selectors}
            </div>
            {children}
          </>
        ) : null}
      </dialog>
    </>
  );
}
