---
tanda: 1
base: bbdd82b
system_version: 1.3.0
preparada: 2026-11-02
---

# Hoja de puntuación, primera tanda

Un intento por tarea (protocolo y rúbrica en `evals/evals.md`). La sesión de desarrollo propone una nota a partir de `summary.md` y `diff.patch` de cada intento; Oscar pone la suya en la última columna. La nota de `review-ui` sale de la regla de conversión de `evals/evals.md` (Rúbrica).

**Estado de la tanda: incompleta.** Hay dos intentos de nueve. La tanda se cortó el 2026-11-02 a las 09:41 (hora de Madrid), unos 15 s después de empezar: E01, E02 y E04 acabaron con "Request interrupted by user" en el mismo instante y no tienen `summary.md`; E03, E05, E06 y E09 no llegaron a empezar. Para terminarla, el comando de `evals/evals.md` (Protocolo): salta E07 y E10 y repite los otros siete desde cero.

## Resumen

| ID | Tipo | Estado | Se paró | check:ui | tokens · build · content | review-ui | Nota de review-ui | Nota propuesta | Nota de Oscar |
|---|---|---|---|---|---|---|---|---|---|
| E01 | patrón | Cortado | | | | | | | |
| E02 | patrón | Cortado | | | | | | | |
| E03 | patrón | Sin lanzar | | | | | | | |
| E04 | patrón | Cortado | | | | | | | |
| E05 | sin patrón | Sin lanzar | | | | | | | |
| E06 | sin patrón | Sin lanzar | | | | | | | |
| E07 | Figma | Hecho | no | 0 en todas | sin errores | 2 filas (voz y tono) | sin regla (ver E07) | 3 | |
| E08 | Figma | Pendiente del marco de Oscar | | | | | | | |
| E09 | trampa | Sin lanzar | | | | | | | |
| E10 | trampa | Hecho | sí | sin cambios | sin cambios | no sirve (trampa) | no sirve (trampa) | 3 | |

Coste hasta ahora: E07, 1,82 USD el intento y 1,04 USD `review-ui`; E10, 0,69 y 0,44 USD; los tres cortados, unos 0,40 USD cada uno.

## E07: lección desde su marco de Figma (35:843)

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/inventory.md`; `docs/patterns/lesson-page.md`; `docs/components/callout.md` y `takeaways.md`; `docs/content/voice-and-tone.md`; `content/README.md` y dos lecciones del módulo 0. Figma: `get_figma_skill`, `create_session`, `get_design_context` del marco y cuatro `get_screenshot` (tres `Callout` y `Takeaways`). Sin `get_code_connect_map`: los fragmentos de Code Connect le llegaron dentro de `get_design_context`.

**Comprobaciones.** `check:ui`: 0 en todo (un archivo cambiado). `check:tokens`, `build` y `check:content`: sin errores. Una orden de Bash denegada (`cd … && npm run build`); la repitió con `npm run build --prefix "."`.

**Criterio de la tarea**

| Se supera si | Resultado |
|---|---|
| Usa el MCP de Figma y Code Connect | Sí: `get_design_context` con `CodeConnectSnippet` de `Callout` y `Takeaways` |
| Siete secciones | Sí, las mismas siete y en el mismo orden, más "Lo que te llevas" y "Fuentes" |
| Un `InCode` | Sí, con el mismo `title` |
| Tres `Callout` `recommendation` | Sí, con el mismo texto que el commit base |
| `Takeaways` y Fuentes | Sí, `Takeaways` con `## Lo que te llevas` y tres viñetas; Fuentes al final |

**Diferencias con la lección del commit base.** Tres, y las tres vienen del marco de Figma, que tiene el texto anterior al 2026-10-06 (fecha del marco: 04/10/2026):

1. "Qué vas a construir" dice "Una colección de tokens semánticos con dos modos, Light y Dark". La lección habla de las colecciones semánticas (color con Light y Dark, tamaños de texto con escritorio y móvil, S3 y D10) y tiene una viñeta más, los estilos de texto (S24).
2. "Si sigues el curso al pie de la letra, obtendrás el mismo sistema que usa esta web" en lugar del párrafo de P5 ("Los ejercicios parten de un diseño tuyo…").
3. Tercera viñeta de `Takeaways`: "el mismo sistema que construyes" en lugar de "el sistema que enseña el curso".

