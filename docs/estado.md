# DesignToken101: Estado

En qué punto está cada frente y qué sigue abierto. **Corto a propósito** (P21): se carga al empezar cada sesión de Claude Code. El detalle de lo hecho (pruebas, cifras, comprobaciones, hallazgos) va en `docs/historial.md`, que se lee bajo demanda. Las decisiones van en `docs/decisiones.md` (resumen) y `docs/decisiones-detalle.md` (texto completo).

**Cómo se actualiza:** al cerrar un bloque, cada sesión (1) añade el detalle con fecha a `historial.md`, (2) cambia aquí su apartado para que diga solo lo que sigue abierto y (3) pone una línea en "Última actualización" (solo la última; las anteriores, al historial).

Última actualización: 2026-10-07, sesión de contenido. Pasada de provisionales: todas cerradas; C19 cambia la alineación del número; V04 sustituida por la portada (P27); P25 añade el enlace del pie y la plantilla de issue.

---

## Plan general

| Paso | Frente | Qué | Estado |
|---|---|---|---|
| 1-4, 7, 8 | Todos | Bloque 0, especificación, repositorio, esqueleto, tokens a código, componentes y páginas | Hechos (2026-09-30 a 2026-10-03) |
| 5 | Diseño | Variables, componentes y plantillas en Figma | Hecho; al día con el código (D31 a D39) |
| 6 | Contenido | Módulos 1 a 10 en español | Módulos 0 a 10 aprobados (el 10, Conclusiones, el 2026-10-07, T20) |
| 9 | Contenido | Versión en inglés | Aplazada (P24): la web se lanza solo en español |
| 10 | Todos | Lanzamiento (P17, P18, P24) | Lista en "Para la primera versión" |

## Para la primera versión

Lo que falta para publicar (P17, P18, P24), por quién lo hace. Orden: 1, 2 y 4 en paralelo; 3 cuando diseño entregue; al final, el bloque de lanzamiento.

1. **Oscar:** la imagen isométrica del símbolo para la portada (P27, punto 3); comprobar si `designtoken101.com` (en singular, como el nombre del curso) está libre y, si lo está, comprarlo y redirigirlo a `designtokens101.com` (P26). Hecho: módulo 10, provisionales, V44, A11 (P25) y dominio (P26).
2. **Diseño, en Figma:** plantilla de la portada (P27) con los componentes y estilos existentes; número de `SidebarSection` alineado al inicio (C19); enlace a los issues en `SiteFooter` (P25), con el texto "¿Has encontrado un error? Avísalo en GitHub" (propuesta de contenido) y su fila en `componentes-v1.md` §4.8.
3. **Desarrollo, después de diseño:** C19 (`text-end` → `text-start` en el número); el enlace del pie a `https://github.com/ocarballido/design-tokens-101/issues` (P25); la portada en `/` sin la redirección de V04, con el texto en `messages/es.json`, metadatos y la imagen de Oscar (P27); build y `check:content`.
4. **Diseño y Oscar, en Figma:** el archivo de referencia (nombre de la copia, captura de las variables, texto de Community, versión, fecha y enlace en Read me, página de imágenes borrada, prueba con Starter y licencia); el diseño de partida, si entra en la primera versión.
5. **Bloque de lanzamiento:** publicar los archivos en Community; página "Archivos de Figma" y sus tres enlaces (contenido); build final, despliegue en Vercel con el dominio y prueba manual en Safari, Firefox y con lector de pantalla (desarrollo).

Fuera de la primera versión, salvo que Oscar decida otra cosa: el glosario y la página de errores frecuentes (T1; ninguna lección los promete), la herramienta de escalas (T8) y la versión en inglés (P24).

## Contenido

**Estado:** módulos 0 a 10 aprobados (P23, P24 y T20 reflejados; detalle en `historial.md`). `how-this-site-was-made` enlaza los issues (P25) desde el 2026-10-07: falta el build de desarrollo, que puede ir con el build final.

