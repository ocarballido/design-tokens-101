# DesignToken101: Sistema de tokens v1 (especificación)

Especificación del sistema de tokens de DesignToken101. Es el encargo para la sesión de diseño (variables en Figma) y el contenido del ejercicio final del curso (módulo 8). Se construyó en la sesión de contenido (paso 2 de `docs/estado.md`). Cualquier cambio sigue el protocolo de `docs/decisiones.md`.

**Estado del documento:** completo; el diseño está cerrado (2026-10-02). Las tres decisiones visuales de la sección 6 se cerraron con D23 (§6.3).

Última actualización: 2026-10-09.

**Versión del sistema: 1.1.0** (2026-10-09, S38; 1.0.0 el 2026-10-06, S36). API pública: los nombres de las variables publicadas en Figma, de las variables CSS (`--t101-*`) y de las clases de la capa 2. Cada cambio posterior sube el número según S36: PATCH para un valor o un alias, MINOR para algo nuevo o un token obsoleto, MAJOR para borrar o renombrar.

**Versiones del sistema**

| Versión | Fecha | Añadido | Cambiado | Obsoleto | Eliminado |
|---|---|---|---|---|---|
| 1.1.0 | 2026-10-09 | Breakpoints de Tailwind CSS como tokens solo de código: `breakpoint/sm`, `md`, `lg`, `xl` y `2xl` (S38, §4.10) | `breakpoint/desktop` pasa a ser alias de `breakpoint/lg`; mismo nombre y mismo valor, 64rem (S38) | No aplica | No aplica |
| 1.0.0 | 2026-10-06 | Primera versión estable: el sistema completo (97 primitivos, 33 semánticos de color, 4 de tamaño, 9 de Layout, 10 estilos de texto y los tokens de código de §4) | No aplica | No aplica | No aplica |

Las versiones 0.y.z no se numeraron: el historial anterior está en el registro de cambios de este documento y en `docs/decisiones.md`.

**Registro de cambios**

| Fecha | Sesión | Cambio |
|---|---|---|
| 2026-09-30 | Contenido | Versión inicial (S8–S21). |
| 2026-09-30 | Contenido | Huecos a–f señalados por la sesión de diseño resueltos (S22–S29): §4.2, §4.3, §5.2, §7 y §8. Errata 5,07 → 5,08. |
| 2026-09-30 | Diseño | Verificaciones por prueba en el archivo de Figma y decisiones D01–D04: interlineado solo en código (§4.2, §7, §8), espaciado negativo solo en código (§4.1, §7), formato del code syntax (§7) y pesos como variables Number (§4.2, §7, §8). |
| 2026-09-30 | Diseño | Tamaños de texto por contexto (colección Layout, Desktop/Mobile) y breakpoint (D10, D11): §4.2, §7 y §8. Token `color/border/accent/default` para el Callout de recomendación (D06): §6.1. |
| 2026-10-01 | Diseño | Tokens de estado de controles (D12–D14): §5.2 (regla del estado en el lugar del énfasis), §6.1, §6.2 y §6.4. Errata en el contraste de la etiqueta del Callout `recommendation` en Dark (8,30, no 10,60). |
| 2026-10-02 | Diseño | Ancho máximo del contenido `size/content/max-width` (D20): §4.6 y §7. |
| 2026-10-02 | Diseño | Estilo de texto `body/strong` para el texto destacado (D17): §8. |
| 2026-10-02 | Diseño | A13 cerrada con los valores iniciales (D23): §6.3. |
| 2026-10-03 | Contenido | Documento trasladado al repositorio (P9); rutas actualizadas. |
| 2026-10-03 | Desarrollo | Paso 8: carga de fuentes con `next/font` (V13, §4.2), estilos de texto como utilidades (V15, §8) y token `size/sidebar/width` (V16, §4.6). |
| 2026-10-03 | Desarrollo | Tokens de movimiento solo de código (V24, §4.7), `color/background/overlay` (V25, §6.1) y ancho máximo del contenido a 960 px (V27, §4.6). |
| 2026-10-03 | Desarrollo | Cabecera sticky (V28): `color/background/neutral/translucent` (§6.1), `blur/300` solo de código (§4.8) y énfasis `translucent` en el vocabulario (§5.2). |
| 2026-10-04 | Contenido | §4.6, §6.1 y §7: `size/sidebar/width`, `color/background/overlay` y `color/background/neutral/translucent` creadas en Figma (Semantic size pasa a 4 variables y Semantic color a 33); descripción de `size/content/max-width` actualizada a 960 px. |
| 2026-10-04 | Contenido | §5.2 regla 6 y §6.1: precisión sobre la opacidad y `$ref` (S32). §6.1: los semánticos de mensaje sin uso se mantienen (S31). |
| 2026-10-04 | Contenido | §3.1: referencias de Tailwind verificadas contra el CSS fuente 4.3.3. §3.5: contraste de las escalas de estado recalculado sobre el hex guardado (S30); cambios de 0,01 a 0,06, ninguno cruza un umbral. |
| 2026-10-04 | Desarrollo | `size/sidebar/width`, `color/background/overlay` y `color/background/neutral/translucent` salen de la exportación de Figma, no de los tokens solo de código (§4.6, §6.1, §7). Opacidad en float32 recuperada por el normalizador (V31). Sin cambios de valor. |
| 2026-10-05 | Contenido | §6.1: `color/background/neutral/translucent` pasa al 96 % en Light (S35), para que el anillo de foco llegue a 3:1 sobre la cabecera en el peor caso (1.4.11). Dark sigue al 90 %. |
| 2026-10-06 | Contenido | Versión del sistema 1.0.0 y tabla "Versiones del sistema" (S36), al aprobarse el módulo 8. |
| 2026-10-09 | Contenido | Versión 1.1.0 (S38): breakpoints de Tailwind CSS como tokens solo de código y `breakpoint/desktop` como alias de `breakpoint/lg` (§4.2, §4.10, §5.2 y §7). §5.2: vocabulario de categorías completado con las de código (`duration`, `easing`, `blur`, `opacity`, `breakpoint`) y §7: lista de tokens solo de código completada (`duration/2000`, `opacity/inactive`). |

---

## 1. Marca (cerrada, A1)

