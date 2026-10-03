# Tokens101

Web-curso que enseña a planificar, crear e implementar tokens de diseño con Figma + DTCG + Tailwind CSS. La web usa su propio sistema de tokens, el mismo que enseña. Autor: Oscar Carballido.

Los documentos de `docs/` son la fuente de verdad compartida entre las sesiones de contenido, diseño y desarrollo. Escribe siempre en español.

## Lee primero

@docs/decisiones.md
@docs/estado.md

Lee bajo demanda, cuando el trabajo lo pida:
- `docs/sistema-tokens-v1.md`: especificación de los tokens (valores, nombres, modos, estilos de texto). Fuente de verdad de los tokens que no salen de Figma.
- `docs/entrega-diseno.md`: entrega del diseño a desarrollo (variables, componentes, estados y plantilla).
- `docs/paso-7-tokens.md`: qué exporta Figma, comparación Style Dictionary / Terrazzo y propuesta para Tailwind (paso 7).
- `docs/componentes-v1.md`: anatomía de cada componente (props, partes, tokens por estado, accesibilidad).
- `docs/fase-1-fundamentos-tokens.md`: teoría de base del curso (histórico).
- `content/README.md`: convenciones de las lecciones MDX.

## Reglas de trabajo

- **No improvises sobre la especificación.** Si algo falta o se contradice, plantea las opciones a Oscar y espera su decisión (protocolo en `docs/decisiones.md`).
- **Quien decide, escribe:** registra cada decisión en `docs/decisiones.md` y actualiza el documento afectado en el mismo commit. Numeración de la sesión de desarrollo: `V01`, `V02`…
- **Al terminar un bloque de trabajo**, actualiza tu apartado de `docs/estado.md` y, si afecta al curso, añade el punto a "Pendiente de reflejar en el contenido".
- **Verifica antes de configurar:** consulta la documentación oficial (Next.js, next-intl, MDX, Tailwind CSS, Style Dictionary, Terrazzo) y cítala al tomar una decisión. Separa lo que dice la fuente de tu recomendación. Lo no verificado se marca como pendiente.
- **Solo tokens:** ningún color, espacio, radio, grosor ni tamaño escrito a mano en los componentes. Todo sale de las variables `--t101-*` (S27).
- **Accesibilidad (WCAG 2.2 AA):** foco visible con `:focus-visible` (anillo `--t101-border-width-200` + `--t101-color-border-focus`), objetivos de 24 × 24 px como mínimo, `aria-*` según `docs/componentes-v1.md`, sin scroll horizontal de página a 320 px.

## Estructura del repositorio

- `content/{locale}/NN-seccion/NN-pagina.mdx`: lecciones (C6). El español es el idioma de trabajo; el inglés es el idioma por defecto de la web (C5).
- `docs/`: documentos compartidos.
- `tools/`: scripts de escalas y contraste (`python3 tools/scales.py`, `python3 tools/semantic.py`) y comprobación del contenido compilado (`npm run build && npm run check:content`).
- `src/`: la aplicación Next.js. `app/[locale]/[section]/[lesson]/page.tsx` carga las lecciones; `lib/content.ts` lee `content/`; `components/`, los componentes; `i18n/`, next-intl; `mdx-components.tsx`, los componentes del MDX.
- `messages/{locale}.json`: textos de la interfaz (next-intl).
- `tokens/figma/`: exportación de Figma, sin editar (C10). `tokens/dtcg/`: DTCG normalizado (generado). `tokens/code-only.tokens.json`: tokens solo de código. `tokens/tokens101.resolver.json`: une los modos (V08).
- `src/styles/tokens.css` y `src/styles/theme.css`: capas 1 y 2 de tokens, **generadas**. No se editan a mano: `npm run tokens` y después `npm run check:tokens` (V12).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, next-intl, `@next/mdx`, despliegue en Vercel (C1, C3).
