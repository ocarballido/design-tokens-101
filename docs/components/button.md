---
name: Button
level: atom
category: actions
status: stable
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-728
code: src/components/Button.tsx
composes: [Icon]
tokens:
  - color.background.accent.strong.default
  - color.background.accent.strong.hover
  - color.background.accent.strong.active
  - color.text.on-accent
  - color.background.neutral.hover
  - color.background.neutral.active
  - color.border.neutral.strong
  - color.text.neutral.default
  - color.border.focus
  - radius.control
  - border-width.100
  - border-width.200
---

# Button

Una acción o un enlace destacado, como "Empezar el curso".

## Cuándo usar

- Usar: para la acción principal de una vista (`variant="primary"`) y para las acciones que la acompañan (`variant="secondary"`).
- Usar: con `href`, para un enlace que tiene que destacar como una acción.
- No usar: para un enlace dentro de un párrafo; usa `TextLink`.
- No usar: para un botón que solo tiene un icono; usa `IconButton`, que exige un nombre accesible.
- No usar: dos `primary` en la misma vista; la segunda acción va con `variant="secondary"`.

## Props

| Prop | Tipo | Valores | Por defecto | Nota |
|---|---|---|---|---|
| `variant` | `string` | `primary`, `secondary` | `primary` | En Figma, variante `variant` |
| `children` | `ReactNode` | | | Obligatorio. La etiqueta |
| `icon` | `LucideIcon` | Un icono de Lucide | | Opcional, después de la etiqueta. En Figma, la variante `showIcon` y el intercambio de instancia |
| `href` | `string` | | | Con `href` es un enlace `<a>`; sin él, un `<button>` |

Además acepta los atributos de `<button>` (`type`, `onClick`…); `type` es `button` por defecto. `state` (`default`, `hover`, `active`, `focus`) solo existe en Figma: en código lo pone el navegador (`:hover`, `:active`, `:focus-visible`). Sin `disabled` ni `loading` en v1.

## Tokens

| Parte | `primary` | `secondary` |
|---|---|---|
| Fondo | `background/accent/strong/default`; `hover` y `active` con sus estados | Sin fondo; `hover` `background/neutral/hover`, `active` `background/neutral/active` |
| Borde | `border-width/100`, transparente en código | `border/neutral/strong`, `border-width/100` |
| Texto e icono | `text/on-accent` | `text/neutral/default` |
| Anillo de foco | `border/focus`, `border-width/200`, por fuera | Igual |
| Radio | `radius/control` | Igual |
| Texto | `label/default` | Igual |

En Figma, el borde del `primary` lleva la variable del fondo de cada estado; en código es `transparent`, para que el botón conserve su contorno con colores forzados.

## Reglas

- Una sola acción `primary` por vista.
- `text/on-accent` solo sobre el fondo del `primary`.
- Con `href`, navega; sin `href`, hace una acción. No uses un `<button>` con `onClick` para navegar.
- Un solo icono, después de la etiqueta.

## Accesibilidad

- La etiqueta es visible y es el nombre accesible; el icono es decorativo (`aria-hidden`).
- Objetivo de al menos 24 × 24 px (WCAG 2.2, 2.5.8).
- Foco visible con `:focus-visible`.
- El fondo del `primary` no llega a 3:1 frente a la página en Light; está permitido porque la etiqueta identifica el control (Understanding 1.4.11).

## Ejemplos

Correcto:

```tsx
<Button href="/start-here/what-is-designtoken101" icon={ChevronRight}>Empezar el curso</Button>
<Button variant="secondary" href="/resources/figma-files">Archivos de Figma</Button>
```

Incorrecto:

```tsx
<Button href="/start-here/what-is-designtoken101">Empezar el curso</Button>
<Button href="/resources/figma-files">Archivos de Figma</Button>
```

Dos `primary` en la misma vista: ninguna de las dos acciones se reconoce como la principal. La segunda va con `variant="secondary"`.
