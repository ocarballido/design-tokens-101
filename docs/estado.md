# Tokens101: Estado

Qué está hecho, qué falta y qué está bloqueado en cada frente. **Cada sesión lo actualiza al terminar** (fecha + qué cambió). Las decisiones van en `docs/decisiones.md`, no aquí.

Última actualización: 2026-10-04 (sesión de desarrollo: `ColorScale` implementado y módulo 2 comprobado con los cambios de Oscar).

---

## Plan general

| Paso | Frente | Qué | Estado |
|---|---|---|---|
| 1 | Contenido | Revisar el bloque 0 (MDX en español) | Hecho (2026-09-30): aprobado por Oscar |
| 2 | Contenido | Ejercicio de cierre de la fase 1 → especificación `docs/sistema-tokens-v1.md` | Hecho (2026-09-30) |
| 3 | Oscar | Crear el repositorio en GitHub | Hecho (2026-10-03): `ocarballido/design-tokens-101`. Documentos trasladados aquí (P9) |
| 4 | Desarrollo A | Esqueleto: Next.js + next-intl + `@next/mdx`, renderizando el bloque 0 sin diseño | Hecho (2026-10-03): compila, anclas y sidebar comprobados (V01–V05) |
| 5 | Diseño | Variables en Figma → componentes → plantillas | Hecho (2026-10-02). Entrega en `docs/entrega-diseno.md`. Solo queda A14 (nombre del logotipo), que no bloquea |
| 6 | Contenido | Redactar los módulos 1 a 7 | En curso: módulo 1 aprobado (2026-10-04); módulo 2 en borrador, compilado y comprobado (2026-10-04), pendiente de revisión |
| 7 | Desarrollo B | Exportar DTCG desde Figma → Style Dictionary vs Terrazzo → CSS y `@theme` | Hecho (2026-10-03): Terrazzo + Resolver DTCG, dos capas y Tailwind (V06–V12) |
| 8 | Desarrollo C | Componentes y páginas con el diseño | Hecho (2026-10-03): todo el inventario, plantilla y modos (V13–V22). Quedan detalles para Oscar (ver Desarrollo) |
| 9 | Contenido | Versión en inglés del contenido cerrado | Cuando el español esté cerrado |

## Contenido

**Hecho**
- Documento de la fase 1 con fuentes (`docs/fase-1-fundamentos-tokens.md`).
- Bloque 0 en español, borrador en MDX (`content/es/`):
  - 00-start-here: what-is-tokens101, why-this-site, what-is-dtcg, figma-dtcg-tailwind, what-we-teach, requirements, how-this-site-was-made
  - 99-resources: sources
- Convenciones de contenido (`content/README.md`).
- **Bloque 0 al día con el paso 7 (2026-10-03, aprobado por Oscar):**
  - `04-figma-dtcg-tailwind`: recorrido con el paso de normalización; apartado "Figma exporta casi DTCG" (alias resueltos, tamaños sin unidad, `string`, peso como `number`); Terrazzo (V06); ejemplo CSS real con `--t101-` y `data-theme`; capa 2 con `--text-color-*` y su riesgo (V09); "Lo que hemos decidido" (V06–V09, S9). Queda un `pending`: Figma no documenta los alias dentro de una colección.
  - `03-what-is-dtcg`: fila `string` en la tabla de importación, aviso de que la exportación no deshace las conversiones y mención de la normalización y del Resolver.
  - `05-what-we-teach`: módulo 6 con la normalización. `06-requirements`: versiones probadas. `99-resources/01-sources`: Terrazzo Resolvers y API de plugins (Timing y Easing).
- **V24 corregido** (sesión de contenido, decisión de Oscar): Figma sí tiene variables Timing y Easing; los tokens de movimiento siguen solo en código.

- **Módulo 1, Fundamentos, en español (2026-10-03; aprobado por Oscar el 2026-10-04):** `content/es/01-fundamentals/` con `meta.json` (V05) y cinco páginas (T6): `what-is-a-token`, `simple-types`, `composite-types`, `source-of-truth` y `exercise-inventory`. La tabla de tipos refleja D01 (interlineado en código), D04 (peso como Number) y V24 (duración y curva en código). Fuentes nuevas añadidas a `99-resources/01-sources`.

