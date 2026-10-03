'use client';

import { useEffect } from 'react';

// V28: publica la altura de la cabecera sticky en --site-header-height (en <html>).
// No es un token: es una medida del contenido (logotipo, selectores y padding), distinta en
// escritorio y en móvil. La usan el sidebar sticky (top y alto máximo) y scroll-padding,
// para que las anclas y el foco no queden tapados por la cabecera (2.4.11).

export function HeaderHeight({ target }: { target: string }) {
  useEffect(() => {
    const header = document.getElementById(target);
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--site-header-height');
    };
  }, [target]);

  return null;
}
