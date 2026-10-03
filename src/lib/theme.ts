// Tema elegido en el ThemeToggle (D07, V10, V21). Módulo sin 'use client' para que el layout
// (componente de servidor) reciba el script como texto.

export type Theme = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 't101-theme';

/** Se ejecuta en <head> antes de pintar, para que no parpadee el tema guardado. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
