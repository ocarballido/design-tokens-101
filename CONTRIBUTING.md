# Contribuir al sistema de diseño DesignToken101

Cómo se añade, se cambia o se retira un token, un componente o una regla del sistema sin romper lo que leen las personas y los agentes. La API pública del sistema y sus versiones están en `CHANGELOG.md`; las reglas para agentes, en `AGENTS.md`.

Oscar Carballido decide y publica (D77: trabaja solo). Las sesiones de Claude (contenido, diseño y desarrollo) proponen y construyen según el protocolo de `proyecto/decisiones.md`.

## El proceso

Un cambio en el sistema sigue estos pasos, en este orden:

1. **Propuesta y decisión.** El problema, dónde se usaría y qué token o componente existente no lo resuelve. Las opciones se plantean a Oscar, que decide. Quien decide escribe, en el mismo commit, la decisión completa en `proyecto/decisiones-detalle.md`, su resumen en `proyecto/decisiones.md` y el documento afectado.
2. **Diseño en TokensDS.** Oscar diseña los componentes (D05). TokensDS no usa ramas: en Figma son de los planes Organization y Enterprise ([Figma: Lesson 4, Document and manage your system](https://help.figma.com/hc/en-us/articles/14552804059927-Lesson-4-Document-and-manage-your-system)), y el proyecto usa Professional (P13). Un cambio que altera la especificación vuelve a comprobar el contraste.
3. **Código.** El componente, en `src/components`, solo con tokens semánticos (`docs/rules/rules-tokens.md`). Si cambian los tokens: nueva exportación en `tokens/figma/`, sin editar, y después `npm run tokens` y `npm run check:tokens`. `src/styles/tokens.css` y `theme.css` no se editan a mano.
4. **Documento.** En `docs/components/<nombre>.md`, con frontmatter, y `npm run docs:check`. Un cambio en `docs/`, salvo `inventory.md` y `content/voice-and-tone.md`, se copia a ds4agents (D72). Las guidelines de la librería se regeneran con `npm run docs:figma` y se suben a TokensDS (Library → Manage guidelines…).
5. **Code Connect.** Una plantilla `.figma.ts` junto al componente (D68), comprobada con `npx figma connect parse` y publicada con `npx figma connect publish`. Sin instrucciones para el MCP: las reglas llegan al agente por la descripción del componente en Figma, con su línea "Docs:", y por `docs/` (D69).
6. **Comprobaciones.** `npm run check:ui`, `npm run check:tokens`, `npm test` y `npm run build && npm run check:content`.
7. **Changelog y publicación.** Una entrada en `CHANGELOG.md` y la versión en todos los destinos: TokensDS publicado con una nota que empieza por el número de versión, las guidelines, el sistema de diseño en Claude y, si cambia algo de Figma, el archivo de referencia de Community, que se vuelve a duplicar desde TokensDS (D38).

## Definition of Done de un componente

- [ ] Cumple la lista Ready for AI de `docs/inventory.md`: variables, capas por función, descripción con plantilla y línea "Docs:", anotaciones en la variante, dev resource al código y enlace de documentación
- [ ] Usa solo tokens semánticos o de componente (S33), sin valores literales (`npm run check:ui` y `npm run check:tokens`)
- [ ] Tiene documento en `docs/components/` y pasa `npm run docs:check`
- [ ] Sus props tienen los mismos nombres en el tipo de props del componente y en su documento
- [ ] Está conectado con Code Connect con una plantilla `.figma.ts` y su descripción de Figma enlaza a `docs/`
- [ ] Si lo usa una tarea de `evals/evals.md`, esa tarea vuelve a sacar un 3 (un intento, V65)
- [ ] Cumple WCAG 2.2 AA y no contradice ninguna regla escrita en `docs/rules/` ni en `AGENTS.md`
- [ ] Tiene entrada en `CHANGELOG.md` y fila al día en `docs/inventory.md`

Sin todos los puntos, el componente no está terminado. La Definition of Done no decide su estado: un componente con puntos abiertos es `beta` (`docs/inventory.md`).

## Retirar un componente

1. Cambia `status: deprecated` y añade `replaced_by` en su documento de `docs/components/`.
2. Escribe el sustituto en su descripción de Figma y muévelo fuera de las páginas de componentes de TokensDS.
3. Anótalo en la sección Deprecated de `CHANGELOG.md`.
4. Mantenlo al menos una versión mayor antes de eliminarlo; al eliminarlo, borra también su plantilla de Code Connect.

## Roles

| Rol | Quién |
|---|---|
| Responsable del sistema: decide, revisa y publica las versiones | Oscar |
| Referente de diseño: TokensDS, las guidelines y la documentación | Oscar, con la sesión de diseño |
| Referente de desarrollo: componentes, tokens, Code Connect e integración continua | Oscar, con la sesión de desarrollo |
| Quien contribuye: propone y construye siguiendo el proceso | Las sesiones de Claude |
