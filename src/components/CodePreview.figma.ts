// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=239-1152
// source=src/components/CodeBlock.tsx
// component=CodeBlock
import figma from 'figma'
// Sintaxis del MDX (D71): un bloque markdown con `preview`. tab es solo de Figma y los textos no
// tienen propiedad: fragmento fijo, con el formato de docs/components/code-block.md.
const FENCE = '````'
export default {
  example: figma.code`${FENCE}markdown filename="docs/components/text-field.md" preview
# TextField

Campo de texto de una línea, con etiqueta visible, ayuda opcional y mensaje de error.

## Cuándo usar

- Usar: para escribir un valor corto, como un color en hex, un nombre o un número decimal.
- No usar: para elegir entre opciones cerradas; usa Select.
${FENCE}`,
  imports: [],
  id: 'code-preview',
}
