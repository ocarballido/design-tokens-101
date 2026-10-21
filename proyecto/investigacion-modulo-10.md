# Investigación del módulo 10: preparado para IA

> **Nota (2026-10-07, P23):** esta investigación queda **descartada**. El curso no tiene contenido de IA y el módulo 10 son las conclusiones del curso (T20). Se conserva como registro de las pruebas con el servidor MCP de Figma (§2), que siguen siendo el dato de D03.

Sesión de contenido, 2026-10-07. Tarea 1 del módulo 10 (Preparado para IA, T1, T4, P3). **Aprobada por Oscar el 2026-10-07** (T19): enfoque de P20 (opción B: el módulo enseña lo comprobado y la hipótesis de P3 sale del curso) y las recomendaciones de §8 (decisiones 1 y 3 a 7; la 5, aplicada con P21). No se redacta ninguna lección hasta que Oscar apruebe esta investigación y después el índice.

Pregunta: qué tiene que saber quien termina el módulo 9 para que un agente de IA **lea y use** su sistema de tokens sin inventar valores, y cómo se comprueba que eso funciona (P3). El módulo no enseña a programar con agentes ni a escribir prompts en general (P10, T5): trata el sistema de tokens como información que un agente consume. En cada apartado se separa **lo que dice la fuente** de **la recomendación** de la sesión de contenido. Las pruebas propias dicen con qué se hicieron y cuándo (P14).

Fuentes consultadas el 2026-10-07: ayuda y documentación para desarrolladores de Figma (servidor MCP: guía, acceso y límites, herramientas, estructura del archivo, reglas propias), Model Context Protocol, llms.txt, AGENTS.md, Claude Code (*Memory*), Fumadocs (*LLMs*), y dos artículos de investigación sobre nombres y modelos de lenguaje (arXiv).

---

## 1. De dónde parte el módulo 10

Al terminar el módulo 9, el alumno tiene un sistema completo (módulo 8) y un componente que lo consume en Figma y, si siguió el itinerario de código, en React (T18). Lo que el curso ya enseña y el módulo 10 no repite:

| Tema | Dónde está |
|---|---|
| Code syntax: el nombre de la variable en código | [Una sola fuente de verdad](/fundamentals/source-of-truth), [Un nombre en Figma, DTCG y CSS](/naming/name-constraints) |
| Descripción obligatoria en los semánticos (S37) | [Documentar el sistema](/final-exercise/document-the-system) |
| Lo que Dev Mode escribe con el code syntax (D03) | [Del diseño al código](/components/design-to-code) |
| Valores arbitrarios y `check:tokens` (V43) | [De la variante a la clase](/components/variants-to-classes) |

La descripción de un componente en Figma no la trata ninguna lección (comprobado en `components-in-figma`): es nueva para el módulo 10 (§2).

Lo que el curso **promete** al módulo 10:

- `what-we-teach`, tabla: "Cómo documentar el sistema para que lo entienda un agente" / "Documentación legible por agentes"; `Flow`: paso "Preparado para IA", `pending`.
- `why-this-site`, "Y la IA": que un sistema bien nombrado mejore el resultado de un agente es una hipótesis que se comprobará "comparando el mismo diseño generado con y sin el sistema preparado" (P3). Lo repiten `component-tokens` (un vocabulario pequeño podría ayudar a elegir el token) y `design-to-code` (el servidor MCP escribe la variable con su valor de reserva, "que verás en el módulo 10").
- `estado.md`, "Pendiente de reflejar": D03 (ejemplo real de cada formato con el servidor MCP) y P9 (cómo se comparte una fuente de verdad entre sesiones y herramientas). C4 deja para este módulo la pregunta de la búsqueda, `llms.txt` y MCP. V40 deja para cuando exista el módulo 10 el número "10" del sidebar.

---

## 2. El servidor MCP de Figma: qué ve un agente

### Lo que dicen las fuentes

