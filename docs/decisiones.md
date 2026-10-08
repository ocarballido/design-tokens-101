# DesignToken101: Decisiones

Qué se ha decidido, en una línea por decisión. **Si algo aquí contradice una conversación, prevalece este documento.** El motivo, las fuentes y las opciones descartadas de cada una están en `docs/decisiones-detalle.md` (bajo demanda, P22); si el resumen y el detalle no coinciden, manda el detalle.

Estados: **Cerrada** (no se reabre sin motivo) · **Provisional** (puede cambiar antes de publicar) · **Sustituida** · **Abierta**.

## Protocolo entre sesiones

DesignToken101 se trabaja en tres sesiones de Claude que no se ven entre sí: **contenido** y **diseño** (claude.ai) y **desarrollo** (Claude Code). La fuente de verdad compartida es este repositorio (P9).

| Documento | Qué es | Quién lo cambia |
|---|---|---|
| `docs/decisiones.md` | Qué se decidió, en una línea (se carga en cada sesión) | Quien decide |
| `docs/decisiones-detalle.md` | Por qué, con fuentes y opciones descartadas | Quien decide |
| `docs/estado.md` | Lo que sigue abierto en cada frente (se carga en cada sesión) | Cada sesión, su apartado |
| `docs/historial.md` | Detalle de lo hecho: pruebas, cifras, hallazgos | Cada sesión, al cerrar un bloque |
| `docs/sistema-tokens-v1.md`, `docs/componentes-v1.md` | Especificación de los tokens y anatomía de los componentes | Cualquier sesión, con aprobación de Oscar |
| `docs/entrega-diseno.md` | Dónde está cada cosa en Figma y cómo pasa a código | Sesión de diseño |
| `content/`, `tools/` | Lecciones (MDX) y scripts de escalas y comprobación | Contenido; cualquier sesión |

1. Un hueco o una contradicción en la especificación no se improvisa: se plantean las opciones y **Oscar decide** en esa sesión.
2. **Quien decide, escribe**, en el mismo commit: la fila completa en `decisiones-detalle.md`, su resumen aquí (una frase, sin motivos ni fuentes) y el documento afectado. Antes, `git pull`.
3. Numeración por sesión: contenido `P`, `T`, `C`, `S`, `A`; diseño `D01…`; desarrollo `V01…`.
4. Al empezar cada bloque se relee este documento y `estado.md`; el detalle y el historial, solo cuando la tarea lo pide.
5. Los cambios en Figma que alteran la especificación siguen 1 y 2 y vuelven a comprobar el contraste.
6. La sesión de contenido refleja las decisiones en las lecciones; lo pendiente va en `estado.md`.
7. Commits pequeños que nombran la decisión (`docs: V01 elige Terrazzo`). Todo en español.