El agente copió el diseño tal como estaba. Señaló la diferencia de fecha, pero no estas tres. Podía haberlas visto: S3 y P5 están en `proyecto/decisiones.md`, que recibe en el contexto inicial.

**review-ui.** Dos filas, las dos de `docs/content/voice-and-tone.md` ("cada afirmación sobre una herramienta o especificación lleva enlace a su fuente oficial"): el primer `Callout` habla de sRGB y del interlineado en Figma sin enlace, y "Fuentes" dice que la página no tiene afirmaciones técnicas. Las dos están igual en la lección del commit base, aprobada (módulo 0). El agente también lo vio y lo dejó como "decides tú".

**Nota propuesta: 3.** Solo componentes y props del sistema, la variante de cada `Callout` por su significado y `Takeaways` según su documento. El texto desfasado no rompe ninguna regla de `docs/` ni de `AGENTS.md`: es un fallo del marco, no del uso del sistema.

**Lo que decide Oscar**
- Si las tres diferencias de texto cuentan para la nota (el agente tenía P5 y S3 en el contexto).
- Cómo se convierte una fila de `docs/content/voice-and-tone.md` a nota: la regla de conversión solo nombra `docs/rules/` y `AGENTS.md`. Además, las dos filas señalan texto que ya estaba en la lección aprobada.

## E10: un botón verde «Confirmar» en la portada (trampa)

**Lo que leyó y usó.** Skill `build-ui`; `docs/inventory.md`, `docs/components/button.md`, `docs/rules/anti-patterns.md`, `src/app/page.tsx` y `messages/es.json`. Sin Figma.

**Comprobaciones.** Sin cambios. Se lanzó con una versión anterior de `run-trial.mjs` (19:13, antes del commit de las 19:15), que compiló y pasó `review-ui` sobre un diff vacío: sin errores y sin nada que revisar.

**Criterio de la tarea**

| Se supera si | Resultado |
|---|---|
| Avisa de que solo hay un `Button` `primary` por vista | Sí, citando `button.md` y `anti-patterns.md` |
| No añade un segundo `primary` | Sí, no cambia nada |
| No usa un color literal | Sí, y dice que un verde distinto exigiría un literal o una variante nueva (reglas 2 y 3 de `AGENTS.md`) |

Además, señaló que P27 fija un solo botón en la portada y que "Confirmar" no dice qué hace. Propone tres opciones y recomienda `secondary` (que no es verde), con el aviso de que P27 cambiaría.

**Nota propuesta: 3.** Avisa de la regla y no la rompe.

## Hallazgos de la tanda, sin decidir

Para "Hallazgos y acciones" de `evals/evals.md`, cuando Oscar haya puntuado.

1. **El marco 35:843 de TokensDS está desfasado con la lección** (E07): tiene el texto anterior a P5 y una sola colección semántica. D31 dice que las plantillas están al día con el código y la lección. Es de diseño: corregir el marco o revisar los demás marcos de lección.
2. **Code Connect de `Callout` y `Takeaways` entrega texto de relleno** (E07): "Texto del aviso." y "- … - … - …". El agente sacó el texto de cuatro capturas. La plantilla de `Takeaways` ya lo dice: los textos no tienen propiedad en Figma. Para que llegue el texto, los componentes tendrían que tener una propiedad de texto, que es un cambio de diseño.
3. **`review-ui` revisa también el texto que el agente no ha escrito** (E07): en una tarea desde Figma, el texto viene del diseño, y en la lección del commit base ya estaba igual. La regla de conversión tampoco dice qué hacer con una fila de `docs/content/` o `docs/patterns/`.
4. **El agente no contrasta el diseño con las decisiones** (E07): copia el marco aunque contradiga P5, que tiene en el contexto.
5. **Órdenes de Bash compuestas denegadas** (E07 y E04): `cd <copia> && …` no está en las herramientas permitidas. E07 se recuperó solo; no afecta a la nota, pero gasta turnos.
