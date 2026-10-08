# DesignToken101: Entrega de diseño a desarrollo

Documento para la sesión de desarrollo (pasos 7 y 8 de `docs/estado.md`). Resume qué hay en Figma, cómo se corresponde con el código y qué no sale en la exportación de Figma. Fecha: 2026-10-02. **El diseño está cerrado** salvo A14 (nombre del logotipo), que no bloquea.

Archivo: [TokensDS](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS) · plan Professional · perfil sRGB.

Documentos de referencia: `docs/sistema-tokens-v1.md` (tokens: fuente de verdad), `docs/componentes-v1.md` (anatomía y props), `docs/decisiones.md`.

> **Cambios posteriores a la entrega (sesión de desarrollo, 2026-10-03, decididos por Oscar).** Mandan sobre lo que dice este documento y sobre el archivo de Figma hasta que diseño los incorpore:
> - **V16:** token `size/sidebar/width` = 304 px (Semantic size). Creado en Figma (V31).
> - **V23:** `SidebarItem` sin radio.
> - **V24:** tokens solo de código `duration/200` y `easing/standard` para las animaciones.
> - **V25 (sustituye a D21):** el panel móvil es lateral, entra desde la izquierda con el ancho `size/sidebar/width` y un overlay `color/background/overlay` (negro al 50 %). Token creado (V31); panel dibujado en Figma el 2026-10-05 (D32).
> - **V26:** los selectores de idioma y tema no llevan marca inferior (`Marker`). Quitada en Figma el 2026-10-05 (D33).
> - **V27:** `size/content/max-width` = 960 px (cambiado en Figma, con la descripción al día desde la reexportación del 2026-10-04).
> - **V18, V19, V28 y diferencias del paso 8:** en Figma desde el 2026-10-05 (D31, D33), salvo el desenfoque de la cabecera (`blur/300`, solo de código; pendiente de Oscar).
> - **C19 / V40 (2026-10-06):** número del módulo en `SidebarSection`. **Hecho en Figma (2026-10-06, D36):** propiedades `number` y `showNumber`; en las plantillas, 0 a 7 y Recursos sin número (§3.7).
> - **V30 (2026-10-04):** `SidebarSection` con variante `current` = `true` / `false`: título y chevron en `text/accent/default` (hover `text/accent/hover`), combinable con `open`. Tokens por estado en `componentes-v1.md` §4.2. **Hecho en Figma (2026-10-04, D25):** `SidebarSection` ([27:910](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=27-910)), 12 variantes; en las plantillas, "Empezar aquí" con `current = true`.

---

## 1. Dónde está cada cosa

