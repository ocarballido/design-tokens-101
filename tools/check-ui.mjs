// Puntúa con búsquedas lo que ha cambiado un agente en un repositorio de designtokens101 (fase 7 de la
// guía de ds4agents, D79; script de https://ds4agents.com/evaluation/rubric#lo-que-puntúa-un-script,
// adaptado). Solo mira las líneas añadidas respecto a un commit base, en src/ y content/:
//   1. Valores literales (hex, rgb(), hsl(), oklch(), px) y valores arbitrarios entre corchetes fuera
//      de tools/arbitrary-allowed.mjs (docs/rules/rules-tokens.md).
//   2. Primitivos de color y de radio usados directamente (docs/rules/rules-tokens.md).
//   3. Tamaño, peso o familia de texto sueltos, en lugar de un estilo de texto (docs/rules/rules-tokens.md).
//   4. Componentes con `status: deprecated` en docs/components/ (AGENTS.md, regla 4).
//   5. Props y valores que no están en la tabla Props de docs/components/ (AGENTS.md, regla 3).
//   6. Archivos del sistema creados o cambiados: src/components (AGENTS.md, regla 1), src/styles y
//      tokens/ (generados o especificados en proyecto/sistema-tokens-v1.md). Los dos últimos no se
//      analizan: ahí se definen los valores.
// Diferencias con el de la guía: prefijo --t101-; en las lecciones (.mdx) solo mira `className` y
// `style` fuera de los bloques de código, porque el texto de las lecciones habla de hex y de px; y
// lee las props de los documentos de componente. No sustituye a check:tokens ni a check:content.
// Sin dependencias. No falla: informa. Uso: npm run check:ui -- [carpeta del repositorio] [commit base]
// (por defecto, la carpeta actual y HEAD; los archivos sin seguimiento cuentan como añadidos).

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ARBITRARY_ALLOWED } from './arbitrary-allowed.mjs';

const DIR = path.resolve(process.argv[2] ?? '.');
const BASE = process.argv[3] ?? 'HEAD';
// Los componentes, los estilos (tokens generados, estilos de texto y base) y los tokens son el sistema:
// se dice que han cambiado.
const SYSTEM = /^(src\/components|src\/styles|tokens)\//;
const git = (...args) => execFileSync('git', ['-C', DIR, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const read = (file) => fs.readFileSync(path.join(DIR, file), 'utf8');

// Líneas añadidas de cada archivo: las de los fragmentos de `git diff -U0` y, en los archivos sin
// seguimiento, todas.
const added = new Map();
let file;
for (const line of git('diff', '-U0', '--no-color', '--no-ext-diff', BASE).split('\n')) {
  const target = /^\+\+\+ (?:b\/(.+)|\/dev\/null)$/.exec(line);
  if (target) {
    file = target[1];
    if (file) added.set(file, new Set());
    continue;
  }
  const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
  if (hunk && file) {
    const start = Number(hunk[1]);
    for (let n = 0; n < Number(hunk[2] ?? 1); n++) added.get(file).add(start + n);
  }
}
for (const untracked of git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean)) {
  added.set(untracked, new Set(read(untracked).split('\n').map((_, i) => i + 1)));
}

// Documentos de componente: nombre, estado y props de la tabla Props (con sus valores, si los enumera).
const components = new Map();
for (const doc of fs.readdirSync(path.join(DIR, 'docs/components')).filter((f) => f.endsWith('.md'))) {
  const text = read(`docs/components/${doc}`);
  const name = /^name:\s*(\S+)/m.exec(text)?.[1];
  if (!name) continue;
  const props = new Map();
  const table = text.split('\n## Props\n\n')[1]?.split('\n\n')[0] ?? '';
  for (const row of table.split('\n').slice(2)) {
    const cells = row.split('|').slice(1, -1).map((c) => c.trim());
    // Una fila puede nombrar varias props (`marks`, `legend`); los valores son una lista cerrada salvo
    // que acaben en "…" (`json`, `css`…).
    const values = [...(cells[2] ?? '').matchAll(/`([\w-]+)`/g)].map((m) => m[1]);
    const closed = values.length > 1 && !(cells[2] ?? '').includes('…');
    for (const [, prop] of (cells[0] ?? '').matchAll(/`(\w+)`/g)) props.set(prop, closed ? values : null);
  }
  components.set(name, {
    status: /^status:\s*(\S+)/m.exec(text)?.[1],
    props,
    // Button y TextField aceptan además los atributos de su elemento HTML: ahí no se marcan las props.
    extraAttributes: /Además acepta los atributos/.test(text),
  });
}

const LITERAL = [
  /(?<![\w&])#[0-9a-fA-F]{3,8}\b/g,
  /\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/g,
  /(?<![\w-])\d+(?:\.\d+)?px\b/g,
];
// Las mismas expresiones que la comprobación 8 de check-tokens.mjs, sin las variantes (…]:).
const ARBITRARY = [/[a-z0-9-]+-\[[^\]]+\](?!:)/g, /(?<![\w-])\[[a-z-]+:[^\]]+\](?!:)/g];
const PRIMITIVE = [
  /--t101-color-(?!text-|background-|border-)[a-z]+(?:-\d+)?\b/g,
  /\b(?:bg|text|border|fill|stroke|ring|outline|decoration|divide|accent|caret)-(?:emerald|neutral|red|amber|blue)-\d{2,3}\b/g,
  /\b(?:bg|text|border|fill|stroke|ring|outline)-(?:white|black)\b/g,
  /--t101-radius-\d+\b/g,
  /\brounded(?:-[trblse]{1,2})?-\d+\b/g,
];
// Clases de tamaño, familia o peso. Las propiedades, solo en CSS y dentro de `style` (fontWeight también
// es un tipo de DTCG en el código de las herramientas).
const LOOSE_TYPE = [
  /\btext-(?:body|caption|code|heading|label)-[\w-]+/g,
  /\bfont-(?:sans|mono|thin|light|normal|medium|semibold|bold|extrabold|black|\d{3})\b/g,
];
const LOOSE_TYPE_CSS = /\bfont-(?:size|weight|family)\s*:/g;
const LOOSE_TYPE_STYLE = /\bfont(?:Size|Weight|Family)\s*:/g;

