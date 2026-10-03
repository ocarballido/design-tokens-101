# Design System preparado para IA — Fase 1: Fundamentos de tokens y nomenclatura

**Documento consolidado** · Versión corregida con fuentes · Cerrado el 30 de septiembre de 2026

Este documento recoge todo lo visto en la fase 1 del plan de aprendizaje, **en su versión corregida**. Sirve como material de base para dos cosas: continuar el estudio en nuevas sesiones y construir la web-curso. Si algo de este documento contradice lo dicho en una conversación anterior, prevalece este documento.

> **Nota (2026-10-03):** documento histórico de la fase 1. Las decisiones posteriores (S8–S29, D01–D23) están en `docs/decisiones.md` y `docs/sistema-tokens-v1.md`, y prevalecen sobre las recomendaciones provisionales de aquí. Ejemplo: el peso tipográfico se guarda como Number, no como String (D04).

---

## 0. Contexto del plan

### Objetivo
Construir un design system cuya estructura y nombres sean compartidos por Figma y por el código, de forma que un agente de IA pueda ir del diseño al componente sin traducir nada. Resultado final: un caso de estudio para portfolio.

### Fases
1. **Fundamentos de tokens y nomenclatura** (esta fase).
2. **El sistema en Figma:** variables en colecciones y modos, alias, scopes, code syntax; componentes construidos solo con variables y con propiedades nombradas como los props de React.
3. **El puente Figma → código:** exportación DTCG desde Figma; comparación **Style Dictionary vs Terrazzo** con archivos reales; generación de CSS y del tema de Tailwind v4.
4. **Componentes en código:** React + TypeScript + Storybook consumiendo los tokens generados, sin valores escritos a mano.
5. **Sistema legible para IA:** Code Connect, servidor MCP de Figma, MCP de Storybook, `AGENTS.md`, `llms.txt`, documentación estructurada.
6. **Prueba y caso de estudio:** de un diseño en Figma a una pantalla generada por un agente, con y sin el sistema preparado.

### Método de trabajo acordado
- Se explica cada concepto **antes** de pedir ningún ejercicio. Los ejercicios llegan al cerrar cada fase.
- Toda afirmación sobre una herramienta se verifica en su **documentación oficial** y se cita la fuente.
- Se distingue siempre entre **lo que dice la fuente** y **la recomendación propia**. Blogs y foros se marcan como tales.
- Antes de proponer una arquitectura propia, se comprueba si los sistemas de referencia ya lo han resuelto.

### Requisitos de plan en Figma (verificados)
- Los **modos de variables** requieren plan Education, Professional, Organization o Enterprise. El plan gratuito (Starter) no aparece en la lista. Professional: hasta 10 modos por colección; Organization: hasta 20.
- Leer variables por **REST API** (`file_variables:read`) es solo Enterprise, según el README de SDS. Hay alternativas por plugin y exportación manual.
- Code Connect y algunas funciones MCP pueden requerir planes de pago: pendiente de verificar en la fase 5.

---

## Tema 1. Qué es un token y qué problema resuelve

**El problema.** Sin tokens, un mismo valor (por ejemplo, el azul de marca) se repite a mano en decenas de sitios de Figma y del código. Cambiarlo obliga a buscar y reemplazar en dos mundos, aparecen variantes erróneas (`#2563EB` frente a `#2564EB`) y el valor suelto no dice para qué sirve: **se pierde la intención**.

**La solución.** Un token es una **decisión de diseño con nombre**. Tiene tres partes:

| Parte | Ejemplo | Qué es |
|---|---|---|
| Nombre | `color.action.primary` | Cómo se llama en todas partes |
| Valor | `#2563EB` | Lo que vale ahora |
| Tipo | `color` | Qué clase de dato es, para que las herramientas sepan tratarlo |

**Token ≠ variable de Figma ≠ variable CSS ≠ clase de Tailwind.** El token es el concepto, independiente de la herramienta. La variable de Figma, la custom property de CSS y la clase de Tailwind son **representaciones** del mismo token. Un sistema bien montado tiene **una sola fuente de verdad** y genera el resto automáticamente.

**Por qué importa para la IA.** Un agente que ve `bg-[#2563EB]` solo ve un número; uno que ve un nombre semántico entiende la intención y puede reutilizar la decisión. Los tokens son el vocabulario compartido con el agente.

---

## Tema 2. Tipos de tokens

Dos familias: **simples** (un valor) y **compuestos** (varios valores que van juntos).

