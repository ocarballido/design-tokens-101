// Plugin de rehype: pasa el nombre de archivo de un bloque de código al componente CodeBlock.
// En el MDX: ```json filename="tokens.json" (componentes-v1.md §3.4).
// mdast-util-to-hast deja el texto tras el lenguaje en `code.data.meta`, pero no lo convierte
// en atributo; aquí se lee `filename="…"` y se añade como `data-filename` al elemento `code`.
// Con Turbopack, @next/mdx carga los plugins por ruta (next.config.ts).

const FILENAME = /(?:^|\s)filename="([^"]+)"/;

export default function rehypeCodeMeta() {
  return (tree) => {
    walk(tree, (node, parent) => {
      if (node.type !== 'element' || node.tagName !== 'code' || parent?.tagName !== 'pre') return;
      const filename = FILENAME.exec(node.data?.meta ?? '')?.[1];
      if (filename) node.properties = { ...node.properties, dataFilename: filename };
    });
  };
}

function walk(node, visit, parent) {
  visit(node, parent);
  for (const child of node.children ?? []) walk(child, visit, node);
}
