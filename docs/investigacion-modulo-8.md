# Investigación del módulo 8: cerrar un sistema de tokens

Sesión de contenido, 2026-10-06. Tarea 1 del módulo 8 (Ejercicio final, T1, P5, P11, P16). Pendiente de la aprobación de Oscar.

Pregunta: qué hace falta para **cerrar** un sistema de tokens. Tres frentes: documentar las decisiones, la comprobación final y el versionado. En cada apartado se separa **lo que dice la fuente** de **la recomendación** de la sesión de contenido. Las pruebas propias dicen con qué se hicieron y cuándo.

Fuentes consultadas el 2026-10-06: DTCG 2025.10 (Format y Resolver), ayuda de Figma, curso de sistemas de diseño de Figma, repositorio del SDS de Figma, Atlassian Design, shadcn/ui, Tailwind CSS y Semantic Versioning 2.0.0.

---

## 1. De dónde parte el módulo 8

Lo que ya tiene el alumno al terminar el ejercicio del módulo 7 (comprobado leyendo los siete ejercicios):

| Módulo | Lo que deja el ejercicio | Estado |
|---|---|---|
| 1 | Inventario de valores, con tipo, recuento y dónde viviría cada uno | Completo |
| 2 | Colección `Primitives` en Figma, con scope, visibilidad y code syntax; lista de usos | Completo |
| 3 | Mapa de alias (tabla): función, propiedad, rol, énfasis, Light y Dark, excepciones, capa de componente | Completo |
| 4 | Convención escrita; `Semantic color` (Light) y `Semantic size`; estilos de texto | Completo |
| 5 | Dark, `Layout`, estilos vinculados, cuatro pantallas, colecciones exportadas | Completo |
| 6 | Revisión de scopes y code syntax; **cinco tokens** en las dos capas; **lista** de tokens de código; tabla de pares | **Muestra** |
| 7 | Contraste, estados, foco, tamaños, preferencias; **registro de decisiones de accesibilidad** | Completo para accesibilidad |

Lo que falta para "el sistema de tokens completo" (`what-we-teach`, P5):

- La capa 2 de Tailwind CSS de todo el sistema (el ejercicio 6 traduce cinco tokens).
- El archivo de tokens de código en DTCG (el ejercicio 6 los lista, no los escribe).
- Un registro de decisiones de **todo** el sistema, no de la accesibilidad (las decisiones de los módulos 2 a 6 están repartidas en tablas y notas).
- Una comprobación de conjunto y un punto de cierre (versión).

`what-we-teach` promete además, en "Qué tendrás al terminar", "tus tokens exportados de Figma y normalizados a DTCG estricto" y "variables CSS generadas a partir de esos archivos". Hoy la normalización y la generación están en `InCode` opcionales del ejercicio 6 (P2). Ver §6, punto 5.

---

## 2. Documentar las decisiones

### Lo que dicen las fuentes

