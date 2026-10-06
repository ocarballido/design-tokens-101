# Investigación del módulo 9: componentes que consumen los tokens

Sesión de contenido, 2026-10-06. Tarea 1 del módulo 9 (Componentes y código, T1, T4, P2, P10, P11). **Pendiente de la aprobación de Oscar.**

Pregunta: qué tiene que saber quien termina el módulo 8 para que un componente **consuma** su sistema de tokens, en Figma y en código, sin valores sueltos y sin perder lo que el sistema garantiza (modos, contraste, foco). El módulo no enseña a crear un sistema de diseño ni una biblioteca de componentes (P10, T5, `what-we-teach`: "Los componentes aparecen en el módulo 9 como consumidores de los tokens"). En cada apartado se separa **lo que dice la fuente** de **la recomendación** de la sesión de contenido. Las pruebas propias dicen con qué se hicieron y cuándo.

Fuentes consultadas el 2026-10-06: ayuda de Figma (propiedades de componente, variables en diseños, Dev Mode, variables en Dev Mode, Code Connect), React, Tailwind CSS (estados, utilidades, detección de clases), shadcn/ui (Button), repositorio del SDS de Figma, WAI-ARIA Authoring Practices y WCAG 2.2.

---

## 1. De dónde parte el módulo 9

Al terminar el módulo 8, el alumno tiene el sistema completo en Figma y, si siguió el itinerario de código, en las dos capas de CSS (T16). Ningún ejercicio le ha pedido todavía **aplicar** los tokens a un componente: los módulos 5 y 7 aplican modos y revisan pares sobre pantallas.

Lo que el curso ya enseña y el módulo 9 no repite:

| Tema | Dónde está |
|---|---|
| Qué es un token de componente y cuándo se justifica (S1, S33) | [La capa de componente](/relations/component-tokens) |
| Tokens de estado y la falta de `disabled` (D12, D14) | [Estados](/relations/states), [Estados en el nombre](/naming/states-in-names) |
| No elegir modo en un componente principal | [Aplicar los modos al diseño](/modes/apply-modes) |
| Clases de Tailwind que salen de los tokens (V09) y lo que no se expone | [El tema de Tailwind CSS](/figma-to-code/tailwind-theme) |
| Contraste, anillo de foco, tamaño del objetivo, movimiento, colores forzados | Módulo 7 |

Lo que el curso **promete** al módulo 9:

- `what-we-teach`: "Componentes de React que consumen los tokens" / "Primeros componentes".
- `wcag-and-tokens` (módulo 7): "Lo que queda fuera de los tokens (los atributos ARIA, el orden del foco, lo que anuncia un lector de pantalla) es trabajo de los componentes, y lo verás en el módulo 9."
- `estado.md`, "Pendiente de reflejar": V18 y V19 (dibujo frente a anatomía), V30 (`current` y no `active`), y los hallazgos de colores forzados del módulo 7 (iconos con el color del token, `Button` `primary` sin borde, muestras de `ColorScale`).

---

## 2. El componente como consumidor: la tabla de anatomía

### Lo que dicen las fuentes

