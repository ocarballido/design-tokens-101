// Comprueba docs/components/*.md y su relación con docs/inventory.md (fase 4 de la guía de ds4agents,
// paso 9; script de https://ds4agents.com/documentation/validate-docs, adaptado):
//   1. Cada componente `stable` tiene `figma`, `code` y `tokens`; cada `deprecated`, `replaced_by`.
//   2. La ruta de `code` existe en el repositorio.
//   3. Cada documento está en la primera tabla de inventory.md.
//   4. Cada componente con Doc "Sí" en el inventario tiene documento. Cuenta también los de
//      `variants` (CodePreview está en code-block.md, porque en código es CodeBlock con preview).
// Diferencia con el de la guía: el frontmatter de designtokens101 tiene listas en varias líneas
// (`tokens`, `variants`), así que se leen las claves de primer nivel con sus líneas sangradas.
// Sin dependencias. Uso: npm run docs:check

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'docs/components';
const REQUIRED = { stable: ['figma', 'code', 'tokens'], deprecated: ['replaced_by'] };
const errors = [];

// Clave de primer nivel: su valor en la misma línea o, si está vacío, las líneas sangradas que siguen.
function frontmatter(text) {
  const block = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!block) return null;
  const data = {};
  let key;
  for (const line of block[1].split('\n')) {
    const top = /^([\w-]+):\s*(.*)$/.exec(line);
    if (top) {
      key = top[1];
      data[key] = top[2].trim() || [];
    } else if (key && Array.isArray(data[key]) && line.trim()) {
      data[key].push(line);
    }
  }
  return data;
}

// La primera tabla de inventory.md: nombre del componente y columna Doc (Sí o No).
const table = fs.readFileSync('docs/inventory.md', 'utf8').split('\n\n').find((b) => b.startsWith('| Componente'));
const [header, , ...rows] = table.trim().split('\n').map((line) => line.split('|').slice(1, -1).map((c) => c.trim()));
const inventory = new Map(rows.map((row) => [row[0], row[header.indexOf('Doc')]]));
const documented = new Set();

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const data = frontmatter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  if (!data) {
    errors.push(`${file}: sin frontmatter`);
    continue;
  }
  for (const key of REQUIRED[data.status] ?? []) {
    if (!data[key] || data[key].length === 0) errors.push(`${file}: status ${data.status} sin "${key}"`);
  }
  if (typeof data.code === 'string' && !fs.existsSync(data.code)) errors.push(`${file}: no existe ${data.code}`);
  if (!inventory.has(data.name)) errors.push(`${file}: ${data.name} no está en inventory.md`);
  documented.add(data.name);
  for (const line of Array.isArray(data.variants) ? data.variants : []) {
    const variant = /^\s*-\s*name:\s*(.+)$/.exec(line)?.[1].trim();
    if (!variant) continue;
    if (!inventory.has(variant)) errors.push(`${file}: la variante ${variant} no está en inventory.md`);
    documented.add(variant);
  }
}

for (const [name, doc] of inventory) {
  if (doc === 'Sí' && !documented.has(name)) errors.push(`inventory.md: ${name} tiene Doc "Sí" y no tiene documento`);
}

console.log(errors.length ? errors.join('\n') : 'Documentación sin errores');
process.exitCode = errors.length ? 1 : 0;