## Producto

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| P1 | Web que enseña a planificar, crear e implementar tokens con Figma, DTCG y, opcionalmente, Tailwind CSS (nombre: P12). | Cerrada | 2026-09-30 |
| P2 | Público: diseñadores UI/UX, todo se sigue en Figma; itinerario de código opcional (React) en cada lección. | Cerrada | 2026-09-30 |
| P3 | La IA como hilo conductor y módulo final del curso. | Sustituida por P23 | 2026-09-30 |
| P4 | La web usa su propio sistema de tokens, con modo claro y oscuro; se diseña en Figma antes de desarrollar. | Cerrada | 2026-09-30 |
| P5 | El alumno obtiene la misma estructura, método y convención que la web, con los valores de su diseño. | Cerrada | 2026-10-06 |
| P6 | De menos a más; cada afirmación técnica con fuente oficial; la fuente, separada de la recomendación. | Cerrada | 2026-09-30 |
| P7 | La web avisa de que se hizo con Claude (Anthropic) y con revisión humana. | Cerrada | 2026-09-30 |
| P8 | Autor: Oscar Carballido. | Cerrada | 2026-09-30 |
| P9 | La fuente de verdad compartida es el repositorio, porque Claude Code no lee los Projects de claude.ai. | Cerrada | 2026-10-03 |
| P10 | Curso técnico para diseñadores; no es guía de sistemas de diseño ni curso de Figma o de interfaces. | Cerrada | 2026-10-04 |
| P11 | Un sistema tan grande como lo que resuelve: tokens para casos de uso reales, no futuros. | Cerrada | 2026-10-04 |
| P12 | El curso se llama DesignToken101; no cambian `--t101-`, el code syntax, el Resolver, el repositorio ni TokensDS. | Cerrada | 2026-10-04 |
| P13 | El curso asume Figma Professional; el plan no decide el contenido. | Cerrada | 2026-10-04 |
| P14 | Lo que no se puede comprobar no se publica; `pending` solo para contenido en preparación; en `docs/` se anota. | Cerrada | 2026-10-04 |
| P15 | El logotipo dice "DesignToken101". | Cerrada | 2026-10-05 |
| P16 | Archivos de Figma descargables: sistema de referencia y, después, diseño de partida; en Community tras licencia y prueba con Starter. | Cerrada | 2026-10-06 |
| P17 | La web no se publica sin los módulos 9 y 10 (el inglés ya no hace falta, P24); los archivos de Figma salen en el mismo bloque. | Cerrada | 2026-10-06 |
| P18 | Los archivos de Figma se enlazan desde la página "Archivos de Figma" de Recursos, y esta desde Requisitos, el ejercicio 1 y el final. | Cerrada | 2026-10-06 |
| P19 | El texto del lienzo de los archivos de Figma, en español; los nombres técnicos, en inglés. | Cerrada | 2026-10-06 |
| P20 | Módulo 10 sobre lo que recibe un agente de IA. | Sustituida por P23 | 2026-10-07 |
| P21 | `estado.md` solo con lo abierto; el detalle de lo hecho va a `historial.md`, que se lee bajo demanda. | Cerrada | 2026-10-07 |
| P22 | `decisiones.md` con una línea por decisión; el texto completo, en `decisiones-detalle.md`, bajo demanda. | Cerrada | 2026-10-07 |
| P23 | Web de educación sobre tokens, sin contenido de IA: ni módulo, ni hipótesis, ni promesas; el módulo 10 son las conclusiones del curso. | Cerrada | 2026-10-07 |
| P24 | La web se lanza solo en español: único idioma configurado y sin selector de idioma; el inglés queda aplazado (URL sin `/es/` desde V45). | Cerrada | 2026-10-07 |
| P25 | Los errores se comunican con issues de GitHub en el repositorio público; los enlazan la lección "Cómo se hizo esta web" y el pie, con una plantilla de issue en español (resuelve A11). | Cerrada | 2026-10-07 |
| P26 | Dominio de la web: `designtokens101.com`. | Cerrada | 2026-10-07 |
| P27 | La web tiene portada en `/`: título, subtítulo, un párrafo, el botón "Empezar el curso" y el símbolo del logotipo en isométrico, válido en Light y Dark (sustituye a V04; imagen precisada por D43). | Cerrada | 2026-10-07 |

