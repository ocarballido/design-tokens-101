# E05, intento 1

- Tarea: E05 (sin patrón) · base bbdd82b · 2.1.309 (Claude Code) · claude-opus-5-5 · 2026-11-02
- Coste: 1.04 USD el intento y 0.47 USD review-ui · turnos: 26 · duración: 107 s
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
messages/es.json      |  5 +++++
 src/app/not-found.tsx | 27 +++++++++++++++++++++++++++
 2 files changed, 32 insertions(+)
```

## Comprobaciones
- check:tokens: sin errores
- build: sin errores
- check:content: sin errores

```
check:ui <copia> (base HEAD): 2 archivos con cambios

Valores literales y arbitrarios: 0

Primitivos usados directamente: 0

Texto sin estilo de texto: 0

Componentes obsoletos: 0

Props que no están en docs/components/: 0

Archivos del sistema creados o cambiados (src/components, src/styles, tokens): 0
```

## review-ui

Revisé los dos archivos preparados para commit (`src/app/not-found.tsx`, nuevo, y `messages/es.json`) y no encontré problemas.

- **`npm run check:tokens`:** sin errores.
- **Tokens (`docs/rules/rules-tokens.md`):** no hay colores, espacios ni grosores literales. Todos los tokens son semánticos y existen (`gap-600`, `py-600`, `desktop:py-1600`, `text-neutral-default`), y el texto usa estilos (`type-heading-1`, `type-body-default`) en lugar de `font-*` sueltos.
- **Componentes y props (`AGENTS.md` y `docs/components/button.md`):** `Button` tiene `status: stable` y solo recibe `href` y `children`, que son props documentadas. Hay un único `primary` en la vista (la cabecera, el sidebar y el pie no llevan `Button`), y con `href` navega a la portada.
- **Textos (`docs/content/voice-and-tone.md`):** no hay guiones largos y el error se dice con texto.

No ejecuté `build` ni `check:content`, porque la skill solo los pide cuando cambia una lección y aquí no cambia ninguna.

## Mensajes finales del agente

### Parte 1

La página 404 está hecha y el build la genera bien. No pude abrirla en el navegador: esta sesión no me dejó arrancar el servidor.

**Archivos**
- `src/app/not-found.tsx` (nuevo): el título «Página no encontrada», la frase «La dirección no existe o ha cambiado.» y un `Button` `primary` con `href="/"` que dice «Volver al inicio». Usa el layout de la web, con cabecera, sidebar y pie, y va centrada en vertical como la portada (V48).
- `messages/es.json`: los tres textos, en un grupo `NotFound` nuevo.

**Por qué este archivo:** la documentación de Next.js 16.3 dice que un `app/not-found.tsx` en la raíz se muestra para cualquier dirección que no existe y también cuando se llama a `notFound()`, como hacen las lecciones (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`). La otra opción, `global-not-found.js`, es experimental y la documentación la reserva para webs con varios layouts raíz. Esta web solo tiene uno, así que no hacía falta.

**Comprobaciones**
- `npm run build`, `npm run check:content` y `npm run check:tokens`: sin errores.
- Revisé el HTML que genera el build (`.next/server/app/_not-found.html` y `.meta`):
  - El servidor devuelve el código 404.
  - El título de la pestaña es `Página no encontrada · DesignToken101`.
  - Next.js añade `<meta name="robots" content="noindex"/>`, como dice su documentación, para que los buscadores no la guarden.
  - El enlace del botón lleva a `/`.
- La revisión con review-ui no encontró problemas. Solo hay tokens semánticos y estilos de texto, un único botón `primary`, y el botón navega con `href`.

**Elegí yo, por si Oscar quiere cambiarlo**
- El botón no lleva icono. El de la portada lleva una flecha a la derecha, pero aquí habría que elegir uno y la especificación no dice cuál.
- El título de la pestaña sigue el formato de las lecciones (V49).
- La página no lleva URL canónica ni datos para compartir en redes. No tiene sentido en una página que los buscadores no guardan.

**Lo que no he hecho**
- No he actualizado nada de `proyecto/` ni he hecho commit, como pediste. Para Oscar: anotar los textos en `decisiones-detalle.md` y `decisiones.md`, y poner el detalle en `historial.md` y `estado.md`. Además, Figma no tiene plantilla de la página 404 (`docs/inventory.md` enumera las de Templates y no hay ninguna), así que la sesión de diseño tendría que añadirla si se quiere tener al día con el código.
- No la he probado en el navegador, ni en Light y Dark, ni a 320 px.
- No he cambiado nada de `docs/`, así que no hay nada que copiar a ds4agents.

## Llamadas a herramientas

1. Skill build-ui
2. Read /privatedocs/inventory.md
3. Glob {docs/patterns/*,docs/components/*,src/app/**/*,src/components/*.tsx}
4. Read /privatesrc/app/page.tsx
5. Read /privatesrc/app/layout.tsx
6. Read /privatedocs/components/button.md
7. Read /privatesrc/components/Button.tsx
8. Grep 404|not-found|notFound|NotFound|no encontrada
9. Read /privatesrc/lib/metadata.ts
10. Read /privatedocs/content/voice-and-tone.md
11. Bash grep '"version"' node_modules/next/package.json; ls node_modules/next/dist/docs 2>/dev/null | head; find node_modules/next/dist/docs -iname '*not-found*' 2>/dev
12. Read /privatenode_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md
13. Grep not-found en /privatenode_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
14. Bash grep -rn -i "not-found" node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/ node_modules/next/dist/docs/01-app/01-getting-start
15. Read /privatesrc/app/[section]/[lesson]/page.tsx
16. Edit /privatemessages/es.json
17. Write /privatesrc/app/not-found.tsx
18. Bash npm run build 2>&1 | tail -25 && npm run check:content 2>&1 | tail -8 && npm run check:tokens 2>&1 | tail -8
19. Bash (npx next start -p 3123 >/tmp/t101-start.log 2>&1 &) ; for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:3123/ && break; sleep 1; done; for u in /n
20. Bash npx next start -p 3123
21. Bash ls .next/server/app/ | grep -i not; grep -o '<title>[^<]*</title>' .next/server/app/_not-found.html; grep -o '<meta name="robots"[^>]*>' .next/server/app/_not-f
22. Bash cat .next/server/app/_not-found.meta
23. Skill review-ui