| Qué | Página | Nodo |
|---|---|---|
| Átomos (`Icon`, `Code`, `TableCell`, `LanguageOption`, `ThemeOption`, `Symbol`, `Logo`) | Components | [24:847](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-847) |
| Moléculas (`Button`, `IconButton`, `Link`, `Callout`, `InCode`, `CodeBlock`, `SkipLink`, `LessonHeader`, `SidebarItem`, `SidebarSection`, `PageNavLink`, `LanguageSwitcher`, `ThemeToggle`) | Components | [24:849](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-849) |
| Organismos (`SiteHeader`, `SiteFooter`) | Components | [35:242](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-242) |
| Lección, escritorio, Light / Dark ("Lesson · Desktop · Light" / "· Dark", D38) | Templates | [35:843](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-843) / [35:1479](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-1479) |
| Lección, móvil, Light / Dark | Templates | [52:487](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=52-487) / [52:688](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=52-688) |
| Menú móvil abierto (panel lateral, V25), Light / Dark ("Lesson · Mobile · Light · Menu open") | Templates | [55:699](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=55-699) / [55:833](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=55-833) |
| Portada (P27, D42), escritorio y móvil, Light / Dark ("Home · Desktop · Light"…) | Templates | [137:2993](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-2993) / [137:3253](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3253) · [137:3290](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3290) / [137:3448](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3448) |
| Muestra de estilos de texto (marcos "Text styles · Desktop · Light", "· Dark" y "· Mobile · Light") | Text styles | 14:12, 14:40, 16:13 |
| Iconos de Lucide como componentes locales (26, `li:*`, D37; marco `Icons`; desde D53, `li:upload` 153:852, `li:folder-open` 153:859, `li:download` 153:866, `li:link` 153:873 y `li:circle-alert` 153:880) | Components | [108:1963](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=108-1963) |
| `Flow`, `FlowGroup`, `FlowStep`, `FlowConnector` (C13, §3.3 de este documento) | Components | [62:256](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=62-256) |
| Ejemplo de `Flow`: metodología, Desktop / Mobile × Light / Dark ("Flow: methodology") | Templates | [64:842](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=64-842) |
| `Takeaways` (C18 + V35, D28; §3.4 de este documento) | Components | [89:364](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-364) |
| `SidebarGroup` (C17, D29) | Components (Molecules) | [89:1418](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1418) |
| Páginas de lectura del archivo de referencia (D38): portada y texto | Read me | [115:2](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=115-2) / [115:119](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=115-119) |
| Convención de nombres | Naming convention | [116:191](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=116-191) |
| Primitivos (`ColorScale` y tablas) | Primitives | [117:191](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=117-191) |
| Semánticos Light, Dark y tamaños | Semantics | [118:191](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=118-191) / [118:445](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=118-445) / [118:699](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=118-699) |
| `AuthorLink`, logotipo del autor del pie (V36, D30) | Components (Atoms) | [89:1663](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1663) |
| Marcos de exportación de los logotipos (`logo-colored`, `logo-colored-dark`, `logo-gray`, `logo-gray-dark` y `logo-oc`; D35, §3.6) | Logo exports (D38) | 57:749, 96:1997, 57:727, 96:2005, 57:724 |
| `ColorScaleStep` y `ColorScale` (C14, D34; §3.5 de este documento) | Components | [93:1020](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=93-1020) |
| Componentes de las herramientas (D44, D55; §3.11 de este documento), marco `Tools` | Components | [155:846](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=155-846) |

Las plantillas usan el contenido real de `content/es/00-start-here/01-what-is-designtoken101.mdx`.

## 2. Variables (paso 7)

| Colección | Modos | Variables | Exportar |
|---|---|---|---|
| Primitives | Value | 97 | Sí |
| Semantic color | Light, Dark | 33 (con `overlay` y `translucent`, V31) | Sí (un archivo por modo) |
| Semantic size | Value | 4 (`radius/control`, `radius/container`, `size/content/max-width`, `size/sidebar/width`) | Sí |
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
| `SidebarSection` | `title`, `number`, `current`, `defaultOpen`, `children` | `current`, `open`, `state`, `showNumber` | Disclosure. `current` (V30): título y chevron en `text/accent/default` (hover `text/accent/hover`); en Figma desde el 2026-10-04 (D25). |
| `SidebarItem` | `title` (frontmatter `nav_title`), `href`, `current` | `state` | `aria-current="page"`. |
| `PageNavLink` | `direction` (`previous`/`next`), `title`, `href` | `state`, `LabelPrevious`, `LabelNext` (textos fijos) | Si no hay anterior o siguiente, no se muestra. |
| `LanguageSwitcher` → `LanguageOption` | `locale`, `current` | `state` | `aria-current`, atributo `lang` en cada enlace (3.1.2). |
| `ThemeToggle` → `ThemeOption` | `value` (`light`/`dark`/`system`), `current` | `state` | `button` con `aria-pressed`. |
| `SkipLink` |: |: | Primer elemento enfocable; visible solo con el foco (2.4.1). |
| `SiteHeader` |: | `size` (`large` escritorio / `small` móvil) | En móvil, los selectores van en el panel de navegación (D19, D21). |
| `SiteFooter` |: |: | Incluye el aviso P7. El logotipo del autor es la instancia de `AuthorLink` (V36, D30). |
| `AuthorLink` |: (en código, el `<a>` de `SiteFooter`) | `state` (`default` / `focus`) | 39 × 24 px; anillo por fuera. |
| `Takeaways` | `children` (título y lista del MDX) | `size` (`large` / `small`) | Ver §3.4. |
| `SidebarGroup` | `label` (texto del separador de `meta.json`) |: | Las secciones del grupo van después, como hermanas (D29). |
| `ColorScale` → `ColorScaleStep` | `palette`, `caption`; en cada paso, `highlight` (variante `highlighted`) y `highlightLabel` | `size` (`large` / `small`); textos `name` y `hex` | Ver §3.5. |

