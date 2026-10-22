// Junta docs/ en los archivos de guidelines que se suben a TokensDS (Library → Manage guidelines…),
// fase 4 de la guía de ds4agents, paso 8; script de
// https://ds4agents.com/documentation/one-source-many-channels, adaptado. Grupos: fundamentos,
// componentes, patrones y reglas (rules.md incluye anti-patterns.md, que antes se subía suelto, V61).
// Escribe en dist/figma-guidelines/ (en .gitignore: la fuente es docs/). Termina con código 1 si el
// total pasa de 100 KB. Sin dependencias. Uso: npm run docs:figma

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'dist/figma-guidelines';
const groups = {
  'overview.md': ['docs/foundations'],
  'components.md': ['docs/components'],
  'patterns.md': ['docs/patterns'],
  'rules.md': ['docs/rules'],
};

const read = (p) =>
  fs.statSync(p).isDirectory()
    ? fs.readdirSync(p).filter((f) => f.endsWith('.md')).sort().map((f) => read(path.join(p, f))).join('\n\n')
    : fs.readFileSync(p, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, ''); // sin frontmatter

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (const [file, sources] of Object.entries(groups)) {
  const text = sources.map(read).join('\n\n');
  fs.writeFileSync(path.join(OUT, file), text);
  total += Buffer.byteLength(text);
  console.log(`${path.join(OUT, file)}: ${(Buffer.byteLength(text) / 1024).toFixed(1)} KB`);
}
console.log(`Guidelines: ${(total / 1024).toFixed(1)} KB`);
if (total > 100 * 1024) process.exitCode = 1; // Figma recomienda menos de 100 KB entre todos
