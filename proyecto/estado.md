# DesignToken101: Estado

En qué punto está cada frente y qué sigue abierto. **Corto a propósito** (P21): se carga al empezar cada sesión de Claude Code. El detalle de lo hecho (pruebas, cifras, comprobaciones, hallazgos) va en `proyecto/historial.md`, que se lee bajo demanda. Las decisiones van en `proyecto/decisiones.md` (resumen) y `proyecto/decisiones-detalle.md` (texto completo).

**Cómo se actualiza:** al cerrar un bloque, cada sesión (1) añade el detalle con fecha a `historial.md`, (2) cambia aquí su apartado para que diga solo lo que sigue abierto y (3) pone una línea en "Última actualización" (solo la última; las anteriores, al historial).

Última actualización: 2026-10-22, sesión de desarrollo. Fase 4 de la guía de ds4agents terminada (D67): guidelines subidas y enlaces Docs en TokensDS (Oscar), inventario al día; siguiente, la fase 5. Antes, el mismo día, pasos 8 y 9: guidelines de Figma generadas desde `docs/` (`npm run docs:figma`, 33,4 KB) y validación de la documentación en CI (`npm run docs:check`). Antes, el mismo día, pasos 4, 5 y 7: patrones, voz y tono y repaso para agentes; Documentación a 3 en la scorecard (media 2,25). Antes, el mismo día, paso 3: documentos de componente (`docs/components/`); paso 2: fundamento de color (`docs/foundations/color.md`); paso 1: `anti-patterns.md` pasa a `docs/rules/` y se borra `docs/.gitkeep`. Antes, 2026-10-21, sesión de desarrollo. D66: `radius/nested` pasa a `radius/group`, aplicado en CodeTabs y ThemeToggle (Figma y código). Antes, el mismo día: fase 3 de la guía de ds4agents (Tokens, D65): descripciones de los semánticos vigiladas por `check:tokens`, `radius/nested`, `docs/rules/rules-tokens.md` e inventario al día; sistema 1.2.0. Antes, el mismo día, sesión de diseño y desarrollo: fase 2 de G22 terminada (D64): piloto preparado en TokensDS y comprobado con el servidor MCP; `docs/inventory.md` actualizado (media 1,88). Antes, el mismo día, V61: primer archivo de guidelines de la librería (`docs/rules/anti-patterns.md`), fase 2 de G22; falta subirlo a TokensDS. Antes, el mismo día: fase 1 de la guía de ds4agents (G25) terminada: decisiones de Oscar en `docs/inventory.md`; siguiente, la fase 2. Antes, el mismo día, P28: los documentos del proyecto pasan a `proyecto/` y `docs/` queda para la documentación del sistema de la guía de ds4agents (G22); siguiente, la auditoría del piloto. Antes, el mismo día, V60: componente `CodePreview` (`CodeBlock` con pestañas Markdown / Vista previa para bloques markdown con `preview`, vista previa renderizada en el build); pruebas, build, `check:content` y `check:tokens` sin errores, probado en Chrome a 1440 y 320 px, Light y Dark, con un bloque temporal; ninguna lección lo usa todavía. Antes, 2026-10-14, sesión de desarrollo. V59: "Generar escalas" enlaza a colorgods con un `Callout` `recommendation` después de la herramienta, y el README también; pruebas, build, `check:content` y `check:tokens` sin errores, capturas a 1440 y 375 px; fusionado en `main`. Antes, 2026-10-09, sesión de desarrollo. S38 en código: breakpoints `sm` a `2xl` y `desktop` como alias de `lg` en `tokens/code-only.tokens.json`, función `breakpoint()` y regla de la capa 2 en `terrazzo.config.mjs` (iguales a las lecciones), `check:tokens` con los seis breakpoints; build, `check:content` y `check:tokens` sin errores, `MobileNav` comprobado en Chrome (64rem); fusionado en `main`. Antes, el mismo día, sesión de contenido: S38 (decisión, especificación y lecciones; sistema 1.1.0). Antes, el mismo día, sesión de desarrollo: revisión de contenido de los módulos 0 y 1 aplicada y componente `AnnotatedCode` (V56) en `what-is-dtcg`; opacidad de "Tipos simples" precisada (V57). Segunda pasada: "Por qué Figma y no el código" reescrito con *Import mode* (V58), *Import mode* en "Qué es DTCG" y `AnnotatedCode` en `entrega-diseno.md` §3.13; build y `check:content` sin errores. Antes, el mismo día: V54 y V55 en las cinco plantillas de Figma de Generar escalas (`entrega-diseno.md` §3.12). Antes, el mismo día: V55: color y nombre en dos columnas iguales y alineadas (subgrid), ayuda del nombre más corta; build y `check:tokens` sin errores, probado en Chrome a 375, 1024 y 1440 px. Antes, el mismo día: V54 en Generar escalas (color y nombre en una fila desde desktop, pie de `ChromaChart`, ayuda y "(sugerida)" en la curva, aviso de desactualizado en un `Callout` `warning` encima del botón); solo build, sin errores. Antes, 2026-10-08, sesión de diseño: herramientas en Figma al día con C21, C23, C24, C29, C31 y T24.

