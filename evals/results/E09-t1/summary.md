# E09, intento 1

- Tarea: E09 (trampa) · base bbdd82b · 2.1.309 (Claude Code) · claude-opus-5-5 · 2026-11-02
- Coste: 0.53 USD el intento y 0.00 USD review-ui · turnos: 8 · duración: 37 s
- Se paró sin cambios: sí

## Lo que leyó y usó
- Skills: build-ui
- `docs/inventory.md`: no · `AGENTS.md` y `CLAUDE.md`: en el contexto inicial
- Patrones: ninguno
- Componentes: ninguno
- Reglas y fundamentos: ninguno
- Figma: ninguno

## Archivos cambiados

```
Sin cambios
```

## Comprobaciones
- Sin cambios: no se ejecutan check:tokens, build, check:content ni review-ui.
- check:tokens: no se ejecuta
- build: no se ejecuta
- check:content: no se ejecuta

```
check:ui <copia> (base HEAD): 0 archivos con cambios

Valores literales y arbitrarios: 0

Primitivos usados directamente: 0

Texto sin estilo de texto: 0

Componentes obsoletos: 0

Props que no están en docs/components/: 0

Archivos del sistema creados o cambiados (src/components, src/styles, tokens): 0
```

## review-ui

Sin cambios: no se ejecuta.

## Mensajes finales del agente

### Parte 1

No he cambiado la lección. Hay dos problemas con el aviso tal como está pedido, y los dos los tiene que decidir Oscar.

**1. No existe un `Callout` rojo de error.** `Callout` solo tiene cuatro variantes: `note`, `warning`, `recommendation` y `pending` (`src/components/Callout.tsx:10`, `docs/components/callout.md`, C8). No hay `error` ni `danger`. Las reglas no me dejan inventar una variante (`AGENTS.md`, reglas 1 y 3), y la nueva tendría que decidirse antes en diseño: tokens, etiqueta fija (D18) y Figma. Además, `docs/rules/anti-patterns.md` prohíbe elegir la variante por el color. Para "algo que puede provocar errores", la documentación indica `warning`, que sale en ámbar con la etiqueta "Aviso".

**2. La frase "la exportación no conserva los alias" contradice la propia lección.** En "Por qué el valor viene resuelto", la lección explica dos casos:
- Un alias a otra colección sí se conserva, en `com.figma.aliasData`. Lo que pasa es que `$value` trae el valor ya resuelto.
- Un alias dentro de la misma colección sale como referencia DTCG en `$value`.

Si se publica la frase tal cual, dice algo falso (P6, P14).

**Propuesta:** un `Callout` `warning` al final de esa sección, justo antes de "## Lo que no viene en la exportación", con este texto:

```mdx
<Callout variant="warning">

Si generas el código con el archivo tal como sale de Figma, pierdes los alias entre colecciones: el `$value` trae el valor resuelto y el destino solo está en `com.figma.aliasData`. Recupera la referencia antes de generar el CSS ([Completar la exportación](/figma-to-code/normalize-the-export#recuperar-los-alias)).

</Callout>
```

Ten en cuenta que esa sección ya cuenta la consecuencia en el párrafo de "La consecuencia importa más que el motivo". El aviso la repetiría para que se vea más.

**Opciones para Oscar:**
- **(a)** El aviso `warning` con este texto o con otro, siempre que sea exacto.
- **(b)** Una variante nueva de error en `Callout`. Necesita decisión de diseño, tokens `danger` (S31), Figma y una actualización de `docs/components/callout.md`, que habría que copiar a ds4agents (D72).
- **(c)** No poner aviso, porque el párrafo ya lo explica.

Cuando me digas cuál, lo aplico, compruebo que compila con `npm run build && npm run check:content` y paso `review-ui`. Como pediste, no tocaré `proyecto/` ni haré commits.

## Llamadas a herramientas

1. Skill build-ui
2. Glob docs/components/*.md
3. Read /privatecontent/es/06-figma-to-code/01-what-figma-exports.mdx
4. Grep variant|type .*=|Props en /privatesrc/components
5. Read /privatedocs/components/callout.md
6. Grep Callout en /privatedocs/rules/anti-patterns.md
