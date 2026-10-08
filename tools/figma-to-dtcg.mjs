// Convierte la exportación de Figma (tokens/figma/, C10) en DTCG 2025.10 estricto (tokens/dtcg/).
// Motivo y pruebas: docs/paso-7-tokens.md §1 y §3 (V06).
//
// Lo que Figma exporta y lo que hace este script:
//   1. Alias a otra colección: valor resuelto, con la referencia solo en $extensions["com.figma.aliasData"]
//      → referencia DTCG: "color/neutral/950" → "{color.neutral.950}". Un alias dentro de la misma
//      colección ya sale como referencia DTCG en $value ("{space.100}") y se deja como está
//      (comprobado el 2026-10-08, docs/investigacion-herramientas.md §7).
//   2. Tamaños como `number` sin unidad → `dimension` en px. El tipo se deduce del scope
//      de Figma (una decisión de diseño, S22), nunca del valor: el Format Module prohíbe adivinarlo.
//   3. Pesos como `number` con scope FONT_STYLE → `fontWeight`.
//   4. Familia como `string` (no es un tipo DTCG) con scope FONT_FAMILY → `fontFamily`.
//   5. Quita $extensions de la raíz (com.figma.modeName): el modo se sabe por el nombre del archivo.
//   6. Opacidad (alpha) en float32: Figma exporta 90 % como 0.8999999761581421, que en hex da e5
//      (89,8 %). Se sustituye por el decimal más corto con el mismo float32 (0.9 → e6): es el valor
//      escrito en Figma, no una aproximación (V31). Si el alpha no es un float32, se deja igual.
// Ante cualquier $type o scope no previsto, se detiene con error en vez de adivinar.
//
// Uso: node tools/figma-to-dtcg.mjs (o npm run tokens)

import fs from 'node:fs';
import path from 'node:path';

const IN_DIR = path.join(process.cwd(), 'tokens/figma');
const OUT_DIR = path.join(process.cwd(), 'tokens/dtcg');
const DIMENSION_SCOPES = new Set(['GAP', 'CORNER_RADIUS', 'STROKE_FLOAT', 'FONT_SIZE', 'WIDTH_HEIGHT']);

// Una referencia DTCG: el valor entero entre llaves (Format Module 2025.10, Aliases / References).
const isReference = (value) => typeof value === 'string' && /^\{[^{}]+\}$/.test(value);

const count = { files: 0, alias: 0, dimension: 0, fontWeight: 0, fontFamily: 0, color: 0, alpha: 0 };

// Decimal más corto que Figma guarda como el mismo float32 (punto 6).
function float32Decimal(value) {
  if (Math.fround(value) !== value) return value;
  for (let digits = 1; digits <= 9; digits++) {
    const candidate = Number(value.toPrecision(digits));
    if (Math.fround(candidate) === value) return candidate;
  }
  return value;
}

function convertToken(token, id) {
  const extensions = token.$extensions ?? {};
  const scopes = extensions['com.figma.scopes'] ?? [];
  const alias = extensions['com.figma.aliasData'];
  const out = { ...token };

  if (token.$type === 'color') {
    count.color++;
    const alpha = token.$value?.alpha;
    if (typeof alpha === 'number' && float32Decimal(alpha) !== alpha) {
      out.$value = { ...token.$value, alpha: float32Decimal(alpha) };
      count.alpha++;
    }
  } else if (token.$type === 'number' && scopes.includes('FONT_STYLE')) {
    out.$type = 'fontWeight';
    count.fontWeight++;
  } else if (token.$type === 'number' && scopes.some((scope) => DIMENSION_SCOPES.has(scope))) {
    out.$type = 'dimension';
    if (!isReference(token.$value)) out.$value = { value: token.$value, unit: 'px' };
    count.dimension++;
  } else if (token.$type === 'string' && scopes.includes('FONT_FAMILY')) {
    out.$type = 'fontFamily';
    count.fontFamily++;
  } else {
    throw new Error(`${id}: $type "${token.$type}" con scopes [${scopes}] no previsto. Revisa docs/paso-7-tokens.md §3.`);
  }

  if (alias) {
    out.$value = `{${alias.targetVariableName.replace(/\//g, '.')}}`;
    count.alias++;
  } else if (isReference(token.$value)) {
    count.alias++;
  }
  return out;
}

function convertGroup(group, pathParts) {
  const out = {};
  for (const [key, value] of Object.entries(group)) {
    if (key === '$extensions' && pathParts.length === 0) continue;
    if (key.startsWith('$')) {
      out[key] = value;
    } else if (value && typeof value === 'object' && '$value' in value) {
      out[key] = convertToken(value, [...pathParts, key].join('.'));
    } else {
      out[key] = convertGroup(value, [...pathParts, key]);
    }
  }
  return out;
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });

for (const collection of fs.readdirSync(IN_DIR, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  for (const file of fs.readdirSync(path.join(IN_DIR, collection.name)).filter((name) => name.endsWith('.tokens.json'))) {
    const source = JSON.parse(fs.readFileSync(path.join(IN_DIR, collection.name, file), 'utf8'));
    fs.mkdirSync(path.join(OUT_DIR, collection.name), { recursive: true });
    fs.writeFileSync(
      path.join(OUT_DIR, collection.name, file),
      `${JSON.stringify(convertGroup(source, []), null, 2)}\n`,
    );
    count.files++;
  }
}

console.log(
  `tokens/dtcg: ${count.files} archivos · ${count.alias} alias · ${count.dimension} dimension · ` +
    `${count.fontWeight} fontWeight · ${count.fontFamily} fontFamily · ${count.color} color · ` +
    `${count.alpha} alpha float32`,
);
