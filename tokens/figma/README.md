# Variables exportadas de Figma

Archivos DTCG tal como los exporta Figma: vista Variables → clic derecho en la colección → *Export modes*. Figma entrega un ZIP por colección, con un archivo por modo llamado `{Modo}.tokens.json` (comprobado el 2026-10-03).

**No se editan a mano ni se renombran** (C10). Si cambian las variables, se vuelve a exportar y se sustituyen los archivos de la carpeta de esa colección.

| Carpeta | Colección de Figma | Archivos |
|---|---|---|
| `primitives/` | Primitives | `Value.tokens.json` |
| `semantic-color/` | Semantic color | `Light.tokens.json`, `Dark.tokens.json` |
| `semantic-size/` | Semantic size | `Value.tokens.json` |
| `layout/` | Layout | `Desktop.tokens.json`, `Mobile.tokens.json` |

Primitives y Semantic size tienen el mismo nombre de modo (`Value`); por eso cada colección va en su carpeta.
