---
title: Color
type: foundation
status: stable
tokens: tokens/dtcg/semantic-color/ (Light y Dark)
---

# Color

## Principios

- El color comunica jerarquía y estado, pero nunca es el único indicador (WCAG 2.2, 1.4.1).
- Contraste mínimo de 4,5:1 para el texto y de 3:1 para los bordes que identifican un control (WCAG 2.2 AA).
- Los mismos tokens sirven para Light y Dark: el modo lo cambia el sistema, no el componente.

## Tokens semánticos

### Fondo

| Token | Uso | No usar para |
|---|---|---|
| `color/background/overlay` | Capa que oscurece el contenido cuando el panel de navegación móvil está abierto. | No como fondo de un componente. |
| `color/background/neutral/default` | Fondo de la página. | No para tarjetas ni bloques: usa background/neutral/subtle. |
| `color/background/neutral/subtle` | Fondo de tarjetas y bloques de código. | No para la página: usa background/neutral/default. |
| `color/background/neutral/strong` | Superficies destacadas, como el grupo del selector de tema y el código en línea. | No para hover, aunque tenga el mismo color: usa background/neutral/hover. |
| `color/background/neutral/hover` | Fondo de un control neutro sin fondo al pasar el ratón (botón secundario, IconButton, navegación). Su texto pasa a text/neutral/default. | No aplica |
| `color/background/neutral/active` | Fondo de un control neutro pulsado. Su texto pasa a text/neutral/default: text/neutral/subtle no llega a 4,5:1 en Dark. | No aplica |
| `color/background/neutral/translucent` | Fondo de la cabecera fija, que deja ver con desenfoque el contenido que pasa por debajo. | Solo para superficies fijas sobre contenido que se desplaza. |
| `color/background/accent/subtle` | Fondo tintado de acento: Callout recommendation, Takeaways y elemento actual de la navegación. | No para botones: usa background/accent/strong/default. |
| `color/background/accent/strong/default` | Fondo del botón principal. | Solo para la acción principal, con text/on-accent encima. |
| `color/background/accent/strong/hover` | Fondo del botón principal al pasar el ratón. | Solo como estado de background/accent/strong/default. |
| `color/background/accent/strong/active` | Fondo del botón principal pulsado. | Solo como estado de background/accent/strong/default. |
| `color/background/info/subtle` | Fondo de los mensajes de información (Callout note). Va con text/info/default y border/info/default. | No aplica |
| `color/background/success/subtle` | Fondo de los mensajes de éxito. Ningún componente lo usa todavía. | No para fondos de acento: usa background/accent/subtle. |
| `color/background/warning/subtle` | Fondo de los avisos (Callout warning). Va con text/warning/default y border/warning/default. | No aplica |
| `color/background/danger/subtle` | Fondo de los mensajes de error. Ningún componente lo usa todavía. Va con text/danger/default. | No aplica |

### Texto

| Token | Uso | No usar para |
|---|---|---|
| `color/text/on-accent` | Texto e iconos sobre background/accent/strong/*. | Solo sobre esos fondos. |
| `color/text/neutral/default` | Texto principal e iconos de la interfaz. También el texto de un control neutro en hover o pulsado. | No aplica |
| `color/text/neutral/subtle` | Texto secundario: ayudas, metadatos y leyendas. | No para texto que haya que leer para completar una tarea, ni sobre background/neutral/active. |
| `color/text/accent/default` | Enlaces y texto de acento. | No para párrafos de texto. |
| `color/text/accent/hover` | Enlace al pasar el ratón. | Solo como estado de text/accent/default. |
| `color/text/info/default` | Texto e icono de los mensajes de información (Callout note). | Solo sobre background/info/subtle o el fondo de la página. |
| `color/text/success/default` | Texto e icono de los mensajes de éxito, como "Copiado" en el bloque de código. | No aplica |
| `color/text/warning/default` | Texto e icono de los avisos (Callout warning). | Solo sobre background/warning/subtle o el fondo de la página. |
| `color/text/danger/default` | Texto e icono de los errores, como el mensaje de error de TextField. | El error también se dice con texto, nunca solo con el color. |

### Borde

| Token | Uso | No usar para |
|---|---|---|
| `color/border/focus` | Anillo de foco de los elementos interactivos, con border-width/200. | No para marcar lo seleccionado: usa border/accent/strong. |
| `color/border/neutral/default` | Bordes y separadores decorativos. | No para el borde que identifica un control: usa border/neutral/strong. |
| `color/border/neutral/strong` | Borde que identifica un control, como un campo o el botón secundario. Cumple 3:1. | No para separadores. |
| `color/border/info/default` | Borde de los mensajes de información (Callout note). | Decorativo: no sirve para identificar un control. |
| `color/border/success/default` | Borde de los mensajes de éxito. Decorativo; ningún componente lo usa todavía. | No aplica |
| `color/border/warning/default` | Borde de los avisos (Callout warning). | Decorativo: no sirve para identificar un control. |
| `color/border/danger/default` | Borde de los mensajes de error. Decorativo; ningún componente lo usa todavía. | No aplica |
| `color/border/accent/default` | Borde del Callout recommendation. | Decorativo: no sirve para identificar un control. |
| `color/border/accent/strong` | Indicador de seleccionado o actual, como la marca del elemento actual de la navegación. Cumple 3:1. | No para el foco: usa border/focus. |

## Reglas para agentes

- Usa solo los tokens de esta tabla. Nunca la paleta (color.emerald.*, color.neutral.*…) ni valores literales.
- Usa text/on-accent solo sobre background/accent/strong/*.
- Un error, un aviso o un éxito llevan siempre texto o icono, además del color.
- No inviertas colores a mano en modo oscuro: los tokens ya cambian con el modo.
- Si ningún token encaja, dilo y propón el que falta.

Reglas generales de los tokens: [rules-tokens.md](../rules/rules-tokens.md).