- **Figma.** Un componente tiene cinco tipos de propiedad: variante ("las distintas variaciones de un componente, como sus estados, tamaños o colores"), booleano, intercambio de instancia, texto y slot. A las propiedades de booleano, texto e intercambio de instancia se les puede aplicar una variable ([Figma: Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)). Las variables booleanas, numéricas y de texto se pueden aplicar a una instancia para elegir su variante, y la variante cambia con el modo ([Figma: Apply variables to designs](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs)).
- **React.** "Los componentes de React usan *props* para comunicarse"; un prop puede tener un valor por defecto, y el contenido anidado llega en `children` ([React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)).
- **Tailwind CSS.** Para reutilizar estilos en varios archivos, "la mejor estrategia es crear un componente" del framework, que da "una única fuente de verdad para los estilos" ([Tailwind CSS: Styling with utility classes, Using components](https://tailwindcss.com/docs/styling-with-utility-classes#using-components)).

### DesignToken101 hoy

`docs/componentes-v1.md` describe cada componente con la misma plantilla: partes, props (mismo nombre en Figma y en React, §1.1), variantes de Figma y **una tabla de tokens con una fila por parte y una columna por estado** (§2.2, `Button`). El código la sigue literalmente: `src/components/Button.tsx` tiene un objeto `VARIANTS` con las clases de cada variante, y cada clase es un token (`bg-accent-strong-default`, `hover:bg-accent-strong-hover`…).

### Recomendación

La tabla parte × estado → token es el puente entre los dos lados y lo que el alumno puede hacer entero en Figma (P2). Es el eje del módulo: se escribe antes de dibujar o programar, se aplica en Figma con variables y se traduce a clases en código. Usarla como ejemplo con `Button` (tiene variantes y los cuatro estados) y `Callout` (variantes sin estados interactivos).

---

## 3. Estados: variante en Figma, pseudoclase en CSS

### Lo que dicen las fuentes

- **Figma:** los estados se dibujan como variantes (cita de §2).
- **Tailwind CSS:** "Cada clase de utilidad se puede aplicar *condicionalmente* añadiendo una variante al principio del nombre de la clase". Hay variantes para `hover`, `focus`, `focus-visible`, `active`, para los atributos ARIA booleanos más comunes (`aria-expanded` → `&[aria-expanded="true"]`, `aria-checked`, `aria-disabled`), para `data-*` y para `forced-colors`, `motion-safe` y `motion-reduce` ([Tailwind CSS: Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)).

### DesignToken101 hoy

§1.2 de `componentes-v1.md`: `state` es una variante **solo de Figma** (el navegador la resuelve con `:hover`, `:active`, `:focus-visible`); `current` es un prop real en los dos lados; `active` es siempre "pulsado" (V30). El `SidebarSection` usa `aria-expanded` como prop de estado.

### Comparación con shadcn/ui (para el texto, no cambia nada)

El `Button` de shadcn/ui define el hover con un modificador de opacidad sobre el mismo token: `bg-primary hover:bg-primary/90`, y el foco con `focus-visible:ring-ring/50` ([shadcn/ui: button.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx)). DesignToken101 usa tokens de estado explícitos (D12), cada uno con su contraste calculado.

### Recomendación

Contarlo como la diferencia más visible entre los dos lados: en Figma un estado es una variante que se dibuja; en código no es un prop, es una pseudoclase o un atributo ARIA. Comparar los dos enfoques del hover (token de estado frente a opacidad derivada) separando la fuente de la recomendación: con opacidad, el color resultante depende del fondo y no tiene un contraste calculado en la tabla del módulo 7.

---

## 4. De la variante a la clase

### Lo que dicen las fuentes

- **Tailwind CSS** lee los archivos como texto: "No construyas nombres de clase de forma dinámica"; "asigna siempre los props a nombres de clase estáticos", con el ejemplo de un objeto `colorVariants` en un `Button` ([Tailwind CSS: Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names)).
- **Tailwind CSS:** "no añadas nunca dos clases que se contradicen al mismo elemento"; en React, eso suele significar "exponer props concretos para personalizar el estilo en lugar de dejar que quien usa el componente añada clases desde fuera" ([Tailwind CSS: Managing style conflicts](https://tailwindcss.com/docs/styling-with-utility-classes#managing-style-conflicts)).
- **shadcn/ui** hace lo mismo con la librería `cva` (`variants` y `defaultVariants`), y copia el código del componente en el proyecto ([shadcn/ui: Button](https://ui.shadcn.com/docs/components/button)).

### Prueba propia (2026-10-06, `grep` sobre `src/components/` y `src/mdx-components.tsx`)

- Ninguna clase de color, espacio, radio o tamaño escrita a mano: el único valor entre corchetes es `h-[1lh]` (`Takeaways`, una línea de texto, no un valor del diseño).
- **Ninguna comprobación lo vigila.** `--*: initial` (V09) hace que una clase del tema por defecto (`bg-red-500`) no genere CSS, pero un valor arbitrario (`p-[13px]`) sí lo genera, y `npm run check:tokens` no revisa los componentes.

### Recomendación

Enseñar el patrón del objeto de variantes con clases completas (es lo que hace la web y lo que dice Tailwind), sin `cva` (dependencia que no hace falta para entenderlo). Y añadir la comprobación que falta (ver §8, punto 4).

---

## 5. La accesibilidad que es del componente

### Lo que dicen las fuentes

- **4.1.2 Name, Role, Value (A):** en todo componente de interfaz, el nombre y el rol se pueden determinar por programa, y los estados que cambia el usuario se comunican. Con los controles estándar usados según su especificación, se cumple ([Understanding 4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)).
- **WAI-ARIA APG, Disclosure:** un botón que muestra y oculta contenido lleva `aria-expanded` (`true` o `false`), opcionalmente `aria-controls`, y se activa con Enter y con Espacio ([APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)).
- **2.5.3 Label in Name (A)** ya está citado en C19.

### DesignToken101 hoy

Ejemplos reales: `Button` es `<a>` con `href` y `<button>` sin él (§2.2); `SidebarSection` y `InCode` siguen el patrón Disclosure; el nombre accesible de `SidebarSection` contiene el número visible (C19, V40); los iconos llevan `aria-hidden`; `Callout` dice su tipo con texto y no con color (D18, 1.4.1).

**Hallazgos del módulo 7 que son del componente** (pruebas de la sesión de desarrollo, Chrome 154, 2026-10-05):

- Con colores forzados, los iconos con clase de color propia (`Callout`, flechas de `Flow`) conservan el color del token.
- El `Button` `primary` no tiene borde: con colores forzados se queda como texto suelto. El módulo 7 ya recomienda "dar un borde a los controles que se reconocen por su fondo" ([forced-colors-and-contrast](/accessibility/forced-colors-and-contrast)). Hoy no se usa en ninguna página.
- Las muestras de `ColorScale` pierden el color.

### Recomendación

Una lección sobre lo que los tokens no resuelven: elemento HTML correcto, nombre accesible, estados ARIA y su relación con las variantes de Figma (`aria-expanded` frente a la propiedad `open`). Sin repetir el contraste ni el foco del módulo 7: enlazarlos. Usar el `Button` `primary` como ejemplo de un componente que cumple los tokens y aun así falla con colores forzados (ver §8, punto 3).

---

## 6. Del diseño al código: qué ve quien implementa

### Lo que dicen las fuentes

- **Dev Mode** está "disponible en todos los planes de pago" y "requiere un puesto Full o Dev" ([Figma: Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)). Muestra los estilos y variables de la capa, el valor de la variable y la cadena de alias, permite cambiar de modo en el detalle de la variable y sugiere variables para valores sueltos; para que el CSS sea válido, "normaliza los nombres de las variables en el código" ([Figma: Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471)). Ese artículo no menciona el code syntax.
- **Code Connect** une componentes del código con los de Figma y los muestra en Dev Mode, en versión de interfaz y de línea de comandos; está "disponible en los planes Organization y Enterprise" ([Figma: Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)).
- **SDS de Figma:** componentes de React que usan las variables CSS generadas desde Figma, organizados en primitivos y composiciones, con Code Connect; leer y escribir variables con la API REST es del plan Enterprise, y el repositorio ofrece un plugin como alternativa ([figma/sds](https://github.com/figma/sds)).

### DesignToken101 hoy

- D03: el formato del code syntax está verificado con el servidor MCP de Figma; **falta ver cómo lo muestra Dev Mode** (pendiente desde el 2026-09-30).
- V18 y V19: cuando el dibujo de Figma y la anatomía no coincidían, Oscar decidió cuál mandaba y se registró. D31 a D33 hicieron después lo contrario: pasar el código a Figma.

### Recomendación

- Code Connect no entra en el texto principal: el curso asume Figma Professional (P13). Como mucho, un párrafo que diga que existe y en qué planes.
- Lo que Dev Mode muestra del code syntax no se afirma hasta comprobarlo (P14). Ver §8, punto 5.
- Contar V18 y V19 como el caso real de "el dibujo y la especificación no coinciden": se decide cuál manda, se registra y se actualiza el otro.

---

## 7. Tokens de componente en el módulo 9

S33 (formato del nombre) es provisional "hasta que aparezca el primer token de componente" (P11). Ningún componente de DesignToken101 cumple los dos casos de [La capa de componente](/relations/component-tokens). El módulo 9 no tiene por qué crear uno: puede pedir al alumno que aplique los dos criterios a su componente y registre la decisión (como el registro del módulo 8).

---

## 8. Huecos y decisiones para Oscar

1. **Dónde va el código (P2).** El módulo se llama "Componentes y código" y `what-we-teach` promete "componentes de React". Opciones:
   - **A.** Como los módulos 6 a 8: el texto principal trata la tabla de anatomía, las variantes con variables en Figma, los estados y la accesibilidad del componente; el React y Tailwind CSS van en `InCode`. Se sigue entero en Figma. La fila de `what-we-teach` pasa a "Componentes que consumen los tokens, en Figma y en React".
   - **B.** El código en el texto principal: el módulo es para quien implementa, y la lección dice al principio que la parte de Figma está en los primeros apartados.
   - *Recomendación: A*, por P2 y por coherencia con los módulos 6 a 8.
2. **Componente del ejemplo.** *Recomendación:* `Button` (variantes y cuatro estados) y `Callout` (variantes sin estados interactivos). Alternativa: `SidebarSection` (estados, `current` y `aria-expanded`, en uso), más complejo para empezar.
3. **`Button` `primary` sin borde con colores forzados.** Opciones: (a) la sesión de desarrollo le añade un borde transparente de `border-width/100` (el módulo 7 ya lo recomienda; falta comprobar qué clase da `transparent` con `--*: initial`) y la lección cuenta el antes y el después; (b) se deja y se cuenta como riesgo conocido. *Recomendación: a*: el curso no debería enseñar un fallo que el propio curso recomienda corregir, y el botón aún no se usa.
4. **Comprobación de "solo tokens" en los componentes.** Hoy nada detecta un valor arbitrario (`p-[13px]`). *Recomendación:* que la sesión de desarrollo añada a `npm run check:tokens` una búsqueda de valores entre corchetes en `src/`, con una lista de excepciones (`h-[1lh]`), y la pruebe en negativo. La lección la enseña como comprobación del componente.
5. **Dev Mode y el code syntax (D03).** *Recomendación:* que Oscar abra en Dev Mode una capa con una variable (por ejemplo, el fondo de `Button` `primary`) y haga una captura del panel en vista Code y en vista List. Sin esa prueba, la lección no dice cómo se ve.
6. **Ejercicio.** *Recomendación:* el alumno elige un control de su diseño (P5), escribe su tabla parte × estado → token, lo crea en Figma con variantes y variables (sin valores sueltos, sin modo en el componente principal), comprueba los cuatro modos, aplica los dos criterios de los tokens de componente y registra la decisión; en `InCode`, el componente de React con el objeto de variantes. Consecuencia para P18: **el diseño de partida tiene que incluir al menos un botón con estados** dibujado con valores sueltos.
7. **V01 (`proxy.ts`, plugins de MDX con Turbopack)** no es de tokens ni de componentes. *Recomendación:* fuera del módulo 9; a "Cómo se hizo esta web".

---

## 9. Fuentes

- [Figma: Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
- [Figma: Apply variables to designs](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs)
- [Figma: Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma: Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471)
- [Figma: Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [figma/sds](https://github.com/figma/sds)
- [React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [Tailwind CSS: Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Tailwind CSS: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind CSS: Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [shadcn/ui: Button](https://ui.shadcn.com/docs/components/button) y [button.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx)
- [WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [Understanding 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
