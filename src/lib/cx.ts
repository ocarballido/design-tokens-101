// Une clases de Tailwind y descarta las vacías.
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
