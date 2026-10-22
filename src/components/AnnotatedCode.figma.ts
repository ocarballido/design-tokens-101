// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=203-8240
// source=src/components/AnnotatedCode.tsx
// component=AnnotatedCode
import figma from 'figma'
// Sintaxis del MDX (D71): <AnnotatedCode> con el bloque (marks) y la leyenda como lista ordenada.
// Las líneas y la leyenda son instancias anidadas sin propiedades de texto: ejemplo fijo.
const FENCE = '```'
const instance = figma.selectedInstance
const filename = instance.getBoolean('showFilename') ? ` filename="${instance.getString('filename')}"` : ''
export default {
  example: figma.code`<AnnotatedCode>

${FENCE}json${filename} marks="2,4"
{
  "color": {
    "emerald": {
      "500": { "$type": "color" }
    }
  }
}
${FENCE}

1. **Grupo.** Organiza tokens.
2. **Token.** Un nombre con un valor.

</AnnotatedCode>`,
  imports: [],
  id: 'annotated-code',
}
