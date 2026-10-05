# Investigación del módulo 7: Accesibilidad en los tokens

Sesión de contenido, 2026-10-05. **Aprobada por Oscar el 2026-10-05** (T4). Decisiones de §15: los puntos 1 (V26) y 2 (2.4.13 en el sidebar) se mantienen como están (registrado en V26 y D27). No es una lección: es la base para escribir el índice (tarea 2) y las lecciones.

El alcance es lo que afecta a los tokens, no toda la accesibilidad: contraste de texto y de no texto, uso del color, foco, objetivos, espaciado de texto, movimiento, transparencia, contraste forzado y `prefers-contrast`. Lo que es de componentes de React (ARIA, orden de foco, lector de pantalla) va al módulo 9.

## En este documento

1. [Cómo se ha hecho](#1-cómo-se-ha-hecho)
2. [Lo que el módulo tiene que cumplir](#2-lo-que-el-módulo-tiene-que-cumplir)
3. [El marco: WCAG 2.2, niveles y APCA](#3-el-marco-wcag-22-niveles-y-apca)
4. [Contraste de texto: 1.4.3 y 1.4.6](#4-contraste-de-texto-143-y-146)
5. [Contraste de lo que no es texto: 1.4.11](#5-contraste-de-lo-que-no-es-texto-1411)
6. [Uso del color: 1.4.1](#6-uso-del-color-141)
7. [Foco: 2.4.7, 2.4.11 y 2.4.13](#7-foco-247-2411-y-2413)
8. [Tamaño de los objetivos: 2.5.8](#8-tamaño-de-los-objetivos-258)
9. [Espaciado de texto: 1.4.12](#9-espaciado-de-texto-1412)
10. [Movimiento: 2.3.3 y prefers-reduced-motion](#10-movimiento-233-y-prefers-reduced-motion)
11. [Transparencia: prefers-reduced-transparency](#11-transparencia-prefers-reduced-transparency)
12. [Contraste forzado: forced-colors](#12-contraste-forzado-forced-colors)
13. [Más contraste: prefers-contrast](#13-más-contraste-prefers-contrast)
14. [Sistemas de referencia](#14-sistemas-de-referencia)
15. [Hallazgos para otras sesiones](#15-hallazgos-para-otras-sesiones)
16. [Propuesta de alcance del módulo](#16-propuesta-de-alcance-del-módulo)
17. [Fuentes](#17-fuentes)

---

## 1. Cómo se ha hecho

**Fuentes** (consultadas el 2026-10-05): WCAG 2.2 y sus documentos Understanding, las técnicas C39, C40, C43 y C45, la nota de conformidad de Understanding, el borrador de WCAG 3.0, CSS Color Adjustment Level 1, Media Queries Level 5, MDN (las cuatro *media features*), los datos de compatibilidad de MDN (`browser-compat-data`), la documentación de Tailwind CSS (`outline-style`), el `theme.css` del SDS de Figma, la página de color de Atlassian y el botón y la página de temas de shadcn/ui. Enlaces en §17.

**Pruebas propias** (2026-10-05):

- **Contraste:** `python3 tools/semantic.py` (V37), sin errores, y cálculos añadidos con las mismas funciones (`scales.contrast` sobre el hex guardado, S30): nivel AAA, anillo de foco frente a todos los fondos donde hay controles, selectores de V26, enlace frente al texto.
- **Navegador:** Chromium 141.0.7390.37 sin interfaz (el de Playwright 1.56, Python), a 1280 × 700 px y escala 1. **No es la web:** npm vuelve a dar 403 (`zwitch`) y no se puede compilar. Se ha compilado `src/app/globals.css` con Tailwind CSS 4.3.3 (la misma versión del proyecto, por su API `compile`, con las clases de `src/`) y una página de prueba con el marcado y las clases copiadas de `SiteHeader`, `LanguageSwitcher`, `ThemeToggle`, `SidebarItem`, `TextLink`, `Button`, `Callout` e `InCode`. Sin Inter (letra de reserva del sistema). Escenarios: Light, Dark, `forced-colors: active` con esquema claro y oscuro, `prefers-contrast: more`, `prefers-reduced-transparency: reduce` (por el protocolo de DevTools) y `prefers-reduced-motion: reduce`. En cada uno se comprueba que la *media query* se cumple (`matchMedia`), se leen los estilos calculados y se recorre la página con el tabulador comparando capturas con y sin foco, píxel a píxel.
- Lo que solo se puede probar en la web real queda en §15 para la sesión de desarrollo.

**Segunda comprobación** (2026-10-05, otra sesión de contenido, antes de entregar el documento): npm sigue dando 403 (`zwitch`). Se repitió lo decisivo con un método equivalente y reproducible:

- `python3 tools/semantic.py`: "Sin errores", código 0; todas las cifras de §4 y §5 coinciden.
- Las cifras propias (anillo frente a cinco fondos, enlace frente al texto, selectores de V26, peor caso de la cabecera) se recalcularon con `scales.contrast` sobre el hex: coinciden, salvo el peor caso Dark de §5 (8,72 con la mezcla redondeada a 8 bits, como la pinta el navegador; antes 8,70).
- CSS de la web compilado con Tailwind CSS 4.3.3 (la copia instalada fuera del proyecto, misma versión) con `src/app/globals.css` y todas las clases de `src/`. **Ojo al repetirlo:** un extractor que corte en los paréntesis pierde las clases con variable (`border-s-(length:…)`, `[@media(prefers-reduced-transparency:reduce)]:…`) y da resultados falsos; pasó en el primer intento y se descartó.
- Chromium 141.0.7390.37 (Playwright, Python), página con las clases reales de `LanguageSwitcher`, `SidebarItem`, `TextLink`, `Button` `primary` y `SiteHeader`. Resultados de §7, §11, §12 y §13 confirmados: selectores iguales con colores forzados, marca lateral que se mantiene, botón sin fondo ni borde, cabecera opaca con transparencia reducida, nada cambia con `prefers-contrast: more`, y la franja de la marca lateral que no cambia con el foco.
- No se repitió: el icono del `Callout` con colores forzados, 1.4.12 ni el recorrido completo con el tabulador; quedan como resultado de la primera prueba.
- Fuentes releídas: WCAG 3.0 (fecha, algoritmo por determinar, sin APCA), Understanding 1.4.1 y 2.4.13, C40, compatibilidad de `prefers-reduced-transparency` en la API de datos de MDN, Atlassian *Color* y el `button.tsx` de shadcn/ui.

## 2. Lo que el módulo tiene que cumplir

**Promesas de los módulos 0 a 6** (búsqueda de "módulo 7" y "Accesibilidad" en `content/es/`):

| Lección | Qué promete |
|---|---|
| `00-start-here/05-what-we-teach` | Contraste según WCAG 2.2, foco, movimiento reducido y otras preferencias del usuario; resultado: "Tokens revisados con criterios de accesibilidad". El texto dice "En investigación" y que no dará criterios hasta contrastarlos con el W3C: hay que actualizarlo al publicar el módulo |
| `02-primitives/01-what-is-a-primitive` | La fórmula de contraste de WCAG frente a APCA (Radix mide con APCA) |
| `02-primitives/03-radius-and-border` | El color del anillo de foco y su contraste |
| `02-primitives/06-color-scales` | El contraste "a fondo" |
| `02-primitives/08-primitives-collection` | Qué hace la web con `prefers-reduced-motion` |
| `03-relations/03-semantic-color` | Cómo se comprueba el contraste de cada alias "con detalle" |
| `03-relations/04-states` | V26 como "ejemplo de decisión con un coste conocido" |
| `05-modes/03-light-and-dark` | El contraste "a fondo" de la columna Dark |
| `06-figma-to-code/07-check-and-update` | El contraste de los pares en Light y en Dark, que `check:tokens` no vigila |
| `06-figma-to-code/08-exercise-figma-to-code` | Paso 7: el alumno llega con su tabla de pares texto / fondo y el hex de cada modo (y el `alpha` si el fondo es translúcido). El módulo 7 empieza con esa tabla |

**Ya explicado, que el módulo 7 no debe repetir:** los umbrales de 1.4.3 y la razón de `on-accent` (módulo 3, `semantic-color`); qué estados necesitan 3:1 según Understanding 1.4.11 (módulo 3, `states`); el porqué de los 2 px del anillo con 2.4.13 (módulo 2, `radius-and-border`); `rem` y 1.4.4 (módulo 1, `simple-types`); 1.4.12 y el interlineado 1.5 (módulo 2, `typography`). El módulo 7 los cita con enlace y va más allá: cómo se comprueba, con qué herramienta y qué pasa cuando el usuario cambia los colores o pide menos movimiento.

**Pendientes de `estado.md` para el módulo 7:**

| Pendiente | Tema de este documento |
|---|---|
| S21: el contraste de la tabla semántica | §4 y §5 |
| D12–D14: el contraste por estado (el hover no necesita 3:1; el indicador de seleccionado sí) | §5 y §6 (ya contado en `states`; el módulo 7 lo comprueba) |
| V24: `prefers-reduced-motion` y los tokens de movimiento | §10 |
| V26: indicador de opción actual sin forma propia, riesgo aceptado | §6 y §12 |
| V28: cabecera sticky y 2.4.11; `prefers-reduced-transparency` | §7 y §11 |

Ninguno es de componentes de React; no se pasa nada al módulo 9 desde esta lista. Sí van al módulo 9 algunos hallazgos de §15.

## 3. El marco: WCAG 2.2, niveles y APCA

**Lo que dice la fuente**

- WCAG 2.2 es una Recomendación del W3C; la versión vigente es del 12 de diciembre de 2024 ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).
- Cada criterio tiene un nivel: A, AA o AAA. La guía de conformidad dice que no se recomienda exigir AAA como política general para un sitio entero, porque para algunos contenidos no se pueden cumplir todos los criterios AAA ([Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance)).
- **WCAG 3.0 es un borrador** (Working Draft del 10 de septiembre de 2026) y el propio documento dice que no debe citarse más que como trabajo en curso. Su requisito de contraste de texto deja el algoritmo **por determinar**; una nota de los editores dice que tendrá en cuenta el tamaño y el peso. **No menciona APCA** ([WCAG 3.0](https://www.w3.org/TR/wcag-3.0/)).

**Recomendación para el módulo**

- DesignToken101 apunta a **WCAG 2.2 AA** (`CLAUDE.md`). El módulo lo dice al principio y marca el nivel de cada criterio. Cuando el sistema cumple un AAA (2.3.3, la mayoría del texto con 1.4.6), se cuenta como un extra, no como la meta.
- APCA: se cuenta que existe, que lo usa Radix (ya citado en el módulo 2) y que **no es norma**. Para no afirmar más de lo comprobado, el módulo dice lo que dice el borrador: WCAG 3 aún no ha elegido algoritmo. Sin cifras de APCA ni comparaciones de umbrales.

## 4. Contraste de texto: 1.4.3 y 1.4.6

**Lo que dice la fuente**

- **1.4.3 Contrast (Minimum), AA:** 4,5:1 para el texto y las imágenes de texto; 3:1 para el texto grande. Texto grande: 18 pt, o 14 pt en negrita (unos 24 px y 18,5 px CSS). Exentos: texto decorativo, de componentes inactivos, invisible, dentro de imágenes con otro contenido importante, y logotipos ([Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).
- **No se redondea:** 4,499:1 no llega a 4,5:1 (misma fuente).
- Se mide con los colores del CSS, no con los píxeles que pinta la pantalla (el suavizado de la letra no cuenta) (misma fuente).
- El 4,5:1 compensa la pérdida de sensibilidad al contraste de una visión de 20/40 (misma fuente).
- **1.4.6 Contrast (Enhanced), AAA:** 7:1, y 4,5:1 para el texto grande. Pensado para una visión de 20/80 ([Understanding 1.4.6](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)).

**Qué token o decisión afecta**

Todos los semánticos `color/text/*` y `color/text/on-accent` frente a los `color/background/*` con los que se usan (S21, §6.1 y §6.2 de la especificación). Los primitivos no tienen contraste: lo tiene un par de semánticos (módulo 3).

**Cómo lo cumple DesignToken101 hoy** (`tools/semantic.py`, 2026-10-05)

- 1.4.3: los 30 pares de texto de `semantic.py` llegan a 4,5:1 en Light y en Dark. El más justo es `text/warning/default` sobre `background/warning/subtle` en Light: 4,77:1. El único par por debajo, `text/neutral/subtle` sobre `background/neutral/active` en Dark (3,99:1), no se usa por la regla de D12 (§6.4).
- El sistema **no usa la excepción de texto grande**: todo el texto llega a 4,5:1.
- 1.4.6 (cálculo propio con las funciones de `semantic.py`): llegan a 7:1 en los dos modos el texto principal y el secundario sobre la página, el texto en hover y active de los controles neutros, el texto del botón principal en reposo y en hover, y el texto de `Takeaways`. **No llegan a 7:1:**

| Par | Light | Dark |
|---|---|---|
| `text/accent/default` sobre `background/neutral/default` (enlaces) | 5,08 | 10,92 |
| `text/accent/default` sobre `background/neutral/subtle` | 4,86 | 9,83 |
| `text/accent/default` sobre `background/accent/subtle` | 4,85 | 8,30 |
| `text/neutral/subtle` sobre `background/neutral/subtle` | 7,40 | 6,89 |
| `text/on-accent` sobre `background/accent/strong/active` | 5,93 | 5,93 |
| `text/{info,success,warning,danger}/default` sobre su fondo `subtle` | 5,99 / 4,85 / 4,77 / 5,75 | 8,10 / 10,60 / 10,32 / 8,49 |
| `text/accent/hover` sobre `background/neutral/hover` y `background/accent/subtle` | 6,62 / 6,90 | 10,58 / 10,60 |

DesignToken101 cumple 1.4.3 (AA) y no 1.4.6 (AAA). Light es el modo que más se aleja de AAA: el acento en el 700 se elige para llegar a 4,5:1 (módulo 3).

**Recomendación para el módulo**

- Enseñar el contraste **por par**, con la tabla del ejercicio del módulo 6, y con el umbral de 4,5:1 para todo el texto. Motivo propio, no de la fuente: en DesignToken101 el tamaño de los títulos cambia con el modo `Layout` (`heading/2` pasa de 32 a 24 px en Mobile), y un token de color no sabe a qué tamaño se va a usar. Usar la excepción de texto grande obligaría a comprobar cada par en cada modo de `Layout`.
- Cómo se comprueba: con el hex final de cada modo (el `hex` de la exportación, como pide el paso 7 del ejercicio del módulo 6), sin redondear. En Figma, con un comprobador de contraste o calculando con el hex; en código, con un script como `semantic.py`. **Sin verificar:** si Figma tiene hoy un comprobador de contraste propio y qué fórmula usa; se comprueba antes de nombrarlo en una lección.

**No comprobado**

- El contraste de un texto sobre un fondo translúcido depende de lo que haya debajo. `semantic.py` lo calcula en el peor caso (mezcla sobre negro y sobre blanco) para el icono del menú (V28). Para el texto del logotipo no aplica (D22, exento).

## 5. Contraste de lo que no es texto: 1.4.11

**Lo que dice la fuente** ([Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html))

- **AA.** 3:1 frente a los colores adyacentes para lo que hace falta para identificar un componente de interfaz y su estado, y para las partes necesarias de un gráfico.
- Si un control tiene contenido visible (texto, o un icono con contraste) que lo identifica, su borde o su fondo no necesitan 3:1.
- El hover añadido por el autor no hace falta para identificar el estado: no necesita 3:1. El indicador de seleccionado o de foco, sí.
- El indicador de foco tiene que contrastar con el fondo adyacente cuando el componente tiene el foco (junto con 2.4.7).
- Los componentes inactivos están exentos.
- Un campo de texto que se reconoce por su borde (o por una línea inferior) necesita ese borde a 3:1.

**Qué token o decisión afecta**

`color/border/focus`, `color/border/accent/strong` (marca de seleccionado, D12), `color/border/neutral/strong` (borde que identifica un control), los iconos (que usan tokens de texto, S17) y la exención de `background/accent/strong/default` frente a la página (§6.2).

**Cómo lo cumple DesignToken101 hoy**

- `semantic.py`: anillo de foco frente a `background/neutral/default` (3,33 / 10,92) y `subtle` (3,19 / 9,83); marca de seleccionado frente a su fila (3,18 / 8,30); `border/neutral/strong` frente a la página (4,70 / 4,20); iconos de `Takeaways` (4,85 / 8,30) y del menú sobre la cabecera translúcida (6,17 / 6,10, peor caso).
- **Cálculo propio: el anillo de foco frente a los demás fondos donde hay controles**, que `semantic.py` no comprueba:

| Fondo junto al anillo | Dónde | Light | Dark |
|---|---|---|---|
| `background/neutral/strong` | Grupo de los selectores de idioma y tema | 3,05 | 8,28 |
| `background/info/subtle` | Enlace dentro de un `Callout` `note` | 3,06 | 8,09 |
| `background/warning/subtle` | Enlace dentro de un `Callout` `warning` | 3,22 | 8,21 |
| `background/accent/subtle` | Enlace dentro de un `Callout` `recommendation` | 3,18 | 8,30 |
| `background/danger/subtle` | Sin uso todavía (S31) | 3,05 | 8,82 |

  Todos llegan a 3:1, pero en Light quedan entre 3,05 y 3,33: cualquier cambio de alias de `border/focus` o de un fondo claro puede bajar de 3:1.
- La cabecera translúcida (V28): el anillo del logotipo y del botón de menú está sobre `background/neutral/translucent`. Sobre la página blanca, el fondo resultante es blanco y el anillo da 3,33. En el peor caso (contenido negro debajo, mezclado al 10 %), 2,67 en Light (`#0EA075` frente a `#E6E6E6`); en Dark, 8,72 (`#4FD7A6` frente a `#1E2422`). Con `prefers-reduced-transparency` el fondo es opaco y vuelve a 3,33 (§11).

**Recomendación para el módulo**

- Explicar que un **par de no texto se comprueba contra todos los fondos donde aparece**, no contra el fondo de la página. Ejemplo real: el anillo de foco y sus seis fondos.
- Proponer a desarrollo añadir esos pares a `semantic.py` (§15). Es lo que el módulo debería enseñar a hacer con la tabla del alumno.

**No comprobado**

- El peor caso de la cabecera con el contenido real que pasa por debajo (por ejemplo, una `ColorScale` con pasos oscuros en Light). El 2,67 es un límite teórico; saber si se da en la web necesita la web.

## 6. Uso del color: 1.4.1

**Lo que dice la fuente** ([Understanding 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html))

- **Nivel A.** El color no puede ser el único medio visual para transmitir información, indicar una acción, pedir una respuesta o distinguir un elemento.
- No prohíbe el color: pide otro medio además (texto, icono, forma, patrón).
- Si dos colores se diferencian también en luminosidad y su contraste llega a 3:1, esa diferencia cuenta como una distinción adicional.
- Enlaces en el texto: la técnica G183 acepta distinguirlos del texto por color si contrastan 3:1 con él y tienen otra señal al pasar el ratón o recibir el foco; F73 es el fallo de un enlace que solo se distingue por el color. Los enlaces visitados que solo cambian de color no son un fallo.

**Qué token o decisión afecta**

`text/accent/default` frente a `text/neutral/default` (enlaces), la marca de seleccionado (`border/accent/strong`, D12), los selectores de V26 y los roles de mensaje (S19: el éxito se distingue también por icono y texto).

**Cómo lo cumple DesignToken101 hoy**

- **Enlaces:** el color del enlace frente al texto da 3,50:1 en Light y 1,73:1 en Dark (cálculo propio; coincide con `componentes-v1.md` §2.3). En Dark no basta el color, por eso el subrayado es obligatorio. La web lo pone siempre (`underline` en `TextLink`).
- **Lección actual del sidebar:** marca lateral de 2 px además del color. Se mantiene también con `forced-colors` (§12).
- **`Callout`:** etiqueta fija e icono por variante (D18).
- **Selectores de idioma y tema (V26), cálculo propio:** la opción actual se distingue por un recuadro y por el color del texto. El recuadro frente al grupo da 1,09:1 en Light y 1,32:1 en Dark; el texto de la opción actual (`text/accent/default`) frente al de las otras (`text/neutral/subtle`), 1,52:1 y 1,43:1. Ninguna de las dos diferencias llega a 3:1, así que, según Understanding 1.4.1, la opción actual se distingue por el color y no cumple 1.4.1 para quien no percibe ese color. Con `forced-colors`, además, las dos opciones se ven idénticas (§12). `aria-current` y `aria-pressed` lo anuncian al lector de pantalla, pero 1.4.1 trata de lo visual.

**Recomendación para el módulo**

- V26 es el ejemplo prometido en `states`: una decisión con un coste conocido, registrada, con su alternativa escrita (un borde de 1 px `border/accent/strong`, V26). El módulo lo cuenta con las cifras de arriba y sin juzgar la decisión.
- El alumno revisa en su tabla qué estados distingue solo con color.

## 7. Foco: 2.4.7, 2.4.11 y 2.4.13

**Lo que dice la fuente**

- **2.4.7 Focus Visible, AA:** todo lo que se maneja con el teclado tiene un modo en el que el indicador de foco se ve. No fija tamaño ni contraste: el contraste lo pone 1.4.11, y 2.4.13 trata tamaño y forma ([Understanding 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)). Quitar el contorno sin poner otro indicador es el fallo F78. Usar `:focus-visible` es una técnica suficiente (C45): los navegadores lo muestran con el teclado y, en general, no con el ratón ([C45](https://www.w3.org/WAI/WCAG22/Techniques/css/C45)).
- **2.4.11 Focus Not Obscured (Minimum), AA:** un componente con el foco no puede quedar **entero** oculto por contenido del autor; tapado en parte, sí. Cita las cabeceras y los pies sticky. El nivel AAA (2.4.12) pide que no quede tapado nada ([Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)). `scroll-padding` es una técnica suficiente para los dos (C43, [C43](https://www.w3.org/WAI/WCAG22/Techniques/css/C43)).
- **2.4.13 Focus Appearance, AAA:** una parte del indicador tiene, como mínimo, el área de un perímetro de 2 px CSS del componente sin foco, y un contraste de 3:1 entre los mismos píxeles con y sin foco. Un contorno sólido de 2 px cumple el tamaño. Un indicador por dentro, pegado al borde exterior, también; uno metido más hacia dentro necesita más de 2 px ([Understanding 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)).
- **Indicador de dos colores (C40):** si los dos colores contrastan 9:1 entre sí, uno de los dos llega a 3:1 con cualquier fondo sólido. La técnica avisa de que los navegadores suelen quitar `box-shadow` en el modo de colores forzados y propone añadir `outline: 2px transparent solid` si se usa ([C40](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)).

**Qué token o decisión afecta**

`color/border/focus` y `border-width/200` (§4.4), la regla del anillo por fuera (§1.3 de `componentes-v1.md`) y por dentro en el sidebar (D27), y la cabecera sticky (V28, `--site-header-height`, que no es un token).

**Cómo lo cumple DesignToken101 hoy**

- **2.4.7:** `focus-ring` y `focus-ring-inset` (`src/styles/base.css`) dibujan un `outline` de 2 px con `:focus-visible`. Prueba en Chromium: los 11 elementos de la página de prueba muestran el anillo al llegar con el tabulador, en Light, Dark y con `forced-colors` (§12).
- **2.4.11:** `scroll-padding-block-start` con la altura medida de la cabecera (V28). La sesión de desarrollo lo comprobó en la web (42 paradas de tabulador, ninguna tapada).
- **2.4.13 (AAA), prueba propia** comparando capturas con y sin foco:
  - Contraste: el anillo cambia los píxeles con 3:1 o más en todos los fondos de §5, salvo el peor caso teórico de la cabecera.
  - Tamaño: los elementos sin radio cumplen (el enlace del texto, 528 píxeles cambiados con 3:1 frente a los 495 de su perímetro). En los de esquinas redondeadas, el recuento de píxeles no es concluyente por el suavizado de las esquinas; el contorno es por fuera y de 2 px, que la fuente da por suficiente.
  - **La lección actual del sidebar no cumple el tamaño de 2.4.13**: su marca lateral (`border/accent/strong`) y el anillo (`border/focus`) son el mismo color en los dos modos (`emerald/600` / `emerald/400`), y el anillo por dentro (D27) se pinta encima de la marca. Esa franja no cambia: 1268 píxeles cambiados frente a los 1338 del perímetro (Light y Dark); en la segunda comprobación, 1270 frente a unos 1342, y la franja cambia 1,0:1. Con colores forzados pasa lo mismo: marca y anillo toman el mismo color de sistema (1,3:1 y 1,4:1 de cambio). Es AAA; 2.4.7 sí se cumple.
- **El curso dice** (módulo 2, `radius-and-border`) que el anillo de 2 px "cumple también el tamaño de 2.4.13". Es cierto para el anillo por fuera y por dentro pegado al borde, pero no para la lección actual del sidebar. El módulo 7 lo precisa con la prueba.

**Recomendación para el módulo**

- Tres criterios, tres preguntas: ¿se ve? (2.4.7), ¿se ve entero? (2.4.11), ¿se ve bastante? (2.4.13, AAA). Los tokens resuelven la tercera y parte de la primera; la segunda es de maquetación.
- El anillo de un solo color frente al de dos colores (C40): DesignToken101 usa uno porque llega a 3:1 en todos sus fondos; si un sistema tiene fondos muy distintos (fotos, colores de marca saturados), C40 es la alternativa. Sin recomendar cambiar el de DesignToken101.
- Usar `outline` y no `box-shadow` para el foco, por `forced-colors` (§12 y §14).

**No comprobado**

- 2.4.11 con el panel móvil abierto y con zoom del 200 %: lo hizo desarrollo sin zoom; con zoom no consta.

## 8. Tamaño de los objetivos: 2.5.8

**Lo que dice la fuente** ([Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html))

- **AA.** Los objetivos de puntero miden al menos 24 × 24 px CSS, salvo: espaciado (un círculo de 24 px centrado en cada objetivo pequeño no toca otro objetivo), equivalente (otro control en la página hace lo mismo), en línea (un enlace dentro de una frase), control del navegador sin modificar y esencial.
- Son píxeles CSS: el zoom del usuario no cuenta para cumplirlo.
- 2.5.5 Target Size (Enhanced), AAA, pide 44 × 44 px (citado en `componentes-v1.md` §2.2).

**Qué token o decisión afecta**

No hay un token de tamaño mínimo (§4.5 de la especificación lo trata como referencia). El tamaño sale de la suma de tokens: relleno (`space/*`) + icono o interlineado del estilo de texto. `IconButton`: `space/200` × 2 + icono de `space/600` = 40 px.

**Cómo lo cumple DesignToken101 hoy**

Medido por la sesión de desarrollo en la web (paso 8): todos los objetivos ≥ 24 × 24 px salvo los enlaces dentro del texto (excepción en línea). Selectores 35 a 36 px; filas del sidebar 36 y 40 px; `IconButton` 40 px; enlace del autor 39 × 24 px (V36). En la página de prueba, los selectores miden 33,5 a 36 px (con otra letra).

**Recomendación para el módulo**

- Lección corta: el tamaño de un objetivo es una suma de tokens, y por eso se puede comprobar en el diseño antes del código. Sin crear un token de tamaño mínimo: ningún componente lo necesita (P11).

## 9. Espaciado de texto: 1.4.12

**Lo que dice la fuente** ([Understanding 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html))

- **AA.** No se pierde contenido ni función si el usuario cambia a la vez: interlineado a 1,5 veces el tamaño de letra, espacio tras los párrafos a 2 veces, espaciado entre letras a 0,12 veces y entre palabras a 0,16 veces.
- **No obliga al autor a usar esos valores:** pide que el contenido siga funcionando cuando el usuario los impone. Los fallos típicos son texto cortado o que se monta sobre otra caja.

**Qué token o decisión afecta**

`line-height/*` (tokens de código, D01), los estilos de texto (§8) y cualquier alto fijo. DesignToken101 no tiene tokens de espaciado entre letras ni entre palabras.

**Cómo lo cumple DesignToken101 hoy**

- Las alturas de los componentes salen del relleno y del interlineado, no de un alto fijo (`componentes-v1.md` §1.3).
- Prueba propia en la página de prueba a 1280 px, con los cuatro valores impuestos con `!important`: ningún elemento recorta su contenido y no aparece scroll horizontal. A 320 px aparece scroll horizontal, pero por el sidebar fijo de la página de prueba, que en la web se oculta por debajo de 64rem: no vale como resultado.
- `entrega-diseno.md` ya anota que 1.4.12 solo se puede comprobar en código.

**Recomendación para el módulo**

- Precisar lo que dice el módulo 2 (`typography`): el texto usa 1.5, pero 1.4.12 no se cumple por elegir 1.5; se cumple si nada se rompe cuando el usuario lo cambia. La lección de tipografía no está mal (dice lo que pide el criterio), pero "usar 1.5 por defecto evita sorpresas" es una opinión; el módulo 7 la convierte en una comprobación.

**No comprobado**

- 1.4.12 en la web real, en las 54 lecciones, a 320 px (§15).

## 10. Movimiento: 2.3.3 y prefers-reduced-motion

**Lo que dice la fuente**

- **2.3.3 Animation from Interactions, AAA:** la animación de movimiento que dispara una interacción se puede desactivar, salvo que sea esencial. "Movimiento" es lo que cambia la posición, el tamaño o la forma percibidos; los cambios de color, de opacidad y el desenfoque no cuentan, salvo que cambien esa percepción. El motivo son los trastornos vestibulares ([Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- **Técnica suficiente C39:** `@media (prefers-reduced-motion: reduce)` para quitar el movimiento, o al revés, animar solo con `no-preference` ([C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)).
- `reduce` no significa "sin movimiento": significa quitar, reducir o sustituir. Ajustes del sistema que lo activan en Windows, macOS, iOS, Android y GNOME. *Baseline* (disponible en todos los navegadores principales) desde enero de 2020 ([MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)).

**Qué token o decisión afecta**

`duration/200` y `easing/standard` (V24, §4.7 de la especificación), tokens solo de código.

**Cómo lo cumple DesignToken101 hoy**

- Las tres animaciones (panel móvil, acordeón del sidebar e `InCode`) usan la variante `motion-safe:` de Tailwind, que en el CSS compilado queda dentro de `@media (prefers-reduced-motion: no-preference)`. El panel móvil, además, cierra sin espera en JavaScript (`MobileNav.tsx`).
- Prueba en Chromium con las clases de `InCode`: sin preferencia, `transition-duration` 0,2 s; con `reduce`, 0 s.
- Cumple 2.3.3 (AAA). El panel (movimiento) y el acordeón (tamaño) son movimiento; el overlay (opacidad) no lo sería, y también se quita.

**Recomendación para el módulo**

- El token de duración no cambia con la preferencia: lo que cambia es si se aplica. Por eso no hay un "modo" de movimiento reducido en Figma: no es un tema, es una condición del CSS. Es el contraste que el alumno ya conoce con Light y Dark (módulo 5).
- **Sin verificar:** si Figma exporta las variables Timing y Easing (estado.md lo tiene sin verificar). El módulo no lo necesita.

## 11. Transparencia: prefers-reduced-transparency

**Lo que dice la fuente**

- Detecta si el usuario pidió reducir los efectos translúcidos. Ajustes en Windows, macOS e iOS. MDN la marca como **experimental** y **no Baseline** ([MDN: prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)).
- Compatibilidad según los datos de MDN (consultados el 2026-10-05): Chrome y Edge desde la 118; Firefox desde la 113, **solo con una preferencia activada**; **Safari, no** ([MDN browser-compat-data](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/media.json)).
- No es un criterio de WCAG.

**Qué token o decisión afecta**

`color/background/neutral/translucent` (V28, valor directo al 90 %) y `blur/300` (§4.8).

**Cómo lo cumple DesignToken101 hoy**

- `SiteHeader` pasa a `bg-neutral-default` con `prefers-reduced-transparency: reduce`.
- Prueba en Chromium: con la preferencia, el fondo calculado de la cabecera es `rgb(255, 255, 255)` (opaco); sin ella, `rgba(255, 255, 255, 0.9)`. El `backdrop-filter` sigue activo, pero con un fondo opaco no se ve nada detrás.
- En Safari la cabecera seguirá siendo translúcida aunque el usuario lo pida.

**Recomendación para el módulo**

- Ejemplo de por qué un valor directo con opacidad necesita **otro token opaco de respaldo**: la cabecera no inventa un color, usa `background/neutral/default`. Patrón para el alumno: cada token translúcido tiene un semántico opaco con el que sustituirlo.
- Contarlo como mejora, no como requisito, y con la compatibilidad real.

## 12. Contraste forzado: forced-colors

**Lo que dice la fuente**

- `forced-colors: active` indica que el navegador impone una paleta limitada elegida por el usuario (por ejemplo, los temas de contraste de Windows). La paleta llega con los colores de sistema de CSS. *Baseline* desde septiembre de 2022 ([MDN: forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)).
- En ese modo, el navegador ignora los colores del autor en `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, `fill` y `stroke` de SVG, entre otros; `box-shadow` y `text-shadow` pasan a `none`. El fondo **conserva su transparencia** ([CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/), Candidate Recommendation del 16 de diciembre de 2025).
- MDN aconseja no usarla para hacer otro diseño, sino para pequeños ajustes donde el resultado automático no funcione. `forced-color-adjust: none` solo se usa si el autor adapta él mismo los colores a las necesidades del usuario (CSS Color Adjustment).
- Tailwind CSS: `outline-hidden` pone un contorno transparente de 2 px que se vuelve visible con colores forzados; `outline-none` lo quita del todo ([Tailwind CSS: outline-style](https://tailwindcss.com/docs/outline-style)).

**Qué token o decisión afecta**

Ningún token se ve: el navegador sustituye todos los colores. Lo que sobrevive es la **forma**: grosores (`border-width/*`), subrayados, radios, iconos. Es la prueba de si un estado se distingue solo por color.

**Cómo lo cumple DesignToken101 hoy**

La web no tiene ninguna regla `forced-colors` (búsqueda en `src/`). Prueba en Chromium 141, con esquema claro y oscuro (paleta por defecto de la emulación):

| Elemento | Resultado |
|---|---|
| Anillo de foco | Se ve en todos los elementos: el `outline` sigue siendo de 2 px, con el color de sistema |
| Enlaces | Subrayados, con el color de enlace del sistema |
| Lección actual del sidebar | Se distingue: la marca lateral de 2 px se mantiene |
| `Callout` | Pierde el fondo; conserva el borde y la etiqueta |
| **Selectores de idioma y tema (V26)** | **La opción actual no se distingue:** fondo y texto iguales en las dos opciones |
| **`Button` `primary`** | Pierde el fondo y no tiene borde: se ve como texto suelto. Hoy no se usa en ninguna página |
| Cabecera | Fondo del sistema, con la transparencia del 90 % conservada |
| Icono del `Callout` | Conserva el color del token (Chromium da `forced-color-adjust: preserve-parent-color` al SVG, y el icono lleva su propia clase de color) |
| Foco con `box-shadow` (patrón de comparación, no es de DesignToken101) | Desaparece: el foco deja de verse |

**Recomendación para el módulo**

- Lección sobre **qué queda de un sistema de tokens cuando el usuario quita los colores**: la forma. Conecta con 1.4.1: lo que solo era color desaparece. Los dos casos de la tabla (V26 y el botón) son los ejemplos.
- En tokens: usar `outline` (no `box-shadow`) para el foco; dar borde (aunque sea del color del fondo o transparente) a los controles que se identifican por su fondo. **Sin verificar:** que un borde transparente se vuelva visible con colores forzados en Chromium y Firefox; Tailwind lo documenta para `outline`, no para `border`. Se prueba antes de recomendarlo.
- No crear tokens para este modo: los colores los pone el usuario.

**No comprobado**

- Firefox y Edge con un tema de contraste real de Windows, y Safari (MDN da soporte desde Safari 16, pero macOS no tiene un modo equivalente que se haya podido probar aquí).
- La web real: la página de prueba reproduce el marcado, no la web entera.

## 13. Más contraste: prefers-contrast

**Lo que dice la fuente**

- Detecta si el usuario pidió más (`more`) o menos (`less`) contraste; `custom` corresponde a una paleta del usuario con `forced-colors: active`. Ajustes: "Aumentar contraste" en macOS y los temas de contraste de Windows. *Baseline* desde mayo de 2022 ([MDN: prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)).
- Media Queries Level 5 es un Working Draft (19 de febrero de 2026) ([Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)). No se ha podido leer el texto exacto de su apartado de `prefers-contrast` (la página llega cortada a la herramienta); el módulo citará MDN.
- No es un criterio de WCAG.

**Qué token o decisión afecta**

Sería un **tercer eje** de `Semantic color` (o un modo más): Light, Dark, Light con más contraste, Dark con más contraste.

**Cómo lo cumple DesignToken101 hoy**

- No tiene ninguna regla (búsqueda en `src/`). Prueba en Chromium con `prefers-contrast: more`: la *media query* se cumple y ningún estilo cambia.
- El sistema ya está por encima de AA; con `more`, el usuario recibe lo mismo.

**Recomendación para el módulo**

- Contarlo como ejemplo de por qué el modo es el lugar natural de una preferencia de color (módulo 5) y de cuánto cuesta: duplicar la columna de cada semántico y comprobar de nuevo todos los pares. DesignToken101 no lo hace (P11: no hay un caso de uso que lo pida). Sin enseñar a crearlo.
- Atlassian: su página de color solo habla de los temas claro y oscuro y no menciona temas de contraste aumentado (releída el 2026-10-05). No se cita como ejemplo de `prefers-contrast`.

## 14. Sistemas de referencia

Lo comprobado el 2026-10-05:

- **SDS de Figma** (`src/theme.css`): `--sds-size-stroke-focus-ring` de 0,125rem (2 px), el mismo grosor que DesignToken101 (ya citado en el módulo 2). Tokens de overlay y *scrim* con opacidad (`#00000080`, `#ffffffcc` / `#000000cc`) y de desenfoque (`--sds-size-blur-100`). **Ninguna regla** de `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` ni `prefers-reduced-transparency`; la única `@media` es `prefers-color-scheme` ([SDS: theme.css](https://github.com/figma/sds/blob/main/src/theme.css)).
- **Atlassian** (página de color): sus tokens siguen WCAG AA, 4,5:1 para texto de menos de 24 px y 3:1 para la interfaz esencial y el texto de 24 px o más ([Atlassian: Color](https://atlassian.design/foundations/color)). Su token de foco es `color.border.focused` (ya citado en `decisiones.md`, S34). La página del componente de foco no se pudo leer (necesita JavaScript).
- **shadcn/ui:** el botón marca el foco con `outline-none`, `focus-visible:border-ring` y `focus-visible:ring-[3px] focus-visible:ring-ring/50` ([shadcn/ui: button.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx)). Con Tailwind 4.3.3, `ring-[3px]` compila a `box-shadow` (comprobado compilando la clase). La página de temas define `--ring` en oklch y no habla de contraste ni de WCAG ([shadcn/ui: Theming](https://ui.shadcn.com/docs/theming)). Por CSS Color Adjustment y C40, `box-shadow` desaparece con colores forzados. **No se ha probado el botón de shadcn/ui**: la prueba de §12 usa un patrón equivalente escrito a mano.

**Recomendación:** citar SDS y Atlassian por lo que tienen igual que DesignToken101 (grosor y token de foco, umbrales AA). shadcn/ui, como ejemplo de que un sistema muy usado deja la accesibilidad del tema a quien lo personaliza, sin afirmar que su botón falla: no se ha probado.

## 15. Hallazgos para otras sesiones

**Para Oscar (decisiones, no se cambia nada sin su visto bueno):**

1. **V26 con colores forzados:** además del riesgo aceptado de 1.4.1 y 1.4.11, la opción actual de los selectores no se distingue en absoluto con `forced-colors`. La alternativa registrada en V26 (borde de 1 px `border/accent/strong`) también lo resolvería, porque el grosor sobrevive. ¿Se mantiene el riesgo aceptado con este dato nuevo?
2. **2.4.13 en la lección actual del sidebar** (AAA, no exigido): la marca lateral y el anillo tienen el mismo color. Si se quisiera cumplir, opciones: anillo por fuera solo en ese elemento (choca con D27), o un anillo más grueso. Recomendación: dejarlo y contarlo en el módulo como ejemplo de AAA, porque el objetivo es AA.

**Para la sesión de desarrollo (pruebas en la web real, Chrome sin interfaz como en las anteriores):**

3. `forced-colors: active` (emulación de Chrome) en `what-is-designtoken101` y en una lección con `Flow`, `ColorScale`, `InCode` y tablas: anillo de foco, marca del sidebar, selectores, `Flow` (el borde de los pasos), `ColorScale` (las muestras pierden el color: ¿se entiende la lección?), logotipos SVG (`<img>`, no deberían cambiar).
4. `prefers-contrast: more` y `prefers-reduced-transparency: reduce`: confirmar en la web lo de la página de prueba.
5. **1.4.12** con los cuatro valores impuestos, en las 54 lecciones a 320 y 1440 px: recortes y scroll horizontal.
6. 2.4.11 con zoom del 200 % y la cabecera sticky.
7. Peor caso real del anillo sobre la cabecera translúcida en Light (contenido oscuro debajo).
8. **Propuesta para `tools/semantic.py`** (V37 es provisional): añadir el anillo frente a `background/neutral/strong` (3,05 / 8,28) y frente a los fondos `subtle` de los `Callout` con enlaces (`info` 3,06 / 8,09, `warning` 3,22 / 8,21, `accent` 3,18 / 8,30). Son los pares más justos del sistema.

**Para el módulo 9 (componentes):**

9. `Button` `primary` sin borde pierde su forma con colores forzados (hoy no se usa).
10. Iconos con clase de color propia: con colores forzados, Chromium conserva el color del token. Que hereden el color del texto de su componente lo evitaría. Sin probar en otros navegadores.

## 16. Propuesta de alcance del módulo

**Entra** (porque afecta a los tokens y el alumno lo puede comprobar con su tabla de pares):

| Tema | Motivo |
|---|---|
| El marco: WCAG 2.2, niveles, AA como objetivo, APCA y WCAG 3 | Lo promete el módulo 2 y da el criterio para el resto |
| Contraste de texto (1.4.3 y 1.4.6) con la tabla del alumno | Lo prometen cinco lecciones y el ejercicio del módulo 6 |
| Contraste de no texto (1.4.11) contra todos los fondos | El anillo de foco y la marca de seleccionado son tokens |
| Uso del color (1.4.1) y V26 | Prometido en `states`; enseña a mirar los estados |
| Foco (2.4.7, 2.4.11, 2.4.13) | `border/focus` y `border-width/200`; el anillo de 2 px ya se anunció en el módulo 2 |
| Objetivos (2.5.8) como suma de tokens | Corto; se comprueba en el diseño |
| Espaciado de texto (1.4.12) | Precisa lo dicho en el módulo 2 sobre el interlineado |
| Movimiento (2.3.3, `prefers-reduced-motion`) | Prometido en el módulo 2; los tokens de V24 |
| Transparencia (`prefers-reduced-transparency`) | Prometido por V28; el patrón de token opaco de respaldo |
| Colores forzados (`forced-colors`) | Es la prueba de 1.4.1 en la práctica: qué queda sin color |
| `prefers-contrast` | Breve: por qué sería un modo y por qué DesignToken101 no lo tiene |
| Ejercicio que prepara el módulo 8 | T6 |

**Queda fuera:**

| Tema | Motivo |
|---|---|
| ARIA, orden de foco, lector de pantalla, `<dialog>` | Componentes, no tokens: módulo 9 |
| 1.4.10 Reflow y 1.4.4 Resize Text | Son de maquetación; 1.4.4 ya está en el módulo 1 (`rem`). Se citan con enlace si hace falta |
| 2.5.5 (AAA, 44 px) | Una mención dentro de 2.5.8, sin lección |
| Contraste de imágenes y gráficos de datos | El sistema no los tiene |
| APCA en detalle | No es norma y WCAG 3 no lo ha adoptado |
| Crear un modo de contraste aumentado | P11: no hay caso de uso |
| Auditoría completa de la web | No es el objetivo del curso; el módulo usa la web como ejemplo |

**Sobre C17:** el módulo 7 queda provisionalmente en "Tokens en código". Con este alcance, la mitad del módulo se hace con la tabla de pares y en Figma, y la otra mitad son *media queries*. Como parte de la tabla del módulo 6 y usa CSS, la recomendación es dejarlo en "Tokens en código". Se decide con el índice.

## 17. Fuentes

Consultadas el 2026-10-05.

W3C:
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (Recommendation, 12 de diciembre de 2024)
- [Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance)
- [Understanding 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Understanding 1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)
- [Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Understanding 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [Understanding 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [Understanding 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [Understanding 2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Understanding 2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [Understanding 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [C39: prefers-reduced-motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39), [C40: indicador de foco de dos colores](https://www.w3.org/WAI/WCAG22/Techniques/css/C40), [C43: scroll-padding](https://www.w3.org/WAI/WCAG22/Techniques/css/C43), [C45: :focus-visible](https://www.w3.org/WAI/WCAG22/Techniques/css/C45)
- [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) (Working Draft, 10 de septiembre de 2026)
- [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/) (Candidate Recommendation Snapshot, 16 de diciembre de 2025)
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/) (Working Draft, 19 de febrero de 2026)

MDN:
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)
- [forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)
- [browser-compat-data: css/at-rules/media.json](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/media.json)

Herramientas y sistemas de referencia:
- [Tailwind CSS: outline-style](https://tailwindcss.com/docs/outline-style)
- [SDS de Figma: theme.css](https://github.com/figma/sds/blob/main/src/theme.css)
- [Atlassian: Color](https://atlassian.design/foundations/color)
- [shadcn/ui: button.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx) y [shadcn/ui: Theming](https://ui.shadcn.com/docs/theming)
