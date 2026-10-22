// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=50-267
// source=src/components/CodeBlock.tsx
// component=CodeBlock
import figma from 'figma'
// Sintaxis del MDX (D71): un bloque de código, no <CodeBlock>, que crea mdx-components.tsx.
// Las comillas invertidas van interpoladas: la Template API no dice cómo escaparlas.
const FENCE = '```'
const instance = figma.selectedInstance
const code = instance.getString('children')
const filename = instance.getString('filename')
// El lenguaje sale de la extensión del nombre de archivo (tokens.json → json); sin extensión, ninguno.
const language = filename.includes('.') ? filename.split('.').pop() : ''
const meta = instance.getBoolean('showFilename') ? ` filename="${filename}"` : ''
export default {
  example: figma.code`${FENCE}${language}${meta}
${code}
${FENCE}`,
  imports: [],
  id: 'code-block',
}