### 3.1 Estados: cómo pasarlos a CSS

| En Figma | En CSS |
|---|---|
| `state=hover` | `:hover` |
| `state=active` (solo `Button`, `IconButton`, `ThemeOption`) | `:active` |
| `state=focus` | `:focus-visible`: anillo `border-width/200` con `color/border/focus`, por fuera (`outline` + `outline-offset`). En el sidebar (`SidebarSection`, `SidebarItem`), por dentro (D27, `focus-ring-inset`) |
| `current=true` | Prop `current` → `aria-current` / `aria-pressed` + estilos |
| Capa `Marker` (sidebar; en los selectores ya no, V26) | Borde de un lado (`border-inline-start` o `border-block-end`) de `border-width/200` con `color/border/accent/strong` |

Sin disabled ni loading en v1 (D14).

### 3.2 Plantilla

- Regiones: `header`, `nav` (sidebar), `main`, `footer`.
- Columna de la lección: `max-width: var(--t101-size-content-max-width)` (960 px desde V27; 720 px en D20), centrada, con padding `space/400`.
- Sidebar: las nueve secciones (0 a 7 numeradas y Recursos sin número, C19), con los grupos "Diseñar los tokens", "Tokens en código" y "Referencia" (C17, D29).
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

### 3.4 `Takeaways`, grupos del sidebar y enlace del autor (C18 + V35, C17, V36): en Figma el 2026-10-05 (D28–D30)

Figma refleja lo implementado y comprobado en código. Anatomía en `componentes-v1.md` §3.9, §4.2 y §4.8; diferencias en §4.10.

**Nodos**

| Qué | Nodo |
|---|---|
| Marco `Takeaways` (Components) | [89:365](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-365) |
| `Takeaways` (conjunto `size=large` / `size=small`) | [89:364](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-364): [89:306](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-306) / [89:335](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-335) |
| `SidebarGroup` | [89:1418](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1418) |
| `AuthorLink` (conjunto `state=default` / `state=focus`) | [89:1663](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1663): [89:1658](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1658) / [89:1662](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-1662) |
| `Takeaways` en las plantillas (antes de "Fuentes") | 89:1268 (35:843), 92:1604 (35:1479), 92:1705 (52:487), 92:1830 (52:688), 92:1955 (55:699), 92:2056 (55:833); las cinco últimas se rehicieron con el cuerpo de la lección (D31) |

**Medidas** (todo con variables)

| Parte | Tokens |
|---|---|
| `Takeaways` | fondo `background/accent/subtle`; sin borde; `radius/container`; relleno `space/600` (`large`) o `space/400` (`small`); gap título–lista `space/400` |
| Título | `heading/2`, `text/neutral/default`; icono `li:graduation-cap` 24 px en `text/accent/default`; gap `space/300`; centrados en vertical |
| Lista | gap `space/200` entre elementos; en cada uno, marca `li:check` 16 px en `text/accent/default` dentro de un marco con `space/100` arriba y abajo, gap `space/200` hasta el texto (`body/default`, `text/neutral/default`) |
| `SidebarGroup` | `space/600` encima; separador `border/neutral/default` de `border-width/100`; `space/200` hasta la etiqueta y `space/200` hasta la primera sección; relleno lateral `space/300`; etiqueta `caption/default`, `text/neutral/subtle` |
| `AuthorLink` `focus` | anillo `border/focus` de `border-width/200`, por fuera |

**Plantillas.** Las seis tienen el sidebar con los tres grupos: "Empezar aquí" (sin grupo, abierta y `current`), "Diseñar los tokens" (Fundamentos, Primitivos, Relaciones, Nombrar, Modos y temas), "Tokens en código" (De Figma al código y, desde D36, Accesibilidad) y "Referencia" (Recursos). Todas las secciones salvo la actual, cerradas; la lección de Recursos, oculta (C11). En las plantillas móviles el sidebar está oculto, como antes (solo se ve en el menú abierto).

