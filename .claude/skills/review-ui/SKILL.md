---
name: review-ui
description: Revisar una interfaz, una lección MDX o un conjunto de cambios contra las reglas del sistema de diseño DesignToken101. Usar antes de terminar cualquier tarea de interfaz o cuando se pida una revisión de diseño.
---

# Revisión contra el sistema

Revisa los archivos cambiados y devuelve una tabla: regla (con el documento que la dice), archivo y línea, problema, corrección. Si no hay problemas, dilo en una línea.

## Comprobaciones automáticas
- `npm run check:tokens`: valores arbitrarios entre corchetes en `src/` y variables que no son `--t101-*` (`docs/rules/rules-tokens.md`: "Nunca escribas un valor literal ni un valor arbitrario entre corchetes").
- Si cambia una lección: `npm run build && npm run check:content` (`docs/components/code-block.md`: `preview` solo en bloques `markdown` o `md`; `docs/components/takeaways.md`: el título es un `##`).

Copia en la tabla cada error que den.

## Comprobaciones a mano
- Tokens (`docs/rules/rules-tokens.md`): ningún color, espacio, radio ni grosor literal fuera de lo que vigila `check:tokens` (busca `#`, `rgb(` y `px` en `style` y en CSS de `src/`, salvo los archivos generados); ningún token de la paleta (`emerald`, `neutral`…), solo semánticos; estilos de texto en lugar de `font-size`, `font-weight` o `font-family` sueltos; ningún token con `$deprecated`.
- Props (`docs/components/<nombre>.md`, apartado "Props"): todas las props usadas existen; las variantes solo de Figma no se pasan.
- Button (`docs/components/button.md` y `docs/rules/anti-patterns.md`): un solo `variant="primary"` por vista; con `href` navega, sin `href` hace una acción.
- TextField (`docs/components/text-field.md`): tiene `label`, sin `placeholder` en su lugar; el mensaje de `error` dice cómo corregir el valor.
- Callout (`docs/components/callout.md` y `docs/rules/anti-patterns.md`): la variante por su significado, no por el color; sin `pending` para una afirmación sin comprobar.
- Takeaways (`docs/components/takeaways.md` y `docs/rules/anti-patterns.md`): uno por página, al final, antes de "Fuentes", con tres elementos.
- Textos (`docs/content/voice-and-tone.md`): tú y voz activa, sin guiones largos, fuentes enlazadas y errores dichos con texto.
