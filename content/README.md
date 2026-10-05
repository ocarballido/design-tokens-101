# Contenido de DesignToken101

Convenciones para escribir y mantener las lecciones. Última revisión: 30/09/2026.

## Estructura de carpetas

```txt
content/
├── es/                      ← idioma de trabajo (se cierra primero)
│   ├── 00-start-here/
│   │   ├── meta.json            ← nombre de la sección en el sidebar
│   │   ├── 01-what-is-designtoken101.mdx
│   │   ├── 02-why-this-site.mdx
│   │   ├── 03-what-is-dtcg.mdx
│   │   ├── 04-figma-dtcg-tailwind.mdx
│   │   ├── 05-what-we-teach.mdx
│   │   ├── 06-requirements.mdx
│   │   └── 07-how-this-site-was-made.mdx
│   └── 99-resources/
│       ├── meta.json
│       └── 01-sources.mdx
└── en/                      ← misma estructura y mismos nombres de archivo
```

- **Orden por prefijo numérico de dos cifras**, como la documentación de Next.js ([Docs Contribution Guide](https://nextjs.org/docs/community/contribution-guide)). El prefijo no aparece en la URL.
- **Mismos nombres de archivo en todos los idiomas**, para que cada página y su traducción compartan ruta. Los slugs están en inglés porque el inglés es el idioma por defecto. *Decisión provisional: se puede cambiar antes de publicar.*
- **Cada carpeta de sección tiene un `meta.json`** con el nombre que se ve en el sidebar: `{"title": "Empezar aquí"}`. Es la convención de Fumadocs (V05). Si en un idioma falta el `meta.json` o una lección, la web usa la versión en español y avisa de que no está traducida (V02).
- **Grupos del sidebar (C17):** `content/{locale}/meta.json` lista las carpetas de sección en orden, con separadores `"---Texto---"` (convención de Fumadocs). Una sección nueva se añade también ahí.
- Los enlaces internos se escriben sin idioma ni prefijo numérico: `/start-here/what-is-dtcg`. El componente que sustituya a `a` en `mdx-components.tsx` debe usar el `Link` de next-intl para añadir el idioma.

## Frontmatter

```yaml
---
title: Qué es DTCG                # h1 y SEO (2-4 palabras)
description: Una o dos frases.    # meta description
nav_title: Qué es DTCG            # opcional: texto en el sidebar
lastReviewed: 2026-09-30          # última verificación de las fuentes
---
```

`@next/mdx` no admite frontmatter por defecto, así que hay que añadir `remark-frontmatter` y `remark-mdx-frontmatter` ([Next.js: MDX, Frontmatter](https://nextjs.org/docs/app/guides/mdx#frontmatter)). Las tablas necesitan `remark-gfm`.

## Estructura de cada lección

1. Introducción breve (2-3 frases).
2. "En esta página": lista de apartados con enlace.
3. Contenido, con cada afirmación enlazada a su fuente.
4. Apartado "En Figma" cuando la lección trata algo que se hace en Figma.
5. Bloques `<InCode>` opcionales: el itinerario de código.
6. "Lo que te llevas" (T10): tres viñetas de una frase con lo aprendido, sin enlaces, dentro de `<Takeaways>` (C18). En los ejercicios, lo que el alumno tiene al terminar. También va en "En esta página".
7. Apartado final "Fuentes".

**Anclas.** Los enlaces de "En esta página" asumen `rehype-slug` (github-slugger): minúsculas, sin signos de puntuación, espacios convertidos en guiones y tildes conservadas. Por eso los títulos evitan `¿?`, comillas y dos puntos. *Verificado en el esqueleto (2026-10-03): las tildes se conservan y `npm run build && npm run check:content` comprueba que todas las anclas tienen destino.*

## Componentes que usa el contenido

Se diseñarán en Figma con el sistema de DesignToken101 y se implementarán en `mdx-components.tsx`.

| Componente | Uso |
|---|---|
| `<Callout variant="note">` | Información útil pero no imprescindible |
| `<Callout variant="warning">` | Algo que puede provocar errores |
| `<Callout variant="recommendation">` | Decisión propia de DesignToken101, no una norma |
| `<Callout variant="pending">` | Contenido en preparación (un módulo, un canal de contacto). Nunca para una afirmación técnica sin comprobar (P14) |
| `<InCode title="…">` | Itinerario de código; se puede plegar y el diseñador puede saltarlo |
| `<Flow caption="…">` con `<FlowGroup>` y `<FlowStep>` | Gráfico de un proceso: pasos en orden, agrupados o no en fases (C13). Anatomía y ejemplo en `docs/componentes-v1.md` §3.7. Un paso `pending` debe decirlo también en su `meta` ("En estudio") |
| `<ColorScale palette="emerald" caption="…" />` | Una escala de color de forma visual, con paso y hex (C14). `highlight` marca un paso (p. ej. el color de marca) con `highlightLabel`. Anatomía en `docs/componentes-v1.md` §3.8 |
| `<Takeaways>` | Envuelve el apartado "Lo que te llevas" (título `##` y lista) de cada lección (C18, T10). Anatomía en `docs/componentes-v1.md` §3.9 |

## Guía de redacción

Adaptada de la guía de estilo de Next.js ([Docs Contribution Guide: Voice](https://nextjs.org/docs/community/contribution-guide#voice)):

- Frases claras y cortas. Si una frase acumula comas, se divide o se convierte en lista.
- Voz activa y segunda persona (tú).
- Evitar *fácil*, *rápido*, *sencillo*, *simplemente* y *solo*: son subjetivas y pueden desanimar.
- Repetir el sujeto antes que usar un "esto" ambiguo.
- Cada afirmación sobre una herramienta o especificación lleva enlace a su fuente oficial.
- Separar siempre **lo que dice la fuente** de **la recomendación de DesignToken101** (`<Callout variant="recommendation">`).
- Los blogs y foros se marcan como tales.
- **Nombres de los modos (C12):** cuando el texto habla de los modos del sistema de tokens, usa el nombre que tienen en Figma: Light y Dark, Desktop y Mobile. Para el concepto general ("un modo oscuro") o para el selector de tema de la web ("Modo claro"), se escribe en español.
- **Sin guiones largos (—) (C15):** usa dos puntos, paréntesis o una frase nueva. En los títulos de enlace: `[Figma: Modes for variables](…)`.
- **Vídeos (C16):** se enlazan, no se insertan. Indica idioma, autor y duración.
- **Lo que no se puede comprobar no se afirma (P14).** Si ni una fuente oficial ni una prueba lo respaldan, no se publica. Las pruebas propias dicen con qué se hicieron (por ejemplo, "con la API de plugins de Figma") y su fecha.

## Nota técnica para MDX

MDX interpreta `{` `}` y `<` como código. Los nombres de tokens con llaves (alias DTCG) van siempre entre comillas invertidas: `` `{color.blue.500}` ``.
