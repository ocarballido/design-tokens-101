# DesignToken101: Estado

En qué punto está cada frente y qué sigue abierto. **Corto a propósito** (P21): se carga al empezar cada sesión de Claude Code. El detalle de lo hecho (pruebas, cifras, comprobaciones, hallazgos) va en `docs/historial.md`, que se lee bajo demanda. Las decisiones van en `docs/decisiones.md` (resumen) y `docs/decisiones-detalle.md` (texto completo).

**Cómo se actualiza:** al cerrar un bloque, cada sesión (1) añade el detalle con fecha a `historial.md`, (2) cambia aquí su apartado para que diga solo lo que sigue abierto y (3) pone una línea en "Última actualización" (solo la última; las anteriores, al historial).

Última actualización: 2026-10-08, sesión de contenido. Decisión 15 aplicada: `tools/figma-to-dtcg.mjs` deja como están los alias dentro de una colección (antes los convertía en un `dimension` no válido) y ocho lecciones precisan que solo los alias a otra colección salen resueltos; prueba 3 hecha (`[]` se importa como `ALL_SCOPES`). Falta el build. Antes, el mismo día: pruebas DTCG en Figma, corrección del scope del peso e investigación de las herramientas (A15).

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

Fuera de la primera versión, salvo que Oscar decida otra cosa: el glosario y la página de errores frecuentes (T1; ninguna lección los promete), las herramientas de escalas y de normalización (T8, T21) y la versión en inglés (P24).

## Contenido

**Estado:** módulos 0 a 10 aprobados (P23, P24 y T20 reflejados; detalle en `historial.md`). `how-this-site-was-made` enlaza los issues (P25) y "Archivos de Figma" (P18) está publicada; las dos, compiladas y comprobadas por desarrollo el 2026-10-07.

**Pendiente**
- **Glosario y página de errores frecuentes** (Recursos, T1). Candidatos ya reflejados en las lecciones: la exportación no conserva los alias (paso 7); opacidad en float32 (V31); renombrar o duplicar sin cambiar el code syntax (V33); interlineado leído como píxeles (D01); `font-family: Inter` frente a `next/font` (V13); `border` sin valor (V14); la negrita de un fragmento rompe el estilo de texto (D17); modo elegido en un componente principal (`apply-modes`).
- **Herramientas (T8, T21):** investigación hecha (`docs/investigacion-herramientas.md`); esperan las decisiones de Oscar (A15, §8; la 11 está aplicada). Pruebas en Figma de §7 hechas. Oscar borra el archivo "zz DesignToken101 · prueba DTCG (borrar)" de su equipo Pro. No se pasa al índice ni al diseño sin su aprobación.
- **Sin verificar, y por eso no se afirma en el contenido (P14):** si Figma exporta las variables Timing y Easing en DTCG y en qué unidad; qué `colorSpace` exporta una variable escrita en oklch; qué ve un archivo que usa la biblioteca cuando un semántico apunta a un primitivo oculto; si un estilo de texto creado desde un texto con variables las conserva.
- **Observación de desarrollo, sin decidir:** la tabla de `text-contrast` ("los más justos") no incluye `text/danger/default` sobre `background/danger/subtle` (5,75 en Light). `danger` no se usa todavía (S31).

**Pendiente de reflejar en el contenido**
- **P18, diseño de partida:** cuando exista, añadirlo a "Archivos de Figma" y enlazarlo desde el ejercicio del módulo 1 ("Qué necesitas").
- **S21 y D12 a D14:** el contraste de la tabla semántica y por estado (módulo 7). Comprobar que está todo reflejado al revisar el módulo.
- **V49 a V52:** si "Cómo se hizo esta web" cuenta la parte técnica, los metadatos (`meta_title`, canónicas, sitemap y Open Graph).
- **V01:** para "Cómo se hizo esta web" (plugins de MDX con Turbopack; `proxy.ts` ya no existe desde V45).
- **V05 (si algún día se traduce, P24):** crear también `content/en/NN-seccion/meta.json`.

## Diseño

**Estado:** archivo TokensDS al día con el código (D31 a D39) y con lo de la primera versión (D40 a D42: C19, enlace del pie y portada). Detalle en `historial.md` y `docs/entrega-diseno.md` §3.10.