**Pendiente**
- **Glosario y página de errores frecuentes** (Recursos, T1). Candidatos ya reflejados en las lecciones: la exportación no conserva los alias (paso 7); opacidad en float32 (V31); renombrar o duplicar sin cambiar el code syntax (V33); interlineado leído como píxeles (D01); `font-family: Inter` frente a `next/font` (V13); `border` sin valor (V14); la negrita de un fragmento rompe el estilo de texto (D17); modo elegido en un componente principal (`apply-modes`).
- **Herramienta de escalas de color (T8)**, al final: requisitos en `historial.md` → Contenido → Pendiente.
- **Sin verificar, y por eso no se afirma en el contenido (P14):** si Figma exporta las variables Timing y Easing en DTCG y en qué unidad; qué `colorSpace` exporta una variable escrita en oklch; qué ve un archivo que usa la biblioteca cuando un semántico apunta a un primitivo oculto; cómo exporta Figma un alias dentro de una misma colección; si un estilo de texto creado desde un texto con variables las conserva.
- **Observación de desarrollo, sin decidir:** la tabla de `text-contrast` ("los más justos") no incluye `text/danger/default` sobre `background/danger/subtle` (5,75 en Light). `danger` no se usa todavía (S31).

**Pendiente de reflejar en el contenido**
- **P17 y P18 (bloque de lanzamiento):** página "Archivos de Figma" (solo en español, P24) y sus tres enlaces (Requisitos, ejercicio del módulo 1, ejercicio final).
- **S21 y D12 a D14:** el contraste de la tabla semántica y por estado (módulo 7). Comprobar que está todo reflejado al revisar el módulo.
- **V01:** para "Cómo se hizo esta web" (plugins de MDX con Turbopack; `proxy.ts` ya no existe desde V45).
- **V05 (si algún día se traduce, P24):** crear también `content/en/NN-seccion/meta.json`.

## Diseño

**Estado:** archivo TokensDS al día con el código (D31 a D39). Detalle en `historial.md` y `docs/entrega-diseno.md`.

**Pendiente**
- **Archivo de referencia (P16, D37, D38):**
  - Oscar: cambiar el nombre de la copia a "DesignToken101: Reference system" (la API no puede) y hacer la captura de la vista de variables con los modos.
  - Texto para Community (nombre, descripción, etiquetas): pendiente de la aprobación de Oscar.
  - Antes de publicar: versión, fecha y enlace en Read me (quitar el `Callout` `pending`); borrar la página de imágenes; prueba con una cuenta Starter; revisar la licencia.
  - Revisar (P14): el texto de ejemplo de `body/small` dice que, al importar, "si dos tokens acaban con el mismo nombre, solo importa el primero". Sin comprobar.
  - La referencia no se edita: un cambio se hace en TokensDS y se vuelve a duplicar al publicar (D38).
- **P24 en Figma: hecho (comprobado con la API de plugins el 2026-10-07, solo lectura).** Sin selector de idioma en ninguno de los dos archivos; descripción de `color/background/neutral/strong` y textos de Semantics (Light y Dark) corregidos. `Semantic color` reexportada, en el repositorio y generada (2026-10-07).
- **Descripciones de `neutral/hover` y `border/accent/strong`:** cambiadas en Figma, reexportadas y generadas (2026-10-07). Sin comprobar desde desarrollo: el texto de las tablas de Semantics (Light y Dark) en TokensDS y en la copia de referencia, que no sale en la exportación.
- **Diseño de partida (P16, P18):** cuando estén cerrados los módulos 9 y 10; incluye al menos un botón con estados dibujado con valores sueltos (T17).
- **V40:** implementada en código el 2026-10-07 (ancho mínimo `space/600`, número alineado al final). Anotar en `componentes-v1.md` §4.10 la columna de ancho mínimo y añadir la sección "10" a las plantillas.

## Desarrollo

**Estado:** la web funciona en Light, Dark y system, en móvil y escritorio, con los módulos 0 a 10 compilados y comprobados (último build: 2026-10-07, módulo 10 y V40). Detalle de cada comprobación en `historial.md`.

**Abierto tras P24 (V45)**
- **Oscar:** reiniciar `next dev` (el que estaba en marcha conserva las rutas con `[locale]` y da 404).

**Pendiente o sin verificar**
- Despliegue en Vercel (después de P17); `next/font/google` descarga las fuentes al compilar, sin probar en Vercel.
- Prueba manual, con lector de pantalla y en Safari y Firefox.
- `npm` bloquea el `postinstall` de `@swc/core` (dependencia de next-intl); el build funciona sin él.
- **Dominio `designtokens101.com` (P26):** configurarlo en Vercel en el despliegue.
