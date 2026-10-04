# Tokens101: Entrega de diseño a desarrollo

Documento para la sesión de desarrollo (pasos 7 y 8 de `docs/estado.md`). Resume qué hay en Figma, cómo se corresponde con el código y qué no sale en la exportación de Figma. Fecha: 2026-10-02. **El diseño está cerrado** salvo A14 (nombre del logotipo), que no bloquea.

Archivo: [TokensDS](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS) · plan Professional · perfil sRGB.

Documentos de referencia: `docs/sistema-tokens-v1.md` (tokens: fuente de verdad), `docs/componentes-v1.md` (anatomía y props), `docs/decisiones.md`.

> **Cambios posteriores a la entrega (sesión de desarrollo, 2026-10-03, decididos por Oscar).** Mandan sobre lo que dice este documento y sobre el archivo de Figma hasta que diseño los incorpore:
> - **V16:** token `size/sidebar/width` = 304 px (Semantic size). Pendiente de crear en Figma.
> - **V23:** `SidebarItem` sin radio.
> - **V24:** tokens solo de código `duration/200` y `easing/standard` para las animaciones.
> - **V25 (sustituye a D21):** el panel móvil es lateral, entra desde la izquierda con el ancho `size/sidebar/width` y un overlay `color/background/overlay` (negro al 50 %). Pendiente de crear el token y de dibujar el panel en Figma.
> - **V26:** los selectores de idioma y tema no llevan marca inferior (`Marker`). Pendiente de quitarla en Figma.
> - **V27:** `size/content/max-width` = 960 px (ya cambiado en Figma; falta actualizar la descripción de la variable, que dice 720 px).

---

## 1. Dónde está cada cosa

| Qué | Página | Nodo |
|---|---|---|
| Átomos (`Icon`, `Code`, `TableCell`, `LanguageOption`, `ThemeOption`, `Symbol`, `Logo`) | Components | [24:847](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-847) |
| Moléculas (`Button`, `IconButton`, `Link`, `Callout`, `InCode`, `CodeBlock`, `SkipLink`, `LessonHeader`, `SidebarItem`, `SidebarSection`, `PageNavLink`, `LanguageSwitcher`, `ThemeToggle`) | Components | [24:849](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-849) |
| Organismos (`SiteHeader`, `SiteFooter`) | Components | [35:242](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-242) |
| Lección, escritorio, Light / Dark | Pages | [35:843](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-843) / [35:1479](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-1479) |
| Lección, móvil, Light / Dark | Pages | [52:487](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=52-487) / [52:688](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=52-688) |
| Menú móvil abierto, Light / Dark | Pages | [55:699](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=55-699) / [55:833](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=55-833) |
| Muestra de estilos de texto | Foundations |: |
| `Flow`, `FlowGroup`, `FlowStep`, `FlowConnector` (C13, §3.3 de este documento) | Components | [62:256](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=62-256) |
| Ejemplo de `Flow`: metodología, Desktop / Mobile × Light / Dark | Pages | [64:842](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-842) |

Las plantillas usan el contenido real de `content/es/00-start-here/01-what-is-tokens101.mdx`.

## 2. Variables (paso 7)

| Colección | Modos | Variables | Exportar |
|---|---|---|---|
| Primitives | Value | 97 | Sí |
| Semantic color | Light, Dark | 31 | Sí (un archivo por modo) |
| Semantic size | Value | 3 (`radius/control`, `radius/container`, `size/content/max-width`); falta `size/sidebar/width` (V16) | Sí |
| Layout | Desktop, Mobile | 9 (`font-size/{estilo}`) | Sí (un archivo por modo) |

