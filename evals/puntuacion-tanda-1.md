---
tanda: 1
base: bbdd82b
system_version: 1.3.0
preparada: 2026-11-02
---

# Hoja de puntuación, primera tanda

Un intento por tarea (protocolo y rúbrica en `evals/evals.md`). La sesión de desarrollo propone una nota a partir de `summary.md`, `diff.patch` y la transcripción de cada intento; Oscar pone la suya en la última columna. La nota de `review-ui` sale de la regla de conversión de `evals/evals.md` (Rúbrica).

**Estado de la tanda: completa** (2026-11-02). E07 y E10 se hicieron el 2026-11-01. Los otros siete, el 2026-11-02 entre las 09:46 y las 09:56, después de que la primera ejecución del día se cortara a los 15 s. E08 sigue pendiente del marco de Oscar.

**Lo que leyó cada agente.** En los siete intentos del 2026-11-02, el apartado "Lo que leyó y usó" de `summary.md` dice "ninguno" en patrones, componentes y reglas, y no es cierto. La copia estaba en `$TMPDIR`, que en macOS es un enlace a `/private/var/…`, y el lanzador no quitaba ese prefijo de las rutas. Está corregido en `run-trial.mjs` para la segunda tanda. Las lecturas de esta hoja salen de las transcripciones (`evals/runs/`), y cuentan también las que se hicieron con `cat` o `sed` en Bash.

## Resumen

| ID | Tipo | Se paró | check:ui | tokens · build · content | review-ui | Nota de review-ui | Nota propuesta | Nota de Oscar |
|---|---|---|---|---|---|---|---|---|
| E01 | patrón | no | 0 en todas | sin errores | sin filas | 3 | 3 | |
| E02 | patrón | no | 0 en todas | sin errores | sin filas | 3 | 3 | |
| E03 | patrón | no | 0 en todas | sin errores | 1 fila (voz y tono) | sin regla | 3 | |
| E04 | patrón | no | 0 en todas | sin errores | 4 filas (voz y tono) | sin regla | 3 | |
| E05 | sin patrón | no | 0 en todas | sin errores | sin filas | 3 | 3 | |
| E06 | sin patrón | no | 0 en todas | sin errores | 2 filas (voz y tono) | sin regla | 3 | |
| E07 | Figma | no | 0 en todas | sin errores | 2 filas (voz y tono) | sin regla | 3 | |
| E08 | Figma | | | | | | | |
| E09 | trampa | sí | sin cambios | sin cambios | no sirve (trampa) | no sirve | 3 | |
| E10 | trampa | sí | sin cambios | sin cambios | no sirve (trampa) | no sirve | 3 | |

"Sin regla": todas las filas de `review-ui` de la tanda salen de `docs/content/voice-and-tone.md`, y la regla de conversión solo nombra `docs/rules/` y `AGENTS.md` (ver "Lo que decide Oscar").

**Coste.** Intentos: 11,41 USD. `review-ui`: 5,05 USD. Ejecución cortada: unos 1,20 USD. Total: unos 17,70 USD.

| ID | Intento | review-ui | Turnos | Duración |
|---|---|---|---|---|
| E01 | 1,95 | 0,66 | 43 | 240 s |
| E02 | 2,06 | 0,54 | 36 | 222 s |
| E03 | 0,93 | 0,56 | 20 | 80 s |
| E04 | 1,41 | 0,81 | 27 | 216 s |
| E05 | 1,04 | 0,47 | 26 | 107 s |
| E06 | 0,98 | 0,53 | 27 | 90 s |
| E07 | 1,82 | 1,04 | 33 | 159 s |
| E09 | 0,53 | | 8 | 37 s |
| E10 | 0,69 | 0,44 | 13 | 50 s |

## Lo que decide Oscar

1. **Tu nota de cada intento**, en la última columna del resumen.
2. **Cómo cuenta una fila de `docs/content/voice-and-tone.md`.** Afecta a E03, E04, E06 y E07. En E06, la fila señala un texto que fijó la tarea («No se ha podido cargar esta página.»). En E07, señala un texto que viene del diseño y que ya estaba en la lección aprobada. La propuesta de nota no las cuenta.
3. **E07:** si cuenta el texto desfasado que copió del marco. El agente tenía P5 y S3 en el contexto.
4. **E02:** si el criterio "sigue `docs/patterns/checklist.md`" es correcto. Ese patrón describe la lista de un capítulo de ds4agents. El agente lo leyó, lo descartó y lo explicó.

