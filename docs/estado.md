# DesignToken101: Estado

En qué punto está cada frente y qué sigue abierto. **Corto a propósito** (P21): se carga al empezar cada sesión de Claude Code. El detalle de lo hecho (pruebas, cifras, comprobaciones, hallazgos) va en `docs/historial.md`, que se lee bajo demanda. Las decisiones van en `docs/decisiones.md` (resumen) y `docs/decisiones-detalle.md` (texto completo).

**Cómo se actualiza:** al cerrar un bloque, cada sesión (1) añade el detalle con fecha a `historial.md`, (2) cambia aquí su apartado para que diga solo lo que sigue abierto y (3) pone una línea en "Última actualización" (solo la última; las anteriores, al historial).

Última actualización: 2026-10-07, sesión de desarrollo. V44: Tailwind solo busca clases en `src/`; arregla el 500 de `next dev` (texto de `docs/` tomado como clase) y saca del CSS publicado 43 clases de ejemplos. Antes, V40 (a) implementada y módulo 10 comprobado.

---

## Plan general

| Paso | Frente | Qué | Estado |
|---|---|---|---|
| 1-4, 7, 8 | Todos | Bloque 0, especificación, repositorio, esqueleto, tokens a código, componentes y páginas | Hechos (2026-09-30 a 2026-10-03) |
| 5 | Diseño | Variables, componentes y plantillas en Figma | Hecho; al día con el código (D31 a D39) |
| 6 | Contenido | Módulos 1 a 10 en español | Módulos 0 a 9 aprobados (el 9, el 2026-10-07, T18). Módulo 10, Conclusiones (T20): en borrador, pendiente de la revisión de Oscar |
| 9 | Contenido | Versión en inglés (C5) | Cuando el español esté cerrado |
| 10 | Todos | Lanzamiento (P17, P18) | Cuando estén el inglés y los módulos 9 y 10 |

## Contenido

**En curso: módulo 10, Conclusiones (T20, P23)**
- `content/es/10-conclusions/`: `course-summary` y `conclusions`, en borrador. **Pendiente de la revisión de Oscar.**
- Menciones a la IA quitadas (P23) de `why-this-site`, `figma-dtcg-tailwind`, `component-tokens`, `design-to-code` y `what-we-teach`; esta última y `content/es/meta.json` enlazan ya el módulo 10.
- Build y navegador hechos por la sesión de desarrollo (2026-10-07), sin errores ni cambios en el MDX (detalle en `historial.md`). **Aviso:** en `course-summary`, "Crear en Figma", la viñeta "El espaciado y el radio son escalas en las que el número es proporcional al valor" no vale para `radius/full`.

**Pendiente**
- **Glosario y página de errores frecuentes** (Recursos, T1). Candidatos ya reflejados en las lecciones: la exportación no conserva los alias (paso 7); opacidad en float32 (V31); renombrar o duplicar sin cambiar el code syntax (V33); interlineado leído como píxeles (D01); `font-family: Inter` frente a `next/font` (V13); `border` sin valor (V14); la negrita de un fragmento rompe el estilo de texto (D17); modo elegido en un componente principal (`apply-modes`).
- **Herramienta de escalas de color (T8)**, al final: requisitos en `historial.md` → Contenido → Pendiente.
- **Sin verificar, y por eso no se afirma en el contenido (P14):** si Figma exporta las variables Timing y Easing en DTCG y en qué unidad; qué `colorSpace` exporta una variable escrita en oklch; qué ve un archivo que usa la biblioteca cuando un semántico apunta a un primitivo oculto; cómo exporta Figma un alias dentro de una misma colección; si un estilo de texto creado desde un texto con variables las conserva.
- **Observación de desarrollo, sin decidir:** la tabla de `text-contrast` ("los más justos") no incluye `text/danger/default` sobre `background/danger/subtle` (5,75 en Light). `danger` no se usa todavía (S31).

**Pendiente de reflejar en el contenido**
- **P17 y P18 (bloque de lanzamiento):** página "Archivos de Figma" en los dos idiomas y sus tres enlaces (Requisitos, ejercicio del módulo 1, ejercicio final). La versión en inglés dice que el texto de los archivos está en español (P19).
- **S21 y D12 a D14:** el contraste de la tabla semántica y por estado (módulo 7). Comprobar que está todo reflejado al revisar el módulo.
- **V01 y V02:** para "Cómo se hizo esta web" (`proxy.ts`, plugins de MDX con Turbopack, lecciones sin traducir).
- **V05:** al traducir, crear también `content/en/NN-seccion/meta.json`.

## Diseño

**Estado:** archivo TokensDS al día con el código (D31 a D39). Detalle en `historial.md` y `docs/entrega-diseno.md`.

**Pendiente**
- **Archivo de referencia (P16, D37, D38):**
  - Oscar: cambiar el nombre de la copia a "DesignToken101: Reference system" (la API no puede) y hacer la captura de la vista de variables con los modos.
  - Texto para Community (nombre, descripción, etiquetas): pendiente de la aprobación de Oscar.
  - Antes de publicar: versión, fecha y enlace en Read me (quitar el `Callout` `pending`); borrar la página de imágenes; prueba con una cuenta Starter; revisar la licencia.
  - Revisar (P14): el texto de ejemplo de `body/small` dice que, al importar, "si dos tokens acaban con el mismo nombre, solo importa el primero". Sin comprobar.
  - La referencia no se edita: un cambio se hace en TokensDS y se vuelve a duplicar al publicar (D38).
- **Diseño de partida (P16, P18):** cuando estén cerrados los módulos 9 y 10; incluye al menos un botón con estados dibujado con valores sueltos (T17).
- **V40:** implementada en código el 2026-10-07 (ancho mínimo `space/600`, número alineado al final). Anotar en `componentes-v1.md` §4.10 la columna de ancho mínimo y añadir la sección "10" a las plantillas.

## Desarrollo

**Estado:** la web funciona en Light, Dark y system, en móvil y escritorio, con los módulos 0 a 10 compilados y comprobados (último build: 2026-10-07, módulo 10 y V40). Detalle de cada comprobación en `historial.md`.

**Pendiente o sin verificar**
- Despliegue en Vercel (después de P17); `next/font/google` descarga las fuentes al compilar, sin probar en Vercel.
- Prueba manual, con lector de pantalla y en Safari y Firefox.
- `npm` bloquea el `postinstall` de `@swc/core` (dependencia de next-intl); el build funciona sin él.
- **Provisionales que esperan la revisión de Oscar:** C19, V34, V37, V44.
- **Propuesta para Oscar (V44):** que `check:content` busque en el CSS generado clases con corchetes fuera de las excepciones de V43.