## Temario

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| T1 | Módulos 0 a 10 (Empezar aquí, Fundamentos, Primitivos, Relaciones, Nombrar, Modos, De Figma al código, Accesibilidad, Ejercicio final, Componentes, Conclusiones) y Recursos. | Cerrada | 2026-09-30 |
| T2 | Las escalas van antes que los alias y las capas. | Cerrada | 2026-09-30 |
| T3 | Lección: introducción, "En esta página", contenido con fuentes, Figma, `InCode`, "Lo que te llevas", Fuentes. | Cerrada | 2026-09-30 |
| T4 | Los módulos 9 y 10 no se publican sin estudiarlos y verificarlos; el 7 lleva investigación propia. | Cerrada | 2026-09-30 |
| T5 | Fuera del curso: fundamentos de Figma, CSS, React y Tailwind, plugins de tokens de terceros y estética. | Cerrada | 2026-09-30 |
| T6 | Módulo 1: cuatro lecciones y un ejercicio; cada módulo termina con un ejercicio que prepara el siguiente. | Cerrada | 2026-10-03 |
| T7 | Módulo 2: ocho lecciones y un ejercicio; Material 3 no se cita. | Cerrada | 2026-10-04 |
| T8 | Herramienta de escalas de color en un apartado "Herramientas"; se hace al final. | Cerrada | 2026-10-04 |
| T9 | Módulo 3: nueve lecciones y un ejercicio en tabla, sin Figma. | Cerrada | 2026-10-04 |
| T10 | "Lo que te llevas" en cada lección: tres viñetas antes de Fuentes. | Cerrada | 2026-10-04 |
| T11 | Módulo 4: seis lecciones y un ejercicio; Semantic color y Semantic size con un solo modo. | Cerrada | 2026-10-04 |
| T12 | Módulo 5: seis lecciones y un ejercicio; no elegir modo en un componente principal. | Cerrada | 2026-10-05 |
| T13 | Módulo 6: siete lecciones y un ejercicio que no instala nada; Terrazzo en `InCode` opcional. | Cerrada | 2026-10-05 |
| T14 | Módulo 7: ocho lecciones y un ejercicio; objetivo WCAG 2.2 AA. | Cerrada | 2026-10-05 |
| T15 | Investigación del módulo 8: documentar, comprobar el conjunto y versionar. | Cerrada | 2026-10-06 |
| T16 | Módulo 8: tres lecciones y el ejercicio final; aprobado. | Cerrada | 2026-10-06 |
| T17 | Investigación del módulo 9: tabla parte × estado → token; React en `InCode`. | Cerrada | 2026-10-06 |
| T18 | Módulo 9: siete lecciones y un ejercicio; aprobado el 2026-10-07. | Cerrada | 2026-10-06 |
| T19 | Investigación del módulo 10 sobre IA (salvo V40, que se mantiene). | Sustituida por P23 | 2026-10-07 |
| T20 | Módulo 10, Conclusiones: resumen del curso por fases y conclusiones con las ideas que lo recorren y cómo mantener el sistema; sin ejercicio. | Cerrada | 2026-10-07 |
| T21 | Herramienta de normalización en "Herramientas": la exportación de Figma a DTCG estricto en el navegador y el mismo script descargable con un mapa de scopes al principio; una función pura para las dos vías; sin paquete de npm ni Terrazzo. | Cerrada | 2026-10-07 |
| T22 | Herramientas: sección `98-tools` sin número en Referencia; normalización con .zip o carpeta, descarga en .zip propio, tipos dudosos y conflictos los decide el usuario, un solo script con mapa, todos los errores a la vez y referencias sin destino; escalas desde el hex, con curva de referencia elegible (`green` por defecto, explicada con un gráfico) tres avisos, ajustes en la URL, vista previa en claro y oscuro y exportación de los pasos elegidos (siempre 11); pruebas con `node:test`. | Cerrada | 2026-10-08 |
| T23 | La herramienta de escalas entrega dos escalas, la del color que añade el usuario y la de neutros con su tono; sin escalas de estado (quita `CheckboxGroup`). | Cerrada | 2026-10-08 |

## Contenido y técnica

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| C1 | Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, next-intl, Git y Vercel. | Cerrada | 2026-09-30 |
| C2 | Lecciones en MDX. | Cerrada | 2026-09-30 |
| C3 | `@next/mdx` con `remark-frontmatter`, `remark-mdx-frontmatter`, `remark-gfm` y `rehype-slug`; navegación hecha a mano. | Cerrada | 2026-09-30 |
| C4 | Contenido portable; no se migra a Fumadocs Core: ningún módulo necesita búsqueda, `llms.txt` ni MCP (P23). | Cerrada | 2026-09-30 |
| C5 | Inglés por defecto y español (cambiada por P24: solo español). | Sustituida por P24 | 2026-09-30 |
| C6 | `content/{locale}/NN-seccion/NN-pagina.mdx`; el prefijo ordena y no sale en la URL. | Cerrada | 2026-09-30 |
| C7 | Slugs en inglés en todos los idiomas. | Cerrada | 2026-09-30 |
| C8 | Componentes de contenido: `Callout` (note, warning, recommendation, pending) e `InCode`. | Cerrada | 2026-09-30 |
| C9 | Guía de redacción adaptada de Next.js (`content/README.md`). | Cerrada | 2026-09-30 |
| C10 | Exportación de Figma en `tokens/figma/`, una carpeta por colección, sin editar. | Cerrada | 2026-10-03 |
| C11 | En el sidebar solo está abierta la sección de la lección actual. | Cerrada | 2026-10-03 |
| C12 | Los modos del sistema se nombran como en Figma; el concepto general, en español. | Cerrada | 2026-10-04 |
| C13 | Gráficos con el componente `Flow`, hecho con tokens. | Cerrada | 2026-10-04 |
| C14 | Componente `ColorScale`, con el hex leído de los tokens (o de la herramienta con `colors`, D54). | Cerrada | 2026-10-04 |
| C15 | Sin guiones largos. | Cerrada | 2026-10-04 |
| C16 | Vídeos externos: enlace, no inserción. | Cerrada | 2026-10-04 |
| C17 | Grupos del sidebar: Diseñar los tokens, Tokens en código y Referencia. | Cerrada | 2026-10-05 |
| C18 | Componente `Takeaways` para "Lo que te llevas" (diseño cambiado por V35). | Cerrada | 2026-10-05 |
| C19 | Secciones del sidebar numeradas desde el prefijo de la carpeta; Recursos sin número; el número, alineado al inicio (cambia V40). | Cerrada | 2026-10-06 |
| C20 | Campo `meta_title` en el frontmatter: `<title>` para buscadores cuando el título solo se entiende dentro del curso; sin meta keywords. | Cerrada | 2026-10-07 |

