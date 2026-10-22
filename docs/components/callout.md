---
name: Callout
level: molecule
category: feedback
status: stable
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=22-57
code: src/components/Callout.tsx
composes: [Icon]
tokens:
  - color.background.info.subtle
  - color.background.warning.subtle
  - color.background.accent.subtle
  - color.background.neutral.subtle
  - color.border.info.default
  - color.border.warning.default
  - color.border.accent.default
  - color.border.neutral.default
  - color.text.info.default
  - color.text.warning.default
  - color.text.accent.default
  - color.text.neutral.subtle
  - color.text.neutral.default
  - radius.container
  - border-width.100
---

# Callout

Un aviso dentro del texto de una página: una nota, una advertencia, una recomendación propia o algo pendiente.

## Cuándo usar

Elige la variante por su significado, nunca por su color:

- Usar `note`: información útil pero no imprescindible.
- Usar `warning`: algo que puede provocar errores.
- Usar `recommendation`: una decisión propia, no una norma.
- Usar `pending`: contenido en preparación.
- No usar: para el resumen del final de la página; usa `Takeaways`.
- No usar: para la explicación del itinerario de código; usa `InCode`.
- No usar: para los errores de un formulario; usa el `error` de `TextField` y `ErrorSummary`.
- No usar `pending`: para una afirmación técnica sin comprobar. No se publica hasta comprobarla; mientras, quita la afirmación.

## Anatomía

1. Icono: uno fijo por variante, decorativo.
2. Etiqueta: fija por variante (Nota, Aviso, Recomendación, Pendiente). No se cambia.
3. Contenido (`children`): texto MDX.

## Props

| Prop | Tipo | Valores | Por defecto | Nota |
|---|---|---|---|---|
| `variant` | `string` | `note`, `warning`, `recommendation`, `pending` | | Obligatorio. En Figma, variante `variant` |
| `children` | `ReactNode` | | | Obligatorio. En Figma, slot |

## Estados

No es interactivo: no tiene `state` ni estados del navegador.

## Tokens

| Parte | `note` | `warning` | `recommendation` | `pending` |
|---|---|---|---|---|
| Fondo | `background/info/subtle` | `background/warning/subtle` | `background/accent/subtle` | `background/neutral/subtle` |
| Borde | `border/info/default` | `border/warning/default` | `border/accent/default` | `border/neutral/default` |
| Icono y etiqueta | `text/info/default` | `text/warning/default` | `text/accent/default` | `text/neutral/subtle` |
| Contenido | `text/neutral/default` | Igual | Igual | Igual |

Todas: `radius/container`, `border-width/100`; etiqueta `label/default` y contenido `body/default`.

## Composición permitida

- Dentro del texto de la página, entre párrafos.
- El contenido admite párrafos, listas, enlaces y código en línea.
- No metas un `Callout` dentro de otro ni dentro de `Takeaways`.

## Reglas

- La etiqueta y el icono de cada variante son fijos: no los cambies ni los quites.
- No combines la etiqueta de una variante con los colores de otra.
- El borde es decorativo: no sirve para identificar un control.

## Accesibilidad

- La etiqueta y el icono dicen qué tipo de aviso es, no solo el color (WCAG 2.2, 1.4.1).
- El icono lleva `aria-hidden`; la etiqueta es texto.
- La etiqueta lleva el idioma de la interfaz (`lang`).

## Ejemplos

Correcto:

```mdx
<Callout variant="warning">

Si cambias el nombre de una variable en Figma, cambia también su code syntax.

</Callout>
```

Incorrecto:

```mdx
<Callout variant="recommendation">

Si cambias el nombre de una variable en Figma, cambia también su code syntax.

</Callout>
```

Se eligió `recommendation` por su color verde, pero el texto avisa de algo que provoca errores: la etiqueta "Recomendación" le dice al lector algo falso. Usa `warning`.
