import { FolderOpen, Upload, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type DragEvent } from 'react';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { FieldError, fieldHint, fieldLabel } from '@/components/TextField';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §5.5 (en Figma, entrega-diseno.md §3.11; slot `files`, D57).
// - Dos botones como vía principal (subir no exige arrastrar, 2.5.7): un input no elige archivos y
//   carpetas a la vez (webkitdirectory, investigacion-herramientas.md §2). Los input quedan ocultos
//   y fuera del orden de tabulación; el control es el botón visible.
// - La zona para soltar es un atajo y no recibe el foco. dragOver no depende solo del color: el
//   borde pasa a border-width/200. Borde continuo (D49).
// - Al añadir o quitar, la región role="status" lo anuncia (4.1.3). Al quitar un archivo, el foco
//   pasa al botón de quitar siguiente (o al anterior si era el último) y, si la lista queda vacía,
//   al primer botón (2.4.3).

/** Un archivo elegido, con su ruta relativa (nombre del .zip, o carpeta/subcarpeta/archivo). */
export type PickedFile = { path: string; file: File };

export type FileUploadItem = { key: string; name: string; detail: string; error?: string };

type FileUploadProps = {
  label: string;
  hint?: string;
  chooseZip: string;
  chooseFolder: string;
  drop: string;
  listLabel: string;
  /** "Quitar {name}" ya resuelto para cada archivo. */
  removeLabel: (name: string) => string;
  files: FileUploadItem[];
  status: string;
  onAdd: (files: PickedFile[]) => void;
  onRemove: (index: number) => void;
  /** id del primer botón, para el enlace del ErrorSummary. */
  firstButtonId?: string;
  removeId: (key: string) => string;
};

// Una carpeta arrastrada se recorre con webkitGetAsEntry y readEntries, que en Chromium devuelve
// como máximo 100 entradas por llamada (MDN): se llama hasta que no quedan.
async function readEntry(entry: FileSystemEntry, out: PickedFile[]) {
  if (entry.isFile) {
    const file = await new Promise<File>((resolve, reject) => (entry as FileSystemFileEntry).file(resolve, reject));
    out.push({ path: entry.fullPath.replace(/^\//, ''), file });
    return;
  }
  const reader = (entry as FileSystemDirectoryEntry).createReader();
  for (;;) {
    const batch = await new Promise<FileSystemEntry[]>((resolve, reject) => reader.readEntries(resolve, reject));
    if (!batch.length) break;
    for (const child of batch) await readEntry(child, out);
  }
}

export function FileItem({ name, detail, error, removeLabel, removeId, onRemove }: Omit<FileUploadItem, 'key'> & {
  removeLabel: string;
  removeId: string;
  onRemove: () => void;
}) {
  const errorId = `${removeId}-error`;
  return (
    <li data-component="FileItem" className="flex items-center gap-200 border-b-(length:--t101-border-width-100) border-neutral-default py-200">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="type-code-default text-neutral-default wrap-break-word">{name}</p>
        <p className="type-caption-default text-neutral-subtle">{detail}</p>
        {error ? <FieldError id={errorId}>{error}</FieldError> : null}
      </div>
      <IconButton id={removeId} icon={X} label={removeLabel} aria-describedby={error ? errorId : undefined} onClick={onRemove} />
    </li>
  );
}

export function FileUpload({
  label,
  hint,
  chooseZip,
  chooseFolder,
  drop,
  listLabel,
  removeLabel,
  files,
  status,
  onAdd,
  onRemove,
  firstButtonId,
  removeId,
}: FileUploadProps) {
  const labelId = useId();
  const zipInput = useRef<HTMLInputElement>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const firstButton = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [focusAfterRemove, setFocusAfterRemove] = useState<number | null>(null);

  useEffect(() => {
    if (focusAfterRemove === null) return;
    const buttons = list.current?.querySelectorAll<HTMLButtonElement>('li button') ?? [];
    if (buttons.length) buttons[Math.min(focusAfterRemove, buttons.length - 1)].focus();
    else firstButton.current?.focus();
    setFocusAfterRemove(null);
  }, [focusAfterRemove, files.length]);

  function pick(input: HTMLInputElement | null, folder: boolean) {
    if (!input?.files) return;
    onAdd([...input.files].map((file) => ({ path: folder ? file.webkitRelativePath || file.name : file.name, file })));
    input.value = '';
  }

  async function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    const entries = [...event.dataTransfer.items].map((item) => item.webkitGetAsEntry()).filter((entry) => entry !== null);
    const picked: PickedFile[] = [];
    if (entries.length) for (const entry of entries) await readEntry(entry, picked);
    else for (const file of event.dataTransfer.files) picked.push({ path: file.name, file });
    if (picked.length) onAdd(picked);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragOver(false);
  }

  return (
    <div data-component="FileUpload" role="group" aria-labelledby={labelId} className="flex flex-col gap-100">
      <p id={labelId} className={fieldLabel}>
        {label}
      </p>
      {hint ? <p className={fieldHint}>{hint}</p> : null}
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cx(
          'mt-100 flex flex-col items-center gap-300 rounded-container p-600 text-center type-body-small text-neutral-subtle',
          dragOver
            ? 'border-(length:--t101-border-width-200) border-accent-strong bg-accent-subtle'
            : 'border-(length:--t101-border-width-100) border-neutral-default bg-neutral-subtle',
        )}
      >
        <Upload aria-hidden className="size-600" />
        <div className="flex flex-wrap justify-center gap-200">
          <Button ref={firstButton} id={firstButtonId} variant="secondary" icon={Upload} onClick={() => zipInput.current?.click()}>
            {chooseZip}
          </Button>
          <Button variant="secondary" icon={FolderOpen} onClick={() => folderInput.current?.click()}>
            {chooseFolder}
          </Button>
        </div>
        <p>{drop}</p>
        <input ref={zipInput} type="file" accept=".zip,application/zip" multiple hidden onChange={() => pick(zipInput.current, false)} />
        <input
          ref={(element) => {
            folderInput.current = element;
            // webkitdirectory no está en los tipos de React: se pone como atributo.
            element?.setAttribute('webkitdirectory', '');
          }}
          type="file"
          hidden
          onChange={() => pick(folderInput.current, true)}
        />
      </div>
      {files.length ? (
        <ul ref={list} aria-label={listLabel} className="mt-200 flex flex-col">
          {files.map((item, index) => (
            <FileItem
              key={item.key}
              name={item.name}
              detail={item.detail}
              error={item.error}
              removeLabel={removeLabel(item.name)}
              removeId={removeId(item.key)}
              onRemove={() => {
                onRemove(index);
                setFocusAfterRemove(index);
              }}
            />
          ))}
        </ul>
      ) : null}
      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  );
}
