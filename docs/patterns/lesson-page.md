---
name: Página de lección
type: pattern
status: stable
components: [SiteHeader, Sidebar, LessonHeader, Prose, Callout, InCode, CodeBlock, Takeaways, PageNav, SiteFooter]
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-843
code: src/app/[section]/[lesson]/page.tsx
---

# Patrón: página de lección

## Problema

El lector abre una página de contenido largo y tiene que saber dónde está, qué va a aprender, saltar al apartado que busca, comprobar las fuentes y pasar a la página siguiente.

## Receta

1. **Estructura de la página** (`src/app/layout.tsx`, común a todas las páginas): `SkipLink`, `SiteHeader`, `Sidebar` a la izquierda desde `breakpoint/desktop` (por debajo, dentro del panel de `MobileNav`), `main` y `SiteFooter`. La columna de la lección tiene el ancho máximo `size/content/max-width`, centrada, con relleno `space/400` en horizontal y `space/600` en vertical, y `space/600` entre bloques.
2. **`LessonHeader`**, con las props del frontmatter: `section` (nombre de la sección), `title`, `description` y `lastReviewed`. Contenedor con borde `border/neutral/default`, `border-width/100` y `radius/container`; título en `heading/1` y `text/neutral/default`; sección, descripción y fecha en `text/neutral/subtle`.
3. **Introducción**: dos o tres frases en párrafos de Markdown (`body/default`, `text/neutral/default`).
4. **"En esta página"**: un párrafo en negrita (`**En esta página**`) y una lista de enlaces a los `##` de la página, incluido el del resumen final. No tiene componente propio.
5. **Contenido**: apartados con `##` (`heading/2`, `text/neutral/subtle`) y `###` (`heading/3`, `text/neutral/default`). Cada afirmación sobre una herramienta o especificación lleva enlace a su fuente oficial. Dentro de un apartado:
   - Un aviso: `Callout`, con la variante por su significado (`docs/components/callout.md`).
   - Código de varias líneas: un bloque de código (`docs/components/code-block.md`).
   - La explicación para quien escribe código: `InCode` con `title`.
   - Datos en filas y columnas: una tabla de Markdown. Un proceso por pasos: `Flow`. Una escala de color: `ColorScale`.
6. **"En Figma"**: un `##` con lo que se hace en Figma, solo cuando la página trata algo que se hace en Figma.
7. **Resumen**: `Takeaways` con el `## Lo que te llevas` y tres viñetas de una frase, sin enlaces (`docs/components/takeaways.md`).
8. **"Fuentes"**: el último `##`, con la lista de fuentes citadas.
9. **`PageNav`**, con `previous` y `next` (`{ title, href }`) de la página anterior y la siguiente; si no hay una de las dos, ese enlace no se muestra.

## Variantes

- **Ejercicio:** la misma receta; las tres viñetas de `Takeaways` dicen lo que el alumno tiene al terminar.
- **Página de herramienta** (`content/es/98-tools/`): `LessonHeader` igual que en una lección, con sección, título, descripción y fecha de revisión.
- **Página sin "Fuentes"** (la última del curso): `Takeaways` va al final.

## Antipatrones

- **Un segundo `h1`:** el `title` de `LessonHeader` es el único `h1` de la página. Los apartados empiezan en `##`.
- **"En esta página" como columna lateral o componente propio:** no hay columna de índice. Es un párrafo en negrita y una lista dentro del contenido.
- **Títulos de apartado con `¿?`, comillas o dos puntos:** cambian el ancla de `rehype-slug` y rompen los enlaces de "En esta página". Escribe el título sin esos signos.
- **`Takeaways` en mitad de la página o más de uno:** va una sola vez, antes de "Fuentes".
- **`Callout` `pending` para una afirmación técnica sin comprobar:** lo que no se puede comprobar no se publica. Quita la afirmación hasta comprobarla.
- **Un enlace interno con el prefijo numérico o el idioma** (`/es/00-start-here/…`): los enlaces internos son `/{sección}/{página}`, sin prefijo ni idioma.

## Referencia

Seis marcos en la página Templates de TokensDS: Desktop y Mobile, en Light y Dark (35:843, 35:1479, 52:487, 52:688), y el panel de navegación abierto (55:699, 55:833). En Figma el patrón se llama "Lesson" y lleva contenido de ejemplo del curso.
