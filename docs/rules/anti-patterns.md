# Antipatrones

## Dos acciones principales en la misma vista
- Descripción: una vista con dos acciones destacadas, como "Empezar" y "Ver el temario".
- Sí: la acción principal como `Button` con `variant=primary` y la otra con `variant=secondary`.
- No: dos `Button` con `variant=primary` en la misma vista.
- Motivo: la acción principal tiene que ser una sola para que se reconozca.

## Callout elegido por el color
- Descripción: un aviso dentro del texto de una página.
- Sí: la variante por su significado. `note`: información útil pero no imprescindible. `warning`: algo que puede provocar errores. `recommendation`: una decisión propia, no una norma. `pending`: contenido en preparación.
- No: elegir la variante por su color, o usar `pending` para una afirmación técnica sin comprobar.
- Motivo: la etiqueta de cada variante es fija y dice al lector qué tipo de aviso es; un aviso con la variante equivocada le dice algo falso.

## Takeaways fuera del final de la página
- Descripción: el resumen de lo esencial de una página.
- Sí: un solo `Takeaways`, al final de la página, antes de "Fuentes".
- No: `Takeaways` en mitad de la página, o usarlo para un aviso.
- Motivo: `Takeaways` cierra la página y su título aparece en "En esta página". Para avisos dentro del texto está `Callout`.
