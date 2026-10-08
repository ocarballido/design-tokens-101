# DesignToken101: Guion de pruebas de las herramientas

Pruebas manuales de "Generar escalas" (`/tools/color-scales`) y "Normalizar la exportación" (`/tools/normalize-export`) en la web publicada. Los resultados esperados salen de `tools/scales.mjs` y `tools/figma-to-dtcg.mjs` (calculados el 2026-10-08). Los archivos de prueba están en `tests/manual/`, y el export real de Figma en `tests/fixtures/figma-export-prueba.zip`.

Cómo apuntar: el número de la prueba y "bien" o lo que ha pasado. Una captura cuando algo falle.

## 0. Antes de empezar

- Navegadores: Chrome, Safari y Firefox, en escritorio. Un móvil (Safari en iOS o Chrome en Android).
- Para la parte de accesibilidad: VoiceOver (⌘F5 en Mac) y el teclado sin ratón.
- Abre cada herramienta en una pestaña nueva y sin parámetros en la URL.

## A. Generar escalas

| # | Qué haces | Qué debe pasar |
|---|---|---|
| A1 | Abres la página | Color `#33CC99`, nombre `emerald` y curva `emerald` (propuestos por el tono, C25 y C26), tinte `0,5` en el deslizador. Resultado ya generado, con la línea "Escalas de #33CC99 · tinte 0,5 · curva emerald". "Tu color" en el paso 400, con la barra en tu color. Sin avisos. Pies: "…tu color está en el 400." y "…los grises de tu sistema." |
| A2 | Escribes `rgb(51 204 153)`, después `hsl(160 60% 50%)`, después `51 204 153`, después `#3c9` | Las cuatro veces, "Se usa el hex `#33CC99`". El resultado no cambia hasta pulsar "Generar escalas" (C24) |
| A3 | Escribes `#1877F2` | Nombre y curva pasan a `blue` solos. Pulsas "Generar escalas": el foco va a "Resultado" (en el móvil, la página baja hasta él); "Tu color" en el 500; una nota (no un aviso) de recorte en los pasos 300, 400, 600, 700 y 800 |
| A4 | Escribes `#33CC9` y pasas al campo siguiente con Tab | Al salir del campo aparece su error (C22); mientras escribes por primera vez, no |
| A5 | Con `#33CC9`, pulsas "Generar escalas" | "Revisa los campos para generar las escalas" encima del botón, con el foco en él y el enlace al campo del color. **No hay resultado** (C24) |
| A6 | Corriges el color y vuelves a pulsar | El resumen de errores desaparece y vuelve el resultado |
| A7 | Escribes tú un nombre, `brand-blue`, y después cambias el color a `#F40009` | El nombre se queda en `brand-blue` (ya no lo propone la herramienta); la curva pasa a `red`. Con `neutral`, `Brand` o `2brand`, error de nombre |
| A8 | Eliges tú la curva `green` y cambias el color | La curva se queda en `green` |
| A9 | Tinte: arrastras el deslizador, haces clic en un punto de la pista y usas las flechas del teclado | Las tres cosas cambian el valor, de 0,05 en 0,05, sin salir de 0 a 1; el valor se ve al lado ("0,25"). Con `0` y "Generar escalas", `neutral/950` `#0A0A0A` |
| A10 | Color `#808080` y generar | Aviso "Tu color no tiene croma…"; nombre `gray`, curva `green`; "Tu color" en el 600 |
| A11 | Color `#1A2B5C` y generar | Curva `blue`. Aviso de paso extremo (950) y nota de recorte en 200, 300, 400 y 500 (−3 %, −9 %, −7 %, −5 %) |
| A12 | Color `#FF6B00` y generar | Curva `orange`, "Tu color" en el 500, nota de recorte en ocho pasos. Cambias a la curva `green`: la gráfica cambia al momento; la escala, al generar |
| A12b | Generas; después cambias el color (o el tinte, o la curva) sin pulsar el botón | Las muestras de las escalas y de la vista previa se atenúan; el texto no. Debajo de "Resultado", "Has cambiado los ajustes…" (VoiceOver lo anuncia). Descargar da "Genera las escalas con los ajustes nuevos antes de descargar", con enlace al botón. Si vuelves al valor generado, todo vuelve a la normalidad |
| A12c | Cambias solo el nombre | No se atenúa nada: el título de la escala, el pie y la tabla cambian al momento, y el archivo descargado usa el nombre nuevo |
| A13 | Desmarcas los pasos 50 y 950 de la primera escala y descargas | El archivo no tiene esos dos pasos; los nombres de los demás no cambian |
| A14 | Desmarcas los 22 pasos y descargas | "Falta algo para descargar" con "Marca al menos un paso para exportar"; el enlace lleva a la primera casilla |
| A15 | Con `#FF6B00`, nombre `brand`, tinte `0,25` y curva `orange`, generas y pulsas "Copiar el enlace con los ajustes"; lo abres en otra pestaña | "Enlace copiado" unos segundos. La pestaña nueva abre con esos ajustes y el resultado ya generado. Un enlace con solo el color (`?color=1877F2`) propone nombre y curva |
| A16 | Vista previa | Dos paneles, sobre blanco y sobre el `neutral/950` generado. No cambian al pasar la web a Dark |
| A17 | Abres `Value.tokens.json` en un editor | `color/<nombre>/<paso>` y `color/neutral/<paso>`, con `hex`, `com.figma.hiddenFromPublishing: true`, sin scopes ni code syntax (T25) |
| A18 | Sigues "Importar en Figma" con el archivo de A17, en un archivo de borrador | Pasos 1 a 4 tal como están en la página; también el paso 2 con una colección que ya tenga variables. Después, *Import mode* con otro archivo con los mismos pasos: actualiza los valores |