## E01: lección sobre la densidad en el módulo 5

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/patterns/lesson-page.md`, `docs/content/voice-and-tone.md`, `docs/rules/rules-tokens.md` y `docs/components/callout.md`. Este último lo leyó después de escribir la lección, durante la revisión. También leyó `content/README.md`, las lecciones del módulo 5, `proyecto/sistema-tokens-v1.md` y decisiones (P11, S3, T12). No leyó `docs/inventory.md`.

**Cambios.** `05-modes/07-density.mdx` (nueva, 159 líneas) y `07-exercise-modes.mdx` pasa a `08-exercise-modes.mdx`.

| Se supera si | Resultado |
|---|---|
| Sigue `lesson-page.md` | Sí: "En esta página", seis `##`, `InCode` con `title`, "En Figma", `Takeaways` y Fuentes |
| Numeración y `meta.json` correctos | Sí: va antes del ejercicio y el ejercicio pasa a 08. `meta.json` solo lleva el título de la sección y no cambia. La URL del ejercicio tampoco cambia (C6). |
| `Callout` por su significado | Sí: uno `recommendation` para un criterio propio |
| `Takeaways` al final con tres viñetas | Sí |

**review-ui.** Sin filas. Además de las comprobaciones de la skill, comprobó a mano las 12 anclas a otras lecciones. Señala que T12 dice "seis lecciones y un ejercicio".

**Nota propuesta: 3.** Avisó de T12, de que el motivo de no tener densidad lo redactó él a partir de P11, y de que solo cita fuentes que el curso ya usa. Pone dos nombres de token de ejemplo (`space/control/padding-block`) y dice que no existen en el sistema. Intentó descargar la especificación del Resolver con `curl`, que estaba denegado.

## E02: «Lista de comprobación del sistema» en Recursos

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/patterns/checklist.md`, `docs/patterns/lesson-page.md` y `docs/content/voice-and-tone.md`; los ejercicios de los módulos 1 a 8, «La comprobación final» y «Archivos de Figma». No leyó `docs/inventory.md`.

**Cambios.** `99-resources/03-system-checklist.mdx` (nueva, 139 líneas).

| Se supera si | Resultado |
|---|---|
| Sigue `docs/patterns/checklist.md` | No, a propósito: sigue `lesson-page.md`. Su motivo: `checklist.md` es para los capítulos de ds4agents (`## El entregable`, `## Pasos`, "En resumen"). Es cierto: el patrón dice "Al terminar un capítulo de ds4agents" y `code: … (en ds4agents)`. |
| `meta.json` de Recursos | Sí: no hace falta cambiarlo (solo lleva el título) |
| Cada punto enlaza a una lección que existe | Sí: unos 50 puntos y 70 enlaces internos; `check:content` comprueba las 664 anclas del sitio |

**review-ui.** Sin filas.

**Nota propuesta: 3.** Solo usa `InCode` y `Takeaways`, con sus props. Propone enlazar la página desde el ejercicio final y recuerda que falta la decisión.

## E03: ejemplo de `decisiones.md` con vista previa

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/inventory.md`, `docs/patterns/lesson-page.md`, `docs/components/code-block.md`, `docs/content/voice-and-tone.md` y `docs/rules/anti-patterns.md`.

**Cambios.** 15 líneas en `08-final-exercise/01-document-the-system.mdx`: `### Un registro de ejemplo` y un bloque `markdown filename="decisiones.md" preview` con dos decisiones reales (D01 y S35).

| Se supera si | Resultado |
|---|---|
| Bloque `markdown` con `preview` | Sí, con `filename`, como en `code-block.md` |
| En el sitio pedido | Sí: justo después del `InCode` «El registro junto al código», dentro de "Dónde vive la documentación" |
| Sin romper la lección | Sí: build y `check:content` sin errores. Además, comprobó en el HTML el `CodePreview`, la tabla y el ancla nueva. |

**review-ui.** Una fila de voz y tono: la frase que abre el apartado es impersonal ("se escribe").

**Nota propuesta: 3.** Avisó de que es la primera lección que usa `CodePreview`, que está en `beta` por los tres puntos abiertos de V60, y de que `estado.md` dice que ninguna lección lo usa. Propone otra opción si Oscar prefiere no publicarlo.

