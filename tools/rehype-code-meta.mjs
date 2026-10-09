// Plugin de rehype: pasa el nombre de archivo de un bloque de código al componente CodeBlock.
// En el MDX: ```json filename="tokens.json" (componentes-v1.md §3.4). Dentro de AnnotatedCode
// (§3.10), también las líneas marcadas: ```json filename="tokens.json" marks="2,4,18".
// mdast-util-to-hast deja el texto tras el lenguaje en `code.data.meta`, pero no lo convierte
// en atributo; aquí se lee `filename="…"` y se añade como `data-filename` al elemento `code`,
// y `marks="…"`, como `data-marks`.
// Con Turbopack, @next/mdx carga los plugins por ruta (next.config.ts).

const FILENAME = /(?:^|\s)filename="([^"]+)"/;
const MARKS = /(?:^|\s)marks="([^"]+)"/;

export default function rehypeCodeMeta() {
  return (tree) => {
    walk(tree, (node, parent) => {
      if (node.type !== 'element' || node.tagName !== 'code' || parent?.tagName !== 'pre') return;
      const meta = node.data?.meta ?? '';
      const filename = FILENAME.exec(meta)?.[1];
      const marks = MARKS.exec(meta)?.[1];
      if (filename) node.properties = { ...node.properties, dataFilename: filename };
      if (marks) node.properties = { ...node.properties, dataMarks: marks };
    });
  };
}

function walk(node, visit, parent) {
  visit(node, parent);
  for (const child of node.children ?? []) walk(child, visit, node);
}
