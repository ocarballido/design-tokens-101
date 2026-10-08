# DesignToken101: Componentes v1 (anatomía)

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

Figma tiene cinco tipos de propiedad: variante, booleano (solo muestra u oculta una capa), intercambio de instancia, texto (sin texto enriquecido) y slot (un área libre donde se añade contenido) ([Figma: Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)).

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
| Anillo de foco |: |: |: | `border/focus`, `border-width/200`, por fuera |
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
| `icon` | icono opcional, al final | Intercambio de instancia + variante `showIcon` (D39) |
| `href` | `string` opcional |: (con `href` es un enlace `<a>`; sin él, un `<button>`) |
| `state` | solo Figma | Variante: `default`, `hover`, `active`, `focus` |

**Variantes en Figma:** `variant` (2) × `showIcon` (2) × `state` (4) = 16 (D39: en TokensDS, `showIcon` es una variante, porque con icono cambia el relleno; antes decía 8).

**Tokens de `primary`.**

| Parte | `default` | `hover` | `active` | `focus` |
|---|---|---|---|---|
| Fondo | `background/accent/strong/default` | `background/accent/strong/hover` | `background/accent/strong/active` | `background/accent/strong/default` |
| Borde | `border-width/100`. En Figma, la variable del fondo del estado: `background/accent/strong/default` (D39). En código, `transparent` (T17, V42) | En Figma, `background/accent/strong/hover`; en código, `transparent` | En Figma, `background/accent/strong/active`; en código, `transparent` | En Figma, `background/accent/strong/default`; en código, `transparent` |
| Texto e icono | `text/on-accent` | `text/on-accent` | `text/on-accent` | `text/on-accent` |
| Anillo de foco |: |: |: | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← | ← |

**Tokens de `secondary`.**

| Parte | `default` | `hover` | `active` | `focus` |
|---|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | `background/neutral/active` | Sin fondo |
| Borde | `border/neutral/strong`, `border-width/100` | ← | ← | ← |
| Texto e icono | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Anillo de foco |: |: |: | `border/focus`, `border-width/200`, por fuera |
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
- **Borde transparente del `primary` (T17, 2026-10-06):** no se ve, pero con colores forzados el navegador lo pinta con un color del sistema, y el botón conserva su contorno (sin borde, se ve como texto suelto; pruebas del módulo 7). Con él, `primary` y `secondary` miden lo mismo. `transparent` es una palabra clave de CSS, no un token. En código: `border-(length:--t101-border-width-100) border-transparent` (V42); con `--*: initial`, Tailwind CSS sigue generando `border-transparent` (`border-color: transparent`), porque no sale del tema. **En Figma** (D39), el trazo tiene la misma variable que el fondo de cada estado: no se ve, no deja valor suelto y el contraste no cambia. Diferencia en §4.10.
- El borde del `secondary` da 4,70 / 4,20 frente a la página.

### 2.3 `Link`

**Para qué sirve.** Un enlace dentro del texto de la lección (interno o a una fuente externa).

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `href` | `string` |: |
| `children` | texto | Texto |
| `external` | en React se deduce de `href`, no es prop | Variante `external` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Variantes en Figma:** `external` (2) × `state` (3) = 6, por cada `size` (`default`, `small`, `caption`; solo de Figma, §4.10): 18.

**Tokens.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Texto y subrayado | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Icono externo | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Anillo de foco |: |: | `border/focus`, `border-width/200` |

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

**Para qué sirve.** Un aviso dentro de la lección: una nota, una advertencia, una recomendación de DesignToken101 o algo pendiente de verificar.

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
| Anillo de foco |: |: | `border/focus`, `border-width/200` (en Figma, dentro de la cabecera con `radius/container`) |
| Radio | `radius/container` | ← | ← |

`open` solo gira el chevron y muestra u oculta el contenido; no cambia colores.

**Texto.** Cabecera `label/default`; contenido `body/default`.

**Accesibilidad.**
- La cabecera es un `button` con `aria-expanded`: patrón Disclosure ([WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)).
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
- El nombre de archivo baja de línea si no cabe, y parte una ruta larga; nunca se corta con puntos suspensivos (V39, 1.4.10 y 1.4.12). El botón de copiar no se encoge.
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

### 3.7 `Flow` (gráficos de proceso): C13, aprobado por Oscar el 2026-10-04; diseño aprobado el 2026-10-04 (D24)

**Para qué sirve.** Los gráficos del curso: una secuencia de pasos, que pueden estar agrupados en fases. Ejemplos:
- La metodología de DesignToken101 en "Lo que enseñamos": cuatro fases con sus módulos.
- El recorrido de un token en "Cómo encajan Figma, DTCG y Tailwind": pasos sin agrupar.
- Más adelante, las capas (módulo 3) y los modos (módulo 5).

El gráfico es HTML con tokens, no una imagen. Así cambia con Light y Dark, se adapta al ancho, se traduce con el MDX y lo lee un lector de pantalla.

**Esquema.**

```txt
Flow (figure)
├── FlowGroup ─ título · meta              ← opcional: una fase
│     └── FlowStep · FlowStep · FlowStep   ← en fila; bajan de línea si no caben
├── conector (flecha hacia abajo)
├── FlowStep ─ título · meta · [icono de enlace]
└── pie (caption)
```

Tres componentes:
- **`Flow`**: el contenedor. Los elementos de primer nivel van **en vertical**, con un conector entre cada dos.
- **`FlowGroup`**: una fase que agrupa pasos. Sus pasos van en fila y pasan a la línea siguiente cuando no caben.
- **`FlowStep`**: un paso. Puede ir dentro de un grupo o directamente en `Flow`.

**Props.**

| Componente | Prop | Tipo | En Figma |
|---|---|---|---|
| `Flow` | `caption` | `string`, obligatorio: frase que explica el gráfico | Texto |
| `Flow` | `children` | `FlowGroup` o `FlowStep` | Slot |
| `FlowGroup` | `title` | `string` | Texto |
| `FlowGroup` | `meta` | `string` opcional (p. ej. "Resultado: inventario de valores") | Texto + booleano `showMeta` |
| `FlowGroup` | `children` | `FlowStep` | Slot |
| `FlowStep` | `title` | `string` | Texto |
| `FlowStep` | `meta` | `string` opcional (p. ej. "Módulo 2") | Texto + booleano `showMeta` |
| `FlowStep` | `href` | `string` opcional: ruta interna sin idioma (`/fundamentals/what-is-a-token`) | Variante `link` = `true` / `false` (cambia el aspecto: añade el icono) |
| `FlowStep` | `status` | `'default' \| 'pending'`, por defecto `default` | Variante |
| `FlowStep` | `state` | solo Figma, solo con `link = true` | Variante: `default`, `hover`, `focus` |

**Variantes en Figma.** `Flow` 1 · `FlowGroup` 2 (`size`, solo de Figma, §4.10) · `FlowStep` 5:
- `link = false`: `status` `default` y `pending`.
- `link = true`: `status = default` con `state` `default`, `hover` y `focus`.

Un paso `pending` no tiene enlace: lo pendiente no tiene página todavía. El conector es un componente propio, `FlowConnector` (decidido en el diseño, D24).

**Tokens.**

| Parte | Token |
|---|---|
| `Flow`: fondo | Sin fondo (el de la página) |
| Conector (`li:arrow-down`) | `text/neutral/subtle` |
| Pie (`caption`) | `text/neutral/subtle` |
| `FlowGroup`: fondo | Sin fondo |
| `FlowGroup`: borde | `border/neutral/default`, `border-width/100` (decorativo; el estilo de línea lo decide el diseño) |
| `FlowGroup`: radio | `radius/container` |
| `FlowGroup`: título | `text/neutral/default` |
| `FlowGroup`: meta | `text/neutral/subtle` |

`FlowStep`:

| Parte | `default` | `hover` (con enlace) | `focus` (con enlace) | `pending` |
|---|---|---|---|---|
| Fondo | `background/accent/subtle` | `background/accent/subtle` | `background/accent/subtle` | `background/neutral/subtle` |
| Borde | `border/accent/default` (decorativo) | `border/accent/strong` | `border/accent/default` | `border/neutral/default` (decorativo) |
| Título | `text/neutral/default` | `text/accent/hover` | `text/neutral/default` | `text/neutral/subtle` |
| Meta | `text/neutral/subtle` | `text/neutral/subtle` | `text/neutral/subtle` | `text/neutral/subtle` |
| Icono de enlace (`li:arrow-right`) | `text/accent/default` | `text/accent/hover` | `text/accent/default` |: |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por fuera |: |
| Radio | `radius/control` | ← | ← | ← |

Los espacios, el tamaño de las cajas y la alineación son libres, siempre con tokens de `space/*`. **Sin anchos fijos**: las cajas se adaptan al texto.

**Texto.** Título del grupo `body/strong`; título del paso `label/default`; meta y pie `caption/default`.