## E04: página de errores frecuentes

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/patterns/lesson-page.md` y `docs/content/voice-and-tone.md` (con `cat`); `content/README.md`, «Archivos de Figma» y las lecciones de cada error. No leyó `docs/inventory.md`.

**Cambios.** `99-resources/03-common-mistakes.mdx` (nueva, 134 líneas).

| Se supera si | Resultado |
|---|---|
| Sigue `lesson-page.md` | Sí: "En esta página", un `##` por error, cinco `Callout` `recommendation`, `Takeaways` y Fuentes |
| Cada error enlaza a la lección que lo explica | Sí, los ocho candidatos de `estado.md`, cada uno con su ancla y seis con un segundo enlace |

**review-ui.** Cuatro filas de voz y tono: tres pruebas propias sin fecha exacta y una frase impersonal.

**Nota propuesta: 3.** Señala la única frase que deduce y que ninguna lección prueba ("la copia lleva el code syntax de la original").

## E05: página 404

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/inventory.md`, `docs/components/button.md` y `docs/content/voice-and-tone.md`; `Button.tsx`, la portada, el layout y la documentación de `not-found` de Next.js 16.3.8 en `node_modules`.

**Cambios.** `src/app/not-found.tsx` (nuevo) y el grupo `NotFound` en `messages/es.json`.

| Se supera si | Resultado |
|---|---|
| `Button` `primary` con `href="/"` | Sí (`primary` por defecto) |
| Estilos `type-*` y tokens de espaciado | Sí: `type-heading-1`, `type-body-default`, `gap-600`, `py-600`, `desktop:py-1600`, las mismas clases que la portada |
| Sin valores literales | Sí (`check:ui` a 0) |

**review-ui.** Sin filas.

**Nota propuesta: 3.** Comprobó en el HTML generado el código 404, el título y el `noindex`. Avisa de que no hay plantilla de la 404 en Figma.

## E06: página de error

**Lo que leyó y usó.** Igual que E05, más la documentación de `error.tsx` de Next.js 16.3.8.

**Cambios.** `src/app/error.tsx` (nuevo) y el grupo `Error` en `messages/es.json`.

| Se supera si | Resultado |
|---|---|
| Un solo `Button` `primary` | Sí: «Reintentar» |
| «Reintentar» sin `href` | Sí: `onClick={() => retry()}` (`onClick` está en `button.md`: acepta los atributos de `<button>`) |
| «Volver al inicio» como `secondary` o enlace | Sí: `secondary` con `href="/"` |

**review-ui.** Dos filas de voz y tono: la frase de la tarea es impersonal, y no hay regla escrita para el texto de los botones. También duda de la prop `retry` sin haberlo comprobado. La duda es infundada: Next.js 16.3.8 documenta `retry` como estable desde 16.3.0 y recomienda usarla en lugar de `reset` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md`).

**Nota propuesta: 3.** Avisó de que elegir qué botón es `primary` era decisión suya. Creó una ruta que fallaba a propósito para probar la página y la borró al terminar.

## E07: lección desde su marco de Figma (35:843)

**Lo que leyó y usó.** Skills `build-ui` y `review-ui`; `docs/inventory.md`; `docs/patterns/lesson-page.md`; `docs/components/callout.md` y `takeaways.md`; `docs/content/voice-and-tone.md`; `content/README.md` y dos lecciones del módulo 0. Figma: `get_figma_skill`, `create_session`, `get_design_context` del marco y cuatro `get_screenshot` (tres `Callout` y `Takeaways`). Sin `get_code_connect_map`: los fragmentos de Code Connect le llegaron dentro de `get_design_context`.

| Se supera si | Resultado |
|---|---|
| Usa el MCP de Figma y Code Connect | Sí: `get_design_context` con `CodeConnectSnippet` de `Callout` y `Takeaways` |
| Siete secciones | Sí, las mismas siete y en el mismo orden, más "Lo que te llevas" y "Fuentes" |
| Un `InCode` | Sí, con el mismo `title` |
| Tres `Callout` `recommendation` | Sí, con el mismo texto que el commit base |
| `Takeaways` y Fuentes | Sí |

**Diferencias con la lección del commit base.** Tres, y las tres vienen del marco de Figma, que tiene el texto anterior al 2026-10-06 (fecha del marco: 04/10/2026):

1. "Una colección de tokens semánticos con dos modos, Light y Dark". La lección habla de las colecciones semánticas (S3 y D10) y tiene además una viñeta sobre los estilos de texto (S24).
2. "Si sigues el curso al pie de la letra, obtendrás el mismo sistema que usa esta web" en lugar del párrafo de P5.
3. Tercera viñeta de `Takeaways`: "el mismo sistema que construyes" en lugar de "el sistema que enseña el curso".

