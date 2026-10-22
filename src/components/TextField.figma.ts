// url=https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=155-923
// source=src/components/TextField.tsx
// component=TextField
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('label')
// renderProp no escribe la prop con `false` (Template API); con `undefined` no está documentado.
const hint = instance.getBoolean('showHint') ? instance.getString('hint') : false
// invalid y code son variantes ("true" | "false"), no booleanos. En código, el error es el mensaje.
const error = instance.getEnum('invalid', { true: true, false: false }) ? instance.getString('error') : false
const code = instance.getEnum('code', { true: true, false: false })
export default {
  example: figma.code`<TextField${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('hint', hint)}${figma.helpers.react.renderProp('error', error)}${figma.helpers.react.renderProp('code', code)} />`,
  imports: ['import { TextField } from "@/components/TextField"'],
  id: 'text-field',
}