## Sistema de tokens

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| S1 | Capas: primitivos y semánticos; tokens de componente solo si se justifican. | Cerrada | 2026-09-30 |
| S2 | Primitivos ocultos al publicar (precisada por S22). | Cerrada | 2026-09-30 |
| S3 | Colecciones por eje: Primitives, Semantic color (Light y Dark) y Layout. | Cerrada | 2026-09-30 |
| S4 | Nombres en minúsculas, kebab-case por segmento, palabras completas, sin valores ni temas. | Cerrada | 2026-09-30 |
| S5 | Estados con hoja explícita (`…/default`, `…/hover`). | Cerrada | 2026-09-30 |
| S6 | Code syntax Web igual a la variable CSS generada. | Cerrada | 2026-09-30 |
| S7 | En código, dos capas con `@theme inline`. | Cerrada | 2026-09-30 |
| S8 | Acento `#33CC99` (HSL 160, 60 %, 50 %); neutros tintados con su tono. | Cerrada | 2026-09-30 |
| S9 | Escalas construidas en oklch y guardadas en sRGB; sin Display P3. | Cerrada | 2026-09-30 |
| S10 | Escalas de 11 pasos con las curvas de Tailwind CSS v4 (`tools/scales.py`). | Cerrada | 2026-09-30 |
| S11 | Neutros con un tinte suave del acento. | Cerrada | 2026-09-30 |
| S12 | Inter y JetBrains Mono (OFL-1.1). | Cerrada | 2026-09-30 |
| S13 | Escalas primitivas: espaciado base 4 px, tipografía 12 a 72 px, pesos, interlineados, bordes y radios. | Cerrada | 2026-09-30 |
| S14 | Nomenclatura con la propiedad primero; pares `on-` para texto sobre color. | Cerrada | 2026-09-30 |
| S15 | Orden: categoría / propiedad / rol / énfasis / estado. | Cerrada | 2026-09-30 |
| S16 | Primitivos de color por tono; los semánticos de estado son alias de ellos. | Cerrada | 2026-09-30 |
| S17 | Convención de nombres de `sistema-tokens-v1.md` §5.2 (`danger`, énfasis `default` / `subtle` / `strong`). | Cerrada | 2026-09-30 |
| S18 | Escalas de estado `red`, `amber` y `blue`. | Cerrada | 2026-09-30 |
| S19 | `success` usa `emerald`; no hay escala `green`. | Cerrada | 2026-09-30 |
| S20 | La paleta del acento se llama `emerald`. | Cerrada | 2026-09-30 |
| S21 | Tabla semántica de §6, con los primitivos `white` y `black`. | Cerrada | 2026-09-30 |
| S22 | Visibilidad y scopes de las variables en Figma (§7). | Cerrada | 2026-09-30 |
| S23 | Semánticos de radio `radius/control` y `radius/container`. | Cerrada | 2026-09-30 |
| S24 | Estilos de texto por rol (§8), que son la fuente en código. | Cerrada | 2026-09-30 |
| S25 | Interlineado generado en código (resuelta por D01). | Cerrada | 2026-09-30 |
| S26 | Espaciado negativo solo en código (precisada por D02). | Cerrada | 2026-09-30 |
| S27 | Prefijo CSS `--t101-`. | Cerrada | 2026-09-30 |
| S28 | Sin estilos de efecto en v1. | Cerrada | 2026-09-30 |
| S29 | Familia tipográfica como variable String; el peso, como Number (D04). | Cerrada | 2026-09-30 |
| S30 | `scales.py` calcula el contraste sobre el hex guardado. | Cerrada | 2026-10-04 |
| S31 | Se mantienen los semánticos de mensaje aún sin uso. | Cerrada | 2026-10-04 |
| S32 | Un alias de Figma o con llaves no cambia la opacidad; `$ref` podría, pero no se usa. | Cerrada | 2026-10-04 |
| S33 | Tokens de componente: componente / variante / propiedad / estado. | Cerrada | 2026-10-04 |
| S34 | `focus` y `overlay` son roles; los semánticos de tamaño siguen categoría / elemento / medida. | Cerrada | 2026-10-04 |
| S35 | `background/neutral/translucent` al 96 % en Light, por el contraste del anillo de foco. | Cerrada | 2026-10-05 |
| S36 | Versión semántica del sistema; 1.0.0 al cerrar el módulo 8. | Cerrada | 2026-10-06 |
| S37 | Descripción obligatoria en los semánticos y opcional en los primitivos. | Cerrada | 2026-10-06 |

