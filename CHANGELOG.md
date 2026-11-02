# Changelog

Cambios del sistema de diseño DesignToken101: tokens, componentes, reglas de uso y Code Connect. El formato sigue [Keep a Changelog 1.1.0](https://keepachangelog.com/es-ES/1.1.0/) y la numeración, el [versionado semántico](https://semver.org/).

**API pública** (S36, ampliada por D78):
- Los nombres de las variables publicadas en Figma, de las variables CSS (`--t101-*`) y de las clases de la capa 2.
- Los componentes y sus props, tal como los documenta `docs/components/`.
- Las reglas de uso escritas en `docs/` y en `AGENTS.md`.

Los valores de los tokens no forman parte de la API.

| Cambio | Versión |
|---|---|
| Borrar o renombrar un token, un componente o una prop | MAJOR |
| Añadir un token, un modo, un estilo de texto, un componente, una prop o un patrón; marcar algo como obsoleto; cambiar una regla de uso | MINOR |
| Cambiar el valor o el alias de un token; corregir una descripción o un ejemplo | PATCH |

## [Unreleased]

### Changed
- `docs/patterns/checklist.md` dice que es solo para el final de un capítulo de ds4agents; en DesignToken101, una página con una lista de comprobación sigue `docs/patterns/lesson-page.md` (V64).

## [1.3.0] - 2026-11-01

Primera versión con los componentes del piloto y sus reglas dentro de la API pública (D78). No cambia ningún token: quien usa el sistema no tiene que cambiar nada.

### Added
- Documentación del sistema en `docs/` (D67): fundamento de color, con los semánticos de color y los modos Light y Dark (`foundations/color.md`, D77); documentos de Button, TextField, Callout, Takeaways y CodeBlock (`components/`); patrones de página de lección y de lista de comprobación (`patterns/`); voz y tono (`content/voice-and-tone.md`); reglas de tokens y antipatrones (`rules/`, D65 y V61); inventario del piloto (`inventory.md`).
- CodePreview: `CodeBlock` con `preview`, para bloques `markdown` con vista previa (V60). En `beta`.
- `npm run docs:check`, que valida `docs/` en la integración continua, y `npm run docs:figma`, que genera desde `docs/` las guidelines de la librería de Figma (D67).
- Contexto en TokensDS (D64 y D67): descripciones de componente con plantilla y línea "Docs:", anotaciones en cada variante, dev resources al archivo de código y enlace de documentación a `docs/components/`.
- Code Connect con plantillas `.figma.ts` (D68 a D71): Button, TextField, Callout, Takeaways, CodeBlock, CodePreview, AnnotatedCode y los 26 iconos `li:*`.
- `AGENTS.md`, con las reglas del sistema para agentes (D73), y las skills `build-ui` y `review-ui` (D74).
- Sistema de diseño DesignToken101 en Claude, con los cinco componentes del piloto (D75, D76, V62 y V63).

### Changed
- La API pública incluye los componentes, sus props y las reglas escritas, además de los nombres de los tokens (D78).
- Las versiones del sistema se registran en este archivo; antes, en `proyecto/sistema-tokens-v1.md`.

## [1.2.0] - 2026-10-21

### Added
- `radius/group` en Semantic size, alias de `radius/300`: el radio del carril que agrupa varios controles (D65; creado como `radius/nested` y renombrado en la misma versión, D66).

### Changed
- Descripciones de los semánticos reescritas en dos partes, para qué sirve y su restricción, sin referencias internas (D65). No cambia ningún nombre.

## [1.1.0] - 2026-10-09

### Added
- Breakpoints de Tailwind CSS como tokens solo de código: `breakpoint/sm`, `md`, `lg`, `xl` y `2xl` (S38).

### Changed
- `breakpoint/desktop` pasa a ser alias de `breakpoint/lg`, con el mismo nombre y el mismo valor, 64rem (S38). No hay que cambiar nada.

## [1.0.0] - 2026-10-06

### Added
- Primera versión estable: 97 primitivos, 33 semánticos de color, 4 de tamaño, 9 de Layout, 10 estilos de texto y los tokens solo de código (S36).
