// Compila el piloto para /design-sync en .design-sync/.cache/dist: JS (ESM, React fuera),
// tipos (.d.ts con tsc) y el CSS de la web (Tailwind con el mismo globals.css).
// Uso: node .design-sync/pilot/build.mjs (necesita .ds-sync/node_modules con esbuild).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

const root = resolve(import.meta.dirname, '../..');
const out = join(root, '.design-sync/.cache/dist');
const esbuild = createRequire(join(root, '.ds-sync/package.json'))('esbuild');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 0. Iconos: los de TokensDS conectados con Code Connect (D70), para la prop icon de Button.
const batch = JSON.parse(readFileSync(join(root, 'src/components/icons.figma.batch.json'), 'utf8'));
const icons = [...new Set(batch.components.map((c) => c.component))].sort();
writeFileSync(
  join(root, '.design-sync/pilot/icons.ts'),
  '// Generado por build.mjs desde src/components/icons.figma.batch.json (D70). No se edita a mano.\n' +
    `export { ${icons.join(', ')} } from 'lucide-react';\n`,
);

// 1. JS
await esbuild.build({
  entryPoints: [join(root, '.design-sync/pilot/index.tsx')],
  outfile: join(out, 'index.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  tsconfig: join(root, 'tsconfig.json'),
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  alias: { 'next/link': join(root, '.design-sync/pilot/next-link.tsx') },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});

// 2. Tipos
const tsconfig = join(out, 'tsconfig.dts.json');
writeFileSync(
  tsconfig,
  JSON.stringify({
    extends: join(root, 'tsconfig.json'),
    compilerOptions: {
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      incremental: false,
      rootDir: root,
      outDir: join(out, 'types'),
      plugins: [],
    },
    // files y no include: include no recoge carpetas que empiezan por punto.
    files: [join(root, '.design-sync/pilot/index.tsx')],
    include: [],
  }),
);
execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', tsconfig], { stdio: 'inherit' });
rmSync(tsconfig);
// Los .d.ts emitidos conservan el alias @/: la entrada de tipos se escribe con rutas relativas.
const dtsEntry = readFileSync(join(out, 'types/.design-sync/pilot/index.d.ts'), 'utf8')
  .replaceAll("'@/", "'./types/src/")
  .replaceAll("'./provider'", "'./types/.design-sync/pilot/provider'")
  .replaceAll("'./icons'", "'./types/.design-sync/pilot/icons'");
writeFileSync(join(out, 'index.d.ts'), dtsEntry);

// 3. CSS: el de la web, compilado igual que en Next (V44: solo clases de src/). Las fuentes,
// que en la web sirve next/font (V13), llegan desde Google Fonts con los mismos nombres de familia.
const from = join(root, 'src/app/globals.css');
const { css } = await postcss([tailwind()]).process(readFileSync(from, 'utf8'), { from });
const fonts =
  '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap");\n';
writeFileSync(join(out, 'styles.css'), fonts + css);

writeFileSync(
  join(out, 'package.json'),
  JSON.stringify(
    { name: 'designtoken101', version: '1.2.0', type: 'module', module: './index.js', types: './index.d.ts', style: './styles.css' },
    null,
    2,
  ) + '\n',
);
console.log(`designtoken101 (piloto) en ${out} · web ${pkg.version}`);