- **MCP** es "un estándar de código abierto para conectar aplicaciones de IA con sistemas externos" ([Model Context Protocol: What is MCP](https://modelcontextprotocol.io/docs/getting-started/intro)).
- **El servidor MCP de Figma** deja que un agente lea y escriba en los archivos de Figma. Tiene un servidor **remoto** (`https://mcp.figma.com/mcp`, el preferido) y uno **de escritorio**, a través de la aplicación de Figma. El remoto está disponible en todos los planes y puestos; el de escritorio necesita un puesto Dev o Full en un plan de pago ([Figma: Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)).
- **Límites por plan y puesto:** Starter y los puestos View o Collab de cualquier plan, hasta 20 llamadas al mes; **Professional con puesto Dev o Full, hasta 200 al día y 10 por minuto**; Organization, 200 al día y 15 por minuto; Enterprise, 600 al día y 20 por minuto ([Figma MCP server: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)).
- **Herramientas que importan aquí** ([Figma MCP server: Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)): `get_design_context` devuelve el contexto de una capa, por defecto como React y Tailwind; `get_variable_defs` devuelve las variables y estilos de la selección, con nombre y valor; `search_design_system` busca componentes, variables y estilos en las bibliotecas conectadas; `create_design_system_rules` es un *prompt* que genera un archivo de reglas para el agente.
- **Figma recomienda** usar variables para los tokens (espaciado, color, radio y tipografía) y nombres semánticos en capas y componentes, porque un nombre descriptivo "ayuda al modelo a entender con qué trabaja" ([Figma MCP server: Structure your Figma file](https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/)). Es una recomendación de Figma, no una prueba.
- **Reglas propias:** Figma propone guardar en un archivo de reglas del agente (cita `CLAUDE.md` para Cursor y para Claude Code) instrucciones como evitar valores escritos a mano y usar los tokens de Figma ([Figma MCP server: Add custom rules](https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/)).

### Prueba propia 1: el `Button` `primary` de TokensDS (2026-10-07)

Con el servidor MCP de Figma conectado a la sesión de contenido (claude.ai), cuenta de Oscar en el plan Professional con puesto Full (`whoami`), variante `variant=primary, showIcon=false, state=default` (nodo 24:754). Solo lectura.

`get_design_context` (extracto):

```tsx
<div className="bg-[var(--t101-color-background-accent-strong-default,#3c9)] border-[length:var(--t101-border-width-100,1px)] … gap-[var(--t101-space-200,8px)] … px-[var(--t101-space-400,16px)] … rounded-[var(--t101-radius-control,8px)]">
  <p className="… font-[family-name:var(--t101-font-family-sans,'Inter:Medium')] font-[var(--t101-font-weight-500,500)] leading-[1.4] … text-[color:var(--t101-color-text-on-accent,#050c09)] text-[length:var(--t101-font-size-label-default,14px)] …">
```

`get_variable_defs` (completo):

```json
{"var(--t101-color-text-on-accent)":"#050c09","var(--t101-font-size-label-default)":"14","var(--t101-font-family-sans)":"Inter","var(--t101-font-weight-500)":"500","label/default":"Font(family: \"var(--t101-font-family-sans)\", style: Medium, size: var(--t101-font-size-label-default), weight: var(--t101-font-weight-500), lineHeight: 1.399999976158142, letterSpacing: 0)","var(--t101-space-200)":"8","var(--t101-space-400)":"16","var(--t101-radius-control)":"8","var(--t101-border-width-100)":"1","var(--t101-color-background-accent-strong-default)":"#33cc99"}
```

Lo que se ve:

1. **El agente recibe el code syntax, no el nombre de Figma.** `get_variable_defs` usa `var(--t101-space-200)` como clave, no `space/200`. El estilo de texto sí llega con su nombre de Figma (`label/default`).
2. **Cada variable lleva un valor de reserva** (`#3c9`, `8px`), con el hex abreviado. Dev Mode no lo pone (D03, captura del 2026-10-06).
3. **Las clases son valores arbitrarios de Tailwind** (`bg-[var(…)]`). En DesignToken101, `npm run check:tokens` los rechaza (V43): el agente tiene que traducirlos a las clases del proyecto (`bg-accent-strong-default`). El propio servidor lo pide en su respuesta: convertir el código "al sistema de estilos del proyecto".
4. **Lo que no es variable llega como valor:** `leading-[1.4]`, porque el interlineado no tiene variable en Figma (D01).
5. **La descripción del componente llega** (la del conjunto `Button`, con la referencia a `componentes-v1.md` §2.2 y D33). **La descripción de las variables no aparece** en ninguna de las dos respuestas, aunque las de los semánticos existen desde S37.

### Prueba propia 2: los formatos del code syntax (D03, 2026-10-07)

Mismo servidor y cuenta. En TokensDS, página y colección temporales ("TMP prueba MCP (borrar)", "TMP code syntax") con cuatro variables de color, cada una aplicada al relleno de un rectángulo; **borradas al terminar** (el archivo queda con sus 8 páginas y 143 variables). Resultado:

| Code syntax Web | `get_design_context` | Clave en `get_variable_defs` |
|---|---|---|
| `var(--t101-tmp-formato-var)` | `bg-[var(--t101-tmp-formato-var,#3c9)]` | `var(--t101-tmp-formato-var)` |
| `t101-tmp-formato-sin-var` | `bg-[var(--t101-tmp-formato-sin-var,#36c)]` | `t101-tmp-formato-sin-var` |
| `--t101-tmp-formato-guiones` | `bg-[var(----t101-tmp-formato-guiones,#cc4d33)]` | `--t101-tmp-formato-guiones` |
| Sin code syntax (`tmp/sin-code-syntax`) | `bg-[var(--tmp\/sin-code-syntax,#99991a)]` | `tmp/sin-code-syntax` |

Confirma D03 (2026-09-30: los dos primeros formatos dan la misma variable y el tercero, cuatro guiones) y añade el cuarto caso: **sin code syntax, el servidor inventa una variable a partir de la ruta de Figma**, con la barra escapada, que no existe en el CSS del sistema. Las cuatro variables tenían descripción; ninguna aparece en la salida.

### DesignToken101 hoy

Todas las variables tienen code syntax `var(--t101-…)` (S6, S27, D03) y `npm run check:tokens` exige que coincida con la ruta (V33). Las descripciones de los semánticos viajan a la exportación DTCG (`tokens/dtcg/`: 33 en cada modo de Semantic color, 4 en Semantic size, 9 en cada modo de Layout; los primitivos no tienen, S37).

### Recomendación

- El code syntax es lo que hace que el agente escriba el nombre real de la variable. Es el ejemplo central del módulo: los cuatro formatos, con la salida real.
- La descripción de una variable **no llega al agente por el servidor MCP** (en esta prueba). Llega por el repositorio: la exportación DTCG con `$description` y los documentos del sistema. El módulo debe decirlo así, con fecha, y no prometer que el agente "lee" las descripciones de Figma.
- La salida del servidor es una referencia que hay que traducir, no el código final: el propio servidor lo dice, y la comprobación de V43 lo demuestra en este proyecto.

---

## 3. La hipótesis de P3: cómo comprobarla de verdad

**Resuelto por P20 (2026-10-07):** la hipótesis sale del curso y este experimento no se hace dentro de él. El apartado se conserva como registro de por qué: comprobarla bien exige separar tres factores y unas veinte ejecuciones, y eso es investigación, no enseñanza.

### Lo que dicen las fuentes

No hay un estudio publicado sobre tokens de diseño y agentes (búsqueda del 2026-10-07). Sí lo hay sobre **nombres en el código**, y apunta en la misma dirección, con límites claros:

- Al sustituir los nombres de variables y funciones por otros sin significado, dos modelos de código (CodeBERT y GraphCodeBERT) rinden peor en búsqueda de código y en detección de clones. Son tareas de análisis, no de generación ([Wang y otros: How Does Naming Affect LLMs on Code Analysis Tasks?](https://arxiv.org/abs/2307.12488), arXiv, 2023).
- Con nombres ocultos o engañosos que no cambian lo que hace el programa, los modelos de lenguaje resumen peor el código con intención (de 11 a 29 puntos menos en ClassEval) y también predicen peor su ejecución ([Le y otros: When Names Disappear](https://arxiv.org/abs/2510.03178), arXiv, 2025).

Son artículos de arXiv (no revisados por pares en esa versión), sobre código y no sobre tokens. Sirven para plantear la hipótesis, no para afirmarla.

### Qué hay que separar

"Un sistema bien nombrado mejora el resultado" mezcla tres cosas que una prueba tiene que separar: **que exista** un sistema (variables frente a valores sueltos), **que sus nombres signifiquen algo** (semánticos frente a opacos con los mismos valores) y **que esté preparado** (reglas para el agente, descripciones). Si solo se compara "con" y "sin", no se sabe cuál de las tres explica la diferencia.

### Propuesta de prueba

**Tarea.** Un agente implementa en el repositorio de DesignToken101 un componente que aún no existe (por ejemplo, un `Badge` o una tarjeta con estados), a partir de un marco de Figma leído con el servidor MCP. El mismo prompt, el mismo modelo y la misma versión en todas las ejecuciones; sesiones nuevas, sin el contexto del curso.

**Condiciones** (el mismo diseño, los mismos valores):

| | En Figma | En el repositorio |
|---|---|---|
| A. Sin sistema | Valores sueltos, sin variables | CSS sin tokens del sistema |
| B. Nombres opacos | Variables con nombres sin significado (`c-07`, `s-3`) y su code syntax | El mismo CSS con esos nombres |
| C. DesignToken101 | El sistema tal cual | El repositorio tal cual |
| D. Preparado | C | C con un archivo de reglas (solo tokens, `check:tokens`) |

B y C solo se diferencian en los nombres; C y D, en la preparación. La copia de B se genera con un script que renombra a la vez la exportación, el CSS y las clases.

**Medidas** (decididas antes de ejecutar y, en lo posible, automáticas):

1. Valores arbitrarios y variables inexistentes: la comprobación 8 de `npm run check:tokens` (V43).
2. Token correcto por celda: una tabla parte × estado → token escrita **antes** (como en el módulo 9) y comparada con lo que usa el agente.
3. Modos: el componente cambia bien en Light y Dark (usa semánticos, no primitivos).
4. Contraste de los pares que usa, con `tools/semantic.py`.
5. Intervenciones: cuántas correcciones hacen falta hasta que pasa 1 a 4.

**Repeticiones.** Un modelo no da siempre la misma respuesta: cinco ejecuciones por condición como mínimo, con todas las salidas guardadas. Se informa de la media y de la dispersión, no de la mejor ejecución.

**Registro previo.** El protocolo (tarea, prompt, condiciones, medidas y número de ejecuciones) se escribe en `docs/` y Oscar lo aprueba **antes** de ejecutar, para que el resultado no cambie la pregunta.

**Qué se publica.** Lo que salga, también si no hay diferencia o si B iguala a C. La lección dice con qué modelo, qué fecha y qué tarea, y que el resultado vale para esa prueba (P14). Si C no mejora a B, la hipótesis de P3 no se confirma y el curso lo dice.

### Recomendación

Hacer la prueba con las cuatro condiciones y el registro previo. Es la única forma de que el módulo afirme algo sobre P3 sin pasarse (P6, P14). Coste: la copia de B (un script), un componente de Figma en tres versiones (A, B y C) y unas veinte ejecuciones, dentro del límite diario del plan Professional (200 llamadas al MCP).

---

## 4. Instrucciones para el agente y una fuente de verdad compartida (P9)

### Lo que dicen las fuentes

- **Claude Code** carga `CLAUDE.md` al empezar cada sesión. Lo trata "como contexto, no como configuración obligatoria"; para bloquear una acción hay que usar un *hook*. Recomienda menos de 200 líneas por archivo, y advierte de que los archivos importados con `@ruta` **también se cargan al empezar**, así que no reducen el coste de contexto. Puede leer `AGENTS.md` (desde la versión 2.1.277): si hay `CLAUDE.md`, lee ese; si no, `AGENTS.md`; y un `CLAUDE.md` puede importar `AGENTS.md` ([Claude Code: Memory](https://code.claude.com/docs/en/memory)).
- **AGENTS.md** es "un formato abierto y sencillo para guiar a los agentes de programación", custodiado por la Agentic AI Foundation de la Linux Foundation; su web lista más de veinte herramientas compatibles ([AGENTS.md](https://agents.md/)).
- **Figma** propone poner en ese archivo las reglas de uso de los tokens (§2).

### DesignToken101 hoy

P9 es el caso real: tres sesiones (contenido, diseño y desarrollo) que no se ven, un repositorio como fuente de verdad, un protocolo en `decisiones.md` y un `CLAUDE.md` de 41 líneas que importa `decisiones.md` y `estado.md`.

**Medido hoy:** con las importaciones, cada sesión de Claude Code carga unos 322 KB al empezar (`CLAUDE.md`, 3,6 KB; `decisiones.md`, 114 KB y 261 líneas; `estado.md`, 205 KB y 767 líneas). La documentación recomienda menos de 200 líneas. En esta sesión, la lectura de `decisiones.md` tuvo que hacerse en tres partes por su tamaño.

### Recomendación

- Contar P9 como ejemplo real: un solo lugar para las decisiones, un archivo de instrucciones que apunta a él y comprobaciones automáticas para lo que no puede quedar a criterio del agente (`check:tokens`, `check:content`). Las reglas de `CLAUDE.md` son contexto; `check:tokens` es lo que de verdad impide un valor suelto.
- Antes de enseñarlo, corregir el ejemplo: hoy contradice la recomendación de la fuente (ver §8, punto 5).
- `AGENTS.md` se explica como la alternativa común a varias herramientas, sin crearlo en el repositorio mientras solo se use Claude Code (P11).

---

## 5. La web como documentación para agentes (C4)

### Lo que dicen las fuentes

- **llms.txt** es una propuesta de Jeremy Howard (2024, versión 2), no un estándar: un archivo `/llms.txt` en Markdown con un `h1` obligatorio, un resumen y listas de enlaces, y versiones `.md` de las páginas. Dice que se espera que los agentes lo lean, no que lo hagan ([llms.txt](https://llmstxt.org/)).
- **Quién lo publica (comprobado el 2026-10-07):** Next.js (`nextjs.org/docs/llms.txt`), Claude Code y Model Context Protocol (las páginas de su documentación consultadas aquí empiezan remitiendo a su `llms.txt`). Tailwind CSS (`tailwindcss.com/llms.txt`) y DTCG (`designtokens.org/llms.txt`) dan 404.
- **Fumadocs** genera `llms.txt`, `llms-full.txt`, Markdown por página y un servidor MCP para buscar y leer páginas, también en modo *headless* (`fumadocs-core`). Necesita una fuente de contenido creada con su `loader()` y el Markdown procesado de cada página ([Fumadocs: LLMs](https://www.fumadocs.dev/docs/integrations/llms)).

### DesignToken101 hoy

El contenido está escrito portable para poder migrar (C4, V05: `meta.json` con la convención de Fumadocs). La web no tiene búsqueda, `llms.txt` ni MCP. Las lecciones son MDX con componentes propios (`Callout`, `InCode`, `Flow`, `ColorScale`, `Takeaways`), que habría que convertir a texto para dar Markdown limpio.

### Recomendación

- **Sin migración a Fumadocs Core.** Lo que el módulo 10 necesita es pequeño: no justifica cambiar la carga del contenido (C3) ni el sidebar.
- **`llms.txt` sí, pequeño y generado:** un índice con el título, la descripción y el enlace de cada lección, sacado de `content/` y `meta.json` en el build. Es coherente con P4 (la web usa lo que enseña) y el módulo puede mostrarlo. Las versiones `.md` de cada página, después y solo si hacen falta (P11).
- **Sin servidor MCP de la web** (P11: no hay un caso de uso que no cubra `llms.txt`).
- **La búsqueda no es del módulo 10:** es una mejora de la web para personas y se decide aparte.

---

## 6. Qué es un sistema "preparado para IA"

Reuniendo §2 a §5, lo que un agente puede leer de un sistema de tokens y por dónde le llega:

| Qué | Por dónde llega | Dónde lo enseña el curso |
|---|---|---|
| Nombre de la variable en código | Code syntax, por el servidor MCP (§2) | Módulos 1, 4 y 9 |
| Valor y modos | `get_variable_defs` (valor del modo del nodo) y la exportación DTCG | Módulos 5 y 6 |
| Para qué sirve un token | `$description` en la exportación DTCG (no por MCP, §2) | Módulo 8 |
| Para qué sirve un componente | Descripción del componente, por MCP (§2) | Módulo 10 (nuevo) |
| Qué no puede hacer el agente | Archivo de reglas (`CLAUDE.md`, `AGENTS.md`) | Módulo 10 |
| Qué se comprueba | `check:tokens` y `semantic.py` | Módulos 6, 7 y 9 |

La aportación propia del módulo 10 son las tres últimas filas (P20: sin la prueba de P3). El resto lo junta y lo enseña desde el lado del agente.

---

## 7. V40: el número "10" en el sidebar

Medidas de V40: cada cifra mide 9,08 px (`tabular-nums`) y "10", 18,14 px; hueco actual `space/200` (8 px). Con dos cifras, el título de "10 Preparado para IA" se desplaza 9,06 px.

| Opción | Dónde empieza el título | Aire tras el número | Coste |
|---|---|---|---|
| (a) ancho mínimo `space/600` (24 px), hueco `space/100` | 28 px en todas | 18,9 px (una cifra) y 9,9 px ("10") | Clase `min-w-600` (existe: `--spacing-600`). En Figma no se puede vincular: `space/600` tiene solo el scope `GAP` |
| (a) con el número alineado al final, hueco `space/200` | 32 px en todas | 8 px en todas | Igual que (a), más la alineación |
| (b) cero a la izquierda (`00` a `10`) | 26,14 px en todas | 8 px | El sidebar deja de usar el número de T1 y de `what-we-teach` (C19); el nombre accesible pasa a "00 Empezar aquí" |
| (c) aceptar el desplazamiento | 17,08 px; 26,14 px en "10" | 8 px | Ninguno |

**Recomendación: (a) con el número alineado al final** y hueco `space/200`. Los títulos quedan alineados, el aire es el de ahora y el número sigue siendo el de T1. En Figma se mantiene la diferencia ya aceptada en D36 (cifras proporcionales, sin ancho fijo) y se anota en `componentes-v1.md` §4.10. Lo implementa la sesión de desarrollo cuando exista la carpeta del módulo 10.

---

## 8. Decisiones para Oscar

1. **Enfoque del módulo (P2).** Opciones:
   - **A.** Como los módulos 6 a 9: el texto principal trata lo que el diseñador prepara en Figma (nombres, code syntax, descripciones, componentes) y lo que el agente recibe (salida real del MCP); el archivo de reglas, `llms.txt` y la ejecución del agente, en `InCode`.
   - **B.** El módulo entero para quien trabaja con agentes en código.
   - *Recomendación: A*, por P2 y por coherencia. La fila de `what-we-teach` pasaría a "Qué lee un agente de tu sistema y cómo comprobarlo".
2. **Prueba de P3 (§3).** **Decidido con P20: ninguna de las tres; la hipótesis sale del curso.** Opciones que se plantearon: (a) las cuatro condiciones, con registro previo; (b) solo "con" y "sin" (A frente a D), como dice hoy `why-this-site`; (c) no hacer la prueba y quitar la promesa. *Recomendación: a.* Con (b) no se sabe si mejora el nombre o la mera existencia de variables, que es lo que dice la hipótesis. Si Oscar elige (a), la sesión de contenido escribe el protocolo para su aprobación y la sesión de desarrollo prepara la copia de B y ejecuta.
3. **D03 en la lección.** *Recomendación:* los cuatro formatos de la prueba 2, con su salida real y fecha, y el `Button` de la prueba 1 como ejemplo completo. Lo nuevo (sin code syntax, el servidor inventa un nombre) se cuenta como el motivo de S6. No hace falta otra captura.
4. **Descripciones de las variables.** En las dos pruebas no llegan al agente por MCP. *Recomendación:* la lección lo dice con fecha y enseña la exportación DTCG como el sitio donde un agente las lee. Pendiente, sin bloquear: probar `search_design_system` con la biblioteca publicada, por si allí sí aparecen.
5. **P9: el tamaño de lo que carga cada sesión (§4).** Unos 322 KB por las dos importaciones, frente a las 200 líneas que recomienda Claude Code. Opciones: (a) dejarlo y contarlo como está; (b) `CLAUDE.md` importa solo `decisiones.md` y `estado.md` se lee bajo demanda; (c) dividir `estado.md` en un estado actual corto (importado) y un historial (bajo demanda). *Recomendación: c*, antes de redactar la lección, para que el ejemplo siga la fuente. Afecta a las tres sesiones: lo aplica la sesión que Oscar elija y se registra en `decisiones.md`.
6. **C4: búsqueda, `llms.txt` y MCP (§5).** *Recomendación:* sin migración a Fumadocs Core; `llms.txt` como índice generado en el build (sesión de desarrollo); sin MCP de la web; la búsqueda, fuera del módulo 10. C4 se cerraría con "no hace falta migrar".
7. **V40 (§7).** *Recomendación:* (a) con el número alineado al final y hueco `space/200`.
8. **`why-this-site`, "Y la IA" (P14).** **Decidido con P20:** se reescribe (§9). El ejemplo `color.action.primary` no sigue la convención del curso (D12: no hay categoría `action`) y la frase "tiene una intención que puede reutilizar" se afirma sin prueba. *Recomendación:* reescribir el apartado al cerrar el módulo, con el resultado de la prueba y un nombre real del sistema (`color/background/accent/strong/default`).

---

## 9. Lecciones que cambia P20

Inventario del 2026-10-07: todas las menciones a la IA, a los agentes, a MCP y al módulo 10 en `content/es/`. Se aplican al redactar el módulo 10 (para que los enlaces tengan destino) y con la aprobación de Oscar.

| Lección | Qué dice hoy | Propuesta |
|---|---|---|
| `why-this-site`, apartado "Y la IA" | Los agentes "trabajan mejor" con información nombrada; ejemplo `color.action.primary`; `Callout` `pending` con la hipótesis y la prueba "con y sin el sistema preparado" | Contar lo comprobado: un agente que lee un diseño de Figma recibe el code syntax de cada variable, y sin él recibe un nombre inventado; enlace al módulo 10. Sin `Callout` `pending`. Ejemplo con un nombre real (`color/background/accent/strong/default`, D12) |
| `why-this-site`, "Lo que te llevas" | "Una hipótesis que comprobaremos al final" | "Un agente recibe los nombres que pones en Figma: el módulo 10 enseña qué le llega" (o equivalente, una frase) |
| `figma-dtcg-tailwind`, final de la tabla de nombres | El nombre compartido permite pasar al componente "sin traducir nada, ya sea una persona o un agente" | Quitar "sin traducir nada": el agente recibe el nombre, pero en esta web tiene que pasar los valores arbitrarios a las clases del proyecto (§2, prueba 1). Propuesta: "Ese nombre compartido es el que encuentra quien implementa el componente, sea una persona en Dev Mode o un agente con el servidor MCP de Figma", con enlace al módulo 10 |
| `what-we-teach`, `Flow` | Paso "Preparado para IA", "Módulo 10 · En estudio", `pending` | Enlace a la primera lección del módulo y meta "Módulo 10" |
| `what-we-teach`, tabla | "Cómo documentar el sistema para que lo entienda un agente" / "Documentación legible por agentes" / "Próximamente" | "Qué recibe un agente de tu sistema y cómo vigilarlo" / el resultado lo fija el ejercicio del índice / "En redacción" |
| `what-we-teach`, `Callout` | El módulo 10 "todavía está en estudio" | Se quita o se ajusta, como al publicar los módulos anteriores |
| `component-tokens`, `Callout` `note` | Un vocabulario pequeño "podría ayudar" a un agente; hipótesis del módulo final | Quitar el `Callout`: los dos argumentos de la lección (mantenimiento y una decisión en dos sitios) no lo necesitan |
| `design-to-code`, "No lleva valor de reserva" | "El servidor MCP de Figma, que verás en el módulo 10" | Se mantiene; solo se añade el enlace a la lección del módulo 10 |

No cambian: `how-this-site-was-made` (cómo se hizo la web con Claude, P7) ni ninguna otra lección (sin más menciones). Los módulos 1 a 9 no prometen nada sobre agentes fuera de estas líneas.

## 10. Pendiente (sin verificar)

- Si `search_design_system` devuelve la descripción de las variables (necesita la biblioteca publicada).
- Si el servidor MCP de escritorio da la misma salida que el remoto (la ayuda dice que el de escritorio es "sobre todo" para Organization y Enterprise).

---

## 11. Fuentes

- [Model Context Protocol: What is MCP](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Figma: Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Figma MCP server: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- [Figma MCP server: Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma MCP server: Structure your Figma file](https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/)
- [Figma MCP server: Add custom rules](https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/)
- [Claude Code: Memory](https://code.claude.com/docs/en/memory)
- [AGENTS.md](https://agents.md/)
- [llms.txt](https://llmstxt.org/)
- [Next.js: llms.txt](https://nextjs.org/docs/llms.txt)
- [Fumadocs: LLMs](https://www.fumadocs.dev/docs/integrations/llms)
- [Wang y otros: How Does Naming Affect LLMs on Code Analysis Tasks? (arXiv)](https://arxiv.org/abs/2307.12488)
- [Le y otros: When Names Disappear (arXiv)](https://arxiv.org/abs/2510.03178)
