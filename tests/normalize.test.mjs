// tools/figma-to-dtcg.mjs: la función pura que usan el script y la herramienta "Normalizar la exportación".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { normalize, summary, SCOPE_TYPES, withScopeTypes, problems } from '../tools/figma-to-dtcg.mjs';
import { readZip } from '../tools/zip.mjs';

const root = new URL('..', import.meta.url).pathname;

function readTree(dir) {
  const files = [];
  for (const collection of fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
    for (const name of fs.readdirSync(path.join(dir, collection.name)).filter((n) => n.endsWith('.tokens.json'))) {
      files.push({ path: `${collection.name}/${name}`, text: fs.readFileSync(path.join(dir, collection.name, name), 'utf8') });
    }
  }
  return files;
}

const token = (type, value, scopes, extra = {}) => ({
  $type: type,
  $value: value,
  $extensions: { ...(scopes ? { 'com.figma.scopes': scopes } : {}), ...extra },
});
const file = (tree) => [{ path: 'Prueba/A.tokens.json', text: JSON.stringify({ ...tree, $extensions: { 'com.figma.modeName': 'A' } }) }];

test('DesignToken101: la salida es igual, byte a byte, a tokens/dtcg/', () => {
  const result = normalize(readTree(path.join(root, 'tokens/figma')));
  assert.deepEqual(result.unresolved, []);
  assert.deepEqual(result.missingRefs, []);
  for (const f of result.files) assert.equal(f.text, fs.readFileSync(path.join(root, 'tokens/dtcg', f.path), 'utf8'), f.path);
  assert.equal(summary(result.count), 'tokens/dtcg: 6 archivos · 82 alias · 56 dimension · 4 fontWeight · 2 fontFamily · 123 color · 2 alpha float32');
});

test('exportación real de Figma (.zip sin comprimir): pide todo lo que no tiene tipo decidido', async () => {
  const buffer = fs.readFileSync(new URL('./fixtures/figma-export-prueba.zip', import.meta.url));
  const files = (await readZip(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))).map((f) => ({ ...f, path: `Prueba/${f.path}` }));
  assert.deepEqual(files.map((f) => f.path).sort(), ['Prueba/A.tokens.json', 'Prueba/B.tokens.json']);
  const { unresolved } = normalize(files);
  const keys = unresolved.map((u) => `${u.type}|${u.key}`).sort();
  assert.ok(keys.includes('number|LINE_HEIGHT'));
  assert.ok(keys.includes('number|FONT_STYLE+GAP')); // conflicto: lo decide el usuario
  assert.ok(keys.includes('number|(sin scopes)'));
  assert.ok(keys.includes('number|ALL_SCOPES'));
  assert.ok(keys.includes('boolean|ALL_SCOPES'));
  assert.ok(keys.includes('string|FONT_STYLE'));
  assert.ok(!keys.some((k) => k.startsWith('color|')));
});

test('con las decisiones del usuario, todo se resuelve; los alias de la misma colección se conservan', async () => {
  const buffer = fs.readFileSync(new URL('./fixtures/figma-export-prueba.zip', import.meta.url));
  const files = (await readZip(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))).map((f) => ({ ...f, path: `Prueba/${f.path}` }));
  const first = normalize(files);
  const map = structuredClone(SCOPE_TYPES);
  for (const u of first.unresolved) map[u.type][u.key] = u.type === 'string' ? 'exclude' : u.type === 'boolean' ? 'number' : 'number';
  const result = normalize(files, { map });
  assert.deepEqual(result.unresolved, []);
  assert.deepEqual(result.missingRefs, []);
  const a = JSON.parse(result.files.find((f) => f.path.endsWith('A.tokens.json')).text);
  assert.deepEqual(a.alias['number-to-gap'].$value, '{number.gap}');
  assert.equal(a.alias['number-to-gap'].$type, 'dimension');
  assert.deepEqual(a.number.gap.$value, { value: 8, unit: 'px' });
  assert.equal(a.boolean.visible.$type, 'number');
  assert.deepEqual(Object.keys(a.string), ['font-family']); // fontFamily; los demás, excluidos
});

test('opacidad en float32: el decimal escrito en Figma', () => {
  const { files } = normalize(file({ c: token('color', { colorSpace: 'srgb', components: [1, 1, 1], alpha: Math.fround(0.9), hex: '#FFFFFF' }) }));
  assert.equal(JSON.parse(files[0].text).c.$value.alpha, 0.9);
});

test('referencias sin destino', () => {
  const { missingRefs } = normalize(file({ a: token('color', '{color.nope}') }));
  assert.deepEqual(missingRefs, [{ id: 'a', ref: '{color.nope}', file: 'Prueba/A.tokens.json' }]);
  assert.match(problems({ unresolved: [], missingRefs }), /Referencias sin destino/);
});

test('un token excluido no sale y lo que apunta a él queda sin destino', () => {
  const map = { ...SCOPE_TYPES, number: { ...SCOPE_TYPES.number, OPACITY: 'exclude' } };
  const result = normalize(file({ o: token('number', 50, ['OPACITY']), r: token('number', '{o}', ['GAP']) }), { map });
  assert.equal(JSON.parse(result.files[0].text).o, undefined);
  assert.equal(result.count.excluded, 1);
  assert.deepEqual(result.missingRefs.map((m) => m.id), ['r']);
});

test('el script descargable con las decisiones del usuario resuelve lo mismo', async () => {
  const source = fs.readFileSync(path.join(root, 'tools/figma-to-dtcg.mjs'), 'utf8');
  const map = { ...SCOPE_TYPES, number: { ...SCOPE_TYPES.number, LINE_HEIGHT: 'number', 'FONT_STYLE+GAP': 'dimension' } };
  const written = withScopeTypes(source, map);
  assert.notEqual(written, source);
  assert.match(written, /LINE_HEIGHT: 'number'/);
  assert.match(written, /'FONT_STYLE\+GAP': 'dimension'/);
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'dt101-')), 'figma-to-dtcg.mjs');
  fs.writeFileSync(tmp, written);
  const mod = await import(pathToFileURL(tmp).href);
  assert.deepEqual(mod.SCOPE_TYPES, map);
});

test('una variable en varios modos cuenta una vez en las decisiones', () => {
  const file = (mode) => ({
    path: `Prueba/${mode}.tokens.json`,
    text: JSON.stringify({ alto: { $type: 'number', $value: 1.5, $extensions: { 'com.figma.scopes': ['LINE_HEIGHT'] } } }),
  });
  const result = normalize([file('A'), file('B')], { map: { number: {}, string: {}, boolean: {} } });
  assert.equal(result.unresolved.length, 1);
  assert.deepEqual(result.unresolved[0].ids, ['alto']);
});