## Diseño

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| D01 | Interlineado sin variable en Figma (la lee como píxeles); 120, 140 y 150 %. | Cerrada | 2026-09-30 |
| D02 | `space/negative/*` solo en código. | Cerrada | 2026-09-30 |
| D03 | Code syntax `var(--t101-…)`, que Dev Mode escribe tal cual y sin valor de reserva. | Cerrada | 2026-09-30 |
| D04 | Pesos tipográficos como variables Number. | Cerrada | 2026-09-30 |
| D05 | Oscar diseña los componentes; la sesión de diseño aporta la anatomía y revisa. | Cerrada | 2026-09-30 |
| D06 | `Callout` `recommendation` con el acento y `border/accent/default`; `pending` con neutros. | Cerrada | 2026-09-30 |
| D07 | `ThemeToggle`: light, dark y system; por defecto, system. | Cerrada | 2026-09-30 |
| D08 | Iconos de Lucide; código sin resaltado de colores. | Cerrada | 2026-09-30 |
| D09 | Marcos de escritorio (1440 px) y móvil (375 px); el corte se fija en código. | Cerrada | 2026-09-30 |
| D10 | Colección Layout con los tamaños de texto en Desktop y Mobile. | Cerrada | 2026-09-30 |
| D11 | Corte de escritorio en 64rem, solo en código. | Cerrada | 2026-09-30 |
| D12 | Tokens de estado de los controles: `hover`, `active`, `text/accent/hover` y `border/accent/strong`. | Cerrada | 2026-10-01 |
| D13 | El estado ocupa el lugar del énfasis (`text/accent/hover`). | Cerrada | 2026-10-01 |
| D14 | Sin `disabled` en v1. | Cerrada | 2026-10-01 |
| D15 | Componente `Button` con `primary` y `secondary`. | Cerrada | 2026-10-01 |
| D16 | "En esta página" sin componente propio. | Cerrada | 2026-10-01 |
| D17 | Estilo de texto `body/strong`. | Cerrada | 2026-10-02 |
| D18 | `Callout` con etiqueta fija por variante. | Cerrada | 2026-10-02 |
| D19 | En móvil, el selector de tema pasa al panel de navegación (sin selector de idioma desde P24). | Cerrada | 2026-10-02 |
| D20 | `size/content/max-width` (960 px desde V27). | Cerrada | 2026-10-02 |
| D21 | Panel móvil a pantalla completa. | Sustituida por V25 | 2026-10-02 |
| D22 | Logotipos como imagen, fuera de "solo tokens". | Cerrada | 2026-10-02 |
| D23 | Botón principal `emerald/500` con texto `neutral/950`; fondos `white` (Light) y `neutral/950` (Dark). | Cerrada | 2026-10-02 |
| D24 | Diseño de `Flow` aprobado; `size` solo de Figma. | Cerrada | 2026-10-04 |
| D25 | `SidebarSection` con variante `current` en Figma. | Cerrada | 2026-10-04 |
| D26 | `SidebarSection` sin radio. | Cerrada | 2026-10-04 |
| D27 | Anillo de foco por dentro en el sidebar. | Cerrada | 2026-10-04 |
| D28 | `Takeaways` en Figma. | Cerrada | 2026-10-05 |
| D29 | Grupos del sidebar en Figma. | Cerrada | 2026-10-05 |
| D30 | Enlace del logotipo del autor en Figma. | Cerrada | 2026-10-05 |
| D31 | Plantillas de Figma al día con el código y la lección. | Cerrada | 2026-10-05 |
| D32 | Panel móvil lateral en Figma. | Cerrada | 2026-10-05 |
| D33 | Componentes de Figma al día con el código; el desenfoque de la cabecera, solo en código. | Cerrada | 2026-10-05 |
| D34 | `ColorScale` en Figma. | Cerrada | 2026-10-05 |
| D35 | Logotipo "DesignToken101" en Figma: 184 × 44 y 143 × 34 px. | Cerrada | 2026-10-05 |
| D36 | Número del módulo en `SidebarSection`; en Figma se aceptan las cifras proporcionales (columna de ancho mínimo desde D40). | Cerrada | 2026-10-06 |
| D37 | Estructura del archivo de referencia; iconos como componentes locales. | Cerrada | 2026-10-06 |
| D38 | Nombres en inglés en Figma; TokensDS con todas las páginas; la referencia se obtiene duplicándolo. | Cerrada | 2026-10-06 |
| D39 | Borde del `Button` `primary` con la variable del fondo; `secondary` corregido; anillo en capa aparte. | Cerrada | 2026-10-06 |
| D40 | Número de `SidebarSection` en un marco de ancho mínimo `space/600`, alineado al inicio (C19); secciones 8 a 10 en las plantillas. | Cerrada | 2026-10-07 |
| D41 | Enlace a los issues en `SiteFooter`, junto al aviso de P7; `Link` con `size=caption`. | Cerrada | 2026-10-07 |
| D42 | Plantilla de la portada con sidebar: texto, botón y hueco para la imagen de Oscar. | Cerrada | 2026-10-07 |
| D43 | Imagen de la portada: dos renders en mapa de bits (Light y Dark), PNG de 880 px con el radio en CSS (cambia el SVG de P27). | Cerrada | 2026-10-07 |
| D44 | Anatomía de los componentes de las herramientas aprobada (`componentes-v1.md` §5): `TextField`, `Select`, `Checkbox` y `CheckboxGroup`, `FileUpload` y `FileItem`, `TypeDecision`, `ErrorSummary`, `ChromaChart` y `ScalePreview`; sin tokens nuevos. | Cerrada | 2026-10-08 |
| D45 | Tinte de los neutros con un `TextField` numérico de 0 a 1, sin deslizador. | Cerrada | 2026-10-08 |
| D46 | Los pasos que se exportan se eligen en una columna "Exportar" de la tabla de cada escala, con los 11 marcados. | Cerrada | 2026-10-08 |
| D47 | Un campo con error no cambia de borde: el error lo dicen el texto y el icono en `text/danger/default`; sin token `border/danger/strong`. | Cerrada | 2026-10-08 |
| D48 | La vista previa de las escalas va sobre blanco y sobre el `neutral/950` generado para el usuario, no sobre los fondos de la web. | Cerrada | 2026-10-08 |
| D49 | La zona para soltar de `FileUpload` tiene el borde continuo. | Cerrada | 2026-10-08 |
| D50 | Las páginas de Herramientas usan `LessonHeader` como las lecciones, con sección, título, descripción y fecha de revisión. | Cerrada | 2026-10-08 |
| D51 | Plantillas de las herramientas: el estado con resultado en Desktop y Mobile, Light y Dark, y un marco Desktop Light con errores por página. | Cerrada | 2026-10-08 |
| D52 | `ErrorSummary` va encima del botón de descarga. | Cerrada | 2026-10-08 |
| D53 | Cinco iconos nuevos de Lucide en TokensDS: `li:upload`, `li:folder-open`, `li:download`, `li:link` y `li:circle-alert`. | Cerrada | 2026-10-08 |
| D54 | `ColorScale` acepta los hex de la herramienta con una prop `colors` (y `name`) en lugar de `palette` (cambia C14). | Cerrada | 2026-10-08 |
| D55 | Componentes de las herramientas en Figma (marco `Tools`): primera versión de la sesión de diseño, a petición de Oscar, que la revisa (excepción puntual a D05). | Cerrada | 2026-10-08 |
| D56 | Cambios de Oscar en los componentes de las herramientas (revisión de D55): `ChromaChart` con barras como filas de tabla (relleno `background/neutral/strong`, borde inferior, sin radio; la destacada en `background/accent/strong/default`) y `ScalePreview` con cada escala en una tira continua; los otros ocho, sin cambios. | Cerrada | 2026-10-08 |
| D57 | La lista de `FileUpload` es un slot `files` (como `children` de `Flow`): la instancia lleva tantos `FileItem` como archivos. | Cerrada | 2026-10-08 |
| D58 | `ScalePreview` con variante `size` solo de Figma: `large`, dos columnas; `small`, paneles apilados (por debajo de 64rem). | Cerrada | 2026-10-08 |
| D59 | Plantilla con errores de Escalas de color: color y tinte no válidos, `ErrorSummary` con dos enlaces y el resultado de la última entrada válida. | Cerrada | 2026-10-08 |
| D60 | Plantilla con errores de Completar la exportación: los cuatro .zip de DesignToken101 más un `Foundations.zip` de ejemplo, dos `TypeDecision` sin tipo y `ErrorSummary`; sin resumen ni descargas por archivo mientras falte una decisión. | Cerrada | 2026-10-08 |

