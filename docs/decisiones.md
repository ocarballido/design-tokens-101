# Tokens101 — Decisiones

Registro de las decisiones tomadas para el curso Tokens101 y su web. **Si algo aquí contradice una conversación, prevalece este documento.**

Estados: **Cerrada** (no se reabre sin motivo) · **Provisional** (se puede cambiar antes de publicar) · **Abierta** (por decidir).

## Protocolo entre sesiones (leer primero)

Tokens101 se trabaja en varias sesiones de Claude: **contenido** y **diseño** (en claude.ai) y **desarrollo** (en Claude Code). Ninguna ve las conversaciones de las otras. **Desde el 2026-10-03, la fuente de verdad compartida es este repositorio** (`docs/`, `content/`, `tools/`). El Project "Figma" de claude.ai ya no es la fuente de verdad: solo apunta aquí.

**Qué es cada documento**

| Documento | Qué es | Quién lo cambia |
|---|---|---|
| `docs/sistema-tokens-v1.md` | **Qué es** el sistema de tokens (la especificación) | Cualquier sesión, solo con aprobación de Oscar |
| `docs/componentes-v1.md` | **Anatomía** de los componentes (props, partes, tokens por estado) | Cualquier sesión, solo con aprobación de Oscar |
| `docs/entrega-diseno.md` | **Entrega** del diseño a desarrollo (dónde está cada cosa en Figma y cómo pasa a código) | Sesión de diseño |
| `docs/decisiones.md` (este) | **Por qué y cuándo** se decidió cada cosa | Cualquier sesión, a la vez que cambia la especificación |
| `docs/estado.md` | **En qué punto** está cada frente | Cada sesión, su propio apartado |
| Archivo de Figma | La **implementación** visual de la especificación, no una fuente de decisiones | Sesión de diseño |
| `content/…` | Las lecciones (MDX) | Sesión de contenido |
| `tools/` | Scripts que generan las escalas y comprueban el contraste | Cualquier sesión |

**Reglas**

1. **Un hueco o una contradicción en la especificación no se improvisa.** La sesión que lo encuentra plantea las opciones a Oscar, y **Oscar decide en esa misma sesión**.
2. **Quien decide, escribe.** La sesión registra la decisión aquí y actualiza la especificación en el mismo commit. Antes de escribir, trae la última versión del repositorio (`git pull`) para no pisar cambios de otra sesión.
3. **Numeración por sesión**, para no repetir números: contenido `S`/`P`/`T`/`C`/`A` (series existentes), diseño `D01, D02…`, desarrollo `V01, V02…`.
4. **Se relee `decisiones.md` y `estado.md` al empezar cada bloque de trabajo**, no solo al abrir la sesión.
5. **Los cambios hechos en Figma que alteran la especificación** siguen las reglas 1 y 2, y vuelven a comprobar el contraste afectado.
6. **La sesión de contenido refleja las decisiones en las lecciones.** Lo pendiente se lista en `estado.md` → "Pendiente de reflejar en el contenido".
7. **Commits pequeños y con mensaje claro** que nombren la decisión (`docs: V01 elige Terrazzo`). Los documentos se escriben en español.

Documentos relacionados:
- `docs/fase-1-fundamentos-tokens.md`: teoría de la fase 1, con fuentes. Base del contenido del curso.
- `content/README.md`: convenciones para escribir las lecciones.
- `revision-componentes.md`: historial de la revisión de componentes de la sesión de diseño. Se queda solo en el Project de claude.ai como archivo; lo que necesita desarrollo está resumido en `docs/entrega-diseno.md`.

---

