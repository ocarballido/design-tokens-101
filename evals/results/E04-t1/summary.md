# E04, intento 1

- Tarea: E04 (patrón) · base bbdd82b · 2.1.309 (Claude Code) · claude-opus-5-5 · 2026-11-02
- Coste: 1.41 USD el intento y 0.81 USD review-ui · turnos: 27 · duración: 216 s
- Se paró sin cambios: no

## Lo que leyó y usó
- Skills: build-ui, review-ui
- `docs/inventory.md`: no · `AGENTS.md` y `CLAUDE.md`: en el contexto inicial
- Patrones: ninguno
- Componentes: ninguno
- Reglas y fundamentos: ninguno
- Figma: ninguno

## Archivos cambiados

```
content/es/99-resources/03-common-mistakes.mdx | 134 +++++++++++++++++++++++++
 1 file changed, 134 insertions(+)
```

## Comprobaciones
- check:tokens: sin errores
- build: sin errores
- check:content: sin errores

```
check:ui <copia> (base HEAD): 1 archivos con cambios

Valores literales y arbitrarios: 0

Primitivos usados directamente: 0

Texto sin estilo de texto: 0

Componentes obsoletos: 0

Props que no están en docs/components/: 0

Archivos del sistema creados o cambiados (src/components, src/styles, tokens): 0
```

## review-ui

La revisión con `review-ui` no encuentra ningún error de tokens, componentes ni estructura. Quedan dos problemas de redacción.

Solo hay un archivo cambiado: `content/es/99-resources/03-common-mistakes.mdx`.

**Comprobaciones automáticas:** `npm run check:tokens`, `npm run build` y `npm run check:content` terminan sin errores. También he comprobado a mano que existen los 13 enlaces con ancla a otras lecciones.

| Regla (documento) | Archivo y línea | Problema | Corrección |
|---|---|---|---|
| "Una prueba propia dice con qué se hizo y su fecha" (`docs/content/voice-and-tone.md`, Voz) | `03-common-mistakes.mdx:25` | "al probarlo en Figma" no dice cuándo se hizo la prueba. | Añade la fecha de la prueba (D01, 2026-09-30, o la que figure en el historial). |
| Igual | `03-common-mistakes.mdx:37` | "Lo comprobamos en el archivo de DesignToken101" no dice con qué se hizo ni cuándo. | Di con qué se comprobó y su fecha (D17, 2026-10-02, o la del historial). |
| Igual | `03-common-mistakes.mdx:72` | "(octubre de 2026)" es una fecha imprecisa. | Pon la fecha exacta de la prueba con Style Dictionary 5.5.5 y Terrazzo 2.7.1. |
| "Segunda persona (tú) y voz activa" (`docs/content/voice-and-tone.md`, Voz) | `03-common-mistakes.mdx:100` | "Se usa con la sintaxis de variable" es una frase impersonal. | Por ejemplo: "Úsalo con la sintaxis de variable: …". |

Lo demás cumple las reglas:
- **Callout:** los cinco usan `recommendation` para decisiones propias y ninguno usa `pending`.
- **Takeaways:** hay uno solo, con su título `##`, tres viñetas sin enlaces, y va antes de "Fuentes".
- **Página:** "En esta página" incluye el resumen y no hay guiones largos.
- **Fuentes:** todas las afirmaciones sobre herramientas enlazan a una fuente oficial.

## Mensajes finales del agente

### Parte 1

He escrito la página de errores frecuentes: `content/es/99-resources/03-common-mistakes.mdx`. Se publica en `/resources/common-mistakes`, como tercera página de Recursos, después de "Archivos de Figma". El build, `check:content` y `check:tokens` terminan sin errores, y la revisión con `review-ui` no encontró problemas.

**Contenido.** Sigue la receta de `docs/patterns/lesson-page.md`: introducción, "En esta página", un apartado por error, `Takeaways` y Fuentes. Los ocho candidatos de `estado.md` van en el orden en que aparecen en el curso. Cada uno dice qué pasa, por qué y cómo evitarlo, y termina con el enlace a la lección que lo explica:

| Error | Lección enlazada |
|---|---|
| El interlineado como variable (D01) | `/fundamentals/simple-types#interlineado` |
| La negrita en un fragmento de texto (D17) | `/relations/text-styles#un-texto-sin-estilo-es-un-valor-suelto` |
| Renombrar o duplicar sin cambiar el code syntax (V33) | `/naming/create-variables#si-tienes-que-renombrar` |
| Un modo elegido en el componente principal | `/modes/apply-modes#instancias-y-componentes` |
| Los alias que llegan resueltos (paso 7) | `/figma-to-code/what-figma-exports#por-qué-el-valor-viene-resuelto` |
| La opacidad en float32 (V31) | `/figma-to-code/normalize-the-export#la-opacidad-en-float32` |
| La clase `border` sin valor (V14) | `/figma-to-code/tailwind-theme#lo-que-no-se-expone` |
| La familia tipográfica con el nombre de Figma (V13) | `/figma-to-code/tailwind-theme#la-familia-tipográfica` |

