import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime';
import { useTranslations } from 'next-intl';
import { isValidElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { isScalar, isMap, parseDocument } from 'yaml';
import { Code } from '@/components/Code';
import { OrderedList, UnorderedList } from '@/components/Prose';
import { Table, Td, Th } from '@/components/Table';
import { TextLink } from '@/components/TextLink';

// Vista previa de CodePreview (componentes-v1.md §3.11): convierte el markdown de un bloque marcado
// con `preview` en elementos React. Solo se llama desde Pre (mdx-components.tsx), que es un componente
// de servidor: el markdown se renderiza en el build y el cliente no carga unified ni remark.
// - El HTML del markdown no pasa (remark-rehype sin allowDangerousHtml): solo la sintaxis Markdown.
// - El frontmatter YAML va encima, como tabla clave/valor (la clave, TableCell header=true).
// - Sin ids: la vista previa no añade anclas ni destinos a la página.

const processor = unified().use(remarkParse).use(remarkFrontmatter).use(remarkGfm).use(remarkRehype);

export function renderMarkdownPreview(markdown: string): ReactNode {
  const mdast = processor.parse(markdown);
  // remark-frontmatter deja el YAML en un nodo `yaml`, que remark-rehype descarta.
  const yaml = mdast.children.find((node) => node.type === 'yaml');
  const hast = processor.runSync(mdast);
  removeIds(hast);
  return (
    <>
      {yaml && 'value' in yaml && <Frontmatter source={yaml.value} />}
      {toJsxRuntime(hast, { Fragment, jsx, jsxs, components })}
    </>
  );
}

// Los # y ## del documento de ejemplo no son encabezados de la página: con h3/h4 o role="heading"
// entrarían en la lista de encabezados del lector de pantalla, mezclados con los de la lección y con
// un nivel que no le corresponde. Van como párrafos con el estilo de heading/3 y heading/4: el lector
// los lee como texto dentro del panel "Vista previa", que es lo que son, un ejemplo.
const heading3 = ({ children }: ComponentPropsWithoutRef<'h1'>) => (
  <p className="type-heading-3 text-neutral-default">{children}</p>
);
const heading4 = ({ children }: ComponentPropsWithoutRef<'h2'>) => (
  <p className="type-heading-4 text-neutral-default">{children}</p>
);

// Un enlace relativo, a un ancla o a un .md lleva a un archivo del repositorio del ejemplo, que no
// existe en la web: se queda en texto. Solo los absolutos https son enlaces (TextLink).
function PreviewLink({ href = '', children }: ComponentPropsWithoutRef<'a'>) {
  const absolute = /^https:\/\//.test(href) && !/\.md(?:[#?]|$)/.test(href);
  return absolute ? <TextLink href={href}>{children}</TextLink> : <>{children}</>;
}

// Un bloque de código dentro de la vista previa es un <pre> simple con las clases de código, no otro
// CodeBlock. Se parte al final de la línea para que no haga falta un scroll dentro del panel.
function PreviewPre({ children }: ComponentPropsWithoutRef<'pre'>) {
  const code = isValidElement(children) ? (children as ReactElement<{ children?: ReactNode }>).props.children : children;
  return (
    <pre className="type-code-default text-neutral-default whitespace-pre-wrap wrap-break-word">
      <code>{code}</code>
    </pre>
  );
}

const components: Partial<Components> = {
  h1: heading3,
  h2: heading4,
  h3: heading4,
  h4: heading4,
  h5: heading4,
  h6: heading4,
  p: (props) => <p className="type-body-default text-neutral-default" {...props} />,
  ul: UnorderedList,
  ol: OrderedList,
  a: PreviewLink,
  code: Code,
  pre: PreviewPre,
  table: (props) => <Table {...props} />,
  th: (props) => <Th {...props} />,
  td: Td,
};

// Clave y valor de cada entrada; el valor que no es un escalar (una lista, un mapa) se muestra como
// está escrito: `[Label, Input, HelperText]`. Un YAML que no es un mapa se muestra tal cual.
function Frontmatter({ source }: { source: string }) {
  const t = useTranslations('CodeBlock');
  const doc = parseDocument(source);
  if (doc.errors.length || !isMap(doc.contents)) {
    return <PreviewPre>{source}</PreviewPre>;
  }
  return (
    <Table label={t('frontmatter')}>
      <tbody>
        {doc.contents.items.map((pair, index) => {
          const { value } = pair;
          const text = isScalar(value)
            ? String(value.value ?? '')
            : value && typeof value === 'object' && 'range' in value && value.range
              ? source.slice(value.range[0], value.range[1])
              : '';
          return (
            <tr key={index}>
              {/* La columna de la clave se ajusta a su contenido (w-0 + whitespace-nowrap). */}
              {/* Centradas en vertical, como en Figma (la clave junto a un valor de dos líneas). Con `!`:
                  las celdas de Table llevan align-top y cx no quita la clase contraria. */}
              <Th scope="row" header className="w-0 whitespace-nowrap align-middle!">
                {String(isScalar(pair.key) ? pair.key.value : pair.key)}
              </Th>
              <Td className="whitespace-pre-wrap align-middle!">{text}</Td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

type HastNode = { properties?: Record<string, unknown>; children?: unknown[] };

function removeIds(node: HastNode) {
  if (node.properties) delete node.properties.id;
  for (const child of node.children ?? []) removeIds(child as HastNode);
}