- **Módulo 2, Primitivos, en español (2026-10-04, borrador pendiente de revisión de Oscar, T7):** `content/es/02-primitives/` con `meta.json` (V05) y nueve páginas: `what-is-a-primitive`, `spacing`, `radius-and-border`, `typography`, `color-space` (pedida por Oscar; con `Flow` del recorrido del color), `color-scales` (con `Flow` del método), `status-colors`, `primitives-collection` y `exercise-scales` (T6: prepara el módulo 3 con la lista de usos y su primitivo). Refleja S9–S13, S16–S20, S22 (primitivos), D01, D02, D04, V24 y Timing/Easing. Fuentes nuevas en `99-resources/01-sources`. Enlaces nuevos al módulo 2 desde `05-what-we-teach` (paso "Primitivos" del `Flow`), `04-figma-dtcg-tailwind` y el módulo 1 (sustituyen menciones sin enlace a "el módulo Primitivos"; el texto aprobado no cambia).
- **Cambios de Oscar al módulo 2 (2026-10-04):** `typography` con el apartado "Tu escala puede ser otra" (escala propia, escala modular y [Typescale](https://typescale.com/)); `color-space` con el apartado "Cómo se crearon los colores de Tokens101" (`Flow` de 6 pasos que sustituye al anterior, qué hace el script, qué se copia a Figma y para qué sirve el contraste) y recursos para entender oklch (vídeo enlazado, no insertado, C16; oklch.com; artículo de blog); `color-scales` con la curva de referencia explicada y una tabla `green` → `emerald`; escalas visuales con `ColorScale` (C14) en `color-scales` (2) y `status-colors` (3).
- **Cambios generales (2026-10-04):** `01-what-is-tokens101` con "Un curso técnico para diseñadores" (P10), "Lo que no es" y "Un sistema tan grande como lo que resuelve" (P11); "Qué no enseñamos" de `05-what-we-teach` ampliado (no es una guía de sistemas de diseño). **Sin guiones largos** en `content/` y `docs/` (C15), con la regla en `content/README.md`.
- **`tools/scales.py` (S30):** contraste sobre el hex guardado, escalas de estado en la salida, sin `green` y constante `TINT`. Valores sin cambios; §3.5 de la especificación recalculada.

- **Gráficos con `Flow` (C13, 2026-10-04):** metodología en `05-what-we-teach` (apartado "Cómo está organizado", con enlace al módulo 1 y los módulos 9 y 10 como `pending`); el recorrido de `04-figma-dtcg-tailwind` pasa de bloque de texto a `Flow` con siete pasos; enlace desde `01-what-is-tokens101`. Build y comprobación hechos por la sesión de desarrollo (2026-10-04, ver Desarrollo → "Gráficos `Flow` del bloque 0"). Más gráficos, solo donde aporten: capas (módulo 3) y modos (módulo 5).

**`ColorScale` (C14): implementado por la sesión de desarrollo (2026-10-04)** y comprobado en `color-scales` (2) y `status-colors` (3); ver Desarrollo → "`ColorScale` y módulo 2 con los cambios de Oscar". Pendiente de la revisión de Oscar en el navegador (C14 es provisional). Entre 1024 y ~1060 px el hex más largo baja su última letra de línea (V29). La descripción de `99-resources/01-sources` rompía el build al cambiar el guion largo por dos puntos (C15: en YAML, `: ` dentro de un valor sin comillas no es válido); se ha entrecomillado sin cambiar el texto. **Al usar dos puntos en el frontmatter, entrecomilla el valor.**

**Comprobación del módulo 2 (2026-10-04): build hecho por la sesión de desarrollo, sin errores y sin cambios en el MDX** (ver Desarrollo → "Módulo 2: comprobado"). En la sesión de contenido npm volvió a dar 403 en la sesión de contenido, así que allí se comprobó con un script aparte (reglas de `rehype-slug`): 22 páginas en español, 148 anclas, todos los enlaces internos y anclas con destino, `href` de `Flow` existentes, etiquetas `Callout`/`InCode`/`Flow` equilibradas y sin `{`, `}` ni `<` sueltos fuera del código.

**Comprobación (2026-10-03):** en el entorno de la sesión de contenido npm vuelve a dar 403 en algunos paquetes, así que no se ha podido ejecutar `npm run build && npm run check:content`. Se comprobaron los enlaces internos y las anclas del español con las reglas de `rehype-slug` (script aparte): sin errores. **Build ejecutado en local por la sesión de desarrollo (2026-10-03): sin errores** (ver Desarrollo → "Comprobación del contenido").

**Pendiente**
- Lección del módulo 8 (Ejercicio final) a partir del ejercicio de cierre (S8–S29).
- Revisión del módulo 2 por Oscar. Módulos 3 a 8 (módulo 1 aprobado el 2026-10-04).
- **Pendientes de verificar del módulo 2:** qué exporta Figma en DTCG cuando una variable de color se escribió en oklch, y cómo muestra un oklch fuera de sRGB en un archivo sRGB (`color-space`); si los alias a variables ocultas funcionan desde otro archivo que usa la biblioteca (`primitives-collection`).
- **Pendientes de verificar del módulo 1:** si Figma exporta las variables Timing y Easing en DTCG y en qué unidad; si al crear un estilo de texto desde un texto con variables se conservan las variables (la lección sigue el orden de la ayuda de Figma: crear el estilo y aplicar las variables dentro).
- **Herramienta de escalas de color (T8, al final de los módulos 2 a 8).** Requisitos propuestos:
  - Entrada: color de marca en hex, RGB u HSL; opciones de tinte de los neutros (`TINT`) y de escalas de estado.
  - Salida visual: las escalas con `ColorScale` (C14) y la tabla de oklch, hex y contraste (WCAG 2.2 sobre el hex, S30).
  - Salida para Figma: un archivo DTCG importable en una colección (la importación de Figma admite color en sRGB). **Verificar antes:** formato exacto que acepta la importación (nombres, grupos) y si respeta `$extensions` (visibilidad, scopes, code syntax).
  - Todo en el navegador, sin servidor. Una prueba automática comprueba que da los mismos hex que `tools/scales.py`.
  - Avisar cuando el método da escalas pobres (marcas muy claras, muy oscuras o casi grises): comprobarlo antes de diseñar la herramienta.
  - Mientras no exista, el módulo 2 enseña el script y oklch.com.
- Investigación del módulo 7 (accesibilidad): WCAG 2.2, foco, `prefers-reduced-motion`, `forced-colors`, tamaño de objetivos táctiles. Recordar que APCA no es norma.
- Glosario y página de errores frecuentes (a partir de la lista de la fase 1).
- **Textos que no coinciden con el diseño** (aviso de la sesión de diseño, 2026-10-02): el sidebar del diseño decía "Comenzar aquí" (el contenido dice "Empezar aquí"; ya unificado en diseño a "Empezar aquí"). "En esta página" es un párrafo en negrita en el MDX y en el diseño (`body/strong`, D17); si se quisiera como título, sería un cambio de T3.

**Pendiente de reflejar en el contenido**
- S14, S15, S17: nomenclatura propiedad primero y convención (módulo 4).
- S21: tabla semántica y contraste (módulos 3, 5 y 7).
- S22, S23: visibilidad y scopes de los semánticos; semánticos de radio (módulo 3, apartados "En Figma"). La parte de los primitivos ya está en el módulo 2.
- S24: estilos de texto como capa semántica tipográfica (módulo 3).
- S25, S26: tokens solo de código cuando Figma no los admite (módulo 6).
- S27: prefijo `--t101-` y por qué evita la referencia circular (módulo 6). Matiza el error corregido n.º 8 de la fase 1.
- **D01:** Figma interpreta una variable en el interlineado como píxeles; por eso `line-height/*` es solo de código y los estilos usan porcentaje (módulo 6; reflejado en los módulos 1 y 2). Candidato a "errores frecuentes".
- **D02:** el scope `GAP` cubre gap y padding; el espaciado negativo es solo de código (módulo 6; reflejado en el módulo 2, con el hallazgo de que CSS tampoco admite `gap` negativo).
- **D03:** code syntax Web con `var(--t101-…)`; ejemplo real de lo que produce el servidor MCP de Figma con cada formato (módulos 6 y 10).
- **D04:** pesos como variables Number; diferencia entre String y Number en Dev Mode (módulo 6; reflejado en los módulos 1 y 2). Afecta a la fase 1 (tema 2, "Peso tipográfico").
- **D10, D11:** tamaños de texto por contexto (colección Layout) y breakpoint solo de código (módulos 5 y 6).
- **D12–D14:** tokens de estado, por qué no hay categoría `action`, el estado en el lugar del énfasis (patrón SDS) y por qué no hay disabled (módulos 3, 4 y 7). Buen ejemplo para el módulo 7: el hover no necesita 3:1, el indicador de seleccionado sí.
- **D17:** en Figma la negrita de un fragmento rompe el estilo de texto; por eso existe `body/strong` (módulo 3). Candidato a "errores frecuentes".
- **D20:** token de ancho máximo de la columna de lectura y por qué es una excepción a "semánticos siempre alias" (módulos 3 y 4).
- **S16, S17 (regla 5), S20:** paletas por tono y nunca por rol. Reflejado en el módulo 2; el módulo 4 (Nombrar) debe retomarlo con el resto de la convención.
- **`$root` de DTCG 2025.10 (módulo 4):** ver Hallazgos (2026-10-04).
- **P10, P11:** reflejados en `01-what-is-tokens101`. P11 conviene recordarlo en los módulos 3 (capa de componentes solo cuando se justifica, S1) y 8 (ejercicio final).
- **C14:** cuando exista `ColorScale`, valorar usarlo también en el módulo 3 para mostrar a qué paso apunta cada semántico.
- **P9:** cómo se comparte una fuente de verdad entre sesiones y herramientas (material para el módulo 10).
- **C12:** al hablar de los modos del sistema, se usan los nombres de Figma (Light, Dark, Desktop, Mobile). Aplicado ya en el bloque 0 y en los módulos 1 y 2.
- **V05:** cada sección nueva necesita su `meta.json` con `title` (ya añadido en `content/README.md`). Al traducir al inglés, crear también `content/en/NN-seccion/meta.json`.
- **V02:** mientras falte el inglés, `/en/…` muestra el español con un aviso. Puede citarse en "Cómo se hizo esta web".
- **V06–V12 (módulo 6, itinerario de código):** la cadena Figma → normalización → Resolver DTCG → Terrazzo → dos capas → Tailwind (`docs/paso-7-tokens.md` §8). V09 es buen ejemplo de "separar la fuente de la recomendación": funciona, pero no está documentado, y por eso hay una prueba que lo vigila. V10 completa D07 (cómo se aplica el modo oscuro en CSS).
- **Timing y Easing en Figma (módulo 6; reflejado en los módulos 1 y 2):** existen como tipos de variable. Sin verificar: si se exportan en DTCG y en qué unidad (la ayuda de Figma dice milisegundos; la API de plugins, segundos).
- **Paso 7 (módulo 6):** todo `docs/paso-7-tokens.md`, sobre todo lo que la exportación DTCG de Figma no incluye (tipos y alias, §1) y por qué hace falta normalizar. Candidato a "errores frecuentes": esperar que la exportación de Figma conserve los alias.
- **V01:** en Next.js 16 el middleware se llama `proxy.ts`, y los plugins de MDX con Turbopack se escriben como texto (módulo 6, itinerario de código).
- **V13 (módulo 6):** `next/font` sirve la fuente con un nombre propio, así que el nombre del token (`Inter`) no basta en CSS; la capa de Tailwind pone la variable de `next/font` delante. Candidato a "errores frecuentes": esperar que `font-family: Inter` use la fuente cargada con `next/font`.
- **V14, V15 (módulo 6):** Tailwind no tiene espacio de nombres para el grosor de borde (`border-(length:--t101-border-width-100)`) y los estilos de texto compuestos se escriben como utilidades propias, comprobadas contra la tabla §8.
- **V16 (módulos 3 y 4):** el ancho del sidebar salió en Figma como un valor suelto (305 px) y pasó a token (`size/sidebar/width`): ejemplo de hueco que aparece al llevar el diseño a código.
- **V18, V19 (módulo 9):** cuando el dibujo y la anatomía no coinciden, se decide cuál manda y se registra. Ejemplo para "Componentes y código".
- **V20 (módulo 5):** un logotipo SVG con colores fijos necesita una versión por modo; los tokens no lo cambian solos.
- **V24 (módulo 6; reflejado en el módulo 2):** tokens de movimiento (`duration`, `cubicBezier` de DTCG) que mantenemos solo en código, aunque Figma tiene variables Timing y Easing (precisión del 2026-10-03), y `prefers-reduced-motion`. Candidato para el módulo 7 (accesibilidad).
- **V25 (módulo 3):** un token semántico con transparencia no puede ser alias (un alias no cambia la opacidad): otra excepción a "semánticos siempre alias", como D20.
- **V28 (módulos 3, 5 y 6):** otro semántico con transparencia que no puede ser alias, y además cambia con el modo: un token solo de código por modo, enganchado al modificador del Resolver. `blur/300` como token solo de código. Para el módulo 7: cabecera sticky y 2.4.11 (foco no tapado), `prefers-reduced-transparency`.
- **V26 (módulo 7):** ejemplo de decisión con un riesgo de accesibilidad aceptado y registrado (indicador de opción actual sin forma propia).
- **V10, V21 (módulo 5, itinerario de código):** cómo funciona el selector de tema: `data-theme`, `prefers-color-scheme`, `localStorage` y el script que evita el parpadeo.

**Verificado en el paso 4 (2026-10-03)**
- El bloque 0 compila con `@next/mdx` sin cambios en el MDX.
- Anclas: `rehype-slug` conserva las tildes en el `id` (`qué-define-la-especificación`). El `href` sale codificado (`#qu%C3%A9-…`), y el navegador lo descodifica antes de buscar el `id` ([HTML Standard](https://html.spec.whatwg.org/multipage/browsing-the-web.html#find-a-potential-indicated-element)). Las 76 anclas de "En esta página" tienen destino, 34 de ellas con tildes (`npm run check:content`).

## Diseño

**Estado:** cerrado (2026-10-02). Todo lo que necesita desarrollo está en `docs/entrega-diseno.md`.

**Archivo:** [TokensDS](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS) · plan Professional · perfil de color sRGB.

**Resumen de lo hecho**
- **Variables:** Primitives (97), Semantic color (31, Light/Dark), Semantic size (3) y Layout (9, Desktop/Mobile). Code syntax Web `var(--t101-…)` en todas (D03). No existen en Figma: `line-height/*` (D01), `space/negative/*` (D02) ni `breakpoint/desktop` (D11).
- **Estilos de texto:** 10 (§8 de la especificación, incluido `body/strong`, D17). Interlineado en porcentaje, sin variable (D01). Sin estilos de efecto (S28).
- **Componentes:** 26 (22 + los 4 de `Flow`, D24), con nombres de propiedades iguales a los props de React. Plantillas de lección en escritorio y móvil, Light y Dark, y menú móvil abierto.
- **Auditoría final (2026-10-02):** sin valores sueltos (salvo logotipos, D22), todo el texto con estilo, todos los `focus` con anillo `border/focus`, contraste de textos ≥ 4,5:1 e iconos ≥ 3:1 en Light y Dark, objetivos ≥ 24 × 24 px.

**`Flow` (C13): diseñado y aprobado por Oscar el 2026-10-04 (D24)**
- `Flow`, `FlowGroup` (`size` `large` / `small`, solo de Figma), `FlowStep` (5 variantes) y `FlowConnector` en la página Components; el gráfico de la metodología en cuatro marcos (Desktop / Mobile × Light / Dark) en Pages. Nodos, medidas y notas para desarrollo en `docs/entrega-diseno.md` §3.3; diferencias con la anatomía en `componentes-v1.md` §4.10.
- Auditoría: sin valores sueltos, todo el texto con estilo, contraste igual que la tabla de §3.7, pasos con enlace de 154 × 65 px o más.
- **Siguiente: la sesión de desarrollo lo implementa** (paso 2 del orden de C13).

**Pendiente**
- A14: nombre del logotipo ("design-tokens 101" frente a "Tokens101"). No bloquea.
- Ver a mano cómo muestra Dev Mode el code syntax `var(--t101-…)` en el panel Inspect (D03).
- `tools/semantic.py` no incluye todavía los tokens de D06, D12 y D20 (el contraste se comprobó en Figma y con un cálculo aparte).

## Desarrollo

**Estado:** pasos 4, 7 y 8 hechos (2026-10-03). La web se ve con el diseño en Light, Dark y system, en móvil y escritorio. Siguiente: lo pendiente de abajo y el despliegue en Vercel.

**Paso 8 (2026-10-03): hecho** (V13–V22)
- **Bloque A, base:** Inter y JetBrains Mono con `next/font` (V13), estilos de texto de §8 como utilidades `type-*` (V15, `src/styles/text-styles.css`), grosor de borde con `border-(length:--t101-border-width-*)` (V14), estilos base, anillo de foco (`focus-ring`, `focus-ring-inset`) y flujo del texto (`flow`) en `src/styles/base.css`. Token `size/sidebar/width` (V16).
- **Bloque B, componentes:** `Button`, `IconButton`, `TextLink` (el `Link` de la anatomía), `Callout` (V18), `InCode`, `CodeBlock` (con `filename` desde el MDX gracias a `tools/rehype-code-meta.mjs`), `Code`, tabla y `LessonHeader`. Iconos de Lucide (`lucide-react`, ISC, D08).
- **Bloque C, estructura:** `SiteHeader` (D19), `Sidebar` (C11, fijo en escritorio, V17), panel móvil como `<dialog>` (D21, V22), `ThemeToggle` (D07, V10, V21), `LanguageSwitcher`, `SkipLink`, `PageNav` y `SiteFooter` (P7).
- **Bloque D, logotipos:** versiones para Dark (V20) y enlace "Tokens101, inicio" (D22).
- `npm run check:tokens` compara además los estilos de texto con la tabla §8 (probado en negativo) y vigila `w-sidebar`, `font-mono` y la sintaxis de borde.

**Comprobación del contenido: bloque 0 actualizado y módulo 1 (2026-10-03)**
- `npm run build`: compila sin errores; 13 lecciones × 2 idiomas (26 rutas). `npm run check:content`: sin errores, 174 anclas (56 con caracteres no ASCII), enlaces internos y orden del sidebar.
- Sidebar: sección "Fundamentos" (`meta.json`, V05) con sus 5 lecciones en orden. Anterior/siguiente: "Cómo se hizo" → "Qué es un token" y "Ejercicio" → "Fuentes consultadas".
- `Callout` dentro de `InCode` (`/es/start-here/figma-dtcg-tailwind`), Light y Dark, 375 y 1440 px: se ve dentro del bloque sin desbordar; conserva la etiqueta "Aviso" y su fondo propio (`background/warning/subtle`). Contraste de etiqueta y texto sobre ese fondo: 4,77:1 en Light y 10,32:1 en Dark. El `InCode` se alcanza con el tabulador, muestra el anillo de foco y se abre y cierra con Enter y con Espacio (`aria-expanded` y `hidden` cambian).
- Módulo 1 a 320 px: ninguna de las 5 páginas tiene scroll horizontal de página (1.4.10). Las 7 tablas más anchas que la columna (hasta 630 px en `composite-types`) y los bloques de código se desplazan dentro de su contenedor (`overflow-x: auto`, enfocable).
- Hecho con Chrome sin interfaz (`puppeteer-core`) sobre `next start`. Sin prueba manual ni con lector de pantalla.
- **`$description` de `duration/200` corregido** (V24): ahora dice que Figma tiene variables Timing, pero se aplican a Figma Motion. El de `easing/standard` no hablaba de Figma y no cambia. `npm run tokens` y `npm run check:tokens`: sin errores; solo cambia el comentario en `src/styles/tokens.css`.
- Detalle visual menor, sin cambiar: a 375 px, un `Code` en línea que salta de renglón deja un trozo de su fondo al final de la línea anterior (pasa en cualquier párrafo, no solo en el `Callout`).

**`Flow` (C13, D24): hecho (2026-10-04)**
- `src/components/Flow.tsx`: `Flow`, `FlowGroup`, `FlowStep` y `FlowConnector` (interno), registrados en `src/mdx-components.tsx`. Anatomía de `componentes-v1.md` §3.7 y medidas de `entrega-diseno.md` §3.3, solo con tokens y sin anchos fijos.
- HTML: `figure` + `figcaption`; `ol` de primer nivel y `ol` anidada por grupo (con `aria-labelledby` al título del grupo). `Flow` y `FlowGroup` ponen los `li`; el conector (`li:arrow-down`, `aria-hidden`) va dentro del `li` del elemento siguiente, sin `li` propio. `FlowStep` con `href` es un único `Link` de next-intl; su nombre accesible es "título, meta" (coma oculta, para que se separen en cualquier navegador). Un paso `pending` no lleva enlace aunque tenga `href`.
- Sin prop `size` (D24): pasos apilados a todo el ancho por debajo de 64rem y en fila con `flex-wrap` desde 64rem (`desktop:`, D11).
- Foco: el borde `border/accent/default` se queda y el anillo `focus-ring` va por fuera; la caja mide lo mismo con y sin foco (152,9 × 64,4 px). Hover: borde `border/accent/strong`, título e icono `text/accent/hover`.
- Comprobado en Chrome sin interfaz (`puppeteer-core`, `next start`) con una página temporal con el ejemplo de §3.7 y pasos sueltos (borrada): 320, 375 y 1440 px en Light, Dark y system, sin scroll horizontal de página; coincide con los marcos de Figma 64:843 y 64:1386. Teclado: solo los pasos con `href` reciben foco, en el orden del HTML. Árbol de accesibilidad: figura → lista de 5 → listas con el nombre de cada fase. Sin prueba manual ni con lector de pantalla.
- No se encontraron diferencias entre el diseño y la anatomía. `npm run build && npm run check:content`: sin errores.

**Gráficos `Flow` del bloque 0: comprobados (2026-10-04)**
- Páginas de la sesión de contenido: `05-what-we-teach` (metodología, 5 grupos, 10 pasos, 1 con enlace) y `04-figma-dtcg-tailwind` (recorrido, 7 pasos sueltos, sin enlaces).
- `npm run build && npm run check:content`: sin errores.
- Chrome sin interfaz (`puppeteer-core`, `next start`), Light y Dark a 320, 375 y 1440 px: sin scroll horizontal de página; ningún paso ni grupo sale de la figura; conectores entre cada dos elementos (4 y 6); los pasos de un grupo apilados por debajo de 64rem y en fila desde 64rem; los pasos sueltos centrados y con el ancho de su texto, y los textos largos bajan de línea a 320 px. Teclado: en la metodología solo "Fundamentos" recibe foco (`/es/fundamentals/what-is-a-token`); en el recorrido, ninguno. Coincide con los marcos de Figma.
- Sin nada que corregir en el MDX. Sin prueba manual ni con lector de pantalla.

**`ColorScale` y módulo 2 con los cambios de Oscar (2026-10-04)**
- `src/components/ColorScale.tsx` (C14, anatomía de `componentes-v1.md` §3.8), registrado en `src/mdx-components.tsx`. El color de cada muestra es el code syntax Web del primitivo (`var(--t101-color-{palette}-{paso})`) y el hex sale de `tokens/dtcg/primitives/Value.tokens.json` al compilar; nada escrito a mano. Si falta un paso, el hex no tiene 6 cifras o hay `highlight` sin `highlightLabel`, el build falla.
- `figure` + `figcaption`; `ol` de 11 pasos; muestra con `aria-hidden`, alto `space/1200`, `radius/control`, borde `border/neutral/default` de 1 px (`border/neutral/strong` de 2 px en el paso destacado). Número en `label/default`, hex en `caption/default` (`text/neutral/subtle`) y etiqueta en `caption/default`, todo sobre el fondo de la página. 4 por fila por debajo de 64rem y 11 desde 64rem (D11).
- **Build:** fallaba por el frontmatter de `99-resources/01-sources` (dos puntos sin comillas tras C15); entrecomillado. `npm run build && npm run check:content`: sin errores, 22 lecciones × 2 idiomas, 310 anclas (108 no ASCII).
- Chrome sin interfaz (`puppeteer-core`, `next start`), Light y Dark a 320, 375, 1024 y 1440 px, en `color-scales`, `status-colors`, `color-space` y `what-is-tokens101`: sin scroll horizontal de página. `ColorScale`: 11 pasos, 3 filas (4 + 4 + 3) a 320 y 375 px y 1 fila desde 1024 px; ningún paso sale de la figura; el texto cambia con el modo y las muestras no. A 1024 px el hex más ancho (60 px) no cabe en su paso (55 px) y baja una letra; cabe desde ~1060 px (V29). `Flow` de `color-scales`: 7 pasos y 6 conectores; `Flow` nuevo de `color-space`: 6 pasos y 5 conectores; ninguno se sale de la figura.
- Árbol de accesibilidad: figura → lista → 11 elementos; cada uno se lee "500, #33CC99, Color de marca" (comas ocultas), sin la muestra. Chrome no da nombre a la figura a partir del `figcaption` (pasa también con `Flow`); el pie se lee igualmente como texto. Sin prueba con lector de pantalla.
- Hex: los 55 de las 5 escalas coinciden con `tools/scales.json` (comprobados 50, 500 y 950 de cada una a mano, y todos con un script), y el color pintado en la muestra coincide con el hex mostrado.

**Módulo 2: comprobado (2026-10-04)**
- `npm run build`: compila sin errores; 22 lecciones × 2 idiomas. `npm run check:content`: sin errores, 302 anclas (104 con caracteres no ASCII), enlaces internos y orden del sidebar. No hizo falta tocar el MDX.
- Sidebar: sección "Primitivos" con sus 9 lecciones en orden; en una lección del módulo, solo esa sección abierta (C11). Anterior/siguiente: "Ejercicio" del módulo 1 → "Qué es un primitivo" y "Ejercicio" del módulo 2 → "Fuentes consultadas" (y al revés).
- `Flow` de `color-space` (5 pasos, 4 conectores) y `color-scales` (7 pasos, 6 conectores), Light y Dark a 320, 375 y 1440 px: sin scroll horizontal de página, ningún paso sale de la figura ni desborda su caja. Las metas largas caben en una línea incluso a 320 px (el paso más ancho mide 258 px en una columna de 288), así que no llegan a bajar de línea; el salto de línea ya se comprobó con los textos del bloque 0. Borde `border/accent/default` en cada modo.
- Enlaces nuevos: el paso "Primitivos" del `Flow` de `what-we-teach` recibe foco con el tabulador (anillo de 2 px) y lleva a `/es/primitives/what-is-a-primitive`. Los 7 enlaces añadidos en `04-figma-dtcg-tailwind` y el módulo 1 llegan a su página; el ancla `#para-qué-sirve-el-scope` existe.
- 320 px: ninguna de las 9 páginas tiene scroll horizontal de página (1.4.10). Las tablas más anchas que la columna (las de escalas de color, de 5 columnas y 417 px; la más ancha, 610 px en `what-is-a-primitive`) y los bloques de código se desplazan dentro de su contenedor (`overflow-x: auto`, enfocable).
- `python3 tools/scales.py` y `python3 tools/semantic.py`: sin errores; las 17 comprobaciones de contraste de `semantic.py`, OK.
- Hecho con Chrome sin interfaz (`puppeteer-core`, `next start`). Sin prueba manual ni con lector de pantalla.

**Correcciones de Oscar (2026-10-03, V23–V27)**
- `SidebarItem` sin radio (V23).
- Panel móvil lateral desde la izquierda, con overlay `color/background/overlay`, animado y con la página bloqueada (V25, sustituye a D21). Pulsar el overlay o Escape lo cierran con animación.
- Acordeón del sidebar animado (V24). Tokens solo de código `duration/200` y `easing/standard`; sin animación con `prefers-reduced-motion`.
- `InCode` animado igual que `SidebarSection` (V24): filas de rejilla de `0fr` a `1fr` con `duration/200` y `easing/standard`; cerrado queda `invisible` (fuera del tabulador). Comprobado en Chrome sin interfaz: altura intermedia a 80 ms al abrir y al cerrar, 0 px e `invisible` cerrado, y sin transición con movimiento reducido.
- Selectores de idioma y tema sin marca inferior (V26). **Riesgo de accesibilidad aceptado** (1.4.1 y 1.4.11).
- Ancho máximo del contenido a 960 px (V27): cambiado en Figma, reexportado y regenerado.
- **Cabecera sticky (V28):** se queda arriba en móvil y escritorio, con `background/neutral/translucent` (90 %) y `backdrop-blur-300`; el sidebar queda sticky debajo. Tokens nuevos en `tokens/code-only.{light,dark}.tokens.json` (el color, por modo) y `tokens/code-only.tokens.json` (`blur/300`); `npm run check:tokens` los vigila. Comprobado en Chrome sin interfaz: cabecera en `top: 0` y sidebar a 77 px tras 1500 px de scroll; ancla a 100 px del borde (cabecera de 77); 42 paradas de tabulador en el contenido, ninguna tapada; fondo `rgba(255,255,255,.9)` / `rgba(5,12,9,.9)` y opaco con transparencia reducida; panel móvil sin cambios; sin scroll horizontal a 320 px.
- Comprobado en Chrome sin interfaz: entrada y salida animadas, scroll de la página bloqueado, foco en "Cerrar menú" al abrir y de vuelta en "Abrir menú" al cerrar, acordeón invisible al cerrarse (fuera del tabulador) y sin transición con movimiento reducido.

**Paso 8: comprobación en navegador (2026-10-03)**
- Hecha con Google Chrome sin interfaz (`puppeteer-core`) sobre `next start`: la extensión de Chrome no estaba conectada en la sesión. No se ha probado a mano ni con lector de pantalla.
- 320 px: ninguna de las 16 páginas tiene scroll horizontal (1.4.10).
- Teclado: todas las paradas de tabulador muestran el anillo (2 px, `border/focus`). Orden: SkipLink → logotipo → idiomas → temas → sidebar → contenido. El SkipLink lleva el foco al `main`.
- Objetivos: todos ≥ 24 × 24 px fuera de los enlaces dentro del texto (excepción de 2.5.8). Selectores de 35–36 px, filas del sidebar de 36 y 40 px, `IconButton` de 40.
- ThemeToggle: `dark` pone `data-theme` y se mantiene al recargar; `system` sigue a `prefers-color-scheme`; `light` gana a un sistema oscuro. El logotipo cambia con el tema.
- `InCode`, secciones del sidebar (C11, también tras navegar), copiar código ("Copiado" y portapapeles) y panel móvil (Escape cierra y el foco vuelve al botón): funcionan.
- 375 y 1440 px comparados con las plantillas de Figma (35:843, 35:1479, 52:487, 55:833): coinciden salvo las diferencias de abajo.

**Paso 8: diferencias con Figma que conviene confirmar** (se ha seguido la anatomía, como en V18)
- Pie: todo el texto en `text/neutral/subtle` (anatomía §4.8); en Figma, "Una web creada por: Oscar Carballido" va en `text/neutral/default`.
- `LessonHeader`: la primera línea es el nombre de la sección (prop `section`, §4.1); en Figma pone "01".
- `Button`: Figma usa `min-height` 40 px y `min-width` 100 px sin token; en código no se aplican (sin icono mide unos 36 px de alto, ≥ 24). `Button` no se usa todavía en ninguna página.
- Hueco entre el texto del enlace y el icono externo: `space/100` (Figma: `space/200` en `size=default`, `space/150` en `small`).

**Pendiente o sin verificar**
- **Diseño:** crear la variable `size/sidebar/width` (304 px) en Semantic size de Figma; al reexportar, quitarla de `tokens/code-only.tokens.json` (V16).
- **Diseño:** crear `color/background/overlay` (negro al 50 %, Light y Dark) en Semantic color y quitarlo de `tokens/code-only.tokens.json` al reexportar (V25). Dibujar el panel lateral (V25) y quitar la capa `Marker` de los selectores (V26).
- **Diseño:** crear `color/background/neutral/translucent` (Light `white` y Dark `neutral/950`, al 90 %) en Semantic color y quitar `tokens/code-only.{light,dark}.tokens.json` al reexportar (y su entrada del Resolver) (V28). Dibujar la cabecera translúcida.
- **Diseño:** actualizar la descripción de `size/content/max-width` en Figma (dice 720 px; ahora es 960 px, V27).
- **Filas del sidebar:** la diferencia de radio con Figma queda resuelta por V23.
- `/favicon.ico` da 404: no hay favicon en el diseño.
- `next/font/google` descarga las fuentes al compilar: el build necesita red (en local funciona; en Vercel, sin probar).
- Lector de pantalla y prueba manual en Safari y Firefox: sin hacer.
- `npm` bloquea el `postinstall` de `@swc/core`, que llega como dependencia de next-intl. No hace falta para el enrutado, y el build funciona sin él.
- Despliegue en Vercel: sin probar.

**Paso 7 (2026-10-03): hecho** (V06–V12, detalle en `docs/paso-7-tokens.md` §8)
- `npm run tokens`: `tools/figma-to-dtcg.mjs` normaliza `tokens/figma/` en `tokens/dtcg/`. Después, Terrazzo genera `src/styles/tokens.css` (capa 1, `--t101-*`: 153 en `:root` tras V16, V24 y V25, 31 en cada bloque Dark y 9 en Desktop) y `src/styles/theme.css` (capa 2, `@theme inline` con 87 variables y sin tema por defecto).
- Tokens solo de código en `tokens/code-only.tokens.json`: line-height, space negativo, breakpoint, `duration/200` y `easing/standard` (V24), y, hasta que existan en Figma, `size/sidebar/width` (V16) y `color/background/overlay` (V25).
- `npm run check:tokens`: code syntax de Figma, referencias, bloques de modo, hex, tokens solo de código y clases de Tailwind. Probado también en negativo.
- `globals.css` importa las dos capas (y, desde el paso 8, los estilos de texto y los estilos base).
- Al cambiar las variables en Figma: reexportar en `tokens/figma/` (C10), `npm run tokens`, `npm run check:tokens` y commit de todo lo generado.

**Paso 7: lo encontrado**
- La exportación de Figma no es DTCG completo: tamaños como `number` sin unidad, `font-weight` como `number` (scope `FONT_STYLE`), familia como `string` (no es un tipo DTCG) y **alias resueltos**, con la referencia solo en `com.figma.aliasData`. Ninguna herramienta la usa tal cual: hace falta un paso de normalización (probado: 82 alias recuperados).
- Comparación Style Dictionary 5.5.5 / Terrazzo 2.7.1 con la entrada normalizada: las dos dan `var()` y hex. Terrazzo une los modos con el Resolver de DTCG 2025.10. Style Dictionary convierte mal `64rem` → `4rem`. El plugin de Tailwind de Terrazzo no encaja con las dos capas (S7). Recomendación: Terrazzo + hex.
- A12: los espacios de nombres por propiedad de Tailwind (`--background-color-*`, `--text-color-*`…) dan `bg-neutral-default` / `text-neutral-default`. Funcionan en 4.3.3, pero **no están documentados**.

**Hecho (paso 4)**
- Next.js 16.3 (App Router, Turbopack) + TypeScript 7 + Tailwind CSS 4.3 (solo `@import "tailwindcss"`, sin colores ni tipografías) + next-intl 4.14 (`en` por defecto, `es`) + `@next/mdx` con `remark-frontmatter`, `remark-mdx-frontmatter`, `remark-gfm` y `rehype-slug` (V01).
- Rutas `/{locale}/{seccion}/{leccion}` generadas en estático desde `content/` (`src/lib/content.ts`): el prefijo `NN-` ordena y no sale en la URL. `title` → `h1` y `<title>`; `description` → `<meta>`; `nav_title` → sidebar.
- Componentes provisionales sin estilo en `src/components/`: `Callout` (4 variantes, etiqueta fija traducida), `InCode` (botón con `aria-expanded`, cerrado por defecto), `Sidebar` (`nav` con `aria-label`, secciones con `aria-expanded`, `aria-current="page"`) y `LessonHeader`. Los enlaces internos del MDX pasan por el `Link` de next-intl.
- `npm run check:content` (`tools/check-content.mjs`, después de `npm run build`): comprueba las anclas, el orden del sidebar, `aria-current` y los enlaces internos en las 16 páginas. Se probó también en negativo (detecta un `id` roto).
- Lecciones sin traducir en español con aviso (V02); prefijo de idioma siempre (V03); `/{locale}` redirige a la primera lección (V04); nombres de sección en `meta.json` (V05).

**Para los pasos 7 y 8 (de la sesión de diseño):** ver `docs/entrega-diseno.md`.
- Hay un estilo de texto más, `body/strong` (§8): en CSS es `font-weight: var(--t101-font-weight-600)` sobre `body/default`.
- Colección Layout (modos Desktop y Mobile): en CSS, Mobile es el valor por defecto y Desktop va en `@media (width >= 64rem)` (D11). `breakpoint/desktop` es solo de código.
- `line-height/*` y `space/negative/*` no vienen en la exportación de Figma: se generan desde `docs/sistema-tokens-v1.md` §4 (D01, D02).
- Comprobar con qué `$type` exporta Figma las variables Number de `font-weight/*` (D04) y qué `colorSpace` escribe en el color.
- Los estilos de texto no se exportan en DTCG: la fuente es la tabla §8.

## Hallazgos que afectan a otros frentes

- **2026-09-30: Color en Figma.** La importación DTCG de Figma solo admite color en sRGB y HSL, dimensiones en `px`, duraciones en `s` y la familia tipográfica como un único nombre (Figma: Modes for variables).
- **2026-09-30: DTCG.** La versión 2025.10 (Format, Color y Resolver) es un *Final Community Group Report* del 28/10/2025. No es un estándar del W3C, pero se declara estable.
- **2026-09-30: npm.** En el entorno de la sesión de contenido, el registro de npm devuelve 403. Si pasa lo mismo en desarrollo, el build habrá que hacerlo en local o en Vercel.
- **2026-09-30: MCP de Figma usa el code syntax (sesión de diseño).** `get_design_context` escribe las variables con su code syntax Web y un valor de reserva: `gap-[var(--t101-space-200,8px)]`. Material para el módulo 10.
- **2026-09-30: Scopes en la API de plugins (sesión de diseño).** Solo hay un scope `GAP` para gap y padding de auto layout. La ayuda de Figma los enumera por separado en la interfaz, pero la API no permite separarlos.
- **2026-10-03: npm funciona en la sesión de desarrollo** (Claude Code, en local). El 403 de la sesión de contenido no se repite.
- **2026-10-03: Anclas con tildes (sesión de desarrollo).** El `id` conserva la tilde y el `href` sale codificado; funciona porque el navegador descodifica el fragmento. Si alguien compara los `href` con los `id` como texto, parecerán rotos aunque no lo estén.
- **2026-10-03: Claude Code y los Projects.** Claude Code no lee los documentos de un Project de claude.ai; carga `CLAUDE.md` y los archivos que importa con `@ruta` ([Claude Code: Memory](https://code.claude.com/docs/en/memory)). Por eso la fuente de verdad pasa al repositorio (P9).
- **2026-10-03: `next/font` y el token de familia (sesión de desarrollo).** `next/font` renombra la fuente; el nombre que guarda Figma (`Inter`) no la encuentra. Se resuelve en la capa de Tailwind (V13), sin tocar el token.
- **2026-10-03: Timing y Easing en Figma (sesión de contenido).** Figma tiene variables Timing y Easing, aplicables a animaciones de Figma Motion. V24 está corregido; El `$description` de `duration/200` en `tokens/code-only.tokens.json` decía "Figma no tiene variables de duración"; **corregido por la sesión de desarrollo (2026-10-03)**, con el CSS regenerado.
- **2026-10-03: Peso en Figma (sesión de contenido).** La ayuda de Figma lista el peso entre los scopes de las variables Number ([Create and manage variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)): D04 tiene ahora fuente oficial además de la prueba.
- **2026-10-04: Espaciado negativo y CSS (sesión de contenido).** En CSS, `gap` y `padding` no admiten valores negativos ([MDN: gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap), [MDN: padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)); la superposición se hace con márgenes negativos ([MDN: margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)). Un gap negativo de Figma tampoco se copia tal cual en CSS: refuerza D02. Reflejado en la lección Espaciado.
- **2026-10-04: `$root` en DTCG 2025.10 (sesión de contenido, para el módulo 4).** Los grupos pueden contener un token con el nombre reservado `$root` ([Format Module: Groups](https://www.designtokens.org/TR/2025.10/format/#groups)). No cambia la regla 4 de `sistema-tokens-v1.md` §5.2 (hoja explícita con `/default`), pero el módulo Nombrar debe mencionarlo para no decir que DTCG no tiene alternativa.
- **2026-10-04: Figma acepta oklch en el selector de color (sesión de contenido).** El modelo CSS del selector admite `oklch()`, `oklab()` y `color(display-p3 …)`, y Figma guarda el valor en el espacio de color en que se escribe, sin convertirlo ([Figma: Color models](https://help.figma.com/hc/en-us/articles/360043042113)). No cambia S9 (guardamos sRGB): la importación DTCG sigue admitiendo solo sRGB y HSL. **Sin verificar:** qué `colorSpace` exporta una variable cuyo valor se escribió en oklch, y cómo se ve un oklch fuera de sRGB en un archivo sRGB. Reflejado en la lección Espacio de color del módulo 2.
- **2026-10-04: Referencias de `tools/scales.py` (sesión de contenido).** Coinciden con el CSS fuente de Tailwind CSS 4.3.3. El script calculaba el contraste sin redondear; corregido (S30).
- **2026-10-03: Diferencias entre el dibujo y la anatomía (sesión de desarrollo).** Etiqueta del `Callout`, viñetas de "En esta página", radio del sidebar, color del pie y primera línea de `LessonHeader`. Las dos primeras las decidió Oscar (V18, V19); las demás están en Desarrollo → "diferencias con Figma". Para diseño: crear `size/sidebar/width` (V16).
