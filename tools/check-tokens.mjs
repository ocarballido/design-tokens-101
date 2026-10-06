// Comprueba los tokens generados por `npm run tokens` (paso 7, docs/paso-7-tokens.md):
//   1. Cada code syntax Web de Figma (var(--t101-…), S6/D03) tiene su variable en tokens.css y es
//      la ruta de la variable con guiones (V33): detecta un code syntax viejo o copiado de otra.
//   2. Cada var(--t101-…) usado en tokens.css y theme.css está definido (sin referencias rotas).
//   3. Los bloques de modo contienen exactamente los tokens de su colección:
//      los dos bloques Dark = Semantic color; el bloque Desktop = Layout.
//   4. Los colores primitivos conservan el hex exportado por Figma (S9, A8).
//   5. Los tokens solo de código tienen los valores de sistema-tokens-v1.md §4, y los que salieron
//      de código a Figma (sidebar, overlay, translucent) conservan su valor (§4.6, §6.1).
//   6. Los estilos de texto de src/styles/text-styles.css coinciden con la tabla §8 (V15).
//   7. Tailwind CSS genera las clases de los tokens y no genera las del tema por defecto (V09).
//      Vigila los espacios de nombres por propiedad, que Tailwind no documenta.
//   8. En src/ no hay valores arbitrarios entre corchetes fuera de la lista de excepciones, y la
//      sintaxis de variable entre paréntesis apunta a tokens --t101-* (T17, V43).
// Uso: npm run tokens && npm run check:tokens

import fs from 'node:fs';
import path from 'node:path';
import { compile } from 'tailwindcss';

const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const tokensCss = read('src/styles/tokens.css');
const themeCss = read('src/styles/theme.css');
const errors = [];

// Ruta de cada variable en la exportación (color/text/accent/default), para comprobar su code syntax.
const tokenPath = new WeakMap();

function figmaTokens(file) {
  const out = [];
  (function walk(node, parents) {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      if (value && typeof value === 'object' && '$value' in value) {
        tokenPath.set(value, [...parents, key]);
        out.push(value);
      } else if (value && typeof value === 'object') walk(value, [...parents, key]);
    }
  })(JSON.parse(read(path.join('tokens/figma', file))), []);
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
  const route = tokenPath.get(token);
  const expected = `var(--t101-${route.join('-')})`;
  const syntax = token.$extensions['com.figma.codeSyntax'].WEB;
  if (syntax !== expected) errors.push(`${route.join('/')}: code syntax ${syntax} ≠ ${expected} (ruta de la variable)`);
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
  '--t101-duration-200': '200ms', '--t101-easing-standard': 'cubic-bezier(0.2, 0, 0, 1)',
  '--t101-blur-300': '0.75rem',
};
for (const [name, value] of Object.entries(codeOnly)) {
  if (blocks.root.get(name) !== value) errors.push(`${name}: ${blocks.root.get(name)} ≠ ${value} (§4)`);
}

// 5b. Tokens que vivían solo en código y ahora salen de Figma (V16, V25, V28; creados el 2026-10-04).
//     Tienen que venir en la exportación y dar el CSS de la especificación (§6.1). translucent pasó
//     al 96 % en Light con S35 (antes #ffffffe6); Dark sigue al 90 %.
const fromFigma = [
  ['semanticSize', 'size/sidebar/width', { root: '19rem' }],
  ['light', 'color/background/overlay', { root: '#00000080', darkAttr: '#00000080', darkMedia: '#00000080' }],
  ['light', 'color/background/neutral/translucent', { root: '#fffffff5', darkAttr: '#050c09e6', darkMedia: '#050c09e6' }],
];
for (const [file, name, expected] of fromFigma) {
  const css = `--t101-${name.replace(/\//g, '-')}`;
  if (!figmaFiles[file].some((token) => varName(token) === css)) errors.push(`${name} no está en la exportación de Figma`);
  if (name.startsWith('color/') && !figmaFiles.dark.some((token) => varName(token) === css)) errors.push(`${name} no está en Dark`);
  for (const [block, value] of Object.entries(expected)) {
    if (blocks[block].get(css) !== value) errors.push(`${block}: ${css}: ${blocks[block].get(css)} ≠ ${value} (§4.6, §6.1)`);
  }
}