| Tipo | Simple / compuesto | En Figma |
|---|---|---|
| Color | Simple | Variable Color (también en color de sombra y paradas de degradado) |
| Dimensión (espaciado, tamaño, radio, grosor de borde, tamaño de fuente) | Simple | Variable Number, **sin unidad** |
| Opacidad | Simple | Variable Number |
| Tipografía | Compuesto | Variables sueltas (Number para tamaño, interlineado y tracking; String para familia y peso) + **estilo de texto** vinculado a ellas |
| Sombra | Compuesto | **Estilo de efecto** con variables en sus propiedades |
| Movimiento | Simple | Variables de **timing** y **easing** (Figma Motion) |
| Breakpoints | Simple | **Modos de variables** (Figma Design) o **breakpoints nativos** (Figma Sites) |
| Z-index | Simple | No se ha encontrado soporte documentado: se trata como token solo de código |

**Detalles importantes**
- **px frente a rem:** en Figma se trabaja en px; en CSS conviene rem para textos y espaciados (accesibilidad: escala con el tamaño de letra del usuario). La herramienta convierte al generar el CSS.
- **Peso tipográfico:** Figma puede usar texto (`"Semi Bold"`); CSS necesita un número (`600`). Hay que fijar un criterio. DTCG acepta números de 1 a 1000 o nombres predefinidos (`semi-bold`, `bold`…). *(Decidido después: variables Number, D04.)*
- **Interlineado:** mejor un número sin unidad (`1.5`). DTCG lo define como multiplicador del tamaño de fuente. *(Comprobado después: Figma no lo admite como multiplicador, D01.)*
- **Opacidad:** Figma la muestra en porcentaje (40%); CSS la espera en decimal (0.4).
- **Color en DTCG 2025.10:** se guarda como objeto con espacio de color (`colorSpace`, `components`, `alpha`, `hex` opcional), no solo como hex.
- La **fuente de verdad puede ser mixta** (algunos tokens solo en código), pero cada token debe tener **una sola** fuente.

---

## Tema 3. Alias (tokens que apuntan a otros tokens)

Un alias es un token cuyo valor es **otro token**. DTCG trata "alias" y "referencia" como sinónimos. Sirven para expresar decisiones, evitar valores repetidos, crear relaciones semánticas y mantener la coherencia. Son el mecanismo que conecta las capas.

**Sintaxis DTCG:** nombre completo entre llaves, con puntos: `"$value": "{color.blue.500}"`.

**Reglas de la especificación**
1. Las llaves apuntan a **tokens completos**, nunca a grupos.
2. Se permiten **cadenas** de alias; la herramienta sigue la cadena hasta un valor explícito.
3. Las referencias **circulares** están prohibidas y deben dar error.
4. Un alias sin `$type` **hereda el tipo** del token al que apunta.
5. Las herramientas deberían **conservar** las referencias y resolverlas solo cuando necesiten el valor.
6. Existe también la sintaxis JSON Pointer (`$ref`) para apuntar a partes de un valor; la sintaxis de llaves sigue siendo la recomendada. En el proyecto usaremos llaves.

**Consecuencia para los nombres:** los nombres de tokens y grupos no pueden empezar por `$` ni contener `{`, `}` o `.`.

**En Figma:** una variable puede ser alias de otra **del mismo tipo** (clic derecho sobre el valor → *Create alias*), incluso de otra colección. Cada modo puede apuntar a un destino distinto. Según un hilo del foro de 2023, no se puede elegir un modo concreto de la variable destino (pendiente de comprobar en la fase 2).

**Recomendación propia:** máximo dos saltos (componente → semántico → primitivo). La especificación y Figma no ponen límite, pero cada salto dificulta la trazabilidad.

---

## Tema 4. Las capas: primitivos, semánticos y de componente

**Las capas son una convención, no un estándar.** DTCG solo define tokens, grupos y alias, y establece que los grupos son arbitrarios: las herramientas no deben deducir significado de ellos.

**Modelo de Figma (curso *Introduction to design systems*):**
- **Primitivos — el qué.** Definen los valores que existen. Son solo de referencia y no se aplican directamente al diseño. Figma recomienda ocultarlos: seleccionar las variables → *Edit variables* → desmarcar *Show in all supported properties* → marcar *Hide from publishing*.
- **Semánticos — el cómo.** Nombre con significado y propósito; se aplican al diseño. Ejemplo del curso: `surface/brand-contrast` → `pink/400`.
- **De componente — el dónde.** Ejemplo: `button-primary-background-default` → `surface/brand-contrast`. El propio curso indica que son más habituales en sistemas enterprise y que no todos los sistemas los necesitan.
- La base siempre son los primitivos; el resto depende de las necesidades. Conviene planificarlo antes, porque reestructurar después es costoso.