**review-ui.** Dos filas de voz y tono sobre el primer `Callout` (sRGB e interlineado sin enlace) y sobre "Fuentes". Las dos están igual en la lección aprobada; el agente también lo señaló.

**Nota propuesta: 3.** El texto desfasado es un fallo del marco, no del uso del sistema.

## E09: «un aviso rojo de error con un Callout» (trampa)

**Lo que leyó y usó.** Skill `build-ui`; `docs/components/callout.md`, una búsqueda en `docs/rules/anti-patterns.md`, la lección y `Callout.tsx`. No leyó `docs/inventory.md`.

| Se supera si | Resultado |
|---|---|
| Avisa de que `Callout` no tiene variante roja ni de error | Sí: enumera las cuatro variantes y cita C8, D18 y `anti-patterns.md` (no elegir por el color) |
| No crea una variante ni usa `danger` o literales | Sí, no cambia nada |
| Propone la variante por su significado o pregunta | Sí: propone `warning` con el texto listo y tres opciones |

Además, vio que la frase pedida es falsa: la lección explica que el alias a otra colección se conserva en `com.figma.aliasData` (comprobado en la lección del commit base).

**Nota propuesta: 3.**

## E10: un botón verde «Confirmar» en la portada (trampa)

**Lo que leyó y usó.** Skill `build-ui`; `docs/inventory.md`, `docs/components/button.md`, `docs/rules/anti-patterns.md`, `src/app/page.tsx` y `messages/es.json`. Se lanzó con la versión del lanzador anterior al commit `8aa0f71`, que compilaba y pasaba `review-ui` sin cambios.

| Se supera si | Resultado |
|---|---|
| Avisa de que solo hay un `Button` `primary` por vista | Sí, citando `button.md` y `anti-patterns.md` |
| No añade un segundo `primary` ni un color literal | Sí, no cambia nada |

Además, señaló P27 y que «Confirmar» no dice qué hace. Recomienda `secondary`.

**Nota propuesta: 3.**

## Hallazgos de la tanda, sin decidir

Para "Hallazgos y acciones" de `evals/evals.md`, cuando Oscar haya puntuado.

**Sobre el sistema**
1. **El marco 35:843 de TokensDS está desfasado con la lección** (E07). Tiene el texto anterior a P5 y una sola colección semántica, aunque D31 dice que las plantillas están al día. Es tarea de diseño.
2. **Code Connect de `Callout` y `Takeaways` entrega texto de relleno** (E07), y el agente tuvo que sacar el texto de cuatro capturas. Para que llegue el texto, los componentes de Figma necesitarían una propiedad de texto.
3. **`docs/patterns/checklist.md` no dice que es solo para ds4agents** (E02). El agente lo dedujo de la receta. Una línea de ámbito en el patrón lo evitaría (se copia a ds4agents, D72).
4. **Cuatro de nueve no leyeron `docs/inventory.md`** (E01, E02, E04, E09), aunque `build-ui` lo pide. Ninguno lo necesitó para resolver la tarea.

**Sobre el agente**
5. **Las nueve notas propuestas son 3.** Los agentes usan bien el sistema y avisan de lo que no les toca (T12, P27, decisiones que faltan, `CodePreview` en `beta`). La rúbrica mide el uso del sistema, no el contenido: E01 y E04 escriben contenido propio y lo señalan, pero eso no cuenta en la nota.
6. **El agente no contrasta el diseño con las decisiones** (E07): copia el marco aunque contradiga P5, que tiene en el contexto.

**Sobre el protocolo**
7. **`review-ui` revisa texto que el agente no ha escrito**: el texto del diseño en E07 y el que fija la tarea en E06. Todas sus filas son de voz y tono, y la regla de conversión no las cubre.
8. **`review-ui` dudó de `retry` sin comprobarlo** (E06) y Next.js 16.3 lo documenta. Lo dijo como duda, pero `CLAUDE.md` pide verificar antes de afirmar.
9. **El criterio de E02 pide un patrón que no encaja** con la tarea (ver el hallazgo 3).
10. **Permisos:** se deniegan las órdenes de Bash compuestas (`cd … &&`, bucles con `cat`), `curl` (E01, para la especificación del Resolver) y arrancar el servidor (E05 y E06). Todos los agentes siguieron sin ellas, pero gastan turnos, y ninguno pudo ver su página en el navegador.
11. **Lanzador:** rutas con `/private` (corregido) y lecturas con `cat` o `sed` que no cuenta en "Lo que leyó y usó" (sin corregir).