// 6. Estilos de texto (V15): src/styles/text-styles.css frente a la tabla §8 de la especificación.
const textStylesCss = read('src/styles/text-styles.css');
const spec = read('docs/sistema-tokens-v1.md');
const section8 = spec.slice(spec.indexOf('## 8. Estilos de texto'));
const styleRows = [...section8.matchAll(/^\| ([a-z]+\/[a-z0-9]+) \| `font-family\/(\w+)` \| `(font-size\/[\w/-]+)` [^|]*\| `(line-height\/\w+)` [^|]*\| `(font-weight\/\d+)` \|/gm)];
if (styleRows.length !== 10) errors.push(`§8: se esperaban 10 estilos de texto y se leyeron ${styleRows.length}`);
const cssVar = (path) => `var(--t101-${path.replace(/\//g, '-')})`;
for (const [, style, family, size, lineHeight, weight] of styleRows) {
  const block = new RegExp(`@utility type-${style.replace('/', '-')} \\{([^}]*)\\}`).exec(textStylesCss)?.[1];
  if (!block) {
    errors.push(`text-styles.css: falta type-${style.replace('/', '-')} (§8)`);
    continue;
  }
  const want = {
    'font-family': `var(--font-${family})`,
    'font-size': cssVar(size),
    'line-height': cssVar(lineHeight),
    'font-weight': cssVar(weight),
  };
  for (const [prop, value] of Object.entries(want)) {
    if (!block.includes(`${prop}: ${value};`)) errors.push(`type-${style.replace('/', '-')}: ${prop} debería ser ${value} (§8)`);
  }
}
for (const [, name] of textStylesCss.matchAll(/var\((--t101-[\w-]+)\)/g)) {
  if (!defined.has(name)) errors.push(`text-styles.css: var(${name}) no está definido`);
}