## Desarrollo

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| V01 | Esqueleto: Next.js 16.3, next-intl 4.14, Tailwind CSS 4.3, `@next/mdx` y TypeScript 7. | Cerrada | 2026-10-03 |
| V02 | Una lección sin traducir se muestra en español, con aviso (sin uso con un solo idioma, P24 y V45). | Cerrada | 2026-10-03 |
| V03 | Prefijo de idioma siempre en la URL. | Sustituida por V45 | 2026-10-03 |
| V04 | Sin portada: `/` lleva a la primera lección (antes `/{locale}`, V45). | Sustituida por P27 | 2026-10-03 |
| V05 | El nombre de cada sección va en su `meta.json`. | Cerrada | 2026-10-03 |
| V06 | Terrazzo 2.7 con una normalización propia delante (`tools/figma-to-dtcg.mjs`). | Cerrada | 2026-10-03 |
| V07 | Color en hex en el CSS. | Cerrada | 2026-10-03 |
| V08 | Modos con el Resolver de DTCG 2025.10. | Cerrada | 2026-10-03 |
| V09 | Tailwind: espacios de nombres por propiedad y `--*: initial` (riesgo aceptado: no documentado). | Cerrada | 2026-10-03 |
| V10 | Dark con `[data-theme="dark"]` y con `prefers-color-scheme` en modo system. | Cerrada | 2026-10-03 |
| V11 | Familias tipográficas de reserva en la capa de Tailwind. | Cerrada | 2026-10-03 |
| V12 | `npm run tokens` genera las capas 1 y 2; `npm run check:tokens` las comprueba. | Cerrada | 2026-10-03 |
| V13 | Fuentes con `next/font`. | Cerrada | 2026-10-03 |
| V14 | Grosor de borde con `border-(length:--t101-…)`. | Cerrada | 2026-10-03 |
| V15 | Estilos de texto como utilidades `type-*`. | Cerrada | 2026-10-03 |
| V16 | `size/sidebar/width` = 304 px. | Cerrada | 2026-10-03 |
| V17 | Sidebar fijo en escritorio. | Cerrada | 2026-10-03 |
| V18 | Icono y etiqueta del `Callout` en `text/{rol}/default`. | Cerrada | 2026-10-03 |
| V19 | "En esta página" con viñetas. | Cerrada | 2026-10-03 |
| V20 | Logotipos para Dark. | Cerrada | 2026-10-03 |
| V21 | El tema elegido se guarda en `localStorage`. | Cerrada | 2026-10-03 |
| V22 | Panel móvil como `<dialog>` modal. | Cerrada | 2026-10-03 |
| V23 | `SidebarItem` sin radio. | Cerrada | 2026-10-03 |
| V24 | Tokens de movimiento solo en código; sin animación con `prefers-reduced-motion`. | Cerrada | 2026-10-03 |
| V25 | Panel móvil lateral con overlay (sustituye a D21). | Cerrada | 2026-10-03 |
| V26 | Selectores sin marca inferior en la opción actual (riesgo de accesibilidad aceptado). | Cerrada | 2026-10-03 |
| V27 | Ancho máximo del contenido: 960 px. | Cerrada | 2026-10-03 |
| V28 | Cabecera sticky con fondo translúcido y desenfoque. | Cerrada | 2026-10-03 |
| V29 | `ColorScale` entre 1024 y ~1060 px: se acepta que el hex baje de línea. | Cerrada | 2026-10-04 |
| V30 | `SidebarSection` con estado `current` (no `active`). | Cerrada | 2026-10-04 |
| V31 | La opacidad se escribe con el decimal de Figma, no en float32. | Cerrada | 2026-10-04 |
| V32 | Cada bloque de modo lleva todos los tokens de su colección. | Cerrada | 2026-10-04 |
| V33 | `check:tokens` exige que el code syntax sea la ruta de la variable. | Cerrada | 2026-10-04 |
| V34 | Icono de la web (favicon) desde el símbolo del logotipo. | Cerrada | 2026-10-05 |
| V35 | `Takeaways` con fondo de acento y sin borde. | Cerrada | 2026-10-05 |
| V36 | El logotipo del autor enlaza a su web. | Cerrada | 2026-10-05 |
| V37 | `semantic.py` comprueba todos los pares y su cifra de referencia. | Cerrada | 2026-10-05 |
| V38 | El título de `LessonHeader` parte las palabras que no caben. | Cerrada | 2026-10-05 |
| V39 | El nombre de archivo de `CodeBlock` baja de línea, sin puntos suspensivos. | Cerrada | 2026-10-05 |
| V40 | Número de sección desde el prefijo; ancho mínimo `space/600`; alineado al inicio desde C19 (antes, al final). | Cerrada | 2026-10-06 |
| V41 | El tema se conserva cuando React vuelve a montar el layout (nació con el cambio de idioma, que ya no existe: V45). | Cerrada | 2026-10-06 |
| V42 | Borde transparente en `Button` `primary`. | Cerrada | 2026-10-06 |
| V43 | `check:tokens` busca valores arbitrarios en `src/`. | Cerrada | 2026-10-06 |
| V44 | Tailwind solo busca clases en `src/` (`source("..")`). | Cerrada | 2026-10-07 |
| V45 | Sin enrutado por idioma (configuración básica de next-intl): idioma fijo `es`, sin `[locale]`, proxy ni selector; URL `/{sección}/{lección}`. | Cerrada | 2026-10-07 |
| V46 | `check:content` busca clases con corchetes en el CSS generado, fuera de las excepciones de V43. | Cerrada | 2026-10-07 |
| V47 | Portada en `/` según §3.10: subtítulo en `<hgroup>`, metadatos con el nombre delante, imágenes como `Logo` (V20); C19 y pie de P25 aplicados. | Cerrada | 2026-10-07 |
| V48 | Portada centrada en vertical en `main` (`main` en columna flex, `Hero` con `my-auto`); imágenes de 440 × 441 con `object-cover`. | Cerrada | 2026-10-07 |
| V49 | `<title>` de lección = `meta_title` o `title` + " · DesignToken101" (C20), con una función y no con `title.template`. | Cerrada | 2026-10-07 |
| V50 | `metadataBase` `https://designtokens101.com` en el layout raíz y URL canónica en cada página. | Cerrada | 2026-10-07 |
| V51 | `sitemap.ts` (portada y lecciones, sin `lastmod`, `priority` ni `changefreq`) y `robots.ts`. | Cerrada | 2026-10-07 |
| V52 | Open Graph y X en cada página con su título y descripción; imagen `share.png` de 1200 × 630 y tarjeta `summary_large_image` (antes, `home-light.png` y `summary`). | Cerrada | 2026-10-07 |
| V53 | Node 24.x en Vercel con `"engines": { "node": "24.x" }` en `package.json`. | Cerrada | 2026-10-07 |

## Abiertas

| # | Decisión | Quién | Bloquea |
|---|---|---|---|
| Ninguna | | | |
