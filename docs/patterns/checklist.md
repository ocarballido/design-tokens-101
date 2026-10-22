---
name: Lista de comprobación
type: pattern
status: stable
components: [LessonHeader, Prose, Takeaways]
figma: null
code: content/es/NN-capitulo/NN-checklist.mdx (en ds4agents)
---

# Patrón: lista de comprobación

Patrón solo de código: no tiene diseño en Figma. Se escribe en MDX y usa la plantilla de la página de lección (`docs/patterns/lesson-page.md`).

## Problema

Al terminar un capítulo de ds4agents, el lector necesita saber qué tiene que entregar, en qué orden lo hace y cuándo puede darlo por terminado.

## Receta

1. **Archivo:** la última página del capítulo, `NN-checklist.mdx`, con la URL `/{capítulo}/checklist`.
2. **Frontmatter:** `title: Lista de comprobación`, `nav_title: Lista de comprobación`, un `meta_title` que nombre la fase ("Lista de comprobación: documentación de un sistema de diseño para agentes de IA"), `description` y `lastReviewed`. `LessonHeader` los muestra.
3. **Introducción:** una o dos frases que dicen qué resume la lista.
4. **"En esta página":** párrafo en negrita y lista de enlaces a todos los `##` de la página, salvo "Fuentes".
5. **`## El entregable`:** una lista sin ordenar con lo que existe al terminar la fase. Los archivos y carpetas, en código en línea (`docs/`, `inventory.md`).
6. **`## Pasos`:** una lista ordenada. Cada paso empieza con un verbo en imperativo y, si una página del capítulo lo explica, enlaza a ella.
7. **`## Criterios para darlo por terminado`:** una lista sin ordenar de condiciones que se pueden comprobar.
8. **Resumen:** `Takeaways` con `## En resumen` y tres viñetas (en ds4agents el resumen se llama "En resumen", no "Lo que te llevas").
9. **`## Fuentes`:** la lista resume las páginas del capítulo; las fuentes están en cada una de ellas.

Tokens: los de Prose (`heading/2` en `text/neutral/subtle`; párrafos y listas en `body/default` y `text/neutral/default`; viñetas y números en `text/neutral/subtle`) y los de `Takeaways` y `LessonHeader`. El patrón no añade ninguno.

## Variantes

- **Con un ejemplo:** un ejemplo del entregable, dentro de "El entregable" (la plantilla de `inventory.md`, en la auditoría) o en un `##` propio entre los de la receta ("Ready for AI, por componente" antes de "Pasos", en Figma; "Una primera prueba" antes de los criterios, en la capa de agente).

## Antipatrones

- **Una práctica o un ejercicio en lugar de la lista:** ds4agents es una guía, no un curso. Cada capítulo termina con la lista de comprobación.
- **Pasos sin orden o en una lista sin ordenar:** los pasos van en una lista ordenada, porque el orden importa.
- **Criterios vagos** ("la documentación está bien escrita"): cada criterio dice qué se comprueba ("Cada `No usar` tiene su alternativa").
- **Un diseño en Figma para la lista:** no lo hay, por decisión del inventario. La lista usa solo los componentes de la página de lección.