**Auditoría (2026-10-05)**
- Sin valores sueltos en los 39 nodos de los tres componentes (colores, espacios, radios y grosores con variables). Fuera de la regla, como en el resto del archivo: el tamaño de los iconos (24 y 16 px) y el logotipo del autor (D22).
- Todo el texto con estilo (`heading/2`, `body/default`, `caption/default`).
- `AuthorLink` `focus` con el anillo por fuera; 39 × 24 px (≥ 24 × 24).
- Contraste calculado con las variables, Light / Dark: texto de `Takeaways` 16,98 / 14,36; icono y marcas 4,85 / 8,30; etiqueta de grupo 7,74 / 7,65; anillo de foco sobre el pie 3,33 / 10,92. Coincide con lo medido en código.

### 3.5 Al día con el código (2026-10-05, D31–D34)

**Plantillas (D31).** El cuerpo de las seis plantillas es el MDX actual de `what-is-designtoken101`: nueve apartados, tres `Callout` `recommendation`, `InCode`, `Takeaways` y "Fuentes". Párrafos y listas en `text/neutral/default` (§3.1), negritas con `body/strong`, enlaces del texto en `text/accent/default` subrayados. "En esta página" con viñetas (V19). `LessonHeader` con la sección ("Empezar aquí") y `PageNavLink` con el `nav_title` ("Por qué existe").

**Panel móvil (D32).** Marcos 55:699 y 55:833: `MobileNav` (304 px, `size/sidebar/width`; logotipo y `li:x`, selectores, sidebar) sobre la página, con `Overlay` en `color/background/overlay`. Nodos: panel 55:702 / 55:836, barra superior 92:2238 / 92:2267, overlay 92:2239 / 92:2268.

**Componentes (D33).** `Callout` con la etiqueta del color de su rol; selectores sin `Marker`; `SiteHeader` con `background/neutral/translucent` (sin desenfoque en Figma); pie todo en `text/neutral/subtle`; `Link` con hueco `space/100` hasta el icono externo; `Button` sin mínimos.

**`ColorScale` (D34)**

| Qué | Nodo |
|---|---|
| Marco | [93:1020](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=93-1020) |
| `ColorScaleStep` (`highlighted=false` / `true`) | [93:328](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=93-328): 93:316 / 93:322 |
| `ColorScale` (`palette` × `size`, 10 variantes) | [93:1019](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=93-1019) |

| Parte | Tokens |
|---|---|
| `ColorScale` | gap `space/300` entre la rejilla y el pie; rejilla de 11 columnas (`large`) o 4 (`small`), huecos `space/200` (columnas) y `space/400` (filas) |
| Paso | gap `space/100`; muestra de alto `space/1200`, `radius/control`, relleno del primitivo `color/{paleta}/{paso}`, borde `border/neutral/default` de `border-width/100` (destacado: `border/neutral/strong` de `border-width/200`) |
| Texto | número `label/default` en `text/neutral/default`; hex `caption/default` en `text/neutral/subtle`; etiqueta del destacado `caption/default` en `text/neutral/default`; pie `caption/default` en `text/neutral/subtle` |

**Auditoría (2026-10-05)**
- Sin valores sueltos en los componentes cambiados (`Callout`, `Link`, `Button`, `SiteHeader`, `SiteFooter`, selectores, `ColorScale`: 580 nodos) ni en los nodos propios de las seis plantillas. Se pusieron a 0 seis `itemSpacing` sin efecto (marcos con `SPACE_BETWEEN` o con un hijo) que la auditoría señalaba. Fuera de la regla, como siempre: tamaño de los iconos, logotipos (D22) y tamaño de pantalla (375 × 812 px).
- Todo el texto con estilo.
- Contraste, Light / Dark: etiquetas de `Callout` 5,99 / 8,10 (`note`), 4,77 / 10,32 (`warning`), 4,85 / 8,30 (`recommendation`), 7,40 / 6,89 (`pending`); texto 17,79 / 18,89; texto `subtle` y viñetas 7,74 / 7,65; enlaces 5,08 / 10,92; borde del paso destacado de `ColorScale` 4,70 / 4,20 (≥ 3:1).

### 3.6 Logotipo "DesignToken101" (P15, D35, 2026-10-05)

