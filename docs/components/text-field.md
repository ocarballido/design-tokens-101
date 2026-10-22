---
name: TextField
level: molecule
category: forms
status: stable
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=155-923
code: src/components/TextField.tsx
composes: [Icon]
tokens:
  - color.text.neutral.default
  - color.text.neutral.subtle
  - color.background.neutral.default
  - color.border.neutral.strong
  - color.border.focus
  - color.text.danger.default
  - radius.control
  - border-width.100
  - border-width.200
---

# TextField

Campo de texto de una línea, con etiqueta visible, ayuda opcional y mensaje de error.

## Cuándo usar

- Usar: para escribir un valor corto, como un color en hex, un nombre o un número decimal.
- No usar: para elegir entre opciones cerradas; usa `Select`.
- No usar: para una opción de sí o no; usa `Checkbox`.
- No usar: para subir archivos; usa `FileUpload`.
- No usar: para texto de varias líneas. No hay componente en v1: dilo y propón el que falta.

## Anatomía

1. Etiqueta (`label`): obligatoria y siempre visible.
2. Ayuda (`hint`): opcional, debajo de la etiqueta.
3. Campo (`input`).
4. Error: solo con `error`, debajo del campo; icono `li:circle-alert` y texto.
5. Contenido de debajo (`children`): opcional, después del error.

## Props

| Prop | Tipo | Valores | Por defecto | Nota |
|---|---|---|---|---|
| `label` | `string` | | | Obligatorio |
| `hint` | `string` | | | En Figma, texto y booleano `showHint` |
| `error` | `string` | | | Con texto, el campo es no válido. En Figma, variante `invalid` y texto del error |
| `code` | `boolean` | | `false` | El valor se escribe con `code/default` (un hex). En Figma, variante `code` |
| `inputMode` | `string` | `text`, `decimal` | `text` | Solo código |
| `subgrid` | `boolean` | | `false` | Solo código: las partes ocupan las filas de la rejilla del padre, para alinear dos campos en una fila aunque sus ayudas midan distinto |
| `children` | `ReactNode` | | | Solo código: contenido debajo del error |

Además acepta los atributos de `<input>` (`name`, `value`, `onChange`, `onBlur`…), salvo `type`, que siempre es `text`.

## Estados

- Props: `error` (no válido).
- Del navegador: `focus`. En Figma, la variante `state` (`default`, `focus`) solo existe allí; no la pases como prop.
- Sin `hover`: el campo no cambia al pasar el puntero. Sin `disabled` en v1.

## Tokens

| Parte | Token |
|---|---|
| Etiqueta | `text/neutral/default`, `label/default` |
| Ayuda | `text/neutral/subtle`, `caption/default` |
| Fondo del campo | `background/neutral/default` |
| Borde del campo | `border/neutral/strong`, `border-width/100` |
| Valor | `text/neutral/default`, `body/default` (`code/default` con `code`) |
| Anillo de foco | `border/focus`, `border-width/200`, por fuera |
| Radio | `radius/control` |
| Error (icono y texto) | `text/danger/default`, `body/small` |

## Composición permitida

- Dentro de un formulario con su botón de envío (`Button`).
- Dos campos en una fila, dentro de una rejilla, con `subgrid` en los dos.
- `children` solo para información sobre el valor del campo, como el hex resultante.
- Si al pulsar la acción del formulario hay uno o más errores, `ErrorSummary` aparece encima del botón, con un enlace a cada campo.

## Reglas

- No uses `placeholder` en lugar de la etiqueta.
- Con `error`, el mensaje dice cómo corregir el valor.
- Con error, el borde no cambia: no uses `border/danger/default` en el campo, porque no llega a 3:1. El error lo dicen el texto y el icono.
- El error aparece al salir del campo y al enviar, no mientras se escribe por primera vez.

## Accesibilidad

- La etiqueta está asociada al campo (`label for`).
- `aria-describedby` apunta a la ayuda y al error; con error, `aria-invalid="true"` (WCAG 2.2, 3.3.1).
- El borde `border/neutral/strong` cumple 3:1 frente a la página (1.4.11).
- Alto de al menos 24 px (2.5.8); a 320 px ocupa el ancho de la columna.
- En un campo de código (un hex), `autoComplete="off"` y `spellCheck={false}`.

## Ejemplos

Correcto:

```tsx
<TextField
  label="Color de marca"
  hint="En hex, con seis cifras."
  code
  autoComplete="off"
  spellCheck={false}
  error="Escribe el color con # y seis cifras."
/>
```

Incorrecto:

```tsx
<input placeholder="Color de marca" style={{ borderColor: 'red' }} />
```

Sin etiqueta visible, el error solo con el color del borde y un valor literal en lugar de un token. Usa `TextField` con `label` y `error`.
