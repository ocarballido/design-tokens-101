# DesignToken101: convenciones

Sistema de diseño de la web-curso DesignToken101: tokens con prefijo `--t101-`, modos Light y Dark, componentes React y clases de Tailwind CSS v4 generadas desde los tokens. Interfaz en español.

## Envoltorio

Envuelve siempre el árbol en `DesignToken101Provider`. Sin él, `Callout` y `CodeBlock` fallan: sus textos fijos ("Nota", "Aviso", "Copiar código", "Vista previa"…) salen de next-intl.

```jsx
const { DesignToken101Provider, Button, Callout, icons } = window.DesignToken101;

<DesignToken101Provider>
  <main className="mx-auto flex max-w-content flex-col gap-600 px-400 py-600">
    <h1 className="type-heading-1 text-neutral-default">Generar escalas</h1>
    <Callout variant="warning"><p>Si cambias el nombre de una variable en Figma, cambia también su code syntax.</p></Callout>
    <div className="flex flex-wrap gap-300">
      <Button icon={icons.Download}>Descargar el .zip</Button>
      <Button variant="secondary">Archivos de Figma</Button>
    </div>
  </main>
</DesignToken101Provider>
```

Modo oscuro: `data-theme="dark"` en un contenedor con `bg-neutral-default`. No inviertas colores a mano: los tokens cambian con el modo (`guidelines/color.md`).

## Reglas (de `AGENTS.md`, reglas no negociables)

1. Usa solo los componentes de este paquete: `Button`, `TextField`, `Callout`, `Takeaways` y `CodeBlock`. Si lo que necesitas no existe, dilo; no lo crees.
2. Nunca escribas valores literales de color, espaciado, radio, grosor o tamaño. Usa tokens semánticos (`guidelines/rules-tokens.md`, `guidelines/color.md`).
3. Nunca inventes props: están en `<Name>.d.ts` y `<Name>.prompt.md`.
4. No uses componentes con `status: deprecated` (ninguno de este paquete lo está).
5. Accesibilidad WCAG 2.2 AA: contraste, etiquetas, foco visible, objetivos de 24 × 24 px y sin scroll horizontal a 320 px (`guidelines/anti-patterns.md`).

## Estilos: clases de Tailwind con nombres de token

| Familia | Clases |
|---|---|
| Fondo | `bg-neutral-default` (página), `bg-neutral-subtle` (tarjetas), `bg-neutral-strong`, `bg-accent-subtle`, `bg-info-subtle`, `bg-warning-subtle`, `bg-danger-subtle` |
| Texto | `text-neutral-default`, `text-neutral-subtle` (secundario), `text-accent-default`, `text-on-accent`, `text-info-default`, `text-success-default`, `text-warning-default`, `text-danger-default` |
| Borde | `border-neutral-default` (decorativo), `border-neutral-strong` (identifica un control), `border-accent-strong` (seleccionado) |
| Radio | `rounded-control`, `rounded-container`, `rounded-group` |
| Texto (estilos de §8) | `type-heading-1` a `type-heading-4`, `type-body-default`, `type-body-small`, `type-body-strong`, `type-label-default`, `type-caption-default`, `type-code-default` |
| Espaciado (`space/*`) | `gap-`, `p-`, `px-`, `py-` con `050`, `100`, `150`, `200`, `300`, `400`, `600`; `gap-1200` |
| Foco | `focus-ring` (por fuera), `focus-ring-inset` (por dentro) |
| Ancho | `max-w-content` (columna de contenido) |

El CSS solo trae las clases que usa la web: si una de la escala no existe, usa su variable (`style={{ gap: 'var(--t101-space-800)' }}`). Nunca la paleta (`--t101-color-emerald-*`, `--t101-color-neutral-*`), font-size ni font-weight sueltos, ni valores entre corchetes (`guidelines/rules-tokens.md`).

## Uso de los componentes (`<Name>.prompt.md`, de `docs/components/`)

- `Button`: un solo `primary` por vista; las demás acciones, `secondary`. Con `href` navega; sin él, hace una acción. Icono opcional de `window.DesignToken101.icons`, después de la etiqueta.
- `Callout`: la variante por su significado, nunca por el color. `note`, información útil; `warning`, algo que puede provocar errores; `recommendation`, una decisión propia; `pending`, contenido en preparación.
- `TextField`: `label` siempre visible, sin `placeholder` en su lugar; el error con `error`, el borde no cambia.
- `Takeaways`: uno por página, al final, con `Heading2` (con `id`) y `UnorderedList` de tres elementos dentro.
- `CodeBlock`: código de varias líneas; con `preview`, solo para markdown (CodePreview).

Recetas de pantallas: `guidelines/lesson-page.md` y `guidelines/checklist.md`. Voz y tono: `guidelines/voice-and-tone.md`.