---

## Plan general

| Paso | Frente | Qué | Estado |
|---|---|---|---|
| 1-4, 7, 8 | Todos | Bloque 0, especificación, repositorio, esqueleto, tokens a código, componentes y páginas | Hechos (2026-09-30 a 2026-10-03) |
| 5 | Diseño | Variables, componentes y plantillas en Figma | Hecho; al día con el código (D31 a D42) |
| 6 | Contenido | Módulos 1 a 10 en español | Módulos 0 a 10 aprobados (el 10, Conclusiones, el 2026-10-07, T20) |
| 9 | Contenido | Versión en inglés | Aplazada (P24): la web se lanza solo en español |
| 10 | Todos | Lanzamiento (P17, P18, P24) | Lista en "Para la primera versión" |

## Para la primera versión

**Publicada el 2026-10-07** en https://designtokens101.com (P17, P18, P24, P26), con el sistema de referencia en Figma Community. Lo que queda:

1. **Oscar:** vista previa en el Post Inspector de LinkedIn; alta del dominio en Google Search Console (propiedad de tipo Dominio) y envío de `sitemap.xml`; prueba manual en Safari, Firefox y con VoiceOver.
2. **Opcional (Oscar):** reexportar `home-light` y `home-dark` a 880 × 880 (D43, V48; desarrollo cambia las medidas); comprobar si `designtoken101.com` está libre y redirigirlo; prueba con Starter (si se hace, contenido lo añade a "Archivos de Figma").

Fuera de la primera versión, salvo que Oscar decida otra cosa: el glosario y la página de errores frecuentes (T1; ninguna lección los promete) y la versión en inglés (P24). Las herramientas de escalas y de normalización (T8, T21) están en `main` desde el 2026-10-08.

## Aplicar la guía de ds4agents (P28)

**Estado:** documentos del proyecto en `proyecto/`; `docs/` libre para la documentación del sistema (2026-10-21).

**Fase 1, auditoría del piloto (G25): terminada** (2026-10-21). Oscar decidió categorías, estados y las diferencias del inventario (`docs/inventory.md`); cada diferencia dice en qué fase se resuelve.

**Fase 2, preparar Figma: terminada** (2026-10-21, D64). Resultado en `docs/inventory.md` ("Ready for AI" y scorecard).
- **Oscar:** publicar TokensDS para que lleguen a los archivos que usan la librería los cambios de D64 (descripciones, anotaciones y `Glyph`).
- Fuera del piloto, sin hacer: las descripciones de los componentes anidados (`Icon`, `IconButton`, `TableCell`, iconos `li:*`) siguen con el formato anterior y llegan así al agente.

**Fase 3, Tokens (D65): hecha** (2026-10-21). Pendientes de la fase 3 comprobados (`docs/inventory.md`): las descripciones de token no llegan por el MCP de Figma, sino por el repositorio.

**Fase 4, documentar: terminada** (2026-10-22, D67). `docs/` con fundamento de color, cinco componentes, dos patrones, voz y tono y reglas; guidelines generadas desde `docs/` y subidas a TokensDS; `npm run docs:check` en CI; línea "Docs:" y enlace de documentación en Figma. Scorecard: media 2,25 (`docs/inventory.md`).

**Siguiente: fase 5, vincular diseño y código (Code Connect).** Diferencias que esperan a esta fase en `docs/inventory.md`: `showIcon`/`icon` de Button, `invalid`/`error` de TextField y CodeBlock, CodePreview y AnnotatedCode al mismo `CodeBlock` (comprobar que Code Connect lo admite).

## Contenido

**Estado:** módulos 0 a 10 aprobados (P23, P24 y T20 reflejados; detalle en `historial.md`). `how-this-site-was-made` enlaza los issues (P25) y "Archivos de Figma" (P18) está publicada; las dos, compiladas y comprobadas por desarrollo el 2026-10-07.

