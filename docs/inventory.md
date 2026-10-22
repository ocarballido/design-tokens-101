---
title: Inventario del sistema de diseño (piloto G25)
updated: 2026-10-22
owner: Oscar Carballido
scope: Piloto G25. Button, TextField, Callout, Takeaways, CodeBlock (con CodePreview); patrones "página de la guía" y "lista de comprobación"
figma: TokensDS (yAIMfySdLHo6hyNg8E1F6O), página Components (0:1) y Templates (35:842)
code: designtokens101, src/components
---

# Inventario

Estados: stable · beta · deprecated · figma-only · code-only

Nivel, categoría y estado decididos por Oscar el 2026-10-21 (categorías por G26 y estados por G27 de ds4agents).

| Componente | Nivel | Categoría | Estado | Figma | Código | Code Connect | Doc |
|---|---|---|---|---|---|---|---|
| Button | átomo | actions | stable | Sí (24:728) | Sí (`Button.tsx`) | No | Sí |
| TextField | molécula | forms | stable | Sí (155:923) | Sí (`TextField.tsx`) | No | Sí |
| Callout | molécula | feedback | stable | Sí (22:57) | Sí (`Callout.tsx`) | No | Sí |
| Takeaways | molécula | content | stable | Sí (89:364) | Sí (`Takeaways.tsx`) | No | Sí |
| CodeBlock | molécula | content | stable | Sí (50:267) | Sí (`CodeBlock.tsx`) | No | Sí |
| CodePreview | organismo | content | beta | Sí (239:1152) | Sí (`CodeBlock` con `preview`) | No | Sí |

"Doc" es documentación con el formato de la guía en `docs/`. Hoy `docs/` tiene `inventory.md`, `rules/` (`rules-tokens.md` y `anti-patterns.md`), `foundations/color.md` y `components/` (un documento por componente del piloto; CodePreview va en `code-block.md`). La anatomía completa sigue en `proyecto/componentes-v1.md`, que es una especificación del proyecto, no un documento para agentes.

CodePreview va como `beta` porque tiene tres puntos abiertos (V60: contraste de la pestaña `active` en Dark, `hover` en el carril, código en línea de la vista previa).

## Propiedades

| Componente | Figma | Código |
|---|---|---|
| Button | `variant: primary, secondary` · `showIcon` · `state: default, hover, active, focus` | `variant?: 'primary' \| 'secondary'` · `icon?: LucideIcon` · `href?` · `children` |
| TextField | `state: default, focus` · `invalid` · `code` · `showHint` | `label` · `hint?` · `error?: string` · `code?` · `inputMode?` · `subgrid?` · `children?` |
| Callout | `variant: note, warning, recommendation, pending` | `variant: 'note' \| 'warning' \| 'recommendation' \| 'pending'` · `children` |
| Takeaways | `size: large, small` | `children` (exige un `##` con id y una lista) |
| CodeBlock | `showFilename` · `showCopied` (sin variantes) | `children` · `language?` · `filename?` · `marks?` · `legend?` · `preview?` |
| CodePreview | `tab: markdown, preview` · subcomponentes CodeTabs y CodeTab | No es un componente: `CodeBlock` con `preview` |

Las descripciones de Figma ya dicen qué propiedades son solo de Figma (`state`, `showIcon`, `showHint`, `size`, `showFilename`, `showCopied`).

## Patrones

| Patrón | Figma | Código | Diferencia |
|---|---|---|---|
| Página de la guía | Marcos "Lesson · Desktop/Mobile · Light/Dark" y "Menu open" en Templates (35:843, 35:1479, 52:487, 52:688, 55:699, 55:833) | `src/app/[section]/[lesson]/page.tsx` con LessonHeader, Prose, Takeaways y PageNav | Nombre ("Lesson") y contenido de ejemplo de designtokens101 ("DesignToken101 es un curso…") |
| Lista de comprobación | No existe en Templates (comprobado el 2026-10-21, ver nota) | Páginas `NN-checklist.mdx` de ds4agents, sin componente propio | Solo en código |

Nota: comprobado con la API de plugins (solo lectura) el 2026-10-21. Templates (35:842) tiene 24 marcos de primer nivel: Lesson (6), Home (4) con sus dos imágenes isométricas, `Flow: methodology`, Generate scales (5), Normalize export (5) y "Frame 2" (147:6028, 1200 × 630, solo una imagen: parece la de compartir, sin nombre propio). Ningún nodo con "check", "comprob" o "lista" en el nombre salvo los iconos `li:check` y las casillas de las tablas de Generate scales.

## Obsoletos

Ninguno en el alcance.

## Diferencias

