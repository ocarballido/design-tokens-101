// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=24-728
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance
const variant = instance.getEnum('variant', { primary: 'primary', secondary: 'secondary' })
const children = instance.getString('children')
// showIcon es una variante ("true" | "false"), no un booleano. El nombre del icono sale de la
// plantilla batch de iconos (metadata.props.name), no de `name`, que no está documentado.
const showIcon = instance.getEnum('showIcon', { true: true, false: false })
const icon = showIcon ? instance.findInstance('Icon').getInstanceSwap('Instance').executeTemplate().metadata.props.name : undefined
export default {
  example: icon
    ? figma.code`<Button variant="${variant}" icon={${icon}}>${children}</Button>`
    : figma.code`<Button variant="${variant}">${children}</Button>`,
  imports: icon
    ? ['import { Button } from "@/components/Button"', `import { ${icon} } from "lucide-react"`]
    : ['import { Button } from "@/components/Button"'],
  id: 'button',
}