- Componente `Logo` (35:141), variantes `style=color`, `dark` y `light`: texto "DesignToken / 101" en contornos (JetBrains Mono ExtraBold 20/22 px), mismo símbolo, **184 × 44 px** (antes 208 × 44).
- Marcos de exportación en Pages (desde D38, en la página Logo exports), cada uno con una instancia de `Logo` y el modo de Semantic color fijado en el marco: `logo-colored` (57:749, Light) y `logo-colored-dark` (96:1997, Dark), 184 × 44; `logo-gray` (57:727, Light) y `logo-gray-dark` (96:2005, Dark), `style=dark` escalado a 34 px de alto, **143 × 34** en el SVG (142,2 de dibujo).
- SVG en `public/brand/` con los mismos nombres de archivo. `logo-gray.svg` es la exportación de Figma tal cual; `logo-colored.svg` también, salvo el semicírculo verde, que conserva el trazado del archivo anterior (Figma lo exporta con dos cifras de redondeo distintas). Las versiones Dark son las Light con el color del texto `#101A15` → `#F9FAFA` (V20).
- **Para desarrollo:** las medidas de `src/components/Logo.tsx` pasan a 184 × 44 (`colored`) y 143 × 34 (`gray`).

### 3.7 Número del módulo en `SidebarSection` (C19, V40, D36, 2026-10-06)

- **Componente** ([27:910](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=27-910)): capa de texto `Number` delante de `Label` en las 12 variantes (nodos 103:1912 a 103:1923). Propiedades nuevas: texto `number` (por defecto "0") y booleana `showNumber` (solo Figma). Estilo `label/default`; relleno con la misma variable que el título en cada variante. Hueco `space/200` (el de la fila). Fila de 304 × 40 px, sin cambios.
- **Plantillas** (35:843, 35:1479, 52:487, 52:688, 55:699, 55:833): números 0 a 6 en las secciones existentes, Recursos con `showNumber = false` y sección nueva **7 Accesibilidad** (cerrada) tras "De Figma al código": 103:1956, 103:1962, 103:1968, 103:1979, 103:1990, 103:1996.
- **Diferencia con el código:** cifras proporcionales en Figma (7 a 10 px de ancho), tabulares en código (9,08 px). Los títulos empiezan entre 27 y 30 px del borde en Figma y a 29,08 px en código. Diferencia aceptada (D36). *Desde D40 (§3.10), los títulos empiezan a 44 px en los dos.*

**Auditoría (2026-10-06)**, como la del 2026-10-02, con scripts sobre las páginas Components, Pages y Foundations:
- Sin valores sueltos en componentes ni plantillas (colores, espacios, radios y grosores con variables), salvo logotipos (D22), tamaño de los iconos y de pantalla. Se pusieron a 0 diez `itemSpacing` sin efecto (D36). Quedan sin variable, fuera de componentes y plantillas, los marcos de presentación de la página Components: relleno blanco de `Atoms`, `Molecules` y `Organisms`, y relleno de 40 px de los marcos `Takeaways` y `ColorScale` (89:365, 93:1020). Se tratan al preparar el archivo de referencia (P16).
- Todo el texto con estilo: los 42 textos con estilo mixto combinan `body/default` y `body/strong` por tramos (D17), sin tramos sin estilo.
- Todas las variantes `focus` con anillo `border/focus`; todas las variantes con `state` miden 24 × 24 px o más.
- Contraste del número: usa la misma variable y está sobre el mismo fondo que el título en cada variante, así que coincide con §4.2 de `componentes-v1.md`: 17,79 / 18,89; `current` 5,08 / 10,92; `current` en hover 6,62 / 10,58.

### 3.8 TokensDS preparado para el archivo de referencia (D37, 2026-10-06)

- **Iconos:** los 21 `li:*` son componentes del archivo (marco `Iconos`, 108:1963), copiados de la biblioteca de Lucide. Las 89 instancias se sustituyeron conservando su color vinculado. En código no cambia nada: siguen siendo `lucide-react` (D08).
- **Descripciones:** los 31 componentes tienen descripción en español, con su apartado de `componentes-v1.md`, props y decisiones. Los 33 semánticos de color tienen la suya (S37).
- **Marcos de presentación** de Components (`Atoms`, `Molecules`, `Organisms`, `Takeaways`, `ColorScale`) con tokens: `background/neutral/default` y `space/800`.
- **Nombres:** plantillas "Lección · {Desktop o Mobile} · {Light o Dark}" (y "· Menú abierto"), "Flow: metodología" y estilos de texto en español. Los nodos no cambian. *Pasados a inglés por D38.*
- Auditoría de la página Components tras los cambios: sin valores sueltos.

