import type { MDXComponents } from 'mdx/types';
import { useTranslations } from 'next-intl';
import { isValidElement, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { ColorScale } from '@/components/ColorScale';
import { Flow, FlowGroup, FlowStep } from '@/components/Flow';
import { InCode } from '@/components/InCode';
import { Heading2, UnorderedList } from '@/components/Prose';
import { Takeaways } from '@/components/Takeaways';
import { TextLink } from '@/components/TextLink';

// Prose (componentes-v1.md §3.1): cómo se ve cada elemento Markdown del MDX.
// La separación vertical entre bloques la pone la utilidad `flow` del contenedor.
// La negrita (body/strong, D17) solo cambia el peso: está en los estilos base (base.css),
// para que herede el tamaño también dentro de tablas y Callouts.

// Bloque de código: ```json filename="tokens.json" llega como <pre><code class="language-json"
// data-filename="tokens.json"> (tools/rehype-code-meta.mjs).
type CodeElement = ReactElement<{ className?: string; 'data-filename'?: string; children?: string }>;

function Pre({ children }: ComponentPropsWithoutRef<'pre'>) {
  if (!isValidElement(children)) return <pre>{children}</pre>;
  const { className = '', 'data-filename': filename, children: code = '' } = (children as CodeElement).props;
  const language = /language-([\w-]+)/.exec(className)?.[1];
  return (
    <CodeBlock language={language} filename={filename}>
      {code}
    </CodeBlock>
  );
}

// Tabla (componentes-v1.md §3.6): contenedor con scroll horizontal propio, que se puede enfocar (1.4.10).
function Table(props: ComponentPropsWithoutRef<'table'>) {
  const t = useTranslations('Table');
  return (
    <div role="region" aria-label={t('label')} tabIndex={0} className="overflow-x-auto focus-ring">
      <table className="w-full border-collapse" {...props} />
    </div>
  );
}

const cell = 'border-b-(length:--t101-border-width-100) border-neutral-default px-300 py-200 text-start align-top text-neutral-default';

const components: MDXComponents = {
  h2: Heading2,
  h3: (props) => <h3 className="type-heading-3 text-neutral-default" {...props} />,
  h4: (props) => <h4 className="type-heading-4 text-neutral-default" {...props} />,
  p: (props) => <p className="type-body-default text-neutral-default" {...props} />,
  ul: UnorderedList,
  ol: (props) => <ol className="list-decimal ps-400 marker:text-neutral-subtle" {...props} />,
  a: TextLink,
  // Code (§3.5): código en línea. Dentro de <pre> lo sustituye CodeBlock.
  // wrap-break-word: un nombre largo se parte si no cabe en la línea (1.4.10), sin cambiar
  // el ancho mínimo de las celdas de tabla.
  code: (props) => (
    <code className="rounded-100 bg-neutral-strong px-050 type-code-default text-neutral-default wrap-break-word" {...props} />
  ),
  pre: Pre,
  table: Table,
  // remark-gfm solo genera th en la fila de cabecera.
  th: (props) => <th scope="col" className={`${cell} bg-neutral-subtle type-label-default`} {...props} />,
  td: (props) => <td className={`${cell} type-body-small`} {...props} />,
  Callout,
  InCode,
  Flow,
  FlowGroup,
  FlowStep,
  ColorScale,
  Takeaways,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
