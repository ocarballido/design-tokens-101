# Tokens101 — Estado

Qué está hecho, qué falta y qué está bloqueado en cada frente. **Cada sesión lo actualiza al terminar** (fecha + qué cambió). Las decisiones van en `docs/decisiones.md`, no aquí.

Última actualización: 2026-10-03 (sesión de contenido: fuente de verdad trasladada del Project de claude.ai a este repositorio, P9).

---

## Plan general

| Paso | Frente | Qué | Estado |
|---|---|---|---|
| 1 | Contenido | Revisar el bloque 0 (MDX en español) | Hecho (2026-09-30): aprobado por Oscar |
| 2 | Contenido | Ejercicio de cierre de la fase 1 → especificación `docs/sistema-tokens-v1.md` | Hecho (2026-09-30) |
| 3 | Oscar | Crear el repositorio en GitHub | Hecho (2026-10-03): `ocarballido/design-tokens-101`. Documentos trasladados aquí (P9) |
| 4 | Desarrollo A | Esqueleto: Next.js + next-intl + `@next/mdx`, renderizando el bloque 0 sin diseño | **Siguiente.** Desbloqueado |
| 5 | Diseño | Variables en Figma → componentes → plantillas | Hecho (2026-10-02). Entrega en `docs/entrega-diseno.md`. Solo queda A14 (nombre del logotipo), que no bloquea |
| 6 | Contenido | Redactar los módulos 1 a 7 | Pendiente (en paralelo con 4, 7 y 8) |
| 7 | Desarrollo B | Exportar DTCG desde Figma → Style Dictionary vs Terrazzo → CSS y `@theme` | Desbloqueado. Oscar exporta las 4 colecciones desde Figma (`docs/entrega-diseno.md` §2) |
| 8 | Desarrollo C | Componentes y páginas con el diseño | Desbloqueado. Guía en `docs/entrega-diseno.md` §3. Mejor después de 4 y 7 |
| 9 | Contenido | Versión en inglés del contenido cerrado | Cuando el español esté cerrado |

## Contenido

**Hecho**
- Documento de la fase 1 con fuentes (`docs/fase-1-fundamentos-tokens.md`).
- Bloque 0 en español, borrador en MDX (`content/es/`):
  - 00-start-here: what-is-tokens101, why-this-site, what-is-dtcg, figma-dtcg-tailwind, what-we-teach, requirements, how-this-site-was-made
  - 99-resources: sources
- Convenciones de contenido (`content/README.md`).

**Pendiente**
- Lección del módulo 8 (Ejercicio final) a partir del ejercicio de cierre (S8–S29).
- **Lección sobre espacio de color (módulo 2, Primitivos):** documentar la decisión B con detalle (por qué oklch para construir, por qué sRGB para guardar, límites de Figma, cómo reproducir el método con el script). Oscar lo pidió expresamente.
- Módulos 1 a 8.
- Investigación del módulo 7 (accesibilidad): WCAG 2.2, foco, `prefers-reduced-motion`, `forced-colors`, tamaño de objetivos táctiles. Recordar que APCA no es norma.
- Glosario y página de errores frecuentes (a partir de la lista de la fase 1).
- **Textos que no coinciden con el diseño** (aviso de la sesión de diseño, 2026-10-02): el sidebar del diseño decía "Comenzar aquí" (el contenido dice "Empezar aquí"; ya unificado en diseño a "Empezar aquí"). "En esta página" es un párrafo en negrita en el MDX y en el diseño (`body/strong`, D17); si se quisiera como título, sería un cambio de T3.

**Pendiente de reflejar en el contenido**
- S9, S10: lección sobre espacio de color y método de escalas (módulo 2).
- S13, S18, S19: escalas primitivas y de estado (módulo 2).
- S14, S15, S17: nomenclatura propiedad primero y convención (módulo 4).
- S21: tabla semántica y contraste (módulos 3, 5 y 7).
- S22, S23: visibilidad y scopes en Figma; semánticos de radio (módulos 2 y 3, apartados "En Figma").
- S24: estilos de texto como capa semántica tipográfica (módulo 3).
- S25, S26: tokens solo de código cuando Figma no los admite (módulo 6).
- S27: prefijo `--t101-` y por qué evita la referencia circular (módulo 6). Matiza el error corregido n.º 8 de la fase 1.
- **D01:** Figma interpreta una variable en el interlineado como píxeles; por eso `line-height/*` es solo de código y los estilos usan porcentaje (módulos 2 y 6). Candidato a "errores frecuentes".
- **D02:** el scope `GAP` cubre gap y padding; el espaciado negativo es solo de código (módulos 2 y 6).
- **D03:** code syntax Web con `var(--t101-…)`; ejemplo real de lo que produce el servidor MCP de Figma con cada formato (módulos 6 y 10).
- **D04:** pesos como variables Number; diferencia entre String y Number en Dev Mode (módulos 2 y 6). Afecta a la fase 1 (tema 2, "Peso tipográfico").
- **D10, D11:** tamaños de texto por contexto (colección Layout) y breakpoint solo de código (módulos 5 y 6).
- **D12–D14:** tokens de estado, por qué no hay categoría `action`, el estado en el lugar del énfasis (patrón SDS) y por qué no hay disabled (módulos 3, 4 y 7). Buen ejemplo para el módulo 7: el hover no necesita 3:1, el indicador de seleccionado sí.
- **D17:** en Figma la negrita de un fragmento rompe el estilo de texto; por eso existe `body/strong` (módulo 3). Candidato a "errores frecuentes".
- **D20:** token de ancho máximo de la columna de lectura y por qué es una excepción a "semánticos siempre alias" (módulos 3 y 4).
- **P9:** cómo se comparte una fuente de verdad entre sesiones y herramientas (material para el módulo 10).

