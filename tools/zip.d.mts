// Tipos de tools/zip.mjs para la web (TypeScript). La lógica está en el .mjs.

export type ZipFile = { path: string; text: string };
export function readZip(buffer: ArrayBuffer): Promise<ZipFile[]>;
export function writeZip(files: ZipFile[]): Promise<Blob>;