## B. Normalizar la exportación

| # | Qué haces | Qué debe pasar |
|---|---|---|
| B1 | "Elegir archivos .zip" y eliges `Primitives.zip`, `Semantic_color.zip`, `Semantic_size.zip` y `Layout.zip` | Cuatro filas: "Primitives · 1 archivo", "Semantic_color · 2 archivos", "Semantic_size · 1 archivo", "Layout · 2 archivos". Con VoiceOver, se anuncia lo que se ha añadido |
| B2 | Resumen | 6 archivos, 82 alias, 123 `color`, 56 `dimension`, 4 `fontWeight`, 2 `fontFamily`, 2 opacidades con el decimal de Figma. Sin decisiones ni avisos |
| B3 | "Descargar dtcg.zip" y lo abres | Carpetas `Layout`, `Primitives`, `Semantic_color` y `Semantic_size`, con los mismos nombres de archivo. Los enlaces por archivo descargan cada uno |
| B4 | Quitas `Layout.zip` con su botón | Desaparece; el foco pasa al botón de quitar siguiente; se anuncia "Quitado Layout.zip". Resumen: 4 archivos |
| B5 | Recargas y subes solo `Semantic_color.zip` | Aviso de referencias sin destino: 62 referencias (las de Light y las de Dark), por ejemplo `color.background.neutral.default` → `{color.neutral.950}` (`Semantic_color/Dark.tokens.json`). Añade `Primitives.zip` y el aviso desaparece |
| B6 | Recargas y descomprimes `carpeta-designtoken101.zip`; "Elegir una carpeta" y eliges `designtoken101` | Cuatro filas, una por subcarpeta, y el mismo resumen que B2 |
| B7 | Arrastras los cuatro .zip a la zona; después, la carpeta | La zona cambia de borde mientras arrastras; el resultado es el de B1 y el de B6 |
| B8 | Subes `Primitives.zip` dos veces | La segunda fila, con el error "Ya hay una colección con el nombre Primitives". Al descargar, el resumen de errores enlaza a su botón de quitar |
| B9 | Subes `no-es-un-zip.zip`, `Sin_tokens.zip` y `JSON_roto.zip` | Cada uno con su error: "No es un archivo .zip.", "No tiene ningún archivo .tokens.json." y "Value.tokens.json no es un JSON válido." |
| B10 | Descargas sin haber subido nada | "Sube al menos un archivo de Figma", con enlace al primer botón |
| B11 | Recargas y subes `figma-export-prueba.zip` (el de tu prueba 1) | 16 decisiones, una por combinación, cada una de 1 variable salvo `OPACITY` (2: `number/opacity` y `number/opacity-ninety`). Ninguna con tipo elegido |
| B12 | Pulsas la descarga sin decidir | Resumen de errores con 16 enlaces; cada uno lleva a su `select` |
| B13 | Eliges "No exportar" en las 16 y descargas | Descarga. Resumen: 2 archivos, 4 alias, 18 `color`, 14 `dimension`, 2 `fontWeight`, 2 `fontFamily` y 34 tokens no exportados (17 variables en dos modos) |
| B14 | "Descargar figma-to-dtcg.mjs" después de B13 | En `SCOPE_TYPES`, tus 16 decisiones como `'exclude'`. El bloque de código de la página muestra lo mismo |
| B15 | Ejecutas el script descargado con Node.js, con la exportación en `tokens/figma/` | Mismo resultado que la web, en `tokens/dtcg/` |

## C. En las dos

| # | Qué haces | Qué debe pasar |
|---|---|---|
| C1 | Light, Dark y system | Todo legible; los paneles de la vista previa no cambian (D48) |
| C2 | Ventana de 320 px de ancho (o móvil) | Sin scroll horizontal de la página; las tablas tienen su propio scroll; `ScalePreview` apilado |
| C3 | Solo teclado | Todo se alcanza con Tab en orden lógico, con el anillo de foco visible; casillas con la barra espaciadora; los `select` con las flechas |
| C4 | VoiceOver | Cada campo dice su etiqueta, ayuda y error; cada casilla, "Exportar el paso 500 de emerald"; el gráfico, cada paso con su croma y "Tu color" en el de tu color; el deslizador, su valor; el resumen de errores se lee al aparecer |
| C5 | Colores forzados (Windows, Contraste alto) o, en Chrome, DevTools → Rendering → "Emulate CSS forced-colors" | Bordes, casillas, foco y botones visibles |
| C6 | Safari y Firefox | A1 a A9 (en A9, que el clic en la pista mueva el pulgar), A15, B1 a B6, B11 y B12. En Firefox y Safari, la subida de carpeta (B6) es la que más puede fallar |
