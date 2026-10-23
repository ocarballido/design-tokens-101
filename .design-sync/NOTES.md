# Notas de /design-sync (Claude Design)

Primera sincronización: 2026-10-23, proyecto "DesignToken101" (https://claude.ai/design/p/ac9cc2fa-08a7-44ac-870d-c3fc6cabb398).

## Alcance

- Solo el piloto de `docs/inventory.md` (decisión de Oscar): Button, TextField, Callout, Takeaways y CodeBlock (CodePreview es CodeBlock con `preview`). Para añadir un componente: exportarlo en `pilot/index.tsx`, escribir su vista previa en `previews/` y su documento en `docs/components/`.

## Cómo se construye

- El repositorio es una app Next.js sin `dist/`. `pilot/build.mjs` (es el `buildCmd`) crea un paquete en `.cache/dist/`:
  - JS con esbuild desde `pilot/index.tsx`, que reexporta los componentes de `src/components` sin cambios; `@/` se resuelve con `tsconfig.json`.
  - `next/link` se sustituye por un `<a>` (`pilot/next-link.tsx`): Claude Design no tiene el router de Next.
  - `.d.ts` con `tsc` (con `files`, porque `include` no recoge carpetas que empiezan por punto) y una entrada con rutas relativas (los `.d.ts` emitidos conservan `@/`).
  - CSS: `src/app/globals.css` compilado con `@tailwindcss/postcss`, igual que en Next (V44: solo clases de `src/`), más `@import` de Google Fonts para Inter y JetBrains Mono (en la web los sirve `next/font`).
  - `pilot/icons.ts` se genera desde `src/components/icons.figma.batch.json` (D70): los 26 iconos de TokensDS en `DesignToken101.icons`.
- `DesignToken101Provider` (`pilot/provider.tsx`) envuelve con `NextIntlClientProvider` y `messages/es.json`: sin él, Callout y CodeBlock fallan.
- `Heading2`, `UnorderedList` y el proveedor se exportan en el paquete pero no son tarjetas (`componentSrcMap` con `null`).
- `dtsPropsFor` de Button y TextField: el extractor dejaba `LucideIcon` y `CSSProperties` sin definir y perdía las props nativas de `<button>` e `<input>`. Si cambian sus props en `src/components`, hay que actualizar estas dos entradas a mano.
- Pasos de una resincronización: `node .design-sync/pilot/build.mjs`, después `resync.mjs` con `--entry .design-sync/.cache/dist/index.js --node-modules ./node_modules`.

## Verificación

- Sin Playwright: Oscar eligió revisar él las vistas previas (`.review.html`) en vez de instalar Chromium. Las aprobó el 2026-10-23 (fuentes, textos en español y colores). La captura (`package-capture.mjs`) no se ejecutó y no hay notas en `.cache/review/`; `resync.mjs` sale con la etapa `capture` en error por eso (`playwright not installed`).
- Avisos conocidos: `[FONT_REMOTE]` (fuentes de Google Fonts, a propósito); `[RENDER_SKIPPED]` (sin Playwright); "tokens: 1 missing, below threshold".

## Riesgos al resincronizar

- `dtsPropsFor` (Button, TextField) está escrito a mano: se queda viejo si cambian sus props.
- `pilot/build.mjs` fija la versión del paquete en 1.2.0 (sistema, D65): cambiarla con el sistema.
- El CSS es el de toda la web: una clase que deje de usarse en `src/` desaparece también de Claude Design, aunque la cite `conventions.md`. Validar la cabecera contra `ds-bundle/_ds_bundle.css` en cada sincronización.
- Las fuentes llegan por red (Google Fonts), no van en el paquete.
- Las vistas previas solo se han visto en el navegador de Oscar, en Light; Dark no se comprobó en Claude Design.
