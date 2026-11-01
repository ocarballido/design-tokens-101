---
name: Takeaways
level: molecule
category: content
status: stable
figma: https://www.figma.com/design/yAIMfySdLHo6hyNg8E1F6O/TokensDS?node-id=89-364
code: src/components/Takeaways.tsx
composes: [Icon]
tokens:
  - color.background.accent.subtle
  - color.text.neutral.default
  - color.text.accent.default
  - radius.container
---

# Takeaways

El resumen de lo esencial de una página ("Lo que te llevas"), al final, antes de "Fuentes".

## Cuándo usar

- Usar: una vez por página, al final, antes de "Fuentes".
- No usar: para un aviso o una nota dentro del texto; usa `Callout`.
- No usar: en mitad de la página; el resumen va al final.
- No usar: como una recomendación; usa `Callout` con `variant="recommendation"`.

## Anatomía

1. Región (`section`), con el nombre del título.
2. Título: un `##` del MDX, con un icono decorativo (`li:graduation-cap`) delante.
3. Lista (`ul`) de tres elementos, cada uno con una marca decorativa (`li:check`) en lugar de la viñeta.

## Props

| Prop | Tipo | Valores | Por defecto | Nota |
|---|---|---|---|---|
| `children` | `ReactNode` | | | Obligatorio: un título `##` y una lista, escritos en Markdown dentro del componente |

`size` (`large`, `small`) solo existe en Figma: en código, el relleno cambia con el ancho de la pantalla.

## Estados

No es interactivo: no tiene estados.

## Tokens

| Parte | Token |
|---|---|
| Fondo | `background/accent/subtle` |
| Borde | Sin borde |
| Radio | `radius/container` |
| Título | `heading/2`, `text/neutral/default` |
| Icono del título y marcas | `text/accent/default` |
| Texto de la lista | `body/default`, `text/neutral/default` |

## Composición permitida

- Solo un título `##` y una lista sin ordenar.
- El texto de la lista admite enlaces y código en línea.
- No metas `Callout`, bloques de código ni otros componentes dentro.

## Reglas

- Un solo `Takeaways` por página.
- El título es un `##` del MDX: sin él, el build falla, porque necesita su `id` para "En esta página".
- Fuera del MDX, en JSX, el título es `Heading2` con `id` y la lista es `UnorderedList` (`src/components/Prose.tsx`): el componente los reconoce por su tipo, así que un `h2` o una `ul` no valen.
- La lista tiene tres elementos.
- No añadas borde: lo que lo distingue del `Callout` `recommendation`, que tiene el mismo fondo, es la falta de borde y el título con icono.

## Accesibilidad

- `section` con `aria-labelledby` al título: el título da nombre a la región.
- Icono y marcas con `aria-hidden`.
- La lista lleva `role="list"`: Safari quita la semántica de lista a una `ul` sin viñetas.
- El título aparece en "En esta página" y en la lista de encabezados del lector de pantalla.

## Ejemplos

Correcto:

```mdx
<Takeaways>

## Lo que te llevas

- Un token es un nombre con un valor.
- Los primitivos guardan los valores; los semánticos dicen para qué sirven.
- El modo lo cambia el sistema, no el componente.

</Takeaways>
```

Incorrecto:

```mdx
<Takeaways>

**Lo que te llevas**

- Un token es un nombre con un valor.

</Takeaways>
```

El título no es un `##`: no tiene `id`, no aparece en "En esta página" y el build falla. Escribe el título como `## Lo que te llevas`.

En JSX, fuera del MDX, correcto:

```jsx
<Takeaways>
  <Heading2 id="lo-que-te-llevas">Lo que te llevas</Heading2>
  <UnorderedList>
    <li>Un token es un nombre con un valor.</li>
    <li>Los primitivos guardan los valores; los semánticos dicen para qué sirven.</li>
    <li>El modo lo cambia el sistema, no el componente.</li>
  </UnorderedList>
</Takeaways>
```

Incorrecto:

```jsx
<Takeaways>
  <h2 id="lo-que-te-llevas">Lo que te llevas</h2>
  <ul>
    <li>Un token es un nombre con un valor.</li>
  </ul>
</Takeaways>
```

Un `h2` y una `ul` no son `Heading2` ni `UnorderedList`: el componente no encuentra el título y falla ("falta el título ## con id"). Usa `Heading2` con `id` y `UnorderedList`.
