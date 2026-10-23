---
name: build-ui
description: Crear o modificar páginas, lecciones MDX y componentes de interfaz con el sistema de diseño DesignToken101. Usar cuando se pida construir una vista, un formulario o una página, o implementar un diseño de TokensDS (Figma).
---

# Crear interfaces con el sistema DesignToken101

Sigue las reglas de `AGENTS.md`. Esta skill dice en qué orden aplicarlas.

1. Lee `docs/inventory.md` para saber qué componentes existen y en qué estado están. Para los que no están en el piloto, la anatomía está en `proyecto/componentes-v1.md`.
2. Busca en `docs/patterns/` un patrón que encaje (`lesson-page.md`, `checklist.md`). Si existe, sigue su receta.
3. Si partes de un diseño de TokensDS, usa el servidor MCP de Figma: contexto de diseño, variables y el mapa de Code Connect (`src/components/*.figma.ts` y `icons.figma.batch.*`) para saber qué componente de `src/components` es cada uno. Trata el código que devuelve como referencia del diseño, no como código final.
4. Lee el documento de cada componente que vayas a usar (`docs/components/<nombre>.md`) y comprueba sus props. Las variantes solo de Figma (`state`, `tab`, `showCopied`…) no son props.
5. Sustituye cualquier valor literal por su token semántico, según `docs/rules/rules-tokens.md` y `docs/foundations/color.md`.
6. Los textos siguen `docs/content/voice-and-tone.md`.
7. Antes de terminar, ejecuta la skill review-ui.

Si falta un componente o un token, no lo inventes: explica qué falta y propón la composición más cercana.
Si Figma y `docs/` no coinciden, manda `docs/`; señala la diferencia.