### 3.9 Nombres en inglés y páginas de lectura en TokensDS (D38, 2026-10-06)

- **Nombres en inglés** en los dos archivos (TokensDS y la copia de referencia): páginas, marcos, capas de auto layout, componentes e instancias. Variables, colecciones, modos, estilos de texto y propiedades de los componentes ya lo estaban. El texto que se lee en el lienzo (lección, páginas de lectura, descripciones) sigue en español (C5).
- **Páginas, en este orden:** Read me, Naming convention, Primitives, Semantics, Text styles, Components, Templates. En TokensDS, además, Logo exports (al final); en la copia, la página temporal Community images.
- **Capas renombradas:** "Cabecera" → "Section header", "Columna" → "Column", "Tabla" → "Table", "Fila" → "Row", "Muestra" → "Swatch", "Información" → "Info", "Iconos" → "Icons", "Frame 6" → "Author" y la capa de texto "P7" → "Credit" (las dos en `SiteFooter`), "Lección · …" → "Lesson · …", "Menú abierto" → "Menu open". La primera columna de la tabla "Qué hay en cada página" de Read me usa los nombres nuevos de página.
- **Páginas de lectura copiadas a TokensDS** desde la copia de referencia con un script: cada nodo se recrea con los componentes, variables y estilos de texto locales (los componentes tienen el mismo ID en los dos archivos, porque la copia se duplicó de TokensDS). Comprobado el 2026-10-06: los siete marcos miden lo mismo que en la copia (960 × 540, 1088 × 3619, 1088 × 2345, 1088 × 3349, 1088 × 3441 dos veces y 1088 × 1365), con los mismos modos y la exportación al 2× de la portada.
- **Auditoría** de las cuatro páginas nuevas: sin rellenos, trazos, huecos ni rellenos internos sin variable, y todo el texto con estilo; la única excepción es el relleno del logotipo (D22).
- **Nombre del archivo:** la API de plugins no lo puede cambiar. Lo cambia Oscar a mano: "DesignToken101: Reference system".

### 3.10 Primera versión: C19, enlace del pie y portada (D40–D42, 2026-10-07)

Punto 2 de "Para la primera versión" (`estado.md`). Hecho en TokensDS, no en la copia de referencia (D38).

**C19, número alineado al inicio (D40).** En las 12 variantes de `SidebarSection` ([27:910](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=27-910)), el texto del número (`Value`, 103:1912 a 103:1923) va dentro de un marco `Number` (135:842 a 135:853) con ancho mínimo `space/600` y el texto a la izquierda; `showNumber` está en el marco y `number` en el texto. Títulos a 44 px del borde de "0" a "10" y Recursos a 12 px, como en código (`min-w-600 text-start`, V40). Secciones nuevas 8, 9 y 10 en las diez plantillas con sidebar.

**Enlace a los issues (D41, P25).** En `SiteFooter` ([35:778](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=35-778)), bloque `Notice` (137:848, hueco `space/200`) con el aviso de P7 (`Credit`) y la línea `Report` (137:849): "¿Has encontrado un error?" (`caption/default`, `text/neutral/subtle`) y un `Link` `size=caption`, `external=true`, "Avísalo en GitHub" (137:851), con hueco `space/100`. Para el código, lo que corresponde es:

```tsx
<div className="flex flex-col gap-200">
  <p>{t('notice')}</p>
  <p>
    {t('reportError')}{' '}
    <TextLink href="https://github.com/ocarballido/design-tokens-101/issues">{t('reportLink')}</TextLink>
  </p>
</div>
```

Los nombres de las claves de `messages/es.json` son una propuesta; los textos: `reportError` "¿Has encontrado un error?" y `reportLink` "Avísalo en GitHub". En Figma, el hueco de `space/100` sustituye al espacio del párrafo (Figma no cuenta el espacio final de un texto). `Link` tiene ahora `size=caption` (136:842 a 136:855). Oscar lo resolvió con una propiedad de texto por tamaño (`children`, `children-small`, `children-caption`); en el pie, el texto va en `children-caption` (D41).