En seis errores hay además un segundo enlace, a la lección del código o de la comprobación.

**Criterios que he seguido:**
- **Nada nuevo.** Todas las afirmaciones salen de las lecciones, con sus fuentes oficiales y las fechas de las pruebas propias.
- **Recomendaciones aparte.** Las decisiones propias de DesignToken101 van en un `Callout` `recommendation`, separadas de lo que dice la fuente.
- **Duplicar una variable.** Lo junto con renombrar en un mismo apartado, como hace "Comprobar y actualizar". La frase "la copia lleva el code syntax de la original" la deduzco de esa lección. Ninguna lección cuenta una prueba concreta de duplicar en Figma; si la quieres más prudente, la cambio.
- **Sin "En Figma" ni `InCode`.** No los he puesto, porque la página es de referencia y no enseña un paso nuevo.

**Pendiente para ti** (como pediste, no he tocado `proyecto/` ni he hecho commits):
- En `estado.md`, la parte de la página de errores en el punto "Glosario y página de errores frecuentes". El glosario sigue sin hacer.
- No he comprobado si "Fuentes consultadas" (`01-sources.mdx`) ya tiene las siete fuentes de la página.

## Llamadas a herramientas

1. Skill build-ui
2. Bash ls docs docs/patterns content/es && ls content/es/* && cat content/es/99-resources/meta.json 2>/dev/null; ls content/es | tail -3
3. Bash cat docs/patterns/lesson-page.md content/README.md && cat content/es/99-resources/02-figma-files.mdx && cat docs/content/voice-and-tone.md
4. Bash cd /privatecontent/es && grep -rn -i "alias" 06-figma-to-code/01-what-figma-exports.mdx | head -20; echo ---F32; grep -rn -i "float32\|0,8\?0000\|precisión" --i
5. Bash grep -rn -i "píxeles\|pixeles" --include=*.mdx . | head; echo ---FONT; grep -rn "next/font\|font-family: Inter" --include=*.mdx . | head; echo ---BORDER; grep -
6. Grep float32|float de 32|32 bits en /privatecontent/es
7. Grep (?i)(duplic|renombr).{0,120}code syntax|code syntax.{0,120}(duplic|renombr) en /privatecontent/es
8. Grep (?i)píxeles|next/font|font-family: Inter|negrita|componente principal en /privatecontent/es
9. Grep `border`|border-\(length en /privatecontent/es
10. Bash sed -n 1,20p 06-figma-to-code/02-normalize-the-export.mdx; sed -n 60,112p 06-figma-to-code/02-normalize-the-export.mdx; echo =====; sed -n 1,20p 06-figma-to-cod
11. Bash sed -n 1,20p 03-relations/06-text-styles.mdx; sed -n 55,95p 03-relations/06-text-styles.mdx; echo =====; sed -n 120,140p 01-fundamentals/02-simple-types.mdx; ec
12. Bash sed -n 20,40p 06-figma-to-code/02-normalize-the-export.mdx; echo "-----"; sed -n 1,22p 06-figma-to-code/05-tailwind-theme.mdx; sed -n 100,160p 06-figma-to-code/
13. Bash sed -n 1,22p 01-fundamentals/02-simple-types.mdx; sed -n 120,140p 01-fundamentals/02-simple-types.mdx; echo "-----"; sed -n 1,20p 05-modes/05-apply-modes.mdx; s
14. Grep ^##+ .*` en /privatecontent/es
15. Bash cd /private. && cat content/es/meta.json; sed -n 1,30p content/es/99-resources/01-sources.mdx; sed -n 60,80p content/es/06-figma-to-code/07-check-and-update.mdx
16. Write /privatecontent/es/99-resources/03-common-mistakes.mdx
17. Bash cd /privatecontent/es && grep -m1 "^title:" 06-figma-to-code/06-text-styles-in-code.mdx 06-figma-to-code/07-check-and-update.mdx 09-components/04-components-in-
18. Edit /privatecontent/es/99-resources/03-common-mistakes.mdx
19. Edit /privatecontent/es/99-resources/03-common-mistakes.mdx
20. Bash cd /private. && (npm run build > /tmp/t101-build.log 2>&1; echo "build exit $?"; tail -15 /tmp/t101-build.log) && npm run check:content 2>&1 | tail -20
21. Bash npm run build 2>&1 | tail -25
22. Bash npm run check:content 2>&1 | tail -20; ls .next/server/app/resources/ 2>/dev/null | grep -i mistake
23. Skill review-ui
24. Bash cd /private. && npm run check:tokens 2>&1 | tail -5; grep -n "—\|fácil\|rápido\|sencillo\|simplemente" content/es/99-resources/03-common-mistakes.mdx; grep -n "
