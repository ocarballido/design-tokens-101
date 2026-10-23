// Entrada del piloto para /design-sync (Claude Design). No es código de la web: reexporta los
// componentes del piloto de docs/inventory.md tal como están en src/components.
export { Button } from '@/components/Button';
export { TextField } from '@/components/TextField';
export { Callout } from '@/components/Callout';
export { Takeaways } from '@/components/Takeaways';
export { CodeBlock } from '@/components/CodeBlock';
// Takeaways reconoce su título y su lista por el tipo del elemento: hacen falta estos dos.
export { Heading2, UnorderedList } from '@/components/Prose';
export { DesignToken101Provider } from './provider';
// Iconos de Lucide de TokensDS (D70), en un espacio de nombres: DesignToken101.icons.ChevronRight.
export * as icons from './icons';
