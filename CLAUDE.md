# DesignToken101

Web-curso que enseña a planificar, crear e implementar tokens de diseño con Figma + DTCG + Tailwind CSS. La web usa su propio sistema de tokens, el mismo que enseña. Autor: Oscar Carballido.

Los documentos de `proyecto/` son la fuente de verdad compartida entre las sesiones de contenido, diseño y desarrollo. Escribe siempre en español.

## Lee primero

@proyecto/decisiones.md
@proyecto/estado.md

Lee bajo demanda, cuando el trabajo lo pida:
- `proyecto/decisiones-detalle.md`: el porqué de cada decisión (motivo, fuentes, opciones descartadas). `decisiones.md` solo tiene el resumen (P22).
- `proyecto/historial.md`: detalle de lo hecho en cada frente (pruebas, cifras, hallazgos). Al cerrar un bloque, el detalle va aquí y `estado.md` queda corto (P21).
- `proyecto/sistema-tokens-v1.md`: especificación de los tokens (valores, nombres, modos, estilos de texto). Fuente de verdad de los tokens que no salen de Figma.
- `proyecto/entrega-diseno.md`: entrega del diseño a desarrollo (variables, componentes, estados y plantilla).
- `proyecto/paso-7-tokens.md`: qué exporta Figma, comparación Style Dictionary / Terrazzo y propuesta para Tailwind (paso 7).
- `proyecto/componentes-v1.md`: anatomía de cada componente (props, partes, tokens por estado, accesibilidad).
- `proyecto/fase-1-fundamentos-tokens.md`: teoría de base del curso (histórico).
- `content/README.md`: convenciones de las lecciones MDX.

## Reglas de trabajo

- **No improvises sobre la especificación.** Si algo falta o se contradice, plantea las opciones a Oscar y espera su decisión (protocolo en `proyecto/decisiones.md`).
- **Quien decide, escribe:** en el mismo commit, el texto completo de la decisión en `proyecto/decisiones-detalle.md`, su resumen de una línea en `proyecto/decisiones.md` y el documento afectado. Numeración de la sesión de desarrollo: `V01`, `V02`…
- **Al terminar un bloque de trabajo**, añade el detalle a `proyecto/historial.md`, deja en tu apartado de `proyecto/estado.md` solo lo que sigue abierto y, si afecta al curso, añade el punto a "Pendiente de reflejar en el contenido".
- **Verifica antes de configurar:** consulta la documentación oficial (Next.js, next-intl, MDX, Tailwind CSS, Style Dictionary, Terrazzo) y cítala al tomar una decisión. Separa lo que dice la fuente de tu recomendación. Lo no verificado se marca como pendiente.
- **Solo tokens:** ningún color, espacio, radio, grosor ni tamaño escrito a mano en los componentes. Todo sale de las variables `--t101-*` (S27).
- **Accesibilidad (WCAG 2.2 AA):** foco visible con `:focus-visible` (anillo `--t101-border-width-200` + `--t101-color-border-focus`), objetivos de 24 × 24 px como mínimo, `aria-*` según `proyecto/componentes-v1.md`, sin scroll horizontal de página a 320 px.

## Estructura del repositorio

- `content/{locale}/NN-seccion/NN-pagina.mdx`: lecciones (C6). La web se publica solo en español (P24); la parte técnica de idiomas sigue en el código, sin uso.
- `proyecto/`: documentos del proyecto, compartidos entre sesiones (decisiones, estado, historial, especificación).
- `docs/`: documentación del sistema que propone la guía de ds4agents (P28). ds4agents lo copia literalmente, salvo `inventory.md`, a su `docs/sistema/libreria/` (D72): un cambio en `docs/` incluye avisar a Oscar, en la misma tarea, de que hay que copiarlo a ds4agents.
- `tools/`: scripts de escalas y contraste (`python3 tools/scales.py`, `python3 tools/semantic.py`) y comprobación del contenido compilado (`npm run build && npm run check:content`).
- `tools/scales.mjs`, `tools/figma-to-dtcg.mjs` y `tools/zip.mjs`: la lógica de las herramientas de la web (T22 a T24), en módulos sin dependencias que usan la web y los scripts. `tests/`: sus pruebas (`npm test`, con `node:test`); `tests/fixtures/scales-cases.json` se regenera con `python3 tests/fixtures/scales-cases.py` si cambia el método de `scales.py`.
- `src/`: la aplicación Next.js. `app/[section]/[lesson]/page.tsx` carga las lecciones (sin segmento de idioma, V45); `lib/content.ts` lee `content/`; `components/`, los componentes; `i18n/`, next-intl; `mdx-components.tsx`, los componentes del MDX.
- `messages/{locale}.json`: textos de la interfaz (next-intl).
- `tokens/figma/`: exportación de Figma, sin editar (C10). `tokens/dtcg/`: DTCG normalizado (generado). `tokens/code-only.tokens.json`: tokens solo de código, iguales en todos los modos (desde el 2026-10-04 no hay tokens de código por tema: `overlay` y `translucent` salen de Figma, V31). `tokens/tokens101.resolver.json`: une los modos (V08).
- `src/styles/tokens.css` y `src/styles/theme.css`: capas 1 y 2 de tokens, **generadas**. No se editan a mano: `npm run tokens` y después `npm run check:tokens` (V12).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, next-intl, `@next/mdx`, despliegue en Vercel (C1, C3).
