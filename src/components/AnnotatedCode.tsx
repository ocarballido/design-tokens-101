import { useTranslations } from 'next-intl';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CodeMarker } from '@/components/CodeMarker';
import { OrderedList } from '@/components/Prose';

// Anatomía: docs/componentes-v1.md §3.10. Un bloque de código con marcas numeradas y su leyenda.
// En el MDX, dentro de <AnnotatedCode>: el bloque con `marks="2,4,18"` (números de línea; la
// primera es la marca 1) y una lista ordenada con una explicación por marca, que empieza por el
// término en negrita: `1. **Grupo.** Organiza tokens.`
// La leyenda sigue siendo una ol; la marca sustituye al número de la lista (list-none). role="list":
// Safari quita la semántica de lista a una lista sin marcas, como en Takeaways (§3.9).

type ElementWithChildren = ReactElement<{ className?: string; children?: ReactNode }>;
type CodeElement = ReactElement<{ className?: string; 'data-filename'?: string; 'data-marks'?: string; children?: string }>;

export function AnnotatedCode({ children }: { children: ReactNode }) {
  const t = useTranslations('CodeBlock');
  let code: CodeElement['props'] | undefined;
  let items: ReactNode[] = [];

  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    const element = child as ElementWithChildren;
    // El bloque de código llega como pre > code (mdx-components.tsx, Pre).
    const inner = element.props.children;
    if (isValidElement(inner) && (inner as CodeElement).props['data-marks'] !== undefined) {
      code = (inner as CodeElement).props;
    } else if (element.type === OrderedList) {
      items = Children.toArray(element.props.children).filter(isValidElement);
    }
  }

  if (!code) throw new Error('AnnotatedCode: falta el bloque de código con marks="…"');
  const marks = (code['data-marks'] ?? '').split(',').map(Number).filter(Boolean);
  const lines = (code.children ?? '').replace(/\n$/, '').split('\n').length;
  if (marks.some((line) => line > lines)) throw new Error(`AnnotatedCode: una marca pasa de la línea ${lines}`);
  if (marks.length === 0 || items.length !== marks.length) {
    throw new Error(`AnnotatedCode: ${marks.length} marcas y ${items.length} explicaciones en la leyenda`);
  }

  const legend = (
    <ol role="list" className="flex list-none flex-col gap-400">
      {items.map((item, index) => {
        const [term, ...description] = Children.toArray((item as ElementWithChildren).props.children);
        if (!isValidElement(term) || term.type !== 'strong') {
          throw new Error(`AnnotatedCode: la explicación ${index + 1} no empieza por el término en negrita`);
        }
        return (
          <li key={index} className="flex flex-col gap-050">
            <span className="flex gap-200">
              {/* Alto de una línea de body/strong, para alinear la marca con la primera línea del término. */}
              <span className="flex h-[1lh] shrink-0 items-center">
                <CodeMarker number={index + 1} label={t('mark')} />
              </span>
              <span className="min-w-0 type-body-strong text-neutral-default">{termText(term as ElementWithChildren)}</span>
            </span>
            <span className="type-body-default text-neutral-default">{trimStart(description)}</span>
          </li>
        );
      })}
    </ol>
  );

  return (
    <CodeBlock
      language={/language-([\w-]+)/.exec(code.className ?? '')?.[1]}
      filename={code['data-filename']}
      marks={marks}
      legend={legend}
    >
      {code.children ?? ''}
    </CodeBlock>
  );
}

// El término va en su propia línea: sin el punto con el que termina en el MDX.
function termText(term: ElementWithChildren): ReactNode {
  const parts = Children.toArray(term.props.children);
  const last = parts.at(-1);
  if (typeof last === 'string') parts[parts.length - 1] = last.replace(/\.\s*$/, '');
  return parts;
}

// La descripción empieza tras el espacio que la separa del término.
function trimStart(parts: ReactNode[]): ReactNode[] {
  if (typeof parts[0] === 'string') return [parts[0].trimStart(), ...parts.slice(1)];
  return parts;
}
