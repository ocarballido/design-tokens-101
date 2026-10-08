import type { MDXComponents } from 'mdx/types';
import { isValidElement, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { Callout } from '@/components/Callout';
import { Code } from '@/components/Code';
import { CodeBlock } from '@/components/CodeBlock';
import { ColorScale } from '@/components/ColorScale';
import { ExportNormalizer } from '@/components/ExportNormalizer';
import { Flow, FlowGroup, FlowStep } from '@/components/Flow';
import { InCode } from '@/components/InCode';
import { Heading2, UnorderedList } from '@/components/Prose';
import { ScaleGenerator } from '@/components/ScaleGenerator';
import { Table, Td, Th } from '@/components/Table';
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

const components: MDXComponents = {
  h2: Heading2,
  h3: (props) => <h3 className="type-heading-3 text-neutral-default" {...props} />,
  h4: (props) => <h4 className="type-heading-4 text-neutral-default" {...props} />,
  p: (props) => <p className="type-body-default text-neutral-default" {...props} />,
  ul: UnorderedList,
  ol: (props) => <ol className="list-decimal ps-400 marker:text-neutral-subtle" {...props} />,
  a: TextLink,
  code: Code,
  pre: Pre,
  // Tabla (§3.6). remark-gfm solo genera th en la fila de cabecera.
  table: (props) => <Table {...props} />,
  th: (props) => <Th {...props} />,
  td: Td,
  Callout,
  InCode,
  Flow,
  FlowGroup,
  FlowStep,
  ColorScale,
  Takeaways,
  // Herramientas (T22, componentes-v1.md §5).
  ScaleGenerator,
  ExportNormalizer,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