**Equivalencias entre sistemas**

| Nivel | Figma | Material 3 | SAP / Serendie |
|---|---|---|---|
| Valor crudo | Primitive (global) | Reference (`md.ref`) | Reference |
| Intención | Semantic | System (`md.sys`) | Semantic / System |
| Componente | Component-specific | Component (`md.comp`) | — |

**Las capas hacen posible el theming:** al añadir dark mode, cambia a qué primitivo apunta cada semántico, no el nombre del token.

**Recomendación propia para el proyecto:** primitivos + semánticos como base; tokens de componente **solo cuando estén justificados** (cuando el componente se aparta del semántico o necesita cambiarse de forma independiente). Motivo: mantenimiento y un vocabulario pequeño y con significado para los agentes (hipótesis a comprobar en la fase 6).

---

## Tema 5. Modos y temas

**Qué es un modo (Figma):** un juego de valores por variable dentro de una colección; cada modo guarda un valor por variable. Usos: temas de color (incluidos alto contraste y daltonismo), localización con variables string, tamaños de dispositivo con variables numéricas. "Tema" es el concepto; "modo" es el mecanismo.

**Funcionamiento en Figma**
- Modo por defecto = columna situada más a la izquierda.
- Se puede aplicar un modo a capas, frames, componentes, component sets, secciones, grupos y páginas.
- **Auto:** los objetos heredan el modo del contenedor padre, subiendo por la jerarquía hasta encontrar uno asignado; si no hay ninguno, se usa el modo por defecto.
- Las variables pueden cambiar la **variante** de una instancia según el modo del frame padre (útil para layouts responsive).
- **Conflictos de modo:** aparecen cuando un archivo usa una versión antigua de la variable. Se resuelven publicando y aceptando actualizaciones en orden.
- En Figma Design el modo se asigna al frame; no se activa solo por el ancho (hay peticiones en el foro, de 2025).

**Una colección = un eje de variación.** Mezclar ejes en una colección provoca **explosión combinatoria** (el número de combinaciones es el producto de los contextos de todos los ejes). Hay que separar los ejes y hacerlos **ortogonales**: cada eje controla tokens distintos. Regla práctica: un token solo varía en un eje.

**Llevarlo al código**
- El formato DTCG **no tiene modos**. Se resuelven con el **Resolver Module 2025.10** (estable): *sets* (siempre cargados), *modifiers* (ejes) con *contexts* (valores), *resolutionOrder* (gana la última aparición) e *inputs* (selección concreta).
- Un modifier de DTCG equivale a una colección con modos de Figma; cada contexto, a un modo.
- Figma **exporta e importa un archivo DTCG por modo** (clic derecho en un modo → *Export mode*, o en la colección → *Export modes*). Restricciones de importación: dimensiones solo en px, familia tipográfica como un único nombre, duraciones en segundos.
- En CSS, cada modo es un selector que redefine las mismas variables. `prefers-color-scheme` detecta la preferencia del sistema (`light` también cubre "sin preferencia").

**Recomendación propia:** colección *Primitives* (un modo, oculta), colección *Semantic color* (Light/Dark) y, opcionalmente, colección *Layout* (Desktop/Tablet/Mobile).

---

## Tema 6. Anatomía de un nombre

**Taxonomía de Nathan Curtis** (*Naming Tokens in Design Systems*, EightShapes, 2020; fuente de autor, no oficial):
- **Base:** *category* (`color`, `font`, `space`…), *concept* (`action`, `feedback`, `visualization`), *property* (`text`, `background`, `border`, `size`).
- **Modificadores:** *variant* (`primary`, `success`), *state* (`hover`, `focus`, `disabled`), *scale* (enumerada, ordenada, acotada, proporcional o tallas), *mode* (`on-dark`).
- **Objeto:** *component*, *element*, *component group*.
- **Namespace:** *system*, *theme*, *domain*.

**Principios**
1. Evitar homónimos (`type`, `text`).
2. Homogeneidad dentro de un grupo, diferencia entre grupos.
3. Flexibilidad frente a especificidad (`color-success` frente a `color-background-success`).
4. Solo los niveles necesarios.
5. El orden no es universal, pero se repite el patrón: namespace → objeto → base → modificadores. Lo importante es que exista una convención y se cumpla.
6. Tema ≠ modo: son ejes ortogonales.
7. Empezar en local y promocionar a global cuando se reutiliza (tres o más componentes).