**Portada (D42, P27).** Cuatro marcos copiados de las plantillas de lección: [137:2993](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-2993) (Desktop Light), [137:3253](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3253) (Desktop Dark), [137:3290](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3290) (Mobile Light) y [137:3448](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=137-3448) (Mobile Dark). Sidebar con todas las secciones cerradas y sin lección actual. En `Content`, el marco `Hero`:

| Parte | Escritorio | Móvil |
|---|---|---|
| `Hero` | Fila, dos columnas iguales, hueco `space/1200`, centradas en vertical; relleno vertical `space/1600` | Columna, hueco `space/1200`, relleno vertical `space/600` |
| `Text` | Columna, hueco `space/600`: `Heading`, párrafo y botón | Igual |
| `Heading` | Título `heading/1`, `text/neutral/default`; subtítulo `heading/4`, `text/neutral/subtle`; hueco `space/200` | Igual |
| Párrafo | `body/default`, `text/neutral/default` | Igual |
| Botón | `Button` `primary` con icono `li:chevron-right`, "Empezar el curso", 178 × 42 px; lleva a la primera lección | Igual |
| Imagen (D43) | Render de Oscar recortado en un cuadrado de 440 × 441 con `radius/container`; versión Light o Dark según el tema | 343 × 343, debajo del texto |

En código (propuesta): `grid desktop:grid-cols-2 items-center gap-1200 py-600 desktop:py-1600` dentro de la columna de `main`. **Imagen (D43):** `public/brand/home-light.png` y `home-dark.png`, 880 × 880 px, exportadas desde los marcos `home-light` y `home-dark` de Logo exports ([142:1966](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=142-1966), [142:1968](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=142-1968); PNG 1×, ya configurado). Dos `img` como `Logo` (V20): `dark:hidden` y `hidden dark:block`, `alt=""`, `width`/`height` 880, `w-full aspect-square rounded-container`. Estilos y huecos revisados por Oscar en Figma (2026-10-07).

### 3.11 Componentes de las herramientas (D44 a D55, 2026-10-08)

Primera versión dibujada por la sesión de diseño a petición de Oscar (D55), con la anatomía de `componentes-v1.md` §5. **Pendiente de la revisión de Oscar** (D05): lo que cambie en Figma manda. Marco `Tools` ([155:846](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=155-846)) en la página Components, a la derecha de `Icons`, con relleno `space/800` y fondo `background/neutral/default`, como los demás marcos de presentación.

| Componente | Nodo | Variantes (solo Figma, salvo las que son props) | Propiedades |
|---|---|---|---|
| `TextField` | [155:923](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=155-923) | `state` (`default`, `focus`) × `invalid` × `code` = 8 | `label`, `hint`, `showHint`, `value`, `error` |
| `Select` | [156:918](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=156-918) | `state` (`default`, `hover`, `focus`) × `invalid` = 6 | `label`, `hint`, `showHint`, `value`, `error` |
| `Checkbox` | [156:951](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=156-951) | `checked` × `state` (`default`, `hover`, `focus`) = 6 | `label`, `showLabel` |
| `CheckboxGroup` | [156:952](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=156-952) | 1 | `legend`, `hint`, `showHint`; marco `Options` con tres `Checkbox` |
| `ErrorSummary` | [157:916](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=157-916) | `size` (`large`, `small`) × `state` (`default`, `focus`) = 4 | `title`; lista de `Link` |
| `TypeDecision` | [157:1160](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=157-1160) | `open` × `state` del `summary` (`default`, `hover`, `focus`) = 6 | `legend`, `summary`; ejemplos con `Code`; `Select` dentro |
| `FileItem` | [158:988](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=158-988) | `invalid` = 2 | `name`, `detail`, `error`; `IconButton` con `li:x` |
| `FileUpload` | [158:1079](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=158-1079) | `dragOver` = 2 | `label`, `hint`, `showHint`, `showList`; dos `Button` `secondary` (`li:upload`, `li:folder-open`) y dos `FileItem` |
| `ChromaChart` | [159:1021](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=159-1021) | 1 (curva `green`, paso 500 destacado) | `caption` |
| `ScalePreview` | [159:1102](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=159-1102) | 1 (las cinco escalas de DesignToken101) | `caption` |

