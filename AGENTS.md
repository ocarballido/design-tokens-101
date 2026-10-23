# Sistema de diseño DesignToken101: instrucciones para agentes

Este repositorio contiene la web-curso DesignToken101 y su sistema de diseño: tokens (prefijo `--t101-`), componentes React y su documentación. Escribe en español.

## Reglas no negociables
1. Usa solo componentes de `src/components`. Si lo que necesitas no existe, para y dilo; no lo crees.
2. Nunca escribas valores literales de color, espaciado, radio, grosor o tamaño. Usa tokens semánticos (`docs/rules/rules-tokens.md`, `docs/foundations/color.md`).
3. Nunca inventes props. Compruébalas en `docs/components/<nombre>.md` o, fuera del piloto, en el tipo de props del componente en `src/components`.
4. No uses componentes con `status: deprecated`. Usa el de su campo `replaced_by`.
5. Accesibilidad WCAG 2.2 AA: contraste, etiquetas, foco visible con `:focus-visible`, objetivos de 24 × 24 px y sin scroll horizontal a 320 px. Lo que no debe hacerse: `docs/rules/anti-patterns.md`.

## Dónde está cada cosa
- Índice de componentes y su estado: `docs/inventory.md` (piloto); la anatomía del resto, en `proyecto/componentes-v1.md`
- Recetas de pantallas: `docs/patterns/`
- Fundamentos y reglas transversales: `docs/foundations/` y `docs/rules/`
- Voz y tono: `docs/content/voice-and-tone.md`
- Tokens: `tokens/figma/` (exportación de Figma, sin editar), `tokens/code-only.tokens.json` y `src/styles/tokens.css` y `theme.css` (generados; no se editan a mano)
- Code Connect: `src/components/*.figma.ts` y `src/components/icons.figma.batch.*`

## Cómo crear una interfaz
1. Busca en `docs/patterns/` un patrón que encaje y sigue su receta.
2. Si partes de un diseño de Figma (archivo TokensDS), usa el servidor MCP de Figma para el contexto y las variables, y su mapa de Code Connect para saber qué componente de `src/components` corresponde a cada uno.
3. Lee el documento de cada componente que vayas a usar.
4. Revisa el resultado con las reglas de arriba antes de terminar.

## Comandos
- `npm run tokens`: genera los tokens; después, `npm run check:tokens` los comprueba
- `npm run docs:check`: valida la documentación de `docs/`
- `npm run docs:figma`: genera las guidelines de Figma desde `docs/`
- `npm test`: pruebas de `tools/`
- `npm run build && npm run check:content`: compila y comprueba el contenido