// 7. Tailwind
const compiler = await compile(`${themeCss}\n${textStylesCss}\n@tailwind utilities;`, { base: ROOT });
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
  'font-sans': 'font-family: var(--font-inter, var(--t101-font-family-sans)), ui-sans-serif, system-ui, sans-serif',
  'font-mono': 'font-family: var(--font-jetbrains-mono, var(--t101-font-family-mono)), ui-monospace, monospace',
  'leading-normal': 'line-height: var(--t101-line-height-normal)',
  'max-w-content': 'max-width: var(--t101-size-content-max-width)',
  'w-sidebar': 'width: var(--t101-size-sidebar-width)',
  'ease-standard': 'transition-timing-function: var(--t101-easing-standard)',
  'bg-overlay': 'background-color: var(--t101-color-background-overlay)',
  'bg-neutral-translucent': 'background-color: var(--t101-color-background-neutral-translucent)',
  'backdrop-blur-300': '--tw-backdrop-blur: blur(var(--t101-blur-300))',
  // V14: el grosor de borde se escribe con la sintaxis de variable de Tailwind (no hay espacio de nombres).
  'border-(length:--t101-border-width-100)': 'border-width: var(--t101-border-width-100)',
  'type-heading-1': 'font-size: var(--t101-font-size-heading-1)',
};
const forbidden = ['bg-text-neutral-default', 'text-text-neutral-default', 'bg-red-500', 'p-4', 'text-xl', 'rounded-lg', 'lg:p-400', 'backdrop-blur-md'];
const output = compiler.build([...Object.keys(expected), ...forbidden, 'desktop:p-400']);
const ruleFor = (cls) => {
  const selector = `.${cls.replace(/[:/()]/g, (c) => `\\${c}`)}`;
  const start = output.indexOf(`${selector} {`) >= 0 ? output.indexOf(`${selector} {`) : output.indexOf(`${selector}:`);
  return start < 0 ? null : output.slice(start, output.indexOf('}', start) + 1);
};
for (const [cls, declaration] of Object.entries(expected)) {
  const rule = ruleFor(cls);
  if (!rule?.includes(declaration)) errors.push(`Tailwind: .${cls} no genera "${declaration}"`);
}
for (const cls of forbidden) if (ruleFor(cls)) errors.push(`Tailwind: .${cls} no debería existir`);
if (!/@media \(width >= 64rem\)\s*\{\s*\.desktop\\:p-400/.test(output)) errors.push('Tailwind: desktop: no usa (width >= 64rem)');

// 8. Valores arbitrarios en src/ (T17, V43). `--*: initial` impide las clases que no salen de los
//    tokens, pero no los valores entre corchetes (p-[13px], bg-[#316ff6]), que generan su CSS con el
//    valor escrito a mano. Cada excepción lleva su motivo (tabla "Los corchetes" de
//    content/es/09-components/05-variants-to-classes.mdx). Las variantes entre corchetes
//    ([@media(…)]:, data-[…]:) son condiciones, no valores: no se marcan.
const ARBITRARY_ALLOWED = {
  'h-[1lh]': 'alto de una línea de texto: marca de Takeaways alineada con la primera línea',
  'grid-rows-[0fr]': 'plegado animado (InCode, Sidebar): cerrado',
  'grid-rows-[1fr]': 'plegado animado (InCode, Sidebar): abierto',
  'transition-[grid-template-rows,visibility]': 'propiedades que se animan; duración y curva son tokens (V24)',
  'max-h-[calc(100dvh-var(--site-header-height))]': 'sidebar sticky: alto de la pantalla menos la cabecera medida (V28)',
};
//    La sintaxis de variable entre paréntesis (border-(length:--x), duration-(--x)) tiene que apuntar
//    a un token --t101-* definido en tokens.css, salvo estas excepciones.
const VARIABLE_ALLOWED = {
  'top-(--site-header-height)': 'sidebar sticky debajo de la cabecera: altura medida en código, no es un token (V28)',
};
const sourceFiles = fs
  .readdirSync(path.join(ROOT, 'src'), { recursive: true })
  .filter((file) => /\.(tsx?|css|mdx?)$/.test(file))
  .map((file) => path.join('src', file));
let arbitraryCount = 0;
for (const file of sourceFiles) {
  read(file)
    .split('\n')
    .forEach((line, i) => {
      const where = `${file}:${i + 1}`;
      // Clase con valor arbitrario (p-[13px]) y propiedad arbitraria ([color:#f00]), sin las variantes (…]:).
      const arbitrary = [
        ...line.matchAll(/[a-z0-9-]+-\[[^\]]+\](?!:)/g),
        ...line.matchAll(/(?<![\w-])\[[a-z-]+:[^\]]+\](?!:)/g),
      ];
      for (const [cls] of arbitrary) {
        arbitraryCount += 1;
        if (!(cls in ARBITRARY_ALLOWED)) errors.push(`${where}: valor arbitrario ${cls} (usa un token o añade la excepción con su motivo)`);
      }
      for (const [cls, name] of line.matchAll(/[a-z0-9-]+-\((?:[a-z-]+:)?(--[\w-]+)\)/g)) {
        if (cls in VARIABLE_ALLOWED) continue;
        if (!name.startsWith('--t101-')) errors.push(`${where}: ${cls} no apunta a un token --t101-*`);
        else if (!defined.has(name)) errors.push(`${where}: ${cls}: ${name} no está definido en tokens.css`);
      }
    });
}

console.log(
  `tokens.css: ${blocks.root.size} en :root · ${blocks.darkAttr.size} en [data-theme="dark"] · ` +
    `${blocks.darkMedia.size} en prefers-color-scheme · ${blocks.desktop.size} en Desktop`,
);
console.log(`theme.css: ${(themeCss.match(/^\s+--[\w-]+:/gm) ?? []).length} variables de Tailwind`);
console.log(`src/: ${sourceFiles.length} archivos · ${arbitraryCount} valores arbitrarios (${Object.keys(ARBITRARY_ALLOWED).length} excepciones)`);
if (errors.length) {
  console.error(`\n${errors.length} error(es):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Sin errores.');