**Pendiente**
- **Archivo de referencia (P16, D37, D38):**
  - Hecho (2026-10-07): nombre "DesignToken101: Reference system" (Oscar); texto de Community aprobado; versión, fecha y enlace en Read me (sesión de contenido, en la copia y en TokensDS: "Versión 1.0.0, publicada en octubre de 2026. Web del curso: designtokens101.com", con enlace, sin el `Callout` `pending`); licencia revisada (CC BY 4.0 la pone Figma; Lucide con su aviso en Read me; fuentes OFL no van dentro del archivo); frase de `body/small` comprobada (la dice la ayuda de Figma, "Modes for variables", y la cita `name-constraints`).
  - Hecho por Oscar (2026-10-07): captura del panel de variables (Semantic color, Light y Dark), imágenes de Community exportadas y página "Community images" borrada.
  - **Publicado en Community el 2026-10-07:** https://www.figma.com/community/file/1689691616219413490 (Education → Design tutorials). Sin prueba con Starter: la página "Archivos de Figma" no dice qué ve ese plan (P14).
  - La referencia no se edita: un cambio se hace en TokensDS y se vuelve a duplicar al publicar (D38).
- **P24 en Figma: hecho (comprobado con la API de plugins el 2026-10-07, solo lectura).** Sin selector de idioma en ninguno de los dos archivos; descripción de `color/background/neutral/strong` y textos de Semantics (Light y Dark) corregidos. `Semantic color` reexportada, en el repositorio y generada (2026-10-07).
- **Descripciones de `neutral/hover` y `border/accent/strong`:** cambiadas en Figma, reexportadas y generadas (2026-10-07). Sin comprobar desde desarrollo: el texto de las tablas de Semantics (Light y Dark) en TokensDS y en la copia de referencia, que no sale en la exportación.
- **Diseño de partida (P16, P18):** cuando estén cerrados los módulos 9 y 10; incluye al menos un botón con estados dibujado con valores sueltos (T17).
- **Imagen de la portada (D43):** exportar los dos PNG (punto 1 de "Para la primera versión").

## Desarrollo

**Estado:** la web funciona en Light, Dark y system, en móvil y escritorio, con los módulos 0 a 10 compilados y comprobados (último build: 2026-10-07, módulo 10 y V40). Detalle de cada comprobación en `historial.md`.

**Portada (V47)**
- **Oscar:** decidir si se reexportan las imágenes a 880 × 880 (las de ahora, 440 × 441, se ven a media resolución en pantallas de alta densidad, V48) y revisar la portada en el navegador, en Light, Dark, móvil y escritorio; también el texto de `title` y `description` (propuesta de desarrollo, V47).

**Abierto tras P24 (V45)**
- **Oscar:** reiniciar `next dev` (el que estaba en marcha conserva las rutas con `[locale]` y da 404).

**Pendiente o sin verificar**
- **Build de las correcciones del 2026-10-08 (sesión de contenido):** `npm run build && npm run check:content`. Cambia texto en `what-is-dtcg`, `figma-dtcg-tailwind`, `typography`, `what-is-an-alias`, `what-figma-exports` (bloque JSON nuevo), `normalize-the-export` (párrafo, extracto de código y enlace a `/figma-to-code/what-figma-exports#por-qué-el-valor-viene-resuelto`), `exercise-figma-to-code`, `course-summary` y `conclusions`; enlace nuevo en `typography`. Después, `npm run tokens && npm run check:tokens`: `tools/figma-to-dtcg.mjs` cambió y la salida debe ser la misma (comprobado en esta sesión solo con el script).
- **Dominio canónico: resuelto el 2026-10-07 con la opción (a).** En Vercel, `designtokens101.com` sirve producción y `www` redirige a él (308); coincide con la canónica, `og:url` y el sitemap.
- **Imagen para compartir (V52):** `share.png` y tarjeta grande en producción, comprobadas en el `<head>` el 2026-10-07. Oscar: vista previa en LinkedIn (después de resolver el dominio canónico) y alta del sitemap en Google Search Console.
- Despliegue en Vercel con Node 24.x (V53): termina sin errores (commit `8111f6a`), con lo que `next/font/google` descarga las fuentes en Vercel. Sin leer el log del build (sin CLI de Vercel en esta sesión).
- Prueba manual, con lector de pantalla y en Safari y Firefox.
- `npm` bloquea el `postinstall` de `@swc/core` (dependencia de next-intl); el build funciona sin él.
- **Dominio `designtokens101.com` (P26):** funcionando desde el 2026-10-07.
