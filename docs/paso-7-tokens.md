# Paso 7: De la exportación de Figma a CSS y Tailwind

Informe de la sesión de desarrollo (2026-10-03). Material del módulo 6 ("De Figma al código"). Se separa siempre **lo que dicen las fuentes**, **lo que se comprobó por prueba** y **la recomendación**. Las pruebas se hicieron con copias de `tokens/figma/` fuera del repositorio.

Versiones probadas: Style Dictionary 5.5.5, Terrazzo 2.7.1 (`@terrazzo/cli`, `plugin-css`, `plugin-tailwind`), Tailwind CSS 4.3.3, Node 24.

---

## 1. Qué exporta Figma

### 1.1 Archivos

| Carpeta (C10) | Archivo | Tokens | `$extensions` en la raíz |
|---|---|---|---|
| `primitives/` | `Value.tokens.json` | 97 | `com.figma.modeName: "Value"` |
| `semantic-color/` | `Light.tokens.json`, `Dark.tokens.json` | 31 + 31 | `"Light"` / `"Dark"` |
| `semantic-size/` | `Value.tokens.json` | 3 | `"Value"` |
| `layout/` | `Desktop.tokens.json`, `Mobile.tokens.json` | 9 + 9 | `"Desktop"` / `"Mobile"` |

Un archivo por modo, con el árbol completo de la colección y el nombre del modo solo en `$extensions` de la raíz. Coincide con la ayuda de Figma: "un modo por archivo" ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)).

### 1.2 `$type` por grupo

| Grupo | `$type` exportado | Scope de Figma | Tipo DTCG que le corresponde |
|---|---|---|---|
| `color/*` (primitivos y semánticos) | `color` |: / `FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE` | `color` ✔ |
| `space/*` | `number` | `GAP` | `dimension` |
| `border-width/*` | `number` | `STROKE_FLOAT` | `dimension` |
| `radius/*` (primitivos y semánticos) | `number` | `CORNER_RADIUS` | `dimension` |
| `font-size/*` (primitivos y Layout) | `number` | `FONT_SIZE` | `dimension` |
| `size/content/max-width` | `number` | `WIDTH_HEIGHT` | `dimension` |
| **`font-weight/*`** | **`number`** | **`FONT_STYLE`** | `fontWeight` |
| `font-family/*` | `string` (+ `com.figma.type: "string"`) | `FONT_FAMILY` | `fontFamily` |

- **`font-weight` sale como `number`, no como `fontWeight`** (pregunta pendiente de D04, resuelta). El scope que usa Figma para el peso es `FONT_STYLE`.
- **Ningún tamaño sale como `dimension`:** todos son `number` sin unidad (`"$value": 4`). La ayuda de Figma lo explica: al *importar*, Figma convierte `dimension` (solo `px`) en Number; al exportar no vuelve a `dimension`.
- **`string` no es un tipo DTCG.** La propia ayuda de Figma lo dice: "not an officially defined DTCG token type". El Format Module prohíbe a las herramientas adivinar el tipo por el valor ([DTCG Format 2025.10](https://www.designtokens.org/TR/2025.10/format/)).

### 1.3 Color

Objeto de color de DTCG 2025.10, siempre en sRGB, con `hex` añadido:

```json
"$value": { "colorSpace": "srgb", "components": [0.2, 0.8, 0.6], "alpha": 1, "hex": "#33CC99" }
```

Coincide con S9 (valores sRGB como fuente de verdad). Todos los colores tienen `alpha: 1`.

### 1.4 Alias

**Figma no exporta las referencias DTCG.** Un token semántico sale con el valor **ya resuelto** y la referencia solo aparece en una extensión propietaria:

```json
"on-accent": {
  "$type": "color",
  "$value": { "colorSpace": "srgb", "components": [0.0196, 0.047, 0.035], "alpha": 1, "hex": "#050C09" },
  "$extensions": {
    "com.figma.aliasData": {
      "targetVariableName": "color/neutral/950",
      "targetVariableSetName": "Primitives"
    }
  }
}
```

- Fuente: la ayuda de Figma documenta que los alias **entre colecciones** se representan con `com.figma.aliasData` ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)).
- Comprobado: los 82 alias de la exportación (31 × 2 de Semantic color, 9 × 2 de Layout, 2 radios de Semantic size) son entre colecciones. No hay alias dentro de una colección, así que no se ha visto cómo los exporta Figma.
- Consecuencia: una herramienta que lea el archivo tal cual genera `--t101-color-text-on-accent: #050c09`, no `var(--t101-color-neutral-950)`. Se pierde la capa de alias.

