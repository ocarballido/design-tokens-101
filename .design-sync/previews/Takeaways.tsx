import { Heading2, Takeaways, UnorderedList } from 'designtoken101';

// Ejemplo de docs/components/takeaways.md: un título ## con id y una lista, al final de la página.
export function Default() {
  return (
    <Takeaways>
      <Heading2 id="lo-que-te-llevas">Lo que te llevas</Heading2>
      <UnorderedList>
        <li>Un token es un nombre con un valor.</li>
        <li>Los primitivos guardan los valores; los semánticos dicen para qué sirven.</li>
        <li>El modo lo cambia el sistema, no el componente.</li>
      </UnorderedList>
    </Takeaways>
  );
}
