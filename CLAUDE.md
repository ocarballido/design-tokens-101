# Tokens101

Web-curso que enseña a planificar, crear e implementar tokens de diseño con Figma + DTCG + Tailwind CSS. La web usa su propio sistema de tokens, el mismo que enseña. Autor: Oscar Carballido.

Los documentos de `docs/` son la fuente de verdad compartida entre las sesiones de contenido, diseño y desarrollo. Escribe siempre en español.

## Lee primero

@docs/decisiones.md
@docs/estado.md

Lee bajo demanda, cuando el trabajo lo pida:
- `docs/sistema-tokens-v1.md`: especificación de los tokens (valores, nombres, modos, estilos de texto). Fuente de verdad de los tokens que no salen de Figma.
- `docs/entrega-diseno.md`: entrega del diseño a desarrollo (variables, componentes, estados y plantilla).
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
- `tools/`: scripts de escalas y contraste (`python3 tools/scales.py`, `python3 tools/semantic.py`).
- Pendiente: la aplicación Next.js (paso 4 de `docs/estado.md`) y la carpeta de tokens exportados de Figma (paso 7).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, next-intl, `@next/mdx`, despliegue en Vercel (C1, C3).
