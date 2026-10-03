# Tokens101 — Componentes v1 (anatomía)

Encargo para diseñar los componentes de la web en Figma. **Oscar diseña; este documento solo fija la estructura** (D05): para qué sirve cada componente, sus partes, sus props, sus estados y qué token lleva cada parte en cada estado. No decide el aspecto: tamaños, iconos, alineaciones y proporciones son libres, siempre con tokens.

**Para desarrollo:** lo diseñado en Figma manda en lo visual. Las diferencias aceptadas están en §4.10, y el resumen de la entrega en `docs/entrega-diseno.md`.

**Cómo leerlo.** Cada componente se lee solo, sin saltar a otras secciones. Todos siguen la misma plantilla:

1. **Para qué sirve** y dónde aparece.
2. **Esquema** de sus partes.
3. **Props**: el mismo nombre en Figma y en React.
4. **Variantes en Figma**: cuántas hay que dibujar.
5. **Tokens**: una tabla con una fila por parte y una columna por estado.
6. **Texto**: qué estilo de texto lleva cada parte.
7. **Accesibilidad** y **contraste** (WCAG 2.2, Light / Dark).

Estado: aprobada por Oscar (2026-09-30), con D06–D15. **Reescrita el 2026-10-01** con esta plantilla. Ajustes tras el diseño en §4.10 (2026-10-02).

Documentos relacionados: `docs/sistema-tokens-v1.md` (tokens y estilos de texto), `docs/decisiones.md`, `docs/estado.md`.

---

## 1. Conceptos comunes

### 1.1 Props: mismo nombre en Figma y en React

Cada propiedad de un componente de Figma se llama igual que el prop de React, en camelCase (`variant`, `defaultOpen`). Los valores de las variantes son los mismos que los del tipo en TypeScript (`note`, `warning`).

Figma tiene cinco tipos de propiedad: variante, booleano (solo muestra u oculta una capa), intercambio de instancia, texto (sin texto enriquecido) y slot (un área libre donde se añade contenido) ([Figma — Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)).

| En React | En Figma |
|---|---|
| Lista cerrada de valores (`'note' \| 'warning'`) | Variante |
| `boolean` que cambia el aspecto | Variante |
| `boolean` que solo muestra u oculta algo | Booleano |
| Texto corto (título, etiqueta) | Texto |
| `children` o contenido libre | Slot |
| Texto opcional (`filename?`) | Texto + un booleano solo de Figma llamado `show` + nombre del prop (`showFilename`) |

### 1.2 `state` y `current` son cosas distintas

- **`state`** muestra la interacción del puntero o del teclado: `default`, `hover`, `active` (pulsado) y `focus`. **Es una variante solo de Figma.** En React no es un prop: el navegador lo resuelve con CSS (`:hover`, `:active`, `:focus-visible`).
- **`current`** indica que el elemento es la página o la opción en la que está el usuario. **Es un prop real**, también en React. Se combina con cualquier `state`.
- `active` significa siempre **pulsado**. Para "actual" se usa siempre `current`.
- Los enlaces y los elementos de navegación no tienen `active`: al pulsarlos se navega y el estado pulsado no llega a verse. Solo `IconButton`, `Button` y `ThemeToggle` tienen `active`.

### 1.3 Lo que comparten todos los elementos interactivos