- Todas tienen code syntax Web `var(--t101-…)` (D03). Ninguna con `ALL_SCOPES`.
- **Si ya exportaste antes del 2026-10-02, vuelve a exportar:** desde entonces se añadieron la colección Layout, 5 colores semánticos (`border/accent/default`, `background/neutral/hover`, `background/neutral/active`, `text/accent/hover`, `border/accent/strong`) y `size/content/max-width`.
- **Cómo exportar:** en la vista Variables, clic derecho sobre la colección → *Export modes* (todos sus modos) o sobre un modo → *Export mode* ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)). Los archivos se guardan en `tokens/figma/` del repositorio, sin editarlos a mano (C10).
- **Modos en CSS:**
  - Semantic color: Light por defecto; Dark con el selector de tema (`light`/`dark`/`system`, D07; `system` respeta `prefers-color-scheme`).
  - Layout: Mobile por defecto; Desktop con `@media (width >= 64rem)` (D11).

### 2.1 Lo que no sale de Figma: se genera desde `docs/sistema-tokens-v1.md`

| Qué | Por qué | Fuente |
|---|---|---|
| `line-height/*` (1.2 / 1.4 / 1.5) | Figma interpreta el interlineado de una variable como píxeles (D01) | §4.2 |
| `space/negative/*` | Figma no puede limitar un token al gap (D02) | §4.1 |
| `breakpoint/desktop` = 64rem | Figma no tiene variables de breakpoint (D11) | §4.2 |
| Estilos de texto compuestos (10 estilos) | La exportación DTCG de Figma no incluye estilos de texto | §8 (incluye `body/strong`, D17) |

Pendiente de comprobar al exportar: el `$type` con que Figma escribe `font-weight/*` (variables Number, D04) y el `colorSpace` del color.

## 3. Componentes (paso 8)

**Regla:** las propiedades de Figma se llaman como los props de React. Las marcadas como *solo Figma* no son props.

| Componente | Props de React (en Figma) | Solo Figma | Notas |
|---|---|---|---|
| `Button` | `variant` (`primary`/`secondary`), `children`, `icon`, `href` | `showIcon`, `state` | Con `href`, `<a>`; sin él, `<button>`. |
| `IconButton` | `icon`, `label` (nombre accesible) | `state` | 40 × 40 px, sin fondo en reposo. |
| `Link` | `children`, `href` | `external` (se deduce de `href`), `size`, `state` | Subrayado obligatorio (1.4.1). Icono externo `li:external-link`. |
| `Callout` | `variant` (`note`/`warning`/`recommendation`/`pending`), `children` |: | Etiqueta fija por variante: Nota, Aviso, Recomendación, Pendiente (D18), traducible. |
| `InCode` | `title`, `children`, `defaultOpen` | `open`, `state` | Patrón Disclosure (`button` + `aria-expanded`). |
| `CodeBlock` | `children`, `language`, `filename` | `showFilename`, `showCopied` | Tras copiar, texto "Copiado". Sin resaltado de colores (D08). |
| `Code` | `children` |: | Código en línea. |
| `TableCell` | `children` | `header`, `ShowCode`, `ShowBody` | En MDX: `th` / `td` de `remark-gfm`. |
| `LessonHeader` | `section`, `title`, `description`, `lastReviewed` |: | `title` es el único `h1`. |
| `SidebarSection` | `title`, `defaultOpen`, `children` | `open`, `state` | Disclosure. |
| `SidebarItem` | `title` (frontmatter `nav_title`), `href`, `current` | `state` | `aria-current="page"`. |
| `PageNavLink` | `direction` (`previous`/`next`), `title`, `href` | `state`, `LabelPrevious`, `LabelNext` (textos fijos) | Si no hay anterior o siguiente, no se muestra. |
| `LanguageSwitcher` → `LanguageOption` | `locale`, `current` | `state` | `aria-current`, atributo `lang` en cada enlace (3.1.2). |
| `ThemeToggle` → `ThemeOption` | `value` (`light`/`dark`/`system`), `current` | `state` | `button` con `aria-pressed`. |
| `SkipLink` |: |: | Primer elemento enfocable; visible solo con el foco (2.4.1). |
| `SiteHeader` |: | `size` (`large` escritorio / `small` móvil) | En móvil, los selectores van en el panel de navegación (D19, D21). |
| `SiteFooter` |: |: | Incluye el aviso P7. |

### 3.1 Estados: cómo pasarlos a CSS

