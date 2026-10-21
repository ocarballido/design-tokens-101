// Plugin de rehype: pasa el nombre de archivo de un bloque de código al componente CodeBlock.
// En el MDX: ```json filename="tokens.json" (componentes-v1.md §3.4). Dentro de AnnotatedCode
// (§3.10), también las líneas marcadas: ```json filename="tokens.json" marks="2,4,18".
// En un bloque markdown, la palabra `preview` lo convierte en CodePreview (§3.11):
// ```markdown filename="button.md" preview.
// mdast-util-to-hast deja el texto tras el lenguaje en `code.data.meta`, pero no lo convierte
// en atributo; aquí se lee `filename="…"` y se añade como `data-filename` al elemento `code`,
// `marks="…"`, como `data-marks`, y `preview`, como `data-preview` (solo en markdown o md; en otro
// lenguaje lo rechaza check:content).
// Con Turbopack, @next/mdx carga los plugins por ruta (next.config.ts).

const FILENAME = /(?:^|\s)filename="([^"]+)"/;
const MARKS = /(?:^|\s)marks="([^"]+)"/;
export const PREVIEW_LANGUAGES = ['markdown', 'md'];

// `preview` como palabra suelta, fuera de los valores entre comillas (filename="preview.md" no cuenta).
export function hasPreview(meta) {
  return /(?:^|\s)preview(?=\s|$)/.test(meta.replace(/"[^"]*"/g, '""'));
}

export default function rehypeCodeMeta() {
  return (tree) => {
    walk(tree, (node, parent) => {
      if (node.type !== 'element' || node.tagName !== 'code' || parent?.tagName !== 'pre') return;
      const meta = node.data?.meta ?? '';
      const filename = FILENAME.exec(meta)?.[1];
      const marks = MARKS.exec(meta)?.[1];
      const language = [node.properties?.className ?? []].flat().find((c) => String(c).startsWith('language-'))?.slice(9);
      if (filename) node.properties = { ...node.properties, dataFilename: filename };
      if (marks) node.properties = { ...node.properties, dataMarks: marks };
      if (hasPreview(meta) && PREVIEW_LANGUAGES.includes(language)) {
        node.properties = { ...node.properties, dataPreview: '' };
      }
    });
  };
}

function walk(node, visit, parent) {
  visit(node, parent);
  for (const child of node.children ?? []) walk(child, visit, node);
}