- **Marca:** DesignToken101, firmada por Oscar Carballido.
- **Color de acento:** HSL(160, 60 %, 50 %) = `#33CC99` = oklch(0.755 0.145 165.4). Sustituye al valor inicial HSL(150, 50 %, 60 %) (corrección de Oscar, 2026-09-30). *Si vuelve a cambiar, se regeneran las escalas con el mismo método (sección 3).*
- **Neutros:** tintados con el tono del acento, **tinte suave** (croma de Tailwind `gray` × 0,5).
- **Tipografías:**
  - Interfaz y texto: **Inter**. Licencia SIL Open Font License 1.1; fuente variable ([rsms/inter](https://github.com/rsms/inter)).
  - Código y nombres de tokens: **JetBrains Mono**. Licencia OFL-1.1, uso comercial y no comercial gratuito; tiene ligaduras que se pueden activar o desactivar ([JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)).

## 2. Espacio de color (cerrada, A7): opción B

**Decisión:** las escalas se *construyen* en oklch y se *guardan* en sRGB.

- Los valores **sRGB** son la fuente de verdad y son los que se guardan en las variables de Figma.
- El archivo de Figma trabaja con el perfil de color **sRGB** (comprobado en el archivo TokensDS el 2026-09-30).
- El CSS puede salir en hex u oklch; el color es el mismo. El formato de salida se decide en la sesión de desarrollo (A8).

**Por qué:**
- La importación DTCG de Figma solo acepta color en sRGB y HSL ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)).
- oklch expresa la luminosidad tal como la percibimos y sirve para crear variaciones armónicas ([MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)). Construir la escala en oklch da pasos regulares y hace más predecible el contraste entre pasos.
- Figma admite archivos en sRGB (por defecto) o Display P3 en todos los planes. Al convertir el perfil, los valores de las variables de color no cambian ([Figma: Manage color profiles](https://help.figma.com/hc/en-us/articles/360039825114-Manage-color-profiles-in-design-files)). Un archivo en sRGB garantiza que el valor guardado es el que se ve.
- Se descarta Display P3 (opción C): la importación DTCG de Figma no lo admite, su exportación está sin verificar y añade complejidad al curso.

**Consecuencia:** no hay colores fuera de la gama sRGB. Si la exportación diera problemas en el paso 7, el sistema pasa a la opción A (sRGB en todo) sin rehacer nada.

**Accesibilidad:** el contraste se comprueba con la fórmula de WCAG 2.2 (luminancia relativa y relación de contraste) sobre los valores sRGB finales, no sobre la L de oklch.

**Pendiente de verificar (sesión de desarrollo, paso 7):** qué `colorSpace` escribe Figma al exportar y cómo lo convierten Style Dictionary y Terrazzo.

## 3. Escalas de color (cerrada, A5, aprobada 2026-09-30; regenerada con el acento corregido)

### 3.1 Método

Script reproducible: `tools/scales.py` (sin dependencias). Conversiones OKLab según [Björn Ottosson](https://bottosson.github.io/posts/oklab/); contraste según WCAG 2.2.

1. **Pasos:** 50, 100, 200 … 900, 950 (11 pasos), como la paleta de Tailwind CSS v4 ([Tailwind CSS: Colors](https://tailwindcss.com/docs/colors)).
2. **Acento:**
   - Se convierte el color de marca a oklch.
   - Se toma como referencia la curva de luminosidad (L) y croma (C) de `green` de Tailwind CSS v4, de tono cercano (≈150).
   - El color de marca se coloca **exacto** en el paso de L más cercana (**500**).
   - El croma de toda la escala se multiplica por la proporción entre el croma del color de marca y el de la referencia en ese paso (0,145 / 0,219 ≈ 0.66).
   - El tono (H) es constante: 165,4.
3. **Neutros:**
   - L de `neutral` de Tailwind CSS v4.
   - C de `gray` de Tailwind CSS v4 × 0,5 (tinte suave).
   - H del acento.
4. **Ajuste a la gama sRGB:** si un color queda fuera, se reduce solo el croma, conservando L y H.

Nota: los valores L/C de Tailwind se obtuvieron de tailwindcss.com/docs/colors el 2026-09-30. **Verificado el 2026-10-04 (sesión de contenido):** coinciden sin ninguna diferencia con el CSS fuente de Tailwind CSS 4.3.3 ([`packages/tailwindcss/theme.css`](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/theme.css)): `green`, `neutral`, `gray`, `red`, `amber` y `blue`.

**Contraste de las tablas (S30):** se calcula sobre el hex guardado, que es el valor de Figma (§2). `python3 tools/scales.py` imprime las cuatro escalas y las de estado con ese cálculo.

### 3.2 Acento

| Paso | oklch | Hex | Contraste con blanco | Contraste con neutral-950 |
|---|---|---|---|---|
| 50 | 0.982 0.012 165.4 | `#F2FCF7` | 1.05 | 18.86 |
| 100 | 0.962 0.029 165.4 | `#E1F9EE` | 1.11 | 17.86 |
| 200 | 0.925 0.056 165.4 | `#C4F3DD` | 1.22 | 16.19 |
| 300 | 0.871 0.099 165.4 | `#93EAC5` | 1.42 | 13.94 |
| 400 | 0.792 0.139 165.4 | `#4FD7A6` | 1.81 | 10.92 |
| **500** | **0.755 0.145 165.4** | **`#33CC99`** (marca) | 2.05 | 9.63 |
| 600 | 0.627 0.129 165.4 | `#0EA075` | 3.33 | 5.93 |
| 700 | 0.527 0.102 165.4 | `#1A7D5C` | 5.08 | 3.89 |
| 800 | 0.448 0.079 165.4 | `#1F624A` | 7.23 | 2.73 |
| 900 | 0.393 0.063 165.4 | `#1F503E` | 9.23 | 2.14 |
| 950 | 0.266 0.043 165.4 | `#0D2C20` | 15.02 | 1.32 |

### 3.3 Neutros (tinte suave)

| Paso | oklch | Hex | Contraste con blanco | Contraste con neutral-950 |
|---|---|---|---|---|
| 50 | 0.985 0.001 165.4 | `#F9FAFA` | 1.05 | 18.89 |
| 100 | 0.970 0.002 165.4 | `#F4F5F5` | 1.09 | 18.09 |
| 200 | 0.922 0.003 165.4 | `#E3E6E5` | 1.26 | 15.73 |
| 300 | 0.870 0.005 165.4 | `#D1D5D3` | 1.48 | 13.33 |
| 400 | 0.708 0.011 165.4 | `#9BA39F` | 2.58 | 7.65 |
| 500 | 0.556 0.013 165.4 | `#6C7671` | 4.70 | 4.20 |
| 600 | 0.439 0.015 165.4 | `#4B5550` | 7.74 | 2.55 |
| 700 | 0.371 0.017 165.4 | `#38433E` | 10.29 | 1.92 |
| 800 | 0.269 0.017 165.4 | `#1F2924` | 14.99 | 1.32 |
| 900 | 0.205 0.017 165.4 | `#101A15` | 17.79 | 1.11 |
| 950 | 0.145 0.014 165.4 | `#050C09` | 19.76 | 1.00 |

### 3.4 Observaciones de accesibilidad

Umbrales de WCAG 2.2: 4.5:1 para texto normal y 3:1 para texto grande y componentes de interfaz (a confirmar en la investigación del módulo 7).

- El color de marca (500) **no** admite texto blanco (2.05:1). Sí admite texto oscuro (9.63:1 con neutral-950).
- Un botón con fondo de acento y texto blanco necesita el paso 700 o superior (5.08:1).
- neutral-500 (`#6C7671`) con fondo blanco da ≈4.7:1: es el paso más claro utilizable para texto secundario sobre blanco.

### 3.5 Escalas de estado (cerradas, S16, S18, S19)

- **Tonos:** `red`, `amber` y `blue`, con las curvas de L, C y H por paso de Tailwind CSS v4 ([Tailwind: Colors](https://tailwindcss.com/docs/colors)).
- **Croma armonizado:** × 0,66, la misma reducción que tiene el acento frente a su referencia. Ajuste a sRGB reduciendo solo el croma.
- **No hay escala `green`:** `success` usa `emerald`, la escala del acento (S19). Por WCAG 1.4.1, los mensajes de éxito se distinguen también por icono y texto.
- Script: `status_scales(0.66)` en `tools/scales.py` (sin `green` desde S30). Contraste calculado sobre el hex (S30).

**red**

| Paso | oklch | Hex | Contraste con blanco |
|---|---|---|---|
| 50 | 0.971 0.009 17.4 | `#FBF3F3` | 1.09 |
| 100 | 0.936 0.021 17.7 | `#F8E5E5` | 1.21 |
| 200 | 0.885 0.041 18.3 | `#F3CFCF` | 1.43 |
| 300 | 0.808 0.075 19.6 | `#EDADAD` | 1.88 |
| 400 | 0.704 0.126 22.2 | `#E37E7B` | 2.79 |
| 500 | 0.637 0.156 25.3 | `#DA5E58` | 3.67 |
| 600 | 0.577 0.162 27.3 | `#C74A41` | 4.68 |
| 700 | 0.505 0.141 27.5 | `#A63D35` | 6.29 |
| 800 | 0.444 0.117 26.9 | `#89342E` | 8.09 |
| 900 | 0.396 0.093 25.7 | `#702F2B` | 9.86 |
| 950 | 0.258 0.061 26.0 | `#3C1613` | 15.95 |

**amber**

| Paso | oklch | Hex | Contraste con blanco |
|---|---|---|---|
| 50 | 0.987 0.015 95.3 | `#FEFBF0` | 1.04 |
| 100 | 0.962 0.039 95.6 | `#FAF3D6` | 1.11 |
| 200 | 0.924 0.079 95.7 | `#F6E6AA` | 1.25 |
| 300 | 0.879 0.112 91.6 | `#F2D57E` | 1.44 |
| 400 | 0.828 0.125 84.4 | `#ECC060` | 1.71 |
| 500 | 0.769 0.124 70.1 | `#E6A554` | 2.13 |
| 600 | 0.666 0.118 58.3 | `#C98044` | 3.16 |
| 700 | 0.555 0.108 49.0 | `#A55E35` | 4.94 |
| 800 | 0.473 0.090 46.2 | `#854A2D` | 6.97 |
| 900 | 0.414 0.074 45.9 | `#6C3E27` | 8.91 |
| 950 | 0.279 0.051 45.6 | `#3D2012` | 14.85 |

**blue**

| Paso | oklch | Hex | Contraste con blanco |
|---|---|---|---|
| 50 | 0.970 0.009 254.6 | `#F1F6FB` | 1.09 |
| 100 | 0.932 0.021 255.6 | `#DFEAF7` | 1.22 |
| 200 | 0.882 0.039 254.1 | `#C7DAF2` | 1.42 |
| 300 | 0.809 0.069 251.8 | `#A0C4ED` | 1.81 |
| 400 | 0.707 0.109 254.6 | `#71A3E3` | 2.61 |
| 500 | 0.623 0.141 259.8 | `#5286DB` | 3.63 |
| 600 | 0.546 0.162 262.9 | `#3B6ACD` | 5.09 |
| 700 | 0.488 0.160 264.4 | `#3058B9` | 6.52 |
| 800 | 0.424 0.131 265.6 | `#2B4895` | 8.52 |
| 900 | 0.379 0.096 265.5 | `#293F75` | 10.18 |
| 950 | 0.282 0.060 267.9 | `#1D2747` | 14.65 |

## 4. Escalas de espaciado, tipografía, radio y borde (cerrada, A5, aprobada 2026-09-30)

Criterios comunes (fase 1, tema 8):
- Números en los primitivos y roles en los semánticos.
- Múltiplos de 100, con cero inicial para las fracciones (`050` = 0,5×).
- Negativos en un segmento propio.
- Pocas opciones bien elegidas.

En Figma los valores van en **px** (la importación DTCG de Figma solo admite `px`); en CSS se convierten a **rem** con base 16.

### 4.1 Espaciado: base 4 px, `100` = 4 px

Tomado del Simple Design System de Figma ([SDS theme.css](https://raw.githubusercontent.com/figma/sds/main/src/theme.css)), que usa exactamente esta escala. Coincide con Tailwind CSS v4, cuyo `--spacing` por defecto es 0.25rem = 4 px ([Tailwind CSS: Theme](https://tailwindcss.com/docs/theme)): `space/400` = `p-4`.

| Token | px (Figma) | rem (CSS) |
|---|---|---|
| space/0 | 0 | 0 |
| space/050 | 2 | 0.125 |
| space/100 | 4 | 0.25 |
| space/150 | 6 | 0.375 |
| space/200 | 8 | 0.5 |
| space/300 | 12 | 0.75 |
| space/400 | 16 | 1 |
| space/600 | 24 | 1.5 |
| space/800 | 32 | 2 |
| space/1200 | 48 | 3 |
| space/1600 | 64 | 4 |
| space/2400 | 96 | 6 |
| space/4000 | 160 | 10 |
| space/negative/100 · 200 · 300 · 400 · 600 |: (solo código, D02) | −0.25 · −0.5 · −0.75 · −1 · −1.5 |

**Espaciado negativo (D02): tokens solo de código.** No se crean en Figma. Se generan en código a partir de esta tabla. Motivo en §7.

### 4.2 Tipografía

**Familias:** `font-family/sans` = Inter · `font-family/mono` = JetBrains Mono.

**Familias de reserva en CSS (V11):** `ui-sans-serif, system-ui, sans-serif` para `sans` y `ui-monospace, monospace` para `mono`. Se añaden en la capa de Tailwind (`--font-sans`, `--font-mono`), no en el token: Figma admite un solo nombre de familia.

**Carga de las fuentes (V13):** `next/font/google` aloja Inter y JetBrains Mono en la web y las publica en `--font-inter` y `--font-jetbrains-mono`. La capa de Tailwind las pone delante del token: `var(--font-inter, var(--t101-font-family-sans))` y después las de reserva.

**Tamaños:** escala enumerada del SDS ([SDS theme.css](https://raw.githubusercontent.com/figma/sds/main/src/theme.css)).

| Token | px (Figma) | rem (CSS) |
|---|---|---|
| font-size/01 | 12 | 0.75 |
| font-size/02 | 14 | 0.875 |
| font-size/03 | 16 | 1 |
| font-size/04 | 20 | 1.25 |
| font-size/05 | 24 | 1.5 |
| font-size/06 | 32 | 2 |
| font-size/07 | 40 | 2.5 |
| font-size/08 | 48 | 3 |
| font-size/09 | 64 | 4 |
| font-size/10 | 72 | 4.5 |

**Texto de lectura (body): 16 px**, el tamaño por defecto del navegador. No se añade 18 px (decisión de Oscar, 2026-09-30).

**Tamaños por contexto (D10): colección Layout, modos Desktop y Mobile.** Un token semántico por estilo de texto (§8), alias de un primitivo `font-size/*`. Los estilos de texto se vinculan a estos tokens, no a los primitivos.

| Token | Desktop | Mobile |
|---|---|---|
| font-size/heading/1 | `font-size/07` (40) | `font-size/06` (32) |
| font-size/heading/2 | `font-size/06` (32) | `font-size/05` (24) |
| font-size/heading/3 | `font-size/05` (24) | `font-size/04` (20) |
| font-size/heading/4 | `font-size/04` (20) | `font-size/04` (20) |
| font-size/body/default | `font-size/03` (16) | `font-size/03` (16) |
| font-size/body/small | `font-size/02` (14) | `font-size/02` (14) |
| font-size/label/default | `font-size/02` (14) | `font-size/02` (14) |
| font-size/caption/default | `font-size/01` (12) | `font-size/01` (12) |
| font-size/code/default | `font-size/02` (14) | `font-size/02` (14) |

- Los 9 estilos base tienen token, aunque 5 valgan lo mismo en los dos modos: así todos se vinculan a la misma capa y cambiar uno es cambiar un alias. (`body/strong` usa el de `body/default`.)
- El texto de lectura se mantiene en 16 px en móvil.
- En Figma, un estilo de texto con el tamaño vinculado a una variable con modos cambia según el modo del marco (comprobado en el archivo el 2026-09-30: `heading/1` = 40 px en Desktop y 32 px en Mobile con el mismo estilo).

**Breakpoint (D11): `breakpoint/desktop` = 64rem (1024 px), token solo de código; desde S38, alias de `breakpoint/lg` (§4.10).** En CSS, Mobile es el valor por defecto y Desktop se aplica con `@media (width >= 64rem)`. Coincide con `lg` de Tailwind CSS v4, cuyos breakpoints son *mobile-first* con `min-width` y se definen con `--breakpoint-*` ([Tailwind CSS: Responsive design](https://tailwindcss.com/docs/responsive-design)). Es también el ancho desde el que el sidebar deja de ser un panel (D09). En Figma no hay token: se diseña en dos marcos (1440 y 375 px) con el modo de Layout correspondiente.

**Pesos (D04, sustituye a la parte de S29 que usaba String):** variables **Number** con el peso numérico.

| Token | Valor | En Figma (Inter) |
|---|---|---|
| font-weight/400 | 400 | Regular |
| font-weight/500 | 500 | Medium |
| font-weight/600 | 600 | Semi Bold |
| font-weight/700 | 700 | Bold |

- **Fuente:** Figma admite variables Number en el peso tipográfico, solo con números como 400 o 700 ([Figma: Overview of variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)). Comprobado en el archivo: una variable Number con valor 600 en un estilo de texto de Inter lo convierte en Semi Bold.
- **Fuente:** en Dev Mode, un peso aplicado con una variable String no se muestra como referencia a la variable, solo como número; con una variable Number sí aparece la referencia ([Figma: Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode)).
- **Recomendación aceptada:** con Number, el mismo número está en Figma, en DTCG (`fontWeight` admite números de 1 a 1000) y en CSS. Es la excepción a la regla "sin valores en el nombre": el peso numérico es el nombre estándar del paso en CSS.
- La importación DTCG de Figma no incluye el tipo `fontWeight` entre sus tipos admitidos ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)). **Comprobado en el paso 7 (2026-10-03):** Figma exporta estas variables como `"$type": "number"` con el scope `FONT_STYLE`. La normalización (`tools/figma-to-dtcg.mjs`, V06) las convierte en `fontWeight`.

**Interlineado** (número sin unidad, multiplicador del tamaño de fuente, como define DTCG):

| Token | Valor | Uso previsto | En Figma (estilos de texto) |
|---|---|---|---|
| line-height/tight | 1.2 | Títulos grandes | 120 % |
| line-height/snug | 1.4 | Interfaz, textos cortos | 140 % |
| line-height/normal | 1.5 | Texto de lectura | 150 % |

**Interlineado en Figma (D01): tokens solo de código.** Figma interpreta una variable Number en el interlineado como píxeles, no como multiplicador (prueba en §7). Se aplica la regla de respaldo de S25: los estilos de texto usan el porcentaje de la tabla, sin variable, y `line-height/*` se genera en código desde esta especificación.

El texto de lectura usa 1.5. Coincide con el mínimo de 1.4.8 Visual Presentation (AAA, "space-and-a-half") de [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Además, 1.4.12 Text Spacing (AA) exige que el contenido no se rompa si el usuario fija el interlineado en 1.5: afecta al diseño de los componentes (alturas flexibles), no al token.

**Tracking:** sin tokens en v1 (0 por defecto). Se añadirá si los títulos grandes lo necesitan. Nota: Figma interpreta una variable Number en el espaciado entre letras como píxeles, no como porcentaje ([Figma: Overview of variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)).

### 4.3 Radio

Escala definida por Oscar (2026-09-30); 30 px se sustituyó por 32 px para mantener todos los pasos en múltiplos de 4. Parte del SDS (4, 8, 16, full) y añade pasos intermedios. El número del nombre sigue la regla `100` = 4 px.

| Token | px (Figma) | rem (CSS) |
|---|---|---|
| radius/0 | 0 | 0 |
| radius/100 | 4 | 0.25 |
| radius/200 | 8 | 0.5 |
| radius/300 | 12 | 0.75 |
| radius/400 | 16 | 1 |
| radius/600 | 24 | 1.5 |
| radius/800 | 32 | 2 |
| radius/1200 | 48 | 3 |
| radius/full | 9999 | 624.9375 |

**Semánticos (S23):** `radius/control` → `radius/200` (8 px), para botones, campos y chips. `radius/container` → `radius/400` (16 px), para tarjetas, Callouts y bloques de código.

### 4.4 Grosor de borde

Del SDS: `stroke-border` = 1 px y `stroke-focus-ring` = 2 px.

| Token | px (Figma) | rem (CSS) |
|---|---|---|
| border-width/100 | 1 | 0.0625 |
| border-width/200 | 2 | 0.125 |

Relacionado: 2.4.13 Focus Appearance (AAA) pide que el indicador de foco tenga un contraste de al menos 3:1 ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)). El anillo de foco usa `border-width/200` (2 px) y `color/border/focus`, que cumple 3:1 en los dos modos (§6.2).

### 4.5 Tamaño mínimo de objetivos (referencia para componentes)

2.5.8 Target Size (Minimum), nivel AA: los objetivos táctiles y de puntero deben medir al menos **24 × 24 px CSS**, con excepciones (espaciado suficiente, alternativa equivalente, enlaces dentro de texto, controles del navegador y casos esenciales) ([Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). No es un token primitivo, pero condiciona la altura mínima de los controles.

### 4.6 Tamaños de maquetación (D20)

| Token | px (Figma) | rem (CSS) | Uso |
|---|---|---|---|
| size/content/max-width | 960 | 60 | Ancho máximo de la columna de la lección (incluye el padding `space/400` a cada lado: ≈ 928 px de texto). **V27:** antes 720 px. Descripción de la variable en Figma actualizada a 960 px (2026-10-04). |
| size/sidebar/width | 304 | 19 | Ancho del sidebar en escritorio (V16) y del panel de navegación móvil (V25). En Figma se dibujó a 305 px sin variable. **Variable creada en Figma el 2026-10-04**; desde la reexportación del mismo día sale de Figma (`tokens/figma/semantic-size/`) y ya no está en `tokens/code-only.tokens.json`. |

- Colección **Semantic size**, scope "ancho y alto". Es un valor directo, **excepción a la regla 6** (§5.2): no hay escala primitiva de tamaños y un solo valor no la justifica. Si aparecen más tamaños de maquetación, se crea la escala y este token pasa a ser alias.
- Categoría nueva en el vocabulario: `size`.
- `breakpoint/desktop` (D11) sigue siendo un token solo de código.

### 4.7 Movimiento (V24): tokens solo de código

| Token | Valor | Tipo DTCG | Uso |
|---|---|---|---|
| duration/200 | 200 ms | `duration` | Panel de navegación móvil y acordeón del sidebar |
| duration/2000 | 2000 ms | `duration` | Un ciclo del pulso del resultado desactualizado en Generar escalas (C30) |
| easing/standard | `cubic-bezier(0.2, 0, 0, 1)` | `cubicBezier` | Curva de todas las animaciones de la interfaz |

- Viven en `tokens/code-only.tokens.json`, como `breakpoint/desktop` (D11). **Precisión (2026-10-03):** Figma sí tiene variables **Timing** y **Easing** ([Figma: Overview of variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes); [Plugin API: Update 133](https://developers.figma.com/docs/plugins/updates/2026/08/05/version-1-update-133/)). Oscar decide mantener estos tokens solo en código. Sin verificar: si esas variables se exportan en DTCG y en qué unidad (la ayuda dice milisegundos; la API de plugins, segundos).
- Con `prefers-reduced-motion: reduce` no hay animación (2.3.3 Animation from Interactions, AAA, [WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).

### 4.8 Desenfoque (V28): token solo de código

| Token | px | rem (CSS) | Uso |
|---|---|---|---|
| blur/300 | 12 | 0.75 | Difuminado del contenido que pasa por debajo de la cabecera sticky (`backdrop-filter`) |

- Vive en `tokens/code-only.tokens.json`: sin estilos de efecto en Figma en v1 (S28). Tipo DTCG `dimension`. La numeración sigue la de `space` (`300` = 12 px).
- En Tailwind, `backdrop-blur-300` (espacio de nombres `--blur-*`).

### 4.9 Opacidad (C27): token solo de código

`opacity/inactive` = 0,4. Punto más bajo del pulso del resultado desactualizado en "Generar escalas" (C30) y, con `prefers-reduced-motion`, opacidad fija de sus muestras de color (C27). Con el pulso, el texto también baja de opacidad: riesgo de accesibilidad aceptado por Oscar (C30). Fuera de ese caso, nunca se aplica a texto: con cualquier opacidad que se note, el texto de esa zona baja de 4,5:1 (con el 80 %, 3,31:1 en Light; cálculo de C27). No hay variable en Figma: el estado desactualizado no se dibuja en las plantillas.

### 4.10 Breakpoints (S38): tokens solo de código

Los de Tailwind CSS v4, con sus valores y nombres ([Tailwind CSS: Responsive design](https://tailwindcss.com/docs/responsive-design), comprobado el 2026-10-09). La capa 2 quita el tema por defecto de Tailwind (`--*: initial`, V09), y con él sus breakpoints: estos tokens los devuelven.

| Token | Valor | px | Variante de Tailwind |
|---|---|---|---|
| breakpoint/sm | 40rem | 640 | `sm:` |
| breakpoint/md | 48rem | 768 | `md:` |
| breakpoint/lg | 64rem | 1024 | `lg:` |
| breakpoint/xl | 80rem | 1280 | `xl:` |
| breakpoint/2xl | 96rem | 1536 | `2xl:` |
| breakpoint/desktop | `{breakpoint.lg}` | 1024 | `desktop:` |

- `sm` a `2xl` son primitivos; `breakpoint/desktop` es el semántico: el corte entre los modos Mobile y Desktop de Layout y desde el que el sidebar es fijo (D11). Los componentes usan `desktop:` para ese corte; `sm:` a `2xl:` quedan para ajustes de maquetación que no son el cambio de modo.
- **Excepción a la regla 1 de §5.2** (palabras completas): los nombres son los de Tailwind, porque el nombre del token es el prefijo de la clase.
- Todos en `rem`: Tailwind ordena las variantes por su valor y recomienda una sola unidad.
- En la capa 1, `--t101-breakpoint-*`; el alias, `var(--t101-breakpoint-lg)`. En la capa 2 y en las consultas `@media` el valor se escribe resuelto, porque una consulta no lee variables (D11).
- En Figma no hay variable: ningún breakpoint cambia el modo de un marco (D09, D11).

## 5. Nomenclatura

### 5.1 Escuela y orden (cerradas, A2, A3)

- **Propiedad primero** (como el [SDS de Figma](https://raw.githubusercontent.com/figma/sds/main/src/theme.css) y [Atlassian](https://atlassian.design/foundations/tokens/design-tokens)), con matriz reducida y pares "on-" explícitos para texto sobre color.
- **Orden:** categoría / propiedad / rol / énfasis / estado. Solo los niveles necesarios.
- **Motivo principal:** encaja con los *scopes* de variables de Figma, que limitan cada variable a unas propiedades y solo la muestran en esos selectores ([Figma: Create and manage variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)). El público principal del curso son diseñadores.
- **Coste conocido:** Tailwind usa un único espacio de nombres `--color-*` para fondo, texto y borde ([Tailwind: Theme](https://tailwindcss.com/docs/theme)), así que las clases quedan redundantes (`text-text-default`). Pendiente A12 (sesión de desarrollo).

### 5.2 Convención (cerrada, A4)

Reglas y vocabulario aprobados por Oscar el 2026-09-30.

**Reglas**

1. Minúsculas y kebab-case dentro de cada segmento. Palabras completas (`background`, no `bg`). Sin valores ni temas en el nombre (S4). Excepciones: los pesos tipográficos usan su número CSS (`font-weight/600`, D04), y los breakpoints, los nombres de Tailwind CSS (`breakpoint/sm`, S38, §4.10).
2. Separador `/` en Figma. Figma lo convierte en grupos anidados en DTCG y en `-` en CSS.
3. Orden fijo: categoría / propiedad / rol / énfasis / estado. Un nivel que no aporta información no se escribe.
4. **Hoja explícita:** si un nombre fuera a la vez token y grupo, el token lleva `/default`. DTCG prohíbe que un objeto sea token y grupo a la vez ([DTCG Format: Groups](https://www.designtokens.org/TR/2025.10/format/#group-structure)).
   - **Estado en el lugar del énfasis (D13).** Cuando un estado se añade a un token cuyo énfasis es el de por defecto y que ya es un token final, el estado ocupa el lugar del énfasis en vez de crear un nivel nuevo: `color/text/accent/default` → `color/text/accent/hover`; `color/background/neutral/hover`. Así no hay que renombrar tokens ni convertir un token en grupo. Es el patrón del SDS de Figma (`--sds-color-background-neutral-default` / `--sds-color-background-neutral-hover`, [SDS theme.css](https://raw.githubusercontent.com/figma/sds/main/src/theme.css)). Consecuencia: en ese nivel conviven palabras de énfasis (`default`, `subtle`, `strong`) y de estado (`hover`, `active`); se distinguen por el vocabulario. Cuando el énfasis no es el de por defecto, el estado va en su propio nivel, como ya ocurre en `color/background/accent/strong/{default,hover,active}`.
5. **Primitivos:** categoría / paleta / paso (`color/red/500`, `space/400`, `radius/200`). Las paletas se nombran por su tono o por su naturaleza (neutral), **nunca por su rol**.
6. **Semánticos:** siempre son alias de un primitivo, nunca valores directos. Máximo dos saltos (componente → semántico → primitivo). Excepciones: `size/content/max-width` (D20) y los colores con transparencia, `color/background/overlay` (V25) y `color/background/neutral/translucent` (V28), porque un alias de Figma o con llaves de DTCG no puede cambiar la opacidad (S32). DTCG 2025.10 permitiría derivar el color con `$ref` (JSON Pointer) y un `alpha` propio; no se usa porque Figma no lo exporta y no está probado con Terrazzo.
7. **Pares de contraste:** el texto o el borde sobre un fondo de color fuerte se nombra `on-{rol}` (`color/text/on-accent`). Cada par se comprueba con WCAG 2.2.

**Vocabulario**

| Nivel | Valores |
|---|---|
| Categoría | `color`, `space`, `radius`, `border-width`, `font-family`, `font-size`, `font-weight`, `line-height`, `size` (D20). Solo de código: `duration`, `easing` (V24), `blur` (V28), `opacity` (C27) y `breakpoint` (D11, S38) |
| Propiedad (color) | `background`, `text`, `border` |
| Rol | `neutral`, `accent`, `info`, `success`, `warning`, `danger` (no `error`; como el SDS y Atlassian). Roles que no dependen de un color de rol (S34): `focus` (anillo de foco, `color/border/focus`) y `overlay` (capa sobre el contenido, `color/background/overlay`); `disabled` seguiría el mismo patrón (D14). Los pares `on-{rol}` ocupan también este nivel (regla 7). |
| Énfasis | `default`, `subtle` (menos énfasis: fondos tintados, texto secundario), `strong` (más énfasis: fondos sólidos). Aprobado por Oscar (2026-09-30). `translucent` (fondo con transparencia, V28). |
| Estado | `default`, `hover`, `active` (solo en elementos interactivos). `disabled` no es un estado: se añadiría como rol (D14, §6.4). |
| Elemento y medida (tamaño, S34) | Los semánticos de `Semantic size` siguen categoría / elemento / medida. Elemento: `control`, `container` (radio), `content`, `sidebar` (maquetación). Medida: `max-width`, `width`, con el nombre de la propiedad CSS en la que se aplican. |

**Ejemplos**

| Token | Uso |
|---|---|
| `color/background/neutral/default` | Fondo de la página |
| `color/background/neutral/subtle` | Fondo de tarjetas, bloques de código |
| `color/text/neutral/default` | Texto principal |
| `color/text/neutral/subtle` | Texto secundario |
| `color/border/neutral/default` | Bordes y separadores |
| `color/background/accent/strong/default` | Botón principal |
| `color/background/accent/strong/hover` | Botón principal al pasar el ratón |
| `color/text/on-accent` | Texto sobre el botón principal |
| `color/background/warning/subtle` | Fondo del Callout de aviso |
| `color/text/warning/default` | Texto o icono del Callout de aviso |
| `color/border/focus` | Anillo de foco |

**Decisiones de A4 (2026-09-30)**

- **Iconos:** sin propiedad `icon`. Los iconos usan los tokens de texto de su contexto (p. ej. `color/text/warning/default`). Si algún día hace falta separarlos, se añade `icon` sin romper nada.
- **Paleta primitiva del acento:** se nombra por su tono, no `brand` (coherente con S16). Nombre: **`emerald`** (confirmado por Oscar), porque su tono en oklch (165,4) es cercano al `emerald` de Tailwind CSS v4 (≈163).

**Tokens de componente (S33, provisional).** DesignToken101 no tiene ninguno (S1, P11). Si un componente los justifica, se nombran componente / variante / propiedad / estado, con solo los niveles necesarios y el estado explícito si lo hay (regla 4): `button/primary/background/default`, `link/text`. Es el formato del curso de Figma (*asset-type-property-state*, [Figma: Update 1](https://help.figma.com/hc/en-us/articles/18490793776023-Update-1-Tokens-variables-and-styles)). Apuntan siempre a un semántico (regla 6). Se revisa al crear el primero.

**Prefijo CSS (S27): `--t101-`.** Ejemplo: `color/text/neutral/default` → `--t101-color-text-neutral-default`. Motivo: con propiedad primero, sin prefijo la capa 1 y la capa 2 de `@theme inline` tendrían el mismo nombre (referencia circular).

### 5.3 Colores de estado: Cerrado (ver §3.5)

Idea de Oscar (S16): escalas primitivas por tono generadas con el mismo método que el acento. Los tokens de estado son alias de esas escalas.

- `success` usa la escala `emerald` (S19), porque el acento está muy cerca de un verde de éxito.
- WCAG 2.2, criterio 1.4.1 Use of Color (nivel A): el color no puede ser el único medio visual para transmitir información ([WCAG 2.2](https://www.w3.org/TR/WCAG22/#use-of-color)). Los estados necesitan también icono o texto.

## 6. Tokens semánticos claro/oscuro (cerrada, A6, D23)

Generada con `tools/semantic.py` (salvo los tokens de D06 y D12, añadidos en diseño). Todos los tokens son alias de primitivos (regla 6). Colección de Figma: **Semantic color**, con modos **Light** y **Dark** (S3).

**Primitivos añadidos:** `color/white` (`#FFFFFF`) y `color/black` (`#000000`). No existen en las escalas (`neutral/50` es `#F9FAFA` y `neutral/950` es `#050C09`). `color/black` está reservado para sombras u overlays (S28); en v1 no se usa.

### 6.1 Tokens

| Token | Light | Dark |
|---|---|---|
| `color/background/neutral/default` | `white` (#FFFFFF) | `neutral/950` (#050C09) |
| `color/background/neutral/subtle` | `neutral/50` (#F9FAFA) | `neutral/900` (#101A15) |
| `color/background/neutral/strong` | `neutral/100` (#F4F5F5) | `neutral/800` (#1F2924) |
| `color/background/neutral/hover` | `neutral/100` (#F4F5F5) | `neutral/800` (#1F2924) |
| `color/background/neutral/active` | `neutral/200` (#E3E6E5) | `neutral/700` (#38433E) |
| `color/text/neutral/default` | `neutral/900` (#101A15) | `neutral/50` (#F9FAFA) |
| `color/text/neutral/subtle` | `neutral/600` (#4B5550) | `neutral/400` (#9BA39F) |
| `color/border/neutral/default` | `neutral/200` (#E3E6E5) | `neutral/800` (#1F2924) |
| `color/border/neutral/strong` | `neutral/500` (#6C7671) | `neutral/500` (#6C7671) |
| `color/text/accent/default` | `emerald/700` (#1A7D5C) | `emerald/400` (#4FD7A6) |
| `color/text/accent/hover` | `emerald/800` (#1F624A) | `emerald/300` (#93EAC5) |
| `color/background/accent/subtle` | `emerald/50` (#F2FCF7) | `emerald/950` (#0D2C20) |
| `color/background/accent/strong/default` | `emerald/500` (#33CC99) | `emerald/500` (#33CC99) |
| `color/background/accent/strong/hover` | `emerald/400` (#4FD7A6) | `emerald/400` (#4FD7A6) |
| `color/background/accent/strong/active` | `emerald/600` (#0EA075) | `emerald/600` (#0EA075) |
| `color/border/accent/default` | `emerald/300` (#93EAC5) | `emerald/700` (#1A7D5C) |
| `color/border/accent/strong` | `emerald/600` (#0EA075) | `emerald/400` (#4FD7A6) |
| `color/text/on-accent` | `neutral/950` (#050C09) | `neutral/950` (#050C09) |
| `color/border/focus` | `emerald/600` (#0EA075) | `emerald/400` (#4FD7A6) |
| `color/background/overlay` (V25) | `black` al 50 % (#00000080) | `black` al 50 % (#00000080) |
| `color/background/neutral/translucent` (V28, S35) | `white` al 96 % (#FFFFFFF5) | `neutral/950` al 90 % (#050C09E6) |
| `color/background/info/subtle` | `blue/50` (#F1F6FB) | `blue/950` (#1D2747) |
| `color/border/info/default` | `blue/300` (#A0C4ED) | `blue/700` (#3058B9) |
| `color/text/info/default` | `blue/700` (#3058B9) | `blue/300` (#A0C4ED) |
| `color/background/success/subtle` | `emerald/50` (#F2FCF7) | `emerald/950` (#0D2C20) |
| `color/border/success/default` | `emerald/300` (#93EAC5) | `emerald/700` (#1A7D5C) |
| `color/text/success/default` | `emerald/700` (#1A7D5C) | `emerald/300` (#93EAC5) |
| `color/background/warning/subtle` | `amber/50` (#FEFBF0) | `amber/950` (#3D2012) |
| `color/border/warning/default` | `amber/300` (#F2D57E) | `amber/700` (#A55E35) |
| `color/text/warning/default` | `amber/700` (#A55E35) | `amber/300` (#F2D57E) |
| `color/background/danger/subtle` | `red/50` (#FBF3F3) | `red/950` (#3C1613) |
| `color/border/danger/default` | `red/300` (#EDADAD) | `red/700` (#A63D35) |
| `color/text/danger/default` | `red/700` (#A63D35) | `red/300` (#EDADAD) |

33 tokens en Figma (los de `danger` y el fondo y el borde de `success` aún no los usa ningún componente; se mantienen, S31). Dos de ellos son valores directos: `color/background/overlay` (V25), capa sobre el contenido cuando el panel móvil está abierto, y `color/background/neutral/translucent` (V28), fondo de la cabecera sticky, porque un alias de Figma o con llaves no puede cambiar la opacidad (S32). **Creados en Figma el 2026-10-04** y reexportados el mismo día: salen de `tokens/figma/semantic-color/` y ya no están en los tokens solo de código (`code-only.light.tokens.json` y `code-only.dark.tokens.json` se han borrado). Figma exporta la opacidad en float32 (`"alpha": 0.8999999761581421` para el 90 %) y el normalizador la devuelve al valor escrito, `0.9` (V31); en CSS, `#fffffff5` / `#050c09e6` y `#00000080`. **Light al 96 % desde S35** (antes 90 %): es la opacidad mínima con la que el anillo de foco (`border/focus`) llega a 3:1 sobre la cabecera aunque pase negro por debajo (3,06:1; con el 90 %, 2,67:1 en teoría y 2,74:1 medido en la web). En Dark el anillo da más de 8:1 con el 90 %, así que no cambia. `color/border/accent/default` (D06) es el borde del Callout de recomendación; es decorativo, como los demás bordes de Callout (§6.2, "No se comprueban"). El Callout de recomendación usa `background/accent/subtle` y `text/accent/default`, con un contraste de 4,85:1 en Light y 8,30:1 en Dark.

**Por qué así:**
- **Botón principal con el color de marca.** `emerald/500` y texto oscuro (`on-accent` = `neutral/950`), en vez de un verde oscuro con texto blanco. El color de marca se ve tal cual y el texto cumple 9,63:1.
- **Hover más claro, active más oscuro** (400 / 600): con texto oscuro, oscurecer mucho el fondo bajaría el contraste por debajo de 4,5:1 (en el 700 sería 3,90:1).
- **Enlaces** (`text/accent/default`): `emerald/700` en claro y `emerald/400` en oscuro. El 500 de marca no llega a 4,5:1 sobre blanco.
- **Fondo oscuro:** `neutral/950` (`#050C09`, casi negro).

### 6.2 Contraste (WCAG 2.2)

| Par | Criterio | Light | Dark |
|---|---|---|---|
| `text/neutral/default` sobre `background/neutral/default` | 1.4.3 (≥ 4.5:1) | 17.79 ✓ | 18.89 ✓ |
| `text/neutral/default` sobre `background/neutral/subtle` | 1.4.3 (≥ 4.5:1) | 17.01 ✓ | 17.01 ✓ |
| `text/neutral/subtle` sobre `background/neutral/default` | 1.4.3 (≥ 4.5:1) | 7.74 ✓ | 7.65 ✓ |
| `text/neutral/subtle` sobre `background/neutral/subtle` | 1.4.3 (≥ 4.5:1) | 7.40 ✓ | 6.89 ✓ |
| `text/accent/default` sobre `background/neutral/default` | 1.4.3 (≥ 4.5:1) | 5.08 ✓ | 10.92 ✓ |
| `text/accent/default` sobre `background/neutral/subtle` | 1.4.3 (≥ 4.5:1) | 4.86 ✓ | 9.83 ✓ |
| `border/neutral/strong` sobre `background/neutral/default` | 1.4.11 (≥ 3:1) | 4.70 ✓ | 4.20 ✓ |
| `text/on-accent` sobre `background/accent/strong/default` | 1.4.3 (≥ 4.5:1) | 9.63 ✓ | 9.63 ✓ |
| `text/on-accent` sobre `background/accent/strong/hover` | 1.4.3 (≥ 4.5:1) | 10.92 ✓ | 10.92 ✓ |
| `text/on-accent` sobre `background/accent/strong/active` | 1.4.3 (≥ 4.5:1) | 5.93 ✓ | 5.93 ✓ |
| `background/accent/strong/default` sobre `background/neutral/default` | 1.4.11 (≥ 3:1) | 2.05 ✗ | 9.63 ✓ |
| `border/focus` sobre `background/neutral/default` | 1.4.11 (≥ 3:1) | 3.33 ✓ | 10.92 ✓ |
| `border/focus` sobre `background/neutral/subtle` | 1.4.11 (≥ 3:1) | 3.19 ✓ | 9.83 ✓ |
| `text/info/default` sobre `background/info/subtle` | 1.4.3 (≥ 4.5:1) | 5.99 ✓ | 8.10 ✓ |
| `text/success/default` sobre `background/success/subtle` | 1.4.3 (≥ 4.5:1) | 4.85 ✓ | 10.60 ✓ |
| `text/warning/default` sobre `background/warning/subtle` | 1.4.3 (≥ 4.5:1) | 4.77 ✓ | 10.32 ✓ |
| `text/danger/default` sobre `background/danger/subtle` | 1.4.3 (≥ 4.5:1) | 5.75 ✓ | 8.49 ✓ |
| `text/accent/default` sobre `background/accent/subtle` | 1.4.3 (≥ 4.5:1) | 4.85 ✓ | 8.30 ✓ |
| `text/neutral/default` sobre `background/neutral/hover` | 1.4.3 (≥ 4.5:1) | 16.28 ✓ | 14.34 ✓ |
| `text/neutral/subtle` sobre `background/neutral/hover` | 1.4.3 (≥ 4.5:1) | 7.08 ✓ | 5.81 ✓ |
| `text/neutral/default` sobre `background/neutral/active` | 1.4.3 (≥ 4.5:1) | 14.16 ✓ | 9.84 ✓ |
| `text/neutral/subtle` sobre `background/neutral/active` | 1.4.3 (≥ 4.5:1) | 6.16 ✓ | 3.99 ✗ (no se usa, §6.4) |
| `text/accent/hover` sobre `background/neutral/default` | 1.4.3 (≥ 4.5:1) | 7.23 ✓ | 13.94 ✓ |
| `text/accent/hover` sobre `background/neutral/subtle` | 1.4.3 (≥ 4.5:1) | 6.91 ✓ | 12.55 ✓ |
| `border/accent/strong` sobre `background/neutral/default` | 1.4.11 (≥ 3:1) | 3.33 ✓ | 10.92 ✓ |
| `border/accent/strong` sobre `background/neutral/subtle` | 1.4.11 (≥ 3:1) | 3.19 ✓ | 9.83 ✓ |
| `border/accent/strong` sobre `background/accent/subtle` | 1.4.11 (≥ 3:1) | 3.18 ✓ | 8.30 ✓ |

**Sobre el ✗ del botón:** el fondo del botón principal frente a la página (2,05:1 en claro) no necesita 3:1. La guía oficial de 1.4.11 indica que, si un control tiene contenido visible (texto o un icono con contraste suficiente) que permite identificarlo, no hace falta que su contorno contraste. Lo que sí debe cumplir es el indicador de foco ([Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). El texto del botón cumple 1.4.3 contra el fondo del botón, y el foco (`border/focus`) cumple 3:1 en los dos modos.

**No se comprueban:** `border/neutral/default` y los `border/{rol}/default` de los Callouts son decorativos (el texto transmite la información). Si un borde tuviera que identificar un control, como el de un campo de formulario, se usa `border/neutral/strong`, que cumple 3:1. Los componentes inactivos están exentos de contraste según la misma guía.

**Umbrales usados:** 4,5:1 para texto normal (1.4.3, AA) y 3:1 para componentes y estados (1.4.11, AA) ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

### 6.3 Decisiones validadas visualmente en diseño

**Cerradas el 2026-10-02 (D23) con los valores iniciales:** opción A del botón, fondo Light `color/white` y fondo Dark `neutral/950`. Se pueden reabrir con la regla de abajo.

| Decisión | Opciones | Valor elegido |
|---|---|---|
| Tratamiento del botón principal | A: `emerald/500` con texto oscuro (`neutral/950`). B: verde oscuro (`emerald/700`) con texto blanco | A |
| Fondo de página en Light | `color/white` o `neutral/50` (u otro neutro claro) | `color/white` |
| Fondo de página en Dark | `neutral/950` o `neutral/900` | `neutral/950` |

**Regla para cualquier cambio de alias:** volver a comprobar el contraste del par afectado (script `tools/semantic.py`, o un comprobador de contraste en Figma) y registrar el cambio en este documento y en `decisiones.md`. Ejemplo: con la opción B del botón, `text/on-accent` pasa a `color/white` y su contraste sobre `emerald/700` es 5,08:1. El hover y el active de B habría que recalcularlos.

### 6.4 Estados de los controles (D12–D14)

| Estado | Cómo se resuelve | Tokens |
|---|---|---|
| Hover y active de controles neutros sin fondo (IconButton, sidebar, En esta página, cabecera de InCode, selectores, botón secundario) | Fondo de estado | `background/neutral/hover`, `background/neutral/active` |
| Texto de esos controles en hover y active | Pasa a texto principal | `text/neutral/default` |
| Hover del enlace | Color de estado (además del subrayado) | `text/accent/hover` |
| Seleccionado o actual (sidebar, selectores) | Marca con forma propia, no solo color (1.4.1) | `border/accent/strong` (trazo) + `background/accent/subtle` + `text/accent/default` |
| Hover, active y foco del botón principal | Ya existían | `background/accent/strong/{default,hover,active}`, `text/on-accent`, `border/focus` |
| Foco | Ya existía | `border/focus` + `border-width/200` |
| Disabled | **No en v1** (D14): ningún control del inventario se desactiva |: |
| Loading | No es un token: es comportamiento del componente (indicador de progreso y texto que lo anuncia) | Tokens existentes |

**Fuente (WCAG 2.2, [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)):**
- El hover no necesita 3:1: *"additional author-supplied visual treatments for hover are not 'required to identify' the hover state"*.
- Los componentes inactivos están exentos: *"User Interface Components that are not available for user interaction (e.g., a disabled control in HTML) are not required to meet contrast requirements"*.
- Los cambios de color entre estados de un mismo componente no necesitan 3:1 *"when they do not appear next to each other"*; el indicador visual del estado sí debe contrastar con los colores adyacentes. Por eso la marca de seleccionado usa `border/accent/strong` (≥ 3:1) y no `emerald/500` (2,05:1 sobre blanco).

**Regla de texto (recomendación aceptada, D12):** en hover y active, los controles neutros usan `text/neutral/default`. Con `text/neutral/subtle` sobre `background/neutral/active` el contraste en Dark sería 3,99:1.

**Nota visual:** en Light, `background/neutral/hover` (`neutral/100`) apenas se distingue de `background/neutral/subtle` (1,04:1). No es un requisito de WCAG, pero si un control con hover está sobre fondo `subtle`, puede ajustarse el alias a `neutral/200` (y comprobar de nuevo el texto).

**Valores repetidos:** `background/neutral/hover` apunta a los mismos primitivos que `background/neutral/strong`. Son tokens distintos porque significan cosas distintas: uno es un estado y el otro una superficie. Se pueden separar sin tocar los componentes.

**Si en el futuro hace falta disabled:** se añade como rol (`color/{background,text,border}/disabled/default`), como en el SDS (`--sds-color-background-disabled-default`, `--sds-color-text-disabled-default`, `--sds-color-border-disabled-default`), no como un estado de cada rol.

## 7. Implementación en Figma: colecciones, visibilidad y scopes (S22, S26, S27, D01–D04)

Scopes disponibles según [Figma: Create and manage variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections): color (relleno de marco, relleno de forma, relleno de texto, trazo, efectos) y número (gap y padding de auto layout, radio, propiedades tipográficas, opacidad, efectos, trazo, contenido de texto, ancho y alto).

**Hallazgo (prueba en el archivo, 2026-09-30):** en la API de plugins de Figma solo existe un scope `GAP` para auto layout; no hay un scope de padding separado (los valores aceptados son, entre otros, `GAP`, `CORNER_RADIUS`, `WIDTH_HEIGHT`). Una variable con scope `GAP` sirve para gap y padding. Por eso no se puede limitar un token "solo al gap".

| Colección | Modos | Contenido | Ocultos al publicar | Scopes |
|---|---|---|---|---|
| **Primitives** | 1 (`Value`) | `color/*` (escalas, `white`, `black`) | Sí | Ninguno: solo sirven como destino de alias |
| | | `space/*` (sin negativos, D02) | No | Gap y padding de auto layout (`GAP`) |
| | | `border-width/*` | No | Trazo |
| | | `radius/*` | No | Radio |
| | | `font-family/*` (String) | Sí | Familia tipográfica |
| | | `font-weight/*` (Number, D04) | Sí | Peso tipográfico |
| | | `font-size/*` (Number) | Sí | Tamaño de fuente |
| **Semantic color** | Light, Dark | `color/background/*` | No | Relleno de marco y relleno de forma |
| | | `color/text/*` | No | Relleno de texto y relleno de forma (los iconos usan tokens de texto) |
| | | `color/border/*` | No | Trazo |
| **Semantic size** | 1 (`Value`) | `radius/control`, `radius/container` | No | Radio |
| | | `size/content/max-width` (D20, V27) y `size/sidebar/width` (V16) | No | Ancho y alto |
| **Layout** (D10) | Desktop, Mobile | `font-size/{estilo}` (9 tokens, §4.2) | No | Tamaño de fuente. Se usan desde los estilos de texto (§8) |

**No se crean en Figma (tokens solo de código):** `line-height/*` (D01), `space/negative/*` (D02), `breakpoint/*` (D11, S38), `duration/200` y `easing/standard` (V24), `duration/2000` (C30), `blur/300` (V28) y `opacity/inactive` (C27). Su fuente única es esta especificación.

**Creadas en Figma el 2026-10-04** (antes vivían solo en código): `size/sidebar/width` en Semantic size (V16), y `color/background/overlay` (V25) y `color/background/neutral/translucent` (V28) en Semantic color, con scope, code syntax Web y descripción. Reexportadas el mismo día: ya salen de la exportación de Figma; se han quitado de `tokens/code-only.tokens.json`, se han borrado `code-only.{light,dark}.tokens.json` y sus entradas del Resolver.

**Code syntax Web (S6, S27, D03):** `var(--t101-` + ruta con `/` sustituida por `-` + `)`. Ejemplo: `color/background/accent/strong/hover` → `var(--t101-color-background-accent-strong-hover)`. Se aplica a todas las variables, también a las ocultas.

### 7.1 Resultado de las verificaciones por prueba (sesión de diseño, 2026-09-30)

Pruebas hechas con la API de plugins en el archivo TokensDS (plan Professional), en una colección temporal que después se eliminó.

**Interlineado (S25 → D01).**
- Fuente: la ayuda de Figma dice que las variables Number se pueden aplicar al interlineado, pero no dice en qué unidad ([Figma: Overview of variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)). Sí lo dice para el espaciado entre letras: píxeles.
- Prueba: al vincular una variable con valor `1.5` a un estilo de texto de 16 px, el interlineado pasa a `1.5 px`, aunque el estilo estuviera en porcentaje. Con valor `150`, pasa a `150 px`. La unidad cambia siempre a píxeles.
- Conclusión: Figma no admite el interlineado como multiplicador. Se aplica la regla de respaldo de S25.

**Gap negativo (S26 → D02).**
- Fuente: la ayuda de Figma admite números negativos en las variables Number (ejemplo `-8`) ([Figma: Overview of variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)).
- Prueba: una variable con valor `−8` en el gap de un auto layout funciona (dos elementos de 40 px ocupan 72 px). Pero Figma también acepta esa variable en el padding (`paddingLeft = −8`), y el padding negativo no es válido en CSS.
- Como el scope `GAP` cubre gap y padding (hallazgo de arriba), no se puede impedir ese uso. Decisión de Oscar: tokens solo de código.

**Code syntax (S27 → D03).**
- Fuente: el ejemplo de la ayuda de Figma escribe el code syntax Web con `var()`: `var(--extra-small)` ([Figma: Create and manage variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)).
- Prueba con el servidor MCP de Figma (`get_design_context`) sobre un auto layout con gap y padding vinculados a una variable:

| Code syntax Web | Salida del MCP | Resultado |
|---|---|---|
| `var(--t101-space-200)` | `gap-[var(--t101-space-200,8px)]` | Correcto |
| `t101-space-200` | `gap-[var(--t101-space-200,8px)]` | Correcto |
| `--t101-space-200` | `gap-[var(----t101-space-200,8px)]` | Incorrecto (cuatro guiones) |

- Se usa el formato con `var()`, que coincide con el ejemplo de la documentación y funciona en el MCP.
- *Pendiente de ver en Dev Mode:* cómo se muestra en el panel Inspect. La API no da acceso a esa vista.

## 8. Estilos de texto por rol (S24)

Son la capa semántica de la tipografía. Cada estilo vincula familia y peso a las variables primitivas de §4.2, y el tamaño a su token de la colección Layout (D10). El interlineado se escribe como porcentaje, sin variable (D01). **En código, esta tabla es la fuente de los estilos compuestos**: la exportación DTCG de Figma trabaja con variables por modo y no incluye los estilos de texto (comprobado en el paso 7, 2026-10-03: ningún archivo de `tokens/figma/` trae tokens `typography`).

**En código (V15):** cada estilo es una utilidad de Tailwind en `src/styles/text-styles.css` (`type-heading-1`, `type-body-default`…). `npm run check:tokens` la compara con esta tabla, así que un cambio aquí sin cambiar el CSS hace fallar la comprobación.

**Por qué existe `body/strong` (D17).** En Figma, poner negrita a un fragmento de texto (aplicando la fuente o vinculando `font-weight/600`) separa ese fragmento de su estilo de texto: queda sin estilo (comprobado en el archivo el 2026-10-02). Para que todo el texto siga ligado a un estilo, el texto destacado tiene su propio estilo. En código no cambia nada: `<strong>` hereda tamaño e interlineado y aplica el peso 600.

| Estilo | Familia | Tamaño (Desktop · Mobile) | Interlineado (código · Figma) | Peso | Uso |
|---|---|---|---|---|---|
| heading/1 | `font-family/sans` | `font-size/heading/1` (40 · 32) | `line-height/tight` 1.2 · 120 % | `font-weight/700` | Título de la lección |
| heading/2 | `font-family/sans` | `font-size/heading/2` (32 · 24) | `line-height/tight` 1.2 · 120 % | `font-weight/600` | Apartados |
| heading/3 | `font-family/sans` | `font-size/heading/3` (24 · 20) | `line-height/tight` 1.2 · 120 % | `font-weight/600` | Subapartados |
| heading/4 | `font-family/sans` | `font-size/heading/4` (20 · 20) | `line-height/snug` 1.4 · 140 % | `font-weight/600` | Títulos menores |
| body/default | `font-family/sans` | `font-size/body/default` (16 · 16) | `line-height/normal` 1.5 · 150 % | `font-weight/400` | Texto de lectura |
| body/strong | `font-family/sans` | `font-size/body/default` (16 · 16) | `line-height/normal` 1.5 · 150 % | `font-weight/600` | Texto destacado dentro del texto de lectura (`**…**` en MDX, `<strong>`) y "En esta página" (D17) |
| body/small | `font-family/sans` | `font-size/body/small` (14 · 14) | `line-height/normal` 1.5 · 150 % | `font-weight/400` | Texto secundario, tablas |
| label/default | `font-family/sans` | `font-size/label/default` (14 · 14) | `line-height/snug` 1.4 · 140 % | `font-weight/500` | Sidebar, botones, etiquetas |
| caption/default | `font-family/sans` | `font-size/caption/default` (12 · 12) | `line-height/snug` 1.4 · 140 % | `font-weight/400` | Fechas de revisión, notas |
| code/default | `font-family/mono` | `font-size/code/default` (14 · 14) | `line-height/normal` 1.5 · 150 % | `font-weight/400` | Bloques y código en línea |
