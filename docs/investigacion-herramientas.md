# Investigación de las herramientas: escalas de color y normalización

Sesión de contenido, 2026-10-08. Investigación previa (T4) de dos herramientas para un apartado "Herramientas" de la web: la de escalas de color (T8) y la de normalización de la exportación de Figma a DTCG (T21, decisión de Oscar del 2026-10-07). **Pendiente de aprobación de Oscar**: no se pasa al índice, al diseño ni al desarrollo sin ella.

Pregunta: qué hace falta saber para que las dos herramientas funcionen en el navegador, sean accesibles, den la misma salida que los scripts del repositorio (`tools/scales.py`, `tools/figma-to-dtcg.mjs`) y no afirmen nada que no se haya comprobado (P14). En cada apartado se separa **lo que dice la fuente**, **lo que se comprobó por prueba** y **la recomendación**.

Pruebas propias del 2026-10-08, fuera del repositorio (copias en un directorio temporal): Python 3.13.16, Node.js 22.22.0 (el proyecto usa Node.js 24), Chromium 141.0.7390.37 con Playwright 1.56.0, y la API de plugins de Figma sobre TokensDS a través del servidor MCP de Figma (lectura, y una colección temporal que se borró al terminar). En esta sesión no hay acceso al registro de npm, así que no se probó el build de Next.js ni ninguna librería de npm.

---

## 0. Resumen

- **Las dos herramientas pueden funcionar enteras en el navegador, sin servidor y sin dependencias nuevas.** Probado en Chromium 141: la normalización da los mismos 6 archivos que `npm run tokens`, byte a byte; los .zip se leen y se escriben con `DecompressionStream` y `CompressionStream` (formato `deflate-raw`), nativos en Chrome 103, Firefox 113 y Safari 16.4; las escalas dan los mismos hex que `scales.py` en 1.330.560 casos.
- **La exportación de Figma no usa los nombres de scope de la API.** En TokensDS, los pesos tienen el scope `FONT_WEIGHT` y los bordes `STROKE_COLOR`; la exportación escribe `FONT_STYLE` y `STROKE`. La lección `normalize-the-export` y `docs/paso-7-tokens.md` §1.2 dicen otra cosa (§6.2).
- **Con archivos sueltos, la herramienta no sabe a qué colección pertenece cada uno:** Primitives y Semantic size exportan los dos `Value.tokens.json` (§2).
- **El método de escalas da resultados pobres en tres casos medibles:** marcas sin croma (el tono no existe), marcas en los pasos extremos (la proporción de croma se dispara) y marcas que obligan a recortar el croma en muchos pasos. Con la curva de referencia del tono de la marca, el recorte baja mucho, pero DesignToken101 cambiaría de `green` a `emerald` si se eligiera sola (§5.2, §5.3).
- **Faltan dos pruebas que solo se pueden hacer en la interfaz de Figma**, con unos diez minutos de Oscar: qué lee la importación DTCG y cómo exporta Figma cada tipo y scope (§7).
- Las decisiones para Oscar, con la recomendación de cada una, están en §8.

---

## 1. Dónde viven las herramientas

### Lo que ya está decidido

- **T8:** la herramienta de escalas va en un apartado propio, "Herramientas" en el sidebar, junto a Recursos, y no dentro del módulo 2. El módulo 2 la enlaza desde `color-space` (paso "Generar las escalas"), `color-scales` (bloque del script) y el paso 3 del ejercicio.
- **C17:** Recursos y, más adelante, Herramientas van en el grupo "Referencia" del sidebar.
- **C19 y V40:** las secciones de referencia no llevan número. `src/lib/content.ts` lo resuelve con el prefijo de la carpeta: 90 o más, sin número (`REFERENCE_PREFIX = 90`). El código ya cita Herramientas en ese comentario, y `componentes-v1.md` también.
- **T13:** el ejercicio del módulo 6 "no instala nada"; el script de normalización va en un `InCode` opcional que pide Node.js.

### Recomendación

- Carpeta `content/es/98-tools/` (título "Herramientas"), en el grupo "Referencia" de `content/es/meta.json`, delante de `99-resources`. Sale sin número sin tocar el código.
- Dos páginas MDX, cada una con un componente interactivo de cliente: `/tools/color-scales` ("Escalas de color") y `/tools/normalize-export` ("Normalizar la exportación de Figma"). Cada página explica en dos párrafos qué hace la herramienta, enlaza a la lección que enseña el método y dice qué no hace.
- Enlaces desde las lecciones:

| Herramienta | Desde | Dónde |
|---|---|---|
| Escalas | `color-space` | "Cómo se crearon los colores…", paso 2, y el `Callout` de oklch.com |
| Escalas | `color-scales` | `InCode` "Generar tus escalas con tools/scales.py" |
| Escalas | `exercise-scales` | Paso 3 Color |
| Normalización | `normalize-the-export` | `InCode` "El script de normalización" |
| Normalización | `exercise-figma-to-code` | Paso 3, bloque de Node.js: la herramienta permite normalizar sin instalar nada, que es lo que pide T13 |

---

## 2. Subida de archivos accesible

### Lo que dicen las fuentes

