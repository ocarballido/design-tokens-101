---
name: CodeBlock
level: molecule
category: content
status: stable
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=50-267
code: src/components/CodeBlock.tsx
composes: [IconButton, CodeTabs, CodeTab]
tokens:
  - color.background.neutral.subtle
  - color.border.neutral.default
  - color.text.neutral.subtle
  - color.text.neutral.default
  - color.text.success.default
  - color.background.neutral.strong
  - color.background.neutral.default
  - color.background.neutral.hover
  - color.background.neutral.active
  - color.border.focus
  - radius.container
  - radius.group
  - radius.control
  - border-width.100
  - border-width.200
variants:
  - name: CodePreview
    level: organism
    status: beta
    figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=239-1152
---

# CodeBlock

Un bloque de código de varias líneas, con el nombre del archivo opcional y un botón para copiar. Con `preview`, es `CodePreview`: un bloque markdown con las pestañas Markdown y Vista previa.

En Figma son dos componentes (`CodeBlock` y `CodePreview`, con `CodeTabs` y `CodeTab`); en código, uno solo, `CodeBlock`, que cambia con `preview`. El atributo `data-component` dice cuál es.

## Cuándo usar

- Usar: para código de varias líneas que el lector puede copiar.
- Usar `CodePreview` (`preview`): para enseñar un documento markdown (la descripción de un componente, un README) y cómo se lee.
- No usar: para código dentro de una frase; usa `Code` (código en línea, con comillas invertidas en el MDX).
- No usar: para explicar líneas concretas del código; usa `AnnotatedCode`.
- No usar `preview`: en un bloque que no sea `markdown` o `md`; `check:content` falla. Para otro lenguaje, un `CodeBlock` sin `preview`.

## Anatomía

1. Cabecera: nombre del archivo (opcional) a la izquierda; a la derecha, el texto "Copiado" (solo tras copiar) y el botón de copiar (`IconButton`, icono `li:copy`).
2. Área de código: `<pre>` con scroll horizontal propio.

Con `preview` (`CodePreview`), además:

3. Pestañas (`CodeTabs`, con dos `CodeTab`): Markdown y Vista previa, en la cabecera, antes de "Copiado".
4. Panel Vista previa: el markdown renderizado. El frontmatter va como tabla clave/valor encima del contenido.

## Props

| Prop | Tipo | Valores | Por defecto | Nota |
|---|---|---|---|---|
| `children` | `string` | | | Obligatorio. El código. En el MDX, el contenido del bloque |
| `language` | `string` | `json`, `css`, `tsx`, `markdown`… | | No se ve. En el MDX, el lenguaje del bloque |
| `filename` | `string` | | | En el MDX, `filename="…"`. En Figma, texto y booleano `showFilename` |
| `preview` | `ReactNode` | | | `CodePreview`. En el MDX, la palabra `preview` en un bloque `markdown` o `md`; la vista previa se renderiza en el build |
| `marks`, `legend` | | | | De `AnnotatedCode`, fuera de este documento |

En el MDX no se escribe `<CodeBlock>`: se escribe un bloque de código.

## Estados

- `CodeBlock`: el botón de copiar tiene los estados de `IconButton`; tras copiar, "Copiado" aparece un momento (en Figma, booleano `showCopied`).
- `CodePreview`: pestaña actual y no actual (`aria-selected`); `hover`, `active` y `focus` del navegador en la pestaña. En Figma, `tab` (`markdown`, `preview`) en `CodePreview` y `current` y `state` en `CodeTab`; no los pases como props.

## Tokens

| Parte | Token |
|---|---|
| Fondo | `background/neutral/subtle` |
| Borde y separador de la cabecera | `border/neutral/default`, `border-width/100` |
| Nombre de archivo | `text/neutral/subtle`, `caption/default` |
| Código | `text/neutral/default`, `code/default` |
| "Copiado" | `text/success/default`, `caption/default` |
| Radio | `radius/container` |

`CodePreview`, además:

| Parte | Token |
|---|---|
| Carril de las pestañas | `background/neutral/strong`, `radius/group` |
| Pestaña | `label/default`, `radius/control`, `border-width/100` |
| Pestaña actual | Fondo `background/neutral/default`, borde `border/neutral/default`, texto `text/neutral/default` |
| Pestaña no actual | Sin fondo, texto `text/neutral/subtle`; `hover` `background/neutral/hover`, `active` `background/neutral/active` |
| Foco de la pestaña | `border/focus`, `border-width/200`, por dentro |
| Panel Vista previa | Fondo `background/neutral/default`; texto con los estilos de Prose |

## Composición permitida

- Dentro del texto de la página o dentro de `InCode`.
- La vista previa admite párrafos, títulos, listas, tablas, enlaces, código en línea y bloques de código.
- No metas un `CodeBlock` dentro de otro: en la vista previa, un bloque de código es un `<pre>` simple.

## Comportamiento adaptable

- El código no se parte: tiene su propio scroll horizontal. La página no tiene scroll horizontal a 320 px.
- El nombre del archivo baja de línea si no cabe, y parte una ruta larga; nunca se corta con puntos suspensivos. El botón de copiar no se encoge.
- `CodePreview`: a 320 px, las pestañas y el botón de copiar bajan a su propia línea, y "Copiado" con copiar a otra si no caben. Una tabla ancha de la vista previa tiene su propio scroll.

## Límites del contenido

- Sin resaltado de colores en v1.
- Vista previa: `#` y `##` se ven como `heading/3` y `heading/4`, y `###` y siguientes como `heading/4`, pero no son encabezados de la página (sin id ni ancla).
- Vista previa: el HTML del markdown no se renderiza. Los enlaces relativos, a anclas o a archivos `.md` son texto; solo los `https` son enlaces.
- Si el markdown lleva su propio bloque de código, el bloque de fuera usa cuatro comillas invertidas.

## Reglas

- "Copiado" es texto: no lo sustituyas por un cambio de icono.
- Copiar copia siempre el código fuente: en `CodePreview`, el markdown, esté abierta la pestaña que esté.
- La pestaña inicial de `CodePreview` es Markdown.

## Accesibilidad

- El área de código es una región con nombre (el del archivo o "Código") y se enfoca con el teclado para desplazarse (WCAG 2.2, 1.4.10).
- "Copiado" se anuncia con `aria-live="polite"`.
- `CodePreview` sigue el patrón Tabs de las WAI-ARIA APG con activación automática: `role="tablist"` con `aria-label`, `role="tab"` con `aria-selected` y `aria-controls`, `role="tabpanel"` con `aria-labelledby`. Solo la pestaña actual está en el orden de tabulación; las flechas (circulares), Inicio y Fin cambian de pestaña.
- La pestaña actual lleva fondo y borde, no solo otro color (1.4.1).
- Sin JavaScript se ve el panel Markdown.

## Errores frecuentes

- `preview` en un bloque `json` o `tsx`: `check:content` falla. Quita `preview` o cambia el lenguaje a `markdown`.
- Un bloque markdown con otro bloque dentro, con tres comillas invertidas fuera: el bloque de fuera se cierra antes de tiempo. Usa cuatro fuera.
- Escribir `<CodeBlock>` en el MDX: escribe un bloque de código; el MDX lo convierte en `CodeBlock`.

## Abierto

`CodePreview` está en `beta` por tres puntos pendientes de decisión: el contraste del texto de la pestaña no actual en `active` en Dark (por debajo de 4,5:1), el `hover` de la pestaña, que no se distingue del carril, y el aspecto del código en línea de la vista previa.

## Ejemplos

Correcto:

````mdx
```json filename="tokens.json"
{ "color": { "emerald": { "500": { "$type": "color" } } } }
```
````

`````mdx
````markdown filename="docs/components/text-field.md" preview
---
name: TextField
status: stable
---

# TextField

Campo de texto de una línea.
````
`````

Incorrecto:

````mdx
```json filename="tokens.json" preview
{ "color": {} }
```
````

`preview` en un bloque `json`: no hay nada que previsualizar y `check:content` falla. Quita `preview`.
