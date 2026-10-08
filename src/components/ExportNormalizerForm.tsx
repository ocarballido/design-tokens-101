'use client';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  SCOPE_TYPES,
  TYPE_OPTIONS,
  normalize,
  withScopeTypes,
  type ScopeTypes,
  type SourceFile,
  type Unresolved,
} from '../../tools/figma-to-dtcg.mjs';
import { readZip, writeZip } from '../../tools/zip.mjs';
import { Button } from '@/components/Button';
import { Callout } from '@/components/Callout';
import { Code } from '@/components/Code';
import { CodeBlock } from '@/components/CodeBlock';
import { ErrorSummary } from '@/components/ErrorSummary';
import { FileUpload, type PickedFile } from '@/components/FileUpload';
import { Heading2 } from '@/components/Prose';
import { Table, Td, Th } from '@/components/Table';
import { TextLink } from '@/components/TextLink';
import { TypeDecision } from '@/components/TypeDecision';
import { download } from '@/lib/download';

// Parte interactiva de "Normalizar la exportación". Estructura de componentes-v1.md §5.10 y
// plantillas de entrega-diseno.md §3.12. La conversión es normalize() de tools/figma-to-dtcg.mjs,
// la misma función que usa el script (investigacion-herramientas.md §4 y §6.5); el .zip, tools/zip.mjs.
// Todo pasa en el navegador: los archivos no salen de él.
// - Se aceptan los .zip de Export modes (la colección es el nombre del .zip) y una carpeta con una
//   subcarpeta por colección (la colección es la subcarpeta). Dentro de dtcg.zip, cada carpeta lleva
//   ese nombre tal como lo escribe Figma (T24).
// - Las decisiones de tipo se piden por combinación de $type y scopes, sin opción por defecto
//   (§6.3 y §6.4): la herramienta no adivina.
// - La descarga está siempre activa (D14): si falta algo, aparece el ErrorSummary encima (D52) y
//   recibe el foco. Sin resumen ni enlaces por archivo mientras falte una decisión (D60).

type Collection = { key: string; name: string; collection: string; files: SourceFile[]; error?: string };

const COMMAND = 'node tools/figma-to-dtcg.mjs';
const OPTION_KEYS: Record<string, string> = {
  dimension: 'optionDimension',
  number: 'optionNumber',
  fontWeight: 'optionFontWeight',
  fontFamily: 'optionFontFamily',
  exclude: 'optionExclude',
};
const TYPE_KEYS = { number: 'typeNumber', string: 'typeString', boolean: 'typeBoolean' } as const;
const COUNT_TYPES = ['color', 'dimension', 'fontWeight', 'fontFamily', 'number'] as const;

const basename = (file: string) => file.split('/').pop() ?? file;
const decisionKey = (entry: Unresolved) => `${entry.type}|${entry.key}`;
const decisionId = (entry: Unresolved) => `decision-${decisionKey(entry).replace(/[^\w-]+/g, '-')}`;
const removeId = (key: string) => `remove-${key}`;
const FIRST_BUTTON_ID = 'upload-first';
let nextKey = 0;