- **WCAG 2.2, 2.5.7 Dragging Movements (AA):** toda funcionalidad que use un movimiento de arrastre tiene que poder hacerse con un solo puntero sin arrastrar, salvo que el arrastre sea esencial ([Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)). La página no habla de subir archivos; que un botón que abre el selector cuente como alternativa es una lectura nuestra, no del texto.
- **Carpeta entera con `<input type="file" webkitdirectory>`:** el usuario elige una carpeta y `files` trae toda su jerarquía; cada archivo lleva su ruta relativa en `webkitRelativePath`. MDN lo marca como Baseline 2025, disponible en las últimas versiones de todos los navegadores desde agosto de 2025; la especificación es el borrador del WICG *File and Directory Entries API* ([MDN: webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory), revisada el 2025-09-18). El input elige carpetas **en vez de** archivos.
- **Carpeta arrastrada:** `DataTransferItem.webkitGetAsEntry()` devuelve una entrada de directorio que se recorre con `readEntries()`; Chromium devuelve como máximo 100 entradas por llamada ([MDN: webkitGetAsEntry](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)).
- **`showDirectoryPicker()`:** experimental, solo en contextos seguros, sin soporte en Firefox ni en Safari ([MDN: showDirectoryPicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker)).
- **Versiones** según los datos de compatibilidad de MDN (repositorio `mdn/browser-compat-data`, commit `ef3eb09` del 2026-10-07):

| Función | Chrome | Edge | Firefox | Safari | Safari iOS | Chrome Android |
|---|---|---|---|---|---|---|
| `webkitdirectory` | 7 | 13 | 50 | 11.1 | 18.4 | 132 |
| `File.webkitRelativePath` | 13 | 13 | 50 | 11.1 | como Safari | como Chrome |
| `DataTransferItem.webkitGetAsEntry` | 13 | 14 | 50 | 11.1 | como Safari | como Chrome |
| `showDirectoryPicker` (experimental) | 86 | como Chrome | No | No | No | 132 |

- **Lo que entrega Figma:** al exportar todos los modos de una colección, "un ZIP por colección, con un archivo por modo llamado `{Modo}.tokens.json`" (`tokens/figma/README.md`, comprobado el 2026-10-03). La ayuda de Figma distingue *Export mode* (un modo, un JSON) de *Export modes* (todos los modos) ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)).

### Pruebas propias (Chromium 141, 2026-10-08)

1. **Carpeta:** `setInputFiles` de Playwright sobre un `<input webkitdirectory>` con `tokens/figma/` devuelve los 7 archivos con su ruta (`figma/primitives/Value.tokens.json`…), incluido `figma/README.md`. La herramienta tiene que filtrar por `*.tokens.json`. Playwright simula la elección; el diálogo del sistema no se probó.
2. **Normalizar desde la carpeta**, en el navegador, con la función pura de §6.4: los 6 archivos salen idénticos a `tokens/dtcg/` del repositorio.
3. **Leer .zip sin librerías:** cuatro .zip hechos con Python (`zipfile`, compresión deflate, método 8), uno por colección, leídos con un lector propio de 37 líneas (directorio central + `DecompressionStream('deflate-raw')`). Los 6 archivos normalizados salen idénticos al repositorio. **No se probó con un .zip real de Figma** (método de compresión, nombre del .zip y de los archivos de dentro): §7.
4. **El problema de los nombres:** Primitives y Semantic size tienen el mismo modo, `Value`, y exportan los dos `Value.tokens.json` (`tokens/figma/README.md`). El archivo no dice de qué colección es: en su raíz solo está `com.figma.modeName`. Con archivos sueltos, la herramienta no puede distinguirlos; con un .zip por colección o con una carpeta por colección, sí.

### Recomendación

- **Un botón que abre el selector** como vía principal (cumple 2.5.7 sin depender de la lectura de arriba) y una zona para soltar como atajo. Las dos llevan a la misma lista de archivos.
- **Aceptar lo que entrega Figma:** uno o varios .zip (uno por colección; la colección sale del nombre del .zip, a confirmar en §7) y, como alternativa, una carpeta con una subcarpeta por colección, como `tokens/figma/`. Con `webkitdirectory` hace falta un segundo input, porque el mismo input no elige archivos y carpetas a la vez.
- **Archivos sueltos:** solo si el usuario dice a qué colección pertenece cada uno; si dos archivos se llamarían igual en la salida, la herramienta lo dice y no continúa.
- No usar `showDirectoryPicker` (no hay soporte en Firefox ni en Safari).
- La lista de archivos cargados es texto, con un botón para quitar cada uno, y los cambios se anuncian con una región `role="status"` ([Understanding 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)).

---

## 3. Descarga de varios archivos

### Lo que dicen las fuentes

