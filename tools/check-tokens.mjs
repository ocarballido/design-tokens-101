// Comprueba los tokens generados por `npm run tokens` (paso 7, docs/paso-7-tokens.md):
//   1. Cada code syntax Web de Figma (var(--t101-…), S6/D03) tiene su variable en tokens.css.
//   2. Cada var(--t101-…) usado en tokens.css y theme.css está definido (sin referencias rotas).
//   3. Los bloques de modo contienen exactamente los tokens de su colección:
//      los dos bloques Dark = Semantic color; el bloque Desktop = Layout.
//   4. Los colores primitivos conservan el hex exportado por Figma (S9, A8).
//   5. Los tokens solo de código tienen los valores de sistema-tokens-v1.md §4.
//   6. Tailwind CSS genera las clases de los tokens y no genera las del tema por defecto (V09).
//      Vigila los espacios de nombres por propiedad, que Tailwind no documenta.
// Uso: npm run tokens && npm run check:tokens

import fs from 'node:fs';
import path from 'node:path';
import { compile } from 'tailwindcss';

const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const tokensCss = read('src/styles/tokens.css');
const themeCss = read('src/styles/theme.css');
const errors = [];

function figmaTokens(file) {
  const out = [];
  (function walk(node) {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      if (value && typeof value === 'object' && '$value' in value) out.push(value);
      else if (value && typeof value === 'object') walk(value);
    }
  })(JSON.parse(read(path.join('tokens/figma', file))));
  return out;
}
const varName = (token) => /var\((--t101-[^)]+)\)/.exec(token.$extensions['com.figma.codeSyntax'].WEB)[1];