- **Button:** `showIcon` (booleano) en Figma, `icon` (componente de Lucide) en código. Decisión: aceptar y traducir en Code Connect.
- **Button:** estaba en el marco "Molecules" de Figma, pero es átomo. Resuelto en la fase 2: está en "Atoms" (2026-10-21).
- **TextField:** el error es `invalid` (booleano) en Figma y `error` (texto) en código. Decisión: aceptar y traducir en Code Connect (fase 5).
- **TextField:** estaba en el marco "Tools" de Figma. Resuelto en la fase 2: está en "Molecules" (2026-10-21), con Takeaways; CodePreview, CodeTab y CodeTabs están en "Organisms".
- **TextField:** `inputMode`, `subgrid` y `children` solo existen en código. Decisión: aceptar (no son visuales).
- **Takeaways:** el icono es `li:graduation-cap` en Figma y en designtokens101; ds4agents usa `BookOpenText` (G15) y ese icono no está en el marco Icons de Figma. Un agente que lea Figma para ds4agents pondrá el birrete. Decisión: la excepción G15 se documenta en la capa de agente de ds4agents (fase 6); la librería no cambia.
- **CodeBlock / CodePreview:** en Figma son dos componentes (más AnnotatedCode, CodeTabs y CodeTab); en código son un solo `CodeBlock` que cambia con `preview`, `marks` y `legend`. El atributo `data-component` sí dice `CodePreview` o `AnnotatedCode`. Decisión: aceptar y mapear los tres al mismo `CodeBlock` en Code Connect (fase 5; comprobar entonces en la documentación de Code Connect que se admite).
- **CodeBlock:** `language` solo existe en código (no se ve). Decisión: aceptar.
- **Página de la guía:** el patrón se llama "Lesson" y tiene contenido de curso (G10). Decisión: aceptar; el equivalente de ds4agents se documenta en sus patrones (fase 4).
- **Lista de comprobación:** no hay diseño en Figma. Decisión: aceptar como patrón solo de código, documentado en Markdown (fase 4).
- **Plantilla Lesson:** cada sección se llamaba "ThisPage", igual que el bloque "En esta página". Resuelto en la fase 2: `OnThisPage` y ocho `Section` en cada uno de los seis marcos (2026-10-21).

## Ready for AI (fase 2, 2026-10-21; Docs y guidelines, fase 4, 2026-10-22)

Comprobado el 2026-10-21 con el servidor MCP remoto de Figma (`get_design_context` sobre cada conjunto o componente) y con la API de plugins (lectura). La columna Docs y las guidelines, puestas por Oscar en TokensDS el 2026-10-22 (D67).

| Componente | Variables | Capas por función | Descripción | Anotaciones | Dev resources | Docs | Guidelines | Code Connect |
|---|---|---|---|---|---|---|---|---|
| Button | Sí | Sí | Sí | 1 (Development) | Código | `button.md` | Sí | No (fase 5) |
| TextField | Sí | Sí | Sí | 2 (Interaction, Accessibility) | Código | `text-field.md` | Sí | No (fase 5) |
| Callout | Sí | Sí | Sí | 1 (Accessibility) | Código | `callout.md` | Sí | No (fase 5) |
| Takeaways | Sí | Sí | Sí | 1 (Accessibility) | Código | `takeaways.md` | Sí | No (fase 5) |
| CodeBlock | Sí | Sí | Sí | 2 (Interaction, Accessibility) | Código | `code-block.md` | Sí | No (fase 5) |
| CodePreview (con CodeTab y CodeTabs) | Sí | Sí | Sí | 3 (Interaction, Development, Accessibility) | Código (`CodeBlock.tsx`) | `code-block.md` | Sí | No (fase 5) |

- **Descripción:** plantilla de la guía (propósito, usar, no usar, tokens), con una línea "Solo Figma:" (G28 de ds4agents) y, al final, una línea "Docs:" con su documento de `docs/components/` (2026-10-22). Sin `&quot;`. Revisadas frente a los documentos por Oscar: no se contradicen.
- **Dev resources:** el archivo de código en GitHub; no hay Storybook (G25).
- **Docs:** el enlace de documentación del componente apunta a su documento de `docs/components/`; CodePreview, a `code-block.md` (2026-10-22).
- **Guidelines:** `overview.md`, `components.md`, `patterns.md` y `rules.md`, generadas con `npm run docs:figma` y subidas a TokensDS por Oscar el 2026-10-22; el `anti-patterns.md` suelto (V61), borrado, porque va dentro de `rules.md`. Los seis componentes están en `components.md`.

**Lo que recibe el agente (`get_design_context`):**
- La descripción del componente, en una sección "Component descriptions", y el dev resource dentro de ella como "Documentation: [Github](…)". También llegan las descripciones de los componentes anidados (Icon, IconButton, TableCell, iconos `li:*`), que siguen con el formato anterior y referencias internas.
- Las anotaciones, como atributos `data-interaction-annotations`, `data-accessibility-annotations`, etc. Solo llegan si están en un componente o en una variante: las que estaban en el conjunto de variantes no llegaban, y la de una variante llega ligada a esa combinación de propiedades. Por eso cada anotación está en la variante a la que corresponde (D64).
- Variables como `var(--t101-…)` con su valor de reserva. Excepciones: el interlineado como número (D01), `radius/100` en TableCell (primitivo; `radius/300` de CodeTabs pasó a `radius/group`, D66) y la lista de ejemplo de la vista previa de CodePreview, con el color y el tamaño en crudo aunque en Figma están enlazados (texto con estilos mezclados).
- La capa del icono dentro de Icon (22:6) llegaba como `li:circle-plus` fuera cual fuera el icono; ahora se llama `Glyph` (D64). El icono real solo se deduce del nombre del archivo SVG.