**DTCG.** Cada token y cada grupo admiten `$description`, una descripción en texto plano de para qué sirve el token. Las herramientas de documentación pueden mostrarla junto a la muestra; las de traducción, como comentario en el código ([Format Module: Description](https://www.designtokens.org/TR/2025.10/format/#description); grupos en [Group properties](https://www.designtokens.org/TR/2025.10/format/#group-properties)).

**Figma.** La descripción de una variable se escribe en su ventana de edición y sirve para explicar cómo se usa la variable ([Figma: Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)). La ayuda no dice dónde se muestra. El code syntax aparece en los fragmentos de código de Dev Mode (mismo artículo).

**Figma, curso de sistemas de diseño ([Lesson 4: Document and manage your system](https://help.figma.com/hc/en-us/articles/14552804059927-Lesson-4-Document-and-manage-your-system)):**
- La documentación empieza por las convenciones de nombres y las descripciones de estilos y componentes, y puede crecer con ejemplos de uso correcto e incorrecto.
- Para un equipo pequeño propone documentar en el mismo lugar que el sistema (el archivo de Figma) o en herramientas como Storybook o Notion; una web propia da más control pero cuesta mantenerla.
- El ejemplo del curso documenta una decisión del sistema (su rejilla de espaciado) con una ilustración de los valores, como referencia para quien lo usa.

**Atlassian.** Cada token de su lista tiene una descripción de uso ("Use for…") y la versión en la que se introdujo ([Atlassian: Design tokens, All tokens](https://atlassian.design/components/tokens/all-tokens)). Los tokens obsoletos se marcan como tales en la misma lista.

**SDS de Figma.** El repositorio incluye un script que escribe el code syntax de todas las variables desde el código (`tokenVariableSyntaxAndDescriptionSnippet.js`, también la descripción) ([SDS: README, scripts/tokens](https://github.com/figma/sds#scriptstokens)). En su `tokens.json`, las variables primitivas no tienen descripción (leído en el repositorio el 2026-10-06, commit `05525f7`).

### Lo que ya hace el curso

- Módulo 4: la convención se escribe y se guarda donde la encuentre quien use el sistema (recomendación de `exercise-naming`).
- Módulo 3 (`direct-values`): cada excepción tiene "un motivo registrado" en el registro de decisiones del proyecto.
- Módulo 7: registro de decisiones de accesibilidad con columnas Qué falla, Criterio y nivel, Decisión, Motivo, Alternativa y Fecha.
- DesignToken101 usa `docs/decisiones.md` (estado, fecha y motivo de cada decisión) y `docs/sistema-tokens-v1.md` (registro de cambios).

### Prueba propia: las descripciones de DesignToken101

Exportación de Figma del repositorio (`tokens/figma/`, la última de `Semantic color` tras S35), contada con Python el 2026-10-06:

| Colección | Tokens | Con `$description` |
|---|---|---|
| Primitives | 97 | 0 |
| Semantic color (Light y Dark) | 33 | 19 |
| Semantic size | 4 | 4 |
| Layout | 9 | 9 |

Los 14 semánticos de color sin descripción: `background/neutral/strong`, `background/accent/subtle`, y los fondos, textos y bordes de `info`, `success`, `warning` y `danger`. La descripción de `translucent` sigue diciendo "al 90 % en Light" (ya anotado en `estado.md`, S35). Figma exporta la descripción como `$description` del token (comprobado en los mismos archivos).

### Recomendación

1. **Dos niveles de documentación**, cada uno en su sitio:
   - **En cada token, su función** (`$description`): qué es y dónde se usa. En las excepciones, el motivo (ya lo pide el ejercicio 4). Viaja con la exportación.
   - **En un registro, las decisiones:** por qué la base es 4, por qué el acento está en el 500, por qué un token vive en código. Una tabla con la misma forma que la del módulo 7, ampliada a todo el sistema.
2. **Descripción obligatoria en los semánticos** (son lo que usa el diseño y el código) y **opcional en los primitivos** (ocultos al publicar, S22; su nombre ya es su valor). Es lo que hace el SDS. Atlassian describe todos los suyos, pero su lista pública es de semánticos.
3. **Un registro que reúne lo que el alumno ya ha decidido**: no se escribe de cero, se recoge de los ejercicios 1 a 7 (base de la escala, color de marca, tinte, convención, excepciones, capa de componente, modos, tokens de código, decisiones de accesibilidad).
4. **Dónde:** en una página del archivo de Figma (convención, registro y versión), como recomienda el curso de Figma para equipos pequeños y como ya prevé el archivo de referencia (P16: "página de convención de nombres"). El itinerario de código puede tener además el registro junto al repositorio.

---

## 3. La comprobación final

### Lo que dicen las fuentes

**DTCG 2025.10, condiciones de error** (lo que una herramienta tiene que detectar):
- Las referencias no pueden ser circulares; si lo son, el valor de toda la cadena es desconocido ([Circular references](https://www.designtokens.org/TR/2025.10/format/#circular-references)).
- Las herramientas tienen que dar error ante una referencia mal escrita o que apunta a algo que no existe ([Error conditions](https://www.designtokens.org/TR/2025.10/format/#error-conditions-0)).
- Un token sin tipo determinable es inválido ([Type](https://www.designtokens.org/TR/2025.10/format/#type-0)).
- Un objeto no puede ser a la vez token y grupo; las herramientas tienen que dar error ([Group structure](https://www.designtokens.org/TR/2025.10/format/#group-structure)).

**Figma.**
- **Check designs** busca valores sin variable, contraste y componentes desvinculados, y propone variables. Está disponible únicamente en los planes Organization y Enterprise ([Figma: Check designs in Figma](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma)).
- **Library analytics** mide el uso de componentes, estilos y variables. También Organization y Enterprise ([Figma: Library analytics](https://help.figma.com/hc/en-us/articles/360039238353)).
- La ayuda de variables no describe ninguna forma de ver dónde se usa una variable ([Figma: Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)).
- *Selection colors* muestra los colores de una selección (ya usado en el ejercicio 1, [Figma: View and adjust colors in a mixed selection](https://help.figma.com/hc/en-us/articles/360042553434)).

Consecuencia para P13 (Figma Professional): la comprobación en Figma es manual.

**Tailwind CSS.** `@theme` crea clases y `:root` no: un token que no está en `@theme` no tiene clase ([Theme variables: Why @theme instead of :root](https://tailwindcss.com/docs/theme#why-theme-instead-of-root)). Con `--*: initial`, las únicas clases son las del tema propio ([Using a custom theme](https://tailwindcss.com/docs/theme#using-a-custom-theme)). Un tema se puede guardar en su propio archivo e importarlo en varios proyectos ([Sharing across projects](https://tailwindcss.com/docs/theme#sharing-across-projects)).

**shadcn/ui.** Un token nuevo se define en `:root` y `.dark` y después se expone a Tailwind con `@theme inline` ([shadcn/ui: Theming, Adding New Tokens](https://ui.shadcn.com/docs/theming)). Es decir: un token que se usa como clase tiene que estar en las dos capas.

**Atlassian.** Vigila el uso de los tokens con reglas de ESLint (`ensure-design-token-usage`, `no-unsafe-design-token-usage`, `no-deprecated-design-token-usage`) y migra con codemods ([Atlassian: Use tokens in code](https://atlassian.design/foundations/tokens/use-tokens-in-code)).

**Terrazzo** (herramienta del curso, V06): tiene reglas de lint configurables, entre ellas `core/descriptions`, `core/required-modes` y `a11y/min-contrast` ([Terrazzo: Linting](https://terrazzo.app/docs/linting/)). **Sin probar**: npm da 403 en la sesión de contenido. Si el módulo lo quiere usar, la sesión de desarrollo tiene que probarlo antes (P14).

### Lo que ya enseña el curso (no se repite)

- Módulo 6, `check-and-update`: el ciclo exportar, generar y comprobar, y qué vigila `check:tokens`.
- Módulo 6, ejercicio: scopes, code syntax = ruta, `rem`, `var()` a variables que existen, nombres de capa 2 distintos de los de capa 1.
- Módulo 7: contraste, estados, foco, tamaños y preferencias.
- Módulo 5, ejercicio, paso 6: lo que no cambia de modo cuando debería.

### Recomendación

La comprobación final del módulo 8 no repite esas listas: las **enlaza** y añade lo que se ve únicamente con el sistema entero.

1. **Cada token tiene un uso** (P11). Un token sin uso se borra, o se mantiene con un motivo escrito (como S31 en DesignToken101). Es la comprobación que conecta el cierre con P11.
2. **Cada valor del diseño tiene token.** Repaso con *Selection colors* y los paneles de propiedades, pantalla a pantalla, en las cuatro combinaciones del módulo 5. En Professional no hay Check designs.
3. **Cada token aparece en todos los sitios donde debe:** variable en Figma con descripción, scope y code syntax; variable en la capa 1; clase en la capa 2 si se usa como clase (primitivos de color no, S22, V09); tokens de código en su archivo DTCG.
4. **Lo que DTCG exige a un archivo** (alias que existen, sin ciclos, con tipo, ningún token que sea también grupo) lo comprueba la herramienta en el itinerario de código; en Figma, los alias no pueden apuntar a variables inexistentes, así que se revisa en el registro y en la exportación.
5. **Terrazzo lint como `InCode` opcional**, únicamente si la sesión de desarrollo lo prueba con la configuración del ejercicio 6.

---

## 4. Versionado

### Lo que dicen las fuentes

**DTCG 2025.10.** El Format Module no trata el versionado de un sistema de tokens. Tiene `$deprecated` para tokens y grupos: `true`, un texto con la explicación o `false`; un grupo obsoleto lo es con todos sus tokens salvo los que digan lo contrario, y las herramientas pueden avisar al usarlos ([Deprecated](https://www.designtokens.org/TR/2025.10/format/#deprecated)). El campo `version` del Resolver es la versión de la especificación y tiene que ser `2025.10`; no es la versión del sistema ([Resolver Module 2025.10](https://www.designtokens.org/TR/2025.10/resolver/)).

**Semantic Versioning 2.0.0** ([semver.org](https://semver.org/)):
- MAJOR para cambios incompatibles, MINOR para funcionalidad nueva compatible, PATCH para correcciones compatibles.
- Hay que declarar una API pública, en el código o en la documentación (regla 1).
- 0.y.z es desarrollo inicial: todo puede cambiar (regla 4). 1.0.0 define la API pública (regla 5).
- Marcar algo como obsoleto es un cambio MINOR (regla 7), con la documentación al día (FAQ).

**Figma, curso de sistemas de diseño ([Lesson 4](https://help.figma.com/hc/en-us/articles/14552804059927-Lesson-4-Document-and-manage-your-system)):** cada versión tiene su entrada de registro de cambios (qué hay de nuevo, qué cambia, qué se corrige) y un número Major.Minor.Patch. Recomienda no publicar tan a menudo que se abrume a quien usa el sistema, y dar tiempo para adoptar los cambios.

**Figma, herramientas** (plan Professional, P13):
- Al publicar una biblioteca, Figma pide una descripción de los cambios; se ve al aceptar las actualizaciones y en el historial de versiones. Publicar está en todos los planes de pago ([Figma: Publish a library](https://help.figma.com/hc/en-us/articles/360025508373-Publish-a-library)).
- *Save to Version History* guarda una versión con título (25 caracteres como máximo) y descripción; las publicaciones de la biblioteca también quedan en el historial. Professional tiene el historial completo ([Figma: View a file's version history](https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history)).
- Al borrar una variable, las propiedades que la usaban dejan de estar conectadas a ella ([Figma: Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)). La ayuda no habla de marcar variables como obsoletas.
- Las ramas (branching) son de Organization y Enterprise ([Figma: Guide to branching](https://help.figma.com/hc/en-us/articles/360063144053-Guide-to-branching)).

**Atlassian.** El paquete `@atlaskit/tokens` tiene un registro de cambios con Major, Minor y Patch. Marca tokens como obsoletos en versiones minor (por ejemplo, la 10.1.0 deja obsoleto `font.body.UNSAFE_small` en favor de `font.body.small`) y los sustituye o borra en versiones major (la 7.0.0 cambia `border.radius.*` por `radius.*`) ([Atlassian: tokens changelog](https://atlassian.design/components/tokens/changelog)).

**SDS de Figma.** Sin versiones publicadas ni registro de cambios en el repositorio; `package.json` con `0.0.0` (leído el 2026-10-06, commit `05525f7`).

**shadcn/ui.** El tema se copia en el proyecto y es del proyecto ([Theming](https://ui.shadcn.com/docs/theming)): su versión es la del repositorio de quien lo usa.

### Lo que ya enseña el curso

- Renombrar una variable en Figma conserva los alias y los vínculos, pero no cambia el code syntax (módulo 4, prueba del 2026-10-04). En código, el nombre de la variable CSS cambia: para quien la usa, es un cambio incompatible.
- El ciclo de un cambio (módulo 6, `check-and-update`).

### DesignToken101 hoy

- La especificación se llama `sistema-tokens-v1.md` ("v1"), pero el sistema no tiene número de versión ni registro de cambios propio: hay un registro de cambios de la especificación y `decisiones.md`.
- `package.json` dice `0.1.0`: es la versión de la web, no la del sistema de tokens.
- P16 pide que la portada del archivo de referencia lleve "versión y fecha".

### Recomendación

1. **Versión semántica para el sistema**, con su API pública declarada: los nombres de las variables publicadas y de las variables CSS (y las clases de la capa 2, si hay código). Lo demás (valores, descripciones) puede cambiar sin cambiar la API.
2. **Qué cambio es qué**, en una tabla del módulo:
   - PATCH: cambiar un valor o un alias sin cambiar nombres (S35 sería un PATCH).
   - MINOR: añadir un token, un modo o un estilo; marcar uno como obsoleto.
   - MAJOR: borrar o renombrar un token publicado (en Figma desconecta o cambia el code syntax; en código rompe la variable).
3. **1.0.0 al terminar el módulo 8**: es el momento en que el alumno declara su API. Antes, sus versiones son 0.y.z.
4. **Dónde se anota**, con lo que tiene Professional: descripción al publicar la biblioteca, versión con nombre en el historial y una entrada en el registro de cambios de la página de documentación. Sin ramas.
5. **Obsoletos:** en Figma no hay marca; se escribe en la descripción ("Obsoleto desde 1.2.0: usa X") y se borra en la siguiente MAJOR, como Atlassian. En DTCG existe `$deprecated`. **Sin comprobar** si Figma exporta algo parecido: la exportación del repositorio no tiene ningún `$deprecated` (no hay ningún token obsoleto). Se enseña como proceso, sin afirmar nada de la exportación.
6. **Aviso del Resolver:** su `version` es la de la especificación (`2025.10`), no la del sistema.

---

## 5. P11 en el cierre

P11 ("un sistema tan grande como lo que resuelve") ya está en `what-is-designtoken101` y en el módulo 3. En el módulo 8 encaja en tres sitios:

- Comprobación final, punto 1 (§3): cada token tiene un uso o un motivo escrito.
- Versionado (§4): crecer después es un MINOR que no rompe nada; quitar lo que sobra es un MAJOR. Empezar pequeño sale más barato.
- El registro: S31 como ejemplo honesto de excepción a P11, con su motivo.

---

## 6. Huecos y decisiones para Oscar

1. **Versión de DesignToken101.** La especificación dice "v1" y P16 pide una versión en la portada del archivo de referencia, pero el sistema no tiene número. Opciones:
   - A. **1.0.0 con el cierre del módulo 8**, registro de cambios en `docs/sistema-tokens-v1.md` (el que ya tiene) y la misma cifra en la portada del archivo de referencia. *Recomendada:* el módulo enseña a hacerlo y la web lo hace.
   - B. Sin número; el módulo enseña el versionado con ejemplos de Atlassian y de un sistema inventado.
2. **Las 14 descripciones que faltan** (y la de `translucent`). Si el módulo pide descripción en todos los semánticos (§2, punto 2), DesignToken101 no lo cumple hoy. Opciones:
   - A. **Oscar las escribe en Figma y reexporta `Semantic color`** (C10), antes de redactar o en paralelo; la sesión de contenido puede proponer los 14 textos. *Recomendada.*
   - B. El módulo lo cuenta como un hueco de DesignToken101, en el registro.
   - C. El módulo no pide descripción en todos los semánticos.
3. **Primitivos sin descripción.** Recomendación: opcional (§2). Si Oscar prefiere que todos tengan, son 97 en Figma.
4. **Terrazzo lint.** Recomendación: no incluirlo salvo que la sesión de desarrollo lo pruebe con la configuración del ejercicio 6 (P14). Si se prueba, `InCode` opcional en la comprobación final.
5. **"DTCG estricto" y "variables CSS generadas" en `what-we-teach`.** El itinerario de código del módulo 8 es opcional (P2), y la generación con Terrazzo está en un `InCode` del ejercicio 6. Opciones:
   - A. **El módulo 8 cierra el itinerario de código con la normalización y la generación de todo el sistema** (como paso opcional), y `what-we-teach` no cambia. *Recomendada:* es lo que promete.
   - B. Se ajusta el texto de `what-we-teach` a lo que hace un diseñador sin código.
6. **Lugar del módulo 8 en el sidebar** (C17 lo dejó provisional en "Tokens en código"). El módulo se sigue entero en Figma y la parte de código es opcional. Se decide con el índice (tarea 2).

---

## 7. Fuentes

- [Design Tokens Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/): [Description](https://www.designtokens.org/TR/2025.10/format/#description), [Type](https://www.designtokens.org/TR/2025.10/format/#type-0), [Deprecated](https://www.designtokens.org/TR/2025.10/format/#deprecated), [Group structure](https://www.designtokens.org/TR/2025.10/format/#group-structure), [Circular references](https://www.designtokens.org/TR/2025.10/format/#circular-references), [Error conditions](https://www.designtokens.org/TR/2025.10/format/#error-conditions-0)
- [Design Tokens Resolver Module 2025.10](https://www.designtokens.org/TR/2025.10/resolver/)
- [Figma: Lesson 4, Document and manage your system](https://help.figma.com/hc/en-us/articles/14552804059927-Lesson-4-Document-and-manage-your-system)
- [Figma: Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections)
- [Figma: Publish a library](https://help.figma.com/hc/en-us/articles/360025508373-Publish-a-library)
- [Figma: View a file's version history](https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history)
- [Figma: Guide to branching](https://help.figma.com/hc/en-us/articles/360063144053-Guide-to-branching)
- [Figma: Check designs in Figma](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma)
- [Figma: Library analytics](https://help.figma.com/hc/en-us/articles/360039238353)
- [Figma: View and adjust colors in a mixed selection](https://help.figma.com/hc/en-us/articles/360042553434)
- [Simple Design System (SDS) de Figma](https://github.com/figma/sds)
- [Atlassian: Design tokens, All tokens](https://atlassian.design/components/tokens/all-tokens)
- [Atlassian: Use tokens in code](https://atlassian.design/foundations/tokens/use-tokens-in-code)
- [Atlassian: tokens changelog](https://atlassian.design/components/tokens/changelog)
- [shadcn/ui: Theming](https://ui.shadcn.com/docs/theming)
- [Tailwind CSS: Theme variables](https://tailwindcss.com/docs/theme)
- [Terrazzo: Linting](https://terrazzo.app/docs/linting/) (sin probar)
- [Semantic Versioning 2.0.0](https://semver.org/)
