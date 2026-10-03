'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { IconButton } from '@/components/IconButton';
import { usePathname } from '@/i18n/navigation';

// Panel de navegación móvil (D19, V25): entra desde la izquierda por encima del contenido, con
// el ancho del sidebar (size/sidebar/width) y un overlay (color/background/overlay) sobre el resto.
// Arriba, los selectores de idioma y tema; debajo, el sidebar. El botón de cerrar es li:x.
// Es un <dialog> modal (V22): el navegador deja inerte la página, lleva el foco dentro y lo cierra
// con Escape (https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).
// Mientras está abierto, la página no hace scroll; solo el panel (base.css).
// Animación de duration/200 y easing/standard (V24); sin animación con prefers-reduced-motion.
// Se cierra al navegar, al pulsar el overlay y al pasar a escritorio, donde el sidebar ya se ve.

type MobileNavProps = {
  /** Logotipo enlazado, igual que en la cabecera. */
  logo: ReactNode;
  /** Selectores de idioma y tema. */
  selectors: ReactNode;
  /** El sidebar. */
  children: ReactNode;
};

/** Duración de un token en ms. Al minificar, el CSS puede escribir 200ms como .2s. */
function tokenMs(name: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const number = parseFloat(value) || 0;
  return value.endsWith('ms') ? number : number * 1000;
}

export function MobileNav({ logo, selectors, children }: MobileNavProps) {
  const t = useTranslations('MobileNav');
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    if (open) {
      if (!element.open) element.showModal();
      // El foco empieza en el botón de cerrar, que ocupa el sitio del botón de menú.
      element.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      // Un fotograma después, para que la transición parta de la posición cerrada.
      const frame = requestAnimationFrame(() => element.setAttribute('data-open', ''));
      return () => cancelAnimationFrame(frame);
    }

    if (!element.open) return;
    element.removeAttribute('data-open');
    // Se cierra el <dialog> cuando termina la animación de salida.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => element.close(), reduced ? 0 : tokenMs('--t101-duration-200'));
    return () => clearTimeout(timer);
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

  // Un clic fuera del panel cae en el ::backdrop, que pertenece al propio <dialog>.
  function closeOnOverlay(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const panel = event.currentTarget.getBoundingClientRect();
    if (event.clientX > panel.right || event.clientY > panel.bottom) setOpen(false);
  }

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
        // Escape: se anima el cierre en vez de cerrar de golpe.
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        onClick={closeOnOverlay}
        className={[
          'm-0 h-dvh max-h-none w-sidebar max-w-full overflow-y-auto overscroll-contain',
          'border-e-(length:--t101-border-width-100) border-neutral-default bg-neutral-default text-neutral-default',
          '-translate-x-full data-open:translate-x-0',
          'backdrop:bg-overlay backdrop:opacity-0 data-open:backdrop:opacity-100',
          'motion-safe:transition-transform motion-safe:duration-(--t101-duration-200) motion-safe:ease-standard',
          'motion-safe:backdrop:transition-opacity motion-safe:backdrop:duration-(--t101-duration-200) motion-safe:backdrop:ease-standard',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b-(length:--t101-border-width-100) border-neutral-default p-400">
          {logo}
          <IconButton icon={X} label={t('close')} data-autofocus onClick={() => setOpen(false)} />
        </div>
        <div className="flex flex-wrap gap-200 border-b-(length:--t101-border-width-100) border-neutral-default p-400">
          {selectors}
        </div>
        {children}
      </dialog>
    </>
  );
}