| En Figma | En CSS |
|---|---|
| `state=hover` | `:hover` |
| `state=active` (solo `Button`, `IconButton`, `ThemeOption`) | `:active` |
| `state=focus` | `:focus-visible`: anillo `border-width/200` con `color/border/focus`, por fuera (`outline` + `outline-offset`) |
| `current=true` | Prop `current` → `aria-current` / `aria-pressed` + estilos |
| Capa `Marker` (sidebar; en los selectores ya no, V26) | Borde de un lado (`border-inline-start` o `border-block-end`) de `border-width/200` con `color/border/accent/strong` |

Sin disabled ni loading en v1 (D14).

### 3.2 Plantilla

- Regiones: `header`, `nav` (sidebar), `main`, `footer`.
- Columna de la lección: `max-width: var(--t101-size-content-max-width)` (960 px desde V27; 720 px en D20), centrada, con padding `space/400`.
- Sidebar: secciones "Empezar aquí" y "Recursos".
- Móvil (por debajo de 64rem): sidebar oculto; botón de menú (`IconButton` `li:menu`) que abre un panel lateral desde la izquierda, con los selectores y el sidebar, y un overlay sobre el contenido (V25, sustituye a D21). El panel tiene su botón de cerrar (`li:x`).
- Logotipos: SVG (D22), en `public/brand/` (C10).

### 3.3 `Flow` (C13): diseñado y aprobado el 2026-10-04 (D24)

Anatomía, props, tokens y accesibilidad en `componentes-v1.md` §3.7. Aquí, dónde está en Figma y lo que el dibujo añade.

**Nodos**

| Qué | Nodo |
|---|---|
| Marco con los cuatro componentes | [62:256](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=62-256) |
| `Flow` | [63:273](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=63-273) |
| `FlowGroup` (conjunto: `size=large` / `size=small`) | [64:1581](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-1581) |
| `FlowStep` (conjunto de 5 variantes) | [62:294](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=62-294) |
| `FlowConnector` | [62:257](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=62-257) |
| Ejemplo, Desktop Light / Dark | [64:843](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-843) / [64:1024](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-1024) |
| Ejemplo, Mobile Light / Dark | [64:1205](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-1205) / [64:1386](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-1386) |

El ejemplo es el MDX de §3.7 (cuatro fases y "Después"). Desktop mide `size/content/max-width` (variable); Mobile, 375 px (D09). Padding del marco: `space/400`.

**Propiedades** (se llaman como los props de React, §1.1)

| Componente | Props de React (en Figma) | Solo Figma |
|---|---|---|
| `Flow` | `caption` (texto), `children` (slot) |: |
| `FlowGroup` | `title`, `meta` (texto), `children` (slot) | `showMeta`, `size` (`large` / `small`) |
| `FlowStep` | `title`, `meta` (texto), `status` (`default` / `pending`) | `showMeta`, `link` (`true` si hay `href`), `state` (`default` / `hover` / `focus`) |
| `FlowConnector` |: (no es un prop: lo pone `Flow`) |: |

Variantes de `FlowStep` (5): `link=false` con `status` `default` y `pending`; `link=true` con `state` `default`, `hover` y `focus` (`status=default`). Variantes de `FlowGroup` (2): `size` `large` y `small` (D24).

**Medidas** (todo con variables)

| Parte | Tokens |
|---|---|
| `Flow`: entre elementos y conectores | gap `space/200`; los elementos se centran en horizontal y los `FlowGroup` ocupan todo el ancho |
| `Flow`: entre la lista y el pie | gap `space/300` |
| `FlowConnector` | `li:arrow-down`, 24 px, `text/neutral/subtle` |
| `FlowGroup` | padding `space/400`; gap `space/300` entre cabecera y pasos; título–meta `space/050`; borde continuo `border-width/100` `border/neutral/default`; `radius/container`; sin fondo |
| Pasos de un `FlowGroup` | gap `space/200` en los dos ejes. `size=large`: en fila, bajan de línea si no caben (`flex-wrap`). `size=small`: apilados, cada paso a todo el ancho |
| `FlowStep` | padding `space/300` arriba y abajo, `space/400` a los lados; gap `space/300` entre el texto y el icono; título–meta `space/050`; borde `border-width/100`; `radius/control`; ancho según el texto |
| Icono de enlace | `li:arrow-right`, 16 px, a la derecha del texto |