**Matiz:** el artículo es de 2020, anterior a los modos de Figma. Hoy el tema **no va en el nombre**: va en los modos.

**Consejos del curso de Figma:** nombres comprensibles y neutros; **palabras completas, sin abreviaturas**; prefijos coherentes; singular o plural según el contexto; sin nombres de marca si hay varias; preparados para crecer.

**Restricciones técnicas**
- DTCG: nada de `.`, `{`, `}` ni `$` inicial.
- Figma: según su soporte en el foro (2024), tampoco admite `{ }`, `.` ni `$` en nombres de variable.
- Siempre minúsculas: DTCG distingue mayúsculas, pero las herramientas pueden producir duplicados al transformar.
- Al importar, Figma convierte los puntos en barras y descarta duplicados.
- **Un token no puede ser también un grupo** en DTCG. Por eso los estados necesitan **default explícito**: `…/background/default` y `…/background/hover` (patrón que también usa SDS de Figma).

---

## Tema 7. Un mismo nombre en Figma, JSON, CSS y Tailwind

### La cadena
```
Figma      color/text/default
JSON       { "color": { "text": { "default": { "$value": … } } } }
CSS        --color-text-default   (o con prefijo: --ds-color-text-default)
Tailwind   @theme inline → --color-… → clase
```

### Figma
- **Code syntax:** cada variable puede tener un nombre de código por plataforma (Web, Android, iOS). Aparece en Dev Mode. Sin él, Dev Mode normaliza el nombre por su cuenta.
- **SDS (Simple Design System de Figma)** genera un script que actualiza el code syntax de todas las variables para que coincida con el CSS del repositorio. Adoptaremos esa práctica.

### Style Dictionary
- Soporta DTCG desde la v4, **pero su documentación advierte que DTCG 2025.10 aún no tiene soporte completo** (trabajo en curso en la v5).
- `name/kebab` forma el nombre a partir de la ruta (con prefijo opcional).
- `size/pxToRem` convierte a rem (base 16 configurable).
- Formato `css/variables`: opción `selector` (útil para modos) y `outputReferences` (conserva los `var()` entre tokens).
- No se ha encontrado en su documentación un formato oficial para Tailwind v4.

### Terrazzo
- Cadena de herramientas nativa de DTCG, con **plugin oficial para Tailwind v4**. Uno de sus autores es editor de la especificación DTCG 2025.10.
- La opción `theme` define la traducción de tokens a namespaces de Tailwind (es la API de clases).
- Los tokens tipográficos compuestos se expanden a la convención de Tailwind (`--text-x`, `--text-x--line-height`…).
- Trabaja con el **Resolver**: una plantilla CSS con `@tz` inyecta cada modo (claro en `@theme`, oscuro en `@variant dark`).

### Tailwind v4
- Configuración **CSS-first** con `@theme` (el archivo `tailwind.config.js` ya no es la vía principal).
- `@theme` para tokens que generan utilidades; `:root` para variables sin utilidades. Las theme variables deben estar en el nivel superior, no anidadas en selectores ni media queries.
- Namespaces principales: `--color-*`, `--font-*` (familia), `--text-*` (tamaño), `--font-weight-*`, `--leading-*`, `--tracking-*`, `--spacing` / `--spacing-*`, `--radius-*`, `--shadow-*`, `--breakpoint-*`, `--ease-*`.
- Para referenciar otras variables hay que usar **`@theme inline`**.
- `--color-*: initial;` elimina la paleta por defecto; `--*: initial;` elimina todo el tema por defecto.
- Modo oscuro manual: `@custom-variant dark (&:where(.dark, .dark *));` o con atributo `[data-theme=dark]`.

### El patrón estándar: dos capas (shadcn/ui)
La arquitectura de dos capas **no es una invención**: es el patrón documentado por shadcn/ui.

```css
:root  { --warning: oklch(0.84 0.16 84); }
.dark  { --warning: oklch(0.41 0.11 46); }
@theme inline { --color-warning: var(--warning); }
```