### 1.5 Otras extensiones

`com.figma.variableId`, `com.figma.scopes`, `com.figma.codeSyntax` (`WEB: var(--t101-…)`, D03) y `com.figma.hiddenFromPublishing`. El code syntax coincide con el nombre de la variable CSS que se genera (S6, S27).

---

## 2. La exportación tal cual, en las dos herramientas

| Comprobación | Style Dictionary | Terrazzo |
|---|---|---|
| Lee los archivos | Sí, con aviso de colisión en el `$extensions` de la raíz | Sí |
| Color | `#33cc99` | `rgb(20% 80% 60%)` |
| Tamaños | `--t101-space-100: 4` (sin unidad: **CSS inválido**) | Igual |
| Alias | Valor resuelto, sin `var()` | Igual |

Conclusión: **con ninguna de las dos herramientas sirve la exportación sin preparar.** El problema no es de la herramienta, sino de que la exportación no lleva la información (tipos y referencias) en formato DTCG.

## 3. Normalización: de la exportación de Figma a DTCG estricto

Un script propio (prototipo probado; propuesta: `tools/figma-to-dtcg.mjs`) convierte cada archivo sin tocar el original (C10):

1. `com.figma.aliasData.targetVariableName` → referencia DTCG: `color/neutral/950` → `"{color.neutral.950}"`.
2. `number` con scope de tamaño (`GAP`, `CORNER_RADIUS`, `STROKE_FLOAT`, `FONT_SIZE`, `WIDTH_HEIGHT`) → `dimension` `{ "value": 4, "unit": "px" }`.
3. `number` con scope `FONT_STYLE` → `fontWeight`.
4. `string` con scope `FONT_FAMILY` → `fontFamily`.
5. Quita `$extensions` de la raíz (el modo se sabe por el archivo).
6. **Se detiene con error** ante cualquier `$type` o scope no previsto, en vez de adivinar. Así se detectó que el peso usa `FONT_STYLE`.

El tipo se deduce del **scope**, que es una decisión de diseño registrada en Figma (S22), no del valor (que el Format Module prohíbe).

Resultado comprobado: 82 alias, 55 `dimension`, 4 `fontWeight`, 2 `fontFamily` y 119 `color`.

**Tokens solo de código** (`sistema-tokens-v1.md` §4): un archivo DTCG escrito a mano desde la especificación: `line-height/*` (`number`, D01), `space/negative/*` (`dimension` en px, D02) y `breakpoint/desktop` (`dimension` `64rem`, D11).

## 4. Comparación con la entrada normalizada