**Para desarrollo**

- **`size` de `FlowGroup` es solo de Figma** (D24), como el `size` de `SiteHeader`: Figma no deja cambiar la dirección de un slot en una instancia. En código: en fila con `flex-wrap` desde 64rem y apilados por debajo (`breakpoint/desktop`, D11).
- **Foco de `FlowStep`:** en Figma el anillo sustituye al borde de 1 px (mismo dibujo que `PageNavLink`), así que la caja enfocada mide 2 px menos. En código, el borde `border/accent/default` se queda y el anillo es un `outline` por fuera (`focus-ring`), sin cambiar el tamaño.
- **`FlowConnector`** es un componente aparte: un `li:arrow-down` decorativo. `Flow` lo pone entre cada dos elementos de primer nivel con `aria-hidden="true"`; el MDX no lo escribe. Si va dentro de la lista, que no sea un `<li>` propio: el lector de pantalla contaría un elemento de más.
- **Hover del icono de enlace:** `text/accent/hover`, igual que el título (6,90 / 10,60 sobre `background/accent/subtle`; la tabla de §3.7 no lo recoge).
- Un `FlowStep` suelto en `Flow` (sin grupo, como en el recorrido de la página 04) queda centrado y con el ancho de su texto.

**Auditoría (2026-10-04)**, como la del 2026-10-02:
- Sin valores sueltos en los componentes ni en los cuatro marcos: colores, espacios, radios y grosores con variables. Los 120 textos del ejemplo tienen estilo. Fuera de la regla, como en el resto del archivo: el tamaño de los iconos (24 y 16 px), el radio del contenedor de variantes de Figma y los 375 px del marco móvil.
- Contraste igual que la tabla de §3.7, calculado con las variables en Light / Dark: título 16,98 / 14,36; título en hover 6,90 / 10,60; meta 7,38 / 5,82; icono 4,85 / 8,30; borde en hover 3,18 / 8,30; `pending` 7,40 / 6,89; título del grupo 17,79 / 18,89; meta del grupo, pie y conector 7,74 / 7,65; anillo sobre la página 3,33 / 10,92 y sobre el paso 3,18 / 8,30.
- Pasos con enlace: 154 × 65 px en Desktop y 309 × 65 px en Mobile (≥ 24 × 24).
- Sin desbordamiento horizontal en el marco de 375 px.

## 4. Accesibilidad comprobada en el diseño

Comprobado con scripts sobre el archivo el 2026-10-02 (contraste con la fórmula de WCAG 2.2, resolviendo cada variable en Light y Dark):

- Todos los textos ≥ 4,5:1 y todos los iconos ≥ 3:1, en todas las variantes y en las seis plantillas.
- Todas las variantes `focus` tienen el anillo `border/focus` (≥ 3:1 frente a los fondos).
- Indicadores de "actual" (`Marker`) ≥ 3:1 frente a su fondo. *Desde V26, los selectores no llevan `Marker` (riesgo de 1.4.1 y 1.4.11 aceptado por Oscar).*
- Objetivos interactivos ≥ 24 × 24 px (2.5.8).
- Ningún valor suelto: todo color, espacio, radio y grosor usa variables; todo texto usa un estilo (salvo los logotipos, D22).

Lo que solo se puede comprobar en código: orden de foco, `aria-*`, lector de pantalla, 1.4.10 Reflow a 320 px, 1.4.12 Text Spacing y el scroll horizontal propio de tablas y bloques de código.

## 5. Abierto

- **A14:** nombre del logotipo ("design-tokens 101" frente a "Tokens101"). Decide Oscar; no bloquea.
- `tools/semantic.py` no incluye los tokens de D06, D12 y D20 (el contraste se comprobó en Figma).
