# Notas de /design-sync (Claude Design)

Primera sincronización: 2026-10-23, proyecto "DesignToken101" (https://claude.ai/design/p/ac9cc2fa-08a7-44ac-870d-c3fc6cabb398), en la web independiente claude.ai/design, que cierra el 14 de diciembre de 2026. **Movido a Claude el 2026-11-01 (D76):** desde entonces `/design-sync` sube a ese proyecto de claude.ai/design y no llega a Claude. Para que un cambio llegue: subirlo con `/design-sync` y, en Artifacts de Claude, menú de Claude Design ("…"), "Move again"; si lo marca "already moved" o no lo actualiza, borrar el sistema en Claude y volver a moverlo. Antes del 14 de diciembre; después de esa fecha, solo pidiéndoselo a Claude.

## Alcance

- Solo el piloto de `docs/inventory.md` (decisión de Oscar): Button, TextField, Callout, Takeaways y CodeBlock (CodePreview es CodeBlock con `preview`). Para añadir un componente: exportarlo en `pilot/index.tsx`, escribir su vista previa en `previews/` y su documento en `docs/components/`.
- Sin navegación (V63): `guidelines/lesson-page.md` pide `Sidebar`, `SiteHeader`, `LessonHeader`, `PageNav` y `SiteFooter`, que no están en el paquete, y el agente se inventaba el menú. La cabecera (`conventions.md`, "Página de lección: solo la columna de contenido") le dice que no los dibuje. Si algún día se añaden al paquete, quitar ese apartado; `Sidebar` y `MobileNav` necesitarían sustituir `usePathname` de `next/navigation`, como `next/link`.

## Cómo se construye

- El repositorio es una app Next.js sin `dist/`. `pilot/build.mjs` (es el `buildCmd`) crea un paquete en `.cache/dist/`:
  - JS con esbuild desde `pilot/index.tsx`, que reexporta los componentes de `src/components` sin cambios; `@/` se resuelve con `tsconfig.json`.
  - `next/link` se sustituye por un `<a>` (`pilot/next-link.tsx`): Claude Design no tiene el router de Next.
  - `.d.ts` con `tsc` (con `files`, porque `include` no recoge carpetas que empiezan por punto) y una entrada con rutas relativas (los `.d.ts` emitidos conservan `@/`).
  - CSS: `src/app/globals.css` compilado con `@tailwindcss/postcss`, igual que en Next (V44: solo clases de `src/`), más `@import` de Google Fonts para Inter y JetBrains Mono (en la web los sirve `next/font`).
  - Las declaraciones de `--tw-*`, `--t101-duration-*`, `--t101-easing-*` y `--t101-opacity-*` llevan `/* @kind other */` en la misma línea, después del `;` (D76); dentro de los `@property` no, porque ahí no sirve (V62, lo dijo el agente de Claude Design). `@kind` no está documentado: lo que cuenta es `_ds_manifest.json` del proyecto (`DesignSync get_file`), donde esos tokens salen con `"kind": "other"` y `"annotation": "other"`.
  - Aviso conocido del panel de la izquierda de Claude Design: repite el texto del 2026-10-23 (38 propiedades `--tw-*` dentro de clases y 9 tokens sin categoría) aunque `_ds_manifest.json` ya tenga las categorías. Las 38 son internas de Tailwind y el aviso es informativo; no se pueden quitar sin romper estilos (`border-style: var(--tw-border-style)` toma `solid` de su `@property`).
  - `_ds_manifest.json` toma como temas, además de "Dark", tres clases de Tailwind que definen `--tw-*` (`.-translate-x-full`, `.tabular-nums`, `.backdrop-blur-300`), y adivina mal algunas categorías (`--t101-color-text-*` como `font`, `--t101-breakpoint-desktop` como `color`). Sin corregir (2026-11-01).
  - `pilot/icons.ts` se genera desde `src/components/icons.figma.batch.json` (D70): los 26 iconos de TokensDS en `DesignToken101.icons`.
- `DesignToken101Provider` (`pilot/provider.tsx`) envuelve con `NextIntlClientProvider` y `messages/es.json`: sin él, Callout y CodeBlock fallan.
- `Heading2`, `UnorderedList` y el proveedor se exportan en el paquete pero no son tarjetas (`componentSrcMap` con `null`).
- `dtsPropsFor` de Button y TextField: el extractor dejaba `LucideIcon` y `CSSProperties` sin definir y perdía las props nativas de `<button>` e `<input>`. Si cambian sus props en `src/components`, hay que actualizar estas dos entradas a mano.
- Pasos de una resincronización: `node .design-sync/pilot/build.mjs`, después `resync.mjs` con `--entry .design-sync/.cache/dist/index.js --node-modules ./node_modules --remote .design-sync/.cache/remote-sync.json`. Sin Playwright, la etapa `validate` falla con `[RENDER_SKIPPED]`; la ejecución final va con `--no-render-check` solo si lo que cambia no afecta al aspecto (el 2026-11-01 se comprobó generando el CSS con el `build.mjs` anterior y comparándolo) o si Oscar revisa las vistas previas.

## Verificación

- Sin Playwright: Oscar eligió revisar él las vistas previas (`.review.html`) en vez de instalar Chromium. Las aprobó el 2026-10-23 (fuentes, textos en español y colores). La captura (`package-capture.mjs`) no se ha ejecutado nunca y no hay notas en `.cache/review/` ni `.render-check.json`; por eso tampoco se llama a `report_validate`.
- Avisos conocidos: `[FONT_REMOTE]` (fuentes de Google Fonts, a propósito); `[RENDER_SKIPPED]` (sin Playwright); "tokens: 1 missing, below threshold".

## Riesgos al resincronizar

- `dtsPropsFor` (Button, TextField) está escrito a mano: se queda viejo si cambian sus props.
- `pilot/build.mjs` fija la versión del paquete en 1.2.0 (sistema, D65): cambiarla con el sistema.
- El CSS es el de toda la web: una clase que deje de usarse en `src/` desaparece también de Claude Design, aunque la cite `conventions.md`. Validar la cabecera contra `ds-bundle/_ds_bundle.css` en cada sincronización, también cada combinación de la fila de espaciado: no existen todas (el 2026-11-01 faltaban `gap-150`, `p-300`, `px-100` y `px-600`, y la fila pasó a la lista exacta de cada prefijo).
- Las fuentes llegan por red (Google Fonts), no van en el paquete.
- Las vistas previas solo se han visto en el navegador de Oscar, en Light; Dark no se comprobó en Claude Design.