const found = { literal: [], primitive: [], type: [], deprecated: [], props: [], components: [] };
const scan = (where, text, patterns, list) => {
  for (const pattern of patterns) for (const [match] of text.matchAll(pattern)) list.push(`${where}: ${match}`);
};
// Devuelve el texto sin los valores entre corchetes, para no contar dos veces el px de p-[13px].
const scanArbitrary = (where, text) => {
  for (const pattern of ARBITRARY) {
    for (const [match] of text.matchAll(pattern)) if (!(match in ARBITRARY_ALLOWED)) found.literal.push(`${where}: ${match}`);
    text = text.replace(pattern, '');
  }
  return text;
};

// Etiquetas de los componentes documentados en una línea: obsoletos, props que no existen y valores
// que no están en la tabla.
function scanTags(where, line) {
  for (const [, name, attrs] of line.matchAll(/<([A-Z]\w*)\b([^>]*)>?/g)) {
    const doc = components.get(name);
    if (!doc) continue;
    if (doc.status === 'deprecated') found.deprecated.push(`${where}: <${name}>`);
    for (const [, prop, value] of attrs.matchAll(/(\w+)=(?:"([^"]*)"|'[^']*'|\{)/g)) {
      if (prop === 'key') continue;
      if (!doc.props.has(prop)) {
        if (!doc.extraAttributes) found.props.push(`${where}: <${name} ${prop}> no está en docs/components/`);
      } else if (value !== undefined && !value.includes('${') && doc.props.get(prop) && !doc.props.get(prop).includes(value)) {
        found.props.push(`${where}: <${name} ${prop}="${value}"> (valores: ${doc.props.get(prop).join(', ')})`);
      }
    }
  }
}

for (const [name, lines] of [...added].sort()) {
  if (SYSTEM.test(name)) found.components.push(name);
  if (!/^(src|content)\//.test(name) || /^src\/styles\//.test(name) || !fs.existsSync(path.join(DIR, name))) continue;
  const isLesson = /\.mdx?$/.test(name);
  // Las plantillas de Code Connect (.figma.ts) son fragmentos para Figma, no código de la web.
  if ((!isLesson && !/\.(tsx?|jsx?|css)$/.test(name)) || name.endsWith('.figma.ts')) continue;
  let fence = null;
  read(name)
    .split('\n')
    .forEach((line, i) => {
      // En las lecciones, los bloques de código no cuentan: son ejemplos del curso.
      const marker = isLesson && /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
      if (marker) {
        if (!fence) fence = marker;
        else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
        return;
      }
      if (fence || !lines.has(i + 1)) return;
      const where = `${name}:${i + 1}`;
      scanTags(where, line);
      const text = isLesson
        ? [...line.matchAll(/\b(?:className|style)=(?:"[^"]*"|\{\{?[^}]*\}?\})/g)].map((m) => m[0]).join(' ')
        : line.replace(/\bhref=(?:"[^"]*"|'[^']*')/g, '');
      if (!text) return;
      scan(where, scanArbitrary(where, text), LITERAL, found.literal);
      scan(where, text, PRIMITIVE, found.primitive);
      scan(where, text, LOOSE_TYPE, found.type);
      if (name.endsWith('.css')) scan(where, text, [LOOSE_TYPE_CSS], found.type);
      if (/\bstyle=/.test(text)) scan(where, text, [LOOSE_TYPE_STYLE], found.type);
    });
}

const sections = [
  ['literal', 'Valores literales y arbitrarios'],
  ['primitive', 'Primitivos usados directamente'],
  ['type', 'Texto sin estilo de texto'],
  ['deprecated', 'Componentes obsoletos'],
  ['props', 'Props que no están en docs/components/'],
  ['components', 'Archivos del sistema creados o cambiados (src/components, src/styles, tokens)'],
];
console.log(`check:ui ${DIR} (base ${BASE}): ${added.size} archivos con cambios`);
for (const [key, title] of sections) {
  console.log(`\n${title}: ${found[key].length}`);
  for (const item of found[key]) console.log(`  ${item}`);
}