// Declaraciones por bloque de tokens.css
const blocks = { root: new Map(), darkAttr: new Map(), darkMedia: new Map(), desktop: new Map() };
let current = null;
for (const line of tokensCss.split('\n')) {
  if (/^:root \{/.test(line)) current = 'root';
  else if (/^\[data-theme="dark"\]/.test(line)) current = 'darkAttr';
  else if (/prefers-color-scheme: dark/.test(line)) current = 'darkMedia';
  else if (/^@media \(width >=/.test(line)) current = 'desktop';
  const decl = /^\s*(--t101-[\w-]+):\s*(.+);$/.exec(line);
  if (decl && current) blocks[current].set(decl[1], decl[2]);
}

// 1. Code syntax de Figma
const figmaFiles = {
  primitives: figmaTokens('primitives/Value.tokens.json'),
  semanticSize: figmaTokens('semantic-size/Value.tokens.json'),
  light: figmaTokens('semantic-color/Light.tokens.json'),
  dark: figmaTokens('semantic-color/Dark.tokens.json'),
  mobile: figmaTokens('layout/Mobile.tokens.json'),
  desktop: figmaTokens('layout/Desktop.tokens.json'),
};
for (const token of Object.values(figmaFiles).flat()) {
  if (!blocks.root.has(varName(token))) errors.push(`Falta ${varName(token)} (code syntax de Figma) en :root`);
}

// 2. Referencias
const defined = new Set([...blocks.root.keys()]);
for (const [file, css] of [['tokens.css', tokensCss], ['theme.css', themeCss]]) {
  for (const [, name] of css.matchAll(/var\((--t101-[\w-]+)\)/g)) {
    if (!defined.has(name)) errors.push(`${file}: var(${name}) no está definido`);
  }
}

// 3. Bloques de modo
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
const darkNames = figmaFiles.dark.map(varName).sort();
const desktopNames = figmaFiles.desktop.map(varName).sort();
for (const block of ['darkAttr', 'darkMedia']) {
  if (!sameSet([...blocks[block].keys()].sort(), darkNames)) errors.push(`El bloque ${block} no coincide con Semantic color`);
}
if (!sameSet([...blocks.desktop.keys()].sort(), desktopNames)) errors.push('El bloque Desktop no coincide con Layout');

// 4. Hex de los primitivos de color
for (const token of figmaFiles.primitives.filter((t) => t.$type === 'color')) {
  const generated = blocks.root.get(varName(token))?.toLowerCase();
  const expected = token.$value.hex.toLowerCase();
  const expand = (hex) => (hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex);
  if (expand(generated ?? '') !== expected) errors.push(`${varName(token)}: ${generated} ≠ ${expected} (Figma)`);
}

// 5. Tokens solo de código
const codeOnly = {
  '--t101-line-height-tight': '1.2', '--t101-line-height-snug': '1.4', '--t101-line-height-normal': '1.5',
  '--t101-space-negative-100': '-0.25rem', '--t101-space-negative-200': '-0.5rem', '--t101-space-negative-300': '-0.75rem',
  '--t101-space-negative-400': '-1rem', '--t101-space-negative-600': '-1.5rem', '--t101-breakpoint-desktop': '64rem',
};
for (const [name, value] of Object.entries(codeOnly)) {
  if (blocks.root.get(name) !== value) errors.push(`${name}: ${blocks.root.get(name)} ≠ ${value} (§4)`);
}

// 6. Tailwind
const compiler = await compile(`${themeCss}\n@tailwind utilities;`, { base: ROOT });
const expected = {
  'bg-neutral-default': 'background-color: var(--t101-color-background-neutral-default)',
  'bg-accent-strong-default': 'background-color: var(--t101-color-background-accent-strong-default)',
  'text-neutral-default': 'color: var(--t101-color-text-neutral-default)',
  'text-on-accent': 'color: var(--t101-color-text-on-accent)',
  'border-neutral-default': 'border-color: var(--t101-color-border-neutral-default)',
  'outline-focus': 'outline-color: var(--t101-color-border-focus)',
  'p-400': 'padding: var(--t101-space-400)',
  'gap-200': 'gap: var(--t101-space-200)',
  'mt-negative-100': 'margin-top: var(--t101-space-negative-100)',
  'rounded-control': 'border-radius: var(--t101-radius-control)',
  'text-body-default': 'font-size: var(--t101-font-size-body-default)',
  'font-600': 'font-weight: var(--t101-font-weight-600)',
  'font-sans': 'font-family: var(--t101-font-family-sans), ui-sans-serif, system-ui, sans-serif',
  'leading-normal': 'line-height: var(--t101-line-height-normal)',
  'max-w-content': 'max-width: var(--t101-size-content-max-width)',
};
const forbidden = ['bg-text-neutral-default', 'text-text-neutral-default', 'bg-red-500', 'p-4', 'text-xl', 'rounded-lg', 'lg:p-400'];
const output = compiler.build([...Object.keys(expected), ...forbidden, 'desktop:p-400']);
const ruleFor = (cls) => {
  const selector = `.${cls.replace(/[:/]/g, (c) => `\\${c}`)}`;
  const start = output.indexOf(`${selector} {`) >= 0 ? output.indexOf(`${selector} {`) : output.indexOf(`${selector}:`);
  return start < 0 ? null : output.slice(start, output.indexOf('}', start) + 1);
};
for (const [cls, declaration] of Object.entries(expected)) {
  const rule = ruleFor(cls);
  if (!rule?.includes(declaration)) errors.push(`Tailwind: .${cls} no genera "${declaration}"`);
}
for (const cls of forbidden) if (ruleFor(cls)) errors.push(`Tailwind: .${cls} no debería existir`);
if (!/@media \(width >= 64rem\)\s*\{\s*\.desktop\\:p-400/.test(output)) errors.push('Tailwind: desktop: no usa (width >= 64rem)');

console.log(
  `tokens.css: ${blocks.root.size} en :root · ${blocks.darkAttr.size} en [data-theme="dark"] · ` +
    `${blocks.darkMedia.size} en prefers-color-scheme · ${blocks.desktop.size} en Desktop`,
);
console.log(`theme.css: ${(themeCss.match(/^\s+--[\w-]+:/gm) ?? []).length} variables de Tailwind`);
if (errors.length) {
  console.error(`\n${errors.length} error(es):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Sin errores.');