**Accesibilidad.**
- `Flow` es un `<figure>` con su `<figcaption>` (`caption`). Los elementos de primer nivel forman una lista ordenada `<ol>`, y los pasos de un grupo, otra `<ol>` anidada. El lector de pantalla anuncia el orden y el número de pasos ([HTML: The figure element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element)).
- **El orden lo da el HTML, no la posición en pantalla.** Al bajar de línea, el orden visual sigue siendo el del código.
- Los conectores son decorativos: `aria-hidden="true"`.
- Un paso con `href` es un único enlace (`<a>`, con el `Link` de next-intl) que ocupa toda la caja. Su nombre accesible es el título más la meta.
- Lo que el color indica también se dice de otra forma (1.4.1): el enlace lleva icono, y el paso `pending` lo indica en el texto de `meta` ("En estudio", "Próximamente"). **El MDX tiene que escribir esa meta.**
- El texto es texto real, no una imagen: se puede ampliar y traducir (1.4.4 y 1.4.5, [WCAG 2.2](https://www.w3.org/TR/WCAG22/#images-of-text)).
- A 320 px los pasos de un grupo se apilan y no hay scroll horizontal (1.4.10).
- Los pasos con enlace miden al menos 24 × 24 px (2.5.8).

**Contraste.** Texto ≥ 4,5:1 y bordes con función ≥ 3:1 (Light / Dark):

| Combinación | Light / Dark |
|---|---|
| Título del paso sobre `background/accent/subtle` | 16,98 / 14,36 |
| Título en hover (`text/accent/hover`) sobre `background/accent/subtle` | 6,90 / 10,60 |
| Meta (`text/neutral/subtle`) sobre `background/accent/subtle` | 7,38 / 5,82 |
| Icono de enlace (`text/accent/default`) sobre `background/accent/subtle` | 4,85 / 8,30 |
| Borde en hover (`border/accent/strong`) sobre `background/accent/subtle` | 3,18 / 8,30 |
| Título y meta `pending` (`text/neutral/subtle`) sobre `background/neutral/subtle` | 7,40 / 6,89 |
| Título del grupo, meta del grupo, pie y conector sobre `background/neutral/default` | 17,79 / 18,89 · 7,74 / 7,65 |
| Anillo de foco sobre `background/neutral/default` | 3,33 / 10,92 |

**En el MDX** (ejemplo: el gráfico general de la metodología):

```mdx
<Flow caption="Las cuatro fases de DesignToken101 y lo que obtienes en cada una.">
  <FlowGroup title="Planificar" meta="Resultado: inventario de valores">
    <FlowStep title="Fundamentos" meta="Módulo 1" href="/fundamentals/what-is-a-token" />
  </FlowGroup>
  <FlowGroup title="Crear en Figma" meta="Resultado: variables y estilos">
    <FlowStep title="Primitivos" meta="Módulo 2" />
    <FlowStep title="Relaciones" meta="Módulo 3" />
    <FlowStep title="Nombrar" meta="Módulo 4" />
    <FlowStep title="Modos y temas" meta="Módulo 5" />
  </FlowGroup>
  <FlowGroup title="Llevar al código" meta="Resultado: CSS y Tailwind CSS">
    <FlowStep title="De Figma al código" meta="Módulo 6" />
  </FlowGroup>
  <FlowGroup title="Revisar y cerrar" meta="Resultado: el sistema completo">
    <FlowStep title="Accesibilidad" meta="Módulo 7" />
    <FlowStep title="Ejercicio final" meta="Módulo 8" />
  </FlowGroup>
  <FlowGroup title="Después">
    <FlowStep title="Componentes y código" meta="Módulo 9 · En estudio" status="pending" />
    <FlowStep title="Conclusiones" meta="Módulo 10" href="/conclusions/course-summary" />
  </FlowGroup>
</Flow>
```

---

### 3.8 `ColorScale` (escala de color visual): C14, aprobado por Oscar el 2026-10-05; en Figma (D34)

**Para qué sirve.** Mostrar una escala primitiva de color como una fila de muestras, junto a la tabla con sus valores. Se usa en las lecciones Escalas de color y Escalas de estado del módulo 2.

**Esquema.**

```txt
ColorScale (figure)
├── lista ordenada de pasos (ol)
│     └── paso (li): muestra · número del paso · hex · [etiqueta]   × 11
└── pie (figcaption)
```

**Props.**

| Prop | Tipo | Notas |
|---|---|---|
| `palette` | `'emerald' \| 'neutral' \| 'red' \| 'amber' \| 'blue'` | Obligatorio. Los pasos son siempre 50, 100… 900, 950 |
| `colors`, `name` | `string[]` (11 hex) y `string` | En lugar de `palette`, para los hex que calcula la herramienta de escalas (D54, §5.10). Hex en mayúsculas y con 6 cifras |
| `caption` | `string` | Obligatorio: frase que explica la escala |
| `highlight` | `string` opcional | Un paso que destacar, p. ej. `"500"` |
| `highlightLabel` | `string` opcional | Texto que acompaña al paso destacado, p. ej. "Color de marca". Obligatorio si hay `highlight` (1.4.1) |

**Datos.** El color de cada muestra es la variable del primitivo: `var(--t101-color-{palette}-{paso})`. El hex que se muestra se lee al compilar de los tokens generados (`tokens/dtcg/primitives`), en mayúsculas y con 6 cifras (`#33CC99`, no `#3c9`). Nada se escribe a mano: si la escala cambia en Figma y se regenera, el gráfico cambia.

**Tokens.**

| Parte | Token |
|---|---|
| Muestra: relleno | `var(--t101-color-{palette}-{paso})` (primitivo) |
| Muestra: borde | `border/neutral/default`, `border-width/100` (para que los pasos claros se distingan del fondo); sin borde en el paso destacado (D62) |
| Muestra: radio | `radius/control` |
| Muestra: alto | Un paso de `space/*` (p. ej. `space/1200`); ancho flexible |
| Número del paso | `text/neutral/default`, `label/default` |
| Hex | `text/neutral/subtle`, `code/default` o `caption/default` |
| Etiqueta del paso destacado | `text/neutral/default`, `caption/default`. Puede partirse después de cada "/" (`<wbr>`, D63), para que un nombre de token no se corte por la mitad de una palabra |
| Paso | Todos los pasos llevan relleno `space/200` y un borde transparente de `border-width/100` (D63), para que el destacado no se desplace: las muestras de una fila quedan a la misma altura y con el mismo ancho |
| Paso destacado: caja (D62) | El paso entero (muestra y texto) va en una caja: relleno `background/neutral/strong`, borde `border/neutral/default` de `border-width/100` y `radius/control`; ocupa el ancho de su columna |
| Pie | `text/neutral/subtle`, `caption/default` |
| Separación | `space/*` |

Las muestras no cambian con Light y Dark: son primitivos. El texto sí, porque usa tokens semánticos.

**Disposición.** Desde 64rem (D11), los 11 pasos en una fila. Por debajo, una rejilla que baja de línea (p. ej. 4 por fila a 320 px), sin scroll horizontal de página (1.4.10). Sin anchos fijos. Entre 1024 y ~1060 px el hex más largo baja su última letra de línea; se acepta (V29). **Implementado (2026-10-04):** 4 por fila por debajo de 64rem; alto de la muestra `space/1200`; hex en `caption/default`.

**Accesibilidad.**
- `figure` con `figcaption`; los pasos son una lista ordenada (`ol`).
- La muestra es decorativa (`aria-hidden="true"`): la información está en el texto de cada paso (número y hex). Cada `li` se lee como "500, #33CC99, Color de marca".
- El paso destacado se distingue por texto (`highlightLabel`) además de la caja (1.4.1). La etiqueta es la marca que cuenta: la caja frente a la página da 1,09 / 1,32 (no llega a 3:1), como el recuadro de la opción actual de los selectores (V26), y en Dark su borde es del mismo color que el relleno (D62).
- El texto nunca va sobre la muestra, así que su contraste no depende del color del paso. Va sobre el fondo de la página, salvo en el paso destacado, que va sobre `background/neutral/strong`: número y etiqueta (`text/neutral/default`) 16,28 / 14,34, hex (`text/neutral/subtle`) 7,08 / 5,81 (D62).

**En el MDX.**

```mdx
<ColorScale palette="emerald" highlight="500" highlightLabel="Color de marca" caption="Escala emerald: el acento de DesignToken101, del paso 50 al 950." />
```

### 3.9 `Takeaways` ("Lo que te llevas"): C18, propuesta de la sesión de contenido (2026-10-05), pendiente de revisión de Oscar

**Para qué sirve.** Dar un tratamiento visual propio al apartado "Lo que te llevas" (T10), para que el alumno lo reconozca como el resumen de lo aprendido en la lección. Está al final de cada lección, antes de "Fuentes" (53 lecciones).

**Por qué no es un `Callout`.** El `Callout` acompaña al texto (una nota, un aviso, una recomendación) y lleva una etiqueta fija. `Takeaways` cierra la lección y su título es un `h2` que aparece en "En esta página". Desde V35 comparte el fondo `background/accent/subtle` con `recommendation`; se distinguen porque `Takeaways` no tiene borde y lleva un título `h2` con icono en lugar de la etiqueta "Recomendación".

**Esquema.**

```txt
Takeaways (section, aria-labelledby → el h2)
├── h2 "Lo que te llevas"  ·  icono (li:graduation-cap, decorativo)
└── lista (ul): 3 elementos, cada uno con una marca (li:check, decorativa) y una frase
```

**Props.** `children`: el título y la lista, escritos en Markdown dentro del componente. El título sigue siendo un `##` del MDX, para que `rehype-slug` le dé su `id` (`lo-que-te-llevas`) y funcione el enlace de "En esta página".

**Tokens.**

| Parte | Token |
|---|---|
| Fondo | `background/accent/subtle` (V35; antes `background/neutral/subtle`) |
| Borde | Sin borde (V35; antes `border/neutral/default` de 1 px y marca lateral `border/accent/strong` de 2 px) |
| Radio | `radius/container` |
| Relleno | `space/400` por debajo de 64rem, `space/600` desde 64rem (D11) |
| Título | `heading/2`, `text/neutral/default`, sin margen superior (V35): empieza en el relleno |
| Icono del título | `text/accent/default`, 24 px (`space/600`, como el icono de `Callout`); hueco con el texto `space/300` (V35; antes `space/200`) |
| Texto de la lista | `body/default`, `text/neutral/default` |
| Marca de cada elemento | `li:check` de 16 px (`space/400`) en `text/accent/default`, en lugar de la viñeta, alineada con la primera línea |
| Separación | `space/400` entre título y lista; `space/200` entre elementos; `space/600` encima del componente (como un `h2`) |

Sin tokens nuevos.

**Contraste** (medido en el navegador con V35, Light / Dark):
- Texto y título (`text/neutral/default`) sobre `background/accent/subtle`: 16,98 / 14,36 (≥ 4,5:1).
- Icono y marcas (`text/accent/default`) sobre `background/accent/subtle`: 4,85 / 8,30 (≥ 3:1, 1.4.11; es el mismo par que el texto de `recommendation`).

**Accesibilidad.**
- `section` con `aria-labelledby` al `h2`: el título da nombre a la región.
- Icono y marcas con `aria-hidden="true"`. La lista sigue siendo una `ul`, y el lector de pantalla anuncia sus 3 elementos.
- No cambia el orden de lectura ni el tamaño del texto.

**En el MDX.**

```mdx
<Takeaways>

## Lo que te llevas

- Primera idea.
- Segunda idea.
- Tercera idea.

</Takeaways>
```

**Comprobado en desarrollo (2026-10-05):** el `##` dentro del componente recibe su `id` de `rehype-slug` y el enlace de "En esta página" llega. Cambios de diseño de Oscar en V35. **En Figma desde el 2026-10-05 (D28),** con las diferencias de §4.10.

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
| Contenedor (§4.10) | Borde `border/neutral/default`, `border-width/100`; radio `radius/container` |: |

**Accesibilidad.** `title` es el único `h1` de la página. Si una palabra del título no cabe en la línea, se parte (`overflow-wrap: break-word`), para que no haya scroll horizontal a 320 px ni con el espaciado de 1.4.12 (V38).

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

**Móvil** (por debajo de 64rem, D11): el sidebar se oculta y va dentro del panel de navegación lateral, que entra desde la izquierda con un overlay sobre el contenido (V25).

**Escritorio:** ancho `size/sidebar/width` (304 px, V16) y fijo al hacer scroll (`sticky`), con scroll propio si no cabe (V17).

**Acordeón:** las secciones se abren y se cierran con una animación de altura (`duration/200`, `easing/standard`, V24), sin animación con `prefers-reduced-motion`.

#### `SidebarSection` (cabecera de una sección: un botón)

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` | Texto |
| `number` | `number \| null`: número del módulo (C19, V40). Sale del prefijo de la carpeta (`01-fundamentals` → 1); `null` en las secciones de referencia (prefijo de 90 o más: Recursos y, más adelante, Herramientas) | Texto `number` y booleana `showNumber` (solo Figma; `false` en las secciones de referencia), D36 |
| `current` | `boolean`: la sección contiene la lección actual (V30) | Variante `current` = `true` / `false` |
| `defaultOpen` | `boolean`: `true` solo si la sección contiene la lección actual (C11); en código, igual que `current` | Variante `open` = `true` / `false` |
| `children` | los `SidebarItem` | Slot (visible solo con `open = true`) |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Con `current = false`.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo de la cabecera | Sin fondo | `background/neutral/hover` | Sin fondo |
| Título | `text/neutral/default` | `text/neutral/default` | `text/neutral/default` |
| Chevron | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por dentro (D27) |
| Radio | Sin radio (D26) | ← | ← |

**Con `current = true`** (V30). Se combina con `open = true` y con `open = false` (el alumno puede cerrar la sección de la lección actual).

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo de la cabecera | Sin fondo | `background/neutral/hover` | Sin fondo |
| Título | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Chevron | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por dentro (D27) |
| Radio | Sin radio (D26) | ← | ← |

**Texto.** `label/default`.

**Número del módulo** (C19, V40). Va delante del título, con el mismo estilo (`label/default`) y el mismo color que el título en cada estado de las dos tablas (también con `current`: `text/accent/default` y, en hover, `text/accent/hover`). Hueco entre número y título: `space/200`. Ancho mínimo `space/600`, con el número alineado al inicio (C19, 2026-10-07; antes, al final) y cifras tabulares (`font-variant-numeric: tabular-nums`), para que los títulos de "0" a "10" queden alineados (V40, opción a). Forma parte del nombre accesible del botón ("1 Fundamentos", 2.5.3 Label in Name), con un espacio oculto entre número y título; no lleva `aria-hidden`. Las secciones sin número (referencia) empiezan donde empiezan los números.

#### `SidebarItem` (una lección: un enlace)

| Prop | Tipo | En Figma |
|---|---|---|
| `title` | `string` (frontmatter `nav_title`) | Texto |
| `href` | `string` |: |
| `current` | `boolean`: es la lección abierta | Variante `current` = `true` / `false` |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Con `current = false`.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | Sin fondo |
| Texto | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por dentro (D27) |
| Radio | Sin radio (V23) | ← | ← |

**Con `current = true`.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | `background/accent/subtle` | ← | ← |
| Texto | `text/accent/default` | ← | ← |
| Marca lateral (trazo izquierdo) | `border/accent/strong`, `border-width/200` | ← | ← |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por dentro (D27) |
| Radio | Sin radio (V23) | ← | ← |

**Texto.** `label/default`.

#### Grupos del `Sidebar` (C17): propuesta de la sesión de contenido (2026-10-05), pendiente de revisión de Oscar

**Para qué sirven.** Separar en el sidebar los módulos que se siguen en Figma de los que trabajan también con código, para que el alumno vea dónde el curso se vuelve más técnico. Es un texto entre secciones, no un control.

**Datos.** `content/{locale}/meta.json`, con la convención de separadores de Fumadocs ([Page Conventions](https://fumadocs.dev/docs/page-conventions)): `pages` lista las carpetas en orden, y una cadena `"---Texto---"` es un separador con ese texto. La sección que va antes del primer separador ("Empezar aquí") no lleva grupo.

```json
{ "pages": ["00-start-here", "---Diseñar los tokens---", "01-fundamentals", "…", "05-modes", "---Tokens en código---", "06-figma-to-code", "---Referencia---", "99-resources"] }
```

Si una carpeta de `content/es/` no está en `pages`, la compilación debe fallar, para que un módulo nuevo no desaparezca del sidebar. Sin `meta.json` raíz en un idioma, se usa el del español (V02, V05); los textos se traducen en `content/en/meta.json`.

**Esquema.**

```txt
Sidebar (nav)
├── SidebarSection "Empezar aquí"
├── grupo (div role="group", aria-labelledby → etiqueta)
│     ├── etiqueta "Diseñar los tokens" (p)
│     └── SidebarSection × 5
├── grupo "Tokens en código"
└── grupo "Referencia"
```

**Tokens.**

| Parte | Token |
|---|---|
| Etiqueta | `caption/default`, `text/neutral/subtle` |
| Separador encima de la etiqueta | `border/neutral/default`, `border-width/100` (decorativo) |
| Separación | `space/600` encima del separador; `space/200` entre etiqueta y primera sección |

**Accesibilidad.** La etiqueta no es interactiva ni un encabezado (no altera el índice de títulos de la página). Cada grupo es un `role="group"` con `aria-labelledby` a su etiqueta, así que el lector de pantalla anuncia el grupo al entrar en él. Contraste de la etiqueta: 7,74 / 7,65 (≥ 4,5:1). Igual en el panel de navegación móvil.

#### Accesibilidad y contraste del `Sidebar`

- `Sidebar` es un `nav` con `aria-label` (p. ej. "Lecciones").
- `SidebarSection` es un `button` con `aria-expanded`: patrón Disclosure. Con `current = true` no lleva ARIA propio (V30): la lección actual ya se anuncia con el `aria-current` del `SidebarItem`, y `LessonHeader` dice la sección. Por eso el color no es el único medio de saberlo (1.4.1), aunque la sección esté cerrada.
- El `SidebarItem` actual lleva `aria-current="page"` y se distingue por la marca lateral además del color (1.4.1).
- Anillo de foco por dentro (D27, excepción a §1.3): el sidebar tiene scroll propio y las secciones se pliegan con `overflow: hidden`, así que un anillo por fuera quedaría recortado. En código, `focus-ring-inset`. Sigue siendo de 2 px con `border/focus` (≥ 3:1, 2.4.7).
- Filas de al menos 24 px de alto (diseñadas a 36 / 40 px).
- Contraste: título de sección 17,79 / 18,89; título y chevron de la sección `current` 5,08 / 10,92 (`text/accent/default` sobre `background/neutral/default`) y en hover 6,62 / 10,58 (`text/accent/hover` sobre `background/neutral/hover`); ítem `default` 7,74 / 7,65; ítem `hover` 16,28 / 14,34; ítem `current` 4,85 / 8,30 (≥ 4,5:1); marca lateral frente a `background/accent/subtle` 3,18 / 8,30 (≥ 3:1).

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
| `href` | `string` |: |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Fondo | Sin fondo | `background/neutral/hover` | Sin fondo |
| Borde | `border/neutral/default` | `border/neutral/strong` | `border/neutral/default` |
| "Anterior" / "Siguiente" y flecha | `text/neutral/subtle` | ← | ← |
| Título de la lección | `text/accent/default` | `text/accent/hover` | `text/accent/default` |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/container` | ← | ← |

**Texto.** "Anterior" / "Siguiente" `caption/default`; título `label/default`.

**Contraste** (≥ 4,5:1): "Anterior" 7,74 / 7,65 (`default`) y 7,08 / 5,81 (`hover`); título 5,08 / 10,92 (`default`) y 6,62 / 10,58 (`hover`).

### 4.4 `LanguageSwitcher`

**Retirado (P24, V45):** la web es solo en español y el componente se ha borrado del código (queda en el historial de git). La anatomía se conserva por si vuelve otro idioma.

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
- El idioma actual lleva `aria-current="true"`. Sin marca inferior desde V26 (riesgo de 1.4.1 aceptado).
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

**Para qué sirve.** La barra superior de todas las páginas: `SkipLink` (oculto), logotipo (enlace a inicio), y en escritorio `ThemeToggle` (sin `LanguageSwitcher` desde P24); en móvil, botón de menú y el selector de tema pasa al panel (D19, D21).

| Parte | Token |
|---|---|
| Fondo | `background/neutral/translucent` con `blur/300` detrás (V28); `background/neutral/default` con `prefers-reduced-transparency: reduce` |
| Borde inferior | `border/neutral/default`, `border-width/100` |
| Logotipo | SVG (D22), enlace con nombre accesible "DesignToken101, inicio" |

**Comportamiento (V28).** Sticky arriba en móvil y en escritorio; el contenido pasa por debajo. El sidebar de escritorio queda sticky justo debajo.

**Accesibilidad.** Es la región `header`. Al ser sticky, `scroll-padding` deja libre su altura para que el foco y las anclas no queden tapados (2.4.11). Los textos de la cabecera están sobre fondos opacos (selectores) o son el logotipo (exento, D22), así que la transparencia no cambia su contraste.

### 4.8 `SiteFooter`

**Para qué sirve.** El pie de todas las páginas: logotipo, autor, aviso de P7 (hecho con ayuda de Claude y revisión de Oscar Carballido) y enlace para avisar de un error (P25).

| Parte | Token |
|---|---|
| Fondo | `background/neutral/default` |
| Borde superior | `border/neutral/default`, `border-width/100` |
| Texto | `text/neutral/subtle`, estilo `caption/default` |
| Enlaces | `Link` (§2.3) |
| Logotipo del autor | Imagen SVG (D22) enlazada a `https://www.oscarballido.com` (V36), en la misma pestaña. 39 × 24 px. Foco: anillo `border-width/200` + `border/focus` por fuera |
| Enlace a los issues (P25, D41) | Párrafo "¿Has encontrado un error? Avísalo en GitHub" debajo del aviso de P7, en el mismo bloque (hueco `space/200`). "Avísalo en GitHub" es un `Link` (§2.3) externo a `https://github.com/ocarballido/design-tokens-101/issues`, con el estilo del pie (`caption/default`; en Figma, `size=caption`). La pregunta, en `text/neutral/subtle` |

**Accesibilidad.** Es la región `footer`. **Contraste:** 7,74 / 7,65. El enlace del logotipo del autor tiene nombre accesible "Oscar Carballido, web personal" (`aria-label`; la imagen sigue con `alt=""`), mide 39 × 24 px (≥ 24 × 24, 2.5.8) y el logotipo está exento de contraste (D22). El enlace a los issues va subrayado, con el contraste de §2.3 (5,08 / 10,92), y la pregunta del mismo párrafo le da contexto (2.4.4, A); mide 17 px de alto, pero está en una línea de texto, exenta de 2.5.8.

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
- Columna de la lección con ancho máximo `size/content/max-width` (960 px desde V27; antes 720 px, D20), centrada.
- Dos marcos en Figma (D09): escritorio 1440 px (Layout Desktop) y móvil 375 px (Layout Mobile), cada uno en Light y Dark.
- **Portada (P27, D42):** la misma plantilla, con todas las secciones del sidebar cerradas y sin lección actual. En la columna, un bloque `Hero`: título (`h1`, `heading/1`), subtítulo (`heading/4`, `text/neutral/subtle`), párrafo (`body/default`) y `Button` `primary` con icono "Empezar el curso", y la imagen isométrica de Oscar (decorativa, `alt=""`; dos renders, Light y Dark, cuadrados y recortados con `radius/container`, D43). Escritorio: dos columnas iguales, hueco `space/1200`, relleno vertical `space/1600`. Móvil: apilados, imagen después del texto, relleno `space/600`.

### 4.10 Ajustes tras el diseño de Oscar (2026-10-02)

Lo diseñado en Figma manda sobre este documento en lo visual. Diferencias con lo escrito arriba, aceptadas:

| Componente | Cómo quedó en Figma |
|---|---|
| `LessonHeader` | Con contenedor: borde `border/neutral/default` y `radius/container`. |
| `Prose` (`##`) | Los títulos `heading/2` usan `text/neutral/subtle` (7,74 / 7,65). |
| `Prose` (negrita y "En esta página") | Estilo `body/strong` (D17). |
| `Link` | Propiedad `size` (`default`/`small`/`caption`) solo de Figma: el enlace hereda el tamaño del texto que lo rodea. `caption` desde D41, para el pie. Icono externo: `li:external-link`, 16 px en los tres tamaños, como `size-400` en código. **Texto por tamaño (D41):** en Figma hay una propiedad de texto por tamaño, `children` (`body/default`), `children-small` (`body/small`) y `children-caption` (`caption/default`), porque una sola propiedad imponía el mismo estilo a todas las variantes. En React es un único `children` (excepción a §1.1). |
| `Callout` | Etiqueta fija por variante (D18). Borde de `pending`: `border/neutral/default` (decorativo). |
| `IconButton` | 40 × 40 px, sin fondo en `default`. |
| `Link` (icono externo) | Hueco `space/100` entre el texto y `li:external-link` en los dos tamaños (D33; antes `space/200` y `space/150`), como `ms-100` en código. |
| `Button` | Sin alto ni ancho mínimos (D33). Desde D39, con el borde, sin icono mide 38 px de alto y con icono 42 (en código, 37,59 y 42: Figma redondea el interlineado de `label/default` a 20 px). |
| `Button` (borde de `primary`, D39) | En Figma, trazo de `border-width/100` con la misma variable que el fondo de cada estado (`background/accent/strong/default`, `…/hover`, `…/active`; `default` en `focus`), por dentro y contado en el auto layout, como el borde de `secondary`. En código, `border-transparent` (V42): Figma no tiene una variable transparente y un 0 % de opacidad sería un valor suelto. Se ve igual y mide lo mismo; con colores forzados solo importa el código. `secondary` corregido a §2.2 en el mismo cambio (antes, borde solo en `active` y fondo en `focus`). **Anillo de `focus`:** rectángulo `Focus ring` fuera del auto layout, con trazo `border/focus` de `border-width/200` por fuera y `radius/control`, porque un marco no puede tener a la vez el trazo de 1 px por dentro y el de 2 px por fuera (patrón de D27). En código es el `outline` de `focus-ring`. |
| `ColorScale` (D34) | `ColorScaleStep` con `highlighted` y `ColorScale` con `palette` × `size`. `size` solo de Figma: `large` 11 columnas, `small` 4 (rejilla con huecos `space/200` y `space/400`). El hex es texto escrito desde el valor de la variable (en código se lee de los tokens al compilar): si la escala cambia, hay que actualizarlo. |
| `SidebarItem` / `SidebarSection` | Filas de 36 / 40 px (padding `space/200` vertical y `space/300` horizontal). En `focus` + `current`, la marca lateral es un rectángulo `Marker` porque el trazo lo ocupa el anillo de foco. |
| `LanguageSwitcher` / `ThemeToggle` | Grupo con fondo `background/neutral/strong`; la opción actual es un recuadro `background/neutral/default` con texto o icono `text/accent/default`. **Sin marca inferior desde V26** (capa `Marker` quitada de Figma el 2026-10-05, D33; riesgo de 1.4.1 y 1.4.11 aceptado). Opciones no actuales: texto o icono `text/neutral/subtle`; en hover, `text/neutral/default` y fondo `background/neutral/hover`. |
| `CodeBlock` | Props: `children`, `filename`; solo de Figma: `showFilename`, `showCopied`. Botón copiar: `IconButton` con `li:copy`. |
| `SkipLink` | Se dibuja en estado de foco. En las plantillas está oculto. |
| `SiteHeader` | `size=large` (escritorio) y `size=small` (móvil, sin selectores: D19). Fondo `background/neutral/translucent` (V28, D33). **Sin desenfoque en Figma:** `blur/300` es un token solo de código (pendiente de Oscar). |
| `SiteFooter` | Logotipo, autor y aviso P7. Todo el texto en `text/neutral/subtle` desde el 2026-10-05 (D33; antes, el autor en `default`). Desde D41, bloque `Notice` con el aviso y la línea `Report` (pregunta y `Link` con hueco `space/100`, porque Figma no cuenta el espacio final de un texto; en código es un espacio normal dentro del párrafo). |
| `Callout`, `InCode`, `LessonHeader`, `PageNavLink` | Borde de 1 px en los cuatro lados (`border-width/100`). |
| Plantilla | Columna con ancho máximo `size/content/max-width` (960 px, V27), centrada. Sidebar con todas las secciones (0 a 10 y Recursos, D40) y los tres grupos (D29). Contenido de `what-is-designtoken101` al día (D31). **Listas del texto:** en Figma son listas nativas, y la viñeta toma el color del texto (`text/neutral/default`); en código, `marker:text-neutral-subtle`. Visto en el archivo: la viñeta sale del color del primer carácter de la línea; no se ha buscado otra forma de cambiarla. "En esta página" sí lleva la viñeta en `subtle`, porque sus elementos son instancias de `Link` con un marco `Marker`. |
| Navegación móvil | Panel lateral con overlay (V25), en Figma desde el 2026-10-05 (D32): ancho `size/sidebar/width`, logotipo y botón de cerrar `li:x` arriba, selectores debajo y el sidebar; `Overlay` en `color/background/overlay` sobre la página y la cabecera. |
| `Callout` (etiqueta) | Icono y etiqueta en `text/{rol}/default` (V18), en Figma desde el 2026-10-05 (D33). |
| "En esta página" | Con viñetas (V19), en Figma desde el 2026-10-05 (D31): marco `Marker` de ancho `space/400` con "•" en `text/neutral/subtle` y la instancia de `Link`. |
| `SidebarSection` (D25) | Variante `current` (V30) con las 12 combinaciones de `state` × `open` × `current`. Anillo de foco por dentro, como `SidebarItem` (D27). Sin radio (D26), como `SidebarItem` (V23). Corregido para seguir §4.2 (decisión de Oscar, 2026-10-04): chevron de `focus` con `current = false` en `text/neutral/subtle` (antes `text/neutral/default`). En las plantillas, la sección de la lección actual tiene `current = true` y `open = true` (C11). |
| `SidebarSection`, número del módulo (D36) | Capa de texto `Number` delante del título, en las 12 variantes, con la propiedad de texto `number` y la booleana `showNumber` (solo Figma). Mismo estilo y color que el título; hueco `space/200` de la fila. **Cifras proporcionales en Figma:** la API no permite activar las cifras tabulares, así que los títulos empiezan entre 27 y 30 px según el número (en código, alineados a 29,08 px con `tabular-nums`). Diferencia aceptada por Oscar (D36): activarlas a mano podría desvincular el estilo. **Desde D40 (C19),** el número va en un marco `Number` con ancho mínimo `space/600` y el texto a la izquierda, así que los títulos empiezan a 44 px en Figma y en código; las cifras proporcionales solo cambian el aire dentro de la columna. `showNumber` oculta el marco entero. |
| `Takeaways` (D28) | Variante `size` solo de Figma: `large` (relleno `space/600`, Desktop) y `small` (`space/400`, Mobile), porque Layout no tiene tokens de espaciado. En código no es un prop: `p-400` y `desktop:p-600`. La marca `li:check` va en un marco `Marker` con `space/100` arriba y abajo (24 px, una línea de `body/default`); en código, `h-[1lh]`. Los 24 px del icono del título y los 16 de las marcas son tamaño de icono, sin variable, como en el resto del archivo. El `space/600` encima es el hueco de la columna de la lección (el mismo que antes de un `h2`). |
| Grupos del `Sidebar` (D29) | Componente `SidebarGroup` con el separador y la etiqueta (texto `label`); las secciones del grupo son hermanas, como los `SidebarItem`. En código, el grupo envuelve a sus secciones (`div role="group"`). **Relleno lateral de la etiqueta `space/300`**, como en código (`px-300`); §4.2 no lo dice. El separador cuenta en el auto layout (1 px + `space/200` hasta la etiqueta). En las plantillas, la lección de Recursos está oculta porque su sección está cerrada (C11). En el menú móvil abierto (812 px de alto), el grupo "Referencia" queda por debajo del borde del marco, como quedaría en la pantalla antes de hacer scroll. |
| `SiteFooter`, logotipo del autor (D30) | Conjunto `AuthorLink` con `state` `default` / `focus` (solo de Figma); el anillo va por fuera, como en `Link`. En código no es un componente propio: es el `<a>` de `SiteFooter`. |
| `Flow` (D24) | `FlowGroup` tiene una variante `size` solo de Figma: `large` (Desktop, pasos en fila que bajan de línea) y `small` (Mobile, pasos apilados a todo el ancho). Motivo: Figma no deja cambiar la dirección de un slot en una instancia. En código no es un prop: `flex-wrap` desde 64rem y apilados por debajo (D11). Conector como componente propio, `FlowConnector`. Foco de `FlowStep` dibujado como en `PageNavLink` (el anillo ocupa el lugar del borde); en código el borde se mantiene y el anillo va por fuera. Medidas en `entrega-diseno.md` §3.3. |

---

## 5. Componentes de las herramientas (T22): aprobado por Oscar el 2026-10-08 (D44 a D54)

**En Figma desde el 2026-10-08 (D55), revisados por Oscar (D56); nodos, medidas y diferencias en `entrega-diseno.md` §3.11; plantillas de las dos páginas en §3.12 (D57 a D60).**

Anatomía de lo que necesitan las dos páginas de Herramientas, "Generar escalas" (`/tools/color-scales`) y "Normalizar la exportación" (`/tools/normalize-export`) (nombres de T24), según el índice aprobado (`investigacion-herramientas.md` §9) y T22. Oscar diseña los componentes (D05); este apartado fija la estructura con la misma plantilla que el resto del documento. Las medidas que se citan (rellenos, alto de un área) son una propuesta: el aspecto lo decide Oscar, siempre con tokens. Los textos son los provisionales de §9; los definitivos los escribe la sesión de contenido.

**Sin tokens nuevos** (D44). Oscar aprobó las diez recomendaciones de §5.11 (D45 a D54).

### 5.1 Inventario

| Pieza de §9 | Página | Se resuelve con | Nuevo |
|---|---|---|---|
| Color de marca (hex, RGB o HSL) | Escalas | `TextField` (§5.2), con el hex resultante debajo (texto de la página, §5.10) | Sí |
| Nombre de la paleta | Escalas | `TextField` | Sí (el mismo) |
| Tinte de los neutros (0 a 1) | Escalas | Deslizador nativo con el valor al lado (C23, sustituye a D45) | Sí |
| Curva de referencia | Escalas | `Select` (§5.3) y dos frases de `Prose` | Sí |
| Gráfico del croma por paso | Escalas | `ChromaChart` (§5.8) | Sí |
| Escalas generadas | Escalas | `ColorScale` (§3.8) con los hex de la herramienta: prop nueva `colors` (§5.10) | Cambio |
| Tabla de cada escala (paso, oklch, hex, contraste, recorte) | Escalas | `Table` (§3.6), con `Code` para los valores | No |
| Pasos recortados y avisos de §5.2 | Escalas | Columna "Recorte" de la tabla (texto) y `Callout` `warning` (§3.2) con enlace a la lección | No |
| Vista previa sobre fondo claro y oscuro | Escalas | `ScalePreview` (§5.9) | Sí |
| Pasos que se exportan | Escalas | `Checkbox` en una columna de la tabla de cada escala (D46) | Sí (el mismo) |
| Descargar el `.tokens.json` | Escalas | `Button` `primary` con icono `li:download` | No (icono nuevo) |
| Copiar el enlace con los ajustes | Escalas | `Button` `secondary` con `li:link` y el texto "Enlace copiado", como el "Copiado" de `CodeBlock` | No (icono nuevo) |
| Importar en Figma (tres pasos) | Escalas | Lista numerada de `Prose` y `Callout` `warning` (*Import mode* cambia los valores sin preguntar) | No |
| Subir los .zip o una carpeta | Normalización | `FileUpload` (§5.5): dos `Button` `secondary`, zona para soltar y lista con `FileItem` | Sí |
| Decisiones de tipo | Normalización | `TypeDecision` (§5.6), con `Select` | Sí |
| Referencias sin destino | Normalización | `Callout` `warning` con la lista (`Code`) | No |
| Resumen (archivos, alias, tipos) | Normalización | `Table` | No |
| Descarga en .zip y un enlace por archivo | Normalización | `Button` `primary` con `li:download`; lista de `Link` | No |
| Resumen de errores con enlaces | Las dos | `ErrorSummary` (§5.7) | Sí |
| `SCOPE_TYPES`, descarga del script y comando | Normalización | `CodeBlock` (§3.4) y `Button` `secondary` con `li:download` | No |
| Quitar un archivo de la lista | Normalización | `IconButton` (§2.1) con `li:x` | No |
| Cabecera de la página | Las dos | `LessonHeader` (§4.1), sección "Herramientas" (D50) | No |
| Sección en el sidebar | Las dos | `SidebarSection` sin número (`showNumber = false`) y dos `SidebarItem`, en el grupo "Referencia", antes de Recursos | No |

**Iconos nuevos de Lucide** (D08, D53), como componentes locales en el marco `Icons` (D37): `li:upload`, `li:folder-open`, `li:download`, `li:link` y `li:circle-alert`. Los demás ya están (`li:x`, `li:check`, `li:chevron-down`, `li:triangle-alert`).

**Controles nativos.** `TextField`, `Select` y `Checkbox` son los elementos de HTML (`input`, `select`, `input type="checkbox"`) con estilo. El navegador da el teclado, el lector de pantalla y la lista abierta del `select`, que no se diseña (la dibuja el sistema).

**Sin `disabled`** (D14): ningún control se desactiva. El botón de descarga está siempre activo; si falta algo, muestra el `ErrorSummary` (§5.7, `investigacion-herramientas.md` §6.4).

### 5.2 `TextField`

**Para qué sirve.** Un campo de texto con su etiqueta. En Escalas: color de marca, nombre de la paleta y tinte de los neutros (D45).

**Esquema.**

```txt
TextField (div)
├── etiqueta (label for → campo)
├── ayuda (p, id) · opcional
├── campo (input)
└── error (p, id) · solo con error: icono li:circle-alert (decorativo) + texto
```

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `label` | `string`, obligatorio | Texto |
| `hint` | `string` opcional | Texto + booleano `showHint` |
| `error` | `string` opcional: el campo pasa a no válido | Texto + variante `invalid` = `true` / `false` |
| `code` | `boolean`: el valor se escribe en `code/default` (hex) | Variante `code` = `true` / `false` |
| `inputMode` | `'text' \| 'decimal'` | No se ve |
| `name`, `value`, `onChange` | | No se ven |
| `state` | solo Figma | Variante: `default`, `focus` |

**Variantes en Figma:** `state` (2) × `invalid` (2) × `code` (2) = 8. Sin `hover`: un campo de texto no cambia al pasar el puntero (WCAG no lo pide, 1.4.11), y así hay menos variantes.

**Tokens.**

| Parte | `default` | `focus` |
|---|---|---|
| Etiqueta | `text/neutral/default`, `label/default` | ← |
| Ayuda | `text/neutral/subtle`, `caption/default` | ← |
| Fondo del campo | `background/neutral/default` | ← |
| Borde del campo | `border/neutral/strong`, `border-width/100` | ← |
| Valor | `text/neutral/default`, `body/default` (`code/default` con `code`) | ← |
| Anillo de foco |: | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← |
| Error (icono y texto) | `text/danger/default`, `body/small` | ← |
| Separación | `space/100` entre etiqueta, ayuda y campo; `space/100` hasta el error | ← |

Con `invalid = true`, el borde no cambia (D47): el error se identifica por el texto y el icono. `border/danger/default` no sirve para un campo: en Light da 1,88:1.

**Accesibilidad.**
- Etiqueta siempre visible (3.3.2); sin `placeholder` como etiqueta.
- `aria-describedby` apunta a la ayuda y al error; con error, `aria-invalid="true"` (3.3.1).
- El borde da 4,70 / 4,20 frente a la página (1.4.11): por eso `border/neutral/strong` y no `default` (`sistema-tokens-v1.md` §6.2, "No se comprueban").
- Alto de al menos 24 px (2.5.8). Ancho flexible: a 320 px ocupa la columna.
- En el campo del color, `autocomplete="off"` y `spellcheck="false"`.
- El error aparece al salir del campo y al pulsar la descarga, no mientras se escribe por primera vez (C22).

**Contraste** (Light / Dark): etiqueta y valor 17,79 / 18,89; ayuda 7,74 / 7,65; error 6,29 / 10,52 sobre la página; borde 4,70 / 4,20; anillo 3,33 / 10,92.

### 5.3 `Select`

**Para qué sirve.** Elegir una opción de una lista: la curva de referencia (Escalas) y el tipo DTCG de cada combinación (Normalización, dentro de `TypeDecision`).

**Esquema.**

```txt
Select (div)
├── etiqueta (label for → select)
├── ayuda (p, id) · opcional
├── select nativo + chevron li:chevron-down (decorativo, encima del select)
└── error (p, id) · solo con error
```

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `label` | `string`, obligatorio | Texto |
| `hint` | `string` opcional | Texto + booleano `showHint` |
| `error` | `string` opcional | Texto + variante `invalid` |
| `options` | `{ value, label }[]` | Texto `value` (la opción elegida) |
| `placeholder` | `string` opcional: primera opción, con valor vacío ("Elige un tipo", §6.4) | Se ve como el valor cuando no hay opción elegida |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Variantes en Figma:** `state` (3) × `invalid` (2) = 6. Aquí sí hay `hover`, porque el `select` se pulsa como un botón.

**Tokens.**

| Parte | `default` | `hover` | `focus` |
|---|---|---|---|
| Etiqueta, ayuda y error | Como `TextField` | ← | ← |
| Fondo | `background/neutral/default` | `background/neutral/hover` | `background/neutral/default` |
| Borde | `border/neutral/strong`, `border-width/100` | ← | ← |
| Valor | `text/neutral/default`, `body/default` | ← | ← |
| Chevron | `text/neutral/subtle` | `text/neutral/default` | `text/neutral/subtle` |
| Anillo de foco |: |: | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` | ← | ← |

**Accesibilidad.**
- `select` nativo: el teclado y la lista abierta los da el navegador. El chevron es decorativo (`aria-hidden`) y no recibe el puntero.
- En las decisiones de tipo no hay opción elegida por defecto: la primera es el `placeholder` con valor vacío (§6.4 de la investigación). En la curva, `green` viene elegida (T22).
- Borde 4,70 / 4,20 sobre la página y 4,30 / 3,19 sobre `background/neutral/hover` (≥ 3:1).

**Contraste:** valor 17,79 / 18,89 (`default`) y 16,28 / 14,34 (`hover`); chevron 7,74 / 7,65.

### 5.4 `Checkbox`

**Para qué sirve.** Marcar los pasos que se exportan, en la columna "Exportar" de la tabla de cada escala (D46). Sin `CheckboxGroup` desde T23: la herramienta ya no genera escalas de estado, que era su único uso.

**Esquema.**

```txt
Checkbox (label que envuelve)
├── caja: input type="checkbox" con estilo (appearance: none) · marca li:check
└── texto
```

**Props de `Checkbox`.**

| Prop | Tipo | En Figma |
|---|---|---|
| `label` | `string` | Texto (booleano `showLabel` para la columna de la tabla, donde la etiqueta es solo accesible) |
| `checked` / `defaultChecked` | `boolean` | Variante `checked` = `true` / `false` |
| `name`, `value`, `onChange` | | No se ven |
| `state` | solo Figma | Variante: `default`, `hover`, `focus` |

**Variantes en Figma:** `Checkbox` `checked` (2) × `state` (3) = 6.

**Tokens de la caja.**

| Parte | `checked = false` | `checked = false`, `hover` | `checked = true` | `checked = true`, `hover` |
|---|---|---|---|---|
| Relleno | `background/neutral/default` | `background/neutral/hover` | `background/accent/strong/default` | `background/accent/strong/hover` |
| Borde | `border/neutral/strong`, `border-width/100` | ← | `border/accent/strong`, `border-width/100` | ← |
| Marca `li:check` |: |: | `text/on-accent` | `text/on-accent` |
| Radio | `radius/100` (primitivo, como `Code`: `radius/control` es demasiado redondo para 16 px) | ← | ← | ← |
| Anillo de foco (`focus`) | `border/focus`, `border-width/200`, por fuera de la caja | | ← | |

| Parte | Token |
|---|---|
| Caja | 16 × 16 px (`space/400`) |
| Texto | `text/neutral/default`, `body/default` |
| Fila | alto mínimo `space/600` (24 px); hueco caja–texto `space/200` |
| Legend | `text/neutral/default`, `label/default`; ayuda `text/neutral/subtle`, `caption/default` |
| Entre casillas | `space/200` (en fila, bajan de línea si no caben) |

**Accesibilidad.**
- `input type="checkbox"` con `appearance: none`: sigue siendo la casilla del navegador para el teclado (barra espaciadora) y el lector de pantalla. La etiqueta envuelve la caja, así que pulsar el texto también marca, y la fila mide al menos 24 px de alto (2.5.8).
- El estado no depende solo del color: marcada lleva `li:check` (1.4.1).
- Borde sin marcar 4,70 / 4,20 frente a la página (1.4.11); marcada, el borde `border/accent/strong` da 3,33 / 10,92 y la marca sobre el relleno 9,63 / 9,63 (10,92 en hover). Por eso el borde de la marcada no es el relleno: `emerald/500` sobre blanco da 2,05:1.
- El grupo es un `fieldset` con `legend`, que el lector anuncia al entrar.

### 5.5 `FileUpload` y `FileItem`

**Para qué sirve.** Subir lo que exporta Figma en Normalización: uno o varios .zip de *Export modes* o una carpeta con una subcarpeta por colección (T22, 2). Dos botones como vía principal y una zona para soltar como atajo (`investigacion-herramientas.md` §2).

**Esquema.**

```txt
FileUpload (div, role="group", aria-labelledby → etiqueta)
├── etiqueta (p, id) · ayuda (p)
├── zona (div): los botones van dentro
│     ├── icono li:upload (decorativo)
│     ├── Button secondary "Elegir archivos .zip" (li:upload) → input type="file" accept=".zip" multiple, oculto
│     ├── Button secondary "Elegir una carpeta" (li:folder-open) → input type="file" webkitdirectory, oculto
│     └── texto "o suelta aquí los .zip o la carpeta"
├── lista (ul, aria-label "Archivos cargados") · solo si hay archivos
│     └── FileItem × n
└── región de estado (role="status", visualmente oculta)
```

**Props de `FileUpload`.**

| Prop | Tipo | En Figma |
|---|---|---|
| `label`, `hint` | `string` | Texto (+ `showHint`) |
| `files` | lista de archivos cargados | Slot `files` con `FileItem` (D57) + booleano `showList` |
| `onAdd`, `onRemove` | funciones | No se ven |
| `dragOver` | solo Figma: hay un archivo encima de la zona (en código, una clase entre `dragenter` y `dragleave`) | Variante `dragOver` = `true` / `false` |

**Props de `FileItem`.**

| Prop | Tipo | En Figma |
|---|---|---|
| `name` | `string`: nombre del .zip o de la subcarpeta | Texto |
| `detail` | `string`: colección y archivos que trae ("Primitives · 1 archivo") | Texto |
| `error` | `string` opcional (por ejemplo, un .zip sin `*.tokens.json` o dos con el mismo nombre de colección) | Texto + variante `invalid` |

**Variantes en Figma:** `FileUpload` `dragOver` (2); `FileItem` `invalid` (2).

**Tokens de la zona.**

| Parte | `dragOver = false` | `dragOver = true` |
|---|---|---|
| Fondo | `background/neutral/subtle` | `background/accent/subtle` |
| Borde | `border/neutral/default`, `border-width/100`, continuo (D49) | `border/accent/strong`, `border-width/200` |
| Icono y texto | `text/neutral/subtle`, `body/small` | ← |
| Radio | `radius/container` | ← |
| Relleno | `space/600` | ← |
| Entre botones | `space/200`; bajan de línea si no caben | ← |

**Tokens de `FileItem`.**

| Parte | Token |
|---|---|
| Nombre | `text/neutral/default`, `code/default` |
| Detalle | `text/neutral/subtle`, `caption/default` |
| Error | `text/danger/default`, `body/small`, con `li:circle-alert` |
| Botón quitar | `IconButton` con `li:x` y `label` "Quitar {nombre}" |
| Separador entre filas | `border/neutral/default`, `border-width/100` |
| Relleno de la fila | `space/200` vertical |

**Accesibilidad.**
- Los botones abren el selector del sistema: subir no exige arrastrar (2.5.7). Los `input type="file"` quedan ocultos y fuera del orden de tabulación; el botón visible es el control.
- Dos botones porque un mismo `input` no elige archivos y carpetas a la vez (`webkitdirectory`, §2 de la investigación).
- La zona no es un control: no recibe el foco. Su texto lo lee el lector como un párrafo más.
- Al añadir o quitar, la región `role="status"` lo anuncia (4.1.3). Al quitar un archivo, el foco pasa al botón de quitar siguiente o, si la lista queda vacía, al primer botón (2.4.3).
- `dragOver` no depende solo del color: el borde pasa a 2 px.

**Contraste:** texto de la zona 7,40 / 6,89 sobre `subtle` y 7,38 / 5,82 sobre `accent/subtle`; borde de `dragOver` 3,18 / 8,30 sobre `accent/subtle`; nombre 17,79 / 18,89; detalle 7,74 / 7,65; error 6,29 / 10,52.

### 5.6 `TypeDecision`

**Para qué sirve.** Pedir al usuario el tipo DTCG de una combinación de `$type` y scopes que no tiene correspondencia clara (`investigacion-herramientas.md` §6.3 y §6.4). Uno por combinación; solo aparecen si hacen falta.

**Esquema.**

```txt
TypeDecision (fieldset, id)
├── legend: "12 variables de número con el scope LINE_HEIGHT"
├── ejemplos (p): tres nombres en Code
├── lista completa (details)
│     ├── summary "Ver las 12 variables" + chevron
│     └── lista (ul) de nombres en Code
└── Select "Tipo DTCG" · placeholder "Elige un tipo" · error si falta
```

**Props.**

| Prop | Tipo | En Figma |
|---|---|---|
| `legend` | `string` | Texto |
| `examples` | `string[]` (tres nombres) | Texto |
| `tokens` | `string[]`: todos los nombres | Slot de la lista + variante `open` |
| `options` | las opciones posibles para ese tipo (§6.3) | Las del `Select` |
| `error` | `string` opcional | La del `Select` |

**Variantes en Figma:** `open` (2). El `Select` lleva sus propias variantes; el `summary`, `state` `default`, `hover` y `focus` como la cabecera de `InCode`.

**Tokens.**

| Parte | Token |
|---|---|
| Contenedor | Sin fondo; borde `border/neutral/default`, `border-width/100`; `radius/container`; relleno `space/400` |
| Legend | `text/neutral/default`, `label/default` |
| Ejemplos | `text/neutral/subtle`, `body/small`; nombres con `Code` |
| `summary` | `text/neutral/default`, `label/default`; chevron `text/neutral/subtle`; en hover, fondo `background/neutral/hover` y chevron `text/neutral/default`; `radius/control`; anillo de foco por fuera |
| Separación | `space/300` entre las partes |

**Accesibilidad.**
- `fieldset` con `legend`: el lector anuncia la combinación al llegar al `select` (§6.4).
- `details` y `summary` nativos (patrón Disclosure sin ARIA propio). El `summary` mide al menos 24 px de alto.
- El enlace del `ErrorSummary` lleva al `select` de cada grupo, que recibe el foco.

**Contraste:** legend 17,79 / 18,89; ejemplos y chevron 7,74 / 7,65.

### 5.7 `ErrorSummary`

**Para qué sirve.** Decir qué falta cuando se pulsa una descarga que no puede hacerse, con un enlace a cada campo (§6.4 de la investigación; 3.3.1 y 3.3.2). Sustituye al botón desactivado (D14). Se usa en las dos páginas.

**Por qué no es un `Callout`.** El `Callout` acompaña al texto y no recibe el foco. `ErrorSummary` aparece por una acción del usuario, recibe el foco y es una lista de enlaces a los campos.

**Esquema.**

```txt
ErrorSummary (div, tabindex="-1", aria-labelledby → título)
├── icono li:circle-alert (decorativo) · título (h2): "Falta algo para descargar"
└── lista (ul): Link × n ("Elige el tipo de las 12 variables con LINE_HEIGHT" → #id del select)
```

**Props.** `title` (`string`) y `errors` (`{ message, href }[]`). En Figma: texto `title` y slot con los `Link`.

**Variantes en Figma:** 1, más `state` `default` / `focus` (solo Figma).

**Tokens.**

| Parte | Token |
|---|---|
| Fondo | `background/danger/subtle` |
| Borde | `border/danger/default`, `border-width/100` (decorativo, como el de `Callout`) |
| Icono y título | `text/danger/default`; título `body/strong` |
| Enlaces | `Link` (§2.3), `size=default` |
| Radio | `radius/container` |
| Relleno | `space/400` por debajo de 64rem, `space/600` desde 64rem |
| Anillo de foco (`focus`) | `border/focus`, `border-width/200`, por fuera |

Usa por primera vez los tokens de `danger` (S31: se mantenían sin uso).

**Disposición.** Encima del botón de descarga, donde está el usuario al pulsarlo (D52). Desaparece cuando no queda ningún error y se vuelve a pulsar.

**Accesibilidad.**
- Al pulsar la descarga con errores, aparece y recibe el foco (`tabindex="-1"`), así que el lector lee el título y la lista. Sin `role="alert"`: el foco ya lo anuncia.
- Cada enlace lleva al campo, que recibe el foco; cada campo muestra además su propio error (3.3.1).
- El título dice qué pasa en texto, no solo con el color (1.4.1).

**Contraste** (sobre `background/danger/subtle`): título 5,75 / 8,49; enlaces 4,65 / 8,82; anillo sobre la página 3,33 / 10,92.

### 5.8 `ChromaChart`

**Para qué sirve.** Mostrar junto al selector de la curva qué es la curva de referencia: el croma de cada uno de sus 11 pasos (petición de Oscar en T22, 8). Cambia al elegir otra curva.

**Esquema.** Barras horizontales, una fila por paso: así cabe igual a 320 px y en escritorio.

```txt
ChromaChart (figure)
├── lista ordenada (ol)
│     └── paso (li): número del paso · barra (decorativa) · valor de C   × 11
└── pie (figcaption): "Croma por paso de la curva green"
```

**Props.**

| Prop | Tipo | Notas |
|---|---|---|
| `curve` | `string` | Nombre de la curva (pie y nombre accesible) |
| `chroma` | `number[]` (11) | Valores de C de la curva, de 50 a 950 |
| `max` | `number` | Escala fija del eje: el mayor C de las 17 curvas, para que al cambiar de curva las barras se puedan comparar |
| `highlight` | `string` opcional | Paso donde cae la marca (paso ancla), como en `ColorScale` |
| `highlightLabel` | `string` opcional | "Tu color", obligatorio con `highlight` (1.4.1) |
| `highlightColor` | `string` opcional | Hex del usuario para el relleno de la barra destacada (C21) |

**Datos.** El largo de cada barra es un dato (C ÷ `max`), no un estilo, como el relleno de las muestras de `ColorScale`: no sale de un token. También el relleno de la barra destacada, que es el color del usuario (C21). Todo lo demás, sí.

**Tokens.**

| Parte | Token |
|---|---|
| Barra | Relleno `background/neutral/strong`; solo borde inferior `border/neutral/default`, `border-width/100`; sin radio (`radius/0`); alto de la fila, `space/600` (D56) |
| Barra del paso destacado | Relleno con el hex del usuario (`highlightColor`, dato), borde inferior `border/neutral/strong`, + `highlightLabel` (C21, cambia D56) |
| Número del paso | `text/neutral/default`, `label/default`, columna de ancho mínimo `space/800` |
| Valor de C | `text/neutral/subtle`, `caption/default` (con coma decimal: "0,137") |
| Fila | alto `space/600`, el de la barra; hueco `space/200` |
| Pie | `text/neutral/subtle`, `caption/default` |

**Accesibilidad.**
- `figure` con `figcaption`; los pasos son una `ol`, y cada `li` se lee "500, croma 0,137". La barra es decorativa (`aria-hidden`): el dato está en el texto.
- Como la información está en el texto, la barra no necesita 3:1 (1.4.11): es decorativa. La del paso destacado se distingue también por "Tu color" (1.4.1); su relleno es el color del usuario, que puede no contrastar con la página, y por eso lleva el borde inferior `border/neutral/strong` (4,70 / 4,20).

### 5.9 `ScalePreview`

**Para qué sirve.** Ver las escalas generadas sobre un fondo claro y uno oscuro (T22, tomado de Scale).

**Esquema.**

```txt
ScalePreview (figure)
├── panel claro (div, aria-hidden) · etiqueta debajo "Sobre blanco"
│     └── una fila de 11 muestras por escala generada
├── panel oscuro (div, aria-hidden) · etiqueta debajo "Sobre neutral 950"
└── pie (figcaption)
```

**Props.** `scales` (`{ name, colors: string[] }[]`), `light` y `dark` (hex de los dos fondos), `caption`. En Figma, además, la variante `size` (solo Figma, D58): `large`, dos columnas; `small`, paneles apilados.

**Datos.** El fondo de cada panel y las muestras son colores de la escala del usuario, no tokens de la web, como las muestras de `ColorScale`. Fondo claro (D48) `#FFFFFF` y fondo oscuro el `neutral/950` generado (los fondos de página de DesignToken101, D23, con los valores del usuario). Los paneles no cambian con Light y Dark.

**Tokens.**

| Parte | Token |
|---|---|
| Panel: borde | `border/neutral/default`, `border-width/100` (para que el panel claro se vea en Light) |
| Panel: radio y relleno | `radius/container`; `space/400` |
| Fila de muestras | una tira continua: sin hueco entre muestras (`space/0`), `radius/control` en la fila y recorte del contenido; `space/100` entre filas (D56) |
| Muestra | alto `space/800`; sin radio ni borde (se ve el color contra el fondo) |
| Etiquetas y pie | `text/neutral/subtle`, `caption/default` |
| Disposición | Dos columnas desde 64rem; apilados por debajo |

**Accesibilidad.** Los paneles son decorativos (`aria-hidden`): los valores están en las tablas. Las etiquetas y el pie van sobre el fondo de la página, con el contraste de los tokens de texto (7,74 / 7,65), sea cual sea el color del panel.

### 5.10 Cambios en componentes que ya existen y plantillas

- **`ColorScale` (C14, D54):** prop nueva `colors` (11 hex) con `name`, en lugar de `palette`, para los hex que calcula la herramienta (`investigacion-herramientas.md` §5.6). En las lecciones no cambia nada. En Figma no cambia: el hex ya es un texto. `highlight` marca el paso de la marca ("Tu color").
- **`Table`:** sin cambios. En Escalas, columnas Exportar (D46; `Checkbox` sin etiqueta visible: "Exportar el paso 500 de emerald"), Paso, oklch, Hex, Contraste con blanco, Contraste con `neutral/950` y Recorte ("−45 %", en texto; vacío si no recorta).
- **Hex resultante** (Escalas): debajo del campo del color, una línea `output` con una muestra decorativa de 24 px (`space/600`, `radius/100`, borde `border/neutral/default`) y "Se usa el hex #33CC99" (`body/small`, `text/neutral/subtle`, el hex en `Code`). No es un componente.
- **`Sidebar`:** sección "Herramientas" sin número, en el grupo "Referencia", antes de Recursos, con "Generar escalas" y "Normalizar la exportación" (T24).

**Plantillas de Escalas de color** (D51: Desktop y Mobile, Light y Dark, más un marco Desktop Light con errores), con los valores de DesignToken101 (`#33CC99`, `emerald`, tinte 0,5, `green`). El resultado son dos escalas, la del color y la de neutros (T23):

```txt
LessonHeader (sección "Herramientas", "Generar escalas")
Prose: introducción con enlace a la lección "Escalas de color"
## Entrada
   TextField "Color de marca" (code) · hex resultante
   TextField "Nombre de la paleta"
   TextField "Tinte de los neutros" (D45)
   Select "Curva de referencia" · dos frases · ChromaChart
## Resultado
   Callout warning × avisos (ninguno con DesignToken101)
   por escala: ### nombre · ColorScale · Table (con la columna Exportar)
   ScalePreview
## Exportar
   ErrorSummary (solo con errores)
   Button primary "Descargar el archivo .tokens.json" · Button secondary "Copiar el enlace con los ajustes"
## Importar en Figma
   Lista numerada (3 pasos) · Callout warning
```

**Marco con errores de Escalas** (D59): color `#33CC9` y tinte `1,5` no válidos, cada campo con su error, `ErrorSummary` con un enlace a cada uno y el resultado de la última entrada válida ("Se usa el hex #33CC99").

**Plantillas de Completar la exportación** (D51), con los cuatro .zip de DesignToken101 cargados (sin decisiones pendientes); el marco con errores (D60) añade un `Foundations.zip` de ejemplo, lleva dos `TypeDecision` sin tipo y el `ErrorSummary`, y no muestra el resumen ni los enlaces por archivo mientras falte una decisión:

```txt
LessonHeader (sección "Herramientas", "Normalizar la exportación")
Prose: introducción con enlace a la lección "Completar la exportación"
## Subir
   FileUpload con 4 FileItem
## Decisiones (solo si hacen falta)
   TypeDecision × n
## Avisos (solo si hay referencias sin destino)
   Callout warning
## Resultado
   Table (archivos, alias, tipos)
   ErrorSummary (solo con errores)
   Button primary "Descargar dtcg.zip" · lista de Link, uno por archivo
## En tu repositorio
   Prose (dos frases) · Button secondary "Descargar figma-to-dtcg.mjs" · CodeBlock (SCOPE_TYPES) · CodeBlock (comando)
   Enlace a "Las variables CSS"
```

### 5.10b Cambios del 2026-10-08 (C23 a C26)

- **Deslizador del tinte (C23):** `label` (`label/default`), ayuda (`caption/default`, `text/neutral/subtle`), `input type="range"` (`min=0`, `max=1`, `step=0.05`) con `accent-color` `border/accent/strong`, y a su derecha un `output` con el valor ("0,5", `body/default`, `text/neutral/default`). Ancho flexible; alto del objetivo de al menos 24 px (2.5.8). Sin error. Componente nuevo en Figma.
- **Botón "Generar escalas" (C24):** `Button` `primary` debajo de la curva y su gráfica; `ErrorSummary` encima de él cuando hay errores; el `h2` "Resultado" recibe el foco al generar; debajo, una línea `body/small` `text/neutral/subtle` con lo generado (el hex en `Code`). Sin resultado mientras haya errores.
- **Curva y nombre propuestos (C25, C26):** el `Select` de la curva y el `TextField` del nombre empiezan con la propuesta y la siguen hasta que el usuario los cambia.
- **Resultado desactualizado (C27):** con color, tinte o curva distintos de los generados, las muestras de `ColorScale` y `ScalePreview` a `opacity/inactive`; debajo del `h2` "Resultado", el aviso `staleNotice` en `role="status"` (`body/small`, `text/neutral/default`, con `li:circle-alert` en `text/warning/default`); la descarga, bloqueada con `errorStale` en el `ErrorSummary`. El nombre escrito por el usuario se aplica al momento; el propuesto, al generar (C28). Un nombre no válido bloquea la descarga con `errorName` (C28).
- **Aviso de recorte (C25):** `Callout` `note`; marca sin croma y paso extremo siguen en `warning`.

### 5.11 Preguntas para Oscar: aprobadas las diez recomendaciones el 2026-10-08 (D45 a D54)

1. **Tinte de los neutros.** (a) `TextField` numérico (`inputMode="decimal"`, de 0 a 1, ayuda "0 es gris puro; DesignToken101 usa 0,5"); (b) un deslizador con el mismo campo al lado (componente nuevo; el campo es la alternativa a arrastrar, 2.5.7). *Recomendación: a*: no hace falta otro componente (P11), no hay nada que arrastrar y el valor es el mismo `TINT` del script.
2. **Pasos que se exportan.** (a) una columna "Exportar" en la tabla de cada escala, con los 11 marcados; (b) un solo grupo de 11 casillas para todas las escalas. *Recomendación: a*: el acento y los neutros suelen necesitar pasos distintos, y la casilla queda en la fila del paso que describe.
3. **Campo con error.** (a) el borde no cambia (`border/neutral/strong`); el error lo dicen el texto y el icono en `text/danger/default`; (b) token nuevo `color/border/danger/strong` (Light `red/600`, 4,68 sobre blanco; Dark `red/400`, 7,09 sobre `neutral/950`) para el borde del campo no válido. `border/danger/default` no sirve: en Light da 1,88:1, menos que el borde normal. *Recomendación: a*, sin token nuevo; si prefieres el borde rojo, b.
4. **Fondos de la vista previa.** (a) blanco y el `neutral/950` generado para el usuario; (b) los fondos de la web (Light y Dark de DesignToken101). *Recomendación: a*: la vista previa es del sistema del usuario, y su `neutral/950` lleva su tinte.
5. **Borde de la zona para soltar.** (a) continuo; (b) discontinuo, que en Figma pide una longitud de trazo sin variable. *Recomendación: a* (solo tokens, S27).
6. **Cabecera.** (a) `LessonHeader` como en las lecciones (sección, título, descripción y fecha de revisión); (b) sin la fecha. *Recomendación: a*: sin cambios en el componente, y la fecha dice cuándo se comprobó la herramienta.
7. **Estados en las plantillas.** (a) el estado con resultado en los cuatro marcos de cada página, más un marco Desktop Light de cada página con errores (`ErrorSummary`, campos no válidos y, en Normalización, dos `TypeDecision`); (b) solo el estado con resultado. *Recomendación: a*: los errores son la parte nueva del diseño.
8. **Sitio del `ErrorSummary`.** (a) encima del botón de descarga; (b) al principio de la herramienta. *Recomendación: a*: las páginas son largas y el usuario está en el botón.
9. **Iconos nuevos** (§5.1): `li:upload`, `li:folder-open`, `li:download`, `li:link` y `li:circle-alert`. *Recomendación: sí.*
10. **`ColorScale` con `colors`** (§5.10): cambia C14. *Recomendación: sí* (lo pide §5.6 de la investigación).

---

## 6. Decisiones que afectan a este documento

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
| D20 | `size/content/max-width` = 720 px (960 px desde V27). |
| D21 | Panel de navegación móvil a pantalla completa. **Sustituida por V25:** panel lateral con overlay. |
| D22 | Logotipos como SVG, fuera de la regla "solo tokens". |
| V16 | `size/sidebar/width` = 304 px (sidebar de escritorio y panel móvil). |
| V17 | Sidebar fijo (`sticky`) en escritorio. |
| V18 | Etiqueta del `Callout` en `text/{rol}/default`. |
| V19 | "En esta página" con viñetas. |
| V23 | `SidebarItem` sin radio. |
| V24 | Animación del acordeón y del panel móvil con `duration/200` y `easing/standard`. |
| V25 | Panel móvil lateral con overlay `color/background/overlay`. |
| V26 | Selectores sin marca inferior en la opción actual. |
| V27 | `size/content/max-width` = 960 px. |
| C13 | Componente `Flow` (con `FlowGroup` y `FlowStep`) para los gráficos del curso (§3.7). |
| C14 | Componente `ColorScale` para las escalas de color (§3.8). Propuesta, pendiente de revisión. |
| D24 | Diseño de `Flow` aprobado: `FlowConnector` propio y variante `size` de `FlowGroup` solo de Figma (§4.10). |
| D25 | Variante `current` de `SidebarSection` en Figma (§4.2, §4.10). |
| D26 | `SidebarSection` sin radio, como `SidebarItem` (§4.2). |
| D27 | Anillo de foco por dentro en `SidebarSection` y `SidebarItem` (§4.2). |
| D28 | `Takeaways` en Figma con `size` solo de Figma (§3.9, §4.10). |
| D29 | Grupos del `Sidebar` en Figma: `SidebarGroup` con separador y etiqueta (§4.2, §4.10). |
| D30 | Logotipo del autor del pie como `AuthorLink` con estado `focus` (§4.8, §4.10). |
| D31 | Plantillas al día con el código y la lección: texto en `text/neutral/default`, viñetas en "En esta página", sección en `LessonHeader` (§4.10). |
| D32 | Panel de navegación móvil lateral en Figma (V25, §4.10). |
| D33 | Componentes al día con el código: V18, V26, V28 (sin desenfoque), pie, `Link` y `Button` (§4.10). |
| D34 | `ColorScale` en Figma (§3.8, §4.10). |
| D39 | Borde de `Button` `primary` en Figma con la variable de su fondo; `secondary` con borde en los cuatro estados; anillo de `focus` en capa aparte (§2.2, §4.10). |
| C19, V40 | Número del módulo en la cabecera de `SidebarSection`, del prefijo de la carpeta; sin número con prefijo de 90 o más (§4.2). |
| D40 | Número de `SidebarSection` en Figma en un marco de ancho mínimo `space/600`, alineado al inicio; secciones 8 a 10 en las plantillas (§4.10). |
| D41, P25 | Enlace a los issues en `SiteFooter`; `Link` con `size=caption` (§2.3, §4.8, §4.10). |
| D42, P27 | Plantilla de la portada (§4.9). |
| D43 | Imagen de la portada en mapa de bits, una por tema (§4.9). |
| D44 | Componentes de las herramientas, sin tokens nuevos (§5). |
| D45 a D54 | Tinte con `TextField` numérico, columna "Exportar", campo con error sin cambio de borde, fondos de `ScalePreview`, borde continuo de la zona, `LessonHeader`, estados de las plantillas, sitio de `ErrorSummary`, iconos nuevos y `ColorScale` con `colors` (§5.11). |
| D55 | Componentes de las herramientas en Figma, primera versión de la sesión de diseño (§5; `entrega-diseno.md` §3.11). |
| D56 | Cambios de Oscar en `ChromaChart` (barras como filas de tabla) y `ScalePreview` (escalas en tiras continuas) (§5.8, §5.9). |
| D57 | Lista de `FileUpload` como slot `files` (§5.5). |
| D58 | `ScalePreview` con variante `size` solo de Figma (§5.9). |
| D59, D60 | Marcos con errores de las plantillas de las herramientas (§5.10). |