- Capa 1: variables en `:root` y `.dark`. Capa 2: `@theme inline` las expone como utilidades.
- **No hace falta prefijo** para evitar la referencia circular (`--background` ≠ `--color-background`). El prefijo es útil para evitar colisiones con otras librerías (SDS usa `--sds-`). *(Con la nomenclatura propiedad primero sí hace falta, S27.)*
- shadcn evita la redundancia de nombres con **pares de rol**: `primary` / `primary-foreground`, `background` / `foreground` → `bg-primary`, `text-primary-foreground`.
- Radios derivados de un único `--radius` con `calc()` dentro de `@theme inline`.

### Dos escuelas de nomenclatura semántica
- **Propiedad primero** (SDS, Curtis): `color/text/default`, `color/background/brand/default`. Muy explícita y trazable; redundante en Tailwind si se expone tal cual (`text-text-default`).
- **Pares de rol** (shadcn): `primary`, `primary-foreground`. Clases limpias; menos explícita sobre dónde se aplica.
- *(Decidido después: propiedad primero, S14.)*

### Nota para la fase 5
La documentación de shadcn incluye secciones de `llms.txt`, Skills y un servidor MCP para su registro: el sistema de referencia en Tailwind ya está preparado para agentes. Será un modelo a estudiar.

---

## Tema 8. Escalas

### Color: tres filosofías
- **Tailwind — el número es un orden:** 50, 100…900, 950 (11 pasos), en oklch. SDS usa 100–1000.
- **Material 3 — el número es una medida:** tono (luminancia) de 0 a 100; la diferencia de tono determina el contraste.
- **Radix — el número es una función:** 12 pasos con uso definido (1–2 fondos, 3–5 fondos de componente y estados, 6–8 bordes, 9–10 fondos sólidos, 11–12 texto). Los pasos 11 y 12 garantizan contraste APCA Lc 60 y Lc 90 sobre el paso 2.
- **Dark mode:** los semánticos saltan al extremo opuesto de la escala (en SDS, el texto por defecto pasa de `gray-900` a `white-1000` y el fondo al revés).

### Espaciado
- **Tailwind:** un multiplicador. `p-4` = `calc(var(--spacing) * 4)`, con `--spacing` = 0.25rem por defecto. Acepta cualquier número (`p-17`): la disciplina tiene que venir de fuera.
- **Atlassian:** base 8px = `space.100`; el número es el porcentaje de la base (`space.200` = 16px). Escala de `space.0` a `space.1000`, con pasos intermedios (`025`, `050`, `075`, `150`, `250`). Negativos en `space.negative.*`. Rangos de uso: pequeño (0–8px), medio (12–24px) y grande (32–80px).
- **SDS:** base 4px = `space-100`; `space-050`, `space-150`… `space-4000`; negativos con `negative`.
- **Decimales resueltos con cero inicial** (`050` = 0,5×). Por eso las escalas usan múltiplos de 100.
- Para espaciados, **proporción mejor que tallas** (Curtis).

### Tipografía
- **Tailwind:** `--text-xs` (0.75rem) a `--text-9xl` (8rem), con interlineado emparejado (`--text-xs--line-height`).
- **SDS:** primitivos enumerados (`typography-scale-01` a `10`) y semánticos por rol y talla (`body-size-small/medium/large`, `heading`, `title-hero`…).
- Interlineado sin unidad.

### Radios y sombras
- Tailwind: `--radius-xs` a `--radius-4xl`; `--shadow-2xs` a `--shadow-2xl`.
- SDS: `radius-100/200/400/full`; `drop-shadow-100…600`, `inner-shadow-100…600`.
- shadcn: escala de radios derivada de un único `--radius`.

### Principios comunes
1. Números en los primitivos, roles en los semánticos.
2. Múltiplos de 100 con cero inicial.
3. El nombre codifica una proporción o una medida cuando es posible.
4. Negativos en un segmento propio (`negative`).
5. Pocas opciones bien elegidas (Tailwind es la excepción: hay que controlarlo).

---