| Criterio | Style Dictionary 5.5.5 | Terrazzo 2.7.1 |
|---|---|---|
| **DTCG 2025.10** | Fuente: "the latest format 2025.10 does not have full support yet in Style Dictionary. This is a work in progress in v5" ([SD: DTCG](https://styledictionary.com/info/dtcg/)). Prueba: lee el objeto de color y `dimension` sin problemas. | Fuente: soporta 2025.10, incluido el Resolver Module ([Terrazzo: Docs](https://terrazzo.app/docs/)). Prueba: lee todo, entrecomilla `fontFamily`. |
| **Unión de modos (A9)** | Sin concepto de modo: una compilación por combinación, con `filter` por archivo y un selector por archivo de salida. El `@media` hay que montarlo aparte. Avisa de "filtered out token references" al generar solo el bloque oscuro (el CSS es correcto porque las variables existen en `:root`). | **Resolver DTCG 2025.10** (`tokens101.resolver.json`): un `set` base y dos `modifiers` (`theme`: light/dark; `layout`: mobile/desktop) ([Terrazzo: Resolvers](https://terrazzo.app/docs/guides/resolvers)). `plugin-css` → `permutations`, cada una con su selector o `@media`. Un solo archivo de salida. |
| **Solo lo que cambia en cada modo** | Con `filter` por archivo: 31 tokens en oscuro, 9 en escritorio. | La opción `only` no lo consiguió en la prueba (repetía los 149). Con `include` por grupo: **149 / 31 / 9**. |
| **Alias con `var()`** | `outputReferences: true` → `var(--t101-color-neutral-950)` ([SD: References](https://styledictionary.com/reference/utils/references/)). | Por defecto. Ojo: `variableName` tiene que devolver el nombre **con** `--`; sin ellos genera `var(t101-…)` (inválido). |
| **px → rem** | `size/pxToRem` ([SD: Transforms](https://styledictionary.com/reference/hooks/transforms/predefined/)). **Fallo comprobado:** ignora la unidad y divide siempre entre 16: `breakpoint/desktop` `64rem` → **`4rem`** (`lib/common/transforms.js`, `sizePxToRem`). Hay que escribir un transform propio o expresar el breakpoint en px. | No convierte: conserva la unidad (`9999px`, `64rem`). Con la opción `transform` (5 líneas, solo valores directos, no alias) → `0.25rem`, `45rem`, `64rem` intacto. |
| **Color (A8)** | `color/css`: hex (o `rgba` si hay transparencia). | Por defecto `rgb(… %)`; con `legacyHex: true`, hex (abreviado: `#3c9`). |
| **Tailwind v4** | Sin plugin; se escribe el `@theme` a mano o con un formato propio. | `plugin-tailwind` genera un `@theme` para Tailwind v4 ([Terrazzo: Tailwind](https://terrazzo.app/docs/integrations/tailwind)). Prueba: escribe **valores** en `@theme` (`--color-white: #fff`, `--spacing-s1: 4px`), no referencias a `--t101-*`, no aplica el `transform` a rem, y repite el tema en `@variant dark`. Los patrones con comodín no encontraron tokens. **No encaja con el patrón de dos capas de S7/S27.** |
| **Comentarios** | `$description` como comentario `/** … */` al final de la línea. | `$description` como comentario `/* … */` encima. |
| **Configuración** | JS con API programática. | `terrazzo.config.mjs` + resolver JSON (formato estándar, reutilizable por otras herramientas). |

**Empate:** ninguna lee la exportación de Figma sin preparar, y en las dos el `@theme inline` de Tailwind se escribe fuera de la herramienta (§6).

## 5. Recomendación (decidida: V06, V07, V08)

**Terrazzo**, con el paso de normalización propio delante. Motivos:

1. **A9 se resuelve con el estándar**, no con código propio: el Resolver Module de DTCG 2025.10 describe exactamente nuestras colecciones (un conjunto fijo + dos ejes de modo). Es material de curso reutilizable: el resolver sirve para cualquier herramienta que lo implemente.
2. **Fidelidad a DTCG 2025.10** declarada; Style Dictionary la declara incompleta.
3. **Unidades:** respeta `rem`; Style Dictionary convierte mal el breakpoint.
4. Un solo archivo CSS con los tres bloques.

En contra de Terrazzo: el plugin de Tailwind no nos sirve; la opción `only` no hizo lo esperado (se usa `include`); comunidad más pequeña que Style Dictionary.

**A8, formato de color: hex.** Fuente de verdad sRGB (S9) y Figma exporta hex exacto: hex no añade redondeos. oklch obligaría a convertir y redondear valores que ya están decididos en sRGB.

## 6. Tailwind: `@theme inline` y A12 (decidida: V09)

### 6.1 Dos capas (S7, S27)

- **Capa 1, generada:** `--t101-*` (CSS de Terrazzo). Light/Mobile en `:root`; Dark y Desktop en sus bloques.
- **Capa 2, `@theme inline`:** variables de Tailwind que apuntan a la capa 1. `inline` hace que la utilidad use `var(--t101-…)` directamente, para que el cambio de modo funcione donde se redefinen las variables ([Tailwind: Theme](https://tailwindcss.com/docs/theme)).
- `--color-*: initial` (y los demás espacios de nombres que sustituimos) quita la paleta por defecto de Tailwind: así solo existen utilidades que salen de los tokens ([Tailwind: Theme](https://tailwindcss.com/docs/theme)).

### 6.2 A12: `text-text-default`

Con `--color-*`, cada color genera todas las utilidades de color: `--color-text-neutral-default` da `text-text-neutral-default`, pero también `bg-text-neutral-default` (sin sentido).

| Opción | Clases | A favor | En contra |
|---|---|---|---|
| **A. `--color-*` con la ruta completa** | `bg-background-neutral-default`, `text-text-neutral-default` | Documentado. Trazabilidad total. | Redundante; genera combinaciones sin sentido (`bg-text-…`). |
| **B. Espacios de nombres por propiedad** (`--background-color-*`, `--text-color-*`, `--border-color-*`, `--outline-color-*`) | `bg-neutral-default`, `text-neutral-default`, `border-neutral-default`, `outline-focus` | Sin redundancia; la propiedad está en el prefijo de la clase (`bg` = `background`); **sin combinaciones sin sentido**. | **No documentado.** Existe en el código de Tailwind 4.3.3 (cada utilidad busca primero `--background-color-*` y luego `--color-*`), pero la documentación solo cita `--color-*`. Puede cambiar en una versión futura. |
| C. `@utility` a mano | Las que queramos | Documentado y explícito | Una regla por token: 31 colores a mano, fácil que se desincronicen |

Comprobado con el compilador de Tailwind 4.3.3 (opción B): `bg-neutral-default` → `background-color: var(--t101-color-background-neutral-default)`; `hover:bg-accent-strong-hover`, `text-on-accent`, `border-neutral-default`, `outline-focus` y `text-neutral-default/50` funcionan; `bg-text-neutral-default`, `text-color-neutral-default` y `bg-red-500` no existen.

**Recomendación: B**, con una prueba automática en `npm run check:content` (o un script hermano) que compile esas clases y falle si una actualización de Tailwind deja de generarlas. El riesgo de usar algo no documentado queda acotado y visible.

Mapeo propuesto (capa 2):

| Token (capa 1) | Tailwind (capa 2) | Clase |
|---|---|---|
| `color/background/*` | `--background-color-*` | `bg-neutral-default` |
| `color/text/*` | `--text-color-*` | `text-neutral-default`, `text-on-accent` |
| `color/border/*` | `--border-color-*` (y `--outline-color-focus`, `--ring-color-focus` para el foco) | `border-neutral-default`, `outline-focus` |
| `space/*` | `--spacing-*` | `p-400`, `gap-200` |
| `radius/control`, `radius/container` | `--radius-*` | `rounded-control` |
| `border-width/*` |: (Tailwind no tiene espacio de nombres; `border-(length:--t101-border-width-100)` ) | Resuelto en el paso 8 (V14) |
| `font-size/{estilo}` (Layout) | `--text-*` | `text-body-default` |
| `font-weight/*` | `--font-weight-*` | `font-600` |
| `font-family/*` | `--font-*` | `font-sans`, `font-mono` |
| `line-height/*` | `--leading-*` | `leading-normal` |
| `breakpoint/desktop` | `--breakpoint-*` (`--breakpoint-*: initial` + `--breakpoint-desktop`) | `desktop:` |
| `size/content/max-width` | `--container-*` | `max-w-content` |

- Los primitivos de color **no** se exponen en Tailwind (S22: solo sirven de destino de alias). Los componentes usan semánticos.
- Propuesta: generar este archivo con el mismo build (script propio leyendo los tokens resueltos), para que un token nuevo en Figma aparezca sin tocar CSS a mano.
- `--breakpoint-*` no admite `var()` porque las media queries no leen variables; se escribe el valor (`64rem`) generado desde el token.

## 7. Decisiones

Oscar eligió las recomendaciones (2026-10-03): Terrazzo + normalización (V06), hex (V07), Resolver (V08), espacios de nombres por propiedad (V09), tema oscuro con `data-theme` y `prefers-color-scheme` (V10), familias de reserva en la capa de Tailwind (V11, provisional) y carpetas (V12).

## 8. Implementación

```txt
tokens/figma/*/*.tokens.json        exportación de Figma, sin tocar (C10)
        │  tools/figma-to-dtcg.mjs  (alias, tipos, unidades)
        ▼
tokens/dtcg/*/*.tokens.json         DTCG 2025.10 estricto (generado)
tokens/code-only.tokens.json        line-height, space/negative, breakpoint, duration, easing (a mano, §4)
                                    + size/sidebar/width y color/background/overlay hasta que existan en Figma
        │  tokens/tokens101.resolver.json  (base + theme + layout)
        │  terrazzo.config.mjs
        ▼
src/styles/tokens.css               capa 1: --t101-*            (plugin-css)
src/styles/theme.css                capa 2: @theme inline       (plugin propio)
        │  src/app/globals.css: @import de los dos
        ▼
Tailwind CSS v4 → bg-neutral-default, text-body-default, p-400, desktop:…
```

**Comandos:** `npm run tokens` (normaliza y genera) y `npm run check:tokens` (comprueba).

**`tokens.css` generado:**

| Bloque | Tokens | Qué contiene |
|---|---|---|
| `:root` | 153 | Todo, con Light y Mobile. `color-scheme: light` (149 en el paso 7; 153 tras V16, V24 y V25) |
| `[data-theme="dark"]` | 31 | Semantic color, Dark. `color-scheme: dark` |
| `@media (prefers-color-scheme: dark)` → `:root:not([data-theme="light"])` | 31 | Igual (modo `system`, D07) |
| `@media (width >= 64rem)` → `:root` | 9 | Layout, Desktop (D10, D11) |

Ejemplos: `--t101-space-100: 0.25rem;` · `--t101-color-emerald-500: #3c9;` · `--t101-color-text-on-accent: var(--t101-color-neutral-950);` · `--t101-font-size-heading-1: var(--t101-font-size-06);` y, en Desktop, `var(--t101-font-size-07)`.

**`theme.css` generado:** 87 variables de Tailwind (84 en el paso 7; 87 tras V16, V24 y V25). Empieza por `--*: initial` (sin tema por defecto). Cada token tiene una regla explícita en `terrazzo.config.mjs`: o se expone o se descarta con motivo. Un token nuevo sin regla detiene el build.

| No se expone | Motivo |
|---|---|
| Primitivos de color | Solo son destino de alias (S22) |
| `font-size/01`…`10` | Los usan los tokens de Layout (D10), no los componentes |
| `border-width/*` | Tailwind no tiene espacio de nombres para el grosor de borde. En el paso 8 se usa `border-(length:--t101-border-width-100)` (V14) |

**`check:tokens` comprueba:**
- que cada code syntax de Figma tiene su variable;
- que no hay `var()` rotos;
- que los bloques de modo coinciden con sus colecciones;
- que los hex son idénticos a Figma;
- los valores de los tokens solo de código;
- 15 clases de Tailwind que deben existir y 7 que no (`bg-red-500`, `p-4`, `bg-text-neutral-default`…).

Se probó en negativo: detecta un hex cambiado, una referencia rota y una variable de la paleta por defecto de Tailwind.

**Pendiente para el paso 8:** carga de las fuentes (`next/font`), grosor de borde en Tailwind, estilos de texto compuestos (§8 de la especificación), estilos base (`body`) y `ThemeToggle` (poner o quitar `data-theme`).