export function ExportNormalizerForm({ source }: { source: string }) {
  const t = useTranslations('ToolNormalize');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [summaryCount, setSummaryCount] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (summaryCount) summaryRef.current?.focus();
  }, [summaryCount]);

  // Lee lo que llega (.zip o carpeta) y lo agrupa por colección.
  async function read(picked: PickedFile[]): Promise<Omit<Collection, 'key'>[]> {
    const out: Omit<Collection, 'key'>[] = [];
    const folders = new Map<string, SourceFile[]>();
    for (const { path, file } of picked) {
      if (path.includes('/')) {
        // Carpeta: cada .tokens.json va a la colección de su subcarpeta.
        if (!path.endsWith('.tokens.json')) continue;
        const parts = path.split('/');
        const collection = parts[parts.length - 2];
        folders.set(collection, [...(folders.get(collection) ?? []), { path: `${collection}/${basename(path)}`, text: await file.text() }]);
        continue;
      }
      const collection = path.replace(/\.zip$/i, '');
      try {
        const entries = (await readZip(await file.arrayBuffer())).filter((entry) => entry.path.endsWith('.tokens.json'));
        const files = entries.map((entry) => ({ path: `${collection}/${basename(entry.path)}`, text: entry.text }));
        out.push({ name: path, collection, files, error: files.length ? undefined : t('errorNoTokens') });
      } catch {
        out.push({ name: path, collection, files: [], error: t('errorNotZip') });
      }
    }
    for (const [collection, files] of [...folders].sort(([a], [b]) => a.localeCompare(b))) out.push({ name: collection, collection, files });
    // Un JSON que no se puede leer se dice en su archivo, no al normalizar.
    for (const item of out) {
      const broken = item.error ? undefined : item.files.find((file) => {
        try {
          JSON.parse(file.text);
          return false;
        } catch {
          return true;
        }
      });
      if (broken) item.error = t('errorJson', { file: basename(broken.path) });
    }
    return out;
  }

  async function add(picked: PickedFile[]) {
    const items = await read(picked);
    if (!items.length) return;
    setCollections((current) => {
      const next = [...current];
      for (const item of items) {
        const duplicate = next.some((other) => !other.error && other.collection === item.collection);
        next.push({ ...item, key: String(nextKey++), error: item.error ?? (duplicate ? t('errorDuplicate', { collection: item.collection }) : undefined) });
      }
      return next;
    });
    setStatus(t('added', { count: items.length }));
  }

  function remove(index: number) {
    setStatus(t('removed', { name: collections[index].name }));
    setCollections((current) => current.filter((_, i) => i !== index));
  }

  const files = useMemo(() => collections.filter((item) => !item.error).flatMap((item) => item.files), [collections]);
  const base = useMemo(() => normalize(files), [files]);
  const map = useMemo<ScopeTypes>(() => {
    const next = structuredClone(SCOPE_TYPES);
    for (const entry of base.unresolved) {
      const choice = choices[decisionKey(entry)];
      if (choice) next[entry.type][entry.key] = choice;
    }
    return next;
  }, [base, choices]);
  const result = useMemo(() => normalize(files, { map }), [files, map]);
  const pending = base.unresolved.filter((entry) => !choices[decisionKey(entry)]);
  const ready = files.length > 0 && pending.length === 0;

  // Un enlace por archivo (investigacion-herramientas.md §3, opción A).
  const links = useMemo(
    () => (ready ? result.files.map((file) => ({ path: file.path, url: URL.createObjectURL(new Blob([file.text], { type: 'application/json' })) })) : []),
    [ready, result],
  );
  useEffect(() => () => links.forEach((link) => URL.revokeObjectURL(link.url)), [links]);

  const script = useMemo(() => withScopeTypes(source, map), [source, map]);
  const scopeTypesBlock = /\/\/ <scope-types>[\s\S]*?\/\/ <\/scope-types>/.exec(script)?.[0] ?? '';

  const legend = (entry: Unresolved, key: 'decisionLegend' | 'errorDecision') =>
    t(key, { count: entry.ids.length, type: t(TYPE_KEYS[entry.type]), scopes: entry.scopes.length ? entry.scopes.join(', ') : 'none' });

  const errors = [
    files.length === 0 && !collections.some((item) => item.error) ? { message: t('errorNoFiles'), href: `#${FIRST_BUTTON_ID}` } : null,
    ...collections.filter((item) => item.error).map((item) => ({ message: t('errorFile', { name: item.name }), href: `#${removeId(item.key)}` })),
    ...pending.map((entry) => ({ message: legend(entry, 'errorDecision'), href: `#${decisionId(entry)}` })),
  ].filter((error) => error !== null);

  async function onDownload() {
    setSubmitted(true);
    if (errors.length) {
      setSummaryCount((count) => count + 1);
      return;
    }
    setSummaryCount(0);
    download(await writeZip(result.files), 'dtcg.zip');
  }

  let refCode = 0;

  return (
    <div data-component="ExportNormalizer" className="flex flex-col gap-600">
      <section className="flex flex-col gap-400">
        <Heading2>{t('upload')}</Heading2>
        <FileUpload
          label={t('uploadLabel')}
          hint={t('uploadHint')}
          chooseZip={t('chooseZip')}
          chooseFolder={t('chooseFolder')}
          drop={t('drop')}
          listLabel={t('filesLabel')}
          removeLabel={(name) => t('remove', { name })}
          files={collections.map((item) => ({
            key: item.key,
            name: item.name,
            detail: t('fileDetail', { collection: item.collection, count: item.files.length }),
            error: item.error,
          }))}
          status={status}
          onAdd={add}
          onRemove={remove}
          firstButtonId={FIRST_BUTTON_ID}
          removeId={removeId}
        />
      </section>

      {base.unresolved.length ? (
        <section className="flex flex-col gap-400">
          <Heading2>{t('decisions')}</Heading2>
          <p className="type-body-default text-neutral-default">{t('decisionsIntro')}</p>
          {base.unresolved.map((entry) => (
            <TypeDecision
              key={decisionKey(entry)}
              id={decisionId(entry)}
              legend={legend(entry, 'decisionLegend')}
              examplesLabel={t('decisionExamples')}
              tokens={entry.ids.map((id) => id.replace(/\./g, '/'))}
              summary={t('decisionAll', { count: entry.ids.length })}
              label={t('decisionLabel')}
              placeholder={t('decisionPlaceholder')}
              options={TYPE_OPTIONS[entry.type].map((value) => ({ value, label: t(OPTION_KEYS[value]) }))}
              value={choices[decisionKey(entry)] ?? ''}
              onChange={(value) => setChoices((current) => ({ ...current, [decisionKey(entry)]: value }))}
              error={submitted && !choices[decisionKey(entry)] ? t('decisionError') : undefined}
            />
          ))}
        </section>
      ) : null}

      {ready && result.missingRefs.length ? (
        <section className="flex flex-col gap-400">
          <Heading2>{t('warnings')}</Heading2>
          <Callout variant="warning">
            <p className="type-body-default">{t('missingRefs')}</p>
            <ul className="flex list-disc flex-col gap-100 ps-400 type-body-default marker:text-neutral-subtle">
              {result.missingRefs.map((ref) => (
                <li key={ref.file + ref.id}>
                  {t.rich('missingRef', {
                    file: basename(ref.file),
                    code: () => <Code key={refCode}>{[ref.id.replace(/\./g, '/'), ref.ref][refCode++ % 2]}</Code>,
                  })}
                </li>
              ))}
            </ul>
          </Callout>
        </section>
      ) : null}

      <section className="flex flex-col gap-400">
        <Heading2>{t('result')}</Heading2>
        {ready ? (
          <Table label={t('summaryCaption')}>
            <caption className="sr-only">{t('summaryCaption')}</caption>
            <tbody>
              <tr>
                <Th scope="row">{t('summaryFiles')}</Th>
                <Td>{result.count.files}</Td>
              </tr>
              <tr>
                <Th scope="row">{t('summaryAliases')}</Th>
                <Td>{result.count.alias}</Td>
              </tr>
              {COUNT_TYPES.filter((type) => result.count[type]).map((type) => (
                <tr key={type}>
                  <Th scope="row">{t('summaryType', { type })}</Th>
                  <Td>{result.count[type]}</Td>
                </tr>
              ))}
              {result.count.alpha ? (
                <tr>
                  <Th scope="row">{t('summaryOpacity')}</Th>
                  <Td>{result.count.alpha}</Td>
                </tr>
              ) : null}
              {result.count.excluded ? (
                <tr>
                  <Th scope="row">{t('summaryExcluded')}</Th>
                  <Td>{result.count.excluded}</Td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        ) : null}
        {summaryCount && errors.length ? <ErrorSummary ref={summaryRef} title={t('errorTitle')} errors={errors} /> : null}
        <div>
          <Button icon={Download} onClick={onDownload}>
            {t('download')}
          </Button>
        </div>
        {links.length ? (
          <div className="flex flex-col gap-100">
            <p className="type-label-default text-neutral-default">{t('filesList')}</p>
            <ul className="flex flex-col gap-100 type-body-default">
              {links.map((link) => (
                <li key={link.path}>
                  <TextLink href={link.url} download={link.path.replace('/', '-')}>
                    {link.path}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-400">
        <Heading2>{t('repository')}</Heading2>
        <p className="type-body-default text-neutral-default">{t('repositoryIntro')}</p>
        <div>
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => download(new Blob([script], { type: 'text/javascript' }), 'figma-to-dtcg.mjs')}
          >
            {t('downloadScript')}
          </Button>
        </div>
        <CodeBlock language="js" filename={t('scopeTypesFile')}>
          {scopeTypesBlock}
        </CodeBlock>
        <CodeBlock language="sh" filename={t('commandFile')}>
          {COMMAND}
        </CodeBlock>
      </section>
    </div>
  );
}