## Errores corregidos durante la fase (útil como "errores frecuentes")
1. **"Los breakpoints no viven en Figma."** Falso: se trabajan con modos de variables (Figma Design) o breakpoints nativos (Figma Sites), y las variables pueden cambiar variantes según el modo.
2. **"Los tokens de movimiento no viven en Figma."** Falso: existen variables de timing y easing (Figma Motion).
3. **"Las fases 1–4 se hacen con el plan gratuito de Figma."** Falso: los modos requieren plan de pago o Education.
4. **Abreviaturas como `bg`.** Sustituidas por palabras completas (`background`), según las recomendaciones de Figma.
5. **Estados como sufijo (`bg-hover`).** Sustituidos por default explícito, porque en DTCG un token no puede ser a la vez grupo.
6. **"Generar la configuración de Tailwind."** En Tailwind v4 la configuración principal es CSS (`@theme`), no `tailwind.config.js`.
7. **La arquitectura de dos capas presentada como diseño propio.** Es el patrón documentado por shadcn/ui.
8. **"El prefijo es necesario para evitar referencias circulares."** No lo es en general: basta con que los nombres sean distintos. El prefijo es útil, no obligatorio. *(Matiz: con propiedad primero, los nombres coinciden y el prefijo es la forma limpia de separarlos, S27.)*
9. **"Exportar desde Figma y pasarlo por Style Dictionary es directo."** Style Dictionary todavía no soporta por completo DTCG 2025.10; hay que comprobarlo y valorar Terrazzo.

## Pendiente de verificar en fases siguientes
- Si se puede elegir el modo de destino al crear un alias entre colecciones (fase 2).
- Si Figma Design permite ya el cambio automático de modo por ancho (fase 2).
- Qué exporta exactamente Figma en DTCG y cómo lo procesan Style Dictionary y Terrazzo (fase 3).
- ~~Si el servidor MCP de Figma utiliza el code syntax de las variables (fase 5).~~ Sí (sesión de diseño, D03).
- Requisitos de plan para Code Connect y MCP (fase 5).

---

## Fuentes

**Especificaciones**
- Design Tokens Format Module 2025.10 (W3C DTCG): https://www.designtokens.org/TR/2025.10/format/
- Design Tokens Resolver Module 2025.10 (W3C DTCG): https://www.designtokens.org/TR/2025.10/resolver/

**Figma**
- Apply variables to designs: https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs
- Overview of variables, collections, and modes: https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes
- Create and manage variables and collections: https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections
- Modes for variables: https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables
- What's new from Schema 2025: https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025
- Update 1: Tokens, variables, and styles (curso): https://help.figma.com/hc/en-us/articles/18490793776023-Update-1-Tokens-variables-and-styles
- Variables in Dev Mode: https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode
- Add or delete breakpoints (Figma Sites): https://help.figma.com/hc/en-us/articles/31242797809815-Add-or-delete-breakpoints-in-a-webpage
- Responsive components (Figma Sites): https://help.figma.com/hc/en-us/articles/31242826664983-Create-a-responsive-component-that-automatically-adapts-to-each-breakpoint
- Simple Design System (repo): https://github.com/figma/sds
- SDS theme.css: https://raw.githubusercontent.com/figma/sds/main/src/theme.css
- Foro — alias y modos entre colecciones (2023): https://forum.figma.com/archive-21/select-mode-when-creating-variable-aliases-across-libraries-collections-17243
- Foro — caracteres en nombres de variables (2024): https://forum.figma.com/ask-the-community-7/style-variables-changed-from-lower-case-to-upper-case-18091
- Foro — cambio automático de modo (2025): https://forum.figma.com/suggest-a-feature-11/automatic-variable-mode-switching-for-true-responsive-previews-44209

**Herramientas de código**
- Style Dictionary — DTCG: https://styledictionary.com/info/dtcg/
- Style Dictionary — transforms: https://styledictionary.com/reference/hooks/transforms/predefined/
- Style Dictionary — formats: https://styledictionary.com/reference/hooks/formats/predefined/
- Terrazzo — Tailwind: https://terrazzo.app/docs/integrations/tailwind/
- Tailwind — Theme variables: https://tailwindcss.com/docs/theme
- Tailwind — Dark mode: https://tailwindcss.com/docs/dark-mode
- Tailwind — Padding (spacing): https://tailwindcss.com/docs/padding
- MDN — prefers-color-scheme: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

**Sistemas de diseño de referencia**
- shadcn/ui — Theming: https://ui.shadcn.com/docs/theming
- Material Design 3 — Design tokens: https://m3.material.io/foundations/design-tokens/overview
- Material Design 3 — How the color system works: https://m3.material.io/styles/color/system/how-the-system-works
- Atlassian — Spacing: https://atlassian.design/foundations/spacing
- Radix Colors — Understanding the scale: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- SAP Fiori (iOS) — Design tokens: https://www.sap.com/design-system/fiori-design-ios/v25-8/foundations/design-tokens
- Serendie — Design tokens: https://serendie.design/en/foundations/design-tokens

**Autores**
- Nathan Curtis, *Naming Tokens in Design Systems* (EightShapes, 2020): https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676
