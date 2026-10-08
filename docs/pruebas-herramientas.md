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
| A1 | Abres la página | Color `#33CC99`, nombre `emerald`, tinte `0,5`, curva `green`. "Se usa el hex `#33CC99`". En el gráfico, "Tu color" en el paso 500, con la barra en el verde de tu color (C21, cuando desarrollo lo haga). Dos escalas, `emerald` y `neutral`, sin avisos. Pies: "Escala emerald, del paso 50 al 950: tu color está en el 500." y "Escala neutral, del paso 50 al 950: los grises de tu sistema." |
| A2 | Escribes `rgb(51 204 153)`, después `hsl(160 60% 50%)`, después `51 204 153`, después `#3c9` | Las cuatro veces, "Se usa el hex `#33CC99`" y la misma escala |
| A3 | Escribes `#33CC9` | La escala no cambia (sigue la última entrada válida). Sin error todavía: los errores salen al pulsar la descarga |
| A4 | Con `#33CC9`, pulsas "Descargar el archivo .tokens.json" | No descarga. Aparece "Falta algo para descargar" encima de los botones, con el foco en él y el enlace "Escribe un color válido". El campo muestra su error con el icono. El enlace lleva el foco al campo |
| A5 | Tinte `1,5` y nombre `Brand`; pulsas la descarga | Tres enlaces en el resumen (color, si sigue mal, nombre y tinte); cada campo con su error |
| A6 | Corriges todo y vuelves a pulsar | Descarga `Value.tokens.json`; el resumen de errores desaparece |
| A7 | Nombre `neutral` | Error de nombre (no puede llamarse como la escala de neutros). También `2brand`. `brand-blue` sí vale |
| A8 | Color `#808080` | Aviso: "Tu color no tiene croma…". "Tu color" en el paso 600. Neutros grises (`neutral/950` `#0A0A0A`) |
| A9 | Color `#1A2B5C` | Dos avisos: paso 950, un extremo de la curva, y recorte en los pasos 50 a 600. En la tabla, columna Recorte de 50 a 600 (−67 %, −71 %, −69 %, −70 %, −64 %, −53 %, −26 %) |
| A10 | Color `#0000FF` | Aviso de recorte en diez pasos (todos salvo el 800, que es el de tu color). "Tu color" en el 800 |
| A11 | Color `#FF6B00`, curva `green` y después `orange` | Con `orange`: "Tu color" en el 500, recorte en ocho pasos. Al cambiar de curva, el gráfico cambia y la escala también |
| A12 | `#33CC99` con curva `teal` | "Tu color" pasa al 400; `emerald/500` es `#31B98B`. La barra "Tu color" sigue con tu color |
| A13 | Tinte `0` | `neutral/950` `#0A0A0A` (gris puro). Con `0,25`, un gris entre los dos. Acepta coma y punto |
| A14 | Desmarcas los pasos 50 y 950 de `emerald` y descargas | El archivo no tiene `emerald/50` ni `emerald/950`; los nombres de los demás no cambian |
| A15 | Desmarcas los 22 pasos y descargas | Error "Marca al menos un paso para exportar"; el enlace lleva a la primera casilla |
| A16 | Con color `#FF6B00`, nombre `brand`, tinte `0,25` y curva `orange`, pulsas "Copiar el enlace con los ajustes" y lo abres en otra pestaña | El botón dice "Enlace copiado" unos segundos. La pestaña nueva abre con esos cuatro ajustes |
| A17 | Vista previa | Dos paneles, sobre blanco y sobre el `neutral/950` generado. No cambian al pasar la web a Dark |
| A18 | Abres `Value.tokens.json` en un editor | `color/<nombre>/<paso>` y `color/neutral/<paso>`, con `hex`, `com.figma.hiddenFromPublishing: true`, sin scopes ni code syntax (T25) |
| A19 | Sigues "Importar en Figma" con el archivo de A18, en un archivo de borrador | Pasos 1 a 4 tal como están en la página; también el paso 2 con una colección que ya tenga variables. Después, *Import mode* con otro archivo con los mismos pasos: actualiza los valores |

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
| C4 | VoiceOver | Cada campo dice su etiqueta, ayuda y error; cada casilla, "Exportar el paso 500 de emerald"; el gráfico, "500, croma 0,219, Tu color"; el resumen de errores se lee al aparecer |
| C5 | Colores forzados (Windows, Contraste alto) o, en Chrome, DevTools → Rendering → "Emulate CSS forced-colors" | Bordes, casillas, foco y botones visibles |
| C6 | Safari y Firefox | A1 a A6, A16, B1 a B6, B11 y B12. En Firefox y Safari, la subida de carpeta (B6) es la que más puede fallar |