- **Foco:** anillo de 2 px (`border-width/200`) con `color/border/focus`, dibujado por fuera del control. Cumple 3:1 frente al fondo en los dos modos. Lo exige 2.4.7 Focus Visible, AA ([WCAG 2.2](https://www.w3.org/TR/WCAG22/#focus-visible)).
- **Tamaño mínimo del objetivo:** 24 × 24 px (2.5.8, AA, [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)).
- **Color no es el único medio** para distinguir variantes y estados: también icono, texto o forma (1.4.1, A, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#use-of-color)).
- **Alturas flexibles** en todo lo que lleva texto (1.4.12 Text Spacing, AA, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#text-spacing)).
- **Sin scroll horizontal de página** a 320 px de ancho, salvo en tablas y código (1.4.10 Reflow, AA, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#reflow)).
- **Sin disabled ni loading en v1** (D14). Si algo no aplica, se oculta.
- **Solo tokens:** variables y estilos de texto, ningún valor suelto.
- **Modos:** Light/Dark (colección Semantic color) y Desktop/Mobile (colección Layout) se fijan en el marco, no en el componente.

---

## 2. Controles básicos

### 2.1 `IconButton`

**Para qué sirve.** Un botón que solo tiene un icono. Se usa para copiar el código en `CodeBlock` y para abrir el menú en móvil.

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `icon` | icono | Intercambio de instancia |
| `label` | `string`: nombre accesible, no se ve (p. ej. "Copiar código") | Descripción del componente o texto oculto |
| `state` | solo Figma | Variante: `default`, `hover`, `active`, `focus` |

**Variantes en Figma:** 4.

**Tokens.**

| Parte | `default` | `hover` | `active` | `focus` |
|---|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | `background/neutral/active` | Sin fondo |
| Icono | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco | — | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← | ← |

**Accesibilidad.** Objetivo de al menos 24 × 24 px (diseñado a 40 × 40). El `label` es obligatorio: un icono sin nombre no lo puede anunciar un lector de pantalla.

**Contraste del icono** (1.4.11, ≥ 3:1): `default` 7,74 / 7,65; `hover` 16,28 / 14,34; `active` 14,16 / 9,84.

### 2.2 `Button`

**Para qué sirve.** Una acción o un enlace destacado (p. ej. "Empezar el curso").

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `variant` | `'primary' \| 'secondary'` | Variante |
| `children` | texto de la etiqueta | Texto |
| `icon` | icono opcional, al final | Intercambio de instancia + booleano `showIcon` |
| `href` | `string` opcional | — (con `href` es un enlace `<a>`; sin él, un `<button>`) |
| `state` | solo Figma | Variante: `default`, `hover`, `active`, `focus` |

**Variantes en Figma:** `variant` (2) × `state` (4) = 8.

**Tokens de `primary`.**

| Parte | `default` | `hover` | `active` | `focus` |
|---|---|---|---|---|
| Fondo | `background/accent/strong/default` | `background/accent/strong/hover` | `background/accent/strong/active` | `background/accent/strong/default` |
| Texto e icono | `text/on-accent` | `text/on-accent` | `text/on-accent` | `text/on-accent` |
| Anillo de foco | — | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← | ← |

**Tokens de `secondary`.**

| Parte | `default` | `hover` | `active` | `focus` |
|---|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | `background/neutral/active` | Sin fondo |
| Borde | `border/neutral/strong`, `border-width/100` | ← | ← | ← |
| Texto e icono | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Anillo de foco | — | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← | ← |

**Texto.** `label/default`. Un solo tamaño en v1.

**Accesibilidad.**
- Altura de al menos 24 px (2.5.8, AA). *Recomendación:* 40 px o más; 2.5.5 Target Size (Enhanced), AAA, pide 44 × 44 px ([WCAG 2.2](https://www.w3.org/TR/WCAG22/#target-size-enhanced)).
- Con `href` navega (enlace); sin `href` hace una acción (botón). *Recomendación:* un solo `primary` por vista.

**Contraste del texto** (≥ 4,5:1):

| | `default` | `hover` | `active` |
|---|---|---|---|
| `primary` | 9,63 / 9,63 | 10,92 / 10,92 | 5,93 / 5,93 |
| `secondary` | 17,79 / 18,89 | 16,28 / 14,34 | 14,16 / 9,84 |

- El fondo del `primary` frente a la página da 2,05:1 en Light. Está permitido: la etiqueta identifica el control (Understanding 1.4.11).
- El borde del `secondary` da 4,70 / 4,20 frente a la página.

### 2.3 `Link`

**Para qué sirve.** Un enlace dentro del texto de la lección (interno o a una fuente externa).

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `href` | `string` | — |
| `children` | texto | Texto |
| `external` | en React se deduce de `href`, no es prop | Variante `external` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Variantes en Figma:** `external` (2) × `state` (3) = 6 (más `size`, solo de Figma, §4.10).

**Tokens.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Texto y subrayado | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Icono externo | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Anillo de foco | — | — | `border/focus`, `border-width/200` |

**Texto.** Hereda el estilo del texto en el que está (`body/default`, `body/small`…).

**Accesibilidad.**
- **El subrayado es obligatorio**, no decorativo. En Dark, el color del enlace frente al texto normal da 1,73:1, así que sin subrayado el enlace no se distingue (1.4.1). En Light da 3,50:1.
- Los enlaces internos usan el `Link` de next-intl para añadir el idioma.
- Si el enlace abre otra pestaña: icono y texto accesible "(abre en otra pestaña)".

**Contraste del texto** (≥ 4,5:1): `default` 5,08 / 10,92 sobre la página y 4,86 / 9,83 sobre `background/neutral/subtle`; `hover` 7,23 / 13,94 sobre la página.

---

## 3. Componentes del contenido de la lección

### 3.1 `Prose` (texto de la lección)

**Para qué sirve.** No es un componente que se dibuje entero: es la tabla que dice cómo se ve cada elemento Markdown del MDX. En código se resuelve en `mdx-components.tsx`.

| Elemento del MDX | Estilo de texto | Color |
|---|---|---|
| `##` (h2) | `heading/2` | `text/neutral/subtle` (§4.10) |
| `###` (h3) | `heading/3` | `text/neutral/default` |
| Párrafo | `body/default` | `text/neutral/default` |
| Lista (`-`, `1.`) | `body/default` | `text/neutral/default`; viñeta o número `text/neutral/subtle` |
| Negrita (`**…**`) | `body/strong` (D17) | `text/neutral/default` |
| Enlace | Ver `Link` (§2.3) | |
| Código en línea | Ver `Code` (§3.5) | |
| Bloque de código | Ver `CodeBlock` (§3.4) | |
| Tabla | Ver `Table` (§3.6) | |

**El bloque "En esta página"** (D16) es un párrafo en negrita seguido de una lista de enlaces, tal como está escrito en el MDX. No tiene componente propio.

**Contraste:** texto 17,79 / 18,89; viñetas y `##` en `text/neutral/subtle` 7,74 / 7,65.

### 3.2 `Callout`

**Para qué sirve.** Un aviso dentro de la lección: una nota, una advertencia, una recomendación de Tokens101 o algo pendiente de verificar.

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `variant` | `'note' \| 'warning' \| 'recommendation' \| 'pending'` | Variante |
| `children` | contenido MDX | Slot |

**Variantes en Figma:** 4. No es interactivo: no tiene `state`.

**Tokens.**

| Parte | `note` | `warning` | `recommendation` | `pending` |
|---|---|---|---|---|
| Fondo | `background/info/subtle` | `background/warning/subtle` | `background/accent/subtle` | `background/neutral/subtle` |
| Borde | `border/info/default` | `border/warning/default` | `border/accent/default` | `border/neutral/default` (§4.10) |
| Icono y etiqueta | `text/info/default` | `text/warning/default` | `text/accent/default` | `text/neutral/subtle` |
| Contenido | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Radio | `radius/container` | ← | ← | ← |

**Texto.** Etiqueta `label/default`; contenido `body/default`. Etiquetas fijas (D18): Nota, Aviso, Recomendación, Pendiente (traducibles).

**Accesibilidad.** La etiqueta y el icono dicen qué tipo de aviso es, no solo el color (1.4.1). El borde es decorativo.

**Contraste** (≥ 4,5:1):

| | `note` | `warning` | `recommendation` | `pending` |
|---|---|---|---|---|
| Etiqueta | 5,99 / 8,10 | 4,77 / 10,32 | 4,85 / 8,30 | 7,40 / 6,89 |
| Contenido | 16,36 / 14,01 | 17,17 / 14,21 | 16,98 / 14,36 | 17,01 / 17,01 |

### 3.3 `InCode`

**Para qué sirve.** Un bloque plegable con la explicación para quien escribe código (el itinerario de código opcional de cada lección). Cerrado por defecto.

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` | Texto |
| `children` | contenido MDX | Slot (visible solo con `open = true`) |
| `defaultOpen` | `boolean`, por defecto `false` | Variante `open` = `true` / `false` |
| `state` | solo Figma (de la cabecera) | Variante: `default`, `hover`, `focus` |

**Variantes en Figma:** `open` (2) × `state` (3) = 6.

**Tokens.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo del bloque | `background/neutral/subtle` | `background/neutral/subtle` | `background/neutral/subtle` |
| Fondo de la cabecera | Sin fondo | `background/neutral/hover` | Sin fondo |
| Borde del bloque | `border/neutral/default` | ← | ← |
| Icono de código y "En código" | `text/accent/default` | `text/accent/default` | `text/accent/default` |
| Título | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Chevron | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Contenido | `text/neutral/default` | ← | ← |
| Anillo de foco | — | — | `border/focus`, `border-width/200` (en Figma, dentro de la cabecera con `radius/container`) |
| Radio | `radius/container` | ← | ← |

`open` solo gira el chevron y muestra u oculta el contenido; no cambia colores.

**Texto.** Cabecera `label/default`; contenido `body/default`.

**Accesibilidad.**
- La cabecera es un `button` con `aria-expanded`: patrón Disclosure ([WAI-ARIA APG — Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)).
- Se distingue de un `Callout` por la forma (el icono de código en la cabecera), no solo por el color.
- En Light, el hover de la cabecera sobre el fondo `subtle` apenas se nota (1,04:1). WCAG no exige contraste en el hover; el chevron, que pasa a `text/neutral/default`, y el cursor refuerzan el estado.

**Contraste** (≥ 4,5:1): título 17,01 / 17,01 (`default`) y 16,28 / 14,34 (`hover`); "En código" 4,86 / 9,83 (`default`) y 4,65 / 8,28 (`hover`); anillo de foco frente a `subtle` 3,19 / 9,83 (≥ 3:1).

### 3.4 `CodeBlock`

**Para qué sirve.** Un bloque de código de varias líneas, con el nombre del archivo opcional y un botón para copiar.

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `children` | el código | Texto |
| `language` | `string` (`json`, `css`, `txt`…), no se ve | Descripción |
| `filename` | `string` opcional | Texto + booleano `showFilename` |

En el MDX: ` ```json filename="tokens.json" ` → `language="json"`, `filename="tokens.json"`.

**Variantes en Figma:** 1 (con `showFilename` y `showCopied`). El botón de copiar es un `IconButton` (§2.1, icono `li:copy`).

**Tokens.**

| Parte | Token |
|---|---|
| Fondo | `background/neutral/subtle` |
| Borde | `border/neutral/default`, `border-width/100` |
| Nombre de archivo | `text/neutral/subtle` |
| Código | `text/neutral/default` |
| Mensaje "Copiado" tras copiar | `text/success/default` |
| Radio | `radius/container` |

**Texto.** Código `code/default`; nombre de archivo y "Copiado" `caption/default`. **Sin resaltado de colores en v1** (D08).

**Accesibilidad.**
- El área de código tiene scroll horizontal propio y se puede enfocar con el teclado para desplazarse (1.4.10).
- Tras copiar, aparece el texto "Copiado", no solo un cambio de icono (1.4.1).

**Contraste** (≥ 4,5:1): código 17,01 / 17,01; nombre de archivo 7,40 / 6,89; "Copiado" 4,86 / 12,55.

### 3.5 `Code` (código en línea)

**Para qué sirve.** Una palabra o expresión de código dentro de un párrafo, una lista o una tabla (p. ej. `$value`).

**Props.** Solo `children`. **Variantes en Figma:** 1.

**Tokens.**

| Parte | Token |
|---|---|
| Fondo | `background/neutral/strong` |
| Texto | `text/neutral/default` |
| Radio | `radius/100` (primitivo; `radius/control` es demasiado redondo para una palabra) |

**Texto.** `code/default`, al tamaño del texto que lo rodea.

**Contraste** (≥ 4,5:1): 16,28 / 14,34.

### 3.6 `Table`

**Para qué sirve.** Las tablas del MDX (Markdown con `remark-gfm`).

**Props.** En el MDX no tiene props. En Figma se dibuja con un componente `TableCell` con la variante `header` = `true` / `false`.

**Tokens.**

| Parte | Cabecera (`header = true`) | Celda (`header = false`) |
|---|---|---|
| Fondo | `background/neutral/subtle` | Sin fondo |
| Texto | `text/neutral/default` | `text/neutral/default` |
| Separadores | `border/neutral/default`, `border-width/100` | ← |

**Texto.** Cabecera `label/default`; celdas `body/small`. El código dentro de una celda usa `Code`.

**Accesibilidad.** Las cabeceras son `th` con `scope="col"`. El contenedor tiene scroll horizontal propio (1.4.10). Sin anchos fijos de celda.

**Contraste** (≥ 4,5:1): cabecera 17,01 / 17,01; celdas 17,79 / 18,89.

---

## 4. Componentes de la estructura de la página

### 4.1 `LessonHeader`

**Para qué sirve.** La cabecera de cada lección, con los datos del frontmatter.

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` (frontmatter `title`) | Texto |
| `description` | `string` (frontmatter `description`) | Texto |
| `lastReviewed` | fecha ISO (frontmatter `lastReviewed`) | Texto, ya con formato |
| `section` | `string` opcional (nombre de la sección) | Texto |

**Tokens y texto.**

| Parte | Color | Estilo de texto |
|---|---|---|
| Sección | `text/neutral/subtle` | `caption/default` |
| Título | `text/neutral/default` | `heading/1` |
| Descripción | `text/neutral/subtle` | `body/default` |
| Fecha | `text/neutral/subtle` | `caption/default` |
| Contenedor (§4.10) | Borde `border/neutral/default`, `border-width/100`; radio `radius/container` | — |

**Accesibilidad.** `title` es el único `h1` de la página.

**Contraste** (≥ 4,5:1): título 17,79 / 18,89; el resto 7,74 / 7,65.

### 4.2 `Sidebar`

**Para qué sirve.** La navegación entre lecciones, agrupadas por sección ("Empezar aquí", "Recursos"). Las secciones se pliegan y despliegan (acordeón). Son tres componentes anidados.

#### `Sidebar` (contenedor)

**Props.** `children`: las secciones.

| Parte | Token |
|---|---|
| Fondo | `background/neutral/default` |
| Separador con el contenido (borde derecho) | `border/neutral/default`, `border-width/100` |
| Separación entre secciones | `space/*` |

**Móvil** (por debajo de 64rem, D11): el sidebar se oculta y va dentro del panel de navegación a pantalla completa (D21).

#### `SidebarSection` (cabecera de una sección: un botón)

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` | Texto |
| `defaultOpen` | `boolean`: `true` solo si la sección contiene la lección actual (C11) | Variante `open` = `true` / `false` |
| `children` | los `SidebarItem` | Slot (visible solo con `open = true`) |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo de la cabecera | Sin fondo | `background/neutral/hover` | Sin fondo |
| Título | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Chevron | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← |

**Texto.** `label/default`.

#### `SidebarItem` (una lección: un enlace)

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` (frontmatter `nav_title`) | Texto |
| `href` | `string` | — |
| `current` | `boolean`: es la lección abierta | Variante `current` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Con `current = false`.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | Sin fondo |
| Texto | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← |

**Con `current = true`.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | `background/accent/subtle` | ← | ← |
| Texto | `text/accent/default` | ← | ← |
| Marca lateral (trazo izquierdo) | `border/accent/strong`, `border-width/200` | ← | ← |
| Anillo de foco | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← |

**Texto.** `label/default`.

#### Accesibilidad y contraste del `Sidebar`

- `Sidebar` es un `nav` con `aria-label` (p. ej. "Lecciones").
- `SidebarSection` es un `button` con `aria-expanded`: patrón Disclosure.
- El `SidebarItem` actual lleva `aria-current="page"` y se distingue por la marca lateral además del color (1.4.1).
- Filas de al menos 24 px de alto (diseñadas a 36 / 40 px).
- Contraste: título de sección 17,79 / 18,89; ítem `default` 7,74 / 7,65; ítem `hover` 16,28 / 14,34; ítem `current` 4,85 / 8,30 (≥ 4,5:1); marca lateral frente a `background/accent/subtle` 3,18 / 8,30 (≥ 3:1).

### 4.3 `PageNav`

**Para qué sirve.** Los enlaces a la lección anterior y a la siguiente, al final de cada lección.

#### `PageNav` (contenedor)

| Prop | Tipo |
|---|---|
| `previous` | `{ title, href }` opcional |
| `next` | `{ title, href }` opcional |

Si no hay lección anterior o siguiente, ese enlace no se muestra (no se desactiva). Es un `nav` con `aria-label`.

#### `PageNavLink` (una tarjeta: un enlace)

| Prop | Tipo | En Figma |
|---|---|---|
| `direction` | `'previous' \| 'next'` | Variante |
| `title` | `string` | Texto |
| `href` | `string` | — |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | Sin fondo |
| Borde | `border/neutral/default` | `border/neutral/strong` | `border/neutral/default` |
| "Anterior" / "Siguiente" y flecha | `text/neutral/subtle` | ← | ← |
| Título de la lección | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Anillo de foco | — | — | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/container` | ← | ← |

**Texto.** "Anterior" / "Siguiente" `caption/default`; título `label/default`.

**Contraste** (≥ 4,5:1): "Anterior" 7,74 / 7,65 (`default`) y 7,08 / 5,81 (`hover`); título 5,08 / 10,92 (`default`) y 6,62 / 10,58 (`hover`).

### 4.4 `LanguageSwitcher`

**Para qué sirve.** Cambiar entre español e inglés. Lleva a la misma lección en el otro idioma. Dos enlaces (`LanguageOption`), uno por idioma.

#### `LanguageOption`

| Prop | Tipo | En Figma |
|---|---|---|
| `locale` | `'es' \| 'en'` | Texto ("ES", "EN") |
| `current` | `boolean`: es el idioma de la página | Variante `current` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

Tokens: ver §4.10 (forma final del diseño). En `focus`, los mismos colores que en `default` más el anillo `border/focus`.

**Texto.** `label/default`.

**Accesibilidad.**
- El idioma actual lleva `aria-current="true"` y se distingue por la marca, no solo por el color (1.4.1).
- Cada enlace lleva el atributo `lang` de su idioma (`lang="en"` en "EN") (3.1.2 Language of Parts, AA, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#language-of-parts)).
- Nombre accesible completo: "Español" / "English".

### 4.5 `ThemeToggle`

**Para qué sirve.** Elegir el modo de color: claro, oscuro o el del sistema (D07, por defecto `system`). Un grupo de tres botones (`ThemeOption`).

#### `ThemeOption`

| Prop | Tipo | En Figma |
|---|---|---|
| `value` | `'light' \| 'dark' \| 'system'` | Variante |
| `current` | `boolean`: es el modo elegido | Variante `current` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `active`, `focus` |

Tokens: ver §4.10 (forma final del diseño). En `focus`, los mismos colores que en `default` más el anillo `border/focus`.

**Accesibilidad.**
- Cada opción es un `button` con `aria-pressed` (`true` en la elegida) y un nombre accesible: "Modo claro", "Modo oscuro", "Modo del sistema".
- Objetivo de al menos 24 × 24 px por opción.

### 4.6 `SkipLink`

**Para qué sirve.** El enlace "Saltar al contenido": el primer elemento al que se llega con el tabulador. Está oculto hasta que recibe el foco y lleva directamente al `main` (2.4.1 Bypass Blocks, A, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#bypass-blocks)).

| Parte | Token |
|---|---|
| Fondo | `background/accent/strong/default` |
| Texto | `text/on-accent` |
| Anillo de foco | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` |

**Texto.** `label/default`. **Contraste:** texto 9,63 / 9,63; anillo frente a la página 3,33 / 10,92.

### 4.7 `SiteHeader`

**Para qué sirve.** La barra superior de todas las páginas: `SkipLink` (oculto), logotipo (enlace a inicio), y en escritorio `LanguageSwitcher` y `ThemeToggle`; en móvil, botón de menú (D19, D21).

| Parte | Token |
|---|---|
| Fondo | `background/neutral/default` |
| Borde inferior | `border/neutral/default`, `border-width/100` |
| Logotipo | SVG (D22), enlace con nombre accesible "Tokens101, inicio" |

**Accesibilidad.** Es la región `header`.

### 4.8 `SiteFooter`

**Para qué sirve.** El pie de todas las páginas: logotipo, autor y aviso de P7 (hecho con ayuda de Claude y revisión de Oscar Carballido).

| Parte | Token |
|---|---|
| Fondo | `background/neutral/default` |
| Borde superior | `border/neutral/default`, `border-width/100` |
| Texto | `text/neutral/subtle`, estilo `caption/default` |
| Enlaces | `Link` (§2.3) |

**Accesibilidad.** Es la región `footer`. **Contraste:** 7,74 / 7,65.

### 4.9 Plantilla de lección

```
SiteHeader
┌──────────┬─────────────────────────────────┐
│ Sidebar  │ LessonHeader                    │
│          │ Prose (incluye "En esta página")│
│          │ Callout, InCode, CodeBlock…     │
│          │ PageNav                         │
└──────────┴─────────────────────────────────┘
SiteFooter
```

- Regiones: `header`, `nav` (sidebar), `main` (la lección), `footer`. Sin columna lateral de índice (D16).
- Columna de la lección con ancho máximo `size/content/max-width` (720 px, D20), centrada.
- Dos marcos en Figma (D09): escritorio 1440 px (Layout Desktop) y móvil 375 px (Layout Mobile), cada uno en Light y Dark.

### 4.10 Ajustes tras el diseño de Oscar (2026-10-02)

Lo diseñado en Figma manda sobre este documento en lo visual. Diferencias con lo escrito arriba, aceptadas:

| Componente | Cómo quedó en Figma |
|---|---|
| `LessonHeader` | Con contenedor: borde `border/neutral/default` y `radius/container`. |
| `Prose` (`##`) | Los títulos `heading/2` usan `text/neutral/subtle` (7,74 / 7,65). |
| `Prose` (negrita y "En esta página") | Estilo `body/strong` (D17). |
| `Link` | Propiedad `size` (`default`/`small`) solo de Figma: el enlace hereda el tamaño del texto que lo rodea. Icono externo: `li:external-link`. |
| `Callout` | Etiqueta fija por variante (D18). Borde de `pending`: `border/neutral/default` (decorativo). |
| `IconButton` | 40 × 40 px, sin fondo en `default`. |
| `SidebarItem` / `SidebarSection` | Filas de 36 / 40 px (padding `space/200` vertical y `space/300` horizontal). En `focus` + `current`, la marca lateral es un rectángulo `Marker` porque el trazo lo ocupa el anillo de foco. |
| `LanguageSwitcher` / `ThemeToggle` | Grupo con fondo `background/neutral/strong`; la opción actual es un recuadro `background/neutral/default` con texto o icono `text/accent/default` y una marca inferior `border/accent/strong` (`Marker`, alto `border-width/200`). Opciones no actuales: texto o icono `text/neutral/subtle`; en hover, `text/neutral/default` y fondo `background/neutral/hover`. |
| `CodeBlock` | Props: `children`, `filename`; solo de Figma: `showFilename`, `showCopied`. Botón copiar: `IconButton` con `li:copy`. |
| `SkipLink` | Se dibuja en estado de foco. En las plantillas está oculto. |
| `SiteHeader` | `size=large` (escritorio) y `size=small` (móvil, sin selectores: D19). |
| `SiteFooter` | Logotipo, autor y aviso P7. |
| `Callout`, `InCode`, `LessonHeader`, `PageNavLink` | Borde de 1 px en los cuatro lados (`border-width/100`). |
| Plantilla | Columna con ancho máximo `size/content/max-width` (720 px, D20), centrada. Sidebar con dos secciones: "Empezar aquí" y "Recursos". |
| Navegación móvil | Panel a pantalla completa (D21): selectores de idioma y tema arriba, sidebar debajo; el botón de menú pasa a cerrar (`li:x`). |
| `Callout` (etiqueta) | En Figma, la etiqueta está en `text/neutral/default`. **No se sigue (V18):** en código, icono y etiqueta usan `text/{rol}/default`, como la tabla de §3.2. |
| "En esta página" | En Figma, la lista va sin viñetas. **No se sigue (V19):** en código lleva viñetas, como el resto de listas (§3.1). |

---

## 5. Decisiones que afectan a este documento

| # | Decisión |
|---|---|
| D05 | Oscar diseña; este documento fija la estructura. |
| D06 | `Callout` `recommendation` con el acento y `color/border/accent/default`; `pending` con neutros. |
| D07 | `ThemeToggle`: `light`, `dark` y `system` (por defecto). |
| D08 | Iconos de Lucide (licencia ISC), con el mismo nombre en Figma y en React. Código sin resaltado de colores en v1. |
| D09 | Dos marcos por pantalla: 1440 px (Layout Desktop) y 375 px (Layout Mobile). |
| D10 | Los estilos de texto cambian de tamaño con el modo de la colección Layout. |
| D11 | En código, Desktop desde 64rem (1024 px). |
| D12 | Tokens de estado `background/neutral/hover`, `background/neutral/active`, `text/accent/hover` y `border/accent/strong`. En hover y active, el texto de los controles neutros pasa a `text/neutral/default`. |
| D13 | El estado ocupa el lugar del énfasis cuando el énfasis es el de por defecto (patrón del SDS). |
| D14 | Sin disabled en v1. |
| D15 | `Button` con `primary` y `secondary`. |
| D16 | "En esta página" es una lista dentro de la lección, sin componente propio ni columna lateral. |
| D17 | `body/strong` para la negrita. |
| D18 | `Callout` con etiqueta fija por variante. |
| D19 | En móvil, los selectores pasan al panel de navegación. |
| D20 | `size/content/max-width` = 720 px. |
| D21 | Panel de navegación móvil a pantalla completa. |
| D22 | Logotipos como SVG, fuera de la regla "solo tokens". |