**Sin verificar**
- El MDX no se ha compilado: en la sesión de contenido el registro de npm estaba bloqueado. Se revisó con un script (llaves, etiquetas y anclas) sin errores. La prueba real es el primer build (paso 4).
- Formato de las anclas con `rehype-slug` (tildes conservadas).

## Diseño

**Estado:** cerrado (2026-10-02). Todo lo que necesita desarrollo está en `docs/entrega-diseno.md`.

**Archivo:** [TokensDS](https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS) · plan Professional · perfil de color sRGB.

**Resumen de lo hecho**
- **Variables:** Primitives (97), Semantic color (31, Light/Dark), Semantic size (3) y Layout (9, Desktop/Mobile). Code syntax Web `var(--t101-…)` en todas (D03). No existen en Figma: `line-height/*` (D01), `space/negative/*` (D02) ni `breakpoint/desktop` (D11).
- **Estilos de texto:** 10 (§8 de la especificación, incluido `body/strong`, D17). Interlineado en porcentaje, sin variable (D01). Sin estilos de efecto (S28).
- **Componentes:** 22, con nombres de propiedades iguales a los props de React. Plantillas de lección en escritorio y móvil, Light y Dark, y menú móvil abierto.
- **Auditoría final (2026-10-02):** sin valores sueltos (salvo logotipos, D22), todo el texto con estilo, todos los `focus` con anillo `border/focus`, contraste de textos ≥ 4,5:1 e iconos ≥ 3:1 en Light y Dark, objetivos ≥ 24 × 24 px.

**Pendiente**
- A14: nombre del logotipo ("design-tokens 101" frente a "Tokens101"). No bloquea.
- Ver a mano cómo muestra Dev Mode el code syntax `var(--t101-…)` en el panel Inspect (D03).
- `tools/semantic.py` no incluye todavía los tokens de D06, D12 y D20 (el contraste se comprobó en Figma y con un cálculo aparte).

## Desarrollo

**Estado:** no iniciado. Repositorio creado (2026-10-03) con `docs/`, `content/`, `tools/` y `CLAUDE.md`.

**Paso 4 (siguiente):** comprobar que la decisión de contenido funciona (MDX con `@next/mdx` + next-intl + frontmatter + anclas) antes de aplicar el diseño.

**Para los pasos 7 y 8 (de la sesión de diseño):** ver `docs/entrega-diseno.md`.
- Hay un estilo de texto más, `body/strong` (§8): en CSS es `font-weight: var(--t101-font-weight-600)` sobre `body/default`.
- Colección Layout (modos Desktop y Mobile): en CSS, Mobile es el valor por defecto y Desktop va en `@media (width >= 64rem)` (D11). `breakpoint/desktop` es solo de código.
- `line-height/*` y `space/negative/*` no vienen en la exportación de Figma: se generan desde `docs/sistema-tokens-v1.md` §4 (D01, D02).
- Comprobar con qué `$type` exporta Figma las variables Number de `font-weight/*` (D04) y qué `colorSpace` escribe en el color.
- Los estilos de texto no se exportan en DTCG: la fuente es la tabla §8.

## Hallazgos que afectan a otros frentes

- **2026-09-30 — Color en Figma.** La importación DTCG de Figma solo admite color en sRGB y HSL, dimensiones en `px`, duraciones en `s` y la familia tipográfica como un único nombre (Figma — Modes for variables).
- **2026-09-30 — DTCG.** La versión 2025.10 (Format, Color y Resolver) es un *Final Community Group Report* del 28/10/2025. No es un estándar del W3C, pero se declara estable.
- **2026-09-30 — npm.** En el entorno de la sesión de contenido, el registro de npm devuelve 403. Si pasa lo mismo en desarrollo, el build habrá que hacerlo en local o en Vercel.
- **2026-09-30 — MCP de Figma usa el code syntax (sesión de diseño).** `get_design_context` escribe las variables con su code syntax Web y un valor de reserva: `gap-[var(--t101-space-200,8px)]`. Material para el módulo 10.
- **2026-09-30 — Scopes en la API de plugins (sesión de diseño).** Solo hay un scope `GAP` para gap y padding de auto layout. La ayuda de Figma los enumera por separado en la interfaz, pero la API no permite separarlos.
- **2026-10-03 — Claude Code y los Projects.** Claude Code no lee los documentos de un Project de claude.ai; carga `CLAUDE.md` y los archivos que importa con `@ruta` ([Claude Code — Memory](https://code.claude.com/docs/en/memory)). Por eso la fuente de verdad pasa al repositorio (P9).
