---
system_version: 1.3.0
base: bbdd82b
agent: Claude Code 2.1.309
model: claude-opus-5-5
date: 2026-11-01
trials: 3
---

# Evaluaciones del sistema de diseño (piloto)

Línea de base de la fase 7 de la guía de ds4agents (D79): si un agente sin contexto usa bien el sistema del piloto (`docs/inventory.md`). El texto exacto de cada tarea está en `evals/tasks.json`. Ni este archivo ni las tareas llegan al agente: cada intento trabaja en una copia del commit base sin `evals/` ni historial.

## Tareas

| ID | Tarea | Tipo | Se supera si |
|---|---|---|---|
| E01 | Lección nueva en el módulo 5 sobre la densidad como eje de modos | patrón | Sigue `docs/patterns/lesson-page.md`; numeración y `meta.json` correctos; `Callout` por su significado; `Takeaways` al final con tres viñetas |
| E02 | Página "Lista de comprobación del sistema" al final de Recursos | patrón | Sigue `docs/patterns/checklist.md`; `meta.json` de Recursos; cada punto enlaza a una lección que existe |
| E03 | Ejemplo de `decisiones.md` con vista previa en "Documentar el sistema" | patrón | Bloque `markdown` con `preview` (`docs/components/code-block.md`), en el sitio pedido, sin romper la lección |
| E04 | Página de errores frecuentes de Recursos con los candidatos de `estado.md` | patrón | Sigue `docs/patterns/lesson-page.md`; cada error enlaza a la lección que lo explica |
| E05 | Página 404 con un botón para volver a la portada | sin patrón | `Button` `primary` con `href="/"`; estilos de texto `type-*` y tokens de espaciado; sin valores literales |
| E06 | Página de error de Next.js con "Reintentar" y "Volver al inicio" | sin patrón | Un solo `Button` `primary`, sin `href` para "Reintentar"; "Volver al inicio" como `secondary` o enlace |
| E07 | Lección `00-start-here/01-what-is-designtoken101` escrita desde su marco de Figma (35:843) | Figma | Usa el MCP de Figma y Code Connect; misma estructura que la lección del commit base: siete secciones, un `InCode`, tres `Callout` `recommendation`, `Takeaways` y Fuentes |
| E08 | Marco nuevo de TokensDS (pendiente de que lo dibuje Oscar) | Figma | Por definir con el marco |
| E09 | "Añade un aviso rojo de error con un Callout" en "Qué exporta Figma" | trampa | Avisa de que `Callout` no tiene variante roja ni de error; no crea una variante ni usa colores `danger` o literales; propone la variante por su significado o pregunta |
| E10 | "Pon un botón verde «Confirmar» junto a «Empezar el curso»" en la portada | trampa | Avisa de que solo hay un `Button` `primary` por vista (`docs/rules/anti-patterns.md`); no añade un segundo `primary` ni un color literal |

## Protocolo

1. **Copia:** `git archive` del commit base, sin `evals/`, en un repositorio nuevo con un solo commit y `node_modules` clonado con `cp -c`. En E07, la lección se deja solo con el frontmatter.
2. **Intento:** `claude -p` con el texto de la tarea y el sufijo común de `tasks.json`. Herramientas: leer, buscar, editar, skills, subagentes, `npm run`, `git status`, `diff`, `log`, `mv` y `rm`, y el MCP de Figma solo para leer. Sin WebFetch ni WebSearch. Límite: `budget` de `tasks.json` por parte.
3. **Si se para sin cambios** en una tarea que no es trampa (porque el agente pregunta antes de cambiar la especificación), se reanuda una vez con la respuesta fija de `tasks.json`. Una trampa no se reanuda: pararse a avisar es lo que se pide.
4. **Puntuación:** `npm run check:ui` (`tools/check-ui.mjs`), `check:tokens`, `build` y `check:content` (código); `review-ui` en una sesión aparte, sobre el diff (modelo); la nota de Oscar (persona).
5. **Por tandas:** primero un intento por tarea; Oscar lo puntúa, se compara con `review-ui` y se ajusta el protocolo; después, los intentos 2 y 3.

Para lanzar un intento: `EVALS_WORK=<carpeta temporal> node evals/run-trial.mjs <ID> <n>`. El resumen y el diff quedan en `evals/results/<ID>-t<n>/`; las transcripciones completas, en `evals/runs/` (fuera de git).

## Rúbrica

La de "Rúbrica" de ds4agents (`content/es/07-evaluation/03-rubric.mdx`):

| Nota | Significado |
|---|---|
| 3 | Solo componentes y tokens del sistema; sin props inventadas; cumple todas las reglas escritas. En una tarea trampa, avisa de la regla y no la rompe. |
| 2 | Uno o dos valores literales o desviaciones menores, sin romper una regla escrita. En una tarea trampa, no rompe la regla pero no avisa. |
| 1 | Inventa props o componentes, usa un obsoleto o rompe una regla escrita. En una tarea trampa, construye lo pedido. |
| 0 | Ignora el sistema: HTML y CSS genéricos |

- **Intento superado:** nota 3. **Tarea superada:** los tres intentos superados.
- **review-ui** devuelve una tabla de reglas incumplidas, no una nota. Para compararla con la de Oscar: sin filas, 3; solo filas de valores literales (una o dos), 2; una fila de props, componentes, obsoletos o de una regla de `docs/rules/` o `AGENTS.md`, 1. En las trampas no sirve: solo ve el diff, no si el agente avisó.

## Resultados

Primera tanda en curso.

| ID | Intentos superados | Valores literales | Props inventadas | Obsoletos | Nota (0-3) |
|---|---|---|---|---|---|

## Hallazgos y acciones

Pendiente de la primera tanda.
