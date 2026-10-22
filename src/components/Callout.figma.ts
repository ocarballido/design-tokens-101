// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=22-57&t=OdNXJ1ujWCveYIDM-4
// source=src/components/Callout.tsx
// component=Callout
import figma from 'figma'
const instance = figma.selectedInstance
const variant = instance.getEnum('variant', { note: 'note', warning: 'warning', recommendation: 'recommendation', pending: 'pending' })
export default {
  example: figma.code`<Callout variant="${variant}">Texto del aviso.</Callout>`,
  imports: ['import { Callout } from "@/components/Callout"'],
  id: 'callout',
}