## Producto

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| P1 | El curso se llama **Tokens101**. Es una web que enseña a planificar, crear e implementar tokens de diseño con Figma + DTCG + (opcionalmente) Tailwind CSS. | Cerrada | 2026-09-30 |
| P2 | **Público.** Principal: diseñadores UI/UX; cada lección se puede seguir entera en Figma. Secundario: diseñadores que escriben código (React), con un itinerario de código **opcional** dentro de cada lección. También útil para desarrolladores. | Cerrada | 2026-09-30 |
| P3 | **La IA es el hilo conductor y el módulo final**, no el tema central. El núcleo del curso son los tokens. Que un sistema bien nombrado mejore el resultado de un agente es una **hipótesis** que se comprobará en el módulo final. | Cerrada | 2026-09-30 |
| P4 | **La web usa su propio sistema de tokens**, el que se construye en el curso. Tendrá modo claro y oscuro. Se diseña primero en Figma y luego se desarrolla. | Cerrada | 2026-09-30 |
| P5 | Si el alumno sigue el curso al pie de la letra, obtiene el mismo sistema y estructura de tokens que la web. | Cerrada | 2026-09-30 |
| P6 | **Metodología:** de menos a más; toda afirmación técnica enlaza a su fuente oficial; se separa siempre lo que dice la fuente de la recomendación propia; lo no verificado se marca como pendiente. Honestidad frente a complacencia. | Cerrada | 2026-09-30 |
| P7 | La web incluye un aviso de que se hizo con ayuda de Claude (Anthropic) y la revisión de un humano. | Cerrada | 2026-09-30 |
| P8 | **Autor:** la web se firma como **Oscar Carballido** (antes decisión abierta A10). | Cerrada | 2026-09-30 |
| P9 | **Fuente de verdad en el repositorio** `ocarballido/design-tokens-101` (`docs/`, `content/`, `tools/`). Motivo: Claude Code no lee los Projects de claude.ai; carga sus instrucciones desde `CLAUDE.md` y los archivos que importa ([Claude Code — Memory](https://code.claude.com/docs/en/memory)). Sustituye al Project como lugar compartido. | Cerrada | 2026-10-03 |

## Temario

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| T1 | Módulos: 0 Empezar aquí · 1 Fundamentos · 2 Primitivos · 3 Relaciones (alias y capas) · 4 Nombrar · 5 Modos y temas · 6 De Figma al código · 7 Accesibilidad en los tokens · 8 Ejercicio final · 9 Componentes y código · 10 Preparado para IA · Recursos (fuentes, glosario, errores frecuentes). | Cerrada | 2026-09-30 |
| T2 | Orden didáctico respecto al documento de la fase 1: las **escalas (tema 8) van antes** que alias y capas, porque los alias apuntan a primitivos que el alumno debe haber creado. | Cerrada | 2026-09-30 |
| T3 | **Estructura de cada lección:** introducción breve → "En esta página" con enlaces → contenido con fuentes → cómo se hace en Figma (si aplica) → bloques "En código" opcionales → Fuentes. | Cerrada | 2026-09-30 |
| T4 | Los módulos 9 y 10 no se publican hasta haberlos estudiado y verificado. El módulo 7 necesita investigación propia (W3C/WAI, MDN). | Cerrada | 2026-09-30 |
| T5 | Queda fuera del curso: fundamentos de Figma, plugins de terceros para tokens (se usan las variables nativas y la exportación DTCG de Figma), fundamentos de CSS/React/Tailwind y elección estética. | Cerrada | 2026-09-30 |

## Contenido y técnica

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| C1 | **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, next-intl, repositorio Git, despliegue en Vercel. | Cerrada | 2026-09-30 |
| C2 | **Formato de las lecciones: MDX.** Es lo que usan las documentaciones de Next.js y Tailwind CSS, y lo que recomienda next-intl cuando el contenido varía por idioma. | Cerrada | 2026-09-30 |
| C3 | **Cargador de MDX: `@next/mdx`** (oficial de Next.js). Frontmatter mediante `remark-frontmatter` + `remark-mdx-frontmatter`; tablas con `remark-gfm`; anclas con `rehype-slug`. Los componentes del sistema sustituyen a los elementos HTML en `mdx-components.tsx`. El sidebar, la tabla de contenidos, la búsqueda y la navegación anterior/siguiente se construyen a mano. | Cerrada | 2026-09-30 |
| C4 | El contenido se escribe **portable** (frontmatter YAML, carpetas numeradas, un archivo por idioma) para poder migrar a **Fumadocs Core (headless)** si en el módulo 10 se necesitan búsqueda, `llms.txt` o MCP. Fumadocs UI no se usa: la interfaz es nuestro sistema. | Cerrada | 2026-09-30 |
| C5 | **Idiomas:** inglés (por defecto) y español. Se redacta primero en español; el inglés se hace cuando el español de ese bloque esté cerrado. next-intl gestiona la interfaz y el enrutado; los textos de las lecciones van en MDX por idioma. | Cerrada | 2026-09-30 |
| C6 | **Carpetas:** `content/{locale}/NN-seccion/NN-pagina.mdx`. El orden se controla con prefijos de dos cifras (como la documentación de Next.js), que no aparecen en la URL. Mismos nombres de archivo en todos los idiomas. | Cerrada | 2026-09-30 |
| C7 | **Slugs en inglés** (`/start-here/what-is-dtcg`) en todos los idiomas. | Provisional | 2026-09-30 |
| C8 | **Componentes de contenido:** `<Callout variant="note / warning / recommendation / pending">` e `<InCode title="…">` (plegable). Más los elementos de interfaz: sidebar con acordeón, "En esta página", bloque de código, tabla, enlaces y navegación anterior/siguiente. | Cerrada | 2026-09-30 |
| C9 | **Guía de redacción** adaptada de la de Next.js: frases cortas, voz activa, segunda persona, sin *fácil / rápido / simplemente / solo*, sin "esto" ambiguo. Detalle en `content/README.md`. | Cerrada | 2026-09-30 |
| C10 | **Archivos exportados de Figma en el repositorio:** variables en `tokens/figma/`, **una carpeta por colección** (`primitives/`, `semantic-color/`, `semantic-size/`, `layout/`) y con el **nombre de archivo que pone Figma** (`{Modo}.tokens.json`), sin editarlas a mano; si se reexporta, se sustituyen. Motivo: Figma nombra cada archivo por el modo, y Primitives y Semantic size tienen el mismo modo (`Value`), así que sin carpetas los archivos chocan (comprobado en la primera exportación, 2026-10-03). Logotipos SVG (D22) en `public/brand/`, la carpeta de archivos estáticos de Next.js. Los tokens generados (paso 7) irán en otra carpeta, que decide la sesión de desarrollo. | Cerrada | 2026-10-03 |
| C11 | **Secciones del sidebar:** al cargar cada página, solo está abierta la sección que contiene la lección actual; las demás empiezan cerradas y el alumno las abre a mano. En código, `defaultOpen` = la sección contiene la lección con `current`. Motivo: con los 10 módulos de T1, todas abiertas harían un sidebar demasiado largo; es el comportamiento de la documentación de Next.js. Igual en el panel de navegación móvil (D21). Decisión de Oscar. | Cerrada | 2026-10-03 |

## Sistema de tokens (heredadas de la fase 1)

Detalle y fuentes en `docs/fase-1-fundamentos-tokens.md`.

| # | Decisión | Estado |
|---|---|---|
| S1 | Capas: primitivos + semánticos; tokens de componente solo cuando estén justificados. | Recomendación (a confirmar en el ejercicio de cierre) |
| S2 | Primitivos ocultos al publicar en Figma. | Recomendación basada en Figma |
| S3 | Colecciones separadas por eje: Primitives (1 modo), Semantic color (Light/Dark), Layout (opcional). | Recomendación (Layout creada para los tamaños de texto, D10) |
| S4 | Nombres en minúsculas, kebab-case por segmento, palabras completas (`background`, no `bg`), sin valores ni temas en el nombre. | Acordada |
| S5 | Estados con default explícito (`…/default`, `…/hover`), porque en DTCG un token no puede ser a la vez grupo. | Recomendación (respaldada por SDS) |
| S6 | Code syntax Web en cada variable de Figma, igual a la variable CSS generada. | Recomendación (práctica de SDS) |
| S7 | En código: patrón de dos capas con `@theme inline` (documentado por shadcn/ui). | Estándar documentado |

## Sistema de tokens (ejercicio de cierre de la fase 1)

Detalle, fuentes y valores en `docs/sistema-tokens-v1.md`.

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| S8 | **Marca (antes A1):** Tokens101. Acento HSL(160, 60 %, 50 %) = `#33CC99` (corregido el 2026-09-30; antes HSL(150, 50 %, 60 %)), ajustable. Neutros tintados con el tono del acento. | Cerrada (el valor del acento puede ajustarse) | 2026-09-30 |
| S9 | **Espacio de color (antes A7): opción B.** Las escalas se construyen en oklch y se guardan en sRGB. Los valores sRGB son la fuente de verdad en Figma, y el archivo de Figma usa el perfil sRGB. Sin Display P3. | Cerrada | 2026-09-30 |
| S10 | **Método de escalas de color:** 11 pasos (50–950); curvas L/C de referencia de Tailwind CSS v4; color de marca exacto en su paso; ajuste de gama reduciendo solo el croma. Script `tools/scales.py`. | Cerrada (valores en revisión) | 2026-09-30 |
| S11 | **Neutros:** tinte suave (croma de Tailwind `gray` × 0,5, tono del acento). | Cerrada | 2026-09-30 |
| S12 | **Tipografías:** Inter (interfaz y texto) y JetBrains Mono (código). Ambas con licencia OFL-1.1. | Cerrada | 2026-09-30 |
| S13 | **Escalas primitivas (A5) aprobadas:** color (acento y neutros suaves), espaciado base 4 px (`100` = 4 px), tipografía SDS 12–72 px con body de 16 px (sin 18 px), pesos 400/500/600/700, interlineados 1.2/1.4/1.5, bordes 1 y 2 px, radios 0/4/8/12/16/24/32/48/full. Detalle en `sistema-tokens-v1.md`, secciones 3 y 4. | Cerrada | 2026-09-30 |
| S14 | **Escuela de nomenclatura semántica (antes A2): propiedad primero**, como el SDS de Figma y Atlassian. Matriz reducida (solo las combinaciones que la web necesita) y pares "on-" explícitos para texto sobre color (`color/text/on-accent`). | Cerrada | 2026-09-30 |
| S15 | **Orden de niveles (antes A3):** categoría / propiedad / rol / énfasis / estado, usando solo los niveles necesarios. Ej.: `color/background/accent/default`. | Cerrada | 2026-09-30 |
| S16 | **Primitivos de color por tono** (idea de Oscar): una colección de escalas puras nombradas por su tono (red, amber, green, blue…) además del acento y los neutros; los tokens semánticos de estado (info, success, warning, danger/error) son alias de esas escalas. Nunca nombres de rol en los primitivos. | Cerrada en principio (detalles en A4 y A6) | 2026-09-30 |
| S17 | **Convención de nombres (A4):** 7 reglas y vocabulario de `sistema-tokens-v1.md` §5.2. Rol de error = `danger`; énfasis `default` / `subtle` / `strong`; sin propiedad `icon` (los iconos usan tokens de texto); la paleta primitiva del acento se nombra por su tono (`emerald`, S20). | Cerrada | 2026-09-30 |
| S18 | **Escalas de estado:** `red`, `amber` y `blue` con curvas de Tailwind CSS v4 y croma armonizado (× 0,66). | Cerrada | 2026-09-30 |
| S19 | **`success` usa la escala `emerald`** (la del acento). No hay escala `green`. El éxito se distingue también por icono y texto (WCAG 1.4.1). | Cerrada | 2026-09-30 |
| S20 | La paleta primitiva del acento se llama **`emerald`**. | Cerrada | 2026-09-30 |
| S21 | **Tabla semántica (A6):** 26 tokens de `sistema-tokens-v1.md` §6, todos alias de primitivos. Se añaden los primitivos `color/white` y `color/black`. Tres decisiones se validan visualmente en diseño (§6.3): tratamiento del botón principal, fondo Light y fondo Dark. | Cerrada para empezar el diseño | 2026-09-30 |
| S22 | **Visibilidad y scopes en Figma** (hueco a de la sesión de diseño): primitivos de color ocultos al publicar y sin scopes; semánticos de color con scope por propiedad; espaciado, grosor de borde y radio con primitivos visibles y scope propio; primitivos tipográficos ocultos y con scopes tipográficos. Detalle en `sistema-tokens-v1.md` §7. Sustituye y precisa S2. | Cerrada | 2026-09-30 |
| S23 | **Semánticos de radio:** `radius/control` (inicial `radius/200`, 8 px) y `radius/container` (inicial `radius/400`, 16 px). Valores ajustables en diseño. | Cerrada (valores ajustables) | 2026-09-30 |
| S24 | **Estilos de texto por rol** como capa semántica tipográfica (§8). Valores iniciales ajustables en diseño. En código, la fuente de los estilos compuestos es la tabla §8 (los estilos de texto seguramente no se exportan en DTCG; se verifica en el paso 7). | Cerrada (valores ajustables) | 2026-09-30 |
| S25 | **Interlineado** (hueco b): si Figma acepta una variable Number como multiplicador, se vinculan `line-height/*`. Si no, los estilos usan 120 / 140 / 150 % y el interlineado se genera en código desde la especificación (fuente única: la especificación). **Verificado: se aplica la regla de respaldo (D01).** | Cerrada (resuelta por D01) | 2026-09-30 |
| S26 | **Espaciado negativo** (hueco d): `space/negative/*` solo con scope de gap. Si Figma no admite negativos en gap, pasan a ser tokens solo de código. **Verificado: el scope no puede limitarse al gap; pasan a solo código (D02).** | Cerrada (precisada por D02) | 2026-09-30 |
| S27 | **Prefijo CSS `--t101-`** (hueco e). Con propiedad primero, sin prefijo la capa 1 (`--color-…`) y la capa 2 de `@theme inline` tendrían el mismo nombre (referencia circular). El code syntax Web de cada variable se basa en `--t101-` + ruta con guiones. **Formato verificado: `var(--t101-…)` (D03).** | Cerrada | 2026-09-30 |
| S28 | **Sin estilos de efecto en v1** (hueco f). `color/black` queda reservado para sombras u overlays cuando un componente los necesite. | Cerrada | 2026-09-30 |
| S29 | **Peso tipográfico en Figma** (hueco c): verificado que las variables String se aplican a familia y a peso/estilo ([Figma — Apply variables to designs](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs)). **Para el peso se usan variables Number en su lugar (D04).** La familia sigue siendo String. | Cerrada (el peso lo sustituye D04) | 2026-09-30 |

## Diseño (sesión de diseño)

Resultados de las verificaciones por prueba en el archivo de Figma TokensDS (plan Professional) y decisiones de Oscar en la sesión de diseño. Detalle y fuentes en `sistema-tokens-v1.md` §4 y §7.1.

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| D01 | **Interlineado solo en código** (resultado de S25). Prueba: Figma interpreta una variable Number en el interlineado como píxeles (1.5 → 1.5 px; 150 → 150 px), también en estilos en porcentaje. Se aplica la regla de respaldo: los estilos de texto usan 120 / 140 / 150 % sin variable, y `line-height/*` no se crean en Figma. | Cerrada | 2026-09-30 |
| D02 | **Espaciado negativo solo en código** (precisa S26). Prueba: el gap negativo funciona, pero la API de Figma solo tiene un scope `GAP` que cubre gap y padding, y Figma acepta padding negativo (no válido en CSS). No se puede limitar el token al gap. Oscar decide: `space/negative/*` no se crean en Figma. | Cerrada | 2026-09-30 |
| D03 | **Formato del code syntax Web: `var(--t101-…)`** (precisa S27). Es el formato del ejemplo de la ayuda de Figma. Prueba con el servidor MCP de Figma: `var(--t101-x)` y `t101-x` producen `var(--t101-x, valor)`; `--t101-x` produce `var(----t101-x, valor)` (incorrecto). Falta ver cómo se muestra en Dev Mode. | Cerrada | 2026-09-30 |
| D04 | **Pesos tipográficos como variables Number** (`font-weight/400`, `500`, `600`, `700`), en vez de String (sustituye esa parte de S29). Fuente: Figma admite Number en el peso; en Dev Mode un peso con variable String sale sin referencia a la variable. Prueba: Number 600 → Inter Semi Bold. Decisión de Oscar. | Cerrada | 2026-09-30 |
| D05 | **Reparto del trabajo de componentes:** Oscar diseña los componentes en Figma. La sesión de diseño aporta la anatomía (partes, props, estados, tokens por parte y requisitos de accesibilidad) en `docs/componentes-v1.md` y revisa lo diseñado (variables, nombres de props, foco, objetivos, contraste). | Cerrada | 2026-09-30 |
| D06 | **Callout:** `recommendation` usa el acento (`background/accent/subtle`, `text/accent/default`) y un token nuevo, `color/border/accent/default` (`emerald/300` / `emerald/700`, decorativo). `pending` usa neutros (`background/neutral/subtle`, `border/neutral/strong`, `text/neutral/subtle`). | Cerrada | 2026-09-30 |
| D07 | **ThemeToggle:** `'light' \| 'dark' \| 'system'`; por defecto `system` (respeta `prefers-color-scheme`). | Cerrada | 2026-09-30 |
| D08 | **Iconos:** librería abierta con componentes de Figma y de React del mismo nombre (propuesta: Lucide, licencia ISC; se confirma al empezar a diseñar). **Código sin resaltado de colores en v1.** | Cerrada | 2026-09-30 |
| D09 | **Layout en dos marcos**, escritorio (1440 px) y móvil (375 px). Sin tokens de breakpoint en Figma; el corte se fija en código (D11). Matizada por D10: la colección Layout sí existe, solo para los tamaños de texto. | Cerrada | 2026-09-30 |
| D10 | **Tamaños de texto por contexto** (petición de Oscar): colección **Layout** con modos Desktop y Mobile; 9 tokens `font-size/{estilo}` (uno por estilo de texto), alias de los primitivos `font-size/*`. En móvil los títulos bajan un paso (40→32, 32→24, 24→20; `heading/4` se queda en 20) y el resto no cambia. Los estilos de texto se vinculan a estos tokens. Aplica la colección Layout opcional de S3. | Cerrada | 2026-09-30 |
| D11 | **Breakpoint:** `breakpoint/desktop` = 64rem (1024 px), token solo de código. Mobile por defecto; Desktop con `@media (width >= 64rem)` (`lg` de Tailwind CSS v4). Mismo corte para tipografía y para el sidebar. | Cerrada | 2026-09-30 |
| D12 | **Tokens de estado de los controles** (pregunta de Oscar sobre los estados): `color/background/neutral/hover` (`neutral/100` / `neutral/800`), `color/background/neutral/active` (`neutral/200` / `neutral/700`), `color/text/accent/hover` (`emerald/800` / `emerald/300`) y `color/border/accent/strong` (`emerald/600` / `emerald/400`, indicador de seleccionado, ≥ 3:1). Regla: en hover y active, el texto de los controles neutros pasa a `text/neutral/default` (con `subtle` sería 3,99:1 en Dark). Sin categoría `action`: lo interactivo se expresa con el nivel de estado (S15). Semantic color pasa a 31 tokens. Detalle en `sistema-tokens-v1.md` §6.4. | Cerrada | 2026-10-01 |
| D13 | **Estado en el lugar del énfasis** (nomenclatura, precisa la regla 4 de §5.2): si un token final de énfasis por defecto necesita estados, el estado ocupa el lugar del énfasis (`text/accent/default` → `text/accent/hover`), sin renombrar ni crear un grupo. Patrón del SDS de Figma (`background-neutral-default` / `background-neutral-hover`). | Cerrada | 2026-10-01 |
| D14 | **Sin disabled en v1.** Ningún control del inventario se desactiva; WCAG exime de contraste a los componentes inactivos (Understanding 1.4.11). Si hace falta, se añade como rol `disabled` (patrón del SDS). Loading no es un token. | Cerrada | 2026-10-01 |
| D15 | **Componente `Button`** con variantes `primary` y `secondary` (anatomía en `componentes-v1.md` §2.2). Permite decidir A13 viéndolo. | Cerrada | 2026-10-01 |
| D16 | **"En esta página" sin componente propio.** Es la lista de enlaces escrita en cada lección (como está en el MDX, T3), y se dibuja con texto, lista y `Link`. Sin columna lateral de índice. Se quitan `TableOfContents` y `TocItem` de la anatomía. | Cerrada | 2026-10-01 |
| D17 | **Estilo de texto `body/strong`** (10.º estilo, `sistema-tokens-v1.md` §8): `body/default` con `font-weight/600`. Motivo: en Figma la negrita aplicada a un fragmento lo separa de su estilo de texto. Lo usan las negritas del MDX y "En esta página". En código, `<strong>` = peso 600. | Cerrada | 2026-10-02 |
| D18 | **`Callout` sin título libre:** etiqueta fija por variante (Nota, Aviso, Recomendación, Pendiente), como C8 y la anatomía. Se quita la propiedad `title` del diseño; la plantilla mostraba "Metodología", que no está en el MDX. Si Oscar quiere títulos libres, es un cambio de C8 para la sesión de contenido. | Cerrada (Oscar pidió cerrar el diseño, 2026-10-02) | 2026-10-02 |
| D19 | **Cabecera en móvil:** en `SiteHeader` `size=small`, el selector de idioma y el de tema se ocultan y pasan al panel de navegación que abre el botón de menú (a 375 px no caben junto al logotipo). | Cerrada | 2026-10-02 |
| D20 | **Ancho máximo del contenido:** token `size/content/max-width` = 720 px (45rem) en Semantic size, aplicado a la columna de la lección. Valor directo (excepción a la regla 6: no hay escala de tamaños). Detalle en `sistema-tokens-v1.md` §4.6. | Cerrada | 2026-10-02 |
| D21 | **Panel de navegación móvil a pantalla completa:** el botón de menú abre un panel que ocupa toda la pantalla, con los selectores de idioma y tema arriba y el sidebar debajo; el botón pasa a "cerrar" (`li:x`). Al no dejar ver la página detrás, no hace falta fondo oscurecido ni token con transparencia. | Cerrada | 2026-10-02 |
| D22 | **Logotipos como imagen:** el logotipo de Tokens101 y el del autor se exportan como SVG y quedan fuera de la regla "solo tokens". Están exentos de contraste según Understanding 1.4.11; el enlace del logotipo tiene nombre accesible ("Tokens101, inicio"). | Cerrada | 2026-10-02 |
| D23 | **Cierre de A13 con lo diseñado:** botón principal opción A (`emerald/500` + texto `neutral/950`), fondo Light `color/white`, fondo Dark `neutral/950`. Se pueden reabrir: basta con cambiar alias y recalcular contraste (§6.3). | Cerrada (Oscar pidió cerrar el diseño; reabrible) | 2026-10-02 |

## Desarrollo (sesión de desarrollo, Claude Code)

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| V01 | **Esqueleto (paso 4):** Next.js 16.3, next-intl 4.14, Tailwind CSS 4.3, `@next/mdx` 16.3, TypeScript 7, npm y carpeta `src/`. Lo que dicen las fuentes: en Next.js 16 el middleware se llama `proxy.ts` ([next-intl — App Router](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)); con Turbopack, los plugins de MDX se escriben como texto y con opciones serializables ([Next.js — MDX](https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack)); TypeScript 7 no tiene API de JavaScript y Next.js comprueba los tipos con el CLI `tsc` ([Next.js — TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript#using-typescript-7)). Las lecciones se cargan con `import()` dinámico desde `src/app/[locale]/[section]/[lesson]/page.tsx`, con `generateStaticParams` y `dynamicParams = false`. Configuración en `next.config.ts`. | Cerrada | 2026-10-03 |
| V02 | **Lecciones sin traducir:** si falta `content/{locale}/…/NN-pagina.mdx`, se muestra la versión en español con un aviso `pending` en el idioma de la página, y el `article` lleva `lang="es"` (WCAG 3.1.2). La estructura del sidebar sale de `content/es` (idioma de trabajo, C5). Propuesta de la sesión de desarrollo; Oscar elige la recomendación. | Provisional | 2026-10-03 |
| V03 | **Prefijo de idioma siempre en la URL** (`/en/…`, `/es/…`; `localePrefix: 'always'`, valor por defecto de next-intl). La raíz `/` redirige según el `Accept-Language` del navegador y, si no coincide ninguno, a `/en` (detección de next-intl). Oscar elige la recomendación. | Provisional | 2026-10-03 |
| V04 | **Sin portada:** `/{locale}` redirige a la primera lección hasta que se diseñe una portada. | Provisional | 2026-10-03 |
| V05 | **Nombre de las secciones en `meta.json`:** cada carpeta de sección tiene un `meta.json` por idioma (`content/es/00-start-here/meta.json` → `{"title": "Empezar aquí"}`). Es la convención de Fumadocs ([Page Conventions](https://fumadocs.dev/docs/page-conventions)), lo que facilita la migración de C4. Sin `meta.json` en un idioma, se usa el español (V02). Oscar elige la recomendación. | Cerrada | 2026-10-03 |
| V06 | **Herramienta: Terrazzo 2.7** (`@terrazzo/cli` + `@terrazzo/plugin-css`), con un **paso de normalización propio** delante (`tools/figma-to-dtcg.mjs`). Lo que dicen las fuentes: la exportación de Figma da los alias entre colecciones solo en `com.figma.aliasData` y usa `string`, que no es un tipo DTCG ([Figma — Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)); el Format Module prohíbe deducir el tipo por el valor ([DTCG 2025.10](https://www.designtokens.org/TR/2025.10/format/)); Style Dictionary declara incompleto el soporte de 2025.10 ([SD — DTCG](https://styledictionary.com/info/dtcg/)). Comprobado: sin normalizar, ninguna herramienta da unidades ni `var()`; el `size/pxToRem` de Style Dictionary convierte `64rem` en `4rem`. La normalización deduce el tipo del scope de Figma y se detiene ante lo no previsto. px → rem con base 16 en la configuración de Terrazzo. Detalle en `docs/paso-7-tokens.md`. Cierra A8 (herramienta). | Cerrada | 2026-10-03 |
| V07 | **Color en hex** en el CSS (cierra A8, formato): es el mismo valor sRGB que exporta Figma (S9), sin conversión ni redondeo. `legacyHex` de `plugin-css` (abrevia: `#3c9`). | Cerrada | 2026-10-03 |
| V08 | **Modos con el Resolver de DTCG 2025.10** (cierra A9): `tokens/tokens101.resolver.json` con un conjunto fijo (Primitives, Semantic size, solo código) y dos modificadores, `theme` (light/dark) y `layout` (mobile/desktop) ([Terrazzo — Resolvers](https://terrazzo.app/docs/guides/resolvers)). Un solo `tokens.css`: `:root` con todo (Light + Mobile) y cada bloque de modo solo con los tokens de su colección (31 / 9). | Cerrada | 2026-10-03 |
| V09 | **Tailwind: espacios de nombres por propiedad** (cierra A12). `@theme inline` con `--background-color-*`, `--text-color-*`, `--border-color-*` (y `--outline-color-focus`, `--ring-color-focus`) → `bg-neutral-default`, `text-neutral-default`, `border-neutral-default`, `outline-focus`. `--*: initial` quita el tema por defecto: solo hay clases que salen de tokens. Los primitivos de color no se exponen (S22). **Riesgo aceptado:** esos espacios de nombres existen en el código de Tailwind 4.3.3 pero no en su documentación, que solo cita `--color-*` ([Tailwind — Theme](https://tailwindcss.com/docs/theme)); `npm run check:tokens` falla si dejan de funcionar. Alternativa documentada si se rompe: `--color-*` con la ruta completa (`text-text-neutral-default`). | Cerrada | 2026-10-03 |
| V10 | **Tema oscuro (D07):** Light en `:root`; Dark con `[data-theme="dark"]` (elegido en el selector) y con `@media (prefers-color-scheme: dark)` sobre `:root:not([data-theme="light"])` (modo `system`). Cada bloque declara `color-scheme`. El `ThemeToggle` (paso 8) solo tiene que poner o quitar `data-theme`. | Cerrada | 2026-10-03 |
| V11 | **Familias de reserva** (hueco de la especificación): `--font-sans` = Inter, `ui-sans-serif, system-ui, sans-serif`; `--font-mono` = JetBrains Mono, `ui-monospace, monospace`. Van en la capa de Tailwind, no en los tokens: Figma solo admite un nombre de familia. La carga de las fuentes (`next/font`) se decide en el paso 8. Propuesta de desarrollo; Oscar elige las recomendaciones. | Provisional | 2026-10-03 |
| V12 | **Carpetas y comandos del paso 7** (C10 deja la carpeta a desarrollo): `tokens/dtcg/` (DTCG normalizado, generado y versionado para enseñarlo), `tokens/code-only.tokens.json` (solo código, escrito a mano desde `sistema-tokens-v1.md` §4), `tokens/tokens101.resolver.json`, `terrazzo.config.mjs` y salida en `src/styles/tokens.css` (capa 1) y `src/styles/theme.css` (capa 2), las dos generadas. `npm run tokens` regenera todo; `npm run check:tokens` lo comprueba. | Cerrada | 2026-10-03 |
| V13 | **Fuentes con `next/font/google`** (Inter y JetBrains Mono, variables, subconjuntos `latin` y `latin-ext`), en `src/app/fonts.ts`. Lo que dice la fuente: `next/font` aloja la fuente en la propia web y la publica con un nombre propio en la variable CSS que indica `variable` ([Next.js — Font](https://nextjs.org/docs/app/api-reference/components/font#css-variables), [Fonts](https://nextjs.org/docs/app/getting-started/fonts)). Por eso el token `font-family/sans` ("Inter") no basta: no coincide con ese nombre. Cómo encaja con V11: la capa de Tailwind queda `--font-sans: var(--font-inter, var(--t101-font-family-sans)), ui-sans-serif, system-ui, sans-serif` (igual con `mono`). La familia de `next/font` va primero; si falta, el nombre del token; después, las de reserva de V11. El token no cambia y sigue saliendo de Figma. | Cerrada | 2026-10-03 |
| V14 | **Grosor de borde en Tailwind:** sin espacio de nombres propio (no existe en Tailwind), con la sintaxis de variable documentada `border-(length:--t101-border-width-100)`, también por lados (`border-b-(length:…)`). Fuente: [Tailwind — border-width](https://tailwindcss.com/docs/border-width) ("Using a custom value"). No se usa `border` sin valor, que escribe `1px`. El anillo de foco usa las utilidades `focus-ring` / `focus-ring-inset` de `src/styles/base.css` (`outline` de `border-width/200` con `border/focus`). | Cerrada | 2026-10-03 |
| V15 | **Estilos de texto (§8) como utilidades de Tailwind** escritas a mano en `src/styles/text-styles.css`: `type-heading-1`, `type-body-default`… Cada una fija familia, tamaño (token de Layout), interlineado y peso con variables `--t101-*`. Fuente de las utilidades propias: [Tailwind — Adding custom utilities](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities). `npm run check:tokens` compara el archivo con la tabla §8. La negrita del texto (`body/strong`, D17) solo cambia el peso en los estilos base, para que herede el tamaño en tablas y Callouts. | Cerrada | 2026-10-03 |
| V16 | **Ancho del sidebar: token `size/sidebar/width` = 304 px (19rem)** en Semantic size, valor directo como D20. Figma lo dibujaba a 305 px sin variable. Mientras no exista la variable en Figma, está en `tokens/code-only.tokens.json`; cuando diseño la cree y se reexporte, se quita de ahí. En Tailwind, `w-sidebar` (`--container-sidebar`). Decisión de Oscar. | Cerrada | 2026-10-03 |
| V18 | **`Callout`: icono y etiqueta en `text/{rol}/default`**, como la anatomía (`componentes-v1.md` §3.2). En Figma la etiqueta ("Nota", "Aviso"…) estaba en `text/neutral/default` y la diferencia no figuraba en §4.10. Se sigue la anatomía, cuyo contraste ya está calculado (≥ 4,5:1 en Light y Dark). Decisión de Oscar. | Cerrada | 2026-10-03 |
| V19 | **"En esta página" con viñetas**, como cualquier lista del MDX (Prose, §3.1). En Figma la lista se dibujó sin viñetas; no se añade código especial ni se cambia el contenido (D16). Decisión de Oscar. | Cerrada | 2026-10-03 |

## Decisiones abiertas

| # | Decisión | Dónde se decide | Bloquea |
|---|---|---|---|
| A11 | Canal para comunicar errores (repositorio público, formulario o correo). | Oscar | Publicación |
| A14 | **Nombre en el logotipo:** dice "design-tokens 101"; P1 fija "Tokens101". No bloquea el desarrollo (el logotipo es un SVG, D22). | Oscar | Publicación |
