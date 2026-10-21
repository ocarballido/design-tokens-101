---
title: Inventario del sistema de diseño (piloto G25)
updated: 2026-10-21
owner: Oscar Carballido
scope: Piloto G25. Button, TextField, Callout, Takeaways, CodeBlock (con CodePreview); patrones "página de la guía" y "lista de comprobación"
figma: TokensDS (yAIMfySdLHo6hyNg8E1F6O), página Components (0:1) y Templates (35:842)
code: designtokens101, src/components
---

# Inventario

Estados: stable · beta · deprecated · figma-only · code-only

Borrador. Nivel, categoría y estado son propuestas: los decide Oscar.

| Componente | Nivel | Categoría | Estado | Figma | Código | Code Connect | Doc |
|---|---|---|---|---|---|---|---|
| Button | átomo | actions | stable | Sí (24:728) | Sí (`Button.tsx`) | No | No |
| TextField | molécula | forms | stable | Sí (155:923) | Sí (`TextField.tsx`) | No | No |
| Callout | molécula | feedback | stable | Sí (22:57) | Sí (`Callout.tsx`) | No | No |
| Takeaways | molécula | pendiente | stable | Sí (89:364) | Sí (`Takeaways.tsx`) | No | No |
| CodeBlock | molécula | pendiente | stable | Sí (50:267) | Sí (`CodeBlock.tsx`) | No | No |
| CodePreview | organismo | pendiente | beta | Sí (239:1152) | Sí (`CodeBlock` con `preview`) | No | No |

"Doc" es documentación con el formato de la guía en `docs/`. Hoy `docs/` solo tiene `.gitkeep`; la anatomía de cada componente está en `proyecto/componentes-v1.md`, que es una especificación del proyecto, no un documento para agentes.

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
- **Button:** está en el marco "Molecules" de Figma; aquí se propone átomo. Decisión: pendiente.
- **TextField:** el error es `invalid` (booleano) en Figma y `error` (texto) en código. Decisión: pendiente (aceptar y traducir en Code Connect, o renombrar en Figma).
- **TextField:** está en el marco "Tools" de Figma, no en "Molecules". Decisión: pendiente.
- **TextField:** `inputMode`, `subgrid` y `children` solo existen en código. Decisión: aceptar (no son visuales).
- **Takeaways:** el icono es `li:graduation-cap` en Figma y en designtokens101; ds4agents usa `BookOpenText` (G15) y ese icono no está en el marco Icons de Figma. Un agente que lea Figma para ds4agents pondrá el birrete. Decisión: pendiente.
- **CodeBlock / CodePreview:** en Figma son dos componentes (más AnnotatedCode, CodeTabs y CodeTab); en código son un solo `CodeBlock` que cambia con `preview`, `marks` y `legend`. El atributo `data-component` sí dice `CodePreview` o `AnnotatedCode`. Decisión: pendiente (aceptar y mapear varios componentes de Figma a `CodeBlock`, o separar en código).
- **CodeBlock:** `language` solo existe en código (no se ve). Decisión: aceptar.
- **Página de la guía:** el patrón se llama "Lesson" y tiene contenido de curso (G10). Decisión: pendiente (renombrar el marco o aceptar que el nombre es de designtokens101).
- **Lista de comprobación:** no hay diseño en Figma. Decisión: pendiente.
- **Plantilla Lesson:** cada sección se llama "ThisPage", igual que el bloque "En esta página". Decisión: pendiente (nombres por función, capítulo 2).

## Scorecard (2026-10-21, solo el piloto)

| Criterio | Puntos (0-3) | Nota |
|---|---|---|
| Cobertura | 3 | Los cinco componentes existen en código (CodePreview como `CodeBlock` con `preview`) |
| Variables | 2 | Todo lo leído usa variables con code syntax `var(--t101-*)`. Sin comprobar si hay valores sueltos: `get_variable_defs` solo lista los enlazados. El interlineado de los estilos de texto es un número, no una variable. CodeTabs usa `radius/300` (primitivo) |
| Nombres | 2 | Componentes y propiedades coinciden con el código salvo `invalid`/`error`, `showIcon`/`icon` y CodePreview. Capas de la plantilla poco descriptivas ("ThisPage") |
| Contexto en Figma | 1 | Descripción en los seis (con CodePreview), con props de React y decisiones; en CodeBlock, Takeaways y CodePreview las comillas están escritas como `&quot;` (en CodePreview, `&amp;quot;`). Sin anotaciones (ni en los componentes, ni en sus capas, ni en la página Components, aunque el archivo tiene las categorías Development, Interaction, Accessibility y Content) y sin enlaces de documentación (2026-10-21). Dev resources sin verificar: `getDevResourcesAsync` no está disponible por el MCP; se mira en Dev Mode. Guidelines de librería sin verificar |
| Tokens | 2 | DTCG con alias y `$description` en todo el color semántico Light. Semantic-size y layout sin revisar |
| Documentación | 1 | Anatomía completa en `proyecto/componentes-v1.md`; nada en `docs/` con el formato de la guía |
| Vínculo con el código | 0 | Sin Code Connect |
| Gobernanza | 1 | Responsable y protocolo de decisiones; sin changelog del sistema ni proceso de contribución |
| **Media** | **1,50** | |