**Pendiente**
- **Glosario y página de errores frecuentes** (Recursos, T1). Candidatos ya reflejados en las lecciones: la exportación no conserva los alias (paso 7); opacidad en float32 (V31); renombrar o duplicar sin cambiar el code syntax (V33); interlineado leído como píxeles (D01); `font-family: Inter` frente a `next/font` (V13); `border` sin valor (V14); la negrita de un fragmento rompe el estilo de texto (D17); modo elegido en un componente principal (`apply-modes`).
- **Herramientas (T8, T21 a T25):** lógica hecha y probada (`tools/scales.mjs`, `tools/figma-to-dtcg.mjs`, `tools/zip.mjs`, `tests/`); páginas (`content/es/98-tools/`), textos de la interfaz (`messages/es.json`, `ToolScales` y `ToolNormalize`) y componentes, en `main` desde el 2026-10-08. Sin code syntax en el archivo (T25). Pruebas 4 y 5 hechas (`investigacion-herramientas.md` §7): "Importar en Figma" rehecho y enlaces desde las cinco lecciones, en `main` el 2026-10-08. Guion de pruebas manuales en `proyecto/pruebas-herramientas.md`, con los archivos en `tests/manual/` (Oscar). Corregido el 2026-10-08: una variable en varios modos contaba varias veces en las decisiones de tipo, y el resumen dice "Tokens no exportados". 
- **Sin verificar, y por eso no se afirma en el contenido (P14):** si Figma exporta las variables Timing y Easing en DTCG y en qué unidad; qué `colorSpace` exporta una variable escrita en oklch; qué ve un archivo que usa la biblioteca cuando un semántico apunta a un primitivo oculto; si un estilo de texto creado desde un texto con variables las conserva.
- **Observación de desarrollo, sin decidir:** la tabla de `text-contrast` ("los más justos") no incluye `text/danger/default` sobre `background/danger/subtle` (5,75 en Light). `danger` no se usa todavía (S31).

**Pendiente de reflejar en el contenido**
- **P18, diseño de partida:** cuando exista, añadirlo a "Archivos de Figma" y enlazarlo desde el ejercicio del módulo 1 ("Qué necesitas").
- **S21 y D12 a D14:** el contraste de la tabla semántica y por estado (módulo 7). Comprobar que está todo reflejado al revisar el módulo.
- **V49 a V52:** si "Cómo se hizo esta web" cuenta la parte técnica, los metadatos (`meta_title`, canónicas, sitemap y Open Graph).
- **V01:** para "Cómo se hizo esta web" (plugins de MDX con Turbopack; `proxy.ts` ya no existe desde V45).
- **V05 (si algún día se traduce, P24):** crear también `content/en/NN-seccion/meta.json`.

## Diseño

**Estado:** archivo TokensDS al día con el código (D31 a D39) y con lo de la primera versión (D40 a D42: C19, enlace del pie y portada). Detalle en `historial.md` y `proyecto/entrega-diseno.md` §3.10.

**Pendiente**
- **Herramientas (T22, D44 a D60):** componentes y diez plantillas en Figma, al día con C21, C23, C24, C29, C31, T24, V54 y V55 (`entrega-diseno.md` §3.11 y §3.12). Abierto:
  - **Oscar:** revisar las plantillas (D51), como hizo con los componentes (D56).
- **Archivo de referencia (P16, D37, D38):**
  - Hecho (2026-10-07): nombre "DesignToken101: Reference system" (Oscar); texto de Community aprobado; versión, fecha y enlace en Read me (sesión de contenido, en la copia y en TokensDS: "Versión 1.0.0, publicada en octubre de 2026. Web del curso: designtokens101.com", con enlace, sin el `Callout` `pending`); licencia revisada (CC BY 4.0 la pone Figma; Lucide con su aviso en Read me; fuentes OFL no van dentro del archivo); frase de `body/small` comprobada (la dice la ayuda de Figma, "Modes for variables", y la cita `name-constraints`).
  - Hecho por Oscar (2026-10-07): captura del panel de variables (Semantic color, Light y Dark), imágenes de Community exportadas y página "Community images" borrada.
  - **Publicado en Community el 2026-10-07:** https://www.figma.com/community/file/1689691616219413490 (Education → Design tutorials). Sin prueba con Starter: la página "Archivos de Figma" no dice qué ve ese plan (P14).
  - La referencia no se edita: un cambio se hace en TokensDS y se vuelve a duplicar al publicar (D38).
