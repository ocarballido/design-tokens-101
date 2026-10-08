// tools/zip.mjs: el .zip que escribe la herramienta se puede volver a leer.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readZip, writeZip } from '../tools/zip.mjs';

test('escribir y leer: mismas rutas y mismo contenido (con tildes)', async () => {
  const files = [
    { path: 'Primitives/Value.tokens.json', text: '{"color":{}}\n' },
    { path: 'Semantic color/Light.tokens.json', text: '{"descripción":"áéíóú ñ"}\n'.repeat(50) },
  ];
  const blob = await writeZip(files);
  assert.equal(blob.type, 'application/zip');
  assert.deepEqual(await readZip(await blob.arrayBuffer()), files);
});

test('un archivo que no es .zip da un error claro', async () => {
  await assert.rejects(readZip(new TextEncoder().encode('hola').buffer), /No es un archivo \.zip/);
});