**Medidas** (todo con variables): campos con relleno `space/200` × `space/300`, borde `border/neutral/strong` de `border-width/100`, `radius/control`, separación `space/100` entre etiqueta, ayuda, campo y error; icono de error `li:circle-alert` de 16 px. Caja de `Checkbox` de 16 × 16 (`space/400` en ancho y alto), `radius/100`, `li:check` de 12 px; fila con alto mínimo `space/600`. `ErrorSummary` con relleno `space/600` (`large`) o `space/400` (`small`), icono de 24 px y hueco `space/300`. `TypeDecision` con relleno `space/400` y hueco `space/300`; `summary` con relleno `space/100` × `space/200` y `radius/control`. Zona de `FileUpload` con relleno `space/600`, hueco `space/300`, `radius/container`; filas de `FileItem` con borde inferior. `ChromaChart`: columna del número con ancho mínimo `space/800`, columna del valor de `space/2400`, barras de alto `space/400` con `radius/100`; el largo de cada barra es un dato (C ÷ 0,295 × 520 px de pista en el componente de 640). `ScalePreview`: paneles con relleno `space/400`, `radius/container`, borde `border/neutral/default`; muestras de alto `space/800` con `radius/control`, rellenas con los primitivos (en la herramienta serán los hex calculados, D48).

**Anillo de foco:** rectángulo `Focus ring` fuera del auto layout, con trazo `border/focus` de `border-width/200` por fuera (patrón de D39), en el campo, la caja de la casilla, el `summary` y el contenedor de `ErrorSummary`.

**Diferencias con §5 de `componentes-v1.md`:** `size` de `ErrorSummary` es solo de Figma (en código, `p-400 desktop:p-600`), como el de `Takeaways`. `showLabel` de `Checkbox` es solo de Figma (en la columna Exportar, la etiqueta es solo accesible, D46). En `TypeDecision`, el estado con error se dibuja con la variante `invalid` del `Select` de dentro. `value` de `TextField` y `Select` es el texto que se ve, no un prop.

**Auditoría (2026-10-08):** colores, grosores, rellenos internos, huecos y radios con variables en los diez componentes; todo el texto con estilo. Fuera de la regla, como en el resto del archivo: el tamaño de los iconos (24, 16 y 12 px), el radio del contenedor de variantes de Figma y el largo de las barras de `ChromaChart` (dato). Revisados en Light y Dark (modo de Semantic color en el marco). Objetivos: campos de 37 px de alto, `summary` de 28, filas de `Checkbox` de 24 e `IconButton` de 40 (≥ 24 × 24). El contraste es el de §5 de `componentes-v1.md`: mismos tokens sobre los mismos fondos.

## 4. Accesibilidad comprobada en el diseño

Comprobado con scripts sobre el archivo el 2026-10-02 (contraste con la fórmula de WCAG 2.2, resolviendo cada variable en Light y Dark):

- Todos los textos ≥ 4,5:1 y todos los iconos ≥ 3:1, en todas las variantes y en las seis plantillas.
- Todas las variantes `focus` tienen el anillo `border/focus` (≥ 3:1 frente a los fondos).
- Indicadores de "actual" (`Marker`) ≥ 3:1 frente a su fondo. *Desde V26, los selectores no llevan `Marker` (riesgo de 1.4.1 y 1.4.11 aceptado por Oscar).*
- Objetivos interactivos ≥ 24 × 24 px (2.5.8).
- Ningún valor suelto: todo color, espacio, radio y grosor usa variables; todo texto usa un estilo (salvo los logotipos, D22).

Lo que solo se puede comprobar en código: orden de foco, `aria-*`, lector de pantalla, 1.4.10 Reflow a 320 px, 1.4.12 Text Spacing y el scroll horizontal propio de tablas y bloques de código.

## 5. Abierto

- **P15 (antes A14):** el logotipo dice "DesignToken101" (decisión de Oscar, 2026-10-05). Falta cambiarlo en Figma y exportar los SVG.
- **Desenfoque de la cabecera (V28):** `blur/300` es un token solo de código; en Figma la cabecera tiene el fondo translúcido, sin desenfoque. Decidido por Oscar: queda solo en código (D33; opciones en `historial.md` → Diseño).
- `tools/semantic.py` no incluye los tokens de D06, D12 y D20 (el contraste se comprobó en Figma).