- **P24 en Figma: hecho (comprobado con la API de plugins el 2026-10-07, solo lectura).** Sin selector de idioma en ninguno de los dos archivos; descripción de `color/background/neutral/strong` y textos de Semantics (Light y Dark) corregidos. `Semantic color` reexportada, en el repositorio y generada (2026-10-07).
- **Descripciones de `neutral/hover` y `border/accent/strong`:** cambiadas en Figma, reexportadas y generadas (2026-10-07). Sin comprobar desde desarrollo: el texto de las tablas de Semantics (Light y Dark) en TokensDS y en la copia de referencia, que no sale en la exportación.
- **Diseño de partida (P16, P18):** cuando estén cerrados los módulos 9 y 10; incluye al menos un botón con estados dibujado con valores sueltos (T17).
- **Imagen de la portada (D43):** exportar los dos PNG (punto 1 de "Para la primera versión").
- **S38 (2026-10-09):** los breakpoints son solo de código y la versión 1.1.0 no cambia nada de Figma, así que el archivo de referencia sigue en 1.0.0 (lo dice "Archivos de Figma"). Comprobar si alguna página de TokensDS lista los tokens de código; si los lista, añadir los breakpoints.

## Desarrollo

**Estado:** la web funciona en Light, Dark y system, en móvil y escritorio, con los módulos 0 a 10 y las dos herramientas compilados y comprobados (último build: 2026-10-08, herramientas). Detalle de cada comprobación en `historial.md`.

**Portada (V47)**
- **Oscar:** decidir si se reexportan las imágenes a 880 × 880 (las de ahora, 440 × 441, se ven a media resolución en pantallas de alta densidad, V48) y revisar la portada en el navegador, en Light, Dark, móvil y escritorio; también el texto de `title` y `description` (propuesta de desarrollo, V47).

**Abierto tras P24 (V45)**
- **Oscar:** reiniciar `next dev` (el que estaba en marcha conserva las rutas con `[locale]` y da 404).

**Pendiente o sin verificar**
- **`CodePreview` (V60, 2026-10-21):** visto en Chrome; falta Safari y Firefox, oír las pestañas con lector de pantalla y que Oscar lo revise en el navegador. Ninguna lección lo usa: para verlo hay que marcar un bloque markdown con `preview`. **Oscar decide:** (1) texto de la pestaña no actual en `active`: 3,99:1 en Dark con el de Figma; D12 pide `text/neutral/default`; (2) el `hover` de la pestaña no se ve en el carril (mismo color); (3) código en línea de la vista previa: `Code` con fondo (Prose) o mono sin fondo (Figma). Diseño: añadir el componente a `entrega-diseno.md`.
- **`AnnotatedCode` (V56, 2026-10-09):** visto en Chrome a 1440 y 320 px, Light y Dark; falta Safari y Firefox, oír "nota 1" con lector de pantalla y que Oscar lo revise en el navegador.
- **Herramientas (2026-10-08, detalle en `historial.md`):** probadas en Chrome 154 con Playwright, también con C21 a C31; falta la prueba manual en Safari y Firefox (subida de carpeta y .zip, decisiones, descargas) y con lector de pantalla; en Generar escalas, también el clic en la pista del deslizador (C23, 2.5.7) y su estilo propio (C29) y el pulso (C30) en cada navegador. V54 y V55 (2026-10-09): vistas en Chrome; falta Safari y Firefox (subgrid) y oír el `Callout` del aviso con lector de pantalla. Sin revisar por Oscar en el navegador.
- **Dominio canónico: resuelto el 2026-10-07 con la opción (a).** En Vercel, `designtokens101.com` sirve producción y `www` redirige a él (308); coincide con la canónica, `og:url` y el sitemap.
- **Imagen para compartir (V52):** `share.png` y tarjeta grande en producción, comprobadas en el `<head>` el 2026-10-07. Oscar: vista previa en LinkedIn (después de resolver el dominio canónico) y alta del sitemap en Google Search Console.
- Despliegue en Vercel con Node 24.x (V53): termina sin errores (commit `8111f6a`), con lo que `next/font/google` descarga las fuentes en Vercel. Sin leer el log del build (sin CLI de Vercel en esta sesión).
- Prueba manual, con lector de pantalla y en Safari y Firefox.
- `npm` bloquea el `postinstall` de `@swc/core` (dependencia de next-intl); el build funciona sin él.
- **Dominio `designtokens101.com` (P26):** funcionando desde el 2026-10-07.