## Tokens (fase 3, 2026-10-21)

- **Semánticos que usa el piloto** (comprobado con `get_variable_defs`): 25 de color, todos usados en Figma (`color.text.success.default`, en la capa "Copiado" de CodeBlock), `radius.control`, `radius.container`, `radius.group` (CodeTabs y ThemeToggle, D66) y 8 de Layout (todos menos `font-size.heading.1`).
- **Primitivos directos:** `space.*`, `border-width.*`, `font-weight.*` y `font-family.*` (estos dos a través de los estilos de texto), permitidos por S22; `radius.300` en CodeTabs pasó a `radius.group` en Figma y en código (D66).
- **Obsoletos:** ninguno.
- **Descripciones:** las 46 reescritas y `radius/group` nuevo (creado como `radius/nested` en D65, renombrado en D66). `npm run check:tokens` comprueba que cada token de Semantic color, Semantic size y Layout tiene `$description` no vacía y sin referencias internas (punto 9).
- **CodeBlock, "Copiado"** (comprobado el 2026-10-21 con el servidor MCP remoto de Figma): la capa `50:271` usa `color/text/success/default`. Está oculta por defecto (propiedad `showCopied`), por eso `get_variable_defs` no la devolvía.
- **Descripciones de token y el agente** (comprobado el 2026-10-21 con el servidor MCP remoto de Figma, en Takeaways, `89:364`): `get_design_context` no entrega la descripción de las variables (`get_variable_defs` tampoco). Da el nombre como `var(--t101-…)` con su valor de reserva, los estilos de texto, las descripciones de componente y las anotaciones. Las descripciones de token llegan al agente por el repositorio (comentarios de `tokens.css` y DTCG), no por el MCP de Figma. Probado en un componente: repetir si cambia el servidor.

## Documentación (fase 4, 2026-10-22)

- **Reglas:** `docs/rules/anti-patterns.md` y `docs/rules/rules-tokens.md`.
- **Componentes:** `docs/components/` con `button.md`, `text-field.md`, `callout.md`, `takeaways.md` y `code-block.md` (CodePreview dentro, como variante `beta`), con la plantilla de la guía y la profundidad de su nivel (2026-10-22).
- **Patrones:** `docs/patterns/lesson-page.md` (página de lección, marcos "Lesson") y `docs/patterns/checklist.md` (lista de comprobación, solo código), con receta de componentes, props y tokens (2026-10-22).
- **Contenido:** `docs/content/voice-and-tone.md`, sacado de las convenciones escritas del repositorio; lo que no está escrito (texto de botones, estados vacíos, confirmaciones) queda fuera (2026-10-22).
- **Repaso para agentes** (paso 7, 2026-10-22): sin "intenta", "mejor" ni "si es posible" en `docs/`; "según haga falta" y "con varios errores" pasan a condiciones comprobables.
- **Fundamentos: `color.md`** (`docs/foundations/color.md`): principios, los 33 semánticos de color (fondo, texto y borde) con uso y restricción sacados de su `$description`, y reglas para agentes.

## Scorecard (2026-10-22, solo el piloto; Documentación puntuada de nuevo tras la fase 4)

| Criterio | Puntos (0-3) | Nota |
|---|---|---|
| Cobertura | 3 | Los cinco componentes existen en código (CodePreview como `CodeBlock` con `preview`) |
| Variables | 3 | Ningún valor sin variable en los ocho componentes (API de plugins, 2026-10-21); el relleno blanco de las filas de CodePreview, quitado. Excepciones aceptadas: interlineado (D01); `radius/300` de CodeTabs, sustituido por `radius/group` (D66) |
| Nombres | 2 | Capas por función en el piloto y en la plantilla (sin `Frame`, `Group` ni `Text`). Propiedades como en código salvo `invalid`/`error`, `showIcon`/`icon` y CodePreview, que se traducen en Code Connect (fase 5) |
| Contexto en Figma | 3 | Descripción con plantilla, anotaciones y dev resources en los ocho componentes; línea "Docs:" y enlace de documentación a `docs/components/`; guidelines generadas desde `docs/` |
| Tokens | 3 | Descripciones con plantilla (para qué sirve y restricción, sin referencias internas) en los 47 semánticos, vigiladas por `check:tokens`; regla de capas en `docs/rules/rules-tokens.md` |
| Documentación | 3 | Reglas de uso en Markdown en todos los componentes estables del piloto (y en CodePreview, `beta`), con frontmatter y alternativa en cada "No usar"; dos patrones con receta, fundamento de color, voz y tono y reglas. Responsable: Oscar (`owner`). Sin script de validación en la integración continua (paso 9) |
| Vínculo con el código | 0 | Sin Code Connect |
| Gobernanza | 1 | Responsable y protocolo de decisiones; sin changelog del sistema ni proceso de contribución |
| **Media** | **2,25** | 18 / 8. Antes de la fase 4: 2,00; antes de la fase 3: 1,88; antes de la fase 2: 1,50 |
