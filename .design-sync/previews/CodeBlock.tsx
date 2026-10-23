import { CodeBlock } from 'designtoken101';

// Ejemplos de docs/components/code-block.md. Necesita DesignToken101Provider (textos de next-intl).
export function WithFilename() {
  return (
    <CodeBlock language="json" filename="tokens.json">
      {`{
  "color": {
    "emerald": {
      "500": { "$type": "color", "$value": "#33cc99" }
    }
  }
}`}
    </CodeBlock>
  );
}

export function WithoutFilename() {
  return <CodeBlock language="css">{`.button {\n  background: var(--t101-color-background-accent-strong-default);\n}`}</CodeBlock>;
}

// CodePreview (beta): pestañas Markdown / Vista previa.
export function Preview() {
  return (
    <CodeBlock
      language="markdown"
      filename="docs/components/text-field.md"
      preview={
        <>
          <h1 className="type-heading-1">TextField</h1>
          <p>Campo de texto de una línea.</p>
        </>
      }
    >
      {`---
name: TextField
status: stable
---

# TextField

Campo de texto de una línea.`}
    </CodeBlock>
  );
}