- `<a download>` está en Chrome 14, Firefox 20, Safari 10.1 y Safari iOS 13 (datos de compatibilidad de MDN, mismo commit).
- Chrome tiene un permiso de sitio, "Descargas automáticas", porque un sitio puede descargar varios archivos seguidos ([Ayuda de Chrome: permisos de sitio](https://support.google.com/chrome/answer/114662)). La página no dice cuándo pregunta; lanzar varias descargas con un solo clic puede quedar bloqueado por ese permiso.
- `CompressionStream` y `DecompressionStream` con el formato `deflate-raw` (el de los .zip): Chrome 103, Firefox 113, Safari 16.4 (datos de compatibilidad de MDN).
- Librerías de .zip, según Bundlephobia (consultado el 2026-10-08): **fflate 0.8.3**, 31.882 bytes minificado y 12.078 con gzip, sin dependencias; **JSZip 3.10.1**, 96.020 y 27.941, con 4 dependencias.

### Prueba propia (Chromium 141, 2026-10-08)

Un escritor de .zip propio (cabecera local, directorio central, CRC-32 y `CompressionStream('deflate-raw')`, dentro de las mismas 37 líneas del lector) genera `dtcg.zip` con los 6 archivos normalizados, que el navegador descarga con un clic. Python lo abre sin errores (`testzip()` sin fallos) y los 6 archivos coinciden con `tokens/dtcg/`.

### Opciones

| Opción | Qué añade | A favor | En contra |
|---|---|---|---|
| A. Un enlace por archivo | Nada | Cada descarga es un clic del usuario | Seis clics; hay que recrear las carpetas a mano |
| B. Un .zip con código propio | ~40 líneas en el repositorio, sin dependencia | Una descarga con las carpetas; probado | Código propio que mantener; solo métodos 0 y 8 |
| C. Un .zip con fflate | 12 kB con gzip, sin dependencias propias | Librería probada por muchos | Una dependencia más; sin probar en esta sesión (sin npm) |
| D. Un .zip con JSZip | 28 kB con gzip y 4 dependencias | Muy conocida | La más pesada |

### Recomendación

**B**, con un enlace por archivo debajo para quien prefiera A. El .zip reproduce la estructura `tokens/dtcg/<colección>/<Modo>.tokens.json` que espera el Resolver (V08). Si desarrollo prefiere no mantener el lector y el escritor, **C**.

---

## 4. La misma salida en la web y en los scripts

### Lo que dice la fuente

`node:test` es el ejecutor de pruebas de Node.js, estable desde Node.js 20, y se lanza con `node --test`; no necesita ninguna dependencia ([Node.js: Test runner](https://nodejs.org/api/test.html)).

### Recomendación

- **Una sola implementación por herramienta.** La web importa la misma función que usa el script: así la paridad no depende de dos copias.
  - Normalización: la función pura de §6.4, en `tools/figma-to-dtcg.mjs`.
  - Escalas: el script es Python y la web necesita JavaScript, así que aquí sí hay dos implementaciones. La prueba de §5.4 es la que garantiza que coinciden.
- **Pruebas con `node:test`** (un script `npm test`, sin dependencias):
  1. Normalización: `tokens/figma/` → función pura → igual, byte a byte, a `tokens/dtcg/`. Más casos sintéticos (cada combinación de tipo y scope, alias, opacidad en float32, conflicto de scopes, scope sin tipo) con su salida esperada.
  2. Escalas: `scales.py` escribe un archivo de casos (una lista de colores de marca, cada uno con sus 55 hex: acento, neutros y las tres escalas de estado) y la prueba compara la versión de JavaScript hex a hex. El archivo de casos se guarda en el repositorio, así que `npm test` no necesita Python; Python solo hace falta para regenerarlo si cambia el método.
- Lo que no cubren estas pruebas, y queda para la prueba manual de cada versión: la interfaz (subida, decisiones, descarga) en Chrome, Firefox y Safari.

---

## 5. Herramienta de escalas de color

### 5.1 Importación de variables en Figma

**Lo que dice la fuente** ([Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables), consultada el 2026-10-08; la página no tiene fecha):

- Admite archivos JSON en formato DTCG. Tipos: `color` (sRGB y HSL), `dimension` (solo `px`), `fontFamily` (un nombre, no una lista), `duration` (solo `s`), `number` (o Boolean con `com.figma.type: "boolean"`) y `string`, que la propia ayuda dice que no es un tipo DTCG.
- Crea variables solo para los tokens con un `$type` admitido, presentes en todos los archivos importados y con el mismo `$type` en todos.
- Los grupos se convierten en barras (`color.accent.light` → `color/accent/light`). Si dos tokens dan el mismo nombre, se importa el primero.
- Arrastrar uno o varios archivos a una colección nueva crea un modo por archivo. En una colección existente, "Import mode" sobre un modo actualiza las variables con el mismo nombre y tipo.
- De `$extensions`, solo documenta `com.figma.type` y `com.figma.aliasData`. **No dice si lee** `com.figma.scopes`, `com.figma.codeSyntax`, `com.figma.hiddenFromPublishing` ni `$description`.

**Lo que se comprobó:** nada en la interfaz (ver §7). Con la API de plugins (2026-10-08), Figma rechaza los nombres con `.`, `{`, `}` o un segmento que empieza por `$` ("invalid variable name"), y acepta espacios y tildes: los mismos caracteres que prohíbe DTCG ([Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/)).

**Recomendación:** hasta hacer la prueba de §7, la herramienta genera un archivo DTCG con los colores (objeto de color sRGB con `hex`) agrupados como en el curso (`color/<paleta>/<paso>`), y la página dice que el scope, la visibilidad y el code syntax se ponen en Figma a mano, como en `color-scales` (pasos 2 a 4 de "En Figma"). Si la prueba muestra que la importación los lee, se añaden al archivo.

### 5.2 Cuándo da el método escalas pobres

Prueba propia con `tools/scales.py` sin cambios (2026-10-08), sobre colores de marca representativos. "Recorte" es el porcentaje de croma que el ajuste a sRGB quita en un paso (el método conserva L y H y reduce C, `color-space`).

| Marca | oklch (L, C, H) | Paso ancla | Proporción de croma | Pasos recortados (máximo) |
|---|---|---|---|---|
| DesignToken101 `#33CC99` | 0,755 · 0,145 · 165,4 | 500 | 0,66 | Ninguno |
| Rojo puro `#FF0000` | 0,628 · 0,258 · 29,2 | 600 | 1,33 | 6 (68 %) |
| Naranja `#FF6B00` | 0,702 · 0,200 · 45,1 | 500 | 0,92 | 5 (50 %) |
| Amarillo `#FFD600` | 0,885 · 0,182 · 94,9 | 300 | 1,21 | 7 (45 %) |
| Azul puro `#0000FF` | 0,452 · 0,313 · 264,1 | 800 | 2,63 | 10 (85 %) |
| Violeta `#7C3AED` | 0,541 · 0,247 · 293,0 | 700 | 1,60 | 7 (72 %) |
| Azul marino `#1A2B5C` | 0,305 · 0,090 · 266,6 | 950 | 1,39 | 7 (71 %) |
| Verde azulado `#008080` | 0,543 · 0,093 · 194,8 | 700 | 0,60 | 2 (8 %) |
| Gris azulado `#607D8B` | 0,572 · 0,040 · 229,0 | 700 | 0,26 | Ninguno |
| Gris puro `#808080` | 0,600 · 0,000 · 89,9 | 600 | 0,00 | Ninguno |
| Casi negro `#111418` | 0,190 · 0,009 · 255,6 | 950 | 0,14 | Ninguno |
| Rosa pastel `#F8C8DC` | 0,880 · 0,060 · 351,5 | 300 | 0,40 | Ninguno |
| Crema `#F5F5DC` | 0,964 · 0,033 · 107,0 | 100 | 0,75 | 3 (7 %) |

Tres casos se pueden detectar sin inventar umbrales:

1. **Marca sin croma.** CSS Color 4 dice que en oklch el tono no tiene efecto (*powerless*) cuando el croma es menor o igual que 0,000004 (tabla de `oklch()` en el borrador del editor, `css-color-4/Overview.bs`, commit `f4bafda` del 2026-10-08; la versión publicada es un *Candidate Recommendation Draft* del 2026-10-07, [CSS Color 4](https://www.w3.org/TR/css-color-4/)). Con `#808080` el croma es 0,00000002 y el script toma un tono de 89,9 que no significa nada: los neutros salen con un tinte cálido (`#0C0A05` en el 950) que la marca no tiene. Con `#FFFFFF` pasa lo mismo, y el paso 50 del acento es el blanco puro.
2. **Marca en un paso extremo** (ancla en 50, 100, 900 o 950). La proporción de croma se calcula sobre el croma de la referencia en ese paso, que es pequeño (0,018 en el 50; 0,065 en el 950), así que los pasos centrales se alejan mucho de la marca. El azul marino da un `600` de `#517DFF`, un azul vivo; la crema da un `500` de `#B1AB00`, un amarillo intenso.
3. **Muchos pasos recortados.** Con marcas más intensas que la referencia (proporción mayor que 1), el ajuste a sRGB recorta el croma en casi toda la escala: el azul puro, en 10 de 11 pasos. El paso conserva L y H, pero la forma de la curva de croma ya no es la de la referencia.

Una rejilla de 60.480 colores HSL (tono de 3 en 3, saturación de 5 en 5, luminosidad de 4 a 96 de 4 en 4) da el orden de magnitud: el 34,3 % ancla en un paso extremo y el 43,2 % recorta algún paso. La rejilla es uniforme en HSL y no representa las marcas reales: estas cifras no van al contenido.

**Recomendación:** la herramienta no clasifica una escala como "buena" o "mala". Muestra los datos y avisa en los tres casos: (1) marca sin croma, con el umbral de CSS Color 4: no hay tono, y los neutros se generan sin tinte; (2) ancla en un paso extremo; (3) pasos recortados, marcados en la tabla con su porcentaje. Cada aviso explica la causa en una frase y enlaza a la lección.

### 5.3 La curva de referencia

**Lo que dice el curso hoy:** `color-scales` toma la curva de `green` "porque su tono (≈150) es cercano al de la marca (165,4)" y recomienda: "Si tu marca tiene otro tono, usa como referencia la curva de Tailwind CSS cuyo tono se parezca más al suyo". `scales.py` solo tiene la curva de `green`.

**Prueba propia** (curvas de `packages/tailwindcss/theme.css` de Tailwind CSS 4.3.3, etiqueta `v4.3.3`; la de `green` coincide con la de `scales.py`). Mismo método, solo cambia la curva:

| Marca | Con `green` | Con la curva de su tono |
|---|---|---|
| Rojo puro | 6 pasos recortados, hasta el 68 % | `red`: 7 pasos, hasta el 12 % |
| Amarillo | 7 pasos, hasta el 45 % | `yellow`: 10 pasos, hasta el 39 % (el 100); del 400 al 950, hasta el 16 % |
| Azul puro | 10 pasos, hasta el 85 % | `blue`: 9 pasos, hasta el 42 % |
| Azul marino | 7 pasos, hasta el 71 %; el `600` es `#517DFF` | `blue`: 4 pasos, hasta el 9 %; el `600` es `#3159FB` |

**Un efecto que hay que saber:** si la herramienta eligiera sola la curva con el tono más cercano, DesignToken101 (165,4) usaría `emerald` (tonos entre 162 y 173, `color-scales`), no `green`, y sus escalas cambiarían. Las curvas de Tailwind CSS cambian de tono a lo largo de los pasos (`yellow`, de 102,2 en el 50 a 53,8 en el 950); el método toma de ellas solo L y C, así que el tono de la marca no cambia.

**Recomendación:** en §8, decisión 8.

### 5.4 De `scales.py` a JavaScript

**Prueba propia (2026-10-08):** traducción línea a línea de `scales.py` (conversiones de Ottosson, ajuste de gama por búsqueda binaria de 40 iteraciones, contraste WCAG) comparada con el script sobre la rejilla de 60.480 colores de §5.2 con `TINT = 0.5`, y sobre las tres escalas de estado:

| Comparación | Hex distintos |
|---|---|
| Node.js 22.22.0, 1.330.560 hex (acento y neutros) | 0 |
| Chromium 141, los mismos 1.330.560 | 0 |
| Escalas de estado (33 hex) | 0 |
| Con `Math.round` en lugar del redondeo de Python | 382 |

Tres diferencias que hay que replicar, porque sin ellas los hex no coinciden:

1. **El redondeo.** `round()` de Python redondea al par cuando el número está justo en la mitad ([Python: round](https://docs.python.org/3/library/functions.html#round)); `Math.round` de JavaScript, hacia +∞ ([MDN: Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)). Con `Math.round`, 382 hex cambian.
2. **El resto con decimales.** El `%` de Python con un divisor positivo siempre da un resultado positivo; el de JavaScript conserva el signo. La primera traducción, con `((a % n) + n) % n`, dio 38 hex distintos en el paso de la marca; con `a % n` y sumando `n` solo si sale negativo, ninguno.
3. **La entrada.** `scales.py` recibe la marca en HSL y trabaja con el RGB que sale de esa conversión, sin redondear al hex. En 53.768 de los 60.480 colores de la rejilla, las escalas cambian si se parte del hex guardado en vez del HSL. En DesignToken101 no cambia nada: `#33CC99` da los mismos 22 hex con las dos entradas (probado).

**Recomendación:** que la entrada de `scales.py` y de la herramienta sea el **hex** (el valor que se guarda en Figma, S9, S30): si el usuario escribe RGB o HSL, se convierte a hex primero y se muestra. `scales.py` pasa a aceptar `ACCENT_HEX`. La salida de DesignToken101 no cambia.

### 5.5 Requisitos de T8 al día

| Requisito (`historial.md`) | Después de esta investigación |
|---|---|
| Entrada en hex, RGB u HSL; tinte de los neutros; escalas de estado | Igual, con el hex como entrada canónica (§5.4) |
| Salida visual con `ColorScale` y tabla de oklch, hex y contraste | Igual, más los pasos recortados y los avisos (§5.2). `ColorScale` lee hoy los hex de los tokens (C14): necesita aceptar los hex de la herramienta |
| Archivo DTCG importable en Figma | Sin los `$extensions` hasta la prueba de §7 (§5.1) |
| Todo en el navegador; prueba automática igual a `scales.py` | Probado que es posible (§5.4); prueba con `node:test` (§4) |
| Avisar de las escalas pobres | Tres avisos medibles (§5.2) |

---

## 6. Herramienta de normalización

### 6.1 Lo que puede exportar Figma

**Tipos de variable.** La API REST de Figma tiene cuatro: `BOOLEAN`, `FLOAT`, `STRING` y `COLOR` ([Figma REST API: Variables](https://developers.figma.com/docs/rest-api/variables-types/)). La ayuda nombra además las variables de *timing* y *easing* de Figma Motion, que se aplican a la duración, el retardo y la curva de las animaciones ([Figma: Apply variables to designs](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs)). Cómo se exportan las de Motion no está comprobado (ya figura como pendiente en `estado.md`).

**Scopes.** La API de plugins y la API REST documentan estos ([Plugin API: VariableScope](https://developers.figma.com/docs/plugins/api/VariableScope/), [REST API](https://developers.figma.com/docs/rest-api/variables-types/)). La columna "API de plugins" es una prueba propia (2026-10-08): poner cada scope en una variable de cada tipo en una colección temporal de TokensDS, borrada después.

| Tipo | Scopes que acepta la API de plugins | Rechazados |
|---|---|---|
| `FLOAT` | `ALL_SCOPES`, `TEXT_CONTENT`, `CORNER_RADIUS`, `WIDTH_HEIGHT`, `GAP`, `STROKE_FLOAT`, `EFFECT_FLOAT`, `OPACITY`, `COLOR_OPACITY`, `FONT_WEIGHT`, `FONT_SIZE`, `LINE_HEIGHT`, `LETTER_SPACING`, `PARAGRAPH_SPACING`, `PARAGRAPH_INDENT` | `FONT_STYLE`, `FONT_FAMILY` |
| `STRING` | `ALL_SCOPES`, `TEXT_CONTENT`, `FONT_FAMILY`, `FONT_STYLE` | `FONT_WEIGHT`; `FONT_VARIATIONS` (está en la API REST, pero la de plugins no lo reconoce) |
| `COLOR` | `ALL_SCOPES`, `ALL_FILLS`, `FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE_COLOR`, `EFFECT_COLOR` | `STROKE` |
| `BOOLEAN` | Solo `ALL_SCOPES`, que es el valor por defecto | `TEXT_CONTENT` |

Una variable nueva tiene `ALL_SCOPES` en los cuatro tipos (prueba). La API de plugins dice que con `ALL_SCOPES` no se puede poner ningún otro scope.

### 6.2 Hallazgo: la exportación no escribe los nombres de la API

Prueba propia (2026-10-08): lectura de las 143 variables de TokensDS con la API de plugins, comparada con `tokens/figma/`.

| En la API de plugins | En la exportación DTCG | Variables |
|---|---|---|
| `FLOAT` con `FONT_WEIGHT` | `number` con `FONT_STYLE` | 4 (`font-weight/*`) |
| `COLOR` con `STROKE_COLOR` | `color` con `STROKE` | 9 (18 en la exportación: Light y Dark) |
| `COLOR` sin scopes (`[]`) | Sin la clave `com.figma.scopes` | 57 |
| `GAP`, `CORNER_RADIUS`, `STROKE_FLOAT`, `FONT_SIZE`, `WIDTH_HEIGHT`, `FONT_FAMILY`, `FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL` | Igual | Todas |

Consecuencias:

- **El vocabulario que lee la normalización es el de la exportación, no el de la API.** Para los 12 scopes que DesignToken101 no usa, no se sabe cómo los escribe la exportación: puede haber más cambios de nombre. Se resuelve con la prueba de §7.
- **En la exportación, `FONT_STYLE` sale en dos tipos distintos:** `number` (el peso, `FONT_WEIGHT` en la API) y, previsiblemente, `string` (el estilo, como "Semi Bold", `FONT_STYLE` en la API). El `$type` los distingue.
- **Dos textos del repositorio dicen otra cosa.** `normalize-the-export` (lección aprobada): "Los pesos llevan el scope `FONT_STYLE` en la exportación de DesignToken101. La API de plugins tiene además un scope `FONT_WEIGHT`. Nuestra exportación no lo usa". Las variables sí lo usan; es la exportación la que lo escribe como `FONT_STYLE`. `docs/paso-7-tokens.md` §1.2: "El scope que usa Figma para el peso es `FONT_STYLE`". La primera frase de la lección es cierta; la segunda y la tercera inducen a error. Propuesta en §8, decisión 11.

### 6.3 Tipo DTCG para cada combinación

DTCG 2025.10 define `color`, `dimension` (`px` o `rem`), `fontFamily`, `fontWeight` (número de 1 a 1000 o una palabra de su lista), `duration` (`ms` o `s`), `cubicBezier`, `number` y los compuestos; no hay `boolean` ni `string`. Las herramientas no pueden deducir el tipo por el valor ([Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/)).

En la tabla, **Hoy** es lo que hace `tools/figma-to-dtcg.mjs`; **Decisión del usuario** quiere decir que ni una fuente ni una prueba dicen qué tipo corresponde, y la herramienta no lo elige.

| `$type` exportado | Scope (nombre de la API) | Tipo DTCG | Base | Estado |
|---|---|---|---|---|
| `color` | Cualquiera, o ninguno | `color` | El color ya es DTCG (`paso-7-tokens.md` §1.3) | Hoy |
| `number` | `GAP`, `CORNER_RADIUS`, `STROKE_FLOAT`, `FONT_SIZE`, `WIDTH_HEIGHT` | `dimension` en `px` | Figma importa `dimension` solo en `px`; Figma guarda los tamaños en píxeles (lección) | Hoy |
| `number` | `FONT_WEIGHT` (exportado `FONT_STYLE`) | `fontWeight` | Mismo número de 1 a 1000 | Hoy |
| `string` | `FONT_FAMILY` | `fontFamily` | Un nombre, como admite DTCG | Hoy |
| `number` | `EFFECT_FLOAT`, `PARAGRAPH_SPACING`, `PARAGRAPH_INDENT` | Previsiblemente `dimension` en `px` | La ayuda no da la unidad; `EFFECT_FLOAT` mezcla desenfoque, extensión y desplazamiento | Decisión del usuario |
| `number` | `LINE_HEIGHT` | `dimension` en `px` o `number` (multiplicador) | Figma lee la variable como píxeles (D01); en CSS, el interlineado sin unidad es un multiplicador | Decisión del usuario |
| `number` | `LETTER_SPACING` | `dimension` en `px` | La ayuda no da la unidad | Decisión del usuario |
| `number` | `OPACITY`, `COLOR_OPACITY` | `number` | DTCG no tiene tipo de opacidad; la escala (0 a 1 o 0 a 100) no está documentada | Decisión del usuario |
| `number` | `TEXT_CONTENT` | `number` | Un número que se muestra como texto | Decisión del usuario |
| `string` | `FONT_STYLE` | Ninguno claro | "Semi Bold Italic" mezcla peso y estilo; las palabras de `fontWeight` (`semi-bold`) no son las de Figma | Decisión del usuario |
| `string` | `TEXT_CONTENT` | Ninguno (no hay `string` en DTCG) | | Decisión del usuario |
| Boolean (cómo se exporta: §7) | `ALL_SCOPES` | Ninguno (no hay `boolean` en DTCG) | La importación de Figma lo lee como `number` con `com.figma.type: "boolean"` | Decisión del usuario |
| `number` o `string` | Ninguno o `ALL_SCOPES` | Ninguno | Sin decisión de diseño de la que deducirlo (lección `normalize-the-export`) | Decisión del usuario |
| `number` | Dos scopes de tipos distintos (por ejemplo `FONT_WEIGHT` y `GAP`) | Ninguno | Hoy gana `fontWeight` por el orden del código, no por una regla | Decisión del usuario |
| Timing y easing (Motion) | | `duration` y `cubicBezier`, si se exportan así | Sin comprobar | Pendiente de §7 |

Para la herramienta, "Decisión del usuario" ofrece solo las opciones posibles para ese tipo: para `number`, `dimension` (`px`), `number`, `fontWeight`, `duration` (`s` o `ms`) o "no incluir"; para `string`, `fontFamily` o "no incluir"; para Boolean, `number` (0 y 1) o "no incluir".

### 6.4 Cómo pedir la decisión

**Recomendación para la web:**

- Las decisiones se piden **por combinación** de `$type` y scopes, no por token: "12 variables de número con el scope `LINE_HEIGHT`", con tres nombres de ejemplo y la lista completa desplegable.
- Cada combinación es un grupo (`fieldset` con `legend`) con un `select` nativo con su `label`. **Sin opción elegida por defecto:** la primera opción es "Elige un tipo".
- El botón de descarga está activo desde el principio; si falta una decisión, al pulsarlo aparece un resumen de errores con un enlace a cada grupo y el foco va al resumen ([Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)). Un botón desactivado no explica por qué no funciona.
- Junto a la descarga, el bloque `SCOPE_TYPES` con las decisiones tomadas, listo para copiar en el script, y un enlace para descargar el script con ese bloque ya escrito. Así la web y el repositorio del alumno dan la misma salida.

**Recomendación para el script:** en vez de detenerse en el primer token desconocido, lista **todas** las combinaciones sin tipo, con el número de tokens y un ejemplo de cada una, y dice qué línea añadir al mapa. Sigue sin escribir nada si falta una decisión. Cambia el texto del error que cita `normalize-the-export` (decisión 7 de §8).

### 6.5 La función pura sin cambiar la salida

**Prueba propia (2026-10-08):** un prototipo de `tools/figma-to-dtcg.mjs` con tres partes en el mismo archivo:

1. **El mapa editable al principio**, `SCOPE_TYPES`: para cada `$type` exportado, qué scope da qué tipo DTCG. Con los de hoy: `FONT_STYLE` → `fontWeight` y los cinco de tamaño → `dimension` para `number`; `FONT_FAMILY` → `fontFamily` para `string`.
2. **`normalize(files, { map })`**, pura: recibe una lista de `{ path, text }` y devuelve los archivos normalizados, el recuento y la lista de tokens sin tipo. No usa el sistema de archivos, la red ni estado global.
3. **La parte de línea de comandos**, que solo se ejecuta con `node tools/figma-to-dtcg.mjs`: comprueba si el archivo es el que lanzó Node (`import.meta.url` frente a `process.argv[1]`) e importa `node:fs` y `node:path` dentro de ese bloque.

| Comprobación | Resultado |
|---|---|
| `node tools/figma-to-dtcg.mjs` sobre una copia de `tokens/` (Node.js 22.22.0) | Mismo resumen y los 6 archivos idénticos, byte a byte, a `tokens/dtcg/` |
| `normalize()` en Chromium 141, desde la carpeta y desde los .zip | Los 6 archivos idénticos |
| Importar el módulo desde otro archivo | No ejecuta la parte de línea de comandos; exporta `SCOPE_TYPES`, `normalize` y `summary` |
| 400 exportaciones sintéticas (tipos `number`, `string`, `color` y `boolean`; 14 scopes al azar; alias; opacidades) por el script actual y por el prototipo | 400 iguales: 111 con la misma salida y 289 con el mismo error |

Dos diferencias de comportamiento, solo cuando hay error:

- **Escritura a medias.** El script actual borra `tokens/dtcg/` y escribe archivo por archivo, así que si se detiene en el tercero deja dos escritos. El prototipo comprueba todo antes de borrar y escribir.
- **El orden.** El prototipo ordena los archivos por ruta; el actual los recorre en el orden de `readdirSync`. La salida no cambia; con varios errores, podría cambiar cuál se informa primero (con la recomendación de §6.4 se informan todos).

**Sin comprobar:** que Next.js (Turbopack) empaquete para el navegador un módulo con `await import('node:fs')` dentro de un `if`. En esta sesión no hay npm ni build. Si no lo empaqueta, la alternativa es separar la función pura en otro archivo (`tools/normalize-figma.mjs`) que importa el script; la descarga para el alumno sería entonces de dos archivos, o uno generado al publicar.

### 6.6 Otras comprobaciones que la normalización no hace hoy

- **Referencias sin destino.** Si un alias apunta a una colección que el usuario no subió (`targetVariableSetName`), la referencia `{…}` no tiene destino y fallará en la herramienta de traducción. **Recomendación:** comprobar que cada referencia tiene destino entre los archivos subidos y, si no, listarlas antes de descargar.
- **Alias dentro de la misma colección:** cómo los exporta Figma sigue sin comprobar (`paso-7-tokens.md` §1.4, `estado.md`). La ayuda de Figma, para la importación, usa la forma DTCG (`"$value": "{red}"`). Entra en la prueba de §7.
- **Nombres:** Figma ya no deja crear los caracteres que DTCG prohíbe (§5.1), así que la conversión de `/` a `.` no puede romper una referencia.

---

## 7. Pruebas pendientes en la interfaz de Figma

La exportación y la importación DTCG solo existen en la interfaz de Figma; la API de plugins y el servidor MCP no las tienen. Las dos pruebas necesitan a Oscar unos diez minutos, en un archivo de borrador nuevo (no en TokensDS):

1. **Exportación.** La sesión crea, con la API de plugins, una colección temporal con dos modos y una variable por cada tipo y scope de §6.1, más un alias dentro de la colección, una variable oculta, code syntax en Web, Android e iOS, una descripción, un Boolean y, si el plan lo permite, una variable de timing y otra de easing. Oscar hace *Export modes* y sube el .zip a la conversación. Se anota: nombre del .zip y de los archivos, método de compresión, `$type` y `$extensions` de cada variable y cómo escribe cada scope.
2. **Importación.** La sesión prepara un archivo de escalas DTCG con `com.figma.scopes`, `com.figma.codeSyntax`, `com.figma.hiddenFromPublishing` y `$description`. Oscar lo arrastra a una colección nueva y, después, lo importa con "Import mode" sobre esa colección con un valor cambiado. La sesión lee con la API qué variables se crearon, con qué nombre de modo, y si conservan o pierden scope, code syntax, visibilidad y descripción en las dos importaciones.

Al terminar, la sesión borra el archivo de prueba o pide a Oscar que lo borre, y anota el resultado con fecha en `historial.md`.

---

## 8. Decisiones para Oscar

1. **Dónde van.** Carpeta `98-tools` ("Herramientas"), en el grupo "Referencia", antes de Recursos y sin número; páginas `/tools/color-scales` y `/tools/normalize-export`, enlazadas desde las lecciones de §1. *Recomendación: sí.*
2. **Qué sube el alumno a la normalización.** Opciones: (a) los .zip que da Figma y una carpeta con una subcarpeta por colección; (b) además, JSON sueltos indicando la colección de cada uno; (c) solo JSON sueltos. *Recomendación: a*: es lo que entrega *Export modes* y evita el choque de `Value.tokens.json` (§2). (b) se puede añadir después.
3. **Cómo descarga.** *Recomendación: B de §3*, un .zip con código propio y sin dependencias, y un enlace por archivo debajo; si desarrollo prefiere no mantener ese código, fflate.
4. **Tipos sin correspondencia clara.** *Recomendación:* las combinaciones marcadas "Decisión del usuario" en §6.3 no se resuelven solas nunca, ni con un tipo por defecto; la web las pide por combinación (§6.4) y el script descargable lleva el mapa con esas decisiones.
5. **Conflicto de scopes** (un número con `FONT_WEIGHT` y `GAP`). Hoy gana `fontWeight` por el orden del código. *Recomendación:* que sea decisión del usuario. No cambia la salida de DesignToken101, que no tiene ninguno.
6. **Un archivo o dos.** *Recomendación:* un solo `tools/figma-to-dtcg.mjs` con el mapa, la función pura y la línea de comandos, si el build de Next.js lo admite (lo comprueba desarrollo, §6.5); si no, la función en `tools/normalize-figma.mjs`.
7. **El error lista todo lo que falta** en vez del primer token. Cambia el mensaje que cita `normalize-the-export` (apartado "Detenerse antes que adivinar"): la lección se actualiza en el mismo bloque. *Recomendación: sí.*
8. **La curva de referencia de las escalas.** Opciones: (a) solo `green`, como hoy, y la lección deja de recomendar otra curva o explica que el script no lo hace; (b) el usuario elige la curva entre las de Tailwind CSS 4.3.3, con `green` por defecto, y la herramienta muestra cuántos pasos recorta cada una; (c) la herramienta elige la del tono más cercano. *Recomendación: b*: cumple lo que ya dice la lección, deja DesignToken101 igual (con c pasaría a `emerald`) y reduce mucho el recorte en marcas lejos del verde (§5.3). Implica añadir las curvas a `scales.py` con un parámetro, comprobadas contra `theme.css` 4.3.3.
9. **Entrada en hex.** `scales.py` y la herramienta parten del hex (RGB y HSL se convierten a hex primero). *Recomendación: sí*: es el valor que se guarda (S9, S30) y DesignToken101 no cambia (§5.4).
10. **Avisos de escalas pobres.** Los tres de §5.2: sin croma (umbral de CSS Color 4; neutros sin tinte), ancla en un paso extremo y pasos recortados, sin umbrales propios. *Recomendación: sí.*
11. **Corrección del hallazgo de §6.2** en `normalize-the-export` (los pesos tienen `FONT_WEIGHT` en Figma y la exportación lo escribe `FONT_STYLE`; los bordes, `STROKE_COLOR` y `STROKE`) y en `docs/paso-7-tokens.md` §1.2. *Recomendación: sí*, ahora: la lección está publicada y lo afirma con otra explicación. Propuesta de texto en un bloque aparte, para que Oscar la apruebe.
12. **Las pruebas de §7**, antes del índice y del diseño de las herramientas. *Recomendación: sí*: deciden qué lleva el archivo de escalas y el mapa de scopes.
13. **Pruebas automáticas** con `node:test` y `npm test` (§4), con el archivo de casos de las escalas generado por `scales.py` y guardado en el repositorio. *Recomendación: sí.*
14. **Referencias sin destino** (§6.6): la herramienta y el script las listan antes de escribir. *Recomendación: sí*, como aviso en la web y como error en el script.

Fuera de estas herramientas, como pidió Oscar: la conversión a CSS con Terrazzo y cualquier paquete de npm.

---

## 9. Fuentes

- [Figma: Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables) (importación y exportación DTCG)
- [Figma: Apply variables to designs](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs)
- [Figma Plugin API: VariableScope](https://developers.figma.com/docs/plugins/api/VariableScope/)
- [Figma REST API: Variables types](https://developers.figma.com/docs/rest-api/variables-types/)
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/)
- [Design Tokens Color Module 2025.10](https://www.designtokens.org/tr/2025.10/color/)
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) y su borrador del editor ([w3c/csswg-drafts, `css-color-4/Overview.bs`](https://github.com/w3c/csswg-drafts/blob/main/css-color-4/Overview.bs))
- [WCAG 2.2: Understanding 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- [WCAG 2.2: Understanding 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)
- [WCAG 2.2: Understanding 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [WCAG 2.2: Understanding 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- [MDN: HTMLInputElement.webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)
- [MDN: DataTransferItem.webkitGetAsEntry()](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)
- [MDN: Window.showDirectoryPicker()](https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker)
- [MDN: Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
- [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) (commit `ef3eb09`, 2026-10-07): `webkitdirectory`, `webkitRelativePath`, `webkitGetAsEntry`, `showDirectoryPicker`, `<a download>`, `CompressionStream` y `DecompressionStream`
- [Ayuda de Chrome: permisos de sitio](https://support.google.com/chrome/answer/114662)
- [Node.js: Test runner](https://nodejs.org/api/test.html)
- [Python: round()](https://docs.python.org/3/library/functions.html#round)
- [Tailwind CSS 4.3.3: theme.css](https://github.com/tailwindlabs/tailwindcss/blob/v4.3.3/packages/tailwindcss/theme.css)
- [Bundlephobia: fflate](https://bundlephobia.com/package/fflate) y [JSZip](https://bundlephobia.com/package/jszip) (consultado el 2026-10-08)
- Björn Ottosson, [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/) (conversiones de `scales.py`)
