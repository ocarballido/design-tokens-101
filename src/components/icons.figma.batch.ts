import figma from 'figma'
export default {
  example: figma.code`<${figma.batch.name} />`,
  imports: [`import { ${figma.batch.name} } from "lucide-react"`],
  id: figma.batch.id,
  metadata: { nestable: true, props: { name: figma.batch.name } },
}
